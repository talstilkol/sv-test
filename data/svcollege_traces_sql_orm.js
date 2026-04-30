// data/svcollege_traces_sql_orm.js
// SVCollege Finish Line 1 - SQL/ORM Code Trace practice.

var SVCOLLEGE_SQL_ORM_TRACES = [
  {
    id: "trace_svsql_001",
    conceptKey: "lesson_sql_orm::JOIN",
    level: 5,
    title: "מעקב אחרי JOIN עם סינון",
    code:
      "-- students\n-- id\n-- 1\n-- 2\n\n-- enrollments\n-- id | student_id | course_id | active\n-- 10 | 1          | 7         | true\n-- 11 | 1          | 8         | false\n-- 12 | 2          | 7         | true\n\nSELECT students.id, enrollments.course_id\nFROM enrollments\nJOIN students ON students.id = enrollments.student_id\nWHERE enrollments.active = true\nORDER BY students.id;",
    steps: [
      {
        line: 14,
        prompt: "איזה תנאי מחבר את enrollments ל-students?",
        answer: "students.id = enrollments.student_id",
        acceptable: ["students.id=enrollments.student_id", "id = student_id"],
        hint: "קרא את החלק שאחרי ON.",
      },
      {
        line: 15,
        prompt: "כמה rows יישארו אחרי WHERE active = true?",
        answer: "2",
        hint: "רק enrollments עם active=true נשארות: 10 ו-12.",
      },
      {
        line: 11,
        prompt: "מה יהיה students.id בשורה הראשונה אחרי ORDER BY students.id?",
        answer: "1",
        hint: "student_id=1 מגיע לפני student_id=2.",
      },
    ],
    explanation:
      "ה-JOIN מחבר כל enrollment ל-student שלו, WHERE מסנן הרשמות פעילות, ו-ORDER BY קובע סדר יציב.",
    requiredConcepts: ["lesson_sql_orm::JOIN", "lesson_sql_orm::foreign key"],
    requiredTerms: ["JOIN", "ON", "WHERE", "ORDER BY"],
    sideExplanation:
      "Trace כזה בודק גם syntax וגם הבנת cardinality: כמה rows חוזרות ולמה.",
  },
  {
    id: "trace_svsql_002",
    conceptKey: "lesson_sql_orm::transaction",
    level: 6,
    title: "Transaction שמעדכן שתי רשומות יחד",
    code:
      "-- accounts before\n-- id | balance\n-- 1  | 100\n-- 2  | 20\n\nBEGIN;\nUPDATE accounts SET balance = balance - 30 WHERE id = 1;\nUPDATE accounts SET balance = balance + 30 WHERE id = 2;\nCOMMIT;\n\nSELECT id, balance FROM accounts ORDER BY id;",
    steps: [
      {
        line: 7,
        prompt: "מה balance של account 1 אחרי ה-UPDATE הראשון?",
        answer: "70",
        hint: "100 פחות 30.",
      },
      {
        line: 8,
        prompt: "מה balance של account 2 אחרי ה-UPDATE השני?",
        answer: "50",
        hint: "20 ועוד 30.",
      },
      {
        line: 9,
        prompt: "מה COMMIT עושה כאן?",
        answer: "שומר את שתי הפעולות יחד",
        acceptable: ["שומר", "commit", "מאשר את שתי הפעולות", "שומר את השינויים"],
        hint: "transaction אמורה להפוך כמה פעולות ליחידה אחת.",
      },
    ],
    explanation:
      "העברה בין חשבונות היא פעולה אחת מבחינה עסקית. transaction מבטיחה ששני העדכונים יאושרו יחד או יבוטלו יחד במקרה כשל.",
    requiredConcepts: ["lesson_sql_orm::transaction", "lesson_sql_orm::CRUD"],
    requiredTerms: ["BEGIN", "UPDATE", "COMMIT", "ROLLBACK"],
    sideExplanation:
      "בלי transaction אפשר להשאיר account אחד מעודכן והשני לא, וזה מצב נתונים לא עקבי.",
  },
  {
    id: "trace_svsql_003",
    conceptKey: "lesson_sql_orm::foreign key",
    level: 5,
    title: "Foreign key שמונע קשר לא קיים",
    code:
      "CREATE TABLE students (\n  id integer PRIMARY KEY\n);\n\nCREATE TABLE enrollments (\n  id integer PRIMARY KEY,\n  student_id integer NOT NULL REFERENCES students(id)\n);\n\nINSERT INTO students (id) VALUES (1);\nINSERT INTO enrollments (id, student_id) VALUES (20, 99);",
    steps: [
      {
        line: 8,
        prompt: "לאיזה שדה student_id חייב להתאים?",
        answer: "students(id)",
        acceptable: ["students.id", "id בטבלת students"],
        hint: "החלק REFERENCES מגדיר את היעד.",
      },
      {
        line: 11,
        prompt: "האם ה-INSERT האחרון יצליח?",
        answer: "לא",
        acceptable: ["no", "false", "יכשל", "ייכשל"],
        hint: "בטבלת students קיימת רק row עם id=1.",
      },
      {
        line: 11,
        prompt: "איזה ערך גורם לכשל?",
        answer: "99",
        hint: "student_id=99 לא קיים ב-students.",
      },
    ],
    explanation:
      "foreign key שומר על referential integrity. אי אפשר להכניס enrollment שמצביע ל-student שלא קיים.",
    requiredConcepts: ["lesson_sql_orm::foreign key", "lesson_sql_orm::primary key"],
    requiredTerms: ["REFERENCES", "foreign key", "primary key"],
    sideExplanation:
      "זה ההבדל בין בדיקה בשרת בלבד לבין constraint שה-DB אוכף תמיד.",
  },
  {
    id: "trace_svsql_column_001",
    conceptKey: "lesson_sql_orm::column",
    level: 4,
    title: "Column מגדיר שדה בטבלה",
    code:
      "CREATE TABLE students (\n  id integer PRIMARY KEY,\n  email text NOT NULL,\n  active boolean DEFAULT true\n);\n\nINSERT INTO students (id, email) VALUES (1, 'tal@example.com');\nSELECT email, active FROM students WHERE id = 1;",
    steps: [
      {
        line: 3,
        prompt: "איזה column מחייב ערך?",
        answer: "email",
        hint: "NOT NULL נמצא על email.",
      },
      {
        line: 4,
        prompt: "מה ערך ברירת המחדל של active?",
        answer: "true",
        hint: "DEFAULT true.",
      },
      {
        line: 8,
        prompt: "איזה column נשלף יחד עם active?",
        answer: "email",
        hint: "SELECT email, active.",
      },
    ],
    explanation:
      "column הוא שדה בטבלה. לכל column יש שם, טיפוס, ולעיתים constraints כמו NOT NULL או DEFAULT.",
    requiredConcepts: ["lesson_sql_orm::column", "lesson_sql_orm::table"],
    requiredTerms: ["column", "NOT NULL", "DEFAULT"],
    sideExplanation:
      "מעקב כזה מוודא שמבינים schema ברמת שדה, לא רק את שם הטבלה.",
  },
  {
    id: "trace_svsql_database_001",
    conceptKey: "lesson_sql_orm::database",
    level: 4,
    title: "Database מחזיק כמה טבלאות קשורות",
    code:
      "const database = {\n  students: [{ id: 1, name: 'Tal' }],\n  courses: [{ id: 7, title: 'Full Stack' }]\n};\n\nconsole.log(Object.keys(database).length);\nconsole.log(database.students[0].name);",
    steps: [
      {
        line: 6,
        prompt: "כמה טבלאות יש במודל?",
        answer: "2",
        hint: "students ו-courses.",
      },
      {
        line: 7,
        prompt: "מה שם ה-student הראשון?",
        answer: "Tal",
        hint: "database.students[0].name.",
      },
    ],
    explanation:
      "database הוא אוסף מאורגן של טבלאות, constraints ונתונים. באפליקציה אמיתית הוא שומר מידע מעבר לזיכרון זמני.",
    requiredConcepts: ["lesson_sql_orm::database", "lesson_sql_orm::table"],
    requiredTerms: ["database", "table", "persistent data"],
    sideExplanation:
      "הדוגמה משתמשת באובייקט JS רק כדי לעקוב אחרי המבנה; הרעיון הוא הפרדה בין טבלאות בתוך DB.",
  },
  {
    id: "trace_svsql_migration_001",
    conceptKey: "lesson_sql_orm::migration",
    level: 5,
    title: "Migration בטוחה לעמודה חדשה",
    code:
      "-- rows already exist in users\nALTER TABLE users ADD COLUMN active boolean DEFAULT true;\nUPDATE users SET active = true WHERE active IS NULL;\nALTER TABLE users ALTER COLUMN active SET NOT NULL;\n\nSELECT active FROM users LIMIT 1;",
    steps: [
      {
        line: 2,
        prompt: "איזה DEFAULT נוסף לעמודה?",
        answer: "true",
        hint: "DEFAULT true.",
      },
      {
        line: 3,
        prompt: "מה מתקן rows ישנות?",
        answer: "UPDATE",
        acceptable: ["UPDATE users", "UPDATE"],
        hint: "ה-UPDATE ממלא ערכים חסרים.",
      },
      {
        line: 4,
        prompt: "איזה constraint נוסף בסוף?",
        answer: "NOT NULL",
        hint: "ALTER COLUMN active SET NOT NULL.",
      },
    ],
    explanation:
      "migration משנה schema בצורה מבוקרת. כשיש נתונים קיימים, מוסיפים DEFAULT/backfill לפני שמחייבים NOT NULL.",
    requiredConcepts: ["lesson_sql_orm::migration", "lesson_sql_orm::column"],
    requiredTerms: ["migration", "DEFAULT", "NOT NULL"],
    sideExplanation:
      "זה תרחיש production שכיח: שינוי schema חייב להתחשב בנתונים שכבר קיימים.",
  },
  {
    id: "trace_svsql_orm_001",
    conceptKey: "lesson_sql_orm::ORM",
    level: 5,
    title: "ORM בונה query מתוך קריאה בקוד",
    code:
      "const prismaCall = {\n  model: 'student',\n  action: 'findMany',\n  where: { active: true }\n};\n\nconsole.log(prismaCall.model);\nconsole.log(prismaCall.where.active);",
    steps: [
      {
        line: 7,
        prompt: "איזה model נשאל?",
        answer: "student",
        hint: "model.",
      },
      {
        line: 8,
        prompt: "מה תנאי הסינון?",
        answer: "active true",
        acceptable: ["active=true", "active true", "active: true"],
        hint: "where.active הוא true.",
      },
    ],
    explanation:
      "ORM ממפה בין קוד האפליקציה לבין SQL. הוא לא מבטל את הצורך להבין טבלאות, where ויחסים.",
    requiredConcepts: ["lesson_sql_orm::ORM", "lesson_sql_orm::SQL"],
    requiredTerms: ["ORM", "model", "where"],
    sideExplanation:
      "ה-trace בודק האם מבינים שהקריאה הנוחה בקוד מייצגת query אמיתי מול DB.",
  },
  {
    id: "trace_svsql_postgresql_001",
    conceptKey: "lesson_sql_orm::PostgreSQL",
    level: 4,
    title: "PostgreSQL אוכף schema ו-constraints",
    code:
      "CREATE TABLE tasks (\n  id integer PRIMARY KEY,\n  title text NOT NULL\n);\n\nINSERT INTO tasks (id, title) VALUES (1, 'Study SQL');\nINSERT INTO tasks (id, title) VALUES (1, 'Duplicate id');",
    steps: [
      {
        line: 2,
        prompt: "איזה column הוא primary key?",
        answer: "id",
        hint: "id integer PRIMARY KEY.",
      },
      {
        line: 6,
        prompt: "האם ה-INSERT הראשון תקין?",
        answer: "כן",
        acceptable: ["כן", "true", "yes"],
        hint: "id=1 מופיע בפעם הראשונה.",
      },
      {
        line: 7,
        prompt: "למה ה-INSERT השני ייכשל?",
        answer: "Duplicate id",
        acceptable: ["duplicate id", "primary key כפול", "id כפול"],
        hint: "primary key חייב להיות ייחודי.",
      },
    ],
    explanation:
      "PostgreSQL הוא DB רלציוני שמריץ SQL ואוכף constraints כמו PRIMARY KEY ו-NOT NULL.",
    requiredConcepts: ["lesson_sql_orm::PostgreSQL", "lesson_sql_orm::primary key"],
    requiredTerms: ["PostgreSQL", "PRIMARY KEY", "constraint"],
    sideExplanation:
      "הערך של DB רלציוני הוא לא רק שמירה, אלא אכיפת כללי תקינות.",
  },
  {
    id: "trace_svsql_primary_key_001",
    conceptKey: "lesson_sql_orm::primary key",
    level: 4,
    title: "Primary key מזהה row אחת",
    code:
      "const rows = [\n  { id: 1, email: 'a@example.com' },\n  { id: 2, email: 'b@example.com' }\n];\nconst target = rows.find((row) => row.id === 2);\nconsole.log(target.email);",
    steps: [
      {
        line: 5,
        prompt: "איזה id מחפשים?",
        answer: "2",
        hint: "row.id === 2.",
      },
      {
        line: 6,
        prompt: "איזה email נמצא?",
        answer: "b@example.com",
        hint: "זה ה-row עם id=2.",
      },
    ],
    explanation:
      "primary key הוא מזהה ייחודי ויציב שמאפשר למצוא, לעדכן או למחוק row אחת בלי עמימות.",
    requiredConcepts: ["lesson_sql_orm::primary key", "lesson_sql_orm::row"],
    requiredTerms: ["primary key", "id", "row"],
    sideExplanation:
      "בלי מפתח ייחודי, פעולות update/delete עלולות לפגוע ביותר מדי rows.",
  },
  {
    id: "trace_svsql_relation_001",
    conceptKey: "lesson_sql_orm::relation",
    level: 5,
    title: "Relation בין students ל-enrollments",
    code:
      "-- students: id | name\n-- 1 | Tal\n\n-- enrollments: id | student_id | course\n-- 10 | 1 | SQL\n\nSELECT students.name, enrollments.course\nFROM students\nJOIN enrollments ON enrollments.student_id = students.id;",
    steps: [
      {
        line: 9,
        prompt: "איזה column יוצר את הקשר?",
        answer: "student_id",
        acceptable: ["student_id", "enrollments.student_id"],
        hint: "הוא מצביע ל-students.id.",
      },
      {
        line: 7,
        prompt: "איזה שם יחזור מה-query?",
        answer: "Tal",
        hint: "student_id=1 מתחבר ל-students.id=1.",
      },
      {
        line: 7,
        prompt: "איזה course יחזור?",
        answer: "SQL",
        hint: "זה הערך ב-enrollments.",
      },
    ],
    explanation:
      "relation היא קשר בין טבלאות, לרוב דרך foreign key שמצביע ל-primary key בטבלה אחרת.",
    requiredConcepts: ["lesson_sql_orm::relation", "lesson_sql_orm::foreign key"],
    requiredTerms: ["relation", "foreign key", "JOIN"],
    sideExplanation:
      "זה בסיס החשיבה הרלציונית: לא משכפלים הכל בטבלה אחת, אלא מחברים entities בקשר מוגדר.",
  },
  {
    id: "trace_svsql_row_001",
    conceptKey: "lesson_sql_orm::row",
    level: 4,
    title: "Row היא רשומה בטבלה",
    code:
      "const table = [\n  { id: 1, title: 'Intro' },\n  { id: 2, title: 'SQL' }\n];\nconsole.log(table.length);\nconsole.log(table[1].title);",
    steps: [
      {
        line: 5,
        prompt: "כמה rows יש בטבלה?",
        answer: "2",
        hint: "שני אובייקטים במערך.",
      },
      {
        line: 6,
        prompt: "מה title של ה-row השני?",
        answer: "SQL",
        hint: "table[1].title.",
      },
    ],
    explanation:
      "row היא רשומה אחת בטבלה. כל row מכילה ערכים לפי ה-columns של אותה טבלה.",
    requiredConcepts: ["lesson_sql_orm::row", "lesson_sql_orm::table"],
    requiredTerms: ["row", "record", "table"],
    sideExplanation:
      "גם כשמדמים בטבלת JS, חשוב להבדיל בין row אחת לבין column אחד.",
  },
  {
    id: "trace_svsql_sql_001",
    conceptKey: "lesson_sql_orm::SQL",
    level: 4,
    title: "SQL שולף rows לפי תנאי",
    code:
      "SELECT id, title\nFROM tasks\nWHERE active = true\nORDER BY id;\n\n-- rows: (1, 'Learn'), (3, 'Review')",
    steps: [
      {
        line: 1,
        prompt: "אילו columns נשלפים?",
        answer: "id, title",
        acceptable: ["id,title", "id, title"],
        hint: "אחרי SELECT.",
      },
      {
        line: 3,
        prompt: "מה תנאי הסינון?",
        answer: "active = true",
        acceptable: ["active=true", "active = true"],
        hint: "WHERE.",
      },
      {
        line: 4,
        prompt: "לפי מה מסדרים?",
        answer: "id",
        hint: "ORDER BY id.",
      },
    ],
    explanation:
      "SQL היא שפה לשאילתות מול DB רלציוני. SELECT בוחר columns, FROM בוחר table, WHERE מסנן rows.",
    requiredConcepts: ["lesson_sql_orm::SQL", "lesson_sql_orm::table"],
    requiredTerms: ["SELECT", "FROM", "WHERE"],
    sideExplanation:
      "ה-trace מפרק שאילתת SQL בסיסית כדי לוודא שהתחביר לא נקרא כמחרוזת סתמית.",
  },
  {
    id: "trace_svsql_table_001",
    conceptKey: "lesson_sql_orm::table",
    level: 4,
    title: "Table מארגנת rows ו-columns",
    code:
      "CREATE TABLE courses (\n  id integer PRIMARY KEY,\n  title text NOT NULL\n);\n\nINSERT INTO courses (id, title) VALUES (7, 'Full Stack');\nSELECT title FROM courses WHERE id = 7;",
    steps: [
      {
        line: 1,
        prompt: "איזו table נוצרת?",
        answer: "courses",
        hint: "CREATE TABLE courses.",
      },
      {
        line: 6,
        prompt: "איזה id מוכנס?",
        answer: "7",
        hint: "VALUES (7, ...).",
      },
      {
        line: 7,
        prompt: "איזה column נשלף?",
        answer: "title",
        hint: "SELECT title.",
      },
    ],
    explanation:
      "table היא מבנה רלציוני עם columns קבועים ו-rows של נתונים. כל שאילתת CRUD פועלת מול table אחת או יותר.",
    requiredConcepts: ["lesson_sql_orm::table", "lesson_sql_orm::database"],
    requiredTerms: ["table", "row", "column"],
    sideExplanation:
      "הבנת table היא בסיס ל-JOIN, migrations, ORM ו-CRUD.",
  },
];

function appendSqlOrmItemsOnce(target, items) {
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
  window.SVCOLLEGE_SQL_ORM_TRACES = SVCOLLEGE_SQL_ORM_TRACES;
  if (!window.QUESTIONS_TRACE) window.QUESTIONS_TRACE = [];
  appendSqlOrmItemsOnce(window.QUESTIONS_TRACE, SVCOLLEGE_SQL_ORM_TRACES);
  if (window.QUESTIONS_BANK) {
    window.QUESTIONS_BANK.trace = window.QUESTIONS_TRACE;
  }
}

if (typeof module !== "undefined") {
  module.exports = { SVCOLLEGE_SQL_ORM_TRACES: SVCOLLEGE_SQL_ORM_TRACES };
}
