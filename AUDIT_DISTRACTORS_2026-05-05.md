# Distractor Objectivity Audit — 2026-05-05

דגימה דטרמיניסטית של 50 שאלות MC מתוך המאגר הידני. לא נעשה שימוש באקראיות; הבחירה נעשית לפי hash יציב של `id + conceptKey + question`, כדי שהדוח יהיה ניתן לשחזור.

## Summary

- Total audited: 50
- Source mix: 50 manual
- Clean questions: 17
- Blockers: 0
- Warnings: 0
- Notes: 34

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
| 1 | `mc_lnest_dto_001` | manual | `lesson_nestjs::DTO` | note/length-cue: Option length spread is high (2..58); check that the correct answer is not visually cued. |
| 2 | `mc_ts_void_dd_001` | manual | `lesson_26::TypeScript` | note/length-cue: Option length spread is high (4..93); check that the correct answer is not visually cued. |
| 3 | `mc_l19_event_loop_002` | manual | `lesson_19::event loop` | note/length-cue: Option length spread is high (7..60); check that the correct answer is not visually cued. |
| 4 | `mc_l22_re_render_aaa_001` | manual | `lesson_22::re-render` | note/length-cue: Option length spread is high (3..90); check that the correct answer is not visually cued. |
| 5 | `mc_l17_crud_002` | manual | `lesson_17::CRUD` | תקין |
| 6 | `mc_l19_return_cc_001` | manual | `lesson_19::return` | note/length-cue: Option length spread is high (6..34); check that the correct answer is not visually cued. |
| 7 | `mc_l17_crud_uu_001` | manual | `lesson_17::CRUD` | note/length-cue: Option length spread is high (7..76); check that the correct answer is not visually cued. |
| 8 | `mc_ts_conditional_dd_001` | manual | `lesson_26::TypeScript` | note/length-cue: Option length spread is high (6..65); check that the correct answer is not visually cued. |
| 9 | `mc_css_a11y_u_001` | manual | `lesson_html_css_foundations::accessibility basics` | note/length-cue: Option length spread is high (3..44); check that the correct answer is not visually cued. |
| 10 | `mc_l13_get_by_class_manual_002` | manual | `lesson_13::getElementsByClassName` | תקין |
| 11 | `mc_edge_css_z_index_tt_001` | manual | `lesson_html_css_foundations::cascade and specificity` | note/length-cue: Option length spread is high (10..112); check that the correct answer is not visually cued. |
| 12 | `mc_tooling_prettier_manual_001` | manual | `lesson_tooling_git::Prettier` | תקין |
| 13 | `mc_l16_deps_002` | manual | `lesson_16::dependencies` | תקין |
| 14 | `mc_lighthouse_y_001` | manual | `lesson_devops_deploy::production readiness` | note/length-cue: Option length spread is high (6..69); check that the correct answer is not visually cued. |
| 15 | `mc_tw_search_u_001` | manual | `lesson_25::search` | note/length-cue: Option length spread is high (13..61); check that the correct answer is not visually cued. |
| 16 | `mc_l26_iface_v_type_002` | manual | `lesson_26::interface vs type` | תקין |
| 17 | `mc_iv_eq_ss_001` | manual | `lesson_11::boolean` | note/generic-wording: Option 1 uses broad wording that can cue test-taking instead of knowledge.<br>note/length-cue: Option length spread is high (4..67); check that the correct answer is not visually cued. |
| 18 | `mc_obj_001` | manual | `lesson_13::Object` | תקין |
| 19 | `mc_byref_001` | manual | `lesson_11::By Reference` | תקין |
| 20 | `mc_l24_fetch_aaa_001` | manual | `lesson_24::fetch` | note/length-cue: Option length spread is high (10..78); check that the correct answer is not visually cued. |
| 21 | `mc_l24_focus_ww_001` | manual | `lesson_24::focus` | note/length-cue: Option length spread is high (6..82); check that the correct answer is not visually cued. |
| 22 | `mc_l26_assertion_t_001` | manual | `lesson_26::TypeScript` | note/length-cue: Option length spread is high (8..53); check that the correct answer is not visually cued. |
| 23 | `mc_l15_sync_manual_001` | manual | `lesson_15::Synchronous` | תקין |
| 24 | `mc_tw_responsive_u_001` | manual | `lesson_25::responsive design` | תקין |
| 25 | `mc_l23_element_zz_002` | manual | `lesson_23::element` | note/length-cue: Option length spread is high (8..74); check that the correct answer is not visually cued. |
| 26 | `mc_l17_server_uu_001` | manual | `lesson_17::Server` | note/length-cue: Option length spread is high (2..93); check that the correct answer is not visually cued. |
| 27 | `mc_l20_method_bbb_001` | manual | `lesson_13::Method` | note/generic-wording: Option 3 uses broad wording that can cue test-taking instead of knowledge. |
| 28 | `mc_var_deep_001` | manual | `lesson_11::let` | תקין |
| 29 | `mc_l24_memoization_ddd_001` | manual | `lesson_24::memoization` | note/length-cue: Option length spread is high (5..86); check that the correct answer is not visually cued. |
| 30 | `mc_l26_ts_ext_bbb_001` | manual | `lesson_26::.ts` | note/length-cue: Option length spread is high (4..91); check that the correct answer is not visually cued. |
| 31 | `mc_l17_route_001` | manual | `lesson_17::Route` | תקין |
| 32 | `mc_l20_pull_w_001` | manual | `lesson_20::update` | note/length-cue: Option length spread is high (4..27); check that the correct answer is not visually cued. |
| 33 | `mc_test_visual_jj_001` | manual | `lesson_26::TypeScript` | תקין |
| 34 | `mc_l18_username_001` | manual | `lesson_18::username` | note/length-cue: Option length spread is high (9..51); check that the correct answer is not visually cued. |
| 35 | `mc_l26_typesafe_001` | manual | `lesson_26::Type Safety` | note/length-cue: Option length spread is high (8..44); check that the correct answer is not visually cued. |
| 36 | `mc_l16_cli_001` | manual | `lesson_16::CLI` | תקין |
| 37 | `mc_build_debounce_qq_001` | manual | `lesson_15::setTimeout` | note/length-cue: Option length spread is high (8..56); check that the correct answer is not visually cued. |
| 38 | `mc_l26_iface_v_type_003` | manual | `lesson_26::interface vs type` | note/generic-wording: Option 2 uses broad wording that can cue test-taking instead of knowledge. |
| 39 | `mc_fp_partial_ii_001` | manual | `lesson_11::function` | note/length-cue: Option length spread is high (4..89); check that the correct answer is not visually cued. |
| 40 | `mc_l26_never_manual_001` | manual | `lesson_26::never` | note/generic-wording: Option 1 uses broad wording that can cue test-taking instead of knowledge. |
| 41 | `mc_oop_pubsub_mm_001` | manual | `lesson_19::class` | note/length-cue: Option length spread is high (4..88); check that the correct answer is not visually cued. |
| 42 | `mc_l21_inline_style_003` | manual | `lesson_21::inline style` | תקין |
| 43 | `mc_edge_struct_clone_tt_001` | manual | `lesson_19::object` | note/length-cue: Option length spread is high (4..81); check that the correct answer is not visually cued. |
| 44 | `mc_l19_continue_cc_001` | manual | `lesson_19::continue` | note/length-cue: Option length spread is high (6..43); check that the correct answer is not visually cued. |
| 45 | `mc_l21_client_side_ww_001` | manual | `lesson_21::Client Side` | note/length-cue: Option length spread is high (6..87); check that the correct answer is not visually cued. |
| 46 | `mc_build_autoprefixer_ff_001` | manual | `lesson_21::Vite` | note/length-cue: Option length spread is high (4..79); check that the correct answer is not visually cued. |
| 47 | `mc_quirk_obj_to_str_gg_001` | manual | `lesson_11::object` | תקין |
| 48 | `mc_l24_useff_q_007` | manual | `lesson_24::dependency array` | תקין |
| 49 | `mc_la_secure_001` | manual | `lesson_auth_security::secure cookie` | note/length-cue: Option length spread is high (5..27); check that the correct answer is not visually cued. |
| 50 | `mc_l24_side_effect_001` | manual | `lesson_24::side effect` | תקין |

## Follow-Up

- No blocker-level distractor defects were found in the deterministic 50-question audit sample.
- Warning/note rows should be reviewed manually before release.

