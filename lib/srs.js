// lib/srs.js
// Spaced Repetition Scheduler — SuperMemo SM-2 (Anki-compatible variant).
//
// Public API (browser + Node):
//   SRS.createState()                      → fresh state w/ defaults
//   SRS.update(state, correct, difficulty) → mutated state with new {ease, interval, due, ...}
//   SRS.isDue(state[, now])                → true if due ≤ now
//   SRS.daysUntilDue(state[, now])         → integer days (negative = overdue)
//   SRS.gradeFor(correct, difficulty)      → SM-2 grade 0..5 (used internally)
//
// State schema (matches the spec in COORDINATION.md → A4):
//   {
//     ease:           number,   // 1.3 .. ~2.5+, default 2.5
//     interval:       number,   // days until next review
//     due:            number,   // unix-ms timestamp of next due
//     repetitions:    integer,  // consecutive correct streak (resets on lapse)
//     lapses:         integer,  // total times this concept was forgotten
//     lastReviewed:   number|null
//   }
//
// Grading: we map (correct, difficulty 1..10) → SM-2 grade 0..5.
//   correct=true,  difficulty 1-3   → 5 (easy)
//   correct=true,  difficulty 4-6   → 4 (good)
//   correct=true,  difficulty 7-10  → 3 (hard but passed)
//   correct=false, difficulty <= 6  → 1 (forgot)
//   correct=false, difficulty >= 7  → 0 (blackout)
//
// Long-term hardening:
//   * interval is capped at MAX_INTERVAL_DAYS (1 year) so a long correct streak
//     can't push reviews 50 years out.
//   * ease is clamped to [MIN_EASE, MAX_EASE] every update.
//   * update() defensively recreates state when given null/undefined or a
//     malformed object (keeps callers free of pre-flight checks).
"use strict";

(function (root) {
  const DAY_MS = 24 * 60 * 60 * 1000;
  const MIN_EASE = 1.3;
  const MAX_EASE = 4.0;
  const DEFAULT_EASE = 2.5;
  const MAX_INTERVAL_DAYS = 365;

  function nowMs() {
    return Date.now();
  }

  function createState() {
    const t = nowMs();
    return {
      ease: DEFAULT_EASE,
      interval: 0,
      due: t, // due immediately on first encounter
      repetitions: 0,
      lapses: 0,
      lastReviewed: null,
    };
  }

  function clamp(v, lo, hi) {
    return Math.max(lo, Math.min(hi, v));
  }

  function gradeFor(correct, difficulty) {
    const d = clamp(typeof difficulty === "number" ? difficulty : 5, 1, 10);
    if (correct) {
      if (d <= 3) return 5;
      if (d <= 6) return 4;
      return 3;
    }
    return d >= 7 ? 0 : 1;
  }

  // SM-2 ease adjustment formula (SuperMemo): ef' = ef + (0.1 - (5-q)*(0.08 + (5-q)*0.02))
  function adjustEase(ease, grade) {
    const q = grade;
    const next = ease + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
    return clamp(next, MIN_EASE, MAX_EASE);
  }

  function ensureFields(state) {
    if (!state || typeof state !== "object") return createState();
    if (typeof state.ease !== "number") state.ease = DEFAULT_EASE;
    if (typeof state.interval !== "number") state.interval = 0;
    if (typeof state.repetitions !== "number") state.repetitions = 0;
    if (typeof state.lapses !== "number") state.lapses = 0;
    if (typeof state.due !== "number") state.due = nowMs();
    if (state.lastReviewed === undefined) state.lastReviewed = null;
    return state;
  }

  // Update a state in-place AND return it (callers can ignore return).
  // Accepts null/undefined/malformed `state` — returns a fresh one in that case.
  function update(state, correct, difficulty, now) {
    const t = typeof now === "number" ? now : nowMs();
    state = ensureFields(state);

    const grade = gradeFor(correct, difficulty);

    if (grade >= 3) {
      // Pass — schedule longer interval (capped at MAX_INTERVAL_DAYS).
      let next;
      if (state.repetitions === 0) next = 1;
      else if (state.repetitions === 1) next = 6;
      else next = Math.round(state.interval * state.ease);
      state.interval = clamp(Math.max(1, next), 1, MAX_INTERVAL_DAYS);
      state.repetitions = state.repetitions + 1;
      state.ease = adjustEase(state.ease, grade);
    } else {
      // Fail — reset to 1 day, count lapse, ease drops.
      state.repetitions = 0;
      state.interval = 1;
      state.lapses = state.lapses + 1;
      state.ease = adjustEase(state.ease, grade);
    }

    state.due = t + state.interval * DAY_MS;
    state.lastReviewed = t;
    return state;
  }

  // Urgency: a positive number means overdue, negative means due in N days.
  // Useful for ranking due concepts in pickWeightedConcept ("how overdue is this?").
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
    createState: createState,
    update: update,
    isDue: isDue,
    daysUntilDue: daysUntilDue,
    urgency: urgency,
    gradeFor: gradeFor,
    DAY_MS: DAY_MS,
    MIN_EASE: MIN_EASE,
    MAX_EASE: MAX_EASE,
    DEFAULT_EASE: DEFAULT_EASE,
    MAX_INTERVAL_DAYS: MAX_INTERVAL_DAYS,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
  if (root) {
    root.SRS = api;
  }
})(
  typeof window !== "undefined"
    ? window
    : typeof globalThis !== "undefined"
      ? globalThis
      : null,
);
