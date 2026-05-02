#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const readiness = require("./report_svcollege_readiness.js");
const tabMatrix = require("./report_svcollege_tab_matrix.js");
const criticalFlows = require("./report_svcollege_critical_flows.js");
const fullPortalSmoke = require("./report_svcollege_full_portal_smoke.js");

const ROOT = path.resolve(__dirname, "..");
const REPORT_VERSION = "museum-access-smoke-v1";
const REPORT_DATE = new Date().toISOString().slice(0,10);

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

function buildReport() {
  const html = read("index.html");
  const app = read("app.js");
  const css = read("style.css");
  const readinessReport = readiness.buildReport({ releaseGate: true });
  const tabReport = tabMatrix.buildReport();
  const flowReport = criticalFlows.buildReport();
  const portalReport = fullPortalSmoke.buildReport();
  const checks = [];

  addCheck(
    checks,
    "museum-xp-gates-present",
    "Museum XP gates and unlock storage exist",
    app.includes('const XP_ACCESS_UNLOCKS_KEY = "lumenportal:xpAccessUnlocks:v1"') &&
      app.includes("function museumAccessStatus") &&
      app.includes("function isMuseumWingOpen") &&
      app.includes("data-xp-unlock") &&
      app.includes("דמי כניסה"),
    "Museum access must be gated by deterministic XP + prerequisite state, not by hidden random/fake data.",
  );

  addCheck(
    checks,
    "museum-tabs-present",
    "Museum top-level tabs are keyboard-readable",
    app.includes('role="tablist" aria-label="ניווט אגפי המוזיאון"') &&
      app.includes('role="tab"') &&
      app.includes("data-museum-wing-tab") &&
      app.includes("aria-selected") &&
      app.includes("aria-controls"),
    "Every museum wing must be reachable as a tab and expose selected/controlled state.",
  );

  addCheck(
    checks,
    "museum-pass-catalog",
    "Museum pass catalog includes every required pass item",
    [
      'id: "museum.languages"',
      'id: "museum.electricity"',
      'id: "museum.react"',
      'id: "museum.node"',
      'id: "museum.ai"',
      'id: "museum.debug"',
    ].every((needle) => app.includes(needle)),
    "Catalog must include languages, electricity, React evolution, Node runtime, AI hall and Debug hall.",
  );

  addCheck(
    checks,
    "exam-content-not-locked-copy",
    "Locked museum copy keeps exam-critical content free",
    app.includes("חומר חובה לקורס נשאר פתוח בטאבים הלימודיים") &&
      app.includes("שאלות ותרגול React נשארים פתוחים") &&
      app.includes("מושגי חובה כמו variable/function/array נשארים פתוחים בשיעורים") &&
      app.includes("לא נועלים חומר חובה"),
    "Museum locks may hide bonus experiences, but must not claim to lock required exam explanations or practice.",
  );

  addCheck(
    checks,
    "svcollege-readiness-unblocked",
    "SVCollege release readiness remains green while museum is locked",
    readinessReport.summary.finishLineReady === true &&
      readinessReport.summary.averageReadiness === 100 &&
      readinessReport.releaseBlockers.length === 0,
    `${readinessReport.summary.averageReadiness}% readiness, ${readinessReport.releaseBlockers.length} release blockers.`,
  );

  addCheck(
    checks,
    "svcollege-tab-matrix-unblocked",
    "SVCollege tab matrix remains green while museum is locked",
    tabReport.summary.ready === true &&
      tabReport.summary.strictGaps === 0 &&
      tabReport.summary.strictCoverage === 100,
    `${tabReport.summary.strictCoverage}% tab coverage, ${tabReport.summary.strictGaps} strict gaps.`,
  );

  addCheck(
    checks,
    "svcollege-critical-flows-unblocked",
    "SVCollege critical learning flows remain green",
    flowReport.summary.ready === true && flowReport.summary.failed === 0,
    `${flowReport.summary.passed}/${flowReport.summary.flows} critical flows passed.`,
  );

  addCheck(
    checks,
    "full-portal-smoke-unblocked",
    "Desktop/mobile full portal smoke remains green",
    portalReport.summary.ready === true &&
      portalReport.summary.desktopReady === true &&
      portalReport.summary.mobileReady === true,
    `${portalReport.summary.passed}/${portalReport.summary.checks} full-portal smoke checks passed.`,
  );

  addCheck(
    checks,
    "offline-shell-updated",
    "Current app/cache shell includes the latest museum access assets",
    html.includes("app.js?v=top-bar-perf-v98") &&
      html.includes("style.css?v=concept-sprint-v69") &&
      read("service-worker.js").includes('const CACHE_VERSION = "lumen-v2.4.133-autosave"') &&
      css.includes(".museum-access-gate") &&
      css.includes(".xp-access-panel"),
    "The offline shell must reference the current app/css versions and access-gate styles.",
  );

  const failed = checks.filter((check) => !check.passed);
  return {
    reportVersion: REPORT_VERSION,
    date: REPORT_DATE,
    target: "Museum locks do not block SVCollege readiness flows",
    summary: {
      checks: checks.length,
      passed: checks.length - failed.length,
      failed: failed.length,
      ready: failed.length === 0,
    },
    checks,
    blockers: failed.map((check) => ({
      id: check.id,
      label: check.label,
      detail: check.detail,
    })),
  };
}

function run(argv = process.argv.slice(2)) {
  const report = buildReport();
  if (argv.includes("--json")) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  } else {
    process.stdout.write(`${JSON.stringify(report.summary, null, 2)}\n`);
  }
  if (argv.includes("--strict") && !report.summary.ready) process.exitCode = 1;
  return report;
}

if (require.main === module) run();

module.exports = {
  buildReport,
  run,
};
