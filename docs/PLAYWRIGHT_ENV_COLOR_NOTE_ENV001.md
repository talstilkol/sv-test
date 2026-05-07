# ENV-001 - Playwright Environment Color Warning

## Status

- Completed as documentation-only cleanup.
- Search scope found no active project assignment of `NO_COLOR` or `FORCE_COLOR` in `package.json`, Playwright config, scripts, tests, or docs except the task-board row itself.
- Decision: no product code change is needed.
- If the warning appears again, treat it as shell/CI environment drift and set only one of `NO_COLOR` or `FORCE_COLOR` in the invoking environment, not both.

## Policy

| Environment state | Action |
| --- | --- |
| `NO_COLOR` only | Accept; disables colored output. |
| `FORCE_COLOR` only | Accept; forces colored output. |
| Both set together | Remove one variable from the shell/CI command before running Playwright. |
| Neither set | Accept; Playwright/tool defaults decide output color. |
