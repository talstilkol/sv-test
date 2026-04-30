const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");

function loadTraceContext() {
  const sandbox = { window: {}, console };
  ["data/questions_trace.js", "data/svcollege_traces_foundation_tooling_activity.js"].forEach((file) => {
    vm.runInNewContext(fs.readFileSync(path.join(ROOT, file), "utf8"), sandbox, { filename: file });
  });
  return sandbox;
}

describe("SVCollege foundation and tooling activity traces", () => {
  it("adds real trace activities for HTML/CSS and Tooling/Git P6.3.1 gaps", () => {
    const context = loadTraceContext();
    const expectedKeys = [
      "lesson_html_css_foundations::accessibility basics",
      "lesson_html_css_foundations::box model",
      "lesson_html_css_foundations::CSS selector",
      "lesson_html_css_foundations::HTML document",
      "lesson_html_css_foundations::label",
      "lesson_tooling_git::branch",
      "lesson_tooling_git::commit",
      "lesson_tooling_git::ESLint",
      "lesson_tooling_git::Git",
      "lesson_tooling_git::Prettier",
      "lesson_tooling_git::pull request",
      "lesson_tooling_git::repository",
      "lesson_tooling_git::staging area",
      "lesson_tooling_git::working tree",
    ];
    const expectedSet = new Set(expectedKeys);
    const traces = context.window.QUESTIONS_TRACE.filter((item) => expectedSet.has(item.conceptKey));

    expect(traces.map((item) => item.conceptKey)).toEqual(expectedKeys);
    traces.forEach((trace) => {
      expect(trace.id).toMatch(/^trace_(html|git)_/);
      expect(trace.level).toBeGreaterThanOrEqual(3);
      expect(trace.code).toMatch(/\bconst\b/);
      expect(trace.steps.length).toBeGreaterThanOrEqual(2);
      expect(trace.explanation.length).toBeGreaterThan(30);
      expect(trace.requiredConcepts).toContain(trace.conceptKey);
    });
  });

  it("loads the foundation/tooling activity trace file in the browser shell and offline cache", () => {
    const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
    const sw = fs.readFileSync(path.join(ROOT, "service-worker.js"), "utf8");

    expect(html).toContain("data/svcollege_traces_foundation_tooling_activity.js?v=foundation-tooling-activity-v1");
    expect(sw).toContain("/data/svcollege_traces_foundation_tooling_activity.js?v=foundation-tooling-activity-v1");
  });
});
