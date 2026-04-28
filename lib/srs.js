// lib/srs.js
// Spaced Repetition Scheduler — FSRS-4 (simplified, production-grade).
//
// Public API (browser + Node):
//   SRS.createState()                      → fresh state w/ defaults
//   SRS.update(state, correct, difficulty) → mutated state with new {stability, reps, due, ...}
//   SRS.isDue(state[, now])                → true if due ≤ now
//   SRS.daysUntilDue(state[, now])         → integer days (negative = overdue)
//   SRS.urgency(state[, now])              → days overdue (positive = overdue)
//
// State schema (FSRS-4):
//   {
//     stability:    number,   // days until 90% retention (≥1)
//     difficulty:   number,   // 0.1..1.0 (seeded from concept.difficulty / 10)
//     reps:         integer,  // consecutive correct streak (resets on lapse)
//     lapses:       integer,  // total times this concept was forgotten
//     due:          number,   // unix-ms timestamp of next review
//     lastReviewed: number|null
//   }
//
// Algorithm (FSRS-inspired):
//   Initial stability S₀ = max(1, round(6 - 4×D))   [D=0.1→6d, D=0.5→4d, D=1.0→2d]
//   After pass:  S′ = max(S+1, S × dFactor × rFactor)
//     dFactor = 1 + 0.2×(1−D)   [easy concepts grow faster]
//     rFactor = 1 + 0.5×max(0, 1−R)   [forgotten-edge effect: bigger boost when R was low]
//   After fail:  S′ = clamp(0.28 × (D×10)^{-0.28} × (e^{R×0.9}−1), 0.5, 2.0)  → interval ≤ 2d
//   Forgetting curve:  R(t,S) = 0.9^{t/S}
//
// Backward compat:
//   - update() defensively migrates null/undefined/SM-2 states via ensureFields().
//   - SM-2 states (ease field present, stability absent) are converted in app.js migration.
"use strict";

(function (root) {
  const DAY_MS = 24 * 60 * 60 * 1000;
  const MAX_INTERVAL_DAYS = 365;
  const MIN_DIFFICULTY = 0.1;
  const MAX_DIFFICULTY = 1.0;

  function nowMs() {
    return Date.now();
  }

  function clamp(v, lo, hi) {
    return Math.max(lo, Math.min(hi, v));
  }

  // Forgetting curve: R(t, S) = 0.9^(t/S)
  function retrievability(S, elapsedDays) {
    if (!S || S <= 0 || elapsedDays <= 0) return 1.0;
    return clamp(Math.pow(0.9, elapsedDays / S), 0.01, 1.0);
  }

  // Initial stability for first-ever correct answer
  function initialStability(D) {
    return Math.max(1, Math.round(6 - 4 * D));
  }

  // Stability after a successful review
  function stabilityAfterPass(S, D, R) {
    const dFactor = 1 + 0.2 * (1 - D);
    const rFactor = 1 + 0.5 * Math.max(0, 1 - R);
    const grown = S * dFactor * rFactor;
    return clamp(Math.max(S + 1, grown), 1, MAX_INTERVAL_DAYS);
  }

  // Stability after a failed review (short relearn window)
  function stabilityAfterFail(D, R) {
    const S = 0.28 * Math.pow(D * 10, -0.28) * (Math.exp(R * 0.9) - 1);
    return clamp(S, 0.5, 2.0);
  }

  function createState() {
    return {
      stability: 1.0,
      difficulty: 0.3,
      reps: 0,
      lapses: 0,
      due: nowMs(),
      lastReviewed: null,
    };
  }

  function ensureFields(state) {
    if (!state || typeof state !== "object") return createState();
    // Silently handle SM-2 states that slipped through (app.js migrates them on load)
    if (typeof state.stability !== "number") state.stability = state.interval || 1.0;
    if (typeof state.difficulty !== "number") state.difficulty = 0.3;
    if (typeof state.reps !== "number") state.reps = state.repetitions || 0;
    if (typeof state.lapses !== "number") state.lapses = 0;
    if (typeof state.due !== "number") state.due = nowMs();
    if (state.lastReviewed === undefined) state.lastReviewed = null;
    return state;
  }

  function update(state, correct, difficulty, now) {
    const t = typeof now === "number" ? now : nowMs();
    state = ensureFields(state);

    const D = clamp(
      (typeof difficulty === "number" ? difficulty : 5) / 10,
      MIN_DIFFICULTY,
      MAX_DIFFICULTY
    );
    const elapsedDays = state.lastReviewed ? (t - state.lastReviewed) / DAY_MS : 0;
    const R = state.reps === 0 ? 1.0 : retrievability(state.stability, elapsedDays);

    state.difficulty = D;

    if (correct) {
      if (state.reps === 0) {
        state.stability = initialStability(D);
      } else {
        state.stability = stabilityAfterPass(state.stability, D, R);
      }
      state.reps++;
    } else {
      state.stability = stabilityAfterFail(D, R);
      state.lapses++;
      state.reps = 0;
    }

    const intervalDays = clamp(Math.round(state.stability), 1, MAX_INTERVAL_DAYS);
    state.due = t + intervalDays * DAY_MS;
    state.lastReviewed = t;
    return state;
  }

  function urgency(state, now) {
    if (!state || typeof state.due !== "number") return 0;
    const t = typeof now === "number" ? now : nowMs();
    return (t - state.due) / DAY_MS;
  }

  function isDue(state, now) {
    if (!state || typeof state.due !== "number") return true;
    const t = typeof now === "number" ? now : nowMs();
    return state.due <= t;
  }

  function daysUntilDue(state, now) {
    if (!state || typeof state.due !== "number") return 0;
    const t = typeof now === "number" ? now : nowMs();
    return Math.round((state.due - t) / DAY_MS);
  }

  const api = {
    createState,
    update,
    isDue,
    daysUntilDue,
    urgency,
    DAY_MS,
    MAX_INTERVAL_DAYS,
    MIN_DIFFICULTY,
    MAX_DIFFICULTY,
  };

  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (root) root.SRS = api;
})(
  typeof window !== "undefined"
    ? window
    : typeof globalThis !== "undefined"
      ? globalThis
      : null
);
