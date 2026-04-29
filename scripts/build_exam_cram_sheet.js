#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const weakest = require("./report_exam_weakest_concepts.js");

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const OUTPUT_PATH = path.join(ROOT, "EXAM_FINAL_CRAM_SHEET.md");
const REPORT_DATE = "2026-04-29";

function loadDataGlobal(file, globalName) {
  const sandbox = { window: {}, console };
  vm.runInNewContext(fs.readFileSync(path.join(DATA_DIR, file), "utf8"), sandbox, {
    filename: `data/${file}`,
  });
  return sandbox[globalName] || sandbox.window[globalName] || {};
}

function conceptNameFromKey(key = "") {
  const raw = String(key || "");
  const idx = raw.indexOf("::");
  return idx >= 0 ? raw.slice(idx + 2) : raw;
}

function definitionFor(conceptKey, definitions) {
  const conceptName = conceptNameFromKey(conceptKey);
  const normalized = weakest.normalizeTerm(conceptName);
  const direct = definitions[conceptName] || definitions[normalized];
  if (direct && direct.what) return direct.what;
  const looseKey = Object.keys(definitions).find((key) => {
    const normalizedKey = weakest.normalizeTerm(key);
    return normalizedKey === normalized || normalized.includes(normalizedKey) || normalizedKey.includes(normalized);
  });
  if (looseKey && definitions[looseKey]?.what) return definitions[looseKey].what;
  return "חסר ניסוח שורה אחת — לפתוח כרטיס מושג ולתקן לפני מבחן.";
}

function matchingComparisons(conceptKey, comparisons) {
  const conceptName = weakest.normalizeTerm(conceptNameFromKey(conceptKey));
  return Object.values(comparisons)
    .filter((comparison) => {
      const related = Array.isArray(comparison.relatedConcepts) ? comparison.relatedConcepts : [];
      if (related.includes(conceptKey)) return true;
      const names = [
        comparison.pairKey,
        comparison.a?.name,
        comparison.b?.name,
        ...(related || []),
      ].map(weakest.normalizeTerm);
      return names.some((name) => name && (name.includes(conceptName) || conceptName.includes(name)));
    })
    .slice(0, 2);
}

function comparisonTable(comparison) {
  const rows = Array.isArray(comparison.rows) ? comparison.rows.slice(0, 4) : [];
  if (!rows.length) return "";
  return [
    `| ${comparison.a?.name || "A"} | מול | ${comparison.b?.name || "B"} |`,
    "|---|---|---|",
    ...rows.map((row) => `| ${row.a || ""} | ${row.dim || ""} | ${row.b || ""} |`),
    comparison.when ? `\nהמלצה: ${comparison.when}` : "",
  ].filter(Boolean).join("\n");
}

function buildCramSheet() {
  const report = weakest.buildReport();
  const definitions = loadDataGlobal("concise_definitions.js", "CONCISE_CONCEPT_DEFINITIONS");
  const comparisons = loadDataGlobal("comparisons.js", "COMPARISONS");
  const items = report.topTen.map((item) => ({
    ...item,
    conceptName: conceptNameFromKey(item.key),
    oneLine: definitionFor(item.key, definitions),
    comparisons: matchingComparisons(item.key, comparisons),
  }));
  return {
    report,
    items,
    markdown: toMarkdown(report, items),
  };
}

function toMarkdown(report, items) {
  const lines = [
    "# דף חזרה אחרון למבחן — מושגים חלשים בלבד",
    "",
    `> נוצר: ${REPORT_DATE}`,
    `> מקור: \`npm run exam:weakest:write\``,
    `> יעד: ${report.target}`,
    "",
    "## כלל שימוש",
    "",
    "לומדים רק את הרשימה הזו אחרי שכל השערים ירוקים. לכל מושג: קרא שורה אחת, פתר שאלה קשה, ואז קטע קוד אם יש.",
    "",
    "## רשימת חזרה ממוקדת",
    "",
    "| # | Risk | מושג | מה זה בשורה אחת | פעולה עכשיו |",
    "|---:|---:|---|---|---|",
    ...items.map((item) => `| ${item.rank} | ${item.riskScore} | ${item.conceptName} | ${item.oneLine} | ${item.nextAction} |`),
    "",
    "## טבלאות השוואה רלוונטיות",
    "",
  ];

  items.forEach((item) => {
    if (!item.comparisons.length) return;
    lines.push(`### ${item.conceptName}`, "");
    item.comparisons.forEach((comparison) => {
      lines.push(comparisonTable(comparison), "");
    });
  });

  lines.push(
    "## בדיקת יציאה",
    "",
    "- אין לסמן מושג כידוע עד שפתרת שאלה ברמת הקושי הגבוהה ביותר הזמינה.",
    "- במושגי קוד: חובה לפתור Fill/Trace/Bug/Build, לא רק לזהות הגדרה.",
    "- אם טעית: המושג נכנס לחולשות, קוראים את דרישת הקדם, ואז פותרים recovery.",
    "",
  );
  return `${lines.join("\n")}\n`;
}

function run(argv = process.argv.slice(2)) {
  const result = buildCramSheet();
  if (argv.includes("--write")) fs.writeFileSync(OUTPUT_PATH, result.markdown);
  if (argv.includes("--summary")) {
    process.stdout.write(`${JSON.stringify({
      date: REPORT_DATE,
      target: result.report.target,
      concepts: result.items.length,
      comparisonSections: result.items.filter((item) => item.comparisons.length).length,
      output: OUTPUT_PATH,
    }, null, 2)}\n`);
  } else {
    process.stdout.write(result.markdown);
  }
  return result;
}

if (require.main === module) run();

module.exports = {
  buildCramSheet,
  definitionFor,
  matchingComparisons,
  toMarkdown,
};
