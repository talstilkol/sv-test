#!/usr/bin/env node
// Generate per-lesson cheatsheets in markdown for SVCollege exam prep.
// Output: docs/exam-prep/cheatsheet_<lessonId>.md
// Source: data/lesson_*.js (each LESSON_X has concepts[] with simpleExplanation, codeExample, commonMistake).

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const OUT_DIR = path.join(ROOT, "docs", "exam-prep");

const LESSON_FILES = [
  "lesson_html_css_foundations.js",
  "lesson_tooling_git.js",
  "lesson_closures.js",
  "lesson_sql_orm.js",
  "lesson_nextjs.js",
  "lesson_nestjs.js",
  "lesson_devops_deploy.js",
  "lesson_ai_engineering.js",
  "lesson_design_systems.js",
  "lesson_auth_security.js",
];

function loadLessonData(filename) {
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) return null;
  const code = fs.readFileSync(filePath, "utf8");
  const sandbox = { module: { exports: {} } };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  try {
    vm.runInContext(code, sandbox);
  } catch (err) {
    console.warn(`Skipping ${filename}: ${err.message}`);
    return null;
  }
  // Find the lesson constant (first uppercase var)
  const lessonKey = Object.keys(sandbox).find(
    (k) => k.startsWith("LESSON_") && sandbox[k] && sandbox[k].concepts,
  );
  return lessonKey ? sandbox[lessonKey] : null;
}

function generateCheatsheet(lesson) {
  const lines = [];
  lines.push(`# ${lesson.title} — דף סיכום למבחן`);
  lines.push("");
  lines.push(`**מודול SVCollege:** ${lesson.svcollegeModule || "—"}`);
  lines.push("");
  lines.push(`**תיאור:** ${lesson.description || ""}`);
  lines.push("");
  lines.push(`**מספר מושגים:** ${lesson.concepts.length}`);
  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push("## מושגים בסיכום");
  lines.push("");

  lesson.concepts.forEach((concept, idx) => {
    lines.push(`### ${idx + 1}. ${concept.conceptName}`);
    lines.push("");
    if (concept.difficulty != null) {
      lines.push(`**רמת קושי:** ${concept.difficulty}/10`);
    }
    lines.push("");
    if (concept.simpleExplanation) {
      lines.push(`**מה זה:** ${concept.simpleExplanation}`);
      lines.push("");
    }
    if (concept.whyFullStack) {
      lines.push(`**למה Full Stack:** ${concept.whyFullStack}`);
      lines.push("");
    }
    if (concept.codeExample) {
      lines.push("**דוגמה:**");
      lines.push("```");
      lines.push(concept.codeExample);
      lines.push("```");
      lines.push("");
    }
    if (concept.codeExplanation) {
      lines.push(`**הסבר:** ${concept.codeExplanation}`);
      lines.push("");
    }
    if (concept.commonMistake) {
      lines.push(`⚠️ **טעות נפוצה:** ${concept.commonMistake}`);
      lines.push("");
    }
    if (concept.prerequisite) {
      lines.push(`**תלוי ב:** \`${concept.prerequisite}\``);
      lines.push("");
    }
    lines.push("---");
    lines.push("");
  });

  if (lesson.quiz && lesson.quiz.length) {
    lines.push("## שאלות חזרה (סוף השיעור)");
    lines.push("");
    lesson.quiz.forEach((q, idx) => {
      lines.push(`**שאלה ${idx + 1}:** ${q.question}`);
      lines.push("");
      q.options.forEach((opt, oi) => {
        const marker = oi === q.correct ? "✓" : " ";
        lines.push(`${marker} ${oi + 1}. ${opt}`);
      });
      lines.push("");
      if (q.explanation) {
        lines.push(`**הסבר:** ${q.explanation}`);
        lines.push("");
      }
      lines.push("---");
      lines.push("");
    });
  }

  return lines.join("\n");
}

function main() {
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  const indexLines = [
    "# Cheatsheets לכל השיעורים",
    "",
    "דפי סיכום אוטומטיים לכל שיעור, מבוססים על data/lesson_*.js.",
    "",
    "## רשימה",
    "",
  ];

  let totalConcepts = 0;
  let generated = 0;

  LESSON_FILES.forEach((filename) => {
    const lesson = loadLessonData(filename);
    if (!lesson) {
      console.warn(`Skipped: ${filename}`);
      return;
    }
    const cheatsheet = generateCheatsheet(lesson);
    const outFile = `cheatsheet_${lesson.id}.md`;
    fs.writeFileSync(path.join(OUT_DIR, outFile), cheatsheet, "utf8");
    indexLines.push(
      `- [${lesson.title}](${outFile}) — ${lesson.concepts.length} מושגים`,
    );
    totalConcepts += lesson.concepts.length;
    generated += 1;
    console.log(`✓ ${outFile} (${lesson.concepts.length} concepts)`);
  });

  indexLines.push("");
  indexLines.push(`**סה"כ:** ${generated} cheatsheets · ${totalConcepts} מושגים`);
  indexLines.push("");
  indexLines.push(`**עודכן אוטומטית:** ${new Date().toISOString()}`);
  fs.writeFileSync(path.join(OUT_DIR, "README.md"), indexLines.join("\n"), "utf8");
  console.log(`\n✓ Wrote ${generated} cheatsheets to ${OUT_DIR}`);
  console.log(`Total concepts: ${totalConcepts}`);
}

main();
