const svcollegeReadiness = require("../scripts/report_svcollege_readiness.js");

describe("SVCollege readiness report", () => {
  it("builds deterministic module readiness percentages", () => {
    const first = svcollegeReadiness.buildReport();
    const second = svcollegeReadiness.buildReport();

    expect(second).toEqual(first);
    expect(first.reportVersion).toBe("svcollege-readiness-v1");
    expect(first.source).toBe("data/course_blueprints.js#svcollege_fullstack_ai");
    expect(first.summary.modules).toBe(first.modules.length);
    expect(first.summary.modules).toBeGreaterThan(10);
    expect(first.summary.averageReadiness).toBeGreaterThanOrEqual(0);
    expect(first.summary.averageReadiness).toBeLessThanOrEqual(100);
    expect(first.validation.failures).toEqual([]);
  });

  it("tracks every module with status, next action, and weighted dimensions", () => {
    const report = svcollegeReadiness.buildReport();

    report.modules.forEach((module) => {
      expect(["covered", "partial", "gap"]).toContain(module.status);
      expect(["green", "amber", "red"]).toContain(module.level);
      expect(module.readiness).toBeGreaterThanOrEqual(0);
      expect(module.readiness).toBeLessThanOrEqual(100);
      expect(module.nextAction).toEqual(expect.any(String));
      expect(module.nextAction.trim().length).toBeGreaterThan(0);
      expect(module.dimensions).toEqual(
        expect.objectContaining({
          declaredStatus: expect.any(Number),
          lessonCoverage: expect.any(Number),
          conceptCoverage: expect.any(Number),
          questionCoverage: expect.any(Number),
          activityCoverage: expect.any(Number),
        }),
      );
    });
  });

  it("keeps Finish Line 1 open only after every public SVCollege module is covered", () => {
    const report = svcollegeReadiness.buildReport();

    expect(report.summary.finishLineReady).toBe(true);
    expect(report.releaseBlockers).toEqual([]);
    expect(report.modules.some((module) => module.status === "gap")).toBe(false);
    expect(report.modules.every((module) => module.readiness === 100)).toBe(true);
  });
});
