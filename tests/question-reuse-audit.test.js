const reuseAudit = require("../scripts/report_question_reuse_audit.js");

describe("question reuse audit", () => {
  it("builds a deterministic concept-tag reuse report from real portal data", () => {
    const first = reuseAudit.buildReport();
    const second = reuseAudit.buildReport();

    expect(second).toEqual(first);
    expect(first.reportVersion).toBe("question-reuse-audit-v1");
    expect(first.summary.questions).toBe(983);
    expect(first.summary.conceptTags).toBe(384);
    expect(first.summary.legacyGeneratedFiltered).toBe(0);
  });

  it("has no duplicate question identity inside the same concept and kind", () => {
    const report = reuseAudit.buildReport();

    expect(report.summary.ready).toBe(true);
    expect(report.summary.duplicateIdentityIssues).toBe(0);
    expect(report.summary.missingConceptKey).toBe(0);
  });

  it("audits the real local learner profile contract used by no-repeat routing", () => {
    const report = reuseAudit.buildReport();

    expect(report.summary.failedProfileContractChecks).toBe(0);
    expect(report.profileContractChecks.map((check) => check.id)).toEqual(expect.arrayContaining([
      "local profile selector",
      "profile scope prefix",
      "answered questions key",
      "answered state by concept",
      "profile-scoped localStorage",
      "unanswered selector",
      "progress export carries answered IDs",
      "progress import restores answered IDs",
    ]));
  });

  it("loads browser data scripts from index so newly added data files are audited", () => {
    const scripts = reuseAudit.indexBrowserScripts();

    expect(scripts).toEqual(expect.arrayContaining([
      "data/questions_bank.js",
      "data/svcollege_questions_ai_engineering.js",
      "data/svcollege_traces_design_systems.js",
      "data/svcollege_builds_bridge.js",
      "data/course_blueprints.js",
      "content-loader.js",
    ]));
  });
});
