# LumenPortal — מסמך איפיון מלא + Master Plan לביצוע

> תאריך: 2026-04-27 · גרסה: 5.0 · סטטוס: מסמך פעיל
>
> מסמך זה מאחד ומחליף את: PRODUCT_SPEC.md, MASTER_PLAN.md, MASTER_PLAN_V2.md, MASTER_PLAN_V3.md, COORDINATION.md.
> מבוסס על: כל הסבבים של דיון, AUDITs, COMPETITIVE_ANALYSIS, ועבודת Tracks A-D.

---

# 📑 תוכן עניינים

**חלק I — איפיון מוצר (Product Specification)**
1. חזון ועקרונות
2. קהל יעד (Personas)
3. הצעת ערך מובדלת
4. דרישות פונקציונליות (Functional Requirements)
5. דרישות לא-פונקציונליות (NFR)
6. מודל נתונים (Data Model)
7. עקרונות טכנולוגיים וכללי ברזל
8. KPIs ומדדי הצלחה
9. סיכוני מוצר ומיטיגציה

**חלק II — תוכנית-אב לביצוע (Master Plan)**
10. סטטוס נוכחי (Phase 0)
11. Phase 1 — תשתית קריטית (5 שבועות)
12. Phase 2 — מוצר ליבה לימודי (5 שבועות)
13. Phase 3 — אינטליגנציה + סנכרון (6 שבועות)
14. Phase 4 — קנה מידה + קהילה (8+ שבועות)
15. תהליכי עבודה (Work Cadence)
16. תכנית בדיקות (QA Plan)
17. Definition of Done לכל שלב
18. נספח: כללי תיאום בין sessions

---

# חלק I — איפיון מוצר

## 1. חזון ועקרונות

### 1.1 חזון

> **"להפוך את LumenPortal לפלטפורמת הלמידה האפקטיבית, המהנה והמבוססת-מדעית ביותר ללימוד פיתוח web בעברית — עד שתלמיד שמסיים את המסלול יהיה מוכן לעבוד בכל חברת hi-tech בישראל."**

המבחן הסופי של ההצלחה: **"האם סבתא תוכל להסביר ב-30 שניות מה זה useState אחרי 5 דקות בLumenPortal?"**

### 1.2 שבעת העקרונות המנחים

1. **מדע למידה ראשון** — כל החלטה תכנונית מבוססת על מחקר חינוכי (Spaced Repetition, Retrieval Practice, Interleaving, Deliberate Practice).
2. **קוד מעל הכל** — תלמיד לא יכול לעבור שיעור בלי לקרוא, להריץ, לתקן, ולכתוב קוד אמיתי.
3. **התאמה אישית מלאה** — כל תלמיד מקבל מסלול ייחודי שמתואם לרמתו, לקצבו, ולחולשותיו.
4. **עברית first** — לא תרגום, אלא חוויה ילידית עם RTL, אנלוגיות ישראליות, ומיפוי לשוק התעסוקה הישראלי.
5. **קהילה כמכפיל** — תלמידים לומדים מתלמידים, מורים מקבלים נתונים, מצטיינים מנחים מתחילים.
6. **דטרמיניזם ויציבות** — אפס Math.random לא-דטרמיניסטי, אפס נתונים מומצאים, אפס באגי-רנדום בלמידה.
7. **Iteration על Iteration** — פיצ'ר נחשב "סוגר" רק כשתלמיד אמיתי השתמש בו ולא דיווח על באג, *ובאותה הזדמנות* — חזר.

### 1.3 קווי גבול (Non-Goals)

- ❌ VR/AR — לא רלוונטי ל-coding education.
- ❌ שיעורי וידאו ארוכים (>20 דקות) — לא הפורמט שלנו.
- ❌ תמיכה ב-Python/Java/C# — focus על JS/TS/React לפחות שנה ראשונה.
- ❌ DevOps/Cloud certifications — אולי בעתיד.
- ❌ IDE generic — אנחנו לימוד, לא כלי פיתוח.

---

## 2. קהל יעד (Personas)

### 2.1 — שני, סטודנטית סוף שנה ב'
- **גיל:** 23 · **רקע:** Bootcamp 6 חודשים · **שעות לימוד:** 1.5/יום, 5 ימים
- **מטרה:** ציון 100 במבחן הסיום, ראיון ב-Junior Frontend
- **כאב:** מבחני סיום עם קוד שלא נחשפה אליו. שכחה של useState אחרי שעברה ל-useEffect

### 2.2 — אבי, מהנדס במעבר
- **גיל:** 35 · **רקע:** 8 שנים backend Java → frontend · **שעות:** 2-3/ערב, 6 ימים
- **מטרה:** פורטפוליו + ראיון ב-3 חודשים
- **כאב:** Udemy שטחי, אין מי לשאול בעברית, רוצה תרגול אמיתי

### 2.3 — מאיה, מורה בקורס
- **גיל:** 40 · **רקע:** מרצה ב-svcollege/john-bryce/Sela
- **מטרה:** העברת חומר אחיד לכיתה של 25, זיהוי תלמידים בסיכון
- **כאב:** חוסר במשוב מצרפי, הכנת תרגילים לוקחת שעות

### 2.4 — רון, ברנש 14
- **גיל:** 14 · **רקע:** Python בבית-ספר → רוצה React
- **מטרה:** לבנות אתר/אפליקציה
- **כאב:** אנגלית חלשה, אתרי לימוד גדולים מבלבלים

### 2.5 — ה"סבתא" (פרסונת המבחן)
- **גיל:** 65+ · **רקע:** לא טכני, אבל סקרנית
- **מטרה:** להבין מה הנכדה לומדת
- **כאב:** מונחים טכניים, אין לה רקע
- **תפקיד:** האדם שאם הוא יכול להבין שיעור — הוא נגיש לכולם

---

## 3. הצעת ערך מובדלת

### 3.1 השוואת מתחרים (ציון 1-10)

| ממד | LumenPortal יעד | Anki | Codecademy | Brilliant | Duolingo | freeCodeCamp |
|---|:-:|:-:|:-:|:-:|:-:|:-:|
| תוכן עומק | 9 | 5 | 8 | 9 | 7 | 9 |
| גיוון שאלות | 9 | 4 | 8 | 9 | 9 | 8 |
| למידה אדפטיבית | 9 | 6 | 7 | 8 | 9 | 6 |
| Spaced Repetition | 9 | 10 | 4 | 7 | 8 | 3 |
| Code editor/REPL | 9 | 0 | 10 | 4 | 0 | 9 |
| Code execution | 9 | 0 | 10 | 6 | 0 | 9 |
| Bug-hunt | 8 | 0 | 6 | 5 | 0 | 7 |
| Code-trace | 9 | 0 | 6 | 8 | 0 | 5 |
| Mock exam | 9 | 5 | 6 | 4 | 5 | 7 |
| Per-distractor feedback | 9 | 4 | 8 | 9 | 7 | 5 |
| Gamification | 8 | 4 | 7 | 8 | 10 | 6 |
| Hebrew RTL | 10 | 6 | 0 | 0 | 8 | 1 |
| התאמה למבחן ישראלי | 10 | 7 | 5 | 4 | 0 | 5 |

**הואכלים שיהיו ייחודיים ל-LumenPortal (לא קיימים אצל אף אחד):**
1. שכבת פרפר — 3 גרסאות מקבילות (סבתא/הורה/טכני) לאותו תוכן
2. אנלוגיות ישראליות (כדורגל, צבא, אוכל, זמנים יהודיים)
3. התאמה למבחני svcollege/john-bryce ספציפית
4. AI Coach בעברית עם prompt caching
5. Concept-as-Place (memory palace)
6. Bug Hunt Quests עם narrative

---

## 4. דרישות פונקציונליות

### 4.1 Adaptive Learning Engine

**4.1.1 רמות-מושג (1-7)**
- מנגנון 7 רמות: 👵 גרנמה → 🧒 ילד → 🪖 חייל → 🎓 סטודנט → 💻 ג'וניור → 🔬 פרופ׳ → 🏆 מאסטר
- קידום רמה רק בהצלחה ב-MC + Fill באותה רמה
- שגיאה לא מורידה רמה — רק מאריכה את הנתיב
- מוצג: רמה אישית למשתמש לכל מושג

**4.1.2 ניקוד קושי (1-10) פר מושג**
- difficulty: 1-10 חובה לכל מושג
- 1-3: קל (כפתור V זמין אחרי 1-2 תשובות נכונות)
- 4-6: בינוני (V אחרי 3 נכונות)
- 7: קשה (V אחרי 5 נכונות)
- 8-10: מאוד קשה (V לעולם לא זמין — חובה לעבור 7 רמות)

**4.1.3 5 Mastery States** (גזורים)
- `new` — לא נראה אף פעם (אפור)
- `learning` — רמה ≤3 (כחול)
- `review` — רמה 4-5 (צהוב)
- `mastered` — רמה 6-7 (ירוק)
- `at-risk` — רמה ≥6 + SRS due overdue (כתום)

**4.1.4 Spaced Repetition Algorithm (FSRS-4 / SM-2)**
- שדה `srsState`: { ease, interval, due, repetitions, lapses, lastReviewed }
- אחרי כל תשובה: srs.update(state, correct, difficulty)
- Trainer pickConcept מעדיף `srsState.due ≤ now` (boost ×3)
- Migration: scores ישנים מקבלים srsState עם defaults

**4.1.5 Prerequisite Graph**
- שדה `prerequisites: ['lesson_X::Y']` בכל מושג
- אזהרה למשתמש שמנסה להיכנס למושג בלי שליטה ב-prereq
- Knowledge map מציג את ה-graph ויזואלית

**4.1.6 V Button + Report Weak**
- V button: סימון "ידוע" אחרי N תשובות נכונות (N תלוי ב-difficulty)
- Report Weak: דיווח על חולשה → boost ×3 ב-trainer + פתיחת extras panel
- שדות ב-scores: markedKnown, weakReports, correctRunCount

### 4.2 Six Practice Modes

**4.2.1 Multiple Choice (MC)**
- 4 אפשרויות
- correctIndex: 0-3
- explanation לתשובה הנכונה (חובה)
- **optionFeedback: string[4]** — הסבר לכל אופציה (חדש, חובה לכל MC חדש)
- **commonMistake** — מלכודת נפוצה
- אפשר conceptKey יחיד או conceptKeys[] (combo)

**4.2.2 Code Fill (Single Token)**
- code עם `____` placeholder
- answer: token יחיד
- **answer חייב להופיע פעם אחת בלבד בקוד** (אחרת validator מתריע)
- hint (אורך + אות ראשונה)
- explanation

**4.2.3 Code Trace (חיזוי פלט)**
- code: 5-15 שורות
- steps[]: { line, prompt, answer, hint, acceptable[] }
- finalAnswer
- teachingPoint
- **5+ trace per concept קשה (≥7)** = יעד 100+ traces

**4.2.4 Bug Hunt**
- code: array of strings (שורות)
- bugLines: number[] — איזה שורות שגויות
- bugDescription
- fix
- **3-4 bug hunts לכל שיעור React** = יעד 28+ bugs

**4.2.5 Mini Build (כתיבת קוד מאפס)**
- prompt — הוראה
- starter — קוד התחלתי
- tests: [{ type: 'regex' | 'execute', pattern/expected, message }]
- referenceSolution
- **3 builds לכל שיעור** = יעד 30+ builds

**4.2.6 Pair-Match (משחק זוגות) [חדש]**
- concepts: [{ id, name }]
- analogies: [{ id, text, conceptId }]
- drag-and-drop API
- כל זיווג נכון = +1, שגוי = -1
- **5-7 pair-match games** ללבה

### 4.3 Live Code Environment

**4.3.1 Sandpack Embed**
- ספרייה: `@codesandbox/sandpack-react`
- Template: react / vanilla
- Hot reload — שינוי קוד = פלט מיידי
- כל codeExample → "🚀 הרץ" button

**4.3.2 Error Highlighting**
- שגיאות באנגלית מ-V8 → תרגום לעברית
- pointer לשורה הבעייתית

**4.3.3 AI Hints**
- "תן לי רמז" → שולח ל-Claude API דרך backend proxy
- coach mode (לא תשובה ישירה — שאלה מנחה)

### 4.4 Mock Exam System

**4.4.1 פורמט בסיסי**
- 30 שאלות בעירוב: 12 MC + 8 Fill + 6 Trace + 3 Bug + 1 Build
- מקור: lessons 21-27 (React core), רמות 4-6
- Timer: 45 דקות (ניתן לכוונון)
- **Lock-down**: אין משוב במהלך, אין AI hints, אין copy/paste

**4.4.2 Exam Templates**
- 5+ תבניות לקורסים שונים: svcollege React, john-bryce Full-Stack, Sela
- כל תבנית עם distribution שונה לפי הקורס

**4.4.3 Result Screen**
- ציון כללי
- Breakdown לפי סוג שאלה + concept
- Weak concepts highlight
- ניתן לפתוח כל שאלה ולקרוא הסבר

**4.4.4 History**
- כל mock exam נשמר עם תאריך, ציון, זמן
- Trend graph של ציונים
- אנליטיקה: "התקדמת ב-15 נק' לעומת לפני שבוע"

### 4.5 Pedagogical Layer (חדש לפי האודיט)

**4.5.1 Concept Metaphor Library**
- 5 מטאפורות שונות לכל מושג קשה (≥6)
- audience tags: grandma, kid, soldier, student, junior
- UI: carousel + "בחר את שלך"

**4.5.2 שכבת פרפר — 3 Pathways**
```js
pathways: {
  grandma: { explanation, visual, noCodeRequired: true },
  parent:  { explanation, codeExample, analogy },
  technical: { fullDepth: true } // הקיים
}
```
- Toggle ב-top של ה-app: 👵 / 🧑‍🏫 / 👨‍💻
- localStorage שומר העדפה

**4.5.3 Themed Scenarios (סצנות יומיומיות)**
- scenarios: { kitchen, shop, classroom, sports }
- כל מושג ראשי מקבל 3-5 sצנות
- "👩‍🍳 הראה במטבח" → useState דרך מטעימה ובישול

**4.5.4 Counterfactual Examples ("מה אם לא?")**
- שדה: `counterfactual: { code, problem, why }`
- כפתור "🤔 מה היה בלי?"
- 5 מושגים קריטיים עם counterfactuals

**4.5.5 Bug Hunt Quests**
- סיפור עם דמויות (סוקרטס הקוסם, דנה הבלשית)
- 5-8 באגים ב-quest
- כל באג שמתוקן מתקדם בעלילה
- 5 quests = 25-40 שעות עבודה

**4.5.6 Character-Based Domains**
- 6 דמויות: שרה הלוגיקה, רוני הנתונים, בן הבאגים, דנה העיצוב, גיא הריאקציה, לני המודולים
- כל אחת "מנחה" שיעור

**4.5.7 Real-Object Visual Aids**
- תמונות אמיתיות במקום ASCII
- 50 תמונות מ-Unsplash
- עדיף לתמונה אחת לכל מושג ב-grandma level

**4.5.8 Animated Concept Visualizations**
- 60-90 שניות לכל אחד מ-10 קונספטים קשים
- כלי: Motion Canvas (3Blue1Brown) או SVG + GSAP
- 10 ראשונים: useState, closures, async/await, re-render, dependency array, event loop, scope chain, recursion, prototype chain, this

**4.5.9 Mnemonics + Songs**
- שירים בעברית למושגים מרכזיים
- TTS עם קול ילדים

### 4.6 AI Tutor

**4.6.1 Inline Help**
- כפתור "💬 שאל" ליד כל מושג
- Modal עם chat
- Streaming response (UX טוב)

**4.6.2 Coach Mode**
- AI לא נותן תשובה ישירות
- שואל שאלות מנחות
- "מה לדעתך הבעיה?", "ניסית X?"

**4.6.3 Code Review**
- תלמיד שולח פתרון
- AI מציע שיפורים (לא עורך)

**4.6.4 Misconception Detector**
- אחרי 3 תשובות שגויות זהות → AI מזהה pattern
- מציג הסבר ספציפי לטעות

**4.6.5 "Explain Like I'm 5" Mode**
- כפתור "🧒 הסבר כאילו אני בן 5"
- 3 רמות: 5, 8, 12 שנים

**4.6.6 Teach-Back**
- תלמיד מקליט קול 2 דקות
- AI מאזין → grading + שאלות מנחות
- Web Speech API + Claude

### 4.7 Community Layer

**4.7.1 Discussion per Concept**
- תלמידים שואלים, אחרים עונים
- upvote/downvote
- moderation tools

**4.7.2 Peer Code Review**
- תלמיד שולח פתרון
- match לפי רמה דומה
- 1 פתרון בכל פעם
- review template עם 3-4 שאלות
- XP לreviewer + reviewee feedback

**4.7.3 Mentor Matching**
- תלמיד "מאסטר" (level 7 ב-30+ מושגים) זכאי
- async chat
- reputation, rating

**4.7.4 Concept Comparison**
- "useState vs useReducer", "callback vs Promise"
- decision tree אינטראקטיבי
- match-the-tool game

**4.7.5 Peer Analogy Crowdsourcing**
- תלמיד שולח אנלוגיה
- top 10 מופיעים ב-metaphor library
- "Master Explainer" badge

### 4.8 Teacher Dashboard

**4.8.1 Class Overview**
- 25 תלמידים בטבלה
- רמה ממוצעת, אחוז, מושגים חלשים
- sort + filter

**4.8.2 Concept Heatmap**
- חמ-מאפ של מושגים חלשים בכיתה
- "70% מהכיתה תקועים ב-useEffect deps"

**4.8.3 Risk Alerts**
- תלמיד שלא נכנס 3 ימים
- תלמיד שצנח באחוז

**4.8.4 Assignment System**
- מורה שולח task
- רואה מי הגיש
- ציון אוטומטי (לבדיקות regex)

**4.8.5 Bulk Import**
- מורה מעלה CSV → יוצר 25 חשבונות
- magic link + welcome email

### 4.9 Cross-device Sync

**4.9.1 Auth**
- Supabase auth: magic link / Google / GitHub
- Anonymous user_id ב-localStorage עד login

**4.9.2 Sync**
- localStorage ↔ Supabase
- כל 30 שניות + on visibilityChange + on close
- Conflict resolution: last-write-wins עם indication

**4.9.3 Offline-first**
- localStorage כבר עובד offline
- Sync מתעדכן כשיש wifi

### 4.10 Pocket Concept Card

- כפתור 📌 בכל concept card
- localStorage: pocketConcepts[]
- Floating panel תחתון (collapsible)
- במצב Mock Exam: disabled

### 4.11 Daily Reflection + 60-Sec Wrap-Up

**4.11.1 Daily Reflection**
- שישי 18:00 → modal
- "באיזה מושג נתקעת?", "כמה שעות למדת?", "מה תרצה ללמוד הבא?"
- היסטוריה: confidence over time

**4.11.2 60-Second Wrap-Up**
- בסוף שיעור → modal
- "סכם ב-3 שורות", "כמה אתה בטוח?" (slider), "מה היה הכי קשה?"

**4.11.3 Streaks**
- track daily activity
- 5+ שאלות ביום = streak +1
- 🔥 widget בכותרת
- streak freeze (1/חודש ל-Pro)

### 4.12 Gap Matrix (טבלת פערים חכמה)

- Dashboard ייעודי
- 3 קטגוריות: 🟥 לא יודע / 🟨 חצי-יודע / 🟩 יודע
- חיפוש חכם: "concepts I haven't tried in 7 days"
- "concepts I keep getting wrong"

### 4.13 Glossary

- Hebrew/English popup
- 100+ entries
- hover → tooltip קצר
- click → modal מלא
- underline על terms בכל הטקסט

### 4.14 Quick Wins (Accessibility)

- 🔊 Read Aloud (TTS he-IL)
- 📚 גופן OpenDyslexic toggle
- 🎬 prefers-reduced-motion CSS
- 🌗 prefers-color-scheme (Light + Dark)

---

### 4.15 Creative Methods for Hard Concepts (12 שיטות יצירתיות)

**Context:** המערכת היום עומדת על 6 רמות הסבר טקסטואליות + ASCII illustrations + line annotations + codeExample. זה מעולה לרוב המושגים, אבל **8 המושגים הקשים ביותר** (difficulty 8-9, כולם React state/effects) דורשים מודלים מנטליים שטקסט לבדו לא מקרין:
- `re-render`, `array reference`, `object reference`, `passing function as prop` (lesson_22)
- `useEffect`, `dependency array`, `infinite loop`, `cleanup` (lesson_24)

**עקרון עיקרי:** שיטה חדשה לא מחליפה את הקיים — מוסיפה שכבה. **לא ממציאים תוכן מאפס** — מעמיקים על-בסיס `commonMistakes`, `junior` stories, `illustration` הקיימים.

#### 4.15.1 — 🎬 Mental Model Animator (סימולטור הרצה ויזואלי)

**הבעיה:** useEffect lifecycle (mount → render → effect → cleanup → unmount) קשה לדמיין מטקסט.

**פתרון:** SVG/Mermaid stepper עם state diff בכל צעד. Next/Prev/Auto-play.

**Schema:**
```js
animations: {
  "lesson_24::useEffect": {
    frames: [
      { phase: "Mount", state: { count: 0 }, dom: "<button>0</button>", note: "useEffect מתוזמן..." },
      { phase: "Effect runs", state: { count: 0 }, log: "effect ran, n=0", note: "ה-callback רץ" }
    ]
  }
}
```

**השפעה:** 🔥🔥🔥🔥 · **מאמץ:** M (1 שבוע)

#### 4.15.2 — 🔁 Anti-Pattern Gallery

**הבעיה:** "infinite loop" קשה להבין בלי לראות את ה-loop בפעולה.

**פתרון:** 3-5 דפוסי-נגד פר מושג. כל פריט: קוד שבור (אדום) + תיאור הנזק + קוד תקין (ירוק) + diff מודגש.

**Schema:**
```js
antiPatterns: {
  "lesson_24::infinite loop": [
    {
      title: "useEffect ללא deps + setState בתוכו",
      bad: "useEffect(() => { setN(n+1); });",
      damage: "כל render → setState → render → effect → setState → ∞",
      good: "useEffect(() => { setN(n+1); }, []);",
      diff: ["+ , []"],
      severity: "P0"
    }
  ]
}
```

**מקור התוכן:** `concept.commonMistakes` הקיימים — הרחבה שלהם.

**השפעה:** 🔥🔥🔥🔥 · **מאמץ:** S (3-4 ימים)

#### 4.15.3 — ⚖️ Side-by-Side Comparator

**הבעיה:** useState vs useReducer, useMemo vs useCallback — קל לבלבל.

**פתרון:** טבלה אינטראקטיבית עם 2 עמודות. שורות: מטרה, syntax, מתי, performance.

**Schema:**
```js
comparisons: {
  "useState_vs_useReducer": {
    a: { name: "useState", icon: "🪝" },
    b: { name: "useReducer", icon: "🎛️" },
    rows: [
      { dim: "מטרה", a: "state פשוט", b: "state מורכב + actions" },
      { dim: "API", a: "[val, setVal]", b: "[state, dispatch]" },
      { dim: "מתי", a: "1-3 שדות", b: "5+ שדות / logic מורכב" }
    ]
  }
}
```

**יעד:** 8-10 השוואות ליבה (useState/useReducer, props/Context, useMemo/useCallback, map/filter/reduce, async/await/Promise...).

**השפעה:** 🔥🔥🔥 · **מאמץ:** S (3-4 ימים)

#### 4.15.4 — 🧠 Mnemonics Lab (מנמוניקה בעברית)

**הבעיה:** לזכור 4 שלבי useEffect lifecycle / סדר deps.

**פתרון:** ראשי-תיבות + חרוזים בעברית פר-מושג קשה.

**דוגמאות:**
- **useEffect**: "מ.ר.ע.נ" = מאונט → רינדור → אפקט → ניקוי
- **deps array**: "אם זה משתנה — תוסיף. אם לא — תשאיר ריק. אם לא דוקרת — דע שזה bug."
- **stale closure**: "כל setX(prev=>...) חוסך באג. כל setX(x+1) — תיגרר בתעודת ברגע."

**Schema:**
```js
mnemonics: {
  "lesson_24::useEffect": {
    acronym: "מ.ר.ע.נ",
    expansion: "מאונט → רינדור → אפקט → ניקוי",
    rhyme: "אם רינדור התרחש, ה-effect ירשה,\nאחרי כל deps שינוי — אפקט חדש מסתבר.",
    visualHook: "🪜"
  }
}
```

**השפעה:** 🔥🔥🔥 · **מאמץ:** S (תוכן בלבד, 2-3 ימים)

#### 4.15.5 — 📺 Time Machine ("ב-2015 vs ב-2026")

**הבעיה:** למה בכלל יש Hooks? למה useState ולא class?

**פתרון:** Tab "🕰️ אז ועכשיו" — same problem, 3 דורות:
- 2015 (callbacks + jQuery)
- 2018 (Class + setState)
- 2026 (Hooks)

**Schema:**
```js
timeMachine: {
  "lesson_22::useState": {
    eras: [
      { year: 2015, tech: "jQuery", code: "let count = 0; $('#btn').click(() => { count++; $('#out').text(count); });" },
      { year: 2018, tech: "React Class", code: "class Counter extends React.Component { state={count:0}; ... }" },
      { year: 2026, tech: "Hooks", code: "function Counter() { const [count, setCount] = useState(0); ... }" }
    ],
    insight: "פעם DOM ידני. אז state מפורק בין constructor/setState/render. היום: Hook אחד."
  }
}
```

**יעד:** 6 מושגים מרכזיים (useState, useEffect, props, components, JSX, Hooks).

**השפעה:** 🔥🔥🔥 · **מאמץ:** M (1 שבוע)

#### 4.15.6 — 📚 War Stories Library (סיפורי שטח מרובים)

**הבעיה:** רמת junior נותנת רק סיפור אחד. למושג קשה — 3-5 סיפורים יחזקו.

**פתרון:** ספריית `warStories` — לכל מושג, מערך של incidents.

**Schema:**
```js
warStories: {
  "lesson_24::dependency array": [
    {
      title: "ה-fetch שרץ אינסוף פעמים",
      context: "אפליקציית CRM, useEffect שמושך נתוני לקוח",
      bug: "useEffect(() => { fetch(); }); — אין deps",
      diagnosis: "Network tab → 1000+ בקשות/שניה → useEffect ללא deps",
      fix: "+ , [customerId]",
      lesson: "תמיד deps array. ESLint react-hooks/exhaustive-deps תופס.",
      severity: "P0",
      hours: "4 שעות לדיבוג + 5 דקות תיקון"
    }
  ]
}
```

**מקור התוכן:** `concept.junior` הקיימים — מרחיבים מ-1 ל-3-5.

**יעד:** 3-5 סיפורים פר 8 מושגים קשים = ~30 סיפורים.

**השפעה:** 🔥🔥🔥🔥 · **מאמץ:** M (תוכן יד-ביד, 1 שבוע)

#### 4.15.7 — 🎯 What-If Simulator

**הבעיה:** "מה יקרה אם אוסיף count ל-deps?" — עדיף לראות מאשר לקרוא.

**פתרון:** כפתורי toggle לפרמטרים. מציג output שונה לכל קומבינציה.

**Schema:**
```js
whatIf: {
  "lesson_24::useEffect": {
    code: "useEffect(() => { console.log('n=', n); }, DEPS);",
    knobs: [
      { name: "DEPS", options: ["[]", "[n]", "(none)"] }
    ],
    outcomes: {
      "[]": "רק ב-mount — n תמיד 0 (closure)",
      "[n]": "בכל שינוי n — log טרי",
      "(none)": "כל רינדור — לולאה אם setState בתוך"
    }
  }
}
```

**השפעה:** 🔥🔥🔥🔥 · **מאמץ:** M (1 שבוע)

#### 4.15.8 — 🃏 Spaced Repetition Flashcards

**הבעיה:** מושגים קשים נשכחים תוך שבועיים. SRS פותר את "עקומת השכחה".

**פתרון:** Tab "🃏 כרטיסיות" עם FSRS-4.
- Front: שאלה
- Back: תשובה + הסבר
- דירוג Easy/Good/Hard/Again → מעדכן interval

**שימוש קיים:** `lib/srs.js` נוצר ב-Phase 0 (Track A). צריך להוסיף UI + תוכן flashcards.

**Schema:**
```js
flashcards: {
  "lesson_24::useEffect": [
    { front: "מה רץ ב-useEffect עם deps=[]?", back: "פעם אחת בלבד ב-mount." },
    { front: "מה ה-cleanup function?", back: "ה-return — רץ ב-unmount או לפני re-run." }
  ]
}
```

**השפעה:** 🔥🔥🔥🔥🔥 · **מאמץ:** M (1 שבוע, רוב הזמן UI)

#### 4.15.9 — 🎤 Audio Mode (TTS)

**הבעיה:** תלמיד בנהיגה / ריצה — לא יכול לקרוא.

**פתרון:** כפתור "🎤 הקרא" על כל רמת הסבר. Web Speech API (`speechSynthesis`) עם voice עברית.

**אין צורך בנתונים חדשים** — קורא מ-`concept.levels[currentLevel]`.

**הקשר:** כבר בתוכנית כ-Track D Quick Win (D1 — Read Aloud).

**השפעה:** 🔥🔥 · **מאמץ:** S (1-2 ימים)

#### 4.15.10 — 🎭 Concept Comic (סיפור 4 פאנלים)

**הבעיה:** סיפור ויזואלי שגרר זיכרון רגשי.

**פתרון:** 4-6 פאנלים לכל מושג קשה. תיאור טקסטואלי + ASCII או SVG.

**Schema:**
```js
comics: {
  "lesson_24::cleanup": {
    title: "🧹 ה-Cleanup הקטן",
    panels: [
      { caption: "useEffect מתחיל interval", art: "⏱️→📅" },
      { caption: "המשתמש עוזב את הדף", art: "🚪→👋" },
      { caption: "ללא cleanup — ה-interval ממשיך!", art: "⏱️.....⏱️ (memory leak)" },
      { caption: "עם cleanup — clearInterval מבטל", art: "⏱️→❌ ✓ נקי" }
    ]
  }
}
```

**מקור התוכן:** `concept.illustration` הקיים — להעמיק ל-4 פאנלים.

**יעד:** 8 מושגים קשים = 32-48 פאנלים.

**השפעה:** 🔥🔥🔥 · **מאמץ:** M (יד-ביד, יצירתי, 1 שבוע)

#### 4.15.11 — 📊 Concept Map (גרף ויזואלי)

**הבעיה:** useState → setState → re-render → useEffect → cleanup — שרשרת קשה לראות מטקסט ליניארי.

**פתרון:** גרף ויזואלי (D3.js force layout או SVG static) — node = concept, edge = relationship. קליק → פותח שיעור.

**Schema:**
```js
conceptGraph: {
  nodes: [
    { id: "useState", lesson: "lesson_22", difficulty: 6 },
    { id: "re-render", lesson: "lesson_22", difficulty: 8 },
    { id: "useEffect", lesson: "lesson_24", difficulty: 8 }
  ],
  edges: [
    { from: "useState", to: "re-render", label: "triggers" },
    { from: "re-render", to: "useEffect", label: "may run if deps changed" }
  ]
}
```

**ספריות:** D3.js / vis-network / SVG static.

**השפעה:** 🔥🔥🔥 · **מאמץ:** L (2 שבועות)

#### 4.15.12 — 🤔 Reverse Q&A (Jeopardy Mode)

**הבעיה:** שאלה רגילה = LLM-style. Reverse = יותר משמעותי קוגניטיבית.

**פתרון:** "תשובה: useState(0) רץ פעם אחת ב-mount. שאלה?" → המשתמש מנסח את השאלה.

**Schema:**
```js
reverseQA: {
  "lesson_22::useState": [
    { answer: "פעם אחת ב-mount", expectedQuestion: ["מתי", "useState", "init"] }
  ]
}
```

**השפעה:** 🔥🔥 · **מאמץ:** M (1 שבוע)

---

### 4.15.13 — מטריצת השפעה × מאמץ

| # | שיטה | השפעה | מאמץ | עדיפות |
|:-:|---|:-:|:-:|:-:|
| 4.15.8 | Flashcards (SRS) | 🔥🔥🔥🔥🔥 | M | **#1** |
| 4.15.1 | Mental Model Animator | 🔥🔥🔥🔥 | M | **#2** |
| 4.15.2 | Anti-Pattern Gallery | 🔥🔥🔥🔥 | S | **#3** |
| 4.15.6 | War Stories Library | 🔥🔥🔥🔥 | M | **#4** |
| 4.15.7 | What-If Simulator | 🔥🔥🔥🔥 | M | **#5** |
| 4.15.3 | Side-by-Side | 🔥🔥🔥 | S | #6 |
| 4.15.4 | Mnemonics | 🔥🔥🔥 | S | #7 |
| 4.15.5 | Time Machine | 🔥🔥🔥 | M | #8 |
| 4.15.10 | Concept Comic | 🔥🔥🔥 | M | #9 |
| 4.15.11 | Concept Map | 🔥🔥🔥 | L | #10 |
| 4.15.9 | Audio Mode | 🔥🔥 | S | #11 |
| 4.15.12 | Reverse Q&A | 🔥🔥 | M | #12 |

### 4.15.14 — קבצי נתונים חדשים (אינטגרציה)

לכל שיטה — קובץ data נפרד. ה-content-loader.js ממזג ל-concepts לפי conceptKey:

```
data/anti_patterns.js     // var ANTI_PATTERNS  = { conceptKey: [...] }
data/mnemonics.js         // var MNEMONICS      = { conceptKey: {...} }
data/war_stories.js       // var WAR_STORIES    = { conceptKey: [...] }
data/comparisons.js       // var COMPARISONS    = { pairKey: {...} }
data/animations.js        // var ANIMATIONS     = { conceptKey: { frames } }
data/comics.js            // var COMICS         = { conceptKey: { panels } }
data/time_machine.js      // var TIME_MACHINE   = { conceptKey: { eras } }
data/what_if.js           // var WHAT_IF        = { conceptKey: { knobs, outcomes } }
data/flashcards.js        // var FLASHCARDS     = { conceptKey: [...] }
data/concept_graph.js     // var CONCEPT_GRAPH  = { nodes, edges }
data/reverse_qa.js        // var REVERSE_QA     = { conceptKey: [...] }
```

**content-loader.js** (תוסף):
```js
const sources = {
  ANTI_PATTERNS: 'antiPatterns',
  MNEMONICS:     'mnemonic',
  WAR_STORIES:   'warStories',
  ANIMATIONS:    'animation',
  COMICS:        'comic',
  TIME_MACHINE:  'timeMachine',
  WHAT_IF:       'whatIf',
  FLASHCARDS:    'flashcards',
  REVERSE_QA:    'reverseQA',
};
window.LESSONS_DATA.forEach(lesson => {
  (lesson.concepts || []).forEach(c => {
    const key = `${lesson.id}::${c.conceptName}`;
    Object.entries(sources).forEach(([globalName, fieldName]) => {
      const data = window[globalName] || {};
      if (data[key]) c[fieldName] = data[key];
    });
  });
});
```

### 4.15.15 — UI Pattern (Collapsible Sections)

ב-`renderConceptCard()` — להוסיף sections פתיחה לכל שיטה זמינה:

```
📖 הסבר ברמתך       ← כבר קיים
🃏 כרטיסיות         ← אם concept.flashcards
🎬 הדמיה חיה        ← אם concept.animation
🔁 דפוסי-נגד        ← אם concept.antiPatterns
⚖️ השוואה            ← אם קשור ל-comparison
🧠 לזכירה            ← אם concept.mnemonic
📚 סיפורי שטח        ← אם concept.warStories
🎯 מה אם...          ← אם concept.whatIf
🕰️ אז ועכשיו         ← אם concept.timeMachine
🎭 קומיקס            ← אם concept.comic
🤔 הפוך              ← אם concept.reverseQA
```

Pattern: Accordion עם closed-by-default (למניעת הצפה).

### 4.15.16 — Tabs ייעודיים (לחלק מהשיטות)

חלק מהשיטות שווה Tab עליון נפרד (לא רק section):
- **🃏 כרטיסיות** — SRS view (Flashcards)
- **🗺️ מפת מושגים** — Concept Map (אינטראקטיבי, מסך מלא)
- האחרים נטמעים ב-"שיעורים" כסקציות.

---

## 5. דרישות לא-פונקציונליות (NFR)

### 5.1 Performance

- **First contentful paint** < 1.5 שניות
- **Time to interactive** < 3 שניות
- **render concept card** < 50ms
- **lazy loading** לקבצים >500KB (questions_bank_seeded 1.4MB)
- **per-card refresh** במקום full re-render (renderConceptCard בלבד)
- **debounce/throttle** על search ו-input events

### 5.2 Accessibility (WCAG 2.1 AA)

- ARIA labels לכל כפתור עם אייקון בלבד
- keyboard navigation מלא (Tab + Enter + Esc)
- focus management (אחרי modal/route change)
- color contrast ≥ 4.5:1
- prefers-reduced-motion support
- prefers-color-scheme (Light + Dark)
- screen reader friendly
- text scaling (up to 200%)

### 5.3 Mobile

- Responsive: <700px breakpoint
- Touch targets ≥ 44×44px
- Swipe gestures באזורים מתאימים
- PWA installable
- Offline-first
- iOS + Android native feel

### 5.4 Security

- **Sanitize all text/code injection** (DOMPurify ל-HTML)
- **API keys via backend proxy בלבד** (Edge functions, never expose)
- Rate limiting ל-AI Tutor (5/day free, 100/day Pro)
- Content Security Policy header
- HTTPS only
- localStorage לא מכיל מידע רגיש (passwords, tokens)

### 5.5 RTL Hebrew-first

- כל UI ב-direction=rtl
- אייקונים שתואמים את הכיוון (chevron, arrows)
- יישור טקסט אוטומטי
- מספרים תמיד ב-LTR (גם בעברית)
- code blocks תמיד ב-LTR

### 5.6 Logs & Observability

- Console logs ב-production: רק errors + critical events
- Sentry ל-error tracking (free tier)
- PostHog ל-product analytics (free 1M events)
- web vitals: LCP, FID, CLS

### 5.7 Browser Support

- Chrome/Edge 100+
- Firefox 100+
- Safari 15+
- Mobile Chrome/Safari אחרונים
- **לא תומכים** ב-IE11 או דפדפנים ישנים

### 5.8 i18n / l10n

- שפה ראשית: עברית
- אנגלית כתחתית עתידית (Phase 4)
- כל strings ב-data file נפרד (אם נחליט לתרגם)

---

## 6. מודל נתונים

### 6.1 Concept

```js
{
  conceptName: string,           // יחודי בתוך lesson
  difficulty: 1..10,             // חובה
  levels: {
    grandma: string,             // אנלוגיה יומיומית
    child: string,               // משחק/דמיון
    soldier: string,             // ארגוני
    student: string,             // אקדמי
    junior: string,              // סיפור-טעות
    professor: string            // טכני (אנגלית OK)
  },
  illustration?: string,         // ASCII/text diagram
  codeExample: string,           // מומלץ
  codeExplanation: string,
  prerequisites?: string[],      // ['lesson_22::useState']
  pathways?: {                   // שכבת פרפר (חדש)
    grandma: { explanation, visual },
    parent: { explanation, analogy, codeExample },
    technical: { fullDepth: true }
  },
  scenarios?: {                  // themed (חדש)
    kitchen?: { setup, action, outcome },
    shop?, classroom?, sports?
  },
  counterfactual?: {             // "מה אם לא?" (חדש)
    code, problem, why
  },
  metaphors?: [                  // 5 metaphors per hard concept
    { icon, text, audience }
  ],
  extras?: {                     // לקושי ≥6
    moreExamples: [{ code, explanation }],
    pitfalls: [{ mistake, why, fix }],
    practiceQuestions: [{ question, answer }]
  }
}
```

### 6.2 Score (per concept)

```js
{
  level: 1..7,
  passedMC: bool,
  passedFill: bool,
  attempts: number,
  correct: number,
  markedKnown: bool,
  weakReports: number,
  correctRunCount: number,
  srsState: {
    ease: 1.3..4.0,
    interval: number (days),
    due: number (unix-ms),
    repetitions: number,
    lapses: number,
    lastReviewed: number | null
  }
}
```

### 6.3 Question Bank

```js
QUESTIONS_BANK = {
  _version: "X.Y.Z",
  _lastUpdate: "ISO-date",
  _changelog: [{ v, date, changes }],
  mc: [{ id, topicId, conceptKey, level, question, options[4], correctIndex, optionFeedback[4], commonMistake, explanation }],
  fill: [{ id, topicId, conceptKey, level, code, answer, hint, explanation }],
  trace: [{ id, conceptKey, level, code, steps[], finalAnswer, teachingPoint, explanation }],
  bug: [{ id, conceptKey, level, code[], bugLines[], bugDescription, fix }],
  build: [{ id, conceptKey, level, prompt, starter, tests[], referenceSolution }],
  pair: [{ id, conceptKeys[], concepts[], analogies[] }]
}
```

**חוקי validator:**
- MC: options.length === 4, correctIndex 0-3, no duplicate options
- Fill: code contains "____", answer מופיע פעם אחת בדיוק
- Trace: steps[i].line ≤ totalLines
- כל id ייחודי
- כל conceptKey קיים ב-LESSONS_DATA
- difficulty: 1-10

### 6.4 Concept Enrichment

```js
"lesson_X::ConceptName": {
  deepDive: { purpose, problem, withoutIt, useWhen },
  analogies: { grandma, child, soldier, student, junior, professor },
  commonMistakes?: [{ mistake, why, fix }]
}
```

### 6.5 Glossary

```js
GLOSSARY = {
  "Hook": { he: "חיבור", definition: "...", category: "react" },
  // ...
}
```

### 6.5.1 Creative Methods Data Files (סעיף 4.15)

**11 קבצי נתונים חדשים** למודלים מנטליים מתקדמים — כולם ממוזגים ב-content-loader.js לפי `conceptKey`:

```js
// data/anti_patterns.js
ANTI_PATTERNS = {
  "lesson_X::Concept": [
    { title, bad: { code, lang }, damage, good: { code, lang }, diff: [], severity }
  ]
}

// data/mnemonics.js
MNEMONICS = {
  "lesson_X::Concept": { acronym, expansion, rhyme, visualHook }
}

// data/war_stories.js
WAR_STORIES = {
  "lesson_X::Concept": [
    { title, context, bug, diagnosis, fix, lesson, severity, hours }
  ]
}

// data/comparisons.js
COMPARISONS = {
  "useState_vs_useReducer": {
    a: { name, icon }, b: { name, icon },
    rows: [{ dim, a, b }]
  }
}

// data/animations.js
ANIMATIONS = {
  "lesson_X::Concept": {
    frames: [{ phase, state, dom, log, note }]
  }
}

// data/comics.js
COMICS = {
  "lesson_X::Concept": {
    title, panels: [{ caption, art }]
  }
}

// data/time_machine.js
TIME_MACHINE = {
  "lesson_X::Concept": {
    eras: [{ year, tech, code }],
    insight: string
  }
}

// data/what_if.js
WHAT_IF = {
  "lesson_X::Concept": {
    code: string, // עם placeholders
    knobs: [{ name, options }],
    outcomes: { [option]: outcome }
  }
}

// data/flashcards.js
FLASHCARDS = {
  "lesson_X::Concept": [{ front, back }]
}

// data/concept_graph.js
CONCEPT_GRAPH = {
  nodes: [{ id, lesson, difficulty }],
  edges: [{ from, to, label }]
}

// data/reverse_qa.js
REVERSE_QA = {
  "lesson_X::Concept": [
    { answer, expectedQuestion: string[] }
  ]
}
```

**מיזוג ב-content-loader.js:**
```js
const CREATIVE_SOURCES = {
  ANTI_PATTERNS: 'antiPatterns',
  MNEMONICS:     'mnemonic',
  WAR_STORIES:   'warStories',
  ANIMATIONS:    'animation',
  COMICS:        'comic',
  TIME_MACHINE:  'timeMachine',
  WHAT_IF:       'whatIf',
  FLASHCARDS:    'flashcards',
  REVERSE_QA:    'reverseQA',
};
window.LESSONS_DATA.forEach(lesson => {
  (lesson.concepts || []).forEach(c => {
    const key = `${lesson.id}::${c.conceptName}`;
    Object.entries(CREATIVE_SOURCES).forEach(([globalName, fieldName]) => {
      const data = window[globalName] || {};
      if (data[key]) c[fieldName] = data[key];
    });
  });
});
// CONCEPT_GRAPH ו-COMPARISONS לא לפי conceptKey — נטענים ל-window בנפרד
```

### 6.6 localStorage Keys (גרסה כעת)

- `lumenportal:proficiency:v1` — V/X knowledge map
- `lumenportal:scores:v1` — scores object
- `lumenportal:userId:v1` — anonymous UUID
- `lumenportal:bankVersion` — last seen version
- `lumenportal:pocket:v1` — pocket concepts
- `lumenportal:reflections:v1` — daily reflections
- `lumenportal:streaks:v1` — streak data
- `lumenportal:settings:v1` — theme, font, motion preferences
- `lumenportal:pathway:v1` — chosen pathway (grandma/parent/technical)

### 6.7 Versioning Strategy

- **Bank version** (semver): `MAJOR.MINOR.PATCH`
  - MAJOR: schema breaks → force reset progress
  - MINOR: new content → no reset
  - PATCH: fixes → no reset
- App reads `_version`, compares to localStorage
- אם MAJOR שונה → prompt למשתמש לרענון progress

---

## 7. עקרונות טכנולוגיים וכללי ברזל

### 7.1 Stack

| שכבה | טכנולוגיה | סיבה |
|---|---|---|
| Frontend (current) | Vanilla JS + HTML + CSS | אין dependencies, פשוט לעבוד |
| Frontend (Phase 2+) | Vite + ES Modules | build, HMR, lazy loading |
| Frontend (Phase 3+) | Vite + TypeScript | type safety בהדרגה |
| Code Editor | Monaco Editor (CDN) | אותו כמו VS Code |
| Code Runtime | Sandpack (`@codesandbox/sandpack-react`) | execution בדפדפן |
| Backend | Supabase Edge Functions (Deno) | serverless, free tier |
| Database | Supabase Postgres | רלציוני, RLS |
| Auth | Supabase Auth | magic link + OAuth |
| AI | Anthropic Claude API (Sonnet 4.6) | יציב, prompt caching |
| Analytics | PostHog (free 1M) | events, funnels, feature flags |
| Errors | Sentry (free) | error tracking |
| CI/CD | GitHub Actions | חינם לrepo private |
| Hosting | Vercel / Cloudflare Pages | static + edge functions |
| PWA | vite-plugin-pwa | service worker auto-gen |

### 7.2 כללי ברזל (Iron Rules)

1. **אסור Math.random** בקוד פונקציונלי. רק `RNG.next()` מ-`lib/rng.js` (mulberry32 + seeded).
2. **אסור נתונים מומצאים** בעת יצירת bank/metrics. אם ערך לא ידוע — `null`/`undefined`/`'unknown'`, ולא ערך מזויף.
3. **אסור להציג API keys ב-frontend**. Claude/Supabase Service keys תמיד דרך Edge Functions.
4. **אסור לערוך main directly**. רק PRs.
5. **אסור לשבור CI**. PR חייב לעבור `validate_bank --strict`.
6. **אסור tests פלקיים (flaky)**. אם בדיקה רנדומלית → תקן.
7. **אסור פיצ'ר בלי DoD**. כל פיצ'ר חייב: יעד פונקציונלי + מדד הצלחה + נקודת rollback.
8. **אסור boilerplate**. validator יחסום merge.
9. **אסור fill question עם תשובה דו-משמעית** (answer מופיע >1 בקוד).
10. **אסור lessons בלי difficulty**. validator יחסום.

### 7.3 כללי קוד (Code Style)

- 2 spaces indentation
- כפולים (`"`) לstrings ב-JS
- semicolons חובה
- Hebrew strings ב-JS files: utf-8, אין escape
- code examples ב-JSX → strings מולקטים עם `\n`
- אסור `var` (רק `const`/`let`)
- אסור `==` (רק `===`)

### 7.4 כללי תוכן (Content Rules)

- כל מושג: 6 רמות (grandma → professor) — לא boilerplate
- grandma level: ≤ 2 משפטים, אנלוגיה יומיומית
- code example: ≤ 8 שורות, אמיתי, idiomatic
- codeExplanation: 1-2 משפטים, מסביר *למה* הקוד עובד
- אנגלית רק ברמה professor (וצמודות API)
- מספרים בעברית: ספרות ערביות (3, לא ג')
- אין emoji בקוד עצמו (רק ב-illustration)

---

## 8. KPIs ומדדי הצלחה

### 8.1 KPIs לתוכן

| מדד | יעד |
|---|:-:|
| Boilerplate concepts | 0 |
| Missing difficulty | 0 |
| Fill ambiguity warnings | 0 |
| concepts עם ≥3 MC curated | 100% |
| concepts עם ≥2 Fill curated (אם codeExample) | 100% |
| concepts קשים עם extras | 100% (ל-difficulty ≥6) |
| concepts עם metaphors | 100% (ל-difficulty ≥6, 5 metaphors) |
| concept_enrichment coverage | 100% מושגים קריטיים |

### 8.2 KPIs לימודיים

| מדד | יעד |
|---|:-:|
| Time to first quiz success | < 10 דקות |
| Time to first "aha" | < 5 דקות |
| Concepts mastered/week (משתמש פעיל) | ≥ 5 |
| Mock exam pass rate | ≥ 85% (אחרי 7 ימים) |
| Real exam pass rate | ≥ 85% (תלמידים שניגשו) |
| Long-term retention (concept mastered → 2 weeks later quiz) | ≥ 75% |

### 8.3 KPIs מוצר (Engagement)

| מדד | יעד |
|---|:-:|
| D1 retention | ≥ 60% |
| D7 retention | ≥ 40% |
| DAU/MAU | ≥ 40% |
| Avg session duration | ≥ 15 דקות |
| Streaks (3+ ימים) | ≥ 30% מ-MAU |
| AI tutor usage | ≥ 30% משתמשים פעילים |

### 8.4 KPIs טכניים

| מדד | יעד |
|---|:-:|
| First Contentful Paint | < 1.5s |
| Time to Interactive | < 3s |
| Lighthouse Performance | ≥ 90 |
| Lighthouse Accessibility | ≥ 95 |
| Lighthouse Best Practices | ≥ 90 |
| CI pass rate | 100% |
| Production errors/week | < 5 |

### 8.5 KPIs עסקיים

| מדד | יעד שנה 1 |
|---|:-:|
| Free → Paid conversion | ≥ 5% |
| MRR growth | ≥ 15%/חודש |
| Churn | ≤ 5%/חודש |
| NPS | ≥ 50 |
| Total users | 5,000 |
| Paid subscribers | 200 |

---

## 9. סיכוני מוצר ומיטיגציה

| סיכון | חומרה | סבירות | מיטיגציה |
|---|:-:|:-:|---|
| תוכן מתיישן (React 19+) | גבוהה | בינונית | תהליך עדכון חודשי, AI שמזהה inconsistencies |
| AI עלויות גבוהות | בינונית | גבוהה | Prompt caching (90% חיסכון), rate limits, fallback ל-Haiku |
| תלמידים מעתיקים מ-ChatGPT | גבוהה | גבוהה | Mock exams ללא AI, watermark detection, anti-cheat patterns |
| Scale issues (10K+ users בו-זמנית) | בינונית | נמוכה | Edge caching, Supabase scales, lazy loading |
| מתחרה גדול נכנס לעברית | נמוכה | נמוכה | Moat = community + curriculum mapping |
| איכות seeded questions | גבוהה | בינונית | 10% manual audit, סימון "verified" |
| Math.random refactor breaks tests | בינונית | בינונית | Migration test, A/B comparison |
| User loses progress (localStorage cleared) | גבוהה | בינונית | Cross-device sync (Phase 3) |
| Hebrew RTL bugs ב-Sandpack | בינונית | בינונית | Code editor LTR-only, UI RTL |
| Difficulty calibration שגוי | בינונית | בינונית | A/B testing על תלמידים, feedback loop |

---

# חלק II — Master Plan לביצוע

## 10. סטטוס נוכחי (Phase 0 — הושלם)

### ✅ הושג

- [x] 17 שיעורים נכתבו במלואם (lessons 11-27)
- [x] Lesson Closures חדש (8 concepts, Track C)
- [x] difficulty 1-10 לכל 545 concepts
- [x] 0 boilerplate (was 154)
- [x] V button + Report Weak + Extras panel
- [x] Code Trace question type (35 questions, lessons 21-27)
- [x] RNG דטרמיניסטי (mulberry32) — Math.random מוסר מקוד פונקציונלי
- [x] SRS (SM-2) schema + integration
- [x] 5 Mastery States (new/learning/review/mastered/at-risk)
- [x] Bank Versioning v2.0.0
- [x] CI gate (`validate_bank --strict`)
- [x] 11 fill ambiguity warnings תוקנו
- [x] Lesson 20 difficulty calibration
- [x] Glossary stub (Track C)
- [x] concept_enrichment 112 entries
- [x] Tracks A+B+C ב-PR #8 (integration/a-b-c-merge)

### 📋 PR פתוח

**[PR #8](https://github.com/talstilkol/sv-test/pull/8)** — מוכן ל-merge ל-main.

---

## 11. Phase 1 — תשתית קריטית (5 שבועות)

**מטרה:** לסגור את כל הפערים הטכניים שמונעים יציבות + ביצועים בסיסיים. כל פיצ'ר חדש בעתיד יסתמך על התשתית הזו.

**Definition of Done:** כל הפיצ'רים פועלים יציב + תיעוד + tests + CI עובר.

### 11.1 — שבוע 1: Architecture & Performance Quick Wins

#### 11.1.1 — Lazy load `questions_bank_seeded.js` (1.4MB)

**בעיה:** הקובץ נטען מיד בעת load → מאט initial load בעשרות אחוזים.

**פתרון:**
1. עטיפת הקובץ ב-IIFE שמייצא ל-`window.QUESTIONS_BANK_SEEDED_LOADER` (loader function).
2. ב-`content-loader.js`: בדיקה אם המשתמש נכנס ל-Trainer/Study Mode.
3. אם כן → dynamic `<script>` injection או `fetch()` + `eval` (ב-iframe sandbox).
4. אם לא → לא נטען בכלל.

**טכני:**
```js
// content-loader.js (חדש)
async function ensureSeededBank() {
  if (window.QUESTIONS_BANK_SEEDED) return;
  const s = document.createElement('script');
  s.src = '/data/questions_bank_seeded.js';
  document.head.appendChild(s);
  await new Promise(r => s.onload = r);
  // re-merge into window.QUESTIONS_BANK
  window.QUESTIONS_BANK = {
    ...window.QUESTIONS_BANK,
    mc: [...primary.mc, ...QUESTIONS_BANK_SEEDED.mc],
    fill: [...primary.fill, ...QUESTIONS_BANK_SEEDED.fill]
  };
}

// app.js — ב-openTrainer/openStudyMode
async function openTrainer() {
  await ensureSeededBank();
  // ... existing code
}
```

**DoD:**
- Initial load < 1.5s (Lighthouse Performance ≥ 90)
- Trainer/Study mode עדיין עובדים (אחרי load של seeded)
- ב-Network tab: questions_bank_seeded.js נטען רק כשנדרש

**מאמץ:** 1 יום

#### 11.1.2 — Per-card refresh (avoid full re-render)

**בעיה:** `renderContent()` מרענן את כל ה-DOM בכל שינוי. לרשימה של 38 concepts → 50-200ms.

**פתרון:**
```js
function refreshConceptCard(conceptName) {
  const lesson = LESSONS_DATA.find(l => l.id === currentLessonId);
  const concept = lesson.concepts.find(c => c.conceptName === conceptName);
  const idx = lesson.concepts.indexOf(concept);

  const oldCard = document.querySelector(
    `.concept-card[data-concept="${cssEscape(conceptName)}"]`
  );
  if (!oldCard) { renderContent(); return; }

  const tmp = document.createElement('div');
  tmp.innerHTML = renderConceptCard(lesson, concept, idx);
  oldCard.replaceWith(tmp.firstElementChild);
  wireConceptCardHandlers(lesson);  // re-wire events on new card
}
```

**איפה להחליף:**
- אחרי `applyAnswer()` → `refreshConceptCard(conceptName)` במקום `renderContent()`
- אחרי `markAsKnown()` → אותו דבר
- אחרי `reportWeak()` → אותו דבר

**DoD:**
- DevTools Performance: render concept update < 50ms
- אין flicker ב-UI כשמתקדמים ברמה

**מאמץ:** יום-יומיים

#### 11.1.3 — Vitest Setup + Unit Tests לליבה

**הקמה:**
```bash
npm init -y
npm install --save-dev vitest @vitest/ui happy-dom
```

```js
// vitest.config.js
import { defineConfig } from 'vitest/config';
export default defineConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
  },
});
```

**Tests ראשונים:**
1. `tests/rng.test.js` — RNG determinism, edge cases (empty array, n=0)
2. `tests/srs.test.js` — SM-2 intervals, lapse reset, ease clamping
3. `tests/scoring.test.js` — applyAnswer + level progression + V button rules
4. `tests/validate_bank.test.js` — loads sample bank, checks errors

**Goal:** 5-10 קריטיים ראשונים. לא 100% coverage — focus על logic.

**הוספה ל-CI:**
```yaml
- name: Unit tests
  run: npm test
```

**DoD:**
- 5 tests עוברים ב-CI
- אם משנים applyAnswer ושוברים scoring → CI אדום

**מאמץ:** יומיים

### 11.2 — שבוע 2: Accessibility Foundation

#### 11.2.1 — ARIA Labels (כל הכפתורים אייקוניים)

**איתור:** `grep -n 'button\|aria-label' index.html app.js`

**רשימת אזורים לתיקון:**
- Top tabs (📖 🧠 🎯 🗺️ 🏠 💻 🔬 📐) — כל אחד צריך aria-label
- כפתור 📌 Pocket Card
- כפתור 🔊 TTS
- כפתור 💬 AI Tutor
- כפתור ✓ Mark V
- כפתור 🆘 Report Weak
- כפתורי בpopup/modal (×, ✓)
- כפתור הdrawer במובייל (☰)

**טכני:**
```html
<button id="open-trainer" aria-label="פתח את מאמן הידע" data-tab="trainer">
  <span class="emoji" aria-hidden="true">🧠</span>
  <span>מאמן ידע</span>
</button>
```

**DoD:**
- axe DevTools: 0 errors בכל view
- Lighthouse Accessibility ≥ 95

**מאמץ:** יומיים

#### 11.2.2 — Keyboard Navigation

**מטרה:** משתמש יכול לעבור ולפתור Quiz רק עם מקלדת.

**מימוש:**
1. **Tab order נכון** ב-DOM (סמנטי, לא רק tabindex)
2. **Focus rings** ברורים: `:focus-visible { outline: 2px solid var(--primary); }`
3. **Esc מסגור modals** (Pocket Card, AI Tutor, Daily Reflection)
4. **Enter בשאלה MC** = שולח את האפשרות הנוכחית
5. **Arrow keys** במנו של concepts

**DoD:**
- Tab + Enter יכול לעבור lesson + לפתור question
- Esc סוגר כל modal

**מאמץ:** יומיים

#### 11.2.3 — prefers-reduced-motion

**טכני:**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Toggle ידני בsettings */
.reduced-motion *, .reduced-motion *::before, .reduced-motion *::after {
  animation: none !important;
  transition: none !important;
}
```

**DoD:**
- במערכת הפעלה עם reduce motion → אין animations
- Toggle בsettings עובד גם ידנית

**מאמץ:** חצי יום

#### 11.2.4 — prefers-color-scheme + Light Mode

**מימוש:**
```css
:root {
  /* Dark (current) */
  --bg-dark: #0a0b10;
  --text-main: #e8ecf4;
  /* ... */
}

@media (prefers-color-scheme: light) {
  :root:not(.theme-dark) {
    --bg-dark: #f7f8fa;
    --text-main: #1a1d24;
    /* ... */
  }
}

.theme-light {
  --bg-dark: #f7f8fa;
  --text-main: #1a1d24;
  /* ... */
}
```

**Toggle ב-settings:**
- Auto (לפי OS)
- Light
- Dark

**DoD:**
- כל view נראה טוב ב-Light + Dark
- Contrast ≥ 4.5:1 בשני המצבים

**מאמץ:** יום-יומיים

### 11.3 — שבוע 3: PWA + Offline

#### 11.3.1 — Manifest

```json
// public/manifest.json
{
  "name": "LumenPortal",
  "short_name": "Lumen",
  "description": "פורטל לימוד React/JS/TS בעברית",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0a0b10",
  "theme_color": "#6366f1",
  "lang": "he",
  "dir": "rtl",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

#### 11.3.2 — Service Worker

```js
// service-worker.js
const CACHE_NAME = 'lumen-v1';
const STATIC_ASSETS = [
  '/', '/index.html', '/style.css', '/app.js', '/lib/rng.js', '/lib/srs.js',
  '/data/concept_enrichment.js', '/data/quick_guide.js', '/data/glossary.js',
  // primary lessons
  ...['11','12','13','15','16','17','18','19','20','21','22','23','24','25','26','27','closures'].map(n => `/data/lesson${n}.js`),
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(STATIC_ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
```

#### 11.3.3 — Install Prompt

```js
// app.js
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showInstallButton();
});

function showInstallButton() {
  const btn = document.getElementById('install-pwa-btn');
  btn.style.display = 'block';
  btn.onclick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log('PWA install:', outcome);
      deferredPrompt = null;
    }
  };
}
```

**DoD:**
- Lighthouse PWA: installable
- Offline: כל primary lessons + assets זמינים
- Push notifications (אופציונלי, Phase 3)

**מאמץ:** יום-יומיים

### 11.4 — שבוע 4: Sandpack + Live Code

#### 11.4.1 — Sandpack Embed

```bash
npm install @codesandbox/sandpack-react
```

```js
// lib/sandpack-embed.js
import { Sandpack } from '@codesandbox/sandpack-react';

export function renderSandpack(container, codeExample, template = 'react') {
  // React rendering of Sandpack into a container
  // (use ReactDOM.render or vanilla wrapper)
}
```

**אינטגרציה:**
- בכל `concept-card` עם `codeExample` → "🚀 הרץ את זה" button
- click → modal עם Sandpack live editor + preview

**DoD:**
- תלמיד יכול לערוך + להריץ קוד React/JS
- Hot reload בעת שינוי
- Console output מוצג

**מאמץ:** 3 ימים

#### 11.4.2 — Code Trace Engine (Already partially exists)

**קיים:** 35 trace questions + UI ב-app.js (lines 1487-1649)

**להרחיב:**
- 5 traces לכל שיעור (כולל lessons 11-20) = 100+ traces
- traces ל-closures lesson (קריטיים: closure execution)

**מאמץ:** 3 ימים (תוכן בלבד)

#### 11.4.3 — Bug Hunt Mode

**Schema:**
```js
bugs: [{
  id: "bug_useState_001",
  conceptKey: "lesson_22::useState",
  level: 5,
  code: [
    "function Counter() {",
    "  let count = 0;",
    "  return <button onClick={() => count++}>{count}</button>;",
    "}"
  ],
  bugLines: [2, 3],
  bugDescription: "count לא ב-state — הקומפוננטה לא מתעדכנת",
  fix: "useState(0); + setCount(count + 1)"
}]
```

**UI:**
- מציג קוד עם line numbers clickable
- תלמיד בוחר line(s)
- כותב הסבר
- click → השוואה ל-bugDescription + fix

**מטרה:** 28+ bug hunts (4 לכל lesson React)

**מאמץ:** 3 ימים (UI + תוכן)

#### 11.4.4 — Mini Build Mode

**Schema:**
```js
builds: [{
  id: "build_useState_counter",
  conceptKey: "lesson_22::useState",
  level: 6,
  prompt: "כתוב Counter עם useState",
  starter: "function Counter() {\n  // השלם\n}",
  tests: [
    { type: 'regex', pattern: 'useState\\(\\s*0\\s*\\)', message: 'השתמש ב-useState(0)' },
    { type: 'regex', pattern: 'onClick.*setCount', message: 'onClick צריך לקרוא ל-setCount' },
  ],
  referenceSolution: "..."
}]
```

**UI:**
- Sandpack + tests panel
- ✅/❌ לכל test
- אחרי הצלחה → reference solution

**מטרה:** 21 builds (3 לכל React lesson)

**מאמץ:** 3 ימים

### 11.5 — שבוע 5: Mock Exam + Per-Distractor Feedback

#### 11.5.1 — Mock Exam Mode

**UI:**
- Tab חדש "🎯 מבחן מדומה"
- Settings: Choose template (svcollege React / john-bryce Full-Stack / Sela)
- Timer: 45 דקות
- Lock-down: no copy/paste, no AI, no concept hints

**מימוש:**
```js
// lib/exam.js
class MockExam {
  constructor(template) {
    this.questions = this.composeQuestions(template);
    this.startTime = Date.now();
    this.duration = 45 * 60 * 1000;
    this.answers = {};
  }

  composeQuestions(template) {
    // 12 MC + 8 Fill + 6 Trace + 3 Bug + 1 Build
    // מ-conceptKey של lessons 21-27, רמות 4-6
    // deterministic via RNG seed
  }

  isTimeUp() {
    return Date.now() - this.startTime > this.duration;
  }

  submit() {
    return {
      score: this.calculateScore(),
      breakdown: this.byType(),
      weakConcepts: this.identifyWeak()
    };
  }
}
```

**Result Screen:**
- ציון כללי (e.g., "85/100 — מצוין!")
- Breakdown: MC 11/12, Fill 7/8, Trace 4/6, Bug 2/3, Build 1/1
- Weak concepts: ["useEffect deps", "stale closures"] → קישור למצב לימוד
- כל שאלה אפשר לפתוח ולקרוא הסבר

**History:**
- localStorage `lumenportal:examHistory:v1`
- Trend graph

**מאמץ:** 4 ימים

#### 11.5.2 — Per-Distractor Feedback

**Schema update:**
```js
{
  id: "mc_var_001",
  options: ["5", "8", "שגיאה", "undefined"],
  correctIndex: 1,
  optionFeedback: [
    "❌ זה הערך ההתחלתי — אבל let מאפשר reassignment...",
    "✅ נכון! x = 8 הציב מחדש...",
    "❌ לא תהיה שגיאה — let מאפשר...",
    "❌ x מאותחל ל-5..."
  ],
  commonMistake: "תלמידים מתבלבלים בין let ל-const...",
  explanation: "let מאפשר הצבה מחדש..."
}
```

**UI ב-`buildAnswerFeedback()`:**
- אם נכון: optionFeedback[correctIndex] + commonMistake
- אם שגוי: optionFeedback[chosen] + optionFeedback[correctIndex] + commonMistake

**LLM batch script:**
```bash
node scripts/augment-mc-feedback.js
# שולח כל MC ל-Claude API
# מחזיר optionFeedback + commonMistake
# שומר עם _aiAugmented: true
```

**Manual review:** 10% מ-1316 = 130 questions

**מאמץ:** 3 ימים (LLM batch + audit)

---

## 12. Phase 2 — מוצר ליבה לימודי (5 שבועות)

**מטרה:** הוספת השכבה הפדגוגית המתקדמת — מטאפורות, סצנות, AI Coach, Pair Match.

### 12.1 — שבוע 6: SRS Production + Gap Matrix

#### 12.1.1 — FSRS-4 Implementation

**מצב:** ב-Track A יש SM-2 בסיסי. ל-FSRS-4 (חדש, יעיל ב-15-20%) — שדרוג.

**ספרייה:** `npm install fsrs.js`

**Schema:**
```js
srsState: {
  // FSRS-4 parameters
  due: timestamp,
  stability: number,
  difficulty: number,
  elapsedDays: number,
  scheduledDays: number,
  reps: number,
  lapses: number,
  state: 'New' | 'Learning' | 'Review' | 'Relearning',
  lastReview: timestamp
}
```

**מאמץ:** 2 ימים

#### 12.1.2 — Gap Matrix Dashboard

**UI:**
- Tab חדש "📊 פערים שלי"
- 3 קטגוריות: 🟥 לא יודע (level 1-2) / 🟨 חצי (3-5) / 🟩 יודע (6-7)
- חיפוש חכם: dropdown filters
- Click on concept → ישר ל-Trainer focused on that

**מאמץ:** 2 ימים

### 12.2 — שבוע 7: Concept Metaphor Library + Pathways

#### 12.2.1 — Metaphor Library

**Schema (concept_enrichment.js):**
```js
"lesson_22::useState": {
  ...existing,
  metaphors: [
    { icon: "🍳", text: "פתק על המקרר", audience: "grandma" },
    { icon: "🎒", text: "תיק תרמיל", audience: "child" },
    { icon: "🎵", text: "כפתור עוצמה ברדיו", audience: "junior" },
    { icon: "📊", text: "Excel cell", audience: "student" },
    { icon: "🧮", text: "אבקת שכבות", audience: "general" }
  ]
}
```

**UI:**
- Carousel ב-concept card
- "בחר את שלך" — שומר העדפה ב-localStorage

**תוכן:** 5 metaphors × 50 core concepts = 250 metaphors

**מאמץ:** 4 ימים (תוכן + UI)

#### 12.2.2 — שכבת פרפר (Pathways)

**Schema:**
```js
"lesson_22::useState": {
  pathways: {
    grandma: {
      explanation: "useState מאפשר לקומפוננטה לזכור משהו...",
      visual: "[fridge with note]",
      noCodeRequired: true
    },
    parent: {
      explanation: "useState יוצר 'תיבה'...",
      analogy: "כמו פתק על המקרר",
      simpleCodeExample: "const [count, setCount] = useState(0);"
    },
    technical: { fullDepth: true } // existing
  }
}
```

**UI Toggle:**
- top של app: 👵 / 🧑‍🏫 / 👨‍💻
- localStorage שומר

**תוכן:** 30 core concepts × 3 pathways = 90 explanations

**מאמץ:** 5 ימים (חזק על תוכן)

### 12.3 — שבוע 8: Pair-Match + Bug Hunt Quests

#### 12.3.1 — Pair-Match Game

**Schema (questions_bank.js):**
```js
pair: [{
  id: "pair_react_001",
  conceptKeys: ["lesson_22::useState", "lesson_22::props", ...],
  concepts: [
    { id: 1, name: "useState" },
    { id: 2, name: "props" },
    ...
  ],
  analogies: [
    { id: 1, text: "פתק על המקרר", conceptId: 1 },
    { id: 2, text: "מתנה מההורים", conceptId: 2 },
    ...
  ]
}]
```

**UI:**
- HTML5 drag-and-drop
- 4-5 concepts ↔ 4-5 analogies (מעורבבים)
- Score: +1 לזיווג נכון, -1 לשגוי
- Animation לזיווג נכון

**מטרה:** 5-7 pair-match games

**מאמץ:** 3 ימים

#### 12.3.2 — Bug Hunt Quests (Narrative)

**Schema:**
```js
quests: [{
  id: "quest_socrates_wizard",
  title: "סוקרטס הקוסם",
  intro: "סוקרטס מנסה לכשף ספר...",
  bugs: [
    { conceptKey: "...", code: [...], bugLines: [...], description: "..." },
    // 5-8 bugs in chain
  ],
  outro: "🏆 הצלחת! ספר ה-spells פעיל."
}]
```

**UI:**
- Modal גדול עם story
- Progress: bug 1/5
- Each bug fix → unlocks next + story progression

**מטרה:** 5 quests

**מאמץ:** 4 ימים (כתיבה יוצרת + UI)

### 12.4 — שבוע 9: AI Tutor (Backend Proxy)

#### 12.4.1 — Edge Function ל-Claude API

**Supabase project setup:**
```bash
npx supabase init
npx supabase functions new ai-tutor
```

**`supabase/functions/ai-tutor/index.ts`:**
```ts
import Anthropic from 'npm:@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: Deno.env.get('ANTHROPIC_API_KEY') });

Deno.serve(async (req) => {
  const { conceptKey, level, question, mode } = await req.json();

  // Rate limiting via Supabase + Redis
  const userId = req.headers.get('X-User-Id');
  const allowed = await checkRateLimit(userId);
  if (!allowed) return new Response('Rate limit', { status: 429 });

  // Prompt caching (90% savings)
  const systemPrompt = `You are a Hebrew programming tutor for LumenPortal...`;

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1000,
    system: [{
      type: 'text',
      text: systemPrompt,
      cache_control: { type: 'ephemeral' }
    }],
    messages: [{ role: 'user', content: buildPrompt(conceptKey, level, question, mode) }]
  });

  return new Response(JSON.stringify(response.content[0]));
});
```

**Frontend integration:**
```js
async function askAITutor(conceptKey, question, mode = 'coach') {
  const userId = getUserId();
  const r = await fetch('/api/ai-tutor', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-User-Id': userId },
    body: JSON.stringify({ conceptKey, level, question, mode })
  });
  return r.json();
}
```

**Modes:**
- `coach`: שואל שאלות מנחות
- `explain`: הסבר ישיר (only for "I'm stuck")
- `review`: review של פתרון תלמיד

**Rate limits:**
- Free: 5/day
- Pro: 100/day

**מאמץ:** 4 ימים

#### 12.4.2 — Misconception Detector

**Logic:**
- Track wrong answers per concept
- אחרי 3 wrong → trigger AI analysis
- AI מקבל: concept name + wrong answers chosen
- מחזיר: pattern + targeted hint

**UI:**
- Banner: "🤖 שמתי לב שאתה תקוע ב-X. אולי..."
- Click → modal עם הסבר ספציפי

**מאמץ:** 2 ימים

#### 12.4.3 — "Explain Like I'm 5" Mode

**UI:** כפתור 🧒 על כל concept
**Prompt:** "Explain this concept using ONLY everyday analogies, no code, like to a 5yo"
**Levels:** 5, 8, 12 שנים

**מאמץ:** 1 יום

### 12.5 — שבוע 10: Cross-device Sync

#### 12.5.1 — Supabase Auth

**Setup:**
```bash
npx supabase init
# Configure email + Google OAuth
```

**Frontend:**
```js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function signInWithEmail(email) {
  const { data, error } = await supabase.auth.signInWithOtp({ email });
  // Magic link sent
}

async function signInWithGoogle() {
  await supabase.auth.signInWithOAuth({ provider: 'google' });
}
```

#### 12.5.2 — Sync Logic

**Tables:**
```sql
CREATE TABLE progress (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id),
  scores_json jsonb NOT NULL DEFAULT '{}',
  proficiency_json jsonb NOT NULL DEFAULT '{}',
  pocket_json jsonb NOT NULL DEFAULT '[]',
  reflections_json jsonb NOT NULL DEFAULT '[]',
  streaks_json jsonb NOT NULL DEFAULT '{}',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users can read their own progress" ON progress
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "users can update their own progress" ON progress
  FOR UPDATE USING (auth.uid() = user_id);
```

**Sync code:**
```js
async function syncProgress() {
  const local = {
    scores: JSON.parse(localStorage.getItem('lumenportal:scores:v1') || '{}'),
    proficiency: JSON.parse(localStorage.getItem('lumenportal:proficiency:v1') || '{}'),
    // ...
  };

  const { data: remote } = await supabase
    .from('progress')
    .select('*')
    .single();

  // Last-write-wins (per concept)
  const merged = mergeByLastUpdate(local, remote);

  // Save back
  await supabase.from('progress').upsert({ user_id: userId, ...merged, updated_at: new Date().toISOString() });
  localStorage.setItem('lumenportal:scores:v1', JSON.stringify(merged.scores));
}

// Trigger:
setInterval(syncProgress, 30000);
window.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') syncProgress();
});
```

**UI:**
- "🔄 Synced X minutes ago" indicator

**DoD:**
- משתמש מתחבר במכשיר 1 → התקדמות מסונכרנת
- משתמש פותח מכשיר 2 → אותם scores
- conflict → last-write-wins, עם UI indication

**מאמץ:** 4 ימים

### 12.6 — Sprint Plan לשיטות יצירתיות (סעיף 4.15)

**מסלול מומלץ — 3 sprints של שבועיים** (משולב לתוך Phase 1+2):

#### 🚀 Sprint 1 (שבועיים) — "Quick Pedagogical Wins"
**הרכב:** Anti-Pattern Gallery (S) + Mnemonics Lab (S) + Flashcards UI (M)

**משימות:**
1. **Anti-Patterns** (3-4 ימים)
   - צור `data/anti_patterns.js` (8 מושגים × 3-5 דפוסים = ~30 רשומות)
   - תוכן: הרחב את `concept.commonMistakes` הקיימים לפורמט bad/damage/good/diff
   - UI: section חדש ב-`renderConceptCard` עם accordion (אדום/ירוק)
   - CSS: `.anti-pattern-card`, `.bad-code`, `.good-code`, `.code-diff`
2. **Mnemonics** (2-3 ימים)
   - צור `data/mnemonics.js` (8 מושגים קשים)
   - תוכן: ראשי-תיבות + חרוזים עבריים
   - UI: section עם acronym חתוך + expansion + rhyme
3. **Flashcards UI** (1 שבוע)
   - הסתמכות על `lib/srs.js` הקיים (Track A — FSRS-4 כ-evolution של SM-2)
   - Tab חדש "🃏 כרטיסיות"
   - יצירת `data/flashcards.js` (5-10 כרטיסיות פר מושג)
   - UI: front/back flip, דירוג Easy/Good/Hard/Again

**DoD Sprint 1:**
- 3 קבצי data חדשים נטענים ב-content-loader
- `node scripts/validate_bank.js --strict` עובר
- בדיקה ידנית: 1 מושג קשה (useEffect) — אנטי-פטרן + מנמוניקה + פלאשקארט מוצגים

#### 🎬 Sprint 2 (שבועיים) — "Visual Mental Models"
**הרכב:** Mental Model Animator (M) + War Stories Library (M)

**משימות:**
1. **Mental Model Animator** (1 שבוע)
   - צור `data/animations.js` (5-6 מושגים: useEffect, re-render, dependency array, infinite loop, stale closure, useState batching)
   - UI: SVG/HTML stepper עם Next/Prev/Auto-play
   - frames: phase, state diff, dom snippet, log, note
   - השתמש ב-CSS transitions (לא צריך GSAP בשלב זה)
2. **War Stories** (1 שבוע)
   - צור `data/war_stories.js` (8 מושגים × 3-5 סיפורים = ~30 incidents)
   - תוכן: הרחב מ-`concept.junior` הקיים (יש 1 סיפור) ל-3-5
   - שדות: title, context, bug, diagnosis, fix, lesson, severity, hours
   - UI: רשימת cards עם פתיחה/סגירה. סינון לפי severity (P0/P1)

**DoD Sprint 2:**
- ANIMATIONS + WAR_STORIES נטענים
- 1 מושג קשה (useEffect) עם animator + 5 war stories עובד
- Mobile (≤768px) — animator מותאם

#### 🎯 Sprint 3 (שבועיים) — "Comparative Learning"
**הרכב:** Side-by-Side Comparator (S) + What-If Simulator (M)

**משימות:**
1. **Side-by-Side Comparator** (3-4 ימים)
   - צור `data/comparisons.js` (8-10 השוואות: useState/useReducer, useMemo/useCallback, props/Context, map/filter/reduce, async/await/Promise, var/let/const, == /===, function/arrow, class/function components, REST/GraphQL)
   - UI: טבלה responsive עם 2 עמודות + שורות (מטרה, syntax, מתי, performance)
   - Tab/section ייעודי "⚖️ השוואות"
2. **What-If Simulator** (1 שבוע)
   - צור `data/what_if.js` (5-6 מושגים)
   - שדות: code template עם placeholders, knobs (toggles), outcomes
   - UI: כפתורי toggle → מחליף את הקוד וה-output במציאות
   - השתמש ב-Sandpack (Phase 1 W4) להרצה אמיתית, או mock outcomes

**DoD Sprint 3:**
- COMPARISONS + WHAT_IF נטענים
- 1 השוואה (useState/useReducer) עובדת אינטראקטיבית
- 1 what-if (useEffect deps) משנה outcome בזמן אמת

#### 🎨 Phase 2 Extended (אופציונלי, אחרי Sprint 1-3)
- **Time Machine** (M) — 6 מושגים מרכזיים
- **Concept Comic** (M) — 8 מושגים × 4-6 פאנלים
- **Audio Mode** (S) — כבר ב-Track D D1, יבוצע שם
- **Concept Map** (L) — Tab ייעודי מסך מלא, D3.js
- **Reverse Q&A** (M) — Jeopardy mode

**זמן משוער כולל ל-12 השיטות:** ~10-12 שבועות (משולב ב-Phase 1-3 הראשי).

---

## 13. Phase 3 — אינטליגנציה + Sync (6 שבועות)

**מטרה:** הוספת ה-pedagogical wins הקריטיים — Themed Scenarios, Counterfactuals, Daily Reflection, 60-Sec Wrap-Up, Streaks, Real Visuals.

### 13.1 — שבוע 11: Themed Scenarios + Counterfactuals

**Themed Scenarios:**
- Schema: `scenarios: { kitchen, shop, classroom, sports }`
- 5 scenarios × 30 core concepts = 150 scenarios
- UI: dropdown "👩‍🍳 הראה במטבח" → swap explanation

**Counterfactuals:**
- Schema: `counterfactual: { code, problem, why }`
- 30 critical concepts
- UI: "🤔 מה היה בלי?" button

**מאמץ:** שבוע מלא

### 13.2 — שבוע 12: Streaks + Daily Reflection + 60-Sec Wrap-Up

- Streaks tracking + 🔥 widget + freeze logic
- Friday 18:00 reflection modal
- Lesson-end 60-sec wrap-up
- Achievement system (30 ראשונים)
- XP + global level

**מאמץ:** שבוע מלא

### 13.3 — שבוע 13: Real-Object Visuals + Animations

- 50 תמונות מ-Unsplash (free) ל-grandma levels
- 10 animated concept videos (60-90 שניות)
- כלי: Motion Canvas או SVG + GSAP

**מאמץ:** שבועיים (כלל הplanning + animations)

### 13.4 — שבוע 14: Prerequisite Graph

- שדה `prerequisites: ['lesson_22::useState']` בכל מושג
- UI: warning בעת כניסה למושג ללא prereqs
- Knowledge map: ויזואליזציה של dependency tree
- "Suggested next" אחרי mastery

**מאמץ:** שבוע (תוכן עיקר)

### 13.5 — שבועות 15-16: Vite Migration + Modularization

**מטרה:** פיצול app.js (4598 שורות) למודולים.

**Structure חדש:**
```
src/
  main.js
  views/
    guide.js
    trainer.js
    knowledge-map.js
    study-mode.js
    code-blocks.js
    code-trace.js
    code-anatomy.js
    mock-exam.js
  core/
    scoring.js
    rng.js
    srs.js
    bank.js
    proficiency.js
  ui/
    concept-card.js
    extras-panel.js
    pocket-card.js
    glossary.js
    tts.js
  utils/
    helpers.js
```

**Vite config:**
```js
// vite.config.js
export default {
  build: {
    rollupOptions: {
      input: 'index.html',
      output: {
        manualChunks: {
          vendor: ['@codesandbox/sandpack-react'],
          data: ['./data/questions_bank_seeded.js']
        }
      }
    }
  }
};
```

**TypeScript בהדרגה:**
- שלב 1: tsconfig + jsconfig עם checkJs
- שלב 2: rng.ts, srs.ts (foundation)
- שלב 3: scoring.ts, bank.ts
- שלב 4: views/

**מאמץ:** שבועיים

---

## 14. Phase 4 — קנה מידה + קהילה (8+ שבועות)

### 14.1 — Teacher Dashboard

- Class creation
- Student view
- Concept heatmap
- Risk alerts
- Assignment system
- Bulk import (CSV)

**מאמץ:** 3 שבועות

### 14.2 — Community Layer

- Discussion threads per concept
- Upvote/downvote
- Reputation system
- Moderation tools

**מאמץ:** 3 שבועות

### 14.3 — Peer Code Review

- Submit solution
- AI matching (peer same level)
- Review template
- XP system

**מאמץ:** 2 שבועות

### 14.4 — Mentor Matching

- Master-level eligibility
- Async chat
- Reputation, rating

**מאמץ:** 2 שבועות

### 14.5 — Mobile Native (Optional)

- React Native rewrite
- iOS + Android
- Push notifications
- App Store + Google Play

**מאמץ:** 8 שבועות

---

## 15. תהליכי עבודה (Work Cadence)

### 15.1 — לכל שינוי קוד

1. ✅ `node scripts/validate_bank.js --strict` עובר
2. ✅ Vitest: כל הtests עוברים
3. ✅ בדיקה ויזואלית של 1+ lesson
4. ✅ בדיקת console — 0 errors
5. ✅ Code review מ-1 session/team member

### 15.2 — לכל פיצ'ר חדש

חובה להגדיר לפני שמתחילים:

1. **🎯 יעד פונקציונלי** — משפט אחד: "תלמיד יוכל ל-X"
2. **📊 פרמטר מדידה** — איך נדע שזה עובד? (KPI ברור)
3. **🔙 נקודת ביטול (rollback)** — איך מבטלים אם נכשל?

### 15.3 — Pre-release Checklist (לפני merge ל-main)

- [ ] `node scripts/validate_bank.js --strict` עובר
- [ ] Vitest passes
- [ ] Playwright e2e passes (top-level routes)
- [ ] Lighthouse ≥ 90 בכל קטגוריה
- [ ] axe DevTools 0 errors
- [ ] Manual: 3 lessons בעברית עובדים
- [ ] Manual: Mock exam → submit → result מוצג
- [ ] Manual: Mobile (320px width) — UI לא נשבר
- [ ] CI ירוק
- [ ] PR description עם DoD checklist

### 15.4 — Sprint Cadence

- **Sprint 1 שבוע** (week-by-week)
- **Demo כל שבוע** — מה עובד עכשיו
- **Retro כל 2 שבועות** — מה עבד, מה לא, מה לשפר

---

## 16. תכנית בדיקות (QA Plan)

### 16.1 — Unit Tests (Vitest)

**מודולים קריטיים (חובה):**
- `lib/rng.js` — determinism, edge cases
- `lib/srs.js` — intervals, lapses, ease
- `core/scoring.js` — applyAnswer, level progression, V button
- `core/bank.js` — pickWeightedConcept, weightFor
- `core/proficiency.js` — get/set, migration

**יעד coverage:** 80%+ ב-core/, 50%+ ב-views/

### 16.2 — E2E Tests (Playwright)

**Top-level flows:**
1. Guide → answer 1 question → see proficiency update
2. Trainer → 3 questions → level advances
3. Mock Exam → 30 questions → submit → result
4. Code Trace → 5 steps → final answer
5. Bug Hunt → identify line → fix
6. Mini Build → write code → tests pass
7. State persistence: refresh → state preserved
8. PWA install → works offline

**יעד:** 8 e2e tests, runtime < 5 minutes

### 16.3 — Content QA

**10% Sample Audit (לכל batch חדש):**
- 10% מה-MC seeded → ידני מאושר/נדחה
- 10% מה-traces → ידני
- כל הreal animations → ידני

**Distractor Objectivity Audit:**
- כל MC → distractors הם common mistakes (לא רנדומליים)
- AI helper: בקש מ-Claude לסקור 50 random questions

### 16.4 — Accessibility QA

- axe DevTools (automated): 0 errors
- Manual screen reader: VoiceOver על Mac, NVDA על Windows
- Keyboard-only: 1 lesson + 1 quiz

### 16.5 — Performance QA

- Lighthouse: כל view ≥ 90
- Web Vitals: LCP, FID, CLS in green
- Bundle size: < 500KB initial

---

## 17. Definition of Done לכל שלב

### Phase 1 DoD
- [x] 0 boilerplate (already done)
- [x] 0 missing difficulty (already done)
- [x] 0 ambiguity warnings (already done)
- [ ] Lazy loading active (1.4MB seeded loaded only when needed)
- [ ] Per-card refresh implemented
- [ ] Vitest 5+ tests passing in CI
- [ ] ARIA labels on all icon buttons
- [ ] Keyboard navigation works for 1 full lesson
- [ ] prefers-reduced-motion honored
- [ ] Light mode toggle works
- [ ] PWA installable
- [ ] Sandpack embedded
- [ ] Bug Hunt: 28+ questions
- [ ] Mini Build: 21+ exercises
- [ ] Mock Exam: 5 templates + history
- [ ] Per-distractor feedback on 100% of MC

### Phase 2 DoD
- [ ] FSRS-4 active
- [ ] Gap Matrix dashboard
- [ ] Metaphor Library: 250 metaphors
- [ ] Pathways (3-track): 30 core concepts
- [ ] Pair-Match: 5+ games
- [ ] Bug Hunt Quests: 5 narrative quests
- [ ] AI Tutor: rate-limited, 3 modes (coach/explain/review)
- [ ] Misconception detector active
- [ ] "Explain Like I'm 5" works
- [ ] Cross-device sync: Supabase auth + progress sync
- [ ] **Creative Methods Sprint 1** done: Anti-Patterns (~30) + Mnemonics (8) + Flashcards UI
- [ ] **Creative Methods Sprint 2** done: Animator (5-6 concepts) + War Stories (~30 incidents)
- [ ] **Creative Methods Sprint 3** done: Side-by-Side (8-10 comparisons) + What-If (5-6 simulators)

### Phase 3 DoD
- [ ] Themed Scenarios: 150 scenarios
- [ ] Counterfactuals: 30 critical concepts
- [ ] Streaks + Daily Reflection + 60-sec Wrap-Up
- [ ] Real-Object Visuals: 50 images
- [ ] Animated Visualizations: 10 concepts
- [ ] Prerequisite Graph: complete dependency tree
- [ ] Vite migration done
- [ ] App.js modularized
- [ ] TypeScript on core/ modules
- [ ] **Creative Methods Phase 2 Extended:** Time Machine (6) + Comics (8) + Concept Map + Reverse Q&A

### Phase 4 DoD
- [ ] Teacher Dashboard live
- [ ] Community Discussions
- [ ] Peer Code Review
- [ ] Mentor Matching
- [ ] (Optional) Mobile Native

---

## 18. נספח: כללי תיאום בין sessions

### 18.1 — חוקי ברזל לעבודה מקבילית

1. כל session ב-branch משלו
2. אסור עבודה על main directly
3. PR חייב לעבור CI
4. Code review מ-1 session אחר
5. אם conflict בין tracks — מי שראשון פותר

### 18.2 — חלוקת קבצים ל-tracks

**Track A — Foundation (Owner: Session 1)**
- `app.js` lines 1-1500 (logic, scoring, RNG)
- `scripts/`
- `lib/`
- `.github/workflows/`
- `data/questions_bank.js` header only

**Track B — Content #1 (Owner: Session 2)**
- `data/ai_development.js`
- `data/react_blueprint.js`
- `data/concept_enrichment.js` (sections: lesson_ai_development, lesson_react_blueprint)
- `data/questions_bank.js` (fix specific fill IDs)

**Track C — Content #2 (Owner: Session 3)**
- `data/workbook_taskmanager.js`
- `data/lesson_closures.js` (NEW)
- `data/lesson{11-20}.js` (difficulty additions only)
- `data/concept_enrichment.js` (sections: lesson_closures, lesson_01..10)

**Track D — UX Quick Wins (Owner: Session 4)**
- `app.js` lines 2000+ (UI)
- `index.html` (script tags only)
- `style.css` (append only)
- `data/glossary.js`

### 18.3 — Merge Order

1. **Track A** ראשון (foundation — אחרים תלויים)
2. **Tracks B + C** במקביל (לא חופפים)
3. **Track D** אחרון (אינטגרציה)

### 18.4 — Conflict Resolution

- אם conflict על `app.js`: A מתמזג ראשון, D pulls + resolves
- אם conflict על `concept_enrichment.js`: כל section נפרד
- אם conflict על `questions_bank.js`: A מוסיף header, B/C מוסיפים content

### 18.5 — STATUS Section (יתעדכן)

```
Track A: ✅ Merged in PR #8 (Foundation done)
Track B: ✅ Merged in PR #8 (Content #1 done)
Track C: ✅ Merged in PR #8 (Content #2 done)
Track D: ⏸️ Paused — to resume after PR #8 merged

Next priorities:
- Phase 1 W1.1 (Lazy load) — Session 1
- Phase 1 W1.3 (Vitest) — Session 1
- Phase 1 W2 (a11y) — Session 4 (after D resumes)
```

---

## 🎯 הערה אחרונה

המסמך הזה מייצג את ה-"true north" של LumenPortal. כל החלטה תכנונית בעתיד תיבחן מולו.

**הכלל הזהב — אם נסטה ממנו, נחזור:**
> "פיצ'ר נחשב סוגר רק כשתלמיד אמיתי השתמש בו ולא דיווח על באג, *ובאותה הזדמנות* — חזר."

המסמך הזה הוא חי. עדכן בדחיפות אם:
- KPIs לא מתקיימים → re-evaluate phase
- מתחרה חדש מופיע → update value prop
- טכנולוגיה משתנה (React 20, וכו׳) → update stack
- משתמשים נותנים feedback קריטי → adjust priorities

**גרסה הבאה** (V6.0): אחרי Phase 1 — עדכון לפי ביצועים בשטח.
