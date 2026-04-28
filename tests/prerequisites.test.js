const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const DATA_FILES = [
  "data/lesson11.js",
  "data/lesson12.js",
  "data/lesson13.js",
  "data/lesson15.js",
  "data/lesson16.js",
  "data/lesson17.js",
  "data/lesson18.js",
  "data/lesson19.js",
  "data/lesson20.js",
  "data/lesson21.js",
  "data/lesson22.js",
  "data/lesson23.js",
  "data/lesson24.js",
  "data/lesson25.js",
  "data/lesson26.js",
  "data/lesson27.js",
  "data/lesson_closures.js",
  "data/workbook_taskmanager.js",
  "data/ai_development.js",
  "data/react_blueprint.js",
  "content-loader.js",
  "data/prerequisites.js",
];

function loadCourseData() {
  const context = {
    console: { log() {} },
    setTimeout() {},
    clearTimeout() {},
  };
  context.window = context;
  context.global = context;

  DATA_FILES.forEach((file) => {
    vm.runInNewContext(
      fs.readFileSync(path.join(ROOT, file), "utf8"),
      context,
      { filename: file },
    );
  });

  return {
    lessons: context.LESSONS_DATA || [],
    prereqs: context.CONCEPT_PREREQUISITES || {},
  };
}

function conceptKey(lessonId, conceptName) {
  return `${lessonId}::${conceptName}`;
}

function allConceptKeys(lessons) {
  return lessons.flatMap((lesson) =>
    (lesson.concepts || []).map((concept) =>
      conceptKey(lesson.id, concept.conceptName),
    ),
  );
}

function fullPrerequisiteChain(prereqs, rootKey) {
  const seen = new Set();
  const visiting = new Set();

  function visit(key) {
    if (visiting.has(key)) return;
    visiting.add(key);
    (prereqs[key] || []).forEach((dep) => {
      if (!seen.has(dep)) seen.add(dep);
      visit(dep);
    });
    visiting.delete(key);
  }

  visit(rootKey);
  return Array.from(seen);
}

describe("CONCEPT_PREREQUISITES coverage", () => {
  const { lessons, prereqs } = loadCourseData();
  const keys = allConceptKeys(lessons);
  const keySet = new Set(keys);

  it("has one explicit entry for every lesson concept", () => {
    expect(Object.keys(prereqs).sort()).toEqual([...keys].sort());
  });

  it("contains only valid direct edges without duplicates or self references", () => {
    Object.entries(prereqs).forEach(([target, deps]) => {
      expect(Array.isArray(deps)).toBe(true);
      expect(new Set(deps).size).toBe(deps.length);
      deps.forEach((dep) => {
        expect(keySet.has(dep)).toBe(true);
        expect(dep).not.toBe(target);
      });
    });
  });

  it("does not contain dependency cycles", () => {
    const state = new Map();

    function visit(key, stack = []) {
      const currentState = state.get(key);
      if (currentState === "visiting") {
        throw new Error(`Cycle detected: ${[...stack, key].join(" -> ")}`);
      }
      if (currentState === "done") return;
      state.set(key, "visiting");
      (prereqs[key] || []).forEach((dep) => visit(dep, [...stack, key]));
      state.set(key, "done");
    }

    keys.forEach((key) => visit(key));
  });

  it("keeps foundational concepts explicit with empty prerequisite arrays", () => {
    expect(prereqs["lesson_11::Array"]).toEqual([]);
    expect(prereqs["lesson_11::let"]).toEqual([]);
    expect(prereqs["lesson_17::HTTP"]).toEqual([]);
    expect(prereqs["ai_development::AI"]).toEqual([]);
  });

  it("supports the required full-chain UI scenarios", () => {
    expect(prereqs["lesson_12::map"]).toContain("lesson_12::forEach");

    const useEffectChain = fullPrerequisiteChain(
      prereqs,
      "lesson_24::useEffect",
    );
    expect(useEffectChain).toContain("lesson_22::useState");
    expect(useEffectChain).toContain("lesson_22::Hook");
    expect(useEffectChain).toContain("lesson_21::React");
    expect(useEffectChain).toContain("lesson_21::Component");
    expect(useEffectChain).toContain("lesson_15::fetch");
    expect(useEffectChain).toContain("lesson_15::Promise");
  });
});
