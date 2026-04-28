// data/svcollege_prerequisites_nextjs.js
// SVCollege Finish Line 1 - Next.js prerequisite bridge.

var SVCOLLEGE_NEXTJS_PREREQUISITES = {
  "lesson_nextjs::Next.js": ["lesson_21::React", "lesson_tooling_git::npm scripts"],
  "lesson_nextjs::App Router": ["lesson_nextjs::Next.js"],
  "lesson_nextjs::file-system routing": ["lesson_nextjs::App Router"],
  "lesson_nextjs::dynamic route": ["lesson_nextjs::file-system routing", "lesson_17::Request"],
  "lesson_nextjs::layout": ["lesson_21::props", "lesson_nextjs::App Router"],
  "lesson_nextjs::page": ["lesson_nextjs::file-system routing"],
  "lesson_nextjs::server component": ["lesson_sql_orm::database", "lesson_21::Component"],
  "lesson_nextjs::client component": ["lesson_22::useState", "lesson_24::useEffect"],
  "lesson_nextjs::route handler": ["lesson_17::REST API", "lesson_17::Response"],
  "lesson_nextjs::API route": ["lesson_nextjs::route handler", "lesson_auth_security::authorization"],
  "lesson_nextjs::server action": ["lesson_auth_security::middleware guard", "lesson_18::validation"],
  "lesson_nextjs::SSR": ["lesson_17::HTTP", "lesson_nextjs::server component"],
  "lesson_nextjs::SSG": ["lesson_nextjs::page", "lesson_tooling_git::npm scripts"],
  "lesson_nextjs::ISR": ["lesson_nextjs::SSG"],
  "lesson_nextjs::metadata API": ["lesson_html_css_foundations::HTML document"],
  "lesson_nextjs::SEO": ["lesson_nextjs::metadata API", "lesson_html_css_foundations::semantic HTML"],
  "lesson_nextjs::image optimization": ["lesson_html_css_foundations::accessibility basics", "lesson_25::responsive design"],
  "lesson_nextjs::Vercel deploy": ["lesson_tooling_git::GitHub workflow", "lesson_tooling_git::npm scripts"],
};

if (typeof window !== "undefined") {
  window.SVCOLLEGE_NEXTJS_PREREQUISITES = SVCOLLEGE_NEXTJS_PREREQUISITES;
  if (window.CONCEPT_PREREQUISITES) {
    Object.keys(SVCOLLEGE_NEXTJS_PREREQUISITES).forEach(function assignNextjsPrerequisite(key) {
      window.CONCEPT_PREREQUISITES[key] = SVCOLLEGE_NEXTJS_PREREQUISITES[key];
    });
  }
}

if (typeof module !== "undefined") {
  module.exports = { SVCOLLEGE_NEXTJS_PREREQUISITES: SVCOLLEGE_NEXTJS_PREREQUISITES };
}
