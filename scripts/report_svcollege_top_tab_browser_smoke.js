#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const REPORT_VERSION = "svcollege-top-tab-browser-smoke-gate-v1";
const REPORT_DATE = new Date().toISOString().slice(0, 10);
const EVIDENCE_PATH = "output/playwright/svcollege-critical-flows/top-tab-browser-smoke.json";

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

function indexTopTabs() {
  const html = read("index.html");
  const matches = html.matchAll(/<button class="top-tab[\s\S]*?id="([^"]+)"[\s\S]*?data-tab="([^"]+)"[\s\S]*?aria-label="([^"]+)"[\s\S]*?>/g);
  return Array.from(matches).map((match) => ({
    id: match[1],
    dataTab: match[2],
    ariaLabel: match[3],
  }));
}

function loadEvidence() {
  const absolutePath = path.join(ROOT, EVIDENCE_PATH);
  if (!fs.existsSync(absolutePath)) {
    return { missing: true, evidence: null };
  }
  return { missing: false, evidence: JSON.parse(fs.readFileSync(absolutePath, "utf8")) };
}

function buildReport() {
  const expectedTabs = indexTopTabs();
  const { missing, evidence } = loadEvidence();
  const failures = [];
  if (missing) {
    failures.push(`missing evidence file: ${EVIDENCE_PATH}`);
  }
  const evidenceTabs = evidence?.results || [];
  const evidenceById = new Map(evidenceTabs.map((item) => [item.id, item]));
  expectedTabs.forEach((tab) => {
    const item = evidenceById.get(tab.id);
    if (!item) {
      failures.push(`missing tab evidence: ${tab.id}`);
      return;
    }
    if (item.dataTab !== tab.dataTab) failures.push(`data-tab mismatch: ${tab.id}`);
    if (item.ariaLabel !== tab.ariaLabel) failures.push(`aria-label mismatch: ${tab.id}`);
    if (item.buttonCount !== 1) failures.push(`button count mismatch: ${tab.id}`);
    if (item.activeAfterClick !== true) failures.push(`tab did not become active: ${tab.id}`);
    if (!item.title) failures.push(`missing title after click: ${tab.id}`);
    (item.errors || []).forEach((error) => failures.push(`${tab.id}: ${error}`));
  });
  if (evidence && evidence.topTabs !== expectedTabs.length) {
    failures.push(`top tab count mismatch: expected ${expectedTabs.length}, got ${evidence.topTabs}`);
  }
  if (evidence && evidence.failedTabs !== 0) failures.push(`failed tabs: ${evidence.failedTabs}`);
  if (evidence && evidence.consoleErrors !== 0) failures.push(`console errors: ${evidence.consoleErrors}`);
  return {
    reportVersion: REPORT_VERSION,
    date: REPORT_DATE,
    target: "SVCollege top-tab browser smoke evidence",
    evidencePath: EVIDENCE_PATH,
    summary: {
      expectedTabs: expectedTabs.length,
      evidenceTabs: evidenceTabs.length,
      passedTabs: evidence?.passedTabs || 0,
      failedTabs: evidence?.failedTabs ?? expectedTabs.length,
      consoleErrors: evidence?.consoleErrors ?? -1,
      failures: failures.length,
      ready: failures.length === 0,
    },
    failures,
  };
}

function toMarkdown(report) {
  return [
    "# SVCollege Top Tab Browser Smoke",
    "",
    `- Date: ${report.date}`,
    `- Target: ${report.target}`,
    `- Evidence: ${report.evidencePath}`,
    `- Tabs: ${report.summary.passedTabs}/${report.summary.expectedTabs}`,
    `- Console errors: ${report.summary.consoleErrors}`,
    `- Ready: ${report.summary.ready ? "Yes" : "No"}`,
    "",
    report.failures.length ? report.failures.map((failure) => `- ${failure}`).join("\n") : "- No failures.",
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
  EVIDENCE_PATH,
  buildReport,
  run,
  toMarkdown,
};
