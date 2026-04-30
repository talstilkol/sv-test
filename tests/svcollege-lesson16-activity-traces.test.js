const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");

function loadTraceContext() {
  const sandbox = { window: {}, console };
  ["data/questions_trace.js", "data/svcollege_traces_lesson16_activity.js"].forEach((file) => {
    vm.runInNewContext(fs.readFileSync(path.join(ROOT, file), "utf8"), sandbox, { filename: file });
  });
  return sandbox;
}

describe("SVCollege lesson 16 activity traces", () => {
  it("adds real trace activities for the Node/npm/File System P6.3.1 authoring batch", () => {
    const context = loadTraceContext();
    const expectedKeys = [
      "lesson_16::cd",
      "lesson_16::CLI",
      "lesson_16::Command Line Interface",
      "lesson_16::dependencies",
      "lesson_16::dir",
      "lesson_16::File System",
      "lesson_16::fs",
      "lesson_16::fs.appendFile",
      "lesson_16::fs.open",
      "lesson_16::fs.readFile",
      "lesson_16::fs.rename",
      "lesson_16::fs.unlink",
      "lesson_16::fs.writeFile",
      "lesson_16::JSON",
      "lesson_16::mkdir",
      "lesson_16::module",
      "lesson_16::module.exports",
      "lesson_16::node file.js",
      "lesson_16::npm init",
      "lesson_16::npm install",
      "lesson_16::npm start",
      "lesson_16::package.json",
      "lesson_16::require",
      "lesson_16::type nul",
      "lesson_16::V8",
    ];
    const traces = context.window.QUESTIONS_TRACE.filter((item) => expectedKeys.includes(item.conceptKey));

    expect(traces.map((item) => item.conceptKey)).toEqual(expectedKeys);
    traces.forEach((trace) => {
      expect(trace.id).toMatch(/^trace_l16_/);
      expect(trace.level).toBeGreaterThanOrEqual(3);
      expect(trace.code).toMatch(/\b(const|let|function|require)\b/);
      expect(trace.steps.length).toBeGreaterThanOrEqual(2);
      expect(trace.explanation.length).toBeGreaterThan(30);
      expect(trace.requiredConcepts).toContain(trace.conceptKey);
    });
  });

  it("loads the lesson 16 activity trace file in the browser shell and offline cache", () => {
    const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
    const sw = fs.readFileSync(path.join(ROOT, "service-worker.js"), "utf8");

    expect(html).toContain("data/svcollege_traces_lesson16_activity.js?v=lesson16-activity-v1");
    expect(sw).toContain("/data/svcollege_traces_lesson16_activity.js?v=lesson16-activity-v1");
  });
});
