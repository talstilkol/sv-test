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
