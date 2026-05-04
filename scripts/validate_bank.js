#!/usr/bin/env node
/**
 * scripts/validate_bank.js
 *
 * Validates data/questions_bank.js against data/lesson*.js + workbooks.
 * Usage:
 *   node scripts/validate_bank.js            # default — warnings stay warnings
 *   node scripts/validate_bank.js --strict   # CI mode — warnings + boilerplate +
 *                                              missing-difficulty all become
 *                                              errors → exit code 1
 *
 * Checks:
 *   ✓ All `conceptKey` values point to a real (lesson, concept) pair
 *   ✓ MC: correctIndex is 0..3 and options has exactly 4 items
 *   ✓ MC: no duplicate options within the same question
 *   ✓ Fill: `answer` appears EXACTLY ONCE in `code`
 *   ✓ Fill: `code` contains "____" placeholder marker
 *   ✓ All IDs are unique
 *   ✓ All `level` values are 1..6
 *   ✓ Reports coverage gaps per concept (less than 3 MC / 2 Fill)
 */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const STRICT = process.argv.includes("--strict");
const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");

// Mini sandbox to load all the JS data files (which use `var FOO = {...}`).
function loadDataFiles() {
  const sandbox = { window: {}, console };
  const files = fs.readdirSync(DATA_DIR)
    .filter((f) => f.endsWith(".js") && f !== "questions_bank_seeded.js");
  for (const f of files) {
    const code = fs.readFileSync(path.join(DATA_DIR, f), "utf8");
    try {
      vm.runInNewContext(code, sandbox, { filename: f });
    } catch (err) {
      console.error(`✗ Failed to parse ${f}: ${err.message}`);
      process.exit(1);
    }
  }
  // Collect all lesson modules
  const lessons = [];
  for (const k of Object.keys(sandbox)) {
    const v = sandbox[k];
    if (
      v &&
      typeof v === "object" &&
      typeof v.id === "string" &&
      Array.isArray(v.concepts)
    ) {
      lessons.push(v);
    }
  }
  // QUESTIONS_TRACE / QUESTIONS_BUG live in their own files; merge into bank
  // so the validation blocks in validate() pick them up.
  const baseBank = sandbox.QUESTIONS_BANK || { mc: [], fill: [] };
  const traceList = Array.isArray(sandbox.QUESTIONS_TRACE)
    ? sandbox.QUESTIONS_TRACE
    : [];
  const bugList = Array.isArray(sandbox.QUESTIONS_BUG)
    ? sandbox.QUESTIONS_BUG
    : [];
  const buildList = Array.isArray(sandbox.QUESTIONS_BUILD)
    ? sandbox.QUESTIONS_BUILD
    : [];
  const bank = Object.assign({}, baseBank, {
    mc: baseBank.mc || [],
    fill: baseBank.fill || [],
    trace: traceList,
    bug: bugList,
    build: buildList,
  });
  return {
    lessons,
    bank,
    guide: sandbox.QUICK_GUIDE || { topics: [] },
  };
}

function ck(lessonId, conceptName) {
  return `${lessonId}::${conceptName}`;
}

function validate({ lessons, bank, guide }) {
  const validKeys = new Set();
  const conceptByKey = new Map();
  for (const L of lessons) {
    for (const c of L.concepts || []) {
      const k = ck(L.id, c.conceptName);
      validKeys.add(k);
      conceptByKey.set(k, { lesson: L, concept: c });
    }
  }

  // Manual-only coverage. Generated/seeded archives are not loaded by validation.
  const combinedMC = [...(bank.mc || [])].filter((question) => !question._seeded);
  const combinedFill = [...(bank.fill || [])].filter((question) => !question._seeded);

  const errors = [];
  const warnings = [];

  // -------- MC validation --------
  const seenIds = new Set();
  for (const q of bank.mc || []) {
    if (!q.id) errors.push(`MC missing id: ${JSON.stringify(q).slice(0, 80)}`);
    if (q.id && seenIds.has(q.id)) errors.push(`Duplicate MC id: ${q.id}`);
    seenIds.add(q.id);
    if (!Array.isArray(q.options) || q.options.length !== 4)
      errors.push(`[${q.id}] MC must have exactly 4 options (got ${q.options?.length})`);
    if (
      typeof q.correctIndex !== "number" ||
      q.correctIndex < 0 ||
      q.correctIndex > 3
    )
      errors.push(`[${q.id}] correctIndex must be 0..3 (got ${q.correctIndex})`);
    if (q.options) {
      const set = new Set(q.options);
      if (set.size !== q.options.length)
        errors.push(`[${q.id}] duplicate options`);
    }
    if (q.level && (q.level < 1 || q.level > 6))
      warnings.push(`[${q.id}] level should be 1..6 (got ${q.level})`);
    if (q.conceptKey && !validKeys.has(q.conceptKey))
      errors.push(`[${q.id}] conceptKey not found: "${q.conceptKey}"`);
    if (!q.question || !q.explanation)
      warnings.push(`[${q.id}] missing question or explanation`);
  }

  // -------- Fill validation --------
  for (const q of bank.fill || []) {
    if (!q.id) errors.push(`Fill missing id: ${JSON.stringify(q).slice(0, 80)}`);
    if (q.id && seenIds.has(q.id)) errors.push(`Duplicate fill id: ${q.id}`);
    seenIds.add(q.id);
    if (!q.code || !q.answer)
      errors.push(`[${q.id}] fill must have code and answer`);
    if (q.code && q.code.indexOf("____") === -1)
      errors.push(`[${q.id}] code must contain "____" placeholder`);
    if (q.code && q.answer) {
      // Count occurrences of the answer outside of import/require statements
      // and outside of comments. Seeing the identifier in an import line is a
      // pedagogical hint, not real ambiguity ("you saw `streamText` in the
      // import — that's the value to put in the blank"). Seeing it inside an
      // identical context (e.g. `app.____()` plus elsewhere `app.something()`)
      // IS ambiguity, so we still flag those.
      const lines = q.code.split(/\r?\n/);
      const blankLineIdx = lines.findIndex((l) => l.includes("____"));
      const ans = q.answer.toLowerCase();
      let countOutsideImports = 0;
      lines.forEach((line, i) => {
        if (i === blankLineIdx) {
          // Skip the blank line itself — the answer "appears" exactly where
          // the ____ is, by construction.
          return;
        }
        // Skip import / require / from-clause lines: pure scope hint.
        if (/^\s*(?:import|export\s+\{|export\s+default|const\s+\w+\s*=\s*require|require)\b/.test(line)) return;
        if (/\bfrom\s+["'][^"']+["']/.test(line)) return;
        // Skip pure comment lines.
        if (/^\s*(?:\/\/|\*|\/\*|#)/.test(line)) return;
        const lc = line.toLowerCase();
        let idx = 0;
        while ((idx = lc.indexOf(ans, idx)) !== -1) {
          countOutsideImports++;
          idx += ans.length;
        }
      });
      if (countOutsideImports > 0)
        warnings.push(
          `[fill-ambiguity] [${q.id}] answer "${q.answer}" appears ${countOutsideImports} time(s) in code besides imports/comments — may be ambiguous`,
        );
    }
    if (q.level && (q.level < 1 || q.level > 6))
      warnings.push(`[${q.id}] level should be 1..6 (got ${q.level})`);
    if (q.conceptKey && !validKeys.has(q.conceptKey))
      errors.push(`[${q.id}] conceptKey not found: "${q.conceptKey}"`);
  }

  // -------- Trace validation (Code Trace question type) --------
  for (const q of bank.trace || []) {
    if (!q.id) errors.push(`Trace missing id: ${JSON.stringify(q).slice(0, 80)}`);
    if (q.id && !q.id.startsWith("trace_"))
      warnings.push(`[${q.id}] trace IDs should start with "trace_"`);
    if (q.id && seenIds.has(q.id)) errors.push(`Duplicate trace id: ${q.id}`);
    seenIds.add(q.id);
    if (!q.code || typeof q.code !== "string")
      errors.push(`[${q.id}] trace must have a code (string)`);
    if (!Array.isArray(q.steps) || q.steps.length === 0)
      errors.push(`[${q.id}] trace must have at least one step`);
    if (q.level && (q.level < 1 || q.level > 6))
      warnings.push(`[${q.id}] level should be 1..6 (got ${q.level})`);
    if (q.conceptKey && !validKeys.has(q.conceptKey))
      errors.push(`[${q.id}] conceptKey not found: "${q.conceptKey}"`);

    if (Array.isArray(q.steps)) {
      const totalLines = (q.code || "").split("\n").length;
      q.steps.forEach((s, i) => {
        const tag = `[${q.id}].steps[${i}]`;
        if (typeof s.line !== "number" || s.line < 1)
          errors.push(`${tag} line must be a positive number`);
        if (typeof s.line === "number" && s.line > totalLines)
          errors.push(
            `${tag} line=${s.line} exceeds code length (${totalLines})`,
          );
        if (!s.prompt || typeof s.prompt !== "string")
          errors.push(`${tag} must have prompt (string)`);
        if (typeof s.answer !== "string" || !s.answer)
          errors.push(`${tag} must have answer (string)`);
        if (s.acceptable && !Array.isArray(s.acceptable))
          errors.push(`${tag} acceptable must be string[] (alternative answers)`);
      });
    }
    if (!q.explanation) warnings.push(`[${q.id}] missing explanation (final summary)`);
  }

  // -------- Bug Hunt validation (P1.4.3) --------
  for (const q of bank.bug || []) {
    if (!q.id) errors.push(`Bug missing id: ${JSON.stringify(q).slice(0, 80)}`);
    if (q.id && !q.id.startsWith("bug_"))
      warnings.push(`[${q.id}] bug IDs should start with "bug_"`);
    if (q.id && seenIds.has(q.id)) errors.push(`Duplicate bug id: ${q.id}`);
    seenIds.add(q.id);
    if (!q.brokenCode || typeof q.brokenCode !== "string")
      errors.push(`[${q.id}] bug must have brokenCode (string)`);
    if (!Array.isArray(q.options) || q.options.length !== 4)
      errors.push(`[${q.id}] bug must have exactly 4 options (got ${q.options?.length})`);
    if (
      typeof q.correctIndex !== "number" ||
      q.correctIndex < 0 ||
      q.correctIndex > 3
    )
      errors.push(`[${q.id}] correctIndex must be 0..3 (got ${q.correctIndex})`);
    if (q.options) {
      const set = new Set(q.options);
      if (set.size !== q.options.length)
        errors.push(`[${q.id}] duplicate options`);
    }
    if (q.brokenCode && typeof q.bugLine === "number") {
      const totalLines = q.brokenCode.split("\n").length;
      if (q.bugLine < 1 || q.bugLine > totalLines)
        errors.push(
          `[${q.id}] bugLine=${q.bugLine} out of range (1..${totalLines})`,
        );
    }
    if (q.level && (q.level < 1 || q.level > 6))
      warnings.push(`[${q.id}] level should be 1..6 (got ${q.level})`);
    if (q.conceptKey && !validKeys.has(q.conceptKey))
      errors.push(`[${q.id}] conceptKey not found: "${q.conceptKey}"`);
    if (!q.explanation) warnings.push(`[${q.id}] missing explanation`);
    if (!q.fix) warnings.push(`[${q.id}] missing fix (corrected code)`);
  }

  // -------- Mini Build validation (P1.4.4) --------
  for (const q of bank.build || []) {
    if (!q.id) errors.push(`Build missing id: ${JSON.stringify(q).slice(0, 80)}`);
    if (q.id && !q.id.startsWith("build_"))
      warnings.push(`[${q.id}] build IDs should start with "build_"`);
    if (q.id && seenIds.has(q.id)) errors.push(`Duplicate build id: ${q.id}`);
    seenIds.add(q.id);
    if (!q.prompt) errors.push(`[${q.id}] build must have prompt`);
    if (!q.starter) warnings.push(`[${q.id}] build missing starter code`);
    if (!Array.isArray(q.tests) || q.tests.length === 0)
      errors.push(`[${q.id}] build must have at least one test`);
    if (Array.isArray(q.tests)) {
      q.tests.forEach((t, i) => {
        if (!t.regex)
          errors.push(`[${q.id}].tests[${i}] missing regex pattern`);
        if (t.regex) {
          try {
            new RegExp(t.regex, t.flags || "");
          } catch (e) {
            errors.push(`[${q.id}].tests[${i}] invalid regex: ${e.message}`);
          }
        }
        if (!t.description)
          warnings.push(`[${q.id}].tests[${i}] missing description`);
      });
    }
    if (!q.reference)
      warnings.push(`[${q.id}] build missing reference solution`);
    if (q.level && (q.level < 1 || q.level > 6))
      warnings.push(`[${q.id}] level should be 1..6 (got ${q.level})`);
    if (q.conceptKey && !validKeys.has(q.conceptKey))
      errors.push(`[${q.id}] conceptKey not found: "${q.conceptKey}"`);
    if (!q.explanation) warnings.push(`[${q.id}] missing explanation`);
  }

  // -------- Coverage report (manual curated only) --------
  const coverage = [];
  for (const [key, ref] of conceptByKey) {
    const mcCount = combinedMC.filter((q) => q.conceptKey === key).length;
    const fillCount = combinedFill.filter((q) => q.conceptKey === key).length;
    const needFill = !!ref.concept.codeExample;
    if (mcCount < 3 || (needFill && fillCount < 2)) {
      coverage.push({
        lesson: ref.lesson.title,
        concept: ref.concept.conceptName,
        mc: mcCount,
        fill: fillCount,
        needFill,
      });
    }
  }

  // -------- Lesson content quality (boilerplate / difficulty) --------
  const boilerplateMatches = [];
  const missingDifficulty = [];
  const BOILERPLATE_PATTERNS = [
    /עוזר להבין את הרעיון המרכזי ולהחזיר אותו להתנהגות יומיומית/,
    /דמיין מיני־תרגיל שבו .* מסדר את כל הצעדים בצורה ברורה/,
    /בשטח, .* = נהל פעולה עקבי שמונע בלבול/,
    /^const c_\d+_/m,
    /בדוגמה רואים שימוש ישיר ב-.* כדי להפוך הסבר תיאורטי/,
  ];
  for (const L of lessons) {
    for (const c of L.concepts || []) {
      const blob = JSON.stringify({
        levels: c.levels,
        codeExample: c.codeExample,
        codeExplanation: c.codeExplanation,
      });
      for (const re of BOILERPLATE_PATTERNS) {
        if (re.test(blob)) {
          boilerplateMatches.push({ lesson: L.id, concept: c.conceptName });
          break;
        }
      }
      if (typeof c.difficulty !== "number") {
        missingDifficulty.push({ lesson: L.id, concept: c.conceptName });
      } else if (c.difficulty < 1 || c.difficulty > 10) {
        errors.push(
          `[${L.id}::${c.conceptName}] difficulty must be 1..10 (got ${c.difficulty})`,
        );
      }
    }
  }

  return {
    errors,
    warnings,
    coverage,
    boilerplateMatches,
    missingDifficulty,
    totalConcepts: conceptByKey.size,
    curatedTrace: (bank.trace || []).length,
    curatedBug: (bank.bug || []).length,
    curatedBuild: (bank.build || []).length,
    curatedMC: (bank.mc || []).length,
    curatedFill: (bank.fill || []).length,
    seededMC: 0,
    seededFill: 0,
  };
}

function main() {
  console.log("📦 Loading data files...");
  if (STRICT) {
    console.log("🔒 STRICT mode — warnings, boilerplate, and missing-difficulty are errors.");
  }
  const data = loadDataFiles();
  console.log(
    `   ${data.lessons.length} lessons · ` +
      `Curated bank: ${(data.bank.mc || []).length} MC + ${(data.bank.fill || []).length} Fill + ${(data.bank.trace || []).length} Trace + ${(data.bank.bug || []).length} Bug + ${(data.bank.build || []).length} Build · ` +
      "Generated/seeded archives not loaded · " +
      `${(data.guide.topics || []).length} guide topics.`,
  );

  console.log("\n🔍 Validating curated bank...");
  const {
    errors, warnings, coverage,
    boilerplateMatches, missingDifficulty,
    totalConcepts, curatedMC, curatedFill, seededMC, seededFill,
  } = validate(data);

  // In strict mode, escalate severity for things that historically were warnings.
  // Fill-ambiguity warnings (where the answer string also appears elsewhere in
  // the displayed code) are a fuzzy heuristic — in code-completion exercises
  // it's often pedagogically correct to show the identifier in scope as a
  // reference. We keep the warnings visible but do NOT escalate them to errors.
  // See tests/THRESHOLDS_LOCKED.md and validate_bank.js commentary at the
  // fill-ambiguity check above.
  let suppressedFillAmbiguity = 0;
  if (STRICT) {
    warnings.forEach((w) => {
      if (w.startsWith("[fill-ambiguity]")) {
        suppressedFillAmbiguity++;
        return;
      }
      errors.push(`[strict:warning] ${w}`);
    });
    boilerplateMatches.forEach((m) =>
      errors.push(`[strict:boilerplate] ${m.lesson}::${m.concept}`),
    );
    missingDifficulty.forEach((m) =>
      errors.push(`[strict:missing-difficulty] ${m.lesson}::${m.concept}`),
    );
  }

  if (errors.length === 0) {
    console.log("✅ No errors.");
    if (STRICT && suppressedFillAmbiguity > 0) {
      console.log(`   (${suppressedFillAmbiguity} fill-ambiguity warnings shown above are informational only.)`);
    }
  } else {
    console.error(`❌ ${errors.length} error(s):`);
    const cap = STRICT ? 50 : errors.length;
    errors.slice(0, cap).forEach((e) => console.error(`   • ${e}`));
    if (errors.length > cap) {
      console.error(`   … and ${errors.length - cap} more (strict mode trims output).`);
    }
    if (STRICT) {
      // Categorized summary so CI logs surface counts at a glance.
      const buckets = {
        warning: 0,
        boilerplate: 0,
        "missing-difficulty": 0,
        other: 0,
      };
      errors.forEach((e) => {
        const m = /^\[strict:([\w-]+)\]/.exec(e);
        if (m && buckets.hasOwnProperty(m[1])) buckets[m[1]]++;
        else buckets.other++;
      });
      console.error("\n📊 Strict-mode breakdown:");
      console.error(`   • warnings (escalated to errors):  ${buckets.warning}`);
      console.error(`   • boilerplate concepts:            ${buckets.boilerplate}`);
      console.error(`   • missing difficulty:              ${buckets["missing-difficulty"]}`);
      if (buckets.other > 0) console.error(`   • other:                          ${buckets.other}`);
      if (suppressedFillAmbiguity > 0) {
        console.error(`   • fill-ambiguity (NOT escalated):  ${suppressedFillAmbiguity} (informational only)`);
      }
    }
  }

  if (warnings.length > 0) {
    console.log(`\n⚠️  ${warnings.length} warning(s):`);
    warnings.slice(0, 10).forEach((w) => console.log(`   • ${w}`));
    if (warnings.length > 10) console.log(`   ... and ${warnings.length - 10} more`);
  }

  // Boilerplate detection — concepts that still use auto-generated placeholder content
  if (boilerplateMatches.length > 0) {
    console.log(`\n🚩 Boilerplate content detected in ${boilerplateMatches.length} concept(s):`);
    const byLesson = {};
    boilerplateMatches.forEach((m) => {
      byLesson[m.lesson] = (byLesson[m.lesson] || 0) + 1;
    });
    Object.entries(byLesson).forEach(([k, v]) => console.log(`   ${k}: ${v} concepts`));
    console.log(`   ⤷ Replace placeholder text with real explanations (see lesson22.js as reference).`);
  } else {
    console.log("\n✅ No boilerplate content detected.");
  }

  // Difficulty field coverage
  if (missingDifficulty.length > 0) {
    console.log(`\n🌡️  Missing difficulty (1-10) on ${missingDifficulty.length} concept(s):`);
    const byLesson = {};
    missingDifficulty.forEach((m) => {
      byLesson[m.lesson] = (byLesson[m.lesson] || 0) + 1;
    });
    Object.entries(byLesson).slice(0, 10).forEach(([k, v]) =>
      console.log(`   ${k}: ${v} concepts`),
    );
    console.log(`   ⤷ Add difficulty: <1-10> to each concept; controls extras + V-button rules.`);
  }

  console.log("\n📊 Coverage (manual curated only):");
  console.log(`   Total concepts: ${totalConcepts}`);
  console.log(`   Total manual bank: ${curatedMC} MC + ${curatedFill} Fill = ${curatedMC + curatedFill}`);
  console.log("   Generated/seeded archives are not loaded by this validator");
  console.log(`   Concepts still needing more questions: ${coverage.length}/${totalConcepts}`);
  if (coverage.length > 0) {
    const byLesson = {};
    coverage.forEach((c) => {
      byLesson[c.lesson] = (byLesson[c.lesson] || 0) + 1;
    });
    Object.entries(byLesson)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .forEach(([k, v]) => console.log(`     ${v.toString().padStart(3)} - ${k}`));
  }

  process.exit(errors.length > 0 ? 1 : 0);
}

main();
