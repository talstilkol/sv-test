#!/usr/bin/env node
// Generate mock exam variants from manual question bank.
// Output: docs/exam-prep/mock_exam_<n>.md
// Deterministic — uses concept-keyed seeding (no native randomness).

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { byFilename } = require("./lib/sort.js");

const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "docs", "exam-prep");

function loadBank() {
  const code = fs.readFileSync(path.join(ROOT, "data", "questions_bank.js"), "utf8");
  const sandbox = { module: { exports: {} } };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  return sandbox.QUESTIONS_BANK;
}

// Deterministic shuffle using concept-key based hashing.
function deterministicSort(items, salt) {
  return [...items].sort((a, b) => {
    const ka = `${salt}:${a.id || a.conceptKey || ""}`;
    const kb = `${salt}:${b.id || b.conceptKey || ""}`;
    return byFilename(ka, kb);
  });
}

function pickByDifficulty(questions, count, difficultyTarget) {
  // difficultyTarget: 'easy' (1-3), 'mid' (4-6), 'hard' (7-10), 'mixed'
  let pool = questions;
  if (difficultyTarget === "easy") {
    pool = questions.filter((q) => (q.difficulty || 5) <= 3);
  } else if (difficultyTarget === "mid") {
    pool = questions.filter((q) => {
      const d = q.difficulty || 5;
      return d >= 4 && d <= 6;
    });
  } else if (difficultyTarget === "hard") {
    pool = questions.filter((q) => (q.difficulty || 5) >= 7);
  }
  // If pool too small, fall back to all
  if (pool.length < count) pool = questions;
  return pool.slice(0, count);
}

function balanceByConcept(questions, count) {
  // Group by conceptKey, take 1 per concept first, then fill the rest
  const byConcept = {};
  questions.forEach((q) => {
    const key = q.conceptKey || "uncategorized";
    if (!byConcept[key]) byConcept[key] = [];
    byConcept[key].push(q);
  });
  const concepts = Object.keys(byConcept);
  const result = [];
  let pass = 0;
  while (result.length < count && pass < 20) {
    concepts.forEach((c) => {
      if (result.length < count && byConcept[c][pass]) {
        result.push(byConcept[c][pass]);
      }
    });
    pass += 1;
  }
  return result;
}

function generateMockExam(bank, variant) {
  const { name, mcCount, fillCount, difficulty, salt } = variant;
  const sortedMc = deterministicSort(bank.mc, salt);
  const sortedFill = deterministicSort(bank.fill, salt);

  // Apply difficulty filter, then balance by concept
  const mcPool = difficulty === "mixed" ? sortedMc : pickByDifficulty(sortedMc, sortedMc.length, difficulty);
  const fillPool = difficulty === "mixed" ? sortedFill : pickByDifficulty(sortedFill, sortedFill.length, difficulty);

  const selectedMc = balanceByConcept(mcPool, mcCount);
  const selectedFill = balanceByConcept(fillPool, fillCount);

  return { name, mc: selectedMc, fill: selectedFill };
}

function renderMockExam(exam, variantNumber) {
  const lines = [];
  lines.push(`# מבחן מדומה #${variantNumber} — ${exam.name}`);
  lines.push("");
  lines.push(`**כמות שאלות:** ${exam.mc.length} MC + ${exam.fill.length} Fill = ${exam.mc.length + exam.fill.length} סה"כ`);
  lines.push("");
  lines.push("**זמן מומלץ:** 90 דקות (1.5 דקות לשאלה)");
  lines.push("");
  lines.push("**הוראות:**");
  lines.push("1. ענה על כל השאלות. אל תשאיר ריקות.");
  lines.push("2. בשאלות MC — סמן רק תשובה אחת.");
  lines.push("3. בשאלות Fill — מלא את החסר.");
  lines.push("4. שמור על הזמן.");
  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push("## חלק א' — שאלות אמריקאיות (MC)");
  lines.push("");

  exam.mc.forEach((q, idx) => {
    lines.push(`### ${idx + 1}. ${q.question || q.prompt || "(שאלה ללא טקסט)"}`);
    lines.push("");
    if (q.code || q.codeBlock) {
      lines.push("```");
      lines.push(q.code || q.codeBlock);
      lines.push("```");
      lines.push("");
    }
    if (q.options && Array.isArray(q.options)) {
      q.options.forEach((opt, oi) => {
        lines.push(`- [ ] ${String.fromCharCode(65 + oi)}. ${opt}`);
      });
    }
    if (q.conceptKey) {
      lines.push("");
      lines.push(`<small>נושא: ${q.conceptKey}</small>`);
    }
    lines.push("");
  });

  lines.push("---");
  lines.push("");
  lines.push("## חלק ב' — שאלות השלמה (Fill)");
  lines.push("");

  exam.fill.forEach((q, idx) => {
    lines.push(`### ${idx + 1}. ${q.prompt || q.question || ""}`);
    lines.push("");
    if (q.code || q.codeBlock) {
      lines.push("```");
      lines.push(q.code || q.codeBlock);
      lines.push("```");
      lines.push("");
    }
    if (q.hint) {
      lines.push(`*רמז: ${q.hint}*`);
      lines.push("");
    }
    lines.push("**תשובה:** ____________________");
    lines.push("");
    if (q.conceptKey) {
      lines.push(`<small>נושא: ${q.conceptKey}</small>`);
      lines.push("");
    }
  });

  lines.push("---");
  lines.push("");
  lines.push("## מפתח תשובות");
  lines.push("");
  lines.push("**MC:**");
  lines.push("");
  exam.mc.forEach((q, idx) => {
    const correctIdx = q.correct ?? q.correctIndex ?? 0;
    const letter = String.fromCharCode(65 + correctIdx);
    lines.push(`${idx + 1}. ${letter}${q.options && q.options[correctIdx] ? " — " + q.options[correctIdx] : ""}`);
    if (q.explanation) {
      lines.push(`   *הסבר:* ${q.explanation}`);
    }
  });
  lines.push("");
  lines.push("**Fill:**");
  lines.push("");
  exam.fill.forEach((q, idx) => {
    const answer = q.answer || q.answers?.[0] || "(תשובה לא מוגדרת)";
    lines.push(`${idx + 1}. \`${answer}\``);
    if (q.explanation) {
      lines.push(`   *הסבר:* ${q.explanation}`);
    }
  });
  lines.push("");
  lines.push(`**עודכן אוטומטית:** ${new Date().toISOString()}`);
  return lines.join("\n");
}

function main() {
  const bank = loadBank();
  console.log(`Loaded ${bank.mc.length} MC + ${bank.fill.length} Fill = ${bank.mc.length + bank.fill.length} questions`);

  const variants = [
    { name: "מבחן מאוזן", mcCount: 40, fillCount: 20, difficulty: "mixed", salt: "v1-balanced" },
    { name: "מבחן קל יותר", mcCount: 40, fillCount: 20, difficulty: "easy", salt: "v2-easy" },
    { name: "מבחן בינוני", mcCount: 40, fillCount: 20, difficulty: "mid", salt: "v3-mid" },
    { name: "מבחן קשה במיוחד", mcCount: 40, fillCount: 20, difficulty: "hard", salt: "v4-hard" },
    { name: "מבחן מקיף — מאוזן שני", mcCount: 40, fillCount: 20, difficulty: "mixed", salt: "v5-comprehensive" },
  ];

  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  variants.forEach((variant, idx) => {
    const exam = generateMockExam(bank, variant);
    const md = renderMockExam(exam, idx + 1);
    const outFile = path.join(OUT_DIR, `mock_exam_${idx + 1}.md`);
    fs.writeFileSync(outFile, md, "utf8");
    console.log(`✓ ${outFile} (${exam.mc.length} MC + ${exam.fill.length} Fill)`);
  });

  const indexLines = [
    "# מבחנים מדומים",
    "",
    "5 וריאנטים של מבחן מדומה. כל וריאנט עם בחירה דטרמיניסטית של שאלות מהמאגר הידני (1,361 שאלות).",
    "",
  ];
  variants.forEach((v, i) => {
    indexLines.push(`- [מבחן #${i + 1} — ${v.name}](mock_exam_${i + 1}.md) (${v.mcCount} MC + ${v.fillCount} Fill, רמת קושי: ${v.difficulty})`);
  });
  indexLines.push("");
  indexLines.push("**הוראות שימוש:**");
  indexLines.push("1. כתוב את התשובות בנפרד (אל תסתכל על מפתח התשובות בזמן הפתרון)");
  indexLines.push("2. הקצה 90 דקות בדיוק");
  indexLines.push("3. בדוק עצמך עם מפתח התשובות בסוף");
  indexLines.push("");
  fs.writeFileSync(path.join(OUT_DIR, "MOCK_EXAMS_README.md"), indexLines.join("\n"), "utf8");
  console.log(`\n✓ Wrote MOCK_EXAMS_README.md`);
}

main();
