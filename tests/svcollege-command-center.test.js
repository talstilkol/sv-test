const commandCenter = require("../scripts/report_svcollege_command_center.js");

describe("SVCollege command center", () => {
  it("builds a deterministic finish-line command report", () => {
    const first = commandCenter.buildReport();
    const second = commandCenter.buildReport();

    expect(second).toEqual(first);
    expect(first.reportVersion).toBe("svcollege-command-center-v1");
    expect(first.finishLine.target).toBe("SVCollege AI & Full Stack only");
    expect(first.finishLine.modules).toBe(15);
    expect(first.finishLine.releaseBlockers).toBe(0);
    expect(first.finishLine.tabMatrixGaps).toBe(0);
    expect(first.finishLine.browserSmoke.desktop).toBe("pass");
    expect(first.finishLine.browserSmoke.mobile).toBe("pass");
    expect(first.redFirstQueue.length).toBe(0);
    expect(first.tabMatrix.ready).toBe(true);
    expect(first.tabMatrix.strictCoverage).toBe(100);
  });

  it("summarizes source assets and canonical docs", () => {
    const report = commandCenter.buildReport();

    expect(report.sourceAssets.total).toBe(36);
    expect(report.sourceAssets.rootAssets).toBe(0);
    expect(report.docs.every((doc) => doc.exists)).toBe(true);
    expect(report.commands).toEqual(expect.arrayContaining([
      "npm run svcollege:readiness:write",
      "npm run svcollege:tab-matrix:write",
      "npm run lessons:assets",
      "npm run build",
    ]));
  });

  it("records the active limited parallel mode", () => {
    const report = commandCenter.buildReport();
    const activeIds = report.activeParallelMode.activeExternalSessions.map((session) => session.id);
    const completedIds = report.activeParallelMode.completedExternalSessions.map((session) => session.id);

    expect(report.activeParallelMode.status).toBe("single-session-finish-line1-all-modules-covered");
    expect(activeIds).toEqual([]);
    expect(completedIds).toEqual([
      "sql-orm",
      "auth-security",
      "nextjs",
      "museum",
      "nestjs",
      "devops",
      "ai-engineering",
      "design-systems",
    ]);
    expect(report.activeParallelMode.pausedSessions).toEqual(["Question Quality"]);
    expect(report.activeParallelMode.pausedSessions).not.toContain("Auth");
    expect(report.activeParallelMode.pausedSessions).not.toContain("Next.js");
    expect(report.activeParallelMode.pausedSessions).not.toContain("Nest.js");
    expect(report.activeParallelMode.pausedSessions).not.toContain("DevOps");
    expect(report.activeParallelMode.pausedSessions).not.toContain("AI Engineering");
    expect(report.activeParallelMode.currentSessionAllowedScope).toEqual(expect.arrayContaining([
      "Command Center reports",
      "post-SQL/Auth/Next.js/Museum integration quality gates",
    ]));
  });

  it("adds evidence links for every SVCollege module", () => {
    const report = commandCenter.buildReport();

    expect(report.moduleEvidence.length).toBe(report.finishLine.modules);
    report.moduleEvidence.forEach((module) => {
      expect(module.title).toEqual(expect.any(String));
      expect(module.questions.files.length).toBeGreaterThan(0);
      expect(module.activities.files.length).toBeGreaterThan(0);
      expect(module.tabEvidence.status).toBe("mapped-through-course-blueprints");
      expect(module.tabEvidence.files.every((file) => file.exists)).toBe(true);
      expect(module.tests.length).toBeGreaterThan(0);
      expect(module.tests.every((test) => test.exists)).toBe(true);
      expect(module.browserVerification).toEqual(expect.objectContaining({
        status: "desktop-pass/mobile-pass",
        owner: "current",
        report: "SVCOLLEGE_BROWSER_SMOKE.md",
      }));
    });

    const coveredModules = report.moduleEvidence.filter((module) => module.status === "covered");
    expect(coveredModules.every((module) => module.lessonFiles.some((lesson) => lesson.exists))).toBe(true);
  });

  it("blocks covered modules that lack lesson, practice, tab or test evidence", () => {
    const report = commandCenter.buildReport();
    const coveredCount = report.moduleEvidence.filter((module) => module.status === "covered").length;

    expect(report.noEvidenceGate.status).toBe("passed");
    expect(report.noEvidenceGate.checkedCoveredModules).toBe(coveredCount);
    expect(report.noEvidenceGate.failures).toEqual([]);

    const brokenModule = {
      ...report.moduleEvidence.find((module) => module.status === "covered"),
      lessonFiles: [],
      questions: { count: 0, files: [] },
      activities: { count: 0, files: [] },
      tabEvidence: { status: "missing", files: [] },
      tests: [],
    };
    const gate = commandCenter.buildNoEvidenceGate([brokenModule]);

    expect(gate.status).toBe("failed");
    expect(gate.failures).toEqual([
      expect.objectContaining({
        missing: ["lesson", "practice", "tab", "test"],
      }),
    ]);
  });

  it("defines the module promotion rule before broad student rollout", () => {
    const report = commandCenter.buildReport();

    expect(report.promotionRule.status).toBe("defined");
    expect(report.promotionRule.rule).toContain("content coverage");
    expect(report.promotionRule.rule).toContain("practice coverage");
    expect(report.promotionRule.rule).toContain("first-user feedback");
    expect(report.promotionRule.requiredEvidence).toEqual(expect.arrayContaining([
      expect.stringContaining("smoke"),
      expect.stringContaining("feedback"),
    ]));
    expect(report.promotionRule.currentFinishLineScope).toContain("exam-ready");
  });

  it("keeps the red-first queue sorted by release priority", () => {
    const report = commandCenter.buildReport();

    expect(report.redFirstQueue.map((item) => item.title)).toEqual([]);
  });

  it("extracts the parallel-session opening board", () => {
    const report = commandCenter.buildReport();
    const sessions = report.parallelSessions.sessions.map((session) => session.session);

    expect(report.parallelSessions.total).toBe(9);
    expect(sessions).toEqual(expect.arrayContaining([
      "0 Coordinator",
      "1 SQL/ORM",
      "8 Question Quality",
      "7 All Tabs QA",
    ]));
    expect(report.parallelSessions.nextOpenRule).toContain("All 15 SVCollege modules are covered");
  });

  it("renders markdown with queue and gates", () => {
    const markdown = commandCenter.toMarkdown(commandCenter.buildReport());

    expect(markdown).toContain("# SVCollege Command Center");
    expect(markdown).toContain("## Current Parallel Mode");
    expect(markdown).toContain("## Red-First Queue");
    expect(markdown).toContain("## No-Evidence Gate");
    expect(markdown).toContain("## Promotion Rule");
    expect(markdown).toContain("## Module Evidence Matrix");
    expect(markdown).toContain("## Module × Tab Matrix");
    expect(markdown).toContain("Desktop browser smoke: pass");
    expect(markdown).toContain("Mobile browser smoke: pass");
    expect(markdown).toContain("## Parallel Sessions");
    expect(markdown).toContain("Per-distractor feedback");
  });
});
