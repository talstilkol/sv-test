#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { buildQuestionQualityReport } = require("./report_question_quality.js");
const { stableHash } = require("./audit_distractors.js");

const ROOT = path.resolve(__dirname, "..");
const JSON_PATH = path.join(ROOT, "QUESTION_REMEDIATION_QUEUE.json");
const MD_PATH = path.join(ROOT, "QUESTION_REMEDIATION_QUEUE.md");
const REPORT_DATE = "2026-04-28";
const BATCH_SIZE = 25;

const ACTIONS_BY_CODE = {
  "duplicate-option": "rewrite-distractor",
  "near-duplicate": "rewrite-distractor",
  "length-cue": "balance-option-lengths",
  "generic-wording": "replace-generic-wording",
  "answer-visible": "review-fill-leakage",
  "answer-visible-multiple": "review-fill-leakage",
  "one-character-answer": "review-fill-ambiguity",
  "missing-concept-key": "add-routing-metadata",
  "missing-seeded-flag": "add-source-metadata",
  "missing-explanation": "add-explanation",
  "missing-hint": "add-fill-hint",
};

const ACTION_GUIDANCE = {
  "rewrite-distractor": "Replace the flagged option with a plausible common mistake from the same concept. Keep exactly 4 options and preserve the correct answer unless the audit says the correct answer is wrong.",
  "balance-option-lengths": "Rewrite option wording so no option is visually cued by extreme length. Keep the same semantics.",
  "replace-generic-wording": "Replace broad wording such as always/never/all answers with a concrete misconception.",
  "review-fill-leakage": "Check whether the answer appears in visible code. If it gives the answer away or creates ambiguity, rewrite the code/hint with one clear blank.",
  "review-fill-ambiguity": "Confirm the one-character answer is uniquely determined by the prompt and hint. If not, rewrite the prompt.",
  "add-routing-metadata": "Add a real conceptKey from the lesson taxonomy so adaptive routing and prerequisites work.",
  "add-source-metadata": "Add the missing seeded-source marker only when the item is actually from the seeded bank.",
  "add-explanation": "Add a concise explanation tied to the correct answer and the most likely misconception.",
  "add-fill-hint": "Add a hint that narrows the answer without revealing it.",
};

function actionFor(issue) {
  return ACTIONS_BY_CODE[issue.code] || "manual-review";
}

function summarize(queue) {
  const summary = {
    total: queue.length,
    bySeverity: {},
    byAction: {},
    batches: queue.length ? Math.ceil(queue.length / BATCH_SIZE) : 0,
  };

  queue.forEach((item) => {
    summary.bySeverity[item.severity] = (summary.bySeverity[item.severity] || 0) + 1;
    summary.byAction[item.action] = (summary.byAction[item.action] || 0) + 1;
  });

  return summary;
}

function sortQueue(queue) {
  return [...queue].sort((a, b) => {
    if (a.priority !== b.priority) return a.priority - b.priority;
    const actionCompare = a.action.localeCompare(b.action);
    if (actionCompare) return actionCompare;
    return a.stableKey - b.stableKey || a.id.localeCompare(b.id);
  });
}

function buildRemediationQueue(report = buildQuestionQualityReport()) {
  const queue = report.remediationQueue
    .filter((issue) => issue.severity !== "note" || issue.code !== "missing-hint")
    .map((issue) => {
      const action = actionFor(issue);
      const stableKey = stableHash(`${issue.id}|${issue.code}|${issue.message}|${action}`);
      return {
        id: issue.id,
        kind: issue.kind,
        source: issue.source,
        conceptKey: issue.conceptKey || null,
        severity: issue.severity,
        code: issue.code,
        action,
        message: issue.message,
        guidance: ACTION_GUIDANCE[action] || "Review the item against the source lesson and fix only with verified course content.",
        reviewStatus: "pending-manual-review",
        stableKey,
        priority: issue.priority,
      };
    });

  return sortQueue(queue).map((item, index) => ({
    ...item,
    order: index + 1,
    batch: Math.floor(index / BATCH_SIZE) + 1,
  }));
}

function buildRemediationPlan(report = buildQuestionQualityReport()) {
  const queue = buildRemediationQueue(report);
  return {
    reportVersion: "question-remediation-v1",
    date: REPORT_DATE,
    source: "QUESTION_QUALITY_REPORT",
    policy: {
      deterministic: true,
      batchSize: BATCH_SIZE,
      autoRewrite: false,
      manualReviewRequired: true,
      noFakeData: true,
    },
    summary: summarize(queue),
    actionGuidance: ACTION_GUIDANCE,
    queue,
  };
}

function formatCounts(counts) {
  const entries = Object.entries(counts).sort(([a], [b]) => a.localeCompare(b));
  if (!entries.length) return "- None";
  return entries.map(([key, value]) => `- ${key}: ${value}`).join("\n");
}

function buildMarkdown(plan) {
  const lines = [
    "# Question Remediation Queue — 2026-04-28",
    "",
    "Deterministic rewrite pipeline for flagged MC/Fill items. The script does not invent replacement content; every row must be fixed from verified course material and then manually reviewed.",
    "",
    "## Summary",
    "",
    `- Total queued issues: ${plan.summary.total}`,
    `- Batches: ${plan.summary.batches} batches of ${plan.policy.batchSize}`,
    `- Auto rewrite: ${plan.policy.autoRewrite ? "yes" : "no"}`,
    `- Manual review required: ${plan.policy.manualReviewRequired ? "yes" : "no"}`,
    "",
    "### By Severity",
    "",
    formatCounts(plan.summary.bySeverity),
    "",
    "### By Action",
    "",
    formatCounts(plan.summary.byAction),
    "",
    "## Workflow",
    "",
    "1. Take the next batch in order.",
    "2. Open the source question in `data/questions_bank.js` or `data/questions_bank_seeded.js`.",
    "3. Apply only the guidance listed for that row, using verified lesson content.",
    "4. Run `npm run quality:questions:write`.",
    "5. Run `npm run quality:questions:strict` and `npm test -- --run`.",
    "6. Mark the row as manually reviewed in the PR evidence.",
    "",
    "## Queue",
    "",
    "| # | Batch | Severity | Action | ID | Kind | Source | Concept | Code | Guidance |",
    "|---:|---:|---|---|---|---|---|---|---|---|",
  ];

  plan.queue.forEach((item) => {
    lines.push(
      `| ${item.order} | ${item.batch} | ${item.severity} | ${item.action} | \`${item.id}\` | ${item.kind} | ${item.source} | \`${item.conceptKey || "unknown"}\` | ${item.code} | ${item.guidance} |`,
    );
  });

  lines.push("");
  return `${lines.join("\n")}\n`;
}

function writeReports(plan) {
  fs.writeFileSync(JSON_PATH, `${JSON.stringify(plan, null, 2)}\n`);
  fs.writeFileSync(MD_PATH, buildMarkdown(plan));
}

function run(argv = process.argv.slice(2)) {
  const plan = buildRemediationPlan();
  if (argv.includes("--write")) {
    writeReports(plan);
  }

  if (argv.includes("--summary")) {
    process.stdout.write(`${JSON.stringify({
      reportVersion: plan.reportVersion,
      date: plan.date,
      policy: plan.policy,
      summary: plan.summary,
    }, null, 2)}\n`);
  } else if (argv.includes("--json")) {
    process.stdout.write(`${JSON.stringify(plan, null, 2)}\n`);
  } else {
    process.stdout.write(buildMarkdown(plan));
  }

  return plan;
}

if (require.main === module) {
  const plan = run();
  if (process.argv.includes("--strict") && plan.summary.bySeverity.blocker > 0) {
    console.error(`Question remediation strict failure: ${plan.summary.bySeverity.blocker} blocker issue(s) still queued.`);
    process.exit(1);
  }
}

module.exports = {
  ACTION_GUIDANCE,
  actionFor,
  buildMarkdown,
  buildRemediationPlan,
  buildRemediationQueue,
  run,
  summarize,
};
