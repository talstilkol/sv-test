const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

describe("automatic wrong-answer coach cards", () => {
  const app = read("app.js");
  const css = read("style.css");

  it("defines one reusable coach card around the existing weakness agent", () => {
    expect(app).toContain("function renderWrongAnswerCoachCard");
    expect(app).toContain('class="wrong-answer-coach-card"');
    expect(app).toContain('data-wrong-answer-coach="${esc(mode)}"');
    expect(app).toContain('aria-label="מאמן אחרי תשובה שגויה"');
    expect(app).toContain("${renderMistakeAgentFeedback(record)}");
    expect(app).toContain("namedWeaknessClusters(mistakeAgentState");
    expect(app).toContain('class="mistake-agent-named-weakness"');
  });

  it("shows the coach in every active question mode after a wrong answer", () => {
    [
      'mode: "trainer"',
      'mode: "trace"',
      'mode: "concept-sprint"',
      'mode: meta.mode || "inline"',
      'mode: "lesson-quiz"',
      'mode: meta.mode || "guide"',
      'mode: "codeblocks"',
      'mode: "bug-hunt"',
      'mode: "bug-quest"',
      'mode: "mock-exam"',
    ].forEach((snippet) => expect(app).toContain(`renderWrongAnswerCoachCard({ ${snippet}`));
  });

  it("keeps lesson quiz feedback attached to the rendered explanation box", () => {
    expect(app).toContain('qEl.querySelector(".quiz-explanation-text")');
    expect(app).toContain('renderWrongAnswerCoachCard({ mode: "lesson-quiz"');
  });

  it("styles coach cards without changing the nested weakness agent contract", () => {
    [
      ".wrong-answer-coach-card",
      ".wrong-answer-coach-head",
      ".wrong-answer-coach-next",
      ".mistake-agent-named-weakness",
      ".mistake-agent-panel",
    ].forEach((selector) => expect(css).toContain(selector));
  });
});
