#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const coverageTargets = require("./report_question_coverage_targets.js");
const svcollegeReadiness = require("./report_svcollege_readiness.js");

const ROOT = path.resolve(__dirname, "..");
const JSON_PATH = path.join(ROOT, "MANUAL_QUESTION_BLOCKER_MAP.json");
const MD_PATH = path.join(ROOT, "MANUAL_QUESTION_BLOCKER_MAP.md");
const REPORT_DATE = "2026-04-30";

const TARGET_MC_PER_CONCEPT = 3;
const TARGET_FILL_PER_CODE_CONCEPT = 2;
const TARGET_MODULE_TITLES = new Set([
  "עיצוב רספונסיבי ו-CSS מתקדם",
  "AI למפתחים — Cursor, Windsurf, Bolt, תיעוד וטסטים עם AI",
]);

function byKey(rows) {
  return rows.reduce((map, row) => {
    map.set(row.key, row);
    return map;
  }, new Map());
}

function questionTargetForModule(module) {
  const concepts = Array.isArray(module.conceptKeys) ? module.conceptKeys.length : 0;
  const lessons = Array.isArray(module.lessonIds) ? module.lessonIds.length : 0;
  return Math.max(concepts * 2, lessons ? 2 : 0);
}

function buildConceptRow(conceptKey, rowsByKey) {
  const row = rowsByKey.get(conceptKey);
  const requiresFill = Boolean(row && row.requiresFill);
  const mcCount = row ? row.mc.total : 0;
  const fillCount = row ? row.fill.total : 0;
  const fillTarget = requiresFill ? TARGET_FILL_PER_CODE_CONCEPT : 0;

  return {
    key: conceptKey,
    lessonTitle: row ? row.lessonTitle : "unknown/unavailable",
    conceptName: row ? row.conceptName : conceptKey.split("::").slice(1).join("::"),
    mappedInCoverageTargets: Boolean(row),
    requiresFill,
    manualMC: mcCount,
    manualFill: fillCount,
    requiredMC: TARGET_MC_PER_CONCEPT,
    requiredFill: fillTarget,
    mcDeficit: Math.max(0, TARGET_MC_PER_CONCEPT - mcCount),
    fillDeficit: Math.max(0, fillTarget - fillCount),
  };
}

function buildModuleMap(module, rowsByKey) {
  const concepts = (module.conceptKeys || []).map((conceptKey) => buildConceptRow(conceptKey, rowsByKey));
  const currentQuestionCount = (module.counts && module.counts.mc ? module.counts.mc : 0) +
    (module.counts && module.counts.fill ? module.counts.fill : 0);
  const releaseQuestionTarget = questionTargetForModule(module);

  return {
    title: module.title,
    readiness: module.readiness,
    status: module.status,
    lessonIds: module.lessonIds || [],
    conceptCount: concepts.length,
    releaseQuestionTarget,
    releaseQuestionCount: currentQuestionCount,
    releaseQuestionDeficit: Math.max(0, releaseQuestionTarget - currentQuestionCount),
    strictMcDeficit: concepts.reduce((sum, concept) => sum + concept.mcDeficit, 0),
    strictFillDeficit: concepts.reduce((sum, concept) => sum + concept.fillDeficit, 0),
    missingCoverageRows: concepts.filter((concept) => !concept.mappedInCoverageTargets).map((concept) => concept.key),
    concepts,
  };
}

function buildReport() {
  const readiness = svcollegeReadiness.buildReport();
  const rows = coverageTargets.buildRows();
  const rowsByKey = byKey(rows);
  const currentReleaseBlockers = readiness.modules.filter(
    (module) => module.status !== "covered" || module.readiness < 100,
  );
  const targetModules = readiness.modules.filter((module) => TARGET_MODULE_TITLES.has(module.title));
  const modules = targetModules.map((module) => buildModuleMap(module, rowsByKey));
  const missingCoverageRows = modules.flatMap((module) => module.missingCoverageRows);

  return {
    reportVersion: "manual-question-blocker-map-v1",
    date: REPORT_DATE,
    policy: {
      manualOnly: true,
      generatesQuestions: false,
      mutatesQuestionBank: false,
      readinessSource: "scripts/report_svcollege_readiness.js",
      coverageSource: "scripts/report_question_coverage_targets.js",
      mcTargetPerConcept: TARGET_MC_PER_CONCEPT,
      fillTargetPerCodeConcept: TARGET_FILL_PER_CODE_CONCEPT,
    },
    summary: {
      releaseBlockers: currentReleaseBlockers.length,
      targetModules: TARGET_MODULE_TITLES.size,
      mappedTargetModules: modules.length,
      conceptCount: modules.reduce((sum, module) => sum + module.conceptCount, 0),
      releaseQuestionDeficit: modules.reduce((sum, module) => sum + module.releaseQuestionDeficit, 0),
      strictMcDeficit: modules.reduce((sum, module) => sum + module.strictMcDeficit, 0),
      strictFillDeficit: modules.reduce((sum, module) => sum + module.strictFillDeficit, 0),
      missingCoverageRows: missingCoverageRows.length,
      mappingReady: modules.length === TARGET_MODULE_TITLES.size && missingCoverageRows.length === 0,
    },
    modules,
  };
}

function moduleLines(module) {
  return [
    `### ${module.title}`,
    "",
    `- Readiness: ${module.readiness}%`,
    `- Lessons: ${module.lessonIds.join(", ")}`,
    `- Release question deficit: ${module.releaseQuestionDeficit}/${module.releaseQuestionTarget}`,
    `- Strict manual MC deficit: ${module.strictMcDeficit}`,
    `- Strict manual Fill deficit: ${module.strictFillDeficit}`,
    "",
    "| Concept key | Manual MC | Manual Fill | Needs Fill | MC deficit | Fill deficit |",
    "|---|---:|---:|---:|---:|---:|",
    ...module.concepts.map((concept) =>
      `| \`${concept.key}\` | ${concept.manualMC}/${concept.requiredMC} | ${concept.manualFill}/${concept.requiredFill} | ${concept.requiresFill ? "yes" : "no"} | ${concept.mcDeficit} | ${concept.fillDeficit} |`,
    ),
  ];
}

function toMarkdown(report) {
  const lines = [
    "# Manual Question Blocker Map",
    "",
    `Date: ${report.date}`,
    "",
    "## Summary",
    "",
    `- Mapping ready: ${report.summary.mappingReady ? "yes" : "no"}`,
    `- Current release blockers: ${report.summary.releaseBlockers}`,
    `- Mapped target modules: ${report.summary.mappedTargetModules}/${report.summary.targetModules}`,
    `- Concepts to author manually now: ${report.summary.conceptCount}`,
    `- Release minimum question deficit: ${report.summary.releaseQuestionDeficit}`,
    `- Strict MC deficit: ${report.summary.strictMcDeficit}`,
    `- Strict Fill deficit: ${report.summary.strictFillDeficit}`,
    "",
    "## Policy",
    "",
    "- This report maps manual authoring work only.",
    "- It does not generate, seed, mutate, promote or import learner-facing questions.",
    "- New questions must be written and reviewed manually before entering `data/questions_bank.js`.",
    "",
    "## Blocker Modules",
    "",
    ...report.modules.flatMap(moduleLines),
    "",
  ];
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

  if (args.has("--strict") && !report.summary.mappingReady) {
    console.error("Manual question blocker map is not ready.");
    process.exitCode = 1;
  }
}

if (require.main === module) run();

module.exports = {
  buildReport,
  toMarkdown,
};
