const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const DATA_FILES = [
  "data/lesson_design_systems.js",
  "data/svcollege_questions_design_systems.js",
  "data/svcollege_traces_design_systems.js",
  "data/svcollege_builds_design_systems.js",
  "data/svcollege_prerequisites_design_systems.js",
];

const REQUIRED_CONCEPTS = [
  "shadcn/UI",
  "Radix primitives",
  "accessible primitive",
  "design tokens",
  "component variants",
  "cn helper",
  "cva",
  "asChild slot",
  "form field composition",
  "theme tokens",
  "component registry",
  "design system testing",
];

function runFile(relativePath, context) {
  vm.runInNewContext(
    fs.readFileSync(path.join(ROOT, relativePath), "utf8"),
    context,
    { filename: relativePath },
  );
}

function loadContext(seed = {}) {
  const context = { ...seed };
  context.window = context;
  DATA_FILES.forEach((file) => runFile(file, context));
  return context;
}

function allPracticeItems(context) {
  const questions = context.SVCOLLEGE_DESIGN_SYSTEMS_QUESTIONS;
  return [
    ...questions.mc,
    ...questions.fill,
    ...questions.bugHunt,
    ...context.SVCOLLEGE_DESIGN_SYSTEMS_TRACES,
    ...context.SVCOLLEGE_DESIGN_SYSTEMS_BUILDS,
  ];
}

function expectPracticeMetadata(item) {
  expect(item.conceptKey).toEqual(expect.any(String));
  expect(item.conceptKey.startsWith("lesson_design_systems::")).toBe(true);
  expect(Array.isArray(item.requiredConcepts)).toBe(true);
  expect(item.requiredConcepts.length).toBeGreaterThan(0);
  expect(Array.isArray(item.requiredTerms)).toBe(true);
  expect(item.requiredTerms.length).toBeGreaterThan(0);
  expect(item.sideExplanation).toEqual(expect.any(String));
  expect(item.sideExplanation.length).toBeGreaterThan(20);
}

describe("SVCollege Design Systems content", () => {
  it("defines the standalone lesson with every required design-system concept", () => {
    const context = loadContext();
    const lesson = context.LESSON_DESIGN_SYSTEMS;
    const conceptNames = lesson.concepts.map((concept) => concept.conceptName);

    expect(lesson.id).toBe("lesson_design_systems");
    expect(conceptNames).toEqual(expect.arrayContaining(REQUIRED_CONCEPTS));
    expect(lesson.concepts).toHaveLength(12);

    lesson.concepts.forEach((concept) => {
      expect(concept.simpleExplanation).toEqual(expect.any(String));
      expect(concept.simpleExplanation.length).toBeGreaterThan(20);
      expect(concept.whyFullStack).toEqual(expect.any(String));
      expect(concept.codeExample).toEqual(expect.any(String));
      expect(concept.commonMistake).toEqual(expect.any(String));
      expect(concept.prerequisite).toEqual(expect.any(String));
    });
  });

  it("ships MC, Fill, Trace, Mini Build and Bug Hunt coverage", () => {
    const context = loadContext();
    const questions = context.SVCOLLEGE_DESIGN_SYSTEMS_QUESTIONS;

    expect(questions.mc).toHaveLength(18);
    expect(questions.fill).toHaveLength(8);
    expect(context.SVCOLLEGE_DESIGN_SYSTEMS_TRACES).toHaveLength(2);
    expect(context.SVCOLLEGE_DESIGN_SYSTEMS_BUILDS).toHaveLength(2);
    expect(questions.bugHunt).toHaveLength(2);
    expect(allPracticeItems(context)).toHaveLength(32);

    questions.mc.forEach((question) => {
      expect(question.options).toHaveLength(4);
      expect(question.correctIndex).toBeGreaterThanOrEqual(0);
      expect(question.correctIndex).toBeLessThan(4);
    });
  });

  it("includes prerequisite metadata on every practice item", () => {
    const context = loadContext();

    allPracticeItems(context).forEach((item) => {
      expectPracticeMetadata(item);
    });
  });

  it("keeps every Mini Build reference passing its own regex tests", () => {
    const context = loadContext();

    context.SVCOLLEGE_DESIGN_SYSTEMS_BUILDS.forEach((build) => {
      build.tests.forEach((test) => {
        const pattern = new RegExp(test.regex, test.flags || "");
        expect(pattern.test(build.reference), `${build.id} should match ${test.regex}`).toBe(true);
      });
    });
  });

  it("covers every lesson concept in the prerequisite bridge", () => {
    const context = loadContext();
    const prereqKeys = Object.keys(context.SVCOLLEGE_DESIGN_SYSTEMS_PREREQUISITES);
    const expectedKeys = context.LESSON_DESIGN_SYSTEMS.concepts.map(
      (concept) => `${context.LESSON_DESIGN_SYSTEMS.id}::${concept.conceptName}`,
    );

    expect(prereqKeys).toEqual(expect.arrayContaining(expectedKeys));
    expectedKeys.forEach((key) => {
      expect(Array.isArray(context.SVCOLLEGE_DESIGN_SYSTEMS_PREREQUISITES[key])).toBe(true);
    });
  });

  it("bridges into existing portal globals without duplicate ids", () => {
    const context = loadContext({
      QUESTIONS_BANK: { mc: [], fill: [] },
      QUESTIONS_TRACE: [],
      QUESTIONS_BUILD: [],
      QUESTIONS_BUG: [],
      CONCEPT_PREREQUISITES: {},
    });

    expect(context.QUESTIONS_BANK.mc.map((item) => item.id)).toEqual(
      context.SVCOLLEGE_DESIGN_SYSTEMS_QUESTIONS.mc.map((item) => item.id),
    );
    expect(context.QUESTIONS_BANK.fill.map((item) => item.id)).toEqual(
      context.SVCOLLEGE_DESIGN_SYSTEMS_QUESTIONS.fill.map((item) => item.id),
    );
    expect(context.QUESTIONS_TRACE.map((item) => item.id)).toEqual(
      context.SVCOLLEGE_DESIGN_SYSTEMS_TRACES.map((item) => item.id),
    );
    expect(context.QUESTIONS_BUILD.map((item) => item.id)).toEqual(
      context.SVCOLLEGE_DESIGN_SYSTEMS_BUILDS.map((item) => item.id),
    );
    expect(context.QUESTIONS_BUG.map((item) => item.id)).toEqual(
      context.SVCOLLEGE_DESIGN_SYSTEMS_QUESTIONS.bugHunt.map((item) => item.id),
    );
    expect(context.CONCEPT_PREREQUISITES["lesson_design_systems::shadcn/UI"]).toContain(
      "lesson_25::Tailwind CSS",
    );
  });

  it("keeps the session files deterministic", () => {
    const forbiddenNativeRandom = ["Math", "random"].join(".");
    const combinedSource = DATA_FILES
      .map((file) => fs.readFileSync(path.join(ROOT, file), "utf8"))
      .join("\n");

    expect(combinedSource.includes(forbiddenNativeRandom)).toBe(false);
    expect(combinedSource.includes("crypto.randomUUID")).toBe(false);
    expect(combinedSource.includes("Date.now")).toBe(false);
  });
});
