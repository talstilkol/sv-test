#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const tabMatrix = require("./report_svcollege_tab_matrix.js");

const ROOT = path.resolve(__dirname, "..");
const REPORT_VERSION = "svcollege-critical-flows-v1";
const REPORT_DATE = new Date().toISOString().slice(0, 10);

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

const FLOW_DEFINITIONS = Object.freeze([
  Object.freeze({
    id: "trainer",
    label: "Knowledge Trainer",
    tabCell: "trainer",
    dom: Object.freeze(["id=\"trainer-view\"", "id=\"open-trainer\"", "id=\"trainer-quiz-card\""]),
    app: Object.freeze(["function openTrainer()", "function renderTrainerCard()", "function setTrainerContextTree()"]),
    interactions: Object.freeze(["onAnswer(parseInt(btn.dataset.i, 10))", "onFillAnswer(input.value)", "wireQuestionPrerequisiteNavigation(card)"]),
  }),
  Object.freeze({
    id: "studyMode",
    label: "Study Mode",
    tabCell: "studyMode",
    dom: Object.freeze(["id=\"study-mode-view\"", "id=\"open-study-mode\"", "id=\"study-card-container\""]),
    app: Object.freeze(["function openStudyMode()", "function startStudySession()", "function renderStudyCard()", "function setStudyContextTree()"]),
    interactions: Object.freeze(["id=\"study-mastered\"", "id=\"study-still-weak\"", "id=\"study-open-lesson\""]),
  }),
  Object.freeze({
    id: "mockExam",
    label: "Mock Exam",
    tabCell: "mockExam",
    dom: Object.freeze(["id=\"mock-exam-view\"", "id=\"open-mock-exam\"", "id=\"mx-question\""]),
    app: Object.freeze(["function openMockExam()", "function composeMockExam(template)", "function setMockExamContextTree()"]),
    interactions: Object.freeze(["mxState.answers[qid]", "renderQuestionPrereqPanel({", "recordLearningEvidence(\"exam_attempt\""]),
  }),
  Object.freeze({
    id: "bugHunt",
    label: "Bug Hunt",
    tabCell: "bugHunt",
    dom: Object.freeze(["data-action=\"bug-answer\"", "class=\"bug-hunt-panel\""]),
    app: Object.freeze(["function renderBugHuntPanel(lesson, concept)", "data-action=\"bug-answer\"", "maybeRecordCodeProof"]),
    interactions: Object.freeze(["data-bug-result", "bug-option", "actualKind: \"bug\"", "mode: \"bug-hunt\""]),
  }),
  Object.freeze({
    id: "miniBuild",
    label: "Mini Build",
    tabCell: "miniBuild",
    dom: Object.freeze(["data-action=\"mb-check\"", "class=\"mini-build-panel\""]),
    app: Object.freeze(["function renderMiniBuildPanel(lesson, concept)", "data-action=\"mb-check\"", "maybeRecordCodeProof"]),
    interactions: Object.freeze(["data-mb-tests", "data-mb-ref", "data-mb-hint", "actualKind: \"build\"", "mode: \"mini-build\""]),
  }),
  Object.freeze({
    id: "codeTrace",
    label: "Code Trace",
    tabCell: "codeTrace",
    dom: Object.freeze(["id=\"trace-view\"", "id=\"open-trace\"", "id=\"trace-player\""]),
    app: Object.freeze(["function openTracePage()", "function renderTraceQuestion", "function setTraceContextTree()"]),
    interactions: Object.freeze(["id=\"trace-submit\"", "id=\"trace-hint\"", "finalizeTraceQuestion(concept)"]),
  }),
]);

function missingSnippets(text, snippets) {
  return snippets.filter((snippet) => !text.includes(snippet));
}

function flowCoverageFromTabMatrix(flow, report) {
  const modules = report.modules || [];
  const missingModules = modules
    .filter((module) => {
      const cell = (module.cells || []).find((item) => item.id === flow.tabCell);
      return !cell || cell.passed !== true;
    })
    .map((module) => module.title);
  return {
    totalModules: modules.length,
    passedModules: modules.length - missingModules.length,
    missingModules,
  };
}

function buildReport() {
  const app = read("app.js");
  const html = read("index.html");
  const combined = `${html}\n${app}`;
  const tabReport = tabMatrix.buildReport();
  const flows = FLOW_DEFINITIONS.map((flow) => {
    const missingDom = missingSnippets(combined, flow.dom);
    const missingApp = missingSnippets(app, flow.app);
    const missingInteractions = missingSnippets(combined, flow.interactions);
    const coverage = flowCoverageFromTabMatrix(flow, tabReport);
    const failures = [
      ...missingDom.map((snippet) => `missing DOM: ${snippet}`),
      ...missingApp.map((snippet) => `missing app wiring: ${snippet}`),
      ...missingInteractions.map((snippet) => `missing interaction: ${snippet}`),
      ...coverage.missingModules.map((moduleTitle) => `module tab gap: ${moduleTitle}`),
    ];
    return {
      id: flow.id,
      label: flow.label,
      tabCell: flow.tabCell,
      status: failures.length ? "fail" : "pass",
      passed: failures.length === 0,
      coverage,
      failures,
    };
  });
  const passed = flows.filter((flow) => flow.passed).length;
  return {
    reportVersion: REPORT_VERSION,
    date: REPORT_DATE,
    target: "SVCollege AI & Full Stack critical practice flows",
    summary: {
      flows: flows.length,
      passed,
      failed: flows.length - passed,
      modules: tabReport.summary.modules,
      ready: passed === flows.length,
    },
    flows,
  };
}

function toMarkdown(report) {
  return [
    "# SVCollege Critical Practice Flow Smoke",
    "",
    `- Date: ${report.date}`,
    `- Target: ${report.target}`,
    `- Flows: ${report.summary.passed}/${report.summary.flows}`,
    `- Ready: ${report.summary.ready ? "Yes" : "No"}`,
    "",
    "| Flow | Status | Module coverage | Failures |",
    "|---|---|---:|---|",
    ...report.flows.map((flow) =>
      `| ${flow.label} | ${flow.status} | ${flow.coverage.passedModules}/${flow.coverage.totalModules} | ${flow.failures.join("<br>") || "none"} |`,
    ),
    "",
  ].join("\n");
}

function run(argv = process.argv.slice(2)) {
  const report = buildReport();
  if (argv.includes("--json")) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  } else if (argv.includes("--summary")) {
    process.stdout.write(`${JSON.stringify(report.summary, null, 2)}\n`);
  } else {
    process.stdout.write(`${toMarkdown(report)}\n`);
  }
  if (argv.includes("--strict") && !report.summary.ready) process.exitCode = 1;
  return report;
}

if (require.main === module) run();

module.exports = {
  FLOW_DEFINITIONS,
  buildReport,
  run,
  toMarkdown,
};
