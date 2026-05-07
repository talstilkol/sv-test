# Qwen Training Scorecard

Copy one row per run. Passing standard: 90+ in three consecutive full simulations.

| Date | Day | Target folder | Contract | Project /70 | JS /20 | TS /10 | Total | Guard ready | Build ran | Manual UI/API ran | Top failure |
|---|---:|---|---|---:|---:|---:|---:|---|---|---|---|
|  | 1 |  | none |  |  |  |  |  |  |  |  |
|  | 2 |  | none |  |  |  |  |  |  |  |  |
|  | 3 |  | none |  |  |  |  |  |  |  |  |
|  | 4 |  | none |  |  |  |  |  |  |  |  |
|  | 5 |  | none |  |  |  |  |  |  |  |  |
|  | 6 | output/qwen-coder-next/day-06 | sv-library-contract.json |  |  |  |  |  |  |  |  |
|  | 7 | output/qwen-coder-next/day-07 | sv-library-contract.json |  |  |  |  |  |  |  |  |
| 2026-05-05 | 6 runtime + Day 7 repair | output/qwen-coder-next/rerun-02/day-06/materialized-project | sv-library-contract.json | 35 | 20 | 10 | 65 | true | failed | failed | Day 7 created index.html with /src/main.js instead of main.jsx; backend still has no package.json/dependencies so express cannot load. |

## Run Notes Template

```text
Run:
Target:
Prompt used:
Contract:

Commands run:
-

Manual checks run:
-

Score:
- Project:
- JS:
- TS:
- Total:

Blocking failures:
1.
2.
3.

Next run focus:
1.
2.
3.
```
