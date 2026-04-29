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
  return (
    lv.junior ||
    lv.student ||
    lv.professor ||
    lv.soldier ||
    lv.child ||
    lv.grandma ||
    concept.simpleExplanation ||
    concept.whyFullStack ||
    concept.commonMistake ||
    ""
  );
}

function shuffle(arr) {
  return RNG.shuffle(arr);
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function countTokenOccurrences(text, token) {
  if (!text || !token) return 0;
  const haystack = String(text).toLowerCase();
  const needle = String(token).toLowerCase();
  let count = 0;
  let index = 0;
  while ((index = haystack.indexOf(needle, index)) !== -1) {
    count++;
    index += needle.length;
  }
  return count;
}

function blankTokenOnce(code, token, matcher) {
  if (!code || !token) return null;
  if (countTokenOccurrences(code, token) !== 1) return null;
  const re = matcher || new RegExp(`\\b(${escapeRegex(token)})\\b`, "i");
  const m = code.match(re);
  if (!m) return null;
  const answer = m[0];
  if (answer.length < 2 || answer.length > 24) return null;
  const blanked = code.replace(re, "____");
  if (countTokenOccurrences(blanked, answer) > 0) return null;
  return { answer, blanked };
}

function cleanSnippet(text, max = 120) {
  return String(text || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
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

function collectCodeFills(concept) {
  const code = concept.codeExample;
  if (!code || code.length < 8) return [];
  const name = (concept.conceptName || "").trim();
  if (!name) return [];
  const fills = [];
  const seen = new Set();

  function addFill(token, matcher) {
    const fill = blankTokenOnce(code, token, matcher);
    if (!fill) return;
    const signature = `${fill.answer}::${fill.blanked}`;
    if (seen.has(signature)) return;
    seen.add(signature);
    fills.push(fill);
  }

  // 1) concept name as token (or word part)
  const words = name.split(/[\s\-_]+/).filter((w) => w.length >= 3);
  for (const w of words) {
    const re = new RegExp(`\\b(${escapeRegex(w)})\\b`, "i");
    addFill(w, re);
  }
  // 2) Priority keywords
  const tokens = code.match(/[A-Za-z_$][A-Za-z0-9_$]+/g) || [];
  const priorityHits = [...new Set(tokens.filter((t) => FILL_PRIORITY.has(t)))].filter((t) => countTokenOccurrences(code, t) === 1);
  priorityHits.forEach((token) => addFill(token));
  // 3) Fallback identifier
  const skip = new Set(["console", "log", "document", "window", "true", "false", "null", "undefined", "if", "else", "for", "while"]);
  const candidates = [...new Set(tokens.filter((t) => !skip.has(t) && t.length >= 4 && t.length <= 18))]
    .filter((t) => countTokenOccurrences(code, t) === 1);
  candidates.forEach((token) => addFill(token));
  const conceptName = name.length >= 2 && name.length <= 24 ? name : "";
  if (conceptName) {
    const answerPattern = new RegExp(escapeRegex(conceptName), "gi");
    const explanation = cleanSnippet(bestExplanation(concept).replace(answerPattern, "המושג"), 140);
    const codeCue = cleanSnippet(code.replace(answerPattern, "המושג"), 140);
    const pseudoCode = [
      `// מושג: ____`,
      `// רמז מהקוד: ${codeCue || "קוד קצר שמדגים את המושג"}`,
      `// הסבר: ${explanation || "המושג הוא החלק המרכזי שמודגם כאן"}`,
    ].join("\n");
    const signature = `${conceptName}::${pseudoCode}`;
    if (!seen.has(signature)) {
      seen.add(signature);
      fills.push({ answer: conceptName, blanked: pseudoCode });
    }
  }
  return fills;
}

function makeCodeFill(concept, variantIndex = 0) {
  const fills = collectCodeFills(concept);
  if (fills.length === 0) return null;
  return fills[variantIndex % fills.length];
}

// =================== Question generators ===================

// Pool: all concepts with usable explanations
function buildPool(lessons) {
  const pool = [];
  lessons.forEach((L) => {
    (L.concepts || []).forEach((c) => {
      if (bestExplanation(c)) {
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

function uniqueOptionSet(correct, distractors) {
  const values = [correct, ...distractors].map((value) => String(value || "").trim());
  const seen = new Set(values.map((value) => value.toLowerCase()));
  if (seen.size !== values.length) return null;
  if (values.some(hasGenericCue)) return null;
  for (let i = 0; i < values.length; i++) {
    for (let j = i + 1; j < values.length; j++) {
      if (nearDuplicateOption(values[i], values[j])) return null;
    }
  }
  if (hasLengthCue(values)) return null;
  return values;
}

function hasGenericCue(value) {
  return [
    /כל התשובות/i,
    /כל האפשרויות/i,
    /אף תשובה/i,
    /אין תשובה/i,
    /תמיד/i,
    /אף פעם/i,
  ].some((pattern) => pattern.test(String(value || "")));
}

function normalizeOptionText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[\u0591-\u05C7]/g, "")
    .replace(/[.,:;!?'"`()\[\]{}<>/\\|*_+=~`׳״״]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function optionTokens(value) {
  return normalizeOptionText(value)
    .split(" ")
    .filter((token) => token.length > 1);
}

function nearDuplicateOption(a, b) {
  const left = new Set(optionTokens(a));
  const right = new Set(optionTokens(b));
  if (Math.min(left.size, right.size) < 4) return false;
  let intersection = 0;
  left.forEach((token) => {
    if (right.has(token)) intersection++;
  });
  const similarity = intersection / (left.size + right.size - intersection || 1);
  return similarity >= 0.86;
}

function hasLengthCue(values) {
  const lengths = values.map((value) => normalizeOptionText(value).length).filter(Boolean);
  if (lengths.length !== values.length) return true;
  const min = Math.min(...lengths);
  const max = Math.max(...lengths);
  return min > 0 && max / min >= 4.2;
}

let mcSeq = 0;
let fillSeq = 0;

function optionFeedbackFor(conceptName, options, correctIndex, explanation) {
  return options.map((option, index) => {
    if (index === correctIndex) {
      return `✅ נכון: ${explanation || conceptName}`;
    }
    return `❌ "${option}" לא מתאים כאן. השאלה בודקת את "${conceptName}", לכן צריך להתאים בין ההגדרה/הקוד לבין המושג המדויק ולא לבחור מושג דומה.`;
  });
}

// MC type 1 — describe (concept → explanation at level)
function genDescribeMC(lesson, concept, pool, level) {
  const lvKey = LEVEL_KEYS[level];
  const correct = concept.levels?.[lvKey] || bestExplanation(concept);
  if (!correct) return null;
  const distractors = pickDistractors(pool, concept.conceptName, 3, (c) => c.levels?.[lvKey] || bestExplanation(c));
  if (distractors.length < 3) return null;
  const optionSet = uniqueOptionSet(correct, distractors);
  if (!optionSet) return null;
  const opts = shuffle(optionSet);
  const correctIndex = opts.indexOf(correct);
  const explanation = `${concept.conceptName}: ${correct}`;
  return {
    id: `mc_seed_${++mcSeq}`,
    topicId: `topic_seed_${lesson.id}`,
    conceptKey: ck(lesson.id, concept.conceptName),
    level,
    question: `איזה מהמשפטים מתאר נכון את "${concept.conceptName}" ברמת ${LEVEL_LABELS[level]}?`,
    options: opts,
    correctIndex,
    explanation,
    optionFeedback: optionFeedbackFor(concept.conceptName, opts, correctIndex, explanation),
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
  const optionSet = uniqueOptionSet(concept.conceptName, distractors);
  if (!optionSet) return null;
  const opts = shuffle(optionSet);
  const correctIndex = opts.indexOf(concept.conceptName);
  const explanationLine = `המושג: ${concept.conceptName}.`;
  return {
    id: `mc_seed_${++mcSeq}`,
    topicId: `topic_seed_${lesson.id}`,
    conceptKey: ck(lesson.id, concept.conceptName),
    level,
    question: `איזה מושג מתאים להגדרה הבאה (ברמת ${LEVEL_LABELS[level]})?\n\n"${explanation}"`,
    options: opts,
    correctIndex,
    explanation: explanationLine,
    optionFeedback: optionFeedbackFor(concept.conceptName, opts, correctIndex, explanationLine),
    _seeded: true,
  };
}

// MC type 3 — code → concept (only if has codeExample)
function genCodeMatchMC(lesson, concept, pool) {
  if (!concept.codeExample) return null;
  const distractors = pickDistractors(pool, concept.conceptName, 3, (c) => c.conceptName);
  if (distractors.length < 3) return null;
  const optionSet = uniqueOptionSet(concept.conceptName, distractors);
  if (!optionSet) return null;
  const opts = shuffle(optionSet);
  const correctIndex = opts.indexOf(concept.conceptName);
  const explanation = `${concept.conceptName} — ${concept.codeExplanation || bestExplanation(concept)}`;
  return {
    id: `mc_seed_${++mcSeq}`,
    topicId: `topic_seed_${lesson.id}`,
    conceptKey: ck(lesson.id, concept.conceptName),
    level: 4,
    question: `איזה מושג מתואר/מודגם בקטע הקוד הבא?`,
    codeBlock: concept.codeExample,
    options: opts,
    correctIndex,
    explanation,
    optionFeedback: optionFeedbackFor(concept.conceptName, opts, correctIndex, explanation),
    _seeded: true,
  };
}

function genRoleMC(lesson, concept, variantIndex) {
  const conceptName = concept.conceptName;
  const explanation = cleanSnippet(concept.codeExplanation || bestExplanation(concept), 180);
  if (!conceptName || !explanation) return null;
  const correct = `הוא החלק שמממש כאן את הרעיון של ${conceptName} בקוד.`;
  const distractorSets = [
    [
      "זה רק שם קישוטי שאין לו משמעות בזמן הריצה.",
      "זה סימן שצריך למחוק כדי שהקוד יעבוד.",
      "זה תמיד מחליף את כל שאר השורות בקובץ.",
    ],
    [
      "זה אחראי רק לצבעים ולמרווחים במסך.",
      "זה ערך מקרי שלא משפיע על הלוגיקה בכלל.",
      "זה מנגנון שמבטל את הצורך להבין את הקוד.",
    ],
    [
      "זה רק הערה לקורא ולא חלק מההתנהגות.",
      "זה תמיד פעולה של מסד נתונים בלבד.",
      "זה תמיד שייך ל-CSS ולא ל-JavaScript.",
    ],
  ];
  const distractors = distractorSets[variantIndex % distractorSets.length];
  const optionSet = uniqueOptionSet(correct, distractors);
  if (!optionSet) return null;
  const opts = shuffle(optionSet);
  const correctIndex = opts.indexOf(correct);
  const explanationLine = `${conceptName}: ${explanation}`;
  return {
    id: `mc_seed_${++mcSeq}`,
    topicId: `topic_seed_${lesson.id}`,
    conceptKey: ck(lesson.id, concept.conceptName),
    level: 5,
    question: `מה התפקיד של "${conceptName}" בדוגמה או בהסבר של השיעור?`,
    codeBlock: concept.codeExample || undefined,
    options: opts,
    correctIndex,
    explanation: explanationLine,
    optionFeedback: optionFeedbackFor(conceptName, opts, correctIndex, explanationLine),
    _seeded: true,
  };
}

// Fill — code completion
function genFill(lesson, concept, level, variantIndex) {
  const fill = makeCodeFill(concept, variantIndex);
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
      () => genRoleMC(lesson, concept, g),
    ];
    const levels = [2, 4, 5]; // try grandma-ish, mid, advanced
    let g = 0;
    let genTries = 0;
    while (
      seededMC.filter((q) => q.conceptKey === key).length < mcNeeded &&
      genTries < 24
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
      fillTries < 8
    ) {
      const lvl = 3 + (fillTries % 3); // 3, 4, 5
      const q = genFill(lesson, concept, lvl, fillTries);
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
