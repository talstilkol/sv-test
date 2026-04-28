// data/svcollege_code_blocks.js
// Code Blocks for Finish Line 1: SVCollege AI & Full Stack.
// Loaded after data/code_blocks.js and merged by content-loader.js.

var SVCOLLEGE_CODE_BLOCKS = [
  {
    id: "sv_cb_html_form_labels",
    lessonId: "lesson_html_css_foundations",
    conceptName: "HTML form",
    title: "טופס HTML עם label אמיתי",
    icon: "🧾",
    difficulty: 1,
    importance: 4,
    importantNote: "טופס בלי label שובר נגישות ומקשה על בדיקות. label הוא חוזה בין הטקסט לשדה.",
    intro: "הבלוק מראה איך label, input ו-button יוצרים חוזה בסיסי שהדפדפן והקורא מסך מבינים.",
    code:
      "<form action=\"/signup\" method=\"post\">\n" +
      "  <label for=\"email\">Email</label>\n" +
      "  <input id=\"email\" name=\"email\" type=\"email\" required />\n" +
      "  <button type=\"submit\">Create account</button>\n" +
      "</form>",
    lineComments: {
      1: "form מגדיר גבול של שליחה ו-method.",
      2: "for מחבר את הטקסט לשדה לפי id.",
      3: "name הוא המפתח שנשלח לשרת; type ו-required מוסיפים ולידציה בסיסית.",
      4: "button מסוג submit מפעיל את שליחת הטופס.",
    },
    questions: [
      {
        id: "sv_cb_html_form_labels_q1",
        kind: "mc",
        targetLine: 2,
        question: "מה מחבר את ה-label לשדה הקלט?",
        options: ["הטקסט Email", "for=\"email\" מול id=\"email\"", "method=\"post\"", "required"],
        correctIndex: 1,
        explanation: "המאפיין for ב-label חייב להתאים ל-id של input כדי ליצור קשר נגיש וברור.",
      },
      {
        id: "sv_cb_html_form_labels_q2",
        kind: "mc",
        targetLine: 3,
        question: "למה name=\"email\" חשוב?",
        options: ["כי זה הצבע של השדה", "כי זה המפתח שנשלח לשרת", "כי זה מפעיל CSS", "כי זה מחליף label"],
        correctIndex: 1,
        explanation: "בשליחת טופס, השרת מקבל זוגות key/value. name הוא ה-key.",
      },
    ],
  },
  {
    id: "sv_cb_tailwind_responsive_card",
    lessonId: "lesson_25",
    conceptName: "responsive design",
    title: "כרטיס רספונסיבי עם Tailwind",
    icon: "📱",
    difficulty: 2,
    importance: 4,
    importantNote: "Responsive הוא לא קישוט. זה החוזה שהמסך הקטן והמסך הגדול מקבלים מבנה קריא.",
    intro: "הבלוק מדגים מעבר מעמודה במובייל לשורה במסכים רחבים בלי CSS מותאם ידנית.",
    code:
      "<article class=\"flex flex-col gap-4 md:flex-row\">\n" +
      "  <img class=\"w-full md:w-40 rounded\" src=\"/poster.jpg\" alt=\"Movie poster\" />\n" +
      "  <div class=\"space-y-2\">\n" +
      "    <h2 class=\"text-xl font-bold\">Inception</h2>\n" +
      "    <p class=\"text-slate-600\">A layered dream thriller.</p>\n" +
      "  </div>\n" +
      "</article>",
    lineComments: {
      1: "במובייל flex-col; החל מ-md עוברים ל-flex-row.",
      2: "התמונה מלאה במובייל ומקבלת רוחב קבוע בדסקטופ.",
      3: "space-y נותן רווח אנכי בין הילדים.",
      4: "כותרת קריאה וברורה.",
      5: "טקסט משני בצבע שקט.",
    },
    questions: [
      {
        id: "sv_cb_tailwind_responsive_card_q1",
        kind: "mc",
        targetLine: 1,
        question: "מה עושה md:flex-row?",
        options: ["מוחק את הכרטיס", "משנה את הכיוון לשורה במסכי md ומעלה", "מגדיר צבע", "מפעיל JavaScript"],
        correctIndex: 1,
        explanation: "prefix כמו md: מפעיל utility רק מנקודת שבירה מסוימת ומעלה.",
      },
      {
        id: "sv_cb_tailwind_responsive_card_q2",
        kind: "mc",
        targetLine: 2,
        question: "למה יש גם w-full וגם md:w-40?",
        options: ["כדי להגדיר התנהגות שונה למובייל ולדסקטופ", "כי Tailwind דורש כפילות", "כי img לא עובד בלי שניהם", "כדי לשנות alt"],
        correctIndex: 0,
        explanation: "w-full חל כברירת מחדל; md:w-40 מחליף אותו במסכים רחבים.",
      },
    ],
  },
  {
    id: "sv_cb_tooling_npm_scripts",
    lessonId: "lesson_tooling_git",
    conceptName: "npm scripts",
    title: "npm scripts כמרכז פקודות",
    icon: "🛠️",
    difficulty: 2,
    importance: 3,
    importantNote: "scripts הופכים פעולות חוזרות לפקודות קבועות. זה מצמצם טעויות סביב build, test ו-format.",
    intro: "במקום לזכור פקודות ארוכות, שומרים חוזה ברור בתוך package.json.",
    code:
      "{\n" +
      "  \"scripts\": {\n" +
      "    \"dev\": \"vite --host 127.0.0.1\",\n" +
      "    \"test\": \"vitest run\",\n" +
      "    \"build\": \"vite build\"\n" +
      "  }\n" +
      "}",
    lineComments: {
      2: "scripts הוא מילון פקודות.",
      3: "dev מפעיל שרת פיתוח מקומי.",
      4: "test מריץ בדיקות בצורה קבועה.",
      5: "build מוודא שהפרויקט ניתן לאריזה לפרודקשן.",
    },
    questions: [
      {
        id: "sv_cb_tooling_npm_scripts_q1",
        kind: "mc",
        targetLine: 4,
        question: "מה מריצים כדי להפעיל את פקודת test?",
        options: ["npm run test", "node test", "vite test", "git test"],
        correctIndex: 0,
        explanation: "npm run <script-name> מריץ את הערך שנמצא תחת scripts.",
      },
      {
        id: "sv_cb_tooling_npm_scripts_q2",
        kind: "mc",
        targetLine: 5,
        question: "מה build בודק ברמת workflow?",
        options: ["רק את העיצוב", "שהפרויקט ניתן לבנייה לפרודקשן", "רק חיבור ל-DB", "רק commit"],
        correctIndex: 1,
        explanation: "build תופס שגיאות bundling/import/production לפני deploy.",
      },
    ],
  },
  {
    id: "sv_cb_express_route_validation",
    lessonId: "lesson_17",
    conceptName: "Express",
    title: "Express route עם validation קצר",
    icon: "🚏",
    difficulty: 2,
    importance: 4,
    importantNote: "Route טוב לא רק מחזיר תשובה. הוא בודק קלט, בוחר status code, ומחזיר JSON צפוי.",
    intro: "הבלוק מחבר request, validation, status code ו-response.",
    code:
      "app.post('/api/tasks', (req, res) => {\n" +
      "  const title = String(req.body.title || '').trim();\n" +
      "  if (!title) return res.status(400).json({ error: 'title-required' });\n" +
      "  const task = { id: title.toLowerCase(), title, done: false };\n" +
      "  return res.status(201).json(task);\n" +
      "});",
    lineComments: {
      1: "מגדירים endpoint ליצירת task.",
      2: "מנרמלים קלט כדי לא לעבוד עם undefined או רווחים.",
      3: "קלט לא חוקי מחזיר 400 עם error יציב.",
      4: "יוצרים אובייקט תשובה צפוי.",
      5: "201 אומר Created.",
    },
    questions: [
      {
        id: "sv_cb_express_route_validation_q1",
        kind: "mc",
        targetLine: 3,
        question: "למה מחזירים status 400?",
        options: ["כי השרת נפל", "כי הקלט מהלקוח לא תקין", "כי task נוצר", "כי אין אינטרנט"],
        correctIndex: 1,
        explanation: "400 מסמן בעיית request של הלקוח, כמו title חסר.",
      },
      {
        id: "sv_cb_express_route_validation_q2",
        kind: "mc",
        targetLine: 5,
        question: "מה המשמעות של 201?",
        options: ["נוצר משאב חדש", "אין הרשאה", "לא נמצא", "שגיאת שרת"],
        correctIndex: 0,
        explanation: "201 Created מתאים ליצירת רשומה חדשה.",
      },
    ],
  },
  {
    id: "sv_cb_mongoose_query_shape",
    lessonId: "lesson_20",
    conceptName: "Mongoose",
    title: "Mongoose: שליפה ממוקדת במקום הכל",
    icon: "🍃",
    difficulty: 2,
    importance: 3,
    importantNote: "שאילתה יעילה מתחילה בצמצום: filter, select, limit. לא שולפים את כל העולם כדי להציג רשימה.",
    intro: "הבלוק מציג תבנית שליפת משימות פתוחות עם שדות נדרשים בלבד.",
    code:
      "const tasks = await Task.find({ done: false })\n" +
      "  .select('title priority createdAt')\n" +
      "  .sort({ createdAt: -1 })\n" +
      "  .limit(20)\n" +
      "  .lean();",
    lineComments: {
      1: "מסננים רק משימות פתוחות.",
      2: "מבקשים רק שדות שה-UI צריך.",
      3: "מסדרים חדשות קודם.",
      4: "מגבילים את כמות התוצאות.",
      5: "lean מחזיר אובייקטים פשוטים כשלא צריכים document methods.",
    },
    questions: [
      {
        id: "sv_cb_mongoose_query_shape_q1",
        kind: "mc",
        targetLine: 2,
        question: "למה משתמשים ב-select?",
        options: ["כדי למחוק רשומות", "כדי להחזיר רק שדות נחוצים", "כדי לפתוח transaction", "כדי לשנות schema"],
        correctIndex: 1,
        explanation: "select מצמצם payload ושומר על קריאות.",
      },
      {
        id: "sv_cb_mongoose_query_shape_q2",
        kind: "mc",
        targetLine: 4,
        question: "מה limit(20) מונע?",
        options: ["שליפה גדולה מדי", "ולידציה", "שגיאת CORS", "hash לסיסמה"],
        correctIndex: 0,
        explanation: "limit מונע החזרת כמות גדולה של רשומות למסך אחד.",
      },
    ],
  },
  {
    id: "sv_cb_sql_prisma_select",
    lessonId: "lesson_sql_orm",
    conceptName: "Prisma",
    title: "Prisma: CRUD עם select ממוקד",
    icon: "🗄️",
    difficulty: 2,
    importance: 4,
    importantNote: "ORM לא פוטר מחשיבה על query shape. select מדויק מגן על ביצועים ועל חשיפת שדות מיותרים.",
    intro: "הבלוק מראה יצירת רשומה והחזרת השדות שה-UI צריך.",
    code:
      "const task = await prisma.task.create({\n" +
      "  data: { title, ownerId: user.id },\n" +
      "  select: { id: true, title: true, createdAt: true }\n" +
      "});\n" +
      "return Response.json(task, { status: 201 });",
    lineComments: {
      1: "create מוסיף רשומה לטבלה דרך Prisma Client.",
      2: "data מכיל את השדות שנכתבים.",
      3: "select מחזיר רק id/title/createdAt.",
      5: "מחזירים JSON עם status של יצירה.",
    },
    questions: [
      {
        id: "sv_cb_sql_prisma_select_q1",
        kind: "mc",
        targetLine: 3,
        question: "מה select עושה כאן?",
        options: ["מוחק שדות מה-DB", "מגדיר אילו שדות יחזרו בתשובה", "פותח migration", "מחליף transaction"],
        correctIndex: 1,
        explanation: "select משפיע על צורת התוצאה שמוחזרת מה-query.",
      },
      {
        id: "sv_cb_sql_prisma_select_q2",
        kind: "mc",
        targetLine: 2,
        question: "למה ownerId נכתב מתוך user.id?",
        options: ["כדי לקשור רשומה למשתמש המחובר", "כדי להסתיר title", "כדי להפעיל CSS", "כדי ליצור route"],
        correctIndex: 0,
        explanation: "ownerId יוצר קשר בין הרשומה לבין בעליה.",
      },
    ],
  },
  {
    id: "sv_cb_auth_guard",
    lessonId: "lesson_auth_security",
    conceptName: "middleware guard",
    title: "Middleware guard לפני פעולה רגישה",
    icon: "🛡️",
    difficulty: 3,
    importance: 4,
    importantNote: "Guard הוא שער. הוא חייב לרוץ לפני פעולה רגישה ולא אחרי שכבר שיניתם מידע.",
    intro: "הבלוק מציג guard שמחזיר 401 אם אין session תקפה.",
    code:
      "function requireUser(req, res, next) {\n" +
      "  const user = req.session?.user;\n" +
      "  if (!user) return res.status(401).json({ error: 'login-required' });\n" +
      "  req.user = user;\n" +
      "  return next();\n" +
      "}\n" +
      "app.post('/api/tasks', requireUser, createTask);",
    lineComments: {
      1: "middleware מקבל req/res/next.",
      2: "קוראים את המשתמש מתוך session.",
      3: "בלי משתמש מחזירים 401 ולא ממשיכים.",
      4: "מצמידים את המשתמש ל-request להמשך הזרימה.",
      5: "next ממשיך לפונקציה הבאה.",
      7: "ה-guard יושב לפני createTask.",
    },
    questions: [
      {
        id: "sv_cb_auth_guard_q1",
        kind: "mc",
        targetLine: 3,
        question: "למה מחזירים 401?",
        options: ["כי המשתמש לא מחובר", "כי הטופס גדול מדי", "כי השרת יצר רשומה", "כי CSS לא נטען"],
        correctIndex: 0,
        explanation: "401 מתאים למצב שבו אין authentication תקף.",
      },
      {
        id: "sv_cb_auth_guard_q2",
        kind: "mc",
        targetLine: 7,
        question: "למה requireUser מופיע לפני createTask?",
        options: ["כדי לעצב את הכפתור", "כדי לעצור משתמש לא מחובר לפני פעולה", "כדי להאיץ את SQL", "כדי לבטל JSON"],
        correctIndex: 1,
        explanation: "סדר middleware קובע מי רץ קודם. guard חייב לרוץ לפני הפעולה המוגנת.",
      },
    ],
  },
  {
    id: "sv_cb_react_component_props",
    lessonId: "lesson_21",
    conceptName: "Component",
    title: "Component שמקבל props ולא מנחש data",
    icon: "⚛️",
    difficulty: 1,
    importance: 4,
    importantNote: "קומפוננטה טובה מקבלת props ברורים ומציירת UI. היא לא אמורה לנחש מאיפה הנתונים באו.",
    intro: "הבלוק מפריד בין data לבין הצגה.",
    code:
      "function TaskRow({ task, onToggle }) {\n" +
      "  return (\n" +
      "    <button onClick={() => onToggle(task.id)}>\n" +
      "      {task.done ? '✓' : '○'} {task.title}\n" +
      "    </button>\n" +
      "  );\n" +
      "}",
    lineComments: {
      1: "הקומפוננטה מקבלת task ו-callback דרך props.",
      3: "בלחיצה קוראים לפונקציה מההורה עם id.",
      4: "התצוגה נגזרת מה-state של task.",
    },
    questions: [
      {
        id: "sv_cb_react_component_props_q1",
        kind: "mc",
        targetLine: 1,
        question: "מהם task ו-onToggle?",
        options: ["state פנימי", "props שההורה מעביר", "CSS classes", "שמות routes"],
        correctIndex: 1,
        explanation: "החתימה מפרקת props שהגיעו מההורה.",
      },
      {
        id: "sv_cb_react_component_props_q2",
        kind: "mc",
        targetLine: 3,
        question: "למה מעבירים task.id ל-onToggle?",
        options: ["כדי שההורה ידע איזו משימה לשנות", "כדי לשנות צבע", "כדי למחוק props", "כדי ליצור component"],
        correctIndex: 0,
        explanation: "הילד לא מנהל את הרשימה. הוא מדווח להורה איזו רשומה נבחרה.",
      },
    ],
  },
  {
    id: "sv_cb_typescript_discriminated_union",
    lessonId: "lesson_26",
    conceptName: "TypeScript",
    title: "TypeScript: union שמונע מצב לא ברור",
    icon: "🔷",
    difficulty: 3,
    importance: 4,
    importantNote: "טיפוס טוב מונע מצב שאי אפשר להסביר. union מאלץ את הקוד לכסות כל סטטוס.",
    intro: "הבלוק מראה state של טעינה בלי booleanים כפולים וסותרים.",
    code:
      "type LoadState =\n" +
      "  | { status: 'idle' }\n" +
      "  | { status: 'loading' }\n" +
      "  | { status: 'success'; data: Task[] }\n" +
      "  | { status: 'error'; message: string };\n" +
      "\n" +
      "function canRenderList(state: LoadState) {\n" +
      "  return state.status === 'success' && state.data.length > 0;\n" +
      "}",
    lineComments: {
      1: "מגדירים שם לטיפוס מצב.",
      2: "idle בלי data.",
      3: "loading בלי data.",
      4: "success חייב data.",
      5: "error חייב message.",
      8: "TypeScript יודע ש-data קיים רק אחרי בדיקת success.",
    },
    questions: [
      {
        id: "sv_cb_typescript_discriminated_union_q1",
        kind: "mc",
        targetLine: 4,
        question: "מתי data קיים לפי הטיפוס?",
        options: ["בכל מצב", "רק כאשר status הוא success", "רק ב-error", "רק ב-loading"],
        correctIndex: 1,
        explanation: "ה-union מגדיר ש-data נמצא רק בענף success.",
      },
      {
        id: "sv_cb_typescript_discriminated_union_q2",
        kind: "mc",
        targetLine: 8,
        question: "למה מותר לגשת ל-state.data אחרי הבדיקה?",
        options: ["כי TypeScript עשה narrowing לפי status", "כי data גלובלי", "כי array תמיד קיים", "כי return יוצר data"],
        correctIndex: 0,
        explanation: "בדיקת status מצמצמת את הטיפוס לענף success.",
      },
    ],
  },
  {
    id: "sv_cb_design_cva_variants",
    lessonId: "lesson_design_systems",
    conceptName: "component variants",
    title: "Variants במקום if מפוזרים בעיצוב",
    icon: "🎛️",
    difficulty: 3,
    importance: 3,
    importantNote: "Variants מרכזים את שפת העיצוב. כך לא מעתיקים className שונה בכל מסך.",
    intro: "הבלוק מראה אובייקט החלטות פשוט שמחליף שרשרת תנאים בעיצוב.",
    code:
      "const buttonVariants = {\n" +
      "  primary: 'bg-blue-600 text-white',\n" +
      "  danger: 'bg-red-600 text-white',\n" +
      "  ghost: 'bg-transparent text-slate-900'\n" +
      "};\n" +
      "\n" +
      "function buttonClass(variant) {\n" +
      "  return buttonVariants[variant] || buttonVariants.primary;\n" +
      "}",
    lineComments: {
      1: "מילון variants מרכז את אפשרויות העיצוב.",
      2: "primary הוא מצב ברירת המחדל.",
      3: "danger לפעולה מסוכנת.",
      4: "ghost לכפתור שקט.",
      8: "fallback מונע class ריק אם הגיע variant לא מוכר.",
    },
    questions: [
      {
        id: "sv_cb_design_cva_variants_q1",
        kind: "mc",
        targetLine: 1,
        question: "מה היתרון במילון variants?",
        options: ["הוא מוחק CSS", "הוא מרכז החלטות עיצוב במקום אחד", "הוא מחליף HTML", "הוא יוצר API route"],
        correctIndex: 1,
        explanation: "מילון variants הופך אפשרויות עיצוב לחוזה קריא ועקבי.",
      },
      {
        id: "sv_cb_design_cva_variants_q2",
        kind: "mc",
        targetLine: 8,
        question: "למה יש fallback ל-primary?",
        options: ["כדי למנוע תוצאה ריקה ל-variant לא מוכר", "כדי לשנות מסד נתונים", "כדי להפעיל OAuth", "כדי לטעון תמונה"],
        correctIndex: 0,
        explanation: "fallback מגן על UI כאשר הקלט לא נמצא במילון.",
      },
    ],
  },
  {
    id: "sv_cb_next_route_handler",
    lessonId: "lesson_nextjs",
    conceptName: "route handler",
    title: "Next.js route handler עם response יציב",
    icon: "▲",
    difficulty: 3,
    importance: 4,
    importantNote: "Route handler הוא הגבול בין UI לשרת ב-App Router. שם עושים auth, validation ו-DB access.",
    intro: "הבלוק מדגים GET שמחזיר JSON עם status ברור.",
    code:
      "export async function GET() {\n" +
      "  const tasks = await prisma.task.findMany({\n" +
      "    select: { id: true, title: true, done: true }\n" +
      "  });\n" +
      "  return Response.json({ tasks }, { status: 200 });\n" +
      "}",
    lineComments: {
      1: "ב-App Router מייצאים פונקציה בשם HTTP method.",
      2: "שרת יכול לקרוא ל-DB בלי לחשוף סוד ללקוח.",
      3: "select מצמצם את השדות החוזרים.",
      5: "Response.json מחזיר גוף JSON ו-status.",
    },
    questions: [
      {
        id: "sv_cb_next_route_handler_q1",
        kind: "mc",
        targetLine: 1,
        question: "למה הפונקציה נקראת GET?",
        options: ["כי זה שם שרירותי", "כי היא מטפלת בבקשת HTTP מסוג GET", "כי היא קומפוננטת React", "כי היא migration"],
        correctIndex: 1,
        explanation: "ב-route handler השם GET/POST/PUT קובע איזה HTTP method מטופל.",
      },
      {
        id: "sv_cb_next_route_handler_q2",
        kind: "mc",
        targetLine: 2,
        question: "למה קריאת DB מתאימה כאן יותר מאשר בתוך client component?",
        options: ["כי route handler רץ בצד שרת", "כי client component לא מציג טקסט", "כי CSS דורש Prisma", "כי GET מוחק נתונים"],
        correctIndex: 0,
        explanation: "Route handler רץ בשרת ולכן יכול להשתמש בסודות ו-DB client.",
      },
    ],
  },
  {
    id: "sv_cb_devops_healthcheck",
    lessonId: "lesson_devops_deploy",
    conceptName: "health check",
    title: "Health check קצר ל-deploy",
    icon: "🟢",
    difficulty: 2,
    importance: 4,
    importantNote: "בלי health check לא יודעים אם deploy באמת משרת בקשות או רק הסתיים בלי crash.",
    intro: "הבלוק מגדיר endpoint קטן שמחזיר מידע בסיסי לבדיקת smoke.",
    code:
      "app.get('/health', (req, res) => {\n" +
      "  return res.status(200).json({\n" +
      "    ok: true,\n" +
      "    service: 'api',\n" +
      "    version: process.env.APP_VERSION || 'unknown'\n" +
      "  });\n" +
      "});",
    lineComments: {
      1: "endpoint קבוע לבדיקות ניטור ו-smoke.",
      2: "200 אומר שהשירות חי.",
      3: "ok מאפשר בדיקה פשוטה בסקריפט.",
      5: "גרסה מגיעה מהסביבה; אם חסרה מציגים unknown ולא ממציאים.",
    },
    questions: [
      {
        id: "sv_cb_devops_healthcheck_q1",
        kind: "mc",
        targetLine: 1,
        question: "למה endpoint /health שימושי?",
        options: ["כדי לוודא שהשירות מגיב אחרי deploy", "כדי להחליף DB", "כדי ליצור קומפוננטה", "כדי לעצב footer"],
        correctIndex: 0,
        explanation: "בדיקת health מאפשרת smoke test אוטומטי לאחר פריסה.",
      },
      {
        id: "sv_cb_devops_healthcheck_q2",
        kind: "mc",
        targetLine: 5,
        question: "למה לא ממציאים גרסה אם APP_VERSION חסר?",
        options: ["כי נתוני תפעול צריכים להיות אמיתיים או unknown", "כי JSON לא תומך בגרסה", "כי Express אוסר זאת", "כי version הוא CSS"],
        correctIndex: 0,
        explanation: "בפרודקשן לא מפברקים metadata. unknown עדיף על מידע שקרי.",
      },
    ],
  },
  {
    id: "sv_cb_nest_controller_service",
    lessonId: "lesson_nestjs",
    conceptName: "controller",
    title: "Nest.js controller שקורא ל-service",
    icon: "🏗️",
    difficulty: 3,
    importance: 4,
    importantNote: "Controller לא אמור להכיל את כל הלוגיקה. הוא מקבל HTTP ומעביר עבודה ל-service.",
    intro: "הבלוק מראה הפרדה בין שכבת HTTP לשכבת business logic.",
    code:
      "@Controller('tasks')\n" +
      "export class TasksController {\n" +
      "  constructor(private readonly tasksService: TasksService) {}\n" +
      "\n" +
      "  @Get()\n" +
      "  findAll() {\n" +
      "    return this.tasksService.findAll();\n" +
      "  }\n" +
      "}",
    lineComments: {
      1: "ה-controller מאזין לנתיב tasks.",
      3: "DI מכניס service דרך constructor.",
      5: "decorator מחבר את המתודה ל-GET.",
      7: "ה-controller מפנה ל-service במקום לכתוב לוגיקה כאן.",
    },
    questions: [
      {
        id: "sv_cb_nest_controller_service_q1",
        kind: "mc",
        targetLine: 3,
        question: "מה קורה בשורה 3?",
        options: ["Dependency Injection של TasksService", "יצירת HTML", "מחיקת route", "פתיחת Docker"],
        correctIndex: 0,
        explanation: "Nest מספק את ה-service דרך constructor לפי מערכת ה-DI.",
      },
      {
        id: "sv_cb_nest_controller_service_q2",
        kind: "mc",
        targetLine: 7,
        question: "למה עדיף לקרוא ל-service?",
        options: ["כדי להפריד HTTP מלוגיקת העסק", "כדי לבטל בדיקות", "כדי להפוך הכל ל-global", "כדי להימנע מטיפוסים"],
        correctIndex: 0,
        explanation: "service מרכז לוגיקה שניתנת לבדיקה ושימוש חוזר.",
      },
    ],
  },
  {
    id: "sv_cb_ai_prompt_contract",
    lessonId: "ai_development",
    conceptName: "Prompt Engineering",
    title: "Prompt כחוזה עבודה",
    icon: "🤖",
    difficulty: 2,
    importance: 3,
    importantNote: "Prompt טוב הוא מפרט קטן: מטרה, קלט, מגבלות, פורמט פלט ובדיקת איכות.",
    intro: "הבלוק מראה prompt שמייצר תשובה שאפשר לבדוק ולא רק טקסט חופשי.",
    code:
      "const prompt = {\n" +
      "  task: 'Review this React component',\n" +
      "  constraints: ['no new libraries', 'explain risks first'],\n" +
      "  output: { findings: 'array', summary: 'string' },\n" +
      "  qualityBar: 'Every finding must reference a line or behavior'\n" +
      "};",
    lineComments: {
      1: "prompt מובנה כאובייקט במקום טקסט עמום.",
      2: "task מגדיר את העבודה.",
      3: "constraints מונעים תשובה שלא מתאימה לפרויקט.",
      4: "output מגדיר צורת תשובה.",
      5: "qualityBar מגדיר איך מודדים תשובה טובה.",
    },
    questions: [
      {
        id: "sv_cb_ai_prompt_contract_q1",
        kind: "mc",
        targetLine: 3,
        question: "למה constraints חשובים?",
        options: ["כדי להגביל את התשובה למה שמותר בפרויקט", "כדי למחוק task", "כדי להפעיל React", "כדי ליצור DB"],
        correctIndex: 0,
        explanation: "constraints הופכים את ה-AI לעוזר בתוך גבולות עבודה ברורים.",
      },
      {
        id: "sv_cb_ai_prompt_contract_q2",
        kind: "mc",
        targetLine: 4,
        question: "מה נותן output מובנה?",
        options: ["תשובה שאפשר לקרוא, לבדוק ולעבד", "יותר צבעים", "פחות אבטחה", "מחיקת שגיאות"],
        correctIndex: 0,
        explanation: "פורמט פלט מוגדר מקל על בדיקה, UI והמשך עיבוד.",
      },
    ],
  },
  {
    id: "sv_cb_ai_engineering_rag_pipeline",
    lessonId: "lesson_ai_engineering",
    conceptName: "RAG",
    title: "RAG קטן: retrieve לפני generate",
    icon: "🧠",
    difficulty: 3,
    importance: 4,
    importantNote: "RAG לא מתחיל במודל. הוא מתחיל בשליפת הקטעים הנכונים ורק אחר כך generation.",
    intro: "הבלוק מציג pipeline בסיסי שמחזיר תשובה עם מקורות.",
    code:
      "async function answerWithRag(question) {\n" +
      "  const queryEmbedding = await embed(question);\n" +
      "  const chunks = await vectorStore.search(queryEmbedding, { topK: 4 });\n" +
      "  const context = chunks.map(chunk => chunk.text).join('\\n---\\n');\n" +
      "  return generateAnswer({ question, context, citeSources: true });\n" +
      "}",
    lineComments: {
      1: "פונקציה מקבלת שאלה.",
      2: "ממירים את השאלה ל-embedding.",
      3: "שולפים קטעים דומים מה-vector store.",
      4: "בונים context קצר וברור.",
      5: "רק עכשיו מבקשים מהמודל לענות עם מקורות.",
    },
    questions: [
      {
        id: "sv_cb_ai_engineering_rag_pipeline_q1",
        kind: "mc",
        targetLine: 3,
        question: "מה מטרת search ב-vector store?",
        options: ["למצוא קטעי ידע רלוונטיים", "ליצור CSS", "למחוק embedding", "לפתוח session"],
        correctIndex: 0,
        explanation: "retrieval מביא ידע רלוונטי לפני שהמודל מנסח תשובה.",
      },
      {
        id: "sv_cb_ai_engineering_rag_pipeline_q2",
        kind: "mc",
        targetLine: 5,
        question: "למה מבקשים citeSources?",
        options: ["כדי לחבר תשובה למקורות ולא רק לניסוח של המודל", "כדי להקטין button", "כדי לשנות route", "כדי לבטל topK"],
        correctIndex: 0,
        explanation: "ציון מקורות עוזר לבדוק אם התשובה נשענת על context אמיתי.",
      },
    ],
  },
];
