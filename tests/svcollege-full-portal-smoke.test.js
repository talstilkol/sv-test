const fullPortalSmoke = require("../scripts/report_svcollege_full_portal_smoke.js");

describe("SVCollege full portal desktop/mobile smoke", () => {
  it("builds a deterministic desktop and mobile smoke report", () => {
    const first = fullPortalSmoke.buildReport();
    const second = fullPortalSmoke.buildReport();

    expect(second).toEqual(first);
    expect(first.reportVersion).toBe("svcollege-full-portal-smoke-v1");
    expect(first.summary.checks).toBe(9);
  });

  it("keeps desktop primary-action blockers visible when critical flows are not ready", () => {
    const report = fullPortalSmoke.buildReport();

    expect(report.summary.desktopReady).toBe(false);
    expect(report.desktopChecks.map((check) => check.id)).toEqual([
      "desktop-top-tabs",
      "desktop-context-tree",
      "desktop-primary-actions",
      "desktop-lesson-navigation",
    ]);
    expect(report.desktopChecks.find((check) => check.id === "desktop-primary-actions").passed).toBe(false);
  });

  it("closes mobile top tabs, drawer, right tree and focus mode coverage", () => {
    const report = fullPortalSmoke.buildReport();

    expect(report.summary.mobileReady).toBe(true);
    expect(report.mobileChecks.map((check) => check.id)).toEqual([
      "mobile-top-tabs",
      "mobile-drawer",
      "mobile-right-tree",
      "mobile-focus-mode",
      "mobile-console",
    ]);
    expect(report.mobileChecks.every((check) => check.passed)).toBe(true);
  });

  it("renders release-review markdown", () => {
    const markdown = fullPortalSmoke.toMarkdown(fullPortalSmoke.buildReport());

    expect(markdown).toContain("# SVCollege Full Portal Smoke");
    expect(markdown).toContain("Desktop ready: No");
    expect(markdown).toContain("Mobile ready: Yes");
    expect(markdown).toContain("Ready: No");
  });
});
