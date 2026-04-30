#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const REPORT_VERSION = "exam-edition-release-freeze-v1";
const REPORT_DATE = "2026-04-29";
const RELEASE_TAG = "svcollege-exam-edition-2026-04-29";
const JSON_PATH = path.join(ROOT, "EXAM_EDITION_RELEASE_FREEZE.json");
const MD_PATH = path.join(ROOT, "EXAM_EDITION_RELEASE_FREEZE.md");
const DATA_PATH = path.join(ROOT, "data", "exam_edition_release_freeze.js");

const REQUIRED_GATES = [
  { id: "validate-strict", label: "validate:strict", command: "npm", args: ["run", "validate:strict"] },
  { id: "qa-questions-strict", label: "qa:questions:strict", command: "npm", args: ["run", "qa:questions:strict"] },
  { id: "readiness-release", label: "svcollege:readiness:release", command: "npm", args: ["run", "svcollege:readiness:release"] },
  { id: "tab-matrix-strict", label: "svcollege:tab-matrix:strict", command: "npm", args: ["run", "svcollege:tab-matrix:strict"] },
  { id: "command-center-strict", label: "svcollege:command-center:strict", command: "npm", args: ["run", "svcollege:command-center:strict"] },
  { id: "student-export-strict", label: "svcollege:student-export:strict", command: "npm", args: ["run", "svcollege:student-export:strict"] },
  { id: "critical-flows-strict", label: "svcollege:critical-flows:strict", command: "npm", args: ["run", "svcollege:critical-flows:strict"] },
  { id: "full-portal-smoke-strict", label: "svcollege:full-portal-smoke:strict", command: "npm", args: ["run", "svcollege:full-portal-smoke:strict"] },
  { id: "visual-overlap-strict", label: "svcollege:visual-overlap:strict", command: "npm", args: ["run", "svcollege:visual-overlap:strict"] },
  { id: "pwa-offline-strict", label: "svcollege:pwa-offline:strict", command: "npm", args: ["run", "svcollege:pwa-offline:strict"] },
  { id: "profile-backup-restore-strict", label: "profile:backup-restore:strict", command: "npm", args: ["run", "profile:backup-restore:strict"] },
  { id: "exam-accessibility-strict", label: "exam:accessibility:strict", command: "npm", args: ["run", "exam:accessibility:strict"] },
  { id: "performance-budget-strict", label: "performance:budget:strict", command: "npm", args: ["run", "performance:budget:strict"] },
  { id: "questions-reuse-audit-strict", label: "questions:reuse-audit:strict", command: "npm", args: ["run", "questions:reuse-audit:strict"] },
  { id: "level100-release-gate-strict", label: "level100:release-gate:strict", command: "npm", args: ["run", "level100:release-gate:strict"] },
  { id: "unit-tests", label: "npm test -- --run", command: "npm", args: ["test", "--", "--run"] },
  { id: "build", label: "npm run build", command: "npm", args: ["run", "build"] },
];

const RELEASE_NOTES = Object.freeze([
  "Finish Line 1 covers SVCollege AI & Full Stack across lessons, tabs, question banks, exports and readiness gates.",
  "Exam OS includes deterministic standard, hard, stress and code-only final simulations.",
  "Post-exam review groups wrong answers by concept, misconception and prerequisite gap, then queues prove-again retests.",
  "Release freeze evidence is valid only when every listed gate is executed and passes in this repository.",
]);

function commandLine(gate) {
  return [gate.command, ...gate.args].join(" ");
}

function runGate(gate, options = {}) {
  if (options.execute !== true) {
    return {
      id: gate.id,
      label: gate.label,
      command: commandLine(gate),
      passed: false,
      status: "not-run",
      detail: "Gate was not executed in this process. Run with --strict or --write to refresh real release evidence.",
    };
  }
  const result = spawnSync(gate.command, gate.args, {
    cwd: ROOT,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  const output = String(result.stderr || result.stdout || "").trim();
  return {
    id: gate.id,
    label: gate.label,
    command: commandLine(gate),
    passed: result.status === 0,
    status: result.status === 0 ? "pass" : "fail",
    detail: result.status === 0 ? "Gate passed." : output.slice(0, 500) || "Gate failed.",
  };
}

function currentCommit() {
  const result = spawnSync("git", ["rev-parse", "--short", "HEAD"], {
    cwd: ROOT,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  });
  const commit = String(result.stdout || "").trim();
  return commit || "unknown/unavailable";
}

function buildReport(options = {}) {
  const execute = options.execute === true;
  const checks = REQUIRED_GATES.map((gate) => runGate(gate, { execute }));
  const blockers = checks
    .filter((check) => !check.passed)
    .map((check) => ({
      id: check.id,
      label: check.label,
      command: check.command,
      status: check.status,
      detail: check.detail,
    }));

  return {
    reportVersion: REPORT_VERSION,
    date: REPORT_DATE,
    releaseTag: RELEASE_TAG,
    commit: currentCommit(),
    target: "SVCollege AI & Full Stack Exam Edition",
    policy: "Exam Edition can be frozen only when all P9 smoke, readiness, export, accessibility, performance, build and test gates pass.",
    summary: {
      checks: checks.length,
      passed: checks.length - blockers.length,
      failed: blockers.length,
      ready: blockers.length === 0,
      frozen: blockers.length === 0,
    },
    checks,
    blockers,
    releaseNotes: RELEASE_NOTES,
  };
}

function toMarkdown(report) {
  return [
    `# Exam Edition Release Freeze — ${report.date}`,
    "",
    `- Release tag: \`${report.releaseTag}\``,
    `- Commit: \`${report.commit}\``,
    `- Target: ${report.target}`,
    `- Policy: ${report.policy}`,
    `- Frozen: ${report.summary.frozen ? "Yes" : "No"}`,
    `- Checks: ${report.summary.passed}/${report.summary.checks}`,
    "",
    "## Release Notes",
    "",
    ...(report.releaseNotes || RELEASE_NOTES).map((item) => `- ${item}`),
    "",
    "| Gate | Status | Command | Detail |",
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
    releaseTag: report.releaseTag,
    commit: report.commit,
    target: report.target,
    policy: report.policy,
    ready: report.summary.ready,
    frozen: report.summary.frozen,
    checks: report.checks.map((check) => ({
      id: check.id,
      label: check.label,
      command: check.command,
      passed: check.passed,
      status: check.status,
      detail: check.detail,
    })),
    blockers: report.blockers,
    releaseNotes: report.releaseNotes || RELEASE_NOTES,
  };
  return [
    "// Generated by scripts/report_exam_edition_release_freeze.js --write",
    "// Source of truth for the frozen SVCollege Exam Edition evidence bundle.",
    "(function () {",
    `  const report = ${JSON.stringify(payload, null, 2).replace(/\n/g, "\n  ")};`,
    "  window.EXAM_EDITION_RELEASE_FREEZE = Object.freeze(report);",
    "}());",
    "",
  ].join("\n");
}

function writeReport(report) {
  fs.writeFileSync(JSON_PATH, `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(MD_PATH, `${toMarkdown(report)}\n`);
  fs.writeFileSync(DATA_PATH, toDataFile(report));
}

function run(argv = process.argv.slice(2)) {
  const execute = argv.includes("--strict") || argv.includes("--write");
  const report = buildReport({ execute });
  if (argv.includes("--write")) writeReport(report);
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
  REQUIRED_GATES,
  RELEASE_NOTES,
  buildReport,
  run,
  toDataFile,
  toMarkdown,
};
