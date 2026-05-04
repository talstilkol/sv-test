#!/usr/bin/env node
"use strict";

// scripts/audit_code_syntax.js
//
// Runs every codeExample, fill code (with answer substituted in), and build
// reference solution through Node's syntax parser. Catches genuine syntax
// errors that the validator's structural checks don't see.
//
// Skips:
//   - JSX / TSX patterns (Node can't parse them without Babel)
//   - Tailwind class names embedded in JSX strings (same)
//   - SQL / Bash / shell commands (different syntax)
//
// Output: CODE_SYNTAX_REPORT.json + .md

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const JSON_PATH = path.join(ROOT, "CODE_SYNTAX_REPORT.json");
const MD_PATH = path.join(ROOT, "CODE_SYNTAX_REPORT.md");

// Heuristics — be GENEROUS with skips. Node CommonJS can't parse:
//   - JSX/TSX (any < followed by identifier in an expression position)
//   - TypeScript syntax (`: type`, `as type`, `<T>`, `interface`, `type alias`)
//   - ES modules (`import`/`export` at top level)
//   - Top-level `return` (assumes inside a function for snippet)
//   - Top-level `await` (Node 14+ has it but vm.Script doesn't allow)
//   - SQL / shell

function looksLikeJsx(code) {
  if (/<[A-Za-z][\w]*[^<>]*\/?>/m.test(code)) return true;
  if (/return\s*\(\s*</.test(code)) return true;
  return false;
}

function looksLikeTs(code) {
  // Type annotations: `: number`, `: string[]`, `: Foo<T>`
  if (/\b(?:const|let|var|function|\w+)\s*\(?[^)]*?\)?\s*:\s*[A-Z]\w*[<>\[\]\| ?]*[ ,);=]/.test(code)) return true;
  if (/^\s*(?:type|interface)\s+\w/m.test(code)) return true;
  if (/\bas\s+(?:[A-Z]\w*|const|any|unknown|never)\b/.test(code)) return true;
  if (/^\s*enum\s+\w/m.test(code)) return true;
  if (/<[A-Z]\w*[,> ]/.test(code) && !/=>\s*[<]/.test(code)) return true; // generics
  return false;
}

function looksLikeEsm(code) {
  return /^\s*(?:import|export)\b/m.test(code);
}

function looksLikeTopLevelReturnOrAwait(code) {
  return /^\s*(?:return|await)\b/m.test(code);
}

function looksLikeSql(code) {
  return /^\s*(?:SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|JOIN)\b/im.test(code);
}

function looksLikeShell(code) {
  return /^\s*(?:\$\s*\w|npm\s|npx\s|git\s|cd\s|ls\s|echo\s|brew\s|apt\s|yarn\s|pnpm\s|node\s+--?\w)/m.test(code);
}

function looksLikeYamlOrJson(code) {
  if (/^\s*(?:version|name|on|jobs|runs-on|steps|with|services|volumes|networks|build):/m.test(code)) return true;
  if (/^\s*\{[\s\S]+\}\s*$/.test(code) && !/[=();]/.test(code)) return true;
  return false;
}

function looksLikeCss(code) {
  // CSS selector + brace block
  if (/^\s*[.#\w][^{};\n]*\{/m.test(code) && /:\s*[^;{}\n]+;/.test(code)) return true;
  // CSS at-rules
  if (/^\s*@(?:media|keyframes|supports|import|font-face)\b/m.test(code)) return true;
  return false;
}

function looksLikeDockerfile(code) {
  return /^\s*(?:FROM|RUN|COPY|ADD|CMD|ENTRYPOINT|EXPOSE|ENV|WORKDIR|VOLUME|USER|ARG|LABEL|HEALTHCHECK)\s+/m.test(code);
}

function looksLikeHtml(code) {
  return /^<!DOCTYPE|^<html|^<head|^<body|^<div|^<form/im.test(code) || /<\/[a-z]+>/.test(code);
}

function shouldSkip(code) {
  if (!code || typeof code !== "string") return true;
  return (
    looksLikeJsx(code) ||
    looksLikeTs(code) ||
    looksLikeEsm(code) ||
    looksLikeTopLevelReturnOrAwait(code) ||
    looksLikeSql(code) ||
    looksLikeShell(code) ||
    looksLikeYamlOrJson(code) ||
    looksLikeCss(code) ||
    looksLikeDockerfile(code) ||
    looksLikeHtml(code)
  );
}

function syntaxCheck(code, label) {
  try {
    new vm.Script(code, { filename: label });
    return { ok: true };
  } catch (err) {
    // Retry wrapped in an async function — allows top-level `return`/`await`
    // which is valid pedagogically (snippet assumes it's inside a handler).
    try {
      new vm.Script(`(async function(){\n${code}\n})()`, { filename: label });
      return { ok: true, wrapped: true };
    } catch (_) {
      return { ok: false, err: err.message?.split("\n")[0]?.slice(0, 120) };
    }
  }
}

function loadData() {
  const sandbox = { window: {}, console };
  fs.readdirSync(DATA_DIR).filter(f => f.endsWith(".js")).sort().forEach(f => {
    vm.runInNewContext(fs.readFileSync(path.join(DATA_DIR, f), "utf8"), sandbox, { filename: f });
  });
  const lessons = Object.values(sandbox).filter(v => v && typeof v.id === "string" && Array.isArray(v.concepts));
  return {
    lessons,
    bank: sandbox.QUESTIONS_BANK || { mc: [], fill: [] },
    builds: sandbox.QUESTIONS_BUILD || [],
  };
}

function run() {
  const { lessons, bank, builds } = loadData();
  const results = {
    codeExamples: { total: 0, checked: 0, skipped: 0, fails: [] },
    fills: { total: 0, checked: 0, skipped: 0, fails: [] },
    builds: { total: 0, checked: 0, skipped: 0, fails: [] },
  };

  // codeExamples
  lessons.forEach(lesson => {
    (lesson.concepts || []).forEach(c => {
      if (!c.codeExample) return;
      results.codeExamples.total++;
      if (shouldSkip(c.codeExample)) {
        results.codeExamples.skipped++;
        return;
      }
      results.codeExamples.checked++;
      const r = syntaxCheck(c.codeExample, `${lesson.id}::${c.conceptName}`);
      if (!r.ok) {
        results.codeExamples.fails.push({
          conceptKey: `${lesson.id}::${c.conceptName}`,
          err: r.err,
          codePreview: c.codeExample.slice(0, 80),
        });
      }
    });
  });

  // Fills — substitute answer into ____ then parse
  (bank.fill || []).forEach(q => {
    results.fills.total++;
    if (!q.code || !q.answer) return;
    const reconstructed = q.code.replace(/____/g, q.answer);
    if (shouldSkip(reconstructed)) {
      results.fills.skipped++;
      return;
    }
    results.fills.checked++;
    const r = syntaxCheck(reconstructed, q.id);
    if (!r.ok) {
      results.fills.fails.push({
        id: q.id,
        conceptKey: q.conceptKey || "",
        err: r.err,
        answer: q.answer,
        codePreview: reconstructed.slice(0, 80),
      });
    }
  });

  // Build reference solutions
  builds.forEach(q => {
    results.builds.total++;
    if (!q.reference) return;
    if (shouldSkip(q.reference)) {
      results.builds.skipped++;
      return;
    }
    results.builds.checked++;
    const r = syntaxCheck(q.reference, q.id);
    if (!r.ok) {
      results.builds.fails.push({
        id: q.id,
        conceptKey: q.conceptKey || "",
        err: r.err,
        codePreview: q.reference.slice(0, 80),
      });
    }
  });

  return results;
}

function main() {
  const r = run();
  fs.writeFileSync(JSON_PATH, JSON.stringify(r, null, 2));

  const md = [
    "# Code Syntax Audit Report",
    "",
    `_Generated: ${new Date().toISOString().slice(0, 10)}_`,
    "",
    "Runs every codeExample / fill (answer substituted) / build reference through Node's syntax parser. Skips JSX/TSX, pure TS types, SQL, and shell commands (Node can't parse those without external tools).",
    "",
    "## Summary",
    "",
    `| Source | Total | Checked | Skipped | **Fails** |`,
    `|---|---:|---:|---:|---:|`,
    `| codeExamples | ${r.codeExamples.total} | ${r.codeExamples.checked} | ${r.codeExamples.skipped} | **${r.codeExamples.fails.length}** |`,
    `| fills (reconstructed) | ${r.fills.total} | ${r.fills.checked} | ${r.fills.skipped} | **${r.fills.fails.length}** |`,
    `| build references | ${r.builds.total} | ${r.builds.checked} | ${r.builds.skipped} | **${r.builds.fails.length}** |`,
    "",
  ];
  if (r.codeExamples.fails.length) {
    md.push("## codeExample fails", "");
    r.codeExamples.fails.slice(0, 30).forEach(f => {
      md.push(`- \`${f.conceptKey}\`: ${f.err}`);
    });
    md.push("");
  }
  if (r.fills.fails.length) {
    md.push("## fill fails (top 30)", "");
    r.fills.fails.slice(0, 30).forEach(f => {
      md.push(`- \`${f.id}\` (${f.conceptKey}) answer="${f.answer}": ${f.err}`);
    });
    md.push("");
  }
  if (r.builds.fails.length) {
    md.push("## build reference fails", "");
    r.builds.fails.slice(0, 30).forEach(f => {
      md.push(`- \`${f.id}\` (${f.conceptKey}): ${f.err}`);
    });
    md.push("");
  }

  fs.writeFileSync(MD_PATH, md.join("\n"));

  console.log(JSON.stringify({
    codeExamples: { total: r.codeExamples.total, checked: r.codeExamples.checked, fails: r.codeExamples.fails.length },
    fills: { total: r.fills.total, checked: r.fills.checked, fails: r.fills.fails.length },
    builds: { total: r.builds.total, checked: r.builds.checked, fails: r.builds.fails.length },
  }, null, 2));
}

if (require.main === module) main();
