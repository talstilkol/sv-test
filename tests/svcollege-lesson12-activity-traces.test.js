const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");

function loadTraceContext() {
  const sandbox = { window: {}, console };
  ["data/questions_trace.js", "data/svcollege_traces_lesson12_activity.js"].forEach((file) => {
    vm.runInNewContext(fs.readFileSync(path.join(ROOT, file), "utf8"), sandbox, { filename: file });
  });
  return sandbox;
}

describe("SVCollege lesson 12 activity traces", () => {
  it("adds real trace activities for the next P6.3.1 authoring batch", () => {
    const context = loadTraceContext();
    const traces = context.window.QUESTIONS_TRACE.filter((item) => String(item.id).startsWith("trace_l12_"));
    const expectedKeys = [
      "lesson_12::יצירת מערך חדש (new array)",
      "lesson_12::יצירת מערך חדש מתוך קיים",
      "lesson_12::סינון לפי תנאי",
      "lesson_12::עבודה עם ערכים לפי אינדקס",
      "lesson_12::array",
      "lesson_12::index",
      "lesson_12::lowercase",
      "lesson_12::uppercase",
    ];

    expect(traces.map((item) => item.conceptKey)).toEqual(expectedKeys);
    traces.forEach((trace) => {
      expect(trace.id).toMatch(/^trace_l12_/);
      expect(trace.level).toBeGreaterThanOrEqual(2);
      expect(trace.code).toMatch(/\b(const|let|var)\b/);
      expect(trace.steps.length).toBeGreaterThanOrEqual(2);
      expect(trace.explanation.length).toBeGreaterThan(30);
      expect(trace.requiredConcepts).toContain(trace.conceptKey);
    });
  });

  it("loads the lesson 12 activity trace file in the browser shell and offline cache", () => {
    const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
    const sw = fs.readFileSync(path.join(ROOT, "service-worker.js"), "utf8");

    expect(html).toContain("data/svcollege_traces_lesson12_activity.js?v=lesson12-activity-v1");
    expect(sw).toContain("/data/svcollege_traces_lesson12_activity.js?v=lesson12-activity-v1");
  });
});
