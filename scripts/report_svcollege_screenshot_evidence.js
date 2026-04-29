#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const REPORT_VERSION = "svcollege-screenshot-evidence-v1";
const SCREENSHOT_DIR = "output/playwright/svcollege-critical-flows";

const EXPECTED_SCREENSHOTS = Object.freeze([
  ["trainer", "desktop", "desktop-trainer.png"],
  ["study", "desktop", "desktop-study.png"],
  ["mock-exam", "desktop", "desktop-mock-exam.png"],
  ["code-trace", "desktop", "desktop-code-trace.png"],
  ["codeblocks-build-bug", "desktop", "desktop-codeblocks-build-bug.png"],
  ["svcollege-command-center", "desktop", "desktop-svcollege-command-center.png"],
  ["trainer", "mobile", "mobile-trainer.png"],
  ["study", "mobile", "mobile-study.png"],
  ["mock-exam", "mobile", "mobile-mock-exam.png"],
  ["code-trace", "mobile", "mobile-code-trace.png"],
  ["codeblocks-build-bug", "mobile", "mobile-codeblocks-build-bug.png"],
  ["svcollege-command-center", "mobile", "mobile-svcollege-command-center.png"],
]);

function pngInfo(buffer) {
  const signature = buffer.subarray(0, 8).toString("hex");
  if (signature !== "89504e470d0a1a0a") return { validPng: false, width: 0, height: 0 };
  return {
    validPng: true,
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

function inspectScreenshot([flow, viewport, file]) {
  const relativePath = path.join(SCREENSHOT_DIR, file);
  const absolutePath = path.join(ROOT, relativePath);
  const failures = [];
  if (!fs.existsSync(absolutePath)) {
    failures.push(`missing screenshot: ${relativePath}`);
    return { flow, viewport, file: relativePath, exists: false, bytes: 0, width: 0, height: 0, validPng: false, passed: false, failures };
  }
  const buffer = fs.readFileSync(absolutePath);
  const info = pngInfo(buffer);
  if (buffer.length < 10000) failures.push(`screenshot too small: ${relativePath}`);
  if (!info.validPng) failures.push(`not a PNG: ${relativePath}`);
  if (info.width < 320 || info.height < 320) failures.push(`unexpected dimensions: ${info.width}x${info.height}`);
  return {
    flow,
    viewport,
    file: relativePath,
    exists: true,
    bytes: buffer.length,
    width: info.width,
    height: info.height,
    validPng: info.validPng,
    passed: failures.length === 0,
    failures,
  };
}

function buildReport() {
  const screenshots = EXPECTED_SCREENSHOTS.map(inspectScreenshot);
  const failed = screenshots.filter((item) => !item.passed);
  const desktop = screenshots.filter((item) => item.viewport === "desktop");
  const mobile = screenshots.filter((item) => item.viewport === "mobile");
  return {
    reportVersion: REPORT_VERSION,
    date: "2026-04-29",
    target: "SVCollege critical flow desktop + mobile viewport screenshots",
    summary: {
      screenshots: screenshots.length,
      passed: screenshots.length - failed.length,
      failed: failed.length,
      desktop: desktop.length,
      mobile: mobile.length,
      ready: failed.length === 0,
    },
    screenshots,
  };
}

function toMarkdown(report) {
  return [
    "# SVCollege Critical Flow Screenshot Evidence",
    "",
    `- Date: ${report.date}`,
    `- Target: ${report.target}`,
    `- Screenshots: ${report.summary.passed}/${report.summary.screenshots}`,
    `- Desktop: ${report.summary.desktop}`,
    `- Mobile: ${report.summary.mobile}`,
    `- Ready: ${report.summary.ready ? "Yes" : "No"}`,
    "",
    "| Flow | Viewport | File | Size | Status |",
    "|---|---|---|---:|---|",
    ...report.screenshots.map((item) =>
      `| ${item.flow} | ${item.viewport} | ${item.file} | ${item.width}x${item.height} | ${item.passed ? "pass" : item.failures.join("<br>")} |`,
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
  EXPECTED_SCREENSHOTS,
  buildReport,
  run,
  toMarkdown,
};
