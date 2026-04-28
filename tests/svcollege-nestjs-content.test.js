const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const DATA_FILES = [
  "data/lesson_nestjs.js",
  "data/svcollege_questions_nestjs.js",
  "data/svcollege_traces_nestjs.js",
  "data/svcollege_builds_nestjs.js",
  "data/svcollege_prerequisites_nestjs.js",
];

const REQUIRED_CONCEPTS = [
  "Nest.js",
  "module",
  "controller",
  "provider",
  "service",
  "dependency injection",
  "decorator",
  "DTO",
  "validation pipe",
  "guard",
  "pipe",
  "middleware",
  "interceptor",
  "exception filter",
  "repository pattern",
  "testing module",
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
  const questions = context.SVCOLLEGE_NESTJS_QUESTIONS;
  return [
    ...questions.mc,
    ...questions.fill,
    ...questions.bugHunt,
    ...context.SVCOLLEGE_NESTJS_TRACES,
    ...context.SVCOLLEGE_NESTJS_BUILDS,
  ];
}

function expectPracticeMetadata(item) {
  expect(item.conceptKey).toEqual(expect.any(String));
  expect(item.conceptKey.startsWith("lesson_nestjs::")).toBe(true);
  expect(Array.isArray(item.requiredConcepts)).toBe(true);
  expect(item.requiredConcepts.length).toBeGreaterThan(0);
  expect(Array.isArray(item.requiredTerms)).toBe(true);
  expect(item.requiredTerms.length).toBeGreaterThan(0);
  expect(item.sideExplanation).toEqual(expect.any(String));
  expect(item.sideExplanation.length).toBeGreaterThan(20);
}

describe("SVCollege Nest.js content", () => {
  it("defines the standalone lesson with every required Nest.js concept", () => {
    const context = loadContext();
    const lesson = context.LESSON_NESTJS;
    const conceptNames = lesson.concepts.map((concept) => concept.conceptName);

    expect(lesson.id).toBe("lesson_nestjs");
    expect(conceptNames).toEqual(expect.arrayContaining(REQUIRED_CONCEPTS));
    expect(lesson.concepts).toHaveLength(16);

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
    const questions = context.SVCOLLEGE_NESTJS_QUESTIONS;

    expect(questions.mc).toHaveLength(24);
    expect(questions.fill).toHaveLength(10);
    expect(context.SVCOLLEGE_NESTJS_TRACES).toHaveLength(3);
    expect(context.SVCOLLEGE_NESTJS_BUILDS).toHaveLength(3);
    expect(questions.bugHunt).toHaveLength(3);
    expect(allPracticeItems(context)).toHaveLength(43);

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

    context.SVCOLLEGE_NESTJS_BUILDS.forEach((build) => {
      build.tests.forEach((test) => {
        const pattern = new RegExp(test.regex, test.flags || "");
        expect(pattern.test(build.reference), `${build.id} should match ${test.regex}`).toBe(true);
      });
    });
  });

  it("covers every lesson concept in the prerequisite bridge", () => {
    const context = loadContext();
    const prereqKeys = Object.keys(context.SVCOLLEGE_NESTJS_PREREQUISITES);
    const expectedKeys = context.LESSON_NESTJS.concepts.map(
      (concept) => `${context.LESSON_NESTJS.id}::${concept.conceptName}`,
    );

    expect(prereqKeys).toEqual(expect.arrayContaining(expectedKeys));
    expectedKeys.forEach((key) => {
      expect(Array.isArray(context.SVCOLLEGE_NESTJS_PREREQUISITES[key])).toBe(true);
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
      context.SVCOLLEGE_NESTJS_QUESTIONS.mc.map((item) => item.id),
    );
    expect(context.QUESTIONS_BANK.fill.map((item) => item.id)).toEqual(
      context.SVCOLLEGE_NESTJS_QUESTIONS.fill.map((item) => item.id),
    );
    expect(context.QUESTIONS_TRACE.map((item) => item.id)).toEqual(
      context.SVCOLLEGE_NESTJS_TRACES.map((item) => item.id),
    );
    expect(context.QUESTIONS_BUILD.map((item) => item.id)).toEqual(
      context.SVCOLLEGE_NESTJS_BUILDS.map((item) => item.id),
    );
    expect(context.QUESTIONS_BUG.map((item) => item.id)).toEqual(
      context.SVCOLLEGE_NESTJS_QUESTIONS.bugHunt.map((item) => item.id),
    );
    expect(context.CONCEPT_PREREQUISITES["lesson_nestjs::guard"]).toContain(
      "lesson_auth_security::authorization",
    );
  });

  it("keeps the session files deterministic and free of secrets", () => {
    const forbiddenNativeRandom = ["Math", "random"].join(".");
    const combinedSource = DATA_FILES
      .map((file) => fs.readFileSync(path.join(ROOT, file), "utf8"))
      .join("\n");

    expect(combinedSource.includes(forbiddenNativeRandom)).toBe(false);
    expect(combinedSource.includes("crypto.randomUUID")).toBe(false);
    expect(combinedSource.includes("Date.now")).toBe(false);
    expect(combinedSource.includes("sk-")).toBe(false);
  });
});
