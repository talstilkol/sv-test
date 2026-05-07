# App.js Split Boundaries

נותרו אחרי משימה זו: `100 שעות` · `26 משימות`

## מטרה

להגדיר גבולות פירוק ל-`app.js` לפני שמזיזים קוד, כדי שהפירוק יהיה בטוח, מדורג וללא שינוי התנהגות.

## עקרונות

- לא משנים התנהגות בזמן הפירוק.
- לא מוסיפים נתונים חדשים.
- לא משתמשים ב-`Math.random`.
- כל slice יוצא עם API קטן וברור.
- כל מעבר שומר תאימות ל-globals קיימים עד שיש החלפה מלאה.
- כל slice מקבל בדיקות רק אחרי שהקוד הועבר בפועל.

## Slices

| Slice | אחריות | יעד עתידי | תלות עיקרית | סיכון |
| --- | --- | --- | --- | --- |
| `lesson-renderer` | ציור שיעורים, מושגים, תוכן לימוד וניווט פנימי | `src/views/lesson-renderer/` | נתוני שיעורים, `content-loader`, DOM hooks | גבוה |
| `chrome-menu` | תפריט עליון, tabs, sidebar, home routing | `src/views/chrome-menu/` | `data-tab`, top tabs, route state | גבוה |
| `settings` | theme, accessibility, lesson mode, local preferences | `src/views/settings/` | `localStorage`, UI controls | בינוני |
| `bug-log` | Bug Agent UI, export/report, local bug log | `src/views/bug-log/` | `LUMEN_BUG_AGENT`, storage | בינוני |
| `question-panels` | MC/Fill panels, progress, answer UI | `src/views/question-panels/` | question bank, progress store | גבוה |
| `exam100-homework` | Exam100 path, homework mode, task tree, IDE popup | `src/views/homework-exam-mode-view.js` stays primary until later split | existing file already extracted | בינוני |
| `progress-sync` | export/import profile, storage snapshot, restore | `src/core/progress-sync.js` / existing core modules | localStorage, profile schema | בינוני |
| `dom-safety` | trusted HTML helpers, sanitizer wrappers, DOM allowlist contracts | `src/core/dom-safety/` | `LUMEN_SANITIZE_HTML`, innerHTML sinks | גבוה |

## Recommended Order

1. `settings` - קטן יחסית, storage contract ברור.
2. `bug-log` - מבודד יחסית, לא בליבת לימוד.
3. `chrome-menu` - קריטי, אבל גבולות DOM ברורים.
4. `question-panels` - רק אחרי שיש בדיקות רגרסיה ממוקדות.
5. `lesson-renderer` - הכי מסוכן, לבצע אחרון ובחתיכות קטנות.
6. `dom-safety` - לחלץ תוך כדי, לא כמגה-ריפקטור.

## Interfaces

| Interface | תפקיד | הערה |
| --- | --- | --- |
| `mount(container, context)` | נקודת כניסה לכל view | לא מחליפה הכל בבת אחת |
| `render(state)` | החזרת HTML או ציור DOM | חייב לעבור דרך sanitizer כשיש HTML |
| `bind(container, context)` | חיבור events | ללא side effects גלובליים בלתי מתועדים |
| `readState()` / `writeState()` | storage ממוקד slice | keys קיימים נשמרים |

## Acceptance Gate ל-REM-001

- קיימת מפת slices.
- לכל slice יש אחריות, יעד, תלות וסיכון.
- יש סדר ביצוע מומלץ.
- יש כלל תאימות ל-globals קיימים.
- אין שינוי קוד runtime במסגרת משימה זו.
