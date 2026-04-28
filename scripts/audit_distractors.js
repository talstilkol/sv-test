#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const REPORT_PATH = path.join(ROOT, "AUDIT_DISTRACTORS_2026-04-28.md");
const SAMPLE_SIZE = 50;

function stableHash(input) {
  let hash = 2166136261;
  const text = String(input || "");
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function loadBanks() {
  const sandbox = { window: {}, console };
  ["questions_bank.js", "questions_bank_seeded.js"].forEach((file) => {
    const code = fs.readFileSync(path.join(DATA_DIR, file), "utf8");
    vm.runInNewContext(code, sandbox, { filename: file });
  });

  const curated = (sandbox.QUESTIONS_BANK && sandbox.QUESTIONS_BANK.mc) || [];
  const seeded = (sandbox.QUESTIONS_BANK_SEEDED && sandbox.QUESTIONS_BANK_SEEDED.mc) || [];
  return [
    ...curated.map((q) => ({ ...q, source: "curated" })),
    ...seeded.map((q) => ({ ...q, source: "seeded" })),
  ];
}

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[\u0591-\u05C7]/g, "")
    .replace(/[.,:;!?'"`()\[\]{}<>/\\|*_+=~`׳״״]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(value) {
  return normalizeText(value)
    .split(" ")
    .filter((token) => token.length > 1);
}

function jaccard(a, b) {
  const left = new Set(tokenize(a));
  const right = new Set(tokenize(b));
  if (!left.size && !right.size) {
    return normalizeText(a) === normalizeText(b) ? 1 : 0;
  }
  if (!left.size || !right.size) return 0;
  let intersection = 0;
  left.forEach((token) => {
    if (right.has(token)) intersection++;
  });
  return intersection / (left.size + right.size - intersection || 1);
}

function deterministicSample(questions, size = SAMPLE_SIZE) {
  return [...questions]
    .map((q) => ({
      q,
      key: stableHash(`${q.id}|${q.conceptKey || ""}|${q.question || ""}`),
    }))
    .sort((a, b) => a.key - b.key || String(a.q.id).localeCompare(String(b.q.id)))
    .slice(0, size)
    .map(({ q }) => q);
}

function addIssue(issues, severity, code, message) {
  issues.push({ severity, code, message });
}

function auditQuestion(q) {
  const issues = [];
  const options = Array.isArray(q.options) ? q.options : [];

  if (!q.id) addIssue(issues, "blocker", "missing-id", "Missing question id.");
  if (!q.question || !String(q.question).trim()) {
    addIssue(issues, "blocker", "missing-question", "Question text is empty.");
  }
  if (!q.explanation || !String(q.explanation).trim()) {
    addIssue(issues, "warning", "missing-explanation", "Explanation is empty.");
  }
  if (options.length !== 4) {
    addIssue(issues, "blocker", "option-count", `Expected 4 options, got ${options.length}.`);
  }
  if (
    typeof q.correctIndex !== "number" ||
    q.correctIndex < 0 ||
    q.correctIndex >= options.length
  ) {
    addIssue(issues, "blocker", "correct-index", `correctIndex is out of range: ${q.correctIndex}.`);
  }

  const rawOptions = options.map((option) => String(option || "").trim());
  rawOptions.forEach((option, index) => {
    if (!option) addIssue(issues, "blocker", "empty-option", `Option ${index + 1} is empty.`);
  });

  const normalizedOptions = options.map((option) => normalizeText(option) || String(option || "").trim());
  const seen = new Map();
  normalizedOptions.forEach((option, index) => {
    if (!option) return;
    if (seen.has(option)) {
      addIssue(
        issues,
        "blocker",
        "duplicate-option",
        `Option ${index + 1} duplicates option ${seen.get(option) + 1}.`,
      );
    } else {
      seen.set(option, index);
    }
  });

  for (let i = 0; i < options.length; i++) {
    for (let j = i + 1; j < options.length; j++) {
      if (Math.min(tokenize(options[i]).length, tokenize(options[j]).length) < 4) continue;
      const similarity = jaccard(options[i], options[j]);
      if (similarity >= 0.86) {
        addIssue(
          issues,
          "warning",
          "near-duplicate",
          `Options ${i + 1} and ${j + 1} are very similar (${similarity.toFixed(2)} token overlap).`,
        );
      }
    }
  }

  const genericPatterns = [
    /כל התשובות/i,
    /כל האפשרויות/i,
    /אף תשובה/i,
    /אין תשובה/i,
    /תמיד/i,
    /אף פעם/i,
  ];
  options.forEach((option, index) => {
    if (genericPatterns.some((pattern) => pattern.test(option))) {
      addIssue(
        issues,
        "note",
        "generic-wording",
        `Option ${index + 1} uses broad wording that can cue test-taking instead of knowledge.`,
      );
    }
  });

  const lengths = options.map((option) => normalizeText(option).length).filter(Boolean);
  if (lengths.length === 4) {
    const min = Math.min(...lengths);
    const max = Math.max(...lengths);
    if (min > 0 && max / min >= 4.2) {
      addIssue(
        issues,
        "note",
        "length-cue",
        `Option length spread is high (${min}..${max}); check that the correct answer is not visually cued.`,
      );
    }
  }

  return issues;
}

function summarize(audits) {
  const summary = {
    total: audits.length,
    curated: audits.filter((item) => item.question.source === "curated").length,
    seeded: audits.filter((item) => item.question.source === "seeded").length,
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

function formatIssueList(issues) {
  if (!issues.length) return "תקין";
  return issues.map((issue) => `${issue.severity}/${issue.code}: ${issue.message}`).join("<br>");
}

function buildReport(audits) {
  const summary = summarize(audits);
  const lines = [
    "# Distractor Objectivity Audit — 2026-04-28",
    "",
    "דגימה דטרמיניסטית של 50 שאלות MC מתוך המאגר המאוחד. לא נעשה שימוש באקראיות; הבחירה נעשית לפי hash יציב של `id + conceptKey + question`, כדי שהדוח יהיה ניתן לשחזור.",
    "",
    "## Summary",
    "",
    `- Total audited: ${summary.total}`,
    `- Source mix: ${summary.curated} curated, ${summary.seeded} seeded`,
    `- Clean questions: ${summary.clean}`,
    `- Blockers: ${summary.blocker}`,
    `- Warnings: ${summary.warning}`,
    `- Notes: ${summary.note}`,
    "",
    "## Checks",
    "",
    "- 4 options exactly",
    "- valid `correctIndex`",
    "- non-empty question/options/explanation",
    "- duplicate and near-duplicate options",
    "- broad wording that may cue guessing",
    "- option-length cue risk",
    "",
    "## Audited Questions",
    "",
    "| # | ID | Source | Concept | Result |",
    "|---:|---|---|---|---|",
  ];

  audits.forEach((item, index) => {
    const q = item.question;
    lines.push(
      `| ${index + 1} | \`${q.id || "unknown"}\` | ${q.source} | \`${q.conceptKey || "unknown"}\` | ${formatIssueList(item.issues)} |`,
    );
  });

  lines.push(
    "",
    "## Follow-Up",
    "",
    summary.blocker === 0
      ? "- No blocker-level distractor defects were found in the deterministic 50-question audit sample."
      : "- Fix blocker-level rows before promoting the affected questions.",
    "- Warning/note rows should be reviewed during the broader 10% seeded QA pass.",
    "",
  );

  return `${lines.join("\n")}\n`;
}

function run() {
  const all = loadBanks();
  const sample = deterministicSample(all, SAMPLE_SIZE);
  const audits = sample.map((question) => ({
    question,
    issues: auditQuestion(question),
  }));

  const report = buildReport(audits);
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
  auditQuestion,
  buildReport,
  deterministicSample,
  loadBanks,
  normalizeText,
  run,
  stableHash,
  summarize,
};
