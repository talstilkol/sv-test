import {
  PILOT_PROTOCOL,
  buildMetricsDashboard,
  buildOutcomeMetrics,
  buildStuckFeedbackEvent,
  evaluatePromotionGate,
} from "../src/core/outcome-loop.js";

describe("SVCollege learner outcome loop", () => {
  it("defines the 10-student D0/D1/D7 pilot protocol without fabricated outcomes", () => {
    expect(PILOT_PROTOCOL.cohortSize).toBe(10);
    expect(PILOT_PROTOCOL.durationDays).toBe(7);
    expect(PILOT_PROTOCOL.checkpoints).toEqual(expect.arrayContaining([
      "D0 baseline exam",
      "D1 retention check",
      "D7 final exam and module mastery review",
      "qualitative feedback review",
    ]));
    expect(PILOT_PROTOCOL.dataPolicy).toContain("unknown/unavailable");
  });

  it("computes D1/D7 retention, recovery time and repeated misconception rate from real events only", () => {
    const events = [
      {
        type: "answer",
        timestamp: Date.UTC(2026, 3, 20, 8, 0),
        day: "2026-04-20",
        conceptKey: "lesson_11::Array",
        questionId: "q-array-1",
        correct: false,
      },
      {
        type: "answer",
        timestamp: Date.UTC(2026, 3, 20, 8, 5),
        day: "2026-04-20",
        conceptKey: "lesson_11::Array",
        questionId: "q-array-2",
        correct: false,
      },
      {
        type: "answer",
        timestamp: Date.UTC(2026, 3, 20, 8, 10),
        day: "2026-04-20",
        conceptKey: "lesson_11::Array",
        questionId: "q-array-3",
        correct: true,
      },
      {
        type: "view",
        timestamp: Date.UTC(2026, 3, 21, 9, 0),
        day: "2026-04-21",
      },
      {
        type: "answer",
        timestamp: Date.UTC(2026, 3, 27, 9, 0),
        day: "2026-04-27",
        conceptKey: "lesson_12::map",
        questionId: "q-map-1",
        correct: true,
      },
    ];

    const report = buildOutcomeMetrics({
      events,
      scores: {
        "lesson_11::Array": { level: 7 },
        "lesson_12::map": { level: 5 },
      },
      modules: [
        { id: "js", label: "JavaScript", conceptKeys: ["lesson_11::Array", "lesson_12::map"] },
      ],
      now: Date.UTC(2026, 3, 28, 12),
    });

    expect(report.retention.d1).toMatchObject({ day: "2026-04-21", active: true, status: "active" });
    expect(report.retention.d7).toMatchObject({ day: "2026-04-27", active: true, status: "active" });
    expect(report.recovery.averageWrongToCorrectSec).toBe(600);
    expect(report.repeatedMisconceptions).toMatchObject({
      wrongEvents: 2,
      repeatedWrongEvents: 1,
      ratePct: 50,
    });
    expect(report.moduleMastery.modules[0]).toMatchObject({
      mastered: 1,
      total: 2,
      masteryPct: 50,
    });
  });

  it("builds a student-stuck feedback event with question, prerequisite and viewport metadata", () => {
    const event = buildStuckFeedbackEvent({
      timestamp: Date.UTC(2026, 3, 29, 10),
      mode: "trainer",
      lessonId: "lesson_nextjs",
      questionId: "nextjs-q-1",
      conceptKeys: ["lesson_nextjs::Server Component"],
      prerequisiteKeys: ["lesson_16::module.exports"],
      terms: ["server", "client"],
      viewport: { width: 390, height: 844, devicePixelRatio: 3, orientation: "portrait" },
    });

    expect(event).toMatchObject({
      type: "student_stuck",
      day: "2026-04-29",
      source: "stuck-feedback:trainer",
      lessonId: "lesson_nextjs",
      conceptKey: "lesson_nextjs::Server Component",
      questionId: "nextjs-q-1",
      prerequisiteKeys: ["lesson_16::module.exports"],
      terms: ["server", "client"],
      viewport: { width: 390, height: 844, devicePixelRatio: 3, orientation: "portrait" },
    });
    expect(event.feedbackId).toBe(buildStuckFeedbackEvent({
      timestamp: Date.UTC(2026, 3, 29, 10),
      mode: "trainer",
      lessonId: "lesson_nextjs",
      questionId: "nextjs-q-1",
      conceptKeys: ["lesson_nextjs::Server Component"],
      prerequisiteKeys: ["lesson_16::module.exports"],
      terms: ["server", "client"],
      viewport: { width: 390, height: 844, devicePixelRatio: 3, orientation: "portrait" },
    }).feedbackId);
    expect(event.freeText).toBeUndefined();
  });

  it("blocks student promotion until first-user feedback evidence is present", () => {
    expect(evaluatePromotionGate({
      content: true,
      practice: true,
      tabHealth: true,
      smoke: true,
      feedback: false,
    })).toMatchObject({
      ready: false,
      status: "blocked",
      missing: ["feedback"],
    });

    expect(evaluatePromotionGate({
      content: true,
      practice: true,
      tabHealth: true,
      smoke: true,
      feedback: true,
    })).toMatchObject({
      ready: true,
      status: "ready-for-students",
      missing: [],
    });
  });

  it("builds a metrics dashboard from real retention, mastery, exam and QA evidence", () => {
    const events = [
      {
        type: "answer",
        timestamp: Date.UTC(2026, 3, 20, 8),
        day: "2026-04-20",
        conceptKey: "lesson_11::Array",
        correct: true,
      },
      {
        type: "mastery_change",
        timestamp: Date.UTC(2026, 3, 20, 9),
        day: "2026-04-20",
        conceptKey: "lesson_11::Array",
        masteryBefore: 4,
        masteryAfter: 7,
      },
      {
        type: "mock_exam",
        timestamp: Date.UTC(2026, 3, 20, 10),
        day: "2026-04-20",
        scorePct: 62,
      },
      {
        type: "view",
        timestamp: Date.UTC(2026, 3, 21, 8),
        day: "2026-04-21",
      },
      {
        type: "mock_exam",
        timestamp: Date.UTC(2026, 3, 27, 10),
        day: "2026-04-27",
        correctCount: 17,
        totalQuestions: 20,
      },
    ];

    const dashboard = buildMetricsDashboard({
      events,
      scores: {
        "lesson_11::Array": { level: 7 },
      },
      modules: [
        { id: "js", label: "JavaScript", conceptKeys: ["lesson_11::Array"] },
      ],
      questionQuality: {
        summary: {
          total: 568,
          cleanQuestions: 420,
          noteQuestions: 100,
          blockerIssues: 0,
          warningIssues: 12,
          questionQualityIndex: 91.5,
        },
      },
      now: Date.UTC(2026, 3, 28, 12),
    });

    expect(dashboard.retention.d1.status).toBe("active");
    expect(dashboard.masteryVelocity).toMatchObject({
      status: "measured",
      gainedLevels: 3,
      masteredConcepts: 1,
      label: "3 levels/day",
    });
    expect(dashboard.examScoreUplift).toMatchObject({
      status: "measured",
      firstScorePct: 62,
      latestScorePct: 85,
      upliftPctPoints: 23,
      label: "+23 pp",
    });
    expect(dashboard.questionQualityIndex).toMatchObject({
      status: "measured",
      indexPct: 91.5,
      totalQuestions: 568,
    });
    expect(dashboard.readyForDecisions).toBe(true);
  });

  it("keeps dashboard metrics unknown when real evidence is missing", () => {
    const dashboard = buildMetricsDashboard({
      events: [],
      scores: {},
      modules: [{ id: "js", label: "JavaScript", conceptKeys: [] }],
      now: Date.UTC(2026, 3, 28, 12),
    });

    expect(dashboard.masteryVelocity.label).toBe("unknown/unavailable");
    expect(dashboard.examScoreUplift.label).toBe("unknown/unavailable");
    expect(dashboard.questionQualityIndex.label).toBe("unknown/unavailable");
    expect(dashboard.readyForDecisions).toBe(false);
  });
});
