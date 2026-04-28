# SVCollege Command Center

> Generated: 2026-04-28
> Target: SVCollege AI & Full Stack only

## Finish Line

- Ready: no
- Readiness: 92.7%
- Covered / Partial / Gap: 13/1/1
- Release blockers: 2

## Current Parallel Mode

- Status: `single-session-finish-line-after-sql-auth-nextjs-museum-nestjs-devops`
- Note: Full merge train is paused. SQL/ORM, Auth/Security, Next.js, Museum, Nest.js and DevOps are integrated; current work continues one Finish Line 1 module at a time.
- Paused sessions: AI Engineering, Question Quality, All Tabs QA
- Current session allowed scope: SVCollege governance docs, Command Center reports, readiness scripts, post-SQL/Auth/Next.js/Museum integration quality gates, non-museum planning documents

| Active session | Branch | Owner | Scope size |
|---|---|---|---:|

| Completed session | Branch | Status | Result |
|---|---|---|---|
| sql-orm | `codex/svcollege-sql-orm` | integrated | Database module covered: lesson_sql_orm + SQL/ORM practice + readiness evidence. |
| auth-security | `current` | integrated | Auth module covered: lesson_auth_security + Auth practice + readiness evidence. |
| nextjs | `current` | integrated | Next.js module covered: lesson_nextjs + Next.js practice + readiness evidence. |
| museum | `codex/finish-line1-museum-integration-20260428` | integrated | Museum plan and experience shell merged without tracking MP4 assets. |
| nestjs | `codex/svcollege-backend-prod-coverage-20260428` | integrated | Nest.js module covered: lesson_nestjs + Nest.js practice + readiness evidence. |
| devops | `codex/svcollege-backend-prod-coverage-20260428` | integrated | DevOps module covered: lesson_devops_deploy + deploy/Docker/CI practice + readiness evidence. |

## Red-First Queue

1. **הנדסת AI מעשית — Vercel AI SDK, OpenAI, LangChain, RAG, Agents, Fine-tuning** — gap, 0%, red. Next: להוסיף AI Engineering track: OpenAI/Vercel AI SDK, embeddings, RAG, tool calling, agents וגבולות fine-tuning.
2. **מערכות עיצוב ו-UI מודרני — Tailwind + shadcn/UI** — partial, 90%, amber. Next: להוסיף shadcn/UI ו-design system guided build.

## Source Assets

- Assets in lessons/: 36
- Raw assets in root: 0
- By type: pdf=28, docx=1, mp4=7
- By import status: imported=19, partially-imported=7, partial-svcollege-gap=1, reference=2, asset-only=7

## Feature Gates

- Feature coverage modules: 23/24 done
- Strict failures: 0
- Evidence gate failures: 0
- Course blueprint: 1/1 active blueprint
- Per-distractor feedback: 50/1357 MC questions (3.7%)
- No-evidence gate: passed (0 failures)

## No-Evidence Gate

- Status: passed
- Checked covered modules: 13
- Rule: `covered` is forbidden without lesson + practice + tab + test evidence.
- Failures: none

## Module Evidence Matrix

| Module | Lessons | Questions | Activities | Tab evidence | Tests | Browser smoke |
|---|---:|---:|---:|---|---:|---|
| יסודות האינטרנט — HTML בסיסי + HTML/CSS | 2/2 | 77 | 10 | mapped-through-course-blueprints | 10/10 | pending-session-7 |
| עיצוב רספונסיבי ו-CSS מתקדם | 1/1 | 63 | 7 | mapped-through-course-blueprints | 10/10 | pending-session-7 |
| JavaScript בסיסי ודינמיקה בדפדפן | 3/3 | 313 | 44 | mapped-through-course-blueprints | 10/10 | pending-session-7 |
| JavaScript מודרני וכלי פיתוח — ES6, Git, ESLint, Prettier | 4/4 | 254 | 43 | mapped-through-course-blueprints | 10/10 | pending-session-7 |
| פיתוח צד-שרת בסיסי — Node.js, npm, Express, REST, middleware | 3/3 | 316 | 51 | mapped-through-course-blueprints | 10/10 | pending-session-7 |
| בסיסי נתונים ומידול מידע — MongoDB/Mongoose + PostgreSQL/Prisma/Drizzle | 2/2 | 149 | 22 | mapped-through-course-blueprints | 10/10 | pending-session-7 |
| אימות ואבטחה — JWT, Cookies, Supabase/Appwrite/Firebase/Kinde | 1/1 | 38 | 9 | mapped-through-course-blueprints | 10/10 | pending-session-7 |
| React ופיתוח Frontend מתקדם | 5/5 | 399 | 75 | mapped-through-course-blueprints | 10/10 | pending-session-7 |
| TypeScript ופטרנים מתקדמים ב-React | 2/2 | 205 | 21 | mapped-through-course-blueprints | 10/10 | pending-session-7 |
| מערכות עיצוב ו-UI מודרני — Tailwind + shadcn/UI | 2/2 | 105 | 8 | mapped-through-course-blueprints | 10/10 | pending-session-7 |
| פיתוח Full-Stack עם Next.js — SSR, API Routes, SEO | 1/1 | 38 | 9 | mapped-through-course-blueprints | 10/10 | pending-session-7 |
| תשתיות, DevOps ו-CI/CD — Vercel, Docker, Docker Compose, testing | 2/2 | 76 | 10 | mapped-through-course-blueprints | 10/10 | pending-session-7 |
| Frameworks צד-שרת — Nest.js modules + dependency injection | 1/1 | 34 | 9 | mapped-through-course-blueprints | 10/10 | pending-session-7 |
| AI למפתחים — Cursor, Windsurf, Bolt, תיעוד וטסטים עם AI | 1/1 | 53 | 1 | mapped-through-course-blueprints | 10/10 | pending-session-7 |
| הנדסת AI מעשית — Vercel AI SDK, OpenAI, LangChain, RAG, Agents, Fine-tuning | 0/0 | 0 | 0 | mapped-through-course-blueprints | 10/10 | pending-session-7 |

## Parallel Sessions

- Total planned sessions: 9
- Rule: Limited mode active: do not open the full train. SQL/ORM, Auth/Security, Next.js, Museum, Nest.js and DevOps are integrated; open one Finish Line 1 module at a time unless the user re-enables wider merging.

| Session | Branch | Model | Intelligence | Open when | Ownership |
|---|---|---:|---:|---|---|
| 0 Coordinator | `codex/svcollege-coordination` | GPT-5.5 | xhigh | T0 | תוכניות, דוחות, מיזוג, wiring משותף |
| 1 SQL/ORM | `codex/svcollege-sql-orm` | GPT-5.5 | high | T0+10 | SQL/PostgreSQL/Prisma/Drizzle content |
| 2 Auth | `codex/svcollege-auth` | GPT-5.5 | xhigh | T0+10 | Auth/security content |
| 3 Next.js | `codex/svcollege-nextjs` | GPT-5.5 | high | T0+10 | Next.js content |
| 4 DevOps | `codex/svcollege-devops` | GPT-5.4 | high | T0+10 | DevOps/Docker/CI content |
| 5 Nest.js | `codex/svcollege-nestjs` | GPT-5.5 | high | T0+10 | Nest.js content |
| 6 AI Engineering | `codex/svcollege-ai-engineering` | GPT-5.5 | xhigh | T0+10 | AI SDK/RAG/Agents content |
| 8 Question Quality | `codex/svcollege-question-quality` | GPT-5.4 | high | אחרי 1-6 | validators, prerequisites, feedback |
| 7 All Tabs QA | `codex/svcollege-tab-health` | GPT-5.4 | high | אחרי integration | smoke/e2e/tests + small fixes |

## Canonical Docs

| File | Exists |
|---|---:|
| `EXECUTION_TASKS.md` | yes |
| `SPEC_AND_MASTER_PLAN.md` | yes |
| `SVCOLLEGE_COVERAGE_REPORT.md` | yes |
| `SVCOLLEGE_READINESS_REPORT.md` | yes |
| `SVCOLLEGE_READINESS_REPORT.json` | yes |
| `SVCOLLEGE_LESSON_INVENTORY.md` | yes |
| `SVCOLLEGE_PARALLEL_SESSION_PROMPTS.md` | yes |
| `lessons/manifest.json` | yes |

## Commands

- `npm run svcollege:readiness:write`
- `npm run coverage:features:strict`
- `npm run lessons:assets`
- `npm test -- --run`
- `npm run build`
