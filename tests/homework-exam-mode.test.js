const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { cssIncludes } = require("./css-evidence.js");

const ROOT = path.resolve(__dirname, "..");
const DATA_FILE = "data/homework_exam_mode.js";

function runFile(relativePath, context) {
  vm.runInNewContext(
    fs.readFileSync(path.join(ROOT, relativePath), "utf8"),
    context,
    { filename: relativePath },
  );
}

function loadContext() {
  const context = { console };
  context.window = context;
  runFile("data/questions_bank.js", context);
  runFile("data/questions_build.js", context);
  runFile("data/exam_tasks_tree.js", context);
  runFile("data/solution_guide_drills.js", context);
  runFile(DATA_FILE, context);
  return context;
}

describe("Homework Exam Mode", () => {
  it("ships the required homework exam templates", () => {
    const context = loadContext();
    const mode = context.HOMEWORK_EXAM_MODE;
    const ids = mode.templates.map((template) => template.id);

    expect(ids).toEqual([
      "react_students",
      "react_smart_house",
      "react_api_filter",
      "movie_rating",
      "react_ts_budget",
      "typescript_core",
      "node_mongo_api",
      "nextjs_dashboard",
    ]);
    expect(mode.sources.length).toBeGreaterThanOrEqual(30);
    expect(mode.examExamples).toHaveLength(9);
    expect(mode.weekPlan).toHaveLength(7);
  });

  it("ships closed basic diagnostic tracks with Hebrew code explanations", () => {
    const context = loadContext();
    const mode = context.HOMEWORK_EXAM_MODE;
    const tracks = mode.basicDiagnosticTracks;
    const ids = tracks.map((track) => track.id);

    expect(mode.version).toBe("homework-exam-mode-v6");
    expect(ids).toEqual([
      "basic_js_arrays",
      "basic_react_state",
      "basic_forms_validation",
      "basic_router_crud",
      "basic_api_async",
      "basic_typescript",
      "basic_express_mongo",
    ]);
    expect(tracks).toHaveLength(7);
    expect(tracks.map((track) => track.heat)).toEqual([10, 9, 8, 7, 6, 5, 4]);

    tracks.forEach((track) => {
      expect(track.checks.length).toBeGreaterThanOrEqual(5);
      expect(track.steps.length).toBeGreaterThanOrEqual(4);
      expect(track.passCriteria).toBeTruthy();
      expect(track.strengthenIfMissed).toBeTruthy();
      expect(track.codeBlocks.length).toBeGreaterThanOrEqual(1);
      track.codeBlocks.forEach((block) => {
        expect(block.code.length).toBeGreaterThan(80);
        expect(block.overview.length).toBeGreaterThan(40);
        expect(block.lineByLine.length).toBeGreaterThanOrEqual(6);
        expect(block.focus.length).toBeGreaterThanOrEqual(3);
        expect(block.commonMistakes.length).toBeGreaterThanOrEqual(3);
        expect(block.practice.length).toBeGreaterThan(20);
      });
    });
  });

  it("builds every mock exam from a 70/20/10 scoring structure", () => {
    const context = loadContext();
    const mode = context.HOMEWORK_EXAM_MODE;
    const buildIds = new Set(mode.buildQuestions.map((build) => build.id));
    const jsIds = new Set(mode.jsQuestions.map((question) => question.id));
    const tsIds = new Set(mode.tsQuestions.map((question) => question.id));

    expect(mode.mockExams).toHaveLength(8);
    mode.mockExams.forEach((exam) => {
      expect(buildIds.has(exam.buildQuestionId)).toBe(true);
      expect(jsIds.has(exam.jsQuestionId)).toBe(true);
      expect(exam.tsQuestionCount).toBe(1);
      expect(exam.scoringBreakdown).toEqual({ project: 70, javascript: 20, typescript: 10 });
      expect(exam.scoringDimensions).toEqual(["project", "javascript", "typescript"]);
    });
    expect(jsIds.size).toBeGreaterThanOrEqual(9);
    expect(tsIds.size).toBeGreaterThanOrEqual(8);
  });

  it("accounts for the remaining local exam materials without inventing content", () => {
    const context = loadContext();
    const coverage = context.HOMEWORK_EXAM_MODE.materialCoverage;
    const sourceIds = new Set(context.HOMEWORK_EXAM_MODE.sources.map((source) => source.id));
    const statuses = coverage.items.map((item) => item.status);

    expect(coverage.totalFiles).toBe(40);
    expect(coverage.accountedFiles).toBe(40);
    expect(coverage.examCriticalReadyPercent).toBe(100);
    expect(statuses).toContain("unknown/unavailable");
    expect(coverage.items.find((item) => item.sourceId === "exam_video_1151918075").evidence).toContain("אין תמלול");
    coverage.items.forEach((item) => {
      expect(sourceIds.has(item.sourceId)).toBe(true);
    });
    expect(coverage.items.map((item) => item.sourceId)).toEqual(expect.arrayContaining([
      "hw_smart_house",
      "hw_movie_project_25",
      "exam_training_football_old_scan",
      "solution_guide_4_exams",
      "lesson_20_slides",
      "lesson_26_part2_slides",
      "exam_video_1151918075",
    ]));
  });

  it("keeps the active exam scoring separate from previous scoring", () => {
    const context = loadContext();
    const mode = context.HOMEWORK_EXAM_MODE;

    expect(mode.activeProfile.scoringBreakdown).toEqual({ project: 70, javascript: 20, typescript: 10 });
    expect(mode.previousProfile.scoringBreakdown).toEqual({ react: 50, express: 20, javascript: 20, typescript: 10 });
    expect(mode.allowedMaterials.allowedPrework).toEqual(expect.arrayContaining([
      expect.stringContaining("React"),
      expect.stringContaining("Express"),
      expect.stringContaining("GET"),
    ]));
    expect(mode.allowedMaterials.forbiddenPrework).toEqual(expect.arrayContaining([
      expect.stringContaining("routing"),
    ]));
  });

  it("includes the integrated master plan from the exam diagnosis", () => {
    const context = loadContext();
    const plan = context.HOMEWORK_EXAM_MODE.masterPlan;

    expect(plan.scoring).toEqual({ project: 70, javascript: 20, typescript: 10 });
    expect(plan.goal).toContain("4 שעות");
    expect(plan.priorities).toHaveLength(5);
    expect(plan.remainingTimePlan.requiredMinutes).toBe(6485);
    expect(plan.remainingTimePlan.requiredLabel).toBe("108 שעות 5 דק׳");
    expect(plan.remainingTimePlan.allPlansLabel).toBe("108 שעות 5 דק׳");
    expect(plan.remainingTimePlan.videoWatchCount).toBe(114);
    expect(plan.remainingTimePlan.videoWatchMinutes).toBe(3420);
    expect(plan.remainingTimePlan.presentationImageCount).toBe(40);
    expect(plan.remainingTimePlan.presentationImageMinutes).toBe(800);
    expect(plan.remainingTimePlan.mediaAssetPlan.videos).toHaveLength(114);
    expect(plan.remainingTimePlan.mediaAssetPlan.presentationImages).toHaveLength(40);
    expect(plan.remainingTimePlan.mediaAssetPlan.videos[0].name).toBe("video1151918075.mp4");
    expect(plan.remainingTimePlan.mediaAssetPlan.presentationImages[0].name).toBe("LESSON 23.pptx.pdf");
    expect(plan.remainingTimePlan.withFutureVideoLabel).toContain("57 שעות");
    expect(plan.remainingTimePlan.diagnosticTasks).toHaveLength(7);
    expect(plan.remainingTimePlan.weekTasks).toHaveLength(40);
    expect(plan.remainingTimePlan.optionalBacklog).toHaveLength(4);
    expect(plan.remainingTimePlan.weekTasks.reduce((sum, task) => sum + task.minutes, 0)).toBe(5430);
    expect(plan.remainingTimePlan.diagnosticTasks.reduce((sum, task) => sum + task.minutes, 0)).toBe(255);
    expect(plan.remainingTimePlan.weekTasks.filter((task) => task.id.includes("watch-videos")).reduce((sum, task) => sum + task.minutes, 0)).toBe(3420);
    expect(plan.remainingTimePlan.examTaskTreeStudy.totalSections).toBe(73);
    expect(plan.remainingTimePlan.examTaskTreeStudy.branches).toBe(7);
    expect(plan.remainingTimePlan.examTaskTreeStudy.subbranches).toBe(19);
    expect(plan.remainingTimePlan.examTaskTreeStudy.minutes).toBe(335);
    expect(plan.remainingTimePlan.examTaskTreeStudy.includedInRequiredMinutes).toBe(false);
    expect(plan.remainingTimePlan.weekTasks.filter((task) => String(task.id).startsWith("exam-tree-"))).toHaveLength(0);
    expect(plan.materialCompletionTasks).toHaveLength(6);
    expect(plan.materialCompletionTasks[0].title).toContain("Audit");
    expect(plan.materialCompletionTasks[1].lessons).toContain("24");
    expect(plan.materialCompletionTasks[1].passCriteria).toContain("90%");
    expect(plan.materialCompletionTasks[2].passCriteria).toContain("75%");
    expect(plan.sevenDayPlan).toHaveLength(7);
    expect(plan.sevenDayPlan[5].title).toContain("Mock Exam");
    const planTaskCount = plan.sevenDayPlan.reduce((sum, day) => sum + day.tasks.length, 0);
    expect(planTaskCount).toBeGreaterThanOrEqual(30);
    expect(plan.probabilityTiers).toHaveLength(4);
    expect(plan.requiredPages).toEqual(expect.arrayContaining([
      expect.stringContaining("Login"),
      expect.stringContaining("Register"),
      expect.stringContaining("Edit"),
    ]));
    expect(plan.pageChecklist).toEqual(expect.arrayContaining([
      expect.stringContaining("Route"),
      expect.stringContaining("validation"),
    ]));
    expect(plan.expressChecklist).toEqual(expect.arrayContaining([
      expect.stringContaining("cors"),
      expect.stringContaining("mongoose.connect"),
    ]));
    expect(plan.jsPatternRequirements).toEqual(expect.arrayContaining([
      expect.stringContaining("Error"),
      expect.stringContaining("אקראיות"),
    ]));
    expect(plan.examDayChecklist.project.length).toBeGreaterThanOrEqual(8);
    expect(plan.examDayChecklist.express.length).toBeGreaterThanOrEqual(7);
    expect(plan.examDayChecklist.submission.length).toBeGreaterThanOrEqual(5);
    expect(plan.assumptions).toEqual(expect.arrayContaining([
      expect.stringContaining("70/20/10"),
      expect.stringContaining("4 שעות"),
    ]));
    expect(plan.warning).toContain("total");
  });

  it("ships explicit Exam Only relevance and portal perfection tasks", () => {
    const context = loadContext();
    const mode = context.HOMEWORK_EXAM_MODE;
    const relevance = mode.examRelevance;
    const tasks = mode.portalPerfectionTasks;
    const exam100 = mode.exam100Path;

    expect(relevance.id).toContain("exam_only_mode");
    expect(relevance.tabRelevance.length).toBeGreaterThanOrEqual(16);
    expect(relevance.lessonRelevance.length).toBeGreaterThanOrEqual(11);
    expect(relevance.emptyStatePolicy).toHaveLength(4);
    expect(relevance.codeExplanationContract).toEqual(expect.arrayContaining([
      "מה הקוד עושה",
      "איפה זה מופיע במבחן",
      "טעות נפוצה",
    ]));
    expect(relevance.tabRelevance.find((tab) => tab.id === "mock-exam").relevance).toBe("critical");
    expect(relevance.tabRelevance.find((tab) => tab.id === "programming-museum").relevance).toBe("blocked");
    expect(relevance.lessonRelevance.find((lesson) => lesson.lessonId === "lesson_24").heat).toBe(10);
    expect(tasks).toHaveLength(7);
    expect(tasks.filter((task) => task.status === "implemented").length).toBe(6);
    expect(tasks.find((task) => task.id === "quality-fill-warnings").status).toBe("backlog");
    expect(exam100.version).toBe("exam-100-path-v1");
    expect(exam100.placementTest.minutes).toBe(20);
    expect(exam100.placementTest.sections.map((section) => section.count)).toEqual([8, 6, 4, 2]);
    expect(exam100.placementTest.sections.reduce((sum, section) => sum + section.questions.length, 0)).toBe(20);
    expect(exam100.placementTest.levels.map((level) => level.label)).toEqual(["Beginner", "Foundation", "Exam Ready", "100 Track"]);
    expect(exam100.closedRoutes.map((route) => route.id)).toEqual(["start-from-zero", "project-weak", "before-exam", "track-100"]);
    expect(exam100.homeCards.map((card) => card.title)).toEqual([
      "המשך מאיפה שעצרת",
      "מבחן מיון",
      "המסלול שלי",
      "סימולציה",
    ]);
    expect(exam100.saveUi.states).toEqual(expect.arrayContaining(["נשמר עכשיו", "שמירה נכשלה", "שחזור מפרופיל מקומי"]));
    expect(exam100.finalRunbook.totalMinutes).toBe(1200);
    expect(exam100.finalRunbook.executionOrder).toHaveLength(6);
    expect(exam100.finalRunbook.executionOrder.map((step) => step.order)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(exam100.finalRunbook.executionOrder.reduce((sum, step) => sum + step.minutes, 0)).toBe(1440);
    expect(exam100.finalRunbook.timeNote).toContain("1440");
    expect(exam100.finalRunbook.stopConditions).toEqual(expect.arrayContaining([
      expect.stringContaining("Native random"),
      expect.stringContaining("fake data"),
      expect.stringContaining("וידאו"),
      expect.stringContaining("exam:material-gaps:strict"),
      expect.stringContaining("finish-line:pre-release"),
    ]));
    expect(exam100.finalRunbook.releaseCommands).toEqual([
      "npm run exam:material-gaps:strict",
      "npm run questions:coverage-targets:strict",
      "npm run svcollege:student-export:strict",
      "npm run svcollege:top-tabs:strict",
      "npm run svcollege:pwa-offline:strict",
      "npm run svcollege:full-portal-smoke:strict",
      "npm run svcollege:visual-overlap:strict",
      "npm run svcollege:console-gate:strict",
      "npm run build",
      "npm test -- --run",
      "npm run finish-line:pre-release",
    ]);
    expect(exam100.finalRunbook.finalReportRequired).toEqual(expect.arrayContaining([
      "ציון מערכת עדכני",
      "אחוז כיסוי חומר",
      "מאיפה להתחיל היום",
      "סטטוס שמירה ואופליין",
    ]));
    expect(exam100.finalRunbook.definitionOfDone).toEqual(expect.arrayContaining([
      "הכניסה הראשונה מציגה התחל כאן",
      "יש 4 מסלולים סגורים",
      "כל בדיקות release עוברות",
      "תלמיד שלא יודע איפה להתחיל מקבל פעולה אחת בלבד",
    ]));
    expect(exam100.finalStudentReport.systemScore).toBe(98);
    expect(exam100.finalStudentReport.materialCoveragePercent).toBe(100);
    expect(exam100.finalStudentReport.questionCoveragePercent).toBe(100);
    expect(exam100.finalStudentReport.examGaps).toBe(0);
    expect(exam100.finalStudentReport.startToday.title).toBe("התחל ב-Exam 100 Path");
    expect(exam100.finalStudentReport.remainingPersonalStudy.label).toBe("108 שעות 5 דק׳");
    expect(exam100.finalStudentReport.remainingPersonalStudy.videoWatchMinutes).toBe(3420);
    expect(exam100.finalStudentReport.remainingPersonalStudy.examTaskTreeMinutes).toBe(335);
    expect(exam100.finalStudentReport.remainingPersonalStudy.presentationImageMinutes).toBe(800);
    expect(exam100.finalStudentReport.doNotStudyThisWeek).toEqual(expect.arrayContaining([
      expect.stringContaining("AI/DevOps/Nest"),
      expect.stringContaining("וידאו ללא תמלול"),
      expect.stringContaining("blocked"),
    ]));
    expect(exam100.finalStudentReport.saveAndOfflineStatus.offlineReady).toBe(true);
    expect(exam100.finalStudentReport.saveAndOfflineStatus.pwaAssets).toBe("203/203");
    expect(exam100.finalStudentReport.releaseStatus.finishLine).toBe("21/21");
    expect(exam100.finalStudentReport.releaseStatus.tests).toContain("846");
    expect(exam100.finalStudentReport.guarantees).toEqual(expect.arrayContaining([
      "אין שימוש באקראיות Native בקובץ התכנון",
      "אין fake data",
      "לא נגעו בווידאו",
    ]));
    expect(exam100.practicalGuides.status).toBe("ready");
    expect(exam100.practicalGuides.verification.failures).toBe(0);
    expect(exam100.practicalGuides.verification.htmlFiles).toBe(11);
    expect(exam100.practicalGuides.outputs.map((guide) => guide.id)).toEqual([
      "start_here",
      "one_page_exam_cheatsheet",
      "forward_tasks_plan",
      "guide_01_ideas",
      "guide_02_drills",
      "guide_03_exam_day",
      "study_path",
      "progress_tracker",
    ]);
    expect(exam100.practicalGuides.outputs.find((guide) => guide.id === "one_page_exam_cheatsheet").heat).toBe(10);
    expect(exam100.systemBacklog.find((task) => task.id === "exam100-dom-storage-regex").status).toBe("implemented");
    expect(exam100.systemBacklog.find((task) => task.id === "exam100-file-protocol-runtime").status).toBe("implemented");
    expect(exam100.systemBacklog.find((task) => task.id === "batch1-storage-regex-syntax").status).toBe("implemented");
    expect(exam100.systemBacklog.find((task) => task.id === "batch1-server-file-browser-smoke").status).toBe("implemented");
    expect(exam100.systemBacklog.find((task) => task.id === "batch2-exam100-first-block").status).toBe("implemented");
    expect(exam100.systemBacklog.find((task) => task.id === "batch2-single-start-card").status).toBe("implemented");
    expect(exam100.systemBacklog.find((task) => task.id === "batch2-placement-levels").status).toBe("implemented");
    expect(exam100.systemBacklog.find((task) => task.id === "batch2-route-recommendation").status).toBe("implemented");
    expect(exam100.systemBacklog.find((task) => task.id === "batch2-closed-routes-ui").status).toBe("implemented");
    expect(exam100.systemBacklog.find((task) => task.id === "batch2-route-gates").status).toBe("implemented");
    expect(exam100.systemBacklog.find((task) => task.id === "batch2-irrelevant-areas").status).toBe("implemented");
    expect(exam100.systemBacklog.find((task) => task.id === "batch2-persisted-progress").status).toBe("implemented");
    expect(exam100.systemBacklog.find((task) => task.id === "batch2-ui-smoke-desktop-mobile").status).toBe("implemented");
    const sprint20Tasks = exam100.systemBacklog.filter((task) => String(task.id || "").startsWith("sprint20-"));
    expect(sprint20Tasks).toHaveLength(14);
    expect(sprint20Tasks.reduce((sum, task) => sum + task.minutes, 0)).toBe(1440);
    expect(sprint20Tasks.every((task) => task.status === "implemented")).toBe(true);
    const batch3Tasks = exam100.systemBacklog.filter((task) => String(task.id || "").startsWith("batch3-"));
    expect(batch3Tasks).toHaveLength(9);
    expect(batch3Tasks.reduce((sum, task) => sum + task.minutes, 0)).toBe(310);
    expect(batch3Tasks.every((task) => task.status === "implemented")).toBe(true);
    const batch4Tasks = exam100.systemBacklog.filter((task) => String(task.id || "").startsWith("batch4-"));
    expect(batch4Tasks).toHaveLength(8);
    expect(batch4Tasks.reduce((sum, task) => sum + task.minutes, 0)).toBe(220);
    expect(batch4Tasks.every((task) => task.status === "implemented")).toBe(true);
    const batch5Tasks = exam100.systemBacklog.filter((task) => String(task.id || "").startsWith("batch5-"));
    expect(batch5Tasks).toHaveLength(6);
    expect(batch5Tasks.reduce((sum, task) => sum + task.minutes, 0)).toBe(140);
    expect(batch5Tasks.every((task) => task.status === "implemented")).toBe(true);
    const batch6Tasks = exam100.systemBacklog.filter((task) => String(task.id || "").startsWith("batch6-"));
    expect(batch6Tasks).toHaveLength(8);
    expect(batch6Tasks.reduce((sum, task) => sum + task.minutes, 0)).toBe(360);
    expect(batch6Tasks.every((task) => task.status === "implemented")).toBe(true);
    exam100.closedRoutes.forEach((route) => {
      expect(route.gateType).toBeTruthy();
      expect(route.passingScore).toBeGreaterThanOrEqual(70);
      expect(route.requiredActions.length).toBeGreaterThanOrEqual(3);
    });
    expect(exam100.systemBacklog.find((task) => task.id === "exam100-fill-ambiguity-cleanup").status).toBe("implemented");
    expect(exam100.systemBacklog.find((task) => task.id === "exam100-innerhtml-allowlist").status).toBe("implemented");
    expect(exam100.systemBacklog.find((task) => task.id === "exam100-placement-tests").status).toBe("implemented");
    expect(exam100.systemBacklog.find((task) => task.id === "exam100-closed-path-tests").status).toBe("implemented");
    expect(exam100.systemBacklog.find((task) => task.id === "exam100-autosave-ui-tests").status).toBe("implemented");
    expect(exam100.systemBacklog.find((task) => task.id === "exam100-modular-entry").status).toBe("implemented");
    expect(exam100.systemBacklog.find((task) => task.id === "exam100-release-gates").status).toBe("implemented");
    expect(exam100.systemBacklog.filter((task) => task.status === "remaining").reduce((sum, task) => sum + task.minutes, 0)).toBe(0);
  });

  it("loads the 73-section exam task tree into the portal study plan", () => {
    const context = loadContext();
    const mode = context.HOMEWORK_EXAM_MODE;
    const tree = mode.examTaskTree;

    expect(tree.totalSections).toBe(73);
    expect(tree.branches).toHaveLength(7);
    expect(tree.studyTasks).toHaveLength(7);
    expect(tree.studyMinutes).toBe(335);
    expect(tree.promotionPolicy.passScore).toBe(100);
    expect(tree.promotionPolicy.manualReviewRule).toContain("manual_review");
    expect(tree.assumptions).toEqual(expect.arrayContaining([
      expect.stringContaining("fake data"),
      expect.stringContaining("וידאו ללא תמלול"),
    ]));
    expect(tree.branches[0].id).toBe("frontend_ui_validation");
    expect(mode.masterPlan.remainingTimePlan.summary.map((item) => item.label)).toContain("אימון עץ 73 סעיפי מבחן");
  });

  it("ships a local completion tracker for the master plan UI", () => {
    const appSource = fs.readFileSync(path.join(ROOT, "app.js"), "utf8");
    const indexSource = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
    const viewSource = fs.readFileSync(path.join(ROOT, "src/views/homework-exam-mode-view.js"), "utf8");
    const cssSource = fs.readFileSync(path.join(ROOT, "style.css"), "utf8");
    const siteTreeSource = fs.readFileSync(path.join(ROOT, "data/site_navigation_tree.js"), "utf8");

    expect(appSource).toContain("renderHomeworkExamModeView");
    expect(appSource).toContain("EXAM_FOCUS_ALLOWED_TABS");
    expect(appSource).toContain("SVCOLLEGE_SITE_TREE");
    expect(appSource).toContain("renderWelcomePortalTree");
    expect(appSource).toContain("data-portal-tab");
    expect(appSource).toContain("עץ הפורטל לפי 70/20/10");
    expect(appSource).toContain("applyExamFocusGate");
    expect(appSource).toContain("exam-focus-out-of-scope");
    expect(appSource).toContain("exam-focus-route-banner");
    expect(appSource).toContain("inScopeCount");
    expect(appSource).toContain("outOfScopeCount");
    expect(appSource).toContain("הועברו לעץ מתקדם");
    expect(appSource).toContain("data-exam-focus-advanced-toggle");
    expect(appSource).toContain("show-advanced-tabs");
    expect(appSource).toContain('initialTabFromUrl === "mock-exam"');
    expect(appSource).toContain("openMockExam();");
    expect(viewSource).toContain("lumenportal:homeworkExamPlanProgress:v1");
    expect(indexSource).toContain("welcome-tree-shell");
    expect(indexSource).toContain("עץ המדריכים הפרקטיים");
    expect(indexSource).toContain("עץ הפורטל");
    expect(indexSource).toContain("output/svcollege-practical-guides/start_here.html");
    expect(indexSource).toContain("output/svcollege-practical-guides/guide_01_ideas.html");
    expect(indexSource).toContain("output/svcollege-practical-guides/guide_02_homework_and_exam_drills.html");
    expect(indexSource).toContain("output/svcollege-practical-guides/guide_03_exam_day_runbook.html");
    expect(indexSource).toContain("output/svcollege-practical-guides/one_page_exam_cheatsheet.html");
    expect(indexSource).toContain("output/svcollege-practical-guides/forward_tasks_plan.html");
    expect(indexSource).toContain("output/svcollege-practical-guides/study_path_37h45.html");
    expect(indexSource).toContain("output/svcollege-practical-guides/progress_tracker.html");
    expect(indexSource).toContain("data/site_navigation_tree.js");
    expect(indexSource).toContain("data/exam_tasks_tree.js?v=exam-tasks-tree-v1");
    expect(indexSource).toContain("data/solution_guide_drills.js?v=solution-guide-drills-v1");
    expect(indexSource).toContain("data-site-tree-root");
    expect(indexSource).toContain('<body class="exam-focus-mode">');
    expect(indexSource).toContain('data-portal-tab="mock-exam"');
    expect(siteTreeSource).toContain('["blueprints", "יישור SVCollege"');
    expect(siteTreeSource).toContain('["programming-museum", "מוזיאון"');
    expect(viewSource).toContain("lumenportal:homeworkExamBasicDiagnostic:v1");
    expect(viewSource).toContain("lumenportal:homeworkExamGateEvidence:v1");
    expect(viewSource).toContain("lumenportal:exam100Path:v1");
    expect(viewSource).toContain("renderExam100Path");
    expect(viewSource).toContain("renderExamTaskTree");
    expect(viewSource).toContain("renderSolutionGuideDrills");
    expect(viewSource).toContain("hxm-solution-guide-drills");
    expect(viewSource).toContain("חוברת פתרונות 4 מבחנים - מפת תרגול שחולצה");
    expect(viewSource).toContain("פתח חוברת");
    expect(viewSource).toContain("לראות את מפת הפתרונות שחולצה");
    expect(viewSource).toContain("data-solution-guide-exam");
    expect(viewSource).toContain("data-solution-guide-js");
    expect(viewSource).toContain("scroll-hxm-solution-guide");
    expect(viewSource).toContain("data-exam-task-tree");
    expect(viewSource).toContain("פורטל משימות מבחן");
    expect(viewSource).toContain("data-exam-task-technical-task");
    expect(viewSource).toContain("manual_review locked");
    expect(viewSource).toContain("examTaskTree");
    expect(viewSource).toContain("updateExam100Path");
    expect(viewSource).toContain("exam100ClosedStages");
    expect(viewSource).toContain("hxm-exam100-journey");
    expect(viewSource).toContain("כתר 100");
    expect(viewSource).toContain("exam100RuntimeSaveMode");
    expect(viewSource).toContain("hxm-advanced-library");
    expect(viewSource).toContain("ספרייה מתקדמת - לא חלק מהמסלול הסגור");
    expect(viewSource).toContain("data-exam100-path-next");
    expect(viewSource).toContain("data-exam100-path-prev");
    expect(viewSource).toContain("data-exam100-save-mode");
    expect(viewSource).toContain("אין תפריט בחירה בתוך המסלול");
    expect(viewSource).toContain("שמירה מקומית בלבד");
    expect(viewSource).toContain("אופליין - נשמר מקומית");
    expect(viewSource).toContain("exam100LevelFor");
    expect(viewSource).toContain("data-exam100-save-status");
    expect(viewSource).toContain("exam100GateStatus");
    expect(viewSource).toContain("currentRouteId");
    expect(viewSource).toContain("currentStepIndex");
    expect(viewSource).toContain("currentPathIndex");
    expect(viewSource).toContain("gateStatus");
    expect(viewSource).toMatch(/container\.innerHTML\s*=\s*sanitizeHtml\(\s*exam100Rows/);
    expect(viewSource).toContain("var advancedRows =");
    expect(viewSource).toContain("startHereRows +");
    expect(viewSource).toContain("examOnlyRows +");
    expect(viewSource).toContain("basicDiagnosticRows +");
    expect(viewSource).toContain("SVCollege 100 במבחן");
    expect(viewSource).toContain("חץ אחורה וחץ קדימה");
    expect(viewSource).toContain("שמירה נכשלה");
    expect(viewSource).toContain("materialCompletionTasks");
    expect(viewSource).toContain("data-hxm-material-task");
    expect(viewSource).toContain("data-hxm-material-task-progress");
    expect(viewSource).toContain("Backlog השלמת חומרים לפי דוח המשך");
    expect(viewSource).toContain("renderStartHereHeatPanel");
    expect(viewSource).toContain("renderExamOnlyMode");
    expect(viewSource).toContain("hxm-exam-only-mode");
    expect(viewSource).toContain("Exam Only Mode פעיל");
    expect(viewSource).toContain("data-hxm-exam-relevance");
    expect(viewSource).toContain("מה עושים כשחלק ריק?");
    expect(viewSource).toContain("renderCodeExplanationQuality");
    expect(viewSource).toContain("codeExplanationAudit");
    expect(viewSource).toContain("hxm-code-quality");
    expect(viewSource).toContain("איכות הסברי קוד בעברית");
    expect(viewSource).toContain("scroll-hxm-exam-only");
    expect(viewSource).toContain("scroll-hxm-code-quality");
    expect(viewSource).toContain("renderTodayCommandPanel");
    expect(viewSource).toContain("todayCommandFor");
    expect(viewSource).toContain("updateTodayCommand");
    expect(viewSource).toContain("renderRemainingTimePlan");
    expect(viewSource).toContain("renderExam100EntryGateway");
    expect(viewSource).toContain("data-hxm-entry-gateway");
    expect(viewSource).toContain("פורטל הלימודים: HTML");
    expect(viewSource).toContain("lesson_html_css_foundations");
    expect(viewSource).not.toContain("renderExam100FullReadinessBoard");
    expect(viewSource).toContain("timePlanState");
    expect(viewSource).toContain("updateRemainingTimePlan");
    expect(viewSource).not.toContain("data-exam100-full-readiness");
    expect(viewSource).toContain("hxm-time-plan-primary");
    expect(viewSource).toContain("data-hxm-primary-task-board");
    expect(viewSource).toContain("scroll-hxm-time-plan");
    expect(viewSource).toContain("open-html-portal");
    expect(viewSource).toContain("פתח HTML");
    expect(viewSource).toContain("data-hxm-time-required-percent");
    expect(viewSource).toContain("data-hxm-time-task-row");
    expect(viewSource).toContain("לוח זמנים מדויק לכל המשימות שנותרו");
    expect(viewSource).toContain("חובה להכנה מושלמת");
    expect(viewSource).toContain("data-hxm-today-command");
    expect(viewSource).toContain("מה עושים עכשיו");
    expect(viewSource).toContain("כרטיס אחד בלבד");
    expect(viewSource).toContain("חסום עכשיו");
    expect(viewSource).toContain("scroll-hxm-material-backlog");
    expect(viewSource).toContain('id=\\"hxm-material-backlog\\"');
    expect(viewSource).toContain("renderGuidedExamPath");
    expect(viewSource).toContain("guidedExamStages");
    expect(viewSource).toContain("updateGuidedExamPath");
    expect(viewSource).toContain("diagnosticGateFor");
    expect(viewSource).toContain("renderDiagnosticGate");
    expect(viewSource).toContain("data-hxm-gate-pass");
    expect(viewSource).toContain("data-hxm-gate-evidence");
    expect(viewSource).toContain("data-hxm-gate-evidence-status");
    expect(viewSource).toContain("getGateEvidence");
    expect(viewSource).toContain("setGateEvidence");
    expect(viewSource).toContain("חובה לכתוב ראיה קצרה לפני סימון מעבר");
    expect(viewSource).toContain("חסר: כתוב ראיה אמיתית");
    expect(viewSource).toContain("data-hxm-basic-reset");
    expect(viewSource).toContain("איפוס אבחון בסיס וראיות Gate");
    expect(viewSource).toContain("בדיקת מעבר JS 20");
    expect(viewSource).toContain("עברתי בדיקת מעבר");
    expect(viewSource).toContain("renderBasicDiagnosticTracks");
    expect(viewSource).toContain("renderCodeExplainBox");
    expect(viewSource).toContain("renderCodeBlockWithExplanation");
    expect(viewSource).toContain("deriveHebrewLineByLine");
    expect(viewSource).toContain("explainCodeLine");
    expect(viewSource).toContain("מייבאת תלות");
    expect(viewSource).toContain("יוצר state מקומי");
    expect(viewSource).toContain("מגדיר endpoint ב-Express");
    expect(viewSource).toContain("שולח בקשת HTTP");
    expect(viewSource).toContain("מגדירה שדה בתוך טיפוס");
    expect(viewSource).toContain("ערך ההתחלה של accumulator");
    expect(viewSource).toContain("בדיקת מבחן: הסבר בקול");
    expect(viewSource).toContain("hxm-start-here");
    expect(viewSource).toContain("hxm-basic-diagnostic");
    expect(viewSource).toContain("hxm-guided-path");
    expect(viewSource).toContain("data-hxm-guided-stage");
    expect(viewSource).toContain("data-hxm-guided-button");
    expect(viewSource).toContain("הצעד הבא עכשיו");
    expect(viewSource).toContain("אבחון בסיס → תיקון חולשות → Project 70");
    expect(viewSource).toContain("data-hxm-heat");
    expect(viewSource).toContain("data-hxm-basic-check");
    expect(viewSource).toContain("data-hxm-basic-percent");
    expect(viewSource).toContain("אבחון בסיס סגור");
    expect(viewSource).toContain("הסבר הקוד בעברית");
    expect(viewSource).toContain("החיזוק הבא");
    expect(viewSource).toContain("Heat 10 -> 1");
    expect(viewSource).toContain("כיסוי חומר חשוב למבחן");
    expect(viewSource).toContain("הווידאו ללא תמלול");
    expect(viewSource).toContain("scroll-hxm-basic-diagnostic");
    expect(viewSource).toContain("scroll-hxm-coverage");
    expect(viewSource).toContain("scroll-hxm-red-zone");
    expect(viewSource).toContain("data-hxm-plan-task");
    expect(viewSource).toContain("data-hxm-progress-percent");
    expect(viewSource).toContain("המשימה הבאה");
    expect(viewSource).toContain("data-hxm-time-next-card");
    expect(viewSource).toContain("focus-next-time-task");
    expect(viewSource).toContain("data-hxm-start-wizard");
    expect(viewSource).toContain("סדר ביצוע סגור");
    expect(viewSource).toContain("renderTimePlanLinkAudit");
    expect(viewSource).toContain("data-hxm-link-audit");
    expect(viewSource).toContain("בדיקת יעדים לכל משימה");
    expect(viewSource).toContain("סמן V למשימת אתר ועץ");
    expect(viewSource).toContain("aria-live=\\\"polite\\\"");
    expect(viewSource).toContain("data-hxm-domain");
    expect(viewSource).toContain("data-hxm-day-progress");
    expect(viewSource).toContain("start-homework-mock");
    expect(viewSource).toContain("scroll-hxm-templates");
    expect(viewSource).toContain("scroll-hxm-js");
    expect(viewSource).toContain("scroll-hxm-ts");
    expect(viewSource).toContain("scrollToExamSection");
    expect(viewSource).toContain("hxm-template-list");
    expect(viewSource).toContain("hxm-js-bank");
    expect(viewSource).toContain("hxm-ts-bank");
    expect(viewSource).toContain("Coverage Dashboard");
    expect(viewSource).toContain("hxm-coverage-dashboard");
    expect(viewSource).toContain("buildExamMaterialGapReport");
    expect(viewSource).toContain("renderExamMaterialGapReport");
    expect(viewSource).toContain("hxm-material-gaps");
    expect(viewSource).toContain("data-hxm-open-lesson");
    expect(viewSource).toContain("חוסרי חומר לפי שיעור");
    expect(viewSource).toContain("Exam Day Mode");
    expect(viewSource).toContain("בדוק את הפרויקט שלי");
    expect(viewSource).toContain("JS 20 Trainer");
    expect(viewSource).toContain("TS 10 Trainer");
    expect(viewSource).toContain("מסלולים סגורים");
    expect(viewSource).toContain("אזור אדום");
    expect(viewSource).toContain("hxm-red-zone");
    expect(viewSource).toContain("redZoneItems");
    expect(viewSource).toContain("hxm-closed-tracks");
    expect(viewSource).toContain("hxm-track-card");
    expect(viewSource.indexOf("startHereRows +")).toBeGreaterThan(-1);
    expect(viewSource.indexOf("startHereRows +")).toBeLessThan(viewSource.indexOf("todayCommandRows +"));
    expect(viewSource.indexOf("todayCommandRows +")).toBeGreaterThan(-1);
    expect(viewSource.indexOf("todayCommandRows +")).toBeLessThan(viewSource.indexOf("guidedExamRows +"));
    expect(viewSource.indexOf("fullReadinessRows +")).toBeGreaterThan(-1);
    expect(viewSource.indexOf("fullTaskListRows +")).toBeGreaterThan(-1);
    expect(viewSource.indexOf("guidedExamRows +")).toBeGreaterThan(-1);
    expect(viewSource.indexOf("guidedExamRows +")).toBeLessThan(viewSource.indexOf("basicDiagnosticRows +"));
    expect(viewSource.indexOf("basicDiagnosticRows +")).toBeGreaterThan(-1);
    expect(viewSource.indexOf("basicDiagnosticRows +")).toBeLessThan(viewSource.indexOf("closedTrackRows +"));
    expect(viewSource.indexOf("closedTrackRows +")).toBeGreaterThan(-1);
    expect(viewSource.indexOf("closedTrackRows +")).toBeLessThan(viewSource.indexOf("coverageRows +"));
    expect(viewSource.match(/heat: /g).length).toBeGreaterThanOrEqual(10);
    expect(viewSource).toContain("heat: 10");
    expect(viewSource).toContain("heat: 1");
    expect(viewSource).toContain('id=\\"hxm-coverage-dashboard\\"');
    expect(cssSource).toContain(".hxm-progress-card");
    expect(cssSource).toContain(".welcome-tree-shell");
    expect(cssSource).toContain(".welcome-tree-branch.low-priority");
    expect(cssSource).toContain(".site-map-tab-branch.low-priority");
    expect(cssSource).toContain(".hxm-exam100");
    expect(cssSource).toContain(".hxm-practical-guides");
    expect(cssSource).toContain(".hxm-practical-guide-grid");
    expect(cssSource).toContain(".hxm-exam100-current-step");
    expect(cssSource).toContain(".hxm-exam-task-tree");
    expect(cssSource).toContain(".hxm-arrow-btn");
    expect(cssSource).toContain(".hxm-exam100-route.active");
    expect(cssSource).toContain(".hxm-start-here");
    expect(cssSource).toContain(".hxm-today-command");
    expect(cssSource).toContain(".hxm-today-blocked");
    expect(cssSource).toContain(".hxm-time-plan");
    expect(cssSource).toContain(".hxm-exam-entry-gateway");
    expect(cssSource).toContain(".hxm-entry-card.diagnostic");
    expect(cssSource).toContain(".hxm-entry-card.learning");
    expect(cssSource).toContain(".hxm-entry-wizard");
    expect(cssSource).toContain(".hxm-link-audit");
    expect(cssSource).not.toContain(".hxm-exam100-full-readiness");
    expect(cssSource).not.toContain(".hxm-exam100-full-cards");
    expect(cssSource).toContain(".hxm-time-task");
    expect(cssSource).toContain(".hxm-time-metrics");
    expect(cssSource).toContain(".hxm-exam-only-mode");
    expect(cssSource).toContain(".hxm-exam-relevance-row.blocked");
    expect(cssSource).toContain(".hxm-code-quality");
    expect(cssSource).toContain(".hxm-guided-path");
    expect(cssSource).toContain(".hxm-guided-stage.locked");
    expect(cssSource).toContain(".hxm-guided-stage-grid");
    expect(cssSource).toContain(".hxm-diagnostic-gate");
    expect(cssSource).toContain(".hxm-gate-checklist");
    expect(cssSource).toContain(".hxm-gate-evidence");
    expect(cssSource).toContain(".hxm-gate-evidence-status");
    expect(cssSource).toContain(".hxm-heat-row");
    expect(cssSource).toContain(".hxm-start-verdict");
    expect(cssSource).toContain(".hxm-execution-panel");
    expect(cssSource).toContain(".hxm-domain-card");
    expect(cssSource).toContain(".hxm-day-task");
    expect(cssSource).toContain(".hxm-material-task-grid");
    expect(cssSource).toContain(".hxm-material-task-card");
    expect(cssSource).toContain(".hxm-material-task");
    expect(cssSource).toContain(".hxm-coverage-row");
    expect(cssSource).toContain(".hxm-material-gap-row");
    expect(cssSource).toContain(".hxm-exam-day-mode");
    expect(cssSource).toContain(".hxm-section-pulse");
    expect(cssSource).toContain(".hxm-red-zone");
    expect(cssSource).toContain(".hxm-basic-diagnostic");
    expect(cssSource).toContain(".hxm-basic-track");
    expect(cssSource).toContain(".hxm-basic-check");
    expect(cssSource).toContain(".hxm-basic-actions");
    expect(cssSource).toContain(".km-btn-mini.danger");
    expect(cssSource).toContain(".hxm-code-explain");
    expect(cssSource).toContain(".exam-focus-route-banner");
    expect(cssSource).toContain(".exam-focus-route-banner button");
    expect(cssSource).toContain(".top-tab.exam-focus-out-of-scope");
    expect(cssSource).toContain(".top-tab.exam-focus-out-of-scope:not(.active)");
    expect(cssIncludes(cssSource, '.top-tab[data-tab="programming-museum"]:not(.active)')).toBe(true);
    expect(cssIncludes(cssSource, ".left-action-bar #lab-view")).toBe(true);
    expect(cssSource).toContain(".hxm-track-card");
    expect(cssSource).toContain(".hxm-exam100-journey-track");
  });

  it("keeps the home portal tree buttons mapped to existing top tabs", () => {
    const indexSource = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
    const context = { window: {} };
    context.window.window = context.window;
    runFile("data/site_navigation_tree.js", context.window);
    const topTabIds = new Set(
      [...indexSource.matchAll(/class="top-tab[^"]*"[^>]*data-tab="([^"]+)"/g)].map((match) => match[1]),
    );
    const portalTargets = context.window.SVCOLLEGE_SITE_TREE.flatMap((group) => group.tabs.map((tab) => tab[0]));
    const missing = portalTargets.filter((target) => !topTabIds.has(target));
    const uniqueTargets = new Set(portalTargets);
    const missingFromHomeTree = [...topTabIds].filter((target) => !uniqueTargets.has(target));

    expect(portalTargets.length).toBe(23);
    expect(uniqueTargets.size).toBe(23);
    expect(missing).toEqual([]);
    expect(missingFromHomeTree).toEqual([]);
    expect(portalTargets).toEqual(expect.arrayContaining([
      "mock-exam",
      "blueprints",
      "capstones",
      "codeblocks",
      "trace",
      "comparator",
      "gap-matrix",
      "learning-evidence",
      "programming-museum",
      "reward-store",
      "anatomy",
      "home",
    ]));
  });

  it("registers the homework build and TS questions into the live banks", () => {
    const context = loadContext();
    const buildIds = context.QUESTIONS_BUILD.map((item) => item.id);
    const fillIds = context.QUESTIONS_BANK.fill.map((item) => item.id);

    context.HOMEWORK_EXAM_BUILD_QUESTIONS.forEach((build) => {
      expect(buildIds).toContain(build.id);
      expect(build.sourceGroup).toBe("homework_exam_mode");
      expect(build.scorePoints).toBe(70);
    });
    context.HOMEWORK_EXAM_JS_BUILD_QUESTIONS.forEach((build) => {
      expect(buildIds).toContain(build.id);
      expect(build.homeworkQuestionRole).toBe("javascript_followup");
      expect(build.scorePoints).toBe(20);
    });
    context.HOMEWORK_EXAM_TS_FILL_QUESTIONS.forEach((question) => {
      expect(fillIds).toContain(question.id);
      expect(question.homeworkQuestionRole).toBe("typescript_followup");
      expect(question.scorePoints).toBe(10);
    });
  });

  it("keeps reference solutions aligned with their checklist regexes", () => {
    const context = loadContext();

    [...context.HOMEWORK_EXAM_BUILD_QUESTIONS, ...context.HOMEWORK_EXAM_JS_BUILD_QUESTIONS].forEach((build) => {
      build.tests.forEach((assertion) => {
        const regex = new RegExp(assertion.regex, assertion.flags || "");
        expect(regex.test(build.reference), `${build.id} should match ${assertion.regex}`).toBe(true);
      });
    });
  });

  it("includes the screenshot JS drill with the expected grouping behavior", () => {
    const context = loadContext();
    const drill = context.HOMEWORK_EXAM_MODE.jsDrills.find((item) => item.id === "js_digit_length_sum");

    expect(drill.input).toEqual([1, 15, 30, 5, 800]);
    expect(drill.expected).toEqual({ "1": 6, "2": 45, "3": 800 });
    expect(drill.checklist).toEqual(expect.arrayContaining(["reduce", "typeof number", "Number.isNaN"]));

    const drillContext = { input: drill.input, result: null };
    vm.runInNewContext(
      `${drill.reference}\nresult = sumByDigitLength(input);`,
      drillContext,
      { filename: "homework-js-drill.vm.js" },
    );
    expect(drillContext.result).toEqual(drill.expected);
  });

  it("does not introduce native nondeterminism or fabricated-source markers", () => {
    const source = fs.readFileSync(path.join(ROOT, DATA_FILE), "utf8");
    const forbiddenNativeRandom = ["Math", "random"].join(".");
    const forbiddenUuid = ["crypto", "randomUUID"].join(".");
    const forbiddenDateNow = ["Date", "now"].join(".");

    expect(source.includes(forbiddenNativeRandom)).toBe(false);
    expect(source.includes(forbiddenUuid)).toBe(false);
    expect(source.includes(forbiddenDateNow)).toBe(false);
    expect(source.includes("lorem")).toBe(false);
  });
});
