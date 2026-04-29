const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

describe("XP economy implementation", () => {
  const app = read("app.js");
  const css = read("style.css");

  it("adds coins and a 100-level non-linear XP model", () => {
    expect(app).toContain('const COINS_KEY = "lumenportal:coins:v1"');
    expect(app).toContain('const REWARD_LOG_KEY = "lumenportal:rewardLog:v1"');
    expect(app).toContain("const XP_MAX_LEVEL = 100");
    expect(app).toContain("function xpRequiredForLevel");
    expect(app).toContain("Math.pow(safeLevel, 1.85)");
    expect(app).toContain("function learnerLevelFromXP");
    expect(app).toContain("function canReachGlobalLevel100");
  });

  it("keeps awardXP backward-compatible while routing through the economy core", () => {
    expect(app).toContain("function awardLearningReward");
    expect(app).toContain("function awardXP(amount, meta = {})");
    expect(app).toContain("const newXP = Math.max(0, getXP() + amount)");
    expect(app).toContain("return awardLearningReward({ ...meta, xp: amount, coins: coinsForXP(amount) }).xp");
    expect(app).toContain("appendRewardLog");
    expect(app).toContain("rewardLogId");
  });

  it("prevents duplicate question rewards with stable reward IDs", () => {
    expect(app).toContain("function readRewardLog");
    expect(app).toContain("function rewardAlreadyLogged");
    expect(app).toContain("const shouldDedupe = (safeXP > 0 || safeCoins > 0) && Boolean(questionId || rewardConceptKey)");
    expect(app).toContain("if (shouldDedupe && rewardAlreadyLogged(rewardEntry))");
    expect(app).toContain("duplicate: true");
    const rewardIdBody = app.slice(app.indexOf("function rewardLogId"), app.indexOf("function readRewardLog"));
    expect(rewardIdBody).not.toContain("entry.at");
  });

  it("awards achievement XP and coins without replacing mastery proof", () => {
    expect(app).toContain('source: "achievement"');
    expect(app).toContain("xp: 25");
    expect(app).toContain("coins: 8");
    expect(app).toContain("רמה 100 דורשת מאסטר מלא בכל המושגים");
  });

  it("renders compact XP, level and coin UI in the existing sidebar widget", () => {
    expect(app).toContain('class="xp-level"');
    expect(app).toContain('class="xp-band"');
    expect(app).toContain('class="coin-total"');
    expect(app).toContain('class="xp-progress"');
    expect(css).toContain(".xp-widget .xp-level");
    expect(css).toContain(".xp-widget .coin-total");
    expect(css).toContain(".xp-widget .xp-progress");
  });

  it("adds an XP detail panel with next action and level 100 gate copy", () => {
    const html = read("index.html");
    expect(html).toContain('id="xp-detail-overlay"');
    expect(html).toContain('id="xp-detail-body"');
    expect(app).toContain("function renderXPDetailPanel");
    expect(app).toContain("function recentRewardSummary");
    expect(app).toContain("function nextEconomyAction");
    expect(app).toContain("openXPDetailPanel");
    expect(app).toContain("רמה 100 דורשת מאסטר מלא בכל המושגים");
    expect(css).toContain(".xp-detail-overlay");
    expect(css).toContain(".xp-detail-summary");
    expect(css).toContain(".xp-reward-list");
  });
});
