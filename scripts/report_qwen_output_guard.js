#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const REPORT_VERSION = "qwen-output-guard-v1";
const DEFAULT_TARGET = "output/qwen-coder-next/latest";
const FALLBACK_TARGET = "output/qwen-coder-next/day-07";
const SKIP_DIRS = new Set([".git", "node_modules", "dist", "build", "coverage", "test-results", ".vite"]);
const SKIP_FILES = new Set([
  "metadata.json",
  "ollama-stderr.txt",
  "prompt.md",
  "qwen-materialization-report.json",
  "qwen-materialization-report.md",
  "qwen-output-guard-report.json",
  "qwen-output-guard-report.md",
  "qwen-runtime-evaluation-report.json",
  "qwen-runtime-evaluation-report.md",
  "scorecard.json",
  "scorecard.md",
]);
const SCANNED_EXTENSIONS = /\.(js|mjs|cjs|jsx|ts|tsx|json|md|html|css|env)$/i;
const RANDOM_TOKEN = ["Math", "random"].join(".");

const FORBIDDEN_PATTERNS = Object.freeze([
  { id: "fake-data", label: "Fake data marker", regex: /\bfake\s+data\b/i },
  { id: "demo-data", label: "Demo data marker", regex: /\bdemo\s+(data|user|users|item|items|record|records)\b/i },
  { id: "sample-data", label: "Sample data marker", regex: /\bsample\s+(data|user|users|item|items|record|records)\b/i },
  { id: "mock-data", label: "Mock data marker", regex: /\bmock\s+(data|user|users|item|items|record|records)\b/i },
  { id: "placeholder-data", label: "Placeholder marker", regex: /\bplaceholder\s+(data|user|users|item|items|record|records)?\b/i },
  { id: "lorem", label: "Lorem ipsum marker", regex: /lorem\s+ipsum/i },
  { id: "john-doe", label: "Invented person marker", regex: /\b(john|jane)\s+doe\b/i },
  { id: "example-domain", label: "Placeholder domain marker", regex: /\bexample\.(com|org|net)\b/i },
  { id: "todo-replace", label: "Unresolved replacement marker", regex: /\bTODO\s*:?|replace\s+me\b/i },
]);

function resolveWithinRoot(value) {
  if (!value) {
    const defaultPath = path.join(ROOT, DEFAULT_TARGET);
    if (fs.existsSync(defaultPath)) return defaultPath;
    const fallbackPath = path.join(ROOT, FALLBACK_TARGET);
    if (fs.existsSync(fallbackPath)) return fallbackPath;
    return defaultPath;
  }
  return path.isAbsolute(value) ? value : path.join(ROOT, value);
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
    if (SCANNED_EXTENSIONS.test(entry)) output.push(entry);
    return output;
  }
  if (!stat.isDirectory()) return output;
  fs.readdirSync(entry, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((dirent) => {
      if (dirent.name.startsWith(".") || SKIP_DIRS.has(dirent.name)) return;
      if (dirent.isFile() && SKIP_FILES.has(dirent.name)) return;
      listFiles(path.join(entry, dirent.name), output);
    });
  return output;
}

function extractMarkdownCode(text) {
  const blocks = [...text.matchAll(/```[^\n]*\n([\s\S]*?)```/g)];
  return blocks.map((match) => match[1]).join("\n\n");
}

function scanUnits(files) {
  return files.map((file) => {
    const raw = fs.readFileSync(file, "utf8");
    const text = file.toLowerCase().endsWith(".md") ? extractMarkdownCode(raw) : raw;
    return { file, text };
  });
}

function lineMatches(unit, predicate) {
  return unit.text
    .split(/\r?\n/)
    .map((line, index) => ({ line, number: index + 1 }))
    .filter(({ line }) => predicate(line))
    .map(({ line, number }) => ({ file: relative(unit.file), line: number, text: line.trim().slice(0, 180) }));
}

function textBundle(units) {
  return units.map((unit) => unit.text).join("\n");
}

function addCheck(checks, id, label, passed, detail, evidence = []) {
  checks.push({
    id,
    label,
    status: passed ? "pass" : "fail",
    passed: Boolean(passed),
    detail,
    evidence,
  });
}

function extractRouteDefinitions(units) {
  const routeRegex = /\b(app|router)\s*\.\s*(get|post|put|delete|patch)\s*\(\s*["'`]([^"'`]+)["'`]/g;
  const useRegex = /\bapp\s*\.\s*use\s*\(\s*["'`]([^"'`]+)["'`]/g;
  const routes = [];
  const prefixes = new Set();

  units.forEach((unit) => {
    const text = unit.text;
    let match;
    while ((match = routeRegex.exec(text))) {
      routes.push({ owner: match[1], method: match[2].toUpperCase(), path: match[3], file: relative(unit.file) });
    }
    while ((match = useRegex.exec(text))) {
      prefixes.add(match[1]);
    }
  });

  return { routes, prefixes: Array.from(prefixes).sort() };
}

function routeExists(routeInfo, endpoint) {
  const [method, endpointPath] = endpoint.split(/\s+/, 2);
  if (!method || !endpointPath) return false;
  if (routeInfo.routes.some((route) => route.method === method && route.path === endpointPath)) return true;

  return routeInfo.prefixes.some((prefix) => {
    if (!endpointPath.startsWith(prefix)) return false;
    const suffix = endpointPath.slice(prefix.length) || "/";
    return routeInfo.routes.some((route) => route.owner === "router" && route.method === method && route.path === suffix);
  });
}

function inventedApiRoutes(routeInfo, allowedEndpoints = []) {
  const allowed = new Set(allowedEndpoints);
  const fullRoutes = [];
  routeInfo.routes.forEach((route) => {
    if (route.owner === "app") {
      fullRoutes.push(`${route.method} ${route.path}`);
      return;
    }
    if (route.path.startsWith("/api")) {
      fullRoutes.push(`${route.method} ${route.path}`);
      return;
    }
    routeInfo.prefixes.forEach((prefix) => {
      if (!prefix.startsWith("/api")) return;
      const suffix = route.path === "/" ? "" : route.path;
      fullRoutes.push(`${route.method} ${prefix}${suffix}`);
    });
  });
  return Array.from(new Set(fullRoutes))
    .filter((endpoint) => !allowed.has(endpoint))
    .sort();
}

function formatMatches(matches) {
  return matches.map((item) => `${item.file}:${item.line}`).join(", ");
}

function markdownReport(report) {
  const lines = [
    "# Qwen Output Guard Report",
    "",
    `- Target: \`${report.target}\``,
    `- Contract: \`${report.contract || "none"}\``,
    `- Ready: ${report.summary.ready ? "yes" : "no"}`,
    `- Checks: ${report.summary.passed}/${report.summary.checks} passed`,
    "",
    "## Checks",
    "",
    "| Status | Check | Detail |",
    "|---|---|---|",
    ...report.checks.map((check) => `| ${check.status} | ${check.label} | ${String(check.detail).replace(/\|/g, "\\|")} |`),
  ];

  if (report.blockers.length) {
    lines.push("", "## Blockers", "");
    report.blockers.forEach((blocker) => {
      lines.push(`- ${blocker.id}: ${blocker.detail}`);
    });
  }

  return `${lines.join("\n")}\n`;
}

function writeReport(report, targetPath) {
  const stat = fs.existsSync(targetPath) ? fs.statSync(targetPath) : null;
  const outputDir = stat && stat.isDirectory() ? targetPath : path.dirname(targetPath);
  fs.mkdirSync(outputDir, { recursive: true });
  const jsonPath = path.join(outputDir, "qwen-output-guard-report.json");
  const mdPath = path.join(outputDir, "qwen-output-guard-report.md");
  fs.writeFileSync(jsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdPath, markdownReport(report), "utf8");
  return { jsonPath: relative(jsonPath), mdPath: relative(mdPath) };
}

function buildReport(options = {}) {
  const target = resolveWithinRoot(options.target);
  const contractPath = options.contract ? resolveWithinRoot(options.contract) : null;
  const contract = contractPath && fs.existsSync(contractPath) ? readJson(contractPath) : null;
  const checks = [];

  const targetExists = fs.existsSync(target);
  addCheck(
    checks,
    "target-exists",
    "Qwen output target exists",
    targetExists,
    targetExists ? `Scanning ${relative(target)}.` : `Missing target: ${relative(target)}.`,
    [relative(target)],
  );

  const files = targetExists ? listFiles(target) : [];
  const units = scanUnits(files);
  const bundle = textBundle(units);
  addCheck(
    checks,
    "scannable-files",
    "Qwen output has scannable files",
    files.length > 0,
    files.length ? `${files.length} files scanned.` : "No scannable files found.",
    files.map(relative),
  );

  const randomMatches = units.flatMap((unit) => lineMatches(unit, (line) => line.includes(RANDOM_TOKEN)));
  addCheck(
    checks,
    "no-native-random-api",
    "Generated output does not use native random API",
    randomMatches.length === 0,
    randomMatches.length ? formatMatches(randomMatches) : "No native random API token found.",
    randomMatches,
  );

  const forbiddenMatches = FORBIDDEN_PATTERNS.flatMap((pattern) =>
    units.flatMap((unit) =>
      lineMatches(unit, (line) => pattern.regex.test(line)).map((match) => ({ ...match, pattern: pattern.id })),
    ),
  );
  addCheck(
    checks,
    "no-placeholder-or-fabricated-data",
    "Generated output does not contain placeholder or fabricated data markers",
    forbiddenMatches.length === 0,
    forbiddenMatches.length ? formatMatches(forbiddenMatches) : "No placeholder/fabricated data markers found.",
    forbiddenMatches,
  );

  if (contract) {
    const routeInfo = extractRouteDefinitions(units);
    const missingEndpoints = (contract.allowedEndpoints || []).filter((endpoint) => !routeExists(routeInfo, endpoint));
    addCheck(
      checks,
      "contract-required-endpoints",
      "All contract endpoints are implemented",
      missingEndpoints.length === 0,
      missingEndpoints.length ? `Missing: ${missingEndpoints.join(", ")}` : "All contract endpoints found.",
      missingEndpoints,
    );

    const inventedEndpoints = inventedApiRoutes(routeInfo, contract.allowedEndpoints || []);
    addCheck(
      checks,
      "contract-no-invented-endpoints",
      "No generated API endpoint exists outside the contract",
      inventedEndpoints.length === 0,
      inventedEndpoints.length ? `Unexpected: ${inventedEndpoints.join(", ")}` : "No unexpected API endpoints found.",
      inventedEndpoints,
    );

    const missingTokens = (contract.requiredTokens || []).filter((token) => !bundle.includes(token));
    addCheck(
      checks,
      "contract-required-stack-tokens",
      "Required stack tokens are present",
      missingTokens.length === 0,
      missingTokens.length ? `Missing: ${missingTokens.join(", ")}` : "Required stack tokens found.",
      missingTokens,
    );

    const missingValidationTerms = (contract.requiredValidationTerms || []).filter((token) => !bundle.includes(token));
    addCheck(
      checks,
      "contract-required-validation-terms",
      "Required validation terms are present",
      missingValidationTerms.length === 0,
      missingValidationTerms.length ? `Missing: ${missingValidationTerms.join(", ")}` : "Required validation terms found.",
      missingValidationTerms,
    );

    const missingStatusCodes = (contract.requiredStatusCodes || []).filter((status) => {
      const token = String(status);
      return !bundle.includes(`status(${token}`) && !bundle.includes(`status: ${token}`) && !bundle.includes(`status:${token}`);
    });
    addCheck(
      checks,
      "contract-required-status-codes",
      "Required status codes are present",
      missingStatusCodes.length === 0,
      missingStatusCodes.length ? `Missing: ${missingStatusCodes.join(", ")}` : "Required status codes found.",
      missingStatusCodes,
    );

    const missingJsTokens = (contract.requiredJsTokens || []).filter((token) => !bundle.includes(token));
    addCheck(
      checks,
      "contract-required-js-tokens",
      "Required JavaScript assessment tokens are present",
      missingJsTokens.length === 0,
      missingJsTokens.length ? `Missing: ${missingJsTokens.join(", ")}` : "Required JavaScript assessment tokens found.",
      missingJsTokens,
    );

    const missingTsTokens = (contract.requiredTsTokens || []).filter((token) => !bundle.includes(token));
    addCheck(
      checks,
      "contract-required-ts-tokens",
      "Required TypeScript assessment tokens are present",
      missingTsTokens.length === 0,
      missingTsTokens.length ? `Missing: ${missingTsTokens.join(", ")}` : "Required TypeScript assessment tokens found.",
      missingTsTokens,
    );
  } else {
    addCheck(
      checks,
      "contract-loaded",
      "Optional contract loaded",
      !contractPath,
      contractPath ? `Contract not found: ${relative(contractPath)}.` : "No contract supplied; contract checks skipped.",
      contractPath ? [relative(contractPath)] : [],
    );
  }

  const blockers = checks.filter((check) => !check.passed);
  return {
    reportVersion: REPORT_VERSION,
    target: relative(target),
    contract: contractPath ? relative(contractPath) : null,
    summary: {
      checks: checks.length,
      passed: checks.length - blockers.length,
      failed: blockers.length,
      ready: blockers.length === 0,
    },
    checks,
    blockers: blockers.map((check) => ({ id: check.id, label: check.label, detail: check.detail })),
  };
}

function parseArgs(argv) {
  const options = { target: null, contract: null, strict: false, summary: false, write: false };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--strict") options.strict = true;
    else if (arg === "--summary") options.summary = true;
    else if (arg === "--write") options.write = true;
    else if (arg === "--contract") {
      options.contract = argv[index + 1];
      index += 1;
    } else if (!arg.startsWith("--") && !options.target) {
      options.target = arg;
    }
  }
  return options;
}

function run(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  const report = buildReport(options);
  if (options.write) {
    report.written = writeReport(report, resolveWithinRoot(options.target));
  }
  const payload = options.summary ? report.summary : report;
  process.stdout.write(`${JSON.stringify(payload, null, 2)}\n`);
  if (options.strict && !report.summary.ready) process.exitCode = 1;
  return report;
}

if (require.main === module) run();

module.exports = { buildReport, markdownReport, run, writeReport };
