#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const distractorAudit = require("./audit_distractors.js");

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const REPORT_DATE = "2026-04-30";
const JSON_REPORT_PATH = path.join(ROOT, "QUESTION_QUALITY_REPORT.json");
const MD_REPORT_PATH = path.join(ROOT, "QUESTION_QUALITY_REPORT.md");

function loadQuestionBanks() {
  const sandbox = { window: {}, console };
  ["questions_bank.js"].forEach((file) => {
    const code = fs.readFileSync(path.join(DATA_DIR, file), "utf8");
    vm.runInNewContext(code, sandbox, { filename: file });
  });

  const curated = sandbox.QUESTIONS_BANK || { mc: [], fill: [] };
  return {
    mc: [
      ...(curated.mc || []).map((q) => ({ ...q, kind: "mc", source: "manual" })),
    ],
    fill: [
      ...(curated.fill || []).map((q) => ({ ...q, kind: "fill", source: "manual" })),
    ],
  };
}

function addIssue(issues, severity, code, message) {
  issues.push({ severity, code, message });
}

function countOccurrences(haystack, needle) {
  if (!haystack || !needle) return 0;
  const text = String(haystack).toLowerCase();
  const token = String(needle).toLowerCase();
  let count = 0;
  let index = 0;
  while ((index = text.indexOf(token, index)) !== -1) {
    count++;
    index += token.length;
  }
  return count;
}

function auditMc(q) {
  const issues = distractorAudit.auditQuestion(q);
  if (!q.conceptKey) {
    addIssue(issues, "warning", "missing-concept-key", "Question has no conceptKey, so adaptive/prerequisite routing is weaker.");
  }
  return issues;
}

function auditFill(q) {
  const issues = [];
  if (!q.id) addIssue(issues, "blocker", "missing-id", "Missing fill id.");
  if (!q.conceptKey) {
    addIssue(issues, "warning", "missing-concept-key", "Fill has no conceptKey, so adaptive/prerequisite routing is weaker.");
  }
  if (!q.code || typeof q.code !== "string") addIssue(issues, "blocker", "missing-code", "Missing code field.");
  if (!q.answer || typeof q.answer !== "string") addIssue(issues, "blocker", "missing-answer", "Missing answer field.");
  if (!q.explanation || typeof q.explanation !== "string") {
    addIssue(issues, "warning", "missing-explanation", "Missing explanation.");
  }
  if (!q.hint || typeof q.hint !== "string") {
    addIssue(issues, "note", "missing-hint", "Missing hint.");
  }

  const blanks = countOccurrences(q.code || "", "____");
  if (blanks !== 1) {
    addIssue(issues, "blocker", "blank-count", `Expected exactly one blank marker, found ${blanks}.`);
  }

  const answerOccurrences = countOccurrences(q.code || "", q.answer || "");
  if (answerOccurrences > 1) {
    addIssue(
      issues,
      "warning",
      "answer-visible-multiple",
      `Answer token appears ${answerOccurrences} times in the visible code; this can make the fill answer ambiguous.`,
    );
  } else if (answerOccurrences === 1) {
    addIssue(
      issues,
      "note",
      "answer-visible",
      "Answer token appears elsewhere in the visible code; manual review should confirm this is not a hint leak.",
    );
  }

  if (String(q.answer || "").trim().length === 1) {
    addIssue(issues, "note", "one-character-answer", "One-character fill answer can be ambiguous without a strong hint.");
  }

  return issues;
}

function countBySeverity(issues) {
  return issues.reduce(
    (counts, issue) => {
      counts[issue.severity] = (counts[issue.severity] || 0) + 1;
      return counts;
    },
    { blocker: 0, warning: 0, note: 0 },
  );
}

function scoreFromIssues(issues) {
  const counts = countBySeverity(issues);
  return Math.max(0, 100 - counts.blocker * 45 - counts.warning * 20 - counts.note * 8);
}

function distractorScore(issues) {
  const relevant = issues.filter((issue) =>
    ["duplicate-option", "near-duplicate", "generic-wording", "length-cue", "empty-option", "option-count"].includes(issue.code),
  );
  return scoreFromIssues(relevant);
}

function qualityForQuestion(q, issues) {
  const counts = countBySeverity(issues);
  const issueCodes = issues.map((issue) => issue.code);
  return {
    id: q.id || "unknown",
    kind: q.kind,
    source: q.source,
    conceptKey: q.conceptKey || null,
    level: typeof q.level === "number" ? q.level : null,
    questionQuality: {
      score: scoreFromIssues(issues),
      difficulty: typeof q.level === "number" ? q.level : null,
      clarity: scoreFromIssues(
        issues.filter((issue) => ["missing-question", "missing-code", "missing-answer", "missing-explanation", "blank-count"].includes(issue.code)),
      ),
      distractorQuality: q.kind === "mc" ? distractorScore(issues) : null,
      issueCounts: counts,
      issueCodes,
      status: counts.blocker > 0 ? "blocked" : counts.warning > 0 ? "review" : counts.note > 0 ? "note" : "clean",
    },
    issues,
  };
}

function auditAllQuestions() {
  const bank = loadQuestionBanks();
  const all = [...bank.mc, ...bank.fill]
    .map((q) => {
      const issues = q.kind === "mc" ? auditMc(q) : auditFill(q);
      return qualityForQuestion(q, issues);
    })
    .sort((a, b) => {
      const sourceCompare = a.source.localeCompare(b.source);
      if (sourceCompare) return sourceCompare;
      const kindCompare = a.kind.localeCompare(b.kind);
      if (kindCompare) return kindCompare;
      return String(a.id).localeCompare(String(b.id));
    });
  return all;
}

function summarize(items) {
  const summary = {
    total: items.length,
    mc: items.filter((item) => item.kind === "mc").length,
    fill: items.filter((item) => item.kind === "fill").length,
    manual: items.filter((item) => item.source === "manual").length,
    blockerQuestions: 0,
    warningQuestions: 0,
    noteQuestions: 0,
    cleanQuestions: 0,
    blockerIssues: 0,
    warningIssues: 0,
    noteIssues: 0,
    questionQualityIndex: 0,
  };

  items.forEach((item) => {
    const counts = item.questionQuality.issueCounts;
    summary.blockerIssues += counts.blocker;
    summary.warningIssues += counts.warning;
    summary.noteIssues += counts.note;
    if (counts.blocker > 0) summary.blockerQuestions++;
    else if (counts.warning > 0) summary.warningQuestions++;
    else if (counts.note > 0) summary.noteQuestions++;
    else summary.cleanQuestions++;
  });

  summary.questionQualityIndex = summary.total
    ? Math.round(((summary.cleanQuestions + summary.noteQuestions) / summary.total) * 1000) / 10
    : 100;

  return summary;
}

function remediationQueue(items) {
  const severityRank = { blocker: 0, warning: 1, note: 2 };
  return items
    .flatMap((item) =>
      item.issues.map((issue) => ({
        id: item.id,
        kind: item.kind,
        source: item.source,
        conceptKey: item.conceptKey,
        severity: issue.severity,
        code: issue.code,
        message: issue.message,
        priority: severityRank[issue.severity],
      })),
    )
    .sort((a, b) => {
      if (a.priority !== b.priority) return a.priority - b.priority;
      return distractorAudit.stableHash(`${a.id}|${a.code}|${a.message}`) - distractorAudit.stableHash(`${b.id}|${b.code}|${b.message}`);
    });
}

function buildQuestionQualityReport() {
  const items = auditAllQuestions();
  return {
    reportVersion: "question-quality-v1",
    date: REPORT_DATE,
    source: "repo",
    summary: summarize(items),
    questionQuality: Object.fromEntries(items.map((item) => [item.id, item.questionQuality])),
    remediationQueue: remediationQueue(items),
  };
}

function formatIssue(issue) {
  return `${issue.severity}/${issue.code}: ${issue.message}`;
}

function buildMarkdown(report, maxRows = 80) {
  const summary = report.summary;
  const queue = report.remediationQueue.slice(0, maxRows);
  const lines = [
    "# Question Quality Report — 2026-04-30",
    "",
    "Full-bank deterministic QA for MC and Fill questions. This report creates a `questionQuality` object for every question id and a remediation queue for warnings and notes.",
    "",
    "## Summary",
    "",
    `- Total questions: ${summary.total}`,
    `- Mix: ${summary.mc} MC, ${summary.fill} Fill`,
    `- Source mix: ${summary.manual} manual`,
    `- Clean: ${summary.cleanQuestions}`,
    `- Notes only: ${summary.noteQuestions}`,
    `- Warning questions: ${summary.warningQuestions}`,
    `- Blocker questions: ${summary.blockerQuestions}`,
    `- Issue counts: ${summary.blockerIssues} blockers, ${summary.warningIssues} warnings, ${summary.noteIssues} notes`,
    `- Question Quality Index: ${summary.questionQualityIndex}% warning-free`,
    "",
    "## Gates Covered",
    "",
    "- MC: duplicate options, near-duplicate distractors, length-cue risk, generic wording, missing explanation, missing conceptKey.",
    "- Fill: blank count, missing answer/code/explanation/hint, visible answer leakage, one-character ambiguity, missing conceptKey.",
    "",
    "## Remediation Queue",
    "",
    `Showing first ${queue.length} of ${report.remediationQueue.length} queued issues.`,
    "",
    "| # | Severity | Code | ID | Kind | Source | Concept | Message |",
    "|---:|---|---|---|---|---|---|---|",
  ];

  queue.forEach((issue, index) => {
    lines.push(
      `| ${index + 1} | ${issue.severity} | ${issue.code} | \`${issue.id}\` | ${issue.kind} | ${issue.source} | \`${issue.conceptKey || "unknown"}\` | ${issue.message} |`,
    );
  });

  lines.push(
    "",
    "## Strict Policy",
    "",
    "- `--strict` fails only on blocker-level issues.",
    "- Warnings and notes are review/remediation work; they are intentionally visible but non-blocking until promoted by policy.",
    "",
  );

  return `${lines.join("\n")}\n`;
}

function writeReports(report) {
  fs.writeFileSync(JSON_REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(MD_REPORT_PATH, buildMarkdown(report));
}

function run(argv = process.argv.slice(2)) {
  const report = buildQuestionQualityReport();
  if (argv.includes("--write")) {
    writeReports(report);
  }
  if (argv.includes("--json")) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  } else {
    process.stdout.write(buildMarkdown(report));
  }
  return report;
}

if (require.main === module) {
  const report = run();
  if (process.argv.includes("--strict") && report.summary.blockerIssues > 0) {
    console.error(`Question quality strict failure: ${report.summary.blockerIssues} blocker issue(s).`);
    process.exit(1);
  }
}

module.exports = {
  auditFill,
  auditMc,
  buildMarkdown,
  buildQuestionQualityReport,
  countOccurrences,
  loadQuestionBanks,
  remediationQueue,
  run,
  summarize,
};
