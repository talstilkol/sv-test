#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const criticalFlows = require("./report_svcollege_critical_flows.js");

const ROOT = path.resolve(__dirname, "..");
const REPORT_VERSION = "svcollege-console-gate-v1";

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

function hasAll(text, snippets) {
  return snippets.every((snippet) => text.includes(snippet));
}

function buildReport() {
  const smoke = read("SVCOLLEGE_BROWSER_SMOKE.md");
  const app = read("app.js");
  const flowReport = criticalFlows.buildReport();
  const checks = [
    {
      id: "desktop-console-zero",
      label: "Desktop browser smoke has zero console errors",
      passed: hasAll(smoke, ["| Console error logs | 0 |", "Top-tab desktop smoke | Pass"]),
    },
    {
      id: "mobile-console-zero",
      label: "Mobile browser smoke has zero console errors and warnings",
      passed: hasAll(smoke, ["Console | `0` errors, `0` warnings", "Mobile 390×844"]),
    },
    {
      id: "critical-flows-ready",
      label: "Critical practice flows are ready",
      passed: flowReport.summary.ready === true && flowReport.summary.failed === 0,
    },
    {
      id: "runtime-error-handler-free-critical-code",
      label: "Critical flow handlers do not emit console errors",
      passed: !/console\.error\s*\(/.test(app),
    },
    {
      id: "strict-command-available",
      label: "Strict console gate command is wired into package scripts",
      passed: read("package.json").includes('"svcollege:console-gate:strict"'),
    },
  ].map((check) => ({
    ...check,
    status: check.passed ? "pass" : "fail",
    failures: check.passed ? [] : [`failed console gate: ${check.label}`],
  }));
  const failed = checks.filter((check) => !check.passed);
  return {
    reportVersion: REPORT_VERSION,
    date: "2026-04-29",
    target: "SVCollege runtime console error release gate",
    summary: {
      checks: checks.length,
      passed: checks.length - failed.length,
      failed: failed.length,
      criticalFlows: flowReport.summary.flows,
      ready: failed.length === 0,
    },
    checks,
  };
}

function toMarkdown(report) {
  return [
    "# SVCollege Console Gate",
    "",
    `- Date: ${report.date}`,
    `- Target: ${report.target}`,
    `- Checks: ${report.summary.passed}/${report.summary.checks}`,
    `- Critical flows: ${report.summary.criticalFlows}`,
    `- Ready: ${report.summary.ready ? "Yes" : "No"}`,
    "",
    "| Check | Status | Failures |",
    "|---|---|---|",
    ...report.checks.map((check) =>
      `| ${check.label} | ${check.status} | ${check.failures.join("<br>") || "none"} |`,
    ),
    "",
  ].join("\n");
}

function run(argv = process.argv.slice(2)) {
  const report = buildReport();
  if (argv.includes("--json")) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  } else if (argv.includes("--summary")) {
    process.stdout.write(`${JSON.stringify(report.summary, null, 2)}\n`);
  } else {
    process.stdout.write(`${toMarkdown(report)}\n`);
  }
  if (argv.includes("--strict") && !report.summary.ready) process.exitCode = 1;
  return report;
}

if (require.main === module) run();

module.exports = {
  buildReport,
  run,
  toMarkdown,
};
