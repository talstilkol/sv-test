# Question Remediation Queue — 2026-05-06

> **Historical / Superseded**: this artifact is older than the current source-of-truth run.
> Captured on: 2026-05-06
> Source-of-truth refresh date: 2026-05-07
> Use `npm run report:source-of-truth:write` to regenerate current artifacts before making live claims.


Deterministic rewrite pipeline for flagged MC/Fill items. The script does not invent replacement content; every row must be fixed from verified course material and then manually reviewed.

## Summary

- Total queued issues: 13
- Batches: 1 batches of 25
- Auto rewrite: no
- Manual review required: yes

### By Severity

- note: 13

### By Action

- replace-generic-wording: 13

## Workflow

1. Take the next batch in order.
2. Open the source question in `data/questions_bank.js` or the relevant curated SVCollege bank.
3. Apply only the guidance listed for that row, using verified lesson content.
4. Run `npm run quality:questions:write`.
5. Run `npm run quality:questions:strict` and `npm test -- --run`.
6. Mark the row as manually reviewed in the PR evidence.

## Queue

| # | Batch | Severity | Action | ID | Kind | Source | Concept | Code | Guidance |
|---:|---:|---|---|---|---|---|---|---|---|
| 1 | 1 | note | replace-generic-wording | `mc_chunking_bb_001` | mc | manual | `lesson_ai_engineering::chunking` | generic-wording | Replace broad wording such as always/never/all answers with a concrete misconception. |
| 2 | 1 | note | replace-generic-wording | `mc_closure_p_001` | mc | manual | `lesson_closures::closure` | generic-wording | Replace broad wording such as always/never/all answers with a concrete misconception. |
| 3 | 1 | note | replace-generic-wording | `mc_l12_filter_manual_002` | mc | manual | `lesson_12::filter` | generic-wording | Replace broad wording such as always/never/all answers with a concrete misconception. |
| 4 | 1 | note | replace-generic-wording | `mc_final_semantic_nn_001` | mc | manual | `lesson_html_css_foundations::semantic HTML` | generic-wording | Replace broad wording such as always/never/all answers with a concrete misconception. |
| 5 | 1 | note | replace-generic-wording | `mc_l15_catch_manual_002` | mc | manual | `lesson_15::catch` | generic-wording | Replace broad wording such as always/never/all answers with a concrete misconception. |
| 6 | 1 | note | replace-generic-wording | `mc_chunking_bb_001` | mc | manual | `lesson_ai_engineering::chunking` | generic-wording | Replace broad wording such as always/never/all answers with a concrete misconception. |
| 7 | 1 | note | replace-generic-wording | `mc_l15_sync_r_001` | mc | manual | `lesson_15::Synchronous` | generic-wording | Replace broad wording such as always/never/all answers with a concrete misconception. |
| 8 | 1 | note | replace-generic-wording | `mc_ldev_cd_002` | mc | manual | `lesson_devops_deploy::CD` | generic-wording | Replace broad wording such as always/never/all answers with a concrete misconception. |
| 9 | 1 | note | replace-generic-wording | `mc_lsql_orm_001` | mc | manual | `lesson_sql_orm::ORM` | generic-wording | Replace broad wording such as always/never/all answers with a concrete misconception. |
| 10 | 1 | note | replace-generic-wording | `mc_lai_streaming_002` | mc | manual | `lesson_ai_engineering::streaming response` | generic-wording | Replace broad wording such as always/never/all answers with a concrete misconception. |
| 11 | 1 | note | replace-generic-wording | `mc_modelsel_bb_001` | mc | manual | `lesson_ai_engineering::model selection` | generic-wording | Replace broad wording such as always/never/all answers with a concrete misconception. |
| 12 | 1 | note | replace-generic-wording | `mc_modelsel_bb_001` | mc | manual | `lesson_ai_engineering::model selection` | generic-wording | Replace broad wording such as always/never/all answers with a concrete misconception. |
| 13 | 1 | note | replace-generic-wording | `mc_view_aa_001` | mc | manual | `lesson_sql_orm::SQL` | generic-wording | Replace broad wording such as always/never/all answers with a concrete misconception. |


