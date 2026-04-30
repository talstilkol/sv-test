const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

describe("question prerequisite panel smoke wiring", () => {
  it("keeps prerequisite panels wired into every question and code-practice flow", () => {
    const app = read("app.js");
    const smoke = read("SVCOLLEGE_BROWSER_SMOKE.md");

    expect(app).toContain("function renderQuestionPrereqPanel");
    expect(app).toContain("function renderBugHuntPanel(lesson, concept)");
    expect(app).toContain("function renderMiniBuildPanel(lesson, concept)");
    expect(app).toContain('mode: "quiz"');
    expect(app).toContain('mode: "trainer"');
    expect(app).toContain('mode: "mock"');
    expect(app).toContain('mode: "guide"');
    expect(app).toContain('mode: "inline"');
    expect(app).toContain('mode: "bug-hunt"');
    expect(app).toContain('mode: "mini-build"');
    expect(app).toContain('kind: "bug"');
    expect(app).toContain('kind: "build"');
    expect(app).toContain("renderBugHuntPanel(lesson, concept)");
    expect(app).toContain("renderMiniBuildPanel(lesson, concept)");
    expect(app).toContain("wireQuestionPrerequisiteNavigation(quizBody)");
    expect(app).toContain("wireQuestionPrerequisiteNavigation(card)");
    expect(app).toContain("wireQuestionPrerequisiteNavigation(container)");
    expect(app).toContain("data-stuck-mode");
    expect(smoke).toContain("Prerequisite Panel Smoke");
    expect(smoke).toContain("Lesson quiz");
    expect(smoke).toContain("Knowledge trainer");
    expect(smoke).toContain("Mock exam");
  });
});
