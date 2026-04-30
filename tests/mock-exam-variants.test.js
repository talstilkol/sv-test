const variants = require("../scripts/report_mock_exam_variants.js");

describe("SVCollege mock exam deterministic variants", () => {
  it("builds three deterministic SVCollege mock variants and exposes manual-question blockers", () => {
    const report = variants.buildReport();
    expect(report.summary.passed).toBe(false);
    expect(report.summary.variants).toBe(3);
    expect(report.summary.blockers).toBe(3);
  });

  it("keeps missing modules visible until manual questions are authored", () => {
    const report = variants.buildReport();
    report.variants.forEach((variant) => {
      expect(variant.totalQuestions).toBe(55);
      expect(variant.uniqueQuestions).toBe(55);
      expect(variant.moduleCoverage.filter((item) => item.covered)).toHaveLength(13);
      expect(variant.missingModules.map((item) => item.title)).toEqual([
        "עיצוב רספונסיבי ו-CSS מתקדם",
        "AI למפתחים — Cursor, Windsurf, Bolt, תיעוד וטסטים עם AI",
      ]);
    });
  });
});
