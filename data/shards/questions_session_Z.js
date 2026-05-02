// data/shards/questions_session_Z.js
// Sprint 2 batch Z — Next.js + Nest.js
// 50 questions: 35 MC + 15 Fill

window.QUESTIONS_SHARD_Z = {
  mc: [
    // ─── Next.js ───
    {
      id: "mc_nextjs_z_001",
      topicId: "topic_nextjs",
      conceptKey: "lesson_nextjs::Next.js",
      level: 5,
      question: "Next.js:",
      options: [
        "React framework with SSR/SSG/RSC + file-based routing + image optimization",
        "Vue framework",
        "Just a bundler",
        "DB"
      ],
      correctIndex: 0,
      explanation: "Built on React. Default for production React apps.",
      optionFeedback: [
        "✅ נכון. Next.js הוא React framework עם batteries included.",
        "❌ Nuxt.js הוא ל-Vue, Next.js ל-React.",
        "❌ Next.js כולל בנדלר אבל הוא לא רק זה.",
        "❌ Next.js הוא frontend framework, לא DB."
      ]
    },
    {
      id: "mc_approuter_z_001",
      topicId: "topic_nextjs",
      conceptKey: "lesson_nextjs::App Router",
      level: 6,
      question: "App Router (Next.js 13+):",
      options: [
        "app/ directory — RSC by default, layouts, route handlers, loading states",
        "pages/ legacy",
        "deprecated",
        "client only"
      ],
      correctIndex: 0,
      explanation: "Successor to Pages Router.",
      optionFeedback: [
        "✅ נכון. App Router הוא ה-routing הראשי החדש.",
        "❌ pages/ הוא Pages Router הישן.",
        "❌ זה ה-default מ-Next 13.",
        "❌ default = server, opt-in to client."
      ]
    },
    {
      id: "mc_filesys_z_001",
      topicId: "topic_nextjs",
      conceptKey: "lesson_nextjs::file-system routing",
      level: 5,
      question: "File-system routing:",
      options: [
        "URL maps to folder structure — app/users/page.tsx → /users",
        "Manual config",
        "RegEx",
        "Random"
      ],
      correctIndex: 0,
      explanation: "Convention over configuration.",
      optionFeedback: [
        "✅ נכון. URL = path בfilesystem.",
        "❌ אוטומטי.",
        "❌ Express יותר.",
        "❌ דטרמיניסטי."
      ]
    },
    {
      id: "mc_dynroute_z_001",
      topicId: "topic_nextjs",
      conceptKey: "lesson_nextjs::dynamic route",
      level: 6,
      question: "Dynamic route:",
      options: [
        "[id] folder — params.id available. catch-all [...slug]",
        "static only",
        "regex",
        "deprecated"
      ],
      correctIndex: 0,
      explanation: "Brackets denote dynamic segments.",
      optionFeedback: [
        "✅ נכון. [id] = dynamic param.",
        "❌ Next.js תומך ב-dynamic.",
        "❌ convention-based.",
        "❌ active."
      ]
    },
    {
      id: "mc_layout_z_001",
      topicId: "topic_nextjs",
      conceptKey: "lesson_nextjs::layout",
      level: 6,
      question: "layout.tsx:",
      options: [
        "Shared shell — wraps page + nested routes. Persists across navigation",
        "Same as page",
        "Per-component",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Doesn't re-render on navigation.",
      optionFeedback: [
        "✅ נכון. layouts persist.",
        "❌ הבדל מהותי.",
        "❌ root + nested.",
        "❌ standard."
      ]
    },
    {
      id: "mc_page_z_001",
      topicId: "topic_nextjs",
      conceptKey: "lesson_nextjs::page",
      level: 5,
      question: "page.tsx ב-App Router:",
      options: [
        "The actual route content — exported default function returns JSX",
        "Layout",
        "Component",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Required to make a route accessible.",
      optionFeedback: [
        "✅ נכון. page = route content.",
        "❌ layout מקיף את page.",
        "❌ generic component.",
        "❌ standard."
      ]
    },
    {
      id: "mc_servercmp_z_001",
      topicId: "topic_nextjs",
      conceptKey: "lesson_nextjs::server component",
      level: 7,
      question: "Server Component (RSC):",
      options: [
        "Renders on server only — can fetch data directly, no client JS shipped",
        "Same as client",
        "Deprecated",
        "Browser only"
      ],
      correctIndex: 0,
      explanation: "React 18 RSC. Default in App Router.",
      optionFeedback: [
        "✅ נכון. RSC = server-only rendering.",
        "❌ הבדל קריטי.",
        "❌ זה ה-default.",
        "❌ זה ההפך — server only."
      ]
    },
    {
      id: "mc_clientcmp_z_001",
      topicId: "topic_nextjs",
      conceptKey: "lesson_nextjs::client component",
      level: 7,
      question: "'use client' directive:",
      options: [
        "Marks component as client — runs in browser, can use hooks/events",
        "Server only",
        "Deprecated",
        "TypeScript only"
      ],
      correctIndex: 0,
      explanation: "Boundary between server and client.",
      optionFeedback: [
        "✅ נכון. 'use client' = client component.",
        "❌ זה ההפך.",
        "❌ standard.",
        "❌ JS native."
      ]
    },
    {
      id: "mc_routehandler_z_001",
      topicId: "topic_nextjs",
      conceptKey: "lesson_nextjs::route handler",
      level: 7,
      question: "Route Handler (route.ts):",
      options: [
        "API endpoint in App Router — exports GET/POST/etc named functions",
        "Pages API legacy",
        "Deprecated",
        "Client only"
      ],
      correctIndex: 0,
      explanation: "Replaces pages/api/ in App Router.",
      optionFeedback: [
        "✅ נכון. route.ts = API endpoint.",
        "❌ זה pages/api/ (legacy).",
        "❌ active.",
        "❌ זה server-only."
      ]
    },
    {
      id: "mc_apiroute_z_001",
      topicId: "topic_nextjs",
      conceptKey: "lesson_nextjs::API route",
      level: 6,
      question: "API route:",
      options: [
        "Server-side endpoint inside Next.js — alternative to separate Express server",
        "Client only",
        "Deprecated",
        "DB"
      ],
      correctIndex: 0,
      explanation: "BFF pattern.",
      optionFeedback: [
        "✅ נכון. API routes הם BFF inside Next.js.",
        "❌ server-side.",
        "❌ active.",
        "❌ DB layer separate."
      ]
    },
    {
      id: "mc_metadata_z_001",
      topicId: "topic_nextjs",
      conceptKey: "lesson_nextjs::metadata API",
      level: 7,
      question: "metadata API:",
      options: [
        "export const metadata = { title, description } — SEO meta tags",
        "Runtime",
        "Client",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Static or generateMetadata for dynamic.",
      optionFeedback: [
        "✅ נכון. metadata API = SEO tags.",
        "❌ build-time + per-route.",
        "❌ server.",
        "❌ standard."
      ]
    },
    {
      id: "mc_seo_z_001",
      topicId: "topic_nextjs",
      conceptKey: "lesson_nextjs::SEO",
      level: 6,
      question: "Next.js SEO:",
      options: [
        "Metadata API + structured data + sitemap.xml + robots.txt + OG/Twitter cards",
        "JS only",
        "Deprecated",
        "Auto"
      ],
      correctIndex: 0,
      explanation: "All built-in support.",
      optionFeedback: [
        "✅ נכון. multiple SEO concerns.",
        "❌ servers must render.",
        "❌ active.",
        "❌ partial — needs tags."
      ]
    },
    {
      id: "mc_image_z_001",
      topicId: "topic_nextjs",
      conceptKey: "lesson_nextjs::image optimization",
      level: 7,
      question: "next/image:",
      options: [
        "Auto-optimized images — WebP/AVIF, lazy loading, responsive srcset, blur placeholder",
        "Plain <img>",
        "Deprecated",
        "Client only"
      ],
      correctIndex: 0,
      explanation: "Built-in optimization.",
      optionFeedback: [
        "✅ נכון. next/image = optimized images.",
        "❌ זה plain HTML.",
        "❌ standard.",
        "❌ universal."
      ]
    },
    {
      id: "mc_serveraction_z_001",
      topicId: "topic_nextjs",
      conceptKey: "lesson_nextjs::server component",
      level: 8,
      question: "Server Action:",
      options: [
        "'use server' directive — call server functions directly from client (mutations)",
        "Same as route handler",
        "Client only",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Form mutations without API routes.",
      optionFeedback: [
        "✅ נכון. server actions = direct server fns.",
        "❌ שונה — route handler הוא URL.",
        "❌ זה ההפך.",
        "❌ active."
      ]
    },
    {
      id: "mc_ssr_z_001",
      topicId: "topic_nextjs",
      conceptKey: "lesson_nextjs::server component",
      level: 7,
      question: "SSR vs SSG vs ISR (Next.js):",
      options: [
        "SSR: per-request. SSG: build-time. ISR: SSG + revalidate after N seconds",
        "אותו דבר",
        "SSG slower",
        "SSR deprecated"
      ],
      correctIndex: 0,
      explanation: "Different rendering strategies.",
      optionFeedback: [
        "✅ נכון. trade-offs בין freshness ל-performance.",
        "❌ הבדל קריטי.",
        "❌ SSG הוא הכי מהיר ב-FCP.",
        "❌ SSR active."
      ]
    },
    // ─── Nest.js ───
    {
      id: "mc_nestjs_z_001",
      topicId: "topic_nestjs",
      conceptKey: "lesson_nestjs::Nest.js",
      level: 5,
      question: "Nest.js:",
      options: [
        "Opinionated Node.js framework — TypeScript, decorators, DI, Angular-like architecture",
        "Frontend",
        "Deprecated",
        "DB"
      ],
      correctIndex: 0,
      explanation: "Built on Express/Fastify.",
      optionFeedback: [
        "✅ נכון. Nest.js הוא backend framework מודרני.",
        "❌ backend.",
        "❌ active.",
        "❌ framework, לא DB."
      ]
    },
    {
      id: "mc_nestmodule_z_001",
      topicId: "topic_nestjs",
      conceptKey: "lesson_nestjs::module",
      level: 6,
      question: "Nest module:",
      options: [
        "@Module decorator — groups related controllers/providers, defines imports/exports",
        "JS module",
        "DB",
        "Service"
      ],
      correctIndex: 0,
      explanation: "Feature container.",
      optionFeedback: [
        "✅ נכון. Nest @Module = feature group.",
        "❌ ES Module שונה.",
        "❌ unrelated.",
        "❌ service is provider type."
      ]
    },
    {
      id: "mc_nestcontroller_z_001",
      topicId: "topic_nestjs",
      conceptKey: "lesson_nestjs::controller",
      level: 6,
      question: "Nest controller:",
      options: [
        "@Controller — handles HTTP requests, defines routes via decorators",
        "DB",
        "Service",
        "Filter"
      ],
      correctIndex: 0,
      explanation: "Thin layer — delegates to service.",
      optionFeedback: [
        "✅ נכון. controller = route handlers.",
        "❌ unrelated.",
        "❌ business logic ב-service.",
        "❌ filter שונה."
      ]
    },
    {
      id: "mc_nestprovider_z_001",
      topicId: "topic_nestjs",
      conceptKey: "lesson_nestjs::provider",
      level: 6,
      question: "Nest provider:",
      options: [
        "@Injectable — anything that can be injected (services, repositories, helpers)",
        "Controller",
        "Module",
        "DB"
      ],
      correctIndex: 0,
      explanation: "Foundation of DI.",
      optionFeedback: [
        "✅ נכון. provider = injectable.",
        "❌ controller שונה.",
        "❌ module groups.",
        "❌ DB layer separate."
      ]
    },
    {
      id: "mc_nestservice_z_001",
      topicId: "topic_nestjs",
      conceptKey: "lesson_nestjs::service",
      level: 6,
      question: "Nest service:",
      options: [
        "Provider with business logic — singleton by default, injected to controllers",
        "Module",
        "Decorator",
        "Type"
      ],
      correctIndex: 0,
      explanation: "Standard pattern.",
      optionFeedback: [
        "✅ נכון. service holds business logic.",
        "❌ different.",
        "❌ different.",
        "❌ different."
      ]
    },
    {
      id: "mc_nestdi_z_001",
      topicId: "topic_nestjs",
      conceptKey: "lesson_nestjs::dependency injection",
      level: 7,
      question: "Dependency Injection in Nest:",
      options: [
        "Constructor injection — Nest resolves and provides dependencies automatically",
        "Manual instantiation",
        "Globals",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Decoupling + testability.",
      optionFeedback: [
        "✅ נכון. DI ב-constructor.",
        "❌ Nest handles it.",
        "❌ anti-pattern.",
        "❌ active."
      ]
    },
    {
      id: "mc_nestdecorator_z_001",
      topicId: "topic_nestjs",
      conceptKey: "lesson_nestjs::decorator",
      level: 7,
      question: "Decorator (@):",
      options: [
        "Function that adds metadata/behavior to class/method/property",
        "Variable",
        "Loop",
        "Function"
      ],
      correctIndex: 0,
      explanation: "Reflection + metadata.",
      optionFeedback: [
        "✅ נכון. decorator = metadata adder.",
        "❌ different.",
        "❌ different.",
        "❌ partial."
      ]
    },
    {
      id: "mc_nestdto_z_001",
      topicId: "topic_nestjs",
      conceptKey: "lesson_nestjs::DTO",
      level: 7,
      question: "DTO (Data Transfer Object):",
      options: [
        "Class defining request/response shape — typed, validated via class-validator",
        "DB record",
        "Service",
        "Module"
      ],
      correctIndex: 0,
      explanation: "Boundary of API.",
      optionFeedback: [
        "✅ נכון. DTO = API contract.",
        "❌ DB shape ב-Entity.",
        "❌ unrelated.",
        "❌ unrelated."
      ]
    },
    {
      id: "mc_nestpipe_z_001",
      topicId: "topic_nestjs",
      conceptKey: "lesson_nestjs::pipe",
      level: 7,
      question: "Pipe:",
      options: [
        "Transforms or validates input before route handler — ValidationPipe common",
        "Output transformation",
        "DB",
        "Cache"
      ],
      correctIndex: 0,
      explanation: "Pre-handler middleware.",
      optionFeedback: [
        "✅ נכון. pipe = input transform/validate.",
        "❌ זה interceptor.",
        "❌ unrelated.",
        "❌ unrelated."
      ]
    },
    {
      id: "mc_nestguard_z_001",
      topicId: "topic_nestjs",
      conceptKey: "lesson_nestjs::guard",
      level: 7,
      question: "Guard:",
      options: [
        "Authorization — canActivate() returns boolean. Block before handler",
        "Validation",
        "Logging",
        "Cache"
      ],
      correctIndex: 0,
      explanation: "Auth/permissions check.",
      optionFeedback: [
        "✅ נכון. guard = auth check.",
        "❌ זה pipe.",
        "❌ זה interceptor.",
        "❌ unrelated."
      ]
    },
    {
      id: "mc_nestmw_z_001",
      topicId: "topic_nestjs",
      conceptKey: "lesson_nestjs::middleware",
      level: 7,
      question: "Nest middleware vs guard:",
      options: [
        "Middleware = Express-style, before guards. Guards = Nest-specific, after middleware",
        "אותו דבר",
        "Guards first",
        "Middleware deprecated"
      ],
      correctIndex: 0,
      explanation: "Order: middleware → guards → interceptors → pipes → handler.",
      optionFeedback: [
        "✅ נכון. order חשוב ב-Nest.",
        "❌ הבדלים.",
        "❌ middleware first.",
        "❌ active."
      ]
    },
    {
      id: "mc_nestinterceptor_z_001",
      topicId: "topic_nestjs",
      conceptKey: "lesson_nestjs::interceptor",
      level: 8,
      question: "Interceptor:",
      options: [
        "Wraps handler with before/after logic — logging, caching, transform response (RxJS)",
        "Pipe",
        "Guard",
        "Module"
      ],
      correctIndex: 0,
      explanation: "RxJS observables.",
      optionFeedback: [
        "✅ נכון. interceptor = wrap handler.",
        "❌ pipe = input only.",
        "❌ guard = auth.",
        "❌ unrelated."
      ]
    },
    {
      id: "mc_nestfilter_z_001",
      topicId: "topic_nestjs",
      conceptKey: "lesson_nestjs::exception filter",
      level: 7,
      question: "Exception filter:",
      options: [
        "Catches thrown exceptions, formats response — global or per-route",
        "Pipe",
        "Guard",
        "Service"
      ],
      correctIndex: 0,
      explanation: "Centralized error handling.",
      optionFeedback: [
        "✅ נכון. filter = error handler.",
        "❌ different.",
        "❌ different.",
        "❌ different."
      ]
    },
    {
      id: "mc_nestrepo_z_001",
      topicId: "topic_nestjs",
      conceptKey: "lesson_nestjs::repository pattern",
      level: 7,
      question: "Repository pattern:",
      options: [
        "Abstracts DB access — service uses repository, easy to mock for tests",
        "DB itself",
        "Cache",
        "Module"
      ],
      correctIndex: 0,
      explanation: "Standard pattern in Nest with TypeORM/Prisma.",
      optionFeedback: [
        "✅ נכון. repository = DB abstraction.",
        "❌ layer above.",
        "❌ different.",
        "❌ different."
      ]
    },
    {
      id: "mc_nesttest_z_001",
      topicId: "topic_nestjs",
      conceptKey: "lesson_nestjs::testing module",
      level: 7,
      question: "Testing in Nest:",
      options: [
        "Test.createTestingModule() — mock providers, isolate units",
        "No testing",
        "Manual",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Built-in testing utilities.",
      optionFeedback: [
        "✅ נכון. TestingModule = unit test setup.",
        "❌ DI = testable.",
        "❌ automated.",
        "❌ first-class."
      ]
    },
    {
      id: "mc_nestvalidate_z_001",
      topicId: "topic_nestjs",
      conceptKey: "lesson_nestjs::validation pipe",
      level: 7,
      question: "ValidationPipe:",
      options: [
        "Built-in pipe with class-validator decorators on DTOs — auto-validate input",
        "Manual",
        "Deprecated",
        "Frontend"
      ],
      correctIndex: 0,
      explanation: "useGlobalPipes(new ValidationPipe()).",
      optionFeedback: [
        "✅ נכון. ValidationPipe = built-in DTO validator.",
        "❌ אוטומטי.",
        "❌ active.",
        "❌ backend."
      ]
    },
    // ─── Mixed ───
    {
      id: "mc_nextjs_streaming_z_001",
      topicId: "topic_nextjs",
      conceptKey: "lesson_nextjs::server component",
      level: 8,
      question: "Suspense streaming в Next.js:",
      options: [
        "<Suspense fallback> — server streams HTML chunks, hydrates progressively",
        "Sync render",
        "Client only",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Better UX for slow data.",
      optionFeedback: [
        "✅ נכון. streaming + Suspense.",
        "❌ זה ההפך.",
        "❌ server-driven.",
        "❌ React 18+ feature."
      ]
    },
    {
      id: "mc_nextjs_revalidate_z_001",
      topicId: "topic_nextjs",
      conceptKey: "lesson_nextjs::server component",
      level: 8,
      question: "ISR revalidation:",
      options: [
        "export const revalidate = 60 — page rebuild after 60s",
        "Manual rebuild",
        "Real-time",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Background regeneration.",
      optionFeedback: [
        "✅ נכון. revalidate = ISR period.",
        "❌ אוטומטי.",
        "❌ time-based.",
        "❌ active."
      ]
    },
    {
      id: "mc_nestlifecycle_z_001",
      topicId: "topic_nestjs",
      conceptKey: "lesson_nestjs::module",
      level: 7,
      question: "Nest module lifecycle:",
      options: [
        "OnModuleInit, OnApplicationBootstrap, OnModuleDestroy hooks",
        "None",
        "Class only",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "For init/cleanup logic.",
      optionFeedback: [
        "✅ נכון. lifecycle hooks קיימים.",
        "❌ קיימים.",
        "❌ available everywhere.",
        "❌ standard."
      ]
    },
  ],
  fill: [
    {
      id: "fill_nextjs_app_z_001",
      topicId: "topic_nextjs",
      conceptKey: "lesson_nextjs::Next.js",
      level: 5,
      code: "// app/page.tsx\nexport default function Home() {\n  return <h1>____</h1>;\n}",
      answer: "Hello",
      explanation: "Default export of page.tsx is the route component."
    },
    {
      id: "fill_nextjs_dynamic_z_001",
      topicId: "topic_nextjs",
      conceptKey: "lesson_nextjs::dynamic route",
      level: 6,
      code: "// app/users/[____]/page.tsx — dynamic segment\nexport default function User({ params }) {\n  return <p>{params.id}</p>;\n}",
      answer: "id",
      explanation: "Brackets denote dynamic param. Available via params.id."
    },
    {
      id: "fill_nextjs_layout_z_001",
      topicId: "topic_nextjs",
      conceptKey: "lesson_nextjs::layout",
      level: 6,
      code: "// app/layout.tsx\nexport default function RootLayout({ ____ }) {\n  return <html><body>{children}</body></html>;\n}",
      answer: "children",
      explanation: "Layout receives children prop with nested page content."
    },
    {
      id: "fill_nextjs_useclient_z_001",
      topicId: "topic_nextjs",
      conceptKey: "lesson_nextjs::client component",
      level: 7,
      code: "'use ____';\nimport { useState } from 'react';\nexport default function Counter() { ... }",
      answer: "client",
      explanation: "'use client' directive marks component as client-side."
    },
    {
      id: "fill_nextjs_route_z_001",
      topicId: "topic_nextjs",
      conceptKey: "lesson_nextjs::route handler",
      level: 7,
      code: "// app/api/users/route.ts\nexport async function ____(request) {\n  return Response.json({ users: [] });\n}",
      answer: "GET",
      explanation: "Named export GET handles GET requests in route handlers."
    },
    {
      id: "fill_nextjs_metadata_z_001",
      topicId: "topic_nextjs",
      conceptKey: "lesson_nextjs::metadata API",
      level: 7,
      code: "export const ____ = {\n  title: 'My Page',\n  description: 'SEO desc'\n};",
      answer: "metadata",
      explanation: "metadata export for SEO meta tags."
    },
    {
      id: "fill_nextjs_image_z_001",
      topicId: "topic_nextjs",
      conceptKey: "lesson_nextjs::image optimization",
      level: 7,
      code: "import ____ from 'next/image';\n<Image src='/hero.jpg' width={800} height={400} alt='Hero' />",
      answer: "Image",
      explanation: "next/image default export."
    },
    {
      id: "fill_nestjs_module_z_001",
      topicId: "topic_nestjs",
      conceptKey: "lesson_nestjs::module",
      level: 6,
      code: "@____({\n  controllers: [UserController],\n  providers: [UserService]\n})\nexport class UserModule {}",
      answer: "Module",
      explanation: "@Module decorator defines module."
    },
    {
      id: "fill_nestjs_controller_z_001",
      topicId: "topic_nestjs",
      conceptKey: "lesson_nestjs::controller",
      level: 6,
      code: "@____('users')\nexport class UserController {\n  @Get() findAll() {}\n}",
      answer: "Controller",
      explanation: "@Controller decorator with route prefix."
    },
    {
      id: "fill_nestjs_inject_z_001",
      topicId: "topic_nestjs",
      conceptKey: "lesson_nestjs::dependency injection",
      level: 7,
      code: "@Injectable()\nexport class UserService {\n  constructor(____ db: Database) {}\n}",
      answer: "private",
      explanation: "TypeScript parameter property + DI."
    },
    {
      id: "fill_nestjs_get_z_001",
      topicId: "topic_nestjs",
      conceptKey: "lesson_nestjs::controller",
      level: 6,
      code: "@____('/:id')\nfindOne(@Param('id') id: string) {\n  return this.userService.findById(id);\n}",
      answer: "Get",
      explanation: "@Get for GET routes."
    },
    {
      id: "fill_nestjs_body_z_001",
      topicId: "topic_nestjs",
      conceptKey: "lesson_nestjs::DTO",
      level: 7,
      code: "@Post()\ncreate(@____() dto: CreateUserDto) {\n  return this.userService.create(dto);\n}",
      answer: "Body",
      explanation: "@Body extracts request body."
    },
    {
      id: "fill_nestjs_guard_z_001",
      topicId: "topic_nestjs",
      conceptKey: "lesson_nestjs::guard",
      level: 7,
      code: "@____(AuthGuard)\n@Get('/profile')\ngetProfile(@User() user) { return user; }",
      answer: "UseGuards",
      explanation: "@UseGuards applies guard to route."
    },
    {
      id: "fill_nestjs_pipe_z_001",
      topicId: "topic_nestjs",
      conceptKey: "lesson_nestjs::pipe",
      level: 7,
      code: "// global validation\napp.useGlobalPipes(new ____Pipe());",
      answer: "Validation",
      explanation: "ValidationPipe with class-validator."
    },
    {
      id: "fill_nestjs_inject_decorator_z_001",
      topicId: "topic_nestjs",
      conceptKey: "lesson_nestjs::provider",
      level: 7,
      code: "@____()\nexport class UserService {\n  // ...\n}",
      answer: "Injectable",
      explanation: "@Injectable marks class as provider."
    },
  ],
};
