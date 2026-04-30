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
  "let",
  "github workflow",
  "variable",
  "array",
  "function",
  "object",
  "property",
  "class",
  "extends",
  "super",
  "html document",
  "html form",
  "document",
  "document object model",
  "file system",
  "css selector",
  "box model",
  "cascade and specificity",
  "stack",
  "heap",
  "reference",
  "by reference",
  "by value",
  "pointer",
  "array reference",
  "object reference",
  "scope",
  "callback",
  "getelementbyid",
  "getelementsbytagname",
  "getelementsbyclassname",
  "innerhtml",
  "attribute",
  "setattribute",
  "style",
  "createelement",
  "appendchild",
  "removechild",
  "replacechild",
  "constructor",
  "instance",
  "new",
  "setitem",
  "getitem",
  "queryselector",
  "queryselectorall",
  "http",
  "url",
  "protocol",
  "path",
  "client",
  "server",
  "request",
  "response",
  "headers",
  "rest api",
  "create",
  "read",
  "update",
  "body",
  "express",
  "app",
  "port",
  "app.get",
  "app.post",
  "app.listen",
  "app.use",
  "static files",
  "query parameters",
  "status codes",
  "1xx-2xx-3xx",
  "4xx-5xx",
  "promise",
  "synchronous",
  "asynchronous",
  "settimeout",
  "anonymous function",
  "resolve",
  "reject",
  "then",
  "error",
  "exception",
  "catch (promise)",
  "async",
  "await",
  "component",
  "jsx",
  "rendering",
  "container vs presentational",
  "lifting state up",
  "prop",
  "state",
  "setstate",
  "controlled input",
  "re-render",
  "passing function as prop",
  "hook",
  "useeffect",
  "cleanup",
  "fetching data",
  "usememo",
  "dependency array",
  "infinite loop",
  "file-system routing",
  "server component",
  "seo",
  "route",
  "page",
  "layout",
  "image optimization",
  "middleware",
  "token",
  "access token",
  "refresh token",
  "bcrypt",
  "supabase auth",
  "firebase auth",
  "provider auth",
  "kinde/appwrite",
  "cookie",
  "session",
  "sql",
  "database",
  "row",
  "column",
  "postgresql",
  "prisma",
  "drizzle",
  "mongoose",
  "schema",
  "model",
  "findoneandupdate",
  "orm",
  "repository pattern",
  "migration",
  "transaction",
  "$eq",
  "$gt",
  "$lt",
  "ssr",
  "api route",
  "di",
  "interceptor",
  "docker",
  "container",
  "service",
  "production readiness",
  "release checklist",
  "vercel deploy",
  "eslint",
  "prettier",
  "preview deployment",
  "ci/cd",
  "rag",
  "vercel ai sdk",
  "agent loop",
  "retrieval ranking",
  "guardrails",
  "langchain",
  "prompt messages",
  "fine-tuning boundary",
  "cva",
  "accessible primitive",
  "aschild slot",
  "aschild",
  "design system testing",
  "theme tokens",
  "component registry",
  "error boundaries",
  "error object",
  "performance optimization",
  "composition vs inheritance",
  "code splitting",
  "state management",
  "context api",
  "testing strategies",
  "data flow",
  "responsive design",
  "tailwind css",
  "utility classes",
  "tailwind installation",
  "navbar",
  "add/delete movie",
  "flex",
  "grid",
  "rating",
  "search",
  "validation",
  "accessibility basics",
  "commit",
  "branch",
  "next.js",
  "nest.js",
  "decorator",
  "git",
  "repository",
  "working tree",
  "staging area",
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

  it("does not expose generated seeded question loading", () => {
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

    expect(context.ensureSeededBank).toBeUndefined();
    expect(context.QUESTIONS_BANK.mc.some((question) => question.id === "bad_seed")).toBe(false);
    expect(context.QUESTIONS_BANK.mc.some((question) => question.id === "good_seed")).toBe(false);
    expect(context.QUESTIONS_BANK._manualOnly).toBe(true);
  });

  it("keeps SVCollege concise definitions present and short", () => {
    const context = loadWithConciseDefinitions();
    const defs = context.CONCISE_CONCEPT_DEFINITIONS;

    SVCOLLEGE_CONCISE_TERMS.forEach((term) => {
      expect(defs[term], term).toBeTruthy();
      expect(defs[term].what.trim().length, term).toBeGreaterThan(0);
      expect(defs[term].what.length, term).toBeLessThanOrEqual(95);
    });
  });
});
