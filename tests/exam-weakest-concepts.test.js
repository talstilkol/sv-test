const weakest = require("../scripts/report_exam_weakest_concepts.js");

describe("exam week weakest concepts report", () => {
  it("builds a deterministic weakest-10 queue for SVCollege exam work", () => {
    const first = weakest.buildReport();
    const second = weakest.buildReport();

    expect(second).toEqual(first);
    expect(first.reportVersion).toBe("exam-week-weakest-v1");
    expect(first.target).toBe("SVCollege AI & Full Stack");
    expect(first.policy.priority).toBe("P-0.3.1");
    expect(first.topTen).toHaveLength(10);
    expect(first.summary.totalConcepts).toBeGreaterThan(100);
    expect(first.topTen[0].riskScore).toBeGreaterThanOrEqual(first.topTen[9].riskScore);
  });

  it("gives every queued concept a concrete exam-week next action", () => {
    const report = weakest.buildReport();

    report.topTen.forEach((item, index) => {
      expect(item.rank).toBe(index + 1);
      expect(item.key).toContain("::");
      expect(item.moduleTitle).toEqual(expect.any(String));
      expect(item.reasons.length).toBeGreaterThan(0);
      expect(item.nextAction).toEqual(expect.any(String));
      expect(item.nextAction.length).toBeGreaterThan(10);
    });
  });

  it("renders markdown with the exact daily command", () => {
    const markdown = weakest.toMarkdown(weakest.buildReport());

    expect(markdown).toContain("# Exam Week Weakest Concepts");
    expect(markdown).toContain("## Weakest 10");
    expect(markdown).toContain("npm run exam:weakest:write");
  });
});
