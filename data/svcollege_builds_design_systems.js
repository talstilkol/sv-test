// data/svcollege_builds_design_systems.js
// SVCollege Finish Line 1 - Design systems Mini Build practice.

var SVCOLLEGE_DESIGN_SYSTEMS_BUILDS = [
  {
    id: "build_svds_001",
    conceptKey: "lesson_design_systems::component variants",
    level: 6,
    title: "Button עם variants",
    prompt:
      "כתוב Button שמקבל variant ו-disabled, משתמש ב-cn, כולל base classes, variant destructive, ומחזיר button עם type=button.",
    starter:
      "function Button({ variant, disabled, children }) {\n  // className\n  // return button\n}",
    tests: [
      { regex: "function\\s+Button\\s*\\(", description: "מגדיר Button", flags: "" },
      { regex: "cn\\s*\\(", description: "משתמש ב-cn", flags: "" },
      { regex: "variant\\s*===\\s*['\"]destructive['\"]", description: "בודק variant destructive", flags: "" },
      { regex: "disabled\\s*&&", description: "מתייחס למצב disabled", flags: "" },
      { regex: "<button\\s+type=['\"]button['\"]", description: "מחזיר button סמנטי", flags: "" },
    ],
    reference:
      "function Button({ variant, disabled, children }) {\n  const className = cn(\n    'inline-flex items-center rounded-md px-3 py-2',\n    variant === 'destructive' && 'bg-red-600 text-white',\n    disabled && 'opacity-50 pointer-events-none'\n  );\n  return <button type=\"button\" disabled={disabled} className={className}>{children}</button>;\n}",
    hint:
      "Base style תמיד קיים. variant ו-disabled מוסיפים classes רק כשצריך.",
    explanation:
      "התרגיל בונה API קטן ועקבי לרכיב shared.",
    requiredConcepts: ["lesson_design_systems::component variants", "lesson_design_systems::cn helper"],
    requiredTerms: ["Button", "variant", "cn", "disabled"],
    sideExplanation:
      "Button shared טוב מונע עשרות גרסאות כפתור שונות באפליקציה.",
  },
  {
    id: "build_svds_002",
    conceptKey: "lesson_design_systems::form field composition",
    level: 6,
    title: "Field נגיש עם error",
    prompt:
      "כתוב Field שמקבל id, label, error ו-children, מחבר label עם htmlFor, עוטף את הילדים, ומציג error עם id שמבוסס על id.",
    starter:
      "function Field({ id, label, error, children }) {\n  // label\n  // control\n  // error\n}",
    tests: [
      { regex: "function\\s+Field\\s*\\(", description: "מגדיר Field", flags: "" },
      { regex: "htmlFor=\\{id\\}", description: "מחבר label ל-id", flags: "" },
      { regex: "children", description: "מרנדר children", flags: "" },
      { regex: "id=\\{`\\$\\{id\\}-error`\\}", description: "יוצר id להודעת שגיאה", flags: "" },
      { regex: "role=['\"]alert['\"]", description: "מסמן error חשוב", flags: "" },
    ],
    reference:
      "function Field({ id, label, error, children }) {\n  return (\n    <div className=\"grid gap-2\">\n      <label htmlFor={id}>{label}</label>\n      {children}\n      {error ? <p id={`${id}-error`} role=\"alert\">{error}</p> : null}\n    </div>\n  );\n}",
    hint:
      "ה-Field אחראי לקשר בין label, control ושגיאה.",
    explanation:
      "קומפוזיציה טובה של שדה טופס הופכת validation לנגיש וברור.",
    requiredConcepts: ["lesson_design_systems::form field composition", "lesson_html_css_foundations::label"],
    requiredTerms: ["label", "htmlFor", "error", "role"],
    sideExplanation:
      "טופס הוא לא רק input. הוא חוזה קטן בין המשתמש למערכת.",
  },
];

function appendDesignSystemBuildsOnce(target, items) {
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
  window.SVCOLLEGE_DESIGN_SYSTEMS_BUILDS = SVCOLLEGE_DESIGN_SYSTEMS_BUILDS;
  if (!window.QUESTIONS_BUILD) window.QUESTIONS_BUILD = [];
  appendDesignSystemBuildsOnce(window.QUESTIONS_BUILD, SVCOLLEGE_DESIGN_SYSTEMS_BUILDS);
}

if (typeof module !== "undefined") {
  module.exports = { SVCOLLEGE_DESIGN_SYSTEMS_BUILDS: SVCOLLEGE_DESIGN_SYSTEMS_BUILDS };
}
