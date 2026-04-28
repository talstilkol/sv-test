// data/svcollege_questions_bridge.js
// Bridge Bug Hunt coverage for SVCollege modules that were not represented in
// the Bug Hunt tab by their original content files.

var SVCOLLEGE_BRIDGE_QUESTIONS = {
  lessonId: "svcollege_bridge",
  moduleTitle: "SVCollege bridge practice",
  mc: [],
  fill: [],
  bugHunt: [
    {
      id: "sv_bridge_bug_js_dom_001",
      conceptKey: "lesson_13::DOM",
      level: 3,
      title: "DOM selector שמחזיר null",
      brokenCode:
        "const saveButton = document.querySelector('#save');\n" +
        "saveButton.addEventListener('click', saveTask);\n" +
        "\n" +
        "<button id=\"save-task\">Save</button>",
      bugLine: 1,
      hint: "בדוק אם ה-selector תואם ל-id האמיתי ב-HTML.",
      options: [
        "ה-selector מחפש #save אבל ה-id האמיתי הוא save-task",
        "addEventListener עובד רק עם submit",
        "צריך להחליף const ב-var",
        "button לא יכול לקבל id",
      ],
      correctIndex: 0,
      fix:
        "const saveButton = document.querySelector('#save-task');\n" +
        "saveButton.addEventListener('click', saveTask);",
      explanation:
        "querySelector מחזיר null כשאין התאמה. לאחר מכן addEventListener על null יזרוק שגיאה.",
      requiredConcepts: ["lesson_13::DOM"],
      requiredTerms: ["selector", "id", "null", "event listener"],
      sideExplanation:
        "DOM הוא עץ. selector הוא כתובת בעץ. כתובת שגויה לא מחזירה אלמנט.",
    },
    {
      id: "sv_bridge_bug_tooling_001",
      conceptKey: "lesson_tooling_git::npm scripts",
      level: 3,
      title: "script שלא קיים ב-package.json",
      brokenCode:
        "{\n" +
        "  \"scripts\": {\n" +
        "    \"dev\": \"vite --host 127.0.0.1\",\n" +
        "    \"build\": \"vite build\"\n" +
        "  }\n" +
        "}\n" +
        "\n" +
        "$ npm run test",
      bugLine: 8,
      hint: "npm run יכול להריץ רק שם שמופיע בתוך scripts.",
      options: [
        "אין script בשם test בתוך package.json",
        "Vite לא עובד עם build",
        "scripts חייב להיות מערך",
        "npm run עובד רק עם Git",
      ],
      correctIndex: 0,
      fix:
        "{\n" +
        "  \"scripts\": {\n" +
        "    \"dev\": \"vite --host 127.0.0.1\",\n" +
        "    \"test\": \"vitest run\",\n" +
        "    \"build\": \"vite build\"\n" +
        "  }\n" +
        "}",
      explanation:
        "שם script הוא חוזה. אם מריצים npm run test, חייב להיות מפתח test תחת scripts.",
      requiredConcepts: ["lesson_tooling_git::npm scripts"],
      requiredTerms: ["package.json", "scripts", "npm run", "Vitest"],
      sideExplanation:
        "חשוב לחשוב על scripts כמו תפריט פקודות. אי אפשר לבחור פריט שלא נמצא בתפריט.",
    },
    {
      id: "sv_bridge_bug_node_express_001",
      conceptKey: "lesson_17::middleware",
      level: 4,
      title: "middleware שלא ממשיך ל-route",
      brokenCode:
        "function logRequest(req, res, next) {\n" +
        "  console.log(req.method, req.path);\n" +
        "}\n" +
        "\n" +
        "app.use(logRequest);\n" +
        "app.get('/api/tasks', getTasks);",
      bugLine: 3,
      hint: "Middleware חייב לסיים response או לקרוא ל-next.",
      options: [
        "חסר next(); ולכן הבקשה נתקעת לפני route",
        "console.log אסור ב-Express",
        "app.use חייב להיות אחרי app.get",
        "getTasks חייב להיות string",
      ],
      correctIndex: 0,
      fix:
        "function logRequest(req, res, next) {\n" +
        "  console.log(req.method, req.path);\n" +
        "  next();\n" +
        "}",
      explanation:
        "Express מריץ middleware לפי סדר. אם middleware לא קורא next ולא שולח response, הזרימה נעצרת.",
      requiredConcepts: ["lesson_17::middleware", "lesson_17::Express"],
      requiredTerms: ["middleware", "next", "request flow"],
      sideExplanation:
        "דמיין תחנת בידוק במסדרון. אם הבודק לא אומר 'הבא', אף אחד לא מגיע לדלת הבאה.",
    },
    {
      id: "sv_bridge_bug_ai_tools_001",
      conceptKey: "ai_development::AI Code Review",
      level: 4,
      title: "AI review בלי מקור ספציפי",
      brokenCode:
        "const aiReviewPrompt = `\n" +
        "Tell me if this app is good.\n" +
        "Return anything useful.\n" +
        "`;",
      bugLine: 2,
      hint: "Review טוב חייב scope, קוד/התנהגות, וקריטריוני פלט.",
      options: [
        "ה-prompt כללי מדי ולא דורש ממצאים עם מקור או התנהגות לבדיקה",
        "Template literal לא עובד ב-JavaScript",
        "AI review חייב לרוץ רק בדפדפן",
        "אסור להשתמש במילה app",
      ],
      correctIndex: 0,
      fix:
        "const aiReviewPrompt = `\n" +
        "Review this React component for bugs only.\n" +
        "Return findings first. Each finding must reference a line or visible behavior.\n" +
        "Do not suggest new libraries.\n" +
        "`;",
      explanation:
        "Prompt review בלי scope ובלי דרישת ראיות מוביל לתשובות כלליות שקשה לבדוק.",
      requiredConcepts: ["ai_development::AI Code Review", "ai_development::Prompt Engineering"],
      requiredTerms: ["scope", "finding", "evidence", "prompt"],
      sideExplanation:
        "AI Code Review צריך להתנהג כמו reviewer: מצא בעיה, הסבר למה, והראה איפה.",
    },
  ],
};
