const topTabSmoke = require("../scripts/report_svcollege_top_tab_browser_smoke.js");

describe("SVCollege top-tab browser smoke evidence", () => {
  it("builds a deterministic top-tab browser smoke gate", () => {
    const first = topTabSmoke.buildReport();
    const second = topTabSmoke.buildReport();

    expect(second).toEqual(first);
    expect(first.reportVersion).toBe("svcollege-top-tab-browser-smoke-gate-v1");
    expect(first.summary.expectedTabs).toBe(22);
    expect(first.summary.evidenceTabs).toBe(22);
  });

  it("keeps every top tab covered by browser smoke evidence", () => {
    const report = topTabSmoke.buildReport();

    expect(report.summary.ready).toBe(true);
    expect(report.summary.passedTabs).toBe(22);
    expect(report.summary.failedTabs).toBe(0);
    expect(report.summary.consoleErrors).toBe(0);
    expect(report.failures).toEqual([]);
  });

  it("renders a release-review summary", () => {
    const markdown = topTabSmoke.toMarkdown(topTabSmoke.buildReport());

    expect(markdown).toContain("# SVCollege Top Tab Browser Smoke");
    expect(markdown).toContain("Tabs: 22/22");
    expect(markdown).toContain("Console errors: 0");
    expect(markdown).toContain("Ready: Yes");
  });
});
