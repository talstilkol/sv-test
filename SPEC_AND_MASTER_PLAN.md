# LumenPortal — מסמך איפיון מלא + Master Plan לביצוע

> תאריך: 2026-04-28 · גרסה: 5.4 · סטטוס: מסמך פעיל
>
> מסמך זה מאחד ומחליף את: PRODUCT_SPEC.md, MASTER_PLAN.md, MASTER_PLAN_V2.md, MASTER_PLAN_V3.md, COORDINATION.md.
> מבוסס על: כל הסבבים של דיון, AUDITs, COMPETITIVE_ANALYSIS, ועבודת Tracks A-D.

---

# 📑 תוכן עניינים

**חלק I — איפיון מוצר (Product Specification)**
0. יעד ראשי מחייב — SVCollege Readiness + Site Health
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
18. Re-baseline 2026-04-28 — Quality Governance + 90-Day Roadmap
19. נספח: כללי תיאום בין sessions
20. נספח: מוזיאון היסטורי לשפות התכנות
21. Phase 6 — Learning Evidence + Productization
22. Phase 7 — Learning OS + Outcome Scale

---

# 0. יעד ראשי מחייב — SVCollege Readiness + Site Health

היעד הראשון של LumenPortal הוא לא עוד הרחבות. היעד הראשון הוא:

> **כיסוי מלא של חומר SVCollege + אתר שכל החלקים המרכזיים בו עובדים בפועל.**

כל הרחבה אחרת — מוזיאון, קהילה, AI Tutor production, Teacher Dashboard, native mobile, סרטונים ואלמנטים פרימיום — יורדת לעדיפות שנייה עד ש-SVCollege Readiness ירוק.

## 0.1 סדר עדיפויות מחייב

1. **SVCollege curriculum coverage** — כל מודול ציבורי של SVCollege חייב להיות ממופה ל-lesson / practice / mock exam / gap task.
2. **Site health** — כל טאב, תת-תפריט, מודל, מצב תרגול ומסך תוצאה חייב להיפתח בלי שגיאת runtime.
3. **Assessment readiness** — מבחן מדומה ייעודי ל-SVCollege חייב לדגום את כל המודולים, לא רק JS/React/Node.
4. **Content before expansion** — לא מוסיפים פיצ'רי הרחבה משמעותיים עד שסוגרים את פער AI Engineering, ומקשיחים את ה-partials שנותרו.

## 0.2 מיפוי SVCollege נוכחי

המיפוי הקנוני נמצא ב-[data/course_blueprints.js](data/course_blueprints.js) והדוח הניהולי נמצא ב-[SVCOLLEGE_COVERAGE_REPORT.md](SVCOLLEGE_COVERAGE_REPORT.md).

סטטוס תמציתי:

- Covered: HTML/CSS foundations, Git/tooling, JavaScript basics, DOM, React, TypeScript, Node/Express/REST, Tailwind responsive, DB including SQL/ORM, Auth/Security, Next.js, AI coding tools.
- Partial: shadcn/UI.
- Gap: AI Engineering with Vercel AI/OpenAI/LangChain/RAG/Agents/Fine-tuning.
- Covered update: Nest.js bridge now covers modules, controllers, providers/services, dependency injection, DTO, validation pipe, guards, pipes, middleware, interceptors, exception filters, repository pattern and testing module.
- Covered update: DevOps bridge now covers production readiness, env vars, Vercel deploy/preview, build command, Docker/Dockerfile/image/container, Docker Compose, services/volumes, health checks, CI/CD, smoke tests and release checklist.

## 0.3 Definition Of Done לפני הרחבות

- כל מודול SVCollege מסומן Covered/Partial/Gap עם משימת סגירה.
- כל Covered/Partial מקבל לפחות תרגול אחד: MC, Fill, Trace, Bug או Build.
- כל שאלה קשה מקבלת "חוזה למידה": דרישות קדם, מונחים שחייבים לדעת, והסבר צדדי קצר לפני או אחרי הטעות.
- כל הטאבים הקריטיים עוברים smoke test בדפדפן בשני גדלים: desktop ו-mobile.
- CI כולל `npm audit`, validation, feature coverage, question quality, no-Math.random, Vite build smoke ו-Vitest.
- אין PR פתוח שמוסיף הרחבה גדולה בלי לקשור אותה ישירות ל-SVCollege readiness.

## 0.4 שדרוג תוכנית קדימה — 2026-04-28

המערכת כבר עשירה בפיצ'רים, אבל הסיכון המרכזי הוא לא חוסר רעיונות אלא חוסר קו סיום חד. לכן השיפור האסטרטגי הבא הוא להפוך את SVCollege ל-"מסלול נמדד" לפני שמוסיפים עוד חוויות.

1. **Learning Contract לכל שאלה** — שאלה לא יכולה להיות "קשה" בלי לציין מה צריך לדעת כדי לפתור אותה. כל פריט מבחן יקבל דרישות קדם, מונחי חובה, והסבר צדדי שמחזיר את התלמיד לרעיון הבסיסי.
2. **SVCollege Command Center** — מסך אחד שמראה readiness, gaps, release blockers, בריאות טאבים, איכות שאלות ומשימת העבודה הבאה.
3. **Tab Coverage Matrix** — לא מספיק שיש שיעור. כל מודול SVCollege חייב להופיע בשיעורים, מאמן, מבחן מדומה, Code Trace, Mini Build, Flashcards, Gap Matrix, מפת ידע ותפריט הצד.
4. **Lesson Source Registry** — כל חומר גלם ב-`lessons/` יקושר לשיעור, מושגים, שאלות ותוצרי תרגול. כך אפשר לדעת מה כבר נוצל ומה עדיין לא הומר לתוכן אינטראקטיבי.
5. **Question Quality Pipeline** — בדיקת distractors, רמזי אורך, near-duplicates, ambiguity ודרישות קדם הופכת לחלק מהשער לפני `covered`.
6. **Real Learner Outcome Loop** — לפני Teacher Dashboard גדול או קהילה, מודדים 10 תלמידים: baseline, שימוש שבועי, מבחן חוזר, ושאלות שבהן נתקעו.

משימות הביצוע החדשות נמצאות ב-`EXECUTION_TASKS.md` תחת P-1.8 עד P-1.11.

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

### 8.6 KPIs לממשל איכות

| מדד | יעד |
|---|:-:|
| Feature Completion Accuracy | ≥ 95% מהסעיפים שסומנו Done מאומתים בקוד/בדיקה/UX |
| Content Coverage Ratio | מדווח לכל מודול כ-implemented/target |
| Question Quality Index | ≥ 90% שאלות ללא warning |
| Status Drift | 0 סעיפי Done ללא evidence |
| Wrong-answer capture coverage | 100% ממשטחי השאלה הפעילים רושמים concept/topic לחולשות |
| D7/D30 retention before/after FSRS | נמדד לפני שינוי ואחרי 30 יום |
| Stability KPI | ≤ 2 שגיאות פיצ'ר ל-1,000 sessions |
| Weekly deterministic audit | 10% מבנק השאלות בכל שבוע או batch |

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
- **Programming Language Museum** (M) — מוזיאון היסטורי: חשמל → ביטים → קוד מכונה → שפות → React/Node/Next

**זמן משוער כולל לשיטות היצירתיות:** ~10-12 שבועות (משולב ב-Phase 1-3 הראשי).

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
4. **📌 מדד כיסוי** — כמה מתוך היעד הושלם בפועל (`implemented/target`)
5. **🧪 Evidence** — בדיקות, צילום/וידוא browser, או דוח audit שמוכיחים שהפיצ'ר עובד

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

### 15.4 — Release Trains דו-שבועיים

- **רכבת כל 2 שבועות** — release קטן, מדיד, וניתן rollback.
- **70% סגירת חוב / 30% יכולות חדשות** — עד ש-Question Quality, Sync, ו-coverage gates ירוקים.
- **שבוע 1:** implementation + unit tests + content coverage counters.
- **שבוע 2:** hardening + browser verification + QA reports + docs.
- **Moonshots מוקפאים** אם יש סעיפי Done ללא evidence או Quality Index מתחת ליעד.
- **Demo כל שבוע** — רק פיצ'רים עם metric/evidence מוצגים כ-Done.
- **Retro כל 2 שבועות** — בודקים Status Drift, warnings חוזרים, ופריטי rollback.

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
- AI helper: בקש מ-Claude לסקור 50 שאלות במדגם דטרמיניסטי קבוע

**Question Quality Gates (חדש בעקבות ביקורת 2026-04-28):**
- Similarity gate: חסימת distractors דומים מדי מעל סף שיוגדר ב-CI.
- Length-cue gate: התרעה כאשר התשובה הנכונה בולטת באורך חריג.
- Generic wording gate: התרעה על ניסוחים כלליים שמאפשרים ניחוש.
- Fill ambiguity gate: חסימת תשובות Fill שיש להן כמה פתרונות סבירים או answer leakage מתוך הקוד.
- `questionQuality` לכל פריט: difficulty + clarity + distractorQuality + warning count.
- Weekly deterministic audit: 10% מבנק MC/Fill בדטרמיניזם מלא, עם remediation queue.
- `npm run quality:questions` מציג דוח מלא לכל בנק MC/Fill.
- `npm run quality:questions:write` כותב `QUESTION_QUALITY_REPORT.json` ו-`QUESTION_QUALITY_REPORT.md`.
- `npm run quality:questions:strict` משמש כ-CI gate ונכשל על blocker-level בלבד.
- `npm run quality:remediation` מציג תור תיקון דטרמיניסטי לשאלות עם warning/note.
- `npm run quality:remediation:write` כותב `QUESTION_REMEDIATION_QUEUE.json` ו-`QUESTION_REMEDIATION_QUEUE.md`.
- `npm run quality:remediation:strict` משמש כ-CI gate ונכשל אם נשאר blocker בתור.
- `npm run qa:questions` מציג מדגם QA ידני דטרמיניסטי של 10% מהבנק.
- `npm run qa:questions:write` כותב `QUESTION_QA_CHECKLIST.json` ו-`QUESTION_QA_CHECKLIST.md`.
- `npm run qa:questions:strict` מאמת גודל מדגם וייחודיות ids ב-CI.
- `npm run qa:lesson-quiz-keys` מאמת שלכל `lesson.quiz` יש concept routing מפורש.
- `npm run qa:lesson-quiz-keys:write` כותב `LESSON_QUIZ_KEYS_REPORT.json` ו-`LESSON_QUIZ_KEYS_REPORT.md`.
- `npm run qa:lesson-quiz-keys:strict` נכשל אם חסר מיפוי או אם מפתח לא קיים במושגי השיעור.

**Feature Coverage Counters:**
- `npm run coverage:features` מציג כיסוי מודולים מהקבצים עצמם.
- `npm run coverage:features:write` כותב `FEATURE_COVERAGE_REPORT.json` ו-`FEATURE_COVERAGE_REPORT.md`.
- `npm run coverage:features:strict` משמש כ-CI gate ליעדים שנאכפים כבר עכשיו, וגם חוסם מודול `Done` שאין לו `outcomeMetric` או evidence מהריפו.
- הדוח נחשב מקור אמת לכיסוי תוכן; staged partials נשארים גלויים בלי לחסום CI עד שמוגדר להם threshold מחייב.

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

### Global Done Policy

סטטוס `Done` מותר רק כאשר קיימים כל אלה:

1. קוד או תוכן הושלמו מול יעד מדיד.
2. בדיקות רלוונטיות עברו (`validate_bank`, Vitest, Playwright, או QA ידני לפי סוג הפיצ'ר).
3. בוצע וידוא UX/browser כאשר יש שינוי משתמשי.
4. התיעוד ורשימת המשימות עודכנו.
5. יש metric/evidence ברור: `implemented/target`, דוח audit, צילום/בדיקה, או KPI.
6. קיימת נקודת rollback או דרך כיבוי לפיצ'ר מסוכן.
7. PR משתמש בתבנית `.github/pull_request_template.md` ומצהיר goal, metric, evidence, rollback.

סטטוסים מותרים:
- `Done` — כל התנאים למעלה מולאו.
- `Partial` — יש UX/קוד עובד, אבל חסר כיסוי יעד, אינטגרציה, deploy, או QA.
- `Deferred` — נדחה במודע בגלל תלות או החלטת scope, עם סיבה מפורשת.
- `Blocked` — אי אפשר להמשיך בלי קלט/גישה/תלות חיצונית.

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

### Phase 5 DoD — Quality Governance + Rebaseline
- [x] Feature coverage counters קיימים לכל מודול תוכן מרכזי.
- [x] Status accuracy report נוצר מהריפו, לא ידנית בלבד.
- [x] Question Quality Pipeline פעיל: similarity, length-cue, generic wording, Fill ambiguity.
- [x] Weekly deterministic 10% audit רץ ומייצר remediation queue.
- [x] Wrong-answer weakness agent רושם אוטומטית מושג/נושא בכל טעות ומציג הסבר + אסוציאציה קיימת.
- [ ] Playwright smoke מכסה את כל הטאבים המרכזיים עם console-error gate.
- [ ] Schema contracts קיימים ל-Lesson/Concept/Question/Trace/Build.
- [ ] 90-day roadmap waves נעולות למדדים ולא רק לרשימת פיצ'רים.

---

## 18. Re-baseline 2026-04-28 — Quality Governance + 90-Day Roadmap

### 18.1 Evidence Reconciliation

הביקורת מצביעה נכון על הסיכון המרכזי: סטטוס שמדווח כ-Done בלי כיסוי מדיד. יחד עם זאת, חלק מהמספרים בביקורת כבר לא משקפים את מצב הריפו לאחר סבבי תיקון:

| תחום | מצב מאומת בריפו | סטטוס ניהולי |
|---|---:|---|
| Anti-Patterns | 22/22 patterns | Done |
| War Stories | 31/30 incidents | Done |
| Mini Builds | 21/21 builds | Done |
| Option Feedback | 50 MC IDs / full MC bank | Partial |
| Vitest | 106 tests passing | Done |
| AI Tutor | UI + demo fallback + edge-function skeleton | Partial until production Alpha |
| Cross-device Sync | Export/Import + Supabase table; no live sync | Partial |
| Feature Coverage Counters + CI Gate | 22 modules tracked; 21 Done, 1 Partial; strict gate active | Done |
| Question Quality Pipeline | 1,894 questions tracked; 0 blockers; QQI 88.2%; 683 remediation rows; 190-row 10% QA sample; weekly CI active | Done for blocker gate, remediation active |
| Lesson Quiz Concept Keys | 133/133 lesson quiz items mapped; 0 invalid keys; strict CI active | Done |
| Wrong-answer Weakness Agent | Trainer, guide, inline quizzes, code blocks, trace, mock exam, and bug quests record concept/topic weakness and show feedback | Done |

### 18.2 14 הימים הקרובים

1. להעלות Per-Distractor Feedback מ-top 50 ל-25% מבנק ה-MC.
2. להרחיב thresholds ל-staged partials כאשר הם מגיעים ליעדי 25%/50%/100%.
3. להעלות Question Quality Index מ-88.2% ל-90%+ על ידי סגירת near-duplicate ו-answer-visible warnings.
4. להשתמש ב-PR/DoD template בכל שינוי: goal + metric + rollback + evidence.
5. לסגור Status Drift: כל Done ללא evidence חוזר ל-Partial.

### 18.3 30 הימים הקרובים

1. לסגור remediation batch 1-4: להוסיף conceptKey חסר ולתקן fill leakage warnings.
2. להמיר note/warning patterns חוזרים ל-thresholds מחמירים לאחר תיקון הבאטצ'ים הראשונים.
3. להוסיף Playwright smoke לכל הטאבים המרכזיים.
4. להגדיר schema contracts לתוכן ו-loader validation.
5. למדוד baseline לשימור לפני/אחרי FSRS, Gap Matrix ו-Pathways.

### 18.4 90 הימים הקרובים

1. AI Tutor Alpha עם guardrails, rate limits, logging ו-coach mode שלא נותן תשובות ישירות.
2. Cross-device Sync live: auth, progress sync, last-write-wins, sync indicator.
3. Teacher Dashboard Lite: כיתה, רשימת תלמידים, heatmap התקדמות, risk alerts בסיסיים.
4. Pair-Match ו-Bug Quests hardening מול QA אמיתי.
5. Business/learning KPIs: D7/D30, mastery rate, exam pass rate, teacher adoption.

### 18.5 Business Priority Order

1. איכות ותוקף פדגוגי: Question/Distractor Quality.
2. Personalization אמיתי: FSRS-4, Pathways, Gap Matrix, prerequisite support.
3. סקייל תפעולי: AI Tutor, Sync, Teacher Dashboard Lite.
4. חוויות פרימיום: visuals, comics, clips, moonshots.

---

## 19. נספח: כללי תיאום בין sessions

### 19.1 — חוקי ברזל לעבודה מקבילית

1. כל session ב-branch משלו
2. אסור עבודה על main directly
3. PR חייב לעבור CI
4. Code review מ-1 session אחר
5. אם conflict בין tracks — מי שראשון פותר

### 19.2 — חלוקת קבצים ל-tracks

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

### 19.3 — Merge Order

1. **Track A** ראשון (foundation — אחרים תלויים)
2. **Tracks B + C** במקביל (לא חופפים)
3. **Track D** אחרון (אינטגרציה)

### 19.4 — Conflict Resolution

- אם conflict על `app.js`: A מתמזג ראשון, D pulls + resolves
- אם conflict על `concept_enrichment.js`: כל section נפרד
- אם conflict על `questions_bank.js`: A מוסיף header, B/C מוסיפים content

### 19.5 — STATUS Section (יתעדכן)

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

## 20. נספח: מוזיאון היסטורי לשפות התכנות

### 20.1 מטרת הפרק

המוזיאון ההיסטורי נועד לסגור פער עומק שחוזר אצל תלמידים: הם לומדים React/Node/TypeScript, אבל לא מבינים מאיפה נולדו הערכים, השפות, ה-runtime וה-frameworks. בלי הקשר היסטורי, כל טכנולוגיה חדשה נראית כמו “קסם חדש”. עם הקשר, התלמיד רואה רצף:

**חשמל → טרנזיסטור → ביט → שער לוגי → קוד מכונה → Assembly → שפה גבוהה → runtime/framework → אפליקציה.**

### 20.2 MVP שבוצע

- תת-טאב `🏛️ מוזיאון` בתוך `🧱 אבני בסיס`.
- 9 אולמות היסטוריים: חומרה, קוד מכונה, שפות גבוהות מוקדמות, structured programming, C/systems, OOP/VM/GC, Web, frameworks, עתיד.
- 27 מוצגים עם שנה/טווח, ממה נבנה, מה פרץ דרך, ואיך זה מתחבר לקוד שהתלמיד כותב.
- 5 שושלות רעיונות: חומרה, אובייקטים, web, מדע/AI, נתונים/עסקים.
- רשימת הרחבות עתידיות: compiler lab, אותו תפריט ב-8 שפות, graph משפחות שפות, מעבדת JIT/interpreter, source cards.

### 20.3 הרחבות מומלצות להשלמת הידע ההיסטורי

1. **מעבדת Compiler/Interpreter/JIT:** תרשים אינטראקטיבי של parse → AST → bytecode/machine code → runtime.
2. **אותו רעיון בשפות שונות:** לבנות משתנה, מערך, פונקציה ותפריט ב-C, Java, Python, JS, TS, React, Node, Next.
3. **מפת משפחות שפות:** Graph של השפעות בין FORTRAN, Lisp, ALGOL, BCPL, B, C, C++, Java, C#, Python, JavaScript, TypeScript, Rust.
4. **מעבדת ביצועים:** להסביר מהירות לפי שכבות: native compile, VM/JIT, interpreter, GC, C extensions, WebAssembly.
5. **כרטיסי מקור היסטוריים:** לכל תחנה — מקור, תאריך, ומה בטוח/לא בטוח היסטורית.
6. **Quests לתלמיד:** “מצא מי האבא של React”, “למה TypeScript לא מהירה יותר מ-JS?”, “למה C מסוכנת ומה Rust ניסתה לתקן?”.

### 20.4 DoD מלא למוזיאון

- [x] MVP: טאב עובד, RTL, responsive, עם תפריט צד ענפי.
- [x] לפחות 9 אולמות ו-25+ מוצגים.
- [x] לפחות 5 שושלות רעיונות שמחברות שפות לטכנולוגיות מודרניות.
- [ ] לכל מוצג יש מקור היסטורי קצר ומאומת.
- [ ] לפחות 20 שאלות/משימות קצרות שמוודאות שהתלמיד מבין “למה השפה נולדה”.
- [ ] מעבדת compiler/JIT אינטראקטיבית.
- [ ] Graph משפחות שפות עם קפיצה מהציר ההיסטורי לתרגול קוד.

### 20.5 כללי אמינות

- אין להוסיף תאריך היסטורי בלי מקור. אם יש מחלוקת, משתמשים בטווח.
- לא מדרגים שפות כ"טובות/גרועות"; מדרגים התאמה למשימה, שכבות runtime, בטיחות, ביצועים, אקוסיסטם ועלות תחזוקה.
- לא מציגים framework כתחליף לאבני בסיס. React/Next תמיד מוסברים כהמשך של arrays, objects, functions, state ו-DOM.
- אין להציג AI כתחליף להבנה. AI הוא כלי עזר; הבנת השכבות היא מנגנון הבקרה.

---

## 21. Phase 6 — Learning Evidence + Productization

### 21.1 למה להוסיף Phase 6

אחרי Phase 5 המערכת כבר מחזיקה הרבה יכולות: שאלות, הסברים, עץ הקשרים, מוזיאון, מאמן, SRS, QA ותשתיות. הסיכון הבא אינו מחסור בפיצ'רים, אלא מחסור בהוכחה:

- האם תלמידים באמת משתפרים לאורך זמן?
- אילו פיצ'רים מעלים retention ואילו רק נראים מרשימים?
- האם מורה יכול להכניס כיתה אמיתית בלי שנצטרך ללוות ידנית כל תלמיד?
- האם התוכן עובר review וגרסאות כמו מוצר רציני?

Phase 6 מוסיף שכבת evidence ו-productization: מדידת למידה אמיתית, מנוע תיקון שגיאות עמוק יותר, השלמת coverage קוריקולרי, workflow לתוכן, ומוכנות לפיילוטים.

### 21.2 עקרונות Phase 6

1. **Outcome לפני פיצ'ר:** כל capability חדש חייב להגדיר מה הוא משפר: ציון, retention, זמן לתיקון טעות, או ירידה בחולשות.
2. **Local-first privacy:** מודדים התקדמות בלי PII כברירת מחדל; סנכרון וייצוא דורשים שקיפות.
3. **Misconception-first:** לא מספיק לדעת שהתלמיד טעה ב-`useEffect`; צריך לדעת אם הטעות היא dependencies, cleanup, async או render cycle.
4. **Coverage קשיח:** אין מושג "חשוב" בלי שאלות, תרגול, prerequisite aid, ודוגמה מעשית.
5. **Content ops:** תוכן חייב לעבור סטטוסים: draft → reviewed → verified → needs-fix, עם גרסאות ותור תיקון.
6. **Pilot readiness:** לפני scale לקהילה/מורים, מריצים פיילוט קטן עם baseline/final test ומדדים ברורים.

### 21.3 W22 — Learning Evidence Loop

**מטרה:** להפוך שימוש במערכת לנתוני למידה שמוכיחים שיפור, בלי לפגוע בפרטיות.

Tasks:
- להגדיר event schema אחיד: צפייה, תשובה, טעות, remediation, mastery change, exam attempt, clip view.
- לבנות local-first analytics store עם deterministic session IDs וללא מידע מזהה.
- להוסיף cohort dashboard: D1/D7/D30, mastery lift, completion, mock-exam improvement.
- להוסיף funnel לכל מושג: explanation → answer → remediation → delayed retention.
- להוסיף gate: פיצ'ר לא מתקדם ל-Done בלי metric.
- לאפשר export אנונימי למחקר/מורה.
- ליצור weekly learning-evidence report.

DoD:
- dashboard עובד על נתוני אמת מקומיים.
- לפחות 5 funnels מרכזיים מוצגים.
- אין שמירת PII בלי הסכמה מפורשת.

סטטוס 2026-04-28:
- MVP מקומי נשלח: schema, localStorage evidence store, deterministic install/session IDs, dashboard, funnels, ו-event hooks לתשובות/טעויות/כרטיסיות/מבחנים/סיכומי שיעור.
- evidence-required gate נשלח: `FEATURE_COVERAGE_REPORT` v2 כולל `outcomeMetric`, ו-`coverage:features:strict` נכשל אם מודול `Done` חסר metric/evidence.
- נוסף: anonymized JSON export למחקר/מורה ו-weekly Markdown report מנתוני שימוש אמיתיים מקומיים.
- W22 הושלם; המשך Phase 6 עובר למנוע remediation v2.

### 21.4 W23 — Adaptive Remediation Engine v2

**מטרה:** כל טעות הופכת למסלול תיקון קצר, לא רק badge חולשה.

Tasks:
- לקבץ טעויות לפי misconception.
- ליצור misconception cards: symptom, root cause, minimal example, repair drill.
- להוסיף teach-back אחרי טעויות חוזרות.
- להוסיף adaptive retest: טעות → הסבר → שאלה קרובה → חזרה מאוחרת.
- להוסיף prerequisite rewind לשאלה מתקדמת שנכשלה.
- למדוד confidence calibration לכל מושג.
- להוסיף "אני עדיין לא מבין" שמוריד רמת הסבר ומתעד blocker.
- להרחיב את ספריית ה-misconceptions ל-20 דפוסי טעות ממופים.

DoD:
- 20 misconceptions ראשונים ממופים למושגי React/JS קשים.
- טעות חוזרת מייצרת מסלול remediation בן 3 צעדים.
- weak reports מציגים לא רק מושג חלש אלא סוג טעות.

סטטוס 2026-04-28:
- נשלח MVP ראשון: `mistake-agent` מזהה misconception דטרמיניסטי מתוך טקסט השאלה/תשובה/הסבר ומקבץ טעויות לפי root cause.
- נשלחו כרטיסי misconception מיידיים אחרי טעות: שורש הטעות, איך מתקנים, תרגיל קצר, ודימוי קל.
- נוסף teach-back אחרי טעות חוזרת באותו misconception: התלמיד מנסח במילים שלו את התיקון, נשמר מקומית, ונרשם כ-review evidence.
- נוסף adaptive retest queue: כל טעות מתזמנת שאלת תיקון קרובה וחזרה מאוחרת; המאמן מושך retests שהגיע זמנם לפני בחירה רגילה ומתעד outcome.
- נוסף prerequisite rewind: טעות בשאלה מתקדמת בוחרת דטרמיניסטית את דרישת הקדם החלשה ביותר ומנתבת אליה לפני המשך אימון רגיל.
- נוסף confidence calibration לפי מושג: המאמן מבקש ביטחון 1-5 לפני תשובה, שומר דיוק מול ביטחון ומסמן calibrated / overconfident / underconfident.
- נוסף "אני עדיין לא מבין": כפתור מילוט אחרי טעות ששומר blocker, פותח רמת סבתא או מושג קדם פשוט יותר, ונרשם כ-review evidence.
- ספריית ה-misconceptions הורחבה ל-20 דפוסי טעות ממופים ל-React/JS/TS/Node ועוד fallback כללי.
- W23 הושלם; המשך Phase 6 עובר ל-W24: כיסוי קוריקולרי ופרויקטי capstone.

### 21.5 W24 — Curriculum Coverage + Capstone Projects

**מטרה:** להפוך את הפורטל ממאגר שיעורים למערכת שמכינה למבחן, פרויקט וראיון.

Tasks:
- כל concept מקבל ≥3 MC, ≥2 Fill/Code, ולפחות trace/build/bug כאשר רלוונטי.
- מיפוי blueprint לקורסים ישראליים: svcollege, John Bryce, Sela, generic bootcamp.
- מסלול capstone: Task Manager, Movie App, Budget Manager, Auth CRUD, Dashboard.
- rubrics לפרויקטים: דרישות, edge cases, בדיקות, code review checklist.
- guided builds מ-zero ל-feature ב-React, Node, Next, TypeScript.
- interview-prep mode לשאלות Junior Frontend.
- real exam blueprint alignment report.

DoD:
- coverage report מציג 100% למושגי core.
- לפחות 5 capstones עם rubric מלא.
- mock exams מתויגים לפי blueprint.

סטטוס 2026-04-28:
- נשלח טאב "פרויקטים" ייעודי עם ניווט עץ בצד: כל פרויקט כולל ענפים למושגים מקדימים, אבני דרך, דרישות, מקרי קצה, בדיקות ו-code review.
- נוספו 5 capstones מדידים: Task Manager, Movie App, Budget Manager, Auth CRUD, Learning Dashboard.
- כל capstone כולל goal, stack, מושגים מקושרים, milestones, requirements, edge cases, tests, review checklist, deliverables והרחבת MVP.
- נוספו בדיקות Vitest שמוודאות את חמשת הפרויקטים, שלמות ה-rubric, וקישור כל conceptKey למושג אמיתי בשיעורים.
- נשלח טאב "יישור קורסים" עם מיפוי לפי מקורות ציבוריים ל-SVCollege, John Bryce, Sela ו-generic bootcamp.
- כל blueprint מציג מקורות, מודולים, שיעורים/מושגים מכוסים, פערים, capstones מתאימים, mock exam tags ו-next actions.
- נוספו בדיקות Vitest שמוודאות שכל lessonId/conceptKey במיפוי קיים בפועל.
- W24 עדיין פתוח לכיסוי שאלות מלא, guided builds ו-interview prep.

### 21.6 W25 — Content Studio + Review Workflow

**מטרה:** להפוך יצירת תוכן לתהליך מבוקר ולא לעריכה ידנית מפוזרת.

Tasks:
- לבנות content studio פנימי לעריכת שאלות והסברים.
- להוסיף סטטוס item: draft / reviewed / verified / needs-fix.
- ליצור IDs דטרמיניסטיים לפי hash יציב, בלי randomness.
- לבנות review queue מאזהרות QA, טעויות תלמידים ומשוב מורים.
- להוסיף diff בין גרסאות תוכן.
- להוסיף source/evidence לשדות היסטוריים וטענות טכניות.
- להוסיף tracker לקליפי NotebookLM: script, status, link, review, replacement date.

DoD:
- אפשר לתקן שאלה דרך workflow ולא בעריכת קובץ ישירה בלבד.
- כל שינוי תוכן משאיר evidence וגרסה.
- warning חוזר נכנס אוטומטית לתור review.

### 21.7 W26 — Production Pilot Readiness

**מטרה:** להכין את LumenPortal לפיילוט אמיתי של 10-30 תלמידים.

Tasks:
- תוכנית פיילוט: baseline test, שימוש 2 שבועות, final test.
- Teacher onboarding kit: הקמת כיתה, משימות, פירוש heatmaps.
- bug-report flow מתוך האפליקציה עם context.
- מדיניות privacy/data retention.
- performance budget: initial load, lazy load, offline cache, mobile CPU.
- WCAG 2.1 AA audit.
- release checklist: smoke tests, rollback, cache bump, QA evidence, docs.

DoD:
- ניתן להריץ פיילוט בלי ליווי יומי צמוד.
- יש baseline/final report לכל פיילוט.
- release לא יוצא בלי smoke + rollback + cache validation.

### 21.8 KPIs חדשים ל-Phase 6

| KPI | יעד |
|---|---:|
| Mastery Lift | +20% במושגי core אחרי 14 יום |
| Delayed Retention | ≥75% על מושגים mastered אחרי 7-14 ימים |
| Remediation Success | ≥60% שיפור בשאלה קרובה אחרי הסבר טעות |
| Coverage Core | 100% למושגי core; ≥80% לכלל 431 המושגים |
| Teacher Pilot Completion | ≥80% תלמידים משלימים baseline + final |
| Content Review SLA | warning קריטי מתוקן תוך 7 ימים |
| Performance Budget | initial interactive <3s במחשב סביר; mobile budget מוגדר ונמדד |

### 21.9 עדיפות ביצוע

1. W22 Evidence Loop — בלי מדידה לא נדע מה לשפר.
2. W23 Remediation v2 — הכי קרוב לכאב התלמיד.
3. W24 Coverage + Capstones — הכנה אמיתית למבחן/עבודה.
4. W25 Content Studio — הכרחי לפני scale תוכן.
5. W26 Pilot Readiness — הכרחי לפני teacher dashboard מלא וקהילה.

---

## 22. Phase 7 — Learning OS + Outcome Scale

### 22.1 למה להוסיף Phase 7

הפורטל כבר מתקדם מעבר ל-"מאגר שיעורים": יש עץ מושגים, שאלות, SRS, remediation, ראיות למידה, מוזיאון, פרויקטים ו-QA. השלב הבא צריך לפתור בעיה עמוקה יותר: **איך תלמיד יודע מה לעשות היום, איך מורה יודע מי תקוע, ואיך אנחנו מוכיחים שהמערכת באמת משפרת תוצאה לאורך זמן.**

Phase 7 לא מחליף את Phase 6. הוא יתחיל רק אחרי ש-W24-W26 ירוקים: כיסוי קוריקולרי, workflow לתוכן, ופיילוט בסיסי. מטרת Phase 7 היא להפוך את LumenPortal ל-Learning OS:

1. אבחון פתיחה שממקם תלמיד לפי מושגים ולא לפי שיעורים.
2. תוכנית שבועית אדפטיבית שמחליטה מה ללמוד, מה לחזור, ומה לבנות.
3. Project Studio שמחבר capstones לתיק עבודות אמיתי.
4. Teacher/Cohort Lite שמאפשר פיילוטים בלי dashboard ענק מוקדם מדי.
5. AI Tutor production עם guardrails ולא demo.
6. Trust, accessibility ו-mobile hardening לפני scale.

### 22.2 עקרונות Phase 7

- **אבחון לפני תוכנית:** אין תוכנית לימוד בלי baseline.
- **תכנון יומי קצר:** התלמיד צריך לדעת מה לעשות ב-15/30/60 דקות.
- **פרויקט הוא evidence:** capstone אינו קישוט; הוא מדד מוכנות לעבודה.
- **מורה מקבל החלטות, לא רעש:** dashboard מציג סיכון ופעולה מומלצת.
- **AI Tutor לא עוקף למידה:** רמזים, שאלות מכוונות, ו-remediation לפני תשובה מלאה.
- **אמון לפני scale:** פרטיות, נגישות, mobile וביצועים הם תנאי לשימוש אמיתי.

### 22.3 W27 — Diagnostic Intake + Placement

**מטרה:** להתחיל כל תלמיד ממפת ידע אמיתית ולא מהשיעור הראשון.

Tasks:
- לבנות pre-course diagnostic exam: JS foundations, DOM, async, React, TS, backend.
- לנקד לפי prerequisite graph ולא רק לפי lesson.
- למקם תלמיד per concept: skip / learn / review / remediate.
- לייצר first-week plan מתוצאות האבחון.
- למדוד confidence + answer latency כאותות אבחוניים.
- להציג "why this path" לכל נושא מומלץ.
- לתזמן retake אחרי 7-14 ימים.
- לייצא diagnostic report לתלמיד/מורה.

DoD:
- תלמיד חדש מקבל מפת ידע ותוכנית שבועית תוך פחות מ-5 דקות.
- כל המלצה מציגה נימוק גלוי: חולשה, prerequisite, או יעד מבחן/פרויקט.
- אין שימוש בנתוני דמו; כל report מבוסס על תשובות אמיתיות.

### 22.4 W28 — Adaptive Weekly Study Plan

**מטרה:** להפוך "מה ללמוד עכשיו?" לתשובה אוטומטית ומדידה.

Tasks:
- Daily missions מתוך SRS due items, weak concepts, capstone needs ו-upcoming exam.
- Time-boxed plans: 15 / 30 / 60 דקות.
- איזון בין new learning, review, remediation ו-project work.
- recovery plan כשמדלגים על ימים.
- progress forecast: mastery expected by date.
- "student agreement" בתחילת session.
- end-of-day summary עם next best action.
- בדיקות דטרמיניסטיות ל-plan generation.

DoD:
- אותו state מייצר אותה תוכנית.
- התוכנית לא ממליצה על מושג מתקדם לפני prerequisite חסר.
- יש מדד completion לכל daily mission.

### 22.5 W29 — Project Studio + Portfolio Readiness

**מטרה:** להפוך את capstones לתיק עבודות אמיתי ולא רק רשימת דרישות.

Tasks:
- milestone tracker מקומי לכל capstone.
- אזור submission: paste/link/file metadata עם privacy warning.
- rubric self-review: requirements, edge cases, tests, architecture.
- anti-pattern review על notes/code snippets שהסטודנט מכניס.
- Portfolio README generator מתוך התקדמות אמיתית.
- Teacher/mentor review notes לכל milestone.
- project health score: runnable / tested / documented / reviewed.
- תבניות פרויקט דטרמיניסטיות וללא fake data.

DoD:
- כל פרויקט יכול להסתיים ב-README ותיק עבודות עם evidence.
- תלמיד רואה מה חסר לפני שמגיש.
- מורה יכול להשאיר feedback ממוקד על milestone, לא על כל הפרויקט בבת אחת.

### 22.6 W30 — Teacher + Cohort Pilot Lite

**מטרה:** לתת למורה מספיק מידע לפיילוט, בלי לבנות מערכת B2B מלאה מוקדם מדי.

Tasks:
- class pilot setup בלי PII מיותר.
- cohort heatmap לפי concept/topic/mastery state.
- assignment recipes: exam prep, project prep, remediation week.
- risk alerts: inactive, overconfident, repeated blocker, low retention.
- weekly teacher report מתוך anonymized learning evidence.
- baseline vs final comparison בלי חשיפת תשובות פרטיות.
- manual teacher feedback queue לתוך content review.
- pilot SOP: setup, support, measurement, rollback.

DoD:
- מורה יודע תוך 10 דקות מי תקוע ובמה.
- כל risk alert מציע פעולה אחת ברורה.
- פיילוט יכול לרוץ עם 10-30 תלמידים בלי תמיכה יומית צמודה.

### 22.7 W31 — AI Tutor Production Guardrails

**מטרה:** להעביר את המאמן מ-demo ל-production בצורה מבוקרת ובטוחה.

Tasks:
- backend proxy אמיתי; אין API keys ב-frontend.
- server-side rate limits לפי user/class/license.
- coach-mode policy: רמזים לפני תשובות ישירות.
- retrieval context מתוך current concept, prerequisites, mistake history ו-capstone.
- misconception-aware prompt templates.
- PII-safe logging ו-audit trail.
- tutor evaluation set: repair איכותי, no answer leakage, Hebrew clarity.
- fallback כאשר quota/network נכשל.

DoD:
- המאמן לא נותן פתרון מלא לפני ניסיון/רמז אלא אם מצב מוגדר מאפשר זאת.
- כל תשובה ניתנת לשחזור לצורך QA בלי לשמור PII רגיש.
- יש eval suite שמונעת regression באיכות ההסבר.

### 22.8 W32 — Trust, Accessibility + Mobile Hardening

**מטרה:** להסיר חסמי שימוש אמיתי לפני הרחבה.

Tasks:
- WCAG 2.1 AA screen-reader pass לכל הטאבים המרכזיים.
- keyboard-only journey: lesson → question → remediation → review → project.
- dyslexia / low-vision / reduced cognitive load modes.
- mobile touch audit ל-trainer, flashcards, capstones, museum ו-context tree.
- offline/conflict UX ל-local-first progress ו-sync עתידי.
- performance lab: initial load, interaction latency, cache size, mobile CPU.
- privacy center: מה נשמר, export/delete, teacher visibility.
- trust page: no fake data, deterministic testing, content review policy.

DoD:
- תלמיד יכול להשלים session מרכזי במובייל בלי layout break.
- screen reader יכול לנווט בשיעור, שאלה, remediation ופרויקט.
- למשתמש יש דרך ברורה למחוק/לייצא נתונים מקומיים.

### 22.9 KPIs ל-Phase 7

| KPI | יעד |
|---|---:|
| Diagnostic Completion | ≥85% מתלמידים חדשים מסיימים אבחון ראשון |
| Plan Completion | ≥70% daily missions מושלמות |
| Time-to-First-Useful-Action | <5 דקות מהכניסה הראשונה |
| Capstone Progress | ≥60% מהתלמידים בפיילוט משלימים milestone ראשון |
| Teacher Actionability | ≥80% risk alerts כוללים פעולה מומלצת ונסגרים ידנית/אוטומטית |
| Tutor Helpfulness | ≥75% thumbs-up על תשובות remediation |
| Mobile Session Success | ≥90% sessions ללא שגיאת UI/console קריטית |
| Trust Readiness | privacy/export/delete זמינים לפני pilot scale |

### 22.10 סדר עדיפויות Phase 7

1. W27 Diagnostic — בלי baseline אין personalization אמיתי.
2. W28 Weekly Plan — בלי תוכנית יומית התלמיד הולך לאיבוד.
3. W29 Project Studio — מוכיח מוכנות לעבודה.
4. W30 Teacher Lite — מאפשר פיילוטים חוזרים.
5. W31 AI Tutor Production — רק אחרי שיש guardrails ו-eval.
6. W32 Trust/Mobile/A11y — חובה לפני scale רחב.

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

**גרסה הבאה** (V5.5): אחרי סגירת W24-W26 — עדכון לפי פיילוט ראשון ותוצאות diagnostic/retention בפועל.
