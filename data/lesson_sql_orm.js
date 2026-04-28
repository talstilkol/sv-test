// data/lesson_sql_orm.js
// SVCollege Finish Line 1 - SQL, PostgreSQL and ORM bridge lesson.

var LESSON_SQL_ORM = {
  id: "lesson_sql_orm",
  title: "SQL/PostgreSQL/ORM - בסיסי נתונים רלציוניים",
  description:
    "שכבת הנתונים של אפליקציית Full Stack: SQL, PostgreSQL, טבלאות, קשרים, JOIN, migrations, CRUD, transaction, וכלי ORM כמו Prisma ו-Drizzle מעל SQL.",
  svcollegeModule:
    "בסיסי נתונים ומידול מידע - MongoDB/Mongoose + PostgreSQL/Prisma/Drizzle",
  sourceAssets: [],
  sourceCoverageNote:
    "המודול הציבורי של SVCollege דורש כיסוי SQL/PostgreSQL/Prisma/Drizzle. מקור שיעור SQL מקומי ייעודי הוא unknown/unavailable, לכן זהו bridge עצמאי שמסביר את הפער שלא נסגר על ידי MongoDB בלבד.",
  concepts: [
    {
      conceptName: "SQL",
      difficulty: 3,
      simpleExplanation:
        "SQL היא שפה לשאול ולשנות מידע בבסיס נתונים רלציוני: SELECT לקריאה, INSERT להוספה, UPDATE לעדכון ו-DELETE למחיקה.",
      whyFullStack:
        "מפתח Full Stack צריך להבין מה השרת באמת מבקש מה-DB, גם אם הקוד עובר דרך Prisma או Drizzle.",
      codeExample:
        "SELECT id, title\nFROM courses\nWHERE active = true\nORDER BY title;",
      codeExplanation:
        "השאילתה קוראת עמודות מוגדרות מטבלה, מסננת רק רשומות פעילות, ומחזירה סדר צפוי.",
      commonMistake:
        "להניח ש-ORM מבטל את הצורך להבין SQL. בפועל ORM מייצר SQL, ובעיות ביצועים נפתרות דרך הבנת השאילתה.",
      prerequisite: "lesson_17::CRUD",
    },
    {
      conceptName: "PostgreSQL",
      difficulty: 4,
      simpleExplanation:
        "PostgreSQL הוא מנוע בסיס נתונים רלציוני שמריץ SQL, שומר constraints, מנהל transactions ותומך בסוגי נתונים עשירים.",
      whyFullStack:
        "במערכת production השרת צריך אחסון אמין, queries צפויות, indexes, וגבולות עקביות ש-MongoDB בלבד לא תמיד מלמד.",
      codeExample:
        "CREATE TABLE courses (\n  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  title text NOT NULL,\n  active boolean NOT NULL DEFAULT true\n);",
      codeExplanation:
        "PostgreSQL מייצר מזהה identity, מחייב title, ומגדיר ברירת מחדל ל-active.",
      commonMistake:
        "להתייחס ל-PostgreSQL כקובץ JSON גדול. החוזק שלו הוא schema, קשרים, constraints ו-query planner.",
      prerequisite: "lesson_sql_orm::SQL",
    },
    {
      conceptName: "database",
      difficulty: 2,
      simpleExplanation:
        "database הוא מקום אחסון מסודר לנתונים של האפליקציה, עם כללים איך לשמור, לקרוא ולשנות אותם.",
      whyFullStack:
        "בלי database השרת מאבד מידע אחרי restart או שומר מידע בצורה שקשה לאמת, לחפש ולתחזק.",
      codeExample:
        "CREATE DATABASE learning_portal;",
      codeExplanation:
        "פקודה זו יוצרת בסיס נתונים נפרד לפרויקט. בתוך ה-database יוגדרו schemas וטבלאות.",
      commonMistake:
        "לקרוא לכל קובץ או אובייקט JS בשם database. database אמיתי מספק persistence, concurrency וכללי תקינות.",
      prerequisite: "lesson_16::Node.js",
    },
    {
      conceptName: "table",
      difficulty: 2,
      simpleExplanation:
        "table היא מבנה עם עמודות ושורות. כל שורה היא רשומה, וכל עמודה מגדירה סוג מידע.",
      whyFullStack:
        "טבלאות הן החוזה בין backend, validation, UI ו-reports. שינוי בטבלה משפיע על כל ה-flow.",
      codeExample:
        "CREATE TABLE lessons (\n  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  title text NOT NULL,\n  published boolean NOT NULL DEFAULT false\n);",
      codeExplanation:
        "הטבלה lessons שומרת שיעורים עם מזהה, כותרת, ומצב פרסום.",
      commonMistake:
        "לשים בטבלה אחת מידע לא קשור. טבלה טובה מייצגת entity ברור ולא ערבוב של UI, user ו-log.",
      prerequisite: "lesson_sql_orm::database",
    },
    {
      conceptName: "row",
      difficulty: 2,
      simpleExplanation:
        "row היא רשומה אחת בטבלה, למשל משתמש אחד, שיעור אחד או הזמנה אחת.",
      whyFullStack:
        "כל מסך רשימה או עמוד פרטים ב-UI מציג בדרך כלל rows שהגיעו מה-DB דרך API.",
      codeExample:
        "INSERT INTO lessons (title, published)\nVALUES ('SQL basics', true);",
      codeExplanation:
        "INSERT יוצר row חדשה בטבלה lessons וממלא ערכים בעמודות שהוגדרו.",
      commonMistake:
        "לשכוח ש-row חייבת לכבד constraints. אם title הוא NOT NULL, אי אפשר להכניס row בלי title.",
      prerequisite: "lesson_sql_orm::table",
    },
    {
      conceptName: "column",
      difficulty: 2,
      simpleExplanation:
        "column היא שדה בטבלה. היא מגדירה שם, סוג נתונים וכללי תקינות כמו NOT NULL או UNIQUE.",
      whyFullStack:
        "column לא נכון גורם לבאגים בין frontend, validation ו-DB: מחרוזת במקום מספר, null במקום ערך חובה, או תאריך לא עקבי.",
      codeExample:
        "ALTER TABLE lessons\nADD COLUMN estimated_minutes integer NOT NULL DEFAULT 45;",
      codeExplanation:
        "migration כזו מוסיפה עמודה קיימת בצורה שמכבדת rows שכבר נמצאות בטבלה.",
      commonMistake:
        "להוסיף column חובה בלי DEFAULT במערכת עם נתונים קיימים. migration כזה עלול להיכשל.",
      prerequisite: "lesson_sql_orm::table",
    },
    {
      conceptName: "primary key",
      difficulty: 3,
      simpleExplanation:
        "primary key הוא מזהה ייחודי ויציב לכל row בטבלה.",
      whyFullStack:
        "API routes, React keys, relation queries ו-update/delete צריכים מזהה יציב כדי לעבוד על הרשומה הנכונה.",
      codeExample:
        "CREATE TABLE students (\n  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  email text NOT NULL UNIQUE\n);",
      codeExplanation:
        "id מזהה כל student. email גם ייחודי, אבל primary key נשאר המפתח הטכני לקשרים.",
      commonMistake:
        "להשתמש בשדה משתנה כמפתח ראשי. אם הערך יכול להשתנות, קשרים וטבלאות אחרות יישברו.",
      prerequisite: "lesson_sql_orm::column",
    },
    {
      conceptName: "foreign key",
      difficulty: 4,
      simpleExplanation:
        "foreign key הוא עמודה שמצביעה ל-primary key בטבלה אחרת ומונעת קשרים לא קיימים.",
      whyFullStack:
        "הוא מגן על הנתונים כשה-API מקבל userId או courseId. אי אפשר ליצור רשומה שמצביעה למשהו שלא קיים.",
      codeExample:
        "CREATE TABLE enrollments (\n  student_id integer NOT NULL REFERENCES students(id),\n  course_id integer NOT NULL REFERENCES courses(id),\n  PRIMARY KEY (student_id, course_id)\n);",
      codeExplanation:
        "טבלת enrollments מחברת students ל-courses ומונעת הרשמה לקורס או סטודנט שלא קיימים.",
      commonMistake:
        "לשמור ids בלי FOREIGN KEY ואז לגלות orphan records שה-UI לא יודע להסביר.",
      prerequisite: "lesson_sql_orm::primary key",
    },
    {
      conceptName: "relation",
      difficulty: 4,
      simpleExplanation:
        "relation היא קשר בין טבלאות: one-to-many, one-to-one או many-to-many.",
      whyFullStack:
        "מסכים אמיתיים מציגים נתונים מחוברים: משתמש והזמנות, קורס ושיעורים, פוסט ותגובות.",
      codeExample:
        "students 1--many enrollments many--1 courses",
      codeExplanation:
        "סטודנט יכול להירשם להרבה קורסים, וקורס יכול לכלול הרבה סטודנטים דרך טבלת חיבור.",
      commonMistake:
        "לשכפל מידע במקום לקשור. שכפול גורם לעדכונים כפולים ולנתונים שסותרים אחד את השני.",
      prerequisite: "lesson_sql_orm::foreign key",
    },
    {
      conceptName: "JOIN",
      difficulty: 5,
      simpleExplanation:
        "JOIN מחבר rows מטבלאות שונות לפי תנאי קשר, בדרך כלל foreign key מול primary key.",
      whyFullStack:
        "בלי JOIN השרת מחזיר מידע חלקי או מבצע הרבה queries מיותרות. JOIN נכון מחזיר מסך שלם בשאילתה אחת.",
      codeExample:
        "SELECT students.email, courses.title\nFROM enrollments\nJOIN students ON students.id = enrollments.student_id\nJOIN courses ON courses.id = enrollments.course_id;",
      codeExplanation:
        "השאילתה עוברת דרך טבלת החיבור ומחזירה לכל הרשמה את אימייל הסטודנט וכותרת הקורס.",
      commonMistake:
        "לכתוב JOIN בלי ON מדויק ולקבל כפל rows. כל JOIN חייב תנאי קשר ברור.",
      prerequisite: "lesson_sql_orm::relation",
    },
    {
      conceptName: "schema",
      difficulty: 4,
      simpleExplanation:
        "schema הוא החוזה של מבנה הנתונים: טבלאות, עמודות, סוגים, קשרים ו-constraints.",
      whyFullStack:
        "schema טוב מונע מצב שבו ה-frontend חושב ששדה קיים אבל ה-DB לא מכיר אותו, או להפך.",
      codeExample:
        "CREATE SCHEMA learning;\nCREATE TABLE learning.lessons (\n  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  title text NOT NULL\n);",
      codeExplanation:
        "PostgreSQL schema יכול לארגן טבלאות תחת namespace, מעבר למשמעות הכללית של מבנה הנתונים.",
      commonMistake:
        "לשנות schema ישירות ב-production בלי migration מסודרת ובלי להבין השפעה על קוד קיים.",
      prerequisite: "lesson_sql_orm::table",
    },
    {
      conceptName: "migration",
      difficulty: 5,
      simpleExplanation:
        "migration היא שינוי גרסתי ומבוקר ב-schema: יצירת טבלה, הוספת עמודה, שינוי constraint או יצירת index.",
      whyFullStack:
        "כל deploy שמשנה backend או ORM עשוי לדרוש שינוי DB. migration הופכת את השינוי לשחזור ובר-בדיקה.",
      codeExample:
        "ALTER TABLE courses\nADD COLUMN slug text UNIQUE;\n\nUPDATE courses\nSET slug = lower(replace(title, ' ', '-'))\nWHERE slug IS NULL;",
      codeExplanation:
        "שינוי schema יכול לכלול גם backfill לנתונים קיימים לפני שמחייבים constraint קשיח.",
      commonMistake:
        "למחוק column לפני שהקוד החדש כבר לא משתמש בו. migration בטוחה מתחשבת בסדר deploy.",
      prerequisite: "lesson_sql_orm::schema",
    },
    {
      conceptName: "ORM",
      difficulty: 4,
      simpleExplanation:
        "ORM הוא כלי שמאפשר לעבוד עם DB דרך קוד ואובייקטים במקום לכתוב כל SQL ידנית.",
      whyFullStack:
        "ORM מאיץ CRUD, מקטין boilerplate, ונותן type safety או schema tooling, אבל עדיין נשען על SQL ועל constraints.",
      codeExample:
        "const courses = await orm.course.findMany({\n  where: { active: true },\n  orderBy: { title: 'asc' }\n});",
      codeExplanation:
        "הקוד נראה כמו JavaScript, אבל מתורגם לשאילתת SQL מול ה-DB.",
      commonMistake:
        "לחשוב ש-ORM תמיד מהיר יותר מ-raw SQL. לפעמים צריך לקרוא את ה-SQL שנוצר ולשפר query או index.",
      prerequisite: "lesson_sql_orm::SQL",
    },
    {
      conceptName: "Prisma",
      difficulty: 5,
      simpleExplanation:
        "Prisma הוא ORM פופולרי ל-Node.js/TypeScript עם schema file, generated client ו-API נוח ל-CRUD וקשרים.",
      whyFullStack:
        "Prisma מחבר בין מודל נתונים ל-TypeScript ומקטין טעויות ב-API routes, אבל דורש הבנה של migrations ו-query cost.",
      codeExample:
        "const course = await prisma.course.create({\n  data: { title: input.title, active: true }\n});",
      codeExplanation:
        "Prisma יוצר row בטבלת Course לפי מודל ה-schema. ה-DB עדיין אחראי ל-constraints.",
      commonMistake:
        "ללמד Prisma כאילו הוא חובה. הוא כלי מעל SQL; פרויקט יכול לבחור Prisma, Drizzle או raw SQL לפי צרכים.",
      prerequisite: "lesson_sql_orm::ORM",
    },
    {
      conceptName: "Drizzle",
      difficulty: 5,
      simpleExplanation:
        "Drizzle הוא ORM/query builder ל-TypeScript שמדגיש SQL-like API, types קרובים ל-schema ושליטה טובה בשאילתות.",
      whyFullStack:
        "Drizzle מתאים כשצריך type safety אבל רוצים לראות מבנה SQL ברור יותר ולשלוט ב-JOIN וב-select fields.",
      codeExample:
        "const rows = await db\n  .select({ title: courses.title })\n  .from(courses)\n  .where(eq(courses.active, true));",
      codeExplanation:
        "הקוד בונה SELECT typed. הוא לא מחליף את הצורך להבין indexes, JOIN ו-transaction.",
      commonMistake:
        "להציג Drizzle כקסם. הוא כלי מעל SQL; אם ה-schema או ה-query לא נכונים, הטעות נשארת.",
      prerequisite: "lesson_sql_orm::ORM",
    },
    {
      conceptName: "CRUD",
      difficulty: 3,
      simpleExplanation:
        "CRUD הוא ארבע פעולות בסיסיות על מידע: Create, Read, Update, Delete.",
      whyFullStack:
        "כמעט כל API בסיסי ממפה routes ל-CRUD: POST יוצר, GET קורא, PATCH/PUT מעדכן, DELETE מוחק.",
      codeExample:
        "INSERT INTO courses (title) VALUES ('SQL basics');\nSELECT * FROM courses;\nUPDATE courses SET active = false WHERE id = 1;\nDELETE FROM courses WHERE id = 1;",
      codeExplanation:
        "אותו רעיון מופיע ב-SQL, REST API ו-ORM client.",
      commonMistake:
        "לבצע UPDATE או DELETE בלי WHERE. פעולה כזו עלולה להשפיע על כל הטבלה.",
      prerequisite: "lesson_17::REST API",
    },
    {
      conceptName: "transaction",
      difficulty: 6,
      simpleExplanation:
        "transaction היא קבוצה של פעולות DB שמצליחות יחד או נכשלות יחד.",
      whyFullStack:
        "כשמשלמים, נרשמים לקורס, או מעדכנים כמה טבלאות, אסור שחצי מהשינוי יישמר וחצי ייכשל.",
      codeExample:
        "BEGIN;\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\nCOMMIT;",
      codeExplanation:
        "שתי פעולות העדכון הן יחידה אחת. אם יש כשל לפני COMMIT, עושים ROLLBACK ולא משאירים מצב חלקי.",
      commonMistake:
        "לעדכן כמה טבלאות בלי transaction ואז לקבל נתונים לא עקביים אחרי שגיאה באמצע.",
      prerequisite: "lesson_sql_orm::CRUD",
    },
  ],
  quiz: [
    {
      question: "למה MongoDB קיים בפורטל לא סוגר לבד את דרישת SVCollege ל-SQL?",
      options: [
        "כי MongoDB אינו בסיס נתונים",
        "כי SQL/PostgreSQL מלמדים טבלאות, JOIN, schema רלציוני ו-migrations מסוג אחר",
        "כי SQL עובד רק ב-frontend",
        "כי Prisma עובד רק עם MongoDB",
      ],
      correct: 1,
      explanation:
        "MongoDB חשוב, אבל הדרישה כוללת גם חשיבה רלציונית: טבלאות, constraints, foreign keys, JOIN ו-migrations.",
    },
    {
      question: "מה תפקיד primary key?",
      options: [
        "לזהות כל row בצורה ייחודית",
        "לצבוע טבלה",
        "להריץ שרת Node",
        "להחליף migration",
      ],
      correct: 0,
      explanation:
        "primary key הוא מזהה יציב וייחודי לכל row, והוא בסיס לקשרים ולפעולות update/delete מדויקות.",
    },
    {
      question: "מתי צריך JOIN?",
      options: [
        "כשמחברים מידע מטבלאות שונות לפי קשר",
        "רק כשכותבים CSS",
        "כשרוצים למחוק database",
        "כשאין foreign key",
      ],
      correct: 0,
      explanation:
        "JOIN מחבר rows מטבלאות שונות לפי תנאי ON, בדרך כלל דרך foreign key.",
    },
    {
      question: "מה migration אמורה לתת לצוות?",
      options: [
        "שינוי schema גרסתי ובר-שחזור",
        "עיצוב אוטומטי לכפתורים",
        "ביטול הצורך בבדיקות",
        "החלפה של HTTP",
      ],
      correct: 0,
      explanation:
        "migration מתעדת ומריצה שינויי schema בצורה מבוקרת בין סביבות.",
    },
    {
      question: "איזה משפט נכון על Prisma ו-Drizzle?",
      options: [
        "הם כלים מעל SQL ולא חובה בכל פרויקט",
        "הם מבטלים constraints ב-DB",
        "הם עובדים רק בדפדפן",
        "הם מחליפים את הצורך ב-schema",
      ],
      correct: 0,
      explanation:
        "Prisma ו-Drizzle עוזרים לעבוד מול DB, אבל הם עדיין נשענים על SQL, schema וגבולות ביצועים.",
    },
    {
      question: "למה transaction חשובה?",
      options: [
        "כדי שכל הפעולות הקריטיות יצליחו יחד או יבוטלו יחד",
        "כדי שהשרת יעלה מהר יותר",
        "כדי למחוק foreign keys",
        "כדי להציג CSS",
      ],
      correct: 0,
      explanation:
        "transaction מונעת מצב חלקי, למשל חיוב שנשמר בלי עדכון הרשמה או העברה כספית שנעצרה באמצע.",
    },
  ],
};

if (typeof window !== "undefined") {
  window.LESSON_SQL_ORM = LESSON_SQL_ORM;
}

if (typeof module !== "undefined") {
  module.exports = { LESSON_SQL_ORM };
}
