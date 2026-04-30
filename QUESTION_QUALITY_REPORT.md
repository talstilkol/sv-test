# Question Quality Report — 2026-04-30

Full-bank deterministic QA for MC and Fill questions. This report creates a `questionQuality` object for every question id and a remediation queue for warnings and notes.

## Summary

- Total questions: 523
- Mix: 293 MC, 230 Fill
- Source mix: 523 manual
- Clean: 507
- Notes only: 16
- Warning questions: 0
- Blocker questions: 0
- Issue counts: 0 blockers, 0 warnings, 17 notes
- Question Quality Index: 100% warning-free

## Gates Covered

- MC: duplicate options, near-duplicate distractors, length-cue risk, generic wording, missing explanation, missing conceptKey.
- Fill: blank count, missing answer/code/explanation/hint, visible answer leakage, one-character ambiguity, missing conceptKey.

## Remediation Queue

Showing first 17 of 17 queued issues.

| # | Severity | Code | ID | Kind | Source | Concept | Message |
|---:|---|---|---|---|---|---|---|
| 1 | note | generic-wording | `mc_l12_index_manual_003` | mc | manual | `lesson_12::index` | Option 4 uses broad wording that can cue test-taking instead of knowledge. |
| 2 | note | generic-wording | `mc_l12_array_manual_001` | mc | manual | `lesson_12::array` | Option 2 uses broad wording that can cue test-taking instead of knowledge. |
| 3 | note | generic-wording | `mc_l12_index_values_he_manual_003` | mc | manual | `lesson_12::עבודה עם ערכים לפי אינדקס` | Option 2 uses broad wording that can cue test-taking instead of knowledge. |
| 4 | note | generic-wording | `mc_l12_lowercase_manual_002` | mc | manual | `lesson_12::lowercase` | Option 3 uses broad wording that can cue test-taking instead of knowledge. |
| 5 | note | generic-wording | `mc_l12_new_array_he_manual_003` | mc | manual | `lesson_12::יצירת מערך חדש (new array)` | Option 3 uses broad wording that can cue test-taking instead of knowledge. |
| 6 | note | generic-wording | `mc_l12_condition_filter_he_manual_003` | mc | manual | `lesson_12::סינון לפי תנאי` | Option 4 uses broad wording that can cue test-taking instead of knowledge. |
| 7 | note | generic-wording | `mc_l12_condition_filter_he_manual_001` | mc | manual | `lesson_12::סינון לפי תנאי` | Option 2 uses broad wording that can cue test-taking instead of knowledge. |
| 8 | note | one-character-answer | `fill_l12_index_manual_002` | fill | manual | `lesson_12::index` | One-character fill answer can be ambiguous without a strong hint. |
| 9 | note | one-character-answer | `fill_l12_index_manual_001` | fill | manual | `lesson_12::index` | One-character fill answer can be ambiguous without a strong hint. |
| 10 | note | one-character-answer | `fill_l12_condition_filter_he_manual_002` | fill | manual | `lesson_12::סינון לפי תנאי` | One-character fill answer can be ambiguous without a strong hint. |
| 11 | note | length-cue | `mc_l12_foreach_manual_002` | mc | manual | `lesson_12::forEach` | Option length spread is high (1..29); check that the correct answer is not visually cued. |
| 12 | note | generic-wording | `mc_l12_filter_manual_001` | mc | manual | `lesson_12::filter` | Option 2 uses broad wording that can cue test-taking instead of knowledge. |
| 13 | note | generic-wording | `mc_l12_map_manual_003` | mc | manual | `lesson_12::map` | Option 2 uses broad wording that can cue test-taking instead of knowledge. |
| 14 | note | generic-wording | `mc_l12_create_from_existing_he_manual_003` | mc | manual | `lesson_12::יצירת מערך חדש מתוך קיים` | Option 2 uses broad wording that can cue test-taking instead of knowledge. |
| 15 | note | generic-wording | `mc_l12_spread_manual_003` | mc | manual | `lesson_12::spread` | Option 2 uses broad wording that can cue test-taking instead of knowledge. |
| 16 | note | one-character-answer | `fill_l12_array_manual_002` | fill | manual | `lesson_12::array` | One-character fill answer can be ambiguous without a strong hint. |
| 17 | note | generic-wording | `mc_l12_index_manual_003` | mc | manual | `lesson_12::index` | Option 2 uses broad wording that can cue test-taking instead of knowledge. |

## Strict Policy

- `--strict` fails only on blocker-level issues.
- Warnings and notes are review/remediation work; they are intentionally visible but non-blocking until promoted by policy.

