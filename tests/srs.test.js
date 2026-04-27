// tests/srs.test.js — SRS (SM-2) intervals + lapse handling
// (describe/it/expect are global thanks to vitest.config { globals: true })
const SRS = require("../lib/srs.js");

describe("SRS — Spaced Repetition (SM-2)", () => {
  describe("defaultState", () => {
    it("creates a fresh state", () => {
      const s = SRS.createState();
      expect(s.ease).toBeCloseTo(2.5, 1);
      expect(s.interval).toBe(0);
      expect(s.repetitions).toBe(0);
      expect(s.lapses).toBe(0);
      expect(s.lastReviewed).toBeNull();
    });
  });

  describe("interval growth on success", () => {
    it("first correct → interval=1 day", () => {
      const s = SRS.createState();
      const next = SRS.update(s, true, 5); // medium difficulty
      expect(next.interval).toBe(1);
      expect(next.repetitions).toBe(1);
    });

    it("second correct → interval=6 days", () => {
      let s = SRS.createState();
      s = SRS.update(s, true, 5);
      s = SRS.update(s, true, 5);
      expect(s.interval).toBe(6);
      expect(s.repetitions).toBe(2);
    });

    it("third correct → interval grows by ease factor", () => {
      let s = SRS.createState();
      s = SRS.update(s, true, 5);
      s = SRS.update(s, true, 5);
      const before = s.interval;
      s = SRS.update(s, true, 5);
      // interval = prev * ease (~2.5) — should be ≥ 14, ≤ 365
      expect(s.interval).toBeGreaterThan(before);
      expect(s.interval).toBeLessThanOrEqual(365);
    });
  });

  describe("lapse on wrong answer", () => {
    it("wrong → resets interval to 1, increments lapses", () => {
      let s = SRS.createState();
      s = SRS.update(s, true, 5);
      s = SRS.update(s, true, 5);
      // Now interval = 6, repetitions = 2
      const beforeLapses = s.lapses;
      s = SRS.update(s, false, 5);
      expect(s.interval).toBe(1);
      expect(s.lapses).toBe(beforeLapses + 1);
      expect(s.repetitions).toBe(0);
    });

    it("ease decreases on lapse but not below MIN_EASE (1.3)", () => {
      let s = SRS.createState();
      // Force many lapses to drive ease toward MIN
      for (let i = 0; i < 20; i++) {
        s = SRS.update(s, false, 9); // hard concept, hard fail
      }
      expect(s.ease).toBeGreaterThanOrEqual(SRS.MIN_EASE);
    });
  });

  describe("isDue / daysUntilDue", () => {
    it("isDue() true when due ≤ now", () => {
      const s = SRS.createState();
      // defaultState has due = now → should be due immediately
      expect(SRS.isDue(s)).toBe(true);
    });

    it("after first review with correct, not immediately due", () => {
      let s = SRS.createState();
      s = SRS.update(s, true, 5);
      // Should be due in ~1 day, not now
      expect(SRS.isDue(s)).toBe(false);
      const days = SRS.daysUntilDue(s);
      expect(days).toBeGreaterThan(0);
    });
  });
});
