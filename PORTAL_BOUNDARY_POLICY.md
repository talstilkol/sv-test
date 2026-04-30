# Portal Boundary Policy — SVCollege Exam Edition

Date: 2026-04-29

This repository is frozen as the SVCollege AI & Full Stack exam-prep portal.

## Active Scope

- Active curriculum: SVCollege AI & Full Stack.
- Active release tag: `svcollege-exam-edition-2026-04-29`.
- Active goal: exam preparation, concept mastery, proof gates, and local learner progress.

## Boundary Rules

- Future school mappings must be specified as separate portal specs, not mixed into this active portal.
- Exam-critical SVCollege content cannot be displaced by museum, store, community, premium, or unrelated course expansion.
- Secondary course blueprints may exist only as deferred specs with no active navigation, no primary release gate, and no learner-path routing.
- Any new active provider must fail `portal:boundary:strict` until it is split into its own portal.

## Current Evidence

- `data/course_blueprints.js` has one primary blueprint: `svcollege_fullstack_ai`.
- The top navigation exposes `יישור SVCollege`.
- `EXAM_EDITION_RELEASE_FREEZE.md/json` freezes the current Exam Edition evidence bundle.
