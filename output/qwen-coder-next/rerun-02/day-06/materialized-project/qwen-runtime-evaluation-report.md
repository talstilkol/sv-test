# Qwen Runtime Evaluation Report

- Target: `output/qwen-coder-next/rerun-02/day-06/materialized-project`
- Score: 65/100
- Ready: no

| Status | Check | Points | Detail |
|---|---|---:|---|
| pass | Materialized project has files | 10/10 | 19 files found. |
| pass | No native random API or fabricated data markers | 15/15 | No forbidden markers found. |
| pass | Static contract guard passes | 25/25 | 11/11 guard checks passed. |
| pass | Backend/script JavaScript passes node --check | 15/15 | 3 files checked. |
| fail | Package install/build checks pass when requested | 0/20 | 1/2 package commands passed. |
| fail | Backend GET smoke checks pass when requested | 0/15 | GET /: fetch failed; GET /api/books: fetch failed; GET /api/books/:id: fetch failed |

## Blockers

- package-build: 1/2 package commands passed.
- backend-smoke: GET /: fetch failed; GET /api/books: fetch failed; GET /api/books/:id: fetch failed
