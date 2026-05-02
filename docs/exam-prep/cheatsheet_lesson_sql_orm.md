# SQL/PostgreSQL/ORM - בסיסי נתונים רלציוניים — דף סיכום למבחן

**מודול SVCollege:** בסיסי נתונים ומידול מידע - MongoDB/Mongoose + PostgreSQL/Prisma/Drizzle

**תיאור:** שכבת הנתונים של אפליקציית Full Stack: SQL, PostgreSQL, טבלאות, קשרים, JOIN, migrations, CRUD, transaction, וכלי ORM כמו Prisma ו-Drizzle מעל SQL.

**מספר מושגים:** 17

---

## מושגים בסיכום

### 1. SQL

**רמת קושי:** 3/10

**מה זה:** SQL היא שפה לשאול ולשנות מידע בבסיס נתונים רלציוני: SELECT לקריאה, INSERT להוספה, UPDATE לעדכון ו-DELETE למחיקה.

**למה Full Stack:** מפתח Full Stack צריך להבין מה השרת באמת מבקש מה-DB, גם אם הקוד עובר דרך Prisma או Drizzle.

**דוגמה:**
```
SELECT id, title
FROM courses
WHERE active = true
ORDER BY title;
```

**הסבר:** השאילתה קוראת עמודות מוגדרות מטבלה, מסננת רק רשומות פעילות, ומחזירה סדר צפוי.

⚠️ **טעות נפוצה:** להניח ש-ORM מבטל את הצורך להבין SQL. בפועל ORM מייצר SQL, ובעיות ביצועים נפתרות דרך הבנת השאילתה.

**תלוי ב:** `lesson_17::CRUD`

---

### 2. PostgreSQL

**רמת קושי:** 4/10

**מה זה:** PostgreSQL הוא מנוע בסיס נתונים רלציוני שמריץ SQL, שומר constraints, מנהל transactions ותומך בסוגי נתונים עשירים.

**למה Full Stack:** במערכת production השרת צריך אחסון אמין, queries צפויות, indexes, וגבולות עקביות ש-MongoDB בלבד לא תמיד מלמד.

**דוגמה:**
```
CREATE TABLE courses (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title text NOT NULL,
  active boolean NOT NULL DEFAULT true
);
```

**הסבר:** PostgreSQL מייצר מזהה identity, מחייב title, ומגדיר ברירת מחדל ל-active.

⚠️ **טעות נפוצה:** להתייחס ל-PostgreSQL כקובץ JSON גדול. החוזק שלו הוא schema, קשרים, constraints ו-query planner.

**תלוי ב:** `lesson_sql_orm::SQL`

---

### 3. database

**רמת קושי:** 2/10

**מה זה:** database הוא מקום אחסון מסודר לנתונים של האפליקציה, עם כללים איך לשמור, לקרוא ולשנות אותם.

**למה Full Stack:** בלי database השרת מאבד מידע אחרי restart או שומר מידע בצורה שקשה לאמת, לחפש ולתחזק.

**דוגמה:**
```
CREATE DATABASE learning_portal;
```

**הסבר:** פקודה זו יוצרת בסיס נתונים נפרד לפרויקט. בתוך ה-database יוגדרו schemas וטבלאות.

⚠️ **טעות נפוצה:** לקרוא לכל קובץ או אובייקט JS בשם database. database אמיתי מספק persistence, concurrency וכללי תקינות.

**תלוי ב:** `lesson_16::Node.js`

---

### 4. table

**רמת קושי:** 2/10

**מה זה:** table היא מבנה עם עמודות ושורות. כל שורה היא רשומה, וכל עמודה מגדירה סוג מידע.

**למה Full Stack:** טבלאות הן החוזה בין backend, validation, UI ו-reports. שינוי בטבלה משפיע על כל ה-flow.

**דוגמה:**
```
CREATE TABLE lessons (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title text NOT NULL,
  published boolean NOT NULL DEFAULT false
);
```

**הסבר:** הטבלה lessons שומרת שיעורים עם מזהה, כותרת, ומצב פרסום.

⚠️ **טעות נפוצה:** לשים בטבלה אחת מידע לא קשור. טבלה טובה מייצגת entity ברור ולא ערבוב של UI, user ו-log.

**תלוי ב:** `lesson_sql_orm::database`

---

### 5. row

**רמת קושי:** 2/10

**מה זה:** row היא רשומה אחת בטבלה, למשל משתמש אחד, שיעור אחד או הזמנה אחת.

**למה Full Stack:** כל מסך רשימה או עמוד פרטים ב-UI מציג בדרך כלל rows שהגיעו מה-DB דרך API.

**דוגמה:**
```
INSERT INTO lessons (title, published)
VALUES ('SQL basics', true);
```

**הסבר:** INSERT יוצר row חדשה בטבלה lessons וממלא ערכים בעמודות שהוגדרו.

⚠️ **טעות נפוצה:** לשכוח ש-row חייבת לכבד constraints. אם title הוא NOT NULL, אי אפשר להכניס row בלי title.

**תלוי ב:** `lesson_sql_orm::table`

---

### 6. column

**רמת קושי:** 2/10

**מה זה:** column היא שדה בטבלה. היא מגדירה שם, סוג נתונים וכללי תקינות כמו NOT NULL או UNIQUE.

**למה Full Stack:** column לא נכון גורם לבאגים בין frontend, validation ו-DB: מחרוזת במקום מספר, null במקום ערך חובה, או תאריך לא עקבי.

**דוגמה:**
```
ALTER TABLE lessons
ADD COLUMN estimated_minutes integer NOT NULL DEFAULT 45;
```

**הסבר:** migration כזו מוסיפה עמודה קיימת בצורה שמכבדת rows שכבר נמצאות בטבלה.

⚠️ **טעות נפוצה:** להוסיף column חובה בלי DEFAULT במערכת עם נתונים קיימים. migration כזה עלול להיכשל.

**תלוי ב:** `lesson_sql_orm::table`

---

### 7. primary key

**רמת קושי:** 3/10

**מה זה:** primary key הוא מזהה ייחודי ויציב לכל row בטבלה.

**למה Full Stack:** API routes, React keys, relation queries ו-update/delete צריכים מזהה יציב כדי לעבוד על הרשומה הנכונה.

**דוגמה:**
```
CREATE TABLE students (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email text NOT NULL UNIQUE
);
```

**הסבר:** id מזהה כל student. email גם ייחודי, אבל primary key נשאר המפתח הטכני לקשרים.

⚠️ **טעות נפוצה:** להשתמש בשדה משתנה כמפתח ראשי. אם הערך יכול להשתנות, קשרים וטבלאות אחרות יישברו.

**תלוי ב:** `lesson_sql_orm::column`

---

### 8. foreign key

**רמת קושי:** 4/10

**מה זה:** foreign key הוא עמודה שמצביעה ל-primary key בטבלה אחרת ומונעת קשרים לא קיימים.

**למה Full Stack:** הוא מגן על הנתונים כשה-API מקבל userId או courseId. אי אפשר ליצור רשומה שמצביעה למשהו שלא קיים.

**דוגמה:**
```
CREATE TABLE enrollments (
  student_id integer NOT NULL REFERENCES students(id),
  course_id integer NOT NULL REFERENCES courses(id),
  PRIMARY KEY (student_id, course_id)
);
```

**הסבר:** טבלת enrollments מחברת students ל-courses ומונעת הרשמה לקורס או סטודנט שלא קיימים.

⚠️ **טעות נפוצה:** לשמור ids בלי FOREIGN KEY ואז לגלות orphan records שה-UI לא יודע להסביר.

**תלוי ב:** `lesson_sql_orm::primary key`

---

### 9. relation

**רמת קושי:** 4/10

**מה זה:** relation היא קשר בין טבלאות: one-to-many, one-to-one או many-to-many.

**למה Full Stack:** מסכים אמיתיים מציגים נתונים מחוברים: משתמש והזמנות, קורס ושיעורים, פוסט ותגובות.

**דוגמה:**
```
students 1--many enrollments many--1 courses
```

**הסבר:** סטודנט יכול להירשם להרבה קורסים, וקורס יכול לכלול הרבה סטודנטים דרך טבלת חיבור.

⚠️ **טעות נפוצה:** לשכפל מידע במקום לקשור. שכפול גורם לעדכונים כפולים ולנתונים שסותרים אחד את השני.

**תלוי ב:** `lesson_sql_orm::foreign key`

---

### 10. JOIN

**רמת קושי:** 5/10

**מה זה:** JOIN מחבר rows מטבלאות שונות לפי תנאי קשר, בדרך כלל foreign key מול primary key.

**למה Full Stack:** בלי JOIN השרת מחזיר מידע חלקי או מבצע הרבה queries מיותרות. JOIN נכון מחזיר מסך שלם בשאילתה אחת.

**דוגמה:**
```
SELECT students.email, courses.title
FROM enrollments
JOIN students ON students.id = enrollments.student_id
JOIN courses ON courses.id = enrollments.course_id;
```

**הסבר:** השאילתה עוברת דרך טבלת החיבור ומחזירה לכל הרשמה את אימייל הסטודנט וכותרת הקורס.

⚠️ **טעות נפוצה:** לכתוב JOIN בלי ON מדויק ולקבל כפל rows. כל JOIN חייב תנאי קשר ברור.

**תלוי ב:** `lesson_sql_orm::relation`

---

### 11. schema

**רמת קושי:** 4/10

**מה זה:** schema הוא החוזה של מבנה הנתונים: טבלאות, עמודות, סוגים, קשרים ו-constraints.

**למה Full Stack:** schema טוב מונע מצב שבו ה-frontend חושב ששדה קיים אבל ה-DB לא מכיר אותו, או להפך.

**דוגמה:**
```
CREATE SCHEMA learning;
CREATE TABLE learning.lessons (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title text NOT NULL
);
```

**הסבר:** PostgreSQL schema יכול לארגן טבלאות תחת namespace, מעבר למשמעות הכללית של מבנה הנתונים.

⚠️ **טעות נפוצה:** לשנות schema ישירות ב-production בלי migration מסודרת ובלי להבין השפעה על קוד קיים.

**תלוי ב:** `lesson_sql_orm::table`

---

### 12. migration

**רמת קושי:** 5/10

**מה זה:** migration היא שינוי גרסתי ומבוקר ב-schema: יצירת טבלה, הוספת עמודה, שינוי constraint או יצירת index.

**למה Full Stack:** כל deploy שמשנה backend או ORM עשוי לדרוש שינוי DB. migration הופכת את השינוי לשחזור ובר-בדיקה.

**דוגמה:**
```
ALTER TABLE courses
ADD COLUMN slug text UNIQUE;

UPDATE courses
SET slug = lower(replace(title, ' ', '-'))
WHERE slug IS NULL;
```

**הסבר:** שינוי schema יכול לכלול גם backfill לנתונים קיימים לפני שמחייבים constraint קשיח.

⚠️ **טעות נפוצה:** למחוק column לפני שהקוד החדש כבר לא משתמש בו. migration בטוחה מתחשבת בסדר deploy.

**תלוי ב:** `lesson_sql_orm::schema`

---

### 13. ORM

**רמת קושי:** 4/10

**מה זה:** ORM הוא כלי שמאפשר לעבוד עם DB דרך קוד ואובייקטים במקום לכתוב כל SQL ידנית.

**למה Full Stack:** ORM מאיץ CRUD, מקטין boilerplate, ונותן type safety או schema tooling, אבל עדיין נשען על SQL ועל constraints.

**דוגמה:**
```
const courses = await orm.course.findMany({
  where: { active: true },
  orderBy: { title: 'asc' }
});
```

**הסבר:** הקוד נראה כמו JavaScript, אבל מתורגם לשאילתת SQL מול ה-DB.

⚠️ **טעות נפוצה:** לחשוב ש-ORM תמיד מהיר יותר מ-raw SQL. לפעמים צריך לקרוא את ה-SQL שנוצר ולשפר query או index.

**תלוי ב:** `lesson_sql_orm::SQL`

---

### 14. Prisma

**רמת קושי:** 5/10

**מה זה:** Prisma הוא ORM פופולרי ל-Node.js/TypeScript עם schema file, generated client ו-API נוח ל-CRUD וקשרים.

**למה Full Stack:** Prisma מחבר בין מודל נתונים ל-TypeScript ומקטין טעויות ב-API routes, אבל דורש הבנה של migrations ו-query cost.

**דוגמה:**
```
const course = await prisma.course.create({
  data: { title: input.title, active: true }
});
```

**הסבר:** Prisma יוצר row בטבלת Course לפי מודל ה-schema. ה-DB עדיין אחראי ל-constraints.

⚠️ **טעות נפוצה:** ללמד Prisma כאילו הוא חובה. הוא כלי מעל SQL; פרויקט יכול לבחור Prisma, Drizzle או raw SQL לפי צרכים.

**תלוי ב:** `lesson_sql_orm::ORM`

---

### 15. Drizzle

**רמת קושי:** 5/10

**מה זה:** Drizzle הוא ORM/query builder ל-TypeScript שמדגיש SQL-like API, types קרובים ל-schema ושליטה טובה בשאילתות.

**למה Full Stack:** Drizzle מתאים כשצריך type safety אבל רוצים לראות מבנה SQL ברור יותר ולשלוט ב-JOIN וב-select fields.

**דוגמה:**
```
const rows = await db
  .select({ title: courses.title })
  .from(courses)
  .where(eq(courses.active, true));
```

**הסבר:** הקוד בונה SELECT typed. הוא לא מחליף את הצורך להבין indexes, JOIN ו-transaction.

⚠️ **טעות נפוצה:** להציג Drizzle כקסם. הוא כלי מעל SQL; אם ה-schema או ה-query לא נכונים, הטעות נשארת.

**תלוי ב:** `lesson_sql_orm::ORM`

---

### 16. CRUD

**רמת קושי:** 3/10

**מה זה:** CRUD הוא ארבע פעולות בסיסיות על מידע: Create, Read, Update, Delete.

**למה Full Stack:** כמעט כל API בסיסי ממפה routes ל-CRUD: POST יוצר, GET קורא, PATCH/PUT מעדכן, DELETE מוחק.

**דוגמה:**
```
INSERT INTO courses (title) VALUES ('SQL basics');
SELECT * FROM courses;
UPDATE courses SET active = false WHERE id = 1;
DELETE FROM courses WHERE id = 1;
```

**הסבר:** אותו רעיון מופיע ב-SQL, REST API ו-ORM client.

⚠️ **טעות נפוצה:** לבצע UPDATE או DELETE בלי WHERE. פעולה כזו עלולה להשפיע על כל הטבלה.

**תלוי ב:** `lesson_17::REST API`

---

### 17. transaction

**רמת קושי:** 6/10

**מה זה:** transaction היא קבוצה של פעולות DB שמצליחות יחד או נכשלות יחד.

**למה Full Stack:** כשמשלמים, נרשמים לקורס, או מעדכנים כמה טבלאות, אסור שחצי מהשינוי יישמר וחצי ייכשל.

**דוגמה:**
```
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;
```

**הסבר:** שתי פעולות העדכון הן יחידה אחת. אם יש כשל לפני COMMIT, עושים ROLLBACK ולא משאירים מצב חלקי.

⚠️ **טעות נפוצה:** לעדכן כמה טבלאות בלי transaction ואז לקבל נתונים לא עקביים אחרי שגיאה באמצע.

**תלוי ב:** `lesson_sql_orm::CRUD`

---

## שאלות חזרה (סוף השיעור)

**שאלה 1:** למה MongoDB קיים בפורטל לא סוגר לבד את דרישת SVCollege ל-SQL?

  1. כי MongoDB אינו בסיס נתונים
✓ 2. כי SQL/PostgreSQL מלמדים טבלאות, JOIN, schema רלציוני ו-migrations מסוג אחר
  3. כי SQL עובד רק ב-frontend
  4. כי Prisma עובד רק עם MongoDB

**הסבר:** MongoDB חשוב, אבל הדרישה כוללת גם חשיבה רלציונית: טבלאות, constraints, foreign keys, JOIN ו-migrations.

---

**שאלה 2:** מה תפקיד primary key?

✓ 1. לזהות כל row בצורה ייחודית
  2. לצבוע טבלה
  3. להריץ שרת Node
  4. להחליף migration

**הסבר:** primary key הוא מזהה יציב וייחודי לכל row, והוא בסיס לקשרים ולפעולות update/delete מדויקות.

---

**שאלה 3:** מתי צריך JOIN?

✓ 1. כשמחברים מידע מטבלאות שונות לפי קשר
  2. רק כשכותבים CSS
  3. כשרוצים למחוק database
  4. כשאין foreign key

**הסבר:** JOIN מחבר rows מטבלאות שונות לפי תנאי ON, בדרך כלל דרך foreign key.

---

**שאלה 4:** מה migration אמורה לתת לצוות?

✓ 1. שינוי schema גרסתי ובר-שחזור
  2. עיצוב אוטומטי לכפתורים
  3. ביטול הצורך בבדיקות
  4. החלפה של HTTP

**הסבר:** migration מתעדת ומריצה שינויי schema בצורה מבוקרת בין סביבות.

---

**שאלה 5:** איזה משפט נכון על Prisma ו-Drizzle?

✓ 1. הם כלים מעל SQL ולא חובה בכל פרויקט
  2. הם מבטלים constraints ב-DB
  3. הם עובדים רק בדפדפן
  4. הם מחליפים את הצורך ב-schema

**הסבר:** Prisma ו-Drizzle עוזרים לעבוד מול DB, אבל הם עדיין נשענים על SQL, schema וגבולות ביצועים.

---

**שאלה 6:** למה transaction חשובה?

✓ 1. כדי שכל הפעולות הקריטיות יצליחו יחד או יבוטלו יחד
  2. כדי שהשרת יעלה מהר יותר
  3. כדי למחוק foreign keys
  4. כדי להציג CSS

**הסבר:** transaction מונעת מצב חלקי, למשל חיוב שנשמר בלי עדכון הרשמה או העברה כספית שנעצרה באמצע.

---
