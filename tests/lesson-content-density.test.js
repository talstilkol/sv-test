const fs = require("fs");
const path = require("path");
const { cssIncludes } = require("./css-evidence.js");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

describe("lesson content density layout", () => {
  const app = read("app.js");
  const css = read("style.css");

  it("marks active lessons with a content-first body class", () => {
    expect(app).toContain('document.body.classList.add("lesson-reading-mode")');
    expect(app).toContain('document.body.classList.remove("lesson-reading-mode")');
    expect(app).toContain('const readingEnabled = document.body.classList.contains("lesson-reading-mode")');
    expect(app).toContain("focusSideToggle.hidden = !(focusEnabled || mobileEnabled || readingEnabled)");
  });

  it("collapses duplicate desktop navigation while keeping the content tree reachable", () => {
    expect(cssIncludes(css, "body.lesson-reading-mode:not(.learning-focus-mode) .sidebar")).toBe(true);
    expect(cssIncludes(css, "body.lesson-reading-mode:not(.learning-focus-mode) .top-tabs-bar")).toBe(true);
    expect(cssIncludes(css, "display: none !important")).toBe(true);
    expect(cssIncludes(css, "body.lesson-reading-mode:not(.learning-focus-mode) .context-tree-panel")).toBe(true);
    expect(cssIncludes(css, "body.lesson-reading-mode:not(.learning-focus-mode).mobile-context-open .context-tree-panel")).toBe(true);
    expect(cssIncludes(css, "body.lesson-reading-mode:not(.learning-focus-mode) .focus-side-toggle")).toBe(true);
  });

  it("removes repeated lesson chrome from the content body", () => {
    expect(app).not.toContain('class="lesson-body-title"');
    expect(app).toContain("function renderLessonTopMenus");
    expect(cssIncludes(css, "body.lesson-reading-mode:not(.learning-focus-mode) .lesson-banner")).toBe(true);
    expect(cssIncludes(css, "body.lesson-reading-mode:not(.learning-focus-mode) .lesson-body-title")).toBe(true);
    expect(cssIncludes(css, "body.lesson-reading-mode:not(.learning-focus-mode) .lesson-article")).toBe(true);
  });
});
