#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUT_JSON = path.join(ROOT, "QUALITY_DEBT_PROGRESS_REPORT.json");
const OUT_MD = path.join(ROOT, "QUALITY_DEBT_PROGRESS_REPORT.md");
const OUT_BOARD = path.join(ROOT, "QUALITY_DEBT_TASK_BOARD.md");

const SOURCES = {
  portal: "PORTAL_FULL_AUDIT_REPORT.json",
  weekly: "WEEKLY_PORTAL_STATUS.json",
  questions: "QUESTION_QUALITY_REPORT.json",
  distractors: "DISTRACTOR_EXAM_GATE_REPORT.json",
  backlog: "BRUTAL_MASTER_PLAN_AUDIT.json",
  taskBoard: "EXAM_TASK_BOARD_REPORT.json",
  manualReview: "EXAM_MANUAL_REVIEW_SECTIONS_REPORT.json",
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

function task(id, priority, title, estimatedHours, done, gate, current) {
  return {
    id,
    priority,
    title,
    estimatedHours,
    done: Boolean(done),
    status: done ? "V" : "open",
    gate,
    current,
  };
}

function buildReport({ generatedAt = new Date().toISOString() } = {}) {
  const portal = readJson(SOURCES.portal);
  const weekly = readJson(SOURCES.weekly);
  const questions = readJson(SOURCES.questions);
  const distractors = readJson(SOURCES.distractors);
  const backlog = readJson(SOURCES.backlog);
  const taskBoard = readJson(SOURCES.taskBoard);
  const manualReview = readJson(SOURCES.manualReview);

  const questionSummary = questions ? questions.summary || {} : {};
  const distractorTotals = distractors ? distractors.totals || {} : {};
  const backlogClasses = backlog ? backlog.backlogClassSummary || {} : {};
  const backlogSummary = backlog ? backlog.summary || {} : {};
  const activeStatusSummary = backlog ? backlog.activeStatusSummary || {} : {};
  const taskTotals = taskBoard ? taskBoard.totals || {} : {};
  const manualReviewTotals = manualReview ? manualReview.totals || {} : {};
  const weeklyPortalReady = weekly?.ready === true &&
    weekly?.summary?.portalGates === "31/31" &&
    (Array.isArray(weekly?.regressions) ? weekly.regressions.length === 0 : Number(weekly?.summary?.regressions) === 0);
  const portalReady =
    val(portal, ["ready"], false) === true ||
    weeklyPortalReady;
  const portalGates = portalReady && val(portal, ["ready"], false) !== true
    ? val(weekly, ["summary", "portalGates"])
    : `${val(portal, ["summary", "passed"])}/${val(portal, ["summary", "total"])}`;
  const manualReviewReady = manualReview?.ready === true &&
    Number(manualReviewTotals.manualReviewSections) === Number(manualReviewTotals.lockedNonAutoScorable) &&
    Number(manualReviewTotals.manualReviewSections) === Number(manualReviewTotals.withSourceReviewTask) &&
    Number(manualReviewTotals.manualReviewSections) === Number(manualReviewTotals.withoutInventedCodeSurface);

  const metrics = {
    portalGates,
    portalReady,
    weeklyRegressions: val(weekly, ["summary", "regressions"]),
    questionNotes: val(questionSummary, ["noteIssues"]),
    questionAdvisory: val(questionSummary, ["advisoryIssues"]),
    questionDeferred: val(questionSummary, ["deferredIssues"]),
    examCoreNotes: val(questionSummary, ["examCoreNoteIssues"]),
    distractorActionablePct: val(distractorTotals, ["flaggedPercent"]),
    distractorActionable: val(distractorTotals, ["flaggedQuestions"]),
    distractorRawPct: val(distractorTotals, ["rawFlaggedPercent"]),
    distractorAdvisory: val(distractorTotals, ["advisoryFlaggedQuestions"]),
    distractorDeferred: val(distractorTotals, ["deferredFlaggedQuestions"]),
    manualReviewLocked: val(taskTotals, ["manualReviewLocked"]),
    manualReviewReady,
    backlogRealOpen: val(backlogClasses, ["real-open"]),
    backlogNotDone: val(backlogSummary, ["NOT DONE"]),
    backlogPartial: val(backlogSummary, ["PARTIAL"]),
    backlogActiveNotDone: val(activeStatusSummary, ["NOT DONE"], val(backlogSummary, ["NOT DONE"])),
    backlogActivePartial: val(activeStatusSummary, ["PARTIAL"], val(backlogSummary, ["PARTIAL"])),
  };

  const tasks = [
    task(
      "QD-001",
      "P0",
      "להקים מדד חוב איכות אוטומטי ולוח המשך",
      0.5,
      true,
      "QUALITY_DEBT_PROGRESS_REPORT.md/json + QUALITY_DEBT_TASK_BOARD.md",
      "נוצר בדוח הנוכחי",
    ),
    task(
      "QD-002",
      "P0",
      "לשמור regressions על 0 ו־portal gates ירוקים",
      0.5,
      metrics.portalReady === true && metrics.weeklyRegressions === 0,
      "PORTAL_FULL_AUDIT_REPORT 31/31 + WEEKLY_PORTAL_STATUS regressions 0",
      `${metrics.portalGates}, regressions ${metrics.weeklyRegressions}`,
    ),
    task(
      "QD-003",
      "P1",
      "להוריד question notes מתחת 150 בלי שינוי exam-core",
      4,
      Number(metrics.questionNotes) < 150 && Number(metrics.examCoreNotes) === 0,
      "QUESTION_QUALITY_REPORT noteIssues < 150, examCoreNoteIssues 0",
      `${metrics.questionNotes} notes, exam-core ${metrics.examCoreNotes}`,
    ),
    task(
      "QD-004",
      "P1",
      "להוריד advisory question debt מתחת 250",
      3,
      Number(metrics.questionAdvisory) < 250,
      "QUESTION_QUALITY_REPORT advisoryIssues < 250",
      `${metrics.questionAdvisory} advisory, ${metrics.questionDeferred} deferred`,
    ),
    task(
      "QD-005",
      "P1",
      "להוריד distractor actionable מתחת 5%",
      3,
      Number(metrics.distractorActionablePct) < 5,
      "DISTRACTOR_EXAM_GATE_REPORT flaggedPercent < 5",
      `${metrics.distractorActionable} actionable, ${metrics.distractorActionablePct}%`,
    ),
    task(
      "QD-006",
      "P2",
      "לסווג raw/advisory distractor debt ולהשאיר רק פריטים עם פעולה אמיתית",
      3,
      Number(metrics.distractorRawPct) < 12 && Number(metrics.distractorAdvisory) < 250,
      "rawFlaggedPercent < 12 and advisoryFlaggedQuestions < 250",
      `${metrics.distractorRawPct}% raw, ${metrics.distractorAdvisory} advisory, ${metrics.distractorDeferred} deferred`,
    ),
    task(
      "QD-007",
      "P2",
      "לטפל ב־4 סעיפי manual_review עם מקור או נעילה מנומקת",
      2,
      Number(metrics.manualReviewLocked) === 0 || metrics.manualReviewReady === true,
      "manualReviewLocked 0 OR EXAM_MANUAL_REVIEW_SECTIONS_REPORT ready with locked/no-invented-code/source-review",
      `${metrics.manualReviewLocked} locked, manualReviewReady ${metrics.manualReviewReady}`,
    ),
    task(
      "QD-008",
      "P2",
      "להוריד backlog real-open מתחת 80 באמצעות owner/evidence/defer",
      4,
      Number(metrics.backlogRealOpen) < 80,
      "BRUTAL_MASTER_PLAN_AUDIT real-open < 80",
      `${metrics.backlogRealOpen} real-open`,
    ),
    task(
      "QD-009",
      "P3",
      "לנקות status drift במסמכי legacy",
      3,
      Number(metrics.backlogActiveNotDone) < 150 && Number(metrics.backlogActivePartial) < 5,
      "active NOT DONE < 150 and active PARTIAL < 5",
      `${metrics.backlogActiveNotDone} active NOT DONE, ${metrics.backlogActivePartial} active PARTIAL; raw ${metrics.backlogNotDone}/${metrics.backlogPartial}`,
    ),
  ];

  const closed = tasks.filter((item) => item.done);
  const totalHours = tasks.reduce((sum, item) => sum + item.estimatedHours, 0);
  const closedHours = closed.reduce((sum, item) => sum + item.estimatedHours, 0);
  const remainingHours = totalHours - closedHours;

  return {
    reportVersion: "quality-debt-progress-v1",
    generatedAt,
    ready: tasks.every((item) => item.done),
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
    metrics,
    tasks,
    sources: SOURCES,
  };
}

function writeReport(report) {
  fs.writeFileSync(OUT_JSON, `${JSON.stringify(report, null, 2)}\n`);
  const taskRows = report.tasks.map((item) =>
    `| ${item.id} | ${item.done ? "[x]" : "[ ]"} | ${item.priority} | ${item.title} | ${hoursLabel(item.estimatedHours)} | ${item.status} | ${item.current} | ${item.gate} |`,
  ).join("\n");
  const board = [
    "# לוח המשך - חוב איכות Exam100",
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
    `| Portal gates | \`${report.metrics.portalGates}\` |`,
    `| Weekly regressions | \`${report.metrics.weeklyRegressions}\` |`,
    `| Question notes | \`${report.metrics.questionNotes}\` |`,
    `| Question advisory | \`${report.metrics.questionAdvisory}\` |`,
    `| Question deferred | \`${report.metrics.questionDeferred}\` |`,
    `| Distractor actionable | \`${report.metrics.distractorActionablePct}%\` |`,
    `| Distractor raw | \`${report.metrics.distractorRawPct}%\` |`,
    `| Distractor deferred | \`${report.metrics.distractorDeferred}\` |`,
    `| Manual review locked | \`${report.metrics.manualReviewLocked}\` |`,
    `| Backlog real-open | \`${report.metrics.backlogRealOpen}\` |`,
    `| Backlog active status drift | \`${report.metrics.backlogActiveNotDone} NOT DONE, ${report.metrics.backlogActivePartial} PARTIAL\` |`,
    "",
    "## משימות",
    "",
    "| ID | סטטוס | עדיפות | משימה | זמן | תוצאה | מצב נוכחי | Gate |",
    "| --- | --- | --- | --- | ---: | --- | --- | --- |",
    taskRows,
    "",
  ].join("\n");
  fs.writeFileSync(OUT_BOARD, board);
  fs.writeFileSync(OUT_MD, board);
}

function main(argv = process.argv.slice(2)) {
  const args = new Set(argv);
  const report = buildReport();
  if (args.has("--write")) writeReport(report);
  if (args.has("--summary")) {
    console.log(JSON.stringify({
      ready: report.ready,
      closedTasks: `${report.summary.closedTasks}/${report.summary.totalTasks}`,
      taskPercent: report.summary.taskPercent,
      timePercent: report.summary.timePercent,
      remainingTime: report.summary.remainingLabel,
      gates: report.metrics.portalGates,
      regressions: report.metrics.weeklyRegressions,
    }, null, 2));
  }
  if (args.has("--strict") && report.summary.closedTasks < 2) {
    process.exitCode = 1;
  }
  return report;
}

if (require.main === module) {
  main();
}

module.exports = { buildReport, hoursLabel, parseSources: () => SOURCES, pct };
