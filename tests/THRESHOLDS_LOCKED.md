# Locked Test Thresholds

This file tracks numeric thresholds in tests that were **softened** during a release sprint to keep CI green. Every entry here must justify *why* the bar moved and what would let it move back up.

**Rule:** if you find yourself lowering a `toBeGreaterThanOrEqual`, raising a `toBeLessThanOrEqual`, or growing a budget, add an entry here in the same PR. The pre-commit hint (`scripts/check_threshold_drift.js`) will warn you.

---

## Currently softened

### `tests/question-activity-authoring-plan.test.js`
| Field | Original | Current | Reason |
|---|---:|---:|---|
| `summary.totalGaps >= ?` | 220 | 25 | 2026-05-04. Phase 2 closed 159 of 195 gaps. Tightened from 10 → 25 to catch regressions (real current value 36). |

**Restore-up condition:** when all 36 remaining gaps close (Tailwind + Next/Nest + workbook + react_blueprint concepts authored), drop this assertion entirely (test for `ready === true`).

### `scripts/report_performance_budget.js`
| Field | Original | Current | Reason |
|---|---:|---:|---|
| `BUDGETS["app.js"]` | 1,700,000 | 1,800,000 | 2026-05-05. P2 features (teacher local analytics, community notes, teacher preview) grew app.js to 1,750,223 bytes. Budget raised 1.75MB → 1.8MB. Restore-down when app.js is split into modules. |

**Restore-down condition:** Phase B Tech Debt task "Split app.js into modules" — once the monolith is split, app.js itself should drop below 1MB.

---

## How to use

```bash
# Show every threshold currently softened
cat tests/THRESHOLDS_LOCKED.md

# Run drift check (used by pre-commit + CI)
node scripts/check_threshold_drift.js
```

When a threshold needs to move:

1. **Tightening (good):** edit the test/script, run tests, update the `Current` column. If a row reaches its `Original`, delete it.
2. **Softening (yellow flag):** edit the test, **then** add or update a row here in the SAME commit. PR description must explain why softening is the right move (vs. fixing the regression).

## Drift watcher

`scripts/check_threshold_drift.js` (called from a pre-commit hook + CI) scans test files for `toBeGreaterThanOrEqual(N)` and `toBeLessThanOrEqual(N)` calls, plus the `BUDGETS` object in `report_performance_budget.js`. If any value moves DOWN (>=) or UP (<=) versus a baseline file, the hook prints a warning and asks you to update this file.

The baseline is `tests/.threshold-baseline.json`, regenerated whenever this file is updated.
