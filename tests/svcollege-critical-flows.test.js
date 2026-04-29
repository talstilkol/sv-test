const criticalFlows = require("../scripts/report_svcollege_critical_flows.js");

describe("SVCollege critical practice flow smoke", () => {
  it("builds a deterministic report for the six Finish Line 1 practice flows", () => {
    const first = criticalFlows.buildReport();
    const second = criticalFlows.buildReport();

    expect(second).toEqual(first);
    expect(first.reportVersion).toBe("svcollege-critical-flows-v1");
    expect(first.summary.flows).toBe(6);
    expect(first.flows.map((flow) => flow.id)).toEqual([
      "trainer",
      "studyMode",
      "mockExam",
      "bugHunt",
      "miniBuild",
      "codeTrace",
    ]);
  });

  it("keeps every critical flow wired and covered across all SVCollege modules", () => {
    const report = criticalFlows.buildReport();

    expect(report.summary.ready).toBe(true);
    expect(report.summary.passed).toBe(report.summary.flows);
    expect(report.summary.failed).toBe(0);
    expect(report.summary.modules).toBe(15);
    report.flows.forEach((flow) => {
      expect(flow.passed).toBe(true);
      expect(flow.failures).toEqual([]);
      expect(flow.coverage.totalModules).toBe(15);
      expect(flow.coverage.passedModules).toBe(15);
      expect(flow.coverage.missingModules).toEqual([]);
    });
  });

  it("renders a readable gate report for release review", () => {
    const markdown = criticalFlows.toMarkdown(criticalFlows.buildReport());

    expect(markdown).toContain("# SVCollege Critical Practice Flow Smoke");
    expect(markdown).toContain("Knowledge Trainer");
    expect(markdown).toContain("Study Mode");
    expect(markdown).toContain("Mock Exam");
    expect(markdown).toContain("Bug Hunt");
    expect(markdown).toContain("Mini Build");
    expect(markdown).toContain("Code Trace");
    expect(markdown).toContain("Ready: Yes");
  });
});
