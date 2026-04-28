const lessonQuizKeys = require("../scripts/report_lesson_quiz_keys.js");

describe("lesson quiz concept key mappings", () => {
  it("maps every lesson-level quiz item to existing concept keys", () => {
    const report = lessonQuizKeys.buildReport();

    expect(report.summary.totalQuizItems).toBe(145);
    expect(report.summary.mappedQuizItems).toBe(report.summary.totalQuizItems);
    expect(report.summary.coverage).toBe(100);
    expect(report.summary.issueCount).toBe(0);
  });

  it("reports each mapped row with at least one concept key", () => {
    const report = lessonQuizKeys.buildReport();
    const rows = report.lessons.flatMap((lesson) => lesson.rows);

    expect(rows.length).toBe(report.summary.totalQuizItems);
    expect(rows.every((row) => row.keys.length > 0)).toBe(true);
    expect(rows.every((row) => row.status === "ok")).toBe(true);
  });
});
