# Question Quality Report — 2026-04-30

Full-bank deterministic QA for MC and Fill questions. This report creates a `questionQuality` object for every question id and a remediation queue for warnings and notes.

## Summary

- Total questions: 450
- Mix: 247 MC, 203 Fill
- Source mix: 450 manual
- Clean: 443
- Notes only: 7
- Warning questions: 0
- Blocker questions: 0
- Issue counts: 0 blockers, 0 warnings, 8 notes
- Question Quality Index: 100% warning-free

## Gates Covered

- MC: duplicate options, near-duplicate distractors, length-cue risk, generic wording, missing explanation, missing conceptKey.
- Fill: blank count, missing answer/code/explanation/hint, visible answer leakage, one-character ambiguity, missing conceptKey.

## Remediation Queue

Showing first 8 of 8 queued issues.

| # | Severity | Code | ID | Kind | Source | Concept | Message |
|---:|---|---|---|---|---|---|---|
| 1 | note | generic-wording | `mc_l12_index_manual_003` | mc | manual | `lesson_12::index` | Option 4 uses broad wording that can cue test-taking instead of knowledge. |
| 2 | note | generic-wording | `mc_l12_array_manual_001` | mc | manual | `lesson_12::array` | Option 2 uses broad wording that can cue test-taking instead of knowledge. |
| 3 | note | one-character-answer | `fill_l12_index_manual_002` | fill | manual | `lesson_12::index` | One-character fill answer can be ambiguous without a strong hint. |
| 4 | note | one-character-answer | `fill_l12_index_manual_001` | fill | manual | `lesson_12::index` | One-character fill answer can be ambiguous without a strong hint. |
| 5 | note | generic-wording | `mc_l12_filter_manual_001` | mc | manual | `lesson_12::filter` | Option 2 uses broad wording that can cue test-taking instead of knowledge. |
| 6 | note | generic-wording | `mc_l12_map_manual_003` | mc | manual | `lesson_12::map` | Option 2 uses broad wording that can cue test-taking instead of knowledge. |
| 7 | note | one-character-answer | `fill_l12_array_manual_002` | fill | manual | `lesson_12::array` | One-character fill answer can be ambiguous without a strong hint. |
| 8 | note | generic-wording | `mc_l12_index_manual_003` | mc | manual | `lesson_12::index` | Option 2 uses broad wording that can cue test-taking instead of knowledge. |

## Strict Policy

- `--strict` fails only on blocker-level issues.
- Warnings and notes are review/remediation work; they are intentionally visible but non-blocking until promoted by policy.

