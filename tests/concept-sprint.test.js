const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

describe("concept sprint assessment", () => {
  const html = read("index.html");
  const app = read("app.js");
  const css = read("style.css");

  it("adds a dedicated pure-concepts tab and view", () => {
    expect(html).toContain('id="open-concept-sprint"');
    expect(html).toContain("מושגים נטו");
    expect(html).toContain('id="concept-sprint-view"');
    expect(html).toContain('id="concept-sprint-content"');
  });

  it("defines quick, medium and long assessment modes with risk/reward", () => {
    expect(app).toContain("const CONCEPT_SPRINT_MODES");
    expect(app).toContain('id: "quick"');
    expect(app).toContain('id: "medium"');
    expect(app).toContain('id: "long"');
    expect(app).toContain("penalty: 45");
    expect(app).toContain("penalty: 18");
    expect(app).toContain("penalty: 0");
    expect(app).toContain("bonus: 90");
  });

  it("routes every sprint answer through the knowledge trainer scoring path", () => {
    expect(app).toContain("function submitConceptSprintAnswer");
    expect(app).toContain("applyAnswer(q.lesson.id, q.concept.conceptName");
    expect(app).toContain('mode: "concept-sprint"');
    expect(app).toContain('renderWrongAnswerCoachCard({ mode: "concept-sprint"');
    expect(app).toContain("openConceptSprintBtn?.addEventListener(\"click\", openConceptSprint)");
    expect(app).toContain("window.LUMEN_OPEN_CONCEPT_SPRINT = openConceptSprint");
    expect(app).toContain('initialTabFromUrl === "concept-sprint"');
  });

  it("shows one-line concept explanations and comparison tables for similar terms", () => {
    expect(app).toContain("function conceptSprintOneLine");
    expect(app).toContain("function renderConceptSprintComparison");
    expect(app).toContain("function renderConceptSprintComparisonLibrary");
    expect(app).toContain("function startConceptSprintComparison");
    expect(app).toContain("CONCEPT_SPRINT_COMPARISONS");
    expect(app).toContain("הבדלי HTTP methods");
    expect(app).toContain("השוואות חובה");
    expect(app).toContain('{ term: "GET", what: "מביא מידע"');
    expect(app).toContain('{ term: "POST", what: "יוצר או שולח מידע"');
    expect(app).toContain('class="cs-chip-definition"');
    expect(app).toContain('class="cs-one-line"');
    expect(app).toContain('class="cs-compare"');
    expect(app).toContain('data-sprint-compare="${groupIndex}"');
    expect(app).toContain("sourceComparisonIndex");
  });

  it("applies XP bonus or penalty without allowing negative XP", () => {
    expect(app).toContain("const delta = passed ? mode.bonus + correct * 6 : -mode.penalty");
    expect(app).toContain("awardLearningReward({");
    expect(app).toContain("source: `concept-sprint:${mode.id || mode.title}`");
    expect(app).toContain("questionId: `concept-sprint:${stableQuestionHash(rewardSeed)}`");
    expect(app).toContain("coins: coinDelta");
    expect(app).toContain("const newXP = Math.max(0, getXP() + amount)");
  });

  it("includes styles for sprint cards, options and results", () => {
    [
      ".concept-sprint-view",
      ".concept-sprint-modes",
      ".concept-sprint-mode.risky",
      ".concept-sprint-grid",
      ".cs-compare-library",
      ".cs-compare-card",
      ".cs-chip-definition",
      ".cs-one-line",
      ".cs-compare table",
      ".concept-sprint-live",
      ".cs-option.correct",
      ".concept-sprint-result",
    ].forEach((selector) => expect(css).toContain(selector));
  });
});
