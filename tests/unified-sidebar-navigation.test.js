const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

describe("unified sidebar navigation", () => {
  const html = read("index.html");
  const app = read("app.js");
  const css = read("style.css");

  it("adds the context tree branches into the main right sidebar", () => {
    expect(html).toContain('id="sidebar-collapse-btn"');
    expect(html).toContain('aria-label="קפל תפריט ימני"');
    expect(html).toContain('id="sidebar-context-tree"');
    expect(html).toContain('id="sidebar-context-title"');
    expect(html).toContain('id="sidebar-context-count"');
    expect(html).toContain('id="sidebar-context-search"');
    expect(html).toContain('id="sidebar-context-body"');
    expect(html).toContain('class="sidebar-lessons-tree"');
  });

  it("renders the same context tree source into both the sidebar and drawer targets", () => {
    expect(app).toContain('const sidebarCollapseBtn = document.getElementById("sidebar-collapse-btn")');
    expect(app).toContain('const RIGHT_SIDEBAR_COLLAPSED_KEY = "lumenportal:right-sidebar-collapsed:v1"');
    expect(app).toContain("function setRightSidebarCollapsed");
    expect(app).toContain('document.body.classList.toggle("right-sidebar-collapsed", enabled)');
    expect(app).toContain('const sidebarContextTree = document.getElementById("sidebar-context-tree")');
    expect(app).toContain('const sidebarContextBody = document.getElementById("sidebar-context-body")');
    expect(app).toContain('const isHomeContextTree = contextTreeSource.key === "home" || contextTreeSource.title === "עץ האתר"');
    expect(app).toContain("const sidebarSections = isHomeContextTree ? [] : sections");
    expect(app).toContain("if (contextTreeBody) contextTreeBody.innerHTML = treeHtml");
    expect(app).toContain("if (sidebarContextBody) sidebarContextBody.innerHTML = sidebarTreeHtml");
    expect(app).toContain("if (sidebarContextTree) sidebarContextTree.hidden = !sidebarSections.length");
    expect(app).toContain("wireContextTreeActions(contextTreeBody)");
    expect(app).toContain("wireContextTreeActions(sidebarContextBody)");
  });

  it("hides the standalone context panel by default and uses it only as a drawer mode", () => {
    expect(css).toContain(".sidebar-collapse-btn");
    expect(css).toContain("body.right-sidebar-collapsed .sidebar");
    expect(css).toContain("body.right-sidebar-collapsed .sidebar > :not(.sidebar-collapse-btn)");
    expect(css).toContain(".sidebar-context-tree");
    expect(css).toContain(".sidebar-context-body");
    expect(css).toContain(".sidebar-lessons-tree");
    expect(css).toContain("display: none");
    expect(css).toContain("body.learning-focus-mode .context-tree-panel");
    expect(css).toContain("body.lesson-reading-mode:not(.learning-focus-mode) .context-tree-panel");
  });
});
