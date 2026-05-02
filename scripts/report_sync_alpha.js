#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const REPORT_VERSION = "sync-alpha-gate-v1";
const REPORT_DATE = new Date().toISOString().slice(0,10);
const JSON_PATH = path.join(ROOT, "SYNC_ALPHA_REPORT.json");
const MD_PATH = path.join(ROOT, "SYNC_ALPHA_REPORT.md");

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
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
  const core = read("src/core/progress-sync.js");
  const app = read("app.js");
  const html = read("index.html");
  const policy = read("SYNC_ALPHA_POLICY.md");
  const checks = [
    check(
      "auth-token-required",
      "Sync requires authenticated token",
      core.includes("authUserIdFromAccessToken") &&
        core.includes("authenticated access token with a UUID subject"),
      "Remote writes must derive user_id from a real authenticated token.",
    ),
    check(
      "cloud-progress-row",
      "Cloud progress uses one snapshot row",
      core.includes('table: "user_progress"') &&
        core.includes('lessonId: "__lumenportal__"') &&
        core.includes('concept: "progress_snapshot_v2"'),
      "Sync Alpha writes one user_progress snapshot row.",
    ),
    check(
      "last-write-wins",
      "Conflict policy is deterministic last-write-wins",
      core.includes("resolveLastWriteWins") &&
        core.includes("remote-updated-after-local") &&
        core.includes("same-timestamp-local-tie-break"),
      "Conflict resolution must stay deterministic.",
    ),
    check(
      "session-token-ui",
      "Access token is session-only in UI",
      app.includes("writeSessionValue(SUPABASE_SYNC_ACCESS_TOKEN_KEY") &&
        app.includes("sessionStorage.setItem(key, value)") &&
        app.includes("נשמר רק ב-sessionStorage"),
      "Access token must not be saved to persistent localStorage.",
    ),
    check(
      "privacy-note-visible",
      "Sync privacy notice is visible",
      html.includes("progress-sync-privacy-note") &&
        html.includes("אין credentials מוטמעים") &&
        html.includes("last-write-wins"),
      "The UI must tell the learner what sync stores and how conflicts are resolved.",
    ),
    check(
      "policy-doc",
      "Sync Alpha policy exists",
      policy.includes("Sync Alpha is optional and credential-gated") &&
        policy.includes("No placeholder Supabase project"),
      "SYNC_ALPHA_POLICY.md must keep the privacy and conflict contract explicit.",
    ),
  ];
  const blockers = checks.filter((item) => !item.passed);
  return {
    reportVersion: REPORT_VERSION,
    date: REPORT_DATE,
    target: "Sync Alpha",
    policy: "Cloud sync remains optional, credential-gated, privacy-noted, and deterministic last-write-wins.",
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
    `# Sync Alpha Report — ${report.date}`,
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
