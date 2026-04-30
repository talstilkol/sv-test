// data/svcollege_traces_foundation_tooling_activity.js
// P6.3.1 — real Trace activity coverage for SVCollege HTML/CSS and Tooling/Git gaps.

var SVCOLLEGE_FOUNDATION_TOOLING_ACTIVITY_TRACES = [
  {
    id: "trace_html_accessibility_basics_001",
    conceptKey: "lesson_html_css_foundations::accessibility basics",
    level: 4,
    title: "accessibility basics מתחיל משם נגיש ופוקוס",
    code:
      "const closeButton = document.createElement('button');\n" +
      "closeButton.type = 'button';\n" +
      "closeButton.setAttribute('aria-label', 'סגור חלון');\n" +
      "closeButton.textContent = '×';\n" +
      "console.log(closeButton.getAttribute('aria-label'));\n" +
      "console.log(closeButton.type);",
    steps: [
      {
        line: 3,
        prompt: "איזה שם נגיש מקבל כפתור האייקון?",
        answer: "סגור חלון",
        acceptable: ["סגור חלון"],
        hint: "aria-label נותן שם לכפתור כשאין טקסט מספיק ברור.",
      },
      {
        line: 6,
        prompt: "מה סוג הכפתור?",
        answer: "button",
        acceptable: ["button"],
        hint: "type='button' מונע submit לא מכוון בתוך form.",
      },
    ],
    explanation:
      "נגישות בסיסית מתחילה מ-HTML ברור: כפתור אמיתי, שם נגיש, פוקוס מקלדת ומשמעות שלא תלויה רק באייקון.",
    requiredConcepts: ["lesson_html_css_foundations::accessibility basics", "lesson_html_css_foundations::HTML document"],
    requiredTerms: ["accessibility", "aria-label", "button"],
  },
  {
    id: "trace_html_box_model_001",
    conceptKey: "lesson_html_css_foundations::box model",
    level: 4,
    title: "box model מחשב content, padding ו-border",
    code:
      "const card = {\n" +
      "  width: 300,\n" +
      "  paddingInline: 24,\n" +
      "  borderInline: 2,\n" +
      "  boxSizing: 'content-box'\n" +
      "};\n" +
      "const renderedWidth = card.width + card.paddingInline * 2 + card.borderInline * 2;\n" +
      "console.log(renderedWidth);",
    steps: [
      {
        line: 7,
        prompt: "כמה padding כולל יש בציר האופקי?",
        answer: "48",
        acceptable: ["48"],
        hint: "יש padding משמאל ומימין: 24 כפול 2.",
      },
      {
        line: 8,
        prompt: "מה הרוחב המחושב ב-content-box?",
        answer: "352",
        acceptable: ["352"],
        hint: "300 + 48 + 4.",
      },
    ],
    explanation:
      "ב-box model הרוחב הסופי תלוי ב-content, padding, border ו-box-sizing. content-box מוסיף padding ו-border מעבר לרוחב.",
    requiredConcepts: ["lesson_html_css_foundations::box model", "lesson_html_css_foundations::CSS selector"],
    requiredTerms: ["box model", "padding", "border-box"],
  },
  {
    id: "trace_html_css_selector_001",
    conceptKey: "lesson_html_css_foundations::CSS selector",
    level: 4,
    title: "CSS selector בוחר אלמנטים לפי class ו-attribute",
    code:
      "const input = document.createElement('input');\n" +
      "input.className = 'field required';\n" +
      "input.setAttribute('required', '');\n" +
      "console.log(input.matches('.field'));\n" +
      "console.log(input.matches('input[required]'));\n" +
      "console.log(input.matches('.card'));\n",
    steps: [
      {
        line: 4,
        prompt: "האם input מתאים ל-selector .field?",
        answer: "true",
        acceptable: ["true"],
        hint: "className מכיל field.",
      },
      {
        line: 5,
        prompt: "האם input[required] מתאים?",
        answer: "true",
        acceptable: ["true"],
        hint: "קיים attribute בשם required.",
      },
      {
        line: 6,
        prompt: "האם .card מתאים?",
        answer: "false",
        acceptable: ["false"],
        hint: "אין class בשם card.",
      },
    ],
    explanation:
      "CSS selector מגדיר אילו אלמנטים מקבלים כלל עיצוב. אפשר לבחור לפי tag, class, id, attribute או מצב.",
    requiredConcepts: ["lesson_html_css_foundations::CSS selector", "lesson_13::setAttribute"],
    requiredTerms: ["CSS selector", "class selector", "attribute selector"],
  },
  {
    id: "trace_html_document_001",
    conceptKey: "lesson_html_css_foundations::HTML document",
    level: 3,
    title: "HTML document מפריד בין head ל-body",
    code:
      "const documentParts = ['doctype', 'html', 'head', 'body'];\n" +
      "const visiblePart = documentParts[3];\n" +
      "const metadataPart = documentParts[2];\n" +
      "console.log(metadataPart);\n" +
      "console.log(visiblePart);\n" +
      "console.log(documentParts.includes('body'));",
    steps: [
      {
        line: 4,
        prompt: "איזה חלק מחזיק metadata כמו title?",
        answer: "head",
        acceptable: ["head"],
        hint: "head הוא האזור שאינו התוכן המרכזי למשתמש.",
      },
      {
        line: 5,
        prompt: "איזה חלק מכיל את מה שהמשתמש רואה?",
        answer: "body",
        acceptable: ["body"],
        hint: "body הוא גוף המסמך.",
      },
      {
        line: 6,
        prompt: "האם body נמצא ברשימת חלקי המסמך?",
        answer: "true",
        acceptable: ["true"],
        hint: "body הוא הפריט הרביעי במערך.",
      },
    ],
    explanation:
      "מסמך HTML תקין כולל doctype, html, head ו-body. הדפדפן מפרש את המבנה הזה לעץ DOM.",
    requiredConcepts: ["lesson_html_css_foundations::HTML document", "lesson_13::Document Object Model"],
    requiredTerms: ["HTML document", "head", "body"],
  },
  {
    id: "trace_html_label_001",
    conceptKey: "lesson_html_css_foundations::label",
    level: 3,
    title: "label מתחבר ל-input דרך for ו-id",
    code:
      "const label = document.createElement('label');\n" +
      "const input = document.createElement('input');\n" +
      "label.setAttribute('for', 'email');\n" +
      "label.textContent = 'אימייל';\n" +
      "input.id = 'email';\n" +
      "console.log(label.getAttribute('for') === input.id);\n" +
      "console.log(label.textContent);",
    steps: [
      {
        line: 6,
        prompt: "האם ה-label מחובר ל-input?",
        answer: "true",
        acceptable: ["true"],
        hint: "for של label שווה ל-id של input.",
      },
      {
        line: 7,
        prompt: "מה הטקסט שמסביר את השדה?",
        answer: "אימייל",
        acceptable: ["אימייל"],
        hint: "textContent של label הוא שם השדה.",
      },
    ],
    explanation:
      "label נותן לשדה שם נגיש וגלוי. החיבור התקין הוא `for` על ה-label מול `id` על ה-input.",
    requiredConcepts: ["lesson_html_css_foundations::label", "lesson_html_css_foundations::HTML form"],
    requiredTerms: ["label", "for", "id"],
  },
  {
    id: "trace_git_branch_001",
    conceptKey: "lesson_tooling_git::branch",
    level: 4,
    title: "branch הוא pointer לשינוי מבודד",
    code:
      "const branches = ['main'];\n" +
      "const currentBranch = 'feature/login-form';\n" +
      "branches.push(currentBranch);\n" +
      "console.log(branches.includes('main'));\n" +
      "console.log(branches.includes(currentBranch));\n" +
      "console.log(currentBranch.startsWith('feature/'));",
    steps: [
      {
        line: 4,
        prompt: "האם main עדיין קיים?",
        answer: "true",
        acceptable: ["true"],
        hint: "יצירת branch לא מוחקת את main.",
      },
      {
        line: 5,
        prompt: "האם ענף הפיצ'ר נוסף לרשימה?",
        answer: "true",
        acceptable: ["true"],
        hint: "push הוסיף את currentBranch.",
      },
      {
        line: 6,
        prompt: "מה מזהה שהענף מיועד לפיצ'ר?",
        answer: "feature/",
        acceptable: ["feature/", "prefix feature"],
        hint: "שם הענף מתחיל ב-feature/.",
      },
    ],
    explanation:
      "branch מאפשר לעבוד על שינוי מבודד בלי לפגוע ב-main. בצוותים מקובל לפתוח branch קצר לכל תיקון או פיצ'ר.",
    requiredConcepts: ["lesson_tooling_git::branch", "lesson_tooling_git::Git"],
    requiredTerms: ["branch", "main", "feature branch"],
  },
  {
    id: "trace_git_commit_001",
    conceptKey: "lesson_tooling_git::commit",
    level: 3,
    title: "commit הוא snapshot עם הודעה",
    code:
      "const stagedFiles = ['src/App.jsx', 'style.css'];\n" +
      "const commit = {\n" +
      "  message: 'fix login validation',\n" +
      "  files: stagedFiles.length\n" +
      "};\n" +
      "console.log(commit.message);\n" +
      "console.log(commit.files);",
    steps: [
      {
        line: 6,
        prompt: "מה הודעת ה-commit?",
        answer: "fix login validation",
        acceptable: ["fix login validation"],
        hint: "message שומר את תיאור השינוי.",
      },
      {
        line: 7,
        prompt: "כמה קבצים נכנסו ל-commit?",
        answer: "2",
        acceptable: ["2"],
        hint: "stagedFiles מכיל שני נתיבים.",
      },
    ],
    explanation:
      "commit טוב הוא snapshot קטן וממוקד של הקוד שנמצא ב-staging area, עם הודעה שמסבירה את הכוונה.",
    requiredConcepts: ["lesson_tooling_git::commit", "lesson_tooling_git::staging area"],
    requiredTerms: ["commit", "snapshot", "message"],
  },
  {
    id: "trace_git_eslint_001",
    conceptKey: "lesson_tooling_git::ESLint",
    level: 4,
    title: "ESLint מזהה בעיות סטטיות לפני runtime",
    code:
      "const lintMessages = [\n" +
      "  { ruleId: 'no-unused-vars', severity: 2 },\n" +
      "  { ruleId: 'no-undef', severity: 2 }\n" +
      "];\n" +
      "const errorCount = lintMessages.filter((item) => item.severity === 2).length;\n" +
      "console.log(errorCount);\n" +
      "console.log(lintMessages[0].ruleId);",
    steps: [
      {
        line: 5,
        prompt: "כמה הודעות ESLint הן errors?",
        answer: "2",
        acceptable: ["2"],
        hint: "severity 2 מייצג error.",
      },
      {
        line: 7,
        prompt: "איזה rule מופיע ראשון?",
        answer: "no-unused-vars",
        acceptable: ["no-unused-vars"],
        hint: "זה ruleId של הפריט הראשון.",
      },
    ],
    explanation:
      "ESLint בודק את הקוד סטטית ומדווח על חוקים שנשברו, כמו משתנה לא בשימוש או מזהה שלא הוגדר.",
    requiredConcepts: ["lesson_tooling_git::ESLint", "lesson_tooling_git::npm scripts"],
    requiredTerms: ["ESLint", "ruleId", "lint error"],
  },
  {
    id: "trace_git_git_001",
    conceptKey: "lesson_tooling_git::Git",
    level: 3,
    title: "Git עוקב אחרי שינויי קבצים",
    code:
      "const workingTree = ['M app.js', '?? notes.md'];\n" +
      "const modified = workingTree.filter((entry) => entry.startsWith('M '));\n" +
      "const untracked = workingTree.filter((entry) => entry.startsWith('??'));\n" +
      "console.log(modified.length);\n" +
      "console.log(untracked.length);",
    steps: [
      {
        line: 4,
        prompt: "כמה קבצים modified יש?",
        answer: "1",
        acceptable: ["1"],
        hint: "רק app.js מתחיל ב-M.",
      },
      {
        line: 5,
        prompt: "כמה קבצים untracked יש?",
        answer: "1",
        acceptable: ["1"],
        hint: "notes.md מתחיל ב-??.",
      },
    ],
    explanation:
      "Git מציג את מצב ה-working tree כדי שתדע מה השתנה, מה חדש ומה צריך staging לפני commit.",
    requiredConcepts: ["lesson_tooling_git::Git", "lesson_tooling_git::working tree"],
    requiredTerms: ["Git", "status", "working tree"],
  },
  {
    id: "trace_git_prettier_001",
    conceptKey: "lesson_tooling_git::Prettier",
    level: 3,
    title: "Prettier מפריד formatting מלוגיקה",
    code:
      "const filesToFormat = ['src/App.jsx', 'src/Button.jsx'];\n" +
      "const formatted = filesToFormat.map((file) => ({ file, changedLogic: false }));\n" +
      "console.log(formatted.length);\n" +
      "console.log(formatted.every((item) => item.changedLogic === false));",
    steps: [
      {
        line: 3,
        prompt: "כמה קבצים עברו formatting?",
        answer: "2",
        acceptable: ["2"],
        hint: "filesToFormat כולל שני קבצים.",
      },
      {
        line: 4,
        prompt: "האם Prettier אמור לשנות לוגיקה?",
        answer: "false",
        acceptable: ["false", "לא"],
        hint: "Prettier הוא formatter, לא שינוי התנהגות.",
      },
    ],
    explanation:
      "Prettier מסדר סגנון קוד באופן דטרמיניסטי. הוא לא אמור לשנות את משמעות הקוד או לתקן באגים.",
    requiredConcepts: ["lesson_tooling_git::Prettier", "lesson_tooling_git::npm scripts"],
    requiredTerms: ["Prettier", "formatter", "format-on-save"],
  },
  {
    id: "trace_git_pull_request_001",
    conceptKey: "lesson_tooling_git::pull request",
    level: 4,
    title: "pull request מרכז diff, review ו-CI",
    code:
      "const pullRequest = {\n" +
      "  branch: 'feature/search',\n" +
      "  checksPassed: true,\n" +
      "  approvals: 1\n" +
      "};\n" +
      "const readyToMerge = pullRequest.checksPassed && pullRequest.approvals > 0;\n" +
      "console.log(pullRequest.branch);\n" +
      "console.log(readyToMerge);",
    steps: [
      {
        line: 7,
        prompt: "מאיזה branch מגיע ה-PR?",
        answer: "feature/search",
        acceptable: ["feature/search"],
        hint: "branch הוא השדה הראשון באובייקט.",
      },
      {
        line: 8,
        prompt: "האם ה-PR מוכן למיזוג לפי התנאים?",
        answer: "true",
        acceptable: ["true"],
        hint: "הבדיקות עברו ויש approval אחד.",
      },
    ],
    explanation:
      "Pull Request הוא שער עבודה צוותי: מציג diff, מריץ checks, מקבל review ורק אז מתמזג ל-main.",
    requiredConcepts: ["lesson_tooling_git::pull request", "lesson_tooling_git::branch"],
    requiredTerms: ["pull request", "review", "CI"],
  },
  {
    id: "trace_git_repository_001",
    conceptKey: "lesson_tooling_git::repository",
    level: 3,
    title: "repository מחזיק קבצים והיסטוריית Git",
    code:
      "const repository = {\n" +
      "  name: 'lumen-portal',\n" +
      "  hasGitFolder: true,\n" +
      "  remotes: ['origin']\n" +
      "};\n" +
      "console.log(repository.name);\n" +
      "console.log(repository.hasGitFolder);\n" +
      "console.log(repository.remotes[0]);",
    steps: [
      {
        line: 6,
        prompt: "מה שם ה-repository?",
        answer: "lumen-portal",
        acceptable: ["lumen-portal"],
        hint: "name הוא השדה הראשון.",
      },
      {
        line: 7,
        prompt: "האם יש תיקיית Git?",
        answer: "true",
        acceptable: ["true"],
        hint: "hasGitFolder מסמן שה-repo מנוהל על ידי Git.",
      },
      {
        line: 8,
        prompt: "מה שם ה-remote הראשון?",
        answer: "origin",
        acceptable: ["origin"],
        hint: "origin הוא השם המקובל ל-remote הראשי.",
      },
    ],
    explanation:
      "repository הוא פרויקט שמנוהל על ידי Git. הוא כולל קבצים, היסטוריה מקומית וקישורים ל-remotes כמו GitHub.",
    requiredConcepts: ["lesson_tooling_git::repository", "lesson_tooling_git::Git"],
    requiredTerms: ["repository", ".git", "remote"],
  },
  {
    id: "trace_git_staging_area_001",
    conceptKey: "lesson_tooling_git::staging area",
    level: 4,
    title: "staging area קובע מה ייכנס ל-commit",
    code:
      "const workingTree = ['app.js', 'style.css', 'notes.md'];\n" +
      "const stagingArea = ['app.js', 'style.css'];\n" +
      "const nextCommitFiles = stagingArea.slice();\n" +
      "console.log(workingTree.length);\n" +
      "console.log(nextCommitFiles.length);\n" +
      "console.log(nextCommitFiles.includes('notes.md'));",
    steps: [
      {
        line: 4,
        prompt: "כמה קבצים קיימים ב-working tree?",
        answer: "3",
        acceptable: ["3"],
        hint: "workingTree מכיל שלושה שמות קבצים.",
      },
      {
        line: 5,
        prompt: "כמה קבצים ייכנסו ל-commit הבא?",
        answer: "2",
        acceptable: ["2"],
        hint: "commit נבנה מה-staging area.",
      },
      {
        line: 6,
        prompt: "האם notes.md נכנס ל-commit?",
        answer: "false",
        acceptable: ["false", "לא"],
        hint: "notes.md לא נמצא ב-stagingArea.",
      },
    ],
    explanation:
      "staging area הוא רשימת השינויים שהוכנו ל-commit הבא. לא כל שינוי ב-working tree חייב להיכנס.",
    requiredConcepts: ["lesson_tooling_git::staging area", "lesson_tooling_git::commit"],
    requiredTerms: ["staging area", "working tree", "commit"],
  },
  {
    id: "trace_git_working_tree_001",
    conceptKey: "lesson_tooling_git::working tree",
    level: 3,
    title: "working tree הוא מצב הקבצים כרגע",
    code:
      "const statusRows = ['M src/App.jsx', 'A src/Login.jsx', '?? scratch.md'];\n" +
      "const dirtyRows = statusRows.filter((row) => row !== '');\n" +
      "const untrackedRows = statusRows.filter((row) => row.startsWith('??'));\n" +
      "console.log(dirtyRows.length);\n" +
      "console.log(untrackedRows[0]);",
    steps: [
      {
        line: 4,
        prompt: "כמה שורות status קיימות?",
        answer: "3",
        acceptable: ["3"],
        hint: "יש שלוש שורות במערך.",
      },
      {
        line: 5,
        prompt: "איזה קובץ עדיין לא במעקב Git?",
        answer: "?? scratch.md",
        acceptable: ["?? scratch.md", "scratch.md"],
        hint: "?? מסמן untracked.",
      },
    ],
    explanation:
      "working tree הוא מצב הקבצים בדיסק כרגע. Git משווה אותו ל-index ול-HEAD כדי להציג status.",
    requiredConcepts: ["lesson_tooling_git::working tree", "lesson_tooling_git::Git"],
    requiredTerms: ["working tree", "git status", "untracked"],
  },
];

(function appendFoundationToolingActivityTraces() {
  if (typeof window === "undefined") return;
  if (!window.QUESTIONS_TRACE) window.QUESTIONS_TRACE = [];
  const existing = new Set(window.QUESTIONS_TRACE.map((item) => item && item.id).filter(Boolean));
  SVCOLLEGE_FOUNDATION_TOOLING_ACTIVITY_TRACES.forEach((item) => {
    if (!existing.has(item.id)) window.QUESTIONS_TRACE.push(item);
  });
  if (window.QUESTIONS_BANK) {
    window.QUESTIONS_BANK.trace = window.QUESTIONS_TRACE;
  }
})();
