// data/svcollege_traces_design_systems.js
// SVCollege Finish Line 1 - Design systems Code Trace practice.

var SVCOLLEGE_DESIGN_SYSTEMS_TRACES = [
  {
    id: "trace_svds_001",
    conceptKey: "lesson_design_systems::component variants",
    level: 6,
    title: "מעקב אחרי Button variants",
    code:
      "const buttonClass = cn(\n  'inline-flex items-center rounded-md px-3 py-2',\n  variant === 'destructive' && 'bg-red-600 text-white',\n  disabled && 'opacity-50 pointer-events-none'\n);",
    steps: [
      {
        line: 2,
        prompt: "איזה classes תמיד קיימים?",
        answer: "inline-flex items-center rounded-md px-3 py-2",
        acceptable: ["inline-flex", "rounded", "px-3", "base"],
        hint: "חפש את ה-string שאינו תלוי בתנאי.",
      },
      {
        line: 3,
        prompt: "מתי נוסף עיצוב destructive?",
        answer: "כאשר variant שווה destructive",
        acceptable: ["variant", "destructive"],
        hint: "זה תנאי לפי variant.",
      },
      {
        line: 4,
        prompt: "מה disabled מוסיף?",
        answer: "opacity-50 ו-pointer-events-none",
        acceptable: ["opacity", "pointer-events", "disabled"],
        hint: "זה מצב UI שמונע אינטראקציה.",
      },
    ],
    explanation:
      "cn מחבר base classes עם classes מותנים לפי variant ו-state.",
    requiredConcepts: ["lesson_design_systems::component variants", "lesson_design_systems::cn helper"],
    requiredTerms: ["cn", "variant", "disabled"],
    sideExplanation:
      "מערכת עיצוב היא שילוב של base style קבוע ומצבים מוגדרים מראש.",
  },
  {
    id: "trace_svds_002",
    conceptKey: "lesson_design_systems::form field composition",
    level: 6,
    title: "מעקב אחרי שדה טופס נגיש",
    code:
      "<label htmlFor=\"email\">Email</label>\n<input id=\"email\" aria-describedby=\"email-error\" />\n<p id=\"email-error\">Email is required</p>",
    steps: [
      {
        line: 1,
        prompt: "איך ה-label מחובר ל-input?",
        answer: "htmlFor מצביע על id=email",
        acceptable: ["htmlFor", "id", "email"],
        hint: "חפש htmlFor ו-id תואמים.",
      },
      {
        line: 2,
        prompt: "מה aria-describedby מחבר?",
        answer: "את ה-input להודעת השגיאה",
        acceptable: ["error", "aria-describedby", "email-error"],
        hint: "הערך שלו הוא id של הפסקה.",
      },
      {
        line: 3,
        prompt: "למה הודעת השגיאה צריכה id?",
        answer: "כדי שאפשר יהיה להפנות אליה מה-input",
        acceptable: ["id", "input", "described"],
        hint: "בלי id אין יעד ל-aria-describedby.",
      },
    ],
    explanation:
      "שדה נגיש מחבר שם, input והודעת שגיאה בקשרים מפורשים.",
    requiredConcepts: ["lesson_design_systems::form field composition", "lesson_html_css_foundations::label"],
    requiredTerms: ["label", "htmlFor", "aria-describedby"],
    sideExplanation:
      "הקשר בין חלקי השדה צריך להיות ברור גם למי שלא רואה את המסך.",
  },
];

function appendDesignSystemTraceItemsOnce(target, items) {
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
  window.SVCOLLEGE_DESIGN_SYSTEMS_TRACES = SVCOLLEGE_DESIGN_SYSTEMS_TRACES;
  if (!window.QUESTIONS_TRACE) window.QUESTIONS_TRACE = [];
  appendDesignSystemTraceItemsOnce(window.QUESTIONS_TRACE, SVCOLLEGE_DESIGN_SYSTEMS_TRACES);
  if (window.QUESTIONS_BANK) {
    window.QUESTIONS_BANK.trace = window.QUESTIONS_TRACE;
  }
}

if (typeof module !== "undefined") {
  module.exports = { SVCOLLEGE_DESIGN_SYSTEMS_TRACES: SVCOLLEGE_DESIGN_SYSTEMS_TRACES };
}
