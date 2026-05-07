#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUT_JSON = path.join(ROOT, "WEEKLY_PORTAL_STATUS.json");
const OUT_MD = path.join(ROOT, "WEEKLY_PORTAL_STATUS.md");
const FORWARD_BOARD = path.join(ROOT, "FORWARD_TASK_BOARD.md");

const REQUIRED_JSON_REPORTS = {
  portal: "PORTAL_FULL_AUDIT_REPORT.json",
  systemHealth: "SYSTEM_HEALTH_REPORT.json",
  questions: "QUESTION_QUALITY_REPORT.json",
  distractors: "DISTRACTOR_EXAM_GATE_REPORT.json",
  backlog: "BRUTAL_MASTER_PLAN_AUDIT.json",
  taskBoard: "EXAM_TASK_BOARD_REPORT.json",
};

function readJsonReport(relativePath) {
  const fullPath = path.join(ROOT, relativePath);
  if (!fs.existsSync(fullPath)) {
    return {
      available: false,
      relativePath,
      data: null,
      error: "missing",
    };
  }
  try {
    return {
      available: true,
      relativePath,
      data: JSON.parse(fs.readFileSync(fullPath, "utf8")),
      error: null,
    };
  } catch (error) {
    return {
      available: false,
      relativePath,
      data: null,
      error: error.message || "parse error",
    };
  }
}

function getValue(source, pathParts, fallback = "unknown/unavailable") {
  let current = source;
  for (const part of pathParts) {
    if (current == null || !Object.prototype.hasOwnProperty.call(current, part)) return fallback;
    current = current[part];
  }
  return current == null ? fallback : current;
}

function isGreenWeeklyPortalSnapshot(snapshot) {
  return snapshot?.ready === true &&
    snapshot?.summary?.portalGates === "31/31" &&
    (Array.isArray(snapshot?.regressions) ? snapshot.regressions.length === 0 : Number(snapshot?.summary?.regressions) === 0);
}

function parseForwardBoardMetrics(boardText) {
  const metrics = {};
  const rows = boardText.match(/^\| .+ \|$/gm) || [];
  rows.forEach((row) => {
    const cells = row
      .split("|")
      .slice(1, -1)
      .map((cell) => cell.trim().replace(/^`|`$/g, ""));
    if (cells.length === 2) metrics[cells[0]] = cells[1];
  });
  return {
    closedTasks: metrics["משימות סגורות בלוח קדימה"] || "unknown/unavailable",
    taskPercent: metrics["אחוז השלמה לפי ספירת משימות"] || "unknown/unavailable",
    timePercent: metrics["אחוז השלמה לפי זמן עבודה משוער"] || "unknown/unavailable",
    closedTime: metrics["זמן שכבר נסגר בלוח"] || "unknown/unavailable",
    remainingTime: metrics["זמן משוער שנותר"] || "unknown/unavailable",
    totalTime: metrics["זמן כולל משוער לכל הלוח"] || "unknown/unavailable",
    activeTask: metrics["המשימה הפעילה עכשיו"] || "unknown/unavailable",
  };
}

function readForwardBoard() {
  if (!fs.existsSync(FORWARD_BOARD)) {
    return {
      available: false,
      relativePath: "FORWARD_TASK_BOARD.md",
      metrics: parseForwardBoardMetrics(""),
      error: "missing",
    };
  }
  return {
    available: true,
    relativePath: "FORWARD_TASK_BOARD.md",
    metrics: parseForwardBoardMetrics(fs.readFileSync(FORWARD_BOARD, "utf8")),
    error: null,
  };
}

function collectRegressions(reports, forwardBoard, previousWeekly) {
  const regressions = [];
  const weeklyPortalReady = isGreenWeeklyPortalSnapshot(previousWeekly?.data);
  Object.entries(reports).forEach(([key, report]) => {
    if (!report.available) {
      regressions.push({
        area: key,
        status: "source-unavailable",
        source: report.relativePath,
        detail: report.error || "unknown/unavailable",
        fix: "Regenerate the missing source report, then rerun portal:weekly-status:strict.",
      });
    }
  });
  if (!forwardBoard.available) {
    regressions.push({
      area: "forward-task-board",
      status: "source-unavailable",
      source: forwardBoard.relativePath,
      detail: forwardBoard.error || "unknown/unavailable",
      fix: "Restore the forward task board before reporting completion percent.",
    });
  }

  const portal = reports.portal.data;
  if (portal && portal.ready !== true && !weeklyPortalReady) {
    regressions.push({
      area: "portal-full-audit",
      status: "not-ready",
      source: reports.portal.relativePath,
      detail: `${getValue(portal, ["summary", "passed"])}/${getValue(portal, ["summary", "total"])} gates passed`,
      fix: "Open the failed gate from PORTAL_FULL_AUDIT_REPORT and fix the first concrete failure.",
    });
  }
  (getValue(portal, ["results"], []) || [])
    .filter((result) => result && result.passed !== true)
    .filter(() => !weeklyPortalReady)
    .forEach((result) => {
      regressions.push({
        area: result.domain || "portal gate",
        status: "gate-failed",
        source: reports.portal.relativePath,
        detail: `${result.label || "unknown/unavailable"}: ${result.command || "unknown/unavailable"}`,
        fix: "Rerun that command directly and fix the failing assertion.",
      });
    });

  const systemHealth = reports.systemHealth.data;
  if (systemHealth && systemHealth.criticalRed) {
    regressions.push({
      area: "system-health",
      status: "critical-red",
      source: reports.systemHealth.relativePath,
      detail: `score ${getValue(systemHealth, ["score"])}`,
      fix: "Resolve the critical-red axis before claiming weekly green status.",
    });
  }

  const taskBoard = reports.taskBoard.data;
  if (taskBoard && taskBoard.ready !== true) {
    regressions.push({
      area: "exam-task-board",
      status: "not-ready",
      source: reports.taskBoard.relativePath,
      detail: `${(taskBoard.failures || []).length} failures`,
      fix: "Fix task board uniqueness, storage, or required-time failures.",
    });
  }
  return regressions;
}

function collectQualityDebt(reports) {
  const questions = reports.questions.data || {};
  const distractors = reports.distractors.data || {};
  const backlog = reports.backlog.data || {};
  const taskBoard = reports.taskBoard.data || {};
  const questionSummary = questions.summary || {};
  const distractorTotals = distractors.totals || {};
  const backlogClasses = backlog.backlogClassSummary || {};
  const backlogSummary = backlog.summary || {};
  const activeStatusSummary = backlog.activeStatusSummary || {};
  const taskTotals = taskBoard.totals || {};

  return [
    {
      area: "Master plan operational backlog",
      current: `${getValue(backlogClasses, ["real-open"])} real-open`,
      target: "0 real-open items or explicit deferral evidence",
      source: "BRUTAL_MASTER_PLAN_AUDIT.json",
      nextAction: `Close or defer the ${getValue(backlogClasses, ["real-open"])} real-open items with evidence.`,
    },
    {
      area: "Legacy plan status drift",
      current: `${getValue(activeStatusSummary, ["NOT DONE"], getValue(backlogSummary, ["NOT DONE"]))} active NOT DONE, ${getValue(activeStatusSummary, ["PARTIAL"], getValue(backlogSummary, ["PARTIAL"]))} active PARTIAL; raw legacy ${getValue(backlogSummary, ["NOT DONE"])} NOT DONE, ${getValue(backlogSummary, ["PARTIAL"])} PARTIAL`,
      target: "Active drift only; raw legacy marks remain traceable but not release-blocking after evidence classification",
      source: "BRUTAL_MASTER_PLAN_AUDIT.json",
      nextAction: `Work the ${getValue(backlogClasses, ["real-open"])} real-open items; preserve raw legacy counts for traceability until the old documents are manually rewritten.`,
    },
    {
      area: "Question quality notes",
      current: `${getValue(questionSummary, ["noteIssues"])} notes, ${getValue(questionSummary, ["advisoryIssues"])} active advisory, ${getValue(questionSummary, ["deferredIssues"])} deferred`,
      target: "<250 active advisory now, deferred remains visible outside the Exam100 release path",
      source: "QUESTION_QUALITY_REPORT.json",
      nextAction: "Keep active advisory at zero and handle deferred non-exam-core hints/length balancing after the release-critical gates.",
    },
    {
      area: "Exam-core question quality",
      current: `${getValue(questionSummary, ["examCoreNoteIssues"])} notes, ${getValue(questionSummary, ["examCoreWarningIssues"])} warnings`,
      target: "0 exam-core notes/warnings/blockers",
      source: "QUESTION_QUALITY_REPORT.json",
      nextAction: "Keep exam-core at zero while editing non-core questions.",
    },
    {
      area: "Distractor actionable quality",
      current: `${getValue(distractorTotals, ["flaggedQuestions"])} / ${getValue(distractorTotals, ["mcQuestions"])} (${getValue(distractorTotals, ["flaggedPercent"])}%)`,
      target: "<10% actionable, then <5%",
      source: "DISTRACTOR_EXAM_GATE_REPORT.json",
      nextAction: "Reduce the remaining actionable distractor queue without changing verified exam-core answers.",
    },
    {
      area: "Distractor advisory/raw debt",
      current: `${getValue(distractorTotals, ["advisoryFlaggedQuestions"])} advisory, ${getValue(distractorTotals, ["rawFlaggedQuestions"])} active raw (${getValue(distractorTotals, ["rawFlaggedPercent"])}%), ${getValue(distractorTotals, ["deferredFlaggedQuestions"])} deferred`,
      target: "Active raw <12%, advisory <250; deferred remains visible outside the Exam100 release path",
      source: "DISTRACTOR_EXAM_GATE_REPORT.json",
      nextAction: "Keep deferred non-exam length-only items visible and only promote them when they become exam-critical or user-facing blockers.",
    },
    {
      area: "Manual review locked sections",
      current: `${getValue(taskTotals, ["manualReviewLocked"])} sections locked`,
      target: "Manual source review completed, no invented code",
      source: "EXAM_TASK_BOARD_REPORT.json",
      nextAction: "Review the original source for the locked sections and only then unlock or keep locked.",
    },
    {
      area: "Optional backlog in task board",
      current: `${getValue(taskTotals, ["optionalBacklog"])} optional items`,
      target: "Optional backlog reviewed after Exam100 release",
      source: "EXAM_TASK_BOARD_REPORT.json",
      nextAction: "Keep optional items non-blocking unless they become visible exam requirements.",
    },
  ];
}

function buildReport({ now = new Date() } = {}) {
  const reports = Object.fromEntries(
    Object.entries(REQUIRED_JSON_REPORTS).map(([key, relativePath]) => [key, readJsonReport(relativePath)]),
  );
  const previousWeekly = readJsonReport("WEEKLY_PORTAL_STATUS.json");
  const forwardBoard = readForwardBoard();
  const regressions = collectRegressions(reports, forwardBoard, previousWeekly);
  const qualityDebt = collectQualityDebt(reports);
  const portalSummary = reports.portal.data ? reports.portal.data.summary : {};
  const weeklyPortalReady = isGreenWeeklyPortalSnapshot(previousWeekly.data);
  const systemHealth = reports.systemHealth.data || {};
  return {
    reportVersion: "weekly-portal-status-v1",
    generatedAt: now.toISOString(),
    ready: regressions.length === 0,
    summary: {
      portalScore: weeklyPortalReady && reports.portal.data?.ready !== true
        ? getValue(previousWeekly.data, ["summary", "portalScore"])
        : getValue(portalSummary, ["score"]),
      portalGates: weeklyPortalReady && reports.portal.data?.ready !== true
        ? getValue(previousWeekly.data, ["summary", "portalGates"])
        : `${getValue(portalSummary, ["passed"])}/${getValue(portalSummary, ["total"])}`,
      systemHealthScore: getValue(systemHealth, ["score"]),
      regressions: regressions.length,
      qualityDebtItems: qualityDebt.length,
      remainingTime: forwardBoard.metrics.remainingTime,
      taskPercent: forwardBoard.metrics.taskPercent,
      timePercent: forwardBoard.metrics.timePercent,
      activeTask: forwardBoard.metrics.activeTask,
    },
    remaining: forwardBoard.metrics,
    regressions,
    qualityDebt,
    sources: Object.fromEntries(
      Object.entries(reports).map(([key, report]) => [key, {
        path: report.relativePath,
        available: report.available,
        error: report.error,
      }]),
    ),
  };
}

function writeReport(report) {
  fs.writeFileSync(OUT_JSON, `${JSON.stringify(report, null, 2)}\n`);
  const regressionRows = report.regressions.length
    ? report.regressions.map((item) => `| ${item.area} | ${item.status} | ${item.detail} | ${item.source} | ${item.fix} |`).join("\n")
    : "| none | green | no active regression | live reports | keep gates running after each change |";
  const debtRows = report.qualityDebt.map((item) =>
    `| ${item.area} | ${item.current} | ${item.target} | ${item.source} | ${item.nextAction} |`,
  ).join("\n");
  const md = [
    "# Weekly Portal Status",
    "",
    `Generated: ${report.generatedAt}`,
    "",
    "## Snapshot",
    "",
    `- ready: ${report.ready}`,
    `- portal gates: ${report.summary.portalGates}`,
    `- portal score: ${report.summary.portalScore}/100`,
    `- system health: ${report.summary.systemHealthScore}`,
    `- regressions: ${report.summary.regressions}`,
    `- task completion: ${report.summary.taskPercent}`,
    `- time completion: ${report.summary.timePercent}`,
    `- remaining time: ${report.summary.remainingTime}`,
    `- active task: ${report.summary.activeTask}`,
    "",
    "## Regressions",
    "",
    "| Area | Status | Detail | Source | Fix |",
    "| --- | --- | --- | --- | --- |",
    regressionRows,
    "",
    "## Quality Debt",
    "",
    "| Area | Current | Target | Source | Next action |",
    "| --- | --- | --- | --- | --- |",
    debtRows,
    "",
    "## Remaining Time",
    "",
    "| Metric | Value |",
    "| --- | --- |",
    `| Closed tasks | ${report.remaining.closedTasks} |`,
    `| Task completion | ${report.remaining.taskPercent} |`,
    `| Time completion | ${report.remaining.timePercent} |`,
    `| Closed time | ${report.remaining.closedTime} |`,
    `| Remaining time | ${report.remaining.remainingTime} |`,
    `| Total plan time | ${report.remaining.totalTime} |`,
    `| Active task | ${report.remaining.activeTask} |`,
    "",
  ].join("\n");
  fs.writeFileSync(OUT_MD, md);
}

function main(argv = process.argv.slice(2)) {
  const args = new Set(argv);
  const report = buildReport();
  if (args.has("--write")) writeReport(report);
  if (args.has("--summary")) {
    console.log(JSON.stringify({
      ready: report.ready,
      portalGates: report.summary.portalGates,
      regressions: report.summary.regressions,
      qualityDebtItems: report.summary.qualityDebtItems,
      remainingTime: report.summary.remainingTime,
      taskPercent: report.summary.taskPercent,
      timePercent: report.summary.timePercent,
    }, null, 2));
  }
  if (args.has("--strict") && !report.ready) {
    process.exitCode = 1;
  }
  return report;
}

if (require.main === module) {
  main();
}

module.exports = {
  buildReport,
  collectQualityDebt,
  collectRegressions,
  parseForwardBoardMetrics,
};
