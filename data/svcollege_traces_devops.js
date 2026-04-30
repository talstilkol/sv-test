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
  {
    id: "trace_svdevops_004",
    conceptKey: "lesson_devops_deploy::build command",
    level: 4,
    title: "מעקב אחרי build command ב-package.json",
    code:
      "{\n  \"scripts\": {\n    \"dev\": \"vite --host 0.0.0.0\",\n    \"test\": \"vitest run\",\n    \"build\": \"vite build\"\n  }\n}",
    steps: [
      { line: 5, prompt: "איזו פקודה מייצרת production bundle?", answer: "npm run build", acceptable: ["build", "npm run build", "vite build"], hint: "חפש את script בשם build." },
      { line: 3, prompt: "איזו פקודה לא מספיקה כבדיקת production?", answer: "dev", acceptable: ["dev", "npm run dev", "vite"], hint: "dev server אינו production build." },
      { line: 4, prompt: "איזו פקודה מפעילה בדיקות?", answer: "npm test", acceptable: ["test", "vitest run", "npm test"], hint: "זה script בשם test." },
    ],
    explanation: "build command הוא שער production: אם הוא נכשל, deploy צריך להיעצר לפני שמשתמשים נפגעים.",
    requiredConcepts: ["lesson_devops_deploy::build command", "lesson_tooling_git::npm scripts"],
    requiredTerms: ["scripts", "build", "vite build"],
    sideExplanation: "במבחן חשוב להבדיל בין dev server נוח לבין bundle שמייצג את מה שיעלה ל-production.",
  },
  {
    id: "trace_svdevops_005",
    conceptKey: "lesson_devops_deploy::CD",
    level: 5,
    title: "מעקב אחרי CD שמפרסם רק אחרי CI ירוק",
    code:
      "if (branch === 'main' && ci.status === 'passed') {\n  deploy('production');\n} else {\n  deploy('preview');\n}",
    steps: [
      { line: 1, prompt: "איזה branch יכול להגיע ל-production?", answer: "main", acceptable: ["main"], hint: "חפש את תנאי branch." },
      { line: 1, prompt: "איזה status של CI נדרש?", answer: "passed", acceptable: ["passed", "ci passed", "green"], hint: "הוא מושווה ל-ci.status." },
      { line: 4, prompt: "לאן הולכים שינויים שלא עומדים בתנאי?", answer: "preview", acceptable: ["preview", "preview deployment"], hint: "קרא את else." },
    ],
    explanation: "CD מחבר תוצאת CI להחלטת deploy: production רק ל-main שעבר, וכל השאר נשאר לבדיקה.",
    requiredConcepts: ["lesson_devops_deploy::CD", "lesson_devops_deploy::CI", "lesson_devops_deploy::preview deployment"],
    requiredTerms: ["main", "ci.status", "deploy"],
    sideExplanation: "כך release לא תלוי בזיכרון ידני אלא במדיניות ברורה שאפשר לבדוק.",
  },
  {
    id: "trace_svdevops_006",
    conceptKey: "lesson_devops_deploy::container",
    level: 5,
    title: "מעקב אחרי container שרץ מתוך image",
    code:
      "docker build -t lumen-api .\ndocker run --name api -p 3000:3000 lumen-api\ndocker ps --filter name=api",
    steps: [
      { line: 1, prompt: "איזה image נבנה?", answer: "lumen-api", acceptable: ["lumen-api"], hint: "השם אחרי -t." },
      { line: 2, prompt: "מה שם ה-container שרץ?", answer: "api", acceptable: ["api"], hint: "השם אחרי --name." },
      { line: 2, prompt: "איזה port נחשף מהמחשב ל-container?", answer: "3000:3000", acceptable: ["3000", "3000:3000"], hint: "חפש -p." },
    ],
    explanation: "Image הוא התבנית הבנויה, ו-container הוא תהליך רץ מתוך אותה תבנית עם ports/env משלו.",
    requiredConcepts: ["lesson_devops_deploy::container", "lesson_devops_deploy::image", "lesson_devops_deploy::Docker"],
    requiredTerms: ["docker build", "docker run", "container"],
    sideExplanation: "בלבול נפוץ: image לא רץ בעצמו; container הוא מה שרץ בפועל.",
  },
  {
    id: "trace_svdevops_007",
    conceptKey: "lesson_devops_deploy::Docker",
    level: 5,
    title: "מעקב אחרי Docker build/run",
    code:
      "FROM node:22-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nCMD [\"npm\", \"start\"]",
    steps: [
      { line: 1, prompt: "מה ה-base image?", answer: "node:22-alpine", acceptable: ["node:22-alpine", "node"], hint: "הוא מופיע אחרי FROM." },
      { line: 4, prompt: "איזו פקודה מתקינה dependencies בתוך image?", answer: "npm ci", acceptable: ["npm ci"], hint: "חפש RUN." },
      { line: 6, prompt: "איזו פקודה תרוץ כשה-container יתחיל?", answer: "npm start", acceptable: ["npm start", "CMD"], hint: "קרא את CMD." },
    ],
    explanation: "Dockerfile מתאר איך לבנות image עקבי: סביבת Node, dependencies, קוד ופקודת הפעלה.",
    requiredConcepts: ["lesson_devops_deploy::Docker", "lesson_devops_deploy::Dockerfile", "lesson_devops_deploy::image"],
    requiredTerms: ["FROM", "RUN", "CMD"],
    sideExplanation: "הוראות Dockerfile הן תיעוד רץ של סביבת השרת, לא רשימת צעדים ידנית.",
  },
  {
    id: "trace_svdevops_008",
    conceptKey: "lesson_devops_deploy::health check",
    level: 5,
    title: "מעקב אחרי health check שמזהה תלות ב-database",
    code:
      "app.get('/health', async (req, res) => {\n  const dbReady = await db.ping();\n  res.status(dbReady ? 200 : 503).json({ ok: dbReady });\n});",
    steps: [
      { line: 1, prompt: "איזה endpoint בודק בריאות?", answer: "/health", acceptable: ["/health", "health"], hint: "הוא בתוך app.get." },
      { line: 2, prompt: "איזו תלות נבדקת?", answer: "database", acceptable: ["db", "database", "db.ping"], hint: "חפש db.ping." },
      { line: 3, prompt: "איזה status חוזר כשה-db לא מוכן?", answer: "503", acceptable: ["503"], hint: "זה הערך אחרי הנקודתיים." },
    ],
    explanation: "Health check טוב לא מחזיר ok תמיד; הוא בודק גם תלות קריטית כמו database.",
    requiredConcepts: ["lesson_devops_deploy::health check", "lesson_17::Status Codes"],
    requiredTerms: ["/health", "db.ping", "503"],
    sideExplanation: "שרת יכול לענות HTTP ועדיין להיות לא מוכן לעבודה אם התלות המרכזית נפלה.",
  },
  {
    id: "trace_svdevops_009",
    conceptKey: "lesson_devops_deploy::image",
    level: 5,
    title: "מעקב אחרי image tag",
    code:
      "docker build -t lumen-api:1.0.0 .\ndocker tag lumen-api:1.0.0 registry.local/lumen-api:1.0.0\ndocker push registry.local/lumen-api:1.0.0",
    steps: [
      { line: 1, prompt: "איזה tag ניתן ל-image המקומי?", answer: "1.0.0", acceptable: ["1.0.0"], hint: "הוא אחרי הנקודתיים בשם image." },
      { line: 2, prompt: "לאיזה registry image מסומן?", answer: "registry.local", acceptable: ["registry.local"], hint: "השם בתחילת יעד ה-tag." },
      { line: 3, prompt: "איזו פקודה מפרסמת את ה-image?", answer: "docker push", acceptable: ["docker push", "push"], hint: "השורה מתחילה ב-docker push." },
    ],
    explanation: "Image tag קובע איזה artifact נבדק ונפרס; בלי tag ברור קשה לדעת מה באמת רץ.",
    requiredConcepts: ["lesson_devops_deploy::image", "lesson_devops_deploy::Docker"],
    requiredTerms: ["tag", "registry", "docker push"],
    sideExplanation: "Tag יציב עוזר rollback ובדיקת גרסה: אפשר לחזור בדיוק ל-image קודם.",
  },
  {
    id: "trace_svdevops_010",
    conceptKey: "lesson_devops_deploy::preview deployment",
    level: 4,
    title: "מעקב אחרי preview deployment ל-PR",
    code:
      "pull_request:\n  checks: [test, build]\n  deploy:\n    target: preview\n    url: https://pr-42.portal.example",
    steps: [
      { line: 1, prompt: "איזה אירוע מפעיל את התהליך?", answer: "pull_request", acceptable: ["pull_request", "PR"], hint: "זו השורה הראשונה." },
      { line: 2, prompt: "אילו checks רצים לפני deploy?", answer: "test and build", acceptable: ["test", "build", "test, build"], hint: "הם בתוך checks." },
      { line: 4, prompt: "מה יעד ה-deploy?", answer: "preview", acceptable: ["preview"], hint: "קרא את target." },
    ],
    explanation: "Preview deployment נותן כתובת בדיקה ל-PR לפני production, אחרי checks בסיסיים.",
    requiredConcepts: ["lesson_devops_deploy::preview deployment", "lesson_tooling_git::pull request", "lesson_devops_deploy::build command"],
    requiredTerms: ["pull_request", "checks", "preview"],
    sideExplanation: "זה כלי חשוב לתפוס UI/API issues בדפדפן אמיתי לפני merge.",
  },
  {
    id: "trace_svdevops_011",
    conceptKey: "lesson_devops_deploy::production readiness",
    level: 5,
    title: "מעקב אחרי readiness לפני production",
    code:
      "const readiness = {\n  build: 'passed',\n  tests: 'passed',\n  env: 'configured',\n  smoke: 'passed',\n  rollback: 'documented',\n};",
    steps: [
      { line: 2, prompt: "איזה שער מוודא production bundle?", answer: "build", acceptable: ["build"], hint: "השורה השנייה." },
      { line: 4, prompt: "איזה שער מוודא תצורה חיצונית?", answer: "env", acceptable: ["env", "environment variables"], hint: "חפש configured." },
      { line: 6, prompt: "מה צריך להיות ידוע לפני release במקרה של כשל?", answer: "rollback", acceptable: ["rollback", "documented"], hint: "השורה האחרונה." },
    ],
    explanation: "Production readiness מחייב build, tests, env, smoke ו-rollback לפני שמעלים גרסה למשתמשים.",
    requiredConcepts: ["lesson_devops_deploy::production readiness", "lesson_devops_deploy::smoke test", "lesson_devops_deploy::build command"],
    requiredTerms: ["build", "env", "rollback"],
    sideExplanation: "Ready לא אומר רק עובד מקומית; ready אומר שאפשר לפרוס, לבדוק ולהתאושש.",
  },
  {
    id: "trace_svdevops_012",
    conceptKey: "lesson_devops_deploy::service",
    level: 5,
    title: "מעקב אחרי service names ב-Compose",
    code:
      "services:\n  web:\n    environment:\n      API_URL: http://api:3000\n  api:\n    depends_on: [db]\n  db:\n    image: postgres:16",
    steps: [
      { line: 2, prompt: "איזה service מייצג את ה-frontend?", answer: "web", acceptable: ["web"], hint: "השם תחת services." },
      { line: 4, prompt: "לאיזה service ה-frontend פונה?", answer: "api", acceptable: ["api"], hint: "ה-host בתוך API_URL." },
      { line: 6, prompt: "באיזה service api תלוי?", answer: "db", acceptable: ["db"], hint: "חפש depends_on." },
    ],
    explanation: "ב-Compose, service name הוא כתובת פנימית בין containers, ולכן api/db אינם localhost.",
    requiredConcepts: ["lesson_devops_deploy::service", "lesson_devops_deploy::Docker Compose"],
    requiredTerms: ["services", "API_URL", "depends_on"],
    sideExplanation: "בתוך container, localhost הוא אותו container; כדי לדבר עם service אחר משתמשים בשם שלו.",
  },
  {
    id: "trace_svdevops_013",
    conceptKey: "lesson_devops_deploy::smoke test",
    level: 4,
    title: "מעקב אחרי smoke test קצר אחרי deploy",
    code:
      "await page.goto(baseUrl);\nawait expect(page.getByRole('heading', { name: /LumenPortal/ })).toBeVisible();\nawait page.goto(baseUrl + '/health');\nawait expect(page.getByText('ok')).toBeVisible();",
    steps: [
      { line: 1, prompt: "מה נפתח קודם?", answer: "baseUrl", acceptable: ["baseUrl", "home", "עמוד הבית"], hint: "השורה הראשונה." },
      { line: 2, prompt: "איזה סימן UI נבדק?", answer: "heading LumenPortal", acceptable: ["LumenPortal", "heading"], hint: "חפש getByRole." },
      { line: 3, prompt: "איזה endpoint health נפתח?", answer: "/health", acceptable: ["/health", "health"], hint: "הוא מחובר ל-baseUrl." },
    ],
    explanation: "Smoke test בודק מהר שהעמוד המרכזי ו-health route עובדים אחרי deploy, בלי להחליף בדיקות עומק.",
    requiredConcepts: ["lesson_devops_deploy::smoke test", "react_blueprint::Testing Strategies", "lesson_devops_deploy::health check"],
    requiredTerms: ["page.goto", "heading", "/health"],
    sideExplanation: "המטרה היא לתפוס מסך לבן או שרת מת מיד אחרי deploy.",
  },
  {
    id: "trace_svdevops_014",
    conceptKey: "lesson_devops_deploy::Vercel deploy",
    level: 4,
    title: "מעקב אחרי deploy ב-Vercel דרך Git",
    code:
      "git push origin main\n# Vercel detects the commit\n# install -> build -> deploy\n# production URL is updated after success",
    steps: [
      { line: 1, prompt: "איזה branch נשלח?", answer: "main", acceptable: ["main"], hint: "קרא את git push." },
      { line: 3, prompt: "איזה שלב חייב לעבור לפני deploy?", answer: "build", acceptable: ["build", "install -> build"], hint: "הוא מופיע לפני deploy." },
      { line: 4, prompt: "מתי production URL מתעדכן?", answer: "after success", acceptable: ["after success", "אחרי הצלחה", "success"], hint: "קרא את השורה האחרונה." },
    ],
    explanation: "Vercel deploy מחבר Git ל-build ולפרסום URL, אבל production מתעדכן רק אחרי build מוצלח.",
    requiredConcepts: ["lesson_devops_deploy::Vercel deploy", "lesson_tooling_git::GitHub workflow", "lesson_devops_deploy::build command"],
    requiredTerms: ["git push", "Vercel", "production URL"],
    sideExplanation: "אם env vars חסרים או build נכשל, deploy לא אמור להפוך לגרסת production תקינה.",
  },
  {
    id: "trace_svdevops_015",
    conceptKey: "lesson_devops_deploy::volume",
    level: 5,
    title: "מעקב אחרי volume שמחזיק database",
    code:
      "volumes:\n  db_data:\n\nservices:\n  db:\n    image: postgres:16\n    volumes:\n      - db_data:/var/lib/postgresql/data",
    steps: [
      { line: 2, prompt: "מה שם ה-volume?", answer: "db_data", acceptable: ["db_data"], hint: "הוא מוגדר תחת volumes." },
      { line: 5, prompt: "איזה service משתמש בו?", answer: "db", acceptable: ["db"], hint: "הוא תחת services." },
      { line: 8, prompt: "לאיזה נתיב ב-container הוא מחובר?", answer: "/var/lib/postgresql/data", acceptable: ["/var/lib/postgresql/data", "postgresql/data"], hint: "הנתיב אחרי הנקודתיים." },
    ],
    explanation: "Volume שומר data מעבר למחזור החיים של container, ולכן database לא נמחק בכל restart.",
    requiredConcepts: ["lesson_devops_deploy::volume", "lesson_devops_deploy::service", "lesson_sql_orm::database"],
    requiredTerms: ["volumes", "db_data", "/var/lib/postgresql/data"],
    sideExplanation: "ללא volume, מחיקת container עלולה למחוק גם את המידע שה-database כתב לדיסק.",
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
