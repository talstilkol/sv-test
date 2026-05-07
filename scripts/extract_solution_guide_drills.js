#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DEFAULT_SOURCE = "/Users/tal/Downloads/svcollege_exams_solution_guide2.html";
const REPORT_JSON = path.join(ROOT, "SOLUTION_GUIDE_DRILLS_REPORT.json");
const REPORT_MD = path.join(ROOT, "SOLUTION_GUIDE_DRILLS_REPORT.md");
const DATA_FILE = path.join(ROOT, "data/solution_guide_drills.js");
const REPORT_VERSION = "solution-guide-drills-v1";

const EXAM_SECTIONS = Object.freeze([
  { id: "exam1", slug: "flights", expectedTitle: "מערכת בקרת טיסות" },
  { id: "exam2", slug: "bank", expectedTitle: "ניהול חשבונות בנק" },
  { id: "exam3", slug: "warehouse", expectedTitle: "מחסן לוגיסטי" },
  { id: "exam4", slug: "currency", expectedTitle: "מחשבון המרת מטבעות" },
]);

function readSource(sourcePath) {
  if (!fs.existsSync(sourcePath)) throw new Error(`Missing solution guide: ${sourcePath}`);
  return fs.readFileSync(sourcePath, "utf8");
}

function decodeEntities(value) {
  return String(value || "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function stripTags(value) {
  return decodeEntities(String(value || "").replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function sectionById(html, id) {
  const re = new RegExp(`<section\\s+class=["']section["']\\s+id=["']${id}["'][^>]*>`, "i");
  const match = re.exec(html);
  if (!match) return "";
  const start = match.index;
  const close = html.indexOf("</section>", start);
  if (close === -1) return "";
  return html.slice(start, close + "</section>".length);
}

function collectHeadings(html, minLevel, maxLevel) {
  return [...html.matchAll(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/g)]
    .map((match) => ({ level: Number(match[1]), text: stripTags(match[2]) }))
    .filter((heading) => heading.level >= minLevel && heading.level <= maxLevel);
}

function collectScoreParts(html) {
  return [...html.matchAll(/<div class=["']exam-meta-card["']>\s*<strong>([\s\S]*?)<\/strong>\s*<span>([\s\S]*?)<\/span>\s*<\/div>/g)]
    .map((match) => ({
      value: stripTags(match[1]),
      label: stripTags(match[2]),
    }));
}

function collectRoutes(html) {
  return [...new Set([...html.matchAll(/<code>(\/[a-zA-Z0-9_/:.-]+)<\/code>/g)]
    .map((match) => stripTags(match[1]))
    .filter((route) => route && route !== "//"))]
    .sort((a, b) => a.localeCompare(b));
}

function collectDetails(html) {
  return [...html.matchAll(/<details[^>]*class=["']([^"']*)["'][^>]*>\s*<summary>([\s\S]*?)<\/summary>/g)]
    .map((match, index) => {
      const summary = stripTags(match[2]);
      const minuteMatch = summary.match(/(\d+)\s*דק/);
      return {
        id: `level_${String(index + 1).padStart(2, "0")}`,
        className: stripTags(match[1]),
        summary,
        estimatedMinutes: minuteMatch ? Number(minuteMatch[1]) : null,
      };
    });
}

function collectCodeBlocks(html) {
  return [...html.matchAll(/<pre><code[^>]*>([\s\S]*?)<\/code><\/pre>/g)]
    .map((match, index) => ({
      id: `code_${String(index + 1).padStart(2, "0")}`,
      preview: stripTags(match[1]).slice(0, 180),
    }));
}

function collectTags(html) {
  return [...new Set([...html.matchAll(/<span class=["']tag[^"']*["']>([\s\S]*?)<\/span>/g)].map((match) => stripTags(match[1])))]
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));
}

function buildExamDrill(html, config) {
  const section = sectionById(html, config.id);
  const headings = collectHeadings(section, 2, 4);
  const title = headings.find((heading) => heading.level === 2);
  const details = collectDetails(section);
  const codeBlocks = collectCodeBlocks(section);
  return {
    id: config.slug,
    sourceSectionId: config.id,
    title: title ? title.text : config.expectedTitle,
    tags: collectTags(section),
    scoreParts: collectScoreParts(section),
    routes: collectRoutes(section),
    stages: details,
    headings: headings.map((heading) => heading.text),
    codeBlockCount: codeBlocks.length,
    codePreviews: codeBlocks.slice(0, 6),
    drillPolicy: "חולץ מתוך חוברת הפתרונות בלבד; אין השלמת דרישות שאינן מופיעות במקור.",
  };
}

function collectJsSolutions(html) {
  const section = sectionById(html, "js-questions");
  const headings = collectHeadings(section, 3, 3);
  return headings.map((heading, index) => ({
    id: `js_solution_${String(index + 1).padStart(2, "0")}`,
    title: heading.text,
  }));
}

function collectSetupSections(html) {
  return ["prep", "strategy", "setup", "patterns", "mistakes", "cheatsheet"].map((id) => {
    const section = sectionById(html, id);
    return {
      id,
      title: (collectHeadings(section, 2, 2)[0] || { text: id }).text,
      headings: collectHeadings(section, 3, 4).map((heading) => heading.text),
      codeBlockCount: collectCodeBlocks(section).length,
      detailsCount: collectDetails(section).length,
    };
  });
}

function buildDrillMap(sourcePath = DEFAULT_SOURCE) {
  const html = readSource(sourcePath);
  const exams = EXAM_SECTIONS.map((config) => buildExamDrill(html, config));
  const jsSolutions = collectJsSolutions(html);
  const setupSections = collectSetupSections(html);
  const failures = [];

  if (exams.length !== 4) failures.push({ type: "missing-exams", expected: 4, actual: exams.length });
  exams.forEach((exam) => {
    if (exam.scoreParts.length < 3) failures.push({ type: "exam-score-parts", examId: exam.id, actual: exam.scoreParts.length });
    if (exam.routes.length < 2) failures.push({ type: "exam-routes", examId: exam.id, actual: exam.routes.length });
    if (exam.stages.length < 3) failures.push({ type: "exam-stages", examId: exam.id, actual: exam.stages.length });
    if (exam.codeBlockCount < 5) failures.push({ type: "exam-code-blocks", examId: exam.id, actual: exam.codeBlockCount });
  });
  if (jsSolutions.length < 4) failures.push({ type: "js-solutions", expectedAtLeast: 4, actual: jsSolutions.length });

  const totals = exams.reduce((acc, exam) => {
    acc.routes += exam.routes.length;
    acc.stages += exam.stages.length;
    acc.codeBlocks += exam.codeBlockCount;
    acc.scoreParts += exam.scoreParts.length;
    return acc;
  }, { routes: 0, stages: 0, codeBlocks: 0, scoreParts: 0 });

  return {
    reportVersion: REPORT_VERSION,
    sourcePath,
    ready: failures.length === 0,
    summary: {
      exams: exams.length,
      jsSolutions: jsSolutions.length,
      setupSections: setupSections.length,
      routes: totals.routes,
      stages: totals.stages,
      scoreParts: totals.scoreParts,
      codeBlocks: totals.codeBlocks,
    },
    exams,
    jsSolutions,
    setupSections,
    failures,
    extractionPolicy: "הנתונים נשלפים מה-HTML המקורי בלבד. אם שדה חסר, הדוח נכשל או מסמן unknown/unavailable במקום להמציא.",
  };
}

function toDataFile(report) {
  return [
    "// data/solution_guide_drills.js",
    "// Generated by scripts/extract_solution_guide_drills.js. Do not edit manually.",
    "var SVCOLLEGE_SOLUTION_GUIDE_DRILLS = " + JSON.stringify(report, null, 2) + ";",
    "",
    "if (typeof window !== \"undefined\") {",
    "  window.SVCOLLEGE_SOLUTION_GUIDE_DRILLS = SVCOLLEGE_SOLUTION_GUIDE_DRILLS;",
    "}",
    "",
    "if (typeof module !== \"undefined\") {",
    "  module.exports = SVCOLLEGE_SOLUTION_GUIDE_DRILLS;",
    "}",
    "",
  ].join("\n");
}

function toMarkdown(report) {
  return [
    "# SVCollege Solution Guide Drills",
    "",
    `- Ready: **${report.ready ? "Yes" : "No"}**`,
    `- Source: \`${report.sourcePath}\``,
    `- Exams: ${report.summary.exams}`,
    `- JS solutions: ${report.summary.jsSolutions}`,
    `- Routes: ${report.summary.routes}`,
    `- Stages: ${report.summary.stages}`,
    `- Code blocks in exams: ${report.summary.codeBlocks}`,
    "",
    "## Exams",
    "",
    ...report.exams.map((exam) => [
      `### ${exam.title}`,
      `- Routes: ${exam.routes.length}`,
      `- Stages: ${exam.stages.length}`,
      `- Code blocks: ${exam.codeBlockCount}`,
      `- Tags: ${exam.tags.join(", ") || "unknown/unavailable"}`,
    ].join("\n")),
    "",
    "## JS Solutions",
    "",
    ...report.jsSolutions.map((solution) => `- ${solution.title}`),
    "",
    "## Failures",
    "",
    report.failures.length ? report.failures.map((failure) => `- ${failure.type}: ${failure.examId || failure.actual}`).join("\n") : "None",
    "",
  ].join("\n");
}

function writeOutputs(report) {
  fs.writeFileSync(REPORT_JSON, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  fs.writeFileSync(REPORT_MD, toMarkdown(report), "utf8");
  fs.writeFileSync(DATA_FILE, toDataFile(report), "utf8");
}

function main() {
  const sourceArg = process.argv.find((arg) => arg.startsWith("--source="));
  const sourcePath = sourceArg ? sourceArg.slice("--source=".length) : DEFAULT_SOURCE;
  const report = buildDrillMap(sourcePath);
  if (process.argv.includes("--write")) writeOutputs(report);
  if (process.argv.includes("--summary")) {
    console.log(JSON.stringify({ ready: report.ready, ...report.summary, failures: report.failures.length }, null, 2));
  } else {
    console.log(JSON.stringify(report, null, 2));
  }
  if (process.argv.includes("--strict") && !report.ready) process.exit(1);
}

if (require.main === module) main();

module.exports = { buildDrillMap, EXAM_SECTIONS };
