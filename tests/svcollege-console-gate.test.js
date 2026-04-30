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

  it("blocks release while critical practice flows are not ready", () => {
    const report = consoleGate.buildReport();

    expect(report.summary.ready).toBe(false);
    expect(report.summary.failed).toBe(1);
    expect(report.checks.find((check) => check.id === "critical-flows-ready").passed).toBe(false);
  });

  it("renders a release-review console gate summary", () => {
    const markdown = consoleGate.toMarkdown(consoleGate.buildReport());

    expect(markdown).toContain("# SVCollege Console Gate");
    expect(markdown).toContain("Desktop browser smoke has zero console errors");
    expect(markdown).toContain("Critical practice flows are ready");
    expect(markdown).toContain("Ready: No");
  });
});
