# Feature Coverage Report — 2026-04-28

Generated from repository data files. The report is deterministic and does not use sampling or native randomness.

## Summary

- Modules tracked: 24
- Done: 24
- Partial: 0
- Missing: 0
- Strict target failures: 0
- Evidence gate checked: 24
- Evidence gate failures: 0

## Coverage

| Module | Implemented | Target | Coverage | Status | Outcome metric | Evidence |
|---|---:|---:|---:|---|---|---|
| Anti-Pattern Gallery | 22 patterns | 22 patterns | 100% | Done | Misconception repair coverage for hard concepts | data/anti_patterns.js |
| War Stories Library | 31 incidents | 30 incidents | 100% | Done | Real-world transfer coverage through production incident stories | data/war_stories.js |
| Mini Build | 23 builds | 21 builds | 100% | Done | Hands-on build-practice coverage for code-writing workflows | data/questions_build.js |
| Code Trace | 89 traces | 85 traces | 100% | Done | Execution-prediction practice coverage | data/questions_trace.js |
| Per-Distractor Feedback | 271 MC questions | 271 MC questions | 100% | Done | Option-specific remediation coverage across the full MC bank | data/option_feedback.js<br>data/questions_bank.js |
| Concept Metaphors | 250 metaphors | 250 metaphors | 100% | Done | Explanation-fit coverage through multiple metaphors per core concept | data/metaphors.js |
| 3 Learning Pathways | 30 complete concepts | 30 complete concepts | 100% | Done | Persona-based explanation coverage for grandma/parent/technical paths | data/pathways.js |
| Pair-Match | 14 games | 5 games | 100% | Done | Associative retrieval practice coverage | data/pair_match.js |
| Bug Hunt Quests | 25 bugs | 25 bugs | 100% | Done | Narrative debugging practice coverage | data/bug_quests.js |
| Mnemonics Lab | 9 concepts | 9 concepts | 100% | Done | Memory-aid coverage for hard concepts | data/mnemonics.js |
| Mental Model Animator | 6 concepts | 6 concepts | 100% | Done | Visual mental-model coverage | data/animations.js |
| Side-by-Side Comparator | 16 comparisons | 10 comparisons | 100% | Done | Side-by-side distinction coverage for confusing concept pairs | data/comparisons.js |
| What-If Simulator | 5 concepts | 5 concepts | 100% | Done | Interactive counterfactual reasoning coverage | data/what_if.js |
| Themed Scenarios | 150 scenarios | 150 scenarios | 100% | Done | Themed scenario coverage across concept-context pairs | data/scenarios.js |
| Counterfactuals | 30 concepts | 30 concepts | 100% | Done | What-breaks-without-this reasoning coverage | data/counterfactuals.js |
| Animated Concept Clips | 10 clips | 10 clips | 100% | Done | Embedded concept clip coverage | data/concept_videos.js |
| Real-Object Visual Aids | 50 aids | 50 aids | 100% | Done | Concrete visual-aid coverage for beginner explanations | data/grandma_visuals.js |
| Concept Comics | 8 concepts | 8 concepts | 100% | Done | Visual story coverage for hard concepts | data/concept_comics.js |
| Memory Palace | 8 concepts | 8 concepts | 100% | Done | Spatial memory-location coverage | data/memory_palaces.js |
| Problem-First Discovery | 8 concepts | 8 concepts | 100% | Done | Problem-first discovery coverage | data/problem_first.js |
| Stage-Zero Broken Examples | 8 concepts | 8 concepts | 100% | Done | Beginner broken-example coverage | data/stage_zero.js |
| Hebrew/English Glossary | 587 entries | 200 entries | 100% | Done | Foundational terminology coverage | data/glossary.js |
| Capstone Project Track | 6 projects | 6 projects | 100% | Done | Project-readiness coverage through full capstone briefs and rubrics | data/capstones.js |
| SVCollege Course Blueprint Alignment | 1 active blueprint | 1 active blueprint | 100% | Done | Course and exam alignment coverage from public curriculum sources | data/course_blueprints.js |

## Notes

- Per-Distractor Feedback is intentionally reported against the full MC bank; Done means every loaded MC has option-specific feedback from either inline data or the curated feedback map.
- Strict target failures ignore modules explicitly marked as non-strict because they are tracked as staged coverage work.
- Evidence gate failures block Done modules that lack an outcome metric or repository evidence.
- This report is the source of truth for content-module coverage counters in Phase 5.

