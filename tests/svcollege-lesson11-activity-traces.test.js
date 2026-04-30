const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");

function loadTraceContext() {
  const sandbox = { window: {}, console };
  ["data/questions_trace.js", "data/svcollege_traces_lesson11_activity.js"].forEach((file) => {
    vm.runInNewContext(fs.readFileSync(path.join(ROOT, file), "utf8"), sandbox, { filename: file });
  });
  return sandbox;
}

describe("SVCollege lesson 11 activity traces", () => {
  it("adds real trace activities for the first two P6.3.1 authoring batches", () => {
    const context = loadTraceContext();
    const traces = context.window.QUESTIONS_TRACE.filter((item) => String(item.id).startsWith("trace_l11_"));
    const expectedKeys = [
      "lesson_11::arrow function",
      "lesson_11::boolean",
      "lesson_11::By Value",
      "lesson_11::filter",
      "lesson_11::find",
      "lesson_11::forEach",
      "lesson_11::Index",
      "lesson_11::map",
      "lesson_11::number",
      "lesson_11::object",
      "lesson_11::Pointer",
      "lesson_11::pop",
      "lesson_11::push",
      "lesson_11::shift",
      "lesson_11::sort",
      "lesson_11::splice",
      "lesson_11::spread",
      "lesson_11::string",
      "lesson_11::toString",
      "lesson_11::undefined",
      "lesson_11::unshift",
      "lesson_11::var",
    ];

    expect(traces.map((item) => item.conceptKey)).toEqual(expectedKeys);
    traces.forEach((trace) => {
      expect(trace.id).toMatch(/^trace_l11_/);
      expect(trace.level).toBeGreaterThanOrEqual(2);
      expect(trace.code).toMatch(/\b(const|let|var)\b/);
      expect(trace.steps.length).toBeGreaterThanOrEqual(2);
      expect(trace.explanation.length).toBeGreaterThan(30);
      expect(trace.requiredConcepts).toContain(trace.conceptKey);
    });
  });

  it("loads the lesson 11 activity trace file in the browser shell and offline cache", () => {
    const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
    const sw = fs.readFileSync(path.join(ROOT, "service-worker.js"), "utf8");

    expect(html).toContain("data/svcollege_traces_lesson11_activity.js?v=lesson11-activity-v1");
    expect(sw).toContain("/data/svcollege_traces_lesson11_activity.js?v=lesson11-activity-v1");
  });
});
