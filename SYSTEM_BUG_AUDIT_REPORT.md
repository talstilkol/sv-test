# System Bug Audit Report — 2026-04-30

## Scope

Audit target: LumenPortal / SVCollege AI & Full Stack portal.
Last refreshed: 2026-04-30 after live strict gates and report regeneration.

This report is based only on repo evidence, current generated reports, strict gates, and task files. No fabricated learner metrics, fake pilot results, invented production telemetry, or automatic question generation were used.

## Current Gate Evidence

| Check | Result |
|---|---:|
| `npm run finish-line:pre-release:write` | Not ready; 17/18 passed; only blocker is `questions:coverage-targets:strict` |
| `npm run master-plan:brutal-audit:write` | 235 items audited: DONE 12, FAKED 0, PARTIAL 7, NOT DONE 216 |
| `npm run questions:coverage-targets:strict` | Failed as expected: `mcGapCount: 507`, `fillGapCount: 502`, `ready:false` |
| `npm run questions:manual-authoring-plan:write` | Ready for authoring; strict deficits now `1,445` MC and `925` Fill |
| `npm run questions:activity-authoring-plan:strict` | Failed as expected: `totalGaps: 222`, `svcollegePriorityGaps: 0`, `ready:false` |
| `npm run quality:remediation:strict` | Passed; remediation queue is 0 |
| `npm run quality:questions:strict` | Passed; 470 manual questions, 0 blockers, 0 warnings, 11 notes |
| `npm run questions:reuse-audit:strict` | Passed; 1,126 question/activity rows, 384 concept tags, 0 duplicate identities |
| `npm run svcollege:readiness:release` | Passed |
| `npm run svcollege:tab-matrix:strict` | Passed |
| `npm run svcollege:critical-flows:strict` | Passed |
| `npm run svcollege:command-center:strict` | Passed |
| `npm run svcollege:student-export:strict` | Passed |
| `npm run svcollege:accessibility:strict` | Passed, 7/7 |
| `npm run svcollege:visual-overlap:strict` | Passed, 9/9 |
| `npm run svcollege:console-gate:strict` | Passed, 5/5 |
| `npm run svcollege:pwa-offline:strict` | Passed, 181/181 assets |
| `npm run svcollege:critical-flows:strict` | Passed, 6/6 |
| `npm run svcollege:full-portal-smoke:strict` | Passed, 9/9 |
| `npm run svcollege:top-tabs:strict` | Passed, 23/23 |
| `npm run svcollege:context-tree:strict` | Passed, 21/21 |
| `npm run performance:budget:strict` | Passed, 8/8 |
| `npm run exam:accessibility:strict` | Passed, 7/7 |
| `npm run profile:backup-restore:strict` | Passed, 5/5 |
| `npm run sync:alpha:strict` | Passed, 6/6 local alpha checks |
| `npm run reward-store:smoke:strict` | Passed, 7/7 |
| `npm run economy:anti-cheat:strict` | Passed, 8/8 |
| `npm run level100:release-gate:strict` | Passed, 7/7 |
| `npm run content-factory:pipeline:strict` | Passed, 8/8 |
| `npm run content:schema-contract:strict` | Passed, 9/9 |
| `npm run ai-tutor:alpha:strict` | Passed, 7/7 |
| `npm run metrics:dashboard:strict` | Passed, ready true, questionQualityIndex 100, totalQuestions 470; generated markdown still has older date metadata |
| `npm run pilot:readiness:strict` | Passed as readiness only; no real pilot outcomes are claimed |
| `npm run museum:access-smoke:strict` | Passed, 9/9 |
| `npm run museum:evidence-fields:strict` | Passed, 5/5 |
| `npm run portal:boundary:strict` | Passed, 6/6 |
| `npm run phase6:release-readiness:strict` | Passed, 6/6 |
| `npm test -- --run` | Passed: 152 test files, 622 tests |
| `npm run build` | Passed; output includes `dist/app.js` 1.6 MB, `dist/style.css` 594 KB, `dist/assets/index-DDEpfRTZ.css` 454 KB, `dist/assets/core-hrllUkwp.js` 138 KB |
| `rg -n "Math\\.random" app.js src scripts tests data --glob '!output/**'` | No matches |
| Static active-source scan | No `eval(` or `new Function`; found active inventory needing review: `app.js` has 154 `innerHTML` matches, 1 `document.write`, and 164 `localStorage` matches |

## Executive Summary

The system is not currently blocked by SVCollege chrome, tab matrix, PWA, console errors, visual overlap, command center, export, tests, or build-level release readiness. Those live gates pass.

The main current blocker is honest learning coverage under the manual-only policy. `questions:coverage-targets:strict` still fails with `507` concepts missing enough MC coverage and `502` concepts missing enough Fill coverage. `MANUAL_QUESTION_AUTHORING_PLAN.md` says `1,445` MC questions and `925` Fill questions still need to be manually authored and reviewed to reach strict density across all 568 concepts.

The second major issue is planning debt. `BRUTAL_MASTER_PLAN_AUDIT.md` now audits the active plan at 235 items: only 12 are verified DONE, 7 are PARTIAL, and 216 are NOT DONE. The good news is that the current strict audit reports `FAKED: 0`; the remaining problem is volume and verification, not known pretending in the current active slice.

The third issue is source-of-truth drift. Some live strict gates are green, while their generated markdown files still show older dates, older question totals, or historical scopes. Those reports are useful evidence only after their metadata and scope are made explicit.

## Findings

| ID | Severity | Area | Problem | Evidence | Recommended Fix |
|---|---|---|---|---|---|
| SYS-AUDIT-001 | P0 | Manual question coverage | Finish Line 1 is not release-ready because strict manual MC/Fill density is still incomplete. | `questions:coverage-targets:strict`: `mcGapCount: 507`, `fillGapCount: 502`; `FINISH_LINE_PRERELEASE_REPORT.md`: 17/18 passed, 1 failed. | Continue `MANUAL_QUESTION_AUTHORING_PLAN.md` batches. A batch is DONE only after manual authoring, manual review, full option feedback, QA, source lesson verification, and strict gates. |
| SYS-AUDIT-002 | P0 | Manual authoring capacity | The remaining strict deficit is large: `1,445` MC and `925` Fill questions. | `MANUAL_QUESTION_AUTHORING_PLAN.md`. | Assign real owner/reviewer per batch. Keep owner/reviewer as `unknown/unavailable` until a real person is assigned. |
| SYS-AUDIT-003 | P1 | Activity practice depth | 222 non-priority concepts still lack Trace/Build/Bug activity coverage. | `questions:activity-authoring-plan:strict`: `totalGaps: 222`, `svcollegePriorityGaps: 0`. | Defer non-priority activity gaps until Finish Line 1 question coverage is green, then author real Trace/Build/Bug tasks with browser smoke. |
| SYS-AUDIT-004 | P1 | Plan truth | The active master plan still has 216 NOT DONE and 7 PARTIAL items. | `BRUTAL_MASTER_PLAN_AUDIT.md`: 235 items, DONE 12, FAKED 0, PARTIAL 7, NOT DONE 216. | Keep `master-plan:brutal-audit:write` as a regular gate and do not use phase totals as release truth. |
| SYS-AUDIT-005 | P1 | Keyboard accessibility | Keyboard navigation is still partial in the active task board. | `EXECUTION_TASKS.md`: `P1.2.2` remains `[~]`; `FWD-5.3` is open. | Add keyboard-only tests for Escape, Enter, Arrow navigation, tab movement, answer submit, focus return, and focus-visible states. |
| SYS-AUDIT-006 | P1 | Frontend maintainability | `app.js` modularization and view extraction remain partial. | `EXECUTION_TASKS.md`: `P3.10.3`, `AUDIT-FIX-28`, `AUDIT-FIX-29` remain `[~]`. | After Finish Line 1 coverage is green, continue extracting lesson renderer, chrome/menu, settings, bug log, and question panels into small modules. |
| SYS-AUDIT-007 | P1 | Sync reliability | Cross-device sync is only alpha/local-gate proven; real auth/live backend is not fully proven. | `sync:alpha:strict` passes; `EXECUTION_TASKS.md` keeps `AUDIT-FIX-27` partial. | Test with a real Supabase project, real auth, conflict handling, recovery, and import/export. Missing credentials remain `unknown/unavailable`. |
| SYS-AUDIT-008 | P1 | Real learner outcomes | The learner outcome loop is readiness-only; there are no real D1/D7 retention or pilot outcome results. | `pilot:readiness:strict` passes, but outcome data is not present. | Run the 10-student pilot, record D1/D7 retention, mastery movement, stuck events, and promotion outcomes. Do not backfill. |
| SYS-AUDIT-009 | P1 | Security hardening | Security inventory, CSP, and localStorage trust-boundary work are open. | `EXECUTION_TASKS.md`: `FWD-7.5`, `FWD-7.6`, `FWD-7.7`, `FWD-7.8` open. | Audit `.innerHTML`/`document.write` data paths, add sanitizer/DOM API fixes, add CSP in report-only first, and document localStorage as non-authoritative. |
| SYS-AUDIT-010 | P1 | Report source of truth | Historical audits and generated reports can drift from live gates. | Existing tasks `KIMI-AUDIT-1..7`, `FWD-7.10`; old report sections previously had stale 567/561 and stale release failures. | Add historical/superseded banners and a source-of-truth report that reconciles live gates against old audits. |
| SYS-AUDIT-011 | P1 | Bug Agent operations | The in-app Bug Agent is local-only and lacks a deterministic export/report loop for developer triage. | `EXECUTION_TASKS.md`: `BUG-AUDIT-009`/`FWD-8.10` style work remains open. | Add local export/report command, no PII, no fake telemetry, and deterministic cleanup when a bug is no longer reproducible. |
| SYS-AUDIT-012 | P2 | Browser E2E depth | Many strict gates pass, but production-like E2E flows are still a backlog item. | `EXECUTION_TASKS.md`: `FWD-8.9`, `BUG-AUDIT-050` open. | Add Playwright E2E for open lesson, concept navigation, question bank, MC/Fill, progress, home navigation, and offline reload. |
| SYS-AUDIT-013 | P2 | PWA cache governance | PWA passes now, but cache version and asset expectations are still manually coordinated. | `svcollege:pwa-offline:strict` passes; `FWD-7.3`/`BUG-AUDIT-016` open. | Derive cache expectations from one source or add one preflight that fails on drift. |
| SYS-AUDIT-014 | P2 | Legacy generated archive | The legacy seeded bank remains an archive risk even though active loaders no longer use it. | `guard:no-auto-questions` passes; `data/questions_bank_seeded.js` is archive-only. | Keep it non-active or delete it after any useful items are rewritten manually and reviewed. |
| SYS-AUDIT-015 | P2 | SEO and telemetry | SEO and external analytics/error tracking are deferred and must not use fake accounts or fake telemetry. | `KIMI-AUDIT-4`, `KIMI-AUDIT-5`, `FWD-8.10` open. | Add OG/JSON-LD/canonical later. Add Sentry/Plausible only with real account, privacy notice, PII policy, and explicit approval. |
| SYS-AUDIT-016 | P1 | Report metadata drift | Generated markdown reports can show stale dates after live gates are rerun. Some counters were corrected during this audit by running write commands, but date drift remains. | `FEATURE_COVERAGE_REPORT.md` starts with `2026-04-28`; `QUESTION_REMEDIATION_QUEUE.md` starts with `2026-04-28`; `METRICS_DASHBOARD_REPORT.md` starts with `2026-04-29` even after reporting 470 current questions. | Add report-run metadata, scope labels, and a single source-of-truth summary. Reports that are historical should say so in the first lines. |
| SYS-AUDIT-017 | P1 | XSS / DOM trust boundary | Active source still has many HTML injection surfaces that need a reviewed allowlist. This is an inventory finding, not proof of exploitation. | Active scan: `app.js` has 154 `innerHTML` matches and `document.write` at `app.js:29081`; `src/core/sanitize*.js` exists but coverage is not proven for every path. | Create an allowlist with owner, data origin, escaping method, and smoke test for each path. Prefer DOM APIs or `esc(...)`; add a static gate for new unreviewed assignments. |
| SYS-AUDIT-018 | P1 | Local progress authority | Progress, XP, evidence, bug log, settings, and sync-adjacent state rely heavily on browser storage. | Active scan: `app.js` has 164 `localStorage` matches; current sync/pilot gates are readiness or alpha only. | Document localStorage as non-authoritative learning state. Verified exam/progress claims require backend/auth proof; keep missing data `unknown/unavailable`. |
| SYS-AUDIT-019 | P2 | Payload and CSS debt | Performance budgets pass, but the built payload still has large legacy assets that will slow iteration and mobile UX. | `npm run build`: `dist/app.js` 1.6 MB, `dist/style.css` 594 KB, `dist/assets/index-DDEpfRTZ.css` 454 KB. | After Finish Line 1, split routes/features/styles, remove unused legacy CSS, and add measured thresholds to the performance gate. |
| SYS-AUDIT-020 | P1 | Question count scope drift | Question-related reports have different valid scopes, and stale generated files can make those scopes look contradictory. | After `quality:questions:write` and `metrics:dashboard:write`, both files show 470 current manual questions; strict coverage still correctly reports 507 MC and 502 Fill concept gaps because it measures per-concept density, not total count. | Normalize report labels: active manual bank, historical/generated archive, concept-level coverage, and dashboard display scope must be separate fields. Add a gate that fails when generated report files are stale after strict runs. |
| SYS-AUDIT-021 | P1 | Test maintainability | Two tests used frozen question-count constants and failed immediately after a valid manual question batch. This was fixed in the current audit by asserting deterministic invariants instead of exact stale totals. | `finish-line:pre-release:write` initially failed `npm test -- --run` after the 430-question bank; fixed `tests/question-quality-report.test.js` and `tests/question-reuse-audit.test.js`; rerun passed 152 files / 622 tests. | Keep tests tied to invariants: manual count equals total, concept buckets sum to audited questions, no legacy generated rows, no duplicate identities. Avoid hardcoded totals unless the test is explicitly a threshold. |

## Not Current Blockers

- SVCollege release readiness, tab matrix, critical flows, command center, student export, mock variants, top tabs, context tree, full portal smoke, console gate, PWA offline, accessibility, visual overlap, performance budget, tests, and build are currently green.
- Question remediation is not currently open: `quality:remediation:strict` passes with 0 remediation items.
- Native randomness is not currently found in active source: no `Math.random()` matches in `app.js`, `src`, `scripts`, `tests`, or `data` outside output artifacts.
- No active `eval(` or `new Function` usages were found in `app.js`, `src`, or `scripts`.
- The current brutal plan audit reports `FAKED: 0`; the remaining issue is `PARTIAL`/`NOT DONE` backlog and proof depth.

## Recommended Execution Order

1. Finish `QMAN-001` onward: manual MC/Fill authoring and review until `questions:coverage-targets:strict` is green.
2. Keep all SVCollege gates green after every manual batch.
3. Keep question/report tests based on invariants so every manual batch can increase counts without breaking unrelated gates.
4. Add keyboard-only and production-like browser E2E for the learning flow.
5. Fix report metadata/scope drift so every green gate can be traced to the right current source.
6. Inventory the active `innerHTML`/`document.write`/`localStorage` trust boundaries before adding more UI surface.
7. Run a real 10-student pilot before claiming learner outcome improvements.
8. Only after Finish Line 1 is green, resume modularization, Sync live-backend proof, museum/store/community, SEO, telemetry, and payload optimization.
