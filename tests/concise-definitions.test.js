const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const LOW_SIGNAL_RE = /רעיון שמופיע הרבה בפועל|מייצג קונספט שמופיע בסטנדרט|משמש בתוך מבני קוד אמיתיים|תאר\/תארי|חלק מהפרוטוקול|חוסכת הרבה זמן דיבוג|ניתוח המושג/;
const SVCOLLEGE_CONCISE_TERMS = [
  "primitive",
  "value",
  "byte",
  "bit",
  "key",
  "variable",
  "array",
  "function",
  "object",
  "class",
  "stack",
  "heap",
  "reference",
  "scope",
  "callback",
  "promise",
  "async",
  "await",
  "component",
  "prop",
  "state",
  "hook",
  "route",
  "middleware",
  "token",
  "cookie",
  "session",
  "sql",
  "orm",
  "migration",
  "transaction",
  "ssr",
  "api route",
  "di",
  "docker",
  "ci/cd",
  "rag",
];

function loadWithConciseDefinitions(extra = {}) {
  const context = {
    console: { log() {}, warn() {}, error() {} },
    setTimeout() {},
    clearTimeout() {},
    ...extra,
  };
  context.window = context;
  context.global = context;

  [
    "data/lesson19.js",
    "data/glossary.js",
    "data/concise_definitions.js",
    "content-loader.js",
  ].forEach((file) => {
    vm.runInNewContext(fs.readFileSync(path.join(ROOT, file), "utf8"), context, { filename: file });
  });

  return context;
}

describe("concise concept definitions", () => {
  it("replaces low-signal lesson 19 explanations with one-line definitions", () => {
    const context = loadWithConciseDefinitions();
    const lesson19 = context.LESSONS_DATA.find((lesson) => lesson.id === "lesson_19");
    const byName = Object.fromEntries(lesson19.concepts.map((concept) => [concept.conceptName, concept]));

    expect(byName.array.levels.grandma).toBe("מערך הוא רשימה מסודרת של ערכים.");
    expect(byName.array.levels.student).toBe("ניגשים לערך לפי index שמתחיל ב-0.");
    expect(byName["console.log"].levels.grandma).toBe("פקודה שמדפיסה ערך לקונסול.");
    expect(byName["console.log"].levels.student).toBe("משתמשים בה לדיבוג; היא לא משנה את הערך עצמו.");

    const badRows = lesson19.concepts.filter((concept) =>
      LOW_SIGNAL_RE.test(`${concept.levels?.grandma || ""} ${concept.levels?.student || ""}`),
    );
    expect(badRows.map((concept) => concept.conceptName)).toEqual([]);
  });

  it("filters generated seeded questions that repeat boilerplate definitions", async () => {
    const badQuestion = {
      id: "bad_seed",
      conceptKey: "lesson_19::array",
      question: "\"array\" הוא רעיון שמופיע הרבה בפועל, כשאנחנו פוגשים אותו בפעם הראשונה זה נראה מסובך.",
      options: ["array", "object"],
      correctIndex: 0,
    };
    const goodQuestion = {
      id: "good_seed",
      conceptKey: "lesson_19::array",
      question: "מהו array?",
      options: ["רשימה מסודרת", "חלון הודעה"],
      correctIndex: 0,
    };
    const context = loadWithConciseDefinitions({
      QUESTIONS_BANK_SEEDED: {
        mc: [badQuestion, goodQuestion],
        fill: [badQuestion],
      },
    });

    await context.ensureSeededBank();

    expect(context.QUESTIONS_BANK.mc.some((question) => question.id === "bad_seed")).toBe(false);
    expect(context.QUESTIONS_BANK.mc.some((question) => question.id === "good_seed")).toBe(true);
    expect(context.QUESTIONS_BANK._seededFiltered).toEqual({ mc: 1, fill: 1 });
  });

  it("keeps SVCollege concise definitions present and short", () => {
    const context = loadWithConciseDefinitions();
    const defs = context.CONCISE_CONCEPT_DEFINITIONS;

    SVCOLLEGE_CONCISE_TERMS.forEach((term) => {
      expect(defs[term], term).toBeTruthy();
      expect(defs[term].what.trim().length, term).toBeGreaterThan(0);
      expect(defs[term].what.length, term).toBeLessThanOrEqual(95);
      expect(defs[term].need.trim().length, term).toBeGreaterThan(0);
      expect(defs[term].need.length, term).toBeLessThanOrEqual(120);
    });
  });
});
