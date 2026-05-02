#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const JSON_PATH = path.join(ROOT, "VIDEO_ASSET_TRACKER_REPORT.json");
const MD_PATH = path.join(ROOT, "VIDEO_ASSET_TRACKER_REPORT.md");
const REPORT_DATE = new Date().toISOString().slice(0,10);
const SOURCE_DOC = "NOTEBOOKLM_CONCEPT_CLIPS.md";

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function loadData() {
  const sandbox = { window: {}, console };
  fs.readdirSync(DATA_DIR)
    .filter((file) => file.endsWith(".js"))
    .sort((a, b) => a.localeCompare(b))
    .forEach((file) => {
      const code = fs.readFileSync(path.join(DATA_DIR, file), "utf8");
      vm.runInNewContext(code, sandbox, { filename: file });
    });
  const lessons = Object.keys(sandbox)
    .map((key) => sandbox[key])
    .filter((value) => value && typeof value.id === "string" && Array.isArray(value.concepts));
  return {
    lessons,
    conceptVideos: sandbox.CONCEPT_VIDEOS || sandbox.window.CONCEPT_VIDEOS || {},
  };
}

function conceptKeysFromLessons(lessons) {
  return new Set(
    lessons.flatMap((lesson) =>
      (lesson.concepts || []).map((concept) => `${lesson.id}::${concept.conceptName}`),
    ),
  );
}

function deterministicFilename(conceptKey) {
  return `${String(conceptKey || "")
    .replace(/::/g, "__")
    .replace(/[^\w.-]+/g, "_")}__notebooklm_v1.mp4`;
}

function docHasScript(doc, conceptKey) {
  return doc.includes(`\`${conceptKey}\``) || doc.includes(`###`) && doc.includes(conceptKey);
}

function firstFallback(video) {
  const links = Array.isArray(video && video.fallbackVideos) ? video.fallbackVideos : [];
  return links.find((item) => item && item.url) || null;
}

function buildRows(data = loadData(), doc = read(SOURCE_DOC)) {
  const validKeys = conceptKeysFromLessons(data.lessons);
  return Object.entries(data.conceptVideos)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([conceptKey, video]) => {
      const fallback = firstFallback(video);
      const scriptStatus = docHasScript(doc, conceptKey) ? "documented" : "missing-script";
      const linkStatus = fallback ? "temporary-fallback-linked" : "missing-link";
      const originalAssetStatus = "pending-original-notebooklm-export";
      const reviewStatus = scriptStatus === "documented" && Array.isArray(video.scenes) && video.scenes.length >= 4
        ? "ready-for-production-review"
        : "needs-script-review";
      return {
        conceptKey,
        title: String(video.title || conceptKey),
        validConceptKey: validKeys.has(conceptKey),
        script: {
          source: SOURCE_DOC,
          status: scriptStatus,
          expectedFilename: deterministicFilename(conceptKey),
        },
        asset: {
          status: originalAssetStatus,
          linkStatus,
          link: fallback ? fallback.url : "unknown/unavailable",
          linkSource: fallback ? fallback.source || "unknown/unavailable" : "unknown/unavailable",
          replacementDate: "unknown/unavailable",
        },
        review: {
          status: reviewStatus,
          checklist: [
            "60-90 seconds",
            "Hebrew narration",
            "matches course code",
            "no invented data",
            "mobile-readable captions",
            "exam takeaway sentence",
          ],
        },
        scenes: Array.isArray(video.scenes) ? video.scenes.length : 0,
      };
    });
}

function buildReport() {
  const data = loadData();
  const doc = read(SOURCE_DOC);
  const rows = buildRows(data, doc);
  const missingScripts = rows.filter((row) => row.script.status !== "documented");
  const missingLinks = rows.filter((row) => row.asset.linkStatus === "missing-link");
  const invalidConceptKeys = rows.filter((row) => !row.validConceptKey);
  const missingTrackerFields = rows.filter((row) =>
    !row.script.status ||
    !row.asset.status ||
    !row.asset.linkStatus ||
    !row.asset.replacementDate ||
    !row.review.status,
  );
  return {
    reportVersion: "video-asset-tracker-v1",
    date: REPORT_DATE,
    source: {
      data: "data/concept_videos.js",
      scriptDoc: SOURCE_DOC,
    },
    policy: {
      deterministic: true,
      noFakeLinks: true,
      noInventedReplacementDates: true,
      replacementDateWhenUnknown: "unknown/unavailable",
      originalClipProduction: "tracked separately from temporary fallback links",
    },
    summary: {
      totalAssets: rows.length,
      validConceptKeys: rows.length - invalidConceptKeys.length,
      scriptsDocumented: rows.length - missingScripts.length,
      fallbackLinksAvailable: rows.length - missingLinks.length,
      readyForProductionReview: rows.filter((row) => row.review.status === "ready-for-production-review").length,
      missingTrackerFields: missingTrackerFields.length,
      ready: rows.length > 0 && missingScripts.length === 0 && invalidConceptKeys.length === 0 && missingTrackerFields.length === 0,
    },
    rows,
    gaps: {
      missingScripts,
      missingLinks,
      invalidConceptKeys,
      missingTrackerFields,
    },
  };
}

function toMarkdown(report) {
  const lines = [
    `# Video Asset Tracker Report — ${report.date}`,
    "",
    `- Data source: \`${report.source.data}\``,
    `- Script source: \`${report.source.scriptDoc}\``,
    `- Ready: ${report.summary.ready ? "Yes" : "No"}`,
    `- Assets: ${report.summary.totalAssets}`,
    `- Scripts documented: ${report.summary.scriptsDocumented}/${report.summary.totalAssets}`,
    `- Fallback links available: ${report.summary.fallbackLinksAvailable}/${report.summary.totalAssets}`,
    `- Ready for production review: ${report.summary.readyForProductionReview}/${report.summary.totalAssets}`,
    "",
    "Replacement dates remain `unknown/unavailable` until an original NotebookLM export is actually produced. No replacement date is invented.",
    "",
    "| Concept | Script | Asset status | Link status | Review | Replacement date | Expected filename |",
    "|---|---|---|---|---|---|---|",
  ];
  report.rows.forEach((row) => {
    lines.push(
      `| \`${row.conceptKey}\` | ${row.script.status} | ${row.asset.status} | ${row.asset.linkStatus} | ${row.review.status} | ${row.asset.replacementDate} | \`${row.script.expectedFilename}\` |`,
    );
  });
  lines.push("");
  return lines.join("\n");
}

function writeReports(report) {
  fs.writeFileSync(JSON_PATH, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  fs.writeFileSync(MD_PATH, `${toMarkdown(report)}\n`, "utf8");
}

function run(argv = process.argv.slice(2)) {
  const report = buildReport();
  if (argv.includes("--write")) writeReports(report);
  if (argv.includes("--summary")) process.stdout.write(`${JSON.stringify(report.summary, null, 2)}\n`);
  else if (argv.includes("--json")) process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  else process.stdout.write(`${toMarkdown(report)}\n`);
  if (argv.includes("--strict") && !report.summary.ready) process.exitCode = 1;
  return report;
}

if (require.main === module) run();

module.exports = {
  buildReport,
  buildRows,
  deterministicFilename,
  run,
  toMarkdown,
};
