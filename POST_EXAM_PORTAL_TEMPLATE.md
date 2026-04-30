# Post-Exam Portal Template

Date: 2026-04-30

This template is the contract for any future portal created after SVCollege Exam Edition. It keeps the active SVCollege portal stable and moves other course mappings into separate specs.

## Required Sections

| Section | Required evidence |
|---|---|
| Curriculum blueprint | Provider, course id, release goal, module list, lesson ids, active/deferred status |
| Concept tags | Canonical `lessonId::conceptName` keys, aliases, prerequisite links, exam-critical flag |
| Question banks | MC, Fill, Trace, Bug and Build pools with stable ids and `conceptKey` routing |
| Proof gates | Mastery proof, code proof, recent review, no-repeat routing and stuck-feedback path |
| Tabs | Lesson, trainer, study, mock exam, trace, bug hunt, mini build, learning evidence |
| Smoke tests | Readiness, tab matrix, command center, student export, strict QA and build |

## Rules

- A future course starts as a separate portal spec, not as active navigation inside SVCollege Exam Edition.
- A portal cannot become active until it has curriculum blueprint, concept tags, question banks, proof gates, tabs and smoke tests.
- Missing source evidence stays `unknown/unavailable`.
- No fabricated lesson rows, questions, answers, concept tags, screenshots, metrics or student outcomes are allowed.
- Exam-critical knowledge must stay visible in the core learning path for that portal.

## Minimum Gate Set

- `npm run validate:strict`
- `npm run qa:questions:strict`
- `npm run svcollege:readiness:release` or the equivalent readiness gate for the new portal
- `npm run svcollege:tab-matrix:strict` or the equivalent tab matrix gate for the new portal
- `npm run svcollege:command-center:strict` or the equivalent command center gate for the new portal
- `npm run svcollege:student-export:strict` or the equivalent learner export gate for the new portal
- `npm test -- --run`
- `npm run build`
