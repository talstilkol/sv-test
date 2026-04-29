# Distractor Objectivity Audit — 2026-04-28

דגימה דטרמיניסטית של 50 שאלות MC מתוך המאגר המאוחד. לא נעשה שימוש באקראיות; הבחירה נעשית לפי hash יציב של `id + conceptKey + question`, כדי שהדוח יהיה ניתן לשחזור.

## Summary

- Total audited: 50
- Source mix: 4 curated, 46 seeded
- Clean questions: 50
- Blockers: 0
- Warnings: 0
- Notes: 0

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
| 1 | `mc_seed_619` | seeded | `lesson_19::cookies` | תקין |
| 2 | `mc_seed_919` | seeded | `lesson_24::state update` | תקין |
| 3 | `mc_seed_927` | seeded | `lesson_24::expensive calculation` | תקין |
| 4 | `mc_seed_1214` | seeded | `lesson_auth_security::refresh token` | תקין |
| 5 | `mc_seed_1023` | seeded | `lesson_26::boolean` | תקין |
| 6 | `mc_seed_1430` | seeded | `lesson_nextjs::dynamic route` | תקין |
| 7 | `mc_seed_1217` | seeded | `lesson_auth_security::OAuth` | תקין |
| 8 | `mc_seed_1065` | seeded | `lesson_26::interface vs type` | תקין |
| 9 | `mc_obj_001` | curated | `lesson_13::Object` | תקין |
| 10 | `mc_byref_001` | curated | `lesson_11::By Reference` | תקין |
| 11 | `mc_seed_1275` | seeded | `lesson_design_systems::Radix primitives` | תקין |
| 12 | `mc_seed_760` | seeded | `lesson_21::main.jsx` | תקין |
| 13 | `mc_seed_1439` | seeded | `lesson_nextjs::server component` | תקין |
| 14 | `mc_seed_608` | seeded | `lesson_19::throw` | תקין |
| 15 | `mc_seed_1502` | seeded | `lesson_sql_orm::JOIN` | תקין |
| 16 | `mc_seed_1259` | seeded | `lesson_closures::closure variables` | תקין |
| 17 | `mc_seed_473` | seeded | `lesson_18::POST` | תקין |
| 18 | `mc_seed_441` | seeded | `lesson_17::POST` | תקין |
| 19 | `mc_seed_240` | seeded | `lesson_15::Closure` | תקין |
| 20 | `mc_seed_1179` | seeded | `lesson_ai_engineering::guardrails` | תקין |
| 21 | `mc_var_deep_001` | curated | `lesson_11::let` | תקין |
| 22 | `mc_seed_18` | seeded | `ai_development::Copilot` | תקין |
| 23 | `mc_seed_1577` | seeded | `workbook_taskmanager::variables` | תקין |
| 24 | `mc_seed_1060` | seeded | `lesson_26::Todo.ts` | תקין |
| 25 | `mc_seed_339` | seeded | `lesson_16::fs.readFile` | תקין |
| 26 | `mc_seed_1416` | seeded | `lesson_nestjs::repository pattern` | תקין |
| 27 | `mc_seed_647` | seeded | `lesson_20::SQL` | תקין |
| 28 | `mc_seed_1244` | seeded | `lesson_auth_security::Firebase Auth` | תקין |
| 29 | `mc_seed_1190` | seeded | `lesson_ai_engineering::fine-tuning boundary` | תקין |
| 30 | `mc_seed_1155` | seeded | `lesson_ai_engineering::token budget` | תקין |
| 31 | `mc_seed_1180` | seeded | `lesson_ai_engineering::guardrails` | תקין |
| 32 | `mc_seed_593` | seeded | `lesson_19::class` | תקין |
| 33 | `mc_seed_570` | seeded | `lesson_19::map` | תקין |
| 34 | `mc_seed_1317` | seeded | `lesson_devops_deploy::preview deployment` | תקין |
| 35 | `mc_seed_356` | seeded | `lesson_17::Protocol` | תקין |
| 36 | `mc_seed_1359` | seeded | `lesson_html_css_foundations::HTML document` | תקין |
| 37 | `mc_seed_1325` | seeded | `lesson_devops_deploy::Docker` | תקין |
| 38 | `mc_seed_1201` | seeded | `lesson_auth_security::cookie` | תקין |
| 39 | `mc_seed_827` | seeded | `lesson_22::onChange` | תקין |
| 40 | `mc_seed_1123` | seeded | `lesson_27::Amount` | תקין |
| 41 | `mc_seed_693` | seeded | `lesson_20::insertMany` | תקין |
| 42 | `mc_seed_1531` | seeded | `lesson_tooling_git::branch` | תקין |
| 43 | `mc_seed_490` | seeded | `lesson_18::password` | תקין |
| 44 | `mc_seed_1053` | seeded | `lesson_26::Function Prop Type` | תקין |
| 45 | `mc_seed_900` | seeded | `lesson_23::MainScreen` | תקין |
| 46 | `mc_inner_001` | curated | `lesson_13::innerHTML` | תקין |
| 47 | `mc_seed_1333` | seeded | `lesson_devops_deploy::container` | תקין |
| 48 | `mc_seed_1193` | seeded | `lesson_auth_security::authentication` | תקין |
| 49 | `mc_seed_345` | seeded | `lesson_16::fs.rename` | תקין |
| 50 | `mc_seed_903` | seeded | `lesson_23::AddPost` | תקין |

## Follow-Up

- No blocker-level distractor defects were found in the deterministic 50-question audit sample.
- Warning/note rows should be reviewed during the broader 10% seeded QA pass.

