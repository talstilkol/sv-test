#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const tabMatrix = require("./report_svcollege_tab_matrix.js");

const ROOT = path.resolve(__dirname, "..");
const REPORT_VERSION = "svcollege-context-tree-smoke-v1";
const REPORT_DATE = new Date().toISOString().slice(0, 10);

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

const TREE_SHELL_SNIPPETS = Object.freeze([
  'id="context-tree-panel"',
  'id="context-tree-title"',
  'id="context-tree-count"',
  'id="context-tree-search"',
  'id="context-tree-body"',
  "function setContextTree(title, sections, options = {})",
  "function renderContextTree()",
  "function filterContextNodes(nodes, query)",
  "function countContextLeaves(nodes)",
  "data-ctx-action",
  'contextTreeSearch?.addEventListener("input"',
]);

const TREE_TARGETS = Object.freeze([
  Object.freeze({ id: "home", label: "Home / Lessons", button: "open-home", openFunction: null, contextFunction: "setHomeContextTree", required: Object.freeze(["groupedLessonNodes()", "טאבים ראשיים"]) }),
  Object.freeze({ id: "lessonTree", label: "Lesson concept tree", button: null, openFunction: "openLesson", contextFunction: "setLessonContextTree", required: Object.freeze(["lessonConceptTreeNodes", "conceptLeafNode"]) }),
  Object.freeze({ id: "knowledgeMap", label: "Knowledge Map", button: "open-knowledge-map", openFunction: "openKnowledgeMap", contextFunction: "setKnowledgeMapContextTree", required: Object.freeze(["setKnowledgeMapContextTree();"]) }),
  Object.freeze({ id: "gapMatrix", label: "Gap Matrix", button: "open-gap-matrix", openFunction: "openGapMatrix", contextFunction: "setGapMatrixContextTree", required: Object.freeze(["gap-filters", "setGapMatrixContextTree();"]) }),
  Object.freeze({ id: "studyMode", label: "Study Mode", button: "open-study-mode", openFunction: "openStudyMode", contextFunction: "setStudyContextTree", required: Object.freeze(["study-queue", "renderStudyCard()"]) }),
  Object.freeze({ id: "trainer", label: "Knowledge Trainer", button: "open-trainer", openFunction: "openTrainer", contextFunction: "setTrainerContextTree", required: Object.freeze(["trainer-mode", "weak-first"]) }),
  Object.freeze({ id: "conceptSprint", label: "Concept Sprint", button: "open-concept-sprint", openFunction: "openConceptSprint", contextFunction: "setConceptSprintContextTree", required: Object.freeze(["setConceptSprintContextTree();"]) }),
  Object.freeze({ id: "flashcards", label: "Flashcards", button: "open-flashcards", openFunction: "openFlashcards", contextFunction: "setFlashcardsContextTree", required: Object.freeze(["fc-filters", "fc-queue"]) }),
  Object.freeze({ id: "mockExam", label: "Mock Exam", button: "open-mock-exam", openFunction: "openMockExam", contextFunction: "setMockExamContextTree", required: Object.freeze(["exam-templates", "exam-history"]) }),
  Object.freeze({ id: "codeTrace", label: "Code Trace", button: "open-trace", openFunction: "openTracePage", contextFunction: "setTraceContextTree", required: Object.freeze(["trace-lesson", "startTraceSession(trace)"]) }),
  Object.freeze({ id: "codeBlocks", label: "Code Blocks", button: "open-codeblocks", openFunction: "openCodeblocks", contextFunction: "setCodeblocksContextTree", required: Object.freeze(["cb-lesson", "cb-concept"]) }),
  Object.freeze({ id: "codeAnatomy", label: "Code Anatomy", button: "open-code-anatomy", openFunction: "openCodeAnatomy", contextFunction: "setCodeAnatomyContextTree", required: Object.freeze(["an-topic", "an-lesson"]) }),
  Object.freeze({ id: "blueprints", label: "SVCollege Alignment", button: "open-blueprints", openFunction: "openBlueprints", contextFunction: "setBlueprintsContextTree", required: Object.freeze(["setBlueprintsContextTree();"]) }),
  Object.freeze({ id: "learningEvidence", label: "Learning Evidence", button: "open-learning-evidence", openFunction: "openLearningEvidence", contextFunction: "setLearningEvidenceContextTree", required: Object.freeze(["setLearningEvidenceContextTree();"]) }),
  Object.freeze({ id: "capstones", label: "Capstones", button: "open-capstones", openFunction: "openCapstones", contextFunction: "setCapstonesContextTree", required: Object.freeze(["setCapstonesContextTree();"]) }),
  Object.freeze({ id: "guide", label: "Quick Guide", button: "open-guide", openFunction: "openGuide", contextFunction: "setGuideContextTree", required: Object.freeze(["setGuideContextTree();"]) }),
  Object.freeze({ id: "grandma", label: "Grandma Knowledge", button: "open-grandma-knowledge", openFunction: "openGrandmaKnowledge", contextFunction: "setGrandmaContextTree", required: Object.freeze(["setGrandmaContextTree(tree);"]) }),
  Object.freeze({ id: "basics", label: "Programming Basics", button: "open-programming-basics", openFunction: "openProgrammingBasics", contextFunction: "setProgrammingBasicsContextTree", required: Object.freeze(["setProgrammingBasicsContextTree();"]) }),
  Object.freeze({ id: "principles", label: "Programming Principles", button: "open-programming-principles", openFunction: "openProgrammingPrinciples", contextFunction: "setProgrammingPrinciplesContextTree", required: Object.freeze(["setProgrammingPrinciplesContextTree();"]) }),
  Object.freeze({ id: "languageTools", label: "Language Tools", button: "open-language-tools", openFunction: "openLanguageTools", contextFunction: "setLanguageToolsContextTree", required: Object.freeze(["setLanguageToolsContextTree();"]) }),
  Object.freeze({ id: "comparator", label: "Comparator", button: "open-comparator", openFunction: "openComparator", contextFunction: "setComparatorContextTree", required: Object.freeze(["setComparatorContextTree();"]) }),
]);

function missingSnippets(text, snippets) {
  return snippets.filter((snippet) => !text.includes(snippet));
}

function countOccurrences(text, snippet) {
  if (!snippet) return 0;
  return text.split(snippet).length - 1;
}

function targetReport(target, html, app) {
  const failures = [];
  if (target.button && !html.includes(`id="${target.button}"`)) {
    failures.push(`missing top-tab button: ${target.button}`);
  }
  if (target.openFunction && !app.includes(`function ${target.openFunction}`)) {
    failures.push(`missing open function: ${target.openFunction}`);
  }
  if (!app.includes(`function ${target.contextFunction}`)) {
    failures.push(`missing context tree function: ${target.contextFunction}`);
  }
  if (countOccurrences(app, `${target.contextFunction}(`) < 2 && target.id !== "lessonTree") {
    failures.push(`context tree is not called by flow: ${target.contextFunction}`);
  }
  missingSnippets(app, target.required || []).forEach((snippet) => {
    failures.push(`missing branch/submenu evidence: ${snippet}`);
  });
  return {
    id: target.id,
    label: target.label,
    button: target.button,
    contextFunction: target.contextFunction,
    status: failures.length ? "fail" : "pass",
    passed: failures.length === 0,
    failures,
  };
}

function buildReport() {
  const html = read("index.html");
  const app = read("app.js");
  const tabReport = tabMatrix.buildReport();
  const shellFailures = [
    ...missingSnippets(html, TREE_SHELL_SNIPPETS.filter((snippet) => snippet.startsWith('id="'))).map((snippet) => `missing shell: ${snippet}`),
    ...missingSnippets(app, TREE_SHELL_SNIPPETS.filter((snippet) => !snippet.startsWith('id="'))).map((snippet) => `missing renderer: ${snippet}`),
  ];
  const targets = TREE_TARGETS.map((target) => targetReport(target, html, app));
  const failedTargets = targets.filter((target) => !target.passed);
  const svcollegeModuleGaps = (tabReport.modules || [])
    .filter((module) => {
      const rightTree = (module.cells || []).find((cell) => cell.id === "rightTree");
      const lessons = (module.cells || []).find((cell) => cell.id === "lessons");
      return !rightTree?.passed || !lessons?.passed || (module.counts?.prereq || 0) <= 0;
    })
    .map((module) => module.title);
  const ready = shellFailures.length === 0 && failedTargets.length === 0 && svcollegeModuleGaps.length === 0;
  return {
    reportVersion: REPORT_VERSION,
    date: REPORT_DATE,
    target: "SVCollege right-side tree branches and submenus",
    summary: {
      targets: targets.length,
      passed: targets.length - failedTargets.length,
      failed: failedTargets.length,
      shellFailures: shellFailures.length,
      modules: tabReport.summary.modules,
      moduleGaps: svcollegeModuleGaps.length,
      ready,
    },
    shellFailures,
    targets,
    svcollegeModuleGaps,
  };
}

function toMarkdown(report) {
  return [
    "# SVCollege Context Tree Smoke",
    "",
    `- Date: ${report.date}`,
    `- Target: ${report.target}`,
    `- Targets: ${report.summary.passed}/${report.summary.targets}`,
    `- SVCollege module gaps: ${report.summary.moduleGaps}`,
    `- Ready: ${report.summary.ready ? "Yes" : "No"}`,
    "",
    "| Branch / submenu | Status | Evidence | Failures |",
    "|---|---|---|---|",
    ...report.targets.map((target) =>
      `| ${target.label} | ${target.status} | ${target.contextFunction} | ${target.failures.join("<br>") || "none"} |`,
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
  TREE_TARGETS,
  buildReport,
  run,
  toMarkdown,
};
