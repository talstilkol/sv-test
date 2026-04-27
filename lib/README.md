# `lib/` — Track A foundation libraries

Two tiny, dependency-free libraries shared by the browser app and the Node-side
scripts. Both expose **the same API in both runtimes** (browser globals
`window.RNG` / `window.SRS`, plus Node `require()` exports).

| File | Purpose | Runtime |
|---|---|---|
| `lib/rng.js` | Seeded PRNG (mulberry32). Replaces every `Math.random` outside `data/lesson21.js`. | browser + Node |
| `lib/srs.js` | Spaced-repetition scheduler (SuperMemo SM-2). Drives the `srsState` field on every concept score. | browser + Node |

---

## `lib/rng.js`

```js
// browser
const r = window.RNG;          // singleton seeded once per page load
r.next();                       // float in [0, 1)
r.int(10);                      // integer in [0, 9]
r.pick(['a','b','c']);          // uniform pick
r.shuffle([1,2,3,4]);           // returns a fresh shuffled COPY (input unchanged)

const seeded = window.RNG.create('mock-exam-2026-04-27');
seeded.next();                  // deterministic — same string → same sequence

window.RNG.reseed(42);          // re-seed the *default* singleton (e.g. for tests)
```

```js
// Node
const RNG = require('./lib/rng.js');   // same shape as window.RNG
RNG.create(42).int(100);
```

**Determinism guarantee:** `RNG.create(seed)` with a `string` or `number` seed
produces a reproducible sequence. CI asserts this on every PR.

**User id**: `RNG.getUserId()` returns a uuid v4 stored under
`localStorage["lumenportal:userId:v1"]`. Used as part of the default seed.

---

## `lib/srs.js`

```js
const s = window.SRS.createState();
//   { ease: 2.5, interval: 0, due: <now>, repetitions: 0, lapses: 0, lastReviewed: null }

window.SRS.update(s, /*correct*/ true,  /*difficulty 1-10*/ 5);
//   first pass  → interval=1,  reps=1
//   second pass → interval=6,  reps=2
//   third pass  → interval≈15, reps=3 (cap: SRS.MAX_INTERVAL_DAYS = 365)

window.SRS.update(s, /*correct*/ false, 8);
//   lapse → interval=1, reps=0, lapses+=1, ease drops (clamped ≥ MIN_EASE = 1.3)

window.SRS.isDue(s);                 // true if due ≤ now
window.SRS.daysUntilDue(s);          // negative = overdue
window.SRS.urgency(s);               // positive = days overdue (for ranking boosts)
```

State schema (one per concept score, attached as `score.srsState`):

```ts
{
  ease:         number   // 1.3 – 4.0
  interval:     number   // days to next review (capped at 365)
  due:          number   // unix-ms
  repetitions:  number   // consecutive correct streak
  lapses:       number   // total times forgotten
  lastReviewed: number | null
}
```

The browser-side integration is in `app.js`:

* `ensureScore()` initialises `srsState` on every new score and lazy-migrates older records.
* The `applyAnswer` wrap calls `SRS.update(state, correct, difficulty)` after every quiz answer.
* `reportWeak()` triggers a synthetic lapse so user-flagged concepts surface again sooner.
* `weightFor()` boosts the trainer pick weight ×3 when SRS is due (concept overdue).
* The Knowledge Map shows **🔁 חזרה מומלצת** on overdue rows + an at-risk pill in the 5-state mastery system.

---

## Loading order

`index.html` loads them right before `app.js`:

```html
<script src="content-loader.js"></script>
<script src="lib/rng.js"></script>
<script src="lib/srs.js"></script>
<script src="app.js"></script>
```

Both files are also `require()`-able from Node (`scripts/seed_questions.js`,
`.github/workflows/ci.yml` unit tests).
