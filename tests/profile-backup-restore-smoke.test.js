const profileSmoke = require("../scripts/report_profile_backup_restore_smoke.js");

describe("local profile backup/restore smoke", () => {
  it("covers scores, XP, coins, purchases and reward history", () => {
    const report = profileSmoke.buildReport();
    expect(report.reportVersion).toBe("profile-backup-restore-smoke-v1");
    expect(report.summary.ready).toBe(true);
    expect(report.summary.failed).toBe(0);
    expect(report.checks.map((check) => check.id)).toEqual([
      "export-buttons",
      "snapshot-includes-learning-state",
      "snapshot-includes-economy",
      "restore-imports-learning-state",
      "restore-imports-economy",
    ]);
  });
});
