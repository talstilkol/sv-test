#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const OUTPUT = path.join(ROOT, "SITE_MAP.md");
const args = new Set(process.argv.slice(2));
const strict = args.has("--strict");
const write = args.has("--write");
const summary = args.has("--summary");

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function mtime(relativePath) {
  return fs.statSync(path.join(ROOT, relativePath)).mtime;
}

function loadSiteTree() {
  const context = { window: {} };
  context.window.window = context.window;
  vm.runInNewContext(read("data/site_navigation_tree.js"), context.window, { filename: "data/site_navigation_tree.js" });
  return Array.isArray(context.window.SVCOLLEGE_SITE_TREE) ? context.window.SVCOLLEGE_SITE_TREE : [];
}

function topTabsFromIndex(indexHtml) {
  return [...indexHtml.matchAll(/class="top-tab[^"]*"[^>]*data-tab="([^"]+)"/g)].map((match) => match[1]);
}

function flattenTreeTabs(tree) {
  const rows = [];
  tree.forEach((group, groupIndex) => {
    (group.tabs || []).forEach((tab, tabIndex) => {
      const id = Array.isArray(tab) ? tab[0] : tab.id;
      const label = Array.isArray(tab) ? tab[1] : tab.label;
      const note = Array.isArray(tab) ? tab[2] : tab.note;
      if (!id) return;
      rows.push({
        groupIndex: groupIndex + 1,
        groupLabel: group.label || `Group ${groupIndex + 1}`,
        order: tabIndex + 1,
        id,
        label: label || id,
        note: note || "",
        lowPriority: !!group.lowPriority,
      });
    });
  });
  return rows;
}

function buildMarkdown(dateIso, groups, rows, topTabs, missingInTopTabs, missingInTree) {
  const groupRows = groups.map((group, idx) => {
    const count = (group.tabs || []).length;
    const priority = group.lowPriority ? "advanced-only" : "exam-route";
    return `| ${idx + 1} | ${group.label || ""} | ${group.meta || ""} | ${count} | ${priority} |`;
  }).join("\n");

  const tabRows = rows.map((row) => {
    return `| ${row.groupIndex}.${row.order} | \`${row.id}\` | ${row.label} | ${row.groupLabel} | ${row.note || "-"} | ${row.lowPriority ? "yes" : "no"} |`;
  }).join("\n");

  const topRows = topTabs.map((id, idx) => `| ${idx + 1} | \`${id}\` |`).join("\n");
  const missingTopRows = missingInTopTabs.length ? missingInTopTabs.map((id) => `- \`${id}\``).join("\n") : "- none";
  const missingTreeRows = missingInTree.length ? missingInTree.map((id) => `- \`${id}\``).join("\n") : "- none";

  return [
    "# SITE_MAP (Auto-Generated)",
    "",
    "<!-- AUTO-GENERATED FROM data/site_navigation_tree.js AND index.html. DO NOT EDIT MANUALLY. -->",
    "",
    `Generated on: ${dateIso}`,
    "",
    "## Navigation Groups",
    "",
    "| # | Group | Meta | Tabs | Priority |",
    "|---:|---|---|---:|---|",
    groupRows,
    "",
    "## Canonical Tabs (From Site Tree)",
    "",
    "| # | Tab ID | Label | Group | Note | Advanced |",
    "|---:|---|---|---|---|---|",
    tabRows,
    "",
    "## Top Tabs (From index.html)",
    "",
    "| # | Tab ID |",
    "|---:|---|",
    topRows,
    "",
    "## Drift Checks",
    "",
    "Missing from top tabs:",
    missingTopRows,
    "",
    "Missing from site tree:",
    missingTreeRows,
    "",
  ].join("\n");
}

function buildReport() {
  const tree = loadSiteTree();
  const indexHtml = read("index.html");
  const topTabs = topTabsFromIndex(indexHtml);
  const treeRows = flattenTreeTabs(tree);
  const treeTabIds = treeRows.map((row) => row.id);

  const topSet = new Set(topTabs);
  const treeSet = new Set(treeTabIds);
  const missingInTopTabs = treeTabIds.filter((id) => !topSet.has(id));
  const missingInTree = topTabs.filter((id) => !treeSet.has(id));
  const latestSourceMtime = new Date(Math.max(
    mtime("data/site_navigation_tree.js").getTime(),
    mtime("index.html").getTime(),
  ));
  const dateIso = latestSourceMtime.toISOString().slice(0, 10);
  const ready = missingInTopTabs.length === 0 && missingInTree.length === 0;
  const markdown = buildMarkdown(dateIso, tree, treeRows, topTabs, missingInTopTabs, missingInTree);
  const existing = fs.existsSync(OUTPUT) ? read("SITE_MAP.md") : "";
  const synced = existing.trim() === markdown.trim();

  return {
    reportVersion: "site-map-generator-v1",
    date: dateIso,
    summary: {
      groups: tree.length,
      treeTabs: treeTabIds.length,
      topTabs: topTabs.length,
      missingInTopTabs: missingInTopTabs.length,
      missingInTree: missingInTree.length,
      synced,
      ready: ready && synced,
    },
    missingInTopTabs,
    missingInTree,
    markdown,
  };
}

function run() {
  const report = buildReport();
  if (write) {
    fs.writeFileSync(OUTPUT, `${report.markdown}\n`, "utf8");
  }
  if (summary) {
    process.stdout.write(`${JSON.stringify(report.summary, null, 2)}\n`);
  } else {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  }
  if (strict && !report.summary.ready) {
    process.exitCode = 1;
  }
  return report;
}

if (require.main === module) {
  run();
}

module.exports = { buildReport, run };
