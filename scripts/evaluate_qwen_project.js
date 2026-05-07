#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync, spawn } = require("child_process");
const guard = require("./report_qwen_output_guard.js");

const ROOT = path.resolve(__dirname, "..");
const REPORT_VERSION = "qwen-runtime-evaluator-v1";
const DEFAULT_TARGET = "output/qwen-coder-next/rerun-02/day-06/materialized-project";
const RANDOM_TOKEN = ["Math", "random"].join(".");
const SKIP_FILES = new Set([
  "qwen-materialization-report.json",
  "qwen-materialization-report.md",
  "qwen-output-guard-report.json",
  "qwen-output-guard-report.md",
  "qwen-runtime-evaluation-report.json",
  "qwen-runtime-evaluation-report.md",
]);
const FORBIDDEN_MARKERS = [
  /\bfake\s+data\b/i,
  /\bdemo\s+(data|user|users|item|items|record|records)\b/i,
  /\bsample\s+(data|user|users|item|items|record|records)\b/i,
  /\bmock\s+(data|user|users|item|items|record|records)\b/i,
  /\bexample\.(com|org|net)\b/i,
  /\blorem\s+ipsum\b/i,
];

function absolute(file) {
  return path.isAbsolute(file) ? file : path.join(ROOT, file);
}

function relative(file) {
  return path.relative(ROOT, file) || ".";
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function listFiles(entry, output = []) {
  if (!fs.existsSync(entry)) return output;
  const stat = fs.statSync(entry);
  if (stat.isFile()) {
    output.push(entry);
    return output;
  }
  if (!stat.isDirectory()) return output;
  fs.readdirSync(entry, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((dirent) => {
      if (dirent.name === "node_modules" || dirent.name === "dist" || dirent.name.startsWith(".")) return;
      if (dirent.isFile() && SKIP_FILES.has(dirent.name)) return;
      listFiles(path.join(entry, dirent.name), output);
    });
  return output;
}

function addCheck(checks, id, label, passed, points, detail, evidence = []) {
  checks.push({
    id,
    label,
    status: passed ? "pass" : "fail",
    passed: Boolean(passed),
    points,
    earned: passed ? points : 0,
    detail,
    evidence,
  });
}

function sourceFiles(target) {
  return listFiles(target).filter((file) => /\.(js|mjs|cjs|jsx|ts|tsx|json|html|css|env)$/.test(file));
}

function scanForbidden(files) {
  const matches = [];
  files.forEach((file) => {
    const text = fs.readFileSync(file, "utf8");
    if (text.includes(RANDOM_TOKEN)) matches.push({ file: relative(file), token: "native-random-api" });
    FORBIDDEN_MARKERS.forEach((regex) => {
      if (regex.test(text)) matches.push({ file: relative(file), token: "fabricated-data-marker" });
    });
  });
  return matches;
}

function shouldNodeCheck(file) {
  const normalized = file.split(path.sep).join("/");
  if (!/\.(js|mjs|cjs)$/.test(file)) return false;
  if (/\.(jsx|tsx)$/.test(file)) return false;
  if (normalized.includes("/client/") || normalized.includes("/frontend/")) return false;
  return true;
}

function runCommand(command, args, cwd, options = {}) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: "utf8",
    timeout: options.timeoutMs || 120000,
    env: { ...process.env, ...(options.env || {}) },
    maxBuffer: 1024 * 1024 * 20,
  });
  return {
    command: [command, ...args].join(" "),
    cwd: relative(cwd),
    status: typeof result.status === "number" ? result.status : null,
    signal: result.signal || null,
    error: result.error ? result.error.message : null,
    stdout: (result.stdout || "").slice(-4000),
    stderr: (result.stderr || "").slice(-4000),
    passed: result.status === 0,
  };
}

function packageDirs(target) {
  return listFiles(target)
    .filter((file) => path.basename(file) === "package.json")
    .map((file) => path.dirname(file));
}

function nodeCheck(files) {
  return files
    .filter(shouldNodeCheck)
    .map((file) => runCommand("node", ["--check", file], ROOT, { timeoutMs: 30000 }));
}

function discoverServerEntry(target) {
  const candidates = [
    "server/server.js",
    "server/index.js",
    "backend/server.js",
    "backend/index.js",
    "api/server.js",
    "api/index.js",
  ];
  return candidates.map((item) => path.join(target, item)).find((file) => fs.existsSync(file)) || null;
}

function runBackendSmoke(entry, contractPath) {
  if (!entry) return { skipped: true, reason: "no-server-entry" };
  const port = "51420";
  const child = spawn("node", [entry], {
    cwd: path.dirname(entry),
    env: {
      ...process.env,
      PORT: port,
      MONGODB_URI: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/sv-library-runtime-eval",
      MONGO_URI: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/sv-library-runtime-eval",
    },
    stdio: ["ignore", "pipe", "pipe"],
  });

  const stdout = [];
  const stderr = [];
  child.stdout.on("data", (chunk) => stdout.push(String(chunk)));
  child.stderr.on("data", (chunk) => stderr.push(String(chunk)));

  const started = wait(1200);
  const result = { skipped: false, status: null, checks: [], stdout: "", stderr: "" };
  return started.then(() => {
    const contract = contractPath && fs.existsSync(contractPath) ? readJson(contractPath) : null;
    const getEndpoints = contract
      ? (contract.allowedEndpoints || []).filter((endpoint) => endpoint.startsWith("GET "))
      : ["GET /"];
    return Promise.all(getEndpoints.slice(0, 3).map((endpoint) => {
      const route = endpoint.replace(/^GET\s+/, "").replace(/:id/g, "000000000000000000000000");
      return fetchUrl(`http://127.0.0.1:${port}${route}`, 2500).then((check) => ({ endpoint, ...check }));
    })).then((checks) => {
      result.checks = checks;
      result.status = child.exitCode;
      result.stdout = stdout.join("").slice(-4000);
      result.stderr = stderr.join("").slice(-4000);
      child.kill("SIGTERM");
      return result;
    });
  });
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function fetchUrl(url, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, { signal: controller.signal })
    .then((res) => ({ ok: res.status < 500, status: res.status }))
    .catch((err) => ({ ok: false, status: null, error: err.message }))
    .finally(() => clearTimeout(timer));
}

async function evaluate(options = {}) {
  const target = absolute(options.target || DEFAULT_TARGET);
  const checks = [];
  const files = sourceFiles(target);

  addCheck(
    checks,
    "target-files",
    "Materialized project has files",
    files.length > 0,
    10,
    files.length ? `${files.length} files found.` : "No source files found.",
    files.map(relative),
  );

  const forbiddenMatches = scanForbidden(files);
  addCheck(
    checks,
    "static-forbidden-scan",
    "No native random API or fabricated data markers",
    forbiddenMatches.length === 0,
    15,
    forbiddenMatches.length ? forbiddenMatches.map((item) => `${item.file}: ${item.token}`).join("; ") : "No forbidden markers found.",
    forbiddenMatches,
  );

  const staticGuard = options.contract ? guard.buildReport({ target, contract: options.contract }) : null;
  addCheck(
    checks,
    "contract-guard",
    "Static contract guard passes",
    !staticGuard || staticGuard.summary.ready,
    25,
    staticGuard ? `${staticGuard.summary.passed}/${staticGuard.summary.checks} guard checks passed.` : "No contract supplied.",
    staticGuard ? staticGuard.blockers : [],
  );

  const nodeChecks = nodeCheck(files);
  const failedNodeChecks = nodeChecks.filter((item) => !item.passed);
  addCheck(
    checks,
    "node-syntax",
    "Backend/script JavaScript passes node --check",
    failedNodeChecks.length === 0,
    15,
    failedNodeChecks.length ? failedNodeChecks.map((item) => `${item.command}: ${item.stderr || item.error}`).join("; ") : `${nodeChecks.length} files checked.`,
    failedNodeChecks,
  );

  const pkgDirs = packageDirs(target);
  const buildResults = [];
  if (options.install || options.build) {
    pkgDirs.forEach((dir) => {
      if (options.install) buildResults.push(runCommand("npm", ["install"], dir, { timeoutMs: 180000 }));
      if (options.build) {
        const pkg = readJson(path.join(dir, "package.json"));
        if (pkg.scripts && pkg.scripts.build) buildResults.push(runCommand("npm", ["run", "build"], dir, { timeoutMs: 180000 }));
      }
    });
  }
  const failedBuilds = buildResults.filter((item) => !item.passed);
  addCheck(
    checks,
    "package-build",
    "Package install/build checks pass when requested",
    buildResults.length > 0 ? failedBuilds.length === 0 : false,
    20,
    buildResults.length
      ? `${buildResults.length - failedBuilds.length}/${buildResults.length} package commands passed.`
      : "Package runtime checks were not requested.",
    failedBuilds,
  );

  let backendSmoke = { skipped: true, reason: "not-requested" };
  if (options.backendSmoke) {
    backendSmoke = await runBackendSmoke(discoverServerEntry(target), options.contract ? absolute(options.contract) : null);
  }
  const backendPassed = backendSmoke.skipped
    ? false
    : Array.isArray(backendSmoke.checks) && backendSmoke.checks.length > 0 && backendSmoke.checks.every((item) => item.ok);
  addCheck(
    checks,
    "backend-smoke",
    "Backend GET smoke checks pass when requested",
    backendPassed,
    15,
    backendSmoke.skipped
      ? `Backend smoke skipped: ${backendSmoke.reason}.`
      : backendSmoke.checks.map((item) => `${item.endpoint}: ${item.status || item.error}`).join("; "),
    backendSmoke,
  );

  const score = checks.reduce((sum, check) => sum + check.earned, 0);
  const maxScore = checks.reduce((sum, check) => sum + check.points, 0);
  const blockers = checks.filter((check) => !check.passed);
  const report = {
    reportVersion: REPORT_VERSION,
    target: relative(target),
    contract: options.contract || null,
    summary: {
      score,
      maxScore,
      ready: score >= 90 && blockers.length === 0,
      checks: checks.length,
      passed: checks.length - blockers.length,
      failed: blockers.length,
    },
    checks,
    blockers: blockers.map((item) => ({ id: item.id, label: item.label, detail: item.detail })),
  };

  if (options.write) writeReports(report, target);
  return report;
}

function writeReports(report, target) {
  const jsonPath = path.join(target, "qwen-runtime-evaluation-report.json");
  const mdPath = path.join(target, "qwen-runtime-evaluation-report.md");
  fs.writeFileSync(jsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdPath, markdownReport(report), "utf8");
}

function markdownReport(report) {
  const lines = [
    "# Qwen Runtime Evaluation Report",
    "",
    `- Target: \`${report.target}\``,
    `- Score: ${report.summary.score}/${report.summary.maxScore}`,
    `- Ready: ${report.summary.ready ? "yes" : "no"}`,
    "",
    "| Status | Check | Points | Detail |",
    "|---|---|---:|---|",
    ...report.checks.map((check) => `| ${check.status} | ${check.label} | ${check.earned}/${check.points} | ${String(check.detail).replace(/\|/g, "\\|")} |`),
  ];
  if (report.blockers.length) {
    lines.push("", "## Blockers", "");
    report.blockers.forEach((blocker) => lines.push(`- ${blocker.id}: ${blocker.detail}`));
  }
  return `${lines.join("\n")}\n`;
}

function parseArgs(argv) {
  const options = { target: DEFAULT_TARGET, contract: null, install: false, build: false, backendSmoke: false, write: false, summary: false };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--contract") {
      options.contract = argv[index + 1];
      index += 1;
    } else if (arg === "--install") options.install = true;
    else if (arg === "--build") options.build = true;
    else if (arg === "--backend-smoke") options.backendSmoke = true;
    else if (arg === "--runtime") {
      options.install = true;
      options.build = true;
      options.backendSmoke = true;
    } else if (arg === "--write") options.write = true;
    else if (arg === "--summary") options.summary = true;
    else if (!arg.startsWith("--")) options.target = arg;
  }
  return options;
}

async function run(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  const report = await evaluate(options);
  const payload = options.summary ? report.summary : report;
  process.stdout.write(`${JSON.stringify(payload, null, 2)}\n`);
  return report;
}

if (require.main === module) {
  run().catch((err) => {
    process.stderr.write(`${err.stack || err.message}\n`);
    process.exitCode = 1;
  });
}

module.exports = {
  discoverServerEntry,
  evaluate,
  nodeCheck,
  parseArgs,
  run,
  scanForbidden,
};
