# Question Quality Report — 2026-04-28

Full-bank deterministic QA for MC and Fill questions. This report creates a `questionQuality` object for every question id and a remediation queue for warnings and notes.

## Summary

- Total questions: 1894
- Mix: 1340 MC, 554 Fill
- Source mix: 117 curated, 1777 seeded
- Clean: 1255
- Notes only: 416
- Warning questions: 223
- Blocker questions: 0
- Issue counts: 0 blockers, 241 warnings, 442 notes
- Question Quality Index: 88.2% warning-free

## Gates Covered

- MC: duplicate options, near-duplicate distractors, length-cue risk, generic wording, missing explanation, missing conceptKey.
- Fill: blank count, missing answer/code/explanation/hint, visible answer leakage, one-character ambiguity, missing conceptKey.

## Remediation Queue

Showing first 80 of 683 queued issues.

| # | Severity | Code | ID | Kind | Source | Concept | Message |
|---:|---|---|---|---|---|---|---|
| 1 | warning | near-duplicate | `mc_seed_561` | mc | seeded | `lesson_19::while` | Options 3 and 4 are very similar (0.89 token overlap). |
| 2 | warning | missing-concept-key | `mc_throw_001` | mc | curated | `unknown` | Question has no conceptKey, so adaptive/prerequisite routing is weaker. |
| 3 | warning | missing-concept-key | `fill_hook_003` | fill | curated | `unknown` | Fill has no conceptKey, so adaptive/prerequisite routing is weaker. |
| 4 | warning | missing-concept-key | `mc_node_002` | mc | curated | `unknown` | Question has no conceptKey, so adaptive/prerequisite routing is weaker. |
| 5 | warning | answer-visible-multiple | `fill_seed_646` | fill | seeded | `lesson_17::Route` | Answer token appears 6 times in the visible code; this can make the fill answer ambiguous. |
| 6 | warning | missing-concept-key | `fill_react_001` | fill | curated | `unknown` | Fill has no conceptKey, so adaptive/prerequisite routing is weaker. |
| 7 | warning | near-duplicate | `mc_seed_717` | mc | seeded | `lesson_20::findOneAndUpdate` | Options 1 and 4 are very similar (0.89 token overlap). |
| 8 | warning | answer-visible-multiple | `fill_seed_1547` | fill | seeded | `lesson_26::optional field` | Answer token appears 2 times in the visible code; this can make the fill answer ambiguous. |
| 9 | warning | near-duplicate | `mc_seed_1223` | mc | seeded | `react_blueprint::Error Boundaries` | Options 2 and 3 are very similar (0.89 token overlap). |
| 10 | warning | answer-visible-multiple | `fill_seed_1448` | fill | seeded | `lesson_25::rounded` | Answer token appears 2 times in the visible code; this can make the fill answer ambiguous. |
| 11 | warning | answer-visible-multiple | `fill_seed_1203` | fill | seeded | `lesson_22::immutable` | Answer token appears 2 times in the visible code; this can make the fill answer ambiguous. |
| 12 | warning | near-duplicate | `mc_seed_546` | mc | seeded | `lesson_19::network` | Options 2 and 4 are very similar (0.89 token overlap). |
| 13 | warning | answer-visible-multiple | `fill_seed_1108` | fill | seeded | `lesson_21::Vite` | Answer token appears 2 times in the visible code; this can make the fill answer ambiguous. |
| 14 | warning | answer-visible-multiple | `fill_seed_1140` | fill | seeded | `lesson_21::RFC` | Answer token appears 2 times in the visible code; this can make the fill answer ambiguous. |
| 15 | warning | missing-concept-key | `mc_status_201` | mc | curated | `unknown` | Question has no conceptKey, so adaptive/prerequisite routing is weaker. |
| 16 | warning | answer-visible-multiple | `fill_seed_1807` | fill | seeded | `workbook_taskmanager::events` | Answer token appears 2 times in the visible code; this can make the fill answer ambiguous. |
| 17 | warning | answer-visible-multiple | `fill_seed_1506` | fill | seeded | `lesson_26::type annotation` | Answer token appears 3 times in the visible code; this can make the fill answer ambiguous. |
| 18 | warning | answer-visible-multiple | `fill_seed_1648` | fill | seeded | `lesson_27::Genre` | Answer token appears 2 times in the visible code; this can make the fill answer ambiguous. |
| 19 | warning | answer-visible-multiple | `fill_seed_960` | fill | seeded | `lesson_19::event object` | Answer token appears 2 times in the visible code; this can make the fill answer ambiguous. |
| 20 | warning | near-duplicate | `mc_seed_561` | mc | seeded | `lesson_19::while` | Options 2 and 4 are very similar (0.89 token overlap). |
| 21 | warning | near-duplicate | `mc_seed_7` | mc | seeded | `ai_development::Windsurf` | Options 1 and 3 are very similar (0.89 token overlap). |
| 22 | warning | near-duplicate | `mc_seed_477` | mc | seeded | `lesson_18::Express` | Options 2 and 3 are very similar (0.89 token overlap). |
| 23 | warning | near-duplicate | `mc_seed_645` | mc | seeded | `lesson_19::scope` | Options 3 and 4 are very similar (0.89 token overlap). |
| 24 | warning | answer-visible-multiple | `fill_seed_1623` | fill | seeded | `lesson_27::interface` | Answer token appears 2 times in the visible code; this can make the fill answer ambiguous. |
| 25 | warning | near-duplicate | `mc_seed_567` | mc | seeded | `lesson_19::break` | Options 1 and 3 are very similar (0.89 token overlap). |
| 26 | warning | answer-visible-multiple | `fill_seed_733` | fill | seeded | `lesson_18::email` | Answer token appears 7 times in the visible code; this can make the fill answer ambiguous. |
| 27 | warning | near-duplicate | `mc_seed_1058` | mc | seeded | `lesson_26::array type` | Options 2 and 4 are very similar (0.89 token overlap). |
| 28 | warning | answer-visible-multiple | `fill_seed_76` | fill | seeded | `lesson_11::number` | Answer token appears 2 times in the visible code; this can make the fill answer ambiguous. |
| 29 | warning | missing-concept-key | `mc_middleware_001` | mc | curated | `unknown` | Question has no conceptKey, so adaptive/prerequisite routing is weaker. |
| 30 | warning | missing-concept-key | `fill_router_001` | fill | curated | `unknown` | Fill has no conceptKey, so adaptive/prerequisite routing is weaker. |
| 31 | warning | near-duplicate | `mc_seed_717` | mc | seeded | `lesson_20::findOneAndUpdate` | Options 1 and 3 are very similar (0.89 token overlap). |
| 32 | warning | answer-visible-multiple | `fill_seed_1525` | fill | seeded | `lesson_26::array type` | Answer token appears 2 times in the visible code; this can make the fill answer ambiguous. |
| 33 | warning | answer-visible-multiple | `fill_seed_1678` | fill | seeded | `lesson_27::Income` | Answer token appears 3 times in the visible code; this can make the fill answer ambiguous. |
| 34 | warning | answer-visible-multiple | `fill_seed_1777` | fill | seeded | `react_blueprint::Error Boundaries` | Answer token appears 14 times in the visible code; this can make the fill answer ambiguous. |
| 35 | warning | near-duplicate | `mc_seed_597` | mc | seeded | `lesson_19::object` | Options 2 and 4 are very similar (0.89 token overlap). |
| 36 | warning | near-duplicate | `mc_seed_426` | mc | seeded | `lesson_17::app.post` | Options 1 and 3 are very similar (0.89 token overlap). |
| 37 | warning | near-duplicate | `mc_seed_860` | mc | seeded | `lesson_22::child component` | Options 1 and 3 are very similar (0.89 token overlap). |
| 38 | warning | missing-concept-key | `mc_union_001` | mc | curated | `unknown` | Question has no conceptKey, so adaptive/prerequisite routing is weaker. |
| 39 | warning | answer-visible-multiple | `fill_seed_1429` | fill | seeded | `lesson_25::responsive design` | Answer token appears 2 times in the visible code; this can make the fill answer ambiguous. |
| 40 | warning | near-duplicate | `mc_seed_54` | mc | seeded | `lesson_11::string` | Options 3 and 4 are very similar (0.89 token overlap). |
| 41 | warning | answer-visible-multiple | `fill_seed_518` | fill | seeded | `lesson_17::HTTP` | Answer token appears 2 times in the visible code; this can make the fill answer ambiguous. |
| 42 | warning | missing-concept-key | `mc_mongo_002` | mc | curated | `unknown` | Question has no conceptKey, so adaptive/prerequisite routing is weaker. |
| 43 | warning | near-duplicate | `mc_seed_708` | mc | seeded | `lesson_20::insertMany` | Options 2 and 3 are very similar (0.89 token overlap). |
| 44 | warning | answer-visible-multiple | `fill_seed_631` | fill | seeded | `lesson_17::app.use` | Answer token appears 2 times in the visible code; this can make the fill answer ambiguous. |
| 45 | warning | near-duplicate | `mc_seed_19` | mc | seeded | `ai_development::Prompt Engineering` | Options 1 and 2 are very similar (0.89 token overlap). |
| 46 | warning | answer-visible-multiple | `fill_seed_728` | fill | seeded | `lesson_18::username` | Answer token appears 4 times in the visible code; this can make the fill answer ambiguous. |
| 47 | warning | missing-concept-key | `mc_async_003` | mc | curated | `unknown` | Question has no conceptKey, so adaptive/prerequisite routing is weaker. |
| 48 | warning | answer-visible-multiple | `fill_seed_738` | fill | seeded | `lesson_18::password` | Answer token appears 3 times in the visible code; this can make the fill answer ambiguous. |
| 49 | warning | near-duplicate | `mc_seed_732` | mc | seeded | `lesson_20::$eq` | Options 1 and 2 are very similar (0.89 token overlap). |
| 50 | warning | near-duplicate | `mc_seed_995` | mc | seeded | `lesson_25::grid` | Options 1 and 3 are very similar (0.89 token overlap). |
| 51 | warning | missing-concept-key | `mc_react_003` | mc | curated | `unknown` | Question has no conceptKey, so adaptive/prerequisite routing is weaker. |
| 52 | warning | near-duplicate | `mc_seed_1226` | mc | seeded | `react_blueprint::Testing Strategies` | Options 1 and 2 are very similar (0.89 token overlap). |
| 53 | warning | answer-visible-multiple | `fill_seed_1552` | fill | seeded | `lesson_26::type alias` | Answer token appears 2 times in the visible code; this can make the fill answer ambiguous. |
| 54 | warning | near-duplicate | `mc_seed_702` | mc | seeded | `lesson_20::Model` | Options 1 and 2 are very similar (0.89 token overlap). |
| 55 | warning | missing-concept-key | `fill_ts_004` | fill | curated | `unknown` | Fill has no conceptKey, so adaptive/prerequisite routing is weaker. |
| 56 | warning | answer-visible-multiple | `fill_seed_1787` | fill | seeded | `workbook_taskmanager::Task Manager` | Answer token appears 5 times in the visible code; this can make the fill answer ambiguous. |
| 57 | warning | near-duplicate | `mc_seed_1004` | mc | seeded | `lesson_25::rounded` | Options 2 and 4 are very similar (0.89 token overlap). |
| 58 | warning | missing-concept-key | `mc_dynamic_001` | mc | curated | `unknown` | Question has no conceptKey, so adaptive/prerequisite routing is weaker. |
| 59 | warning | answer-visible-multiple | `fill_seed_1129` | fill | seeded | `lesson_21::index.html` | Answer token appears 2 times in the visible code; this can make the fill answer ambiguous. |
| 60 | warning | missing-concept-key | `mc_evt_002` | mc | curated | `unknown` | Question has no conceptKey, so adaptive/prerequisite routing is weaker. |
| 61 | warning | answer-visible-multiple | `fill_seed_681` | fill | seeded | `lesson_17::Status Codes` | Answer token appears 3 times in the visible code; this can make the fill answer ambiguous. |
| 62 | warning | missing-concept-key | `fill_obj_003` | fill | curated | `unknown` | Fill has no conceptKey, so adaptive/prerequisite routing is weaker. |
| 63 | warning | answer-visible-multiple | `fill_seed_1412` | fill | seeded | `lesson_24::focus` | Answer token appears 2 times in the visible code; this can make the fill answer ambiguous. |
| 64 | warning | missing-concept-key | `mc_then_001` | mc | curated | `unknown` | Question has no conceptKey, so adaptive/prerequisite routing is weaker. |
| 65 | warning | missing-concept-key | `mc_exp_001` | mc | curated | `unknown` | Question has no conceptKey, so adaptive/prerequisite routing is weaker. |
| 66 | warning | near-duplicate | `mc_seed_318` | mc | seeded | `lesson_16::module.exports` | Options 1 and 2 are very similar (0.89 token overlap). |
| 67 | warning | near-duplicate | `mc_seed_546` | mc | seeded | `lesson_19::network` | Options 3 and 4 are very similar (0.89 token overlap). |
| 68 | warning | answer-visible-multiple | `fill_seed_1572` | fill | seeded | `lesson_26::Typing State` | Answer token appears 3 times in the visible code; this can make the fill answer ambiguous. |
| 69 | warning | missing-concept-key | `mc_react_002` | mc | curated | `unknown` | Question has no conceptKey, so adaptive/prerequisite routing is weaker. |
| 70 | warning | answer-visible-multiple | `fill_seed_1436` | fill | seeded | `lesson_25::grid` | Answer token appears 3 times in the visible code; this can make the fill answer ambiguous. |
| 71 | warning | missing-concept-key | `mc_setstate_001` | mc | curated | `unknown` | Question has no conceptKey, so adaptive/prerequisite routing is weaker. |
| 72 | warning | answer-visible-multiple | `fill_seed_1095` | fill | seeded | `lesson_21::React` | Answer token appears 2 times in the visible code; this can make the fill answer ambiguous. |
| 73 | warning | near-duplicate | `mc_seed_609` | mc | seeded | `lesson_19::class` | Options 2 and 4 are very similar (0.89 token overlap). |
| 74 | warning | answer-visible-multiple | `fill_seed_1765` | fill | seeded | `react_blueprint::Lifting State Up` | Answer token appears 3 times in the visible code; this can make the fill answer ambiguous. |
| 75 | warning | near-duplicate | `mc_seed_255` | mc | seeded | `lesson_15::setTimeout` | Options 2 and 3 are very similar (0.89 token overlap). |
| 76 | warning | answer-visible-multiple | `fill_seed_40` | fill | seeded | `ai_development::AI Limitations` | Answer token appears 2 times in the visible code; this can make the fill answer ambiguous. |
| 77 | warning | answer-visible-multiple | `fill_seed_1155` | fill | seeded | `lesson_21::import` | Answer token appears 4 times in the visible code; this can make the fill answer ambiguous. |
| 78 | warning | missing-concept-key | `mc_optional_001` | mc | curated | `unknown` | Question has no conceptKey, so adaptive/prerequisite routing is weaker. |
| 79 | warning | answer-visible-multiple | `fill_seed_1738` | fill | seeded | `lesson_closures::closure in setTimeout` | Answer token appears 2 times in the visible code; this can make the fill answer ambiguous. |
| 80 | warning | missing-concept-key | `mc_var_004` | mc | curated | `unknown` | Question has no conceptKey, so adaptive/prerequisite routing is weaker. |

## Strict Policy

- `--strict` fails only on blocker-level issues.
- Warnings and notes are review/remediation work; they are intentionally visible but non-blocking until promoted by policy.

