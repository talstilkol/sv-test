#!/usr/bin/env node
/**
 * scripts/seed_questions.js
 *
 * Generates draft MC + Fill questions for every concept that doesn't yet
 * have full bank coverage (≥3 MC, ≥2 Fill where codeExample exists).
 *
 * Output: data/questions_bank_seeded.js  (contains `var QUESTIONS_BANK_SEEDED = {...}`)
 * The seeded bank is loaded alongside the hand-curated bank by content-loader.js.
 *
 * Usage:  node scripts/seed_questions.js
 */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const RNG_LIB = require("../lib/rng.js");

// Allow deterministic re-runs:  node scripts/seed_questions.js --seed 42
const SEED_FLAG_IDX = process.argv.indexOf("--seed");
const SEED =
  SEED_FLAG_IDX !== -1 && process.argv[SEED_FLAG_IDX + 1] !== undefined
    ? process.argv[SEED_FLAG_IDX + 1]
    : "seed-questions:v2.0.0";
const RNG = RNG_LIB.create(SEED);

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const OUT_FILE = path.join(DATA_DIR, "questions_bank_seeded.js");

// =================== Load data ===================
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
  const lessons = [];
  for (const k of Object.keys(sandbox)) {
    const v = sandbox[k];
    if (v && typeof v === "object" && typeof v.id === "string" && Array.isArray(v.concepts)) {
      lessons.push(v);
    }
  }
  return {
    lessons,
    bank: sandbox.QUESTIONS_BANK || { mc: [], fill: [] },
  };
}

// =================== Helpers ===================
const LEVEL_KEYS = [null, "grandma", "child", "soldier", "student", "junior", "professor"];
const LEVEL_LABELS = {
  1: "👵 סבתא",
  2: "🧒 כיתה א'",
  3: "🪖 חייל",
  4: "🎓 סטודנט",
  5: "💻 ג'וניור",
  6: "🔬 פרופ׳",
};

function ck(lessonId, conceptName) {
  return `${lessonId}::${conceptName}`;
}

function bestExplanation(concept) {
  const lv = concept.levels || {};
  return lv.junior || lv.student || lv.professor || lv.soldier || lv.child || lv.grandma || "";
}

function shuffle(arr) {
  return RNG.shuffle(arr);
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Common JS/React keywords/methods worth blanking out (mirrors app.js)
const FILL_PRIORITY = new Set([
  "useState", "useEffect", "useRef", "useMemo", "useCallback", "useContext",
  "useReducer", "createContext", "Provider", "memo", "forwardRef",
  "map", "filter", "reduce", "forEach", "find", "some", "every", "includes",
  "push", "pop", "shift", "unshift", "splice", "slice", "concat", "sort",
  "async", "await", "Promise", "then", "catch", "finally", "resolve", "reject",
  "fetch", "json", "addEventListener", "querySelector", "createElement",
  "const", "let", "var", "return", "function", "class", "extends", "super",
  "import", "export", "default", "from", "as",
  "true", "false", "null", "undefined",
  "this", "new", "delete", "typeof", "instanceof",
  "props", "state", "children", "key", "ref",
]);

function makeCodeFill(concept) {
  const code = concept.codeExample;
  if (!code || code.length < 8) return null;
  const name = (concept.conceptName || "").trim();
  if (!name) return null;

  // 1) concept name as token (or word part)
  const words = name.split(/[\s\-_]+/).filter((w) => w.length >= 3);
  for (const w of words) {
    const re = new RegExp(`\\b(${escapeRegex(w)})\\b`, "i");
    const m = code.match(re);
    if (m) {
      const answer = m[0];
      if (answer.length < 2 || answer.length > 24) continue;
      const blanked = code.replace(re, "____");
      return { answer, blanked };
    }
  }
  // 2) Priority keywords
  const tokens = code.match(/[A-Za-z_$][A-Za-z0-9_$]+/g) || [];
  const priorityHits = tokens.filter((t) => FILL_PRIORITY.has(t));
  if (priorityHits.length > 0) {
    const chosen = priorityHits[RNG.int(priorityHits.length)];
    const idx = code.indexOf(chosen);
    if (idx !== -1) {
      const blanked = code.substring(0, idx) + "____" + code.substring(idx + chosen.length);
      return { answer: chosen, blanked };
    }
  }
  // 3) Fallback identifier
  const skip = new Set(["console", "log", "document", "window", "true", "false", "null", "undefined", "if", "else", "for", "while"]);
  const candidates = tokens.filter((t) => !skip.has(t) && t.length >= 4 && t.length <= 18);
  if (candidates.length === 0) return null;
  const chosen = candidates[RNG.int(candidates.length)];
  const idx = code.indexOf(chosen);
  if (idx === -1) return null;
  const blanked = code.substring(0, idx) + "____" + code.substring(idx + chosen.length);
  return { answer: chosen, blanked };
}

// =================== Question generators ===================

// Pool: all concepts with usable explanations
function buildPool(lessons) {
  const pool = [];
  lessons.forEach((L) => {
    (L.concepts || []).forEach((c) => {
      if (c.levels && (c.levels.junior || c.levels.student || c.levels.grandma)) {
        pool.push({ lesson: L, concept: c });
      }
    });
  });
  return pool;
}

function pickDistractors(pool, currentConceptName, n, accessor) {
  const seen = new Set();
  const arr = shuffle(pool.filter((p) => p.concept.conceptName !== currentConceptName));
  const out = [];
  for (const item of arr) {
    const v = accessor(item.concept);
    if (!v || seen.has(v)) continue;
    seen.add(v);
    out.push(v);
    if (out.length >= n) break;
  }
  return out;
}

let mcSeq = 0;
let fillSeq = 0;

// MC type 1 — describe (concept → explanation at level)
function genDescribeMC(lesson, concept, pool, level) {
  const lvKey = LEVEL_KEYS[level];
  const correct = concept.levels?.[lvKey];
  if (!correct) return null;
  const distractors = pickDistractors(pool, concept.conceptName, 3, (c) => c.levels?.[lvKey] || bestExplanation(c));
  if (distractors.length < 3) return null;
  const opts = shuffle([correct, ...distractors]);
  return {
    id: `mc_seed_${++mcSeq}`,
    topicId: `topic_seed_${lesson.id}`,
    conceptKey: ck(lesson.id, concept.conceptName),
    level,
    question: `איזה מהמשפטים מתאר נכון את "${concept.conceptName}" ברמת ${LEVEL_LABELS[level]}?`,
    options: opts,
    correctIndex: opts.indexOf(correct),
    explanation: `${concept.conceptName}: ${correct}`,
    _seeded: true,
  };
}

// MC type 2 — name-match (explanation → concept name)
function genNameMatchMC(lesson, concept, pool, level) {
  const lvKey = LEVEL_KEYS[level];
  const explanation = concept.levels?.[lvKey] || bestExplanation(concept);
  if (!explanation) return null;
  const distractors = pickDistractors(pool, concept.conceptName, 3, (c) => c.conceptName);
  if (distractors.length < 3) return null;
  const opts = shuffle([concept.conceptName, ...distractors]);
  return {
    id: `mc_seed_${++mcSeq}`,
    topicId: `topic_seed_${lesson.id}`,
    conceptKey: ck(lesson.id, concept.conceptName),
    level,
    question: `איזה מושג מתאים להגדרה הבאה (ברמת ${LEVEL_LABELS[level]})?\n\n"${explanation}"`,
    options: opts,
    correctIndex: opts.indexOf(concept.conceptName),
    explanation: `המושג: ${concept.conceptName}.`,
    _seeded: true,
  };
}

// MC type 3 — code → concept (only if has codeExample)
function genCodeMatchMC(lesson, concept, pool) {
  if (!concept.codeExample) return null;
  const distractors = pickDistractors(pool, concept.conceptName, 3, (c) => c.conceptName);
  if (distractors.length < 3) return null;
  const opts = shuffle([concept.conceptName, ...distractors]);
  return {
    id: `mc_seed_${++mcSeq}`,
    topicId: `topic_seed_${lesson.id}`,
    conceptKey: ck(lesson.id, concept.conceptName),
    level: 4,
    question: `איזה מושג מתואר/מודגם בקטע הקוד הבא?`,
    codeBlock: concept.codeExample,
    options: opts,
    correctIndex: opts.indexOf(concept.conceptName),
    explanation: `${concept.conceptName} — ${concept.codeExplanation || bestExplanation(concept)}`,
    _seeded: true,
  };
}

// Fill — code completion
function genFill(lesson, concept, level) {
  const fill = makeCodeFill(concept);
  if (!fill) return null;
  return {
    id: `fill_seed_${++fillSeq}`,
    topicId: `topic_seed_${lesson.id}`,
    conceptKey: ck(lesson.id, concept.conceptName),
    level,
    code: fill.blanked,
    answer: fill.answer,
    hint: `אורך התשובה: ${fill.answer.length} תווים. אות ראשונה: "${fill.answer[0]}".`,
    explanation: `התשובה: ${fill.answer}. ${concept.codeExplanation || bestExplanation(concept) || ""}`.trim(),
    _seeded: true,
  };
}

// =================== Main ===================
function main() {
  console.log("📦 Loading data...");
  const { lessons, bank } = loadDataFiles();

  const pool = buildPool(lessons);
  console.log(`   ${lessons.length} lessons · ${pool.length} concepts with usable explanations`);

  // Existing coverage (so we don't over-generate where there's already enough)
  const existingMC = new Map();
  const existingFill = new Map();
  (bank.mc || []).forEach((q) => {
    if (!q.conceptKey) return;
    existingMC.set(q.conceptKey, (existingMC.get(q.conceptKey) || 0) + 1);
  });
  (bank.fill || []).forEach((q) => {
    if (!q.conceptKey) return;
    existingFill.set(q.conceptKey, (existingFill.get(q.conceptKey) || 0) + 1);
  });

  const seededMC = [];
  const seededFill = [];
  const TARGET_MC = 3;
  const TARGET_FILL = 2;

  pool.forEach(({ lesson, concept }) => {
    const key = ck(lesson.id, concept.conceptName);
    const mcExisting = existingMC.get(key) || 0;
    const fillExisting = existingFill.get(key) || 0;
    const mcNeeded = Math.max(0, TARGET_MC - mcExisting);
    const fillNeeded = !concept.codeExample
      ? 0
      : Math.max(0, TARGET_FILL - fillExisting);

    // ----- MC generation: alternate between describe/name-match/code-match across levels -----
    const generators = [
      (lvl) => genDescribeMC(lesson, concept, pool, lvl),
      (lvl) => genNameMatchMC(lesson, concept, pool, lvl),
      () => genCodeMatchMC(lesson, concept, pool),
    ];
    const levels = [2, 4, 5]; // try grandma-ish, mid, advanced
    let g = 0;
    let genTries = 0;
    while (
      seededMC.filter((q) => q.conceptKey === key).length < mcNeeded &&
      genTries < 12
    ) {
      const gen = generators[g % generators.length];
      const lvl = levels[g % levels.length];
      const q = gen(lvl);
      if (q) {
        // Avoid pushing duplicates by question text
        const dupe = seededMC.some(
          (other) => other.conceptKey === key && other.question === q.question,
        );
        if (!dupe) seededMC.push(q);
      }
      g++;
      genTries++;
    }

    // ----- Fill generation -----
    let fillTries = 0;
    while (
      seededFill.filter((q) => q.conceptKey === key).length < fillNeeded &&
      fillTries < 5
    ) {
      const lvl = 3 + (fillTries % 3); // 3, 4, 5
      const q = genFill(lesson, concept, lvl);
      if (q) {
        const dupe = seededFill.some(
          (other) => other.conceptKey === key && other.code === q.code,
        );
        if (!dupe) seededFill.push(q);
      }
      fillTries++;
    }
  });

  // ----- Write the seeded bank file -----
  const header = `// data/questions_bank_seeded.js
// 🤖 AUTO-GENERATED — do not edit by hand.
// Generated: ${new Date().toISOString()}
// Run: node scripts/seed_questions.js
//
// These are *draft* questions automatically derived from concept explanations.
// They expand the live bank coverage so every concept has at least 3 MC + 2 Fill.
// Promote any of these to data/questions_bank.js to mark them as hand-curated.
var QUESTIONS_BANK_SEEDED = ${JSON.stringify({ mc: seededMC, fill: seededFill }, null, 2)};
`;

  fs.writeFileSync(OUT_FILE, header, "utf8");
  console.log(`\n✅ Wrote ${OUT_FILE}`);
  console.log(`   MC seeded: ${seededMC.length}`);
  console.log(`   Fill seeded: ${seededFill.length}`);
  console.log(`   Total: ${seededMC.length + seededFill.length} questions added to coverage.`);

  // Coverage summary
  const totalConcepts = pool.length;
  const concepts3MC = pool.filter(
    ({ lesson, concept }) =>
      (existingMC.get(ck(lesson.id, concept.conceptName)) || 0) +
        seededMC.filter((q) => q.conceptKey === ck(lesson.id, concept.conceptName))
          .length >=
      3,
  ).length;
  console.log(`\n📊 Coverage projection:`);
  console.log(`   Concepts with ≥3 MC (after seed): ${concepts3MC}/${totalConcepts}`);
  const totalQuestionsAfter =
    (bank.mc || []).length +
    (bank.fill || []).length +
    seededMC.length +
    seededFill.length;
  console.log(`   Total bank size after seed: ${totalQuestionsAfter} questions`);
}

main();
