# SVCollege Readiness Report

> תאריך: 2026-04-28  
> מקור ראשי: https://svcollege.co.il/courses/web-development/  
> מדיניות: SVCollege coverage + site health are Finish Line 1. Museum/AI/community/product extras are secondary until this table is green.
> Scope: טאב `יישור SVCollege` פעיל אך ורק למסלול `SVCollege — קורס AI & Full Stack`. קורסים אחרים לא נמדדים בפורטל הזה ויועברו לפורטלים נפרדים בעתיד.
> דוח מדיד אוטומטי: `npm run svcollege:readiness:write` יוצר את `SVCOLLEGE_READINESS_REPORT.md` ואת `SVCOLLEGE_READINESS_REPORT.json`.
> מלאי שיעורים לביצוע: `SVCOLLEGE_LESSON_INVENTORY.md`.

## Status Summary

| Area | Status | Portal Evidence | Priority Gap |
|---|---|---|---|
| HTML בסיסי + HTML/CSS | Covered | `lesson_html_css_foundations` covers semantic HTML, forms, selectors, cascade/specificity, box model and accessibility basics; `lesson_25` continues responsive/Flex/Grid/Tailwind | Maintain practice, mock-exam coverage and tab health |
| CSS responsive + Tailwind | Covered | `lesson_25` | Keep covered through exercises and mock exam |
| JavaScript basics + DOM | Covered | `lesson_11`, `lesson_12`, `lesson_13` | Raise question coverage for weak concepts |
| ES6 + Git + ESLint + Prettier | Covered | `lesson_tooling_git` covers Git, repo, working tree, staging, commit, branch, PR, GitHub workflow, npm scripts, ESLint, Prettier; ES6/async supported by `lesson_11`, `lesson_15` | Maintain practice, mock-exam coverage and tab health |
| Node.js + Express + REST | Covered | `lesson_16`, `lesson_17`, `lesson_18` | Raise question coverage and add more mini-builds |
| DB: MongoDB/Mongoose + PostgreSQL/Prisma/Drizzle | Covered | `lesson_20` covers MongoDB/Mongoose; `lesson_sql_orm` covers SQL, PostgreSQL, schema, relations, migrations, Prisma/Drizzle CRUD, transactions, MC/Fill/Trace/Mini Build/Bug Hunt and prerequisites | Maintain practice, mock-exam coverage and tab health |
| Auth: JWT/Cookies/providers | Covered | `lesson_auth_security` covers authentication, authorization, sessions, secure cookies, JWT/access/refresh tokens, OAuth/provider auth, password hashing/bcrypt, CSRF, XSS, CORS, middleware guards, MC/Fill/Trace/Mini Build/Bug Hunt and prerequisites | Maintain practice, mock-exam coverage and tab health |
| React frontend | Covered | `lesson_21` to `lesson_25` | Keep covered through E2E tab health |
| TypeScript + React | Covered | `lesson_26`, `lesson_27` | Add SV-style project questions |
| shadcn/UI + design systems | Partial | Tailwind + component architecture | Add shadcn/UI, accessible primitives, design system build |
| Next.js SSR/API/SEO | Covered | `lesson_nextjs` covers App Router, routing, layouts/pages, server/client components, route handlers/API routes, server actions, SSR/SSG/ISR, metadata, SEO, image optimization, Vercel deploy, MC/Fill/Trace/Mini Build/Bug Hunt and prerequisites | Maintain practice, mock-exam coverage and tab health |
| DevOps: Vercel/Docker/CI-CD/testing | Covered | `lesson_devops_deploy` covers production readiness, env vars, Vercel deploy/preview, build command, Docker, Dockerfile, image/container, Docker Compose, services, volumes, health checks, CI/CD, smoke tests and release checklist; includes MC/Fill/Trace/Mini Build/Bug Hunt and prerequisites | Maintain practice, mock-exam coverage and tab health |
| Nest.js + DI | Covered | `lesson_nestjs` covers modules, controllers, providers/services, dependency injection, decorators, DTO, validation pipe, guards, pipes, middleware, interceptors, exception filters, repository pattern and testing module; includes MC/Fill/Trace/Mini Build/Bug Hunt and prerequisites | Maintain practice, mock-exam coverage and tab health |
| AI coding tools | Covered | `ai_development` covers Cursor, Windsurf, prompt engineering, AI review | Add workflow drills |
| AI engineering: Vercel AI/OpenAI/LangChain/RAG/Agents/Fine-tuning | Gap | None | Add AI Engineering track |

## Immediate Priority Queue

1. Build a site-health smoke suite for every top tab and critical modal.
2. Add AI Engineering track for Vercel AI SDK, OpenAI, LangChain, RAG, Agents and fine-tuning boundaries.
3. Add shadcn/UI design-system bridge after the AI Engineering gap is closed or explicitly deferred.
4. Harden all-tab smoke coverage for the now-covered SVCollege modules.
5. Harden the dedicated SVCollege mock exam so its sampler guarantees every module above.

## Definition Of Done For SVCollege Coverage

- Every public SVCollege module has at least one lesson or explicit gap record.
- Every covered/partial module has MC, Fill, Trace or Build practice.
- Every gap has an owner task in `EXECUTION_TASKS.md`.
- All top tabs open without runtime errors in desktop and mobile viewports.
- `npm test`, `npm run build`, `npm run validate`, `npm run coverage:features:strict`, and CI pass.
