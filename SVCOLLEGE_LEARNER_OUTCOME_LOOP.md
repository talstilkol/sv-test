# SVCollege Real Learner Outcome Loop

Target: SVCollege AI & Full Stack only.

## 10-Student Pilot Protocol

Run this pilot only with real learners. Do not invent completion, retention or satisfaction data.

| Step | Timing | Evidence |
|---|---|---|
| Recruit cohort | Before D0 | 10 consenting students, anonymized local profile per student |
| Baseline exam | D0 | SVCollege mock exam score, weak modules, unanswered modules |
| Guided use | D0-D7 | Local learning evidence events, answer history, weak-concept repair |
| Retention check | D1 | At least one learning event after baseline day |
| Final exam | D7 | SVCollege mock exam score, module mastery, recovery metrics |
| Qualitative review | D7 | Reviewed `student_stuck` events and short learner feedback |

If a real source is missing, mark it `unknown/unavailable`; do not backfill it.

## Required Metrics

| Metric | Definition | Source |
|---|---|---|
| D1 retention | Student has at least one learning event on baseline day + 1 | `lumenportal:learningEvidence:v1` |
| D7 retention | Student has at least one learning event on baseline day + 7 | `lumenportal:learningEvidence:v1` |
| Module mastery | Mastered concepts divided by mapped concepts per SVCollege module | local score state + SVCollege module filters |
| Wrong-to-correct recovery | Average seconds from wrong answer to next correct answer in the same concept | answer events |
| Repeated misconception rate | Repeated wrong answers before correction divided by all wrong answers | answer events |
| Student got stuck count | Number of `student_stuck` feedback events | feedback button |

## Student Got Stuck Feedback

Every question prerequisite panel now includes a `נתקעתי` feedback button. The event records structured metadata only:

- current lesson id
- current question id
- focused concept keys
- prerequisite concept keys
- glossary terms detected in the question
- viewport width, height, pixel ratio and orientation

It does not store free-form answer text or personal identifiers.

## Promotion Rule

A module is `ready-for-students` only when all five gates pass:

| Gate | Required evidence |
|---|---|
| Content | lesson, concepts, one-line definitions and prerequisites exist |
| Practice | MC, Fill and at least one deeper activity exist |
| Tab health | module appears in all strict SVCollege tabs |
| Smoke | desktop and mobile critical flows are clean |
| Feedback | first-user or 10-student pilot feedback reviewed |

Finish Line 1 may remain `exam-ready` before the 10-student pilot is complete, but broad student promotion is blocked until the feedback gate passes.
