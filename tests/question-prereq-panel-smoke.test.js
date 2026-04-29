const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

describe("question prerequisite panel smoke wiring", () => {
  it("keeps prerequisite panels wired into lesson quiz, trainer and mock exam flows", () => {
    const app = read("app.js");
    const smoke = read("SVCOLLEGE_BROWSER_SMOKE.md");

    expect(app).toContain("function renderQuestionPrereqPanel");
    expect(app).toContain('mode: "quiz"');
    expect(app).toContain('mode: "trainer"');
    expect(app).toContain('mode: "mock"');
    expect(app).toContain("wireQuestionPrerequisiteNavigation(quizBody)");
    expect(app).toContain("wireQuestionPrerequisiteNavigation(card)");
    expect(app).toContain("wireQuestionPrerequisiteNavigation(container)");
    expect(smoke).toContain("Prerequisite Panel Smoke");
    expect(smoke).toContain("Lesson quiz");
    expect(smoke).toContain("Knowledge trainer");
    expect(smoke).toContain("Mock exam");
  });
});
