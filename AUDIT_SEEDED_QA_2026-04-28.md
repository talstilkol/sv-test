# Seeded Questions QA — 2026-04-28

דגימת QA דטרמיניסטית של 170 שאלות מתוך `QUESTIONS_BANK_SEEDED`. לא נעשה שימוש באקראיות; הבחירה נעשית לפי hash יציב של סוג השאלה, id, conceptKey והתוכן.

## Bank Size

- Seeded MC: 1599
- Seeded Fill: 1025
- Total seeded: 2624

## Sample Summary

- Total audited: 170
- Sample mix: 104 MC, 66 Fill
- Clean questions: 170
- Blockers: 0
- Warnings: 0
- Notes: 0

## Checks

- MC: valid options, correctIndex, duplicate/near-duplicate options, cue risks
- Fill: one blank marker, non-empty answer/code/explanation, ambiguity notes when answer appears elsewhere
- All sampled items: seeded flag and conceptKey presence

## Audited Sample

| # | ID | Kind | Concept | Result |
|---:|---|---|---|---|
| 1 | `fill_seed_482` | fill | `lesson_21::Vite` | תקין |
| 2 | `mc_seed_1602` | mc | `workbook_taskmanager::fetch` | תקין |
| 3 | `fill_seed_642` | fill | `lesson_25::add/delete movie` | תקין |
| 4 | `mc_seed_1044` | mc | `lesson_26::React + TypeScript` | תקין |
| 5 | `fill_seed_639` | fill | `lesson_25::rating` | תקין |
| 6 | `fill_seed_891` | fill | `lesson_nestjs::dependency injection` | תקין |
| 7 | `mc_seed_694` | mc | `lesson_20::find` | תקין |
| 8 | `mc_seed_646` | mc | `lesson_20::Database` | תקין |
| 9 | `mc_seed_1231` | mc | `lesson_auth_security::XSS boundary` | תקין |
| 10 | `mc_seed_874` | mc | `lesson_23::to` | תקין |
| 11 | `mc_seed_772` | mc | `lesson_21::JSX` | תקין |
| 12 | `fill_seed_567` | fill | `lesson_23::to` | תקין |
| 13 | `mc_seed_405` | mc | `lesson_17::Express` | תקין |
| 14 | `fill_seed_445` | fill | `lesson_20::JSON` | תקין |
| 15 | `fill_seed_98` | fill | `lesson_13::Document Object Model` | תקין |
| 16 | `fill_seed_103` | fill | `lesson_13::getElementsByTagName` | תקין |
| 17 | `mc_seed_353` | mc | `lesson_17::URL` | תקין |
| 18 | `fill_seed_412` | fill | `lesson_19::fetch` | תקין |
| 19 | `mc_seed_20` | mc | `ai_development::Prompt Engineering` | תקין |
| 20 | `fill_seed_122` | fill | `lesson_13::constructor` | תקין |
| 21 | `fill_seed_10` | fill | `ai_development::ChatGPT` | תקין |
| 22 | `mc_seed_729` | mc | `lesson_20::$lte` | תקין |
| 23 | `mc_seed_778` | mc | `lesson_21::{}` | תקין |
| 24 | `fill_seed_245` | fill | `lesson_17::headers` | תקין |
| 25 | `fill_seed_380` | fill | `lesson_19::spread` | תקין |
| 26 | `fill_seed_709` | fill | `lesson_27::interface` | תקין |
| 27 | `fill_seed_762` | fill | `lesson_ai_engineering::RAG` | תקין |
| 28 | `mc_seed_449` | mc | `lesson_17::Query Parameters` | תקין |
| 29 | `mc_seed_228` | mc | `lesson_15::Exception` | תקין |
| 30 | `mc_seed_555` | mc | `lesson_19::continue` | תקין |
| 31 | `fill_seed_685` | fill | `lesson_26::Typing Props` | תקין |
| 32 | `mc_seed_964` | mc | `lesson_25::padding` | תקין |
| 33 | `mc_seed_9` | mc | `ai_development::Windsurf` | תקין |
| 34 | `mc_seed_246` | mc | `lesson_15::Synchronous` | תקין |
| 35 | `mc_seed_1070` | mc | `lesson_26::never` | תקין |
| 36 | `fill_seed_196` | fill | `lesson_16::module` | תקין |
| 37 | `mc_seed_536` | mc | `lesson_19::parameter` | תקין |
| 38 | `fill_seed_780` | fill | `lesson_auth_security::authorization` | תקין |
| 39 | `fill_seed_118` | fill | `lesson_13::removeChild` | תקין |
| 40 | `mc_seed_1130` | mc | `lesson_27::Budget Summary` | תקין |
| 41 | `mc_seed_662` | mc | `lesson_20::Connection String` | תקין |
| 42 | `mc_seed_1171` | mc | `lesson_ai_engineering::retrieval ranking` | תקין |
| 43 | `fill_seed_75` | fill | `lesson_12::uppercase` | תקין |
| 44 | `fill_seed_770` | fill | `lesson_ai_engineering::agent loop` | תקין |
| 45 | `mc_seed_766` | mc | `lesson_21::App.css` | תקין |
| 46 | `mc_seed_1490` | mc | `lesson_sql_orm::column` | תקין |
| 47 | `mc_seed_579` | mc | `lesson_19::spread` | תקין |
| 48 | `mc_seed_1607` | mc | `workbook_taskmanager::async/await` | תקין |
| 49 | `fill_seed_956` | fill | `lesson_sql_orm::JOIN` | תקין |
| 50 | `fill_seed_560` | fill | `lesson_23::Routes` | תקין |
| 51 | `fill_seed_650` | fill | `lesson_26::Strongly Typed` | תקין |
| 52 | `mc_seed_1139` | mc | `lesson_ai_engineering::Vercel AI SDK` | תקין |
| 53 | `mc_seed_201` | mc | `lesson_13::inheritance` | תקין |
| 54 | `mc_seed_1276` | mc | `lesson_design_systems::Radix primitives` | תקין |
| 55 | `fill_seed_731` | fill | `lesson_27::Income` | תקין |
| 56 | `fill_seed_94` | fill | `lesson_13::Method` | תקין |
| 57 | `fill_seed_585` | fill | `lesson_23::MainScreen` | תקין |
| 58 | `mc_seed_1012` | mc | `lesson_26::tsconfig.json` | תקין |
| 59 | `mc_seed_470` | mc | `lesson_18::GET` | תקין |
| 60 | `mc_seed_11` | mc | `ai_development::Claude Code` | תקין |
| 61 | `mc_seed_870` | mc | `lesson_23::Link` | תקין |
| 62 | `mc_seed_632` | mc | `lesson_19::scope` | תקין |
| 63 | `mc_seed_331` | mc | `lesson_16::fs.writeFile` | תקין |
| 64 | `mc_seed_860` | mc | `lesson_23::Path` | תקין |
| 65 | `fill_seed_990` | fill | `react_blueprint::Container vs Presentational` | תקין |
| 66 | `fill_seed_596` | fill | `lesson_24::fetching data` | תקין |
| 67 | `mc_seed_215` | mc | `lesson_13::setItem` | תקין |
| 68 | `mc_seed_314` | mc | `lesson_16::dir` | תקין |
| 69 | `mc_seed_603` | mc | `lesson_19::try` | תקין |
| 70 | `mc_seed_509` | mc | `lesson_19::let` | תקין |
| 71 | `mc_seed_593` | mc | `lesson_19::class` | תקין |
| 72 | `mc_seed_1539` | mc | `lesson_tooling_git::Prettier` | תקין |
| 73 | `mc_seed_700` | mc | `lesson_20::findOneAndUpdate` | תקין |
| 74 | `fill_seed_777` | fill | `lesson_ai_engineering::fine-tuning boundary` | תקין |
| 75 | `fill_seed_878` | fill | `lesson_html_css_foundations::cascade and specificity` | תקין |
| 76 | `fill_seed_325` | fill | `lesson_19::console.log` | תקין |
| 77 | `mc_seed_1382` | mc | `lesson_nestjs::provider` | תקין |
| 78 | `mc_seed_222` | mc | `lesson_13::querySelectorAll` | תקין |
| 79 | `mc_seed_1115` | mc | `lesson_27::Income` | תקין |
| 80 | `fill_seed_312` | fill | `lesson_18::form` | תקין |
| 81 | `mc_seed_1517` | mc | `lesson_sql_orm::Drizzle` | תקין |
| 82 | `mc_seed_785` | mc | `lesson_21::export default` | תקין |
| 83 | `mc_seed_1571` | mc | `react_blueprint::Testing Strategies` | תקין |
| 84 | `fill_seed_455` | fill | `lesson_20::find` | תקין |
| 85 | `mc_seed_833` | mc | `lesson_22::props` | תקין |
| 86 | `fill_seed_1023` | fill | `workbook_taskmanager::fetch` | תקין |
| 87 | `mc_seed_65` | mc | `lesson_11::scope` | תקין |
| 88 | `fill_seed_190` | fill | `lesson_16::npm start` | תקין |
| 89 | `mc_seed_1321` | mc | `lesson_devops_deploy::build command` | תקין |
| 90 | `fill_seed_541` | fill | `lesson_22::parent component` | תקין |
| 91 | `mc_seed_720` | mc | `lesson_20::$gt` | תקין |
| 92 | `mc_seed_738` | mc | `lesson_21::Client Side` | תקין |
| 93 | `mc_seed_362` | mc | `lesson_17::Path` | תקין |
| 94 | `fill_seed_67` | fill | `lesson_12::map` | תקין |
| 95 | `mc_seed_1342` | mc | `lesson_devops_deploy::volume` | תקין |
| 96 | `fill_seed_15` | fill | `ai_development::AI Pair Programming` | תקין |
| 97 | `fill_seed_18` | fill | `ai_development::AI Code Review` | תקין |
| 98 | `mc_seed_595` | mc | `lesson_19::class` | תקין |
| 99 | `mc_seed_81` | mc | `lesson_11::push` | תקין |
| 100 | `fill_seed_495` | fill | `lesson_21::App.css` | תקין |
| 101 | `mc_seed_1084` | mc | `lesson_27::extends interface` | תקין |
| 102 | `mc_seed_763` | mc | `lesson_21::App.jsx` | תקין |
| 103 | `fill_seed_1021` | fill | `workbook_taskmanager::try/catch` | תקין |
| 104 | `mc_seed_157` | mc | `lesson_13::getElementById` | תקין |
| 105 | `mc_seed_1232` | mc | `lesson_auth_security::XSS boundary` | תקין |
| 106 | `mc_seed_1147` | mc | `lesson_ai_engineering::prompt messages` | תקין |
| 107 | `mc_seed_1182` | mc | `lesson_ai_engineering::hallucination check` | תקין |
| 108 | `mc_seed_675` | mc | `lesson_20::Value` | תקין |
| 109 | `fill_seed_991` | fill | `react_blueprint::Container vs Presentational` | תקין |
| 110 | `mc_seed_1600` | mc | `workbook_taskmanager::try/catch` | תקין |
| 111 | `fill_seed_818` | fill | `lesson_closures::stale closure` | תקין |
| 112 | `fill_seed_181` | fill | `lesson_16::Command Line Interface` | תקין |
| 113 | `mc_seed_774` | mc | `lesson_21::className` | תקין |
| 114 | `fill_seed_99` | fill | `lesson_13::document` | תקין |
| 115 | `mc_seed_980` | mc | `lesson_25::search` | תקין |
| 116 | `mc_seed_887` | mc | `lesson_23::Provider` | תקין |
| 117 | `mc_seed_1404` | mc | `lesson_nestjs::pipe` | תקין |
| 118 | `mc_seed_565` | mc | `lesson_19::filter` | תקין |
| 119 | `mc_seed_517` | mc | `lesson_19::const` | תקין |
| 120 | `fill_seed_369` | fill | `lesson_19::forEach` | תקין |
| 121 | `mc_seed_323` | mc | `lesson_16::type nul` | תקין |
| 122 | `mc_seed_953` | mc | `lesson_25::utility classes` | תקין |
| 123 | `mc_seed_1211` | mc | `lesson_auth_security::access token` | תקין |
| 124 | `fill_seed_352` | fill | `lesson_19::parameter` | תקין |
| 125 | `mc_seed_982` | mc | `lesson_25::add/delete movie` | תקין |
| 126 | `mc_seed_1108` | mc | `lesson_27::User` | תקין |
| 127 | `mc_seed_120` | mc | `lesson_12::index` | תקין |
| 128 | `fill_seed_524` | fill | `lesson_22::re-render` | תקין |
| 129 | `mc_seed_797` | mc | `lesson_21::rendering` | תקין |
| 130 | `fill_seed_233` | fill | `lesson_17::Domain` | תקין |
| 131 | `fill_seed_255` | fill | `lesson_17::Update` | תקין |
| 132 | `fill_seed_842` | fill | `lesson_design_systems::component registry` | תקין |
| 133 | `mc_seed_610` | mc | `lesson_19::throw` | תקין |
| 134 | `fill_seed_550` | fill | `lesson_22::deletePost` | תקין |
| 135 | `mc_seed_604` | mc | `lesson_19::try` | תקין |
| 136 | `mc_seed_223` | mc | `lesson_13::querySelectorAll` | תקין |
| 137 | `fill_seed_907` | fill | `lesson_nestjs::repository pattern` | תקין |
| 138 | `fill_seed_558` | fill | `lesson_23::Path` | תקין |
| 139 | `mc_seed_585` | mc | `lesson_19::nested object` | תקין |
| 140 | `fill_seed_819` | fill | `lesson_closures::stale closure` | תקין |
| 141 | `fill_seed_383` | fill | `lesson_19::nested object` | תקין |
| 142 | `mc_seed_1118` | mc | `lesson_27::Expense` | תקין |
| 143 | `fill_seed_110` | fill | `lesson_13::setAttribute` | תקין |
| 144 | `mc_seed_1319` | mc | `lesson_devops_deploy::preview deployment` | תקין |
| 145 | `mc_seed_1592` | mc | `workbook_taskmanager::events` | תקין |
| 146 | `mc_seed_1126` | mc | `lesson_27::CRUD` | תקין |
| 147 | `fill_seed_877` | fill | `lesson_html_css_foundations::CSS selector` | תקין |
| 148 | `mc_seed_1424` | mc | `lesson_nextjs::App Router` | תקין |
| 149 | `fill_seed_761` | fill | `lesson_ai_engineering::RAG` | תקין |
| 150 | `mc_seed_241` | mc | `lesson_15::Closure` | תקין |
| 151 | `fill_seed_537` | fill | `lesson_22::onChange` | תקין |
| 152 | `mc_seed_197` | mc | `lesson_13::new` | תקין |
| 153 | `mc_seed_612` | mc | `lesson_19::localStorage` | תקין |
| 154 | `mc_seed_888` | mc | `lesson_23::Provider` | תקין |
| 155 | `fill_seed_849` | fill | `lesson_devops_deploy::preview deployment` | תקין |
| 156 | `fill_seed_152` | fill | `lesson_15::Error Object` | תקין |
| 157 | `mc_seed_274` | mc | `lesson_16::V8` | תקין |
| 158 | `mc_seed_625` | mc | `lesson_19::promise` | תקין |
| 159 | `mc_seed_635` | mc | `lesson_19::event object` | תקין |
| 160 | `mc_seed_1223` | mc | `lesson_auth_security::password hashing` | תקין |
| 161 | `fill_seed_551` | fill | `lesson_23::Router` | תקין |
| 162 | `fill_seed_493` | fill | `lesson_21::App.jsx` | תקין |
| 163 | `mc_seed_38` | mc | `lesson_11::Array` | תקין |
| 164 | `mc_seed_1007` | mc | `lesson_26::.js` | תקין |
| 165 | `mc_seed_443` | mc | `lesson_17::GET` | תקין |
| 166 | `mc_seed_369` | mc | `lesson_17::Server` | תקין |
| 167 | `mc_seed_1324` | mc | `lesson_devops_deploy::Docker` | תקין |
| 168 | `mc_seed_200` | mc | `lesson_13::method` | תקין |
| 169 | `fill_seed_610` | fill | `lesson_24::ref` | תקין |
| 170 | `mc_seed_658` | mc | `lesson_20::MongoDB Atlas` | תקין |

## Follow-Up

- No blocker-level seeded QA issues were found in this deterministic 170-question sample.
- Notes are manual-review prompts; they do not fail strict mode unless promoted to blockers.

