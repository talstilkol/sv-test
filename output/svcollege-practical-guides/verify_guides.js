const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const manifestPath = path.join(ROOT, "manifest.json");
const forbiddenPatterns = [
  /Math\.random/,
  /crypto\.randomUUID/,
  new RegExp("lo" + "rem", "i"),
];

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

function htmlLinks(source) {
  return [...source.matchAll(/href="([^"]+)"/g)]
    .map((match) => match[1])
    .filter((link) => link.startsWith("./"))
    .map((link) => link.replace(/^\.\//, ""));
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const files = fs.readdirSync(ROOT).filter((file) => fs.statSync(path.join(ROOT, file)).isFile());
const htmlFiles = files.filter((file) => file.endsWith(".html"));
const failures = [];

for (const item of manifest.outputs || []) {
  if (!fs.existsSync(path.join(ROOT, item.file))) {
    failures.push({ type: "missing-manifest-output", file: item.file });
  }
}

for (const file of htmlFiles) {
  const source = read(file);
  if (!source.includes("window.print()")) {
    failures.push({ type: "missing-print-button", file });
  }
  if (!source.includes("@media print")) {
    failures.push({ type: "missing-print-css", file });
  }
  for (const link of htmlLinks(source)) {
    if (!fs.existsSync(path.join(ROOT, link))) {
      failures.push({ type: "broken-link", file, link });
    }
  }
}

htmlFiles.forEach((file) => {
  const source = read(file);
  [
    "guide-simple-mode",
    "guide-simple-route",
    "guide-simple-percent",
    "guide-simple-map",
    "guide-simple-arrows",
    "← אחורה",
    "קדימה →",
    "guide-tree-nav",
    "עץ",
    "aria-current=\"page\"",
    "start_here.html",
    "guide_01_ideas.html",
    "guide_02_homework_and_exam_drills.html",
    "guide_03_exam_day_runbook.html",
    "one_page_exam_cheatsheet.html",
  ].forEach((needle) => {
    if (!source.includes(needle)) {
      failures.push({ type: "missing-guide-tree-navigation", file, needle });
    }
  });
  const hasTrackOrStatus = [
    "study_path_37h45.html",
    "progress_tracker.html",
    "status.html",
  ].some((needle) => source.includes(needle));
  if (!hasTrackOrStatus) {
    failures.push({ type: "missing-guide-tree-track-or-status-link", file });
  }

  const usesSharedDayBoardScript = source.includes("guide_day_board.js");
  const hasDayBoard = source.includes("data-lag-top")
    || usesSharedDayBoardScript;
  const hasDayList = source.includes("data-day-list")
    || source.includes("לוח משימות לפי ימים")
    || usesSharedDayBoardScript;
  const hasNextTaskButton = source.includes("התחל את המשימה הבאה")
    || source.includes("data-start-next-top")
    || usesSharedDayBoardScript;

  if (!hasDayBoard) {
    failures.push({ type: "missing-day-board-shell", file });
  }
  if (!hasDayList) {
    failures.push({ type: "missing-day-board-list", file });
  }
  if (!hasNextTaskButton) {
    failures.push({ type: "missing-day-board-next-task-action", file });
  }
});

for (const file of files.filter((item) => /\.(html|md|json|js)$/.test(item))) {
  const source = read(file);
  forbiddenPatterns.forEach((pattern) => {
    if (pattern.test(source) && file !== "verify_guides.js") {
      failures.push({ type: "forbidden-pattern", file, pattern: String(pattern) });
    }
  });
}

if (fs.existsSync(path.join(ROOT, "progress_tracker.html"))) {
  const progressSource = read("progress_tracker.html");
  const taskMinutes = [...progressSource.matchAll(/minutes: (\d+)/g)].map((match) => Number(match[1]));
  const totalMinutes = taskMinutes.reduce((sum, minutes) => sum + minutes, 0);
  if (totalMinutes !== 6020) {
    failures.push({ type: "progress-total-minutes", expected: 6020, actual: totalMinutes });
  }
  ["localStorage", "data-export", "data-import", "cleanImportedProgress"].forEach((needle) => {
    if (!progressSource.includes(needle)) {
      failures.push({ type: "missing-progress-tracker-feature", feature: needle });
    }
  });
}

const report = {
  reportVersion: "svcollege-practical-guides-verify-v1",
  ready: failures.length === 0,
  files: files.length,
  htmlFiles: htmlFiles.length,
  manifestOutputs: (manifest.outputs || []).length,
  recommendedOrder: (manifest.recommendedOrder || []).length,
  failures,
};

fs.writeFileSync(
  path.join(ROOT, "verification_report.json"),
  JSON.stringify(report, null, 2) + "\n",
);

console.log(JSON.stringify(report, null, 2));
if (!report.ready) process.exit(1);
