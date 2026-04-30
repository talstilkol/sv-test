import {
  buildDailyMissions,
  buildDiagnosticExamBlueprint,
  buildFirstWeekPlan,
  buildProjectStudio,
  exportDiagnosticReport,
  normalizeDiagnosticSignal,
  placeLearnerPerConcept,
  scheduleDiagnosticRetake,
  scoreDiagnosticByPrerequisiteGraph,
  TRUST_CENTER,
} from "../src/core/learning-os.js";

describe("Learning OS outcome scale core", () => {
  const lessons = [
    { id: "lesson_11", title: "Arrays", concepts: [{ conceptName: "Array", difficulty: 2 }] },
    { id: "lesson_15", title: "Async", concepts: [{ conceptName: "Promise", difficulty: 6 }] },
    { id: "lesson_22", title: "React", concepts: [{ conceptName: "useState", difficulty: 5 }] },
  ];

  it("builds a pre-course diagnostic blueprint from real concepts and question ids", () => {
    const report = buildDiagnosticExamBlueprint(lessons, {
      mc: [{ id: "q1", conceptKey: "lesson_11::Array" }],
      trace: [{ id: "t1", conceptKey: "lesson_15::Promise" }],
    });

    expect(report.policy).toContain("existing lesson concepts");
    expect(report.conceptCount).toBe(3);
    expect(report.questionCount).toBe(2);
    expect(report.domains.map((domain) => domain.id)).toEqual([
      "js-foundations",
      "dom",
      "async",
      "react",
      "typescript",
      "backend",
    ]);
    expect(report.domains.find((domain) => domain.id === "async").questionIds).toEqual(["t1"]);
  });

  it("scores diagnostic signals by concept, confidence and answer latency", () => {
    expect(normalizeDiagnosticSignal({
      questionId: "q1",
      conceptKey: "lesson_11::Array",
      correct: true,
      confidence: 5,
      latencyMs: 1200,
    })).toMatchObject({ confidence: 5, latencyMs: 1200 });

    const scores = scoreDiagnosticByPrerequisiteGraph([
      { conceptKey: "lesson_11::Array", correct: true, confidence: 5, latencyMs: 1000 },
      { conceptKey: "lesson_11::Array", correct: false, confidence: 4, latencyMs: 2000 },
    ], {
      "lesson_11::Array": ["lesson_11::Index"],
    });

    expect(scores).toEqual([expect.objectContaining({
      conceptKey: "lesson_11::Array",
      accuracy: 50,
      prerequisiteCount: 1,
      averageConfidence: 4.5,
      averageLatencyMs: 1500,
    })]);
  });

  it("places the learner, creates a first-week plan and exports a privacy-safe diagnostic report", () => {
    const placements = placeLearnerPerConcept([
      { conceptKey: "lesson_11::Array", attempts: 2, accuracy: 50, averageConfidence: 2, averageLatencyMs: 1000 },
      { conceptKey: "lesson_22::useState", attempts: 3, accuracy: 90, averageConfidence: 5, averageLatencyMs: 1000 },
    ]);
    const plan = buildFirstWeekPlan(placements);
    const exported = exportDiagnosticReport({
      learnerId: "tal",
      completedAt: "2026-04-30T00:00:00.000Z",
      placements,
      firstWeekPlan: plan,
    });

    expect(placements.map((item) => item.placement)).toEqual(["remediate", "skip"]);
    expect(plan.days.flatMap((day) => day.tasks).map((task) => task.whyThisPath)).toEqual([
      "Accuracy 50%, low confidence.",
    ]);
    expect(scheduleDiagnosticRetake("2026-04-30T00:00:00.000Z")).toEqual({
      earliest: "2026-05-07",
      latest: "2026-05-14",
    });
    expect(exported.privacy).toContain("No private answers");
  });

  it("builds balanced daily missions with time boxes, recovery and end-of-day next action", () => {
    const plan = buildDailyMissions({
      dueItems: ["lesson_11::Array", "lesson_12::map"],
      weakConcepts: ["lesson_15::Promise"],
      capstoneNeeds: [{ projectId: "capstone_task_manager" }],
      exam: { target: "mock-section" },
      minutes: 30,
      missedDays: 2,
    });

    expect(plan.timeBoxMinutes).toBe(30);
    expect(plan.missions.map((item) => item.type)).toEqual(["review", "review", "remediation", "project", "exam"]);
    expect(plan.recovery).toMatchObject({ active: true, missedDays: 2 });
    expect(plan.studentAgreement).toContain("I will mark stuck when blocked");
    expect(plan.endOfDaySummary.nextBestAction).toBe("review");
  });

  it("builds Project Studio state without fake project data", () => {
    const studio = buildProjectStudio({
      id: "capstone_task_manager",
      title: "Task Manager",
      milestones: ["Create list", "Persist tasks"],
      requirements: ["Add task"],
      edgeCases: ["Empty title"],
      tests: ["Add task test"],
      reviewChecklist: ["State is local"],
      deliverables: ["README.md"],
      conceptKeys: ["lesson_11::Array"],
    }, {
      milestones: { m1: true },
      submission: { link: "https://repo.invalid/task-manager" },
      runnable: true,
      tested: false,
      documented: true,
      reviewNotes: { m1: "Reviewed by teacher" },
      notes: ["state mutation suspected"],
    });

    expect(studio.milestoneTracker.map((item) => item.done)).toEqual([true, false]);
    expect(studio.submission.privacyWarning).toContain("Do not paste secrets");
    expect(studio.portfolioReadme).toContain("1/2 milestones completed");
    expect(studio.projectHealthScore).toMatchObject({ runnable: true, documented: true, reviewed: true, score: 50 });
    expect(studio.deterministicTemplate.noFakeData).toBe(true);
  });

  it("defines accessibility, privacy and trust center contracts", () => {
    expect(TRUST_CENTER.accessibility).toContain("WCAG 2.1 AA screen-reader pass");
    expect(TRUST_CENTER.privacy).toContain("export/delete");
    expect(TRUST_CENTER.trust).toContain("no fake data");
    expect(TRUST_CENTER.trust).toContain("deterministic testing");
  });
});
