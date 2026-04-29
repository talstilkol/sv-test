#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const REPORT_VERSION = "svcollege-accessibility-smoke-v1";

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

function missingSnippets(text, snippets) {
  return snippets.filter((snippet) => !text.includes(snippet));
}

function topTabButtons(html) {
  const matches = html.match(/<button class="top-tab[\s\S]*?<\/button>/g) || [];
  return matches.map((button) => ({
    html: button,
    id: (button.match(/id="([^"]+)"/) || [])[1] || "",
    ariaLabel: (button.match(/aria-label="([^"]+)"/) || [])[1] || "",
    dataTab: (button.match(/data-tab="([^"]+)"/) || [])[1] || "",
  }));
}

const STATIC_CHECKS = Object.freeze([
  Object.freeze({
    id: "focus-order-shell",
    label: "Focus order shell",
    file: "index.html",
    snippets: Object.freeze([
      'id="mobile-toggle"',
      'aria-expanded="false"',
      'id="focus-mode-toggle"',
      'aria-pressed="false"',
      'id="focus-side-toggle"',
      'id="top-tabs-bar"',
      'id="context-tree-search"',
      'aria-label="חיפוש בעץ הניווט"',
    ]),
  }),
  Object.freeze({
    id: "modal-close-controls",
    label: "Modal close controls",
    file: "index.html",
    snippets: Object.freeze([
      'id="glossary-close" aria-label="סגור"',
      'id="reflection-close" aria-label="סגור"',
      'id="reverse-close" aria-label="סגור"',
      'id="time-machine-close" aria-label="סגור"',
      'id="lesson-wrap-overlay" class="lesson-wrap-overlay"',
      'role="dialog" aria-modal="true"',
      'id="ai-tutor-modal"',
      'id="ai-tutor-close" aria-label="סגור"',
    ]),
  }),
  Object.freeze({
    id: "keyboard-navigation",
    label: "Keyboard navigation",
    file: "app.js",
    snippets: Object.freeze([
      'document.addEventListener("keydown"',
      'if (e.key === "Escape"',
      'if (event.key === "Enter" || event.key === " ")',
      'aria-expanded',
      'aria-pressed',
      '.focus()',
      'focusSideToggle?.setAttribute("aria-expanded", "false")',
    ]),
  }),
  Object.freeze({
    id: "focus-ring-css",
    label: "Focus ring CSS",
    file: "style.css",
    snippets: Object.freeze([
      "button:focus-visible",
      "a:focus-visible",
      "input:focus-visible",
      "select:focus-visible",
      "textarea:focus-visible",
      "outline: 2px solid var(--primary)",
      ".context-tree-search:focus",
      ".q-stuck-feedback:focus-visible",
    ]),
  }),
  Object.freeze({
    id: "contrast-and-motion",
    label: "Contrast and motion controls",
    file: "style.css",
    snippets: Object.freeze([
      "body.a11y-high-contrast",
      "--text-bright: #ffffff",
      "--text-main: #f5f5f5",
      "--text-muted: #d4d4d8",
      "body.a11y-reduce-motion",
      "scroll-behavior: auto !important",
    ]),
  }),
  Object.freeze({
    id: "a11y-state-controls",
    label: "A11y state controls",
    file: "app.js",
    snippets: Object.freeze([
      'const A11Y_KEY = "lumenportal:a11y:v1"',
      'const A11Y_TOGGLES = ["dyslexia-font", "reduce-motion", "high-contrast", "large-text"]',
      "document.body.classList.toggle(`a11y-${k}`, a11yState[k])",
      'btn.setAttribute("aria-pressed", a11yState[k] ? "true" : "false")',
    ]),
  }),
]);

function buildReport() {
  const files = {
    "index.html": read("index.html"),
    "app.js": read("app.js"),
    "style.css": read("style.css"),
  };
  const checks = STATIC_CHECKS.map((check) => {
    const failures = missingSnippets(files[check.file], check.snippets).map((snippet) => `missing ${check.file}: ${snippet}`);
    return {
      id: check.id,
      label: check.label,
      status: failures.length ? "fail" : "pass",
      passed: failures.length === 0,
      failures,
    };
  });

  const tabs = topTabButtons(files["index.html"]);
  const tabFailures = [];
  if (tabs.length < 20) tabFailures.push(`expected at least 20 top tabs, found ${tabs.length}`);
  tabs.forEach((tab) => {
    if (!tab.id) tabFailures.push("top tab missing id");
    if (!tab.dataTab) tabFailures.push(`top tab missing data-tab: ${tab.id || "unknown"}`);
    if (!tab.ariaLabel) tabFailures.push(`top tab missing aria-label: ${tab.id || "unknown"}`);
  });
  checks.push({
    id: "top-tab-labels",
    label: "Top tab accessible names",
    status: tabFailures.length ? "fail" : "pass",
    passed: tabFailures.length === 0,
    failures: tabFailures,
  });

  const failed = checks.filter((check) => !check.passed);
  return {
    reportVersion: REPORT_VERSION,
    date: "2026-04-29",
    target: "SVCollege accessibility smoke: focus, modals, keyboard, contrast",
    summary: {
      checks: checks.length,
      passed: checks.length - failed.length,
      failed: failed.length,
      topTabs: tabs.length,
      ready: failed.length === 0,
    },
    checks,
  };
}

function toMarkdown(report) {
  return [
    "# SVCollege Accessibility Smoke",
    "",
    `- Date: ${report.date}`,
    `- Target: ${report.target}`,
    `- Checks: ${report.summary.passed}/${report.summary.checks}`,
    `- Top tabs: ${report.summary.topTabs}`,
    `- Ready: ${report.summary.ready ? "Yes" : "No"}`,
    "",
    "| Check | Status | Failures |",
    "|---|---|---|",
    ...report.checks.map((check) =>
      `| ${check.label} | ${check.status} | ${check.failures.join("<br>") || "none"} |`,
    ),
    "",
  ].join("\n");
}

function run(argv = process.argv.slice(2)) {
  const report = buildReport();
  if (argv.includes("--json")) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  } else if (argv.includes("--summary")) {
    process.stdout.write(`${JSON.stringify(report.summary, null, 2)}\n`);
  } else {
    process.stdout.write(`${toMarkdown(report)}\n`);
  }
  if (argv.includes("--strict") && !report.summary.ready) process.exitCode = 1;
  return report;
}

if (require.main === module) run();

module.exports = {
  STATIC_CHECKS,
  buildReport,
  run,
  toMarkdown,
};
