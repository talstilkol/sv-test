#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const topTabs = require("./report_svcollege_top_tab_browser_smoke.js");
const contextTree = require("./report_svcollege_context_tree_smoke.js");
const criticalFlows = require("./report_svcollege_critical_flows.js");

const ROOT = path.resolve(__dirname, "..");
const REPORT_VERSION = "svcollege-full-portal-smoke-v1";
const REPORT_DATE = new Date().toISOString().slice(0, 10);
const BROWSER_SMOKE_PATH = "SVCOLLEGE_BROWSER_SMOKE.md";

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

function addCheck(checks, id, label, passed, detail) {
  checks.push({
    id,
    label,
    passed: Boolean(passed),
    status: passed ? "pass" : "fail",
    detail,
  });
}

function sourceEvidence() {
  const html = read("index.html");
  const app = read("app.js");
  const css = read("style.css");
  const browserSmoke = read(BROWSER_SMOKE_PATH);
  return { html, app, css, browserSmoke };
}

function topTabPrimaryActions(topReport) {
  const tabs = (topReport.summary.expectedTabs || 0);
  const evidenceTabs = (topReport.summary.evidenceTabs || 0);
  return {
    tabs,
    evidenceTabs,
    ready:
      topReport.summary.ready === true &&
      tabs > 0 &&
      evidenceTabs === tabs &&
      topReport.summary.passedTabs === tabs &&
      topReport.summary.failedTabs === 0,
  };
}

function buildReport() {
  const sources = sourceEvidence();
  const topReport = topTabs.buildReport();
  const treeReport = contextTree.buildReport();
  const flowReport = criticalFlows.buildReport();
  const primaryActions = topTabPrimaryActions(topReport);
  const desktopChecks = [];
  const mobileChecks = [];

  addCheck(
    desktopChecks,
    "desktop-top-tabs",
    "Desktop Playwright evidence covers every top tab",
    primaryActions.ready &&
      sources.browserSmoke.includes("Top-tab desktop smoke | Pass") &&
      sources.browserSmoke.includes("Console error logs | 0"),
    `${primaryActions.evidenceTabs}/${primaryActions.tabs} top tabs, ${topReport.summary.consoleErrors} console errors.`,
  );
  addCheck(
    desktopChecks,
    "desktop-context-tree",
    "Desktop context tree covers branches and submenus",
    treeReport.summary.ready === true &&
      treeReport.summary.failed === 0 &&
      sources.browserSmoke.includes("Lesson side tree | Pass") &&
      sources.browserSmoke.includes("Lesson concept tree | Pass"),
    `${treeReport.summary.passed}/${treeReport.summary.targets} tree targets.`,
  );
  addCheck(
    desktopChecks,
    "desktop-primary-actions",
    "Primary learning actions are wired",
    flowReport.summary.ready === true && flowReport.summary.failed === 0,
    `${flowReport.summary.passed}/${flowReport.summary.flows} critical flows.`,
  );
  addCheck(
    desktopChecks,
    "desktop-lesson-navigation",
    "Right lesson tree opens a real lesson",
    sources.browserSmoke.includes("Click lesson 11 in right lesson tree | Pass") &&
      sources.app.includes("function openLesson") &&
      sources.app.includes("setLessonContextTree"),
    "Browser evidence plus source wiring for lesson navigation.",
  );

  addCheck(
    mobileChecks,
    "mobile-top-tabs",
    "Mobile Playwright evidence covers every top tab",
    sources.browserSmoke.includes(`Mobile 390×844: all ${primaryActions.tabs} top tabs open with populated \`main\` content | Pass`) &&
      sources.browserSmoke.includes(`Top tabs | \`${primaryActions.tabs}/${primaryActions.tabs}\` opened; \`0\` empty-content failures`),
    "Existing mobile evidence covers all top tabs with populated main content.",
  );
  addCheck(
    mobileChecks,
    "mobile-drawer",
    "Mobile drawer and context tree are mutually wired",
    sources.html.includes('id="mobile-toggle"') &&
      sources.app.includes('document.body.classList.remove("mobile-context-open")') &&
      sources.app.includes('const className = focusEnabled ? "focus-menu-open" : "mobile-context-open"') &&
      sources.css.includes("body.mobile-context-open .context-tree-panel"),
    "Mobile lesson drawer and context drawer do not share one open state.",
  );
  addCheck(
    mobileChecks,
    "mobile-right-tree",
    "Mobile keeps the right tree active while switching tabs",
    sources.browserSmoke.includes("Mobile 390×844: context tree remains active while switching tabs | Pass") &&
      sources.app.includes("syncContextTreeToggleVisibility") &&
      sources.css.includes("width: min(390px, 88vw)"),
    "Context drawer remains bounded and switchable on mobile.",
  );
  addCheck(
    mobileChecks,
    "mobile-focus-mode",
    "Mobile focus mode hides top chrome and exposes content tree",
    sources.browserSmoke.includes("Mobile 390×844: focus mode hides top tabs and uses side context tree | Pass") &&
      sources.browserSmoke.includes("Focus mode | `body.learning-focus-mode`; top tabs hidden") &&
      sources.app.includes("function setLearningFocusMode") &&
      sources.css.includes("body.learning-focus-mode .top-tabs-bar"),
    "Focus mode evidence and source wiring are present.",
  );
  addCheck(
    mobileChecks,
    "mobile-console",
    "Mobile smoke has zero console errors or warnings",
    sources.browserSmoke.includes("Console | `0` errors, `0` warnings"),
    "Mobile Browser/Playwright smoke must stay clean.",
  );

  const checks = [...desktopChecks, ...mobileChecks];
  const failed = checks.filter((check) => !check.passed);
  return {
    reportVersion: REPORT_VERSION,
    date: REPORT_DATE,
    target: "SVCollege full portal desktop/mobile smoke gate",
    evidence: {
      browserSmoke: BROWSER_SMOKE_PATH,
      topTabs: topTabs.EVIDENCE_PATH,
    },
    summary: {
      checks: checks.length,
      passed: checks.length - failed.length,
      failed: failed.length,
      desktopReady: desktopChecks.every((check) => check.passed),
      mobileReady: mobileChecks.every((check) => check.passed),
      ready: failed.length === 0,
    },
    desktopChecks,
    mobileChecks,
    blockers: failed.map((check) => ({
      id: check.id,
      label: check.label,
      detail: check.detail,
    })),
  };
}

function toMarkdown(report) {
  const rows = [...report.desktopChecks, ...report.mobileChecks].map((check) =>
    `| ${check.label} | ${check.status} | ${String(check.detail || "").replace(/\|/g, "\\|")} |`,
  );
  return [
    "# SVCollege Full Portal Smoke",
    "",
    `- Date: ${report.date}`,
    `- Target: ${report.target}`,
    `- Desktop ready: ${report.summary.desktopReady ? "Yes" : "No"}`,
    `- Mobile ready: ${report.summary.mobileReady ? "Yes" : "No"}`,
    `- Ready: ${report.summary.ready ? "Yes" : "No"}`,
    "",
    "| Check | Status | Detail |",
    "|---|---|---|",
    ...rows,
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
  buildReport,
  run,
  toMarkdown,
};
