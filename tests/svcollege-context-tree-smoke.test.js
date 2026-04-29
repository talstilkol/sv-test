const contextTreeSmoke = require("../scripts/report_svcollege_context_tree_smoke.js");

describe("SVCollege context tree smoke", () => {
  it("builds a deterministic right-side tree report", () => {
    const first = contextTreeSmoke.buildReport();
    const second = contextTreeSmoke.buildReport();

    expect(second).toEqual(first);
    expect(first.reportVersion).toBe("svcollege-context-tree-smoke-v1");
    expect(first.summary.targets).toBeGreaterThanOrEqual(20);
    expect(first.targets.map((target) => target.id)).toEqual(expect.arrayContaining([
      "home",
      "lessonTree",
      "knowledgeMap",
      "studyMode",
      "trainer",
      "mockExam",
      "codeTrace",
      "codeBlocks",
      "blueprints",
    ]));
  });

  it("keeps every right-side branch and submenu smoke target wired", () => {
    const report = contextTreeSmoke.buildReport();

    expect(report.summary.ready).toBe(true);
    expect(report.summary.failed).toBe(0);
    expect(report.summary.shellFailures).toBe(0);
    expect(report.summary.modules).toBe(15);
    expect(report.summary.moduleGaps).toBe(0);
    expect(report.shellFailures).toEqual([]);
    expect(report.svcollegeModuleGaps).toEqual([]);
    report.targets.forEach((target) => {
      expect(target.passed).toBe(true);
      expect(target.failures).toEqual([]);
    });
  });

  it("renders a release-review summary for the tree gate", () => {
    const markdown = contextTreeSmoke.toMarkdown(contextTreeSmoke.buildReport());

    expect(markdown).toContain("# SVCollege Context Tree Smoke");
    expect(markdown).toContain("Home / Lessons");
    expect(markdown).toContain("Lesson concept tree");
    expect(markdown).toContain("Knowledge Trainer");
    expect(markdown).toContain("Mock Exam");
    expect(markdown).toContain("Ready: Yes");
  });
});
