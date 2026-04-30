// data/guided_builds.js
// From-zero-to-feature build tracks for SVCollege Full Stack practice.

var GUIDED_BUILDS = [
  {
    id: "guided_react_task_filter",
    title: "React: Task Filter Feature",
    stack: ["React", "Vite", "JSX", "props", "useState"],
    outcome: "לבנות קומפוננטת משימות עם סינון active/done וחיווי ריק.",
    conceptKeys: [
      "lesson_21::Component",
      "lesson_21::JSX",
      "lesson_21::props",
      "lesson_21::map",
      "lesson_22::useState",
    ],
    steps: [
      {
        title: "שלד קומפוננטה",
        goal: "צור TaskList שמקבלת items דרך props ומחזירה section עם כותרת.",
        files: ["src/TaskList.jsx"],
        checks: ["הקומפוננטה היא function", "יש prop בשם items", "יש return עם JSX אחד ברור"],
      },
      {
        title: "רינדור רשימה",
        goal: "הצג כל משימה עם map ו-key יציב לפי id.",
        files: ["src/TaskList.jsx"],
        checks: ["משתמשים ב-map", "כל item מקבל key={task.id}", "אין mutation ל-items"],
      },
      {
        title: "סינון מצב",
        goal: "הוסף useState שמחזיק filter ומציג active/done/all.",
        files: ["src/TaskList.jsx", "src/App.jsx"],
        checks: ["filter נשמר ב-useState", "כפתורי filter משנים state", "הרשימה מחושבת מתוך items ולא נשמרת כפול"],
      },
      {
        title: "מצב ריק",
        goal: "אם אין תוצאות, הצג הודעה קצרה במקום רשימה ריקה.",
        files: ["src/TaskList.jsx"],
        checks: ["יש תנאי לאורך הרשימה המסוננת", "הודעת empty ברורה", "אין שגיאת undefined כש-items ריק"],
      },
    ],
    completionProof: ["npm run build עובר", "הסינון עובד לשלושה מצבים", "יש צילום/תיאור של מצב empty"],
  },
  {
    id: "guided_node_notes_api",
    title: "Node: Notes REST API",
    stack: ["Node.js", "Express", "REST API", "JSON"],
    outcome: "לבנות API מקומי לניהול notes עם GET/POST וסטטוסים נכונים.",
    conceptKeys: [
      "lesson_17::Server",
      "lesson_17::Express",
      "lesson_17::REST API",
      "lesson_17::app.get",
      "lesson_17::app.post",
      "lesson_17::Status Codes",
    ],
    steps: [
      {
        title: "שרת בסיסי",
        goal: "צור app של Express שמאזין על port ומחזיר health check.",
        files: ["server.js"],
        checks: ["app.listen קיים", "GET /health מחזיר JSON", "אין credentials בקוד"],
      },
      {
        title: "קריאת notes",
        goal: "הוסף GET /notes שמחזיר מערך notes קיים בזיכרון מקומי.",
        files: ["server.js"],
        checks: ["התגובה היא JSON", "סטטוס הצלחה הוא 200", "אין שימוש בנתוני דמה שלא הוגדרו על ידי המשתמש"],
      },
      {
        title: "יצירת note",
        goal: "הוסף POST /notes שמקבל title/body ומחזיר 201 או 400 אם חסר שדה.",
        files: ["server.js"],
        checks: ["body נקרא דרך middleware מתאים", "חסר title מחזיר 400", "יצירה תקינה מחזירה 201"],
      },
      {
        title: "בדיקת API",
        goal: "כתוב פקודות curl או בדיקת HTTP קצרה לשני המסלולים.",
        files: ["README.md"],
        checks: ["יש דוגמת GET", "יש דוגמת POST", "מתועד מה מצופה בכל סטטוס"],
      },
    ],
    completionProof: ["GET /health עובד", "POST /notes תקין מחזיר 201", "POST חסר title מחזיר 400"],
  },
  {
    id: "guided_nextjs_dashboard_route",
    title: "Next.js: Dashboard Route",
    stack: ["Next.js", "App Router", "route handler", "server component"],
    outcome: "לבנות עמוד dashboard עם route handler שמחזיר נתונים מקומיים ומוצגים ב-server component.",
    conceptKeys: [
      "lesson_nextjs::Next.js",
      "lesson_nextjs::App Router",
      "lesson_nextjs::file-system routing",
      "lesson_nextjs::server component",
      "lesson_nextjs::route handler",
      "lesson_nextjs::metadata API",
    ],
    steps: [
      {
        title: "מסלול עמוד",
        goal: "צור app/dashboard/page.tsx עם כותרת ומבנה semantic.",
        files: ["app/dashboard/page.tsx"],
        checks: ["הקובץ נמצא תחת app/dashboard", "הקומפוננטה async רק אם צריך fetch", "אין client directive בלי צורך"],
      },
      {
        title: "Route handler",
        goal: "צור app/api/summary/route.ts שמחזיר JSON עם metrics שמגיעים מקבוע מקומי.",
        files: ["app/api/summary/route.ts"],
        checks: ["GET מחזיר Response.json", "אין fetch לכתובת חיצונית", "הנתונים מתוארים כ-local/unavailable אם חסר מקור"],
      },
      {
        title: "חיבור עמוד לנתונים",
        goal: "הצג את summary בעמוד dashboard בלי לחשוף secret או token.",
        files: ["app/dashboard/page.tsx"],
        checks: ["אין NEXT_PUBLIC עבור סוד", "שגיאת fetch מטופלת", "UI מציג unknown/unavailable כשאין נתון"],
      },
      {
        title: "Metadata",
        goal: "הוסף title/description דרך metadata API.",
        files: ["app/dashboard/page.tsx"],
        checks: ["export const metadata קיים", "title ברור", "description מתאר את העמוד"],
      },
    ],
    completionProof: ["npm run build עובר", "GET /api/summary מחזיר JSON", "dashboard מציג fallback כשאין נתון"],
  },
  {
    id: "guided_typescript_model_guard",
    title: "TypeScript: Model + Guard",
    stack: ["TypeScript", "interface", "union", "type safety"],
    outcome: "להגדיר מודל Todo, guard לקלט לא ידוע ופונקציה שמחזירה status בטוח.",
    conceptKeys: [
      "lesson_26::TypeScript",
      "lesson_26::interface",
      "lesson_26::union",
      "lesson_26::type annotation",
      "lesson_26::never",
      "lesson_26::Type Safety",
    ],
    steps: [
      {
        title: "מודל נתונים",
        goal: "צור interface Todo עם id, title ו-status מוגבל.",
        files: ["src/models/Todo.ts"],
        checks: ["id הוא string", "title הוא string", "status הוא union ולא string כללי"],
      },
      {
        title: "Guard לקלט",
        goal: "כתוב isTodo(value: unknown): value is Todo שמוודא את כל השדות.",
        files: ["src/models/Todo.ts"],
        checks: ["הפרמטר הוא unknown", "אין any", "הבדיקה מחזירה boolean מבוסס שדות"],
      },
      {
        title: "Exhaustive status",
        goal: "כתוב labelForStatus עם switch ו-never ל-default.",
        files: ["src/models/Todo.ts"],
        checks: ["switch מכסה את כל ה-union", "default משתמש ב-never", "הפונקציה מחזירה string"],
      },
      {
        title: "בדיקת type-check",
        goal: "הוסף npm script שמריץ tsc --noEmit.",
        files: ["package.json"],
        checks: ["script בשם typecheck קיים", "tsc --noEmit מופיע", "הבדיקה לא תלויה ב-build"],
      },
    ],
    completionProof: ["npm run typecheck עובר", "isTodo דוחה קלט חסר title", "labelForStatus מכסה את כל הסטטוסים"],
  },
];

if (typeof window !== "undefined") {
  window.GUIDED_BUILDS = GUIDED_BUILDS;
}
