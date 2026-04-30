const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");

function loadTraceContext() {
  const sandbox = { window: {}, console };
  ["data/questions_trace.js", "data/svcollege_traces_lesson13_activity.js"].forEach((file) => {
    vm.runInNewContext(fs.readFileSync(path.join(ROOT, file), "utf8"), sandbox, { filename: file });
  });
  return sandbox;
}

describe("SVCollege lesson 13 activity traces", () => {
  it("adds real trace activities for the DOM/OOP P6.3.1 authoring batch", () => {
    const context = loadTraceContext();
    const traces = context.window.QUESTIONS_TRACE.filter((item) => String(item.id).startsWith("trace_l13_"));
    const expectedKeys = [
      "lesson_13::appendChild",
      "lesson_13::attribute",
      "lesson_13::constructor",
      "lesson_13::createElement",
      "lesson_13::document",
      "lesson_13::Document Object Model",
      "lesson_13::DOM",
      "lesson_13::getElementById",
      "lesson_13::getElementsByClassName",
      "lesson_13::getElementsByTagName",
      "lesson_13::getItem",
      "lesson_13::inheritance",
      "lesson_13::innerHTML",
      "lesson_13::instance",
      "lesson_13::localStorage",
      "lesson_13::Method",
      "lesson_13::new",
      "lesson_13::Property",
      "lesson_13::querySelector",
      "lesson_13::querySelectorAll",
      "lesson_13::removeChild",
      "lesson_13::replaceChild",
      "lesson_13::sessionStorage",
      "lesson_13::setAttribute",
      "lesson_13::setItem",
      "lesson_13::style",
      "lesson_13::super",
      "lesson_13::Value",
    ];

    expect(traces.map((item) => item.conceptKey)).toEqual(expectedKeys);
    traces.forEach((trace) => {
      expect(trace.id).toMatch(/^trace_l13_/);
      expect(trace.level).toBeGreaterThanOrEqual(3);
      expect(trace.code).toMatch(/\b(const|let|var|class)\b/);
      expect(trace.steps.length).toBeGreaterThanOrEqual(2);
      expect(trace.explanation.length).toBeGreaterThan(30);
      expect(trace.requiredConcepts).toContain(trace.conceptKey);
    });
  });

  it("loads the lesson 13 activity trace file in the browser shell and offline cache", () => {
    const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
    const sw = fs.readFileSync(path.join(ROOT, "service-worker.js"), "utf8");

    expect(html).toContain("data/svcollege_traces_lesson13_activity.js?v=lesson13-activity-v2");
    expect(sw).toContain("/data/svcollege_traces_lesson13_activity.js?v=lesson13-activity-v2");
  });
});
