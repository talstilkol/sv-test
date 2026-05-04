#!/usr/bin/env node
"use strict";

// scripts/sync_sw_precache.js
//
// Reconciles the `/data/*` entries in service-worker SHELL_ASSETS against the
// `<script src="data/...">` tags in index.html.
//
// USAGE:
//   node scripts/sync_sw_precache.js          # report drift, exit 1 if any
//   node scripts/sync_sw_precache.js --write  # patch service-worker.js in place
//
// SCOPE:
//   Only touches lines starting with "/data/". Core paths (/, /index.html,
//   /style.css, /app.js, /src/*, etc.) are left alone — those are managed
//   manually because they include transitively imported ES modules.
//
// MOTIVATION:
//   Manually maintaining the precache list dropped twice this branch.
//   This script gives index.html ownership of the data-file precache list.

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const INDEX_PATH = path.join(ROOT, "index.html");
const SW_PATH = path.join(ROOT, "service-worker.js");

const WRITE = process.argv.includes("--write");

function read(filename) {
  return fs.readFileSync(filename, "utf8");
}

// Pull every <script src="data/..."> reference out of index.html.
// Both bare (`data/foo.js`) and versioned (`data/foo.js?v=...`) forms are
// kept — the SW must cache both because the runtime fetch URL includes the
// query string for cache-busting.
function collectDataScriptsFromIndex() {
  const html = read(INDEX_PATH);
  const out = new Set();
  const re = /<script[^>]*\ssrc=["']([^"']+)["']/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const url = m[1];
    if (!url.startsWith("data/")) continue;
    const absolute = "/" + url;
    out.add(absolute);
    // SW caches BOTH the versioned and unversioned forms because the runtime
    // fetch URL depends on whichever <script src=> the page emitted. Add the
    // sibling form automatically.
    const qIdx = absolute.indexOf("?");
    if (qIdx !== -1) out.add(absolute.slice(0, qIdx));
    else out.add(absolute);  // (already added; no-op)
  }
  return Array.from(out);
}

function urlSortKey(url) {
  const [base, query] = url.split("?", 2);
  return `${base}\x01${query || ""}`;
}

// Find the SHELL_ASSETS array boundaries in service-worker.js.
function findShellAssetsRange(swText) {
  const startMarker = "const SHELL_ASSETS = [";
  const start = swText.indexOf(startMarker);
  if (start === -1) throw new Error("Could not locate `const SHELL_ASSETS = [` in service-worker.js");
  const open = swText.indexOf("[", start);
  let depth = 1;
  let i = open + 1;
  while (i < swText.length && depth > 0) {
    const ch = swText[i];
    if (ch === "[") depth++;
    else if (ch === "]") depth--;
    i++;
  }
  if (depth !== 0) throw new Error("Unbalanced [ in SHELL_ASSETS");
  return { open: open + 1, close: i - 1 };
}

// Extract everything currently inside SHELL_ASSETS, classified into:
//   - dataLines: lines that quote a "/data/..." path
//   - otherLines: everything else (preserved verbatim)
function classify(swText) {
  const { open, close } = findShellAssetsRange(swText);
  const body = swText.slice(open, close);
  const lines = body.split("\n");
  const dataLines = [];
  const otherLines = [];
  for (const line of lines) {
    const m = line.match(/"\/data\/[^"]+"/);
    if (m) {
      const url = m[0].slice(1, -1);
      dataLines.push(url);
    } else {
      otherLines.push(line);
    }
  }
  return { open, close, otherLines, currentDataUrls: dataLines };
}

function rebuild(swText, wantedDataUrls) {
  const { open, close, otherLines } = classify(swText);

  // Decide where the data block lives. Convention: a single contiguous block
  // marked by the comment `// /data/* content files (auto-synced from index.html).`
  // If the marker is missing, append the block at the end of SHELL_ASSETS.
  const MARKER = "// /data/* content files (auto-synced from index.html).";
  const sortedData = wantedDataUrls.slice().sort((a, b) => {
    const ka = urlSortKey(a);
    const kb = urlSortKey(b);
    return ka < kb ? -1 : ka > kb ? 1 : 0;
  });

  const dataBlock = ["  " + MARKER, ...sortedData.map((u) => `  "${u}",`)];

  // Keep otherLines, drop any pre-existing marker line, then splice in dataBlock.
  const cleanedOthers = otherLines.filter((l) => l.trim() !== MARKER);

  // Place the data block at the end (just before the closing `]`).
  // We stitch with explicit newlines so the result reads cleanly.
  let body = cleanedOthers.join("\n").replace(/\s+$/, "");
  if (body.length && !body.endsWith(",")) {
    // Last line already has its own comma — fine. Just append a newline.
  }
  body += "\n" + dataBlock.join("\n") + "\n";

  return swText.slice(0, open) + body + swText.slice(close);
}

function diffArr(a, b) {
  const setB = new Set(b);
  return a.filter((x) => !setB.has(x));
}

function main() {
  const wanted = collectDataScriptsFromIndex();
  const swText = read(SW_PATH);
  const { currentDataUrls } = classify(swText);

  const missing = diffArr(wanted, currentDataUrls);
  const extra = diffArr(currentDataUrls, wanted);

  if (missing.length === 0 && extra.length === 0) {
    console.log(`✅ SW data precache in sync (${wanted.length} entries)`);
    return;
  }

  if (WRITE) {
    const next = rebuild(swText, wanted);
    fs.writeFileSync(SW_PATH, next);
    console.log(`✏️  Patched service-worker.js (${wanted.length} data entries)`);
    if (missing.length) console.log(`   + ${missing.length} added`);
    if (extra.length) console.log(`   - ${extra.length} removed`);
    return;
  }

  console.error("❌ service-worker /data precache is out of sync with index.html");
  if (missing.length) {
    console.error(`  Missing in SW (${missing.length}):`);
    missing.slice(0, 20).forEach((u) => console.error("    + " + u));
    if (missing.length > 20) console.error(`    ... and ${missing.length - 20} more`);
  }
  if (extra.length) {
    console.error(`  Extra in SW (${extra.length}):`);
    extra.slice(0, 20).forEach((u) => console.error("    - " + u));
    if (extra.length > 20) console.error(`    ... and ${extra.length - 20} more`);
  }
  console.error("\nRun `node scripts/sync_sw_precache.js --write` to fix.");
  process.exit(1);
}

if (require.main === module) {
  main();
}

module.exports = { collectDataScriptsFromIndex, classify, rebuild };
