export const CONFIDENCE_CALIBRATION_VERSION = 1;

export function emptyConfidenceCalibrationState() {
  return {
    version: CONFIDENCE_CALIBRATION_VERSION,
    concepts: {},
    log: [],
  };
}

export function confidenceToPct(confidence) {
  const raw = Number(confidence);
  if (!Number.isFinite(raw) || raw < 1) return null;
  const rating = Math.max(1, Math.min(5, raw));
  return rating * 20;
}

export function calibrationBucket({ confidencePct, correct } = {}) {
  const pct = Number(confidencePct);
  if (!Number.isFinite(pct)) return "unknown";
  const outcomePct = correct ? 100 : 0;
  const gap = pct - outcomePct;
  if (Math.abs(gap) <= 20) return "calibrated";
  return gap > 0 ? "overconfident" : "underconfident";
}

export function calibrationMessage(bucket) {
  if (bucket === "overconfident") return "בטחון גבוה מדי ביחס לתוצאה. האטה קטנה לפני תשובה תעזור.";
  if (bucket === "underconfident") return "ידעת יותר ממה שהרגשת. כדאי לסמוך יותר על הסימנים הנכונים.";
  if (bucket === "calibrated") return "הערכת הביטחון קרובה לתוצאה. זה כיול טוב.";
  return "לא נשמר כיול לתשובה הזו.";
}

export function updateConfidenceCalibrationState(
  state,
  {
    conceptKey,
    lessonId = "",
    conceptName = "",
    topic = "",
    subtopic = "",
    confidence = null,
    correct = false,
    kind = "mc",
    questionId = "",
    timestamp = Date.now(),
    maxLog = 120,
  } = {},
) {
  const confidencePct = confidenceToPct(confidence);
  const base = state && typeof state === "object" ? state : emptyConfidenceCalibrationState();
  const next = {
    version: CONFIDENCE_CALIBRATION_VERSION,
    concepts: { ...(base.concepts || {}) },
    log: Array.isArray(base.log) ? [...base.log] : [],
  };
  if (!conceptKey || confidencePct == null) return { state: next, entry: null, stats: null };

  const bucket = calibrationBucket({ confidencePct, correct });
  const entry = {
    conceptKey,
    lessonId,
    conceptName,
    topic,
    subtopic,
    confidence: Number(confidence),
    confidencePct,
    correct: Boolean(correct),
    outcomePct: correct ? 100 : 0,
    gap: confidencePct - (correct ? 100 : 0),
    bucket,
    kind,
    questionId,
    timestamp,
  };

  const prev = next.concepts[conceptKey] || {
    conceptKey,
    lessonId,
    conceptName,
    topic,
    subtopic,
    attempts: 0,
    correct: 0,
    confidenceSum: 0,
    calibrated: 0,
    overconfident: 0,
    underconfident: 0,
  };
  const attempts = (prev.attempts || 0) + 1;
  const correctCount = (prev.correct || 0) + (correct ? 1 : 0);
  const confidenceSum = (prev.confidenceSum || 0) + confidencePct;
  const calibrated = (prev.calibrated || 0) + (bucket === "calibrated" ? 1 : 0);
  const overconfident = (prev.overconfident || 0) + (bucket === "overconfident" ? 1 : 0);
  const underconfident = (prev.underconfident || 0) + (bucket === "underconfident" ? 1 : 0);
  const accuracyPct = Math.round((correctCount / attempts) * 100);
  const avgConfidencePct = Math.round(confidenceSum / attempts);

  const stats = {
    ...prev,
    lessonId: lessonId || prev.lessonId,
    conceptName: conceptName || prev.conceptName,
    topic: topic || prev.topic,
    subtopic: subtopic || prev.subtopic,
    attempts,
    correct: correctCount,
    confidenceSum,
    calibrated,
    overconfident,
    underconfident,
    accuracyPct,
    avgConfidencePct,
    calibrationGap: avgConfidencePct - accuracyPct,
    lastConfidence: Number(confidence),
    lastConfidencePct: confidencePct,
    lastCorrect: Boolean(correct),
    lastBucket: bucket,
    lastGap: entry.gap,
    lastSeen: timestamp,
  };

  next.concepts[conceptKey] = stats;
  next.log.unshift(entry);
  next.log = next.log.slice(0, maxLog);

  return { state: next, entry, stats };
}
