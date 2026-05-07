const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { cssIncludes } = require("./css-evidence.js");

const ROOT = path.resolve(__dirname, "..");

function runFile(relativePath, context) {
  vm.runInNewContext(
    fs.readFileSync(path.join(ROOT, relativePath), "utf8"),
    context,
    { filename: relativePath },
  );
}

function loadMode() {
  const context = { console };
  context.window = context;
  runFile("data/questions_bank.js", context);
  runFile("data/questions_build.js", context);
  runFile("data/homework_exam_mode.js", context);
  return context.HOMEWORK_EXAM_MODE;
}

describe("Exam 100 Path UI contract", () => {
  it("loads Exam 100 pure routing logic from a small core module before the view", () => {
    const context = {
      console,
      Date,
      navigator: { onLine: true },
      location: { protocol: "http:" },
    };
    context.window = context;
    runFile("data/questions_bank.js", context);
    runFile("data/questions_build.js", context);
    runFile("data/homework_exam_mode.js", context);
    runFile("src/views/exam100-path-core.js", context);

    const pathData = context.HOMEWORK_EXAM_MODE.exam100Path;
    expect(context.Exam100PathCore.placementQuestions(pathData)).toHaveLength(20);
    expect(context.Exam100PathCore.score(pathData, { answers: {} })).toBe(0);
    expect(context.Exam100PathCore.levelFor(pathData, 18).routeId).toBe("track-100");
    expect(context.Exam100PathCore.primaryCommand(pathData, { answers: {} }).action).toBe("scroll-exam100-placement");
  });

  it("keeps placement scoring mapped to one closed route per level", () => {
    const exam100 = loadMode().exam100Path;
    const routeIds = new Set(exam100.closedRoutes.map((route) => route.id));
    const questions = exam100.placementTest.sections.flatMap((section) => section.questions);

    expect(questions).toHaveLength(20);
    expect(exam100.placementTest.sections.map((section) => section.count)).toEqual([8, 6, 4, 2]);
    exam100.placementTest.levels.forEach((level) => {
      expect(routeIds.has(level.routeId)).toBe(true);
      expect(level.min).toBeLessThanOrEqual(level.max);
    });
  });

  it("renders a closed arrow-only route instead of secondary choice cards", () => {
    const view = fs.readFileSync(path.join(ROOT, "src/views/homework-exam-mode-view.js"), "utf8");
    const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
    const css = fs.readFileSync(path.join(ROOT, "style.css"), "utf8");

    expect(html.indexOf("src/views/exam100-path-core.js?v=exam100-path-core-v1")).toBeLessThan(html.indexOf("src/views/homework-exam-mode-view.js?v=homework-exam-mode-view-v18"));
    expect(view).toContain("window.Exam100PathCore");
    expect(view).toContain("exam100ClosedStages");
    expect(view).toContain("data-exam100-path-prev");
    expect(view).toContain("data-exam100-path-next");
    expect(view).toContain("hxm-exam100-current-step");
    expect(view).toContain("data-exam100-day-board");
    expect(view).toContain("data-exam100-lag-banner");
    expect(view).toContain("data-exam100-next-task");
    expect(view).toContain("אין תפריט בחירה בתוך המסלול");
    expect(view).not.toContain("hxm-exam100-card");
    expect(view).not.toContain("data-exam100-question");
    expect(view).not.toContain("data-exam100-skip");
    expect(css).toContain("[hidden]");
    expect(cssIncludes(css, "display: none !important")).toBe(true);
    expect(css).toContain(".hxm-arrow-btn");
    expect(css).toContain(".hxm-exam100-day-board");
    expect(css).toContain(".hxm-exam100-lag-banner.behind");
  });

  it("hides legacy portal chrome from the default closed Exam 100 route", () => {
    const css = fs.readFileSync(path.join(ROOT, "style.css"), "utf8");
    const closedMode = "body.exam-focus-mode:not(.show-advanced-tabs)";
    const hiddenChrome = [
      ".top-tabs-bar",
      ".top-nav",
      ".sidebar",
      ".context-tree-panel",
      ".achievements-rail-wrap",
      ".theme-toggle-btn",
      ".pwa-install-btn",
      ".global-print-btn",
      ".pocket-fab",
      ".view-mode-fab",
      ".ai-tutor-fab",
      "#consent-banner",
      "#onboarding-overlay",
      ".mock-exam-view #mx-templates",
      ".mock-exam-view .mx-history-block",
      ".hxm-advanced-library",
    ];

    hiddenChrome.forEach((selector) => {
      expect(cssIncludes(css, `${closedMode} ${selector}`)).toBe(true);
    });
    expect(cssIncludes(css, "display: none !important")).toBe(true);
  });

  it("keeps the home page as a simple progress map with two arrows", () => {
    const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
    const css = fs.readFileSync(path.join(ROOT, "style.css"), "utf8");

    expect(html).toContain("welcome-simple-route");
    expect(html).toContain("0% התקדמות");
    expect(html).toContain("שלב 1 מתוך 10");
    expect(html).toContain("welcome-arrow-controls");
    expect(html).toContain("← אחורה");
    expect(html).toContain("קדימה →");
    expect(html).not.toContain("פתח מדריך התחלה");
    expect(css).toContain(".welcome-simple-progress");
    expect(css).toContain(".welcome-arrow-btn.primary");
  });

  it("keeps the Exam 100 routes closed with one next action and one gate per route", () => {
    const exam100 = loadMode().exam100Path;

    expect(exam100.homeCards).toHaveLength(4);
    expect(exam100.closedRoutes).toHaveLength(4);
    exam100.closedRoutes.forEach((route) => {
      expect(route.id).toMatch(/^[a-z0-9-]+$/);
      expect(route.steps.length).toBeGreaterThanOrEqual(3);
      expect(route.gateType).toBeTruthy();
      expect(route.passingScore).toBeGreaterThanOrEqual(70);
      expect(route.requiredActions.length).toBeGreaterThanOrEqual(3);
      expect(route.nextAction).toMatch(/^(scroll-|start-|resume-)/);
      expect(route.gate).toBeTruthy();
      expect(route.gate).not.toContain("unknown");
      expect(route.gate).not.toContain("unavailable");
    });
  });

  it("documents visible save, failure, restore, and offline states", () => {
    const view = fs.readFileSync(path.join(ROOT, "src/views/homework-exam-mode-view.js"), "utf8");
    const mode = loadMode();

    expect(mode.exam100Path.saveUi.states).toEqual(expect.arrayContaining([
      "נשמר עכשיו",
      "שמירה נכשלה",
      "שחזור מפרופיל מקומי",
      "ייצוא ידני בסוף יום",
    ]));
    expect(view).toContain("data-exam100-save-status");
    expect(view).toContain("data-exam100-current-gate");
    expect(view).toContain("data-exam100-save-mode");
    expect(view).toContain("שמירה מקומית בלבד");
    expect(view).toContain("אופליין - נשמר מקומית");
    expect(view).toContain("שמירה נכשלה");
  });

  it("shows a deterministic seven-day board and lag CTA inside the closed route", () => {
    const view = fs.readFileSync(path.join(ROOT, "src/views/homework-exam-mode-view.js"), "utf8");
    const css = fs.readFileSync(path.join(ROOT, "style.css"), "utf8");

    expect(view).toContain("function exam100DayPlan()");
    expect(view).toContain("{ day: 1");
    expect(view).toContain("{ day: 7");
    expect(view).toContain("אתה בפיגור");
    expect(view).toContain("התחל את המשימה הבאה");
    expect(view).toContain("שמירה מקומית היא שחזור בלבד");
    expect(view).toContain("state.startedAt = state.startedAt || new Date().toISOString()");
    expect(css).toContain(".hxm-exam100-schedule");
    expect(css).toContain(".hxm-exam100-day-row.overdue");
  });

  it("keeps readiness data available while the visible Exam 100 Path stays closed", () => {
    const view = fs.readFileSync(path.join(ROOT, "src/views/homework-exam-mode-view.js"), "utf8");
    const css = fs.readFileSync(path.join(ROOT, "style.css"), "utf8");
    const report = loadMode().exam100Path.finalStudentReport;

    expect(report.systemScore).toBe(98);
    expect(report.materialCoveragePercent).toBe(100);
    expect(report.questionCoveragePercent).toBe(100);
    expect(report.examGaps).toBe(0);
    expect(view).toContain("hxm-exam100-current-step");
    expect(view).toContain("hxm-exam100-plan-lanes");
    expect(view).toContain("hxm-advanced-library");
    expect(view).toContain("data-exam100-path-prev");
    expect(view).toContain("data-exam100-path-next");
    expect(view).not.toContain("hxm-exam100-final-report");
    expect(css).toContain(".hxm-exam100-current-step");
    expect(css).toContain(".hxm-exam100-plan-lanes");
    expect(css).toContain(".hxm-advanced-library");
  });
});
