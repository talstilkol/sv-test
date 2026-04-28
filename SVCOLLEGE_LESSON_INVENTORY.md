# SVCollege Lesson Inventory

> תאריך: 2026-04-28
> יעד: Finish Line 1 — כיסוי מלא של חומר SVCollege בכל הפורטל
> מקורות קנוניים: `data/course_blueprints.js`, `SVCOLLEGE_READINESS_REPORT.md`, `EXECUTION_TASKS.md`
> Scope: יישור קורסים בפורטל הזה תקף רק ל־`SVCollege — קורס AI & Full Stack`; שאר הקורסים נדחים לפורטלים נפרדים.

## מצב נוכחי

| מדד | מצב |
|---|---:|
| מודולי SVCollege ממופים | 15 |
| מודולים מכוסים | 8 |
| מודולים חלקיים | 3 |
| מודולי gap | 4 |
| readiness ממוצע | 71.3% |
| release blockers | 7 |
| חומרי מקור ב־`lessons/manifest.json` | 36 |
| חומרי מקור שנשארו בשורש | 0 |

## שיעורים חדשים שכבר נוספו ב-Finish Line 1

| Lesson ID | סוגר מודולים | קבצים ותרגול | מקור חומר גלם |
|---|---|---|---|
| `lesson_html_css_foundations` | HTML בסיסי + HTML/CSS | `data/lesson_html_css_foundations.js`, curated MC/Fill, `trace_html_css_01/02`, `build_html_css_01`, quiz-key mapping, offline cache, SVCollege blueprint | `lessons/Lesson 25.pptx.pdf`, `lessons/פרוייקט 25.docx.pdf` כבסיס משלים; נדרש מקור HTML ייעודי אם יתווסף |
| `lesson_tooling_git` | ES6 + Git + ESLint + Prettier | `data/lesson_tooling_git.js`, curated MC/Fill, `trace_tooling_01/02`, `build_tooling_01`, quiz-key mapping, prerequisites, offline cache, SVCollege blueprint | `lessons/הסיור_הגדול_ב-GitHub.mp4` |

## שיעורים קיימים שמשרתים את SVCollege

| תחום SVCollege | שיעורים קיימים | מצב |
|---|---|---|
| JavaScript בסיסי ודינמיקה בדפדפן | `lesson_11`, `lesson_12`, `lesson_13`, `workbook_taskmanager` | Covered |
| JavaScript מודרני / async | `lesson_11`, `lesson_15`, `react_blueprint`, `lesson_tooling_git` | Covered |
| Node.js / Express / REST | `lesson_16`, `lesson_17`, `lesson_18` | Covered |
| Database בסיסי | `lesson_20` | Partial בגלל PostgreSQL/ORM |
| React Frontend | `lesson_21`, `lesson_22`, `lesson_23`, `lesson_24`, `lesson_25` | Covered |
| TypeScript + React | `lesson_26`, `lesson_27` | Covered |
| Tailwind / responsive | `lesson_25` | Covered/Partial לפי עומק HTML/CSS |
| AI למפתחים | `ai_development` | Covered |
| Architecture / Testing | `react_blueprint` | Partial עבור tooling/devops |

## שיעורים חדשים שחייבים להוסיף לפני Finish Line 1

| עדיפות | Lesson ID מוצע | סוגר מודולים | תכולה מינימלית | מקור חומר גלם |
|---:|---|---|---|---|
| 1 | `lesson_html_css_foundations` | HTML בסיסי + HTML/CSS | DONE — semantic HTML, forms, selectors, cascade, specificity, box model, accessibility basics | `lessons/manifest.json` |
| 2 | `lesson_tooling_git` | ES6 + Git + ESLint + Prettier | DONE — Git workflow, branch/PR, GitHub, npm scripts, ESLint, Prettier, format-on-save | `lessons/הסיור_הגדול_ב-GitHub.mp4` |
| 3 | `lesson_sql_orm` | PostgreSQL/Prisma/Drizzle | SQL schema, relations, migrations, CRUD, Prisma vs Drizzle, connection boundaries | `unknown/unavailable` — אין עדיין קובץ מקור ייעודי בתיקיית `lessons/` |
| 4 | `lesson_auth_security` | JWT/Cookies/providers | sessions, cookies, JWT, OAuth/provider auth, Supabase/Appwrite/Firebase/Kinde boundaries, common security mistakes | `lessons/שיעורי בית 18.docx.pdf` כבסיס אבטחה חלקי; נדרש מקור auth ייעודי |
| 5 | `lesson_nextjs_fullstack` | Next.js SSR/API/SEO | routing, layouts, server/client components, API routes, metadata/SEO, deploy | `unknown/unavailable` — אין עדיין קובץ מקור ייעודי בתיקיית `lessons/` |
| 6 | `lesson_devops_deploy` | Vercel/Docker/CI-CD/testing | production readiness, env vars, Vercel deploy/preview, build command, Docker, Dockerfile, image/container, Docker Compose, services, volumes, health checks, CI/CD, smoke tests, release checklist | Bridge עצמאי שנבנה על `React_Architect_Blueprint.pdf` כבסיס testing/architecture; מקור DevOps ייעודי הוא unknown/unavailable |
| 7 | `lesson_nestjs` | Nest.js + DI | modules, controllers, providers/services, dependency injection, decorators, DTO, validation pipe, guards, pipes, middleware, interceptors, exception filters, repository pattern, testing module | Bridge עצמאי שנבנה על `lessons/Lesson 16.pptx.pdf` ו-`lessons/Lesson 17.pptx.pdf` כבסיס Express; מקור Nest ייעודי הוא unknown/unavailable |
| 8 | `lesson_design_systems` | shadcn/UI + design systems | accessible primitives, component composition, variant patterns, Tailwind integration | `lessons/Lesson 25.pptx.pdf`, `lessons/פרוייקט 25.docx.pdf` |
| 9 | `lesson_ai_engineering` | Vercel AI/OpenAI/LangChain/RAG/Agents/Fine-tuning | SDK use, embeddings, retrieval, tool calling, agent boundaries, fine-tuning boundaries | `lessons/שימוש בAI בצורה נכונה בפיתוח.pdf` כבסיס AI-dev; נדרש מקור AI engineering ייעודי |

## רישום חומרי מקור

- כל חומרי המקור הועברו אל `lessons/`.
- הרשימה הקנונית נמצאת ב־`lessons/manifest.json`.
- השיעורים החדשים של Finish Line 1 כוללים גם metadata פנימי: `sourceAssets`, `generatedSummaries`, `sourceCoverageNote`.
- בדיקת שמירה: `npm run lessons:assets`.
- אם נוסף קובץ PDF/MP4/DOCX/PPTX חדש, הוא חייב להיכנס ל־`lessons/` ולקבל entry ב־manifest.

## Definition Of Done לכל שיעור חדש

- יש `data/<lesson>.js` עם `id`, `title`, `description`, `concepts`, `quiz`.
- כל מושג כולל `difficulty`, שבע רמות הסבר, דוגמת קוד, הסבר קוד, ודרישות קדם במידת הצורך.
- כל שיעור מקבל MC + Fill + לפחות תרגול אחד: Trace, Bug Hunt או Mini Build.
- כל שיעור מופיע בעץ הימני, במפת ידע, בכרטיסיות, במבחן SVCollege, וב־Course Blueprints.
- כל מושג חדש מקבל glossary/prerequisite בסיסיים אם הוא מופיע בשאלות.
- `npm run svcollege:readiness:strict`, `npm run validate:strict`, `npm test -- --run`, ו־`npm run build` עוברים.

## סדר עבודה מומלץ

1. לסגור קודם `lesson_sql_orm`, `lesson_auth_security`, `lesson_nextjs_fullstack`.
2. אחר כך להוסיף `lesson_devops_deploy`, `lesson_nestjs_bridge`.
3. `lesson_ai_engineering` נכנס אחרי שבסיס Web/Full-Stack מכוסה, כדי לא להפוך את המסלול ל-AI לפני שהיסודות סגורים.
4. בכל שיעור חדש מוסיפים מיד שאלות ותרגול, לא משאירים “שיעור עיוני בלבד”.
