# Master Plan V2 — תיקון מלא של LumenPortal

> **מטרה:** האתר יהיה מערכת לימוד אדפטיבית מלאה — כל תלמיד מקבל תוכן ברמה האישית שלו, מתקדם רמה כשהוא מצליח, ומקבל יותר עזרה ברמה הנמוכה כשנתקע. תוצאת הסיום: 100% מ-434 המושגים מכוסים, ולכל מושג יש מסלול מובנה מסבתא לפרופסור.

---

## 1. סיכום מצב — מה כבר נעשה (✅) ומה נותר (⏳)

### ✅ הושלמו

| תחום | מה נעשה |
|---|---|
| **תשתית רמות 1-7** | מבנה ציון פר-מושג: `level, passedMC, passedFill, attempts, correct`. שמירה ב-`localStorage`. מיגרציה אוטומטית מהפורמט הישן. |
| **מנוע התקדמות** | `applyAnswer(lessonId, conceptName, concept, kind, correct)` — מקדם רמה רק כששני השלבים (MC + Fill) עברו. תשובה שגויה לא מורידה רמה. |
| **6 תיוגי רמה צבעוניים** | `lvl-1..lvl-7` עם אייקונים `👵🧒🪖🎓💻🔬🏆`. |
| **🗺️ מפת ידע נעולה** | סטטוס נעול-לקריאה, מתעדכן רק מהציוני המאמן. סינון לפי רמה, חיפוש, תגי מאגר `🅰️ N ✍️ M`. |
| **🧠 מאמן ידע אדפטיבי** | בחירת מושג משוקללת לפי רמה, יצירת שאלות אוטומטית (4 סוגי MC + Code-Fill), מצב "רק חלשים", דוח ציונים חי. |
| **📖 מדריך מקוצר** | 22 נושאים עם בלוקי טקסט/טבלה/קוד. שאלות מובנות פר-נושא מ-`questions_bank.js`. כל תשובה מקדמת מושג מקושר. |
| **🎯 לימוד מותאם** | תור מושגים חלשים (level ≤ 3), כרטיס לכל אחד עם כל 6 הרמות, דחיפה לסוף תור אם עדיין חלש. |
| **מאגר שאלות מובנה** | `data/questions_bank.js`: 44 MC + 17 Fill = 61 שאלות שעולות אוטומטית גם במאמן וגם במדריך. |
| **סרגל טאבים עליון** | 5 כפתורי pill: 📖 מדריך / 🧠 מאמן / 🎯 לימוד / 🗺️ מפת ידע / 🏠 שיעורים. |
| **🆕 פורמט שיעורים אדפטיבי** | בוטל: 6 טאבי רמות גלובליים. במקום: כל מושג מוצג ברמה האישית של התלמיד עבורו. כפתורי "🤔 רמה פשוטה" / "🖼️ תרשים" / "🎯 בחן אותי" שמובילים למיני-מבחן אינליין. |
| **MASTER_PLAN.md** | 280 שורות תכנון מלא לבניית 2,170 שאלות (5 פאזות, 5 תבניות, KPIs). |

### ⏳ פתוח (מסלול V2)

| תחום | מה צריך | עדיפות | סטטוס |
|---|---|---|---|
| **כיסוי מאגר השאלות** | מאגר נוכחי: **1,818 שאלות (1,316 MC + 502 Fill)** — 117 curated + 1,701 auto-seeded | 🔴 גבוהה | **83.8%** |
| **ניווט בתוך השיעור** | תפריט מושגים אופקי + ראייה ממוקדת על מושג יחיד | 🟡 בינונית | ✅ הושלם |
| **התקדמות גלובלית** | פס מבוסס רמות (avgLevel) במקום quizCompleted | 🟡 בינונית | ✅ הושלם |
| **Trainer Bank Coverage Report** | רשימת מושגים עם 0 שאלות + יעדים לכל קטגוריה | 🟢 נמוכה | ✅ הושלם |
| **Bank validation script** | `node scripts/validate_bank.js` — בודק conceptKey, correctIndex, ייחודיות IDs | 🟡 בינונית | ✅ הושלם |
| **Onboarding** | סיור 5-קלפים בברוכים-הבאים, נסגר ל-localStorage | 🟢 נמוכה | ✅ הושלם |
| **Mobile optimization** | תפריט מושגים אופקי, stages, trainer-toolbar — הכל מותאם <700px | 🟢 נמוכה | ✅ הושלם |
| **שיתוף התקדמות** | כפתור 📥 ייצוא CSV בטריינר — UTF-8 BOM + סיכום | 🟢 נמוכה | ✅ הושלם |
| **חיפוש גלובלי** | חיפוש בסרגל הצדדי מסנן רק שיעורים. רצוי שיחפש גם במושגים. | 🟢 נמוכה | ⏳ |
| **הערות עברית בקוד** | מנוע annotateCodeHebrew עם 90+ תבניות זיהוי — כפתור "💬 הערות בעברית" לכל בלוק קוד | 🟡 בינונית | ✅ הושלם |
| **פאנל "💡 למה זה קיים?"** | deepDive (purpose/problem/withoutIt/useWhen) + UI מתקפל — 17 מושגים מועשרים | 🟡 בינונית | ✅ הושלם |
| **אנלוגיות מחיי היום-יום** | `concept.analogies[level]` — אנלוגיה ברמה שמוצגת — 17 מושגים מועשרים | 🟡 בינונית | ✅ הושלם |
| **ביצועים** | `renderContent` מציג כעת רק כרטיס יחיד פעיל בכל רגע — בעיה נפתרה | 🟡 בינונית | ✅ הושלם |

---

## 2. סדר הביצוע (V2)

### 🔴 שלב A — חיזוק ליבת המוצר (השבוע הזה)

#### A1. תיקון פורמט השיעורים ✅ **הושלם בסיבוב הזה**
- בוטלו 6 הטאבים הגלובליים
- כל מושג מוצג ברמה האישית של התלמיד
- כפתורי עזרה אינליין: רמה פשוטה / תרשים / מבחן מקדם

#### A2. רינדור יעיל פר-כרטיס (טריוויאלי)
- במקום `renderContent()` שמרענן את כל הקונטיינר אחרי כל לחיצה — לרענן רק את הכרטיס שהשתנה.
- **מימוש:** `renderConceptCard` כבר מחזיר HTML פר-כרטיס. צריך עוטף `refreshConceptCard(conceptName)` שמחליף רק את ה-`outerHTML` של הכרטיס המתאים.

#### A3. עדכון פס "התקדמות כללית" שיתבסס על הרמות
- כיום: `completedCount / totalQuizzes`
- חדש: `(avgLevel - 1) / 6 * 100%` או `masteredCount / totalConcepts * 100%`

### 🟡 שלב B — הרחבת המאגר (השבועיים הבאים)
לפי `MASTER_PLAN.md` סעיף 4 — 5 פאזות:

| פאזה | יעד | שאלות | סטטוס |
|---|---|---:|---|
| 1 | Core JS (lessons 11+13) | 300 | 0/300 |
| 2 | Async + Backend (15-18) | 475 | 0/475 |
| 3 | React Core (21-24) | 395 | 0/395 |
| 4 | Advanced (12, 19, 20, 25-27) | 820 | 0/820 |
| 5 | Workbooks | 170 | 0/170 |

#### תהליך עבודה:
1. מבחר 10-15 מושגי-מפתח מהפאזה (priority list)
2. עבור כל מושג, יצירת 3 MC + 2 Fill לפי 5 התבניות (`MASTER_PLAN.md` סעיף 2)
3. הוספה ל-`data/questions_bank.js`
4. הרצת סקריפט וולידציה
5. בדיקה ויזואלית במפת הידע — כל 🅰️ 0 צריך להפוך ל-🅰️ 3+

### 🟢 שלב C — איכות, חוויית משתמש, פיצ'רים מתקדמים
- C1. Onboarding tour (סבב 5-שלבי בפעם הראשונה)
- C2. Search גלובלי בסרגל
- C3. ייצוא דוח (CSV/PDF)
- C4. Coverage Report בתוך הטריינר
- C5. סקריפט Node לוולידציה אוטומטית של `questions_bank.js`
- C6. רעיון מתקדם: לרשום heat-map של זמני תשובה כדי לזהות מושגים שדורשים יותר זמן

---

## 3. תכנית מימוש פרטנית — שלב A2: Per-card Refresh

```js
// Replace any callsite that does `renderContent()` after a single concept change
// with a targeted refresh:
function refreshConceptCard(conceptName) {
  const lesson = window.LESSONS_DATA.find(l => l.id === currentLessonId);
  if (!lesson) return;
  const concept = (lesson.concepts || []).find(c => c.conceptName === conceptName);
  if (!concept) return;

  const idx = (lesson.concepts || []).indexOf(concept);
  const oldCard = document.querySelector(
    `.concept-card.adaptive[data-concept="${cssEscape(conceptName)}"]`
  );
  if (!oldCard) { renderContent(); return; }

  // Build new card HTML and replace
  const tmp = document.createElement("div");
  tmp.innerHTML = renderConceptCard(lesson, concept, idx);
  const newCard = tmp.firstElementChild;
  oldCard.replaceWith(newCard);

  // Re-wire just this card
  // (extracted into wireSingleConceptCard for reuse)
}
```

**יתרון:** רינדור של כרטיס יחיד ~5ms במקום 50-200ms עבור שיעור עם 38 מושגים.

---

## 4. תכנית מימוש פרטנית — שלב A3: Global Progress

```js
// Replace updateProgress() with:
function updateProgress() {
  const all = trainableConcepts();
  if (all.length === 0) return;
  const totalLevels = all.reduce(
    (s, { lesson, concept }) => s + getScore(lesson.id, concept.conceptName).level,
    0
  );
  const avg = totalLevels / all.length;
  const pct = Math.round(((avg - 1) / 6) * 100);
  const masters = all.filter(
    ({ lesson, concept }) => getScore(lesson.id, concept.conceptName).level >= 7
  ).length;

  const bar = document.getElementById("global-progress");
  const text = document.getElementById("progress-text");
  if (bar) bar.style.width = pct + "%";
  if (text) text.textContent = `${masters}/${all.length} מאסטר · רמה ממוצעת ${avg.toFixed(1)}/7`;
}
```

ולהוסיף `updateProgress()` לכל קריאה ל-`applyAnswer` (או לעדכן בתוך `bumpScore`/`applyAnswer` עצמו).

---

## 5. תכנית מימוש פרטנית — שלב B: יצירת השאלות המסיבית

הדרך הכי יעילה — שילוב בין:
- **עין אנושית** (אני/אתה) שכותב 5-10 דוגמאות מופתיות לכל סוג שאלה
- **LLM-assisted batch generation** עם פרומפט קבוע
- **וולידציה אוטומטית** לפני merge

### תבנית פרומפט מומלצת (לכל מושג)

```
You are creating a question bank for a Hebrew JS/React learning portal.
Concept: "{conceptName}"
Lesson: {lessonId}
Existing explanation (junior level): "{junior explanation}"
Code example:
{codeExample}

Generate exactly:
- 3 multiple-choice questions (one each at levels 2, 4, 6)
- 2 code-fill questions (one each at levels 3, 5)

Each MC must have:
- Question in Hebrew
- 4 options (one correct, 3 plausible distractors that reflect common mistakes)
- correctIndex (0-based)
- A short Hebrew explanation

Each fill must:
- Use the existing code with one MEANINGFUL token replaced by ____ (the concept name itself if it appears, else a key keyword)
- The answer must appear EXACTLY ONCE in the original code
- Hint should give length and first letter
- Explanation should clarify the concept

Output format (JS object that can be appended to QUESTIONS_BANK.mc / .fill):
{...}
```

### סדר עבודה אופטימלי

1. **שבוע 1**: 60 מושגי הליבה (פאזה 1) — אני אכתוב יד 30 ראשונים, ה-LLM ייצר 30 הבאים, ואני אערוך
2. **שבוע 2-3**: שאר הפאזות בקצב של פאזה לשבוע
3. **שבוע 4**: סבב QA — אבחן אישית 10% מהשאלות שנוצרו אוטומטית
4. **שבוע 5**: השלמות, פוליש, רוטינות וולידציה

---

## 6. KPIs ומדדי הצלחה

| KPI | יעד | מדידה איך |
|---|---:|---|
| כיסוי MC | 100% (3+ פר מושג) | מפת ידע — אף 🅰️ 0 |
| כיסוי Fill | 100% למושגים עם codeExample | אף ✍️ 0 כשיש code |
| זמן רינדור שיעור | < 50ms | DevTools Performance |
| תשובות נכונות באמן | > 70% (לאחר רמה 3) | `trainerStats.correct/asked` |
| מושגים ברמה 7 לאחר 100 תשובות | > 30% | `masteredCount()` |
| Conversion to next level | > 50% מהקליקים על "🎯 בחן אותי" | metric בעתיד |

---

## 7. סיכון וסיכוי

### סיכונים
- **איכות שאלות שנוצרות אוטומטית**: distractors עלולים להיות חלשים. מטיגציה: QA אנושי.
- **ספריית `data/lesson*.js` לא אחידה**: חלק מהמושגים מנוסחים בעברית, חלק באנגלית, חלק ארוכים, חלק קצרים. מטיגציה: נורמליזציה לפני יצירת שאלות.
- **רגרסיה במנוע הרמות**: שינוי `applyAnswer` עלול לשבור את ה-localStorage של משתמשים קיימים. מטיגציה: bump version ל-`scores:v2` עם migration.

### סיכויים
- **המערכת כבר 90% שלמה** — נשארה בעיקר עבודת תוכן (שאלות), לא קוד.
- **מאגר השאלות מתועדף לפי שכיחות אמיתית בקורסים** → ההשפעה על תלמידים תהיה גבוהה.
- **המבנה האדפטיבי נדיר** — מערכת שמתאימה את עצמה לתלמיד פרטני, לא רק "פותחים שיעור".

---

## 8. הגדרת Done עבור MASTER_PLAN_V2

המערכת תוכרז כ-Production-Ready כש:
- ✅ כל 434 המושגים מכוסים ב-3+ MC ו-2+ Fill
- ✅ פס ההתקדמות הגלובלי מבוסס רמות
- ✅ אין מושג שמוצג עם 🅰️ 0 ✍️ 0
- ✅ זמן רינדור שיעור < 100ms
- ✅ סקריפט וולידציה רץ ב-CI ללא שגיאות
- ✅ Onboarding tour זמין לראשון
- ✅ דוח כיסוי בתוך הטריינר
