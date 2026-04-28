export interface SrsState {
  stability: number;
  difficulty: number;
  reps: number;
  lapses: number;
  due: number;
  lastReviewed: number | null;
  interval?: number;
  repetitions?: number;
}

export const DAY_MS = 24 * 60 * 60 * 1000;
export const MAX_INTERVAL_DAYS = 365;
export const MIN_DIFFICULTY = 0.1;
export const MAX_DIFFICULTY = 1.0;

function nowMs(): number {
  return Date.now();
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}

function retrievability(stability: number, elapsedDays: number): number {
  if (!stability || stability <= 0 || elapsedDays <= 0) return 1.0;
  return clamp(Math.pow(0.9, elapsedDays / stability), 0.01, 1.0);
}

function initialStability(difficulty: number): number {
  return Math.max(1, Math.round(6 - 4 * difficulty));
}

function stabilityAfterPass(stability: number, difficulty: number, retrievable: number): number {
  const dFactor = 1 + 0.2 * (1 - difficulty);
  const rFactor = 1 + 0.5 * Math.max(0, 1 - retrievable);
  const grown = stability * dFactor * rFactor;
  return clamp(Math.max(stability + 1, grown), 1, MAX_INTERVAL_DAYS);
}

function stabilityAfterFail(difficulty: number, retrievable: number): number {
  const nextStability = 0.28 * Math.pow(difficulty * 10, -0.28) * (Math.exp(retrievable * 0.9) - 1);
  return clamp(nextStability, 0.5, 2.0);
}

export function createState(): SrsState {
  return {
    stability: 1.0,
    difficulty: 0.3,
    reps: 0,
    lapses: 0,
    due: nowMs(),
    lastReviewed: null,
  };
}

function ensureFields(state: Partial<SrsState> | null | undefined): SrsState {
  if (!state || typeof state !== "object") return createState();
  const s = state as SrsState;
  if (typeof s.stability !== "number") s.stability = s.interval || 1.0;
  if (typeof s.difficulty !== "number") s.difficulty = 0.3;
  if (typeof s.reps !== "number") s.reps = s.repetitions || 0;
  if (typeof s.lapses !== "number") s.lapses = 0;
  if (typeof s.due !== "number") s.due = nowMs();
  if (s.lastReviewed === undefined) s.lastReviewed = null;
  return s;
}

export function update(state: Partial<SrsState> | null | undefined, correct: boolean, difficulty?: number, now?: number): SrsState {
  const t = typeof now === "number" ? now : nowMs();
  const s = ensureFields(state);
  const d = clamp((typeof difficulty === "number" ? difficulty : 5) / 10, MIN_DIFFICULTY, MAX_DIFFICULTY);
  const elapsedDays = s.lastReviewed ? (t - s.lastReviewed) / DAY_MS : 0;
  const r = s.reps === 0 ? 1.0 : retrievability(s.stability, elapsedDays);

  s.difficulty = d;

  if (correct) {
    s.stability = s.reps === 0 ? initialStability(d) : stabilityAfterPass(s.stability, d, r);
    s.reps += 1;
  } else {
    s.stability = stabilityAfterFail(d, r);
    s.lapses += 1;
    s.reps = 0;
  }

  const intervalDays = clamp(Math.round(s.stability), 1, MAX_INTERVAL_DAYS);
  s.due = t + intervalDays * DAY_MS;
  s.lastReviewed = t;
  return s;
}

export function urgency(state: Partial<SrsState> | null | undefined, now?: number): number {
  if (!state || typeof state.due !== "number") return 0;
  const t = typeof now === "number" ? now : nowMs();
  return (t - state.due) / DAY_MS;
}

export function isDue(state: Partial<SrsState> | null | undefined, now?: number): boolean {
  if (!state || typeof state.due !== "number") return true;
  const t = typeof now === "number" ? now : nowMs();
  return state.due <= t;
}

export function daysUntilDue(state: Partial<SrsState> | null | undefined, now?: number): number {
  if (!state || typeof state.due !== "number") return 0;
  const t = typeof now === "number" ? now : nowMs();
  return Math.round((state.due - t) / DAY_MS);
}

export const SRS = Object.freeze({
  createState,
  update,
  isDue,
  daysUntilDue,
  urgency,
  DAY_MS,
  MAX_INTERVAL_DAYS,
  MIN_DIFFICULTY,
  MAX_DIFFICULTY,
});

export default SRS;
