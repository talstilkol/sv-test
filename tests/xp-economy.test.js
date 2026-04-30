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
    expect(app).toContain('const ECONOMY_DISABLED_KEY = "lumenportal:economyDisabled:v1"');
    expect(app).toContain("const XP_MAX_LEVEL = 100");
    expect(app).toContain("function xpRequiredForLevel");
    expect(app).toContain("Math.pow(safeLevel, 1.85)");
    expect(app).toContain("function learnerLevelFromXP");
    expect(app).toContain("function level100GateStatus");
    expect(app).toContain("function level100ProofCoverageStatus");
    expect(app).toContain("function level100ProfessorExamProof");
    expect(app).toContain("function level100ReleaseGateStatus");
    expect(app).toContain("function canReachGlobalLevel100");
    expect(app).toContain("function isEconomyDisabled");
    expect(app).toContain("function setEconomyDisabled");
    expect(app).toContain("רמה 100 = ציון 100 במבחן על כל השאלות ברמת פרופסור");
    expect(app).toContain("const level = rawLevel >= XP_MAX_LEVEL && !gate.passed ? 99 : rawLevel");
  });

  it("keeps awardXP backward-compatible while routing through the economy core", () => {
    expect(app).toContain("function awardLearningReward");
    expect(app).toContain("function awardXP(amount, meta = {})");
    expect(app).toContain("const newXP = Math.max(0, getXP() + amount)");
    expect(app).toContain("return awardLearningReward({ ...meta, xp: amount, coins: coinsForXP(amount) }).xp");
    expect(app).toContain("appendRewardLog");
    expect(app).toContain("rewardLogId");
    expect(app.match(/awardXP\(/g)).toHaveLength(1);
  });

  it("routes real learning surfaces through awardLearningReward with coins and metadata", () => {
    expect(app).toContain('source: "study-streak"');
    expect(app).toContain('source: `mock-exam:${record.templateId}`');
    expect(app).toContain('source: `concept-sprint:${mode.id || mode.title}`');
    expect(app).toContain('source: `flashcards:${rating}`');
    expect(app).toContain('source: "lesson-wrap"');
    expect(app).toContain('source: "reflection"');
    expect(app).toContain("rewardMetaForAnswer(\"advance\")");
    expect(app).toContain("coins: coinsForXP(examXP)");
    expect(app).toContain("coins: coinsForXP(flashcardXP)");
  });

  it("shows a level-up toast with coins earned and the next unlock hint", () => {
    expect(app).toContain("function showLevelUpToast");
    expect(app).toContain("function nextLevelUnlockHint");
    expect(app).toContain("const previousLevel = learnerLevelFromXP(getXP()).level");
    expect(app).toContain("if (safeXP > 0 && nextLevel.level > previousLevel)");
    expect(app).toContain("עלית לרמת תלמיד");
    expect(app).toContain("+${coinsEarned} מטבעות");
    expect(app).toContain('kind: "level-up"');
    expect(app).toContain('className = `achievement-toast ${ach.kind === "level-up" ? "level-up-toast" : ""}`.trim()');
    expect(css).toContain(".achievement-toast.level-up-toast");
  });

  it("respects reduced motion for level-up effects", () => {
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
    expect(css).toContain(".achievement-toast.level-up-toast");
    expect(css).toContain(".reduced-motion .achievement-toast");
    expect(css).toContain("transition: none !important");
    expect(css).toContain("transform: none !important");
  });

  it("does not announce duplicate rewards as level ups", () => {
    const duplicateBranch = app.slice(
      app.indexOf("if (shouldDedupe && rewardAlreadyLogged(rewardEntry))"),
      app.indexOf("const newXP = Math.max(0, getXP() + safeXP)"),
    );
    expect(duplicateBranch).toContain("duplicate: true");
    expect(duplicateBranch).not.toContain("showLevelUpToast");
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

  it("can disable the XP economy without deleting learning scores", () => {
    expect(app).toContain("if (isEconomyDisabled())");
    expect(app).toContain("disabled: true");
    expect(app).toContain("setEconomyDisabled(economy.disabled === true)");
    expect(app).toContain("כלכלת התגמולים מושהית. ציונים והתקדמות נשארים שמורים.");
    expect(app).toContain("לא נמחקים XP, מטבעות, רכישות או ציוני למידה קיימים");
    const disabledBranch = app.slice(
      app.indexOf("if (isEconomyDisabled())"),
      app.indexOf("const shouldDedupe = (safeXP > 0 || safeCoins > 0)"),
    );
    expect(disabledBranch).not.toContain("localStorage.setItem(XP_KEY");
    expect(disabledBranch).not.toContain("localStorage.setItem(COINS_KEY");
    expect(disabledBranch).not.toContain("saveScores");
  });

  it("awards achievement XP and coins without replacing mastery proof", () => {
    expect(app).toContain('source: "achievement"');
    expect(app).toContain("xp: 25");
    expect(app).toContain("coins: 8");
    expect(app).toContain("פתח מבחן רמה 100 — פרופסור וקבל 100%");
  });

  it("renders compact XP, level and coin UI in the existing sidebar widget", () => {
    expect(app).toContain('class="xp-level"');
    expect(app).toContain('class="xp-student-level"');
    expect(app).toContain('class="xp-band"');
    expect(app).toContain('class="coin-total"');
    expect(app).toContain('class="xp-progress"');
    expect(css).toContain(".xp-widget .xp-level");
    expect(css).toContain(".xp-widget .xp-student-level");
    expect(css).toContain(".xp-widget .coin-total");
    expect(css).toContain(".xp-widget .xp-progress");
  });

  it("adds an XP detail panel with next action and level 100 gate copy", () => {
    const html = read("index.html");
    expect(html).toContain('id="xp-detail-overlay"');
    expect(html).toContain('id="xp-detail-body"');
    expect(app).toContain("function renderXPDetailPanel");
    expect(app).toContain("function recentRewardSummary");
    expect(app).toContain("function economyDashboardSummary");
    expect(app).toContain("function economyRewardTuningRows");
    expect(app).toContain("function nextEconomyAction");
    expect(app).toContain("openXPDetailPanel");
    expect(app).toContain("xp-gate-checklist");
    expect(app).toContain("מאזן כלכלה");
    expect(app).toContain("טבלת תגמולים");
    expect(app).toContain("averageCoinsPerDay");
    expect(app).toContain("nextUnlock");
    expect(app).toContain('id: "highest-challenge-proof"');
    expect(app).toContain('id: "code-proof"');
    expect(app).toContain('id: "no-open-weakness"');
    expect(app).toContain('id: "release-gates-green"');
    expect(css).toContain(".xp-detail-overlay");
    expect(css).toContain(".xp-detail-summary");
    expect(css).toContain(".xp-gate-checklist");
    expect(css).toContain(".xp-reward-list");
  });

  it("defines an economy tuning table for each real reward surface", () => {
    expect(app).toContain('id: "answer-correct"');
    expect(app).toContain('id: "answer-advance"');
    expect(app).toContain('id: "study-streak"');
    expect(app).toContain('id: "flashcards"');
    expect(app).toContain('id: "concept-sprint"');
    expect(app).toContain('id: "mock-exam"');
    expect(app).toContain('id: "lesson-wrap"');
    expect(app).toContain('id: "reflection"');
    expect(app).toContain('id: "achievement"');
    expect(app).toContain('id: "peer-review"');
    expect(app).toContain("רק אחרי מעבר שלבי MC/קוד אמיתיים");
    expect(app).toContain("לפי תוצאות הסשן בפועל, עם hash דטרמיניסטי");
  });

  it("adds a real professor-only level 100 mock exam gate", () => {
    expect(app).toContain('id: "level_100_professor"');
    expect(app).toContain("professorOnly: true");
    expect(app).toContain("level100Gate: true");
    expect(app).toContain("function isProfessorLevelQuestion");
    expect(app).toContain("function questionMatchesExamTemplate");
    expect(app).toContain("const level100GateProof = {");
    expect(app).toContain("allQuestionsProfessor: totalQs > 0 && professorGate.total === totalQs");
    expect(app).toContain("passed: score === 100 && totalQs > 0 && professorGate.total === totalQs && professorGate.right === professorGate.total");
  });

  it("blocks level 100 when release gates are missing or red", () => {
    const html = read("index.html");
    expect(html).toContain("data/level100_release_gates.js?v=level100-gate-v1");
    expect(app).toContain("window.LEVEL100_RELEASE_GATES");
    expect(app).toContain('status: "unknown/unavailable"');
    expect(app).toContain("releaseGate.ready");
    expect(app).toContain("QA, build ו-smoke ירוקים לפני פתיחת רמה 100");
  });
});
