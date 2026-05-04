# LumenPortal — Architecture Notes

This file documents the conventions that aren't obvious from reading the code. If you're adding a new data file, follow the **Adding a data file** checklist below or your change will silently break offline mode.

---

## Repo layout

```
/
├── index.html           # Single SPA entry; ALL <script src=> tags here
├── app.js               # 37,254-line monolithic IIFE — main UI logic
├── style.css            # 27,918-line CSS, RTL-first
├── service-worker.js    # PWA precache list (auto-synced from index.html)
├── manifest.json        # PWA manifest
│
├── data/                # 112 hand-curated content files (flat layout)
│   ├── lesson*.js       # 29 lesson files — concepts, code examples
│   ├── questions_bank.js
│   ├── questions_trace.js, questions_build.js, questions_bug.js
│   ├── zz_questions_*_phase2.js  # later additions, named to win sort ties
│   ├── svcollege_*.js   # SVCollege-namespaced bridge files
│   └── concise_definitions.js
│
├── src/                 # ES modules loaded by main.js (modern path)
│   └── core/            # State store, theme, sanitize, scoring, etc.
│
├── scripts/             # Node CLI tools — validators, reporters, generators
│   ├── lib/sort.js      # Canonical filename sort (use this!)
│   ├── validate_bank.js
│   ├── sync_sw_precache.js
│   ├── check_threshold_drift.js
│   └── report_*.js      # 60+ readonly reporters
│
├── tests/               # Vitest — 161 test files, 781 tests
│   ├── THRESHOLDS_LOCKED.md   # Documents every softened threshold
│   └── .threshold-baseline.json
│
└── .github/workflows/ci.yml
```

---

## Adding a data file — checklist

Whenever you add a new file under `data/`:

1. **Pick a name that sorts correctly.**
   - `data/<name>.js` — for top-priority content that should load first.
   - `data/zz_<name>.js` — for additions that must load AFTER an earlier same-stem file. The `_` codepoint sorts BEFORE digits/letters in the canonical sort, so `zz_` is required to win ties.
   - Example: `questions_trace.js` → `zz_questions_trace_phase2.js` (NOT `questions_trace_phase2.js`, which sorted *before* the base file under `localeCompare`).

2. **Add a `<script src="data/<name>.js">` tag to `index.html`** in the right neighbourhood. Look at where similar files live (search e.g. `questions_trace`, `questions_build`).

3. **Sync the service-worker precache:**
   ```bash
   npm run sw:sync:write
   ```
   This rewrites the `/data/*` block in `service-worker.js` to match `index.html`. Without it, the new file won't work offline and the `pwa-offline-smoke` test will fail.

4. **Verify nothing else is broken:**
   ```bash
   npm run validate:strict     # bank + structure validation
   npm test -- --run           # 781 vitest tests
   npm run build               # Vite build
   ```

5. **For activity-type content** (trace/build/bug):
   - Each item must have `id`, `conceptKey` (= `lesson_X::ConceptName` exactly), `level` (1..6), `title`, and the type-specific fields.
   - The validator's `--strict` mode treats `level: 7+` as an error; cap at 6.
   - Use the `window` bridge at the bottom (see `data/zz_questions_trace_phase2.js`) so the new array merges into the global bank without overwriting.

---

## Conventions you'll trip over

### Sort order
`Array.prototype.sort()` and `.sort(localeCompare)` produce DIFFERENT orderings — specifically the `_` character (U+005F) lands in different positions. Always use `scripts/lib/sort.js`'s `byFilename` (codepoint comparison) when you `readdirSync(...)` and need stable order across Node versions, locales, and runtimes.

```js
const { byFilename } = require("./lib/sort.js");
const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith(".js")).sort(byFilename);
```

### Test thresholds are tracked
If you ever lower a `toBeGreaterThanOrEqual(N)` value or raise a `toBeLessThanOrEqual(N)` value or grow `BUDGETS["app.js"]`, the threshold drift watcher will catch it. Document the change in `tests/THRESHOLDS_LOCKED.md` in the same commit, and run `npm run thresholds:update` to bake the new baseline.

### No `Math.random` allowed
A CI gate forbids `Math.random()` anywhere in authored JS/TS. Use `Date.now()`, fixed seeds, or `lib/rng.js`'s deterministic PRNG. This is enforced by `tests/no-native-random.test.js` and the `No-Math.random` step in CI.

### `app.js` is one IIFE
All ~885 functions in `app.js` live inside a single `document.addEventListener("DOMContentLoaded", () => {...})` callback. This means:
- Adding a `const` with the same name twice in the same scope creates a TDZ violation that aborts the entire DOMContentLoaded callback (we hit this twice on the `funny-bhabha` branch).
- There is no module system, no imports/exports inside `app.js`. Globals on `window` are how scripts communicate.
- `src/core/*` files are the modern replacement and should grow over time.

### Strict mode treats most warnings as errors — except fill-ambiguity
`validate:strict` escalates these warning classes to errors:
- `[strict:warning]` — out-of-range level, missing question/explanation, etc.
- `[strict:boilerplate]` — concept still using auto-generated placeholder content.
- `[strict:missing-difficulty]` — concept without `difficulty` field.

The exception: `[fill-ambiguity]` warnings. The validator flags fill questions where the answer string appears elsewhere in the displayed code (e.g. in an `import` statement). In code-completion exercises this is often pedagogically correct — students see the identifier in scope and type the same name in the blank. These warnings stay visible but do NOT fail the build.

---

## Release gates (10 strict checks)

Run before any merge:

```bash
npm run validate:strict                    # 1
npm run questions:coverage-targets:strict   # 2
npm run svcollege:readiness:release         # 3
npm run svcollege:tab-matrix:strict         # 4
npm run quality:questions:strict            # 5
npm run quality:remediation:strict          # 6
npm test -- --run                           # 7  (781/781)
npm run build                               # 8
npm run sw:sync                             # 9  (NEW — SW/index.html drift)
npm run thresholds:check:strict             # 10 (NEW — test bar drift)
```

CI runs all of these on every PR. The `.github/workflows/ci.yml` job enforces them.

---

## SVCollege namespace

The `data/svcollege_*.js` family exposes content tailored for the SVCollege program. They share schemas with the base files but bind to namespaced lessonIds (`lesson_tooling_git`, `lesson_design_systems`, etc.).

A few of those tests have **hard-coded conceptKey lists** (e.g. `tests/svcollege-lesson17-activity-traces.test.js`). Modifying conceptKeys in those areas can break the matrix tests. Always grep for the conceptKey before renaming.

---

## Quick reference

| Question type | Schema essentials |
|---|---|
| **MC** | `id`, `conceptKey`, `level` (1..6), `question`, `options[]` (4), `correctIndex`, `optionFeedback[]` (per option), `explanation` |
| **Fill** | `id`, `conceptKey`, `level`, `code` (must contain exactly one `____`), `answer`, `hint`, `explanation` |
| **Trace** | `id`, `conceptKey`, `level`, `title`, `code`, `steps[]` (each `{line, prompt, answer, hint}`), `explanation` |
| **Build** | `id`, `conceptKey`, `level`, `title`, `prompt`, `starter`, `tests[]` (each `{regex, description, flags?}`), `reference`, `hint`, `explanation` |
| **Bug** | `id`, `conceptKey`, `level`, `title`, `brokenCode`, `bugLine`, `hint`, `options[]` (4), `correctIndex`, `fix`, `explanation` |

| Concept levels | What they mean |
|---:|---|
| 1 | grandma |
| 2 | child |
| 3 | soldier |
| 4 | student |
| 5 | junior |
| 6 | professor |

---

## See also

- `MASTER_PLAN_OUTSTANDING.md` — phase-by-phase status
- `TASKS.md` — live task list
- `CLAUDE.md` — working memory (terms, projects, preferences)
- `tests/THRESHOLDS_LOCKED.md` — softened-threshold register
