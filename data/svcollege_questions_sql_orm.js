// data/svcollege_questions_sql_orm.js
// SVCollege Finish Line 1 - SQL/ORM MC and Fill practice.

var SVCOLLEGE_SQL_ORM_TOPIC_ID = "topic_svcollege_sql_orm";

var SVCOLLEGE_SQL_ORM_QUESTIONS = {
  lessonId: "lesson_sql_orm",
  moduleTitle:
    "בסיסי נתונים ומידול מידע - MongoDB/Mongoose + PostgreSQL/Prisma/Drizzle",
  mc: [
    {
      id: "svsql_mc_001",
      topicId: SVCOLLEGE_SQL_ORM_TOPIC_ID,
      conceptKey: "lesson_sql_orm::SQL",
      level: 3,
      question: "מה SQL עושה במערכת Full Stack?",
      options: [
        "מגדיר עיצוב CSS",
        "שואל ומשנה נתונים בבסיס נתונים רלציוני",
        "מחליף את HTTP",
        "מרנדר JSX בדפדפן",
      ],
      correctIndex: 1,
      explanation:
        "SQL היא שפה לקריאה ושינוי מידע ב-DB רלציוני: SELECT, INSERT, UPDATE ו-DELETE.",
      requiredConcepts: ["lesson_17::CRUD"],
      requiredTerms: ["SELECT", "INSERT", "UPDATE", "DELETE"],
      sideExplanation:
        "גם כאשר משתמשים ב-ORM, חשוב להבין איזה SQL נוצר בפועל ומה העלות שלו.",
    },
    {
      id: "svsql_mc_002",
      topicId: SVCOLLEGE_SQL_ORM_TOPIC_ID,
      conceptKey: "lesson_sql_orm::database",
      level: 2,
      question: "מה ההבדל המדויק בין database לבין table?",
      options: [
        "database מכיל טבלאות; table היא מבנה אחד של rows ו-columns",
        "table מכיל databases",
        "אין הבדל",
        "database הוא תמיד קובץ CSS",
      ],
      correctIndex: 0,
      explanation:
        "database הוא container רחב. table היא יחידת מבנה בתוכו, עם עמודות ושורות.",
      requiredConcepts: ["lesson_sql_orm::database", "lesson_sql_orm::table"],
      requiredTerms: ["database", "table", "row", "column"],
      sideExplanation:
        "מודל נתונים מתחיל בהבנה מה שייך לאיזה container ומהו entity עצמאי.",
    },
    {
      id: "svsql_mc_003",
      topicId: SVCOLLEGE_SQL_ORM_TOPIC_ID,
      conceptKey: "lesson_sql_orm::column",
      level: 2,
      question: "בטבלה רלציונית, מה מתארת column?",
      options: [
        "רשומה אחת מלאה",
        "שדה מוגדר עם שם, סוג וכללי תקינות",
        "קובץ migration",
        "בקשת HTTP",
      ],
      correctIndex: 1,
      explanation:
        "column מגדירה שדה כמו title, email או created_at, כולל type ו-constraints.",
      requiredConcepts: ["lesson_sql_orm::table"],
      requiredTerms: ["column", "type", "constraint"],
      sideExplanation:
        "עמודה לא נכונה גורמת לפער בין ה-API, ה-validation והנתונים שנשמרים.",
    },
    {
      id: "svsql_mc_004",
      topicId: SVCOLLEGE_SQL_ORM_TOPIC_ID,
      conceptKey: "lesson_sql_orm::row",
      level: 2,
      question: "מהי row בטבלת SQL?",
      options: [
        "רשומה אחת בטבלה",
        "כל בסיס הנתונים",
        "שם של ORM",
        "סוג של JOIN",
      ],
      correctIndex: 0,
      explanation:
        "row היא מופע אחד של entity, למשל course אחד או enrollment אחת.",
      requiredConcepts: ["lesson_sql_orm::table"],
      requiredTerms: ["row", "record"],
      sideExplanation:
        "UI שמציג רשימה בדרך כלל מציג rows שהגיעו מה-DB דרך API.",
    },
    {
      id: "svsql_mc_005",
      topicId: SVCOLLEGE_SQL_ORM_TOPIC_ID,
      conceptKey: "lesson_sql_orm::primary key",
      level: 3,
      question: "למה primary key קריטי ל-update/delete?",
      options: [
        "כי הוא מזהה row אחת בצורה יציבה",
        "כי הוא משנה צבע של טבלה",
        "כי הוא מחייב React",
        "כי הוא מבטל צורך ב-WHERE",
      ],
      correctIndex: 0,
      explanation:
        "primary key מאפשר לפנות לרשומה אחת מדויקת ולבנות קשרים בין טבלאות.",
      requiredConcepts: ["lesson_sql_orm::row", "lesson_sql_orm::column"],
      requiredTerms: ["primary key", "id", "unique"],
      sideExplanation:
        "מזהה לא יציב גורם ל-API לעדכן או למחוק את הרשומה הלא נכונה.",
    },
    {
      id: "svsql_mc_006",
      topicId: SVCOLLEGE_SQL_ORM_TOPIC_ID,
      conceptKey: "lesson_sql_orm::foreign key",
      level: 4,
      question: "מה foreign key מונע?",
      options: [
        "שמירת קשר לרשומה שלא קיימת בטבלה אחרת",
        "שימוש ב-SELECT",
        "הרצת migrations",
        "שימוש ב-TypeScript",
      ],
      correctIndex: 0,
      explanation:
        "foreign key בודק שהערך מצביע ל-primary key קיים בטבלה אחרת.",
      requiredConcepts: ["lesson_sql_orm::primary key"],
      requiredTerms: ["foreign key", "REFERENCES"],
      sideExplanation:
        "בלי FK קל ליצור orphan records שהמסך לא יודע להציג או להסביר.",
    },
    {
      id: "svsql_mc_007",
      topicId: SVCOLLEGE_SQL_ORM_TOPIC_ID,
      conceptKey: "lesson_sql_orm::relation",
      level: 4,
      question: "איזה מודל מתאים לסטודנטים שנרשמים להרבה קורסים, וקורסים שיש בהם הרבה סטודנטים?",
      options: [
        "many-to-many דרך טבלת חיבור",
        "עמודה אחת עם טקסט ארוך",
        "טבלה בלי primary key",
        "CSS grid",
      ],
      correctIndex: 0,
      explanation:
        "many-to-many מיוצג בדרך כלל בעזרת טבלת junction כמו enrollments.",
      requiredConcepts: ["lesson_sql_orm::foreign key"],
      requiredTerms: ["many-to-many", "junction table", "relation"],
      sideExplanation:
        "שכפול רשימות בתוך עמודת טקסט מקשה על query, validation ועדכונים.",
    },
    {
      id: "svsql_mc_008",
      topicId: SVCOLLEGE_SQL_ORM_TOPIC_ID,
      conceptKey: "lesson_sql_orm::JOIN",
      level: 5,
      question: "למה JOIN עם תנאי ON שגוי מסוכן?",
      options: [
        "הוא יכול להכפיל rows או לחבר נתונים לא קשורים",
        "הוא מונע שימוש ב-SELECT",
        "הוא מוחק את כל הטבלאות תמיד",
        "הוא עובד רק ב-MongoDB",
      ],
      correctIndex: 0,
      explanation:
        "JOIN חייב תנאי קשר מדויק. ON שגוי עלול ליצור תוצאה מנופחת או שגויה.",
      requiredConcepts: ["lesson_sql_orm::foreign key", "lesson_sql_orm::relation"],
      requiredTerms: ["JOIN", "ON", "foreign key"],
      sideExplanation:
        "במסך production תוצאה מנופחת עלולה להיראות כמו נתונים אמיתיים, ולכן JOIN צריך בדיקת row count והבנת cardinality.",
    },
    {
      id: "svsql_mc_009",
      topicId: SVCOLLEGE_SQL_ORM_TOPIC_ID,
      conceptKey: "lesson_sql_orm::PostgreSQL",
      level: 4,
      question: "מה PostgreSQL מוסיף מעבר למערך JS בזיכרון?",
      options: [
        "persistence, constraints, transactions ושאילתות SQL",
        "רק console.log",
        "רק JSX",
        "רק קובץ package.json",
      ],
      correctIndex: 0,
      explanation:
        "PostgreSQL שומר מידע לאורך זמן ומספק שכבת עקביות וכללי תקינות.",
      requiredConcepts: ["lesson_sql_orm::database", "lesson_sql_orm::SQL"],
      requiredTerms: ["PostgreSQL", "constraint", "transaction"],
      sideExplanation:
        "אחסון בזיכרון מתאים ללמידה ראשונית, אבל לא למערכת ששומרת מידע אמיתי בין הרצות.",
    },
    {
      id: "svsql_mc_010",
      topicId: SVCOLLEGE_SQL_ORM_TOPIC_ID,
      conceptKey: "lesson_sql_orm::schema",
      level: 4,
      question: "מה schema מגדיר?",
      options: [
        "טבלאות, עמודות, סוגים, קשרים ו-constraints",
        "צבעים של dashboard",
        "תוכן של localStorage בלבד",
        "סדר imports בקובץ JS",
      ],
      correctIndex: 0,
      explanation:
        "schema הוא חוזה מבנה הנתונים שה-backend וה-DB חולקים.",
      requiredConcepts: ["lesson_sql_orm::table", "lesson_sql_orm::column"],
      requiredTerms: ["schema", "constraint", "type"],
      sideExplanation:
        "schema לא מתואם הוא מקור קלאסי לבאגים בין route, form ו-database.",
    },
    {
      id: "svsql_mc_011",
      topicId: SVCOLLEGE_SQL_ORM_TOPIC_ID,
      conceptKey: "lesson_sql_orm::migration",
      level: 5,
      question: "מה הסיכון בהוספת column חובה בלי DEFAULT לטבלה שכבר יש בה rows?",
      options: [
        "ה-migration עלולה להיכשל כי rows קיימות יקבלו ערך חסר",
        "הטבלה תהפוך אוטומטית ל-MongoDB",
        "כל SELECT יפסיק לעבוד לתמיד",
        "אין שום סיכון",
      ],
      correctIndex: 0,
      explanation:
        "אם column היא NOT NULL, צריך ערך לכל row קיימת או תהליך backfill לפני constraint קשיח.",
      requiredConcepts: ["lesson_sql_orm::schema", "lesson_sql_orm::column"],
      requiredTerms: ["migration", "NOT NULL", "DEFAULT", "backfill"],
      sideExplanation:
        "migration בטוחה מתחשבת גם בנתונים שכבר קיימים, לא רק במבנה הרצוי אחרי השינוי.",
    },
    {
      id: "svsql_mc_012",
      topicId: SVCOLLEGE_SQL_ORM_TOPIC_ID,
      conceptKey: "lesson_sql_orm::ORM",
      level: 4,
      question: "איזה משפט נכון לגבי ORM?",
      options: [
        "ORM עוזר לכתוב פעולות DB דרך קוד, אבל לא מבטל SQL ו-schema",
        "ORM מבטל את הצורך ב-DB",
        "ORM עובד רק ב-CSS",
        "ORM תמיד מהיר יותר מכל raw SQL",
      ],
      correctIndex: 0,
      explanation:
        "ORM הוא שכבה מעל ה-DB. הוא מקל על CRUD אבל עדיין מייצר queries מול database אמיתי.",
      requiredConcepts: ["lesson_sql_orm::SQL", "lesson_sql_orm::schema"],
      requiredTerms: ["ORM", "SQL", "schema"],
      sideExplanation:
        "החלטה בין ORM ל-raw SQL היא tradeoff של productivity, type safety, שליטה וביצועים.",
    },
    {
      id: "svsql_mc_013",
      topicId: SVCOLLEGE_SQL_ORM_TOPIC_ID,
      conceptKey: "lesson_sql_orm::Prisma",
      level: 5,
      question: "מה חשוב ללמד על Prisma כדי לא ליצור תלות מחשבתית בכלי?",
      options: [
        "Prisma הוא כלי מעל SQL, לא חובה אוניברסלית",
        "Prisma מחליף constraints ב-DB",
        "Prisma עובד רק בלי migrations",
        "Prisma הוא שפת CSS",
      ],
      correctIndex: 0,
      explanation:
        "Prisma הוא בחירה הנדסית. צריך להבין גם את SQL, ה-schema והשאילתות שנוצרות מתחת.",
      requiredConcepts: ["lesson_sql_orm::ORM", "lesson_sql_orm::SQL"],
      requiredTerms: ["Prisma", "ORM", "migration"],
      sideExplanation:
        "בפרויקט אמיתי בודקים מה הכלי נותן מול עלויות כמו generated client, migrations, query visibility ו-team familiarity.",
    },
    {
      id: "svsql_mc_014",
      topicId: SVCOLLEGE_SQL_ORM_TOPIC_ID,
      conceptKey: "lesson_sql_orm::Drizzle",
      level: 5,
      question: "מה מאפיין חזק של Drizzle לעומת ORM שמסתיר יותר SQL?",
      options: [
        "API typed שקרוב יותר למבנה SQL ול-select מפורש",
        "ביטול הצורך בטבלאות",
        "הרצת React components בתוך DB",
        "יצירת נתונים בלי schema",
      ],
      correctIndex: 0,
      explanation:
        "Drizzle נותן type safety עם query builder שמראה היטב from/select/join/where.",
      requiredConcepts: ["lesson_sql_orm::ORM", "lesson_sql_orm::JOIN"],
      requiredTerms: ["Drizzle", "query builder", "select"],
      sideExplanation:
        "היתרון אינו קסם ביצועים, אלא שקיפות ושליטה גבוהה יותר על צורת השאילתה.",
    },
    {
      id: "svsql_mc_015",
      topicId: SVCOLLEGE_SQL_ORM_TOPIC_ID,
      conceptKey: "lesson_sql_orm::CRUD",
      level: 3,
      question: "איזה mapping נכון בין REST ל-CRUD?",
      options: [
        "POST יוצר, GET קורא, PATCH/PUT מעדכן, DELETE מוחק",
        "GET מוחק, DELETE יוצר",
        "POST מחליף CSS",
        "PATCH תמיד יוצר database",
      ],
      correctIndex: 0,
      explanation:
        "REST API בסיסי ממפה פעולות HTTP לפעולות CRUD על rows או resources.",
      requiredConcepts: ["lesson_17::REST API"],
      requiredTerms: ["CRUD", "POST", "GET", "PATCH", "DELETE"],
      sideExplanation:
        "ה-map הזה עוזר להבין איך route ב-Express או Next route handler מגיע לשאילתת DB.",
    },
    {
      id: "svsql_mc_016",
      topicId: SVCOLLEGE_SQL_ORM_TOPIC_ID,
      conceptKey: "lesson_sql_orm::transaction",
      level: 6,
      question: "למה הרשמה לקורס בתשלום צריכה transaction?",
      options: [
        "כי יצירת payment, enrollment ועדכון seat count חייבים להצליח או להיכשל יחד",
        "כי transaction משנה את HTML",
        "כי transaction מבטל foreign keys",
        "כי כל SELECT חייב COMMIT",
      ],
      correctIndex: 0,
      explanation:
        "פעולה עסקית שמורכבת מכמה updates לא יכולה להשאיר חצי מצב אחרי כשל.",
      requiredConcepts: ["lesson_sql_orm::CRUD", "lesson_sql_orm::foreign key"],
      requiredTerms: ["transaction", "COMMIT", "ROLLBACK", "consistency"],
      sideExplanation:
        "במערכת אמיתית חוסר transaction יוצר באגים כספיים או הרשמות לא עקביות, לא רק כשל טכני קטן.",
    },
    {
      id: "svsql_mc_017",
      topicId: SVCOLLEGE_SQL_ORM_TOPIC_ID,
      conceptKey: "lesson_sql_orm::SQL",
      level: 5,
      question: "מתי raw SQL יכול להיות עדיף על ORM?",
      options: [
        "כאשר צריך שליטה מלאה בשאילתה מורכבת או ניתוח ביצועים",
        "כאשר רוצים לעקוף constraints בלי להבין",
        "כאשר אין database",
        "כאשר כותבים CSS animation",
      ],
      correctIndex: 0,
      explanation:
        "raw SQL נותן שליטה ושקיפות, אבל דורש parameterization, בדיקה וזהירות מ-SQL injection.",
      requiredConcepts: ["lesson_sql_orm::SQL", "lesson_sql_orm::ORM"],
      requiredTerms: ["raw SQL", "parameter", "SQL injection"],
      sideExplanation:
        "raw SQL מול ORM הוא tradeoff: שליטה וביצועים מול יותר אחריות על בטיחות ותחזוקה.",
    },
    {
      id: "svsql_mc_018",
      topicId: SVCOLLEGE_SQL_ORM_TOPIC_ID,
      conceptKey: "lesson_sql_orm::JOIN",
      level: 6,
      question: "מהו סימן נפוץ לבעיית N+1 queries ב-ORM?",
      options: [
        "שאילתה אחת לרשימת rows ואז query נוספת לכל row עבור קשרים",
        "שימוש ב-WHERE אחד בלבד",
        "טבלה עם primary key",
        "migration עם DEFAULT",
      ],
      correctIndex: 0,
      explanation:
        "N+1 קורה כשמביאים רשימה ואז רצים ל-DB שוב לכל item. פתרון אפשרי הוא include/join/query מתוכנן.",
      requiredConcepts: ["lesson_sql_orm::ORM", "lesson_sql_orm::JOIN", "lesson_sql_orm::relation"],
      requiredTerms: ["N+1", "relation", "JOIN", "include"],
      sideExplanation:
        "זו דוגמה לכך ש-ORM נוח לא מספיק. צריך למדוד את מספר queries ואת צורת הנתונים שחוזרים.",
    },
  ],
  fill: [
    {
      id: "svsql_fill_001",
      topicId: SVCOLLEGE_SQL_ORM_TOPIC_ID,
      conceptKey: "lesson_sql_orm::SQL",
      level: 2,
      code: "____ id, title\nFROM courses\nWHERE active = true;",
      answer: "SELECT",
      hint: "מילת המפתח לקריאת עמודות.",
      explanation: "SELECT קובע אילו עמודות חוזרות מהשאילתה.",
      requiredConcepts: ["lesson_sql_orm::SQL"],
      requiredTerms: ["SELECT"],
      sideExplanation: "שאילתה טובה מחזירה רק עמודות שהמסך באמת צריך.",
    },
    {
      id: "svsql_fill_002",
      topicId: SVCOLLEGE_SQL_ORM_TOPIC_ID,
      conceptKey: "lesson_sql_orm::table",
      level: 2,
      code: "SELECT id, title\n____ courses;",
      answer: "FROM",
      hint: "מילת המפתח שמציינת מאיזו טבלה קוראים.",
      explanation: "FROM מציינת את מקור ה-rows.",
      requiredConcepts: ["lesson_sql_orm::table"],
      requiredTerms: ["FROM", "table"],
      sideExplanation: "בלי FROM אין לשאילתה מקור נתונים ברור.",
    },
    {
      id: "svsql_fill_003",
      topicId: SVCOLLEGE_SQL_ORM_TOPIC_ID,
      conceptKey: "lesson_sql_orm::SQL",
      level: 3,
      code: "SELECT id, email\nFROM students\n____ id = 7;",
      answer: "WHERE",
      hint: "מילת מפתח לסינון rows.",
      explanation: "WHERE מסנן rows לפי תנאי.",
      requiredConcepts: ["lesson_sql_orm::row"],
      requiredTerms: ["WHERE"],
      sideExplanation: "ב-update/delete, WHERE הוא גבול בטיחות קריטי.",
    },
    {
      id: "svsql_fill_004",
      topicId: SVCOLLEGE_SQL_ORM_TOPIC_ID,
      conceptKey: "lesson_sql_orm::JOIN",
      level: 4,
      code: "SELECT students.email, courses.title\nFROM enrollments\n____ students ON students.id = enrollments.student_id\nJOIN courses ON courses.id = enrollments.course_id;",
      answer: "JOIN",
      hint: "מחבר טבלה נוספת לשאילתה.",
      explanation: "JOIN מחבר rows מטבלה אחרת לפי תנאי ON.",
      requiredConcepts: ["lesson_sql_orm::relation"],
      requiredTerms: ["JOIN", "ON"],
      sideExplanation: "JOIN נכון חוסך הרבה queries ומחזיר תמונת נתונים עקבית.",
    },
    {
      id: "svsql_fill_005",
      topicId: SVCOLLEGE_SQL_ORM_TOPIC_ID,
      conceptKey: "lesson_sql_orm::JOIN",
      level: 5,
      code: "SELECT courses.title\nFROM enrollments\nJOIN courses ____ courses.id = enrollments.course_id;",
      answer: "ON",
      hint: "מילת המפתח שמגדירה את תנאי הקשר ב-JOIN.",
      explanation: "ON מגדיר איך rows מטבלה אחת מתחברות לטבלה אחרת.",
      requiredConcepts: ["lesson_sql_orm::foreign key", "lesson_sql_orm::JOIN"],
      requiredTerms: ["ON", "JOIN", "foreign key"],
      sideExplanation: "ON שגוי יוצר תוצאה שגויה גם אם הסינטקס תקין.",
    },
    {
      id: "svsql_fill_006",
      topicId: SVCOLLEGE_SQL_ORM_TOPIC_ID,
      conceptKey: "lesson_sql_orm::foreign key",
      level: 4,
      code: "student_id integer NOT NULL ____ students(id)",
      answer: "REFERENCES",
      hint: "מילת המפתח שמחברת foreign key לטבלה אחרת.",
      explanation: "REFERENCES מציינת לאיזה primary key הערך חייב להתאים.",
      requiredConcepts: ["lesson_sql_orm::primary key"],
      requiredTerms: ["REFERENCES", "foreign key"],
      sideExplanation: "ה-DB יכול להגן על קשרים ולא להשאיר את כל האחריות לשרת.",
    },
    {
      id: "svsql_fill_007",
      topicId: SVCOLLEGE_SQL_ORM_TOPIC_ID,
      conceptKey: "lesson_sql_orm::CRUD",
      level: 3,
      code: "____ INTO courses (title, active)\nVALUES ('SQL basics', true);",
      answer: "INSERT",
      hint: "פקודת CRUD ליצירת row.",
      explanation: "INSERT INTO מוסיפה row חדשה לטבלה.",
      requiredConcepts: ["lesson_sql_orm::row", "lesson_sql_orm::CRUD"],
      requiredTerms: ["INSERT", "Create"],
      sideExplanation: "ב-ORM פעולה זו תיראה כמו create, אבל ה-DB עדיין מבצע INSERT.",
    },
    {
      id: "svsql_fill_008",
      topicId: SVCOLLEGE_SQL_ORM_TOPIC_ID,
      conceptKey: "lesson_sql_orm::CRUD",
      level: 4,
      code: "UPDATE courses\n____ active = false\nWHERE id = 7;",
      answer: "SET",
      hint: "מילת המפתח שקובעת אילו ערכים מתעדכנים.",
      explanation: "SET מגדיר את הערכים החדשים ב-UPDATE.",
      requiredConcepts: ["lesson_sql_orm::CRUD", "lesson_sql_orm::primary key"],
      requiredTerms: ["UPDATE", "SET", "WHERE"],
      sideExplanation: "UPDATE בלי WHERE הוא סיכון גבוה כי הוא יכול לעדכן את כל הטבלה.",
    },
    {
      id: "svsql_fill_009",
      topicId: SVCOLLEGE_SQL_ORM_TOPIC_ID,
      conceptKey: "lesson_sql_orm::transaction",
      level: 5,
      code: "BEGIN;\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\n____;",
      answer: "COMMIT",
      hint: "מסיים transaction ושומר את השינויים.",
      explanation: "COMMIT מאשר את כל הפעולות שבוצעו בתוך transaction.",
      requiredConcepts: ["lesson_sql_orm::transaction", "lesson_sql_orm::CRUD"],
      requiredTerms: ["BEGIN", "COMMIT", "ROLLBACK"],
      sideExplanation: "אם יש כשל לפני COMMIT, צריך ROLLBACK כדי לא להשאיר מצב חלקי.",
    },
    {
      id: "svsql_fill_010",
      topicId: SVCOLLEGE_SQL_ORM_TOPIC_ID,
      conceptKey: "lesson_sql_orm::migration",
      level: 5,
      code: "ALTER TABLE courses\nADD COLUMN slug text ____;",
      answer: "UNIQUE",
      hint: "constraint שמונע שתי rows עם אותו ערך.",
      explanation: "UNIQUE מבטיח שלא יהיו שני slugs זהים.",
      requiredConcepts: ["lesson_sql_orm::schema", "lesson_sql_orm::migration"],
      requiredTerms: ["ALTER TABLE", "UNIQUE", "constraint"],
      sideExplanation: "לפני הוספת UNIQUE לנתונים קיימים צריך לוודא שאין כפילויות.",
    },
  ],
  bugHunt: [
    {
      id: "bug_svsql_001",
      conceptKey: "lesson_sql_orm::CRUD",
      level: 5,
      title: "UPDATE בלי WHERE",
      brokenCode:
        "UPDATE courses\nSET active = false;",
      bugLine: 1,
      hint: "איזה גבול חסר כדי לדעת איזו row לעדכן?",
      options: [
        "חסר WHERE, ולכן כל הקורסים יעודכנו",
        "חסר SELECT לפני UPDATE",
        "active חייב להיות טקסט",
        "אי אפשר לעדכן boolean ב-SQL",
      ],
      correctIndex: 0,
      fix:
        "UPDATE courses\nSET active = false\nWHERE id = 7;",
      explanation:
        "UPDATE בלי WHERE משפיע על כל rows בטבלה. כאשר מעדכנים רשומה אחת חייבים תנאי שמזהה אותה, לרוב primary key.",
      requiredConcepts: ["lesson_sql_orm::CRUD", "lesson_sql_orm::primary key"],
      requiredTerms: ["UPDATE", "SET", "WHERE"],
      sideExplanation:
        "זה באג production קלאסי: syntax תקין, תוצאה עסקית הרסנית. raw SQL דורש גבולות בטיחות מפורשים.",
    },
    {
      id: "bug_svsql_002",
      conceptKey: "lesson_sql_orm::JOIN",
      level: 6,
      title: "JOIN שמחבר לפי עמודה לא נכונה",
      brokenCode:
        "SELECT students.email, courses.title\nFROM enrollments\nJOIN students ON students.id = enrollments.course_id\nJOIN courses ON courses.id = enrollments.course_id;",
      bugLine: 3,
      hint: "איזו עמודה ב-enrollments אמורה להצביע ל-students?",
      options: [
        "ה-JOIN ל-students משתמש ב-course_id במקום student_id",
        "חסר SELECT *",
        "JOIN תמיד חייב להיות LEFT JOIN",
        "courses.id לא יכול להיות primary key",
      ],
      correctIndex: 0,
      fix:
        "SELECT students.email, courses.title\nFROM enrollments\nJOIN students ON students.id = enrollments.student_id\nJOIN courses ON courses.id = enrollments.course_id;",
      explanation:
        "כל JOIN צריך להתאים FK ל-PK הנכון. students.id מתחבר ל-enrollments.student_id, לא ל-course_id.",
      requiredConcepts: ["lesson_sql_orm::JOIN", "lesson_sql_orm::foreign key", "lesson_sql_orm::relation"],
      requiredTerms: ["JOIN", "ON", "student_id", "course_id"],
      sideExplanation:
        "באג JOIN כזה יכול להחזיר rows שגויות בלי שגיאת syntax, ולכן חייבים לבדוק קשרים מול schema.",
    },
  ],
};

function appendSqlOrmQuestionsOnce(target, items) {
  var existing = {};
  for (var index = 0; index < target.length; index += 1) {
    existing[target[index].id] = true;
  }
  for (var itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
    if (!existing[items[itemIndex].id]) {
      target.push(items[itemIndex]);
      existing[items[itemIndex].id] = true;
    }
  }
}

if (typeof window !== "undefined") {
  window.SVCOLLEGE_SQL_ORM_QUESTIONS = SVCOLLEGE_SQL_ORM_QUESTIONS;
  if (window.QUESTIONS_BANK) {
    if (!window.QUESTIONS_BANK.mc) window.QUESTIONS_BANK.mc = [];
    if (!window.QUESTIONS_BANK.fill) window.QUESTIONS_BANK.fill = [];
    appendSqlOrmQuestionsOnce(window.QUESTIONS_BANK.mc, SVCOLLEGE_SQL_ORM_QUESTIONS.mc);
    appendSqlOrmQuestionsOnce(window.QUESTIONS_BANK.fill, SVCOLLEGE_SQL_ORM_QUESTIONS.fill);
  }
  if (!window.QUESTIONS_BUG) window.QUESTIONS_BUG = [];
  appendSqlOrmQuestionsOnce(window.QUESTIONS_BUG, SVCOLLEGE_SQL_ORM_QUESTIONS.bugHunt);
}

if (typeof module !== "undefined") {
  module.exports = {
    SVCOLLEGE_SQL_ORM_TOPIC_ID: SVCOLLEGE_SQL_ORM_TOPIC_ID,
    SVCOLLEGE_SQL_ORM_QUESTIONS: SVCOLLEGE_SQL_ORM_QUESTIONS,
  };
}
