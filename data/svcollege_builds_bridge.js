// data/svcollege_builds_bridge.js
// Bridge Mini Build coverage for SVCollege modules with no dedicated build item.

var SVCOLLEGE_BRIDGE_BUILDS = [
  {
    id: "sv_bridge_build_responsive_nav",
    conceptKey: "lesson_25::responsive design",
    level: 4,
    title: "Navbar רספונסיבי בלי ספרייה",
    prompt:
      "כתוב JSX ל-navbar עם <nav>, רשימת קישורים, ו-className שמשתמש ב-flex-col במובייל וב-md:flex-row בדסקטופ.",
    starter:
      "function NavBar({ links }) {\n" +
      "  // your code\n" +
      "}",
    tests: [
      { regex: "function\\s+NavBar", description: "מגדיר NavBar", flags: "" },
      { regex: "<nav", description: "משתמש ב-nav סמנטי", flags: "i" },
      { regex: "\\.map\\s*\\(", description: "מרנדר links עם map", flags: "" },
      { regex: "flex-col", description: "מבנה מובייל בעמודה", flags: "" },
      { regex: "md:flex-row", description: "מבנה דסקטופ בשורה", flags: "" },
    ],
    reference:
      "function NavBar({ links }) {\n" +
      "  return (\n" +
      "    <nav className=\"flex flex-col gap-3 md:flex-row\">\n" +
      "      {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}\n" +
      "    </nav>\n" +
      "  );\n" +
      "}",
    hint: "Tailwind responsive prefixes עובדים משמאל לימין: בסיס למובייל, md: למסכים רחבים.",
    explanation:
      "Navbar קטן לא דורש ספרייה. מספיק markup סמנטי, map, ו-utilities רספונסיביים.",
    requiredConcepts: ["lesson_25::responsive design", "lesson_25::flex", "lesson_21::map"],
    requiredTerms: ["nav", "map", "flex", "breakpoint"],
    sideExplanation:
      "זה בדיוק הפטנט: קודם מבנה HTML, אחר כך utilities קטנים. לא צריך לייבא מערכת תפריטים שלמה.",
  },
  {
    id: "sv_bridge_build_ts_load_state",
    conceptKey: "lesson_26::TypeScript",
    level: 5,
    title: "LoadState typed union",
    prompt:
      "כתוב type בשם LoadState עם מצבי idle/loading/success/error, ואז פונקציה canShowData שמחזירה true רק ב-success עם data לא ריק.",
    starter:
      "type LoadState = unknown;\n\n" +
      "function canShowData(state: LoadState) {\n" +
      "  // your code\n" +
      "}",
    tests: [
      { regex: "type\\s+LoadState", description: "מגדיר LoadState", flags: "" },
      { regex: "status\\s*:\\s*['\"]idle['\"]", description: "כולל idle", flags: "" },
      { regex: "status\\s*:\\s*['\"]loading['\"]", description: "כולל loading", flags: "" },
      { regex: "status\\s*:\\s*['\"]success['\"]", description: "כולל success", flags: "" },
      { regex: "data\\s*:", description: "success כולל data", flags: "" },
      { regex: "status\\s*===\\s*['\"]success['\"]", description: "מבצע narrowing לפי status", flags: "" },
    ],
    reference:
      "type LoadState =\n" +
      "  | { status: 'idle' }\n" +
      "  | { status: 'loading' }\n" +
      "  | { status: 'success'; data: Task[] }\n" +
      "  | { status: 'error'; message: string };\n\n" +
      "function canShowData(state: LoadState) {\n" +
      "  return state.status === 'success' && state.data.length > 0;\n" +
      "}",
    hint: "אל תשתמש בשלושה booleanים. תן לכל מצב צורה אחת ברורה.",
    explanation:
      "Union מונע מצב כמו loading=true וגם error=true באותו זמן. status הוא ה-discriminator.",
    requiredConcepts: ["lesson_26::TypeScript", "lesson_27::Union Type", "lesson_27::Type Narrowing"],
    requiredTerms: ["union", "narrowing", "status", "data"],
    sideExplanation:
      "טיפוס טוב הוא guardrail: הוא לא נותן לקוד לייצג מצב שלא אמור להתקיים.",
  },
  {
    id: "sv_bridge_build_ai_review_prompt",
    conceptKey: "ai_development::AI Code Review",
    level: 4,
    title: "Prompt ל-code review עם ראיות",
    prompt:
      "כתוב אובייקט reviewPrompt שמכיל task, constraints, output ו-qualityBar עבור AI Code Review. הפלט חייב לדרוש findings עם line או behavior.",
    starter:
      "const reviewPrompt = {\n" +
      "  // your contract\n" +
      "};",
    tests: [
      { regex: "reviewPrompt", description: "מגדיר reviewPrompt", flags: "" },
      { regex: "task", description: "כולל task", flags: "" },
      { regex: "constraints", description: "כולל constraints", flags: "" },
      { regex: "output", description: "כולל output", flags: "" },
      { regex: "findings", description: "דורש findings", flags: "i" },
      { regex: "line|behavior", description: "דורש ראיה לפי שורה או התנהגות", flags: "i" },
    ],
    reference:
      "const reviewPrompt = {\n" +
      "  task: 'Review this component for bugs only',\n" +
      "  constraints: ['no new libraries', 'findings first'],\n" +
      "  output: { findings: 'array', summary: 'string' },\n" +
      "  qualityBar: 'Every finding must mention a line or visible behavior'\n" +
      "};",
    hint: "Prompt טוב הוא חוזה. בלי output ו-qualityBar, אי אפשר לבדוק את איכות התשובה.",
    explanation:
      "AI review צריך לייצר ממצאים שאפשר לאמת, לא תחושה כללית שהקוד טוב או רע.",
    requiredConcepts: ["ai_development::AI Code Review", "ai_development::Prompt Engineering"],
    requiredTerms: ["prompt", "constraints", "findings", "evidence"],
    sideExplanation:
      "כשמכריחים את ה-AI לתת שורה או התנהגות, מפחיתים תשובות כלליות וקשה יותר להמציא.",
  },
];
