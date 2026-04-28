import {
  appendConfusionBlocker,
  confusionTarget,
  emptyConfusionBlockerState,
  makeConfusionBlocker,
} from "../src/core/confusion-blockers.js";

const record = {
  conceptKey: "lesson_24::useEffect",
  lessonId: "lesson_24",
  conceptName: "useEffect",
  topic: "React",
  subtopic: "Hooks",
  questionId: "q-effect-1",
  questionText: "מה חסר במערך התלויות?",
  selectedAnswer: "כלום",
  correctAnswer: "להוסיף dependency",
  misconception: { id: "effectDependencies", label: "useEffect Dependencies" },
  prerequisiteRewind: {
    conceptKey: "lesson_11::function",
    lessonId: "lesson_11",
    conceptName: "function",
  },
};

describe("confusion blockers", () => {
  it("routes escape hatches to prerequisite rewind target when available", () => {
    expect(confusionTarget(record)).toMatchObject({
      lessonId: "lesson_11",
      conceptName: "function",
      conceptKey: "lesson_11::function",
    });
  });

  it("creates deterministic blocker records and deduplicates by id", () => {
    const first = makeConfusionBlocker(record, { timestamp: 1_700_000_000_000 });
    const second = makeConfusionBlocker(record, { timestamp: 1_700_000_100_000 });
    expect(first.id).toBe(second.id);

    let result = appendConfusionBlocker(emptyConfusionBlockerState(), record, {
      timestamp: 1_700_000_000_000,
    });
    result = appendConfusionBlocker(result.state, record, {
      timestamp: 1_700_000_100_000,
    });

    expect(result.state.blockers).toHaveLength(1);
    expect(result.blocker).toMatchObject({
      sourceConceptName: "useEffect",
      targetConceptName: "function",
      misconceptionId: "effectDependencies",
    });
  });
});
