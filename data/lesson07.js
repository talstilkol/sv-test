// data/lesson07.js — שיעור 07: Git, ESLint, Prettier
// כלי פיתוח חיוניים. מבחן: 5-7 שאלות צפויות על Git workflow.
var LESSON_07 = {
  id: "lesson_07",
  title: "שיעור 07 — Git, ESLint, Prettier — Dev Tools",
  description:
    "Git basics, branches, PR flow, ESLint, Prettier — workflow מקצועי של מפתח.",
  concepts: [
    {
      conceptName: "Git",
      difficulty: 4,
      levels: {
        grandma: "Git = מערכת שמירה של גרסאות לקוד. כל פעם שאתה משנה — אתה יכול לחזור אחורה אם משהו נשבר.",
        child: "כמו Ctrl+Z מתקדם — שומר כל שלב, ויכול לחזור לכל שלב בעבר.",
        soldier: "Version Control System. שומר היסטוריה מלאה של קבצים. כל פיתוח רציני משתמש בו.",
        student: "Git = distributed VCS. כל מפתח עם clone מלא של ההיסטוריה. Commits = snapshots. Branches = קווי עבודה מקבילים. Remote (GitHub/GitLab) = synchronization.",
        junior: "פעם איבדתי שעות עבודה כי שכחתי לדחוף לפני שמחקתי תיקיה. עכשיו: git push בכל סוף יום, branch לכל פיצ'ר. מציל חיים.",
        professor: "Git uses content-addressable filesystem (SHA-1 of content). Objects: blob, tree, commit, tag. Reference-based pointers. Three-tree model: working dir, staging (index), repository.",
      },
      illustration:
        "📦 Git areas:\n\n  Working dir → git add → Staging → git commit → Repository\n                               ↓\n                          git push\n                               ↓\n                          Remote (GitHub)",
      codeExample:
        "# התחלת פרויקט\ngit init\ngit remote add origin https://github.com/user/repo.git\n\n# Workflow יומיומי\ngit status                 # מה שונה?\ngit add file.js            # הוספה ל-staging\ngit add .                  # הוספת הכל\ngit commit -m \"add feature X\"\ngit push origin main\n\n# מבט אחורה\ngit log --oneline          # רשימת commits\ngit diff                   # מה שונה מאז ה-commit האחרון\ngit checkout abc123        # חזרה ל-commit ספציפי",
      codeExplanation: "init יוצר repo. add מוסיף ל-staging. commit שומר snapshot. push לserver. log/diff לבדיקה.",
    },
    {
      conceptName: "branch",
      difficulty: 5,
      levels: {
        grandma: "ענף = העתק של הקוד לעבודה במקביל. אפשר לפתח פיצ'ר חדש בלי להפריע לקוד הראשי.",
        child: "כמו לפתוח חלק של מחברת חדש — לכתוב בו, ואם הולך טוב להעתיק חזרה לראשי.",
        soldier: "Branch = pointer ל-commit. main = ענף ראשי. feature/X = ענף עבודה. ממזגים בסוף.",
        student: "Branch = lightweight pointer. Diverge from main, develop, merge back. Convention: main (production), develop, feature/X, fix/Y, release/Z.",
        junior: "התחלתי עבודה על main ישירות — באג שיתק את הצוות. עכשיו: כל פיצ'ר ב-feature/X, PR עם review, merge רק אחרי CI ירוק. אפס באגי main.",
        professor: "Git Flow: main + develop + feature/* + release/* + hotfix/*. GitHub Flow: simpler, main + feature/*. Trunk-Based: short-lived branches (<1 day), feature flags.",
      },
      illustration:
        "🌿 Branches:\n\n     main:  A--B--C--D------H\n                  \\        /\n  feature/X:       E--F--G\n\n  G merged into main as H",
      codeExample:
        "# יצירה ומעבר\ngit checkout -b feature/login        # יצירה + מעבר\ngit branch                            # רשימת ענפים\ngit branch -d feature/old             # מחיקה (אם merged)\n\n# מיזוג\ngit checkout main\ngit merge feature/login               # merge לתוך main\n\n# Push branch ל-remote\ngit push -u origin feature/login\n\n# pull changes\ngit pull origin main                  # עדכון מ-remote\ngit fetch origin                      # רק בדיקה (לא merge)",
      codeExplanation: "checkout -b יוצר+מעבר. merge מאחד שני branches. push -u קושר local ל-remote. pull = fetch + merge.",
    },
    {
      conceptName: "Pull Request",
      difficulty: 5,
      levels: {
        grandma: "PR = בקשה לאישור לקוד החדש. הקוד נבדק, ומאושר רק אחרי בקרה.",
        child: "כמו לבקש מאמא 'אפשר לאכול גלידה לפני ארוחת ערב?' — היא בודקת לפני שמאשרת.",
        soldier: "Pull Request (GitHub) / Merge Request (GitLab). הצעה למיזוג branch לתוך main, עם review, comments, CI checks.",
        student: "PR לא קיים ב-Git עצמו — feature של GitHub/GitLab. מנגנון: collaborative review, automated checks (CI), approval, merge. Squash/rebase/merge strategies.",
        junior: "PR ראשון שלי היה 50 קבצים — השני אמר 'אי אפשר לבדוק'. עכשיו: PR קטן (< 400 שורות), ממוקד, תיאור ברור עם 'why' ו-'how to test'.",
        professor: "PR review patterns: paired review, async review, code owners. Best practice: small (<400 lines), single-purpose, descriptive title (conventional commits), test plan, screenshots for UI.",
      },
      illustration:
        "🔄 PR workflow:\n\n  1. git checkout -b feature/X\n  2. work + commit\n  3. git push -u origin feature/X\n  4. PR ב-GitHub\n  5. Review + CI checks\n  6. Approval + merge",
      codeExample:
        "# קומיט + push\ngit checkout -b feature/auth\n# ... עבודה ...\ngit add -A\ngit commit -m \"feat(auth): add JWT login flow\"\ngit push -u origin feature/auth\n\n# יצירת PR ב-CLI (GitHub)\ngh pr create --title \"Add JWT auth\" \\\n  --body \"## Summary\\n- Login endpoint\\n- JWT issuance\\n\\n## Test plan\\n- [x] Login works\\n- [x] Tests pass\"\n\n# צפייה ב-PR\ngh pr list\ngh pr view 123\ngh pr checks 123              # CI status\n\n# merge אחרי approval\ngh pr merge 123 --squash --delete-branch",
      codeExplanation: "gh CLI = GitHub from terminal. PR מקבל title + body. squash מאחד את כל ה-commits לאחד נקי. delete-branch מסיר את ה-branch אחרי merge.",
    },
    {
      conceptName: "merge conflict",
      difficulty: 7,
      levels: {
        grandma: "התנגשות = שני אנשים שינו את אותה שורה. Git לא יודע מי צודק — אתה צריך להחליט.",
        child: "כמו שני ילדים שכותבים על אותו דף — אבא חייב להחליט מה להשאיר.",
        soldier: "Conflict = שינויים סותרים בין branches. Git מסמן את הקבצים הבעייתיים. אנחנו עורכים ידנית.",
        student: "Conflict markers: <<<<<<<< HEAD, =========, >>>>>>>>> branch. Resolution: ערוך, git add, git commit (or rebase --continue).",
        junior: "פעם פתרתי conflict ע\"י מחיקת השינויים של החבר במקרה — הוא כעס. עכשיו: VS Code עם merge conflict UI, מקבל החלטה מודעת על כל בלוק.",
        professor: "Conflicts arise during merge/rebase/cherry-pick when both sides changed overlapping lines. Three-way merge: common ancestor, ours, theirs. Tools: VS Code, Beyond Compare, Meld.",
      },
      illustration:
        "💥 Conflict markers:\n\n  <<<<<<< HEAD\n  שלי: const PORT = 3000;\n  =======\n  שלהם: const PORT = 8080;\n  >>>>>>> feature/x\n\n  בחר אחד או מזג ידנית",
      codeExample:
        "# ניסיון merge גורר conflict\n$ git merge feature/x\nAuto-merging server.js\nCONFLICT (content): Merge conflict in server.js\nAutomatic merge failed; fix conflicts and then commit the result.\n\n# פתח VS Code, ראה את המרקרים, בחר 'Accept Current/Incoming/Both'\n# או ערוך ידנית\n\n# סימון פתור\n$ git add server.js\n$ git commit -m \"resolve: merge feature/x\"\n\n# אם זה rebase\n$ git rebase --continue\n\n# ביטול אם נסבך\n$ git merge --abort\n$ git rebase --abort",
      codeExplanation: "Git מסמן conflicts בקבצים. אנחנו עורכים, מסירים markers, git add + commit. abort מחזיר אחורה אם נסבכים.",
    },
    {
      conceptName: "ESLint",
      difficulty: 4,
      levels: {
        grandma: "כלי שבודק את הקוד שלך ומצביע על טעויות לוגיות לפני הרצה.",
        child: "כמו מורה שעובר על המבחן ומסמן 'כאן טעית, כאן עוד פעם'.",
        soldier: "ESLint = static analysis tool ל-JS. תופס באגים נפוצים, משתנים לא משומשים, צורות לא רצויות.",
        student: "Configurable rules. Plugins: react, typescript, jest. Configs: eslint:recommended, airbnb, standard. Auto-fix אופציונלי. Integration: VS Code, pre-commit hook.",
        junior: "פעם דחפתי קוד עם console.log שכוח ב-production. ESLint עם rule 'no-console' תופס אוטומטית. גם no-unused-vars, no-undef. חיסכון של שעות דיבוג.",
        professor: "ESLint AST-based: parses code, traverses AST, applies rules. Performance: incremental + caching. Successor of JSHint/JSLint. Replaces deprecated TSLint for TypeScript.",
      },
      illustration: "🔍 ESLint:\n  src/app.js:10:3 - 'foo' is defined but never used (no-unused-vars)\n  src/api.js:5:1 - Unexpected console.log (no-console)",
      codeExample:
        "# התקנה\nnpm i -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin\n\n# יצירת config\nnpx eslint --init\n\n# הרצה\nnpx eslint src/\nnpx eslint src/ --fix       # תיקון אוטומטי של מה שאפשר\n\n# .eslintrc.json (דוגמה)\n{\n  \"extends\": [\"eslint:recommended\", \"plugin:react/recommended\"],\n  \"parserOptions\": { \"ecmaVersion\": 2022 },\n  \"rules\": {\n    \"no-console\": \"warn\",\n    \"no-unused-vars\": \"error\",\n    \"prefer-const\": \"error\"\n  }\n}",
      codeExplanation: "init יוצר config interactive. רצים על folder. --fix מתקן auto-fixable rules. .eslintrc מגדיר extends + rules.",
    },
    {
      conceptName: "Prettier",
      difficulty: 3,
      levels: {
        grandma: "מסדר את הקוד שלך לפי כללי עיצוב אחידים — ריווח, שורות חדשות, תווים.",
        child: "כמו מי שמסדר חדר — לא משנה תוכן, רק מסדר חזותית.",
        soldier: "Prettier = code formatter. אוטומטי, opinionated. עיצוב אחיד בכל הצוות.",
        student: "Prettier vs ESLint: Prettier formats (style), ESLint catches errors (quality). תאוריה: ESLint עם eslint-config-prettier מבטל rules סותרים. אוטומציה: format on save.",
        junior: "פעם בלגן של tabs vs spaces, single vs double quotes — debate בכל PR. עכשיו: Prettier בכל הצוות = 0 debates על style. הצוות מתמקד בלוגיקה.",
        professor: "Prettier AST-based formatting. Reprints code from AST → guarantees consistency. Print-width algorithm: tries fitting on line, otherwise breaks. Integrates with most editors + tools.",
      },
      illustration: "✨ Prettier transformation:\n  Before: const x={a:1,b:'hi',c:[1,2,3]}\n  After:  const x = { a: 1, b: 'hi', c: [1, 2, 3] };",
      codeExample:
        "# התקנה\nnpm i -D prettier\n\n# הרצה\nnpx prettier --write src/      # עדכון קבצים\nnpx prettier --check src/      # בדיקה בלבד (לCI)\n\n# .prettierrc\n{\n  \"semi\": true,\n  \"singleQuote\": false,\n  \"tabWidth\": 2,\n  \"printWidth\": 80,\n  \"trailingComma\": \"all\"\n}\n\n# .prettierignore (דומה ל-gitignore)\nnode_modules\ndist\n*.min.js",
      codeExplanation: "prettier --write מעדכן קבצים. --check ל-CI. .prettierrc מגדיר preferences. .prettierignore מחריג קבצים.",
    },
    {
      conceptName: "Husky + lint-staged",
      difficulty: 6,
      levels: {
        grandma: "שומר שלא תדחף קוד שבור — בודק לפני שאתה מצליח לדחוף.",
        child: "כמו שומר ראש שבודק כניסה — אם הקוד שגוי, לא נכנס.",
        soldier: "Pre-commit hooks. Husky = wrapper ל-git hooks. lint-staged = רץ על קבצים שהשתנו בלבד.",
        student: "Pre-commit chain: husky triggers lint-staged → runs eslint+prettier on staged files only → fails commit if errors. UX: fail fast (לוקאלית, לפני CI).",
        junior: "פעם CI כשל אצלי — הסיבה: console.log ששכחתי. 5 דקות חיכיתי ל-CI. עכשיו husky תופס במקום, חוסך זמן.",
        professor: "git hooks (pre-commit, pre-push, commit-msg) live in .git/hooks. Not committed. Husky persists hooks via package.json + .husky/ folder. lint-staged runs glob-matched commands per file.",
      },
      illustration: "🛡️ Pre-commit chain:\n  git commit\n    ↓\n  husky → lint-staged\n    ↓\n  eslint + prettier על staged\n    ↓ (אם הצליח)\n  commit נשמר",
      codeExample:
        "# התקנה\nnpm i -D husky lint-staged\nnpx husky init\necho \"npx lint-staged\" > .husky/pre-commit\n\n# package.json\n{\n  \"lint-staged\": {\n    \"*.{js,ts,tsx}\": [\n      \"eslint --fix\",\n      \"prettier --write\"\n    ],\n    \"*.{md,json}\": [\"prettier --write\"]\n  }\n}\n\n# כעת בכל git commit:\n# 1. lint-staged מריץ ESLint + Prettier על קבצים staged\n# 2. אם פסול → commit נחסם\n# 3. אם תקין → commit מתבצע",
      codeExplanation: "husky init מקים את ה-folder .husky. pre-commit hook מריץ lint-staged. lint-staged רץ על staged files בלבד (מהיר!).",
    },
  ],
};
