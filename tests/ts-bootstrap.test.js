describe("TypeScript bootstrap modules", () => {
  it("keeps rng.ts deterministic and API-compatible", async () => {
    const rng = await import("../lib/rng.ts");
    const a = rng.create("lesson-22::useState");
    const b = rng.create("lesson-22::useState");

    expect([a.next(), a.next(), a.int(10)]).toEqual([b.next(), b.next(), b.int(10)]);
    expect(rng.seedFromString("useState")).toBe(rng.seedFromString("useState"));
  });

  it("keeps srs.ts scheduling behavior deterministic when now is provided", async () => {
    const srs = await import("../lib/srs.ts");
    const t0 = 1_700_000_000_000;
    const state = srs.update(srs.createState(), true, 5, t0);

    expect(state.reps).toBe(1);
    expect(srs.isDue(state, t0)).toBe(false);
    expect(srs.daysUntilDue(state, t0)).toBeGreaterThan(0);
  });
});
