#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const siteMapGenerator = require("./generate_site_map.js");

const ROOT = path.resolve(__dirname, "..");
const args = new Set(process.argv.slice(2));
const strict = args.has("--strict");
const summaryOnly = args.has("--summary");
const write = args.has("--write");

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function uniq(items) {
  return [...new Set(items)];
}

function duplicates(items) {
  return uniq(items).filter((item) => items.filter((candidate) => candidate === item).length > 1);
}

function bytes(relativePath) {
  return Buffer.byteLength(read(relativePath), "utf8");
}

function normalizeCssText(value) {
  return String(value || "")
    .replace(/\s*([{}:;,>!])\s*/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function cssIncludes(source, snippet) {
  return normalizeCssText(source).includes(normalizeCssText(snippet));
}

function loadSiteTree() {
  const context = { window: {} };
  context.window.window = context.window;
  vm.runInNewContext(read("data/site_navigation_tree.js"), context.window, { filename: "data/site_navigation_tree.js" });
  return Array.isArray(context.window.SVCOLLEGE_SITE_TREE) ? context.window.SVCOLLEGE_SITE_TREE : [];
}

function tabId(entry) {
  return Array.isArray(entry) ? entry[0] : entry && entry.id;
}

const indexHtml = read("index.html");
const appJs = read("app.js");
const viewJs = read("src/views/homework-exam-mode-view.js");
const css = read("style.css");
const siteTree = loadSiteTree();
const siteMapReport = siteMapGenerator.buildReport();

const topTabs = [...indexHtml.matchAll(/class="top-tab[^"]*"[^>]*data-tab="([^"]+)"/g)].map((match) => match[1]);
const homeTargets = siteTree.flatMap((group) => (group.tabs || []).map(tabId).filter(Boolean));
const siteMapTargets = homeTargets.slice();
const examFocusAllowedBlock = (appJs.match(/const EXAM_FOCUS_ALLOWED_TABS = new Set\(\[([\s\S]*?)\]\);/) || [])[1] || "";
const examFocusAllowedTabs = [...examFocusAllowedBlock.matchAll(/"([^"]+)"/g)].map((match) => match[1]);

const topSet = new Set(topTabs);
const homeSet = new Set(homeTargets);
const siteMapSet = new Set(siteMapTargets);

const requiredExamRoute = [
  "mock-exam",
  "trainer",
  "study",
  "concept-sprint",
  "blueprints",
  "capstones",
  "codeblocks",
  "trace",
  "comparator",
  "flashcards",
  "gap-matrix",
  "learning-evidence",
  "km",
];
const shouldBeAdvancedOnly = [
  "guide",
  "grandma-knowledge",
  "programming-basics",
  "programming-principles",
  "programming-museum",
  "language-tools",
  "reward-store",
  "anatomy",
];

const fileBudgets = [
  { file: "index.html", budgetBytes: 120000 },
  { file: "app.js", budgetBytes: 1750000 },
  { file: "style.css", budgetBytes: 700000 },
].map((item) => {
  const actualBytes = bytes(item.file);
  return {
    ...item,
    actualBytes,
    headroomBytes: item.budgetBytes - actualBytes,
    overBudget: actualBytes > item.budgetBytes,
  };
});

const failures = [];
const warnings = [];

if (topTabs.length !== 23) failures.push(`Expected 23 top tabs, found ${topTabs.length}.`);
if (!indexHtml.includes("data/site_navigation_tree.js")) failures.push("Canonical site tree data file is not loaded by index.html.");
if (!siteMapReport.summary.synced) failures.push("SITE_MAP.md is not synced with data/site_navigation_tree.js + index.html. Run: npm run site-map:sync");
if (!read("SITE_MAP.md").includes("AUTO-GENERATED FROM data/site_navigation_tree.js")) failures.push("SITE_MAP.md is not marked as auto-generated from the canonical site tree.");
if (!indexHtml.includes("data-site-tree-root")) failures.push("Home portal tree root is missing.");
if (!indexHtml.includes('<body class="exam-focus-mode">')) failures.push("Initial body does not start in exam focus mode.");
if (!appJs.includes("SVCOLLEGE_SITE_TREE")) failures.push("App does not read the canonical site tree.");
if (!appJs.includes("renderWelcomePortalTree")) failures.push("Home portal tree renderer is missing.");
duplicates(topTabs).forEach((id) => failures.push(`Duplicate top tab id: ${id}.`));
homeTargets.filter((id) => !topSet.has(id)).forEach((id) => failures.push(`Home tree target has no top tab: ${id}.`));
topTabs.filter((id) => !homeSet.has(id)).forEach((id) => failures.push(`Top tab missing from home tree: ${id}.`));
duplicates(homeTargets).forEach((id) => failures.push(`Duplicate home tree target: ${id}.`));
siteMapTargets.filter((id) => !topSet.has(id)).forEach((id) => failures.push(`Site-map target has no top tab: ${id}.`));
topTabs.filter((id) => !siteMapSet.has(id)).forEach((id) => failures.push(`Top tab missing from app site-map: ${id}.`));
duplicates(siteMapTargets).forEach((id) => failures.push(`Duplicate app site-map target: ${id}.`));
requiredExamRoute.filter((id) => !homeSet.has(id)).forEach((id) => failures.push(`Required exam route missing from home tree: ${id}.`));
if (!viewJs.includes("hxm-exam100-journey")) failures.push("Exam 100 journey map markup is missing.");
if (!viewJs.includes("כתר 100")) failures.push("Exam 100 final reward is missing.");
if (!cssIncludes(css, "top-tab.exam-focus-out-of-scope:not(.active)")) failures.push("Old/out-of-scope top-tab hiding rule is missing.");
if (
  !cssIncludes(css, '.top-tab[data-tab="programming-museum"]:not(.active)') &&
  !cssIncludes(css, ".top-tab[data-tab=programming-museum]:not(.active)")
) failures.push("Pre-JS advanced tab hiding rule is missing.");
if (!cssIncludes(css, "left-action-bar #lab-view")) failures.push("Exam focus quick-action cleanup rule is missing.");
if (!appJs.includes("data-exam-focus-advanced-toggle")) failures.push("Advanced tab reveal toggle is missing.");
if (!appJs.includes("show-advanced-tabs")) failures.push("Advanced tab reveal state class is missing.");
if (!cssIncludes(css, ".exam-focus-route-banner button")) failures.push("Advanced tab reveal button style is missing.");
if (!examFocusAllowedTabs.includes("comparator")) failures.push("Comparator must stay visible in the exam top route.");
shouldBeAdvancedOnly.filter((id) => examFocusAllowedTabs.includes(id)).forEach((id) => failures.push(`Advanced-only tab still visible in exam top route: ${id}.`));
fileBudgets.filter((item) => item.overBudget).forEach((item) => failures.push(`${item.file} is over budget: ${item.actualBytes}/${item.budgetBytes}.`));
fileBudgets.filter((item) => item.headroomBytes < 2000).forEach((item) => warnings.push(`${item.file} has tight headroom: ${item.headroomBytes} bytes.`));

const report = {
  reportVersion: "svcollege-navigation-tree-audit-v1",
  date: "2026-05-05",
  summary: {
    topTabs: topTabs.length,
    homeTargets: homeTargets.length,
    homeUniqueTargets: homeSet.size,
    siteMapTargets: siteMapTargets.length,
    siteMapUniqueTargets: siteMapSet.size,
    examFocusAllowedTabs: examFocusAllowedTabs.length,
    advancedOnlyHiddenTabs: shouldBeAdvancedOnly.length,
    failures: failures.length,
    warnings: warnings.length,
    ready: failures.length === 0,
  },
  coverage: {
    topTabs,
    homeTargets,
    siteMapTargets,
    missingFromHomeTree: topTabs.filter((id) => !homeSet.has(id)),
    missingFromSiteMap: topTabs.filter((id) => !siteMapSet.has(id)),
    duplicateHomeTargets: duplicates(homeTargets),
    duplicateSiteMapTargets: duplicates(siteMapTargets),
    examFocusAllowedTabs,
    shouldBeAdvancedOnly,
  },
  fileBudgets,
  failures,
  warnings,
};

if (write) {
  fs.writeFileSync(path.join(ROOT, "SVCOLLEGE_NAVIGATION_TREE_AUDIT.json"), JSON.stringify(report, null, 2) + "\n");
}

if (summaryOnly) {
  console.log(JSON.stringify(report.summary, null, 2));
} else {
  console.log(JSON.stringify(report, null, 2));
}

if (strict && failures.length) {
  process.exitCode = 1;
}
