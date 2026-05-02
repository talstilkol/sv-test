#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const JSON_PATH = path.join(ROOT, "PILOT_READINESS_REPORT.json");
const MD_PATH = path.join(ROOT, "PILOT_READINESS_REPORT.md");
const REPORT_DATE = new Date().toISOString().slice(0,10);

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function check(id, passed, detail) {
  return { id, passed: Boolean(passed), status: passed ? "pass" : "fail", detail };
}

function buildReport() {
  const pilot = read("PILOT_READINESS_PLAN.md");
  const teacher = read("TEACHER_ONBOARDING_KIT.md");
  const index = read("index.html");
  const app = read("app.js");
  const supportCore = read("src/core/support-report.js");
  const pkg = JSON.parse(read("package.json"));
  const checks = [
    check(
      "pilot-cohort",
      pilot.includes("10-30 active SVCollege") && pilot.includes("D0") && pilot.includes("D14"),
      "Pilot plan must define 10-30 learners, baseline and final-test timeline.",
    ),
    check(
      "pilot-metrics",
      pilot.includes("D1") && pilot.includes("D7") && pilot.includes("module mastery") && pilot.includes("unknown/unavailable"),
      "Pilot plan must require D1/D7, mastery metrics and no fabricated missing data.",
    ),
    check(
      "teacher-onboarding",
      teacher.includes("Class Setup") && teacher.includes("Assignment Recipe") && teacher.includes("Heatmap Interpretation"),
      "Teacher kit must cover setup, assignment recipes and heatmap interpretation.",
    ),
    check(
      "support-ui",
      index.includes("support-report-modal") &&
        index.includes("support-report-screenshot") &&
        app.includes("generateSupportReportPayload") &&
        app.includes("currentSupportContext"),
      "App must expose a support report flow with screenshot and context payload.",
    ),
    check(
      "support-payload-contract",
      supportCore.includes("buildSupportReport") &&
        supportCore.includes("buildSupportContext") &&
        supportCore.includes("normalizeScreenshot") &&
        supportCore.includes("localOnly: true"),
      "Support payload core must normalize context, screenshot and local-only privacy metadata.",
    ),
    check(
      "package-gate",
      pkg.scripts["pilot:readiness"] === "node scripts/report_pilot_readiness.js --summary" &&
        pkg.scripts["pilot:readiness:write"] === "node scripts/report_pilot_readiness.js --write --summary" &&
        pkg.scripts["pilot:readiness:strict"] === "node scripts/report_pilot_readiness.js --strict --summary",
      "Pilot readiness scripts must be wired.",
    ),
  ];
  const failures = checks.filter((item) => !item.passed);
  return {
    reportVersion: "pilot-readiness-v1",
    date: REPORT_DATE,
    summary: {
      checks: checks.length,
      passed: checks.length - failures.length,
      failed: failures.length,
      ready: failures.length === 0,
    },
    policy: {
      noFakePilotResults: true,
      missingPilotResults: "unknown/unavailable",
      supportPayloadLocalOnly: true,
    },
    checks,
    failures,
  };
}

function toMarkdown(report) {
  return [
    `# Pilot Readiness Report — ${report.date}`,
    "",
    `- Ready: ${report.summary.ready ? "Yes" : "No"}`,
    `- Checks: ${report.summary.passed}/${report.summary.checks}`,
    "- Pilot results: `unknown/unavailable` until the real cohort runs.",
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
