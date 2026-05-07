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
      levels: {
        grandma:
          "Next.js זה כמו ערכת בנייה לבית: יש לך כבר חדרים מוכנים, חיווט, צנרת — לא מתחילים מאפס. רק מסדרים פנים ומכניסים רהיטים.",
        child:
          "כמו פיצרייה שיש לה כבר בצק, רוטב, גריל ופלטות — אתה רק שם topping. Next מביא את כל מה שצריך כדי להגיש אתר מהר.",
        soldier:
          "Next.js = framework מעל React. נותן: file-system routing, SSR/SSG/ISR, API routes, image optimization, code splitting אוטומטי. תוכנן ע\"י Vercel.",
        student:
          "Next.js בנוי על React + bundler (Webpack/Turbopack/SWC). מציע hybrid rendering: server components, client components, streaming, suspense. App Router הוא הדור החדש; Pages Router נתמך ל-backwards compat.",
        junior:
          "מתי לבחור Next: full-stack app + SEO + ביצועים. מתי לא: SPA pure, אפליקציה behind login שלא צריכה SEO. ההבדל מ-Remix/Astro: Vercel-optimized, אקוסיסטם רחב, react-server-components בשל. ה-vendor lock-in קטן בפועל אבל קיים (Edge runtime, ISR mechanics).",
        professor:
          "Next.js implements a hybrid rendering model integrating React Server Components (RSC) with client-side hydration. The build pipeline performs static analysis to partition the component tree across server/client boundaries. App Router uses nested layouts via React's Suspense/Streaming, enabling progressive HTML delivery. The framework abstracts isomorphic concerns (routing, data fetching, code-splitting) under conventions over configuration.",
      },
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
      levels: {
        grandma:
          "App Router זה כמו ארגון של מגירות בארון: כל מגירה היא חלק אחר באתר, וכל מגירה יודעת מה יש בה לפי השם שלה.",
        child:
          "כמו תיקיות במחשב — תיקייה 'תמונות-חופש' היא בדיוק זה. כל תיקייה ב-app הופכת לחלק מה-URL, וכך Next יודע מה להציג.",
        soldier:
          "App Router בתוך תיקיית app/. קבצים מיוחדים: page.jsx (מסך), layout.jsx (wrapper), loading.jsx (suspense fallback), error.jsx (error boundary), route.js (API). תומך nested layouts.",
        student:
          "App Router built on React Server Components. כל folder = route segment. Composition של layouts: parent layout עוטף child page. Loading + Error מופעלים אוטומטית דרך Suspense + ErrorBoundary. Parallel routes (@slot), intercepting routes (.) מציעים patterns מתקדמים.",
        junior:
          "מציאות: 1) Migration מ-Pages Router — אפשר להריץ במקביל. 2) layout נשאר mounted בין navigation — useEffect לא רץ שוב, אם תלוי ב-route param צריך לקרוא בתוך page. 3) דיבוג: client/server boundary כשל מוצג כ-error מעורפל — תמיד בדוק \"use client\" ב-direction נכון.",
        professor:
          "App Router formalizes the directory tree as a routing tree where each segment maps to a URL path. The component tree is constructed via tree composition: layout(s) → template → loading → error → page. RSC enables zero-JS-by-default; client islands marked via \"use client\" directive. Streaming SSR delivers HTML in chunks aligned with React Suspense boundaries.",
      },
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
      levels: {
        grandma:
          "file-system routing זה כמו לארגן ספרים על המדף לפי נושא: אם 'בישול' נמצא במדף השמאלי — אז כדי למצוא 'מתכוני עוגות', תלכי למדף השמאלי, ותיקיית 'עוגות'.",
        child:
          "כמו שאתה יוצר תיקייה בשם 'משחקים' ובתוכה 'מינקראפט' — הנתיב /משחקים/מינקראפט. ב-Next, מבנה התיקיות הוא ה-URL.",
        soldier:
          "file-system routing = path → URL mapping אוטומטי. app/about/page.jsx → /about. dynamic: app/posts/[slug]/page.jsx → /posts/anything. catch-all: [...slug]. אין router config ידני.",
        student:
          "Convention over config: folder structure encodes routing. Special segments: [param] (dynamic), [...slug] (catch-all), [[...slug]] (optional catch-all), (group) (organization בלי URL impact). Compared to React Router (declarative JSX) — פחות מילים, פחות שליטה דקה אבל יותר predictable.",
        junior:
          "מהשטח: 1) (group) folders שימושיים לארגון בלי לקלקל URLs — שקול (auth)/login, (auth)/register. 2) dynamic segments בלי validation = security hole. 3) קבצים שמתחילים ב-_ או . מתעלמים. 4) co-locate components אבל זכור: רק page.jsx, layout.jsx וכד' הם 'public'.",
        professor:
          "Convention-based routing leverages the filesystem as a hierarchical namespace, eliminating routing tables. The compiler generates a route manifest at build time. Trade-offs: declarative simplicity vs flexibility (e.g., conditional routes require code, not file moves). Inspired by frameworks like SvelteKit, Remix, and earlier conventions in PHP/Rails.",
      },
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
      levels: {
        grandma:
          "dynamic route זה כמו לומר 'הכניסי כל שם בתוך הסוגריים'. במקום לכתוב 'דף של דנה' ו-'דף של רוני' בנפרד — יש דף אחד שיודע לקבל כל שם.",
        child:
          "כמו טופס: 'שלום ___'. הריק זה משתנה. ב-Next [id] בשם תיקייה אומר 'אני מחכה למשהו'. /products/123 או /products/foo — אותו קובץ, פרמטר שונה.",
        soldier:
          "dynamic route = [param] בשם folder. Component מקבל params: { params: { id: 'abc' } }. catch-all: [...slug] תופס מספר segments. App Router תומך גם ב-async params.",
        student:
          "Dynamic routing מתורגם ל-URL pattern matching. Build-time decisions: generateStaticParams() קובע אילו values pre-render (SSG). runtime: כל value אחר עובר SSR/render-on-demand. params זמין ב-page, layout ו-route handler. searchParams (?key=val) זמין רק ב-page (cause Suspense).",
        junior:
          "אזהרות: 1) [id] = string תמיד; parse to number אם צריך. 2) Validation חובה: Number(id), uuidValidate, slugRegex לפני query ל-DB — אחרת SQL injection או 500 על פורמט שגוי. 3) generateStaticParams עם DB call איטי = build איטי. cache it. 4) notFound() function לקריאה אם המשאב לא קיים.",
        professor:
          "Dynamic segments are pattern variables in the route's hierarchical structure. The router constructs a trie indexed by static prefixes; dynamic segments are catch-all branches. Type-safety via TypeScript's template literal types or framework codegen. The static-vs-dynamic decision (generateStaticParams returning subset vs all) implements partial pre-rendering.",
      },
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
      levels: {
        grandma:
          "layout זה המסגרת של תמונה: גם אם תחליפי את התמונה — המסגרת נשארת. כותרת בראש, תפריט בצד, רגליים למטה — הכל בתוך אותה מסגרת.",
        child:
          "כמו מקלדת ובמסך: גם כשאתה משחק במשחק שונה, המקלדת זהה. layout = החלקים שתמיד יש: לוגו, חיפוש, התראות.",
        soldier:
          "layout.jsx עוטף children. nested: app/layout.jsx (root) → app/dashboard/layout.jsx → app/dashboard/page.jsx. נשאר mounted בין navigation בתוך אותו segment. ב-RSC: יכול להיות async לdata fetching.",
        student:
          "Layout = persistent UI חוצה navigation. בניית עץ: root layout = HTML/body wrapper (חובה אחד). nested layouts אסור לקבל params (רק page). children prop עובר את העמוד הנוכחי. State בLayout לא מתאפס — שימושי לnavigation, sidebar state, audio player.",
        junior:
          "Practical: 1) Auth checks בlayout — מקצר vs בכל page. 2) Providers (Theme, Auth, Query) חיים ב-root layout. 3) RSC layout לא מקבל onClick — צריך client component סביב. 4) layout.jsx של mistake נפוצה — השם חייב להיות 'layout', לא 'Layout'. 5) Force re-mount: parallel routes או key trick.",
        professor:
          "Layouts implement the Composite pattern in the route tree. Each layout function receives children as the rendered subtree. Layout persistence across navigation is achieved by reconciling the segment tree: only changed segments re-render, retaining state in unchanged ancestors. This mirrors React's reconciliation but at routing granularity.",
      },
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
      levels: {
        grandma:
          "page זה הדף עצמו של הספר — עם המילים והתמונות שאת רואה כשאת פותחת אותו. layout זה הספר; page זה הדף הנוכחי.",
        child:
          "כמו שכל אפליקציה במחשב היא חלון אחר. אתה לוחץ — נפתח חלון של 'הגדרות', אחר של 'משחק'. page = החלון של מסך מסוים באתר.",
        soldier:
          "page.jsx = root component של route. export default function. יכול להיות async (RSC). מקבל params + searchParams. מרונדר בתוך layout. אחד לכל route segment.",
        student:
          "Page is leaf node of routing tree. ב-RSC יכול להיות server component (default) או client (\"use client\"). data fetching ישירות בתוך component (await db.query). meta exports: generateMetadata, dynamic, revalidate, fetchCache. Suspense boundaries אוטומטיות בlevels.",
        junior:
          "Practical: 1) RSC default — fetch ישירות, no useEffect needed. 2) searchParams זמין רק בpage, וקריאה אליו marks page dynamic. 3) shared logic — extract לcomponent, לא לlayout. 4) Loading state: loading.jsx באותו folder. 5) async server component יכול להיות slow — wrap in Suspense עם fallback.",
        professor:
          "Pages are the concrete realization of routes — terminal nodes in the route hierarchy. In RSC architecture, pages emit serialized React trees over the wire (Flight protocol) interleaved with HTML. The page is the unit of streaming and Suspense boundary unless explicitly subdivided. Type-safe params via PageProps generic.",
      },
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
      levels: {
        grandma:
          "server component זה כמו מלצר במסעדה: הוא הולך למטבח, לוקח את האוכל ומגיש לך. את לא רואה את המטבח, רק את הצלחת המוכנה.",
        child:
          "כמו ספרן שמביא לך ספר — הוא יודע איפה כל הספרים בספרייה, אבל אתה לא צריך להיכנס למחסן. server component עושה את העבודה הכבדה ושולח לך תוצאה.",
        soldier:
          "server component = רץ ב-Node, לא בדפדפן. יכול: await fetch, await db.query, קריאת FS, secrets ב-env. אסור: useState, useEffect, onClick. default ב-App Router. מסומן \"use client\" אם רוצים client.",
        student:
          "RSC (React Server Components): רנדור בשרת, מועבר כ-Flight format (לא HTML, לא JSON — serialized React tree). Hydration: client רק לcomponents שהוגדרו \"use client\". יתרון: zero JS לserver components, smaller bundles, direct DB access. מגבלה: לא serializable props (functions, Date hacks).",
        junior:
          "Production lessons: 1) DB queries ישר בpage = OK. fetch מ-API חיצוני = use cache properly. 2) שום context React לא עובר server→client אוטומטי. 3) async props בproblem נפוץ: server component מקבל prop שהוא promise, client component לא יודע לחכות. 4) keep secrets שרת — never pass to client component. 5) revalidatePath/Tag לרענון cache.",
        professor:
          "RSC introduces a new component category: server components execute on the server, render to a serializable representation (React Flight), and never re-render in client. They cannot use stateful hooks but can be async. The wire format interleaves server output with placeholder slots for client components, hydrated independently. This enables surgical bundle inclusion — server-only dependencies (DB drivers, file system) are excluded from client.",
      },
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
      levels: {
        grandma:
          "client component זה החלק שאת מדברת איתו: כפתור שאת לוחצת, שדה שאת ממלאה, התראה שמופיעה. הוא בידיים שלך, לא בידיים של המלצר.",
        child:
          "כמו שלט המכשיר: אתה לוחץ עליו והמכשיר מגיב. server component מכין את התמונה — client component הוא הכפתורים שמשנים אותה.",
        soldier:
          "client component = רץ בדפדפן. מסומן ב-\"use client\" בראש הקובץ. יכול: useState, useEffect, onClick, event handlers. כל component שיובא ממנו הופך client אוטומטית. נשלח כ-JS bundle.",
        student:
          "\"use client\" directive הוא boundary: הקובץ + dependencies שלו נכנסים ל-bundle. server components יכולים לעבור כ-children אבל לא להיות imported. State, hooks, browser APIs עובדים. SSR בכל זאת רץ — צד שרת מרנדר HTML ראשון, אז hydration.",
        junior:
          "מתי צריך client: form עם validation, modal, dropdown, animation. אסטרטגיה: keep client components leaves — page = server, components בודדים = client. Pattern: server component עוטף client component ומעביר כprop רק מה שצריך. אל תכניס כל הapp ל-\"use client\" — מבטל את היתרון של RSC.",
        professor:
          "Client components are traditional React components subject to hydration. The boundary directive (\"use client\") marks the module and its dependencies for client bundling. The framework partitions the import graph: server graph + client graph + shared. Hydration mismatches occur when server-rendered output diverges from client expectations — debugged via React's DevTools or the framework's hydration warnings.",
      },
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
      levels: {
        grandma:
          "route handler זה כמו מענה אוטומטי בטלפון: 'תקיש 1 לקבלת קטלוג, 2 להזמנה'. אתה לוחץ — הוא עונה לך עם המידע הנכון.",
        child:
          "כמו קופסא בדואר עם שלטים: 'לכאן נכנסים מכתבים, מכאן יוצאות תשובות'. route handler הוא ה-API: מקבל בקשה, שולח תשובה.",
        soldier:
          "route.js בתוך app/. exports: GET, POST, PUT, DELETE, PATCH. מקבל Request, מחזיר Response (או NextResponse). עובד דרך Web Fetch API standard. URL מתבסס על מיקום folder.",
        student:
          "Route handlers replace API Routes (Pages Router). Built on Web standards: Request/Response/URLSearchParams. Cookies via next/headers. Edge runtime supported. Caching: GET cached by default, מבוטל ב-headers/cookies/dynamic functions. Streaming: ReadableStream as Response body.",
        junior:
          "Practice: 1) Request.json() לקריאת body. 2) NextResponse.json() נוח יותר. 3) Validation עם zod לפני DB. 4) Response standard headers ל-CORS, cache. 5) Edge vs Node runtime — Edge מהיר אבל מוגבל ב-APIs (אין fs, מוגבל בpackages). 6) Try/catch עם status נכון: 400 לbad input, 401 לauth, 500 לserver.",
        professor:
          "Route handlers expose HTTP semantics directly via Web Platform Fetch API. The handler signature (Request) → Response | Promise<Response> aligns with Service Workers and Cloudflare Workers. Caching follows HTTP cache semantics with Next.js extensions (revalidate, tags). The runtime selection (Node.js vs Edge) is per-route via export const runtime.",
      },
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
      levels: {
        grandma:
          "API route זה הקופאית בסופר: את מבקשת לקנות, היא בודקת מחיר, מקבלת תשלום, נותנת קבלה. הfrontend מבקש — הAPI עונה.",
        child:
          "כמו טלפון בין שתי כיתות: כשאחת רוצה משהו — היא צלצלת לכיתה שנייה ואומרת מה. API route הוא הטלפון בין הדפדפן לבין השרת.",
        soldier:
          "API route = endpoint HTTP. ב-App Router נקרא 'route handler' (route.js). ב-Pages Router (legacy) נקרא 'API route' (pages/api/*). שניהם: מקבלים request, מחזירים JSON/text/stream.",
        student:
          "API design: REST (resources + methods) או RPC או GraphQL. ב-Next: REST/RPC נוח דרך route handlers. Server actions החליפו חלק מ-API לactions internal. Auth via session cookie או JWT bearer. CORS אם נצרך מ-domain אחר. Rate limiting via middleware.",
        junior:
          "מציאות: 1) Validation תמיד — zod schema על body, params, query. 2) Auth check בכל route protected. 3) Status codes נכונים — לקוח-side mapping תלוי. 4) Errors מובנים — { error: \"message\", code: \"INVALID_INPUT\" } — לא רק string. 5) Idempotency keys לpayment APIs. 6) Test עם supertest או Postman/Insomnia.",
        professor:
          "API routes formalize the client-server boundary as HTTP endpoints. Architectural styles: REST (Fielding 2000) — uniform interface, statelessness, cacheability. GraphQL — single endpoint with declarative query. tRPC — type-safe RPC over HTTP. Next.js supports all via route handlers; the framework remains neutral on protocol choice but optimizes serialization for RSC's Flight format.",
      },
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
      levels: {
        grandma:
          "server action זה כמו פעמון שירות במלון: את לוחצת — והפקיד בא. אין צורך ללכת לקבלה ולמלא טופס; פעולה ישירה.",
        child:
          "כמו ידית במכונת שתייה: לוחץ והשתייה יוצאת. אתה לא צריך לדבר עם איש; הפעולה מתבצעת בעצמה. server action הוא ידית לפעולות שרת מתוך הUI.",
        soldier:
          "server action = function עם \"use server\" שאפשר לקרוא לה מclient. Form action={createTask} משלב עם form submission. invalidates cache + revalidates path אוטומטית. ללא endpoint ידני.",
        student:
          "Server actions: RPC mechanism מובנה ב-RSC. Function reference מועבר לclient כ-id; קריאה משם trigger fetch ל-server. Built-in: progressive enhancement (form עובד גם בלי JS), loading states (useFormStatus), error handling (useActionState). Type safety מקצה לקצה.",
        junior:
          "מהשטח: 1) ALWAYS validate בpop של action — client יכול לזייף formData. 2) Auth check תמיד. 3) revalidatePath('/') או revalidateTag('tasks') אחרי mutation. 4) redirect() throw מתוך action — לא return. 5) Bind values מholder closure: action.bind(null, userId). 6) Optimistic updates: useOptimistic hook.",
        professor:
          "Server actions implement type-safe RPC integrated with React's rendering model. The compiler generates a unique action ID; client invocation serializes args, sends to server, awaits response. Integration with progressive enhancement: forms work pre-hydration. The mechanism aligns with classic web patterns (form POST → 303 redirect) while preserving SPA UX post-hydration.",
      },
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
      levels: {
        grandma:
          "SSR זה כמו מסעדה שמכינה הכל מראש לפני שאת מגיעה — הצלחת מוכנה ברגע שיושבת. את לא מחכה שהמטבח יתחיל לבשל.",
        child:
          "כמו פיצה שיש לה בצק מוכן: כשבא הזמנה — רק שמים topping ומכניסים לתנור. server מרכיב HTML ושולח. הדפדפן רק מראה.",
        soldier:
          "SSR = Server-Side Rendering. כל request מפעיל render בשרת, מחזיר HTML מוכן. opposed to CSR (browser בונה), SSG (build-time). Next default: server components מרונדרים בשרת. dynamic flag: force-dynamic.",
        student:
          "SSR trade-offs: SEO + first paint מהיר vs server load + TTFB גבוה. Streaming SSR (Suspense) מצמצם TTFB. ב-Next: dynamic functions (cookies, headers, searchParams) הופכות route ל-SSR. fetch options: cache: 'no-store' או revalidate: 0. Edge SSR מהיר יותר מ-Node.",
        junior:
          "מציאות: 1) SSR לכל page = שרת יקר. ברירה: SSR רק למה שצריך data משתנה. 2) Cache headers: Vercel ITS cache במקום SSR בכל request. 3) Streaming: <Suspense> ב-render עם async boundary — חלקים מגיעים גם אם DB איטי. 4) Database close to render — אם DB ב-region אחר, SSR איטי בכל מקרה.",
        professor:
          "SSR generates the initial HTML on the server per-request. Combined with hydration, it yields the best of both worlds: fast first contentful paint + interactive SPA. Streaming SSR (introduced in React 18) flushes HTML chunks as Suspense boundaries resolve, decoupling TTFB from total render time. Trade-off: server compute scales with traffic, mitigated by caching, ISR, or moving to SSG.",
      },
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
      levels: {
        grandma:
          "SSG זה כמו לאפות עוגות מראש לחנות — כל הלקוחות מקבלים בדיוק אותה עוגה, מהר, בלי להמתין שהמאפייה תאפה.",
        child:
          "כמו ספרים מודפסים: נדפסו פעם אחת, וכל מי שקונה מקבל אותו תוכן. SSG בונה את האתר פעם אחת ב-build — וכולם מקבלים את אותו HTML מאוד מהר.",
        soldier:
          "SSG = HTML pre-built ב-build time. נשמר כקבצים סטטיים, מוגש מ-CDN. הכי מהיר. ל-dynamic routes: generateStaticParams מספק רשימת values. Default ב-Next אם אין dynamic functions.",
        student:
          "SSG מתאים לתוכן גלובלי שלא תלוי במשתמש: docs, marketing, blog. CDN distribution טבעית. Build time = O(pages × data fetching). ב-Next: page server component שלא משתמש ב-cookies/headers ולא בdynamic search → automatically static. Hybrid: SSG + client-side fetch לdynamic parts.",
        junior:
          "Practical: 1) generateStaticParams מ-DB — cache it; build יכול לקחת דקות. 2) Build-time secrets (env) — vs runtime — קבע. 3) SSG עבור 10K pages — ביצועים נופלים; שקול ISR. 4) Update content = redeploy; אם מתעדכן הרבה — ISR/SSR. 5) Static export (output: 'export') — אפילו pure HTML, no Node server.",
        professor:
          "SSG materializes the rendered output at build time, transforming compute-on-request into compute-on-deploy. The trade-off: deployment frequency vs runtime cost. Mathematically, SSG amortizes render cost across requests as O(1) lookup; SSR is O(render). For static content this is optimal; for personalized/frequently-changing content the build-cost dominates.",
      },
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
      levels: {
        grandma:
          "ISR זה כמו עיתון שמתחדש כל שבוע: רוב הזמן את קוראת את הגליון הקיים, ובסוף השבוע מחליפים בגליון חדש — בלי לבנות עיתון חדש לכל קורא.",
        child:
          "כמו תפריט במסעדה שמתעדכן פעם בחודש: כל מי שמגיע במהלך החודש רואה את אותו תפריט; אז מדפיסים גרסה חדשה. לא מדפיסים חדש לכל לקוח.",
        soldier:
          "ISR = SSG + revalidation. עמוד נבנה ב-build, מוגש מ-cache. כשעובר revalidate seconds, הבקשה הבאה trigger רענון ברקע (stale-while-revalidate). On-demand: revalidatePath/Tag.",
        student:
          "ISR משלב את היתרונות: serve מ-CDN (מהיר) + רענון אוטומטי (לא צריך redeploy). Time-based: export const revalidate = 60. On-demand: revalidatePath/Tag מ-action או webhook. Tags: fetch(url, { next: { tags: ['posts'] } }) → revalidateTag('posts'). Stale-while-revalidate semantic.",
        junior:
          "מקרים אמת: 1) Blog שמתעדכן יומי — revalidate: 86400. 2) E-commerce inventory — on-demand מ-webhook של מערכת ניהול. 3) Misuse: revalidate: 1 = לא ISR, זה SSR יקר. 4) Cache busting cross-region — Vercel cache regional, יכול להיות drift. 5) tag granularity — תייג fetch calls בקפידה.",
        professor:
          "ISR implements stale-while-revalidate semantics at the page level. The first request after the TTL receives the stale version while triggering background regeneration; subsequent requests receive the fresh version. This decouples user latency from data freshness. On-demand invalidation via revalidate functions enables event-driven updates, bridging push and pull paradigms.",
      },
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
      levels: {
        grandma:
          "metadata API זה התווית על קופסת עוגיות: שם, תיאור, תוקף — כדי שכל מי שמסתכל ידע מה יש בפנים בלי לפתוח.",
        child:
          "כמו השם של הסרטון ביוטיוב — מה שאתה רואה לפני שלוחצים. metadata קובע מה רואים בגוגל ובשיתופים.",
        soldier:
          "metadata API ב-App Router: export const metadata = { title, description, openGraph, twitter, robots, ... }. Next ממיר אוטומטית ל-<head> tags. Per-page or per-layout.",
        student:
          "Two forms: static (export const metadata) ו-dynamic (export async function generateMetadata({ params })). Composition: metadata בlayout מתמזג עם child page (template, default). Built-in fields: title (object: default/template/absolute), openGraph (article/website), twitter, icons, manifest, robots, alternates (canonical, languages).",
        junior:
          "SEO impact: 1) title.template = '%s | אתר שלי' — consistent. 2) openGraph.images חייב URL מוחלט (https://...). 3) generateMetadata async — fetch DB, derive title. 4) robots: index: false על staging. 5) alternates.canonical חיוני אם יש URL כפילים. 6) JSON-LD: רנדור ידני בpage כ-script tag — Next לא מטפל.",
        professor:
          "Metadata API abstracts HTML head management with composable, declarative configuration. The framework merges metadata across the route hierarchy with override semantics. Open Graph (Facebook), Twitter Cards, and JSON-LD provide structured data for crawlers. SEO has shifted from keyword stuffing to entity-based search; metadata API supports this via structured data fields.",
      },
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
      levels: {
        grandma:
          "SEO זה לארגן את החנות שלך כך שכל מי שעובר ברחוב יבין מיד מה את מוכרת — שלט גדול, חלון יפה, סדר ברור. בלי זה, אנשים פשוט עוברים.",
        child:
          "כמו לסדר את הספרים בחנות לפי נושא — מי שמחפש ספרי בישול ימצא בקלות. גוגל מוצא אותך אם האתר שלך מסודר עם כותרות וטקסט ברור.",
        soldier:
          "SEO = Search Engine Optimization. גורמים: HTML סמנטי (h1, nav, article), title/description, performance (Core Web Vitals), mobile-friendly, sitemap, robots.txt, canonical URLs, structured data (JSON-LD), internal linking, content quality.",
        student:
          "SEO pillars: 1) Technical (crawlability, speed, mobile, HTTPS). 2) On-page (title, content, headings, meta). 3) Off-page (backlinks, brand). 4) Content (E-E-A-T: Experience, Expertise, Authoritativeness, Trust). 5) Structured data (Schema.org) — rich results. Core Web Vitals: LCP, INP, CLS — ranking factor since 2021.",
        junior:
          "מציאות: 1) SSR/SSG חיוניים לSEO — Googlebot מריץ JS אבל איטי. 2) sitemap.xml + robots.txt ב-app/ או public/. 3) Lighthouse לבדיקה. 4) generateMetadata לdynamic SEO — title-per-product. 5) הימנע מ-h1 כפול. 6) alt לתמונות. 7) Search Console לmonitoring. 8) Original content > clever wordsmithing.",
        professor:
          "Modern SEO has evolved from keyword density (1990s) to semantic search and entity recognition (post-Hummingbird, 2013). Page Rank (Brin & Page 1998) introduced authority via link graph. Today: BERT (2019) enables natural language understanding; MUM (2021) extends multimodal. Technical SEO ensures crawlability + indexation + rendering parity; content SEO addresses query-intent matching.",
      },
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
      levels: {
        grandma:
          "image optimization זה לסחוט את התמונה לגודל מתאים: לא להעלות פוסטר ענק כשרק מטבע נחוץ. כך הדף נטען מהר ולא תוקעת את כולם.",
        child:
          "כמו לדחוס ספוג: התמונה נכנסת לשטח קטן יותר אבל נראית אותו דבר. הדף נטען מהר במקום להמתין לקובץ ענק.",
        soldier:
          "Next.js Image: <Image src width height alt /> — auto: WebP/AVIF format, responsive srcset, lazy loading, blur placeholder, prevents layout shift. Image optimizer ב-runtime או ב-build.",
        student:
          "Optimization techniques: 1) Format (AVIF > WebP > JPEG > PNG). 2) Resize to actual display size (DPR-aware). 3) Lazy loading (loading=\"lazy\", IntersectionObserver). 4) Placeholder (LQIP, blurhash). 5) Priority hints (priority for above-fold). 6) CDN delivery עם cache headers. Next handles all via /_next/image.",
        junior:
          "Production gotchas: 1) priority on hero only — too many priority = waste. 2) sizes prop חובה לresponsive layouts. 3) external images: domains/remotePatterns בconfig. 4) SVG — Next לא מאופטם, sanitize first. 5) blur placeholder = bigger HTML; שקול. 6) Vercel image optimization billed per source — cache aggressively.",
        professor:
          "Image optimization addresses HTTP payload (the largest contributor to web weight), perceived performance (CLS), and display fidelity (DPR-aware sizing). Modern formats (AVIF, WebP) leverage advanced encoding (intra-frame prediction, perceptual color spaces). Lazy loading aligns rendering with viewport; priority hints (fetchpriority) inform the browser scheduler. The Next.js optimizer applies these at request time, caching transformations.",
      },
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
      levels: {
        grandma:
          "Vercel deploy זה כמו לפתוח חנות ברשת: יש מי שדואג לחשמל, למקרר, לתאורה ולמיזוג. את רק מביאה את הסחורה — והשאר עובד.",
        child:
          "כמו להעלות סרטון ליוטיוב: אתה מעלה — והוא דואג להצגה, לקידוד, לפרסום בעולם. Vercel עושה את אותו דבר ל-Next app.",
        soldier:
          "Vercel deploy: git push → Vercel ב-builds → preview URL לכל PR → production לmain merge. כולל: serverless functions, edge functions, image optimization, ISR, env vars. CLI: vercel deploy, vercel --prod.",
        student:
          "Vercel architecture: build runs in container → output: static assets (CDN) + serverless functions (lambda) + edge functions (V8 isolates). Preview deployments per branch/PR. Env vars per environment (prod/preview/dev). Custom domains. Analytics, Speed Insights, Logs.",
        junior:
          "מציאות: 1) Build time = $$$. ולפעמים timeouts. cache aggressively. 2) Serverless cold starts — Edge runtime מקצר. 3) Function size limit (50MB unzipped). exclude heavy deps. 4) Free tier = 100GB bandwidth/month. 5) Alternatives: Cloudflare Pages, Netlify, AWS Amplify, self-host (Docker). 6) ENV vars: ne pošte לא ל-NEXT_PUBLIC_ אלא אם בכוונה client-side.",
        professor:
          "Vercel exemplifies the Jamstack-evolved Platform-as-a-Service model: prebuilt static + on-demand serverless. Vendor lock-in is real (ISR, on-demand revalidation specifics, Edge runtime APIs) but mitigated by Next.js portability (open-source standalone server). The deployment pipeline integrates VCS hooks, build cache (Turborepo), CDN distribution, and observability under conventions over configuration.",
      },
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
