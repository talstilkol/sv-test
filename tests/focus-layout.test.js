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
    expect(html).toContain('id="chrome-control-menu"');
    expect(html).toContain('class="chrome-control-panel"');
    expect(html).toContain("קפל עליון");
    expect(html).toContain("קפל ימין");
    expect(html).toContain('id="focus-mode-toggle"');
    expect(html).toContain('aria-label="הפעל מצב פוקוס ללמידה במסך מלא"');
    expect(html).toContain('id="focus-side-toggle"');
    expect(html).toContain('aria-label="פתח עץ ניווט במצב פוקוס"');
    expect(html).toContain('id="focus-top-toggle"');
    expect(html).toContain('aria-label="קפל את כל האזור העליון במצב פוקוס"');
    expect(html).toContain('id="context-tree-panel"');
    expect(app).toContain('label.textContent = enabled ? "פתח עליון" : "קפל עליון"');
    expect(app).toContain('label.textContent = enabled ? "פתח ימין" : "קפל ימין"');
    expect(css).toContain(".chrome-control-menu");
    expect(css).toContain(".chrome-control-panel .focus-mode-toggle");
    expect(css).toContain(".chrome-control-panel .top-chrome-collapse-btn");
    expect(css).toContain(".chrome-control-panel .sidebar-collapse-btn");
  });

  it("adds a top-right collapse button for the full top menu", () => {
    expect(html).toContain('id="top-chrome-collapse-btn"');
    expect(html).toContain('aria-label="קפל תפריט עליון"');
    expect(app).toContain('const topChromeCollapseBtn = document.getElementById("top-chrome-collapse-btn")');
    expect(app).toContain('const TOP_CHROME_COLLAPSED_KEY = "lumenportal:top-chrome-collapsed:v1"');
    expect(app).toContain("function setTopChromeCollapsed");
    expect(app).toContain('document.body.classList.toggle("top-chrome-collapsed", enabled)');
    expect(css).toContain(".top-chrome-collapse-btn");
    expect(css).toContain("body.top-chrome-collapsed .top-tabs-bar");
    expect(css).toContain("body.top-chrome-collapsed .site-trail-nav");
    expect(css).toContain("body.top-chrome-collapsed .top-nav");
    expect(css).toContain("body.top-chrome-collapsed .portal-decision-aid");
    expect(css).toContain("body.top-chrome-collapsed .content-wrapper");
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
    expect(app).toContain('const FOCUS_TOP_COLLAPSED_KEY = "lumenportal:learning-focus-top-collapsed:v1"');
    expect(app).toContain("function setLearningFocusMode");
    expect(app).toContain("function setLearningFocusTopCollapsed");
    expect(app).toContain('document.body.classList.toggle("learning-focus-mode", enabled)');
    expect(app).toContain('document.body.classList.toggle("learning-focus-top-collapsed", enabled)');
    expect(app).toContain('const className = focusEnabled ? "focus-menu-open" : "mobile-context-open"');
    expect(app).toContain("document.body.classList.toggle(className, open)");
    expect(css).toContain("body.learning-focus-mode .top-tabs-bar");
    expect(css).toContain("body.learning-focus-mode .context-tree-panel");
    expect(css).toContain("body.learning-focus-mode .context-tree-head");
    expect(css).toContain("body.learning-focus-mode .focus-side-toggle");
    expect(css).toContain("transform: translateX(105%)");
    expect(css).toContain("right: 1rem");
    expect(css).toContain("left: auto");
    expect(css).toContain("body.learning-focus-mode.focus-menu-open .context-tree-panel");
    expect(css).toContain("body.learning-focus-mode.learning-focus-top-collapsed .top-nav");
    expect(css).toContain("body.learning-focus-mode.learning-focus-top-collapsed .site-trail-nav");
    expect(css).toContain("body.learning-focus-mode.learning-focus-top-collapsed .portal-decision-aid");
    expect(css).toContain("body.learning-focus-mode.learning-focus-top-collapsed .content-wrapper");
    expect(css).toContain("height: 100vh");
    expect(css).toContain("transform: translateX(0)");
  });

  it("exposes the context tree as a separate mobile drawer without overlapping the lesson drawer", () => {
    expect(app).toContain('window.matchMedia("(max-width: 900px)")');
    expect(app).toContain("function syncContextTreeToggleVisibility");
    expect(app).toContain('document.body.classList.remove("mobile-context-open")');
    expect(app).toContain('document.body.classList.toggle(className, open)');
    expect(app).toContain('focusSideToggle.setAttribute("aria-label", open ? "קפל תוכן עניינים" : "פתח תוכן עניינים")');
    expect(css).toContain("body.mobile-context-open .context-tree-panel");
    expect(css).toContain("width: min(390px, 88vw)");
    expect(css).toContain("max-width: 88vw");
    expect(css).toContain("@media (min-width: 901px)");
  });
});
