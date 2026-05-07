const distractorQuality = require("../scripts/audit_distractor_quality.js");

describe("distractor quality audit", () => {
  it("does not flag distinct numeric literal options as missing unique words", () => {
    const issues = distractorQuality.audit({
      id: "numeric_options",
      conceptKey: "lesson_12::array",
      options: ["4", "5", "3", "undefined"],
      correctIndex: 0,
    });

    expect(issues.some((issue) => distractorQuality.normalizeIssue(issue) === "option-no-unique-words")).toBe(false);
  });

  it("does not flag distinct technical abbreviation options as missing unique words", () => {
    const issues = distractorQuality.audit({
      id: "technical_abbreviation_options",
      conceptKey: "lesson_auth_security::JWT",
      options: ["cookie", "session", "DB", "UI"],
      correctIndex: 0,
    });

    expect(issues.some((issue) => distractorQuality.normalizeIssue(issue) === "option-no-unique-words")).toBe(false);
  });

  it("still flags repeated generic short options with no meaningful unique token", () => {
    const issues = distractorQuality.audit({
      id: "generic_options",
      conceptKey: "lesson_12::array",
      options: ["כן", "כן", "כן", "כן"],
      correctIndex: 0,
    });

    expect(issues.some((issue) => distractorQuality.normalizeIssue(issue) === "option-no-unique-words")).toBe(true);
  });

  it("classifies non-exam length-only skew as deferred debt", () => {
    const item = {
      id: "non_exam_length_only",
      conceptKey: "lesson_ai_engineering::OpenAI API",
      issues: ["correct-much-longer (60 vs avg 10)"],
    };

    expect(distractorQuality.isDeferredOnlyLengthSkew(item)).toBe(true);
    expect(distractorQuality.isAdvisoryOnlyLengthSkew(item)).toBe(false);
  });

  it("keeps exam-critical length skew out of deferred classification", () => {
    const item = {
      id: "exam_length_only",
      conceptKey: "lesson_24::SQL",
      issues: ["correct-much-longer (60 vs avg 10)"],
    };

    expect(distractorQuality.isDeferredOnlyLengthSkew(item)).toBe(false);
  });
});
