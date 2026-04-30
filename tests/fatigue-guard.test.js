const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

describe("learning fatigue guard", () => {
  const app = read("app.js");
  const css = read("style.css");

  it("detects sharp trainer accuracy drops from real recent outcomes", () => {
    expect(app).toContain("let trainerRecentOutcomes = []");
    expect(app).toContain("function recordTrainerOutcome(correct)");
    expect(app).toContain("trainerRecentOutcomes = trainerRecentOutcomes.slice(-12)");
    expect(app).toContain("function trainerFatigueGuardStatus()");
    expect(app).toContain("recentPct <= 34 && previousPct - recentPct >= 34");
  });

  it("renders a review-mode recommendation before continuing hard practice", () => {
    expect(app).toContain("function renderFatigueGuardCard(status)");
    expect(app).toContain("function buildFatigueAwareModeSwitch");
    expect(app).toContain("Fatigue-aware mode switch");
    expect(app).toContain("When accuracy drops, review mode is recommended before more penalty practice");
    expect(app).toContain('recommendedMode: shouldSwitchToReview ? "review" : "current"');
    expect(app).toContain('blockedMode: shouldSwitchToReview ? "penalty-sprint" : ""');
    expect(app).toContain('data-fatigue-guard="${esc(status.source || "learning")}"');
    expect(app).toContain("function wireFatigueGuardActions");
    expect(app).toContain("openStudyMode();");
    expect(app).toContain("renderFatigueGuardCard(trainerFatigueGuardStatus())");
  });

  it("protects penalty concept sprint routes when results show overload", () => {
    expect(app).toContain("function conceptSprintFatigueGuardStatus(mode, pct, results = [])");
    expect(app).toContain("!mode?.penalty || results.length < 3");
    expect(app).toContain("pct <= 50 && misses >= 2");
    expect(app).toContain("const fatigueGuard = conceptSprintFatigueGuardStatus(mode, pct, results)");
    expect(app).toContain("wireFatigueGuardActions(root)");
  });

  it("styles the fatigue guard as a compact inline intervention", () => {
    expect(css).toContain(".fatigue-guard-card");
    expect(css).toContain(".fatigue-guard-card .km-btn-mini");
  });
});
