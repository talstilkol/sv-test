const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

describe("language and development tools comparison tab", () => {
  const html = read("index.html");
  const app = read("app.js");
  const css = read("style.css");

  it("adds a dedicated top-level portal tab and view", () => {
    expect(html).toContain('id="open-language-tools"');
    expect(html).toContain('data-tab="language-tools"');
    expect(html).toContain("השוואת שפות וכלי פיתוח");
    expect(html).toContain('id="language-tools-view"');
    expect(html).toContain('id="language-tools-content"');
    expect(app).toContain('const languageToolsView = document.getElementById("language-tools-view")');
    expect(app).toContain('const openLanguageToolsBtn = document.getElementById("open-language-tools")');
    expect(app).toContain("function openLanguageTools");
    expect(app).toContain("function renderLanguageTools");
    expect(app).toContain("function setLanguageToolsContextTree");
  });

  it("explains React Next and Node as different layers", () => {
    [
      "React",
      "Next.js",
      "Node.js",
      "Frontend UI",
      "Full-Stack Web Framework",
      "Backend Runtime",
      "Next.js הוא לא תחליף ל-React",
      "Node.js הוא לא תחליף ל-React",
    ].forEach((term) => {
      expect(app).toContain(term);
    });
  });

  it("groups languages and tools by practical domains with scores", () => {
    [
      "frontend-ui",
      "fullstack-web",
      "js-runtime",
      "backend-languages",
      "systems-mobile",
      "dev-tools",
      "TypeScript",
      "Vite",
      "Vitest + Playwright",
      "Docker",
    ].forEach((term) => {
      expect(app).toContain(term);
    });
    expect(app).toContain("renderScoreDots");
  });

  it("includes focused styles for comparison tables and score bars", () => {
    [
      ".language-tools-view",
      ".lt-layer-summary",
      ".lt-table",
      ".lt-score",
      ".lt-final-rule",
    ].forEach((selector) => {
      expect(css).toContain(selector);
    });
  });
});
