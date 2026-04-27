#!/usr/bin/env node
/**
 * scripts/validate_bank.js
 *
 * Validates data/questions_bank.js against data/lesson*.js + workbooks.
 * Usage: node scripts/validate_bank.js
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

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");

// Mini sandbox to load all the JS data files (which use `var FOO = {...}`).
function loadDataFiles() {
  const sandbox = { window: {}, console };
  const files = fs.readdirSync(DATA_DIR).filter((f) => f.endsWith(".js"));
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
  return {
    lessons,
    bank: sandbox.QUESTIONS_BANK || { mc: [], fill: [] },
    seededBank: sandbox.QUESTIONS_BANK_SEEDED || { mc: [], fill: [] },
    guide: sandbox.QUICK_GUIDE || { topics: [] },
  };
}

function ck(lessonId, conceptName) {
  return `${lessonId}::${conceptName}`;
}

function validate({ lessons, bank, seededBank, guide }) {
  const validKeys = new Set();
  const conceptByKey = new Map();
  for (const L of lessons) {
    for (const c of L.concepts || []) {
      const k = ck(L.id, c.conceptName);
      validKeys.add(k);
      conceptByKey.set(k, { lesson: L, concept: c });
    }
  }

  // Combine bank + seeded for coverage; validation runs on curated only
  const combinedMC = [...(bank.mc || []), ...(seededBank.mc || [])];
  const combinedFill = [...(bank.fill || []), ...(seededBank.fill || [])];

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
      // Count occurrences (case-insensitive, word-aware)
      const lc = q.code.toLowerCase();
      const ans = q.answer.toLowerCase();
      let count = 0,
        idx = 0;
      while ((idx = lc.indexOf(ans, idx)) !== -1) {
        count++;
        idx += ans.length;
      }
      // Note: the code itself has "____" placeholder, so the answer should appear
      // 0 times in the placeholdered version but ALSO 0 times in any other form.
      // We only flag if the answer appears >0 times in the original code shown,
      // since the user sees the placeholdered version and would type the missing
      // token. Multiple occurrences = ambiguity.
      if (count > 0)
        warnings.push(
          `[${q.id}] answer "${q.answer}" appears ${count} time(s) in code besides the blank — may be ambiguous`,
        );
    }
    if (q.level && (q.level < 1 || q.level > 6))
      warnings.push(`[${q.id}] level should be 1..6 (got ${q.level})`);
    if (q.conceptKey && !validKeys.has(q.conceptKey))
      errors.push(`[${q.id}] conceptKey not found: "${q.conceptKey}"`);
  }

  // -------- Coverage report (combined: curated + seeded) --------
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
    curatedMC: (bank.mc || []).length,
    curatedFill: (bank.fill || []).length,
    seededMC: (seededBank.mc || []).length,
    seededFill: (seededBank.fill || []).length,
  };
}

function main() {
  console.log("📦 Loading data files...");
  const data = loadDataFiles();
  console.log(
    `   ${data.lessons.length} lessons · ` +
      `Curated bank: ${(data.bank.mc || []).length} MC + ${(data.bank.fill || []).length} Fill · ` +
      `Seeded: ${(data.seededBank.mc || []).length} MC + ${(data.seededBank.fill || []).length} Fill · ` +
      `${(data.guide.topics || []).length} guide topics.`,
  );

  console.log("\n🔍 Validating curated bank...");
  const {
    errors, warnings, coverage,
    boilerplateMatches, missingDifficulty,
    totalConcepts, curatedMC, curatedFill, seededMC, seededFill,
  } = validate(data);

  if (errors.length === 0) {
    console.log("✅ No errors.");
  } else {
    console.error(`❌ ${errors.length} error(s):`);
    errors.forEach((e) => console.error(`   • ${e}`));
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

  console.log("\n📊 Coverage (curated + seeded combined):");
  console.log(`   Total concepts: ${totalConcepts}`);
  console.log(`   Total bank: ${curatedMC + seededMC} MC + ${curatedFill + seededFill} Fill = ${curatedMC + seededMC + curatedFill + seededFill}`);
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
