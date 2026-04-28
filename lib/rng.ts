export type SeedInput = number | string | null | undefined;

export interface RngInstance {
  readonly seed: number;
  next(): number;
  int(n: number): number;
  pick<T>(arr: readonly T[]): T | undefined;
  shuffle<T>(arr: readonly T[]): T[];
}

function mulberry32(seed: number): () => number {
  let s = seed >>> 0;
  return function next(): number {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function seedFromString(value: unknown): number {
  let h = 0x811c9dc5 >>> 0;
  const s = String(value == null ? "" : value);
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

function normalizeSeed(seed: SeedInput): number {
  if (typeof seed === "string") return seedFromString(seed);
  if (typeof seed === "number" && Number.isFinite(seed)) return seed >>> 0;
  return seedFromString("lumenportal:default-seed");
}

export function create(seed: SeedInput): RngInstance {
  const seedU32 = normalizeSeed(seed);
  const next = mulberry32(seedU32);
  return {
    seed: seedU32,
    next,
    int(n: number): number {
      if (typeof n !== "number" || n <= 0) return 0;
      return Math.floor(next() * n);
    },
    pick<T>(arr: readonly T[]): T | undefined {
      if (!Array.isArray(arr) || arr.length === 0) return undefined;
      return arr[Math.floor(next() * arr.length)];
    },
    shuffle<T>(arr: readonly T[]): T[] {
      const a = Array.isArray(arr) ? arr.slice() : [];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(next() * (i + 1));
        const tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
      }
      return a;
    },
  };
}

let defaultRng = create("lumenportal:default");

export function reseed(seed: SeedInput): number {
  defaultRng = create(seed);
  return defaultRng.seed;
}

export function next(): number {
  return defaultRng.next();
}

export function int(n: number): number {
  return defaultRng.int(n);
}

export function pick<T>(arr: readonly T[]): T | undefined {
  return defaultRng.pick(arr);
}

export function shuffle<T>(arr: readonly T[]): T[] {
  return defaultRng.shuffle(arr);
}

export function getUserId(): string {
  try {
    if (typeof localStorage === "undefined") return "anonymous";
    const key = "lumenportal:userId:v1";
    let id = localStorage.getItem(key);
    if (!id) {
      id = `user-${seedFromString(key).toString(16)}`;
      localStorage.setItem(key, id);
    }
    return id;
  } catch (_) {
    return "anonymous";
  }
}

export const RNG = Object.freeze({
  create,
  reseed,
  next,
  int,
  pick,
  shuffle,
  seedFromString,
  getUserId,
});

export default RNG;
