export const LEARNING_EVIDENCE_VERSION = 1;

export const LEARNING_EVENT_TYPES = Object.freeze({
  VIEW: "view",
  ANSWER: "answer",
  WRONG_AID: "wrong_answer_aid",
  REVIEW: "review",
  MASTERY_CHANGE: "mastery_change",
  EXAM_ATTEMPT: "exam_attempt",
  CLIP_VIEW: "clip_view",
  FLASHCARD_REVIEW: "flashcard_review",
  LESSON_WRAP: "lesson_wrap",
  STUDENT_STUCK: "student_stuck",
});

const VALID_EVENT_TYPES = new Set(Object.values(LEARNING_EVENT_TYPES));

export function stableHash(input) {
  const text = String(input || "");
  let hash = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36).padStart(7, "0");
}

export function dayKey(timestamp = Date.now()) {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return "unknown-day";
  return date.toISOString().slice(0, 10);
}

export function makeInstallKey({ firstSeen = "", origin = "" } = {}) {
  return `le-${stableHash(`${firstSeen}|${origin}`)}`;
}

export function makeSessionId({ installKey = "", timestamp = Date.now() } = {}) {
  return `${dayKey(timestamp)}:${stableHash(installKey || "local")}`;
}

export function emptyLearningEvidenceState() {
  return {
    version: LEARNING_EVIDENCE_VERSION,
    installKey: "",
    events: [],
  };
}

function safeText(value, max = 160) {
  return String(value || "").trim().slice(0, max);
}

function safeNumber(value, fallback = null) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function boolOrNull(value) {
  if (value === true || value === false) return value;
  return null;
}

function safeList(value, maxItems = 20, maxText = 180) {
  if (Array.isArray(value)) return value.map((item) => safeText(item, maxText)).filter(Boolean).slice(0, maxItems);
  return String(value || "")
    .split("|")
    .map((item) => safeText(item, maxText))
    .filter(Boolean)
    .slice(0, maxItems);
}

function safeViewport(value) {
  const viewport = value && typeof value === "object" ? value : {};
  return {
    width: safeNumber(viewport.width, null),
    height: safeNumber(viewport.height, null),
    devicePixelRatio: safeNumber(viewport.devicePixelRatio, null),
    orientation: safeText(viewport.orientation, 30),
  };
}

function isoTimestamp(timestamp) {
  const date = new Date(safeNumber(timestamp, Date.now()));
  return Number.isNaN(date.getTime()) ? "unknown-time" : date.toISOString();
}

function markdownCell(value) {
  return String(value ?? "")
    .replace(/\|/g, "\\|")
    .replace(/\s+/g, " ")
    .trim();
}

export function normalizeLearningEvent(input = {}) {
  const timestamp = safeNumber(input.timestamp, Date.now());
  const type = VALID_EVENT_TYPES.has(input.type) ? input.type : LEARNING_EVENT_TYPES.VIEW;
  const conceptKey = safeText(input.conceptKey, 180);
  const lessonId = safeText(input.lessonId, 90);
  const conceptName = safeText(input.conceptName, 120);
  const source = safeText(input.source || input.mode || "system", 80);
  const eventSeed = [
    type,
    timestamp,
    source,
    lessonId,
    conceptKey,
    safeText(input.questionId, 120),
    safeText(input.rating, 40),
  ].join("|");

  return {
    id: `evt-${stableHash(eventSeed)}`,
    version: LEARNING_EVIDENCE_VERSION,
    type,
    timestamp,
    day: dayKey(timestamp),
    sessionId: safeText(input.sessionId, 80),
    source,
    lessonId,
    conceptKey,
    conceptName,
    topic: safeText(input.topic, 120),
    subtopic: safeText(input.subtopic, 120),
    kind: safeText(input.kind, 50),
    questionId: safeText(input.questionId, 120),
    correct: boolOrNull(input.correct),
    rating: safeText(input.rating, 40),
    score: safeNumber(input.score, null),
    durationSec: safeNumber(input.durationSec, null),
    masteryBefore: safeNumber(input.masteryBefore, null),
    masteryAfter: safeNumber(input.masteryAfter, null),
    advanced: boolOrNull(input.advanced),
    feedbackId: safeText(input.feedbackId, 120),
    feedbackCode: safeText(input.feedbackCode, 80),
    conceptKeys: safeList(input.conceptKeys, 16, 180),
    prerequisiteKeys: safeList(input.prerequisiteKeys, 16, 180),
    terms: safeList(input.terms, 16, 80),
    viewport: safeViewport(input.viewport),
  };
}

export function appendLearningEvent(state, event, { maxEvents = 1200 } = {}) {
  const base = state && typeof state === "object" ? state : emptyLearningEvidenceState();
  const normalized = normalizeLearningEvent(event);
  const next = {
    version: LEARNING_EVIDENCE_VERSION,
    installKey: safeText(base.installKey, 80),
    events: Array.isArray(base.events) ? [...base.events] : [],
  };
  next.events.unshift(normalized);
  next.events = next.events.slice(0, maxEvents);
  return next;
}

function emptyConceptFunnel(conceptKey, event = {}) {
  return {
    conceptKey,
    conceptName: event.conceptName || conceptKey,
    lessonId: event.lessonId || "",
    topic: event.topic || "",
    views: 0,
    answers: 0,
    correct: 0,
    wrong: 0,
    remediations: 0,
    reviews: 0,
    masteryChanges: 0,
    lastSeen: 0,
  };
}

export function summarizeLearningEvidence(state, { now = Date.now(), topN = 8 } = {}) {
  const events = Array.isArray(state && state.events) ? state.events : [];
  const summary = {
    totalEvents: events.length,
    activeDays: 0,
    last7Days: 0,
    views: 0,
    answers: 0,
    correct: 0,
    wrong: 0,
    remediations: 0,
    reviews: 0,
    exams: 0,
    clips: 0,
    flashcards: 0,
    lessonWraps: 0,
    masteryChanges: 0,
    stuckFeedback: 0,
    accuracyPct: 0,
    conceptFunnels: [],
    days: [],
  };
  const days = new Map();
  const concepts = new Map();
  const nowMs = safeNumber(now, Date.now());
  const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;

  events.forEach((event) => {
    const day = event.day || dayKey(event.timestamp);
    days.set(day, (days.get(day) || 0) + 1);
    if (nowMs - (Number(event.timestamp) || 0) <= sevenDaysMs) summary.last7Days += 1;

    if (event.type === LEARNING_EVENT_TYPES.VIEW) summary.views += 1;
    if (event.type === LEARNING_EVENT_TYPES.ANSWER) {
      summary.answers += 1;
      if (event.correct === true) summary.correct += 1;
      if (event.correct === false) summary.wrong += 1;
    }
    if (event.type === LEARNING_EVENT_TYPES.WRONG_AID) summary.remediations += 1;
    if (event.type === LEARNING_EVENT_TYPES.REVIEW) summary.reviews += 1;
    if (event.type === LEARNING_EVENT_TYPES.EXAM_ATTEMPT) summary.exams += 1;
    if (event.type === LEARNING_EVENT_TYPES.CLIP_VIEW) summary.clips += 1;
    if (event.type === LEARNING_EVENT_TYPES.FLASHCARD_REVIEW) summary.flashcards += 1;
    if (event.type === LEARNING_EVENT_TYPES.LESSON_WRAP) summary.lessonWraps += 1;
    if (event.type === LEARNING_EVENT_TYPES.MASTERY_CHANGE) summary.masteryChanges += 1;
    if (event.type === LEARNING_EVENT_TYPES.STUDENT_STUCK) summary.stuckFeedback += 1;

    const conceptKey = event.conceptKey || (event.lessonId && event.conceptName ? `${event.lessonId}::${event.conceptName}` : "");
    if (!conceptKey) return;
    const funnel = concepts.get(conceptKey) || emptyConceptFunnel(conceptKey, event);
    funnel.conceptName = event.conceptName || funnel.conceptName;
    funnel.lessonId = event.lessonId || funnel.lessonId;
    funnel.topic = event.topic || funnel.topic;
    funnel.lastSeen = Math.max(funnel.lastSeen || 0, Number(event.timestamp) || 0);
    if (event.type === LEARNING_EVENT_TYPES.VIEW) funnel.views += 1;
    if (event.type === LEARNING_EVENT_TYPES.ANSWER) {
      funnel.answers += 1;
      if (event.correct === true) funnel.correct += 1;
      if (event.correct === false) funnel.wrong += 1;
    }
    if (event.type === LEARNING_EVENT_TYPES.WRONG_AID) funnel.remediations += 1;
    if (event.type === LEARNING_EVENT_TYPES.REVIEW || event.type === LEARNING_EVENT_TYPES.FLASHCARD_REVIEW) funnel.reviews += 1;
    if (event.type === LEARNING_EVENT_TYPES.MASTERY_CHANGE) funnel.masteryChanges += 1;
    concepts.set(conceptKey, funnel);
  });

  summary.activeDays = days.size;
  summary.accuracyPct = summary.answers ? Math.round((summary.correct / summary.answers) * 100) : 0;
  summary.days = [...days.entries()]
    .map(([day, count]) => ({ day, count }))
    .sort((a, b) => a.day.localeCompare(b.day));
  summary.conceptFunnels = [...concepts.values()]
    .sort((a, b) => (b.wrong + b.remediations + b.answers) - (a.wrong + a.remediations + a.answers) || b.lastSeen - a.lastSeen)
    .slice(0, topN);

  return summary;
}

function anonymizedEvent(event = {}) {
  const sessionId = safeText(event.sessionId, 80);
  return {
    id: safeText(event.id, 80),
    type: VALID_EVENT_TYPES.has(event.type) ? event.type : LEARNING_EVENT_TYPES.VIEW,
    timestamp: safeNumber(event.timestamp, null),
    day: safeText(event.day || dayKey(event.timestamp), 20),
    sessionHash: sessionId ? `session-${stableHash(sessionId)}` : "",
    source: safeText(event.source, 80),
    lessonId: safeText(event.lessonId, 90),
    conceptKey: safeText(event.conceptKey, 180),
    conceptName: safeText(event.conceptName, 120),
    topic: safeText(event.topic, 120),
    subtopic: safeText(event.subtopic, 120),
    kind: safeText(event.kind, 50),
    questionId: safeText(event.questionId, 120),
    correct: boolOrNull(event.correct),
    rating: safeText(event.rating, 40),
    score: safeNumber(event.score, null),
    durationSec: safeNumber(event.durationSec, null),
    masteryBefore: safeNumber(event.masteryBefore, null),
    masteryAfter: safeNumber(event.masteryAfter, null),
    advanced: boolOrNull(event.advanced),
    feedbackId: safeText(event.feedbackId, 120),
    feedbackCode: safeText(event.feedbackCode, 80),
    conceptKeys: safeList(event.conceptKeys, 16, 180),
    prerequisiteKeys: safeList(event.prerequisiteKeys, 16, 180),
    terms: safeList(event.terms, 16, 80),
    viewport: safeViewport(event.viewport),
  };
}

export function anonymizedLearningEvidenceExport(state, { now = Date.now(), appVersion = "" } = {}) {
  const events = Array.isArray(state && state.events) ? state.events.map(anonymizedEvent) : [];
  return {
    version: LEARNING_EVIDENCE_VERSION,
    exportedAt: isoTimestamp(now),
    appVersion: safeText(appVersion, 80),
    privacy: {
      pii: false,
      freeTextAnswers: false,
      installKeyIncluded: false,
      sessionIdsHashed: true,
      source: "localStorage learning events",
    },
    summary: summarizeLearningEvidence({ events }, { now, topN: 20 }),
    events,
  };
}

export function buildLearningEvidenceMarkdownReport(
  state,
  { now = Date.now(), title = "LumenPortal Learning Evidence Weekly Report", topN = 10 } = {},
) {
  const limit = Math.max(1, safeNumber(topN, 10));
  const summary = summarizeLearningEvidence(state, { now, topN: limit });
  const generatedAt = isoTimestamp(now);
  const dayRows = summary.days.slice(-7);
  const conceptRows = summary.conceptFunnels.slice(0, limit);

  const lines = [
    `# ${markdownCell(title)}`,
    "",
    `Generated: ${generatedAt}`,
    "Source: local learning events only. No PII, install key, or free-form answer text is included.",
    "",
    "## Summary",
    "",
    "| Metric | Value |",
    "|---|---:|",
    `| Total events | ${summary.totalEvents} |`,
    `| Active days | ${summary.activeDays} |`,
    `| Events in last 7 days | ${summary.last7Days} |`,
    `| Answers | ${summary.answers} |`,
    `| Correct | ${summary.correct} |`,
    `| Wrong | ${summary.wrong} |`,
    `| Accuracy | ${summary.accuracyPct}% |`,
    `| Remediations | ${summary.remediations} |`,
    `| Reviews + flashcards | ${summary.reviews + summary.flashcards} |`,
    `| Exams | ${summary.exams} |`,
    `| Student stuck feedback | ${summary.stuckFeedback} |`,
    "",
    "## Last 7 Active Days",
    "",
    "| Day | Events |",
    "|---|---:|",
  ];

  if (dayRows.length) {
    dayRows.forEach((day) => {
      lines.push(`| ${markdownCell(day.day)} | ${day.count} |`);
    });
  } else {
    lines.push("| No activity yet | 0 |");
  }

  lines.push(
    "",
    "## Concept Funnels",
    "",
    "| Concept | Lesson | Topic | Views | Answers | Correct | Wrong | Remediations | Reviews |",
    "|---|---|---|---:|---:|---:|---:|---:|---:|",
  );

  if (conceptRows.length) {
    conceptRows.forEach((item) => {
      lines.push([
        markdownCell(item.conceptName || item.conceptKey),
        markdownCell(item.lessonId),
        markdownCell(item.topic),
        item.views,
        item.answers,
        item.correct,
        item.wrong,
        item.remediations,
        item.reviews,
      ].join(" | ").replace(/^/, "| ").replace(/$/, " |"));
    });
  } else {
    lines.push("| No concept activity yet |  |  | 0 | 0 | 0 | 0 | 0 | 0 |");
  }

  lines.push(
    "",
    "## Interpretation",
    "",
    "- High wrong count with low remediation means the system should show a simpler prerequisite path.",
    "- High views with low answers means the learner is reading but not practicing enough.",
    "- High remediation followed by reviews is a good recovery signal.",
  );

  return lines.join("\n");
}
