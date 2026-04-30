# Distractor Objectivity Audit — 2026-04-30

דגימה דטרמיניסטית של 50 שאלות MC מתוך המאגר הידני. לא נעשה שימוש באקראיות; הבחירה נעשית לפי hash יציב של `id + conceptKey + question`, כדי שהדוח יהיה ניתן לשחזור.

## Summary

- Total audited: 50
- Source mix: 50 manual
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
| 1 | `mc_obj_001` | manual | `lesson_13::Object` | תקין |
| 2 | `mc_byref_001` | manual | `lesson_11::By Reference` | תקין |
| 3 | `mc_var_deep_001` | manual | `lesson_11::let` | תקין |
| 4 | `mc_inner_001` | manual | `lesson_13::innerHTML` | תקין |
| 5 | `mc_html_css_007` | manual | `lesson_html_css_foundations::box model` | תקין |
| 6 | `mc_ts_003` | manual | `lesson_26::interface vs type` | תקין |
| 7 | `mc_mongo_001` | manual | `lesson_20::Collection` | תקין |
| 8 | `mc_dep_001` | manual | `lesson_24::dependency array` | תקין |
| 9 | `mc_ts_001` | manual | `lesson_26::type annotation` | תקין |
| 10 | `mc_tooling_deep_004` | manual | `lesson_tooling_git::staging area` | תקין |
| 11 | `mc_tooling_002` | manual | `lesson_tooling_git::repository` | תקין |
| 12 | `mc_exp_003` | manual | `lesson_17::Status Codes` | תקין |
| 13 | `mc_state_001` | manual | `lesson_22::useState` | תקין |
| 14 | `mc_then_001` | manual | `lesson_15::then` | תקין |
| 15 | `mc_byval_001` | manual | `lesson_11::By Value` | תקין |
| 16 | `mc_closure_001` | manual | `lesson_15::Closure` | תקין |
| 17 | `mc_eff_002` | manual | `lesson_24::fetching data` | תקין |
| 18 | `mc_tooling_deep_006` | manual | `lesson_tooling_git::ESLint` | תקין |
| 19 | `mc_class_001` | manual | `lesson_13::class` | תקין |
| 20 | `mc_st_001` | manual | `lesson_13::localStorage` | תקין |
| 21 | `mc_if_002` | manual | `lesson_19::if/else` | תקין |
| 22 | `mc_tooling_004` | manual | `lesson_tooling_git::commit` | תקין |
| 23 | `mc_throw_001` | manual | `lesson_15::throw` | תקין |
| 24 | `mc_node_002` | manual | `lesson_16::package.json` | תקין |
| 25 | `mc_tooling_008` | manual | `lesson_tooling_git::npm scripts` | תקין |
| 26 | `mc_tooling_deep_001` | manual | `lesson_tooling_git::working tree` | תקין |
| 27 | `mc_setstate_001` | manual | `lesson_22::setState` | תקין |
| 28 | `mc_undef_001` | manual | `lesson_11::undefined` | תקין |
| 29 | `mc_cleanup_001` | manual | `lesson_24::cleanup` | תקין |
| 30 | `mc_evt_002` | manual | `lesson_19::event` | תקין |
| 31 | `mc_async_001` | manual | `lesson_15::setTimeout` | תקין |
| 32 | `mc_state_002` | manual | `lesson_22::immutable` | תקין |
| 33 | `mc_middleware_001` | manual | `lesson_17::middleware` | תקין |
| 34 | `mc_var_003` | manual | `lesson_11::boolean` | תקין |
| 35 | `mc_tooling_001` | manual | `lesson_tooling_git::Git` | תקין |
| 36 | `mc_exp_002` | manual | `lesson_17::body-parser` | תקין |
| 37 | `mc_html_css_006` | manual | `lesson_html_css_foundations::cascade and specificity` | תקין |
| 38 | `mc_idx_001` | manual | `lesson_11::Index` | תקין |
| 39 | `mc_tooling_006` | manual | `lesson_tooling_git::pull request` | תקין |
| 40 | `mc_html_css_001` | manual | `lesson_html_css_foundations::HTML document` | תקין |
| 41 | `mc_ctx_001` | manual | `lesson_23::Context API` | תקין |
| 42 | `mc_react_002` | manual | `lesson_21::props` | תקין |
| 43 | `mc_router_001` | manual | `lesson_23::Link` | תקין |
| 44 | `mc_tooling_003` | manual | `lesson_tooling_git::staging area` | תקין |
| 45 | `mc_arr_001` | manual | `lesson_11::Array` | תקין |
| 46 | `mc_async_003` | manual | `lesson_15::fetch` | תקין |
| 47 | `mc_html_css_deep_003` | manual | `lesson_html_css_foundations::box model` | תקין |
| 48 | `mc_html_css_deep_002` | manual | `lesson_html_css_foundations::cascade and specificity` | תקין |
| 49 | `mc_qsel_001` | manual | `lesson_13::querySelector` | תקין |
| 50 | `mc_react_003` | manual | `lesson_21::JSX` | תקין |

## Follow-Up

- No blocker-level distractor defects were found in the deterministic 50-question audit sample.
- Warning/note rows should be reviewed manually before release.

