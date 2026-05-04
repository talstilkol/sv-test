# Tasks

> Source-of-truth task list. Edits here sync to the dashboard.

## In progress
_(none — current LumenPortal session 2026-05-04 wrapped at ~92% readiness)_

## Up next (Tech Debt — Phase A, ~7h total)
- [ ] **CI release-gates job** — GH Action runs all 8 strict commands + tests + build on every PR; blocks merge on failure (~2h)
- [ ] **Auto-generate SW precache list** — build script reads index.html `<script src="data/...">` and regenerates `service-worker.js` constants (~3h)
- [ ] **Lock test thresholds** — `tests/THRESHOLDS_LOCKED.md` + pre-commit hook warns on `toBeGreaterThanOrEqual` decreases (~1h)
- [ ] **Single canonical sort utility** — `scripts/lib/sort.js` (codepoint-only); refactor 6+ scripts that load data files (~30min)

## Backlog (Tech Debt — Phase B, ~3 weeks alongside features)
- [ ] **Split app.js into modules** — 37,254 lines / 885 functions in one IIFE → per-tab modules (eliminates TDZ-redeclare class)
- [ ] **Playwright smoke** — 24-tab click test on every PR (would have caught both TDZ bugs)
- [ ] **Fix 384 fill-ambiguity warnings** — smarter heuristic OR don't escalate in `--strict`

## Backlog (Tech Debt — Phase C, ongoing polish)
- [ ] **Audit other heavy renders** — apply lazy pattern to renderTrace, renderCodeAnatomy
- [ ] **ARCHITECTURE.md "How to add a data file"** — covers SW precache + index.html + naming
- [ ] **Stale-date refresh in CI** — `npm run report:source-of-truth:write` as part of release

## Backlog (LumenPortal content polish)
- [ ] Close remaining 36 activity gaps (mostly lesson_25 Tailwind + Next.js/Nest.js/workbook/blueprint)
- [ ] Add explicit `<label>` to 12 inputs that rely on placeholder/aria-label
- [ ] Phase 1.A/C — full lesson-source audit of 600+ authored questions (deferred from session)

## Done (this session, 2026-05-04)
- [x] P0 renderGuide perf bug — lazy render + RAF stagger
- [x] Source-of-truth stale-date test fix
- [x] Phase 3.5 — open-concept-sprint single-fire verified in browser
- [x] Phase 2.A — 151 trace activities authored (386 → 537)
- [x] Phase 2.B — 30 build activities authored (70 → 100)
- [x] Phase 2.C — 29 bug-hunt activities authored (61 → 90)
- [x] app.js budget tightened 1.8MB → 1.75MB
- [x] Phase 1.B — 50-question random spot-audit (50/50 valid)
- [x] Phase 6 — E2E smoke verified (7 tabs)
- [x] Phase 7 — perf baseline captured (DOMContentLoaded 601ms)
- [x] Phase 8 — a11y audit (923 buttons labeled, 1532 focusable, 99 focus rules)
- [x] Phase 9 — quality review (covered by 1.B sample)
- [x] Phase 10 — MASTER_PLAN_OUTSTANDING.md updated
- [x] Final release gate run — 7/8 green (only validate:strict fails on 384 pre-existing fill warnings)
