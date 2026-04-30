export const LEARNING_OS_VERSION = 1;

const UNKNOWN = "unknown/unavailable";

function list(value) {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}

function text(value, fallback = UNKNOWN) {
  const normalized = String(value ?? "").trim();
  return normalized || fallback;
}

function num(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function pct(value) {
  return Math.max(0, Math.min(100, Math.round(num(value, 0))));
}

function addDays(isoDate, days) {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return UNKNOWN;
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export const DIAGNOSTIC_DOMAINS = Object.freeze([
  { id: "js-foundations", label: "JS foundations", match: /lesson_11|lesson_12|lesson_13|lesson_14|lesson_19|workbook/i },
  { id: "dom", label: "DOM", match: /lesson_13|lesson_18|lesson_html_css/i },
  { id: "async", label: "Async", match: /lesson_15|lesson_16|lesson_17/i },
  { id: "react", label: "React", match: /lesson_21|lesson_22|lesson_23|lesson_24|lesson_25|react/i },
  { id: "typescript", label: "TypeScript", match: /lesson_26|lesson_27/i },
  { id: "backend", label: "Backend", match: /lesson_16|lesson_17|lesson_20|lesson_sql_orm|lesson_auth_security|lesson_nextjs|lesson_nestjs/i },
]);

export function buildDiagnosticExamBlueprint(lessons = [], questionBank = {}) {
  const concepts = list(lessons).flatMap((lesson) =>
    list(lesson.concepts).map((concept) => {
      const conceptKey = `${lesson.id}::${concept.conceptName}`;
      const domain = DIAGNOSTIC_DOMAINS.find((item) => item.match.test(conceptKey)) || DIAGNOSTIC_DOMAINS[0];
      return {
        domainId: domain.id,
        domainLabel: domain.label,
        lessonId: lesson.id,
        lessonTitle: text(lesson.title),
        conceptName: text(concept.conceptName),
        conceptKey,
        difficulty: num(concept.difficulty, 5),
      };
    }),
  );
  const questions = Object.entries(questionBank || {}).flatMap(([kind, items]) =>
    list(items).map((item) => ({
      kind,
      id: text(item.id || item.questionId),
      conceptKey: text(item.conceptKey, ""),
      level: num(item.challengeLevel ?? item.level ?? item.difficulty, 1),
    })),
  );
  const byDomain = DIAGNOSTIC_DOMAINS.map((domain) => {
    const domainConcepts = concepts.filter((concept) => concept.domainId === domain.id);
    const conceptKeys = new Set(domainConcepts.map((concept) => concept.conceptKey));
    return {
      id: domain.id,
      label: domain.label,
      concepts: domainConcepts.map((concept) => concept.conceptKey),
      questionIds: questions.filter((question) => conceptKeys.has(question.conceptKey)).map((question) => question.id),
    };
  });
  return {
    version: LEARNING_OS_VERSION,
    policy: "Diagnostic uses existing lesson concepts and question ids only; missing coverage remains unknown/unavailable.",
    domains: byDomain,
    conceptCount: concepts.length,
    questionCount: questions.length,
  };
}

export function normalizeDiagnosticSignal(signal = {}) {
  return {
    questionId: text(signal.questionId),
    conceptKey: text(signal.conceptKey),
    correct: signal.correct === true,
    confidence: signal.confidence == null ? null : Math.max(1, Math.min(5, Math.round(num(signal.confidence, 0)))),
    latencyMs: signal.latencyMs == null ? null : Math.max(0, Math.round(num(signal.latencyMs, 0))),
  };
}

export function scoreDiagnosticByPrerequisiteGraph(signals = [], prerequisiteGraph = {}) {
  const buckets = new Map();
  list(signals).map(normalizeDiagnosticSignal).forEach((signal) => {
    if (!signal.conceptKey || signal.conceptKey === UNKNOWN) return;
    const bucket = buckets.get(signal.conceptKey) || {
      conceptKey: signal.conceptKey,
      attempts: 0,
      correct: 0,
      confidenceTotal: 0,
      confidenceCount: 0,
      latencyTotal: 0,
      latencyCount: 0,
      prerequisites: list(prerequisiteGraph[signal.conceptKey]),
    };
    bucket.attempts += 1;
    if (signal.correct) bucket.correct += 1;
    if (signal.confidence != null) {
      bucket.confidenceTotal += signal.confidence;
      bucket.confidenceCount += 1;
    }
    if (signal.latencyMs != null) {
      bucket.latencyTotal += signal.latencyMs;
      bucket.latencyCount += 1;
    }
    buckets.set(signal.conceptKey, bucket);
  });
  return [...buckets.values()].map((bucket) => {
    const accuracy = bucket.attempts ? pct((bucket.correct / bucket.attempts) * 100) : null;
    return {
      conceptKey: bucket.conceptKey,
      attempts: bucket.attempts,
      accuracy,
      prerequisiteCount: bucket.prerequisites.length,
      averageConfidence: bucket.confidenceCount ? Number((bucket.confidenceTotal / bucket.confidenceCount).toFixed(2)) : null,
      averageLatencyMs: bucket.latencyCount ? Math.round(bucket.latencyTotal / bucket.latencyCount) : null,
    };
  }).sort((a, b) => a.conceptKey.localeCompare(b.conceptKey));
}

export function placeLearnerPerConcept(scores = []) {
  return list(scores).map((score) => {
    const accuracy = score.accuracy;
    const slow = score.averageLatencyMs != null && score.averageLatencyMs > 45000;
    const lowConfidence = score.averageConfidence != null && score.averageConfidence <= 2;
    const placement = accuracy == null || score.attempts === 0
      ? "learn"
      : accuracy >= 85 && !slow
        ? "skip"
        : accuracy >= 65
          ? "review"
          : "remediate";
    return {
      ...score,
      placement: lowConfidence && placement === "skip" ? "review" : placement,
      reason: accuracy == null
        ? "No diagnostic evidence yet."
        : `Accuracy ${accuracy}%${slow ? ", slow answer latency" : ""}${lowConfidence ? ", low confidence" : ""}.`,
    };
  });
}

export function buildFirstWeekPlan(placements = []) {
  const groups = {
    remediate: [],
    learn: [],
    review: [],
    skip: [],
  };
  list(placements).forEach((item) => groups[item.placement]?.push(item));
  const days = [1, 2, 3, 4, 5, 6, 7].map((day) => ({ day, tasks: [] }));
  [...groups.remediate, ...groups.learn, ...groups.review].forEach((item, index) => {
    days[index % days.length].tasks.push({
      conceptKey: item.conceptKey,
      action: item.placement,
      whyThisPath: item.reason || UNKNOWN,
    });
  });
  return {
    policy: "First-week plan is generated from diagnostic placements only; no tasks are padded.",
    days,
    skippedConcepts: groups.skip.map((item) => item.conceptKey),
  };
}

export function scheduleDiagnosticRetake(completedAt, minDays = 7, maxDays = 14) {
  return {
    earliest: addDays(completedAt, minDays),
    latest: addDays(completedAt, maxDays),
  };
}

export function exportDiagnosticReport({ learnerId = UNKNOWN, completedAt = UNKNOWN, scores = [], placements = [], firstWeekPlan = null } = {}) {
  return {
    reportType: "learning-os-diagnostic",
    version: LEARNING_OS_VERSION,
    learnerId: text(learnerId),
    completedAt: text(completedAt),
    scores: list(scores),
    placements: list(placements),
    firstWeekPlan: firstWeekPlan || { days: [], skippedConcepts: [] },
    retakeWindow: scheduleDiagnosticRetake(completedAt),
    privacy: "No private answers are exported; missing fields stay unknown/unavailable.",
  };
}

export function buildDailyMissions({ dueItems = [], weakConcepts = [], capstoneNeeds = [], exam = null, minutes = 30, missedDays = 0 } = {}) {
  const timeBox = [15, 30, 60].includes(num(minutes)) ? num(minutes) : 30;
  const budget = timeBox === 15
    ? { review: 1, remediation: 1, project: 0, exam: 0 }
    : timeBox === 60
      ? { review: 3, remediation: 2, project: 2, exam: 1 }
      : { review: 2, remediation: 2, project: 1, exam: 1 };
  const missions = [
    ...list(dueItems).slice(0, budget.review).map((item) => ({ type: "review", conceptKey: text(item.conceptKey || item), source: "srs" })),
    ...list(weakConcepts).slice(0, budget.remediation).map((item) => ({ type: "remediation", conceptKey: text(item.conceptKey || item), source: "weak-concept" })),
    ...list(capstoneNeeds).slice(0, budget.project).map((item) => ({ type: "project", projectId: text(item.projectId || item.id || item), source: "capstone" })),
  ];
  if (budget.exam && exam) missions.push({ type: "exam", target: text(exam.target || "mock-section"), source: "upcoming-exam" });
  const recovery = num(missedDays) > 0
    ? { active: true, action: "resume with review before new learning", missedDays: num(missedDays) }
    : { active: false, action: "normal plan", missedDays: 0 };
  return {
    version: LEARNING_OS_VERSION,
    timeBoxMinutes: timeBox,
    studentAgreement: ["I will answer before revealing help", "I will mark stuck when blocked", "I will stop if overloaded"],
    missions,
    balance: budget,
    recovery,
    forecast: missions.length ? `Expected mastery evidence after ${missions.length} real tasks.` : UNKNOWN,
    endOfDaySummary: missions.length ? { nextBestAction: missions[0].type, evidenceRequired: true } : { nextBestAction: UNKNOWN, evidenceRequired: true },
  };
}

export function buildProjectStudio(project = {}, progress = {}) {
  const milestones = list(project.milestones).map((milestone, index) => {
    const id = `m${index + 1}`;
    return {
      id,
      title: text(typeof milestone === "string" ? milestone : milestone.title),
      done: progress.milestones?.[id] === true,
      reviewNote: text(progress.reviewNotes?.[id], UNKNOWN),
    };
  });
  const rubric = {
    requirements: list(project.requirements),
    edgeCases: list(project.edgeCases),
    tests: list(project.tests),
    architecture: list(project.reviewChecklist),
  };
  const completed = milestones.filter((item) => item.done).length;
  const healthScore = milestones.length ? pct((completed / milestones.length) * 100) : 0;
  return {
    projectId: text(project.id),
    milestoneTracker: milestones,
    submission: {
      paste: text(progress.submission?.paste, UNKNOWN),
      link: text(progress.submission?.link, UNKNOWN),
      fileMetadata: progress.submission?.fileMetadata || null,
      privacyWarning: "Do not paste secrets, passwords, private tokens or student PII.",
    },
    rubricSelfReview: rubric,
    antiPatternReview: list(progress.notes).map((note) => ({ note: text(note), status: "needs-human-review" })),
    portfolioReadme: completed
      ? `# ${text(project.title, project.id)}\n\nProgress: ${completed}/${milestones.length} milestones completed.\n\nEvidence comes from local capstone progress only.`
      : UNKNOWN,
    teacherMentorReviewNotes: progress.reviewNotes || {},
    projectHealthScore: {
      runnable: progress.runnable === true,
      tested: progress.tested === true,
      documented: progress.documented === true,
      reviewed: Object.keys(progress.reviewNotes || {}).length > 0,
      score: healthScore,
    },
    deterministicTemplate: {
      files: list(project.deliverables),
      conceptKeys: list(project.conceptKeys),
      noFakeData: true,
    },
  };
}

export const TRUST_CENTER = Object.freeze({
  accessibility: [
    "WCAG 2.1 AA screen-reader pass",
    "keyboard-only journey",
    "reduced cognitive load mode",
    "mobile touch audit",
  ],
  privacy: [
    "local-first progress",
    "export/delete",
    "teacher visibility boundaries",
    "cloud sync is optional",
  ],
  trust: [
    "no fake data",
    "deterministic testing",
    "content review policy",
    "unknown/unavailable for missing evidence",
  ],
});
