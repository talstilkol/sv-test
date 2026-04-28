describe("Streak core", () => {
  let streak;

  beforeAll(async () => {
    streak = await import("../src/core/streak.js");
  });

  const jan10 = Date.parse("2026-01-10T09:00:00.000Z");

  it("starts a streak on the first study day", () => {
    const next = streak.advanceStreak({}, jan10);

    expect(next.count).toBe(1);
    expect(next.lastDate).toBe("2026-01-10");
    expect(next.usedFreeze).toBe(false);
  });

  it("increments when yesterday was studied", () => {
    const next = streak.advanceStreak({ count: 4, lastDate: "2026-01-09" }, jan10);

    expect(next.count).toBe(5);
    expect(next.lastDate).toBe("2026-01-10");
    expect(next.usedFreeze).toBe(false);
  });

  it("uses one monthly freeze when exactly one day was missed", () => {
    const next = streak.advanceStreak({ count: 4, lastDate: "2026-01-08" }, jan10);

    expect(next.count).toBe(5);
    expect(next.lastDate).toBe("2026-01-10");
    expect(next.freezeMonth).toBe("2026-01");
    expect(next.lastFreezeCoveredDate).toBe("2026-01-09");
    expect(next.usedFreeze).toBe(true);
  });

  it("does not use a second freeze in the same month", () => {
    const next = streak.advanceStreak({
      count: 9,
      lastDate: "2026-01-08",
      freezeMonth: "2026-01",
    }, jan10);

    expect(next.count).toBe(1);
    expect(next.lastDate).toBe("2026-01-10");
    expect(next.usedFreeze).toBe(false);
  });

  it("resets after a multi-day gap", () => {
    const next = streak.advanceStreak({ count: 12, lastDate: "2026-01-07" }, jan10);

    expect(next.count).toBe(1);
    expect(next.usedFreeze).toBe(false);
  });
});
