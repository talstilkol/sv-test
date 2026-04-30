# LumenPortal Canonical Plan Index

Updated: 2026-04-30

This folder is the compact handoff layer for agents. It replaces the old scattered planning files and points to live gates instead of historical claims.

## Read Order

1. `docs/plans/00_CANONICAL_INDEX.md` — this file.
2. `docs/plans/01_FINISH_LINE_1.md` — current release truth and required gates.
3. `docs/plans/02_MANUAL_CONTENT_GOVERNANCE.md` — manual-only content and question policy.
4. `docs/plans/03_DEFERRED_BACKLOG.md` — what waits until Finish Line 1 is green.
5. `docs/plans/04_AGENT_HANDOFF.md` — prompt for the next agent.
6. `docs/plans/05_LEGACY_DOC_MIGRATION.md` — proof that deleted legacy docs were migrated or intentionally retired.
7. `docs/plans/06_EXECUTION_TASKS_COMPLETED_ARCHIVE.md` — detailed historical execution log moved out of the active board.

## Live Source Of Truth

| Area | File |
|---|---|
| Current execution state | `EXECUTION_TASKS.md` |
| Completed task detail archive | `docs/plans/06_EXECUTION_TASKS_COMPLETED_ARCHIVE.md` |
| Backlog and bug audit items | `MASTER_PLAN.md` |
| Pre-release gate summary | `FINISH_LINE_PRERELEASE_REPORT.md` |
| Manual question batch plan | `MANUAL_QUESTION_AUTHORING_PLAN.md` |
| Current SVCollege readiness | `SVCOLLEGE_READINESS_REPORT.md` |
| Current tab matrix | `SVCOLLEGE_TAB_MATRIX.md` |
| Command center state | `SVCOLLEGE_COMMAND_CENTER.md` |

## Deleted Legacy Planning Files

The following files were removed because their relevant current content is superseded here or in the live source files above. The per-file migration ledger is `docs/plans/05_LEGACY_DOC_MIGRATION.md`.

- `PRODUCT_SPEC.md`
- `MASTER_PLAN_V2.md`
- `MASTER_PLAN_V3.md`
- `COORDINATION.md`
- `PROMPTS.md`
- `PROMPTS_PHASE2.md`
- `COMPETITIVE_ANALYSIS.md`
- `SVCOLLEGE_PARALLEL_SESSION_PROMPTS.md`
- `AUDIT_2026.md`
- `AUDIT_2026-04-28.md`
- `AUDIT_SEEDED_QA_2026-04-28.md`
- `AUDIT_DISTRACTORS_2026-04-28.md`

## Rules That Override Every Plan

- No `Math.random()` in code.
- No fake data, placeholder data, or invented metrics.
- No automatic question generation.
- Questions and learning material must be manually authored and manually reviewed.
- Do not restore seeded/generated question banks.
- Do not start museum/store/community expansion before Finish Line 1 is green.
- Every DONE claim needs a real file change, a gate/test, and a current date.
