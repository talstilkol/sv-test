const fs = require("fs");
const vm = require("vm");

function loadGlossary() {
  const code = fs.readFileSync("data/glossary.js", "utf8");
  const sandbox = { window: {} };
  vm.runInNewContext(code, sandbox);
  return sandbox.window;
}

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

  it("tracks the expanded glossary version", () => {
    const { GLOSSARY_VERSION } = loadGlossary();
    expect(GLOSSARY_VERSION).toBe("track-d-v2");
  });
});
