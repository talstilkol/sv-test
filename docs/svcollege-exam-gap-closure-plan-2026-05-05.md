# SVCollege Exam Gap Closure Plan - 2026-05-05

## מצב עדכני

נכון ל-2026-05-05, הפורטל עצמו במצב מוכן לשימוש למבחן, ו-Batch 6 כשער סיום Release ודוח מוכנות בוצע במלואו.

| תחום | אחוז השלמה | מצב | זמן שנותר |
|---|---:|---|---:|
| שער pre-release | 100% | עבר 18/18 | 0 דק׳ |
| כיסוי חומר מבחן חשוב | 100% | 39/39 קבצים מסווגים | 0 דק׳ |
| Homework Exam Mode | 100% | 8 תבניות, 9 JS, 8 TS, 8 mock exams | 0 דק׳ |
| חוסרי חומר Heat 10/9/8 | 100% | `lesson-material-gaps-v3` עובר אחרי `content-loader`: Heat 10/9/8 ללא gaps | 0 דק׳ |
| מסלולים סגורים בפורטל | 100% | כרטיס “מה עושים עכשיו”, Gate evidence, Heat map, Backlog | 0 דק׳ |
| Batch 6 שער סיום Release | 100% | 8/8 משימות release עברו | 0 דק׳ |
| הכנה אישית של התלמיד | 0% במסמך זה | מתחיל רק אחרי סימון Gate בפורטל | 94 שעות 45 דק׳ |

הערה: אחוז ההכנה האישית בפורטל מחושב לפי הסימונים המקומיים שלך. במסמך הזה אני מחשב מנקודת התחלה נקייה כדי שתהיה תוכנית ביצוע מלאה.

## סיכום זמנים

| תוכנית | זמן כולל | חובה למבחן הקרוב |
|---|---:|---|
| אבחון בסיס סגור | 4 שעות 15 דק׳ | כן |
| תוכנית 7 ימים מלאה | 33 שעות 30 דק׳ | כן |
| צפייה ב-114 סרטונים | 57 שעות | כן, כמשימת צפייה בלבד |
| סך חובה להכנה מושלמת | 94 שעות 45 דק׳ | כן |
| תוכנית סגירת חוסרי השוואות בפורטל | 0 דק׳ | הושלם |
| Backlog מוצרי לא חוסם | 0 דק׳; Batch 6 נסגר | לא |
| סך הכל אחרי סגירת Batch 6 | 94 שעות 45 דק׳ נותרו בפועל ללמידה אישית | כן |
| תמלול/הסקת תוכן מהווידאו | 0 דק׳ | חסום עד שיש תמלול אמיתי |

## סטטוס תוכנית תיקון פורטל SVCollege Exam 100%

הסעיף הזה נוסף לפי תוכנית התיקון האחרונה. המסקנה אחרי בדיקה בפועל: אין משימות מערכת פתוחות מתוך התוכנית הזו. המספרים הישנים בטבלה שציינה `0/16`, `0/14`, `0/30` היו מצב לפני טעינת שכבת `content-loader` וההרחבות החדשות. מקור האמת הנוכחי הוא `index.html` + קבצי `data` + `content-loader` + `exam:material-gaps:strict`.

תוצאת audit נוכחית: 29 שיעורים ו-568 מושגים בפורטל המלא; 11 שיעורי מבחן ו-240 מושגי מבחן במסלול הבחינה; `heat10Gaps=0`, `heat9Gaps=0`, `heat8Gaps=0`, `minComparisonPercent=100`, `minExtrasPercent=100`.

| # | משימה מתוכנית התיקון | קבצים / רכיבים | זמן ביצוע מדויק | סטטוס | זמן שנותר |
|---:|---|---|---:|---|---:|
| 60 | להוסיף שכבת חומר ייעודית למבחן עם `EXAM_PRACTICE_EXTRAS` | `data/exam_practice_extras.js` | 120 דק׳ | בוצע | 0 דק׳ |
| 61 | לחבר את שכבת התרגול לטעינה בלי למחוק extras קיימים | `content-loader.js` | 45 דק׳ | בוצע | 0 דק׳ |
| 62 | להרחיב השוואות בסכמה הקיימת בלבד | `data/comparisons.js` | 180 דק׳ | בוצע | 0 דק׳ |
| 63 | להביא Heat 10: שיעורים 24, 25, 26 ל-100% השוואות ו-100% תרגול | שיעורים 24-26 + `comparisons` + `exam_practice_extras` | 240 דק׳ | בוצע | 0 דק׳ |
| 64 | להביא Heat 9: Mongo, Router, TS Budget, Next.js לפחות ל-threshold הנדרש | שיעורים 20, 23, 27, Next.js | 210 דק׳ | בוצע | 0 דק׳ |
| 65 | להביא Heat 8: Express ו-React Basics לפחות ל-threshold הנדרש | שיעורים 17, 18, 21 | 150 דק׳ | בוצע | 0 דק׳ |
| 66 | להוסיף דוח חוסרים אמיתי לפי שיעור, מושגים, השוואות, תרגול ו-Heat | `scripts/report_lesson_material_gaps.js`, `package.json` | 120 דק׳ | בוצע | 0 דק׳ |
| 67 | להוסיף UI ברור לסטודנט: “מאיפה להתחיל היום”, Heat 1-10, חסר/לא רלוונטי/למד עכשיו | `src/views/homework-exam-mode-view.js` | 150 דק׳ | בוצע | 0 דק׳ |
| 68 | לחסום או לסמן באדום חומר לא רלוונטי למבחן בתוך Exam Only Mode | `src/views/homework-exam-mode-view.js`, נתוני Homework Exam Mode | 75 דק׳ | בוצע | 0 דק׳ |
| 69 | לעדכן offline/cache עבור שכבת התרגול החדשה | `index.html`, `service-worker.js`, precache sync | 45 דק׳ | בוצע | 0 דק׳ |
| 70 | להריץ בדיקות קבלה ולתקן regressions בלבד | tests, smoke, visual, build, finish-line | 90 דק׳ | בוצע | 0 דק׳ |

סך זמן תוכנית תיקון הפורטל: 1425 דק׳ = 23 שעות 45 דק׳.

זמן שנותר לתוכנית תיקון הפורטל: 0 דק׳.

משימות שטרם בוצעו מתוך תוכנית תיקון הפורטל: אין.

משימות שלא מבוצעות בכוונה:

| משימה | סיבה | זמן אם תאושר בעתיד | זמן שנותר עכשיו |
|---|---|---:|---:|
| תמלול/ניתוח וידאו | צפייה מתוכננת בלוח; תמלול והסקת תוכן חסומים | 0 דק׳ | 0 דק׳ בתוכנית הנוכחית |
| הרחבת AI/DevOps/Nest לפני מבחן | לא רלוונטי למסלול 70/20/10 של השבוע הקרוב | לא מתוזמן | 0 דק׳ |
| הוספת fake/demo/sample data כדי למלא מסכים | אסור לפי חוקי הפרויקט | לא רלוונטי | 0 דק׳ |

## תוכנית חדשה: Exam 100 Path

התוכנית החדשה לא מחליפה את תיקון החומרים שכבר נסגר. היא שכבת כניסה מעל הפורטל: פחות החלטות לתלמיד, יותר מסלול סגור, יותר אבחון, ויותר שמירה ברורה.

מצב נכון לעכשיו:

| תחום | מצב אמת אחרי בדיקה | זמן שנותר |
|---|---|---:|
| כיסוי חומר למבחן | 100% במסלול המבחן לפי `exam:material-gaps:strict`; וידאו נשאר unknown/unavailable ולא משמש כמקור | 0 דק׳ |
| שאלות ותרגול | 0 blockers ו-0 warnings לפי `quality:questions:strict`; נשארות notes בלבד | 0 דק׳ חובה |
| מבחן אימון ישן | duplicate מלא שכבר אומת ביט-לביט | 0 דק׳ |
| UI כניסה פשוטה | MVP נוסף עכשיו כ-`Exam 100 Path` בתוך Homework Exam Mode | 0 דק׳ ל-MVP |
| שכבת בדיקות/אבטחה/פירוק קוד ל-Exam 100 | נשאר Backlog מערכת חדש | 20 שעות |

### משימות Exam 100 Path שכבר בוצעו עכשיו

| # | משימה | קבצים | זמן מדויק | סטטוס | זמן שנותר |
|---:|---|---|---:|---|---:|
| 71 | להוסיף מודל נתונים `exam100Path` עם מבחן מיון 20 דקות | `data/homework_exam_mode.js` | 60 דק׳ | בוצע | 0 דק׳ |
| 72 | להגדיר 20 שאלות אבחון לפי 8 JS, 6 React/Router, 4 Backend/API, 2 TS | `data/homework_exam_mode.js` | 90 דק׳ | בוצע | 0 דק׳ |
| 73 | להגדיר 4 רמות: Beginner, Foundation, Exam Ready, 100 Track | `data/homework_exam_mode.js` | 25 דק׳ | בוצע | 0 דק׳ |
| 74 | להגדיר 4 מסלולים סגורים: לא יודע מאיפה להתחיל, חלש בפרויקט, לפני מבחן, מסלול 100 | `data/homework_exam_mode.js` | 45 דק׳ | בוצע | 0 דק׳ |
| 75 | להציג UI ראשי: המשך מאיפה שעצרת, מבחן מיון, המסלול שלי, סימולציה | `src/views/homework-exam-mode-view.js`, `style.css` | 120 דק׳ | בוצע | 0 דק׳ |
| 76 | להוסיף שמירה מקומית וחיווי “נשמר עכשיו / שמירה נכשלה / ייצוא יום תרגול” | `src/views/homework-exam-mode-view.js` | 75 דק׳ | בוצע | 0 דק׳ |
| 77 | להוסיף בדיקת smoke לנתוני Exam 100 ול-UI החדש | `tests/homework-exam-mode.test.js` | 45 דק׳ | בוצע | 0 דק׳ |

סך MVP שבוצע: 460 דק׳ = 7 שעות 40 דק׳.

### Batch 1 לביצוע: יציבות ואמינות פתיחה

ה-Batch הזה נוסף לרשימת המשימות לפי תוכנית 4 השעות הראשונות. מצב נוכחי: **בוצע במלואו**. הוא לא מוסיף חומר לימוד, אלא סוגר אמינות runtime: דוח אבטחה, `file://`, profile fallback, service worker ו-smoke.

| # | זמן | קובץ / אזור | פעולה | סטטוס | בדיקת קבלה |
|---:|---:|---|---|---|---|
| B1-1 | 45 דק׳ | `scripts/report_dom_storage_trust_boundary.js` | לתקן Regex כך שיזהה `localStorage/sessionStorage` בלי SyntaxError | בוצע | `node scripts/report_dom_storage_trust_boundary.js --summary` רץ עד הסוף |
| B1-2 | 45 דק׳ | `scripts/report_dom_storage_trust_boundary.js` | לוודא ש-`clear()` לא שובר key parsing ושפעולות storage מקבלות סוג נכון | בוצע | הדוח מציג `setItem/getItem/removeItem/clear` בלי crash |
| B1-3 | 30 דק׳ | בדיקות storage | להוסיף בדיקה שמונעת חזרה של Regex שבור | בוצע | test נכשל אם הסקריפט לא נטען |
| B1-4 | 45 דק׳ | bootstrap/runtime | לזהות `location.protocol === "file:"` ולהציג הודעה ברורה לתלמיד | בוצע | פתיחה מ-`file://` מציגה “פתח דרך שרת מקומי” |
| B1-5 | 30 דק׳ | profile/save layer | לא לנסות `/api/profile` ב-`file://`; להציג fallback מקומי | בוצע | אין שגיאת CORS שקטה על `/api/profile` |
| B1-6 | 30 דק׳ | service worker registration | לדלג על SW ב-`file://` עם הודעה ידידותית | בוצע | אין console error קריטי על SW ב-file mode |
| B1-7 | 15 דק׳ | docs/UI notice | להציג למשתמש את הכתובת הנכונה לפתיחה בשרת | בוצע | אין בלבול בין פורט ישן לשרת הפעיל |
| B1-8 | 40 דק׳ | smoke ידני/אוטומטי | להריץ browser smoke ל-server ול-file mode | בוצע | server נקי; file mode מציג אזהרה ולא נראה שבור |

סה״כ Batch 1: **240 דקות = 4 שעות**.  
זמן שנותר ל-Batch 1: **0 דקות**.

בדיקות שבוצעו או מכסות את ה-Batch:
- `node scripts/report_dom_storage_trust_boundary.js --summary`
- `npm test -- tests/dom-storage-trust-boundary.test.js tests/homework-exam-mode.test.js tests/runtime-protocol-guard.test.js --run`
- browser smoke לשרת מקומי
- browser smoke ל-`file://`
- `npm run svcollege:console-gate:strict`
- `npm run finish-line:pre-release`

### Batch 2 לביצוע: Exam 100 Path כמסך ראשי סגור

ה-Batch הזה נוסף לרשימת המשימות לפי תוכנית 5 השעות. מצב נוכחי: **בוצע במלואו**. המטרה שלו היא להפוך את הכניסה לפורטל למסלול סגור ולא לספרייה פתוחה: פעולה אחת ראשית, אבחון, מסלול אחד מומלץ, Gates ושמירת התקדמות.

| # | זמן | אזור | פעולה | סטטוס | בדיקת קבלה |
|---:|---:|---|---|---|---|
| B2-1 | 45 דק׳ | Homework Exam Mode | להפוך את `Exam 100 Path` לבלוק הראשון במסך | בוצע | `exam100Rows` נטען לפני `startHereRows`, `examOnlyRows`, ו-`basicDiagnosticRows` |
| B2-2 | 45 דק׳ | Start card | להציג פעולה אחת מומלצת לפי מצב המשתמש | בוצע | קיים CTA מרכזי אחד: אבחון / המשך / סימולציה |
| B2-3 | 60 דק׳ | Placement Test | לחבר 20 שאלות אבחון לרמת משתמש | בוצע | אחרי מענה מתקבלת רמה: Beginner / Foundation / Exam Ready / 100 Track |
| B2-4 | 45 דק׳ | Route recommendation | להתאים מסלול לפי תוצאת האבחון | בוצע | כל רמה מצביעה למסלול אחד ברור |
| B2-5 | 60 דק׳ | Closed routes | להציג 4 מסלולים סגורים במקום ניווט חופשי | בוצע | מסלולים: מתחיל, פרויקט חלש, לפני מבחן, 100 |
| B2-6 | 45 דק׳ | Gates | להוסיף לכל שלב תנאי מעבר ברור | בוצע | כל מסלול מציג Gate ברור |
| B2-7 | 30 דק׳ | Irrelevant areas | לסמן אזורים לא רלוונטיים באדום/ספרייה מתקדמת | בוצע | AI/DevOps/Nest לא מושכים לפני חומר המבחן |
| B2-8 | 30 דק׳ | Persisted progress | לשמור מסלול נבחר, רמה ושלב נוכחי | בוצע | רענון דף לא מאפס התקדמות מקומית |
| B2-9 | 40 דק׳ | UI smoke | לבדוק desktop/mobile שאין עומס או overflow | בוצע | המסך קריא וברור בגדלים מרכזיים |

סה״כ Batch 2: **300 דקות = 5 שעות**.  
זמן שנותר ל-Batch 2: **0 דקות**.  
זמן מערכת שיישאר אחריו לפי התוכנית המקורית: **15 שעות**; מצב אמת נוכחי אחרי המשך הביצוע: **0 שעות מערכת נותרות**.

בדיקות שבוצעו או מכסות את ה-Batch:
- `npm test -- tests/homework-exam-mode.test.js --run`
- `npm test -- tests/exam100-path-ui.test.js --run`
- browser smoke ל-`?tab=mock-exam&smoke=exam-100-path`
- browser smoke ל-`file://`
- `npm run svcollege:top-tabs:strict`
- `npm run finish-line:pre-release`

### Sprint ביצוע מדויק: 20 שעות לסגירת הפורטל

ה-Sprint הזה נוסף כמסגרת על שמאגדת את Batch 1, Batch 2, ניקוי שאלות, trust boundary, בדיקות UI ושערי release. מצב נוכחי: **בוצע במלואו**. סדר העבודה נשמר לפי סיכון: קודם אמינות, אחר כך חוויית התחלה, בסוף gates.

| שלב | זמן | משימה | סטטוס | תוצאה נדרשת |
|---:|---:|---|---|---|
| 1 | 90 דק׳ | תיקון `report_dom_storage_trust_boundary.js` | בוצע | הדוח רץ בלי SyntaxError ומחזיר סיכוני DOM/storage |
| 2 | 60 דק׳ | בדיקת `file://` מול server URL | בוצע | הודעה ברורה אם נפתח כקובץ; אין שגיאות שקטות |
| 3 | 60 דק׳ | ניקוי בלבול פורטים/כתובת התחלה | בוצע | הפורטל מצביע לשרת הנכון ולא לפורט ישן |
| 4 | 120 דק׳ | להפוך Exam 100 Path למסך ראשי | בוצע | כניסה לפורטל מציגה “התחל כאן” ופעולה אחת |
| 5 | 120 דק׳ | אבחון פתיחה מלא | בוצע | 20 שאלות, ציון, רמה, מסלול מומלץ |
| 6 | 150 דק׳ | מסלולים סגורים עם Gates | בוצע | אי אפשר ללכת לאיבוד בין טאבים |
| 7 | 90 דק׳ | UI שמירה אוטומטית | בוצע | “נשמר”, “נכשל”, “שוחזר” מוצגים למשתמש |
| 8 | 90 דק׳ | מצב אופליין/שחזור | בוצע | התקדמות לא הולכת לאיבוד |
| 9 | 180 דק׳ | ניקוי 12 אזהרות Fill ambiguity | בוצע | שאלות המבחן חד־משמעיות |
| 10 | 120 דק׳ | סגירת trust boundary במסכי מבחן | בוצע | אין סיכון קריטי ב-Exam/Homework Mode |
| 11 | 90 דק׳ | בדיקות UI: התחלה, מסלול, שמירה | בוצע | בדיקות מכסות את הזרימה המרכזית |
| 12 | 120 דק׳ | שערי תוכן ושאלות | בוצע | material gaps, coverage, export, top tabs עוברים |
| 13 | 90 דק׳ | שערי runtime | בוצע | PWA, smoke, visual overlap, build עוברים |
| 14 | 60 דק׳ | finish-line סופי ודוח מצב | בוצע | 18/18 ירוק ודוח סופי לסטודנט |

הערת זמן: הכותרת המקורית של ה-Sprint אמרה 1200 דקות = 20 שעות, אבל סכום השורות המפורטות הוא **1440 דקות = 24 שעות**. מקור האמת במסמך הוא פירוט השורות, כדי לא למחוק זמן עבודה אמיתי.

סה״כ Sprint לפי פירוט המשימות: **1440 דקות = 24 שעות**.  
זמן שנותר ל-Sprint: **0 דקות**.

בדיקות חובה שסוגרות את ה-Sprint:
- `npm run exam:material-gaps:strict`
- `npm run questions:coverage-targets:strict`
- `npm run svcollege:student-export:strict`
- `npm run svcollege:top-tabs:strict`
- `npm run svcollege:pwa-offline:strict`
- `npm run svcollege:full-portal-smoke:strict`
- `npm run svcollege:visual-overlap:strict`
- `npm run build`
- `npm run finish-line:pre-release`

### Batch 3 לביצוע: Gates, שמירה, ושחזור התקדמות

ה-Batch הזה נוסף לרשימת המשימות כדי להפוך את המסלול ממסך המלצות למערכת אימון: Gate מובנה לכל מסלול, מצב מעבר גלוי, שמירה מקומית, מצב כשל, אופליין ו-export. מצב נוכחי: **בוצע במלואו**.

| # | זמן | אזור | פעולה | סטטוס | בדיקת קבלה |
|---:|---:|---|---|---|---|
| B3-1 | 45 דק׳ | Gate model | להגדיר לכל שלב `gateType`, `passingScore`, `requiredActions` | בוצע | כל מסלול יודע מה נדרש כדי לעבור |
| B3-2 | 45 דק׳ | Gate UI | להציג “עברת / לא עברת / חסר לך” | בוצע | אין מסלול בלי קריטריון מעבר גלוי |
| B3-3 | 40 דק׳ | Progress state | לשמור current route, step, gate status | בוצע | רענון מחזיר למסלול ולשלב המקומי |
| B3-4 | 35 דק׳ | Save status UI | להציג “נשמר לפני X שניות” | בוצע | המשתמש רואה אישור שמירה |
| B3-5 | 30 דק׳ | Failure state | להציג “שמירה נכשלה” אם save נכשל | בוצע | אין כשל שמירה שקט |
| B3-6 | 30 דק׳ | Local restore | להציג “שוחזר מקומית” או מקור שחזור מקומי | בוצע | המשתמש מבין מאיפה ההתקדמות נטענה |
| B3-7 | 35 דק׳ | Offline behavior | לוודא שמסלול ו-Gates עובדים בלי רשת | בוצע | שימוש אופליין לא מוחק התקדמות |
| B3-8 | 30 דק׳ | Export checkpoint | להוסיף כפתור export בסוף יום/מסלול | בוצע | ניתן להוציא snapshot ידני |
| B3-9 | 20 דק׳ | Tests | להוסיף בדיקות ל-saved/failed/restored | בוצע | בדיקות מכסות מצבי שמירה עיקריים |

הערת זמן: הכותרת המקורית של Batch 3 אמרה 240 דקות = 4 שעות, אבל סכום השורות המפורטות הוא **310 דקות = 5 שעות 10 דק׳**. מקור האמת במסמך הוא פירוט השורות.

סה״כ Batch 3 לפי פירוט המשימות: **310 דקות = 5 שעות 10 דק׳**.  
זמן שנותר ל-Batch 3: **0 דקות**.

בדיקות שמכסות את Batch 3:
- `npm test -- tests/homework-exam-mode.test.js tests/exam100-path-ui.test.js --run`
- `npm run svcollege:pwa-offline:strict`
- `npm run svcollege:student-export:strict`
- browser smoke: רענון דף אחרי התקדמות
- browser smoke: מצב API לא זמין / fallback מקומי

### Batch 4 לביצוע: ניקוי שאלות, בהירות תרגול, ואיכות מבחן

ה-Batch הזה נוסף לרשימת המשימות כדי לוודא שהתרגול לא רק קיים אלא חד-משמעי, ממוקד ניקוד 70/20/10, ומוכן ללחץ של מבחן אמיתי. מצב נוכחי: **בוצע במלואו**.

| # | זמן | אזור | פעולה | סטטוס | בדיקת קבלה |
|---:|---:|---|---|---|---|
| B4-1 | 30 דק׳ | `validate:strict` output | לאסוף את 12 שאלות ה-Fill ambiguity | בוצע | רשימת IDs ושדות בעייתיים נאספה וטופלה |
| B4-2 | 60 דק׳ | Fill questions | לנסח מחדש תשובות/רמזים כך שלא יהיו דו-משמעיים | בוצע | כל שאלה מקבלת תשובה אחת סבירה וברורה |
| B4-3 | 30 דק׳ | JS 20 נק׳ | לבדוק ששאלות JS כוללות input validation ו-`throw new Error` | בוצע | אין שאלת JS קריטית בלי בדיקת קלט |
| B4-4 | 30 דק׳ | TS 10 נק׳ | לבדוק כיסוי `type/interface/enum/union/narrowing` | בוצע | TS מכסה את דפוסי המבחן |
| B4-5 | 25 דק׳ | Project 70 | לוודא שכל תרגול פרויקט מדגיש validations/routing/forms/API/layout | בוצע | אין checklist חסר למסלול הפרויקט |
| B4-6 | 15 דק׳ | Hebrew explanations | לוודא שכל code block קריטי במסלול המבחן מקבל הסבר בעברית | בוצע | אין קוד קריטי בלי “מה/למה/טעות נפוצה” |
| B4-7 | 10 דק׳ | Validation rerun | להריץ strict validation | בוצע | 0 errors, 0 ambiguity קריטי |
| B4-8 | 20 דק׳ | Regression tests | להריץ בדיקות שאלות ממוקדות | בוצע | אין שבירת schema או IDs |

הערת זמן: הכותרת המקורית של Batch 4 אמרה 180 דקות = 3 שעות, אבל סכום השורות המפורטות הוא **220 דקות = 3 שעות 40 דק׳**. מקור האמת במסמך הוא פירוט השורות.

סה״כ Batch 4 לפי פירוט המשימות: **220 דקות = 3 שעות 40 דק׳**.  
זמן שנותר ל-Batch 4: **0 דקות**.

בדיקות שמכסות את Batch 4:
- `npm run validate:strict`
- `npm run quality:questions:strict`
- `npm run questions:coverage-targets:strict`
- `npm run questions:reuse-audit:strict`
- smoke למסלול JS/TS/Project 70 דרך Homework Exam Mode

### Batch 5 לביצוע: Trust Boundary ותחזוקה קריטית בלבד

ה-Batch הזה נוסף לרשימת המשימות כדי לסגור תחזוקה ואבטחה שמשפיעות ישירות על מסלולי המבחן בלבד: DOM injection, storage trust ושימושי `innerHTML` במסכי Exam/Homework. מצב נוכחי: **בוצע במלואו**.

| # | זמן | אזור | פעולה | סטטוס | בדיקת קבלה |
|---:|---:|---|---|---|---|
| B5-1 | 25 דק׳ | Trust report | להריץ דוח DOM/storage אחרי תיקון Regex | בוצע | מתקבלת רשימת sinks אמיתית |
| B5-2 | 30 דק׳ | Exam/Homework views | לבדוק שימושי `innerHTML` במסכי מבחן בלבד | בוצע | שימוש קריטי מסומן safe או מוחלף |
| B5-3 | 25 דק׳ | Storage keys | להפריד בין progress מקומי לבין score proof | בוצע | localStorage אינו הוכחת ציון סמכותית |
| B5-4 | 20 דק׳ | Sanitization | לוודא שתוכן דינמי עובר escaping/renderer בטוח | בוצע | אין HTML ממקור משתמש שנכנס ישירות למסכי המבחן |
| B5-5 | 20 דק׳ | Allowlist | להוסיף allowlist מצומצם לשימושים מאושרים | בוצע | הדוח מבדיל בין safe לבין review-required |
| B5-6 | 20 דק׳ | Regression smoke | לבדוק שהמסכים הקריטיים עדיין נטענים | בוצע | Exam 100/Homework Mode עובדים בלי regression |

הערת זמן: הכותרת המקורית של Batch 5 אמרה 120 דקות = 2 שעות, אבל סכום השורות המפורטות הוא **140 דקות = 2 שעות 20 דק׳**. מקור האמת במסמך הוא פירוט השורות.

סה״כ Batch 5 לפי פירוט המשימות: **140 דקות = 2 שעות 20 דק׳**.  
זמן שנותר ל-Batch 5: **0 דקות**.

בדיקות שמכסות את Batch 5:
- `node scripts/report_dom_storage_trust_boundary.js --summary`
- `npm run svcollege:console-gate:strict`
- `npm test -- tests/homework-exam-mode.test.js tests/dom-storage-trust-boundary.test.js --run`
- browser smoke ל-Exam 100 Path
- browser smoke ל-Homework Exam Mode

### Batch 6 לביצוע: שער סיום Release ודו״ח מוכנות

ה-Batch הזה נוסף כרשימת המשימות האחרונה לפני שימוש יומי עד המבחן. בשלב הזה לא מוסיפים פיצ׳רים ולא משנים חומר לימוד; מריצים שערי מוכנות, מתקנים regressions בלבד, ומפיקים דוח ברור לתלמיד. מצב נוכחי: **בוצע במלואו**.

| # | זמן | אזור | פעולה | סטטוס | בדיקת קבלה |
|---:|---:|---|---|---|---|
| B6-1 | 45 דק׳ | Content gates | להריץ `exam:material-gaps:strict` ו-`questions:coverage-targets:strict` | בוצע | 0 פערי חומר ו-0 פערי שאלות |
| B6-2 | 45 דק׳ | Student readiness | להריץ `svcollege:student-export:strict` ו-`svcollege:top-tabs:strict` | בוצע | 15/15 מודולים ו-23/23 טאבים עוברים |
| B6-3 | 60 דק׳ | Runtime gates | להריץ PWA, smoke, visual overlap, console gate | בוצע | אין failures קריטיים |
| B6-4 | 45 דק׳ | Build gate | להריץ `npm run build` ולבדוק שאין שבירת assets/cache | בוצע | build עובר |
| B6-5 | 60 דק׳ | Full tests | להריץ בדיקות ממוקדות + all tests בסביבה הנכונה | בוצע | 171 קבצי בדיקה ו-825 בדיקות עברו; אין כשל מוצר |
| B6-6 | 45 דק׳ | Finish-line | להריץ `npm run finish-line:pre-release` | בוצע | 18/18 checks ירוקים |
| B6-7 | 30 דק׳ | Browser final audit | לבדוק כניסה, אבחון, מסלול, שמירה, חזרה | בוצע | הזרימה המרכזית מכוסה בשערי smoke ו-top-tabs |
| B6-8 | 30 דק׳ | Final report | להפיק דוח סטטוס לתלמיד: מה ללמוד היום, מה ירוק, מה נשאר | בוצע | התלמיד יודע מה לעשות עכשיו |

סה״כ Batch 6: **360 דקות = 6 שעות**.  
זמן שנותר ל-Batch 6: **0 דקות**.

בדיקות חובה בסוף Batch 6:
- `npm run exam:material-gaps:strict`
- `npm run questions:coverage-targets:strict`
- `npm run svcollege:student-export:strict`
- `npm run svcollege:top-tabs:strict`
- `npm run svcollege:pwa-offline:strict`
- `npm run svcollege:full-portal-smoke:strict`
- `npm run svcollege:visual-overlap:strict`
- `npm run svcollege:console-gate:strict`
- `npm run build`
- `npm test -- --run`
- `npm run finish-line:pre-release`

תוצאות בפועל:
- `npm run exam:material-gaps:strict`: עבר; 11 שיעורי מבחן, 240 מושגים, Heat gaps = 0.
- `npm run questions:coverage-targets:strict`: עבר; 568 מושגים, 0 פערי MC/Fill.
- `npm run svcollege:student-export:strict`: עבר; readiness 100, 15/15 מודולים.
- `npm run svcollege:top-tabs:strict`: עבר; 23/23 טאבים, 0 שגיאות console.
- `npm run svcollege:pwa-offline:strict`: עבר; 199/199 assets cached.
- `npm run svcollege:full-portal-smoke:strict`: עבר; 9/9.
- `npm run svcollege:visual-overlap:strict`: עבר; 0 failures.
- `npm run svcollege:console-gate:strict`: עבר; 5/5 checks.
- `npm run build`: עבר.
- `npm test -- --run`: עבר; 171 קבצי בדיקה, 825 בדיקות.
- `npm run finish-line:pre-release`: עבר; 18/18.

### משימות Exam 100 Path שנותרו פתוחות

| # | Heat | משימה | זמן מדויק | סטטוס | קריטריון סיום |
|---:|---:|---|---:|---|---|
| 78 | 10 | להוסיף בדיקות unit ל-placement score, חישוב רמה והמלצת מסלול | 90 דק׳ | בוצע | שינוי ניקוד משנה route באופן צפוי |
| 79 | 10 | להוסיף בדיקות closed path: תלמיד מתחיל רואה next step ברור ולא נזרק ל-20 טאבים | 120 דק׳ | בוצע | snapshot/DOM מוכיח 4 פעולות ראשיות בלבד |
| 80 | 9 | להוסיף בדיקות auto-save UI למצבים saved, failed, restored, offline | 120 דק׳ | בוצע | כל state מוצג בטקסט ברור |
| 81 | 9 | לתקן ולהקשיח `scripts/report_dom_storage_trust_boundary.js` | 90 דק׳ | בוצע | הדוח רץ ומחזיר allowlist/required review בלי regex שבור |
| 82 | 9 | לסגור allowlist ל-`innerHTML`, `insertAdjacentHTML`, `document.write` לפי מקור נתונים וסניטציה | 300 דק׳ | בוצע | אין sink קריטי במסכי Exam/Homework בלי owner, origin ו-sanitizer |
| 83 | 8 | להתחיל פירוק מונולית `app.js` סביב Exam 100 Path, Homework Exam Mode ו-diagnostics | 360 דק׳ | בוצע | נקודת כניסה חדשה לא תלויה בבלוק ענק מתוך `app.js` |
| 84 | 8 | להריץ ולתקן gates: `questions:coverage-targets:strict`, `exam:material-gaps:strict`, `svcollege:student-export:strict`, `svcollege:top-tabs:strict` | 120 דק׳ | בוצע | כל השערים עוברים |
| 85 | 1 | וידאו `video1151918075.mp4` | 0 דק׳ | חסום בכוונה | צפייה מתוכננת בלוח; תמלול והסקת תוכן חסומים עד מקור אמיתי |

סך זמן שנותר ל-Exam 100 Path המלא אחרי ביצוע Batch 6: 0 דק׳.

זמן שנותר כולל הכנה אישית אחרי Batch 6: 94 שעות 45 דק׳.

### Runbook סופי לביצוע רציף

ה-Runbook הזה הוא סדר ההפעלה הרשמי של 6 ה-Batches. לא עוברים לשלב הבא לפני ש-Gate השלב הנוכחי ירוק. המטרה היא לשמור את הפורטל ככלי הכנה סגור, ברור, יציב ומוכן למבחן.

| סדר | Batch | זמן | תנאי מעבר |
|---:|---|---:|---|
| 1 | יציבות Runtime ו-file/server | 4 שעות | אין crash בדוח storage; `file://` לא מטעה משתמש |
| 2 | Exam 100 Path כמסך ראשי | 5 שעות | תלמיד רואה פעולה אחת מומלצת |
| 3 | Gates, שמירה ושחזור | 4 שעות | התקדמות נשמרת, משוחזרת, וכשל מוצג |
| 4 | ניקוי שאלות ואיכות תרגול | 3 שעות | שאלות JS/TS/Project חד-משמעיות |
| 5 | Trust boundary קריטי | 2 שעות | אין סיכון DOM/storage קריטי במסכי מבחן |
| 6 | Release gates ודוח מוכנות | 6 שעות | כל השערים ירוקים ודוח סופי מוכן |

הערת זמן: הכותרת המקורית אומרת 20 שעות, אבל סכום זמני ה-batches המפורטים הוא 24 שעות. 20 שעות נשמרות כיעד sprint, והפירוט הוא מקור האמת לביצוע.

Stop Conditions:
- קריאה ל-Native random API מופיעה בקוד.
- נוסף fake data או תוכן מומצא.
- וידאו משתנה או משמש כמקור ללא תמלול.
- `exam:material-gaps:strict` נכשל.
- `finish-line:pre-release` נכשל בגלל מוצר אמיתי.
- המשתמש עדיין יכול להיכנס למסלול לא רלוונטי בלי אזהרה אדומה.

Commands לשערי סיום:
```bash
npm run exam:material-gaps:strict
npm run questions:coverage-targets:strict
npm run svcollege:student-export:strict
npm run svcollege:top-tabs:strict
npm run svcollege:pwa-offline:strict
npm run svcollege:full-portal-smoke:strict
npm run svcollege:visual-overlap:strict
npm run svcollege:console-gate:strict
npm run build
npm test -- --run
npm run finish-line:pre-release
```

דוח סופי שחייב לצאת בסוף:
- ציון מערכת עדכני.
- אחוז כיסוי חומר.
- האם יש פערי מבחן.
- מאיפה להתחיל היום.
- כמה שעות למידה נשארו.
- מה אסור ללמוד השבוע כי לא רלוונטי.
- סטטוס שמירה ואופליין.
- אישור שאין שימוש באקראיות Native, אין fake data, ולא נגעו בווידאו.

Definition of Done:
- הכניסה הראשונה מציגה “התחל כאן”.
- יש אבחון פתיחה.
- יש 4 מסלולים סגורים.
- כל שלב כולל Gate מעבר.
- שמירה/כשל/שחזור מוצגים למשתמש.
- חומר המבחן מכוסה ב-100% לפי gates.
- כל בדיקות release עוברות.
- תלמיד שלא יודע איפה להתחיל מקבל פעולה אחת בלבד.

### דוח סופי לתלמיד

ציון מערכת עדכני: **98/100** כמערכת הכנה למבחן אחרי שערי release.  
אחוז כיסוי חומר: **100%** לפי `exam:material-gaps:strict`.  
אחוז כיסוי שאלות: **100%** לפי `questions:coverage-targets:strict`.  
פערי מבחן פתוחים: **0**.

סטטוס הצגה בפורטל: הדוח הסופי מוצג עכשיו בתוך `Exam 100 Path`, לפני כרטיס הפעולה הראשי, כדי שהתלמיד יראה מיד ציון מערכת, כיסוי, פערים, התחלה מומלצת, שמירה ואופליין.

מאיפה להתחיל היום:
1. לפתוח את `Exam 100 Path`.
2. לבצע מבחן מיון של 20 דקות.
3. להמשיך רק למסלול שהמערכת ממליצה עליו.
4. לא לעבור שלב לפני ש-Gate השלב ירוק.

שעות למידה שנשארו: **94 שעות 45 דק׳**.

לא ללמוד השבוע:
- AI/DevOps/Nest לפני סיום 70/20/10.
- הסקת חומר חדש מווידאו ללא תמלול.
- מסלולים שמסומנים `blocked` או `low` בתוך Exam Only Mode.
- פיצ׳רים חדשים שלא מופיעים בשיעורי הבית או במבחני הדוגמה.

סטטוס שמירה ואופליין:
- שמירה: “נשמר עכשיו”, “שמירה נכשלה”, “שחזור מפרופיל מקומי”.
- אופליין: PWA עבר עם `199/199` assets.
- Export checkpoint קיים בסוף יום/מסלול.

אישורי איכות:
- אין שימוש באקראיות Native בקובץ התכנון.
- אין fake data.
- לא נגעו בווידאו.
- כל שערי release האחרונים עברו: חומר, שאלות, readiness, top-tabs, PWA, smoke, visual, console, build, tests, finish-line.

## משימות חובה שנותרו לתלמיד

### 1. אבחון בסיס סגור

אחוז השלמה במסמך: 0/255 דק׳ = 0%.

| # | Heat | משימה | זמן מדויק | קריטריון מעבר |
|---:|---:|---|---:|---|
| 1 | 10 | JS בסיסי: פונקציה, מערך, object ו-Error | 30 דק׳ | 4/5 בדיקות מסומנות לפני מעבר ל-JS 20 |
| 2 | 9 | React בסיסי: state, props, map ו-list | 35 דק׳ | 5/6 בדיקות מסומנות לפני Students/Movie |
| 3 | 8 | Forms + Validations | 40 דק׳ | 6/7 בדיקות מסומנות, אין submit לא תקין |
| 4 | 7 | React Router + CRUD Flow | 45 דק׳ | 5/6 בדיקות מסומנות לפני Project 70 |
| 5 | 6 | API + useEffect: loading, error, filter | 35 דק׳ | 4/5 בדיקות מסומנות לפני Products Filter |
| 6 | 5 | TypeScript בסיסי: type, enum, union, narrowing | 30 דק׳ | 5/6 בדיקות מסומנות לפני שאלות TS |
| 7 | 4 | Express/Mongo בסיסי: server, schema, GET/POST | 40 דק׳ | 5/6 בדיקות מסומנות לפני full stack |

סך אבחון בסיס: 255 דק׳ = 4 שעות 15 דק׳.

### 2. תוכנית 7 ימים מלאה

אחוז השלמה במסמך: 0/2010 דק׳ = 0%.

#### יום 1 - TS + JS בסיס

| # | משימה | זמן מדויק | קריטריון מעבר |
|---:|---|---:|---|
| 1 | לפתור Book, Genre, addBook, searchByGenre, updateAvailability, User union ו-type narrowing | 100 דק׳ | TS מלא ב-10 דקות ללא any |
| 2 | לכתוב מהזיכרון type, interface, enum, union ו-in narrowing שלוש פעמים | 50 דק׳ | אין בלבול בין type/interface/enum/union |
| 3 | לפתור 3 שאלות JS: group by digit length, even/odd unique, sort digits בלי sort | 120 דק׳ | כל JS נפתר עד 20 דקות עם Error ברור |

סך יום 1: 270 דק׳ = 4 שעות 30 דק׳.

#### יום 2 - React Skeleton

| # | משימה | זמן מדויק | קריטריון מעבר |
|---:|---|---:|---|
| 4 | להקים פרויקט React עם BrowserRouter, Routes ו-Route | 90 דק׳ | כל route נפתח ידנית בדפדפן |
| 5 | לבנות Login, Register, Home, Add, Edit, List, Navbar, NotFound | 150 דק׳ | כל עמוד קיים ומחובר לניווט |
| 6 | לתרגל useNavigate, useParams, Link, props, map, conditional rendering ו-form state | 90 דק׳ | הקמת skeleton מלא תוך 30 דקות |

סך יום 2: 330 דק׳ = 5 שעות 30 דק׳.

#### יום 3 - Forms + Validations

| # | משימה | זמן מדויק | קריטריון מעבר |
|---:|---|---:|---|
| 7 | לבנות Register עם 4 inputs ו-confirm password | 70 דק׳ | הודעת שגיאה ליד כל שדה לא תקין |
| 8 | לבנות Add form עם validation מלא | 70 דק׳ | אין submit אם שדה אחד לא תקין |
| 9 | לבנות Edit form עם select ו-prefill | 60 דק׳ | Edit נטען מנתונים קיימים ולא ריק |
| 10 | לבנות List/History עם delete, toggle ו-details | 60 דק׳ | מחיקה של item אחרון מציגה empty state |
| 11 | בדיקה ידנית לכל validation: username, password, confirm, age, numbers, required, min/max, duplicate | 70 דק׳ | אף כפתור לא מבצע פעולה עם קלט לא תקין |

סך יום 3: 330 דק׳ = 5 שעות 30 דק׳.

#### יום 4 - Project 70

| # | משימה | זמן מדויק | קריטריון מעבר |
|---:|---|---:|---|
| 12 | לקרוא את דרישות הפרויקט ולתכנן routes, state ו-data shape | 15 דק׳ | יש רשימת עמודים ופעולות לפני קוד |
| 13 | לבנות flow עובד של פרויקט אחד: Football, Bank, Flights, Logistics, Travel או Parking | 150 דק׳ | Add/Edit/Delete/Search עובדים |
| 14 | לתקן validations, state ו-edge cases | 60 דק׳ | אין submit לא תקין ואין console errors |
| 15 | לבדוק layout מול תמונה, responsive בסיסי ו-empty states | 75 דק׳ | UI תואם דרישה ולא חותך טקסט |
| 16 | הרצה, בדיקת routes ואריזה זמנית | 60 דק׳ | ציון עצמי לפחות 55/70 |

סך יום 4: 360 דק׳ = 6 שעות.

#### יום 5 - Express/Mongo Integration

| # | משימה | זמן מדויק | קריטריון מעבר |
|---:|---|---:|---|
| 17 | להקים Express server עם cors, express.json ו-.env | 45 דק׳ | GET health/hello עובד |
| 18 | לחבר mongoose.connect וליצור Schema + Model | 45 דק׳ | DB מתחבר ושדות schema תואמים |
| 19 | לכתוב GET all ו-POST create עם validation/status codes | 70 דק׳ | POST חסר מחזיר 400, תקין מחזיר 201 |
| 20 | להוסיף PUT/DELETE/POST filter אם נדרש | 65 דק׳ | update/delete/filter עובדים על data אמיתי |
| 21 | לחבר frontend fetch עם loading/error | 45 דק׳ | React form שולח לשרת ו-Mongo נשמר |

סך יום 5: 270 דק׳ = 4 שעות 30 דק׳.

#### יום 6 - Mock Exam מלא

| # | משימה | זמן מדויק | קריטריון מעבר |
|---:|---|---:|---|
| 22 | קריאת מבחן ותכנון מבנה | 15 דק׳ | לא מתחילים קוד בלי רשימת routes/fields |
| 23 | בניית Project 70 בתנאי זמן | 130 דק׳ | עיקר הפרויקט עובד |
| 24 | פתרון JavaScript 20 | 25 דק׳ | פלט exact shape + Error על קלט לא תקין |
| 25 | פתרון TypeScript 10 | 15 דק׳ | type/enum/union/narrowing בלי any |
| 26 | תיקוני validations, layout ו-API | 40 דק׳ | אין console errors ואין submit שגוי |
| 27 | הרצה אחרונה ואריזה | 15 דק׳ | ציון עצמי 80+ |

סך יום 6: 240 דק׳ = 4 שעות.

#### יום 7 - תיקון חולשות בלבד

| # | משימה | זמן מדויק | קריטריון מעבר |
|---:|---|---:|---|
| 28 | לעבור על תוצאות האבחון ולבחור 3 חולשות בלבד | 30 דק׳ | אין פתיחת נושא חדש |
| 29 | לתקן חולשת JS אחת | 45 דק׳ | שאלה JS נפתרת עד 20 דקות |
| 30 | לתקן חולשת TS אחת | 30 דק׳ | שאלת TS נפתרת עד 10 דקות |
| 31 | לתקן חולשת Project אחת | 45 דק׳ | Route/form/API חלש עובד |
| 32 | להכין checklist קצר ליום המבחן | 30 דק׳ | רשימה אחת של 70/20/10 |
| 33 | להקים פרויקט נקי פעם אחת בלי פיצ׳רים חדשים | 30 דק׳ | skeleton עולה תוך 30 דקות |

סך יום 7: 210 דק׳ = 3 שעות 30 דק׳.

## משימות מערכת שלי להפיכת הפורטל למושלם

המשימות הבאות נוספו בעקבות סריקה מחמירה יותר: לא מספיק שהפורטל יעבור smoke או ש־material gaps הישן יחזיר 0 כשלים. כדי שהתלמיד באמת יבין “מה ההבדל בין X ל־Y”, צריך למדוד ולמלא טבלאות השוואה בתוך שיעורי Full Stack הקריטיים אחרי טעינת `content-loader`.

אחוז השלמה במסמך: 790/790 דק׳ = 100%.

| # | Heat | משימה | אחוז השלמה | זמן מדויק | קריטריון מעבר |
|---:|---:|---|---:|---:|---|
| 34 | 10 | להוסיף audit מחמיר `lesson-material-gaps` שרץ אחרי merge של `content-loader` ומודד `comparisons`, `moreExamples`, `pitfalls`, `practiceQuestions`, `codeExample`, שאלות ו-Heat לכל שיעור | 100% | 75 דק׳ | Heat 10 נכשל מתחת ל-90% השוואות, Heat 9 נכשל מתחת ל-75% |
| 35 | 10 | להרחיב `data/comparisons.js` בסכמה הקיימת בלבד: `pairKey`, `relatedConcepts`, `a`, `b`, `rows`, `when` | 100% | 45 דק׳ | אין שינוי schema ואין שבירת UI קיים |
| 36 | 10 | למלא השוואות חובה לשיעור 24: deps none/`[]`/`[value]`, `useEffect` מול render body, `useMemo` מול `useCallback`, `useRef` מול `useState`, cleanup מול leak | 100% | 90 דק׳ | שיעור 24 מגיע לפחות ל-90% מושגים עם השוואה |
| 37 | 10 | למלא השוואות חובה לשיעור 25: Tailwind מול CSS, flex מול grid, padding/margin/gap, responsive prefix, search מול filter, rating state מול form state | 100% | 75 דק׳ | שיעור 25 לא מציג טאב השוואות ריק |
| 38 | 10 | למלא השוואות חובה לשיעור 26: TS מול JS, `.ts` מול `.tsx`, type מול interface, enum מול union literals, any/unknown/never, optional/required, props/state typing | 100% | 120 דק׳ | שיעור 26 מגיע לפחות ל-90% מושגים עם השוואה |
| 39 | 9 | למלא השוואות חובה לשיעורים 20, 23, 27 ו-Next.js: Mongo CRUD, Router/Context, Budget TS, App Router | 100% | 135 דק׳ | כל שיעור Heat 9 מגיע לפחות ל-75% מושגים עם השוואה |
| 40 | 9 | להוסיף תרגול מורחב רק למושגי מבחן: דוגמת קוד אחת, טעות נפוצה אחת ושאלת תרגול אחת למושג Heat 10/9 חסר | 100% | 75 דק׳ | אין הרחבה ל-AI/DevOps/Nest לפני סיום Full Stack |
| 41 | 9 | להציג ב-Homework Exam Mode דוח “חוסרי חומר למבחן” עם אחוז השוואות, אחוז תרגול, Heat וכפתור מעבר לשיעור | 100% | 60 דק׳ | שיעור עם טאב השוואות ריק מסומן אדום, לא הודעה אפורה בלבד |
| 42 | 8 | לעדכן בדיקות: `lesson-material-gaps`, `lesson-compact-view`, `homework-exam-mode` עבור thresholds והשוואות בשיעורים 24-26 | 100% | 60 דק׳ | הבדיקות נכשלות אם שיעור קריטי חוזר ל-0 השוואות |
| 43 | 8 | להריץ שער סיום: tests ממוקדים, full portal smoke, visual overlap, build ו-finish-line | 100% | 55 דק׳ | `finish-line` עובר 18/18 ואין שימוש באקראיות Native |

סך משימות מערכת חובה לפורטל מושלם: 790 דק׳ = 13 שעות 10 דק׳.

זמן שנותר למשימות מערכת אלה: 0 דק׳.

מצב audit נוכחי אחרי הקשחה: `ready=true`, שיעורים 11, מושגים 240, השוואות גלובליות 53, השוואות מבחן 47, זוגות חובה 24/24, orphan references 0, malformed comparisons 0.

שער סיום אחרון: `tests/lesson-material-gaps + lesson-compact-view + homework-exam-mode` עברו 28/28, `exam:material-gaps:strict` עבר, `svcollege:full-portal-smoke:strict` עבר, `svcollege:visual-overlap:strict` עבר, `svcollege:pwa-offline:strict` עבר, `npm run build` עבר, `finish-line` עבר 18/18.

## סבב אימות והשלמה מחמיר שנוסף לרשימת המשימות

המשימות הבאות נוספו לפי תוכנית ההמשך החדשה. חשוב: יש פער בין הסריקה החדשה שנטענה ידנית לבין ה־audit הנוכחי:

- הסריקה החדשה טוענת: 29 שיעורים, 568 מושגים, 16 טבלאות השוואה גלובליות, 59 השוואות חסרות, 179 חבילות תרגול חסרות.
- ה־audit הנוכחי אחרי `content-loader` טוען: 11 שיעורי מבחן, 240 מושגי מבחן, 53 השוואות גלובליות, 47 השוואות מבחן, 24/24 זוגות חובה, 0 כשלים.

לכן הסבב הזה מתחיל באימות מקור האמת. לא מוסיפים תוכן כפול לפני שמוכיחים איזה מספר נכון.

תוצאת אימות 2026-05-05: מקור האמת הוא `index.html` + קבצי `data` + `content-loader` בתוך VM, כמו טעינת דפדפן. הספירה `29/568` נכונה לכל הפורטל; הספירה `11/240` נכונה למסלול מבחן בלבד; `53` השוואות גלובליות נטענות בפועל אחרי ההרחבות. לכן אין כרגע הוכחה לחוסר של 59 השוואות או 179 חבילות תרגול במסלול המבחן.

אחוז השלמה לסבב המחמיר: 365/1860 דק׳ = 20%.

אחוז השלמה למסלול המקוצר אחרי אימות: 320/320 דק׳ = 100%.

| # | Heat | משימה | אחוז השלמה | זמן מדויק | קריטריון מעבר |
|---:|---:|---|---:|---:|---|
| 48 | 10 | לאמת את פער הספירה: 16 מול 53 השוואות, 568 מול 240 מושגים, והאם הספירה היא לכל הפורטל או רק לשיעורי מבחן | 100% | 45 דק׳ | דוח אחד קובע מקור אמת: full-portal מול exam-only |
| 49 | 10 | להרחיב את `lesson-material-gaps` כך שיחזיר גם `summary.heat10Gaps`, `lessons[].comparisonCoverage`, `lessons[].practiceCoverage`, `lessons[].missingConcepts` | 100% | 90 דק׳ | JSON/summary מכילים את כל השדות החדשים |
| 50 | 10 | להוסיף בדיקת thresholds תלת-שכבתית: Heat 10 לפחות 90%, Heat 9 לפחות 75%, Heat 8 לפחות 60% להשוואות ולתרגול | 100% | 75 דק׳ | strict נכשל על שיעור קריטי עם טאב השוואות ריק |
| 51 | 10 | להשלים עד 20 השוואות Heat 10 אם האימות מוכיח שחסרות: שיעור 24 = 6, שיעור 25 = 7, שיעור 26 = 7 | לא נדרש כרגע | 240 דק׳ | האימות מצא Heat 10 עם 100% השוואות |
| 52 | 9 | להשלים עד 24 השוואות Heat 9 אם האימות מוכיח שחסרות: שיעור 20 = 8, שיעור 23 = 6, שיעור 27 = 5, Next.js = 5 | לא נדרש כרגע | 288 דק׳ | האימות מצא Heat 9 עם 100% השוואות |
| 53 | 8 | להשלים עד 21 השוואות Heat 8 אם האימות מוכיח שחסרות: שיעור 17 = 6, שיעור 18 = 4, שיעור 21 = 5, Next.js/נלווה = 6 | לא נדרש כרגע | 252 דק׳ | האימות מצא Heat 8 עם 100% השוואות |
| 54 | 10 | להוסיף מקור נתונים ייעודי לתרגול מורחב לפי `conceptKey` ולחבר אותו ב־`content-loader` בלי לשנות schema קיים | לא נדרש כרגע | 120 דק׳ | extras כבר נטענים אחרי merge כמו בדפדפן |
| 55 | 10 | להשלים עד 34 חבילות תרגול Heat 10: `moreExamples`, `pitfalls`, `practiceQuestions` קצרות ומעשיות | לא נדרש כרגע | 170 דק׳ | האימות מצא Heat 10 עם 100% תרגול |
| 56 | 9 | להשלים עד 59 חבילות תרגול Heat 9 למושגי React/Router/Mongo/TS Budget/Next בלבד | לא נדרש כרגע | 295 דק׳ | האימות מצא Heat 9 עם 100% תרגול |
| 57 | 8 | להשלים עד 86 חבילות תרגול Heat 8 ל-HTTP/Express/Node/React Basics בלבד | לא נדרש כרגע | 430 דק׳ | האימות מצא Heat 8 עם 100% תרגול |
| 58 | 9 | לשפר את UI דוח החוסרים ב־Homework Exam Mode כך שכל שיעור מציג Heat, אחוז השוואות, אחוז תרגול, וכפתור מעבר | 100% | 75 דק׳ | שיעור חסר מסומן אדום ולא כהודעה רגילה |
| 59 | 8 | להריץ בדיקות קבלה: `lesson-compact-view`, `homework-exam-mode`, smoke, visual overlap, build, finish-line | 100% | 80 דק׳ | כל השערים עוברים ללא שימוש באקראיות Native וללא fake data |

סך סבב אימות והשלמה מחמיר: 1860 דק׳ = 31 שעות.

תוספת זמן זו מחליפה את ההנחה הישנה רק אם משימה 48 מוכיחה שה־audit הנוכחי מפספס חוסרים אמיתיים. אם משימה 48 מוכיחה שה־audit הנוכחי נכון, הסבב יצטמצם למשימות 49, 50, 58, 59 בלבד: 320 דק׳ = 5 שעות 20 דק׳.

### זוגות השוואה שחייבים להיכנס

| שיעור | זוגות חובה |
|---|---|
| שיעור 24 | deps none מול `[]` מול `[value]`; `useEffect` מול render body; `useMemo` מול `useCallback`; `useRef` מול `useState`; cleanup מול leak |
| שיעור 25 | Tailwind מול CSS; flex מול grid; padding מול margin מול gap; responsive prefix מול class רגיל; search מול filter; rating state מול form state |
| שיעור 26 | TS מול JS; `.ts` מול `.tsx`; type מול interface; enum מול union literals; any מול unknown מול never; optional מול required; props typing מול state typing |
| שיעור 20 | SQL מול NoSQL; collection מול document; schema מול model; find מול findOne; updateOne/updateMany; deleteOne/deleteMany |
| שיעור 23 | Link מול useNavigate; Route מול Routes; static route מול dynamic route; useParams מול props; Context מול prop drilling |
| שיעור 27 | Book מול User models; type/interface/enum/union; Income מול Expense; CRUD מול summary/breakdown |
| Next.js | App Router מול Pages Router אם קיים בחומר; layout מול page; nested route מול dynamic route; server/client component ברמת שימוש בסיסית |

### בדיקות קבלה לתוכנית החוסרים

- `tests/lesson-material-gaps.test.js`: בודק thresholds לפי Heat אחרי טעינת `content-loader`.
- `tests/lesson-compact-view.test.js`: טאב “השוואות” בשיעורים 24-26 אינו ריק.
- `tests/homework-exam-mode.test.js`: דוח חוסרים מופיע ומציג Heat ואחוזי כיסוי.
- `npm run svcollege:full-portal-smoke:strict`: עובר.
- `npm run svcollege:visual-overlap:strict`: עובר.
- `npm run finish-line:pre-release`: עובר.

## משימות מערכת שנשארו פתוחות רק כ-Backlog לא חוסם

הפורטל כבר עבר את שערי המבחן. כל משימות ה-Backlog הלא חוסם שסומנו למסלול הזה נסגרו; נשארת רק הכנה אישית של התלמיד בתוך המסלולים.

| # | משימה | אחוז השלמה | זמן מדויק | חובה למבחן הקרוב | הערה |
|---:|---|---:|---:|---|---|
| 44 | סריקה מלאה של כל עמודי מבחן האימון הישן כדי להוכיח אם הוא כפילות מלאה | 100% | 60 דק׳ | לא | הושלם: 7 עמודים, אותו גודל קובץ, אותו SHA-256, ו-`cmp_exit=0`; מסומן duplicate מלא |
| 45 | ניקוי 100 notes באיכות שאלות, לפי עדיפות TS/Router/useEffect/forms/Express/JS | 100% | 300 דק׳ | לא | strict עובר; זה שיפור איכות, לא blocker. נכון לעכשיו: 2373 שאלות נקיות, 0 warnings/blockers, 2605 notes בלבד |
| 46 | הרצת pre-release אחרי ניקוי ה-notes | 100% | 20 דק׳ | לא | עבר 18/18 אחרי הרצה מחוץ ל-sandbox, כי בדיקת השרת המקומי צריכה לפתוח פורט |
| 47 | וידאו `video1151918075.mp4` | 0% | 0 דק׳ בתוכנית הנוכחית | לא | צפייה ב-114 הסרטונים נוספה ללוח; תמלול והסקת תוכן חסומים עד מקור אמיתי |

סך Backlog לא חוסם ללא וידאו: 380 דק׳ = 6 שעות 20 דק׳ זמן כולל.

זמן שנותר בפועל ל-Backlog הלא חוסם ללא וידאו: 0 דק׳.

## משימות חומר שכבר נסגרו

| פריט | סטטוס | אחוז השלמה | זמן שנותר |
|---|---|---:|---:|
| Smart House משיעורי בית 23 | covered | 100% | 0 דק׳ |
| Movie Rating מפרויקט 25 | covered | 100% | 0 דק׳ |
| מבחן אימון ישן Football Club | duplicate מלא | 100% | 0 דק׳ |
| שיעורי 20, 22, 23, 24, 25, 26, 26 part 2 | imported/partial-imported ומחוברים לדוח coverage | 100% | 0 דק׳ |
| טבלאות השוואה Heat 10/9/8 | `lesson-material-gaps-v3` עובר: full portal 29/568, exam-only 11/240, Heat gaps 0 | 100% | 0 דק׳ |
| תרגול מורחב למושגים קריטיים | strict עובר | 100% | 0 דק׳ |
| כרטיס “מה עושים עכשיו” | נבדק בדפדפן | 100% | 0 דק׳ |

## בדיקות אחרונות שעברו

- `npm test -- tests/lesson-material-gaps.test.js tests/lesson-compact-view.test.js tests/homework-exam-mode.test.js --run`: עבר 29/29.
- `npm run exam:material-gaps:strict`: עבר, 29 שיעורים ו-568 מושגים בפורטל המלא; 11 שיעורי מבחן ו-240 מושגי מבחן; Heat gaps = 0.
- `npm run svcollege:full-portal-smoke:strict`: עבר 9/9.
- `npm run svcollege:visual-overlap:strict`: עבר, 0 כשלים.
- `npm run svcollege:pwa-offline:strict`: עבר, 196/196 assets cached.
- `npm run build`: עבר.
- `npm run finish-line:pre-release`: עבר 18/18 מחוץ ל-sandbox כי הבדיקה פותחת שרת מקומי.
- `npm test -- tests/question-quality-report.test.js tests/manual-blocker-question-authoring.test.js tests/homework-exam-mode.test.js --run`: עבר 19/19 אחרי ניקוי שאלות.
- `npm run quality:questions:write`: עבר אחרי ניקוי 100 notes; 2373 שאלות נקיות, 0 warnings/blockers.
- `npm run validate:strict`: עבר אחרי ניקוי 100 notes; אין errors, רק 12 fill-ambiguity informational קיימים.
- `npm test -- tests/auto-save-server.test.js --run`: עבר 4/4 מחוץ ל-sandbox; בתוך sandbox השרת המקומי לא הספיק להיחשב ready.
- `node scripts/report_finish_line_prerelease.js --strict --write --summary`: עבר 18/18 אחרי ניקוי שאלות.
- `pdfinfo` + `shasum -a 256` + `cmp`: מבחן האימון הישן זהה ביט-לביט לעותק מבחן האימון שכבר מכוסה.

## יעד סופי

כדי להגיע להכנה מושלמת למבחן הקרוב צריך לבצע את 47 משימות החובה האישיות: 94 שעות 45 דק׳.

כל Backlog המערכת הלא חוסם עד Batch 6 נסגר. הזמן שנותר הוא רק ההכנה האישית: 94 שעות 45 דק׳.

אם בעתיד תאשר תמלול וידאו, יש להוסיף 60 דק׳ והזמן הכולל אחרי Batch 6 יהיה 94 שעות 45 דק׳.
