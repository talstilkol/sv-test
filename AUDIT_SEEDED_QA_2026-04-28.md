# Seeded Questions QA — 2026-04-28

דגימת QA דטרמיניסטית של 170 שאלות מתוך `QUESTIONS_BANK_SEEDED`. לא נעשה שימוש באקראיות; הבחירה נעשית לפי hash יציב של סוג השאלה, id, conceptKey והתוכן.

## Bank Size

- Seeded MC: 1264
- Seeded Fill: 513
- Total seeded: 1777

## Sample Summary

- Total audited: 170
- Sample mix: 127 MC, 43 Fill
- Clean questions: 123
- Blockers: 0
- Warnings: 7
- Notes: 45

## Checks

- MC: valid options, correctIndex, duplicate/near-duplicate options, cue risks
- Fill: one blank marker, non-empty answer/code/explanation, ambiguity notes when answer appears elsewhere
- All sampled items: seeded flag and conceptKey presence

## Audited Sample

| # | ID | Kind | Concept | Result |
|---:|---|---|---|---|
| 1 | `mc_seed_699` | mc | `lesson_20::Schema` | תקין |
| 2 | `mc_seed_764` | mc | `lesson_21::npm create vite@latest` | note/length-cue: Option length spread is high (5..22); check that the correct answer is not visually cued. |
| 3 | `mc_seed_152` | mc | `lesson_13::DOM` | תקין |
| 4 | `fill_seed_1423` | fill | `lesson_25::Tailwind CSS` | note/answer-visible: Answer token appears 1 time(s) elsewhere in the code; manual review should confirm this is not ambiguous. |
| 5 | `fill_seed_1807` | fill | `workbook_taskmanager::events` | note/answer-visible: Answer token appears 2 time(s) elsewhere in the code; manual review should confirm this is not ambiguous. |
| 6 | `mc_seed_707` | mc | `lesson_20::insertOne` | תקין |
| 7 | `mc_seed_1189` | mc | `lesson_closures::stale closure` | note/length-cue: Option length spread is high (3..13); check that the correct answer is not visually cued. |
| 8 | `mc_seed_1044` | mc | `lesson_26::tsconfig.json` | תקין |
| 9 | `mc_seed_702` | mc | `lesson_20::Model` | warning/near-duplicate: Options 1 and 2 are very similar (0.89 token overlap).<br>warning/near-duplicate: Options 1 and 3 are very similar (0.89 token overlap).<br>warning/near-duplicate: Options 2 and 3 are very similar (0.89 token overlap). |
| 10 | `mc_seed_76` | mc | `lesson_11::find` | תקין |
| 11 | `mc_seed_511` | mc | `lesson_19::script` | תקין |
| 12 | `mc_seed_773` | mc | `lesson_21::index.html` | note/length-cue: Option length spread is high (4..19); check that the correct answer is not visually cued. |
| 13 | `fill_seed_1506` | fill | `lesson_26::type annotation` | note/answer-visible: Answer token appears 3 time(s) elsewhere in the code; manual review should confirm this is not ambiguous. |
| 14 | `mc_seed_375` | mc | `lesson_17::Client` | תקין |
| 15 | `mc_seed_689` | mc | `lesson_20::Props` | note/length-cue: Option length spread is high (3..22); check that the correct answer is not visually cued. |
| 16 | `mc_seed_742` | mc | `lesson_20::$lt` | תקין |
| 17 | `mc_seed_403` | mc | `lesson_17::Update` | תקין |
| 18 | `mc_seed_445` | mc | `lesson_17::Route` | תקין |
| 19 | `fill_seed_1261` | fill | `lesson_23::Router` | note/answer-visible: Answer token appears 3 time(s) elsewhere in the code; manual review should confirm this is not ambiguous. |
| 20 | `mc_seed_943` | mc | `lesson_24::dependency array` | תקין |
| 21 | `mc_seed_721` | mc | `lesson_20::update` | תקין |
| 22 | `fill_seed_1782` | fill | `react_blueprint::Testing Strategies` | note/answer-visible: Answer token appears 3 time(s) elsewhere in the code; manual review should confirm this is not ambiguous. |
| 23 | `fill_seed_837` | fill | `lesson_19::continue` | תקין |
| 24 | `mc_seed_9` | mc | `ai_development::Windsurf` | note/length-cue: Option length spread is high (2..9); check that the correct answer is not visually cued. |
| 25 | `fill_seed_106` | fill | `lesson_11::scope` | note/answer-visible: Answer token appears 1 time(s) elsewhere in the code; manual review should confirm this is not ambiguous. |
| 26 | `mc_seed_398` | mc | `lesson_17::Create` | תקין |
| 27 | `mc_seed_947` | mc | `lesson_24::fetch` | תקין |
| 28 | `mc_seed_797` | mc | `lesson_21::{}` | תקין |
| 29 | `mc_seed_653` | mc | `lesson_19::event object` | תקין |
| 30 | `fill_seed_1371` | fill | `lesson_24::dependency array` | תקין |
| 31 | `fill_seed_96` | fill | `lesson_11::let` | תקין |
| 32 | `fill_seed_113` | fill | `lesson_11::forEach` | תקין |
| 33 | `mc_seed_529` | mc | `lesson_19::var` | note/length-cue: Option length spread is high (2..27); check that the correct answer is not visually cued. |
| 34 | `mc_seed_1051` | mc | `lesson_26::string` | תקין |
| 35 | `mc_seed_139` | mc | `lesson_12::עבודה עם ערכים לפי אינדקס` | note/length-cue: Option length spread is high (5..25); check that the correct answer is not visually cued. |
| 36 | `mc_seed_35` | mc | `ai_development::Context Window` | תקין |
| 37 | `mc_seed_11` | mc | `ai_development::Claude Code` | תקין |
| 38 | `mc_seed_988` | mc | `lesson_25::utility classes` | note/length-cue: Option length spread is high (3..16); check that the correct answer is not visually cued. |
| 39 | `fill_seed_1123` | fill | `lesson_21::npm run dev` | תקין |
| 40 | `mc_seed_917` | mc | `lesson_23::value` | תקין |
| 41 | `mc_seed_1109` | mc | `lesson_26::never` | תקין |
| 42 | `mc_seed_412` | mc | `lesson_17::body` | note/length-cue: Option length spread is high (2..14); check that the correct answer is not visually cued. |
| 43 | `mc_seed_242` | mc | `lesson_15::Error Object` | note/length-cue: Option length spread is high (3..16); check that the correct answer is not visually cued. |
| 44 | `fill_seed_1643` | fill | `lesson_27::Book` | note/answer-visible: Answer token appears 1 time(s) elsewhere in the code; manual review should confirm this is not ambiguous. |
| 45 | `mc_seed_211` | mc | `lesson_13::localStorage` | תקין |
| 46 | `fill_seed_1220` | fill | `lesson_22::object reference` | תקין |
| 47 | `mc_seed_922` | mc | `lesson_23::useContext` | תקין |
| 48 | `mc_seed_869` | mc | `lesson_22::deletePost` | תקין |
| 49 | `mc_seed_338` | mc | `lesson_16::fs` | note/length-cue: Option length spread is high (2..10); check that the correct answer is not visually cued. |
| 50 | `mc_seed_1254` | mc | `workbook_taskmanager::objects` | תקין |
| 51 | `mc_seed_109` | mc | `lesson_12::forEach` | note/length-cue: Option length spread is high (3..19); check that the correct answer is not visually cued. |
| 52 | `mc_seed_301` | mc | `lesson_16::npm install` | תקין |
| 53 | `mc_seed_20` | mc | `ai_development::Prompt Engineering` | note/length-cue: Option length spread is high (4..18); check that the correct answer is not visually cued. |
| 54 | `fill_seed_1068` | fill | `lesson_20::updateMany` | תקין |
| 55 | `fill_seed_453` | fill | `lesson_16::module.exports` | תקין |
| 56 | `fill_seed_812` | fill | `lesson_19::return` | תקין |
| 57 | `fill_seed_574` | fill | `lesson_17::CRUD` | note/answer-visible: Answer token appears 1 time(s) elsewhere in the code; manual review should confirm this is not ambiguous. |
| 58 | `mc_seed_792` | mc | `lesson_21::className` | תקין |
| 59 | `mc_seed_948` | mc | `lesson_24::fetch` | תקין |
| 60 | `mc_seed_502` | mc | `lesson_18::email` | תקין |
| 61 | `mc_seed_1012` | mc | `lesson_25::rating` | תקין |
| 62 | `mc_seed_1257` | mc | `workbook_taskmanager::try/catch` | תקין |
| 63 | `mc_seed_870` | mc | `lesson_22::deletePost` | תקין |
| 64 | `mc_seed_921` | mc | `lesson_23::useContext` | תקין |
| 65 | `mc_seed_963` | mc | `lesson_24::memoization` | תקין |
| 66 | `fill_seed_185` | fill | `lesson_12::עבודה עם ערכים לפי אינדקס` | note/answer-visible: Answer token appears 2 time(s) elsewhere in the code; manual review should confirm this is not ambiguous. |
| 67 | `fill_seed_573` | fill | `lesson_17::CRUD` | תקין |
| 68 | `mc_seed_524` | mc | `lesson_19::Data Types` | תקין |
| 69 | `mc_seed_574` | mc | `lesson_19::do while` | תקין |
| 70 | `fill_seed_400` | fill | `lesson_16::CLI` | תקין |
| 71 | `fill_seed_576` | fill | `lesson_17::Create` | תקין |
| 72 | `fill_seed_498` | fill | `lesson_16::fs.appendFile` | תקין |
| 73 | `mc_seed_934` | mc | `lesson_23::PostList` | תקין |
| 74 | `fill_seed_127` | fill | `lesson_11::push` | תקין |
| 75 | `fill_seed_317` | fill | `lesson_15::catch` | תקין |
| 76 | `mc_seed_591` | mc | `lesson_19::reduce` | תקין |
| 77 | `mc_seed_228` | mc | `lesson_15::Error` | תקין |
| 78 | `mc_seed_1198` | mc | `lesson_closures::closure in setTimeout` | note/length-cue: Option length spread is high (3..21); check that the correct answer is not visually cued. |
| 79 | `mc_seed_815` | mc | `lesson_21::map` | תקין |
| 80 | `fill_seed_1663` | fill | `lesson_27::RegisteredUser` | note/answer-visible: Answer token appears 1 time(s) elsewhere in the code; manual review should confirm this is not ambiguous. |
| 81 | `fill_seed_767` | fill | `lesson_19::Data Types` | תקין |
| 82 | `mc_seed_724` | mc | `lesson_20::updateMany` | תקין |
| 83 | `mc_seed_339` | mc | `lesson_16::fs.open` | תקין |
| 84 | `mc_seed_932` | mc | `lesson_23::PostList` | note/length-cue: Option length spread is high (12..120); check that the correct answer is not visually cued. |
| 85 | `mc_seed_470` | mc | `lesson_17::1xx-2xx-3xx` | note/length-cue: Option length spread is high (3..17); check that the correct answer is not visually cued. |
| 86 | `mc_seed_844` | mc | `lesson_22::array reference` | תקין |
| 87 | `fill_seed_965` | fill | `lesson_19::hoisting` | תקין |
| 88 | `mc_seed_571` | mc | `lesson_19::continue` | תקין |
| 89 | `mc_seed_464` | mc | `lesson_17::Query Parameters` | תקין |
| 90 | `mc_seed_243` | mc | `lesson_15::Closure` | note/generic-wording: Option 3 uses broad wording that can cue test-taking instead of knowledge.<br>note/length-cue: Option length spread is high (30..140); check that the correct answer is not visually cued. |
| 91 | `mc_seed_450` | mc | `lesson_17::form` | תקין |
| 92 | `mc_seed_838` | mc | `lesson_22::immutable` | תקין |
| 93 | `fill_seed_1133` | fill | `lesson_21::main.jsx` | note/answer-visible: Answer token appears 2 time(s) elsewhere in the code; manual review should confirm this is not ambiguous. |
| 94 | `mc_seed_282` | mc | `lesson_16::V8` | תקין |
| 95 | `mc_seed_106` | mc | `lesson_12::map` | תקין |
| 96 | `mc_seed_863` | mc | `lesson_22::passing function as prop` | תקין |
| 97 | `mc_seed_1100` | mc | `lesson_26::interface` | תקין |
| 98 | `mc_seed_179` | mc | `lesson_13::createElement` | תקין |
| 99 | `mc_seed_268` | mc | `lesson_15::reject` | תקין |
| 100 | `fill_seed_276` | fill | `lesson_13::method` | תקין |
| 101 | `mc_seed_669` | mc | `lesson_20::MongoDB` | תקין |
| 102 | `mc_seed_879` | mc | `lesson_23::Route` | note/length-cue: Option length spread is high (5..24); check that the correct answer is not visually cued. |
| 103 | `fill_seed_226` | fill | `lesson_13::innerHTML` | תקין |
| 104 | `mc_seed_38` | mc | `lesson_11::Array` | תקין |
| 105 | `mc_seed_1223` | mc | `react_blueprint::Error Boundaries` | warning/near-duplicate: Options 1 and 2 are very similar (0.89 token overlap).<br>warning/near-duplicate: Options 1 and 3 are very similar (0.89 token overlap).<br>warning/near-duplicate: Options 2 and 3 are very similar (0.89 token overlap). |
| 106 | `fill_seed_1218` | fill | `lesson_22::object reference` | תקין |
| 107 | `mc_seed_328` | mc | `lesson_16::cd` | תקין |
| 108 | `mc_seed_238` | mc | `lesson_15::throw` | note/length-cue: Option length spread is high (5..21); check that the correct answer is not visually cued. |
| 109 | `fill_seed_1045` | fill | `lesson_20::insertOne` | תקין |
| 110 | `fill_seed_278` | fill | `lesson_13::extends` | תקין |
| 111 | `mc_seed_311` | mc | `lesson_16::dependencies` | note/length-cue: Option length spread is high (3..14); check that the correct answer is not visually cued. |
| 112 | `mc_seed_1238` | mc | `workbook_taskmanager::arrays` | תקין |
| 113 | `mc_seed_1014` | mc | `lesson_25::search` | note/length-cue: Option length spread is high (5..22); check that the correct answer is not visually cued. |
| 114 | `mc_seed_802` | mc | `lesson_21::import` | תקין |
| 115 | `mc_seed_924` | mc | `lesson_23::Prop Drilling` | תקין |
| 116 | `mc_seed_1022` | mc | `lesson_25::navbar` | תקין |
| 117 | `mc_seed_1034` | mc | `lesson_26::tsc` | תקין |
| 118 | `mc_seed_146` | mc | `lesson_13::Value` | תקין |
| 119 | `fill_seed_1795` | fill | `workbook_taskmanager::conditions` | note/answer-visible: Answer token appears 1 time(s) elsewhere in the code; manual review should confirm this is not ambiguous. |
| 120 | `mc_seed_867` | mc | `lesson_22::addPost` | תקין |
| 121 | `fill_seed_887` | fill | `lesson_19::nested object` | תקין |
| 122 | `mc_seed_731` | mc | `lesson_20::deleteMany` | תקין |
| 123 | `mc_seed_1243` | mc | `workbook_taskmanager::functions` | תקין |
| 124 | `mc_seed_60` | mc | `lesson_11::object` | תקין |
| 125 | `mc_seed_17` | mc | `ai_development::Copilot` | תקין |
| 126 | `fill_seed_130` | fill | `lesson_11::unshift` | תקין |
| 127 | `mc_seed_1210` | mc | `react_blueprint::Composition vs Inheritance` | note/length-cue: Option length spread is high (3..26); check that the correct answer is not visually cued. |
| 128 | `mc_seed_421` | mc | `lesson_17::port` | תקין |
| 129 | `mc_seed_833` | mc | `lesson_22::mutable` | תקין |
| 130 | `mc_seed_213` | mc | `lesson_13::sessionStorage` | תקין |
| 131 | `mc_seed_366` | mc | `lesson_17::Protocol` | note/length-cue: Option length spread is high (14..112); check that the correct answer is not visually cued. |
| 132 | `mc_seed_324` | mc | `lesson_16::dir` | תקין |
| 133 | `mc_seed_1098` | mc | `lesson_26::Todo.ts` | note/length-cue: Option length spread is high (2..12); check that the correct answer is not visually cued. |
| 134 | `fill_seed_45` | fill | `ai_development::Context Window` | note/answer-visible: Answer token appears 1 time(s) elsewhere in the code; manual review should confirm this is not ambiguous. |
| 135 | `mc_seed_305` | mc | `lesson_16::npm start` | תקין |
| 136 | `fill_seed_689` | fill | `lesson_17::4xx-5xx` | תקין |
| 137 | `mc_seed_296` | mc | `lesson_16::npm` | תקין |
| 138 | `fill_seed_1797` | fill | `workbook_taskmanager::conditions` | תקין |
| 139 | `mc_seed_1063` | mc | `lesson_26::tuple` | תקין |
| 140 | `fill_seed_1302` | fill | `lesson_23::to` | note/answer-visible: Answer token appears 5 time(s) elsewhere in the code; manual review should confirm this is not ambiguous. |
| 141 | `mc_seed_627` | mc | `lesson_19::localStorage` | warning/near-duplicate: Options 1 and 2 are very similar (0.89 token overlap). |
| 142 | `fill_seed_1603` | fill | `lesson_26::never` | תקין |
| 143 | `mc_seed_1151` | mc | `lesson_27::Transaction` | תקין |
| 144 | `fill_seed_651` | fill | `lesson_17::JSON` | note/answer-visible: Answer token appears 2 time(s) elsewhere in the code; manual review should confirm this is not ambiguous. |
| 145 | `mc_seed_930` | mc | `lesson_23::AddPost` | תקין |
| 146 | `mc_seed_909` | mc | `lesson_23::Context API` | תקין |
| 147 | `mc_seed_343` | mc | `lesson_16::fs.writeFile` | תקין |
| 148 | `mc_seed_89` | mc | `lesson_11::shift` | תקין |
| 149 | `mc_seed_1258` | mc | `workbook_taskmanager::try/catch` | תקין |
| 150 | `mc_seed_610` | mc | `lesson_19::class` | תקין |
| 151 | `mc_seed_1225` | mc | `react_blueprint::Error Boundaries` | note/length-cue: Option length spread is high (3..16); check that the correct answer is not visually cued. |
| 152 | `mc_seed_251` | mc | `lesson_15::Synchronous` | תקין |
| 153 | `fill_seed_953` | fill | `lesson_19::scope` | תקין |
| 154 | `mc_seed_523` | mc | `lesson_19::Data Types` | note/length-cue: Option length spread is high (2..10); check that the correct answer is not visually cued. |
| 155 | `mc_seed_433` | mc | `lesson_17::middleware` | תקין |
| 156 | `mc_seed_953` | mc | `lesson_24::infinite loop` | תקין |
| 157 | `mc_seed_577` | mc | `lesson_19::array` | תקין |
| 158 | `mc_seed_1145` | mc | `lesson_27::RegisteredUser` | note/length-cue: Option length spread is high (17..89); check that the correct answer is not visually cued. |
| 159 | `mc_seed_472` | mc | `lesson_17::4xx-5xx` | תקין |
| 160 | `mc_seed_1239` | mc | `workbook_taskmanager::arrays` | תקין |
| 161 | `mc_seed_920` | mc | `lesson_23::useContext` | תקין |
| 162 | `mc_seed_676` | mc | `lesson_20::Cluster` | תקין |
| 163 | `mc_seed_583` | mc | `lesson_19::filter` | note/length-cue: Option length spread is high (3..21); check that the correct answer is not visually cued. |
| 164 | `mc_seed_1146` | mc | `lesson_27::RegisteredUser` | תקין |
| 165 | `mc_seed_140` | mc | `lesson_13::Object` | תקין |
| 166 | `mc_seed_955` | mc | `lesson_24::infinite loop` | תקין |
| 167 | `mc_seed_665` | mc | `lesson_20::SQL` | note/length-cue: Option length spread is high (3..18); check that the correct answer is not visually cued. |
| 168 | `mc_seed_209` | mc | `lesson_13::super` | תקין |
| 169 | `mc_seed_330` | mc | `lesson_16::mkdir` | תקין |
| 170 | `mc_seed_1214` | mc | `react_blueprint::Lifting State Up` | תקין |

## Follow-Up

- No blocker-level seeded QA issues were found in this deterministic 170-question sample.
- Notes are manual-review prompts; they do not fail strict mode unless promoted to blockers.

