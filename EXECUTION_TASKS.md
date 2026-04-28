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
| Finish Line 1: SVCollege Full Portal Coverage | 33/73 | **45%** 🚨 |
| Phase 0: Status (DONE) | 25/25 | 100% ✅ |
| Phase 1: Foundation | 60/62 | **97%** 🚧 |
| Phase 2: Core Learning | 68/70 | **97%** 🚧 |
| Phase 3: Intelligence + Sync | 36/41 | **88%** 🚧 |
| Phase 4: Scale + Community | 4/28 | **14%** 🚧 |
| Phase 5: Quality Governance + Rebaseline | 22/39 | **56%** 🚧 |
| Phase 6: Learning Evidence + Productization | 19/36 | **53%** 🚧 |
| Phase 7: Learning OS + Outcome Scale | 0/48 | 0% |
| **TOTAL** | **264/422** | **63%** |

### Finish Line 1 Override — 2026-04-28

היעד הראשון עכשיו הוא **כיסוי מלא של חומר SVCollege בכל הפורטל: כל השיעורים, כל מצבי התרגול, כל הטאבים, כל התפריטים, וכל מסכי הסיכום**. כל הרחבות המוזיאון, AI, קהילה, mobile, Teacher Dashboard ופיצ'רי פרימיום הן עדיפות שנייה עד ש-Finish Line 1 ירוק.

### Parallel Work Mode — 2026-04-28

רכבת המיזוג המלאה מוקפאת כרגע. **SQL/ORM, Auth/Security, Next.js והמוזיאון כבר מוזגו**, והעבודה ממשיכה במודול Finish Line 1 אחד בכל פעם כדי למנוע דריסות. העבודה השוטפת כאן מתמקדת בתוכן SVCollege, readiness, quality gates, תכנון ובדיקות חיבור.

### Phase 1 Detailed:
- W1 Architecture: ✅ 14/14 (lazy load + per-card + Vitest baseline; current suite 127 tests)
- W2 Accessibility: ✅ 11/16 (ARIA done, keyboard partial, motion+light done)
- W3 PWA: ✅ 5/6 (manifest + SW done, install prompt deferred)
- W4 Code Runner/Bug/Mini-Build: ✅ 12/12 (Code Runner, 14 Bug Hunts, 21 Builds; 50 new Trace items incl. closures)
- W5 Mock Exam + Study UX: 🚧 11/14 (Mock Exam done; user-requested UX 4/4 done; full distractor coverage partial)

### Phase 2 Sprint 1 Done:
- Anti-Pattern Gallery: ✅ 4/4 (22 patterns, UI, CSS)
- Mnemonics Lab: ✅ 3/3 (9 concepts in Hebrew with rhymes)
- Flashcards UI: ✅ 4/4 (SRS tab + generated real lesson cards + ratings)

### Phase 2 Sprint 2 Done:
- War Stories Library: ✅ (31 incidents, UI integrated)
- Side-by-Side Comparator: ✅ (6 comparisons, UI integrated)
- Mental Model Animator: ✅ (6 concepts × 3-4 frames + stepper UI + auto-play)

### 2026-04-28 Re-baseline Notes:
- דוח הביקורת צדק בעיקר לגבי הסיכון הניהולי: מעכשיו `Done` מחייב קוד + בדיקות + וידוא UX/browser + תיעוד + מדד כיסוי.
- המספרים הישנים בדוח לגבי Anti-Patterns / War Stories / Mini Builds כבר לא עדכניים בריפו: אומתו 22/22 anti-patterns, 31/30 war stories, 21/21 mini builds.
- Per-Distractor Feedback סווג מחדש כ-Partial: קיימים UI וסכמה + 50 שאלות MC מכוסות, אבל לא 100% מבנק ה-MC.
- Cross-device Sync סווג מחדש כ-Partial בתוך Phase 2: Export/Import וטבלאות Supabase קיימים, אך live sync ו-conflict resolution עדיין לא בוצעו.
- AI Tutor נשאר MVP מקומי/דמו: production Alpha עם guardrails, logging, streaming ו-rate limits אמיתיים עבר ל-Phase 5.
- Phase 5 נוסף כדי להפוך ביקורת איכות, מדדי כיסוי, ו-90-day roadmap למשימות נמדדות.

---

## 🚨 Finish Line 1 — SVCollege Full Portal Coverage

> מקור קנוני: `data/course_blueprints.js` + `SVCOLLEGE_COVERAGE_REPORT.md`  
> DoD: כל חומר SVCollege ממופה ומכוסה בשיעור, תרגול, מבחן, ניווט וטאב; כל חלק באתר נפתח בלי שגיאת runtime; אין הרחבת Priority 2 לפני שהשער הזה ירוק.

### Finish Line 1 Definition of Done

- כל מודול ציבורי של SVCollege מופיע ב-blueprint עם `covered` / `partial` / `gap`.
- כל מודול `covered` או `partial` מחובר לשיעור אמיתי, מושגים, תרגול ומבחן מדומה.
- כל `gap` מקבל שיעור יעד, תרגול יעד, וטאב/תפריט שבו הוא יופיע.
- כל שיעור בפורטל כולל: מטרות, דרישות קדם, מושגים, הסבר פשוט, קוד, שאלות, תרגול, ומיפוי לטאב.
- כל טאב ראשי וכל תת-תפריט צד נפתח בדסקטופ ובמובייל בלי console errors.
- כל מצב תרגול עובד: שיעורים, מאמן ידע, לימוד מותאם, מבחן מדומה, Code Trace, Bug Hunt, Mini Build, Flashcards, Pair-Match, Gap Matrix, Course Blueprints.
- מבחן SVCollege ייעודי דוגם את כל המודולים ולא רק JS/React/Node.
- CI כולל smoke לאתר, בדיקות תוכן, שאלות, feature coverage, `npm audit`, build, Vitest, ו-No-Math.random.

### P-1.0 — Finish Line Governance
- [V] P-1.0.1 — Declare SVCollege full portal coverage as Finish Line 1
- [V] P-1.0.2 — Mark museum / community / premium / AI Tutor production as Priority 2 until Finish Line 1 is green
- [V] P-1.0.3 — Add Finish Line 1 to summary table and execution plan
- [V] P-1.0.4 — Add PR checklist rule: no Priority 2 feature unless it directly closes SVCollege/site-health risk
- [V] P-1.0.5 — Add weekly SVCollege readiness report command/script
- [V] P-1.0.6 — Scope Course Blueprints / יישור קורסים to SVCollege AI & Full Stack only; defer other schools to separate future portals

### P-1.1 — Canonical SVCollege Coverage Map
- [V] P-1.1.1 — Verify current public SVCollege course source
- [V] P-1.1.2 — Update `svcollege_fullstack_ai` blueprint as primary target
- [V] P-1.1.3 — Add `SVCOLLEGE_COVERAGE_REPORT.md`
- [V] P-1.1.4 — Add regression test for SVCollege module mapping
- [V] P-1.1.5 — Add automatic coverage percentage per SVCollege module
- [V] P-1.1.6 — Add UI indicator: Covered / Partial / Gap inside Course Blueprints tab

### P-1.2 — All SVCollege Lessons Coverage
- [V] P-1.2.1 — Create full lesson inventory: existing lessons + missing SVCollege modules
- [V] P-1.2.2 — Add HTML/CSS foundations lesson: semantic HTML, forms, selectors, box model, accessibility basics
- [V] P-1.2.3 — Add Git/tooling lesson: GitHub workflow, branch/PR, ESLint, Prettier, npm scripts
- [V] P-1.2.4 — Add PostgreSQL + ORM lesson: schema, relations, migrations, Prisma/Drizzle CRUD
- [V] P-1.2.5 — Add Auth lesson: JWT, cookies, sessions, provider auth, security boundaries
- [V] P-1.2.6 — Add Next.js lesson: routing, layouts, server/client components, API routes, SEO, deploy
- [V] P-1.2.7 — Add DevOps lesson: Vercel, Docker, Docker Compose, CI/CD, testing workflow
- [V] P-1.2.8 — Add Nest.js bridge lesson: modules, controllers, providers, dependency injection
- [ ] P-1.2.9 — Add AI Engineering lesson: Vercel AI SDK, OpenAI API, LangChain, RAG, Agents, Fine-tuning boundaries
- [ ] P-1.2.10 — Add prerequisites, glossary entries, 7-level explanations and code examples to every new SVCollege lesson

### P-1.3 — All Lessons Practice Coverage
- [ ] P-1.3.1 — Ensure every SVCollege lesson has MC + Fill coverage
- [ ] P-1.3.2 — Ensure every SVCollege lesson has at least one Code Trace where code flow matters
- [ ] P-1.3.3 — Ensure every SVCollege lesson has at least one Mini Build where implementation matters
- [ ] P-1.3.4 — Ensure every backend / DB / auth lesson has Bug Hunt coverage
- [ ] P-1.3.5 — Add per-distractor feedback for all SVCollege mock-exam MC questions
- [ ] P-1.3.6 — Add weak-concept repair routing for every new SVCollege module
- [ ] P-1.3.7 — Add flashcards and SRS hooks for every new SVCollege lesson
- [ ] P-1.3.8 — Add capstone links for every SVCollege domain: frontend, backend, DB, auth, Next, AI
- [ ] P-1.3.9 — Add question-quality gate scoped to SVCollege readiness
- [ ] P-1.3.10 — Add remediation queue for SVCollege gaps before expanding non-core content

### P-1.4 — All Portal Tabs Must Support SVCollege
- [ ] P-1.4.1 — Lessons tab: every SVCollege lesson appears in right-side tree and concept jumper
- [ ] P-1.4.2 — Adaptive trainer / Study tab: can pick every SVCollege concept and gap module
- [V] P-1.4.3 — Mock Exam tab: add SVCollege-specific template and scoring breakdown by module
- [ ] P-1.4.4 — Knowledge Map / Gap Matrix tabs: show SVCollege readiness by topic and lesson
- [ ] P-1.4.5 — Code Trace / Bug Hunt / Mini Build tabs: include SVCollege module filters
- [ ] P-1.4.6 — Flashcards / Pair-Match tabs: include cards/games for all new SVCollege lessons
- [ ] P-1.4.7 — Quick Guide / Grandma Knowledge / Concept Cards: include the missing SVCollege modules
- [ ] P-1.4.8 — Course Blueprints tab: add readiness dashboard, gaps, next action and exam readiness
- [ ] P-1.4.9 — Reports / History / Export / PDF flows: include SVCollege readiness status
- [ ] P-1.4.10 — Mobile drawer and right-side tree: expose all SVCollege lessons and tabs without overflow/overlap

### P-1.5 — Site Health Gate For Every Tab
- [ ] P-1.5.1 — Add Playwright smoke suite for every top tab
- [ ] P-1.5.2 — Add smoke suite for every right-side tree branch and submenu
- [ ] P-1.5.3 — Add smoke suite for Trainer, Study, Mock Exam, Bug Hunt, Mini Build, Code Trace
- [ ] P-1.5.4 — Add desktop + mobile viewport screenshots for critical flows
- [ ] P-1.5.5 — Fail CI on runtime console errors in critical flows
- [ ] P-1.5.6 — Add accessibility smoke: focus order, modal close, keyboard navigation, contrast
- [ ] P-1.5.7 — Add PWA/offline smoke for core SVCollege flow
- [ ] P-1.5.8 — Fix every runtime/UI issue found before adding Priority 2 features

### P-1.6 — SVCollege Assessment Readiness
- [V] P-1.6.1 — Add SVCollege-specific mock exam template
- [V] P-1.6.2 — Add SVCollege module scoring: HTML/CSS, JS, Tooling, Backend, DB, Auth, React, TS, Next, DevOps, Nest, AI
- [ ] P-1.6.3 — Add exam review screen: weak modules, prerequisite rewind, recommended lesson path
- [ ] P-1.6.4 — Add deterministic question sampler that covers every SVCollege module
- [ ] P-1.6.5 — Add SVCollege final-project readiness rubric
- [ ] P-1.6.6 — Add teacher/student export summary for SVCollege readiness
- [ ] P-1.6.7 — Add pass/fail gate: no "ready" badge until all required modules are covered

### P-1.7 — Finish Line Release Gate
- [ ] P-1.7.1 — Finish Line 1 cannot close while any SVCollege module is `gap`
- [ ] P-1.7.2 — Finish Line 1 cannot close while any top tab has failing smoke coverage
- [ ] P-1.7.3 — Finish Line 1 cannot close while SVCollege mock exam misses a module
- [ ] P-1.7.4 — Finish Line 1 cannot close while CI, build, validation or audit is red

### P-1.8 — Question Learning Contract + Prerequisite Capsules
- [ ] P-1.8.1 — Add `questionPrerequisites` contract for every SVCollege mock-exam question: required concepts, required terms, and assumed prior knowledge
- [ ] P-1.8.2 — Show a right-side "מה צריך לדעת כדי לענות?" panel beside every hard question
- [ ] P-1.8.3 — Add mini explanations for required terms: bit, byte, value, key, variable, array, object, function, request, response, schema, token
- [ ] P-1.8.4 — If a learner misses an advanced question, route first to the weakest prerequisite capsule before retesting
- [ ] P-1.8.5 — Add validation: no SVCollege hard question can ship without prerequisite and side-explanation metadata
- [ ] P-1.8.6 — Add browser smoke for prerequisite panel in lesson quiz, trainer and mock exam

### P-1.9 — SVCollege Command Center
- [ ] P-1.9.1 — Add a single SVCollege dashboard tab/section: readiness, release blockers, next actions, weak modules and tab-health status
- [V] P-1.9.2 — Merge readiness sources into one report: blueprint coverage, lesson inventory, question coverage, feature coverage, quiz-key coverage and smoke status
- [V] P-1.9.3 — Add "red first" work queue sorted by release blockers: Auth, SQL/ORM, Next.js, DevOps, Nest.js, AI Engineering
- [V] P-1.9.4 — Add parallel-session board with file ownership, branch name, model/intelligence level and merge order
- [V] P-1.9.5 — Add evidence links for every module: data file, questions, trace/build/bug items, tests and browser verification
- [V] P-1.9.6 — Add no-evidence gate: `covered` is forbidden without lesson + practice + tab + test evidence

### P-1.10 — Lesson Source + Asset Registry
- [V] P-1.10.1 — Move raw lesson assets from repo root into `lessons/`
- [V] P-1.10.2 — Create `lessons/manifest.json` with filename, type, source lesson, SVCollege module, imported status and linked data file
- [V] P-1.10.3 — Add a script that fails if new PDF/MP4/DOCX/PPTX lesson assets are left in the root folder
- [V] P-1.10.4 — Link every new SVCollege lesson to its raw source assets and generated summaries
- [V] P-1.10.5 — Add "source coverage" column to `SVCOLLEGE_LESSON_INVENTORY.md`

### P-1.11 — Real Learner Outcome Loop
- [ ] P-1.11.1 — Add a 10-student pilot protocol: baseline exam, 7-day use, final exam, qualitative feedback
- [ ] P-1.11.2 — Track D1/D7 retention, module mastery, average wrong-to-correct recovery time and repeated misconception rate
- [ ] P-1.11.3 — Add "student got stuck" feedback button with current lesson, question, prerequisite and viewport metadata
- [ ] P-1.11.4 — Add teacher-facing weekly SVCollege progress export before building any broad teacher dashboard
- [ ] P-1.11.5 — Define promotion rule: a module is "ready for students" only after content, practice, smoke and first-user feedback pass

**Finish Line 1 Total: 33/73 🚨**

---

## ✅ Phase 0 — Status (כבר הושלם)

### Foundation (מ-Tracks A+B+C ב-PR #8)
- [V] P0.1.1 — Math.random → mulberry32 PRNG (lib/rng.js)
- [V] P0.1.2 — SRS schema (lib/srs.js, FSRS-4)
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
- [V] P1.4.2 — Code Trace expansion ✅
  - [V] P1.4.2.1 — 5 traces per lesson 11-20 (45 traces)
  - [V] P1.4.2.2 — Traces for lesson_closures (5)
- [V] P1.4.3 — Bug Hunt mode ✅
  - [V] P1.4.3.1 — Schema in data/questions_bug.js
  - [V] P1.4.3.2 — UI: 4-option MC + fix reveal + explanation
  - [V] P1.4.3.3 — 14 bug hunts (target was 28; partial coverage)
- [V] P1.4.4 — Mini Build mode ✅
  - [V] P1.4.4.1 — Schema in data/questions_build.js (prompt, starter, tests[], reference, hint, explanation)
  - [V] P1.4.4.2 — UI: textarea + 🚀 בדוק + 💡 רמז + 👀 פתרון + 🔄 איפוס
  - [V] P1.4.4.3 — 21 builds (target reached; JS foundations + Node/Express + React fundamentals)
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
- [~] P1.5.2 — Per-Distractor Feedback (Partial: UI + top 50 MCs; full-bank coverage deferred)
  - [V] P1.5.2.1 — Schema: question.optionFeedback[4] + OPTION_FEEDBACK[id] map
  - [V] P1.5.2.2 — UI: distractor feedback shown FIRST + generic explanation as secondary
  - [-] P1.5.2.3 — LLM batch script — augment 1316 MCs (deferred — needs Claude API + review pipeline)
  - [V] P1.5.2.4 — Manual coverage: top 50 high-impact MCs

**P1 Total: 60/62** (remaining production deferrals: install prompt UX + full MC option-feedback coverage pipeline)

---

## 🎯 Phase 2 — מוצר ליבה לימודי (5 שבועות + 3 sprints)

### W6 — SRS Production + Gap Matrix ✅ 2026-04-28
- [V] P2.1.1 — Upgrade SM-2 → FSRS-4 (lib/srs.js full rewrite)
- [V] P2.1.2 — Migration: existing srsState (app.js IIFE + defaultSrsState)
- [V] P2.1.3 — Update applyAnswer + pickWeightedConcept (urgency API unchanged)
- [V] P2.1.4 — UI badge "🔁 חזרה מומלצת" (renderConceptCard + CSS)
- [V] P2.2.1 — Gap Matrix dashboard tab (index.html + openGapMatrix)
- [V] P2.2.2 — 3 categories filter (red/yellow/green bars in renderGapMatrix)
- [V] P2.2.3 — Smart filters ("not tried 7d", "keep wrong" + filter buttons)

### W7 — Concept Metaphor Library + Pathways ✅ 2026-04-28
- [V] P2.3.1 — Schema: CONCEPT_METAPHORS in data/metaphors.js
- [V] P2.3.2 — Content: 5 metaphors × 50 core concepts (data/metaphors.js)
- [V] P2.3.3 — UI carousel + prev/next (renderMetaphorCarousel + wireConceptCardHandlers)
- [V] P2.4.1 — Schema: CONCEPT_PATHWAYS {grandma, parent, technical} (data/pathways.js)
- [V] P2.4.2 — Content: 30 core concepts × 3 pathways (data/pathways.js)
- [V] P2.4.3 — Toggle 👵/🧑‍🏫/👨‍💻 inside concept card (pathway-toggle div)
- [V] P2.4.4 — localStorage PATHWAY_KEY + setPathway() in app.js

### W8 — Pair-Match + Bug Hunt Quests ✅ 2026-04-28
- [V] P2.5.1 — Pair-Match schema (data/pair_match.js, 14 games)
- [V] P2.5.2 — UI: HTML5 drag-and-drop + tap-to-select fallback
- [V] P2.5.3 — 14 pair-match games covering all major topics
- [V] P2.6.1 — Quest schema (data/bug_quests.js, 5 quests)
- [V] P2.6.2 — UI: narrative overlay modal with progress bar (bq-progress)
- [V] P2.6.3 — 5 quests × 5 bugs each = 25 bugs (React Hooks, Async, Component, Node, TS)

### W9 — AI Tutor MVP ✅ 2026-04-28 (demo mode + edge-function skeleton; production Alpha tracked in P5.5.2)
- [V] P2.7.1 — Supabase edge function skeleton (supabase/functions/ai-tutor/index.ts)
- [V] P2.7.2 — Edge function: ai-tutor (Deno, Anthropic SDK, claude-haiku)
- [V] P2.7.3 — Anthropic SDK integration in edge function
- [V] P2.7.4 — Rate limiting: 20/day via AI_USAGE_KEY in localStorage
- [V] P2.7.5 — 3 modes: coach / explain / check (mode tabs in modal)
- [V] P2.7.6 — UI: floating 💬 FAB + modal (ai-tutor-fab + ai-tutor-modal)
- [V] P2.7.7 — Demo fallback + `/api/ai-tutor` fetch bridge (streaming deferred to production Alpha in P5.5.2)
- [V] P2.7.8 — Misconception detector (3 consecutive wrong → auto-open + prefill)
- [V] P2.7.9 — ELI5 mode already exists (eli5 action in wireConceptCardHandlers)

### W10 — Cross-device Sync 🚧 2026-04-28 (Export/Import done; Supabase auth skeleton)
- [V] P2.8.1 — Export/Import JSON (exportProgress + importProgress in app.js)
- [V] P2.8.2 — Tables: progress (supabase/migrations/001_progress.sql with RLS)
- [ ] P2.8.3 — Sync: localStorage ↔ Supabase (needs Supabase credentials + deploy)
- [ ] P2.8.4 — Conflict: last-write-wins (deferred to W10 real deploy)
- [V] P2.8.5 — UI: Export/Import buttons in welcome screen

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
- [V] P2.S1.3 — Flashcards UI ✅ (SRS tab, generated from real lesson concepts)
  - [V] P2.S1.3.1 — data/flashcards.js (config; cards generated from LESSONS_DATA)
  - [V] P2.S1.3.2 — Tab "🃏 כרטיסיות"
  - [V] P2.S1.3.3 — Front/back reveal
  - [V] P2.S1.3.4 — Easy/Good/Hard/Again rating updates score + SRS

### Sprint 2 — Visual Mental Models
- [V] P2.S2.1 — Mental Model Animator ✅ (6 concepts × 4 frames + stepper, verified in browser)
  - [V] P2.S2.1.1 — data/animations.js (6 concepts × 3-4 frames)
  - [V] P2.S2.1.2 — UI: SVG/HTML stepper Next/Prev/Auto-play
- [V] P2.S2.2 — War Stories Library ✅ (31 incidents in 17 concepts — target 30 met)
  - [V] P2.S2.2.1 — data/war_stories.js (8 concepts × 3-5 incidents)
  - [V] P2.S2.2.2 — UI: cards with severity filter

### Sprint 3 — Comparative Learning
- [V] P2.S3.1 — Side-by-Side Comparator ✅ (6 pairs, dedicated tab, mobile-responsive)
  - [V] P2.S3.1.1 — data/comparisons.js (6 comparisons)
  - [V] P2.S3.1.2 — UI: 2-column table, dedicated tab
- [V] P2.S3.2 — What-If Simulator ✅ (5 concepts × 3 scenarios, verified in browser)
  - [V] P2.S3.2.1 — data/what_if.js (5 concepts × 3 scenarios)
  - [V] P2.S3.2.2 — UI: knobs + outcome display

### Sprint 4 — Programming Foundations Bridge
- [V] P2.S4.1 — Tab "🧱 אבני בסיס" with programming foundations, efficiency, menus, technology and language bridge
  - [V] P2.S4.1.1 — Top tab + dedicated view
  - [V] P2.S4.1.2 — Side context tree for foundations, comparisons, recipes, zero diagram
  - [V] P2.S4.1.3 — Creative build recipes for functions, arrays, array operations, and app flow
  - [V] P2.S4.1.4 — Diagram from 0 → value → variable → if/function/array → app
  - [V] P2.S4.1.5 — Sub-tabs: foundations / build examples / menus / efficiency patents / tech ranking / languages
  - [V] P2.S4.1.6 — Examples for variable, array, class, function and menus in JSON, Node.js, React and Next.js
  - [V] P2.S4.1.7 — Big-O efficiency notes, recommendations, library warning list, and language capability/speed explanations
  - [V] P2.S4.1.8 — Historical path diagram: first transistor → logic gates → machine code → assembly → high-level languages → BCPL/B/C → modern languages
  - [V] P2.S4.1.9 — Electricity-to-value ladder: voltage/current → transistor → bit → gate → adder → memory → byte → encoding → value → variable → arrays/functions
  - [V] P2.S4.1.10 — Programming Language Museum: 9 historical halls, 27 exhibits, 5 idea lineages, and historical expansion backlog
  - [V] P2.S4.1.11 — React anatomy sub-tab: why each React primitive exists, what it replaced, efficiency, alternatives, and better implementation patterns
  - [V] P2.S4.1.12 — Efficiency foundations chapter: Big-O, time/memory/network/render/bundle costs, required concepts, and next-chapter readiness map
  - [V] P2.S4.1.13 — Computer-understanding bridge: what value is, bit/byte/type/key/value/variable/reference/array/object/function, and source-code translation flow
  - [V] P2.S4.1.14 — Dedicated "🧭 עקרונות יסוד" top tab with deterministic examples and required good-programming concepts
  - [V] P2.S4.1.15 — Dedicated "🏛️ מוזיאון" top tab with immersive background, SVG illustrations, layer diagram, timeline, halls, lineages, and museum quests

**P2 Total: 68/70** (W6-W9 MVPs + most W10 done; Supabase live sync and conflict resolution remain open; AI Tutor production Alpha tracked in P5)

---

## 🧠 Phase 3 — אינטליגנציה + Sync (6 שבועות)

### W11 — Themed Scenarios + Counterfactuals ✅ 2026-04-28
- [V] P3.1.1 — Schema: CONCEPT_SCENARIOS {kitchen,shop,classroom,sports,travel}
- [V] P3.1.2 — Content: 5 scenarios × 30 concepts = 150 (data/scenarios.js)
- [V] P3.1.3 — UI: tab switcher per concept card (renderScenariosPanel)
- [V] P3.2.1 — Schema: CONCEPT_COUNTERFACTUALS {without,problem,solution,why}
- [V] P3.2.2 — Content: 30 critical concepts (data/counterfactuals.js)
- [V] P3.2.3 — UI: "🤔 מה היה בלי?" collapsible panel (renderCounterfactualPanel)

### W12 — Streaks + Daily Reflection + Achievements ✅ 2026-04-28
- [V] P3.3.1 — Streaks tracking + 🔥 widget (tickStudyStreak + STREAK_KEY)
- [V] P3.3.2 — Streak freeze (1/month) — local monthly freeze engine + widget state
- [V] P3.4.1 — Daily reflection modal (openReflectionModal + reflection-overlay)
- [V] P3.4.2 — Reflection history view (last 5 shown in modal)
- [V] P3.5.1 — Lesson-end 60-sec wrap-up (quiz result modal + 60s timer)
- [V] P3.5.2 — Confidence calibration tracking (confidence 1-5 vs score, saved history)
- [V] P3.6.1 — Achievements system (30 achievements in ACHIEVEMENTS array)
- [V] P3.6.2 — XP + global level (awardXP + xp-widget + achievement toasts)

### W13 — Real-Object Visuals + Animations
- [V] P3.7.1 — 50 real-object visual aids for grandma levels — local deterministic SVG aid library
- [V] P3.7.2 — Offline/lazy render integration — no external hosting required; service worker caches visuals data
- [V] P3.8.1 — 10 animated concept videos — offline concept clips in data/concept_videos.js
- [V] P3.8.2 — Tool: native SVG/CSS/HTML clip player (no external setup)
- [V] P3.8.3 — Embedded in concept cards — player + controls + View Mode toggle

### W14 — Prerequisite Graph ✅ 2026-04-28
- [V] P3.9.1 — Schema: CONCEPT_PREREQUISITES map (data/prerequisites.js)
- [V] P3.9.2 — Content: complete dependency tree (30 concepts)
- [V] P3.9.3 — UI: warning banner on prereq miss (prereqWarning in card)
- [V] P3.9.4 — Knowledge map: interactive graph visualization (offline-safe SVG dependency graph)
- [V] P3.9.5 — "Suggested next" chips after mastery (suggestedNext in card)

### W15-16 — Vite Migration + Modularize
- [V] P3.10.1 — Vite runtime available via Vitest dependency; npm scripts added (no new install needed)
- [V] P3.10.2 — vite.config.js with manualChunks + legacy static asset copy plugin
- [~] P3.10.3 — Split app.js → src/views/, core/, ui/, utils/ — core scoring extracted; views still pending
- [V] P3.10.4 — Update index.html → import src/main.js module bootstrap
- [V] P3.11.1 — TypeScript bootstrap (tsconfig + checkJs)
- [V] P3.11.2 — Migrate lib/rng.ts + lib/srs.ts — typed ESM ports with Vitest coverage
- [V] P3.11.3 — Migrate core/ modules — src/core/scoring.js exported + legacy app delegates to it
- [V] P3.11.4 — Migrate views/ (incremental) — src/views/context-tree.js extracted + Vitest coverage
- [V] P3.12.1 — Phase 2 Extended: Time Machine review experience (timeline from real progress)
- [V] P3.12.2 — Phase 2 Extended: Concept Comic (8 concepts)
- [V] P3.12.3 — Phase 2 Extended: Concept Map graph (native SVG, no external dependency)
- [V] P3.12.4 — Phase 2 Extended: Reverse Q&A (definition → concept modal verified)

**P3 Total: 36/41** (W11 + W12 + W13 visuals/clips + W14 graph + Time Machine + Streak freeze + Vite/TS/core/view bootstrap done; full app.js split + live sync pending)

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
- [V] P4.6.1 — Distractor objectivity audit (50 deterministic MCs; 0 blockers)
- [V] P4.6.2 — 10% QA on seeded questions (170 deterministic sample; 0 blockers)
- [V] P4.6.3 — Hebrew/English glossary expansion (228 entries; React/JS/TS/Web/Tooling)
- [V] P4.6.4 — Sanitize all text/code injection (DOMPurify + innerHTML guard)

**P4 Total: 4/28** (distractor audit + seeded QA + glossary expansion + DOMPurify sanitization done; dashboard/community/backend polish still pending)

---

## 🧭 Phase 5 — Quality Governance + 90-Day Rebaseline

> נוסף בעקבות ביקורת Grok והדוח המקיף מ-2026-04-28. המטרה: להחליף "התקדמות מוצהרת" ב"כיסוי מדיד + איכות מאומתת".

### W17 — Status Accuracy + DoD Governance
- [V] P5.1.1 — Reconcile Grok/report claims with current repo evidence
- [V] P5.1.2 — Adopt four status states only: Done / Partial / Deferred / Blocked
- [V] P5.1.3 — Add measurable DoD policy to master plan
- [V] P5.1.4 — Add machine-readable feature coverage counters per content module (`FEATURE_COVERAGE_REPORT.json`)
- [V] P5.1.5 — CI gate: minimum content coverage thresholds per module (`report_feature_coverage.js --strict`)
- [V] P5.1.6 — Weekly status accuracy report generated from repo (feature coverage gate runs on Monday CI schedule)
- [V] P5.1.7 — PR template with goal + metric + rollback + evidence checklist
- [V] P5.1.8 — Document 2-week release trains: 70% debt / 30% new capability

### W18 — Question Quality Pipeline
- [V] P5.2.1 — Add questionQuality object/schema per MC/Fill item (`QUESTION_QUALITY_REPORT.json`)
- [V] P5.2.2 — Similarity gate for near-duplicate distractors
- [V] P5.2.3 — Length-cue detector for MC options
- [V] P5.2.4 — Generic/guessable wording detector
- [V] P5.2.5 — Strict Fill ambiguity gate for answer leakage/duplicate answers
- [V] P5.2.6 — Warning/note remediation queue from full-bank question quality report
- [V] P5.2.7 — Deterministic rewrite pipeline for flagged distractors with manual review (`QUESTION_REMEDIATION_QUEUE.*`)
- [V] P5.2.8 — Weekly deterministic 10% audit CI job (Monday schedule + `qa:questions:strict`)
- [V] P5.2.9 — Manual QA checklist for 10% sampled questions (`190/1894` fixed sample)
- [V] P5.2.10 — Question Quality Index dashboard/report (`88.2%` warning-free, 0 blockers)

### W19 — Pedagogical Scaffolding + Coverage
- [V] P5.3.1 — Per-question prerequisite side-aid across quiz/trainer/trace/guide/mock/inline modes
- [V] P5.3.2 — Add explicit conceptKey/conceptKeys[] to every lesson.quiz item (`133/133`)
- [ ] P5.3.3 — Enforce "learn this first" aid on every new question kind
- [ ] P5.3.4 — Close MC coverage target: ≥3 curated MC per concept
- [ ] P5.3.5 — Close Fill coverage target: ≥2 curated Fill per codeExample concept
- [ ] P5.3.6 — Raise per-distractor feedback from top 50 MCs to 25% of MC bank
- [ ] P5.3.7 — Raise per-distractor feedback to 50% of MC bank
- [ ] P5.3.8 — Raise per-distractor feedback to 100% of MC bank
- [V] P5.3.9 — Wrong-answer weakness agent: every wrong answer updates concept/topic weakness + immediate explanation/association

### W20 — Data Contracts + Runtime Stability
- [ ] P5.4.1 — Define schema contract for Lesson/Concept/Question/Trace/Build content
- [ ] P5.4.2 — Runtime loader validation with soft error panel
- [ ] P5.4.3 — Unit tests for array/object variants in levels/extras
- [ ] P5.4.4 — Playwright top-level smoke tests for all tabs
- [ ] P5.4.5 — Console-error gate in browser smoke tests
- [ ] P5.4.6 — Service-worker stale asset regression test
- [ ] P5.4.7 — Feature health checks exposed in diagnostics view
- [ ] P5.4.8 — Local telemetry store for feature errors per 1,000 sessions

### W21 — 90-Day Roadmap Waves
- [ ] P5.5.1 — Wave 1 hardening: FSRS/Gap/Pathways metrics + retention baseline
- [ ] P5.5.2 — Wave 2 alpha: AI Tutor + Sync + Pair-Match hardening
- [ ] P5.5.3 — Wave 3 lite: Teacher Dashboard Lite + class progress heatmap
- [V] P5.5.4 — Freeze moonshots until quality gates and coverage KPIs are green

**P5 Total: 22/39** — remaining focus: full per-distractor coverage, schema contracts, Playwright smoke, telemetry, and 90-day roadmap gates.

---

## 🧪 Phase 6 — Learning Evidence + Productization

> נוסף בעקבות סבב חשיבה אסטרטגי מ-2026-04-28. המטרה: להפוך את LumenPortal ממערכת עשירה בפיצ'רים למערכת שמוכיחה שיפור למידה, מוכנה לפיילוטים, ויכולה להתרחב בלי לאבד איכות.

### W22 — Learning Evidence Loop
- [V] P6.1.1 — Define canonical learning event schema: view, answer, wrong-answer aid, review, mastery change, exam attempt, clip view
- [V] P6.1.2 — Build local-first analytics store with no PII and deterministic session IDs
- [V] P6.1.3 — Add local learning evidence dashboard: active days, answers, accuracy, remediation, reviews, exams
- [V] P6.1.4 — Add concept-level learning funnel: saw explanation → answered → remediated → retained after delay
- [V] P6.1.5 — Add "evidence required" gate: no feature promoted without outcome metric
- [V] P6.1.6 — Add anonymized export for teacher/research review
- [V] P6.1.7 — Weekly learning-evidence report generated from real usage logs

### W23 — Adaptive Remediation Engine v2
- [V] P6.2.1 — Cluster mistakes by misconception, not only by concept
- [V] P6.2.2 — Build misconception cards: symptom, root cause, minimal example, repair drill
- [V] P6.2.3 — Add "teach-back" prompt after repeated mistakes: student explains answer in own words
- [V] P6.2.4 — Add adaptive retest queue: wrong → explanation → near-transfer question → delayed review
- [V] P6.2.5 — Add prerequisite rewind: if advanced question fails, route to required lower-level concept
- [V] P6.2.6 — Add confidence calibration loop per concept
- [V] P6.2.7 — Add "I still do not get it" escape hatch that opens a simpler path and logs the blocker
- [V] P6.2.8 — Expand misconception library to 20 mapped React/JS/TS/Node mistake patterns

### W24 — Curriculum Coverage + Capstone Projects
- [ ] P6.3.1 — Close question coverage: every concept has ≥3 MC, ≥2 Fill/Code, ≥1 trace/build/bug where relevant
- [V] P6.3.2 — Active course blueprint mapping is SVCollege AI & Full Stack only; John Bryce / Sela / generic bootcamp deferred to separate future portals
- [V] P6.3.3 — Add capstone project track: Task Manager, Movie App, Budget Manager, Auth CRUD, Dashboard
- [V] P6.3.4 — Add project rubrics: requirements, edge cases, tests, code review checklist
- [ ] P6.3.5 — Add "from zero to feature" guided builds for React, Node, Next and TypeScript
- [ ] P6.3.6 — Add interview-prep mode: common junior frontend questions mapped to concepts
- [V] P6.3.7 — Add real exam blueprint alignment report

### W25 — Content Studio + Review Workflow
- [ ] P6.4.1 — Build internal content studio for question/explanation editing
- [ ] P6.4.2 — Add status per content item: draft / reviewed / verified / needs-fix
- [ ] P6.4.3 — Add deterministic content IDs from stable hashes, not generated randomness
- [ ] P6.4.4 — Add review queue from QA warnings, student mistakes and teacher feedback
- [ ] P6.4.5 — Add side-by-side diff for content revisions
- [ ] P6.4.6 — Add source/evidence field for historical museum items and technical claims
- [ ] P6.4.7 — Add NotebookLM/video asset tracker: script, status, link, review, replacement date

### W26 — Production Pilot Readiness
- [ ] P6.5.1 — Pilot plan for 10-30 students with baseline test, 2-week use, final test
- [ ] P6.5.2 — Teacher onboarding kit: class setup, assignment recipe, interpretation of heatmaps
- [ ] P6.5.3 — Support/bug-report flow inside the app with screenshot/context payload
- [ ] P6.5.4 — Privacy/data retention policy for student progress
- [ ] P6.5.5 — Performance budget: initial load, seeded-bank lazy load, offline cache, mobile CPU
- [ ] P6.5.6 — Accessibility audit to WCAG 2.1 AA with screen-reader pass
- [ ] P6.5.7 — Release checklist: smoke tests, rollback, cache bump, QA evidence, documentation

**P6 Total: 19/36** — evidence loop, evidence-required gate, anonymized export/report, 20 misconception patterns, teach-back, adaptive retest queue, prerequisite rewind, per-concept confidence calibration, still-confused escape hatch, capstone track with full rubrics, and course/exam blueprint alignment shipped.

---

## 🚀 Phase 7 — Learning OS + Outcome Scale

> נוסף בעקבות סבב רעיונות אסטרטגי מ-2026-04-28. המטרה: להפוך את LumenPortal ממערכת לימוד עשירה ל-"מערכת הפעלה ללמידה" שמאבחנת, מתכננת, מתקנת, מכינה פרויקט, ומוכיחה תוצאה מול תלמיד/מורה/פיילוט.

### W27 — Diagnostic Intake + Placement
- [ ] P7.1.1 — Build pre-course diagnostic exam: JS foundations, DOM, async, React, TS, backend
- [ ] P7.1.2 — Score by prerequisite graph, not only by lesson
- [ ] P7.1.3 — Place learner per concept: skip / learn / review / remediate
- [ ] P7.1.4 — Generate first-week plan from diagnostic results
- [ ] P7.1.5 — Capture confidence + answer latency as diagnostic signals
- [ ] P7.1.6 — Show "why this path" explanation for each recommended topic
- [ ] P7.1.7 — Schedule diagnostic retake after 7-14 days
- [ ] P7.1.8 — Export diagnostic report for teacher/student

### W28 — Adaptive Weekly Study Plan
- [ ] P7.2.1 — Daily missions from SRS due items, weak concepts, capstone needs and upcoming exam
- [ ] P7.2.2 — Time-boxed plans: 15 / 30 / 60 minutes
- [ ] P7.2.3 — Balance new learning, review, remediation and project work
- [ ] P7.2.4 — Recovery plan when learner misses days
- [ ] P7.2.5 — Progress forecast: expected mastery by date
- [ ] P7.2.6 — "Student agreement" checklist at start of session
- [ ] P7.2.7 — End-of-day summary with next best action
- [ ] P7.2.8 — Deterministic tests for plan generation

### W29 — Project Studio + Portfolio Readiness
- [ ] P7.3.1 — Capstone milestone tracker with local progress
- [ ] P7.3.2 — Code submission area: paste/link/file metadata, with privacy warning
- [ ] P7.3.3 — Rubric self-review: requirements, edge cases, tests, architecture
- [ ] P7.3.4 — Anti-pattern review against submitted project notes/code snippets
- [ ] P7.3.5 — Portfolio README generator from real capstone progress
- [ ] P7.3.6 — Teacher/mentor review notes per milestone
- [ ] P7.3.7 — Project health score: runnable / tested / documented / reviewed
- [ ] P7.3.8 — Deterministic project templates without fake data

### W30 — Teacher + Cohort Pilot Lite
- [ ] P7.4.1 — Class pilot setup without unnecessary PII
- [ ] P7.4.2 — Cohort heatmap by concept/topic/mastery state
- [ ] P7.4.3 — Assignment recipes: exam prep, project prep, remediation week
- [ ] P7.4.4 — Risk alerts: inactive, overconfident, repeated blocker, low retention
- [ ] P7.4.5 — Weekly teacher report from anonymized learning evidence
- [ ] P7.4.6 — Compare baseline vs final without exposing private answers
- [ ] P7.4.7 — Manual teacher feedback queue into content review
- [ ] P7.4.8 — Pilot SOP: setup, support, measurement, rollback

### W31 — AI Tutor Production Guardrails
- [ ] P7.5.1 — Production backend proxy for tutor calls; no frontend API keys
- [ ] P7.5.2 — Server-side rate limits by user/class/license
- [ ] P7.5.3 — Coach-mode policy: hints before direct answers
- [ ] P7.5.4 — Retrieval context from current concept, prerequisites, mistake history and capstone
- [ ] P7.5.5 — Misconception-aware prompt templates
- [ ] P7.5.6 — PII-safe logging and audit trail
- [ ] P7.5.7 — Tutor evaluation set: wrong-answer repair, no answer leakage, Hebrew clarity
- [ ] P7.5.8 — Graceful fallback when quota/network fails

### W32 — Trust, Accessibility + Mobile Hardening
- [ ] P7.6.1 — WCAG 2.1 AA screen-reader pass on all major tabs
- [ ] P7.6.2 — Keyboard-only journey: lesson → question → remediation → review → project
- [ ] P7.6.3 — Dyslexia / low-vision / reduced cognitive load modes
- [ ] P7.6.4 — Mobile touch audit for trainer, flashcards, capstones, museum and context tree
- [ ] P7.6.5 — Offline/conflict UX for local-first progress and future sync
- [ ] P7.6.6 — Performance lab: initial load, interaction latency, cache size, mobile CPU
- [ ] P7.6.7 — Privacy center: what is stored, export/delete, teacher visibility
- [ ] P7.6.8 — Trust page: no fake data, deterministic testing, content review policy

**P7 Total: 0/48** — strategic backlog only. Do not start Phase 7 until W24-W26 core coverage, content workflow, and pilot readiness are green.

---

## 🎯 Iron Rules (כללי ברזל) — מתעדכן עם כל commit

- [V] No Math.random in functional code (lib/rng.js only)
- [V] No fake data (validate_bank --strict enforces)
- [V] No API keys in frontend (planned: backend proxy)
- [V] No editing main directly (PRs only)
- [V] No breaking CI
- [V] No flaky tests (Vitest deterministic + no-native-random guard; Playwright smoke passed)
- [V] No feature without DoD (policy + PR template + CI feature evidence gate)
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
2026-04-28 01:35 — 🔍 AUDIT performed (AUDIT_2026-04-28.md):
                   - Found 2 broken features (Reverse Q&A + ELI5) — fixed in 12be94a
                   - Found 4 inflated counts (anti-patterns 14/22, war stories 18/30,
                     mini builds 8/21, distractor feedback 14/1316)
                   - 31 AUDIT-FIX tasks added below
2026-04-28 09:35 — Audit-fix execution pass:
                   - Fixed all functional Math.random usage in app.js via RNG
                   - Added Vitest guard against native random calls in JS files
                   - Closed strict validation errors in Trace/Build conceptKeys
                   - Added 5 Closures traces; Trace total now 85 (50 new audit traces)
                   - Verified grandma knowledge tab in browser + source URLs 200
2026-04-28 09:50 — P2.S1.3 Flashcards shipped:
                   - Added SRS flashcards tab generated from real LESSONS_DATA concepts
                   - Added front/back reveal + Again/Hard/Good/Easy rating
                   - Verified in Playwright: open tab → reveal → rate Good → next card, no console errors
2026-04-28 15:58 — W24 Capstone track shipped:
                   - Added dedicated "פרויקטים" tab with side-tree navigation
                   - Added 5 capstones: Task Manager, Movie App, Budget Manager, Auth CRUD, Dashboard
                   - Added measurable rubric per project: requirements, edge cases, tests, code review checklist
2026-04-28 18:04 — Strategic roadmap expansion:
                   - Added Phase 7 Learning OS + Outcome Scale
                   - Added 48 future tasks across diagnostic placement, weekly adaptive plan, project studio,
                     teacher pilot, AI tutor production guardrails, accessibility/mobile/trust hardening
                   - Updated total baseline to 232/349
2026-04-28 18:11 — W24 Course Blueprint alignment shipped:
                   - Added "יישור קורסים" tab with side-tree navigation
                   - Initial public-source mappings included SVCollege, John Bryce, Sela, and generic bootcamp
                   - Later scoped active portal alignment to SVCollege only; other mappings moved to deferred future portals
                   - Updated total baseline to 234/349
2026-04-28 09:57 — AUDIT-FIX-6 browser re-verification:
                   - Per-card refresh verified: Report Weak updates Array card in place
                   - ARIA labels visible in Playwright accessibility snapshot
                   - Theme cycle fixed + verified auto → light → dark → auto
2026-04-28 10:07 — AUDIT-FIX-7 Time Machine shipped:
                   - Replaced quick-jump history button with full progress timeline
                   - Uses only real local progress: exams, reflections, reviews, weak reports, mastered concepts
                   - Verified in Playwright: open view menu → Time Machine → action to Flashcards, no console errors
2026-04-28 10:14 — AUDIT-FIX-20 Achievements completed:
                   - Expanded achievements from 18 to 30
                   - Fixed global achievement stats to read the active scores store directly
                   - Added lifetime flashcard review stats for SRS achievements
2026-04-28 10:24 — AUDIT-FIX-19 Lesson wrap-up shipped:
                   - Added 60-second post-quiz wrap-up modal from real quiz results
                   - Added confidence calibration tracking and saved lesson-wrap history
                   - Linked wrap-up actions to weak Flashcards and Knowledge Map
2026-04-28 10:43 — AUDIT-FIX-31 Concept Map graph shipped:
                   - Added deterministic SVG prerequisite graph inside Knowledge Map
                   - Added focus selector for ancestors/descendants and clickable graph nodes
                   - Used exact lesson concepts with alias correction for existing prerequisite keys
2026-04-28 11:04 — Global right-side context tree shipped:
                   - Moved lesson concept navigation from content strip to right context tree
                   - Added branch/sub-branch navigation for major tabs
                   - Connected Code Anatomy, Code Blocks, Trace, Guide, KM, Flashcards, Exam, Gap Matrix
2026-04-28 11:19 — AUDIT-FIX Creative Methods batch shipped:
                   - Concept Comic system: 8 core concepts with visual story panels
                   - Stage-Zero broken-first flow: 8 real beginner failures with repairs
                   - Memory Palace: 8 SVG concept rooms rendered offline
                   - Problem-First Discovery: 8 product symptoms mapped to course concepts
2026-04-28 11:36 — AUDIT-FIX-13 Animated Concept Clips shipped:
                   - data/concept_videos.js: 10 offline clips mapped to existing concepts
                   - Concept-card player: scene controls, auto-play, progress, checkpoints
                   - View Mode toggle + service-worker offline cache updated
2026-04-28 11:47 — P3.12.4 Reverse Q&A re-verified:
                   - Modal opens from View Mode tools
                   - Renders definition + 4 concept options
                   - Answer click shows feedback, locks options, and exposes next-question action
2026-04-28 12:05 — NotebookLM Concept Clips production plan shipped:
                   - Added NOTEBOOKLM_CONCEPT_CLIPS.md with per-concept scripts and settings
                   - Added verified temporary YouTube links to concept clip cards
                   - Corrected map clip key to lesson_12::map so all 10 clips attach to real concepts
                   - Bumped service worker cache for refreshed concept video data
2026-04-28 12:24 — AUDIT-FIX-14 Real-Object Visual Aids shipped:
                   - Added 50 deterministic local real-object aids for Grandma Knowledge
                   - Connected aid tags into existing atlas/branch/term visuals
                   - Cached grandma_visuals.js offline and added coverage tests
2026-04-28 12:32 — Vite + TypeScript bootstrap shipped:
                   - Added vite.config.js, dev/build/preview scripts, and src/main.js module bootstrap
                   - Added src/core, src/ui, src/views, src/utils ownership scaffold for app.js extraction
                   - Added tsconfig.json plus typed lib/rng.ts and lib/srs.ts ports with Vitest coverage
                   - Vite build copies legacy static assets to dist for preview/deploy compatibility
2026-04-28 12:42 — Core scoring module extraction shipped:
                   - Added src/core/scoring.js for mastery, SRS-due, V-button, next-step and mastery-percent rules
                   - Legacy app.js delegates scoring helpers to window.LUMEN_CORE.scoring
                   - tests/scoring.test.js now imports the production core module instead of duplicating rules
                   - Service worker cache bumped to include the new core module offline
2026-04-28 12:47 — Context Tree view module extraction shipped:
                   - Added src/views/context-tree.js for branch filtering, leaf counting and stable action ids
                   - Legacy app.js delegates right-side tree pure helpers to window.LUMEN_VIEWS.contextTree
                   - Added tests/context-tree.test.js; total Vitest coverage now 59 tests
                   - Service worker cache bumped to include the extracted view module offline
2026-04-28 13:10 — Streak freeze shipped:
                   - Added src/core/streak.js deterministic monthly freeze engine
                   - Auto-preserves a streak once per month when exactly one day was missed
                   - Streak widget now shows monthly freeze availability
                   - Added tests/streak.test.js; total Vitest coverage now 64 tests
2026-04-28 13:18 — Glossary expansion shipped:
                   - Expanded data/glossary.js from 77 to 228 real Hebrew/English entries
                   - Covered React, JavaScript, TypeScript, Web/Backend, and Tooling categories
                   - Bumped glossary version to track-d-v2 and service-worker cache to refresh offline data
                   - Added tests/glossary.test.js; total Vitest coverage now 67 tests
2026-04-28 13:27 — Distractor objectivity audit shipped:
                   - Added scripts/audit_distractors.js with reproducible deterministic 50-MC sampling
                   - Generated AUDIT_DISTRACTORS_2026-04-28.md from the combined curated+seeded MC bank
                   - Strict audit found 0 blocker-level issues; 1 warning remains for broader seeded QA review
                   - Added tests/distractor-audit.test.js; total Vitest coverage now 70 tests
2026-04-28 13:32 — Seeded 10% QA shipped:
                   - Added scripts/audit_seeded_questions.js with reproducible deterministic 170-question sampling
                   - Generated AUDIT_SEEDED_QA_2026-04-28.md from QUESTIONS_BANK_SEEDED
                   - Strict seeded QA found 0 blocker-level issues after correcting symbol-only option detection
                   - Fixed seed_questions.js default seed to a stable value; total Vitest coverage now 73 tests
2026-04-28 13:39 — DOMPurify sanitization shipped:
                   - Added DOMPurify vendor script + src/core/sanitize.js with deterministic fallback sanitizer
                   - Added early bootstrap that patches innerHTML + insertAdjacentHTML before legacy app rendering
                   - Preserves required UI data/ARIA/style attributes while stripping scripts, event handlers, and unsafe URLs
                   - Added tests/sanitize.test.js; total Vitest coverage now 77 tests
2026-04-28 14:09 — Question prerequisites side-aid shipped:
                   - Added src/core/question-prerequisites.js to infer required concepts and glossary terms per question
                   - Rendered prerequisite explanations beside lesson quizzes, trainer questions, trace questions, guide questions, mock exams, and inline concept quizzes
                   - Each aid uses the real prerequisite graph, lesson concept explanations, glossary entries, and current mastery score
                   - Added tests/question-prerequisites.test.js; total Vitest coverage now 82 tests
2026-04-28 14:31 — Review re-baseline + quality governance plan:
                   - Reconciled Grok/report claims with repo-verified counts
                   - Reclassified Per-Distractor Feedback and Cross-device Sync as Partial until full-bank/live coverage exists
                   - Added Phase 5 Quality Governance + 90-day rebaseline tasks
                   - Updated SPEC_AND_MASTER_PLAN with DoD/KPI/release-train policy
2026-04-28 14:45 — Feature coverage counters shipped:
                   - Added scripts/report_feature_coverage.js to compute 22 content-module coverage metrics from real data files
                   - Generated FEATURE_COVERAGE_REPORT.json + FEATURE_COVERAGE_REPORT.md
                   - Report shows 21 Done modules, 1 Partial module: Per-Distractor Feedback 50/1340 MC questions
                   - Added npm coverage scripts + Vitest coverage tests; total suite now 86 tests
2026-04-28 14:52 — Feature coverage CI gate shipped:
                   - Added coverage:features:strict script and CI Feature coverage gate
                   - Strict gate fails only enforced targets; staged partials remain visible without blocking
                   - Tightened CI Math.random gate to forbid Math.random in all authored JS
2026-04-28 15:05 — Full-bank Question Quality pipeline shipped:
                   - Added scripts/report_question_quality.js with questionQuality schema for 1,894 MC/Fill questions
                   - Added gates for duplicate/near-duplicate options, length cues, generic wording, Fill ambiguity, and missing conceptKey
                   - Fixed 5 blocker questions (6 duplicate-option issues); current strict report has 0 blockers
                   - Generated QUESTION_QUALITY_REPORT.json + QUESTION_QUALITY_REPORT.md; QQI now 88.2% warning-free
                   - Added quality:questions scripts, CI question-quality gate, and Vitest coverage tests; total suite now 90 tests
2026-04-28 15:18 — Remediation queue + weekly QA governance shipped:
                   - Added .github/pull_request_template.md with goal/metric/rollback/evidence checklist
                   - Added scripts/build_question_remediation_queue.js; current queue: 683 warning/note items in 28 batches
                   - Added scripts/build_question_qa_checklist.js; deterministic 10% manual sample: 190/1,894 questions
                   - Added Monday scheduled CI + qa/remediation gates
                   - Added Vitest coverage tests; total suite now 96 tests
2026-04-28 15:31 — Lesson quiz concept routing shipped:
                   - Added data/lesson_quiz_keys.js with explicit conceptKeys for 133/133 lesson quiz items
                   - content-loader now attaches conceptKeys to each lesson.quiz item before rendering
                   - Added scripts/report_lesson_quiz_keys.js + LESSON_QUIZ_KEYS_REPORT.*
                   - Added CI strict gate and Vitest coverage tests; total suite now 99 tests
2026-04-28 15:48 — Wrong-answer weakness agent shipped:
                   - Added src/core/mistake-agent.js with deterministic concept/topic weakness state
                   - Wrong answers now increment weakReports and local mistake-agent concept/topic lists
                   - Trainer, guide, inline quizzes, code blocks, trace, mock exam, and bug quests show/record mistake context
                   - Feedback includes selected answer, correct answer, explanation, and existing concept association/grandma-level aid
                   - Service worker cache bumped to include src/core/mistake-agent.js offline
                   - Added tests/mistake-agent.test.js; total Vitest coverage now 103 tests
2026-04-28 16:08 — Programming Foundations tab shipped:
                   - Added top tab "🧱 אבני בסיס"
                   - Added bool/if/variable/array/function cards with code examples and confusion notes
                   - Added function-vs-array comparison, build recipes, and 0→app diagram
                   - Added right-side context tree and updated SITE_MAP.md
2026-04-28 16:24 — Programming Foundations expanded:
                   - Added sub-tabs for foundations, build examples, menus, efficiency patents, technology ranking, and languages
                   - Added variable/array/class/function variants with Big-O efficiency and recommendations
                   - Added menu examples in JSON, Node.js, React, and Next.js
                   - Added library warning list and language speed/capability explanations
                   - Service worker bumped to v2.3.1 and HTML navigation fixed to network-first so the new tab is not hidden by stale cache
2026-04-28 16:40 — Programming history timeline added:
                   - Added history sub-tab explaining "first programming language" as algorithm / machine code / assembly / high-level language
                   - Added clickable timeline from the first transistor to C and modern languages
                   - Service worker bumped to v2.3.2 so updated app.js/style.css refresh through cache
2026-04-28 16:55 — Electricity-to-value foundations added:
                   - Added "⚡ חשמל→ערך" sub-tab explaining how values and programming primitives are built from electrical states
                   - Added bit/logic-gate/adder/memory/byte/encoding/value ladder with clickable side-tree entries
                   - Service worker bumped to v2.3.3 for refreshed static assets
2026-04-28 17:10 — Programming Language Museum shipped:
                   - Added "🏛️ מוזיאון" sub-tab under אבני בסיס
                   - Added 9 historical halls, 27 exhibits, 5 idea lineages, and historical expansion ideas
                   - Updated SPEC_AND_MASTER_PLAN and task totals; service worker bumped to v2.3.4
2026-04-28 17:22 — React anatomy foundations shipped:
                   - Added "⚛️ React למה?" sub-tab under אבני בסיס
                   - Explained React primitives by purpose, replacement, efficiency, alternatives, and better patterns
                   - Service worker bumped to v2.3.5
2026-04-28 17:35 — Efficiency foundations chapter shipped:
                   - Added "📈 יעילות" sub-tab under אבני בסיס
                   - Added Big-O scale, efficiency axes, must-know concepts, readiness map for upcoming chapters, and decision rules
                   - Service worker bumped to v2.3.6
2026-04-28 17:48 — Computer-understanding bridge expanded:
                   - Expanded "⚡ חשמל→ערך" with value construction, primitive dictionary, and source-code translation flow
                   - Added bit/byte/type/key/value/variable/reference/array/object/function/expression/instruction explanations
                   - Service worker bumped to v2.3.7
2026-04-28 18:02 — Programming principles top tab shipped:
                   - Added "🧭 עקרונות יסוד" top tab beside אבני בסיס
                   - Added deterministic examples and 22 required concepts for good programming
                   - Service worker bumped to v2.3.8
2026-04-28 18:18 — Standalone programming museum shipped:
                   - Added "🏛️ מוזיאון" top tab with immersive museum background and right-side context tree
                   - Added SVG layer diagram, historical timeline, illustrated halls, idea lineages, and visit quests
                   - Service worker bumped to v2.3.9
2026-04-28 18:30 — Strategic improvement plan added:
                   - Added Phase 6 Learning Evidence + Productization with 35 measurable tasks
                   - Focus shifted to learning proof, adaptive remediation, curriculum coverage, content studio, and pilot readiness
                   - Updated total task baseline to 215/300
2026-04-28 18:45 — Phase 6 Learning Evidence MVP shipped:
                   - Added src/core/learning-evidence.js with canonical event schema, deterministic hashes, local sessions, and funnel summaries
                   - Added "📈 ראיות למידה" top tab with local KPI dashboard, concept funnels, active-day bars, and privacy note
                   - Connected lesson views, answers, wrong-answer aids, flashcards, mock exams, and lesson wrap-ups to evidence events
                   - Added tests/learning-evidence.test.js; Vitest suite now 106 tests
                   - Service worker bumped to v2.4.0; total baseline now 219/300
2026-04-28 19:05 — Phase 6 export/report shipped:
                   - Added anonymized JSON export for teacher/research review
                   - Added local weekly Markdown report generated from real usage logs
                   - Service worker bumped to v2.4.1; total baseline now 221/300
2026-04-28 19:18 — Phase 6 evidence-required gate shipped:
                   - Upgraded feature coverage report to v2 with outcomeMetric per tracked module
                   - Strict coverage CI now fails Done modules without outcome metric or repository evidence
                   - Updated PR template with explicit outcome metric/evidence gate checkbox; total baseline now 222/300
2026-04-28 19:32 — Adaptive Remediation v2 begins:
                   - Added deterministic misconception clustering to mistake-agent
                   - Added immediate misconception cards: root cause, repair, micro-drill, and association
                   - Service worker bumped to v2.4.2; total baseline now 224/300
2026-04-28 19:45 — Teach-back remediation shipped:
                   - Added teach-back prompts after repeated misconception mistakes
                   - Saves the student's own explanation locally and logs a review event
                   - Service worker bumped to v2.4.3; total baseline now 225/300
2026-04-28 20:02 — Adaptive retest queue shipped:
                   - Wrong answers now schedule near-transfer and delayed-review retests
                   - Trainer prioritizes due retests before normal weighted selection and records outcome
                   - Service worker bumped to v2.4.4; total baseline now 226/300
2026-04-28 20:18 — Prerequisite rewind shipped:
                   - Wrong advanced answers now choose the weakest prerequisite deterministically
                   - Trainer routes to the lower-level prerequisite before returning to normal flow
                   - Service worker bumped to v2.4.5; total baseline now 227/300
2026-04-28 20:35 — Per-concept confidence calibration shipped:
                   - Trainer asks for confidence 1-5 before MC/Fill answers
                   - Each concept tracks accuracy vs confidence: calibrated / overconfident / underconfident
                   - Service worker bumped to v2.4.6; total baseline now 228/300
2026-04-28 20:48 — "I still do not get it" escape hatch shipped:
                   - Wrong-answer panel can log a blocker and open the simplest path
                   - If prerequisite rewind exists, the escape hatch opens that lower-level concept first
                   - Service worker bumped to v2.4.7; total baseline now 229/300
2026-04-28 21:02 — Misconception library expanded:
                   - Added mapped cards for 20 React/JS/TS/Node mistake patterns plus fallback
                   - Added deterministic tests for coverage and specific rule routing
                   - Service worker bumped to v2.4.8; total baseline now 230/301
2026-04-28 21:30 — Priority override: SVCollege first
                   - Added Priority 0: SVCollege Readiness + Site Health
                   - Updated SVCollege blueprint to match public AI & Full Stack modules
                   - Added SVCOLLEGE_COVERAGE_REPORT.md and svcollege-readiness regression tests
                   - All museum/AI/community expansions are explicitly secondary until SVCollege readiness is green
2026-04-28 21:45 — Finish Line 1 expanded:
                   - Replaced Priority 0 with Finish Line 1: SVCollege Full Portal Coverage
                   - Added DoD across all lessons, all tabs, all practice modes, all menus and site-health gates
                   - Expanded first-line backlog to 50 measurable tasks before secondary expansions
2026-04-28 22:05 — SVCollege readiness automation shipped:
                   - Added `scripts/report_svcollege_readiness.js` with automatic module readiness percentages
                   - Added `npm run svcollege:readiness*` commands and CI metadata gate
                   - Added PR checklist gate preventing Priority 2 work before SVCollege/site-health closure
                   - Generated `SVCOLLEGE_READINESS_REPORT.md/json`: 70% average, 6/15 covered, 4 gaps
2026-04-28 22:18 — Course Blueprints readiness UI shipped:
                   - Course Blueprints tab now shows weighted readiness per course and per module
                   - Each module displays lesson/concept/question/activity percentages beside Covered/Partial/Gap status
                   - Right-side tree metadata includes module status + readiness percentage
2026-04-28 22:35 — SVCollege mock exam shipped:
                   - Added `svcollege_fullstack` exam template with 55 questions and 90-minute timer
                   - Mock exam now loads the seeded bank before composing questions
                   - SVCollege results include module-level scoring breakdown beside question-kind scoring
                   - Course blueprint mock exam tags now expose `svcollege_fullstack`
2026-04-28 22:48 — SVCollege lesson inventory shipped:
                   - Added `SVCOLLEGE_LESSON_INVENTORY.md`
                   - Mapped existing lessons, partial modules and required new lesson IDs
                   - Defined per-new-lesson DoD for content, practice, tabs, mock exam and CI
2026-04-28 23:05 — HTML/CSS Foundations lesson shipped:
                   - Added `data/lesson_html_css_foundations.js` with 8 concepts and lesson quiz
                   - Added curated MC, Fill, Code Trace and Mini Build practice for the new lesson
                   - Wired lesson into loader, offline cache, quiz-key report, readiness report and SVCollege blueprint
                   - SVCollege HTML/CSS module moved from Partial to Covered; readiness now 70.7%, 7/15 covered
2026-04-28 23:25 — Tooling & Git lesson shipped:
                   - Added `data/lesson_tooling_git.js` with Git, repo, working tree, staging, commit, branch, PR, GitHub workflow, npm scripts, ESLint and Prettier
                   - Added curated MC, Fill, Code Trace and Mini Build practice for tooling workflow
                   - Wired lesson into loader, offline cache, quiz-key report, prerequisites, readiness report and SVCollege mock exam module
                   - SVCollege ES6/Git/ESLint/Prettier module moved from Partial to Covered; readiness now 71.3%, 8/15 covered
2026-04-28 23:40 — Course alignment scope corrected:
                   - `COURSE_BLUEPRINTS` now exposes only `svcollege_fullstack_ai` for the active portal
                   - John Bryce, Sela and generic bootcamp mappings moved to `DEFERRED_COURSE_PORTAL_BLUEPRINTS`
                   - Top tab label changed to `יישור SVCollege`; this portal remains a Full-Stack portal focused on SVCollege coverage
2026-04-28 23:55 — Forward plan upgraded:
                   - Added Learning Contract + prerequisite capsules for hard questions
                   - Added SVCollege Command Center, lesson source registry and real learner outcome loop
                   - Recorded that raw lesson assets now live under `lessons/`
2026-04-29 00:05 — Parallel session prompt board shipped:
                   - Added `SVCOLLEGE_PARALLEL_SESSION_PROMPTS.md`
                   - Includes exact timing, prompts, ownership, DoD, tests and final-report format for Sessions 0-8
                   - Marked P-1.9.4 done; Finish Line 1 now 20/73
2026-04-29 00:18 — Lesson source registry shipped:
                   - Added `lessons/manifest.json` for 36 raw lesson assets
                   - Added `npm run lessons:assets` root-asset guard and `tests/lesson-assets.test.js`
                   - Added source coverage to `SVCOLLEGE_LESSON_INVENTORY.md`; Finish Line 1 now 23/73
2026-04-29 00:26 — New lesson source links shipped:
                   - Added `sourceAssets`, `generatedSummaries` and `sourceCoverageNote` to the HTML/CSS and Tooling/Git bridge lessons
                   - Extended `tests/lesson-assets.test.js` to verify lesson-level source links against `lessons/manifest.json`
                   - Marked P-1.10.4 done; Finish Line 1 now 24/73
2026-04-29 00:34 — SVCollege Command Center report shipped:
                   - Added `scripts/report_svcollege_command_center.js`
                   - Added `SVCOLLEGE_COMMAND_CENTER.md/json` with readiness, red-first queue, feature gates, source assets and parallel sessions
                   - Added `npm run svcollege:command-center:*` and `tests/svcollege-command-center.test.js`
                   - Marked P-1.9.2 done; Finish Line 1 now 25/73
2026-04-29 00:42 — Command Center evidence matrix shipped:
                   - Added module-level evidence links for lesson files, question banks, activity banks, tests and browser-smoke ownership
                   - Locked the red-first release queue order in tests
                   - Marked P-1.9.3 + P-1.9.5 done; Finish Line 1 now 27/73
2026-04-28 latest — Limited parallel mode set:
                   - Full merge train paused by user instruction
                   - Only SQL/ORM and Museum sessions continue in parallel
                   - Current session restricted to non-SQL/non-museum governance, reports and quality gates
2026-04-28 latest — No-evidence gate shipped:
                   - Command Center now fails strict mode if any `covered` SVCollege module lacks lesson + practice + tab + test evidence
                   - Added tab evidence and dedicated regression coverage
                   - Marked P-1.9.6 done; Finish Line 1 now 28/73
2026-04-28 latest — Museum lineage diagrams shipped:
                   - Added lightweight inline SVG timeline diagrams for every programming-language lineage
                   - Reused the same diagrams in `אבני בסיס → מוזיאון` and the standalone `מוזיאון` top tab
                   - Added milestone detail grids without external media or new runtime dependency
2026-04-28 latest — SQL/ORM integrated into SVCollege Finish Line:
                   - Wired `lesson_sql_orm` into index, content loader, offline cache, readiness and command center evidence
                   - Database module moved from Partial to Covered: MongoDB/Mongoose + SQL/PostgreSQL/Prisma/Drizzle
                   - SQL practice now includes 18 MC, 10 Fill, 3 Trace, 3 Mini Build, 2 Bug Hunt and prerequisites
                   - SVCollege readiness now 72%, 9/15 covered, 6 release blockers
                   - Marked P-1.2.4 done; Finish Line 1 now 29/73
2026-04-28 latest — Auth/Security integrated into SVCollege Finish Line:
                   - Added `lesson_auth_security` for authentication, authorization, sessions, secure cookies, JWT, OAuth/provider auth and security boundaries
                   - Auth practice now includes 28 MC, 10 Fill, 3 Trace, 3 Mini Build, 3 Bug Hunt and prerequisites
                   - Auth module moved from Gap to Covered
                   - SVCollege readiness now 78.7%, 10/15 covered, 5 release blockers
                   - Marked P-1.2.5 done; Finish Line 1 now 30/73
2026-04-28 latest — Next.js integrated into SVCollege Finish Line:
                   - Added `lesson_nextjs` for App Router, routing, layouts/pages, server/client components, route handlers/API routes, server actions, SSR/SSG/ISR, metadata, SEO, image optimization and Vercel deploy
                   - Next.js practice now includes 28 MC, 10 Fill, 3 Trace, 3 Mini Build, 3 Bug Hunt and prerequisites
                   - Next.js module moved from Gap to Covered
                   - SVCollege readiness now 85.3%, 11/15 covered, 4 release blockers
                   - Marked P-1.2.6 done; Finish Line 1 now 31/73
2026-04-28 latest — Nest.js integrated into SVCollege Finish Line:
                   - Added `lesson_nestjs` for modules, controllers, providers/services, DI, decorators, DTO, validation pipe, guards, pipes, middleware, interceptors, exception filters, repository pattern and testing module
                   - Nest.js practice now includes 24 MC, 10 Fill, 3 Trace, 3 Mini Build, 3 Bug Hunt and prerequisites
                   - Nest.js module moved from Gap to Covered
                   - Fixed existing Auth prerequisite cycle between OAuth and provider auth
                   - SVCollege readiness now 92%, 12/15 covered, 3 release blockers
                   - Marked P-1.2.8 done; Finish Line 1 now 32/73
2026-04-28 latest — DevOps integrated into SVCollege Finish Line:
                   - Added `lesson_devops_deploy` for production readiness, env vars, Vercel deploy/preview, build commands, Docker/Dockerfile/image/container, Docker Compose services/volumes, health checks, CI/CD, smoke tests and release checklist
                   - DevOps practice now includes 24 MC, 10 Fill, 3 Trace, 3 Mini Build, 3 Bug Hunt and prerequisites
                   - DevOps module moved from Partial to Covered
                   - SVCollege readiness now 92.7%, 13/15 covered, 2 release blockers
                   - Marked P-1.2.7 done; Finish Line 1 now 33/73
```

---

## 🔍 AUDIT-FIX Tasks (from AUDIT_2026-04-28.md)

> Honest backlog of inflated/missing items found during audit.
> Each task closes a gap between claim and reality.

### Content gaps (close inflated counts)
- [V] AUDIT-FIX-1 — Add 8 more anti-patterns to reach 22 target (now 22)
- [V] AUDIT-FIX-2 — Add 12 more war stories to reach 30 target (now 31)
- [V] AUDIT-FIX-3 — Add 13 more Mini Builds to reach 21 target (now 21)
- [V] AUDIT-FIX-4 — Code Trace for lessons 11-20 + closures (50 new traces; total trace bank 85)
- [V] AUDIT-FIX-5 — Add option-feedback to top 50 most-used MCs (now 50)

### Verification debt
- [V] AUDIT-FIX-6 — Re-verify all "Verified in browser" claims with explicit tests
  - [V] per-card refresh (P1.1.2.3) — Report Weak updates Array card in place
  - [V] aria-labels rendered (P1.2.1.8) — Playwright accessibility snapshot shows names
  - [V] theme cycles (P1.2.4.4) — fixed floating-button overlap; auto → light → dark → auto verified

### Partial features → make complete
- [V] AUDIT-FIX-7 — Time Machine full review experience (not just history-jump button)

### Major features NOT DONE (12 Creative Methods + spec ideas)
- [V] AUDIT-FIX-8 — Concept Comic system (visual storytelling)
- [V] AUDIT-FIX-9 — Stage-Zero broken examples (broken-first-then-fix flow)
- [V] AUDIT-FIX-10 — 250 metaphors (5 × 50 core concepts)
- [V] AUDIT-FIX-11 — Concept-as-Place memory palace (SVG rooms)
- [V] AUDIT-FIX-12 — Problem-First Discovery (broken-app templates)
- [V] AUDIT-FIX-13 — 10 Animated Concept videos (offline SVG/CSS concept clips)
- [V] AUDIT-FIX-14 — Real-Object Visual Aids (50 local deterministic object aids)
- [V] AUDIT-FIX-15 — Bug Hunt Quests (5 quests × 5 bugs narrative)
- [V] AUDIT-FIX-16 — Themed Scenarios (5 scenarios × 30 concepts)
- [V] AUDIT-FIX-17 — Counterfactual examples (30 concepts)
- [V] AUDIT-FIX-18 — Streaks tracking + 🔥 widget
- [V] AUDIT-FIX-19 — 60-second wrap-up at lesson end
- [V] AUDIT-FIX-20 — Achievements + XP system (30/30 initial)
- [V] AUDIT-FIX-21 — Pair-Match drag-and-drop game
- [V] AUDIT-FIX-22 — Prerequisite Graph
- [V] AUDIT-FIX-23 — Pathways toggle (grandma/parent/technical)
- [V] AUDIT-FIX-24 — Gap Matrix dashboard tab
- [V] AUDIT-FIX-25 — Upgrade SM-2 → FSRS-4
- [V] AUDIT-FIX-26 — AI Tutor (demo mode + Supabase edge function skeleton)
- [~] AUDIT-FIX-27 — Cross-device Sync (export/import + Supabase progress table; auth/live sync pending)
- [~] AUDIT-FIX-28 — Vite migration (build/dev/preview working; full app.js module extraction pending)
- [~] AUDIT-FIX-29 — TypeScript migration (bootstrap + lib ports + core scoring module done; views pending)
- [V] AUDIT-FIX-30 — SRS Flashcards UI tab
- [V] AUDIT-FIX-31 — Concept Map graph visualization (offline-safe SVG graph)

**AUDIT-FIX Total: 28/31** — 3 partial; remaining major gaps: full app.js extraction + auth/live sync.

---

**Note:** המסמך מתעדכן בכל commit. ראה Phase X DoD לקריטריונים מדויקים לסיום phase.
