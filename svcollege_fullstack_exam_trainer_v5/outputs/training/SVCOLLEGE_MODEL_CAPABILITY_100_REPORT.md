# SVCollege Model Capability 100 Report

דוח זה אינו טוען שהמודל כבר עבר את כל תתי-הענפים. הוא מגדיר שער אימות קשיח מתוך עץ 73 הסעיפים ומסמן מה מוכן להרצת eval ומה חסום לעיון ידני.

## מדיניות מעבר
- Explain Test: הסבר בעברית פשוטה.
- Execute Test: קוד עובד לפי הדרישה.
- ציון מעבר: 100 בלבד.
- `manual_review` לא מקבל Pass אוטומטי.

| Branch | Subbranch | Probability | Status | Gate |
|---|---|---:|---|---|
| `frontend_ui_validation` | `client_form_inputs` | 45.2% | ready_for_model_eval | הסבר בעברית + קוד תואם דרישה + בדיקת edge cases. |
| `frontend_ui_validation` | `client_validation_rules` | 42.5% | ready_for_model_eval | הסבר בעברית + קוד תואם דרישה + בדיקת edge cases. |
| `frontend_ui_validation` | `client_navigation` | 30.1% | ready_for_model_eval | הסבר בעברית + קוד תואם דרישה + בדיקת edge cases. |
| `frontend_ui_validation` | `client_list_render` | 24.7% | ready_for_model_eval | הסבר בעברית + קוד תואם דרישה + בדיקת edge cases. |
| `backend_api_routes` | `alerts_error_handling` | 34.2% | ready_for_model_eval | הסבר בעברית + קוד תואם דרישה + בדיקת edge cases. |
| `backend_api_routes` | `server_html_route` | 31.5% | ready_for_model_eval | הסבר בעברית + קוד תואם דרישה + בדיקת edge cases. |
| `backend_api_routes` | `api_get_filtered` | 30.1% | ready_for_model_eval | הסבר בעברית + קוד תואם דרישה + בדיקת edge cases. |
| `backend_api_routes` | `api_post_create` | 28.8% | ready_for_model_eval | הסבר בעברית + קוד תואם דרישה + בדיקת edge cases. |
| `backend_api_routes` | `api_get_all` | 11% | ready_for_model_eval | הסבר בעברית + קוד תואם דרישה + בדיקת edge cases. |
| `backend_api_routes` | `api_delete` | 6.8% | ready_for_model_eval | הסבר בעברית + קוד תואם דרישה + בדיקת edge cases. |
| `backend_api_routes` | `api_put_update` | 4.1% | ready_for_model_eval | הסבר בעברית + קוד תואם דרישה + בדיקת edge cases. |
| `data_persistence` | `db_uniqueness` | 21.9% | ready_for_model_eval | הסבר בעברית + קוד תואם דרישה + בדיקת edge cases. |
| `data_persistence` | `db_persistence` | 5.5% | ready_for_model_eval | הסבר בעברית + קוד תואם דרישה + בדיקת edge cases. |
| `js_problem_solving` | `js_algorithms` | 27.4% | ready_for_model_eval | הסבר בעברית + קוד תואם דרישה + בדיקת edge cases. |
| `node_oop` | `node_file_io` | 4.1% | ready_for_model_eval | הסבר בעברית + קוד תואם דרישה + בדיקת edge cases. |
| `node_oop` | `oop_design` | 2.7% | ready_for_model_eval | הסבר בעברית + קוד תואם דרישה + בדיקת edge cases. |
| `theory` | `theory_explanation` | 6.8% | ready_for_model_eval | הסבר בעברית + קוד תואם דרישה + בדיקת edge cases. |
| `scope_meta` | `question_scope_inherited` | 19.2% | ready_for_model_eval | הסבר בעברית + קוד תואם דרישה + בדיקת edge cases. |
| `scope_meta` | `manual_review` | 5.5% | blocked_manual_review | חסום לציון אוטומטי עד עיון ידני במקור. |
