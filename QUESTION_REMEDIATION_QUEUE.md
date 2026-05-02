# Question Remediation Queue — 2026-04-28

> **Historical / Superseded**: this artifact is older than the current source-of-truth run.
> Captured on: 2026-04-28
> Source-of-truth refresh date: 2026-05-01
> Use `npm run report:source-of-truth:write` to regenerate current artifacts before making live claims.


Deterministic rewrite pipeline for flagged MC/Fill items. The script does not invent replacement content; every row must be fixed from verified course material and then manually reviewed.

## Summary

- Total queued issues: 0
- Batches: 0 batches of 25
- Auto rewrite: no
- Manual review required: yes

### By Severity

- None

### By Action

- None

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


