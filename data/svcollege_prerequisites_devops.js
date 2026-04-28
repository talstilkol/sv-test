// data/svcollege_prerequisites_devops.js
// SVCollege Finish Line 1 - DevOps prerequisite bridge.

var SVCOLLEGE_DEVOPS_PREREQUISITES = {
  "lesson_devops_deploy::production readiness": ["lesson_tooling_git::npm scripts", "react_blueprint::Testing Strategies"],
  "lesson_devops_deploy::environment variables": ["lesson_auth_security::secure cookie", "lesson_16::Node.js"],
  "lesson_devops_deploy::Vercel deploy": ["lesson_tooling_git::GitHub workflow", "lesson_devops_deploy::build command"],
  "lesson_devops_deploy::preview deployment": ["lesson_tooling_git::pull request", "lesson_devops_deploy::Vercel deploy"],
  "lesson_devops_deploy::build command": ["lesson_tooling_git::npm scripts"],
  "lesson_devops_deploy::Docker": ["lesson_16::Node.js", "lesson_devops_deploy::environment variables"],
  "lesson_devops_deploy::Dockerfile": ["lesson_devops_deploy::Docker", "lesson_devops_deploy::build command"],
  "lesson_devops_deploy::image": ["lesson_devops_deploy::Dockerfile"],
  "lesson_devops_deploy::container": ["lesson_devops_deploy::image"],
  "lesson_devops_deploy::Docker Compose": ["lesson_devops_deploy::container", "lesson_sql_orm::database"],
  "lesson_devops_deploy::service": ["lesson_devops_deploy::Docker Compose"],
  "lesson_devops_deploy::volume": ["lesson_devops_deploy::service", "lesson_sql_orm::database"],
  "lesson_devops_deploy::health check": ["lesson_17::Status Codes", "lesson_17::Response"],
  "lesson_devops_deploy::CI": ["lesson_tooling_git::GitHub workflow", "lesson_devops_deploy::build command"],
  "lesson_devops_deploy::CD": ["lesson_devops_deploy::CI", "lesson_devops_deploy::Vercel deploy"],
  "lesson_devops_deploy::smoke test": ["react_blueprint::Testing Strategies", "lesson_devops_deploy::Vercel deploy"],
  "lesson_devops_deploy::release checklist": ["lesson_devops_deploy::production readiness", "lesson_devops_deploy::smoke test"],
};

if (typeof window !== "undefined") {
  window.SVCOLLEGE_DEVOPS_PREREQUISITES = SVCOLLEGE_DEVOPS_PREREQUISITES;
  if (window.CONCEPT_PREREQUISITES) {
    Object.keys(SVCOLLEGE_DEVOPS_PREREQUISITES).forEach(function assignDevopsPrerequisite(key) {
      window.CONCEPT_PREREQUISITES[key] = SVCOLLEGE_DEVOPS_PREREQUISITES[key];
    });
  }
}

if (typeof module !== "undefined") {
  module.exports = { SVCOLLEGE_DEVOPS_PREREQUISITES: SVCOLLEGE_DEVOPS_PREREQUISITES };
}
