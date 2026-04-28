// data/svcollege_traces_bridge.js
// Bridge Code Trace coverage for SVCollege AI developer tools.

var SVCOLLEGE_BRIDGE_TRACES = [
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
