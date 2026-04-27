// data/lesson32.js — שיעור 32: Next.js Advanced — API Routes, SEO, Server Actions
// Full-Stack מתקדם. מבחן: 6-8 שאלות צפויות.
var LESSON_32 = {
  id: "lesson_32",
  title: "שיעור 32 — Next.js Advanced — API Routes, SEO, Server Actions",
  description:
    "Next.js מתקדם: dynamic API routes, middleware, SEO (metadata, sitemap), Server Actions, ISR.",
  concepts: [
    {
      conceptName: "Server Actions",
      difficulty: 7,
      levels: {
        grandma: "פונקציות שרצות בשרת אבל קוראות אליהן ישירות מ-React — בלי לבנות endpoint API.",
        child: "כמו לבקש מאמא בטלפון לעשות משהו — בלי לכתוב מכתב רשמי.",
        soldier: "'use server' directive. פונקציה רצה בשרת. נקראת מ-Client Component כמו פונקציה רגילה.",
        student: "Server Actions (Next.js 14+): async functions with 'use server'. Run on server, callable from client. Form handling, data mutations. RPC-like.",
        junior: "פעם בניתי /api/posts + fetch + JSON serialize/parse. 50 שורות. עם Server Action — function אחת ב-actions.ts, קוראים אליה מ-form. 10 שורות.",
        professor: "Server Actions = RPC over HTTP. Encrypted action IDs. Progressive enhancement: works without JS via form action. Streaming results. Optimistic updates with useOptimistic.",
      },
      illustration:
        "📡 Server Action:\n  client form → submit → action runs on server\n  → no API route file needed\n  → automatic revalidation",
      codeExample:
        "// actions.ts\n'use server';\nimport { db } from '@/lib/db';\nimport { revalidatePath } from 'next/cache';\n\nexport async function createPost(formData: FormData) {\n  const title = formData.get('title') as string;\n  await db.posts.create({ data: { title } });\n  revalidatePath('/posts');  // עדכון cache\n}\n\n// page.tsx (Server Component)\nimport { createPost } from './actions';\n\nexport default function NewPost() {\n  return (\n    <form action={createPost}>\n      <input name=\"title\" required />\n      <button type=\"submit\">Create</button>\n    </form>\n  );\n}\n\n// Client Component עם form action\n'use client';\nimport { createPost } from './actions';\nimport { useTransition } from 'react';\n\nexport default function NewPostClient() {\n  const [isPending, startTransition] = useTransition();\n  return (\n    <form action={(formData) => startTransition(() => createPost(formData))}>\n      <input name=\"title\" />\n      <button disabled={isPending}>{isPending ? 'Saving...' : 'Create'}</button>\n    </form>\n  );\n}",
      codeExplanation: "'use server' מסמן action. form action={fn} עובד גם ללא JS. revalidatePath מסמן cache לעדכון. useTransition לpending state ב-Client.",
    },
    {
      conceptName: "middleware",
      difficulty: 6,
      levels: {
        grandma: "שכבה לפני העיבוד הראשי — בודקת בקשות, מנתבת, חוסמת. כמו שומר בכניסה.",
        child: "כמו מורה תורנית — בודקת מי יכול להיכנס לפני שמגיעים לשיעור.",
        soldier: "middleware.ts (root) — רץ לפני page/route handler. אפשר redirect, rewrite, headers.",
        student: "Next.js middleware: middleware.ts at app root. Edge runtime. Runs before request. Use cases: auth check, geo-routing, A/B testing, header injection. matcher config selects routes.",
        junior: "פעם בניתי auth check ב-כל page. עברתי ל-middleware — שורה אחת בודקת JWT לכל route מתחת ל-/dashboard. clean.",
        professor: "Edge middleware on Vercel: V8 isolate, low latency, geo-distributed. Cannot use Node APIs (no fs, no Buffer). NextRequest/NextResponse. Constraints: runtime size limit, no native deps.",
      },
      illustration:
        "🛡️ Middleware:\n  request → middleware.ts → page/route\n   ↓\n  can: redirect, rewrite, set headers, allow",
      codeExample:
        "// middleware.ts (project root)\nimport { NextResponse } from 'next/server';\nimport type { NextRequest } from 'next/server';\n\nexport function middleware(req: NextRequest) {\n  const token = req.cookies.get('session')?.value;\n\n  // Auth check\n  if (req.nextUrl.pathname.startsWith('/dashboard')) {\n    if (!token) {\n      return NextResponse.redirect(new URL('/login', req.url));\n    }\n  }\n\n  // Geo-routing\n  const country = req.geo?.country;\n  if (country === 'IL' && req.nextUrl.pathname === '/') {\n    return NextResponse.rewrite(new URL('/he', req.url));\n  }\n\n  // Add header\n  const response = NextResponse.next();\n  response.headers.set('X-Custom', 'value');\n  return response;\n}\n\n// matcher: select routes\nexport const config = {\n  matcher: ['/dashboard/:path*', '/api/:path*'],\n};",
      codeExplanation: "middleware.ts ב-root. NextResponse.redirect/rewrite/next. matcher בוחר routes. רץ ב-Edge Runtime — מהיר.",
    },
    {
      conceptName: "metadata API",
      difficulty: 5,
      levels: {
        grandma: "כותרות ותיאורים של דפים — מה Google מציג, מה רואים בכרטיסייה.",
        child: "התווית של הספר — שם, תיאור קצר, איור.",
        soldier: "Static: export const metadata. Dynamic: generateMetadata(). מתפקד layout/page.",
        student: "Metadata API (Next.js 13+): replaces next/head. Object literal with title, description, OG, Twitter, robots, canonical. Hierarchical: layout merges with page. generateMetadata async.",
        junior: "פעם <Head> ב-pages router היה לכל page. עכשיו metadata קל ויותר מובנה — title.template ל-prefix אוטומטי, openGraph אובייקט מסודר.",
        professor: "Metadata API SSR-rendered. SEO-friendly (no client-side hydration of meta). Image generation: opengraph-image.tsx for dynamic OG. Sitemap/robots: special files (sitemap.ts, robots.ts).",
      },
      illustration:
        "📋 Metadata hierarchy:\n  app/layout.tsx → defaults (site name)\n   ↓ merge\n  app/blog/layout.tsx → adds 'blog' to title template\n   ↓ merge\n  app/blog/[slug]/page.tsx → specific title from data",
      codeExample:
        "// app/layout.tsx\nimport type { Metadata } from 'next';\n\nexport const metadata: Metadata = {\n  metadataBase: new URL('https://example.com'),\n  title: { default: 'Site', template: '%s | Site' },\n  description: 'Default description',\n  openGraph: {\n    siteName: 'Site',\n    images: ['/og-default.png'],\n  },\n};\n\n// app/blog/[slug]/page.tsx — Dynamic\nexport async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {\n  const post = await fetchPost(params.slug);\n  return {\n    title: post.title,         // → 'X | Site' (template)\n    description: post.excerpt,\n    openGraph: {\n      title: post.title,\n      images: [post.image],\n    },\n    twitter: {\n      card: 'summary_large_image',\n      title: post.title,\n    },\n  };\n}\n\n// app/sitemap.ts — auto sitemap\nexport default async function sitemap() {\n  const posts = await fetchAllPosts();\n  return [\n    { url: 'https://example.com', lastModified: new Date() },\n    ...posts.map(p => ({\n      url: `https://example.com/blog/${p.slug}`,\n      lastModified: p.updatedAt,\n    })),\n  ];\n}",
      codeExplanation: "metadata static או generateMetadata dynamic. template מוסיף prefix/suffix אוטומטית. sitemap.ts generates sitemap.xml. robots.ts ל-robots.txt.",
    },
    {
      conceptName: "ISR",
      difficulty: 7,
      levels: {
        grandma: "דפים static שמעדכנים את עצמם כל זמן מה — מהירים כסטטי, טריים כדינמי.",
        child: "כמו עוגה שהאופה מעדכנת כל שעה — תמיד טרייה, אבל לא צריך לאפות מהתחלה.",
        soldier: "ISR = Incremental Static Regeneration. Page נבנה build-time, מתחדש אחרי X שניות.",
        student: "ISR: pre-render at build, regenerate on-demand or every X seconds. Best of static (fast) + dynamic (fresh). next: revalidate option in fetch / generateStaticParams + dynamicParams.",
        junior: "פעם blog שלי SSR — slow (DB call כל request). עברתי ל-ISR (revalidate: 60) — fast, ובדיקה כל 60 שניות לעדכונים.",
        professor: "ISR is hybrid SSG+SSR. Stale-while-revalidate: serve stale, regenerate in background. On-demand revalidation via revalidatePath/revalidateTag. Cache layers: data, route, full route, browser.",
      },
      illustration:
        "🔄 ISR:\n  build time: page1 generated → cache\n  request 1: serve cached (fast)\n  request 2 (after 60s): serve stale + regenerate background\n  request 3: serve fresh",
      codeExample:
        "// page.tsx — fetch with revalidate\nexport default async function Page() {\n  const data = await fetch('https://api.example.com/posts', {\n    next: { revalidate: 60 },  // refresh every 60s\n  }).then(r => r.json());\n\n  return <div>{data.length} posts</div>;\n}\n\n// generateStaticParams — pre-build pages\nexport async function generateStaticParams() {\n  const posts = await fetchAllPosts();\n  return posts.map(p => ({ slug: p.slug }));\n}\n\nexport const revalidate = 3600;  // refresh hourly\n\n// On-demand revalidation (inside Server Action / API)\nimport { revalidatePath, revalidateTag } from 'next/cache';\n\nexport async function updatePost(id, data) {\n  await db.posts.update({ where: { id }, data });\n  revalidatePath(`/blog/${id}`);  // refresh cache for path\n  revalidateTag('posts');         // refresh by tag\n}",
      codeExplanation: "fetch עם revalidate או export const revalidate. generateStaticParams מ-pre-build. revalidatePath/revalidateTag לעדכון on-demand.",
    },
    {
      conceptName: "useFormState / useFormStatus",
      difficulty: 7,
      levels: {
        grandma: "Hooks ל-form עם Server Actions — לראות מצב שליחה, להציג שגיאות מהשרת.",
        child: "מד אצבע למשחק — אומר מתי שולח, ומה השרת ענה.",
        soldier: "useFormState — מנהל state בין renders. useFormStatus — מצב submission הנוכחי.",
        student: "useFormState(action, initialState): returns [state, formAction]. useFormStatus(): returns { pending, data, method, action }. Both work with Server Actions.",
        junior: "פעם ניהלתי isPending + error ידני. עכשיו useFormStatus מחזיר pending — הכפתור disabled אוטומטית. useFormState מקבל error מהשרת.",
        professor: "Progressive enhancement principles. useFormStatus must be in child of <form>. useFormState manages stateful actions (validation errors, success messages). Replaces traditional form libraries for simple cases.",
      },
      illustration:
        "🎯 Form hooks:\n  useFormState → [state, action] → state across submits\n  useFormStatus → { pending } → in-flight indicator",
      codeExample:
        "// actions.ts\n'use server';\n\nexport async function submitForm(prevState: any, formData: FormData) {\n  const email = formData.get('email');\n\n  if (!email) {\n    return { error: 'Email required' };\n  }\n\n  await db.subscribers.create({ data: { email } });\n  return { success: true, message: 'Thanks!' };\n}\n\n// form.tsx\n'use client';\nimport { useFormState, useFormStatus } from 'react-dom';\nimport { submitForm } from './actions';\n\nfunction SubmitButton() {\n  const { pending } = useFormStatus();\n  return <button disabled={pending}>{pending ? 'Sending...' : 'Submit'}</button>;\n}\n\nexport default function Form() {\n  const [state, formAction] = useFormState(submitForm, { error: null });\n\n  return (\n    <form action={formAction}>\n      <input name=\"email\" type=\"email\" required />\n      {state.error && <p style={{color: 'red'}}>{state.error}</p>}\n      {state.success && <p style={{color: 'green'}}>{state.message}</p>}\n      <SubmitButton />\n    </form>\n  );\n}",
      codeExplanation: "useFormState מקבל [state, formAction] מ-Server Action. useFormStatus ב-child component מחזיר pending. הכל progressive enhancement.",
    },
  ],
};
