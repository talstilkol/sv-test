// tests/srs.test.js — SRS (FSRS-4) stability + lapse handling
// (describe/it/expect are global thanks to vitest.config { globals: true })
const SRS = require("../lib/srs.js");

// Fixed baseline timestamp so tests are deterministic
const T0 = 1_700_000_000_000;

describe("SRS — FSRS-4 Spaced Repetition", () => {
  describe("createState", () => {
    it("creates a fresh FSRS-4 state", () => {
      const s = SRS.createState();
      expect(s.stability).toBeGreaterThanOrEqual(1);
      expect(s.difficulty).toBeGreaterThan(0);
      expect(s.reps).toBe(0);
      expect(s.lapses).toBe(0);
      expect(s.lastReviewed).toBeNull();
    });
  });

  describe("stability growth on correct answers", () => {
    it("first correct → reps=1, stability set, due in future", () => {
      const s = SRS.createState();
      const next = SRS.update(s, true, 5, T0);
      expect(next.reps).toBe(1);
      expect(next.stability).toBeGreaterThan(0);
      expect(SRS.isDue(next, T0)).toBe(false);
      expect(SRS.daysUntilDue(next, T0)).toBeGreaterThan(0);
    });

    it("second correct (after due date) → reps=2, stability grows", () => {
      let s = SRS.createState();
      s = SRS.update(s, true, 5, T0);
      const stab1 = s.stability;
      // Review one day after due date (typical FSRS scenario)
      const t1 = s.due + SRS.DAY_MS;
      s = SRS.update(s, true, 5, t1);
      expect(s.reps).toBe(2);
      expect(s.stability).toBeGreaterThan(stab1);
    });

    it("third correct → stability grows further, interval ≤ 365 days", () => {
      let s = SRS.createState();
      s = SRS.update(s, true, 5, T0);
      s = SRS.update(s, true, 5, s.due + SRS.DAY_MS);
      const stab2 = s.stability;
      s = SRS.update(s, true, 5, s.due + SRS.DAY_MS);
      expect(s.stability).toBeGreaterThan(stab2);
      expect(SRS.daysUntilDue(s, s.lastReviewed)).toBeLessThanOrEqual(365);
    });
  });

  describe("lapse on wrong answer", () => {
    it("wrong → resets reps to 0, increments lapses, due ≤ 2 days", () => {
      let s = SRS.createState();
      s = SRS.update(s, true, 5, T0);
      s = SRS.update(s, true, 5, s.due + SRS.DAY_MS);
      const beforeLapses = s.lapses;
      s = SRS.update(s, false, 5, s.due + SRS.DAY_MS);
      expect(s.reps).toBe(0);
      expect(s.lapses).toBe(beforeLapses + 1);
      expect(SRS.daysUntilDue(s, s.lastReviewed)).toBeLessThanOrEqual(2);
    });

    it("difficulty stays in [MIN_DIFFICULTY, MAX_DIFFICULTY] after many failures", () => {
      let s = SRS.createState();
      for (let i = 0; i < 20; i++) {
        s = SRS.update(s, false, 9, T0 + i * SRS.DAY_MS);
      }
      expect(s.difficulty).toBeGreaterThanOrEqual(SRS.MIN_DIFFICULTY);
      expect(s.difficulty).toBeLessThanOrEqual(SRS.MAX_DIFFICULTY);
    });
  });

  describe("isDue / daysUntilDue", () => {
    it("isDue() true for fresh state (due immediately)", () => {
      const s = SRS.createState();
      expect(SRS.isDue(s)).toBe(true);
    });

    it("after first correct review, not immediately due", () => {
      let s = SRS.createState();
      s = SRS.update(s, true, 5, T0);
      expect(SRS.isDue(s, T0)).toBe(false);
      expect(SRS.daysUntilDue(s, T0)).toBeGreaterThan(0);
    });
  });
});
