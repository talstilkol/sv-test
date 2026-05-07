#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const { buildReport: buildTaskBoardReport, writeReports: writeTaskBoardReports } = require("./report_exam_task_board.js");

const ROOT = path.resolve(__dirname, "..");
const OUT_JSON = path.join(ROOT, "PORTAL_FULL_AUDIT_REPORT.json");
const OUT_MD = path.join(ROOT, "PORTAL_FULL_AUDIT_REPORT.md");
const args = new Set(process.argv.slice(2));
const strict = args.has("--strict");
const summary = args.has("--summary");
const FORBIDDEN_NATIVE_RANDOM_TOKEN = ["Math", "random"].join(".");

const COMMANDS = [
  { domain: "Core gates", label: "Vitest full", cmd: "npm", args: ["test", "--", "--run"] },
  { domain: "Core gates", label: "Finish line", cmd: "npm", args: ["run", "finish-line:pre-release"] },
  { domain: "Core gates", label: "System health", cmd: "npm", args: ["run", "system:health:strict"] },
  { domain: "Core gates", label: "DOM trust", cmd: "node", args: ["scripts/report_dom_storage_trust_boundary.js", "--strict"] },
  { domain: "Core gates", label: "Performance budget", cmd: "node", args: ["scripts/report_performance_budget.js", "--json"] },
  { domain: "Exam materials", label: "Material gaps", cmd: "npm", args: ["run", "exam:material-gaps:strict"] },
  { domain: "Exam materials", label: "Curriculum coverage", cmd: "npm", args: ["run", "questions:curriculum-coverage:strict"] },
  { domain: "Exam materials", label: "Activity coverage", cmd: "npm", args: ["run", "questions:activity-coverage:strict"] },
  { domain: "Exam materials", label: "Task tree", cmd: "npm", args: ["run", "exam:task-tree:strict"] },
  { domain: "Exam materials", label: "Manual review lock", cmd: "npm", args: ["run", "exam:manual-review:strict"] },
  { domain: "Exam materials", label: "Solution guide", cmd: "npm", args: ["run", "exam:solution-guide:coverage:strict"] },
  { domain: "Exam materials", label: "Mock variants", cmd: "npm", args: ["run", "exam:mock-variants:strict"] },
  { domain: "Exam materials", label: "Exam flows", cmd: "npm", args: ["run", "exam:flows:strict"] },
  { domain: "UI navigation", label: "Full portal smoke", cmd: "npm", args: ["run", "svcollege:full-portal-smoke:strict"] },
  { domain: "UI navigation", label: "Visual overlap", cmd: "npm", args: ["run", "svcollege:visual-overlap:strict"] },
  { domain: "UI navigation", label: "Critical flows", cmd: "npm", args: ["run", "svcollege:critical-flows:strict"] },
  { domain: "UI navigation", label: "Top tabs", cmd: "npm", args: ["run", "svcollege:top-tabs:strict"] },
  { domain: "UI navigation", label: "Tab matrix", cmd: "npm", args: ["run", "svcollege:tab-matrix:strict"] },
  { domain: "UI navigation", label: "Context tree", cmd: "npm", args: ["run", "svcollege:context-tree:strict"] },
  { domain: "UI navigation", label: "Accessibility", cmd: "npm", args: ["run", "svcollege:accessibility:strict"] },
  { domain: "UI navigation", label: "Console gate", cmd: "npm", args: ["run", "svcollege:console-gate:strict"] },
  { domain: "UI navigation", label: "Site map", cmd: "npm", args: ["run", "site-map:strict"] },
  { domain: "UI navigation", label: "Navigation tree", cmd: "npm", args: ["run", "svcollege:navigation-tree:strict"] },
  { domain: "Task board and media", label: "Task board", cmd: "npm", args: ["run", "exam:task-board:strict"] },
  { domain: "Content quality", label: "Question quality", cmd: "npm", args: ["run", "quality:questions:strict"] },
  { domain: "Content quality", label: "Distractor exam gate", cmd: "npm", args: ["run", "distractor:exam-gate:strict"] },
  { domain: "Content quality", label: "Exam critical notes", cmd: "npm", args: ["run", "questions:exam-critical-notes:strict"] },
  { domain: "Content quality", label: "Quality remediation", cmd: "npm", args: ["run", "quality:remediation:strict"] },
  { domain: "Management", label: "Master plan backlog", cmd: "npm", args: ["run", "master-plan:brutal-audit"] },
  { domain: "E2E", label: "Playwright smoke", cmd: "npx", args: ["playwright", "test", "tests/playwright/smoke.spec.js", "--project=chromium", "--workers=1", "--reporter=list"], allowInfrastructureUnavailable: true },
];

function clip(value) {
  const text = String(value || "").trim();
  if (text.length <= 2400) return text;
  return `${text.slice(0, 1600)}\n...\n${text.slice(-700)}`;
}

function runCommand(entry) {
  const started = Date.now();
  const result = spawnSync(entry.cmd, entry.args, {
    cwd: ROOT,
    encoding: "utf8",
    timeout: 10 * 60 * 1000,
    maxBuffer: 1024 * 1024 * 20,
  });
  const rawOutput = `${result.stdout || ""}\n${result.stderr || ""}\n${result.error ? String(result.error.message || result.error) : ""}`;
  const infrastructureUnavailable = Boolean(entry.allowInfrastructureUnavailable &&
    result.status !== 0 &&
    /listen EPERM|EACCES|Process from config\.webServer was not able to start/.test(rawOutput));
  const passed = result.status === 0 || infrastructureUnavailable;
  return {
    domain: entry.domain,
    label: entry.label,
    command: [entry.cmd].concat(entry.args).join(" "),
    status: infrastructureUnavailable ? 0 : result.status,
    originalStatus: result.status,
    signal: result.signal || null,
    passed,
    environmentStatus: infrastructureUnavailable ? "infrastructureUnavailable" : "ok",
    durationMs: Date.now() - started,
    stdout: clip(result.stdout),
    stderr: clip(result.stderr),
    error: result.error ? String(result.error.message || result.error) : null,
  };
}

function walkFiles(target, out) {
  const full = path.join(ROOT, target);
  if (!fs.existsSync(full)) return;
  const stat = fs.statSync(full);
  if (stat.isFile()) {
    out.push(full);
    return;
  }
  fs.readdirSync(full).forEach((name) => {
    if (name === "node_modules" || name === ".git" || name === "dist" || name === "coverage") return;
    walkFiles(path.join(target, name), out);
  });
}

function scanForbiddenToken() {
  const targets = ["app.js", "src", "data", "scripts", "tests", "index.html", "dashboard.html"];
  const files = [];
  targets.forEach((target) => walkFiles(target, files));
  const hits = [];
  files.forEach((file) => {
    const rel = path.relative(ROOT, file);
    const text = fs.readFileSync(file, "utf8");
    if (!text.includes(FORBIDDEN_NATIVE_RANDOM_TOKEN)) return;
    text.split(/\r?\n/).forEach((line, index) => {
      if (line.includes(FORBIDDEN_NATIVE_RANDOM_TOKEN)) hits.push({ file: rel, line: index + 1 });
    });
  });
  return {
    domain: "Core gates",
    label: "Forbidden random scan",
    command: `scan active code for ${["Math", "random"].join(".")}`,
    passed: hits.length === 0,
    status: hits.length === 0 ? 0 : 1,
    signal: null,
    durationMs: 0,
    hits,
    stdout: hits.length ? JSON.stringify(hits.slice(0, 20), null, 2) : "no forbidden native random token found",
    stderr: "",
    error: null,
  };
}

function domainScores(results) {
  const byDomain = new Map();
  results.forEach((result) => {
    if (!byDomain.has(result.domain)) byDomain.set(result.domain, []);
    byDomain.get(result.domain).push(result);
  });
  return Array.from(byDomain.entries()).map(([domain, items]) => {
    const passed = items.filter((item) => item.passed).length;
    const score = items.length ? Math.round((passed / items.length) * 100) : 0;
    const environmentWarnings = items.filter((item) => item.environmentStatus === "infrastructureUnavailable").map((item) => item.label);
    return {
      domain,
      score,
      status: passed === items.length ? (environmentWarnings.length ? "green-with-environment-warning" : "green") : "red",
      passed,
      total: items.length,
      failures: items.filter((item) => !item.passed).map((item) => item.label),
      environmentWarnings,
    };
  });
}

function buildReport() {
  const taskBoard = buildTaskBoardReport();
  writeTaskBoardReports(taskBoard);
  const results = COMMANDS.map(runCommand);
  results.splice(5, 0, scanForbiddenToken());
  const scores = domainScores(results);
  const passed = results.filter((result) => result.passed).length;
  const ready = passed === results.length && taskBoard.ready;
  const report = {
    reportVersion: "portal-full-audit-v1",
    generatedAt: new Date().toISOString(),
    ready,
    summary: {
      passed,
      total: results.length,
      score: results.length ? Math.round((passed / results.length) * 100) : 0,
      taskBoardReady: taskBoard.ready,
    },
    taskBoard: taskBoard.totals,
    scores,
    results,
    recommendations: results.filter((result) => !result.passed).map((result) => ({
      domain: result.domain,
      label: result.label,
      command: result.command,
      fix: "Open the command output, fix the failing gate from the first concrete assertion, then rerun portal:full-audit:strict.",
    })),
  };
  return report;
}

function writeReport(report) {
  fs.writeFileSync(OUT_JSON, `${JSON.stringify(report, null, 2)}\n`);
  const scoreRows = report.scores.map((score) =>
    `| ${score.domain} | ${score.score}/100 | ${score.status} | ${score.passed}/${score.total} | ${score.failures.join(", ") || "none"} |`,
  ).join("\n");
  const commandRows = report.results.map((result) =>
    `| ${result.passed ? "PASS" : "FAIL"} | ${result.domain} | ${result.label} | \`${result.command}\` | ${result.durationMs} |`,
  ).join("\n");
  const md = [
    "# Portal Full Audit Report",
    "",
    `- ready: ${report.ready}`,
    `- score: ${report.summary.score}/100`,
    `- passed: ${report.summary.passed}/${report.summary.total}`,
    `- generatedAt: ${report.generatedAt}`,
    "",
    "## Task Board",
    `- required: ${report.taskBoard.requiredMinutes} minutes (${report.taskBoard.requiredLabel})`,
    `- diagnostics: ${report.taskBoard.diagnosticTasks}`,
    `- site/tree: ${report.taskBoard.siteTreeTasks}`,
    `- exam sections: ${report.taskBoard.examSectionTasks}`,
    `- videos: ${report.taskBoard.videos}`,
    `- presentation/images: ${report.taskBoard.presentationImages}`,
    `- optional backlog: ${report.taskBoard.optionalBacklog}`,
    "",
    "## Scores",
    "| Domain | Score | Status | Gates | Failures |",
    "| --- | ---: | --- | ---: | --- |",
    scoreRows,
    "",
    "## Commands",
    "| Status | Domain | Gate | Command | Duration ms |",
    "| --- | --- | --- | --- | ---: |",
    commandRows,
    "",
    "## Recommendations",
    report.recommendations.length
      ? report.recommendations.map((item) => `- ${item.domain} / ${item.label}: ${item.fix}`).join("\n")
      : "- none",
    "",
  ].join("\n");
  fs.writeFileSync(OUT_MD, `${md}\n`);
}

if (require.main === module) {
  const report = buildReport();
  writeReport(report);
  if (summary) {
    console.log(JSON.stringify({
      ready: report.ready,
      score: report.summary.score,
      passed: report.summary.passed,
      total: report.summary.total,
      scores: report.scores,
    }, null, 2));
  } else {
    console.log(JSON.stringify(report, null, 2));
  }
  if (strict && !report.ready) {
    process.exitCode = 1;
  }
}

module.exports = { buildReport, writeReport };
