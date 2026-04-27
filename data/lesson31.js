// data/lesson31.js — שיעור 31: Next.js Intro (App Router)
// Full-Stack מודרני. מבחן: 6-8 שאלות צפויות.
var LESSON_31 = {
  id: "lesson_31",
  title: "שיעור 31 — Next.js — App Router + SSR",
  description:
    "Next.js App Router, file-based routing, layouts, Server Components, loading/error states.",
  concepts: [
    {
      conceptName: "Next.js",
      difficulty: 5,
      levels: {
        grandma: "Next.js = framework מעל React שמספק backend + routing + רינדור בשרת. מאפליקציה ל-production מהר.",
        child: "כמו ארגז כלים מלא ל-React — ראוטר, שרת, אופטימיזציה — הכל מובנה.",
        soldier: "Next.js by Vercel. Full-stack React. Built-in: routing, SSR/SSG, API routes, image optimization.",
        student: "React framework. Renders on server (SSR), build-time (SSG), client (CSR). App Router (modern) — file-based with React Server Components. Pages Router (legacy).",
        junior: "התחלתי עם Vite + Express בנפרד — 2 deployments, 2 codebases. עברתי ל-Next.js — אחד deploy ב-Vercel, frontend+backend באותו פרויקט. הזמן ל-prod ירד ב-70%.",
        professor: "Next.js = React + bundler (Turbopack/webpack) + routing + RSC. Production-grade SSR/SSG/ISR. Edge runtime support. Performance: aggressive code splitting, Image component, Script optimization.",
      },
      illustration:
        "🚀 Next.js stack:\n  React (UI)\n   + App Router (routing)\n   + Server Components (default)\n   + API Routes (backend)\n   + Build optimization\n   + Vercel-native deployment",
      codeExample:
        "# יצירת פרויקט\nnpx create-next-app@latest my-app --typescript --tailwind --app\n\n# מבנה תיקייה\nmy-app/\n├── app/\n│   ├── layout.tsx       # Root layout\n│   ├── page.tsx         # / (homepage)\n│   ├── about/\n│   │   └── page.tsx     # /about\n│   └── api/\n│       └── users/\n│           └── route.ts # /api/users\n├── public/\n└── package.json\n\n# הרצה\nnpm run dev    # localhost:3000",
      codeExplanation: "create-next-app מקים פרויקט מלא. /app folder = App Router. page.tsx = route. layout.tsx = wrapper. api/route.ts = backend.",
    },
    {
      conceptName: "App Router",
      difficulty: 6,
      levels: {
        grandma: "ראוטינג לפי תיקיות — כל תיקייה = URL. מאוד אינטואיטיבי.",
        child: "כמו ארון בגדים — תיקייה 'חולצות' = URL /חולצות.",
        soldier: "File-based routing: app/about/page.tsx → /about. Dynamic: app/users/[id]/page.tsx → /users/123.",
        student: "App Router (Next.js 13+). Convention: page.tsx (UI), layout.tsx (wrapper), loading.tsx (Suspense), error.tsx (boundary), not-found.tsx (404). Nested folders → nested routes.",
        junior: "התחלתי עם Pages Router (api routes ב-/api). עברתי ל-App Router — תיקיות מקוננות, layouts, server components. הקוד יותר מאורגן, עם Suspense מובנה.",
        professor: "App Router: filesystem-based + React Server Components. Routing semantics: special files (page, layout, loading, error, not-found, route). Parallel routes (@), intercepting routes ((..)),route groups ((name)).",
      },
      illustration:
        "📁 App Router structure:\n  app/\n    page.tsx               → /\n    layout.tsx             → root layout\n    about/page.tsx         → /about\n    users/\n      page.tsx             → /users\n      [id]/page.tsx        → /users/:id\n      loading.tsx          → Suspense fallback\n      error.tsx            → error boundary",
      codeExample:
        "// app/page.tsx — homepage\nexport default function HomePage() {\n  return <h1>שלום!</h1>;\n}\n\n// app/users/[id]/page.tsx — dynamic route\nexport default async function UserPage({ params }: { params: { id: string } }) {\n  const user = await fetch(`https://api.example.com/users/${params.id}`).then(r => r.json());\n  return <div>שם: {user.name}</div>;\n}\n\n// app/users/loading.tsx — loading state\nexport default function Loading() {\n  return <div>טוען...</div>;\n}\n\n// app/users/error.tsx — error boundary\n'use client';\nexport default function Error({ error, reset }: { error: Error; reset: () => void }) {\n  return (\n    <div>\n      <p>שגיאה: {error.message}</p>\n      <button onClick={reset}>נסה שוב</button>\n    </div>\n  );\n}",
      codeExplanation: "page.tsx = UI. params = dynamic segments. loading.tsx אוטומטית עוטף ב-Suspense. error.tsx — error boundary.",
    },
    {
      conceptName: "Server Component",
      difficulty: 7,
      levels: {
        grandma: "קומפוננטה שרצה בשרת — אפשר לקרוא ל-DB ישירות, להחזיר HTML מוכן ללקוח.",
        child: "המורה מכינה דף עם תשובות לפני שמחלקת — לא צריך לחשב במחברת.",
        soldier: "React Server Component (RSC) — רץ בשרת. אפשר async, fetch, DB. ב-default ב-App Router. אין hooks (useState/useEffect).",
        student: "Server Components: render once on server, send HTML+RSC payload. Benefits: bundle reduction, direct DB access, SEO, security (secrets server-side). Limitations: no state, no effects, no event handlers (use 'use client' for interactivity).",
        junior: "פעם בניתי dashboard עם useEffect שמושך נתונים — flash של empty content. עברתי ל-RSC — async fetch ישירות בקומפוננטה, נתונים מגיעים עם ה-HTML. UX מצוין.",
        professor: "RSCs are a separate component model from CSCs (Client Components). Render on server, serialize via React Flight protocol, hydrate on client (only Client Components). Mixing: pass RSCs as children to Client Components.",
      },
      illustration:
        "⚙️ Server vs Client Component:\n  Server (default):  fetch DB → HTML → לאמ\n  Client ('use client'): bundled to browser → useState/useEffect",
      codeExample:
        "// Server Component (default ב-App Router)\nimport { db } from '@/lib/db';\n\nexport default async function PostsPage() {\n  const posts = await db.posts.findMany();  // ישירות מ-DB!\n  return (\n    <ul>\n      {posts.map(p => <li key={p.id}>{p.title}</li>)}\n    </ul>\n  );\n}\n\n// Client Component (אינטראקטיבי)\n'use client';\nimport { useState } from 'react';\n\nexport default function Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(c => c+1)}>{count}</button>;\n}\n\n// שילוב\nexport default async function Page() {\n  const data = await fetchData();  // server\n  return (\n    <>\n      <ServerSection data={data} />\n      <Counter />  {/* client component */}\n    </>\n  );\n}",
      codeExplanation: "Default = Server. async + fetch = OK. 'use client' = Client. שילוב: Server passes data to Client via props.",
    },
    {
      conceptName: "API Route",
      difficulty: 5,
      levels: {
        grandma: "endpoint backend בתוך פרויקט Next.js — לא צריך Express נפרד.",
        child: "כמו דלת מאחורי הקלעים — לקוח מבקש, השרת עונה.",
        soldier: "app/api/users/route.ts → endpoint /api/users. Export GET, POST, PUT, DELETE handlers.",
        student: "Route Handlers (App Router): export async functions per HTTP method. Receive Request, return Response or NextResponse. Run on Node.js or Edge Runtime.",
        junior: "פעם בניתי Express נפרד עם 50 endpoints. עברתי ל-Next.js Route Handlers — אחיד, type-safe, אותו פרויקט. Vercel deploy אחד.",
        professor: "Route Handlers replace Pages Router api/. Web standard Request/Response API. Edge Runtime opt-in via export const runtime = 'edge' — V8 isolate, faster cold start.",
      },
      illustration: "📡 API Route:\n  app/api/users/route.ts → /api/users\n  GET → list users\n  POST → create user\n  app/api/users/[id]/route.ts → /api/users/:id\n  GET/PUT/DELETE per id",
      codeExample:
        "// app/api/users/route.ts\nimport { NextResponse } from 'next/server';\n\nexport async function GET() {\n  const users = await db.users.findMany();\n  return NextResponse.json(users);\n}\n\nexport async function POST(req: Request) {\n  const body = await req.json();\n  const user = await db.users.create({ data: body });\n  return NextResponse.json(user, { status: 201 });\n}\n\n// app/api/users/[id]/route.ts\nexport async function GET(\n  req: Request,\n  { params }: { params: { id: string } }\n) {\n  const user = await db.users.findUnique({ where: { id: params.id } });\n  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });\n  return NextResponse.json(user);\n}",
      codeExplanation: "Export per HTTP method. Request/Response standard. params dynamic מ-URL. NextResponse נוח עם status + JSON.",
    },
    {
      conceptName: "Layout",
      difficulty: 5,
      levels: {
        grandma: "מסגרת שעוטפת כמה דפים — header, sidebar, footer שמופיעים בכל מקום.",
        child: "כמו מסגרת לתמונה — אותה מסגרת, תמונות שונות.",
        soldier: "layout.tsx ב-App Router = wrapper לדפים בתת-עץ. Root layout (חובה) ב-app/layout.tsx.",
        student: "layout.tsx wraps all pages in folder + subfolders. Receives children. Persists across navigation (no remount). Nested layouts compose.",
        junior: "פעם בכל דף הצבתי <Navbar /> ו-<Footer /> ידנית — שכחתי בדף אחד. עכשיו: layout.tsx ב-root, כל הדפים מקבלים אוטומטית.",
        professor: "Layouts in App Router are React Server Components by default. Mount once, persist across page changes (state preserved). Nested: app/blog/layout.tsx wraps app/blog/* but not other folders.",
      },
      illustration:
        "🖼️ Layout nesting:\n  app/layout.tsx (root)\n    ├── app/dashboard/layout.tsx\n    │     ├── app/dashboard/page.tsx\n    │     └── app/dashboard/settings/page.tsx\n    └── app/about/page.tsx (only root layout)",
      codeExample:
        "// app/layout.tsx — Root layout (חובה)\nexport default function RootLayout({ children }: { children: React.ReactNode }) {\n  return (\n    <html lang=\"he\" dir=\"rtl\">\n      <body>\n        <header>...</header>\n        <main>{children}</main>\n        <footer>© 2026</footer>\n      </body>\n    </html>\n  );\n}\n\n// app/dashboard/layout.tsx — Dashboard layout\nexport default function DashboardLayout({ children }: { children: React.ReactNode }) {\n  return (\n    <div className=\"flex\">\n      <Sidebar />\n      <div className=\"flex-1\">{children}</div>\n    </div>\n  );\n}",
      codeExplanation: "Root layout חובה ב-app/layout.tsx (כולל html+body). Nested layouts מוסיפים שכבות. children = תוכן הדף.",
    },
    {
      conceptName: "metadata",
      difficulty: 4,
      levels: {
        grandma: "כותרת ותיאור של הדף — מה Google רואה ומה מופיע בכרטיסייה.",
        child: "התווית על הדף — שם וכותרת קצרה.",
        soldier: "export const metadata = { title, description } ב-page.tsx או layout.tsx. Next.js יוצר אוטומטית את ה-meta tags.",
        student: "Metadata API (Next.js 13+). Static (export const metadata) או Dynamic (generateMetadata). Includes: title, description, OG, Twitter, robots, canonical.",
        junior: "פעם הזרקתי <Head> ב-React — כל פעם בדף שונה, גרר conflicts. עכשיו: metadata ב-page.tsx, Next.js מנהל הכל אוטומטית.",
        professor: "Metadata API replaces next/head. SEO-friendly: server-rendered. Hierarchical: layout metadata merges with page. Templates: title.template for prefix/suffix.",
      },
      illustration:
        "📋 Metadata locations:\n  app/layout.tsx → site-wide defaults\n  app/about/page.tsx → about page specific\n  Next.js auto-generates <title>, <meta>, OG tags",
      codeExample:
        "// app/layout.tsx\nimport type { Metadata } from 'next';\n\nexport const metadata: Metadata = {\n  title: { default: 'LumenPortal', template: '%s | LumenPortal' },\n  description: 'פורטל לימוד פיתוח web בעברית',\n  openGraph: {\n    title: 'LumenPortal',\n    images: ['/og.png'],\n  },\n};\n\n// app/about/page.tsx\nexport const metadata: Metadata = {\n  title: 'אודות',  // → 'אודות | LumenPortal' (template)\n  description: 'הסיפור של LumenPortal',\n};\n\n// Dynamic metadata\nexport async function generateMetadata({ params }) {\n  const post = await fetchPost(params.slug);\n  return { title: post.title, description: post.excerpt };\n}",
      codeExplanation: "metadata static או generateMetadata dynamic. template = prefix/suffix לכל דף. Layout מטא-נתונים מתמזג עם page.",
    },
  ],
};
