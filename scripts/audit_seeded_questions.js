#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const distractorAudit = require("./audit_distractors.js");

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const REPORT_PATH = path.join(ROOT, "AUDIT_SEEDED_QA_2026-04-28.md");
const SAMPLE_SIZE = 170;

function loadSeededBank() {
  const sandbox = { window: {}, console };
  const code = fs.readFileSync(path.join(DATA_DIR, "questions_bank_seeded.js"), "utf8");
  vm.runInNewContext(code, sandbox, { filename: "questions_bank_seeded.js" });
  const bank = sandbox.QUESTIONS_BANK_SEEDED || { mc: [], fill: [] };
  return {
    mc: (bank.mc || []).map((q) => ({ ...q, kind: "mc" })),
    fill: (bank.fill || []).map((q) => ({ ...q, kind: "fill" })),
  };
}

function deterministicSample(items, size = SAMPLE_SIZE) {
  return [...items]
    .map((item) => ({
      item,
      key: distractorAudit.stableHash(`${item.kind}|${item.id}|${item.conceptKey || ""}|${item.question || item.code || ""}`),
    }))
    .sort((a, b) => a.key - b.key || String(a.item.id).localeCompare(String(b.item.id)))
    .slice(0, size)
    .map(({ item }) => item);
}

function addIssue(issues, severity, code, message) {
  issues.push({ severity, code, message });
}

function countOccurrences(haystack, needle) {
  if (!haystack || !needle) return 0;
  let count = 0;
  let index = 0;
  const text = String(haystack).toLowerCase();
  const token = String(needle).toLowerCase();
  while ((index = text.indexOf(token, index)) !== -1) {
    count++;
    index += token.length;
  }
  return count;
}

function auditFill(q) {
  const issues = [];
  if (!q.id) addIssue(issues, "blocker", "missing-id", "Missing fill id.");
  if (!q._seeded) addIssue(issues, "warning", "missing-seeded-flag", "Seeded question is missing _seeded=true.");
  if (!q.conceptKey) addIssue(issues, "blocker", "missing-concept-key", "Missing conceptKey.");
  if (!q.code || typeof q.code !== "string") addIssue(issues, "blocker", "missing-code", "Missing code field.");
  if (!q.answer || typeof q.answer !== "string") addIssue(issues, "blocker", "missing-answer", "Missing answer field.");
  if (!q.explanation || typeof q.explanation !== "string") addIssue(issues, "warning", "missing-explanation", "Missing explanation.");
  if (!q.hint || typeof q.hint !== "string") addIssue(issues, "note", "missing-hint", "Missing hint.");

  const blanks = countOccurrences(q.code || "", "____");
  if (blanks !== 1) {
    addIssue(issues, "blocker", "blank-count", `Expected exactly one blank marker, found ${blanks}.`);
  }

  const answerOccurrences = countOccurrences(q.code || "", q.answer || "");
  if (answerOccurrences > 0) {
    addIssue(
      issues,
      "note",
      "answer-visible",
      `Answer token appears ${answerOccurrences} time(s) elsewhere in the code; manual review should confirm this is not ambiguous.`,
    );
  }

  return issues;
}

function auditSeededItem(item) {
  if (item.kind === "mc") {
    const issues = distractorAudit.auditQuestion(item);
    if (!item._seeded) addIssue(issues, "warning", "missing-seeded-flag", "Seeded question is missing _seeded=true.");
    if (!item.conceptKey) addIssue(issues, "blocker", "missing-concept-key", "Missing conceptKey.");
    return issues;
  }
  return auditFill(item);
}

function summarize(audits) {
  const summary = {
    total: audits.length,
    mc: audits.filter((audit) => audit.item.kind === "mc").length,
    fill: audits.filter((audit) => audit.item.kind === "fill").length,
    blocker: 0,
    warning: 0,
    note: 0,
    clean: 0,
  };
  audits.forEach(({ issues }) => {
    if (!issues.length) summary.clean++;
    issues.forEach((issue) => {
      summary[issue.severity]++;
    });
  });
  return summary;
}

function formatIssues(issues) {
  if (!issues.length) return "תקין";
  return issues.map((issue) => `${issue.severity}/${issue.code}: ${issue.message}`).join("<br>");
}

function buildReport(audits, totals) {
  const summary = summarize(audits);
  const lines = [
    "# Seeded Questions QA — 2026-04-28",
    "",
    "דגימת QA דטרמיניסטית של 170 שאלות מתוך `QUESTIONS_BANK_SEEDED`. לא נעשה שימוש באקראיות; הבחירה נעשית לפי hash יציב של סוג השאלה, id, conceptKey והתוכן.",
    "",
    "## Bank Size",
    "",
    `- Seeded MC: ${totals.mc}`,
    `- Seeded Fill: ${totals.fill}`,
    `- Total seeded: ${totals.mc + totals.fill}`,
    "",
    "## Sample Summary",
    "",
    `- Total audited: ${summary.total}`,
    `- Sample mix: ${summary.mc} MC, ${summary.fill} Fill`,
    `- Clean questions: ${summary.clean}`,
    `- Blockers: ${summary.blocker}`,
    `- Warnings: ${summary.warning}`,
    `- Notes: ${summary.note}`,
    "",
    "## Checks",
    "",
    "- MC: valid options, correctIndex, duplicate/near-duplicate options, cue risks",
    "- Fill: one blank marker, non-empty answer/code/explanation, ambiguity notes when answer appears elsewhere",
    "- All sampled items: seeded flag and conceptKey presence",
    "",
    "## Audited Sample",
    "",
    "| # | ID | Kind | Concept | Result |",
    "|---:|---|---|---|---|",
  ];

  audits.forEach((audit, index) => {
    const item = audit.item;
    lines.push(
      `| ${index + 1} | \`${item.id || "unknown"}\` | ${item.kind} | \`${item.conceptKey || "unknown"}\` | ${formatIssues(audit.issues)} |`,
    );
  });

  lines.push(
    "",
    "## Follow-Up",
    "",
    summary.blocker === 0
      ? "- No blocker-level seeded QA issues were found in this deterministic 170-question sample."
      : "- Fix blocker-level seeded QA rows before treating the generated bank as production-safe.",
    "- Notes are manual-review prompts; they do not fail strict mode unless promoted to blockers.",
    "",
  );

  return `${lines.join("\n")}\n`;
}

function run() {
  const bank = loadSeededBank();
  const all = [...bank.mc, ...bank.fill];
  const sample = deterministicSample(all, SAMPLE_SIZE);
  const audits = sample.map((item) => ({
    item,
    issues: auditSeededItem(item),
  }));
  const report = buildReport(audits, { mc: bank.mc.length, fill: bank.fill.length });

  if (process.argv.includes("--write")) {
    fs.writeFileSync(REPORT_PATH, report);
  } else {
    process.stdout.write(report);
  }

  return summarize(audits);
}

if (require.main === module) {
  const summary = run();
  if (summary.blocker > 0 && process.argv.includes("--strict")) {
    process.exit(1);
  }
}

module.exports = {
  auditFill,
  auditSeededItem,
  buildReport,
  deterministicSample,
  loadSeededBank,
  run,
  summarize,
};
