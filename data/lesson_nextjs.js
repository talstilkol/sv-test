// data/lesson_nextjs.js
// SVCollege Finish Line 1 - Next.js SSR/API/SEO bridge lesson.

var LESSON_NEXTJS = {
  id: "lesson_nextjs",
  title: "Next.js Full-Stack - Routing, SSR, API ו-SEO",
  description:
    "איך Next.js מחבר React, routing, שרת, data fetching, SEO ו-deploy לאפליקציית Full Stack אחת.",
  svcollegeModule: "פיתוח Full-Stack עם Next.js - SSR, API Routes, SEO",
  sourceAssets: [],
  sourceCoverageNote:
    "מודול SVCollege דורש Next.js intro/advanced, API routes ו-SEO. מקור שיעור Next מקומי ייעודי הוא unknown/unavailable, לכן זהו bridge עצמאי שמכסה את פער הקוריקולום.",
  concepts: [
    {
      conceptName: "Next.js",
      difficulty: 4,
      simpleExplanation:
        "Next.js הוא framework מעל React שמוסיף routing, רינדור בצד שרת, API routes, build ו-deploy מסודר.",
      whyFullStack:
        "במקום לחבר React app ושרת בנפרד לכל דבר, Next.js נותן מבנה אחד שבו עמודים, נתונים ו-API יכולים לחיות יחד.",
      codeExample:
        "export default function HomePage() {\n  return <main>ברוכים הבאים</main>;\n}",
      codeExplanation:
        "קומפוננטת React בתוך קובץ page הופכת לעמוד שנפתח לפי מיקום הקובץ בתיקיית app.",
      commonMistake:
        "לחשוב ש-Next.js מחליף את React. הוא משתמש ב-React ומוסיף שכבות שרת, routing ו-build.",
      prerequisite: "lesson_21::React",
    },
    {
      conceptName: "App Router",
      difficulty: 4,
      simpleExplanation:
        "App Router הוא מודל routing שבו תיקיית app מגדירה עמודים, layouts ו-route handlers לפי מבנה קבצים.",
      whyFullStack:
        "הוא נותן מבנה צפוי למסכים, אזורי layout משותפים וגבולות בין server/client code.",
      codeExample:
        "app/\n  layout.jsx\n  page.jsx\n  dashboard/page.jsx",
      codeExplanation:
        "כל תיקייה מייצגת segment ב-URL, וקובץ page מייצג את המסך באותו segment.",
      commonMistake:
        "לערבב בין Pages Router הישן לבין App Router בלי להבין איזה conventions הפרויקט משתמש בהם.",
      prerequisite: "lesson_nextjs::Next.js",
    },
    {
      conceptName: "file-system routing",
      difficulty: 3,
      simpleExplanation:
        "file-system routing אומר שה-URL נוצר ממבנה התיקיות והקבצים, לא מרשימת routes ידנית.",
      whyFullStack:
        "זה מקטין boilerplate ונותן קשר ברור בין כתובת בדפדפן לבין הקובץ שאחראי עליה.",
      codeExample:
        "app/about/page.jsx -> /about\napp/products/page.jsx -> /products",
      codeExplanation:
        "התיקייה about יוצרת segment בשם about, וקובץ page הוא מה שמרונדר בנתיב הזה.",
      commonMistake:
        "ליצור קובץ component רגיל ולצפות שהוא יהפוך ל-route בלי page/layout/route במקום הנכון.",
      prerequisite: "lesson_nextjs::App Router",
    },
    {
      conceptName: "dynamic route",
      difficulty: 4,
      simpleExplanation:
        "dynamic route הוא נתיב עם חלק משתנה, למשל product id, שמוגדר באמצעות סוגריים מרובעים בשם התיקייה.",
      whyFullStack:
        "כמעט כל אפליקציה צריכה עמודי פריט: מוצר, פוסט, משתמש או הזמנה לפי id.",
      codeExample:
        "app/products/[id]/page.jsx\n\nexport default function ProductPage({ params }) {\n  return <h1>Product {params.id}</h1>;\n}",
      codeExplanation:
        "החלק [id] ב-URL נכנס ל-params.id, ולכן אותו קובץ יכול לשרת הרבה מוצרים.",
      commonMistake:
        "לקחת id מה-URL בלי validation או בלי לבדוק שהמשאב באמת קיים.",
      prerequisite: "lesson_17::Request",
    },
    {
      conceptName: "layout",
      difficulty: 4,
      simpleExplanation:
        "layout הוא wrapper קבוע שמקיף page ויכול להחזיק header, sidebar, provider או מבנה משותף.",
      whyFullStack:
        "layout מונע שכפול של UI ונותן מקום טבעי למבנה שחוזר בכל אזור באפליקציה.",
      codeExample:
        "export default function DashboardLayout({ children }) {\n  return <section><nav>Menu</nav>{children}</section>;\n}",
      codeExplanation:
        "children הוא העמוד הפנימי. ה-layout נשאר סביבו באזור הרלוונטי.",
      commonMistake:
        "להעתיק header/sidebar לכל page במקום לשים אותם ב-layout משותף.",
      prerequisite: "lesson_21::props",
    },
    {
      conceptName: "page",
      difficulty: 3,
      simpleExplanation:
        "page הוא הקובץ שמגדיר מה מוצג בנתיב מסוים.",
      whyFullStack:
        "הוא נקודת הכניסה למסך: שם מחברים UI, קריאת נתונים ופעולות שהמשתמש רואה.",
      codeExample:
        "export default async function ProductsPage() {\n  const products = await getProducts();\n  return <ProductList items={products} />;\n}",
      codeExplanation:
        "page יכול להיות async בצד שרת, להביא נתונים ואז להחזיר JSX.",
      commonMistake:
        "לשים state אינטראקטיבי בתוך server component בלי להוסיף גבול client component.",
      prerequisite: "lesson_nextjs::file-system routing",
    },
    {
      conceptName: "server component",
      difficulty: 5,
      simpleExplanation:
        "server component רץ בצד שרת ויכול לקרוא database או קבצי שרת בלי לשלוח את הקוד הזה לדפדפן.",
      whyFullStack:
        "זה מצמצם JavaScript בצד לקוח ומאפשר להביא נתונים קרוב לשרת בלי לחשוף secrets.",
      codeExample:
        "export default async function OrdersPage() {\n  const orders = await db.orders.findMany();\n  return <OrdersTable orders={orders} />;\n}",
      codeExplanation:
        "הקריאה ל-db נשארת בצד שרת, והדפדפן מקבל תוצאה מרונדרת ולא את קוד הגישה ל-db.",
      commonMistake:
        "להשתמש ב-useState או onClick בתוך server component. אינטראקציה דורשת client component.",
      prerequisite: "lesson_sql_orm::database",
    },
    {
      conceptName: "client component",
      difficulty: 5,
      simpleExplanation:
        "client component הוא רכיב React שרץ בדפדפן ומותר לו להשתמש ב-state, effects ואירועי click.",
      whyFullStack:
        "הוא הגבול שבו מוסיפים אינטראקציה אמיתית למסך שרובו יכול להישאר server-rendered.",
      codeExample:
        "\"use client\";\n\nexport function Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(count + 1)}>{count}</button>;\n}",
      codeExplanation:
        "ה-directive \"use client\" אומר ל-Next לשלוח את הרכיב וה-JavaScript שלו לדפדפן.",
      commonMistake:
        "להפוך עץ שלם ל-client component בלי צורך, וכך להגדיל bundle ולהפסיד יתרון של server components.",
      prerequisite: "lesson_22::useState",
    },
    {
      conceptName: "route handler",
      difficulty: 5,
      simpleExplanation:
        "route handler הוא endpoint בתוך app שמחזיר Response ל-HTTP request, למשל GET או POST.",
      whyFullStack:
        "הוא מאפשר לבנות API קטן בתוך אותו פרויקט Next בלי להקים Express app נפרד לכל פעולה.",
      codeExample:
        "export async function GET() {\n  return Response.json({ ok: true });\n}",
      codeExplanation:
        "קובץ route.js מייצא פונקציות לפי HTTP method ומחזיר Response.",
      commonMistake:
        "לשים route handler בתוך page או להחזיר JSX במקום Response.",
      prerequisite: "lesson_17::REST API",
    },
    {
      conceptName: "API route",
      difficulty: 4,
      simpleExplanation:
        "API route הוא endpoint שה-frontend יכול לקרוא כדי לקבל או לשנות נתונים.",
      whyFullStack:
        "באפליקציית Full Stack צריך גבול ברור בין UI לבין פעולות שרת כמו שמירה, אימות ושליחת נתונים.",
      codeExample:
        "await fetch('/api/tasks', { method: 'POST', body: JSON.stringify(task) });",
      codeExplanation:
        "הלקוח שולח בקשה ל-endpoint, והשרת מחליט מה מותר, מה נשמר ומה חוזר.",
      commonMistake:
        "לחשוב ש-API route בטוח רק כי הוא בתוך Next. עדיין צריך validation ו-authorization.",
      prerequisite: "lesson_auth_security::authorization",
    },
    {
      conceptName: "server action",
      difficulty: 6,
      simpleExplanation:
        "server action היא פונקציית שרת שאפשר להפעיל מתוך form או client boundary בלי לבנות endpoint ידני לכל פעולה.",
      whyFullStack:
        "היא מקצרת פעולות CRUD, אבל עדיין חייבים validation, auth וגבולות ברורים.",
      codeExample:
        "\"use server\";\n\nexport async function createTask(formData) {\n  await requireUser();\n  return tasks.create({ title: formData.get('title') });\n}",
      codeExplanation:
        "הפונקציה רצה בצד שרת, ולכן היא יכולה לקרוא auth ו-database בלי לחשוף secret לדפדפן.",
      commonMistake:
        "להניח ש-server action מבטלת צורך בבדיקות קלט והרשאות.",
      prerequisite: "lesson_auth_security::middleware guard",
    },
    {
      conceptName: "SSR",
      difficulty: 5,
      simpleExplanation:
        "SSR הוא Server-Side Rendering: השרת מרנדר HTML בזמן בקשה.",
      whyFullStack:
        "SSR טוב לעמודים שצריכים נתונים עדכניים, SEO ראשוני וחוויית טעינה מהירה יותר מתוכן ריק.",
      codeExample:
        "export const dynamic = 'force-dynamic';",
      codeExplanation:
        "הגדרה כזו אומרת ל-Next לא להשתמש בתוצאה סטטית עבור המסך הזה.",
      commonMistake:
        "להשתמש ב-SSR לכל דבר גם כשנתונים כמעט לא משתנים, ולשלם עלות שרת מיותרת.",
      prerequisite: "lesson_17::HTTP",
    },
    {
      conceptName: "SSG",
      difficulty: 5,
      simpleExplanation:
        "SSG הוא Static Site Generation: HTML נבנה בזמן build ונשלח מהר מאוד למשתמשים.",
      whyFullStack:
        "עמודים שיווקיים, docs או תוכן יציב נהנים ממהירות גבוהה ועלות שרת נמוכה.",
      codeExample:
        "export async function generateStaticParams() {\n  return [{ slug: 'intro' }, { slug: 'pricing' }];\n}",
      codeExplanation:
        "Next יודע מראש אילו עמודים סטטיים לבנות עבור dynamic route.",
      commonMistake:
        "לבנות סטטית מידע שמשתנה לכל משתמש או דורש הרשאות.",
      prerequisite: "lesson_nextjs::dynamic route",
    },
    {
      conceptName: "ISR",
      difficulty: 6,
      simpleExplanation:
        "ISR הוא Incremental Static Regeneration: דף סטטי מתרענן אחרי זמן מוגדר בלי build מלא לכל האתר.",
      whyFullStack:
        "הוא שימושי לתוכן שמתעדכן מדי פעם ורוצה ליהנות ממהירות סטטית עם רענון מבוקר.",
      codeExample:
        "export const revalidate = 300;",
      codeExplanation:
        "העמוד יכול להישאר סטטי, אבל Next ירענן אותו אחרי פרק זמן מוגדר.",
      commonMistake:
        "להשתמש ב-ISR עבור מידע פרטי או מידע שחייב להיות עקבי בזמן אמת.",
      prerequisite: "lesson_nextjs::SSG",
    },
    {
      conceptName: "metadata API",
      difficulty: 4,
      simpleExplanation:
        "metadata API מגדיר title, description ותגיות חברתיות בצורה מובנית לעמודים.",
      whyFullStack:
        "SEO ושיתוף ברשתות תלויים במטא-דאטה נכון, ולא רק במה שהמשתמש רואה בעמוד.",
      codeExample:
        "export const metadata = {\n  title: 'Products',\n  description: 'Catalog page'\n};",
      codeExplanation:
        "Next מתרגם את האובייקט לתגיות head מתאימות.",
      commonMistake:
        "להשאיר את כל העמודים עם אותו title או בלי description ברור.",
      prerequisite: "lesson_html_css_foundations::HTML document",
    },
    {
      conceptName: "SEO",
      difficulty: 4,
      simpleExplanation:
        "SEO הוא סט החלטות שעוזרות למנועי חיפוש להבין את העמוד: HTML סמנטי, title, description, links ותוכן נגיש.",
      whyFullStack:
        "אפליקציה יפה שלא ניתנת להבנה או סריקה מפסידה משתמשים לפני שהם מגיעים אליה.",
      codeExample:
        "<main>\n  <h1>Products</h1>\n  <p>Browse current products.</p>\n</main>",
      codeExplanation:
        "מבנה סמנטי ו-heading ברור עוזרים גם לנגישות וגם לסריקה.",
      commonMistake:
        "לחשוב ש-SEO הוא רק keywords. בפועל זה גם ביצועים, מבנה, קישורים ונגישות.",
      prerequisite: "lesson_nextjs::metadata API",
    },
    {
      conceptName: "image optimization",
      difficulty: 4,
      simpleExplanation:
        "image optimization הוא טיפול בגודל, פורמט וטעינה של תמונות כדי לא להכביד על הדף.",
      whyFullStack:
        "תמונה כבדה יכולה להרוס ביצועים גם אם הקוד כתוב טוב.",
      codeExample:
        "<Image src=\"/hero.png\" alt=\"Product dashboard\" width={1200} height={600} priority />",
      codeExplanation:
        "קומפוננטת Image עוזרת להגדיר מידות, alt וטעינה יעילה יותר.",
      commonMistake:
        "להעלות תמונות ענקיות בלי width/height או alt, ואז לקבל layout shift וטעינה איטית.",
      prerequisite: "lesson_html_css_foundations::accessibility basics",
    },
    {
      conceptName: "Vercel deploy",
      difficulty: 4,
      simpleExplanation:
        "Vercel deploy הוא תהליך פרסום שבו פרויקט Next נבנה ומועלה לסביבת hosting שמבינה את Next.js.",
      whyFullStack:
        "SVCollege דורש לא רק קוד עובד מקומית, אלא גם הבנה איך להריץ build, env vars ו-preview/production.",
      codeExample:
        "npm run build\n# deploy דרך Git integration או CLI מאושר בפרויקט",
      codeExplanation:
        "build בודק שהאפליקציה יכולה להיבנות לפני שמעלים אותה לסביבה חיצונית.",
      commonMistake:
        "לשמור secrets בקוד או להניח שמה שעבד ב-dev יעבוד ב-production בלי env vars תקינים.",
      prerequisite: "lesson_tooling_git::GitHub workflow",
    },
  ],
};

if (typeof window !== "undefined") {
  window.LESSON_NEXTJS = LESSON_NEXTJS;
}

if (typeof module !== "undefined") {
  module.exports = { LESSON_NEXTJS: LESSON_NEXTJS };
}
