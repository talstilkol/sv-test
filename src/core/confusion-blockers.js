export const CONFUSION_BLOCKERS_VERSION = 1;

export function emptyConfusionBlockerState() {
  return {
    version: CONFUSION_BLOCKERS_VERSION,
    blockers: [],
  };
}

function stableId(input) {
  const text = String(input || "");
  let hash = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36).padStart(7, "0");
}

function safeText(value, max = 700) {
  return String(value || "").trim().slice(0, max);
}

export function confusionTarget(record = {}) {
  const rewind = record.prerequisiteRewind || null;
  return {
    lessonId: safeText(rewind?.lessonId || record.lessonId, 90),
    conceptName: safeText(rewind?.conceptName || record.conceptName, 140),
    conceptKey: safeText(rewind?.conceptKey || record.conceptKey, 200),
    reason: rewind
      ? "נפתח מושג קדם פשוט יותר לפני חזרה לשאלה המקורית."
      : "נפתחת רמת ההסבר הפשוטה ביותר של המושג המקורי.",
  };
}

export function makeConfusionBlocker(record = {}, { timestamp = Date.now() } = {}) {
  const target = confusionTarget(record);
  const misconception = record.misconception || {};
  const id = `cb-${stableId([
    record.conceptKey,
    record.questionId,
    misconception.id || "conceptGap",
    target.conceptKey,
  ].join("|"))}`;
  return {
    id,
    status: "open",
    createdAt: timestamp,
    sourceConceptKey: safeText(record.conceptKey, 200),
    sourceLessonId: safeText(record.lessonId, 90),
    sourceConceptName: safeText(record.conceptName, 140),
    targetLessonId: target.lessonId,
    targetConceptName: target.conceptName,
    targetConceptKey: target.conceptKey,
    targetReason: target.reason,
    topic: safeText(record.topic, 140),
    subtopic: safeText(record.subtopic, 140),
    questionId: safeText(record.questionId, 140),
    questionText: safeText(record.questionText, 500),
    selectedAnswer: safeText(record.selectedAnswer, 240),
    correctAnswer: safeText(record.correctAnswer, 240),
    misconceptionId: safeText(misconception.id || "conceptGap", 90),
    misconceptionLabel: safeText(misconception.label || "פער מושגי", 160),
  };
}

export function appendConfusionBlocker(state, record, { timestamp = Date.now(), maxEntries = 100 } = {}) {
  const base = state && typeof state === "object" ? state : emptyConfusionBlockerState();
  const next = {
    version: CONFUSION_BLOCKERS_VERSION,
    blockers: Array.isArray(base.blockers) ? [...base.blockers] : [],
  };
  if (!record || !record.conceptKey) return { state: next, blocker: null };

  const blocker = makeConfusionBlocker(record, { timestamp });
  next.blockers = [
    blocker,
    ...next.blockers.filter((item) => item && item.id !== blocker.id),
  ].slice(0, maxEntries);
  return { state: next, blocker };
}
