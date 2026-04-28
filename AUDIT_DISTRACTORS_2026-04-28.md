# Distractor Objectivity Audit — 2026-04-28

דגימה דטרמיניסטית של 50 שאלות MC מתוך המאגר המאוחד. לא נעשה שימוש באקראיות; הבחירה נעשית לפי hash יציב של `id + conceptKey + question`, כדי שהדוח יהיה ניתן לשחזור.

## Summary

- Total audited: 50
- Source mix: 4 curated, 46 seeded
- Clean questions: 34
- Blockers: 0
- Warnings: 1
- Notes: 15

## Checks

- 4 options exactly
- valid `correctIndex`
- non-empty question/options/explanation
- duplicate and near-duplicate options
- broad wording that may cue guessing
- option-length cue risk

## Audited Questions

| # | ID | Source | Concept | Result |
|---:|---|---|---|---|
| 1 | `mc_react_002` | curated | `unknown` | תקין |
| 2 | `mc_seed_1253` | seeded | `workbook_taskmanager::objects` | תקין |
| 3 | `mc_seed_531` | seeded | `lesson_19::const` | תקין |
| 4 | `mc_seed_413` | seeded | `lesson_17::body` | note/length-cue: Option length spread is high (4..19); check that the correct answer is not visually cued. |
| 5 | `mc_seed_211` | seeded | `lesson_13::localStorage` | תקין |
| 6 | `mc_obj_001` | curated | `lesson_13::Object` | תקין |
| 7 | `mc_seed_512` | seeded | `lesson_19::script` | תקין |
| 8 | `mc_seed_530` | seeded | `lesson_19::var` | note/length-cue: Option length spread is high (3..16); check that the correct answer is not visually cued. |
| 9 | `mc_byref_001` | curated | `lesson_11::By Reference` | note/length-cue: Option length spread is high (1..9); check that the correct answer is not visually cued. |
| 10 | `mc_seed_981` | seeded | `lesson_24::cleanup` | תקין |
| 11 | `mc_seed_836` | seeded | `lesson_22::immutable` | תקין |
| 12 | `mc_seed_319` | seeded | `lesson_16::module.exports` | note/length-cue: Option length spread is high (3..14); check that the correct answer is not visually cued. |
| 13 | `mc_seed_849` | seeded | `lesson_22::onChange` | תקין |
| 14 | `mc_seed_893` | seeded | `lesson_23::Link` | תקין |
| 15 | `mc_seed_18` | seeded | `ai_development::Copilot` | תקין |
| 16 | `mc_seed_297` | seeded | `lesson_16::npm init` | תקין |
| 17 | `mc_seed_447` | seeded | `lesson_17::JSON` | note/length-cue: Option length spread is high (27..122); check that the correct answer is not visually cued. |
| 18 | `mc_seed_164` | seeded | `lesson_13::getElementsByClassName` | תקין |
| 19 | `mc_seed_206` | seeded | `lesson_13::extends` | warning/near-duplicate: Options 1 and 3 are very similar (0.89 token overlap). |
| 20 | `mc_seed_1137` | seeded | `lesson_27::Genre` | תקין |
| 21 | `mc_seed_877` | seeded | `lesson_23::URL` | note/length-cue: Option length spread is high (3..20); check that the correct answer is not visually cued. |
| 22 | `mc_seed_589` | seeded | `lesson_19::find` | תקין |
| 23 | `mc_seed_1101` | seeded | `lesson_26::interface` | תקין |
| 24 | `mc_seed_572` | seeded | `lesson_19::continue` | תקין |
| 25 | `mc_seed_506` | seeded | `lesson_18::password` | תקין |
| 26 | `mc_seed_949` | seeded | `lesson_24::fetch` | תקין |
| 27 | `mc_seed_650` | seeded | `lesson_19::event` | note/length-cue: Option length spread is high (5..22); check that the correct answer is not visually cued. |
| 28 | `mc_seed_238` | seeded | `lesson_15::throw` | note/length-cue: Option length spread is high (5..21); check that the correct answer is not visually cued. |
| 29 | `mc_seed_116` | seeded | `lesson_12::uppercase` | תקין |
| 30 | `mc_seed_1262` | seeded | `workbook_taskmanager::async/await` | תקין |
| 31 | `mc_seed_841` | seeded | `lesson_22::reference` | note/length-cue: Option length spread is high (3..14); check that the correct answer is not visually cued. |
| 32 | `mc_seed_539` | seeded | `lesson_19::if/else` | תקין |
| 33 | `mc_seed_725` | seeded | `lesson_20::updateMany` | note/length-cue: Option length spread is high (3..25); check that the correct answer is not visually cued. |
| 34 | `mc_seed_982` | seeded | `lesson_24::cleanup` | תקין |
| 35 | `mc_inner_001` | curated | `lesson_13::innerHTML` | note/generic-wording: Option 1 uses broad wording that can cue test-taking instead of knowledge. |
| 36 | `mc_seed_812` | seeded | `lesson_21::CSS import` | תקין |
| 37 | `mc_seed_361` | seeded | `lesson_17::HTTP` | תקין |
| 38 | `mc_seed_97` | seeded | `lesson_11::sort` | note/length-cue: Option length spread is high (3..13); check that the correct answer is not visually cued. |
| 39 | `mc_seed_894` | seeded | `lesson_23::Link` | תקין |
| 40 | `mc_seed_87` | seeded | `lesson_11::pop` | תקין |
| 41 | `mc_seed_453` | seeded | `lesson_17::POST` | note/generic-wording: Option 2 uses broad wording that can cue test-taking instead of knowledge. |
| 42 | `mc_seed_547` | seeded | `lesson_19::network` | תקין |
| 43 | `mc_seed_180` | seeded | `lesson_13::appendChild` | תקין |
| 44 | `mc_seed_1096` | seeded | `lesson_26::models folder` | תקין |
| 45 | `mc_seed_1042` | seeded | `lesson_26::.js` | note/length-cue: Option length spread is high (2..9); check that the correct answer is not visually cued. |
| 46 | `mc_seed_996` | seeded | `lesson_25::grid` | תקין |
| 47 | `mc_seed_527` | seeded | `lesson_19::let` | תקין |
| 48 | `mc_seed_743` | seeded | `lesson_20::$lt` | תקין |
| 49 | `mc_seed_744` | seeded | `lesson_20::$lte` | note/length-cue: Option length spread is high (25..135); check that the correct answer is not visually cued. |
| 50 | `mc_seed_1123` | seeded | `lesson_27::interface` | תקין |

## Follow-Up

- No blocker-level distractor defects were found in the deterministic 50-question audit sample.
- Warning/note rows should be reviewed during the broader 10% seeded QA pass.

