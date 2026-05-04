#!/usr/bin/env node
// Generate concept dependency graph from prerequisite fields.
// Output: docs/exam-prep/CONCEPT_DEPENDENCIES.md (mermaid diagram)

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { byFilename } = require("./lib/sort.js");

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const OUT_FILE = path.join(ROOT, "docs", "exam-prep", "CONCEPT_DEPENDENCIES.md");

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

function safeId(str) {
  return String(str).replace(/[^a-zA-Z0-9]/g, "_");
}

function main() {
  const lessons = LESSON_FILES.map(loadLesson).filter(Boolean);
  const lines = [];
  lines.push("# גרף תלויות בין מושגים");
  lines.push("");
  lines.push("מציג את הסדר הלוגי של למידה — מה צריך ללמוד לפני מה.");
  lines.push("");
  lines.push("## תלויות לפי שיעור");
  lines.push("");

  let totalConcepts = 0;
  let totalEdges = 0;

  lessons.forEach((lesson) => {
    lines.push(`### ${lesson.title}`);
    lines.push("");
    lines.push("```mermaid");
    lines.push("graph LR");

    lesson.concepts.forEach((concept) => {
      const node = `${safeId(lesson.id)}_${safeId(concept.conceptName)}`;
      lines.push(`  ${node}["${concept.conceptName}"]`);
      totalConcepts += 1;

      if (concept.prerequisite) {
        const [prereqLesson, prereqName] = String(concept.prerequisite).split("::");
        const prereqNode = `${safeId(prereqLesson)}_${safeId(prereqName)}`;
        lines.push(`  ${prereqNode} --> ${node}`);
        totalEdges += 1;
      }
    });

    lines.push("```");
    lines.push("");
  });

  lines.push("---");
  lines.push("");
  lines.push("## סדר לימוד מומלץ");
  lines.push("");
  lines.push("Topological order — מושגים שלא תלויים באף אחד מופיעים ראשונים.");
  lines.push("");

  lessons.forEach((lesson) => {
    const noDeps = lesson.concepts.filter(
      (c) => !c.prerequisite || c.prerequisite.startsWith("lesson_") === false,
    );
    if (noDeps.length === 0) return;
    lines.push(`**${lesson.title}** — מושגי בסיס:`);
    noDeps.forEach((c) => lines.push(`- ${c.conceptName}`));
    lines.push("");
  });

  lines.push("---");
  lines.push("");
  lines.push(`**סה"כ:** ${totalConcepts} מושגים · ${totalEdges} תלויות · ${lessons.length} שיעורים`);
  lines.push("");
  lines.push(`**עודכן אוטומטית:** ${new Date().toISOString()}`);

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, lines.join("\n"), "utf8");
  console.log(`✓ Wrote ${OUT_FILE}`);
  console.log(`  ${totalConcepts} concepts, ${totalEdges} dependencies`);
}

main();
