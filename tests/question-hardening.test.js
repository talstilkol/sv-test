const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

describe("question hardening and no-repeat flow", () => {
  const app = read("app.js");
  const css = read("style.css");

  it("persists answered question identities per local learner", () => {
    expect(app).toContain('const ANSWERED_QUESTIONS_KEY = "lumenportal:answeredQuestions:v1"');
    expect(app).toContain("function questionIdentity");
    expect(app).toContain("function questionWasAnswered");
    expect(app).toContain("function recordAnsweredQuestion");
    expect(app).toContain("recordAnsweredQuestion(lessonId, conceptName, meta.question || {}");
  });

  it("chooses unused harder manual variants before repeating a concept", () => {
    expect(app).toContain("function manualQuestionPoolForConcept");
    expect(app).toContain("function pickManualFillQuestionForConcept");
    expect(app).toContain("function pickUnusedHarderQuestion");
    expect(app).toContain("maxAnsweredChallengeForConcept(lessonId, conceptName) + 1");
    expect(app).toContain("!questionWasAnswered(question, lessonId, conceptName, kind)");
  });

  it("applies no-repeat routing to curated MC, trace, and mock exam pools", () => {
    expect(app).toContain("function pickUnansweredBankQuestion");
    expect(app).toContain("function pickReusableQuestionFallback");
    expect(app).toContain("function conceptPartsFromKey");
    expect(app).toContain("return pickUnansweredBankQuestion(candidates, lessonId, conceptName, \"trace\"");
    expect(app).toContain("const pickedCuratedSame = pickUnansweredBankQuestion(curatedSame");
    expect(app).toContain("const pickedCuratedAny = pickUnansweredBankQuestion(curatedAny");
    expect(app).not.toContain("pickedSeededSame");
    expect(app).toContain("function questionWasAnsweredForMock");
    expect(app).toContain("if (questionWasAnsweredForMock(kind, q)) exhausted.push(q)");
    expect(app).toContain("const ordered = rng.shuffle(unused).concat(rng.shuffle(exhausted))");
  });

  it("continues correct trainer answers with a harder question on the same concept when available", () => {
    expect(app).toContain("function nextQuestionForConcept(lesson, concept)");
    expect(app).toContain("const q = buildQuestion({ lesson, concept })");
    expect(app).toContain("function continueAfterTrainerAnswer(lesson, concept, correct)");
    expect(app).toContain("if (correct && nextQuestionForConcept(lesson, concept)) return");
    expect(app).toContain("continueAfterTrainerAnswer(lesson, concept, correct)");
    expect(app).toContain("continueAfterTrainerAnswer(trainerCurrent.lesson, concept, correct)");
  });

  it("routes wrong trainer answers into prerequisite recovery before retry", () => {
    expect(app).toContain("function recoveryRetestItemFromMistake(record)");
    expect(app).toContain("function startWrongAnswerRecovery(record)");
    expect(app).toContain("question: q,\n            retestItem: recovery");
    expect(app).toContain("recoveryFor: record.conceptKey || \"\"");
    expect(app).toContain("startWrongAnswerRecovery(result?.mistake || null)");
    expect(app).toContain("startWrongAnswerRecovery(result.mistake || null)");
    expect(app).toContain("שאלת התאוששות בדרישת קדם");
    expect(app).toContain("mistake-agent-recovery-route");
    expect(css).toContain(".mistake-agent-recovery-route");
  });

  it("explains every MC option plus the deep solution and memory association", () => {
    expect(app).toContain("function renderPerAnswerExplanationBundle");
    expect(app).toContain("answer-explanation-bundle");
    expect(app).toContain("answer-option-rationales");
    expect(app).toContain("const supplied = Array.isArray(question.optionFeedback)");
    expect(app).not.toContain("function buildOptionFeedback");
    expect(app).toContain("deepExplanation");
    expect(app).toContain("memoryAssociation");
    expect(app).toContain("למה כל אפשרות כן/לא");
    expect(app).toContain("renderPerAnswerExplanationBundle(q, {");
    expect(app).toContain("renderPerAnswerExplanationBundle(questionForFeedback");
    expect(app).toContain("renderPerAnswerExplanationBundle(trainerCurrent.question?.trace");
    expect(css).toContain(".answer-explanation-bundle");
    expect(css).toContain(".answer-option-rationales");
    expect(css).toContain(".answer-explanation-line.memory");
  });
});
