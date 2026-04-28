const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const LESSON_FILES = [
  ["lesson_11", "data/lesson11.js", "LESSON_11"],
  ["lesson_12", "data/lesson12.js", "LESSON_12"],
  ["lesson_13", "data/lesson13.js", "LESSON_13"],
  ["lesson_html_css_foundations", "data/lesson_html_css_foundations.js", "LESSON_HTML_CSS_FOUNDATIONS"],
  ["lesson_tooling_git", "data/lesson_tooling_git.js", "LESSON_TOOLING_GIT"],
  ["lesson_15", "data/lesson15.js", "LESSON_15"],
  ["lesson_16", "data/lesson16.js", "LESSON_16"],
  ["lesson_17", "data/lesson17.js", "LESSON_17"],
  ["lesson_18", "data/lesson18.js", "LESSON_18"],
  ["lesson_20", "data/lesson20.js", "LESSON_20"],
  ["lesson_sql_orm", "data/lesson_sql_orm.js", "LESSON_SQL_ORM"],
  ["lesson_auth_security", "data/lesson_auth_security.js", "LESSON_AUTH_SECURITY"],
  ["lesson_nextjs", "data/lesson_nextjs.js", "LESSON_NEXTJS"],
  ["lesson_21", "data/lesson21.js", "LESSON_21"],
  ["lesson_22", "data/lesson22.js", "LESSON_22"],
  ["lesson_23", "data/lesson23.js", "LESSON_23"],
  ["lesson_24", "data/lesson24.js", "LESSON_24"],
  ["lesson_25", "data/lesson25.js", "LESSON_25"],
  ["lesson_26", "data/lesson26.js", "LESSON_26"],
  ["lesson_27", "data/lesson27.js", "LESSON_27"],
  ["react_blueprint", "data/react_blueprint.js", "REACT_BLUEPRINT"],
  ["ai_development", "data/ai_development.js", "AI_DEVELOPMENT"],
];

function loadGlobal(file, globalName) {
  const context = {};
  context.window = context;
  context.global = context;
  vm.runInNewContext(
    fs.readFileSync(path.join(ROOT, file), "utf8"),
    context,
    { filename: file },
  );
  return context[globalName] || context.window[globalName];
}

function loadBlueprints() {
  return loadGlobal("data/course_blueprints.js", "COURSE_BLUEPRINTS") || [];
}

function loadDeferredBlueprints() {
  return loadGlobal("data/course_blueprints.js", "DEFERRED_COURSE_PORTAL_BLUEPRINTS") || [];
}

function loadLessonMap() {
  const map = {};
  LESSON_FILES.forEach(([lessonId, file, globalName]) => {
    map[lessonId] = loadGlobal(file, globalName);
  });
  return map;
}

describe("course blueprint alignment", () => {
  const blueprints = loadBlueprints();

  it("keeps this portal aligned only to SVCollege AI & Full Stack", () => {
    expect(blueprints.map((item) => item.id)).toEqual(["svcollege_fullstack_ai"]);
  });

  it("keeps non-SVCollege alignments deferred for separate future portals", () => {
    expect(loadDeferredBlueprints().map((item) => item.id)).toEqual([
      "john_bryce_fullstack_ai",
      "sela_react_professional",
      "generic_israeli_bootcamp",
    ]);
  });

  it("keeps every blueprint measurable and sourced", () => {
    blueprints.forEach((blueprint) => {
      expect(blueprint.provider).toBeTruthy();
      expect(blueprint.title).toBeTruthy();
      expect(blueprint.sources.length).toBeGreaterThanOrEqual(1);
      expect(blueprint.modules.length).toBeGreaterThanOrEqual(5);
      expect(blueprint.capstoneLinks.length).toBeGreaterThanOrEqual(2);
      expect(blueprint.mockExamTags.length).toBeGreaterThanOrEqual(2);
      expect(blueprint.recommendedNext.length).toBeGreaterThanOrEqual(2);
    });
  });

  it("links modules to real lesson ids and concept keys", () => {
    const lessons = loadLessonMap();
    const missing = [];

    blueprints.forEach((blueprint) => {
      blueprint.modules.forEach((module) => {
        (module.lessonIds || []).forEach((lessonId) => {
          if (!lessons[lessonId]) missing.push(`${blueprint.id}: missing lesson ${lessonId}`);
        });
        (module.conceptKeys || []).forEach((key) => {
          const [lessonId, ...nameParts] = key.split("::");
          const conceptName = nameParts.join("::");
          const lesson = lessons[lessonId];
          const found = (lesson?.concepts || []).some(
            (concept) => String(concept.conceptName || "").toLowerCase() === conceptName.toLowerCase(),
          );
          if (!found) missing.push(`${blueprint.id}: missing concept ${key}`);
        });
      });
    });

    expect(missing).toEqual([]);
  });
});
