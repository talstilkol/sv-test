import {
  appendTeachBackResponse,
  conceptAssociation,
  correctAnswerText,
  dueAdaptiveRetests,
  emptyMistakeAgentState,
  inferMisconception,
  makeMistakeRecord,
  misconceptionCardIds,
  namedWeaknessClusters,
  recordRetestOutcome,
  scheduleAdaptiveRetests,
  selectedAnswerText,
  splitConceptKey,
  teachBackPromptForRecord,
  topicMetaForLesson,
  updateMistakeState,
} from "../src/core/mistake-agent.js";

describe("mistake agent", () => {
  it("splits concept keys and resolves topic metadata", () => {
    expect(splitConceptKey("lesson_11::Array")).toEqual({
      lessonId: "lesson_11",
      conceptName: "Array",
    });
    expect(topicMetaForLesson("lesson_11", {
      lesson_11: { topic: "JavaScript Foundations", subtopic: "Arrays", emoji: "JS" },
    })).toEqual({
      topic: "JavaScript Foundations",
      subtopic: "Arrays",
      emoji: "JS",
    });
  });

  it("extracts selected and correct answers for MC and fill questions", () => {
    const mc = {
      options: ["א", "ב", "ג", "ד"],
      correctIndex: 2,
    };
    expect(selectedAnswerText(mc, { kind: "mc", selectedIdx: 1 })).toBe("ב");
    expect(correctAnswerText(mc, "mc")).toBe("ג");
    expect(selectedAnswerText({}, { kind: "fill", answer: "const" })).toBe("const");
    expect(correctAnswerText({ answer: "let" }, "fill")).toBe("let");
  });

  it("uses only existing concept content for the association", () => {
    expect(conceptAssociation({ analogy: "מערך הוא מדף מסודר." })).toBe("מערך הוא מדף מסודר.");
    expect(conceptAssociation({ levels: { grandma: "הסבר פשוט שכבר קיים במושג." } })).toBe("הסבר פשוט שכבר קיים במושג.");
    expect(conceptAssociation({})).toBe("");
  });

  it("clusters mistakes by deterministic misconception cards", () => {
    expect(inferMisconception({
      conceptName: "Array",
      questionText: "איך ניגשים לאיבר השני במערך?",
      explanation: "האינדקס מתחיל מ-0.",
    })).toMatchObject({
      id: "zeroBasedIndex",
      label: "אינדקס מתחיל מ-0",
    });

    expect(inferMisconception({
      conceptName: "useEffect",
      questionText: "מה חסר במערך התלויות של useEffect?",
    })).toMatchObject({
      id: "effectDependencies",
    });

    expect(inferMisconception({ conceptName: "Unknown" })).toMatchObject({
      id: "conceptGap",
    });
  });

  it("covers at least 20 mapped misconception cards beyond the fallback", () => {
    expect(misconceptionCardIds({ includeFallback: false }).length).toBeGreaterThanOrEqual(20);
  });

  it("maps React, TypeScript, API and module mistakes to specific misconception cards", () => {
    expect(inferMisconception({
      conceptName: "useState",
      questionText: "למה setCount(count + 1) פעמיים לא מעלה ב-2?",
      explanation: "צריך functional update עם prev בגלל batching ו-stale state.",
    })).toMatchObject({ id: "stateSetterAsync" });

    expect(inferMisconception({
      conceptName: "TypeScript",
      questionText: "איך ניגשים ל-property בתוך union type?",
      explanation: "צריך narrowing עם type guard לפני שימוש.",
    })).toMatchObject({ id: "typescriptNarrowing" });

    expect(inferMisconception({
      conceptName: "Fetch",
      questionText: "מה צריך לבדוק לפני response.json בקריאת REST API?",
      explanation: "בודקים status ו-response.ok.",
    })).toMatchObject({ id: "apiRequestResponse" });

    expect(inferMisconception({
      conceptName: "Node Modules",
      questionText: "מה ההבדל בין default export ל-named import?",
    })).toMatchObject({ id: "moduleBoundary" });
  });

  it("updates concept and topic weakness counters deterministically", () => {
    const record = makeMistakeRecord({
      conceptKey: "lesson_11::Array",
      topicMeta: { topic: "JavaScript Foundations", subtopic: "Arrays", emoji: "JS" },
      concept: { conceptName: "Array", levels: { grandma: "מערך הוא רשימה מסודרת." } },
      question: {
        id: "q1",
        question: "איך ניגשים לאיבר השני?",
        options: ["arr[0]", "arr[1]", "arr[2]", "find()"],
        correctIndex: 1,
        explanation: "אינדקסים מתחילים מ-0.",
      },
      kind: "mc",
      selectedIdx: 2,
      mode: "trainer",
      timestamp: 1_700_000_000_000,
    });

    const state = updateMistakeState(emptyMistakeAgentState(), record);
    expect(state.concepts["lesson_11::Array"].count).toBe(1);
    expect(state.concepts["lesson_11::Array"].misconceptions.zeroBasedIndex).toBe(1);
    expect(state.topics["JavaScript Foundations"].count).toBe(1);
    expect(state.topics["JavaScript Foundations"].concepts["lesson_11::Array"]).toBe(1);
    expect(state.misconceptions.zeroBasedIndex).toMatchObject({
      id: "zeroBasedIndex",
      count: 1,
      concepts: { "lesson_11::Array": 1 },
      modes: { trainer: 1 },
    });
    expect(state.log[0]).toMatchObject({
      conceptKey: "lesson_11::Array",
      misconceptionId: "zeroBasedIndex",
      selectedAnswer: "arr[2]",
      correctAnswer: "arr[1]",
      mode: "trainer",
    });
  });

  it("promotes repeated misconception patterns across tabs into named weaknesses", () => {
    const base = {
      conceptKey: "lesson_11::Array",
      topicMeta: { topic: "JavaScript Foundations", subtopic: "Arrays", emoji: "JS" },
      concept: { conceptName: "Array" },
      question: {
        id: "q-index",
        question: "איך ניגשים לאיבר השני במערך?",
        options: ["arr[0]", "arr[1]", "arr[2]", "find()"],
        correctIndex: 1,
        explanation: "האינדקס מתחיל מ-0.",
      },
      kind: "mc",
      selectedIdx: 2,
      timestamp: 1_700_000_000_000,
    };
    const trainerRecord = makeMistakeRecord({ ...base, mode: "trainer" });
    const quizRecord = makeMistakeRecord({ ...base, mode: "lesson-quiz", timestamp: 1_700_000_100_000 });

    let state = updateMistakeState(emptyMistakeAgentState(), trainerRecord);
    expect(namedWeaknessClusters(state)).toEqual([]);
    state = updateMistakeState(state, quizRecord);

    expect(state.namedWeaknesses.zeroBasedIndex).toMatchObject({
      id: "weak-zeroBasedIndex",
      name: "חולשה חוזרת: אינדקס מתחיל מ-0",
      count: 2,
    });
    expect(state.namedWeaknesses.zeroBasedIndex.modes).toEqual([
      { mode: "lesson-quiz", count: 1 },
      { mode: "trainer", count: 1 },
    ]);
    expect(namedWeaknessClusters(state, { minCount: 2, minModes: 2 })).toHaveLength(1);
  });

  it("creates a teach-back prompt after repeated misconception mistakes and stores the response", () => {
    const record = makeMistakeRecord({
      conceptKey: "lesson_11::Array",
      topicMeta: { topic: "JavaScript Foundations", subtopic: "Arrays", emoji: "JS" },
      concept: { conceptName: "Array" },
      question: {
        id: "q-index",
        question: "איך ניגשים לאיבר השני במערך?",
        options: ["arr[0]", "arr[1]", "arr[2]", "find()"],
        correctIndex: 1,
        explanation: "האינדקס מתחיל מ-0.",
      },
      kind: "mc",
      selectedIdx: 2,
      mode: "trainer",
      timestamp: 1_700_000_000_000,
    });

    let state = updateMistakeState(emptyMistakeAgentState(), record);
    expect(teachBackPromptForRecord(state, record)).toBeNull();
    state = updateMistakeState(state, { ...record, timestamp: 1_700_000_100_000 });
    const prompt = teachBackPromptForRecord(state, record);

    expect(prompt).toMatchObject({
      conceptKey: "lesson_11::Array",
      misconceptionId: "zeroBasedIndex",
      repeatCount: 2,
    });
    expect(prompt.id).toBe(teachBackPromptForRecord(state, record).id);

    const withResponse = appendTeachBackResponse(
      state,
      prompt,
      "צריך לספור מהאפס: האיבר השני הוא index 1 ולא index 2.",
      { timestamp: 1_700_000_200_000 },
    );

    expect(withResponse.teachBacks[0]).toMatchObject({
      id: prompt.id,
      conceptKey: "lesson_11::Array",
      misconceptionId: "zeroBasedIndex",
    });
    expect(withResponse.misconceptions.zeroBasedIndex.teachBacks).toBe(1);
  });

  it("schedules three recovery drills before delayed review and records outcomes", () => {
    const timestamp = 1_700_000_000_000;
    const record = makeMistakeRecord({
      conceptKey: "lesson_11::Array",
      topicMeta: { topic: "JavaScript Foundations", subtopic: "Arrays", emoji: "JS" },
      concept: { conceptName: "Array" },
      question: {
        id: "q-index",
        question: "איך ניגשים לאיבר השני במערך?",
        options: ["arr[0]", "arr[1]", "arr[2]", "find()"],
        correctIndex: 1,
        explanation: "האינדקס מתחיל מ-0.",
      },
      kind: "mc",
      selectedIdx: 2,
      mode: "trainer",
      timestamp,
    });

    let state = scheduleAdaptiveRetests(emptyMistakeAgentState(), record, {
      timestamp,
      delayedReviewDelayMs: 86_400_000,
    });

    expect(state.retestQueue).toHaveLength(4);
    expect(state.retestQueue.map((item) => item.stage)).toEqual([
      "recovery_drill_1",
      "recovery_drill_2",
      "recovery_drill_3",
      "delayed_review",
    ]);
    expect(state.retestQueue.slice(0, 3).map((item) => item.label)).toEqual([
      "תרגול תיקון 1/3",
      "תרגול תיקון 2/3",
      "תרגול תיקון 3/3",
    ]);
    expect(dueAdaptiveRetests(state, { now: timestamp, limit: 3 })).toHaveLength(3);
    expect(dueAdaptiveRetests(state, { now: timestamp + 86_400_000, limit: 4 })).toHaveLength(4);

    const near = state.retestQueue[0];
    state = recordRetestOutcome(state, near.id, true, { timestamp: timestamp + 1_000 });

    expect(state.retestQueue.find((item) => item.id === near.id)).toMatchObject({
      status: "done",
      attempts: 1,
      lastCorrect: true,
    });
    expect(dueAdaptiveRetests(state, { now: timestamp + 1_000, limit: 3 })).toHaveLength(2);
  });
});
