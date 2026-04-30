#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const questionQuality = require("./report_question_quality.js");

const ROOT = path.resolve(__dirname, "..");
const REPORT_VERSION = "metrics-dashboard-v1";
const REPORT_DATE = "2026-04-29";
const JSON_PATH = path.join(ROOT, "METRICS_DASHBOARD_REPORT.json");
const MD_PATH = path.join(ROOT, "METRICS_DASHBOARD_REPORT.md");

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function check(id, label, passed, detail) {
  return { id, label, passed: Boolean(passed), status: passed ? "pass" : "fail", detail };
}

function packageScripts() {
  return JSON.parse(read("package.json")).scripts || {};
}

function buildReport() {
  const app = read("app.js");
  const core = read("src/core/outcome-loop.js");
  const css = read("style.css");
  const scripts = packageScripts();
  const qa = questionQuality.buildQuestionQualityReport();
  const checks = [
    check(
      "core-dashboard",
      "Core metrics dashboard exists",
      core.includes("export function buildMetricsDashboard") &&
        core.includes("masteryVelocity(normalizedEvents)") &&
        core.includes("examScoreUplift(normalizedEvents)") &&
        core.includes("questionQualityIndex(questionQuality)"),
      "Outcome loop must compute D1/D7, mastery velocity, exam score uplift and question quality index.",
    ),
    check(
      "no-fake-policy",
      "Missing evidence remains unknown/unavailable",
      core.includes("missing metrics stay unknown/unavailable") &&
        core.includes('label: "unknown/unavailable"'),
      "Metrics dashboard must not backfill or fabricate missing learner evidence.",
    ),
    check(
      "learning-evidence-ui",
      "Learning Evidence renders dashboard cards",
      app.includes("function localMetricsDashboard") &&
        app.includes("Metrics Dashboard — מוכנות למבחן") &&
        app.includes("Mastery velocity") &&
        app.includes("Exam score uplift") &&
        app.includes("Question quality index"),
      "The portal must expose the dashboard inside Learning Evidence.",
    ),
    check(
      "dashboard-styles",
      "Dashboard styles are present",
      css.includes(".le-metrics-dashboard") &&
        css.includes(".le-dashboard-card") &&
        css.includes(".le-dashboard-policy"),
      "Metrics cards need a distinct, compact layout.",
    ),
    check(
      "quality-index-source",
      "Question quality index comes from real QA report",
      qa.reportVersion === "question-quality-v1" &&
        qa.summary.total > 0 &&
        Number.isFinite(qa.summary.questionQualityIndex),
      `Question QA report index: ${qa.summary.questionQualityIndex}% across ${qa.summary.total} questions.`,
    ),
    check(
      "package-scripts",
      "Metrics dashboard gate is wired",
      scripts["metrics:dashboard"] === "node scripts/report_metrics_dashboard.js --summary" &&
        scripts["metrics:dashboard:write"] === "node scripts/report_metrics_dashboard.js --write --summary" &&
        scripts["metrics:dashboard:strict"] === "node scripts/report_metrics_dashboard.js --strict --summary",
      "package.json must expose summary/write/strict metrics dashboard commands.",
    ),
  ];
  const blockers = checks.filter((item) => !item.passed);
  return {
    reportVersion: REPORT_VERSION,
    date: REPORT_DATE,
    target: "SVCollege metrics dashboard",
    policy: "D1/D7 retention, mastery velocity, exam uplift and question quality index use only local learner evidence and repository QA reports.",
    summary: {
      checks: checks.length,
      passed: checks.length - blockers.length,
      failed: blockers.length,
      ready: blockers.length === 0,
      questionQualityIndex: qa.summary.questionQualityIndex,
      totalQuestions: qa.summary.total,
    },
    checks,
    blockers: blockers.map((item) => ({ id: item.id, label: item.label, detail: item.detail })),
  };
}

function toMarkdown(report) {
  return [
    `# Metrics Dashboard Report — ${report.date}`,
    "",
    `- Target: ${report.target}`,
    `- Policy: ${report.policy}`,
    `- Ready: ${report.summary.ready ? "Yes" : "No"}`,
    `- Checks: ${report.summary.passed}/${report.summary.checks}`,
    `- Question Quality Index: ${report.summary.questionQualityIndex}% across ${report.summary.totalQuestions} questions`,
    "",
    "| Check | Status | Detail |",
    "|---|---|---|",
    ...report.checks.map((item) =>
      `| ${item.label} | ${item.status} | ${String(item.detail || "").replace(/\|/g, "\\|")} |`,
    ),
    "",
  ].join("\n");
}

function writeReport(report) {
  fs.writeFileSync(JSON_PATH, `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(MD_PATH, `${toMarkdown(report)}\n`);
}

function run(argv = process.argv.slice(2)) {
  const report = buildReport();
  if (argv.includes("--write")) writeReport(report);
  if (argv.includes("--summary")) process.stdout.write(`${JSON.stringify(report.summary, null, 2)}\n`);
  else if (argv.includes("--json")) process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  else process.stdout.write(`${toMarkdown(report)}\n`);
  if (argv.includes("--strict") && !report.summary.ready) process.exitCode = 1;
  return report;
}

if (require.main === module) run();

module.exports = { buildReport, run, toMarkdown };
