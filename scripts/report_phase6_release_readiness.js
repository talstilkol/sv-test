#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const performanceBudget = require("./report_performance_budget.js");
const accessibilityAudit = require("./report_exam_accessibility_audit.js");
const pilotReadiness = require("./report_pilot_readiness.js");
const curriculumCoverage = require("./report_curriculum_coverage.js");

const ROOT = path.resolve(__dirname, "..");
const JSON_PATH = path.join(ROOT, "PHASE6_RELEASE_READINESS_REPORT.json");
const MD_PATH = path.join(ROOT, "PHASE6_RELEASE_READINESS_REPORT.md");
const REPORT_DATE = new Date().toISOString().slice(0,10);

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function check(id, passed, detail) {
  return { id, passed: Boolean(passed), status: passed ? "pass" : "fail", detail };
}

function buildReport() {
  const privacy = read("STUDENT_PRIVACY_DATA_RETENTION_POLICY.md");
  const release = read("RELEASE_READINESS_CHECKLIST.md");
  const releaseLower = release.toLowerCase();
  const pkg = JSON.parse(read("package.json"));
  const performance = performanceBudget.buildReport();
  const accessibility = accessibilityAudit.buildReport();
  const pilot = pilotReadiness.buildReport();
  const curriculum = curriculumCoverage.buildReport({ batchSize: 40 });
  const checks = [
    check(
      "privacy-retention-policy",
      privacy.includes("Local-First Rule") &&
        privacy.includes("Data Kept Locally") &&
        privacy.includes("Deletion and Export") &&
        privacy.includes("unknown/unavailable"),
      "Student privacy and retention policy must cover local-first storage, retention, export/delete and no backfill.",
    ),
    check(
      "performance-budget",
      performance.summary.ready &&
        performance.checks.some((item) => item.id === "mobile-cpu-budget") &&
        performance.checks.some((item) => item.id === "manual-bank-only"),
      "Performance budget must cover initial load, manual-only bank policy, offline cache and mobile CPU.",
    ),
    check(
      "wcag-screen-reader-pass",
      accessibility.summary.ready &&
        accessibility.checks.some((item) => item.id === "screen-reader-pass"),
      "Accessibility audit must include WCAG 2.1 AA screen-reader semantics.",
    ),
    check(
      "release-checklist",
      releaseLower.includes("smoke") &&
        releaseLower.includes("rollback") &&
        releaseLower.includes("cache") &&
        release.includes("QA evidence") &&
        releaseLower.includes("documentation"),
      "Release checklist must cover smoke tests, rollback, cache bump, QA evidence and documentation.",
    ),
    check(
      "curriculum-question-coverage",
      curriculum.summary.ready,
      `Curriculum question readiness must be green for all concepts: ready ${curriculum.summary.conceptReadyCount}/${curriculum.summary.totalConcepts}, MC gaps ${curriculum.summary.mcGapCount}, Fill gaps ${curriculum.summary.fillGapCount}, Activity gaps ${curriculum.summary.activityGapCount}.`,
    ),
    check(
      "pilot-readiness",
      pilot.summary.ready,
      "Pilot readiness gate must stay green before release.",
    ),
    check(
      "package-gate",
      pkg.scripts["phase6:release-readiness"] === "node scripts/report_phase6_release_readiness.js --summary" &&
        pkg.scripts["phase6:release-readiness:write"] === "node scripts/report_phase6_release_readiness.js --write --summary" &&
        pkg.scripts["phase6:release-readiness:strict"] === "node scripts/report_phase6_release_readiness.js --strict --summary",
      "Phase 6 release readiness scripts must be wired.",
    ),
  ];
  const failures = checks.filter((item) => !item.passed);
  return {
    reportVersion: "phase6-release-readiness-v1",
    date: REPORT_DATE,
    summary: {
      checks: checks.length,
      passed: checks.length - failures.length,
      failed: failures.length,
      ready: failures.length === 0,
    },
    checks,
    failures,
  };
}

function toMarkdown(report) {
  return [
    `# Phase 6 Release Readiness Report — ${report.date}`,
    "",
    `- Ready: ${report.summary.ready ? "Yes" : "No"}`,
    `- Checks: ${report.summary.passed}/${report.summary.checks}`,
    "",
    "| Check | Status | Detail |",
    "|---|---|---|",
    ...report.checks.map((item) =>
      `| ${item.id} | ${item.status} | ${String(item.detail || "").replace(/\|/g, "\\|")} |`,
    ),
    "",
  ].join("\n");
}

function writeReports(report) {
  fs.writeFileSync(JSON_PATH, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  fs.writeFileSync(MD_PATH, `${toMarkdown(report)}\n`, "utf8");
}

function run(argv = process.argv.slice(2)) {
  const report = buildReport();
  if (argv.includes("--write")) writeReports(report);
  if (argv.includes("--summary")) process.stdout.write(`${JSON.stringify(report.summary, null, 2)}\n`);
  else if (argv.includes("--json")) process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  else process.stdout.write(`${toMarkdown(report)}\n`);
  if (argv.includes("--strict") && !report.summary.ready) process.exitCode = 1;
  return report;
}

if (require.main === module) run();

module.exports = {
  buildReport,
  run,
  toMarkdown,
};
