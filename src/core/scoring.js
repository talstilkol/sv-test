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
