# SVCollege Readiness Report

> תאריך: 2026-04-28  
> מקור ראשי: https://svcollege.co.il/courses/web-development/  
> מדיניות: SVCollege coverage + site health are Priority 0. Museum/AI/community/product extras are secondary until this table is green.

## Status Summary

| Area | Status | Portal Evidence | Priority Gap |
|---|---|---|---|
| HTML בסיסי + HTML/CSS | Partial | `lesson_25` covers responsive/Flex/Grid/Tailwind | Add semantic HTML, forms, selectors, box model, accessibility basics |
| CSS responsive + Tailwind | Covered | `lesson_25` | Keep covered through exercises and mock exam |
| JavaScript basics + DOM | Covered | `lesson_11`, `lesson_12`, `lesson_13` | Raise question coverage for weak concepts |
| ES6 + Git + ESLint + Prettier | Partial | ES6/async in `lesson_11`, `lesson_15`; architecture/testing in `react_blueprint` | Add Git/GitHub workflow, ESLint, Prettier, npm scripts |
| Node.js + Express + REST | Covered | `lesson_16`, `lesson_17`, `lesson_18` | Raise question coverage and add more mini-builds |
| DB: MongoDB/Mongoose + PostgreSQL/Prisma/Drizzle | Partial | `lesson_20` covers MongoDB/Mongoose and SQL vocabulary | Add PostgreSQL, schema relations, migrations, Prisma/Drizzle CRUD |
| Auth: JWT/Cookies/providers | Gap | Capstone mentions auth, no full lesson | Add auth foundations + provider-auth guided build |
| React frontend | Covered | `lesson_21` to `lesson_25` | Keep covered through E2E tab health |
| TypeScript + React | Covered | `lesson_26`, `lesson_27` | Add SV-style project questions |
| shadcn/UI + design systems | Partial | Tailwind + component architecture | Add shadcn/UI, accessible primitives, design system build |
| Next.js SSR/API/SEO | Gap | None | Add Next.js full-stack module |
| DevOps: Vercel/Docker/CI-CD/testing | Partial | CI exists; testing strategy exists | Add deploy/Docker/CI-CD student-facing lessons |
| Nest.js + DI | Gap | None | Add Nest.js bridge after Express |
| AI coding tools | Covered | `ai_development` covers Cursor, Windsurf, prompt engineering, AI review | Add workflow drills |
| AI engineering: Vercel AI/OpenAI/LangChain/RAG/Agents/Fine-tuning | Gap | None | Add AI Engineering track |

## Immediate Priority Queue

1. Build a site-health smoke suite for every top tab and critical modal.
2. Add missing SVCollege lessons in this order: HTML/CSS foundations, Git/tooling, PostgreSQL+ORM, Auth, Next.js.
3. Add backend/production lessons: DevOps/Docker/CI-CD, Nest.js.
4. Add AI Engineering only after the web/full-stack base is covered.
5. Add a dedicated SVCollege mock exam that samples every module above.

## Definition Of Done For SVCollege Coverage

- Every public SVCollege module has at least one lesson or explicit gap record.
- Every covered/partial module has MC, Fill, Trace or Build practice.
- Every gap has an owner task in `EXECUTION_TASKS.md`.
- All top tabs open without runtime errors in desktop and mobile viewports.
- `npm test`, `npm run build`, `npm run validate`, `npm run coverage:features:strict`, and CI pass.
