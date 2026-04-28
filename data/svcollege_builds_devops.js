// data/svcollege_builds_devops.js
// SVCollege Finish Line 1 - DevOps Mini Build practice.

var SVCOLLEGE_DEVOPS_BUILDS = [
  {
    id: "build_svdevops_001",
    conceptKey: "lesson_devops_deploy::CI",
    level: 5,
    title: "GitHub Actions validate job",
    prompt:
      "כתוב job בשם validate שמריץ npm ci, npm test -- --run, npm run validate:strict ו-npm run build.",
    starter:
      "jobs:\n  validate:\n    steps:\n      # install\n      # test\n      # validate\n      # build",
    tests: [
      { regex: "validate\\s*:", description: "מגדיר job בשם validate", flags: "" },
      { regex: "npm\\s+ci", description: "מתקין dependencies ב-CI", flags: "" },
      { regex: "npm\\s+test\\s+--\\s+--run", description: "מריץ בדיקות", flags: "" },
      { regex: "npm\\s+run\\s+validate:strict", description: "מריץ validator strict", flags: "" },
      { regex: "npm\\s+run\\s+build", description: "מריץ build", flags: "" },
    ],
    reference:
      "jobs:\n  validate:\n    steps:\n      - run: npm ci\n      - run: npm test -- --run\n      - run: npm run validate:strict\n      - run: npm run build",
    hint:
      "CI טוב לא עוצר ב-install. הוא בודק, מאמת ובונה.",
    explanation:
      "ה-job מייצר שער בסיסי ל-PR לפני merge.",
    requiredConcepts: ["lesson_devops_deploy::CI", "lesson_devops_deploy::build command"],
    requiredTerms: ["npm ci", "test", "validate", "build"],
    sideExplanation:
      "אם אחד מהשלבים נופל, ה-PR צריך להיחסם עד תיקון.",
  },
  {
    id: "build_svdevops_002",
    conceptKey: "lesson_devops_deploy::Dockerfile",
    level: 6,
    title: "Dockerfile ל-Node API",
    prompt:
      "כתוב Dockerfile ל-Node API: FROM node:22-alpine, WORKDIR /app, העתק package files, הרץ npm ci, העתק קוד, חשוף port 3000 והפעל npm start.",
    starter:
      "FROM node:22-alpine\n# workdir\n# copy package files\n# install\n# copy app\n# expose\n# command",
    tests: [
      { regex: "FROM\\s+node:22-alpine", description: "משתמש ב-base image מתאים", flags: "" },
      { regex: "WORKDIR\\s+/app", description: "מגדיר תיקיית עבודה", flags: "" },
      { regex: "COPY\\s+package\\*\\.json\\s+\\./", description: "מעתיק package files לפני התקנה", flags: "" },
      { regex: "RUN\\s+npm\\s+ci", description: "מתקין dependencies", flags: "" },
      { regex: "COPY\\s+\\.\\s+\\.", description: "מעתיק את קוד האפליקציה", flags: "" },
      { regex: "EXPOSE\\s+3000", description: "חושף port 3000", flags: "" },
      { regex: "CMD\\s+\\[\\s*['\"]npm['\"]\\s*,\\s*['\"]start['\"]\\s*\\]", description: "מגדיר פקודת הפעלה", flags: "" },
    ],
    reference:
      "FROM node:22-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nEXPOSE 3000\nCMD [\"npm\", \"start\"]",
    hint:
      "הסדר חשוב ל-cache: package files לפני כל הקוד.",
    explanation:
      "Dockerfile זה בונה image צפוי לשרת Node.",
    requiredConcepts: ["lesson_devops_deploy::Dockerfile", "lesson_devops_deploy::image"],
    requiredTerms: ["FROM", "WORKDIR", "COPY", "RUN", "CMD"],
    sideExplanation:
      "Dockerfile הוא מסמך תפעולי; הוא צריך להיות ברור וניתן להרצה חוזרת.",
  },
  {
    id: "build_svdevops_003",
    conceptKey: "lesson_devops_deploy::Docker Compose",
    level: 6,
    title: "Compose ל-api ו-Postgres",
    prompt:
      "כתוב compose עם api שנבנה מהתיקייה הנוכחית, תלוי ב-db, מקבל DATABASE_URL שמצביע ל-db, ו-db עם image postgres:16 ו-volume בשם db_data.",
    starter:
      "services:\n  api:\n    # build and env\n  db:\n    # postgres and volume\nvolumes:\n  # persistent data",
    tests: [
      { regex: "services\\s*:", description: "מגדיר services", flags: "" },
      { regex: "api\\s*:", description: "כולל service api", flags: "" },
      { regex: "build\\s*:\\s*\\.", description: "api נבנה מהתיקייה", flags: "" },
      { regex: "DATABASE_URL\\s*:", description: "מגדיר DATABASE_URL", flags: "" },
      { regex: "@db:5432", description: "DATABASE_URL פונה לשם service db", flags: "" },
      { regex: "depends_on\\s*:\\s*\\[\\s*db\\s*\\]", description: "api תלוי ב-db", flags: "" },
      { regex: "image\\s*:\\s*postgres:16", description: "db משתמש ב-postgres:16", flags: "" },
      { regex: "db_data:/var/lib/postgresql/data", description: "מחבר volume לנתוני Postgres", flags: "" },
      { regex: "volumes\\s*:\\s*\\n\\s*db_data\\s*:", description: "מגדיר volume בשם db_data", flags: "" },
    ],
    reference:
      "services:\n  api:\n    build: .\n    environment:\n      DATABASE_URL: postgres://app:pass@db:5432/app\n    depends_on: [db]\n  db:\n    image: postgres:16\n    volumes:\n      - db_data:/var/lib/postgresql/data\nvolumes:\n  db_data:",
    hint:
      "בתוך Compose משתמשים בשם service `db`, לא ב-localhost.",
    explanation:
      "Compose מחבר API ו-database לסביבת Full Stack מקומית.",
    requiredConcepts: ["lesson_devops_deploy::Docker Compose", "lesson_devops_deploy::service", "lesson_devops_deploy::volume"],
    requiredTerms: ["services", "DATABASE_URL", "depends_on", "volume"],
    sideExplanation:
      "הערך החשוב כאן הוא wiring נכון בין containers ושמירת state של database.",
  },
];

function appendDevopsBuildsOnce(target, items) {
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
  window.SVCOLLEGE_DEVOPS_BUILDS = SVCOLLEGE_DEVOPS_BUILDS;
  if (!window.QUESTIONS_BUILD) window.QUESTIONS_BUILD = [];
  appendDevopsBuildsOnce(window.QUESTIONS_BUILD, SVCOLLEGE_DEVOPS_BUILDS);
}

if (typeof module !== "undefined") {
  module.exports = { SVCOLLEGE_DEVOPS_BUILDS: SVCOLLEGE_DEVOPS_BUILDS };
}
