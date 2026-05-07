"use strict";

const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");
const { chromium } = require("playwright");

const ROOT = __dirname;
const manifestPath = path.join(ROOT, "manifest.json");
const reportPath = path.join(ROOT, "closed_route_browser_runtime_report.json");

function getHtmlFiles() {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  return (manifest.outputs || [])
    .map((item) => item.file)
    .filter((file) => file.endsWith(".html"));
}

async function checkPage(page, file) {
  const fullPath = path.join(ROOT, file);
  const url = pathToFileURL(fullPath).href;
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForTimeout(120);

  const result = await page.evaluate(() => {
    const route = document.querySelector(".guide-simple-route");
    const prevArrows = route ? route.querySelectorAll(".guide-arrow.prev").length : 0;
    const nextArrows = route ? route.querySelectorAll(".guide-arrow.next").length : 0;
    const stepMap = !!document.querySelector(".guide-simple-map");
    const progressOutput = !!document.querySelector(".guide-simple-arrows output");
    const dayBoard = !!document.querySelector("[data-day-board]");
    const lagTop = !!document.querySelector("[data-lag-top]");
    const nextTaskAction = !!document.querySelector("[data-start-next-top], [data-start-next-board]");
    const dayRows = document.querySelectorAll(".guide-day-item").length;
    return {
      prevArrows,
      nextArrows,
      stepMap,
      progressOutput,
      dayBoard,
      lagTop,
      nextTaskAction,
      dayRows,
    };
  });

  const failures = [];
  if (result.prevArrows !== 1) failures.push("prev-arrow-count");
  if (result.nextArrows !== 1) failures.push("next-arrow-count");
  if (!result.stepMap) failures.push("missing-step-map");
  if (!result.progressOutput) failures.push("missing-progress-output");
  if (!result.dayBoard) failures.push("missing-day-board");
  if (!result.lagTop) failures.push("missing-lag-top");
  if (!result.nextTaskAction) failures.push("missing-next-task-action");
  if (result.dayRows < 7) failures.push("day-board-not-rendered");

  return {
    file,
    url,
    ready: failures.length === 0,
    ...result,
    failures,
  };
}

async function main() {
  const htmlFiles = getHtmlFiles();
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const checks = [];
  for (const file of htmlFiles) {
    checks.push(await checkPage(page, file));
  }

  await browser.close();

  const failures = checks.flatMap((item) =>
    item.failures.map((failure) => ({ file: item.file, failure }))
  );

  const report = {
    reportVersion: "svcollege-practical-guides-closed-route-browser-runtime-v1",
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

main().catch((error) => {
  const report = {
    reportVersion: "svcollege-practical-guides-closed-route-browser-runtime-v1",
    ready: false,
    checkedFiles: 0,
    failuresCount: 1,
    checks: [],
    failures: [{ file: "__runtime__", failure: String(error && error.message ? error.message : error) }],
  };
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2) + "\n");
  console.log(JSON.stringify(report, null, 2));
  process.exit(1);
});
