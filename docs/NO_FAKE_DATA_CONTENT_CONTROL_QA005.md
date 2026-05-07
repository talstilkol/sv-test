# QA-005 - No Fake Data Content Control

## Status

- Completed: content-control ledger for the remediation work performed in `QA-001`, `QA-002`, `QA-003`, and `QA-004`.
- Scope: question hints, MC option-length remediation, actionable/raw distractor remediation, and deferred distractor classification.
- Rule: no fabricated facts, no invented links, no invented exam sources, no invented APIs, and no `Math.random()`.
- Missing or unsafe source data is left as `unknown/unavailable` or `deferred`.
- No automated validation was run in this step.

## Control Decisions

| Area | Source of truth | Allowed action | Blocked action | Result |
| --- | --- | --- | --- | --- |
| `QA-001` Fill hints | Existing question body, answer, and local question context | Add short manual hints that point to the already-existing expected answer path | Invent new facts, new answer requirements, or external references | Closed with manual hint remediation batches |
| `QA-002` option length | Existing MC options and `correctIndex` | Balance option wording while preserving the correct answer index | Replace answer key, add unsupported concepts, or fabricate source material | Closed with option-length remediation batches |
| `QA-003` actionable/raw distractors | Existing MC options, feedback, and gate queue IDs | Improve distractor clarity and feedback while preserving `correctIndex` | Change correct answer semantics or generate unsupported distractors | Closed with actionable/raw remediation batches |
| `QA-004` deferred distractors | `DISTRACTOR_REMEDIATION_QUEUE.json` and `DISTRACTOR_EXAM_GATE_REPORT.json` | Classify as `deferred` with reason when source evidence is insufficient | Auto-rewrite 421 deferred items without source-backed evidence | Closed as deferred classification ledger |

## Evidence Files

| Evidence | Purpose |
| --- | --- |
| `docs/QUESTION_HINT_REMEDIATION_BATCHES.md` | Batch ledger for `QA-001` hint remediation |
| `docs/DISTRACTOR_OPTION_LENGTH_BATCHES.md` | Batch ledger for `QA-002` option-length remediation |
| `docs/DISTRACTOR_ACTIONABLE_REMEDIATION_BATCHES.md` | Batch ledger for `QA-003` actionable/raw remediation |
| `docs/DISTRACTOR_DEFERRED_CLASSIFICATION_QA004.md` | Full deferred classification ledger for `QA-004` |

## Acceptance Record

| Requirement | Status | Note |
| --- | --- | --- |
| Every content change has a local evidence path | complete | Evidence files above record the remediation source and action type. |
| No fake data | complete | Missing or unsafe content was not invented; unsafe items remain `deferred`. |
| No answer-key drift | complete | MC remediation policy preserves `correctIndex`. |
| No unsupported external links | complete | No external links were added as part of these QA batches. |
| No `Math.random()` | complete | No randomness was introduced in the content-control work. |
