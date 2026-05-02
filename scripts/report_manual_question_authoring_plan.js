#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const coverageTargets = require("./report_question_coverage_targets.js");
const questionActivityCoverage = require("./report_question_activity_coverage.js");

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const JSON_PATH = path.join(ROOT, "MANUAL_QUESTION_AUTHORING_PLAN.json");
const MD_PATH = path.join(ROOT, "MANUAL_QUESTION_AUTHORING_PLAN.md");
const REPORT_DATE = new Date().toISOString().slice(0,10);
const BATCH_SIZE = 25;
const UNKNOWN = "unknown/unavailable";

function activityNeeds(row) {
  if (!row || !row.relevant) return false;
  return !row.ready;
}

function activityDeficitLabel(activityRow) {
  if (!activityRow) return "none";
  const missing = [];
  if (activityRow.trace === 0) missing.push("trace");
  if (activityRow.build === 0) missing.push("build");
  if (activityRow.bug === 0) missing.push("bug");
  if (!missing.length) return "none";
  return `activity:${missing.join("/")}`;
}

function readDataValue(file, globalName) {
  const sandbox = { window: {}, console };
  vm.runInNewContext(fs.readFileSync(path.join(DATA_DIR, file), "utf8"), sandbox, { filename: file });
  return sandbox[globalName] || sandbox.window[globalName];
}

function lessonIdForKey(key) {
  return String(key || "").split("::")[0] || UNKNOWN;
}

function buildModuleLookup() {
  const blueprints = readDataValue("course_blueprints.js", "COURSE_BLUEPRINTS") || [];
  const svcollege = blueprints.find((item) => item.id === "svcollege_fullstack_ai");
  const modules = (svcollege && svcollege.modules) || [];
  return modules.map((module, index) => ({
    index,
    title: module.title,
    lessonIds: new Set(module.lessonIds || []),
    conceptKeys: new Set(module.conceptKeys || []),
  }));
}

function moduleForKey(key, modules) {
  const lessonId = lessonIdForKey(key);
  const exact = modules.find((module) => module.conceptKeys.has(key));
  if (exact) return exact;
  const lesson = modules.find((module) => module.lessonIds.has(lessonId));
  if (lesson) return lesson;
  return {
    index: 999,
    title: "Unmapped / deferred",
    lessonIds: new Set([lessonId]),
    conceptKeys: new Set(),
  };
}

function gapRows(coverageReport, activityRows, activityGaps) {
  const activityMap = new Map((activityRows || []).map((row) => [row.key, row]));
  const byKey = new Map();
  (coverageReport.gaps.mc || []).forEach((gap) => {
    byKey.set(gap.key, {
      key: gap.key,
      lessonTitle: gap.lessonTitle,
      conceptName: gap.conceptName,
      requiresFill: false,
      mcCurrent: gap.mc.total,
      mcDeficit: Math.max(0, coverageReport.policy.mcTargetPerConcept - gap.mc.total),
      fillCurrent: 0,
      fillTarget: coverageReport.policy.fillTargetPerCodeConcept,
      fillDeficit: 0,
      activityCurrent: 0,
      activityTarget: 1,
      activityDeficit: 0,
      nextActivity: "trace",
      activityLabel: "none",
    });
  });
  (coverageReport.gaps.fill || []).forEach((gap) => {
    const row = byKey.get(gap.key) || {
      key: gap.key,
      lessonTitle: gap.lessonTitle,
      conceptName: gap.conceptName,
      mcCurrent: coverageReport.policy.mcTargetPerConcept,
      mcDeficit: 0,
      fillCurrent: gap.fill.total,
      fillDeficit: 0,
      fillTarget: coverageReport.policy.fillTargetPerCodeConcept,
      requiresFill: true,
      activityCurrent: 0,
      activityTarget: 1,
      activityDeficit: 0,
      nextActivity: "trace",
      activityLabel: "none",
    };
    row.requiresFill = true;
    row.fillCurrent = gap.fill.total;
    row.fillDeficit = Math.max(0, coverageReport.policy.fillTargetPerCodeConcept - gap.fill.total);
    byKey.set(gap.key, row);
  });
  (activityGaps || []).forEach((gap) => {
    const existing = byKey.get(gap.key) || {
      key: gap.key,
      lessonTitle: gap.lessonTitle,
      conceptName: gap.conceptName,
      mcCurrent: coverageReport.policy.mcTargetPerConcept,
      mcDeficit: 0,
      fillCurrent: 0,
      fillDeficit: 0,
      fillTarget: coverageReport.policy.fillTargetPerCodeConcept,
      requiresFill: false,
      activityCurrent: 0,
      activityTarget: 1,
      activityDeficit: 1,
      nextActivity: "trace",
      activityLabel: "activity",
    };
    const activityRow = activityMap.get(gap.key);
    if (activityRow && activityRow.relevant) {
      existing.activityCurrent = Number(activityRow.trace || 0) + Number(activityRow.build || 0) + Number(activityRow.bug || 0);
      existing.activityDeficit = existing.activityCurrent >= 1 ? 0 : 1;
      existing.activityLabel = activityDeficitLabel(activityRow);
      existing.nextActivity =
        !activityRow.trace ? "trace" :
        !activityRow.bug ? "bug" :
        !activityRow.build ? "build" :
        "review";
    }
    byKey.set(gap.key, existing);
  });
  activityMap.forEach((activityRow, key) => {
    if (!activityNeeds(activityRow)) return;
    const existing = byKey.get(key);
    if (existing && existing.activityDeficit === 0 && existing.nextActivity !== "trace") return;
    if (existing) return;
    byKey.set(key, {
      key,
      lessonTitle: activityRow.lessonTitle,
      conceptName: activityRow.conceptName,
      mcCurrent: coverageReport.policy.mcTargetPerConcept,
      mcDeficit: 0,
      fillCurrent: 0,
      fillDeficit: 0,
      fillTarget: coverageReport.policy.fillTargetPerCodeConcept,
      requiresFill: false,
      activityCurrent: Number(activityRow.trace || 0) + Number(activityRow.build || 0) + Number(activityRow.bug || 0),
      activityTarget: 1,
      activityDeficit: 1,
      nextActivity: !activityRow.trace ? "trace" : !activityRow.bug ? "bug" : !activityRow.build ? "build" : "review",
      activityLabel: activityDeficitLabel(activityRow),
    });
  });
  return Array.from(byKey.values());
}

function priorityFor(row, module) {
  if (module.title === "Unmapped / deferred") return "P2-deferred";
  const hasMc = row.mcDeficit > 0;
  const hasFill = row.fillDeficit > 0;
  const hasActivity = row.activityDeficit > 0;
  if (hasMc && hasFill) return "P0-manual-mc-fill";
  if (hasMc) return "P0-manual-mc";
  if (hasFill && hasActivity) return "P0-manual-fill-activity";
  if (hasFill) return "P0-manual-fill";
  if (hasActivity) return "P0-manual-activity";
  return "P0-manual-coverage-check";
}

function buildItems(rows, modules) {
  return rows
    .map((row) => {
      const module = moduleForKey(row.key, modules);
      return {
        key: row.key,
        lessonId: lessonIdForKey(row.key),
        lessonTitle: row.lessonTitle,
        conceptName: row.conceptName,
        moduleTitle: module.title,
        moduleIndex: module.index,
        priority: priorityFor(row, module),
        mcCurrent: row.mcCurrent,
        mcDeficit: row.mcDeficit,
        fillCurrent: row.fillCurrent,
        fillDeficit: row.fillDeficit,
        activityCurrent: row.activityCurrent,
        activityDeficit: row.activityDeficit,
        nextActivity: row.nextActivity,
        activityLabel: row.activityLabel,
        requiresFill: row.requiresFill,
        sourceEvidence: row.lessonTitle || UNKNOWN,
        reviewer: UNKNOWN,
        manualReviewDate: UNKNOWN,
      };
    })
    .sort((a, b) =>
      a.moduleIndex - b.moduleIndex ||
      a.lessonId.localeCompare(b.lessonId) ||
      a.conceptName.localeCompare(b.conceptName) ||
      a.key.localeCompare(b.key),
    );
}

function buildBatches(items) {
  const batches = [];
  let currentModule = null;
  let current = null;

  items.forEach((item) => {
    const needsNewBatch = !current ||
      current.items.length >= BATCH_SIZE ||
      currentModule !== item.moduleTitle;
    if (needsNewBatch) {
      currentModule = item.moduleTitle;
      current = {
        id: `QMAN-${String(batches.length + 1).padStart(3, "0")}`,
        moduleTitle: item.moduleTitle,
        priority: item.priority,
        owner: UNKNOWN,
        reviewer: UNKNOWN,
        sourceEvidenceStatus: "lesson-data-present",
        status: "not-started",
        items: [],
      };
      batches.push(current);
    }
    current.items.push(item);
  });

  return batches.map((batch) => ({
    ...batch,
    conceptCount: batch.items.length,
    mcDeficit: batch.items.reduce((sum, item) => sum + item.mcDeficit, 0),
      fillDeficit: batch.items.reduce((sum, item) => sum + item.fillDeficit, 0),
      activityDeficit: batch.items.reduce((sum, item) => sum + item.activityDeficit, 0),
    }));
}

function buildReport() {
  const coverage = coverageTargets.buildReport();
  const activityCoverage = questionActivityCoverage.buildReport();
  const activityRows = questionActivityCoverage.buildRows();
  const modules = buildModuleLookup();
  const items = buildItems(gapRows(coverage, activityRows, activityCoverage.gaps), modules);
  const batches = buildBatches(items);
  const plannedKeys = new Set(batches.flatMap((batch) => batch.items.map((item) => item.key)));
  const sourceKeys = new Set(items.map((item) => item.key));
  const missingPlannedKeys = Array.from(sourceKeys).filter((key) => !plannedKeys.has(key));

  return {
    reportVersion: "manual-question-authoring-plan-v1",
    date: REPORT_DATE,
    policy: {
      manualOnly: true,
      generatesQuestions: false,
      noFakeData: true,
      ownerFallback: UNKNOWN,
      reviewerFallback: UNKNOWN,
      batchSize: BATCH_SIZE,
    },
    summary: {
      readyForAuthoring: missingPlannedKeys.length === 0,
      totalConcepts: coverage.summary.totalConcepts,
      gapConcepts: items.length,
      mcGapCount: coverage.summary.mcGapCount,
      fillGapCount: coverage.summary.fillGapCount,
      activityGapCount: activityCoverage.summary.activityGapCount,
      strictMcDeficit: items.reduce((sum, item) => sum + item.mcDeficit, 0),
      strictFillDeficit: items.reduce((sum, item) => sum + item.fillDeficit, 0),
      strictActivityDeficit: items.reduce((sum, item) => sum + item.activityDeficit, 0),
      batches: batches.length,
      missingPlannedKeys: missingPlannedKeys.length,
    },
    batches,
  };
}

function toMarkdown(report) {
  const lines = [
    "# Manual Question Authoring Plan",
    "",
    `Date: ${report.date}`,
    "",
    "## Summary",
    "",
    `- Ready for authoring: ${report.summary.readyForAuthoring ? "yes" : "no"}`,
    `- Gap concepts: ${report.summary.gapConcepts}/${report.summary.totalConcepts}`,
    `- MC gap concepts: ${report.summary.mcGapCount}`,
    `- Fill gap concepts: ${report.summary.fillGapCount}`,
    `- Activity gap concepts: ${report.summary.activityGapCount}`,
    `- Strict MC questions still required: ${report.summary.strictMcDeficit}`,
    `- Strict Fill questions still required: ${report.summary.strictFillDeficit}`,
    `- Strict Activity actions still required: ${report.summary.strictActivityDeficit}`,
    `- Batches: ${report.summary.batches}`,
    "",
    "## Policy",
    "",
    "- This is an authoring plan, not a question generator.",
    "- Owners/reviewers remain `unknown/unavailable` until a real person is assigned.",
    "- A batch is DONE only after manual writing, manual review, option feedback, QA gates and source lesson verification.",
    "",
    "## Batches",
    "",
  ];

  report.batches.forEach((batch) => {
    lines.push(
      `### ${batch.id} — ${batch.moduleTitle}`,
      "",
      `- Status: ${batch.status}`,
      `- Owner: ${batch.owner}`,
      `- Reviewer: ${batch.reviewer}`,
      `- Concepts: ${batch.conceptCount}`,
      `- MC deficit: ${batch.mcDeficit}`,
      `- Fill deficit: ${batch.fillDeficit}`,
      `- Activity deficit: ${batch.activityDeficit}`,
      "",
      "| Concept key | Priority | MC deficit | Fill deficit | Activity | Review date |",
      "|---|---|---:|---:|---:|---|",
      ...batch.items.map((item) =>
        `| \`${item.key}\` | ${item.priority} | ${item.mcDeficit} | ${item.fillDeficit} | ${item.activityDeficit} (${item.nextActivity}) | ${item.manualReviewDate} |`,
      ),
      "",
    );
  });

  return `${lines.join("\n").replace(/\n+$/, "")}\n`;
}

function run() {
  const args = new Set(process.argv.slice(2));
  const report = buildReport();

  if (args.has("--write")) {
    fs.writeFileSync(JSON_PATH, `${JSON.stringify(report, null, 2)}\n`, "utf8");
    fs.writeFileSync(MD_PATH, toMarkdown(report), "utf8");
  }

  if (args.has("--summary")) {
    console.log(JSON.stringify(report.summary, null, 2));
  } else {
    console.log(toMarkdown(report));
  }

  if (args.has("--strict") && !report.summary.readyForAuthoring) {
    console.error("Manual question authoring plan does not cover all current gap keys.");
    process.exitCode = 1;
  }
}

if (require.main === module) run();

module.exports = {
  buildReport,
  toMarkdown,
};
