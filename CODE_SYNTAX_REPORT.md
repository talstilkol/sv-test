# Code Syntax Audit Report

_Generated: 2026-05-04_

Runs every codeExample / fill (answer substituted) / build reference through Node's syntax parser. Skips JSX/TSX, pure TS types, SQL, and shell commands (Node can't parse those without external tools).

## Summary

| Source | Total | Checked | Skipped | **Fails** |
|---|---:|---:|---:|---:|
| codeExamples | 568 | 279 | 289 | **24** |
| fills (reconstructed) | 1764 | 1094 | 670 | **91** |
| build references | 100 | 14 | 86 | **0** |

## codeExample fails

- `ai_development::Cursor`: Invalid or unexpected token
- `ai_development::Windsurf`: Invalid left-hand side expression in prefix operation
- `ai_development::Claude Code`: Invalid or unexpected token
- `lesson_21::Vite`: Unexpected token ':'
- `lesson_22::array reference`: Identifier 'addItem' has already been declared
- `lesson_26::TypeScript`: Unexpected token ':'
- `lesson_26::Strongly Typed`: Unexpected token ':'
- `lesson_26::Compiler`: Missing initializer in const declaration
- `lesson_26::.js`: Missing initializer in const declaration
- `lesson_auth_security::OAuth`: Unexpected token '...'
- `lesson_design_systems::design tokens`: Unexpected token ':'
- `lesson_devops_deploy::preview deployment`: Unexpected token '>'
- `lesson_devops_deploy::build command`: Unexpected token ':'
- `lesson_devops_deploy::Docker`: Unexpected identifier 'build'
- `lesson_devops_deploy::image`: Unexpected identifier 'images'
- `lesson_devops_deploy::container`: Unexpected identifier 'ps'
- `lesson_devops_deploy::CD`: Unexpected identifier 'branch'
- `lesson_devops_deploy::smoke test`: Unexpected token '>'
- `lesson_nestjs::guard`: Invalid or unexpected token
- `lesson_nestjs::pipe`: Invalid or unexpected token
- `lesson_nestjs::interceptor`: Invalid or unexpected token
- `lesson_nextjs::file-system routing`: Unexpected token '>'
- `lesson_sql_orm::relation`: Unexpected number
- `react_blueprint::Component Architecture`: Unexpected end of input

## fill fails (top 30)

- `fill_l15_anon_manual_001` (lesson_15::anonymous function) answer="function": Unexpected token '=>'
- `fill_async_004` (lesson_15::Promise) answer="resolve": Unexpected token ','
- `fill_html_css_005` (lesson_html_css_foundations::box model) answer="border-box": Unexpected token '*'
- `fill_la_oauth_001` (lesson_auth_security::OAuth) answer="state": Unexpected token '...'
- `fill_lai_struct_001` (lesson_ai_engineering::structured output) answer="schema": await is only valid in async functions and the top level bodies of modules
- `fill_l18_node_eee_001` (lesson_18::Node.js) answer="node": Invalid or unexpected token
- `fill_l20_atlas_bbb_001` (lesson_20::MongoDB Atlas) answer="srv": Invalid or unexpected token
- `fill_l17_protocol_aaa_001` (lesson_17::Protocol) answer="//": Unexpected end of input
- `fill_l17_domain_aaa_001` (lesson_17::Domain) answer="domain": Unexpected end of input
- `fill_l26_string_zz_001` (lesson_26::string) answer="string": Unexpected token ':'
- `fill_l26_number_zz_001` (lesson_26::number) answer="number": Unexpected token ':'
- `fill_l26_boolean_zz_001` (lesson_26::boolean) answer="boolean": Unexpected token ':'
- `fill_l26_array_zz_001` (lesson_26::array type) answer="]": Unexpected token ':'
- `fill_l26_void_zz_001` (lesson_26::void) answer="void": Unexpected token ':'
- `fill_l26_tuple_zz_001` (lesson_26::tuple) answer="number": Unexpected token ':'
- `fill_l26_strongly_typed_zz_001` (lesson_26::Strongly Typed) answer="error": Unexpected token ':'
- `fill_l26_compiler_zz_001` (lesson_26::Compiler) answer="tsc": Invalid or unexpected token
- `fill_l26_tsc_noemit_zz_001` (lesson_26::tsc) answer="noEmit": Invalid or unexpected token
- `fill_l26_tsconfig_zz_001` (lesson_26::tsconfig.json) answer="true": Unexpected token ':'
- `fill_l20_atlas_yy_001` (lesson_20::MongoDB Atlas) answer="srv": Unexpected token ':'
- `fill_l19_catch_xx_001` (lesson_19::catch) answer="catch": Unexpected token '...'
- `fill_l26_array_ww_001` (lesson_26::array type) answer="string": Missing initializer in const declaration
- `fill_l18_node_vv_001` (lesson_18::Node.js) answer="node": Invalid or unexpected token
- `fill_l17_response_uu_001` (lesson_17::Response) answer="json": Unexpected token ']'
- `fill_es_logical_assign_ll_001` (lesson_19::nested object) answer="?": Unexpected token '='
- `fill_hook_transition_kk_001` (lesson_22::Hook) answer="startTransition": Unexpected token ')'
- `fill_build_alias_ff_001` (lesson_21::Vite) answer="alias": Unexpected token ':'
- `fill_build_tsc_noemit_ff_001` (lesson_26::TypeScript) answer="noEmit": Invalid or unexpected token
- `fill_build_lockfile_ff_001` (lesson_21::Vite) answer="package": Invalid or unexpected token
- `fill_build_engines_ff_001` (lesson_21::Vite) answer="engines": Unexpected token ':'
