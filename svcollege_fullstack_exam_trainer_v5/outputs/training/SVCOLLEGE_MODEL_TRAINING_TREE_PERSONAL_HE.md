# SVCollege Model Training Tree - אישי בעברית

מקור אמת: `exam_tasks_tree_detailed.json` ו-`exam_tasks_tree_detailed.md` מתוך 73 סעיפי המבחן.

## איך להשתמש
1. עוברים לפי ההסתברות: הענפים הגבוהים קודם.
2. בכל תת-ענף אומרים בקול מה צריך לדעת.
3. כותבים קוד לפי `איך לבנות את הקוד`.
4. מסמנים מעבר רק אם ההסבר והקוד ברמת 100.

## סדר אימון משוקלל

### 1. Frontend UI + Validation - 63%

- סעיפים מכוסים: 46
- מזהי סעיפים: 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 23, 31, 32, 34, 36, 37, 38, 39, 41, 42, 44, 45, 46, 47, 48, 52, 53, 54, 55, 56, 57, 58, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 73

#### client_form_inputs - 45.2%

**מה צריך לדעת:**
- Controlled components ב-React (value + onChange).
- בחירת input types נכונים (text/number/select).
- ניהול state לטופס אחד או useReducer בטפסים גדולים.
- Submit flow: preventDefault + validation + async call.
- סנכרון UI אחרי הצלחה/כישלון.

**איך לבנות את הקוד:**
- להגדיר state התחלתי לכל שדה.
- לכתוב handler אחד לעדכון שדות.
- לחבר submit שמפעיל validate ואז API.
- ב-success לנקות/להפנות לפי הדרישה.

**Gate 100:** הסבר בעברית + קוד תואם דרישה + בדיקת edge cases.

**קובץ יעד:** `src/components/ExamForm.jsx`

**עץ קבצים לתרגיל:**
- `exam-project/`
  - `src/App.jsx` - מחבר routes, state ראשי וקומפוננטות המסלול.
  - `src/components/ExamForm.jsx` - הקובץ שבו בונים את הטופס, ה-inputs וה-submit.
  - `src/utils/validation.js` - פונקציות validation טהורות שחוזרות עם errors לפי שדה.
  - `src/services/api.js` - קריאות fetch לשרת אחרי validation תקין.

**פירוק למשימות טכניות:**
- 1. `src/components/ExamForm.jsx` - להגדיר state התחלתי לכל שדה.
- 2. `src/components/ExamForm.jsx` - לכתוב handler אחד לעדכון שדות.
- 3. `src/components/ExamForm.jsx` - לחבר submit שמפעיל validate ואז API.
- 4. `src/components/ExamForm.jsx` - ב-success לנקות/להפנות לפי הדרישה.

**מושגים שחייבים לדעת:**
- Controlled components ב-React (value + onChange).
- בחירת input types נכונים (text/number/select).
- ניהול state לטופס אחד או useReducer בטפסים גדולים.
- Submit flow: preventDefault + validation + async call.
- סנכרון UI אחרי הצלחה/כישלון.

#### client_validation_rules - 42.5%

**מה צריך לדעת:**
- בניית שכבת validation פונקציונלית ודטרמיניסטית.
- Regex לאנגלית/מספרים/אורכים לפי דרישה.
- טווחים מספריים וגבולות כולל edge cases.
- הפרדת הודעות שגיאה per-field.
- יישור validation frontend עם backend.

**איך לבנות את הקוד:**
- לכתוב פונקציית validate(data)->errors.
- להגדיר לכל שדה checks קבועים.
- להציג errors ליד השדות + חסימת submit.
- לשחזר את אותם חוקים בצד שרת.

**Gate 100:** הסבר בעברית + קוד תואם דרישה + בדיקת edge cases.

**קובץ יעד:** `src/components/ExamForm.jsx`

**עץ קבצים לתרגיל:**
- `exam-project/`
  - `src/App.jsx` - מחבר routes, state ראשי וקומפוננטות המסלול.
  - `src/components/ExamForm.jsx` - הקובץ שבו בונים את הטופס, ה-inputs וה-submit.
  - `src/utils/validation.js` - פונקציות validation טהורות שחוזרות עם errors לפי שדה.
  - `src/services/api.js` - קריאות fetch לשרת אחרי validation תקין.

**פירוק למשימות טכניות:**
- 1. `src/components/ExamForm.jsx` - לכתוב פונקציית validate(data)->errors.
- 2. `src/components/ExamForm.jsx` - להגדיר לכל שדה checks קבועים.
- 3. `src/components/ExamForm.jsx` - להציג errors ליד השדות + חסימת submit.
- 4. `src/components/ExamForm.jsx` - לשחזר את אותם חוקים בצד שרת.

**מושגים שחייבים לדעת:**
- בניית שכבת validation פונקציונלית ודטרמיניסטית.
- Regex לאנגלית/מספרים/אורכים לפי דרישה.
- טווחים מספריים וגבולות כולל edge cases.
- הפרדת הודעות שגיאה per-field.
- יישור validation frontend עם backend.

#### client_navigation - 30.1%

**מה צריך לדעת:**
- ראוטינג בסיסי והפניות לאחר פעולות CRUD.
- שמירת state/params בין עמודים.
- Default route + NotFound route.
- מניעת ניווט שגוי כשהנתון חסר.

**איך לבנות את הקוד:**
- להגדיר routes מפורשים לכל מסך.
- לנווט עם navigate אחרי create/delete/update.
- להוסיף fallback route לעמוד שגיאה/בית.

**Gate 100:** הסבר בעברית + קוד תואם דרישה + בדיקת edge cases.

**קובץ יעד:** `src/pages/AddItemPage.jsx`

**עץ קבצים לתרגיל:**
- `exam-project/`
  - `src/App.jsx` - מגדיר BrowserRouter ו-Routes.
  - `src/pages/AddItemPage.jsx` - הקובץ שבו מבצעים create ואז navigate.
  - `src/services/api.js` - מבודד את קריאת ה-POST מהקומפוננטה.

**פירוק למשימות טכניות:**
- 1. `src/pages/AddItemPage.jsx` - להגדיר routes מפורשים לכל מסך.
- 2. `src/pages/AddItemPage.jsx` - לנווט עם navigate אחרי create/delete/update.
- 3. `src/pages/AddItemPage.jsx` - להוסיף fallback route לעמוד שגיאה/בית.

**מושגים שחייבים לדעת:**
- ראוטינג בסיסי והפניות לאחר פעולות CRUD.
- שמירת state/params בין עמודים.
- Default route + NotFound route.
- מניעת ניווט שגוי כשהנתון חסר.

#### client_list_render - 24.7%

**מה צריך לדעת:**
- מיפוי מערכים לרכיבים עם key יציב.
- מיון/סינון תצוגה ללא mutation.
- מצב empty-state ברור.
- רענון רשימה אחרי יצירה/מחיקה/עדכון.

**איך לבנות את הקוד:**
- למשוך נתונים מהשרת בטעינה/אקשן.
- למפות לרכיב כרטיס עם כל השדות הנדרשים.
- להחיל sort/filter לפני render.
- להציג empty-state אם הרשימה ריקה.

**Gate 100:** הסבר בעברית + קוד תואם דרישה + בדיקת edge cases.

**קובץ יעד:** `src/components/ItemsList.jsx`

**עץ קבצים לתרגיל:**
- `exam-project/`
  - `src/App.jsx` - מחזיק את המידע ומעביר props לרשימה.
  - `src/components/ItemsList.jsx` - הקובץ שבו כותבים map, filter ו-key יציב.
  - `src/components/SearchBox.jsx` - שדה חיפוש נשלט שמעדכן query.

**פירוק למשימות טכניות:**
- 1. `src/components/ItemsList.jsx` - למשוך נתונים מהשרת בטעינה/אקשן.
- 2. `src/components/ItemsList.jsx` - למפות לרכיב כרטיס עם כל השדות הנדרשים.
- 3. `src/components/ItemsList.jsx` - להחיל sort/filter לפני render.
- 4. `src/components/ItemsList.jsx` - להציג empty-state אם הרשימה ריקה.

**מושגים שחייבים לדעת:**
- מיפוי מערכים לרכיבים עם key יציב.
- מיון/סינון תצוגה ללא mutation.
- מצב empty-state ברור.
- רענון רשימה אחרי יצירה/מחיקה/עדכון.

### 2. Backend API + Routes + Status Codes - 58.9%

- סעיפים מכוסים: 43
- מזהי סעיפים: 1, 2, 3, 5, 7, 8, 9, 10, 14, 15, 17, 18, 19, 20, 21, 22, 24, 25, 30, 31, 32, 34, 36, 37, 38, 39, 41, 42, 44, 45, 46, 47, 48, 49, 55, 56, 58, 59, 60, 61, 65, 66, 71

#### alerts_error_handling - 34.2%

**מה צריך לדעת:**
- חלוקה בין 400/404/409/500.
- try/catch ב-client וב-server.
- הודעות Alert/inline מדויקות.
- לא לבלוע שגיאות ולוג בסיסי לכשל.

**איך לבנות את הקוד:**
- לעטוף כל async ב-try/catch.
- להמיר שגיאות שרת להודעות ברורות.
- להציג alert רק איפה שנדרש במבחן.
- להחזיר status code מדויק בכל branch.

**Gate 100:** הסבר בעברית + קוד תואם דרישה + בדיקת edge cases.

**קובץ יעד:** `server/routes/items.routes.js`

**עץ קבצים לתרגיל:**
- `exam-project/`
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.

**פירוק למשימות טכניות:**
- 1. `server/routes/items.routes.js` - לעטוף כל async ב-try/catch.
- 2. `server/routes/items.routes.js` - להמיר שגיאות שרת להודעות ברורות.
- 3. `server/routes/items.routes.js` - להציג alert רק איפה שנדרש במבחן.
- 4. `server/routes/items.routes.js` - להחזיר status code מדויק בכל branch.

**מושגים שחייבים לדעת:**
- חלוקה בין 400/404/409/500.
- try/catch ב-client וב-server.
- הודעות Alert/inline מדויקות.
- לא לבלוע שגיאות ולוג בסיסי לכשל.

#### server_html_route - 31.5%

**מה צריך לדעת:**
- Express routes לדפי HTML ו-static files.
- הפרדת API routes מול page routes.
- קונבנציה אחידה לנתיבים.
- 404 למסלול לא קיים.

**איך לבנות את הקוד:**
- להגדיר express static לתיקיית public.
- להגדיר GET לכל עמוד נדרש במבחן.
- להשאיר API תחת prefix קבוע (למשל /api).
- להחזיר 404 לנתיב לא ידוע.

**Gate 100:** הסבר בעברית + קוד תואם דרישה + בדיקת edge cases.

**קובץ יעד:** `server/routes/items.routes.js`

**עץ קבצים לתרגיל:**
- `exam-project/`
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.

**פירוק למשימות טכניות:**
- 1. `server/routes/items.routes.js` - להגדיר express static לתיקיית public.
- 2. `server/routes/items.routes.js` - להגדיר GET לכל עמוד נדרש במבחן.
- 3. `server/routes/items.routes.js` - להשאיר API תחת prefix קבוע (למשל /api).
- 4. `server/routes/items.routes.js` - להחזיר 404 לנתיב לא ידוע.

**מושגים שחייבים לדעת:**
- Express routes לדפי HTML ו-static files.
- הפרדת API routes מול page routes.
- קונבנציה אחידה לנתיבים.
- 404 למסלול לא קיים.

#### api_get_filtered - 30.1%

**מה צריך לדעת:**
- קבלת פרמטר סינון (query/body) לפי הדרישה.
- סינון ומיון לוגיים בצורה טהורה.
- החזרת תוצאה ריקה בצורה חוקית.

**איך לבנות את הקוד:**
- לקרוא את ערך הסינון מהבקשה.
- להריץ filter/sort ולשמור אימות סוג.
- להחזיר רשימה מסוננת עם 200.

**Gate 100:** הסבר בעברית + קוד תואם דרישה + בדיקת edge cases.

**קובץ יעד:** `server/routes/items.routes.js`

**עץ קבצים לתרגיל:**
- `exam-project/`
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.

**פירוק למשימות טכניות:**
- 1. `server/routes/items.routes.js` - לקרוא את ערך הסינון מהבקשה.
- 2. `server/routes/items.routes.js` - להריץ filter/sort ולשמור אימות סוג.
- 3. `server/routes/items.routes.js` - להחזיר רשימה מסוננת עם 200.

**מושגים שחייבים לדעת:**
- קבלת פרמטר סינון (query/body) לפי הדרישה.
- סינון ומיון לוגיים בצורה טהורה.
- החזרת תוצאה ריקה בצורה חוקית.

#### api_post_create - 28.8%

**מה צריך לדעת:**
- קבלת payload וולידציה בצד שרת.
- בדיקת כפילות לפני יצירה.
- יצירה והחזרת 201/409/400.

**איך לבנות את הקוד:**
- לבדוק שדות חובה וכפילויות.
- ליצור רשומה חדשה.
- להחזיר 201 בהצלחה, 4xx בכשל קלט, 5xx בכשל שרת.

**Gate 100:** הסבר בעברית + קוד תואם דרישה + בדיקת edge cases.

**קובץ יעד:** `server/routes/items.routes.js`

**עץ קבצים לתרגיל:**
- `exam-project/`
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.

**פירוק למשימות טכניות:**
- 1. `server/routes/items.routes.js` - לבדוק שדות חובה וכפילויות.
- 2. `server/routes/items.routes.js` - ליצור רשומה חדשה.
- 3. `server/routes/items.routes.js` - להחזיר 201 בהצלחה, 4xx בכשל קלט, 5xx בכשל שרת.

**מושגים שחייבים לדעת:**
- קבלת payload וולידציה בצד שרת.
- בדיקת כפילות לפני יצירה.
- יצירה והחזרת 201/409/400.

#### api_get_all - 11%

**מה צריך לדעת:**
- GET בסיסי שמחזיר collection מלאה.
- תשובת JSON עקבית ו-200.
- טיפול שגיאה בשרת עם 500.

**איך לבנות את הקוד:**
- router.get(...) עם שאילתת all.
- res.status(200).json(data).
- catch->res.status(500).json(...)

**Gate 100:** הסבר בעברית + קוד תואם דרישה + בדיקת edge cases.

**קובץ יעד:** `server/routes/items.routes.js`

**עץ קבצים לתרגיל:**
- `exam-project/`
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.

**פירוק למשימות טכניות:**
- 1. `server/routes/items.routes.js` - router.get(...) עם שאילתת all.
- 2. `server/routes/items.routes.js` - res.status(200).json(data).
- 3. `server/routes/items.routes.js` - catch->res.status(500).json(...)

**מושגים שחייבים לדעת:**
- GET בסיסי שמחזיר collection מלאה.
- תשובת JSON עקבית ו-200.
- טיפול שגיאה בשרת עם 500.

#### api_delete - 6.8%

**מה צריך לדעת:**
- מחיקה לפי מזהה עם בדיקת קיום.
- החזרת הודעת הצלחה יציבה.
- 404 כאשר אין רשומה למחוק.

**איך לבנות את הקוד:**
- לבדוק קיום רשומה לפי id.
- לבצע delete atomically.
- להחזיר success message או 404.

**Gate 100:** הסבר בעברית + קוד תואם דרישה + בדיקת edge cases.

**קובץ יעד:** `server/routes/items.routes.js`

**עץ קבצים לתרגיל:**
- `exam-project/`
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.

**פירוק למשימות טכניות:**
- 1. `server/routes/items.routes.js` - לבדוק קיום רשומה לפי id.
- 2. `server/routes/items.routes.js` - לבצע delete atomically.
- 3. `server/routes/items.routes.js` - להחזיר success message או 404.

**מושגים שחייבים לדעת:**
- מחיקה לפי מזהה עם בדיקת קיום.
- החזרת הודעת הצלחה יציבה.
- 404 כאשר אין רשומה למחוק.

#### api_put_update - 4.1%

**מה צריך לדעת:**
- איתור רשומה לפי מזהה.
- ולידציה לעדכון חלקי/מלא.
- החזרת 200 אם עודכן, 404 אם לא נמצא.

**איך לבנות את הקוד:**
- לאתר רשומה לפי id.
- לעדכן רק שדות מותרות.
- להחזיר 200 + data או 404 אם חסר.

**Gate 100:** הסבר בעברית + קוד תואם דרישה + בדיקת edge cases.

**קובץ יעד:** `server/routes/items.routes.js`

**עץ קבצים לתרגיל:**
- `exam-project/`
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.

**פירוק למשימות טכניות:**
- 1. `server/routes/items.routes.js` - לאתר רשומה לפי id.
- 2. `server/routes/items.routes.js` - לעדכן רק שדות מותרות.
- 3. `server/routes/items.routes.js` - להחזיר 200 + data או 404 אם חסר.

**מושגים שחייבים לדעת:**
- איתור רשומה לפי מזהה.
- ולידציה לעדכון חלקי/מלא.
- החזרת 200 אם עודכן, 404 אם לא נמצא.

### 3. Data Layer (DB + Uniqueness) - 27.4%

- סעיפים מכוסים: 20
- מזהי סעיפים: 3, 11, 21, 26, 32, 34, 35, 36, 37, 38, 39, 40, 41, 42, 44, 45, 46, 47, 56, 58

#### db_uniqueness - 21.9%

**מה צריך לדעת:**
- מזהה חד-חד ערכי ברמת לוגיקה/DB.
- בדיקת כפילות לפני insert/update.
- החזרת הודעת שגיאה עקבית במקרה כפילות.

**איך לבנות את הקוד:**
- להגדיר unique key לוגי.
- לפני insert לבצע findOne/exists.
- בכפילות להחזיר conflict ברור.

**Gate 100:** הסבר בעברית + קוד תואם דרישה + בדיקת edge cases.

**קובץ יעד:** `server/models/Item.js`

**עץ קבצים לתרגיל:**
- `exam-project/`
  - `server/config/db.js` - חיבור Mongoose עם MONGO_URI מהסביבה.
  - `server/models/Item.js` - Schema, required fields, unique indexes ו-model.
  - `server/routes/items.routes.js` - Routes שמשתמשים ב-model במקום מידע זמני.

**פירוק למשימות טכניות:**
- 1. `server/models/Item.js` - להגדיר unique key לוגי.
- 2. `server/models/Item.js` - לפני insert לבצע findOne/exists.
- 3. `server/models/Item.js` - בכפילות להחזיר conflict ברור.

**מושגים שחייבים לדעת:**
- מזהה חד-חד ערכי ברמת לוגיקה/DB.
- בדיקת כפילות לפני insert/update.
- החזרת הודעת שגיאה עקבית במקרה כפילות.

#### db_persistence - 5.5%

**מה צריך לדעת:**
- מודל נתונים ברור (schema).
- חיבור DB וניהול failures.
- CRUD נקי עם טיפול שגיאות.

**איך לבנות את הקוד:**
- להגדיר schema/model.
- לפתוח חיבור DB באתחול שרת.
- להשתמש במודל בכל CRUD ולתפוס errors.

**Gate 100:** הסבר בעברית + קוד תואם דרישה + בדיקת edge cases.

**קובץ יעד:** `server/models/Item.js`

**עץ קבצים לתרגיל:**
- `exam-project/`
  - `server/config/db.js` - חיבור Mongoose עם MONGO_URI מהסביבה.
  - `server/models/Item.js` - Schema, required fields, unique indexes ו-model.
  - `server/routes/items.routes.js` - Routes שמשתמשים ב-model במקום מידע זמני.

**פירוק למשימות טכניות:**
- 1. `server/models/Item.js` - להגדיר schema/model.
- 2. `server/models/Item.js` - לפתוח חיבור DB באתחול שרת.
- 3. `server/models/Item.js` - להשתמש במודל בכל CRUD ולתפוס errors.

**מושגים שחייבים לדעת:**
- מודל נתונים ברור (schema).
- חיבור DB וניהול failures.
- CRUD נקי עם טיפול שגיאות.

### 4. JavaScript Problem Solving - 27.4%

- סעיפים מכוסים: 20
- מזהי סעיפים: 5, 18, 23, 24, 30, 32, 34, 36, 37, 38, 39, 41, 42, 43, 44, 45, 46, 47, 49, 72

#### js_algorithms - 27.4%

**מה צריך לדעת:**
- הבנת קלט/פלט מילולית לפני קוד.
- בחירת מבנה נתונים יעיל (Map/Object/Array).
- כתיבה נקייה בלי side-effects לא נדרשים.
- בדיקת דוגמאות ידניות לפני הגשה.

**איך לבנות את הקוד:**
- לכתוב pseudocode של השלבים.
- לממש בפונקציה אחת ברורה.
- להחזיר בדיוק את מבנה הפלט הנדרש.
- להריץ בדיקות עם קלטי דוגמה.

**Gate 100:** הסבר בעברית + קוד תואם דרישה + בדיקת edge cases.

**קובץ יעד:** `src/utils/algorithms.js`

**עץ קבצים לתרגיל:**
- `exam-project/`
  - `src/utils/algorithms.js` - הקובץ שבו כותבים פונקציות JS טהורות.
  - `src/utils/algorithms.test.js` - בדיקות קלט תקין, קלט לא תקין ו-edge cases.

**פירוק למשימות טכניות:**
- 1. `src/utils/algorithms.js` - לכתוב pseudocode של השלבים.
- 2. `src/utils/algorithms.js` - לממש בפונקציה אחת ברורה.
- 3. `src/utils/algorithms.js` - להחזיר בדיוק את מבנה הפלט הנדרש.
- 4. `src/utils/algorithms.js` - להריץ בדיקות עם קלטי דוגמה.

**מושגים שחייבים לדעת:**
- הבנת קלט/פלט מילולית לפני קוד.
- בחירת מבנה נתונים יעיל (Map/Object/Array).
- כתיבה נקייה בלי side-effects לא נדרשים.
- בדיקת דוגמאות ידניות לפני הגשה.

### 5. Scope/Meta Resolution - 24.7%

- סעיפים מכוסים: 18
- מזהי סעיפים: 4, 5, 32, 33, 34, 36, 37, 38, 39, 41, 42, 44, 45, 46, 47, 50, 51, 56

#### question_scope_inherited - 19.2%

**מה צריך לדעת:**
- סעיף כותרת לא מספיק לבדיקה אוטומטית.
- חובה לרשת משימות מכל תתי-הסעיפים בשאלה.

**איך לבנות את הקוד:**
- לא לדלג על כותרת: לפתוח את תתי-הסעיפים.
- לבנות checklist מכל תתי-הסעיפים לפני קוד.

**Gate 100:** הסבר בעברית + קוד תואם דרישה + בדיקת edge cases.

**קובץ יעד:** `docs/exam-answer.md`

**עץ קבצים לתרגיל:**
- `exam-project/`
  - `docs/exam-answer.md` - תשובה מילולית במבנה מה/למה/דוגמה/טעות.
  - `README.md` - סיכום החלטות ורשימת קבצים רלוונטיים לתרגיל.

**פירוק למשימות טכניות:**
- 1. `docs/exam-answer.md` - לא לדלג על כותרת: לפתוח את תתי-הסעיפים.
- 2. `docs/exam-answer.md` - לבנות checklist מכל תתי-הסעיפים לפני קוד.

**מושגים שחייבים לדעת:**
- סעיף כותרת לא מספיק לבדיקה אוטומטית.
- חובה לרשת משימות מכל תתי-הסעיפים בשאלה.

#### manual_review - 5.5%

**מה צריך לדעת:**
- כשהטקסט חלקי נדרש עיון ידני במקור.
- לא מאשרים מוכנות בלי פירוק מלא.

**איך לבנות את הקוד:**
- לפתוח את קובץ המקור ולהשלים טקסט חסר.
- להמיר את הכותרת לדרישות טכניות מדויקות.

**Gate 100:** חסום לציון אוטומטי עד עיון ידני במקור.

### 6. Theory & Verbal Explanations - 6.8%

- סעיפים מכוסים: 5
- מזהי סעיפים: 25, 26, 27, 28, 29

#### theory_explanation - 6.8%

**מה צריך לדעת:**
- הגדרה נכונה של מושגים (REST/Mongo/React).
- השוואה תמציתית יתרונות/חסרונות.
- דוגמה קצרה להמחשה.

**איך לבנות את הקוד:**
- לענות בפורמט נקודות קצרות.
- לכל טענה לצרף דוגמה קטנה.
- להיצמד לדיוק טרמינולוגי ללא מלל עודף.

**Gate 100:** הסבר בעברית + קוד תואם דרישה + בדיקת edge cases.

**קובץ יעד:** `docs/exam-answer.md`

**עץ קבצים לתרגיל:**
- `exam-project/`
  - `docs/exam-answer.md` - תשובה מילולית במבנה מה/למה/דוגמה/טעות.
  - `README.md` - סיכום החלטות ורשימת קבצים רלוונטיים לתרגיל.

**פירוק למשימות טכניות:**
- 1. `docs/exam-answer.md` - לענות בפורמט נקודות קצרות.
- 2. `docs/exam-answer.md` - לכל טענה לצרף דוגמה קטנה.
- 3. `docs/exam-answer.md` - להיצמד לדיוק טרמינולוגי ללא מלל עודף.

**מושגים שחייבים לדעת:**
- הגדרה נכונה של מושגים (REST/Mongo/React).
- השוואה תמציתית יתרונות/חסרונות.
- דוגמה קצרה להמחשה.

### 7. Node File I/O + OOP Design - 5.5%

- סעיפים מכוסים: 4
- מזהי סעיפים: 21, 24, 31, 73

#### node_file_io - 4.1%

**מה צריך לדעת:**
- fs/promises ליצירה/כתיבה/קריאה.
- ניהול נתיבים וקידוד UTF-8.
- טיפול שגיאות קובץ והרשאות.

**איך לבנות את הקוד:**
- constructor מקבל שם קובץ.
- ליצור קובץ אם חסר באמצעות fs.
- לכתוב מתודות write/read/append לפי הדרישה.
- לתפוס שגיאות ולהחזיר הודעות תקינות.

**Gate 100:** הסבר בעברית + קוד תואם דרישה + בדיקת edge cases.

**קובץ יעד:** `server/services/fileStore.js`

**עץ קבצים לתרגיל:**
- `exam-project/`
  - `server/services/fileStore.js` - קריאה/כתיבה לקבצים עם fs/promises.
  - `server/routes/files.routes.js` - Route שמפעיל את service ומחזיר status מתאים.

**פירוק למשימות טכניות:**
- 1. `server/services/fileStore.js` - constructor מקבל שם קובץ.
- 2. `server/services/fileStore.js` - ליצור קובץ אם חסר באמצעות fs.
- 3. `server/services/fileStore.js` - לכתוב מתודות write/read/append לפי הדרישה.
- 4. `server/services/fileStore.js` - לתפוס שגיאות ולהחזיר הודעות תקינות.

**מושגים שחייבים לדעת:**
- fs/promises ליצירה/כתיבה/קריאה.
- ניהול נתיבים וקידוד UTF-8.
- טיפול שגיאות קובץ והרשאות.

#### oop_design - 2.7%

**מה צריך לדעת:**
- Class + constructor + methods.
- שמירה על אחריות של כל מחלקה.
- ולידציה בסיסית בתוך מתודות.

**איך לבנות את הקוד:**
- להגדיר class עם שדות נתונים.
- לממש בנאי ואתחול נכון.
- להוסיף methods לביזנס לוג׳יק הנדרש.
- ליצור מופעים ולבדוק זרימה מלאה.

**Gate 100:** הסבר בעברית + קוד תואם דרישה + בדיקת edge cases.

**קובץ יעד:** `src/models/Product.js`

**עץ קבצים לתרגיל:**
- `exam-project/`
  - `src/models/Product.js` - Class, constructor ומתודות.
  - `src/models/Product.test.js` - בדיקות ל-constructor, this ומתודות.

**פירוק למשימות טכניות:**
- 1. `src/models/Product.js` - להגדיר class עם שדות נתונים.
- 2. `src/models/Product.js` - לממש בנאי ואתחול נכון.
- 3. `src/models/Product.js` - להוסיף methods לביזנס לוג׳יק הנדרש.
- 4. `src/models/Product.js` - ליצור מופעים ולבדוק זרימה מלאה.

**מושגים שחייבים לדעת:**
- Class + constructor + methods.
- שמירה על אחריות של כל מחלקה.
- ולידציה בסיסית בתוך מתודות.

## פירוק סעיף-סעיף ל-100

הניקוד כאן הוא רובריקה פנימית של 100 נקודות לכל סעיף כדי לדעת איך להתכונן. זה לא טוען לניקוד הרשמי של המרצה.

### סעיף 1 - עותק של מבחן חדש 2023.pdf / Q1.1

> 1 . GET – מחזיר את כל המורים.

- סטטוס: ready
- ענפים: backend_api_routes
- משימות מקור: api_get_all

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.

**תתי־משימות טכניות:**
- 1. `server/routes/items.routes.js` - להגדיר route GET
- 2. `server/routes/items.routes.js` - למשוך נתונים מהאחסון
- 3. `server/routes/items.routes.js` - להחזיר JSON + status 200

**רובריקת 100 פנימית:**
- 25 נק׳ - Route/method/status code נכונים: ה-endpoint מתאים לדרישה ומחזיר 200/201/400/404/500 לפי מצב.
- 20 נק׳ - Validation של body/query/params: אין כניסה לא תקינה שממשיכה לפעולת DB או response שגוי.
- 25 נק׳ - פעולת data/DB נכונה: find/create/update/delete או persistence מתבצעים במקום הנכון.
- 15 נק׳ - Error handling: try/catch או טיפול כשל ברור בלי להסתיר שגיאות.
- 15 נק׳ - חיבור ל-client והודעה מובנת: התגובה חוזרת JSON ברור שהממשק יודע להציג.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 2 - עותק של מבחן חדש 2023.pdf / Q1.2

> 2 . POST – רק את המורים שהשכר שלהם נמוך ממה שהמשתמש הזין .

- סטטוס: ready
- ענפים: backend_api_routes
- משימות מקור: api_get_filtered, api_post_create

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.

**תתי־משימות טכניות:**
- 1. `server/routes/items.routes.js` - לקבל פרמטר/ערך סינון
- 2. `server/routes/items.routes.js` - לסנן נתונים ללא mutation
- 3. `server/routes/items.routes.js` - להחזיר תוצאה ריקה/תקינה
- 4. `server/routes/items.routes.js` - לקרוא req.body
- 5. `server/routes/items.routes.js` - לבצע ולידציה
- 6. `server/routes/items.routes.js` - להחזיר 201 או שגיאה מתאימה

**רובריקת 100 פנימית:**
- 25 נק׳ - Route/method/status code נכונים: ה-endpoint מתאים לדרישה ומחזיר 200/201/400/404/500 לפי מצב.
- 20 נק׳ - Validation של body/query/params: אין כניסה לא תקינה שממשיכה לפעולת DB או response שגוי.
- 25 נק׳ - פעולת data/DB נכונה: find/create/update/delete או persistence מתבצעים במקום הנכון.
- 15 נק׳ - Error handling: try/catch או טיפול כשל ברור בלי להסתיר שגיאות.
- 15 נק׳ - חיבור ל-client והודעה מובנת: התגובה חוזרת JSON ברור שהממשק יודע להציג.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 3 - עותק של מבחן חדש 2023.pdf / Q1.3

> 3 . POST – מקבל מאפיינים של מורה, במידה וקיים מורה עם אותו שם ואותו מקצוע תוחזר הודעה רלוונטית , אחרת יוכנס ל dB ותוחזר הודעה על כך שנרשם בהצלחה. יש להתאים את כלל המתודות לממשק המשתמש, על כן המשתמש צריך לראות את הנתונים החוזרים מהשרת כמו גם היכולת ליצירת מורה ב db .

- סטטוס: ready
- ענפים: backend_api_routes, data_persistence
- משימות מקור: api_post_create, db_persistence, alerts_error_handling

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.
  - `server/config/db.js` - חיבור Mongoose עם MONGO_URI מהסביבה.

**תתי־משימות טכניות:**
- 1. `server/routes/items.routes.js` - לקרוא req.body
- 2. `server/routes/items.routes.js` - לבצע ולידציה
- 3. `server/routes/items.routes.js` - להחזיר 201 או שגיאה מתאימה
- 4. `server/routes/items.routes.js` - להתחבר ל-DB
- 5. `server/routes/items.routes.js` - לבצע CRUD
- 6. `server/routes/items.routes.js` - לנהל שגיאות DB
- 7. `server/routes/items.routes.js` - לעטוף פעולות ב-try/catch
- 8. `server/routes/items.routes.js` - להחזיר/להציג הודעת שגיאה
- 9. `server/routes/items.routes.js` - לא להסתיר כשלונות

**רובריקת 100 פנימית:**
- 25 נק׳ - Route/method/status code נכונים: ה-endpoint מתאים לדרישה ומחזיר 200/201/400/404/500 לפי מצב.
- 20 נק׳ - Validation של body/query/params: אין כניסה לא תקינה שממשיכה לפעולת DB או response שגוי.
- 25 נק׳ - פעולת data/DB נכונה: find/create/update/delete או persistence מתבצעים במקום הנכון.
- 15 נק׳ - Error handling: try/catch או טיפול כשל ברור בלי להסתיר שגיאות.
- 15 נק׳ - חיבור ל-client והודעה מובנת: התגובה חוזרת JSON ברור שהממשק יודע להציג.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 4 - עותק של מבחן טיסות.docx / Q1.main

> שאלה 1 – 50 נקודות.

- סטטוס: manual_review
- ענפים: scope_meta
- משימות מקור: manual_review

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `docs/source-review.md` - סעיף שמחייב עיון ידני במקור לפני ציון אוטומטי.
  - `README.md` - תיעוד החלטת עיון ידני, מקור הסעיף ומה חסר לפירוק טכני.

**תתי־משימות טכניות:**
- 1. `docs/source-review.md` - עיון ידני במקור

**רובריקת 100 פנימית:**
- 100 נק׳ - עיון ידני במקור לפני ציון: הסעיף סומן manual_review ולכן אין ציון אוטומטי עד פירוק טכני מלא.

**איך לקבל 100:**
- לפתוח את המקור המדויק ולחלץ דרישה טכנית מלאה.
- לא לתת ציון אוטומטי עד שיש קלט, פלט, קובץ יעד ו-Gate מעבר.

**מעבר ל-100:**
- להוסיף evidence מהמקור אחרי עיון ידני.

### סעיף 5 - עותק של מבחן טיסות.docx / Q2.main

> שאלה 2 - 25 נקודות

- סטטוס: ready
- ענפים: backend_api_routes, js_problem_solving, scope_meta
- משימות מקור: question_scope_inherited, alerts_error_handling, js_algorithms

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `docs/exam-answer.md` - תשובה מילולית במבנה מה/למה/דוגמה/טעות.
  - `README.md` - סיכום החלטות ורשימת קבצים רלוונטיים לתרגיל.
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.
  - `src/utils/algorithms.js` - הקובץ שבו כותבים פונקציות JS טהורות.
  - `src/utils/algorithms.test.js` - בדיקות קלט תקין, קלט לא תקין ו-edge cases.

**תתי־משימות טכניות:**
- 1. `docs/exam-answer.md` - זה סעיף כותרת/מעטפת
- 2. `docs/exam-answer.md` - להחיל את כל משימות תתי-הסעיפים של אותה שאלה
- 3. `docs/exam-answer.md` - לבנות תוכנית עבודה לפי תתי-הסעיפים בפועל
- 4. `docs/exam-answer.md` - לעטוף פעולות ב-try/catch
- 5. `docs/exam-answer.md` - להחזיר/להציג הודעת שגיאה
- 6. `docs/exam-answer.md` - לא להסתיר כשלונות
- 7. `docs/exam-answer.md` - לזהות קלט/פלט
- 8. `docs/exam-answer.md` - לממש אלגוריתם
- 9. `docs/exam-answer.md` - להחזיר מבנה נתונים מדויק

**רובריקת 100 פנימית:**
- 25 נק׳ - בדיקת קלט ו-Error לפי דרישה: הפונקציה דוחה קלט לא תקין בצורה מפורשת.
- 35 נק׳ - אלגוריתם נכון לכל מקרי הבסיס: הלוגיקה מחזירה את הערך הנכון בלי mutation לא נדרש.
- 20 נק׳ - Edge cases: נבדקים מערך ריק, טיפוסים לא נכונים וערכים גבוליים.
- 20 נק׳ - פלט נקי והסבר קצר: הקוד קריא והסטודנט יודע להסביר כל שורה מרכזית.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 6 - עותק של מבחן טיסות.docx / Q3.1

> 1. "כל הטיסות" – ברירת מחדל. מציג בריבועים במרכז העמוד את כל הטיסות. בכל ריבוע ניתן לראות את מספר הטיסה, חברת התעופה ומתחת את מספר הנוסעים בטיסה.

- סטטוס: ready
- ענפים: frontend_ui_validation
- משימות מקור: client_navigation, client_list_render

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `src/App.jsx` - מגדיר BrowserRouter ו-Routes.
  - `src/pages/AddItemPage.jsx` - הקובץ שבו מבצעים create ואז navigate.
  - `src/services/api.js` - מבודד את קריאת ה-POST מהקומפוננטה.
  - `src/components/ItemsList.jsx` - הקובץ שבו כותבים map, filter ו-key יציב.
  - `src/components/SearchBox.jsx` - שדה חיפוש נשלט שמעדכן query.

**תתי־משימות טכניות:**
- 1. `src/pages/AddItemPage.jsx` - להגדיר routes במסך
- 2. `src/pages/AddItemPage.jsx` - לבצע redirect לאחר פעולה
- 3. `src/pages/AddItemPage.jsx` - לשמור UX עקבי
- 4. `src/pages/AddItemPage.jsx` - למפות מערך לרכיבים
- 5. `src/pages/AddItemPage.jsx` - להציג שדות נדרשים
- 6. `src/pages/AddItemPage.jsx` - למיין תצוגה לפי כלל

**רובריקת 100 פנימית:**
- 25 נק׳ - מבנה React נכון: state/props/components מחולקים לקבצים הנכונים.
- 25 נק׳ - Inputs/actions/submit: כל פעולה שהסעיף דורש קיימת במסך.
- 20 נק׳ - Validation והודעות שגיאה: המשתמש מקבל הודעה ברורה לפני שליחה לא תקינה.
- 15 נק׳ - Integration מול API/route: fetch/navigate/render מתבצעים רק אחרי פעולה תקינה.
- 15 נק׳ - UI יציב ונגיש: אין overflow, יש labels, והזרימה מובנת.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 7 - עותק של מבחן טיסות.docx / Q3.2

> 2. "מיון טיסות" – מעביר את הלקוח לעמוד חדש. "/controlpanel/sort" בעמוד זה מעבר לאפשרויות השונות מצד שמאל יופיעו 2 אלמנטים.

- סטטוס: ready
- ענפים: frontend_ui_validation, backend_api_routes
- משימות מקור: api_get_filtered, server_html_route, client_navigation

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.
  - `src/App.jsx` - מגדיר BrowserRouter ו-Routes.
  - `src/pages/AddItemPage.jsx` - הקובץ שבו מבצעים create ואז navigate.
  - `src/services/api.js` - מבודד את קריאת ה-POST מהקומפוננטה.

**תתי־משימות טכניות:**
- 1. `server/routes/items.routes.js` - לקבל פרמטר/ערך סינון
- 2. `server/routes/items.routes.js` - לסנן נתונים ללא mutation
- 3. `server/routes/items.routes.js` - להחזיר תוצאה ריקה/תקינה
- 4. `server/routes/items.routes.js` - להגדיר route שמחזיר HTML
- 5. `server/routes/items.routes.js` - לשרת קבצים סטטיים
- 6. `server/routes/items.routes.js` - למפות URL נכון
- 7. `server/routes/items.routes.js` - להגדיר routes במסך
- 8. `server/routes/items.routes.js` - לבצע redirect לאחר פעולה
- 9. `server/routes/items.routes.js` - לשמור UX עקבי

**רובריקת 100 פנימית:**
- 25 נק׳ - Route/method/status code נכונים: ה-endpoint מתאים לדרישה ומחזיר 200/201/400/404/500 לפי מצב.
- 20 נק׳ - Validation של body/query/params: אין כניסה לא תקינה שממשיכה לפעולת DB או response שגוי.
- 25 נק׳ - פעולת data/DB נכונה: find/create/update/delete או persistence מתבצעים במקום הנכון.
- 15 נק׳ - Error handling: try/catch או טיפול כשל ברור בלי להסתיר שגיאות.
- 15 נק׳ - חיבור ל-client והודעה מובנת: התגובה חוזרת JSON ברור שהממשק יודע להציג.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 8 - עותק של מבחן טיסות.docx / Q3.א

> א. מיון לפי שם חברה- אינפוט שיציג את שמות הטיסות בהתאם לערך שנכנס. ** הערך לא צריך להירשם בשלמותו.

- סטטוס: ready
- ענפים: frontend_ui_validation, backend_api_routes
- משימות מקור: api_get_filtered, client_form_inputs

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.
  - `src/App.jsx` - מחבר routes, state ראשי וקומפוננטות המסלול.
  - `src/components/ExamForm.jsx` - הקובץ שבו בונים את הטופס, ה-inputs וה-submit.
  - `src/utils/validation.js` - פונקציות validation טהורות שחוזרות עם errors לפי שדה.
  - `src/services/api.js` - קריאות fetch לשרת אחרי validation תקין.

**תתי־משימות טכניות:**
- 1. `server/routes/items.routes.js` - לקבל פרמטר/ערך סינון
- 2. `server/routes/items.routes.js` - לסנן נתונים ללא mutation
- 3. `server/routes/items.routes.js` - להחזיר תוצאה ריקה/תקינה
- 4. `server/routes/items.routes.js` - לבנות controlled inputs
- 5. `server/routes/items.routes.js` - להגדיר select/options
- 6. `server/routes/items.routes.js` - לחבר submit button

**רובריקת 100 פנימית:**
- 25 נק׳ - Route/method/status code נכונים: ה-endpoint מתאים לדרישה ומחזיר 200/201/400/404/500 לפי מצב.
- 20 נק׳ - Validation של body/query/params: אין כניסה לא תקינה שממשיכה לפעולת DB או response שגוי.
- 25 נק׳ - פעולת data/DB נכונה: find/create/update/delete או persistence מתבצעים במקום הנכון.
- 15 נק׳ - Error handling: try/catch או טיפול כשל ברור בלי להסתיר שגיאות.
- 15 נק׳ - חיבור ל-client והודעה מובנת: התגובה חוזרת JSON ברור שהממשק יודע להציג.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 9 - עותק של מבחן טיסות.docx / Q3.ב

> ב. אלמנט select שיאפשר למיין לפי המטוס עם מספר מושבים הנמוך או הגבוה ביותר. ** הצגת הטיסות תהיה כמו בעמוד הקודם, בריבועים עם כל המאפיינים.

- סטטוס: ready
- ענפים: frontend_ui_validation, backend_api_routes
- משימות מקור: api_get_filtered, client_form_inputs, client_list_render

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.
  - `src/App.jsx` - מחבר routes, state ראשי וקומפוננטות המסלול.
  - `src/components/ExamForm.jsx` - הקובץ שבו בונים את הטופס, ה-inputs וה-submit.
  - `src/utils/validation.js` - פונקציות validation טהורות שחוזרות עם errors לפי שדה.
  - `src/services/api.js` - קריאות fetch לשרת אחרי validation תקין.
  - `src/components/ItemsList.jsx` - הקובץ שבו כותבים map, filter ו-key יציב.
  - `src/components/SearchBox.jsx` - שדה חיפוש נשלט שמעדכן query.

**תתי־משימות טכניות:**
- 1. `server/routes/items.routes.js` - לקבל פרמטר/ערך סינון
- 2. `server/routes/items.routes.js` - לסנן נתונים ללא mutation
- 3. `server/routes/items.routes.js` - להחזיר תוצאה ריקה/תקינה
- 4. `server/routes/items.routes.js` - לבנות controlled inputs
- 5. `server/routes/items.routes.js` - להגדיר select/options
- 6. `server/routes/items.routes.js` - לחבר submit button
- 7. `server/routes/items.routes.js` - למפות מערך לרכיבים
- 8. `server/routes/items.routes.js` - להציג שדות נדרשים
- 9. `server/routes/items.routes.js` - למיין תצוגה לפי כלל

**רובריקת 100 פנימית:**
- 25 נק׳ - Route/method/status code נכונים: ה-endpoint מתאים לדרישה ומחזיר 200/201/400/404/500 לפי מצב.
- 20 נק׳ - Validation של body/query/params: אין כניסה לא תקינה שממשיכה לפעולת DB או response שגוי.
- 25 נק׳ - פעולת data/DB נכונה: find/create/update/delete או persistence מתבצעים במקום הנכון.
- 15 נק׳ - Error handling: try/catch או טיפול כשל ברור בלי להסתיר שגיאות.
- 15 נק׳ - חיבור ל-client והודעה מובנת: התגובה חוזרת JSON ברור שהממשק יודע להציג.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 10 - עותק של מבחן טיסות.docx / Q3.3

> 3. הוסף טיסה - עמוד המאפשר להוסיף טיסה חדשה, נמצא תחת הערוץ "/controlpanel/add" בערוץ זה בנוסף לכל האפשרויות מצד שמאל, יש 3 אינפוטים להזנת שדה + כפתור הוספה

- סטטוס: ready
- ענפים: frontend_ui_validation, backend_api_routes
- משימות מקור: server_html_route, client_form_inputs, client_navigation

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.
  - `src/App.jsx` - מחבר routes, state ראשי וקומפוננטות המסלול.
  - `src/components/ExamForm.jsx` - הקובץ שבו בונים את הטופס, ה-inputs וה-submit.
  - `src/utils/validation.js` - פונקציות validation טהורות שחוזרות עם errors לפי שדה.
  - `src/services/api.js` - קריאות fetch לשרת אחרי validation תקין.
  - `src/pages/AddItemPage.jsx` - הקובץ שבו מבצעים create ואז navigate.

**תתי־משימות טכניות:**
- 1. `server/routes/items.routes.js` - להגדיר route שמחזיר HTML
- 2. `server/routes/items.routes.js` - לשרת קבצים סטטיים
- 3. `server/routes/items.routes.js` - למפות URL נכון
- 4. `server/routes/items.routes.js` - לבנות controlled inputs
- 5. `server/routes/items.routes.js` - להגדיר select/options
- 6. `server/routes/items.routes.js` - לחבר submit button
- 7. `server/routes/items.routes.js` - להגדיר routes במסך
- 8. `server/routes/items.routes.js` - לבצע redirect לאחר פעולה
- 9. `server/routes/items.routes.js` - לשמור UX עקבי

**רובריקת 100 פנימית:**
- 25 נק׳ - Route/method/status code נכונים: ה-endpoint מתאים לדרישה ומחזיר 200/201/400/404/500 לפי מצב.
- 20 נק׳ - Validation של body/query/params: אין כניסה לא תקינה שממשיכה לפעולת DB או response שגוי.
- 25 נק׳ - פעולת data/DB נכונה: find/create/update/delete או persistence מתבצעים במקום הנכון.
- 15 נק׳ - Error handling: try/catch או טיפול כשל ברור בלי להסתיר שגיאות.
- 15 נק׳ - חיבור ל-client והודעה מובנת: התגובה חוזרת JSON ברור שהממשק יודע להציג.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 11 - עותק של מבחן טיסות.docx / Q3.א

> א. שדה מספר טיסה – מקבל ערך מספרי עד 5 תווים (לא ניתן ליצור 2 טיסות עם אותו מספר).

- סטטוס: ready
- ענפים: frontend_ui_validation, data_persistence
- משימות מקור: db_uniqueness, client_validation_rules

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `server/config/db.js` - חיבור Mongoose עם MONGO_URI מהסביבה.
  - `server/models/Item.js` - Schema, required fields, unique indexes ו-model.
  - `server/routes/items.routes.js` - Routes שמשתמשים ב-model במקום מידע זמני.
  - `src/App.jsx` - מחבר routes, state ראשי וקומפוננטות המסלול.
  - `src/components/ExamForm.jsx` - הקובץ שבו בונים את הטופס, ה-inputs וה-submit.
  - `src/utils/validation.js` - פונקציות validation טהורות שחוזרות עם errors לפי שדה.
  - `src/services/api.js` - קריאות fetch לשרת אחרי validation תקין.

**תתי־משימות טכניות:**
- 1. `server/models/Item.js` - להגדיר שדה מזהה
- 2. `server/models/Item.js` - לבדוק כפילות לפני insert
- 3. `server/models/Item.js` - להחזיר הודעה במקרה כפילות
- 4. `server/models/Item.js` - לכתוב חוקי regex/טווח
- 5. `server/models/Item.js` - לחסום שליחה לא תקינה
- 6. `server/models/Item.js` - להציג שגיאה ברורה למשתמש

**רובריקת 100 פנימית:**
- 25 נק׳ - Route/method/status code נכונים: ה-endpoint מתאים לדרישה ומחזיר 200/201/400/404/500 לפי מצב.
- 20 נק׳ - Validation של body/query/params: אין כניסה לא תקינה שממשיכה לפעולת DB או response שגוי.
- 25 נק׳ - פעולת data/DB נכונה: find/create/update/delete או persistence מתבצעים במקום הנכון.
- 15 נק׳ - Error handling: try/catch או טיפול כשל ברור בלי להסתיר שגיאות.
- 15 נק׳ - חיבור ל-client והודעה מובנת: התגובה חוזרת JSON ברור שהממשק יודע להציג.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 12 - עותק של מבחן טיסות.docx / Q3.ב

> ב. שדה חברת תעופה – מקבל כל סוג של ערך (חייב לפחות אות אחת)

- סטטוס: ready
- ענפים: frontend_ui_validation
- משימות מקור: client_validation_rules

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `src/App.jsx` - מחבר routes, state ראשי וקומפוננטות המסלול.
  - `src/components/ExamForm.jsx` - הקובץ שבו בונים את הטופס, ה-inputs וה-submit.
  - `src/utils/validation.js` - פונקציות validation טהורות שחוזרות עם errors לפי שדה.
  - `src/services/api.js` - קריאות fetch לשרת אחרי validation תקין.

**תתי־משימות טכניות:**
- 1. `src/components/ExamForm.jsx` - לכתוב חוקי regex/טווח
- 2. `src/components/ExamForm.jsx` - לחסום שליחה לא תקינה
- 3. `src/components/ExamForm.jsx` - להציג שגיאה ברורה למשתמש

**רובריקת 100 פנימית:**
- 25 נק׳ - מבנה React נכון: state/props/components מחולקים לקבצים הנכונים.
- 25 נק׳ - Inputs/actions/submit: כל פעולה שהסעיף דורש קיימת במסך.
- 20 נק׳ - Validation והודעות שגיאה: המשתמש מקבל הודעה ברורה לפני שליחה לא תקינה.
- 15 נק׳ - Integration מול API/route: fetch/navigate/render מתבצעים רק אחרי פעולה תקינה.
- 15 נק׳ - UI יציב ונגיש: אין overflow, יש labels, והזרימה מובנת.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 13 - עותק של מבחן טיסות.docx / Q3.ג

> ג. מספר נוסעים – בין 1 – 450.

- סטטוס: ready
- ענפים: frontend_ui_validation
- משימות מקור: client_validation_rules

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `src/App.jsx` - מחבר routes, state ראשי וקומפוננטות המסלול.
  - `src/components/ExamForm.jsx` - הקובץ שבו בונים את הטופס, ה-inputs וה-submit.
  - `src/utils/validation.js` - פונקציות validation טהורות שחוזרות עם errors לפי שדה.
  - `src/services/api.js` - קריאות fetch לשרת אחרי validation תקין.

**תתי־משימות טכניות:**
- 1. `src/components/ExamForm.jsx` - לכתוב חוקי regex/טווח
- 2. `src/components/ExamForm.jsx` - לחסום שליחה לא תקינה
- 3. `src/components/ExamForm.jsx` - להציג שגיאה ברורה למשתמש

**רובריקת 100 פנימית:**
- 25 נק׳ - מבנה React נכון: state/props/components מחולקים לקבצים הנכונים.
- 25 נק׳ - Inputs/actions/submit: כל פעולה שהסעיף דורש קיימת במסך.
- 20 נק׳ - Validation והודעות שגיאה: המשתמש מקבל הודעה ברורה לפני שליחה לא תקינה.
- 15 נק׳ - Integration מול API/route: fetch/navigate/render מתבצעים רק אחרי פעולה תקינה.
- 15 נק׳ - UI יציב ונגיש: אין overflow, יש labels, והזרימה מובנת.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 14 - עותק של מבחן טיסות.docx / Q3.ד

> ד. כפתור צור – לחיצה על כפתור זה תוסיף טיסה חדשה רק במידה וכל השדות היו תקינים, במידה ולא תופיע הודעת שגיאה על כך בALERT. במידה והכל תקין,תוסיף את הטיסה למערך הטיסות ותחזיר את הלקוח לעמוד "כל הטיסות".

- סטטוס: ready
- ענפים: frontend_ui_validation, backend_api_routes
- משימות מקור: client_form_inputs, alerts_error_handling

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `src/App.jsx` - מחבר routes, state ראשי וקומפוננטות המסלול.
  - `src/components/ExamForm.jsx` - הקובץ שבו בונים את הטופס, ה-inputs וה-submit.
  - `src/utils/validation.js` - פונקציות validation טהורות שחוזרות עם errors לפי שדה.
  - `src/services/api.js` - קריאות fetch לשרת אחרי validation תקין.
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.

**תתי־משימות טכניות:**
- 1. `src/components/ExamForm.jsx` - לבנות controlled inputs
- 2. `src/components/ExamForm.jsx` - להגדיר select/options
- 3. `src/components/ExamForm.jsx` - לחבר submit button
- 4. `src/components/ExamForm.jsx` - לעטוף פעולות ב-try/catch
- 5. `src/components/ExamForm.jsx` - להחזיר/להציג הודעת שגיאה
- 6. `src/components/ExamForm.jsx` - לא להסתיר כשלונות

**רובריקת 100 פנימית:**
- 25 נק׳ - Route/method/status code נכונים: ה-endpoint מתאים לדרישה ומחזיר 200/201/400/404/500 לפי מצב.
- 20 נק׳ - Validation של body/query/params: אין כניסה לא תקינה שממשיכה לפעולת DB או response שגוי.
- 25 נק׳ - פעולת data/DB נכונה: find/create/update/delete או persistence מתבצעים במקום הנכון.
- 15 נק׳ - Error handling: try/catch או טיפול כשל ברור בלי להסתיר שגיאות.
- 15 נק׳ - חיבור ל-client והודעה מובנת: התגובה חוזרת JSON ברור שהממשק יודע להציג.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 15 - עותק של מבחן טיסות.docx / Q3.4

> 4. מחק טיסה - עמוד המאפשר למחוק טיסה קיימת, תחת הערוץ "/controlpanel/delete" בערוץ זה בנוסף לכל האפשרויות מצד שמאל, יש אינפוט וכפתור

- סטטוס: ready
- ענפים: frontend_ui_validation, backend_api_routes
- משימות מקור: api_delete, server_html_route, client_form_inputs, client_navigation

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.
  - `src/App.jsx` - מחבר routes, state ראשי וקומפוננטות המסלול.
  - `src/components/ExamForm.jsx` - הקובץ שבו בונים את הטופס, ה-inputs וה-submit.
  - `src/utils/validation.js` - פונקציות validation טהורות שחוזרות עם errors לפי שדה.
  - `src/services/api.js` - קריאות fetch לשרת אחרי validation תקין.
  - `src/pages/AddItemPage.jsx` - הקובץ שבו מבצעים create ואז navigate.

**תתי־משימות טכניות:**
- 1. `server/routes/items.routes.js` - לאתר רשומה למחיקה
- 2. `server/routes/items.routes.js` - למחוק בפועל
- 3. `server/routes/items.routes.js` - להחזיר הודעת הצלחה/שגיאה
- 4. `server/routes/items.routes.js` - להגדיר route שמחזיר HTML
- 5. `server/routes/items.routes.js` - לשרת קבצים סטטיים
- 6. `server/routes/items.routes.js` - למפות URL נכון
- 7. `server/routes/items.routes.js` - לבנות controlled inputs
- 8. `server/routes/items.routes.js` - להגדיר select/options
- 9. `server/routes/items.routes.js` - לחבר submit button
- 10. `server/routes/items.routes.js` - להגדיר routes במסך
- 11. `server/routes/items.routes.js` - לבצע redirect לאחר פעולה
- 12. `server/routes/items.routes.js` - לשמור UX עקבי

**רובריקת 100 פנימית:**
- 25 נק׳ - Route/method/status code נכונים: ה-endpoint מתאים לדרישה ומחזיר 200/201/400/404/500 לפי מצב.
- 20 נק׳ - Validation של body/query/params: אין כניסה לא תקינה שממשיכה לפעולת DB או response שגוי.
- 25 נק׳ - פעולת data/DB נכונה: find/create/update/delete או persistence מתבצעים במקום הנכון.
- 15 נק׳ - Error handling: try/catch או טיפול כשל ברור בלי להסתיר שגיאות.
- 15 נק׳ - חיבור ל-client והודעה מובנת: התגובה חוזרת JSON ברור שהממשק יודע להציג.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 16 - עותק של מבחן טיסות.docx / Q3.א

> א. אינפוט אשר מקבל ערך מספרי עד 5 תווים (מייצג מספר טיסה)

- סטטוס: ready
- ענפים: frontend_ui_validation
- משימות מקור: client_form_inputs, client_validation_rules

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `src/App.jsx` - מחבר routes, state ראשי וקומפוננטות המסלול.
  - `src/components/ExamForm.jsx` - הקובץ שבו בונים את הטופס, ה-inputs וה-submit.
  - `src/utils/validation.js` - פונקציות validation טהורות שחוזרות עם errors לפי שדה.
  - `src/services/api.js` - קריאות fetch לשרת אחרי validation תקין.

**תתי־משימות טכניות:**
- 1. `src/components/ExamForm.jsx` - לבנות controlled inputs
- 2. `src/components/ExamForm.jsx` - להגדיר select/options
- 3. `src/components/ExamForm.jsx` - לחבר submit button
- 4. `src/components/ExamForm.jsx` - לכתוב חוקי regex/טווח
- 5. `src/components/ExamForm.jsx` - לחסום שליחה לא תקינה
- 6. `src/components/ExamForm.jsx` - להציג שגיאה ברורה למשתמש

**רובריקת 100 פנימית:**
- 25 נק׳ - מבנה React נכון: state/props/components מחולקים לקבצים הנכונים.
- 25 נק׳ - Inputs/actions/submit: כל פעולה שהסעיף דורש קיימת במסך.
- 20 נק׳ - Validation והודעות שגיאה: המשתמש מקבל הודעה ברורה לפני שליחה לא תקינה.
- 15 נק׳ - Integration מול API/route: fetch/navigate/render מתבצעים רק אחרי פעולה תקינה.
- 15 נק׳ - UI יציב ונגיש: אין overflow, יש labels, והזרימה מובנת.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 17 - עותק של מבחן טיסות.docx / Q3.ב

> ב. כפתור מחק – הכפתור בודק האם קיימת טיסה בהתאם לערך שהוכנס במידה ולא תזרק שגיאה שלא קיימת טיסה כזאת. במידה וכן קיימת, תקפוץ למשתמש הודעה שהטיסה נמחקה ובנוסף יופיע באותה הודעה כמות כל הטיסות וכמות כל הנוסעים שנמצאים כרגע באוויר.

- סטטוס: ready
- ענפים: frontend_ui_validation, backend_api_routes
- משימות מקור: api_delete, client_form_inputs, alerts_error_handling

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.
  - `src/App.jsx` - מחבר routes, state ראשי וקומפוננטות המסלול.
  - `src/components/ExamForm.jsx` - הקובץ שבו בונים את הטופס, ה-inputs וה-submit.
  - `src/utils/validation.js` - פונקציות validation טהורות שחוזרות עם errors לפי שדה.
  - `src/services/api.js` - קריאות fetch לשרת אחרי validation תקין.

**תתי־משימות טכניות:**
- 1. `server/routes/items.routes.js` - לאתר רשומה למחיקה
- 2. `server/routes/items.routes.js` - למחוק בפועל
- 3. `server/routes/items.routes.js` - להחזיר הודעת הצלחה/שגיאה
- 4. `server/routes/items.routes.js` - לבנות controlled inputs
- 5. `server/routes/items.routes.js` - להגדיר select/options
- 6. `server/routes/items.routes.js` - לחבר submit button
- 7. `server/routes/items.routes.js` - לעטוף פעולות ב-try/catch
- 8. `server/routes/items.routes.js` - להחזיר/להציג הודעת שגיאה
- 9. `server/routes/items.routes.js` - לא להסתיר כשלונות

**רובריקת 100 פנימית:**
- 25 נק׳ - Route/method/status code נכונים: ה-endpoint מתאים לדרישה ומחזיר 200/201/400/404/500 לפי מצב.
- 20 נק׳ - Validation של body/query/params: אין כניסה לא תקינה שממשיכה לפעולת DB או response שגוי.
- 25 נק׳ - פעולת data/DB נכונה: find/create/update/delete או persistence מתבצעים במקום הנכון.
- 15 נק׳ - Error handling: try/catch או טיפול כשל ברור בלי להסתיר שגיאות.
- 15 נק׳ - חיבור ל-client והודעה מובנת: התגובה חוזרת JSON ברור שהממשק יודע להציג.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 18 - עותק של מבחן טיסות.docx / Q2.main

> שאלה 2- כתבו פונקציה בJS אשר מקבלת מטריצה של מספרים. הפונקציה צריכה להחזיר מערך של אובייקטים אשר כל אובייקט מייצג את המספר עצמו וכמה פעמים הוא מופיע במערך. יש לזרוק שגיאה במידה ואחד הערכים במטריצה אינו מספר. דוגמא: התקבלה המטריצה 1,1,2,4,1,1,7 1,1,1,2,1,1,7 7,7,1,1,1,1,1 הפונקציה תחזיר במקרה זה - [{num:1,count:14},{num:2,counter:2},{num:4,counter:1},{num:7,counter:4}]

- סטטוס: ready
- ענפים: backend_api_routes, js_problem_solving
- משימות מקור: alerts_error_handling, js_algorithms

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.
  - `src/utils/algorithms.js` - הקובץ שבו כותבים פונקציות JS טהורות.
  - `src/utils/algorithms.test.js` - בדיקות קלט תקין, קלט לא תקין ו-edge cases.

**תתי־משימות טכניות:**
- 1. `server/routes/items.routes.js` - לעטוף פעולות ב-try/catch
- 2. `server/routes/items.routes.js` - להחזיר/להציג הודעת שגיאה
- 3. `server/routes/items.routes.js` - לא להסתיר כשלונות
- 4. `server/routes/items.routes.js` - לזהות קלט/פלט
- 5. `server/routes/items.routes.js` - לממש אלגוריתם
- 6. `server/routes/items.routes.js` - להחזיר מבנה נתונים מדויק

**רובריקת 100 פנימית:**
- 25 נק׳ - בדיקת קלט ו-Error לפי דרישה: הפונקציה דוחה קלט לא תקין בצורה מפורשת.
- 35 נק׳ - אלגוריתם נכון לכל מקרי הבסיס: הלוגיקה מחזירה את הערך הנכון בלי mutation לא נדרש.
- 20 נק׳ - Edge cases: נבדקים מערך ריק, טיפוסים לא נכונים וערכים גבוליים.
- 20 נק׳ - פלט נקי והסבר קצר: הקוד קריא והסטודנט יודע להסביר כל שורה מרכזית.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 19 - עותק של מבחן טיסות.docx / Q3.1

> 1. GET – מחזיר JSON עם כל הסטודנטים

- סטטוס: ready
- ענפים: backend_api_routes
- משימות מקור: api_get_all

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.

**תתי־משימות טכניות:**
- 1. `server/routes/items.routes.js` - להגדיר route GET
- 2. `server/routes/items.routes.js` - למשוך נתונים מהאחסון
- 3. `server/routes/items.routes.js` - להחזיר JSON + status 200

**רובריקת 100 פנימית:**
- 25 נק׳ - Route/method/status code נכונים: ה-endpoint מתאים לדרישה ומחזיר 200/201/400/404/500 לפי מצב.
- 20 נק׳ - Validation של body/query/params: אין כניסה לא תקינה שממשיכה לפעולת DB או response שגוי.
- 25 נק׳ - פעולת data/DB נכונה: find/create/update/delete או persistence מתבצעים במקום הנכון.
- 15 נק׳ - Error handling: try/catch או טיפול כשל ברור בלי להסתיר שגיאות.
- 15 נק׳ - חיבור ל-client והודעה מובנת: התגובה חוזרת JSON ברור שהממשק יודע להציג.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 20 - עותק של מבחן טיסות.docx / Q3.2

> 2. GET – מחזיר JSON רק עם הסטודנטים שהממוצע שלהם גבוה מ74

- סטטוס: ready
- ענפים: backend_api_routes
- משימות מקור: api_get_all, api_get_filtered

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.

**תתי־משימות טכניות:**
- 1. `server/routes/items.routes.js` - להגדיר route GET
- 2. `server/routes/items.routes.js` - למשוך נתונים מהאחסון
- 3. `server/routes/items.routes.js` - להחזיר JSON + status 200
- 4. `server/routes/items.routes.js` - לקבל פרמטר/ערך סינון
- 5. `server/routes/items.routes.js` - לסנן נתונים ללא mutation
- 6. `server/routes/items.routes.js` - להחזיר תוצאה ריקה/תקינה

**רובריקת 100 פנימית:**
- 25 נק׳ - Route/method/status code נכונים: ה-endpoint מתאים לדרישה ומחזיר 200/201/400/404/500 לפי מצב.
- 20 נק׳ - Validation של body/query/params: אין כניסה לא תקינה שממשיכה לפעולת DB או response שגוי.
- 25 נק׳ - פעולת data/DB נכונה: find/create/update/delete או persistence מתבצעים במקום הנכון.
- 15 נק׳ - Error handling: try/catch או טיפול כשל ברור בלי להסתיר שגיאות.
- 15 נק׳ - חיבור ל-client והודעה מובנת: התגובה חוזרת JSON ברור שהממשק יודע להציג.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 21 - עותק של מבחן טיסות.docx / Q3.3

> 3. POST – מקבל פרטים של סטודנט, במידה והנתונים תקינים ולא קיים סטודנט עם אותו ID המתודה תיצור סטודנט חדש ותחזיר הודעה שהתקבל בהצלחה, אחרת תחזיר ERROR

- סטטוס: ready
- ענפים: backend_api_routes, data_persistence, node_oop
- משימות מקור: api_post_create, db_uniqueness, alerts_error_handling, oop_design

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.
  - `server/config/db.js` - חיבור Mongoose עם MONGO_URI מהסביבה.
  - `src/models/Product.js` - Class, constructor ומתודות.
  - `src/models/Product.test.js` - בדיקות ל-constructor, this ומתודות.

**תתי־משימות טכניות:**
- 1. `server/routes/items.routes.js` - לקרוא req.body
- 2. `server/routes/items.routes.js` - לבצע ולידציה
- 3. `server/routes/items.routes.js` - להחזיר 201 או שגיאה מתאימה
- 4. `server/routes/items.routes.js` - להגדיר שדה מזהה
- 5. `server/routes/items.routes.js` - לבדוק כפילות לפני insert
- 6. `server/routes/items.routes.js` - להחזיר הודעה במקרה כפילות
- 7. `server/routes/items.routes.js` - לעטוף פעולות ב-try/catch
- 8. `server/routes/items.routes.js` - להחזיר/להציג הודעת שגיאה
- 9. `server/routes/items.routes.js` - לא להסתיר כשלונות
- 10. `server/routes/items.routes.js` - להגדיר class
- 11. `server/routes/items.routes.js` - לממש constructor
- 12. `server/routes/items.routes.js` - לכתוב methods לפי דרישה

**רובריקת 100 פנימית:**
- 25 נק׳ - Route/method/status code נכונים: ה-endpoint מתאים לדרישה ומחזיר 200/201/400/404/500 לפי מצב.
- 20 נק׳ - Validation של body/query/params: אין כניסה לא תקינה שממשיכה לפעולת DB או response שגוי.
- 25 נק׳ - פעולת data/DB נכונה: find/create/update/delete או persistence מתבצעים במקום הנכון.
- 15 נק׳ - Error handling: try/catch או טיפול כשל ברור בלי להסתיר שגיאות.
- 15 נק׳ - חיבור ל-client והודעה מובנת: התגובה חוזרת JSON ברור שהממשק יודע להציג.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 22 - עותק של מבחן טיסות.docx / Q3.4

> 4. PUT – מקבל ת"ז וממוצע ציונים חדש, במידה והסטודנט קיים הוא מעדכן לו את הממוצע ומחזיר תשובה שהעדכון עבר בהצלחה אחרת מחזיר ERROR.

- סטטוס: ready
- ענפים: backend_api_routes
- משימות מקור: api_put_update, alerts_error_handling

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.

**תתי־משימות טכניות:**
- 1. `server/routes/items.routes.js` - לאתר רשומה לפי מזהה
- 2. `server/routes/items.routes.js` - לעדכן שדות מותרים
- 3. `server/routes/items.routes.js` - להחזיר 200/404
- 4. `server/routes/items.routes.js` - לעטוף פעולות ב-try/catch
- 5. `server/routes/items.routes.js` - להחזיר/להציג הודעת שגיאה
- 6. `server/routes/items.routes.js` - לא להסתיר כשלונות

**רובריקת 100 פנימית:**
- 25 נק׳ - Route/method/status code נכונים: ה-endpoint מתאים לדרישה ומחזיר 200/201/400/404/500 לפי מצב.
- 20 נק׳ - Validation של body/query/params: אין כניסה לא תקינה שממשיכה לפעולת DB או response שגוי.
- 25 נק׳ - פעולת data/DB נכונה: find/create/update/delete או persistence מתבצעים במקום הנכון.
- 15 נק׳ - Error handling: try/catch או טיפול כשל ברור בלי להסתיר שגיאות.
- 15 נק׳ - חיבור ל-client והודעה מובנת: התגובה חוזרת JSON ברור שהממשק יודע להציג.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 23 - עותק של מבחן מועד א פולסטאק (1).pdf / Q2.א

> א. סדרה .)חשבונית ( ההפרש בין כל שני איברים עוקבים הוא מספר קבוע .)ב. סדרה הנדסית (כך שהיחס בין כל שני איברים סמוכים הוא קבוע

- סטטוס: ready
- ענפים: frontend_ui_validation, js_problem_solving
- משימות מקור: client_validation_rules, js_algorithms

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `src/App.jsx` - מחבר routes, state ראשי וקומפוננטות המסלול.
  - `src/components/ExamForm.jsx` - הקובץ שבו בונים את הטופס, ה-inputs וה-submit.
  - `src/utils/validation.js` - פונקציות validation טהורות שחוזרות עם errors לפי שדה.
  - `src/services/api.js` - קריאות fetch לשרת אחרי validation תקין.
  - `src/utils/algorithms.js` - הקובץ שבו כותבים פונקציות JS טהורות.
  - `src/utils/algorithms.test.js` - בדיקות קלט תקין, קלט לא תקין ו-edge cases.

**תתי־משימות טכניות:**
- 1. `src/components/ExamForm.jsx` - לכתוב חוקי regex/טווח
- 2. `src/components/ExamForm.jsx` - לחסום שליחה לא תקינה
- 3. `src/components/ExamForm.jsx` - להציג שגיאה ברורה למשתמש
- 4. `src/components/ExamForm.jsx` - לזהות קלט/פלט
- 5. `src/components/ExamForm.jsx` - לממש אלגוריתם
- 6. `src/components/ExamForm.jsx` - להחזיר מבנה נתונים מדויק

**רובריקת 100 פנימית:**
- 25 נק׳ - בדיקת קלט ו-Error לפי דרישה: הפונקציה דוחה קלט לא תקין בצורה מפורשת.
- 35 נק׳ - אלגוריתם נכון לכל מקרי הבסיס: הלוגיקה מחזירה את הערך הנכון בלי mutation לא נדרש.
- 20 נק׳ - Edge cases: נבדקים מערך ריק, טיפוסים לא נכונים וערכים גבוליים.
- 20 נק׳ - פלט נקי והסבר קצר: הקוד קריא והסטודנט יודע להסביר כל שורה מרכזית.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 24 - עותק של מבחן מועד א פולסטאק (1).pdf / Q2.ג

> ג. סדרת פיבונאצי (כל איבר הינו סכום2 .)האיברים שבאים לפניו .ד. כל סדרה אחרת סדרה חשבונית תחזיר– A סדרה הנדסית תחזיר– B סדרת פיבונאצי תחזיר– C כל סדרה אחרת תחזיר– D ** במידה ואחד הערכים בסדרה אינו מספר או במידה והפונקציה קיבלה ערך שאינו מערך היא תזרוק שגיאה מתאימה. *את הפונקציה יש להכניס ל״חבילה חדשה״ בnode.js . .ולייצא אותה

- סטטוס: ready
- ענפים: backend_api_routes, js_problem_solving, node_oop
- משימות מקור: alerts_error_handling, js_algorithms, node_file_io

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.
  - `src/utils/algorithms.js` - הקובץ שבו כותבים פונקציות JS טהורות.
  - `src/utils/algorithms.test.js` - בדיקות קלט תקין, קלט לא תקין ו-edge cases.
  - `server/services/fileStore.js` - קריאה/כתיבה לקבצים עם fs/promises.
  - `server/routes/files.routes.js` - Route שמפעיל את service ומחזיר status מתאים.

**תתי־משימות טכניות:**
- 1. `server/routes/items.routes.js` - לעטוף פעולות ב-try/catch
- 2. `server/routes/items.routes.js` - להחזיר/להציג הודעת שגיאה
- 3. `server/routes/items.routes.js` - לא להסתיר כשלונות
- 4. `server/routes/items.routes.js` - לזהות קלט/פלט
- 5. `server/routes/items.routes.js` - לממש אלגוריתם
- 6. `server/routes/items.routes.js` - להחזיר מבנה נתונים מדויק
- 7. `server/routes/items.routes.js` - ליצור קובץ
- 8. `server/routes/items.routes.js` - לכתוב/לקרוא תוכן
- 9. `server/routes/items.routes.js` - לטפל בשגיאות fs

**רובריקת 100 פנימית:**
- 25 נק׳ - בדיקת קלט ו-Error לפי דרישה: הפונקציה דוחה קלט לא תקין בצורה מפורשת.
- 35 נק׳ - אלגוריתם נכון לכל מקרי הבסיס: הלוגיקה מחזירה את הערך הנכון בלי mutation לא נדרש.
- 20 נק׳ - Edge cases: נבדקים מערך ריק, טיפוסים לא נכונים וערכים גבוליים.
- 20 נק׳ - פלט נקי והסבר קצר: הקוד קריא והסטודנט יודע להסביר כל שורה מרכזית.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 25 - עותק של מבחן מועד א פולסטאק (1).pdf / Q3.א

> א . יש להסביר במילים שלך, מה ההבדל ביןPOST GET PUT DELETE

- סטטוס: ready
- ענפים: backend_api_routes, theory
- משימות מקור: api_get_all, api_put_update, api_delete, theory_explanation

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.
  - `docs/exam-answer.md` - תשובה מילולית במבנה מה/למה/דוגמה/טעות.
  - `README.md` - סיכום החלטות ורשימת קבצים רלוונטיים לתרגיל.

**תתי־משימות טכניות:**
- 1. `server/routes/items.routes.js` - להגדיר route GET
- 2. `server/routes/items.routes.js` - למשוך נתונים מהאחסון
- 3. `server/routes/items.routes.js` - להחזיר JSON + status 200
- 4. `server/routes/items.routes.js` - לאתר רשומה לפי מזהה
- 5. `server/routes/items.routes.js` - לעדכן שדות מותרים
- 6. `server/routes/items.routes.js` - להחזיר 200/404
- 7. `server/routes/items.routes.js` - לאתר רשומה למחיקה
- 8. `server/routes/items.routes.js` - למחוק בפועל
- 9. `server/routes/items.routes.js` - להחזיר הודעת הצלחה/שגיאה
- 10. `server/routes/items.routes.js` - להגדיר מושגים נכונים
- 11. `server/routes/items.routes.js` - לתת דוגמאה קצרה
- 12. `server/routes/items.routes.js` - להשוות יתרונות/חסרונות

**רובריקת 100 פנימית:**
- 25 נק׳ - Route/method/status code נכונים: ה-endpoint מתאים לדרישה ומחזיר 200/201/400/404/500 לפי מצב.
- 20 נק׳ - Validation של body/query/params: אין כניסה לא תקינה שממשיכה לפעולת DB או response שגוי.
- 25 נק׳ - פעולת data/DB נכונה: find/create/update/delete או persistence מתבצעים במקום הנכון.
- 15 נק׳ - Error handling: try/catch או טיפול כשל ברור בלי להסתיר שגיאות.
- 15 נק׳ - חיבור ל-client והודעה מובנת: התגובה חוזרת JSON ברור שהממשק יודע להציג.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 26 - עותק של מבחן מועד א פולסטאק (1).pdf / Q3.ב

> ב. יש לציין3 יתרונות ו2 חסרונות בשימוש בMongoDB על פני מאגרי מידע .אחרים

- סטטוס: ready
- ענפים: data_persistence, theory
- משימות מקור: db_persistence, theory_explanation

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `server/config/db.js` - חיבור Mongoose עם MONGO_URI מהסביבה.
  - `server/models/Item.js` - Schema, required fields, unique indexes ו-model.
  - `server/routes/items.routes.js` - Routes שמשתמשים ב-model במקום מידע זמני.
  - `docs/exam-answer.md` - תשובה מילולית במבנה מה/למה/דוגמה/טעות.
  - `README.md` - סיכום החלטות ורשימת קבצים רלוונטיים לתרגיל.

**תתי־משימות טכניות:**
- 1. `server/models/Item.js` - להתחבר ל-DB
- 2. `server/models/Item.js` - לבצע CRUD
- 3. `server/models/Item.js` - לנהל שגיאות DB
- 4. `server/models/Item.js` - להגדיר מושגים נכונים
- 5. `server/models/Item.js` - לתת דוגמאה קצרה
- 6. `server/models/Item.js` - להשוות יתרונות/חסרונות

**רובריקת 100 פנימית:**
- 25 נק׳ - Route/method/status code נכונים: ה-endpoint מתאים לדרישה ומחזיר 200/201/400/404/500 לפי מצב.
- 20 נק׳ - Validation של body/query/params: אין כניסה לא תקינה שממשיכה לפעולת DB או response שגוי.
- 25 נק׳ - פעולת data/DB נכונה: find/create/update/delete או persistence מתבצעים במקום הנכון.
- 15 נק׳ - Error handling: try/catch או טיפול כשל ברור בלי להסתיר שגיאות.
- 15 נק׳ - חיבור ל-client והודעה מובנת: התגובה חוזרת JSON ברור שהממשק יודע להציג.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 27 - עותק של מבחן מועד א פולסטאק (1).pdf / Q3.ג

> ג . אתם מגיעים לחברה חדשה, המראיין שואל אותכם מדוע שאבחר להשתמש דווקא בריאקט ולא להמשיך להשתמש בCSS JS HTML ? יש לציין לפחות3 .יתרונות של ריאקט וחסרון אחד

- סטטוס: ready
- ענפים: theory
- משימות מקור: theory_explanation

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `docs/exam-answer.md` - תשובה מילולית במבנה מה/למה/דוגמה/טעות.
  - `README.md` - סיכום החלטות ורשימת קבצים רלוונטיים לתרגיל.

**תתי־משימות טכניות:**
- 1. `docs/exam-answer.md` - להגדיר מושגים נכונים
- 2. `docs/exam-answer.md` - לתת דוגמאה קצרה
- 3. `docs/exam-answer.md` - להשוות יתרונות/חסרונות

**רובריקת 100 פנימית:**
- 25 נק׳ - הבנת הדרישה המדויקת: מזהים מה הסעיף דורש ולא מוסיפים scope לא קיים.
- 25 נק׳ - יישום כל תתי-המשימות: כל micro_task מסומן ומופיע בקובץ יעד.
- 20 נק׳ - בדיקות ו-edge cases: נבדקים מקרה תקין, מקרה חסר ומקרה שגוי.
- 15 נק׳ - עץ קבצים נכון: הקוד נמצא בקובץ שבו הוא אמור להיות במבחן.
- 15 נק׳ - הסבר עברי נקי: אפשר להסביר מה כל חלק עושה ולמה.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 28 - עותק של מבחן מועד א פולסטאק (1).pdf / Q3.ד

> ד. מה ההבדל ביןfunction לarrow function

- סטטוס: ready
- ענפים: theory
- משימות מקור: theory_explanation

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `docs/exam-answer.md` - תשובה מילולית במבנה מה/למה/דוגמה/טעות.
  - `README.md` - סיכום החלטות ורשימת קבצים רלוונטיים לתרגיל.

**תתי־משימות טכניות:**
- 1. `docs/exam-answer.md` - להגדיר מושגים נכונים
- 2. `docs/exam-answer.md` - לתת דוגמאה קצרה
- 3. `docs/exam-answer.md` - להשוות יתרונות/חסרונות

**רובריקת 100 פנימית:**
- 25 נק׳ - הבנת הדרישה המדויקת: מזהים מה הסעיף דורש ולא מוסיפים scope לא קיים.
- 25 נק׳ - יישום כל תתי-המשימות: כל micro_task מסומן ומופיע בקובץ יעד.
- 20 נק׳ - בדיקות ו-edge cases: נבדקים מקרה תקין, מקרה חסר ומקרה שגוי.
- 15 נק׳ - עץ קבצים נכון: הקוד נמצא בקובץ שבו הוא אמור להיות במבחן.
- 15 נק׳ - הסבר עברי נקי: אפשר להסביר מה כל חלק עושה ולמה.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 29 - עותק של מבחן מועד א פולסטאק (1).pdf / Q3.ה

> ה. ?הסבר במילים מה הפונקציה עושה const func = (num) => { if(num === 1 ) { return 1; } else { return (num * func(num-1)); } }

- סטטוס: ready
- ענפים: theory
- משימות מקור: theory_explanation

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `docs/exam-answer.md` - תשובה מילולית במבנה מה/למה/דוגמה/טעות.
  - `README.md` - סיכום החלטות ורשימת קבצים רלוונטיים לתרגיל.

**תתי־משימות טכניות:**
- 1. `docs/exam-answer.md` - להגדיר מושגים נכונים
- 2. `docs/exam-answer.md` - לתת דוגמאה קצרה
- 3. `docs/exam-answer.md` - להשוות יתרונות/חסרונות

**רובריקת 100 פנימית:**
- 25 נק׳ - הבנת הדרישה המדויקת: מזהים מה הסעיף דורש ולא מוסיפים scope לא קיים.
- 25 נק׳ - יישום כל תתי-המשימות: כל micro_task מסומן ומופיע בקובץ יעד.
- 20 נק׳ - בדיקות ו-edge cases: נבדקים מקרה תקין, מקרה חסר ומקרה שגוי.
- 15 נק׳ - עץ קבצים נכון: הקוד נמצא בקובץ שבו הוא אמור להיות במבחן.
- 15 נק׳ - הסבר עברי נקי: אפשר להסביר מה כל חלק עושה ולמה.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 30 - עותק של מבחן מועד ב פולסטאק.docx / Q2.main

> שאלה 2: יש לכתוב פונקציה ב JS אשר מקבלת מספר בודד וממיינת את הספרות שלו מהקטן לגדול. לדוגמא : הפונקציה קיבלה 642531, הפונקציה החזירה 123456 * אסור להשתמש בפעולת sort()

- סטטוס: ready
- ענפים: backend_api_routes, js_problem_solving
- משימות מקור: api_get_filtered, js_algorithms

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.
  - `src/utils/algorithms.js` - הקובץ שבו כותבים פונקציות JS טהורות.
  - `src/utils/algorithms.test.js` - בדיקות קלט תקין, קלט לא תקין ו-edge cases.

**תתי־משימות טכניות:**
- 1. `server/routes/items.routes.js` - לקבל פרמטר/ערך סינון
- 2. `server/routes/items.routes.js` - לסנן נתונים ללא mutation
- 3. `server/routes/items.routes.js` - להחזיר תוצאה ריקה/תקינה
- 4. `server/routes/items.routes.js` - לזהות קלט/פלט
- 5. `server/routes/items.routes.js` - לממש אלגוריתם
- 6. `server/routes/items.routes.js` - להחזיר מבנה נתונים מדויק

**רובריקת 100 פנימית:**
- 25 נק׳ - בדיקת קלט ו-Error לפי דרישה: הפונקציה דוחה קלט לא תקין בצורה מפורשת.
- 35 נק׳ - אלגוריתם נכון לכל מקרי הבסיס: הלוגיקה מחזירה את הערך הנכון בלי mutation לא נדרש.
- 20 נק׳ - Edge cases: נבדקים מערך ריק, טיפוסים לא נכונים וערכים גבוליים.
- 20 נק׳ - פלט נקי והסבר קצר: הקוד קריא והסטודנט יודע להסביר כל שורה מרכזית.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 31 - עותק של מבחן מועד ב פולסטאק.docx / Q3.main

> שאלה 3: יש ליצור שרת Express שמקבל מידע מעמוד HTML ושומר אותו בקובץ נפרד. המערכת בנויה מעמוד HTML שנראה כך העמוד מכיל כותרת, תיבת טקסט (עם הגבלה ל10 תווים) וכפתור לחיצה על הכפתור תוודא שיש טקסט בתוך תיבת הטקסט. במידה ויש היא תעביר אותו לשרת. תפקידו של השרת לקבל את המידע מהעמוד הסטטי באמצעות POST ולהוסיף אותו לקובץ טקסט חדש שישמר על המחשב. את המלל יש להוסיף לקובץ ולא לדרוס את החומר הישן.

- סטטוס: ready
- ענפים: frontend_ui_validation, backend_api_routes, node_oop
- משימות מקור: api_post_create, server_html_route, client_form_inputs, client_validation_rules, node_file_io

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.
  - `src/App.jsx` - מחבר routes, state ראשי וקומפוננטות המסלול.
  - `src/components/ExamForm.jsx` - הקובץ שבו בונים את הטופס, ה-inputs וה-submit.
  - `src/utils/validation.js` - פונקציות validation טהורות שחוזרות עם errors לפי שדה.
  - `src/services/api.js` - קריאות fetch לשרת אחרי validation תקין.
  - `server/services/fileStore.js` - קריאה/כתיבה לקבצים עם fs/promises.
  - `server/routes/files.routes.js` - Route שמפעיל את service ומחזיר status מתאים.

**תתי־משימות טכניות:**
- 1. `server/routes/items.routes.js` - לקרוא req.body
- 2. `server/routes/items.routes.js` - לבצע ולידציה
- 3. `server/routes/items.routes.js` - להחזיר 201 או שגיאה מתאימה
- 4. `server/routes/items.routes.js` - להגדיר route שמחזיר HTML
- 5. `server/routes/items.routes.js` - לשרת קבצים סטטיים
- 6. `server/routes/items.routes.js` - למפות URL נכון
- 7. `server/routes/items.routes.js` - לבנות controlled inputs
- 8. `server/routes/items.routes.js` - להגדיר select/options
- 9. `server/routes/items.routes.js` - לחבר submit button
- 10. `server/routes/items.routes.js` - לכתוב חוקי regex/טווח
- 11. `server/routes/items.routes.js` - לחסום שליחה לא תקינה
- 12. `server/routes/items.routes.js` - להציג שגיאה ברורה למשתמש
- 13. `server/routes/items.routes.js` - ליצור קובץ
- 14. `server/routes/items.routes.js` - לכתוב/לקרוא תוכן
- 15. `server/routes/items.routes.js` - לטפל בשגיאות fs

**רובריקת 100 פנימית:**
- 25 נק׳ - Route/method/status code נכונים: ה-endpoint מתאים לדרישה ומחזיר 200/201/400/404/500 לפי מצב.
- 20 נק׳ - Validation של body/query/params: אין כניסה לא תקינה שממשיכה לפעולת DB או response שגוי.
- 25 נק׳ - פעולת data/DB נכונה: find/create/update/delete או persistence מתבצעים במקום הנכון.
- 15 נק׳ - Error handling: try/catch או טיפול כשל ברור בלי להסתיר שגיאות.
- 15 נק׳ - חיבור ל-client והודעה מובנת: התגובה חוזרת JSON ברור שהממשק יודע להציג.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 32 - עותק של מבחן מחסן לוגיסטי.docx / Q1.main

> שאלה 1 – 75 נקודות.

- סטטוס: ready
- ענפים: frontend_ui_validation, backend_api_routes, data_persistence, js_problem_solving, scope_meta
- משימות מקור: question_scope_inherited, alerts_error_handling, api_get_filtered, api_post_create, client_form_inputs, client_list_render, client_navigation, client_validation_rules, db_uniqueness, js_algorithms, server_html_route

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `docs/exam-answer.md` - תשובה מילולית במבנה מה/למה/דוגמה/טעות.
  - `README.md` - סיכום החלטות ורשימת קבצים רלוונטיים לתרגיל.
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.
  - `src/App.jsx` - מחבר routes, state ראשי וקומפוננטות המסלול.
  - `src/components/ExamForm.jsx` - הקובץ שבו בונים את הטופס, ה-inputs וה-submit.
  - `src/utils/validation.js` - פונקציות validation טהורות שחוזרות עם errors לפי שדה.
  - `src/services/api.js` - קריאות fetch לשרת אחרי validation תקין.
  - `src/components/ItemsList.jsx` - הקובץ שבו כותבים map, filter ו-key יציב.
  - `src/components/SearchBox.jsx` - שדה חיפוש נשלט שמעדכן query.
  - `src/pages/AddItemPage.jsx` - הקובץ שבו מבצעים create ואז navigate.
  - `server/config/db.js` - חיבור Mongoose עם MONGO_URI מהסביבה.
  - `src/utils/algorithms.js` - הקובץ שבו כותבים פונקציות JS טהורות.
  - `src/utils/algorithms.test.js` - בדיקות קלט תקין, קלט לא תקין ו-edge cases.

**תתי־משימות טכניות:**
- 1. `docs/exam-answer.md` - זה סעיף כותרת/מעטפת
- 2. `docs/exam-answer.md` - להחיל את כל משימות תתי-הסעיפים של אותה שאלה
- 3. `docs/exam-answer.md` - לבנות תוכנית עבודה לפי תתי-הסעיפים בפועל
- 4. `docs/exam-answer.md` - לעטוף פעולות ב-try/catch
- 5. `docs/exam-answer.md` - להחזיר/להציג הודעת שגיאה
- 6. `docs/exam-answer.md` - לא להסתיר כשלונות
- 7. `docs/exam-answer.md` - לקבל פרמטר/ערך סינון
- 8. `docs/exam-answer.md` - לסנן נתונים ללא mutation
- 9. `docs/exam-answer.md` - להחזיר תוצאה ריקה/תקינה
- 10. `docs/exam-answer.md` - לקרוא req.body
- 11. `docs/exam-answer.md` - לבצע ולידציה
- 12. `docs/exam-answer.md` - להחזיר 201 או שגיאה מתאימה
- 13. `docs/exam-answer.md` - לבנות controlled inputs
- 14. `docs/exam-answer.md` - להגדיר select/options
- 15. `docs/exam-answer.md` - לחבר submit button
- 16. `docs/exam-answer.md` - למפות מערך לרכיבים
- 17. `docs/exam-answer.md` - להציג שדות נדרשים
- 18. `docs/exam-answer.md` - למיין תצוגה לפי כלל
- 19. `docs/exam-answer.md` - להגדיר routes במסך
- 20. `docs/exam-answer.md` - לבצע redirect לאחר פעולה
- 21. `docs/exam-answer.md` - לשמור UX עקבי
- 22. `docs/exam-answer.md` - לכתוב חוקי regex/טווח
- 23. `docs/exam-answer.md` - לחסום שליחה לא תקינה
- 24. `docs/exam-answer.md` - להציג שגיאה ברורה למשתמש
- 25. `docs/exam-answer.md` - להגדיר שדה מזהה
- 26. `docs/exam-answer.md` - לבדוק כפילות לפני insert
- 27. `docs/exam-answer.md` - להחזיר הודעה במקרה כפילות
- 28. `docs/exam-answer.md` - לזהות קלט/פלט
- 29. `docs/exam-answer.md` - לממש אלגוריתם
- 30. `docs/exam-answer.md` - להחזיר מבנה נתונים מדויק
- 31. `docs/exam-answer.md` - להגדיר route שמחזיר HTML
- 32. `docs/exam-answer.md` - לשרת קבצים סטטיים
- 33. `docs/exam-answer.md` - למפות URL נכון

**רובריקת 100 פנימית:**
- 25 נק׳ - בדיקת קלט ו-Error לפי דרישה: הפונקציה דוחה קלט לא תקין בצורה מפורשת.
- 35 נק׳ - אלגוריתם נכון לכל מקרי הבסיס: הלוגיקה מחזירה את הערך הנכון בלי mutation לא נדרש.
- 20 נק׳ - Edge cases: נבדקים מערך ריק, טיפוסים לא נכונים וערכים גבוליים.
- 20 נק׳ - פלט נקי והסבר קצר: הקוד קריא והסטודנט יודע להסביר כל שורה מרכזית.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 33 - עותק של מבחן מחסן לוגיסטי.docx / Q2.main

> שאלה 2 - 25 נקודות 😊 SVCOLLEGEבהצלחה

- סטטוס: manual_review
- ענפים: scope_meta
- משימות מקור: manual_review

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `docs/source-review.md` - סעיף שמחייב עיון ידני במקור לפני ציון אוטומטי.
  - `README.md` - תיעוד החלטת עיון ידני, מקור הסעיף ומה חסר לפירוק טכני.

**תתי־משימות טכניות:**
- 1. `docs/source-review.md` - עיון ידני במקור

**רובריקת 100 פנימית:**
- 100 נק׳ - עיון ידני במקור לפני ציון: הסעיף סומן manual_review ולכן אין ציון אוטומטי עד פירוק טכני מלא.

**איך לקבל 100:**
- לפתוח את המקור המדויק ולחלץ דרישה טכנית מלאה.
- לא לתת ציון אוטומטי עד שיש קלט, פלט, קובץ יעד ו-Gate מעבר.

**מעבר ל-100:**
- להוסיף evidence מהמקור אחרי עיון ידני.

### סעיף 34 - עותק של מבחן מחסן לוגיסטי.docx / Q1.1

> 1. מחלקת עובד: מאפייני העובד:

- סטטוס: ready
- ענפים: frontend_ui_validation, backend_api_routes, data_persistence, js_problem_solving, scope_meta
- משימות מקור: question_scope_inherited, alerts_error_handling, api_get_filtered, api_post_create, client_form_inputs, client_list_render, client_navigation, client_validation_rules, db_uniqueness, js_algorithms, server_html_route

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `docs/exam-answer.md` - תשובה מילולית במבנה מה/למה/דוגמה/טעות.
  - `README.md` - סיכום החלטות ורשימת קבצים רלוונטיים לתרגיל.
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.
  - `src/App.jsx` - מחבר routes, state ראשי וקומפוננטות המסלול.
  - `src/components/ExamForm.jsx` - הקובץ שבו בונים את הטופס, ה-inputs וה-submit.
  - `src/utils/validation.js` - פונקציות validation טהורות שחוזרות עם errors לפי שדה.
  - `src/services/api.js` - קריאות fetch לשרת אחרי validation תקין.
  - `src/components/ItemsList.jsx` - הקובץ שבו כותבים map, filter ו-key יציב.
  - `src/components/SearchBox.jsx` - שדה חיפוש נשלט שמעדכן query.
  - `src/pages/AddItemPage.jsx` - הקובץ שבו מבצעים create ואז navigate.
  - `server/config/db.js` - חיבור Mongoose עם MONGO_URI מהסביבה.
  - `src/utils/algorithms.js` - הקובץ שבו כותבים פונקציות JS טהורות.
  - `src/utils/algorithms.test.js` - בדיקות קלט תקין, קלט לא תקין ו-edge cases.

**תתי־משימות טכניות:**
- 1. `docs/exam-answer.md` - זה סעיף כותרת/מעטפת
- 2. `docs/exam-answer.md` - להחיל את כל משימות תתי-הסעיפים של אותה שאלה
- 3. `docs/exam-answer.md` - לבנות תוכנית עבודה לפי תתי-הסעיפים בפועל
- 4. `docs/exam-answer.md` - לעטוף פעולות ב-try/catch
- 5. `docs/exam-answer.md` - להחזיר/להציג הודעת שגיאה
- 6. `docs/exam-answer.md` - לא להסתיר כשלונות
- 7. `docs/exam-answer.md` - לקבל פרמטר/ערך סינון
- 8. `docs/exam-answer.md` - לסנן נתונים ללא mutation
- 9. `docs/exam-answer.md` - להחזיר תוצאה ריקה/תקינה
- 10. `docs/exam-answer.md` - לקרוא req.body
- 11. `docs/exam-answer.md` - לבצע ולידציה
- 12. `docs/exam-answer.md` - להחזיר 201 או שגיאה מתאימה
- 13. `docs/exam-answer.md` - לבנות controlled inputs
- 14. `docs/exam-answer.md` - להגדיר select/options
- 15. `docs/exam-answer.md` - לחבר submit button
- 16. `docs/exam-answer.md` - למפות מערך לרכיבים
- 17. `docs/exam-answer.md` - להציג שדות נדרשים
- 18. `docs/exam-answer.md` - למיין תצוגה לפי כלל
- 19. `docs/exam-answer.md` - להגדיר routes במסך
- 20. `docs/exam-answer.md` - לבצע redirect לאחר פעולה
- 21. `docs/exam-answer.md` - לשמור UX עקבי
- 22. `docs/exam-answer.md` - לכתוב חוקי regex/טווח
- 23. `docs/exam-answer.md` - לחסום שליחה לא תקינה
- 24. `docs/exam-answer.md` - להציג שגיאה ברורה למשתמש
- 25. `docs/exam-answer.md` - להגדיר שדה מזהה
- 26. `docs/exam-answer.md` - לבדוק כפילות לפני insert
- 27. `docs/exam-answer.md` - להחזיר הודעה במקרה כפילות
- 28. `docs/exam-answer.md` - לזהות קלט/פלט
- 29. `docs/exam-answer.md` - לממש אלגוריתם
- 30. `docs/exam-answer.md` - להחזיר מבנה נתונים מדויק
- 31. `docs/exam-answer.md` - להגדיר route שמחזיר HTML
- 32. `docs/exam-answer.md` - לשרת קבצים סטטיים
- 33. `docs/exam-answer.md` - למפות URL נכון

**רובריקת 100 פנימית:**
- 25 נק׳ - בדיקת קלט ו-Error לפי דרישה: הפונקציה דוחה קלט לא תקין בצורה מפורשת.
- 35 נק׳ - אלגוריתם נכון לכל מקרי הבסיס: הלוגיקה מחזירה את הערך הנכון בלי mutation לא נדרש.
- 20 נק׳ - Edge cases: נבדקים מערך ריק, טיפוסים לא נכונים וערכים גבוליים.
- 20 נק׳ - פלט נקי והסבר קצר: הקוד קריא והסטודנט יודע להסביר כל שורה מרכזית.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 35 - עותק של מבחן מחסן לוגיסטי.docx / Q1.1

> 1. מספר עובד (חד-חד ערכי). מספר בעל 5 ספרות.

- סטטוס: ready
- ענפים: data_persistence
- משימות מקור: db_uniqueness

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `server/config/db.js` - חיבור Mongoose עם MONGO_URI מהסביבה.
  - `server/models/Item.js` - Schema, required fields, unique indexes ו-model.
  - `server/routes/items.routes.js` - Routes שמשתמשים ב-model במקום מידע זמני.

**תתי־משימות טכניות:**
- 1. `server/models/Item.js` - להגדיר שדה מזהה
- 2. `server/models/Item.js` - לבדוק כפילות לפני insert
- 3. `server/models/Item.js` - להחזיר הודעה במקרה כפילות

**רובריקת 100 פנימית:**
- 25 נק׳ - Route/method/status code נכונים: ה-endpoint מתאים לדרישה ומחזיר 200/201/400/404/500 לפי מצב.
- 20 נק׳ - Validation של body/query/params: אין כניסה לא תקינה שממשיכה לפעולת DB או response שגוי.
- 25 נק׳ - פעולת data/DB נכונה: find/create/update/delete או persistence מתבצעים במקום הנכון.
- 15 נק׳ - Error handling: try/catch או טיפול כשל ברור בלי להסתיר שגיאות.
- 15 נק׳ - חיבור ל-client והודעה מובנת: התגובה חוזרת JSON ברור שהממשק יודע להציג.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 36 - עותק של מבחן מחסן לוגיסטי.docx / Q1.2

> 2. שם מלא.

- סטטוס: ready
- ענפים: frontend_ui_validation, backend_api_routes, data_persistence, js_problem_solving, scope_meta
- משימות מקור: question_scope_inherited, alerts_error_handling, api_get_filtered, api_post_create, client_form_inputs, client_list_render, client_navigation, client_validation_rules, db_uniqueness, js_algorithms, server_html_route

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `docs/exam-answer.md` - תשובה מילולית במבנה מה/למה/דוגמה/טעות.
  - `README.md` - סיכום החלטות ורשימת קבצים רלוונטיים לתרגיל.
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.
  - `src/App.jsx` - מחבר routes, state ראשי וקומפוננטות המסלול.
  - `src/components/ExamForm.jsx` - הקובץ שבו בונים את הטופס, ה-inputs וה-submit.
  - `src/utils/validation.js` - פונקציות validation טהורות שחוזרות עם errors לפי שדה.
  - `src/services/api.js` - קריאות fetch לשרת אחרי validation תקין.
  - `src/components/ItemsList.jsx` - הקובץ שבו כותבים map, filter ו-key יציב.
  - `src/components/SearchBox.jsx` - שדה חיפוש נשלט שמעדכן query.
  - `src/pages/AddItemPage.jsx` - הקובץ שבו מבצעים create ואז navigate.
  - `server/config/db.js` - חיבור Mongoose עם MONGO_URI מהסביבה.
  - `src/utils/algorithms.js` - הקובץ שבו כותבים פונקציות JS טהורות.
  - `src/utils/algorithms.test.js` - בדיקות קלט תקין, קלט לא תקין ו-edge cases.

**תתי־משימות טכניות:**
- 1. `docs/exam-answer.md` - זה סעיף כותרת/מעטפת
- 2. `docs/exam-answer.md` - להחיל את כל משימות תתי-הסעיפים של אותה שאלה
- 3. `docs/exam-answer.md` - לבנות תוכנית עבודה לפי תתי-הסעיפים בפועל
- 4. `docs/exam-answer.md` - לעטוף פעולות ב-try/catch
- 5. `docs/exam-answer.md` - להחזיר/להציג הודעת שגיאה
- 6. `docs/exam-answer.md` - לא להסתיר כשלונות
- 7. `docs/exam-answer.md` - לקבל פרמטר/ערך סינון
- 8. `docs/exam-answer.md` - לסנן נתונים ללא mutation
- 9. `docs/exam-answer.md` - להחזיר תוצאה ריקה/תקינה
- 10. `docs/exam-answer.md` - לקרוא req.body
- 11. `docs/exam-answer.md` - לבצע ולידציה
- 12. `docs/exam-answer.md` - להחזיר 201 או שגיאה מתאימה
- 13. `docs/exam-answer.md` - לבנות controlled inputs
- 14. `docs/exam-answer.md` - להגדיר select/options
- 15. `docs/exam-answer.md` - לחבר submit button
- 16. `docs/exam-answer.md` - למפות מערך לרכיבים
- 17. `docs/exam-answer.md` - להציג שדות נדרשים
- 18. `docs/exam-answer.md` - למיין תצוגה לפי כלל
- 19. `docs/exam-answer.md` - להגדיר routes במסך
- 20. `docs/exam-answer.md` - לבצע redirect לאחר פעולה
- 21. `docs/exam-answer.md` - לשמור UX עקבי
- 22. `docs/exam-answer.md` - לכתוב חוקי regex/טווח
- 23. `docs/exam-answer.md` - לחסום שליחה לא תקינה
- 24. `docs/exam-answer.md` - להציג שגיאה ברורה למשתמש
- 25. `docs/exam-answer.md` - להגדיר שדה מזהה
- 26. `docs/exam-answer.md` - לבדוק כפילות לפני insert
- 27. `docs/exam-answer.md` - להחזיר הודעה במקרה כפילות
- 28. `docs/exam-answer.md` - לזהות קלט/פלט
- 29. `docs/exam-answer.md` - לממש אלגוריתם
- 30. `docs/exam-answer.md` - להחזיר מבנה נתונים מדויק
- 31. `docs/exam-answer.md` - להגדיר route שמחזיר HTML
- 32. `docs/exam-answer.md` - לשרת קבצים סטטיים
- 33. `docs/exam-answer.md` - למפות URL נכון

**רובריקת 100 פנימית:**
- 25 נק׳ - בדיקת קלט ו-Error לפי דרישה: הפונקציה דוחה קלט לא תקין בצורה מפורשת.
- 35 נק׳ - אלגוריתם נכון לכל מקרי הבסיס: הלוגיקה מחזירה את הערך הנכון בלי mutation לא נדרש.
- 20 נק׳ - Edge cases: נבדקים מערך ריק, טיפוסים לא נכונים וערכים גבוליים.
- 20 נק׳ - פלט נקי והסבר קצר: הקוד קריא והסטודנט יודע להסביר כל שורה מרכזית.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 37 - עותק של מבחן מחסן לוגיסטי.docx / Q1.3

> 3. רישיון למלגזה . ערך בוליאני.

- סטטוס: ready
- ענפים: frontend_ui_validation, backend_api_routes, data_persistence, js_problem_solving, scope_meta
- משימות מקור: question_scope_inherited, alerts_error_handling, api_get_filtered, api_post_create, client_form_inputs, client_list_render, client_navigation, client_validation_rules, db_uniqueness, js_algorithms, server_html_route

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `docs/exam-answer.md` - תשובה מילולית במבנה מה/למה/דוגמה/טעות.
  - `README.md` - סיכום החלטות ורשימת קבצים רלוונטיים לתרגיל.
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.
  - `src/App.jsx` - מחבר routes, state ראשי וקומפוננטות המסלול.
  - `src/components/ExamForm.jsx` - הקובץ שבו בונים את הטופס, ה-inputs וה-submit.
  - `src/utils/validation.js` - פונקציות validation טהורות שחוזרות עם errors לפי שדה.
  - `src/services/api.js` - קריאות fetch לשרת אחרי validation תקין.
  - `src/components/ItemsList.jsx` - הקובץ שבו כותבים map, filter ו-key יציב.
  - `src/components/SearchBox.jsx` - שדה חיפוש נשלט שמעדכן query.
  - `src/pages/AddItemPage.jsx` - הקובץ שבו מבצעים create ואז navigate.
  - `server/config/db.js` - חיבור Mongoose עם MONGO_URI מהסביבה.
  - `src/utils/algorithms.js` - הקובץ שבו כותבים פונקציות JS טהורות.
  - `src/utils/algorithms.test.js` - בדיקות קלט תקין, קלט לא תקין ו-edge cases.

**תתי־משימות טכניות:**
- 1. `docs/exam-answer.md` - זה סעיף כותרת/מעטפת
- 2. `docs/exam-answer.md` - להחיל את כל משימות תתי-הסעיפים של אותה שאלה
- 3. `docs/exam-answer.md` - לבנות תוכנית עבודה לפי תתי-הסעיפים בפועל
- 4. `docs/exam-answer.md` - לעטוף פעולות ב-try/catch
- 5. `docs/exam-answer.md` - להחזיר/להציג הודעת שגיאה
- 6. `docs/exam-answer.md` - לא להסתיר כשלונות
- 7. `docs/exam-answer.md` - לקבל פרמטר/ערך סינון
- 8. `docs/exam-answer.md` - לסנן נתונים ללא mutation
- 9. `docs/exam-answer.md` - להחזיר תוצאה ריקה/תקינה
- 10. `docs/exam-answer.md` - לקרוא req.body
- 11. `docs/exam-answer.md` - לבצע ולידציה
- 12. `docs/exam-answer.md` - להחזיר 201 או שגיאה מתאימה
- 13. `docs/exam-answer.md` - לבנות controlled inputs
- 14. `docs/exam-answer.md` - להגדיר select/options
- 15. `docs/exam-answer.md` - לחבר submit button
- 16. `docs/exam-answer.md` - למפות מערך לרכיבים
- 17. `docs/exam-answer.md` - להציג שדות נדרשים
- 18. `docs/exam-answer.md` - למיין תצוגה לפי כלל
- 19. `docs/exam-answer.md` - להגדיר routes במסך
- 20. `docs/exam-answer.md` - לבצע redirect לאחר פעולה
- 21. `docs/exam-answer.md` - לשמור UX עקבי
- 22. `docs/exam-answer.md` - לכתוב חוקי regex/טווח
- 23. `docs/exam-answer.md` - לחסום שליחה לא תקינה
- 24. `docs/exam-answer.md` - להציג שגיאה ברורה למשתמש
- 25. `docs/exam-answer.md` - להגדיר שדה מזהה
- 26. `docs/exam-answer.md` - לבדוק כפילות לפני insert
- 27. `docs/exam-answer.md` - להחזיר הודעה במקרה כפילות
- 28. `docs/exam-answer.md` - לזהות קלט/פלט
- 29. `docs/exam-answer.md` - לממש אלגוריתם
- 30. `docs/exam-answer.md` - להחזיר מבנה נתונים מדויק
- 31. `docs/exam-answer.md` - להגדיר route שמחזיר HTML
- 32. `docs/exam-answer.md` - לשרת קבצים סטטיים
- 33. `docs/exam-answer.md` - למפות URL נכון

**רובריקת 100 פנימית:**
- 25 נק׳ - בדיקת קלט ו-Error לפי דרישה: הפונקציה דוחה קלט לא תקין בצורה מפורשת.
- 35 נק׳ - אלגוריתם נכון לכל מקרי הבסיס: הלוגיקה מחזירה את הערך הנכון בלי mutation לא נדרש.
- 20 נק׳ - Edge cases: נבדקים מערך ריק, טיפוסים לא נכונים וערכים גבוליים.
- 20 נק׳ - פלט נקי והסבר קצר: הקוד קריא והסטודנט יודע להסביר כל שורה מרכזית.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 38 - עותק של מבחן מחסן לוגיסטי.docx / Q1.4

> 4. כמה פעמים ביקר במחסן.

- סטטוס: ready
- ענפים: frontend_ui_validation, backend_api_routes, data_persistence, js_problem_solving, scope_meta
- משימות מקור: question_scope_inherited, alerts_error_handling, api_get_filtered, api_post_create, client_form_inputs, client_list_render, client_navigation, client_validation_rules, db_uniqueness, js_algorithms, server_html_route

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `docs/exam-answer.md` - תשובה מילולית במבנה מה/למה/דוגמה/טעות.
  - `README.md` - סיכום החלטות ורשימת קבצים רלוונטיים לתרגיל.
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.
  - `src/App.jsx` - מחבר routes, state ראשי וקומפוננטות המסלול.
  - `src/components/ExamForm.jsx` - הקובץ שבו בונים את הטופס, ה-inputs וה-submit.
  - `src/utils/validation.js` - פונקציות validation טהורות שחוזרות עם errors לפי שדה.
  - `src/services/api.js` - קריאות fetch לשרת אחרי validation תקין.
  - `src/components/ItemsList.jsx` - הקובץ שבו כותבים map, filter ו-key יציב.
  - `src/components/SearchBox.jsx` - שדה חיפוש נשלט שמעדכן query.
  - `src/pages/AddItemPage.jsx` - הקובץ שבו מבצעים create ואז navigate.
  - `server/config/db.js` - חיבור Mongoose עם MONGO_URI מהסביבה.
  - `src/utils/algorithms.js` - הקובץ שבו כותבים פונקציות JS טהורות.
  - `src/utils/algorithms.test.js` - בדיקות קלט תקין, קלט לא תקין ו-edge cases.

**תתי־משימות טכניות:**
- 1. `docs/exam-answer.md` - זה סעיף כותרת/מעטפת
- 2. `docs/exam-answer.md` - להחיל את כל משימות תתי-הסעיפים של אותה שאלה
- 3. `docs/exam-answer.md` - לבנות תוכנית עבודה לפי תתי-הסעיפים בפועל
- 4. `docs/exam-answer.md` - לעטוף פעולות ב-try/catch
- 5. `docs/exam-answer.md` - להחזיר/להציג הודעת שגיאה
- 6. `docs/exam-answer.md` - לא להסתיר כשלונות
- 7. `docs/exam-answer.md` - לקבל פרמטר/ערך סינון
- 8. `docs/exam-answer.md` - לסנן נתונים ללא mutation
- 9. `docs/exam-answer.md` - להחזיר תוצאה ריקה/תקינה
- 10. `docs/exam-answer.md` - לקרוא req.body
- 11. `docs/exam-answer.md` - לבצע ולידציה
- 12. `docs/exam-answer.md` - להחזיר 201 או שגיאה מתאימה
- 13. `docs/exam-answer.md` - לבנות controlled inputs
- 14. `docs/exam-answer.md` - להגדיר select/options
- 15. `docs/exam-answer.md` - לחבר submit button
- 16. `docs/exam-answer.md` - למפות מערך לרכיבים
- 17. `docs/exam-answer.md` - להציג שדות נדרשים
- 18. `docs/exam-answer.md` - למיין תצוגה לפי כלל
- 19. `docs/exam-answer.md` - להגדיר routes במסך
- 20. `docs/exam-answer.md` - לבצע redirect לאחר פעולה
- 21. `docs/exam-answer.md` - לשמור UX עקבי
- 22. `docs/exam-answer.md` - לכתוב חוקי regex/טווח
- 23. `docs/exam-answer.md` - לחסום שליחה לא תקינה
- 24. `docs/exam-answer.md` - להציג שגיאה ברורה למשתמש
- 25. `docs/exam-answer.md` - להגדיר שדה מזהה
- 26. `docs/exam-answer.md` - לבדוק כפילות לפני insert
- 27. `docs/exam-answer.md` - להחזיר הודעה במקרה כפילות
- 28. `docs/exam-answer.md` - לזהות קלט/פלט
- 29. `docs/exam-answer.md` - לממש אלגוריתם
- 30. `docs/exam-answer.md` - להחזיר מבנה נתונים מדויק
- 31. `docs/exam-answer.md` - להגדיר route שמחזיר HTML
- 32. `docs/exam-answer.md` - לשרת קבצים סטטיים
- 33. `docs/exam-answer.md` - למפות URL נכון

**רובריקת 100 פנימית:**
- 25 נק׳ - בדיקת קלט ו-Error לפי דרישה: הפונקציה דוחה קלט לא תקין בצורה מפורשת.
- 35 נק׳ - אלגוריתם נכון לכל מקרי הבסיס: הלוגיקה מחזירה את הערך הנכון בלי mutation לא נדרש.
- 20 נק׳ - Edge cases: נבדקים מערך ריק, טיפוסים לא נכונים וערכים גבוליים.
- 20 נק׳ - פלט נקי והסבר קצר: הקוד קריא והסטודנט יודע להסביר כל שורה מרכזית.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 39 - עותק של מבחן מחסן לוגיסטי.docx / Q1.2

> 2. מחלקת מוצר: מאפייני המוצר:

- סטטוס: ready
- ענפים: frontend_ui_validation, backend_api_routes, data_persistence, js_problem_solving, scope_meta
- משימות מקור: question_scope_inherited, alerts_error_handling, api_get_filtered, api_post_create, client_form_inputs, client_list_render, client_navigation, client_validation_rules, db_uniqueness, js_algorithms, server_html_route

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `docs/exam-answer.md` - תשובה מילולית במבנה מה/למה/דוגמה/טעות.
  - `README.md` - סיכום החלטות ורשימת קבצים רלוונטיים לתרגיל.
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.
  - `src/App.jsx` - מחבר routes, state ראשי וקומפוננטות המסלול.
  - `src/components/ExamForm.jsx` - הקובץ שבו בונים את הטופס, ה-inputs וה-submit.
  - `src/utils/validation.js` - פונקציות validation טהורות שחוזרות עם errors לפי שדה.
  - `src/services/api.js` - קריאות fetch לשרת אחרי validation תקין.
  - `src/components/ItemsList.jsx` - הקובץ שבו כותבים map, filter ו-key יציב.
  - `src/components/SearchBox.jsx` - שדה חיפוש נשלט שמעדכן query.
  - `src/pages/AddItemPage.jsx` - הקובץ שבו מבצעים create ואז navigate.
  - `server/config/db.js` - חיבור Mongoose עם MONGO_URI מהסביבה.
  - `src/utils/algorithms.js` - הקובץ שבו כותבים פונקציות JS טהורות.
  - `src/utils/algorithms.test.js` - בדיקות קלט תקין, קלט לא תקין ו-edge cases.

**תתי־משימות טכניות:**
- 1. `docs/exam-answer.md` - זה סעיף כותרת/מעטפת
- 2. `docs/exam-answer.md` - להחיל את כל משימות תתי-הסעיפים של אותה שאלה
- 3. `docs/exam-answer.md` - לבנות תוכנית עבודה לפי תתי-הסעיפים בפועל
- 4. `docs/exam-answer.md` - לעטוף פעולות ב-try/catch
- 5. `docs/exam-answer.md` - להחזיר/להציג הודעת שגיאה
- 6. `docs/exam-answer.md` - לא להסתיר כשלונות
- 7. `docs/exam-answer.md` - לקבל פרמטר/ערך סינון
- 8. `docs/exam-answer.md` - לסנן נתונים ללא mutation
- 9. `docs/exam-answer.md` - להחזיר תוצאה ריקה/תקינה
- 10. `docs/exam-answer.md` - לקרוא req.body
- 11. `docs/exam-answer.md` - לבצע ולידציה
- 12. `docs/exam-answer.md` - להחזיר 201 או שגיאה מתאימה
- 13. `docs/exam-answer.md` - לבנות controlled inputs
- 14. `docs/exam-answer.md` - להגדיר select/options
- 15. `docs/exam-answer.md` - לחבר submit button
- 16. `docs/exam-answer.md` - למפות מערך לרכיבים
- 17. `docs/exam-answer.md` - להציג שדות נדרשים
- 18. `docs/exam-answer.md` - למיין תצוגה לפי כלל
- 19. `docs/exam-answer.md` - להגדיר routes במסך
- 20. `docs/exam-answer.md` - לבצע redirect לאחר פעולה
- 21. `docs/exam-answer.md` - לשמור UX עקבי
- 22. `docs/exam-answer.md` - לכתוב חוקי regex/טווח
- 23. `docs/exam-answer.md` - לחסום שליחה לא תקינה
- 24. `docs/exam-answer.md` - להציג שגיאה ברורה למשתמש
- 25. `docs/exam-answer.md` - להגדיר שדה מזהה
- 26. `docs/exam-answer.md` - לבדוק כפילות לפני insert
- 27. `docs/exam-answer.md` - להחזיר הודעה במקרה כפילות
- 28. `docs/exam-answer.md` - לזהות קלט/פלט
- 29. `docs/exam-answer.md` - לממש אלגוריתם
- 30. `docs/exam-answer.md` - להחזיר מבנה נתונים מדויק
- 31. `docs/exam-answer.md` - להגדיר route שמחזיר HTML
- 32. `docs/exam-answer.md` - לשרת קבצים סטטיים
- 33. `docs/exam-answer.md` - למפות URL נכון

**רובריקת 100 פנימית:**
- 25 נק׳ - בדיקת קלט ו-Error לפי דרישה: הפונקציה דוחה קלט לא תקין בצורה מפורשת.
- 35 נק׳ - אלגוריתם נכון לכל מקרי הבסיס: הלוגיקה מחזירה את הערך הנכון בלי mutation לא נדרש.
- 20 נק׳ - Edge cases: נבדקים מערך ריק, טיפוסים לא נכונים וערכים גבוליים.
- 20 נק׳ - פלט נקי והסבר קצר: הקוד קריא והסטודנט יודע להסביר כל שורה מרכזית.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 40 - עותק של מבחן מחסן לוגיסטי.docx / Q1.1

> 1. מספר מוצר (חד-חד ערכי). מספר בעל 5 ספרות.

- סטטוס: ready
- ענפים: data_persistence
- משימות מקור: db_uniqueness

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `server/config/db.js` - חיבור Mongoose עם MONGO_URI מהסביבה.
  - `server/models/Item.js` - Schema, required fields, unique indexes ו-model.
  - `server/routes/items.routes.js` - Routes שמשתמשים ב-model במקום מידע זמני.

**תתי־משימות טכניות:**
- 1. `server/models/Item.js` - להגדיר שדה מזהה
- 2. `server/models/Item.js` - לבדוק כפילות לפני insert
- 3. `server/models/Item.js` - להחזיר הודעה במקרה כפילות

**רובריקת 100 פנימית:**
- 25 נק׳ - Route/method/status code נכונים: ה-endpoint מתאים לדרישה ומחזיר 200/201/400/404/500 לפי מצב.
- 20 נק׳ - Validation של body/query/params: אין כניסה לא תקינה שממשיכה לפעולת DB או response שגוי.
- 25 נק׳ - פעולת data/DB נכונה: find/create/update/delete או persistence מתבצעים במקום הנכון.
- 15 נק׳ - Error handling: try/catch או טיפול כשל ברור בלי להסתיר שגיאות.
- 15 נק׳ - חיבור ל-client והודעה מובנת: התגובה חוזרת JSON ברור שהממשק יודע להציג.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 41 - עותק של מבחן מחסן לוגיסטי.docx / Q1.2

> 2. שם המוצר.

- סטטוס: ready
- ענפים: frontend_ui_validation, backend_api_routes, data_persistence, js_problem_solving, scope_meta
- משימות מקור: question_scope_inherited, alerts_error_handling, api_get_filtered, api_post_create, client_form_inputs, client_list_render, client_navigation, client_validation_rules, db_uniqueness, js_algorithms, server_html_route

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `docs/exam-answer.md` - תשובה מילולית במבנה מה/למה/דוגמה/טעות.
  - `README.md` - סיכום החלטות ורשימת קבצים רלוונטיים לתרגיל.
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.
  - `src/App.jsx` - מחבר routes, state ראשי וקומפוננטות המסלול.
  - `src/components/ExamForm.jsx` - הקובץ שבו בונים את הטופס, ה-inputs וה-submit.
  - `src/utils/validation.js` - פונקציות validation טהורות שחוזרות עם errors לפי שדה.
  - `src/services/api.js` - קריאות fetch לשרת אחרי validation תקין.
  - `src/components/ItemsList.jsx` - הקובץ שבו כותבים map, filter ו-key יציב.
  - `src/components/SearchBox.jsx` - שדה חיפוש נשלט שמעדכן query.
  - `src/pages/AddItemPage.jsx` - הקובץ שבו מבצעים create ואז navigate.
  - `server/config/db.js` - חיבור Mongoose עם MONGO_URI מהסביבה.
  - `src/utils/algorithms.js` - הקובץ שבו כותבים פונקציות JS טהורות.
  - `src/utils/algorithms.test.js` - בדיקות קלט תקין, קלט לא תקין ו-edge cases.

**תתי־משימות טכניות:**
- 1. `docs/exam-answer.md` - זה סעיף כותרת/מעטפת
- 2. `docs/exam-answer.md` - להחיל את כל משימות תתי-הסעיפים של אותה שאלה
- 3. `docs/exam-answer.md` - לבנות תוכנית עבודה לפי תתי-הסעיפים בפועל
- 4. `docs/exam-answer.md` - לעטוף פעולות ב-try/catch
- 5. `docs/exam-answer.md` - להחזיר/להציג הודעת שגיאה
- 6. `docs/exam-answer.md` - לא להסתיר כשלונות
- 7. `docs/exam-answer.md` - לקבל פרמטר/ערך סינון
- 8. `docs/exam-answer.md` - לסנן נתונים ללא mutation
- 9. `docs/exam-answer.md` - להחזיר תוצאה ריקה/תקינה
- 10. `docs/exam-answer.md` - לקרוא req.body
- 11. `docs/exam-answer.md` - לבצע ולידציה
- 12. `docs/exam-answer.md` - להחזיר 201 או שגיאה מתאימה
- 13. `docs/exam-answer.md` - לבנות controlled inputs
- 14. `docs/exam-answer.md` - להגדיר select/options
- 15. `docs/exam-answer.md` - לחבר submit button
- 16. `docs/exam-answer.md` - למפות מערך לרכיבים
- 17. `docs/exam-answer.md` - להציג שדות נדרשים
- 18. `docs/exam-answer.md` - למיין תצוגה לפי כלל
- 19. `docs/exam-answer.md` - להגדיר routes במסך
- 20. `docs/exam-answer.md` - לבצע redirect לאחר פעולה
- 21. `docs/exam-answer.md` - לשמור UX עקבי
- 22. `docs/exam-answer.md` - לכתוב חוקי regex/טווח
- 23. `docs/exam-answer.md` - לחסום שליחה לא תקינה
- 24. `docs/exam-answer.md` - להציג שגיאה ברורה למשתמש
- 25. `docs/exam-answer.md` - להגדיר שדה מזהה
- 26. `docs/exam-answer.md` - לבדוק כפילות לפני insert
- 27. `docs/exam-answer.md` - להחזיר הודעה במקרה כפילות
- 28. `docs/exam-answer.md` - לזהות קלט/פלט
- 29. `docs/exam-answer.md` - לממש אלגוריתם
- 30. `docs/exam-answer.md` - להחזיר מבנה נתונים מדויק
- 31. `docs/exam-answer.md` - להגדיר route שמחזיר HTML
- 32. `docs/exam-answer.md` - לשרת קבצים סטטיים
- 33. `docs/exam-answer.md` - למפות URL נכון

**רובריקת 100 פנימית:**
- 25 נק׳ - בדיקת קלט ו-Error לפי דרישה: הפונקציה דוחה קלט לא תקין בצורה מפורשת.
- 35 נק׳ - אלגוריתם נכון לכל מקרי הבסיס: הלוגיקה מחזירה את הערך הנכון בלי mutation לא נדרש.
- 20 נק׳ - Edge cases: נבדקים מערך ריק, טיפוסים לא נכונים וערכים גבוליים.
- 20 נק׳ - פלט נקי והסבר קצר: הקוד קריא והסטודנט יודע להסביר כל שורה מרכזית.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 42 - עותק של מבחן מחסן לוגיסטי.docx / Q1.3

> 3. האם צריך מלגזה. בוליאני.

- סטטוס: ready
- ענפים: frontend_ui_validation, backend_api_routes, data_persistence, js_problem_solving, scope_meta
- משימות מקור: question_scope_inherited, alerts_error_handling, api_get_filtered, api_post_create, client_form_inputs, client_list_render, client_navigation, client_validation_rules, db_uniqueness, js_algorithms, server_html_route

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `docs/exam-answer.md` - תשובה מילולית במבנה מה/למה/דוגמה/טעות.
  - `README.md` - סיכום החלטות ורשימת קבצים רלוונטיים לתרגיל.
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.
  - `src/App.jsx` - מחבר routes, state ראשי וקומפוננטות המסלול.
  - `src/components/ExamForm.jsx` - הקובץ שבו בונים את הטופס, ה-inputs וה-submit.
  - `src/utils/validation.js` - פונקציות validation טהורות שחוזרות עם errors לפי שדה.
  - `src/services/api.js` - קריאות fetch לשרת אחרי validation תקין.
  - `src/components/ItemsList.jsx` - הקובץ שבו כותבים map, filter ו-key יציב.
  - `src/components/SearchBox.jsx` - שדה חיפוש נשלט שמעדכן query.
  - `src/pages/AddItemPage.jsx` - הקובץ שבו מבצעים create ואז navigate.
  - `server/config/db.js` - חיבור Mongoose עם MONGO_URI מהסביבה.
  - `src/utils/algorithms.js` - הקובץ שבו כותבים פונקציות JS טהורות.
  - `src/utils/algorithms.test.js` - בדיקות קלט תקין, קלט לא תקין ו-edge cases.

**תתי־משימות טכניות:**
- 1. `docs/exam-answer.md` - זה סעיף כותרת/מעטפת
- 2. `docs/exam-answer.md` - להחיל את כל משימות תתי-הסעיפים של אותה שאלה
- 3. `docs/exam-answer.md` - לבנות תוכנית עבודה לפי תתי-הסעיפים בפועל
- 4. `docs/exam-answer.md` - לעטוף פעולות ב-try/catch
- 5. `docs/exam-answer.md` - להחזיר/להציג הודעת שגיאה
- 6. `docs/exam-answer.md` - לא להסתיר כשלונות
- 7. `docs/exam-answer.md` - לקבל פרמטר/ערך סינון
- 8. `docs/exam-answer.md` - לסנן נתונים ללא mutation
- 9. `docs/exam-answer.md` - להחזיר תוצאה ריקה/תקינה
- 10. `docs/exam-answer.md` - לקרוא req.body
- 11. `docs/exam-answer.md` - לבצע ולידציה
- 12. `docs/exam-answer.md` - להחזיר 201 או שגיאה מתאימה
- 13. `docs/exam-answer.md` - לבנות controlled inputs
- 14. `docs/exam-answer.md` - להגדיר select/options
- 15. `docs/exam-answer.md` - לחבר submit button
- 16. `docs/exam-answer.md` - למפות מערך לרכיבים
- 17. `docs/exam-answer.md` - להציג שדות נדרשים
- 18. `docs/exam-answer.md` - למיין תצוגה לפי כלל
- 19. `docs/exam-answer.md` - להגדיר routes במסך
- 20. `docs/exam-answer.md` - לבצע redirect לאחר פעולה
- 21. `docs/exam-answer.md` - לשמור UX עקבי
- 22. `docs/exam-answer.md` - לכתוב חוקי regex/טווח
- 23. `docs/exam-answer.md` - לחסום שליחה לא תקינה
- 24. `docs/exam-answer.md` - להציג שגיאה ברורה למשתמש
- 25. `docs/exam-answer.md` - להגדיר שדה מזהה
- 26. `docs/exam-answer.md` - לבדוק כפילות לפני insert
- 27. `docs/exam-answer.md` - להחזיר הודעה במקרה כפילות
- 28. `docs/exam-answer.md` - לזהות קלט/פלט
- 29. `docs/exam-answer.md` - לממש אלגוריתם
- 30. `docs/exam-answer.md` - להחזיר מבנה נתונים מדויק
- 31. `docs/exam-answer.md` - להגדיר route שמחזיר HTML
- 32. `docs/exam-answer.md` - לשרת קבצים סטטיים
- 33. `docs/exam-answer.md` - למפות URL נכון

**רובריקת 100 פנימית:**
- 25 נק׳ - בדיקת קלט ו-Error לפי דרישה: הפונקציה דוחה קלט לא תקין בצורה מפורשת.
- 35 נק׳ - אלגוריתם נכון לכל מקרי הבסיס: הלוגיקה מחזירה את הערך הנכון בלי mutation לא נדרש.
- 20 נק׳ - Edge cases: נבדקים מערך ריק, טיפוסים לא נכונים וערכים גבוליים.
- 20 נק׳ - פלט נקי והסבר קצר: הקוד קריא והסטודנט יודע להסביר כל שורה מרכזית.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 43 - עותק של מבחן מחסן לוגיסטי.docx / Q1.4

> 4. האם נמצא במקום. בוליאני. יש ליצור 2 מערכים מטיפוס עובד ומוצר אשר יכילו את האובייקטים. מערך העובדים צריך להיות ריק בהתחלה. מערך המוצרים: יהיה מלא ב5 מוצרים שונים פירוט המוצרים:

- סטטוס: ready
- ענפים: js_problem_solving
- משימות מקור: js_algorithms

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `src/utils/algorithms.js` - הקובץ שבו כותבים פונקציות JS טהורות.
  - `src/utils/algorithms.test.js` - בדיקות קלט תקין, קלט לא תקין ו-edge cases.

**תתי־משימות טכניות:**
- 1. `src/utils/algorithms.js` - לזהות קלט/פלט
- 2. `src/utils/algorithms.js` - לממש אלגוריתם
- 3. `src/utils/algorithms.js` - להחזיר מבנה נתונים מדויק

**רובריקת 100 פנימית:**
- 25 נק׳ - בדיקת קלט ו-Error לפי דרישה: הפונקציה דוחה קלט לא תקין בצורה מפורשת.
- 35 נק׳ - אלגוריתם נכון לכל מקרי הבסיס: הלוגיקה מחזירה את הערך הנכון בלי mutation לא נדרש.
- 20 נק׳ - Edge cases: נבדקים מערך ריק, טיפוסים לא נכונים וערכים גבוליים.
- 20 נק׳ - פלט נקי והסבר קצר: הקוד קריא והסטודנט יודע להסביר כל שורה מרכזית.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 44 - עותק של מבחן מחסן לוגיסטי.docx / Q1.1

> 1. 11122 , קופסא ירוקה , אינו צריך מלגזה.

- סטטוס: ready
- ענפים: frontend_ui_validation, backend_api_routes, data_persistence, js_problem_solving, scope_meta
- משימות מקור: question_scope_inherited, alerts_error_handling, api_get_filtered, api_post_create, client_form_inputs, client_list_render, client_navigation, client_validation_rules, db_uniqueness, js_algorithms, server_html_route

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `docs/exam-answer.md` - תשובה מילולית במבנה מה/למה/דוגמה/טעות.
  - `README.md` - סיכום החלטות ורשימת קבצים רלוונטיים לתרגיל.
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.
  - `src/App.jsx` - מחבר routes, state ראשי וקומפוננטות המסלול.
  - `src/components/ExamForm.jsx` - הקובץ שבו בונים את הטופס, ה-inputs וה-submit.
  - `src/utils/validation.js` - פונקציות validation טהורות שחוזרות עם errors לפי שדה.
  - `src/services/api.js` - קריאות fetch לשרת אחרי validation תקין.
  - `src/components/ItemsList.jsx` - הקובץ שבו כותבים map, filter ו-key יציב.
  - `src/components/SearchBox.jsx` - שדה חיפוש נשלט שמעדכן query.
  - `src/pages/AddItemPage.jsx` - הקובץ שבו מבצעים create ואז navigate.
  - `server/config/db.js` - חיבור Mongoose עם MONGO_URI מהסביבה.
  - `src/utils/algorithms.js` - הקובץ שבו כותבים פונקציות JS טהורות.
  - `src/utils/algorithms.test.js` - בדיקות קלט תקין, קלט לא תקין ו-edge cases.

**תתי־משימות טכניות:**
- 1. `docs/exam-answer.md` - זה סעיף כותרת/מעטפת
- 2. `docs/exam-answer.md` - להחיל את כל משימות תתי-הסעיפים של אותה שאלה
- 3. `docs/exam-answer.md` - לבנות תוכנית עבודה לפי תתי-הסעיפים בפועל
- 4. `docs/exam-answer.md` - לעטוף פעולות ב-try/catch
- 5. `docs/exam-answer.md` - להחזיר/להציג הודעת שגיאה
- 6. `docs/exam-answer.md` - לא להסתיר כשלונות
- 7. `docs/exam-answer.md` - לקבל פרמטר/ערך סינון
- 8. `docs/exam-answer.md` - לסנן נתונים ללא mutation
- 9. `docs/exam-answer.md` - להחזיר תוצאה ריקה/תקינה
- 10. `docs/exam-answer.md` - לקרוא req.body
- 11. `docs/exam-answer.md` - לבצע ולידציה
- 12. `docs/exam-answer.md` - להחזיר 201 או שגיאה מתאימה
- 13. `docs/exam-answer.md` - לבנות controlled inputs
- 14. `docs/exam-answer.md` - להגדיר select/options
- 15. `docs/exam-answer.md` - לחבר submit button
- 16. `docs/exam-answer.md` - למפות מערך לרכיבים
- 17. `docs/exam-answer.md` - להציג שדות נדרשים
- 18. `docs/exam-answer.md` - למיין תצוגה לפי כלל
- 19. `docs/exam-answer.md` - להגדיר routes במסך
- 20. `docs/exam-answer.md` - לבצע redirect לאחר פעולה
- 21. `docs/exam-answer.md` - לשמור UX עקבי
- 22. `docs/exam-answer.md` - לכתוב חוקי regex/טווח
- 23. `docs/exam-answer.md` - לחסום שליחה לא תקינה
- 24. `docs/exam-answer.md` - להציג שגיאה ברורה למשתמש
- 25. `docs/exam-answer.md` - להגדיר שדה מזהה
- 26. `docs/exam-answer.md` - לבדוק כפילות לפני insert
- 27. `docs/exam-answer.md` - להחזיר הודעה במקרה כפילות
- 28. `docs/exam-answer.md` - לזהות קלט/פלט
- 29. `docs/exam-answer.md` - לממש אלגוריתם
- 30. `docs/exam-answer.md` - להחזיר מבנה נתונים מדויק
- 31. `docs/exam-answer.md` - להגדיר route שמחזיר HTML
- 32. `docs/exam-answer.md` - לשרת קבצים סטטיים
- 33. `docs/exam-answer.md` - למפות URL נכון

**רובריקת 100 פנימית:**
- 25 נק׳ - בדיקת קלט ו-Error לפי דרישה: הפונקציה דוחה קלט לא תקין בצורה מפורשת.
- 35 נק׳ - אלגוריתם נכון לכל מקרי הבסיס: הלוגיקה מחזירה את הערך הנכון בלי mutation לא נדרש.
- 20 נק׳ - Edge cases: נבדקים מערך ריק, טיפוסים לא נכונים וערכים גבוליים.
- 20 נק׳ - פלט נקי והסבר קצר: הקוד קריא והסטודנט יודע להסביר כל שורה מרכזית.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 45 - עותק של מבחן מחסן לוגיסטי.docx / Q1.2

> 2. 22554 , קופסא ירוקה , אינו צריך מלגזה.

- סטטוס: ready
- ענפים: frontend_ui_validation, backend_api_routes, data_persistence, js_problem_solving, scope_meta
- משימות מקור: question_scope_inherited, alerts_error_handling, api_get_filtered, api_post_create, client_form_inputs, client_list_render, client_navigation, client_validation_rules, db_uniqueness, js_algorithms, server_html_route

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `docs/exam-answer.md` - תשובה מילולית במבנה מה/למה/דוגמה/טעות.
  - `README.md` - סיכום החלטות ורשימת קבצים רלוונטיים לתרגיל.
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.
  - `src/App.jsx` - מחבר routes, state ראשי וקומפוננטות המסלול.
  - `src/components/ExamForm.jsx` - הקובץ שבו בונים את הטופס, ה-inputs וה-submit.
  - `src/utils/validation.js` - פונקציות validation טהורות שחוזרות עם errors לפי שדה.
  - `src/services/api.js` - קריאות fetch לשרת אחרי validation תקין.
  - `src/components/ItemsList.jsx` - הקובץ שבו כותבים map, filter ו-key יציב.
  - `src/components/SearchBox.jsx` - שדה חיפוש נשלט שמעדכן query.
  - `src/pages/AddItemPage.jsx` - הקובץ שבו מבצעים create ואז navigate.
  - `server/config/db.js` - חיבור Mongoose עם MONGO_URI מהסביבה.
  - `src/utils/algorithms.js` - הקובץ שבו כותבים פונקציות JS טהורות.
  - `src/utils/algorithms.test.js` - בדיקות קלט תקין, קלט לא תקין ו-edge cases.

**תתי־משימות טכניות:**
- 1. `docs/exam-answer.md` - זה סעיף כותרת/מעטפת
- 2. `docs/exam-answer.md` - להחיל את כל משימות תתי-הסעיפים של אותה שאלה
- 3. `docs/exam-answer.md` - לבנות תוכנית עבודה לפי תתי-הסעיפים בפועל
- 4. `docs/exam-answer.md` - לעטוף פעולות ב-try/catch
- 5. `docs/exam-answer.md` - להחזיר/להציג הודעת שגיאה
- 6. `docs/exam-answer.md` - לא להסתיר כשלונות
- 7. `docs/exam-answer.md` - לקבל פרמטר/ערך סינון
- 8. `docs/exam-answer.md` - לסנן נתונים ללא mutation
- 9. `docs/exam-answer.md` - להחזיר תוצאה ריקה/תקינה
- 10. `docs/exam-answer.md` - לקרוא req.body
- 11. `docs/exam-answer.md` - לבצע ולידציה
- 12. `docs/exam-answer.md` - להחזיר 201 או שגיאה מתאימה
- 13. `docs/exam-answer.md` - לבנות controlled inputs
- 14. `docs/exam-answer.md` - להגדיר select/options
- 15. `docs/exam-answer.md` - לחבר submit button
- 16. `docs/exam-answer.md` - למפות מערך לרכיבים
- 17. `docs/exam-answer.md` - להציג שדות נדרשים
- 18. `docs/exam-answer.md` - למיין תצוגה לפי כלל
- 19. `docs/exam-answer.md` - להגדיר routes במסך
- 20. `docs/exam-answer.md` - לבצע redirect לאחר פעולה
- 21. `docs/exam-answer.md` - לשמור UX עקבי
- 22. `docs/exam-answer.md` - לכתוב חוקי regex/טווח
- 23. `docs/exam-answer.md` - לחסום שליחה לא תקינה
- 24. `docs/exam-answer.md` - להציג שגיאה ברורה למשתמש
- 25. `docs/exam-answer.md` - להגדיר שדה מזהה
- 26. `docs/exam-answer.md` - לבדוק כפילות לפני insert
- 27. `docs/exam-answer.md` - להחזיר הודעה במקרה כפילות
- 28. `docs/exam-answer.md` - לזהות קלט/פלט
- 29. `docs/exam-answer.md` - לממש אלגוריתם
- 30. `docs/exam-answer.md` - להחזיר מבנה נתונים מדויק
- 31. `docs/exam-answer.md` - להגדיר route שמחזיר HTML
- 32. `docs/exam-answer.md` - לשרת קבצים סטטיים
- 33. `docs/exam-answer.md` - למפות URL נכון

**רובריקת 100 פנימית:**
- 25 נק׳ - בדיקת קלט ו-Error לפי דרישה: הפונקציה דוחה קלט לא תקין בצורה מפורשת.
- 35 נק׳ - אלגוריתם נכון לכל מקרי הבסיס: הלוגיקה מחזירה את הערך הנכון בלי mutation לא נדרש.
- 20 נק׳ - Edge cases: נבדקים מערך ריק, טיפוסים לא נכונים וערכים גבוליים.
- 20 נק׳ - פלט נקי והסבר קצר: הקוד קריא והסטודנט יודע להסביר כל שורה מרכזית.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 46 - עותק של מבחן מחסן לוגיסטי.docx / Q1.3

> 3. 66698 , קופסא כחולה , צריך מלגזה.

- סטטוס: ready
- ענפים: frontend_ui_validation, backend_api_routes, data_persistence, js_problem_solving, scope_meta
- משימות מקור: question_scope_inherited, alerts_error_handling, api_get_filtered, api_post_create, client_form_inputs, client_list_render, client_navigation, client_validation_rules, db_uniqueness, js_algorithms, server_html_route

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `docs/exam-answer.md` - תשובה מילולית במבנה מה/למה/דוגמה/טעות.
  - `README.md` - סיכום החלטות ורשימת קבצים רלוונטיים לתרגיל.
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.
  - `src/App.jsx` - מחבר routes, state ראשי וקומפוננטות המסלול.
  - `src/components/ExamForm.jsx` - הקובץ שבו בונים את הטופס, ה-inputs וה-submit.
  - `src/utils/validation.js` - פונקציות validation טהורות שחוזרות עם errors לפי שדה.
  - `src/services/api.js` - קריאות fetch לשרת אחרי validation תקין.
  - `src/components/ItemsList.jsx` - הקובץ שבו כותבים map, filter ו-key יציב.
  - `src/components/SearchBox.jsx` - שדה חיפוש נשלט שמעדכן query.
  - `src/pages/AddItemPage.jsx` - הקובץ שבו מבצעים create ואז navigate.
  - `server/config/db.js` - חיבור Mongoose עם MONGO_URI מהסביבה.
  - `src/utils/algorithms.js` - הקובץ שבו כותבים פונקציות JS טהורות.
  - `src/utils/algorithms.test.js` - בדיקות קלט תקין, קלט לא תקין ו-edge cases.

**תתי־משימות טכניות:**
- 1. `docs/exam-answer.md` - זה סעיף כותרת/מעטפת
- 2. `docs/exam-answer.md` - להחיל את כל משימות תתי-הסעיפים של אותה שאלה
- 3. `docs/exam-answer.md` - לבנות תוכנית עבודה לפי תתי-הסעיפים בפועל
- 4. `docs/exam-answer.md` - לעטוף פעולות ב-try/catch
- 5. `docs/exam-answer.md` - להחזיר/להציג הודעת שגיאה
- 6. `docs/exam-answer.md` - לא להסתיר כשלונות
- 7. `docs/exam-answer.md` - לקבל פרמטר/ערך סינון
- 8. `docs/exam-answer.md` - לסנן נתונים ללא mutation
- 9. `docs/exam-answer.md` - להחזיר תוצאה ריקה/תקינה
- 10. `docs/exam-answer.md` - לקרוא req.body
- 11. `docs/exam-answer.md` - לבצע ולידציה
- 12. `docs/exam-answer.md` - להחזיר 201 או שגיאה מתאימה
- 13. `docs/exam-answer.md` - לבנות controlled inputs
- 14. `docs/exam-answer.md` - להגדיר select/options
- 15. `docs/exam-answer.md` - לחבר submit button
- 16. `docs/exam-answer.md` - למפות מערך לרכיבים
- 17. `docs/exam-answer.md` - להציג שדות נדרשים
- 18. `docs/exam-answer.md` - למיין תצוגה לפי כלל
- 19. `docs/exam-answer.md` - להגדיר routes במסך
- 20. `docs/exam-answer.md` - לבצע redirect לאחר פעולה
- 21. `docs/exam-answer.md` - לשמור UX עקבי
- 22. `docs/exam-answer.md` - לכתוב חוקי regex/טווח
- 23. `docs/exam-answer.md` - לחסום שליחה לא תקינה
- 24. `docs/exam-answer.md` - להציג שגיאה ברורה למשתמש
- 25. `docs/exam-answer.md` - להגדיר שדה מזהה
- 26. `docs/exam-answer.md` - לבדוק כפילות לפני insert
- 27. `docs/exam-answer.md` - להחזיר הודעה במקרה כפילות
- 28. `docs/exam-answer.md` - לזהות קלט/פלט
- 29. `docs/exam-answer.md` - לממש אלגוריתם
- 30. `docs/exam-answer.md` - להחזיר מבנה נתונים מדויק
- 31. `docs/exam-answer.md` - להגדיר route שמחזיר HTML
- 32. `docs/exam-answer.md` - לשרת קבצים סטטיים
- 33. `docs/exam-answer.md` - למפות URL נכון

**רובריקת 100 פנימית:**
- 25 נק׳ - בדיקת קלט ו-Error לפי דרישה: הפונקציה דוחה קלט לא תקין בצורה מפורשת.
- 35 נק׳ - אלגוריתם נכון לכל מקרי הבסיס: הלוגיקה מחזירה את הערך הנכון בלי mutation לא נדרש.
- 20 נק׳ - Edge cases: נבדקים מערך ריק, טיפוסים לא נכונים וערכים גבוליים.
- 20 נק׳ - פלט נקי והסבר קצר: הקוד קריא והסטודנט יודע להסביר כל שורה מרכזית.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 47 - עותק של מבחן מחסן לוגיסטי.docx / Q1.4

> 4. 78544 , קופסא אדומה , אינו צריך מלגזה.

- סטטוס: ready
- ענפים: frontend_ui_validation, backend_api_routes, data_persistence, js_problem_solving, scope_meta
- משימות מקור: question_scope_inherited, alerts_error_handling, api_get_filtered, api_post_create, client_form_inputs, client_list_render, client_navigation, client_validation_rules, db_uniqueness, js_algorithms, server_html_route

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `docs/exam-answer.md` - תשובה מילולית במבנה מה/למה/דוגמה/טעות.
  - `README.md` - סיכום החלטות ורשימת קבצים רלוונטיים לתרגיל.
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.
  - `src/App.jsx` - מחבר routes, state ראשי וקומפוננטות המסלול.
  - `src/components/ExamForm.jsx` - הקובץ שבו בונים את הטופס, ה-inputs וה-submit.
  - `src/utils/validation.js` - פונקציות validation טהורות שחוזרות עם errors לפי שדה.
  - `src/services/api.js` - קריאות fetch לשרת אחרי validation תקין.
  - `src/components/ItemsList.jsx` - הקובץ שבו כותבים map, filter ו-key יציב.
  - `src/components/SearchBox.jsx` - שדה חיפוש נשלט שמעדכן query.
  - `src/pages/AddItemPage.jsx` - הקובץ שבו מבצעים create ואז navigate.
  - `server/config/db.js` - חיבור Mongoose עם MONGO_URI מהסביבה.
  - `src/utils/algorithms.js` - הקובץ שבו כותבים פונקציות JS טהורות.
  - `src/utils/algorithms.test.js` - בדיקות קלט תקין, קלט לא תקין ו-edge cases.

**תתי־משימות טכניות:**
- 1. `docs/exam-answer.md` - זה סעיף כותרת/מעטפת
- 2. `docs/exam-answer.md` - להחיל את כל משימות תתי-הסעיפים של אותה שאלה
- 3. `docs/exam-answer.md` - לבנות תוכנית עבודה לפי תתי-הסעיפים בפועל
- 4. `docs/exam-answer.md` - לעטוף פעולות ב-try/catch
- 5. `docs/exam-answer.md` - להחזיר/להציג הודעת שגיאה
- 6. `docs/exam-answer.md` - לא להסתיר כשלונות
- 7. `docs/exam-answer.md` - לקבל פרמטר/ערך סינון
- 8. `docs/exam-answer.md` - לסנן נתונים ללא mutation
- 9. `docs/exam-answer.md` - להחזיר תוצאה ריקה/תקינה
- 10. `docs/exam-answer.md` - לקרוא req.body
- 11. `docs/exam-answer.md` - לבצע ולידציה
- 12. `docs/exam-answer.md` - להחזיר 201 או שגיאה מתאימה
- 13. `docs/exam-answer.md` - לבנות controlled inputs
- 14. `docs/exam-answer.md` - להגדיר select/options
- 15. `docs/exam-answer.md` - לחבר submit button
- 16. `docs/exam-answer.md` - למפות מערך לרכיבים
- 17. `docs/exam-answer.md` - להציג שדות נדרשים
- 18. `docs/exam-answer.md` - למיין תצוגה לפי כלל
- 19. `docs/exam-answer.md` - להגדיר routes במסך
- 20. `docs/exam-answer.md` - לבצע redirect לאחר פעולה
- 21. `docs/exam-answer.md` - לשמור UX עקבי
- 22. `docs/exam-answer.md` - לכתוב חוקי regex/טווח
- 23. `docs/exam-answer.md` - לחסום שליחה לא תקינה
- 24. `docs/exam-answer.md` - להציג שגיאה ברורה למשתמש
- 25. `docs/exam-answer.md` - להגדיר שדה מזהה
- 26. `docs/exam-answer.md` - לבדוק כפילות לפני insert
- 27. `docs/exam-answer.md` - להחזיר הודעה במקרה כפילות
- 28. `docs/exam-answer.md` - לזהות קלט/פלט
- 29. `docs/exam-answer.md` - לממש אלגוריתם
- 30. `docs/exam-answer.md` - להחזיר מבנה נתונים מדויק
- 31. `docs/exam-answer.md` - להגדיר route שמחזיר HTML
- 32. `docs/exam-answer.md` - לשרת קבצים סטטיים
- 33. `docs/exam-answer.md` - למפות URL נכון

**רובריקת 100 פנימית:**
- 25 נק׳ - בדיקת קלט ו-Error לפי דרישה: הפונקציה דוחה קלט לא תקין בצורה מפורשת.
- 35 נק׳ - אלגוריתם נכון לכל מקרי הבסיס: הלוגיקה מחזירה את הערך הנכון בלי mutation לא נדרש.
- 20 נק׳ - Edge cases: נבדקים מערך ריק, טיפוסים לא נכונים וערכים גבוליים.
- 20 נק׳ - פלט נקי והסבר קצר: הקוד קריא והסטודנט יודע להסביר כל שורה מרכזית.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 48 - עותק של מבחן מחסן לוגיסטי.docx / Q1.5

> 5. 69875 , קופסא אדומה , אינו צריך מלגזה. *הערכים יכנסו באנגלית בלבד! *אף מוצר כברירת מחדל לא נמצא במקום. *האתר לא מאפשר יצירה של מוצרים חדשים. אפיון עמוד הכניסה של האתר: ערוץ ("/") לאתר יש 2 כפתורים וכותרת. רקע העמוד "אפור בהיר". .H2כותרת : במרכז בגודל 2 כפתורים: רקע כחול , במרכז , אחד מתחת לשני עם פינות עגולות. את הכתב יהיה בלבן כפי שנראה בתיאור למעלה. לחיצה על כל אחד מהכפתורים יאפשר מעבר לעמוד הבא לפי הכפתור שנבחר. דף הרשמה – בדף זה העובד ירשם במידה ואינו קיים במערכת.:Sign up ערוץ (“/signup”) קוד: על העובד למלא בשדה הראשון מספרים בלבד. המספר צריך להיות בעל 5 ספרות בלבד. במידה והוזן מספר אשר קטן או גדול מ5 ספרות תופיע הודעת שגיאה מתחת לשדה באדום עם הפירוט הבא: the number must be with 5 digits. שדה שני – שם מלא. אותיות בלבד עם רווח אחד לפחות. במידה והשדה לא יכיל רק אותיות או פחות מ4 תווים (לא כולל הרווח) תופיע השגיאה הבאה מתחת לשדה. the name must contain minimum 4 characters. 2 כפתורי רדיו: הכפתורים מציינים אם יש לעובד רישיון למלגזה. צריך להיות לחוץ.NOבתור ברירת מחדל הכפתור כפתור "צור": לאחר לחיצה על כפתור היצירה המערכת תבדוק שהנתונים אכן תקינים ותוודא שהעובד לא נמצא כבר מערכת. מציאת העובד במערכת מתבצעת ע"י מספר העובד בלבד. (ניתן לצרף 2 עובדים עם אותו שם). במידה ויצירת העובד תקינה יש לעדכן זאת במערך אשר מכיל את כל העובדים בחברה. דף כניסה – בדף זה העובד יוכל להיכנס למשתמש שלו.:Log In ערוץ (“/login”) קוד: העובד יזין בתוך תיבת הטקסט את מספר העובד ורק לאחר לחיצה על כפתור הכניסה המערכת תבדוק באיזה עובד מדובר. .alertבמידה והעובד לא נמצא יקפוץ לא קיים".Xבתוכו תיכתב ההודעה "העובד במידה והעובד קיים תפתח בפניו הדף הבא: (הערוץ לא משתנה) קוד: יש לציין רק את שמו המלא של העובד בכותרת העמוד לאחר המילה . WELCOME לאחר מכן את כל הפרטים מצד שמאל. במידה ויש לעובד רישיון על מלגזה (ערך אמת) יש לכתוב "כן" אחרת "לא". לאחר מכן יש להציג רשימה של כל המוצרים אשר נכתבו כ"לא במקום". (משתנה : האם נמ

- סטטוס: ready
- ענפים: frontend_ui_validation, backend_api_routes
- משימות מקור: api_get_filtered, api_post_create, server_html_route, client_form_inputs, client_validation_rules, client_navigation, client_list_render, alerts_error_handling

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.
  - `src/App.jsx` - מחבר routes, state ראשי וקומפוננטות המסלול.
  - `src/components/ExamForm.jsx` - הקובץ שבו בונים את הטופס, ה-inputs וה-submit.
  - `src/utils/validation.js` - פונקציות validation טהורות שחוזרות עם errors לפי שדה.
  - `src/services/api.js` - קריאות fetch לשרת אחרי validation תקין.
  - `src/pages/AddItemPage.jsx` - הקובץ שבו מבצעים create ואז navigate.
  - `src/components/ItemsList.jsx` - הקובץ שבו כותבים map, filter ו-key יציב.
  - `src/components/SearchBox.jsx` - שדה חיפוש נשלט שמעדכן query.

**תתי־משימות טכניות:**
- 1. `server/routes/items.routes.js` - לקבל פרמטר/ערך סינון
- 2. `server/routes/items.routes.js` - לסנן נתונים ללא mutation
- 3. `server/routes/items.routes.js` - להחזיר תוצאה ריקה/תקינה
- 4. `server/routes/items.routes.js` - לקרוא req.body
- 5. `server/routes/items.routes.js` - לבצע ולידציה
- 6. `server/routes/items.routes.js` - להחזיר 201 או שגיאה מתאימה
- 7. `server/routes/items.routes.js` - להגדיר route שמחזיר HTML
- 8. `server/routes/items.routes.js` - לשרת קבצים סטטיים
- 9. `server/routes/items.routes.js` - למפות URL נכון
- 10. `server/routes/items.routes.js` - לבנות controlled inputs
- 11. `server/routes/items.routes.js` - להגדיר select/options
- 12. `server/routes/items.routes.js` - לחבר submit button
- 13. `server/routes/items.routes.js` - לכתוב חוקי regex/טווח
- 14. `server/routes/items.routes.js` - לחסום שליחה לא תקינה
- 15. `server/routes/items.routes.js` - להציג שגיאה ברורה למשתמש
- 16. `server/routes/items.routes.js` - להגדיר routes במסך
- 17. `server/routes/items.routes.js` - לבצע redirect לאחר פעולה
- 18. `server/routes/items.routes.js` - לשמור UX עקבי
- 19. `server/routes/items.routes.js` - למפות מערך לרכיבים
- 20. `server/routes/items.routes.js` - להציג שדות נדרשים
- 21. `server/routes/items.routes.js` - למיין תצוגה לפי כלל
- 22. `server/routes/items.routes.js` - לעטוף פעולות ב-try/catch
- 23. `server/routes/items.routes.js` - להחזיר/להציג הודעת שגיאה
- 24. `server/routes/items.routes.js` - לא להסתיר כשלונות

**רובריקת 100 פנימית:**
- 25 נק׳ - Route/method/status code נכונים: ה-endpoint מתאים לדרישה ומחזיר 200/201/400/404/500 לפי מצב.
- 20 נק׳ - Validation של body/query/params: אין כניסה לא תקינה שממשיכה לפעולת DB או response שגוי.
- 25 נק׳ - פעולת data/DB נכונה: find/create/update/delete או persistence מתבצעים במקום הנכון.
- 15 נק׳ - Error handling: try/catch או טיפול כשל ברור בלי להסתיר שגיאות.
- 15 נק׳ - חיבור ל-client והודעה מובנת: התגובה חוזרת JSON ברור שהממשק יודע להציג.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 49 - עותק של מבחן מחשבון המרה.docx / Q2.main

> שאלה 2. יש לכתוב פונקציה בJS. הפונקציה צריכה לקבל 3 ערכים. – ערך סופי ו2 ערכים התחלתיים. הפונקציה צריכה להחזיר את מיקום הסדרה של הערך הסופי לפי סדרת פיבונצ'י. סדרת פיבונצ'י הינה סדרת מספרים שהחוקיות שלה שכל איבר הינו סכום של 2 האיברים שקודמים לו. לדוגמא: 0,1,1,2,3,5,8,13… דוגמא לפונקציה זו. אם הפונקציה קיבלה 2 , 5 , 19 הפונקציה תחזיר 5 מכיוון שהסדרה הינה 2,5,7,12,19 = 5

- סטטוס: ready
- ענפים: backend_api_routes, js_problem_solving
- משימות מקור: api_get_filtered, js_algorithms

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.
  - `src/utils/algorithms.js` - הקובץ שבו כותבים פונקציות JS טהורות.
  - `src/utils/algorithms.test.js` - בדיקות קלט תקין, קלט לא תקין ו-edge cases.

**תתי־משימות טכניות:**
- 1. `server/routes/items.routes.js` - לקבל פרמטר/ערך סינון
- 2. `server/routes/items.routes.js` - לסנן נתונים ללא mutation
- 3. `server/routes/items.routes.js` - להחזיר תוצאה ריקה/תקינה
- 4. `server/routes/items.routes.js` - לזהות קלט/פלט
- 5. `server/routes/items.routes.js` - לממש אלגוריתם
- 6. `server/routes/items.routes.js` - להחזיר מבנה נתונים מדויק

**רובריקת 100 פנימית:**
- 25 נק׳ - בדיקת קלט ו-Error לפי דרישה: הפונקציה דוחה קלט לא תקין בצורה מפורשת.
- 35 נק׳ - אלגוריתם נכון לכל מקרי הבסיס: הלוגיקה מחזירה את הערך הנכון בלי mutation לא נדרש.
- 20 נק׳ - Edge cases: נבדקים מערך ריק, טיפוסים לא נכונים וערכים גבוליים.
- 20 נק׳ - פלט נקי והסבר קצר: הקוד קריא והסטודנט יודע להסביר כל שורה מרכזית.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 50 - עותק של מבחן פולסטאק מועד ב 2022.pdf / Q1.main

> שאלה 1 – 40 נקודות.

- סטטוס: manual_review
- ענפים: scope_meta
- משימות מקור: manual_review

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `docs/source-review.md` - סעיף שמחייב עיון ידני במקור לפני ציון אוטומטי.
  - `README.md` - תיעוד החלטת עיון ידני, מקור הסעיף ומה חסר לפירוק טכני.

**תתי־משימות טכניות:**
- 1. `docs/source-review.md` - עיון ידני במקור

**רובריקת 100 פנימית:**
- 100 נק׳ - עיון ידני במקור לפני ציון: הסעיף סומן manual_review ולכן אין ציון אוטומטי עד פירוק טכני מלא.

**איך לקבל 100:**
- לפתוח את המקור המדויק ולחלץ דרישה טכנית מלאה.
- לא לתת ציון אוטומטי עד שיש קלט, פלט, קובץ יעד ו-Gate מעבר.

**מעבר ל-100:**
- להוסיף evidence מהמקור אחרי עיון ידני.

### סעיף 51 - עותק של מבחן פולסטאק מועד ב 2022.pdf / Q2.main

> שאלה 2 - 35 נקודות

- סטטוס: manual_review
- ענפים: scope_meta
- משימות מקור: manual_review

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `docs/source-review.md` - סעיף שמחייב עיון ידני במקור לפני ציון אוטומטי.
  - `README.md` - תיעוד החלטת עיון ידני, מקור הסעיף ומה חסר לפירוק טכני.

**תתי־משימות טכניות:**
- 1. `docs/source-review.md` - עיון ידני במקור

**רובריקת 100 פנימית:**
- 100 נק׳ - עיון ידני במקור לפני ציון: הסעיף סומן manual_review ולכן אין ציון אוטומטי עד פירוק טכני מלא.

**איך לקבל 100:**
- לפתוח את המקור המדויק ולחלץ דרישה טכנית מלאה.
- לא לתת ציון אוטומטי עד שיש קלט, פלט, קובץ יעד ו-Gate מעבר.

**מעבר ל-100:**
- להוסיף evidence מהמקור אחרי עיון ידני.

### סעיף 52 - עותק של מבחן פולסטאק מועד ב 2022.pdf / Q3.1

> 1. כותרת להתנדבות – אינפוט טקסט אשר מכיל עד 20 תווים. מטרתו לתאר את ההתנדבות

- סטטוס: ready
- ענפים: frontend_ui_validation
- משימות מקור: client_form_inputs, client_validation_rules

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `src/App.jsx` - מחבר routes, state ראשי וקומפוננטות המסלול.
  - `src/components/ExamForm.jsx` - הקובץ שבו בונים את הטופס, ה-inputs וה-submit.
  - `src/utils/validation.js` - פונקציות validation טהורות שחוזרות עם errors לפי שדה.
  - `src/services/api.js` - קריאות fetch לשרת אחרי validation תקין.

**תתי־משימות טכניות:**
- 1. `src/components/ExamForm.jsx` - לבנות controlled inputs
- 2. `src/components/ExamForm.jsx` - להגדיר select/options
- 3. `src/components/ExamForm.jsx` - לחבר submit button
- 4. `src/components/ExamForm.jsx` - לכתוב חוקי regex/טווח
- 5. `src/components/ExamForm.jsx` - לחסום שליחה לא תקינה
- 6. `src/components/ExamForm.jsx` - להציג שגיאה ברורה למשתמש

**רובריקת 100 פנימית:**
- 25 נק׳ - מבנה React נכון: state/props/components מחולקים לקבצים הנכונים.
- 25 נק׳ - Inputs/actions/submit: כל פעולה שהסעיף דורש קיימת במסך.
- 20 נק׳ - Validation והודעות שגיאה: המשתמש מקבל הודעה ברורה לפני שליחה לא תקינה.
- 15 נק׳ - Integration מול API/route: fetch/navigate/render מתבצעים רק אחרי פעולה תקינה.
- 15 נק׳ - UI יציב ונגיש: אין overflow, יש labels, והזרימה מובנת.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 53 - עותק של מבחן פולסטאק מועד ב 2022.pdf / Q3.2

> 2. מיקום ההתנדבות – שם של עיר, חייב לכלול אותיות באנגלית בלבד ללא מספרים רווחים או כל סימן

- סטטוס: ready
- ענפים: frontend_ui_validation
- משימות מקור: client_validation_rules

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `src/App.jsx` - מחבר routes, state ראשי וקומפוננטות המסלול.
  - `src/components/ExamForm.jsx` - הקובץ שבו בונים את הטופס, ה-inputs וה-submit.
  - `src/utils/validation.js` - פונקציות validation טהורות שחוזרות עם errors לפי שדה.
  - `src/services/api.js` - קריאות fetch לשרת אחרי validation תקין.

**תתי־משימות טכניות:**
- 1. `src/components/ExamForm.jsx` - לכתוב חוקי regex/טווח
- 2. `src/components/ExamForm.jsx` - לחסום שליחה לא תקינה
- 3. `src/components/ExamForm.jsx` - להציג שגיאה ברורה למשתמש

**רובריקת 100 פנימית:**
- 25 נק׳ - מבנה React נכון: state/props/components מחולקים לקבצים הנכונים.
- 25 נק׳ - Inputs/actions/submit: כל פעולה שהסעיף דורש קיימת במסך.
- 20 נק׳ - Validation והודעות שגיאה: המשתמש מקבל הודעה ברורה לפני שליחה לא תקינה.
- 15 נק׳ - Integration מול API/route: fetch/navigate/render מתבצעים רק אחרי פעולה תקינה.
- 15 נק׳ - UI יציב ונגיש: אין overflow, יש labels, והזרימה מובנת.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 54 - עותק של מבחן פולסטאק מועד ב 2022.pdf / Q3.3

> 3. תיאור ההתנדבות – מכיל עד 200 תווים, תיאור של ההתנדבות

- סטטוס: ready
- ענפים: frontend_ui_validation
- משימות מקור: client_validation_rules

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `src/App.jsx` - מחבר routes, state ראשי וקומפוננטות המסלול.
  - `src/components/ExamForm.jsx` - הקובץ שבו בונים את הטופס, ה-inputs וה-submit.
  - `src/utils/validation.js` - פונקציות validation טהורות שחוזרות עם errors לפי שדה.
  - `src/services/api.js` - קריאות fetch לשרת אחרי validation תקין.

**תתי־משימות טכניות:**
- 1. `src/components/ExamForm.jsx` - לכתוב חוקי regex/טווח
- 2. `src/components/ExamForm.jsx` - לחסום שליחה לא תקינה
- 3. `src/components/ExamForm.jsx` - להציג שגיאה ברורה למשתמש

**רובריקת 100 פנימית:**
- 25 נק׳ - מבנה React נכון: state/props/components מחולקים לקבצים הנכונים.
- 25 נק׳ - Inputs/actions/submit: כל פעולה שהסעיף דורש קיימת במסך.
- 20 נק׳ - Validation והודעות שגיאה: המשתמש מקבל הודעה ברורה לפני שליחה לא תקינה.
- 15 נק׳ - Integration מול API/route: fetch/navigate/render מתבצעים רק אחרי פעולה תקינה.
- 15 נק׳ - UI יציב ונגיש: אין overflow, יש labels, והזרימה מובנת.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 55 - עותק של מבחן פולסטאק מועד ב 2022.pdf / Q3.4

> 4. כפתור יצירת התנדבות חדשה מוודא את תקינות השדות, במידה והכל תקין מחזיר את הלקוח לעמוד הראשי, במידה ואחד הערכים לא תקין שולח ALERT עם התקלה. עמוד "מצא התנדבות" - תחת הערוץ ,/find , עמוד זה פותח 3 אלמנטים

- סטטוס: ready
- ענפים: frontend_ui_validation, backend_api_routes
- משימות מקור: server_html_route, client_form_inputs, client_navigation, alerts_error_handling

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.
  - `src/App.jsx` - מחבר routes, state ראשי וקומפוננטות המסלול.
  - `src/components/ExamForm.jsx` - הקובץ שבו בונים את הטופס, ה-inputs וה-submit.
  - `src/utils/validation.js` - פונקציות validation טהורות שחוזרות עם errors לפי שדה.
  - `src/services/api.js` - קריאות fetch לשרת אחרי validation תקין.
  - `src/pages/AddItemPage.jsx` - הקובץ שבו מבצעים create ואז navigate.

**תתי־משימות טכניות:**
- 1. `server/routes/items.routes.js` - להגדיר route שמחזיר HTML
- 2. `server/routes/items.routes.js` - לשרת קבצים סטטיים
- 3. `server/routes/items.routes.js` - למפות URL נכון
- 4. `server/routes/items.routes.js` - לבנות controlled inputs
- 5. `server/routes/items.routes.js` - להגדיר select/options
- 6. `server/routes/items.routes.js` - לחבר submit button
- 7. `server/routes/items.routes.js` - להגדיר routes במסך
- 8. `server/routes/items.routes.js` - לבצע redirect לאחר פעולה
- 9. `server/routes/items.routes.js` - לשמור UX עקבי
- 10. `server/routes/items.routes.js` - לעטוף פעולות ב-try/catch
- 11. `server/routes/items.routes.js` - להחזיר/להציג הודעת שגיאה
- 12. `server/routes/items.routes.js` - לא להסתיר כשלונות

**רובריקת 100 פנימית:**
- 25 נק׳ - Route/method/status code נכונים: ה-endpoint מתאים לדרישה ומחזיר 200/201/400/404/500 לפי מצב.
- 20 נק׳ - Validation של body/query/params: אין כניסה לא תקינה שממשיכה לפעולת DB או response שגוי.
- 25 נק׳ - פעולת data/DB נכונה: find/create/update/delete או persistence מתבצעים במקום הנכון.
- 15 נק׳ - Error handling: try/catch או טיפול כשל ברור בלי להסתיר שגיאות.
- 15 נק׳ - חיבור ל-client והודעה מובנת: התגובה חוזרת JSON ברור שהממשק יודע להציג.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 56 - עותק של מבחן פולסטאק מועד ב 2022.pdf / Q3.1

> 1. תיבת טקסט, לקבלת שם המתנדב )מקבל כל ערך שאורכו גדול מ 2 (

- סטטוס: ready
- ענפים: frontend_ui_validation, backend_api_routes, data_persistence, scope_meta
- משימות מקור: question_scope_inherited, alerts_error_handling, api_delete, api_get_all, api_get_filtered, api_post_create, client_form_inputs, client_list_render, client_navigation, client_validation_rules, db_persistence, server_html_route

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `docs/exam-answer.md` - תשובה מילולית במבנה מה/למה/דוגמה/טעות.
  - `README.md` - סיכום החלטות ורשימת קבצים רלוונטיים לתרגיל.
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.
  - `src/App.jsx` - מחבר routes, state ראשי וקומפוננטות המסלול.
  - `src/components/ExamForm.jsx` - הקובץ שבו בונים את הטופס, ה-inputs וה-submit.
  - `src/utils/validation.js` - פונקציות validation טהורות שחוזרות עם errors לפי שדה.
  - `src/services/api.js` - קריאות fetch לשרת אחרי validation תקין.
  - `src/components/ItemsList.jsx` - הקובץ שבו כותבים map, filter ו-key יציב.
  - `src/components/SearchBox.jsx` - שדה חיפוש נשלט שמעדכן query.
  - `src/pages/AddItemPage.jsx` - הקובץ שבו מבצעים create ואז navigate.
  - `server/config/db.js` - חיבור Mongoose עם MONGO_URI מהסביבה.

**תתי־משימות טכניות:**
- 1. `docs/exam-answer.md` - זה סעיף כותרת/מעטפת
- 2. `docs/exam-answer.md` - להחיל את כל משימות תתי-הסעיפים של אותה שאלה
- 3. `docs/exam-answer.md` - לבנות תוכנית עבודה לפי תתי-הסעיפים בפועל
- 4. `docs/exam-answer.md` - לעטוף פעולות ב-try/catch
- 5. `docs/exam-answer.md` - להחזיר/להציג הודעת שגיאה
- 6. `docs/exam-answer.md` - לא להסתיר כשלונות
- 7. `docs/exam-answer.md` - לאתר רשומה למחיקה
- 8. `docs/exam-answer.md` - למחוק בפועל
- 9. `docs/exam-answer.md` - להחזיר הודעת הצלחה/שגיאה
- 10. `docs/exam-answer.md` - להגדיר route GET
- 11. `docs/exam-answer.md` - למשוך נתונים מהאחסון
- 12. `docs/exam-answer.md` - להחזיר JSON + status 200
- 13. `docs/exam-answer.md` - לקבל פרמטר/ערך סינון
- 14. `docs/exam-answer.md` - לסנן נתונים ללא mutation
- 15. `docs/exam-answer.md` - להחזיר תוצאה ריקה/תקינה
- 16. `docs/exam-answer.md` - לקרוא req.body
- 17. `docs/exam-answer.md` - לבצע ולידציה
- 18. `docs/exam-answer.md` - להחזיר 201 או שגיאה מתאימה
- 19. `docs/exam-answer.md` - לבנות controlled inputs
- 20. `docs/exam-answer.md` - להגדיר select/options
- 21. `docs/exam-answer.md` - לחבר submit button
- 22. `docs/exam-answer.md` - למפות מערך לרכיבים
- 23. `docs/exam-answer.md` - להציג שדות נדרשים
- 24. `docs/exam-answer.md` - למיין תצוגה לפי כלל
- 25. `docs/exam-answer.md` - להגדיר routes במסך
- 26. `docs/exam-answer.md` - לבצע redirect לאחר פעולה
- 27. `docs/exam-answer.md` - לשמור UX עקבי
- 28. `docs/exam-answer.md` - לכתוב חוקי regex/טווח
- 29. `docs/exam-answer.md` - לחסום שליחה לא תקינה
- 30. `docs/exam-answer.md` - להציג שגיאה ברורה למשתמש
- 31. `docs/exam-answer.md` - להתחבר ל-DB
- 32. `docs/exam-answer.md` - לבצע CRUD
- 33. `docs/exam-answer.md` - לנהל שגיאות DB
- 34. `docs/exam-answer.md` - להגדיר route שמחזיר HTML
- 35. `docs/exam-answer.md` - לשרת קבצים סטטיים
- 36. `docs/exam-answer.md` - למפות URL נכון

**רובריקת 100 פנימית:**
- 25 נק׳ - Route/method/status code נכונים: ה-endpoint מתאים לדרישה ומחזיר 200/201/400/404/500 לפי מצב.
- 20 נק׳ - Validation של body/query/params: אין כניסה לא תקינה שממשיכה לפעולת DB או response שגוי.
- 25 נק׳ - פעולת data/DB נכונה: find/create/update/delete או persistence מתבצעים במקום הנכון.
- 15 נק׳ - Error handling: try/catch או טיפול כשל ברור בלי להסתיר שגיאות.
- 15 נק׳ - חיבור ל-client והודעה מובנת: התגובה חוזרת JSON ברור שהממשק יודע להציג.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 57 - עותק של מבחן פולסטאק מועד ב 2022.pdf / Q3.2

> 2. רשימת ערים )select ( עם כל הערים של ההתנדבויות )אין להציג עיר יותר מפעם אחת(

- סטטוס: ready
- ענפים: frontend_ui_validation
- משימות מקור: client_form_inputs

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `src/App.jsx` - מחבר routes, state ראשי וקומפוננטות המסלול.
  - `src/components/ExamForm.jsx` - הקובץ שבו בונים את הטופס, ה-inputs וה-submit.
  - `src/utils/validation.js` - פונקציות validation טהורות שחוזרות עם errors לפי שדה.
  - `src/services/api.js` - קריאות fetch לשרת אחרי validation תקין.

**תתי־משימות טכניות:**
- 1. `src/components/ExamForm.jsx` - לבנות controlled inputs
- 2. `src/components/ExamForm.jsx` - להגדיר select/options
- 3. `src/components/ExamForm.jsx` - לחבר submit button

**רובריקת 100 פנימית:**
- 25 נק׳ - מבנה React נכון: state/props/components מחולקים לקבצים הנכונים.
- 25 נק׳ - Inputs/actions/submit: כל פעולה שהסעיף דורש קיימת במסך.
- 20 נק׳ - Validation והודעות שגיאה: המשתמש מקבל הודעה ברורה לפני שליחה לא תקינה.
- 15 נק׳ - Integration מול API/route: fetch/navigate/render מתבצעים רק אחרי פעולה תקינה.
- 15 נק׳ - UI יציב ונגיש: אין overflow, יש labels, והזרימה מובנת.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 58 - עותק של מבחן פולסטאק מועד ב 2022.pdf / Q3.3

> 3. כפתור חפש – כפתור אשר מציג רשימה של כל ההתנדבויות באותו אזור *במידה ולא נבחר שם תקין יש להציג ALERT מתאים. במידה והכל תקין הדפדפן מעביר את הלקוח לערוץ חדש בשם '/all ' בערוץ זה מוצגות בפני הלקוח כל אפשרויות ההתנדבות בהתאם לעיר שבחר. כל התנדבות מוצגת רק ע"י כותרת ההתנדבות. לחיצה עליה תסמן את רקע ההתנדבות בצבע ירוק בהיר תציג את התיאור שלה, לחיצה נוספת תעלים )toggle ( ותחזיר את הרקע ללבן. בסוף העמוד ישנו כפתור אישור, כל התנדבות שנבחרה)רקע הפך לירוק( תמחק מרשימת ההתנדבויות והלקוח יחזור לעמוד הראשי. 4 שאלה שניה - Javascript צרו פונקציה שתקבל מערך של מספרים שלמים. הפונקציה תבדוק את המספרים אם הם זוגיים, אי-זוגיים ואת כמות האיברים במערך . במידה ואחד האיברים במערך אינו מספר תזרוק שגיאה. במידה ומספר קיים כמה פעמים במערך, הפונקציה לא תבדוק את כולם אלא רק אחד מהם ותכניסו למאפיין המתאים באובייקט . הפונקציה צריכה להחזיר אובייקט שבו מופיעים even ,odd, total Even מקבל את כמות המספרים הזוגיים שנמצאו. Odd מקבל את כמות המספרים האי זוגיים שנמצאו. Total מקבל את כמות כלל המספרים שבמערך. לדוגמה: אם הפונקציה קיבלה את המערך הבא: const numbersArray = [6, 3, 3, 4, 13, 6, 7, 18, 7, 11]; הפונקציה תחזיר אובייקט: { even: 3, odd: 4, total: 10 } 5 שאלה שלישית - Server צד שרת: יש ליצור DB בMONGODB אשר מכיל רשימה של קורסים. לכל קורס המאפיינים הבאים: שם קורס, מספר תלמידים, שנת התחלה מתודות:

- סטטוס: ready
- ענפים: frontend_ui_validation, backend_api_routes, data_persistence
- משימות מקור: api_get_all, api_delete, db_persistence, server_html_route, client_form_inputs, client_navigation, client_list_render, alerts_error_handling

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.
  - `server/config/db.js` - חיבור Mongoose עם MONGO_URI מהסביבה.
  - `src/App.jsx` - מחבר routes, state ראשי וקומפוננטות המסלול.
  - `src/components/ExamForm.jsx` - הקובץ שבו בונים את הטופס, ה-inputs וה-submit.
  - `src/utils/validation.js` - פונקציות validation טהורות שחוזרות עם errors לפי שדה.
  - `src/services/api.js` - קריאות fetch לשרת אחרי validation תקין.
  - `src/pages/AddItemPage.jsx` - הקובץ שבו מבצעים create ואז navigate.
  - `src/components/ItemsList.jsx` - הקובץ שבו כותבים map, filter ו-key יציב.
  - `src/components/SearchBox.jsx` - שדה חיפוש נשלט שמעדכן query.

**תתי־משימות טכניות:**
- 1. `server/routes/items.routes.js` - להגדיר route GET
- 2. `server/routes/items.routes.js` - למשוך נתונים מהאחסון
- 3. `server/routes/items.routes.js` - להחזיר JSON + status 200
- 4. `server/routes/items.routes.js` - לאתר רשומה למחיקה
- 5. `server/routes/items.routes.js` - למחוק בפועל
- 6. `server/routes/items.routes.js` - להחזיר הודעת הצלחה/שגיאה
- 7. `server/routes/items.routes.js` - להתחבר ל-DB
- 8. `server/routes/items.routes.js` - לבצע CRUD
- 9. `server/routes/items.routes.js` - לנהל שגיאות DB
- 10. `server/routes/items.routes.js` - להגדיר route שמחזיר HTML
- 11. `server/routes/items.routes.js` - לשרת קבצים סטטיים
- 12. `server/routes/items.routes.js` - למפות URL נכון
- 13. `server/routes/items.routes.js` - לבנות controlled inputs
- 14. `server/routes/items.routes.js` - להגדיר select/options
- 15. `server/routes/items.routes.js` - לחבר submit button
- 16. `server/routes/items.routes.js` - להגדיר routes במסך
- 17. `server/routes/items.routes.js` - לבצע redirect לאחר פעולה
- 18. `server/routes/items.routes.js` - לשמור UX עקבי
- 19. `server/routes/items.routes.js` - למפות מערך לרכיבים
- 20. `server/routes/items.routes.js` - להציג שדות נדרשים
- 21. `server/routes/items.routes.js` - למיין תצוגה לפי כלל
- 22. `server/routes/items.routes.js` - לעטוף פעולות ב-try/catch
- 23. `server/routes/items.routes.js` - להחזיר/להציג הודעת שגיאה
- 24. `server/routes/items.routes.js` - לא להסתיר כשלונות

**רובריקת 100 פנימית:**
- 25 נק׳ - Route/method/status code נכונים: ה-endpoint מתאים לדרישה ומחזיר 200/201/400/404/500 לפי מצב.
- 20 נק׳ - Validation של body/query/params: אין כניסה לא תקינה שממשיכה לפעולת DB או response שגוי.
- 25 נק׳ - פעולת data/DB נכונה: find/create/update/delete או persistence מתבצעים במקום הנכון.
- 15 נק׳ - Error handling: try/catch או טיפול כשל ברור בלי להסתיר שגיאות.
- 15 נק׳ - חיבור ל-client והודעה מובנת: התגובה חוזרת JSON ברור שהממשק יודע להציג.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 59 - עותק של מבחן פולסטאק מועד ב 2022.pdf / Q3.1

> 1. GET , addnewcourse /, שולח את עמוד הHTML להזנת קורסים חדשים

- סטטוס: ready
- ענפים: backend_api_routes
- משימות מקור: api_get_all, api_post_create, server_html_route

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.

**תתי־משימות טכניות:**
- 1. `server/routes/items.routes.js` - להגדיר route GET
- 2. `server/routes/items.routes.js` - למשוך נתונים מהאחסון
- 3. `server/routes/items.routes.js` - להחזיר JSON + status 200
- 4. `server/routes/items.routes.js` - לקרוא req.body
- 5. `server/routes/items.routes.js` - לבצע ולידציה
- 6. `server/routes/items.routes.js` - להחזיר 201 או שגיאה מתאימה
- 7. `server/routes/items.routes.js` - להגדיר route שמחזיר HTML
- 8. `server/routes/items.routes.js` - לשרת קבצים סטטיים
- 9. `server/routes/items.routes.js` - למפות URL נכון

**רובריקת 100 פנימית:**
- 25 נק׳ - Route/method/status code נכונים: ה-endpoint מתאים לדרישה ומחזיר 200/201/400/404/500 לפי מצב.
- 20 נק׳ - Validation של body/query/params: אין כניסה לא תקינה שממשיכה לפעולת DB או response שגוי.
- 25 נק׳ - פעולת data/DB נכונה: find/create/update/delete או persistence מתבצעים במקום הנכון.
- 15 נק׳ - Error handling: try/catch או טיפול כשל ברור בלי להסתיר שגיאות.
- 15 נק׳ - חיבור ל-client והודעה מובנת: התגובה חוזרת JSON ברור שהממשק יודע להציג.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 60 - עותק של מבחן פולסטאק מועד ב 2022.pdf / Q3.2

> 2. POST ,/ add , מקבל את הפרטים מעמוד הHTML , מוודא שכל הנתונים התקבלו, ומוודא שכולם התקבלו בהצלחה, מוסיף את הקורס החדש לDB לאחר בדיקה שלא קיים בDB , במידה וכבר קיים, צריך להציג למשתמש בצד לקוח הודעה מתאימה ולשלוח סטאטוס מתאים! במידה ולא קיים להציג הודעת הצלחה למשתמש.

- סטטוס: ready
- ענפים: backend_api_routes
- משימות מקור: api_post_create

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.

**תתי־משימות טכניות:**
- 1. `server/routes/items.routes.js` - לקרוא req.body
- 2. `server/routes/items.routes.js` - לבצע ולידציה
- 3. `server/routes/items.routes.js` - להחזיר 201 או שגיאה מתאימה

**רובריקת 100 פנימית:**
- 25 נק׳ - Route/method/status code נכונים: ה-endpoint מתאים לדרישה ומחזיר 200/201/400/404/500 לפי מצב.
- 20 נק׳ - Validation של body/query/params: אין כניסה לא תקינה שממשיכה לפעולת DB או response שגוי.
- 25 נק׳ - פעולת data/DB נכונה: find/create/update/delete או persistence מתבצעים במקום הנכון.
- 15 נק׳ - Error handling: try/catch או טיפול כשל ברור בלי להסתיר שגיאות.
- 15 נק׳ - חיבור ל-client והודעה מובנת: התגובה חוזרת JSON ברור שהממשק יודע להציג.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 61 - עותק של מבחן פולסטאק מועד ב 2022.pdf / Q3.3

> 3. GET ערוץ ,all /, שולח לצד לקוח את כל הקורסים הקיימים בDB . צד לקוח: עמוד HTML אשר מכיל את האלמנטים הבאים:

- סטטוס: ready
- ענפים: frontend_ui_validation, backend_api_routes
- משימות מקור: api_get_all, server_html_route, client_navigation

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.
  - `src/App.jsx` - מגדיר BrowserRouter ו-Routes.
  - `src/pages/AddItemPage.jsx` - הקובץ שבו מבצעים create ואז navigate.
  - `src/services/api.js` - מבודד את קריאת ה-POST מהקומפוננטה.

**תתי־משימות טכניות:**
- 1. `server/routes/items.routes.js` - להגדיר route GET
- 2. `server/routes/items.routes.js` - למשוך נתונים מהאחסון
- 3. `server/routes/items.routes.js` - להחזיר JSON + status 200
- 4. `server/routes/items.routes.js` - להגדיר route שמחזיר HTML
- 5. `server/routes/items.routes.js` - לשרת קבצים סטטיים
- 6. `server/routes/items.routes.js` - למפות URL נכון
- 7. `server/routes/items.routes.js` - להגדיר routes במסך
- 8. `server/routes/items.routes.js` - לבצע redirect לאחר פעולה
- 9. `server/routes/items.routes.js` - לשמור UX עקבי

**רובריקת 100 פנימית:**
- 25 נק׳ - Route/method/status code נכונים: ה-endpoint מתאים לדרישה ומחזיר 200/201/400/404/500 לפי מצב.
- 20 נק׳ - Validation של body/query/params: אין כניסה לא תקינה שממשיכה לפעולת DB או response שגוי.
- 25 נק׳ - פעולת data/DB נכונה: find/create/update/delete או persistence מתבצעים במקום הנכון.
- 15 נק׳ - Error handling: try/catch או טיפול כשל ברור בלי להסתיר שגיאות.
- 15 נק׳ - חיבור ל-client והודעה מובנת: התגובה חוזרת JSON ברור שהממשק יודע להציג.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 62 - עותק של מבחן פולסטאק מועד ב 2022.pdf / Q3.1

> 1. אינפוט שם הקורס – תווים באנגלית בלבד, מקסימום של 15 תווים.

- סטטוס: ready
- ענפים: frontend_ui_validation
- משימות מקור: client_form_inputs, client_validation_rules

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `src/App.jsx` - מחבר routes, state ראשי וקומפוננטות המסלול.
  - `src/components/ExamForm.jsx` - הקובץ שבו בונים את הטופס, ה-inputs וה-submit.
  - `src/utils/validation.js` - פונקציות validation טהורות שחוזרות עם errors לפי שדה.
  - `src/services/api.js` - קריאות fetch לשרת אחרי validation תקין.

**תתי־משימות טכניות:**
- 1. `src/components/ExamForm.jsx` - לבנות controlled inputs
- 2. `src/components/ExamForm.jsx` - להגדיר select/options
- 3. `src/components/ExamForm.jsx` - לחבר submit button
- 4. `src/components/ExamForm.jsx` - לכתוב חוקי regex/טווח
- 5. `src/components/ExamForm.jsx` - לחסום שליחה לא תקינה
- 6. `src/components/ExamForm.jsx` - להציג שגיאה ברורה למשתמש

**רובריקת 100 פנימית:**
- 25 נק׳ - מבנה React נכון: state/props/components מחולקים לקבצים הנכונים.
- 25 נק׳ - Inputs/actions/submit: כל פעולה שהסעיף דורש קיימת במסך.
- 20 נק׳ - Validation והודעות שגיאה: המשתמש מקבל הודעה ברורה לפני שליחה לא תקינה.
- 15 נק׳ - Integration מול API/route: fetch/navigate/render מתבצעים רק אחרי פעולה תקינה.
- 15 נק׳ - UI יציב ונגיש: אין overflow, יש labels, והזרימה מובנת.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 63 - עותק של מבחן פולסטאק מועד ב 2022.pdf / Q3.2

> 2. אינפוט מספר תלמידים – מספרים בלבד – עד 20 .

- סטטוס: ready
- ענפים: frontend_ui_validation
- משימות מקור: client_form_inputs, client_validation_rules

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `src/App.jsx` - מחבר routes, state ראשי וקומפוננטות המסלול.
  - `src/components/ExamForm.jsx` - הקובץ שבו בונים את הטופס, ה-inputs וה-submit.
  - `src/utils/validation.js` - פונקציות validation טהורות שחוזרות עם errors לפי שדה.
  - `src/services/api.js` - קריאות fetch לשרת אחרי validation תקין.

**תתי־משימות טכניות:**
- 1. `src/components/ExamForm.jsx` - לבנות controlled inputs
- 2. `src/components/ExamForm.jsx` - להגדיר select/options
- 3. `src/components/ExamForm.jsx` - לחבר submit button
- 4. `src/components/ExamForm.jsx` - לכתוב חוקי regex/טווח
- 5. `src/components/ExamForm.jsx` - לחסום שליחה לא תקינה
- 6. `src/components/ExamForm.jsx` - להציג שגיאה ברורה למשתמש

**רובריקת 100 פנימית:**
- 25 נק׳ - מבנה React נכון: state/props/components מחולקים לקבצים הנכונים.
- 25 נק׳ - Inputs/actions/submit: כל פעולה שהסעיף דורש קיימת במסך.
- 20 נק׳ - Validation והודעות שגיאה: המשתמש מקבל הודעה ברורה לפני שליחה לא תקינה.
- 15 נק׳ - Integration מול API/route: fetch/navigate/render מתבצעים רק אחרי פעולה תקינה.
- 15 נק׳ - UI יציב ונגיש: אין overflow, יש labels, והזרימה מובנת.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 64 - עותק של מבחן פולסטאק מועד ב 2022.pdf / Q3.3

> 3. אינפוט שנת ההתחלה – שנה תקינה ) 4 ספרות(

- סטטוס: ready
- ענפים: frontend_ui_validation
- משימות מקור: client_form_inputs

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `src/App.jsx` - מחבר routes, state ראשי וקומפוננטות המסלול.
  - `src/components/ExamForm.jsx` - הקובץ שבו בונים את הטופס, ה-inputs וה-submit.
  - `src/utils/validation.js` - פונקציות validation טהורות שחוזרות עם errors לפי שדה.
  - `src/services/api.js` - קריאות fetch לשרת אחרי validation תקין.

**תתי־משימות טכניות:**
- 1. `src/components/ExamForm.jsx` - לבנות controlled inputs
- 2. `src/components/ExamForm.jsx` - להגדיר select/options
- 3. `src/components/ExamForm.jsx` - לחבר submit button

**רובריקת 100 פנימית:**
- 25 נק׳ - מבנה React נכון: state/props/components מחולקים לקבצים הנכונים.
- 25 נק׳ - Inputs/actions/submit: כל פעולה שהסעיף דורש קיימת במסך.
- 20 נק׳ - Validation והודעות שגיאה: המשתמש מקבל הודעה ברורה לפני שליחה לא תקינה.
- 15 נק׳ - Integration מול API/route: fetch/navigate/render מתבצעים רק אחרי פעולה תקינה.
- 15 נק׳ - UI יציב ונגיש: אין overflow, יש labels, והזרימה מובנת.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 65 - עותק של מבחן פולסטאק מועד ב 2022.pdf / Q3.4

> 4. כפתור יצירה ששולח את הפרטים בPost לשרת.

- סטטוס: ready
- ענפים: frontend_ui_validation, backend_api_routes
- משימות מקור: api_post_create, client_form_inputs

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.
  - `src/App.jsx` - מחבר routes, state ראשי וקומפוננטות המסלול.
  - `src/components/ExamForm.jsx` - הקובץ שבו בונים את הטופס, ה-inputs וה-submit.
  - `src/utils/validation.js` - פונקציות validation טהורות שחוזרות עם errors לפי שדה.
  - `src/services/api.js` - קריאות fetch לשרת אחרי validation תקין.

**תתי־משימות טכניות:**
- 1. `server/routes/items.routes.js` - לקרוא req.body
- 2. `server/routes/items.routes.js` - לבצע ולידציה
- 3. `server/routes/items.routes.js` - להחזיר 201 או שגיאה מתאימה
- 4. `server/routes/items.routes.js` - לבנות controlled inputs
- 5. `server/routes/items.routes.js` - להגדיר select/options
- 6. `server/routes/items.routes.js` - לחבר submit button

**רובריקת 100 פנימית:**
- 25 נק׳ - Route/method/status code נכונים: ה-endpoint מתאים לדרישה ומחזיר 200/201/400/404/500 לפי מצב.
- 20 נק׳ - Validation של body/query/params: אין כניסה לא תקינה שממשיכה לפעולת DB או response שגוי.
- 25 נק׳ - פעולת data/DB נכונה: find/create/update/delete או persistence מתבצעים במקום הנכון.
- 15 נק׳ - Error handling: try/catch או טיפול כשל ברור בלי להסתיר שגיאות.
- 15 נק׳ - חיבור ל-client והודעה מובנת: התגובה חוזרת JSON ברור שהממשק יודע להציג.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 66 - עותק של מבחן פולסטאק מועד ב 2022.pdf / Q3.5

> 5. כפתור הצגת כל הקורסים – ימשוך את כל הקורסים הקיימים בDB ויציג אותם בHTML ממויין לפי הabc בסדר עולה לפי שם הקורס.

- סטטוס: ready
- ענפים: frontend_ui_validation, backend_api_routes
- משימות מקור: api_get_filtered, client_form_inputs, client_list_render

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.
  - `src/App.jsx` - מחבר routes, state ראשי וקומפוננטות המסלול.
  - `src/components/ExamForm.jsx` - הקובץ שבו בונים את הטופס, ה-inputs וה-submit.
  - `src/utils/validation.js` - פונקציות validation טהורות שחוזרות עם errors לפי שדה.
  - `src/services/api.js` - קריאות fetch לשרת אחרי validation תקין.
  - `src/components/ItemsList.jsx` - הקובץ שבו כותבים map, filter ו-key יציב.
  - `src/components/SearchBox.jsx` - שדה חיפוש נשלט שמעדכן query.

**תתי־משימות טכניות:**
- 1. `server/routes/items.routes.js` - לקבל פרמטר/ערך סינון
- 2. `server/routes/items.routes.js` - לסנן נתונים ללא mutation
- 3. `server/routes/items.routes.js` - להחזיר תוצאה ריקה/תקינה
- 4. `server/routes/items.routes.js` - לבנות controlled inputs
- 5. `server/routes/items.routes.js` - להגדיר select/options
- 6. `server/routes/items.routes.js` - לחבר submit button
- 7. `server/routes/items.routes.js` - למפות מערך לרכיבים
- 8. `server/routes/items.routes.js` - להציג שדות נדרשים
- 9. `server/routes/items.routes.js` - למיין תצוגה לפי כלל

**רובריקת 100 פנימית:**
- 25 נק׳ - Route/method/status code נכונים: ה-endpoint מתאים לדרישה ומחזיר 200/201/400/404/500 לפי מצב.
- 20 נק׳ - Validation של body/query/params: אין כניסה לא תקינה שממשיכה לפעולת DB או response שגוי.
- 25 נק׳ - פעולת data/DB נכונה: find/create/update/delete או persistence מתבצעים במקום הנכון.
- 15 נק׳ - Error handling: try/catch או טיפול כשל ברור בלי להסתיר שגיאות.
- 15 נק׳ - חיבור ל-client והודעה מובנת: התגובה חוזרת JSON ברור שהממשק יודע להציג.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 67 - עותק של מבחן פולסטאק מועד ג.pdf / Q1.1

> 1. איזור יהיה בין 2-100 תווים )אותיות באנגלית בלבד(

- סטטוס: ready
- ענפים: frontend_ui_validation
- משימות מקור: client_validation_rules

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `src/App.jsx` - מחבר routes, state ראשי וקומפוננטות המסלול.
  - `src/components/ExamForm.jsx` - הקובץ שבו בונים את הטופס, ה-inputs וה-submit.
  - `src/utils/validation.js` - פונקציות validation טהורות שחוזרות עם errors לפי שדה.
  - `src/services/api.js` - קריאות fetch לשרת אחרי validation תקין.

**תתי־משימות טכניות:**
- 1. `src/components/ExamForm.jsx` - לכתוב חוקי regex/טווח
- 2. `src/components/ExamForm.jsx` - לחסום שליחה לא תקינה
- 3. `src/components/ExamForm.jsx` - להציג שגיאה ברורה למשתמש

**רובריקת 100 פנימית:**
- 25 נק׳ - מבנה React נכון: state/props/components מחולקים לקבצים הנכונים.
- 25 נק׳ - Inputs/actions/submit: כל פעולה שהסעיף דורש קיימת במסך.
- 20 נק׳ - Validation והודעות שגיאה: המשתמש מקבל הודעה ברורה לפני שליחה לא תקינה.
- 15 נק׳ - Integration מול API/route: fetch/navigate/render מתבצעים רק אחרי פעולה תקינה.
- 15 נק׳ - UI יציב ונגיש: אין overflow, יש labels, והזרימה מובנת.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 68 - עותק של מבחן פולסטאק מועד ג.pdf / Q1.2

> 2. תיאור יהיה כל מחרוזת עד 200 תווים

- סטטוס: ready
- ענפים: frontend_ui_validation
- משימות מקור: client_validation_rules

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `src/App.jsx` - מחבר routes, state ראשי וקומפוננטות המסלול.
  - `src/components/ExamForm.jsx` - הקובץ שבו בונים את הטופס, ה-inputs וה-submit.
  - `src/utils/validation.js` - פונקציות validation טהורות שחוזרות עם errors לפי שדה.
  - `src/services/api.js` - קריאות fetch לשרת אחרי validation תקין.

**תתי־משימות טכניות:**
- 1. `src/components/ExamForm.jsx` - לכתוב חוקי regex/טווח
- 2. `src/components/ExamForm.jsx` - לחסום שליחה לא תקינה
- 3. `src/components/ExamForm.jsx` - להציג שגיאה ברורה למשתמש

**רובריקת 100 פנימית:**
- 25 נק׳ - מבנה React נכון: state/props/components מחולקים לקבצים הנכונים.
- 25 נק׳ - Inputs/actions/submit: כל פעולה שהסעיף דורש קיימת במסך.
- 20 נק׳ - Validation והודעות שגיאה: המשתמש מקבל הודעה ברורה לפני שליחה לא תקינה.
- 15 נק׳ - Integration מול API/route: fetch/navigate/render מתבצעים רק אחרי פעולה תקינה.
- 15 נק׳ - UI יציב ונגיש: אין overflow, יש labels, והזרימה מובנת.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 69 - עותק של מבחן פולסטאק מועד ג.pdf / Q1.3

> 3. ימים יאפשר להזין רק מספרים בין 1-100

- סטטוס: ready
- ענפים: frontend_ui_validation
- משימות מקור: client_validation_rules

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `src/App.jsx` - מחבר routes, state ראשי וקומפוננטות המסלול.
  - `src/components/ExamForm.jsx` - הקובץ שבו בונים את הטופס, ה-inputs וה-submit.
  - `src/utils/validation.js` - פונקציות validation טהורות שחוזרות עם errors לפי שדה.
  - `src/services/api.js` - קריאות fetch לשרת אחרי validation תקין.

**תתי־משימות טכניות:**
- 1. `src/components/ExamForm.jsx` - לכתוב חוקי regex/טווח
- 2. `src/components/ExamForm.jsx` - לחסום שליחה לא תקינה
- 3. `src/components/ExamForm.jsx` - להציג שגיאה ברורה למשתמש

**רובריקת 100 פנימית:**
- 25 נק׳ - מבנה React נכון: state/props/components מחולקים לקבצים הנכונים.
- 25 נק׳ - Inputs/actions/submit: כל פעולה שהסעיף דורש קיימת במסך.
- 20 נק׳ - Validation והודעות שגיאה: המשתמש מקבל הודעה ברורה לפני שליחה לא תקינה.
- 15 נק׳ - Integration מול API/route: fetch/navigate/render מתבצעים רק אחרי פעולה תקינה.
- 15 נק׳ - UI יציב ונגיש: אין overflow, יש labels, והזרימה מובנת.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 70 - עותק של מבחן פולסטאק מועד ג.pdf / Q1.4

> 4. שמות, כל שם יהיה באורך של עד 15 תווים, ללא תוים מיוחדים, יהיה ניתן להוסיף כמה אנשים באמצעות כפתור ה+

- סטטוס: ready
- ענפים: frontend_ui_validation
- משימות מקור: client_form_inputs, client_validation_rules

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `src/App.jsx` - מחבר routes, state ראשי וקומפוננטות המסלול.
  - `src/components/ExamForm.jsx` - הקובץ שבו בונים את הטופס, ה-inputs וה-submit.
  - `src/utils/validation.js` - פונקציות validation טהורות שחוזרות עם errors לפי שדה.
  - `src/services/api.js` - קריאות fetch לשרת אחרי validation תקין.

**תתי־משימות טכניות:**
- 1. `src/components/ExamForm.jsx` - לבנות controlled inputs
- 2. `src/components/ExamForm.jsx` - להגדיר select/options
- 3. `src/components/ExamForm.jsx` - לחבר submit button
- 4. `src/components/ExamForm.jsx` - לכתוב חוקי regex/טווח
- 5. `src/components/ExamForm.jsx` - לחסום שליחה לא תקינה
- 6. `src/components/ExamForm.jsx` - להציג שגיאה ברורה למשתמש

**רובריקת 100 פנימית:**
- 25 נק׳ - מבנה React נכון: state/props/components מחולקים לקבצים הנכונים.
- 25 נק׳ - Inputs/actions/submit: כל פעולה שהסעיף דורש קיימת במסך.
- 20 נק׳ - Validation והודעות שגיאה: המשתמש מקבל הודעה ברורה לפני שליחה לא תקינה.
- 15 נק׳ - Integration מול API/route: fetch/navigate/render מתבצעים רק אחרי פעולה תקינה.
- 15 נק׳ - UI יציב ונגיש: אין overflow, יש labels, והזרימה מובנת.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 71 - עותק של מבחן פולסטאק מועד ג.pdf / Q1.5

> 5. כפתור "אישור" ישנה את שמו בהתאם לערוץ )update || add (. לחיצה עליו תבצע את הולידציה ותזרוק שגיאה בהתאם במידה והפעולה עברה בהצלחה יחזור המשתמש לעמוד home . כפתור logout ינתק את המשתמש ויחזור אותו לעמוד signin . *האתר חייב להיות רספונסיבי למובייל 6

- סטטוס: ready
- ענפים: frontend_ui_validation, backend_api_routes
- משימות מקור: api_put_update, server_html_route, client_form_inputs, client_validation_rules, client_navigation, alerts_error_handling

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `server/server.js` - מפעיל express, cors, express.json וחיבור routes.
  - `server/routes/items.routes.js` - הקובץ שבו מוגדרים GET/POST/PUT/DELETE.
  - `server/controllers/items.controller.js` - לוגיקת הבקשה, validation ו-status codes.
  - `server/models/Item.js` - Schema/model אם נדרש persistence.
  - `src/App.jsx` - מחבר routes, state ראשי וקומפוננטות המסלול.
  - `src/components/ExamForm.jsx` - הקובץ שבו בונים את הטופס, ה-inputs וה-submit.
  - `src/utils/validation.js` - פונקציות validation טהורות שחוזרות עם errors לפי שדה.
  - `src/services/api.js` - קריאות fetch לשרת אחרי validation תקין.
  - `src/pages/AddItemPage.jsx` - הקובץ שבו מבצעים create ואז navigate.

**תתי־משימות טכניות:**
- 1. `server/routes/items.routes.js` - לאתר רשומה לפי מזהה
- 2. `server/routes/items.routes.js` - לעדכן שדות מותרים
- 3. `server/routes/items.routes.js` - להחזיר 200/404
- 4. `server/routes/items.routes.js` - להגדיר route שמחזיר HTML
- 5. `server/routes/items.routes.js` - לשרת קבצים סטטיים
- 6. `server/routes/items.routes.js` - למפות URL נכון
- 7. `server/routes/items.routes.js` - לבנות controlled inputs
- 8. `server/routes/items.routes.js` - להגדיר select/options
- 9. `server/routes/items.routes.js` - לחבר submit button
- 10. `server/routes/items.routes.js` - לכתוב חוקי regex/טווח
- 11. `server/routes/items.routes.js` - לחסום שליחה לא תקינה
- 12. `server/routes/items.routes.js` - להציג שגיאה ברורה למשתמש
- 13. `server/routes/items.routes.js` - להגדיר routes במסך
- 14. `server/routes/items.routes.js` - לבצע redirect לאחר פעולה
- 15. `server/routes/items.routes.js` - לשמור UX עקבי
- 16. `server/routes/items.routes.js` - לעטוף פעולות ב-try/catch
- 17. `server/routes/items.routes.js` - להחזיר/להציג הודעת שגיאה
- 18. `server/routes/items.routes.js` - לא להסתיר כשלונות

**רובריקת 100 פנימית:**
- 25 נק׳ - Route/method/status code נכונים: ה-endpoint מתאים לדרישה ומחזיר 200/201/400/404/500 לפי מצב.
- 20 נק׳ - Validation של body/query/params: אין כניסה לא תקינה שממשיכה לפעולת DB או response שגוי.
- 25 נק׳ - פעולת data/DB נכונה: find/create/update/delete או persistence מתבצעים במקום הנכון.
- 15 נק׳ - Error handling: try/catch או טיפול כשל ברור בלי להסתיר שגיאות.
- 15 נק׳ - חיבור ל-client והודעה מובנת: התגובה חוזרת JSON ברור שהממשק יודע להציג.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 72 - עותק של מבחן פולסטאק מועד ג.pdf / Q2.main

> שאלה 2: יש לכתוב פונקציה אשר מקבלת 2 מערכים של מספרים, מערך שלם ומערך חלקי )קטן יותר(. הפונקציה תוודא שכל ערכי המערך החלקי נמצאים במערך השלם, גם המיקומים שלהם קריטים. במידה וכן תחזיר true במידה ולא תחזיר false * * אין צורך לבדוק חריגות דוגמאות: מערך שלם 1,2,3,4 דוגמאות למערכים חלקיים אפשריים 1,3,4 2,4 1,4 דוגמא למערכים חלקיי לא תקינים 1,2,5 – הספרה 5 לא מופיעה במערך השלם 4,2 – המספרים מופיעים אבל לא בסדר הנכון

- סטטוס: ready
- ענפים: js_problem_solving
- משימות מקור: js_algorithms

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `src/utils/algorithms.js` - הקובץ שבו כותבים פונקציות JS טהורות.
  - `src/utils/algorithms.test.js` - בדיקות קלט תקין, קלט לא תקין ו-edge cases.

**תתי־משימות טכניות:**
- 1. `src/utils/algorithms.js` - לזהות קלט/פלט
- 2. `src/utils/algorithms.js` - לממש אלגוריתם
- 3. `src/utils/algorithms.js` - להחזיר מבנה נתונים מדויק

**רובריקת 100 פנימית:**
- 25 נק׳ - בדיקת קלט ו-Error לפי דרישה: הפונקציה דוחה קלט לא תקין בצורה מפורשת.
- 35 נק׳ - אלגוריתם נכון לכל מקרי הבסיס: הלוגיקה מחזירה את הערך הנכון בלי mutation לא נדרש.
- 20 נק׳ - Edge cases: נבדקים מערך ריק, טיפוסים לא נכונים וערכים גבוליים.
- 20 נק׳ - פלט נקי והסבר קצר: הקוד קריא והסטודנט יודע להסביר כל שורה מרכזית.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

### סעיף 73 - עותק של מבחן פולסטאק מועד ג.pdf / Q3.main

> שאלה 3: יש לכתוב "חבילה" בnode . החבילה כוללת מחלקה בעלת המתודות הבאות: בנאי: מקבל שם קובץ – יוצר קובץ txt עם השם שהתקבל. מתודה מקבלת תוכן של קובץ ומוסיפה אותו לקובץ הקיים. מתודה שמקבלת מילה, מחפשת את המילה בתוך הקובץ, במידה והמילה קיימת מחזירה true , אחרת מחזירה false . מתודה לשינוי שם הקובץ, מקבלת שם של קובץ ומשנה אותו. מתודת העתקה, לא מקבלת דבר רק מעתיקה את הקובץ עם אותו שם + המילה copy חייב להיות בפנים אותו תוכן בדיוק.

- סטטוס: ready
- ענפים: frontend_ui_validation, node_oop
- משימות מקור: client_validation_rules, oop_design, node_file_io

**עץ קבצים של התרגיל:**
- `exam-project/`
  - `src/App.jsx` - מחבר routes, state ראשי וקומפוננטות המסלול.
  - `src/components/ExamForm.jsx` - הקובץ שבו בונים את הטופס, ה-inputs וה-submit.
  - `src/utils/validation.js` - פונקציות validation טהורות שחוזרות עם errors לפי שדה.
  - `src/services/api.js` - קריאות fetch לשרת אחרי validation תקין.
  - `src/models/Product.js` - Class, constructor ומתודות.
  - `src/models/Product.test.js` - בדיקות ל-constructor, this ומתודות.
  - `server/services/fileStore.js` - קריאה/כתיבה לקבצים עם fs/promises.
  - `server/routes/files.routes.js` - Route שמפעיל את service ומחזיר status מתאים.

**תתי־משימות טכניות:**
- 1. `src/components/ExamForm.jsx` - לכתוב חוקי regex/טווח
- 2. `src/components/ExamForm.jsx` - לחסום שליחה לא תקינה
- 3. `src/components/ExamForm.jsx` - להציג שגיאה ברורה למשתמש
- 4. `src/components/ExamForm.jsx` - להגדיר class
- 5. `src/components/ExamForm.jsx` - לממש constructor
- 6. `src/components/ExamForm.jsx` - לכתוב methods לפי דרישה
- 7. `src/components/ExamForm.jsx` - ליצור קובץ
- 8. `src/components/ExamForm.jsx` - לכתוב/לקרוא תוכן
- 9. `src/components/ExamForm.jsx` - לטפל בשגיאות fs

**רובריקת 100 פנימית:**
- 25 נק׳ - מבנה React נכון: state/props/components מחולקים לקבצים הנכונים.
- 25 נק׳ - Inputs/actions/submit: כל פעולה שהסעיף דורש קיימת במסך.
- 20 נק׳ - Validation והודעות שגיאה: המשתמש מקבל הודעה ברורה לפני שליחה לא תקינה.
- 15 נק׳ - Integration מול API/route: fetch/navigate/render מתבצעים רק אחרי פעולה תקינה.
- 15 נק׳ - UI יציב ונגיש: אין overflow, יש labels, והזרימה מובנת.

**איך לקבל 100:**
- לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.
- ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.
- להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.
- להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.
- לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.

**מעבר ל-100:**
- להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.
- להציג הודעות שגיאה מדויקות למשתמש או ל-client.
- לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.
- לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.

## העץ המקורי

# עץ משימות טכניות מלא - 73 סעיפים

- סה"כ סעיפים שנותחו: 73

## הסתברות לפי ענף ראשי

| ענף | סעיפים מכוסים | הסתברות | מזהי סעיפים |
|---|---:|---:|---|
| Frontend UI + Validation | 46 | 63.0% | 6,7,8,9,10,11,12,13,14,15,16,17,23,31,32,34,36,37,38,39,41,42,44,45,46,47,48,52,53,54,55,56,57,58,61,62,63,64,65,66,67,68,69,70,71,73 |
| Backend API + Routes + Status Codes | 43 | 58.9% | 1,2,3,5,7,8,9,10,14,15,17,18,19,20,21,22,24,25,30,31,32,34,36,37,38,39,41,42,44,45,46,47,48,49,55,56,58,59,60,61,65,66,71 |
| Data Layer (DB + Uniqueness) | 20 | 27.4% | 3,11,21,26,32,34,35,36,37,38,39,40,41,42,44,45,46,47,56,58 |
| JavaScript Problem Solving | 20 | 27.4% | 5,18,23,24,30,32,34,36,37,38,39,41,42,43,44,45,46,47,49,72 |
| Scope/Meta Resolution | 18 | 24.7% | 4,5,32,33,34,36,37,38,39,41,42,44,45,46,47,50,51,56 |
| Theory & Verbal Explanations | 5 | 6.8% | 25,26,27,28,29 |
| Node File I/O + OOP Design | 4 | 5.5% | 21,24,31,73 |

## ענף: Frontend UI + Validation (63.0%)

| תת-ענף (task_id) | הופעות | הסתברות | מזהי סעיפים |
|---|---:|---:|---|
| client_form_inputs | 33 | 45.2% | 8,9,10,14,15,16,17,31,32,34,36,37,38,39,41,42,44,45,46,47,48,52,55,56,57,58,62,63,64,65,66,70,71 |
| client_validation_rules | 31 | 42.5% | 11,12,13,16,23,31,32,34,36,37,38,39,41,42,44,45,46,47,48,52,53,54,56,62,63,67,68,69,70,71,73 |
| client_navigation | 22 | 30.1% | 6,7,10,15,32,34,36,37,38,39,41,42,44,45,46,47,48,55,56,58,61,71 |
| client_list_render | 18 | 24.7% | 6,9,32,34,36,37,38,39,41,42,44,45,46,47,48,56,58,66 |

### תת-ענף: client_form_inputs (45.2%)

מה צריך לדעת:
1. Controlled components ב-React (value + onChange).
2. בחירת input types נכונים (text/number/select).
3. ניהול state לטופס אחד או useReducer בטפסים גדולים.
4. Submit flow: preventDefault + validation + async call.
5. סנכרון UI אחרי הצלחה/כישלון.

איך לבנות את הקוד:
1. להגדיר state התחלתי לכל שדה.
2. לכתוב handler אחד לעדכון שדות.
3. לחבר submit שמפעיל validate ואז API.
4. ב-success לנקות/להפנות לפי הדרישה.

### תת-ענף: client_validation_rules (42.5%)

מה צריך לדעת:
1. בניית שכבת validation פונקציונלית ודטרמיניסטית.
2. Regex לאנגלית/מספרים/אורכים לפי דרישה.
3. טווחים מספריים וגבולות כולל edge cases.
4. הפרדת הודעות שגיאה per-field.
5. יישור validation frontend עם backend.

איך לבנות את הקוד:
1. לכתוב פונקציית validate(data)->errors.
2. להגדיר לכל שדה checks קבועים.
3. להציג errors ליד השדות + חסימת submit.
4. לשחזר את אותם חוקים בצד שרת.

### תת-ענף: client_navigation (30.1%)

מה צריך לדעת:
1. ראוטינג בסיסי והפניות לאחר פעולות CRUD.
2. שמירת state/params בין עמודים.
3. Default route + NotFound route.
4. מניעת ניווט שגוי כשהנתון חסר.

איך לבנות את הקוד:
1. להגדיר routes מפורשים לכל מסך.
2. לנווט עם navigate אחרי create/delete/update.
3. להוסיף fallback route לעמוד שגיאה/בית.

### תת-ענף: client_list_render (24.7%)

מה צריך לדעת:
1. מיפוי מערכים לרכיבים עם key יציב.
2. מיון/סינון תצוגה ללא mutation.
3. מצב empty-state ברור.
4. רענון רשימה אחרי יצירה/מחיקה/עדכון.

איך לבנות את הקוד:
1. למשוך נתונים מהשרת בטעינה/אקשן.
2. למפות לרכיב כרטיס עם כל השדות הנדרשים.
3. להחיל sort/filter לפני render.
4. להציג empty-state אם הרשימה ריקה.

## ענף: Backend API + Routes + Status Codes (58.9%)

| תת-ענף (task_id) | הופעות | הסתברות | מזהי סעיפים |
|---|---:|---:|---|
| alerts_error_handling | 25 | 34.2% | 3,5,14,17,18,21,22,24,32,34,36,37,38,39,41,42,44,45,46,47,48,55,56,58,71 |
| server_html_route | 23 | 31.5% | 7,10,15,31,32,34,36,37,38,39,41,42,44,45,46,47,48,55,56,58,59,61,71 |
| api_get_filtered | 22 | 30.1% | 2,7,8,9,20,30,32,34,36,37,38,39,41,42,44,45,46,47,48,49,56,66 |
| api_post_create | 21 | 28.8% | 2,3,21,31,32,34,36,37,38,39,41,42,44,45,46,47,48,56,59,60,65 |
| api_get_all | 8 | 11.0% | 1,19,20,25,56,58,59,61 |
| api_delete | 5 | 6.8% | 15,17,25,56,58 |
| api_put_update | 3 | 4.1% | 22,25,71 |

### תת-ענף: alerts_error_handling (34.2%)

מה צריך לדעת:
1. חלוקה בין 400/404/409/500.
2. try/catch ב-client וב-server.
3. הודעות Alert/inline מדויקות.
4. לא לבלוע שגיאות ולוג בסיסי לכשל.

איך לבנות את הקוד:
1. לעטוף כל async ב-try/catch.
2. להמיר שגיאות שרת להודעות ברורות.
3. להציג alert רק איפה שנדרש במבחן.
4. להחזיר status code מדויק בכל branch.

### תת-ענף: server_html_route (31.5%)

מה צריך לדעת:
1. Express routes לדפי HTML ו-static files.
2. הפרדת API routes מול page routes.
3. קונבנציה אחידה לנתיבים.
4. 404 למסלול לא קיים.

איך לבנות את הקוד:
1. להגדיר express static לתיקיית public.
2. להגדיר GET לכל עמוד נדרש במבחן.
3. להשאיר API תחת prefix קבוע (למשל /api).
4. להחזיר 404 לנתיב לא ידוע.

### תת-ענף: api_get_filtered (30.1%)

מה צריך לדעת:
1. קבלת פרמטר סינון (query/body) לפי הדרישה.
2. סינון ומיון לוגיים בצורה טהורה.
3. החזרת תוצאה ריקה בצורה חוקית.

איך לבנות את הקוד:
1. לקרוא את ערך הסינון מהבקשה.
2. להריץ filter/sort ולשמור אימות סוג.
3. להחזיר רשימה מסוננת עם 200.

### תת-ענף: api_post_create (28.8%)

מה צריך לדעת:
1. קבלת payload וולידציה בצד שרת.
2. בדיקת כפילות לפני יצירה.
3. יצירה והחזרת 201/409/400.

איך לבנות את הקוד:
1. לבדוק שדות חובה וכפילויות.
2. ליצור רשומה חדשה.
3. להחזיר 201 בהצלחה, 4xx בכשל קלט, 5xx בכשל שרת.

### תת-ענף: api_get_all (11.0%)

מה צריך לדעת:
1. GET בסיסי שמחזיר collection מלאה.
2. תשובת JSON עקבית ו-200.
3. טיפול שגיאה בשרת עם 500.

איך לבנות את הקוד:
1. router.get(...) עם שאילתת all.
2. res.status(200).json(data).
3. catch->res.status(500).json(...)

### תת-ענף: api_delete (6.8%)

מה צריך לדעת:
1. מחיקה לפי מזהה עם בדיקת קיום.
2. החזרת הודעת הצלחה יציבה.
3. 404 כאשר אין רשומה למחוק.

איך לבנות את הקוד:
1. לבדוק קיום רשומה לפי id.
2. לבצע delete atomically.
3. להחזיר success message או 404.

### תת-ענף: api_put_update (4.1%)

מה צריך לדעת:
1. איתור רשומה לפי מזהה.
2. ולידציה לעדכון חלקי/מלא.
3. החזרת 200 אם עודכן, 404 אם לא נמצא.

איך לבנות את הקוד:
1. לאתר רשומה לפי id.
2. לעדכן רק שדות מותרות.
3. להחזיר 200 + data או 404 אם חסר.

## ענף: Data Layer (DB + Uniqueness) (27.4%)

| תת-ענף (task_id) | הופעות | הסתברות | מזהי סעיפים |
|---|---:|---:|---|
| db_uniqueness | 16 | 21.9% | 11,21,32,34,35,36,37,38,39,40,41,42,44,45,46,47 |
| db_persistence | 4 | 5.5% | 3,26,56,58 |

### תת-ענף: db_uniqueness (21.9%)

מה צריך לדעת:
1. מזהה חד-חד ערכי ברמת לוגיקה/DB.
2. בדיקת כפילות לפני insert/update.
3. החזרת הודעת שגיאה עקבית במקרה כפילות.

איך לבנות את הקוד:
1. להגדיר unique key לוגי.
2. לפני insert לבצע findOne/exists.
3. בכפילות להחזיר conflict ברור.

### תת-ענף: db_persistence (5.5%)

מה צריך לדעת:
1. מודל נתונים ברור (schema).
2. חיבור DB וניהול failures.
3. CRUD נקי עם טיפול שגיאות.

איך לבנות את הקוד:
1. להגדיר schema/model.
2. לפתוח חיבור DB באתחול שרת.
3. להשתמש במודל בכל CRUD ולתפוס errors.

## ענף: JavaScript Problem Solving (27.4%)

| תת-ענף (task_id) | הופעות | הסתברות | מזהי סעיפים |
|---|---:|---:|---|
| js_algorithms | 20 | 27.4% | 5,18,23,24,30,32,34,36,37,38,39,41,42,43,44,45,46,47,49,72 |

### תת-ענף: js_algorithms (27.4%)

מה צריך לדעת:
1. הבנת קלט/פלט מילולית לפני קוד.
2. בחירת מבנה נתונים יעיל (Map/Object/Array).
3. כתיבה נקייה בלי side-effects לא נדרשים.
4. בדיקת דוגמאות ידניות לפני הגשה.

איך לבנות את הקוד:
1. לכתוב pseudocode של השלבים.
2. לממש בפונקציה אחת ברורה.
3. להחזיר בדיוק את מבנה הפלט הנדרש.
4. להריץ בדיקות עם קלטי דוגמה.

## ענף: Scope/Meta Resolution (24.7%)

| תת-ענף (task_id) | הופעות | הסתברות | מזהי סעיפים |
|---|---:|---:|---|
| question_scope_inherited | 14 | 19.2% | 5,32,34,36,37,38,39,41,42,44,45,46,47,56 |
| manual_review | 4 | 5.5% | 4,33,50,51 |

### תת-ענף: question_scope_inherited (19.2%)

מה צריך לדעת:
1. סעיף כותרת לא מספיק לבדיקה אוטומטית.
2. חובה לרשת משימות מכל תתי-הסעיפים בשאלה.

איך לבנות את הקוד:
1. לא לדלג על כותרת: לפתוח את תתי-הסעיפים.
2. לבנות checklist מכל תתי-הסעיפים לפני קוד.

### תת-ענף: manual_review (5.5%)

מה צריך לדעת:
1. כשהטקסט חלקי נדרש עיון ידני במקור.
2. לא מאשרים מוכנות בלי פירוק מלא.

איך לבנות את הקוד:
1. לפתוח את קובץ המקור ולהשלים טקסט חסר.
2. להמיר את הכותרת לדרישות טכניות מדויקות.

## ענף: Theory & Verbal Explanations (6.8%)

| תת-ענף (task_id) | הופעות | הסתברות | מזהי סעיפים |
|---|---:|---:|---|
| theory_explanation | 5 | 6.8% | 25,26,27,28,29 |

### תת-ענף: theory_explanation (6.8%)

מה צריך לדעת:
1. הגדרה נכונה של מושגים (REST/Mongo/React).
2. השוואה תמציתית יתרונות/חסרונות.
3. דוגמה קצרה להמחשה.

איך לבנות את הקוד:
1. לענות בפורמט נקודות קצרות.
2. לכל טענה לצרף דוגמה קטנה.
3. להיצמד לדיוק טרמינולוגי ללא מלל עודף.

## ענף: Node File I/O + OOP Design (5.5%)

| תת-ענף (task_id) | הופעות | הסתברות | מזהי סעיפים |
|---|---:|---:|---|
| node_file_io | 3 | 4.1% | 24,31,73 |
| oop_design | 2 | 2.7% | 21,73 |

### תת-ענף: node_file_io (4.1%)

מה צריך לדעת:
1. fs/promises ליצירה/כתיבה/קריאה.
2. ניהול נתיבים וקידוד UTF-8.
3. טיפול שגיאות קובץ והרשאות.

איך לבנות את הקוד:
1. constructor מקבל שם קובץ.
2. ליצור קובץ אם חסר באמצעות fs.
3. לכתוב מתודות write/read/append לפי הדרישה.
4. לתפוס שגיאות ולהחזיר הודעות תקינות.

### תת-ענף: oop_design (2.7%)

מה צריך לדעת:
1. Class + constructor + methods.
2. שמירה על אחריות של כל מחלקה.
3. ולידציה בסיסית בתוך מתודות.

איך לבנות את הקוד:
1. להגדיר class עם שדות נתונים.
2. לממש בנאי ואתחול נכון.
3. להוסיף methods לביזנס לוג׳יק הנדרש.
4. ליצור מופעים ולבדוק זרימה מלאה.
