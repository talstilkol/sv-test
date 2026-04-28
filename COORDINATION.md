# LumenPortal — תיאום עבודה ב-4 ריצות מקביליות

תאריך: 2026-04-27 · גרסה: 1.0

> 📋 מסמך זה מתאם בין 4 sessions שעובדים במקביל על LumenPortal.
> כל session עובד ב-branch משלה, מנסה לא לגעת בקבצים של אחרים, ופותח PR ל-main.

---

## 🎯 סיכום מהיר

| Track | Session | מיקוד | קבצים ראשיים | משך משוער |
|:-:|:-:|---|---|:-:|
| **A** | 1 | תשתית: PRNG / CI / Versioning / SRS | `app.js` (logic) + `scripts/` | 5 ימים |
| **B** | 2 | תוכן: AI + React Blueprint + תיקוני QA | `data/ai_development.js`, `data/react_blueprint.js` + 11 fill fixes | 4 ימים |
| **C** | 3 | תוכן: Workbook + Closures + Difficulty | `data/workbook_taskmanager.js` + lesson חדש + difficulty ל-281 | 5 ימים |
| **D** | 4 | UX: Quick Wins + Pocket Card + Glossary | `app.js` (UI), `index.html`, `style.css` (append) | 4 ימים |

**מטרה:** סיום 4 ה-tracks = הסוף של שבוע 1-2 בתוכנית הראשית. אחרי זה — Phase 2 (Sandpack + Mock Exam + AI Tutor).

---

## ⚙️ כללי עבודה גלובליים (חובה לכל ה-sessions)

### תחילת עבודה
```bash
git pull origin main           # סנכרן עם main
git checkout -b feature/track-X-{your-name}
# ... work ...
node scripts/validate_bank.js  # ודא שאין רגרסיות
git add . && git commit
git push -u origin feature/track-X-{your-name}
gh pr create --title "Track X: ..."
```

### חוקים ברזל
1. **אל תעבדו על main ישירות.** רק PRs.
2. **אל תיגעו בקבצים של tracks אחרים** — ראו טבלת בעלות בכל track.
3. **לפני commit:** רוצו `node scripts/validate_bank.js` — חייב לעבור.
4. **PR title:** `Track {A|B|C|D}: <תיאור קצר>`.
5. **PR description:** רשימת הקבצים שנגעת + checklist של ה-Definition of Done.
6. **Code review:** לפחות session אחר אחר חייב לאשר לפני merge ל-main.
7. **Conflict resolution:** אם track אחד תלוי בעבודה של track אחר → הראשון ממזג ל-main, השני pulls ופותר conflicts לפני PR.

### Daily standup format (אופציונלי, בקובץ STANDUP.md)
```
## Track X — {date}
✅ Done: ...
🚧 In progress: ...
🚫 Blocked: ...
```

---

# 🅰️ Track A — Foundation / Plumbing

**Owner:** Session 1
**Branch:** `feature/track-a-foundation`
**משך:** ~5 ימים
**מטרה:** להפוך את המערכת ליציבה ודטרמיניסטית, ולהתחיל CI

### בעלות על קבצים (אסור לאחרים לגעת)
- `app.js` — אזור הלוגיקה (lines 1-1500): scoring, RNG, picking
- `scripts/validate_bank.js`
- `scripts/seed_questions.js`
- `data/questions_bank.js` — header (top 10 lines) בלבד
- `.github/workflows/*` (חדש)
- חדש: `lib/rng.js`

### משימות

#### A1 — Math.random → Seeded PRNG (יום 1)
**הקבצים:** `app.js` (16 מופעים), `scripts/seed_questions.js` (3 מופעים)

- [ ] צור `lib/rng.js` עם `mulberry32` או `xoroshiro128+` (5-10 שורות)
- [ ] API: `rng.next()` (0-1), `rng.int(n)` (0-n-1), `rng.pick(arr)`, `rng.shuffle(arr)`
- [ ] Seed init: `userId(uuid in localStorage) + sessionStart + counter`
- [ ] החלף את כל ה-16 מופעים ב-`app.js`
- [ ] **השאר** את המופע ב-`data/lesson21.js:1002` (זה תוכן לימודי על באג!)
- [ ] החלף ב-`scripts/seed_questions.js` (3 מופעים)
- [ ] בדיקה: 2 רנדומים רצופים עם אותו seed → אותה תוצאה

**Definition of Done:**
- `grep -rn "Math.random" --include="*.js" .` מחזיר רק את lesson21.js
- בדיקה ידנית: רענון tab → אותם questions מופיעים (deterministic)

#### A2 — Bank Versioning + Change Log (חצי יום)
**הקבצים:** `data/questions_bank.js`, `data/questions_bank_seeded.js`

- [ ] הוסף header ל-questions_bank.js:
```js
var QUESTIONS_BANK = {
  _version: "2.0.0",
  _lastUpdate: "2026-04-27",
  _changelog: [
    { v: "2.0.0", date: "2026-04-27", changes: "Initial schema with versioning" }
  ],
  mc: [...],
  fill: [...]
};
```
- [ ] עדכן `app.js` לקרוא `_version` ולהציג ב-DevTools console
- [ ] localStorage: שמור bankVersion → אם שונה → "🔄 רענון התקדמות" prompt

**DoD:** Console מציג `[LumenPortal] Bank v2.0.0 (2026-04-27)`

#### A3 — Build-time Hard-fail Validator (חצי יום)
**הקבצים:** `scripts/validate_bank.js`, `.github/workflows/ci.yml`

- [ ] הוסף `--strict` flag ל-validate_bank.js
  - בלי flag: warnings בלבד (כמו עכשיו)
  - עם flag: warnings → errors → exit code 1
- [ ] צור `.github/workflows/ci.yml`:
```yaml
name: CI
on: [push, pull_request]
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: node scripts/validate_bank.js --strict
```
- [ ] PR יחסום merge אם CI נכשל

**DoD:** PR פתוח עם boilerplate → CI אדום

#### A4 — SRS Schema (יום-יומיים)
**הקבצים:** `app.js` (scoring section), `lib/srs.js` (חדש)

- [ ] צור `lib/srs.js` עם FSRS-4 (השתמש ב-`fsrs` npm package אם זמין offline, אחרת SM-2)
- [ ] הוסף ל-scores schema:
```js
srsState: {
  ease: 2.5,           // initial
  interval: 0,          // days
  due: now,             // unix ms
  repetitions: 0,
  lapses: 0,
  lastReviewed: null
}
```
- [ ] migration: אם score קיים בלי srsState → צור עם defaults
- [ ] עדכן `applyAnswer()`: אחרי תשובה → קרא ל-srs.update(state, correct, difficulty)
- [ ] עדכן `pickWeightedConcept()`: עדיפות ל-`srsState.due <= now` (boost ×3)
- [ ] הוסף UI badge "🔁 חזרה מומלצת" אם due overdue

**DoD:** משתמש שעבר רמה ביום 1 → ב-יום 4 הקונספט מופיע ב-trainer עם badge חזרה

#### A5 — 5 Mastery States (חצי יום)
**הקבצים:** `app.js`

- [ ] הוסף derived function `getMasteryState(score)`:
```js
function getMasteryState(sc) {
  if (sc.attempts === 0) return 'new';
  if (sc.level <= 3) return 'learning';
  if (sc.srsState?.due < Date.now() && sc.level >= 6) return 'at-risk';
  if (sc.level <= 5) return 'review';
  return 'mastered';
}
```
- [ ] הוסף 5 צבעים ב-CSS (גרי / כחול / צהוב / כתום / ירוק)
- [ ] ב-Knowledge Map: סנן לפי state במקום level

**DoD:** Knowledge Map מציג 5 states. UI badge לכל מושג.

---

# 🅱️ Track B — Content #1 (AI + React Blueprint + QA)

**Owner:** Session 2
**Branch:** `feature/track-b-content-ai-blueprint`
**משך:** ~4 ימים
**מטרה:** סגירת 22 boilerplate concepts + תיקון 11 fill ambiguous

### בעלות על קבצים
- `data/ai_development.js` (תיקון מלא)
- `data/react_blueprint.js` (תיקון מלא)
- `data/concept_enrichment.js` — **רק** סקציות `lesson_ai_development::*` ו-`lesson_react_blueprint::*` (לא לגעת באחרות!)
- `data/questions_bank.js` — **רק** את 11 ה-fill questions עם ambiguity (`fill_exp_002`, `fill_react_001`, `fill_hook_001`, `fill_hook_002`, `fill_router_001`, `fill_ts_001`, `fill_arr_009`, `fill_async_004`, `fill_exp_003`, `fill_mongo_002`, ועוד)

### משימות

#### B1 — תיקון `data/ai_development.js` (12 concepts, יום-יומיים)
**מבנה לכל concept (מתוקנן עם lesson22 כמודל):**
- conceptName (כבר קיים)
- difficulty: 1-10
- 6 levels (grandma → professor) — **מותאמים אישית, לא boilerplate**
- illustration (ASCII או טקסטואלי)
- codeExample (אמיתי, לא placeholder)
- codeExplanation
- extras (אם difficulty ≥ 6): moreExamples, pitfalls, practiceQuestions

**12 הקונספטים שצריכים תיקון:**
1. AI (כללי)
2. Cursor
3. Windsurf
4. Claude Code
5. ChatGPT
6. Copilot
7. Prompt Engineering
8. AI Pair Programming
9. AI Code Review
10. AI Limitations
11. Hallucinations
12. Context Window

**Tip:** רוב התלמידים כבר מכירים את AI tools — צריך עומק על *איך להשתמש נכון*, לא הגדרה.

**DoD:**
- `node scripts/validate_bank.js` → 0 boilerplate ב-ai_development
- כל 12 concepts עם difficulty 1-10
- בדיקה ב-browser: lesson AI Development → כל concept מציג תוכן אמיתי

#### B2 — תיקון `data/react_blueprint.js` (10 concepts, יום-יומיים)
**10 הקונספטים:**
1. Component Architecture
2. State Management
3. Data Flow
4. Composition vs Inheritance
5. Container vs Presentational
6. Lifting State Up
7. Code Splitting
8. Performance Optimization
9. Error Boundaries
10. Testing Strategies

**Tip:** אלה מושגים *מתקדמים* — מתאימים ל-difficulty 6-9. Extras חובה.

**DoD:**
- `node scripts/validate_bank.js` → 0 boilerplate ב-react_blueprint
- כל 10 concepts עם difficulty + extras

#### B3 — תיקון 11 fill questions עם ambiguity (חצי יום)
**הקבצים:** `data/questions_bank.js`

- [ ] לכל אחת מ-11 השאלות (`fill_exp_002`, `fill_react_001`, וכו׳):
  - בדוק ב-validator איזה מילה מופיעה כפול בקוד
  - שנה את `code` או `answer` כך שהתשובה תופיע **בדיוק פעם אחת**
  - דוגמה: אם answer="props" מופיע 2 פעמים, החלף 1 מהמופעים בערך אחר ב-code

**DoD:**
- `node scripts/validate_bank.js` → 0 ambiguity warnings על fill_*
- בדיקה ידנית: כל fill question — ה-blank ייחודי

#### B4 — Concept Enrichment ל-22 הקונספטים (יום)
**הקובץ:** `data/concept_enrichment.js`

- [ ] הוסף ערכים `lesson_ai_development::{ConceptName}` עבור כל 12 concepts:
```js
"lesson_ai_development::AI": {
  deepDive: { purpose, problem, withoutIt, useWhen },
  analogies: { grandma, child, soldier, student, junior, professor }
}
```
- [ ] אותו דבר ל-10 concepts של react_blueprint
- [ ] לפחות 5 metaphors שונים לכל concept (תוכן עתידי לשכבת פרפר)

**DoD:** validate_bank → 22 enrichment entries חדשים, אין שגיאות.

---

# ©️ Track C — Content #2 (Workbook + Closures + Difficulty)

**Owner:** Session 3
**Branch:** `feature/track-c-content-workbook-closures`
**משך:** ~5 ימים
**מטרה:** סגירת 12 boilerplate + closures חסר + difficulty ל-281 concepts

### בעלות על קבצים
- `data/workbook_taskmanager.js` (תיקון מלא)
- חדש: `data/lesson_closures.js` (lesson יחיד על closures)
- `data/lesson{01-10}.js`, `data/lesson{28-32}.js`, `data/lesson37.js` — **רק** הוספת `difficulty: N` לכל concept (לא לשנות תוכן)
- `data/concept_enrichment.js` — **רק** סקציות `lesson_workbook_taskmanager::*` ו-`lesson_closures::*` ו-`lesson_X::Y` של core concepts ב-lessons 1-10
- `content-loader.js` — **רק** הוספת lesson_closures.js ל-modules array

### משימות

#### C1 — תיקון `data/workbook_taskmanager.js` (12 concepts, יומיים)
**הקונספטים** (ראה את הקובץ הנוכחי):
1-12 concepts of Task Manager workbook

**Tip:** Workbook = פרויקט מעשי. כל concept צריך להתקשר לבניית Task Manager.

**DoD:** validate_bank → 0 boilerplate ב-workbook_taskmanager.

#### C2 — Lesson Closures חדש (יום)
**הקובץ:** `data/lesson_closures.js`

**ההצדקה:** `closures` חסר לחלוטין מ-LumenPortal. זה הגורם השכיח ביותר לבאגים ב-React (stale closures ב-useEffect).

**מבנה:**
```js
var LESSON_CLOSURES = {
  id: "lesson_closures",
  title: "Closures — סגירות",
  description: "...",
  concepts: [
    { conceptName: "scope chain", difficulty: 5, ... },
    { conceptName: "lexical scope", difficulty: 6, ... },
    { conceptName: "closure", difficulty: 8, ... },
    { conceptName: "closure variables", difficulty: 7, ... },
    { conceptName: "stale closure", difficulty: 9, ... },
    { conceptName: "closure in event handlers", difficulty: 7, ... },
    { conceptName: "closure in useEffect", difficulty: 9, ... },
    { conceptName: "closure in setTimeout", difficulty: 8, ... },
  ],
  quiz: [...]  // 6+ meaningful questions
};
```

- [ ] עדכן `content-loader.js` להוסיף את LESSON_CLOSURES לרשימת modules
- [ ] הוסף `<script src="data/lesson_closures.js"></script>` ל-index.html

**DoD:** Lesson "Closures" מופיע ב-sidebar. כל 8 concepts עם תוכן מלא.

#### C3 — Difficulty ל-281 Concepts חסרים (יומיים)
**הקבצים המושפעים:** `data/lesson{01-10}.js`, `data/lesson{28-32}.js`, `data/lesson37.js`

**שיטה אוטומטית:** כתוב script `scripts/auto-rate-difficulty.js`:
1. קורא כל lesson file
2. לכל concept: שאל Claude API "rate difficulty 1-10 based on conceptName + level explanations"
3. הוסף `difficulty: N` לפני `levels: ...`
4. שמור חזרה

**אם API לא זמין** — דירוג ידני לפי כללי אצבע:
- HTML/CSS basics (lessons 1-3): 2-4
- ES6 features (lesson 6): 4-6
- Authentication concepts (lesson 10): 5-7
- Forms with React Hook Form (lesson 28): 5-7
- Vercel/Docker (lesson 29): 6-8
- Next.js basics (lessons 31-32): 6-8
- Next.js Advanced: 7-9
- AI Engineering (lesson 37): 7-9

**DoD:** validate_bank → 0 missing difficulty (כל 545 concepts עם דירוג)

#### C4 — Concept Enrichment ל-Closures + Top 30 ב-lessons 1-10 (יום)
**הקובץ:** `data/concept_enrichment.js`

- [ ] הוסף 8 ערכים עבור lesson_closures (deepDive + 6 analogies)
- [ ] בחר 30 concepts הקריטיים ב-lessons 1-10 (HTML, CSS, ES6, Auth) — הוסף enrichment

**DoD:** 38+ enrichment entries חדשים.

---

# 🅳️ Track D — UX Quick Wins

**Owner:** Session 4
**Branch:** `feature/track-d-ux-quickwins`
**משך:** ~4 ימים
**מטרה:** 5 פיצ'רים נגישות + מטא-קוגניציה

### בעלות על קבצים
- `app.js` — **רק** אזור UI rendering (lines 2000+, ובסוף הקובץ)
- `style.css` — **רק append** בסוף הקובץ. אסור לערוך classes קיימות
- `index.html` — הוספת tabs/buttons חדשים. אסור לשנות structure קיים
- חדש: `data/glossary.js`

### משימות

#### D1 — Read Aloud TTS Button (חצי יום)
**הקובץ:** `app.js` (רכיב UI), `style.css` (append)

- [ ] רכיב חדש: כפתור 🔊 ליד כל `concept-explanation` ו-`code-explanation`
- [ ] השתמש ב-Web Speech API: `speechSynthesis.speak(new SpeechSynthesisUtterance(text))`
- [ ] הגדר language='he-IL', rate=0.9, pitch=1
- [ ] טוגל מצב: לחץ → דבר. לחץ שוב → עצור
- [ ] indicator visual שזה מדבר (animation)

**DoD:** לחיצה על 🔊 ליד concept → קולו של TTS עברי.

#### D2 — גלוסר Hebrew/English (יום)
**הקבצים:** `data/glossary.js` (חדש), `app.js`, `style.css`

- [ ] צור `data/glossary.js`:
```js
var GLOSSARY = {
  "Hook": { he: "חיבור", definition: "פונקציה מיוחדת ב-React שמתחילה ב-use" },
  "useState": { he: "useState (חיבור מצב)", definition: "..." },
  "props": { he: "פרמטרים (props)", definition: "..." },
  // 50-100 entries
};
```
- [ ] script ב-app.js שעובר על כל הטקסט המוצג ומוסיף underline+tooltip לכל term מ-GLOSSARY
- [ ] hover → tooltip עם הסבר. click → modal מורחב.

**DoD:** המילה "useState" בכל הטקסט מודגשת + tooltip בעברית.

#### D3 — Pocket Concept Card (יום)
**הקבצים:** `app.js`, `style.css`

- [ ] כפתור 📌 על כל concept card
- [ ] localStorage: `lumenportal:pocket:v1` = array of conceptKeys
- [ ] Floating panel בצד תחתון של ה-app:
  - Collapsed: רק badge "📌 5 בכיס"
  - Expanded: רשימה של pocket concepts, click → scroll to concept
- [ ] **disabled in Mock Exam mode** (כשמופעל בעתיד)

**DoD:** משתמש שומר 3 concepts → רואה panel תחתון עם 3 concepts → click → scrolls.

#### D4 — Daily Reflection Prompt (חצי יום)
**הקבצים:** `app.js`, `style.css`

- [ ] בדיקה: יום שישי + אחרי 18:00 + לא הוצג עדיין השבוע
- [ ] Modal עם 3 שאלות:
  1. "באיזה מושג נתקעת השבוע?" (textarea)
  2. "כמה שעות למדת?" (number input)
  3. "מה תרצה ללמוד בשבוע הבא?" (textarea)
- [ ] שמור ב-localStorage: `lumenportal:reflections:v1` (array of {date, week, q1, q2, q3})
- [ ] view "📅 ההיסטוריה שלי" עם רשימת reflections

**DoD:** ביום שישי 18:00 — modal מופיע. תשובות נשמרות.

#### D5 — Dyslexia Font + Reduced Motion Toggle (חצי יום)
**הקבצים:** `app.js`, `style.css`, `index.html`

- [ ] הוסף settings page (או מודל פשוט)
- [ ] Toggle 1: "גופן ידידותי לדיסלקטים" → טען OpenDyslexic font (CDN) → מחיל על body
- [ ] Toggle 2: "הפחת אנימציות" → CSS class `.reduced-motion` עם `* { animation: none !important; transition: none !important; }`
- [ ] שמור ב-localStorage
- [ ] טעינה מ-localStorage בעת load

**DoD:** Toggle ON → דף משנה גופן + ביטול אנימציות.

#### D6 — 60-Second Wrap-Up Modal (חצי יום)
**הקבצים:** `app.js`, `style.css`

- [ ] Trigger: אחרי שמשתמש סיים lesson (כל concepts ברמה ≥4 או V'd)
- [ ] Modal עם 3 שדות:
  1. "סכם את השיעור ב-3 שורות" (textarea)
  2. "כמה אתה בטוח?" (slider 0-100%)
  3. "מה היה הכי קשה?" (textarea)
- [ ] שמור ב-localStorage עם תאריך
- [ ] history view: confidence over time

**DoD:** סיום lesson → modal → שמירה.

---

## 🔀 כללי מיזוג (Merge Strategy)

### סדר מומלץ למיזוגים
1. **Track A** (Foundation) ראשון — שאר ה-tracks תלויים בו (Math.random, schema)
2. **Track B + C** (Content) במקביל — לא חופפים
3. **Track D** (UX) אחרון — הוא אינטגרציה

### חוקי conflicts
- אם session B ו-D שניהם רוצים לערוך אותו קובץ (`app.js`, `style.css`):
  - **D מחכה ל-B**, pulls ל-branch שלו, פותר conflicts.
- אם 2 sessions עורכים את `concept_enrichment.js`:
  - הם עורכים סקציות שונות (פר lesson). conflict ייתכן רק בסוף הקובץ (closing brace) — קל לפתור.
- אם conflict על schema (questions_bank.js header):
  - Session A עושה את זה ראשון, השאר עוקבים.

---

## 📋 Checklist לפני PR (כל session)

```
- [ ] node scripts/validate_bank.js — passing (--strict אם זה Track A)
- [ ] בדיקה ידנית בדפדפן (לפחות 3 lessons שונים)
- [ ] PR description מתאר את הקבצים שנגעו
- [ ] PR title בפורמט "Track X: ..."
- [ ] לא נגעת בקבצים של tracks אחרים
- [ ] commits עם הודעות ברורות (לא "fix" ריק)
- [ ] code review מ-1 session אחר
```

---

## 🎯 יעדים מצטברים בסוף 4 ה-tracks

| מטריקה | לפני | אחרי |
|---|:-:|:-:|
| Boilerplate concepts | 34 | **0** |
| Concepts ללא difficulty | 281 | **0** |
| Closures coverage | 0 | **8 concepts** |
| Math.random uses (לא תוכן) | 19 | **0** |
| CI active | ❌ | ✅ |
| Bank versioning | ❌ | ✅ |
| SRS algorithm | ❌ | ✅ |
| Read Aloud TTS | ❌ | ✅ |
| Hebrew glossary | ❌ | ✅ |
| Pocket Card | ❌ | ✅ |
| Daily reflection | ❌ | ✅ |
| Dyslexia/Reduced motion | ❌ | ✅ |
| Concept enrichment entries | 71 | **120+** |
| Fill ambiguity warnings | 11 | **0** |

---

## 📞 תקשורת בין sessions

מומלץ:
1. ערוץ Slack/Discord משותף (אופציונלי)
2. קובץ `STANDUP.md` ב-repo עם daily updates
3. PR comments ל-blockers
4. כל session מתעדכן ב-COORDINATION.md → STATUS section (למטה)

---

## 📊 STATUS (יתעדכן באופן שוטף)

```
Track A: 🚧 In progress (Session 1) — current: A1 (Math.random)
Track B: ⏸️ Not started (Session 2)
Track C: ⏸️ Not started (Session 3)
Track D: ⏸️ Not started (Session 4)
```

עדכן את ה-status כשמתחילים track חדש או מסיימים סעיף.

---

**🎯 הכלל הזהב:** אם track אחד נתקע, השאר ממשיכים. הכל מודולרי.
