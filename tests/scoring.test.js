// tests/scoring.test.js — applyAnswer logic + V button rules + difficulty.
// We replicate the pure logic of correctNeededForV / canMarkV from app.js
// (since app.js is browser-bound, we duplicate the rules into a test-only module).
// (describe/it/expect are global thanks to vitest.config { globals: true })

// === Pure logic from app.js (mirrored for testability) ===
function correctNeededForV(difficulty) {
  if (difficulty >= 8) return Infinity; // hard concepts: never V
  if (difficulty <= 2) return 1;
  if (difficulty <= 4) return 2;
  if (difficulty <= 6) return 3;
  return 5; // difficulty 7
}

function canMarkV(score, concept) {
  if (score.markedKnown) return false;
  if (score.level >= 7) return false;
  const need = correctNeededForV(concept.difficulty || 5);
  if (!isFinite(need)) return false;
  return score.correctRunCount >= need;
}

// 5 mastery states logic (mirrored)
function getMasteryState(sc) {
  if (sc.attempts === 0) return "new";
  if (sc.level <= 3) return "learning";
  if (sc.srsState && sc.srsState.due < Date.now() && sc.level >= 6)
    return "at-risk";
  if (sc.level <= 5) return "review";
  return "mastered";
}

describe("Scoring — V Button Rules (correctNeededForV)", () => {
  it("difficulty 1 → 1 correct needed", () => {
    expect(correctNeededForV(1)).toBe(1);
  });

  it("difficulty 2 → 1 correct needed", () => {
    expect(correctNeededForV(2)).toBe(1);
  });

  it("difficulty 3-4 → 2 correct needed", () => {
    expect(correctNeededForV(3)).toBe(2);
    expect(correctNeededForV(4)).toBe(2);
  });

  it("difficulty 5-6 → 3 correct needed", () => {
    expect(correctNeededForV(5)).toBe(3);
    expect(correctNeededForV(6)).toBe(3);
  });

  it("difficulty 7 → 5 correct needed", () => {
    expect(correctNeededForV(7)).toBe(5);
  });

  it("difficulty 8+ → Infinity (never V)", () => {
    expect(correctNeededForV(8)).toBe(Infinity);
    expect(correctNeededForV(9)).toBe(Infinity);
    expect(correctNeededForV(10)).toBe(Infinity);
  });
});

describe("canMarkV — eligibility rules", () => {
  const baseScore = {
    level: 1,
    passedMC: false,
    passedFill: false,
    attempts: 0,
    correct: 0,
    markedKnown: false,
    weakReports: 0,
    correctRunCount: 0,
  };

  it("difficulty=2, 1 correct → can mark V", () => {
    const sc = { ...baseScore, correctRunCount: 1 };
    const concept = { difficulty: 2 };
    expect(canMarkV(sc, concept)).toBe(true);
  });

  it("difficulty=5, 2 correct → cannot yet (needs 3)", () => {
    const sc = { ...baseScore, correctRunCount: 2 };
    const concept = { difficulty: 5 };
    expect(canMarkV(sc, concept)).toBe(false);
  });

  it("difficulty=5, 3 correct → can mark V", () => {
    const sc = { ...baseScore, correctRunCount: 3 };
    const concept = { difficulty: 5 };
    expect(canMarkV(sc, concept)).toBe(true);
  });

  it("difficulty=9, 100 correct → still cannot mark V (Infinity)", () => {
    const sc = { ...baseScore, correctRunCount: 100 };
    const concept = { difficulty: 9 };
    expect(canMarkV(sc, concept)).toBe(false);
  });

  it("already markedKnown → cannot mark V again", () => {
    const sc = { ...baseScore, correctRunCount: 10, markedKnown: true };
    const concept = { difficulty: 3 };
    expect(canMarkV(sc, concept)).toBe(false);
  });

  it("level >= 7 → cannot mark V (already master)", () => {
    const sc = { ...baseScore, correctRunCount: 10, level: 7 };
    const concept = { difficulty: 3 };
    expect(canMarkV(sc, concept)).toBe(false);
  });
});

describe("Mastery States — getMasteryState", () => {
  it("attempts=0 → new", () => {
    const sc = { attempts: 0, level: 1 };
    expect(getMasteryState(sc)).toBe("new");
  });

  it("level<=3 → learning", () => {
    expect(getMasteryState({ attempts: 1, level: 2 })).toBe("learning");
    expect(getMasteryState({ attempts: 1, level: 3 })).toBe("learning");
  });

  it("level 4-5 → review", () => {
    expect(getMasteryState({ attempts: 5, level: 4 })).toBe("review");
    expect(getMasteryState({ attempts: 5, level: 5 })).toBe("review");
  });

  it("level >=6 → mastered (without overdue SRS)", () => {
    expect(getMasteryState({ attempts: 10, level: 6 })).toBe("mastered");
    expect(getMasteryState({ attempts: 10, level: 7 })).toBe("mastered");
  });

  it("level>=6 + SRS overdue → at-risk", () => {
    const sc = {
      attempts: 10,
      level: 6,
      srsState: { due: Date.now() - 86400000 }, // 1 day ago
    };
    expect(getMasteryState(sc)).toBe("at-risk");
  });
});
