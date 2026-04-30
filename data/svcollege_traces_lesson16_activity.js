// data/svcollege_traces_lesson16_activity.js
// P6.3.1 — real Trace activity coverage for SVCollege lesson 16 gaps.

function makeLesson16Trace(id, conceptKey, title, code, steps, explanation, requiredConcepts, requiredTerms) {
  return {
    id,
    conceptKey,
    level: 4,
    title,
    code,
    steps,
    explanation,
    requiredConcepts,
    requiredTerms,
  };
}

var SVCOLLEGE_LESSON16_ACTIVITY_TRACES = [
  makeLesson16Trace(
    "trace_l16_cd_001",
    "lesson_16::cd",
    "cd משנה את תיקיית העבודה",
    "const cwd = '/Users/tal/project';\nconst command = 'cd src';\nconst nextCwd = cwd + '/src';\nconsole.log(nextCwd);",
    [
      { line: 2, prompt: "איזו פקודה משנה תיקייה?", answer: "cd src", acceptable: ["cd src"], hint: "cd = change directory." },
      { line: 4, prompt: "לאיזו תיקייה עוברים?", answer: "/Users/tal/project/src", acceptable: ["/Users/tal/project/src"], hint: "src נוסף לסוף הנתיב הנוכחי." },
    ],
    "cd היא פקודת טרמינל שמשנה את current working directory. היא לא מריצה קוד, אלא קובעת מאיזו תיקייה הפקודות הבאות יפעלו.",
    ["lesson_16::cd", "lesson_16::CLI"],
    ["cd", "working directory", "terminal"],
  ),
  makeLesson16Trace(
    "trace_l16_cli_001",
    "lesson_16::CLI",
    "CLI מקבל פקודה כטקסט",
    "const input = 'node app.js';\nconst parts = input.split(' ');\nconsole.log(parts[0]);\nconsole.log(parts[1]);",
    [
      { line: 2, prompt: "כמה חלקים יש לפקודה?", answer: "2", acceptable: ["2"], hint: "split לפי רווח." },
      { line: 3, prompt: "איזו תוכנה מריצים?", answer: "node", acceptable: ["node"], hint: "זה החלק הראשון." },
      { line: 4, prompt: "איזה קובץ נשלח ל-node?", answer: "app.js", acceptable: ["app.js"], hint: "זה החלק השני." },
    ],
    "CLI הוא ממשק שורת פקודה: המשתמש כותב טקסט, והמערכת מפרקת אותו לפקודה, קובץ, דגלים וארגומנטים.",
    ["lesson_16::CLI", "lesson_16::Command Line Interface"],
    ["CLI", "command", "arguments"],
  ),
  makeLesson16Trace(
    "trace_l16_command_line_interface_001",
    "lesson_16::Command Line Interface",
    "Command Line Interface מפעיל כלים ללא GUI",
    "const command = 'npm start';\nconst [tool, script] = command.split(' ');\nconsole.log(tool);\nconsole.log(script);",
    [
      { line: 2, prompt: "מה שם הכלי?", answer: "npm", acceptable: ["npm"], hint: "החלק הראשון הוא הכלי." },
      { line: 4, prompt: "איזו פעולה מבקשים?", answer: "start", acceptable: ["start"], hint: "החלק השני הוא הפעולה." },
    ],
    "Command Line Interface הוא שם מלא ל-CLI. במקום ללחוץ על כפתורים, מפעילים כלים באמצעות פקודות טקסט מדויקות.",
    ["lesson_16::Command Line Interface", "lesson_16::CLI"],
    ["Command Line Interface", "CLI", "npm start"],
  ),
  makeLesson16Trace(
    "trace_l16_dependencies_001",
    "lesson_16::dependencies",
    "dependencies הן חבילות שהקוד צריך בזמן ריצה",
    "const packageJson = {\n  dependencies: { express: '^4.18.2' },\n  devDependencies: { vitest: '^4.1.5' }\n};\nconsole.log(Object.keys(packageJson.dependencies)[0]);",
    [
      { line: 2, prompt: "איזו חבילה היא dependency רגילה?", answer: "express", acceptable: ["express"], hint: "היא תחת dependencies." },
      { line: 5, prompt: "מה יודפס?", answer: "express", acceptable: ["express"], hint: "Object.keys מחזיר את שמות התלויות." },
    ],
    "dependencies הן חבילות שהאפליקציה צריכה כדי לרוץ. devDependencies משמשות בעיקר לבנייה, בדיקות וכלי פיתוח.",
    ["lesson_16::dependencies", "lesson_16::package.json"],
    ["dependencies", "devDependencies", "package.json"],
  ),
  makeLesson16Trace(
    "trace_l16_dir_001",
    "lesson_16::dir",
    "dir מציג קבצים בתיקייה",
    "const files = ['app.js', 'package.json', 'README.md'];\nconst command = 'dir';\nconsole.log(command);\nconsole.log(files.includes('package.json'));",
    [
      { line: 2, prompt: "איזו פקודה מציגה רשימת קבצים ב-Windows?", answer: "dir", acceptable: ["dir"], hint: "זו הפקודה שנשמרה במשתנה." },
      { line: 4, prompt: "האם package.json נמצא ברשימה?", answer: "true", acceptable: ["true"], hint: "includes מחפש בתוך המערך." },
    ],
    "dir היא פקודת טרמינל שמציגה את תוכן התיקייה הנוכחית. היא שימושית לפני הרצת node/npm כדי לוודא שאתה במקום הנכון.",
    ["lesson_16::dir", "lesson_16::CLI"],
    ["dir", "directory listing", "files"],
  ),
  makeLesson16Trace(
    "trace_l16_file_system_001",
    "lesson_16::File System",
    "File System שומר קבצים ותיקיות",
    "const path = '/project/data/users.json';\nconst parts = path.split('/').filter(Boolean);\nconsole.log(parts[0]);\nconsole.log(parts.at(-1));",
    [
      { line: 2, prompt: "מה התיקייה הראשונה בנתיב?", answer: "project", acceptable: ["project"], hint: "filter מסיר את החלק הריק בהתחלה." },
      { line: 4, prompt: "מה שם הקובץ?", answer: "users.json", acceptable: ["users.json"], hint: "at(-1) לוקח את הפריט האחרון." },
    ],
    "File System הוא האופן שבו מערכת ההפעלה מארגנת קבצים ותיקיות. מודול fs של Node פונה לשכבה הזו כדי לקרוא ולכתוב.",
    ["lesson_16::File System", "lesson_16::fs"],
    ["File System", "path", "file"],
  ),
  makeLesson16Trace(
    "trace_l16_fs_001",
    "lesson_16::fs",
    "fs הוא מודול הקבצים של Node",
    "const fs = require('fs');\nconsole.log(typeof fs.readFile);\nconsole.log(typeof fs.writeFile);",
    [
      { line: 1, prompt: "איזה מודול נטען?", answer: "fs", acceptable: ["fs"], hint: "require('fs')." },
      { line: 2, prompt: "איזה type יש ל-readFile?", answer: "function", acceptable: ["function"], hint: "readFile היא פונקציה במודול." },
    ],
    "fs הוא מודול built-in של Node.js לעבודה עם מערכת הקבצים: קריאה, כתיבה, מחיקה, שינוי שם ועוד.",
    ["lesson_16::fs", "lesson_16::module"],
    ["fs", "require", "Node.js module"],
  ),
  makeLesson16Trace(
    "trace_l16_fs_appendfile_001",
    "lesson_16::fs.appendFile",
    "fs.appendFile מוסיף לסוף הקובץ",
    "const log = 'first line';\nconst appended = log + '\\nsecond line';\nconsole.log(appended.split('\\n').length);\nconsole.log(appended.endsWith('second line'));",
    [
      { line: 2, prompt: "האם השורה הראשונה נמחקה?", answer: "לא", acceptable: ["לא", "false", "no"], hint: "append מוסיף ולא דורס." },
      { line: 3, prompt: "כמה שורות יש אחרי ההוספה?", answer: "2", acceptable: ["2"], hint: "יש first line ו-second line." },
    ],
    "fs.appendFile מוסיף תוכן לסוף קובץ קיים. משתמשים בו ללוגים או צבירת נתונים כשלא רוצים למחוק תוכן קודם.",
    ["lesson_16::fs.appendFile", "lesson_16::fs.writeFile"],
    ["fs.appendFile", "append", "file"],
  ),
  makeLesson16Trace(
    "trace_l16_fs_open_001",
    "lesson_16::fs.open",
    "fs.open פותח קובץ ומחזיר file descriptor",
    "const flags = 'r';\nconst descriptorType = 'number';\nconsole.log(flags);\nconsole.log(descriptorType);",
    [
      { line: 1, prompt: "איזה flag מבקש פתיחה לקריאה?", answer: "r", acceptable: ["r"], hint: "r = read." },
      { line: 4, prompt: "איזה סוג ערך מקבלים כ-file descriptor?", answer: "number", acceptable: ["number"], hint: "fd הוא מספר שמייצג ידית לקובץ." },
    ],
    "fs.open פותח קובץ ברמת מערכת ההפעלה ומחזיר file descriptor. זה שימושי לעבודה נמוכה יותר מקריאה/כתיבה פשוטה.",
    ["lesson_16::fs.open", "lesson_16::fs"],
    ["fs.open", "file descriptor", "flags"],
  ),
  makeLesson16Trace(
    "trace_l16_fs_readfile_001",
    "lesson_16::fs.readFile",
    "fs.readFile קורא את כל הקובץ לזיכרון",
    "const fileText = 'name=Tal\\nlevel=1';\nconst lines = fileText.split('\\n');\nconsole.log(lines.length);\nconsole.log(lines[0]);",
    [
      { line: 2, prompt: "כמה שורות נקראו?", answer: "2", acceptable: ["2"], hint: "split לפי newline." },
      { line: 4, prompt: "מה השורה הראשונה?", answer: "name=Tal", acceptable: ["name=Tal"], hint: "lines[0]." },
    ],
    "fs.readFile מתאים לקבצים קטנים ובינוניים כי הוא קורא את כל התוכן לזיכרון לפני שה-callback מקבל אותו.",
    ["lesson_16::fs.readFile", "lesson_16::fs.open"],
    ["fs.readFile", "buffer", "utf8"],
  ),
  makeLesson16Trace(
    "trace_l16_fs_rename_001",
    "lesson_16::fs.rename",
    "fs.rename משנה שם או מיקום",
    "const from = 'draft.txt';\nconst to = 'final.txt';\nconst renamed = to;\nconsole.log(from);\nconsole.log(renamed);",
    [
      { line: 1, prompt: "מה שם הקובץ הישן?", answer: "draft.txt", acceptable: ["draft.txt"], hint: "from." },
      { line: 5, prompt: "מה שם הקובץ אחרי rename?", answer: "final.txt", acceptable: ["final.txt"], hint: "to הוא היעד." },
    ],
    "fs.rename משנה שם קובץ או מעביר אותו לנתיב אחר. הפעולה לא משנה את תוכן הקובץ עצמו.",
    ["lesson_16::fs.rename", "lesson_16::fs"],
    ["fs.rename", "path", "file name"],
  ),
  makeLesson16Trace(
    "trace_l16_fs_unlink_001",
    "lesson_16::fs.unlink",
    "fs.unlink מוחק קובץ",
    "const files = ['old.log', 'keep.log'];\nconst afterUnlink = files.filter((file) => file !== 'old.log');\nconsole.log(afterUnlink.length);\nconsole.log(afterUnlink[0]);",
    [
      { line: 2, prompt: "איזה קובץ הוסר?", answer: "old.log", acceptable: ["old.log"], hint: "filter מסיר אותו." },
      { line: 4, prompt: "איזה קובץ נשאר?", answer: "keep.log", acceptable: ["keep.log"], hint: "זה הפריט היחיד שנשאר." },
    ],
    "fs.unlink מוחק קובץ לפי נתיב. זו פעולה הרסנית, לכן בקוד אמיתי בודקים היטב את הנתיב ומטפלים בשגיאות.",
    ["lesson_16::fs.unlink", "lesson_16::fs"],
    ["fs.unlink", "delete file", "path"],
  ),
  makeLesson16Trace(
    "trace_l16_fs_writefile_001",
    "lesson_16::fs.writeFile",
    "fs.writeFile כותב ומחליף תוכן",
    "const before = 'old content';\nconst written = 'new content';\nconsole.log(before);\nconsole.log(written);",
    [
      { line: 1, prompt: "מה היה לפני הכתיבה?", answer: "old content", acceptable: ["old content"], hint: "before." },
      { line: 4, prompt: "מה התוכן אחרי writeFile?", answer: "new content", acceptable: ["new content"], hint: "writeFile מחליף את תוכן הקובץ." },
    ],
    "fs.writeFile כותב תוכן לקובץ. אם הקובץ קיים, התוכן הקודם מוחלף אלא אם משתמשים במצב כתיבה אחר.",
    ["lesson_16::fs.writeFile", "lesson_16::fs.open"],
    ["fs.writeFile", "overwrite", "file"],
  ),
  makeLesson16Trace(
    "trace_l16_json_001",
    "lesson_16::JSON",
    "JSON.stringify ו-JSON.parse",
    "const user = { name: 'Tal', level: 1 };\nconst text = JSON.stringify(user);\nconst parsed = JSON.parse(text);\nconsole.log(parsed.name);\nconsole.log(typeof text);",
    [
      { line: 2, prompt: "מה JSON.stringify מחזיר?", answer: "string", acceptable: ["string", "מחרוזת"], hint: "JSON כתוב כטקסט." },
      { line: 4, prompt: "מה parsed.name?", answer: "Tal", acceptable: ["Tal"], hint: "parse החזיר אובייקט." },
    ],
    "JSON הוא פורמט טקסט להעברת נתונים. ב-Node משתמשים בו הרבה לקבצי config, API responses ושמירת מידע.",
    ["lesson_16::JSON", "lesson_11::object"],
    ["JSON.stringify", "JSON.parse", "object"],
  ),
  makeLesson16Trace(
    "trace_l16_mkdir_001",
    "lesson_16::mkdir",
    "mkdir יוצר תיקייה",
    "const folders = ['src'];\nconst afterMkdir = [...folders, 'data'];\nconsole.log(afterMkdir.includes('data'));\nconsole.log(afterMkdir.length);",
    [
      { line: 2, prompt: "איזו תיקייה נוספה?", answer: "data", acceptable: ["data"], hint: "mkdir יוצר תיקייה חדשה." },
      { line: 4, prompt: "כמה תיקיות יש אחרי היצירה?", answer: "2", acceptable: ["2"], hint: "src ו-data." },
    ],
    "mkdir היא פקודת טרמינל, וגם פעולה במודול fs, ליצירת תיקייה חדשה במערכת הקבצים.",
    ["lesson_16::mkdir", "lesson_16::CLI"],
    ["mkdir", "directory", "create"],
  ),
  makeLesson16Trace(
    "trace_l16_module_001",
    "lesson_16::module",
    "module עוטף קובץ Node",
    "const module = { exports: {} };\nmodule.exports.answer = 42;\nconsole.log(module.exports.answer);",
    [
      { line: 1, prompt: "איפה נשמר מה שהקובץ מייצא?", answer: "module.exports", acceptable: ["module.exports"], hint: "זה האובייקט שנשלח החוצה." },
      { line: 3, prompt: "מה יודפס?", answer: "42", acceptable: ["42"], hint: "answer נשמר בתוך exports." },
    ],
    "ב-CommonJS כל קובץ הוא module. מה ששמים על module.exports הוא מה שקבצים אחרים יכולים לקבל עם require.",
    ["lesson_16::module", "lesson_16::module.exports"],
    ["module", "CommonJS", "exports"],
  ),
  makeLesson16Trace(
    "trace_l16_module_exports_001",
    "lesson_16::module.exports",
    "module.exports קובע את הייצוא",
    "const module = { exports: {} };\nfunction add(a, b) { return a + b; }\nmodule.exports = add;\nconsole.log(module.exports(2, 3));",
    [
      { line: 3, prompt: "מה מיוצא מהקובץ?", answer: "add", acceptable: ["add", "function add"], hint: "module.exports מקבל את הפונקציה." },
      { line: 4, prompt: "מה יודפס?", answer: "5", acceptable: ["5"], hint: "2 + 3." },
    ],
    "module.exports יכול להצביע על פונקציה, אובייקט או ערך אחר. זה החוזה שקובץ אחר יקבל דרך require.",
    ["lesson_16::module.exports", "lesson_16::module"],
    ["module.exports", "require", "CommonJS"],
  ),
  makeLesson16Trace(
    "trace_l16_node_file_001",
    "lesson_16::node file.js",
    "node file.js מריץ קובץ JavaScript",
    "const fileName = 'server.js';\nconst command = 'node ' + fileName;\nconsole.log(command);\nconsole.log(fileName.endsWith('.js'));",
    [
      { line: 2, prompt: "איזו פקודה נבנית?", answer: "node server.js", acceptable: ["node server.js"], hint: "node + שם הקובץ." },
      { line: 4, prompt: "האם זה קובץ JavaScript?", answer: "true", acceptable: ["true"], hint: "השם מסתיים ב-.js." },
    ],
    "node file.js מפעיל את Node.js ומריץ את הקובץ שנשלח אליו. זו הדרך הבסיסית להריץ סקריפט צד שרת.",
    ["lesson_16::node file.js", "lesson_16::Node.js", "lesson_16::CLI"],
    ["node", "file.js", "runtime"],
  ),
  makeLesson16Trace(
    "trace_l16_npm_init_001",
    "lesson_16::npm init",
    "npm init יוצר package.json",
    "const command = 'npm init';\nconst createdFile = 'package.json';\nconsole.log(command);\nconsole.log(createdFile);",
    [
      { line: 1, prompt: "איזו פקודה מאתחלת פרויקט npm?", answer: "npm init", acceptable: ["npm init"], hint: "init = אתחול." },
      { line: 4, prompt: "איזה קובץ נוצר?", answer: "package.json", acceptable: ["package.json"], hint: "זה קובץ המטא-דאטה של npm." },
    ],
    "npm init יוצר package.json שמגדיר שם פרויקט, scripts, dependencies ושדות מטא-דאטה נוספים.",
    ["lesson_16::npm init", "lesson_16::npm", "lesson_16::package.json"],
    ["npm init", "package.json", "project"],
  ),
  makeLesson16Trace(
    "trace_l16_npm_install_001",
    "lesson_16::npm install",
    "npm install מוסיף תלות לפרויקט",
    "const command = 'npm install express';\nconst packageJson = { dependencies: {} };\npackageJson.dependencies.express = '^4.18.2';\nconsole.log(Object.keys(packageJson.dependencies)[0]);",
    [
      { line: 1, prompt: "איזו חבילה מתקינים?", answer: "express", acceptable: ["express"], hint: "השם אחרי install." },
      { line: 4, prompt: "מה נוסף ל-dependencies?", answer: "express", acceptable: ["express"], hint: "החבילה נשמרת ברשימת התלויות." },
    ],
    "npm install מוריד חבילה ומעדכן את package.json/package-lock.json כדי שהפרויקט יוכל לשחזר את אותה תלות.",
    ["lesson_16::npm install", "lesson_16::npm", "lesson_16::dependencies"],
    ["npm install", "dependencies", "package-lock"],
  ),
  makeLesson16Trace(
    "trace_l16_npm_start_001",
    "lesson_16::npm start",
    "npm start מריץ script בשם start",
    "const packageJson = { scripts: { start: 'node server.js' } };\nconst command = packageJson.scripts.start;\nconsole.log(command);\nconsole.log(command.startsWith('node'));",
    [
      { line: 1, prompt: "איזה script מוגדר?", answer: "start", acceptable: ["start"], hint: "scripts.start." },
      { line: 3, prompt: "מה npm start יריץ?", answer: "node server.js", acceptable: ["node server.js"], hint: "זה הערך של scripts.start." },
    ],
    "npm start הוא קיצור ל-script בשם start בתוך package.json. הוא שימושי להפעלת השרת או האפליקציה.",
    ["lesson_16::npm start", "lesson_16::npm", "lesson_16::package.json"],
    ["npm start", "scripts", "node server.js"],
  ),
  makeLesson16Trace(
    "trace_l16_package_json_001",
    "lesson_16::package.json",
    "package.json הוא חוזה הפרויקט",
    "const packageJson = {\n  name: 'portal',\n  scripts: { test: 'vitest run' },\n  dependencies: { express: '^4.18.2' }\n};\nconsole.log(packageJson.name);\nconsole.log(packageJson.scripts.test);",
    [
      { line: 2, prompt: "מה שם הפרויקט?", answer: "portal", acceptable: ["portal"], hint: "name." },
      { line: 7, prompt: "איזו פקודת בדיקה מוגדרת?", answer: "vitest run", acceptable: ["vitest run"], hint: "scripts.test." },
    ],
    "package.json מרכז את חוזה הפרויקט: שם, scripts, dependencies, גרסאות וכל מידע שנדרש לכלי npm.",
    ["lesson_16::package.json", "lesson_16::npm"],
    ["package.json", "scripts", "dependencies"],
  ),
  makeLesson16Trace(
    "trace_l16_require_001",
    "lesson_16::require",
    "require טוען module",
    "const exportsFromMath = { add: (a, b) => a + b };\nconst math = exportsFromMath;\nconsole.log(math.add(2, 5));",
    [
      { line: 2, prompt: "באיזה משתנה משתמשים אחרי הטעינה?", answer: "math", acceptable: ["math"], hint: "זה שם המשתנה שמחזיק את הייצוא." },
      { line: 3, prompt: "מה תוצאת add?", answer: "7", acceptable: ["7"], hint: "2 + 5." },
    ],
    "require הוא מנגנון CommonJS לטעינת module. הוא מחזיר את הערך שהקובץ השני שם ב-module.exports.",
    ["lesson_16::require", "lesson_16::module.exports"],
    ["require", "module.exports", "CommonJS"],
  ),
  makeLesson16Trace(
    "trace_l16_type_nul_001",
    "lesson_16::type nul",
    "type nul יוצר קובץ ריק ב-Windows",
    "const command = 'type nul > app.js';\nconst fileName = command.split('>')[1].trim();\nconsole.log(fileName);\nconsole.log(fileName.endsWith('.js'));",
    [
      { line: 1, prompt: "איזו פקודה יוצרת קובץ ריק?", answer: "type nul > app.js", acceptable: ["type nul > app.js"], hint: "זו פקודת Windows." },
      { line: 3, prompt: "איזה קובץ נוצר?", answer: "app.js", acceptable: ["app.js"], hint: "השם אחרי >." },
    ],
    "type nul > file יוצר קובץ ריק ב-Windows shell. זו דרך מהירה להכין קובץ לפני עריכה.",
    ["lesson_16::type nul", "lesson_16::CLI"],
    ["type nul", "Windows", "empty file"],
  ),
  makeLesson16Trace(
    "trace_l16_v8_001",
    "lesson_16::V8",
    "V8 מריץ JavaScript בתוך Node",
    "const runtime = 'Node.js';\nconst engine = 'V8';\nconsole.log(runtime + ' uses ' + engine);\nconsole.log(engine.length);",
    [
      { line: 2, prompt: "איזה מנוע JavaScript מצוין?", answer: "V8", acceptable: ["V8"], hint: "engine." },
      { line: 3, prompt: "מה תחילת המשפט שיודפס?", answer: "Node.js uses", acceptable: ["Node.js uses"], hint: "runtime + ' uses '." },
    ],
    "V8 הוא מנוע JavaScript של Chrome שגם Node.js משתמש בו כדי להריץ JavaScript מחוץ לדפדפן.",
    ["lesson_16::V8", "lesson_16::Node.js"],
    ["V8", "Node.js", "JavaScript engine"],
  ),
];

(function appendLesson16ActivityTraces() {
  if (typeof window === "undefined") return;
  if (!window.QUESTIONS_TRACE) window.QUESTIONS_TRACE = [];
  const existing = new Set(window.QUESTIONS_TRACE.map((item) => item && item.id).filter(Boolean));
  SVCOLLEGE_LESSON16_ACTIVITY_TRACES.forEach((item) => {
    if (!existing.has(item.id)) window.QUESTIONS_TRACE.push(item);
  });
  if (window.QUESTIONS_BANK) {
    window.QUESTIONS_BANK.trace = window.QUESTIONS_TRACE;
  }
})();
