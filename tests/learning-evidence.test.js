import {
  LEARNING_EVENT_TYPES,
  anonymizedLearningEvidenceExport,
  appendLearningEvent,
  buildLearningEvidenceMarkdownReport,
  emptyLearningEvidenceState,
  makeInstallKey,
  makeSessionId,
  normalizeLearningEvent,
  stableHash,
  summarizeLearningEvidence,
} from "../src/core/learning-evidence.js";

describe("learning evidence", () => {
  it("creates deterministic hashes and non-random session IDs", () => {
    expect(stableHash("lesson_11::Array")).toBe(stableHash("lesson_11::Array"));
    const installKey = makeInstallKey({ firstSeen: "2026-04-28T10:00:00.000Z", origin: "http://127.0.0.1:4173" });
    expect(installKey).toBe(makeInstallKey({ firstSeen: "2026-04-28T10:00:00.000Z", origin: "http://127.0.0.1:4173" }));
    expect(makeSessionId({ installKey, timestamp: Date.UTC(2026, 3, 28) })).toBe("2026-04-28:11vabvz");
  });

  it("normalizes events without preserving free-form answer text", () => {
    const event = normalizeLearningEvent({
      type: LEARNING_EVENT_TYPES.ANSWER,
      timestamp: Date.UTC(2026, 3, 28, 8),
      source: "trainer",
      lessonId: "lesson_11",
      conceptKey: "lesson_11::Array",
      conceptName: "Array",
      questionId: "q1",
      correct: false,
      selectedAnswer: "this should not be stored",
      correctAnswer: "this should not be stored either",
    });

    expect(event).toMatchObject({
      type: "answer",
      day: "2026-04-28",
      source: "trainer",
      conceptKey: "lesson_11::Array",
      correct: false,
    });
    expect(event.selectedAnswer).toBeUndefined();
    expect(event.correctAnswer).toBeUndefined();
  });

  it("appends and summarizes concept funnels deterministically", () => {
    let state = emptyLearningEvidenceState();
    state = appendLearningEvent(state, {
      type: "view",
      timestamp: Date.UTC(2026, 3, 28, 8),
      lessonId: "lesson_11",
      conceptKey: "lesson_11::Array",
      conceptName: "Array",
    });
    state = appendLearningEvent(state, {
      type: "answer",
      timestamp: Date.UTC(2026, 3, 28, 8, 5),
      lessonId: "lesson_11",
      conceptKey: "lesson_11::Array",
      conceptName: "Array",
      correct: false,
    });
    state = appendLearningEvent(state, {
      type: "wrong_answer_aid",
      timestamp: Date.UTC(2026, 3, 28, 8, 6),
      lessonId: "lesson_11",
      conceptKey: "lesson_11::Array",
      conceptName: "Array",
    });

    const summary = summarizeLearningEvidence(state, {
      now: Date.UTC(2026, 3, 28, 12),
      topN: 3,
    });

    expect(summary.totalEvents).toBe(3);
    expect(summary.answers).toBe(1);
    expect(summary.wrong).toBe(1);
    expect(summary.remediations).toBe(1);
    expect(summary.conceptFunnels[0]).toMatchObject({
      conceptKey: "lesson_11::Array",
      views: 1,
      answers: 1,
      wrong: 1,
      remediations: 1,
    });
  });

  it("exports anonymized evidence without install keys or free-form answers", () => {
    const state = {
      ...emptyLearningEvidenceState(),
      installKey: "le-sensitive",
      events: [
        {
          type: LEARNING_EVENT_TYPES.ANSWER,
          timestamp: Date.UTC(2026, 3, 28, 9),
          day: "2026-04-28",
          sessionId: "2026-04-28:abc123",
          lessonId: "lesson_11",
          conceptKey: "lesson_11::Array",
          conceptName: "Array",
          questionId: "q1",
          correct: false,
          selectedAnswer: "private answer text",
          correctAnswer: "private correct text",
        },
      ],
    };

    const exported = anonymizedLearningEvidenceExport(state, {
      now: Date.UTC(2026, 3, 28, 12),
      appVersion: "test-version",
    });

    expect(exported.privacy).toMatchObject({
      pii: false,
      freeTextAnswers: false,
      installKeyIncluded: false,
      sessionIdsHashed: true,
    });
    expect(JSON.stringify(exported)).not.toContain("le-sensitive");
    expect(JSON.stringify(exported)).not.toContain("private answer text");
    expect(JSON.stringify(exported)).not.toContain("private correct text");
    expect(exported.events[0]).toMatchObject({
      type: "answer",
      sessionHash: `session-${stableHash("2026-04-28:abc123")}`,
      conceptKey: "lesson_11::Array",
      correct: false,
    });
    expect(exported.summary.answers).toBe(1);
  });

  it("builds a deterministic weekly markdown report from local evidence", () => {
    let state = emptyLearningEvidenceState();
    state = appendLearningEvent(state, {
      type: LEARNING_EVENT_TYPES.VIEW,
      timestamp: Date.UTC(2026, 3, 27, 8),
      lessonId: "lesson_11",
      conceptKey: "lesson_11::Array",
      conceptName: "Array",
      topic: "JS Foundations",
    });
    state = appendLearningEvent(state, {
      type: LEARNING_EVENT_TYPES.ANSWER,
      timestamp: Date.UTC(2026, 3, 28, 9),
      lessonId: "lesson_11",
      conceptKey: "lesson_11::Array",
      conceptName: "Array",
      topic: "JS Foundations",
      correct: true,
    });

    const report = buildLearningEvidenceMarkdownReport(state, {
      now: Date.UTC(2026, 3, 28, 12),
      title: "Weekly Evidence",
    });

    expect(report).toContain("# Weekly Evidence");
    expect(report).toContain("Generated: 2026-04-28T12:00:00.000Z");
    expect(report).toContain("| Answers | 1 |");
    expect(report).toContain("| Accuracy | 100% |");
    expect(report).toContain("Array | lesson_11 | JS Foundations");
  });
});
