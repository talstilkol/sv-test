const rewardStoreSmoke = require("../scripts/report_reward_store_smoke.js");

describe("reward store desktop/mobile smoke", () => {
  it("passes the deterministic store layout and wiring gate", () => {
    const report = rewardStoreSmoke.buildReport();
    expect(report.reportVersion).toBe("reward-store-smoke-v1");
    expect(report.summary.ready).toBe(true);
    expect(report.summary.failed).toBe(0);
    expect(report.checks.map((check) => check.id)).toEqual([
      "store-dom-shell",
      "store-open-routing",
      "desktop-layout",
      "mobile-layout",
      "purchase-states",
      "filters-and-buy-actions",
      "student-safety-copy",
    ]);
  });
});
