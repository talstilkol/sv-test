const exporter = require("../scripts/export_svcollege_student_summary.js");

describe("SVCollege student/teacher readiness export", () => {
  it("builds a blocked exam summary when manual practice gates are incomplete", () => {
    const report = exporter.buildExport();
    expect(report.reportVersion).toBe("svcollege-student-readiness-export-v1");
    expect(report.summary.readyForExamPractice).toBe(false);
    expect(report.summary.blockers).toBe(7);
    expect(report.summary.coveredModules).toBe(report.summary.totalModules);
    expect(report.summary.readinessAverage).toBe(96.7);
    expect(report.summary.tabCoverage).toBe(98.2);
    expect(report.summary.tabCells).toBe("221/225");
    expect(report.summary.flowSimulationPassed).toBe(true);
  });

  it("includes weak-concept next actions for the student and teacher", () => {
    const report = exporter.buildExport();
    expect(report.audience).toEqual(["student", "teacher"]);
    expect(report.nextActions).toHaveLength(5);
    report.nextActions.forEach((item) => {
      expect(item.conceptKey).toContain("::");
      expect(item.action).toBeTruthy();
    });
  });

  it("acts as a teacher-facing weekly progress export before any broad dashboard", () => {
    const report = exporter.buildExport();
    const markdown = exporter.toMarkdown(report);

    expect(report.reportScope).toBe("weekly-progress");
    expect(report.teacherWeeklyProgress.status).toBe("blocked");
    expect(report.teacherWeeklyProgress.moduleCoverage).toBe("15/15");
    expect(report.teacherWeeklyProgress.tabCoverage).toBe("221/225");
    expect(report.teacherWeeklyProgress.recommendedReviewAgenda.length).toBeGreaterThan(0);
    expect(report.teacherWeeklyProgress.evidenceCommands).toEqual(expect.arrayContaining([
      "npm run svcollege:readiness:release",
      "npm run qa:questions:strict",
    ]));
    expect(markdown).toContain("## Teacher Weekly Progress");
    expect(markdown).not.toContain("undefined%");
  });

  it("adds the real learner outcome loop and promotion gate to the weekly export", () => {
    const report = exporter.buildExport();
    const markdown = exporter.toMarkdown(report);

    expect(report.learnerOutcomeLoop.protocol.cohortSize).toBe(10);
    expect(report.learnerOutcomeLoop.trackedMetrics).toEqual(expect.arrayContaining([
      "D1 retention",
      "D7 retention",
      "module mastery",
      "student got stuck feedback",
    ]));
    expect(report.learnerOutcomeLoop.unavailablePolicy).toContain("unknown/unavailable");
    expect(report.studentPromotionGate.requiredEvidence).toEqual(expect.arrayContaining(["feedback"]));
    expect(report.studentPromotionGate.rule).toContain("first-user feedback");
    expect(markdown).toContain("## Learner Outcome Loop");
    expect(markdown).toContain("## Student Promotion Gate");
  });
});
