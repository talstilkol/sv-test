// LumenPortal Service Worker — P1.3
// Caches the app shell + primary lessons for offline use.
// Cache strategy: cache-first for static assets, network-first for HTML.

const CACHE_VERSION = "lumen-v2.4.137-autosave";
const STATIC_CACHE = `${CACHE_VERSION}-static`;

// Resources that MUST be available offline (the App Shell + core data)
const SHELL_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/style.css",
  "/style.css?v=concept-sprint-v69",
  "/app.js",
  "/app.js?v=top-bar-perf-v102",
  "/content-loader.js",
  "/content-loader.js?v=content-validation-v1",
  "/src/main.js",
  "/src/main.js?v=core-bootstrap-v2",
  "/src/core/runtime.js",
  "/src/core/sanitize.js",
  "/src/core/sanitize-early.js",
  "/src/core/scoring.js",
  "/src/core/streak.js",
  "/src/core/question-prerequisites.js",
  "/src/core/question-prerequisites.js?v=question-prereq-v2",
  "/src/core/mistake-agent.js",
  "/src/core/learning-evidence.js",
  "/src/core/content-studio.js",
  "/src/core/outcome-loop.js",
  "/src/core/bug-agent.js",
  "/src/core/support-report.js",
  "/src/core/progress-sync.js",
  "/src/core/teacher-classes.js",
  "/src/core/teacher-students.js",
  "/src/core/teacher-heatmap.js",
  "/src/core/teacher-risk-alerts.js",
  "/src/core/teacher-assignments.js",
  "/src/core/teacher-bulk-import.js",
  "/src/core/community-discussions.js",
  "/src/core/community-votes.js",
  "/src/core/community-reputation.js",
  "/src/core/community-moderation.js",
  "/src/core/peer-review.js",
  "/src/core/mentor-matching.js",
  "/src/core/confidence-calibration.js",
  "/src/core/confusion-blockers.js",
  "/src/core/concept-tags.js",
  "/src/views/context-tree.js",
  "/src/views/theme-toggle/theme-toggle.js",
  "/src/views/pocket-concept-card/pocket-state.js",
  "/src/state/store.js",
  "/src/ui/legacy-script-registry.js",
  "/src/views/legacy-views.js",
  "/src/utils/dom-ready.js",
  "/src/utils/escape.js",
  "/lib/rng.js",
  "/lib/srs.js",
  "/lib/code-runner.js",
  "/lib/vendor/dompurify.min.js",
  // primary curated content
  "/data/questions_bank.js",
  "/data/svcollege_questions_sql_orm.js",
  "/data/svcollege_questions_sql_orm.js?v=svcollege-sql-orm-v1",
  "/data/svcollege_questions_auth.js",
  "/data/svcollege_questions_auth.js?v=svcollege-auth-v1",
  "/data/svcollege_questions_nextjs.js",
  "/data/svcollege_questions_nextjs.js?v=svcollege-nextjs-v1",
  "/data/svcollege_questions_nestjs.js",
  "/data/svcollege_questions_nestjs.js?v=svcollege-nestjs-v1",
  "/data/svcollege_questions_devops.js",
  "/data/svcollege_questions_devops.js?v=svcollege-devops-v1",
  "/data/svcollege_questions_ai_engineering.js",
  "/data/svcollege_questions_ai_engineering.js?v=svcollege-ai-engineering-v1",
  "/data/svcollege_questions_design_systems.js",
  "/data/svcollege_questions_design_systems.js?v=svcollege-design-systems-v1",
  "/data/concept_enrichment.js",
  "/data/extended_explanations.js",
  "/data/questions_trace.js",
  "/data/svcollege_traces_sql_orm.js",
  "/data/svcollege_traces_sql_orm.js?v=svcollege-sql-orm-v2",
  "/data/svcollege_traces_auth.js",
  "/data/svcollege_traces_auth.js?v=svcollege-auth-v2",
  "/data/svcollege_traces_nextjs.js",
  "/data/svcollege_traces_nextjs.js?v=svcollege-nextjs-v2",
  "/data/svcollege_traces_nestjs.js",
  "/data/svcollege_traces_nestjs.js?v=svcollege-nestjs-v2",
  "/data/svcollege_traces_devops.js",
  "/data/svcollege_traces_devops.js?v=svcollege-devops-v2",
  "/data/svcollege_traces_ai_engineering.js",
  "/data/svcollege_traces_ai_engineering.js?v=svcollege-ai-engineering-v2",
  "/data/svcollege_traces_design_systems.js",
  "/data/svcollege_traces_design_systems.js?v=svcollege-design-systems-v1",
  "/data/svcollege_traces_bridge.js",
  "/data/svcollege_traces_bridge.js?v=svcollege-bridge-v1",
  "/data/svcollege_traces_lesson11_activity.js?v=lesson11-activity-v1",
  "/data/svcollege_traces_lesson12_activity.js?v=lesson12-activity-v1",
  "/data/svcollege_traces_lesson13_activity.js?v=lesson13-activity-v2",
  "/data/svcollege_traces_foundation_tooling_activity.js?v=foundation-tooling-activity-v1",
  "/data/svcollege_traces_lesson15_activity.js?v=lesson15-activity-v1",
  "/data/svcollege_traces_lesson16_activity.js?v=lesson16-activity-v1",
  "/data/svcollege_traces_lesson17_activity.js?v=lesson17-activity-v1",
  "/data/questions_bug.js",
  "/data/svcollege_questions_bridge.js",
  "/data/svcollege_questions_bridge.js?v=svcollege-bridge-v1",
  "/data/questions_build.js",
  "/data/svcollege_builds_sql_orm.js",
  "/data/svcollege_builds_sql_orm.js?v=svcollege-sql-orm-v1",
  "/data/svcollege_builds_auth.js",
  "/data/svcollege_builds_auth.js?v=svcollege-auth-v1",
  "/data/svcollege_builds_nextjs.js",
  "/data/svcollege_builds_nextjs.js?v=svcollege-nextjs-v1",
  "/data/svcollege_builds_nestjs.js",
  "/data/svcollege_builds_nestjs.js?v=svcollege-nestjs-v1",
  "/data/svcollege_builds_devops.js",
  "/data/svcollege_builds_devops.js?v=svcollege-devops-v1",
  "/data/svcollege_builds_ai_engineering.js",
  "/data/svcollege_builds_ai_engineering.js?v=svcollege-ai-engineering-v1",
  "/data/svcollege_builds_design_systems.js",
  "/data/svcollege_builds_design_systems.js?v=svcollege-design-systems-v1",
  "/data/svcollege_builds_bridge.js",
  "/data/svcollege_builds_bridge.js?v=svcollege-bridge-v1",
  "/data/lesson_quiz_keys.js",
  "/data/level100_release_gates.js?v=level100-gate-v1",
  "/data/animations.js",
  "/data/what_if.js",
  "/data/concept_comics.js",
  "/data/stage_zero.js",
  "/data/memory_palaces.js",
  "/data/problem_first.js",
  "/data/concept_videos.js",
  "/data/option_feedback.js",
  "/data/quick_guide.js",
  "/data/interview_prep.js?v=interview-prep-v1",
  "/data/grandma_knowledge.js",
  "/data/grandma_visuals.js",
  "/data/code_blocks.js",
  "/data/svcollege_code_blocks.js",
  "/data/svcollege_code_blocks.js?v=svcollege-code-blocks-v1",
  "/data/glossary.js",
  "/data/concise_definitions.js",
  "/data/glossary.js?v=track-d-v2",
  "/data/concise_definitions.js?v=concise-v1",
  "/data/anti_patterns.js",
  "/data/mnemonics.js",
  "/data/flashcards.js",
  "/data/war_stories.js",
  "/data/comparisons.js",
  "/data/prerequisites.js",
  "/data/capstones.js",
  "/data/capstones.js?v=capstones-v2",
  "/data/guided_builds.js?v=guided-builds-v1",
  "/data/course_blueprints.js",
  "/data/course_blueprints.js?v=svcollege-only-v1",
  "/data/svcollege_prerequisites_sql_orm.js",
  "/data/svcollege_prerequisites_sql_orm.js?v=svcollege-sql-orm-v1",
  "/data/svcollege_prerequisites_auth.js",
  "/data/svcollege_prerequisites_auth.js?v=svcollege-auth-v1",
  "/data/svcollege_prerequisites_nextjs.js",
  "/data/svcollege_prerequisites_nextjs.js?v=svcollege-nextjs-v1",
  "/data/svcollege_prerequisites_nestjs.js",
  "/data/svcollege_prerequisites_nestjs.js?v=svcollege-nestjs-v1",
  "/data/svcollege_prerequisites_devops.js",
  "/data/svcollege_prerequisites_devops.js?v=svcollege-devops-v1",
  "/data/svcollege_prerequisites_ai_engineering.js",
  "/data/svcollege_prerequisites_ai_engineering.js?v=svcollege-ai-engineering-v1",
  "/data/svcollege_prerequisites_design_systems.js",
  "/data/svcollege_prerequisites_design_systems.js?v=svcollege-design-systems-v1",
  "/data/metaphors.js",
  "/data/pathways.js",
  "/data/scenarios.js",
  "/data/counterfactuals.js",
  "/data/pair_match.js",
  "/data/bug_quests.js",
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
  "/data/lesson_sql_orm.js?v=svcollege-sql-orm-v1",
  "/data/lesson_auth_security.js",
  "/data/lesson_auth_security.js?v=svcollege-auth-v1",
  "/data/lesson_nextjs.js",
  "/data/lesson_nextjs.js?v=svcollege-nextjs-v1",
  "/data/lesson_nestjs.js",
  "/data/lesson_nestjs.js?v=svcollege-nestjs-v1",
  "/data/lesson_devops_deploy.js",
  "/data/lesson_devops_deploy.js?v=svcollege-devops-v1",
  "/data/lesson_ai_engineering.js",
  "/data/lesson_ai_engineering.js?v=svcollege-ai-engineering-v1",
  "/data/lesson_design_systems.js",
  "/data/lesson_design_systems.js?v=svcollege-design-systems-v1",
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

function isVersionedCodeAsset(url) {
  return url.searchParams.has("v") && (url.pathname.endsWith(".js") || url.pathname.endsWith(".css"));
}

function networkFirstVersionedAsset(request) {
  return fetch(new Request(request, { cache: "reload" }))
    .then((res) => {
      if (res.ok) {
        const clone = res.clone();
        caches.open(STATIC_CACHE).then((cache) => cache.put(request, clone)).catch(() => {});
      }
      return res;
    })
    .catch(() => caches.match(request));
}

// Fetch — network-first for HTML/versioned code assets, cache-first for stable static assets.
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

  if (isVersionedCodeAsset(url)) {
    event.respondWith(networkFirstVersionedAsset(request));
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((res) => {
          // Optionally cache same-origin GET requests for repeat offline study.
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
