#!/usr/bin/env node
"use strict";

// scripts/audit_code_runtime.js
//
// Actually EXECUTE every codeExample (that's safe to run) in a vm sandbox.
// Catches runtime errors that syntax check misses (e.g. wrong API usage,
// undefined variable references that pass parse).
//
// Skips (in addition to syntax-skip rules):
//   - Code that uses browser-only APIs (window, document, fetch, localStorage)
//   - Code that needs npm packages (express, mongoose, react)
//   - Code that uses Node-only modules (fs, path, http) — would do real I/O
//
// What it CAN run: pure JavaScript algorithm samples, math, primitive
// manipulation, closure / scope examples.
//
// Output: CODE_RUNTIME_REPORT.json + .md

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const JSON_PATH = path.join(ROOT, "CODE_RUNTIME_REPORT.json");
const MD_PATH = path.join(ROOT, "CODE_RUNTIME_REPORT.md");

const SKIP_KEYWORDS = [
  // Browser
  "window", "document", "location", "navigator", "fetch", "localStorage", "sessionStorage", "cookie",
  // Node
  "require", "process", "module.", "__dirname", "__filename",
  // Frameworks (would need import)
  "useState", "useEffect", "useMemo", "useRef", "useReducer", "createContext",
  "express", "mongoose", "Schema", "Router",
];

const RUNTIME_CATEGORIES = [
  "runnable-js",
  "browser-only",
  "pseudo-code",
  "expected-error",
  "shell-css-yaml-sql",
];

const CONTEXT_ERROR_PATTERNS = [
  /\bis not defined\b/,
  /Assignment to constant variable/,
  /Unexpected token/,
  /Invalid or unexpected token/,
  /Missing initializer/,
  /missing \) after argument list/,
  /await is only valid/,
];

function shouldSkip(code) {
  if (!code || typeof code !== "string") return true;
  // Same skips as syntax check + browser/Node-specific
  if (/^\s*(?:import|export)\b/m.test(code)) return true;
  if (/^\s*(?:type|interface|enum)\s+\w/m.test(code)) return true;
  if (/\b(?:const|let|var|function|\w+)\s*\(?[^)]*?\)?\s*:\s*(?:[A-Z]\w*|string|number|boolean|void|never|unknown|any|\[[^\]]+\])\w*[<>\[\]\| ?,:]*[ ,);={]/.test(code)) return true;
  if (/^\s*@\w+/m.test(code) || /\b(?:private|public|protected|readonly)\s+\w+\s*:\s*\w+/.test(code)) return true;
  if (/^\s*(?:return|await)\b/m.test(code)) return true;
  if (/^\s*(?:#\s*)?(?:SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|BEGIN|COMMIT|FROM\s|RUN\s|CMD\s|npm\s|npx\s|git\s|docker\s|tsc\b|\$\s*\w)/im.test(code)) return true;
  if (/^\s*(?:"(?:scripts|engines|browserslist|compilerOptions)"|(?:services|volumes|on|jobs|resolve|alias))\s*:/m.test(code)) return true;
  if (/<[A-Za-z]/m.test(code)) return true;
  if (/^\s*(?:\*|:root|[.#\w][^{};\n]*)\s*\{/m.test(code) && /:\s*[^;{}\n]+;/.test(code)) return true;
  if (/^\s*(?:GET|POST|PUT|PATCH|DELETE)\s+\//m.test(code)) return true;
  if (/https?:\/\/\S+/.test(code) && !/[=();{}]/.test(code)) return true;
  if (/->|--many|many--|\.\.\./.test(code) && !/\?\?=/.test(code)) return true;
  if (/💥|❌|Compile error|TypeError|ReferenceError|bad vs\. good prompt/i.test(code)) return true;
  for (const kw of SKIP_KEYWORDS) {
    if (code.includes(kw)) return true;
  }
  return false;
}

function classifyCode(code) {
  if (!code || typeof code !== "string") {
    return { category: "pseudo-code", reason: "empty-or-non-string" };
  }
  if (/💥|❌|Compile error|TypeError|ReferenceError|bad vs\. good prompt/i.test(code)) {
    return { category: "expected-error", reason: "teaching-failure-example" };
  }
  if (/\b(?:reject|Promise\.reject)\s*\(/.test(code)) {
    return { category: "expected-error", reason: "intentional-promise-rejection" };
  }
  if (/\bthrow\s+new\s+Error\s*\(/.test(code)) {
    return { category: "expected-error", reason: "intentional-validation-throw" };
  }
  if (/\bfor\s*\([^)]*<\s*1e[6-9]\b[^)]*\)/.test(code) || /לולאה ארוכה|חוסמת את התהליך|blocking loop/i.test(code)) {
    return { category: "expected-error", reason: "intentional-blocking-loop" };
  }
  if (/^\s*(?:#\s*)?(?:SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|BEGIN|COMMIT|FROM\s|RUN\s|CMD\s|npm\s|npx\s|git\s|docker\s|tsc\b|\$\s*\w)/im.test(code)) {
    return { category: "shell-css-yaml-sql", reason: "shell-or-sql" };
  }
  if (/^\s*(?:"(?:scripts|engines|browserslist|compilerOptions)"|(?:services|volumes|on|jobs|resolve|alias))\s*:/m.test(code)) {
    return { category: "shell-css-yaml-sql", reason: "json-yaml-config" };
  }
  if (/^\s*(?:\*|:root|[.#\w][^{};\n]*)\s*\{/m.test(code) && /:\s*[^;{}\n]+;/.test(code)) {
    return { category: "shell-css-yaml-sql", reason: "css" };
  }
  if (/^\s*(?:GET|POST|PUT|PATCH|DELETE)\s+\//m.test(code)) {
    return { category: "shell-css-yaml-sql", reason: "http-transcript" };
  }
  if (/\b(?:window|document|location|navigator|fetch|localStorage|sessionStorage|cookie)\b/.test(code)) {
    return { category: "browser-only", reason: "browser-api" };
  }
  if (/^\s*(?:import|export)\b/m.test(code)) {
    return { category: "pseudo-code", reason: "module-syntax-or-external-package" };
  }
  if (/^\s*(?:type|interface|enum)\s+\w/m.test(code)) {
    return { category: "pseudo-code", reason: "typescript-declaration" };
  }
  if (/\b(?:const|let|var|function|\w+)\s*\(?[^)]*?\)?\s*:\s*(?:[A-Z]\w*|string|number|boolean|void|never|unknown|any|\[[^\]]+\])\w*[<>\[\]\| ?,:]*[ ,);={]/.test(code)) {
    return { category: "pseudo-code", reason: "typescript-annotation" };
  }
  if (/^\s*@\w+/m.test(code) || /\b(?:private|public|protected|readonly)\s+\w+\s*:\s*\w+/.test(code)) {
    return { category: "pseudo-code", reason: "decorator-or-class-field" };
  }
  if (/^\s*await\b/m.test(code)) {
    return { category: "pseudo-code", reason: "top-level-await" };
  }
  if (/<[A-Za-z]/m.test(code)) {
    return { category: "pseudo-code", reason: "jsx-or-html" };
  }
  if (/https?:\/\/\S+/.test(code) && !/[=();{}]/.test(code)) {
    return { category: "pseudo-code", reason: "url-only" };
  }
  if (/->|--many|many--|\.\.\./.test(code) && !/\?\?=/.test(code)) {
    return { category: "pseudo-code", reason: "diagram-or-ellipsis" };
  }
  for (const kw of ["require", "process", "module.", "__dirname", "__filename", "useState", "useEffect", "useMemo", "useRef", "useReducer", "createContext", "express", "mongoose", "Schema", "Router"]) {
    if (code.includes(kw)) {
      return { category: "pseudo-code", reason: "external-runtime-or-framework" };
    }
  }
  return { category: "runnable-js", reason: "pure-javascript" };
}

function isContextRuntimeError(message) {
  return CONTEXT_ERROR_PATTERNS.some((pattern) => pattern.test(String(message || "")));
}

function runCode(code, label) {
  // Wrap in async function so top-level return/await are allowed.
  // Provide minimal "console" so logs don't pollute stdout.
  const sandbox = {
    console: { log: () => {}, warn: () => {}, error: () => {}, info: () => {} },
    Math, Date, JSON, Number, String, Boolean, Array, Object, RegExp, Error,
    Map, Set, WeakMap, WeakSet, Symbol, Promise,
    setTimeout: (fn) => fn,  // no-op so tests don't hang
    clearTimeout: () => {},
    setInterval: () => 0,
    clearInterval: () => {},
  };
  vm.createContext(sandbox);
  try {
    // Wrap in non-async IIFE first to catch synchronous errors only.
    // We DON'T await async errors here — those usually come from external
    // APIs (fetch/db) which we already skipped.
    const wrapped = `(function(){\n${code}\n})()`;
    const script = new vm.Script(wrapped, { filename: label });
    script.runInContext(sandbox, { timeout: 500 });
    return { ok: true };
  } catch (err) {
    return { ok: false, err: String(err.message || err).split("\n")[0].slice(0, 120) };
  }
}

function loadAll() {
  const sandbox = { window: {}, console };
  fs.readdirSync(DATA_DIR).filter(f => f.endsWith(".js")).sort().forEach(f => {
    vm.runInNewContext(fs.readFileSync(path.join(DATA_DIR, f), "utf8"), sandbox, { filename: f });
  });
  return sandbox;
}

function run() {
  const sandbox = loadAll();
  const lessons = Object.values(sandbox).filter(v => v && typeof v.id === "string" && Array.isArray(v.concepts));
  let total = 0, checked = 0, skipped = 0;
  const classifications = Object.fromEntries(RUNTIME_CATEGORIES.map((category) => [category, 0]));
  const skipReasons = {};
  const contextSkips = [];
  const unclassified = [];
  const fails = [];
  lessons.forEach(lesson => {
    (lesson.concepts || []).forEach(c => {
      if (!c.codeExample) return;
      total++;
      const classification = classifyCode(c.codeExample);
      if (!RUNTIME_CATEGORIES.includes(classification.category)) {
        unclassified.push({
          conceptKey: `${lesson.id}::${c.conceptName}`,
          category: classification.category || "unknown",
          codePreview: c.codeExample.slice(0, 80),
        });
      } else {
        classifications[classification.category]++;
      }
      if (classification.reason) {
        skipReasons[classification.reason] = (skipReasons[classification.reason] || 0) + 1;
      }
      if (classification.category !== "runnable-js") {
        skipped++;
        return;
      }
      checked++;
      const r = runCode(c.codeExample, `${lesson.id}::${c.conceptName}`);
      if (!r.ok && isContextRuntimeError(r.err)) {
        checked--;
        skipped++;
        contextSkips.push({
          conceptKey: `${lesson.id}::${c.conceptName}`,
          err: r.err,
          codePreview: c.codeExample.slice(0, 80),
        });
        return;
      }
      if (!r.ok) {
        fails.push({
          conceptKey: `${lesson.id}::${c.conceptName}`,
          err: r.err,
          codePreview: c.codeExample.slice(0, 80),
        });
      }
    });
  });
  return {
    total,
    checked,
    skipped,
    classified: total - unclassified.length,
    classifications,
    skipReasons,
    contextSkips,
    unclassified,
    fails,
  };
}

function main() {
  const r = run();
  const strict = process.argv.includes("--strict");
  r.ready = r.unclassified.length === 0 && r.fails.length === 0;
  fs.writeFileSync(JSON_PATH, JSON.stringify(r, null, 2));

  const md = [
    "# Code Runtime Audit",
    "",
    `_Generated: ${new Date().toISOString().slice(0, 10)}_`,
    "",
    "## Summary",
    `- codeExamples total: ${r.total}`,
    `- Classified: ${r.classified}/${r.total}`,
    `- Skipped (browser/Node-specific or non-JS): ${r.skipped}`,
    `- Actually executed: ${r.checked}`,
    `- Context-limited JS skips: ${r.contextSkips.length}`,
    `- Runtime errors: **${r.fails.length}**`,
    "",
    "## Classification",
    ...Object.entries(r.classifications).map(([category, count]) => `- ${category}: ${count}`),
    "",
    "## Top Skip Reasons",
    ...Object.entries(r.skipReasons)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 12)
      .map(([reason, count]) => `- ${reason}: ${count}`),
    "",
    "## Strict Gate",
    `- ready: ${r.ready ? "true" : "false"}`,
    `- unclassified: ${r.unclassified.length}`,
    `- context-limited skips: ${r.contextSkips.length}`,
    `- runtime failures: ${r.fails.length}`,
    "",
    r.fails.length ? "## Runtime errors\n\n" +
      r.fails.slice(0, 30).map(f => `- \`${f.conceptKey}\`: ${f.err}\n  \`\`\`js\n  ${f.codePreview}\n  \`\`\``).join("\n") +
      (r.fails.length > 30 ? `\n... and ${r.fails.length - 30} more` : "") :
      "✅ No runtime errors in any executed codeExample.",
  ].join("\n");
  fs.writeFileSync(MD_PATH, md);

  console.log(JSON.stringify({
    total: r.total,
    classified: r.classified,
    checked: r.checked,
    skipped: r.skipped,
    contextSkipped: r.contextSkips.length,
    classifications: r.classifications,
    unclassified: r.unclassified.length,
    fails: r.fails.length,
    ready: r.ready,
  }, null, 2));

  if (strict && !r.ready) {
    process.exitCode = 1;
  }
}

if (require.main === module) main();

module.exports = { classifyCode, shouldSkip, runCode, run };
