#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SOURCE_FILE = path.join(ROOT, "app.js");
const JSON_PATH = path.join(ROOT, "DOM_STORAGE_TRUST_BOUNDARY_REPORT.json");
const MD_PATH = path.join(ROOT, "DOM_STORAGE_TRUST_BOUNDARY_REPORT.md");
const REPORT_DATE = new Date().toISOString().slice(0, 10);

const SOURCE_TRUST_RULE = "Trust boundary is explicit only when owner + data origin + sanitization are documented.";

const DYNAMIC_TOKEN_RE = /\$\{|`\s*\$|\b(render|items|list|rows|state|concept|lesson|quiz|scores|proficiency|answered|feedback|mistake|storage|settings|prefs?|view|mode|target|answer|question|teacher|student|community|progress|achievement|reward|museum|exam)\b/;
const SAFE_HTML_TOKEN_RE = /\b(esc|safeText|sanitizeHTML|sanitize|DOMPurify|textContent|textContent\s*=|innerText|insertAdjacentHTML)\b/;
const STATIC_TEMPLATE_RE = /^\s*["'`][\s\S]*["'`]\s*$/;

function readSource() {
  return fs.readFileSync(SOURCE_FILE, "utf8");
}

function readLines() {
  return readSource().split(/\n/);
}

function findFunctionOwner(lines, lineIndex) {
  for (let i = lineIndex; i >= 0; i--) {
    const line = lines[i];

    const asyncFunctionMatch = line.match(/^\s*(?:export\s+)?async\s+function\s+([A-Za-z_$][\w$]*)\s*\(/);
    if (asyncFunctionMatch) return asyncFunctionMatch[1];

    const functionMatch = line.match(/^\s*function\s+([A-Za-z_$][\w$]*)\s*\(/);
    if (functionMatch) return functionMatch[1];

    const functionAssignedMatch = line.match(
      /^\s*(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s*)?(?:function\s*)?\([^)]*\)\s*=>/,
    );
    if (functionAssignedMatch) return functionAssignedMatch[1];

    const functionVarMatch = line.match(
      /^\s*(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s*)?function\b/,
    );
    if (functionVarMatch) return functionVarMatch[1];

    const objectMethodMatch = line.match(/^\s*([A-Za-z_$][\w$]*)\s*:\s*(?:async\s*)?\(?/);
    if (objectMethodMatch && line.includes("{")) return objectMethodMatch[1];
  }

  return "global";
}

function captureStatement(lines, startLineIndex, startCol = 0) {
  const statementLines = [];
  let parenDepth = 0;
  let inSingle = false;
  let inDouble = false;
  let inBacktick = false;
  let escape = false;
  let terminated = false;
  for (let i = startLineIndex; i < lines.length && statementLines.length < 20; i++) {
    const text = i === startLineIndex ? lines[i].slice(startCol) : lines[i];
    statementLines.push(text);
    for (let ch of text) {
      if (escape) {
        escape = false;
        continue;
      }
      if (ch === "\\") {
        escape = true;
        continue;
      }
      if (!inDouble && !inBacktick && ch === "'") {
        inSingle = !inSingle;
        continue;
      }
      if (!inSingle && !inBacktick && ch === '"') {
        inDouble = !inDouble;
        continue;
      }
      if (!inSingle && !inDouble && ch === "`") {
        inBacktick = !inBacktick;
        continue;
      }
      if (inSingle || inDouble || inBacktick) continue;
      if (ch === "(") parenDepth++;
      if (ch === ")") parenDepth = Math.max(0, parenDepth - 1);
    }
    if (!inSingle && !inDouble && !inBacktick && parenDepth === 0 && text.includes(";")) {
      terminated = true;
      break;
    }
    if (text.includes(";") && !inSingle && !inDouble && !inBacktick && parenDepth === 0) {
      terminated = true;
      break;
    }
  }
  return { snippet: statementLines.join("\n").trim(), endLine: startLineIndex + statementLines.length - 1, terminated };
}

function inferSanitizer(snippet) {
  if (/\btextContent\b/.test(snippet) || /\binnerText\b/.test(snippet)) return "textContent";
  if (/\b(esc|safeText|sanitizeHTML|sanitize|DOMPurify|fallbackSanitizeHTML|sanitizeHTMLDOM|LUMEN_SANITIZE_HTML)\b/.test(snippet)) return "esc / sanitizer helper";
  if (/render[A-Z][A-Za-z0-9_]*\(/.test(snippet)) return "render helper output (allowlist required)";
  return "raw HTML expression (manual review required)";
}

function inferDataOrigin(snippet) {
  if (STATIC_TEMPLATE_RE.test(snippet) && !/\$\{/.test(snippet)) return "static template";
  if (DYNAMIC_TOKEN_RE.test(snippet)) return "state-derived";
  if (/\+\s*[A-Za-z_$][\w$]*|`[^`]*\$\{/.test(snippet)) return "state-derived";
  return "data-origin uncertain";
}

function isSinkSafe(snippet) {
  const sanitizer = inferSanitizer(snippet);
  return (
    sanitizer !== "raw HTML expression (manual review required)" &&
    !/raw HTML expression/.test(sanitizer) &&
    SAFE_HTML_TOKEN_RE.test(snippet)
  );
}

function buildSinkRows(lines) {
  const rows = [];
  const domSinkLines = [];
  const storageSinkLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/\.\s*innerHTML\s*=/.test(line)) {
      const { snippet, endLine } = captureStatement(lines, i);
      const owner = findFunctionOwner(lines, i);
      const sanitizer = inferSanitizer(snippet);
      const dataOrigin = inferDataOrigin(snippet);
      const safe = isSinkSafe(snippet);
      domSinkLines.push({
        id: `dom-${i + 1}`,
        type: "innerHTML",
        line: i + 1,
        endLine: endLine + 1,
        owner,
        snippet: snippet.replace(/\n+/g, " ").slice(0, 280),
        dataOrigin,
        sanitizerMethod: sanitizer,
        safe,
        reviewAction: safe ? "approved-heuristic" : "required-allowlist-review",
        boundary: "DOM trust boundary",
      });
    }

    if (line.includes("insertAdjacentHTML(")) {
      const { snippet, endLine } = captureStatement(lines, i);
      const owner = findFunctionOwner(lines, i);
      const sanitizer = inferSanitizer(snippet);
      const dataOrigin = inferDataOrigin(snippet);
      const safe = isSinkSafe(snippet);
      domSinkLines.push({
        id: `dom-${i + 1}`,
        type: "insertAdjacentHTML",
        line: i + 1,
        endLine: endLine + 1,
        owner,
        snippet: snippet.replace(/\n+/g, " ").slice(0, 280),
        dataOrigin,
        sanitizerMethod: sanitizer,
        safe,
        reviewAction: safe ? "approved-heuristic" : "required-allowlist-review",
        boundary: "DOM trust boundary",
      });
    }

    if (line.includes("document.write(")) {
      const { snippet, endLine } = captureStatement(lines, i);
      const owner = findFunctionOwner(lines, i);
      const sanitizer = inferSanitizer(snippet);
      const dataOrigin = inferDataOrigin(snippet);
      const safe = isSinkSafe(snippet);
      domSinkLines.push({
        id: `dom-${i + 1}`,
        type: "document.write",
        line: i + 1,
        endLine: endLine + 1,
        owner,
        snippet: snippet.replace(/\n+/g, " ").slice(0, 280),
        dataOrigin,
        sanitizerMethod: sanitizer,
        safe,
        reviewAction: safe ? "approved-heuristic" : "required-allowlist-review",
        boundary: "DOM trust boundary",
      });
    }

    if (/\b(localStorage|sessionStorage)\b/.test(line) && /\.(setItem|getItem|removeItem|clear)\s*\(/.test(line)) {
      const { snippet, endLine } = captureStatement(lines, i);
      const keyMatch = snippet.match(/\b(?:localStorage|sessionStorage)\.(?:setItem|getItem|removeItem)\(\s*([^,]+)\s*(?:,|\\))/);
      const keyExpr = keyMatch ? keyMatch[1].trim() : "";
      const storageType = snippet.includes("localStorage") ? "localStorage" : "sessionStorage";
      const owner = findFunctionOwner(lines, i);

      let storageDomain = "feature-state";
      if (/SCORE|PROFICIENCY|ANSWERED|QUESTIONS|KM|VM|MISTAKE|CONFUS|WEAK|PROOF|SCOR|LEVEL/.test(keyExpr)) storageDomain = "learning-progress";
      else if (/THEME|MODE|TOGGLE|COLLAPSE|PREFERENCE|PREF|TOUR|OPEN/.test(keyExpr)) storageDomain = "ui-settings";
      else if (/REFLECT|A11Y|XP|COIN|REWARD|ACHIEV|PROOF|HINT|STORE|PURCHASE|EXAM/.test(keyExpr)) storageDomain = "feature-state";

      storageSinkLines.push({
        id: `${storageType}-${i + 1}`,
        type: `${storageType}.${snippet.match(/\\.(setItem|getItem|removeItem|clear)\\s*\\(/)?.[1] || "access"}`,
        line: i + 1,
        endLine: endLine + 1,
        owner,
        key: keyExpr,
        storageDomain,
        policy: "progress/evidence/feature state stored locally; cannot be used as authoritative backend score proof",
        boundary: "localStorage/sessionStorage trust boundary",
      });
    }
  }

  return { domSinkLines, storageSinkLines };
}

function buildReport() {
  const lines = readLines();
  const { domSinkLines, storageSinkLines } = buildSinkRows(lines);

  const domSummary = {
    innerHTML: domSinkLines.filter((row) => row.type === "innerHTML").length,
    insertAdjacentHTML: domSinkLines.filter((row) => row.type === "insertAdjacentHTML").length,
    documentWrite: domSinkLines.filter((row) => row.type === "document.write").length,
    total: domSinkLines.length,
    reviewedSafe: domSinkLines.filter((row) => row.safe).length,
    requiresReview: domSinkLines.filter((row) => !row.safe).length,
    dynamicOriginCount: domSinkLines.filter((row) => row.dataOrigin === "state-derived").length,
    staticTemplateCount: domSinkLines.filter((row) => row.dataOrigin === "static template").length,
  };

  const storageSummary = {
    localStorage: storageSinkLines.filter((row) => row.type.startsWith("localStorage")).length,
    sessionStorage: storageSinkLines.filter((row) => row.type.startsWith("sessionStorage")).length,
    total: storageSinkLines.length,
    learningProgress: storageSinkLines.filter((row) => row.storageDomain === "learning-progress").length,
    uiSettings: storageSinkLines.filter((row) => row.storageDomain === "ui-settings").length,
    featureState: storageSinkLines.filter((row) => row.storageDomain === "feature-state").length,
  };

  const highRiskDom = domSinkLines
    .filter((row) => row.reviewAction === "required-allowlist-review")
    .slice(0, 80);

  const highRiskStorage = storageSinkLines.slice(0, 40);

  return {
    reportVersion: "dom-storage-trust-boundary-audit-v1",
    date: REPORT_DATE,
    source: "app.js",
    policy: SOURCE_TRUST_RULE,
    summary: {
      dom: domSummary,
      storage: storageSummary,
      ready: highRiskDom.length === 0 && domSummary.requiresReview === 0,
      note: "Local progress/evidence claims remain non-authoritative until backend-auth proof is available.",
    },
    domSinks: domSinkLines,
    storageSinks: storageSinkLines,
    highRisk: {
      dom: highRiskDom,
      storage: highRiskStorage,
    },
  };
}

function toMarkdown(report) {
  const lines = [];
  lines.push("# DOM + Storage Trust Boundary Audit");
  lines.push("");
  lines.push(`- Date: ${report.date}`);
  lines.push(`- Target: app.js`);
  lines.push(`- Report Version: ${report.reportVersion}`);
  lines.push("");
  lines.push("## Summary");
  lines.push("");
  lines.push(`- DOM sinks: ${report.summary.dom.total} total (innerHTML ${report.summary.dom.innerHTML}, insertAdjacentHTML ${report.summary.dom.insertAdjacentHTML}, document.write ${report.summary.dom.documentWrite})`);
  lines.push(`- DOM review status: ${report.summary.dom.reviewedSafe} safe / ${report.summary.dom.requiresReview} requires review`);
  lines.push(`- Storage calls: ${report.summary.storage.total} total (${report.summary.storage.localStorage} localStorage, ${report.summary.storage.sessionStorage} sessionStorage)`);
  lines.push(`- Trust-ready: ${report.summary.ready ? "Yes" : "No"}`);
  lines.push(`- Policy: ${report.policy}`);
  lines.push("");
  lines.push("## Data Origin Distribution");
  lines.push("");
  lines.push(`- state-derived DOM writes: ${report.summary.dom.dynamicOriginCount}`);
  lines.push(`- static template DOM writes: ${report.summary.dom.staticTemplateCount}`);
  lines.push(`- storage domains: ${report.summary.storage.learningProgress} learning-progress, ${report.summary.storage.uiSettings} ui-settings, ${report.summary.storage.featureState} feature-state`);
  lines.push("");
  lines.push("## Top DOM Sinks Requiring Allowlist");
  lines.push("");
  if (report.highRisk.dom.length) {
    lines.push("| Owner | Type | Line | Data Origin | Sanitizer | Review |");
    lines.push("|---|---|---|---|---|---|");
    report.highRisk.dom.forEach((row) => {
      lines.push(
        `| ${row.owner} | ${row.type} | ${row.line} | ${row.dataOrigin} | ${row.sanitizerMethod} | ${row.reviewAction} |`,
      );
    });
  } else {
    lines.push("- None");
  }
  lines.push("");
  lines.push("## Storage Trust Boundary");
  lines.push("");
  if (report.highRisk.storage.length) {
    lines.push("| Owner | Storage | Line | Key | Domain |");
    lines.push("|---|---|---|---|---|");
    report.highRisk.storage.forEach((row) => {
      lines.push(`| ${row.owner} | ${row.type} | ${row.line} | ${row.key || "unknown"} | ${row.storageDomain} |`);
    });
  } else {
    lines.push("- None");
  }
  return `${lines.join("\n")}\n`;
}

function run(argv = process.argv.slice(2)) {
  const report = buildReport();
  if (argv.includes("--write")) {
    fs.writeFileSync(JSON_PATH, `${JSON.stringify(report, null, 2)}\n`);
    fs.writeFileSync(MD_PATH, toMarkdown(report));
  }
  if (argv.includes("--json")) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  } else if (argv.includes("--summary")) {
    process.stdout.write(`${JSON.stringify(report.summary, null, 2)}\n`);
  } else {
    process.stdout.write(toMarkdown(report));
  }

  if (argv.includes("--strict") && !report.summary.ready) {
    process.exitCode = 1;
  }
  return report;
}

if (require.main === module) run();

module.exports = { buildReport, toMarkdown, run };
