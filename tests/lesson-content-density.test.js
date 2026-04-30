const fs = require("fs");
const path = require("path");

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
    expect(css).toContain("body.lesson-reading-mode:not(.learning-focus-mode) .sidebar");
    expect(css).toContain("body.lesson-reading-mode:not(.learning-focus-mode) .top-tabs-bar");
    expect(css).toContain("display: none !important");
    expect(css).toContain("body.lesson-reading-mode:not(.learning-focus-mode) .context-tree-panel");
    expect(css).toContain("body.lesson-reading-mode:not(.learning-focus-mode).mobile-context-open .context-tree-panel");
    expect(css).toContain("body.lesson-reading-mode:not(.learning-focus-mode) .focus-side-toggle");
  });

  it("removes repeated lesson chrome from the content body", () => {
    expect(app).not.toContain('class="lesson-body-title"');
    expect(app).toContain("function renderLessonTopMenus");
    expect(css).toContain("body.lesson-reading-mode:not(.learning-focus-mode) .lesson-banner");
    expect(css).toContain("body.lesson-reading-mode:not(.learning-focus-mode) .lesson-body-title");
    expect(css).toContain("body.lesson-reading-mode:not(.learning-focus-mode) .lesson-article");
  });
});
