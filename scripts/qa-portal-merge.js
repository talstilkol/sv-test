#!/usr/bin/env node
"use strict";

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

const CLI_DEFAULTS = {
  outputDir: path.join(ROOT, "output", "qa", "scan"),
  outputFileName: "scan-combined",
};

function parseArgs(rawArgs = process.argv.slice(2)) {
  const args = {
    outputs: [],
    positional: [],
  };

  for (let i = 0; i < rawArgs.length; i += 1) {
    const arg = rawArgs[i];
    if (arg === "--help") {
      args.help = true;
      continue;
    }
    if (arg === "--output-dir" && rawArgs[i + 1]) {
      args.outputDir = path.resolve(rawArgs[i + 1]);
      i += 1;
      continue;
    }
    if (arg === "--output-name" && rawArgs[i + 1]) {
      args.outputFileName = rawArgs[i + 1];
      i += 1;
      continue;
    }
    args.positional.push(arg);
  }

  args.outputs = args.positional.slice();
  return args;
}

function showHelp() {
  return [
    "Usage:",
    "  node scripts/qa-portal-merge.js [options] <scan-combined.json> [scan-combined.json ...]",
    "  If no files are provided, merges latest two reports from output/qa/scan/<date>/.",
    "--output-dir <dir>    Output directory",
    "--output-name <name>  File prefix without extension (default: scan-combined)",
    "--help",
  ].join("\n");
}

function deterministicRunId(seed) {
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  return `${today}-${crypto.createHash("sha256").update(String(seed)).digest("hex").slice(0, 14)}`;
}

function toReportList(baseDir) {
  const out = [];
  if (!fs.existsSync(baseDir)) {
    return out;
  }
  const entries = fs.readdirSync(baseDir, { withFileTypes: true });
  entries.forEach((entry) => {
    if (!entry.isDirectory()) {
      return;
    }
    const dateDir = path.join(baseDir, entry.name);
    if (!fs.statSync(dateDir).isDirectory()) return;
    const inner = fs
      .readdirSync(dateDir, { withFileTypes: true })
      .filter((run) => run.isDirectory())
      .map((run) => path.join(dateDir, run.name, "scan-combined.json"))
      .filter((p) => fs.existsSync(p));
    out.push(...inner);
  });
  return out;
}

function collectInputPaths(candidates) {
  const collected = [];
  const input = Array.isArray(candidates) ? candidates : [];
  input.forEach((entry) => {
    if (!entry || typeof entry !== "string") return;
    const resolved = path.resolve(entry);
    if (!fs.existsSync(resolved)) {
      return;
    }
    const stat = fs.statSync(resolved);
    if (stat.isDirectory()) {
      toReportList(resolved).forEach((filePath) => collected.push(filePath));
      return;
    }
    if (path.basename(resolved) === "scan-combined.json") {
      collected.push(resolved);
    }
  });
  return collected;
}

function sortReportPaths(paths) {
  return paths
    .map((reportPath) => ({
      path: reportPath,
      mtime: fs.statSync(reportPath).mtime.getTime(),
    }))
    .sort((a, b) => b.mtime - a.mtime)
    .map((entry) => entry.path);
}

function buildFingerprint(value) {
  return crypto.createHash("sha256").update(String(value)).digest("hex");
}

function mergeReports(reports, output) {
  const combinedIssues = [];
  const issueMap = new Map();
  const totals = {
    targets: 0,
    checks: 0,
    passed: 0,
    failed: 0,
    issues: 0,
    bySeverity: {},
    byDomain: {},
  };
  const blockers = [];
  const targets = [];
  const sourceRunIds = [];

  reports.forEach((report) => {
    sourceRunIds.push(report.runId);
    targets.push(...(report.targets || []));
    totals.checks += report.totals && report.totals.checks ? report.totals.checks : 0;
    totals.passed += report.totals && report.totals.passed ? report.totals.passed : 0;
    totals.failed += report.totals && report.totals.failed ? report.totals.failed : 0;

    (report.issues || []).forEach((issue) => {
      const key = buildFingerprint([
        issue.env || "unknown",
        issue.domain,
        issue.severity,
        issue.step,
        issue.expected,
        issue.observed,
        issue.message || "",
      ].join("||"));
      if (!issueMap.has(key)) {
        issueMap.set(key, {
          ...issue,
          sourceRuns: [report.runId],
        });
      } else {
        const existing = issueMap.get(key);
        existing.count = (existing.count || 0) + 1;
        if (!existing.sourceRuns.includes(report.runId)) {
          existing.sourceRuns.push(report.runId);
        }
      }
    });
  });

  const reportMap = new Map();
  targets.forEach((target) => {
    reportMap.set(target.name, target);
  });

  const mergedTargets = Array.from(reportMap.values());
  const allIssues = Array.from(issueMap.values()).map((issue) => {
    const policy = reportMap.size > 0 ? getSeverityPolicy(reports[0], issue.severity) : {};
    totals.bySeverity[issue.severity] = (totals.bySeverity[issue.severity] || 0) + 1;
    totals.byDomain[issue.domain] = (totals.byDomain[issue.domain] || 0) + 1;
    if (policy && policy.mergeBlock) {
      blockers.push({
        report: issue.env || "unknown",
        issueId: issue.id,
        severity: issue.severity,
        domain: issue.domain,
        step: issue.step,
      });
    }
    return issue;
  });

  totals.targets = mergedTargets.length;
  totals.issues = allIssues.length;
  const severityPolicy = (reports[0] && reports[0].severityPolicy) || {};
  const unavailableTargets = mergedTargets.filter((target) => target.status === "environmentUnavailable").length;

  return {
    reportVersion: "qa-portal-scan-merged-v1",
    runId: deterministicRunId(sourceRunIds.join(",")),
    generatedAt: new Date().toISOString(),
    mergedFrom: sourceRunIds,
    output,
    targets: mergedTargets,
    severityPolicy,
    totals: {
      ...totals,
    },
    blockerCount: blockers.length,
    blockers,
    issues: allIssues,
    ready: blockers.length === 0 && unavailableTargets === 0,
  };
}

function getSeverityPolicy(reports, severity) {
  const policy = (reports && reports.severityPolicy) || {};
  return policy[severity] || {};
}

function toMarkdown(report) {
  const rows = [
    "# QA Portal Scan Merge Report",
    "",
    `- Merged reports: ${report.mergedFrom.length}`,
    `- Run ID: ${report.runId}`,
    `- Generated: ${report.generatedAt}`,
    `- Ready: ${report.ready ? "Yes" : "No"}`,
    `- Targets: ${report.totals.targets}`,
    `- Checks: ${report.totals.passed}/${report.totals.checks}`,
    `- Total issues: ${report.totals.issues}`,
    "",
    "## Severity",
    ...Object.entries(report.totals.bySeverity).map(([severity, count]) => `- ${severity}: ${count}`),
    "",
    "## Domain",
    ...Object.entries(report.totals.byDomain).map(([domain, count]) => `- ${domain}: ${count}`),
    "",
    `## Merge blockers (${report.blockerCount})`,
    ...(report.blockerCount
      ? report.blockers.map((item) => `- [${item.report}] ${item.severity}/${item.domain}: ${item.step}`)
      : ["- none"]),
  ];
  return `${rows.join("\n")}\n`;
}

function writeOutput(baseDir, report) {
  const date = report.generatedAt.slice(0, 10);
  const runDir = path.join(baseDir, date, report.runId);
  const dateDir = path.join(baseDir, date);
  fs.mkdirSync(runDir, { recursive: true });
  fs.mkdirSync(dateDir, { recursive: true });
  const jsonPath = path.join(runDir, "scan-combined.json");
  const mdPath = path.join(runDir, "scan-combined.md");
  fs.writeFileSync(jsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdPath, toMarkdown(report), "utf8");
  const dateJsonPath = path.join(dateDir, "scan-combined.json");
  const dateMdPath = path.join(dateDir, "scan-combined.md");
  fs.writeFileSync(dateJsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  fs.writeFileSync(dateMdPath, toMarkdown(report), "utf8");
  return { jsonPath, mdPath, dateJsonPath, dateMdPath };
}

async function main() {
  const args = parseArgs();
  if (args.help) {
    console.log(showHelp());
    return;
  }

  const outputDir = args.outputDir || CLI_DEFAULTS.outputDir;
  const provided = collectInputPaths(args.outputs);
  const inputPaths = provided.length ? provided : toReportList(outputDir);
  if (inputPaths.length < 2) {
    throw new Error("qa:scan:merge requires at least two report paths when no explicit files are provided.");
  }

  const sorted = sortReportPaths(inputPaths);
  const reports = sorted.map((reportPath) => JSON.parse(fs.readFileSync(reportPath, "utf8")));
  const merged = mergeReports(reports, path.join(outputDir, `${args.outputFileName}.merged`));
  const outputs = writeOutput(outputDir, merged);

  console.log(`Wrote merged scan report to:\n- ${outputs.jsonPath}\n- ${outputs.mdPath}`);
}

main().catch((error) => {
  console.error(error && error.stack ? error.stack : String(error));
  process.exitCode = 1;
});
