#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const {
  CONTENT_SCHEMA_CONTRACT,
  CONTENT_SCHEMA_CONTRACT_VERSION,
  entityNames,
  requiredFieldNames,
} = require("../src/core/content-schema-contract.js");

const ROOT = path.resolve(__dirname, "..");
const REPORT_DATE = "2026-04-29";
const JSON_PATH = path.join(ROOT, "CONTENT_SCHEMA_CONTRACT_REPORT.json");
const MD_PATH = path.join(ROOT, "CONTENT_SCHEMA_CONTRACT_REPORT.md");

const REQUIRED_ENTITIES = [
  "Lesson",
  "Concept",
  "MCQuestion",
  "FillQuestion",
  "TraceQuestion",
  "BugQuestion",
  "BuildQuestion",
];

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function check(id, passed, detail) {
  return { id, passed: Boolean(passed), status: passed ? "pass" : "fail", detail };
}

function packageScripts() {
  return JSON.parse(read("package.json")).scripts || {};
}

function buildReport() {
  const scripts = packageScripts();
  const doc = read("CONTENT_SCHEMA_CONTRACT.md");
  const validate = read("scripts/validate_bank.js");
  const qa = read("scripts/build_question_qa_checklist.js");
  const coverage = read("scripts/report_question_coverage_targets.js");
  const names = entityNames();
  const checks = [
    check(
      "contract-versioned",
      CONTENT_SCHEMA_CONTRACT.version === CONTENT_SCHEMA_CONTRACT_VERSION &&
        CONTENT_SCHEMA_CONTRACT_VERSION === "content-schema-contract-v1",
      "Contract must expose a stable version.",
    ),
    check(
      "required-entities",
      REQUIRED_ENTITIES.every((entity) => names.includes(entity)),
      `Contract must define: ${REQUIRED_ENTITIES.join(", ")}.`,
    ),
    check(
      "lesson-concept-fields",
      ["id", "title", "concepts"].every((field) => requiredFieldNames("Lesson").includes(field)) &&
        ["conceptName", "levels", "difficulty"].every((field) => requiredFieldNames("Concept").includes(field)),
      "Lesson and Concept must keep stable identity and difficulty fields.",
    ),
    check(
      "question-fields",
      ["id", "conceptKey", "question", "options", "correctIndex", "explanation"].every((field) => requiredFieldNames("MCQuestion").includes(field)) &&
        ["id", "conceptKey", "code", "answer", "explanation"].every((field) => requiredFieldNames("FillQuestion").includes(field)),
      "MC and Fill question contracts must expose routing, prompt and answer fields.",
    ),
    check(
      "code-practice-fields",
      ["id", "conceptKey", "title", "code", "steps", "explanation"].every((field) => requiredFieldNames("TraceQuestion").includes(field)) &&
        ["id", "conceptKey", "title", "brokenCode", "options", "correctIndex", "fix", "explanation"].every((field) => requiredFieldNames("BugQuestion").includes(field)) &&
        ["id", "conceptKey", "title", "prompt", "starter", "reference", "tests", "explanation"].every((field) => requiredFieldNames("BuildQuestion").includes(field)),
      "Trace, Bug and Build contracts must support code-proof routing.",
    ),
    check(
      "documented",
      doc.includes("Content Schema Contract") &&
        doc.includes("TraceQuestion") &&
        doc.includes("BuildQuestion") &&
        doc.includes("npm run validate:strict"),
      "CONTENT_SCHEMA_CONTRACT.md must document entities and gates.",
    ),
    check(
      "strict-gates-wired",
      scripts["validate:strict"] === "node scripts/validate_bank.js --strict" &&
        scripts["qa:questions:strict"] === "node scripts/build_question_qa_checklist.js --strict --summary" &&
        scripts["questions:coverage-targets:strict"] === "node scripts/report_question_coverage_targets.js --strict --summary",
      "Schema contract must be backed by strict validation scripts.",
    ),
    check(
      "validator-fields",
      validate.includes("correctIndex must be 0..3") &&
        validate.includes('code must contain "____" placeholder') &&
        validate.includes("conceptKey not found"),
      "validate_bank.js must enforce core question field invariants.",
    ),
    check(
      "prerequisite-and-density-gates",
      qa.includes("missingPrerequisites") &&
        qa.includes("missingGlossaryTerms") &&
        coverage.includes("TARGET_MC_PER_CONCEPT") &&
        coverage.includes("TARGET_FILL_PER_CODE_CONCEPT"),
      "QA and coverage gates must enforce prerequisite and density contracts.",
    ),
  ];
  const failures = checks.filter((item) => !item.passed);
  return {
    reportVersion: "content-schema-contract-report-v1",
    date: REPORT_DATE,
    contractVersion: CONTENT_SCHEMA_CONTRACT_VERSION,
    entities: REQUIRED_ENTITIES,
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
    `# Content Schema Contract Report — ${report.date}`,
    "",
    `- Contract version: ${report.contractVersion}`,
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

function run(argv = process.argv.slice(2)) {
  const report = buildReport();
  if (argv.includes("--write")) {
    fs.writeFileSync(JSON_PATH, `${JSON.stringify(report, null, 2)}\n`, "utf8");
    fs.writeFileSync(MD_PATH, `${toMarkdown(report)}\n`, "utf8");
  }
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
