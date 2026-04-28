// LumenPortal Service Worker — P1.3
// Caches the app shell + primary lessons for offline use.
// Cache strategy: cache-first for static assets, network-first for HTML.

const CACHE_VERSION = "lumen-v2.4.18";
const STATIC_CACHE = `${CACHE_VERSION}-static`;

// Resources that MUST be available offline (the App Shell + core data)
const SHELL_ASSETS = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
  "/content-loader.js",
  "/src/main.js",
  "/src/core/runtime.js",
  "/src/core/sanitize.js",
  "/src/core/sanitize-early.js",
  "/src/core/scoring.js",
  "/src/core/streak.js",
  "/src/core/question-prerequisites.js",
  "/src/core/mistake-agent.js",
  "/src/core/learning-evidence.js",
  "/src/core/confidence-calibration.js",
  "/src/core/confusion-blockers.js",
  "/src/views/context-tree.js",
  "/src/ui/legacy-script-registry.js",
  "/src/views/legacy-views.js",
  "/src/utils/dom-ready.js",
  "/lib/rng.js",
  "/lib/srs.js",
  "/lib/code-runner.js",
  "/lib/vendor/dompurify.min.js",
  // primary curated content
  "/data/questions_bank.js",
  "/data/svcollege_questions_sql_orm.js",
  "/data/svcollege_questions_auth.js",
  "/data/svcollege_questions_nextjs.js",
  "/data/concept_enrichment.js",
  "/data/extended_explanations.js",
  "/data/questions_trace.js",
  "/data/svcollege_traces_sql_orm.js",
  "/data/svcollege_traces_auth.js",
  "/data/svcollege_traces_nextjs.js",
  "/data/questions_bug.js",
  "/data/questions_build.js",
  "/data/svcollege_builds_sql_orm.js",
  "/data/svcollege_builds_auth.js",
  "/data/svcollege_builds_nextjs.js",
  "/data/lesson_quiz_keys.js",
  "/data/animations.js",
  "/data/what_if.js",
  "/data/concept_comics.js",
  "/data/stage_zero.js",
  "/data/memory_palaces.js",
  "/data/problem_first.js",
  "/data/concept_videos.js",
  "/data/option_feedback.js",
  "/data/quick_guide.js",
  "/data/grandma_knowledge.js",
  "/data/grandma_visuals.js",
  "/data/code_blocks.js",
  "/data/glossary.js",
  "/data/anti_patterns.js",
  "/data/mnemonics.js",
  "/data/flashcards.js",
  "/data/capstones.js",
  "/data/course_blueprints.js",
  "/data/svcollege_prerequisites_sql_orm.js",
  "/data/svcollege_prerequisites_auth.js",
  "/data/svcollege_prerequisites_nextjs.js",
  // Lessons 11-27 + new
  "/data/lesson11.js",
  "/data/lesson12.js",
  "/data/lesson13.js",
  "/data/lesson_html_css_foundations.js",
  "/data/lesson_tooling_git.js",
  "/data/lesson15.js",
  "/data/lesson16.js",
  "/data/lesson17.js",
  "/data/lesson18.js",
  "/data/lesson19.js",
  "/data/lesson20.js",
  "/data/lesson_sql_orm.js",
  "/data/lesson_auth_security.js",
  "/data/lesson_nextjs.js",
  "/data/lesson21.js",
  "/data/lesson22.js",
  "/data/lesson23.js",
  "/data/lesson24.js",
  "/data/lesson25.js",
  "/data/lesson26.js",
  "/data/lesson27.js",
  "/data/lesson_closures.js",
  "/data/workbook_taskmanager.js",
  "/data/ai_development.js",
  "/data/react_blueprint.js",
];

// Install — cache the shell.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(SHELL_ASSETS.map((url) => new Request(url, { cache: "reload" }))))
      .then(() => self.skipWaiting())
      .catch((err) => console.warn("[SW] precache failed:", err)),
  );
});

// Activate — clean old caches.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k.startsWith("lumen-") && k !== STATIC_CACHE)
          .map((k) => caches.delete(k)),
      ),
    ).then(() => self.clients.claim()),
  );
});

// Fetch — network-first for HTML, cache-first for static assets.
self.addEventListener("fetch", (event) => {
  const { request } = event;
  // Only handle GET requests within the same origin
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  const isHtmlNavigation = request.mode === "navigate" || request.headers.get("accept")?.includes("text/html");
  if (isHtmlNavigation) {
    event.respondWith(
      fetch(new Request(request, { cache: "reload" }))
        .then((res) => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(STATIC_CACHE).then((cache) => cache.put("/index.html", clone)).catch(() => {});
          }
          return res;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match("/index.html"))),
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((res) => {
          // Optionally cache new GET requests for next time (e.g., lazy seeded bank)
          if (res.ok && (url.pathname.endsWith(".js") || url.pathname.endsWith(".css"))) {
            const clone = res.clone();
            caches.open(STATIC_CACHE).then((c) => c.put(request, clone)).catch(() => {});
          }
          return res;
        })
        .catch(() => undefined);
    }),
  );
});
