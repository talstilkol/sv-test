#!/usr/bin/env node
"use strict";

// scripts/check_contrast.js
//
// CI gate that enforces WCAG AA contrast (4.5:1 normal, 3:1 large text)
// on the documented text-on-background color pairs declared in style.css's
// :root block. We don't render the page — we parse the CSS variables and
// check every (text, bg) pair we explicitly track.
//
// USAGE:
//   node scripts/check_contrast.js          # report only
//   node scripts/check_contrast.js --strict # exit 1 if any fail
//
// LIMITATIONS:
//   - Only checks the named CSS variable pairs in PAIRS below.
//   - Doesn't catch component-local color rules (covered by the
//     browser-side audit + manual review).
//
// Why this is worth keeping in CI:
//   This pass would have caught --text-muted at 4.47:1 (just below AA)
//   before it shipped. That value sat unfixed for the entire 2026-05
//   sprint because no automated check enforced AA on the variable layer.

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const STYLE_PATH = path.join(ROOT, "style.css");

const STRICT = process.argv.includes("--strict");

// ---------- Parsing ----------

function readRoot() {
  const css = fs.readFileSync(STYLE_PATH, "utf8");
  // Match the FIRST `:root { ... }` block.
  const m = css.match(/:root\s*\{([\s\S]*?)\}/);
  if (!m) throw new Error("Could not locate :root block in style.css");
  return m[1];
}

function parseVars(rootBody) {
  const vars = {};
  const re = /--([a-zA-Z0-9-_]+)\s*:\s*([^;]+);/g;
  let m;
  while ((m = re.exec(rootBody)) !== null) {
    vars[m[1]] = m[2].trim();
  }
  return vars;
}

// Parse "#rgb" / "#rrggbb" / "rgb(...)" / "rgba(...)" → [r, g, b, a]
function parseColor(value, vars = {}, depth = 0) {
  if (depth > 6) return null;
  const v = String(value || "").trim();

  // var(--foo, fallback)
  const vm = v.match(/^var\(\s*--([a-zA-Z0-9-_]+)(?:\s*,\s*([^)]+))?\)$/);
  if (vm) {
    const name = vm[1];
    const fallback = vm[2];
    if (vars[name] !== undefined) return parseColor(vars[name], vars, depth + 1);
    if (fallback) return parseColor(fallback.trim(), vars, depth + 1);
    return null;
  }

  // hex
  const hm = v.match(/^#([0-9a-fA-F]{3,8})$/);
  if (hm) {
    const hex = hm[1];
    if (hex.length === 3 || hex.length === 4) {
      const r = parseInt(hex[0] + hex[0], 16);
      const g = parseInt(hex[1] + hex[1], 16);
      const b = parseInt(hex[2] + hex[2], 16);
      const a = hex.length === 4 ? parseInt(hex[3] + hex[3], 16) / 255 : 1;
      return [r, g, b, a];
    }
    if (hex.length === 6 || hex.length === 8) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      const a = hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1;
      return [r, g, b, a];
    }
  }

  // rgb()/rgba()
  const rm = v.match(/^rgba?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)(?:\s*,\s*(\d+(?:\.\d+)?))?\s*\)$/);
  if (rm) {
    return [+rm[1], +rm[2], +rm[3], rm[4] !== undefined ? +rm[4] : 1];
  }

  return null;
}

function compositeOver(fg, bg) {
  const a = fg[3];
  return [
    Math.round(fg[0] * a + bg[0] * (1 - a)),
    Math.round(fg[1] * a + bg[1] * (1 - a)),
    Math.round(fg[2] * a + bg[2] * (1 - a)),
    1,
  ];
}

function luminance([r, g, b]) {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function ratio(fg, bg) {
  const L1 = luminance(fg);
  const L2 = luminance(bg);
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
}

// ---------- Pairs we track ----------
//
// Each entry is one (text-color, bg-color) combination that the design system
// claims is legible. WCAG AA: 4.5 normal, 3.0 large. We use 4.5 for everything
// since that's the strict floor.
//
// fg/bg can be a CSS variable name (resolved via --) or a literal hex/rgb.
// Keep the list HONEST: only put pairs in here that the design system intends
// to use. Don't add a pair to make the test pass — fix the color instead.

const PAIRS = [
  { name: "text-main on bg-dark", fg: "var(--text-main)", bg: "var(--bg-dark)" },
  { name: "text-muted on bg-dark", fg: "var(--text-muted)", bg: "var(--bg-dark)" },
  { name: "text-bright on bg-dark", fg: "var(--text-bright)", bg: "var(--bg-dark)" },
  { name: "text-main on bg-panel (composited over bg-dark)", fg: "var(--text-main)", bg: "var(--bg-panel)", over: "var(--bg-dark)" },
  { name: "text-muted on bg-panel (composited over bg-dark)", fg: "var(--text-muted)", bg: "var(--bg-panel)", over: "var(--bg-dark)" },
  { name: "text-main on bg-card (composited over bg-dark)", fg: "var(--text-main)", bg: "var(--bg-card)", over: "var(--bg-dark)" },
  { name: "primary brand-primary on bg-dark", fg: "var(--primary)", bg: "var(--bg-dark)" },
  { name: "accent brand-accent on bg-dark", fg: "var(--accent)", bg: "var(--bg-dark)" },
  { name: "success on bg-dark", fg: "var(--success)", bg: "var(--bg-dark)" },
  { name: "error on bg-dark", fg: "var(--error)", bg: "var(--bg-dark)" },
  { name: "warning on bg-dark", fg: "var(--warning)", bg: "var(--bg-dark)" },
];

const AA_NORMAL = 4.5;

// ---------- Main ----------

function evalColor(value, vars) {
  return parseColor(value, vars);
}

function check() {
  const vars = parseVars(readRoot());
  const results = [];
  for (const pair of PAIRS) {
    let fg = evalColor(pair.fg, vars);
    let bg = evalColor(pair.bg, vars);
    if (!fg) {
      results.push({ ...pair, ok: false, reason: `could not resolve fg "${pair.fg}"` });
      continue;
    }
    if (!bg) {
      results.push({ ...pair, ok: false, reason: `could not resolve bg "${pair.bg}"` });
      continue;
    }
    if (bg[3] < 1) {
      // Composite over the underlying surface
      const over = pair.over ? evalColor(pair.over, vars) : [10, 11, 16, 1];
      if (!over) {
        results.push({ ...pair, ok: false, reason: `could not resolve over-bg "${pair.over}"` });
        continue;
      }
      bg = compositeOver(bg, over);
    }
    if (fg[3] < 1) {
      // Foreground translucent — composite over bg
      fg = compositeOver(fg, bg);
    }
    const r = ratio(fg, bg);
    const ok = r >= AA_NORMAL;
    results.push({ ...pair, fgRGB: fg.slice(0, 3), bgRGB: bg.slice(0, 3), ratio: +r.toFixed(2), ok });
  }
  return results;
}

function main() {
  const results = check();
  const failures = results.filter((r) => !r.ok);

  console.log("📊 WCAG AA contrast check on style.css :root variables\n");
  for (const r of results) {
    const mark = r.ok ? "✅" : "❌";
    if (r.ratio !== undefined) {
      console.log(`  ${mark} ${r.name}: ${r.ratio}:1 (need ≥ ${AA_NORMAL})`);
    } else {
      console.log(`  ${mark} ${r.name}: ${r.reason}`);
    }
  }

  console.log(`\n${failures.length === 0 ? "✅" : "❌"} ${results.length - failures.length}/${results.length} pairs pass WCAG AA`);

  if (failures.length > 0 && STRICT) {
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { parseColor, parseVars, ratio, compositeOver, check, PAIRS };
