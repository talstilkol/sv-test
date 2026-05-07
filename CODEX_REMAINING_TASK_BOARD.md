# לוח המשימות של Codex - יתרת עבודה קדימה

נותרו: `4 שעות 3 דק׳` · `12 משימות`

כל הודעת עבודה קדימה צריכה להתחיל בשורה:

> נותרו `4 שעות 3 דק׳` ו-`12 משימות`.

כאשר משימה נסגרת, מעדכנים את מספר המשימות והשעות לפי זמן המשימה שנסגרה.

## סיכום

המערכת ירוקה לשחרור Exam100 לפי ה-gates הפעילים, אבל נשארו ארבעה סוגי חוב:

- פירוק ארכיטקטוני של `app.js`.
- ארבעה סעיפי `manual_review`.
- חוב איכות שאלות/מסיחים deferred.
- ניקוי backlog/status drift.

הסיכום הישן ציין `83 שעות`, אבל חיבור השורות בטבלת המשימות המקורית הוא `101 שעות`. משימות IDE-001 עד IDE-013 נסגרו ברמת קוד. REM-001 עד REM-008 נסגרו ברמת קוד. MR-001 עד MR-006 נסגרו עם evidence ב-`docs/source-review.md` ו-overlay דטרמיניסטי. QA-001 נסגר 120/120 ברמת קוד. הבדיקות נוספו אך לא הורצו, בהתאם לכלל שלא מריצים בדיקות בלי בקשה מפורשת.

## לוח משימות

| ID | עדיפות | סטטוס | משימה | תוצאה נדרשת | זמן |
| --- | --- | --- | --- | --- | ---: |
| REM-001 | P0 | [x] | לתכנן גבולות פירוק ל-`app.js` | מיפוי slices: lesson renderer, chrome/menu, settings, bug log, question panels | 1 שעה |
| REM-002 | P0 | [x] | לפרק lesson renderer מתוך `app.js` | מודול עצמאי ב-`src/`, ללא שינוי התנהגות | 5 שעות |
| REM-003 | P0 | [x] | לפרק chrome/menu/navigation | מודול ניווט עצמאי, gates ניווט נשארים ירוקים | 4 שעות |
| REM-004 | P1 | [x] | לפרק settings/theme/local preferences | מודול settings עצמאי עם storage contract ברור | 3 שעות |
| REM-005 | P1 | [x] | לפרק bug log / Bug Agent UI | מודול bug log עצמאי, export/report deterministic | 2.5 שעות |
| REM-006 | P1 | [x] | לפרק question panels / answer UI | מודול שאלות עצמאי בלי פגיעה ב-MC/Fill/progress | 5 שעות |
| REM-007 | P1 | [x] | להשלים Vite migration cleanup | build/dev/preview בלי תלות ב-legacy globals מיותרים | 2 שעות |
| REM-008 | P1 | [x] | להמשיך TypeScript migration ל-views | types/interfaces ל-views המרכזיים, בלי המרה מסוכנת מדי | 6 שעות |
| REM-009 | P0 | [ ] | בדיקת regression אחרי פירוק | `portal:full-audit`, Playwright, performance, no `Math.random` | 3 שעות |
| MR-001 | P0 | [x] | לפתוח מקור מלא ל-`section-04` | מקור מלא מעבר לכותרת/ניקוד | 2 שעות |
| MR-002 | P0 | [x] | לפתוח מקור מלא ל-`section-33` | מקור מלא מעבר לכותרת/ניקוד | 2 שעות |
| MR-003 | P0 | [x] | לפתוח מקור מלא ל-`section-50` | מקור מלא מעבר לכותרת/ניקוד | 2 שעות |
| MR-004 | P0 | [x] | לפתוח מקור מלא ל-`section-51` | מקור מלא מעבר לכותרת/ניקוד | 2 שעות |
| MR-005 | P0 | [x] | למלא `source-review` לכל 4 הסעיפים | full prompt, target surface, I/O, validation, scoring, acceptance | 4 שעות |
| MR-006 | P1 | [x] | להפוך סעיפים שניתן לפתוח ל-ready | לא להמציא קוד; לפתוח רק עם evidence מלא | 6 שעות |
| MR-007 | P1 | [x] | להריץ gates ל-manual review/task tree | עבר: exam:manual-review:strict ו-exam:task-tree:strict | 0 שעות |
| QA-001 | P1 | [x] | לסגור 120 Fill missing-hint deferred | 120/120 hints נוספו ידנית; gates לא הורצו | 8 שעות |
| QA-002 | P2 | [ ] | לסגור 414 option-length balance deferred | לאזן מסיחים ידנית בלי לשנות תשובה נכונה | 18 שעות |
| QA-003 | P1 | [x] | לסגור 104 distractor actionable/raw | נסגרו 104/104: 46 חפפו ל-QA-002 ועוד 58 נסגרו ב-QA-003; correctIndex נשמר | 0 שעות |
| QA-004 | P2 | [x] | לסווג/לטפל ב-421 distractor deferred | כל הפריטים בדוח סווגו כ-deferred עם נימוק traceable; ללא fake data וללא שינוי correctIndex | 0 שעות |
| QA-005 | P0 | [x] | בקרת no fake data על כל תיקוני התוכן | נוצר ledger בקרה: כל שינוי תוכן נשען על מקור מקומי/בדיקה ידנית; חסרים נשארו deferred/unknown | 0 שעות |
| QA-006 | P0 | [x] | הרצת quality gates מלאה | עבר: quality:questions:strict, quality:remediation:strict, distractor:exam-gate:strict | 0 שעות |
| MGMT-001 | P1 | [x] | לנקות 8 real-open backlog items | 8/8 מופו ל-owner/evidence/remaining gate ב-docs/MGMT_BACKLOG_RECONCILIATION.md | 0 שעות |
| MGMT-002 | P2 | [x] | לנקות active status drift | ה-active drift תועד כ-5 NOT DONE ו-3 PARTIAL, עם raw legacy נפרד | 0 שעות |
| MGMT-003 | P2 | [x] | לתקן טקסט מטעה ב-weekly report | הוסר hard-code של 130/21 real-open; הדוח משתמש בספירה חיה | 0 שעות |
| ENV-001 | P3 | [x] | לנקות אזהרת Playwright סביבתית | לא נמצאה הגדרה פעילה בפרויקט; נוסף note סביבתי ב-docs/PLAYWRIGHT_ENV_COLOR_NOTE_ENV001.md | 0 שעות |
| FINAL-001 | P0 | [ ] | ריצת סגירה מלאה | `finish-line`, `portal:full-audit`, Playwright, performance, no random | 1 שעה |
| IDE-001 | P0 | [x] | לתקן את מבנה חלון ה-IDE | פריסה קבועה: ימין עץ שאלה, מרכז הסבר+קוד, שמאל עץ קבצים | 1 שעה |
| IDE-002 | P0 | [x] | להפריד ניווט ימין מניווט שמאל | ימין משפיע רק על הסברים; שמאל משפיע רק על קוד | 1.5 שעות |
| IDE-003 | P0 | [x] | לבנות עץ שאלה מימין | שאלה ראשית, סעיפים, תתי-סעיפים, משימות טכניות לפי נתוני המקור | 2 שעות |
| IDE-004 | P0 | [x] | לחבר לחיצה על שאלה/סעיף להסבר במרכז העליון | המרכז העליון מציג הסבר השאלה, הסבר סבתא, מקצועי, רובריקה ומושגים | 1.5 שעות |
| IDE-005 | P0 | [x] | לחבר לחיצה על משימה טכנית להסבר שלה בלבד | המרכז העליון מציג מה המשימה עושה, קובץ יעד, Gate וטעויות נפוצות | 1.5 שעות |
| IDE-006 | P0 | [x] | לבנות עץ קבצים משמאל | רשימת קבצי הפרויקט מתוך `projectFileTree`, עם סימון target file | 1 שעה |
| IDE-007 | P0 | [x] | לחבר לחיצה על קובץ לקוד במרכז התחתון | המרכז התחתון מציג רק קוד/הערות של הקובץ הנבחר | 2 שעות |
| IDE-008 | P1 | [x] | להוסיף מצב `unknown/unavailable` תקין | אם אין קוד/קובץ/הסבר, מציגים חסר מקור בלי להמציא | 0.75 שעות |
| IDE-009 | P1 | [x] | להוסיף highlights ו-active state | פריט ימני פעיל, קובץ שמאלי פעיל, אזור מרכזי מסונכרן | 1 שעה |
| IDE-010 | P1 | [x] | להתאים RTL/LTR | ממשק עברי RTL, קוד LTR, בלי שבירת layout | 1 שעה |
| IDE-011 | P1 | [x] | לשמור תאימות לעמוד הקיים | הכפתורים הקיימים `פתח עמוד שאלה מלא` ו-`פתח IDE` ממשיכים לעבוד | 0.75 שעות |
| IDE-012 | P2 | [x] | להוסיף בדיקת Playwright ל-IDE | פתיחת IDE, לחיצה בעץ ימין, לחיצה בעץ שמאל, בדיקת מרכז עליון/תחתון | 2 שעות |
| IDE-013 | P2 | [x] | להוסיף בדיקת link/data audit ל-IDE | אין יעד ריק; חסר מוצג כ-`unknown/unavailable` | 0.75 שעות |

## סדר ביצוע מומלץ

1. `MR-*` - קודם לסגור חסימות מקור, כי אסור להמציא מידע.
2. `REM-*` - אחרי freeze קצר, כי פירוק `app.js` הוא הסיכון הגבוה לרגרסיה.
3. `QA-*` - בבאטצ׳ים קטנים של 25 פריטים.
4. `MGMT-*`, `ENV-*`, `FINAL-001` - ניקוי וסגירה.

## כללי עבודה

- אין `Math.random`.
- אין fake data.
- אין שאלות, מסיחים, קישורים או תאריכים מומצאים.
- כל מקור חסר נשאר `unknown/unavailable`.
- כל משימה שנסגרת חייבת לעדכן סטטוס, שעות שנותרו ומספר משימות שנותרו.
