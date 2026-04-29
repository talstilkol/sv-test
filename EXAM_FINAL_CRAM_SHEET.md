# דף חזרה אחרון למבחן — מושגים חלשים בלבד

> נוצר: 2026-04-29
> מקור: `npm run exam:weakest:write`
> יעד: SVCollege AI & Full Stack

## כלל שימוש

לומדים רק את הרשימה הזו אחרי שכל השערים ירוקים. לכל מושג: קרא שורה אחת, פתר שאלה קשה, ואז קטע קוד אם יש.

## רשימת חזרה ממוקדת

| # | Risk | מושג | מה זה בשורה אחת | פעולה עכשיו |
|---:|---:|---|---|---|
| 1 | 27 | Performance Optimization | Performance Optimization היא הקטנת זמן טעינה והרצה. | לבדוק ידנית בסימולציית תלמיד נקייה. |
| 2 | 25 | Closure | פונקציה שזוכרת משתנים מהסקופ שבו נוצרה. | לבדוק ידנית בסימולציית תלמיד נקייה. |
| 3 | 25 | State Management | State Management הוא ניהול המידע שמשנה את ה-UI. | לבדוק ידנית בסימולציית תלמיד נקייה. |
| 4 | 25 | Testing Strategies | Testing Strategies הן בחירת בדיקות לפי סיכון. | לבדוק ידנית בסימולציית תלמיד נקייה. |
| 5 | 24 | responsive design | responsive design הוא UI שמתאים את עצמו לגודל המסך. | לבדוק ידנית בסימולציית תלמיד נקייה. |
| 6 | 24 | add/delete movie | add/delete movie הוא CRUD בסיסי לרשימת סרטים. | לבדוק ידנית בסימולציית תלמיד נקייה. |
| 7 | 24 | cascade and specificity | cascade and specificity קובעים איזה כלל CSS מנצח. | לבדוק ידנית בסימולציית תלמיד נקייה. |
| 8 | 24 | By Reference | By Reference אומר שמשתנה מחזיק כתובת לאובייקט. | לבדוק ידנית בסימולציית תלמיד נקייה. |
| 9 | 23 | flex | flex הוא כלי CSS לסידור פריטים בשורה או עמודה. | לבדוק ידנית בסימולציית תלמיד נקייה. |
| 10 | 23 | grid | grid הוא כלי CSS לסידור אזור דו-ממדי. | לבדוק ידנית בסימולציית תלמיד נקייה. |

## טבלאות השוואה רלוונטיות

### State Management

| props | מול | state |
|---|---|---|
| קומפוננטת אב | מקור | useState/useReducer בקומפוננטה |
| Read-only — אל תשנה! | Mutability | Mutable דרך setter |
| כשאב שולח props חדשים | טריגר re-render | כש-setState נקרא |
| אב → בן (מטה בלבד) | כיוון זרימה | בתוך אותה קומפוננטה |

המלצה: props לתקשורת מאב, state לליבה פנימית. אם state ב-2 ילדים — להעלות ל-parent (lifting).

### add/delete movie

| let | מול | const |
|---|---|---|
| ✅ x = 5 — עובד | השמה מחדש | ❌ x = 5 — שגיאה! |
| ✅ obj.x = 1 | Mutate object/array | ✅ obj.x = 1 — רק הסימוכין קבוע |
| Block scope | Scope | Block scope |
| כשהערך ישתנה | ברירת מחדל | כמעט תמיד — מונע bugs |

המלצה: const ברירת מחדל. let רק כשאתה יודע שהערך ישתנה (לולאה, accumulator).

### flex

| Flexbox | מול | CSS Grid |
|---|---|---|
| ציר אחד (row או column) | ממדים | שני ממדים (rows + columns) |
| content-driven (גודל לפי תוכן) | גודל | container-driven (גודל לפי grid) |
| Navbar, button group, רשימה | Use case | Page layout, dashboard, gallery |
| flex-direction, justify-content, align-items | Properties | grid-template-columns/rows, grid-area |

המלצה: Grid לpage layout. Flex לרכיבים בתוכו. שילוב = הדרך הנפוצה.

### grid

| Flexbox | מול | CSS Grid |
|---|---|---|
| ציר אחד (row או column) | ממדים | שני ממדים (rows + columns) |
| content-driven (גודל לפי תוכן) | גודל | container-driven (גודל לפי grid) |
| Navbar, button group, רשימה | Use case | Page layout, dashboard, gallery |
| flex-direction, justify-content, align-items | Properties | grid-template-columns/rows, grid-area |

המלצה: Grid לpage layout. Flex לרכיבים בתוכו. שילוב = הדרך הנפוצה.

## בדיקת יציאה

- אין לסמן מושג כידוע עד שפתרת שאלה ברמת הקושי הגבוהה ביותר הזמינה.
- במושגי קוד: חובה לפתור Fill/Trace/Bug/Build, לא רק לזהות הגדרה.
- אם טעית: המושג נכנס לחולשות, קוראים את דרישת הקדם, ואז פותרים recovery.

