const museumAccessSmoke = require("../scripts/report_museum_access_smoke.js");

describe("museum access smoke", () => {
  it("keeps museum locks separate while exposing SVCollege manual-practice blockers", () => {
    const first = museumAccessSmoke.buildReport();
    const second = museumAccessSmoke.buildReport();

    expect(second).toEqual(first);
    expect(first.reportVersion).toBe("museum-access-smoke-v1");
    expect(first.summary.ready).toBe(false);
    expect(first.summary.failed).toBeGreaterThan(0);
    expect(first.checks.map((check) => check.id)).toEqual([
      "museum-xp-gates-present",
      "museum-tabs-present",
      "museum-pass-catalog",
      "exam-content-not-locked-copy",
      "svcollege-readiness-unblocked",
      "svcollege-tab-matrix-unblocked",
      "svcollege-critical-flows-unblocked",
      "full-portal-smoke-unblocked",
      "offline-shell-updated",
    ]);
  });
});
