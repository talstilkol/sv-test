// data/lesson_devops_deploy.js
// SVCollege Finish Line 1 - DevOps, deploy, Docker and CI/CD bridge lesson.

var LESSON_DEVOPS_DEPLOY = {
  id: "lesson_devops_deploy",
  title: "DevOps Foundations - Vercel, Docker, CI/CD ו-Testing",
  description:
    "איך מעבירים אפליקציית Full Stack ממחשב אישי לסביבה שאפשר לבנות, לבדוק, לפרוס ולתחזק.",
  svcollegeModule: "תשתיות, DevOps ו-CI/CD - Vercel, Docker, Docker Compose, testing",
  sourceAssets: ["React_Architect_Blueprint.pdf"],
  sourceCoverageNote:
    "React Architect Blueprint נותן בסיס testing/architecture. מקור DevOps ייעודי הוא unknown/unavailable, לכן זהו bridge עצמאי שמכסה deploy, Docker ו-CI/CD.",
  concepts: [
    {
      conceptName: "production readiness",
      difficulty: 5,
      simpleExplanation:
        "production readiness היא בדיקה שהאפליקציה לא רק רצה אצלך, אלא מוכנה למשתמשים אמיתיים: build, env, errors, logs, security ו-smoke.",
      levels: {
        grandma:
          "production readiness זה לבדוק שהמסעדה באמת מוכנה לפתוח: יש מצרכים, צוות, חשמל, ניקיון, רישיון. לא מספיק שהבעלים הכין מתכון יפה בבית.",
        child:
          "כמו לבדוק שהתיק שלך מוכן ליום הראשון בכיתה: ספרים, עפרון, אוכל, מים. לא מספיק שיש תיק — צריך שיהיה הכל מוכן.",
        soldier:
          "production readiness checklist: build passes, tests green, env vars set, migrations applied, rollback plan, monitoring on, error tracking, performance baseline.",
        student:
          "Production readiness covers: 1) Build artifact integrity. 2) Configuration management (env-per-stage). 3) Observability (logs, metrics, traces). 4) Reliability (health checks, retries, circuit breakers). 5) Security (HTTPS, secrets vault, CSP). 6) Operational (runbooks, on-call, alerts).",
        junior:
          "Real-world checklist: 1) load test לקבולת. 2) DB pooling configured. 3) Static asset CDN + cache. 4) Sentry/DataDog setup לpre-launch. 5) Blue-green or canary deployment plan. 6) Backup automation. 7) Incident response: who's on-call, escalation path. 8) GDPR/privacy compliance.",
        professor:
          "Production readiness embodies the Operational Excellence pillar (AWS Well-Architected Framework). It requires assessing reliability (failure modes, MTBF, MTTR), security (threat model, defense in depth), performance (capacity planning, autoscaling), and cost (FinOps). The Production Readiness Review (PRR) at Google Site Reliability Engineering formalizes this with quantitative SLIs/SLOs.",
      },
      whyFullStack:
        "Full Stack אמיתי לא נגמר ב-localhost. צריך לדעת שהלקוח, השרת והנתונים עובדים גם אחרי deploy.",
      codeExample:
        "npm run build\nnpm test -- --run\nnpm run validate:strict",
      codeExplanation:
        "לפני deploy מריצים build, tests ו-validation כדי לתפוס בעיות לפני שהן מגיעות למשתמשים.",
      commonMistake:
        "לחשוב ש-dev server עובד שווה production עובד. production מפעיל build, env ו-cache בצורה אחרת.",
      prerequisite: "lesson_tooling_git::npm scripts",
    },
    {
      conceptName: "environment variables",
      difficulty: 5,
      simpleExplanation:
        "environment variables הם ערכי תצורה שמגיעים מהסביבה, למשל URL של database או מפתח API, ולא נכתבים בקוד.",
      levels: {
        grandma:
          "environment variables זה כמו פתקים פרטיים: כתובות, סיסמאות, מפתחות — לא כותבים אותם בלוח של כל הכיתה. שמרים בצד.",
        child:
          "כמו ספריות בסוד: סיסמת ה-WiFi לא כתובה על קיר הסלון. env vars הם 'סודות' של האפליקציה — DB URL, API keys.",
        soldier:
          "env vars: process.env.X ב-Node, import.meta.env.VITE_X ב-Vite. .env file למקומי, מערכת deploy לproduction. ALWAYS .env ב-.gitignore. NEXT_PUBLIC_ prefix לexpose ללקוח (Next).",
        student:
          "12-factor app principle: store config in environment. Categories: secrets (API keys), endpoints (DB URL), feature flags, environment markers (NODE_ENV). Validation at startup (zod, envalid). dotenv loading order: .env.local > .env.development > .env.",
        junior:
          "מציאות: 1) Vault/AWS Secrets Manager לproduction secrets — לא Vercel UI לrotation בלי tooling. 2) NEXT_PUBLIC_ exposes לbrowser — אסור לסיסמאות. 3) שמור .env.example מסומן בעצים שמראה structure בלי secrets. 4) Env-typing: T3 stack pattern או zod schema. 5) rotate secrets קבוע. 6) different env per stage (dev/staging/prod).",
        professor:
          "Environment variables provide configuration externalization (12-factor methodology, Heroku 2011). The OS process environment is inherited by child processes, enabling configuration without recompilation. Secrets management evolves through layers: plaintext .env (low), encrypted at rest (.env.enc), orchestrator secrets (Kubernetes), dedicated vaults (HashiCorp Vault), with rotation, audit logs, and IAM integration.",
      },
      whyFullStack:
        "אותו קוד צריך לעבוד ב-local, preview ו-production עם ערכים שונים ובלי לחשוף secrets.",
      codeExample:
        "const databaseUrl = process.env.DATABASE_URL;",
      codeExplanation:
        "הקוד קורא את הערך מהסביבה. הערך עצמו מוגדר בכל סביבת deploy.",
      commonMistake:
        "לשמור secret בתוך קובץ JS או לדחוף .env פרטי ל-Git.",
      prerequisite: "lesson_auth_security::secure cookie",
    },
    {
      conceptName: "Vercel deploy",
      difficulty: 4,
      simpleExplanation:
        "Vercel deploy הוא פרסום אפליקציית frontend/Next דרך חיבור Git או CLI, עם build אוטומטי ו-preview לכל שינוי.",
      levels: {
        grandma:
          "Vercel deploy זה כמו לפתוח חנות באתר מסחר אלקטרוני: את מעלה תמונות מוצרים, והם דואגים לשרתים, לקופה ולמשלוח.",
        child:
          "כמו ליוטיוב — מעלה סרטון, והם דואגים לאיכות, להפצה, להמלצות. Vercel deploy מעלה את ה-Next ודואג לכל השאר.",
        soldier:
          "Vercel: git connect → automatic build on push → preview URL on PR → main = production. CLI: vercel deploy, vercel --prod. env vars per stage. Custom domains.",
        student:
          "Architecture: build artifact = static + serverless functions + edge functions. CDN distribution global. ISR + on-demand revalidation native. Image optimization service. Analytics, Speed Insights בolt-on. Pricing: per-execution + bandwidth + build minutes.",
        junior:
          "מציאות: 1) free tier לdev אבל עלויות bandwidth מצטברות מהר. 2) Cold starts על serverless functions. Edge runtime מהיר. 3) Build minutes — Turborepo cache עוזר. 4) preview deployments לpush — עלות שמרנית. 5) Self-host: Vercel build output → Docker container — Next standalone mode. 6) Lockin הוא middling — ניתן לעבור.",
        professor:
          "Vercel exemplifies the Jamstack-evolved deployment model with first-class Next.js integration. The platform abstracts CDN distribution, function execution, and image optimization under unified deployment. Multi-region serverless execution introduces latency considerations (Edge runtime mitigates). Vendor-specific features (ISR, on-demand revalidation) embed framework hooks; portability requires self-hosting via standalone output.",
      },
      whyFullStack:
        "SVCollege דורש להבין איך קוד הופך לכתובת שעובדת מחוץ למחשב שלך.",
      codeExample:
        "git push origin main\n# Vercel מזהה שינוי, מריץ build ויוצר deployment",
      codeExplanation:
        "ה-deploy מחובר ל-Git ולכן כל push יכול לפתוח build ו-preview.",
      commonMistake:
        "להניח ש-env vars קיימים ב-Vercel כי הם קיימים אצלך ב-local.",
      prerequisite: "lesson_tooling_git::GitHub workflow",
    },
    {
      conceptName: "preview deployment",
      difficulty: 4,
      simpleExplanation:
        "preview deployment הוא deploy זמני ל-branch או PR, כדי לבדוק שינוי לפני production.",
      levels: {
        grandma:
          "preview deployment זה כמו טעימה לפני שמגישים מנה לכולם: הטבח טועם, מתקן, ורק אחרי שהכל בסדר — מגיש.",
        child:
          "כמו לבדוק קישוט בפורים בבית לפני שעולים על הבמה. אתה רואה איך זה נראה — מתקן — ואז ההצגה. preview = ניסיון לפני production.",
        soldier:
          "preview = unique URL per PR/branch. עם env vars נפרדים (preview-specific). למשתפים peer review, designers, QA. Vercel/Netlify autogenerate. Supabase branches מספקים DB-per-preview.",
        student:
          "Preview deploy enables pre-merge testing in production-like environment. Differences from production: env vars, DB instances, sometimes feature flags. Use cases: visual review, stakeholder approval, integration testing, smoke tests on real infra. Combined with CI checks → required for merge.",
        junior:
          "מהשטח: 1) preview-specific env (DEV DB), אסור לפנות לproduction DB. 2) auth: protect preview with password לפרויקטים פרטיים. 3) Stale previews: cleanup automated אחר X days. 4) Preview migration אופציה — Supabase branching, PlanetScale branching. 5) E2E עם Playwright על preview URL → solid signal.",
        professor:
          "Preview deployments instantiate ephemeral environments per PR/branch, supporting trunk-based development with continuous integration verification. The pattern parallels Heroku Review Apps and GitHub's deployment environments. Resource management (cleanup, cost) becomes a CI/CD concern. Coupled with infrastructure-as-code (Terraform, Pulumi) preview can extend to full backend stacks.",
      },
      whyFullStack:
        "הוא מאפשר לראות UI, API ונתונים בסביבה דומה יותר למציאות לפני merge.",
      codeExample:
        "branch -> pull request -> preview URL -> review -> merge",
      codeExplanation:
        "במקום לבדוק רק מקומית, ה-PR מקבל כתובת בדיקה.",
      commonMistake:
        "לדלג על preview ולמזג שינוי שלא נבדק בדפדפן אמיתי.",
      prerequisite: "lesson_tooling_git::pull request",
    },
    {
      conceptName: "build command",
      difficulty: 4,
      simpleExplanation:
        "build command היא הפקודה שמייצרת גרסת production מהקוד, בדרך כלל npm run build.",
      levels: {
        grandma:
          "build command זה כמו אריזת המתנה לפני שליחה: סוגרים, מסמנים, חותמים. הקוד עובר אריזה לפני שיוצא לעולם.",
        child:
          "כמו להכין כריך לפני שיוצאים מהבית: חותכים, מורחים, עוטפים בנייר. build לוקח את הקוד ומכין אותו לאריזה.",
        soldier:
          "build command: npm run build. defined ב-package.json scripts. typical: vite build, next build, tsc. output: dist/, build/, .next/. minified, bundled, optimized JS/CSS/HTML.",
        student:
          "Build pipeline: 1) Type check (tsc --noEmit). 2) Lint (eslint). 3) Bundle (Vite/Webpack/esbuild/SWC). 4) Tree-shake (remove unused). 5) Code-split (lazy chunks). 6) Minify (Terser, esbuild). 7) Asset optimization (images, fonts). 8) Source maps (production: sourcemap-only-server).",
        junior:
          "Production build pitfalls: 1) prod build ≠ dev — dynamic imports, env vars, NODE_ENV behave differently. 2) bundle size growth — analyze (vite-bundle-visualizer). 3) Build cache — Turborepo, Nx, Vercel Remote Cache. 4) Source maps — upload to Sentry בBuild step, never expose to public. 5) build time creep — measure, optimize, parallelize.",
        professor:
          "The build process transforms source code through multiple compilation stages: lexing, parsing, type-checking, transpilation, bundling, optimization, code generation. Modern bundlers (Vite, Turbopack, Rspack) leverage native compilation (Rust, Go) for performance. Tree-shaking requires ES module statics; circular imports and side effects defeat it. Determinism is critical for reproducible builds and supply-chain security.",
      },
      whyFullStack:
        "אם build נכשל, deploy אמור להיעצר. זה שער בסיסי לפני production.",
      codeExample:
        "\"scripts\": { \"build\": \"vite build\", \"test\": \"vitest run\" }",
      codeExplanation:
        "package.json מגדיר פקודות קבועות שכל מפתח ו-CI יכולים להריץ.",
      commonMistake:
        "להסתפק ב-npm run dev, שלא בודק production bundle.",
      prerequisite: "lesson_tooling_git::npm scripts",
    },
    {
      conceptName: "Docker",
      difficulty: 6,
      simpleExplanation:
        "Docker אורז אפליקציה עם סביבת ההרצה שלה לתוך image שממנו מריצים container.",
      levels: {
        grandma:
          "Docker זה כמו מכולת ימית: הכול ארוז בתוך קופסה תקנית — אוכל, חמרים, רהיטים. לא משנה לאיזו ספינה, נמל או מחסן הקופסה תגיע — היא תיכנס ותעבוד.",
        child:
          "כמו לקחת את החדר שלך ולשים בארגז: כל הצעצועים, המיטה, הספרים, התאורה. אז להעביר את הארגז למקום אחר — וכשפותחים, הכל באותה צורה. אפליקציה בארגז.",
        soldier:
          "Docker = container runtime. image = read-only template. container = running instance. CLI: docker build, run, ps, logs, exec. namespaces + cgroups (Linux) למיידוד. registry (Docker Hub, ECR) לאחסון images.",
        student:
          "OCI standard: image format + runtime (runc). Layers: each Dockerfile instruction = layer, cached. Networking: bridge, host, overlay. Storage: volumes, bind mounts, tmpfs. Security: rootless, capabilities, seccomp profiles. Compose for multi-container, Kubernetes לproduction orchestration.",
        junior:
          "Real life: 1) Multi-stage builds — בוילד עם node:full, runtime עם node:alpine + רק dist/. 2) .dockerignore בליל — node_modules, .git. 3) USER non-root לsecurity. 4) HEALTHCHECK directive. 5) Image size — distroless or alpine, watch dependencies. 6) Vulnerability scan: docker scan, Trivy, Snyk.",
        professor:
          "Containers leverage Linux kernel features (namespaces for isolation, cgroups for resource limits, capabilities for privilege subsetting) to provide OS-level virtualization. Unlike VMs, containers share the host kernel but isolate userspace. The OCI spec standardizes image format and runtime; alternative implementations (Podman, containerd, CRI-O) compete with Docker. Image-as-data enables reproducibility, immutability, and supply-chain considerations.",
      },
      whyFullStack:
        "הוא מקטין פערים בין מחשבים וסביבות: אותה אפליקציה רצה באותה צורה יחסית.",
      codeExample:
        "docker build -t lumen-api .\ndocker run -p 3000:3000 lumen-api",
      codeExplanation:
        "build יוצר image, ו-run מפעיל ממנו container עם port חשוף.",
      commonMistake:
        "לחשוב ש-Docker הוא virtual machine מלא. Container משתף kernel אבל מבודד process/files/network.",
      prerequisite: "lesson_16::Node.js",
    },
    {
      conceptName: "Dockerfile",
      difficulty: 6,
      simpleExplanation:
        "Dockerfile הוא מתכון שמגדיר איך לבנות image: base image, העתקת קבצים, התקנת dependencies ו-command.",
      levels: {
        grandma:
          "Dockerfile זה כמו מתכון מסודר במחברת: שלב 1 — קח קמח. שלב 2 — תוסיף ביצים. שלב 3 — אפה. כל אחד שיעקוב יקבל אותה עוגה.",
        child:
          "כמו להוראות בנייה של לגו: קודם בסיס, אז קומה ראשונה, אז קומה שנייה. כל דף בהוראות = שלב. Dockerfile הוא הוראות בנייה של ה-container.",
        soldier:
          "Dockerfile = text file. Instructions: FROM (base), WORKDIR, COPY, RUN (build commands), ENV, EXPOSE (doc only), CMD (default command), ENTRYPOINT. נבנה בפקודה: docker build -t name:tag .",
        student:
          "Layer caching: each instruction creates a layer; identical layers reused. Order matters: rarely-changing first (FROM, deps install), frequently-changing last (COPY app code). Multi-stage: FROM AS builder + FROM AS runtime — copy only artifacts. ARG for build-time variables vs ENV for runtime.",
        junior:
          "Production Dockerfile: 1) Pin versions (node:22.4.1-alpine3.20, NOT :latest). 2) RUN apk add --no-cache (Alpine) + clean apt cache. 3) USER appuser — never root. 4) HEALTHCHECK פנימי. 5) Multi-stage תמיד — runtime image קטן. 6) Buildx לmulti-arch (amd64, arm64). 7) avoid COPY . . — תמיד .dockerignore.",
        professor:
          "Dockerfile syntax produces an OCI image via deterministic layer composition. Each layer is a content-addressed filesystem diff. The build process applies layers sequentially; cache invalidation is layer-by-layer. Multi-stage builds enable separation of build and runtime environments, reducing attack surface. BuildKit (modern builder) introduces parallel execution, secret mounts, and SBOM generation for supply-chain security.",
      },
      whyFullStack:
        "הוא הופך סביבת הרצה להוראות מפורשות במקום 'אצלי זה עובד'.",
      codeExample:
        "FROM node:22-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nCMD [\"npm\", \"start\"]",
      codeExplanation:
        "השכבות בונות image עם Node, dependencies, קוד ופקודת הפעלה.",
      commonMistake:
        "להעתיק את כל הפרויקט לפני npm ci ואז לשבור cache בכל שינוי קטן.",
      prerequisite: "lesson_devops_deploy::Docker",
    },
    {
      conceptName: "image",
      difficulty: 5,
      simpleExplanation:
        "image הוא snapshot בנוי של האפליקציה והסביבה, שממנו אפשר להריץ containers.",
      levels: {
        grandma:
          "image זה כמו תמונת DVD של סרט: כל פעם שמכניסים — אותו סרט. immutable — לא משתנה. את לא 'מקליטה' על ה-DVD, רק מנגנת ממנה.",
        child:
          "כמו תבנית בצק קפוא: כל פעם שמשתמשים — אותה צורה. במקום לכתוב מתכון מאפס, יש כבר תבנית מוכנה.",
        soldier:
          "image = read-only template. נוצר מ-Dockerfile (build) או pull מ-registry. Tagged: name:tag (latest default). Layers: stacked, cached, deduplicated. ID: sha256 hash content-addressed.",
        student:
          "Image structure: manifest (JSON metadata) + layers (tar archives). Distribution via registry: Docker Hub, ECR, GCR, GHCR. Pull = fetch missing layers. Push = upload new layers. Registry V2 protocol. Signed images: Docker Content Trust, Cosign. Vulnerability scans: Trivy, Snyk, Docker Scout.",
        junior:
          "Real production: 1) tag semantically: api:1.2.3, NEVER :latest in prod. 2) Image registry private (ECR) > Docker Hub. 3) Pull-through cache לקיצור deploy time. 4) Image promotion: build once, retag (dev → staging → prod). 5) Vulnerability gate בpull. 6) Cosign signatures. 7) Layer dedup save bandwidth — base image shared.",
        professor:
          "Container images are immutable, content-addressed artifacts. The OCI Image Specification defines the manifest format and layer composition. Image identity via cryptographic hashing enables verification, supply-chain attestation (in-toto, SLSA framework), and reproducible builds. Distribution leverages HTTP and content-addressed storage, with deduplication at the layer granularity reducing transfer cost.",
      },
      whyFullStack:
        "Image נותן artifact ברור: זה מה שבדקנו וזה מה שמריצים.",
      codeExample:
        "docker images\nlumen-api:latest",
      codeExplanation:
        "ה-image נשמר בשם ו-tag כדי שאפשר יהיה להריץ או לפרסם אותו.",
      commonMistake:
        "לבלבל בין image לבין container. image הוא התבנית; container הוא תהליך שרץ ממנה.",
      prerequisite: "lesson_devops_deploy::Dockerfile",
    },
    {
      conceptName: "container",
      difficulty: 5,
      simpleExplanation:
        "container הוא process שרץ מתוך image עם filesystem, network ו-env מבודדים יחסית.",
      levels: {
        grandma:
          "container זה כמו השכרת חדר במלון: יש מיטה, מקלחת, מטבחון. כל דייר עם החדר שלו. הם חולקים את אותו בניין (kernel) — אבל לא מתערבבים.",
        child:
          "כמו תיבות פלסטיק במשחק: כל אחד עם הצעצועים שלו, סגור. אחיך בתיבה אחרת. אבל שניכם בסלון. container = תיבה של אפליקציה.",
        soldier:
          "container = running instance of image. CLI: docker run, ps, stop, rm. lifecycle: created → running → paused → stopped → removed. logs ב-stdout/stderr — docker logs. exec לeneter shell.",
        student:
          "Container isolation via Linux namespaces: PID, network, mount, UTS, IPC, user. cgroups limit CPU/memory/IO. Capabilities drop privileges. The container = process tree + isolated filesystem (overlay) + network namespace + cgroups. Compared to VMs: faster start (ms), smaller (no kernel), shared kernel (security trade-off).",
        junior:
          "Production: 1) Restart policies (always, on-failure). 2) Logs aggregation: stdout → fluentd/Loki. 3) Resource limits: --memory, --cpus — prevent runaway. 4) Read-only root filesystem (--read-only) + tmpfs for writable. 5) Liveness/readiness probes ב-Kubernetes. 6) Don't store state בcontainer — ephemeral by design.",
        professor:
          "Containers are isolated processes with private namespaces and constrained resources. The Linux kernel provides primitives (namespaces, cgroups, capabilities, seccomp); container runtimes (runc, crun) compose them. The container abstraction enables process-level isolation with VM-like portability. Security boundary is weaker than VM (shared kernel) — gVisor, Kata Containers, Firecracker provide stronger isolation via lightweight VMs.",
      },
      whyFullStack:
        "כך אפשר להריץ backend, database או worker באותה צורה בסביבות שונות.",
      codeExample:
        "docker ps\nCONTAINER ID   IMAGE       PORTS",
      codeExplanation:
        "docker ps מציג containers שרצים עכשיו.",
      commonMistake:
        "לשמור מידע חשוב בתוך container בלי volume או database חיצוני.",
      prerequisite: "lesson_devops_deploy::image",
    },
    {
      conceptName: "Docker Compose",
      difficulty: 6,
      simpleExplanation:
        "Docker Compose מריץ כמה services יחד לפי קובץ compose, למשל app + database.",
      levels: {
        grandma:
          "Docker Compose זה כמו תזמורת: יש כינור, חליל, תופים — כולם מנגנים יחד לפי תווים אחדים. compose מצמיד את כל ה-services לאופרה אחת.",
        child:
          "כמו לסדר את הצוות לפני משחק כדורגל: שוער, מגנים, חלוצים. כל אחד יודע מה לעשות. Compose מסדר את כולם בקובץ אחד.",
        soldier:
          "compose.yaml: services, networks, volumes. CLI: docker compose up, down, logs, ps. Services connect by name (service-to-service DNS). volumes לpersistence. depends_on לסדר.",
        student:
          "Compose v2 (Go-based, integrated). Service definition: image OR build, ports, env, volumes, networks, depends_on (with healthcheck), restart, deploy. Override files: compose.override.yaml, compose.prod.yaml. Profiles לconditional services. Variables: ${VAR} substitution.",
        junior:
          "Real-world: 1) Dev: app + DB + Redis בcompose. 2) prod: Kubernetes/ECS, NOT compose. 3) depends_on: condition: service_healthy חיוני. 4) volumes נכונים: postgres data persists. 5) .env file integration. 6) compose -f file.yaml -f override.yaml — layered config. 7) Network policies: internal communication, expose only frontend.",
        professor:
          "Docker Compose orchestrates multi-container applications via declarative YAML, automating the run-time wiring of containers (networks, volumes, dependencies). It serves the development and small-scale deployment use case; for production at scale, Kubernetes and similar orchestrators provide essential features (autoscaling, self-healing, declarative state reconciliation, multi-host networking) absent from Compose.",
      },
      whyFullStack:
        "Full Stack כולל כמה תהליכים. Compose נותן דרך אחת להרים אותם יחד ל-dev או integration.",
      codeExample:
        "services:\n  api:\n    build: .\n  db:\n    image: postgres:16",
      codeExplanation:
        "compose מגדיר services, images/build, ports, env ו-volumes.",
      commonMistake:
        "לחשוב ש-compose הוא production orchestrator מלא. הוא בעיקר נוח ל-dev וסביבות קטנות.",
      prerequisite: "lesson_devops_deploy::container",
    },
    {
      conceptName: "service",
      difficulty: 5,
      simpleExplanation:
        "ב-Compose, service הוא תהליך מוגדר כמו api, web או db עם image, ports, env ותלויות.",
      levels: {
        grandma:
          "service זה כמו פקיד בעירייה: מחלקת תושבים, מחלקת ילדים, מחלקת אגרות. כל פקיד עושה תפקיד אחד. ב-compose: api עושה API, db שומר נתונים.",
        child:
          "כמו חלקים במשחק: שחקן, חוקים, לוח. כל חלק עם השם שלו. ב-compose: api, db, redis — כל אחד service נפרד.",
        soldier:
          "service בcompose = container definition עם name. שדות: image (use existing) או build (Dockerfile path), ports (host:container), volumes, environment, networks, depends_on. תקשורת בין services: hostname = service name.",
        student:
          "Service composition: each service is independent unit. Service discovery via embedded DNS — http://api:3000 (not localhost). Networks: default bridge per project, custom networks for isolation. Scaling: docker compose up --scale api=3 (limited; not full orchestration). Health checks: healthcheck directive for depends_on conditions.",
        junior:
          "פקטים מהשטח: 1) hostname = service name, NOT localhost. 2) ports שדה רק לexpose ל-host; service-to-service ב-internal port. 3) restart: unless-stopped לdev resilience. 4) command override default CMD. 5) Multiple environments: api-staging, api-prod separate services or different override files. 6) Don't share volumes between services unless intentional (race conditions).",
        professor:
          "Services in Compose abstract individual container roles within a logical application. The model parallels Kubernetes Pods/Services but at single-host scope. Service discovery uses Compose's embedded DNS, mapping names to dynamic IPs. Network namespaces provide isolation; user-defined networks enable controlled inter-service communication, mirroring service mesh concepts at smaller scale.",
      },
      whyFullStack:
        "השם service מאפשר לתהליכים לדבר אחד עם השני לפי שם פנימי, לא לפי localhost של המחשב.",
      codeExample:
        "services:\n  api:\n    depends_on: [db]\n  db:\n    image: postgres:16",
      codeExplanation:
        "api ו-db הם services; api יכול לפנות ל-db בשם db ברשת של compose.",
      commonMistake:
        "להשתמש ב-localhost מתוך container כדי להגיע ל-db שנמצא ב-container אחר.",
      prerequisite: "lesson_devops_deploy::Docker Compose",
    },
    {
      conceptName: "volume",
      difficulty: 5,
      simpleExplanation:
        "volume הוא אחסון שממשיך להתקיים מחוץ למחזור החיים של container.",
      levels: {
        grandma:
          "volume זה כמו ארון בקיבוץ — גם אם פתחו וסגרו את הצריף הרבה פעמים, הארון נשאר עם הבגדים שלך. container נמחק; volume נשאר.",
        child:
          "כמו דיסק קשיח חיצוני: גם אם המחשב נשבר ואת קונה חדש — הקבצים נשארים בדיסק. volume הוא הדיסק החיצוני של ה-container.",
        soldier:
          "volume = persistent storage. types: named volumes (docker managed), bind mounts (host path), tmpfs (memory). syntax: volumes: [name:/path] בservice + named volume בtop-level. data שורד container restart, recreate, remove.",
        student:
          "Volume types: 1) Named (docker volume create) — managed, portable. 2) Bind mount (./data:/path) — host filesystem direct. 3) tmpfs — RAM, ephemeral. Volume drivers: local (default), NFS, EFS, GCS, Azure Files. CSI standard ב-Kubernetes. Backup: docker run --rm -v vol:/data alpine tar.",
        junior:
          "Real-world: 1) DB data — ALWAYS named volume. 2) Bind mount לdev (live code reload). 3) Backup strategy: scheduled tar+upload. 4) volume permissions — UID/GID match בcontainer. 5) Don't bind-mount /var/run/docker.sock unless intentional (security risk). 6) PV/PVC ב-Kubernetes — same concept, distributed.",
        professor:
          "Volumes provide stateful storage decoupled from container lifecycle. Local volumes use the host filesystem; networked volumes (NFS, CSI) enable distributed storage. The volume driver abstraction supports pluggable backends. In production orchestration (Kubernetes), Persistent Volumes (PV) and Claims (PVC) generalize this with scheduling-aware storage classes, enabling data locality and replication policies.",
      },
      whyFullStack:
        "Database או קבצים חשובים לא צריכים להימחק בכל הפעלה מחדש של container.",
      codeExample:
        "volumes:\n  db_data:\n\nservices:\n  db:\n    volumes: [db_data:/var/lib/postgresql/data]",
      codeExplanation:
        "db_data מחזיק את נתוני Postgres מחוץ ל-container עצמו.",
      commonMistake:
        "להריץ database בלי volume ואז לאבד נתונים כשה-container נמחק.",
      prerequisite: "lesson_devops_deploy::service",
    },
    {
      conceptName: "health check",
      difficulty: 5,
      simpleExplanation:
        "health check הוא endpoint או פקודה שמוודאים שה-service חי ומוכן לקבל עבודה.",
      levels: {
        grandma:
          "health check זה כמו אחות שעוברת מחדר לחדר ושואלת 'מה שלומך?'. מי שלא עונה — שולחים רופא. שירות צריך להיות חי וערני, לא רק 'דלוק'.",
        child:
          "כמו מורה שקוראת בשמות: 'דנה — כאן? יוסי — כאן?'. אם מישהו לא עונה — בודקים. health check בודק שכל service עונה.",
        soldier:
          "health check: GET /health endpoint שמחזיר 200/JSON. Docker HEALTHCHECK directive. Kubernetes: liveness (alive?), readiness (ready for traffic?), startup (still booting?). Load balancer מסיר unhealthy.",
        student:
          "Three probe types: 1) Liveness — restart container if fail. 2) Readiness — remove from service if fail (still alive but not ready). 3) Startup — slow-starting apps, wait before liveness. Health endpoint: check critical deps (DB, cache). Shallow vs Deep: shallow = process alive; deep = downstream too. Timeout, period, threshold tuning.",
        junior:
          "Real life: 1) /health = shallow. /ready = deep (DB ping). 2) Don't fail readiness on cache miss — bounce thrash. 3) Liveness should rarely fail — only true deadlock. 4) Slow startup → use startup probe (Kubernetes 1.16+). 5) Avoid expensive deep checks on every probe — cache health state. 6) Different DB connection pool for healthcheck — prevent exhaustion.",
        professor:
          "Health checks implement the failure-detection mechanism for orchestration systems. Liveness/readiness/startup probes provide orthogonal signals to the orchestrator's reconciliation loop. The state-machine model (probe → threshold → action) governs failure recovery. Proper probe design balances sensitivity (catch real failures) and specificity (avoid false positives during transient blips), aligning with control-loop feedback theory.",
      },
      whyFullStack:
        "שרת יכול להיות דלוק אבל לא מוכן. health check עוזר ל-CI, deploy ו-monitoring להבין מצב אמיתי.",
      codeExample:
        "app.get('/health', (req, res) => res.json({ ok: true }));",
      codeExplanation:
        "endpoint פשוט מחזיר שהשרת מגיב; בגרסה מתקדמת בודקים גם database ותלויות.",
      commonMistake:
        "להחזיר ok תמיד גם כשה-database נפל, ואז להסתיר תקלה אמיתית.",
      prerequisite: "lesson_17::Status Codes",
    },
    {
      conceptName: "CI",
      difficulty: 5,
      simpleExplanation:
        "CI הוא תהליך אוטומטי שרץ על כל push/PR ומריץ install, lint, tests, build ו-validation.",
      levels: {
        grandma:
          "CI זה כמו בקרת איכות במפעל: כל מוצר עובר בדיקות לפני שיוצא. אסור שמשהו פגום ייצא לחנויות. אם נכשל — מתקנים ולא מעבירים.",
        child:
          "כמו אמא שבודקת שיעורי בית לפני שאתה הולך לישון: 'הכל פתור? מסודר? נקי?'. רק אם הכל בסדר — הולכים לישון. CI בודק את הקוד אוטומטית.",
        soldier:
          "CI = Continuous Integration. רץ על כל push/PR ב-GitHub Actions, GitLab CI, CircleCI. שלבים: install deps, lint, type-check, test, build. fail fast → block merge.",
        student:
          "CI principles: 1) trunk-based — frequent integration. 2) automated everything (no manual). 3) fast feedback (< 10 min ideal). 4) reproducible (no shared state). 5) deterministic (no flakes). Workflow files: .github/workflows/*.yml. matrix builds (multiple Node versions, OSes). Caching (npm, build).",
        junior:
          "Real-world setup: 1) Cache: actions/cache לnode_modules, build artifacts. 2) Concurrency: cancel-in-progress on same branch. 3) Matrix: test on Node 18+20+22, Linux+macOS+Windows. 4) Required checks ב-branch protection. 5) Secrets: GitHub Secrets, never inline. 6) Parallel jobs lint+test+build → faster total. 7) Sentry release on success.",
        professor:
          "Continuous Integration (Beck, Fowler 2000s) inverts the traditional integrate-late approach: integrate continuously, automate verification. It enables small batches, faster feedback, and reduced merge complexity. CI systems implement event-driven workflows over the source control graph; YAML-as-config (GitHub Actions, GitLab CI) trades expressiveness for declarative simplicity. Build performance and determinism remain ongoing concerns.",
      },
      whyFullStack:
        "CI מונע מצב שבו שינוי ששבר build או בדיקות נכנס ל-main.",
      codeExample:
        "on: [push, pull_request]\njobs:\n  validate:\n    steps:\n      - run: npm ci\n      - run: npm test -- --run\n      - run: npm run build",
      codeExplanation:
        "GitHub Actions מריץ סדר פעולות קבוע כדי לאמת את הקוד.",
      commonMistake:
        "להריץ CI רק אחרי merge במקום לפני merge.",
      prerequisite: "lesson_tooling_git::GitHub workflow",
    },
    {
      conceptName: "CD",
      difficulty: 5,
      simpleExplanation:
        "CD הוא תהליך שמפרסם גרסה אחרי שהבדיקות עוברות, בדרך כלל ל-preview או production לפי branch.",
      levels: {
        grandma:
          "CD זה כמו שירות משלוחים: ברגע שהמוצר עבר בקרת איכות, הוא נארז ונשלח אוטומטית. אין מי שצריך לזכור 'אה, צריך לשלוח'.",
        child:
          "כמו רובוט שלוקח את העוגה מהתנור ושם בקופסה ושולח: כל שלב אוטומטי. אתה רק אופה — השאר נעשה לבד.",
        soldier:
          "CD = Continuous Delivery (deploy with manual approval) או Continuous Deployment (auto-deploy on green). main green → deploy. tools: Vercel native, GitHub Actions deploy step, ArgoCD ל-Kubernetes.",
        student:
          "Delivery vs Deployment: Delivery — deployable artifact, manual go. Deployment — auto. Strategies: blue-green (two prod envs, switch), canary (gradual %), rolling (replace instances), feature flags (deploy ≠ release). Rollback: instant via traffic switch (blue-green) or redeploy previous version.",
        junior:
          "Production CD: 1) Promote-not-rebuild — same artifact through dev→staging→prod. 2) Database migrations: backwards-compatible deploy. 3) Smoke tests post-deploy. 4) Health checks gate cutover. 5) Rollback plan: how, when, by whom. 6) Feature flags decouple deploy from release. 7) GitOps (ArgoCD): declarative, Git as source of truth.",
        professor:
          "Continuous Delivery and Deployment (Humble, Farley) extend CI through the production boundary. Deployment strategies (blue-green, canary, rolling) trade resource cost vs risk. Progressive delivery (LaunchDarkly, Split) decouples release from deploy via feature flags. GitOps (Weaveworks) inverts the push model: cluster pulls desired state from Git. The DORA metrics (deploy frequency, lead time, MTTR, change failure rate) quantify CD maturity.",
      },
      whyFullStack:
        "הוא מחבר quality gates ל-deploy כך שהמערכת לא תלויה בזיכרון ידני של מפתח.",
      codeExample:
        "main branch -> CI green -> production deploy",
      codeExplanation:
        "הכלל אומר שרק main שעבר בדיקות יכול להגיע ל-production.",
      commonMistake:
        "לפרוס ידנית בלי קשר לתוצאות CI.",
      prerequisite: "lesson_devops_deploy::CI",
    },
    {
      conceptName: "smoke test",
      difficulty: 4,
      simpleExplanation:
        "smoke test הוא בדיקה קצרה שמוודאת שהמסכים/זרימות הקריטיות נפתחים בלי שגיאת runtime.",
      levels: {
        grandma:
          "smoke test זה כמו לבדוק שהמטבח עובד אחרי תחזוקה: דולקים את הגז, פותחים את הברז, מדליקים את התנור. לא בודקים מתכון מסובך — רק שהבסיס עובד.",
        child:
          "כמו לבדוק שהאופניים שלך תקינים לפני יציאה: גלגלים מתגלגלים? בלמים עובדים? מספיק. לא בודקים את כל הפרטים — רק שיוצאים.",
        soldier:
          "smoke test = quick sanity check. דוגמאות: homepage loads, login form submits, /health returns 200, key API returns data. רץ אחרי deploy. מהיר (< 1 min). פשוט. fail fast.",
        student:
          "Smoke testing levels: 1) build smoke — does build succeed. 2) runtime smoke — app starts. 3) endpoint smoke — health/critical APIs respond. 4) UI smoke — Playwright/Cypress קצרים. Gate after deploy → block traffic on failure. Different from full E2E suite (longer, deeper).",
        junior:
          "Practical: 1) post-deploy smoke בCD pipeline. 2) Synthetic monitoring: scheduled smoke כל 5 דקות (Datadog Synthetics, Checkly). 3) Smoke vs E2E: smoke = critical path only. E2E = full coverage. 4) Don't skip smoke even with great unit tests — env-specific issues. 5) Specific: home, login, dashboard, API health. 6) Slack alert on smoke fail.",
        professor:
          "Smoke testing (origin: hardware—turn it on, see if smoke comes out) is shallow but broad verification. In CI/CD pipelines it serves as a deployment gate, complementing deeper test suites. The risk vs coverage trade-off: smoke catches catastrophic failures (broken builds, missing config) at minimal cost; deeper testing catches subtle regressions at higher cost. Optimal placement: post-deploy, pre-traffic-cutover.",
      },
      whyFullStack:
        "גם אם unit tests עוברים, משתמש עדיין יכול לפגוש מסך לבן. smoke test בודק את האפליקציה מבחוץ.",
      codeExample:
        "open / -> assert title\nopen /login -> assert form\nopen /health -> assert ok",
      codeExplanation:
        "בודקים מעט דברים קריטיים, מהר, אחרי build או deploy.",
      commonMistake:
        "לקרוא ל-smoke test בדיקה מלאה. הוא שער מהיר, לא תחליף ל-E2E עמוק.",
      prerequisite: "react_blueprint::Testing Strategies",
    },
    {
      conceptName: "release checklist",
      difficulty: 4,
      simpleExplanation:
        "release checklist היא רשימת Go/No-Go לפני גרסה: tests, build, env, migrations, rollback ו-smoke.",
      levels: {
        grandma:
          "release checklist זה כמו רשימת קניות לפני סופ\"ש: אסור לסמוך על זיכרון. כותבים, סומנים, לא שוכחים שום דבר חיוני.",
        child:
          "כמו רשימה לפני טיול: דרכון, בגדים, תרופות, מטען. אם לא כתוב — תשכח משהו. checklist בטוח שכלום לא נשכח.",
        soldier:
          "release checklist sample: [ ] CI green. [ ] tests pass. [ ] env vars set. [ ] migrations reviewed. [ ] backups confirmed. [ ] rollback plan known. [ ] smoke tests run. [ ] on-call notified. [ ] feature flags configured. [ ] monitoring dashboards open.",
        student:
          "Release readiness covers: 1) Code (tests, lint, type-check, build). 2) Data (migrations, backups, data integrity). 3) Config (env, secrets, feature flags). 4) Operations (rollback, monitoring, alerts, runbooks). 5) Stakeholders (notifications, communications). 6) Post-deploy verification (smoke, business metrics).",
        junior:
          "כללים מהשטח: 1) Don't deploy on Friday afternoon. 2) Don't deploy if on-call rotation unstaffed. 3) Have rollback decision criteria pre-agreed. 4) Migrations: backwards-compat, no DROP בdeploy אחד. 5) Feature flag → controlled rollout. 6) DB backup לפני migration. 7) communicate scope: Slack #releases. 8) Post-deploy: 30min watch dashboards.",
        professor:
          "Release checklists embody the operational discipline of Site Reliability Engineering. They formalize tacit knowledge into explicit Go/No-Go criteria, reducing cognitive load and human error. The checklist serves as a control mechanism per Ramsis Rasmussen's safety theory; failures often trace to skipped or misunderstood items. Modern practice integrates automation (release readiness validators) reducing manual checklists to manageable surface.",
      },
      whyFullStack:
        "Checklist מונע פרסום גרסה מתוך לחץ בלי לוודא את הדברים שידועים כשוברים production.",
      codeExample:
        "Go only if: CI green, env configured, migrations reviewed, smoke passed, rollback known.",
      codeExplanation:
        "ה-checklist מתרגם ניסיון תפעולי לשער קבוע לפני release.",
      commonMistake:
        "לסמוך על זיכרון במקום checklist כתוב.",
      prerequisite: "lesson_devops_deploy::production readiness",
    },
  ],
};

if (typeof window !== "undefined") {
  window.LESSON_DEVOPS_DEPLOY = LESSON_DEVOPS_DEPLOY;
}

if (typeof module !== "undefined") {
  module.exports = { LESSON_DEVOPS_DEPLOY: LESSON_DEVOPS_DEPLOY };
}
