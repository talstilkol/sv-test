import {
  choosePrerequisiteRewind,
  inferGlossaryTerms,
  inferQuestionConceptKeys,
  questionTextBlob,
  uniqueStable,
} from "../src/core/question-prerequisites.js";

const lesson11 = {
  id: "lesson_11",
  concepts: [
    { conceptName: "Array" },
    { conceptName: "Index" },
    { conceptName: "By Value" },
    { conceptName: "By Reference" },
    { conceptName: "Pointer" },
    { conceptName: "find" },
    { conceptName: "scope" },
  ],
};

describe("question prerequisite inference", () => {
  it("detects array index prerequisites from the lesson quiz wording", () => {
    const keys = inferQuestionConceptKeys({
      question: {
        question: "איך ניגשים לאיבר השני במערך ב-JavaScript?",
        options: [
          "על ידי arr[1] כי האינדקס מתחיל תמיד מאפס",
          "רק על ידי שימוש בפונקציית find",
          "אי אפשר, זה חסום על ידי scope",
        ],
        explanation: "הספירה (Index) מתחילה ב-0.",
      },
      lesson: lesson11,
      lessons: [lesson11],
      glossary: {
        Array: { he: "מערך", short: "מבנה נתונים מסודר לפי אינדקסים." },
      },
      limit: 5,
    });

    expect(keys).toContain("lesson_11::Index");
    expect(keys).toContain("lesson_11::Array");
  });

  it("uses an explicit conceptKey as the strongest signal", () => {
    const keys = inferQuestionConceptKeys({
      question: {
        conceptKey: "lesson_11::By Reference",
        question: "מה קורה כאשר מעתיקים מערך למשתנה חדש?",
        options: ["נוצר Pointer לאותו מערך", "נוצר By Value"],
      },
      lessons: [lesson11],
      limit: 2,
    });

    expect(keys[0]).toBe("lesson_11::By Reference");
  });

  it("uses explicit conceptKeys as the strongest multi-concept signal", () => {
    const keys = inferQuestionConceptKeys({
      question: {
        conceptKeys: ["lesson_11::Index", "lesson_11::Array"],
        question: "איך ניגשים לאיבר השני במערך ב-JavaScript?",
      },
      lessons: [lesson11],
      limit: 3,
    });

    expect(keys.slice(0, 2)).toEqual(expect.arrayContaining(["lesson_11::Array", "lesson_11::Index"]));
  });

  it("extracts glossary terms without relying on the answer explanation", () => {
    const terms = inferGlossaryTerms({
      question: {
        question: "מה התפקיד של useEffect אחרי render?",
        explanation: "התשובה היא cleanup",
      },
      glossary: {
        useEffect: { he: "אפקט", short: "Hook להרצת קוד אחרי render." },
        cleanup: { he: "ניקוי", short: "פונקציה שמנקה אפקט." },
      },
    }).map((item) => item.term);

    expect(terms).toContain("useEffect");
    expect(terms).not.toContain("cleanup");
  });

  it("keeps stable unique ordering", () => {
    expect(uniqueStable(["a", "b", "a", "c"])).toEqual(["a", "b", "c"]);
    expect(questionTextBlob({ question: "A", options: ["B"] })).toContain("A B");
  });

  it("does not treat inherited Object properties as alias lists", () => {
    const keys = inferQuestionConceptKeys({
      question: {
        question: "מה עושה toString במערך?",
        options: ["מחזיר מחרוזת", "מחזיר מספר"],
      },
      lesson: {
        id: "lesson_11",
        concepts: [{ conceptName: "toString" }],
      },
      lessons: [
        {
          id: "lesson_11",
          concepts: [{ conceptName: "toString" }],
        },
      ],
    });

    expect(keys).toContain("lesson_11::toString");
  });

  it("chooses the weakest prerequisite for a rewind step deterministically", () => {
    const chosen = choosePrerequisiteRewind({
      prereqKeys: [
        "lesson_11::Array",
        "lesson_11::Index",
        "lesson_11::Array",
        "lesson_11::By Value",
      ],
      statsByKey: {
        "lesson_11::Array": { masteryPct: 44, level: 3, attempts: 2, relation: "direct" },
        "lesson_11::Index": { masteryPct: 18, level: 1, attempts: 1, relation: "direct" },
        "lesson_11::By Value": { masteryPct: 80, level: 5, attempts: 7, relation: "base" },
      },
      thresholdPct: 60,
    });

    expect(chosen).toMatchObject({
      key: "lesson_11::Index",
      masteryPct: 18,
      level: 1,
      relation: "direct",
    });
  });

  it("does not rewind when all prerequisites are already strong", () => {
    expect(choosePrerequisiteRewind({
      prereqKeys: ["lesson_11::Array", "lesson_11::Index"],
      statsByKey: {
        "lesson_11::Array": { masteryPct: 82, level: 5 },
        "lesson_11::Index": { masteryPct: 94, level: 6 },
      },
      thresholdPct: 60,
    })).toBeNull();
  });
});
