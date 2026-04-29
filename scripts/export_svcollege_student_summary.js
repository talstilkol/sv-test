#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const readiness = require("./report_svcollege_readiness.js");
const tabMatrix = require("./report_svcollege_tab_matrix.js");
const weakest = require("./report_exam_weakest_concepts.js");
const mockVariants = require("./report_mock_exam_variants.js");
const flows = require("./simulate_exam_learning_flows.js");

const ROOT = path.resolve(__dirname, "..");
const JSON_PATH = path.join(ROOT, "SVCOLLEGE_STUDENT_READINESS_EXPORT.json");
const MD_PATH = path.join(ROOT, "SVCOLLEGE_STUDENT_READINESS_EXPORT.md");
const REPORT_DATE = "2026-04-29";
const REPORT_VERSION = "svcollege-student-readiness-export-v1";

function buildExport() {
  const readinessReport = readiness.buildReport();
  const tabReport = tabMatrix.buildReport();
  const weakestReport = weakest.buildReport();
  const variantsReport = mockVariants.buildReport();
  const flowReport = flows.buildReport();
  const blockers = [
    ...(readinessReport.releaseGate?.blockers || []),
    ...(tabReport.strictGaps || []).map((gap) => gap.id || "tab-gap"),
    ...(variantsReport.summary.blockerCodes || []),
    ...(flowReport.summary.blockerCodes || []),
  ];
  return {
    reportVersion: REPORT_VERSION,
    date: REPORT_DATE,
    target: "SVCollege AI & Full Stack",
    audience: ["student", "teacher"],
    reportScope: "weekly-progress",
    summary: {
      readyForExamPractice: blockers.length === 0,
      blockers: blockers.length,
      readinessAverage: readinessReport.summary.averageReadiness,
      coveredModules: readinessReport.summary.covered,
      totalModules: readinessReport.summary.modules,
      tabCoverage: tabReport.summary.strictCoverage,
      tabCells: `${tabReport.summary.passedCells}/${tabReport.summary.strictCells}`,
      weakestCriticalCounters: weakestReport.summary,
      mockVariants: variantsReport.summary.variants,
      flowSimulationPassed: flowReport.summary.passed,
    },
    nextActions: weakestReport.topTen.slice(0, 5).map((item) => ({
      conceptKey: item.key,
      riskScore: item.riskScore,
      action: item.nextAction,
    })),
    teacherWeeklyProgress: {
      status: blockers.length === 0 ? "ready-for-exam-practice" : "blocked",
      moduleCoverage: `${readinessReport.summary.covered}/${readinessReport.summary.modules}`,
      tabCoverage: `${tabReport.summary.passedCells}/${tabReport.summary.strictCells}`,
      recommendedReviewAgenda: weakestReport.topTen.slice(0, 3).map((item) => item.key),
      evidenceCommands: [
        "npm run svcollege:readiness:release",
        "npm run svcollege:tab-matrix:strict",
        "npm run qa:questions:strict",
        "npm run exam:mock-variants:strict",
        "npm run exam:flows:strict",
      ],
    },
  };
}

function toMarkdown(report) {
  return [
    `# SVCollege Student Readiness Export — ${report.date}`,
    "",
    `- Target: ${report.target}`,
    `- Ready for exam practice: ${report.summary.readyForExamPractice ? "Yes" : "No"}`,
    `- Blockers: ${report.summary.blockers}`,
    `- Modules: ${report.summary.coveredModules}/${report.summary.totalModules}`,
    `- Readiness average: ${report.summary.readinessAverage}%`,
    `- Tab coverage: ${report.summary.tabCoverage}% (${report.summary.tabCells})`,
    `- Mock variants: ${report.summary.mockVariants}`,
    `- Flow simulation: ${report.summary.flowSimulationPassed ? "Pass" : "Fail"}`,
    "",
    "## Critical Counters",
    "",
    `- Without questions: ${report.summary.weakestCriticalCounters.withoutQuestions}`,
    `- Without hard question: ${report.summary.weakestCriticalCounters.withoutHardQuestion}`,
    `- Without one-line definition: ${report.summary.weakestCriticalCounters.withoutDefinition}`,
    `- Without prerequisite entry: ${report.summary.weakestCriticalCounters.withoutPrerequisiteEntry}`,
    `- Code concepts without code proof: ${report.summary.weakestCriticalCounters.codeConceptsWithoutProof}`,
    "",
    "## Next 5 Actions",
    "",
    "| Concept | Risk | Action |",
    "|---|---:|---|",
    ...report.nextActions.map((item) => `| ${item.conceptKey} | ${item.riskScore} | ${item.action} |`),
    "",
    "## Teacher Weekly Progress",
    "",
    `- Status: ${report.teacherWeeklyProgress.status}`,
    `- Module coverage: ${report.teacherWeeklyProgress.moduleCoverage}`,
    `- Tab coverage: ${report.teacherWeeklyProgress.tabCoverage}`,
    `- Recommended review agenda: ${report.teacherWeeklyProgress.recommendedReviewAgenda.join(", ")}`,
    "",
    "### Evidence Commands",
    "",
    ...report.teacherWeeklyProgress.evidenceCommands.map((command) => `- \`${command}\``),
    "",
  ].join("\n");
}

function run(argv = process.argv.slice(2)) {
  const report = buildExport();
  if (argv.includes("--write")) {
    fs.writeFileSync(JSON_PATH, `${JSON.stringify(report, null, 2)}\n`);
    fs.writeFileSync(MD_PATH, `${toMarkdown(report)}\n`);
  }
  if (argv.includes("--summary")) {
    process.stdout.write(`${JSON.stringify(report.summary, null, 2)}\n`);
  } else {
    process.stdout.write(`${toMarkdown(report)}\n`);
  }
  if (argv.includes("--strict") && !report.summary.readyForExamPractice) process.exitCode = 1;
  return report;
}

if (require.main === module) run();

module.exports = {
  buildExport,
  toMarkdown,
};
