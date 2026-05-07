// data/homework_exam_mode.js
// Homework Exam Mode - SVCollege practical exam preparation from local homework PDFs.

var HOMEWORK_EXAM_TOPIC_ID = "topic_homework_exam_mode";
var HOMEWORK_TS_ROLE = "typescript_followup";
var HOMEWORK_JS_ROLE = "javascript_followup";

var HOMEWORK_EXAM_SOURCES = [
  {
    id: "hw_ts_1",
    label: "שיעורי בית TS 1",
    path: "/Users/tal/Desktop/test2/21plus/שיעורי בית /שיעורי בית TS  1.docx.pdf",
    focus: "Book, Genre enum, addBook, searchByGenre, updateAvailability, User union, type narrowing",
  },
  {
    id: "hw_react_ts_budget",
    label: "React + TS Budget",
    path: "/Users/tal/Desktop/test2/21plus/שיעורי בית /שיעורי בת React + TS 2.docx.pdf",
    focus: "Transaction type, add/edit/delete, totals, savings, category breakdown",
  },
  {
    id: "hw_react_students",
    label: "שיעורי בית 22 React basics",
    path: "/Users/tal/Desktop/test2/21plus/שיעורי בית /שיעורי בית 22.docx.pdf",
    focus: "Vite app, students.js, Header, Dashboard, Footer, AddStudent",
  },
  {
    id: "hw_smart_house",
    label: "שיעורי בית 23 Smart House",
    path: "/Users/tal/Desktop/test2/21plus/שיעורי בית /שיעורי בית 23.docx.pdf",
    focus: "React Router Smart House: add room, room details, add devices, validations, nested room flow",
  },
  {
    id: "hw_products_api",
    label: "שיעורי בית 24 Products API",
    path: "/Users/tal/Desktop/test2/21plus/שיעורי בית /שיעורי בית 24.docx.pdf",
    focus: "dummyjson.com/products, useEffect, category select, useRef focus",
  },
  {
    id: "hw_movie_project_25",
    label: "פרוייקט 25 Best Movie",
    path: "/Users/tal/Desktop/test2/21plus/שיעורי בית /פרוייקט 25.docx.pdf",
    focus: "Movie rating project: home/add/delete/search, top 3 by average rating, rating 1-5, Tailwind, deterministic featured movies",
  },
  {
    id: "hw_node_mongo_tasks",
    label: "Node + Mongo API",
    path: "/Users/tal/Desktop/test2/21plus/שיעורי בית /עותק של שיעורי בית תרגול נוסף.pdf",
    focus: "Express, Mongoose, Task schema, GET /tasks, POST /tasks",
  },
  {
    id: "hw_employee_schema",
    label: "שיעורי בית 20 Employee schema",
    path: "/Users/tal/Desktop/test2/21plus/שיעורי בית / שיעורי בית 20.docx.pdf",
    focus: "Employee schema, add employee, delete older than age, rename department",
  },
  {
    id: "hw_next_dashboard",
    label: "Next.js Dashboard",
    path: "/Users/tal/Desktop/test2/21plus/שיעורי בית /עותק של שיעורי בית NEXT.JS.pdf",
    focus: "App Router, dashboard/projects/tasks/tasks/create/settings, Tailwind, shadcn/ui, deployment readiness",
  },
  {
    id: "hw_next_lesson",
    label: "שיעור NEXT.JS-2",
    path: "/Users/tal/Desktop/test2/21plus/שיעורי בית /שיעור NEXT.JS-2.pdf",
    focus: "page, layout, nested routing, server component, client component",
  },
  {
    id: "hw_js_screenshot",
    label: "Screenshot 2026-05-05 JS drill",
    path: "/var/folders/kv/zxd1p92x0gv9td317bdzk2xw0000gn/T/TemporaryItems/NSIRD_screencaptureui_zZbmsH/Screenshot 2026-05-05 at 8.46.31.png",
    focus: "Group numbers by digit length and sum each group; throw when input contains a non-number",
  },
  {
    id: "exam_materials_allowed",
    label: "דף חומרים שניתן להביא למבחן",
    path: "/Users/tal/Downloads/חומרים למבחן/דף - חומרים שניתן להביא למבחן.docx",
    focus: "Open material policy, svExam folder, allowed prework and forbidden prework",
  },
  {
    id: "exam_moed_a_helpme",
    label: "מבחן מועד א פולסטאק HelpMe",
    path: "/Users/tal/Downloads/חומרים למבחן/מבחנים לדוגמא חלק 1/עותק של מבחן מועד א פולסטאק (1).pdf",
    focus: "HelpMe React app, emergency service selector, cancel flow, sequence classifier JS question",
  },
  {
    id: "exam_willing_2022",
    label: "מבחן פולסטאק מועד ב 2022 Willing",
    path: "/Users/tal/Downloads/חומרים למבחן/מבחנים לדוגמא חלק 1/עותק של מבחן פולסטאק מועד ב 2022.pdf",
    focus: "Volunteer React routes, add/find/all flow, even/odd unique JS question, courses Mongo API",
  },
  {
    id: "exam_parking_2023",
    label: "מבחן חדש 2023 SV Parking",
    path: "/Users/tal/Downloads/חומרים למבחן/מבחנים לדוגמא חלק 1/עותק של מבחן חדש 2023.pdf",
    focus: "Parking React app, signup/signin, active parking/history, contiguous sum JS, teachers API",
  },
  {
    id: "exam_travel_moed_g",
    label: "מבחן פולסטאק מועד ג Travel-SV",
    path: "/Users/tal/Downloads/חומרים למבחן/מבחנים לדוגמא חלק 1/עותק של מבחן פולסטאק מועד ג.pdf",
    focus: "Travel React app, shared add/update form, ordered subsequence JS, Node file package",
  },
  {
    id: "exam_currency_converter",
    label: "מבחן מחשבון המרה",
    path: "/Users/tal/Downloads/חומרים למבחן/מבחנים לדוגמא חלק 1/עותק של מבחן מחשבון המרה.docx",
    focus: "Currency converter React routes, class model, update rates, Fibonacci position JS",
  },
  {
    id: "exam_flight_control",
    label: "מבחן טיסות",
    path: "/Users/tal/Downloads/חומרים למבחן/מבחנים לדוגמא חלק 1/עותק של מבחן טיסות.docx",
    focus: "Flight control React app, nested routes, add/delete/sort flights, matrix frequency JS, students API",
  },
  {
    id: "exam_logistics_warehouse",
    label: "מבחן מחסן לוגיסטי",
    path: "/Users/tal/Downloads/חומרים למבחן/מבחנים לדוגמא חלק 1/עותק של מבחן מחסן לוגיסטי.docx",
    focus: "Warehouse React routes, employee/product classes, forklift validation, binary palindrome JS",
  },
  {
    id: "exam_bank_frontend",
    label: "מבחן מועד ב פולסטאק Bank",
    path: "/Users/tal/Downloads/חומרים למבחן/מבחנים לדוגמא חלק 1/עותק של מבחן מועד ב פולסטאק.docx",
    focus: "Bank React app, admin/customer flows, digit sorting JS, Express file append task",
  },
  {
    id: "exam_training_football",
    label: "מבחן אימון Football Club Svcollege",
    path: "/Users/tal/Downloads/חומרים למבחן/מבחנים לדוגמא חלק 1/עותק של מבחן אימון .pdf",
    focus: "Scanned PDF: football club React routes, login/register/team/add/edit player, digit-length sum JS, games Express API",
  },
  {
    id: "exam_training_football_old_scan",
    label: "מבחן אימון ישן Football Club",
    path: "/Users/tal/Downloads/חומרים למבחן/מבחן אימון ישן .pdf",
    focus: "Scanned legacy PDF. Verified duplicate of Football Club Svcollege training exam: 7 pages, identical SHA-256 435e0cfb216a46c248746f8da84c91c2ceed8c040dc22b0dbfd30e938992903b.",
  },
  {
    id: "solution_guide_4_exams",
    label: "חוברת פתרונות 4 מבחני SVCollege",
    path: "/Users/tal/Downloads/svcollege_exams_solution_guide2.html",
    focus: "Solution guide audit + drill extraction: 4 solved exams, 13 routes, 24 stages, 34 exam code blocks, setup/snippets/JS solutions/common mistakes. Extracted-only policy; no new content is inferred.",
  },
  {
    id: "lesson_20_slides",
    label: "Lesson 20 slides",
    path: "/Users/tal/Downloads/חומרים למבחן/מצגות שיעורים/Lesson 20.pptx.pdf",
    focus: "Database basics; manifest status partial-svcollege-gap linked to lesson20 and course blueprints",
  },
  {
    id: "lesson_22_slides",
    label: "Lesson 22 slides",
    path: "/Users/tal/Downloads/חומרים למבחן/מצגות שיעורים/Lesson 22.pptx.pdf",
    focus: "React frontend; manifest imported to lesson22, trace and bug questions",
  },
  {
    id: "lesson_23_slides",
    label: "LESSON 23 slides",
    path: "/Users/tal/Downloads/חומרים למבחן/מצגות שיעורים/LESSON 23.pptx.pdf",
    focus: "React Router/frontend; manifest imported to lesson23 and question bank",
  },
  {
    id: "lesson_24_slides",
    label: "Lesson 24 slides",
    path: "/Users/tal/Downloads/חומרים למבחן/מצגות שיעורים/lesson24.pptx.pdf",
    focus: "React hooks/API; manifest imported to lesson24, trace and bug questions",
  },
  {
    id: "lesson_25_slides",
    label: "Lesson 25 slides",
    path: "/Users/tal/Downloads/חומרים למבחן/מצגות שיעורים/Lesson 25.pptx.pdf",
    focus: "Tailwind and responsive layout; manifest imported to lesson25, HTML/CSS foundations and trace questions",
  },
  {
    id: "lesson_26_slides",
    label: "Lesson 26 slides",
    path: "/Users/tal/Downloads/חומרים למבחן/מצגות שיעורים/Lesson 26.pptx.pdf",
    focus: "TypeScript + React; manifest imported to lesson26, trace and bug questions",
  },
  {
    id: "lesson_26_part2_slides",
    label: "Lesson 26 part 2 slides",
    path: "/Users/tal/Downloads/חומרים למבחן/מצגות שיעורים/Lesson 26 part 2.pptx.pdf",
    focus: "TypeScript + React continued; manifest imported to lesson26 and trace questions",
  },
  {
    id: "exam_video_1151918075",
    label: "video1151918075.mp4",
    path: "/Users/tal/Downloads/חומרים למבחן/video1151918075.mp4",
    focus: "Video asset is accounted for as unknown/unavailable until transcript is provided. No exam content is inferred from it.",
  },
];

var HOMEWORK_MATERIAL_COVERAGE = {
  id: "svcollege_exam_material_coverage_2026_05_05",
  updated: "2026-05-05",
  totalFiles: 40,
  accountedFiles: 40,
  duplicateFiles: 8,
  unknownUnavailableFiles: 1,
  examCriticalReadyPercent: 100,
  policy: "כל קובץ מקומי מסומן כ-covered, duplicate, imported, partial, או unknown/unavailable. אין השלמת תוכן שלא מופיע במקור.",
  items: [
    {
      id: "coverage_hw23_smart_house",
      sourceId: "hw_smart_house",
      status: "covered",
      priority: "P0",
      label: "שיעורי בית 23 Smart House",
      evidence: "נוספה תבנית React Router Smart House עם add room, room details, add devices ו-validations.",
    },
    {
      id: "coverage_project25_movies",
      sourceId: "hw_movie_project_25",
      status: "covered",
      priority: "P0",
      label: "פרוייקט 25 Best Movie",
      evidence: "נוספה תבנית Movie Rating עם home/add/delete/search, top 3 average rating ובחירת 5 סרטים דטרמיניסטית.",
    },
    {
      id: "coverage_old_training_exam",
      sourceId: "exam_training_football_old_scan",
      status: "duplicate",
      priority: "P0",
      label: "מבחן אימון ישן",
      evidence: "נבדק מול עותק של מבחן אימון: 7 עמודים, אותו גודל קובץ, אותו SHA-256, ו-cmp_exit=0. אין דרישות חדשות מעבר לתבנית Football Club שכבר מכוסה.",
    },
    {
      id: "coverage_solution_guide_4_exams",
      sourceId: "solution_guide_4_exams",
      status: "covered-reference",
      priority: "P0",
      label: "חוברת פתרונות 4 מבחני SVCollege",
      evidence: "נבדקה ב-exam:solution-guide:coverage וגם פורקה ב-exam:solution-guide:drills: 4 מבחנים, 13 routes, 24 stages, 34 exam code blocks ו-4 פתרונות JS. משמשת כמקור פתרונות; תוכן חדש דורש פירוק ידני.",
    },
    {
      id: "coverage_lesson20_slides",
      sourceId: "lesson_20_slides",
      status: "partial-imported",
      priority: "P1",
      label: "Lesson 20 slides",
      evidence: "מופיע ב-lessons/manifest.json כ-partial-svcollege-gap ומקושר ל-data/lesson20.js ול-course_blueprints.",
    },
    {
      id: "coverage_lesson22_slides",
      sourceId: "lesson_22_slides",
      status: "imported",
      priority: "P1",
      label: "Lesson 22 slides",
      evidence: "מיובא למערכת השיעורים וקשור ל-React frontend, trace ו-bug questions.",
    },
    {
      id: "coverage_lesson23_slides",
      sourceId: "lesson_23_slides",
      status: "imported",
      priority: "P1",
      label: "LESSON 23 slides",
      evidence: "מיובא למערכת השיעורים ומחזק React Router/props/state סביב Smart House.",
    },
    {
      id: "coverage_lesson24_slides",
      sourceId: "lesson_24_slides",
      status: "imported",
      priority: "P1",
      label: "Lesson 24 slides",
      evidence: "מיובא למערכת השיעורים ומחזק hooks, useEffect, API ו-useRef.",
    },
    {
      id: "coverage_lesson25_slides",
      sourceId: "lesson_25_slides",
      status: "imported",
      priority: "P1",
      label: "Lesson 25 slides",
      evidence: "מיובא למערכת השיעורים ומחזק Tailwind/responsive לפרויקט Movie Rating.",
    },
    {
      id: "coverage_lesson26_slides",
      sourceId: "lesson_26_slides",
      status: "imported",
      priority: "P1",
      label: "Lesson 26 slides",
      evidence: "מיובא למערכת השיעורים ומחזק TypeScript + React לשאלת 10 נק׳.",
    },
    {
      id: "coverage_lesson26_part2_slides",
      sourceId: "lesson_26_part2_slides",
      status: "imported",
      priority: "P1",
      label: "Lesson 26 part 2 slides",
      evidence: "מיובא למערכת השיעורים כהמשך TypeScript + React.",
    },
    {
      id: "coverage_video_1151918075",
      sourceId: "exam_video_1151918075",
      status: "unknown/unavailable",
      priority: "P2",
      label: "video1151918075.mp4",
      evidence: "אין תמלול זמין; לא מוסיפים ממנו שאלות או דרישות עד שיהיה תמלול.",
    },
  ],
};

var HOMEWORK_CURRENT_EXAM_PROFILE = {
  id: "svcollege_current_70_20_10",
  label: "מבנה פעיל למבחן הקרוב",
  durationHours: 4,
  scoringBreakdown: { project: 70, javascript: 20, typescript: 10 },
  interpretation: "הפרויקט הוא יחידת הבנייה המרכזית. הוא יכול לכלול React/Next/Node/Mongo לפי ההנחיה, אבל הניקוד אינו מפוצל יותר ל-React ו-Express בנפרד.",
};

var HOMEWORK_PREVIOUS_EXAM_PROFILE = {
  id: "svcollege_previous_50_20_20_10",
  label: "מבנה עבר שהוצהר",
  scoringBreakdown: { react: 50, express: 20, javascript: 20, typescript: 10 },
  interpretation: "משמש להשוואת דפוסים בלבד. אין לפתור את המבחן הקרוב כאילו Express הוא סעיף ניקוד עצמאי.",
};

var HOMEWORK_EXAM_ALLOWED_MATERIALS = {
  sourceId: "exam_materials_allowed",
  openMaterials: [
    "חומר פתוח ללא אינטרנט או בינה מלאכותית.",
    "מותר להביא שיעורי בית, מצגות, דפים שהורדו, חזרות והקלטות שיעור עם אוזניות.",
  ],
  allowedPrework: [
    "ליצור תיקיית svExam עם front-end ו-back-end כ-repo נפרדים.",
    "להקים פרויקט React נקי, Tailwind ו-shadcn אופציונלי.",
    "להקים פרויקט Express, סביבת MongoDB, env variables וחיבור בסיסי בין front-end ל-back-end.",
    "להכין endpoint בסיסי אחד מסוג GET בלבד.",
    "להעלות ל-GitHub ולהכין פריסה לפרונט ולבק.",
  ],
  forbiddenPrework: [
    "לא ליצור endpoints מעבר ל-GET בסיסי.",
    "לא ליצור front-end מעבר לכותרת בסיסית.",
    "לא ליצור routing מראש.",
    "לא לבנות מראש לוגיקה, מסכים או CRUD של המבחן.",
  ],
};

var HOMEWORK_EXAM_MEDIA_TASKS = (function () {
  var root = "/Users/tal/Desktop/חומרים למבחן";
  function mediaRows(raw, prefix, minutes) {
    return String(raw || "").trim().split(/\n+/).filter(Boolean).map(function (relativePath, index) {
      var parts = relativePath.split("/");
      var name = parts[parts.length - 1] || relativePath;
      var folder = parts.slice(0, -1).join("/") || "שורש";
      var padded = String(index + 1).padStart(3, "0");
      return {
        id: prefix + "-" + padded,
        name: name,
        folder: folder,
        path: root + "/" + relativePath,
        minutes: minutes,
      };
    });
  }
  return {
    sourceRoot: root,
    videoMinutesEach: 30,
    presentationImageMinutesEach: 20,
    videos: mediaRows(`video1151918075.mp4
גיטהאב סרטונים /GitHub_למתחילים__מדריך_מלא.mp4
גיטהאב סרטונים /Git_ו-GitHub__מדריך_למתחילים.mp4
גיטהאב סרטונים /גיט_מול_גיטהאב__מה_ההבדל_.mp4
גיטהאב סרטונים /גיטהאב_למתחילים__מדריך_בסיסי.mp4
גיטהאב סרטונים /שלב_0_הסיור.mp4
גיטהאב סרטונים /שלב_1_מבוא.mp4
גיטהאב סרטונים /שלב_2_זרימת_עבודה.mp4
גיטהאב סרטונים /שלב_3_מושגי_יסוד.mp4
גיטהאב סרטונים /שלב_4_מענף_לדחיפה.mp4
גיטהאב סרטונים /שלב_5_ניהול_פרויקטים.mp4
גיטהאב סרטונים /שלב_6_-_בקשות_משיכה_וקונפליקטים.mp4
גיטהאב סרטונים /שלב_7_אוטומציה_עם_GitHub_Actions.mp4
גיטהאב סרטונים /שלב_8_ואחרון_-_פורטפוליו.mp4
סרטונים 2/30_הדקות_האחרונות_במבחן.mp4
סרטונים 2/40_-_אסטרטגיה_לציון_מושלם.mp4
סרטונים 2/JS_Pattern__תת-מערך_מסודר.mp4
סרטונים 2/Mongoose__סכמות_ומודלים‏.mp4
סרטונים 2/React_ו-TypeScript_למבחן.mp4
סרטונים 2/TS‏__תייג,_נעל_ומנף.mp4
סרטונים 2/TypeScript__Generics_ו-Guards‏.mp4
סרטונים 2/אסטרטגיית_JS__מודל_4_שלבים.mp4
סרטונים 2/ארכיטקטורת_ניווט_ב-React‏.mp4
סרטונים 2/בדיקות_API_ידניות.mp4
סרטונים 2/בניית_עמוד_רשימה_חסין_ב-React.mp4
סרטונים 2/המדריך__SV_Appointments.mp4
סרטונים 2/המדריך_הטקטי__פול-סטאק.mp4
סרטונים 2/המדריך_למבחן_ה-Backend.mp4
סרטונים 2/הצ_קליסט_הסופי_לפני_הגשה.mp4
סרטונים 2/הצלחה_במבחן__התחברות.mp4
סרטונים 2/הצלחה_במבחן_ג_אווה-סקריפט.mp4
סרטונים 2/ולידציות__בניית_המבצר.mp4
סרטונים 2/זיהוי_סדרות_ב-JS.mp4
סרטונים 2/טופס_React__הוספה_ועריכה.mp4
סרטונים 2/ייחודיות_וחוקים_עסקיים.mp4
סרטונים 2/כיתת_אמן__ולידציות_נתונים.mp4
סרטונים 2/כיתת_אמן_לוולידציות.mp4
סרטונים 2/מבחן_Full-Stack_ב-3.mp4
סרטונים 2/מבחן_FullStack_v2.mp4
סרטונים 2/מדריך__REST_API_ו-Express.mp4
סרטונים 2/מחזור_חיי_נתונים_ב-JS‏.mp4
סרטונים 2/מסע_פיתוח_ה-Web_המודרני.mp4
סרטונים 2/סימולציית_SV_Team_Manager.mp4
סרטונים 2/סימולציית_מבחן_Full_Stack‏.mp4
סרטונים 2/ספר_המהלכים_למבחן_FullStack.mp4
סרטונים 2/פרוטוקול_דיבאג_בחירום.mp4
סרטונים 2/צ_קליסט_הגשה__בדיקת_קוד.mp4
סרטונים 2/שכבת_ה-API_בצד_הלקוח.mp4
סרטונים 2/תבנית_JS__ספירת_מופעים.mp4
סרטונים 2/תרגיל_פול-סטאק__בניית_פרויקט.mp4
סרטונים/Bulletproof_Data__Error_Handling_and_Fetching_APIs.mp4
סרטונים/Cracking_the_Full-Stack_JS_Exam_Traps.mp4
סרטונים/From_Scratch_to_Screen__The_Web_Developer_s_Journey.mp4
סרטונים/JS_&_React_Mastery.mp4
סרטונים/JS_ו-React__המדריך_למבחן‏.mp4
סרטונים/JS_מאחורי_הקלעים__זיכרון.mp4
סרטונים/JS_מתחת_למכסה_המנוע.mp4
סרטונים/JavaScript__פיצוח_הסודות.mp4
סרטונים/MongoDB__הזיכרון_של_השרת.mp4
סרטונים/Node.mp4
סרטונים/React_&_TS__Grandma_Method.mp4
סרטונים/React_Hooks__להעניק_זיכרון_לקומפוננטות.mp4
סרטונים/React_Navigation_&_State_Management.mp4
סרטונים/React__ניתוב_והוקים_מתקדמים.mp4
סרטונים/React__קומפוננטות_ו-JSX‏.mp4
סרטונים/State__זיכרון_הקומפוננטה.mp4
סרטונים/TS_לעומת_JS__טיפוסיות_חזקה.mp4
סרטונים/The_Anatomy_of_an_Infinite_Render.mp4
סרטונים/The_React_State_Machine__Immutability,_Lifecycles,_and_Hooks.mp4
סרטונים/TypeScript__להכניס_סדר_לג_אווהסקריפט.mp4
סרטונים/TypeScript__מסדרים_את_הקוד.mp4
סרטונים/אובייקטים_והשתלטות_על_ה-DOM.mp4
סרטונים/בדיקת_קלט_וחוויית_משתמש.mp4
סרטונים/בוטקאמפ_הכנה_למבחן_JS.mp4
סרטונים/בועת_הסקופ_וקסם_הקלוז_ר.mp4
סרטונים/בניית_שרת_הרשת_הראשון_שלכם_עם_Express.mp4
סרטונים/ברוכים_הבאים_ל-React.mp4
סרטונים/המדריך_המלא_למבחן_פול-סטאק.mp4
סרטונים/המדריך_הממוקד_ל-JS_ו-React.mp4
סרטונים/המכניקה_שמאחורי_מלכודות_הג_אווה_סקריפט.m4a
סרטונים/המלכודות_שיפילו_אתכם_במבחן_הפול_סטאק.m4a
סרטונים/השאלות_הקשות_במבחן_JS.mp4
סרטונים/התחמקות_ממלכודות_ב-JS.mp4
סרטונים/כיתת_אמן__100_ב-JS.mp4
סרטונים/כלי_הנשק_הסודיים_של_ריאקט.mp4
סרטונים/ליבת_JS‏__זיכרון_ומשתנים.mp4
סרטונים/ליבת_React__לבנות_עם_לבנים_חכמות.mp4
סרטונים/לעשות_סדר_עם_TypeScript.mp4
סרטונים/מ-SQL_ל-NoSQL__מונגו_ב-Node.mp4
סרטונים/מאפליקציית_תקציב_לבקאנד.mp4
סרטונים/מבחני_JavaScript‏__המדריך.mp4
סרטונים/מדריך_ההישרדות_למבחן_JS.mp4
סרטונים/מדריך_לסביבת_הפיתוח_המודרנית.mp4
סרטונים/מהרעיון_להשקה__בניית_אפליקציה.mp4
סרטונים/מטריצת_הזיכרון__Stack_ו-Heap.mp4
סרטונים/מלכודות_JS‏__זיכרון_וקוד.mp4
סרטונים/מצב_וראוטרים__כוחות_העל_בריאקט.mp4
סרטונים/ניהול_הזיכרון_ב-JS.mp4
סרטונים/ניהול_זיכרון_ו-const_ב-JS.mp4
סרטונים/נשק_סודי__useState_בריאקט.mp4
סרטונים/סודות_מבחן_ה-JS.mp4
סרטונים/ספר_המהלכים__ליבת_JS.mp4
סרטונים/ספר_המהלכים_למבחן_FullStack.mp4
סרטונים/עושים_סדר_עם_TypeScript.mp4
סרטונים/עיצוב_עם_Tailwind_CSS.mp4
סרטונים/פול-סטאק‏__המטבח_של_סבתא.mp4
סרטונים/פיצוח_JS__מלוגיקה_להרצה.mp4
סרטונים/פיצוח_מבחן_SVCollege.mp4
סרטונים/פיצוח_מושגי_ליבה_ב-JS.mp4
סרטונים/פיתוח_צד-שרת_עם_Node.mp4
סרטונים/פרויקט_גמר__ניהול_תקציב.mp4
סרטונים/פתרון_שיעורי_בית_פול-סטאק.mp4
סרטונים/שליטה_בג_אווהסקריפט__מערכים_ועד_מחלקות.mp4
סרטונים/תוכנית-האב_של_ארכיטקט_ית_ריאקט.mp4`, "video-watch", 30),
    presentationImages: mediaRows(`מצגות שיעורים/LESSON 23.pptx.pdf
מצגות שיעורים/Lesson 20.pptx.pdf
מצגות שיעורים/Lesson 22.pptx.pdf
מצגות שיעורים/Lesson 25.pptx.pdf
מצגות שיעורים/Lesson 26 part 2.pptx.pdf
מצגות שיעורים/Lesson 26.pptx.pdf
מצגות שיעורים/lesson24.pptx.pdf
תמונות/Full-Stack_Hacker_Playbook.pdf
תמונות/Full_Stack_House_Blueprint.pdf
תמונות/Full_Stack_Kitchen_to_Blueprint.pdf
תמונות/JS_Architecture_Blueprint.pdf
תמונות/JS_Exam_Survival_Playbook.pdf
תמונות/JS_and_React_Interview_Defusal.pdf
תמונות/JavaScript _ React _ Full‑Stack — דף מאסטר ל־100 במבחן.html
תמונות/JavaScript_ המדריך המקצועי לפיצוח מלכודות מבחן וקוד.pdf
תמונות/JavaScript_Exam_Blueprint.pdf
תמונות/JavaScript_Full_Stack_Exam_Blueprint.pdf
תמונות/JavaScript_Technical_Blueprint.pdf
תמונות/JavaScript_Under_the_Microscope.pdf
תמונות/JavaScript_to_TypeScript_Mastery.pdf
תמונות/course_summary_hard_to_easy.html
תמונות/exam_100_fullstack_all_in_one.html
תמונות/fullstack_all_material.html
תמונות/fullstack_grandma_course_he.pdf
תמונות/grandma_perfect_exam.html
תמונות/javascript_100_practice_exam.html
תמונות/javascript_100_practice_exam.md
תמונות/javascript_100_practice_exam.pdf
תמונות/javascript_master_print_guide.pdf
תמונות/javascript_super_colorful_master_guide.html
תמונות/madrich_savta_homework_svcollege.html
תמונות/madrich_savta_homework_svcollege_annotated (1).html
תמונות/preview.html
תמונות/svcollege_exam_tables_summary.html
תמונות/svcollege_exams_solution_guide.html
תמונות/svcollege_fullstack_master_exam_no_duplicates.html
תמונות/unnamed-10.jpg
תמונות/unnamed-11.jpg
תמונות/unnamed-12.jpg
תמונות/unnamed-13.jpg`, "media-review", 20),
  };
})();

var HOMEWORK_MASTER_PLAN = {
  id: "svcollege_fullstack_master_plan_100",
  title: "Master Plan לציון 100 במבחן Full Stack",
  source: "אבחון קלוד + מיפוי שיעורי הבית + 9 מבחני דוגמא",
  scoring: { project: 70, javascript: 20, typescript: 10 },
  warning: "הולידציות וה-layout הם אזור הסיכון הגבוה ביותר בפרויקט. בשאלת even/odd מתוך Willing, total הוא אורך המערך המקורי ולא כמות הערכים הייחודיים.",
  goal: "להגיע למצב שבו אפשר לבנות פרויקט Full Stack עובד ב-4 שעות, לפתור שאלת JS ב-20 דקות, ולסגור שאלת TS ב-10 דקות בלי תלות ב-AI או אינטרנט.",
  priorities: [
    { label: "פרויקט 70 נק׳", focus: "Routing, forms, validation, state, CRUD/API, layout לפי תמונות." },
    { label: "JavaScript 20 נק׳", focus: "פונקציית מערך/אובייקט עם בדיקות קלט ו-throw new Error." },
    { label: "TypeScript 10 נק׳", focus: "type, interface, enum, union, in narrowing." },
    { label: "Express/Mongo", focus: "כחלק מהפרויקט, לא כסעיף ניקוד עצמאי." },
    { label: "ולידציות", focus: "אזור הציון הקריטי. כל שדה חייב validation ברור." },
  ],
  remainingTimePlan: {
    updated: "2026-05-05",
    requiredCompletionPercent: 0,
    portalSystemCompletionPercent: 100,
    requiredMinutes: 5685,
    optionalBacklogMinutes: 380,
    videoWatchCount: 114,
    videoWatchMinutesEach: 30,
    videoWatchMinutes: 3420,
    futureVideoMinutes: 0,
    requiredLabel: "94 שעות 45 דק׳",
    optionalBacklogLabel: "6 שעות 20 דק׳",
    allPlansLabel: "94 שעות 45 דק׳",
    withFutureVideoLabel: "57 שעות צפייה בסרטונים כבר כלולות במסלול",
    note: "אחוז ההכנה האישית מתעדכן לפי סימוני Gate/משימות בפורטל. צפייה ב-114 הסרטונים היא משימת זמן חובה, אבל וידאו לא משמש כמקור תוכן מוכח בלי תמלול.",
    summary: [
      { label: "אבחון בסיס סגור", minutes: 255, time: "4 שעות 15 דק׳", required: true },
      { label: "תוכנית 7 ימים מלאה", minutes: 2010, time: "33 שעות 30 דק׳", required: true },
      { label: "צפייה בכל 114 הסרטונים", minutes: 3420, time: "57 שעות", required: true, note: "30 דק׳ לכל סרטון. צפייה בלבד; לא מסיקים חומר מבחן חדש בלי תמלול." },
      { label: "Backlog מוצרי לא חוסם", minutes: 380, time: "0 דק׳ נותרו", required: false },
      { label: "תמלול וידאו עתידי", minutes: 0, time: "0 דק׳", required: false, note: "נשאר unknown/unavailable עד שיש תמלול אמיתי." },
    ],
    diagnosticTasks: [
      { heat: 10, title: "JS בסיסי: פונקציה, מערך, object ו-Error", minutes: 30, gate: "4/5 בדיקות מסומנות לפני מעבר ל-JS 20" },
      { heat: 9, title: "React בסיסי: state, props, map ו-list", minutes: 35, gate: "5/6 בדיקות מסומנות לפני Students/Movie" },
      { heat: 8, title: "Forms + Validations", minutes: 40, gate: "6/7 בדיקות מסומנות, אין submit לא תקין" },
      { heat: 7, title: "React Router + CRUD Flow", minutes: 45, gate: "5/6 בדיקות מסומנות לפני Project 70" },
      { heat: 6, title: "API + useEffect: loading, error, filter", minutes: 35, gate: "4/5 בדיקות מסומנות לפני Products Filter" },
      { heat: 5, title: "TypeScript בסיסי: type, enum, union, narrowing", minutes: 30, gate: "5/6 בדיקות מסומנות לפני שאלות TS" },
      { heat: 4, title: "Express/Mongo בסיסי: server, schema, GET/POST", minutes: 40, gate: "5/6 בדיקות מסומנות לפני full stack" },
    ],
    weekTasks: [
      { id: "day1-ts-core", day: "יום 1", title: "לפתור Book, Genre, addBook, searchByGenre, updateAvailability, User union ו-type narrowing", minutes: 100, gate: "TS מלא ב-10 דקות ללא any" },
      { id: "day1-ts-memory", day: "יום 1", title: "לכתוב מהזיכרון type, interface, enum, union ו-in narrowing שלוש פעמים", minutes: 50, gate: "אין בלבול בין type/interface/enum/union" },
      { id: "day1-js-three", day: "יום 1", title: "לפתור 3 שאלות JS: group by digit length, even/odd unique, sort digits בלי sort", minutes: 120, gate: "כל JS נפתר עד 20 דקות עם Error ברור" },
      { id: "day1-watch-videos-001-016", day: "יום 1", title: "צפייה בסרטונים 1-16 מתוך 114", minutes: 480, gate: "16/16 סרטונים סומנו כנצפו; לא משתמשים בווידאו כמקור תוכן בלי תמלול" },
      { id: "day2-router", day: "יום 2", title: "להקים פרויקט React עם BrowserRouter, Routes ו-Route", minutes: 90, gate: "כל route נפתח ידנית בדפדפן" },
      { id: "day2-pages", day: "יום 2", title: "לבנות Login, Register, Home, Add, Edit, List, Navbar, NotFound", minutes: 150, gate: "כל עמוד קיים ומחובר לניווט" },
      { id: "day2-hooks", day: "יום 2", title: "לתרגל useNavigate, useParams, Link, props, map, conditional rendering ו-form state", minutes: 90, gate: "הקמת skeleton מלא תוך 30 דקות" },
      { id: "day2-watch-videos-017-032", day: "יום 2", title: "צפייה בסרטונים 17-32 מתוך 114", minutes: 480, gate: "16/16 סרטונים סומנו כנצפו; לא משתמשים בווידאו כמקור תוכן בלי תמלול" },
      { id: "day3-register", day: "יום 3", title: "לבנות Register עם 4 inputs ו-confirm password", minutes: 70, gate: "הודעת שגיאה ליד כל שדה לא תקין" },
      { id: "day3-add", day: "יום 3", title: "לבנות Add form עם validation מלא", minutes: 70, gate: "אין submit אם שדה אחד לא תקין" },
      { id: "day3-edit", day: "יום 3", title: "לבנות Edit form עם select ו-prefill", minutes: 60, gate: "Edit נטען מנתונים קיימים ולא ריק" },
      { id: "day3-list", day: "יום 3", title: "לבנות List/History עם delete, toggle ו-details", minutes: 60, gate: "מחיקה של item אחרון מציגה empty state" },
      { id: "day3-validation-audit", day: "יום 3", title: "בדיקה ידנית לכל validation: username, password, confirm, age, numbers, required, min/max, duplicate", minutes: 70, gate: "אף כפתור לא מבצע פעולה עם קלט לא תקין" },
      { id: "day3-watch-videos-033-048", day: "יום 3", title: "צפייה בסרטונים 33-48 מתוך 114", minutes: 480, gate: "16/16 סרטונים סומנו כנצפו; לא משתמשים בווידאו כמקור תוכן בלי תמלול" },
      { id: "day4-read", day: "יום 4", title: "לקרוא את דרישות הפרויקט ולתכנן routes, state ו-data shape", minutes: 15, gate: "יש רשימת עמודים ופעולות לפני קוד" },
      { id: "day4-build", day: "יום 4", title: "לבנות flow עובד של פרויקט אחד: Football, Bank, Flights, Logistics, Travel או Parking", minutes: 150, gate: "Add/Edit/Delete/Search עובדים" },
      { id: "day4-fix", day: "יום 4", title: "לתקן validations, state ו-edge cases", minutes: 60, gate: "אין submit לא תקין ואין console errors" },
      { id: "day4-layout", day: "יום 4", title: "לבדוק layout מול תמונה, responsive בסיסי ו-empty states", minutes: 75, gate: "UI תואם דרישה ולא חותך טקסט" },
      { id: "day4-package", day: "יום 4", title: "הרצה, בדיקת routes ואריזה זמנית", minutes: 60, gate: "ציון עצמי לפחות 55/70" },
      { id: "day4-watch-videos-049-064", day: "יום 4", title: "צפייה בסרטונים 49-64 מתוך 114", minutes: 480, gate: "16/16 סרטונים סומנו כנצפו; לא משתמשים בווידאו כמקור תוכן בלי תמלול" },
      { id: "day5-server", day: "יום 5", title: "להקים Express server עם cors, express.json ו-.env", minutes: 45, gate: "GET health/hello עובד" },
      { id: "day5-mongoose", day: "יום 5", title: "לחבר mongoose.connect וליצור Schema + Model", minutes: 45, gate: "DB מתחבר ושדות schema תואמים" },
      { id: "day5-get-post", day: "יום 5", title: "לכתוב GET all ו-POST create עם validation/status codes", minutes: 70, gate: "POST חסר מחזיר 400, תקין מחזיר 201" },
      { id: "day5-rest", day: "יום 5", title: "להוסיף PUT/DELETE/POST filter אם נדרש", minutes: 65, gate: "update/delete/filter עובדים על data אמיתי" },
      { id: "day5-fetch", day: "יום 5", title: "לחבר frontend fetch עם loading/error", minutes: 45, gate: "React form שולח לשרת ו-Mongo נשמר" },
      { id: "day5-watch-videos-065-080", day: "יום 5", title: "צפייה בסרטונים 65-80 מתוך 114", minutes: 480, gate: "16/16 סרטונים סומנו כנצפו; לא משתמשים בווידאו כמקור תוכן בלי תמלול" },
      { id: "day6-read", day: "יום 6", title: "קריאת מבחן ותכנון מבנה", minutes: 15, gate: "לא מתחילים קוד בלי רשימת routes/fields" },
      { id: "day6-project", day: "יום 6", title: "בניית Project 70 בתנאי זמן", minutes: 130, gate: "עיקר הפרויקט עובד" },
      { id: "day6-js", day: "יום 6", title: "פתרון JavaScript 20", minutes: 25, gate: "פלט exact shape + Error על קלט לא תקין" },
      { id: "day6-ts", day: "יום 6", title: "פתרון TypeScript 10", minutes: 15, gate: "type/enum/union/narrowing בלי any" },
      { id: "day6-repair", day: "יום 6", title: "תיקוני validations, layout ו-API", minutes: 40, gate: "אין console errors ואין submit שגוי" },
      { id: "day6-package", day: "יום 6", title: "הרצה אחרונה ואריזה", minutes: 15, gate: "ציון עצמי 80+" },
      { id: "day6-watch-videos-081-097", day: "יום 6", title: "צפייה בסרטונים 81-97 מתוך 114", minutes: 510, gate: "17/17 סרטונים סומנו כנצפו; לא משתמשים בווידאו כמקור תוכן בלי תמלול" },
      { id: "day7-pick", day: "יום 7", title: "לעבור על תוצאות האבחון ולבחור 3 חולשות בלבד", minutes: 30, gate: "אין פתיחת נושא חדש" },
      { id: "day7-js", day: "יום 7", title: "לתקן חולשת JS אחת", minutes: 45, gate: "שאלה JS נפתרת עד 20 דקות" },
      { id: "day7-ts", day: "יום 7", title: "לתקן חולשת TS אחת", minutes: 30, gate: "שאלת TS נפתרת עד 10 דקות" },
      { id: "day7-project", day: "יום 7", title: "לתקן חולשת Project אחת", minutes: 45, gate: "Route/form/API חלש עובד" },
      { id: "day7-checklist", day: "יום 7", title: "להכין checklist קצר ליום המבחן", minutes: 30, gate: "רשימה אחת של 70/20/10" },
      { id: "day7-clean", day: "יום 7", title: "להקים פרויקט נקי פעם אחת בלי פיצ׳רים חדשים", minutes: 30, gate: "skeleton עולה תוך 30 דקות" },
      { id: "day7-watch-videos-098-114", day: "יום 7", title: "צפייה בסרטונים 98-114 מתוך 114", minutes: 510, gate: "17/17 סרטונים סומנו כנצפו; לא משתמשים בווידאו כמקור תוכן בלי תמלול" },
    ],
    optionalBacklog: [
      { id: "old-training-scan", title: "סריקה מלאה של כל עמודי מבחן האימון הישן כדי להוכיח אם הוא כפילות מלאה", completionPercent: 100, minutes: 60, required: false, note: "הושלם: הקובץ זהה ביט-לביט לעותק מבחן האימון שכבר מכוסה." },
      { id: "question-warnings", title: "ניקוי 100 notes באיכות שאלות לפי עדיפות TS/Router/useEffect/forms/Express/JS", completionPercent: 100, minutes: 300, required: false, note: "הושלם: 2373 שאלות נקיות, 0 warnings/blockers, ו-strict עובר." },
      { id: "post-warning-prerelease", title: "הרצת pre-release אחרי ניקוי ה-notes", completionPercent: 100, minutes: 20, required: false, note: "הושלם: finish-line עבר 21/21 כולל coverage/drills של חוברת הפתרונות ו-world-class menu audit." },
      { id: "video-transcription-future", title: "וידאו video1151918075.mp4", completionPercent: 0, minutes: 0, required: false, note: "צפייה בסרטונים מתוכננת בלוח המשימות; תמלול/הסקת תוכן חדש נשארים חסומים עד מקור אמיתי." },
    ],
  },
  materialCompletionTasks: [
    {
      title: "Audit חוסרי חומר אחרי content-loader",
      heat: 10,
      lessons: "כל שיעורי המבחן הקריטיים",
      reason: "למדוד את מצב הפורטל כפי שהוא באמת נטען בדפדפן אחרי merge, לא לפי קבצי data מבודדים.",
      tasks: [
        "להריץ lesson-material-gaps audit אחרי טעינת content-loader ולמדוד comparisons, extras, examples, pitfalls, practice, questions ו-code לכל מושג.",
        "להציג Heat Map בתוך Homework Exam Mode עם סימון אדום לכל שיעור קריטי מתחת לסף השוואות.",
        "לוודא ששיעור מבחן קריטי עם פחות מ-70% השוואות לא מוצג כ-ready.",
      ],
      passCriteria: "דוח החוסרים מתבסס על התוכן הממוזג בפועל ומוצג בפורטל עם קישור ישיר לשיעור החסר.",
    },
    {
      title: "Heat 10 - השוואות חובה",
      heat: 10,
      lessons: "שיעורים 24, 25, 26",
      reason: "אלה השיעורים שהכי קרובים למבחן המעשי: Hooks/API, Tailwind/project layout, TypeScript/React TS.",
      tasks: [
        "שיעור 24: להשלים useEffect מול render body, סוגי deps, useMemo מול useCallback, useRef מול useState, cleanup מול leak.",
        "שיעור 25: להשלים Tailwind מול CSS, flex מול grid, padding/margin/gap, responsive prefixes, search/filter, rating state מול form state.",
        "שיעור 26: להשלים TS מול JS, ts מול tsx, type מול interface, enum מול union, any/unknown/never, props/state/function typing.",
      ],
      passCriteria: "Heat 10 מגיע לפחות ל-90% מושגים עם טבלאות השוואה, וטאב השוואות לא מציג empty state בשיעורים 24-26.",
    },
    {
      title: "Heat 9 - השוואות לפרויקט 70",
      heat: 9,
      lessons: "שיעורים 20, 22, 23, 27",
      reason: "שכבת הפרויקט: Database, React State, Router/Context ו-Budget/TS homework.",
      tasks: [
        "שיעור 20: להשלים SQL מול NoSQL, collection מול document, schema מול model, find מול findOne, update/delete variants.",
        "שיעור 22: להשלים state רגיל מול immutable update, object state מול array state, controlled input מול uncontrolled input.",
        "שיעור 23: להשלים Route מול Routes, Link מול useNavigate, static route מול dynamic route, props מול Context.",
        "שיעור 27: להשלים Budget Manager patterns: Transaction type, add/edit/delete, income/expense/savings, category breakdown.",
      ],
      passCriteria: "Heat 9 מגיע לפחות ל-75% מושגים עם טבלאות השוואה ותרגול מורחב.",
    },
    {
      title: "Heat 8 - Backend ו-Next.js",
      heat: 8,
      lessons: "שיעורים 17, 18, 21, Next.js",
      reason: "חומר משלים שיכול להופיע בתוך הפרויקט או כשאלה קצרה סביב Express/React/Next.",
      tasks: [
        "שיעור 17: להשלים HTTP/Express/REST comparisons ותרגול מורחב לכל מושג backend קריטי.",
        "שיעור 18: להשלים Node/Express homework flow: forms, validation, storage, endpoints ו-error handling.",
        "שיעור 21: להשלים React basics comparisons: component, props, map, conditional rendering, event handlers.",
        "Next.js: להשלים App Router, page/layout, nested routes, server component מול client component, deploy readiness.",
      ],
      passCriteria: "Heat 8 לא נשאר עם שיעור קריטי שמציג 0 השוואות או 0 תרגול מורחב.",
    },
    {
      title: "תרגול מורחב למושגי Heat 10/9",
      heat: 9,
      lessons: "מושגים חסרים בלבד",
      reason: "מושג למבחן לא מספיק ככותרת. צריך דוגמת קוד, טעות נפוצה ושאלת תרגול קצרה.",
      tasks: [
        "לכל מושג Heat 10/9 חסר: להוסיף דוגמת קוד אחת ממוקדת מבחן.",
        "לכל מושג Heat 10/9 חסר: להוסיף pitfall קצר שמסביר מה יוריד נקודות.",
        "לכל מושג Heat 10/9 חסר: להוסיף שאלת תרגול אחת עם תוצר צפוי.",
      ],
      passCriteria: "אין מושג Heat 10/9 בלי code example, pitfall ו-practice question.",
    },
    {
      title: "שערי בדיקה לאחר השלמה",
      heat: 10,
      lessons: "בדיקות אוטומטיות + דפדפן",
      reason: "החומר חייב להישאר מכוסה גם אחרי שינוי עתידי ולא לחזור למצב empty state.",
      tasks: [
        "להוסיף בדיקה: Heat 10 חייב לפחות 90% השוואות ו-Heat 9 לפחות 75% השוואות.",
        "לוודא Homework Exam Mode מציג דוח חוסרים עם קישור לשיעור החסר.",
        "להריץ npm test על homework-exam-mode ו-lesson material gaps.",
        "להריץ svcollege:full-portal-smoke:strict, svcollege:visual-overlap:strict ו-finish-line:pre-release.",
      ],
      passCriteria: "כל השערים עוברים, ואין empty state בטאב השוואות של שיעורי 24-26.",
    },
  ],
  sevenDayPlan: [
    {
      day: "יום 1",
      title: "TS + JS בסיס",
      time: "4-5 שעות",
      tasks: [
        "לפתור את כל שאלות TS: Book, Genre, addBook, searchByGenre, updateAvailability, User union, type narrowing.",
        "לכתוב מהזיכרון 3 פעמים: type, interface, enum, union, in.",
        "לפתור 3 שאלות JS: סכום לפי אורך מספר, even/odd unique עם total כאורך המערך המקורי, מיון ספרות בלי sort.",
      ],
      passCriteria: "TS ב-10 דקות, JS אחד ב-20 דקות.",
    },
    {
      day: "יום 2",
      title: "React Skeleton",
      time: "5-6 שעות",
      tasks: [
        "לבנות שלד עם BrowserRouter, Routes, Route.",
        "להכין Login, Register, Home, Add, Edit, List, Navbar, NotFound.",
        "לתרגל useNavigate, useParams, Link, props, map עם key, conditional rendering, form state עם useState.",
      ],
      passCriteria: "הקמת פרויקט עם routes מלאים תוך 30 דקות.",
    },
    {
      day: "יום 3",
      title: "Forms + Validations",
      time: "5-6 שעות",
      tasks: [
        "לבנות Register עם 4 inputs ו-confirm password.",
        "לבנות Add form עם validation מלא.",
        "לבנות Edit form עם select ו-prefill.",
        "לבנות List/History עם delete/toggle/details.",
        "להציג error מתחת לשדה או alert לפי הדרישה.",
      ],
      passCriteria: "אף כפתור לא מבצע פעולה כשהקלט לא תקין.",
    },
    {
      day: "יום 4",
      title: "פרויקט מלא 70 נק׳",
      time: "6 שעות",
      tasks: [
        "15 דקות קריאה ותכנון.",
        "150 דקות בניית פרויקט.",
        "60 דקות תיקון.",
        "30 דקות בדיקה ואריזה.",
        "לבחור אחת מתבניות העבר: Football Club, Bank, Flights, Logistics, Travel, Parking.",
      ],
      passCriteria: "ציון עצמי לפחות 55/70.",
    },
    {
      day: "יום 5",
      title: "Express/Mongo Integration",
      time: "4-5 שעות",
      tasks: [
        "Express server עם cors, express.json ו-.env.",
        "mongoose.connect, Schema ו-Model.",
        "GET all, POST create, POST filter אם נדרש, PUT update אם נדרש, DELETE אם נדרש.",
        "status codes: 200, 201, 400, 404, 500.",
        "frontend fetch עם loading/error.",
      ],
      passCriteria: "React form שולח לשרת, Mongo נשמר, UI מציג נתונים שחזרו מהשרת.",
    },
    {
      day: "יום 6",
      title: "Mock Exam מלא",
      time: "4 שעות",
      tasks: [
        "00:00-00:15 קריאת מבחן.",
        "00:15-02:30 פרויקט.",
        "02:30-03:00 JS.",
        "03:00-03:15 TS.",
        "03:15-03:45 תיקון validations/layout/API.",
        "03:45-04:00 הרצה, תיקון שגיאות, אריזה.",
      ],
      passCriteria: "ציון 80+ בסימולציה לפי Project /70, JS /20, TS /10.",
    },
    {
      day: "יום 7",
      title: "תיקון חולשות בלבד",
      time: "3-4 שעות",
      tasks: [
        "לא ללמוד ספרייה חדשה, לא להחליף stack, לא להתחיל פרויקט גדול חדש.",
        "לחזור על JS חלש.",
        "לחזור על TS.",
        "לתקן template אישי.",
        "להכין checklist מודפס.",
        "לתרגל הקמת פרויקט נקי.",
      ],
      passCriteria: "רק חולשות מסומנות תוקנו; אין פיצ׳רים חדשים.",
    },
  ],
  probabilityTiers: [
    {
      label: "סבירות 100% - חובה לדעת מצוין",
      items: [
        "React Router: BrowserRouter, Routes, Route, useNavigate, useParams, Link.",
        "useState לכל טופס ולכל state; props להעברת מידע; map עם key להצגת רשימות.",
        "Conditional rendering עם condition && ו-condition ? A : B.",
        "עמודי חובה: Login, Register, Home/Main, Add, Edit/Update, List/History.",
        "ולידציות: username באנגלית/אותיות קטנות, password rules, confirm password, מספרים בלבד, טווח גיל, שדות לא ריקים, min/max length.",
        "Express/Mongo: cors, express.json, mongoose connect, Schema, Model, GET, POST, filtering, duplicate check, status codes.",
        "CSS/Tailwind: flex/grid, center alignment, spacing, responsive breakpoints, disabled button state.",
      ],
    },
    {
      label: "סבירות 90% - מאוד סביר",
      items: [
        "Dynamic routing כמו /team/:teamName עם useParams.",
        "useNavigate אחרי login/register/add/edit מוצלח.",
        "Search input שמסנן רשימה בזמן אמת.",
        "Toggle בין Show all לבין Show only filtered rows.",
        "Modal או popup לפעולת תשלום/פרטים/מחיקה.",
        "Select dropdown שנבנה מתוך הנתונים, לא מרשימה ידנית אם השאלה דורשת derived data.",
        "fetch או axios עם GET/POST, JSON.stringify, loading state ו-error handling.",
        "JS algorithms עם reduce/filter/map/find/some/every ו-throw new Error.",
      ],
    },
    {
      label: "סבירות 70% - כדאי להכיר",
      items: [
        "localStorage רק אם נדרש לשמירת התחברות או מצב.",
        "JSON.parse ו-JSON.stringify.",
        "Spread operator לעדכון immutable של object/array.",
        "Destructuring לקריאת fields נקייה.",
        "async/await עם try/catch.",
        ".env variables בצד שרת.",
        "sort לפי abc או מספר כאשר מותר; אם כתוב אסור sort, משתמשים בספירת תדירויות או לולאות.",
      ],
    },
    {
      label: "סבירות 40% - בסיס מספיק",
      items: [
        "שאלת תאוריה על GET/POST/PUT/DELETE.",
        "יתרונות וחסרונות MongoDB.",
        "React מול HTML/CSS/JS רגיל.",
        "Fibonacci, סדרות חשבוניות/הנדסיות, recursion בסיסי.",
        "Arrow function מול function רגיל.",
      ],
    },
  ],
  requiredPages: [
    "Login/SignIn - שני inputs, כפתור כניסה, כפתור הרשמה, alert לשגיאה.",
    "Register/SignUp - 3-4 inputs, confirm password, הודעות שגיאה מתחת לשדות.",
    "Home/Main - Navbar ותוכן מרכזי לפי התמונה.",
    "Add - טופס מלא עם ולידציות וניווט אחרי הצלחה.",
    "Edit/Update - select שמציג פריט קיים, prefill לטופס, שמירה immutable או דרך API.",
    "List/History - רשימה, cards/table, delete/toggle/details לפי הדרישה.",
  ],
  pageChecklist: [
    "Route מוגדר בדיוק לפי השאלה.",
    "כל input מחובר ל-useState או form state.",
    "כל validation מחזיר הודעה ספציפית.",
    "כפתור disabled אם השאלה דורשת מניעת פעולה לפני קלט תקין.",
    "אחרי הצלחה יש reset או navigate לפי ההנחיה.",
    "layout וסדר האלמנטים תואמים לתמונה.",
    "אין console errors ואין מסך ריק.",
  ],
  expressChecklist: [
    "app.use(cors()) לפני routes.",
    "app.use(express.json()) לפני routes.",
    "mongoose.connect(process.env.MONGO_URI).",
    "Schema תואם בדיוק לשדות במבחן.",
    "GET מחזיר את הרשומות שנשמרו באמת.",
    "POST מבצע validation ובדיקת כפילות כשנדרש.",
    "Filtering route משתמש ב-query או body לפי הדרישה.",
    "try/catch ו-status codes 200/201/400/404/500.",
  ],
  jsPatterns: [
    "group by digit length and sum.",
    "identify sequence: arithmetic/geometric/Fibonacci/other.",
    "even/odd unique with original total.",
    "contiguous sequences sum target.",
    "ordered subsequence.",
    "matrix frequency.",
    "binary to decimal palindrome.",
    "Fibonacci-like position.",
    "sort digits without sort.",
  ],
  jsPatternRequirements: [
    "לבדוק input.",
    "לזרוק Error ברור.",
    "להחזיר בדיוק את המבנה המבוקש.",
    "לא להשתמש באקראיות בקוד.",
  ],
  preExamSetup: {
    folderTree: "svExam/frontend as repo 1, svExam/backend as repo 2.",
    allowed: [
      "React project clean setup with Tailwind and optional shadcn.",
      "Express project with Mongo connection, cors, express.json and env variables.",
      "One basic GET endpoint only, such as Hello World.",
      "GitHub repos and deployment shell ready.",
    ],
    forbidden: [
      "No project-specific frontend screens before the exam.",
      "No routing before the exam.",
      "No endpoints beyond the one basic GET.",
      "No CRUD logic before the exam.",
    ],
  },
  examDaySchedule: [
    "00:00-00:15 - read the whole exam, mark entities, routes, validations and score sections.",
    "00:15-02:30 - build the 70-point project skeleton, routes, forms and core state/API.",
    "02:30-03:00 - solve the 20-point JavaScript question.",
    "03:00-03:15 - solve the 10-point TypeScript question.",
    "03:15-03:45 - finish validations, server integration and layout matching.",
    "03:45-04:00 - run checks, fix obvious failures, package exactly as requested.",
  ],
  commonMistakes: [
    "Missing one validation can cost more than a visual polish issue.",
    "Navbar buttons enabled before login when the exam says they must be disabled.",
    "Sending to the server before frontend validation when the instructions require validation first.",
    "Forgetting CORS or express.json.",
    "Wrong route path or not using useParams for dynamic route data.",
    "Not resetting or navigating after successful submit.",
    "Using hard-coded lists when the question says derive from data.",
    "Layout order different from the exam image.",
  ],
  goldenRules: [
    "Start from routes and layout, then forms, then validations, then server/API.",
    "Validation is score, not decoration.",
    "When stuck, leave a working simple flow and continue; return later.",
    "Every list update must be immutable in React.",
    "Never add data that the question did not provide or the user did not enter.",
    "Keep the final 15 minutes only for run, fix and packaging.",
  ],
  examDayChecklist: {
    project: [
      "כל route מוגדר בדיוק.",
      "כל input מחובר ל-state.",
      "כל validation קיימת.",
      "כפתורים disabled כשצריך.",
      "navigation אחרי הצלחה.",
      "reset אחרי submit כשצריך.",
      "layout תואם תמונה.",
      "אין hard-coded list אם צריך לגזור מנתונים.",
      "אין console errors.",
    ],
    express: [
      "cors לפני routes.",
      "express.json לפני routes.",
      "Mongo connected.",
      "Schema תואם שדות.",
      "duplicate check כשנדרש.",
      "status codes נכונים.",
      "try/catch.",
      "client מציג server errors.",
    ],
    submission: [
      "תיקיות לפי הוראה.",
      "frontend/backend נפרדים אם נדרש.",
      "בלי node_modules.",
      "RAR/ZIP לפי ההנחיה.",
      "להריץ פעם אחרונה לפני אריזה.",
    ],
  },
  assumptions: [
    "תאריך היעד הוא שבוע מהיום, סביב 12 במאי 2026.",
    "המבחן הוא 4 שעות.",
    "הניקוד הפעיל הוא 70/20/10.",
    "מותר להשתמש רק בחומרים שהוכנו כחומר פתוח, בלי AI ובלי אינטרנט בזמן המבחן.",
    "המערכת כוללת Homework Exam Mode, 9 מבחני דוגמא, 9 שאלות JS ושאלות TS רלוונטיות.",
  ],
};

var HOMEWORK_SCORING_RUBRIC = [
  { id: "project", label: "פרויקט", points: 70, evidence: "משימת הבנייה המרכזית עובדת מקצה לקצה: CRUD/forms/routing/API/UI לפי התבנית." },
  { id: "javascript", label: "JavaScript", points: 20, evidence: "שאלת JS נקייה: reduce/object accumulator, validation וזריקת Error כשקלט לא תקין." },
  { id: "typescript", label: "TypeScript", points: 10, evidence: "שאלת TS אחת: type/interface/enum/union/narrowing מדויק לפי מקור שיעורי הבית." },
];

var HOMEWORK_WEEK_PLAN = [
  "יום 1: TS 1 מלא - Book, Genre, User union, type narrowing.",
  "יום 2: React products filter - fetch, useEffect, category select, useRef focus.",
  "יום 3: React + TS Budget Manager - CRUD, totals, category breakdown.",
  "יום 4: Node/Mongo API - Express, Mongoose, schemas, GET/POST, Employee operations.",
  "יום 5: Next.js dashboard - App Router, nested routes, shadcn/ui surfaces.",
  "יום 6: mock exam מלא - פרויקט 70 נק׳ + JavaScript 20 נק׳ + TypeScript 10 נק׳.",
  "יום 7: תיקון חולשות בלבד - בלי פיצ'רים חדשים.",
];

var HOMEWORK_EXAM_EXAMPLES = [
  {
    id: "example_helpme",
    sourceIds: ["exam_moed_a_helpme"],
    title: "HelpMe emergency app",
    observedScoring: "75 project + 25 choice question",
    projectPattern: "React app with first-run signup, route title update, emergency service selector, cancel flow and three failed password lockout.",
    jsPattern: "Classify a number series as arithmetic, geometric, Fibonacci or other; throw on invalid input.",
    currentUse: "תרגול project flow עם validation, routing, state transitions ותפריט בחירה.",
  },
  {
    id: "example_willing",
    sourceIds: ["exam_willing_2022"],
    title: "Willing volunteer app",
    observedScoring: "40 React + 35 JavaScript + 25 Server",
    projectPattern: "React routes for add/find/all, form validation, unique city select, toggle selected volunteering rows and remove confirmed selections.",
    jsPattern: "Count even and odd unique values while total keeps the full array length.",
    currentUse: "תרגול CRUD/state מקומי, select שנגזר מנתונים, toggle ומחיקה immutable.",
  },
  {
    id: "example_parking",
    sourceIds: ["exam_parking_2023"],
    title: "SV Parking",
    observedScoring: "50 React + 25 JavaScript + 25 Server",
    projectPattern: "React signup/signin, active parking guard, payment modal, history view and navigation after login.",
    jsPattern: "Count contiguous sequences of at least two numbers whose sum equals a target.",
    currentUse: "תרגול login state, guarded actions, modal flow, history and server compatibility thinking.",
  },
  {
    id: "example_travel",
    sourceIds: ["exam_travel_moed_g"],
    title: "Travel-SV",
    observedScoring: "50 React + 25 JavaScript + 25 Node package",
    projectPattern: "React app with disabled navigation before login, home carousel, add/update routes and one shared form component.",
    jsPattern: "Check whether a smaller number array appears in the full array in the same order.",
    currentUse: "תרגול reusable form, route mode switching, ordered data validation and logout reset.",
  },
  {
    id: "example_currency",
    sourceIds: ["exam_currency_converter"],
    title: "Currency converter",
    observedScoring: "80 React + 20 JavaScript",
    projectPattern: "React routes, currency class, conversion list, delete conversion row, update existing rate or add a new currency rate.",
    jsPattern: "Return the position of a final value in a Fibonacci-like series from two starting values.",
    currentUse: "תרגול class/model, generic array handling, disabled buttons until valid input and route-based update screen.",
  },
  {
    id: "example_flights",
    sourceIds: ["exam_flight_control"],
    title: "Flight control",
    observedScoring: "50 React + 25 JavaScript + 25 Server",
    projectPattern: "React control panel with nested routes, responsive side navigation, show/sort/add/delete flights and summary alert after deletion.",
    jsPattern: "Convert a numeric matrix into frequency objects; throw if any matrix value is not a number.",
    currentUse: "תרגול nested routing, responsive command nav, duplicate prevention and aggregate summaries.",
  },
  {
    id: "example_logistics",
    sourceIds: ["exam_logistics_warehouse"],
    title: "Logistics warehouse",
    observedScoring: "75 React + 25 JavaScript",
    projectPattern: "React routes with Employee/Product classes, signup/login, product update by forklift permission and manager table.",
    jsPattern: "Convert binary digits to decimal, then return whether the decimal number is a palindrome.",
    currentUse: "תרגול הרשאות, class modeling, conditional updates and manager summary table.",
  },
  {
    id: "example_bank",
    sourceIds: ["exam_bank_frontend"],
    title: "SV-Bank",
    observedScoring: "65 React + 20 JavaScript + 15 Express",
    projectPattern: "React bank app with admin/customer branches, register/edit user, customer actions, admin expense drilldown and deletion.",
    jsPattern: "Sort digits inside one number from low to high without using sort().",
    currentUse: "תרגול role-based UI, nested data arrays, edit route reuse and no-sort algorithm thinking.",
  },
  {
    id: "example_training_football",
    sourceIds: ["exam_training_football"],
    title: "Football Club Svcollege",
    observedScoring: "React project + JavaScript + Express, exact points unavailable in scanned source",
    projectPattern: "React football club app with login/register, route /team/:teamName, navbar, search, lineup filter, add player, edit player, logout and strict layout matching.",
    jsPattern: "Group numbers by digit length and sum each group; throw when any array value is not a number.",
    currentUse: "תרגול route params, form validation, derived lineup views, edit form prefill and exact UI layout discipline.",
  },
];

var HOMEWORK_EXAM_BUILD_QUESTIONS = [
  {
    id: "build_homework_react_students_table",
    homeworkTemplateId: "react_students",
    sourceGroup: "homework_exam_mode",
    sourceIds: ["hw_react_students"],
    conceptKey: "lesson_22::useState",
    topicId: HOMEWORK_EXAM_TOPIC_ID,
    level: 5,
    scoreRole: "project",
    scorePoints: 70,
    durationMinutes: 75,
    title: "React Basics: Students table",
    prompt:
      "בנה Vite React app לפי שיעורי בית 22: קובץ src/data/students.js עם מערך הסטודנטים מהמקור, Header, Dashboard, Footer, וטופס AddStudent שמוסיף סטודנט חדש לטבלה.",
    starter:
      "src/data/students.js\nexport default [\n  // העתק רק את הסטודנטים שמופיעים בשיעורי בית 22\n];\n\nsrc/App.jsx\nfunction App() {\n  // import students, keep state, render Header/Dashboard/AddStudent/Footer\n}\n\nexport default App;",
    tests: [
      { regex: "students\\.js|students", description: "מפריד את מערך הסטודנטים לקובץ נתונים", flags: "i" },
      { regex: "Header", description: "כולל Header component", flags: "" },
      { regex: "Dashboard", description: "כולל Dashboard שמקבל students", flags: "" },
      { regex: "Footer", description: "כולל Footer", flags: "" },
      { regex: "AddStudent", description: "כולל טופס AddStudent", flags: "" },
      { regex: "useState", description: "ניהול רשימה דרך useState", flags: "" },
      { regex: "<table|<thead|<tbody", description: "רשימת הסטודנטים מוצגת כטבלה", flags: "i" },
      { regex: "\\.\\.\\.", description: "הוספה immutable עם spread", flags: "" },
    ],
    reference:
      "const sourceStudents = [\n" +
      "  { id: 1, name: 'Brad Pitt', age: 24, major: 'Film Studies', university: 'Tel Aviv University', averageGrade: 88 },\n" +
      "  { id: 2, name: 'Angelina Jolie', age: 22, major: 'International Relations', university: 'Hebrew University of Jerusalem', averageGrade: 92 },\n" +
      "  { id: 3, name: 'Leonardo DiCaprio', age: 23, major: 'Environmental Science', university: 'Ben-Gurion University', averageGrade: 90 },\n" +
      "  { id: 4, name: 'Meryl Streep', age: 21, major: 'Drama', university: 'University of Haifa', averageGrade: 95 },\n" +
      "  { id: 5, name: 'Denzel Washington', age: 25, major: 'Political Science', university: 'Bar-Ilan University', averageGrade: 87 },\n" +
      "  { id: 6, name: 'Kate Winslet', age: 22, major: 'Literature', university: 'Technion', averageGrade: 91 },\n" +
      "  { id: 7, name: 'Tom Hanks', age: 24, major: 'History', university: 'Weizmann Institute of Science', averageGrade: 89 },\n" +
      "  { id: 8, name: 'Natalie Portman', age: 23, major: 'Psychology', university: 'Princeton University', averageGrade: 93 },\n" +
      "];\n\n" +
      "function stableStudentId(student) {\n" +
      "  const key = [student.name, student.age, student.major, student.university].join('|');\n" +
      "  let hash = 0;\n" +
      "  for (let index = 0; index < key.length; index += 1) hash = (hash * 31 + key.charCodeAt(index)) >>> 0;\n" +
      "  return hash;\n" +
      "}\n\n" +
      "function Header() { return <header>Student Dashboard</header>; }\n" +
      "function Dashboard({ students }) { return <table><tbody>{students.map((student) => <tr key={student.id}><td>{student.name}</td><td>{student.averageGrade}</td></tr>)}</tbody></table>; }\n" +
      "function Footer() { return <footer>Course work</footer>; }\n" +
      "function AddStudent({ onAdd }) { return <form onSubmit={(event) => { event.preventDefault(); }}><button>Add student</button></form>; }\n\n" +
      "function App() {\n" +
      "  const [students, setStudents] = useState(sourceStudents);\n" +
      "  function addStudent(input) {\n" +
      "    const student = { ...input, id: stableStudentId(input) };\n" +
      "    setStudents((current) => [...current, student]);\n" +
      "  }\n" +
      "  return <><Header /><AddStudent onAdd={addStudent} /><Dashboard students={students} /><Footer /></>;\n" +
      "}",
    hint: "הנתונים היחידים שמותר להתחיל איתם הם הסטודנטים שמופיעים בשיעורי בית 22. לסטודנט חדש צור id דטרמיניסטי מתוכן הטופס.",
    explanation: "המשימה בודקת Vite, import/export, props, useState, form controlled והוספה immutable לרשימה.",
  },
  {
    id: "build_homework_react_products_filter",
    homeworkTemplateId: "react_api_filter",
    sourceGroup: "homework_exam_mode",
    sourceIds: ["hw_products_api"],
    conceptKey: "lesson_24::useEffect",
    topicId: HOMEWORK_EXAM_TOPIC_ID,
    level: 5,
    scoreRole: "project",
    scorePoints: 70,
    durationMinutes: 70,
    title: "React API Filter: Products",
    prompt:
      "בנה אפליקציית React שמושכת מוצרים מ-https://dummyjson.com/products, מציגה שם ומחיר, בונה select קטגוריות מהנתונים, מוסיפה אפשרות הכל, וממקדת את ה-select עם useRef כשהמסך נטען.",
    starter:
      "function ProductsApp() {\n  const categoryRef = useRef(null);\n  // products, selectedCategory, loading, error\n  // fetch https://dummyjson.com/products in useEffect\n}",
    tests: [
      { regex: "https://dummyjson\\.com/products", description: "משתמש ב-API שמופיע בשיעורי הבית", flags: "" },
      { regex: "useEffect", description: "fetch בתוך useEffect", flags: "" },
      { regex: "useRef", description: "useRef לפוקוס select", flags: "" },
      { regex: "\\.focus\\(", description: "מפעיל focus על ה-select", flags: "" },
      { regex: "category", description: "סינון לפי category", flags: "i" },
      { regex: "<select", description: "תפריט קטגוריות", flags: "i" },
      { regex: "\\.filter\\(", description: "מסנן מוצרים", flags: "" },
      { regex: "loading|error", description: "מצבי טעינה ושגיאה", flags: "i" },
    ],
    reference:
      "function ProductsApp() {\n" +
      "  const [products, setProducts] = useState([]);\n" +
      "  const [selectedCategory, setSelectedCategory] = useState('all');\n" +
      "  const [status, setStatus] = useState('loading');\n" +
      "  const categoryRef = useRef(null);\n\n" +
      "  useEffect(() => {\n" +
      "    let active = true;\n" +
      "    fetch('https://dummyjson.com/products')\n" +
      "      .then((res) => {\n" +
      "        if (!res.ok) throw new Error('products request failed');\n" +
      "        return res.json();\n" +
      "      })\n" +
      "      .then((data) => { if (active) { setProducts(data.products || []); setStatus('ready'); } })\n" +
      "      .catch(() => { if (active) setStatus('error'); });\n" +
      "    return () => { active = false; };\n" +
      "  }, []);\n\n" +
      "  useEffect(() => { categoryRef.current?.focus(); }, []);\n" +
      "  const categories = ['all', ...Array.from(new Set(products.map((p) => p.category))).sort()];\n" +
      "  const visible = selectedCategory === 'all' ? products : products.filter((p) => p.category === selectedCategory);\n" +
      "  return <main>{status === 'ready' && <select ref={categoryRef} value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>{categories.map((c) => <option key={c} value={c}>{c}</option>)}</select>}{visible.map((p) => <article key={p.id}><h2>{p.title}</h2><p>{p.price}</p></article>)}</main>;\n" +
      "}",
    hint: "קטגוריות לא נכתבות ידנית. בונים אותן מהמוצרים שחזרו מה-API.",
    explanation: "המשימה בודקת הפרדה בין side effect לרינדור, derived data, select controlled וטיפול בסיסי בכשל רשת.",
  },
  {
    id: "build_homework_react_ts_budget_manager",
    homeworkTemplateId: "react_ts_budget",
    sourceGroup: "homework_exam_mode",
    sourceIds: ["hw_react_ts_budget", "hw_ts_1"],
    conceptKey: "lesson_27::Transaction",
    topicId: HOMEWORK_EXAM_TOPIC_ID,
    level: 6,
    scoreRole: "project",
    scorePoints: 70,
    durationMinutes: 90,
    title: "React + TS Budget Manager",
    prompt:
      "בנה React+TS+Tailwind Budget Manager: type Transaction, הוספה/צפייה/עריכת תיאור/מחיקה, סיכום הכנסות, הוצאות, savings, ופירוט הוצאות לפי קטגוריה. התחל מרשימה ריקה או מנתונים שהמשתמש מזין.",
    starter:
      "type Transaction = {\n  id: string;\n  amount: number;\n  type: 'income' | 'expense';\n  category: string;\n  description: string;\n  date: string;\n};\n\nfunction BudgetManager() {\n  // transactions state + derived totals\n}",
    tests: [
      { regex: "type\\s+Transaction|interface\\s+Transaction", description: "מגדיר Transaction", flags: "" },
      { regex: "income|expense", description: "מבחין בין הכנסה להוצאה", flags: "i" },
      { regex: "useState", description: "state לטרנזקציות וטופס", flags: "" },
      { regex: "\\.reduce\\(", description: "totals ו-category breakdown עם reduce", flags: "" },
      { regex: "\\.map\\(", description: "עריכה immutable עם map", flags: "" },
      { regex: "\\.filter\\(", description: "מחיקה immutable עם filter", flags: "" },
      { regex: "savings|balance|חיסכון", description: "מציג חיסכון/יתרה", flags: "i" },
      { regex: "category", description: "פירוט לפי קטגוריה", flags: "i" },
    ],
    reference:
      "type Transaction = {\n" +
      "  id: string;\n" +
      "  amount: number;\n" +
      "  type: 'income' | 'expense';\n" +
      "  category: string;\n" +
      "  description: string;\n" +
      "  date: string;\n" +
      "};\n\n" +
      "function transactionId(tx: Omit<Transaction, 'id'>) {\n" +
      "  const key = [tx.amount, tx.type, tx.category, tx.description, tx.date].join('|');\n" +
      "  let hash = 0;\n" +
      "  for (let index = 0; index < key.length; index += 1) hash = (hash * 33 + key.charCodeAt(index)) >>> 0;\n" +
      "  return `tx-${hash.toString(36)}`;\n" +
      "}\n\n" +
      "const [transactions, setTransactions] = useState<Transaction[]>([]);\n" +
      "const totals = transactions.reduce((acc, tx) => {\n" +
      "  if (tx.type === 'income') acc.income += tx.amount;\n" +
      "  else { acc.expense += tx.amount; acc.byCategory[tx.category] = (acc.byCategory[tx.category] || 0) + tx.amount; }\n" +
      "  acc.savings = acc.income - acc.expense;\n" +
      "  return acc;\n" +
      "}, { income: 0, expense: 0, savings: 0, byCategory: {} as Record<string, number> });\n\n" +
      "function addTransaction(input: Omit<Transaction, 'id'>) {\n" +
      "  setTransactions((current) => [{ ...input, id: transactionId(input) }, ...current]);\n" +
      "}\n" +
      "function editDescription(id: string, description: string) {\n" +
      "  setTransactions((current) => current.map((tx) => tx.id === id ? { ...tx, description } : tx));\n" +
      "}\n" +
      "function deleteTransaction(id: string) {\n" +
      "  setTransactions((current) => current.filter((tx) => tx.id !== id));\n" +
      "}",
    hint: "אין צורך בנתוני פתיחה מומצאים. רשימה ריקה היא מצב תקין; המשתמש מוסיף טרנזקציות.",
    explanation: "המשימה בודקת types, immutable CRUD, derived state וסיכום קטגוריות בלי לשמור חישובים כפולים ב-state.",
  },
  {
    id: "build_homework_typescript_core",
    homeworkTemplateId: "typescript_core",
    sourceGroup: "homework_exam_mode",
    sourceIds: ["hw_ts_1"],
    conceptKey: "lesson_27::Book",
    topicId: HOMEWORK_EXAM_TOPIC_ID,
    level: 6,
    scoreRole: "project",
    scorePoints: 70,
    durationMinutes: 60,
    title: "TypeScript Core: Books + Users",
    prompt:
      "כתוב קובץ TypeScript לפי TS 1: Book type, Genre enum עם 5 ז'אנרים, addBook, searchByGenre, updateAvailability, BaseUser, GuestUser, RegisteredUser, User union, displayUserInfo ו-updateUserProfile עם type narrowing.",
    starter:
      "enum Genre {\n  // Fiction, NonFiction, Biography, ScienceFiction, Fantasy\n}\n\ntype Book = {\n  // title, author, publishedDate, available, genre\n};",
    tests: [
      { regex: "enum\\s+Genre", description: "Genre enum", flags: "" },
      { regex: "type\\s+Book", description: "Book type", flags: "" },
      { regex: "function\\s+addBook", description: "addBook", flags: "" },
      { regex: "function\\s+searchByGenre", description: "searchByGenre", flags: "" },
      { regex: "function\\s+updateAvailability", description: "updateAvailability", flags: "" },
      { regex: "interface\\s+BaseUser", description: "BaseUser interface", flags: "" },
      { regex: "GuestUser", description: "GuestUser", flags: "" },
      { regex: "RegisteredUser", description: "RegisteredUser", flags: "" },
      { regex: "in\\s+\\w+|user\\.type|kind", description: "type narrowing", flags: "" },
    ],
    reference:
      "enum Genre { Fiction = 'Fiction', NonFiction = 'NonFiction', Biography = 'Biography', ScienceFiction = 'ScienceFiction', Fantasy = 'Fantasy' }\n\n" +
      "type Book = { title: string; author: string; publishedDate: string; available: boolean; genre: Genre };\n\n" +
      "function addBook(books: Book[], book: Book): Book[] { return [...books, book]; }\n" +
      "function searchByGenre(books: Book[], genre: Genre): Book[] { return books.filter((book) => book.genre === genre); }\n" +
      "function updateAvailability(books: Book[], title: string, available: boolean): Book[] {\n" +
      "  return books.map((book) => book.title === title ? { ...book, available } : book);\n" +
      "}\n\n" +
      "interface BaseUser { id: string; username: string; email: string }\n" +
      "interface GuestUser extends BaseUser { guestSessionId: string }\n" +
      "interface RegisteredUser extends BaseUser { profile: string; lastLogin: string }\n" +
      "type User = GuestUser | RegisteredUser;\n\n" +
      "function displayUserInfo(user: User): string {\n" +
      "  return 'guestSessionId' in user ? user.guestSessionId : user.profile;\n" +
      "}\n" +
      "function updateUserProfile(user: User, update: Pick<RegisteredUser, 'profile'>): RegisteredUser {\n" +
      "  if (!('profile' in user)) throw new Error('RegisteredUser required');\n" +
      "  return { ...user, ...update };\n" +
      "}",
    hint: "הפונקציות מחזירות מערכים חדשים. אין mutation של books או user.",
    explanation: "זה מרכז המבחן התאורטי-מעשי: type, enum, interface extension, union ו-narrowing.",
  },
  {
    id: "build_homework_node_mongo_api",
    homeworkTemplateId: "node_mongo_api",
    sourceGroup: "homework_exam_mode",
    sourceIds: ["hw_node_mongo_tasks", "hw_employee_schema"],
    conceptKey: "lesson_20::Mongoose",
    topicId: HOMEWORK_EXAM_TOPIC_ID,
    level: 6,
    scoreRole: "project",
    scorePoints: 70,
    durationMinutes: 90,
    title: "Node + Mongo API: Tasks + Employee operations",
    prompt:
      "בנה Express server שמתחבר ל-MongoDB עם Mongoose. חובה: Task schema עם title, description, status, createdAt; GET /tasks; POST /tasks. בנוסף Employee schema עם name, department, age, salary ופעולות add employee, delete older than age, rename department.",
    starter:
      "const express = require('express');\nconst mongoose = require('mongoose');\n\n// Task schema/model\n// Employee schema/model\n// GET /tasks\n// POST /tasks",
    tests: [
      { regex: "express\\(", description: "Express app", flags: "" },
      { regex: "mongoose\\.connect", description: "חיבור Mongoose", flags: "" },
      { regex: "new\\s+mongoose\\.Schema", description: "Schema", flags: "" },
      { regex: "status.*todo|in-progress|done", description: "Task status enum", flags: "is" },
      { regex: "app\\.get\\(['\"]/tasks", description: "GET /tasks", flags: "" },
      { regex: "app\\.post\\(['\"]/tasks", description: "POST /tasks", flags: "" },
      { regex: "Employee", description: "Employee model", flags: "" },
      { regex: "deleteMany", description: "מחיקת עובדים מעל גיל", flags: "" },
      { regex: "updateMany", description: "שינוי שם מחלקה", flags: "" },
    ],
    reference:
      "const app = express();\n" +
      "app.use(express.json());\n" +
      "await mongoose.connect(process.env.MONGO_URI);\n\n" +
      "const taskSchema = new mongoose.Schema({\n" +
      "  title: { type: String, required: true },\n" +
      "  description: { type: String, required: true },\n" +
      "  status: { type: String, enum: ['todo', 'in-progress', 'done'], default: 'todo' },\n" +
      "  createdAt: { type: Date, default: () => new Date() },\n" +
      "});\n" +
      "const Task = mongoose.model('Task', taskSchema);\n\n" +
      "app.get('/tasks', async (req, res) => { res.json(await Task.find().sort({ createdAt: -1 })); });\n" +
      "app.post('/tasks', async (req, res) => {\n" +
      "  const task = await Task.create({ title: req.body.title, description: req.body.description, status: req.body.status });\n" +
      "  res.status(201).json(task);\n" +
      "});\n\n" +
      "const employeeSchema = new mongoose.Schema({ name: String, department: String, age: Number, salary: Number });\n" +
      "const Employee = mongoose.model('Employee', employeeSchema);\n" +
      "async function addEmployee(input) { return Employee.create(input); }\n" +
      "async function deleteEmployeesOlderThan(age) { return Employee.deleteMany({ age: { $gt: age } }); }\n" +
      "async function renameDepartment(oldName, newName) { return Employee.updateMany({ department: oldName }, { $set: { department: newName } }); }",
    hint: "אל תזריע משימות. ה-DB מתחיל ריק, GET מחזיר את מה שבאמת נשמר.",
    explanation: "המשימה בודקת שרת JSON בלבד, schema/model, CRUD בסיסי ופעולות MongoDB לפי תנאי.",
  },
  {
    id: "build_homework_nextjs_dashboard",
    homeworkTemplateId: "nextjs_dashboard",
    sourceGroup: "homework_exam_mode",
    sourceIds: ["hw_next_dashboard", "hw_next_lesson"],
    conceptKey: "lesson_nextjs::App Router",
    topicId: HOMEWORK_EXAM_TOPIC_ID,
    level: 6,
    scoreRole: "project",
    scorePoints: 70,
    durationMinutes: 90,
    title: "Next.js Dashboard: App Router + nested routes",
    prompt:
      "בנה Task Management Dashboard ב-Next.js App Router ללא dynamic routes: /dashboard, /dashboard/projects, /dashboard/tasks, /dashboard/tasks/create, /dashboard/settings. השתמש ב-Tailwind ו-shadcn/ui בלבד, כולל Sidebar, Header, Cards, Table, Tabs, Form/Input/Select/Badge, וסמן מוכנות GitHub Public + Vercel.",
    starter:
      "app/dashboard/layout.tsx\napp/dashboard/page.tsx\napp/dashboard/projects/page.tsx\napp/dashboard/tasks/page.tsx\napp/dashboard/tasks/create/page.tsx\napp/dashboard/settings/page.tsx",
    tests: [
      { regex: "app/dashboard/layout", description: "layout משותף ל-dashboard", flags: "i" },
      { regex: "app/dashboard/page", description: "dashboard route", flags: "i" },
      { regex: "app/dashboard/projects/page", description: "projects route", flags: "i" },
      { regex: "app/dashboard/tasks/page", description: "tasks route", flags: "i" },
      { regex: "app/dashboard/tasks/create/page", description: "create task route", flags: "i" },
      { regex: "app/dashboard/settings/page", description: "settings route", flags: "i" },
      { regex: "Table|Tabs|Badge|Form|Input|Select", description: "shadcn/ui primitives", flags: "" },
      { regex: "Vercel|GitHub", description: "מוכנות deploy והגשה", flags: "i" },
    ],
    reference:
      "app/dashboard/layout.tsx\n" +
      "export default function DashboardLayout({ children }: { children: React.ReactNode }) {\n" +
      "  return <div className='min-h-screen grid grid-cols-[240px_1fr]'><Sidebar /><main><Header />{children}</main></div>;\n" +
      "}\n\n" +
      "app/dashboard/page.tsx\n" +
      "export default function DashboardPage() { return <><Card>Total Tasks</Card><Card>Completed Tasks</Card><Badge>In Progress</Badge></>; }\n\n" +
      "app/dashboard/projects/page.tsx\n" +
      "export default function ProjectsPage() { return <Table>{/* projects from user-created data */}</Table>; }\n\n" +
      "app/dashboard/tasks/page.tsx\n" +
      "type Task = { name: string; project: string; status: 'completed' | 'in-progress'; priority: 'low' | 'medium' | 'high' };\n" +
      "const tasks: Task[] = [];\n" +
      "export default function TasksPage() {\n" +
      "  return <Tabs defaultValue='all'><TabsList><TabsTrigger value='all'>All</TabsTrigger><TabsTrigger value='completed'>Completed</TabsTrigger><TabsTrigger value='in-progress'>In Progress</TabsTrigger></TabsList><Table>{/* render tasks or empty state */}</Table></Tabs>;\n" +
      "}\n\n" +
      "app/dashboard/tasks/create/page.tsx\n" +
      "export default function CreateTaskPage() {\n" +
      "  return <Form>{/* Input, Textarea, Select project/status/priority, Create Task button */}</Form>;\n" +
      "}\n\n" +
      "app/dashboard/settings/page.tsx\n" +
      "export default function SettingsPage() { return <Form>{/* Username, Email, Theme, Save */}</Form>; }\n\n" +
      "Deployment checklist: GitHub Public repository and Vercel production deployment verified.",
    hint: "אין צורך להמציא משימות או פרויקטים. אם אין backend עדיין, הצג empty state מכובד ו-form מלא.",
    explanation: "המשימה בודקת App Router, nested routing, layout משותף, shadcn/ui, table/tabs/forms ו-deploy readiness.",
  },
  {
    id: "build_homework_react_smart_house",
    homeworkTemplateId: "react_smart_house",
    sourceGroup: "homework_exam_mode",
    sourceIds: ["hw_smart_house", "lesson_23_slides"],
    conceptKey: "lesson_23::Routes",
    topicId: HOMEWORK_EXAM_TOPIC_ID,
    level: 6,
    scoreRole: "project",
    scorePoints: 70,
    durationMinutes: 90,
    title: "React Router: Smart House",
    prompt:
      "בנה React Smart House לפי שיעורי בית 23: routes לעמוד בית, add room, room details לפי id/name, הוספת devices לחדר, רשימת חדרים, ולידציות לקלטים, וניווט דרך Navbar/Link/useNavigate.",
    starter:
      "function App() {\n  return <BrowserRouter><Routes>{/* /, /addroom, /room/:roomId */}</Routes></BrowserRouter>;\n}\n\n// Room shape: { id, name, type, color, devices }\n// Device shape: { id, name, type }",
    tests: [
      { regex: "BrowserRouter", description: "משתמש ב-BrowserRouter", flags: "" },
      { regex: "Routes", description: "מגדיר Routes", flags: "" },
      { regex: "Route", description: "מגדיר Route לכל מסך", flags: "" },
      { regex: "useParams", description: "קורא roomId/roomName מעמוד חדר", flags: "" },
      { regex: "useNavigate", description: "ניווט אחרי הוספת חדר", flags: "" },
      { regex: "AddRoom", description: "קומפוננטת AddRoom", flags: "" },
      { regex: "AddDevice", description: "קומפוננטת AddDevice", flags: "" },
      { regex: "devices", description: "ניהול devices בתוך room", flags: "i" },
      { regex: "validation|validate|error|alert", description: "ולידציות לקלט", flags: "i" },
      { regex: "\\.map\\(", description: "עדכון immutable של חדרים", flags: "" },
    ],
    reference:
      "function stableId(parts) {\n" +
      "  const key = parts.join('|').toLowerCase();\n" +
      "  let hash = 0;\n" +
      "  for (let index = 0; index < key.length; index += 1) hash = (hash * 31 + key.charCodeAt(index)) >>> 0;\n" +
      "  return `id-${hash.toString(36)}`;\n" +
      "}\n\n" +
      "function App() {\n" +
      "  const [rooms, setRooms] = useState([]);\n" +
      "  return <BrowserRouter><Navbar /><Routes><Route path='/' element={<Home rooms={rooms} />} /><Route path='/addroom' element={<AddRoom setRooms={setRooms} />} /><Route path='/room/:roomId' element={<RoomDetails rooms={rooms} setRooms={setRooms} />} /></Routes></BrowserRouter>;\n" +
      "}\n\n" +
      "function AddRoom({ setRooms }) {\n" +
      "  const navigate = useNavigate();\n" +
      "  function validate(room) {\n" +
      "    if (!room.name.trim()) return 'Room name is required';\n" +
      "    if (!room.type.trim()) return 'Room type is required';\n" +
      "    if (!room.color.trim()) return 'Room color is required';\n" +
      "    return '';\n" +
      "  }\n" +
      "  function submit(room) {\n" +
      "    const error = validate(room);\n" +
      "    if (error) { alert(error); return; }\n" +
      "    const nextRoom = { ...room, id: stableId([room.name, room.type, room.color]), devices: [] };\n" +
      "    setRooms((current) => [...current, nextRoom]);\n" +
      "    navigate(`/room/${nextRoom.id}`);\n" +
      "  }\n" +
      "  return <form onSubmit={(event) => { event.preventDefault(); }}><button>AddRoom</button></form>;\n" +
      "}\n\n" +
      "function RoomDetails({ rooms, setRooms }) {\n" +
      "  const { roomId } = useParams();\n" +
      "  const room = rooms.find((item) => item.id === roomId);\n" +
      "  if (!room) return <p>Room not found</p>;\n" +
      "  function AddDevice(device) {\n" +
      "    if (!device.name.trim() || !device.type.trim()) { alert('Device fields are required'); return; }\n" +
      "    const nextDevice = { ...device, id: stableId([room.id, device.name, device.type]) };\n" +
      "    setRooms((current) => current.map((item) => item.id === room.id ? { ...item, devices: [...item.devices, nextDevice] } : item));\n" +
      "  }\n" +
      "  return <section><h2>{room.name}</h2>{room.devices.map((device) => <p key={device.id}>{device.name}</p>)}<DeviceForm onSubmit={AddDevice} /></section>;\n" +
      "}",
    hint: "התחל מרשימת חדרים ריקה. הנתונים מגיעים רק מהטפסים של המשתמש.",
    explanation: "המשימה בודקת Router, params, navigation, nested state, forms, validations ועדכון immutable של מערך אובייקטים.",
  },
  {
    id: "build_homework_movie_rating_project",
    homeworkTemplateId: "movie_rating",
    sourceGroup: "homework_exam_mode",
    sourceIds: ["hw_movie_project_25", "lesson_25_slides"],
    conceptKey: "lesson_25::Tailwind CSS",
    topicId: HOMEWORK_EXAM_TOPIC_ID,
    level: 6,
    scoreRole: "project",
    scorePoints: 70,
    durationMinutes: 100,
    title: "Best Movie: Rating project",
    prompt:
      "בנה Best Movie לפי פרויקט 25: routes home/add/delete/search, הוספת סרט עם שם באנגלית ותיאור עד 200 תווים, rating 1-5, חישוב average, top 3 לפי average rating, חיפוש חלקי, מחיקה לפי שם מלא, ו-5 סרטים מוצגים בבחירה דטרמיניסטית מתוך הסרטים הקיימים.",
    starter:
      "type Movie = { id: string; title: string; description: string; imageUrl?: string; ratings: number[] };\n\nfunction App() {\n  // BrowserRouter routes: /, /add, /delete, /search\n}",
    tests: [
      { regex: "BrowserRouter", description: "משתמש ב-BrowserRouter", flags: "" },
      { regex: "Routes", description: "מגדיר routes", flags: "" },
      { regex: "AddMovie", description: "עמוד AddMovie", flags: "" },
      { regex: "DeleteMovie", description: "עמוד DeleteMovie", flags: "" },
      { regex: "SearchMovie", description: "עמוד SearchMovie", flags: "" },
      { regex: "averageRating", description: "חישוב average rating", flags: "" },
      { regex: "topMovies", description: "top 3 movies", flags: "" },
      { regex: "deterministicFeaturedMovies", description: "בחירת 5 סרטים דטרמיניסטית", flags: "" },
      { regex: "rating", description: "דירוג 1-5", flags: "i" },
      { regex: "className", description: "Tailwind/classes ל-layout", flags: "" },
    ],
    reference:
      "function stableMovieId(movie) {\n" +
      "  const key = [movie.title, movie.description, movie.imageUrl || ''].join('|').toLowerCase();\n" +
      "  let hash = 0;\n" +
      "  for (let index = 0; index < key.length; index += 1) hash = (hash * 33 + key.charCodeAt(index)) >>> 0;\n" +
      "  return `movie-${hash.toString(36)}`;\n" +
      "}\n\n" +
      "function normalizeTitle(title) {\n" +
      "  return title.trim().toLowerCase().split(' ').filter(Boolean).map((word) => word[0].toUpperCase() + word.slice(1)).join(' ');\n" +
      "}\n\n" +
      "function validateMovie(input) {\n" +
      "  if (!/^[A-Za-z ]+$/.test(input.title.trim())) return 'Movie name must be English letters';\n" +
      "  if (!/^[A-Za-z0-9 ,.?!'-]+$/.test(input.description.trim())) return 'Description must be English';\n" +
      "  if (input.description.trim().length > 200) return 'Description max length is 200';\n" +
      "  return '';\n" +
      "}\n\n" +
      "function averageRating(movie) {\n" +
      "  return movie.ratings.length ? movie.ratings.reduce((sum, rating) => sum + rating, 0) / movie.ratings.length : 0;\n" +
      "}\n\n" +
      "function topMovies(movies) {\n" +
      "  return [...movies].sort((a, b) => averageRating(b) - averageRating(a) || a.title.localeCompare(b.title)).slice(0, 3);\n" +
      "}\n\n" +
      "function deterministicFeaturedMovies(movies, seedIndex = 0) {\n" +
      "  const sorted = [...movies].sort((a, b) => a.title.localeCompare(b.title));\n" +
      "  if (sorted.length <= 5) return sorted;\n" +
      "  return Array.from({ length: 5 }, (_, index) => sorted[(seedIndex + index) % sorted.length]);\n" +
      "}\n\n" +
      "function AddMovie({ setMovies }) {\n" +
      "  function submit(input) {\n" +
      "    const error = validateMovie(input);\n" +
      "    if (error) { alert(error); return; }\n" +
      "    const movie = { ...input, title: normalizeTitle(input.title), ratings: [], id: stableMovieId(input) };\n" +
      "    setMovies((current) => [...current, movie]);\n" +
      "  }\n" +
      "  return <form className='grid gap-4'><button>AddMovie</button></form>;\n" +
      "}\n\n" +
      "function rateMovie(movieId, rating, setMovies) {\n" +
      "  if (!Number.isInteger(rating) || rating < 1 || rating > 5) throw new Error('rating must be 1-5');\n" +
      "  setMovies((current) => current.map((movie) => movie.id === movieId ? { ...movie, ratings: [...movie.ratings, rating] } : movie));\n" +
      "}\n\n" +
      "function SearchMovie({ movies, query }) { return <section>{movies.filter((movie) => movie.title.toLowerCase().includes(query.trim().toLowerCase())).map((movie) => <article key={movie.id}>{movie.title}</article>)}</section>; }\n" +
      "function DeleteMovie({ setMovies, title }) { return <button onClick={() => setMovies((current) => current.filter((movie) => movie.title !== normalizeTitle(title)))}>DeleteMovie</button>; }\n" +
      "function App() { return <BrowserRouter><Routes><Route path='/' element={<Home />} /><Route path='/add' element={<AddMovie />} /><Route path='/delete' element={<DeleteMovie />} /><Route path='/search' element={<SearchMovie />} /></Routes></BrowserRouter>; }",
    hint: "אם אין סרטים עדיין, home מציג empty state. אין ליצור סרטים מומצאים רק כדי למלא את המסך.",
    explanation: "המשימה בודקת routing מלא, CRUD פרונטאנד, derived averages, Tailwind layout, ולידציות ובחירה דטרמיניסטית במקום אקראיות.",
  },
];

var HOMEWORK_EXAM_TS_FILL_QUESTIONS = [
  {
    id: "fill_homework_ts_book_type",
    homeworkQuestionRole: HOMEWORK_TS_ROLE,
    sourceGroup: "homework_exam_mode",
    sourceIds: ["hw_ts_1"],
    topicId: HOMEWORK_EXAM_TOPIC_ID,
    conceptKey: "lesson_27::Book",
    level: 5,
    scoreRole: "typescript",
    scorePoints: 10,
    code: "type Book = {\n  title: string;\n  author: string;\n  publishedDate: string;\n  available: boolean;\n  ____: Genre;\n};",
    answer: "genre",
    explanation: "Book חייב לכלול genre מטיפוס Genre לפי שיעורי בית TS 1.",
  },
  {
    id: "fill_homework_ts_genre_enum",
    homeworkQuestionRole: HOMEWORK_TS_ROLE,
    sourceGroup: "homework_exam_mode",
    sourceIds: ["hw_ts_1"],
    topicId: HOMEWORK_EXAM_TOPIC_ID,
    conceptKey: "lesson_27::Genre",
    level: 5,
    scoreRole: "typescript",
    scorePoints: 10,
    code: "enum Genre {\n  Fiction = 'Fiction',\n  NonFiction = 'NonFiction',\n  Biography = 'Biography',\n  ScienceFiction = 'ScienceFiction',\n  ____ = 'Fantasy'\n}",
    answer: "Fantasy",
    explanation: "המקור דורש לפחות 5 ז'אנרים ובהם Fantasy.",
  },
  {
    id: "fill_homework_ts_add_book_return",
    homeworkQuestionRole: HOMEWORK_TS_ROLE,
    sourceGroup: "homework_exam_mode",
    sourceIds: ["hw_ts_1"],
    topicId: HOMEWORK_EXAM_TOPIC_ID,
    conceptKey: "lesson_27::CRUD",
    level: 5,
    scoreRole: "typescript",
    scorePoints: 10,
    code: "function addBook(books: Book[], book: Book): Book[] {\n  return [____, book];\n}",
    answer: "...books",
    explanation: "הוספה immutable מחזירה מערך חדש ולא משנה את books המקורי.",
  },
  {
    id: "fill_homework_ts_search_by_genre",
    homeworkQuestionRole: HOMEWORK_TS_ROLE,
    sourceGroup: "homework_exam_mode",
    sourceIds: ["hw_ts_1"],
    topicId: HOMEWORK_EXAM_TOPIC_ID,
    conceptKey: "lesson_27::Genre",
    level: 5,
    scoreRole: "typescript",
    scorePoints: 10,
    code: "function searchByGenre(books: Book[], genre: Genre): Book[] {\n  return books.____((book) => book.genre === genre);\n}",
    answer: "filter",
    explanation: "filter מחזיר את כל הספרים בז'אנר המבוקש.",
  },
  {
    id: "fill_homework_ts_update_availability",
    homeworkQuestionRole: HOMEWORK_TS_ROLE,
    sourceGroup: "homework_exam_mode",
    sourceIds: ["hw_ts_1"],
    topicId: HOMEWORK_EXAM_TOPIC_ID,
    conceptKey: "lesson_27::Book",
    level: 6,
    scoreRole: "typescript",
    scorePoints: 10,
    code: "function updateAvailability(books: Book[], title: string, available: boolean): Book[] {\n  return books.map((book) => book.title === title ? { ____book, available } : book);\n}",
    answer: "...",
    explanation: "spread שומר את שאר שדות הספר ומעדכן רק available.",
  },
  {
    id: "fill_homework_ts_user_union",
    homeworkQuestionRole: HOMEWORK_TS_ROLE,
    sourceGroup: "homework_exam_mode",
    sourceIds: ["hw_ts_1"],
    topicId: HOMEWORK_EXAM_TOPIC_ID,
    conceptKey: "lesson_27::User",
    level: 6,
    scoreRole: "typescript",
    scorePoints: 10,
    code: "interface GuestUser extends BaseUser { guestSessionId: string }\ninterface RegisteredUser extends BaseUser { profile: string; lastLogin: string }\ntype User = GuestUser ____ RegisteredUser;",
    answer: "|",
    explanation: "User הוא union: או GuestUser או RegisteredUser.",
  },
  {
    id: "fill_homework_ts_type_narrowing",
    homeworkQuestionRole: HOMEWORK_TS_ROLE,
    sourceGroup: "homework_exam_mode",
    sourceIds: ["hw_ts_1"],
    topicId: HOMEWORK_EXAM_TOPIC_ID,
    conceptKey: "lesson_27::Type Narrowing",
    level: 6,
    scoreRole: "typescript",
    scorePoints: 10,
    code: "function displayUserInfo(user: User): string {\n  if ('guestSessionId' ____ user) return user.guestSessionId;\n  return user.profile;\n}",
    answer: "in",
    explanation: "האופרטור in מצר את הטיפוס לפי קיום שדה ייחודי.",
  },
  {
    id: "fill_homework_ts_registered_update",
    homeworkQuestionRole: HOMEWORK_TS_ROLE,
    sourceGroup: "homework_exam_mode",
    sourceIds: ["hw_ts_1"],
    topicId: HOMEWORK_EXAM_TOPIC_ID,
    conceptKey: "lesson_27::RegisteredUser",
    level: 6,
    scoreRole: "typescript",
    scorePoints: 10,
    code: "function updateUserProfile(user: User, profile: string): RegisteredUser {\n  if (!('profile' in user)) throw new Error('RegisteredUser required');\n  return { ____user, profile };\n}",
    answer: "...",
    explanation: "אחרי narrowing ל-RegisteredUser, spread מחזיר משתמש רשום עם profile חדש.",
  },
];

var HOMEWORK_EXAM_TEMPLATES = [
  {
    id: "react_students",
    examTemplateId: "homework_react_students",
    sourceIds: ["hw_react_students"],
    buildQuestionId: "build_homework_react_students_table",
    title: "React Basics: Students table",
    stack: ["Vite", "React", "useState"],
    durationMinutes: 75,
    checklist: ["students.js מהמקור", "Header/Dashboard/Footer", "טבלת Students", "AddStudent form", "id דטרמיניסטי לסטודנט חדש", "אין נתוני פתיחה שלא מופיעים במקור"],
    followUps: ["מה ההבדל בין props ל-state?", "למה לא עושים push ל-state array?", "איך היית מפריד Dashboard לרכיבי Row/Table?"],
  },
  {
    id: "react_smart_house",
    examTemplateId: "homework_react_smart_house",
    sourceIds: ["hw_smart_house", "lesson_23_slides"],
    buildQuestionId: "build_homework_react_smart_house",
    title: "React Router Smart House",
    stack: ["React", "React Router", "useParams", "useNavigate"],
    durationMinutes: 90,
    checklist: ["BrowserRouter/Routes/Route", "Home rooms list", "AddRoom form", "Room details route", "AddDevice per room", "validations before submit", "empty state", "אין חדרים או מכשירים מומצאים"],
    followUps: ["למה roomId צריך להיות דטרמיניסטי?", "איפה נכון לשמור devices?", "איך תמנע מעבר route אחרי validation כושל?"],
  },
  {
    id: "react_api_filter",
    examTemplateId: "homework_react_api_filter",
    sourceIds: ["hw_products_api"],
    buildQuestionId: "build_homework_react_products_filter",
    title: "React API Filter",
    stack: ["React", "useEffect", "useRef", "fetch"],
    durationMinutes: 70,
    checklist: ["fetch ל-dummyjson.com/products", "loading/error", "select קטגוריות מתוך הנתונים", "all category", "useRef focus", "אין רשימת קטגוריות ידנית"],
    followUps: ["למה useEffect עם dependency array ריק?", "מה cleanup מונע כאן?", "איך תמנע fetch כפול בפיתוח עם Strict Mode?"],
  },
  {
    id: "movie_rating",
    examTemplateId: "homework_movie_rating",
    sourceIds: ["hw_movie_project_25", "lesson_25_slides"],
    buildQuestionId: "build_homework_movie_rating_project",
    title: "Best Movie Rating Project",
    stack: ["React", "Router", "Tailwind", "Derived state"],
    durationMinutes: 100,
    checklist: ["routes: home/add/delete/search", "add movie validations", "rating 1-5", "average rating", "top 3 movies", "search partial name", "delete exact title", "5 featured movies deterministic", "אין נתוני סרטים מומצאים"],
    followUps: ["למה average הוא derived?", "איך מחליפים בחירה אקראית בבחירה דטרמיניסטית?", "איך תבדוק מחיקה לפי שם מלא?"],
  },
  {
    id: "react_ts_budget",
    examTemplateId: "homework_react_ts_budget",
    sourceIds: ["hw_react_ts_budget", "hw_ts_1"],
    buildQuestionId: "build_homework_react_ts_budget_manager",
    title: "React + TS Budget Manager",
    stack: ["React", "TypeScript", "Tailwind"],
    durationMinutes: 90,
    checklist: ["Transaction type", "add/view/edit/delete", "income total", "expense total", "savings", "category breakdown", "רשימה ריקה תקינה"],
    followUps: ["למה totals הם derived ולא state נפרד?", "איך type union מונע status לא חוקי?", "איך תבדוק עריכת description?"],
  },
  {
    id: "typescript_core",
    examTemplateId: "homework_typescript_core",
    sourceIds: ["hw_ts_1"],
    buildQuestionId: "build_homework_typescript_core",
    title: "TypeScript Core",
    stack: ["TypeScript"],
    durationMinutes: 60,
    checklist: ["Book type", "Genre enum", "addBook", "searchByGenre", "updateAvailability", "Base/Guest/Registered/User", "type narrowing"],
    followUps: ["מתי interface עדיף על type?", "איך in מצר union?", "למה updateAvailability מחזיר מערך חדש?"],
  },
  {
    id: "node_mongo_api",
    examTemplateId: "homework_node_mongo_api",
    sourceIds: ["hw_node_mongo_tasks", "hw_employee_schema"],
    buildQuestionId: "build_homework_node_mongo_api",
    title: "Node + Mongo API",
    stack: ["Node.js", "Express", "MongoDB", "Mongoose"],
    durationMinutes: 90,
    checklist: ["mongoose.connect", "Task schema", "GET /tasks", "POST /tasks", "Employee schema", "deleteMany by age", "updateMany department", "JSON only"],
    followUps: ["מה ההבדל בין Schema ל-Model?", "למה POST מחזיר 201?", "איך מטפלים ב-status לא חוקי?"],
  },
  {
    id: "nextjs_dashboard",
    examTemplateId: "homework_nextjs_dashboard",
    sourceIds: ["hw_next_dashboard", "hw_next_lesson"],
    buildQuestionId: "build_homework_nextjs_dashboard",
    title: "Next.js Dashboard",
    stack: ["Next.js", "App Router", "Tailwind", "shadcn/ui"],
    durationMinutes: 90,
    checklist: ["/dashboard", "/dashboard/projects", "/dashboard/tasks", "/dashboard/tasks/create", "/dashboard/settings", "layout משותף", "Table/Tabs/Form/Badge", "GitHub + Vercel readiness"],
    followUps: ["מה layout עושה ב-App Router?", "מתי צריך use client?", "למה אין dynamic routes במשימה הזאת?"],
  },
];

var HOMEWORK_EXAM_JS_BUILD_QUESTIONS = [
  {
    id: "build_homework_js_digit_length_sum",
    homeworkQuestionRole: HOMEWORK_JS_ROLE,
    sourceGroup: "homework_exam_mode",
    sourceIds: ["hw_js_screenshot", "exam_training_football"],
    topicId: HOMEWORK_EXAM_TOPIC_ID,
    conceptKey: "lesson_19::reduce",
    level: 5,
    scoreRole: "javascript",
    scorePoints: 20,
    durationMinutes: 20,
    title: "JS: סכום לפי אורך מספר",
    prompt: "כתוב פונקציה שמקבלת מערך מספרים ומחזירה object: key הוא אורך המספר, value הוא סכום המספרים באותו אורך. אם איבר אינו מספר - לזרוק Error ברור.",
    starter:
      "function sumByDigitLength(values) {\n  // return object: { digitLength: sum }\n  // throw Error if an item is not a number\n}",
    tests: [
      { regex: "function\\s+sumByDigitLength", description: "מגדיר sumByDigitLength", flags: "" },
      { regex: "\\.reduce\\(", description: "משתמש ב-reduce", flags: "" },
      { regex: "typeof\\s+\\w+\\s*!==\\s*['\"]number['\"]", description: "בודק שכל ערך הוא number", flags: "" },
      { regex: "Number\\.isNaN", description: "בודק NaN", flags: "" },
      { regex: "throw\\s+new\\s+Error", description: "זורק Error על קלט לא תקין", flags: "" },
      { regex: "String\\(|\\.length", description: "מחשב אורך ספרות", flags: "" },
    ],
    reference:
      "function sumByDigitLength(values) {\n" +
      "  return values.reduce((groups, value) => {\n" +
      "    if (typeof value !== 'number' || Number.isNaN(value)) throw new Error('All values must be numbers');\n" +
      "    const key = String(Math.abs(value)).length;\n" +
      "    groups[key] = (groups[key] || 0) + value;\n" +
      "    return groups;\n" +
      "  }, {});\n" +
      "}",
    hint: "המפתח הוא string כי object keys ב-JS נשמרים כמחרוזות. הערך הוא סכום כל המספרים באותו אורך.",
    explanation: "זו שאלת 20 נקודות JavaScript: accumulator object, reduce, validation ו-error handling.",
  },
  {
    id: "build_exam_js_sequence_classifier",
    homeworkQuestionRole: HOMEWORK_JS_ROLE,
    sourceGroup: "homework_exam_mode",
    sourceIds: ["exam_moed_a_helpme"],
    topicId: HOMEWORK_EXAM_TOPIC_ID,
    conceptKey: "lesson_19::array",
    level: 6,
    scoreRole: "javascript",
    scorePoints: 20,
    durationMinutes: 20,
    title: "JS: זיהוי סוג סדרה",
    prompt: "כתוב פונקציה שמקבלת מערך מספרים ומחזירה A לסדרה חשבונית, B לסדרה הנדסית, C לפיבונאצי ו-D לכל סדרה אחרת. אם הקלט אינו מערך או שאחד הערכים אינו מספר - זרוק Error ברור.",
    starter:
      "function classifySequence(values) {\n  // A arithmetic, B geometric, C fibonacci, D other\n}",
    tests: [
      { regex: "function\\s+classifySequence", description: "מגדיר classifySequence", flags: "" },
      { regex: "Array\\.isArray", description: "בודק שהקלט מערך", flags: "" },
      { regex: "throw\\s+new\\s+Error", description: "זורק Error על קלט לא תקין", flags: "" },
      { regex: "\\.every\\(", description: "בודק חוקיות סדרה עם every", flags: "" },
      { regex: "return\\s+['\"]A['\"]", description: "מחזיר A לחשבונית", flags: "" },
      { regex: "return\\s+['\"]B['\"]", description: "מחזיר B להנדסית", flags: "" },
      { regex: "return\\s+['\"]C['\"]", description: "מחזיר C לפיבונאצי", flags: "" },
      { regex: "return\\s+['\"]D['\"]", description: "מחזיר D לאחרת", flags: "" },
    ],
    reference:
      "function classifySequence(values) {\n" +
      "  if (!Array.isArray(values)) throw new Error('Input must be an array');\n" +
      "  values.forEach((value) => {\n" +
      "    if (typeof value !== 'number' || Number.isNaN(value)) throw new Error('All values must be numbers');\n" +
      "  });\n" +
      "  if (values.length < 3) return 'D';\n" +
      "  const diff = values[1] - values[0];\n" +
      "  const ratio = values[0] === 0 ? null : values[1] / values[0];\n" +
      "  const isArithmetic = values.every((value, index, array) => index === 0 || value - array[index - 1] === diff);\n" +
      "  const isGeometric = ratio !== null && values.every((value, index, array) => index === 0 || value / array[index - 1] === ratio);\n" +
      "  const isFibonacci = values.every((value, index, array) => index < 2 || value === array[index - 1] + array[index - 2]);\n" +
      "  if (isArithmetic) return 'A';\n" +
      "  if (isGeometric) return 'B';\n" +
      "  if (isFibonacci) return 'C';\n" +
      "  return 'D';\n" +
      "}",
    hint: "בודקים קודם תקינות קלט, אחר כך כל חוקיות בנפרד. סדר ההחזרה צריך להיות מפורש.",
    explanation: "זו תבנית JS קלאסית מהמבחנים: validation ואז זיהוי חוקיות במערך.",
  },
  {
    id: "build_exam_js_even_odd_unique_counter",
    homeworkQuestionRole: HOMEWORK_JS_ROLE,
    sourceGroup: "homework_exam_mode",
    sourceIds: ["exam_willing_2022"],
    topicId: HOMEWORK_EXAM_TOPIC_ID,
    conceptKey: "lesson_19::array",
    level: 5,
    scoreRole: "javascript",
    scorePoints: 20,
    durationMinutes: 20,
    title: "JS: even/odd לפי ערכים ייחודיים",
    prompt: "כתוב פונקציה שמקבלת מערך מספרים שלמים ומחזירה object עם even, odd, total. even/odd נספרים לפי מספרים ייחודיים בלבד, total הוא אורך המערך המקורי. אם איבר אינו מספר - זרוק Error.",
    starter:
      "function countEvenOddUnique(values) {\n  // return { even, odd, total }\n}",
    tests: [
      { regex: "function\\s+countEvenOddUnique", description: "מגדיר countEvenOddUnique", flags: "" },
      { regex: "new\\s+Set", description: "משתמש ב-Set לערכים שכבר נספרו", flags: "" },
      { regex: "\\.reduce\\(", description: "משתמש ב-reduce", flags: "" },
      { regex: "even", description: "מחזיר even", flags: "" },
      { regex: "odd", description: "מחזיר odd", flags: "" },
      { regex: "total", description: "מחזיר total", flags: "" },
      { regex: "throw\\s+new\\s+Error", description: "זורק Error על ערך לא מספרי", flags: "" },
    ],
    reference:
      "function countEvenOddUnique(values) {\n" +
      "  const seen = new Set();\n" +
      "  return values.reduce((counts, value) => {\n" +
      "    if (typeof value !== 'number' || Number.isNaN(value)) throw new Error('All values must be numbers');\n" +
      "    counts.total += 1;\n" +
      "    if (seen.has(value)) return counts;\n" +
      "    seen.add(value);\n" +
      "    if (value % 2 === 0) counts.even += 1;\n" +
      "    else counts.odd += 1;\n" +
      "    return counts;\n" +
      "  }, { even: 0, odd: 0, total: 0 });\n" +
      "}",
    hint: "total אינו מספר הערכים הייחודיים. הוא האורך המקורי של המערך.",
    explanation: "הנקודה שמפילה תלמידים היא ההפרדה בין total של כל הקלט לבין even/odd אחרי דילוג על כפילויות.",
  },
  {
    id: "build_exam_js_contiguous_sum_counter",
    homeworkQuestionRole: HOMEWORK_JS_ROLE,
    sourceGroup: "homework_exam_mode",
    sourceIds: ["exam_parking_2023"],
    topicId: HOMEWORK_EXAM_TOPIC_ID,
    conceptKey: "lesson_19::for",
    level: 6,
    scoreRole: "javascript",
    scorePoints: 20,
    durationMinutes: 20,
    title: "JS: ספירת רצפים שסכומם שווה יעד",
    prompt: "כתוב פונקציה שמקבלת מערך מספרים ומספר יעד, וסופרת כמה רצפים רציפים באורך לפחות 2 מסתכמים ליעד. אם איבר במערך או היעד אינם מספרים - זרוק Error.",
    starter:
      "function countSequencesWithSum(values, target) {\n  // contiguous sequences only, length >= 2\n}",
    tests: [
      { regex: "function\\s+countSequencesWithSum", description: "מגדיר countSequencesWithSum", flags: "" },
      { regex: "for\\s*\\(", description: "משתמש בלולאות", flags: "" },
      { regex: "start", description: "עובר על נקודת התחלה", flags: "" },
      { regex: "end", description: "עובר על נקודת סיום", flags: "" },
      { regex: "target", description: "משווה ליעד", flags: "" },
      { regex: "throw\\s+new\\s+Error", description: "זורק Error על קלט לא תקין", flags: "" },
    ],
    reference:
      "function countSequencesWithSum(values, target) {\n" +
      "  if (!Array.isArray(values) || typeof target !== 'number' || Number.isNaN(target)) throw new Error('Invalid input');\n" +
      "  values.forEach((value) => {\n" +
      "    if (typeof value !== 'number' || Number.isNaN(value)) throw new Error('All values must be numbers');\n" +
      "  });\n" +
      "  let count = 0;\n" +
      "  for (let start = 0; start < values.length; start += 1) {\n" +
      "    let sum = 0;\n" +
      "    for (let end = start; end < values.length; end += 1) {\n" +
      "      sum += values[end];\n" +
      "      if (end > start && sum === target) count += 1;\n" +
      "    }\n" +
      "  }\n" +
      "  return count;\n" +
      "}",
    hint: "רצף חייב להיות רציף ובאורך 2 לפחות, לכן end חייב להיות גדול מ-start.",
    explanation: "זו שאלת nested loops קלאסית: מצטברים תוך כדי הרחבת החלון ומוודאים מינימום אורך.",
  },
  {
    id: "build_exam_js_ordered_subsequence",
    homeworkQuestionRole: HOMEWORK_JS_ROLE,
    sourceGroup: "homework_exam_mode",
    sourceIds: ["exam_travel_moed_g"],
    topicId: HOMEWORK_EXAM_TOPIC_ID,
    conceptKey: "lesson_19::array",
    level: 5,
    scoreRole: "javascript",
    scorePoints: 20,
    durationMinutes: 20,
    title: "JS: מערך חלקי לפי סדר",
    prompt: "כתוב פונקציה שמקבלת מערך מלא ומערך חלקי, ומחזירה true אם כל ערכי החלקי מופיעים במלא באותו סדר, אחרת false. אין צורך לבדוק חריגות.",
    starter:
      "function containsOrderedSubsequence(full, partial) {\n  // order matters, values do not have to be adjacent\n}",
    tests: [
      { regex: "function\\s+containsOrderedSubsequence", description: "מגדיר containsOrderedSubsequence", flags: "" },
      { regex: "cursor", description: "משתמש במצביע למערך החלקי", flags: "" },
      { regex: "\\.length", description: "בודק השלמת כל החלקי", flags: "" },
      { regex: "return\\s+cursor\\s*===", description: "מחזיר true רק כשהכול נמצא", flags: "" },
    ],
    reference:
      "function containsOrderedSubsequence(full, partial) {\n" +
      "  let cursor = 0;\n" +
      "  for (let index = 0; index < full.length && cursor < partial.length; index += 1) {\n" +
      "    if (full[index] === partial[cursor]) cursor += 1;\n" +
      "  }\n" +
      "  return cursor === partial.length;\n" +
      "}",
    hint: "הדוגמאות מאפשרות 1,3,4 מתוך 1,2,3,4, לכן זו subsequence ולא רצף צמוד.",
    explanation: "הפתרון הנקי הוא two pointers: אחד רץ על המלא ואחד מתקדם רק כשיש התאמה.",
  },
  {
    id: "build_exam_js_matrix_frequency",
    homeworkQuestionRole: HOMEWORK_JS_ROLE,
    sourceGroup: "homework_exam_mode",
    sourceIds: ["exam_flight_control"],
    topicId: HOMEWORK_EXAM_TOPIC_ID,
    conceptKey: "lesson_19::array",
    level: 6,
    scoreRole: "javascript",
    scorePoints: 20,
    durationMinutes: 20,
    title: "JS: שכיחות מספרים במטריצה",
    prompt: "כתוב פונקציה שמקבלת מטריצה של מספרים ומחזירה מערך אובייקטים שכל אחד כולל num ו-count. אם ערך במטריצה אינו מספר - זרוק Error.",
    starter:
      "function matrixFrequency(matrix) {\n  // return [{ num, count }]\n}",
    tests: [
      { regex: "function\\s+matrixFrequency", description: "מגדיר matrixFrequency", flags: "" },
      { regex: "\\.forEach\\(", description: "עובר על שורות וערכים", flags: "" },
      { regex: "Object\\.entries", description: "ממיר object למערך", flags: "" },
      { regex: "num", description: "מחזיר num", flags: "" },
      { regex: "count", description: "מחזיר count", flags: "" },
      { regex: "throw\\s+new\\s+Error", description: "זורק Error על ערך לא מספרי", flags: "" },
    ],
    reference:
      "function matrixFrequency(matrix) {\n" +
      "  const counts = {};\n" +
      "  matrix.forEach((row) => {\n" +
      "    row.forEach((value) => {\n" +
      "      if (typeof value !== 'number' || Number.isNaN(value)) throw new Error('All values must be numbers');\n" +
      "      counts[value] = (counts[value] || 0) + 1;\n" +
      "    });\n" +
      "  });\n" +
      "  return Object.entries(counts).map(([num, count]) => ({ num: Number(num), count }));\n" +
      "}",
    hint: "object accumulator חוסך חיפוש חוזר בכל מספר.",
    explanation: "זו וריאציה על ספירת שכיחויות, רק שהקלט דו-ממדי.",
  },
  {
    id: "build_exam_js_binary_decimal_palindrome",
    homeworkQuestionRole: HOMEWORK_JS_ROLE,
    sourceGroup: "homework_exam_mode",
    sourceIds: ["exam_logistics_warehouse"],
    topicId: HOMEWORK_EXAM_TOPIC_ID,
    conceptKey: "lesson_19::Data Types",
    level: 6,
    scoreRole: "javascript",
    scorePoints: 20,
    durationMinutes: 20,
    title: "JS: בינארי לדצימלי ואז פלינדרום",
    prompt: "כתוב פונקציה שמקבלת מערך של 0 ו-1, ממירה אותו למספר דצימלי ומחזירה true אם המספר הדצימלי הוא פלינדרום, אחרת false.",
    starter:
      "function isBinaryDecimalPalindrome(bits) {\n  // binary array -> decimal -> palindrome boolean\n}",
    tests: [
      { regex: "function\\s+isBinaryDecimalPalindrome", description: "מגדיר isBinaryDecimalPalindrome", flags: "" },
      { regex: "\\.reduce\\(", description: "ממיר בינארי לדצימלי עם reduce", flags: "" },
      { regex: "\\*\\*|2", description: "משתמש בחזקות של 2", flags: "" },
      { regex: "\\.reverse\\(", description: "בודק פלינדרום דרך היפוך", flags: "" },
      { regex: "return", description: "מחזיר boolean", flags: "" },
    ],
    reference:
      "function isBinaryDecimalPalindrome(bits) {\n" +
      "  const decimal = bits.reduce((sum, bit, index, array) => {\n" +
      "    if (bit !== 0 && bit !== 1) throw new Error('Bits must be 0 or 1');\n" +
      "    const power = array.length - index - 1;\n" +
      "    return sum + (bit === 1 ? 2 ** power : 0);\n" +
      "  }, 0);\n" +
      "  const text = String(decimal);\n" +
      "  return text === text.split('').reverse().join('');\n" +
      "}",
    hint: "הפלינדרום נבדק על המספר הדצימלי אחרי ההמרה, לא על המערך הבינארי.",
    explanation: "התרגיל מחבר ייצוג בינארי, reduce, חזקה ובדיקת string.",
  },
  {
    id: "build_exam_js_fibonacci_position",
    homeworkQuestionRole: HOMEWORK_JS_ROLE,
    sourceGroup: "homework_exam_mode",
    sourceIds: ["exam_currency_converter"],
    topicId: HOMEWORK_EXAM_TOPIC_ID,
    conceptKey: "lesson_19::while",
    level: 5,
    scoreRole: "javascript",
    scorePoints: 20,
    durationMinutes: 20,
    title: "JS: מיקום בסדרה דמוית פיבונאצי",
    prompt: "כתוב פונקציה שמקבלת שני ערכי התחלה וערך סופי, ומחזירה את מיקום הערך הסופי בסדרת פיבונאצי שנבנית משני הערכים. לדוגמה 2, 5, 19 מחזיר 5 כי הסדרה היא 2,5,7,12,19.",
    starter:
      "function fibonacciPosition(first, second, finalValue) {\n  // return position starting from 1\n}",
    tests: [
      { regex: "function\\s+fibonacciPosition", description: "מגדיר fibonacciPosition", flags: "" },
      { regex: "while\\s*\\(", description: "מתקדם עד הערך הסופי", flags: "" },
      { regex: "position", description: "סופר מיקום", flags: "" },
      { regex: "previous", description: "שומר ערך קודם", flags: "" },
      { regex: "current", description: "שומר ערך נוכחי", flags: "" },
    ],
    reference:
      "function fibonacciPosition(first, second, finalValue) {\n" +
      "  [first, second, finalValue].forEach((value) => {\n" +
      "    if (typeof value !== 'number' || Number.isNaN(value)) throw new Error('All values must be numbers');\n" +
      "  });\n" +
      "  if (finalValue === first) return 1;\n" +
      "  if (finalValue === second) return 2;\n" +
      "  let previous = first;\n" +
      "  let current = second;\n" +
      "  let position = 2;\n" +
      "  while (current < finalValue) {\n" +
      "    const next = previous + current;\n" +
      "    previous = current;\n" +
      "    current = next;\n" +
      "    position += 1;\n" +
      "  }\n" +
      "  return current === finalValue ? position : -1;\n" +
      "}",
    hint: "המיקום מתחיל מ-1. אם הערך לא מופיע בדיוק בסדרה, מחזירים -1.",
    explanation: "זו שאלה על לולאה, עדכון שני משתנים ומניעת בלבול בין ערך לבין אינדקס.",
  },
  {
    id: "build_exam_js_sort_digits_without_sort",
    homeworkQuestionRole: HOMEWORK_JS_ROLE,
    sourceGroup: "homework_exam_mode",
    sourceIds: ["exam_bank_frontend"],
    topicId: HOMEWORK_EXAM_TOPIC_ID,
    conceptKey: "lesson_11::sort",
    level: 6,
    scoreRole: "javascript",
    scorePoints: 20,
    durationMinutes: 20,
    title: "JS: מיון ספרות בלי sort",
    prompt: "כתוב פונקציה שמקבלת מספר יחיד ומחזירה מספר חדש שהספרות שלו מסודרות מהקטן לגדול. אסור להשתמש ב-sort().",
    starter:
      "function sortDigitsAscending(value) {\n  // no sort()\n}",
    tests: [
      { regex: "function\\s+sortDigitsAscending", description: "מגדיר sortDigitsAscending", flags: "" },
      { regex: "Array\\(10\\)\\.fill", description: "סופר ספרות 0-9", flags: "" },
      { regex: "repeat", description: "בונה פלט לפי כמות כל ספרה", flags: "" },
      { regex: "Number\\(", description: "מחזיר מספר", flags: "" },
      { regex: "throw\\s+new\\s+Error", description: "זורק Error על קלט לא תקין", flags: "" },
    ],
    reference:
      "function sortDigitsAscending(value) {\n" +
      "  if (typeof value !== 'number' || !Number.isInteger(value)) throw new Error('Integer required');\n" +
      "  const sign = value < 0 ? -1 : 1;\n" +
      "  const counts = Array(10).fill(0);\n" +
      "  String(Math.abs(value)).split('').forEach((digit) => {\n" +
      "    counts[Number(digit)] += 1;\n" +
      "  });\n" +
      "  let output = '';\n" +
      "  for (let digit = 0; digit <= 9; digit += 1) {\n" +
      "    output += String(digit).repeat(counts[digit]);\n" +
      "  }\n" +
      "  return sign * Number(output);\n" +
      "}",
    hint: "במקום sort משתמשים בספירת מופעים של כל ספרה ואז בונים מספר מחדש.",
    explanation: "זו שאלת algorithm constraints: אסור להשתמש בכלי המובן מאליו, לכן עוברים לספירת תדירויות.",
  },
];

var HOMEWORK_JS_DRILLS = [
  {
    id: "js_digit_length_sum",
    buildQuestionId: "build_homework_js_digit_length_sum",
    sourceIds: ["hw_js_screenshot"],
    title: "JS: סכום לפי אורך מספר",
    prompt: "כתוב פונקציה שמקבלת מערך מספרים ומחזירה object: key הוא אורך המספר, value הוא סכום המספרים באותו אורך. אם איבר אינו מספר - לזרוק Error ברור.",
    input: [1, 15, 30, 5, 800],
    expected: { "1": 6, "2": 45, "3": 800 },
    reference: HOMEWORK_EXAM_JS_BUILD_QUESTIONS[0].reference,
    checklist: ["reduce", "typeof number", "Number.isNaN", "object accumulator", "negative numbers use Math.abs if asked"],
  },
];

var HOMEWORK_BASIC_DIAGNOSTIC_TRACKS = [
  {
    id: "basic_js_arrays",
    heat: 10,
    title: "JS בסיסי: פונקציה, מערך, object ו-Error",
    time: "30 דק׳",
    goal: "לוודא שאתה יודע לפתור את 20 נקודות JavaScript בלי להיתקע על מבנה הפונקציה.",
    passCriteria: "4/5 בדיקות מסומנות לפני מעבר ל-JS 20 המלא.",
    strengthenIfMissed: "אם חסרה בדיקה אחת: לפתור שוב את sumByDigitLength ואז even/odd unique.",
    checks: [
      { id: "signature", label: "אני יודע לכתוב חתימת פונקציה שמקבלת מערך ומחזירה object", evidence: "מסביר מה נכנס ומה יוצא לפני הקוד", reinforcement: "כתוב בעברית input/output ואז רק אחר כך קוד" },
      { id: "validation", label: "אני בודק שכל איבר הוא number ולא NaN", evidence: "יש typeof ו-Number.isNaN", reinforcement: "תרגל guard clause לפני חישוב" },
      { id: "accumulator", label: "אני יודע לבנות accumulator object עם key/value", evidence: "groups[key] מתעדכן בכל איטרציה", reinforcement: "פתור ספירת שכיחויות על מערך קטן" },
      { id: "error", label: "אני זורק Error ברור על קלט לא תקין", evidence: "throw new Error עם הודעה ספציפית", reinforcement: "אל תחזיר null/false כשמבקשים שגיאה" },
      { id: "exactShape", label: "אני מחזיר בדיוק את המבנה שהשאלה ביקשה", evidence: "{ '1': 6, '2': 45 } ולא מערך", reinforcement: "השווה את הפלט ידנית לדוגמה לפני מעבר" },
    ],
    steps: [
      "כתוב קודם דוגמת input/output.",
      "הוסף validation לפני כל חישוב.",
      "בחר reduce או loop אחד בלבד.",
      "בדוק ידנית על [1, 15, 30, 5, 800].",
      "אם עובד, עבור לשאלת JS נוספת בלי להסתכל בפתרון.",
    ],
    codeBlocks: [
      {
        title: "פתרון בסיסי ל-JS 20",
        code:
          "function sumByDigitLength(values) {\n" +
          "  return values.reduce((groups, value) => {\n" +
          "    if (typeof value !== 'number' || Number.isNaN(value)) {\n" +
          "      throw new Error('All values must be numbers');\n" +
          "    }\n" +
          "    const key = String(Math.abs(value)).length;\n" +
          "    groups[key] = (groups[key] || 0) + value;\n" +
          "    return groups;\n" +
          "  }, {});\n" +
          "}",
        overview: "זהו דפוס הליבה לשאלת JavaScript במבחן: עוברים על מערך, בודקים קלט, צוברים לתוך object ומחזירים מבנה מדויק.",
        lineByLine: [
          "השורה הראשונה מגדירה פונקציה בשם ברור שמקבלת values. כבר בשם רואים מה היא אמורה לעשות.",
          "reduce מתחיל accumulator בשם groups. זה האובייקט שנחזיר בסוף.",
          "בדיקת typeof ו-Number.isNaN מגנה על הפתרון לפני החישוב. אם ערך לא מספר, עוצרים מיד.",
          "throw new Error מתאים לדרישה במבחן: לא מתעלמים מקלט שבור ולא מחזירים פלט שקט.",
          "key הוא אורך הספרות של הערך. Math.abs מטפל גם במספר שלילי אם הבוחן בודק edge case.",
          "groups[key] מתעדכן לפי הסכום הקודם או 0 אם זו הפעם הראשונה שאורך כזה מופיע.",
          "return groups מחזיר את accumulator לאיטרציה הבאה.",
          "האובייקט הריק בסוף reduce הוא נקודת ההתחלה של הספירה.",
        ],
        focus: ["validation לפני חישוב", "object accumulator", "פלט exact shape", "אין אקראיות מובנית ואין נתונים מומצאים"],
        commonMistakes: ["להחזיר array במקום object", "לשכוח Number.isNaN", "לחשב אורך עם number.length", "לא לזרוק Error"],
        practice: "פתור עכשיו על [7, 44, 100, 2] ואז נסה קלט עם 'x' וודא שנזרקת שגיאה.",
      },
    ],
  },
  {
    id: "basic_react_state",
    heat: 9,
    title: "React בסיסי: state, props, map ו-list",
    time: "35 דק׳",
    goal: "לוודא שאתה יודע לבנות מסך React קטן לפני פרויקט 70 נקודות.",
    passCriteria: "5/6 בדיקות מסומנות לפני מעבר לפרויקט Students או Movie.",
    strengthenIfMissed: "אם חסר props/map/state: חזור ל-Students table לפני כל פרויקט אחר.",
    checks: [
      { id: "state", label: "אני יודע להחזיק רשימה ב-useState", evidence: "const [items, setItems] = useState([])", reinforcement: "תרגל add item לרשימה ריקה" },
      { id: "props", label: "אני מעביר נתונים לילד דרך props", evidence: "<StudentTable students={students} />", reinforcement: "כתוב קומפוננטת Table שמקבלת props בלבד" },
      { id: "map", label: "אני מציג רשימה עם map ו-key יציב", evidence: "students.map עם key={student.id}", reinforcement: "אל תשתמש ב-index אם הסדר יכול להשתנות" },
      { id: "controlled", label: "אני מחבר input ל-state", evidence: "value ו-onChange קיימים", reinforcement: "תרגל controlled input אחד לפני טופס מלא" },
      { id: "immutableAdd", label: "אני מוסיף עם spread ולא עם push", evidence: "setStudents(prev => [...prev, student])", reinforcement: "הסבר לעצמך למה React צריך reference חדש" },
      { id: "emptyState", label: "אני מציג מצב ריק כשאין נתונים", evidence: "No students yet או הודעה שקולה", reinforcement: "הוסף empty state לכל List/History" },
    ],
    steps: [
      "בנה קומפוננטת List בלבד.",
      "העבר props מהאב לילד.",
      "הוסף טופס controlled.",
      "הוסף item עם setState immutable.",
      "בדוק שהרשימה מתעדכנת בלי רענון דף.",
    ],
    codeBlocks: [
      {
        title: "React list + add item",
        code:
          "function StudentsPanel() {\n" +
          "  const [students, setStudents] = useState([]);\n" +
          "  const [name, setName] = useState('');\n\n" +
          "  function addStudent(event) {\n" +
          "    event.preventDefault();\n" +
          "    const cleanName = name.trim();\n" +
          "    if (!cleanName) return;\n" +
          "    const student = { id: `student-${students.length}-${cleanName.toLowerCase()}`, name: cleanName };\n" +
          "    setStudents((current) => [...current, student]);\n" +
          "    setName('');\n" +
          "  }\n\n" +
          "  return <section><form onSubmit={addStudent}><input value={name} onChange={(event) => setName(event.target.value)} /><button>Add</button></form>{students.length === 0 ? <p>No students yet</p> : students.map((student) => <p key={student.id}>{student.name}</p>)}</section>;\n" +
          "}",
        overview: "זה מינימום React שצריך לדעת לפני המבחן: state, טופס controlled, validation בסיסי, הוספה immutable ו-render של רשימה.",
        lineByLine: [
          "students הוא state של הרשימה. מתחילים ריק כדי לא להמציא נתונים.",
          "name הוא state של האינפוט. value ו-onChange הופכים אותו ל-controlled input.",
          "addStudent מקבל event מה-form כדי למנוע רענון דף.",
          "trim מנקה רווחים ומונע שמירה של שם ריק.",
          "אם cleanName ריק, הפונקציה חוזרת ולא משנה state.",
          "id נבנה בצורה דטרמיניסטית מהאינדקס והתוכן, בלי אקראיות.",
          "setStudents עם current מחזיר מערך חדש. זה מה שגורם ל-React לרנדר מחדש.",
          "setName('') מאפס את הטופס אחרי הוספה מוצלחת.",
          "ב-return מציגים form, ואז empty state או map עם key יציב.",
        ],
        focus: ["controlled input", "immutable state", "empty state", "key יציב"],
        commonMistakes: ["students.push", "input בלי value", "key={index}", "הוספה גם כשהשם ריק"],
        practice: "הוסף age נוסף, בדוק שהוא מספר, והצג אותו ברשימה.",
      },
    ],
  },
  {
    id: "basic_forms_validation",
    heat: 8,
    title: "Forms + Validations: נקודות שלא מוותרים עליהן",
    time: "40 דק׳",
    goal: "לוודא שכל כפתור submit נחסם כשקלט לא תקין.",
    passCriteria: "6/7 בדיקות מסומנות לפני מעבר ל-Mock Exam.",
    strengthenIfMissed: "אם חסרה ולידציה אחת: לתרגל Register + Add form עד שאין submit לא תקין.",
    checks: [
      { id: "required", label: "אני בודק שדות חובה", evidence: "כל field עובר trim", reinforcement: "כתוב פונקציית validate אחת שמחזירה errors object" },
      { id: "username", label: "אני בודק username לפי דרישה", evidence: "regex לאותיות באנגלית/קטנות", reinforcement: "תרגל regex פשוט לפני טופס מלא" },
      { id: "password", label: "אני בודק סיסמה: אורך, אות גדולה, מספר, תו מיוחד", evidence: "ארבע בדיקות נפרדות", reinforcement: "אל תכתוב תנאי אחד ענק שלא תוכל לתקן" },
      { id: "confirm", label: "אני בודק confirm password", evidence: "confirm === password", reinforcement: "הצג הודעה מתחת לשדה confirm" },
      { id: "number", label: "אני בודק שדות מספריים וטווחים", evidence: "Number.isFinite וטווח גיל/סכום", reinforcement: "אל תסמוך רק על type=number" },
      { id: "errors", label: "אני מציג שגיאה ברורה ליד השדה", evidence: "errors.field מוצג ב-UI", reinforcement: "הוסף div אדום לכל input קריטי" },
      { id: "noSubmit", label: "אני לא שולח לשרת לפני שהטופס תקין", evidence: "if errors return לפני fetch", reinforcement: "validation תמיד לפני API" },
    ],
    steps: [
      "כתוב validate(form) שמחזירה object.",
      "חבר כל input ל-state.",
      "הצג error ליד כל input.",
      "ב-submit: validate -> אם יש errors עצור -> אחרת fetch/save.",
      "בדוק ידנית כל שגיאה אחת אחת.",
    ],
    codeBlocks: [
      {
        title: "validateRegister",
        code:
          "function validateRegister(form) {\n" +
          "  const errors = {};\n" +
          "  if (!/^[a-z]+$/.test(form.username.trim())) errors.username = 'Username must contain lowercase English letters only';\n" +
          "  if (form.password.length < 8) errors.password = 'Password must be at least 8 characters';\n" +
          "  if (!/[A-Z]/.test(form.password)) errors.password = 'Password must include uppercase letter';\n" +
          "  if (!/[0-9]/.test(form.password)) errors.password = 'Password must include a number';\n" +
          "  if (!/[!@#$%^&*]/.test(form.password)) errors.password = 'Password must include a special character';\n" +
          "  if (form.confirmPassword !== form.password) errors.confirmPassword = 'Passwords do not match';\n" +
          "  return errors;\n" +
          "}",
        overview: "במבחן ולידציות הן מקור גדול לנקודות. הפונקציה מרכזת את כל חוקי הטופס במקום לפזר if בכל JSX.",
        lineByLine: [
          "errors מתחיל כאובייקט ריק. אם נשאר ריק, הטופס תקין.",
          "username נבדק אחרי trim כדי שרווחים לא יעברו בטעות.",
          "בדיקת אורך סיסמה נפרדת כדי לתת הודעה ספציפית.",
          "בדיקת אות גדולה נפרדת, כי זו דרישה נפוצה במבחנים.",
          "בדיקת מספר נפרדת מונעת סיסמה חלשה.",
          "בדיקת תו מיוחד משלימה את חוקי הסיסמה.",
          "confirmPassword חייב להיות זהה לסיסמה, אחרת לא מבצעים הרשמה.",
          "return errors מאפשר ל-UI להציג הודעות וגם ל-submit לעצור.",
        ],
        focus: ["errors object", "regex קצר", "הודעה ספציפית", "validation לפני fetch"],
        commonMistakes: ["alert כללי בלבד", "לשלוח לשרת לפני validation", "לא לנקות רווחים", "להחליף הודעת password בלי להבין איזו בדיקה נכשלה"],
        practice: "הוסף age עם טווח 18-60 והצג errors.age מתחת לשדה.",
      },
    ],
  },
  {
    id: "basic_router_crud",
    heat: 7,
    title: "React Router + CRUD Flow",
    time: "45 דק׳",
    goal: "לוודא שאתה יודע לבנות Login/Home/Add/Edit/List בלי לאבד route או state.",
    passCriteria: "5/6 בדיקות מסומנות לפני Project 70.",
    strengthenIfMissed: "אם חסר routing: לבנות skeleton עם כל routes תוך 30 דקות.",
    checks: [
      { id: "router", label: "אני יודע להגדיר BrowserRouter, Routes, Route", evidence: "כל path מופיע ב-App", reinforcement: "כתוב skeleton בלי CSS לפני כל פרויקט" },
      { id: "navigate", label: "אני משתמש ב-useNavigate אחרי הצלחה", evidence: "navigate('/home') רק אחרי validation", reinforcement: "אל תעביר דף אם הטופס נכשל" },
      { id: "params", label: "אני יודע לקרוא useParams במסך details/edit", evidence: "const { id } = useParams()", reinforcement: "תרגל route /items/:id" },
      { id: "add", label: "Add יוצר אובייקט חדש ושומר immutable", evidence: "setItems(prev => [...prev, item])", reinforcement: "אל תעדכן מערך קיים" },
      { id: "edit", label: "Edit עושה prefill ומעדכן עם map", evidence: "item.id === id ? updated : item", reinforcement: "קודם מצא item, אחר כך הצג form" },
      { id: "delete", label: "Delete מסנן עם filter ומציג empty state", evidence: "filter + הודעה כשאין נתונים", reinforcement: "בדוק מחיקה של item אחרון" },
    ],
    steps: [
      "כתוב App routes בלבד.",
      "הוסף Navbar עם Link או buttons.",
      "בנה List שמציג נתונים מה-state.",
      "בנה Add עם validation.",
      "בנה Edit עם useParams ו-prefill.",
      "הוסף Delete ו-empty state.",
    ],
    codeBlocks: [
      {
        title: "Router skeleton לפרויקט",
        code:
          "function App() {\n" +
          "  const [items, setItems] = useState([]);\n" +
          "  return <BrowserRouter><Routes><Route path='/' element={<Login />} /><Route path='/home' element={<Home items={items} />} /><Route path='/add' element={<Add setItems={setItems} />} /><Route path='/edit/:id' element={<Edit items={items} setItems={setItems} />} /><Route path='*' element={<NotFound />} /></Routes></BrowserRouter>;\n" +
          "}\n\n" +
          "function Edit({ items, setItems }) {\n" +
          "  const { id } = useParams();\n" +
          "  const item = items.find((current) => current.id === id);\n" +
          "  if (!item) return <p>Item not found</p>;\n" +
          "  function save(updates) {\n" +
          "    setItems((current) => current.map((row) => row.id === id ? { ...row, ...updates } : row));\n" +
          "  }\n" +
          "  return <form>{/* controlled inputs with item values */}</form>;\n" +
          "}",
        overview: "זה שלד שחוזר כמעט בכל פרויקט 70 נקודות: route לכל מסך, state משותף באב, ועריכה לפי id.",
        lineByLine: [
          "items נשמרים באב כי כמה routes צריכים לקרוא ולעדכן אותם.",
          "BrowserRouter עוטף את כל ה-Routes.",
          "Route '/' מציג Login, ואז /home, /add, /edit/:id מייצגים flow מלא.",
          "setItems נשלח רק למסכים שצריכים לשנות נתונים.",
          "useParams קורא id מה-URL במסך Edit.",
          "find מחפש את האובייקט לעריכה. אם לא נמצא, מציגים הודעה ולא קורסים.",
          "save משתמש ב-map כדי להחזיר מערך חדש ורק item אחד מעודכן.",
          "ה-form צריך להיות controlled ולצאת מהערכים של item.",
        ],
        focus: ["routes מלאים", "state באב", "params", "map לעריכה", "empty/not found state"],
        commonMistakes: ["להגדיר Route אבל לא כפתור ניווט", "לשנות item ישירות", "לא לטפל ב-id שלא נמצא", "להחזיק state כפול בכמה עמודים"],
        practice: "בנה אותו skeleton על נושא Football/Bank/Flights בלי CSS ובלי backend.",
      },
    ],
  },
  {
    id: "basic_api_async",
    heat: 6,
    title: "API + useEffect: loading, error, filter",
    time: "35 דק׳",
    goal: "לוודא ש-fetch לא מפיל את המסך ושאתה יודע לסנן נתונים שחזרו מ-API.",
    passCriteria: "4/5 בדיקות מסומנות לפני Products Filter.",
    strengthenIfMissed: "אם חסר loading/error: לתרגל dummyjson products בלבד.",
    checks: [
      { id: "effect", label: "אני מבצע fetch בתוך useEffect", evidence: "useEffect עם dependency מתאים", reinforcement: "אל תעשה fetch ישירות בגוף הקומפוננטה" },
      { id: "loading", label: "אני מציג loading בזמן הבקשה", evidence: "status/loading state", reinforcement: "הוסף סטטוס אחד: loading/ready/error" },
      { id: "error", label: "אני מטפל בשגיאת רשת", evidence: "catch או try/catch", reinforcement: "בדוק URL שגוי בכוונה" },
      { id: "derived", label: "אני בונה categories מהנתונים ולא ידנית", evidence: "new Set(products.map(...))", reinforcement: "אין hard-coded categories" },
      { id: "filter", label: "אני מסנן תצוגה בלי לשנות את המקור", evidence: "visible = products.filter(...)", reinforcement: "products המקורי נשאר state מקור" },
    ],
    steps: [
      "הגדר products/status state.",
      "כתוב useEffect עם fetch.",
      "הצג loading/error/ready.",
      "חשב categories כ-derived data.",
      "חשב visible לפי selectedCategory.",
    ],
    codeBlocks: [
      {
        title: "useEffect fetch pattern",
        code:
          "function ProductsScreen() {\n" +
          "  const [products, setProducts] = useState([]);\n" +
          "  const [status, setStatus] = useState('loading');\n" +
          "  const [selectedCategory, setSelectedCategory] = useState('all');\n\n" +
          "  useEffect(() => {\n" +
          "    let active = true;\n" +
          "    fetch('https://dummyjson.com/products')\n" +
          "      .then((response) => response.ok ? response.json() : Promise.reject(new Error('Request failed')))\n" +
          "      .then((data) => { if (active) { setProducts(data.products || []); setStatus('ready'); } })\n" +
          "      .catch(() => { if (active) setStatus('error'); });\n" +
          "    return () => { active = false; };\n" +
          "  }, []);\n\n" +
          "  const categories = ['all', ...Array.from(new Set(products.map((product) => product.category))).sort()];\n" +
          "  const visible = selectedCategory === 'all' ? products : products.filter((product) => product.category === selectedCategory);\n" +
          "  return <section>{status === 'loading' ? 'Loading...' : visible.map((product) => <article key={product.id}>{product.title}</article>)}</section>;\n" +
          "}",
        overview: "זה pattern בטוח ל-fetch ב-React: state לנתונים, state לסטטוס, cleanup כדי לא לעדכן קומפוננטה שכבר יצאה מהמסך, ו-derived filter.",
        lineByLine: [
          "products מחזיק רק נתונים אמיתיים שחזרו מה-API.",
          "status מאפשר UI ברור: loading, ready או error.",
          "selectedCategory הוא state של ה-select.",
          "useEffect רץ אחרי הרינדור הראשון ולא בכל render.",
          "active מונע setState מאוחר אחרי unmount.",
          "fetch קורא ל-API שמופיע בשיעורי הבית.",
          "response.ok נבדק כדי להפוך תשובת שגיאה ל-catch.",
          "setProducts שומר רק data.products או מערך ריק.",
          "catch מציב status error במקום להפיל את האפליקציה.",
          "categories נבנה מהנתונים עם Set, לכן אין fake categories.",
          "visible הוא חישוב תצוגה בלבד ולא state כפול.",
        ],
        focus: ["useEffect", "loading/error", "cleanup", "derived categories", "filter בלי mutation"],
        commonMistakes: ["fetch בגוף הקומפוננטה", "לשכוח response.ok", "hard-coded categories", "לשנות products בזמן סינון"],
        practice: "הוסף select אמיתי שמעדכן selectedCategory ובדוק קטגוריית all.",
      },
    ],
  },
  {
    id: "basic_typescript",
    heat: 5,
    title: "TypeScript בסיסי: type, enum, union, narrowing",
    time: "30 דק׳",
    goal: "לסגור את 10 נקודות TypeScript במהירות ובביטחון.",
    passCriteria: "5/6 בדיקות מסומנות לפני מעבר לשאלות TS.",
    strengthenIfMissed: "אם union/narrowing לא ברור: לפתור User union שלוש פעמים מהזיכרון.",
    checks: [
      { id: "type", label: "אני יודע להגדיר type לאובייקט", evidence: "type Book = { ... }", reinforcement: "כתוב shape לפני פונקציות" },
      { id: "enum", label: "אני יודע מתי להשתמש enum", evidence: "Genre.Fantasy במקום string חופשי", reinforcement: "תרגל enum עם 5 ערכים" },
      { id: "returnType", label: "אני כותב return type כשנדרש", evidence: ": Book[] או : string", reinforcement: "הוסף טיפוס לכל פונקציה בשאלה" },
      { id: "immutable", label: "אני מחזיר עותק ולא משנה מקור", evidence: "map/filter/spread", reinforcement: "אין push/splice בשאלת TS CRUD" },
      { id: "union", label: "אני מגדיר union בין טיפוסים", evidence: "type User = GuestUser | RegisteredUser", reinforcement: "צייר את שני הענפים" },
      { id: "narrowing", label: "אני מצר טיפוס עם in", evidence: "'profile' in user", reinforcement: "מצא שדה ייחודי לכל ענף union" },
    ],
    steps: [
      "כתוב טיפוסים לפני פונקציות.",
      "כתוב פונקציה אחת לכל פעולה.",
      "הוסף return type.",
      "פתור union + narrowing בסוף.",
      "הרץ tsc או ודא שאין any מיותר.",
    ],
    codeBlocks: [
      {
        title: "Book + User narrowing",
        code:
          "enum Genre { Fiction = 'Fiction', Fantasy = 'Fantasy' }\n" +
          "type Book = { title: string; author: string; available: boolean; genre: Genre };\n" +
          "function searchByGenre(books: Book[], genre: Genre): Book[] {\n" +
          "  return books.filter((book) => book.genre === genre);\n" +
          "}\n\n" +
          "interface BaseUser { id: string; username: string }\n" +
          "interface GuestUser extends BaseUser { guestSessionId: string }\n" +
          "interface RegisteredUser extends BaseUser { profile: string }\n" +
          "type User = GuestUser | RegisteredUser;\n" +
          "function userLabel(user: User): string {\n" +
          "  if ('guestSessionId' in user) return user.guestSessionId;\n" +
          "  return user.profile;\n" +
          "}",
        overview: "זה מחבר את כל שאלת TS הקלאסית: enum, type, פונקציה עם return type, interfaces, union ו-narrowing.",
        lineByLine: [
          "Genre מגביל את הז'אנרים לערכים חוקיים במקום כל string.",
          "Book מתאר בדיוק אילו שדות ספר חייב להכיל.",
          "searchByGenre מקבלת Book[] ו-Genre ומחזירה Book[]. החתימה עצמה כבר עונה על חלק מהשאלה.",
          "filter מחזיר רק ספרים שה-genre שלהם תואם.",
          "BaseUser מכיל שדות משותפים לכל המשתמשים.",
          "GuestUser מוסיף guestSessionId ולכן הוא ענף אחד של union.",
          "RegisteredUser מוסיף profile ולכן הוא ענף אחר.",
          "User הוא union: המשתמש יכול להיות אחד משני הטיפוסים.",
          "ב-userLabel משתמשים ב-in כדי ש-TypeScript יבין באיזה ענף אנחנו נמצאים.",
          "אחרי ה-if, TypeScript יודע שהמשתמש שנשאר הוא RegisteredUser.",
        ],
        focus: ["חתימות מדויקות", "enum לערכים קבועים", "union", "in narrowing", "בלי any"],
        commonMistakes: ["להשתמש ב-string במקום Genre", "לשכוח return type", "לגשת ל-profile בלי narrowing", "להגדיר User כאובייקט אחד במקום union"],
        practice: "הוסף updateAvailability שמחזיר Book[] עם map ו-spread.",
      },
    ],
  },
  {
    id: "basic_express_mongo",
    heat: 4,
    title: "Express/Mongo בסיסי: server, schema, GET/POST",
    time: "40 דק׳",
    goal: "לוודא שאתה יודע להקים backend קטן אם הפרויקט דורש full stack.",
    passCriteria: "5/6 בדיקות מסומנות לפני סימולציית full stack.",
    strengthenIfMissed: "אם server לא עולה: לחזור לשרת Express ריק עם GET / בלבד.",
    checks: [
      { id: "server", label: "אני יודע להקים app עם express()", evidence: "app.use(express.json()) לפני routes", reinforcement: "כתוב server.js נקי" },
      { id: "cors", label: "אני מפעיל cors כש-frontend נפרד", evidence: "app.use(cors())", reinforcement: "אם fetch נחסם, בדוק CORS ראשון" },
      { id: "connect", label: "אני מתחבר ל-Mongo עם mongoose.connect", evidence: "MONGO_URI ב-.env", reinforcement: "אל תכתוב connection string בתוך הקוד" },
      { id: "schema", label: "אני מגדיר Schema + Model", evidence: "new mongoose.Schema ואז mongoose.model", reinforcement: "Schema מתאר שדות; Model מבצע queries" },
      { id: "getPost", label: "אני כותב GET all ו-POST create", evidence: "GET /tasks, POST /tasks", reinforcement: "התחל משתי פעולות ורק אז PUT/DELETE" },
      { id: "status", label: "אני מחזיר status codes ושגיאות", evidence: "201, 400, 500", reinforcement: "try/catch בכל route async" },
    ],
    steps: [
      "הקם server.js עם express/cors/json.",
      "חבר mongoose ל-MONGO_URI.",
      "הגדר schema/model.",
      "כתוב GET /tasks.",
      "כתוב POST /tasks עם validation.",
      "בדוק fetch מה-frontend.",
    ],
    codeBlocks: [
      {
        title: "Express + Mongoose minimal API",
        code:
          "const express = require('express');\n" +
          "const cors = require('cors');\n" +
          "const mongoose = require('mongoose');\n\n" +
          "const app = express();\n" +
          "app.use(cors());\n" +
          "app.use(express.json());\n\n" +
          "mongoose.connect(process.env.MONGO_URI);\n\n" +
          "const taskSchema = new mongoose.Schema({\n" +
          "  title: { type: String, required: true },\n" +
          "  done: { type: Boolean, default: false },\n" +
          "});\n" +
          "const Task = mongoose.model('Task', taskSchema);\n\n" +
          "app.get('/tasks', async (req, res) => {\n" +
          "  const tasks = await Task.find();\n" +
          "  res.status(200).json(tasks);\n" +
          "});\n\n" +
          "app.post('/tasks', async (req, res) => {\n" +
          "  if (!req.body.title || !req.body.title.trim()) return res.status(400).json({ error: 'title required' });\n" +
          "  const task = await Task.create({ title: req.body.title.trim() });\n" +
          "  res.status(201).json(task);\n" +
          "});",
        overview: "זה backend מינימלי שמספיק לרוב סעיפי Express/Mongo: middlewares, חיבור DB, schema/model, GET ו-POST.",
        lineByLine: [
          "express יוצר שרת HTTP.",
          "cors מאפשר ל-frontend בפורט אחר לדבר עם השרת.",
          "mongoose הוא הגשר בין Node ל-MongoDB.",
          "app.use(express.json()) חייב לבוא לפני routes כדי ש-req.body יעבוד.",
          "mongoose.connect משתמש ב-MONGO_URI מהסביבה ולא במחרוזת קשיחה.",
          "taskSchema מגדיר אילו שדות יש ל-task ומה חובה.",
          "Task הוא Model; דרכו עושים find/create/update/delete.",
          "GET /tasks שולף את כל המשימות ומחזיר JSON עם status 200.",
          "POST /tasks קודם בודק title. אם חסר, מחזיר 400.",
          "Task.create שומר מסמך אמיתי ב-Mongo.",
          "201 מסמן שנוצר resource חדש.",
        ],
        focus: ["cors + json לפני routes", "Schema ואז Model", "GET all", "POST create", "status codes"],
        commonMistakes: ["לשכוח express.json", "לכתוב routes לפני middleware", "לא לבדוק שדה חובה", "להחזיר 200 על יצירה במקום 201"],
        practice: "הוסף DELETE /tasks/:id עם findByIdAndDelete ו-404 אם לא נמצא.",
      },
    ],
  },
];

var HOMEWORK_EXAM_RELEVANCE = {
  id: "svcollege_exam_only_mode_relevance_2026_05_05",
  policy: "במצב מבחן עובדים רק על 70/20/10. חומר לא רלוונטי לא נמחק, אלא מסומן כאדום או נמוך כדי למנוע בזבוז זמן.",
  heatLegend: [
    "Heat 10: להתחיל כאן עכשיו.",
    "Heat 9: חובה לפני פרויקט 70.",
    "Heat 8: חשוב אם הפרויקט כולל backend/API/Next.",
    "Heat 4-7: חיזוק לפי חולשה.",
    "Heat 1-3: לא השבוע, אלא אם כל המסלולים סגורים.",
  ],
  tabRelevance: [
    { id: "mock-exam", label: "Homework Exam Mode", relevance: "critical", heat: 10, status: "פתוח", reason: "מרכז את Project 70, JS 20, TS 10, אבחון ו-Gates.", doInstead: "להתחיל כאן בכל כניסה לפורטל." },
    { id: "trainer", label: "Trainer", relevance: "critical", heat: 9, status: "פתוח", reason: "מתקן חולשות אחרי אבחון בסיס.", doInstead: "לפתור רק מושג שסומן חלש." },
    { id: "codeblocks", label: "Codeblocks", relevance: "critical", heat: 9, status: "פתוח", reason: "פתרונות JS/TS ובלוקי קוד עם הסברים בעברית.", doInstead: "לקרוא קוד ואז לכתוב אותו מחדש." },
    { id: "trace", label: "Code Trace", relevance: "critical", heat: 8, status: "פתוח", reason: "מחדד קריאת קוד ושאלות JavaScript.", doInstead: "לפתור trace רק אחרי JS בסיסי." },
    { id: "gap-matrix", label: "Gap Matrix", relevance: "useful", heat: 7, status: "פתוח", reason: "מראה חוסרים ומושגים חלשים.", doInstead: "להשתמש רק אחרי אבחון." },
    { id: "guide", label: "Guide", relevance: "useful", heat: 6, status: "פתוח", reason: "עזר ממוקד כשחסר הסבר קצר.", doInstead: "לחפש מושג ספציפי, לא לקרוא רצוף." },
    { id: "flashcards", label: "Flashcards", relevance: "useful", heat: 5, status: "פתוח", reason: "חזרה מהירה לפני TS/JS.", doInstead: "10 דקות בלבד בסוף יום." },
    { id: "learning-evidence", label: "Learning Evidence", relevance: "useful", heat: 5, status: "פתוח", reason: "בודק ראיות למעבר Gate.", doInstead: "לפתוח רק אחרי תרגול." },
    { id: "blueprints", label: "Course Blueprints", relevance: "useful", heat: 4, status: "פתוח", reason: "מפת חומר, לא מסלול עבודה יומי.", doInstead: "לחזור ל-Homework Exam Mode." },
    { id: "grandma-knowledge", label: "ידע מורחב ברמת סבתא", relevance: "blocked", heat: 2, status: "אדום", reason: "העשרה ארוכה שאינה מדמה מבחן.", doInstead: "Guide קצר או אבחון בסיס." },
    { id: "programming-basics", label: "אבני בסיס", relevance: "low", heat: 3, status: "צהוב/אדום", reason: "בסיס כללי, לא תרגול 70/20/10.", doInstead: "Forms, Router או JS בסיסי לפי אבחון." },
    { id: "programming-principles", label: "עקרונות יסוד", relevance: "blocked", heat: 2, status: "אדום", reason: "לא מחליף בניית פרויקט מעשי.", doInstead: "Project 70 checklist." },
    { id: "programming-museum", label: "מוזיאון", relevance: "blocked", heat: 1, status: "אדום", reason: "היסטוריה והעשרה, לא חומר מבחן קרוב.", doInstead: "Mock Exam מלא." },
    { id: "language-tools", label: "כלי שפה", relevance: "blocked", heat: 1, status: "אדום", reason: "השוואות שפות אינן חלק ישיר מהניקוד.", doInstead: "JS 20 או TS 10." },
    { id: "reward-store", label: "חנות חוויות", relevance: "blocked", heat: 1, status: "אדום", reason: "מערכת חוויה, לא הכנה למבחן.", doInstead: "הצעד הבא ב-Exam Only." },
    { id: "comparator", label: "השוואות כלליות", relevance: "low", heat: 3, status: "צהוב", reason: "שימושי רק כשיש בלבול בין שני מושגים.", doInstead: "טאב השוואות בתוך שיעור קריטי." },
    { id: "anatomy", label: "אנטומיית קוד", relevance: "low", heat: 3, status: "צהוב", reason: "כללי מדי למבחן אם לא מחובר למשימה.", doInstead: "Codeblocks עם Gate." },
  ],
  lessonRelevance: [
    { lessonId: "lesson_24", label: "Hooks/API", relevance: "critical", heat: 10, reason: "useEffect, fetch, useRef וסינון מוצרים חוזרים בשיעורי הבית." },
    { lessonId: "lesson_25", label: "Tailwind/Movie Project", relevance: "critical", heat: 10, reason: "layout, search/filter ופרויקט Movie Rating." },
    { lessonId: "lesson_26", label: "TypeScript/React TS", relevance: "critical", heat: 10, reason: "שאלת TS 10 וניהול טיפוסים ב-React." },
    { lessonId: "lesson_20", label: "Mongo/Mongoose", relevance: "critical", heat: 9, reason: "Schema/Model/CRUD לפרויקט full stack." },
    { lessonId: "lesson_22", label: "React State", relevance: "critical", heat: 9, reason: "Students table, state, props, map ו-forms." },
    { lessonId: "lesson_23", label: "Router/Context", relevance: "critical", heat: 9, reason: "Routes, useNavigate, useParams ו-Smart House." },
    { lessonId: "lesson_27", label: "React + TS Budget", relevance: "critical", heat: 9, reason: "Transaction type, CRUD וחישובים נגזרים." },
    { lessonId: "lesson_17", label: "HTTP/Express", relevance: "useful", heat: 8, reason: "שרת, endpoints ו-status codes בתוך הפרויקט." },
    { lessonId: "lesson_18", label: "Node/Express HW", relevance: "useful", heat: 8, reason: "טפסים, ולידציה ואחסון backend." },
    { lessonId: "lesson_21", label: "React Basics", relevance: "useful", heat: 8, reason: "קומפוננטות בסיס לפני Project 70." },
    { lessonId: "lesson_nextjs", label: "Next.js Dashboard", relevance: "useful", heat: 8, reason: "אם הפרויקט ידרוש App Router או dashboard." },
  ],
  emptyStatePolicy: [
    { case: "טאב השוואות ריק בשיעור קריטי", meaning: "חוסר חומר אמיתי", action: "להציג אזהרה אדומה ולקשר ל-Backlog חומרים." },
    { case: "אגף אדום ריק או חסום", meaning: "לא רלוונטי למבחן הקרוב", action: "להציג חלופה: Homework Exam Mode / Project 70 / JS 20 / TS 10." },
    { case: "מסלול סגור ללא סימוני Gate", meaning: "התלמיד עדיין לא הוכיח שליטה", action: "להציג משימת Gate אחת ולדרוש ראיה כתובה." },
    { case: "Code block בלי הסבר מלא", meaning: "חוסר איכות למבחן", action: "להציג overview, פירוק שורות, דגשי מבחן, טעויות ותרגול." },
  ],
  codeExplanationContract: [
    "מה הקוד עושה",
    "למה כותבים אותו כך",
    "איפה זה מופיע במבחן",
    "טעות נפוצה",
    "תיקון/תרגול נכון",
  ],
};

var HOMEWORK_PORTAL_PERFECTION_TASKS = [
  { id: "wave1-start-here", wave: 1, heat: 10, title: "מסך התחל כאן + משימה אחת מומלצת", minutes: 120, status: "implemented", acceptance: "תלמיד יודע תוך 10 שניות מה הפעולה הבאה." },
  { id: "wave1-exam-only", wave: 1, heat: 10, title: "Exam Only Mode עם critical/useful/low/blocked", minutes: 180, status: "implemented", acceptance: "חומר לא רלוונטי מסומן אדום או מקבל חלופה." },
  { id: "wave2-closed-tracks", wave: 2, heat: 10, title: "6 מסלולים סגורים עם Gate evidence", minutes: 300, status: "implemented", acceptance: "אין מעבר אמיתי בלי ראיה כתובה." },
  { id: "wave3-code-explanations", wave: 3, heat: 10, title: "הסבר עברי מלא לכל code block קריטי", minutes: 480, status: "implemented", acceptance: "לכל בלוק יש overview, שורות, דגשים, טעויות ותרגול." },
  { id: "wave4-project70", wave: 4, heat: 10, title: "Project 70 checklist + mock project", minutes: 480, status: "implemented", acceptance: "Project/JS/TS מוצגים לפי 70/20/10." },
  { id: "wave5-quality-gates", wave: 5, heat: 8, title: "בדיקות UI, חומר, offline ו-pre-release", minutes: 480, status: "implemented", acceptance: "כל שערי המבחן עוברים." },
  { id: "quality-fill-warnings", wave: 5, heat: 7, title: "ניקוי warnings לא חוסמים בשאלות Fill/MC", minutes: 300, status: "backlog", acceptance: "שיפור איכות בלבד; לא חוסם מבחן." },
];

var HOMEWORK_EXAM_100_PATH = {
  id: "svcollege_exam_100_path_2026_05_05",
  version: "exam-100-path-v1",
  title: "Exam 100 Path",
  summary: "מסך ראשי סגור: אבחון 20 דקות, מסלול אישי, סימולציה, ושמירה מקומית ברורה.",
  targetScore: 100,
  activeScoring: { project: 70, javascript: 20, typescript: 10 },
  placementTest: {
    id: "exam100-placement-20m",
    title: "בדיקת רמה 20 דקות",
    minutes: 20,
    passPolicy: "אפשר להתחיל מסלול 100 רק אחרי אבחון או סימון דילוג מודע.",
    levels: [
      { id: "beginner", label: "Beginner", min: 0, max: 7, routeId: "start-from-zero", message: "להתחיל מיסודות HTML/JS ואז React בסיסי." },
      { id: "foundation", label: "Foundation", min: 8, max: 13, routeId: "project-weak", message: "יש בסיס, אבל צריך לסגור React project skeleton ו-validations." },
      { id: "exam-ready", label: "Exam Ready", min: 14, max: 17, routeId: "before-exam", message: "לעבור לסימולציות 70/20/10 ולתיקון חולשות." },
      { id: "track-100", label: "100 Track", min: 18, max: 20, routeId: "track-100", message: "לעבוד לפי daily gates, שאלות קשות, mock מלא ו-export." },
    ],
    sections: [
      {
        id: "js",
        label: "JavaScript",
        count: 8,
        questions: [
          "אני כותב פונקציה שמקבלת מערך ומחזירה object במבנה מדויק.",
          "אני בודק שכל ערך הוא number וזורק Error ברור אם לא.",
          "אני משתמש ב-reduce/filter/map/find/some/every לפי הצורך.",
          "אני פותר group by digit length and sum.",
          "אני פותר even/odd unique בלי לספור כפולים.",
          "אני מזהה רצף arithmetic/geometric/Fibonacci/other.",
          "אני בודק ordered subsequence.",
          "אני ממיין ספרות בלי sort כשזה אילוץ השאלה.",
        ],
      },
      {
        id: "react",
        label: "React / Router",
        count: 6,
        questions: [
          "אני מקים BrowserRouter, Routes ו-Route בלי להסתבך.",
          "אני משתמש ב-useNavigate למעבר אחרי פעולה מוצלחת.",
          "אני משתמש ב-useParams ל-route דינמי.",
          "אני בונה form controlled עם useState לכל input.",
          "אני מציג רשימה עם map ו-key יציב.",
          "אני מציג conditional rendering ו-empty state.",
        ],
      },
      {
        id: "backend",
        label: "Backend / API",
        count: 4,
        questions: [
          "אני כותב useEffect שמביא data מ-API ומעדכן state.",
          "אני מציג loading ו-error בלי לשבור layout.",
          "אני מקים Express עם cors ו-express.json לפני routes.",
          "אני מגדיר Mongoose Schema/Model ו-GET/POST תקינים.",
        ],
      },
      {
        id: "typescript",
        label: "TypeScript",
        count: 2,
        questions: [
          "אני מגדיר type/interface/enum בלי any מיותר.",
          "אני פותר union עם in narrowing ומסביר למה זה עובד.",
        ],
      },
    ],
  },
  closedRoutes: [
    {
      id: "start-from-zero",
      label: "אני לא יודע מאיפה להתחיל",
      level: "Beginner",
      minutes: 255,
      steps: ["HTML/JS בסיס", "React בסיס", "Router/forms", "מבחן קטן"],
      gate: "לפחות 70% באבחון בסיס סגור לפני Project 70.",
      gateType: "diagnostic-score",
      passingScore: 70,
      requiredActions: ["לסמן לפחות 70% מבדיקות הבסיס", "לכתוב ראיית Gate קצרה", "לבצע מבחן קטן לפני Project 70"],
      nextAction: "scroll-hxm-basic-diagnostic",
    },
    {
      id: "project-weak",
      label: "אני יודע JS אבל חלש בפרויקט",
      level: "Foundation",
      minutes: 330,
      steps: ["React project skeleton", "Forms/validations", "CRUD/list", "Mock project"],
      gate: "Flow עובד: Login/Register/Home/Add/Edit/List.",
      gateType: "project-flow",
      passingScore: 80,
      requiredActions: ["לבנות Login/Register/Home/Add/Edit/List", "להראות ולידציות עובדות", "לשמור evidence לפני מעבר"],
      nextAction: "scroll-hxm-templates",
    },
    {
      id: "before-exam",
      label: "אני לפני מבחן",
      level: "Exam Ready",
      minutes: 240,
      steps: ["70/20/10 mock exam", "תיקון חולשות", "סימולציה מלאה"],
      gate: "ציון עצמי 80+ בסימולציה מלאה.",
      gateType: "mock-exam-score",
      passingScore: 80,
      requiredActions: ["לסיים סימולציה 70/20/10", "לתקן חולשה אחת לפחות", "לקבל ציון עצמי 80+"],
      nextAction: "start-homework-mock",
    },
    {
      id: "track-100",
      label: "מסלול 100",
      level: "100 Track",
      minutes: 420,
      steps: ["daily gates", "hard questions", "full mock", "checklist", "export"],
      gate: "Mock מלא + JS עד 20 דקות + TS עד 10 דקות + Project checklist מלא.",
      gateType: "full-exam-readiness",
      passingScore: 90,
      requiredActions: ["Mock מלא", "JS עד 20 דקות", "TS עד 10 דקות", "Project checklist מלא", "ייצוא checkpoint"],
      nextAction: "scroll-hxm-exam-day",
    },
  ],
  homeCards: [
    { id: "continue", title: "המשך מאיפה שעצרת", action: "resume-exam100-path", button: "המשך", body: "פותח את השלב הבא לפי תוצאת האבחון וה-Gates שסומנו." },
    { id: "placement", title: "מבחן מיון", action: "scroll-exam100-placement", button: "בדיקת רמה", body: "20 סימונים שמכריעים מאיזה מסלול להתחיל." },
    { id: "route", title: "המסלול שלי", action: "scroll-exam100-routes", button: "ראה מסלול", body: "ארבעה מסלולים סגורים במקום פורטל פתוח מדי." },
    { id: "simulation", title: "סימולציה", action: "start-homework-mock", button: "Mock Exam", body: "מבחן 70/20/10 לפי תנאי הזמן של SVCollege." },
  ],
  saveUi: {
    states: ["נשמר עכשיו", "שמירה נכשלה", "שחזור מפרופיל מקומי", "ייצוא ידני בסוף יום"],
    storageKey: "lumenportal:exam100Path:v1",
    exportLabel: "ייצוא יום תרגול",
  },
  finalRunbook: {
    summary:
      "Runbook סופי לביצוע רציף: לא עוברים לשלב הבא לפני ש-Gate השלב הנוכחי ירוק. המטרה היא פורטל הכנה סגור, ברור, יציב ומוכן למבחן.",
    totalMinutes: 1200,
    totalLabel: "20 שעות",
    executionOrder: [
      { order: 1, batch: "יציבות Runtime ו-file/server", minutes: 240, gate: "אין crash בדוח storage; file:// לא מטעה משתמש" },
      { order: 2, batch: "Exam 100 Path כמסך ראשי", minutes: 300, gate: "תלמיד רואה פעולה אחת מומלצת" },
      { order: 3, batch: "Gates, שמירה ושחזור", minutes: 240, gate: "התקדמות נשמרת, משוחזרת, וכשל מוצג" },
      { order: 4, batch: "ניקוי שאלות ואיכות תרגול", minutes: 180, gate: "שאלות JS/TS/Project חד-משמעיות" },
      { order: 5, batch: "Trust boundary קריטי", minutes: 120, gate: "אין סיכון DOM/storage קריטי במסכי מבחן" },
      { order: 6, batch: "Release gates ודוח מוכנות", minutes: 360, gate: "כל השערים ירוקים ודוח סופי מוכן" },
    ],
    timeNote:
      "הכותרת המקורית אומרת 20 שעות, אך סכום זמני ה-batches המפורטים הוא 1440 דקות = 24 שעות. 20 שעות נשמרות כיעד sprint, והפירוט הוא מקור האמת לביצוע.",
    stopConditions: [
      "קריאה ל-Native random API מופיעה בקוד",
      "נוסף fake data או תוכן מומצא",
      "וידאו משתנה או משמש כמקור ללא תמלול",
      "exam:material-gaps:strict נכשל",
      "finish-line:pre-release נכשל בגלל מוצר אמיתי",
      "המשתמש עדיין יכול להיכנס למסלול לא רלוונטי בלי אזהרה אדומה",
    ],
    releaseCommands: [
      "npm run exam:material-gaps:strict",
      "npm run questions:coverage-targets:strict",
      "npm run svcollege:student-export:strict",
      "npm run svcollege:top-tabs:strict",
      "npm run svcollege:pwa-offline:strict",
      "npm run svcollege:full-portal-smoke:strict",
      "npm run svcollege:visual-overlap:strict",
      "npm run svcollege:console-gate:strict",
      "npm run build",
      "npm test -- --run",
      "npm run finish-line:pre-release",
    ],
    finalReportRequired: [
      "ציון מערכת עדכני",
      "אחוז כיסוי חומר",
      "האם יש פערי מבחן",
      "מאיפה להתחיל היום",
      "כמה שעות למידה נשארו",
      "מה אסור ללמוד השבוע כי לא רלוונטי",
      "סטטוס שמירה ואופליין",
      "אישור שאין שימוש באקראיות Native, אין fake data, ולא נגעו בווידאו",
    ],
    definitionOfDone: [
      "הכניסה הראשונה מציגה התחל כאן",
      "יש אבחון פתיחה",
      "יש 4 מסלולים סגורים",
      "כל שלב כולל Gate מעבר",
      "שמירה/כשל/שחזור מוצגים למשתמש",
      "חומר המבחן מכוסה ב-100% לפי gates",
      "כל בדיקות release עוברות",
      "תלמיד שלא יודע איפה להתחיל מקבל פעולה אחת בלבד",
    ],
  },
  finalStudentReport: {
    systemScore: 98,
    systemScoreLabel: "98/100 כמערכת הכנה למבחן אחרי שערי release",
    materialCoveragePercent: 100,
    questionCoveragePercent: 100,
    examGaps: 0,
    startToday: {
      title: "התחל ב-Exam 100 Path",
      action: "פתח את כרטיס התחל כאן, בצע מבחן מיון 20 דקות, ואז המשך למסלול שהמערכת ממליצה עליו.",
      firstGate: "לא ממשיכים למסלול הבא לפני ש-Gate השלב הנוכחי ירוק.",
    },
    remainingPersonalStudy: {
      minutes: 5685,
      label: "94 שעות 45 דק׳",
      videoWatchMinutes: 3420,
      videoWatchLabel: "57 שעות צפייה ב-114 סרטונים",
    },
    doNotStudyThisWeek: [
      "AI/DevOps/Nest לפני סיום 70/20/10",
      "הסקת חומר חדש מתוך וידאו ללא תמלול",
      "מסלולים שמסומנים blocked או low בתוך Exam Only Mode",
      "פיצ׳רים חדשים שלא מופיעים בשיעורי הבית או במבחני הדוגמה",
    ],
    saveAndOfflineStatus: {
      saveStates: ["נשמר עכשיו", "שמירה נכשלה", "שחזור מפרופיל מקומי"],
      offlineReady: true,
      pwaAssets: "203/203",
    },
    releaseStatus: {
      materialGaps: "ready, 0 gaps",
      questionCoverage: "ready, 0 MC/Fill gaps",
      studentReadiness: "100, 15/15 modules",
      topTabs: "23/23",
      pwaOffline: "203/203",
      smoke: "9/9",
      visualOverlap: "ready",
      consoleGate: "5/5",
      tests: "180 files, 846 tests",
      finishLine: "21/21",
    },
    guarantees: [
      "אין שימוש באקראיות Native בקובץ התכנון",
      "אין fake data",
      "לא נגעו בווידאו",
      "חומר המבחן מכוסה לפי gates",
    ],
  },
  practicalGuides: {
    title: "מדריכים פרקטיים וצבעוניים למבחן",
    status: "ready",
    root: "output/svcollege-practical-guides",
    verification: {
      report: "output/svcollege-practical-guides/verification_report.json",
      files: 16,
      htmlFiles: 11,
      manifestOutputs: 14,
      recommendedOrder: 10,
      failures: 0,
    },
    outputs: [
      {
        id: "start_here",
        label: "התחל כאן",
        file: "output/svcollege-practical-guides/start_here.html",
        heat: 10,
        purpose: "בחירת מדריך לפי מצב התלמיד בלי ללכת לאיבוד.",
      },
      {
        id: "one_page_exam_cheatsheet",
        label: "כרטיס חירום למבחן",
        file: "output/svcollege-practical-guides/one_page_exam_cheatsheet.html",
        heat: 10,
        purpose: "עמוד אחד ליום שלפני המבחן ולרגעי לחץ בזמן מבחן.",
      },
      {
        id: "forward_tasks_plan",
        label: "תוכנית קדימה",
        file: "output/svcollege-practical-guides/forward_tasks_plan.html",
        heat: 9,
        purpose: "כל 47 משימות הלמידה שנותרו, עם טבלת זמנים ו-Gate לכל שלב.",
      },
      {
        id: "guide_01_ideas",
        label: "מדריך 1 - רעיונות",
        file: "output/svcollege-practical-guides/guide_01_ideas.html",
        heat: 9,
        purpose: "הסבר פשוט של הרעיון מאחורי JS, React, API, Mongo, TS ו-Next.",
      },
      {
        id: "guide_02_drills",
        label: "מדריך 2 - פתרון תרגילים",
        file: "output/svcollege-practical-guides/guide_02_homework_and_exam_drills.html",
        heat: 10,
        purpose: "תבניות פתרון לשיעורי בית, JS 20, TS 10 ו-Project 70.",
      },
      {
        id: "guide_03_exam_day",
        label: "מדריך 3 - יום מבחן",
        file: "output/svcollege-practical-guides/guide_03_exam_day_runbook.html",
        heat: 10,
        purpose: "מה לעשות ב-4 שעות המבחן, לפי סדר וניקוד.",
      },
      {
        id: "study_path",
        label: "מסלול 94:45",
        file: "output/svcollege-practical-guides/study_path_37h45.html",
        heat: 8,
        purpose: "תוכנית יומית סגורה ללמידה האישית שנותרה.",
      },
      {
        id: "progress_tracker",
        label: "מעקב התקדמות",
        file: "output/svcollege-practical-guides/progress_tracker.html",
        heat: 8,
        purpose: "סימון משימות, חישוב זמן שנותר ו-export/import מקומי.",
      },
    ],
    qualityRules: [
      "החבילה עברה verifier מקומי ללא failures.",
      "כל HTML כולל הדפסה ו-CSS להדפסה.",
      "אין שימוש באקראיות Native.",
      "אין fake data.",
      "צופים בווידאו לפי לוח המשימות, אבל לא מסיקים ממנו חומר חדש בלי תמלול.",
    ],
  },
  systemBacklog: [
    { id: "exam100-dom-storage-regex", title: "לתקן ולהקשיח את דוח DOM/storage trust boundary", minutes: 90, status: "implemented", required: true },
    { id: "batch1-storage-regex-syntax", title: "Batch 1: לתקן Regex בדוח DOM/storage כך שיזהה localStorage/sessionStorage בלי SyntaxError", minutes: 45, status: "implemented", required: true },
    { id: "batch1-storage-clear-parsing", title: "Batch 1: לוודא ש-clear() לא שובר key parsing ושפעולות storage מקבלות סוג נכון", minutes: 45, status: "implemented", required: true },
    { id: "batch1-storage-regression-test", title: "Batch 1: להוסיף בדיקה שמונעת חזרה של Regex שבור בדוח storage", minutes: 30, status: "implemented", required: true },
    { id: "exam100-file-protocol-runtime", title: "לנעול runtime נכון: אזהרת file://, דילוג על API/SW, ו-module loader בטוח", minutes: 120, status: "implemented", required: true },
    { id: "batch1-file-protocol-warning", title: "Batch 1: לזהות file:// ולהציג הודעת 'פתח דרך שרת מקומי'", minutes: 45, status: "implemented", required: true },
    { id: "batch1-file-profile-fallback", title: "Batch 1: לא לנסות /api/profile ב-file:// ולהציג fallback מקומי", minutes: 30, status: "implemented", required: true },
    { id: "batch1-file-service-worker-skip", title: "Batch 1: לדלג על service worker ב-file:// בלי console error קריטי", minutes: 30, status: "implemented", required: true },
    { id: "batch1-server-url-notice", title: "Batch 1: להציג למשתמש כתובת שרת נכונה ולצמצם בלבול פורטים", minutes: 15, status: "implemented", required: true },
    { id: "batch1-server-file-browser-smoke", title: "Batch 1: להריץ browser smoke לשרת ול-file mode", minutes: 40, status: "implemented", required: true },
    { id: "batch2-exam100-first-block", title: "Batch 2: להפוך את Exam 100 Path לבלוק הראשון במסך Homework Exam Mode", minutes: 45, status: "implemented", required: true },
    { id: "batch2-single-start-card", title: "Batch 2: להציג פעולה אחת מומלצת לפי מצב המשתמש: אבחון / המשך / סימולציה", minutes: 45, status: "implemented", required: true },
    { id: "batch2-placement-levels", title: "Batch 2: לחבר 20 שאלות אבחון לרמות Beginner / Foundation / Exam Ready / 100 Track", minutes: 60, status: "implemented", required: true },
    { id: "batch2-route-recommendation", title: "Batch 2: להתאים מסלול אחד ברור לפי תוצאת האבחון", minutes: 45, status: "implemented", required: true },
    { id: "batch2-closed-routes-ui", title: "Batch 2: להציג 4 מסלולים סגורים במקום ניווט חופשי", minutes: 60, status: "implemented", required: true },
    { id: "batch2-route-gates", title: "Batch 2: להוסיף לכל מסלול תנאי מעבר ברור", minutes: 45, status: "implemented", required: true },
    { id: "batch2-irrelevant-areas", title: "Batch 2: לסמן אזורים לא רלוונטיים באדום או כספרייה מתקדמת", minutes: 30, status: "implemented", required: true },
    { id: "batch2-persisted-progress", title: "Batch 2: לשמור מסלול נבחר, רמה ושלב נוכחי אחרי רענון", minutes: 30, status: "implemented", required: true },
    { id: "batch2-ui-smoke-desktop-mobile", title: "Batch 2: לבדוק desktop/mobile שאין עומס או overflow במסך הפתיחה", minutes: 40, status: "implemented", required: true },
    { id: "sprint20-trust-report", title: "Sprint 20h: תיקון report_dom_storage_trust_boundary.js כך שירוץ בלי SyntaxError ויחזיר סיכוני DOM/storage", minutes: 90, status: "implemented", required: true },
    { id: "sprint20-file-vs-server", title: "Sprint 20h: בדיקת file:// מול server URL עם הודעה ברורה וללא שגיאות שקטות", minutes: 60, status: "implemented", required: true },
    { id: "sprint20-port-start-url", title: "Sprint 20h: ניקוי בלבול פורטים וכתובת התחלה נכונה", minutes: 60, status: "implemented", required: true },
    { id: "sprint20-exam100-main", title: "Sprint 20h: להפוך Exam 100 Path למסך ראשי עם התחלה ופעולה אחת", minutes: 120, status: "implemented", required: true },
    { id: "sprint20-placement-full", title: "Sprint 20h: אבחון פתיחה מלא עם 20 שאלות, ציון, רמה ומסלול מומלץ", minutes: 120, status: "implemented", required: true },
    { id: "sprint20-closed-gates", title: "Sprint 20h: מסלולים סגורים עם Gates כדי שלא הולכים לאיבוד בין טאבים", minutes: 150, status: "implemented", required: true },
    { id: "sprint20-autosave-ui", title: "Sprint 20h: UI שמירה אוטומטית עם נשמר / נכשל / שוחזר", minutes: 90, status: "implemented", required: true },
    { id: "sprint20-offline-restore", title: "Sprint 20h: מצב אופליין ושחזור כך שהתקדמות לא הולכת לאיבוד", minutes: 90, status: "implemented", required: true },
    { id: "sprint20-fill-ambiguity", title: "Sprint 20h: ניקוי 12 אזהרות Fill ambiguity בשאלות מבחן", minutes: 180, status: "implemented", required: true },
    { id: "sprint20-exam-trust-boundary", title: "Sprint 20h: סגירת trust boundary במסכי Exam/Homework Mode", minutes: 120, status: "implemented", required: true },
    { id: "sprint20-ui-flow-tests", title: "Sprint 20h: בדיקות UI להתחלה, מסלול ושמירה", minutes: 90, status: "implemented", required: true },
    { id: "sprint20-content-gates", title: "Sprint 20h: שערי תוכן ושאלות: material gaps, coverage, export, top tabs", minutes: 120, status: "implemented", required: true },
    { id: "sprint20-runtime-gates", title: "Sprint 20h: שערי runtime: PWA, smoke, visual overlap, build", minutes: 90, status: "implemented", required: true },
    { id: "sprint20-finish-line", title: "Sprint 20h: finish-line סופי ודוח מצב לסטודנט", minutes: 60, status: "implemented", required: true },
    { id: "batch3-gate-model", title: "Batch 3: להגדיר לכל שלב gateType, passingScore ו-requiredActions", minutes: 45, status: "implemented", required: true },
    { id: "batch3-gate-ui", title: "Batch 3: להציג עברת / לא עברת / חסר לך בכל Gate", minutes: 45, status: "implemented", required: true },
    { id: "batch3-progress-state", title: "Batch 3: לשמור current route, step ו-gate status", minutes: 40, status: "implemented", required: true },
    { id: "batch3-save-status-ui", title: "Batch 3: להציג נשמר לפני X שניות", minutes: 35, status: "implemented", required: true },
    { id: "batch3-failure-state", title: "Batch 3: להציג שמירה נכשלה אם local/profile save לא זמין", minutes: 30, status: "implemented", required: true },
    { id: "batch3-local-restore", title: "Batch 3: להציג שוחזר מקומית או מקור שחזור מקומי", minutes: 30, status: "implemented", required: true },
    { id: "batch3-offline-behavior", title: "Batch 3: לוודא שמסלול ו-Gates עובדים בלי רשת", minutes: 35, status: "implemented", required: true },
    { id: "batch3-export-checkpoint", title: "Batch 3: להוסיף כפתור export בסוף יום/מסלול", minutes: 30, status: "implemented", required: true },
    { id: "batch3-save-state-tests", title: "Batch 3: להוסיף בדיקות ל-saved/failed/restored", minutes: 20, status: "implemented", required: true },
    { id: "batch4-fill-ambiguity-ids", title: "Batch 4: לאסוף את 12 שאלות Fill ambiguity ולזהות IDs ושדות בעייתיים", minutes: 30, status: "implemented", required: true },
    { id: "batch4-fill-rewording", title: "Batch 4: לנסח מחדש תשובות/רמזים כך שכל Fill חד-משמעי", minutes: 60, status: "implemented", required: true },
    { id: "batch4-js20-validation", title: "Batch 4: לוודא ששאלות JS 20 כוללות input validation ו-throw new Error", minutes: 30, status: "implemented", required: true },
    { id: "batch4-ts10-coverage", title: "Batch 4: לוודא כיסוי type/interface/enum/union/narrowing לשאלת TS 10", minutes: 30, status: "implemented", required: true },
    { id: "batch4-project70-checklists", title: "Batch 4: לוודא שכל תרגול Project 70 מדגיש validations/routing/forms/API/layout", minutes: 25, status: "implemented", required: true },
    { id: "batch4-hebrew-code-explanations", title: "Batch 4: לוודא שכל code block קריטי כולל הסבר עברי מה/למה/טעות נפוצה", minutes: 15, status: "implemented", required: true },
    { id: "batch4-validation-rerun", title: "Batch 4: להריץ strict validation ולוודא 0 errors ו-0 ambiguity קריטי", minutes: 10, status: "implemented", required: true },
    { id: "batch4-question-regression-tests", title: "Batch 4: להריץ בדיקות שאלות ממוקדות בלי שבירת schema או IDs", minutes: 20, status: "implemented", required: true },
    { id: "batch5-trust-report-run", title: "Batch 5: להריץ דוח DOM/storage אחרי תיקון Regex ולקבל רשימת sinks אמיתית", minutes: 25, status: "implemented", required: true },
    { id: "batch5-exam-innerhtml-review", title: "Batch 5: לבדוק שימושי innerHTML במסכי Exam/Homework בלבד ולסמן safe או להחליף", minutes: 30, status: "implemented", required: true },
    { id: "batch5-storage-trust-separation", title: "Batch 5: להפריד בין progress מקומי לבין score proof סמכותי", minutes: 25, status: "implemented", required: true },
    { id: "batch5-sanitization-check", title: "Batch 5: לוודא שתוכן דינמי עובר escaping או renderer בטוח", minutes: 20, status: "implemented", required: true },
    { id: "batch5-dom-allowlist", title: "Batch 5: להוסיף allowlist מצומצם לשימושי DOM מאושרים", minutes: 20, status: "implemented", required: true },
    { id: "batch5-critical-regression-smoke", title: "Batch 5: לבדוק שמסכי Exam 100/Homework Mode נטענים בלי regression", minutes: 20, status: "implemented", required: true },
    { id: "batch6-content-gates", title: "Batch 6: להריץ exam:material-gaps:strict ו-questions:coverage-targets:strict", minutes: 45, status: "implemented", required: true },
    { id: "batch6-student-readiness", title: "Batch 6: להריץ svcollege:student-export:strict ו-svcollege:top-tabs:strict", minutes: 45, status: "implemented", required: true },
    { id: "batch6-runtime-gates", title: "Batch 6: להריץ PWA, full portal smoke, visual overlap ו-console gate", minutes: 60, status: "implemented", required: true },
    { id: "batch6-build-gate", title: "Batch 6: להריץ npm run build ולבדוק שאין שבירת assets/cache", minutes: 45, status: "implemented", required: true },
    { id: "batch6-full-tests", title: "Batch 6: להריץ בדיקות ממוקדות ו-all tests בסביבה הנכונה", minutes: 60, status: "implemented", required: true },
    { id: "batch6-finish-line", title: "Batch 6: להריץ npm run finish-line:pre-release", minutes: 45, status: "implemented", required: true },
    { id: "batch6-browser-final-audit", title: "Batch 6: לבדוק כניסה, אבחון, מסלול, שמירה וחזרה בדפדפן", minutes: 30, status: "implemented", required: true },
    { id: "batch6-final-report", title: "Batch 6: להפיק דוח סטטוס לתלמיד: מה ללמוד היום, מה ירוק ומה נשאר", minutes: 30, status: "implemented", required: true },
    { id: "exam100-placement-tests", title: "להוסיף בדיקות unit ל-placement score, רמה והמלצת מסלול", minutes: 90, status: "implemented", required: true },
    { id: "exam100-closed-path-tests", title: "להוסיף בדיקות closed path שמוודאות שמתחיל רואה רק next step ולא 20 טאבים", minutes: 120, status: "implemented", required: true },
    { id: "exam100-autosave-ui-tests", title: "להוסיף בדיקות UI למצבי saved/failed/restored/offline", minutes: 120, status: "implemented", required: true },
    { id: "exam100-fill-ambiguity-cleanup", title: "לנקות אזהרות Fill ambiguity אחרונות בשאלות מבחן", minutes: 180, status: "implemented", required: true },
    { id: "exam100-innerhtml-allowlist", title: "לסגור allowlist ל-innerHTML/insertAdjacentHTML/document.write במסכי המבחן", minutes: 120, status: "implemented", required: true },
    { id: "exam100-modular-entry", title: "להתחיל פירוק מונולית app.js סביב Exam 100 Path, Homework Exam Mode ו-diagnostics", minutes: 180, status: "implemented", required: true },
    { id: "exam100-release-gates", title: "להריץ ולתקן gates: coverage, material gaps, student export, top tabs, PWA, smoke, visual, build, finish-line", minutes: 180, status: "implemented", required: true },
    { id: "exam100-video-transcript", title: "וידאו video1151918075.mp4 נשאר unknown/unavailable עד אישור תמלול", minutes: 0, status: "blocked-by-policy", required: false },
  ],
};

var HOMEWORK_EXAM_TASK_TREE = typeof SVCOLLEGE_EXAM_TASKS_TREE !== "undefined" ? SVCOLLEGE_EXAM_TASKS_TREE : null;

function homeworkFormatMinutes(minutes) {
  var total = Math.max(0, Math.round(Number(minutes || 0)));
  var hours = Math.floor(total / 60);
  var rest = total % 60;
  if (!hours) return rest + " דק׳";
  if (!rest) return hours + " שעות";
  return hours + " שעות " + rest + " דק׳";
}

function appendExamTaskTreeToStudyPlan(plan, examTaskTree) {
  if (!plan || !examTaskTree || !Array.isArray(examTaskTree.studyTasks)) return;
  var minutes = Number(examTaskTree.studyMinutes || 0);
  if (!minutes) return;
  var timeLabel = homeworkFormatMinutes(minutes);
  plan.remainingTimePlan.examTaskTreeStudy = {
    id: examTaskTree.id,
    totalSections: examTaskTree.totalSections,
    branches: (examTaskTree.branches || []).length,
    subbranches: (examTaskTree.branches || []).reduce(function (sum, branch) {
      return sum + ((branch.subbranches || []).length);
    }, 0),
    minutes: minutes,
    label: timeLabel,
    sourceFiles: examTaskTree.sourceFiles || [],
    trainingOutputs: [
      "svcollege_fullstack_exam_trainer_v5/outputs/training/SVCOLLEGE_MODEL_TRAINING_TREE_PERSONAL_HE.md",
      "svcollege_fullstack_exam_trainer_v5/outputs/training/SVCOLLEGE_MODEL_TRAINING_TREE_MACHINE.json",
      "svcollege_fullstack_exam_trainer_v5/outputs/training/SVCOLLEGE_MODEL_CAPABILITY_100_REPORT.md",
      "svcollege_fullstack_exam_trainer_v5/outputs/training/SVCOLLEGE_PORTAL_IMPORT_PROMPT.md",
    ],
    includedInRequiredMinutes: false,
    boardModel: "73 section child tasks; time is already covered by the site/tree route tasks.",
  };
  plan.remainingTimePlan.requiredLabel = homeworkFormatMinutes(plan.remainingTimePlan.requiredMinutes);
  plan.remainingTimePlan.allPlansLabel = plan.remainingTimePlan.requiredLabel;
  plan.remainingTimePlan.note += " עץ 73 סעיפי המבחן מוצג כמשימות child בלוח ואינו נספר פעם נוספת בזמן החובה.";
  plan.remainingTimePlan.summary.push({
    label: "אימון עץ 73 סעיפי מבחן",
    minutes: 0,
    time: "זמן כלול במסלול האתר/עץ",
    required: true,
    note: "73 סעיפים מוצגים כמשימות child בלוח. לא סופרים 335 דקות פעם נוספת.",
  });
  if (HOMEWORK_EXAM_100_PATH && HOMEWORK_EXAM_100_PATH.finalStudentReport && HOMEWORK_EXAM_100_PATH.finalStudentReport.remainingPersonalStudy) {
    HOMEWORK_EXAM_100_PATH.finalStudentReport.remainingPersonalStudy.minutes = plan.remainingTimePlan.requiredMinutes;
    HOMEWORK_EXAM_100_PATH.finalStudentReport.remainingPersonalStudy.label = plan.remainingTimePlan.requiredLabel;
    HOMEWORK_EXAM_100_PATH.finalStudentReport.remainingPersonalStudy.examTaskTreeMinutes = minutes;
    HOMEWORK_EXAM_100_PATH.finalStudentReport.remainingPersonalStudy.examTaskTreeLabel = timeLabel;
  }
}

appendExamTaskTreeToStudyPlan(HOMEWORK_MASTER_PLAN, HOMEWORK_EXAM_TASK_TREE);

function appendMediaAssetPlanToStudyPlan(plan, mediaTasks) {
  if (!plan || !plan.remainingTimePlan || !mediaTasks) return;
  var videos = Array.isArray(mediaTasks.videos) ? mediaTasks.videos : [];
  var presentationImages = Array.isArray(mediaTasks.presentationImages) ? mediaTasks.presentationImages : [];
  var presentationImageMinutes = presentationImages.reduce(function (sum, item) {
    return sum + Number(item.minutes || mediaTasks.presentationImageMinutesEach || 20);
  }, 0);
  var videoMinutes = videos.reduce(function (sum, item) {
    return sum + Number(item.minutes || mediaTasks.videoMinutesEach || 30);
  }, 0);
  plan.remainingTimePlan.videoWatchCount = videos.length;
  plan.remainingTimePlan.videoWatchMinutesEach = Number(mediaTasks.videoMinutesEach || 30);
  plan.remainingTimePlan.videoWatchMinutes = videoMinutes;
  plan.remainingTimePlan.presentationImageCount = presentationImages.length;
  plan.remainingTimePlan.presentationImageMinutesEach = Number(mediaTasks.presentationImageMinutesEach || 20);
  plan.remainingTimePlan.presentationImageMinutes = presentationImageMinutes;
  plan.remainingTimePlan.mediaAssetPlan = {
    sourceRoot: mediaTasks.sourceRoot || "/Users/tal/Desktop/חומרים למבחן",
    videos: videos,
    presentationImages: presentationImages,
    policy: "שמות הקבצים נשלפו מתיקיית חומרים למבחן. הסרטונים והמצגות מסומנים ב-V לצפייה בלבד; וידאו ללא תמלול אינו מקור תוכן מוכח.",
  };
  plan.remainingTimePlan.requiredMinutes += presentationImageMinutes;
  plan.remainingTimePlan.requiredLabel = homeworkFormatMinutes(plan.remainingTimePlan.requiredMinutes);
  plan.remainingTimePlan.allPlansLabel = plan.remainingTimePlan.requiredLabel;
  plan.remainingTimePlan.note += " נוספו 40 מצגות/תמונות כמשימת צפייה חובה לפי 20 דקות לפריט.";
  plan.remainingTimePlan.summary.push({
    label: "צפייה ב-40 מצגות ותמונות",
    minutes: presentationImageMinutes,
    time: homeworkFormatMinutes(presentationImageMinutes),
    required: true,
    note: "20 דק׳ לכל מצגת/תמונה. מסמנים V לכל פריט אחרי צפייה.",
  });
  if (HOMEWORK_EXAM_100_PATH && HOMEWORK_EXAM_100_PATH.finalStudentReport && HOMEWORK_EXAM_100_PATH.finalStudentReport.remainingPersonalStudy) {
    HOMEWORK_EXAM_100_PATH.finalStudentReport.remainingPersonalStudy.minutes = plan.remainingTimePlan.requiredMinutes;
    HOMEWORK_EXAM_100_PATH.finalStudentReport.remainingPersonalStudy.label = plan.remainingTimePlan.requiredLabel;
    HOMEWORK_EXAM_100_PATH.finalStudentReport.remainingPersonalStudy.videoWatchMinutes = videoMinutes;
    HOMEWORK_EXAM_100_PATH.finalStudentReport.remainingPersonalStudy.videoWatchLabel = homeworkFormatMinutes(videoMinutes) + " צפייה ב-" + videos.length + " סרטונים";
    HOMEWORK_EXAM_100_PATH.finalStudentReport.remainingPersonalStudy.presentationImageMinutes = presentationImageMinutes;
    HOMEWORK_EXAM_100_PATH.finalStudentReport.remainingPersonalStudy.presentationImageLabel = homeworkFormatMinutes(presentationImageMinutes) + " צפייה ב-" + presentationImages.length + " מצגות ותמונות";
  }
}

appendMediaAssetPlanToStudyPlan(HOMEWORK_MASTER_PLAN, HOMEWORK_EXAM_MEDIA_TASKS);

var HOMEWORK_EXAM_MODE = {
  version: "homework-exam-mode-v6",
  title: "Homework Exam Mode",
  summary:
    "מבחני 60-90 דקות שנבנים משיעורי הבית ומדוגמאות המבחנים: פרויקט 70 נקודות, שאלת JavaScript 20 נקודות, שאלת TypeScript 10 נקודות.",
  activeProfile: HOMEWORK_CURRENT_EXAM_PROFILE,
  previousProfile: HOMEWORK_PREVIOUS_EXAM_PROFILE,
  allowedMaterials: HOMEWORK_EXAM_ALLOWED_MATERIALS,
  masterPlan: HOMEWORK_MASTER_PLAN,
  sources: HOMEWORK_EXAM_SOURCES,
  examExamples: HOMEWORK_EXAM_EXAMPLES,
  scoringRubric: HOMEWORK_SCORING_RUBRIC,
  materialCoverage: HOMEWORK_MATERIAL_COVERAGE,
  examRelevance: HOMEWORK_EXAM_RELEVANCE,
  exam100Path: HOMEWORK_EXAM_100_PATH,
  examTaskTree: HOMEWORK_EXAM_TASK_TREE,
  solutionGuideDrills: typeof SVCOLLEGE_SOLUTION_GUIDE_DRILLS !== "undefined" ? SVCOLLEGE_SOLUTION_GUIDE_DRILLS : null,
  portalPerfectionTasks: HOMEWORK_PORTAL_PERFECTION_TASKS,
  weekPlan: HOMEWORK_WEEK_PLAN,
  templates: HOMEWORK_EXAM_TEMPLATES,
  basicDiagnosticTracks: HOMEWORK_BASIC_DIAGNOSTIC_TRACKS,
  buildQuestions: HOMEWORK_EXAM_BUILD_QUESTIONS,
  jsQuestions: HOMEWORK_EXAM_JS_BUILD_QUESTIONS,
  tsQuestions: HOMEWORK_EXAM_TS_FILL_QUESTIONS,
  jsDrills: HOMEWORK_JS_DRILLS,
  mockExams: HOMEWORK_EXAM_TEMPLATES.map(function (template) {
    return {
      id: "mock_" + template.id,
      templateId: template.id,
      examTemplateId: template.examTemplateId,
      buildQuestionId: template.buildQuestionId,
      jsQuestionId: "build_homework_js_digit_length_sum",
      tsQuestionCount: 1,
      scoringBreakdown: { project: 70, javascript: 20, typescript: 10 },
      scoringDimensions: HOMEWORK_SCORING_RUBRIC.map(function (item) { return item.id; }),
    };
  }),
};

function appendHomeworkItemsOnce(target, items) {
  if (!Array.isArray(target)) return;
  var existing = {};
  for (var index = 0; index < target.length; index += 1) {
    if (target[index] && target[index].id) existing[target[index].id] = true;
  }
  for (var itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
    var item = items[itemIndex];
    if (item && item.id && !existing[item.id]) {
      target.push(item);
      existing[item.id] = true;
    }
  }
}

if (typeof window !== "undefined") {
  window.HOMEWORK_EXAM_MODE = HOMEWORK_EXAM_MODE;
  window.HOMEWORK_MATERIAL_COVERAGE = HOMEWORK_MATERIAL_COVERAGE;
  window.HOMEWORK_EXAM_RELEVANCE = HOMEWORK_EXAM_RELEVANCE;
  window.HOMEWORK_EXAM_100_PATH = HOMEWORK_EXAM_100_PATH;
  window.HOMEWORK_EXAM_TASK_TREE = HOMEWORK_EXAM_TASK_TREE;
  if (typeof SVCOLLEGE_SOLUTION_GUIDE_DRILLS !== "undefined") {
    window.SVCOLLEGE_SOLUTION_GUIDE_DRILLS = SVCOLLEGE_SOLUTION_GUIDE_DRILLS;
  }
  window.HOMEWORK_EXAM_BUILD_QUESTIONS = HOMEWORK_EXAM_BUILD_QUESTIONS;
  window.HOMEWORK_EXAM_JS_BUILD_QUESTIONS = HOMEWORK_EXAM_JS_BUILD_QUESTIONS;
  window.HOMEWORK_EXAM_TS_FILL_QUESTIONS = HOMEWORK_EXAM_TS_FILL_QUESTIONS;
  window.HOMEWORK_BASIC_DIAGNOSTIC_TRACKS = HOMEWORK_BASIC_DIAGNOSTIC_TRACKS;
  if (!window.QUESTIONS_BUILD) window.QUESTIONS_BUILD = [];
  appendHomeworkItemsOnce(window.QUESTIONS_BUILD, HOMEWORK_EXAM_BUILD_QUESTIONS.concat(HOMEWORK_EXAM_JS_BUILD_QUESTIONS));
  if (window.QUESTIONS_BANK) {
    if (!window.QUESTIONS_BANK.fill) window.QUESTIONS_BANK.fill = [];
    appendHomeworkItemsOnce(window.QUESTIONS_BANK.fill, HOMEWORK_EXAM_TS_FILL_QUESTIONS);
  }
}

if (typeof module !== "undefined") {
  module.exports = {
    HOMEWORK_EXAM_MODE: HOMEWORK_EXAM_MODE,
    HOMEWORK_MATERIAL_COVERAGE: HOMEWORK_MATERIAL_COVERAGE,
    HOMEWORK_EXAM_RELEVANCE: HOMEWORK_EXAM_RELEVANCE,
    HOMEWORK_EXAM_100_PATH: HOMEWORK_EXAM_100_PATH,
    HOMEWORK_EXAM_TASK_TREE: HOMEWORK_EXAM_TASK_TREE,
    SVCOLLEGE_SOLUTION_GUIDE_DRILLS: typeof SVCOLLEGE_SOLUTION_GUIDE_DRILLS !== "undefined" ? SVCOLLEGE_SOLUTION_GUIDE_DRILLS : null,
    HOMEWORK_EXAM_BUILD_QUESTIONS: HOMEWORK_EXAM_BUILD_QUESTIONS,
    HOMEWORK_EXAM_JS_BUILD_QUESTIONS: HOMEWORK_EXAM_JS_BUILD_QUESTIONS,
    HOMEWORK_EXAM_TS_FILL_QUESTIONS: HOMEWORK_EXAM_TS_FILL_QUESTIONS,
    HOMEWORK_BASIC_DIAGNOSTIC_TRACKS: HOMEWORK_BASIC_DIAGNOSTIC_TRACKS,
    HOMEWORK_EXAM_EXAMPLES: HOMEWORK_EXAM_EXAMPLES,
    HOMEWORK_MASTER_PLAN: HOMEWORK_MASTER_PLAN,
  };
}
