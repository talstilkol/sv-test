# Glossary

## Question types
- **MC** — Multiple choice (4 options + correctIndex + optionFeedback per option)
- **Fill** — Single-blank code completion (`____` placeholder, `answer` is the missing token)
- **Trace** — "Code Trace" — student predicts state at numbered lines (`steps[]` with line/prompt/answer/hint)
- **Build** — "Mini Build" — student writes code to pass regex tests (`tests[]` + `reference` + `starter`)
- **Bug** — "Bug Hunt" — student picks correct bug from 4 options (`brokenCode` + `bugLine` + `options` + `correctIndex` + `fix`)

## Concept identification
- **conceptKey** — canonical id of form `lesson_X::ConceptName` (e.g. `lesson_22::useState`)
- **conceptName** — the human-readable name as it appears in `data/lesson*.js` (preserve casing/punctuation exactly)
- **codeExample** — a concept that has runnable code; only these are eligible for activity coverage targets
- **level** — adaptive difficulty 1..6 *per concept* (NOT absolute difficulty 1..10 — those are different scales)

## System concepts
- **Strict mode** — flag like `--strict` that escalates warnings/boilerplate/missing-difficulty to errors and exits 1 if any
- **Release gate** — one of 8 strict commands + tests + build that must all pass to ship:
  1. `validate:strict`
  2. `questions:coverage-targets:strict`
  3. `svcollege:readiness:release`
  4. `svcollege:tab-matrix:strict`
  5. `quality:questions:strict`
  6. `quality:remediation:strict`
  7. `npm test -- --run`
  8. `npm run build`
- **Bridge file** — `data/svcollege_*.js` exposing content variants for the SVCollege module set; precached separately in service-worker
- **Activity authoring plan** — `scripts/report_question_activity_authoring_plan.js` ranks the next gaps to author
- **Source-of-Truth report** — `REPORT_SOURCE_OF_TRUTH.json/.md` reconciles reports' freshness vs the current REPORT_DATE

## Code patterns specific to this repo
- **`zz_` file prefix** — newer data files named to ensure load order (alphabetical sort puts them last)
- **`data/` flat layout** — no nested directories; all 112 data files live at the same level
- **No module system in app.js** — all functions live in one DOMContentLoaded IIFE; declarations leak across "modules" via shared scope
- **`window.QUESTIONS_BANK`** — central bank object exposing `mc/fill/trace/build/bug` arrays after all data scripts load

## Bugs / patterns to watch for
- **TDZ class** — duplicate `const` inside one IIFE shadows outer; reference before inner init throws "Cannot access before initialization." Fix by removing the redundant inner declaration. Hit twice this branch.
- **`vm.runInNewContext` per-file** — coverage scripts run each data file in a fresh-ish context; a single shared sandbox object IS reused but file-load order via `localeCompare` may differ from default `.sort()` (the `_` codepoint problem).
- **SW precache list drift** — manual list in `service-worker.js` falls out of sync with `index.html`; pwa-offline-smoke test catches this.

## SVCollege namespace
The `svcollege_*` family of data files exposes content tailored for the SVCollege program. They share schemas with the base files but bind to namespaced lessonIds (`lesson_tooling_git`, `lesson_design_systems`, etc.). Their tests have hard-coded conceptKey lists — modifying conceptKeys in those areas can break the matrix tests.

## Sin list (process anti-patterns called out by user)
- Lowering test thresholds when a number drops, instead of either accepting the new state honestly or fixing the regression.
- Bulk regex changes (e.g. `level: 7 → 6` in 191 questions) without spot-checking individual cases.
- Claiming "0 errors" when strict mode actually surfaces 384 warnings.
- Claiming UI is verified without actually clicking the tabs in a fresh browser.
- Editing `onclick=` HTML attributes and forgetting to test that the addEventListener path still fires once.
