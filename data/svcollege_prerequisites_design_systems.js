// data/svcollege_prerequisites_design_systems.js
// SVCollege Finish Line 1 - Design systems prerequisite bridge.

var SVCOLLEGE_DESIGN_SYSTEMS_PREREQUISITES = {
  "lesson_design_systems::shadcn/UI": ["lesson_25::Tailwind CSS", "react_blueprint::Component Architecture"],
  "lesson_design_systems::Radix primitives": ["lesson_html_css_foundations::accessibility basics", "lesson_design_systems::shadcn/UI"],
  "lesson_design_systems::accessible primitive": ["lesson_html_css_foundations::semantic HTML", "lesson_html_css_foundations::accessibility basics"],
  "lesson_design_systems::design tokens": ["lesson_25::utility classes", "lesson_25::Tailwind CSS"],
  "lesson_design_systems::component variants": ["react_blueprint::Component Architecture", "lesson_design_systems::design tokens"],
  "lesson_design_systems::cn helper": ["lesson_25::utility classes", "lesson_design_systems::component variants"],
  "lesson_design_systems::cva": ["lesson_design_systems::component variants", "lesson_design_systems::cn helper"],
  "lesson_design_systems::asChild slot": ["lesson_html_css_foundations::semantic HTML", "lesson_design_systems::Radix primitives"],
  "lesson_design_systems::form field composition": ["lesson_html_css_foundations::label", "lesson_design_systems::accessible primitive"],
  "lesson_design_systems::theme tokens": ["lesson_design_systems::design tokens"],
  "lesson_design_systems::component registry": ["react_blueprint::Component Architecture", "lesson_design_systems::shadcn/UI"],
  "lesson_design_systems::design system testing": ["react_blueprint::Testing Strategies", "lesson_design_systems::accessible primitive"],
};

if (typeof window !== "undefined") {
  window.SVCOLLEGE_DESIGN_SYSTEMS_PREREQUISITES = SVCOLLEGE_DESIGN_SYSTEMS_PREREQUISITES;
  if (window.CONCEPT_PREREQUISITES) {
    Object.keys(SVCOLLEGE_DESIGN_SYSTEMS_PREREQUISITES).forEach(function assignDesignSystemPrerequisite(key) {
      window.CONCEPT_PREREQUISITES[key] = SVCOLLEGE_DESIGN_SYSTEMS_PREREQUISITES[key];
    });
  }
}

if (typeof module !== "undefined") {
  module.exports = { SVCOLLEGE_DESIGN_SYSTEMS_PREREQUISITES: SVCOLLEGE_DESIGN_SYSTEMS_PREREQUISITES };
}
