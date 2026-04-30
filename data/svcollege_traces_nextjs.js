// data/svcollege_traces_nextjs.js
// SVCollege Finish Line 1 - Next.js Code Trace practice.

var SVCOLLEGE_NEXTJS_TRACES = [
  {
    id: "trace_svnext_001",
    conceptKey: "lesson_nextjs::dynamic route",
    level: 5,
    title: "מעקב אחרי dynamic product page",
    code:
      "export default async function ProductPage({ params }) {\n  const product = await products.findById(params.id);\n  if (!product) return notFound();\n  return <ProductDetails product={product} />;\n}",
    steps: [
      {
        line: 1,
        prompt: "מאיפה מגיע params.id?",
        answer: "מה-dynamic route ב-URL",
        acceptable: ["URL", "dynamic route", "[id]", "params"],
        hint: "הסתכל על נתיב כמו app/products/[id]/page.jsx.",
      },
      {
        line: 2,
        prompt: "איזו פעולה מתבצעת לפני render?",
        answer: "טעינת product לפי id",
        acceptable: ["findById", "טעינת מוצר", "products.findById"],
        hint: "הפונקציה async כי היא מביאה נתונים.",
      },
      {
        line: 3,
        prompt: "מה קורה אם אין product?",
        answer: "notFound",
        acceptable: ["notFound()", "404", "not found"],
        hint: "קרא את תנאי ה-if.",
      },
    ],
    explanation:
      "ה-route הדינמי לוקח id מה-URL, מביא את המשאב, עוצר אם הוא לא קיים, ואז מרנדר פרטים.",
    requiredConcepts: ["lesson_nextjs::dynamic route", "lesson_sql_orm::CRUD"],
    requiredTerms: ["params", "findById", "notFound"],
    sideExplanation:
      "Trace כזה בודק את שרשרת היסוד: URL -> params -> data lookup -> render או 404.",
  },
  {
    id: "trace_svnext_002",
    conceptKey: "lesson_nextjs::route handler",
    level: 5,
    title: "מעקב אחרי POST route handler",
    code:
      "export async function POST(request) {\n  const user = await requireUser();\n  const body = validateTaskInput(await request.json());\n  const saved = await tasks.create({ ...body, ownerId: user.id });\n  return Response.json(saved, { status: 201 });\n}",
    steps: [
      {
        line: 2,
        prompt: "מה הפעולה הראשונה שמגנה על ה-route?",
        answer: "requireUser",
        acceptable: ["requireUser", "auth", "אימות משתמש"],
        hint: "לפני קריאת הקלט בודקים מי המשתמש.",
      },
      {
        line: 3,
        prompt: "למה validateTaskInput חשוב?",
        answer: "כדי לבדוק קלט לפני שמירה",
        acceptable: ["validation", "בדיקת קלט", "validate"],
        hint: "קלט מהלקוח אינו אמין עד שבודקים אותו.",
      },
      {
        line: 4,
        prompt: "מאיפה מגיע ownerId?",
        answer: "user.id",
        acceptable: ["user.id", "מהמשתמש המחובר"],
        hint: "לא לוקחים ownerId מה-body של הלקוח.",
      },
    ],
    explanation:
      "ה-route מראה סדר backend תקין: auth, validation, שיוך בעלות ואז שמירה.",
    requiredConcepts: ["lesson_nextjs::API route", "lesson_auth_security::authorization", "lesson_18::validation"],
    requiredTerms: ["POST", "request.json", "ownerId", "201"],
    sideExplanation:
      "הדרך הבטוחה היא שהשרת קובע בעלות לפי המשתמש המחובר, לא לפי טקסט שנשלח מהדפדפן.",
  },
  {
    id: "trace_svnext_003",
    conceptKey: "lesson_nextjs::client component",
    level: 5,
    title: "מעקב אחרי client boundary קטן",
    code:
      "\"use client\";\n\nexport function FavoriteButton({ productId }) {\n  const [saved, setSaved] = useState(false);\n  return <button onClick={() => setSaved(!saved)}>{saved ? 'Saved' : 'Save'}</button>;\n}",
    steps: [
      {
        line: 1,
        prompt: "מה אומר \"use client\"?",
        answer: "הרכיב רץ בדפדפן",
        acceptable: ["client component", "בדפדפן", "לקוח"],
        hint: "ה-directive מסמן גבול הרצה.",
      },
      {
        line: 4,
        prompt: "איזה state משתנה בלחיצה?",
        answer: "saved",
        acceptable: ["saved", "setSaved"],
        hint: "חפש את useState.",
      },
      {
        line: 5,
        prompt: "למה הרכיב הזה לא חייב להיות כל העמוד?",
        answer: "רק הכפתור אינטראקטיבי",
        acceptable: ["רק הכפתור", "boundary קטן", "אינטראקציה קטנה"],
        hint: "אפשר להשאיר את רוב page כ-server component.",
      },
    ],
    explanation:
      "Client boundary קטן שומר על אינטראקציה בלי להפוך את כל העמוד ל-JavaScript בצד לקוח.",
    requiredConcepts: ["lesson_nextjs::client component", "lesson_nextjs::server component"],
    requiredTerms: ["use client", "useState", "onClick", "bundle"],
    sideExplanation:
      "זה הפטנט החשוב לביצועים: רק החלק שצריך אירועים חי בדפדפן.",
  },
  {
    id: "trace_svnext_app_router_001",
    conceptKey: "lesson_nextjs::App Router",
    level: 5,
    title: "App Router מחבר layout ו-page",
    code:
      "// app/dashboard/layout.jsx\nexport default function DashboardLayout({ children }) {\n  return <section><nav>Dashboard</nav>{children}</section>;\n}\n\n// app/dashboard/page.jsx\nexport default function DashboardPage() {\n  return <h1>Overview</h1>;\n}",
    steps: [
      {
        line: 2,
        prompt: "איזה prop מכניס את תוכן ה-page לתוך ה-layout?",
        answer: "children",
        hint: "layout עוטף את התוכן שמתחתיו בעץ ה-app.",
      },
      {
        line: 3,
        prompt: "איזה אלמנט משותף נשאר סביב ה-page?",
        answer: "nav",
        acceptable: ["<nav>", "Dashboard nav"],
        hint: "ה-layout מחזיק chrome משותף.",
      },
      {
        line: 7,
        prompt: "איזה component הוא ה-page עצמו?",
        answer: "DashboardPage",
        hint: "page.jsx מגדיר את המסך של הנתיב.",
      },
    ],
    explanation:
      "App Router בונה עץ route מתוך תיקיית app. layout עוטף children משותפים, ו-page מגדיר את התוכן הסופי של הנתיב.",
    requiredConcepts: ["lesson_nextjs::App Router", "lesson_nextjs::layout"],
    requiredTerms: ["app", "layout", "page", "children"],
    sideExplanation:
      "הבנת App Router מתחילה מהקשר בין קבצים לשכבות UI: layout נשאר, page מתחלף.",
  },
  {
    id: "trace_svnext_file_system_routing_001",
    conceptKey: "lesson_nextjs::file-system routing",
    level: 4,
    title: "File-system routing לפי שמות תיקיות",
    code:
      "const files = [\n  'app/page.jsx',\n  'app/tasks/page.jsx',\n  'app/tasks/[id]/page.jsx'\n];\n\nconst routes = files.map((file) => file.replace('app', '').replace('/page.jsx', '') || '/');\nconsole.log(routes);",
    steps: [
      {
        line: 2,
        prompt: "איזה קובץ מייצג את route הבית?",
        answer: "app/page.jsx",
        hint: "page.jsx בשורש app הוא /.",
      },
      {
        line: 3,
        prompt: "איזה route מייצג app/tasks/page.jsx?",
        answer: "/tasks",
        hint: "שם התיקייה הופך לחלק מהנתיב.",
      },
      {
        line: 4,
        prompt: "מה מסמן [id] בשם התיקייה?",
        answer: "dynamic route",
        acceptable: ["פרמטר דינמי", "dynamic segment", "id דינמי"],
        hint: "סוגריים מרובעים מגדירים segment משתנה.",
      },
    ],
    explanation:
      "ב-Next.js App Router, מבנה התיקיות מגדיר routes. קובץ page.jsx הוא המסך, ותיקיות כמו [id] מגדירות פרמטרים דינמיים.",
    requiredConcepts: ["lesson_nextjs::file-system routing", "lesson_nextjs::dynamic route"],
    requiredTerms: ["app", "page.jsx", "route", "[id]"],
    sideExplanation:
      "זה חוסך router ידני אבל מחייב להבין שכל שינוי בשם תיקייה משנה URL.",
  },
  {
    id: "trace_svnext_image_optimization_001",
    conceptKey: "lesson_nextjs::image optimization",
    level: 4,
    title: "Image optimization עם width ו-height",
    code:
      "import Image from 'next/image';\n\nexport default function Avatar() {\n  return <Image src=\"/avatars/tal.png\" alt=\"Tal\" width={96} height={96} priority />;\n}",
    steps: [
      {
        line: 1,
        prompt: "מאיזו חבילה מגיע Image?",
        answer: "next/image",
        hint: "זה component מובנה של Next.js.",
      },
      {
        line: 4,
        prompt: "איזה prop מתאר טקסט חלופי לתמונה?",
        answer: "alt",
        hint: "נגישות ו-SEO דורשים alt משמעותי.",
      },
      {
        line: 4,
        prompt: "אילו שני props עוזרים לשמור מקום בתצוגה?",
        answer: "width ו-height",
        acceptable: ["width height", "width,height"],
        hint: "הם מונעים layout shift.",
      },
    ],
    explanation:
      "next/image מסייע באופטימיזציה, גדלים וטעינה. width/height מקבעים יחס, ו-alt שומר על נגישות ו-SEO.",
    requiredConcepts: ["lesson_nextjs::image optimization", "lesson_nextjs::SEO"],
    requiredTerms: ["next/image", "alt", "width", "height"],
    sideExplanation:
      "תמונה מהירה היא לא רק דחיסה: היא גם לא מזיזה תוכן בזמן טעינה.",
  },
  {
    id: "trace_svnext_isr_001",
    conceptKey: "lesson_nextjs::ISR",
    level: 5,
    title: "ISR עם revalidate",
    code:
      "export const revalidate = 300;\n\nexport default async function CatalogPage() {\n  const products = await fetchProducts();\n  return <ProductList products={products} />;\n}",
    steps: [
      {
        line: 1,
        prompt: "כל כמה שניות העמוד יכול להתעדכן מחדש?",
        answer: "300",
        hint: "revalidate מוגדר בשניות.",
      },
      {
        line: 4,
        prompt: "איזו פעולה מביאה נתונים לפני render?",
        answer: "fetchProducts",
        hint: "ה-page הוא async.",
      },
      {
        line: 5,
        prompt: "לאיזה component מועברים products?",
        answer: "ProductList",
        hint: "קרא את ה-JSX שחוזר.",
      },
    ],
    explanation:
      "ISR מאפשר לשמור עמוד סטטי שמתעדכן בפרקי זמן מוגדרים. זה טוב לתוכן שמשתנה מדי פעם ולא צריך SSR בכל בקשה.",
    requiredConcepts: ["lesson_nextjs::ISR", "lesson_nextjs::SSG"],
    requiredTerms: ["revalidate", "static", "async page"],
    sideExplanation:
      "הבחירה בין ISR ל-SSR היא החלטת freshness מול עלות ביצועים.",
  },
  {
    id: "trace_svnext_layout_001",
    conceptKey: "lesson_nextjs::layout",
    level: 4,
    title: "Layout שומר shell משותף",
    code:
      "export default function RootLayout({ children }) {\n  return (\n    <html lang=\"he\" dir=\"rtl\">\n      <body><header>Portal</header>{children}</body>\n    </html>\n  );\n}",
    steps: [
      {
        line: 1,
        prompt: "איזה prop מייצג את ה-page או layout הפנימי?",
        answer: "children",
        hint: "children נשתל בתוך ה-body.",
      },
      {
        line: 3,
        prompt: "איזה attribute מגדיר RTL?",
        answer: "dir",
        acceptable: ["dir=\"rtl\"", "dir"],
        hint: "זה נמצא על html.",
      },
      {
        line: 4,
        prompt: "איזה אזור נשאר משותף לכל הילדים?",
        answer: "header",
        acceptable: ["<header>", "Portal header"],
        hint: "header נמצא ב-layout.",
      },
    ],
    explanation:
      "layout מגדיר shell משותף ומכניס את route הנוכחי דרך children. ב-root layout מגדירים גם html/body ומאפייני שפה/כיוון.",
    requiredConcepts: ["lesson_nextjs::layout", "lesson_nextjs::page"],
    requiredTerms: ["layout", "children", "html", "body"],
    sideExplanation:
      "אם header מופיע בכל עמוד, הוא שייך ל-layout ולא צריך לשכפל אותו בכל page.",
  },
  {
    id: "trace_svnext_framework_001",
    conceptKey: "lesson_nextjs::Next.js",
    level: 4,
    title: "Next.js משלב frontend ו-backend route",
    code:
      "// app/page.jsx\nexport default function HomePage() {\n  return <a href=\"/api/health\">Health</a>;\n}\n\n// app/api/health/route.js\nexport function GET() {\n  return Response.json({ ok: true });\n}",
    steps: [
      {
        line: 2,
        prompt: "איזה קובץ מייצג UI route?",
        answer: "app/page.jsx",
        hint: "page.jsx מחזיר JSX.",
      },
      {
        line: 7,
        prompt: "איזו פונקציה מטפלת בבקשת GET?",
        answer: "GET",
        hint: "route.js מייצא handlers לפי HTTP method.",
      },
      {
        line: 8,
        prompt: "מה חוזר מה-API route?",
        answer: "{ ok: true }",
        acceptable: ["ok true", "Response.json({ ok: true })"],
        hint: "זה JSON response.",
      },
    ],
    explanation:
      "Next.js מאפשר באותו פרויקט גם pages/components וגם route handlers לצד שרת, ולכן הוא מתאים למסלול Full Stack.",
    requiredConcepts: ["lesson_nextjs::Next.js", "lesson_nextjs::route handler"],
    requiredTerms: ["page.jsx", "route.js", "GET", "Response.json"],
    sideExplanation:
      "היתרון הוא לא קסם: עדיין צריך להבין מה רץ כ-UI ומה רץ כ-API.",
  },
  {
    id: "trace_svnext_page_001",
    conceptKey: "lesson_nextjs::page",
    level: 4,
    title: "Page הוא leaf route שמחזיר UI",
    code:
      "export default async function TasksPage() {\n  const tasks = await getTasks();\n  return <main>{tasks.map((task) => <p key={task.id}>{task.title}</p>)}</main>;\n}",
    steps: [
      {
        line: 1,
        prompt: "מה שם ה-page component?",
        answer: "TasksPage",
        hint: "זה export default.",
      },
      {
        line: 2,
        prompt: "איזו פעולה מביאה tasks לפני render?",
        answer: "getTasks",
        hint: "הפונקציה async.",
      },
      {
        line: 3,
        prompt: "איזה key ניתן לכל task ברשימה?",
        answer: "task.id",
        hint: "React צריך key יציב ברשימות.",
      },
    ],
    explanation:
      "page הוא הקובץ שמסיים route ומחזיר את ה-UI שלו. ב-App Router הוא יכול להיות async server component כברירת מחדל.",
    requiredConcepts: ["lesson_nextjs::page", "lesson_nextjs::server component"],
    requiredTerms: ["page", "async", "map", "key"],
    sideExplanation:
      "page לא חייב להיות client component; אם אין state/browser events, עדיף להשאיר אותו server-side.",
  },
  {
    id: "trace_svnext_seo_001",
    conceptKey: "lesson_nextjs::SEO",
    level: 5,
    title: "SEO דרך metadata",
    code:
      "export const metadata = {\n  title: 'Task Manager',\n  description: 'Track tasks and deadlines'\n};\n\nexport default function Page() {\n  return <h1>Task Manager</h1>;\n}",
    steps: [
      {
        line: 1,
        prompt: "איזה export מספק נתוני SEO?",
        answer: "metadata",
        hint: "Next.js קורא את metadata ב-App Router.",
      },
      {
        line: 2,
        prompt: "איזה שדה קובע את title?",
        answer: "title",
        hint: "זה מופיע בתוך metadata.",
      },
      {
        line: 7,
        prompt: "איזה טקסט מוצג גם ב-H1?",
        answer: "Task Manager",
        hint: "SEO טוב מתחבר גם לתוכן הנראה.",
      },
    ],
    explanation:
      "metadata API מאפשר להגדיר title/description בצורה מובנית. SEO אינו רק meta tags; הוא גם תוכן ברור ונגיש.",
    requiredConcepts: ["lesson_nextjs::SEO", "lesson_nextjs::metadata API"],
    requiredTerms: ["metadata", "title", "description", "H1"],
    sideExplanation:
      "metadata טובה לא תציל עמוד שתוכן ה-H1 שלו לא מסביר מה המשתמש רואה.",
  },
  {
    id: "trace_svnext_server_action_001",
    conceptKey: "lesson_nextjs::server action",
    level: 5,
    title: "Server action שומרת form בצד שרת",
    code:
      "\"use server\";\n\nexport async function createTask(formData) {\n  const title = String(formData.get('title') || '').trim();\n  if (!title) return { error: 'title required' };\n  await tasks.create({ title });\n  return { ok: true };\n}",
    steps: [
      {
        line: 1,
        prompt: "איזו directive מסמנת שהפעולה רצה בשרת?",
        answer: "use server",
        acceptable: ["\"use server\"", "use server"],
        hint: "זו שורה ראשונה בקובץ/פונקציה.",
      },
      {
        line: 4,
        prompt: "איזה field נקרא מתוך formData?",
        answer: "title",
        hint: "formData.get('title').",
      },
      {
        line: 6,
        prompt: "איזו פעולה שומרת את המשימה?",
        answer: "tasks.create",
        hint: "היא רצה רק אחרי validation.",
      },
    ],
    explanation:
      "server action מאפשרת לבצע mutation בצד שרת מתוך flow של form. עדיין חייבים validation והרשאות לפני שמירה.",
    requiredConcepts: ["lesson_nextjs::server action", "lesson_18::validation"],
    requiredTerms: ["use server", "formData", "validation", "mutation"],
    sideExplanation:
      "server action אינה קיצור דרך לעקוף בדיקות אבטחה; היא רק משנה את נקודת החיבור בין form לשרת.",
  },
  {
    id: "trace_svnext_server_component_001",
    conceptKey: "lesson_nextjs::server component",
    level: 5,
    title: "Server component קורא נתונים בלי useEffect",
    code:
      "export default async function OrdersPage() {\n  const orders = await db.orders.findMany();\n  return <OrdersTable orders={orders} />;\n}",
    steps: [
      {
        line: 1,
        prompt: "מה מסמן שה-component יכול להמתין לנתונים?",
        answer: "async",
        hint: "server component יכול להיות async.",
      },
      {
        line: 2,
        prompt: "איפה נקראים הנתונים?",
        answer: "בשרת",
        acceptable: ["server", "server component", "db.orders.findMany"],
        hint: "אין כאן useEffect בדפדפן.",
      },
      {
        line: 3,
        prompt: "לאיזה component מועברים orders?",
        answer: "OrdersTable",
        hint: "קרא את ה-return.",
      },
    ],
    explanation:
      "server component רץ בשרת כברירת מחדל ב-App Router, ולכן יכול להביא נתונים לפני שליחת ה-HTML/stream ללקוח.",
    requiredConcepts: ["lesson_nextjs::server component", "lesson_nextjs::client component"],
    requiredTerms: ["server component", "async", "db", "props"],
    sideExplanation:
      "אם אין צורך באירועי דפדפן, server component מפחית JavaScript שנשלח ללקוח.",
  },
  {
    id: "trace_svnext_ssr_001",
    conceptKey: "lesson_nextjs::SSR",
    level: 5,
    title: "SSR מביא נתון בכל בקשה",
    code:
      "export const dynamic = 'force-dynamic';\n\nexport default async function AccountPage() {\n  const account = await getCurrentAccount();\n  return <AccountSummary account={account} />;\n}",
    steps: [
      {
        line: 1,
        prompt: "איזה ערך מכריח rendering דינמי?",
        answer: "force-dynamic",
        hint: "dynamic מגדיר שהעמוד לא סטטי.",
      },
      {
        line: 4,
        prompt: "איזו פעולה מביאה נתון תלוי משתמש/בקשה?",
        answer: "getCurrentAccount",
        hint: "חשבון נוכחי תלוי בבקשה.",
      },
      {
        line: 5,
        prompt: "לאיזה component נשלח account?",
        answer: "AccountSummary",
        hint: "הנתון עובר כ-prop.",
      },
    ],
    explanation:
      "SSR מתאים לנתונים שתלויים בבקשה, משתמש או freshness גבוה. המחיר הוא עבודה בשרת בכל בקשה.",
    requiredConcepts: ["lesson_nextjs::SSR", "lesson_auth_security::authentication"],
    requiredTerms: ["SSR", "dynamic", "request", "server render"],
    sideExplanation:
      "לא כל עמוד צריך SSR. בוחרים בו כשמידע אישי או עדכני חשוב יותר מ-cache סטטי.",
  },
  {
    id: "trace_svnext_vercel_deploy_001",
    conceptKey: "lesson_nextjs::Vercel deploy",
    level: 5,
    title: "Vercel deploy קורא build command",
    code:
      "{\n  \"scripts\": {\n    \"build\": \"next build\",\n    \"start\": \"next start\"\n  }\n}\n\n// Vercel runs the build command before production deployment.",
    steps: [
      {
        line: 3,
        prompt: "איזה script בונה את הפרויקט?",
        answer: "build",
        hint: "זה key תחת scripts.",
      },
      {
        line: 3,
        prompt: "איזו פקודה רצה בזמן build?",
        answer: "next build",
        hint: "זה הערך של script build.",
      },
      {
        line: 8,
        prompt: "מתי Vercel מריץ build command?",
        answer: "לפני production deployment",
        acceptable: ["לפני deploy", "before production deployment", "לפני פרודקשן"],
        hint: "קרא את ההערה בסוף.",
      },
    ],
    explanation:
      "Vercel deploy נשען על build תקין. ב-Next.js build מריץ בדיקות קומפילציה/אופטימיזציה ומכין את artifact לפרודקשן.",
    requiredConcepts: ["lesson_nextjs::Vercel deploy", "lesson_devops_deploy::build command"],
    requiredTerms: ["Vercel", "build", "next build", "production"],
    sideExplanation:
      "Deploy ירוק לא מתחיל בכפתור; הוא מתחיל ב-build command שחוזר בלי שגיאות.",
  },
];

function appendNextjsTraceItemsOnce(target, items) {
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
  window.SVCOLLEGE_NEXTJS_TRACES = SVCOLLEGE_NEXTJS_TRACES;
  if (!window.QUESTIONS_TRACE) window.QUESTIONS_TRACE = [];
  appendNextjsTraceItemsOnce(window.QUESTIONS_TRACE, SVCOLLEGE_NEXTJS_TRACES);
  if (window.QUESTIONS_BANK) {
    window.QUESTIONS_BANK.trace = window.QUESTIONS_TRACE;
  }
}

if (typeof module !== "undefined") {
  module.exports = { SVCOLLEGE_NEXTJS_TRACES: SVCOLLEGE_NEXTJS_TRACES };
}
