# Legacy Doc Migration Map

Updated: 2026-04-30

This file is the deletion ledger for the planning cleanup. A legacy planning file may stay deleted only if its current, relevant content is preserved here or in one of the canonical plan files listed below.

Canonical destinations:

- `docs/plans/00_CANONICAL_INDEX.md` — source-of-truth index and active rules.
- `docs/plans/01_FINISH_LINE_1.md` — current SVCollege exam release target and gates.
- `docs/plans/02_MANUAL_CONTENT_GOVERNANCE.md` — manual-only authoring policy and guards.
- `docs/plans/03_DEFERRED_BACKLOG.md` — work that waits until Finish Line 1 is green.
- `docs/plans/04_AGENT_HANDOFF.md` — prompt for Kimi 2.6 or another continuing agent.
- `EXECUTION_TASKS.md` — operational task list.
- `MASTER_PLAN.md` — live backlog and bug audit.

## Migration Rules

- Historical claims were not carried forward as facts unless a current gate or live file supports them.
- Generated/seeded question workflows were not migrated as active work because automatic question generation is forbidden.
- Museum, store, community, teacher and post-exam expansion ideas were migrated only as deferred backlog.
- Any pilot, analytics, pricing or learner-outcome item without real data remains `unknown/unavailable` or deferred.
- No deleted file remains the source of truth.

## Deleted File Mapping

| Deleted file | Current relevant content kept | New destination | Content intentionally discarded |
|---|---|---|---|
| `PRODUCT_SPEC.md` | Product vision, learner personas, adaptive learning, practice modes, code environment, library, gamification, AI tutor, community, mock exam, teacher dashboard, sync/mobile and design principles. | Exam-first scope is in `docs/plans/01_FINISH_LINE_1.md`; manual authoring constraints are in `docs/plans/02_MANUAL_CONTENT_GOVERNANCE.md`; non-exam product ideas are in `docs/plans/03_DEFERRED_BACKLOG.md`, `EXECUTION_TASKS.md` and `MASTER_PLAN.md`. | Old broad product roadmap that treated all features as near-term. Anything not serving SVCollege Finish Line 1 is no longer active. |
| `MASTER_PLAN_V2.md` | Adaptive pathway, progress refresh, global progress, and question-bank coverage intent. | Manual question coverage is in `MANUAL_QUESTION_AUTHORING_PLAN.md`, `EXECUTION_TASKS.md` FWD-2 and `MASTER_PLAN.md` BUG-AUDIT-039. | Any automatic/mass question-creation direction. Current policy requires manual writing and manual review only. |
| `MASTER_PLAN_V3.md` | Milestones for Code Trace, Bug Hunt, Mini Build, Mock Exam, per-distractor feedback and SRS. | Live status is in `MASTER_PLAN.md` BUG-AUDIT items, `QUESTION_ACTIVITY_AUTHORING_PLAN.md`, `SVCOLLEGE_READINESS_REPORT.md`, `SVCOLLEGE_TAB_MATRIX.md` and `docs/plans/03_DEFERRED_BACKLOG.md`. | Old milestone status labels that no longer match current gates. |
| `COORDINATION.md` | Ownership discipline, git hygiene, strict validation and avoiding conflicting edits. | `docs/plans/04_AGENT_HANDOFF.md`, `docs/plans/00_CANONICAL_INDEX.md` and `EXECUTION_TASKS.md` Parallel Repair Mode. | Old parallel-session operating model. The user stopped parallel work unless explicitly re-approved with strict file ownership. |
| `PROMPTS.md` | Agent instructions for staged feature tracks. | Current continuation prompt is consolidated in `docs/plans/04_AGENT_HANDOFF.md`. | Old Track A-D prompts that encouraged parallel expansion before Finish Line 1. |
| `PROMPTS_PHASE2.md` | Old prompts for Mock Exam, Code Trace, War Stories/Animator and Side-by-Side work. | Relevant completed/deferred feature work is represented in `MASTER_PLAN.md`, `EXECUTION_TASKS.md` and `docs/plans/03_DEFERRED_BACKLOG.md`. | Prompt fragments that do not reflect manual-only questions and current gates. |
| `COMPETITIVE_ANALYSIS.md` | Code trace, bug hunt, per-distractor feedback, mock exam, SRS, concept graph, sync, mini-build, accessibility, PWA and AI priorities. | Actionable items are in `MASTER_PLAN.md` BUG-AUDIT-041 through BUG-AUDIT-050, `docs/plans/03_DEFERRED_BACKLOG.md` and active gates. | Competitive claims and speculative rankings that are not needed for execution. |
| `SVCOLLEGE_PARALLEL_SESSION_PROMPTS.md` | Need for handoff prompts and continuation rules. | Replaced by `docs/plans/04_AGENT_HANDOFF.md`; command-center script now points to that file. | Two-session parallel prompt model. |
| `AUDIT_2026.md` | Architecture, accessibility, PWA, mobile, analytics, SEO, theme, testing and code-splitting concerns. | Current verified status and remaining work are in `MASTER_PLAN.md` BUG-AUDIT-041 through BUG-AUDIT-050 and `docs/plans/03_DEFERRED_BACKLOG.md`. | Stale claims such as no build tool, no tests, no PWA or no accessibility when live gates now say otherwise. |
| `AUDIT_2026-04-28.md` | Reverse Q&A/ELI5 bug history, content-inflation warnings, missing features and remediation contradictions. | Kimi reconciliation and live-gate corrections are in `EXECUTION_TASKS.md`; backlog items are in `MASTER_PLAN.md` BUG-AUDIT-032 through BUG-AUDIT-040. | Counts and red/green claims that predate current manual-only guards and regenerated reports. |
| `AUDIT_SEEDED_QA_2026-04-28.md` | The fact that seeded/generated QA existed historically and must not be treated as release content. | `docs/plans/02_MANUAL_CONTENT_GOVERNANCE.md`, `EXECUTION_TASKS.md` Manual Question Policy and `guard:no-auto-questions`. | Any instruction to use seeded questions as active coverage. |
| `AUDIT_DISTRACTORS_2026-04-28.md` | Distractor quality concern and need for per-option feedback. | Current quality gates are `qa:questions:strict`, `quality:questions:strict`, `questions:reuse-audit:strict`, `QUESTION_QUALITY_REPORT.md` and `QUESTION_REUSE_AUDIT_REPORT.md`. | Old counts from a combined curated/seeded bank. |

## Current Active Reading Set

For any new agent, read these files instead of the deleted files:

1. `docs/plans/00_CANONICAL_INDEX.md`
2. `docs/plans/01_FINISH_LINE_1.md`
3. `docs/plans/02_MANUAL_CONTENT_GOVERNANCE.md`
4. `docs/plans/05_LEGACY_DOC_MIGRATION.md`
5. `EXECUTION_TASKS.md`
6. `MASTER_PLAN.md`
7. `MANUAL_QUESTION_AUTHORING_PLAN.md`
8. `FINISH_LINE_PRERELEASE_REPORT.md`

