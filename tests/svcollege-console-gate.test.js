const consoleGate = require("../scripts/report_svcollege_console_gate.js");

describe("SVCollege console gate", () => {
  it("builds a deterministic console-error gate report", () => {
    const first = consoleGate.buildReport();
    const second = consoleGate.buildReport();

    expect(second).toEqual(first);
    expect(first.reportVersion).toBe("svcollege-console-gate-v1");
    expect(first.summary.checks).toBeGreaterThanOrEqual(5);
    expect(first.summary.criticalFlows).toBe(6);
  });

  it("fails release if browser smoke or critical flows report console/runtime gaps", () => {
    const report = consoleGate.buildReport();

    expect(report.summary.ready).toBe(true);
    expect(report.summary.failed).toBe(0);
    report.checks.forEach((check) => {
      expect(check.passed).toBe(true);
      expect(check.failures).toEqual([]);
    });
  });

  it("renders a release-review console gate summary", () => {
    const markdown = consoleGate.toMarkdown(consoleGate.buildReport());

    expect(markdown).toContain("# SVCollege Console Gate");
    expect(markdown).toContain("Desktop browser smoke has zero console errors");
    expect(markdown).toContain("Critical practice flows are ready");
    expect(markdown).toContain("Ready: Yes");
  });
});
