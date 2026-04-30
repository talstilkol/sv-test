#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const REPORT_VERSION = "reward-metadata-audit-v1";
const REPORT_DATE = "2026-04-29";

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

function lineNumber(source, index) {
  return source.slice(0, index).split("\n").length;
}

function extractAwardCalls(source) {
  const calls = [];
  let searchFrom = 0;
  const needle = "awardLearningReward({";
  while (true) {
    const start = source.indexOf(needle, searchFrom);
    if (start === -1) break;
    let depth = 0;
    let end = -1;
    for (let index = source.indexOf("{", start); index < source.length; index += 1) {
      const char = source[index];
      if (char === "{") depth += 1;
      if (char === "}") {
        depth -= 1;
        if (depth === 0) {
          end = index + 1;
          break;
        }
      }
    }
    if (end === -1) break;
    const prefix = source.slice(Math.max(0, start - 16), start);
    if (!prefix.includes("function ")) {
      calls.push({
        line: lineNumber(source, start),
        snippet: source.slice(start, end),
      });
    }
    searchFrom = end;
  }
  return calls;
}

function isCompatibilityWrapper(call) {
  return call.snippet.includes("...meta") && call.snippet.includes("coins: coinsForXP(amount)");
}

function hasSource(call) {
  return /\bsource\s*:/.test(call.snippet) || call.snippet.includes("...rewardMetaForAnswer");
}

function hasIdentity(call) {
  return /\bquestionId\s*:/.test(call.snippet) ||
    /\bconceptKey\s*:/.test(call.snippet) ||
    call.snippet.includes("...rewardMetaForAnswer");
}

function buildReport() {
  const app = read("app.js");
  const calls = extractAwardCalls(app)
    .filter((call) => !isCompatibilityWrapper(call));
  const missing = calls
    .filter((call) => !hasSource(call) || !hasIdentity(call))
    .map((call) => ({
      line: call.line,
      hasSource: hasSource(call),
      hasIdentity: hasIdentity(call),
      snippet: call.snippet.replace(/\s+/g, " ").slice(0, 180),
    }));
  return {
    reportVersion: REPORT_VERSION,
    date: REPORT_DATE,
    target: "Reward source metadata",
    policy: "Every direct reward must carry source plus conceptKey/questionId metadata or the shared answer metadata helper.",
    summary: {
      directRewardCalls: calls.length,
      missingMetadata: missing.length,
      ready: missing.length === 0,
    },
    missing,
    rewardCalls: calls.map((call) => ({
      line: call.line,
      hasSource: hasSource(call),
      hasIdentity: hasIdentity(call),
    })),
  };
}

function run(argv = process.argv.slice(2)) {
  const report = buildReport();
  if (argv.includes("--json")) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  } else {
    process.stdout.write(`${JSON.stringify(report.summary, null, 2)}\n`);
  }
  if (argv.includes("--strict") && !report.summary.ready) process.exitCode = 1;
  return report;
}

if (require.main === module) run();

module.exports = {
  buildReport,
  extractAwardCalls,
  run,
};
