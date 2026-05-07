#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUT_JSON = path.join(ROOT, "POST_GREEN_HARDENING_REPORT.json");
const OUT_MD = path.join(ROOT, "POST_GREEN_HARDENING_REPORT.md");
const OUT_BOARD = path.join(ROOT, "POST_GREEN_TASK_BOARD.md");

const SOURCES = {
  qualityDebt: "QUALITY_DEBT_PROGRESS_REPORT.json",
  questions: "QUESTION_QUALITY_REPORT.json",
  questionQueue: "QUESTION_REMEDIATION_QUEUE.json",
  distractors: "DISTRACTOR_EXAM_GATE_REPORT.json",
  distractorQueue: "DISTRACTOR_REMEDIATION_QUEUE.json",
  backlog: "BRUTAL_MASTER_PLAN_AUDIT.json",
  portal: "PORTAL_FULL_AUDIT_REPORT.json",
};

function readJson(relativePath) {
  const fullPath = path.join(ROOT, relativePath);
  if (!fs.existsSync(fullPath)) return null;
  return JSON.parse(fs.readFileSync(fullPath, "utf8"));
}

function val(source, pathParts, fallback = "unknown/unavailable") {
  let current = source;
  for (const part of pathParts) {
    if (current == null || !Object.prototype.hasOwnProperty.call(current, part)) return fallback;
    current = current[part];
  }
  return current == null ? fallback : current;
}

function countBy(items, keyFn) {
  return (items || []).reduce((acc, item) => {
    const key = keyFn(item) || "unknown/unavailable";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function topCounts(counts, limit = 12) {
  return Object.entries(counts || {})
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([key, count]) => ({ key, count }));
}

function hoursLabel(hours) {
  const totalMinutes = Math.round(hours * 60);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  if (h && m) return `${h} שעות ${m} דק׳`;
  if (h) return `${h} שעות`;
  return `${m} דק׳`;
}

function pct(done, total) {
  if (!total) return "0%";
  const value = (done / total) * 100;
  return `${Number(value.toFixed(value % 1 === 0 ? 0 : 1))}%`;
}

function task(id, priority, title, estimatedHours, done, current, gate) {
  return {
    id,
    priority,
    title,
    estimatedHours,
    done: Boolean(done),
    status: done ? "V" : "open",
    current,
    gate,
  };
}

function buildQuestionRollup(questionReport, questionQueue) {
  const queue = Array.isArray(questionQueue?.queue) ? questionQueue.queue : [];
  const deferred = queue.filter((item) => item.severity === "deferred");
  const notes = queue.filter((item) => item.severity === "note");
  return {
    queuedIssues: val(questionQueue, ["summary", "total"], queue.length),
    noteQueue: notes.length,
    deferredQueue: deferred.length,
    batches: val(questionQueue, ["summary", "batches"]),
    byAction: val(questionQueue, ["summary", "byAction"], {}),
    bySeverity: val(questionQueue, ["summary", "bySeverity"], {}),
    topDeferredActions: topCounts(countBy(deferred, (item) => item.action)),
    topDeferredConcepts: topCounts(countBy(deferred, (item) => item.conceptKey)),
    topNoteActions: topCounts(countBy(notes, (item) => item.action)),
    sourceSummary: {
      noteIssues: val(questionReport, ["summary", "noteIssues"]),
      advisoryIssues: val(questionReport, ["summary", "advisoryIssues"]),
      deferredIssues: val(questionReport, ["summary", "deferredIssues"]),
      examCoreIssues: (
        Number(val(questionReport, ["summary", "examCoreNoteIssues"], 0)) +
        Number(val(questionReport, ["summary", "examCoreAdvisoryIssues"], 0)) +
        Number(val(questionReport, ["summary", "examCoreDeferredIssues"], 0))
      ),
    },
  };
}

function buildDistractorRollup(distractorReport, distractorQueue) {
  const deferred = Array.isArray(distractorQueue?.deferred) ? distractorQueue.deferred : [];
  const actionable = Array.isArray(distractorQueue?.items) ? distractorQueue.items : [];
  return {
    actionableQueue: actionable.length,
    deferredQueue: deferred.length,
    advisoryQueue: Number(distractorQueue?.advisoryItems || 0),
    topDeferredConcepts: topCounts(countBy(deferred, (item) => item.conceptKey)),
    topDeferredIssues: topCounts(countBy(deferred, (item) => item.issue)),
    topActionableIssues: topCounts(countBy(actionable, (item) => item.issue)),
    sourceSummary: {
      flaggedPercent: val(distractorReport, ["totals", "flaggedPercent"]),
      rawFlaggedPercent: val(distractorReport, ["totals", "rawFlaggedPercent"]),
      advisoryFlaggedQuestions: val(distractorReport, ["totals", "advisoryFlaggedQuestions"]),
      deferredFlaggedQuestions: val(distractorReport, ["totals", "deferredFlaggedQuestions"]),
      examCriticalFlaggedQuestions: val(distractorReport, ["totals", "examCriticalFlaggedQuestions"]),
    },
  };
}

function buildBacklogRollup(backlogReport) {
  const items = Array.isArray(backlogReport?.items) ? backlogReport.items : [];
  const realOpen = items.filter((item) => item.backlogClass === "real-open");
  return {
    realOpen: val(backlogReport, ["backlogClassSummary", "real-open"], realOpen.length),
    activeNotDone: val(backlogReport, ["activeStatusSummary", "NOT DONE"]),
    activePartial: val(backlogReport, ["activeStatusSummary", "PARTIAL"]),
    byFile: topCounts(countBy(realOpen, (item) => item.file)),
    byStatus: topCounts(countBy(realOpen, (item) => item.auditStatus)),
    topItems: realOpen.slice(0, 21).map((item) => ({
      id: item.id,
      file: item.file,
      line: item.line,
      status: item.auditStatus,
      text: item.text,
      reason: item.backlogReason || item.reason || "unknown/unavailable",
    })),
  };
}

function buildReport({ generatedAt = new Date().toISOString() } = {}) {
  const qualityDebt = readJson(SOURCES.qualityDebt);
  const questions = readJson(SOURCES.questions);
  const questionQueue = readJson(SOURCES.questionQueue);
  const distractors = readJson(SOURCES.distractors);
  const distractorQueue = readJson(SOURCES.distractorQueue);
  const backlog = readJson(SOURCES.backlog);
  const portal = readJson(SOURCES.portal);
  const weekly = readJson("WEEKLY_PORTAL_STATUS.json");

  const questionRollup = buildQuestionRollup(questions, questionQueue);
  const distractorRollup = buildDistractorRollup(distractors, distractorQueue);
  const backlogRollup = buildBacklogRollup(backlog);
  const weeklyPortalReady =
    weekly?.ready === true &&
    weekly?.summary?.portalGates === "31/31" &&
    (Array.isArray(weekly?.regressions) ? weekly.regressions.length === 0 : Number(weekly?.summary?.regressions) === 0);
  const portalReady =
    (portal?.ready === true && val(portal, ["summary", "passed"]) === val(portal, ["summary", "total"])) ||
    weeklyPortalReady;

  const questionQueueSynced =
    Number(questionRollup.queuedIssues) === Number(questionRollup.sourceSummary.noteIssues) + Number(questionRollup.sourceSummary.deferredIssues) &&
    Number(questionRollup.sourceSummary.advisoryIssues) === 0 &&
    Number(questionRollup.sourceSummary.examCoreIssues) === 0;
  const distractorQueueSynced =
    Number(distractorRollup.sourceSummary.advisoryFlaggedQuestions) === 0 &&
    Number(distractorRollup.deferredQueue) === Number(distractorRollup.sourceSummary.deferredFlaggedQuestions);
  const backlogMapped =
    Number(backlogRollup.realOpen) === Number(backlogRollup.activeNotDone) + Number(backlogRollup.activePartial) &&
    backlogRollup.topItems.length === Number(backlogRollup.realOpen);

  const tasks = [
    task(
      "PG-001",
      "P0",
      "לסנכרן תורי remediation מול הדוחות הנוכחיים",
      0.5,
      questionQueueSynced && distractorQueueSynced,
      `${questionRollup.queuedIssues} question queue, ${distractorRollup.deferredQueue} distractor deferred`,
      "QUESTION_REMEDIATION_QUEUE matches QUESTION_QUALITY_REPORT and DISTRACTOR_REMEDIATION_QUEUE matches DISTRACTOR_EXAM_GATE_REPORT",
    ),
    task(
      "PG-002",
      "P0",
      "להקים לוח Post-green hardening עם אחוז וזמן",
      0.5,
      true,
      "POST_GREEN_HARDENING_REPORT + POST_GREEN_TASK_BOARD",
      "Report script writes json/md/task board and exposes summary",
    ),
    task(
      "PG-003",
      "P1",
      "למיין question deferred לפי action/concept/batch",
      1,
      questionQueueSynced && questionRollup.topDeferredActions.length > 0,
      `${questionRollup.deferredQueue} deferred, ${questionRollup.batches} batches`,
      "Top deferred actions/concepts are available without auto rewrite",
    ),
    task(
      "PG-004",
      "P1",
      "למיין distractor deferred לפי issue/concept/source",
      1,
      distractorQueueSynced && distractorRollup.topDeferredIssues.length > 0,
      `${distractorRollup.deferredQueue} deferred, ${distractorRollup.advisoryQueue} advisory`,
      "Deferred distractor queue is visible and advisory remains 0",
    ),
    task(
      "PG-005",
      "P1",
      "למפות real-open backlog לשורות מקור ותיקון הבא",
      1,
      backlogMapped,
      `${backlogRollup.realOpen} real-open, ${backlogRollup.activeNotDone} active NOT DONE, ${backlogRollup.activePartial} active PARTIAL`,
      "Every active real-open item has source file/line/id/reason",
    ),
    task(
      "PG-006",
      "P2",
      "לתקן ידנית batch ראשון של 25 question remediation items",
      4,
      Number(questionRollup.queuedIssues) <= 697,
      `${questionRollup.queuedIssues} queued issues`,
      "Queue total <= 697 after verified manual edits and quality gates",
    ),
    task(
      "PG-007",
      "P2",
      "לתקן ידנית batch ראשון של 25 distractor remediation items",
      4,
      Number(distractorRollup.deferredQueue) <= 446,
      `${distractorRollup.deferredQueue} deferred distractors`,
      "Deferred distractor queue <= 446 after verified manual edits",
    ),
    task(
      "PG-008",
      "P3",
      "לסגור slice ראשון של real-open architecture/backlog",
      6,
      Number(backlogRollup.realOpen) <= 15,
      `${backlogRollup.realOpen} real-open`,
      "BRUTAL_MASTER_PLAN_AUDIT real-open <= 15 with live evidence",
    ),
  ];

  const closed = tasks.filter((item) => item.done);
  const automationTasks = tasks.slice(0, 5);
  const totalHours = tasks.reduce((sum, item) => sum + item.estimatedHours, 0);
  const closedHours = closed.reduce((sum, item) => sum + item.estimatedHours, 0);
  const remainingHours = totalHours - closedHours;

  return {
    reportVersion: "post-green-hardening-v1",
    generatedAt,
    ready: tasks.every((item) => item.done),
    strictReady: portalReady && qualityDebt?.ready === true && automationTasks.every((item) => item.done),
    summary: {
      closedTasks: closed.length,
      totalTasks: tasks.length,
      taskPercent: pct(closed.length, tasks.length),
      closedHours,
      totalHours,
      remainingHours,
      timePercent: pct(closedHours, totalHours),
      remainingLabel: hoursLabel(remainingHours),
      portalReady,
      qualityDebtReady: qualityDebt?.ready === true,
    },
    questionRollup,
    distractorRollup,
    backlogRollup,
    tasks,
    sources: SOURCES,
  };
}

function rowsFromTopCounts(items) {
  if (!items.length) return "| none | 0 |";
  return items.map((item) => `| ${item.key} | ${item.count} |`).join("\n");
}

function writeReport(report) {
  fs.writeFileSync(OUT_JSON, `${JSON.stringify(report, null, 2)}\n`);

  const taskRows = report.tasks.map((item) =>
    `| ${item.id} | ${item.done ? "[x]" : "[ ]"} | ${item.priority} | ${item.title} | ${hoursLabel(item.estimatedHours)} | ${item.status} | ${item.current} | ${item.gate} |`,
  ).join("\n");
  const board = [
    "# לוח המשך - Post-green hardening",
    "",
    `עודכן: ${report.generatedAt}`,
    "",
    "## אחוז השלמה וזמן לסיום",
    "",
    "| מדד | ערך |",
    "| --- | --- |",
    `| משימות סגורות | \`${report.summary.closedTasks}/${report.summary.totalTasks}\` |`,
    `| אחוז השלמה לפי משימות | \`${report.summary.taskPercent}\` |`,
    `| אחוז השלמה לפי זמן | \`${report.summary.timePercent}\` |`,
    `| זמן שכבר נסגר | \`${hoursLabel(report.summary.closedHours)}\` |`,
    `| זמן משוער שנותר | \`${report.summary.remainingLabel}\` |`,
    `| זמן כולל משוער | \`${hoursLabel(report.summary.totalHours)}\` |`,
    "",
    "## מדדים חיים",
    "",
    "| מדד | ערך |",
    "| --- | --- |",
    `| Question queue | \`${report.questionRollup.queuedIssues}\` |`,
    `| Question note/deferred | \`${report.questionRollup.noteQueue}/${report.questionRollup.deferredQueue}\` |`,
    `| Question batches | \`${report.questionRollup.batches}\` |`,
    `| Distractor actionable/deferred | \`${report.distractorRollup.actionableQueue}/${report.distractorRollup.deferredQueue}\` |`,
    `| Distractor advisory | \`${report.distractorRollup.advisoryQueue}\` |`,
    `| Backlog real-open | \`${report.backlogRollup.realOpen}\` |`,
    `| Backlog active drift | \`${report.backlogRollup.activeNotDone} NOT DONE, ${report.backlogRollup.activePartial} PARTIAL\` |`,
    "",
    "## משימות",
    "",
    "| ID | סטטוס | עדיפות | משימה | זמן | תוצאה | מצב נוכחי | Gate |",
    "| --- | --- | --- | --- | ---: | --- | --- | --- |",
    taskRows,
    "",
  ].join("\n");

  const md = [
    board,
    "## Question Deferred - Top Actions",
    "",
    "| Action | Count |",
    "| --- | ---: |",
    rowsFromTopCounts(report.questionRollup.topDeferredActions),
    "",
    "## Question Deferred - Top Concepts",
    "",
    "| Concept | Count |",
    "| --- | ---: |",
    rowsFromTopCounts(report.questionRollup.topDeferredConcepts),
    "",
    "## Distractor Deferred - Top Issues",
    "",
    "| Issue | Count |",
    "| --- | ---: |",
    rowsFromTopCounts(report.distractorRollup.topDeferredIssues),
    "",
    "## Backlog Real-open Items",
    "",
    "| # | Source | Line | ID | Status | Item |",
    "| ---: | --- | ---: | --- | --- | --- |",
    ...report.backlogRollup.topItems.map((item, index) =>
      `| ${index + 1} | ${item.file} | ${item.line} | ${item.id} | ${item.status} | ${String(item.text).replace(/\|/g, "\\|")} |`,
    ),
    "",
  ].join("\n");

  fs.writeFileSync(OUT_BOARD, board);
  fs.writeFileSync(OUT_MD, md);
}

function run(argv = process.argv.slice(2)) {
  const args = new Set(argv);
  const report = buildReport();
  if (args.has("--write")) writeReport(report);
  if (args.has("--summary")) {
    console.log(JSON.stringify({
      ready: report.ready,
      strictReady: report.strictReady,
      closedTasks: `${report.summary.closedTasks}/${report.summary.totalTasks}`,
      taskPercent: report.summary.taskPercent,
      timePercent: report.summary.timePercent,
      remainingTime: report.summary.remainingLabel,
      questionQueue: report.questionRollup.queuedIssues,
      distractorDeferred: report.distractorRollup.deferredQueue,
      backlogRealOpen: report.backlogRollup.realOpen,
    }, null, 2));
  }
  if (args.has("--strict") && !report.strictReady) {
    process.exitCode = 1;
  }
  return report;
}

if (require.main === module) {
  run();
}

module.exports = {
  buildReport,
  countBy,
  hoursLabel,
  pct,
  topCounts,
};
