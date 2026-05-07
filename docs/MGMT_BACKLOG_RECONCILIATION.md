# MGMT-001/002/003 - Backlog and Status Reconciliation

## Status

- `MGMT-001`: complete. All 8 active `real-open` backlog items are mapped to a concrete remaining task or evidence path.
- `MGMT-002`: complete. Active drift is documented as `5 NOT DONE` and `3 PARTIAL`; raw legacy counts remain historical only.
- `MGMT-003`: complete. Weekly report wording now uses the live `real-open` count instead of stale hard-coded `130` or `21` text.
- No fake data was added. Items without closure evidence remain assigned to validation/final tasks instead of being marked done.

## Active Backlog Summary

| Metric | Current value | Meaning |
| --- | ---: | --- |
| Active real-open | 8 | Items still requiring either final validation evidence or explicit deferral. |
| Active NOT DONE | 5 | Real-open items with no complete closure evidence yet. |
| Active PARTIAL | 3 | Real-open items with partial implementation but missing final closure evidence. |
| Raw legacy NOT DONE | 263 | Historical source-document count, not active release backlog. |
| Raw legacy PARTIAL | 10 | Historical source-document count, not active release backlog. |

## Real-open Item Mapping

| # | ID | Active status | Current disposition | Evidence / remaining owner |
| ---: | --- | --- | --- | --- |
| 1 | `BUG-AUDIT-005` | NOT DONE | Assigned to remaining regression closure | `REM-009` + `FINAL-001` must provide final regression evidence after app.js extraction work. |
| 2 | `P3.10.3` | PARTIAL | Assigned to remaining regression closure | Module extraction slices are implemented; `REM-009` must provide final regression evidence. |
| 3 | `AUDIT-FIX-28` | PARTIAL | Assigned to remaining regression closure | Vite cleanup work is implemented; `REM-009` must provide build/dev/preview regression evidence when tests are allowed. |
| 4 | `AUDIT-FIX-29` | PARTIAL | Assigned to remaining regression closure | TypeScript/view contract work is implemented; `REM-009` must provide final regression evidence. |
| 5 | `EXECUTION_TASKS.md:185` | NOT DONE | Assigned to content-gate closure | `QA-005` created the no-fake-data ledger; `QA-006` must provide quality-gate evidence when tests are allowed. |
| 6 | `EXECUTION_TASKS.md:188` | NOT DONE | Assigned to content-gate closure | `QA-005` covers policy; `QA-006` must provide Fill/MC quality-gate evidence when tests are allowed. |
| 7 | `EXECUTION_TASKS.md:210` | NOT DONE | Assigned to final manual runtime closure | `FINAL-001` must provide the final manual/runtime pass when tests are allowed. |
| 8 | `EXECUTION_TASKS.md:235` | NOT DONE | Assigned to remaining regression closure | Duplicate architecture closure concern; owner is `REM-009` + `FINAL-001`. |

## Drift Resolution

| Drift source | Resolution |
| --- | --- |
| `5 NOT DONE` active items | Kept active and mapped to concrete remaining tasks instead of being hidden. |
| `3 PARTIAL` active items | Kept active and mapped to final evidence tasks instead of being overclaimed as complete. |
| Raw historical `263 NOT DONE` | Preserved only as legacy traceability; not used as active release backlog. |
| Raw historical `10 PARTIAL` | Preserved only as legacy traceability; not used as active release backlog. |

## Weekly Report Fix

The weekly report must not hard-code stale counts such as `130 real-open` or `21 real-open`. It now formats the next action from the live `backlogClassSummary["real-open"]` value.
