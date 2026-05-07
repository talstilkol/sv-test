# NotebookLM Video Prompts - SVCollege FullStack Exam

שימוש מומלץ:
1. העלה ל-NotebookLM את `SVCollege_FullStack_NotebookLM_Master.md` כמקור.
2. עבור לכל פרומפט כאן לפי הסדר.
3. בכל פעם בקש Video Overview / סרטון וידאו חדש.
4. בקש סרטונים קצרים של 5-8 דקות, כי כך תוכל לכסות הרבה נושאים בלי עומס.
5. אחרי כל סרטון בקש מ-NotebookLM quiz של 10 שאלות על אותו נושא.

## Master Video Prompt

צור סרטון לימודי בעברית, בקצב ברור וישיר, על בסיס המקור בלבד. הסרטון צריך ללמד אותי כאילו אני מתכונן למבחן SVCollege FullStack תחת לחץ זמן. אל תוסיף מידע שלא נמצא במקור. כלול: מטרה, רצף פעולות, טעויות נפוצות, checklist קצר בסוף, ותרגיל אחד לביצוע אחרי הסרטון.

## 01 - תמונת מבחן מלאה

צור סרטון פתיחה שמסביר את מבנה המבחן: 70 נקודות פרויקט, 20 נקודות JS, 10 נקודות TS. הסבר מה חייב לעבוד בפועל, למה ולידציות חשובות, ומה סדר העדיפויות בזמן אמת.

## 02 - מה מותר ומה אסור להכין מראש

צור סרטון שמסביר בדיוק מה מותר להכין לפני המבחן לפי דף החומרים: תיקיות, repos, React, Tailwind, Express, MongoDB, ENV, endpoint GET בסיסי. הדגש גם מה אסור: routing, CRUD, UI אמיתי, endpoints נוספים.

## 03 - אסטרטגיית 3.5 שעות

צור סרטון שמחלק את זמן המבחן לשלבים: קריאת דרישות, backend, API checks, frontend, validations, JS, TS, final checklist. תן שעון עבודה מומלץ ודוגמאות להחלטות תחת לחץ.

## 04 - בניית Backend בסיסי

צור סרטון שמלמד איך להקים backend Express + MongoDB למבחן: index/server, express.json, cors, mongoose.connect, .env, route בסיסי, try/catch. התמקד במה חייב להופיע כדי לקבל נקודות.

## 05 - Mongoose Model ו-Schema

צור סרטון על יצירת Model לפי entity במבחן. הסבר איך לתרגם דרישות fields ל-Schema, required, enum, ranges ו-business rules. כלול דוגמא רעיונית עם Book/Member/Appointment לפי המקור.

## 06 - CRUD Routes מלא

צור סרטון שמלמד את תבנית ה-CRUD: GET all, GET by id, POST, PUT, DELETE, route filter/custom אם נדרש. הדגש status codes 400/404/500 ו-error handling.

## 07 - בדיקות API ידניות

צור סרטון שמסביר איך לבדוק API לפני frontend: GET, POST תקין, POST שגוי, PUT, DELETE, filter, duplicate. תן checklist קצר שאפשר לבצע עם Postman או curl.

## 08 - React Routing

צור סרטון שמלמד BrowserRouter, Routes, Route, useNavigate, useParams לפי המבחן. הדגש שמסכים קבועים הם Login, List/Home, Add, Edit.

## 09 - Login למבחן

צור סרטון על דף Login פשוט לפי הדרישות: admin/1234, alert שגיאה, navigation אחרי הצלחה. הסבר איך לא לבזבז זמן על auth מורכב שלא נדרש.

## 10 - Controlled Forms

צור סרטון שמלמד controlled form ב-React עם useState, handleChange, handleSubmit. הסבר איך להפוך אותו לרכיב משותף ל-Add/Edit.

## 11 - Add/Edit Shared Form

צור סרטון על בניית form משותף ל-add ו-edit. כלול טעינת נתונים ב-edit עם useParams/useEffect, שליחה ל-POST/PUT, וניווט חזרה לרשימה.

## 12 - List Page עם search ו-toggle

צור סרטון על עמוד רשימה: useEffect לטעינת data, loading, error, empty state, search input, toggle/filter, delete button, edit navigation.

## 13 - Frontend API Layer

צור סרטון שמסביר איך לחבר frontend ל-backend דרך VITE_API_URL. כלול דפוס fetch פשוט, טיפול בשגיאות, וטעויות נפוצות כמו URL קשיח או CORS.

## 14 - ולידציות כפולות

צור סרטון מרכזי על ולידציות: למה כל POST/PUT חייב frontend validation וגם backend validation. תן שיטה לעבור שדה-שדה: required, type, length, regex, enum, range, uniqueness, business rule.

## 15 - ולידציות טקסט ושמות

צור סרטון על ולידציות של טקסט: English only, לפחות שתי מילים, כל מילה מתחילה באות גדולה, length מינימלי/מקסימלי, lowercase username/email.

## 16 - ולידציות מספרים ותאריכים

צור סרטון על age/year/date/time validations: ranges, פורמט תאריך, שעות מותרות, והבדלים בין בדיקה בפרונט לבדיקה בבק.

## 17 - Uniqueness ו-business rules

צור סרטון על בדיקת duplicate title/email/name לפני create/update, ועל rules כמו borrow רק אם available או toggle רק אם status מאפשר.

## 18 - טעויות שמורידות נקודות

צור סרטון שמרכז טעויות נפוצות: חסר cors, חסר express.json, חסר BrowserRouter, חסר VITE_API_URL, אין validations בבק, endpoints מומצאים, לא בודקים error cases.

## 19 - JS Strategy

צור סרטון שמלמד איך לגשת לכל שאלת JS: בדיקת קלט, edge cases, אלגוריתם, return type. הדגש Array.isArray, typeof ו-throw new Error כשצריך.

## 20 - JS Pattern: ספירה לאובייקט

צור סרטון שמלמד דפוס ספירה לאובייקט: counts, grouping, roleBreakdown, byDoctor, mostCommonGenre. כלול dry run עם מערך קטן.

## 21 - JS Pattern: רצפים בסכום

צור סרטון שמלמד איך למצוא רצפים במערך שסכומם שווה target. הסבר גישה פשוטה שמתאימה למבחן ו-edge cases.

## 22 - JS Pattern: זיהוי סדרה

צור סרטון על זיהוי סדרה חשבונית, הנדסית ופיבונאצ'י. הדגש איך לבדוק מערכים קצרים ומה מחזירים במקרה לא תקין.

## 23 - JS Pattern: תת-מערך מסודר

צור סרטון שמלמד בדיקה האם תת-מערך מופיע בתוך מערך מלא באותו סדר. הסבר שתי מצביעים וטעויות נפוצות.

## 24 - JS Pattern: מטריצה וספירת מופעים

צור סרטון על מעבר על מטריצה, ספירת מופעים, והחזרת אובייקט תוצאות. הדגש validation למטריצה.

## 25 - TypeScript Basics

צור סרטון שמלמד interface, type, function signatures ו-return types לפי שאלת ה-TS במבחן. שמור על דוגמאות מתוך entities במקור.

## 26 - TypeScript Partial ו-keyof

צור סרטון על Partial<Entity> ו-keyof בבניית filter function. הסבר למה זה מתאים ל-filterBooks/filterMembers/filterAppointments.

## 27 - TypeScript Generics ו-Type Guards

צור סרטון על generics ו-type guards ברמה שנדרשת למבחן. תן דוגמה קצרה לשימוש נכון ומתי לא להסתבך.

## 28 - React + TypeScript

צור סרטון על טיפוסים ל-props, events ו-state ב-React אם הפרויקט או השאלה דורשים TS. הדגש בלי any לא מוצדק.

## 29 - SV Library Simulation

צור סרטון סימולציה מלא על SV Library: Book schema, routes, borrow route, pages, validations, JS stats, TS filterBooks. סדר את הסרטון לפי flow של פתרון מבחן.

## 30 - SV Team Manager Simulation

צור סרטון סימולציה על Team Manager: Member entity, role/status/skills validations, list/search/filter, CRUD, JS statistics, TS filterMembers.

## 31 - SV Appointments Simulation

צור סרטון סימולציה על Appointments: patientName, doctorName, date/time, status, conflict validation, toggle route, list/search/filter, JS/TS.

## 32 - SV Volunteer / Travel Log Simulations

צור סרטון שמסכם את הדפוסים החוזרים בסימולציות Volunteer ו-Travel Log מתוך המקור. התמקד איך לזהות entity, routes, validations ו-JS/TS מהר.

## 33 - Debug Emergency Protocol

צור סרטון חירום: מה עושים כשהפרונט לא עולה, backend לא מתחבר, CORS error, Mongo URI לא תקין, build fail, route לא מחזיר JSON. תן סדר בדיקה קצר.

## 34 - Final 30 Minutes Checklist

צור סרטון על 30 הדקות האחרונות במבחן: מה לבדוק, מה לא לגעת, איך לוודא שאין route חסר, איך לבדוק validations, ומה להשאיר אם אין זמן.

## 35 - יום לפני המבחן

צור סרטון שמסביר מה לתרגל ביום לפני: setup speedrun, CRUD אחד מלא, 5 JS, 4 TS, checklist, הכנת חומר פתוח, וטעויות שאסור לחזור עליהן.

## 36 - Oral Drill / מבחן עצמי

צור סרטון אינטראקטיבי בסגנון בוחן: שאל אותי 20 שאלות קצרות על החומר, עצור אחרי כל שאלה לשנייה, ואז תן תשובה נכונה והסבר קצר.

## 37 - Build Project From Scratch Drill

צור סרטון שמוביל אותי לבנות פרויקט מאפס לפי טיימר: backend first, API, frontend, validations, JS, TS. הסרטון צריך להיות כמו מאמן בזמן אמת, לא הרצאה.

## 38 - Validation Masterclass

צור סרטון עומק שמכסה רק ולידציות, עם טבלה מנטלית לכל field: required/type/length/range/regex/enum/unique/business. בסוף תן checklist לשימוש בזמן מבחן.

## 39 - Code Review Before Submit

צור סרטון שמלמד איך לבדוק את הקוד לפני הגשה: files, imports, env, routes, forms, validation messages, console errors, API responses, edge cases.

## 40 - Perfect Score Strategy

צור סרטון סיכום: איך להגיע לציון 100 בלי להסתבך. הדגש פרויקט עובד, ולידציות, runtime checks, JS עם edge cases, TS מדויק, וללא פיצ'רים מיותרים.
