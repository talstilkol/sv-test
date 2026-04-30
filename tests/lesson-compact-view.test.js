const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

describe("lesson compact views", () => {
  const html = read("index.html");
  const app = read("app.js");
  const css = read("style.css");

  it("adds a persisted lesson display mode switcher", () => {
    expect(app).toContain('const LESSON_COMPACT_MODE_KEY = "lumenportal:lessonCompactMode:v1"');
    expect(app).toContain('const DEFAULT_LESSON_COMPACT_MODE = "one-line"');
    expect(app).toContain("const LESSON_COMPACT_MODES");
    expect(app).toContain('full: { label: "מלא"');
    expect(app).toContain('"one-line": { label: "שורה אחת"');
    expect(app).toContain('comparisons: { label: "השוואות"');
    expect(app).toContain("function setLessonCompactMode");
    expect(app).toContain("function renderLessonCompactToolbar");
    expect(app).toContain('data-lesson-compact-mode="${esc(mode)}"');
  });

  it("renders a clean one-line concept overview for the whole lesson", () => {
    expect(app).toContain("function renderLessonOneLineOverview");
    expect(app).toContain("מושגי השיעור בשורה אחת");
    expect(app).toContain("conceptSprintOneLine(concept)");
    expect(app).toContain('class="lesson-compact-row"');
    expect(app).toContain('data-lesson-compact-open="${esc(concept.conceptName)}"');
    expect(app).toContain("if (lessonCompactMode === \"one-line\" || lessonCompactMode === \"comparisons\")");
  });

  it("renders comparison-only lesson overview when comparison tables exist", () => {
    expect(app).toContain("function renderLessonComparisonOverview");
    expect(app).toContain("renderConceptSprintComparison(concept, { open: true })");
    expect(app).toContain("השוואות נקיות");
    expect(app).toContain('class="lesson-comparison-card"');
    expect(app).toContain('data-lesson-compact-open="${esc(item.concept.conceptName)}"');
    expect(app).toContain("אין עדיין טבלאות השוואה נקיות");
  });

  it("opens the full concept card from compact rows without a separate button", () => {
    expect(app).toContain("lessonBody.querySelectorAll(\"[data-lesson-compact-open]\")");
    expect(app).toContain("selectedConceptByLesson[lesson.id] = conceptName");
    expect(app).toContain('setLessonCompactMode("full")');
    expect(app).toContain("scrollIntoView({ behavior: \"smooth\", block: \"start\" })");
    expect(app).toContain('event.key !== "Enter" && event.key !== " "');
  });

  it("styles the compact lesson controls and cards", () => {
    [
      ".lesson-compact-toolbar",
      ".lesson-compact-tab",
      ".lesson-compact-tab.active",
      ".lesson-compact-panel",
      ".lesson-compact-row",
      ".lesson-compact-row:hover",
      ".lesson-comparison-card",
      ".lesson-comparison-title:focus-visible",
      ".lesson-compact-empty",
    ].forEach((selector) => expect(css).toContain(selector));
  });

  it("moves lesson display and concept actions into a side rail", () => {
    expect(app).toContain("function renderLessonControlRail");
    expect(app).toContain('class="lesson-control-rail"');
    expect(app).toContain('data-page-section="תצוגה ופעולות"');
    expect(app).toContain('class="concept-actions concept-actions-rail"');
    expect(app).toContain("${renderLessonControlRail(actionButtonsHTML)}");
    expect(css).toContain(".lesson-concept-shell");
    expect(css).toContain(".lesson-control-rail");
    expect(css).toContain(".concept-actions-rail .concept-btn");
  });

  it("moves concept learning steps into the left display menu", () => {
    expect(html).toContain('id="vm-concept-parts"');
    expect(html).toContain('id="vm-concept-parts-section"');
    expect(app).toContain("let selectedConceptStepByConcept = {}");
    expect(app).toContain("function renderConceptStepTabs");
    expect(app).toContain("function renderConceptStep");
    expect(app).toContain("function updateViewModeConceptParts");
    expect(app).toContain("window.viewModeRenderConceptParts = renderConceptParts");
    expect(app).toContain("updateViewModeConceptParts(lastRenderedConceptStepTabsHTML)");
    expect(app).toContain('document.querySelectorAll("[data-concept-step-tab]")');
    expect(app).toContain('class="concept-step-panel');
    expect(app).toContain('class="concept-step-tab');
    expect(app).toContain('data-concept-step-tab="${esc(step.id)}"');
    expect(app).toContain('data-concept-step="${esc(id)}"');
    expect(app).toContain('data-page-section="${esc(title)}"');
    expect(app).toContain("selectedConceptStepByConcept[stepStateKey] = stepId");
    expect(app).toContain('"definition",');
    expect(app).toContain('"diagram",');
    expect(app).toContain('"analogy",');
    expect(app).toContain('"code",');
    expect(app).toContain('"questions",');
    expect(css).toContain(".concept-step-panel");
    expect(css).toContain(".concept-step-tabs");
    expect(css).toContain(".concept-step-tab.active");
    expect(css).toContain(".concept-step-panel > header");
    expect(css).toContain(".vm-concept-parts");
    expect(css).toContain(".vm-concept-parts .concept-step-tabs");
  });

  it("adds a left scroll rail for in-page lesson sections", () => {
    expect(html).toContain('id="page-scroll-rail"');
    expect(app).toContain('const pageScrollRail = document.getElementById("page-scroll-rail")');
    expect(app).toContain("function refreshPageScrollRail");
    expect(app).toContain("function updatePageScrollRail");
    expect(app).toContain('class="page-scroll-progress"');
    expect(app).toContain('progress.textContent = `${pct}%`');
    expect(app).toContain('data-page-scroll-target="${esc(id)}"');
    expect(app).toContain("pageScrollRail.hidden = false");
    expect(css).toContain(".page-scroll-rail");
    expect(css).toContain(".page-scroll-progress");
    expect(css).toContain(".page-scroll-dot.active");
  });

  it("adds in-lesson concept and next-lesson navigation", () => {
    expect(app).toContain("function renderLessonConceptNavigator");
    expect(app).toContain('class="lesson-concept-navigator"');
    expect(app).toContain('data-lesson-concept-jump="${esc(concept.conceptName)}"');
    expect(app).toContain('data-lesson-step="1"');
    expect(app).toContain('data-lesson-next="${esc(nextLesson.id)}"');
    expect(app).toContain("function wireLessonConceptNavigator");
    expect(app).toContain("selectedConceptByLesson[lesson.id] = nextConcept.conceptName");
    expect(css).toContain(".lesson-concept-navigator");
    expect(css).toContain(".lesson-concept-chip.active");
  });

  it("compresses lesson chrome into simple one-line tree rows", () => {
    expect(app).toContain("function renderLessonTopMenus");
    expect(app).toContain("let lessonMenuOpenState");
    expect(app).toContain('class="lesson-menu-stack"');
    expect(app).toContain('class="lesson-tree-row lesson-tree-path-row"');
    expect(app).toContain('class="lesson-tree-label"');
    expect(app).toContain('class="lesson-tree-scroll lesson-path-strip"');
    expect(app).toContain('data-lesson-menu-path');
    expect(app).toContain('data-lesson-menu-concepts');
    expect(app).toContain('data-lesson-menu-modes');
    expect(app).toContain('data-lesson-menu-toggle="concepts"');
    expect(app).toContain('data-lesson-menu-toggle="tabs"');
    expect(app).toContain("שיעור ${esc(lessonNumber)} - ${esc(lesson.title)}");
    expect(app).toContain("${esc(selectedConcept.conceptName)} (${esc(selectedIndex + 1)}/${esc(concepts.length)})");
    expect(app.indexOf('data-lesson-menu-concepts')).toBeLessThan(app.indexOf('data-lesson-menu-modes'));
    expect(app).toContain("${renderLessonTopMenus(lesson, concepts, selectedConcept)}");
    expect(app).not.toContain("data-lesson-menu-" + "steps");
    expect(app).not.toContain("lesson-step-menu-" + "strip");
    expect(app).not.toContain('<h3 class="lesson-body-title">${esc(lesson.title)}</h3>');
    expect(css).toContain(".lesson-menu-stack");
    expect(css).toContain(".lesson-tree-row");
    expect(css).toContain("grid-template-columns: minmax(5.4rem, 7rem) minmax(0, 1fr)");
    expect(css).toContain(".lesson-tree-label");
    expect(css).toContain(".lesson-tree-scroll");
    expect(css).toContain(".lesson-path-chip");
    expect(css).toContain(".lesson-tab-strip .lesson-compact-toolbar");
    expect(css).toContain("body.lesson-reading-mode .top-nav");
  });

  it("turns the top breadcrumb lesson into a clickable reopen control", () => {
    expect(app).toContain('class="site-breadcrumb-lesson"');
    expect(app).toContain('data-site-current-lesson="${esc(state.id)}"');
    expect(app).toContain('siteBreadcrumb?.addEventListener("click"');
    expect(app).toContain("openLesson(lessonId)");
    expect(css).toContain(".site-breadcrumb-lesson");
    expect(css).toContain(".site-breadcrumb-lesson:focus-visible");
  });

  it("wraps lesson questions in a collapsible numbered tab", () => {
    expect(app).toContain('class="concept-questions-panel"');
    expect(app).toContain('class="concept-questions-summary"');
    expect(app).toContain("totalQuestionStages");
    expect(app).toContain("שאלה 1 מתוך");
    expect(app).toContain("שאלה 2 מתוך");
    expect(app).toContain('class="ciq-question-count"');
    expect(css).toContain(".concept-questions-panel");
    expect(css).toContain(".concept-questions-summary");
    expect(css).toContain(".ciq-question-count");
  });

  it("adds a top lesson question bank for quick level diagnostics", () => {
    expect(app).toContain("const LESSON_QUESTION_BANK_MAX_LEVEL = 7");
    expect(app).toContain("let lessonQuestionBankState = {}");
    expect(app).toContain("let lessonQuestionBankPanelOpen = {}");
    expect(app).toContain("function lessonQuestionBankItems");
    expect(app).toContain("function renderLessonQuestionBankPanel");
    expect(app).toContain("if (!isLessonQuestionBankPanelOpen(lesson, concept)) return \"\"");
    expect(app).toContain('data-lesson-qbank-toggle');
    expect(app).toContain('data-lesson-qbank-start');
    expect(app).toContain('data-lesson-qbank-answer="${esc(index)}"');
    expect(app).toContain("רמה מהירה");
    expect(app).toContain("האבחון מתחיל מרמה 0");
    expect(app).toContain("sc.quickDiagnostic");
    expect(app).toContain('source: "lesson-question-bank"');
    expect(app.indexOf("${Object.entries(LESSON_COMPACT_MODES).map")).toBeLessThan(app.indexOf('class="lesson-compact-tab lesson-qbank-tab'));
    expect(css).toContain(".lesson-question-bank-panel");
    expect(css).toContain(".lesson-qbank-summary");
    expect(css).toContain(".lesson-qbank-option");
    expect(css).toContain(".lesson-qbank-tab.active");
  });
});
