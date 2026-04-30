const metadataAudit = require("../scripts/report_reward_metadata_audit.js");

describe("reward metadata audit", () => {
  it("requires every direct learning reward to include source and concept/question identity", () => {
    const report = metadataAudit.buildReport();
    expect(report.reportVersion).toBe("reward-metadata-audit-v1");
    expect(report.summary.ready).toBe(true);
    expect(report.summary.missingMetadata).toBe(0);
    expect(report.summary.directRewardCalls).toBeGreaterThan(8);
    expect(report.rewardCalls.every((call) => call.hasSource && call.hasIdentity)).toBe(true);
  });
});
