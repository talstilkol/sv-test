#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const REPORT_VERSION = "profile-backup-restore-smoke-v1";
const REPORT_DATE = "2026-04-29";

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

function addCheck(checks, id, label, passed, detail) {
  checks.push({ id, label, passed: Boolean(passed), status: passed ? "pass" : "fail", detail });
}

function buildReport() {
  const app = read("app.js");
  const html = read("index.html");
  const checks = [];

  addCheck(
    checks,
    "export-buttons",
    "Backup/restore controls exist",
    html.includes('id="btn-export-progress"') &&
      html.includes('id="btn-import-progress"') &&
      app.includes('const picker = document.createElement("input")') &&
      app.includes('picker.accept = ".json"'),
    "The learner must have visible export/import controls and a JSON file picker.",
  );
  addCheck(
    checks,
    "snapshot-includes-learning-state",
    "Snapshot includes scores, proficiency, answered questions and weaknesses",
    app.includes("function buildProgressSnapshot") &&
      app.includes("scores: {}") &&
      app.includes("proficiency: {}") &&
      app.includes("answeredQuestions: {}") &&
      app.includes("weaknesses: {}") &&
      app.includes('collectProfileScopedEntries(["lumenportal:scores:"])') &&
      app.includes("data.answeredQuestions = collectProfileScopedEntries([ANSWERED_QUESTIONS_KEY])") &&
      app.includes("data.weaknesses = collectProfileScopedEntries([MISTAKE_AGENT_KEY, CONFIDENCE_CALIBRATION_KEY, CONFUSION_BLOCKERS_KEY])"),
    "Backup must include the learning proof, not only UI state.",
  );
  addCheck(
    checks,
    "snapshot-includes-economy",
    "Snapshot includes XP economy state",
    app.includes("function collectEconomyExport") &&
      app.includes("xp: getXP()") &&
      app.includes("coins: getCoins()") &&
      app.includes("rewardLog: readRewardLog()") &&
      app.includes("purchases: getStorePurchases()") &&
      app.includes("disabled: isEconomyDisabled()"),
    "Backup must include XP, coins, purchases, rewardLog and rollback state.",
  );
  addCheck(
    checks,
    "restore-imports-learning-state",
    "Restore imports learning state without fake data",
    app.includes("function applyProgressData") &&
      app.includes("Object.entries(data.scores || {}).forEach(([k, v]) => localStorage.setItem(k, v))") &&
      app.includes("Object.entries(data.proficiency || {}).forEach(([k, v]) => localStorage.setItem(k, v))") &&
      app.includes("Object.entries(data.answeredQuestions || {}).forEach(([k, v]) => localStorage.setItem(k, v))") &&
      app.includes("Object.entries(data.weaknesses || {}).forEach(([k, v]) => localStorage.setItem(k, v))"),
    "Restore must put back the exported real records as-is.",
  );
  addCheck(
    checks,
    "restore-imports-economy",
    "Restore imports economy state with non-negative balances",
    app.includes("function importEconomyExport") &&
      app.includes("Math.max(0, Number(value) || 0)") &&
      app.includes("[XP_KEY, economy.xp]") &&
      app.includes("[COINS_KEY, economy.coins]") &&
      app.includes("localStorage.setItem(REWARD_LOG_KEY, JSON.stringify(economy.rewardLog.slice(0, 80)))") &&
      app.includes("localStorage.setItem(STORE_PURCHASES_KEY, JSON.stringify(economy.purchases))"),
    "Restore must clamp balances and keep reward/purchase history.",
  );

  const failed = checks.filter((check) => !check.passed);
  return {
    reportVersion: REPORT_VERSION,
    date: REPORT_DATE,
    target: "Local profile backup/restore",
    summary: {
      checks: checks.length,
      passed: checks.length - failed.length,
      failed: failed.length,
      ready: failed.length === 0,
    },
    checks,
    blockers: failed.map((check) => ({ id: check.id, label: check.label, detail: check.detail })),
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
