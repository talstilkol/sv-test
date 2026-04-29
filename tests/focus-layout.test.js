const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

function cssBlock(css, selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = css.match(new RegExp(`${escaped}\\s*\\{([\\s\\S]*?)\\}`));
  return match ? match[1] : "";
}

describe("focus learning layout", () => {
  const html = read("index.html");
  const app = read("app.js");
  const css = read("style.css");

  it("exposes focus controls without replacing the existing lesson tree", () => {
    expect(html).toContain('id="focus-mode-toggle"');
    expect(html).toContain('aria-label="הפעל מצב פוקוס ללמידה במסך מלא"');
    expect(html).toContain('id="focus-side-toggle"');
    expect(html).toContain('aria-label="פתח עץ ניווט במצב פוקוס"');
    expect(html).toContain('id="context-tree-panel"');
  });

  it("mounts W12 XP controls in the right sidebar instead of the central toolbar", () => {
    expect(app).toContain('const utilityBar = document.getElementById("w12-top-bar")');
    expect(app).toContain('const sidebarHeader = document.querySelector(".sidebar-header")');
    expect(app).toContain("sidebarHeader.appendChild(utilityBar)");
    expect(cssBlock(css, ".w12-top-bar")).toContain("position: static");
    expect(cssBlock(css, ".sidebar-header .w12-top-bar")).toContain("justify-content: center");
    expect(cssBlock(css, ".top-tabs-bar")).not.toContain("13.25rem");
  });

  it("keeps top navigation compact as one scrollable row", () => {
    const block = cssBlock(css, ".top-tabs-bar");
    expect(block).toContain("flex-wrap: nowrap");
    expect(block).toContain("overflow-x: auto");
    expect(cssBlock(css, ".top-tab.top-tab-home")).toContain("margin-right: 0");
  });

  it("provides full-screen focus mode with a slide-in context tree", () => {
    expect(app).toContain('const FOCUS_MODE_KEY = "lumenportal:learning-focus:v1"');
    expect(app).toContain("function setLearningFocusMode");
    expect(app).toContain('document.body.classList.toggle("learning-focus-mode", enabled)');
    expect(app).toContain('document.body.classList.toggle("focus-menu-open", open)');
    expect(css).toContain("body.learning-focus-mode .top-tabs-bar");
    expect(css).toContain("body.learning-focus-mode .context-tree-panel");
    expect(css).toContain("transform: translateX(105%)");
    expect(css).toContain("body.learning-focus-mode.focus-menu-open .context-tree-panel");
    expect(css).toContain("transform: translateX(0)");
  });
});
