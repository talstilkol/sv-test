# QA-003 - Distractor Actionable/Raw Remediation

## Status

- משימה: `QA-003`
- יעד מקורי: `104` שאלות ייחודיות עם `distractor actionable/raw`
- כבר כוסה במסגרת `QA-002`: `46/104`
- הושלם ישירות ב-`QA-003`: `58/104`
- סה״כ הושלם: `104/104`
- נותר: `0/104`
- זמן מקורי: `6 שעות`
- זמן שנותר משוער: `0 דק׳`

## Batch 1 - נסגר

כל הפריטים בבאטצ׳ הזה תוקנו ידנית ב-`data/questions_bank.js` באמצעות הרחבת מסיחים קצרים/לא-ייחודיים ועדכון `optionFeedback`, בלי שינוי `correctIndex` ובלי הוספת מידע מומצא.

| # | Question ID | סטטוס |
| ---: | --- | --- |
| 1 | `mc_la_jwt_003` | closed |
| 2 | `mc_l12_array_manual_003` | closed |
| 3 | `mc_l12_filter_manual_002` | closed |
| 4 | `mc_l12_index_manual_001` | closed |
| 5 | `mc_l12_map_manual_002` | closed |
| 6 | `mc_l12_spread_manual_002` | closed |
| 7 | `mc_l12_new_array_he_manual_001` | closed |
| 8 | `mc_l12_create_from_existing_he_manual_002` | closed |
| 9 | `mc_l12_condition_filter_he_manual_002` | closed |
| 10 | `mc_l12_index_values_he_manual_002` | closed |
| 11 | `mc_l13_attribute_manual_002` | closed |
| 12 | `mc_l13_class_manual_002` | closed |
| 13 | `mc_l13_constructor_manual_003` | closed |
| 14 | `mc_dom_002` | closed |
| 15 | `mc_obj_001` | closed |
| 16 | `mc_l13_property_manual_001` | closed |
| 17 | `mc_qsel_001` | closed |
| 18 | `mc_l13_value_manual_003` | closed |
| 19 | `mc_build_async_par_qq_001` | closed |
| 20 | `mc_build_async_seq_qq_001` | closed |
| 21 | `mc_trace_async_order_oo_001` | closed |
| 22 | `mc_l15_catch_manual_002` | closed |
| 23 | `mc_l15_catch_manual_003` | closed |
| 24 | `mc_l15_catchp_manual_002` | closed |
| 25 | `mc_l15_closure_manual_001` | closed |

## Guardrails

- לא משתמשים ב-`Math.random`.
- לא משנים `correctIndex`.
- לא ממציאים שאלות או תשובות.
- אם חסר מקור, משאירים `unknown/unavailable` ולא ממציאים.

## Batch 2 - נסגר

כל הפריטים בבאטצ׳ הזה תוקנו ידנית ב-`data/questions_bank.js` באמצעות הרחבת מסיחים קצרים/לא-ייחודיים ועדכון `optionFeedback`, בלי שינוי `correctIndex` ובלי הוספת מידע מומצא.

| # | Question ID | סטטוס |
| ---: | --- | --- |
| 26 | `mc_l15_errorobj_manual_001` | closed |
| 27 | `mc_async_p_003` | closed |
| 28 | `mc_eventloop_p_001` | closed |
| 29 | `mc_l_event_loop_001` | closed |
| 30 | `mc_l11_set_001` | closed |
| 31 | `mc_l15_prace_001` | closed |
| 32 | `mc_l15_resolve_manual_002` | closed |
| 33 | `mc_build_sleep_qq_001` | closed |
| 34 | `mc_l15_timeout_manual_002` | closed |
| 35 | `mc_l15_throw_manual_002` | closed |
| 36 | `mc_l15_try_manual_002` | closed |
| 37 | `mc_l16_cd_002` | closed |
| 38 | `mc_l16_dir_002` | closed |
| 39 | `mc_l16_fs_001` | closed |
| 40 | `mc_l16_fs_module_001` | closed |
| 41 | `mc_l16_append_002` | closed |
| 42 | `mc_l16_mkdir_002` | closed |
| 43 | `mc_l16_node_run_001` | closed |
| 44 | `mc_la_jwt_002` | closed |
| 45 | `mc_lc_settimeout_001` | closed |
| 46 | `mc_lc_closure_vars_001` | closed |
| 47 | `mc_lds_a11y_003` | closed |
| 48 | `mc_html_css_deep_003` | closed |
| 49 | `mc_lnest_middleware_001` | closed |
| 50 | `mc_tooling_ghwf_manual_002` | closed |

## QA-003 Batch 3 - final 8 actionable/raw items

| # | question id | action | evidence |
| ---: | --- | --- | --- |
| 51 | `mc_l12_array_manual_002` | Balanced distractor language and feedback; preserved `correctIndex`. | Manual review of question options in `data/questions_bank.js`. |
| 52 | `mc_obj_002` | Balanced distractor language and feedback; preserved `correctIndex`. | Manual review of question options in `data/questions_bank.js`. |
| 53 | `mc_l15_promise_manual_002` | Balanced distractor language and feedback; preserved `correctIndex`. | Manual review of question options in `data/questions_bank.js`. |
| 54 | `mc_l15_resolve_manual_003` | Balanced distractor language and feedback; preserved `correctIndex`. | Manual review of question options in `data/questions_bank.js`. |
| 55 | `mc_l15_then_manual_002` | Balanced distractor language and feedback; preserved `correctIndex`. | Manual review of question options in `data/questions_bank.js`. |
| 56 | `mc_ai_dev_windsurf_003` | Balanced distractor language and feedback; preserved `correctIndex`. | Manual review of question options in `data/questions_bank.js`. |
| 57 | `mc_lsql_crud_002` | Balanced distractor language and feedback; preserved `correctIndex`. | Manual review of question options in `data/questions_bank.js`. |
| 58 | `mc_rb_comp_manual_001` | Balanced distractor language and feedback; preserved `correctIndex`. | Manual review of question options in `data/questions_bank.js`. |
