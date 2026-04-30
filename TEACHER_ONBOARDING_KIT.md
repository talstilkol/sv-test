# Teacher Onboarding Kit

Updated: 2026-04-29

This kit is for teachers running SVCollege AI & Full Stack preparation through LumenPortal. It explains how to set up a class, assign work, read the heatmaps and handle support reports without inventing student outcomes.

## Class Setup

1. Open the portal and create or select the local student profile.
2. Confirm the active course is SVCollege AI & Full Stack.
3. Run the baseline test before assigning practice.
4. Export the student summary after the baseline.
5. Keep the exported summary as the D0 evidence file.

## Assignment Recipe

Use one weekly assignment per module group:

| Assignment | Student flow | Teacher evidence |
|---|---|---|
| Concept repair | Lesson + Trainer + `נתקעתי` when blocked | weak concepts, stuck feedback, wrong-answer recovery |
| Code proof | Trace + Mini Build + Bug Hunt | trace/build/bug completion and code-proof signals |
| Retention | Flashcards + mock exam retake | D1/D7 activity and mastery movement |
| Exam readiness | Mock exam + weakest concepts review | score by module, repeated misconceptions |

## Heatmap Interpretation

- Green module: most concepts are mastered and recent practice supports retention.
- Yellow module: student needs targeted review, usually one or two weak concepts.
- Red module: teacher should assign prerequisite rewind before more exam questions.
- Unknown module: there is not enough real evidence. Do not fill it manually.

## Support Workflow

When a student reports a problem:

1. Ask the student to open the support report flow from the chrome control menu.
2. Choose issue type and severity.
3. Describe the problem in one clear paragraph.
4. Attach a screenshot if available.
5. Copy or export the generated JSON payload.
6. Review route, active tab, lesson, concept, viewport and screenshot status.

## Weekly Review Agenda

- Compare baseline and current module mastery.
- Review all `student_stuck` signals.
- Review support reports with `blocking` or `high` severity.
- Assign one remediation path per weak module.
- Export updated student summary.

## Teacher Lite v2 Scope

Teacher Lite v2 is defined from actual exam evidence only:

- Progress table: class roster, active student status and latest real practice evidence.
- Weak-topic heatmap: concept mastery cells from `class_concept_mastery`, including weak concepts and unknown cells.
- Exam audit export: proof blockers, repeated misconceptions, stuck feedback and D1/D7 retention signals.
- Export: one JSON handoff report; missing student, heatmap or exam data stays `unknown/unavailable`.

## Data Policy

- No fake scores.
- No manual backfill of retention.
- Unknown fields remain `unknown/unavailable`.
- Screenshots are attached only when the student intentionally chooses a file.
