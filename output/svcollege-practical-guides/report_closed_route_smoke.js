"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const manifestPath = path.join(ROOT, "manifest.json");
const reportPath = path.join(ROOT, "closed_route_smoke_report.json");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

function pickHtmlFiles() {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  return (manifest.outputs || [])
    .map((item) => item.file)
    .filter((file) => file.endsWith(".html"));
}

function extractSimpleRoute(source) {
  const start = "<!-- simple-guide-route:start -->";
  const end = "<!-- simple-guide-route:end -->";
  const startIndex = source.indexOf(start);
  const endIndex = source.indexOf(end);
  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) return "";
  return source.slice(startIndex, endIndex + end.length);
}

function analyzeFile(file) {
  const source = read(file);
  const routeSection = extractSimpleRoute(source);

  const prevArrows = [...routeSection.matchAll(/class="[^"]*guide-arrow[^"]*prev[^"]*"[^>]*>[^<]*← אחורה/g)].length;
  const nextArrows = [...routeSection.matchAll(/class="[^"]*guide-arrow[^"]*next[^"]*"[^>]*>[^<]*קדימה →/g)].length;
  const stepMap = routeSection.includes("guide-simple-map");
  const progressOutput = routeSection.includes("data-route-output") || routeSection.includes("<output>");
  const dayBoardScript = source.includes("guide_day_board.js");
  const noInlineLagMarkup = !routeSection.includes("data-lag-top");
  const noInlineDayList = !routeSection.includes("data-day-list");

  const failures = [];
  if (prevArrows !== 1) failures.push("missing-or-duplicate-prev-arrow");
  if (nextArrows !== 1) failures.push("missing-or-duplicate-next-arrow");
  if (!stepMap) failures.push("missing-step-map");
  if (!progressOutput) failures.push("missing-progress-output");
  if (!dayBoardScript) failures.push("missing-day-board-shared-script");
  if (!noInlineLagMarkup) failures.push("inline-lag-markup-should-be-removed");
  if (!noInlineDayList) failures.push("inline-day-list-should-be-removed");

  return {
    file,
    ready: failures.length === 0,
    prevArrows,
    nextArrows,
    stepMap,
    progressOutput,
    dayBoardScript,
    noInlineLagMarkup,
    noInlineDayList,
    failures,
  };
}

function main() {
  const htmlFiles = pickHtmlFiles();
  const checks = htmlFiles.map(analyzeFile);
  const failures = checks.flatMap((item) =>
    item.failures.map((failure) => ({ file: item.file, failure }))
  );

  const report = {
    reportVersion: "svcollege-practical-guides-closed-route-smoke-v1",
    ready: failures.length === 0,
    checkedFiles: htmlFiles.length,
    failuresCount: failures.length,
    checks,
    failures,
  };

  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2) + "\n");
  console.log(JSON.stringify(report, null, 2));
  if (!report.ready) process.exit(1);
}

main();
