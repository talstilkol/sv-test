const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

describe("Exam Cockpit dashboard", () => {
  const html = read("index.html");
  const app = read("app.js");
  const css = read("style.css");

  it("adds a home dashboard for today's exam plan, readiness, weak modules and blockers", () => {
    expect(html).toContain('id="exam-cockpit"');
    expect(html).toContain("Exam Cockpit");
    expect(app).toContain("function buildExamCockpitSummary");
    expect(app).toContain("function updateExamCockpit");
    expect(app).toContain("level100GateStatus()");
    expect(app).toContain("SVCOLLEGE_EXAM_MODULES");
    expect(app).toContain("todayPlan");
    expect(app).toContain("nextDrill");
    expect(app).toContain("function getExamDailyTarget");
    expect(app).toContain("function getExamCountdownSummary");
    expect(app).toContain("function buildEndOfDayReport");
    expect(app).toContain("function buildExamModuleReadinessRows");
    expect(app).toContain("function buildDailyStudyPlan");
    expect(app).toContain("function buildTodayOnlyQueue");
    expect(app).toContain("function buildSpacedReviewCalendar");
    expect(app).toContain("function dateKeyFromTimestamp");
    expect(app).toContain("function buildOfflineCramMode");
    expect(app).toContain("function buildEndOfDayDiff");
    expect(app).toContain("function buildPersonalExamReadinessTrend");
    expect(app).toContain("function buildPrintableFinal24HourPlan");
    expect(app).toContain("function buildExamScoreProjection");
    expect(app).toContain("function buildFinalWeakList");
    expect(app).toContain("dailyStudyPlan");
    expect(app).toContain("todayOnlyQueue");
    expect(app).toContain("spacedReviewCalendar");
    expect(app).toContain("offlineCramMode");
    expect(app).toContain("endOfDayDiff");
    expect(app).toContain("readinessTrend");
    expect(app).toContain("final24HourPlan");
    expect(app).toContain("scoreProjection");
    expect(app).toContain("finalWeakList");
    expect(app).toContain("timeBudget");
    expect(app).toContain("conceptProofs");
    expect(app).toContain("codeProofs");
    expect(app).toContain("mockExamTarget");
    expect(app).toContain("Daily Study Plan");
    expect(app).toContain("Today-only queue");
    expect(app).toContain("Spaced review calendar");
    expect(app).toContain("Offline cram mode");
    expect(app).toContain("one-line definitions, comparison tables and code-proof requirements");
    expect(app).toContain("Missing definitions stay unknown/unavailable");
    expect(app).toContain("no cram facts are invented");
    expect(app).toContain("codeProofChecklist");
    expect(app).toContain("End-of-day diff uses today's local learning evidence");
    expect(app).toContain("no end-of-day achievements are fabricated");
    expect(app).toContain("levelChanges");
    expect(app).toContain("wrongClusters");
    expect(app).toContain("nextBlockers");
    expect(app).toContain("Personal exam readiness trend uses real mock exam history");
    expect(app).toContain("trend points stay empty instead of inventing dates");
    expect(app).toContain("Printable final 24-hour plan is assembled from actual weak concepts");
    expect(app).toContain("never inserts generic study topics or fake weak concepts");
    expect(app).toContain("Readiness trend");
    expect(app).toContain("Final 24-hour plan");
    expect(app).toContain("Score projection");
    expect(app).toContain("Score projection uses current module readiness and real mock/final exam history only");
    expect(app).toContain("Final weak list");
    expect(app).toContain("Final weak list ranks existing SVCollege concepts");
    expect(app).toContain("SVCollege weak concepts first");
    expect(app).toContain("ordered by SVCollege exam-critical weak concept priority");
    expect(app).toContain("never creates review content");
    expect(app).toContain("core.buildSpacedReviewSchedule(items, { now, limit: 24 })");
    expect(app).toContain("capped at 3 weak topics, 2 code proofs and 1 mock section");
    expect(app).toContain("slice(0, 3)");
    expect(app).toContain("slice(0, 2)");
    expect(app).toContain("mockSections: 1");
    expect(app).toContain("never pads the queue with fake tasks");
    expect(app).toContain("Mock target:");
    expect(app).toContain("Daily study plan uses current local scores");
    expect(app).toContain("no fake plan rows are generated");
    expect(app).toContain('const EXAM_DATE_KEY = "lumenportal:examDate:v1"');
    expect(app).toContain('const EXAM_DAILY_TARGET_KEY = "lumenportal:examDailyTarget:v1"');
    expect(app).toContain("לא הוגדר תאריך מבחן");
    expect(app).toContain("Countdown + יעד יומי");
    expect(app).toContain("דק׳");
    expect(app).toContain("function startWeakestThirtyMinuteFlow");
    expect(app).toContain('data-exam-cockpit-action="weakest30"');
    expect(app).toContain('if (cockpitAction === "weakest30") startWeakestThirtyMinuteFlow()');
    expect(app).toContain('trainerMode = "weak"');
    expect(app).toContain("אין מודול חלש זמין כרגע");
    expect(app).toContain("דוח סוף יום");
    expect(app).toContain('data-exam-cockpit-action="cram"');
    expect(app).toContain('window.open("EXAM_FINAL_CRAM_SHEET.md", "_blank", "noopener")');
    expect(app).toContain("פתח דף חזרה");
    expect(app).toContain("learned");
    expect(app).toContain("failed");
    expect(app).toContain("repeated");
    expect(app).toContain("mastered");
    expect(app).toContain("nextAction: nextEconomyAction().title");
    expect(app).toContain("מודולים חלשים");
    expect(app).toContain("exam-module-heatmap");
    expect(app).toContain("מפת חום מודולי מבחן");
    expect(app).toContain("--module-ready");
    expect(app).toContain("Blockers");
    expect(app).toContain("updateExamCockpit()");
  });

  it("prioritizes spaced review toward exam-critical weak concepts", () => {
    const scoring = read("src/core/scoring.js");
    expect(scoring).toContain("function spacedReviewPriority");
    expect(scoring).toContain("function buildSpacedReviewSchedule");
    expect(scoring).toContain("function isExamCriticalConcept");
    expect(app).toContain("function spacedReviewPriorityForScore");
    expect(app).toContain("spacedReviewPriorityForScore(sc, concept, conceptKey(lessonId, conceptName))");
    expect(app).toContain("spacedReviewPriority: spacedReviewPriorityForScore(sc, concept, key)");
    expect(app).toContain("if (a.spacedReviewPriority !== b.spacedReviewPriority)");
  });

  it("wires cockpit actions to trainer and mock exam without adding fake data", () => {
    expect(app).toContain('data-exam-cockpit-action="trainer"');
    expect(app).toContain('data-exam-cockpit-action="mock"');
    expect(app).toContain('if (cockpitAction === "trainer") openTrainer()');
    expect(app).toContain('if (cockpitAction === "mock") openMockExam()');
    expect(app).toContain("אין חולשה זמינה");
    expect(app).toContain("אין blockers פתוחים");
  });

  it("adds three deterministic final exam templates before post-exam simulations", () => {
    expect(app).toContain('id: "final_standard"');
    expect(app).toContain('id: "final_hard"');
    expect(app).toContain('id: "final_stress"');
    expect(app).toContain("deterministicFinal: true");
    expect(app).toContain("const completedAttempts = loadExamHistory()");
    expect(app).toContain(": `${template.id}:attempt:${completedAttempts + 1}`");
    expect(app).toContain("minChallengeLevel: 5");
    expect(app).toContain("stressMode: true");
  });

  it("adds a code-only final with Fill, Trace, Bug and Mini Build questions", () => {
    expect(app).toContain('id: "final_code_only"');
    expect(app).toContain("codeOnly: true");
    expect(app).toContain("build: 8");
    expect(app).toContain("const sourceBuild");
    expect(app).toContain("take(\"build\", sourceBuild");
    expect(app).toContain("mx-q-build-input");
    expect(app).toContain("new RegExp(test.regex");
    expect(css).toContain(".mx-q-build-input");
  });

  it("locks study aids and free navigation during timed stress mode", () => {
    expect(app).toContain("function isMockStressMode");
    expect(app).toContain("mx-study-aid-locked");
    expect(app).toContain("if (!isMockStressMode()) wireQuestionPrerequisiteNavigation(container)");
    expect(app).toContain("runner.classList.toggle(\"is-stress-mode\", isMockStressMode(template))");
    expect(app).toContain("const locked = isMockStressMode() && !isCurrent");
    expect(app).toContain("if (isMockStressMode()) return");
    expect(css).toContain(".mx-stress-badge");
    expect(css).toContain(".mx-runner.is-stress-mode");
    expect(css).toContain(".mx-study-aid-locked");
  });

  it("groups post-exam review by concept, misconception and prerequisite gap", () => {
    expect(app).toContain("function buildPostExamReviewGroups");
    expect(app).toContain("postExamReviewGroups.concepts");
    expect(app).toContain("postExamReviewGroups.misconceptions");
    expect(app).toContain("postExamReviewGroups.prerequisites");
    expect(app).toContain("סקירה מקובצת לפי מושג, misconception ו-prerequisite");
    expect(css).toContain(".mx-review-groups");
    expect(css).toContain(".mx-review-group-grid");
  });

  it("queues prove-again retests for every wrong final exam concept", () => {
    expect(app).toContain("function scheduleFinalExamProveAgainRetests");
    expect(app).toContain("stage: \"final_exam_prove_again\"");
    expect(app).toContain("record.proveAgainRetests");
    expect(app).toContain("Prove again — בדיקה חוזרת לכל מושג שנכשל");
    expect(css).toContain(".mx-prove-again");
    expect(css).toContain(".mx-prove-again-list");
  });

  it("includes responsive cockpit styling", () => {
    expect(css).toContain(".exam-cockpit");
    expect(css).toContain(".exam-cockpit-grid");
    expect(css).toContain(".exam-today-only-list");
    expect(css).toContain(".exam-spaced-calendar-list");
    expect(css).toContain(".exam-end-day-diff-list");
    expect(css).toContain(".exam-final-24-list");
    expect(css).toContain(".exam-final-weak-list");
    expect(css).toContain(".exam-module-heatmap");
    expect(css).toContain("linear-gradient(90deg, rgba(34,211,238,0.18) var(--module-ready)");
    expect(css).toContain("grid-template-columns: repeat(auto-fit, minmax(190px, 1fr))");
    expect(css).toContain("@media (max-width: 780px)");
    expect(css).toContain(".exam-readiness-meter");
  });
});
