#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const REPORT_VERSION = "exam-accessibility-audit-v1";
const REPORT_DATE = "2026-04-29";

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

function addCheck(checks, id, label, passed, detail) {
  checks.push({ id, label, passed: Boolean(passed), status: passed ? "pass" : "fail", detail });
}

function buildReport() {
  const html = read("index.html");
  const app = read("app.js");
  const css = read("style.css");
  const checks = [];

  addCheck(
    checks,
    "tree-navigation",
    "Tree navigation has names, search and keyboard state",
    html.includes('id="context-tree-panel" aria-label="תת תפריט עץ"') &&
      html.includes('id="context-tree-search"') &&
      html.includes('aria-label="חיפוש בעץ הניווט"') &&
      html.includes('id="page-scroll-rail" aria-label="ניווט מהיר בתוך הדף"') &&
      app.includes("aria-expanded") &&
      app.includes("if (event.key === \"Enter\" || event.key === \" \")"),
    "Context tree, page rail and keyboard toggles must remain accessible.",
  );
  addCheck(
    checks,
    "modal-dialogs",
    "Modals expose dialog semantics and close labels",
    html.includes('id="xp-detail-overlay" class="xp-detail-overlay" style="display:none" role="dialog" aria-modal="true"') &&
      html.includes('id="achievements-overlay" class="achievements-overlay" style="display:none" role="dialog" aria-modal="true"') &&
      html.includes('id="reflection-overlay" class="reflection-overlay" style="display:none" role="dialog" aria-modal="true"') &&
      html.includes('id="lesson-wrap-overlay" class="lesson-wrap-overlay" style="display:none" role="dialog" aria-modal="true"') &&
      html.includes('id="ai-tutor-modal" class="ai-tutor-modal hidden" role="dialog" aria-modal="true"') &&
      html.includes('aria-label="סגור"'),
    "Dialog overlays need role, modal state and close controls.",
  );
  addCheck(
    checks,
    "store-accessibility",
    "Store has accessible tab, filters and disabled states",
    html.includes('id="open-reward-store"') &&
      html.includes('aria-label="פתח חנות חוויות עם מטבעות למידה"') &&
      html.includes('id="reward-store-filters" aria-label="סינון חנות"') &&
      app.includes("data-store-filter") &&
      app.includes("data-store-buy") &&
      app.includes("disabled"),
    "Reward store must expose labelled entry, filter controls and purchase state.",
  );
  addCheck(
    checks,
    "xp-panel-accessibility",
    "XP panel is keyboard reachable and labelled",
    html.includes('id="xp-detail-overlay"') &&
      html.includes('id="xp-detail-close"') &&
      app.includes('el.setAttribute("role", "button")') &&
      app.includes('el.setAttribute("tabindex", "0")') &&
      app.includes('el.setAttribute("aria-label", "פתח פירוט XP ומטבעות")') &&
      app.includes('if (event.key === "Enter" || event.key === " ")'),
    "XP widget and detail panel must be reachable without a mouse.",
  );
  addCheck(
    checks,
    "mock-exam-accessibility",
    "Mock exam runner exposes live progress, labels and question navigation",
    html.includes('id="mx-progress" aria-live="polite"') &&
      html.includes('id="mx-timer" aria-live="polite"') &&
      html.includes('id="mx-question" role="region" aria-label="שאלת מבחן נוכחית"') &&
      html.includes('id="mx-question-nav" aria-label="ניווט בין שאלות המבחן"') &&
      html.includes('aria-label="הגש מבחן מדומה"') &&
      app.includes('aria-label="עבור לשאלה ${i+1}"'),
    "Timed exam UI must expose progress and navigation to assistive tech.",
  );
  addCheck(
    checks,
    "focus-and-motion-css",
    "Focus rings and reduced motion styles are present",
    css.includes("button:focus-visible") &&
      css.includes("input:focus-visible") &&
      css.includes("@media (prefers-reduced-motion: reduce)") &&
      css.includes("transition: none !important") &&
      css.includes("transform: none !important"),
    "Core focus visibility and reduced-motion safety must remain available.",
  );
  addCheck(
    checks,
    "screen-reader-pass",
    "WCAG 2.1 AA screen-reader pass covers live regions and support modal semantics",
    html.includes('role="dialog" aria-modal="true" aria-labelledby="support-report-title"') &&
      html.includes('readonly aria-label="פלט JSON של דיווח באג"') &&
      html.includes('aria-live="polite"') &&
      html.includes('role="region" aria-label="שאלת מבחן נוכחית"') &&
      app.includes("renderSupportContextPreview") &&
      app.includes("aria-expanded"),
    "Major dialogs, live progress, current exam question and support payload output must expose screen-reader semantics.",
  );

  const failed = checks.filter((check) => !check.passed);
  return {
    reportVersion: REPORT_VERSION,
    date: REPORT_DATE,
    target: "Exam portal accessibility: WCAG 2.1 AA screen-reader pass for tree, modals, store, XP panel, mock exam and support reports",
    summary: {
      checks: checks.length,
      passed: checks.length - failed.length,
      failed: failed.length,
      ready: failed.length === 0,
    },
    checks,
    blockers: failed.map((check) => ({ id: check.id, label: check.label, detail: check.detail })),
  };
}

function run(argv = process.argv.slice(2)) {
  const report = buildReport();
  if (argv.includes("--json")) process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  else process.stdout.write(`${JSON.stringify(report.summary, null, 2)}\n`);
  if (argv.includes("--strict") && !report.summary.ready) process.exitCode = 1;
  return report;
}

if (require.main === module) run();

module.exports = { buildReport, run };
