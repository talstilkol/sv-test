# Portal Boundary Report — 2026-04-29

> **Historical / Superseded**: this artifact is older than the current source-of-truth run.
> Captured on: 2026-04-29
> Source-of-truth refresh date: 2026-05-01
> Use `npm run report:source-of-truth:write` to regenerate current artifacts before making live claims.


- Target: SVCollege AI & Full Stack portal boundary
- Policy: Future school mappings are separate portal specs; this active portal remains SVCollege AI & Full Stack.
- Ready: Yes
- Checks: 6/6

| Check | Status | Detail |
|---|---|---|
| Only one primary course blueprint | pass | Found 1 primary blueprint declarations. |
| Primary blueprint is SVCollege AI & Full Stack | pass | Primary blueprint must stay svcollege_fullstack_ai. |
| No active non-SVCollege provider | pass | SVCollege provider declarations: 1. |
| Top navigation keeps SVCollege alignment explicit | pass | The active alignment UI must name SVCollege AI & Full Stack. |
| Boundary policy document exists | pass | PORTAL_BOUNDARY_POLICY.md must define the split rule. |
| Exam Edition freeze remains wired | pass | Exam Edition freeze script must remain available. |


