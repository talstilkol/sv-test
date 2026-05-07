const questionQuality = require("../scripts/report_question_quality.js");

describe("Question quality report", () => {
  it("creates deterministic questionQuality objects for the full MC/Fill bank", () => {
    const first = questionQuality.buildQuestionQualityReport();
    const second = questionQuality.buildQuestionQualityReport();

    expect(first).toEqual(second);
    expect(first.reportVersion).toBe("question-quality-v1");
    expect(first.summary.total).toBe(first.summary.mc + first.summary.fill);
    expect(first.summary.manual).toBe(first.summary.total);
    expect(first.summary.total).toBeGreaterThanOrEqual(430);
    expect(Object.keys(first.questionQuality)).toHaveLength(first.summary.total);
  });

  it("keeps blocker-level issues out of the current full bank", () => {
    const report = questionQuality.buildQuestionQualityReport();

    expect(report.summary.blockerIssues).toBe(0);
    expect(report.summary.blockerQuestions).toBe(0);
    expect(report.summary.questionQualityIndex).toBeGreaterThanOrEqual(88);
  });

  it("detects duplicate MC options as blockers", () => {
    const issues = questionQuality.auditMc({
      id: "bad_mc",
      kind: "mc",
      source: "curated",
      conceptKey: "lesson_11::Array",
      question: "מה נכון?",
      options: ["map", "filter", "map", "reduce"],
      correctIndex: 0,
      explanation: "map נכון.",
    });

    expect(issues.some((issue) => issue.code === "duplicate-option")).toBe(true);
  });

  it("keeps non-exam-core length cue visible as deferred debt", () => {
    const issues = questionQuality.auditMc({
      id: "length_cue_advisory",
      kind: "mc",
      source: "manual",
      conceptKey: "lesson_ai_engineering::RAG",
      question: "מה נכון?",
      options: [
        "Index",
        "Cache",
        "Chunk",
        "RAG מחבר שליפה ממקור ידע חיצוני עם יצירת תשובה כדי לצמצם תשובה בלי הקשר.",
      ],
      correctIndex: 3,
      explanation: "RAG משתמש בשליפה לפני ניסוח תשובה.",
    });

    const lengthCue = issues.find((issue) => issue.code === "length-cue");
    expect(lengthCue).toMatchObject({ severity: "deferred" });
  });

  it("keeps non-exam-core missing fill hints visible as deferred debt", () => {
    const issues = questionQuality.auditFill({
      id: "missing_hint_advisory",
      kind: "fill",
      source: "manual",
      conceptKey: "lesson_ai_engineering::RAG",
      code: "const source = ____;",
      answer: "retrieval",
      explanation: "RAG starts by retrieving context from a source.",
    });

    const missingHint = issues.find((issue) => issue.code === "missing-hint");
    expect(missingHint).toMatchObject({ severity: "deferred" });
  });

  it("detects ambiguous Fill questions as blockers", () => {
    const issues = questionQuality.auditFill({
      id: "bad_fill",
      kind: "fill",
      source: "curated",
      conceptKey: "lesson_11::Array",
      code: "const value = 1;",
      answer: "value",
      explanation: "Missing blank.",
    });

    expect(issues.some((issue) => issue.code === "blank-count")).toBe(true);
  });

  it("allows a manually reviewed answer-visible context without hiding real fill blockers", () => {
    const issues = questionQuality.auditFill({
      id: "reviewed_fill",
      kind: "fill",
      source: "manual",
      conceptKey: "lesson_17::app",
      code: "const createServer = require('express');\nconst app = ____();",
      answer: "createServer",
      answerVisibleReview: "manual-reviewed-intentional-code-context",
      explanation: "Calling the imported Express factory creates the app.",
    });

    expect(issues.some((issue) => issue.code === "answer-visible")).toBe(false);
    expect(issues.find((issue) => issue.code === "missing-hint")).toMatchObject({ severity: "note" });
  });

  it("uses the manual quality-review evidence file for intentional answer-visible fills", () => {
    const report = questionQuality.buildQuestionQualityReport();

    expect(report.qualityReviews.file).toBe("data/question_quality_reviews.js");
    expect(report.qualityReviews.answerVisibleReviewed).toBeGreaterThanOrEqual(40);
    expect(report.qualityReviews.unknownQuestionIds).toEqual([]);
    expect(report.questionQuality.fill_lwb_ctx_002.issueCodes).not.toContain("answer-visible");
    expect(report.questionQuality.fill_async_004.issueCodes).not.toContain("answer-visible");
  });

  it("does not accept arbitrary answer-visible review values", () => {
    const issues = questionQuality.auditFill({
      id: "weak_review_fill",
      kind: "fill",
      source: "manual",
      conceptKey: "lesson_17::app",
      code: "const createServer = require('express');\nconst app = ____();",
      answer: "createServer",
      answerVisibleReview: "ok",
      hint: "שם הפונקציה שיוצרת Express app.",
      explanation: "Calling the imported Express factory creates the app.",
    });

    expect(issues.some((issue) => issue.code === "answer-visible")).toBe(true);
  });

  it("does not flag an answer token hidden inside another word", () => {
    expect(questionQuality.countAnswerOccurrences("const last = arr.____(-1); // negative index", "at")).toBe(0);
    expect(questionQuality.countAnswerOccurrences("// Flatten nested array\nitems.____()", "flat")).toBe(0);
    expect(questionQuality.countAnswerOccurrences("items.flat();\nitems.____();", "flat")).toBe(1);
  });
});
