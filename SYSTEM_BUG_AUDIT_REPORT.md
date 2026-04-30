# System Bug Audit Report — 2026-04-30

## Scope

Audit target: LumenPortal / SVCollege AI & Full Stack portal.
Last refreshed: 2026-04-30 after the manual-question policy change.

This report is based only on repo evidence, current task files, and strict gates. No fabricated user metrics, pilot results, production telemetry, or browser observations were added.

## Evidence Checked

| Check | Result |
|---|---:|
| `npm run validate:strict` | Pass; validates manual bank shape, but does not close density |
| `npm run qa:questions:strict` | Pass |
| `npm run svcollege:readiness:release` | Fail; 2 release blockers |
| `npm run svcollege:tab-matrix:strict` | Fail; 4 strict gaps |
| `npm run svcollege:critical-flows:strict` | Fail; 4/6 flows, Trainer and Mock Exam blocked |
| `npm run svcollege:accessibility:strict` | Pass, 7/7 checks |
| `npm run svcollege:visual-overlap:strict` | Pass, 9/9 checks |
| `npm run svcollege:pwa-offline:strict` | Pass, 181 assets |
| `npm run svcollege:command-center:strict` | Fail; 2 queued modules |
| `npm run svcollege:student-export:strict` | Fail; 7 blockers |
| `npm run svcollege:top-tabs:strict` | Pass, 23/23 tabs |
| `npm run svcollege:full-portal-smoke:strict` | Pass, 9/9 |
| `npm run svcollege:console-gate:strict` | Pass, 5/5 checks |
| `npm run questions:reuse-audit:strict` | Pass, duplicate identity issues 0 |
| `npm run questions:coverage-targets` / `:strict` | `ready:false`; manual-only MC gaps 567, Fill gaps 561; strict exits 1 |
| `npm run performance:budget:strict` | Pass, 8/8 |
| `npm run coverage:features:strict` | Pass, 24/24 modules |
| `npm run phase6:release-readiness:strict` | Pass, 6/6 checks |
| `npm run questions:activity-authoring-plan:strict` | Reports `ready:false` with 231 activity gaps but exits 0 |
| `npm test -- --run` | Pass, 147 files / 605 tests |
| `npm run build` | Pass |
| `rg -n "Math\\.random" app.js src scripts tests data --glob '!output/**'` | No matches |

## Executive Summary

The portal no longer treats generated questions as production coverage. Build, unit tests, QA and validation pass, but SVCollege release readiness is currently blocked by manual MC/Fill density and by two modules that no longer have Trainer/Mock Exam practice coverage after the generated bank was removed.

The main live problem is not a crash. The main live problem is learning-depth coverage: only `216` curated MC/Fill questions remain in the live manual bank; `questions:coverage-targets:strict` correctly fails with `567` MC gaps and `561` Fill gaps. In addition, only `337/568` concepts are activity-ready for Trace/Build/Bug practice, leaving `231` activity gaps.

The second group of issues is product/UX hardening: keyboard navigation is still partial, cross-device sync remains credential/live-backend gated, and `app.js`/CSS payload remain large despite partial extraction. These are maintainability and reliability risks, while manual question density is now a current release blocker.

## Findings

| ID | Severity | Area | Problem | Evidence | Recommended Fix |
|---|---|---|---|---|---|
| BUG-AUDIT-001 | High | Learning coverage | `231/568` concepts still lack Trace/Build/Bug activity coverage. | `questions:activity-authoring-plan:strict` reports `totalGaps: 231`, `ready: false`; `QUESTION_ACTIVITY_AUTHORING_PLAN.md`. | Continue real authoring batches from the plan, 20-40 concepts per batch, with tests and coverage regeneration after each batch. |
| BUG-AUDIT-002 | High | SVCollege exam readiness depth | `9` SVCollege-priority activity gaps remain, so not every exam-relevant concept has code-bearing practice. | `svcollegePriorityGaps: 9`. | Prioritize SVCollege gaps before museum/store/community work. Continue with Design Systems exam-critical gaps. |
| BUG-AUDIT-003 | Medium | Deferred content scope | `222` non-priority activity gaps remain outside the current SVCollege-priority set. | `deferredNonPriorityGaps: 222`. | Keep deferred until Finish Line 1 depth is complete, then decide whether each belongs to the active SVCollege portal or a later portal split. |
| BUG-AUDIT-004 | Medium | Accessibility / keyboard use | Keyboard navigation is still marked partial; Esc/Enter/Arrow workflows are not fully closed. | `EXECUTION_TASKS.md` P1.2.2 `[~]`. | Add keyboard-only tests for modal close, answer submit, tab movement, concept navigation, lesson next/previous, and focus-visible states. |
| BUG-AUDIT-005 | Medium | Maintainability | `app.js` remains monolithic enough to be a regression risk; module extraction is partial. | `EXECUTION_TASKS.md` P3.10.3, AUDIT-FIX-28, AUDIT-FIX-29 remain `[~]`. | Extract lesson rendering, menu chrome, settings, bug log, and question bank panels into small modules under `src/` with focused tests. |
| BUG-AUDIT-006 | Medium | Sync / persistence | Cross-device sync is still alpha-gated and cannot be proven without real credentials/live backend. | `EXECUTION_TASKS.md` AUDIT-FIX-27 `[~]`; sync policy/report files mark credentials as required. | Keep local mode stable, then test with real Supabase project, auth, conflict handling, and import/export recovery. Do not mock pilot success. |
| BUG-AUDIT-007 | Low | Documentation integrity | Per-Distractor Feedback status is inconsistent: old task text says partial, current feature gate says full. | `EXECUTION_TASKS.md` P1.5.2 `[~]`; `coverage:features:strict` reports `1704/1704` MC questions with feedback evidence. | Reconcile the old task status with current evidence, or mark it closed/superseded with the exact gate that proves closure. |
| BUG-AUDIT-008 | Low | Release process | Legacy audit docs still contain old unchecked items that can be mistaken for active bugs. | `AUDIT_2026.md`, `AUDIT_2026-04-28.md` contain stale unchecked/deferred items. | Add a historical banner to legacy audit docs or link only to current canonical status in `EXECUTION_TASKS.md` and this report. |
| BUG-AUDIT-009 | Medium | Bug agent operations | The runtime Bug Agent is local-browser scoped; there is no central export/CI ingestion yet. | `src/core/bug-agent.js` stores local bug log and scans runtime state. | Add a deterministic export/report command for bug logs and optional command-center ingestion, with no PII and no fake telemetry. |
| BUG-AUDIT-010 | Medium | PWA cache safety | New scripts/data files can be missed by the service worker cache unless the PWA gate catches them. | Recent additions required cache updates; `svcollege:pwa-offline:strict` now passes. | Keep `svcollege:pwa-offline:strict` mandatory in release checks and add a small pre-release checklist note when adding new `data/` or `src/core/` scripts. |
| BUG-AUDIT-011 | Medium | Quality gates | Activity coverage has a report and authoring plan, but no blocking strict release gate until P6.3.1 is complete. | `questions:activity-authoring-plan:strict` returns `ready:false`; current release gates still pass. | Keep the current authoring-plan strict gate visible, then add a blocking `questions:activity-coverage:strict` only when the target threshold is realistic and backed by real content. |
| BUG-AUDIT-012 | Low | Browser visual QA | Current strict gates pass, but the latest content additions were not accompanied by a fresh visual screenshot audit. | No new browser screenshot evidence in this audit; content additions are mostly data/test changes. | For visual/layout changes, run desktop and mobile browser smoke plus overlap checks before marking UI work done. |
| BUG-AUDIT-013 | Low | Trace tab E2E depth | Newly authored activity data is unit-covered and cached, but needs browser-level Trace/Build/Bug smoke for at least one newly covered concept per batch. | Lesson 11-13, Lesson 15-17, SQL/ORM, and foundation/tooling activity tests cover data shape; browser interaction evidence is narrower. | Add small browser smokes that open representative newly covered concepts and verify Trace/Build/Bug panel rendering. |
| BUG-AUDIT-014 | Medium | Real learner evidence | Pilot outcomes, D1/D7 retention, and learner outcome metrics are structurally ready but real pilot results remain unavailable. | Outcome loop docs intentionally mark missing data as `unknown/unavailable`. | Run the 10-student pilot protocol and record real D1/D7 retention, stuck events, mastery movement, and promotion outcomes. |
| BUG-AUDIT-015 | Medium | Planning source of truth | Active planning is split across `EXECUTION_TASKS.md`, `MASTER_PLAN.md`, `SPEC_AND_MASTER_PLAN.md`, and legacy audit files, creating status drift risk. | `EXECUTION_TASKS.md` has current open `[~]`/`[ ]` items, while legacy/spec sections still contain older checkboxes and historical phase lists. | Keep `EXECUTION_TASKS.md` as the operational source, keep `MASTER_PLAN.md` as backlog, and add explicit historical/superseded banners to old checkbox sections. |
| BUG-AUDIT-016 | Low | Cache/version governance | PWA cache version and asset expectations are updated in several files, so cache changes can drift when new scripts/data files are added. | Recent data-file additions required coordinated updates to `service-worker.js`, smoke scripts, and cache expectation tests. | Centralize the expected cache version/assets or derive report expectations directly from `service-worker.js` and `index.html`. |
| BUG-AUDIT-017 | Medium | Browser smoke coverage | Activity data for Lessons 11-17, SQL/ORM plus foundation/tooling batches is unit-covered, but browser smoke coverage does not yet prove rendering for each newly authored Trace/Build/Bug batch. | Activity trace tests cover data shape and cache loading; browser interaction coverage is narrower. | Add deterministic browser smoke for at least one newly authored concept per activity batch and verify tabs render non-empty content. |
| BUG-AUDIT-018 | Low | Report metadata | Some generated reports use hardcoded dates, which can make refreshed counts look older than the actual audit run. | `scripts/report_question_activity_coverage.js` had a stale report date before this audit refresh; several report scripts still use fixed `REPORT_DATE` constants. | Centralize report metadata or derive deterministic run dates from one release context so generated reports cannot drift silently. |
| BUG-AUDIT-019 | Medium | Release hygiene | The worktree contains many modified and untracked files, so the audit cannot distinguish committed release state from local generated/work-in-progress state. | `git status --short` shows a large dirty worktree with many docs, data, tests, reports, and generated outputs. | Before release, create a scoped artifact inventory, stage only intended files, and keep generated report ownership explicit. |
| BUG-AUDIT-020 | Medium | Gate semantics | `questions:activity-authoring-plan:strict` is named strict but exits 0 even when `summary.ready` is `false`, so automation can treat an open P6.3.1 state as green. | Current run reports `totalGaps: 231`, `ready: false`, and command exit code 0; script strict mode only validates policy/shape, not readiness. | Split commands into `audit` and `release-gate`, or make strict fail on `ready:false` once P6.3.1 is intended to block release. Until then, document it as a non-blocking audit gate. |
| BUG-AUDIT-023 | High | Planning integrity | The plan overclaims completion: a strict audit found 332 DONE, 368 PARTIAL, 50 NOT DONE and 9 FAKED/overclaimed items across 759 checked rows. | `BRUTAL_MASTER_PLAN_AUDIT.md`. | Stop using phase totals as release truth until every FAKED/PARTIAL item is either verified, downgraded, or explicitly deferred. |
| BUG-AUDIT-024 | High | Real evidence boundary | Items depending on pilot learners, D1/D7, real usage, pricing validation or post-exam review were marked done without real external evidence. | `BRUTAL_MASTER_PLAN_AUDIT.md` FAKED rows. | Downgrade these items and require real evidence before any DONE status. |
| BUG-AUDIT-025 | Medium | Release governance | There is no fixed gate that prevents new FAKED/PARTIAL overclaims from entering the plan. | New `scripts/report_brutal_master_plan_audit.js`. | Add a package script and release rule: FAKED must be 0 before release; PARTIAL must have owner/exit criteria. |
| BUG-AUDIT-026 | Medium | Cache/version governance | During a partial activity batch, `service-worker.js` reached `lumen-v2.4.128` while cache expectation tests still expected `lumen-v2.4.127`. | Fixed in `tests/service-worker-cache.test.js`, PWA smoke and museum smoke scripts. | Derive cache expectations from one source or add a preflight that fails on drift. |
| BUG-AUDIT-021 | High | Content governance | MC/Fill density is not manual-ready. Generated/seeded coverage was disconnected and no longer counts. | `questions:coverage-targets` reports `ready:false`, `mcGapCount: 567`, `fillGapCount: 561`. | Author and manually review MC/Fill batches; no generated item can be learner-facing until copied/reworked into the curated bank by a reviewer. |
| BUG-AUDIT-027 | High | Manual content policy | Old gates/docs can still overstate readiness if they refer to seeded/generated bank coverage. | Manual policy addendum in `MASTER_PLAN.md`; `content-loader.js` no longer loads generated bank. | Keep removing/rewriting seeded references from active release gates and docs; legacy mentions must be historical only. |
| BUG-AUDIT-028 | High | Manual authoring backlog | The manual MC/Fill backlog is large enough to block honest readiness. | `QUESTION_COVERAGE_TARGETS.md/json`. | Create reviewer-owned manual authoring batches for `567` MC and `561` Fill gaps, starting with SVCollege exam-critical concepts. |
| BUG-AUDIT-029 | Medium | Legacy generated archive | `data/questions_bank_seeded.js` still exists as a legacy archive, although it is not loaded by the portal. | File header marks legacy archive only. | Either keep it as non-active archive or delete after all useful items are rewritten manually. |
| BUG-AUDIT-030 | Medium | Release guardrail | Need an explicit release gate that forbids runtime generators and seed scripts from returning. | `scripts/seed_questions.js` deleted; runtime generator functions removed. | Add a strict scan for `ensureSeededBank`, `generatedMC`, `makeCodeFill`, and seed scripts before release. |
| BUG-AUDIT-031 | High | SVCollege manual practice blockers | `עיצוב רספונסיבי ו-CSS מתקדם` and `AI למפתחים` lack manual Trainer/Mock Exam coverage after generated-bank removal. | `svcollege:tab-matrix:strict` has 4 gaps; `svcollege:readiness:release` has 2 blockers; `exam:mock-variants:strict` has 3 missing-module blockers. | Author and manually review the missing MC/Fill practice for these two modules first; rerun all SVCollege gates before any Priority 2 work. |
| BUG-AUDIT-022 | Low | Frontend payload / maintainability | Production build still emits a large global stylesheet and a large core chunk, increasing regression and mobile performance risk as UI grows. | `npm run build` reports `dist/assets/index-*.css` around 465 kB and `dist/assets/core-*.js` around 141 kB before gzip. Current performance gate still passes. | After Finish Line 1 depth work, split styles by feature/shell and continue extracting large UI surfaces from `app.js` into route/component modules with smoke tests. |

## Improvement Backlog

1. Close the SVCollege-priority activity gaps first: target `9 -> 0`.
2. Add keyboard-only regression tests for the main learning flow.
3. Continue extracting `app.js` into smaller modules only after each slice has tests.
4. Add bug-log export/reporting so the in-app Bug Agent can support developer triage.
5. Reconcile old audit/task statuses so active work is not hidden by stale checkboxes.
6. Add browser trace-tab smoke for newly authored activity batches.
7. Keep PWA cache validation mandatory after every new script/data file.
8. Run the real learner pilot before claiming outcome improvement.
9. Consolidate planning source-of-truth rules so stale checkboxes cannot override current gates.
10. Centralize cache/version expectations to reduce repeated manual updates.
11. Expand browser smoke for Lesson 11-17, SQL/ORM and foundation/tooling activity batches.
12. Centralize generated report metadata dates.
13. Clean release hygiene with an explicit intended-file inventory before commit/release.
14. Rename or harden activity authoring strict gate so CI semantics cannot hide open coverage gaps.
15. Author/review manual MC/Fill coverage for the highest-risk SVCollege concepts first.
16. Add a no-auto-question-generation release gate.
17. Reduce global CSS/core bundle size after Finish Line 1 by splitting feature styles and modules.
18. Close Design Systems and AI Engineering manual Trainer/Mock Exam coverage before reopening museum/store/community work.

## Not Current Bugs

- SVCollege tab matrix is a current blocker: `221/225` cells are green, `4` cells are missing.
- SVCollege critical flows, full portal smoke and console gate are current blockers because Trainer/Mock Exam no longer count generated bank coverage.
- Accessibility smoke, visual overlap and top tabs are not current blockers.
- Feature coverage is not a current blocker: `coverage:features:strict` reports `24/24` modules done.
- Question identity reuse is not a current blocker: duplicate identity issues are `0`.
- MC/Fill density is now a current blocker under manual-only policy: `questions:coverage-targets` reports `567` MC gaps and `561` Fill gaps.
- `Math.random()` was not found in active `app.js`, `src`, `scripts`, `tests`, or `data`.
- Native mobile packaging and premium museum/store/community expansion remain deferred unless they block SVCollege exam preparation.
