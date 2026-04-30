const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

describe("locked experience reward balancing", () => {
  const app = read("app.js");

  it("awards locked experience completion once through the shared reward gate", () => {
    expect(app).toContain("function awardMuseumExperienceCompletionReward");
    expect(app).toContain('source: "museum-experience-completion"');
    expect(app).toContain("questionId: questionId || experienceId");
    expect(app).toContain("conceptKey: rewardConceptKey || storeItemId");
    expect(app).toContain("xp: 12");
    expect(app).toContain("coins: coinsForXP(12)");
    expect(app).toContain("awardLearningReward({");
    expect(app).toContain("if ((state.experienceRewards || []).includes(experienceId)) return;");
    expect(app).toContain("state.experienceRewards = [...(state.experienceRewards || []), experienceId]");
  });

  it("requires unlocked store access and stable completion metadata", () => {
    expect(app).toContain("!isMuseumTicketOpen(storeItemId)");
    expect(app).toContain("data-museum-experience-complete");
    expect(app).toContain("data-museum-experience-store");
    expect(app).toContain("data-museum-experience-concept");
    expect(app).toContain("data-museum-experience-question");
  });

  it("keeps purchase and completion rewards separate", () => {
    expect(app).toContain('source: "store-purchase"');
    expect(app).toContain("xp: 0");
    expect(app).toContain("coins: -item.price");
    expect(app).toContain("if (item.category === \"cosmetic\") applyCosmeticTheme(item.id)");
    expect(app).not.toContain("mastery: true");
    expect(app).not.toContain("mastery = true");
  });
});
