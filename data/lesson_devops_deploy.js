// data/lesson_devops_deploy.js
// SVCollege Finish Line 1 - DevOps, deploy, Docker and CI/CD bridge lesson.

var LESSON_DEVOPS_DEPLOY = {
  id: "lesson_devops_deploy",
  title: "DevOps Foundations - Vercel, Docker, CI/CD ו-Testing",
  description:
    "איך מעבירים אפליקציית Full Stack ממחשב אישי לסביבה שאפשר לבנות, לבדוק, לפרוס ולתחזק.",
  svcollegeModule: "תשתיות, DevOps ו-CI/CD - Vercel, Docker, Docker Compose, testing",
  sourceAssets: ["React_Architect_Blueprint.pdf"],
  sourceCoverageNote:
    "React Architect Blueprint נותן בסיס testing/architecture. מקור DevOps ייעודי הוא unknown/unavailable, לכן זהו bridge עצמאי שמכסה deploy, Docker ו-CI/CD.",
  concepts: [
    {
      conceptName: "production readiness",
      difficulty: 5,
      simpleExplanation:
        "production readiness היא בדיקה שהאפליקציה לא רק רצה אצלך, אלא מוכנה למשתמשים אמיתיים: build, env, errors, logs, security ו-smoke.",
      whyFullStack:
        "Full Stack אמיתי לא נגמר ב-localhost. צריך לדעת שהלקוח, השרת והנתונים עובדים גם אחרי deploy.",
      codeExample:
        "npm run build\nnpm test -- --run\nnpm run validate:strict",
      codeExplanation:
        "לפני deploy מריצים build, tests ו-validation כדי לתפוס בעיות לפני שהן מגיעות למשתמשים.",
      commonMistake:
        "לחשוב ש-dev server עובד שווה production עובד. production מפעיל build, env ו-cache בצורה אחרת.",
      prerequisite: "lesson_tooling_git::npm scripts",
    },
    {
      conceptName: "environment variables",
      difficulty: 5,
      simpleExplanation:
        "environment variables הם ערכי תצורה שמגיעים מהסביבה, למשל URL של database או מפתח API, ולא נכתבים בקוד.",
      whyFullStack:
        "אותו קוד צריך לעבוד ב-local, preview ו-production עם ערכים שונים ובלי לחשוף secrets.",
      codeExample:
        "const databaseUrl = process.env.DATABASE_URL;",
      codeExplanation:
        "הקוד קורא את הערך מהסביבה. הערך עצמו מוגדר בכל סביבת deploy.",
      commonMistake:
        "לשמור secret בתוך קובץ JS או לדחוף .env פרטי ל-Git.",
      prerequisite: "lesson_auth_security::secure cookie",
    },
    {
      conceptName: "Vercel deploy",
      difficulty: 4,
      simpleExplanation:
        "Vercel deploy הוא פרסום אפליקציית frontend/Next דרך חיבור Git או CLI, עם build אוטומטי ו-preview לכל שינוי.",
      whyFullStack:
        "SVCollege דורש להבין איך קוד הופך לכתובת שעובדת מחוץ למחשב שלך.",
      codeExample:
        "git push origin main\n# Vercel מזהה שינוי, מריץ build ויוצר deployment",
      codeExplanation:
        "ה-deploy מחובר ל-Git ולכן כל push יכול לפתוח build ו-preview.",
      commonMistake:
        "להניח ש-env vars קיימים ב-Vercel כי הם קיימים אצלך ב-local.",
      prerequisite: "lesson_tooling_git::GitHub workflow",
    },
    {
      conceptName: "preview deployment",
      difficulty: 4,
      simpleExplanation:
        "preview deployment הוא deploy זמני ל-branch או PR, כדי לבדוק שינוי לפני production.",
      whyFullStack:
        "הוא מאפשר לראות UI, API ונתונים בסביבה דומה יותר למציאות לפני merge.",
      codeExample:
        "branch -> pull request -> preview URL -> review -> merge",
      codeExplanation:
        "במקום לבדוק רק מקומית, ה-PR מקבל כתובת בדיקה.",
      commonMistake:
        "לדלג על preview ולמזג שינוי שלא נבדק בדפדפן אמיתי.",
      prerequisite: "lesson_tooling_git::pull request",
    },
    {
      conceptName: "build command",
      difficulty: 4,
      simpleExplanation:
        "build command היא הפקודה שמייצרת גרסת production מהקוד, בדרך כלל npm run build.",
      whyFullStack:
        "אם build נכשל, deploy אמור להיעצר. זה שער בסיסי לפני production.",
      codeExample:
        "\"scripts\": { \"build\": \"vite build\", \"test\": \"vitest run\" }",
      codeExplanation:
        "package.json מגדיר פקודות קבועות שכל מפתח ו-CI יכולים להריץ.",
      commonMistake:
        "להסתפק ב-npm run dev, שלא בודק production bundle.",
      prerequisite: "lesson_tooling_git::npm scripts",
    },
    {
      conceptName: "Docker",
      difficulty: 6,
      simpleExplanation:
        "Docker אורז אפליקציה עם סביבת ההרצה שלה לתוך image שממנו מריצים container.",
      whyFullStack:
        "הוא מקטין פערים בין מחשבים וסביבות: אותה אפליקציה רצה באותה צורה יחסית.",
      codeExample:
        "docker build -t lumen-api .\ndocker run -p 3000:3000 lumen-api",
      codeExplanation:
        "build יוצר image, ו-run מפעיל ממנו container עם port חשוף.",
      commonMistake:
        "לחשוב ש-Docker הוא virtual machine מלא. Container משתף kernel אבל מבודד process/files/network.",
      prerequisite: "lesson_16::Node.js",
    },
    {
      conceptName: "Dockerfile",
      difficulty: 6,
      simpleExplanation:
        "Dockerfile הוא מתכון שמגדיר איך לבנות image: base image, העתקת קבצים, התקנת dependencies ו-command.",
      whyFullStack:
        "הוא הופך סביבת הרצה להוראות מפורשות במקום 'אצלי זה עובד'.",
      codeExample:
        "FROM node:22-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nCMD [\"npm\", \"start\"]",
      codeExplanation:
        "השכבות בונות image עם Node, dependencies, קוד ופקודת הפעלה.",
      commonMistake:
        "להעתיק את כל הפרויקט לפני npm ci ואז לשבור cache בכל שינוי קטן.",
      prerequisite: "lesson_devops_deploy::Docker",
    },
    {
      conceptName: "image",
      difficulty: 5,
      simpleExplanation:
        "image הוא snapshot בנוי של האפליקציה והסביבה, שממנו אפשר להריץ containers.",
      whyFullStack:
        "Image נותן artifact ברור: זה מה שבדקנו וזה מה שמריצים.",
      codeExample:
        "docker images\nlumen-api:latest",
      codeExplanation:
        "ה-image נשמר בשם ו-tag כדי שאפשר יהיה להריץ או לפרסם אותו.",
      commonMistake:
        "לבלבל בין image לבין container. image הוא התבנית; container הוא תהליך שרץ ממנה.",
      prerequisite: "lesson_devops_deploy::Dockerfile",
    },
    {
      conceptName: "container",
      difficulty: 5,
      simpleExplanation:
        "container הוא process שרץ מתוך image עם filesystem, network ו-env מבודדים יחסית.",
      whyFullStack:
        "כך אפשר להריץ backend, database או worker באותה צורה בסביבות שונות.",
      codeExample:
        "docker ps\nCONTAINER ID   IMAGE       PORTS",
      codeExplanation:
        "docker ps מציג containers שרצים עכשיו.",
      commonMistake:
        "לשמור מידע חשוב בתוך container בלי volume או database חיצוני.",
      prerequisite: "lesson_devops_deploy::image",
    },
    {
      conceptName: "Docker Compose",
      difficulty: 6,
      simpleExplanation:
        "Docker Compose מריץ כמה services יחד לפי קובץ compose, למשל app + database.",
      whyFullStack:
        "Full Stack כולל כמה תהליכים. Compose נותן דרך אחת להרים אותם יחד ל-dev או integration.",
      codeExample:
        "services:\n  api:\n    build: .\n  db:\n    image: postgres:16",
      codeExplanation:
        "compose מגדיר services, images/build, ports, env ו-volumes.",
      commonMistake:
        "לחשוב ש-compose הוא production orchestrator מלא. הוא בעיקר נוח ל-dev וסביבות קטנות.",
      prerequisite: "lesson_devops_deploy::container",
    },
    {
      conceptName: "service",
      difficulty: 5,
      simpleExplanation:
        "ב-Compose, service הוא תהליך מוגדר כמו api, web או db עם image, ports, env ותלויות.",
      whyFullStack:
        "השם service מאפשר לתהליכים לדבר אחד עם השני לפי שם פנימי, לא לפי localhost של המחשב.",
      codeExample:
        "services:\n  api:\n    depends_on: [db]\n  db:\n    image: postgres:16",
      codeExplanation:
        "api ו-db הם services; api יכול לפנות ל-db בשם db ברשת של compose.",
      commonMistake:
        "להשתמש ב-localhost מתוך container כדי להגיע ל-db שנמצא ב-container אחר.",
      prerequisite: "lesson_devops_deploy::Docker Compose",
    },
    {
      conceptName: "volume",
      difficulty: 5,
      simpleExplanation:
        "volume הוא אחסון שממשיך להתקיים מחוץ למחזור החיים של container.",
      whyFullStack:
        "Database או קבצים חשובים לא צריכים להימחק בכל הפעלה מחדש של container.",
      codeExample:
        "volumes:\n  db_data:\n\nservices:\n  db:\n    volumes: [db_data:/var/lib/postgresql/data]",
      codeExplanation:
        "db_data מחזיק את נתוני Postgres מחוץ ל-container עצמו.",
      commonMistake:
        "להריץ database בלי volume ואז לאבד נתונים כשה-container נמחק.",
      prerequisite: "lesson_devops_deploy::service",
    },
    {
      conceptName: "health check",
      difficulty: 5,
      simpleExplanation:
        "health check הוא endpoint או פקודה שמוודאים שה-service חי ומוכן לקבל עבודה.",
      whyFullStack:
        "שרת יכול להיות דלוק אבל לא מוכן. health check עוזר ל-CI, deploy ו-monitoring להבין מצב אמיתי.",
      codeExample:
        "app.get('/health', (req, res) => res.json({ ok: true }));",
      codeExplanation:
        "endpoint פשוט מחזיר שהשרת מגיב; בגרסה מתקדמת בודקים גם database ותלויות.",
      commonMistake:
        "להחזיר ok תמיד גם כשה-database נפל, ואז להסתיר תקלה אמיתית.",
      prerequisite: "lesson_17::Status Codes",
    },
    {
      conceptName: "CI",
      difficulty: 5,
      simpleExplanation:
        "CI הוא תהליך אוטומטי שרץ על כל push/PR ומריץ install, lint, tests, build ו-validation.",
      whyFullStack:
        "CI מונע מצב שבו שינוי ששבר build או בדיקות נכנס ל-main.",
      codeExample:
        "on: [push, pull_request]\njobs:\n  validate:\n    steps:\n      - run: npm ci\n      - run: npm test -- --run\n      - run: npm run build",
      codeExplanation:
        "GitHub Actions מריץ סדר פעולות קבוע כדי לאמת את הקוד.",
      commonMistake:
        "להריץ CI רק אחרי merge במקום לפני merge.",
      prerequisite: "lesson_tooling_git::GitHub workflow",
    },
    {
      conceptName: "CD",
      difficulty: 5,
      simpleExplanation:
        "CD הוא תהליך שמפרסם גרסה אחרי שהבדיקות עוברות, בדרך כלל ל-preview או production לפי branch.",
      whyFullStack:
        "הוא מחבר quality gates ל-deploy כך שהמערכת לא תלויה בזיכרון ידני של מפתח.",
      codeExample:
        "main branch -> CI green -> production deploy",
      codeExplanation:
        "הכלל אומר שרק main שעבר בדיקות יכול להגיע ל-production.",
      commonMistake:
        "לפרוס ידנית בלי קשר לתוצאות CI.",
      prerequisite: "lesson_devops_deploy::CI",
    },
    {
      conceptName: "smoke test",
      difficulty: 4,
      simpleExplanation:
        "smoke test הוא בדיקה קצרה שמוודאת שהמסכים/זרימות הקריטיות נפתחים בלי שגיאת runtime.",
      whyFullStack:
        "גם אם unit tests עוברים, משתמש עדיין יכול לפגוש מסך לבן. smoke test בודק את האפליקציה מבחוץ.",
      codeExample:
        "open / -> assert title\nopen /login -> assert form\nopen /health -> assert ok",
      codeExplanation:
        "בודקים מעט דברים קריטיים, מהר, אחרי build או deploy.",
      commonMistake:
        "לקרוא ל-smoke test בדיקה מלאה. הוא שער מהיר, לא תחליף ל-E2E עמוק.",
      prerequisite: "react_blueprint::Testing Strategies",
    },
    {
      conceptName: "release checklist",
      difficulty: 4,
      simpleExplanation:
        "release checklist היא רשימת Go/No-Go לפני גרסה: tests, build, env, migrations, rollback ו-smoke.",
      whyFullStack:
        "Checklist מונע פרסום גרסה מתוך לחץ בלי לוודא את הדברים שידועים כשוברים production.",
      codeExample:
        "Go only if: CI green, env configured, migrations reviewed, smoke passed, rollback known.",
      codeExplanation:
        "ה-checklist מתרגם ניסיון תפעולי לשער קבוע לפני release.",
      commonMistake:
        "לסמוך על זיכרון במקום checklist כתוב.",
      prerequisite: "lesson_devops_deploy::production readiness",
    },
  ],
};

if (typeof window !== "undefined") {
  window.LESSON_DEVOPS_DEPLOY = LESSON_DEVOPS_DEPLOY;
}

if (typeof module !== "undefined") {
  module.exports = { LESSON_DEVOPS_DEPLOY: LESSON_DEVOPS_DEPLOY };
}
