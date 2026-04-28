// data/svcollege_prerequisites_nestjs.js
// SVCollege Finish Line 1 - Nest.js prerequisite bridge.

var SVCOLLEGE_NESTJS_PREREQUISITES = {
  "lesson_nestjs::Nest.js": ["lesson_17::Express", "lesson_16::Node.js", "lesson_26::TypeScript"],
  "lesson_nestjs::module": ["lesson_nestjs::Nest.js"],
  "lesson_nestjs::controller": ["lesson_nestjs::module", "lesson_17::Route"],
  "lesson_nestjs::provider": ["lesson_nestjs::module", "lesson_nestjs::dependency injection"],
  "lesson_nestjs::service": ["lesson_nestjs::provider"],
  "lesson_nestjs::dependency injection": ["lesson_13::class", "lesson_26::Typing Props"],
  "lesson_nestjs::decorator": ["lesson_26::TypeScript", "lesson_13::class"],
  "lesson_nestjs::DTO": ["lesson_26::interface", "lesson_18::validation"],
  "lesson_nestjs::validation pipe": ["lesson_nestjs::DTO", "lesson_18::validation"],
  "lesson_nestjs::guard": ["lesson_auth_security::authorization", "lesson_auth_security::JWT"],
  "lesson_nestjs::pipe": ["lesson_17::Query Parameters", "lesson_nestjs::decorator"],
  "lesson_nestjs::middleware": ["lesson_17::middleware"],
  "lesson_nestjs::interceptor": ["lesson_nestjs::controller"],
  "lesson_nestjs::exception filter": ["lesson_15::Error", "lesson_17::Status Codes"],
  "lesson_nestjs::repository pattern": ["lesson_sql_orm::ORM", "lesson_sql_orm::CRUD"],
  "lesson_nestjs::testing module": ["react_blueprint::Testing Strategies", "lesson_nestjs::provider"],
};

if (typeof window !== "undefined") {
  window.SVCOLLEGE_NESTJS_PREREQUISITES = SVCOLLEGE_NESTJS_PREREQUISITES;
  if (window.CONCEPT_PREREQUISITES) {
    Object.keys(SVCOLLEGE_NESTJS_PREREQUISITES).forEach(function assignNestjsPrerequisite(key) {
      window.CONCEPT_PREREQUISITES[key] = SVCOLLEGE_NESTJS_PREREQUISITES[key];
    });
  }
}

if (typeof module !== "undefined") {
  module.exports = { SVCOLLEGE_NESTJS_PREREQUISITES: SVCOLLEGE_NESTJS_PREREQUISITES };
}
