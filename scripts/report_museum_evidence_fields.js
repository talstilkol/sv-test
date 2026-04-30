#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const REPORT_VERSION = "museum-evidence-fields-v1";
const REPORT_DATE = "2026-04-30";
const JSON_PATH = path.join(ROOT, "MUSEUM_EVIDENCE_FIELDS_REPORT.json");
const MD_PATH = path.join(ROOT, "MUSEUM_EVIDENCE_FIELDS_REPORT.md");

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function check(id, label, passed, detail) {
  return { id, label, passed: Boolean(passed), status: passed ? "pass" : "fail", detail };
}

function buildReport() {
  const app = read("app.js");
  const tests = read("tests/museum-master-plan.test.js");
  const notes = read("NOTEBOOKLM_MUSEUM_VIDEOS.md");
  const videoTracker = read("scripts/report_video_asset_tracker.js");
  const checks = [
    check(
      "source-list-present",
      "AI museum source list exists",
      app.includes("const AI_MUSEUM_SOURCES = [") &&
        app.includes("Turing 1950: Computing Machinery and Intelligence") &&
        app.includes("NIST AI Risk Management Framework") &&
        app.includes("GPT-3 paper"),
      "Historical and technical AI claims must have explicit source entries.",
    ),
    check(
      "source-panel-rendered",
      "Museum renders source/evidence links",
      app.includes("AI_MUSEUM_SOURCES.map") &&
        app.includes("museum-ai-source-grid") &&
        app.includes('target="_blank" rel="noopener noreferrer"'),
      "Source entries must be visible as external evidence links.",
    ),
    check(
      "claim-readiness-policy",
      "Museum claim readiness asks for clear source or unknown state",
      app.includes("יש מקור מידע ברור או הודעה שאין מקור.") &&
        app.includes("יש דרך לבדוק איכות: test, eval, review או מדד מוצר."),
      "Technical claims must expose source and validation expectations.",
    ),
    check(
      "video-tracker-evidence",
      "NotebookLM video tracker keeps source/replacement evidence explicit",
      notes.includes("NotebookLM") &&
        notes.includes("מוזיאון") &&
        videoTracker.includes('replacementDate: "unknown/unavailable"') &&
        videoTracker.includes("No replacement date is invented"),
      "Video evidence must keep missing replacement data explicit.",
    ),
    check(
      "museum-tests-lock-fields",
      "Museum tests lock evidence-bearing structures",
      tests.includes("AI_MUSEUM_TIMELINE") &&
        tests.includes("AI_MUSEUM_COMPARISON") &&
        tests.includes("AI_MUSEUM_MODEL_MILESTONES") &&
        tests.includes("AI_MUSEUM_PRODUCT_SCENARIOS"),
      "Museum tests must cover historical and technical claim structures.",
    ),
  ];
  const failures = checks.filter((item) => !item.passed);
  return {
    reportVersion: REPORT_VERSION,
    date: REPORT_DATE,
    target: "Museum source/evidence fields for historical and technical claims",
    policy: "Museum claims must expose source/evidence fields or remain unknown/unavailable; no historical or technical claim is backfilled without evidence.",
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
    `# Museum Evidence Fields Report — ${report.date}`,
    "",
    `- Target: ${report.target}`,
    `- Policy: ${report.policy}`,
    `- Ready: ${report.summary.ready ? "Yes" : "No"}`,
    `- Checks: ${report.summary.passed}/${report.summary.checks}`,
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
  fs.writeFileSync(JSON_PATH, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  fs.writeFileSync(MD_PATH, `${toMarkdown(report)}\n`, "utf8");
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
