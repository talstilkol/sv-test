# SVCollege Command Center

> Generated: 2026-04-28
> Target: SVCollege AI & Full Stack only

## Finish Line

- Ready: no
- Readiness: 85.3%
- Covered / Partial / Gap: 11/2/2
- Release blockers: 4

## Current Parallel Mode

- Status: `limited-parallel-museum-only-after-sql-auth-nextjs-integration`
- Note: Full merge train is paused. SQL/ORM, Auth/Security and Next.js are integrated; only the Museum session remains active in parallel.
- Paused sessions: DevOps, Nest.js, AI Engineering, Question Quality, All Tabs QA
- Current session allowed scope: SVCollege governance docs, Command Center reports, readiness scripts, post-SQL/Auth/Next.js integration quality gates, non-museum planning documents

| Active session | Branch | Owner | Scope size |
|---|---|---|---:|
| museum | `codex/museum` | external Museum session | 4 files/areas |

| Completed session | Branch | Status | Result |
|---|---|---|---|
| sql-orm | `codex/svcollege-sql-orm` | integrated | Database module covered: lesson_sql_orm + SQL/ORM practice + readiness evidence. |
| auth-security | `current` | integrated | Auth module covered: lesson_auth_security + Auth practice + readiness evidence. |
| nextjs | `current` | integrated | Next.js module covered: lesson_nextjs + Next.js practice + readiness evidence. |

## Red-First Queue

1. **תשתיות, DevOps ו-CI/CD — Vercel, Docker, Docker Compose, testing** — partial, 90%, amber. Next: להוסיף DevOps Foundations + deploy checklist + Docker mini-build.
2. **Frameworks צד-שרת — Nest.js modules + dependency injection** — gap, 0%, red. Next: להוסיף Nest.js bridge אחרי Express: controllers, providers, modules, DI ו-validation pipe.
3. **הנדסת AI מעשית — Vercel AI SDK, OpenAI, LangChain, RAG, Agents, Fine-tuning** — gap, 0%, red. Next: להוסיף AI Engineering track: OpenAI/Vercel AI SDK, embeddings, RAG, tool calling, agents וגבולות fine-tuning.
4. **מערכות עיצוב ו-UI מודרני — Tailwind + shadcn/UI** — partial, 90%, amber. Next: להוסיף shadcn/UI ו-design system guided build.

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
- Checked covered modules: 11
- Rule: `covered` is forbidden without lesson + practice + tab + test evidence.
- Failures: none

## Module Evidence Matrix

| Module | Lessons | Questions | Activities | Tab evidence | Tests | Browser smoke |
|---|---:|---:|---:|---|---:|---|
| יסודות האינטרנט — HTML בסיסי + HTML/CSS | 2/2 | 77 | 10 | mapped-through-course-blueprints | 8/8 | pending-session-7 |
| עיצוב רספונסיבי ו-CSS מתקדם | 1/1 | 63 | 7 | mapped-through-course-blueprints | 8/8 | pending-session-7 |
| JavaScript בסיסי ודינמיקה בדפדפן | 3/3 | 313 | 44 | mapped-through-course-blueprints | 8/8 | pending-session-7 |
| JavaScript מודרני וכלי פיתוח — ES6, Git, ESLint, Prettier | 4/4 | 254 | 43 | mapped-through-course-blueprints | 8/8 | pending-session-7 |
| פיתוח צד-שרת בסיסי — Node.js, npm, Express, REST, middleware | 3/3 | 316 | 51 | mapped-through-course-blueprints | 8/8 | pending-session-7 |
| בסיסי נתונים ומידול מידע — MongoDB/Mongoose + PostgreSQL/Prisma/Drizzle | 2/2 | 149 | 22 | mapped-through-course-blueprints | 8/8 | pending-session-7 |
| אימות ואבטחה — JWT, Cookies, Supabase/Appwrite/Firebase/Kinde | 1/1 | 38 | 9 | mapped-through-course-blueprints | 8/8 | pending-session-7 |
| React ופיתוח Frontend מתקדם | 5/5 | 399 | 75 | mapped-through-course-blueprints | 8/8 | pending-session-7 |
| TypeScript ופטרנים מתקדמים ב-React | 2/2 | 205 | 21 | mapped-through-course-blueprints | 8/8 | pending-session-7 |
| מערכות עיצוב ו-UI מודרני — Tailwind + shadcn/UI | 2/2 | 105 | 8 | mapped-through-course-blueprints | 8/8 | pending-session-7 |
| פיתוח Full-Stack עם Next.js — SSR, API Routes, SEO | 1/1 | 38 | 9 | mapped-through-course-blueprints | 8/8 | pending-session-7 |
| תשתיות, DevOps ו-CI/CD — Vercel, Docker, Docker Compose, testing | 1/1 | 42 | 1 | mapped-through-course-blueprints | 8/8 | pending-session-7 |
| Frameworks צד-שרת — Nest.js modules + dependency injection | 0/0 | 0 | 0 | mapped-through-course-blueprints | 8/8 | pending-session-7 |
| AI למפתחים — Cursor, Windsurf, Bolt, תיעוד וטסטים עם AI | 1/1 | 53 | 1 | mapped-through-course-blueprints | 8/8 | pending-session-7 |
| הנדסת AI מעשית — Vercel AI SDK, OpenAI, LangChain, RAG, Agents, Fine-tuning | 0/0 | 0 | 0 | mapped-through-course-blueprints | 8/8 | pending-session-7 |

## Parallel Sessions

- Total planned sessions: 9
- Rule: Limited mode active: do not open the full train. SQL/ORM, Auth/Security and Next.js are integrated; only Museum remains active until the user re-enables wider merging.

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
