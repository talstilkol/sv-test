## Run start: start=1, end=1, batch_size=1
- leaf 1:api_get_all:1: WEAK, final=62
- section 1: WEAK, final=40
## Run start: start=1, end=1, batch_size=1
- leaf 1:api_get_all:1: GOOD, final=92
- section 1: WEAK, final=67
## Run start: start=2, end=4, batch_size=3
- leaf 2:api_get_filtered:1: WEAK, final=53
- leaf 2:api_post_create:1: WEAK, final=62
- section 2: WEAK, final=17
- leaf 3:api_post_create:1: WEAK, final=62
- leaf 3:db_persistence:1: WEAK, final=75
- leaf 3:alerts_error_handling:1: GOOD, final=95
- section 3: WEAK, final=23
- leaf 4:manual_review:1: BLOCKED_MANUAL_REVIEW
- section 4: BLOCKED_MANUAL_REVIEW, final=None
## Run start: start=2, end=3, batch_size=2
## Run start: start=2, end=3, batch_size=2
- leaf 2:api_get_filtered:1: WEAK, final=53
- leaf 2:api_post_create:1: WEAK, final=62
- section 2: WEAK, final=33
- leaf 3:api_post_create:1: WEAK, final=62
- leaf 3:db_persistence:1: WEAK, final=75
- leaf 3:alerts_error_handling:1: GOOD, final=95
- section 3: WEAK, final=39
## Run start: start=2, end=3, batch_size=2
- leaf 2:api_get_filtered:1: WEAK, final=83
- leaf 2:api_post_create:1: GOOD, final=95
- section 2: WEAK, final=63
- leaf 3:api_post_create:1: GOOD, final=88
- leaf 3:db_persistence:1: WEAK, final=78
- leaf 3:alerts_error_handling:1: GOOD, final=95
- section 3: WEAK, final=53
## Run start: start=2, end=3, batch_size=2
- leaf 2:api_get_filtered:1: GOOD, final=94
- leaf 2:api_post_create:1: GOOD, final=94
- section 2: WEAK, final=53
- leaf 3:api_post_create:1: WEAK, final=74
- leaf 3:db_persistence:1: WEAK, final=78
- leaf 3:alerts_error_handling:1: GOOD, final=95
- section 3: WEAK, final=52
## Run start: start=3, end=3, batch_size=1
- leaf 3:api_post_create:1: GOOD, final=94
- leaf 3:db_persistence:1: GOOD, final=98
- leaf 3:alerts_error_handling:1: GOOD, final=95
- section 3: WEAK, final=56
## Run start: start=5, end=7, batch_size=3
- leaf 5:question_scope_inherited:1: GOOD, final=99
- leaf 5:alerts_error_handling:1: GOOD, final=95
- leaf 5:js_algorithms:1: WEAK, final=81
- section 5: WEAK, final=43
- leaf 6:client_navigation:1: WEAK, final=70
- leaf 6:client_list_render:1: WEAK, final=63
- section 6: WEAK, final=40
- leaf 7:api_get_filtered:1: GOOD, final=98
- leaf 7:server_html_route:1: GOOD, final=96
- leaf 7:client_navigation:1: WEAK, final=70
- section 7: WEAK, final=45
## Run start: start=5, end=7, batch_size=3
- leaf 5:question_scope_inherited:1: GOOD, final=99
- leaf 5:alerts_error_handling:1: GOOD, final=95
- leaf 5:js_algorithms:1: GOOD, final=94
- section 5: WEAK, final=43
- leaf 6:client_navigation:1: MASTERED_100, final=100
- leaf 6:client_list_render:1: WEAK, final=78
- section 6: WEAK, final=48
- leaf 7:api_get_filtered:1: GOOD, final=98
- leaf 7:server_html_route:1: GOOD, final=96
- leaf 7:client_navigation:1: MASTERED_100, final=100
- section 7: WEAK, final=50
## Run start: start=6, end=6, batch_size=1
- leaf 6:client_navigation:1: MASTERED_100, final=100
- leaf 6:client_list_render:1: GOOD, final=94
- section 6: WEAK, final=51
## Run start: start=7, end=7, batch_size=1
- leaf 7:api_get_filtered:1: GOOD, final=98
- leaf 7:server_html_route:1: GOOD, final=96
- leaf 7:client_navigation:1: MASTERED_100, final=100
- section 7: WEAK, final=67
## Run start: start=8, end=10, batch_size=3
- leaf 8:api_get_filtered:1: GOOD, final=94
- leaf 8:client_form_inputs:1: WEAK, final=82
- section 8: WEAK, final=48
- leaf 9:api_get_filtered:1: GOOD, final=98
- leaf 9:client_form_inputs:1: WEAK, final=82
- leaf 9:client_list_render:1: GOOD, final=94
- section 9: WEAK, final=63
- leaf 10:server_html_route:1: GOOD, final=96
- leaf 10:client_form_inputs:1: GOOD, final=94
- leaf 10:client_navigation:1: GOOD, final=97
- section 10: WEAK, final=60
## Run start: start=8, end=9, batch_size=2
- leaf 8:api_get_filtered:1: GOOD, final=94
- leaf 8:client_form_inputs:1: GOOD, final=94
- section 8: WEAK, final=50
- leaf 9:api_get_filtered:1: GOOD, final=98
- leaf 9:client_form_inputs:1: GOOD, final=94
- leaf 9:client_list_render:1: GOOD, final=94
- section 9: WEAK, final=64
## Run start: start=11, end=13, batch_size=3
- leaf 11:db_uniqueness:1: GOOD, final=94
- leaf 11:client_validation_rules:1: GOOD, final=94
- section 11: WEAK, final=64
- leaf 12:client_validation_rules:1: GOOD, final=94
- section 12: WEAK, final=77
- leaf 13:client_validation_rules:1: GOOD, final=94
- section 13: WEAK, final=73
## Run start: start=11, end=13, batch_size=3
- leaf 11:db_uniqueness:1: GOOD, final=94
- leaf 11:client_validation_rules:1: GOOD, final=94
- section 11: WEAK, final=64
- leaf 12:client_validation_rules:1: GOOD, final=94
- section 12: GOOD, final=88
- leaf 13:client_validation_rules:1: GOOD, final=94
- section 13: GOOD, final=88
## Run start: start=14, end=16, batch_size=3
- leaf 14:client_form_inputs:1: GOOD, final=94
- leaf 14:alerts_error_handling:1: GOOD, final=95
- section 14: WEAK, final=61
- leaf 15:api_delete:1: WEAK, final=64
- leaf 15:server_html_route:1: GOOD, final=91
- leaf 15:client_form_inputs:1: GOOD, final=99
- leaf 15:client_navigation:1: GOOD, final=97
- section 15: WEAK, final=56
- leaf 16:client_form_inputs:1: GOOD, final=94
- leaf 16:client_validation_rules:1: GOOD, final=96
- section 16: GOOD, final=88
## Run start: start=15, end=15, batch_size=1
- leaf 15:api_delete:1: GOOD, final=94
- leaf 15:server_html_route:1: GOOD, final=91
- leaf 15:client_form_inputs:1: GOOD, final=99
- leaf 15:client_navigation:1: GOOD, final=97
- section 15: WEAK, final=58
## Run start: start=17, end=19, batch_size=3
- leaf 17:api_delete:1: GOOD, final=94
- leaf 17:client_form_inputs:1: WEAK, final=64
- leaf 17:alerts_error_handling:1: GOOD, final=95
- section 17: WEAK, final=57
- leaf 18:alerts_error_handling:1: WEAK, final=81
- leaf 18:js_algorithms:1: GOOD, final=94
- section 18: WEAK, final=61
- leaf 19:api_get_all:1: MASTERED_100, final=100
- section 19: GOOD, final=90
## Run start: start=17, end=18, batch_size=2
- leaf 17:api_delete:1: GOOD, final=94
- leaf 17:client_form_inputs:1: GOOD, final=94
- leaf 17:alerts_error_handling:1: GOOD, final=95
- section 17: WEAK, final=60
- leaf 18:alerts_error_handling:1: GOOD, final=94
- leaf 18:js_algorithms:1: GOOD, final=95
- section 18: WEAK, final=62
## Run start: start=20, end=22, batch_size=3
- leaf 20:api_get_all:1: GOOD, final=94
- leaf 20:api_get_filtered:1: WEAK, final=64
- section 20: WEAK, final=60
- leaf 21:api_post_create:1: WEAK, final=75
- leaf 21:db_uniqueness:1: GOOD, final=94
- leaf 21:alerts_error_handling:1: MASTERED_100, final=100
- leaf 21:oop_design:1: WEAK, final=70
- section 21: WEAK, final=62
- leaf 22:api_put_update:1: WEAK, final=64
- leaf 22:alerts_error_handling:1: GOOD, final=95
- section 22: WEAK, final=24
## Run start: start=20, end=22, batch_size=3
- leaf 20:api_get_all:1: GOOD, final=94
- leaf 20:api_get_filtered:1: GOOD, final=98
- section 20: WEAK, final=65
- leaf 21:api_post_create:1: GOOD, final=95
- leaf 21:db_uniqueness:1: GOOD, final=94
- leaf 21:alerts_error_handling:1: MASTERED_100, final=100
- leaf 21:oop_design:1: MASTERED_100, final=100
- section 21: WEAK, final=66
- leaf 22:api_put_update:1: GOOD, final=94
- leaf 22:alerts_error_handling:1: GOOD, final=95
- section 22: WEAK, final=28
## Run start: start=23, end=25, batch_size=3
- leaf 23:client_validation_rules:1: GOOD, final=94
- leaf 23:js_algorithms:1: WEAK, final=68
- section 23: WEAK, final=55
- leaf 24:alerts_error_handling:1: GOOD, final=98
- leaf 24:js_algorithms:1: WEAK, final=64
- leaf 24:node_file_io:1: WEAK, final=48
- section 24: WEAK, final=80
- leaf 25:api_get_all:1: MASTERED_100, final=100
- leaf 25:api_put_update:1: GOOD, final=94
- leaf 25:api_delete:1: GOOD, final=94
- leaf 25:theory_explanation:1: WEAK, final=76
- section 25: WEAK, final=51
## Run start: start=23, end=25, batch_size=3
- leaf 23:client_validation_rules:1: GOOD, final=95
- leaf 23:js_algorithms:1: MASTERED_100, final=100
- section 23: WEAK, final=60
- leaf 24:alerts_error_handling:1: MASTERED_100, final=100
- leaf 24:js_algorithms:1: GOOD, final=94
- leaf 24:node_file_io:1: GOOD, final=98
- section 24: GOOD, final=89
- leaf 25:api_get_all:1: MASTERED_100, final=100
- leaf 25:api_put_update:1: GOOD, final=94
- leaf 25:api_delete:1: GOOD, final=94
- leaf 25:theory_explanation:1: GOOD, final=94
- section 25: WEAK, final=52
## Run start: start=26, end=28, batch_size=3
- leaf 26:db_persistence:1: GOOD, final=98
- leaf 26:theory_explanation:1: WEAK, final=82
- section 26: WEAK, final=61
- leaf 27:theory_explanation:1: WEAK, final=68
- section 27: WEAK, final=80
- leaf 28:theory_explanation:1: WEAK, final=68
- section 28: WEAK, final=80
## Run start: start=26, end=28, batch_size=3
- leaf 26:db_persistence:1: GOOD, final=98
- leaf 26:theory_explanation:1: GOOD, final=94
- section 26: WEAK, final=63
- leaf 27:theory_explanation:1: GOOD, final=94
- section 27: GOOD, final=88
- leaf 28:theory_explanation:1: GOOD, final=94
- section 28: GOOD, final=88
## Run start: start=29, end=31, batch_size=3
- leaf 29:theory_explanation:1: GOOD, final=94
- section 29: GOOD, final=88
- leaf 30:api_get_filtered:1: WEAK, final=64
- leaf 30:js_algorithms:1: GOOD, final=94
- section 30: WEAK, final=56
- leaf 31:api_post_create:1: WEAK, final=74
- leaf 31:server_html_route:1: GOOD, final=96
- leaf 31:client_form_inputs:1: GOOD, final=94
- leaf 31:client_validation_rules:1: GOOD, final=95
- leaf 31:node_file_io:1: WEAK, final=86
- section 31: WEAK, final=74
## Run start: start=30, end=31, batch_size=2
- leaf 30:api_get_filtered:1: GOOD, final=94
- leaf 30:js_algorithms:1: GOOD, final=94
- section 30: WEAK, final=60
- leaf 31:api_post_create:1: GOOD, final=94
- leaf 31:server_html_route:1: GOOD, final=96
- leaf 31:client_form_inputs:1: GOOD, final=94
- leaf 31:client_validation_rules:1: GOOD, final=95
- leaf 31:node_file_io:1: GOOD, final=98
- section 31: WEAK, final=75
## Run start: start=32, end=34, batch_size=3
- leaf 32:question_scope_inherited:1: GOOD, final=95
- leaf 32:alerts_error_handling:1: MASTERED_100, final=100
- leaf 32:api_get_filtered:1: GOOD, final=94
- leaf 32:api_post_create:1: WEAK, final=74
- leaf 32:client_form_inputs:1: GOOD, final=96
- leaf 32:client_list_render:1: GOOD, final=94
- leaf 32:client_navigation:1: MASTERED_100, final=100
- leaf 32:client_validation_rules:1: GOOD, final=94
- leaf 32:db_uniqueness:1: GOOD, final=94
- leaf 32:js_algorithms:1: GOOD, final=94
- leaf 32:server_html_route:1: MASTERED_100, final=100
- section 32: WEAK, final=67
- leaf 33:manual_review:1: BLOCKED_MANUAL_REVIEW
- section 33: BLOCKED_MANUAL_REVIEW, final=None
- leaf 34:question_scope_inherited:1: GOOD, final=93
- leaf 34:alerts_error_handling:1: GOOD, final=95
- leaf 34:api_get_filtered:1: GOOD, final=98
- leaf 34:api_post_create:1: GOOD, final=94
- leaf 34:client_form_inputs:1: GOOD, final=94
- leaf 34:client_list_render:1: GOOD, final=94
- leaf 34:client_navigation:1: MASTERED_100, final=100
- leaf 34:client_validation_rules:1: GOOD, final=94
- leaf 34:db_uniqueness:1: GOOD, final=94
- leaf 34:js_algorithms:1: GOOD, final=94
- leaf 34:server_html_route:1: MASTERED_100, final=100
- section 34: WEAK, final=42
## Run start: start=32, end=32, batch_size=1
- leaf 32:question_scope_inherited:1: GOOD, final=95
- leaf 32:alerts_error_handling:1: MASTERED_100, final=100
- leaf 32:api_get_filtered:1: GOOD, final=94
- leaf 32:api_post_create:1: GOOD, final=94
- leaf 32:client_form_inputs:1: GOOD, final=96
- leaf 32:client_list_render:1: GOOD, final=94
- leaf 32:client_navigation:1: MASTERED_100, final=100
- leaf 32:client_validation_rules:1: GOOD, final=94
- leaf 32:db_uniqueness:1: GOOD, final=94
- leaf 32:js_algorithms:1: GOOD, final=94
- leaf 32:server_html_route:1: MASTERED_100, final=100
- section 32: WEAK, final=67
## Run start: start=35, end=37, batch_size=3
- leaf 35:db_uniqueness:1: MASTERED_100, final=100
- section 35: WEAK, final=63
- leaf 36:question_scope_inherited:1: GOOD, final=95
- leaf 36:alerts_error_handling:1: GOOD, final=95
- leaf 36:api_get_filtered:1: GOOD, final=98
- leaf 36:api_post_create:1: GOOD, final=94
- leaf 36:client_form_inputs:1: GOOD, final=94
- leaf 36:client_list_render:1: GOOD, final=94
- leaf 36:client_navigation:1: MASTERED_100, final=100
- leaf 36:client_validation_rules:1: GOOD, final=94
- leaf 36:db_uniqueness:1: WEAK, final=80
- leaf 36:js_algorithms:1: GOOD, final=94
- leaf 36:server_html_route:1: MASTERED_100, final=100
- section 36: WEAK, final=32
- leaf 37:question_scope_inherited:1: GOOD, final=95
- leaf 37:alerts_error_handling:1: GOOD, final=95
- leaf 37:api_get_filtered:1: GOOD, final=94
- leaf 37:api_post_create:1: GOOD, final=95
- leaf 37:client_form_inputs:1: GOOD, final=94
- leaf 37:client_list_render:1: GOOD, final=94
- leaf 37:client_navigation:1: GOOD, final=97
- leaf 37:client_validation_rules:1: GOOD, final=99
- leaf 37:db_uniqueness:1: GOOD, final=94
- leaf 37:js_algorithms:1: GOOD, final=94
- leaf 37:server_html_route:1: GOOD, final=91
- section 37: WEAK, final=42
## Run start: start=36, end=36, batch_size=1
- leaf 36:question_scope_inherited:1: GOOD, final=95
- leaf 36:alerts_error_handling:1: GOOD, final=95
- leaf 36:api_get_filtered:1: GOOD, final=98
- leaf 36:api_post_create:1: GOOD, final=94
- leaf 36:client_form_inputs:1: GOOD, final=94
- leaf 36:client_list_render:1: GOOD, final=94
- leaf 36:client_navigation:1: MASTERED_100, final=100
- leaf 36:client_validation_rules:1: GOOD, final=94
- leaf 36:db_uniqueness:1: MASTERED_100, final=100
- leaf 36:js_algorithms:1: GOOD, final=94
- leaf 36:server_html_route:1: MASTERED_100, final=100
- section 36: WEAK, final=33
## Run start: start=38, end=40, batch_size=3
- leaf 38:question_scope_inherited:1: GOOD, final=99
- leaf 38:alerts_error_handling:1: MASTERED_100, final=100
- leaf 38:api_get_filtered:1: WEAK, final=68
- leaf 38:api_post_create:1: GOOD, final=95
- leaf 38:client_form_inputs:1: GOOD, final=94
- leaf 38:client_list_render:1: GOOD, final=94
- leaf 38:client_navigation:1: MASTERED_100, final=100
- leaf 38:client_validation_rules:1: GOOD, final=95
- leaf 38:db_uniqueness:1: MASTERED_100, final=100
- leaf 38:js_algorithms:1: GOOD, final=95
- leaf 38:server_html_route:1: GOOD, final=91
- section 38: WEAK, final=41
- leaf 39:question_scope_inherited:1: GOOD, final=93
- leaf 39:alerts_error_handling:1: GOOD, final=95
- leaf 39:api_get_filtered:1: GOOD, final=98
- leaf 39:api_post_create:1: GOOD, final=95
- leaf 39:client_form_inputs:1: GOOD, final=94
- leaf 39:client_list_render:1: GOOD, final=94
- leaf 39:client_navigation:1: MASTERED_100, final=100
- leaf 39:client_validation_rules:1: GOOD, final=96
- leaf 39:db_uniqueness:1: GOOD, final=94
- leaf 39:js_algorithms:1: GOOD, final=94
- leaf 39:server_html_route:1: GOOD, final=96
- section 39: WEAK, final=42
- leaf 40:db_uniqueness:1: GOOD, final=94
- section 40: WEAK, final=61
## Run start: start=38, end=38, batch_size=1
- leaf 38:question_scope_inherited:1: GOOD, final=99
- leaf 38:alerts_error_handling:1: MASTERED_100, final=100
- leaf 38:api_get_filtered:1: GOOD, final=98
- leaf 38:api_post_create:1: GOOD, final=95
- leaf 38:client_form_inputs:1: GOOD, final=94
- leaf 38:client_list_render:1: GOOD, final=94
- leaf 38:client_navigation:1: MASTERED_100, final=100
- leaf 38:client_validation_rules:1: GOOD, final=95
- leaf 38:db_uniqueness:1: MASTERED_100, final=100
- leaf 38:js_algorithms:1: GOOD, final=95
- leaf 38:server_html_route:1: GOOD, final=91
- section 38: WEAK, final=42
## Run start: start=41, end=43, batch_size=3
- leaf 41:question_scope_inherited:1: GOOD, final=95
- leaf 41:alerts_error_handling:1: GOOD, final=95
- leaf 41:api_get_filtered:1: GOOD, final=98
- leaf 41:api_post_create:1: GOOD, final=95
- leaf 41:client_form_inputs:1: GOOD, final=94
- leaf 41:client_list_render:1: GOOD, final=94
- leaf 41:client_navigation:1: MASTERED_100, final=100
- leaf 41:client_validation_rules:1: GOOD, final=94
- leaf 41:db_uniqueness:1: MASTERED_100, final=100
- leaf 41:js_algorithms:1: GOOD, final=95
- leaf 41:server_html_route:1: GOOD, final=96
- section 41: WEAK, final=56
- leaf 42:question_scope_inherited:1: GOOD, final=99
- leaf 42:alerts_error_handling:1: GOOD, final=95
- leaf 42:api_get_filtered:1: GOOD, final=94
- leaf 42:api_post_create:1: GOOD, final=95
- leaf 42:client_form_inputs:1: GOOD, final=94
- leaf 42:client_list_render:1: GOOD, final=94
- leaf 42:client_navigation:1: MASTERED_100, final=100
- leaf 42:client_validation_rules:1: WEAK, final=83
- leaf 42:db_uniqueness:1: GOOD, final=94
- leaf 42:js_algorithms:1: GOOD, final=94
- leaf 42:server_html_route:1: MASTERED_100, final=100
- section 42: WEAK, final=42
- leaf 43:js_algorithms:1: GOOD, final=94
- section 43: GOOD, final=88
## Run start: start=42, end=42, batch_size=1
- leaf 42:question_scope_inherited:1: GOOD, final=99
- leaf 42:alerts_error_handling:1: GOOD, final=95
- leaf 42:api_get_filtered:1: GOOD, final=94
- leaf 42:api_post_create:1: GOOD, final=95
- leaf 42:client_form_inputs:1: GOOD, final=94
- leaf 42:client_list_render:1: GOOD, final=94
- leaf 42:client_navigation:1: MASTERED_100, final=100
- leaf 42:client_validation_rules:1: GOOD, final=95
- leaf 42:db_uniqueness:1: GOOD, final=94
- leaf 42:js_algorithms:1: GOOD, final=94
- leaf 42:server_html_route:1: MASTERED_100, final=100
- section 42: WEAK, final=42
## Run start: start=44, end=46, batch_size=3
- leaf 44:question_scope_inherited:1: WEAK, final=72
- leaf 44:alerts_error_handling:1: GOOD, final=95
- leaf 44:api_get_filtered:1: GOOD, final=98
- leaf 44:api_post_create:1: GOOD, final=95
- leaf 44:client_form_inputs:1: GOOD, final=96
- leaf 44:client_list_render:1: GOOD, final=94
- leaf 44:client_navigation:1: MASTERED_100, final=100
- leaf 44:client_validation_rules:1: GOOD, final=96
- leaf 44:db_uniqueness:1: MASTERED_100, final=100
- leaf 44:js_algorithms:1: MASTERED_100, final=100
- leaf 44:server_html_route:1: GOOD, final=96
- section 44: WEAK, final=47
- leaf 45:question_scope_inherited:1: WEAK, final=77
- leaf 45:alerts_error_handling:1: GOOD, final=95
- leaf 45:api_get_filtered:1: GOOD, final=98
- leaf 45:api_post_create:1: GOOD, final=95
- leaf 45:client_form_inputs:1: GOOD, final=94
- leaf 45:client_list_render:1: GOOD, final=94
- leaf 45:client_navigation:1: MASTERED_100, final=100
- leaf 45:client_validation_rules:1: GOOD, final=94
- leaf 45:db_uniqueness:1: GOOD, final=94
- leaf 45:js_algorithms:1: GOOD, final=95
- leaf 45:server_html_route:1: GOOD, final=91
- section 45: WEAK, final=47
- leaf 46:question_scope_inherited:1: GOOD, final=99
- leaf 46:alerts_error_handling:1: MASTERED_100, final=100
- leaf 46:api_get_filtered:1: GOOD, final=98
- leaf 46:api_post_create:1: GOOD, final=95
- leaf 46:client_form_inputs:1: GOOD, final=94
- leaf 46:client_list_render:1: GOOD, final=94
- leaf 46:client_navigation:1: MASTERED_100, final=100
- leaf 46:client_validation_rules:1: WEAK, final=75
- leaf 46:db_uniqueness:1: MASTERED_100, final=100
- leaf 46:js_algorithms:1: WEAK, final=50
- leaf 46:server_html_route:1: GOOD, final=96
- section 46: WEAK, final=41
## Run start: start=44, end=46, batch_size=3
- leaf 44:question_scope_inherited:1: GOOD, final=98
- leaf 44:alerts_error_handling:1: GOOD, final=95
- leaf 44:api_get_filtered:1: GOOD, final=98
- leaf 44:api_post_create:1: GOOD, final=95
- leaf 44:client_form_inputs:1: GOOD, final=96
- leaf 44:client_list_render:1: GOOD, final=94
- leaf 44:client_navigation:1: MASTERED_100, final=100
- leaf 44:client_validation_rules:1: GOOD, final=99
- leaf 44:db_uniqueness:1: MASTERED_100, final=100
- leaf 44:js_algorithms:1: WEAK, final=64
- leaf 44:server_html_route:1: GOOD, final=96
- section 44: WEAK, final=46
- leaf 45:question_scope_inherited:1: GOOD, final=96
- leaf 45:alerts_error_handling:1: GOOD, final=95
- leaf 45:api_get_filtered:1: GOOD, final=98
- leaf 45:api_post_create:1: GOOD, final=95
- leaf 45:client_form_inputs:1: GOOD, final=96
- leaf 45:client_list_render:1: GOOD, final=94
- leaf 45:client_navigation:1: MASTERED_100, final=100
- leaf 45:client_validation_rules:1: GOOD, final=95
- leaf 45:db_uniqueness:1: GOOD, final=94
- leaf 45:js_algorithms:1: WEAK, final=64
- leaf 45:server_html_route:1: GOOD, final=91
- section 45: WEAK, final=47
- leaf 46:question_scope_inherited:1: GOOD, final=96
- leaf 46:alerts_error_handling:1: MASTERED_100, final=100
- leaf 46:api_get_filtered:1: GOOD, final=98
- leaf 46:api_post_create:1: GOOD, final=95
- leaf 46:client_form_inputs:1: GOOD, final=94
- leaf 46:client_list_render:1: GOOD, final=94
- leaf 46:client_navigation:1: MASTERED_100, final=100
- leaf 46:client_validation_rules:1: GOOD, final=99
- leaf 46:db_uniqueness:1: MASTERED_100, final=100
- leaf 46:js_algorithms:1: WEAK, final=64
- leaf 46:server_html_route:1: GOOD, final=96
- section 46: WEAK, final=42
## Run start: start=44, end=46, batch_size=3
- leaf 44:question_scope_inherited:1: GOOD, final=98
- leaf 44:alerts_error_handling:1: GOOD, final=95
- leaf 44:api_get_filtered:1: GOOD, final=98
- leaf 44:api_post_create:1: GOOD, final=95
- leaf 44:client_form_inputs:1: GOOD, final=96
- leaf 44:client_list_render:1: GOOD, final=94
- leaf 44:client_navigation:1: MASTERED_100, final=100
- leaf 44:client_validation_rules:1: GOOD, final=99
- leaf 44:db_uniqueness:1: MASTERED_100, final=100
- leaf 44:js_algorithms:1: GOOD, final=94
- leaf 44:server_html_route:1: GOOD, final=96
- section 44: WEAK, final=47
- leaf 45:question_scope_inherited:1: GOOD, final=96
- leaf 45:alerts_error_handling:1: GOOD, final=95
- leaf 45:api_get_filtered:1: GOOD, final=98
- leaf 45:api_post_create:1: GOOD, final=95
- leaf 45:client_form_inputs:1: GOOD, final=96
- leaf 45:client_list_render:1: GOOD, final=94
- leaf 45:client_navigation:1: MASTERED_100, final=100
- leaf 45:client_validation_rules:1: GOOD, final=95
- leaf 45:db_uniqueness:1: GOOD, final=94
- leaf 45:js_algorithms:1: MASTERED_100, final=100
- leaf 45:server_html_route:1: GOOD, final=91
- section 45: WEAK, final=48
- leaf 46:question_scope_inherited:1: GOOD, final=96
- leaf 46:alerts_error_handling:1: MASTERED_100, final=100
- leaf 46:api_get_filtered:1: GOOD, final=98
- leaf 46:api_post_create:1: GOOD, final=95
- leaf 46:client_form_inputs:1: GOOD, final=94
- leaf 46:client_list_render:1: GOOD, final=94
- leaf 46:client_navigation:1: MASTERED_100, final=100
- leaf 46:client_validation_rules:1: GOOD, final=99
- leaf 46:db_uniqueness:1: MASTERED_100, final=100
- leaf 46:js_algorithms:1: GOOD, final=94
- leaf 46:server_html_route:1: GOOD, final=96
- section 46: WEAK, final=43
## Run start: start=47, end=49, batch_size=3
- leaf 47:question_scope_inherited:1: GOOD, final=96
- leaf 47:alerts_error_handling:1: MASTERED_100, final=100
- leaf 47:api_get_filtered:1: GOOD, final=98
- leaf 47:api_post_create:1: GOOD, final=95
- leaf 47:client_form_inputs:1: MASTERED_100, final=100
- leaf 47:client_list_render:1: GOOD, final=94
- leaf 47:client_navigation:1: MASTERED_100, final=100
- leaf 47:client_validation_rules:1: GOOD, final=99
- leaf 47:db_uniqueness:1: MASTERED_100, final=100
- leaf 47:js_algorithms:1: MASTERED_100, final=100
- leaf 47:server_html_route:1: GOOD, final=96
- section 47: WEAK, final=57
- leaf 48:api_get_filtered:1: MASTERED_100, final=100
- leaf 48:api_post_create:1: WEAK, final=75
- leaf 48:server_html_route:1: GOOD, final=93
- leaf 48:client_form_inputs:1: GOOD, final=94
- leaf 48:client_validation_rules:1: GOOD, final=94
- leaf 48:client_navigation:1: WEAK, final=67
- leaf 48:client_list_render:1: GOOD, final=94
- leaf 48:alerts_error_handling:1: MASTERED_100, final=100
- section 48: WEAK, final=68
- leaf 49:api_get_filtered:1: GOOD, final=98
- leaf 49:js_algorithms:1: GOOD, final=94
- section 49: WEAK, final=61
## Run start: start=48, end=48, batch_size=1
- leaf 48:api_get_filtered:1: MASTERED_100, final=100
- leaf 48:api_post_create:1: GOOD, final=95
- leaf 48:server_html_route:1: GOOD, final=93
- leaf 48:client_form_inputs:1: GOOD, final=94
- leaf 48:client_validation_rules:1: GOOD, final=94
- leaf 48:client_navigation:1: GOOD, final=97
- leaf 48:client_list_render:1: GOOD, final=94
- leaf 48:alerts_error_handling:1: MASTERED_100, final=100
- section 48: WEAK, final=70
## Run start: start=50, end=52, batch_size=3
- leaf 50:manual_review:1: BLOCKED_MANUAL_REVIEW
- section 50: BLOCKED_MANUAL_REVIEW, final=None
- leaf 51:manual_review:1: BLOCKED_MANUAL_REVIEW
- section 51: BLOCKED_MANUAL_REVIEW, final=None
- leaf 52:client_form_inputs:1: GOOD, final=94
- leaf 52:client_validation_rules:1: GOOD, final=94
- section 52: GOOD, final=88
## Run start: start=50, end=51, batch_size=1
- leaf 50:question_scope_inherited:1: GOOD, final=96
- leaf 50:client_navigation:1: GOOD, final=97
- leaf 50:client_form_inputs:1: GOOD, final=94
- leaf 50:client_validation_rules:1: GOOD, final=94
- leaf 50:alerts_error_handling:1: MASTERED_100, final=100
- leaf 50:client_list_render:1: GOOD, final=94
- section 50: WEAK, final=70
## Run start: start=51, end=51, batch_size=1
- leaf 51:js_algorithms:1: GOOD, final=94
- leaf 51:alerts_error_handling:1: GOOD, final=94
- section 51: WEAK, final=70
## Run start: start=53, end=55, batch_size=3
- leaf 53:client_validation_rules:1: GOOD, final=94
- section 53: GOOD, final=88
- leaf 54:client_validation_rules:1: GOOD, final=94
- section 54: WEAK, final=53
- leaf 55:server_html_route:1: GOOD, final=96
- leaf 55:client_form_inputs:1: GOOD, final=94
- leaf 55:client_navigation:1: MASTERED_100, final=100
- leaf 55:alerts_error_handling:1: GOOD, final=95
- section 55: WEAK, final=73
## Run start: start=56, end=58, batch_size=3
- leaf 56:question_scope_inherited:1: GOOD, final=96
- leaf 56:alerts_error_handling:1: MASTERED_100, final=100
- leaf 56:api_delete:1: GOOD, final=94
- leaf 56:api_get_all:1: WEAK, final=70
- leaf 56:api_get_filtered:1: GOOD, final=94
- leaf 56:api_post_create:1: GOOD, final=94
- leaf 56:client_form_inputs:1: GOOD, final=94
- leaf 56:client_list_render:1: GOOD, final=94
- leaf 56:client_navigation:1: MASTERED_100, final=100
- leaf 56:client_validation_rules:1: GOOD, final=95
- leaf 56:db_persistence:1: GOOD, final=98
- leaf 56:server_html_route:1: GOOD, final=91
- section 56: WEAK, final=46
- leaf 57:client_form_inputs:1: GOOD, final=94
- section 57: WEAK, final=44
- leaf 58:api_get_all:1: WEAK, final=70
- leaf 58:api_delete:1: GOOD, final=94
- leaf 58:db_persistence:1: MASTERED_100, final=100
- leaf 58:server_html_route:1: GOOD, final=96
- leaf 58:client_form_inputs:1: MASTERED_100, final=100
- leaf 58:client_navigation:1: GOOD, final=94
- leaf 58:client_list_render:1: GOOD, final=94
- leaf 58:alerts_error_handling:1: WEAK, final=74
- section 58: WEAK, final=59
## Run start: start=56, end=58, batch_size=3
- leaf 56:client_form_inputs:1: GOOD, final=94
- leaf 56:client_validation_rules:1: GOOD, final=94
- section 56: GOOD, final=88
- leaf 57:client_form_inputs:1: GOOD, final=94
- section 57: WEAK, final=44
- leaf 58:client_validation_rules:1: GOOD, final=99
- leaf 58:alerts_error_handling:1: MASTERED_100, final=100
- leaf 58:client_navigation:1: MASTERED_100, final=100
- leaf 58:client_list_render:1: GOOD, final=94
- section 58: WEAK, final=76
## Run start: start=59, end=61, batch_size=3
- leaf 59:api_get_all:1: WEAK, final=70
- leaf 59:api_post_create:1: MASTERED_100, final=100
- leaf 59:server_html_route:1: GOOD, final=96
- section 59: WEAK, final=56
- leaf 60:api_post_create:1: WEAK, final=60
- section 60: WEAK, final=53
- leaf 61:api_get_all:1: WEAK, final=64
- leaf 61:server_html_route:1: GOOD, final=85
- leaf 61:client_navigation:1: MASTERED_100, final=100
- section 61: WEAK, final=61
## Run start: start=59, end=61, batch_size=3
- leaf 59:api_get_all:1: MASTERED_100, final=100
- leaf 59:api_post_create:1: MASTERED_100, final=100
- leaf 59:server_html_route:1: GOOD, final=96
- section 59: WEAK, final=59
- leaf 60:api_post_create:1: MASTERED_100, final=100
- section 60: WEAK, final=65
- leaf 61:api_get_all:1: GOOD, final=94
- leaf 61:server_html_route:1: GOOD, final=85
- leaf 61:client_navigation:1: MASTERED_100, final=100
- section 61: WEAK, final=64
## Run start: start=62, end=64, batch_size=3
- leaf 62:client_form_inputs:1: GOOD, final=94
- leaf 62:client_validation_rules:1: GOOD, final=94
- section 62: WEAK, final=60
- leaf 63:client_form_inputs:1: GOOD, final=94
- leaf 63:client_validation_rules:1: GOOD, final=94
- section 63: GOOD, final=88
- leaf 64:client_form_inputs:1: GOOD, final=94
- section 64: WEAK, final=39
## Run start: start=65, end=67, batch_size=3
- leaf 65:api_post_create:1: GOOD, final=95
- leaf 65:client_form_inputs:1: GOOD, final=94
- section 65: GOOD, final=88
- leaf 66:api_get_filtered:1: GOOD, final=94
- leaf 66:client_form_inputs:1: GOOD, final=99
- leaf 66:client_list_render:1: GOOD, final=94
- section 66: WEAK, final=51
- leaf 67:client_validation_rules:1: GOOD, final=99
- section 67: GOOD, final=89
## Run start: start=68, end=70, batch_size=3
- leaf 68:client_validation_rules:1: GOOD, final=95
- section 68: WEAK, final=61
- leaf 69:client_validation_rules:1: GOOD, final=94
- section 69: WEAK, final=61
- leaf 70:client_form_inputs:1: GOOD, final=94
- leaf 70:client_validation_rules:1: GOOD, final=94
- section 70: WEAK, final=68
## Run start: start=71, end=73, batch_size=3
- leaf 71:api_put_update:1: GOOD, final=94
- leaf 71:server_html_route:1: MASTERED_100, final=100
- leaf 71:client_form_inputs:1: GOOD, final=94
- leaf 71:client_validation_rules:1: WEAK, final=84
- leaf 71:client_navigation:1: WEAK, final=70
- leaf 71:alerts_error_handling:1: GOOD, final=95
- section 71: WEAK, final=70
- leaf 72:js_algorithms:1: GOOD, final=94
- section 72: GOOD, final=88
- leaf 73:client_validation_rules:1: GOOD, final=94
- leaf 73:oop_design:1: WEAK, final=76
- leaf 73:node_file_io:1: WEAK, final=68
- section 73: WEAK, final=54
## Run start: start=71, end=71, batch_size=1
- leaf 71:api_put_update:1: GOOD, final=94
- leaf 71:server_html_route:1: MASTERED_100, final=100
- leaf 71:client_form_inputs:1: GOOD, final=94
- leaf 71:client_validation_rules:1: GOOD, final=96
- leaf 71:client_navigation:1: MASTERED_100, final=100
- leaf 71:alerts_error_handling:1: GOOD, final=95
- section 71: WEAK, final=71
## Run start: start=73, end=73, batch_size=1
- leaf 73:client_validation_rules:1: GOOD, final=95
- leaf 73:oop_design:1: GOOD, final=96
- leaf 73:node_file_io:1: WEAK, final=78
- section 73: WEAK, final=57
## Run start: start=73, end=73, batch_size=1
- leaf 73:client_validation_rules:1: GOOD, final=95
- leaf 73:oop_design:1: GOOD, final=96
- leaf 73:node_file_io:1: GOOD, final=98
- section 73: WEAK, final=59
## Run start: start=4, end=4, batch_size=1
- leaf 4:question_scope_inherited:1: GOOD, final=96
- leaf 4:client_navigation:1: MASTERED_100, final=100
- leaf 4:client_form_inputs:1: GOOD, final=96
- leaf 4:client_validation_rules:1: GOOD, final=99
- leaf 4:alerts_error_handling:1: MASTERED_100, final=100
- leaf 4:client_list_render:1: GOOD, final=94
- section 4: WEAK, final=29
## Run start: start=33, end=33, batch_size=1
- leaf 33:js_algorithms:1: GOOD, final=94
- section 33: GOOD, final=88
## Run start: start=4, end=4, batch_size=1
- leaf 4:question_scope_inherited:1: GOOD, final=96
- leaf 4:client_navigation:1: MASTERED_100, final=100
- leaf 4:client_form_inputs:1: GOOD, final=96
- leaf 4:client_validation_rules:1: GOOD, final=99
- leaf 4:alerts_error_handling:1: MASTERED_100, final=100
- leaf 4:client_list_render:1: GOOD, final=94
- leaf 4:js_algorithms:1: GOOD, final=94
- section 4: WEAK, final=76
## Run start: start=1, end=5, batch_size=5
- section 1: WEAK, final=72
- section 2: WEAK, final=50
- section 3: WEAK, final=66
- section 4: GOOD, final=89
- section 5: WEAK, final=43
## Run start: start=1, end=5, batch_size=5
- section 1: GOOD, final=87
- section 2: WEAK, final=50
- section 3: WEAK, final=66
- section 4: GOOD, final=90
- section 5: WEAK, final=43
## Run start: start=1, end=5, batch_size=5
- section 1: GOOD, final=87
- section 2: WEAK, final=64
- section 3: WEAK, final=66
- section 4: GOOD, final=90
- section 5: WEAK, final=82
## Run start: start=1, end=5, batch_size=5
- section 1: GOOD, final=87
- section 2: WEAK, final=59
- section 3: WEAK, final=63
- section 4: WEAK, final=83
- section 5: GOOD, final=88
## Run start: start=22, end=22, batch_size=1
- section 22: WEAK, final=38
## Run start: start=22, end=22, batch_size=1
- section 22: WEAK, final=39
## Run start: start=22, end=22, batch_size=1
- section 22: WEAK, final=62
## Run start: start=22, end=22, batch_size=1
- section 22: WEAK, final=73
## Run start: start=22, end=22, batch_size=1
- section 22: GOOD, final=88
## Run start: start=57, end=57, batch_size=1
- section 57: WEAK, final=54
## Run start: start=57, end=57, batch_size=1
- section 57: WEAK, final=69
## Run start: start=57, end=57, batch_size=1
- section 57: GOOD, final=88
## Run start: start=64, end=64, batch_size=1
- section 64: GOOD, final=88
## Run start: start=34, end=40, batch_size=7
- section 34: WEAK, final=63
- section 35: WEAK, final=78
- section 36: WEAK, final=38
- section 37: WEAK, final=60
- section 38: WEAK, final=54
- section 39: WEAK, final=65
- section 40: WEAK, final=68
## Run start: start=34, end=40, batch_size=7
- section 34: GOOD, final=88
- section 35: GOOD, final=90
- section 36: WEAK, final=68
- section 37: WEAK, final=70
- section 38: WEAK, final=63
- section 39: GOOD, final=88
- section 40: GOOD, final=88
## Run start: start=36, end=38, batch_size=3
- section 36: GOOD, final=88
- section 37: GOOD, final=88
- section 38: GOOD, final=88
## Run start: start=41, end=47, batch_size=7
- section 41: WEAK, final=62
- section 42: WEAK, final=74
- section 43: WEAK, final=62
- section 44: WEAK, final=56
- section 45: WEAK, final=53
- section 46: WEAK, final=65
- section 47: WEAK, final=59
## Run start: start=41, end=47, batch_size=7
- section 41: WEAK, final=74
- section 42: WEAK, final=74
- section 43: WEAK, final=75
- section 44: WEAK, final=76
- section 45: WEAK, final=65
- section 46: WEAK, final=75
- section 47: GOOD, final=89
## Run start: start=41, end=46, batch_size=6
- section 41: GOOD, final=88
- section 42: GOOD, final=88
- section 43: GOOD, final=88
- section 44: GOOD, final=89
- section 45: GOOD, final=88
- section 46: GOOD, final=89
## Run start: start=1, end=8, batch_size=8
- section 1: WEAK, final=51
- section 2: WEAK, final=67
- section 3: WEAK, final=57
- section 4: WEAK, final=63
- section 5: WEAK, final=77
- section 6: WEAK, final=52
- section 7: WEAK, final=50
- section 8: WEAK, final=50
## Run start: start=1, end=8, batch_size=8
- section 1: WEAK, final=63
- section 2: WEAK, final=72
- section 3: WEAK, final=69
- section 4: WEAK, final=73
- section 5: GOOD, final=88
- section 6: WEAK, final=61
- section 7: WEAK, final=70
- section 8: WEAK, final=59

## Timestamp note: 2026-05-07 14:28:39 IDT
- Batch 4A rerun completed and scoreboards were written.
[2026-05-07T14:30:13+03:00] ## Run start: start=1, end=8, batch_size=8
[2026-05-07T14:31:27+03:00] - section 1: GOOD, final=87
[2026-05-07T14:33:05+03:00] - section 2: GOOD, final=88
[2026-05-07T14:34:48+03:00] - section 3: GOOD, final=88
[2026-05-07T14:38:56+03:00] - section 4: GOOD, final=89
[2026-05-07T14:40:21+03:00] - section 5: GOOD, final=88
[2026-05-07T14:41:36+03:00] - section 6: GOOD, final=89
[2026-05-07T14:42:59+03:00] - section 7: GOOD, final=89
[2026-05-07T14:44:03+03:00] - section 8: GOOD, final=88
## Run start: 2026-05-07 14:45 IDT | start=9, end=18, batch_size=10
- section 9: GOOD, final=88
- section 10: GOOD, final=88
- section 11: GOOD, final=88
- section 12: GOOD, final=88
- section 13: GOOD, final=88
- section 14: GOOD, final=88
- section 15: GOOD, final=88
- section 16: GOOD, final=88
- section 17: GOOD, final=88
- section 18: GOOD, final=88
## Run start: 2026-05-07 15:00 IDT | start=20, end=32, batch_size=13
- section 20: GOOD, final=88
- section 21: GOOD, final=89
- section 22: GOOD, final=88
- section 23: GOOD, final=89
- section 24: WEAK, final=66
- section 25: WEAK, final=67
- section 26: WEAK, final=64
- section 27: WEAK, final=40
- section 28: WEAK, final=38
- section 29: WEAK, final=36
- section 30: WEAK, final=58
- section 31: WEAK, final=71
- section 32: WEAK, final=65
## Run start: 2026-05-07 15:20 IDT | start=24, end=32, batch_size=9
- section 24: GOOD, final=89
- section 25: GOOD, final=88
- section 26: GOOD, final=88
- section 27: GOOD, final=88
- section 28: GOOD, final=88
- section 29: GOOD, final=88
- section 30: GOOD, final=88
- section 31: GOOD, final=88
- section 32: WEAK, final=67
## Run start: 2026-05-07 15:33 IDT | start=32, end=32, batch_size=1
- section 32: GOOD, final=88
## Run start: 2026-05-07 15:37 IDT | start=48, end=55, batch_size=8
- section 48: GOOD, final=88
- section 49: GOOD, final=88
- section 50: GOOD, final=88
- section 51: GOOD, final=89
- section 52: GOOD, final=88
- section 53: GOOD, final=88
- section 54: GOOD, final=88
- section 55: GOOD, final=88
## Run start: 2026-05-07 15:53 IDT | start=58, end=62, batch_size=5
- section 58: GOOD, final=88
- section 59: GOOD, final=89
- section 60: GOOD, final=90
- section 61: GOOD, final=87
- section 62: GOOD, final=88
## Run start: 2026-05-07 16:01 IDT | start=66, end=73, batch_size=8
- section 66: GOOD, final=89
- section 67: GOOD, final=89
- section 68: GOOD, final=88
- section 69: GOOD, final=88
- section 70: GOOD, final=88
- section 71: GOOD, final=90
- section 72: GOOD, final=88
- section 73: GOOD, final=88
## Run start: 2026-05-07 16:12 IDT | start=1, end=4, batch_size=4
- section 1: GOOD, final=87
- section 2: GOOD, final=88
- section 3: GOOD, final=88
- section 4: GOOD, final=89
## Run start: 2026-05-07 16:38 IDT | idx_list=3,8,9,11,13,17,20,22,25,26,30,33, batch_size=12
- section 3: GOOD, final=88
- section 8: GOOD, final=88
- section 9: GOOD, final=88
- section 11: GOOD, final=91
- section 13: GOOD, final=97
- section 17: GOOD, final=88
- section 20: GOOD, final=88
- section 22: GOOD, final=88
- section 25: GOOD, final=89
- section 26: GOOD, final=88
- section 30: GOOD, final=88
- section 33: GOOD, final=88
## Run start: 2026-05-07 17:00 IDT | idx_list=3,8,9,17,20,22,26,30,33,36,38,41, batch_size=12
- section 3: GOOD, final=88
- section 8: GOOD, final=88
- section 9: GOOD, final=88
- section 17: GOOD, final=88
- section 20: GOOD, final=88
- section 22: GOOD, final=88
- section 26: GOOD, final=88
- section 30: GOOD, final=88
- section 33: GOOD, final=88
- section 36: GOOD, final=88
- section 38: GOOD, final=88
- section 41: GOOD, final=88

## Training note: 2026-05-07 17:22 IDT | LoRA pilot on Qwen3-Coder-Next stopped: process killed during MLX load; fallback required (small model or non-LoRA prompt/RAG).
## Run start: 2026-05-07 17:23 IDT | idx_list=3,8,9,73, batch_size=4
- section 3: GOOD, final=88
- section 8: GOOD, final=88
- section 9: GOOD, final=88
- section 73: GOOD, final=98
## Run start: 2026-05-07 17:29 IDT | idx_list=3,8,9,17,20,22, batch_size=6
- section 3: GOOD, final=88
