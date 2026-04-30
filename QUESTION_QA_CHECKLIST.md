# Question QA Checklist — Deterministic Sample + SVCollege Prerequisite Gate

Manual QA checklist for the fixed 10% question sample plus a deterministic SVCollege prerequisite gate. The sample is selected by stable hash over question identity and content, so reviewers get the same rows on every run.

## Summary

- Date: 2026-04-30
- Total questions: 216
- Sample ratio: 10%
- Sample size: 22
- Sample mix: 8 MC, 14 Fill
- Source mix: 22 manual

## SVCollege Prerequisite Gate

- Gate version: svcollege-prerequisite-gate-v1
- Hard question threshold: level >= 4
- SVCollege questions checked: 259
- Questions requiring aid: 257
- Questions with issues: 0
- Total gate issues: 0
- missingPrerequisites: 0
- missingGlossaryTerms: 0
- hardQuestionWithoutAid: 0
- repeatedLowSignalExplanation: 0
- Ready: yes

### Gate Issue Sample

| # | Code | ID | Kind | Concept | Level | Details |
|---:|---|---|---|---|---:|---|
| 1 | clean | `none` |  |  |  | No prerequisite gate issues found. |

### Closure Tasks

- Add real glossary entries for missing requiredTerms before surfacing those terms as hover/side aids.
- Add explicit requiredConcepts or concept prerequisite map rows for any future missingPrerequisites issue.
- Replace any repeatedLowSignalExplanation with question-specific sideExplanation text tied to the actual misconception.

## Required Checks

- Correct answer verified against lesson content.
- Explanation matches the answer and identifies the misconception.
- Prerequisites and unfamiliar terms are covered by the side-aid.
- Difficulty fits the lesson order and does not require future material.
- Hebrew wording is clear and does not allow guessing.
- MC only: exactly four options, plausible distractors, no length/absolute-wording cues.
- Fill only: one clear blank, answer is not leaked, hint narrows without revealing.

## Sample

| # | Status | ID | Kind | Source | Concept | Level | Prompt Preview | Checks |
|---:|---|---|---|---|---|---:|---|---|
| 1 | pending | `fill_tooling_005` | fill | manual | `lesson_tooling_git::ESLint` | 4 | "lint": "eslint ____" | [ ] correct-answer-verified<br>[ ] explanation-matches-answer<br>[ ] prerequisites-and-terms-covered<br>[ ] difficulty-fits-lesson-order<br>[ ] hebrew-is-clear<br>[ ] single-clear-blank<br>[ ] answer-not-leaked<br>[ ] hint-narrows-without-revealing |
| 2 | pending | `mc_sql_deep_001` | mc | manual | `lesson_sql_orm::row` | 6 | בטבלת users עם עמודות id, email, role — מה היא row? | [ ] correct-answer-verified<br>[ ] explanation-matches-answer<br>[ ] prerequisites-and-terms-covered<br>[ ] difficulty-fits-lesson-order<br>[ ] hebrew-is-clear<br>[ ] four-options-exactly<br>[ ] distractors-are-common-mistakes<br>[ ] no-guessing-cues |
| 3 | pending | `fill_arr_007` | fill | manual | `lesson_11::shift` | 2 | const arr = [1, 2, 3]; const first = arr.____(); console.log(first); // 1 | [ ] correct-answer-verified<br>[ ] explanation-matches-answer<br>[ ] prerequisites-and-terms-covered<br>[ ] difficulty-fits-lesson-order<br>[ ] hebrew-is-clear<br>[ ] single-clear-blank<br>[ ] answer-not-leaked<br>[ ] hint-narrows-without-revealing |
| 4 | pending | `fill_exam_props_001` | fill | manual | `lesson_22::props` | 5 | function Card(input) { return <h2>{input.____}</h2>; } | [ ] correct-answer-verified<br>[ ] explanation-matches-answer<br>[ ] prerequisites-and-terms-covered<br>[ ] difficulty-fits-lesson-order<br>[ ] hebrew-is-clear<br>[ ] single-clear-blank<br>[ ] answer-not-leaked<br>[ ] hint-narrows-without-revealing |
| 5 | pending | `fill_node_001` | fill | manual | `lesson_16::File System` | 5 | import { readFile } from 'node:fs/promises'; const text = await readFile('notes.txt', '____'); | [ ] correct-answer-verified<br>[ ] explanation-matches-answer<br>[ ] prerequisites-and-terms-covered<br>[ ] difficulty-fits-lesson-order<br>[ ] hebrew-is-clear<br>[ ] single-clear-blank<br>[ ] answer-not-leaked<br>[ ] hint-narrows-without-revealing |
| 6 | pending | `mc_tooling_deep_002` | mc | manual | `lesson_tooling_git::Git` | 6 | למה Git לא נחשב רק 'שמירה של קבצים'? | [ ] correct-answer-verified<br>[ ] explanation-matches-answer<br>[ ] prerequisites-and-terms-covered<br>[ ] difficulty-fits-lesson-order<br>[ ] hebrew-is-clear<br>[ ] four-options-exactly<br>[ ] distractors-are-common-mistakes<br>[ ] no-guessing-cues |
| 7 | pending | `fill_html_css_004` | fill | manual | `lesson_html_css_foundations::CSS selector` | 3 | ____ { padding: 16px; border: 1px solid #ddd; } | [ ] correct-answer-verified<br>[ ] explanation-matches-answer<br>[ ] prerequisites-and-terms-covered<br>[ ] difficulty-fits-lesson-order<br>[ ] hebrew-is-clear<br>[ ] single-clear-blank<br>[ ] answer-not-leaked<br>[ ] hint-narrows-without-revealing |
| 8 | pending | `fill_design_003` | fill | manual | `lesson_design_systems::component registry` | 5 | const registry = { Button, Card, ____ }; const Component = registry[name]; | [ ] correct-answer-verified<br>[ ] explanation-matches-answer<br>[ ] prerequisites-and-terms-covered<br>[ ] difficulty-fits-lesson-order<br>[ ] hebrew-is-clear<br>[ ] single-clear-blank<br>[ ] answer-not-leaked<br>[ ] hint-narrows-without-revealing |
| 9 | pending | `fill_obj_004` | fill | manual | `lesson_13::inheritance` | 5 | class Admin ____ User { canDeleteUsers() { return true; } } | [ ] correct-answer-verified<br>[ ] explanation-matches-answer<br>[ ] prerequisites-and-terms-covered<br>[ ] difficulty-fits-lesson-order<br>[ ] hebrew-is-clear<br>[ ] single-clear-blank<br>[ ] answer-not-leaked<br>[ ] hint-narrows-without-revealing |
| 10 | pending | `fill_arr_005` | fill | manual | `lesson_11::push` | 1 | const arr = [1, 2]; arr.____(3); console.log(arr); // [1, 2, 3] | [ ] correct-answer-verified<br>[ ] explanation-matches-answer<br>[ ] prerequisites-and-terms-covered<br>[ ] difficulty-fits-lesson-order<br>[ ] hebrew-is-clear<br>[ ] single-clear-blank<br>[ ] answer-not-leaked<br>[ ] hint-narrows-without-revealing |
| 11 | pending | `fill_mongo_001` | fill | manual | `lesson_20::findOne` | 4 | const user = await User.____({ email: 'a@b.com' }); | [ ] correct-answer-verified<br>[ ] explanation-matches-answer<br>[ ] prerequisites-and-terms-covered<br>[ ] difficulty-fits-lesson-order<br>[ ] hebrew-is-clear<br>[ ] single-clear-blank<br>[ ] answer-not-leaked<br>[ ] hint-narrows-without-revealing |
| 12 | pending | `mc_tooling_008` | mc | manual | `lesson_tooling_git::npm scripts` | 3 | איפה מגדירים פקודות כמו npm run dev ו-npm test? | [ ] correct-answer-verified<br>[ ] explanation-matches-answer<br>[ ] prerequisites-and-terms-covered<br>[ ] difficulty-fits-lesson-order<br>[ ] hebrew-is-clear<br>[ ] four-options-exactly<br>[ ] distractors-are-common-mistakes<br>[ ] no-guessing-cues |
| 13 | pending | `fill_tooling_009` | fill | manual | `lesson_tooling_git::repository` | 5 | git ____ https://github.com/team/app.git cd app | [ ] correct-answer-verified<br>[ ] explanation-matches-answer<br>[ ] prerequisites-and-terms-covered<br>[ ] difficulty-fits-lesson-order<br>[ ] hebrew-is-clear<br>[ ] single-clear-blank<br>[ ] answer-not-leaked<br>[ ] hint-narrows-without-revealing |
| 14 | pending | `fill_st_001` | fill | manual | `lesson_13::localStorage` | 3 | const tasks = [{id:1}]; localStorage.setItem('tasks', JSON.____(tasks)); | [ ] correct-answer-verified<br>[ ] explanation-matches-answer<br>[ ] prerequisites-and-terms-covered<br>[ ] difficulty-fits-lesson-order<br>[ ] hebrew-is-clear<br>[ ] single-clear-blank<br>[ ] answer-not-leaked<br>[ ] hint-narrows-without-revealing |
| 15 | pending | `fill_next_002` | fill | manual | `lesson_nextjs::image optimization` | 5 | <Image src="/hero.png" alt="Dashboard" width={1200} height={____} /> | [ ] correct-answer-verified<br>[ ] explanation-matches-answer<br>[ ] prerequisites-and-terms-covered<br>[ ] difficulty-fits-lesson-order<br>[ ] hebrew-is-clear<br>[ ] single-clear-blank<br>[ ] answer-not-leaked<br>[ ] hint-narrows-without-revealing |
| 16 | pending | `fill_async_004` | fill | manual | `lesson_15::Promise` | 5 | const p = new Promise((____, reject) => { setTimeout(() => /* fulfill with 'hello' */, 1000); }); | [ ] correct-answer-verified<br>[ ] explanation-matches-answer<br>[ ] prerequisites-and-terms-covered<br>[ ] difficulty-fits-lesson-order<br>[ ] hebrew-is-clear<br>[ ] single-clear-blank<br>[ ] answer-not-leaked<br>[ ] hint-narrows-without-revealing |
| 17 | pending | `mc_middleware_001` | mc | manual | `lesson_17::middleware` | 5 | מה תפקיד הפרמטר next ב-middleware? | [ ] correct-answer-verified<br>[ ] explanation-matches-answer<br>[ ] prerequisites-and-terms-covered<br>[ ] difficulty-fits-lesson-order<br>[ ] hebrew-is-clear<br>[ ] four-options-exactly<br>[ ] distractors-are-common-mistakes<br>[ ] no-guessing-cues |
| 18 | pending | `mc_html_css_005` | mc | manual | `lesson_html_css_foundations::CSS selector` | 3 | איזה selector בוחר אלמנט עם class בשם card? | [ ] correct-answer-verified<br>[ ] explanation-matches-answer<br>[ ] prerequisites-and-terms-covered<br>[ ] difficulty-fits-lesson-order<br>[ ] hebrew-is-clear<br>[ ] four-options-exactly<br>[ ] distractors-are-common-mistakes<br>[ ] no-guessing-cues |
| 19 | pending | `mc_tooling_deep_004` | mc | manual | `lesson_tooling_git::staging area` | 6 | שינית שני קבצים, אבל רק אחד קשור לבאג שאתה מתקן. מה הפעולה הנכונה לפני commit? | [ ] correct-answer-verified<br>[ ] explanation-matches-answer<br>[ ] prerequisites-and-terms-covered<br>[ ] difficulty-fits-lesson-order<br>[ ] hebrew-is-clear<br>[ ] four-options-exactly<br>[ ] distractors-are-common-mistakes<br>[ ] no-guessing-cues |
| 20 | pending | `fill_exam_side_effect_001` | fill | manual | `lesson_24::side effect` | 5 | useEffect(() => { document.title = pageTitle; }, [pageTitle]); // The effect updates the ____ | [ ] correct-answer-verified<br>[ ] explanation-matches-answer<br>[ ] prerequisites-and-terms-covered<br>[ ] difficulty-fits-lesson-order<br>[ ] hebrew-is-clear<br>[ ] single-clear-blank<br>[ ] answer-not-leaked<br>[ ] hint-narrows-without-revealing |
| 21 | pending | `mc_var_001` | mc | manual | `lesson_11::let` | 1 | מה יודפס? let x = 5; x = 8; console.log(x); | [ ] correct-answer-verified<br>[ ] explanation-matches-answer<br>[ ] prerequisites-and-terms-covered<br>[ ] difficulty-fits-lesson-order<br>[ ] hebrew-is-clear<br>[ ] four-options-exactly<br>[ ] distractors-are-common-mistakes<br>[ ] no-guessing-cues |
| 22 | pending | `mc_node_002` | mc | manual | `lesson_16::package.json` | 3 | מה תפקיד package.json? | [ ] correct-answer-verified<br>[ ] explanation-matches-answer<br>[ ] prerequisites-and-terms-covered<br>[ ] difficulty-fits-lesson-order<br>[ ] hebrew-is-clear<br>[ ] four-options-exactly<br>[ ] distractors-are-common-mistakes<br>[ ] no-guessing-cues |

## Review Outcome

Copy failed rows into the PR evidence with the fix commit. A sampled question is accepted only when every required check is marked complete.

