# Weekly Portal Status

Generated: 2026-05-06T16:47:50.024Z

## Snapshot

- ready: true
- portal gates: 31/31
- portal score: 100/100
- system health: 99.9
- regressions: 0
- task completion: 100%
- time completion: 100%
- remaining time: 0 דק׳
- active task: אין

## Regressions

| Area | Status | Detail | Source | Fix |
| --- | --- | --- | --- | --- |
| none | green | no active regression | live reports | keep gates running after each change |

## Quality Debt

| Area | Current | Target | Source | Next action |
| --- | --- | --- | --- | --- |
| Master plan operational backlog | 8 real-open | 0 real-open items or explicit deferral evidence | BRUTAL_MASTER_PLAN_AUDIT.json | Close or defer the 130 real-open items with evidence. |
| Legacy plan status drift | 5 active NOT DONE, 3 active PARTIAL; raw legacy 263 NOT DONE, 10 PARTIAL | Active drift only; raw legacy marks remain traceable but not release-blocking after evidence classification | BRUTAL_MASTER_PLAN_AUDIT.json | Work the 21 real-open items; preserve raw legacy counts for traceability until the old documents are manually rewritten. |
| Question quality notes | 0 notes, 0 active advisory, 534 deferred | <250 active advisory now, deferred remains visible outside the Exam100 release path | QUESTION_QUALITY_REPORT.json | Keep active advisory at zero and handle deferred non-exam-core hints/length balancing after the release-critical gates. |
| Exam-core question quality | 0 notes, 0 warnings | 0 exam-core notes/warnings/blockers | QUESTION_QUALITY_REPORT.json | Keep exam-core at zero while editing non-core questions. |
| Distractor actionable quality | 104 / 2998 (3.5%) | <10% actionable, then <5% | DISTRACTOR_EXAM_GATE_REPORT.json | Reduce the remaining actionable distractor queue without changing verified exam-core answers. |
| Distractor advisory/raw debt | 0 advisory, 104 active raw (3.5%), 421 deferred | Active raw <12%, advisory <250; deferred remains visible outside the Exam100 release path | DISTRACTOR_EXAM_GATE_REPORT.json | Keep deferred non-exam length-only items visible and only promote them when they become exam-critical or user-facing blockers. |
| Manual review locked sections | 4 sections locked | Manual source review completed, no invented code | EXAM_TASK_BOARD_REPORT.json | Review the original source for the locked sections and only then unlock or keep locked. |
| Optional backlog in task board | 4 optional items | Optional backlog reviewed after Exam100 release | EXAM_TASK_BOARD_REPORT.json | Keep optional items non-blocking unless they become visible exam requirements. |

## Remaining Time

| Metric | Value |
| --- | --- |
| Closed tasks | 11/11 |
| Task completion | 100% |
| Time completion | 100% |
| Closed time | 26 שעות 30 דק׳ |
| Remaining time | 0 דק׳ |
| Total plan time | 26 שעות 30 דק׳ |
| Active task | אין |
