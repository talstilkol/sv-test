const accessibilitySmoke = require("../scripts/report_svcollege_accessibility_smoke.js");

describe("SVCollege accessibility smoke", () => {
  it("builds a deterministic accessibility report", () => {
    const first = accessibilitySmoke.buildReport();
    const second = accessibilitySmoke.buildReport();

    expect(second).toEqual(first);
    expect(first.reportVersion).toBe("svcollege-accessibility-smoke-v1");
    expect(first.summary.checks).toBeGreaterThanOrEqual(7);
    expect(first.summary.topTabs).toBeGreaterThanOrEqual(20);
  });

  it("keeps focus, modal, keyboard and contrast gates green", () => {
    const report = accessibilitySmoke.buildReport();

    expect(report.summary.ready).toBe(true);
    expect(report.summary.failed).toBe(0);
    report.checks.forEach((check) => {
      expect(check.passed).toBe(true);
      expect(check.failures).toEqual([]);
    });
  });

  it("renders a release-review accessibility summary", () => {
    const markdown = accessibilitySmoke.toMarkdown(accessibilitySmoke.buildReport());

    expect(markdown).toContain("# SVCollege Accessibility Smoke");
    expect(markdown).toContain("Focus order shell");
    expect(markdown).toContain("Modal close controls");
    expect(markdown).toContain("Keyboard navigation");
    expect(markdown).toContain("Ready: Yes");
  });
});
