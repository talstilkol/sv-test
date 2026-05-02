const fs = require("fs");
const path = require("path");
const vm = require("vm");

const coverageTargets = require("../scripts/report_question_coverage_targets.js");
const svcollegeReadiness = require("../scripts/report_svcollege_readiness.js");

const ROOT = path.resolve(__dirname, "..");

const BLOCKER_KEYS = [
  "lesson_25::Tailwind CSS",
  "lesson_25::utility classes",
  "lesson_25::responsive design",
  "lesson_25::grid",
  "lesson_25::flex",
  "ai_development::Cursor",
  "ai_development::Windsurf",
  "ai_development::Prompt Engineering",
  "ai_development::AI Code Review",
];

const BLOCKER_TITLES = [
  "עיצוב רספונסיבי ו-CSS מתקדם",
  "AI למפתחים — Cursor, Windsurf, Bolt, תיעוד וטסטים עם AI",
];

function loadQuestionContext() {
  const context = { window: {}, console };
  ["data/questions_bank.js", "data/option_feedback.js"].forEach((file) => {
    vm.runInNewContext(fs.readFileSync(path.join(ROOT, file), "utf8"), context, { filename: file });
  });
  return context;
}

describe("manual blocker question authoring", () => {
  it("gives each SVCollege blocker concept the required manual MC and Fill coverage", () => {
    const rows = coverageTargets.buildRows();
    const rowByKey = new Map(rows.map((row) => [row.key, row]));

    BLOCKER_KEYS.forEach((key) => {
      const row = rowByKey.get(key);
      expect(row, `${key} should exist in coverage targets`).toBeTruthy();
      expect(row.mc.curated, `${key} manual MC`).toBeGreaterThanOrEqual(3);
      expect(row.fill.curated, `${key} manual Fill`).toBeGreaterThanOrEqual(2);
      expect(row.mcReady).toBe(true);
      expect(row.fillReady).toBe(true);
    });
  });

  it("ships hand-written per-distractor feedback for every new blocker MC question", () => {
    const context = loadQuestionContext();
    const questions = context.QUESTIONS_BANK.mc.filter((question) =>
      BLOCKER_KEYS.includes(question.conceptKey),
    );
    const feedback = context.OPTION_FEEDBACK || {};

    // At least 27 — content authoring may have added more during exam-prep batches.
    expect(questions.length).toBeGreaterThanOrEqual(27);
    questions.forEach((question) => {
      expect(question.options).toHaveLength(4);
      // Allow either curated optionFeedback in OPTION_FEEDBACK map OR inline on the question
      const fb = feedback[question.id] || question.optionFeedback;
      expect(fb, `${question.id} feedback`).toBeTruthy();
      expect(fb).toHaveLength(4);
      fb.forEach((entry) => {
        expect(entry).toEqual(expect.any(String));
        expect(entry.length).toBeGreaterThan(20);
      });
    });
  });

  it("removes the two manual-question release blockers from SVCollege readiness", () => {
    const report = svcollegeReadiness.buildReport();

    expect(report.summary.finishLineReady).toBe(true);
    expect(report.releaseBlockers).toEqual([]);
    BLOCKER_TITLES.forEach((title) => {
      const module = report.modules.find((item) => item.title === title);
      expect(module, title).toBeTruthy();
      expect(module.readiness).toBe(100);
      expect(module.dimensions.questionCoverage).toBe(100);
    });
  });
});
