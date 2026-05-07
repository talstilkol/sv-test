#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const APP_JS = path.join(ROOT, "app.js");
const INDEX_HTML = path.join(ROOT, "index.html");
const REPORT_PATH = path.join(ROOT, "DOM_ID_CONTRACT_REPORT.json");

const OPTIONAL_REF_IDS = new Set([]);

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function collectDeclaredIds(source) {
  const ids = new Set();
  for (const match of source.matchAll(/\bid\s*=\s*["']([^"']+)["']/g)) {
    ids.add(match[1].trim());
  }
  return ids;
}

function collectGetElementByIdRefs(source) {
  const refs = [];
  for (const match of source.matchAll(/getElementById\(\s*["']([^"']+)["']\s*\)/g)) {
    refs.push(match[1].trim());
  }
  return refs;
}

function sortUnique(values) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

function buildReport() {
  const appJs = read(APP_JS);
  const indexHtml = read(INDEX_HTML);

  const declared = new Set([
    ...collectDeclaredIds(indexHtml),
    ...collectDeclaredIds(appJs),
  ]);
  const refs = sortUnique(collectGetElementByIdRefs(appJs));

  const missing = refs.filter((id) => !declared.has(id));
  const missingRequired = missing.filter((id) => !OPTIONAL_REF_IDS.has(id));
  const missingOptional = missing.filter((id) => OPTIONAL_REF_IDS.has(id));

  return {
    generatedAt: new Date().toISOString(),
    sourceFiles: ["index.html", "app.js"],
    declaredIds: declared.size,
    referencedIds: refs.length,
    missingRequiredCount: missingRequired.length,
    missingOptionalCount: missingOptional.length,
    missingRequired,
    missingOptional,
    optionalAllowlist: Array.from(OPTIONAL_REF_IDS).sort((a, b) => a.localeCompare(b)),
    status: missingRequired.length === 0 ? "pass" : "fail",
  };
}

function main() {
  const args = new Set(process.argv.slice(2));
  const strict = args.has("--strict");
  const summary = args.has("--summary");
  const write = args.has("--write");

  const report = buildReport();
  if (write || summary || strict) {
    fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2) + "\n", "utf8");
  }

  if (summary || !write) {
    console.log(
      `[dom-id-contract] declared=${report.declaredIds} referenced=${report.referencedIds} missingRequired=${report.missingRequiredCount} missingOptional=${report.missingOptionalCount}`,
    );
    if (report.missingRequired.length) {
      console.log(`[dom-id-contract] missingRequired: ${report.missingRequired.join(", ")}`);
    }
    if (report.missingOptional.length) {
      console.log(`[dom-id-contract] missingOptional: ${report.missingOptional.join(", ")}`);
    }
  }

  if (strict && report.missingRequiredCount > 0) {
    process.exitCode = 1;
  }
}

main();
