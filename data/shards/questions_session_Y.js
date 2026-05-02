// data/shards/questions_session_Y.js
// Sprint 2 batch Y — Git / CI/CD / Docker / DevOps
// 50 questions: 35 MC + 15 Fill

window.QUESTIONS_SHARD_Y = {
  mc: [
    {
      id: "mc_git_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_tooling_git::Git",
      level: 4,
      question: "Git — מה?",
      options: [
        "Distributed version control — track changes, branching, collaboration",
        "Backup software",
        "Editor",
        "Cloud service"
      ],
      correctIndex: 0,
      explanation: "Linus Torvalds, 2005. Decentralized.",
      optionFeedback: [
        "✅ נכון. Git הוא DVCS — כל clone הוא repo מלא.",
        "❌ Git שומר היסטוריה אבל הוא לא backup tool.",
        "❌ Git לא editor — VS Code/Cursor הם editors.",
        "❌ GitHub הוא cloud, Git הוא הפרוטוקול."
      ]
    },
    {
      id: "mc_repo_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_tooling_git::repository",
      level: 4,
      question: "Git repository (.git folder):",
      options: [
        "Object DB + refs — stores all commits, trees, blobs, tags",
        "Just files",
        "Backup",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Content-addressable storage.",
      optionFeedback: [
        "✅ נכון. .git הוא ה-DB של ה-history.",
        "❌ זה רק chunk של זה.",
        "❌ זה reflog/snapshots, לא backup.",
        "❌ active."
      ]
    },
    {
      id: "mc_workingtree_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_tooling_git::working tree",
      level: 5,
      question: "Working tree:",
      options: [
        "Files you currently see on filesystem (uncommitted state)",
        "Staged area",
        "Committed",
        "Remote"
      ],
      correctIndex: 0,
      explanation: "Where you edit. Stage with git add.",
      optionFeedback: [
        "✅ נכון. working tree = הקבצים בעריכה.",
        "❌ staging area הוא בין working ל-commit.",
        "❌ committed = ב-history.",
        "❌ remote = origin."
      ]
    },
    {
      id: "mc_staging_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_tooling_git::staging area",
      level: 5,
      question: "Staging area:",
      options: [
        "Index — between working tree and commit. git add stages",
        "Working tree",
        "Committed",
        "Remote"
      ],
      correctIndex: 0,
      explanation: "Selective commits.",
      optionFeedback: [
        "✅ נכון. staging הוא ה-index — מה שיכנס ל-commit הבא.",
        "❌ working tree הוא לפני stage.",
        "❌ committed = אחרי commit.",
        "❌ remote = upstream."
      ]
    },
    {
      id: "mc_commit_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_tooling_git::commit",
      level: 4,
      question: "Git commit:",
      options: [
        "Snapshot of staged changes — SHA-1 hash, parent ref, message, author",
        "Single file",
        "Branch",
        "Tag"
      ],
      correctIndex: 0,
      explanation: "Immutable snapshot.",
      optionFeedback: [
        "✅ נכון. commit = snapshot שלם של הפרויקט.",
        "❌ commit כולל את כל הקבצים, לא רק אחד.",
        "❌ branch מצביעה לcommits.",
        "❌ tag הוא ref נוסף."
      ]
    },
    {
      id: "mc_branch_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_tooling_git::branch",
      level: 5,
      question: "Git branch:",
      options: [
        "Lightweight pointer to commit — moves with new commits on it",
        "Copy of files",
        "Backup",
        "Tag"
      ],
      correctIndex: 0,
      explanation: "Cheap to create. Just a ref.",
      optionFeedback: [
        "✅ נכון. branch = pointer קטן ל-commit.",
        "❌ Git efficient — לא copies קבצים.",
        "❌ branch ≠ backup.",
        "❌ tag הוא immutable ref, branch זז."
      ]
    },
    {
      id: "mc_pr_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_tooling_git::pull request",
      level: 5,
      question: "Pull Request:",
      options: [
        "Platform feature (GitHub/GitLab) — review code before merging branch to main",
        "git command",
        "Backup",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Code review workflow.",
      optionFeedback: [
        "✅ נכון. PR הוא feature של platforms — לא Git native.",
        "❌ אין git pull-request command native.",
        "❌ PR הוא code review.",
        "❌ standard workflow."
      ]
    },
    {
      id: "mc_merge_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_tooling_git::pull request",
      level: 6,
      question: "git merge vs rebase:",
      options: [
        "merge creates merge commit (preserves history). rebase rewrites commits as linear",
        "אותו דבר",
        "merge linear",
        "rebase merges"
      ],
      correctIndex: 0,
      explanation: "Trade-offs: merge preserves, rebase clean.",
      optionFeedback: [
        "✅ נכון. trade-off היסטוריה לעומת ניקיון.",
        "❌ הבדל מהותי בהתנהגות.",
        "❌ merge הוא non-linear (מצרף).",
        "❌ rebase מעביר, לא ממזג."
      ]
    },
    {
      id: "mc_npmscripts_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_tooling_git::npm scripts",
      level: 5,
      question: "npm scripts:",
      options: [
        "package.json scripts field — shorthand for project commands (dev, build, test)",
        "system scripts",
        "Random",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "node_modules/.bin in PATH.",
      optionFeedback: [
        "✅ נכון. scripts ב-package.json הם standard.",
        "❌ זה npm-scoped, לא system.",
        "❌ user-defined.",
        "❌ active."
      ]
    },
    {
      id: "mc_eslint_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_tooling_git::ESLint",
      level: 6,
      question: "ESLint:",
      options: [
        "JS/TS linter — catches bugs, enforces style. Plugin ecosystem (react-hooks, etc.)",
        "Prettier",
        "Compiler",
        "Bundler"
      ],
      correctIndex: 0,
      explanation: "AST-based static analysis.",
      optionFeedback: [
        "✅ נכון. ESLint הוא linter — bugs+style.",
        "❌ Prettier formatter בלבד.",
        "❌ compiler שונה.",
        "❌ Vite bundler."
      ]
    },
    {
      id: "mc_prettier_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_tooling_git::Prettier",
      level: 5,
      question: "Prettier vs ESLint:",
      options: [
        "Prettier = formatting (whitespace, quotes). ESLint = code quality (logic, bugs)",
        "אותו דבר",
        "Prettier deprecated",
        "ESLint deprecated"
      ],
      correctIndex: 0,
      explanation: "Different concerns. Use both.",
      optionFeedback: [
        "✅ נכון. Prettier formatting, ESLint logic.",
        "❌ הבדל מהותי.",
        "❌ active.",
        "❌ active."
      ]
    },
    {
      id: "mc_prodready_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_devops_deploy::production readiness",
      level: 6,
      question: "Production readiness checklist:",
      options: [
        "Logging + monitoring + health checks + secrets management + backups",
        "deploy",
        "compile",
        "lint"
      ],
      correctIndex: 0,
      explanation: "12-factor app principles.",
      optionFeedback: [
        "✅ נכון. multiple concerns לproduction.",
        "❌ deploy הוא רק החלק האחרון.",
        "❌ compilation הוא build.",
        "❌ lint הוא רק dev."
      ]
    },
    {
      id: "mc_envvars_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_devops_deploy::environment variables",
      level: 5,
      question: "Environment variables:",
      options: [
        "process.env.X — runtime config separate from code (12-factor)",
        "code constants",
        "deprecated",
        "static"
      ],
      correctIndex: 0,
      explanation: "Different per env (dev/staging/prod).",
      optionFeedback: [
        "✅ נכון. env vars = runtime config.",
        "❌ הם separate מקוד.",
        "❌ standard.",
        "❌ dynamic."
      ]
    },
    {
      id: "mc_vercel_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_devops_deploy::Vercel deploy",
      level: 5,
      question: "Vercel deploy:",
      options: [
        "git-driven — push to GitHub → auto-deploy. preview per PR.",
        "manual SSH",
        "Docker required",
        "deprecated"
      ],
      correctIndex: 0,
      explanation: "Zero-config for Next.js.",
      optionFeedback: [
        "✅ נכון. git push → Vercel deploy אוטומטי.",
        "❌ אין SSH.",
        "❌ Docker אופציונלי.",
        "❌ active."
      ]
    },
    {
      id: "mc_preview_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_devops_deploy::preview deployment",
      level: 5,
      question: "Preview deployment:",
      options: [
        "Per-PR URL — reviewers test changes before merge",
        "Production URL",
        "Local URL",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Vercel/Netlify standard.",
      optionFeedback: [
        "✅ נכון. ephemeral URL לכל PR.",
        "❌ production הוא main/master.",
        "❌ remote URL ייחודי.",
        "❌ standard."
      ]
    },
    {
      id: "mc_buildcmd_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_devops_deploy::build command",
      level: 5,
      question: "Build command:",
      options: [
        "Compiles/bundles for production — npm run build, output to dist/",
        "Runs server",
        "Lints",
        "Tests"
      ],
      correctIndex: 0,
      explanation: "Vite/Webpack/etc.",
      optionFeedback: [
        "✅ נכון. build = compile/bundle.",
        "❌ זה npm start.",
        "❌ זה lint script.",
        "❌ זה test script."
      ]
    },
    {
      id: "mc_docker_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_devops_deploy::Docker",
      level: 6,
      question: "Docker:",
      options: [
        "Container engine — packages app+deps as image, runs as container",
        "VM",
        "compiler",
        "DB"
      ],
      correctIndex: 0,
      explanation: "Lightweight isolation via Linux cgroups.",
      optionFeedback: [
        "✅ נכון. Docker = container engine.",
        "❌ VM כבדה יותר.",
        "❌ Docker מריץ apps.",
        "❌ DBs רצות בdockers, אבל Docker עצמו לא DB."
      ]
    },
    {
      id: "mc_dockerfile_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_devops_deploy::Dockerfile",
      level: 6,
      question: "Dockerfile:",
      options: [
        "Recipe — FROM, RUN, COPY, CMD instructions to build image",
        "Container",
        "Image",
        "Volume"
      ],
      correctIndex: 0,
      explanation: "Builds reproducible images.",
      optionFeedback: [
        "✅ נכון. Dockerfile = build recipe.",
        "❌ container = running instance.",
        "❌ image = built artifact.",
        "❌ volume = storage."
      ]
    },
    {
      id: "mc_image_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_devops_deploy::image",
      level: 6,
      question: "Docker image:",
      options: [
        "Read-only template — built once from Dockerfile, runs as containers",
        "Running process",
        "Volume",
        "Network"
      ],
      correctIndex: 0,
      explanation: "Layered FS. Cached.",
      optionFeedback: [
        "✅ נכון. image = built artifact.",
        "❌ container = running instance של image.",
        "❌ volume שונה.",
        "❌ network שונה."
      ]
    },
    {
      id: "mc_container_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_devops_deploy::container",
      level: 6,
      question: "Container:",
      options: [
        "Running instance of image — isolated process with its own filesystem",
        "Image",
        "VM",
        "Cluster"
      ],
      correctIndex: 0,
      explanation: "Linux cgroups + namespaces.",
      optionFeedback: [
        "✅ נכון. container = runtime.",
        "❌ image = template.",
        "❌ VM כבד יותר.",
        "❌ cluster = multiple."
      ]
    },
    {
      id: "mc_compose_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_devops_deploy::Docker Compose",
      level: 6,
      question: "Docker Compose:",
      options: [
        "YAML for multi-container apps — define services, networks, volumes",
        "single container",
        "Kubernetes",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Local development standard.",
      optionFeedback: [
        "✅ נכון. compose = multi-container YAML.",
        "❌ זה Docker עצמו.",
        "❌ K8s שונה.",
        "❌ active."
      ]
    },
    {
      id: "mc_service_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_devops_deploy::service",
      level: 6,
      question: "Service ב-Compose:",
      options: [
        "Definition of a container in docker-compose.yml — image, ports, env, depends_on",
        "K8s only",
        "DB",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Service = container blueprint.",
      optionFeedback: [
        "✅ נכון. service ב-Compose = container definition.",
        "❌ Compose ו-K8s שניהם משתמשים ב-service.",
        "❌ unrelated.",
        "❌ standard."
      ]
    },
    {
      id: "mc_volume_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_devops_deploy::volume",
      level: 6,
      question: "Docker volume:",
      options: [
        "Persistent storage — survives container restart. For DB data.",
        "RAM",
        "Network",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Named volumes managed by Docker.",
      optionFeedback: [
        "✅ נכון. volume = persistent storage.",
        "❌ RAM = ephemeral.",
        "❌ network שונה.",
        "❌ active."
      ]
    },
    {
      id: "mc_health_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_devops_deploy::health check",
      level: 6,
      question: "Health check endpoint:",
      options: [
        "/health route returns 200 — load balancer/k8s probes uptime",
        "deprecated",
        "DB query",
        "Login"
      ],
      correctIndex: 0,
      explanation: "Critical for orchestration.",
      optionFeedback: [
        "✅ נכון. /health = uptime probe.",
        "❌ standard practice.",
        "❌ different.",
        "❌ unrelated."
      ]
    },
    {
      id: "mc_ci_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_devops_deploy::CI",
      level: 5,
      question: "CI (Continuous Integration):",
      options: [
        "Auto-run tests on every push — catches integration issues early",
        "Manual deploy",
        "Compile only",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "GH Actions, GitLab CI, etc.",
      optionFeedback: [
        "✅ נכון. CI = auto tests on push.",
        "❌ זה CD partial.",
        "❌ build הוא חלק.",
        "❌ active."
      ]
    },
    {
      id: "mc_cd_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_devops_deploy::CI",
      level: 6,
      question: "CD (Continuous Delivery/Deployment):",
      options: [
        "Auto-deploy after CI passes — merge to main → production",
        "manual",
        "DB migration",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Different: Delivery (manual prod approval) vs Deployment (auto).",
      optionFeedback: [
        "✅ נכון. CD = auto-deploy.",
        "❌ זה not-CD.",
        "❌ different.",
        "❌ active."
      ]
    },
    {
      id: "mc_ghactions_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_tooling_git::GitHub workflow",
      level: 6,
      question: "GitHub Actions workflow:",
      options: [
        "YAML in .github/workflows/ — triggered on events (push, pull_request)",
        "Bash scripts",
        "Manual",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Reusable, free for public repos.",
      optionFeedback: [
        "✅ נכון. GH Actions YAML.",
        "❌ scripts בתוך actions.",
        "❌ אוטומטי.",
        "❌ active."
      ]
    },
    {
      id: "mc_secrets_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_devops_deploy::environment variables",
      level: 7,
      question: "Secret management in CI:",
      options: [
        "Repo secrets / Vault / OIDC — never commit. Inject as env vars at runtime",
        "code",
        "Public",
        "deprecated"
      ],
      correctIndex: 0,
      explanation: "OIDC for cloud avoids static keys.",
      optionFeedback: [
        "✅ נכון. secrets = injected, not committed.",
        "❌ disaster.",
        "❌ disaster.",
        "❌ standard."
      ]
    },
    {
      id: "mc_smoke_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_devops_deploy::production readiness",
      level: 6,
      question: "Smoke test:",
      options: [
        "Quick post-deploy check — homepage loads, DB connects, etc.",
        "Full E2E",
        "Lint",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Prevents 'green light bad release'.",
      optionFeedback: [
        "✅ נכון. smoke = basic post-deploy.",
        "❌ E2E מקיף יותר.",
        "❌ static.",
        "❌ standard."
      ]
    },
    {
      id: "mc_rollback_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_devops_deploy::production readiness",
      level: 7,
      question: "Rollback strategy:",
      options: [
        "Re-deploy previous version on failure. Always have plan before deploy.",
        "Forward fix only",
        "Manual restore",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Vercel: instant rollback to previous deploy.",
      optionFeedback: [
        "✅ נכון. rollback ready before deploy.",
        "❌ critical safety net.",
        "❌ slow.",
        "❌ standard."
      ]
    },
    {
      id: "mc_blue_green_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_devops_deploy::production readiness",
      level: 7,
      question: "Blue-green deployment:",
      options: [
        "Two production environments — switch traffic to new (green), old (blue) standby",
        "Single env",
        "Two regions",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Zero-downtime + instant rollback.",
      optionFeedback: [
        "✅ נכון. blue-green = two env switch.",
        "❌ לא זה.",
        "❌ different.",
        "❌ active."
      ]
    },
    {
      id: "mc_canary_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_devops_deploy::production readiness",
      level: 8,
      question: "Canary release:",
      options: [
        "Roll out new version to small % of users first — monitor before full release",
        "All-at-once",
        "Manual",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Catches issues with low blast radius.",
      optionFeedback: [
        "✅ נכון. canary = gradual rollout.",
        "❌ זה standard deploy.",
        "❌ automatic preferred.",
        "❌ active."
      ]
    },
    {
      id: "mc_lighthouse_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_devops_deploy::production readiness",
      level: 6,
      question: "Lighthouse:",
      options: [
        "Google's auditing tool — Performance, Accessibility, SEO, Best Practices",
        "Linter",
        "Bundler",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Built into Chrome DevTools + CI integration.",
      optionFeedback: [
        "✅ נכון. Lighthouse = web auditor.",
        "❌ זה ESLint.",
        "❌ זה Vite/Webpack.",
        "❌ active."
      ]
    },
    {
      id: "mc_release_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_devops_deploy::production readiness",
      level: 6,
      question: "Release checklist:",
      options: [
        "Tests pass + smoke + rollback plan + monitoring + changelog",
        "Just push",
        "Tests only",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Pre-deployment checklist.",
      optionFeedback: [
        "✅ נכון. multiple gates.",
        "❌ insufficient.",
        "❌ partial.",
        "❌ standard."
      ]
    },
  ],
  fill: [
    {
      id: "fill_git_init_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_tooling_git::Git",
      level: 4,
      code: "git ____\n# initializes new .git folder",
      answer: "init",
      explanation: "git init יוצר תיקיית .git חדשה — מאתחל מאגר Git ומסד נתונים של commits והיסטוריה."
    },
    {
      id: "fill_git_clone_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_tooling_git::repository",
      level: 4,
      code: "git ____ https://github.com/user/repo.git",
      answer: "clone",
      explanation: "git clone מוריד remote repository — יוצר עותק מקומי עם כל ההיסטוריה והremote tracking."
    },
    {
      id: "fill_git_add_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_tooling_git::staging area",
      level: 4,
      code: "git ____ file.txt\n# stages file",
      answer: "add",
      explanation: "git add מכניס קבצים ל-staging area (index) — מסמן מה ייכלל ב-commit הבא."
    },
    {
      id: "fill_git_commit_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_tooling_git::commit",
      level: 4,
      code: "git ____ -m 'feat: add login'",
      answer: "commit",
      explanation: "git commit with message."
    },
    {
      id: "fill_git_push_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_tooling_git::commit",
      level: 4,
      code: "git ____ origin main",
      answer: "push",
      explanation: "git push uploads to remote."
    },
    {
      id: "fill_git_pull_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_tooling_git::commit",
      level: 4,
      code: "git ____ # fetch + merge",
      answer: "pull",
      explanation: "git pull = fetch + merge."
    },
    {
      id: "fill_git_branch_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_tooling_git::branch",
      level: 4,
      code: "git checkout -____ feature/login",
      answer: "b",
      explanation: "checkout -b creates branch."
    },
    {
      id: "fill_git_merge_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_tooling_git::pull request",
      level: 5,
      code: "git ____ feature\n# merges feature into current branch",
      answer: "merge",
      explanation: "git merge integrates branch."
    },
    {
      id: "fill_git_status_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_tooling_git::working tree",
      level: 4,
      code: "git ____\n# shows working tree state",
      answer: "status",
      explanation: "git status מציג שינויים ב-working tree לעומת staging area ו-HEAD — חיוני לפני commit."
    },
    {
      id: "fill_git_log_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_tooling_git::commit",
      level: 4,
      code: "git ____\n# shows commit history",
      answer: "log",
      explanation: "git log shows history."
    },
    {
      id: "fill_npm_run_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_tooling_git::npm scripts",
      level: 4,
      code: "npm ____ build\n# runs scripts.build",
      answer: "run",
      explanation: "npm run executes script."
    },
    {
      id: "fill_eslint_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_tooling_git::ESLint",
      level: 5,
      code: "{\n  \"scripts\": { \"lint\": \"____ .\" }\n}",
      answer: "eslint",
      explanation: "eslint . scans current dir."
    },
    {
      id: "fill_docker_run_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_devops_deploy::Docker",
      level: 6,
      code: "docker ____ -p 3000:3000 myapp",
      answer: "run",
      explanation: "docker run starts container."
    },
    {
      id: "fill_dockerfile_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_devops_deploy::Dockerfile",
      level: 6,
      code: "____ node:20\nWORKDIR /app\nCOPY . .\nCMD [\"npm\", \"start\"]",
      answer: "FROM",
      explanation: "FROM specifies base image."
    },
    {
      id: "fill_envvars_y_001",
      topicId: "topic_devops",
      conceptKey: "lesson_devops_deploy::environment variables",
      level: 5,
      code: "const dbUrl = process.____.DATABASE_URL;",
      answer: "env",
      explanation: "process.env reads vars."
    },
  ],
};
