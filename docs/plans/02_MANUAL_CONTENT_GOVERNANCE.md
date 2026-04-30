# Manual Content Governance

Updated: 2026-04-30

## Non-Negotiable Policy

All questions and learning material must be authored manually and reviewed manually. The system must not generate questions automatically.

Deleted or disabled mechanisms must remain disabled:

- `scripts/seed_questions.js`
- `scripts/audit_seeded_questions.js`
- `tests/seeded-qa.test.js`
- runtime fallback question generation
- loading `data/questions_bank_seeded.js` into the active app

`data/questions_bank_seeded.js` is legacy archive only if it still exists. It is not a source of release readiness.

## Active Guards

Use these gates to prevent regression:

```bash
npm run guard:no-auto-questions
npm run questions:blocker-map:strict
npm run questions:coverage-targets:strict
npm run questions:reuse-audit:strict
```

## Authoring Rules

Each MC question must include:

- real `conceptKey`
- clear question text
- exactly one correct answer
- plausible distractors
- explanation
- per-option feedback
- level/challenge metadata

Each Fill question must include:

- real `conceptKey`
- one clear blank
- one expected answer
- hint that does not leak the answer
- explanation
- code only when the lesson material justifies it

## Review Rules

Do not mark a batch DONE unless:

- every question was manually reviewed against the source lesson
- no generated/seeded source was used as final content
- `option_feedback.js` covers new MC distractors
- `questions:coverage-targets:strict` gap count decreases or stays honestly blocked
- the batch owner/reviewer is real, or remains `unknown/unavailable`

