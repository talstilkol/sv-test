// data/svcollege_builds_sql_orm.js
// SVCollege Finish Line 1 - SQL/ORM Mini Build practice.

var SVCOLLEGE_SQL_ORM_BUILDS = [
  {
    id: "build_svsql_001",
    conceptKey: "lesson_sql_orm::schema",
    level: 5,
    title: "Schema רלציוני לקורסים והרשמות",
    prompt:
      "כתוב SQL שיוצר שלוש טבלאות: students, courses, enrollments. לכל טבלה צריך primary key. enrollments צריכה foreign keys אל students ו-courses וסטטוס active.",
    starter:
      "CREATE TABLE students (\n  -- columns\n);\n\nCREATE TABLE courses (\n  -- columns\n);\n\nCREATE TABLE enrollments (\n  -- columns\n);",
    tests: [
      { regex: "CREATE\\s+TABLE\\s+students", description: "יוצר טבלת students", flags: "i" },
      { regex: "CREATE\\s+TABLE\\s+courses", description: "יוצר טבלת courses", flags: "i" },
      { regex: "CREATE\\s+TABLE\\s+enrollments", description: "יוצר טבלת enrollments", flags: "i" },
      { regex: "PRIMARY\\s+KEY", description: "מגדיר primary key", flags: "i" },
      { regex: "REFERENCES\\s+students", description: "enrollments מצביע ל-students", flags: "i" },
      { regex: "REFERENCES\\s+courses", description: "enrollments מצביע ל-courses", flags: "i" },
      { regex: "active\\s+boolean", description: "כולל סטטוס active בוליאני", flags: "i" },
    ],
    reference:
      "CREATE TABLE students (\n  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  email text NOT NULL UNIQUE\n);\n\nCREATE TABLE courses (\n  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  title text NOT NULL,\n  active boolean NOT NULL DEFAULT true\n);\n\nCREATE TABLE enrollments (\n  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  student_id integer NOT NULL REFERENCES students(id),\n  course_id integer NOT NULL REFERENCES courses(id),\n  active boolean NOT NULL DEFAULT true,\n  UNIQUE (student_id, course_id)\n);",
    hint:
      "התחל מהטבלאות העצמאיות ורק אחר כך טבלת קשר. foreign key חייב להפנות לטבלה שכבר קיימת.",
    explanation:
      "schema כזה מדגים primary keys, foreign keys וקשר many-to-many. הוא גם מונע הרשמה כפולה דרך UNIQUE.",
    requiredConcepts: ["lesson_sql_orm::schema", "lesson_sql_orm::foreign key", "lesson_sql_orm::relation"],
    requiredTerms: ["CREATE TABLE", "PRIMARY KEY", "REFERENCES", "UNIQUE"],
    sideExplanation:
      "הסיכון המרכזי הוא ליצור טבלת enrollments בלי constraints ואז לקבל קשרים כפולים או לא קיימים.",
  },
  {
    id: "build_svsql_002",
    conceptKey: "lesson_sql_orm::Prisma",
    level: 5,
    title: "CRUD service עם Prisma",
    prompt:
      "כתוב service קטן עם ארבע פונקציות Prisma עבור Course: createCourse(title), listCourses(), renameCourse(id, title), archiveCourse(id). אל תיצור id בקוד; תן ל-DB/schema לנהל מזהים.",
    starter:
      "async function createCourse(title) {\n  // code\n}\n\nasync function listCourses() {\n  // code\n}\n\nasync function renameCourse(id, title) {\n  // code\n}\n\nasync function archiveCourse(id) {\n  // code\n}",
    tests: [
      { regex: "prisma\\.course\\.create", description: "משתמש ב-create", flags: "" },
      { regex: "prisma\\.course\\.findMany", description: "משתמש ב-findMany", flags: "" },
      { regex: "prisma\\.course\\.update", description: "משתמש ב-update", flags: "" },
      { regex: "where\\s*:\\s*\\{\\s*id\\s*\\}", description: "מעדכן לפי shorthand where: { id }", flags: "" },
      { regex: "active\\s*:\\s*false", description: "archive משנה active ל-false", flags: "" },
    ],
    reference:
      "async function createCourse(title) {\n  return prisma.course.create({\n    data: { title, active: true },\n  });\n}\n\nasync function listCourses() {\n  return prisma.course.findMany({\n    where: { active: true },\n    orderBy: { title: 'asc' },\n  });\n}\n\nasync function renameCourse(id, title) {\n  return prisma.course.update({\n    where: { id },\n    data: { title },\n  });\n}\n\nasync function archiveCourse(id) {\n  return prisma.course.update({\n    where: { id },\n    data: { active: false },\n  });\n}",
    hint:
      "Prisma create מקבל data. update מקבל where ו-data. אל תעקוף constraints ואל תייצר id בצד הלקוח.",
    explanation:
      "Prisma מקצר CRUD ונותן API typed, אבל ה-DB עדיין אחראי ל-primary key, unique ו-constraints.",
    requiredConcepts: ["lesson_sql_orm::Prisma", "lesson_sql_orm::CRUD", "lesson_sql_orm::primary key"],
    requiredTerms: ["Prisma", "create", "findMany", "update", "where"],
    sideExplanation:
      "היעילות תלויה בשאילתה שנוצרת. עבור מסכים גדולים צריך לבדוק select fields, pagination ו-indexes.",
  },
  {
    id: "build_svsql_003",
    conceptKey: "lesson_sql_orm::Drizzle",
    level: 6,
    title: "Drizzle JOIN לקריאת הרשמות פעילות",
    prompt:
      "כתוב query ב-Drizzle שמחזיר title של course ו-email של student עבור enrollments פעילות בלבד. השתמש ב-select מפורש, from(enrollments), innerJoin ל-students ו-courses, ו-where על active.",
    starter:
      "async function listActiveEnrollments(db) {\n  return db\n    .select({\n      // fields\n    })\n    .from(enrollments)\n    // joins\n    // where\n}",
    tests: [
      { regex: "\\.select\\s*\\(", description: "משתמש ב-select מפורש", flags: "" },
      { regex: "\\.from\\s*\\(\\s*enrollments\\s*\\)", description: "מתחיל מטבלת enrollments", flags: "" },
      { regex: "\\.innerJoin\\s*\\(\\s*students", description: "מצרף students", flags: "" },
      { regex: "\\.innerJoin\\s*\\(\\s*courses", description: "מצרף courses", flags: "" },
      { regex: "eq\\s*\\(\\s*enrollments\\.studentId\\s*,\\s*students\\.id\\s*\\)", description: "JOIN students לפי FK", flags: "" },
      { regex: "eq\\s*\\(\\s*enrollments\\.courseId\\s*,\\s*courses\\.id\\s*\\)", description: "JOIN courses לפי FK", flags: "" },
      { regex: "\\.where\\s*\\(\\s*eq\\s*\\(\\s*enrollments\\.active\\s*,\\s*true\\s*\\)", description: "מסנן הרשמות פעילות", flags: "" },
    ],
    reference:
      "async function listActiveEnrollments(db) {\n  return db\n    .select({\n      courseTitle: courses.title,\n      studentEmail: students.email,\n    })\n    .from(enrollments)\n    .innerJoin(students, eq(enrollments.studentId, students.id))\n    .innerJoin(courses, eq(enrollments.courseId, courses.id))\n    .where(eq(enrollments.active, true));\n}",
    hint:
      "חשוב לבחור fields מפורשים ולא להחזיר כל עמודה. כל innerJoin צריך eq בין FK ל-PK.",
    explanation:
      "Drizzle שומר על מבנה שמזכיר SQL: select/from/join/where. זה עוזר לראות את עלות השאילתה ואת הקשרים.",
    requiredConcepts: ["lesson_sql_orm::Drizzle", "lesson_sql_orm::JOIN", "lesson_sql_orm::foreign key"],
    requiredTerms: ["Drizzle", "select", "innerJoin", "eq", "where"],
    sideExplanation:
      "הסיכון הוא להחזיר יותר מדי שדות או ליצור JOIN לא נכון. select מפורש מקטין payload ומשפר קריאות.",
  },
];

function appendSqlOrmBuildsOnce(target, items) {
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
  window.SVCOLLEGE_SQL_ORM_BUILDS = SVCOLLEGE_SQL_ORM_BUILDS;
  if (!window.QUESTIONS_BUILD) window.QUESTIONS_BUILD = [];
  appendSqlOrmBuildsOnce(window.QUESTIONS_BUILD, SVCOLLEGE_SQL_ORM_BUILDS);
}

if (typeof module !== "undefined") {
  module.exports = { SVCOLLEGE_SQL_ORM_BUILDS: SVCOLLEGE_SQL_ORM_BUILDS };
}
