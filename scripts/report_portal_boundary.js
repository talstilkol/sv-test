#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const REPORT_VERSION = "portal-boundary-v1";
const REPORT_DATE = "2026-04-29";
const JSON_PATH = path.join(ROOT, "PORTAL_BOUNDARY_REPORT.json");
const MD_PATH = path.join(ROOT, "PORTAL_BOUNDARY_REPORT.md");

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function countMatches(text, pattern) {
  return (text.match(pattern) || []).length;
}

function check(id, label, passed, detail) {
  return {
    id,
    label,
    passed: Boolean(passed),
    status: passed ? "pass" : "fail",
    detail,
  };
}

function buildReport() {
  const blueprint = read("data/course_blueprints.js");
  const index = read("index.html");
  const policy = read("PORTAL_BOUNDARY_POLICY.md");
  const packageJson = JSON.parse(read("package.json"));
  const primaryCount = countMatches(blueprint, /priority:\s*"primary"/g);
  const activeProviderCount = countMatches(blueprint, /provider:\s*"SVCollege"/g);
  const checks = [
    check(
      "single-primary-blueprint",
      "Only one primary course blueprint",
      primaryCount === 1,
      `Found ${primaryCount} primary blueprint declarations.`,
    ),
    check(
      "svcollege-primary-blueprint",
      "Primary blueprint is SVCollege AI & Full Stack",
      blueprint.includes('id: "svcollege_fullstack_ai"') &&
        blueprint.includes('provider: "SVCollege"') &&
        blueprint.includes('priority: "primary"'),
      "Primary blueprint must stay svcollege_fullstack_ai.",
    ),
    check(
      "no-active-secondary-provider",
      "No active non-SVCollege provider",
      activeProviderCount >= 1 && !/priority:\s*"primary"[\s\S]{0,240}provider:\s*"(?!SVCollege)/.test(blueprint),
      `SVCollege provider declarations: ${activeProviderCount}.`,
    ),
    check(
      "navigation-names-svcollege",
      "Top navigation keeps SVCollege alignment explicit",
      index.includes("יישור SVCollege") && index.includes("AI & Full Stack"),
      "The active alignment UI must name SVCollege AI & Full Stack.",
    ),
    check(
      "boundary-policy-doc",
      "Boundary policy document exists",
      policy.includes("Future school mappings must be specified as separate portal specs") &&
        policy.includes("SVCollege AI & Full Stack"),
      "PORTAL_BOUNDARY_POLICY.md must define the split rule.",
    ),
    check(
      "release-freeze-script",
      "Exam Edition freeze remains wired",
      packageJson.scripts &&
        packageJson.scripts["exam:release-freeze:strict"] === "node scripts/report_exam_edition_release_freeze.js --strict --summary",
      "Exam Edition freeze script must remain available.",
    ),
  ];
  const blockers = checks.filter((item) => !item.passed);
  return {
    reportVersion: REPORT_VERSION,
    date: REPORT_DATE,
    target: "SVCollege AI & Full Stack portal boundary",
    policy: "Future school mappings are separate portal specs; this active portal remains SVCollege AI & Full Stack.",
    summary: {
      checks: checks.length,
      passed: checks.length - blockers.length,
      failed: blockers.length,
      ready: blockers.length === 0,
    },
    checks,
    blockers: blockers.map((item) => ({
      id: item.id,
      label: item.label,
      detail: item.detail,
    })),
  };
}

function toMarkdown(report) {
  return [
    `# Portal Boundary Report — ${report.date}`,
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
  toMarkdown,
};
