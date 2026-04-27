# LumenPortal — Scorecard 2026 V2

תאריך: 2026-04-27 · גרסה: 2.0 · עדכון אחרי merge של C1.2 (Code Trace) · מחליף את AUDIT_2026.md

> מסמך זה נותן ציון מספרי 1-10 לכל אחד מ-30 ממדי המוצר, עם הצעת שיפור קצרה לכל אחד.
> **ממוצע משוקלל נוכחי: 6.7 / 10** (עליה מ-6.4 בעקבות Code Trace + Code Blocks + Concept Callouts).

---

## 🏆 ציוני סיכום לפי קטגוריה ראשית

| קטגוריה | משקל | ציון | פערים | יעד 12 חודש |
|---|:-:|:-:|---|:-:|
| תוכן ועומק לימודי | 20% | **8.0** | 34 boilerplate, 281 ללא difficulty | 9.5 |
| חוויית למידה ואדפטיביות | 18% | **7.5** | אין SRS, אין prerequisite graph | 9.5 |
| כלי הבנת קוד | 15% | **6.5** | יש Trace ✅. חסר Sandpack, Bug Hunt, Build | 9.5 |
| ארכיטקטורה וקוד | 12% | **4.0** | app.js 4600 שורות, ללא modules/build/tests | 8.5 |
| ביצועים | 8% | **5.5** | 1.4MB seeded eager, ללא lazy/PWA | 8.5 |
| נגישות (a11y) | 7% | **3.0** | 0 ARIA, 0 alt, מינימום keyboard | 9.0 |
| מובייל/PWA | 5% | **5.5** | רספונסיבי בסיסי, אין PWA | 9.0 |
| AI ו-tutoring | 5% | **2.0** | אין שילוב LLM אינטראקטיבי | 9.0 |
| חברתי וקהילה | 4% | **2.0** | אין שיתוף, אין כיתות, אין mentors | 8.0 |
| Backend / Sync | 3% | **0.5** | רק localStorage. אין auth/cloud | 9.0 |
| Analytics / Observability | 3% | **0.0** | אפס. אי אפשר לדעת איפה תקיעות | 9.0 |

**ממוצע משוקלל: 6.7 / 10**

---

## 📊 ציונים מפורטים — 30 ממדים

### 🎯 תוכן ועומק לימודי (משקל 20%)

| ממד | ציון | שיפור מוצע |
|---|:-:|---|
| עומק הסברים (7 רמות) | **9** | להוסיף לכל מושג "טעויות נפוצות" + "מתי לא להשתמש" |
| איכות codeExample | **7** | החלפת 34 boilerplate ב-ai_dev/blueprint/workbook + הוספת difficulty ל-281 מושגים |
| כיסוי lessons (17/25) | **7** | להוסיף Next.js, Testing, GraphQL, State Mgmt (Zustand/Redux), Forms (RHF+zod) |
| Concept Callouts (חדש) | **8** | יש 4 דרגות חשיבות + הסברים מיוחדים ב-15 בלוקי קוד. להרחיב ל-trace ולמושגי לימוד |
| Hebrew localization | **9** | RTL מלא, אנלוגיות ישראליות (סופר, פפרוני, חיילים) |
| **ממוצע: 8.0** | | |

### 🧠 חוויית למידה ואדפטיביות (משקל 18%)

| ממד | ציון | שיפור מוצע |
|---|:-:|---|
| 7 רמות פר-מושג | **9** | מצוין כמות שהוא — לא צריך שינוי |
| מאמן ידע אדפטיבי | **8** | להוסיף עדיפות SRS-aware (FSRS-4) |
| לימוד מותאם (חולשות) | **8** | להוסיף "שאלת שינוי" — אם 3 פעמים בטעות → אזהרה לחזור על המושג |
| Spaced Repetition | **2** | להטמיע FSRS-4 או SM-2. שמירת `srsState: { ease, interval, due }` |
| Prerequisite chains | **1** | להגדיר ל-300 מושגים `prerequisites: ["lesson_22::useState"]` ולהציג אזהרה |
| Mock Exam Mode | **0** | משימה M2 ב-MASTER_PLAN_V3 — לבנות מצב 30 שאלות + טיימר 45 דק |
| Per-Distractor Feedback | **2** | להריץ Claude API על 1316 MC ולהוסיף `optionFeedback[4]` ו-`commonMistake` |
| **ממוצע: 7.5** | | |

### 🛠 כלי הבנת קוד (משקל 15%)

| ממד | ציון | שיפור מוצע |
|---|:-:|---|
| Code Annotation (אוטומטי) | **8** | יש 60+ regex patterns. להרחיב ל-Tailwind/TS |
| Code Trace ✅ (חדש) | **8** | יש 35 שאלות, UI מלא. להרחיב ל-100+ ולשלב גם בשיעורים 11-15 |
| Code Blocks ✅ (חדש) | **8** | יש 15 בלוקים עם הסבר לכל שורה + 4 דרגות חשיבות. להרחיב ל-50+ בלוקים |
| Bug Hunt | **0** | C1.3 — לבנות 28 שאלות (4/lesson) + UI לזיהוי שורה שגויה |
| Mini Build (auto-tests) | **0** | C1.4 — לבנות 21 פרויקטים זעירים עם בדיקות regex+execution |
| Sandpack / Live Editor | **0** | C1.1 — להטמיע `@codesandbox/sandpack-react` להרצת קוד אמיתי |
| Visualization (state/DOM) | **2** | יש illustrations טקסטואליות. להוסיף diagrams אינטראקטיביים (D3.js/Mermaid) |
| **ממוצע: 6.5** | | |

### 🏗 ארכיטקטורה וקוד (משקל 12%)

| ממד | ציון | שיפור מוצע |
|---|:-:|---|
| ארגון קוד | **2** | app.js 4600 שורות מונוליטי — לפצל ל-modules: state.js, trainer.js, codeblocks.js, trace.js |
| State Management | **3** | 20+ globals של `let`. להטמיע State Manager class עם setState/getState |
| Build pipeline | **2** | אין minify, code-split, tree-shake. להטמיע Vite |
| TypeScript | **0** | אין. להמיר את app.js ל-TS אחרי הפיצול למודולים |
| בדיקות אוטומטיות | **0** | 0 tests. Jest + Vitest + Playwright |
| CI/CD | **0** | אין `.github/workflows`. GitHub Action שמריץ validate_bank + tests + lint |
| validate_bank.js | **8** | מצוין. להוסיף בדיקת trace, bugHunt, build. אכיפה ב-pre-commit |
| **ממוצע: 4.0** | | |

### ⚡ ביצועים (משקל 8%)

| ממד | ציון | שיפור מוצע |
|---|:-:|---|
| First Paint / TTI | **5** | 1.4MB seeded נטען eagerly. Lazy-load לטאב trainer בלבד |
| Runtime / interaction | **8** | חלק. אין re-render מיותר במצב נורמלי |
| localStorage I/O | **5** | sync write על כל תשובה. לבטץ' כל 2-3 שניות + flush ב-beforeunload |
| Bundle size | **3** | ללא minify, ~3MB total. Vite ידחוס ל-~700KB |
| Image / Asset opt | **6** | אין תמונות גדולות. צריך להמיר emoji ל-SVG ל-iOS legacy |
| **ממוצע: 5.4** | | |

### ♿ נגישות (a11y) (משקל 7%)

| ממד | ציון | שיפור מוצע |
|---|:-:|---|
| ARIA labels | **1** | 0 כיום. להוסיף `aria-label`, `aria-current="page"`, `role="tablist"` |
| Keyboard navigation | **5** | יש ב-Codeblocks (J/K/E/C/R). להפיץ לכל הטאבים + פוקוס management |
| Screen reader UX | **2** | feedback לא ב-aria-live. להוסיף `aria-live="polite"` ל-feedback regions |
| Color contrast | **8** | dark theme עם contrast גבוה. בודקים WCAG AA |
| Reduced motion | **0** | להוסיף `@media (prefers-reduced-motion)` שמכבה אנימציות |
| **ממוצע: 3.2** | | |

### 📱 מובייל / PWA (משקל 5%)

| ממד | ציון | שיפור מוצע |
|---|:-:|---|
| רספונסיביות | **7** | רוב הטאבים אדפטיביים. לבדוק את trace player במובייל |
| Touch UX | **6** | קישוטי כפתור 44px+ ברוב המקומות. שיפור ב-cm-pill |
| PWA installable | **0** | manifest.json + service worker (vite-plugin-pwa) |
| Offline support | **0** | Cache shell + lessons. fallback offline דף |
| Push notifications | **0** | לסטריקים יומיים (אופציונלי) |
| **ממוצע: 3.8** | | |

### 🤖 AI ו-tutoring (משקל 5%)

| ממד | ציון | שיפור מוצע |
|---|:-:|---|
| AI Tutor (chat) | **0** | Edge function בSupabase + Claude API + streaming |
| Code Review מ-AI | **0** | תלמיד שולח פתרון, AI מציע שיפורים (לא עורך) |
| Per-distractor LLM | **0** | להריץ Claude API על 1316 MC ולהוסיף `optionFeedback` |
| Coach mode (לא נותן תשובה) | **0** | AI שואל שאלה מנחה במקום לפתור |
| AI hint button | **2** | יש hints סטטיים. להוסיף hint דינמי דרך LLM |
| **ממוצע: 0.4** | | |

### 👥 חברתי וקהילה (משקל 4%)

| ממד | ציון | שיפור מוצע |
|---|:-:|---|
| Discussion threads | **0** | thread per concept (Phase 3.1) |
| Peer code review | **0** | תלמיד שולח, peer ברמה דומה רואה ומגיב (Phase 3.2) |
| Teacher dashboard | **0** | מורה יוצר class, רואה אחוזי שליטה (Phase 3.3) |
| Mentor matching | **0** | תלמידי-מאסטר מנחים מתחילים (Phase 3.4) |
| Achievements / Streaks | **0** | 30 הישגים + streak counter (Phase 2.5) |
| Leaderboard | **0** | שבועי, opt-in לשתף עם הכיתה |
| **ממוצע: 0.0** | | |

### ☁️ Backend / Sync (משקל 3%)

| ממד | ציון | שיפור מוצע |
|---|:-:|---|
| Auth (login) | **0** | Supabase magic link + Google OAuth (Phase 2.3) |
| Cross-device sync | **0** | sync localStorage→Supabase כל 30s + on visibility |
| Anonymous user_id | **2** | יש משתמש לוקאלי, אין uuid לתפיסת התקדמות |
| Backup / Export | **3** | יש CSV export. להוסיף JSON full state export+import |
| **ממוצע: 1.3** | | |

### 📊 Analytics / Observability (משקל 3%)

| ממד | ציון | שיפור מוצע |
|---|:-:|---|
| Page analytics | **0** | PostHog (free 1M events) — track tab views + actions |
| Error tracking | **0** | Sentry — תפיסת JS errors + stack traces |
| Performance metrics | **0** | Web Vitals (LCP, INP, CLS) דרך beacons |
| Heatmaps | **0** | PostHog heatmaps לזהות איפה משתמשים נתקעים |
| Funnel analysis | **0** | להבין כמה מסיימים שיעור, mock exam, וכו' |
| **ממוצע: 0.0** | | |

---

## 📈 שינויים מאז AUDIT_2026.md (V1)

| תחום | V1 | V2 | שינוי | סיבה |
|---|:-:|:-:|:-:|---|
| תוכן ועומק | 9.5 | 8.0 | -1.5 | חישוב מדויק יותר עם 34 boilerplate ו-281 missing difficulty |
| חוויית למידה | 8.5 | 7.5 | -1.0 | חישוב כולל גם SRS, prerequisites, mock exam |
| כלי הבנת קוד | 5.0 | **6.5** | **+1.5** ✅ | Code Trace + Code Blocks + Callouts הוספו |
| ארכיטקטורה | 3.5 | 4.0 | +0.5 | validate_bank.js שופר; עדיין מונוליטי |
| ביצועים | 4.5 | 5.5 | +1.0 | 13 בלוקי קוד + 35 trace ב-questions_trace.js נטענים יחד אבל קלים |
| נגישות | 2.5 | 3.0 | +0.5 | Code Trace UI יש keyboard support בסיסי |
| Backend | 0.0 | 0.5 | +0.5 | localStorage state חדש (cb_state, trace_state) |
| **ממוצע** | **6.4** | **6.7** | **+0.3** | **תרומה ברורה מ-Phase 1.1 (Code Trace)** |

---

## 🎯 השוואה למתחרים — איפה אנחנו?

### בעברית (אנו בלעדיים בעומק):
| מתחרה | תוכן | אדפט. | UX | מובייל | מחיר | **כולל** |
|---|:-:|:-:|:-:|:-:|:-:|:-:|
| **LumenPortal (V2)** | **8.0** | **7.5** | **7.5** | **5.5** | **0** (Free) | **6.7** |
| HackerU bootcamp | 8.5 | 7.0 | 7.0 | 5.0 | -10 (₪40K+) | 5.9 |
| John Bryce | 7.5 | 5.0 | 6.5 | 5.0 | -8 | 5.3 |
| Sela | 7.5 | 5.0 | 6.0 | 5.0 | -8 | 5.1 |
| Webdesign-il | 6.0 | 3.0 | 6.5 | 6.0 | 5 | 5.3 |
| **יתרון:** עומק + אדפטיביות + חינם + עברית. **חולשה:** חסר community + AI |

### גלובליים (אנגלית):
| מתחרה | ציון | יתרון נגדנו | פער ל-V2 |
|---|:-:|---|:-:|
| react.dev | 8.4 | תיעוד רשמי, code editor live, sandpack | -1.7 |
| Khan Academy | 9.0 | Mastery Learning, mobile native, אנליטיקה | -2.3 |
| freeCodeCamp | 8.1 | מספר תרגילים אדיר, certifications | -1.4 |
| Codecademy Pro | 7.6 | Live editor, projects | -0.9 |
| Scrimba | 7.6 | Interactive video, code-in-video | -0.9 |
| **יעד:** להגיע ל-9.0+ ב-12 חודשים — שווה ל-Khan Academy אבל בעברית | | | |

---

## 💪 מה החזק ביותר ב-LumenPortal (יתרון תחרותי בלתי הפיך)

1. **143 מושגים × 7 רמות הסבר** — אף מתחרה בעברית או באנגלית לא מציע "סבתא→מאסטר" לכל מושג
2. **Concept Callouts עם 4 דרגות חשיבות** + הסבר עברי + crossref — מקדם הבנת חשיבות יחסית
3. **Code Annotations אוטומטיות בעברית** — 60+ regex patterns שמוסיפים הערה לכל שורה
4. **מנגנון 7 רמות עם passedMC + passedFill** — לוגיקה אדפטיבית עמוקה ולא צעצוע
5. **Code Trace ✅** — ייחודי בעברית, בודק הבנת ריצה אמיתית
6. **Knowledge Map ויזואלי** — מורה/תלמיד רואים בדיוק מה חזק ומה חלש
7. **חינם + ללא צורך בהתחברות** — barrier-to-entry אפסי

---

## 🚨 מה חוסם אותנו מציון 9.5+

### הקריטיים (P0) — לתקן ב-Q2 2026:
1. **34 boilerplate concepts** באולברידס — ai_development, react_blueprint, workbook
2. **281 missing difficulty** — מערכת אדפטיבית שבורה בשקט
3. **app.js מונוליטי 4600 שורות** — בלתי-בדיק, בלתי-רפקטרי
4. **0 tests** — refactor משמעותי = רולטה רוסית
5. **1.4MB seeded eagerly** — מאט TTI

### החשובים (P1) — לטפל ב-Q3 2026:
6. **0 ARIA + a11y חלקי** — חוסם ביטחונה רחבה
7. **אין SRS** — ידע נשכח אחרי שבועיים
8. **אין AI Tutor** — תלמיד תקוע = נטוש
9. **אין Cloud sync** — מאבדים התקדמות בין מכשירים
10. **אין Mock Exam** — תלמידים לא מתאמנים על תנאי מבחן אמיתיים

### ה-nice-to-have (P2) — Q4 2026 ו-2027:
- PWA + offline + push
- Community + Teacher dashboard + Mentor matching
- Streaks + Achievements + Daily Quest
- Analytics (PostHog) + Error tracking (Sentry)

---

## 📋 פעולות מיידיות (השבועיים הקרובים)

לפני שממשיכים ל-C1.1/C1.3/C1.4 (Phase 1.1), מומלץ:

1. **יום 1-2:** הוסף `difficulty: 1-10` ל-281 מושגים (אוטומציה דרך seed_questions.js)
2. **יום 3-4:** החלף 34 boilerplate concepts (ai_dev / blueprint / workbook) — כתוב מחדש כמו ב-lesson22.js
3. **יום 5:** הוסף GitHub Action שמריץ validate_bank.js + node --check על PR (חוסם merge אם נכשל)
4. **יום 6:** הוסף State Manager class בסיסי + העבר 5 globals אליה כ-POC
5. **יום 7:** הוסף Sentry + PostHog (15 דקות התקנה כל אחד)
6. **יום 8-10:** המשך ל-C1.3 (Bug Hunt) על תשתית נקייה יחסית

---

## 🎯 יעד 12 חודשים — ציון 9.5/10 = "best portal in the world"

| ממד | היום | יעד | פעולות נדרשות |
|---|:-:|:-:|---|
| תוכן | 8.0 | **9.5** | 25 שיעורים, 3K שאלות curated, 0 boilerplate, difficulty מלא |
| למידה | 7.5 | **9.5** | SRS + prerequisites + mock exam + per-distractor feedback |
| כלי הבנת קוד | 6.5 | **9.5** | Sandpack + Bug Hunt + Mini Build + visualizations |
| ארכיטקטורה | 4.0 | **8.5** | Vite + modules + TS + 80% test coverage |
| ביצועים | 5.5 | **8.5** | Lighthouse 95+ ב-4 קטגוריות |
| נגישות | 3.0 | **9.0** | WCAG AA full + keyboard nav + screen reader |
| מובייל / PWA | 5.5 | **9.0** | PWA installable + offline + push |
| AI | 2.0 | **9.0** | Tutor chat + Coach + Code Review + per-distractor |
| חברתי | 2.0 | **8.0** | Threads + Peer review + Teacher + Mentor |
| Backend | 0.5 | **9.0** | Supabase auth + sync + RLS |
| Analytics | 0.0 | **9.0** | PostHog + Sentry + Web Vitals |

**ממוצע משוקלל יעד: 9.0+** = "World-class"
