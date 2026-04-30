const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const DATA_FILES = [
  "data/lesson_auth_security.js",
  "data/svcollege_questions_auth.js",
  "data/svcollege_traces_auth.js",
  "data/svcollege_builds_auth.js",
  "data/svcollege_prerequisites_auth.js",
];

const REQUIRED_CONCEPTS = [
  "authentication",
  "authorization",
  "session",
  "cookie",
  "secure cookie",
  "JWT",
  "access token",
  "refresh token",
  "OAuth",
  "provider auth",
  "password hashing",
  "bcrypt",
  "CSRF",
  "XSS boundary",
  "CORS",
  "middleware guard",
  "Supabase Auth",
  "Firebase Auth",
  "Kinde/Appwrite",
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
  const questions = context.SVCOLLEGE_AUTH_QUESTIONS;
  return [
    ...questions.mc,
    ...questions.fill,
    ...questions.bugHunt,
    ...context.SVCOLLEGE_AUTH_TRACES,
    ...context.SVCOLLEGE_AUTH_BUILDS,
  ];
}

function expectPracticeMetadata(item) {
  expect(item.conceptKey).toEqual(expect.any(String));
  expect(item.conceptKey.startsWith("lesson_auth_security::")).toBe(true);
  expect(Array.isArray(item.requiredConcepts)).toBe(true);
  expect(item.requiredConcepts.length).toBeGreaterThan(0);
  expect(Array.isArray(item.requiredTerms)).toBe(true);
  expect(item.requiredTerms.length).toBeGreaterThan(0);
  expect(item.sideExplanation).toEqual(expect.any(String));
  expect(item.sideExplanation.length).toBeGreaterThan(20);
}

describe("SVCollege Auth/Security content", () => {
  it("defines the standalone lesson with every required Auth concept", () => {
    const context = loadContext();
    const lesson = context.LESSON_AUTH_SECURITY;
    const conceptNames = lesson.concepts.map((concept) => concept.conceptName);

    expect(lesson.id).toBe("lesson_auth_security");
    expect(conceptNames).toEqual(expect.arrayContaining(REQUIRED_CONCEPTS));
    expect(lesson.concepts.length).toBeGreaterThanOrEqual(19);

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
    const questions = context.SVCOLLEGE_AUTH_QUESTIONS;

    expect(questions.mc).toHaveLength(28);
    expect(questions.fill).toHaveLength(10);
    expect(context.SVCOLLEGE_AUTH_TRACES).toHaveLength(16);
    expect(context.SVCOLLEGE_AUTH_BUILDS).toHaveLength(3);
    expect(questions.bugHunt).toHaveLength(3);
    expect(allPracticeItems(context)).toHaveLength(60);

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

  it("adds real trace activities for the Auth/Security P6.3.1 authoring batch", () => {
    const context = loadContext();
    const expectedKeys = [
      "lesson_auth_security::access token",
      "lesson_auth_security::authentication",
      "lesson_auth_security::bcrypt",
      "lesson_auth_security::cookie",
      "lesson_auth_security::CORS",
      "lesson_auth_security::CSRF",
      "lesson_auth_security::Firebase Auth",
      "lesson_auth_security::JWT",
      "lesson_auth_security::Kinde/Appwrite",
      "lesson_auth_security::OAuth",
      "lesson_auth_security::provider auth",
      "lesson_auth_security::session",
      "lesson_auth_security::Supabase Auth",
    ];
    const traces = context.SVCOLLEGE_AUTH_TRACES.filter((item) =>
      expectedKeys.includes(item.conceptKey),
    );

    expect(traces.map((item) => item.conceptKey)).toEqual(expectedKeys);
    traces.forEach((trace) => {
      expect(trace.id).toMatch(/^trace_svauth_/);
      expect(trace.steps.length).toBeGreaterThanOrEqual(3);
      expect(trace.explanation.length).toBeGreaterThan(30);
      expect(trace.requiredConcepts).toContain(trace.conceptKey);
    });
  });

  it("keeps every Mini Build reference passing its own regex tests", () => {
    const context = loadContext();

    context.SVCOLLEGE_AUTH_BUILDS.forEach((build) => {
      build.tests.forEach((test) => {
        const pattern = new RegExp(test.regex, test.flags || "");
        expect(pattern.test(build.reference), `${build.id} should match ${test.regex}`).toBe(true);
      });
    });
  });

  it("covers every lesson concept in the prerequisite bridge", () => {
    const context = loadContext();
    const prereqKeys = Object.keys(context.SVCOLLEGE_AUTH_PREREQUISITES);
    const expectedKeys = context.LESSON_AUTH_SECURITY.concepts.map(
      (concept) => `${context.LESSON_AUTH_SECURITY.id}::${concept.conceptName}`,
    );

    expect(prereqKeys).toEqual(expect.arrayContaining(expectedKeys));
    expectedKeys.forEach((key) => {
      expect(Array.isArray(context.SVCOLLEGE_AUTH_PREREQUISITES[key])).toBe(true);
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
      context.SVCOLLEGE_AUTH_QUESTIONS.mc.map((item) => item.id),
    );
    expect(context.QUESTIONS_BANK.fill.map((item) => item.id)).toEqual(
      context.SVCOLLEGE_AUTH_QUESTIONS.fill.map((item) => item.id),
    );
    expect(context.QUESTIONS_TRACE.map((item) => item.id)).toEqual(
      context.SVCOLLEGE_AUTH_TRACES.map((item) => item.id),
    );
    expect(context.QUESTIONS_BUILD.map((item) => item.id)).toEqual(
      context.SVCOLLEGE_AUTH_BUILDS.map((item) => item.id),
    );
    expect(context.QUESTIONS_BUG.map((item) => item.id)).toEqual(
      context.SVCOLLEGE_AUTH_QUESTIONS.bugHunt.map((item) => item.id),
    );
    expect(context.CONCEPT_PREREQUISITES["lesson_auth_security::authorization"]).toContain(
      "lesson_auth_security::authentication",
    );
  });

  it("keeps the session files deterministic and free of secrets", () => {
    const forbiddenNativeRandom = ["Math", "random"].join(".");
    const combinedSource = DATA_FILES
      .map((file) => fs.readFileSync(path.join(ROOT, file), "utf8"))
      .join("\n");
    const note = fs.readFileSync(path.join(ROOT, "docs/session-integration/auth.md"), "utf8");

    expect(combinedSource.includes(forbiddenNativeRandom)).toBe(false);
    expect(combinedSource.includes("crypto.randomUUID")).toBe(false);
    expect(combinedSource.includes("Date.now")).toBe(false);
    expect(combinedSource.includes("sk-")).toBe(false);
    expect(note).toContain("LESSON_AUTH_SECURITY");
    expect(note).toContain("lesson_auth_security");
    expect(note).toContain("JWT, Cookies, Supabase/Appwrite/Firebase/Kinde");
  });
});
