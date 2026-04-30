# Question Quality Report — 2026-04-30

Full-bank deterministic QA for MC and Fill questions. This report creates a `questionQuality` object for every question id and a remediation queue for warnings and notes.

## Summary

- Total questions: 430
- Mix: 235 MC, 195 Fill
- Source mix: 430 manual
- Clean: 430
- Notes only: 0
- Warning questions: 0
- Blocker questions: 0
- Issue counts: 0 blockers, 0 warnings, 0 notes
- Question Quality Index: 100% warning-free

## Gates Covered

- MC: duplicate options, near-duplicate distractors, length-cue risk, generic wording, missing explanation, missing conceptKey.
- Fill: blank count, missing answer/code/explanation/hint, visible answer leakage, one-character ambiguity, missing conceptKey.

## Remediation Queue

Showing first 0 of 0 queued issues.

| # | Severity | Code | ID | Kind | Source | Concept | Message |
|---:|---|---|---|---|---|---|---|

## Strict Policy

- `--strict` fails only on blocker-level issues.
- Warnings and notes are review/remediation work; they are intentionally visible but non-blocking until promoted by policy.

