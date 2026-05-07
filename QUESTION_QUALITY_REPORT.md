# Question Quality Report — 2026-05-07

Full-bank deterministic QA for MC and Fill questions. This report creates a `questionQuality` object for every question id and a remediation queue for warnings, notes, and advisory review items.

## Summary

- Total questions: 4762
- Mix: 2998 MC, 1764 Fill
- Source mix: 4762 manual
- Clean: 4751
- Notes only: 11
- Advisory only: 0
- Deferred only: 0
- Warning questions: 0
- Blocker questions: 0
- Issue counts: 0 blockers, 0 warnings, 13 notes, 0 advisory, 0 deferred
- Question Quality Index: 100% warning-free

### Exam Core (SVCollege 70/20/10)

- Exam-core questions: 2060
- Exam-core clean: 2060
- Exam-core notes only: 0
- Exam-core advisory only: 0
- Exam-core deferred only: 0
- Exam-core warning questions: 0
- Exam-core blocker questions: 0
- Exam-core issue counts: 0 blockers, 0 warnings, 0 notes, 0 advisory, 0 deferred
- Exam-core Quality Index: 100% warning-free

## Gates Covered

- MC: duplicate options, near-duplicate distractors, exam-core length-cue risk, non-exam-core length-cue deferred, generic wording, missing explanation, missing conceptKey.
- Fill: blank count, missing answer/code/explanation/hint, visible answer leakage, one-character ambiguity, missing conceptKey; non-exam-core missing hints are deferred.

## Remediation Queue

Showing first 13 of 13 queued issues.

| # | Severity | Code | ID | Kind | Source | Concept | Message |
|---:|---|---|---|---|---|---|---|
| 1 | note | generic-wording | `mc_chunking_bb_001` | mc | manual | `lesson_ai_engineering::chunking` | Option 2 uses broad wording that can cue test-taking instead of knowledge. |
| 2 | note | generic-wording | `mc_lai_streaming_002` | mc | manual | `lesson_ai_engineering::streaming response` | Option 2 uses broad wording that can cue test-taking instead of knowledge. |
| 3 | note | generic-wording | `mc_closure_p_001` | mc | manual | `lesson_closures::closure` | Option 4 uses broad wording that can cue test-taking instead of knowledge. |
| 4 | note | generic-wording | `mc_l15_catch_manual_002` | mc | manual | `lesson_15::catch` | Option 3 uses broad wording that can cue test-taking instead of knowledge. |
| 5 | note | generic-wording | `mc_chunking_bb_001` | mc | manual | `lesson_ai_engineering::chunking` | Option 4 uses broad wording that can cue test-taking instead of knowledge. |
| 6 | note | generic-wording | `mc_lsql_orm_001` | mc | manual | `lesson_sql_orm::ORM` | Option 3 uses broad wording that can cue test-taking instead of knowledge. |
| 7 | note | generic-wording | `mc_modelsel_bb_001` | mc | manual | `lesson_ai_engineering::model selection` | Option 2 uses broad wording that can cue test-taking instead of knowledge. |
| 8 | note | generic-wording | `mc_modelsel_bb_001` | mc | manual | `lesson_ai_engineering::model selection` | Option 3 uses broad wording that can cue test-taking instead of knowledge. |
| 9 | note | generic-wording | `mc_view_aa_001` | mc | manual | `lesson_sql_orm::SQL` | Option 2 uses broad wording that can cue test-taking instead of knowledge. |
| 10 | note | generic-wording | `mc_final_semantic_nn_001` | mc | manual | `lesson_html_css_foundations::semantic HTML` | Option 3 uses broad wording that can cue test-taking instead of knowledge. |
| 11 | note | generic-wording | `mc_l15_sync_r_001` | mc | manual | `lesson_15::Synchronous` | Option 3 uses broad wording that can cue test-taking instead of knowledge. |
| 12 | note | generic-wording | `mc_ldev_cd_002` | mc | manual | `lesson_devops_deploy::CD` | Option 4 uses broad wording that can cue test-taking instead of knowledge. |
| 13 | note | generic-wording | `mc_l12_filter_manual_002` | mc | manual | `lesson_12::filter` | Option 4 uses broad wording that can cue test-taking instead of knowledge. |

## Strict Policy

- `--strict` fails only on blocker-level issues.
- Warnings and notes are review/remediation work; they are intentionally visible but non-blocking until promoted by policy.
- Advisory items are active quality debt inside the current release path.
- Deferred items remain visible quality debt outside the immediate Exam100 release path.

