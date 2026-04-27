# LumenPortal — פרומפטים לשליחה ל-4 ה-sessions

> כל פרומפט הוא **self-contained** — סשן יכול להתחיל קר.
> העתק את ה-block המתאים ל-track ושלח כמו שהוא.

---

## 🅰️ Track A — Foundation (Session 1)

```
שלום! אתה Session 1 בעבודה מקבילית על LumenPortal — פורטל לימוד React/JS/TS בעברית.

🎯 המשימה שלך: Track A — Foundation/Plumbing.
פירוט מלא: COORDINATION.md (שורות "Track A").
תכנית-אב: PRODUCT_SPEC.md + MASTER_PLAN_V3.md + הפלן ב-/Users/tal/.claude/plans/jolly-tumbling-matsumoto.md.

📦 התחלה — Git workflow:
1. git clone https://github.com/talstilkol/sv-test.git
2. cd sv-test
3. git pull origin main
4. git checkout -b feature/track-a-foundation

🔨 המשימות שלך (בסדר ביצוע):
A1. Math.random → Seeded PRNG
   - צור lib/rng.js עם mulberry32 (mulberry32 hash function, ~10 שורות)
   - API: rng.next(), rng.int(n), rng.pick(arr), rng.shuffle(arr)
   - Seed: hash(userId+sessionStart+counter), userId נשמר ב-localStorage
   - החלף 16 מופעים ב-app.js (חפש "Math.random")
   - השאר את המופע ב-data/lesson21.js:1002 (תוכן לימודי על באג!)
   - החלף 3 מופעים ב-scripts/seed_questions.js
   - ולידציה: 2 רנדומים עם אותו seed → אותה תוצאה

A2. Bank Versioning + Change Log
   - הוסף ל-data/questions_bank.js header:
     _version: "2.0.0", _lastUpdate: "2026-04-27", _changelog: [...]
   - app.js: console.log גרסה ב-load
   - localStorage שמור bankVersion → אם שונה → prompt "🔄 רענון התקדמות"

A3. Build-time Hard-fail (CI)
   - הוסף --strict flag ל-scripts/validate_bank.js (warnings → errors)
   - צור .github/workflows/ci.yml שרץ "node scripts/validate_bank.js --strict" על כל PR
   - בדוק: PR עם boilerplate → CI אדום

A4. SRS Schema (FSRS-4 או SM-2)
   - צור lib/srs.js
   - הוסף ל-scores schema: srsState: {ease, interval, due, repetitions, lapses, lastReviewed}
   - migration: scores ישנים → צור srsState עם defaults
   - ב-applyAnswer(): אחרי תשובה → srs.update(state, correct, difficulty)
   - ב-pickWeightedConcept(): boost ×3 ל-due ≤ now
   - הוסף UI badge "🔁 חזרה מומלצת"

A5. 5 Mastery States
   - הוסף getMasteryState(score): new/learning/review/mastered/at-risk
   - 5 צבעים ב-CSS (גרי/כחול/צהוב/כתום/ירוק)
   - Knowledge Map: סנן לפי state (במקום level בלבד)

🚫 אסור לגעת בקבצים הבאים (סשנים אחרים עובדים עליהם):
- data/ai_development.js (Track B)
- data/react_blueprint.js (Track B)
- data/workbook_taskmanager.js (Track C)
- data/lesson_closures.js (Track C — חדש)
- data/lesson{01-10}.js, data/lesson{28-32}.js, data/lesson37.js (Track C)
- index.html (Track D)
- אזורי UI ב-app.js (Track D — אחרי שורה 2000)
- data/glossary.js (Track D — חדש)

✅ אזורים פתוחים לך:
- app.js — אזור הלוגיקה (שורות 1-1500): scoring, RNG, picking, applyAnswer
- scripts/validate_bank.js + scripts/seed_questions.js
- data/questions_bank.js — header בלבד
- lib/rng.js, lib/srs.js (חדשים)
- .github/workflows/

✓ Definition of Done:
- grep "Math.random" --include="*.js" → רק data/lesson21.js (תוכן)
- node scripts/validate_bank.js --strict → ✅ עובר
- CI עובר על main
- משתמש שעבר רמה ביום 1 → ביום 4 רואה badge "🔁 חזרה מומלצת"
- 5 mastery states מוצגים ב-Knowledge Map

📤 סיום:
git add . && git commit -m "Track A: Foundation (RNG, versioning, CI, SRS, mastery states)"
git push -u origin feature/track-a-foundation
gh pr create --title "Track A: Foundation — RNG/CI/SRS/Versioning" \
  --body "Closes A1-A5. See COORDINATION.md for context."

⏱️ משך משוער: 5 ימים.
🎯 אתה ראשון להתמזג — ה-tracks האחרים תלויים בעבודתך.
```

---

## 🅱️ Track B — Content #1 (Session 2)

```
שלום! אתה Session 2 בעבודה מקבילית על LumenPortal — פורטל לימוד React/JS/TS בעברית.

🎯 המשימה שלך: Track B — Content Cleanup #1 (AI + React Blueprint + QA).
פירוט מלא: COORDINATION.md (שורות "Track B").
תכנית-אב: PRODUCT_SPEC.md + MASTER_PLAN_V3.md + הפלן ב-/Users/tal/.claude/plans/jolly-tumbling-matsumoto.md.

📦 התחלה — Git workflow:
1. git clone https://github.com/talstilkol/sv-test.git
2. cd sv-test
3. git pull origin main
4. git checkout -b feature/track-b-content-ai-blueprint

📚 הקשר:
המערכת מציגה היום 34 concepts כ-boilerplate ("בפשטות, X עוזר להבין את הרעיון..."). אתה מטפל ב-22 מתוכם.
ראה את data/lesson22.js או data/lesson24.js כמודל איכות לתוכן ראוי.

🔨 המשימות שלך (בסדר ביצוע):
B1. תיקון data/ai_development.js (12 concepts)
   12 הקונספטים: AI, Cursor, Windsurf, Claude Code, ChatGPT, Copilot,
                 Prompt Engineering, AI Pair Programming, AI Code Review,
                 AI Limitations, Hallucinations, Context Window
   לכל concept:
   - difficulty: 1-10
   - 6 levels (grandma → professor) — מותאמים אישית, לא boilerplate
   - illustration (ASCII או טקסט)
   - codeExample אמיתי (לא placeholder)
   - codeExplanation
   - אם difficulty ≥ 6: extras (moreExamples, pitfalls, practiceQuestions)
   טיפ: רוב התלמידים מכירים AI tools — צריך עומק על *איך להשתמש נכון*.

B2. תיקון data/react_blueprint.js (10 concepts)
   10 הקונספטים: Component Architecture, State Management, Data Flow,
                 Composition vs Inheritance, Container vs Presentational,
                 Lifting State Up, Code Splitting, Performance Optimization,
                 Error Boundaries, Testing Strategies
   טיפ: אלה מושגים מתקדמים → difficulty 6-9. extras חובה לכולם.

B3. תיקון 11 fill questions עם ambiguity ב-data/questions_bank.js
   ה-IDs (חפש ב-validate output): fill_exp_002, fill_react_001, fill_hook_001,
        fill_hook_002, fill_router_001, fill_ts_001, fill_arr_009,
        fill_async_004, fill_exp_003, fill_mongo_002, ועוד אחד
   לכל אחד:
   - בדוק איזו מילה מופיעה כפול בקוד
   - שנה את code או answer כך שהתשובה תופיע בדיוק פעם אחת

B4. Concept Enrichment ל-22 הקונספטים
   ב-data/concept_enrichment.js הוסף ערכים:
   - "lesson_ai_development::{Name}": { deepDive: {purpose, problem, withoutIt, useWhen}, analogies: {grandma...professor} }
   - אותו דבר ל-react_blueprint
   - לפחות 5 metaphors שונים לכל concept (תוכן עתידי)

🚫 אסור לגעת בקבצים הבאים:
- app.js (Track A + D)
- data/workbook_taskmanager.js (Track C)
- data/lesson{01-10,28-32,37}.js (Track C)
- data/lesson_closures.js (Track C — חדש)
- index.html, style.css (Track D)
- scripts/, lib/ (Track A)
- ב-data/concept_enrichment.js — רק הוסף סקציות חדשות. אל תיגע בסקציות lesson_22, lesson_24, וכו׳.
- ב-data/questions_bank.js — רק תקן 11 fill IDs ו-לא תיגע ב-mc/trace.

✓ Definition of Done:
- node scripts/validate_bank.js → 0 boilerplate ב-ai_development + react_blueprint
- כל 22 concepts עם difficulty 1-10
- 0 ambiguity warnings על fill_*
- 22 entries חדשים ב-concept_enrichment.js
- בדיקה ידנית: כל lesson → תוכן אמיתי

📤 סיום:
git add . && git commit -m "Track B: Fix AI + React Blueprint boilerplate + 11 fill ambiguity"
git push -u origin feature/track-b-content-ai-blueprint
gh pr create --title "Track B: Content #1 — AI/Blueprint/Fill QA" \
  --body "Closes B1-B4. 22 concepts content + 11 fill fixes."

⏱️ משך משוער: 4 ימים.
🎯 הקפד: לאחר Track A יתמזג, עשה git pull origin main לפני push (יש שינויי schema).
```

---

## ©️ Track C — Content #2 (Session 3)

```
שלום! אתה Session 3 בעבודה מקבילית על LumenPortal — פורטל לימוד React/JS/TS בעברית.

🎯 המשימה שלך: Track C — Content Cleanup #2 (Workbook + Closures + Difficulty).
פירוט מלא: COORDINATION.md (שורות "Track C").
תכנית-אב: PRODUCT_SPEC.md + MASTER_PLAN_V3.md + הפלן ב-/Users/tal/.claude/plans/jolly-tumbling-matsumoto.md.

📦 התחלה — Git workflow:
1. git clone https://github.com/talstilkol/sv-test.git
2. cd sv-test
3. git pull origin main
4. git checkout -b feature/track-c-content-workbook-closures

📚 הקשר:
- 12 concepts ב-workbook_taskmanager הם boilerplate.
- closures חסר לחלוטין מהמערכת — הגורם השכיח ביותר לבאגים ב-React!
- 281 concepts (ב-lessons 1-10, 28-32, 37) חסרים שדה difficulty.

🔨 המשימות שלך (בסדר ביצוע):
C1. תיקון data/workbook_taskmanager.js (12 concepts)
   טיפ: זה workbook = פרויקט מעשי של Task Manager.
   כל concept צריך להתקשר לבניית האפליקציה.
   מודל: data/lesson22.js (כך נראה תוכן איכותי).
   לכל concept: difficulty + 6 levels אמיתיים + codeExample + codeExplanation.

C2. Lesson Closures חדש — data/lesson_closures.js
   8 concepts: scope chain, lexical scope, closure, closure variables,
              stale closure, closure in event handlers,
              closure in useEffect, closure in setTimeout
   - difficulty 5-9
   - extras חובה ל-closure, stale closure, closure in useEffect
   - 6+ quiz questions
   - הוסף ל-content-loader.js את LESSON_CLOSURES
   - הוסף <script src="data/lesson_closures.js"></script> ל-index.html
     (שורה 1 בלבד — לא לשנות שום דבר אחר ב-index.html!)

C3. Difficulty ל-281 concepts חסרים
   הקבצים: data/lesson{01-10}.js, data/lesson{28-32}.js, data/lesson37.js
   רק הוסף "difficulty: N" לכל concept (אל תשנה תוכן!)
   כללי אצבע:
   - HTML/CSS basics (lessons 1-3): 2-4
   - ES6 features (lesson 6): 4-6
   - Authentication (lesson 10): 5-7
   - Forms+RHF (lesson 28): 5-7
   - Vercel/Docker (lesson 29): 6-8
   - Next.js basics (31-32): 6-8
   - AI Engineering (37): 7-9
   אופציונלי: כתוב script scripts/auto-rate-difficulty.js שמשתמש ב-Claude API.

C4. Concept Enrichment ל-Closures + 30 core concepts ב-lessons 1-10
   ב-data/concept_enrichment.js:
   - 8 ערכים עבור lesson_closures (deepDive + 6 analogies)
   - 30 ערכים עבור core concepts ב-lessons 1-10 (HTML, CSS, ES6, Auth)

🚫 אסור לגעת בקבצים הבאים:
- app.js (Track A + D)
- data/ai_development.js, data/react_blueprint.js (Track B)
- data/lesson{11-27}.js (כבר נכתבו, לא לגעת!)
- index.html — רק שורה אחת לטעינת lesson_closures
- style.css (Track D)
- scripts/, lib/ (Track A)
- ב-concept_enrichment.js — אל תיגע בסקציות lesson_11 עד lesson_27.
  הוסף **רק** סקציות חדשות (lesson_closures, lesson_01..10, וכו׳).

✓ Definition of Done:
- node scripts/validate_bank.js → 0 boilerplate ב-workbook_taskmanager
- 0 missing difficulty ב-281 concepts
- Lesson "Closures" מופיע ב-sidebar עם 8 concepts
- 38+ entries חדשים ב-concept_enrichment.js
- בדיקה ידנית: lesson_closures → כל concept עם תוכן אמיתי

📤 סיום:
git add . && git commit -m "Track C: Workbook fix + Closures lesson + 281 difficulty"
git push -u origin feature/track-c-content-workbook-closures
gh pr create --title "Track C: Content #2 — Workbook/Closures/Difficulty" \
  --body "Closes C1-C4. New closures lesson + 12 boilerplate fix + 281 difficulty + 38 enrichment entries."

⏱️ משך משוער: 5 ימים.
🎯 הקפד: לאחר Track A יתמזג, עשה git pull origin main לפני push.
```

---

## 🅳️ Track D — UX Quick Wins (Session 4)

```
שלום! אתה Session 4 בעבודה מקבילית על LumenPortal — פורטל לימוד React/JS/TS בעברית.

🎯 המשימה שלך: Track D — UX Quick Wins (TTS + Glossary + Pocket Card + Reflection).
פירוט מלא: COORDINATION.md (שורות "Track D").
תכנית-אב: PRODUCT_SPEC.md + MASTER_PLAN_V3.md + הפלן ב-/Users/tal/.claude/plans/jolly-tumbling-matsumoto.md.

📦 התחלה — Git workflow:
1. git clone https://github.com/talstilkol/sv-test.git
2. cd sv-test
3. git pull origin main
4. git checkout -b feature/track-d-ux-quickwins

📚 הקשר:
המשימה: שיפורי נגישות ומטא-קוגניציה. כולם פיצ'רים קטנים אבל באימפקט גבוה.
המוטו: "סבתא צריכה להבין". כל פיצ'ר צריך להוריד חיכוך.

🔨 המשימות שלך (בסדר ביצוע):
D1. Read Aloud TTS Button (חצי יום)
   - כפתור 🔊 ליד כל .concept-explanation ו-.code-explanation
   - Web Speech API: speechSynthesis.speak(new SpeechSynthesisUtterance(text))
   - language='he-IL', rate=0.9
   - Toggle: לחץ → דבר. לחץ שוב → עצור.
   - Visual indicator שמדבר (animation)

D2. Glossary Hebrew/English (יום)
   - צור data/glossary.js עם 50-100 entries:
     {Hook: {he: "חיבור", definition: "..."}, useState: {...}, ...}
   - Script ב-app.js: עבור על כל טקסט → underline + tooltip לכל term
   - hover → tooltip קצר. click → modal מורחב.
   - הוסף <script src="data/glossary.js"></script> ל-index.html (1 שורה).

D3. Pocket Concept Card (יום)
   - כפתור 📌 על כל concept card
   - localStorage: lumenportal:pocket:v1 (array of conceptKeys)
   - Floating panel בצד תחתון (collapsible):
     * Collapsed: badge "📌 N בכיס"
     * Expanded: רשימה, click → scroll to concept
   - אם בעתיד יש Mock Exam mode → disabled

D4. Daily Reflection Prompt (חצי יום)
   - Trigger: יום שישי + אחרי 18:00 + לא הוצג השבוע
   - Modal עם 3 שאלות:
     1. "באיזה מושג נתקעת?" (textarea)
     2. "כמה שעות למדת?" (number)
     3. "מה תרצה ללמוד בשבוע הבא?" (textarea)
   - שמור ב-localStorage: lumenportal:reflections:v1
   - View "📅 ההיסטוריה שלי" עם רשימה

D5. Dyslexia Font + Reduced Motion (חצי יום)
   - Settings page (או modal פשוט עם כפתור ⚙️ בכותרת)
   - Toggle 1: גופן OpenDyslexic (CDN: https://fonts.cdnfonts.com/css/opendyslexic)
   - Toggle 2: .reduced-motion class — * { animation: none; transition: none; }
   - שמור ב-localStorage, טען ב-load

D6. 60-Second Wrap-Up Modal (חצי יום)
   - Trigger: סיום lesson (כל concepts ברמה ≥4 או V'd)
   - Modal עם 3 שדות:
     1. "סכם את השיעור ב-3 שורות" (textarea)
     2. "כמה אתה בטוח?" (slider 0-100%)
     3. "מה היה הכי קשה?" (textarea)
   - שמור ב-localStorage עם תאריך
   - אנליטיקה: confidence over time

🚫 אסור לגעת בקבצים הבאים:
- app.js — אזור הלוגיקה (שורות 1-1500). אתה רק עורך אזור UI (שורות 2000+).
- כל קבצי data/lesson*.js (Tracks B + C)
- data/ai_development.js, data/react_blueprint.js, data/workbook_taskmanager.js (Tracks B + C)
- scripts/, lib/ (Track A)
- ב-style.css — **רק append בסוף**. אסור לערוך classes קיימות!
- ב-index.html — רק הוסף 2 שורות (script tags ל-glossary.js). לא לשנות structure.
- ב-data/concept_enrichment.js — לא לגעת בכלל!

✅ קבצים שאתה יוצר:
- data/glossary.js (חדש)
- אזור חדש בסוף style.css (CSS לpocket panel, glossary tooltip, וכו׳)

✓ Definition of Done:
- 🔊 על concept → קולו של TTS עברי
- "useState" בטקסט → underline + tooltip בעברית
- 📌 שמור 3 concepts → panel תחתון מציג אותם
- שישי 18:00 → modal reflection
- Toggle dyslexia ON → גופן משתנה
- סיום lesson → wrap-up modal
- node scripts/validate_bank.js עובר (לא מושפע)

📤 סיום:
git add . && git commit -m "Track D: UX quick wins (TTS, glossary, pocket, reflection, a11y)"
git push -u origin feature/track-d-ux-quickwins
gh pr create --title "Track D: UX Quick Wins" \
  --body "Closes D1-D6. 6 UX features for accessibility & metacognition."

⏱️ משך משוער: 4 ימים.
🎯 הקפד: ה-track שלך מתמזג אחרון. עשה git pull origin main לפני push (לאחר A+B+C מוזגו).
```

---

## 🔄 הפרומפט המאוחד — לסשן Coordinator (אופציונלי)

> אם יש סשן 5 מסונכרן (אני, או אחר) שעוקב אחרי 4 ה-tracks:

```
שלום! אתה Coordinator של 4 sessions שעובדים במקביל על LumenPortal.

🎯 המשימה שלך: לעקוב אחרי 4 PRs, לעזור עם conflicts, לאשר merges.

📦 התחלה:
1. git clone https://github.com/talstilkol/sv-test.git
2. עקוב אחרי PRs פתוחים: gh pr list
3. סדר merge מומלץ:
   - Track A ראשון (תשתית — אחרים תלויים)
   - Track B + C במקביל (לא חופפים)
   - Track D אחרון (אינטגרציה)

🔨 המשימות שלך:
1. בדוק כל PR לפי ה-Definition of Done שלו (COORDINATION.md)
2. רוץ node scripts/validate_bank.js --strict לפני merge
3. אם conflict בין tracks — דבר עם הרלוונטיים, החלט מי ממזג ראשון
4. אחרי merge — עדכן את STATUS section ב-COORDINATION.md
5. עזור עם blockers ב-PR comments

⏱️ זמן: ~30 דקות/יום, 2 שבועות
```

---

## 📋 איך להשתמש בפרומפטים

1. **העתק** את ה-block הרלוונטי ל-Track (כולל ה-```...```)
2. **הדבק** ל-session החדש (Claude Code חדש, ChatGPT, או כל AI אחר)
3. ה-AI יבצע את ה-Track אוטומטית

**טיפ:** אם אתה רוצה שה-AI יקבל את COORDINATION.md המלא בנוסף, הוסף בסוף הפרומפט:
```
לפני שמתחיל: קרא את COORDINATION.md לפרטים מלאים, ואת PRODUCT_SPEC.md ו-MASTER_PLAN_V3.md לקונטקסט.
```
