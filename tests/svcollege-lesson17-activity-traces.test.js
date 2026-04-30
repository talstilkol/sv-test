const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");

function loadTraceContext() {
  const sandbox = { window: {}, console };
  ["data/questions_trace.js", "data/svcollege_traces_lesson17_activity.js"].forEach((file) => {
    vm.runInNewContext(fs.readFileSync(path.join(ROOT, file), "utf8"), sandbox, { filename: file });
  });
  return sandbox;
}

describe("SVCollege lesson 17 activity traces", () => {
  it("adds real trace activities for the HTTP/Express/REST P6.3.1 authoring batch", () => {
    const context = loadTraceContext();
    const expectedKeys = [
      "lesson_17::1xx-2xx-3xx",
      "lesson_17::4xx-5xx",
      "lesson_17::app",
      "lesson_17::app.get",
      "lesson_17::app.listen",
      "lesson_17::app.post",
      "lesson_17::app.use",
      "lesson_17::body",
      "lesson_17::body-parser",
      "lesson_17::Client",
      "lesson_17::Create",
      "lesson_17::CRUD",
      "lesson_17::Delete",
      "lesson_17::Domain",
      "lesson_17::event.preventDefault",
      "lesson_17::Express",
      "lesson_17::form",
      "lesson_17::GET",
      "lesson_17::headers",
      "lesson_17::method",
      "lesson_17::middleware",
      "lesson_17::Path",
      "lesson_17::port",
      "lesson_17::POST",
      "lesson_17::Protocol",
      "lesson_17::Query Parameters",
      "lesson_17::Read",
      "lesson_17::Request",
      "lesson_17::Response",
      "lesson_17::Route",
      "lesson_17::Server",
      "lesson_17::static files",
      "lesson_17::Status Codes",
      "lesson_17::Update",
      "lesson_17::URL",
    ];
    const traces = context.window.QUESTIONS_TRACE.filter((item) => expectedKeys.includes(item.conceptKey));

    expect(traces.map((item) => item.conceptKey)).toEqual(expectedKeys);
    traces.forEach((trace) => {
      expect(trace.id).toMatch(/^trace_l17_/);
      expect(trace.level).toBeGreaterThanOrEqual(3);
      expect(trace.code).toMatch(/\b(const|function|URL|Math)\b/);
      expect(trace.steps.length).toBeGreaterThanOrEqual(2);
      expect(trace.explanation.length).toBeGreaterThan(30);
      expect(trace.requiredConcepts).toContain(trace.conceptKey);
    });
  });

  it("loads the lesson 17 activity trace file in the browser shell and offline cache", () => {
    const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
    const sw = fs.readFileSync(path.join(ROOT, "service-worker.js"), "utf8");

    expect(html).toContain("data/svcollege_traces_lesson17_activity.js?v=lesson17-activity-v1");
    expect(sw).toContain("/data/svcollege_traces_lesson17_activity.js?v=lesson17-activity-v1");
  });
});
