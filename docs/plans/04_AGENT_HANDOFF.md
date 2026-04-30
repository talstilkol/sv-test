# Agent Handoff Prompt

Updated: 2026-04-30

Use this prompt for Kimi 2.6 or any other agent continuing the work.

```text
You are continuing LumenPortal after the documentation cleanup.

Repo:
/Users/tal/Desktop/חומרים לשיעור

First read:
1. docs/plans/00_CANONICAL_INDEX.md
2. docs/plans/01_FINISH_LINE_1.md
3. docs/plans/02_MANUAL_CONTENT_GOVERNANCE.md
4. EXECUTION_TASKS.md
5. MASTER_PLAN.md

Rules:
- Never use Math.random() in code.
- No fake data, placeholders or invented metrics.
- Do not generate automatic questions.
- Do not re-enable seeded/generated question banks.
- Do not start museum/store/community before Finish Line 1 is green.
- Run git status before edits.
- Do not mark anything DONE without current gate/test evidence.

Current truth:
- Finish Line 1 has 17/18 pre-release gates passing.
- The remaining blocker is questions:coverage-targets:strict.
- Manual question coverage must be completed by human-authored and human-reviewed MC/Fill questions.
- The active batch plan is MANUAL_QUESTION_AUTHORING_PLAN.md.

Recommended next step:
Continue manual question authoring batches, or start the P1 security inventory only if the user explicitly redirects away from question coverage.

Required end-of-batch checks:
npm run validate:strict
npm run qa:questions:strict
npm run svcollege:readiness:release
npm run svcollege:tab-matrix:strict
npm run svcollege:command-center:strict
npm run svcollege:student-export:strict
npm test -- --run
npm run build
rg -n "Math\\.random" app.js src scripts tests data --glob '!output/**'
```

