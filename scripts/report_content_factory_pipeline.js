#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const REPORT_VERSION = "content-factory-pipeline-v1";
const REPORT_DATE = new Date().toISOString().slice(0,10);
const JSON_PATH = path.join(ROOT, "CONTENT_FACTORY_PIPELINE_REPORT.json");
const MD_PATH = path.join(ROOT, "CONTENT_FACTORY_PIPELINE_REPORT.md");

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function exists(relativePath) {
  return fs.existsSync(path.join(ROOT, relativePath));
}

function check(id, label, passed, detail) {
  return { id, label, passed: Boolean(passed), status: passed ? "pass" : "fail", detail };
}

function packageScripts() {
  return JSON.parse(read("package.json")).scripts || {};
}

function buildReport() {
  const scripts = packageScripts();
  const remediation = read("scripts/build_question_remediation_queue.js");
  const distractors = read("scripts/audit_distractors.js");
  const policy = read("CONTENT_FACTORY_PIPELINE.md");
  const checks = [
    check(
      "automatic-generation-removed",
      "Automatic question generation tools are removed",
      !exists("scripts/seed_questions.js") &&
        !Object.values(scripts).some((script) => String(script).includes("seed_questions.js")),
      "No npm script may invoke a deleted automatic question generator.",
    ),
    check(
      "strict-validation",
      "Strict bank validation is wired",
      scripts["validate:strict"] === "node scripts/validate_bank.js --strict",
      "validate:strict must remain the schema/density gate.",
    ),
    check(
      "question-qa",
      "Question QA gate is wired",
      scripts["qa:questions:strict"] === "node scripts/build_question_qa_checklist.js --strict --summary",
      "qa:questions:strict must keep prerequisite and no-fake-data policy.",
    ),
    check(
      "distractor-review",
      "Distractor review is wired",
      scripts["audit:distractors"] === "node scripts/audit_distractors.js --write --strict" &&
        distractors.includes("deterministicSample") &&
        distractors.includes("duplicate-option"),
      "Distractor review must sample deterministically and detect bad options.",
    ),
    check(
      "remediation-queue",
      "Remediation queue requires manual review",
      scripts["quality:remediation:strict"] === "node scripts/build_question_remediation_queue.js --strict --summary" &&
        remediation.includes("manualReviewRequired: true") &&
        remediation.includes("noFakeData: true"),
      "Flagged items must go through manual review, not auto-fabricated rewrites.",
    ),
    check(
      "prerequisite-metadata",
      "Prerequisite metadata gate is wired",
      scripts["qa:lesson-quiz-keys:strict"] === "node scripts/report_lesson_quiz_keys.js --strict --summary",
      "Lesson quiz keys keep question metadata connected to concept paths.",
    ),
    check(
      "reuse-audit",
      "Question reuse audit is wired",
      scripts["questions:reuse-audit:strict"] === "node scripts/report_question_reuse_audit.js --strict --summary",
      "Learner-profile question reuse must stay audited.",
    ),
    check(
      "pipeline-policy",
      "Pipeline policy document exists",
      policy.includes("No fake questions") &&
        policy.includes("No automatic question generation") &&
        policy.includes("manually written") &&
        policy.includes("Prerequisite metadata is mandatory") &&
        policy.includes("manual review"),
      "CONTENT_FACTORY_PIPELINE.md must document creation, QA, distractor review and prerequisite metadata.",
    ),
  ];
  const blockers = checks.filter((item) => !item.passed);
  return {
    reportVersion: REPORT_VERSION,
    date: REPORT_DATE,
    target: "SVCollege content factory pipeline",
    policy: "Author questions manually, then pass validation, QA, distractor review, prerequisite metadata and reuse gates. Automatic question generation is forbidden.",
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
    `# Content Factory Pipeline Report — ${report.date}`,
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
