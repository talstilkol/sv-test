# Seeded Question Promotion Policy

Date: 2026-04-30

As of 2026-04-30, seeded/generated questions are legacy draft material only. They do not support live learner-facing coverage and cannot close readiness, density or release gates.

Automatic question generation is forbidden. The former generator was deleted; any useful legacy item must be rewritten or copied into a curated bank only after manual review.

## Promotion Inputs

| Evidence | Required before promotion |
|---|---|
| Repository validation | `validate:strict`, `qa:questions:strict`, reuse audit and question quality checks pass |
| Reviewer proof | Correct answer verified, explanation matches, prerequisites covered, Hebrew is clear |
| Learner outcome | Real answer history shows the item helps mastery or diagnosis |
| Misconception repair | Wrong answers map to a repair path or prerequisite rewind |
| Source trace | Item keeps stable id, `conceptKey`, source and reviewer notes |

## Promotion Rule

A legacy seeded question can move to the hand-curated bank only when:

1. It has no duplicate identity in `questions:reuse-audit:strict`.
2. It passes the reviewer checklist without unresolved fields.
3. It has explicit human review evidence. Real learner outcome evidence may support the decision but cannot replace manual review.
4. It does not leak the answer in the prompt, hint or distractors.
5. It is needed for an exam-critical density, proof or misconception gap.

If any required evidence is missing, the status remains `unknown/unavailable` and the question is not promoted.

## Boundaries

- Do not promote by script-only coverage pressure.
- Do not invent reviewer notes, student attempts or outcome wins.
- Do not load seeded/generated items into learner-facing flows.
- Do not make seeded-only coverage a quality target at any time.
