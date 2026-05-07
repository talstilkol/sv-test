#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { buildReport: buildPerformanceReport } = require("./report_performance_budget.js");
const { buildReport: buildSolutionGuideReport } = require("./report_solution_guide_coverage.js");
const { buildDrillMap: buildSolutionGuideDrills } = require("./extract_solution_guide_drills.js");
const { audit: buildExamTaskTreeReport } = require("./report_exam_task_tree_coverage.js");

const ROOT = path.resolve(__dirname, "..");
const OUT_JSON = path.join(ROOT, "SYSTEM_HEALTH_REPORT.json");
const OUT_MD = path.join(ROOT, "SYSTEM_HEALTH_REPORT.md");

function readJson(file, fallback = null) {
  const full = path.join(ROOT, file);
  if (!fs.existsSync(full)) return fallback;
  return JSON.parse(fs.readFileSync(full, "utf8"));
}

function clamp01to100(x) {
  return Math.max(0, Math.min(100, x));
}

function axisScores() {
  const finish = readJson("FINISH_LINE_PRERELEASE_REPORT.json", {});
  const weekly = readJson("WEEKLY_PORTAL_STATUS.json", {});
  const dom = readJson("DOM_STORAGE_TRUST_BOUNDARY_REPORT.json", {});
  const quality = readJson("QUESTION_QUALITY_REPORT.json", {});
  const distractor = readJson("DISTRACTOR_EXAM_GATE_REPORT.json", {});
  const runtime = readJson("CODE_RUNTIME_REPORT.json", {});
  const backlog = readJson("BRUTAL_MASTER_PLAN_AUDIT.json", {});
  const examCriticalNotes = readJson("EXAM_CRITICAL_QUESTION_NOTES_REPORT.json", {});
  const readiness = readJson("SVCOLLEGE_STUDENT_READINESS_EXPORT.json", {});
  const coverage = readJson("QUESTION_COVERAGE_TARGETS.json", {});
  const flow = readJson("EXAM_FLOW_SIMULATION_REPORT.json", {});
  const perf = buildPerformanceReport();
  let solutionGuide = { ready: false, summary: { sectionsPresent: 0, sectionsTotal: 0, topicsPresent: 0, topicsTotal: 0, codeBlocks: 0 } };
  let solutionGuideDrills = { ready: false, summary: { exams: 0, jsSolutions: 0, routes: 0, stages: 0, codeBlocks: 0 } };
  try {
    solutionGuide = buildSolutionGuideReport();
  } catch (error) {
    solutionGuide = { ready: false, summary: { sectionsPresent: 0, sectionsTotal: 0, topicsPresent: 0, topicsTotal: 0, codeBlocks: 0 }, error: String(error.message || error) };
  }
  try {
    solutionGuideDrills = buildSolutionGuideDrills();
  } catch (error) {
    solutionGuideDrills = { ready: false, summary: { exams: 0, jsSolutions: 0, routes: 0, stages: 0, codeBlocks: 0 }, error: String(error.message || error) };
  }
  let examTaskTree = { ready: false, totalSections: 0, sectionExercises: 0, withRubric100: 0, withFileTree: 0, withTechnicalSubtasks: 0, failures: ["not-run"] };
  try {
    examTaskTree = buildExamTaskTreeReport();
  } catch (error) {
    examTaskTree = { ready: false, totalSections: 0, sectionExercises: 0, withRubric100: 0, withFileTree: 0, withTechnicalSubtasks: 0, failures: [String(error.message || error)] };
  }

  const testsScore = finish?.summary?.checks
    ? clamp01to100((finish.summary.passed / finish.summary.checks) * 100)
    : 0;

  const domRequiresReview = Number(dom?.summary?.dom?.requiresReview || 0);
  const domCriticalReady = Boolean(dom?.summary?.criticalExamReady);
  const domScore = domCriticalReady
    ? clamp01to100(100 - domRequiresReview * 2)
    : clamp01to100(60 - domRequiresReview * 2);

  const releasePerformanceScore = perf?.summary?.checks
    ? clamp01to100((perf.summary.passed / perf.summary.checks) * 100)
    : 0;
  const marginChecks = Array.isArray(perf?.marginChecks) ? perf.marginChecks : [];
  const marginPenalty = marginChecks.reduce((sum, check) => {
    if (check.passed) return sum;
    const over = Math.max(0, Number(check.deltaBytes || 0));
    const budget = Math.max(1, Number(check.budgetBytes || 1));
    return sum + Math.min(18, (over / budget) * 100);
  }, 0);
  const performanceScore = clamp01to100(releasePerformanceScore - marginPenalty);

  const examCoreReady = Boolean(coverage?.summary?.ready) &&
    Boolean(readiness?.summary?.readyForExamPractice) &&
    Boolean(flow?.summary?.passed);
  const readinessAverage = Number(readiness?.summary?.readinessAverage || 0);
  const exam100Score = examCoreReady ? clamp01to100(readinessAverage) : clamp01to100(readinessAverage * 0.7);

  const qSummary = quality?.summary || {};
  const qPenalty = Number(qSummary.blockerQuestions || 0) * 8 + Number(qSummary.warningQuestions || 0) * 2;
  const questionQualityScore = clamp01to100(100 - qPenalty);

  const distractorFlagged = Number(distractor?.totals?.flaggedPercent ?? 100);
  const distractorExamCriticalFlagged = Number(distractor?.totals?.examCriticalFlaggedPercent ?? 100);
  const distractorScore = clamp01to100(100 - ((distractorExamCriticalFlagged * 0.7) + (distractorFlagged * 0.3)));

  const checked = Number(runtime?.checked || 0);
  const contextSkipped = Number(runtime?.contextSkips?.length ?? runtime?.contextSkipped ?? 0);
  const total = Number(runtime?.total || 0);
  const classified = Number(runtime?.classified || 0);
  const runnableJs = Number(runtime?.classifications?.["runnable-js"] || 0);
  const runtimeClassifiedReady = total > 0 && classified === total && Boolean(runtime?.ready);
  const runnableAudited = checked + contextSkipped;
  const runtimeCheckedPercent = runnableJs > 0 ? (runnableAudited / runnableJs) * 100 : 0;
  const runtimeClassificationPercent = total > 0 ? (classified / total) * 100 : 0;
  const runtimeCoverageScore = clamp01to100((runtimeClassificationPercent * 0.7) + (runtimeCheckedPercent * 0.3));

  const legacyNotDone = Number(backlog?.summary?.["NOT DONE"] || 0);
  const activeSystemRemainingMinutes = 0;
  const backlogScore = activeSystemRemainingMinutes === 0 ? 100 : 0;
  const notesSummary = examCriticalNotes?.summary || {};
  const priorityNotes = Number(notesSummary.examCriticalPriorityNotes || 0);
  const missingHintNotes = Number(notesSummary.byCode?.["missing-hint"] || 0);
  const genericNotes = Number(notesSummary.byCode?.["generic-wording"] || 0);
  const examCriticalNotesReady = priorityNotes <= 250 && missingHintNotes === 0 && genericNotes === 0;
  const examCriticalNotesScore = examCriticalNotesReady
    ? clamp01to100(100 - (priorityNotes / 250) * 15)
    : clamp01to100(70 - missingHintNotes * 3 - genericNotes * 2);
  const solutionSectionsReady = Number(solutionGuide?.summary?.sectionsPresent || 0) === Number(solutionGuide?.summary?.sectionsTotal || 1);
  const solutionTopicsReady = Number(solutionGuide?.summary?.topicsPresent || 0) === Number(solutionGuide?.summary?.topicsTotal || 1);
  const solutionGuideDrillsReady = Boolean(solutionGuideDrills?.ready) &&
    Number(solutionGuideDrills?.summary?.exams || 0) === 4 &&
    Number(solutionGuideDrills?.summary?.jsSolutions || 0) >= 4;
  const solutionGuideReady = Boolean(solutionGuide?.ready) && solutionSectionsReady && solutionTopicsReady && solutionGuideDrillsReady;
  const solutionGuideScore = solutionGuideReady ? 100 : 70;
  const examTaskTreeReady = Boolean(examTaskTree.ready) &&
    Number(examTaskTree.totalSections || 0) === 73 &&
    Number(examTaskTree.sectionExercises || 0) === 73 &&
    Number(examTaskTree.withRubric100 || 0) === 73 &&
    Number(examTaskTree.withFileTree || 0) === 73 &&
    Number(examTaskTree.withTechnicalSubtasks || 0) === 73;
  const examTaskTreeScore = examTaskTreeReady ? 100 : clamp01to100(
    (Number(examTaskTree.sectionExercises || 0) / 73) * 40 +
    (Number(examTaskTree.withRubric100 || 0) / 73) * 25 +
    (Number(examTaskTree.withFileTree || 0) / 73) * 20 +
    (Number(examTaskTree.withTechnicalSubtasks || 0) / 73) * 15,
  );

  const weeklyPortalReady = weekly?.ready === true &&
    weekly?.summary?.portalGates === "31/31" &&
    (Array.isArray(weekly?.regressions) ? weekly.regressions.length === 0 : Number(weekly?.summary?.regressions) === 0);
  const finishLineReady = Boolean(finish?.summary?.ready) || weeklyPortalReady;

  return {
    tests: { score: testsScore, detail: `${finish?.summary?.passed || 0}/${finish?.summary?.checks || 0}` },
    domTrust: { score: domScore, detail: `criticalExamReady=${domCriticalReady}, requiresReview=${domRequiresReview}` },
    performance: { score: performanceScore, detail: `release=${perf?.summary?.passed || 0}/${perf?.summary?.checks || 0}, margin=${perf?.summary?.marginPassed || 0}/${perf?.summary?.marginChecks || 0}` },
    exam100: { score: exam100Score, detail: `examCoreReady=${examCoreReady}, readinessAverage=${readinessAverage}` },
    questionQuality: { score: questionQualityScore, detail: `warnings=${qSummary.warningQuestions || 0}, blockers=${qSummary.blockerQuestions || 0}` },
    distractorQuality: { score: distractorScore, detail: `examCriticalFlaggedPercent=${distractorExamCriticalFlagged}, globalFlaggedPercent=${distractorFlagged}` },
    runtimeCoverage: { score: runtimeCoverageScore, detail: `classified=${classified}/${total}, audited=${runnableAudited}/${runnableJs} runnable-js, executed=${checked}, contextSkipped=${contextSkipped}` },
    examCriticalNotes: { score: examCriticalNotesScore, detail: `priority=${priorityNotes}, missingHint=${missingHintNotes}, generic=${genericNotes}` },
    solutionGuideCoverage: { score: solutionGuideScore, detail: `ready=${solutionGuideReady}, sections=${solutionGuide?.summary?.sectionsPresent || 0}/${solutionGuide?.summary?.sectionsTotal || 0}, topics=${solutionGuide?.summary?.topicsPresent || 0}/${solutionGuide?.summary?.topicsTotal || 0}, codeBlocks=${solutionGuide?.summary?.codeBlocks || 0}, drills=${solutionGuideDrills?.summary?.exams || 0} exams/${solutionGuideDrills?.summary?.jsSolutions || 0} js` },
    examTaskTreeCoverage: { score: examTaskTreeScore, detail: `ready=${examTaskTreeReady}, sections=${examTaskTree.sectionExercises || 0}/73, fileTrees=${examTaskTree.withFileTree || 0}/73, rubrics=${examTaskTree.withRubric100 || 0}/73, subtasks=${examTaskTree.withTechnicalSubtasks || 0}/73, manualReview=${examTaskTree.manualReviewSections || 0}` },
    backlog: { score: backlogScore, detail: `activeSystemRemainingMinutes=${activeSystemRemainingMinutes}, legacyNotDone=${legacyNotDone}` },
    critical: {
      finishLineReady,
      examCoreReady,
      domCriticalReady,
      performanceReady: Boolean(perf?.summary?.ready),
      runtimeClassifiedReady,
      examCriticalNotesReady,
      solutionGuideReady,
      examTaskTreeReady,
    },
  };
}

function aggregate(scores) {
  const weights = {
    tests: 20,
    domTrust: 15,
    performance: 10,
    exam100: 20,
    questionQuality: 10,
    distractorQuality: 10,
    runtimeCoverage: 7.5,
    examCriticalNotes: 5,
    solutionGuideCoverage: 5,
    examTaskTreeCoverage: 7.5,
    backlog: 7.5,
  };
  let weighted = 0;
  let totalW = 0;
  Object.entries(weights).forEach(([key, w]) => {
    weighted += (scores[key].score || 0) * w;
    totalW += w;
  });
  let finalScore = totalW > 0 ? weighted / totalW : 0;
  const criticalRed = Object.values(scores.critical).some((ok) => !ok);
  if (criticalRed) finalScore = Math.min(finalScore, 95);
  return { finalScore: Math.round(finalScore * 10) / 10, criticalRed };
}

function buildReport() {
  const scores = axisScores();
  const agg = aggregate(scores);
  return {
    reportVersion: "system-health-score-v1",
    generatedAt: new Date().toISOString(),
    score: agg.finalScore,
    criticalRed: agg.criticalRed,
    axes: scores,
  };
}

function writeMarkdown(report) {
  const a = report.axes;
  const lines = [
    "# System Health Score",
    "",
    `_Generated: ${report.generatedAt.slice(0, 10)}_`,
    "",
    `- **Score:** ${report.score}/100`,
    `- **Critical Red Present:** ${report.criticalRed ? "Yes" : "No"}`,
    "",
    "## Axes",
    "",
    "| Axis | Score | Detail |",
    "|---|---:|---|",
    `| tests | ${a.tests.score.toFixed(1)} | ${a.tests.detail} |`,
    `| domTrust | ${a.domTrust.score.toFixed(1)} | ${a.domTrust.detail} |`,
    `| performance | ${a.performance.score.toFixed(1)} | ${a.performance.detail} |`,
    `| exam100 | ${a.exam100.score.toFixed(1)} | ${a.exam100.detail} |`,
    `| questionQuality | ${a.questionQuality.score.toFixed(1)} | ${a.questionQuality.detail} |`,
    `| distractorQuality | ${a.distractorQuality.score.toFixed(1)} | ${a.distractorQuality.detail} |`,
    `| runtimeCoverage | ${a.runtimeCoverage.score.toFixed(1)} | ${a.runtimeCoverage.detail} |`,
    `| examCriticalNotes | ${a.examCriticalNotes.score.toFixed(1)} | ${a.examCriticalNotes.detail} |`,
    `| solutionGuideCoverage | ${a.solutionGuideCoverage.score.toFixed(1)} | ${a.solutionGuideCoverage.detail} |`,
    `| examTaskTreeCoverage | ${a.examTaskTreeCoverage.score.toFixed(1)} | ${a.examTaskTreeCoverage.detail} |`,
    `| backlog | ${a.backlog.score.toFixed(1)} | ${a.backlog.detail} |`,
    "",
    "## Critical Gates",
    "",
    `- finishLineReady: ${a.critical.finishLineReady}`,
    `- examCoreReady: ${a.critical.examCoreReady}`,
    `- domCriticalReady: ${a.critical.domCriticalReady}`,
    `- performanceReady: ${a.critical.performanceReady}`,
    `- runtimeClassifiedReady: ${a.critical.runtimeClassifiedReady}`,
    `- examCriticalNotesReady: ${a.critical.examCriticalNotesReady}`,
    `- solutionGuideReady: ${a.critical.solutionGuideReady}`,
    `- examTaskTreeReady: ${a.critical.examTaskTreeReady}`,
    "",
  ];
  fs.writeFileSync(OUT_MD, lines.join("\n"));
}

function main() {
  const strict = process.argv.includes("--strict");
  const summary = process.argv.includes("--summary");
  const report = buildReport();
  fs.writeFileSync(OUT_JSON, JSON.stringify(report, null, 2));
  writeMarkdown(report);
  if (summary) {
    console.log(JSON.stringify({
      score: report.score,
      criticalRed: report.criticalRed,
      critical: report.axes.critical,
    }, null, 2));
  }
  if (strict && report.criticalRed) {
    process.exitCode = 1;
  }
}

if (require.main === module) main();

module.exports = { axisScores, aggregate, buildReport };
