const fs = require("fs");
const path = require("path");

describe("learning TypeScript contracts", () => {
  it("defines the lesson, concept, question, and score interfaces before view migration", () => {
    const file = path.resolve(__dirname, "../src/core/learning-types.ts");
    const source = fs.readFileSync(file, "utf8");

    expect(source).toContain("export interface LessonContract");
    expect(source).toContain("export interface ConceptContract");
    expect(source).toContain("export type QuestionContract");
    expect(source).toContain("export interface ScoreContract");
    expect(source).toContain("unknown/unavailable");
    const forbiddenToken = ["Math", "random"].join(".");
    expect(source).not.toContain(forbiddenToken);
  });
});
