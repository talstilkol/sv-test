const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const LESSON_FILES = [
  ["lesson_16", "data/lesson16.js", "LESSON_16"],
  ["lesson_17", "data/lesson17.js", "LESSON_17"],
  ["lesson_18", "data/lesson18.js", "LESSON_18"],
  ["lesson_20", "data/lesson20.js", "LESSON_20"],
  ["lesson_21", "data/lesson21.js", "LESSON_21"],
  ["lesson_22", "data/lesson22.js", "LESSON_22"],
  ["lesson_23", "data/lesson23.js", "LESSON_23"],
  ["lesson_24", "data/lesson24.js", "LESSON_24"],
  ["lesson_25", "data/lesson25.js", "LESSON_25"],
  ["lesson_26", "data/lesson26.js", "LESSON_26"],
  ["lesson_27", "data/lesson27.js", "LESSON_27"],
  ["workbook_taskmanager", "data/workbook_taskmanager.js", "WORKBOOK_TASKMANAGER"],
  ["react_blueprint", "data/react_blueprint.js", "REACT_BLUEPRINT"],
  ["ai_development", "data/ai_development.js", "AI_DEVELOPMENT"],
];

function loadCapstones() {
  const context = {};
  context.window = context;
  context.global = context;
  vm.runInNewContext(
    fs.readFileSync(path.join(ROOT, "data/capstones.js"), "utf8"),
    context,
    { filename: "data/capstones.js" },
  );
  return context.CAPSTONE_PROJECTS || [];
}

function loadLessonMap() {
  const map = {};
  LESSON_FILES.forEach(([lessonId, file, globalName]) => {
    const context = {};
    context.window = context;
    context.global = context;
    vm.runInNewContext(
      fs.readFileSync(path.join(ROOT, file), "utf8"),
      context,
      { filename: file },
    );
    map[lessonId] = context[globalName] || context.window[globalName];
  });
  return map;
}

describe("capstone project track", () => {
  const capstones = loadCapstones();

  it("ships the five planned capstone briefs", () => {
    expect(capstones.map((item) => item.id)).toEqual([
      "capstone_task_manager",
      "capstone_movie_app",
      "capstone_budget_manager",
      "capstone_auth_crud",
      "capstone_dashboard",
    ]);
  });

  it("includes a complete measurable rubric for every capstone", () => {
    capstones.forEach((project) => {
      expect(project.goal).toBeTruthy();
      expect(project.conceptKeys.length).toBeGreaterThanOrEqual(5);
      expect(project.milestones.length).toBeGreaterThanOrEqual(6);
      expect(project.requirements.length).toBeGreaterThanOrEqual(5);
      expect(project.edgeCases.length).toBeGreaterThanOrEqual(5);
      expect(project.tests.length).toBeGreaterThanOrEqual(5);
      expect(project.reviewChecklist.length).toBeGreaterThanOrEqual(5);
      expect(project.deliverables.length).toBeGreaterThanOrEqual(3);
    });
  });

  it("links every prerequisite concept to a real lesson concept", () => {
    const lessons = loadLessonMap();
    const missing = [];

    capstones.forEach((project) => {
      project.conceptKeys.forEach((key) => {
        const [lessonId, ...nameParts] = key.split("::");
        const conceptName = nameParts.join("::");
        const lesson = lessons[lessonId];
        const found = (lesson?.concepts || []).some(
          (concept) => String(concept.conceptName || "").toLowerCase() === conceptName.toLowerCase(),
        );
        if (!found) missing.push(`${project.id}: ${key}`);
      });
    });

    expect(missing).toEqual([]);
  });
});
