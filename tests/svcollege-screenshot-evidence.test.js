const screenshotEvidence = require("../scripts/report_svcollege_screenshot_evidence.js");

describe("SVCollege critical flow screenshot evidence", () => {
  it("builds a deterministic screenshot report", () => {
    const first = screenshotEvidence.buildReport();
    const second = screenshotEvidence.buildReport();

    expect(second).toEqual(first);
    expect(first.reportVersion).toBe("svcollege-screenshot-evidence-v1");
    expect(first.summary.screenshots).toBe(12);
    expect(first.summary.desktop).toBe(6);
    expect(first.summary.mobile).toBe(6);
  });

  it("keeps desktop and mobile critical-flow screenshots present and valid", () => {
    const report = screenshotEvidence.buildReport();

    expect(report.summary.ready).toBe(true);
    expect(report.summary.failed).toBe(0);
    report.screenshots.forEach((item) => {
      expect(item.passed).toBe(true);
      expect(item.exists).toBe(true);
      expect(item.validPng).toBe(true);
      expect(item.bytes).toBeGreaterThan(10000);
      expect(item.width).toBeGreaterThanOrEqual(320);
      expect(item.height).toBeGreaterThanOrEqual(320);
    });
  });

  it("renders a release-review screenshot summary", () => {
    const markdown = screenshotEvidence.toMarkdown(screenshotEvidence.buildReport());

    expect(markdown).toContain("# SVCollege Critical Flow Screenshot Evidence");
    expect(markdown).toContain("trainer");
    expect(markdown).toContain("mock-exam");
    expect(markdown).toContain("mobile");
    expect(markdown).toContain("Ready: Yes");
  });
});
