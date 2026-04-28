const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const DATA_FILES = [
  "data/lesson_ai_engineering.js",
  "data/svcollege_questions_ai_engineering.js",
  "data/svcollege_traces_ai_engineering.js",
  "data/svcollege_builds_ai_engineering.js",
  "data/svcollege_prerequisites_ai_engineering.js",
];

const REQUIRED_CONCEPTS = [
  "OpenAI API",
  "Vercel AI SDK",
  "LangChain",
  "model selection",
  "prompt messages",
  "structured output",
  "streaming response",
  "token budget",
  "embeddings",
  "vector store",
  "RAG",
  "chunking",
  "retrieval ranking",
  "tool calling",
  "agent loop",
  "guardrails",
  "hallucination check",
  "evaluation",
  "fine-tuning boundary",
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
  const questions = context.SVCOLLEGE_AI_ENGINEERING_QUESTIONS;
  return [
    ...questions.mc,
    ...questions.fill,
    ...questions.bugHunt,
    ...context.SVCOLLEGE_AI_ENGINEERING_TRACES,
    ...context.SVCOLLEGE_AI_ENGINEERING_BUILDS,
  ];
}

function expectPracticeMetadata(item) {
  expect(item.conceptKey).toEqual(expect.any(String));
  expect(item.conceptKey.startsWith("lesson_ai_engineering::")).toBe(true);
  expect(Array.isArray(item.requiredConcepts)).toBe(true);
  expect(item.requiredConcepts.length).toBeGreaterThan(0);
  expect(Array.isArray(item.requiredTerms)).toBe(true);
  expect(item.requiredTerms.length).toBeGreaterThan(0);
  expect(item.sideExplanation).toEqual(expect.any(String));
  expect(item.sideExplanation.length).toBeGreaterThan(20);
}

describe("SVCollege AI Engineering content", () => {
  it("defines the standalone lesson with every required AI Engineering concept", () => {
    const context = loadContext();
    const lesson = context.LESSON_AI_ENGINEERING;
    const conceptNames = lesson.concepts.map((concept) => concept.conceptName);

    expect(lesson.id).toBe("lesson_ai_engineering");
    expect(conceptNames).toEqual(expect.arrayContaining(REQUIRED_CONCEPTS));
    expect(lesson.concepts).toHaveLength(19);

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
    const questions = context.SVCOLLEGE_AI_ENGINEERING_QUESTIONS;

    expect(questions.mc).toHaveLength(28);
    expect(questions.fill).toHaveLength(10);
    expect(context.SVCOLLEGE_AI_ENGINEERING_TRACES).toHaveLength(3);
    expect(context.SVCOLLEGE_AI_ENGINEERING_BUILDS).toHaveLength(3);
    expect(questions.bugHunt).toHaveLength(3);
    expect(allPracticeItems(context)).toHaveLength(47);

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

    context.SVCOLLEGE_AI_ENGINEERING_BUILDS.forEach((build) => {
      build.tests.forEach((test) => {
        const pattern = new RegExp(test.regex, test.flags || "");
        expect(pattern.test(build.reference), `${build.id} should match ${test.regex}`).toBe(true);
      });
    });
  });

  it("covers every lesson concept in the prerequisite bridge", () => {
    const context = loadContext();
    const prereqKeys = Object.keys(context.SVCOLLEGE_AI_ENGINEERING_PREREQUISITES);
    const expectedKeys = context.LESSON_AI_ENGINEERING.concepts.map(
      (concept) => `${context.LESSON_AI_ENGINEERING.id}::${concept.conceptName}`,
    );

    expect(prereqKeys).toEqual(expect.arrayContaining(expectedKeys));
    expectedKeys.forEach((key) => {
      expect(Array.isArray(context.SVCOLLEGE_AI_ENGINEERING_PREREQUISITES[key])).toBe(true);
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
      context.SVCOLLEGE_AI_ENGINEERING_QUESTIONS.mc.map((item) => item.id),
    );
    expect(context.QUESTIONS_BANK.fill.map((item) => item.id)).toEqual(
      context.SVCOLLEGE_AI_ENGINEERING_QUESTIONS.fill.map((item) => item.id),
    );
    expect(context.QUESTIONS_TRACE.map((item) => item.id)).toEqual(
      context.SVCOLLEGE_AI_ENGINEERING_TRACES.map((item) => item.id),
    );
    expect(context.QUESTIONS_BUILD.map((item) => item.id)).toEqual(
      context.SVCOLLEGE_AI_ENGINEERING_BUILDS.map((item) => item.id),
    );
    expect(context.QUESTIONS_BUG.map((item) => item.id)).toEqual(
      context.SVCOLLEGE_AI_ENGINEERING_QUESTIONS.bugHunt.map((item) => item.id),
    );
    expect(context.CONCEPT_PREREQUISITES["lesson_ai_engineering::RAG"]).toContain(
      "lesson_ai_engineering::vector store",
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
    expect(combinedSource.includes("api_key")).toBe(false);
  });
});
