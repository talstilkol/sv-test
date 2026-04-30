# System Bug Audit Report — 2026-04-30

## Scope

Audit target: LumenPortal / SVCollege AI & Full Stack portal.
Last refreshed: 2026-04-30 after live strict gates and report regeneration.

This report is based only on repo evidence, current generated reports, strict gates, and task files. No fabricated learner metrics, fake pilot results, invented production telemetry, or automatic question generation were used.

## Current Gate Evidence

| Check | Result |
|---|---:|
| `npm run finish-line:pre-release:write` | Not ready; 17/18 passed; only blocker is `questions:coverage-targets:strict` |
| `npm run master-plan:brutal-audit:write` | 221 items audited: DONE 8, FAKED 0, PARTIAL 6, NOT DONE 207 |
| `npm run questions:coverage-targets:strict` | Failed as expected: `mcGapCount: 524`, `fillGapCount: 519`, `ready:false` |
| `npm run questions:activity-authoring-plan:strict` | Failed as expected: `totalGaps: 222`, `svcollegePriorityGaps: 0`, `ready:false` |
| `npm run quality:remediation:strict` | Passed; remediation queue is 0 |
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
| `npm run metrics:dashboard:strict` | Passed, ready true, questionQualityIndex 100 |
| `npm run pilot:readiness:strict` | Passed as readiness only; no real pilot outcomes are claimed |
| `npm run museum:access-smoke:strict` | Passed, 9/9 |
| `npm run museum:evidence-fields:strict` | Passed, 5/5 |
| `npm run portal:boundary:strict` | Passed, 6/6 |
| `npm run phase6:release-readiness:strict` | Passed, 6/6 |
| `rg -n "Math\\.random" app.js src scripts tests data --glob '!output/**'` | No matches |

## Executive Summary

The system is not currently blocked by SVCollege chrome, tab matrix, PWA, console errors, visual overlap, command center, export, or build-level release readiness. Those live gates pass.

The main current blocker is honest learning coverage under the manual-only policy. `questions:coverage-targets:strict` still fails with `524` concepts missing enough MC coverage and `519` concepts missing enough Fill coverage. `MANUAL_QUESTION_AUTHORING_PLAN.md` says `1,493` MC questions and `954` Fill questions still need to be manually authored and reviewed to reach strict density across all 568 concepts.

The second major issue is planning debt. `BRUTAL_MASTER_PLAN_AUDIT.md` now audits the active plan at 221 items: only 8 are verified DONE, 6 are PARTIAL, and 207 are NOT DONE. The good news is that the current strict audit reports `FAKED: 0`; the remaining problem is volume and verification, not known pretending in the current active slice.

## Findings

| ID | Severity | Area | Problem | Evidence | Recommended Fix |
|---|---|---|---|---|---|
| SYS-AUDIT-001 | P0 | Manual question coverage | Finish Line 1 is not release-ready because strict manual MC/Fill density is still incomplete. | `questions:coverage-targets:strict`: `mcGapCount: 524`, `fillGapCount: 519`; `FINISH_LINE_PRERELEASE_REPORT.md`: 17/18 passed, 1 failed. | Continue `MANUAL_QUESTION_AUTHORING_PLAN.md` batches. A batch is DONE only after manual authoring, manual review, full option feedback, QA, source lesson verification, and strict gates. |
| SYS-AUDIT-002 | P0 | Manual authoring capacity | The remaining strict deficit is large: `1,493` MC and `954` Fill questions. | `MANUAL_QUESTION_AUTHORING_PLAN.md`. | Assign real owner/reviewer per batch. Keep owner/reviewer as `unknown/unavailable` until a real person is assigned. |
| SYS-AUDIT-003 | P1 | Activity practice depth | 222 non-priority concepts still lack Trace/Build/Bug activity coverage. | `questions:activity-authoring-plan:strict`: `totalGaps: 222`, `svcollegePriorityGaps: 0`. | Defer non-priority activity gaps until Finish Line 1 question coverage is green, then author real Trace/Build/Bug tasks with browser smoke. |
| SYS-AUDIT-004 | P1 | Plan truth | The active master plan still has 207 NOT DONE and 6 PARTIAL items. | `BRUTAL_MASTER_PLAN_AUDIT.md`: 221 items, DONE 8, FAKED 0, PARTIAL 6, NOT DONE 207. | Keep `master-plan:brutal-audit:write` as a regular gate and do not use phase totals as release truth. |
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

## Not Current Blockers

- SVCollege release readiness, tab matrix, critical flows, command center, student export, mock variants, top tabs, context tree, full portal smoke, console gate, PWA offline, accessibility, and visual overlap are currently green.
- Question remediation is not currently open: `quality:remediation:strict` passes with 0 remediation items.
- Native randomness is not currently found in active source: no `Math.random()` matches in `app.js`, `src`, `scripts`, `tests`, or `data` outside output artifacts.
- The current brutal plan audit reports `FAKED: 0`; the remaining issue is `PARTIAL`/`NOT DONE` backlog and proof depth.

## Recommended Execution Order

1. Finish `QMAN-001` onward: manual MC/Fill authoring and review until `questions:coverage-targets:strict` is green.
2. Keep all SVCollege gates green after every manual batch.
3. Add keyboard-only and production-like browser E2E for the learning flow.
4. Run a real 10-student pilot before claiming learner outcome improvements.
5. Only after Finish Line 1 is green, resume modularization, Sync live-backend proof, museum/store/community, SEO, telemetry, and payload optimization.
