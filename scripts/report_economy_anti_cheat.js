#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const REPORT_VERSION = "economy-anti-cheat-v1";
const REPORT_DATE = "2026-04-29";

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

function functionBody(source, name) {
  const signature = `function ${name}`;
  const start = source.indexOf(signature);
  if (start === -1) return "";
  const paramsStart = source.indexOf("(", start);
  if (paramsStart === -1) return "";
  let parenDepth = 0;
  let open = -1;
  for (let index = paramsStart; index < source.length; index += 1) {
    const char = source[index];
    if (char === "(") parenDepth += 1;
    if (char === ")") parenDepth -= 1;
    if (parenDepth === 0) {
      open = source.indexOf("{", index);
      break;
    }
  }
  if (open === -1) return "";
  let depth = 0;
  for (let index = open; index < source.length; index += 1) {
    const char = source[index];
    if (char === "{") depth += 1;
    if (char === "}") {
      depth -= 1;
      if (depth === 0) return source.slice(start, index + 1);
    }
  }
  return "";
}

function addCheck(checks, id, label, passed, detail) {
  checks.push({
    id,
    label,
    passed: Boolean(passed),
    status: passed ? "pass" : "fail",
    detail,
  });
}

function buildReport() {
  const app = read("app.js");
  const tasks = [
    read("EXECUTION_TASKS.md"),
    read("docs/plans/06_EXECUTION_TASKS_COMPLETED_ARCHIVE.md"),
  ].join("\n");
  const rewardLogId = functionBody(app, "rewardLogId");
  const awardLearningReward = functionBody(app, "awardLearningReward");
  const purchaseStoreItem = functionBody(app, "purchaseStoreItem");
  const level100GateStatus = functionBody(app, "level100GateStatus");
  const learnerLevelFromXP = functionBody(app, "learnerLevelFromXP");
  const nativeRandomNeedle = ["Math", "random("].join(".");
  const checks = [];

  addCheck(
    checks,
    "no-math-random",
    "No native random in runtime code",
    !app.includes(nativeRandomNeedle),
    "app.js runtime code must stay deterministic.",
  );
  addCheck(
    checks,
    "stable-reward-id",
    "Reward IDs are stable and ignore timestamps",
    rewardLogId.includes("entry.source") &&
      rewardLogId.includes("entry.conceptKey") &&
      rewardLogId.includes("entry.questionId") &&
      rewardLogId.includes("Math.imul") &&
      !rewardLogId.includes("entry.at") &&
      !rewardLogId.includes("Date.now") &&
      !rewardLogId.includes("new Date"),
    "rewardLogId must be based on source, concept/question identity and reward amount, not time.",
  );
  addCheck(
    checks,
    "duplicate-positive-reward-block",
    "Positive question/concept rewards are deduplicated before XP changes",
    awardLearningReward.includes("const shouldDedupe = (safeXP > 0 || safeCoins > 0) && Boolean(questionId || rewardConceptKey)") &&
      awardLearningReward.includes("if (shouldDedupe && rewardAlreadyLogged(rewardEntry))") &&
      awardLearningReward.indexOf("if (shouldDedupe && rewardAlreadyLogged(rewardEntry))") <
        awardLearningReward.indexOf("const newXP = Math.max(0, getXP() + safeXP)") &&
      awardLearningReward.includes("duplicate: true"),
    "Duplicate positive rewards with real question/concept identity must return before XP or coins are updated.",
  );
  addCheck(
    checks,
    "store-purchase-no-xp",
    "Store purchases never mint XP",
    purchaseStoreItem.includes('source: "store-purchase"') &&
      purchaseStoreItem.includes("xp: 0") &&
      purchaseStoreItem.includes("coins: -item.price"),
    "Purchases may spend coins, but they cannot create XP or positive reward balance.",
  );
  addCheck(
    checks,
    "store-purchase-no-mastery",
    "Store purchases do not mutate mastery, scores or level",
    !/\b(scores|saveScores|ensureScore|getScore|SCORE_STORAGE_KEY|setProficiency|recordAnsweredQuestion|markMasteryGatePending|maybeRecordMasteryProof|awardXP|awardLearningReward)\b/.test(purchaseStoreItem),
    "purchaseStoreItem must only update coins, purchase state, reward log and UI.",
  );
  addCheck(
    checks,
    "store-copy-no-grade-buying",
    "Store UI states that grades/mastery cannot be bought",
    app.includes("אי אפשר לקנות ציון") &&
      app.includes("לא קונים מאסטר") &&
      app.includes("לא ניתן לקנות ציונים או שליטה"),
    "The learner-facing rule must explicitly block purchase-based grade or mastery shortcuts.",
  );
  addCheck(
    checks,
    "level100-proof-gate",
    "Level 100 cannot be purchased or reached by XP alone",
    level100GateStatus.includes("examProof.passed") &&
      level100GateStatus.includes("conceptMastery.ready") &&
      level100GateStatus.includes("proofCoverage.highestReady") &&
      level100GateStatus.includes("proofCoverage.codeReady") &&
      level100GateStatus.includes("releaseGate.ready") &&
      learnerLevelFromXP.includes("const level = rawLevel >= XP_MAX_LEVEL && !gate.passed ? 99 : rawLevel"),
    "Global level 100 must require professor exam proof, mastery proof, code proof and green release gates.",
  );
  addCheck(
    checks,
    "tasks-registers-gate",
    "Execution task register or completed archive contains P8.7.4",
    tasks.includes("P8.7.4") && tasks.includes("anti-cheat checks"),
    "The active task board or completed archive must keep the anti-cheat task visible and traceable.",
  );

  const failed = checks.filter((check) => !check.passed);
  return {
    reportVersion: REPORT_VERSION,
    date: REPORT_DATE,
    target: "XP economy anti-cheat",
    policy: "No repeated positive reward, no purchase-based mastery, no fake rewards, and no randomness.",
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
      detail: check.detail,
    })),
  };
}

function toMarkdown(report) {
  return [
    `# XP Economy Anti-Cheat — ${report.date}`,
    "",
    `- Target: ${report.target}`,
    `- Policy: ${report.policy}`,
    `- Ready: ${report.summary.ready ? "Yes" : "No"}`,
    `- Checks: ${report.summary.passed}/${report.summary.checks}`,
    "",
    "| Check | Status | Detail |",
    "|---|---|---|",
    ...report.checks.map((check) =>
      `| ${check.label} | ${check.status} | ${String(check.detail || "").replace(/\|/g, "\\|")} |`,
    ),
    "",
  ].join("\n");
}

function run(argv = process.argv.slice(2)) {
  const report = buildReport();
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
