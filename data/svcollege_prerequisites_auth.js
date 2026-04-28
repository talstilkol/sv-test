// data/svcollege_prerequisites_auth.js
// SVCollege Finish Line 1 - Auth/Security prerequisite bridge.

var SVCOLLEGE_AUTH_PREREQUISITES = {
  "lesson_auth_security::authentication": ["lesson_17::Request", "lesson_17::Response"],
  "lesson_auth_security::authorization": ["lesson_auth_security::authentication"],
  "lesson_auth_security::session": ["lesson_17::HTTP"],
  "lesson_auth_security::cookie": ["lesson_auth_security::session"],
  "lesson_auth_security::secure cookie": ["lesson_auth_security::cookie", "lesson_auth_security::XSS boundary"],
  "lesson_auth_security::JWT": ["lesson_auth_security::authentication"],
  "lesson_auth_security::access token": ["lesson_auth_security::JWT"],
  "lesson_auth_security::refresh token": ["lesson_auth_security::access token", "lesson_auth_security::secure cookie"],
  "lesson_auth_security::OAuth": ["lesson_auth_security::authentication", "lesson_auth_security::authorization"],
  "lesson_auth_security::provider auth": ["lesson_auth_security::OAuth", "lesson_auth_security::authorization"],
  "lesson_auth_security::password hashing": ["lesson_sql_orm::database"],
  "lesson_auth_security::bcrypt": ["lesson_auth_security::password hashing"],
  "lesson_auth_security::CSRF": ["lesson_auth_security::secure cookie"],
  "lesson_auth_security::XSS boundary": ["lesson_13::DOM"],
  "lesson_auth_security::CORS": ["lesson_17::HTTP", "lesson_17::middleware"],
  "lesson_auth_security::middleware guard": ["lesson_17::middleware", "lesson_auth_security::authentication"],
  "lesson_auth_security::Supabase Auth": ["lesson_auth_security::provider auth"],
  "lesson_auth_security::Firebase Auth": ["lesson_auth_security::provider auth", "lesson_auth_security::JWT"],
  "lesson_auth_security::Kinde/Appwrite": ["lesson_auth_security::provider auth", "lesson_auth_security::authorization"],
};

if (typeof window !== "undefined") {
  window.SVCOLLEGE_AUTH_PREREQUISITES = SVCOLLEGE_AUTH_PREREQUISITES;
  if (window.CONCEPT_PREREQUISITES) {
    Object.keys(SVCOLLEGE_AUTH_PREREQUISITES).forEach(function assignAuthPrerequisite(key) {
      window.CONCEPT_PREREQUISITES[key] = SVCOLLEGE_AUTH_PREREQUISITES[key];
    });
  }
}

if (typeof module !== "undefined") {
  module.exports = { SVCOLLEGE_AUTH_PREREQUISITES: SVCOLLEGE_AUTH_PREREQUISITES };
}
