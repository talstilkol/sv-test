#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const qaQuestions = require("./build_question_qa_checklist.js");
const criticalFlows = require("./report_svcollege_critical_flows.js");
const pwaOffline = require("./report_svcollege_pwa_offline_smoke.js");
const accessibility = require("./report_svcollege_accessibility_smoke.js");
const topTabs = require("./report_svcollege_top_tab_browser_smoke.js");
const consoleGate = require("./report_svcollege_console_gate.js");

const ROOT = path.resolve(__dirname, "..");
const REPORT_VERSION = "level-100-release-gate-v1";
const REPORT_DATE = "2026-04-29";
const JSON_PATH = path.join(ROOT, "LEVEL100_RELEASE_GATE.json");
const MD_PATH = path.join(ROOT, "LEVEL100_RELEASE_GATE.md");
const DATA_PATH = path.join(ROOT, "data", "level100_release_gates.js");

function commandCheck(id, label, command, args, { run = true } = {}) {
  if (!run) {
    return {
      id,
      label,
      passed: false,
      status: "not-run",
      command: [command, ...args].join(" "),
      detail: "Not executed in this process. Run the strict gate command to refresh real evidence.",
    };
  }
  const result = spawnSync(command, args, {
    cwd: ROOT,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  return {
    id,
    label,
    passed: result.status === 0,
    status: result.status === 0 ? "pass" : "fail",
    command: [command, ...args].join(" "),
    detail: result.status === 0
      ? "Command passed."
      : String(result.stderr || result.stdout || "Command failed.").trim().slice(0, 400),
  };
}

function safeReportCheck(id, label, command, build, passedFromReport) {
  try {
    const report = build();
    const passed = Boolean(passedFromReport(report));
    return {
      id,
      label,
      passed,
      status: passed ? "pass" : "fail",
      command,
      detail: passed ? "Report passed." : "Report has blockers.",
      summary: report.summary || {},
    };
  } catch (error) {
    return {
      id,
      label,
      passed: false,
      status: "fail",
      command,
      detail: error.message,
    };
  }
}

function qaCheck() {
  try {
    const checklist = qaQuestions.buildChecklist();
    qaQuestions.assertStrict(checklist);
    return {
      id: "qa-questions-strict",
      label: "qa:questions:strict",
      passed: true,
      status: "pass",
      command: "npm run qa:questions:strict",
      detail: "SVCollege prerequisite question QA gate passed.",
      summary: {
        totalQuestions: checklist.summary.totalQuestions,
        sampleSize: checklist.summary.sampleSize,
        svcollegePrerequisiteIssues: checklist.gates.svcollegePrerequisites.summary.totalIssues,
      },
    };
  } catch (error) {
    return {
      id: "qa-questions-strict",
      label: "qa:questions:strict",
      passed: false,
      status: "fail",
      command: "npm run qa:questions:strict",
      detail: error.message,
    };
  }
}

function buildReport(options = {}) {
  const runBuild = options.runBuild === true;
  const checks = [
    qaCheck(),
    commandCheck("build", "npm run build", "npm", ["run", "build"], { run: runBuild }),
    safeReportCheck(
      "critical-flows",
      "svcollege:critical-flows:strict",
      "npm run svcollege:critical-flows:strict",
      () => criticalFlows.buildReport(),
      (report) => report.summary.ready === true,
    ),
    safeReportCheck(
      "pwa-offline",
      "svcollege:pwa-offline:strict",
      "npm run svcollege:pwa-offline:strict",
      () => pwaOffline.buildReport(),
      (report) => report.summary.ready === true,
    ),
    safeReportCheck(
      "accessibility",
      "svcollege:accessibility:strict",
      "npm run svcollege:accessibility:strict",
      () => accessibility.buildReport(),
      (report) => report.summary.ready === true,
    ),
    safeReportCheck(
      "top-tabs",
      "svcollege:top-tabs:strict",
      "npm run svcollege:top-tabs:strict",
      () => topTabs.buildReport(),
      (report) => report.summary.ready === true,
    ),
    safeReportCheck(
      "console-gate",
      "svcollege:console-gate:strict",
      "npm run svcollege:console-gate:strict",
      () => consoleGate.buildReport(),
      (report) => report.summary.ready === true,
    ),
  ];
  const failed = checks.filter((check) => !check.passed);
  return {
    reportVersion: REPORT_VERSION,
    date: REPORT_DATE,
    target: "Level 100 release gate",
    policy: "Level 100 cannot open when QA, build or SVCollege smoke gates are red.",
    summary: {
      checks: checks.length,
      passed: checks.length - failed.length,
      failed: failed.length,
      ready: failed.length === 0,
    },
    checks,
    blockers: failed.map((check) => ({
      id: check.id,
      label: check.label,
      status: check.status,
      detail: check.detail,
      command: check.command,
    })),
  };
}

function toMarkdown(report) {
  return [
    `# Level 100 Release Gate — ${report.date}`,
    "",
    `- Target: ${report.target}`,
    `- Policy: ${report.policy}`,
    `- Ready: ${report.summary.ready ? "Yes" : "No"}`,
    `- Checks: ${report.summary.passed}/${report.summary.checks}`,
    "",
    "| Check | Status | Command | Detail |",
    "|---|---|---|---|",
    ...report.checks.map((check) =>
      `| ${check.label} | ${check.status} | \`${check.command}\` | ${String(check.detail || "").replace(/\|/g, "\\|")} |`,
    ),
    "",
  ].join("\n");
}

function toDataFile(report) {
  const payload = {
    reportVersion: report.reportVersion,
    date: report.date,
    ready: report.summary.ready,
    policy: report.policy,
    checks: report.checks.map((check) => ({
      id: check.id,
      label: check.label,
      passed: check.passed,
      status: check.status,
      command: check.command,
      detail: check.detail,
    })),
    blockers: report.blockers,
  };
  return [
    "// Generated by scripts/report_level100_release_gate.js --write",
    "// Source of truth for runtime blocking of global Level 100.",
    "(function () {",
    `  const report = ${JSON.stringify(payload, null, 2).replace(/\n/g, "\n  ")};`,
    "  window.LEVEL100_RELEASE_GATES = Object.freeze(report);",
    "}());",
    "",
  ].join("\n");
}

function run(argv = process.argv.slice(2)) {
  const report = buildReport({ runBuild: !argv.includes("--skip-build") });
  if (argv.includes("--write")) {
    fs.writeFileSync(JSON_PATH, `${JSON.stringify(report, null, 2)}\n`);
    fs.writeFileSync(MD_PATH, `${toMarkdown(report)}\n`);
    fs.writeFileSync(DATA_PATH, toDataFile(report));
  }
  if (argv.includes("--summary")) {
    process.stdout.write(`${JSON.stringify(report.summary, null, 2)}\n`);
  } else if (argv.includes("--json")) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
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
  toDataFile,
  toMarkdown,
};
