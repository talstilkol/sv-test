#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const questionCoverageTargets = require("./report_question_coverage_targets.js");
const questionActivityCoverage = require("./report_question_activity_coverage.js");
const questionActivityAuthoringPlan = require("./report_question_activity_authoring_plan.js");

const ROOT = path.resolve(__dirname, "..");
const JSON_PATH = path.join(ROOT, "QUESTION_CURRICULUM_COVERAGE_REPORT.json");
const MD_PATH = path.join(ROOT, "QUESTION_CURRICULUM_COVERAGE_REPORT.md");
const REPORT_DATE = new Date().toISOString().slice(0, 10);
const DEFAULT_BATCH_SIZE = 40;

function parseArgs(argv = process.argv.slice(2)) {
  const args = {
    batchSize: DEFAULT_BATCH_SIZE,
    summary: false,
    write: false,
    json: false,
    strict: false,
  };

  argv.forEach((entry) => {
    if (!entry.startsWith("--")) return;
    if (entry === "--write") {
      args.write = true;
      return;
    }
    if (entry === "--json") {
      args.json = true;
      return;
    }
    if (entry === "--summary") {
      args.summary = true;
      return;
    }
    if (entry === "--strict") {
      args.strict = true;
      return;
    }
    const [name, value] = entry.slice(2).split("=");
    if (name === "batch-size" && value) args.batchSize = Math.max(1, Number(value) || DEFAULT_BATCH_SIZE);
  });
  return args;
}

function toMap(rows) {
  return (rows || []).reduce((acc, row) => {
    if (!row || !row.key) return acc;
    acc.set(row.key, row);
    return acc;
  }, new Map());
}

function requirementLabel(row) {
  if (!row) return "unknown";
  const missing = [];
  if (!row.mcReady) missing.push("MC");
  if (!row.fillReady) missing.push("Fill");
  if (row.activityRequired && !row.activityReady) missing.push("Trace/Build/Bug");
  if (!missing.length) return "ready";
  return missing.join(" + ");
}

function buildRequiredActions(row) {
  const actions = [];
  if (!row.mcReady) {
    actions.push({
      area: "mc",
      requirement: ">=3 MC",
      current: Number(row.mcCount || 0),
      target: 3,
      action: "Author 1-3 MC questions for this concept based on existing lesson material.",
    });
  }
  if (!row.fillReady) {
    actions.push({
      area: "fill",
      requirement: ">=2 Fill",
      current: Number(row.fillCount || 0),
      target: 2,
      action: "Author Fill questions with real code traces for this concept (no generated data).",
    });
  }
  if (row.activityRequired && !row.activityReady) {
    const defaultActivity = row.nextActivity || "trace";
    actions.push({
      area: "activity",
      requirement: ">=1 Trace/Build/Bug",
      current: Number(row.activityTrace || 0) + Number(row.activityBuild || 0) + Number(row.activityBug || 0),
      target: 1,
      action: `Author one ${defaultActivity} item tied to real ${row.conceptName} behavior.`,
    });
  }
  return actions;
}

function requiredActionPriority(actions = []) {
  let priority = 0;
  if (actions.some((action) => action.area === "mc")) priority += 100;
  if (actions.some((action) => action.area === "fill")) priority += 10;
  if (actions.some((action) => action.area === "activity")) priority += 1;
  return priority;
}

function buildReport({ batchSize = DEFAULT_BATCH_SIZE } = {}) {
  const coverageReport = questionCoverageTargets.buildReport();
  const activityReport = questionActivityCoverage.buildReport();
  const planningReport = questionActivityAuthoringPlan.buildPlan({ batchSize: Math.max(1, Number(batchSize) || DEFAULT_BATCH_SIZE) });
  const planNextActivity = new Map((planningReport.nextBatch || []).map((item) => [item.key, item.nextActivity]));

  const coverageRows = toMap(questionCoverageTargets.buildRows());
  const activityRows = toMap(questionActivityCoverage.buildRows());

  const rows = (questionCoverageTargets.buildRows() || []).map((coverageRow) => {
    const activityRow = activityRows.get(coverageRow.key);
    const activityRequired = Boolean(activityRow && activityRow.relevant);
    const activityReady = activityRow ? Boolean(activityRow.ready) : true;
    const requiredActions = buildRequiredActions({
      mcReady: coverageRow.mcReady,
      fillReady: coverageRow.fillReady,
      mcCount: (coverageRow.mc ? coverageRow.mc.curated : 0),
      fillCount: (coverageRow.fill ? coverageRow.fill.curated : 0),
      activityRequired,
      activityReady,
      nextActivity: planNextActivity.get(coverageRow.key) || (activityRow ? (activityRow.nextActivity || "trace") : "trace"),
      conceptName: coverageRow.conceptName,
    });

    return {
      key: coverageRow.key,
      lessonId: coverageRow.lessonId,
      lessonTitle: coverageRow.lessonTitle,
      conceptName: coverageRow.conceptName,
      mcReady: Boolean(coverageRow.mcReady),
      fillReady: Boolean(coverageRow.fillReady),
      activityRequired,
      activityReady,
      nextActivity: activityRow ? activityRow.nextActivity : null,
      activityTrace: activityRow ? activityRow.trace : 0,
      activityBuild: activityRow ? activityRow.build : 0,
      activityBug: activityRow ? activityRow.bug : 0,
      mcCount: coverageRow.mc ? coverageRow.mc.curated : 0,
      fillCount: coverageRow.fill ? coverageRow.fill.curated : 0,
      requiredActions,
      requiredActionPriority: requiredActionPriority(requiredActions),
      requirementLabel: requirementLabel({
        mcReady: coverageRow.mcReady,
        fillReady: coverageRow.fillReady,
        activityRequired,
        activityReady,
      }),
      ready: Boolean(coverageRow.mcReady && coverageRow.fillReady && (!activityRequired || activityReady)),
    };
  });

  const gaps = rows.filter((row) => !row.ready);
  const mcGaps = rows.filter((row) => !row.mcReady);
  const fillGaps = rows.filter((row) => !row.fillReady);
  const activityGaps = rows.filter((row) => row.activityRequired && !row.activityReady);
  const nextActions = ["mc", "fill", "activity"].reduce((acc, area) => {
    acc[area] = gaps.filter((row) => row.requiredActions.some((action) => action.area === area)).length;
    return acc;
  }, {});

  const nextBatch = gaps
    .slice()
    .sort((a, b) => {
      const lesson = a.lessonId.localeCompare(b.lessonId);
      if (lesson !== 0) return lesson;
      const priority = b.requiredActionPriority - a.requiredActionPriority;
      if (priority !== 0) return priority;
      const concept = a.conceptName.localeCompare(b.conceptName, "he");
      return concept || a.key.localeCompare(b.key);
    })
    .slice(0, Math.max(1, Number(batchSize) || DEFAULT_BATCH_SIZE))
    .map((gap) => ({
      order: 0,
      key: gap.key,
      lessonTitle: gap.lessonTitle,
      conceptName: gap.conceptName,
      mcCount: gap.mcCount,
      fillCount: gap.fillCount,
      requiredActions: gap.requiredActions,
      requirementLabel: requirementLabel({
        mcReady: gap.mcReady,
        fillReady: gap.fillReady,
        activityRequired: gap.activityRequired,
        activityReady: gap.activityReady,
      }),
    }));

  nextBatch.forEach((item, index) => {
    item.order = index + 1;
  });

  return {
    reportVersion: "curriculum-coverage-v1",
    date: REPORT_DATE,
    policy: {
      manualOnly: true,
      deterministic: true,
      noFakeData: true,
      requiredCriteria: ">=3 MC, >=2 Fill for code concepts, >=1 Trace/Build/Bug for code concepts",
      sourceTruth: "question_coverage_targets + question_activity_coverage",
    },
    source: {
      mc: coverageReport.sourceMix,
      activity: activityReport.sourceMix,
      generatedAt: coverageReport.date,
      activityReportDate: activityReport.date,
    },
    summary: {
      totalConcepts: rows.length,
      conceptReadyCount: rows.length - gaps.length,
      gapCount: gaps.length,
      mcGapCount: coverageReport.summary.mcGapCount,
      fillGapCount: coverageReport.summary.fillGapCount,
      activityGapCount: activityReport.summary.activityGapCount,
      ready: gaps.length === 0,
      nextBatchCount: nextBatch.length,
      nextActionNeeds: nextActions,
    },
    coverageReport,
    activityReport,
    gaps: gaps.map((row) => ({
      key: row.key,
      lessonTitle: row.lessonTitle,
    conceptName: row.conceptName,
    mcCount: row.mcCount,
    fillCount: row.fillCount,
    mcReady: row.mcReady,
    fillReady: row.fillReady,
    activityRequired: row.activityRequired,
    activityReady: row.activityReady,
    requiredActions: row.requiredActions,
    activityCounts: {
      trace: row.activityTrace,
      build: row.activityBuild,
      bug: row.activityBug,
      },
      requirementLabel: row.requirementLabel,
    })),
    nextBatch,
  };
}

function toMarkdown(report) {
  const s = report.summary;
  const lines = [
    "# Curriculum Coverage Readiness",
    "",
    `Date: ${report.date}`,
    "",
    "## Summary",
    "",
    `- Ready: ${s.ready ? "yes" : "no"}`,
    `- Concept readiness: ${s.conceptReadyCount}/${s.totalConcepts}`,
    `- MC gaps: ${s.mcGapCount}`,
    `- Fill gaps (code concepts): ${s.fillGapCount}`,
    `- Activity gaps: ${s.activityGapCount}`,
    "",
    "## Policy",
    `- ${report.policy.requiredCriteria}`,
    "- Manual-only criteria used (live bank: `data/questions_bank.js`, activity files only where relevant).",
    "- No fake content generated by this report.",
    "- Deterministic ordering and stable keys are used for every batch.",
    "",
    "## Next batch",
    "",
  ];

  if (report.nextBatch.length) {
    lines.push("| # | Concept | Lesson | Missing requirements | Suggested actions |");
    lines.push("|---:|---|---|---|---|");
    report.nextBatch.forEach((row) => {
      const actions = row.requiredActions
        .map((action) => `${action.area.toUpperCase()}: ${action.current}/${action.target} (${action.action})`)
        .join("<br>");
      lines.push(`| ${row.order} | \`${row.key}\` | ${row.lessonTitle} | ${row.requirementLabel} | ${actions} |`);
    });
  } else {
    lines.push("- No gaps.");
  }

  return `${lines.join("\n")}\n`;
}

function run(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  const report = buildReport({ batchSize: options.batchSize });

  const summaryPayload = {
    ready: report.summary.ready,
    totalConcepts: report.summary.totalConcepts,
    conceptReadyCount: report.summary.conceptReadyCount,
    gapCount: report.summary.gapCount,
    mcGapCount: report.summary.mcGapCount,
    fillGapCount: report.summary.fillGapCount,
    activityGapCount: report.summary.activityGapCount,
    nextBatchCount: report.nextBatch.length,
    nextActionNeeds: report.summary.nextActionNeeds,
  };

  if (options.write) {
    fs.writeFileSync(JSON_PATH, `${JSON.stringify(report, null, 2)}\n`);
    fs.writeFileSync(MD_PATH, `${toMarkdown(report)}\n`);
  }

  if (options.summary) {
    process.stdout.write(`${JSON.stringify(summaryPayload, null, 2)}\n`);
  } else if (options.json) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  } else {
    process.stdout.write(toMarkdown(report));
  }

  if (options.strict && !report.summary.ready) {
    process.exitCode = 1;
  }
  return report;
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.includes("--help") || args.includes("-h")) {
    process.stdout.write(`Usage:
node scripts/report_curriculum_coverage.js [--summary] [--json] [--write] [--strict] [--batch-size=<n>]

Defaults:
- batch-size: ${DEFAULT_BATCH_SIZE}
`);
  } else {
    run(args);
  }
}

module.exports = {
  buildReport,
  toMarkdown,
  parseArgs,
};
