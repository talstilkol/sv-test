#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const AUDIT_SCRIPT = path.join(__dirname, "audit_distractor_quality.js");
const REPORT_JSON = path.join(ROOT, "DISTRACTOR_QUALITY_REPORT.json");
const OUT_JSON = path.join(ROOT, "DISTRACTOR_EXAM_GATE_REPORT.json");
const OUT_MD = path.join(ROOT, "DISTRACTOR_EXAM_GATE_REPORT.md");

const args = process.argv.slice(2);
const strict = args.includes("--strict");
const summary = args.includes("--summary");

const GLOBAL_WARN_THRESHOLD = 10;
const EXAM_CRITICAL_FAIL_THRESHOLD = 15;

function runAudit() {
  execFileSync("node", [AUDIT_SCRIPT], {
    cwd: ROOT,
    stdio: "inherit",
  });
}

function loadAudit() {
  return JSON.parse(fs.readFileSync(REPORT_JSON, "utf8"));
}

function isExamCritical(conceptKey) {
  const text = String(conceptKey || "");
  const match = text.match(/lesson_(\d+)/);
  const lessonId = match ? Number(match[1]) : null;
  if (lessonId && [11, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27].includes(lessonId)) return true;
  return /workbook_taskmanager|next/i.test(text);
}

function loadManualMcQuestions() {
  const file = path.join(ROOT, "data", "questions_bank.js");
  const source = fs.readFileSync(file, "utf8");
  const sandbox = { console };
  vm.runInNewContext(source, sandbox, { filename: "questions_bank.js" });
  return Array.isArray(sandbox.QUESTIONS_BANK?.mc) ? sandbox.QUESTIONS_BANK.mc : [];
}

function evaluate(audit) {
  const mcTotal = Number(audit.total || 0);
  const flaggedTotal = Number(audit.flaggedCount || 0);
  const flaggedPct = Number(audit.flaggedPct || 0);
  const rawFlaggedTotal = Number(audit.rawFlaggedCount || flaggedTotal);
  const rawFlaggedPct = Number(audit.rawFlaggedPct || flaggedPct);
  const advisoryFlaggedTotal = Number(audit.advisoryFlaggedCount || 0);
  const advisoryFlaggedPct = Number(audit.advisoryFlaggedPct || 0);
  const deferredFlaggedTotal = Number(audit.deferredFlaggedCount || 0);
  const deferredFlaggedPct = Number(audit.deferredFlaggedPct || 0);
  const historicalRawFlaggedTotal = Number(audit.historicalRawFlaggedCount || rawFlaggedTotal + deferredFlaggedTotal);
  const historicalRawFlaggedPct = Number(audit.historicalRawFlaggedPct || rawFlaggedPct);
  const mcQuestions = loadManualMcQuestions();
  const criticalTotal = mcQuestions.filter((item) => isExamCritical(item.conceptKey)).length;

  const criticalSet = new Set();
  let criticalFlagEvents = 0;
  (audit.flagged || []).forEach((item) => {
    if (isExamCritical(item.conceptKey)) {
      criticalSet.add(item.id);
      criticalFlagEvents += Array.isArray(item.issues) ? item.issues.length : 0;
    }
  });
  const criticalQuestions = criticalSet.size;
  const criticalPct = criticalTotal > 0 ? Math.round((criticalQuestions / criticalTotal) * 1000) / 10 : 0;
  const remediationQueue = Array.isArray(audit.remediationQueue) ? audit.remediationQueue : [];
  const criticalQueue = remediationQueue.filter((item) => isExamCritical(item.conceptKey));

  const warnings = [];
  const failures = [];

  if (flaggedPct > GLOBAL_WARN_THRESHOLD) {
    warnings.push(`Global flagged distractor quality is ${flaggedPct}% (> ${GLOBAL_WARN_THRESHOLD}%).`);
  }
  if (criticalPct > EXAM_CRITICAL_FAIL_THRESHOLD) {
    failures.push(`Exam-critical flagged rate is ${criticalPct}% (> ${EXAM_CRITICAL_FAIL_THRESHOLD}%).`);
  }

  return {
    reportVersion: "distractor-exam-gate-v1",
    generatedAt: new Date().toISOString(),
    thresholds: {
      globalWarnPercent: GLOBAL_WARN_THRESHOLD,
      examCriticalFailPercent: EXAM_CRITICAL_FAIL_THRESHOLD,
    },
    totals: {
      mcQuestions: mcTotal,
      flaggedQuestions: flaggedTotal,
      flaggedPercent: flaggedPct,
      rawFlaggedQuestions: rawFlaggedTotal,
      rawFlaggedPercent: rawFlaggedPct,
      advisoryFlaggedQuestions: advisoryFlaggedTotal,
      advisoryFlaggedPercent: advisoryFlaggedPct,
      deferredFlaggedQuestions: deferredFlaggedTotal,
      deferredFlaggedPercent: deferredFlaggedPct,
      historicalRawFlaggedQuestions: historicalRawFlaggedTotal,
      historicalRawFlaggedPercent: historicalRawFlaggedPct,
      examCriticalQuestions: criticalTotal,
      examCriticalFlaggedQuestions: criticalQuestions,
      examCriticalFlaggedPercent: criticalPct,
      examCriticalIssueEvents: criticalFlagEvents,
      examCriticalQueueItems: criticalQueue.length,
    },
    examCriticalQueue: criticalQueue.slice(0, 80),
    warnings,
    failures,
    ready: failures.length === 0,
  };
}

function writeMarkdown(report) {
  const lines = [
    "# Distractor Exam Gate",
    "",
    `_Generated: ${report.generatedAt.slice(0, 10)}_`,
    "",
    "## Summary",
    `- MC total: ${report.totals.mcQuestions}`,
    `- Global actionable flagged: ${report.totals.flaggedQuestions} (${report.totals.flaggedPercent}%)`,
    `- Advisory flagged: ${report.totals.advisoryFlaggedQuestions} (${report.totals.advisoryFlaggedPercent}%)`,
    `- Active raw flagged before advisory split: ${report.totals.rawFlaggedQuestions} (${report.totals.rawFlaggedPercent}%)`,
    `- Deferred non-exam length-only flagged: ${report.totals.deferredFlaggedQuestions} (${report.totals.deferredFlaggedPercent}%)`,
    `- Historical raw flagged before deferred split: ${report.totals.historicalRawFlaggedQuestions} (${report.totals.historicalRawFlaggedPercent}%)`,
    `- Exam-critical MC total: ${report.totals.examCriticalQuestions}`,
    `- Exam-critical flagged: ${report.totals.examCriticalFlaggedQuestions} (${report.totals.examCriticalFlaggedPercent}%)`,
    `- Exam-critical queue items: ${report.totals.examCriticalQueueItems}`,
    `- Gate ready: ${report.ready ? "Yes" : "No"}`,
    "",
    "## Thresholds",
    `- Warning if global actionable flagged > ${report.thresholds.globalWarnPercent}%`,
    `- Fail if exam-critical flagged > ${report.thresholds.examCriticalFailPercent}%`,
    "",
    "## Warnings",
    ...(report.warnings.length ? report.warnings.map((w) => `- ${w}`) : ["- None"]),
    "",
    "## Failures",
    ...(report.failures.length ? report.failures.map((f) => `- ${f}`) : ["- None"]),
    "",
    "## Top Exam-Critical Queue",
    "",
    "| # | ID | Concept | Issue | Heat | Action |",
    "|---:|---|---|---|---:|---|",
    ...report.examCriticalQueue.slice(0, 30).map((item, index) =>
      `| ${index + 1} | \`${item.id}\` | \`${item.conceptKey}\` | \`${item.issue}\` | ${item.heat ?? ""} | ${item.recommendedAction || "Review manually."} |`
    ),
    "",
  ];
  fs.writeFileSync(OUT_MD, lines.join("\n"));
}

function main() {
  runAudit();
  const audit = loadAudit();
  const report = evaluate(audit);
  fs.writeFileSync(OUT_JSON, JSON.stringify(report, null, 2));
  writeMarkdown(report);

  if (summary) {
    console.log(JSON.stringify({
      ready: report.ready,
      globalFlaggedPercent: report.totals.flaggedPercent,
      rawFlaggedPercent: report.totals.rawFlaggedPercent,
      advisoryFlaggedPercent: report.totals.advisoryFlaggedPercent,
      deferredFlaggedPercent: report.totals.deferredFlaggedPercent,
      historicalRawFlaggedPercent: report.totals.historicalRawFlaggedPercent,
      examCriticalQuestions: report.totals.examCriticalQuestions,
      examCriticalFlaggedQuestions: report.totals.examCriticalFlaggedQuestions,
      examCriticalFlaggedPercent: report.totals.examCriticalFlaggedPercent,
      examCriticalQueueItems: report.totals.examCriticalQueueItems,
      warnings: report.warnings.length,
      failures: report.failures.length,
    }, null, 2));
  }

  if (strict && !report.ready) {
    process.exitCode = 1;
  }
}

if (require.main === module) main();
