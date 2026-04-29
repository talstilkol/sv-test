const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

describe("lesson compact views", () => {
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
});
