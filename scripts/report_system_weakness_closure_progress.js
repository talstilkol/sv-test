#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUT_JSON = path.join(ROOT, "SYSTEM_WEAKNESS_CLOSURE_REPORT.json");
const OUT_MD = path.join(ROOT, "SYSTEM_WEAKNESS_CLOSURE_REPORT.md");
const OUT_BOARD = path.join(ROOT, "SYSTEM_WEAKNESS_CLOSURE_BOARD.md");

const SOURCES = {
  portal: "PORTAL_FULL_AUDIT_REPORT.json",
  postGreen: "POST_GREEN_HARDENING_REPORT.json",
  qualityDebt: "QUALITY_DEBT_PROGRESS_REPORT.json",
  questions: "QUESTION_REMEDIATION_QUEUE.json",
  questionQuality: "QUESTION_QUALITY_REPORT.json",
  distractors: "DISTRACTOR_REMEDIATION_QUEUE.json",
  distractorGate: "DISTRACTOR_EXAM_GATE_REPORT.json",
  backlog: "BRUTAL_MASTER_PLAN_AUDIT.json",
  releaseInventory: "RELEASE_INVENTORY_REPORT.json",
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

function pct(done, total) {
  if (!total) return "0%";
  const value = (done / total) * 100;
  return `${Number(value.toFixed(value % 1 === 0 ? 0 : 1))}%`;
}

function hoursLabel(hours) {
  const totalMinutes = Math.round(hours * 60);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  if (h && m) return `${h} שעות ${m} דק׳`;
  if (h) return `${h} שעות`;
  return `${m} דק׳`;
}

function countBy(items, keyFn) {
  return (items || []).reduce((acc, item) => {
    const key = keyFn(item) || "unknown/unavailable";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function topCounts(counts, limit = 10) {
  return Object.entries(counts || {})
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([key, count]) => ({ key, count }));
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

function buildQuestionRollup(questionQueue, questionQuality) {
  const queue = Array.isArray(questionQueue?.queue) ? questionQueue.queue : [];
  const notes = queue.filter((item) => item.severity === "note");
  const deferred = queue.filter((item) => item.severity === "deferred");
  return {
    total: val(questionQueue, ["summary", "total"], queue.length),
    notes: notes.length,
    deferred: deferred.length,
    batches: val(questionQueue, ["summary", "batches"]),
    byAction: val(questionQueue, ["summary", "byAction"], {}),
    examCoreIssues: (
      Number(val(questionQuality, ["summary", "examCoreNoteIssues"], 0)) +
      Number(val(questionQuality, ["summary", "examCoreAdvisoryIssues"], 0)) +
      Number(val(questionQuality, ["summary", "examCoreDeferredIssues"], 0))
    ),
    topActions: topCounts(countBy(queue, (item) => item.action)),
    topConcepts: topCounts(countBy(queue, (item) => item.conceptKey)),
  };
}

function buildDistractorRollup(distractorQueue, distractorGate) {
  const actionable = Array.isArray(distractorQueue?.items) ? distractorQueue.items : [];
  const deferred = Array.isArray(distractorQueue?.deferred) ? distractorQueue.deferred : [];
  return {
    actionable: actionable.length,
    deferred: deferred.length,
    advisory: Number(distractorQueue?.advisoryItems || 0),
    examCritical: val(distractorGate, ["totals", "examCriticalFlaggedQuestions"]),
    flaggedPercent: val(distractorGate, ["totals", "flaggedPercent"]),
    deferredPercent: val(distractorGate, ["totals", "deferredFlaggedPercent"]),
    topDeferredIssues: topCounts(countBy(deferred, (item) => item.issue)),
    topDeferredConcepts: topCounts(countBy(deferred, (item) => item.conceptKey)),
  };
}

function buildBacklogRollup(backlog) {
  const items = Array.isArray(backlog?.items) ? backlog.items : [];
  const realOpen = items.filter((item) => item.backlogClass === "real-open");
  return {
    realOpen: val(backlog, ["backlogClassSummary", "real-open"], realOpen.length),
    activeNotDone: val(backlog, ["activeStatusSummary", "NOT DONE"]),
    activePartial: val(backlog, ["activeStatusSummary", "PARTIAL"]),
    topItems: realOpen.map((item) => ({
      id: item.id,
      file: item.file,
      line: item.line,
      status: item.auditStatus,
      text: item.text,
    })),
  };
}

function buildReport({ generatedAt = new Date().toISOString() } = {}) {
  const portal = readJson(SOURCES.portal);
  const postGreen = readJson(SOURCES.postGreen);
  const qualityDebt = readJson(SOURCES.qualityDebt);
  const questionQueue = readJson(SOURCES.questions);
  const questionQuality = readJson(SOURCES.questionQuality);
  const distractorQueue = readJson(SOURCES.distractors);
  const distractorGate = readJson(SOURCES.distractorGate);
  const backlog = readJson(SOURCES.backlog);
  const releaseInventory = readJson(SOURCES.releaseInventory);
  const weekly = readJson("WEEKLY_PORTAL_STATUS.json");

  const question = buildQuestionRollup(questionQueue, questionQuality);
  const distractor = buildDistractorRollup(distractorQueue, distractorGate);
  const backlogRollup = buildBacklogRollup(backlog);
  const weeklyPortalReady =
    weekly?.ready === true &&
    weekly?.summary?.portalGates === "31/31" &&
    (Array.isArray(weekly?.regressions) ? weekly.regressions.length === 0 : Number(weekly?.summary?.regressions) === 0);
  const portalReady =
    (portal?.ready === true && val(portal, ["summary", "passed"]) === val(portal, ["summary", "total"])) ||
    weeklyPortalReady;
  const releaseInventoryReady = releaseInventory?.ready === true && val(releaseInventory, ["summary", "unknownPaths"]) === 0;
  const postGreenReady = postGreen?.ready === true && postGreen?.strictReady === true;
  const qualityDebtReady = qualityDebt?.ready === true;
  const backlogMapped = Number(backlogRollup.realOpen) === Number(backlogRollup.activeNotDone) + Number(backlogRollup.activePartial);

  const tasks = [
    task(
      "SW-001",
      "P0",
      "להקים לוח המשך לסגירת חולשות מערכת",
      0.5,
      true,
      "SYSTEM_WEAKNESS_CLOSURE_REPORT + SYSTEM_WEAKNESS_CLOSURE_BOARD",
      "Report script writes json/md/board and calculates percent/time",
    ),
    task(
      "SW-002",
      "P0",
      "לסגור release inventory בלי owner מזויף",
      2,
      releaseInventoryReady,
      `${val(releaseInventory, ["summary", "totalChangedPaths"])} paths, ${val(releaseInventory, ["summary", "unknownPaths"])} unknown, releaseAllowed=${val(releaseInventory, ["releaseAllowed"])}`,
      "RELEASE_INVENTORY_REPORT ready=true, unknownPaths=0, releaseAllowed=false while worktree is dirty",
    ),
    task(
      "SW-003",
      "P1",
      "לייצב מפת real-open אחרי inventory",
      1,
      backlogMapped && Number(backlogRollup.realOpen) <= 10,
      `${backlogRollup.realOpen} real-open`,
      "BRUTAL_MASTER_PLAN_AUDIT real-open <= 10 and active drift reconciles",
    ),
    task(
      "SW-004",
      "P1",
      "לתקן batch שני של 25 question remediation items",
      4,
      Number(question.total) <= 650,
      `${question.total} queued, ${question.notes}/${question.deferred} note/deferred`,
      "QUESTION_REMEDIATION_QUEUE total <= 650 with quality:questions:strict green",
    ),
    task(
      "SW-005",
      "P1",
      "לתקן batch שני של 25 distractor deferred items",
      4,
      Number(distractor.deferred) <= 421,
      `${distractor.deferred} deferred, ${distractor.actionable} actionable`,
      "DISTRACTOR_REMEDIATION_QUEUE deferred <= 421 with distractor:exam-gate:strict green",
    ),
    task(
      "SW-006",
      "P2",
      "להוריד Fill review notes מתחת 50",
      2,
      Number(question.notes) <= 50,
      `${question.notes} notes`,
      "Question note queue <= 50 without hiding answer-visible or one-character review debt",
    ),
    task(
      "SW-007",
      "P2",
      "להוריד backlog real-open ל-8 ומטה",
      4,
      Number(backlogRollup.realOpen) <= 8,
      `${backlogRollup.realOpen} real-open`,
      "Only close with live evidence; architecture work remains open unless implemented",
    ),
    task(
      "SW-008",
      "P0",
      "לוודא full gates אחרי ה-slice",
      1,
      portalReady && postGreenReady && qualityDebtReady && releaseInventoryReady && Number(question.examCoreIssues) === 0 && Number(distractor.examCritical) === 0,
      `${val(portal, ["summary", "passed"])}/${val(portal, ["summary", "total"])} portal, examCoreIssues=${question.examCoreIssues}, examCriticalDistractors=${distractor.examCritical}`,
      "portal:full-audit:strict, post-green:hardening:strict, quality-debt:progress:strict, release:inventory:strict are green",
    ),
  ];

  const closed = tasks.filter((item) => item.done);
  const totalHours = tasks.reduce((sum, item) => sum + item.estimatedHours, 0);
  const closedHours = closed.reduce((sum, item) => sum + item.estimatedHours, 0);
  const remainingHours = totalHours - closedHours;

  return {
    reportVersion: "system-weakness-closure-v1",
    generatedAt,
    ready: tasks.every((item) => item.done),
    strictReady: portalReady && postGreenReady && qualityDebtReady && releaseInventoryReady,
    summary: {
      closedTasks: closed.length,
      totalTasks: tasks.length,
      taskPercent: pct(closed.length, tasks.length),
      closedHours,
      totalHours,
      remainingHours,
      timePercent: pct(closedHours, totalHours),
      remainingLabel: hoursLabel(remainingHours),
    },
    question,
    distractor,
    backlog: backlogRollup,
    releaseInventory: {
      ready: releaseInventoryReady,
      releaseAllowed: val(releaseInventory, ["releaseAllowed"]),
      totalChangedPaths: val(releaseInventory, ["summary", "totalChangedPaths"]),
      unknownPaths: val(releaseInventory, ["summary", "unknownPaths"]),
      byClass: val(releaseInventory, ["summary", "byClass"], {}),
    },
    tasks,
    sources: SOURCES,
  };
}

function rowsFromTopCounts(items) {
  if (!items.length) return "| none | 0 |";
  return items.map((item) => `| ${item.key} | ${item.count} |`).join("\n");
}

function boardMarkdown(report) {
  const taskRows = report.tasks.map((item) =>
    `| ${item.id} | ${item.done ? "[x]" : "[ ]"} | ${item.priority} | ${item.title} | ${hoursLabel(item.estimatedHours)} | ${item.status} | ${item.current} | ${item.gate} |`,
  ).join("\n");
  return [
    "# לוח המשך - System Weakness Closure",
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
    `| Question queue | \`${report.question.total}\` |`,
    `| Question note/deferred | \`${report.question.notes}/${report.question.deferred}\` |`,
    `| Distractor actionable/deferred | \`${report.distractor.actionable}/${report.distractor.deferred}\` |`,
    `| Distractor exam-critical | \`${report.distractor.examCritical}\` |`,
    `| Backlog real-open | \`${report.backlog.realOpen}\` |`,
    `| Release inventory | \`${report.releaseInventory.totalChangedPaths} paths, ${report.releaseInventory.unknownPaths} unknown, releaseAllowed=${report.releaseInventory.releaseAllowed}\` |`,
    "",
    "## משימות",
    "",
    "| ID | סטטוס | עדיפות | משימה | זמן | תוצאה | מצב נוכחי | Gate |",
    "| --- | --- | --- | --- | ---: | --- | --- | --- |",
    taskRows,
    "",
  ].join("\n");
}

function toMarkdown(report) {
  return [
    boardMarkdown(report),
    "## Question Queue - Top Actions",
    "",
    "| Action | Count |",
    "| --- | ---: |",
    rowsFromTopCounts(report.question.topActions),
    "",
    "## Question Queue - Top Concepts",
    "",
    "| Concept | Count |",
    "| --- | ---: |",
    rowsFromTopCounts(report.question.topConcepts),
    "",
    "## Distractor Deferred - Top Issues",
    "",
    "| Issue | Count |",
    "| --- | ---: |",
    rowsFromTopCounts(report.distractor.topDeferredIssues),
    "",
    "## Backlog Real-open Items",
    "",
    "| # | Source | Line | ID | Status | Item |",
    "| ---: | --- | ---: | --- | --- | --- |",
    ...report.backlog.topItems.map((item, index) =>
      `| ${index + 1} | ${item.file} | ${item.line} | ${item.id} | ${item.status} | ${String(item.text).replace(/\|/g, "\\|")} |`,
    ),
    "",
  ].join("\n");
}

function writeReport(report) {
  fs.writeFileSync(OUT_JSON, `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(OUT_MD, toMarkdown(report));
  fs.writeFileSync(OUT_BOARD, boardMarkdown(report));
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
      questionQueue: report.question.total,
      distractorDeferred: report.distractor.deferred,
      backlogRealOpen: report.backlog.realOpen,
      releaseUnknownPaths: report.releaseInventory.unknownPaths,
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

module.exports = { buildReport, hoursLabel, pct, toMarkdown };
