# LumenPortal — פרומפטים ל-Phase 2 (4 sessions parallel)

> בסיס: PR #8 ו-`integration/a-b-c-merge` ממוזגים ל-main.
> דרישה לכל session: `git pull origin main` לפני התחלה.

---

## 🅔 Track E — Mock Exam Mode (Session 2)

```
שלום! Track E — Mock Exam Mode (P1.5.1).
Repo: https://github.com/talstilkol/sv-test
Branch: feature/track-e-mock-exam
מקור פרטים: SPEC_AND_MASTER_PLAN.md סעיף 4.4 + 11.5.1

📦 Git:
git clone https://github.com/talstilkol/sv-test.git || git pull
git checkout -b feature/track-e-mock-exam

🎯 משימות:
1. צור lib/exam-engine.js:
   - Class MockExam { questions, startTime, duration, answers }
   - composeQuestions(template) - bijective sampling: 12 MC + 8 Fill + 6 Trace + 3 Bug + 1 Build
     מ-conceptKey של lessons 21-27, רמות 4-6
     deterministic via RNG.create(seed) (משתמש ב-window.RNG)
   - isTimeUp(), submit() → { score, breakdown, weakConcepts }
   - history (localStorage 'lumenportal:examHistory:v1')

2. צור data/exam_templates.js:
   - 5 templates: 'svcollege_react', 'john_bryce_fullstack', 'sela_react',
                  'general_react', 'practice_short_15min'
   - כל אחת עם distribution שונה (counts לכל סוג)
   - מקור: SPEC_AND_MASTER_PLAN.md §11.5.1

3. UI ב-app.js:
   - Tab חדש "🎯 מבחן מדומה" ב-index.html top-tabs-bar (אחרי Code Trace)
   - openMockExam() → exam-view במידול הקיים
   - Settings screen (בחירת template)
   - Question runner: timer countdown, no-feedback, lock-down (no Pocket, no AI)
   - Result screen: ציון, breakdown לפי סוג, weak concepts highlight
   - History view: רשימת mocks קודמים עם trend

4. CSS ב-style.css (append בלבד):
   - .exam-mode .timer (large, red when <5min)
   - .exam-question-progress (1/30)
   - .exam-result-card

🚫 אסור לגעת:
- data/lesson*.js
- lib/rng.js, lib/srs.js, lib/code-runner.js
- אזורי app.js שאינם קשורים ל-mock exam

✓ DoD:
- node scripts/validate_bank.js --strict עובר
- npm test (38 tests) עובר
- Tab "🎯 מבחן מדומה" מופיע
- ניתן לקחת mock + לראות תוצאה
- History נשמר ב-localStorage

📤 git push -u origin feature/track-e-mock-exam
gh pr create --title "Track E: Mock Exam Mode"
```

---

## 🅕 Track F — Code Traces Expansion (Session 3)

```
שלום! Track F — Code Traces (P1.4.2).
Repo: https://github.com/talstilkol/sv-test
Branch: feature/track-f-traces
מקור פרטים: data/questions_trace.js (קיים, 35 traces ל-lessons 21-27)

🎯 משימות:
1. לכל lesson ב-{11, 12, 13, 15, 16, 17, 18, 19, 20} — סה"כ 9 שיעורים (lesson 14 לא קיים):
   - 5 trace questions לכל אחד (סה"כ 9 × 5 = 45)
   - conceptKey: בדיוק `lesson_<id>::<conceptName>` כפי שמופיע בקובץ data/lesson{N}.js
   - בחר 5 concepts מגוונים לכל lesson — עדיפות difficulty 4-6
   - level 4-6 (לא קל מדי, לא מתקדם מדי)
   - IDs בפורמט `trace_<lesson>_<NN>` (למשל trace_11_01..trace_11_05)
   - מבנה: { id, conceptKey, level, title, code, steps[{line, prompt, answer, hint, acceptable[]}], explanation }
   - append בסוף ה-array QUESTIONS_TRACE עם section headers לכל lesson (כמו lessons 21-27 הקיימים)

2. 5 traces ל-lesson_closures:
   - closure execution flow
   - stale closure (קריטי!)
   - closure in setTimeout
   - closure in useEffect
   - lexical scope chain

3. ולידציה:
   - node scripts/validate_bank.js --strict עובר
   - לכל trace: code שלמה (לא רק שורה אחת), 3-5 steps, answers ייחודיים

📂 קובץ יחיד: data/questions_trace.js

🚫 אסור לגעת:
- שום קובץ אחר
- אל תיצור קובץ חדש

✓ DoD:
- 50 traces חדשים ב-questions_trace.js (45 בlessons + 5 closures)
- בכל lesson מ-{11,12,13,15,16,17,18,19,20} יש 5 traces
- 5 traces חדשים ל-lesson_closures
- validate_bank --strict עובר

📤 git push -u origin feature/track-f-traces
gh pr create --title "Track F: 50 new code traces (lessons 11-20 + closures)"
```

---

## 🅖 Track G — War Stories + Mental Model Animator (Session 4)

```
שלום! Track G — Sprint 2 Creative Methods.
Repo: https://github.com/talstilkol/sv-test
Branch: feature/track-g-sprint2
מקור פרטים: SPEC_AND_MASTER_PLAN.md §4.15.1 + §4.15.6

🎯 משימות:

A. data/war_stories.js (חדש):
   - 8 hard concepts × 3-5 stories = ~30 incidents
   - schema: { title, context, bug, diagnosis, fix, lesson, severity, hours }
   - מקור: data/lesson*.js — שדה concept.junior (יש 1 פר concept) — להרחיב ל-3-5
   - הקונספטים: re-render, array reference, object reference, passing function as prop,
                useEffect, dependency array, infinite loop, cleanup

B. data/animations.js (חדש):
   - 5-6 hard concepts: useEffect, re-render, dependency array, infinite loop, stale closure, useState batching
   - schema: { frames: [{ phase, state, dom, log, note }] }
   - 4-6 frames לכל animation

C. content-loader.js (תוסף):
   - הוסף merge עבור WAR_STORIES → c.warStories
   - הוסף merge עבור ANIMATIONS → c.animation

D. app.js (תוספי UI):
   - renderWarStoriesPanel(concept) — section "📚 סיפורי שטח" עם cards (severity P0/P1)
   - renderAnimatorPanel(concept) — section "🎬 הדמיה חיה" עם stepper Next/Prev/Auto

E. style.css (append):
   - .war-story-card, .ws-severity-p0/.p1
   - .animator-frame, .animator-stepper, .animator-controls
   - .runner-status / .runner-error reuse OK

F. index.html:
   - <script src="data/war_stories.js"></script>
   - <script src="data/animations.js"></script>
   - לפני content-loader.js

🚫 אסור לגעת:
- data/lesson*.js
- lib/
- אזורי app.js של logic/scoring/RNG/SRS

✓ DoD:
- 30+ war stories ב-data/war_stories.js
- 5-6 animations ב-data/animations.js
- בקונספט useEffect — מופיע "📚 סיפורי שטח" + "🎬 הדמיה חיה"
- npm test עובר
- validate_bank --strict עובר

📤 gh pr create --title "Track G: Sprint 2 — War Stories + Animator"
```

---

## 🅗 Track H — Side-by-Side + What-If (Session 5)

```
שלום! Track H — Sprint 3 Comparative Learning.
Repo: https://github.com/talstilkol/sv-test
Branch: feature/track-h-sprint3
מקור פרטים: SPEC_AND_MASTER_PLAN.md §4.15.3 + §4.15.7

🎯 משימות:

A. data/comparisons.js (חדש):
   - 8-10 השוואות ליבה:
     useState_vs_useReducer, useMemo_vs_useCallback,
     props_vs_Context, map_vs_filter_vs_reduce,
     async_await_vs_Promise_then, var_let_const,
     equality_double_vs_triple, function_vs_arrow,
     class_vs_function_components, REST_vs_GraphQL
   - schema:
     {
       a: { name, icon },
       b: { name, icon },
       rows: [{ dim, a, b }]
     }

B. data/what_if.js (חדש):
   - 5-6 concepts: useEffect (deps), useState (functional vs value),
                   array.push vs spread, React.memo with/without useCallback, etc.
   - schema: { code, knobs: [{name, options[]}], outcomes: { [option]: outcome } }

C. app.js (תוספי UI):
   - Tab/section חדש: "⚖️ השוואות" — table responsive
   - renderWhatIfSimulator(concept) — toggle buttons + outcome display

D. CSS:
   - .comparison-table 2-col responsive
   - .whatif-knob .whatif-outcome

🚫 אסור לגעת:
- data/lesson*.js
- lib/
- Tracks E/F/G files

✓ DoD:
- 8-10 comparisons + 5-6 what-ifs
- Tab "⚖️ השוואות" עובד
- 1 what-if על useEffect דמו אינטראקטיבי
- כל הtests עוברים

📤 gh pr create --title "Track H: Sprint 3 — Comparator + What-If"
```

---

## ⚙️ סדר merge מומלץ

1. **Track F** (Code Traces — תוכן בלבד, אפס conflicts) — מתמזג ראשון
2. **Track E** (Mock Exam — Tab חדש, אזור app.js נפרד) — שני
3. **Track G** (Sprint 2 — sections חדשים בכרטיס concept) — שלישי
4. **Track H** (Sprint 3 — Tab + sections חדשים) — רביעי

**זמן צפוי לסיום כל ה-4:** 3-4 ימים אם רצים במקביל.
