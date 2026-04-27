// LumenPortal Service Worker — P1.3
// Caches the app shell + primary lessons for offline use.
// Cache strategy: cache-first for static assets, network-first for HTML.

const CACHE_VERSION = "lumen-v1.9.0";
const STATIC_CACHE = `${CACHE_VERSION}-static`;

// Resources that MUST be available offline (the App Shell + core data)
const SHELL_ASSETS = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
  "/content-loader.js",
  "/lib/rng.js",
  "/lib/srs.js",
  "/lib/code-runner.js",
  // primary curated content
  "/data/questions_bank.js",
  "/data/concept_enrichment.js",
  "/data/extended_explanations.js",
  "/data/questions_trace.js",
  "/data/questions_bug.js",
  "/data/questions_build.js",
  "/data/animations.js",
  "/data/what_if.js",
  "/data/quick_guide.js",
  "/data/code_blocks.js",
  "/data/glossary.js",
  "/data/anti_patterns.js",
  "/data/mnemonics.js",
  // Lessons 11-27 + new
  "/data/lesson11.js",
  "/data/lesson12.js",
  "/data/lesson13.js",
  "/data/lesson15.js",
  "/data/lesson16.js",
  "/data/lesson17.js",
  "/data/lesson18.js",
  "/data/lesson19.js",
  "/data/lesson20.js",
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
      .then((cache) => cache.addAll(SHELL_ASSETS))
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

// Fetch — cache-first for static assets, network fallback otherwise.
self.addEventListener("fetch", (event) => {
  const { request } = event;
  // Only handle GET requests within the same origin
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

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
        .catch(() => {
          // Offline fallback — return cached index.html if exists
          if (request.headers.get("accept")?.includes("text/html")) {
            return caches.match("/index.html");
          }
        });
    }),
  );
});
