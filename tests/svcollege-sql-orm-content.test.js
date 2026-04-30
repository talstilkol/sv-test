const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const DATA_FILES = [
  "data/lesson_sql_orm.js",
  "data/svcollege_questions_sql_orm.js",
  "data/svcollege_traces_sql_orm.js",
  "data/svcollege_builds_sql_orm.js",
  "data/svcollege_prerequisites_sql_orm.js",
];

const REQUIRED_CONCEPTS = [
  "SQL",
  "PostgreSQL",
  "database",
  "table",
  "row",
  "column",
  "primary key",
  "foreign key",
  "relation",
  "JOIN",
  "schema",
  "migration",
  "ORM",
  "Prisma",
  "Drizzle",
  "CRUD",
  "transaction",
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

function allQuestionLikeItems(context) {
  const questions = context.SVCOLLEGE_SQL_ORM_QUESTIONS;
  return [
    ...questions.mc,
    ...questions.fill,
    ...questions.bugHunt,
    ...context.SVCOLLEGE_SQL_ORM_TRACES,
    ...context.SVCOLLEGE_SQL_ORM_BUILDS,
  ];
}

function expectPracticeMetadata(item) {
  expect(item.conceptKey).toEqual(expect.any(String));
  expect(item.conceptKey.startsWith("lesson_sql_orm::")).toBe(true);
  expect(Array.isArray(item.requiredConcepts)).toBe(true);
  expect(item.requiredConcepts.length).toBeGreaterThan(0);
  expect(Array.isArray(item.requiredTerms)).toBe(true);
  expect(item.requiredTerms.length).toBeGreaterThan(0);
  expect(item.sideExplanation).toEqual(expect.any(String));
  expect(item.sideExplanation.length).toBeGreaterThan(20);
}

describe("SVCollege SQL/ORM session content", () => {
  it("defines the standalone lesson with every required SQL/ORM concept", () => {
    const context = loadContext();
    const lesson = context.LESSON_SQL_ORM;
    const conceptNames = lesson.concepts.map((concept) => concept.conceptName);

    expect(lesson.id).toBe("lesson_sql_orm");
    expect(conceptNames).toEqual(expect.arrayContaining(REQUIRED_CONCEPTS));
    expect(lesson.concepts.length).toBeGreaterThanOrEqual(17);

    lesson.concepts.forEach((concept) => {
      expect(concept.simpleExplanation).toEqual(expect.any(String));
      expect(concept.simpleExplanation.length).toBeGreaterThan(20);
      expect(concept.whyFullStack).toEqual(expect.any(String));
      expect(concept.codeExample).toEqual(expect.any(String));
      expect(concept.commonMistake).toEqual(expect.any(String));
      expect(concept.prerequisite).toEqual(expect.any(String));
    });
  });

  it("ships the required MC, Fill, Trace, Mini Build and Bug Hunt volume", () => {
    const context = loadContext();
    const questions = context.SVCOLLEGE_SQL_ORM_QUESTIONS;

    expect(questions.mc).toHaveLength(18);
    expect(questions.fill).toHaveLength(10);
    expect(context.SVCOLLEGE_SQL_ORM_TRACES.length).toBeGreaterThanOrEqual(3);
    expect(context.SVCOLLEGE_SQL_ORM_BUILDS.length).toBeGreaterThanOrEqual(3);
    expect(questions.bugHunt.length).toBeGreaterThanOrEqual(2);

    questions.mc.forEach((question) => {
      expect(question.options).toHaveLength(4);
      expect(question.correctIndex).toBeGreaterThanOrEqual(0);
      expect(question.correctIndex).toBeLessThan(4);
      expect(question.conceptKey.startsWith("lesson_sql_orm::")).toBe(true);
    });

    questions.fill.forEach((question) => {
      expect(question.code).toContain("____");
      expect(question.answer).toEqual(expect.any(String));
      expect(question.conceptKey.startsWith("lesson_sql_orm::")).toBe(true);
    });
  });

  it("includes prerequisite metadata on every hard SQL/ORM item", () => {
    const context = loadContext();
    const hardItems = allQuestionLikeItems(context).filter((item) => item.level >= 5);

    expect(hardItems.length).toBeGreaterThan(0);
    hardItems.forEach((item) => {
      expectPracticeMetadata(item);
    });
  });

  it("includes concept and prerequisite metadata on every SQL/ORM practice item", () => {
    const context = loadContext();
    const items = allQuestionLikeItems(context);

    expect(items).toHaveLength(46);
    items.forEach((item) => {
      expectPracticeMetadata(item);
    });
  });

  it("adds real trace activities for the SQL/ORM P6.3.1 authoring batch", () => {
    const context = loadContext();
    const expectedKeys = [
      "lesson_sql_orm::column",
      "lesson_sql_orm::database",
      "lesson_sql_orm::migration",
      "lesson_sql_orm::ORM",
      "lesson_sql_orm::PostgreSQL",
      "lesson_sql_orm::primary key",
      "lesson_sql_orm::relation",
      "lesson_sql_orm::row",
      "lesson_sql_orm::SQL",
      "lesson_sql_orm::table",
    ];
    const traces = context.SVCOLLEGE_SQL_ORM_TRACES.filter((item) =>
      expectedKeys.includes(item.conceptKey),
    );

    expect(traces.map((item) => item.conceptKey)).toEqual(expectedKeys);
    traces.forEach((trace) => {
      expect(trace.id).toMatch(/^trace_svsql_/);
      expect(trace.steps.length).toBeGreaterThanOrEqual(2);
      expect(trace.explanation.length).toBeGreaterThan(30);
      expect(trace.requiredConcepts).toContain(trace.conceptKey);
    });
  });

  it("keeps every Mini Build reference passing its own regex tests", () => {
    const context = loadContext();

    context.SVCOLLEGE_SQL_ORM_BUILDS.forEach((build) => {
      build.tests.forEach((test) => {
        const pattern = new RegExp(test.regex, test.flags || "");
        const matches = pattern.test(build.reference);

        if (test.mustNotMatch) {
          expect(matches, `${build.id} should not match ${test.regex}`).toBe(false);
        } else {
          expect(matches, `${build.id} should match ${test.regex}`).toBe(true);
        }
      });
    });
  });

  it("covers every lesson concept in the prerequisite bridge", () => {
    const context = loadContext();
    const prereqKeys = Object.keys(context.SVCOLLEGE_SQL_ORM_PREREQUISITES);
    const expectedKeys = context.LESSON_SQL_ORM.concepts.map(
      (concept) => `${context.LESSON_SQL_ORM.id}::${concept.conceptName}`,
    );

    expect(prereqKeys).toEqual(expect.arrayContaining(expectedKeys));
    expectedKeys.forEach((key) => {
      expect(Array.isArray(context.SVCOLLEGE_SQL_ORM_PREREQUISITES[key])).toBe(true);
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
      context.SVCOLLEGE_SQL_ORM_QUESTIONS.mc.map((item) => item.id),
    );
    expect(context.QUESTIONS_BANK.fill.map((item) => item.id)).toEqual(
      context.SVCOLLEGE_SQL_ORM_QUESTIONS.fill.map((item) => item.id),
    );
    expect(context.QUESTIONS_TRACE.map((item) => item.id)).toEqual(
      context.SVCOLLEGE_SQL_ORM_TRACES.map((item) => item.id),
    );
    expect(context.QUESTIONS_BUILD.map((item) => item.id)).toEqual(
      context.SVCOLLEGE_SQL_ORM_BUILDS.map((item) => item.id),
    );
    expect(context.QUESTIONS_BUG.map((item) => item.id)).toEqual(
      context.SVCOLLEGE_SQL_ORM_QUESTIONS.bugHunt.map((item) => item.id),
    );
    expect(context.CONCEPT_PREREQUISITES["lesson_sql_orm::JOIN"]).toContain(
      "lesson_sql_orm::relation",
    );
  });

  it("keeps the session files deterministic and documents coordinator wiring", () => {
    const forbiddenNativeRandom = ["Math", "random"].join(".");
    const combinedSource = DATA_FILES
      .map((file) => fs.readFileSync(path.join(ROOT, file), "utf8"))
      .join("\n");
    const note = fs.readFileSync(
      path.join(ROOT, "docs/session-integration/sql-orm.md"),
      "utf8",
    );

    expect(combinedSource.includes(forbiddenNativeRandom)).toBe(false);
    expect(note).toContain("LESSON_SQL_ORM");
    expect(note).toContain("lesson_sql_orm");
    expect(note).toContain("SVCOLLEGE_SQL_ORM_QUESTIONS");
    expect(note).toContain("data/lesson_sql_orm.js");
    expect(note).toContain("PostgreSQL/Prisma/Drizzle");
  });
});
