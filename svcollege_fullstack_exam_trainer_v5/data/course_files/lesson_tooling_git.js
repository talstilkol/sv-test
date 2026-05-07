// data/lesson_tooling_git.js
// SVCollege Finish Line 1 — Git, GitHub workflow and frontend tooling.

var LESSON_TOOLING_GIT = {
  id: "lesson_tooling_git",
  title: "Tooling & Git — כלי פיתוח, Git וזרימת עבודה",
  description:
    "איך שינוי קוד עובר ממחשב אישי לעבודה צוותית: repository, commit, branch, pull request, npm scripts, ESLint, Prettier ו-format-on-save.",
  sourceAssets: [
    {
      path: "lessons/הסיור_הגדול_ב-GitHub.mp4",
      role: "github-workflow-video",
      coverage: "primary",
    },
    {
      path: "lessons/React_Architect_Blueprint.pdf",
      role: "testing-and-tooling-context",
      coverage: "partial",
    },
  ],
  generatedSummaries: [
    "SVCOLLEGE_LESSON_INVENTORY.md",
    "SVCOLLEGE_COVERAGE_REPORT.md",
    "SVCOLLEGE_READINESS_REPORT.md",
  ],
  sourceCoverageNote:
    "The GitHub video is the primary local source for workflow. ESLint/Prettier/npm scripts are covered as SVCollege tooling requirements and linked to architecture/testing context.",
  concepts: [
    {
      conceptName: "Git",
      difficulty: 3,
      levels: {
        grandma: "Git הוא יומן מסודר של שינויים בקוד. הוא זוכר מה השתנה, מתי, ולמה.",
        child: "כשאתה שומר במשחק יש checkpoint. Git נותן checkpoint לקוד.",
        soldier: "Git מנהל גרסאות מקומי: status, add, commit, branch, merge ו-log.",
        student: "Git שומר snapshots של הפרויקט ומאפשר לחזור אחורה, להשוות שינויים ולעבוד בכמה כיוונים במקביל.",
        junior: "לפני כל שינוי משמעותי: בדוק status, עבוד בענף, עשה commit קטן וברור, ואז פתח PR.",
        professor: "Git is a content-addressed version-control system. Commits point to trees and parents, creating a directed history graph.",
      },
      illustration: "working tree -> staging area -> commit -> branch -> PR",
      codeExample:
        "git status\ngit add src/App.jsx\ngit commit -m \"add login form\"\ngit log --oneline",
      codeExplanation:
        "status מראה מצב, add מכניס לשלב הכנה, commit יוצר snapshot, log מציג היסטוריה.",
    },
    {
      conceptName: "repository",
      difficulty: 2,
      levels: {
        grandma: "repository הוא תיקיית הפרויקט יחד עם הזיכרון של Git.",
        child: "זו הקופסה שבה כל הקבצים וכל השמירות של הפרויקט נמצאים.",
        soldier: "Repo כולל working files ותיקיית .git שבה נשמרת היסטוריית הגרסאות.",
        student: "repository יכול להיות מקומי במחשב ומרוחק ב-GitHub. push מעדכן את המרוחק, pull מביא ממנו שינויים.",
        junior: "אם אין .git, Git לא מנהל את התיקייה. מתחילים עם git init או clone מ-GitHub.",
        professor: "A repository stores object database, refs and configuration. Remotes are named pointers to other repositories.",
      },
      illustration: "local repo <-> remote repo on GitHub",
      codeExample:
        "git clone https://github.com/team/app.git\ncd app\ngit remote -v",
      codeExplanation:
        "clone יוצר repository מקומי מתוך GitHub. remote -v מראה לאן push/pull מחוברים.",
    },
    {
      conceptName: "working tree",
      difficulty: 3,
      levels: {
        grandma: "working tree הוא שולחן העבודה הנוכחי: הקבצים כפי שהם עכשיו.",
        child: "זה מה שאתה רואה בתיקייה לפני ששמרת את השינוי ב-Git.",
        soldier: "working tree מכיל קבצים modified/untracked/deleted לפני staging או commit.",
        student: "git status משווה בין working tree, staging area וה-commit האחרון.",
        junior: "אם status מלוכלך, אל תחליף branch בלי להבין מה יקרה לשינויים.",
        professor: "The working tree is checked-out filesystem state derived from index and HEAD plus local modifications.",
      },
      illustration: "קובץ השתנה -> working tree dirty -> git status מציג modified",
      codeExample:
        "git status --short\n# M src/App.jsx\n# ?? notes.md",
      codeExplanation:
        "M אומר קובץ קיים השתנה. ?? אומר קובץ חדש ש-Git עדיין לא עוקב אחריו.",
    },
    {
      conceptName: "staging area",
      difficulty: 4,
      levels: {
        grandma: "staging area הוא מגש לפני צילום. שמים עליו רק את השינויים שרוצים להכניס ל-commit.",
        child: "לא כל מה ששינית חייב להיכנס לשמירה. staging בוחר מה כן.",
        soldier: "git add מעביר שינוי ל-index. commit לוקח snapshot מה-index, לא בהכרח מכל working tree.",
        student: "staging מאפשר commits קטנים: קובץ אחד ל-feature, קובץ אחר לתיקון נפרד.",
        junior: "השתמש ב-git add -p כשאתה רוצה לבחור חלקים מתוך קובץ ולא להכניס שינוי לא קשור.",
        professor: "The index is Git's staging area: a proposed tree object for the next commit.",
      },
      illustration: "working tree -> git add -> staging area -> git commit",
      codeExample:
        "git add src/App.jsx\ngit diff --staged\ngit commit -m \"wire login form\"",
      codeExplanation:
        "diff --staged מראה בדיוק מה ייכנס ל-commit הבא.",
    },
    {
      conceptName: "commit",
      difficulty: 3,
      levels: {
        grandma: "commit הוא צילום רשמי של מצב הקוד עם פתק שמסביר מה השתנה.",
        child: "כמו שמירה במשחק עם שם: 'הוספתי כפתור כניסה'.",
        soldier: "commit כולל snapshot, author, timestamp, message וקישור להורה קודם.",
        student: "commit טוב קטן, ממוקד, ומסביר כוונה. לא מערבב feature, format ותיקון באג באותו צילום.",
        junior: "כתוב הודעה בפועל: add, fix, rename, remove. למשל fix auth redirect.",
        professor: "A commit object references a tree, parent commits, author metadata and message. Its hash derives from content.",
      },
      illustration: "commit A -> commit B -> commit C",
      codeExample:
        "git add .\ngit commit -m \"fix empty task validation\"",
      codeExplanation:
        "ה-message צריך להסביר את השינוי העסקי/טכני, לא רק 'update'.",
    },
    {
      conceptName: "branch",
      difficulty: 4,
      levels: {
        grandma: "branch הוא שביל צדדי שבו אפשר לעבוד בלי להרוס את הדרך הראשית.",
        child: "יש main ויש ענף לניסוי. אם הניסוי טוב, מחברים אותו חזרה.",
        soldier: "branch הוא pointer ל-commit. עובדים על feature branch ואז ממזגים ל-main דרך PR.",
        student: "שם טוב לענף מתאר מטרה: feature/login-form או fix/navbar-focus.",
        junior: "אל תעבוד ישירות על main. פתח branch קצר, שמור commits קטנים, ופתח PR מוקדם.",
        professor: "Branches are mutable refs. Collaboration discipline comes from protecting main and reviewing changes before merge.",
      },
      illustration: "main ── A ── B\n          \\ feature/login ── C",
      codeExample:
        "git switch -c feature/login-form\ngit branch --show-current",
      codeExplanation:
        "switch -c יוצר ענף חדש ועובר אליו. show-current מאשר שאתה לא על main.",
    },
    {
      conceptName: "pull request",
      difficulty: 4,
      levels: {
        grandma: "pull request הוא בקשה: בדקו את השינוי שלי לפני שמכניסים אותו לפרויקט.",
        child: "אתה מראה לחבר את השינוי והוא אומר אם זה טוב או צריך תיקון.",
        soldier: "PR מציג diff, בדיקות CI, שיחות review ואפשרות merge.",
        student: "PR טוב כולל תיאור קצר, איך לבדוק, צילומי מסך כשיש UI, וקישור למשימה.",
        junior: "אל תפתח PR ענק. PR קטן קל לבדיקה ומקטין סיכוי לבאגים.",
        professor: "Pull requests are review and integration gates around branch diffs, status checks and repository policy.",
      },
      illustration: "branch -> push -> PR -> review -> checks -> merge",
      codeExample:
        "git push -u origin feature/login-form\n# פותחים PR ב-GitHub ומחכים ל-review + CI",
      codeExplanation:
        "push מעלה את הענף. GitHub מציג כפתור לפתיחת PR מהענף הזה ל-main.",
    },
    {
      conceptName: "GitHub workflow",
      difficulty: 5,
      levels: {
        grandma: "workflow הוא סדר העבודה של הצוות: מי משנה, מי בודק, ומתי מכניסים לפרויקט.",
        child: "כל שינוי עובר מסלול: ענף, שמירה, העלאה, בדיקה, אישור, חיבור.",
        soldier: "workflow בסיסי: pull latest, branch, code, test, commit, push, PR, review, merge.",
        student: "החוזק של workflow הוא למנוע הפתעות: main נשאר עובד, CI מריץ בדיקות, review תופס טעויות.",
        junior: "לפני PR הרץ npm test ו-npm run build. אם CI ייכשל על דברים פשוטים, בזבזת זמן reviewer.",
        professor: "A team workflow is a socio-technical control loop: versioning, automated checks, peer review and release policy.",
      },
      illustration: "pull -> branch -> code -> test -> commit -> push -> PR -> merge",
      codeExample:
        "git pull --ff-only\ngit switch -c feature/search\nnpm test\ngit push -u origin feature/search",
      codeExplanation:
        "pull --ff-only מביא עדכונים בלי merge מפתיע. בדיקות לפני push מצמצמות רעש ב-CI.",
    },
    {
      conceptName: "npm scripts",
      difficulty: 4,
      levels: {
        grandma: "npm scripts הם כפתורים שמפעילים פקודות קבועות בפרויקט.",
        child: "במקום לזכור פקודה ארוכה, כותבים npm run dev או npm test.",
        soldier: "scripts מוגדרים ב-package.json: dev, build, test, lint, format.",
        student: "scripts יוצרים שפה משותפת לצוות ול-CI. כולם מריצים את אותה פקודה בדיוק.",
        junior: "אל תכתוב הוראות ידניות במסמך כשאפשר להפוך אותן ל-script. זה מקטין טעויות.",
        professor: "npm scripts are reproducible command aliases integrated with package binaries and CI pipelines.",
      },
      illustration: "package.json -> scripts -> npm run <name>",
      codeExample:
        "{\n  \"scripts\": {\n    \"dev\": \"vite\",\n    \"build\": \"vite build\",\n    \"test\": \"vitest run\",\n    \"lint\": \"eslint .\"\n  }\n}",
      codeExplanation:
        "כל מפתח יכול להריץ npm run lint בלי לדעת איפה eslint מותקן או מה כל הדגלים.",
    },
    {
      conceptName: "ESLint",
      difficulty: 5,
      levels: {
        grandma: "ESLint הוא בודק שמזהיר כשהקוד חשוד או מסוכן.",
        child: "כמו מורה שבודקת אם שכחת סוגריים, משתנה לא בשימוש, או טעות נפוצה.",
        soldier: "ESLint מנתח JavaScript/TypeScript לפי חוקים: unused vars, hooks rules, no-undef ועוד.",
        student: "Lint לא מחליף טסטים. הוא תופס בעיות סטטיות לפני הרצה.",
        junior: "אם חוק מפריע, בדוק למה. אל תכבה rules בלי סיבה ברורה ובלי הסכמה צוותית.",
        professor: "ESLint builds an AST and applies rule visitors to report semantic/style issues before runtime.",
      },
      illustration: "code -> parser -> rules -> warnings/errors",
      codeExample:
        "npm run lint\n# no-unused-vars: 'count' is assigned but never used",
      codeExplanation:
        "ה-linter עוזר לשמור main נקי ומצמצם באגים שחוזרים שוב ושוב.",
    },
    {
      conceptName: "Prettier",
      difficulty: 3,
      levels: {
        grandma: "Prettier מסדר את הקוד באותה צורה בכל פעם.",
        child: "הוא מחליט איפה לרדת שורה ואיפה לשים רווחים, כדי שלא נתווכח על זה.",
        soldier: "Prettier הוא formatter. הוא משנה formatting, לא אמור לשנות לוגיקה.",
        student: "Format-on-save מפעיל Prettier בכל שמירה, כך שהקוד נשאר אחיד בלי מאמץ.",
        junior: "הפרד בין format commit לבין logic commit אם השינוי גדול. אחרת קשה לעשות review.",
        professor: "Prettier prints parsed code using deterministic formatting rules, reducing style variance across contributors.",
      },
      illustration: "messy code -> Prettier -> consistent code",
      codeExample:
        "npm run format\n# או format-on-save דרך VS Code",
      codeExplanation:
        "Prettier פותר סגנון. ESLint פותר בעיות חוקיות/איכות. הם משלימים זה את זה.",
    },
  ],

  quiz: [
    {
      question: "מה commit אמור לייצג?",
      options: [
        "צילום קטן וברור של שינוי",
        "מחיקה של כל ההיסטוריה",
        "הורדה של ספרייה חדשה בלבד",
        "פתיחת אתר בדפדפן",
      ],
      correct: 0,
      explanation: "commit טוב הוא snapshot ממוקד עם הודעה שמסבירה את הכוונה.",
    },
    {
      question: "למה לא לעבוד ישירות על main?",
      options: [
        "כי main לא יכול להכיל JavaScript",
        "כי branch מאפשר שינוי מבודד ו-review לפני merge",
        "כי GitHub לא תומך ב-main",
        "כי npm scripts יפסיקו לעבוד",
      ],
      correct: 1,
      explanation: "feature branch שומר את main יציב ומאפשר PR, CI ו-review לפני חיבור.",
    },
    {
      question: "מה התפקיד של Pull Request?",
      options: [
        "להריץ שרת Express",
        "להציג diff, לקבל review ולבדוק CI לפני merge",
        "למחוק node_modules",
        "להחליף את package.json",
      ],
      correct: 1,
      explanation: "PR הוא שער איכות: diff גלוי, דיון, בדיקות ואישור לפני merge.",
    },
    {
      question: "איפה מגדירים npm scripts כמו dev/build/test?",
      options: ["README.md", "package.json", "index.html", ".gitignore"],
      correct: 1,
      explanation: "scripts מוגדרים ב-package.json ומופעלים עם npm run <name>.",
    },
    {
      question: "מה ESLint עושה בעיקר?",
      options: [
        "בודק חוקים סטטיים ומזהה בעיות בקוד",
        "מעצב צבעים ב-CSS",
        "מעלה קבצים ל-GitHub",
        "מחליף את React",
      ],
      correct: 0,
      explanation: "ESLint מנתח את הקוד לפי rules ומזהיר על בעיות עוד לפני runtime.",
    },
    {
      question: "מה Prettier עושה?",
      options: [
        "מריץ API",
        "מעצב formatting בצורה עקבית",
        "יוצר branch חדש",
        "מוחק שגיאות לוגיקה",
      ],
      correct: 1,
      explanation: "Prettier אחראי לעיצוב הקוד. הוא לא אמור לשנות לוגיקה.",
    },
  ],
};

if (typeof window !== "undefined") {
  window.LESSON_TOOLING_GIT = LESSON_TOOLING_GIT;
}
