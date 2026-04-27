// data/lesson29.js — שיעור 29: Vercel + Docker
// DevOps. מבחן: 5-7 שאלות צפויות.
var LESSON_29 = {
  id: "lesson_29",
  title: "שיעור 29 — Vercel + Docker — Deployment ותשתית",
  description:
    "Vercel ל-frontend deployment, Docker למיכלי הפעלה, env variables, CI/CD basics.",
  concepts: [
    {
      conceptName: "Vercel",
      difficulty: 4,
      levels: {
        grandma: "פלטפורמה שמעלה את האתר שלך לאינטרנט אוטומטית — מחברת ל-Git, וכל push פותר deploy.",
        child: "כמו לחבר את התיבה הקטנה שלך לרכבת — וב-2 דקות, היא מגיעה לכל העולם.",
        soldier: "Vercel = פלטפורמת deployment ל-Next.js, React, ועוד. Git integration. CDN גלובלי.",
        student: "Vercel = deployment platform by makers of Next.js. Auto-deploy on Git push. Edge Network. Serverless functions. Preview deployments per PR. Free tier generous.",
        junior: "פעם deployed ל-AWS עם 200 דקות setup (S3 + CloudFront + Lambda). עברתי ל-Vercel — git push, 2 דקות, באוויר. גם preview URL לכל PR — review קל.",
        professor: "Vercel built on AWS. Serverless functions ב-Lambda. CDN: edge caching globally. Optimizations: image optimization, font optimization, smart routing. Pricing: bandwidth + serverless invocations.",
      },
      illustration:
        "🚀 Vercel deploy:\n  git push → GitHub → Vercel webhook\n   → build (npm run build)\n   → upload to CDN\n   → live at *.vercel.app\n   → custom domain optional",
      codeExample:
        "# התקנה\nnpm i -g vercel\n\n# הפעלה ראשונה\nvercel        # interactive setup\n# → מחבר ל-GitHub repo\n# → preview URL: my-app-xxx.vercel.app\n\n# Production\nvercel --prod\n\n# Environment variables\nvercel env add DATABASE_URL\nvercel env add JWT_SECRET\n\n# vercel.json (optional config)\n{\n  \"buildCommand\": \"npm run build\",\n  \"outputDirectory\": \"dist\",\n  \"framework\": \"vite\",\n  \"redirects\": [\n    { \"source\": \"/old\", \"destination\": \"/new\", \"permanent\": true }\n  ]\n}",
      codeExplanation: "vercel CLI לdeployment ידני, או GitHub integration לאוטומטי. env vars דרך CLI/dashboard. vercel.json לconfig מתקדם.",
    },
    {
      conceptName: "preview deployment",
      difficulty: 4,
      levels: {
        grandma: "כל פעם שאתה דוחף branch — Vercel נותן URL זמני לראות את הגרסה לפני merge.",
        child: "כמו לקבל הצצה לעוגה לפני שמכריזים על האירוע.",
        soldier: "Preview deployment per Git branch / PR. URL ייחודי. סביבה זהה ל-production.",
        student: "Preview deployments: deployed automatically per branch + PR. Unique URL. Same env as prod (with preview env vars). Comments on PR with link.",
        junior: "פעם בודק שינוי = git pull, npm install, npm run dev. עכשיו: PR → URL preview ב-2 דקות. PM ו-designer בודקים בעצמם, אני ממשיך לעבוד.",
        professor: "Atomic deployments: each commit immutable URL. Production aliased to latest. Rollback = re-alias to old. Preview environments accelerate code review and stakeholder feedback.",
      },
      illustration:
        "🔍 Preview flow:\n  PR opened → Vercel deploys\n   → URL: my-app-pr-42.vercel.app\n   → comment on PR with link\n   → reviewer clicks → sees changes live\n   → merge → main URL updates",
      codeExample:
        "# כל push ל-branch יוצר preview אוטומטית\ngit checkout -b feature/new-design\ngit push origin feature/new-design\n# → my-app-git-feature-new-design.vercel.app\n\n# ב-PR ב-GitHub:\n# Vercel bot מגיב עם:\n# ✅ Preview: https://my-app-git-feature-...vercel.app\n# 📊 Inspect: https://vercel.com/...\n\n# Production deployment רק על main\ngit checkout main\ngit merge feature/new-design\ngit push origin main\n# → my-app.vercel.app updated",
      codeExplanation: "Branch push → preview URL אוטומטית. PR מקבל comment עם link. Production = main branch בלבד (configurable).",
    },
    {
      conceptName: "Docker",
      difficulty: 6,
      levels: {
        grandma: "Docker = ארגז שמכיל את כל מה שצריך להריץ את האפליקציה — שולחים אותו לכל מחשב והוא רץ אותו דבר.",
        child: "כמו ארגז עם הסרטים, הסוכריות, והתחפושות — תפתח אותו בכל בית, וה-מסיבה זהה.",
        soldier: "Docker = Container platform. Image = template, Container = running instance. Dockerfile = recipe.",
        student: "Containers = isolated processes with own filesystem. Image = layered filesystem from Dockerfile. docker build → image. docker run → container. docker-compose → multi-container.",
        junior: "פעם 'works on my machine' — production היה Linux שונה. עברתי ל-Docker — אותו container runs everywhere. בעיות resolved.",
        professor: "Docker leverages Linux namespaces (PID, NET, MNT, UTS, IPC, USER) + cgroups for isolation. Images composed of read-only layers (UnionFS). OCI standard. Alternatives: Podman, containerd, buildah.",
      },
      illustration:
        "🐳 Docker concepts:\n  Dockerfile → docker build → Image (template)\n             ↓\n         docker run\n             ↓\n        Container (running instance)",
      codeExample:
        "# Dockerfile (recipe)\nFROM node:20-alpine\n\nWORKDIR /app\n\n# Copy package files first (cache layer)\nCOPY package*.json ./\nRUN npm ci\n\n# Copy source\nCOPY . .\nRUN npm run build\n\nEXPOSE 3000\nCMD [\"npm\", \"start\"]\n\n# Build & run\ndocker build -t my-app .\ndocker run -p 3000:3000 my-app\n\n# View running\ndocker ps\n\n# Stop\ndocker stop <container_id>",
      codeExplanation: "FROM = base image. WORKDIR = current dir. COPY = files in. RUN = build commands. CMD = startup command. -p maps port host:container.",
    },
    {
      conceptName: "docker-compose",
      difficulty: 7,
      levels: {
        grandma: "להריץ הרבה containers ביחד — DB + backend + frontend, כל אחד מבודד אבל מדבר.",
        child: "כמו תזמורת עם כל הכלים — כל אחד עושה את שלו, יחד יוצרים שיר.",
        soldier: "docker-compose.yml — מגדיר כמה services (containers) שרצים יחד.",
        student: "docker-compose: orchestrate multi-container apps. yml file: services, networks, volumes. Useful for dev (DB + app + redis). Replaced by Docker Compose v2 (built-in).",
        junior: "פעם הרצתי DB ידני, server ידני, redis ידני — הזמן רב. עכשיו docker-compose up — הכל קם. זמן setup: 30 דקות → 30 שניות.",
        professor: "Compose declarative orchestration. Services: containers + networks + volumes. depends_on for ordering. Dev focus — production: Kubernetes/Nomad/ECS.",
      },
      illustration:
        "🎼 docker-compose:\n  services:\n    web (Next.js)\n    api (Express)\n    db (Postgres)\n    redis (cache)\n  → docker-compose up → הכל קם",
      codeExample:
        "# docker-compose.yml\nservices:\n  web:\n    build: .\n    ports:\n      - \"3000:3000\"\n    environment:\n      - DATABASE_URL=postgres://user:pass@db:5432/mydb\n    depends_on:\n      - db\n\n  db:\n    image: postgres:16\n    environment:\n      POSTGRES_USER: user\n      POSTGRES_PASSWORD: pass\n      POSTGRES_DB: mydb\n    volumes:\n      - db_data:/var/lib/postgresql/data\n    ports:\n      - \"5432:5432\"\n\n  redis:\n    image: redis:7-alpine\n    ports:\n      - \"6379:6379\"\n\nvolumes:\n  db_data:\n\n# הפעלה\ndocker-compose up -d           # detached\ndocker-compose logs -f web     # follow logs\ndocker-compose down            # עצירה (volumes נשארים)\ndocker-compose down -v         # עצירה + מחיקת volumes",
      codeExplanation: "services רבים בקובץ. depends_on סדר התחלה. volumes לpersistence (DB). networks אוטומטיים. up/down/logs פקודות נפוצות.",
    },
    {
      conceptName: "environment variables",
      difficulty: 4,
      levels: {
        grandma: "ערכים שמשתנים בין dev/staging/prod — DB, API keys. לא בקוד.",
        child: "כמו פתקים נסתרים — לא לסידור הציבורי, רק שאתה יודע לקרוא.",
        soldier: ".env file בdevelopment, env vars ב-Vercel/Docker בproduction. NEVER commit secrets.",
        student: ".env (gitignored), process.env.X. Frameworks: dotenv (Node), Vite import.meta.env. Public vs private (NEXT_PUBLIC_*, VITE_*).",
        junior: "פעם דחפתי DATABASE_PASSWORD ל-GitHub. תוך שעתיים — סוכן זדוני נתחבר ומחק. עכשיו: .env ב-.gitignore, secrets ב-Vercel dashboard.",
        professor: "Environment variables: 12-factor app principle (config separate from code). Secret management: Vercel/AWS Secrets Manager/Vault. Public vars: prefixed (build-time inlined). Server-only: never sent to client.",
      },
      illustration:
        "🔐 env layers:\n  .env (dev local) — gitignored!\n  .env.example (template, committed)\n  Vercel env vars (production)\n  Docker --env (container runtime)",
      codeExample:
        "# .env (LOCAL — DON'T COMMIT)\nDATABASE_URL=postgres://localhost/mydb\nJWT_SECRET=super-secret\nOPENAI_API_KEY=sk-...\n\n# .env.example (committed — template)\nDATABASE_URL=\nJWT_SECRET=\nOPENAI_API_KEY=\n\n# .gitignore\n.env\n.env.local\n.env.*.local\n\n# Node.js usage\nimport 'dotenv/config';\nconst dbUrl = process.env.DATABASE_URL;\n\n# Next.js — automatic loading\n// .env, .env.local, .env.development, .env.production\nconst dbUrl = process.env.DATABASE_URL;\n\n# Public (sent to client) — needs prefix\nNEXT_PUBLIC_API_URL=https://api.example.com\n// In code: process.env.NEXT_PUBLIC_API_URL\n\n# Vite\nVITE_API_URL=https://api.example.com\n// In code: import.meta.env.VITE_API_URL\n\n# Vercel — set via CLI or dashboard\nvercel env add DATABASE_URL production\n\n# Docker\ndocker run -e DATABASE_URL=... my-app",
      codeExplanation: ".env לdev מקומי. ALWAYS gitignore. Public vars מסומן (NEXT_PUBLIC, VITE_) — נחשפים. Vercel dashboard ל-prod secrets.",
    },
  ],
};
