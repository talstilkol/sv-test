const antiCheat = require("../scripts/report_economy_anti_cheat.js");

describe("XP economy anti-cheat gate", () => {
  it("passes only when duplicate rewards, purchase mastery and fake reward shortcuts are blocked", () => {
    const report = antiCheat.buildReport();
    expect(report.reportVersion).toBe("economy-anti-cheat-v1");
    expect(report.summary.ready).toBe(true);
    expect(report.summary.failed).toBe(0);
    expect(report.summary.passed).toBe(report.summary.checks);
    expect(report.checks.map((check) => check.id)).toEqual([
      "no-math-random",
      "stable-reward-id",
      "duplicate-positive-reward-block",
      "store-purchase-no-xp",
      "store-purchase-no-mastery",
      "store-copy-no-grade-buying",
      "level100-proof-gate",
      "tasks-registers-gate",
    ]);
  });

  it("exports a markdown report for release review evidence", () => {
    const markdown = antiCheat.toMarkdown(antiCheat.buildReport());
    expect(markdown).toContain("# XP Economy Anti-Cheat");
    expect(markdown).toContain("No repeated positive reward");
    expect(markdown).toContain("Store purchases never mint XP");
    expect(markdown).toContain("Level 100 cannot be purchased or reached by XP alone");
  });
});
