#!/usr/bin/env node
"use strict";

// scripts/check_threshold_drift.js
//
// Lightweight watchdog for test thresholds and performance budgets.
// Detects when a value has moved in the "easier-to-pass" direction
// without a matching note in tests/THRESHOLDS_LOCKED.md.
//
// USAGE:
//   node scripts/check_threshold_drift.js          # warn on drift, exit 0
//   node scripts/check_threshold_drift.js --strict # exit 1 on drift
//   node scripts/check_threshold_drift.js --update # rebuild baseline
//
// BASELINE FILE: tests/.threshold-baseline.json

const fs = require("fs");
const path = require("path");
const { byFilename } = require("./lib/sort.js");

const ROOT = path.resolve(__dirname, "..");
const TESTS_DIR = path.join(ROOT, "tests");
const PERF_BUDGET_PATH = path.join(ROOT, "scripts", "report_performance_budget.js");
const BASELINE_PATH = path.join(TESTS_DIR, ".threshold-baseline.json");
const LOCKED_DOC = path.join(TESTS_DIR, "THRESHOLDS_LOCKED.md");

const STRICT = process.argv.includes("--strict");
const UPDATE = process.argv.includes("--update");

// -------- Scanners --------

function scanTestThresholds() {
  if (!fs.existsSync(TESTS_DIR)) return [];
  const files = fs.readdirSync(TESTS_DIR)
    .filter((f) => f.endsWith(".test.js"))
    .sort(byFilename);
  const out = [];
  for (const f of files) {
    const txt = fs.readFileSync(path.join(TESTS_DIR, f), "utf8");
    const ge = /toBeGreaterThanOrEqual\(\s*(-?\d+(?:\.\d+)?)\s*\)/g;
    const le = /toBeLessThanOrEqual\(\s*(-?\d+(?:\.\d+)?)\s*\)/g;
    let m;
    let i = 0;
    while ((m = ge.exec(txt)) !== null) {
      out.push({ file: `tests/${f}`, op: "GTE", n: i++, value: Number(m[1]) });
    }
    i = 0;
    while ((m = le.exec(txt)) !== null) {
      out.push({ file: `tests/${f}`, op: "LTE", n: i++, value: Number(m[1]) });
    }
  }
  return out;
}

function scanPerfBudget() {
  if (!fs.existsSync(PERF_BUDGET_PATH)) return [];
  const txt = fs.readFileSync(PERF_BUDGET_PATH, "utf8");
  const out = [];
  // Match: "filename": <number>
  const re = /"([^"]+)"\s*:\s*(\d+)/g;
  let m;
  while ((m = re.exec(txt)) !== null) {
    out.push({ file: "scripts/report_performance_budget.js", op: "BUDGET", key: m[1], value: Number(m[2]) });
  }
  return out;
}

function buildBaseline() {
  const tests = scanTestThresholds();
  const budgets = scanPerfBudget();
  return { generatedAt: new Date().toISOString().slice(0, 10), tests, budgets };
}

function loadBaseline() {
  if (!fs.existsSync(BASELINE_PATH)) return null;
  try {
    return JSON.parse(fs.readFileSync(BASELINE_PATH, "utf8"));
  } catch {
    return null;
  }
}

function saveBaseline(b) {
  fs.writeFileSync(BASELINE_PATH, JSON.stringify(b, null, 2) + "\n");
}

// -------- Diff --------

function keyOf(item) {
  if (item.op === "BUDGET") return `${item.file}::BUDGET::${item.key}`;
  return `${item.file}::${item.op}::${item.n}`;
}

function diff(baseline, current) {
  const drifts = [];
  const map = new Map(baseline.map((b) => [keyOf(b), b.value]));
  for (const c of current) {
    const k = keyOf(c);
    if (!map.has(k)) continue; // new threshold — ignored, not drift
    const oldV = map.get(k);
    if (oldV === c.value) continue;

    // Detect "easier-to-pass" direction:
    //   GTE (>=) lower number = easier
    //   LTE (<=) higher number = easier
    //   BUDGET higher number = easier
    const easier =
      (c.op === "GTE" && c.value < oldV) ||
      (c.op === "LTE" && c.value > oldV) ||
      (c.op === "BUDGET" && c.value > oldV);
    drifts.push({ key: k, before: oldV, after: c.value, easier });
  }
  return drifts;
}

// -------- Main --------

function main() {
  if (UPDATE) {
    saveBaseline(buildBaseline());
    console.log("✏️  Wrote " + path.relative(ROOT, BASELINE_PATH));
    return;
  }

  const baseline = loadBaseline();
  const current = buildBaseline();

  if (!baseline) {
    saveBaseline(current);
    console.log("✏️  Created " + path.relative(ROOT, BASELINE_PATH) + " (first run)");
    return;
  }

  const allDrifts = [
    ...diff(baseline.tests, current.tests),
    ...diff(baseline.budgets, current.budgets),
  ];
  const easier = allDrifts.filter((d) => d.easier);

  if (easier.length === 0) {
    console.log("✅ No threshold drift in the easier-to-pass direction.");
    if (allDrifts.length > 0) {
      console.log(`   (${allDrifts.length} threshold(s) tightened — good. Run --update to refresh baseline.)`);
    }
    return;
  }

  console.warn("⚠️  Threshold drift detected:");
  easier.forEach((d) => {
    console.warn(`  ${d.key}: ${d.before} → ${d.after}  (softer)`);
  });
  console.warn(`\nDocument every softening in ${path.relative(ROOT, LOCKED_DOC)},`);
  console.warn(`then run \`node scripts/check_threshold_drift.js --update\` to bake in the new baseline.`);

  if (STRICT) process.exit(1);
}

if (require.main === module) {
  main();
}

module.exports = { buildBaseline, diff, scanTestThresholds, scanPerfBudget };
