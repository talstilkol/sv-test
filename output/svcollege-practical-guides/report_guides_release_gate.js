"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const reportPath = path.join(ROOT, "guides_release_gate_report.json");

const REQUIRED_REPORTS = [
  {
    id: "guides-verify",
    file: "verification_report.json",
    expectedReady: true,
  },
  {
    id: "closed-route-smoke",
    file: "closed_route_smoke_report.json",
    expectedReady: true,
  },
  {
    id: "closed-route-browser-runtime",
    file: "closed_route_browser_runtime_report.json",
    expectedReady: true,
  },
];

function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, file), "utf8"));
}

function checkReport(def) {
  const fullPath = path.join(ROOT, def.file);
  if (!fs.existsSync(fullPath)) {
    return {
      id: def.id,
      file: def.file,
      exists: false,
      ready: false,
      reason: "missing-report-file",
    };
  }

  try {
    const data = readJson(def.file);
    const ready = data && data.ready === def.expectedReady;
    return {
      id: def.id,
      file: def.file,
      exists: true,
      ready,
      reason: ready ? null : "report-ready-flag-not-true",
      reportVersion: data && data.reportVersion ? data.reportVersion : "unknown",
      checkedFiles: Number.isFinite(data && data.checkedFiles) ? data.checkedFiles : null,
      failuresCount: Number.isFinite(data && data.failuresCount) ? data.failuresCount : null,
    };
  } catch (error) {
    return {
      id: def.id,
      file: def.file,
      exists: true,
      ready: false,
      reason: "invalid-json",
      error: String(error && error.message ? error.message : error),
    };
  }
}

function main() {
  const checks = REQUIRED_REPORTS.map(checkReport);
  const failures = checks
    .filter((check) => !check.ready)
    .map((check) => ({
      id: check.id,
      file: check.file,
      reason: check.reason,
      error: check.error || null,
    }));

  const report = {
    reportVersion: "svcollege-practical-guides-release-gate-v1",
    ready: failures.length === 0,
    checksCount: checks.length,
    passedCount: checks.filter((check) => check.ready).length,
    checks,
    failures,
    generatedAt: new Date().toISOString(),
  };

  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2) + "\n");
  console.log(JSON.stringify(report, null, 2));

  if (!report.ready) process.exit(1);
}

main();
