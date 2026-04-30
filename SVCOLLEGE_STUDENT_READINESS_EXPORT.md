# SVCollege Student Readiness Export — 2026-04-29

- Target: SVCollege AI & Full Stack
- Ready for exam practice: No
- Blockers: 7
- Modules: 15/15
- Readiness average: 96.7%
- Tab coverage: 98.2% (221/225)
- Mock variants: 3
- Flow simulation: Pass

## Critical Counters

- Without questions: 131
- Without hard question: 170
- Without one-line definition: 0
- Without prerequisite entry: 0
- Code concepts without code proof: 142

## Next 5 Actions

| Concept | Risk | Action |
|---|---:|---|
| react_blueprint::Performance Optimization | 172 | להוסיף שאלת עומק ברמה 6/7 עם הסבר ודיסטרקטורים. |
| react_blueprint::State Management | 170 | להוסיף שאלת עומק ברמה 6/7 עם הסבר ודיסטרקטורים. |
| lesson_25::add/delete movie | 169 | להוסיף שאלת עומק ברמה 6/7 עם הסבר ודיסטרקטורים. |
| react_blueprint::Composition vs Inheritance | 168 | להוסיף שאלת עומק ברמה 6/7 עם הסבר ודיסטרקטורים. |
| react_blueprint::Code Splitting | 168 | להוסיף שאלת עומק ברמה 6/7 עם הסבר ודיסטרקטורים. |

## Teacher Weekly Progress

- Status: blocked
- Module coverage: 15/15
- Tab coverage: 221/225
- Recommended review agenda: react_blueprint::Performance Optimization, react_blueprint::State Management, lesson_25::add/delete movie

## Learner Outcome Loop

- Pilot cohort: 10 real students
- Pilot duration: 7 days
- Checkpoints: D0 baseline exam → D1 retention check → D7 final exam and module mastery review → qualitative feedback review
- Metrics: D1 retention, D7 retention, module mastery, average wrong-to-correct recovery time, repeated misconception rate, student got stuck feedback
- Feedback signal: student_stuck events include lesson, question, prerequisite and viewport metadata; free-form answer text is not stored.
- Missing evidence policy: Pilot outcomes remain unknown/unavailable until real learner evidence exists.

## Student Promotion Gate

- Rule: A module is ready for students only after content, practice, tab health, smoke evidence and first-user feedback evidence all pass.
- Required evidence: content, practice, tabHealth, smoke, feedback

### Evidence Commands

- `npm run svcollege:readiness:release`
- `npm run svcollege:tab-matrix:strict`
- `npm run qa:questions:strict`
- `npm run exam:mock-variants:strict`
- `npm run exam:flows:strict`

