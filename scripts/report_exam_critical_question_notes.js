#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const QUALITY_SCRIPT = path.join(__dirname, "report_question_quality.js");
const IN_PATH = path.join(ROOT, "QUESTION_QUALITY_REPORT.json");
const OUT_JSON = path.join(ROOT, "EXAM_CRITICAL_QUESTION_NOTES_REPORT.json");
const OUT_MD = path.join(ROOT, "EXAM_CRITICAL_QUESTION_NOTES_REPORT.md");

const EXAM_CRITICAL_LESSONS = new Set([11, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27]);
const PRIORITY_CODES = ["answer-visible", "missing-hint", "generic-wording", "length-cue"];
const PRIORITY_NOTES_LIMIT = 250;
const PRIORITY_ORDER = Object.freeze({
  "answer-visible": 1,
  "missing-hint": 2,
  "generic-wording": 3,
  "length-cue": 4,
});

function parseArgs(argv) {
  return {
    strict: argv.includes("--strict"),
    summary: argv.includes("--summary"),
  };
}

function isExamCriticalConcept(conceptKey) {
  const text = String(conceptKey || "");
  const m = text.match(/lesson_(\d+)/);
  if (m && EXAM_CRITICAL_LESSONS.has(Number(m[1]))) return true;
  return /workbook_taskmanager|next/i.test(text);
}

function safeReadJson(file) {
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function sourceFileFor(item) {
  if (!item || item.source !== "manual") return "unknown/unavailable";
  if (item.kind === "mc" || item.kind === "fill") return "data/questions_bank.js";
  return "unknown/unavailable";
}

function recommendedActionFor(item) {
  if (!item) return "Review manually.";
  if (item.code === "answer-visible") return "Rewrite visible code/comment so the answer token is not already exposed, or confirm the operator cue is intentional.";
  if (item.code === "missing-hint") return "Add a short Hebrew hint that points to the concept without giving the exact answer.";
  if (item.code === "generic-wording") return "Replace broad distractor wording with a specific student mistake.";
  if (item.code === "length-cue") return "Balance option lengths so the correct answer is not visually obvious.";
  return "Review manually and keep the source hand-authored.";
}

function refreshQuestionQuality() {
  execFileSync("node", [QUALITY_SCRIPT, "--write"], {
    cwd: ROOT,
    stdio: "ignore",
  });
}

function buildReport() {
  refreshQuestionQuality();
  const input = safeReadJson(IN_PATH) || {};
  const remediationQueue = Array.isArray(input.remediationQueue) ? input.remediationQueue : [];
  const notes = remediationQueue.filter((item) => item && item.severity === "note");
  const examCriticalNotes = notes.filter((item) => isExamCriticalConcept(item.conceptKey));
  const examCriticalPriorityNotes = examCriticalNotes.filter((item) => PRIORITY_CODES.includes(item.code));

  const byCode = {};
  examCriticalNotes.forEach((item) => {
    byCode[item.code] = (byCode[item.code] || 0) + 1;
  });
  const missingHintNotes = byCode["missing-hint"] || 0;
  const genericNotes = byCode["generic-wording"] || 0;
  const ready = examCriticalPriorityNotes.length <= PRIORITY_NOTES_LIMIT &&
    missingHintNotes === 0 &&
    genericNotes === 0;

  const prioritized = [...examCriticalPriorityNotes].sort((a, b) => {
    const pa = PRIORITY_ORDER[a.code] || 99;
    const pb = PRIORITY_ORDER[b.code] || 99;
    if (pa !== pb) return pa - pb;
    if (a.conceptKey !== b.conceptKey) return String(a.conceptKey).localeCompare(String(b.conceptKey));
    return String(a.id).localeCompare(String(b.id));
  }).map((item) => ({
    ...item,
    sourceFile: sourceFileFor(item),
    recommendedAction: recommendedActionFor(item),
  }));

  const report = {
    reportVersion: "exam-critical-question-notes-v1",
    generatedAt: new Date().toISOString(),
    sourceFile: IN_PATH,
    summary: {
      totalNotes: notes.length,
      examCriticalNotes: examCriticalNotes.length,
      examCriticalPriorityNotes: examCriticalPriorityNotes.length,
      byCode,
      thresholds: {
        maxPriorityNotes: PRIORITY_NOTES_LIMIT,
        maxMissingHint: 0,
        maxGenericWording: 0,
      },
      ready,
    },
    priorityCodes: PRIORITY_CODES,
    queue: prioritized,
  };
  return report;
}

function writeMarkdown(report) {
  const lines = [
    "# Exam-Critical Question Notes",
    "",
    `_Generated: ${report.generatedAt.slice(0, 10)}_`,
    "",
    "## Summary",
    `- Total notes: ${report.summary.totalNotes}`,
    `- Exam-critical notes: ${report.summary.examCriticalNotes}`,
    `- Exam-critical priority notes: ${report.summary.examCriticalPriorityNotes}`,
    `- Ready: ${report.summary.ready ? "Yes" : "No"}`,
    "",
    "## Priority Codes",
    ...report.priorityCodes.map((c) => `- ${c}: ${report.summary.byCode[c] || 0}`),
    "",
    "## Strict Gate",
    `- Max priority notes: ${report.summary.thresholds.maxPriorityNotes}`,
    `- Max missing-hint notes: ${report.summary.thresholds.maxMissingHint}`,
    `- Max generic-wording notes: ${report.summary.thresholds.maxGenericWording}`,
    "",
    "## Top 120 Queue",
    "",
    "| # | Code | ID | Concept | Source | Recommended action | Message |",
    "|---:|---|---|---|---|---|---|",
    ...report.queue.slice(0, 120).map((item, i) =>
      `| ${i + 1} | \`${item.code}\` | \`${item.id}\` | \`${item.conceptKey}\` | \`${item.sourceFile}\` | ${item.recommendedAction} | ${item.message} |`
    ),
    "",
  ];
  fs.writeFileSync(OUT_MD, lines.join("\n"));
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const report = buildReport();
  fs.writeFileSync(OUT_JSON, JSON.stringify(report, null, 2));
  writeMarkdown(report);
  if (args.summary) {
    console.log(JSON.stringify(report.summary, null, 2));
  }
  if (args.strict && !report.summary.ready) {
    process.exitCode = 1;
  }
}

if (require.main === module) main();
