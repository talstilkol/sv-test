#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const REPORT_VERSION = "performance-budget-v1";
const REPORT_DATE = new Date().toISOString().slice(0,10);

const BUDGETS = Object.freeze({
  "index.html": 120000,
  "app.js": 1750000,
  "style.css": 700000,
  "service-worker.js": 30000,
});

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

function size(file) {
  return fs.statSync(path.join(ROOT, file)).size;
}

function addCheck(checks, id, label, passed, detail, meta = {}) {
  checks.push({ id, label, passed: Boolean(passed), status: passed ? "pass" : "fail", detail, ...meta });
}

function buildReport() {
  const html = read("index.html");
  const app = read("app.js");
  const loader = read("content-loader.js");
  const sw = read("service-worker.js");
  const checks = [];

  Object.entries(BUDGETS).forEach(([file, budget]) => {
    const actual = size(file);
    addCheck(
      checks,
      `size-${file.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`,
      `${file} size budget`,
      actual <= budget,
      `${actual}/${budget} bytes`,
      { actualBytes: actual, budgetBytes: budget },
    );
  });
  addCheck(
    checks,
    "manual-bank-only",
    "Generated question banks are not loaded by the app shell",
    !html.includes("questions_bank_seeded.js") &&
      !loader.includes("ensureSeededBank") &&
      !loader.includes('s.src = "data/questions_bank_seeded.js"'),
    "Learner-facing question content must come from manually authored banks only.",
  );
  addCheck(
    checks,
    "lazy-render-hooks",
    "Heavy learning surfaces avoid generated-bank preload hooks",
    !app.includes("window.ensureSeededBank().then") &&
      app.includes("requestAnimationFrame(refreshPageScrollRail)"),
    "Study, concept sprint, mock exam and scroll rail should not preload generated question banks.",
  );
  addCheck(
    checks,
    "offline-cache-budget",
    "Service worker caches manual content only",
    !sw.includes('"/data/questions_bank_seeded.js"') &&
      sw.includes("Optionally cache same-origin GET requests for repeat offline study"),
    "Generated question banks must stay out of the offline shell cache.",
  );
  addCheck(
    checks,
    "mobile-cpu-budget",
    "Mobile CPU work is deferred around scroll and heavy data surfaces",
    app.includes('addEventListener("scroll", updatePageScrollRail, { passive: true })') &&
      app.includes("requestAnimationFrame(refreshPageScrollRail)") &&
      !app.includes("window.ensureSeededBank().then") &&
      cssSafeIncludes("style.css", "@media (prefers-reduced-motion: reduce)"),
    "Scroll handlers must be passive, visual rail updates must be frame-batched, generated-bank loading disabled and reduced-motion CSS must be present.",
  );

  const failed = checks.filter((check) => !check.passed);
  return {
    reportVersion: REPORT_VERSION,
    date: REPORT_DATE,
    target: "Initial shell, manual-only bank, tab render hooks and mobile/offline budget",
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

function cssSafeIncludes(file, needle) {
  return read(file).includes(needle);
}

function run(argv = process.argv.slice(2)) {
  const report = buildReport();
  if (argv.includes("--json")) process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  else process.stdout.write(`${JSON.stringify(report.summary, null, 2)}\n`);
  if (argv.includes("--strict") && !report.summary.ready) process.exitCode = 1;
  return report;
}

if (require.main === module) run();

module.exports = { BUDGETS, buildReport, run };
