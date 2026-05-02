# Content Schema Contract Report — 2026-04-29

> **Historical / Superseded**: this artifact is older than the current source-of-truth run.
> Captured on: 2026-04-29
> Source-of-truth refresh date: 2026-05-01
> Use `npm run report:source-of-truth:write` to regenerate current artifacts before making live claims.


- Contract version: content-schema-contract-v1
- Ready: Yes
- Checks: 9/9

| Check | Status | Detail |
|---|---|---|
| contract-versioned | pass | Contract must expose a stable version. |
| required-entities | pass | Contract must define: Lesson, Concept, MCQuestion, FillQuestion, TraceQuestion, BugQuestion, BuildQuestion. |
| lesson-concept-fields | pass | Lesson and Concept must keep stable identity and difficulty fields. |
| question-fields | pass | MC and Fill question contracts must expose routing, prompt and answer fields. |
| code-practice-fields | pass | Trace, Bug and Build contracts must support code-proof routing. |
| documented | pass | CONTENT_SCHEMA_CONTRACT.md must document entities and gates. |
| strict-gates-wired | pass | Schema contract must be backed by strict validation scripts. |
| validator-fields | pass | validate_bank.js must enforce core question field invariants. |
| prerequisite-and-density-gates | pass | QA and coverage gates must enforce prerequisite and density contracts. |


