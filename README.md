# LumenPortal

> Hebrew-first adaptive learning platform for Full-Stack JavaScript / React / TypeScript.

29 lessons · 568 concepts · **4,762 questions** · **727 hands-on activities** · 6 difficulty levels · 100% concept coverage · works offline.

## Quick start

```bash
npm install
npm run dev          # dev server on http://localhost:5173
npm run build        # production build to dist/
npm test             # 782 vitest tests
```

## What's inside

| Activity type | Count | What |
|---|---:|---|
| Multiple choice (MC) | 2,998 | 4 options, optionFeedback per option |
| Code completion (Fill) | 1,764 | Single `____` blank in code |
| Code Trace | 537 | Predict execution step by step |
| Mini Build | 100 | Write code to pass regex tests |
| Bug Hunt | 90 | Find/fix broken code from 4 options |

All hand-curated. No auto-generated questions ([no-auto-generation guard](tests/no-auto-question-generation.test.js)).

## Architecture

See [ARCHITECTURE.md](ARCHITECTURE.md) for the full layout. TL;DR:

- `index.html` — single SPA entry, all `<script src=>` tags here
- `app.js` — 37k-line monolithic IIFE, main UI logic
- `style.css` — 28k-line RTL-first CSS
- `data/*.js` — 112 hand-curated content files
- `src/core/*.js` — modern ES modules (state store, theme, scoring)
- `service-worker.js` — PWA precache, auto-synced from index.html
- `tests/*.test.js` — 162 vitest test files

## Adding content

```bash
# Add a new data file
touch data/zz_questions_<topic>_phase3.js
# (write content, then)

npm run sw:sync:write      # auto-syncs SW precache from index.html
npm run validate:strict    # checks bank
npm test -- --run          # runs the 782-test suite
```

See [ARCHITECTURE.md § Adding a data file](ARCHITECTURE.md#adding-a-data-file--checklist) for the full checklist.

## Release gates

10 strict gates run on every PR via [GitHub Actions](.github/workflows/ci.yml):

```bash
npm run validate:strict                     # bank schema + ambiguity
npm run questions:coverage-targets:strict   # 100% concept coverage
npm run svcollege:readiness:release         # SVCollege module readiness
npm run svcollege:tab-matrix:strict         # SVCollege tab matrix
npm run quality:questions:strict            # quality blockers
npm run quality:remediation:strict          # remediation queue
npm test -- --run                           # 782 tests
npm run build                               # Vite clean build
npm run sw:sync                             # SW/index.html drift
npm run thresholds:check:strict             # test bar drift
```

## Privacy & terms

- **All learning data stays on your device.** `localStorage` only, no backend, no analytics.
- See [PRIVACY.md](PRIVACY.md) and [TERMS.md](TERMS.md).

## Locale

- Primary UI: **Hebrew (RTL)**
- Code identifiers and JS terminology: **English** (kept as-is to match production code students will see).
- Mixed prose is fine — the platform handles bidi correctly.

## Performance

| Metric | Measured (2026-05-04) | Lighthouse target |
|---|---:|---:|
| First Contentful Paint | 76 ms | < 1.8 s |
| DOMContentLoaded | 86 ms | < 2.0 s |
| Initial transfer | 107 KB | < 1.6 MB |
| `app.js` bundle | 1.73 MB | (budget 1.75 MB) |

## Status

10/10 release gates green. ~96% launch-ready. Open items in [TASKS.md](TASKS.md).

## Stack

| Layer | Choice | Why |
|---|---|---|
| Bundler | Vite (rolldown) | sub-100ms HMR |
| Tests | Vitest + happy-dom | 782 tests, < 5s total |
| PWA | Plain Service Worker | offline-first, 167 precached |
| State | `localStorage` + custom store | no backend |
| RNG | Custom seedable PRNG (`lib/rng.js`) | deterministic, no `Math.random` allowed |
| SRS | FSRS-4 (`lib/srs.js`) | spaced repetition |

## Contributing

This is a single-maintainer project (Tal). Issues/PRs welcome but expect a slow review.

## License

TBD — see repository LICENSE file when published.
