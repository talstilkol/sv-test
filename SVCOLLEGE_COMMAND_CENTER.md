# SVCollege Command Center

> Generated: 2026-04-28
> Target: SVCollege AI & Full Stack only

## Finish Line

- Ready: yes
- Readiness: 100%
- Covered / Partial / Gap: 15/0/0
- Release blockers: 0
- Tab matrix gaps: 0
- Desktop browser smoke: pass (SVCOLLEGE_BROWSER_SMOKE.md)
- Mobile browser smoke: pass

## Current Parallel Mode

- Status: `single-session-finish-line1-all-modules-covered`
- Note: Full merge train is paused. SQL/ORM, Auth/Security, Next.js, Museum, Nest.js, DevOps, AI Engineering and Design Systems are integrated. Desktop and mobile all-tabs smoke passed; current work focuses on question depth, hard-question feedback and regression fixes.
- Paused sessions: Question Quality
- Current session allowed scope: SVCollege governance docs, Command Center reports, readiness scripts, post-SQL/Auth/Next.js/Museum integration quality gates, SVCollege question-depth hardening, non-museum planning documents

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
| ai-engineering | `codex/unified-context-tree-tabs-20260428` | integrated | AI Engineering module covered: lesson_ai_engineering + OpenAI/Vercel AI SDK/RAG/Agents practice + readiness evidence. |
| design-systems | `codex/unified-context-tree-tabs-20260428` | integrated | Design Systems module covered: lesson_design_systems + shadcn/UI/Radix/variants/form practice + readiness evidence. |

## Red-First Queue

- None

## Source Assets

- Assets in lessons/: 36
- Raw assets in root: 0
- By type: pdf=28, docx=1, mp4=7
- By import status: imported=19, partially-imported=7, partial-svcollege-gap=1, reference=2, asset-only=7

## Feature Gates

- Feature coverage modules: 24/24 done
- Strict failures: 0
- Evidence gate failures: 0
- Course blueprint: 1/1 active blueprint
- Per-distractor feedback: 132/132 MC questions (100%)
- No-evidence gate: passed (0 failures)
- Module × tab matrix: 100% (0 strict gaps, 0 support gaps)

## No-Evidence Gate

- Status: passed
- Checked covered modules: 15
- Rule: `covered` is forbidden without lesson + practice + tab + test evidence.
- Failures: none

## Promotion Rule

- Status: defined
- Label: SVCollege module ready for students
- Rule: A module may be promoted to ready-for-students only after content coverage, practice coverage, tab/smoke evidence and first-user feedback evidence are all present.
- Current Finish Line scope: Finish Line 1 can be exam-ready before the 10-student pilot; broad student-ready promotion still requires first-user feedback.

- content: lesson + concepts + one-line definitions + prerequisites
- practice: MC + Fill + at least one deeper activity
- tab-health: module appears in all strict SVCollege tabs
- smoke: desktop/mobile browser flow is clean
- feedback: first-user or pilot feedback reviewed

## Module Evidence Matrix

| Module | Lessons | Questions | Activities | Tab evidence | Tests | Browser smoke |
|---|---:|---:|---:|---|---:|---|
| יסודות האינטרנט — HTML בסיסי + HTML/CSS | 2/2 | 44 | 12 | mapped-through-course-blueprints | 12/12 | desktop-pass/mobile-pass |
| עיצוב רספונסיבי ו-CSS מתקדם | 1/1 | 25 | 8 | mapped-through-course-blueprints | 12/12 | desktop-pass/mobile-pass |
| JavaScript בסיסי ודינמיקה בדפדפן | 3/3 | 55 | 45 | mapped-through-course-blueprints | 12/12 | desktop-pass/mobile-pass |
| JavaScript מודרני וכלי פיתוח — ES6, Git, ESLint, Prettier | 4/4 | 72 | 46 | mapped-through-course-blueprints | 12/12 | desktop-pass/mobile-pass |
| פיתוח צד-שרת בסיסי — Node.js, npm, Express, REST, middleware | 3/3 | 12 | 52 | mapped-through-course-blueprints | 12/12 | desktop-pass/mobile-pass |
| בסיסי נתונים ומידול מידע — MongoDB/Mongoose + PostgreSQL/Prisma/Drizzle | 2/2 | 42 | 33 | mapped-through-course-blueprints | 12/12 | desktop-pass/mobile-pass |
| אימות ואבטחה — JWT, Cookies, Supabase/Appwrite/Firebase/Kinde | 1/1 | 44 | 23 | mapped-through-course-blueprints | 12/12 | desktop-pass/mobile-pass |
| React ופיתוח Frontend מתקדם | 5/5 | 55 | 76 | mapped-through-course-blueprints | 12/12 | desktop-pass/mobile-pass |
| TypeScript ופטרנים מתקדמים ב-React | 2/2 | 12 | 23 | mapped-through-course-blueprints | 12/12 | desktop-pass/mobile-pass |
| מערכות עיצוב ו-UI מודרני — Tailwind + shadcn/UI | 3/3 | 56 | 25 | mapped-through-course-blueprints | 12/12 | desktop-pass/mobile-pass |
| פיתוח Full-Stack עם Next.js — SSR, API Routes, SEO | 1/1 | 44 | 22 | mapped-through-course-blueprints | 12/12 | desktop-pass/mobile-pass |
| תשתיות, DevOps ו-CI/CD — Vercel, Docker, Docker Compose, testing | 2/2 | 39 | 23 | mapped-through-course-blueprints | 12/12 | desktop-pass/mobile-pass |
| Frameworks צד-שרת — Nest.js modules + dependency injection | 1/1 | 38 | 20 | mapped-through-course-blueprints | 12/12 | desktop-pass/mobile-pass |
| AI למפתחים — Cursor, Windsurf, Bolt, תיעוד וטסטים עם AI | 1/1 | 20 | 4 | mapped-through-course-blueprints | 12/12 | desktop-pass/mobile-pass |
| הנדסת AI מעשית — Vercel AI SDK, OpenAI, LangChain, RAG, Agents, Fine-tuning | 1/1 | 42 | 24 | mapped-through-course-blueprints | 12/12 | desktop-pass/mobile-pass |

## Module × Tab Matrix

- Ready: yes
- Strict coverage: 225/225 (100%)
- Strict gaps: 0
- Support gaps: 0
- Report: `SVCOLLEGE_TAB_MATRIX.md`

## Parallel Sessions

- Total planned sessions: 0
- Rule: Limited mode active: do not open the full train. All 15 SVCollege modules are covered and desktop/mobile all-tabs smoke passed; continue only with question-depth hardening, hard-question feedback, or regression fixes unless the user re-enables wider merging.

- No session table found.

## Canonical Docs

| File | Exists |
|---|---:|
| `EXECUTION_TASKS.md` | yes |
| `SPEC_AND_MASTER_PLAN.md` | yes |
| `SVCOLLEGE_COVERAGE_REPORT.md` | yes |
| `SVCOLLEGE_READINESS_REPORT.md` | yes |
| `SVCOLLEGE_READINESS_REPORT.json` | yes |
| `SVCOLLEGE_TAB_MATRIX.md` | yes |
| `SVCOLLEGE_TAB_MATRIX.json` | yes |
| `SVCOLLEGE_BROWSER_SMOKE.md` | yes |
| `SVCOLLEGE_LESSON_INVENTORY.md` | yes |
| `docs/plans/00_CANONICAL_INDEX.md` | yes |
| `docs/plans/01_FINISH_LINE_1.md` | yes |
| `docs/plans/02_MANUAL_CONTENT_GOVERNANCE.md` | yes |
| `docs/plans/03_DEFERRED_BACKLOG.md` | yes |
| `docs/plans/04_AGENT_HANDOFF.md` | yes |
| `docs/plans/05_LEGACY_DOC_MIGRATION.md` | yes |
| `docs/plans/06_EXECUTION_TASKS_COMPLETED_ARCHIVE.md` | yes |
| `lessons/manifest.json` | yes |

## Commands

- `npm run svcollege:readiness:write`
- `npm run svcollege:tab-matrix:write`
- `npm run coverage:features:strict`
- `npm run lessons:assets`
- `npm test -- --run`
- `npm run build`
