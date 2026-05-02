# מילון מונחים עברית ↔ אנגלית — SVCollege Full Stack

> במבחן יופיעו מונחים בעברית ובאנגלית. תשמור על הקבילות.

---

## JavaScript Fundamentals

| עברית | אנגלית | הסבר קצר |
|------|---------|---------|
| משתנה | variable | תא לאחסון ערך |
| קבוע | constant | משתנה שלא משתנה |
| פונקציה | function | בלוק קוד שמקבל input → output |
| ארגומנט | argument | ערך שמועבר לפונקציה |
| פרמטר | parameter | משתנה בהגדרת פונקציה |
| סגירה | closure | פונקציה שזוכרת scope חיצוני |
| תחום | scope | היכן משתנה זמין |
| הרמה | hoisting | העברת declarations לראש scope |
| אובייקט | object | אוסף של properties |
| מערך | array | רשימה ממוספרת |
| חוטים שטוחים | shallow copy | העתקה של רמה אחת |
| חוטים עמוקים | deep copy | העתקה של כל הרמות |

## Asynchronous

| עברית | אנגלית | הסבר קצר |
|------|---------|---------|
| הבטחה | Promise | אובייקט שמייצג עתיד |
| חוסם | blocking | פעולה שמעכבת אחרות |
| לא-חוסם | non-blocking | פעולה שלא מעכבת |
| אסינכרוני | asynchronous | פעולה שלא מחכה לתוצאה |
| שרשור | chaining | שרשור then().then() |
| נדחה | rejected | Promise שנכשל |
| נפתר | resolved | Promise שהצליח |

## DOM + Events

| עברית | אנגלית | הסבר קצר |
|------|---------|---------|
| אלמנט | element | תג HTML |
| תכונה | attribute | מאפיין של תג |
| מאפיין | property | שדה של אובייקט/אלמנט |
| אירוע | event | פעולה שהתרחשה |
| מאזין | listener | פונקציה שמגיבה לאירוע |
| שגריר | delegation | מאזין על parent עבור children |
| בועה | bubble | אירוע שעולה מילד להורה |

## React

| עברית | אנגלית | הסבר קצר |
|------|---------|---------|
| רכיב | component | יחידת UI עצמאית |
| מאפיינים | props | נתונים שעוברים מ-parent ל-child |
| מצב | state | נתונים פנימיים של רכיב |
| הוקס | hooks | פונקציות שמתחילות ב-use |
| צד-לקוח | client-side | רץ בדפדפן |
| צד-שרת | server-side | רץ בשרת |
| רינדור | render | יצירת DOM מ-component |
| רינדור-מחדש | re-render | רינדור נוסף אחרי שינוי |

## HTTP + REST

| עברית | אנגלית | הסבר קצר |
|------|---------|---------|
| בקשה | request | שליחה ללקוח |
| תגובה | response | חזרה מהשרת |
| כותרת | header | metadata של בקשה/תגובה |
| גוף | body | תוכן הבקשה/תגובה |
| נתיב | path / route | חלק ב-URL |
| משאב | resource | אובייקט ב-API |
| קודי מצב | status codes | 200, 404, 500 וכו' |

## Database

| עברית | אנגלית | הסבר קצר |
|------|---------|---------|
| בסיס נתונים | database | אחסון מסודר |
| טבלה | table | מבנה עם עמודות ושורות |
| שורה | row | רשומה אחת |
| עמודה | column | שדה |
| מפתח ראשי | primary key | מזהה ייחודי |
| מפתח זר | foreign key | מצביע לטבלה אחרת |
| שאילתה | query | בקשה ל-DB |
| חיבור | join | שילוב של טבלאות |
| מיגרציה | migration | שינוי schema גרסתי |
| טרנסקציה | transaction | קבוצת פעולות אטומית |

## Auth & Security

| עברית | אנגלית | הסבר קצר |
|------|---------|---------|
| אימות | authentication | בדיקת זהות |
| הרשאה | authorization | בדיקת מותר/אסור |
| הצפנה | encryption | המרה לטקסט מוצפן |
| חיתוך-חד-כיווני | hashing | hash function |
| מפגש | session | זיכרון התחברות |
| עוגייה | cookie | מידע בדפדפן |
| אסימון | token | אישור גישה |
| ריענון | refresh | חידוש access token |
| מפתח-פרטי | private key | מפתח סודי |
| מפתח-ציבורי | public key | מפתח פתוח |

## DevOps

| עברית | אנגלית | הסבר קצר |
|------|---------|---------|
| פריסה | deploy | פרסום גרסה |
| בנייה | build | יצירת artifact |
| מכולה | container | תהליך מבודד |
| תמונה | image | תבנית מ-Dockerfile |
| משתני-סביבה | environment variables | תצורה |
| בדיקת-עשן | smoke test | בדיקה מהירה אחרי deploy |
| השלמה רציפה | continuous integration | CI |
| משלוח רציף | continuous delivery | CD |
| מבחן יחידה | unit test | בדיקה של פונקציה |

## TypeScript

| עברית | אנגלית | הסבר קצר |
|------|---------|---------|
| טיפוסים | types | הגדרת מבנה |
| ממשק | interface | הגדרת shape |
| הסקה | inference | אוטומטית מהקוד |
| איחוד | union type | A \| B |
| חיתוך | intersection type | A & B |
| גנרי | generic | <T> |
| אסרטיב | assertion | as Type |

## עקרונות כלליים

| עברית | אנגלית |
|------|---------|
| ארכיטקטורה | architecture |
| תבנית-עיצוב | design pattern |
| מבדק | test |
| מבדקים | tests |
| איכות | quality |
| ביצועים | performance |
| נגישות | accessibility / a11y |
| אופטימיזציה | optimization |
| תיעוד | documentation |
| באג | bug |
| תכונה | feature |
| דרישה | requirement |
| מפרט | specification |

---

**טיפ:** תקרא את המונחים בקול רם, פעמיים — שניהם בעברית ושניהם באנגלית. במבחן זה יקטין את הזמן שלוקח לקרוא שאלה.

**תאריך:** 2026-05-02
