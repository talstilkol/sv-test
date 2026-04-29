// data/svcollege_traces_bridge.js
// Bridge Code Trace coverage for SVCollege AI developer tools.

var SVCOLLEGE_BRIDGE_TRACES = [
  {
    id: "sv_bridge_trace_tooling_git_status_001",
    conceptKey: "lesson_tooling_git::working tree",
    level: 5,
    title: "מעקב אחרי git status קצר",
    code:
      "const status = [' M src/App.jsx', '?? notes.md'];\n" +
      "const modified = status.filter((line) => line.trim().startsWith('M'));\n" +
      "const untracked = status.filter((line) => line.startsWith('??'));\n" +
      "const needsReview = modified.length + untracked.length;",
    steps: [
      {
        line: 1,
        prompt: "מה מייצג `M src/App.jsx` ב-working tree?",
        answer: "קובץ tracked שהשתנה",
        acceptable: ["modified", "tracked", "השתנה", "קובץ מוכר"],
        hint: "M הוא modified.",
      },
      {
        line: 1,
        prompt: "מה מייצג `?? notes.md`?",
        answer: "קובץ חדש ש-Git עדיין לא עוקב אחריו",
        acceptable: ["untracked", "חדש", "לא עוקב", "??"],
        hint: "?? הוא לא staged ולא tracked.",
      },
      {
        line: 4,
        prompt: "מה הערך של needsReview?",
        answer: "2",
        acceptable: ["2", "שתיים"],
        hint: "יש modified אחד ו-untracked אחד.",
      },
    ],
    explanation:
      "working tree הוא מצב הקבצים לפני commit. git status מפריד בין קבצים ששונו לבין קבצים ש-Git עדיין לא מכיר.",
    requiredConcepts: ["lesson_tooling_git::working tree", "lesson_tooling_git::repository"],
    requiredTerms: ["working tree", "tracked", "untracked", "modified"],
    sideExplanation:
      "חשוב לקרוא status לפני commit: הוא אומר מה באמת עומד להיכנס לעבודה שלך ומה עדיין מחוץ ל-Git.",
  },
  {
    id: "sv_bridge_trace_ai_tools_001",
    conceptKey: "ai_development::Prompt Engineering",
    level: 4,
    title: "מעקב אחרי prompt מובנה",
    code:
      "const prompt = {\n" +
      "  task: 'Review this component for bugs',\n" +
      "  constraints: ['no new libraries', 'findings first'],\n" +
      "  output: { findings: 'array', summary: 'string' }\n" +
      "};\n" +
      "const hasContract = Array.isArray(prompt.constraints) && Boolean(prompt.output.findings);",
    steps: [
      {
        line: 2,
        prompt: "מה מגדיר task?",
        answer: "את העבודה שה-AI צריך לבצע",
        acceptable: ["review", "bugs", "העבודה", "מטרה"],
        hint: "task הוא שם הפעולה, לא הפלט.",
      },
      {
        line: 3,
        prompt: "מה constraints מגבילים?",
        answer: "את גבולות התשובה",
        acceptable: ["גבולות", "libraries", "findings"],
        hint: "אלו כללי עבודה למודל.",
      },
      {
        line: 6,
        prompt: "מה הערך של hasContract?",
        answer: "true",
        acceptable: ["true", "אמת"],
        hint: "constraints הוא מערך, ו-output.findings הוא מחרוזת קיימת.",
      },
    ],
    explanation:
      "Prompt מובנה הופך בקשת AI לחוזה: פעולה, גבולות ופלט צפוי.",
    requiredConcepts: ["ai_development::Prompt Engineering"],
    requiredTerms: ["task", "constraints", "output contract"],
    sideExplanation:
      "כשמבקשים מה-AI לעבוד כמו פונקציה, צריך להגדיר לו קלט, כללים ופלט.",
  },
];
