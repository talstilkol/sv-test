// tests/rng.test.js — RNG determinism + edge cases
// (describe/it/expect are global thanks to vitest.config { globals: true })
const RNG = require("../lib/rng.js");

describe("RNG — Deterministic Seeded PRNG", () => {
  describe("determinism", () => {
    it("same seed → same sequence (next)", () => {
      const a = RNG.create(42);
      const b = RNG.create(42);
      const seqA = [a.next(), a.next(), a.next(), a.next(), a.next()];
      const seqB = [b.next(), b.next(), b.next(), b.next(), b.next()];
      expect(seqA).toEqual(seqB);
    });

    it("same seed → same int(n)", () => {
      const a = RNG.create(123);
      const b = RNG.create(123);
      expect(a.int(10)).toBe(b.int(10));
      expect(a.int(100)).toBe(b.int(100));
    });

    it("different seeds → different sequences", () => {
      const a = RNG.create(1);
      const b = RNG.create(2);
      // Probabilistically different — generate 10 numbers from each
      const aSeq = Array.from({ length: 10 }, () => a.next());
      const bSeq = Array.from({ length: 10 }, () => b.next());
      expect(aSeq).not.toEqual(bSeq);
    });
  });

  describe("API surface", () => {
    it("next() returns [0,1)", () => {
      const r = RNG.create(7);
      for (let i = 0; i < 100; i++) {
        const v = r.next();
        expect(v).toBeGreaterThanOrEqual(0);
        expect(v).toBeLessThan(1);
      }
    });

    it("int(n) returns 0..n-1", () => {
      const r = RNG.create(99);
      for (let i = 0; i < 100; i++) {
        const v = r.int(10);
        expect(v).toBeGreaterThanOrEqual(0);
        expect(v).toBeLessThan(10);
        expect(Number.isInteger(v)).toBe(true);
      }
    });

    it("pick(arr) returns element of arr", () => {
      const r = RNG.create(33);
      const arr = ["a", "b", "c", "d"];
      for (let i = 0; i < 50; i++) {
        const v = r.pick(arr);
        expect(arr).toContain(v);
      }
    });

    it("shuffle returns array of same length with same elements", () => {
      const r = RNG.create(55);
      const arr = [1, 2, 3, 4, 5];
      const sh = r.shuffle(arr);
      expect(sh.length).toBe(5);
      expect(sh.sort()).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe("edge cases", () => {
    it("pick([]) returns undefined", () => {
      const r = RNG.create(1);
      expect(r.pick([])).toBeUndefined();
    });

    it("int(0) returns 0", () => {
      const r = RNG.create(1);
      expect(r.int(0)).toBe(0);
    });

    it("int(-5) returns 0", () => {
      const r = RNG.create(1);
      expect(r.int(-5)).toBe(0);
    });

    it("shuffle([]) returns []", () => {
      const r = RNG.create(1);
      expect(r.shuffle([])).toEqual([]);
    });
  });

  describe("seedFromString", () => {
    it("hash(s) is deterministic", () => {
      const a = RNG.seedFromString("hello");
      const b = RNG.seedFromString("hello");
      expect(a).toBe(b);
    });

    it("different strings → different seeds", () => {
      expect(RNG.seedFromString("a")).not.toBe(RNG.seedFromString("b"));
    });
  });
});
