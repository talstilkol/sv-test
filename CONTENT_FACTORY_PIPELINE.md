# Content Factory Pipeline

Date: 2026-04-30

This is the post-exam content quality pipeline for SVCollege AI & Full Stack.

## Pipeline

1. Author questions manually in `data/questions_bank.js` or curated SVCollege activity files.
   Automatic question generators are forbidden and `scripts/seed_questions.js` has been deleted.
2. Validate bank density and schema:
   `npm run validate:strict`
3. Run question QA with SVCollege prerequisite gates:
   `npm run qa:questions:strict`
4. Run distractor review:
   `npm run audit:distractors`
5. Build remediation queue:
   `npm run quality:remediation:strict`
6. Verify prerequisite metadata:
   `npm run qa:lesson-quiz-keys:strict`
7. Verify learner-profile reuse:
   `npm run questions:reuse-audit:strict`

## Rules

- No fake questions.
- No placeholder source rows.
- No automatic question generation. Tools may create audit queues only; they must never write question text, answers, options, examples or generated banks.
- Every learner-facing question must be manually written and manually reviewed before it can count as production coverage.
- Remediation rows require manual review before content is considered production-ready.
- Prerequisite metadata is mandatory for exam-critical question paths.
