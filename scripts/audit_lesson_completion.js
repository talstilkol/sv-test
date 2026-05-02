#!/usr/bin/env node
// Per-concept × per-part completion audit for ALL lessons.
// Output: LESSON_COMPLETION_AUDIT.md
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const OUT_FILE = path.join(ROOT, "LESSON_COMPLETION_AUDIT.md");

// All enrichment parts we audit per concept
const PARTS = [
  { key: "levels.grandma",        label: "L1 סבתא",      group: "levels" },
  { key: "levels.child",          label: "L2 ילד",       group: "levels" },
  { key: "levels.soldier",        label: "L3 חייל",      group: "levels" },
  { key: "levels.student",        label: "L4 סטודנט",    group: "levels" },
  { key: "levels.junior",         label: "L5 ג׳וניור",   group: "levels" },
  { key: "levels.professor",      label: "L6 פרופ׳",     group: "levels" },
  { key: "codeExample",           label: "💻 קוד",       group: "code" },
  { key: "codeExplanation",       label: "📝 הערות",     group: "code" },
  { key: "illustration",          label: "🖼️ תרשים",     group: "viz" },
  { key: "analogy",               label: "🌍 דימוי",     group: "enrichment" },
  { key: "deepDive",              label: "🌊 Deep Dive", group: "enrichment" },
  { key: "extendedExplanation",   label: "📚 הרחבה",     group: "enrichment" },
  { key: "extras",                label: "🎁 Extras",    group: "enrichment" },
  { key: "mnemonic",              label: "🧠 מנמוניקה",  group: "enrichment" },
  { key: "antiPatterns",          label: "🔁 דפוסי-נגד", group: "enrichment" },
  { key: "bugHunt",               label: "🐛 ציד באגים", group: "enrichment" },
  { key: "warStories",            label: "📖 סיפורי שטח",group: "enrichment" },
  { key: "comparisons",           label: "⚖️ השוואות",   group: "enrichment" },
  { key: "conceptComic",          label: "🎞️ קומיקס",    group: "enrichment" },
  { key: "conceptVideo",          label: "🎥 קליפ",      group: "enrichment" },
  { key: "memoryPalace",          label: "🏛️ ארמון",     group: "enrichment" },
  { key: "problemFirst",          label: "🧩 בעיה",      group: "enrichment" },
  { key: "stageZero",             label: "🧯 שבור-תקן",  group: "enrichment" },
  { key: "whatIf",                label: "🔮 What-If",  group: "enrichment" },
];

const LEVEL_KEYS = ["grandma", "child", "soldier", "student", "junior", "professor"];

function loadLessonFile(filename) {
  const filePath = path.join(DATA_DIR, filename);
  const code = fs.readFileSync(filePath, "utf8");
  const sb = { window: {}, module: { exports: {} } };
  sb.window = sb;
  vm.createContext(sb);
  try { vm.runInContext(code, sb, { filename }); } catch (_) { return null; }
  const key = Object.keys(sb.window).find((k) => k.startsWith("LESSON_") && sb.window[k] && sb.window[k].concepts);
  return key ? sb.window[key] : null;
}

function loadBank() {
  const sb = { module: { exports: {} } };
  sb.window = sb;
  vm.createContext(sb);
  vm.runInContext(fs.readFileSync(path.join(DATA_DIR, "questions_bank.js"), "utf8"), sb, { filename: "bank" });
  return sb.QUESTIONS_BANK;
}

function getNested(obj, path) {
  return path.split(".").reduce((acc, k) => acc && acc[k], obj);
}

function isFilled(value) {
  if (value == null) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "object") return Object.keys(value).length > 0;
  return Boolean(value);
}

function discoverLessonFiles() {
  return fs.readdirSync(DATA_DIR)
    .filter((f) => /^lesson(_|\d).*\.js$/i.test(f) && !f.includes(".test."))
    .sort((a, b) => {
      // Numeric lessons first (lesson11 < lesson12), then named bridges
      const an = a.match(/^lesson(\d+)\.js$/);
      const bn = b.match(/^lesson(\d+)\.js$/);
      if (an && bn) return Number(an[1]) - Number(bn[1]);
      if (an) return -1;
      if (bn) return 1;
      return a.localeCompare(b);
    });
}

function main() {
  const files = discoverLessonFiles();
  const bank = loadBank();
  const qCounts = {};
  bank.mc.forEach((q) => { if (q.conceptKey) { qCounts[q.conceptKey] = qCounts[q.conceptKey] || { mc: 0, fill: 0 }; qCounts[q.conceptKey].mc++; } });
  bank.fill.forEach((q) => { if (q.conceptKey) { qCounts[q.conceptKey] = qCounts[q.conceptKey] || { mc: 0, fill: 0 }; qCounts[q.conceptKey].fill++; } });

  const lessons = [];
  files.forEach((f) => {
    const l = loadLessonFile(f);
    if (!l || !l.concepts || !l.id) return;
    lessons.push({ file: f, lesson: l });
  });

  const lines = [];
  lines.push("# Lesson Completion Audit — Per-Concept × Per-Part");
  lines.push("");
  lines.push(`> נוצר אוטומטית ע״י \`scripts/audit_lesson_completion.js\` — תאריך: ${new Date().toISOString().slice(0,10)}`);
  lines.push("");
  lines.push("## חוקים");
  lines.push("- ✓ = השדה קיים ולא ריק");
  lines.push("- ✗ = שדה חסר (יש למלא ידנית)");
  lines.push("- MC/Fill = שאלות במאגר עבור המושג");
  lines.push("");
  lines.push("## חלקים שאוטיים בכל מושג");
  lines.push("");
  lines.push(PARTS.map((p) => `- ${p.label} (\`${p.key}\`)`).join("\n"));
  lines.push("");
  lines.push("---");
  lines.push("");

  // Aggregate stats
  const lessonStats = [];
  const partStats = {}; // partKey → { filled, total }
  PARTS.forEach((p) => { partStats[p.key] = { filled: 0, total: 0, label: p.label }; });

  // Per-lesson detail
  lessons.forEach(({ file, lesson }) => {
    const concepts = lesson.concepts;
    const lessonId = lesson.id;
    let lessonFilled = 0;
    let lessonTotal = 0;
    const perLevelFilled = { grandma: 0, child: 0, soldier: 0, student: 0, junior: 0, professor: 0 };
    const perLevelTotal = concepts.length;
    let conceptsAllLevels = 0;

    concepts.forEach((c) => {
      let allLevels = true;
      LEVEL_KEYS.forEach((k) => {
        if (isFilled(c.levels && c.levels[k])) perLevelFilled[k]++;
        else allLevels = false;
      });
      if (allLevels) conceptsAllLevels++;
      PARTS.forEach((p) => {
        const v = getNested(c, p.key);
        const filled = isFilled(v);
        if (filled) lessonFilled++;
        lessonTotal++;
        partStats[p.key].total++;
        if (filled) partStats[p.key].filled++;
      });
    });

    const pct = lessonTotal ? Math.round((lessonFilled / lessonTotal) * 100) : 0;
    lessonStats.push({
      id: lessonId,
      file,
      title: lesson.title,
      conceptCount: concepts.length,
      filled: lessonFilled,
      total: lessonTotal,
      pct,
      perLevelFilled,
      perLevelTotal,
      conceptsAllLevels,
    });

    // Lesson-level table
    lines.push(`## ${lessonId} — ${lesson.title}`);
    lines.push(`*${concepts.length} מושגים · ${lessonFilled}/${lessonTotal} תאים = **${pct}%** השלמה*`);
    lines.push("");
    // Header row
    const headerCells = ["#", "מושג"].concat(PARTS.map((p) => p.label)).concat(["MC", "Fill", "מלא"]);
    lines.push("| " + headerCells.join(" | ") + " |");
    lines.push("|" + headerCells.map(() => "---").join("|") + "|");
    concepts.forEach((c, idx) => {
      const cells = [(idx + 1).toString(), c.conceptName];
      let conceptFilled = 0;
      PARTS.forEach((p) => {
        const v = getNested(c, p.key);
        const filled = isFilled(v);
        cells.push(filled ? "✓" : "✗");
        if (filled) conceptFilled++;
      });
      const qc = qCounts[`${lessonId}::${c.conceptName}`] || { mc: 0, fill: 0 };
      cells.push(String(qc.mc));
      cells.push(String(qc.fill));
      cells.push(`${conceptFilled}/${PARTS.length}`);
      lines.push("| " + cells.join(" | ") + " |");
    });
    lines.push("");
    // Per-level summary
    lines.push("**אחוזי 6 רמות בשיעור:**");
    LEVEL_KEYS.forEach((k) => {
      const f = perLevelFilled[k];
      const t = perLevelTotal;
      const lvlPct = t ? Math.round((f / t) * 100) : 0;
      lines.push(`- ${k}: ${f}/${t} = ${lvlPct}%`);
    });
    lines.push("");
    lines.push(`**מושגים עם כל 6 הרמות:** ${conceptsAllLevels}/${concepts.length}`);
    lines.push("");
    lines.push("---");
    lines.push("");
  });

  // Master summary
  lines.unshift(""); // padding
  const summary = [];
  summary.push("## 📊 טבלת סיכום — כל השיעורים");
  summary.push("");
  summary.push("| Lesson | Title | Concepts | Total cells | Filled | % | All-6-levels |");
  summary.push("|---|---|---:|---:|---:|---:|---:|");
  let grandFilled = 0, grandTotal = 0;
  lessonStats.forEach((s) => {
    summary.push(`| ${s.id} | ${s.title.slice(0, 50)} | ${s.conceptCount} | ${s.total} | ${s.filled} | ${s.pct}% | ${s.conceptsAllLevels}/${s.conceptCount} |`);
    grandFilled += s.filled;
    grandTotal += s.total;
  });
  const grandPct = grandTotal ? Math.round((grandFilled / grandTotal) * 100) : 0;
  summary.push(`| **TOTAL** | — | — | **${grandTotal}** | **${grandFilled}** | **${grandPct}%** | — |`);
  summary.push("");

  // Per-level totals across ALL lessons
  summary.push("## 📊 השלמה לפי רמה (כל המושגים)");
  summary.push("");
  summary.push("| רמה | מלא | סה״כ | % |");
  summary.push("|---|---:|---:|---:|");
  LEVEL_KEYS.forEach((k) => {
    let f = 0, t = 0;
    lessonStats.forEach((s) => { f += s.perLevelFilled[k]; t += s.perLevelTotal; });
    const pct = t ? Math.round((f / t) * 100) : 0;
    summary.push(`| ${k} | ${f} | ${t} | ${pct}% |`);
  });
  summary.push("");

  // Per-part totals
  summary.push("## 📊 השלמה לפי חלק (כל המושגים בכל השיעורים)");
  summary.push("");
  summary.push("| חלק | מלא | סה״כ | % |");
  summary.push("|---|---:|---:|---:|");
  PARTS.forEach((p) => {
    const ps = partStats[p.key];
    const pct = ps.total ? Math.round((ps.filled / ps.total) * 100) : 0;
    summary.push(`| ${p.label} | ${ps.filled} | ${ps.total} | ${pct}% |`);
  });
  summary.push("");

  // To-do list ranked by gap size
  summary.push("## 📝 לוח משימות — שיעורים מסודרים לפי פער (הגדול קודם)");
  summary.push("");
  summary.push("| Rank | Lesson | Title | Gap | % | Cells לכתיבה |");
  summary.push("|---:|---|---|---:|---:|---:|");
  const ranked = lessonStats.slice().sort((a, b) => (b.total - b.filled) - (a.total - a.filled));
  ranked.forEach((s, i) => {
    summary.push(`| ${i + 1} | ${s.id} | ${s.title.slice(0, 45)} | ${s.total - s.filled} | ${s.pct}% | ${s.total - s.filled} |`);
  });
  summary.push("");
  summary.push("---");
  summary.push("");

  const final = ["# Lesson Completion Audit — Per-Concept × Per-Part", ""].concat(summary).concat(lines.slice(1));
  fs.writeFileSync(OUT_FILE, final.join("\n"), "utf8");
  console.log(`✓ Wrote ${OUT_FILE}`);
  console.log(`  ${lessons.length} lessons audited`);
  console.log(`  Total cells: ${grandTotal}, filled: ${grandFilled}, ${grandPct}%`);
  console.log(`  Lessons sorted by gap (top 5):`);
  ranked.slice(0, 5).forEach((s) => console.log(`    ${s.id}: ${s.total - s.filled} missing (${s.pct}%)`));
}

main();
