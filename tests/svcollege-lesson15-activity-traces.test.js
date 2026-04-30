const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");

function loadTraceContext() {
  const sandbox = { window: {}, console };
  ["data/questions_trace.js", "data/svcollege_traces_lesson15_activity.js"].forEach((file) => {
    vm.runInNewContext(fs.readFileSync(path.join(ROOT, file), "utf8"), sandbox, { filename: file });
  });
  return sandbox;
}

describe("SVCollege lesson 15 activity traces", () => {
  it("adds real trace activities for the Error/Promise P6.3.1 authoring batch", () => {
    const context = loadTraceContext();
    const expectedKeys = [
      "lesson_15::anonymous function",
      "lesson_15::catch",
      "lesson_15::catch (Promise)",
      "lesson_15::Error",
      "lesson_15::Error Object",
      "lesson_15::Exception",
      "lesson_15::fetch",
      "lesson_15::reject",
      "lesson_15::resolve",
      "lesson_15::Scope",
      "lesson_15::setTimeout",
      "lesson_15::Synchronous",
      "lesson_15::then",
      "lesson_15::throw",
    ];
    const traces = context.window.QUESTIONS_TRACE.filter((item) => expectedKeys.includes(item.conceptKey));

    expect(traces.map((item) => item.conceptKey)).toEqual(expectedKeys);
    traces.forEach((trace) => {
      expect(trace.id).toMatch(/^trace_l15_/);
      expect(trace.level).toBeGreaterThanOrEqual(3);
      expect(trace.code).toMatch(/\b(const|let|function|Promise|try)\b/);
      expect(trace.steps.length).toBeGreaterThanOrEqual(2);
      expect(trace.explanation.length).toBeGreaterThan(30);
      expect(trace.requiredConcepts).toContain(trace.conceptKey);
    });
  });

  it("loads the lesson 15 activity trace file in the browser shell and offline cache", () => {
    const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
    const sw = fs.readFileSync(path.join(ROOT, "service-worker.js"), "utf8");

    expect(html).toContain("data/svcollege_traces_lesson15_activity.js?v=lesson15-activity-v1");
    expect(sw).toContain("/data/svcollege_traces_lesson15_activity.js?v=lesson15-activity-v1");
  });
});
