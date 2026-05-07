#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const OUT_JSON = path.join(ROOT, "RELEASE_INVENTORY_REPORT.json");
const OUT_MD = path.join(ROOT, "RELEASE_INVENTORY_REPORT.md");

function runGitStatus() {
  try {
    return execFileSync("git", ["status", "--porcelain=v1"], {
      cwd: ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
  } catch (error) {
    return "";
  }
}

function normalizeStatusPath(rawPath) {
  const value = String(rawPath || "").trim();
  const renameArrow = " -> ";
  if (value.includes(renameArrow)) return value.slice(value.indexOf(renameArrow) + renameArrow.length).trim();
  return value;
}

function parseStatus(rawStatus) {
  return String(rawStatus || "")
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => ({
      status: line.slice(0, 2),
      path: normalizeStatusPath(line.slice(3)),
      raw: line,
    }))
    .filter((item) => item.path);
}

function classifyPath(filePath) {
  const normalized = String(filePath || "").replace(/\\/g, "/");
  const base = path.basename(normalized);

  if (/^(POST_GREEN|QUALITY_DEBT|PORTAL_FULL|BRUTAL_MASTER|QUESTION_|DISTRACTOR_|DOM_|EXAM_|SOLUTION_|SYSTEM_|WEEKLY_|WORLD_CLASS_|SVCOLLEGE_|FINISH_LINE|REPORT_SOURCE|RELEASE_INVENTORY|MANUAL_QUESTION|LESSON_|LEARNING_OS_|LLM_|CODE_|CONTENT_|FEATURE_|LEVEL100|MOCK_|MUSEUM_|PILOT_|PREREQ_|PRICING_|ROADMAP_|SYNC_|VIDEO_|AI_TUTOR|HEBREW_|METRICS_|PHASE6_|PORTAL_BOUNDARY|POST_EXAM|AUDIT_DISTRACTORS).*\.((json)|(md))$/i.test(base)) {
    return "generated-report";
  }
  if (/^output\//.test(normalized) || /^svcollege_fullstack_exam_trainer_v5\//.test(normalized)) return "generated-output";
  if (/^docs\//.test(normalized) || /\.md$/i.test(normalized)) return "documentation";
  if (/^tests\//.test(normalized) || /^playwright\.config\.js$/.test(normalized)) return "test";
  if (/^scripts\//.test(normalized)) return "script";
  if (/^src\//.test(normalized) || /^server\.js$/.test(normalized) || /^content-loader\.js$/.test(normalized)) return "source";
  if (/^data\//.test(normalized)) return "data";
  if (/^app\.js$/.test(normalized) || /^index\.html$/.test(normalized) || /^dashboard\.html$/.test(normalized) || /^style\.css$/.test(normalized) || /^service-worker\.js$/.test(normalized)) return "app-shell";
  if (/^package(-lock)?\.json$/.test(normalized)) return "package-config";
  if (/^lib\/vendor\//.test(normalized)) return "vendor";
  if (/\.(png|jpg|jpeg|gif|webp|svg|mp4|pdf)$/i.test(normalized)) return "asset";
  return "unknown/unavailable";
}

function countBy(items, keyFn) {
  return items.reduce((acc, item) => {
    const key = keyFn(item);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function buildReport({ generatedAt = new Date().toISOString(), rawStatus = runGitStatus() } = {}) {
  const entries = parseStatus(rawStatus).map((item) => ({
    ...item,
    class: classifyPath(item.path),
  }));
  const byClass = countBy(entries, (item) => item.class);
  const unknown = entries.filter((item) => item.class === "unknown/unavailable");
  const dirtyWorktree = entries.length > 0;
  return {
    reportVersion: "release-inventory-v1",
    generatedAt,
    ready: unknown.length === 0,
    releaseAllowed: !dirtyWorktree,
    policy: {
      noBlindRelease: true,
      noFakeOwnership: true,
      missingOwnership: "unknown/unavailable",
      dirtyWorktreeReleaseRule: "Do not release or commit from a dirty worktree without an explicit reviewed inventory.",
    },
    summary: {
      totalChangedPaths: entries.length,
      classifiedPaths: entries.length - unknown.length,
      unknownPaths: unknown.length,
      dirtyWorktree,
      byClass,
    },
    entries,
    unknown,
  };
}

function toMarkdown(report) {
  const rows = report.entries.map((item, index) =>
    `| ${index + 1} | \`${item.status.trim() || "modified"}\` | ${item.class} | \`${item.path.replace(/\|/g, "\\|")}\` |`,
  );
  return [
    "# Release Inventory Report",
    "",
    `Generated: ${report.generatedAt}`,
    "",
    "## Summary",
    "",
    `- Ready: ${report.ready ? "true" : "false"}`,
    `- Release allowed from current worktree: ${report.releaseAllowed ? "true" : "false"}`,
    `- Total changed paths: ${report.summary.totalChangedPaths}`,
    `- Unknown paths: ${report.summary.unknownPaths}`,
    "",
    "## Policy",
    "",
    "- No release/commit should claim a clean scope while the worktree is dirty.",
    "- Generated reports, source changes, tests, docs, assets and package/config changes are separated here.",
    "- Missing ownership remains `unknown/unavailable`; this report does not invent owners.",
    "",
    "## By Class",
    "",
    "| Class | Count |",
    "| --- | ---: |",
    ...Object.entries(report.summary.byClass).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([key, count]) => `| ${key} | ${count} |`),
    "",
    "## Entries",
    "",
    "| # | Git | Class | Path |",
    "| ---: | --- | --- | --- |",
    ...(rows.length ? rows : ["| 0 | clean | none | `unknown/unavailable` |"]),
    "",
  ].join("\n");
}

function writeReport(report) {
  fs.writeFileSync(OUT_JSON, `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(OUT_MD, toMarkdown(report));
}

function run(argv = process.argv.slice(2)) {
  const args = new Set(argv);
  const report = buildReport();
  if (args.has("--write")) writeReport(report);
  if (args.has("--summary")) {
    console.log(JSON.stringify({
      ready: report.ready,
      releaseAllowed: report.releaseAllowed,
      totalChangedPaths: report.summary.totalChangedPaths,
      unknownPaths: report.summary.unknownPaths,
      byClass: report.summary.byClass,
    }, null, 2));
  }
  if (args.has("--strict") && !report.ready) {
    process.exitCode = 1;
  }
  return report;
}

if (require.main === module) {
  run();
}

module.exports = { buildReport, classifyPath, parseStatus, toMarkdown };
