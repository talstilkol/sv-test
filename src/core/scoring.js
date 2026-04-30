export const MASTERY_STATES = Object.freeze({
  NEW: "new",
  LEARNING: "learning",
  REVIEW: "review",
  AT_RISK: "at-risk",
  MASTERED: "mastered",
});

export function getDifficulty(concept) {
  const difficulty = concept && concept.difficulty;
  if (typeof difficulty === "number" && difficulty >= 1 && difficulty <= 10) {
    return difficulty;
  }
  return 5;
}

export function correctNeededForV(difficulty) {
  if (difficulty >= 8) return Infinity;
  if (difficulty <= 2) return 1;
  if (difficulty <= 4) return 2;
  if (difficulty <= 6) return 3;
  return 5;
}

export function canMarkV(score, concept) {
  if (!score || score.markedKnown) return false;
  if ((score.level || 1) >= 7) return false;

  const need = correctNeededForV(getDifficulty(concept));
  if (!Number.isFinite(need)) return false;

  return (score.correctRunCount || 0) >= need;
}

export function hasMasteryProof(score) {
  return Boolean(
    score &&
    (
      score.masteryChallengePassed === true ||
      score.deepProofPassed === true ||
      score.masteryProof === true ||
      (score.masteryProof && score.masteryProof.passed === true)
    ),
  );
}

export function isScoreMastered(score) {
  const level = Math.max(1, Math.min(7, Number(score && score.level) || 1));
  return level >= 7 && hasMasteryProof(score);
}

export function questionChallengeLevel(question = {}, concept = {}, kind = "mc") {
  const direct = Number(question.challengeLevel ?? question.level ?? question.difficulty);
  if (Number.isFinite(direct) && direct > 0) {
    return Math.max(1, Math.min(6, Math.round(direct)));
  }

  const difficulty = getDifficulty(concept);
  const derived = Math.ceil(difficulty / 2);
  if (kind === "fill" && needsCodeFill(concept)) {
    return Math.max(4, Math.min(6, derived));
  }
  return Math.max(1, Math.min(6, derived));
}

export function masteryProofThreshold(concept = {}, availableLevels = []) {
  const levels = (availableLevels || [])
    .map(Number)
    .filter((level) => Number.isFinite(level) && level > 0)
    .map((level) => Math.max(1, Math.min(6, Math.round(level))));
  if (levels.length) return Math.max(...levels);

  const difficulty = getDifficulty(concept);
  if (difficulty >= 8) return 6;
  if (difficulty >= 6) return 5;
  if (difficulty >= 4) return 4;
  return 3;
}

export function qualifiesForMasteryProof({
  question = {},
  concept = {},
  kind = "mc",
  availableLevels = [],
} = {}) {
  return questionChallengeLevel(question, concept, kind) >= masteryProofThreshold(concept, availableLevels);
}

export function getMasteryState(score, now = Date.now()) {
  if (!score || score.attempts === 0) return MASTERY_STATES.NEW;
  if (isScoreMastered(score)) return MASTERY_STATES.MASTERED;

  const due = score.srsState && score.srsState.due;
  if (typeof due === "number" && due <= now && score.level >= 6) {
    return MASTERY_STATES.AT_RISK;
  }

  if (score.level <= 3) return MASTERY_STATES.LEARNING;
  return MASTERY_STATES.REVIEW;
}

export function isSrsDue(score, now = Date.now()) {
  if (!score || !score.srsState || typeof score.srsState.due !== "number") {
    return false;
  }
  return score.srsState.due <= now;
}

export function needsCodeFill(concept) {
  return Boolean(concept && concept.codeExample);
}

export function conceptRequiresCodeProof(concept = {}) {
  return Boolean(
    concept &&
    (
      concept.codeExample ||
      (Array.isArray(concept.miniBuilds) && concept.miniBuilds.length > 0) ||
      (Array.isArray(concept.bugHunts) && concept.bugHunts.length > 0)
    ),
  );
}

export function requiresOneLineMasteryCheckpoint(concept = {}) {
  return Boolean(concept) && !conceptRequiresCodeProof(concept);
}

export function requiresScratchMasteryCheckpoint(concept = {}) {
  return conceptRequiresCodeProof(concept);
}

export function validateOneLineMasteryProof(text = "", concept = {}) {
  const value = String(text || "").replace(/\s+/g, " ").trim();
  if (!value) return { passed: false, reason: "empty", normalized: "" };
  if (value.length < 12) return { passed: false, reason: "too-short", normalized: value };
  if (value.length > 180) return { passed: false, reason: "too-long", normalized: value };
  if (/[\r\n]/.test(String(text || ""))) return { passed: false, reason: "not-one-line", normalized: value };
  if (/^(לא יודע|לא יודעת|אין לי מושג|unknown|unavailable)$/i.test(value)) {
    return { passed: false, reason: "unknown", normalized: value };
  }
  const tokens = value
    .split(/[\s,.;:!?()[\]{}"'`]+/)
    .map((token) => token.trim())
    .filter((token) => token.length >= 2);
  if (tokens.length < 3) return { passed: false, reason: "too-few-terms", normalized: value };

  const conceptName = String(concept.conceptName || "").toLowerCase();
  const mentionsConcept = conceptName
    ? value.toLowerCase().includes(conceptName)
    : true;
  return { passed: true, reason: "ok", normalized: value, mentionsConcept };
}

export function hasOneLineMasteryProof(score) {
  return Boolean(score && score.oneLineProof && score.oneLineProof.passed === true);
}

export function validateScratchMasteryProof(code = "", concept = {}) {
  const value = String(code || "").trim();
  if (!value) return { passed: false, reason: "empty", normalized: "" };
  if (value.length < 20) return { passed: false, reason: "too-short", normalized: value };
  if (value.length > 2000) return { passed: false, reason: "too-long", normalized: value };

  const codeTokens = [
    "const", "let", "var", "function", "return", "=>", "class", "if", "for", "while",
    "map", "filter", "reduce", "find", "async", "await", "try", "catch", "import", "export",
  ];
  const hasCodeSignal = codeTokens.some((token) => value.includes(token)) ||
    /[{}()[\];=]/.test(value);
  if (!hasCodeSignal) return { passed: false, reason: "not-code-like", normalized: value };

  const tokens = value
    .split(/[^A-Za-z0-9_$]+/)
    .map((token) => token.trim())
    .filter((token) => token.length >= 2);
  if (tokens.length < 4) return { passed: false, reason: "too-few-code-terms", normalized: value };

  const source = String(concept.codeExample || "").trim();
  const copiedSource = source && value.replace(/\s+/g, " ") === source.replace(/\s+/g, " ");
  if (copiedSource) return { passed: false, reason: "copied-example", normalized: value };

  return { passed: true, reason: "ok", normalized: value };
}

export function hasScratchMasteryProof(score) {
  return Boolean(score && score.scratchProof && score.scratchProof.passed === true);
}

export function isExamCriticalConcept(concept = {}) {
  if (!concept || typeof concept !== "object") return false;
  if (concept.examCritical === true || concept.svcollegeCritical === true) return true;
  return getDifficulty(concept) >= 7 || conceptRequiresCodeProof(concept);
}

export function spacedReviewPriority({ score = {}, concept = {}, conceptKey = "", now = Date.now() } = {}) {
  if (isScoreMastered(score)) return 0;
  const level = Math.max(1, Math.min(7, Number(score.level) || 1));
  const attempts = Math.max(0, Number(score.attempts) || 0);
  const correct = Math.max(0, Number(score.correct) || 0);
  const weakReports = Math.max(0, Number(score.weakReports) || 0);
  const accuracyPct = attempts ? Math.round((correct / attempts) * 100) : 0;
  const dueAt = Number(score.srsState && score.srsState.due);
  const overdueDays = Number.isFinite(dueAt)
    ? Math.max(0, Math.floor((now - dueAt) / 86_400_000))
    : 0;
  const dueBoost = Number.isFinite(dueAt) && dueAt <= now ? 28 + Math.min(21, overdueDays * 3) : 0;
  const weakBoost =
    weakReports * 12 +
    (level <= 2 ? 18 : 0) +
    (attempts >= 3 && accuracyPct < 55 ? 16 : 0) +
    (score.masteryGatePending ? 14 : 0);
  const criticalBoost = isExamCriticalConcept(concept) ? 20 : 0;
  const priority = dueBoost + weakBoost + criticalBoost + (8 - level) + Math.min(10, getDifficulty(concept));
  return Math.max(0, Math.round(priority));
}

export function buildSpacedReviewSchedule(items = [], { now = Date.now(), limit = 20 } = {}) {
  return (Array.isArray(items) ? items : [])
    .map((item) => ({
      ...item,
      priority: spacedReviewPriority({
        score: item.score || {},
        concept: item.concept || {},
        conceptKey: item.conceptKey || "",
        now,
      }),
      examCritical: isExamCriticalConcept(item.concept || {}),
    }))
    .filter((item) => item.priority > 0)
    .sort((a, b) => {
      if (b.priority !== a.priority) return b.priority - a.priority;
      if (a.examCritical !== b.examCritical) return a.examCritical ? -1 : 1;
      return String(a.conceptKey || "").localeCompare(String(b.conceptKey || ""));
    })
    .slice(0, limit);
}

export function nextNeedFor(concept, score) {
  if (!score || isScoreMastered(score)) return null;
  if (!score.passedMC) return "mc";
  if (needsCodeFill(concept) && !score.passedFill) return "fill";
  return null;
}

export function masteryPercent(score) {
  const level = Math.max(1, Math.min(7, Number(score && score.level) || 1));
  if (isScoreMastered(score)) return 100;

  const attempts = Math.max(0, Number(score && score.attempts) || 0);
  const correct = Math.max(0, Number(score && score.correct) || 0);
  const accuracy = attempts > 0 ? Math.min(1, correct / attempts) : 0;
  const quizBonus = (score && score.passedMC ? 3 : 0) + (score && score.passedFill ? 3 : 0);
  const streakBonus = Math.min(5, Math.max(0, Number(score && score.correctRunCount) || 0)) * 2;
  const levelPart = ((level - 1) / 6) * 84;
  const percent = Math.round(levelPart + accuracy * 10 + quizBonus + streakBonus);

  return Math.max(1, Math.min(99, percent || 1));
}
