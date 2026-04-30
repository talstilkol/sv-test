# SVCollege Pilot Readiness Plan

Updated: 2026-04-29

This plan defines the first production pilot for 10-30 real students. It does not include pilot results yet; missing results stay `unknown/unavailable` until measured.

## Cohort

- Target size: 10-30 active SVCollege AI & Full Stack learners.
- Entry requirement: learner can access the portal, create or select a local profile, and complete the baseline test.
- Data rule: no fabricated usage, score, retention, or feedback values.

## Timeline

| Day | Activity | Evidence |
|---|---|---|
| D0 | Baseline test and profile setup | baseline score, weak concepts, selected module |
| D1 | First retention check | D1 return event, practice activity, student-stuck count |
| D7 | Retention + module mastery review | D7 return event, mastery by SVCollege module, wrong-answer recovery |
| D14 | Final test and qualitative feedback | final exam score, module mastery delta, teacher feedback review |

## Baseline Test

The baseline test must cover the active SVCollege modules already in the portal: JavaScript, DOM, React, async, Node, Express/REST, Mongo/SQL, Auth, Next.js, DevOps, AI engineering, design systems and bridge topics.

Required fields per student:

- Student alias or local profile id.
- Baseline test date.
- Baseline score.
- Top 5 weak concept keys.
- Self-reported confidence.

## Two-Week Use Protocol

- Students study only through real lesson, trainer, trace, bug hunt, mini build, flashcards and mock exam flows.
- Teachers avoid manual score editing during the pilot.
- Every stuck moment should use the `נתקעתי` button or the support report flow.
- Support reports should include route, active tab, lesson, concept and screenshot status when available.

## Rollback SOP

- Keep the previous build and previous cache version available until the pilot week is reviewed.
- If a release blocks learning, pause the pilot feature, restore the previous build, and ask students to export local progress before retrying sync.
- Do not backfill missing pilot metrics after rollback; missing D1/D7, mastery or support evidence remains `unknown/unavailable`.

## Final Test

Final test must run after the two-week use period and should be comparable to the baseline by module mix.

Required outcome fields:

- Final score.
- Module mastery average.
- D1 and D7 retention status.
- Wrong-answer recovery signal.
- Repeated misconception count.
- Qualitative feedback review.

## Promotion Rule

The pilot can be promoted only when the existing release gates stay green and first-user evidence is present:

- `npm run validate:strict`
- `npm run qa:questions:strict`
- `npm run svcollege:readiness:release`
- `npm run svcollege:tab-matrix:strict`
- `npm run svcollege:command-center:strict`
- `npm run svcollege:student-export:strict`
- `npm test -- --run`
- `npm run build`
- At least one real feedback review is recorded.

## Current Pilot Results

Status: `unknown/unavailable`

Reason: the 10-30 student pilot has not been run yet in this repository evidence.
