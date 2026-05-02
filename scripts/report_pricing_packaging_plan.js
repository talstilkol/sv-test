#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const REPORT_VERSION = "pricing-packaging-plan-v1";
const REPORT_DATE = new Date().toISOString().slice(0,10);
const JSON_PATH = path.join(ROOT, "PRICING_PACKAGING_PLAN_REPORT.json");
const MD_PATH = path.join(ROOT, "PRICING_PACKAGING_PLAN_REPORT.md");

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
  const plan = read("PRICING_PACKAGING_PLAN.md");
  const scripts = packageScripts();
  const checks = [
    check(
      "exam-content-unlocked",
      "Exam-critical learning remains unlocked",
      plan.includes("All exam-critical learning content stays available") &&
        plan.includes("Premium cannot lock") &&
        plan.includes("A concept required by SVCollege AI & Full Stack"),
      "Pricing must not block lessons, concepts, mock exams, explanations or local progress evidence.",
    ),
    check(
      "packages-defined",
      "Post-exam packages are defined",
      plan.includes("Core Exam Edition") &&
        plan.includes("Mentor Review") &&
        plan.includes("Teacher Lite") &&
        plan.includes("Post-Exam Career Practice"),
      "Packaging must define core learning and post-exam service layers.",
    ),
    check(
      "prices-not-fabricated",
      "Price points are not fabricated",
      plan.includes("unknown/unavailable until real pricing validation") &&
        plan.includes("No fabricated revenue assumptions") &&
        plan.includes("No invented conversion rates"),
      "Pricing data must remain unknown/unavailable until real validation exists.",
    ),
    check(
      "readiness-gated",
      "Charging is gated by readiness and metrics",
      plan.includes("svcollege:readiness:release") &&
        plan.includes("svcollege:tab-matrix:strict") &&
        plan.includes("svcollege:command-center:strict") &&
        plan.includes("metrics:dashboard:strict"),
      "Paid packaging must wait for exam readiness, tab matrix, command center and metrics gates.",
    ),
    check(
      "package-scripts",
      "Pricing packaging gate is wired",
      scripts["pricing:packaging"] === "node scripts/report_pricing_packaging_plan.js --summary" &&
        scripts["pricing:packaging:write"] === "node scripts/report_pricing_packaging_plan.js --write --summary" &&
        scripts["pricing:packaging:strict"] === "node scripts/report_pricing_packaging_plan.js --strict --summary",
      "package.json must expose summary/write/strict pricing packaging commands.",
    ),
  ];
  const blockers = checks.filter((item) => !item.passed);
  return {
    reportVersion: REPORT_VERSION,
    date: REPORT_DATE,
    target: "Post-exam pricing and packaging",
    policy: "Premium services can add mentoring, teacher operations and post-exam career practice, but cannot lock required exam learning.",
    summary: {
      checks: checks.length,
      passed: checks.length - blockers.length,
      failed: blockers.length,
      ready: blockers.length === 0,
    },
    checks,
    blockers: blockers.map((item) => ({ id: item.id, label: item.label, detail: item.detail })),
  };
}

function toMarkdown(report) {
  return [
    `# Pricing Packaging Plan Report — ${report.date}`,
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
