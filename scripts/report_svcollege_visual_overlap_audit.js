const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

function includesAll(source, snippets) {
  return snippets.every((snippet) => source.includes(snippet));
}

function runAudit() {
  const html = read("index.html");
  const css = read("style.css");
  const app = read("app.js");

  const checks = [
    {
      id: "floating-control-slots",
      ok: includesAll(css, [
        "--floating-control-left: 1rem",
        "--floating-control-top: 5.4rem",
        "--floating-control-step: 3.35rem",
        "top: calc(var(--floating-control-top) + var(--floating-control-step))",
        "top: calc(var(--floating-control-top) + (var(--floating-control-step) * 2))",
        "top: calc(var(--floating-control-top) + (var(--floating-control-step) * 3))",
      ]),
    },
    {
      id: "mobile-control-offset",
      ok: includesAll(css, [
        "--floating-control-top: 6.25rem",
        "--floating-control-step: 3.1rem",
      ]),
    },
    {
      id: "focus-mode-hides-main-chrome",
      ok: includesAll(css, [
        "body.learning-focus-mode .sidebar",
        "body.learning-focus-mode .top-tabs-bar",
        "body.learning-focus-mode .mobile-menu-toggle",
        "display: none !important",
      ]),
    },
    {
      id: "left-display-controls-stay-fixed",
      ok: includesAll(css, [
        "body.top-chrome-collapsed .theme-toggle-btn",
        "body.top-chrome-collapsed .focus-mode-toggle",
        "body.top-chrome-collapsed .view-mode-fab",
        "body.right-sidebar-collapsed .theme-toggle-btn",
        "body.right-sidebar-collapsed .focus-mode-toggle",
        "body.right-sidebar-collapsed .view-mode-fab",
        "body.learning-focus-mode .global-print-btn",
        "body.learning-focus-mode .theme-toggle-btn",
        "body.learning-focus-mode .view-mode-fab",
        "position: fixed",
        "left: var(--floating-control-left)",
        "display: inline-flex !important",
      ]),
    },
    {
      id: "focus-top-collapse-full-height",
      ok: includesAll(css, [
        "body.learning-focus-mode.learning-focus-top-collapsed .top-nav",
        "body.learning-focus-mode.learning-focus-top-collapsed .site-trail-nav",
        "body.learning-focus-mode.learning-focus-top-collapsed .portal-decision-aid",
        "body.learning-focus-mode.learning-focus-top-collapsed .content-wrapper",
        "height: 100vh",
      ]),
    },
    {
      id: "lesson-reading-content-first",
      ok: includesAll(css, [
        "body.lesson-reading-mode:not(.learning-focus-mode) .sidebar",
        "body.lesson-reading-mode:not(.learning-focus-mode) .top-tabs-bar",
        "body.lesson-reading-mode:not(.learning-focus-mode) .lesson-banner",
        "body.lesson-reading-mode:not(.learning-focus-mode) .lesson-body-title",
      ]) && includesAll(app, [
        'document.body.classList.add("lesson-reading-mode")',
        'document.body.classList.remove("lesson-reading-mode")',
      ]),
    },
    {
      id: "unified-sidebar-tree",
      ok: includesAll(html, [
        'id="sidebar-collapse-btn"',
        'aria-label="קפל תפריט ימני"',
        'id="sidebar-context-tree"',
        'id="sidebar-context-body"',
        'class="sidebar-lessons-tree"',
      ]) && includesAll(app, [
        'const sidebarCollapseBtn = document.getElementById("sidebar-collapse-btn")',
        'const RIGHT_SIDEBAR_COLLAPSED_KEY = "lumenportal:right-sidebar-collapsed:v1"',
        "function setRightSidebarCollapsed",
        'document.body.classList.toggle("right-sidebar-collapsed", enabled)',
        'const isHomeContextTree = contextTreeSource.key === "home" || contextTreeSource.title === "עץ האתר"',
        "const sidebarSections = isHomeContextTree ? [] : sections",
        "if (sidebarContextBody) sidebarContextBody.innerHTML = sidebarTreeHtml",
        "if (sidebarContextTree) sidebarContextTree.hidden = !sidebarSections.length",
        "wireContextTreeActions(sidebarContextBody)",
      ]) && includesAll(css, [
        ".sidebar-collapse-btn",
        "body.right-sidebar-collapsed .sidebar",
        "body.right-sidebar-collapsed .sidebar > :not(.sidebar-collapse-btn)",
        ".sidebar-context-tree",
        ".context-tree-panel",
        "display: none",
      ]),
    },
    {
      id: "single-top-tabs-row",
      ok: includesAll(css, [
        ".top-tabs-bar",
        "flex-wrap: nowrap",
        "overflow-x: auto",
      ]),
    },
    {
      id: "top-chrome-collapse-control",
      ok: includesAll(html, [
        'id="top-chrome-collapse-btn"',
        'aria-label="קפל תפריט עליון"',
      ]) && includesAll(app, [
        'const topChromeCollapseBtn = document.getElementById("top-chrome-collapse-btn")',
        'const TOP_CHROME_COLLAPSED_KEY = "lumenportal:top-chrome-collapsed:v1"',
        "function setTopChromeCollapsed",
        'document.body.classList.toggle("top-chrome-collapsed", enabled)',
      ]) && includesAll(css, [
        ".top-chrome-collapse-btn",
        "body.top-chrome-collapsed .top-tabs-bar",
        "body.top-chrome-collapsed .site-trail-nav",
        "body.top-chrome-collapsed .top-nav",
        "body.top-chrome-collapsed .portal-decision-aid",
        "body.top-chrome-collapsed .content-wrapper",
      ]),
    },
  ];

  const failures = checks.filter((check) => !check.ok).map((check) => check.id);
  return {
    reportVersion: "svcollege-visual-overlap-audit-v1",
    ready: failures.length === 0,
    checks: checks.length,
    failures,
  };
}

if (require.main === module) {
  const report = runAudit();
  if (process.argv.includes("--summary")) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log(report.ready ? "SVCollege visual overlap audit: ready" : `SVCollege visual overlap audit failed: ${report.failures.join(", ")}`);
  }
  if (process.argv.includes("--strict") && !report.ready) process.exit(1);
}

module.exports = { runAudit };
