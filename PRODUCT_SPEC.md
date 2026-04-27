# LumenPortal — איפיון מוצר (Product Specification)

> "פורטל ההדרכה הטוב בעולם לפיתוח בעברית"

תאריך: 2026-04-26 · גרסה: 1.0 · סטטוס: טיוטה לאישור

---

## 1. חזון (Vision)

**להפוך את LumenPortal לפלטפורמת הלמידה האפקטיבית, המהנה והמבוססת-מדעית ביותר ללימוד פיתוח web בעברית — עד שתלמיד שמסיים את המסלול יהיה מוכן לעבוד בכל חברת hi-tech בישראל.**

### חמשת העקרונות

1. **מדע למידה ראשון** — כל החלטה תכנונית מבוססת על מחקר חינוכי (Spaced Repetition, Retrieval Practice, Interleaving, Deliberate Practice).
2. **קוד מעל הכל** — תלמיד לא יכול לעבור שיעור בלי לקרוא, להריץ, לתקן, ולכתוב קוד אמיתי.
3. **התאמה אישית מלאה** — כל תלמיד מקבל מסלול ייחודי שמתואם לרמתו, לקצבו, ולחולשותיו.
4. **עברית first** — לא תרגום של אתר אנגלי, אלא חוויה ילידית עם RTL, אנלוגיות ישראליות, ומיפוי לשוק התעסוקה הישראלי.
5. **קהילה כמכפיל** — תלמידים לומדים מתלמידים, מורים מקבלים נתונים, מצטיינים מנחים מתחילים.

---

## 2. קהל יעד (Target Users)

### Persona A — "שני, סטודנטית סוף שנה ב"
- **גיל:** 23
- **רקע:** הנדסת תוכנה בbootcamp / מכללה. מסיימת קורס 6 חודשים.
- **מטרה:** ציון 100 במבחן הסיום, ראיון בJunior Frontend.
- **כאב:** מבחני סיום עם קוד שלא נחשפה אליו. קושי לזכור useState אחרי שעברה ל-useEffect.
- **שעות לימוד:** 1.5 שעות/יום, 5 ימים/שבוע.

### Persona B — "אבי, מהנדס במעבר"
- **גיל:** 35
- **רקע:** 8 שנים backend Java, רוצה לעבור ל-React/Frontend.
- **מטרה:** לבנות פורטפוליו ולעבור דרסטית ל-frontend תוך 3 חודשים.
- **כאב:** קורסי Udemy שטחיים. אין מי לשאול בעברית. רוצה תרגול אמיתי.
- **שעות לימוד:** 2-3 שעות/ערב, 6 ימים/שבוע.

### Persona C — "מאיה, מורה בקורס"
- **גיל:** 40
- **רקע:** מרצה ב-svcollege / john-bryce / Sela.
- **מטרה:** להעביר חומר אחיד לכיתה של 25, לזהות תלמידים בסיכון.
- **כאב:** חוסר במשוב מצרפי. לא יודעת מי הבין ומי לא. הכנת תרגילים לוקחת שעות.
- **שעות שימוש:** 30 דקות/יום (לבדיקת dashboard), 2 שעות/שבוע (להכנת חומר).

### Persona D — "רון, ברנש 14"
- **גיל:** 14
- **רקע:** למד Python בבית-ספר, רוצה לעבור ל-React כי "הכי קולי".
- **מטרה:** לבנות אתר משלו. אולי לפתח app.
- **כאב:** אנגלית חלשה, אתרי לימוד גדולים מבלבלים אותו. רוצה משחק, לא לימוד.
- **שעות לימוד:** 30-60 דקות/ערב, לא קבוע.

---

## 3. הצעת ערך מובדלת (Differentiated Value Proposition)

| מה שמתחרים מציעים | מה ש-LumenPortal מציעה |
|---|---|
| תוכן באנגלית עם תרגום מכני | תוכן ילידי עברי עם אנלוגיות ישראליות |
| מסלול קבוע לכולם | מסלול דינמי שמתאים לקצב ולחולשות |
| MC + Fill | 6 סוגי תרגול: Code-trace, Bug-hunt, Build, MC, Fill, Concept-link |
| Anki/SRS בלי תוכן | SRS + תוכן עשיר ב-7 רמות עומק |
| מבחנים בלי context | מבחנים מדומים שמדמים בדיוק את svcollege/מבחני הקורסים הישראלים |
| כללי | ממוקד שוק תעסוקה ישראלי |
| ללא AI | AI Tutor שמסביר בעברית, מותאם לרמתך, לא מציג תשובות אלא מנחה |
| Forum רחב ולא ממוקד | קהילה של תלמידים ישראלים בקורסים זהים |

### "Wedge" — לקוח ראשון

תלמידי svcollege/john-bryce/Sela בקורסי Full-Stack JS/React. למה?
- כבר משלמים לקורס — מחפשים השלמה.
- מוכוונים מבחן ספציפי.
- הומוגניים בצרכים.
- 2,000-3,000 תלמידים בשנה (TAM ראשוני).

---

## 4. תכונות ליבה (Core Features)

### 🎯 4.1 — Adaptive Engine
- **מנגנון 7 רמות** (סבתא→מאסטר) פר מושג.
- **ניקוד קושי 1-10** פר מושג, משפיע על דרישות שליטה.
- **Spaced Repetition** מבוסס FSRS-4 (algorithm חדש מ-Anki, מבוסס ML).
- **Prerequisite chain** — useEffect דורש useState, JSX דורש Component.
- **Personalized path** — מסלול שונה לכל תלמיד לפי תוצאות.

### 🎓 4.2 — Six Practice Modes (לעומת 2 כיום)
1. **MC** — שאלה אמריקנית עם 4 אופציות + הסבר לכל הסחה.
2. **Fill** — השלמת טוקן בקוד.
3. **Code-Trace** — חיזוי פלט שורה אחר שורה (חדש).
4. **Bug-Hunt** — איתור שורה שגויה + הסבר (חדש).
5. **Mini-Build** — כתיבת קומפוננטה מאפס + auto-tests (חדש).
6. **Concept-Link** — שאלה שמשלבת 2-3 מושגים (חדש).

### 💻 4.3 — Live Code Environment
- **Monaco Editor** (אותו עורך כמו VS Code) embedded.
- **Sandpack runtime** (CodeSandbox technology) — הרצה אמיתית של React/JS בדפדפן.
- **Hot reload** — שינוי קוד = פלט חדש מיידית.
- **Error highlighting** — שגיאות מסומנות בעברית.
- **AI hints** — תקיעה? כפתור "תן לי רמז" שולח ל-Claude API.

### 📚 4.4 — Library Architecture
- **17+ שיעורים** מ-JavaScript בסיסי עד React מתקדם, TypeScript, Backend.
- **434+ מושגים** עם 7 רמות הסבר כל אחד.
- **3,000+ שאלות curated** (לא auto-generated).
- **500+ live code exercises** עם הרצה.
- **50+ project briefs** (בנה Counter, TodoList, Movie App).
- **20+ mock exams** מותאמים לתוכניות לימוד ספציפיות.

### 🎮 4.5 — Gamification (חכמה, לא רעשנית)
- **Streaks** — רצפי ימים, יעד יומי 5 שאלות.
- **Daily quest** — משימת היום (לא רנדומלית, מתאימה לחולשות).
- **Achievements** — 50 הישגים מתועדים (Master useState, 7-day streak, וכו׳).
- **XP + Levels** מעבר לרמות-מושג — רמת תלמיד גלובלית.
- **Leaderboard** — שבועי, אופציונלי לשתף עם הכיתה.

### 🤖 4.6 — AI Tutor (Claude API)
- **Inline help** — כפתור "💬 שאל" ליד כל מושג. Claude עונה בעברית, מותאם לרמת התלמיד.
- **Code review** — תלמיד שולח את הפתרון שלו, AI מציע שיפורים.
- **Question generation** — מורה לוחץ "צור 10 שאלות נוספות על Y" — AI מייצר.
- **Plagiarism guard** — AI מזהה תלמיד שמעתיק תשובה מ-AI אחר ומציע אתגר.

### 👥 4.7 — Community Layer
- **Discussion per concept** — תלמידים שואלים, אחרים עונים.
- **Peer code review** — שולחים פתרון, מקבלים feedback מתלמיד אחר ברמה דומה.
- **Mentor matching** — תלמיד "מאסטר" יכול להיות mentor לתלמיד "סטודנט". XP על mentoring.
- **Class groups** — מורה יוצר קבוצה, מצרף את הכיתה, רואה התקדמות.

### 🎯 4.8 — Mock Exam System
- **5+ exam templates** מותאמים לקורסים ישראלים שונים.
- **30 שאלות בעירוב** סוגים, רמות 4-6, שעון 45 דקות.
- **תנאי מבחן** — אין משוב, אין חזרה, אין סגירת tab.
- **Detailed analytics אחרי** — אילו מושגים נכשלו, מומלצות לעדכון.
- **History** — כל מבחן נשמר עם תאריך, ציון, זמן, פירוט.

### 📊 4.9 — Teacher Dashboard
- **Class overview** — 25 תלמידים בטבלה: רמה, אחוז, מושגים חלשים.
- **Concept heatmap** — איזה מושגים הכי חלשים בכיתה.
- **Risk alerts** — תלמיד שלא נכנס 3 ימים, או שצנח באחוז.
- **Assignment system** — מורה שולח task, רואה מי הגיש.
- **Bulk import** — מורה מעלה CSV, יוצר 25 חשבונות.

### 🔄 4.10 — Cross-device Sync
- **Auth** — magic link / Google / GitHub.
- **Sync** — localStorage + backend, automatic.
- **Offline-first** — PWA. נשמר ב-localStorage, מסונכרן כשיש wifi.
- **Conflict resolution** — last-write-wins עם indication.

### 📱 4.11 — Mobile App (PWA → Native)
- **PWA** מ-day 1 (יחסית מהיר).
- **Native** (React Native) — אחרי 6 חודשים, אם השוק מצדיק.

---

## 5. תכונות שמחוץ ל-scope (Non-Goals)

- ❌ **VR/AR** — לא רלוונטי ל-coding education.
- ❌ **שיעורים בוידיאו ארוכים** (>20 דקות) — לא הפורמט שלנו.
- ❌ **תרגול multi-language** (Python/Java/C#) — focus על JS/TS/React לפחות שנה ראשונה.
- ❌ **DevOps/Cloud certifications** — בעתיד אולי.
- ❌ **Generic SaaS coding tools** — אנחנו לימוד, לא IDE.

---

## 6. עקרונות עיצוב (Design Principles)

### א. למידה תמיד פעילה
תלמיד שלא **עושה** — לא **לומד**. כל מסך חייב לדרוש קלט תוך 60 שניות.

### ב. פידבק תוך 1 שניה
כל אקשן (לחיצה, תשובה, שינוי קוד) — פידבק מיידי. דחיית פידבק → איבוד עניין.

### ג. שגיאה היא הזדמנות
כשתלמיד שוגה — לא רק לסמן ❌. להסביר *למה* טעה, *מה* החלופה, *איפה* החולשה.

### ד. מסך אחד = רעיון אחד
לא לדחוס. כל view ממוקד במשימה אחת. UI נקי, אוויר.

### ה. RTL native
לא תרגום. עיצוב מהבסיס לעברית — directionalism, איקונים מתאימים, אנלוגיות מקומיות.

### ו. Accessibility-first
WCAG 2.1 AA. keyboard navigation, screen readers, color contrast, focus management.

---

## 7. Stack טכנולוגי

### Frontend
- **React 18+ + TypeScript** — type safety על הקוד שלנו.
- **Vite** — build tool מהיר.
- **Tailwind CSS** — utility-first, מתאים ל-RTL ול-iteration מהיר.
- **Radix UI** / Headless UI — primitives נגישים.
- **Monaco Editor** — code editor (כמו VS Code).
- **Sandpack** (Codesandbox SDK) — code execution.
- **Framer Motion** — animations חלקות.

### Backend
- **Supabase** — Postgres + Auth + Storage + Edge Functions. כסת-המידוד הכי טובה ל-MVP.
- **Edge Functions** (Deno) — endpoint לקריאות AI, validation, etc.
- **PostgreSQL** — schema רלציונית — users, concepts, scores, attempts, classrooms.

### AI
- **Anthropic Claude API** — Claude Sonnet 4.6 בייצור.
- **Prompt caching** — חיסכון של 90% בעלויות (cache hits של system prompts).
- **Streaming** — תגובות AI מופיעות מילה-מילה (UX טוב).

### Analytics
- **PostHog** — events, funnels, feature flags. Self-hostable אם דרוש.
- **Sentry** — error tracking.

### Build / Deploy
- **Vercel** או **Cloudflare Pages** — static + edge functions.
- **GitHub Actions** — CI: tests, type-check, lint.

---

## 8. מודל מונטיזציה (טנטטיבי)

### Free Tier
- 3 שיעורים ראשונים מלאים.
- מצב מבחן מדומה — 1 ניסיון/שבוע.
- AI Tutor — 5 שאלות/יום.
- Community read-only.

### Pro Tier — ₪49/חודש (₪399/שנה)
- כל השיעורים.
- Unlimited mock exams.
- AI Tutor — 100 שאלות/יום.
- Community שלם (להגיב, לפרסם, peer review).
- Streak protector (1 חיסכון לחודש).

### Class Tier — ₪199/חודש למורה (עד 30 תלמידים)
- כל ה-Pro לכל תלמיד.
- Teacher dashboard.
- Class assignments.
- Custom curriculum mapping.

### Enterprise Tier — Custom
- בתי ספר, bootcamps.
- White-label option.
- SSO.

**יעד שנה ראשונה:** 200 משלמים = ₪100K ARR. שנה שלישית: 5,000 משלמים = ₪2.5M ARR.

---

## 9. מדדי הצלחה (KPIs)

### Activation (התחלה)
- **D1 retention** ≥ 60% (חזרה ביום שאחרי הרישום).
- **First quiz completion** ≥ 80% (מי שנרשם — סיים שאלה).
- **Time to first "aha"** < 10 דקות.

### Engagement (מעורבות)
- **DAU/MAU** ≥ 40% (סטיקיות גבוהה).
- **Avg session duration** ≥ 15 דקות.
- **Streak holders** (3+ ימים) ≥ 30% מ-MAU.

### Learning (מדד אמיתי)
- **Concepts mastered/week** — ממוצע 5+ למשתמש פעיל.
- **Test prep score uplift** — ציון מבחן מדומה אחרי שבוע ≥ ציון אחרי יום ב-15 נק'.
- **Real exam pass rate** — תלמידים שעברו את המבחן האמיתי / כל המשתמשים שניגשו ≥ 85%.

### Business
- **Free → Paid conversion** ≥ 5% (תקן: 3-5% ב-edu SaaS).
- **MRR growth** ≥ 15%/חודש בשנה 1.
- **Churn** ≤ 5%/חודש.
- **NPS** ≥ 50.

---

## 10. סיכונים מרכזיים

| סיכון | חומרה | מיטיגציה |
|---|:-:|---|
| תוכן מתיישן (React 19, hooks חדשים) | גבוהה | תהליך עדכון חודשי, AI שמזהה inconsistencies |
| AI עלויות גבוהות (Claude API) | בינונית | Prompt caching, rate limits, fallback ל-Haiku |
| תלמידים מעתיקים תשובות מ-ChatGPT | גבוהה | Mock exams בלי גישה ל-AI, watermark detection |
| Scale issues עם 10K+ users בו-זמנית | בינונית | Edge caching, Supabase scales, lazy loading |
| מתחרה גדול נכנס לעברית (Codecademy מתרגם) | נמוכה-בינונית | Moat = community + curriculum mapping ספציפי |
| איכות seeded questions פוגעת באמון | גבוהה | Audit מסודר, סימון "verified" על מה שעבר QA |

---

## 11. תכנון שלבים גבוה

| חודש | מיקוד | תוצאה |
|:-:|---|---|
| 1-2 | Foundation: 4 P0 features מהתוכנית הקודמת | מוצר עובד עם code execution + mock exams |
| 3-4 | Differentiation: AI Tutor, SRS, Prerequisite Graph, Mobile (PWA) | מוצר ייחודי בשוק |
| 5-6 | Polish + Community: forums, mentor matching, teacher dashboard | קהילה פעילה |
| 7-9 | Content scale: 17 → 25 שיעורים, 3,000+ שאלות, 50+ projects | תוכן עשיר ל-Full-Stack |
| 10-12 | Monetization + scale: Pro tier, classroom features, mobile native | הכנסות יציבות |

---

## 12. שאלות פתוחות (להחלטה)

1. **שפת ממשק:** עברית בלבד או הוספת אנגלית בעתיד? (ממליץ: עברית בלבד שנה 1, אז להוסיף אנגלית בלבד למורה Pro).
2. **AI Tutor as a moat?** האם להציע אותו free כדי להגדיל acquisition או pro-only ל-revenue?
3. **Open source?** האם לפתוח את ה-engine ב-MIT (השפעה על מותג, אבל לא monetization)?
4. **Self-hosted enterprise?** מוסדות שרוצים שליטה על הdata.
5. **Multi-tenant vs single-tenant?** התחלה עם multi (זול), אופציה לאחר מכן.
6. **Learning paths beyond JS/React?** Python? Java? Backend? תלוי בשוק.

---

## הערה לסיום

המוצר הזה לא מסוגל להגיע ל-"world's best" עם פיצ'רים בלבד. הוא יגיע לשם עם:

1. **תוכן מצוין** — רק 6/17 שיעורים נכתבו עד כה. צריך 100% בעומק שמשווה למיטב.
2. **Iteration מהיר** — סופר-מהיר. מודדים, מתקנים, חוזרים.
3. **קהילה חיה** — אם 100 משתמשים פעילים מדי יום, הקהילה תתחיל להזין את עצמה.
4. **שותפויות** — svcollege, john-bryce, Sela. הם הופכים אותנו לאופציה הברורה.
5. **סיפור** — Lumen היא חברת ה-edtech הכי טובה בישראל לפיתוח. נקודה.

הדרך ארוכה. אבל אם לא נציב כיוון ברור עכשיו — נישאר מוצר שסטודנט אחד משתמש בו לפעם.
