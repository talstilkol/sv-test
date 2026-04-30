const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");

function loadData(file) {
  const context = {};
  context.window = context;
  context.global = context;
  vm.runInNewContext(fs.readFileSync(path.join(ROOT, file), "utf8"), context, { filename: file });
  return context;
}

function loadInterviewPrep() {
  return loadData("data/interview_prep.js").INTERVIEW_PREP || [];
}

function loadLessonConcepts() {
  const concepts = new Set();
  fs.readdirSync(path.join(ROOT, "data"))
    .filter((file) => file.endsWith(".js") && /^lesson|^react_blueprint|^ai_development|^workbook_taskmanager/.test(file))
    .sort()
    .forEach((file) => {
      const context = loadData(path.join("data", file));
      Object.values(context)
        .filter((value) => value && typeof value.id === "string" && Array.isArray(value.concepts))
        .forEach((lesson) => {
          lesson.concepts.forEach((concept) => concepts.add(`${lesson.id}::${concept.conceptName}`));
        });
    });
  return concepts;
}

describe("interview prep mode", () => {
  it("ships mapped junior frontend questions without fake answers", () => {
    const items = loadInterviewPrep();

    expect(items.length).toBeGreaterThanOrEqual(10);
    expect(items.map((item) => item.id)).toContain("interview_props_state");
    expect(items.map((item) => item.id)).toContain("interview_next_server_client");
    items.forEach((item) => {
      expect(item.question).toBeTruthy();
      expect(item.expectedAnswer).toBeTruthy();
      expect(item.conceptKeys.length).toBeGreaterThanOrEqual(2);
      expect(item.followUps.length).toBeGreaterThanOrEqual(2);
      expect(JSON.stringify(item).toLowerCase()).not.toContain("placeholder");
    });
  });

  it("maps every interview question to real lesson concepts", () => {
    const concepts = loadLessonConcepts();
    const missing = [];

    loadInterviewPrep().forEach((item) => {
      item.conceptKeys.forEach((key) => {
        if (!concepts.has(key)) missing.push(`${item.id}: ${key}`);
      });
    });

    expect(missing).toEqual([]);
  });

  it("wires interview prep into the guide UI", () => {
    const app = fs.readFileSync(path.join(ROOT, "app.js"), "utf8");
    const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
    const css = fs.readFileSync(path.join(ROOT, "style.css"), "utf8");

    expect(html).toContain("data/interview_prep.js?v=interview-prep-v1");
    expect(app).toContain("function renderInterviewPrepMode");
    expect(app).toContain("data-interview-concept");
    expect(css).toContain(".interview-prep-panel");
  });
});
