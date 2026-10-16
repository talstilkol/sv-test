#!/usr/bin/env node
// Generate "Common Pitfalls per Topic" — extracted from commonMistake fields across all lessons.
// Output: docs/exam-prep/COMMON_PITFALLS.md

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { byFilename } = require("./lib/sort.js");

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const OUT_FILE = path.join(ROOT, "docs", "exam-prep", "COMMON_PITFALLS.md");

const LESSON_FILES = fs
  .readdirSync(DATA_DIR)
  .filter((f) => f.startsWith("lesson_") && f.endsWith(".js"))
  .sort(byFilename);

function loadLesson(filename) {
  const filePath = path.join(DATA_DIR, filename);
  const code = fs.readFileSync(filePath, "utf8");
  const sandbox = { module: { exports: {} } };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  try {
    vm.runInContext(code, sandbox);
  } catch {
    return null;
  }
  const lessonKey = Object.keys(sandbox).find(
    (k) => k.startsWith("LESSON_") && sandbox[k] && sandbox[k].concepts,
  );
  return lessonKey ? sandbox[lessonKey] : null;
}

function main() {
  const lines = [];
  lines.push("# טעויות נפוצות במבחן SVCollege Full Stack");
  lines.push("");
  lines.push(
    "רשימה ממוקדת של טעויות שמופיעות במבחן. מחולק לפי שיעור. קרא לפני המבחן ובחזרה.",
  );
  lines.push("");
  lines.push("---");
  lines.push("");

  let totalPitfalls = 0;
  const lessons = LESSON_FILES.map(loadLesson).filter(Boolean);

  lessons.forEach((lesson) => {
    const pitfalls = lesson.concepts
      .filter((c) => c.commonMistake)
      .map((c) => ({ name: c.conceptName, mistake: c.commonMistake }));

    if (pitfalls.length === 0) return;

    lines.push(`## ${lesson.title}`);
    lines.push("");
    pitfalls.forEach((p, idx) => {
      lines.push(`${idx + 1}. **${p.name}** — ${p.mistake}`);
    });
    lines.push("");
    totalPitfalls += pitfalls.length;
  });

  lines.push("---");
  lines.push("");
  lines.push(
    `**סה"כ:** ${totalPitfalls} טעויות נפוצות בכל הקורס · ${lessons.length} שיעורים`,
  );
  lines.push("");
  lines.push(`**עודכן אוטומטית:** ${new Date().toISOString()}`);

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, lines.join("\n"), "utf8");
  console.log(`✓ Wrote ${OUT_FILE}`);
  console.log(`  ${totalPitfalls} pitfalls across ${lessons.length} lessons`);
}

main();
