#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const REPORT_VERSION = "no-auto-question-generation-v1";
const REPORT_DATE = new Date().toISOString().slice(0,10);

const DELETED_TOOL_FILES = Object.freeze([
  "scripts/seed_questions.js",
  "scripts/audit_seeded_questions.js",
  "tests/seeded-qa.test.js",
]);

const RUNTIME_FILES = Object.freeze([
  "app.js",
  "content-loader.js",
  "index.html",
  "service-worker.js",
]);

const FORBIDDEN_RUNTIME_TOKENS = Object.freeze([
  "ensureSeededBank",
  "generatedMCVariantsForConcept",
  "makeCodeFill",
  "generatedQuestionId",
  "questions_bank_seeded.js",
]);

const ACTIVE_CODE_DIRS = Object.freeze(["app.js", "src", "scripts", "tests", "data"]);
const ARCHIVE_FILES = Object.freeze(["data/questions_bank_seeded.js"]);

function absolute(relativePath) {
  return path.join(ROOT, relativePath);
}

function exists(relativePath) {
  return fs.existsSync(absolute(relativePath));
}

function read(relativePath) {
  return fs.readFileSync(absolute(relativePath), "utf8");
}

function listFiles(entry, output = []) {
  const full = absolute(entry);
  if (!fs.existsSync(full)) return output;
  const stat = fs.statSync(full);
  if (stat.isFile()) {
    output.push(entry);
    return output;
  }
  if (!stat.isDirectory()) return output;
  for (const name of fs.readdirSync(full).sort()) {
    if (name === "node_modules" || name === "output" || name.startsWith(".")) continue;
    listFiles(path.join(entry, name), output);
  }
  return output;
}

function sourceFiles() {
  const files = [];
  ACTIVE_CODE_DIRS.forEach((entry) => listFiles(entry, files));
  return files.filter((file) => /\.(js|mjs|cjs|ts|tsx|jsx|html|css|json)$/.test(file));
}

function packageScripts() {
  return JSON.parse(read("package.json")).scripts || {};
}

function addCheck(checks, id, label, passed, detail, evidence = []) {
  checks.push({
    id,
    label,
    passed: Boolean(passed),
    status: passed ? "pass" : "fail",
    detail,
    evidence,
  });
}

function findTokenMatches(files, tokens) {
  const matches = [];
  files.forEach((file) => {
    const text = read(file);
    tokens.forEach((token) => {
      if (!text.includes(token)) return;
      matches.push({ file, token });
    });
  });
  return matches;
}

function findNativeRandomMatches() {
  const token = ["Math", "random"].join(".");
  return sourceFiles()
    .filter((file) => !ARCHIVE_FILES.includes(file))
    .flatMap((file) => {
      const text = read(file);
      return text.includes(token) ? [{ file, token: "native-random-api" }] : [];
    });
}

function findPackageSeedScripts() {
  const scripts = packageScripts();
  return Object.entries(scripts)
    .filter(([, command]) => /seed_questions|audit_seeded|seeded-qa/.test(String(command)))
    .map(([name, command]) => ({ name, command }));
}

function buildReport() {
  const checks = [];
  const deletedStillPresent = DELETED_TOOL_FILES.filter(exists);
  const packageSeedScripts = findPackageSeedScripts();
  const runtimeMatches = findTokenMatches(RUNTIME_FILES, FORBIDDEN_RUNTIME_TOKENS);
  const nativeRandomMatches = findNativeRandomMatches();
  const archiveExists = exists("data/questions_bank_seeded.js");

  addCheck(
    checks,
    "deleted-generation-tools",
    "Automatic question generation tool files stay deleted",
    deletedStillPresent.length === 0,
    deletedStillPresent.length ? `Still present: ${deletedStillPresent.join(", ")}` : "Deleted files remain absent.",
    DELETED_TOOL_FILES,
  );
  addCheck(
    checks,
    "package-generation-scripts",
    "Package scripts do not expose seed/audit generation commands",
    packageSeedScripts.length === 0,
    packageSeedScripts.length
      ? packageSeedScripts.map((item) => `${item.name}: ${item.command}`).join("; ")
      : "No package script invokes legacy seed or seeded audit tools.",
    Object.keys(packageScripts()),
  );
  addCheck(
    checks,
    "runtime-seeded-bank-block",
    "Runtime and service worker do not load the legacy generated bank",
    runtimeMatches.length === 0,
    runtimeMatches.length
      ? runtimeMatches.map((item) => `${item.file}: ${item.token}`).join("; ")
      : "No forbidden generated-bank hooks found in runtime files.",
    RUNTIME_FILES,
  );
  addCheck(
    checks,
    "archive-inactive",
    "Legacy seeded bank is archive-only",
    archiveExists && runtimeMatches.length === 0,
    archiveExists
      ? "Archive exists but is not referenced by runtime files."
      : "Archive missing; that is allowed only after explicit deletion policy.",
    ARCHIVE_FILES,
  );
  addCheck(
    checks,
    "no-native-random",
    "Active authored code does not use native random",
    nativeRandomMatches.length === 0,
    nativeRandomMatches.length
      ? nativeRandomMatches.map((item) => `${item.file}: ${item.token}`).join("; ")
      : "No native random API token found in active code files.",
    ACTIVE_CODE_DIRS,
  );

  const blockers = checks.filter((check) => !check.passed);
  return {
    reportVersion: REPORT_VERSION,
    date: REPORT_DATE,
    policy:
      "Learner-facing questions are manual-only. Legacy generated archives may remain inactive, but no runtime path, package script or service worker may load or regenerate them.",
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

function run(argv = process.argv.slice(2)) {
  const report = buildReport();
  if (argv.includes("--json")) process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  else process.stdout.write(`${JSON.stringify(report.summary, null, 2)}\n`);
  if (argv.includes("--strict") && !report.summary.ready) process.exitCode = 1;
  return report;
}

if (require.main === module) run();

module.exports = { buildReport, run };
