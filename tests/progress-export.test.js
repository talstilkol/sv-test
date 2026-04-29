const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

describe("progress export/import economy coverage", () => {
  const app = read("app.js");

  it("exports active local profile progress with XP, coins, reward log and purchases", () => {
    expect(app).toContain("function collectProfileScopedEntries");
    expect(app).toContain("function collectEconomyExport");
    expect(app).toContain("version: 2");
    expect(app).toContain("profile: {");
    expect(app).toContain("economy: collectEconomyExport()");
    expect(app).toContain("answeredQuestions: {}");
    expect(app).toContain("weaknesses: {}");
    expect(app).toContain("rewardLog: readRewardLog()");
    expect(app).toContain("purchases: getStorePurchases()");
    expect(app).toContain('collectProfileScopedEntries(["lumenportal:scores:"])');
    expect(app).toContain('collectProfileScopedEntries(["lumenportal:prof:"])');
    expect(app).toContain("data.answeredQuestions = collectProfileScopedEntries([ANSWERED_QUESTIONS_KEY])");
    expect(app).toContain("data.weaknesses = collectProfileScopedEntries([MISTAKE_AGENT_KEY, CONFIDENCE_CALIBRATION_KEY, CONFUSION_BLOCKERS_KEY])");
    expect(app).toContain("masteryProof");
  });

  it("imports economy state into the active local profile without negative balances", () => {
    expect(app).toContain("function importEconomyExport");
    expect(app).toContain("Math.max(0, Number(value) || 0)");
    expect(app).toContain("[XP_KEY, economy.xp]");
    expect(app).toContain("[COINS_KEY, economy.coins]");
    expect(app).toContain("localStorage.setItem(key, String(safeValue))");
    expect(app).toContain("localStorage.setItem(REWARD_LOG_KEY, JSON.stringify(economy.rewardLog.slice(0, 80)))");
    expect(app).toContain("localStorage.setItem(STORE_PURCHASES_KEY, JSON.stringify(economy.purchases))");
    expect(app).toContain("Object.entries(data.answeredQuestions || {}).forEach(([k, v]) => localStorage.setItem(k, v))");
    expect(app).toContain("Object.entries(data.weaknesses || {}).forEach(([k, v]) => localStorage.setItem(k, v))");
    expect(app).toContain("importEconomyExport(economy)");
  });
});
