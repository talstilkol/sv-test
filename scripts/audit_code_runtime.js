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
const { byFilename } = require("./lib/sort.js");

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
  "<", ">", // JSX angle brackets
];

function shouldSkip(code) {
  if (!code || typeof code !== "string") return true;
  // Same skips as syntax check + browser/Node-specific
  if (/^\s*(?:import|export)\b/m.test(code)) return true;
  if (/^\s*(?:type|interface|enum)\s+\w/m.test(code)) return true;
  if (/^\s*(?:return|await)\b/m.test(code)) return true;
  if (/^\s*(?:SELECT|INSERT|FROM\s|RUN\s|CMD\s)/im.test(code)) return true;
  if (/<[A-Za-z]/m.test(code)) return true;
  for (const kw of SKIP_KEYWORDS) {
    if (code.includes(kw)) return true;
  }
  return false;
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
  fs.readdirSync(DATA_DIR).filter(f => f.endsWith(".js")).sort(byFilename).forEach(f => {
    vm.runInNewContext(fs.readFileSync(path.join(DATA_DIR, f), "utf8"), sandbox, { filename: f });
  });
  return sandbox;
}

function run() {
  const sandbox = loadAll();
  const lessons = Object.values(sandbox).filter(v => v && typeof v.id === "string" && Array.isArray(v.concepts));
  let total = 0, checked = 0, skipped = 0;
  const fails = [];
  lessons.forEach(lesson => {
    (lesson.concepts || []).forEach(c => {
      if (!c.codeExample) return;
      total++;
      if (shouldSkip(c.codeExample)) {
        skipped++;
        return;
      }
      checked++;
      const r = runCode(c.codeExample, `${lesson.id}::${c.conceptName}`);
      if (!r.ok) {
        fails.push({
          conceptKey: `${lesson.id}::${c.conceptName}`,
          err: r.err,
          codePreview: c.codeExample.slice(0, 80),
        });
      }
    });
  });
  return { total, checked, skipped, fails };
}

function main() {
  const r = run();
  fs.writeFileSync(JSON_PATH, JSON.stringify(r, null, 2));

  const md = [
    "# Code Runtime Audit",
    "",
    `_Generated: ${new Date().toISOString().slice(0, 10)}_`,
    "",
    "## Summary",
    `- codeExamples total: ${r.total}`,
    `- Skipped (browser/Node-specific or non-JS): ${r.skipped}`,
    `- Actually executed: ${r.checked}`,
    `- Runtime errors: **${r.fails.length}**`,
    "",
    r.fails.length ? "## Runtime errors\n\n" +
      r.fails.slice(0, 30).map(f => `- \`${f.conceptKey}\`: ${f.err}\n  \`\`\`js\n  ${f.codePreview}\n  \`\`\``).join("\n") +
      (r.fails.length > 30 ? `\n... and ${r.fails.length - 30} more` : "") :
      "✅ No runtime errors in any executed codeExample.",
  ].join("\n");
  fs.writeFileSync(MD_PATH, md);

  console.log(JSON.stringify({ total: r.total, checked: r.checked, skipped: r.skipped, fails: r.fails.length }, null, 2));
}

if (require.main === module) main();
