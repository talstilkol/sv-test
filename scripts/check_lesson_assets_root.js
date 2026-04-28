#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const LESSONS_DIR = path.join(ROOT, "lessons");
const MANIFEST_PATH = path.join(LESSONS_DIR, "manifest.json");
const ASSET_RE = /\.(pdf|mp4|docx|pptx)$/i;

function listAssetFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((name) => ASSET_RE.test(name))
    .sort((a, b) => a.localeCompare(b, "he"));
}

function readManifest() {
  const raw = fs.readFileSync(MANIFEST_PATH, "utf8");
  return JSON.parse(raw);
}

function mayBeLocalOnlyAsset(entry) {
  return entry.type === "mp4" && entry.importedStatus === "asset-only";
}

function main() {
  const rootAssets = listAssetFiles(ROOT);
  if (rootAssets.length) {
    console.error("[lesson-assets] Raw lesson assets found in repository root:");
    rootAssets.forEach((name) => console.error(`- ${name}`));
    console.error("[lesson-assets] Move these files into lessons/ and update lessons/manifest.json.");
    process.exitCode = 1;
    return;
  }

  const lessonAssets = listAssetFiles(LESSONS_DIR);
  const manifest = readManifest();
  const entries = Array.isArray(manifest.assets) ? manifest.assets : [];
  const manifestNames = new Set(entries.map((entry) => entry.filename));
  const actualNames = new Set(lessonAssets);

  const missingFromManifest = lessonAssets.filter((name) => !manifestNames.has(name));
  const missingFromDisk = entries
    .filter((entry) => !actualNames.has(entry.filename) && !mayBeLocalOnlyAsset(entry))
    .map((entry) => entry.filename);
  const duplicateNames = entries
    .map((entry) => entry.filename)
    .filter((name, index, arr) => arr.indexOf(name) !== index);

  if (missingFromManifest.length || missingFromDisk.length || duplicateNames.length) {
    if (missingFromManifest.length) {
      console.error("[lesson-assets] Files missing from lessons/manifest.json:");
      missingFromManifest.forEach((name) => console.error(`- ${name}`));
    }
    if (missingFromDisk.length) {
      console.error("[lesson-assets] Manifest entries missing from lessons/:");
      missingFromDisk.forEach((name) => console.error(`- ${name}`));
    }
    if (duplicateNames.length) {
      console.error("[lesson-assets] Duplicate manifest entries:");
      [...new Set(duplicateNames)].forEach((name) => console.error(`- ${name}`));
    }
    process.exitCode = 1;
    return;
  }

  console.log(`[lesson-assets] OK: ${lessonAssets.length} assets in lessons/ and 0 raw assets in root.`);
}

main();
