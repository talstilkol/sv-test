const inventory = require("../scripts/report_release_inventory.js");

describe("release inventory report", () => {
  it("classifies known release surfaces without unknown ownership", () => {
    expect(inventory.classifyPath("QUESTION_QUALITY_REPORT.json")).toBe("generated-report");
    expect(inventory.classifyPath("scripts/report_release_inventory.js")).toBe("script");
    expect(inventory.classifyPath("tests/release-inventory-report.test.js")).toBe("test");
    expect(inventory.classifyPath("data/questions_bank.js")).toBe("data");
    expect(inventory.classifyPath("app.js")).toBe("app-shell");
  });

  it("builds a deterministic dirty-worktree inventory from git porcelain input", () => {
    const report = inventory.buildReport({
      generatedAt: "2026-05-06T15:10:00.000Z",
      rawStatus: [
        " M QUESTION_QUALITY_REPORT.json",
        "?? scripts/report_release_inventory.js",
        " M app.js",
      ].join("\n"),
    });

    expect(report.reportVersion).toBe("release-inventory-v1");
    expect(report.ready).toBe(true);
    expect(report.releaseAllowed).toBe(false);
    expect(report.summary.totalChangedPaths).toBe(3);
    expect(report.summary.unknownPaths).toBe(0);
    expect(report.summary.byClass["generated-report"]).toBe(1);
    expect(report.summary.byClass.script).toBe(1);
    expect(report.summary.byClass["app-shell"]).toBe(1);
  });
});
