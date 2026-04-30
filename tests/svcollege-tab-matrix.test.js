const tabMatrix = require("../scripts/report_svcollege_tab_matrix.js");

describe("SVCollege module × tab matrix", () => {
  it("builds a deterministic strict matrix for Finish Line 1", () => {
    const first = tabMatrix.buildReport();
    const second = tabMatrix.buildReport();

    expect(second).toEqual(first);
    expect(first.reportVersion).toBe("svcollege-tab-matrix-v1");
    expect(first.target).toBe("SVCollege AI & Full Stack only");
    expect(first.summary.modules).toBe(15);
    expect(first.summary.strictTabs).toBeGreaterThanOrEqual(14);
  });

  it("keeps manual-question tab gaps visible instead of treating generated coverage as ready", () => {
    const report = tabMatrix.buildReport();

    expect(report.summary.ready).toBe(false);
    expect(report.summary.strictCoverage).toBe(98.2);
    expect(report.summary.strictGaps).toBe(4);
    expect(report.strictGaps).toEqual([
      "עיצוב רספונסיבי ו-CSS מתקדם::trainer",
      "עיצוב רספונסיבי ו-CSS מתקדם::mockExam",
      "AI למפתחים — Cursor, Windsurf, Bolt, תיעוד וטסטים עם AI::trainer",
      "AI למפתחים — Cursor, Windsurf, Bolt, תיעוד וטסטים עם AI::mockExam",
    ]);

    report.modules.forEach((module) => {
      expect(module.counts.lessons).toBeGreaterThan(0);
      expect(module.counts.trace).toBeGreaterThan(0);
      expect(module.counts.bug).toBeGreaterThan(0);
      expect(module.counts.build).toBeGreaterThan(0);
      expect(module.counts.codeBlock).toBeGreaterThan(0);
      expect(module.counts.capstone).toBeGreaterThan(0);
      expect(module.counts.prereq).toBeGreaterThan(0);
    });
  });

  it("keeps support tabs wired into the unified context-tree system", () => {
    const report = tabMatrix.buildReport();

    expect(report.summary.supportGaps).toBe(0);
    expect(report.supportGaps).toEqual([]);
    expect(report.supportTabs.every((tab) => tab.passed)).toBe(true);
    expect(report.supportTabs.map((tab) => tab.id)).toEqual(expect.arrayContaining([
      "guide",
      "grandma",
      "programmingBasics",
      "programmingMuseum",
      "learningEvidence",
    ]));
  });

  it("renders markdown with the matrix and counts", () => {
    const markdown = tabMatrix.toMarkdown(tabMatrix.buildReport());

    expect(markdown).toContain("# SVCollege Module × Tab Matrix");
    expect(markdown).toContain("## Matrix");
    expect(markdown).toContain("## Counts");
    expect(markdown).toContain("## Support Tabs");
    expect(markdown).toContain("Strict cells");
  });
});
