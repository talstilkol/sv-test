# Content Factory Pipeline Report — 2026-04-30

> **Historical / Superseded**: this artifact is older than the current source-of-truth run.
> Captured on: 2026-04-30
> Source-of-truth refresh date: 2026-05-01
> Use `npm run report:source-of-truth:write` to regenerate current artifacts before making live claims.


- Target: SVCollege content factory pipeline
- Policy: Author questions manually, then pass validation, QA, distractor review, prerequisite metadata and reuse gates. Automatic question generation is forbidden.
- Ready: Yes
- Checks: 8/8

| Check | Status | Detail |
|---|---|---|
| Automatic question generation tools are removed | pass | No npm script may invoke a deleted automatic question generator. |
| Strict bank validation is wired | pass | validate:strict must remain the schema/density gate. |
| Question QA gate is wired | pass | qa:questions:strict must keep prerequisite and no-fake-data policy. |
| Distractor review is wired | pass | Distractor review must sample deterministically and detect bad options. |
| Remediation queue requires manual review | pass | Flagged items must go through manual review, not auto-fabricated rewrites. |
| Prerequisite metadata gate is wired | pass | Lesson quiz keys keep question metadata connected to concept paths. |
| Question reuse audit is wired | pass | Learner-profile question reuse must stay audited. |
| Pipeline policy document exists | pass | CONTENT_FACTORY_PIPELINE.md must document creation, QA, distractor review and prerequisite metadata. |


