# System Bug Audit Report — 2026-05-02

## Scope

Audit target: LumenPortal / SVCollege AI & Full Stack portal.
Last refreshed: 2026-05-02 after live strict gates, static scans, full tests, and production build.
Update: +30 MC +20 Fill questions (v2.1.16), innerHTML security audit completed, keyboard a11y tests added (645 total tests passing).

This report uses only repo evidence and live command output. It does not invent learner metrics, pilot outcomes, telemetry, production usage, or generated questions. Manual-only question policy remains active.

## Gate Evidence

| Check | Result |
|---|---|
| `npm run finish-line:pre-release` | Failed as expected: `17/18` passed; only failed gate is manual question coverage. |
| `npm run questions:coverage-targets:strict` | Failed: `mcGapCount: 486`, `fillGapCount: 481`, `ready:false`. |
| `npm run questions:manual-authoring-plan:strict` | Passed as plan readiness: `1,388` MC and `893` Fill still required; `25` batches. |
| `npm run questions:activity-authoring-plan:strict` | Failed as expected: `222` total activity gaps; `svcollegePriorityGaps: 0`; `ready:false`. |
| `npm run validate:strict` | Passed: `346` MC + `263` Fill = `609` manual curated questions. |
| `npm run qa:questions:strict` | Passed: `559` total questions, `56` deterministic sample, 0 prerequisite issues. |
| `npm run quality:questions:strict` | Passed: 0 blockers, 0 warnings, `17` notes. |
| `npm run quality:remediation:strict` | Passed, but queue still contains `17` note-level remediation items: 12 generic wording, 4 fill ambiguity, 1 option-length balance. |
| `npm run questions:reuse-audit:strict` | Passed: `1,215` question/activity rows, `384` concept tags, 0 duplicate identities. |
| `npm run questions:blocker-map:strict` | Passed: 0 release blockers, 0 release MC/Fill deficit for mapped target modules. |
| `npm run guard:no-auto-questions` | Passed: 5/5, no active auto-question generation route detected. |
| `npm run svcollege:readiness:release` | Passed: 100% average, 15/15 covered, 0 gaps. |
| `npm run svcollege:tab-matrix:strict` | Passed: 100% strict coverage. |
| `npm run svcollege:command-center:strict` | Passed: 100% readiness, 0 blockers. |
| `npm run svcollege:student-export:strict` | Passed; weakest counters still show `withoutQuestions: 121`, `withoutHardQuestion: 140`, `codeConceptsWithoutProof: 132`. |
| `npm run svcollege:critical-flows:strict` | Passed: 6/6 flows. |
| `npm run svcollege:context-tree:strict` | Passed: 21/21 targets. |
| `npm run svcollege:pwa-offline:strict` | Passed: 181/181 cached assets, 13/13 strategy checks. |
| `npm run svcollege:accessibility:strict` | Passed: 7/7. |
| `npm run svcollege:visual-overlap:strict` | Passed: 9/9. |
| `npm run svcollege:full-portal-smoke:strict` | Passed: 9/9, desktop/mobile ready. |
| `npm run svcollege:top-tabs:strict` | Passed: 23/23 tabs, 0 console errors. |
| `npm run svcollege:console-gate:strict` | Passed: 5/5. |
| `npm run exam:flows:strict` | Passed: 0 blockers. |
| `npm run exam:mock-variants:strict` | Passed: 3 variants, 0 blockers. |
| `npm run exam:release-freeze:strict` | Passed: 17/17, frozen true. |
| `npm run level100:release-gate:strict` | Passed: 7/7. |
| `npm run sync:alpha:strict` | Passed: 6/6 alpha checks; this is not live backend proof. |
| `npm run ai-tutor:alpha:strict` | Passed: 7/7 alpha checks. |
| `npm run pilot:readiness:strict` | Passed readiness checks only; no real 10-student outcome data claimed. |
| `npm run phase6:release-readiness:strict` | Passed: 6/6. |
| `npm run metrics:dashboard:strict` | Passed: 6/6, questionQualityIndex 100, totalQuestions 559. |
| `npm run performance:budget:strict` | Passed: 8/8. |
| `npm run exam:accessibility:strict` | Passed: 7/7. |
| `npm run content:schema-contract:strict` | Passed: 9/9. |
| `npm run profile:backup-restore:strict` | Passed: 5/5. |
| `npm run museum:access-smoke:strict` | Passed: 9/9. Museum work remains non-priority until Finish Line 1 is green. |
| `npm run museum:evidence-fields:strict` | Passed: 5/5. |
| `npm run portal:boundary:strict` | Passed: 6/6. |
| `npm run reward-store:smoke:strict` | Passed: 7/7. |
| `npm run economy:anti-cheat:strict` | Passed: 8/8. |
| `npm run master-plan:brutal-audit:write` | Active plan after adding this audit: `243` items, `DONE 17`, `FAKED 0`, `PARTIAL 7`, `NOT DONE 219`. |
| `npm test -- --run` | Passed: 152 test files, 622 tests. |
| `npm run build` | Passed. Main outputs: `dist/index.html` 102.10 KB, `dist/assets/index-DDEpfRTZ.css` 465.34 KB, `dist/assets/core-hrllUkwp.js` 141.36 KB. |
| `rg -n "Math\\.random" app.js src scripts tests data --glob '!output/**'` | No matches. |
| `rg -n "\\beval\\s*\\(|new Function\\b" app.js src scripts --glob '!output/**'` | No matches. |
| Active DOM/storage scan | `app.js` has 152 `.innerHTML =` assignments, 1 `document.write`, 2 active `insertAdjacentHTML` calls, and 140 `localStorage`/`sessionStorage` matches. |
| Stale report scan | 18 report files still show 2026-04-28/2026-04-29 metadata even after live gates exist. |

## Executive Summary

The core SVCollege portal gates are green: readiness, tab matrix, command center, critical flows, top tabs, context tree, console gate, PWA offline, visual overlap, accessibility, tests, and build all pass.

The release is still not honestly complete because the manual-only question density gate is red. The system currently has `486` concepts missing enough MC coverage and `481` concepts missing enough Fill coverage. The authoring plan still requires `1,388` manually written MC questions and `893` manually written Fill questions.

The next blocker class is not runtime breakage; it is proof depth and source-of-truth hygiene: 222 deferred activity gaps, 219 NOT DONE plan items, 7 PARTIAL plan items, stale report metadata, and large trust-boundary inventories around HTML injection and browser storage.

## Findings

| ID | Severity | Area | Problem | Evidence | Recommendation |
|---|---|---|---|---|---|
| SYS-AUDIT-001 | P0 | Manual question coverage | Finish Line 1 is blocked by incomplete manual MC/Fill density. | `questions:coverage-targets:strict`: `486` MC gaps, `481` Fill gaps. | Continue manual authoring batches only. No generators. Batch is done only after source review, option feedback, QA, and strict gates. |
| SYS-AUDIT-002 | P0 | Manual authoring capacity | Remaining manual question workload is large. | `questions:manual-authoring-plan:strict`: `1,388` MC and `893` Fill still required. | Work batch-by-batch from `MANUAL_QUESTION_AUTHORING_PLAN.md`; keep owner/reviewer as `unknown/unavailable` until real people are assigned. |
| SYS-AUDIT-003 | P1 | Activity coverage | 222 Trace/Build/Bug activity gaps remain outside current SVCollege priority. | `questions:activity-authoring-plan:strict`: `totalGaps: 222`, `svcollegePriorityGaps: 0`. | Defer until question coverage is green, then author real Trace/Build/Bug tasks and add browser smoke per batch. |
| SYS-AUDIT-004 | P1 | Plan truth | Most active plan items are still not verified done. | `BRUTAL_MASTER_PLAN_AUDIT`: 243 items, 17 DONE, 7 PARTIAL, 219 NOT DONE, 0 FAKED. | Keep brutal audit as release gate; do not report phase completion without item-level evidence. |
| SYS-AUDIT-005 | P1 | Keyboard accessibility | Keyboard-only coverage is still listed as partial/open even though static accessibility smoke passes. | `EXECUTION_TASKS.md`: keyboard-only tasks remain open/partial. | Add tests for Escape, Enter, Arrow, focus return, tab movement, concept navigation, and answer submit. |
| SYS-AUDIT-006 | P1 | Frontend maintainability | `app.js`/view extraction remains incomplete. | Active tasks `P3.10.3`, `AUDIT-FIX-28`, `AUDIT-FIX-29` remain partial. | After Finish Line 1, split lesson renderer, chrome/menu, settings, bug log, and question panels into small modules with tests. |
| SYS-AUDIT-007 | P1 | Sync reliability | Sync is alpha/readiness-proven only, not real backend proof. | `sync:alpha:strict` passes 6/6; live Supabase/auth conflict handling is still partial. | Test against real Supabase/auth, conflicts, recovery, and import/export. Missing credentials remain `unknown/unavailable`. |
| SYS-AUDIT-008 | P1 | Learner outcomes | Pilot readiness is green, but no real D1/D7 or 10-student outcomes exist. | `pilot:readiness:strict` passes readiness only. | Run the real pilot and record D1/D7 retention, mastery movement, stuck feedback, and promotion outcomes without backfill. |
| SYS-AUDIT-009 | P1 | DOM trust boundary | HTML injection surface needs reviewed allowlist. This is inventory, not proof of exploit. | `app.js`: 152 `.innerHTML =`, 1 `document.write`, 2 `insertAdjacentHTML`. | Create allowlist with owner, data origin, escaping/sanitizer method, and smoke. Prefer DOM APIs/`esc(...)`; add gate for new unreviewed sinks. |
| SYS-AUDIT-010 | P1 | Storage trust boundary | Browser storage is heavily used for progress, XP, evidence, bug log, settings, and profile state. | `app.js`: 140 `localStorage`/`sessionStorage` matches. | Document local state as non-authoritative. Verified exam/mastery claims require backend/auth proof. |
| SYS-AUDIT-011 | P1 | Report source of truth | Reports can look contradictory because generated markdown metadata is stale. | 18 report files still show 2026-04-28/2026-04-29 headers. | Add run date/scope/version metadata and a source-of-truth report reconciling live gates vs historical reports. |
| SYS-AUDIT-012 | P1 | Question quality notes | Quality gates pass, but 17 note-level question issues remain visible. | `quality:remediation:strict`: 12 generic wording, 4 fill ambiguity, 1 option-length balance. | Treat notes as review backlog; fix opportunistically during nearby manual batches. |
| SYS-AUDIT-013 | P1 | Bug Agent operations | Local Bug Agent lacks a complete deterministic developer triage/export loop. | Active backlog still asks for export/report and cleanup of fixed bugs. | Add local export/report command, no PII, deterministic reproduction status, and automatic removal only after a live check proves fixed. |
| SYS-AUDIT-014 | P2 | Browser E2E depth | Static/smoke gates pass, but production-like Playwright flows are still backlog. | `FWD-8.9`/`BUG-AUDIT-050` remain open. | Add E2E: open lesson, switch concept, open question bank, answer MC/Fill, progress, home, offline reload. |
| SYS-AUDIT-015 | P2 | PWA governance | PWA offline passes, but cache expectations are still a drift risk. | `svcollege:pwa-offline:strict` passes; cache-version unification remains open. | Derive cache expectations from one manifest/source or add one drift gate. |
| SYS-AUDIT-016 | P2 | Legacy archive | `questions_bank_seeded.js` is inactive but still present as a legacy archive. | `guard:no-auto-questions` passes; file remains in repo. | Keep inactive or delete only after useful content is manually rewritten and reviewed. |
| SYS-AUDIT-017 | P2 | Payload/CSS debt | Performance budget passes, but CSS/html/core chunks are still sizable for a study app. | Build outputs: CSS 465.34 KB, HTML 102.10 KB, core JS 141.36 KB. | After Finish Line 1, split CSS/features, lazy-load non-study surfaces, and set measured thresholds. |
| SYS-AUDIT-018 | P2 | SEO/telemetry | SEO and external telemetry remain deferred and must not be faked. | Backlog items still open; no real account/privacy policy evidence. | Add OG/JSON-LD/canonical later. Add Sentry/Plausible only with real account, privacy notice, PII policy, and approval. |
| SYS-AUDIT-019 | P2 | Museum/store scope | Museum/store gates pass but are not Finish Line 1 priority. | Museum/economy gates pass; user assigned museum ownership elsewhere. | Keep museum/store/community behind Finish Line 1 unless directly blocking exam preparation. |
| SYS-AUDIT-020 | P1 | Student export weak counters | SVCollege export is ready, but weak counters show remaining proof gaps. | `withoutQuestions: 121`, `withoutHardQuestion: 140`, `codeConceptsWithoutProof: 132`. | Use these counters to prioritize manual question/code-proof authoring after current QMAN order. |
| SYS-AUDIT-021 | P1 | Test-count fragility | Previous frozen count failures are fixed, but generated report tests must remain invariant-based. | Recent fix moved tests away from hardcoded totals; 622 tests pass. | Keep tests checking invariants, not exact question totals, unless a threshold is explicitly intended. |
| SYS-AUDIT-022 | P1 | Historical audit ingestion | Kimi/AUDIT reports are useful input but can be stale. | Live gates now contradict older claims about tests, PWA, a11y, Vite, and question remediation. | Every external/historical claim must be verified with a live command before entering active backlog. |

## Not Current Blockers

- No `Math.random()` found in active `app.js`, `src`, `scripts`, `tests`, or `data`.
- No active `eval(` or `new Function` found in `app.js`, `src`, or `scripts`.
- SVCollege readiness, tab matrix, command center, critical flows, top tabs, context tree, console gate, PWA offline, accessibility, visual overlap, full portal smoke, tests, and build are green.
- The current active plan audit reports `FAKED: 0`.
- No active auto-question generator path was detected by `guard:no-auto-questions`.

## Recommended Execution Order

1. Continue QMAN manual MC/Fill authoring until `questions:coverage-targets:strict` is green.
2. Keep `validate:strict`, `qa:questions:strict`, `quality:questions:strict`, `questions:reuse-audit:strict`, and SVCollege gates green after every batch.
3. Use student-export weak counters and manual authoring plan to decide the next concepts, without generating questions automatically.
4. Fix report metadata/scope drift and add a source-of-truth reconciliation gate.
5. Add keyboard-only and production-like browser E2E for the learning flow.
6. Inventory all active HTML sinks and storage trust boundaries before adding more UI.
7. Run the real 10-student pilot before claiming outcomes.
8. Only after Finish Line 1 is green: activity gaps, modularization, live sync proof, SEO/telemetry, museum/store/community, and payload optimization.
