// data/svcollege_traces_devops.js
// SVCollege Finish Line 1 - DevOps Code Trace practice.

var SVCOLLEGE_DEVOPS_TRACES = [
  {
    id: "trace_svdevops_001",
    conceptKey: "lesson_devops_deploy::CI",
    level: 5,
    title: "מעקב אחרי CI בסיסי",
    code:
      "jobs:\n  validate:\n    steps:\n      - run: npm ci\n      - run: npm test -- --run\n      - run: npm run validate:strict\n      - run: npm run build",
    steps: [
      {
        line: 4,
        prompt: "מה npm ci עושה לפני tests?",
        answer: "מתקין dependencies בצורה נקייה",
        acceptable: ["install", "dependencies", "npm ci", "מתקין"],
        hint: "זו ההכנה לפני בדיקות ובנייה.",
      },
      {
        line: 5,
        prompt: "איזה שער בודק שהבדיקות עוברות?",
        answer: "npm test -- --run",
        acceptable: ["npm test", "tests", "vitest"],
        hint: "חפש את פקודת הבדיקות.",
      },
      {
        line: 7,
        prompt: "למה build מגיע בסוף?",
        answer: "כדי לוודא שהקוד נבנה ל-production אחרי בדיקות",
        acceptable: ["build", "production", "bundle"],
        hint: "זה שער לפני deploy.",
      },
    ],
    explanation:
      "CI בסיסי מתקין dependencies, מריץ tests, מריץ validation ואז מוודא build production.",
    requiredConcepts: ["lesson_devops_deploy::CI", "lesson_devops_deploy::build command"],
    requiredTerms: ["npm ci", "test", "validate", "build"],
    sideExplanation:
      "הסדר מייצר שער איכות: קודם מכינים, אחר כך בודקים, ורק אז בונים גרסה לפרסום.",
  },
  {
    id: "trace_svdevops_002",
    conceptKey: "lesson_devops_deploy::Docker Compose",
    level: 6,
    title: "מעקב אחרי docker-compose עם api ו-db",
    code:
      "services:\n  api:\n    build: .\n    environment:\n      DATABASE_URL: postgres://app:pass@db:5432/app\n    depends_on: [db]\n  db:\n    image: postgres:16\n    volumes: [db_data:/var/lib/postgresql/data]",
    steps: [
      {
        line: 2,
        prompt: "איזה service נבנה מהקוד המקומי?",
        answer: "api",
        acceptable: ["api"],
        hint: "חפש build: .",
      },
      {
        line: 5,
        prompt: "למה ה-host הוא db ולא localhost?",
        answer: "db הוא שם service ברשת Compose",
        acceptable: ["service name", "db", "Compose network"],
        hint: "בתוך container localhost הוא אותו container.",
      },
      {
        line: 9,
        prompt: "מה volume שומר?",
        answer: "נתוני Postgres",
        acceptable: ["Postgres data", "database", "db_data"],
        hint: "הנתיב הוא תיקיית הנתונים של Postgres.",
      },
    ],
    explanation:
      "Compose מחבר api ו-db ברשת פנימית, עם volume שמחזיק את נתוני ה-database.",
    requiredConcepts: ["lesson_devops_deploy::Docker Compose", "lesson_devops_deploy::service", "lesson_devops_deploy::volume"],
    requiredTerms: ["service", "DATABASE_URL", "depends_on", "volume"],
    sideExplanation:
      "זה ההבדל בין להריץ שרת אחד לבין להריץ סביבת Full Stack מקומית.",
  },
  {
    id: "trace_svdevops_003",
    conceptKey: "lesson_devops_deploy::release checklist",
    level: 5,
    title: "מעקב אחרי Go/No-Go ל-release",
    code:
      "const releaseGate = {\n  ciGreen: true,\n  envConfigured: true,\n  migrationsReviewed: true,\n  smokePassed: false,\n  rollbackKnown: true,\n};\n\nconst canRelease = Object.values(releaseGate).every(Boolean);",
    steps: [
      {
        line: 5,
        prompt: "איזה תנאי עדיין חוסם release?",
        answer: "smokePassed",
        acceptable: ["smokePassed", "smoke", "false"],
        hint: "חפש את הערך false.",
      },
      {
        line: 9,
        prompt: "מה Object.values(...).every(Boolean) בודק?",
        answer: "שכל הערכים true",
        acceptable: ["all true", "כולם true", "every"],
        hint: "Boolean ממיר כל ערך ל-true/false.",
      },
      {
        line: 9,
        prompt: "מה יהיה canRelease?",
        answer: "false",
        acceptable: ["false", "לא"],
        hint: "יש תנאי אחד false.",
      },
    ],
    explanation:
      "Release לא יוצא אם אפילו שער קריטי אחד נכשל. כאן smoke test עדיין לא עבר.",
    requiredConcepts: ["lesson_devops_deploy::release checklist", "lesson_devops_deploy::smoke test"],
    requiredTerms: ["Go/No-Go", "smokePassed", "every"],
    sideExplanation:
      "Checklist טוב לא מתרגש מכמעט ירוק. Production דורש שכל השערים הקריטיים יעברו.",
  },
];

function appendDevopsTraceItemsOnce(target, items) {
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
  window.SVCOLLEGE_DEVOPS_TRACES = SVCOLLEGE_DEVOPS_TRACES;
  if (!window.QUESTIONS_TRACE) window.QUESTIONS_TRACE = [];
  appendDevopsTraceItemsOnce(window.QUESTIONS_TRACE, SVCOLLEGE_DEVOPS_TRACES);
  if (window.QUESTIONS_BANK) {
    window.QUESTIONS_BANK.trace = window.QUESTIONS_TRACE;
  }
}

if (typeof module !== "undefined") {
  module.exports = { SVCOLLEGE_DEVOPS_TRACES: SVCOLLEGE_DEVOPS_TRACES };
}
