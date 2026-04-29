export const OUTCOME_LOOP_VERSION = 1;

export const PILOT_PROTOCOL = Object.freeze({
  version: OUTCOME_LOOP_VERSION,
  target: "SVCollege AI & Full Stack",
  cohortSize: 10,
  durationDays: 7,
  checkpoints: Object.freeze([
    "D0 baseline exam",
    "D1 retention check",
    "D7 final exam and module mastery review",
    "qualitative feedback review",
  ]),
  requiredMetrics: Object.freeze([
    "D1 retention",
    "D7 retention",
    "module mastery",
    "average wrong-to-correct recovery time",
    "repeated misconception rate",
    "student got stuck feedback count",
  ]),
  dataPolicy: "Use local learner evidence only; unavailable pilot data remains unknown/unavailable.",
});

export const PROMOTION_REQUIRED_EVIDENCE = Object.freeze([
  "content",
  "practice",
  "tabHealth",
  "smoke",
  "feedback",
]);

function safeText(value, max = 160) {
  return String(value ?? "").trim().slice(0, max);
}

function safeNumber(value, fallback = null) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function safeList(value, maxItems = 20, maxText = 180) {
  if (Array.isArray(value)) return value.map((item) => safeText(item, maxText)).filter(Boolean).slice(0, maxItems);
  return String(value ?? "")
    .split("|")
    .map((item) => safeText(item, maxText))
    .filter(Boolean)
    .slice(0, maxItems);
}

function stableHash(input) {
  let hash = 2166136261;
  const text = String(input || "");
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36).padStart(7, "0");
}

export function dayKey(timestamp = Date.now()) {
  const date = new Date(safeNumber(timestamp, Date.now()));
  if (Number.isNaN(date.getTime())) return "unknown-day";
  return date.toISOString().slice(0, 10);
}

function dayToMs(day) {
  const time = Date.parse(`${safeText(day, 20)}T00:00:00.000Z`);
  return Number.isFinite(time) ? time : null;
}

function addDays(day, offset) {
  const base = dayToMs(day);
  if (base === null) return "unknown-day";
  return new Date(base + offset * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

function statusLabel(status) {
  if (status === "active") return "active";
  if (status === "inactive") return "inactive";
  if (status === "pending") return "pending";
  return "unknown/unavailable";
}

function normalizeEvents(events) {
  return (Array.isArray(events) ? events : [])
    .filter((event) => event && typeof event === "object")
    .map((event) => ({
      ...event,
      timestamp: safeNumber(event.timestamp, null),
      day: safeText(event.day || (event.timestamp ? dayKey(event.timestamp) : ""), 20),
      type: safeText(event.type, 60),
      conceptKey: safeText(event.conceptKey, 180),
      questionId: safeText(event.questionId, 140),
      correct: event.correct === true ? true : event.correct === false ? false : null,
    }))
    .filter((event) => event.timestamp !== null)
    .sort((a, b) => a.timestamp - b.timestamp || a.type.localeCompare(b.type));
}

function retentionStatus(days, firstDay, offset, now) {
  if (!firstDay) {
    return {
      day: "",
      active: null,
      status: "unknown",
      label: "unknown/unavailable",
    };
  }
  const targetDay = addDays(firstDay, offset);
  const nowDay = dayKey(now);
  if (nowDay < targetDay) {
    return {
      day: targetDay,
      active: null,
      status: "pending",
      label: statusLabel("pending"),
    };
  }
  const active = days.has(targetDay);
  return {
    day: targetDay,
    active,
    status: active ? "active" : "inactive",
    label: statusLabel(active ? "active" : "inactive"),
  };
}

function isAnswerEvent(event) {
  return event.type === "answer";
}

function eventConceptKey(event) {
  return event.conceptKey || (event.questionId ? `question:${event.questionId}` : "");
}

function averageRecoverySec(events) {
  const openWrong = new Map();
  const durations = [];
  events.filter(isAnswerEvent).forEach((event) => {
    const key = eventConceptKey(event);
    if (!key) return;
    if (event.correct === false) {
      if (!openWrong.has(key)) openWrong.set(key, event.timestamp);
      return;
    }
    if (event.correct === true && openWrong.has(key)) {
      const startedAt = openWrong.get(key);
      const duration = Math.max(0, Math.round((event.timestamp - startedAt) / 1000));
      durations.push(duration);
      openWrong.delete(key);
    }
  });
  if (!durations.length) return null;
  return Math.round(durations.reduce((sum, item) => sum + item, 0) / durations.length);
}

function repeatedMisconceptionRate(events) {
  let wrongEvents = 0;
  let repeatedWrongEvents = 0;
  const streaks = new Map();
  events.filter(isAnswerEvent).forEach((event) => {
    const key = eventConceptKey(event);
    if (!key) return;
    const streak = streaks.get(key) || 0;
    if (event.correct === false) {
      wrongEvents += 1;
      if (streak > 0) repeatedWrongEvents += 1;
      streaks.set(key, streak + 1);
    } else if (event.correct === true) {
      streaks.set(key, 0);
    }
  });
  if (!wrongEvents) return {
    wrongEvents: 0,
    repeatedWrongEvents: 0,
    ratePct: null,
    label: "unknown/unavailable",
  };
  const ratePct = Math.round((repeatedWrongEvents / wrongEvents) * 100);
  return {
    wrongEvents,
    repeatedWrongEvents,
    ratePct,
    label: `${ratePct}%`,
  };
}

function isMasteredScore(score) {
  return Boolean(score && safeNumber(score.level, 1) >= 7);
}

function moduleConceptKeys(module, scoreKeys) {
  if (Array.isArray(module.conceptKeys)) return safeList(module.conceptKeys, 1000, 220);
  if (typeof module.filter === "function") return scoreKeys.filter((key) => module.filter(key));
  return [];
}

function moduleMastery(scores = {}, modules = []) {
  const scoreMap = scores && typeof scores === "object" ? scores : {};
  const scoreKeys = Object.keys(scoreMap).sort((a, b) => a.localeCompare(b));
  const rows = (Array.isArray(modules) ? modules : []).map((module) => {
    const keys = moduleConceptKeys(module || {}, scoreKeys);
    const total = keys.length;
    const mastered = keys.filter((key) => isMasteredScore(scoreMap[key])).length;
    return {
      id: safeText(module.id || module.label || "module", 80),
      label: safeText(module.label || module.id || "module", 120),
      total,
      mastered,
      masteryPct: total ? Math.round((mastered / total) * 100) : null,
      status: total ? "measured" : "unknown",
      labelValue: total ? `${mastered}/${total}` : "unknown/unavailable",
    };
  });
  const measured = rows.filter((row) => row.total > 0);
  return {
    averagePct: measured.length
      ? Math.round(measured.reduce((sum, row) => sum + row.masteryPct, 0) / measured.length)
      : null,
    measuredModules: measured.length,
    totalModules: rows.length,
    modules: rows,
    label: measured.length ? `${measured.length}/${rows.length} modules measured` : "unknown/unavailable",
  };
}

export function buildStuckFeedbackEvent(input = {}) {
  const timestamp = safeNumber(input.timestamp, Date.now());
  const lessonId = safeText(input.lessonId, 90);
  const questionId = safeText(input.questionId, 140);
  const mode = safeText(input.mode || "question", 60);
  const conceptKeys = safeList(input.conceptKeys, 12, 180);
  const prerequisiteKeys = safeList(input.prerequisiteKeys, 16, 180);
  const terms = safeList(input.terms, 12, 80);
  const viewportInput = input.viewport && typeof input.viewport === "object" ? input.viewport : {};
  const viewport = {
    width: safeNumber(viewportInput.width, null),
    height: safeNumber(viewportInput.height, null),
    devicePixelRatio: safeNumber(viewportInput.devicePixelRatio, null),
    orientation: safeText(viewportInput.orientation, 30),
  };
  const feedbackId = `stuck-${stableHash([
    timestamp,
    mode,
    lessonId,
    questionId,
    conceptKeys.join(","),
    prerequisiteKeys.join(","),
    viewport.width,
    viewport.height,
  ].join("|"))}`;

  return {
    type: "student_stuck",
    feedbackId,
    timestamp,
    day: dayKey(timestamp),
    source: `stuck-feedback:${mode}`,
    lessonId,
    conceptKey: conceptKeys[0] || "",
    conceptKeys,
    prerequisiteKeys,
    terms,
    questionId,
    kind: safeText(input.kind, 40),
    viewport,
    feedbackCode: safeText(input.feedbackCode || "blocked_prerequisite", 80),
  };
}

export function buildOutcomeMetrics({ events = [], scores = {}, modules = [], now = Date.now() } = {}) {
  const normalizedEvents = normalizeEvents(events);
  const days = new Set(normalizedEvents.map((event) => event.day).filter(Boolean));
  const firstDay = [...days].sort((a, b) => a.localeCompare(b))[0] || "";
  const repeated = repeatedMisconceptionRate(normalizedEvents);
  const mastery = moduleMastery(scores, modules);
  const stuckFeedback = normalizedEvents.filter((event) => event.type === "student_stuck").length;
  const avgRecoverySec = averageRecoverySec(normalizedEvents);

  return {
    version: OUTCOME_LOOP_VERSION,
    protocol: PILOT_PROTOCOL,
    retention: {
      firstActiveDay: firstDay || "unknown/unavailable",
      d1: retentionStatus(days, firstDay, 1, now),
      d7: retentionStatus(days, firstDay, 7, now),
    },
    moduleMastery: mastery,
    recovery: {
      averageWrongToCorrectSec: avgRecoverySec,
      label: avgRecoverySec === null ? "unknown/unavailable" : `${avgRecoverySec}s`,
    },
    repeatedMisconceptions: repeated,
    stuckFeedback: {
      count: stuckFeedback,
      label: String(stuckFeedback),
    },
  };
}

export function evaluatePromotionGate(evidence = {}) {
  const missing = PROMOTION_REQUIRED_EVIDENCE.filter((key) => evidence[key] !== true);
  return {
    version: OUTCOME_LOOP_VERSION,
    status: missing.length ? "blocked" : "ready-for-students",
    ready: missing.length === 0,
    requiredEvidence: PROMOTION_REQUIRED_EVIDENCE,
    missing,
    rule:
      "A module is ready for students only after content, practice, tab health, smoke evidence and first-user feedback evidence all pass.",
  };
}
