const fs = require("fs");
const path = require("path");

const materialGaps = require("../scripts/report_lesson_material_gaps.js");

const ROOT = path.resolve(__dirname, "..");

describe("lesson material gaps audit", () => {
  it("builds a deterministic strict report for exam-critical lessons", () => {
    const first = materialGaps.buildReport();
    const second = materialGaps.buildReport();

    expect(second).toEqual(first);
    expect(first.reportVersion).toBe("lesson-material-gaps-v3");
    expect(first.summary.ready).toBe(true);
    expect(first.summary.failures).toBe(0);
    expect(first.summary.fullPortalLessons).toBe(29);
    expect(first.summary.fullPortalConcepts).toBe(568);
    expect(first.summary.heat10Lessons).toBe(3);
    expect(first.summary.heat9Lessons).toBe(4);
    expect(first.summary.heat8Lessons).toBe(4);
    expect(first.summary.heat10Gaps).toBe(0);
    expect(first.summary.heat9Gaps).toBe(0);
    expect(first.summary.heat8Gaps).toBe(0);
    expect(first.summary.concepts).toBeGreaterThan(200);
    expect(first.summary.globalComparisons).toBeGreaterThanOrEqual(50);
    expect(first.summary.examComparisons).toBeGreaterThanOrEqual(45);
    expect(first.summary.requiredComparisonPairsPresent).toBe(first.summary.requiredComparisonPairs);
    expect(first.summary.orphanExamComparisonReferences).toBe(0);
    expect(first.summary.malformedExamComparisons).toBe(0);
    expect(first.fullPortal.sourceTruth).toContain("content-loader");
    expect(first.lessons).toEqual(first.rows);
  });

  it("keeps lessons 24-26 fully covered with clean comparisons and practice extras", () => {
    const report = materialGaps.buildReport();
    const byId = Object.fromEntries(report.rows.map((row) => [row.lessonId, row]));

    ["lesson_24", "lesson_25", "lesson_26"].forEach((lessonId) => {
      expect(byId[lessonId], `${lessonId} row should exist`).toBeTruthy();
      expect(byId[lessonId].percent.comparisons).toBe(100);
      expect(byId[lessonId].percent.extras).toBe(100);
      expect(byId[lessonId].comparisonCoverage.requiredPercent).toBe(90);
      expect(byId[lessonId].comparisonCoverage.gap).toBe(0);
      expect(byId[lessonId].practiceCoverage.requiredPercent).toBe(90);
      expect(byId[lessonId].practiceCoverage.gap).toBe(0);
      expect(byId[lessonId].missingConcepts).toHaveLength(0);
      expect(byId[lessonId].missing).toHaveLength(0);
    });
  });

  it("exposes interface fields required by the strict gap-closure plan", () => {
    const report = materialGaps.buildReport();
    const heatThreshold = { 10: 90, 9: 75, 8: 60 };

    report.lessons.forEach((lesson) => {
      expect(lesson.comparisonCoverage).toEqual(expect.objectContaining({
        covered: lesson.totals.comparisons,
        total: lesson.totals.concepts,
        percent: lesson.percent.comparisons,
        requiredPercent: heatThreshold[lesson.heat],
      }));
      expect(lesson.practiceCoverage).toEqual(expect.objectContaining({
        covered: lesson.totals.extras,
        total: lesson.totals.concepts,
        percent: lesson.percent.extras,
        requiredPercent: heatThreshold[lesson.heat],
      }));
      expect(Array.isArray(lesson.missingConcepts)).toBe(true);
    });
  });

  it("does not add native randomness or video-derived inferred content", () => {
    const extras = fs.readFileSync(path.join(ROOT, "data/exam_practice_extras.js"), "utf8");
    const comparisons = fs.readFileSync(path.join(ROOT, "data/comparisons.js"), "utf8");
    const script = fs.readFileSync(path.join(ROOT, "scripts/report_lesson_material_gaps.js"), "utf8");
    const forbiddenNativeRandom = ["Math", "random"].join(".");

    [extras, comparisons, script].forEach((source) => {
      expect(source.includes(forbiddenNativeRandom)).toBe(false);
      expect(source.includes("crypto.randomUUID")).toBe(false);
    });
    expect(extras).not.toContain("video1151918075");
  });
});
