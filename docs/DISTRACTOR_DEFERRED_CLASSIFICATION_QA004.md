# QA-004 - Deferred Distractor Classification

## Status

- Completed: 0/421 deferred distractor items classified.
- Decision: all listed items remain `deferred` until manual source-backed content rewriting is available.
- Product gate context: `examCriticalFlaggedQuestions=0`, `ready=true`.
- Safety rule: no generated wording, no fake data, no answer-key changes, no `correctIndex` changes.
- Missing values are written as `unknown/unavailable`.

## Classification Policy

| Class | Action | Reason |
| --- | --- | --- |
| deferred | Keep current question text unchanged | The issue requires semantic judgement about distractor quality/length and cannot be corrected safely without source evidence. |
| source-required | Manual review only | If the original lesson/exam source proves a better distractor wording, update manually in a separate content batch. |
| no-release-blocker | No immediate product block | Current gate report has zero exam-critical distractor failures. |

## Issue Summary

| Issue | Count | Status | Reason |
| --- | ---: | --- | --- |
| unknown/unavailable | 0 | deferred | unknown/unavailable |

## Full Deferred Item Ledger

| # | Question ID | Concept | Issue | Priority | Status | Deferred Reason | Source |
| ---: | --- | --- | --- | --- | --- | --- | --- |
| 0 | `unknown/unavailable` | unknown/unavailable | unknown/unavailable | unknown/unavailable | deferred | unknown/unavailable | unknown/unavailable |
