#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const REPORT_VERSION = "svcollege-pwa-offline-smoke-v1";
const REPORT_DATE = new Date().toISOString().slice(0, 10);

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

function fileExistsForAsset(asset) {
  const clean = asset.split("?")[0].replace(/^\//, "");
  if (!clean) return true;
  return fs.existsSync(path.join(ROOT, clean));
}

function extractModuleImports(source) {
  const imports = [];
  const re = /import\s+(?:[^"']+\s+from\s+)?["']([^"']+)["']/g;
  let match = re.exec(source);
  while (match) {
    imports.push(match[1]);
    match = re.exec(source);
  }
  return imports;
}

function toAssetPath(importPath) {
  if (importPath.startsWith("./")) return `/src/${importPath.slice(2)}`;
  if (importPath.startsWith("../")) return `/src/${importPath}`;
  return importPath;
}

function htmlVersionedAssets(html) {
  const assets = [];
  const re = /(?:href|src)="([^"]+\?(?:v|[^"]+)=([^"]+))"/g;
  let match = re.exec(html);
  while (match) {
    const asset = match[1].startsWith("/") ? match[1] : `/${match[1]}`;
    if (asset.endsWith(".js") || asset.includes(".js?") || asset.endsWith(".css") || asset.includes(".css?")) {
      assets.push(asset);
    }
    match = re.exec(html);
  }
  return assets;
}

function htmlScriptAssets(html) {
  const assets = [];
  const re = /<script\s+[^>]*src="([^"]+)"/g;
  let match = re.exec(html);
  while (match) {
    const raw = match[1].startsWith("/") ? match[1] : `/${match[1]}`;
    if ((raw.startsWith("/data/") || raw === "/content-loader.js" || raw.startsWith("/src/")) && !assets.includes(raw)) {
      assets.push(raw);
    }
    match = re.exec(html);
  }
  return assets;
}

const REQUIRED_STATIC_ASSETS = Object.freeze([
  "/index.html",
  "/manifest.json",
  "/style.css",
  "/app.js",
  "/content-loader.js",
  "/src/main.js",
  "/src/core/learning-evidence.js",
  "/src/core/outcome-loop.js",
  "/src/core/concept-tags.js",
  "/data/questions_bank.js",
  "/data/svcollege_questions_sql_orm.js",
  "/data/svcollege_questions_auth.js",
  "/data/svcollege_questions_nextjs.js",
  "/data/svcollege_questions_nestjs.js",
  "/data/svcollege_questions_devops.js",
  "/data/svcollege_questions_ai_engineering.js",
  "/data/svcollege_questions_design_systems.js",
  "/data/svcollege_questions_bridge.js",
  "/data/questions_trace.js",
  "/data/svcollege_traces_sql_orm.js",
  "/data/svcollege_traces_auth.js",
  "/data/svcollege_traces_nextjs.js",
  "/data/svcollege_traces_nestjs.js",
  "/data/svcollege_traces_devops.js",
  "/data/svcollege_traces_ai_engineering.js",
  "/data/svcollege_traces_design_systems.js",
  "/data/svcollege_traces_bridge.js",
  "/data/questions_bug.js",
  "/data/questions_build.js",
  "/data/svcollege_builds_sql_orm.js",
  "/data/svcollege_builds_auth.js",
  "/data/svcollege_builds_nextjs.js",
  "/data/svcollege_builds_nestjs.js",
  "/data/svcollege_builds_devops.js",
  "/data/svcollege_builds_ai_engineering.js",
  "/data/svcollege_builds_design_systems.js",
  "/data/svcollege_builds_bridge.js",
  "/data/svcollege_prerequisites_sql_orm.js",
  "/data/svcollege_prerequisites_auth.js",
  "/data/svcollege_prerequisites_nextjs.js",
  "/data/svcollege_prerequisites_nestjs.js",
  "/data/svcollege_prerequisites_devops.js",
  "/data/svcollege_prerequisites_ai_engineering.js",
  "/data/svcollege_prerequisites_design_systems.js",
  "/data/svcollege_code_blocks.js",
  "/data/option_feedback.js",
  "/data/course_blueprints.js",
]);

function buildReport() {
  const html = read("index.html");
  const sw = read("service-worker.js");
  const manifest = JSON.parse(read("manifest.json"));
  const main = read("src/main.js");

  const versionedAssets = htmlVersionedAssets(html);
  const scriptAssets = htmlScriptAssets(html);
  const mainImports = extractModuleImports(main).map(toAssetPath);
  const requiredAssets = [...new Set([...REQUIRED_STATIC_ASSETS, ...scriptAssets, ...versionedAssets, ...mainImports])];
  const assetResults = requiredAssets.map((asset) => {
    const inPrecache = sw.includes(`"${asset}"`);
    const exists = fileExistsForAsset(asset);
    return {
      asset,
      inPrecache,
      exists,
      passed: inPrecache && exists,
      failures: [
        ...(inPrecache ? [] : [`missing precache asset: ${asset}`]),
        ...(exists ? [] : [`missing file: ${asset}`]),
      ],
    };
  });

  const strategyChecks = [
    ["manifest link", html.includes('<link rel="manifest" href="manifest.json" />')],
    ["standalone display", manifest.display === "standalone"],
    ["rtl hebrew manifest", manifest.lang === "he" && manifest.dir === "rtl"],
    ["maskable icons", (manifest.icons || []).some((icon) => String(icon.purpose || "").includes("maskable"))],
    ["service worker registration", html.includes("app.js?v=l19-fills-v95") && sw.includes('self.addEventListener("install"') && read("app.js").includes('.register("service-worker.js", { scope: "/" })')],
    ["cache version", sw.includes('const CACHE_VERSION = "lumen-v2.4.131-autosave"')],
    ["install precache", sw.includes("cache.addAll(SHELL_ASSETS.map")],
    ["activate cleanup", sw.includes('self.addEventListener("activate"') && sw.includes("caches.delete(k)")],
    ["navigation fallback", sw.includes('caches.match("/index.html")')],
    ["versioned network-first", sw.includes("function networkFirstVersionedAsset") && sw.includes('fetch(new Request(request, { cache: "reload" }))')],
    ["same-origin GET guard", sw.includes('request.method !== "GET"') && sw.includes("url.origin !== self.location.origin")],
    ["index script assets precached", scriptAssets.every((asset) => sw.includes(`"${asset}"`))],
    ["manual-only bank policy", !sw.includes('"/data/questions_bank_seeded.js"') && !html.includes("questions_bank_seeded.js")],
  ].map(([id, passed]) => ({
    id,
    passed: Boolean(passed),
    failures: passed ? [] : [`failed strategy check: ${id}`],
  }));

  const failedAssets = assetResults.filter((asset) => !asset.passed);
  const failedStrategies = strategyChecks.filter((check) => !check.passed);
  return {
    reportVersion: REPORT_VERSION,
    date: REPORT_DATE,
    target: "SVCollege core offline/PWA flow",
    summary: {
      assets: assetResults.length,
      cachedAssets: assetResults.length - failedAssets.length,
      failedAssets: failedAssets.length,
      strategyChecks: strategyChecks.length,
      failedStrategyChecks: failedStrategies.length,
      ready: failedAssets.length === 0 && failedStrategies.length === 0,
    },
    assetResults,
    strategyChecks,
  };
}

function toMarkdown(report) {
  return [
    "# SVCollege PWA Offline Smoke",
    "",
    `- Date: ${report.date}`,
    `- Target: ${report.target}`,
    `- Cached assets: ${report.summary.cachedAssets}/${report.summary.assets}`,
    `- Strategy checks: ${report.summary.strategyChecks - report.summary.failedStrategyChecks}/${report.summary.strategyChecks}`,
    `- Ready: ${report.summary.ready ? "Yes" : "No"}`,
    "",
    "| Asset | Status | Failures |",
    "|---|---|---|",
    ...report.assetResults.map((asset) =>
      `| ${asset.asset} | ${asset.passed ? "pass" : "fail"} | ${asset.failures.join("<br>") || "none"} |`,
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
  REQUIRED_STATIC_ASSETS,
  buildReport,
  htmlScriptAssets,
  run,
  toMarkdown,
};
