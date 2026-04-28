// tests/scoring.test.js — core scoring rules used by the legacy app shell.
// (describe/it/expect are global thanks to vitest.config { globals: true })

let correctNeededForV;
let canMarkV;
let getMasteryState;
let isSrsDue;
let needsCodeFill;
let nextNeedFor;
let masteryPercent;
let hasMasteryProof;
let isScoreMastered;
let questionChallengeLevel;
let masteryProofThreshold;
let qualifiesForMasteryProof;

beforeAll(async () => {
  ({
    correctNeededForV,
    canMarkV,
    getMasteryState,
    isSrsDue,
    needsCodeFill,
    nextNeedFor,
    masteryPercent,
    hasMasteryProof,
    isScoreMastered,
    questionChallengeLevel,
    masteryProofThreshold,
    qualifiesForMasteryProof,
  } = await import("../src/core/scoring.js"));
});

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

  it("level 4-6 → review when SRS is not overdue", () => {
    expect(getMasteryState({ attempts: 5, level: 4 })).toBe("review");
    expect(getMasteryState({ attempts: 5, level: 5 })).toBe("review");
    expect(getMasteryState({ attempts: 5, level: 6 })).toBe("review");
  });

  it("level 7 without proof → still review", () => {
    expect(getMasteryState({ attempts: 10, level: 7 })).toBe("review");
  });

  it("level 7 with deep proof → mastered", () => {
    expect(getMasteryState({ attempts: 10, level: 7, masteryProof: { passed: true } })).toBe("mastered");
  });

  it("level>=6 + SRS overdue → at-risk", () => {
    const now = 1_700_000_000_000;
    const sc = {
      attempts: 10,
      level: 6,
      srsState: { due: now - 86_400_000 },
    };
    expect(getMasteryState(sc, now)).toBe("at-risk");
  });
});

describe("SRS due helper", () => {
  it("returns true only when due time has passed", () => {
    const now = 1_700_000_000_000;

    expect(isSrsDue({ srsState: { due: now - 1 } }, now)).toBe(true);
    expect(isSrsDue({ srsState: { due: now + 1 } }, now)).toBe(false);
    expect(isSrsDue({})).toBe(false);
  });
});

describe("Concept next step helpers", () => {
  it("requires fill only when a concept has a code example", () => {
    expect(needsCodeFill({ codeExample: "const x = 1;" })).toBe(true);
    expect(needsCodeFill({})).toBe(false);
  });

  it("returns the next needed trainer stage", () => {
    const concept = { codeExample: "const x = 1;" };

    expect(nextNeedFor(concept, { level: 1, passedMC: false, passedFill: false })).toBe("mc");
    expect(nextNeedFor(concept, { level: 1, passedMC: true, passedFill: false })).toBe("fill");
    expect(nextNeedFor(concept, { level: 1, passedMC: true, passedFill: true })).toBe(null);
    expect(nextNeedFor(concept, { level: 7, passedMC: false, passedFill: false })).toBe("mc");
    expect(nextNeedFor(concept, { level: 7, passedMC: false, passedFill: false, masteryProof: { passed: true } })).toBe(null);
  });
});

describe("masteryPercent", () => {
  it("clamps new progress above zero and keeps unproven level 7 below 100", () => {
    expect(masteryPercent({ level: 1, attempts: 0, correct: 0 })).toBe(1);
    expect(masteryPercent({ level: 7, attempts: 1, correct: 1 })).toBeLessThan(100);
    expect(masteryPercent({ level: 7, attempts: 1, correct: 1, masteryProof: { passed: true } })).toBe(100);
    expect(masteryPercent({ level: 3, attempts: 4, correct: 3, passedMC: true, correctRunCount: 2 })).toBeGreaterThan(1);
  });
});

describe("Mastery proof gate", () => {
  it("requires explicit proof before a score is mastered", () => {
    expect(hasMasteryProof({ level: 7 })).toBe(false);
    expect(isScoreMastered({ level: 7 })).toBe(false);
    expect(isScoreMastered({ level: 7, masteryProof: { passed: true } })).toBe(true);
  });

  it("derives question challenge level deterministically", () => {
    expect(questionChallengeLevel({ level: 6 }, { difficulty: 2 }, "mc")).toBe(6);
    expect(questionChallengeLevel({}, { difficulty: 8, codeExample: "const x = 1;" }, "fill")).toBe(4);
    expect(questionChallengeLevel({}, { difficulty: 3 }, "mc")).toBe(2);
  });

  it("uses the hardest available level as the mastery threshold", () => {
    expect(masteryProofThreshold({ difficulty: 7 }, [2, 4, 5])).toBe(5);
    expect(masteryProofThreshold({ difficulty: 9 }, [])).toBe(6);
    expect(masteryProofThreshold({ difficulty: 3 }, [])).toBe(3);
  });

  it("qualifies only answers at the concept's highest available challenge", () => {
    const concept = { difficulty: 7 };
    expect(qualifiesForMasteryProof({
      question: { level: 5 },
      concept,
      availableLevels: [2, 5],
    })).toBe(true);
    expect(qualifiesForMasteryProof({
      question: { level: 4 },
      concept,
      availableLevels: [2, 5],
    })).toBe(false);
  });
});
