// lib/rng.js
// Deterministic seeded PRNG for LumenPortal — replaces Math.random across app.
//
// Algorithm: mulberry32 (10-line 32-bit PRNG, BSD-style, period 2^32, fast).
//
// Public API (browser + Node):
//   RNG.next()          → float in [0, 1)
//   RNG.int(n)          → integer in [0, n-1]
//   RNG.pick(arr)       → uniform pick from arr
//   RNG.shuffle(arr)    → Fisher-Yates copy (arr unchanged)
//   RNG.create(seed)    → an isolated rng instance with same API + .seed
//   RNG.seedFromString  → 32-bit FNV-1a hash for string → numeric seed
//   RNG.getUserId()     → stable userId (uuid v4) persisted in localStorage
//
// Determinism: two RNG.create(seed) instances with the same seed produce the
// exact same sequence of next() values — guarantees reproducible questions
// for tests + the same study queue across reloads when seed is fixed.
//
// The default global rng (RNG.next/int/pick/shuffle) seeds itself once per page
// load from hash(userId + sessionStart + counter); pass an explicit seed via
// RNG.create() when reproducibility is required (e.g. unit tests, mock exam
// composition, or replay-debug).
"use strict";

(function (root) {
  // ---- core PRNG: mulberry32 ----
  function mulberry32(seed) {
    let s = seed >>> 0;
    return function next() {
      s = (s + 0x6d2b79f5) >>> 0;
      let t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // ---- 32-bit FNV-1a string hash → numeric seed ----
  function seedFromString(str) {
    let h = 0x811c9dc5 >>> 0;
    const s = String(str == null ? "" : str);
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 0x01000193) >>> 0;
    }
    return h >>> 0;
  }

  // ---- entropy bootstrap (used only for fallback id / fallback seed) ----
  // We deliberately avoid Math.random here so the project's Math.random budget
  // stays at zero outside data/lesson21.js. Mixing Date.now() + performance.now()
  // + a monotonically increasing counter is good enough for id/seed bootstrap.
  let _entropyCounter = 1;
  function entropy32() {
    let x =
      ((Date.now() & 0xffffffff) >>> 0) ^
      (((typeof performance !== "undefined" &&
        typeof performance.now === "function"
        ? performance.now() * 1000
        : 0) |
        0) >>>
        0) ^
      (_entropyCounter++ * 0x9e3779b1);
    // xorshift32 mix
    x ^= x << 13;
    x >>>= 0;
    x ^= x >>> 17;
    x ^= x << 5;
    return x >>> 0;
  }

  // ---- user id (uuid v4, persisted in localStorage) ----
  function uuid4() {
    if (
      typeof crypto !== "undefined" &&
      typeof crypto.getRandomValues === "function"
    ) {
      const buf = new Uint8Array(16);
      crypto.getRandomValues(buf);
      buf[6] = (buf[6] & 0x0f) | 0x40; // version 4
      buf[8] = (buf[8] & 0x3f) | 0x80; // variant
      const hex = Array.from(buf, function (b) {
        return b.toString(16).padStart(2, "0");
      }).join("");
      return (
        hex.slice(0, 8) +
        "-" +
        hex.slice(8, 12) +
        "-" +
        hex.slice(12, 16) +
        "-" +
        hex.slice(16, 20) +
        "-" +
        hex.slice(20)
      );
    }
    // Fallback: build 16 bytes from entropy32() chunks (no Math.random).
    const bytes = new Array(16);
    for (let i = 0; i < 16; i += 4) {
      const e = entropy32();
      bytes[i] = e & 0xff;
      bytes[i + 1] = (e >>> 8) & 0xff;
      bytes[i + 2] = (e >>> 16) & 0xff;
      bytes[i + 3] = (e >>> 24) & 0xff;
    }
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const hex = bytes
      .map(function (b) {
        return b.toString(16).padStart(2, "0");
      })
      .join("");
    return (
      hex.slice(0, 8) +
      "-" +
      hex.slice(8, 12) +
      "-" +
      hex.slice(12, 16) +
      "-" +
      hex.slice(16, 20) +
      "-" +
      hex.slice(20)
    );
  }

  const USER_ID_KEY = "lumenportal:userId:v1";
  function getUserId() {
    try {
      if (typeof localStorage === "undefined") return "anonymous";
      let id = localStorage.getItem(USER_ID_KEY);
      if (!id) {
        id = uuid4();
        localStorage.setItem(USER_ID_KEY, id);
      }
      return id;
    } catch (_) {
      return "anonymous";
    }
  }

  // ---- per-instance rng factory ----
  function createInstance(seed) {
    if (typeof seed === "string") seed = seedFromString(seed);
    if (typeof seed !== "number" || !isFinite(seed)) {
      seed = entropy32();
    }
    const seedU32 = seed >>> 0;
    const next = mulberry32(seedU32);
    return {
      seed: seedU32,
      next: next,
      int: function (n) {
        if (typeof n !== "number" || n <= 0) return 0;
        return Math.floor(next() * n);
      },
      pick: function (arr) {
        if (!Array.isArray(arr) || arr.length === 0) return undefined;
        return arr[Math.floor(next() * arr.length)];
      },
      shuffle: function (arr) {
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

  // ---- default singleton: seeded once per page load ----
  // Seed = hash(userId + ":" + sessionStart + ":" + counter).
  // counter increments on every defaultRng re-seed (we re-seed once at boot).
  let _counter = 0;
  const _sessionStart =
    typeof Date !== "undefined" && typeof Date.now === "function"
      ? Date.now()
      : 0;

  function defaultSeedString() {
    return getUserId() + ":" + _sessionStart + ":" + _counter++;
  }

  // Mutable holder so RNG.reseed() can swap the underlying generator.
  let _default = createInstance(seedFromString(defaultSeedString()));

  // Re-seed the default singleton. Useful for:
  //   * mock exam — `RNG.reseed(examId)` to make the same exam reproducible
  //   * tests / replays — set a fixed seed before recording an interaction
  //   * privacy / "shuffle me" — pass `Date.now()` for fresh entropy
  function reseed(seed) {
    _default = createInstance(seed);
    api._defaultSeed = _default.seed;
    return _default.seed;
  }

  const api = {
    // delegated default rng (used when callers don't care about determinism)
    next: function () {
      return _default.next();
    },
    int: function (n) {
      return _default.int(n);
    },
    pick: function (arr) {
      return _default.pick(arr);
    },
    shuffle: function (arr) {
      return _default.shuffle(arr);
    },
    // factory + helpers
    create: createInstance,
    reseed: reseed,
    seedFromString: seedFromString,
    getUserId: getUserId,
    // diagnostics
    _defaultSeed: _default.seed,
    _sessionStart: _sessionStart,
  };

  // ---- export ----
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
  if (root) {
    root.RNG = api;
  }
})(
  typeof window !== "undefined"
    ? window
    : typeof globalThis !== "undefined"
      ? globalThis
      : null,
);
