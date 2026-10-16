#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const { byFilename } = require("./lib/sort.js");

const ROOT = path.resolve(__dirname, "..");
const JSON_PATH = path.join(ROOT, "FINISH_LINE_PRERELEASE_REPORT.json");
const MD_PATH = path.join(ROOT, "FINISH_LINE_PRERELEASE_REPORT.md");
const REPORT_VERSION = "finish-line-prerelease-v1";
const REPORT_DATE = new Date().toISOString().slice(0,10);

const SOURCE_ENTRIES = Object.freeze(["app.js", "src", "scripts", "tests", "data"]);
const IGNORED_DIRS = Object.freeze(new Set(["node_modules", "output", ".git"]));
const FORBIDDEN_NATIVE_RANDOM_TOKEN = ["Math", "random"].join(".");

const GATES = Object.freeze([
  { id: "guard-no-auto-questions", label: "No automatic question generation", command: "npm", args: ["run", "guard:no-auto-questions"] },
  { id: "validate-strict", label: "Question bank strict validation", command: "npm", args: ["run", "validate:strict"] },
  { id: "qa-questions-strict", label: "Question QA strict", command: "npm", args: ["run", "qa:questions:strict"] },
  { id: "quality-questions-strict", label: "Question quality strict", command: "npm", args: ["run", "quality:questions:strict"] },
  { id: "questions-blocker-map-strict", label: "Manual blocker map strict", command: "npm", args: ["run", "questions:blocker-map:strict"] },
  { id: "questions-coverage-targets-strict", label: "Manual question coverage target strict", command: "npm", args: ["run", "questions:coverage-targets:strict"] },
  { id: "questions-reuse-audit-strict", label: "Question reuse audit strict", command: "npm", args: ["run", "questions:reuse-audit:strict"] },
  { id: "svcollege-readiness-release", label: "SVCollege release readiness", command: "npm", args: ["run", "svcollege:readiness:release"] },
  { id: "svcollege-tab-matrix-strict", label: "SVCollege tab matrix strict", command: "npm", args: ["run", "svcollege:tab-matrix:strict"] },
  { id: "svcollege-critical-flows-strict", label: "SVCollege critical flows strict", command: "npm", args: ["run", "svcollege:critical-flows:strict"] },
  { id: "svcollege-command-center-strict", label: "SVCollege command center strict", command: "npm", args: ["run", "svcollege:command-center:strict"] },
  { id: "svcollege-student-export-strict", label: "SVCollege student export strict", command: "npm", args: ["run", "svcollege:student-export:strict"] },
  { id: "exam-mock-variants-strict", label: "SVCollege mock variants strict", command: "npm", args: ["run", "exam:mock-variants:strict"] },
  { id: "svcollege-console-gate-strict", label: "SVCollege console gate strict", command: "npm", args: ["run", "svcollege:console-gate:strict"] },
  { id: "svcollege-pwa-offline-strict", label: "SVCollege PWA offline strict", command: "npm", args: ["run", "svcollege:pwa-offline:strict"] },
  { id: "vitest-run", label: "Vitest full suite", command: "npm", args: ["test", "--", "--run"] },
  { id: "vite-build", label: "Production build", command: "npm", args: ["run", "build"] },
]);

function relative(file) {
  return path.relative(ROOT, file);
}

function listSourceFiles(entry, output = []) {
  const full = path.join(ROOT, entry);
  if (!fs.existsSync(full)) return output;
  const stat = fs.statSync(full);
  if (stat.isFile()) {
    output.push(full);
    return output;
  }
  if (!stat.isDirectory()) return output;
  fs.readdirSync(full)
    .sort(byFilename)
    .forEach((name) => {
      if (IGNORED_DIRS.has(name) || name.startsWith(".")) return;
      listSourceFiles(path.join(entry, name), output);
    });
  return output;
}

function scanNativeRandom() {
  const files = SOURCE_ENTRIES.flatMap((entry) => listSourceFiles(entry));
  const matches = files
    .filter((file) => /\.(js|mjs|cjs|ts|tsx|jsx|html|css|json)$/.test(file))
    .flatMap((file) => {
      const text = fs.readFileSync(file, "utf8");
      if (!text.includes(FORBIDDEN_NATIVE_RANDOM_TOKEN)) return [];
      return [{ file: relative(file), token: "native-random-api" }];
    });

  return {
    id: "no-native-random-scan",
    label: "No native random API in active source",
    commandText: "internal active-source scan",
    status: matches.length ? "fail" : "pass",
    passed: matches.length === 0,
    exitCode: matches.length ? 1 : 0,
    detail: matches.length ? matches.map((item) => `${item.file}: ${item.token}`).join("; ") : "No native random API token found.",
    stdout: "",
    stderr: "",
  };
}

function runGate(gate, execute) {
  const commandText = [gate.command, ...gate.args].join(" ");
  if (!execute) {
    return {
      ...gate,
      commandText,
      status: "not-run",
      passed: false,
      exitCode: null,
      detail: "Not executed in plan mode.",
      stdout: "",
      stderr: "",
    };
  }

  const result = spawnSync(gate.command, gate.args, {
    cwd: ROOT,
    encoding: "utf8",
    env: { ...process.env, CI: process.env.CI || "1" },
    maxBuffer: 1024 * 1024 * 20,
  });
  const exitCode = typeof result.status === "number" ? result.status : 1;
  const stderr = (result.stderr || "").trim();
  const stdout = (result.stdout || "").trim();
  return {
    ...gate,
    commandText,
    status: exitCode === 0 ? "pass" : "fail",
    passed: exitCode === 0,
    exitCode,
    detail: exitCode === 0 ? "passed" : (stderr.split("\n").filter(Boolean).slice(-3).join(" | ") || stdout.split("\n").filter(Boolean).slice(-3).join(" | ") || "failed"),
    stdout,
    stderr,
  };
}

function buildReport(options = {}) {
  const execute = Boolean(options.execute);
  const nativeRandomGate = scanNativeRandom();
  const gateResults = GATES.map((gate) => runGate(gate, execute));
  const checks = [nativeRandomGate, ...gateResults];
  const failed = checks.filter((check) => check.status === "fail");
  const notRun = checks.filter((check) => check.status === "not-run");
  return {
    reportVersion: REPORT_VERSION,
    date: REPORT_DATE,
    policy: {
      manualQuestionsOnly: true,
      generatesQuestions: false,
      noFakeData: true,
      noNativeRandom: true,
      continueAfterFailure: true,
    },
    summary: {
      execute,
      checks: checks.length,
      passed: checks.filter((check) => check.status === "pass").length,
      failed: failed.length,
      notRun: notRun.length,
      ready: execute && failed.length === 0,
    },
    checks,
    blockers: failed.map((check) => ({
      id: check.id,
      label: check.label,
      command: check.commandText,
      detail: check.detail,
    })),
  };
}

function toMarkdown(report) {
  const lines = [
    "# Finish Line 1 Pre-Release Report",
    "",
    `Date: ${report.date}`,
    `Version: ${report.reportVersion}`,
    "",
    "## Summary",
    "",
    `- Executed: ${report.summary.execute ? "yes" : "no"}`,
    `- Ready: ${report.summary.ready ? "yes" : "no"}`,
    `- Passed: ${report.summary.passed}/${report.summary.checks}`,
    `- Failed: ${report.summary.failed}`,
    `- Not run: ${report.summary.notRun}`,
    "",
    "## Policy",
    "",
    "- Learner-facing questions remain manual-only.",
    "- This report does not create, seed or rewrite questions.",
    "- Missing data remains `unknown/unavailable`; failures are reported as blockers.",
    "",
    "## Checks",
    "",
    "| Gate | Status | Command | Detail |",
    "|---|---:|---|---|",
    ...report.checks.map((check) => `| ${check.label} | ${check.status} | \`${check.commandText}\` | ${String(check.detail).replace(/\|/g, "/")} |`),
    "",
    "## Blockers",
    "",
    ...(report.blockers.length
      ? report.blockers.map((blocker) => `- ${blocker.id}: ${blocker.detail}`)
      : ["- None"]),
    "",
  ];
  return `${lines.join("\n")}\n`;
}

function writeReport(report) {
  fs.writeFileSync(JSON_PATH, `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(MD_PATH, toMarkdown(report));
}

function run(argv = process.argv.slice(2)) {
  const execute = argv.includes("--strict") || argv.includes("--execute") || argv.includes("--write");
  const report = buildReport({ execute });
  if (argv.includes("--write")) writeReport(report);
  if (argv.includes("--json")) process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  else if (argv.includes("--summary")) process.stdout.write(`${JSON.stringify(report.summary, null, 2)}\n`);
  else process.stdout.write(toMarkdown(report));
  if (argv.includes("--strict") && !report.summary.ready) process.exitCode = 1;
  return report;
}

if (require.main === module) run();

module.exports = { GATES, buildReport, run, scanNativeRandom, toMarkdown };
