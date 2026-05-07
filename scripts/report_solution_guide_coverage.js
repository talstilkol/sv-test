#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DEFAULT_SOURCE = "/Users/tal/Downloads/svcollege_exams_solution_guide2.html";
const REPORT_JSON = path.join(ROOT, "SOLUTION_GUIDE_COVERAGE_REPORT.json");
const REPORT_MD = path.join(ROOT, "SOLUTION_GUIDE_COVERAGE_REPORT.md");
const REPORT_VERSION = "solution-guide-coverage-v1";

const REQUIRED_SECTIONS = Object.freeze([
  { id: "prep", label: "הכנה למבחן", pattern: /הכנה למבחן/ },
  { id: "strategy", label: "אסטרטגיית פתרון", pattern: /אסטרטגיית פתרון/ },
  { id: "setup", label: "הקמת פרויקט בסיסי", pattern: /הקמת פרויקט בסיסי|הקמת פרויקט בוסיס/ },
  { id: "snippets", label: "תבניות חוזרות", pattern: /תבניות חוזרות|Snippets/ },
  { id: "exam_flights", label: "מבחן טיסות", pattern: /מבחן 1: מערכת בקרת טיסות|מבחן טיסות/ },
  { id: "exam_bank", label: "מבחן בנק", pattern: /מבחן 2: ניהול חשבונות בנק|חשבונות בנק/ },
  { id: "exam_logistics", label: "מבחן מחסן לוגיסטי", pattern: /מבחן 3: מחסן לוגיסטי|מחסן לוגיסטי/ },
  { id: "exam_currency", label: "מבחן מחשבון המרה", pattern: /מבחן 4: מחשבון המרת מטבעות|מחשבון המרה/ },
  { id: "js_solutions", label: "פתרונות JS", pattern: /שאלות JS|פתרונות מלאים/ },
  { id: "mistakes", label: "טעויות נפוצות", pattern: /טעויות נפוצות/ },
  { id: "quick_review", label: "דף חזרה מהיר", pattern: /דף חזרה מהיר/ },
]);

const REQUIRED_TOPICS = Object.freeze([
  { id: "react", label: "React", pattern: /\bReact\b/ },
  { id: "router", label: "React Router", pattern: /React Router|BrowserRouter|useNavigate|useParams|Routes/ },
  { id: "context", label: "Context API", pattern: /Context API|createContext|useContext/ },
  { id: "forms_validation", label: "Forms + validation", pattern: /validation|Validation|וליד|שגיאה|error/i },
  { id: "express", label: "Express", pattern: /\bExpress\b|express\.json|app\.use|router\./ },
  { id: "mongo", label: "Mongo/Mongoose", pattern: /Mongo|MongoDB|Mongoose|mongoose/ },
  { id: "fetch_api", label: "fetch/API", pattern: /\bfetch\b|API_URL|VITE_API_URL|\/api\// },
  { id: "deployment", label: "deployment", pattern: /Vercel|Render|Railway|GitHub/ },
  { id: "js_algorithms", label: "JS algorithms", pattern: /מטריצה|מיון ספרות|פלינדרום|פיבונאצ/ },
]);

function readSource(sourcePath) {
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Missing solution guide: ${sourcePath}`);
  }
  return fs.readFileSync(sourcePath, "utf8");
}

function stripTags(value) {
  return String(value || "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function collectHeadings(html) {
  return [...html.matchAll(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/g)].map((match) => ({
    level: Number(match[1]),
    text: stripTags(match[2]),
  }));
}

function collectRoutes(html) {
  return [...new Set([...html.matchAll(/<code>(\/[a-zA-Z0-9_/:.-]+)<\/code>/g)].map((match) => match[1]))]
    .filter((route) => route !== "//")
    .sort((a, b) => a.localeCompare(b));
}

function checkNeedles(html, items) {
  return items.map((item) => ({
    id: item.id,
    label: item.label,
    present: item.pattern.test(html),
  }));
}

function buildReport(sourcePath = DEFAULT_SOURCE) {
  const html = readSource(sourcePath);
  const headings = collectHeadings(html);
  const sections = checkNeedles(html, REQUIRED_SECTIONS);
  const topics = checkNeedles(html, REQUIRED_TOPICS);
  const codeBlocks = (html.match(/<pre><code/g) || []).length;
  const detailsBlocks = (html.match(/<details/g) || []).length;
  const routes = collectRoutes(html);
  const failures = [];

  sections.filter((item) => !item.present).forEach((item) => {
    failures.push({ type: "missing-section", id: item.id, label: item.label });
  });
  topics.filter((item) => !item.present).forEach((item) => {
    failures.push({ type: "missing-topic", id: item.id, label: item.label });
  });
  if (codeBlocks < 90) failures.push({ type: "too-few-code-blocks", expectedAtLeast: 90, actual: codeBlocks });
  if (detailsBlocks < 30) failures.push({ type: "too-few-details", expectedAtLeast: 30, actual: detailsBlocks });
  if (routes.length < 8) failures.push({ type: "too-few-routes", expectedAtLeast: 8, actual: routes.length });

  return {
    reportVersion: REPORT_VERSION,
    sourcePath,
    ready: failures.length === 0,
    summary: {
      bytes: Buffer.byteLength(html),
      lines: html.split(/\n/).length,
      headings: headings.length,
      topHeadings: headings.filter((heading) => heading.level <= 2).map((heading) => heading.text),
      codeBlocks,
      detailsBlocks,
      routes: routes.length,
      sectionsPresent: sections.filter((item) => item.present).length,
      sectionsTotal: sections.length,
      topicsPresent: topics.filter((item) => item.present).length,
      topicsTotal: topics.length,
    },
    sections,
    topics,
    routes,
    failures,
    coveragePolicy: "החוברת מסומנת כמקור פתרונות מכוסה רק אחרי audit; לא מוסיפים ממנה תוכן חדש בלי פירוק ידני ובדיקת מקור.",
  };
}

function toMarkdown(report) {
  return [
    "# SVCollege Solution Guide Coverage",
    "",
    `- Ready: **${report.ready ? "Yes" : "No"}**`,
    `- Source: \`${report.sourcePath}\``,
    `- Lines: ${report.summary.lines}`,
    `- Headings: ${report.summary.headings}`,
    `- Code blocks: ${report.summary.codeBlocks}`,
    `- Details blocks: ${report.summary.detailsBlocks}`,
    `- Routes: ${report.summary.routes}`,
    `- Sections: ${report.summary.sectionsPresent}/${report.summary.sectionsTotal}`,
    `- Topics: ${report.summary.topicsPresent}/${report.summary.topicsTotal}`,
    "",
    "## Sections",
    "",
    ...report.sections.map((item) => `- ${item.present ? "✅" : "❌"} ${item.label} (\`${item.id}\`)`),
    "",
    "## Topics",
    "",
    ...report.topics.map((item) => `- ${item.present ? "✅" : "❌"} ${item.label} (\`${item.id}\`)`),
    "",
    "## Failures",
    "",
    report.failures.length ? report.failures.map((failure) => `- ${failure.type}: ${failure.id || failure.actual}`).join("\n") : "None",
    "",
  ].join("\n");
}

function main() {
  const sourceArg = process.argv.find((arg) => arg.startsWith("--source="));
  const sourcePath = sourceArg ? sourceArg.slice("--source=".length) : DEFAULT_SOURCE;
  const report = buildReport(sourcePath);
  fs.writeFileSync(REPORT_JSON, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  fs.writeFileSync(REPORT_MD, toMarkdown(report), "utf8");
  if (process.argv.includes("--summary")) {
    console.log(JSON.stringify({ ready: report.ready, ...report.summary, failures: report.failures.length }, null, 2));
  } else {
    console.log(JSON.stringify(report, null, 2));
  }
  if (process.argv.includes("--strict") && !report.ready) process.exit(1);
}

if (require.main === module) main();

module.exports = { buildReport, REQUIRED_SECTIONS, REQUIRED_TOPICS };
