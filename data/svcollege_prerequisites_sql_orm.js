// data/svcollege_prerequisites_sql_orm.js
// SVCollege Finish Line 1 - SQL/ORM prerequisite bridge.

var SVCOLLEGE_SQL_ORM_PREREQUISITES = {
  "lesson_sql_orm::SQL": ["lesson_17::CRUD"],
  "lesson_sql_orm::PostgreSQL": ["lesson_sql_orm::SQL", "lesson_sql_orm::database"],
  "lesson_sql_orm::database": ["lesson_16::Node.js"],
  "lesson_sql_orm::table": ["lesson_sql_orm::database"],
  "lesson_sql_orm::row": ["lesson_sql_orm::table"],
  "lesson_sql_orm::column": ["lesson_sql_orm::table"],
  "lesson_sql_orm::primary key": ["lesson_sql_orm::row", "lesson_sql_orm::column"],
  "lesson_sql_orm::foreign key": ["lesson_sql_orm::primary key"],
  "lesson_sql_orm::relation": ["lesson_sql_orm::foreign key", "lesson_sql_orm::table"],
  "lesson_sql_orm::JOIN": ["lesson_sql_orm::relation", "lesson_sql_orm::SQL"],
  "lesson_sql_orm::schema": ["lesson_sql_orm::table", "lesson_sql_orm::column"],
  "lesson_sql_orm::migration": ["lesson_sql_orm::schema", "lesson_tooling_git::GitHub workflow"],
  "lesson_sql_orm::ORM": ["lesson_sql_orm::SQL", "lesson_sql_orm::schema", "lesson_16::npm"],
  "lesson_sql_orm::Prisma": ["lesson_sql_orm::ORM", "lesson_sql_orm::migration"],
  "lesson_sql_orm::Drizzle": ["lesson_sql_orm::ORM", "lesson_sql_orm::JOIN"],
  "lesson_sql_orm::CRUD": ["lesson_17::REST API", "lesson_sql_orm::SQL"],
  "lesson_sql_orm::transaction": ["lesson_sql_orm::CRUD", "lesson_sql_orm::PostgreSQL"],
};

if (typeof window !== "undefined") {
  window.SVCOLLEGE_SQL_ORM_PREREQUISITES = SVCOLLEGE_SQL_ORM_PREREQUISITES;
  if (window.CONCEPT_PREREQUISITES) {
    Object.keys(SVCOLLEGE_SQL_ORM_PREREQUISITES).forEach(function assignSqlOrmPrerequisite(key) {
      window.CONCEPT_PREREQUISITES[key] = SVCOLLEGE_SQL_ORM_PREREQUISITES[key];
    });
  }
}

if (typeof module !== "undefined") {
  module.exports = { SVCOLLEGE_SQL_ORM_PREREQUISITES: SVCOLLEGE_SQL_ORM_PREREQUISITES };
}
