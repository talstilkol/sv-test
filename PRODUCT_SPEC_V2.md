# LumenPortal — איפיון מוצר V2

> "פורטל ההדרכה הטוב בעולם לפיתוח web בעברית — ובאנגלית."

תאריך: 2026-04-27 · גרסה: 2.0 · מחליף את PRODUCT_SPEC.md (V1)
שינוי מרכזי מ-V1: הרחבה ל-25 שיעורים, 6 סוגי שאלות (כולל Code Trace ✅), AI Tutor, Mock Exam, SRS, Backend, Mobile PWA, Community.

---

## 1. חזון ומטרת-על

**להפוך את LumenPortal לפלטפורמת הלמידה האפקטיבית, המהנה והמבוססת-מדעית ביותר ללימוד פיתוח web בעברית — עד שתלמיד שמסיים את המסלול מקבל ראיונות ב-Wix/Monday/Riskified ועובר אותם.**

### חמשת העקרונות המנחים
1. **מדע למידה ראשון** — Spaced Repetition, Retrieval Practice, Interleaving, Deliberate Practice — כל החלטה תכנונית מבוססת על מחקר חינוכי.
2. **קוד אמיתי, לא צפייה** — תלמיד לא יכול לעבור שיעור בלי לקרוא, להריץ, לטרס, לתקן, ולכתוב קוד.
3. **התאמה אישית מלאה** — כל תלמיד מקבל מסלול ייחודי שמתואם לרמתו, קצבו, וחולשותיו.
4. **עברית first** — לא תרגום, אלא חוויה ילידית עם RTL, אנלוגיות ישראליות, ומיפוי לשוק התעסוקה הישראלי.
5. **קהילה כמכפיל** — תלמידים לומדים מתלמידים, מורים מקבלים נתונים, מצטיינים מנחים מתחילים.

### היעד הסופי (KPI 12 חודשים):
- **5,000 משתמשים פעילים חודשית** (MAU)
- **500 משלמים** (Pro tier)
- **חוויית NPS ≥ 60** (Strong Promoters)
- **D7 retention ≥ 50%** (חזק יחסית למוצרי לימוד)
- **30% מהמשתמשים מסיימים לפחות שיעור אחד**
- **80% מהבוגרים מקבלים ראיון תוך 3 חודשים**

---

## 2. קהל יעד — 5 פרסונות

### Persona A — שני, סטודנטית bootcamp
- **גיל:** 23 · **רקע:** הנדסת תוכנה ב-svcollege/john-bryce, סוף קורס 6 חודשים
- **מטרה:** ציון 100 במבחן הסיום, ראיון ב-Junior Frontend
- **כאב:** מבחני סיום עם קוד שלא נחשפה אליו · קושי לזכור useState אחרי שעברה ל-useEffect
- **שעות לימוד:** 1.5 שעות/יום, 5 ימים/שבוע
- **התנהגות צפויה:** משתמשת במאמן ידע + Mock Exam יומיומית, מבקשת AI Tutor כשנתקעת

### Persona B — אבי, מהנדס במעבר
- **גיל:** 35 · **רקע:** 8 שנים backend Java, רוצה לעבור ל-React/Frontend
- **מטרה:** פורטפוליו + מעבר תוך 3 חודשים
- **כאב:** קורסי Udemy שטחיים, אין מי לשאול בעברית, רוצה תרגול אמיתי
- **שעות לימוד:** 2-3 שעות/ערב, 6 ימים/שבוע
- **התנהגות צפויה:** Code Trace + Bug Hunt + Mini Build + Code Review מ-AI

### Persona C — מאיה, מורה בקורס
- **גיל:** 40 · **רקע:** מרצה ב-svcollege/Sela
- **מטרה:** להעביר חומר אחיד ל-25 תלמידים, לזהות מי בסיכון
- **כאב:** חוסר במשוב מצרפי, הכנת תרגילים לוקחת שעות
- **שעות שימוש:** 30 דקות/יום (dashboard), 2 שעות/שבוע (להכנת חומר)
- **התנהגות צפויה:** Teacher Dashboard, Class Heatmap, Risk Alerts

### Persona D — רון, נער 14
- **גיל:** 14 · **רקע:** Python בבית-ספר, רוצה React כי "הכי קולי"
- **מטרה:** לבנות אתר משלו, אולי app
- **כאב:** אנגלית חלשה, אתרים גדולים מבלבלים אותו, רוצה משחק
- **שעות לימוד:** 30-60 דקות/יום, לא יומי
- **התנהגות צפויה:** Streaks + Daily Quest + Achievements, AI Tutor רגוע

### Persona E — דנה, מצטיינת mentor
- **גיל:** 27 · **רקע:** 3 שנים פיתוח, רוצה לעזור ולגוון רזומה
- **מטרה:** ללמד אחרים תמורת קרדיט/תשלום
- **כאב:** אין פלטפורמה ישראלית הולמת
- **שעות שימוש:** 5 שעות/שבוע
- **התנהגות צפויה:** Mentor matching, Peer code review, Community contributions

---

## 3. ארכיטקטורת המוצר — סקירה

```
┌─────────────────────────────────────────────────────────────┐
│                       LumenPortal V2                         │
├─────────────────────────────────────────────────────────────┤
│  Frontend (PWA)                Backend (Supabase)            │
│  ┌─────────────────┐          ┌────────────────────────┐    │
│  │ Vite + React    │←───WS───→│ Edge Functions          │    │
│  │ TypeScript      │          │  - Claude API proxy     │    │
│  │ Tailwind        │          │  - Auth (magic link)    │    │
│  │ State Manager   │          │  - Rate limiting        │    │
│  │ IndexedDB cache │          │ Database (Postgres+RLS) │    │
│  │ Service Worker  │          │  - users, progress      │    │
│  └─────────────────┘          │  - attempts, streaks    │    │
│                                │  - threads, mentors     │    │
│                                └────────────────────────┘    │
│  External:                                                   │
│  - Sandpack (CodeSandbox runtime)                           │
│  - PostHog (analytics)                                      │
│  - Sentry (error tracking)                                  │
│  - Claude API (AI Tutor)                                    │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. מערכת תוכן — Content System

### 4.1 — היררכיה
- **Course** (מסלול): React Junior, Backend Junior, Full-Stack Junior, TypeScript Master
- **Lesson** (שיעור): 25 שיעורים סך הכל (היום: 17)
- **Concept** (מושג): 500+ מושגים סך הכל (היום: 423)
- **Level** (רמה): 7 רמות פר-מושג (סבתא→מאסטר)
- **Question** (שאלה): 6 סוגי שאלות, 3,000+ curated סה"כ

### 4.2 — שש סוגי שאלות
| סוג | מטרה | סטטוס היום | יעד 12 חודש |
|---|---|:-:|:-:|
| **MC** (4 אופציות) | בדיקת הבנה מושגית | ✅ 1316 | 2,000 (50% עם optionFeedback) |
| **Fill** (השלמת טוקן) | יישום מעשי | ✅ 502 | 800 |
| **Code Trace** ✅ | חיזוי פלט שורה אחר שורה | ✅ 35 | 200 |
| **Bug Hunt** | זיהוי שורה שגויה + תיקון | ⏳ 0 | 150 |
| **Mini Build** | כתיבת רכיב מאפס + auto-tests | ⏳ 0 | 100 |
| **Concept Link** | שילוב 2-3 מושגים | ⏳ 0 | 200 |

**סה"כ יעד: 3,450 שאלות curated.**

### 4.3 — ארכיטקטורת מאגר שאלות
```ts
// data/questions_*.js
QUESTIONS_BANK = {
  mc: MCQuestion[];        // {id, conceptKey, level, question, options[4], correctIndex, optionFeedback[4], commonMistake, explanation}
  fill: FillQuestion[];    // {id, conceptKey, level, code, answer, hint, explanation}
  trace: TraceQuestion[];  // ✅ {id, conceptKey, level, code, steps[{line, prompt, answer, acceptable[], hint}], explanation}
  bugHunt: BugQuestion[];  // {id, conceptKey, level, code, buggyLine, fix, explanation}
  build: BuildQuestion[];  // {id, conceptKey, level, brief, starterCode, tests[{name, regex|fn}], hints[]}
  link: LinkQuestion[];    // {id, conceptKeys[], level, prompt, options[4], correctIndex, explanation}
};
```

### 4.4 — Per-Distractor Feedback (חדש V2)
לכל אופציה ב-MC יוצמד `optionFeedback`:
```ts
{
  options: ["A", "B", "C", "D"],
  correctIndex: 1,
  optionFeedback: [
    "טעות נפוצה — מי שעונה A חושב ש-X. בעצם...",
    "✓ נכון! זו ההבנה המדויקת.",
    "כמעט — אבל C מתאר Y לא Z.",
    "לא רלוונטי — D שייך לקונטקסט אחר."
  ],
  commonMistake: "76% מהתלמידים שטועים — בוחרים A. מקור: ערבוב בין X ל-Y."
}
```

**כיצד נחזיק 1316 MC עם feedback?** Claude API batch (50 שאלות בקריאה אחת):
- Prompt: "לכל אופציה: 1 משפט למה היא נראית סבירה ולמה היא שגויה"
- בדיקה: 10% manual review (130 שאלות)
- עלות: ~$5-10 לכל הבנק

### 4.5 — Concept Callouts ✅ (חדש V2)
לכל מושג מטא-נתונים נוספים שנכתבו ב-data/code_blocks.js:
```ts
CB_IMPORTANCE = {
  "useState": 4,    // 1=שולי, 2=רגיל, 3=חשוב, 4=קריטי/יסוד יסודות
  "Array": 4,
  "useEffect": 4,
  // ...
};
CB_IMPORTANT_NOTES = {
  "useState": "ה-Hook הראשון והחשוב ביותר של React. בלעדיו אין state, אין UI דינמי.",
  // ...
};
```
**יעד V2:** להרחיב את הקונספט-קלאוט גם לטאב "שיעורים" ול-trace.

---

## 5. מודולים פעילים (Tabs / Modes)

### 5.1 — שיעורים (Adaptive Lesson View)
- **קלט:** lesson, concept selected, user level (1-7)
- **פלט:** הסבר ברמה האישית + illustrations + codeExample + 4-section deep-dive (concept_enrichment)
- **אינטראקציה:** בקש פישוט (V button), בקש בחינה (☑️ → mc/fill), דווח חולשה (X)

### 5.2 — מדריך מקוצר (Quick Guide)
- **22 נושאים** מסודרים לפי הסדר ההגיוני: JS → DOM → Async → Node → Express → Mongo → React → Hooks → Router → TS
- **שאלון משולב לכל נושא** (MC + Fill)
- **תרומה לרמת המושג** דרך applyAnswer

### 5.3 — בלוקי קוד ✅ (Code Blocks — חדש V2)
- 15 בלוקים היום, יעד 50+
- כל בלוק: כותרת + difficulty + concept callout + code עם מספרי שורות + הערה עברית לכל שורה + שאלות רב-ברירה
- **פיצ'רים מתקדמים:** Line indicators (❓/✅/❌), Test mode (הסתר הערות), Reset, PDF export, Copy code, Random block, Next/Prev nav, Keyboard shortcuts

### 5.4 — Code Trace ✅ (חדש V2)
- 35 שאלות (5 לכל שיעור 21-27), יעד 200
- Step-by-step prediction עם line highlighting
- **Hint button**, progress bar, accept multiple answers, normalize trim+lowercase
- **Score:** כל שאלה כ-MC → applyAnswer

### 5.5 — מאמן ידע (Adaptive Trainer)
- **Algorithm:** weighted random pick של מושגים חלשים, רנדומלי בין mc/fill/trace
- **Live scorecard** עם t-stats (asked/correct/wrong/accuracy/mastered/weak)
- **Modes:** adaptive (default), focus-weak (1-2 בלבד), mixed (כל הרמות)
- **Export:** CSV של ציונים פר-מושג

### 5.6 — לימוד מותאם (Study Mode)
- **תור מושגים חלשים** (level 1-2 או markedWeak)
- **עוברים אחד-אחד** עד שכולם ברמה 4+
- **קיצור מהיר** לחיזוק ספציפי

### 5.7 — מפת ידע (Knowledge Map)
- **תצוגה ויזואלית** של כל המושגים בכל השיעורים
- **3 metrics:** Mastered (level 7), Weak (1-2), Pending (לא נבחנו)
- **Filters:** lesson, level range, weak/master/pending
- **Mastery bar** + global progress
- **Reset** (איפוס מלא)

### 5.8 — פירוק קוד (Code Anatomy)
- 21 קטעי קוד מרכזיים מהשיעורים
- כל מילה/סימן/משתנה מקבל הסבר תפקיד
- **לקריאה בלבד** (לא בחנים) — חידוד הבנה ויזואלי

### 5.9 — Mock Exam Mode (חדש V2)
- **טאב חדש: 🎯 מבחן מדומה**
- **30 שאלות**: 12 MC (רמות 4-6) + 8 Fill + 6 Trace + 3 Bug + 1 Build
- **מ-lessons 21-27 בלבד** (focus React, אבל ניתן לשנות)
- **טיימר 45 דקות** + מצב lockdown (אין hints, אין concept open)
- **Result screen:** ציון + רשימת שגיאות + מושגים חלשים + המלצה
- **History:** שמירת כל mock exam (תאריך, ציון, ניתוח)

### 5.10 — AI Tutor (חדש V2)
- **כפתור "💬 שאל" ליד כל מושג** + Modal עם chat
- **Context injection:** prompt כולל concept name + user level + question text
- **Streaming response** (UX מצוין)
- **Coach mode:** AI לא נותן תשובה — שואל שאלה מנחה
- **Code review mode:** תלמיד שולח פתרון, AI מציע שיפורים (לא עורך)
- **Rate limit:** 5 שאלות/יום ל-anonymous, 100 ל-Pro
- **Backend:** Supabase Edge Function → Claude API

---

## 6. למידה אדפטיבית — Engine

### 6.1 — מבנה ציון פר-מושג (קיים ✅)
```ts
scores[conceptKey] = {
  level: 1..7,
  passedMC: boolean,
  passedFill: boolean,
  attempts: number,
  correct: number,
  markedKnown: boolean,
  weakReports: number,
  correctRunCount: number,
  // חדש V2:
  srsState: { ease, interval, repetitions, due, lastSeen },
  prereqUnlocked: boolean,
}
```

### 6.2 — Spaced Repetition (חדש V2 — FSRS-4)
מימוש פשוט של FSRS-4 (יעיל יותר מ-SM-2):
- אחרי תשובה: עדכן `interval` לפי correct/wrong + difficulty
- נכון: `interval *= ease` (min 1d, max 60d)
- שגוי: `interval = 1d, ease = max(1.3, ease-0.2)`
- Trainer pickConcept: עדיפות גבוהה ל-`due <= now`
- UI: badge "🔁 חזרה מומלצת" על מושגים due

### 6.3 — Prerequisite Graph (חדש V2)
לכל מושג: `prerequisites: ["lesson_22::useState"]`
- בכניסה למושג שה-prerequisite ברמה ≤ 3 — אזהרה ידידותית
- Knowledge Map: צבע אדום על concepts שדולגו עליהם
- Suggested next: אחרי mastery — הצעה למה ללמוד הבא

### 6.4 — Difficulty Field (קיים, חסר ב-281 מושגים)
```ts
concept.difficulty: 1..10  // 1=trivial, 10=expert-only
```
משמש ב:
- Mark-as-known: אסור על 9-10 (חייב Mastery אמיתי)
- Trainer weighting: difficulty = boost factor
- Mock Exam: בחירה לפי תמהיל קושי

### 6.5 — Smart Question Selection
```js
weightFor(concept) =
  (8 - score.level) * 1.0          // רמה נמוכה = יותר תרגול
  + difficulty * 0.5                // קשה = יותר חשיפה
  + weakReports * 2.0               // דווח חלש = boost
  + (passedMC ? 0 : 1.4)            // לא עבר MC = boost
  + (dueSoon ? 3.0 : 0)             // SRS due = priority
```

---

## 7. Backend — Supabase

### 7.1 — Tables
```sql
-- users (Supabase Auth)
id, email, created_at, plan ('free'|'pro')

-- progress (per-user state)
user_id PK, scores JSONB, proficiency JSONB,
cb_state JSONB, trace_state JSONB,
streaks JSONB, achievements JSONB,
updated_at

-- attempts (audit log, פר-תשובה)
id, user_id, concept_key, kind, correct, level, timestamp

-- mock_exams (היסטוריה)
id, user_id, started_at, finished_at,
score, results JSONB

-- threads (Phase 3 community)
id, concept_key, author_id, title, body, upvotes, created_at

-- thread_replies
id, thread_id, author_id, body, upvotes, created_at

-- mentors
user_id, level_7_count, available_hours_per_week, rating
```

### 7.2 — Sync Strategy
- **Pull on login:** merge בין localStorage ל-DB. last-write-wins על concept-level
- **Push every 30s + on visibilityChange + on beforeunload**
- **Conflict resolution:** server is source of truth, but localStorage caches for offline
- **Indicator:** "🔄 מסונכרן · לפני 23 שניות"

### 7.3 — Auth Flow
- **Magic link** דרך Supabase Auth (אימייל בלבד, ללא סיסמה)
- **Google OAuth** — One-click signin
- **Anonymous mode:** uuid ב-localStorage, סינכרון מלא ב-login ראשון

### 7.4 — Rate Limiting
- **AI Tutor:** 5/day anonymous, 100/day Pro
- **Mock Exam:** 1/day anonymous, unlimited Pro
- **Code execution (Sandpack):** unlimited (client-side)

---

## 8. AI Tutor — מפרט מלא

### 8.1 — Use Cases
1. **תקיעה במושג:** "אני לא מבין מה זה Closure" → AI מסביר ברמה האישית
2. **קוד לא רץ:** "למה מקבל 'undefined'?" + paste code → AI debug
3. **Code review:** "ביקורת על הפתרון שלי" → AI מציע שיפורים
4. **Hint דינמי:** במאמן ידע, לחיצה על "💡 רמז AI" → AI נותן רמז ספציפי
5. **Concept comparison:** "מה ההבדל בין useEffect ל-useMemo?"

### 8.2 — System Prompt Template
```
אתה מורה לפיתוח web בעברית.
הסטודנט: {persona_summary}
רמת המושג שלו: {level}/7 ({level_name})
המושג: {concept_name} (lesson {lesson})
שאלה הקודמת שנכשלה: {failed_question} (אם קיים)

חוקים:
- ענה בעברית קלה (mobile-first reading)
- אם זה Coach mode — שאל שאלה מנחה במקום לתת תשובה
- אם זה Review mode — תאר 3 שיפורים אפשריים
- מקסימום 200 מילה
- כלול code snippet אם רלוונטי, RTL-friendly
```

### 8.3 — Caching
- שאלות נפוצות נשמרות ב-Supabase (TTL 30 ימים)
- Cache key: `hash(concept + level + question_type)`
- חיסכון משוער: 60% מהקריאות ב-cache

---

## 9. Mobile / PWA — מפרט

### 9.1 — Manifest
```json
{
  "name": "LumenPortal — לימוד פיתוח בעברית",
  "short_name": "LumenPortal",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#6366f1",
  "background_color": "#0a0b10",
  "lang": "he",
  "dir": "rtl",
  "icons": [...]
}
```

### 9.2 — Service Worker
- **Cache strategy:** Stale-while-revalidate ל-shell, Network-first ל-API
- **Offline:** lessons + bank_seeded זמינים אופליין אחרי טעינה ראשונה
- **Update prompt:** "🔔 גרסה חדשה — לטעון?"

### 9.3 — Mobile UX Audit
- Concept menu קומפקטי (מ-strip אופקי ל-dropdown)
- Trainer UI ידידותי לטאצ' (44px+ targets)
- Sandpack מובייל (collapse panels by default)
- Code editor עם syntax highlight LTR בתוך RTL container

### 9.4 — Push Notifications
- אופציונלי, opt-in
- Streaks: "🔥 השאר את הרצף שלך! 5 שאלות היום."
- Daily quest: "🎯 5 שאלות על useEffect היום"

---

## 10. Community Layer (Phase 3)

### 10.1 — Discussion Threads
- thread per concept ("שאלות על useState")
- Upvote/downvote, reputation system
- Reporting + moderation tools (community guidelines)

### 10.2 — Peer Code Review
- תלמיד שולח פתרון (Mini Build) → matching אוטומטי לעמית ברמה דומה
- Reviewer רואה רק 1 פתרון לכל פעם, נותן feedback (3-4 שאלות)
- Reviewer מקבל XP, reviewee מקבל feedback

### 10.3 — Teacher Dashboard
- Class creation: מורה יוצר class, מקבל invite link
- Student view: רשימת תלמידים + אחוזי שליטה + last_active
- Concept heatmap (איזה מושגים בעייתיים לכיתה)
- Risk alerts (מי בסיכון לכשל)
- Assignment system: שלח תרגיל לכיתה, ראה מי הגיש

### 10.4 — Mentor Matching
- Eligibility: level 7 ב-30+ מושגים → "Master" badge
- מתחיל מבקש עזרה → match אוטומטי לפי תחום
- Async chat דרך Supabase Realtime
- Reputation, rating, ban system

---

## 11. Gamification — מפרט

### 11.1 — Streaks
- מעקב יומי: מינימום 5 שאלות = streak day
- Widget 🔥 בכותרת
- Modal celebratory ב-3, 7, 14, 30, 100 ימים
- **Streak freeze:** 1 חיסכון/חודש ל-Pro

### 11.2 — Daily Quest
- "5 שאלות על useEffect" — נבחר אוטומטית לפי החולשות
- XP reward: 50-100
- 7-day streak bonus: 200 XP

### 11.3 — Achievements (50 ראשונים)
- "First useState master" — רמה 7 ב-useState
- "Trace champion" — 50 trace questions correctly
- "Bug hunter" — 20 bugs found
- "Helping hand" — 10 peer reviews given
- "Streak legend" — 100 days
- ועוד...

### 11.4 — XP + Global Levels
- XP מצטבר מעל לרמות-מושג
- Global level: 1 → 50
- Visible badge בפרופיל

### 11.5 — Leaderboard
- שבועי, אופציונלי לשתף עם הכיתה
- Categories: Total XP, Code Trace, Bug Hunt, Mock Exam scores
- Privacy first: opt-in only

---

## 12. Analytics & Observability

### 12.1 — PostHog
- **Events:** tab_open, lesson_open, question_answered (kind, concept, correct), mock_exam_start, mock_exam_finish, ai_tutor_query
- **Funnels:** New user → first lesson → first question → 5 questions → mock exam
- **Cohort retention:** D1, D7, D14, D30
- **Heatmaps:** איפה משתמשים תקועים בכל טאב

### 12.2 — Sentry
- JS errors + stack traces
- Session replay (Pro tier)
- Performance traces (slow renders, slow scripts)

### 12.3 — Web Vitals
- LCP, INP, CLS — נשלחים ל-PostHog דרך beacon
- יעד: כל הירוק (LCP <2.5s, INP <200ms, CLS <0.1)

---

## 13. Monetization Strategy

### 13.1 — Free tier (לעולם)
- 100% מהתוכן זמין
- 5 AI Tutor queries/day
- Local progress only (no sync)
- Watermark "powered by LumenPortal" ב-PDF exports

### 13.2 — Pro tier (₪29/חודש או ₪290/שנה)
- 100 AI Tutor queries/day
- Cloud sync בין מכשירים
- Unlimited Mock Exams + History מלאה
- Streak freeze (1/חודש)
- Priority email support
- Early access ל-features חדשים
- ללא Watermark ב-PDF

### 13.3 — Teacher tier (₪99/חודש לכיתה של 30)
- כל Pro features ל-30 תלמידים
- Teacher Dashboard מלא
- Class creation + heatmap
- Custom assignments

### 13.4 — Bootcamp / B2B
- ₪500-2000/חודש לבוטקאמפ של 50-200 תלמידים
- White-label אופציונלי
- Custom content + integration

---

## 14. תוכן יעד — 25 שיעורים

| # | שיעור | סטטוס |
|---:|---|:-:|
| 11 | Arrays, Functions, Scope | ✅ |
| 12 | Array Methods Practice | ✅ |
| 13 | Objects, DOM, Classes & Storage | ✅ |
| 14 | (חסר) Asynchronous JS — Callbacks/Events | ⏳ |
| 15 | Errors, Closure, Async, Promise, Fetch | ✅ |
| 16 | Node.js, npm, Modules, File System | ✅ |
| 17 | HTTP, Express, REST API | ✅ |
| 18 | Node/Express Homework | ✅ |
| 19 | JS Review & Summary | ✅ |
| 20 | Database, MongoDB, Mongoose | ✅ |
| 21 | React Basics | ✅ |
| 22 | useState, Immutable State | ✅ |
| 23 | Router, Context API | ✅ |
| 24 | useEffect, useMemo, useRef | ✅ |
| 25 | Tailwind CSS + Movies Project | ✅ |
| 26 | TypeScript + React+TS | ✅ |
| 27 | TS Homework + Budget Manager | ✅ |
| 28 | (חדש) Testing — Jest, Vitest, RTL | ⏳ |
| 29 | (חדש) Forms — react-hook-form + zod | ⏳ |
| 30 | (חדש) State Management — Zustand/Redux Toolkit | ⏳ |
| 31 | (חדש) Animation — Framer Motion | ⏳ |
| 32 | (חדש) Next.js Basics — App Router | ⏳ |
| 33 | (חדש) GraphQL + Apollo | ⏳ |
| 34 | (חדש) API Design Patterns | ⏳ |
| 35 | (חדש) Performance & Optimization | ⏳ |

---

## 15. Success Metrics — דוח שבועי

| מדד | יעד שבוע 1 | יעד חודש 3 | יעד שנה 1 |
|---|:-:|:-:|:-:|
| MAU | 10 | 200 | 5,000 |
| D1 retention | 50% | 60% | 70% |
| D7 retention | 30% | 45% | 50% |
| לחיצות תוך session | 15 | 25 | 35 |
| Mock exam completion | 0 | 20% | 60% |
| AI Tutor adoption | - | 30% | 50% |
| Pro conversion | - | 1% | 10% |
| NPS | - | 40 | 60 |

---

## 16. Risks & Mitigations

| סיכון | סבירות | השפעה | Mitigation |
|---|:-:|:-:|---|
| LLM costs מוגזמים | בינונית | גבוהה | Caching אגרסיבי, rate limit, prompts קצרים |
| תחרות לא הוגנת מ-LLM ראשי (chatGPT) | גבוהה | גבוהה | התמחות בעברית + מסלול תהילה ספציפי + מחיר ידידותי |
| תוכן יוצא מתאריך מהר | גבוהה | בינונית | Quarterly content review, community contributions |
| Burnout של מפתח יחיד | בינונית | קריטית | מודל monorepo + community contributors |
| לא מגיעים ל-MAU 5K | בינונית | בינונית | Content marketing (linkedin/medium), partnerships בוטקאמפים |
| GDPR / Privacy | נמוכה | גבוהה | Supabase EU region, no PII tracking, anonymous mode כברירת-מחדל |

---

## 17. הסטנדרט "World-class"

מוצר שלנו ייחשב "world's best" כש:
- ציון Lighthouse 95+ ב-4 קטגוריות (Performance, A11y, Best Practices, SEO)
- NPS ≥ 60
- 80%+ מהבוגרים מקבלים ראיון תוך 3 חודשים
- Coverage מלא: 25+ שיעורים, 3,000+ שאלות curated, 0 boilerplate
- React Native app + iOS/Android stores
- Teacher integration ב-3+ בוטקאמפים גדולים
- 5+ posts אורגניים ב-r/Israel או linkedin Israel בחודש
- "זה הציל אותי במבחן" - tweet אחד לפחות

---

## 18. הערה אחרונה

**זה איפיון, לא מחויבות.** עדיף לעצור Phase 1 באמצע, לראות שהוא מצוין, ולהמשיך — מאשר לסיים את כל ה-12 שבועות עם 70% איכות.

**הכלל הזהב:** פיצ'ר נחשב "סוגר" רק כשתלמיד אמיתי השתמש בו, לא דיווח על באג, *ובאותה הזדמנות* — חזר.

ב-LumenPortal לעולם נעדיף:
- 6 שיעורים מצוינים על 17 בינוניים
- Code Trace שעובד ב-100% על 5 פיצ'רים שעובדים ב-70%
- 50 משתמשים שאוהבים אותנו על 5,000 שלא חוזרים

**זה הסטנדרט של "world's best".**
