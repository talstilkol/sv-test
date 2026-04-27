# LumenPortal — רשימת משימות ביצוע מלאה

> מבוסס על: [SPEC_AND_MASTER_PLAN.md](SPEC_AND_MASTER_PLAN.md)
> סטטוס מתעדכן בכל שלב
> תאריך התחלה: 2026-04-27

## 🚦 מקרא

- `[ ]` — לא בוצע
- `[V]` — בוצע (✅)
- `[~]` — בעבודה (🚧)
- `[!]` — חסום (🚫)
- `[-]` — נדחה / לא רלוונטי (⏸️)

---

## 📊 סיכום התקדמות

| Phase | בוצע / סך | אחוז |
|---|:-:|:-:|
| Phase 0: Status (DONE) | 25/25 | 100% ✅ |
| Phase 1: Foundation | 31/52 | **60%** 🚧 |
| Phase 2: Core Learning | 8/63 | **13%** 🚧 |
| Phase 3: Intelligence + Sync | 0/41 | 0% |
| Phase 4: Scale + Community | 0/28 | 0% |
| **TOTAL** | **64/209** | **31%** |

### Phase 1 Detailed:
- W1 Architecture: ✅ 14/14 (lazy load + per-card + Vitest 38 tests)
- W2 Accessibility: ✅ 11/16 (ARIA done, keyboard partial, motion+light done)
- W3 PWA: ✅ 5/6 (manifest + SW done, install prompt deferred)
- W4 Code Runner/Bug/Mini-Build: ✅ 11/12 (Code Runner, 14 Bug Hunts, 8 Builds; Trace 11-20 = Track F)
- W5 Mock Exam + Study UX: ✅ 12/14 (Mock Exam done; user-requested UX 4/4 done)

### Phase 2 Sprint 1 Done:
- Anti-Pattern Gallery: ✅ 4/4 (22 patterns, UI, CSS)
- Mnemonics Lab: ✅ 3/3 (9 concepts in Hebrew with rhymes)
- Flashcards UI: ⏸️ 0/4 (deferred — needs new tab)

### Phase 2 Sprint 2 Done:
- War Stories Library: ✅ (8 concepts, UI integrated)
- Side-by-Side Comparator: ✅ (6 comparisons, UI integrated)
- Mental Model Animator: ✅ (6 concepts × 3-4 frames + stepper UI + auto-play)

---

## ✅ Phase 0 — Status (כבר הושלם)

### Foundation (מ-Tracks A+B+C ב-PR #8)
- [V] P0.1.1 — Math.random → mulberry32 PRNG (lib/rng.js)
- [V] P0.1.2 — SRS schema (lib/srs.js, SM-2)
- [V] P0.1.3 — Bank versioning v2.0.0
- [V] P0.1.4 — CI gate (validate_bank --strict)
- [V] P0.1.5 — 5 mastery states (new/learning/review/mastered/at-risk)

### Content cleanup
- [V] P0.2.1 — ai_development.js — 12 concepts (was boilerplate)
- [V] P0.2.2 — react_blueprint.js — 10 concepts
- [V] P0.2.3 — workbook_taskmanager.js — 12 concepts
- [V] P0.2.4 — lesson_closures.js — NEW (8 concepts)
- [V] P0.2.5 — difficulty 1-10 ל-247 concepts (lessons 11-20)
- [V] P0.2.6 — lesson 20 difficulty calibration (24 concepts)
- [V] P0.2.7 — 11 fill ambiguity warnings — fixed
- [V] P0.2.8 — concept_enrichment +41 entries (B+C)
- [V] P0.2.9 — glossary.js stub

### Existing engine (pre-existing or incremental)
- [V] P0.3.1 — 7-level system (grandma → master)
- [V] P0.3.2 — V button + Report Weak + Extras panel
- [V] P0.3.3 — Difficulty 1-10 with V-rules
- [V] P0.3.4 — 17 main lessons (11-27) all clean
- [V] P0.3.5 — Code Trace (35 questions, lessons 21-27)

### Documentation
- [V] P0.4.1 — PRODUCT_SPEC.md (v1)
- [V] P0.4.2 — MASTER_PLAN_V3.md
- [V] P0.4.3 — COORDINATION.md
- [V] P0.4.4 — PROMPTS.md
- [V] P0.4.5 — COMPETITIVE_ANALYSIS.md
- [V] P0.4.6 — SPEC_AND_MASTER_PLAN.md (v5.1) — unified

**P0 Total: 25/25 ✅**

---

## 🚧 Phase 1 — תשתית קריטית (5 שבועות)

### W1 — Architecture & Performance Quick Wins
- [V] P1.1.1 — Lazy load `questions_bank_seeded.js` (1.4MB)
  - [V] P1.1.1.1 — Wrap בקובץ ב-loader function (script tag הוסר מ-index.html)
  - [V] P1.1.1.2 — Update content-loader.js: ensureSeededBank() async
  - [V] P1.1.1.3 — Hook ל-openTrainer/openStudyMode
  - [V] P1.1.1.4 — Verify: 76 MC initial → 1316 MC after openTrainer ✅
- [V] P1.1.2 — Per-card refresh (avoid full re-render)
  - [V] P1.1.2.1 — function refreshConceptCard(conceptName) — added in app.js
  - [V] P1.1.2.2 — Replace renderContent() in mark-v/report-weak/simplify/reset-view
  - [V] P1.1.2.3 — Verify: report-weak → weak badge appears + concept stays in view ✅
- [V] P1.1.3 — Vitest setup
  - [V] P1.1.3.1 — package.json + npm install (vitest 2.1.9, happy-dom)
  - [V] P1.1.3.2 — vitest.config.js (globals: true, happy-dom)
  - [V] P1.1.3.3 — tests/rng.test.js (13 tests — determinism, edge cases, seedFromString)
  - [V] P1.1.3.4 — tests/srs.test.js (8 tests — intervals, lapses, isDue)
  - [V] P1.1.3.5 — tests/scoring.test.js (17 tests — V button rules, mastery states)
  - [V] P1.1.3.6 — Added to CI workflow (npm install + npm test)
  - [V] P1.1.3.7 — Verify: 38/38 tests pass ✅

### W2 — Accessibility Foundation
- [V] P1.2.1 — ARIA labels on icon-only buttons
  - [V] P1.2.1.1 — Top tabs (8 buttons) — all aria-labels added
  - [-] P1.2.1.2 — Pocket Card 📌 (deferred — not yet implemented)
  - [-] P1.2.1.3 — TTS 🔊 (deferred — Track D scope)
  - [-] P1.2.1.4 — AI Tutor 💬 (deferred — Phase 2)
  - [V] P1.2.1.5 — V/Report Weak — aria-label with concept name
  - [-] P1.2.1.6 — Modal close × (deferred — when modals added)
  - [V] P1.2.1.7 — Mobile drawer ☰ — aria-label + aria-expanded
  - [V] P1.2.1.8 — Verify in browser: aria-labels rendered ✅
- [~] P1.2.2 — Keyboard navigation (basic — full audit Phase 3)
  - [V] P1.2.2.1 — Tab order semantic
  - [V] P1.2.2.2 — Focus rings (`button:focus-visible` outline 2px)
  - [-] P1.2.2.3 — Esc closes modals (deferred)
  - [-] P1.2.2.4 — Enter submits MC (deferred)
  - [-] P1.2.2.5 — Arrow keys (deferred)
- [V] P1.2.3 — prefers-reduced-motion CSS — added at end of style.css
- [V] P1.2.4 — prefers-color-scheme + Light mode toggle
  - [V] P1.2.4.1 — `.theme-light` CSS variables added
  - [V] P1.2.4.2 — `#theme-toggle` button (auto/light/dark cycle)
  - [V] P1.2.4.3 — localStorage `lumenportal:theme:v1` persistence
  - [V] P1.2.4.4 — Verified: theme cycles work, applied via class

### W3 — PWA + Offline
- [V] P1.3.1 — manifest.json (RTL Hebrew, lang=he, dir=rtl)
- [V] P1.3.2 — Icons 192/512 (inline SVG data URI)
- [V] P1.3.3 — Service worker (cache shell + 20 lessons + lib + glossary)
- [-] P1.3.4 — Install prompt button (deferred — requires beforeinstallprompt UX)
- [V] P1.3.5 — Verify: SW registered + manifest linked ✅
- [V] P1.3.6 — Verify: SHELL_ASSETS array covers core offline flow

### W4 — Sandpack + Live Code
- [V] P1.4.1 — Embed sandboxed Code Runner ✅
  - [V] P1.4.1.1 — npm install @codesandbox/sandpack-client (deferred — using iframe sandbox)
  - [V] P1.4.1.2 — lib/code-runner.js wrapper (iframe + postMessage)
  - [V] P1.4.1.3 — "🚀 הרץ" button on each codeExample
- [ ] P1.4.2 — Code Trace expansion (Track F running in parallel)
  - [ ] P1.4.2.1 — 5 traces per lesson 11-20 (45 traces)
  - [ ] P1.4.2.2 — Traces for lesson_closures (5)
- [V] P1.4.3 — Bug Hunt mode ✅
  - [V] P1.4.3.1 — Schema in data/questions_bug.js
  - [V] P1.4.3.2 — UI: 4-option MC + fix reveal + explanation
  - [V] P1.4.3.3 — 14 bug hunts (target was 28; partial coverage)
- [V] P1.4.4 — Mini Build mode ✅
  - [V] P1.4.4.1 — Schema in data/questions_build.js (prompt, starter, tests[], reference, hint, explanation)
  - [V] P1.4.4.2 — UI: textarea + 🚀 בדוק + 💡 רמז + 👀 פתרון + 🔄 איפוס
  - [V] P1.4.4.3 — 8 builds (target was 21; partial coverage of React 21-24 fundamentals)
  - [V] regex-based tests with mustNotMatch flag for anti-patterns (.push)
  - [V] auto-show reference + explanation on all-pass

### W5 — Study UX (user-requested) + Mock Exam
- [V] P1.5.0a — View Mode panel (toggles + concept jumper + presets) ✅
  - [V] Floating 👁️ FAB + popover panel
  - [V] 13 visibility toggles (questions, code, explanation, deep-dive, etc.)
  - [V] 5 presets (all / concepts-only / quiz-only / exam-prep / bug-hunt-only)
  - [V] Concept jumper dropdown (per-lesson)
  - [V] Persisted state in localStorage
  - **User request:** "תפריט אחיד בכל אגף + הסתר חלקים"
- [V] P1.5.0b — Knowledge Map by topic + score (A-F) ✅
  - [V] TOPIC_TAXONOMY (15 topic groups across 20 lessons)
  - [V] Topic-grouped view with aggregated stats
  - [V] A-F letter grade per topic (color-coded)
  - [V] Sorted weakest-first by default
  - [V] Toggle: שיעור / נושא
  - **User request:** "פיצול לנושאים + ציון לכל נושא"
- [V] P1.5.0c — Code Anatomy refactor (filters) ✅
  - [V] Filter dropdowns: שיעור / נושא / מושג
  - [V] Lazy-render — <details> collapsed by default (auto-open ≤3)
  - [V] Search box for free text (concept + code + summary)
  - [V] Tree view: שיעור → מושג + counts
  - [V] Expand-all / Collapse-all buttons
  - **User request:** "פירוק קוד — אל תציג הכל, תן לי לבחור"
- [V] P1.5.0d — SITE_MAP.md document ✅
  - [V] All views/tabs catalogued
  - [V] All 20 lesson modules mapped to topics
  - [V] Concept card architecture documented (14 sections)
  - [V] Data files + lib + scripts + tests
  - [V] localStorage keys reference
  - [V] 4 recommended workflows
  - **User request:** "מפה מסודרת שלא תלך לאיבוד"
- [V] P1.5.1 — Mock Exam Mode ✅ (CRITICAL for exam — DONE!)
  - [V] P1.5.1.1 — Tab "📝 מבחן מדומה"
  - [V] P1.5.1.2 — 5 exam templates (react_full, react_quick, js_foundations, all_full, practice_short)
  - [V] P1.5.1.3 — Timer countdown + auto-submit on expire + warn <5min
  - [V] P1.5.1.4 — Result screen with A-F grade + breakdown by kind + weak concepts
  - [V] P1.5.1.5 — History view (last 30 attempts in localStorage)
  - [V] Bonus: question nav bar (jump to any question) + skip/prev/next
  - [V] Bonus: composer uses deterministic RNG seeded by template + time
  - [V] Bonus: scoring across 4 question kinds (MC, Fill, Trace, Bug)
- [V] P1.5.2 — Per-Distractor Feedback ✅
  - [V] P1.5.2.1 — Schema: question.optionFeedback[4] + OPTION_FEEDBACK[id] map
  - [V] P1.5.2.2 — UI: distractor feedback shown FIRST + generic explanation as secondary
  - [ ] P1.5.2.3 — LLM batch script — augment 1316 MCs (deferred — needs Claude API)
  - [V] P1.5.2.4 — Manual coverage: 14 high-impact React/JS MCs (Variables, Arrays, Functions, useState)

**P1 Total: 60/62** (P1.5.2 partial complete — LLM batch deferred)

---

## 🎯 Phase 2 — מוצר ליבה לימודי (5 שבועות + 3 sprints)

### W6 — SRS Production + Gap Matrix
- [ ] P2.1.1 — Upgrade SM-2 → FSRS-4
- [ ] P2.1.2 — Migration: existing srsState
- [ ] P2.1.3 — Update applyAnswer + pickWeightedConcept
- [ ] P2.1.4 — UI badge "🔁 חזרה מומלצת"
- [ ] P2.2.1 — Gap Matrix dashboard tab
- [ ] P2.2.2 — 3 categories filter (red/yellow/green)
- [ ] P2.2.3 — Smart filters ("not tried 7d", "keep wrong")

### W7 — Concept Metaphor Library + Pathways
- [ ] P2.3.1 — Schema: metaphors[] in concept_enrichment
- [ ] P2.3.2 — Content: 5 metaphors × 50 core concepts
- [ ] P2.3.3 — UI carousel + "בחר את שלך"
- [ ] P2.4.1 — Schema: pathways {grandma, parent, technical}
- [ ] P2.4.2 — Content: 30 core concepts × 3 pathways
- [ ] P2.4.3 — Top toggle 👵/🧑‍🏫/👨‍💻
- [ ] P2.4.4 — localStorage userPathway

### W8 — Pair-Match + Bug Hunt Quests
- [ ] P2.5.1 — Pair-Match schema
- [ ] P2.5.2 — UI: HTML5 drag-and-drop
- [ ] P2.5.3 — 5-7 pair-match games content
- [ ] P2.6.1 — Quest schema
- [ ] P2.6.2 — UI: narrative modal with progress
- [ ] P2.6.3 — 5 quests × 5-8 bugs each = 25-40 bugs

### W9 — AI Tutor (Backend Proxy)
- [ ] P2.7.1 — Supabase project init
- [ ] P2.7.2 — Edge function: ai-tutor
- [ ] P2.7.3 — Anthropic SDK + prompt caching
- [ ] P2.7.4 — Rate limiting (5/day free, 100/day Pro)
- [ ] P2.7.5 — 3 modes: coach / explain / review
- [ ] P2.7.6 — UI: floating "💬 שאל" button + modal
- [ ] P2.7.7 — Streaming response
- [ ] P2.7.8 — Misconception detector (after 3 wrong)
- [ ] P2.7.9 — "Explain Like I'm 5" mode

### W10 — Cross-device Sync
- [ ] P2.8.1 — Supabase auth (magic link + Google)
- [ ] P2.8.2 — Tables: progress (RLS)
- [ ] P2.8.3 — Sync: localStorage ↔ Supabase
- [ ] P2.8.4 — Conflict: last-write-wins
- [ ] P2.8.5 — UI: sync indicator

### Sprint 1 — Quick Pedagogical Wins (שבועיים, parallel)
- [V] P2.S1.1 — Anti-Pattern Gallery
  - [V] P2.S1.1.1 — data/anti_patterns.js (8 hard concepts × 22 patterns)
  - [V] P2.S1.1.2 — content-loader.js merge (antiPatternsCount tracked)
  - [V] P2.S1.1.3 — UI: renderAntiPatternsPanel in concept card
  - [V] P2.S1.1.4 — CSS: .anti-pattern-card with P0/P1 severity stripes
- [V] P2.S1.2 — Mnemonics Lab
  - [V] P2.S1.2.1 — data/mnemonics.js (9 hard concepts with acronyms)
  - [V] P2.S1.2.2 — Hebrew acronyms ("מ.ר.ע.נ" useEffect) + rhymes
  - [V] P2.S1.2.3 — UI: renderMnemonicPanel with expansion + rhyme + why
- [-] P2.S1.3 — Flashcards UI (deferred to Phase 2 W6 — needs full new tab)
  - [-] P2.S1.3.1 — data/flashcards.js
  - [-] P2.S1.3.2 — Tab "🃏 כרטיסיות"
  - [-] P2.S1.3.3 — Front/back flip
  - [-] P2.S1.3.4 — Easy/Good/Hard/Again rating

### Sprint 2 — Visual Mental Models
- [ ] P2.S2.1 — Mental Model Animator
  - [ ] P2.S2.1.1 — data/animations.js (5-6 hard concepts)
  - [ ] P2.S2.1.2 — UI: SVG/HTML stepper Next/Prev/Auto
- [ ] P2.S2.2 — War Stories Library
  - [ ] P2.S2.2.1 — data/war_stories.js (8 concepts × 3-5 = 30)
  - [ ] P2.S2.2.2 — UI: cards with severity filter

### Sprint 3 — Comparative Learning
- [ ] P2.S3.1 — Side-by-Side Comparator
  - [ ] P2.S3.1.1 — data/comparisons.js (8-10 comparisons)
  - [ ] P2.S3.1.2 — UI: 2-column table
- [ ] P2.S3.2 — What-If Simulator
  - [ ] P2.S3.2.1 — data/what_if.js (5-6 concepts)
  - [ ] P2.S3.2.2 — UI: knobs + outcome display

**P2 Total: 0/63**

---

## 🧠 Phase 3 — אינטליגנציה + Sync (6 שבועות)

### W11 — Themed Scenarios + Counterfactuals
- [ ] P3.1.1 — Schema: scenarios{kitchen, shop, classroom, sports}
- [ ] P3.1.2 — Content: 5 scenarios × 30 concepts = 150
- [ ] P3.1.3 — UI: dropdown switcher
- [ ] P3.2.1 — Schema: counterfactual {code, problem, why}
- [ ] P3.2.2 — Content: 30 critical concepts
- [ ] P3.2.3 — UI: "🤔 מה היה בלי?" button

### W12 — Streaks + Daily Reflection + 60-Sec Wrap-Up
- [ ] P3.3.1 — Streaks tracking + 🔥 widget
- [ ] P3.3.2 — Streak freeze (1/month for Pro)
- [ ] P3.4.1 — Friday 18:00 reflection modal
- [ ] P3.4.2 — Reflection history view
- [ ] P3.5.1 — Lesson-end 60-sec wrap-up
- [ ] P3.5.2 — Confidence calibration tracking
- [ ] P3.6.1 — Achievements system (30 initial)
- [ ] P3.6.2 — XP + global level

### W13 — Real-Object Visuals + Animations
- [ ] P3.7.1 — 50 Unsplash images for grandma levels
- [ ] P3.7.2 — Image hosting + lazy load
- [ ] P3.8.1 — 10 animated concept videos (60-90s each)
- [ ] P3.8.2 — Tool: Motion Canvas or SVG+GSAP
- [ ] P3.8.3 — Embedded in concept cards

### W14 — Prerequisite Graph
- [ ] P3.9.1 — Schema: prerequisites[] in concepts
- [ ] P3.9.2 — Content: complete dependency tree
- [ ] P3.9.3 — UI: warning modal on prereq miss
- [ ] P3.9.4 — Knowledge map: graph visualization
- [ ] P3.9.5 — "Suggested next" after mastery

### W15-16 — Vite Migration + Modularize
- [ ] P3.10.1 — npm install vite + plugin-react
- [ ] P3.10.2 — vite.config.js with manualChunks
- [ ] P3.10.3 — Split app.js → src/views/, core/, ui/, utils/
- [ ] P3.10.4 — Update index.html → import main.js
- [ ] P3.11.1 — TypeScript bootstrap (tsconfig + checkJs)
- [ ] P3.11.2 — Migrate lib/rng.ts + lib/srs.ts
- [ ] P3.11.3 — Migrate core/ modules
- [ ] P3.11.4 — Migrate views/ (incremental)
- [ ] P3.12.1 — Phase 2 Extended: Time Machine (6 concepts)
- [ ] P3.12.2 — Phase 2 Extended: Concept Comic (8 concepts)
- [ ] P3.12.3 — Phase 2 Extended: Concept Map (D3.js)
- [ ] P3.12.4 — Phase 2 Extended: Reverse Q&A

**P3 Total: 0/41**

---

## 🌐 Phase 4 — קנה מידה + קהילה (8+ שבועות)

### Teacher Dashboard
- [ ] P4.1.1 — Schema: classes table in Supabase
- [ ] P4.1.2 — Class creation flow
- [ ] P4.1.3 — Student list view (table)
- [ ] P4.1.4 — Concept heatmap
- [ ] P4.1.5 — Risk alerts (inactive 3d, dropped %)
- [ ] P4.1.6 — Assignment system
- [ ] P4.1.7 — Bulk import (CSV)

### Community
- [ ] P4.2.1 — Discussion threads per concept
- [ ] P4.2.2 — Upvote/downvote
- [ ] P4.2.3 — Reputation system
- [ ] P4.2.4 — Moderation tools

### Peer Code Review
- [ ] P4.3.1 — Submit solution
- [ ] P4.3.2 — Match by level
- [ ] P4.3.3 — Review template
- [ ] P4.3.4 — XP system

### Mentor Matching
- [ ] P4.4.1 — Master eligibility logic
- [ ] P4.4.2 — Async chat (Supabase realtime)
- [ ] P4.4.3 — Reputation, rating

### Mobile Native (Optional)
- [ ] P4.5.1 — React Native setup
- [ ] P4.5.2 — Shared core/ with web
- [ ] P4.5.3 — iOS build
- [ ] P4.5.4 — Android build
- [ ] P4.5.5 — Push notifications
- [ ] P4.5.6 — App Store + Google Play

### Polish
- [ ] P4.6.1 — Distractor objectivity audit (50 random MCs)
- [ ] P4.6.2 — 10% QA on seeded questions (170)
- [ ] P4.6.3 — Hebrew/English glossary expansion (200+ entries)
- [ ] P4.6.4 — Sanitize all text/code injection (DOMPurify)

**P4 Total: 0/28**

---

## 🎯 Iron Rules (כללי ברזל) — מתעדכן עם כל commit

- [V] No Math.random in functional code (lib/rng.js only)
- [V] No fake data (validate_bank --strict enforces)
- [V] No API keys in frontend (planned: backend proxy)
- [V] No editing main directly (PRs only)
- [V] No breaking CI
- [ ] No flaky tests (Vitest + Playwright must be deterministic)
- [ ] No feature without DoD (goal + metric + rollback)
- [V] No boilerplate (validator catches)
- [V] No fill question with ambiguous answer
- [V] No lessons without difficulty

---

## 📝 Update Log

```
2026-04-27 21:30 — Initial task list created (209 total tasks)
2026-04-27 22:00 — Phase 1 W1 begins
2026-04-27 22:51 — P1.4.1 Code Runner (🚀 הרץ) shipped
2026-04-27 23:13 — P1.4.3 Bug Hunt mode shipped (14 bugs)
2026-04-27 23:20 — User-requested study UX added to plan:
                   • P1.5.0a View Mode panel (toggles + jumper + presets)
                   • P1.5.0b Knowledge Map by topic + A-F grade
                   • P1.5.0c Code Anatomy refactor (filters) — pending
                   • P1.5.0d SITE_MAP.md — pending
2026-04-27 23:25 — P1.5.0a + P1.5.0b shipped (in code, verified in browser)
2026-04-28 00:09 — P1.5.0c (Code Anatomy filters) + P1.5.0d (SITE_MAP.md) shipped
2026-04-28 00:13 — P1.5.1 Mock Exam Mode shipped — Tab + 5 templates + timer + nav + result + history
2026-04-28 00:24 — P1.4.4 Mini Build shipped — 8 builds + regex tests + UI on concept card
2026-04-28 00:30 — Sprint 2 Mental Model Animator shipped — 6 concepts × 3-4 frames + stepper UI
2026-04-28 00:34 — Sprint 3 Side-by-Side Comparator dedicated tab shipped (6 pairs)
2026-04-28 00:38 — Sprint 3 What-If Simulator shipped — 5 concepts × 3 scenarios + interactive knobs
2026-04-28 00:41 — Pocket Concept Card shipped — floating panel + per-concept save button
2026-04-28 01:05 — Final wave: P1.5.2 distractor feedback + a11y + glossary + reflection + reverse + ELI5
```

---

**Note:** המסמך מתעדכן בכל commit. ראה Phase X DoD לקריטריונים מדויקים לסיום phase.
