#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const distractorAudit = require("./audit_distractors.js");

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const REPORT_DATE = new Date().toISOString().slice(0,10);
const JSON_REPORT_PATH = path.join(ROOT, "QUESTION_QUALITY_REPORT.json");
const MD_REPORT_PATH = path.join(ROOT, "QUESTION_QUALITY_REPORT.md");
const QUALITY_REVIEW_FILE = "question_quality_reviews.js";
const EXAM_CORE_PREFIXES = [
  "lesson_17::",
  "lesson_18::",
  "lesson_20::",
  "lesson_21::",
  "lesson_22::",
  "lesson_23::",
  "lesson_24::",
  "lesson_25::",
  "lesson_26::",
  "lesson_27::",
  "lesson_nextjs::",
];
const APPROVED_ANSWER_VISIBLE_REVIEW = "manual-reviewed-intentional-code-context";
const APPROVED_ONE_CHARACTER_REVIEW = "manual-reviewed-strong-hint";

function isExamCoreConcept(conceptKey) {
  const key = String(conceptKey || "");
  return EXAM_CORE_PREFIXES.some((prefix) => key.startsWith(prefix));
}

function loadQuestionBanks() {
  const sandbox = { window: {}, console };
  ["questions_bank.js"].forEach((file) => {
    const code = fs.readFileSync(path.join(DATA_DIR, file), "utf8");
    vm.runInNewContext(code, sandbox, { filename: file });
  });
  const reviewPath = path.join(DATA_DIR, QUALITY_REVIEW_FILE);
  if (fs.existsSync(reviewPath)) {
    const code = fs.readFileSync(reviewPath, "utf8");
    vm.runInNewContext(code, sandbox, { filename: QUALITY_REVIEW_FILE });
  }

  const curated = sandbox.QUESTIONS_BANK || { mc: [], fill: [] };
  return {
    mc: [
      ...(curated.mc || []).map((q) => ({ ...q, kind: "mc", source: "manual" })),
    ],
    fill: [
      ...(curated.fill || []).map((q) => ({ ...q, kind: "fill", source: "manual" })),
    ],
    qualityReviews: sandbox.QUESTION_QUALITY_REVIEWS || sandbox.window.QUESTION_QUALITY_REVIEWS || {},
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

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function countAnswerOccurrences(code, answer) {
  if (!code || !answer) return 0;
  const token = String(answer).trim();
  if (!token) return 0;
  if (/^[A-Za-z_$][\w$]*$/.test(token)) {
    const re = new RegExp(`(^|[^A-Za-z0-9_$])${escapeRegExp(token)}([^A-Za-z0-9_$]|$)`, "gi");
    return [...String(code).matchAll(re)].length;
  }
  return countOccurrences(code, token);
}

function auditMc(q) {
  const issues = distractorAudit.auditQuestion(q).map((issue) => {
    if (issue.code === "length-cue" && !isExamCoreConcept(q.conceptKey)) {
      return {
        ...issue,
        severity: "deferred",
        message: `${issue.message} Non-exam-core length balancing is tracked as deferred content debt outside the active Exam100 release path.`,
      };
    }
    return issue;
  });
  if (!q.conceptKey) {
    addIssue(issues, "warning", "missing-concept-key", "Question has no conceptKey, so adaptive/prerequisite routing is weaker.");
  }
  return issues;
}

function answerVisibleReviewStatus(q, qualityReviews) {
  const reviews = (qualityReviews && qualityReviews.answerVisible) || {};
  const review = reviews[q.id] || {};
  return q.answerVisibleReview || review.status || "";
}

function auditFill(q, qualityReviews = {}) {
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
    if (isExamCoreConcept(q.conceptKey)) {
      addIssue(issues, "note", "missing-hint", "Missing hint.");
    } else {
      addIssue(issues, "deferred", "missing-hint", "Missing hint. Non-exam-core hints are tracked as deferred content debt outside the active Exam100 release path.");
    }
  }

  const blanks = countOccurrences(q.code || "", "____");
  if (blanks !== 1) {
    addIssue(issues, "blocker", "blank-count", `Expected exactly one blank marker, found ${blanks}.`);
  }

  const answerOccurrences = countAnswerOccurrences(q.code || "", q.answer || "");
  if (answerOccurrences > 1) {
    addIssue(
      issues,
      "warning",
      "answer-visible-multiple",
      `Answer token appears ${answerOccurrences} times in the visible code; this can make the fill answer ambiguous.`,
    );
  } else if (answerOccurrences === 1 && answerVisibleReviewStatus(q, qualityReviews) !== APPROVED_ANSWER_VISIBLE_REVIEW) {
    addIssue(
      issues,
      "note",
      "answer-visible",
      "Answer token appears elsewhere in the visible code; manual review should confirm this is not a hint leak.",
    );
  }

  if (String(q.answer || "").trim().length === 1 && q.oneCharacterReview !== APPROVED_ONE_CHARACTER_REVIEW) {
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
    { blocker: 0, warning: 0, note: 0, advisory: 0, deferred: 0 },
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
      status: counts.blocker > 0 ? "blocked" : counts.warning > 0 ? "review" : counts.note > 0 ? "note" : counts.advisory > 0 ? "advisory" : counts.deferred > 0 ? "deferred" : "clean",
    },
    issues,
  };
}

function auditQuestionItems(bank) {
  const qualityReviews = (bank && bank.qualityReviews) || {};
  const all = [...bank.mc, ...bank.fill]
    .map((q) => {
      const issues = q.kind === "mc" ? auditMc(q) : auditFill(q, qualityReviews);
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

function auditAllQuestions() {
  return auditQuestionItems(loadQuestionBanks());
}

function summarizeQualityReviews(bank) {
  const answerVisible = ((bank.qualityReviews || {}).answerVisible) || {};
  const ids = Object.keys(answerVisible);
  const validIds = new Set([...(bank.mc || []), ...(bank.fill || [])].map((q) => q.id));
  return {
    file: `data/${QUALITY_REVIEW_FILE}`,
    answerVisibleReviewed: ids.length,
    unknownQuestionIds: ids.filter((id) => !validIds.has(id)).sort(),
  };
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
    advisoryQuestions: 0,
    deferredQuestions: 0,
    cleanQuestions: 0,
    blockerIssues: 0,
    warningIssues: 0,
    noteIssues: 0,
    advisoryIssues: 0,
    deferredIssues: 0,
    questionQualityIndex: 0,
    examCoreTotal: 0,
    examCoreCleanQuestions: 0,
    examCoreBlockerQuestions: 0,
    examCoreWarningQuestions: 0,
    examCoreNoteQuestions: 0,
    examCoreAdvisoryQuestions: 0,
    examCoreDeferredQuestions: 0,
    examCoreBlockerIssues: 0,
    examCoreWarningIssues: 0,
    examCoreNoteIssues: 0,
    examCoreAdvisoryIssues: 0,
    examCoreDeferredIssues: 0,
    examCoreQuestionQualityIndex: 0,
  };

  items.forEach((item) => {
    const counts = item.questionQuality.issueCounts;
    summary.blockerIssues += counts.blocker;
    summary.warningIssues += counts.warning;
    summary.noteIssues += counts.note;
    summary.advisoryIssues += counts.advisory || 0;
    summary.deferredIssues += counts.deferred || 0;
    if (counts.blocker > 0) summary.blockerQuestions++;
    else if (counts.warning > 0) summary.warningQuestions++;
    else if (counts.note > 0) summary.noteQuestions++;
    else if (counts.advisory > 0) summary.advisoryQuestions++;
    else if (counts.deferred > 0) summary.deferredQuestions++;
    else summary.cleanQuestions++;

    if (isExamCoreConcept(item.conceptKey)) {
      summary.examCoreTotal += 1;
      summary.examCoreBlockerIssues += counts.blocker;
      summary.examCoreWarningIssues += counts.warning;
      summary.examCoreNoteIssues += counts.note;
      summary.examCoreAdvisoryIssues += counts.advisory || 0;
      summary.examCoreDeferredIssues += counts.deferred || 0;
      if (counts.blocker > 0) summary.examCoreBlockerQuestions++;
      else if (counts.warning > 0) summary.examCoreWarningQuestions++;
      else if (counts.note > 0) summary.examCoreNoteQuestions++;
      else if (counts.advisory > 0) summary.examCoreAdvisoryQuestions++;
      else if (counts.deferred > 0) summary.examCoreDeferredQuestions++;
      else summary.examCoreCleanQuestions++;
    }
  });

  summary.questionQualityIndex = summary.total
    ? Math.round(((summary.cleanQuestions + summary.deferredQuestions + summary.advisoryQuestions + summary.noteQuestions) / summary.total) * 1000) / 10
    : 100;
  summary.examCoreQuestionQualityIndex = summary.examCoreTotal
    ? Math.round(((summary.examCoreCleanQuestions + summary.examCoreDeferredQuestions + summary.examCoreAdvisoryQuestions + summary.examCoreNoteQuestions) / summary.examCoreTotal) * 1000) / 10
    : 100;

  return summary;
}

function remediationQueue(items) {
  const severityRank = { blocker: 0, warning: 1, note: 2, advisory: 3, deferred: 4 };
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
  const bank = loadQuestionBanks();
  const items = auditQuestionItems(bank);
  return {
    reportVersion: "question-quality-v1",
    date: REPORT_DATE,
    source: "repo",
    summary: summarize(items),
    qualityReviews: summarizeQualityReviews(bank),
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
    `# Question Quality Report — ${report.date}`,
    "",
    "Full-bank deterministic QA for MC and Fill questions. This report creates a `questionQuality` object for every question id and a remediation queue for warnings, notes, and advisory review items.",
    "",
    "## Summary",
    "",
    `- Total questions: ${summary.total}`,
    `- Mix: ${summary.mc} MC, ${summary.fill} Fill`,
    `- Source mix: ${summary.manual} manual`,
    `- Clean: ${summary.cleanQuestions}`,
    `- Notes only: ${summary.noteQuestions}`,
    `- Advisory only: ${summary.advisoryQuestions}`,
    `- Deferred only: ${summary.deferredQuestions}`,
    `- Warning questions: ${summary.warningQuestions}`,
    `- Blocker questions: ${summary.blockerQuestions}`,
    `- Issue counts: ${summary.blockerIssues} blockers, ${summary.warningIssues} warnings, ${summary.noteIssues} notes, ${summary.advisoryIssues} advisory, ${summary.deferredIssues} deferred`,
    `- Question Quality Index: ${summary.questionQualityIndex}% warning-free`,
    "",
    "### Exam Core (SVCollege 70/20/10)",
    "",
    `- Exam-core questions: ${summary.examCoreTotal}`,
    `- Exam-core clean: ${summary.examCoreCleanQuestions}`,
    `- Exam-core notes only: ${summary.examCoreNoteQuestions}`,
    `- Exam-core advisory only: ${summary.examCoreAdvisoryQuestions}`,
    `- Exam-core deferred only: ${summary.examCoreDeferredQuestions}`,
    `- Exam-core warning questions: ${summary.examCoreWarningQuestions}`,
    `- Exam-core blocker questions: ${summary.examCoreBlockerQuestions}`,
    `- Exam-core issue counts: ${summary.examCoreBlockerIssues} blockers, ${summary.examCoreWarningIssues} warnings, ${summary.examCoreNoteIssues} notes, ${summary.examCoreAdvisoryIssues} advisory, ${summary.examCoreDeferredIssues} deferred`,
    `- Exam-core Quality Index: ${summary.examCoreQuestionQualityIndex}% warning-free`,
    "",
    "## Gates Covered",
    "",
    "- MC: duplicate options, near-duplicate distractors, exam-core length-cue risk, non-exam-core length-cue deferred, generic wording, missing explanation, missing conceptKey.",
    "- Fill: blank count, missing answer/code/explanation/hint, visible answer leakage, one-character ambiguity, missing conceptKey; non-exam-core missing hints are deferred.",
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
    "- Advisory items are active quality debt inside the current release path.",
    "- Deferred items remain visible quality debt outside the immediate Exam100 release path.",
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
  countAnswerOccurrences,
  countOccurrences,
  loadQuestionBanks,
  remediationQueue,
  run,
  summarize,
};
