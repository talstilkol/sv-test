#!/usr/bin/env node
// Generate time-pressure drills — 10 questions in 5 minutes per drill.
// 10 drills total = 100 questions for rapid practice.
// Output: docs/exam-prep/TIME_PRESSURE_DRILLS.md

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const OUT_FILE = path.join(ROOT, "docs", "exam-prep", "TIME_PRESSURE_DRILLS.md");

function loadBank() {
  const code = fs.readFileSync(path.join(ROOT, "data", "questions_bank.js"), "utf8");
  const sandbox = { module: { exports: {} } };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  return sandbox.QUESTIONS_BANK;
}

function deterministicSort(items, salt) {
  return [...items].sort((a, b) => {
    const ka = `${salt}:${a.id || a.conceptKey || ""}`;
    const kb = `${salt}:${b.id || b.conceptKey || ""}`;
    return ka.localeCompare(kb);
  });
}

function main() {
  const bank = loadBank();
  const lines = [];
  lines.push("# תרגילי לחץ זמן — 10 שאלות ב-5 דקות");
  lines.push("");
  lines.push("**מטרה:** לאמן מהירות החלטה תחת לחץ.");
  lines.push("");
  lines.push("**הוראות:**");
  lines.push("1. הפעל טיימר 5 דקות.");
  lines.push("2. ענה על כל 10 השאלות.");
  lines.push("3. אם נתקעת — נחש ועבור הלאה.");
  lines.push("4. בדוק את עצמך עם מפתח התשובות.");
  lines.push("5. עשה תרגיל אחר ביום — לא יותר. אחרת מתחילים לטעות בגלל עייפות.");
  lines.push("");
  lines.push("---");
  lines.push("");

  for (let i = 1; i <= 10; i += 1) {
    const sorted = deterministicSort(bank.mc, `drill-${i}`);
    const selected = sorted.slice(0, 10);

    lines.push(`## תרגיל #${i} — 10 שאלות / 5 דקות`);
    lines.push("");
    lines.push("**זמן מומלץ:** 30 שניות לשאלה");
    lines.push("");

    selected.forEach((q, idx) => {
      lines.push(`### ${idx + 1}. ${q.question || q.prompt || ""}`);
      lines.push("");
      if (q.code) {
        lines.push("```");
        lines.push(q.code);
        lines.push("```");
        lines.push("");
      }
      if (q.options && Array.isArray(q.options)) {
        q.options.forEach((opt, oi) => {
          lines.push(`${String.fromCharCode(65 + oi)}. ${opt}`);
        });
      }
      lines.push("");
    });

    lines.push("**מפתח תשובות:**");
    lines.push("");
    selected.forEach((q, idx) => {
      const correctIdx = q.correct ?? q.correctIndex ?? 0;
      const letter = String.fromCharCode(65 + correctIdx);
      lines.push(`${idx + 1}. **${letter}**`);
    });
    lines.push("");
    lines.push("---");
    lines.push("");
  }

  lines.push("");
  lines.push(`**עודכן אוטומטית:** ${new Date().toISOString()}`);
  fs.writeFileSync(OUT_FILE, lines.join("\n"), "utf8");
  console.log(`✓ Wrote ${OUT_FILE}`);
  console.log(`  10 drills × 10 questions = 100 questions`);
}

main();
