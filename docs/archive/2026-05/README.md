# Archived planning documents — April/May 2026

Moved here unchanged on 2026-10-16 (`git mv`, history preserved). They describe the exam-prep sprint of 2026-04-27 → 2026-05-07 and are **superseded**: the live task list is [`TASKS.md`](../../../TASKS.md) and the live status companion is [`MASTER_PLAN_OUTSTANDING.md`](../../../MASTER_PLAN_OUTSTANDING.md). Nothing in this folder is a source of truth; several of these documents contradict each other and the current gate output.

| File | Was | Why archived |
|---|---|---|
| `EXECUTION_TASKS.md` | Active task board until 2026-05-02 (912 tasks) | Superseded by `TASKS.md`; its "blocked" claims are contradicted by current gates (`questions:coverage-targets:strict` is green) |
| `MASTER_PLAN.md` | Backlog + BUG-AUDIT items | Legacy backlog (the brutal audit itself says so) |
| `BRUTAL_MASTER_PLAN_AUDIT.md` / `.json` | Audit of 249 plan items (DONE 22 / PARTIAL 7 / NOT DONE 220) | Self-marked "Historical / Superseded"; regenerate with `npm run master-plan:brutal-audit:write` (writes here) |
| `MASTER_EXECUTION_PLAN_2026-05-03.md`, `MASTER_PLAN_100_PERCENT_COVERAGE.md`, `MASTER_PLAN_TO_100.md`, `MASTER_PLAN_FULL_COMPLETION.md`, `MASTER_PLAN_V2_PERSONAL.md`, `MASTER_PLAN_BRUTAL_HONEST_AUDIT.md`, `REMAINING_WORK_BRUTAL_HONEST.md`, `BRUTAL_HONEST_AUDIT_2026-05-03.md`, `SPEC_AND_MASTER_PLAN.md` | Nine overlapping "master plans" / honest-audit snapshots, 2026-04-28 → 05-03 | All superseded by `TASKS.md` + `MASTER_PLAN_OUTSTANDING.md` (2026-05-04/05) |
| `MUSEUM_MASTER_PLAN.md`, `XP_REWARD_STORE_MASTER_PLAN.md` | Feature master plans (museum, XP economy) | Deferred-backlog features; still referenced by `tests/xp-reward-store-master-plan.test.js` as a policy text |
| `EXAM_WEEK_OPERATING_PLAN.md`, `EXAM_CONTENT_REMAINING.md`, `EXAM_EDITION_RC.md` | Exam-week procedure / remaining-content list / RC note | The exam (2026-06-07) has passed |
| `NEXT_SESSION_PROMPT.md`, `PARALLEL_SESSIONS.md` | Agent hand-off prompts | Superseded by `docs/plans/04_AGENT_HANDOFF.md` |
| `TASKS_TO_FINISH_ALL.md`, `TASKS_NUMBERED.md` | Tier A–J list / numbered variant of the task list | Folded into `TASKS.md` |

Still at the repository root on purpose: `TASKS.md`, `MASTER_PLAN_OUTSTANDING.md`, `README.md`, `ARCHITECTURE.md`, `CLAUDE.md`, `ACCESSIBILITY.md`, `EXAM_FINAL_CRAM_SHEET.md` (opened by the app at runtime), and the generated `*_REPORT.md/json` pairs (read by the gate scripts).
