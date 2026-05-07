#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const OUT_JSON = path.join(ROOT, "EXAM_TASK_BOARD_REPORT.json");
const OUT_MD = path.join(ROOT, "EXAM_TASK_BOARD_REPORT.md");
const STORAGE_KEY = "lumenportal:homeworkExamPlanProgress:v1";
const EXPECTED_REQUIRED_MINUTES = 6485;
const args = new Set(process.argv.slice(2));
const strict = args.has("--strict");
const summary = args.has("--summary");
const FORBIDDEN_NATIVE_RANDOM_TOKEN = ["Math", "random"].join(".");

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function runDataScript(context, relativePath) {
  vm.runInContext(read(relativePath), context, { filename: relativePath });
}

function loadMode() {
  const context = {
    console: { log() {}, warn() {}, error() {} },
  };
  context.window = context;
  vm.createContext(context);
  runDataScript(context, "data/exam_tasks_tree.js");
  runDataScript(context, "data/homework_exam_mode.js");
  return context.HOMEWORK_EXAM_MODE;
}

function minutesText(minutes) {
  const total = Math.max(0, Math.round(Number(minutes || 0)));
  const hours = Math.floor(total / 60);
  const rest = total % 60;
  if (!hours) return `${rest} דק׳`;
  if (!rest) return `${hours} שעות`;
  return `${hours} שעות ${rest} דק׳`;
}

function progressIdForWeekTask(task, counters) {
  const match = String(task.day || "").match(/\d+/);
  const dayKey = match ? match[0] : "0";
  counters[dayKey] = (counters[dayKey] || 0) + 1;
  return `day-${dayKey}-task-${counters[dayKey]}`;
}

function uniqueIds(rows) {
  const seen = new Set();
  const duplicates = [];
  rows.forEach((row) => {
    if (seen.has(row.id)) duplicates.push(row.id);
    seen.add(row.id);
  });
  return { unique: seen.size, duplicates };
}

function sumMinutes(rows) {
  return rows.reduce((sum, row) => sum + Number(row.estimatedMinutes || 0), 0);
}

function buildRows(mode) {
  const plan = mode.masterPlan.remainingTimePlan;
  const tree = mode.examTaskTree || {};
  const diagnosticRows = (plan.diagnosticTasks || []).map((task, index) => ({
    id: `diagnostic-time-${index}`,
    title: task.title || "unknown/unavailable",
    kind: "diagnostic",
    source: "remainingTimePlan.diagnosticTasks",
    estimatedMinutes: Number(task.minutes || 0),
    required: true,
    status: "open",
    updatedAt: "unknown/unavailable",
  }));
  const counters = {};
  const weekRows = (plan.weekTasks || [])
    .filter((task) => !String(task.id || "").includes("watch-videos"))
    .map((task) => ({
      id: progressIdForWeekTask(task, counters),
      title: task.title || "unknown/unavailable",
      kind: "site-tree",
      source: "remainingTimePlan.weekTasks",
      estimatedMinutes: Number(task.minutes || 0),
      required: true,
      status: "open",
      updatedAt: "unknown/unavailable",
    }));
  const examSectionRows = (tree.sectionExercises || []).map((exercise, index) => {
    const status = exercise.status === "manual_review" || exercise.autoScorable === false ? "locked" : "open";
    return {
      id: `exam-section-${exercise.id || `section-${index + 1}`}`,
      title: `סעיף ${exercise.idx || index + 1} - ${exercise.sourceFile || "unknown/unavailable"}`,
      kind: "exam-section",
      source: exercise.sourceFile || "unknown/unavailable",
      estimatedMinutes: 0,
      required: true,
      status,
      updatedAt: "unknown/unavailable",
      autoScorable: status !== "locked",
    };
  });
  const videoRows = (((plan.mediaAssetPlan || {}).videos) || []).map((task) => ({
    id: task.id || "unknown/unavailable",
    title: task.name || "unknown/unavailable",
    kind: "video",
    source: task.folder || "mediaAssetPlan.videos",
    estimatedMinutes: Number(task.minutes || plan.videoWatchMinutesEach || 30),
    required: true,
    status: "open",
    updatedAt: "unknown/unavailable",
  }));
  const presentationImageRows = (((plan.mediaAssetPlan || {}).presentationImages) || []).map((task) => ({
    id: task.id || "unknown/unavailable",
    title: task.name || "unknown/unavailable",
    kind: "presentation-image",
    source: task.folder || "mediaAssetPlan.presentationImages",
    estimatedMinutes: Number(task.minutes || plan.presentationImageMinutesEach || 20),
    required: true,
    status: "open",
    updatedAt: "unknown/unavailable",
  }));
  const optionalRows = (plan.optionalBacklog || []).map((task) => ({
    id: `optional-time-${task.id || "task"}`,
    title: task.title || "unknown/unavailable",
    kind: "optional-backlog",
    source: "remainingTimePlan.optionalBacklog",
    estimatedMinutes: Number(task.minutes || 0),
    required: false,
    status: Number(task.completionPercent || 0) >= 100 ? "done" : "open",
    updatedAt: "unknown/unavailable",
  }));
  return {
    diagnosticRows,
    weekRows,
    examSectionRows,
    videoRows,
    presentationImageRows,
    optionalRows,
    allRows: diagnosticRows.concat(weekRows, examSectionRows, videoRows, presentationImageRows, optionalRows),
  };
}

function buildReport() {
  const mode = loadMode();
  const plan = mode.masterPlan.remainingTimePlan;
  const rows = buildRows(mode);
  const failures = [];
  const warnings = [];
  const idAudit = uniqueIds(rows.allRows);
  const requiredTimedRows = rows.diagnosticRows
    .concat(rows.weekRows, rows.videoRows, rows.presentationImageRows);
  const requiredMinutes = sumMinutes(requiredTimedRows);
  const optionalMinutes = sumMinutes(rows.optionalRows);
  const manualReviewRows = rows.examSectionRows.filter((row) => row.status === "locked");

  if (rows.diagnosticRows.length !== 7) failures.push(`Expected 7 diagnostic tasks, got ${rows.diagnosticRows.length}.`);
  if (rows.weekRows.length !== 33) failures.push(`Expected 33 site/tree tasks, got ${rows.weekRows.length}.`);
  if (rows.examSectionRows.length !== 73) failures.push(`Expected 73 exam section tasks, got ${rows.examSectionRows.length}.`);
  if (manualReviewRows.length !== 4) failures.push(`Expected 4 manual_review locked sections, got ${manualReviewRows.length}.`);
  if (rows.videoRows.length !== 114) failures.push(`Expected 114 video tasks, got ${rows.videoRows.length}.`);
  if (rows.presentationImageRows.length !== 40) failures.push(`Expected 40 presentation/image tasks, got ${rows.presentationImageRows.length}.`);
  if (rows.optionalRows.length !== 4) failures.push(`Expected 4 optional backlog tasks, got ${rows.optionalRows.length}.`);
  if (requiredMinutes !== EXPECTED_REQUIRED_MINUTES) failures.push(`Expected required timed sum ${EXPECTED_REQUIRED_MINUTES}, got ${requiredMinutes}.`);
  if (Number(plan.requiredMinutes || 0) !== EXPECTED_REQUIRED_MINUTES) failures.push(`remainingTimePlan.requiredMinutes must be ${EXPECTED_REQUIRED_MINUTES}, got ${plan.requiredMinutes}.`);
  if (Number(plan.optionalBacklogMinutes || 0) !== optionalMinutes) failures.push(`optionalBacklogMinutes mismatch: source=${plan.optionalBacklogMinutes}, rows=${optionalMinutes}.`);
  if (idAudit.duplicates.length) failures.push(`Task ids are not unique: ${idAudit.duplicates.slice(0, 8).join(", ")}.`);
  if (read("src/views/homework-exam-mode-view.js").includes(FORBIDDEN_NATIVE_RANDOM_TOKEN)) failures.push("Forbidden native random token appears in homework exam view.");
  if (String(plan.requiredLabel || "") !== "108 שעות 5 דק׳") warnings.push(`Expected label 108 שעות 5 דק׳, got ${plan.requiredLabel || "unknown/unavailable"}.`);

  const report = {
    reportVersion: "exam-task-board-v1",
    ready: failures.length === 0,
    storageKey: STORAGE_KEY,
    sourceModel: "remainingTimePlan + exam_tasks_tree.sectionExercises + mediaAssetPlan",
    totals: {
      diagnosticTasks: rows.diagnosticRows.length,
      siteTreeTasks: rows.weekRows.length,
      examSectionTasks: rows.examSectionRows.length,
      manualReviewLocked: manualReviewRows.length,
      videos: rows.videoRows.length,
      presentationImages: rows.presentationImageRows.length,
      optionalBacklog: rows.optionalRows.length,
      requiredMinutes,
      requiredLabel: minutesText(requiredMinutes),
      optionalMinutes,
      uniqueTaskIds: idAudit.unique,
      totalRows: rows.allRows.length,
    },
    rows: rows.allRows,
    failures,
    warnings,
  };
  return report;
}

function writeReports(report) {
  fs.writeFileSync(OUT_JSON, `${JSON.stringify(report, null, 2)}\n`);
  const md = [
    "# Exam Task Board Report",
    "",
    `- ready: ${report.ready}`,
    `- storageKey: \`${report.storageKey}\``,
    `- sourceModel: ${report.sourceModel}`,
    `- required: ${report.totals.requiredMinutes} minutes (${report.totals.requiredLabel})`,
    `- diagnostics: ${report.totals.diagnosticTasks}`,
    `- site/tree: ${report.totals.siteTreeTasks}`,
    `- exam sections: ${report.totals.examSectionTasks} (${report.totals.manualReviewLocked} manual_review locked)`,
    `- videos: ${report.totals.videos}`,
    `- presentation/images: ${report.totals.presentationImages}`,
    `- optional backlog: ${report.totals.optionalBacklog}`,
    `- unique ids: ${report.totals.uniqueTaskIds}/${report.totals.totalRows}`,
    "",
    "## Failures",
    report.failures.length ? report.failures.map((item) => `- ${item}`).join("\n") : "- none",
    "",
    "## Warnings",
    report.warnings.length ? report.warnings.map((item) => `- ${item}`).join("\n") : "- none",
    "",
  ].join("\n");
  fs.writeFileSync(OUT_MD, `${md}\n`);
}

if (require.main === module) {
  const report = buildReport();
  writeReports(report);

  if (summary) {
    console.log(JSON.stringify({
      ready: report.ready,
      storageKey: report.storageKey,
      totals: report.totals,
      failures: report.failures.length,
      warnings: report.warnings.length,
    }, null, 2));
  } else {
    console.log(JSON.stringify(report, null, 2));
  }

  if (strict && !report.ready) {
    process.exitCode = 1;
  }
}

module.exports = { buildReport, writeReports };
