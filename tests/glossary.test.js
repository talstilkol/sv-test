const fs = require("fs");
const vm = require("vm");

function loadGlossary() {
  const code = fs.readFileSync("data/glossary.js", "utf8");
  const sandbox = { window: {} };
  vm.runInNewContext(code, sandbox);
  return sandbox.window;
}

const SVCOLLEGE_REQUIRED_TERMS = [
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
  "SQL",
  "ORM",
  "migration",
  "transaction",
  "SSR",
  "API route",
  "DI",
  "Docker",
  "CI/CD",
  "RAG",
];

describe("Glossary data", () => {
  it("contains the Phase 4 target of 200+ real terms", () => {
    const { GLOSSARY } = loadGlossary();
    expect(Object.keys(GLOSSARY).length).toBeGreaterThanOrEqual(200);
  });

  it("keeps every glossary entry complete enough for the modal", () => {
    const { GLOSSARY } = loadGlossary();
    const allowed = new Set(["react", "js", "ts", "web", "tooling"]);

    Object.entries(GLOSSARY).forEach(([term, entry]) => {
      expect(term.trim().length).toBeGreaterThan(0);
      expect(entry.he).toBeTruthy();
      expect(entry.short).toBeTruthy();
      expect(entry.long).toBeTruthy();
      expect(allowed.has(entry.category)).toBe(true);
    });
  });

  it("covers SVCollege required technical terms with complete entries", () => {
    const { GLOSSARY } = loadGlossary();

    SVCOLLEGE_REQUIRED_TERMS.forEach((term) => {
      expect(GLOSSARY[term], term).toBeTruthy();
      expect(GLOSSARY[term].he, term).toBeTruthy();
      expect(GLOSSARY[term].short, term).toBeTruthy();
      expect(GLOSSARY[term].long, term).toBeTruthy();
      expect(GLOSSARY[term].category, term).toBeTruthy();
    });
  });

  it("keeps SVCollege short definitions concise", () => {
    const { GLOSSARY } = loadGlossary();

    SVCOLLEGE_REQUIRED_TERMS.forEach((term) => {
      expect(GLOSSARY[term].short.trim().length, term).toBeGreaterThan(0);
      expect(GLOSSARY[term].short.length, term).toBeLessThanOrEqual(95);
    });
  });

  it("tracks the expanded glossary version", () => {
    const { GLOSSARY_VERSION } = loadGlossary();
    expect(GLOSSARY_VERSION).toBe("track-d-v2");
  });
});
