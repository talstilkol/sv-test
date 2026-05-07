#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SOURCE_FILES = Object.freeze([
  { label: "app.js", path: path.join(ROOT, "app.js"), criticalExamSurface: false },
  { label: "src/views/homework-exam-mode-view.js", path: path.join(ROOT, "src/views/homework-exam-mode-view.js"), criticalExamSurface: true },
]);
const JSON_PATH = path.join(ROOT, "DOM_STORAGE_TRUST_BOUNDARY_REPORT.json");
const MD_PATH = path.join(ROOT, "DOM_STORAGE_TRUST_BOUNDARY_REPORT.md");
const REPORT_DATE = new Date().toISOString().slice(0, 10);

const SOURCE_TRUST_RULE = "Trust boundary is explicit only when owner + data origin + sanitization are documented.";

const DYNAMIC_TOKEN_RE = /\$\{|`\s*\$|\b(render|items|list|rows|state|concept|lesson|quiz|scores|proficiency|answered|feedback|mistake|storage|settings|prefs?|view|mode|target|answer|question|teacher|student|community|progress|achievement|reward|museum|exam)\b/;
const SAFE_HTML_TOKEN_RE = /\b(esc|safeText|sanitizeHTML|sanitizeHtml|sanitize[A-Za-z0-9_]*|DOMPurify|textContent|textContent\s*=|innerText|insertAdjacentHTML)\b/;
const STATIC_TEMPLATE_RE = /^\s*["'`][\s\S]*["'`]\s*$/;

function isStaticHtmlAssignment(snippet) {
  const rhsMatch = String(snippet || "").match(/(?:innerHTML|insertAdjacentHTML\([^,]+,)\s*=\s*([\s\S]+?);?$/);
  const rhs = rhsMatch ? rhsMatch[1].trim() : "";
  if (!rhs) return false;
  if (rhs === '""' || rhs === "''" || rhs === "``") return true;
  if (!STATIC_TEMPLATE_RE.test(rhs)) return false;
  return !/\$\{|\+\s*[A-Za-z_$]|[A-Za-z_$][\w$]*\s*\+/.test(rhs);
}

function approvedAllowlistReason(snippet, owner) {
  const text = String(snippet || "");
  if (isStaticHtmlAssignment(text)) return "static literal / clear";
  if (owner === "renderContextTree" && /\b(?:treeHtml|sidebarTreeHtml)\b/.test(text)) {
    return "allowlisted renderContextNode output; renderContextNode escapes labels, meta and action ids";
  }
  if (text.includes("site-map-section") && text.includes("tabItems") && text.includes("lessonItems")) {
    return "allowlisted site map renderer; tab and lesson labels are escaped before interpolation";
  }
  if (owner === "setPortalDecisionAid" && text.includes("renderPortalDecisionAid")) {
    return "allowlisted portal decision aid renderer; static data file plus esc in rows and comparisons";
  }
  if (
    owner === "openExamQuestionIdeWindow" &&
    text.includes("popup.document.documentElement.innerHTML") &&
    text.includes("html.replace(/^<!doctype html>/i")
  ) {
    return "allowlisted Exam100 IDE popout shell; dynamic labels use esc and embedded fragments come from the already-rendered Exam100 DOM";
  }
  if (owner === "renderReflectionHistory" && text.includes("reflect-history-empty")) {
    return "allowlisted static empty-state message (no user HTML interpolation)";
  }
  if (owner === "sendAIMessage" && text.includes("ai-msg-system") && text.includes("AI_DAILY_LIMIT")) {
    return "allowlisted bounded system banner using numeric daily limit only";
  }
  return "";
}

function readSource() {
  return fs.readFileSync(SOURCE_FILES[0].path, "utf8");
}

function readLines(sourceFile = SOURCE_FILES[0]) {
  return fs.readFileSync(sourceFile.path, "utf8").split(/\n/);
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
  const allowlistReason = approvedAllowlistReason(snippet, "");
  if (allowlistReason) return allowlistReason;
  if (/\btextContent\b/.test(snippet) || /\binnerText\b/.test(snippet)) return "textContent";
  if (/\b(esc|safeText|sanitizeHTML|sanitizeHtml|sanitize[A-Za-z0-9_]*|DOMPurify|fallbackSanitizeHTML|sanitizeHTMLDOM|LUMEN_SANITIZE_HTML)\b/.test(snippet)) return "esc / sanitizer helper";
  if (/render[A-Z][A-Za-z0-9_]*\(/.test(snippet)) return "render helper output (allowlist required)";
  return "raw HTML expression (manual review required)";
}

function inferDataOrigin(snippet) {
  if (isStaticHtmlAssignment(snippet)) return "static template";
  if (STATIC_TEMPLATE_RE.test(snippet) && !/\$\{/.test(snippet)) return "static template";
  if (DYNAMIC_TOKEN_RE.test(snippet)) return "state-derived";
  if (/\+\s*[A-Za-z_$][\w$]*|`[^`]*\$\{/.test(snippet)) return "state-derived";
  return "data-origin uncertain";
}

function isSinkSafe(snippet, owner = "") {
  const allowlistReason = approvedAllowlistReason(snippet, owner);
  if (allowlistReason) return true;
  const sanitizer = inferSanitizer(snippet);
  return (
    sanitizer !== "raw HTML expression (manual review required)" &&
    !/raw HTML expression/.test(sanitizer) &&
    SAFE_HTML_TOKEN_RE.test(snippet)
  );
}

function parseStorageCall(snippet) {
  const directMatch = snippet.match(
    /\b(localStorage|sessionStorage)\s*\.\s*(setItem|getItem|removeItem|clear)\s*\(\s*([^,\)]*)/,
  );
  if (directMatch) {
    return {
      storageType: directMatch[1],
      method: directMatch[2],
      keyExpr: directMatch[2] === "clear" ? "" : (directMatch[3] || "").trim(),
    };
  }

  const boundCallMatch = snippet.match(
    /\.(setItem|getItem|removeItem|clear)\s*\.call\s*\(\s*(localStorage|sessionStorage)\s*(?:,\s*([^,\)]*))?/,
  );
  if (boundCallMatch) {
    return {
      storageType: boundCallMatch[2],
      method: boundCallMatch[1],
      keyExpr: boundCallMatch[1] === "clear" ? "" : (boundCallMatch[3] || "").trim(),
    };
  }

  const storageType = snippet.includes("sessionStorage") ? "sessionStorage" : "localStorage";
  return { storageType, method: "access", keyExpr: "" };
}

function buildSinkRows(lines, sourceFile = SOURCE_FILES[0]) {
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
      const safe = isSinkSafe(snippet, owner);
      const allowlistReason = approvedAllowlistReason(snippet, owner);
      domSinkLines.push({
        id: `dom-${i + 1}`,
        file: sourceFile.label,
        criticalExamSurface: !!sourceFile.criticalExamSurface,
        type: "innerHTML",
        line: i + 1,
        endLine: endLine + 1,
        owner,
        snippet: snippet.replace(/\n+/g, " ").slice(0, 280),
        dataOrigin,
        sanitizerMethod: allowlistReason || sanitizer,
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
      const safe = isSinkSafe(snippet, owner);
      const allowlistReason = approvedAllowlistReason(snippet, owner);
      domSinkLines.push({
        id: `dom-${i + 1}`,
        file: sourceFile.label,
        criticalExamSurface: !!sourceFile.criticalExamSurface,
        type: "insertAdjacentHTML",
        line: i + 1,
        endLine: endLine + 1,
        owner,
        snippet: snippet.replace(/\n+/g, " ").slice(0, 280),
        dataOrigin,
        sanitizerMethod: allowlistReason || sanitizer,
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
      const safe = isSinkSafe(snippet, owner);
      const allowlistReason = approvedAllowlistReason(snippet, owner);
      domSinkLines.push({
        id: `dom-${i + 1}`,
        file: sourceFile.label,
        criticalExamSurface: !!sourceFile.criticalExamSurface,
        type: "document.write",
        line: i + 1,
        endLine: endLine + 1,
        owner,
        snippet: snippet.replace(/\n+/g, " ").slice(0, 280),
        dataOrigin,
        sanitizerMethod: allowlistReason || sanitizer,
        safe,
        reviewAction: safe ? "approved-heuristic" : "required-allowlist-review",
        boundary: "DOM trust boundary",
      });
    }

    if (/\b(localStorage|sessionStorage)\b/.test(line) && /\.(setItem|getItem|removeItem|clear)\s*\(/.test(line)) {
      const { snippet, endLine } = captureStatement(lines, i);
      const { storageType, method, keyExpr } = parseStorageCall(snippet);
      const owner = findFunctionOwner(lines, i);

      let storageDomain = "feature-state";
      if (/SCORE|PROFICIENCY|ANSWERED|QUESTIONS|KM|VM|MISTAKE|CONFUS|WEAK|PROOF|SCOR|LEVEL/.test(keyExpr)) storageDomain = "learning-progress";
      else if (/THEME|MODE|TOGGLE|COLLAPSE|PREFERENCE|PREF|TOUR|OPEN/.test(keyExpr)) storageDomain = "ui-settings";
      else if (/REFLECT|A11Y|XP|COIN|REWARD|ACHIEV|PROOF|HINT|STORE|PURCHASE|EXAM/.test(keyExpr)) storageDomain = "feature-state";

      storageSinkLines.push({
        id: `${storageType}-${i + 1}`,
        file: sourceFile.label,
        criticalExamSurface: !!sourceFile.criticalExamSurface,
        type: `${storageType}.${method}`,
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
  const sinkSets = SOURCE_FILES.map((sourceFile) => buildSinkRows(readLines(sourceFile), sourceFile));
  const domSinkLines = sinkSets.flatMap((set) => set.domSinkLines);
  const storageSinkLines = sinkSets.flatMap((set) => set.storageSinkLines);

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
  const highRiskCriticalExamDom = domSinkLines
    .filter((row) => row.criticalExamSurface && row.reviewAction === "required-allowlist-review")
    .slice(0, 40);

  const highRiskStorage = storageSinkLines.slice(0, 40);

  return {
    reportVersion: "dom-storage-trust-boundary-audit-v1",
    date: REPORT_DATE,
    source: SOURCE_FILES.map((sourceFile) => sourceFile.label).join(", "),
    policy: SOURCE_TRUST_RULE,
    summary: {
      dom: domSummary,
      storage: storageSummary,
      ready: highRiskDom.length === 0 && domSummary.requiresReview === 0,
      criticalExamReady: highRiskCriticalExamDom.length === 0,
      criticalExamDomRequiresReview: highRiskCriticalExamDom.length,
      note: "Local progress/evidence claims remain non-authoritative until backend-auth proof is available.",
    },
    domSinks: domSinkLines,
    storageSinks: storageSinkLines,
    highRisk: {
      dom: highRiskDom,
      criticalExamDom: highRiskCriticalExamDom,
      storage: highRiskStorage,
    },
  };
}

function toMarkdown(report) {
  const lines = [];
  lines.push("# DOM + Storage Trust Boundary Audit");
  lines.push("");
  lines.push(`- Date: ${report.date}`);
  lines.push(`- Target: ${report.source}`);
  lines.push(`- Report Version: ${report.reportVersion}`);
  lines.push("");
  lines.push("## Summary");
  lines.push("");
  lines.push(`- DOM sinks: ${report.summary.dom.total} total (innerHTML ${report.summary.dom.innerHTML}, insertAdjacentHTML ${report.summary.dom.insertAdjacentHTML}, document.write ${report.summary.dom.documentWrite})`);
  lines.push(`- DOM review status: ${report.summary.dom.reviewedSafe} safe / ${report.summary.dom.requiresReview} requires review`);
  lines.push(`- Critical exam DOM review: ${report.summary.criticalExamReady ? "ready" : "needs review"} (${report.summary.criticalExamDomRequiresReview} sinks)`);
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
    lines.push("| File | Owner | Type | Line | Data Origin | Sanitizer | Review |");
    lines.push("|---|---|---|---|---|---|---|");
    report.highRisk.dom.forEach((row) => {
      lines.push(
        `| ${row.file} | ${row.owner} | ${row.type} | ${row.line} | ${row.dataOrigin} | ${row.sanitizerMethod} | ${row.reviewAction} |`,
      );
    });
  } else {
    lines.push("- None");
  }
  lines.push("");
  lines.push("## Storage Trust Boundary");
  lines.push("");
  if (report.highRisk.storage.length) {
    lines.push("| File | Owner | Storage | Line | Key | Domain |");
    lines.push("|---|---|---|---|---|---|");
    report.highRisk.storage.forEach((row) => {
      lines.push(`| ${row.file} | ${row.owner} | ${row.type} | ${row.line} | ${row.key || "unknown"} | ${row.storageDomain} |`);
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

module.exports = { buildReport, parseStorageCall, toMarkdown, run };
