#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const coverageTargets = require("./report_question_coverage_targets.js");

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const JSON_PATH = path.join(ROOT, "MANUAL_QUESTION_AUTHORING_PLAN.json");
const MD_PATH = path.join(ROOT, "MANUAL_QUESTION_AUTHORING_PLAN.md");
const REPORT_DATE = "2026-04-30";
const BATCH_SIZE = 25;
const UNKNOWN = "unknown/unavailable";

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

function gapRows(report) {
  const byKey = new Map();
  (report.gaps.mc || []).forEach((gap) => {
    byKey.set(gap.key, {
      key: gap.key,
      lessonTitle: gap.lessonTitle,
      conceptName: gap.conceptName,
      mcCurrent: gap.mc.total,
      mcDeficit: Math.max(0, report.policy.mcTargetPerConcept - gap.mc.total),
      fillCurrent: 0,
      fillDeficit: 0,
      requiresFill: false,
    });
  });
  (report.gaps.fill || []).forEach((gap) => {
    const row = byKey.get(gap.key) || {
      key: gap.key,
      lessonTitle: gap.lessonTitle,
      conceptName: gap.conceptName,
      mcCurrent: report.policy.mcTargetPerConcept,
      mcDeficit: 0,
      fillCurrent: gap.fill.total,
      fillDeficit: 0,
      requiresFill: true,
    };
    row.requiresFill = true;
    row.fillCurrent = gap.fill.total;
    row.fillDeficit = Math.max(0, report.policy.fillTargetPerCodeConcept - gap.fill.total);
    byKey.set(gap.key, row);
  });
  return Array.from(byKey.values());
}

function priorityFor(row, module) {
  if (module.title === "Unmapped / deferred") return "P2-deferred";
  if (row.mcDeficit > 0 && row.fillDeficit > 0) return "P0-manual-mc-fill";
  if (row.mcDeficit > 0) return "P0-manual-mc";
  return "P0-manual-fill";
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
  }));
}

function buildReport() {
  const coverage = coverageTargets.buildReport();
  const modules = buildModuleLookup();
  const items = buildItems(gapRows(coverage), modules);
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
      strictMcDeficit: items.reduce((sum, item) => sum + item.mcDeficit, 0),
      strictFillDeficit: items.reduce((sum, item) => sum + item.fillDeficit, 0),
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
    `- Strict MC questions still required: ${report.summary.strictMcDeficit}`,
    `- Strict Fill questions still required: ${report.summary.strictFillDeficit}`,
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
      "",
      "| Concept key | Priority | MC deficit | Fill deficit | Review date |",
      "|---|---|---:|---:|---|",
      ...batch.items.map((item) =>
        `| \`${item.key}\` | ${item.priority} | ${item.mcDeficit} | ${item.fillDeficit} | ${item.manualReviewDate} |`,
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
