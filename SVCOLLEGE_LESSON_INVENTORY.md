# SVCollege Lesson Inventory

> תאריך: 2026-04-28
> יעד: Finish Line 1 — כיסוי מלא של חומר SVCollege בכל הפורטל
> מקורות קנוניים: `data/course_blueprints.js`, `SVCOLLEGE_READINESS_REPORT.md`, `EXECUTION_TASKS.md`
> Scope: יישור קורסים בפורטל הזה תקף רק ל־`SVCollege — קורס AI & Full Stack`; שאר הקורסים נדחים לפורטלים נפרדים.

## מצב נוכחי

| מדד | מצב |
|---|---:|
| מודולי SVCollege ממופים | 15 |
| מודולים מכוסים | 15 |
| מודולים חלקיים | 0 |
| מודולי gap | 0 |
| readiness ממוצע | 100% |
| release blockers | 0 |
| module × tab strict cells | 225/225 |
| tab gaps | 0 |
| desktop browser smoke | Pass |
| mobile browser smoke | Pending |
| חומרי מקור ב־`lessons/manifest.json` | 36 |
| חומרי מקור שנשארו בשורש | 0 |

## Exam Priority Lock

עד המבחן הקרוב, משימת העל היא **100% כיסוי של קורס Full Stack בכל הטאבים**. אין לקדם הרחבות שאינן סוגרות פערי חומר, תרגול, מבחן או smoke של קורס Full Stack.

### חוסמי חומר שנותרו ל-100%

| עדיפות | חסם | מצב נוכחי | פעולה נדרשת |
|---:|---|---|---|
| 1 | All Tabs QA | Pending full smoke evidence | להריץ ולתעד desktop/mobile smoke לכל טאב ולכל flow קריטי |
| 2 | Module × Tab Matrix | Complete: 225/225 strict cells, 0 gaps | לשמור את `npm run svcollege:tab-matrix:strict` ירוק בכל שינוי |
| 3 | Question depth | Non-blocking density warnings: 463/568 concepts need more questions | להעלות עומק תרגול למושגים חלשים לפי `validate:strict`, בלי לפתוח release blockers |

## שיעורים חדשים שכבר נוספו ב-Finish Line 1

| Lesson ID | סוגר מודולים | קבצים ותרגול | מקור חומר גלם |
|---|---|---|---|
| `lesson_html_css_foundations` | HTML בסיסי + HTML/CSS | `data/lesson_html_css_foundations.js`, curated MC/Fill, `trace_html_css_01/02`, `build_html_css_01`, quiz-key mapping, offline cache, SVCollege blueprint | `lessons/Lesson 25.pptx.pdf`, `lessons/פרוייקט 25.docx.pdf` כבסיס משלים; נדרש מקור HTML ייעודי אם יתווסף |
| `lesson_tooling_git` | ES6 + Git + ESLint + Prettier | `data/lesson_tooling_git.js`, curated MC/Fill, `trace_tooling_01/02`, `build_tooling_01`, quiz-key mapping, prerequisites, offline cache, SVCollege blueprint | `lessons/הסיור_הגדול_ב-GitHub.mp4` |
| `lesson_sql_orm` | PostgreSQL/Prisma/Drizzle | `data/lesson_sql_orm.js`, MC/Fill/Trace/Mini Build/Bug Hunt, prerequisites, offline cache, SVCollege blueprint | `unknown/unavailable` — bridge עצמאי |
| `lesson_auth_security` | JWT/Cookies/providers | `data/lesson_auth_security.js`, MC/Fill/Trace/Mini Build/Bug Hunt, prerequisites, offline cache, SVCollege blueprint | `lessons/שיעורי בית 18.docx.pdf` כבסיס אבטחה חלקי |
| `lesson_nextjs` | Next.js SSR/API/SEO | `data/lesson_nextjs.js`, MC/Fill/Trace/Mini Build/Bug Hunt, prerequisites, offline cache, SVCollege blueprint | `unknown/unavailable` — bridge עצמאי |
| `lesson_nestjs` | Nest.js + DI | `data/lesson_nestjs.js`, MC/Fill/Trace/Mini Build/Bug Hunt, prerequisites, offline cache, SVCollege blueprint | `unknown/unavailable` — bridge עצמאי |
| `lesson_devops_deploy` | Vercel/Docker/CI-CD/testing | `data/lesson_devops_deploy.js`, MC/Fill/Trace/Mini Build/Bug Hunt, prerequisites, offline cache, SVCollege blueprint | `React_Architect_Blueprint.pdf` כבסיס testing/architecture |
| `lesson_ai_engineering` | Vercel AI/OpenAI/LangChain/RAG/Agents/Fine-tuning | `data/lesson_ai_engineering.js`, 28 MC, 10 Fill, 3 Trace, 3 Mini Build, 3 Bug Hunt, prerequisites, offline cache, SVCollege blueprint | `lessons/שימוש בAI בצורה נכונה בפיתוח.pdf` כבסיס AI-dev; bridge עצמאי ל-AI engineering |
| `lesson_design_systems` | shadcn/UI + design systems | `data/lesson_design_systems.js`, 18 MC, 8 Fill, 2 Trace, 2 Mini Build, 2 Bug Hunt, prerequisites, offline cache, SVCollege blueprint | `lessons/Lesson 25.pptx.pdf`, `lessons/פרוייקט 25.docx.pdf` |

## שיעורים קיימים שמשרתים את SVCollege

| תחום SVCollege | שיעורים קיימים | מצב |
|---|---|---|
| JavaScript בסיסי ודינמיקה בדפדפן | `lesson_11`, `lesson_12`, `lesson_13`, `workbook_taskmanager` | Covered |
| JavaScript מודרני / async | `lesson_11`, `lesson_15`, `react_blueprint`, `lesson_tooling_git` | Covered |
| Node.js / Express / REST | `lesson_16`, `lesson_17`, `lesson_18` | Covered |
| Database בסיסי | `lesson_20`, `lesson_sql_orm` | Covered |
| React Frontend | `lesson_21`, `lesson_22`, `lesson_23`, `lesson_24`, `lesson_25` | Covered |
| TypeScript + React | `lesson_26`, `lesson_27` | Covered |
| Tailwind / responsive / shadcn/UI | `lesson_25`, `lesson_design_systems` | Covered |
| AI למפתחים + AI Engineering | `ai_development`, `lesson_ai_engineering` | Covered |
| Architecture / Testing | `react_blueprint`, `lesson_devops_deploy`, `lesson_design_systems` | Covered |

## שיעורים חדשים שחייבים להוסיף לפני Finish Line 1

| עדיפות | Lesson ID מוצע | סוגר מודולים | תכולה מינימלית | מקור חומר גלם |
|---:|---|---|---|---|
| 1 | `lesson_html_css_foundations` | HTML בסיסי + HTML/CSS | DONE — semantic HTML, forms, selectors, cascade, specificity, box model, accessibility basics | `lessons/manifest.json` |
| 2 | `lesson_tooling_git` | ES6 + Git + ESLint + Prettier | DONE — Git workflow, branch/PR, GitHub, npm scripts, ESLint, Prettier, format-on-save | `lessons/הסיור_הגדול_ב-GitHub.mp4` |
| 3 | `lesson_sql_orm` | PostgreSQL/Prisma/Drizzle | DONE — SQL schema, relations, migrations, CRUD, Prisma vs Drizzle, connection boundaries, Trace, Mini Build, Bug Hunt, prerequisites | `unknown/unavailable` — bridge עצמאי |
| 4 | `lesson_auth_security` | JWT/Cookies/providers | DONE — sessions, cookies, JWT, OAuth/provider auth, Supabase/Appwrite/Firebase/Kinde boundaries, common security mistakes, Trace, Mini Build, Bug Hunt, prerequisites | `lessons/שיעורי בית 18.docx.pdf` כבסיס אבטחה חלקי; bridge עצמאי |
| 5 | `lesson_nextjs` | Next.js SSR/API/SEO | DONE — routing, layouts, server/client components, API routes, server actions, metadata/SEO, deploy | `unknown/unavailable` — bridge עצמאי |
| 6 | `lesson_devops_deploy` | Vercel/Docker/CI-CD/testing | DONE — production readiness, env vars, Vercel deploy/preview, build command, Docker, Dockerfile, image/container, Docker Compose, services, volumes, health checks, CI/CD, smoke tests, release checklist | Bridge עצמאי שנבנה על `React_Architect_Blueprint.pdf` כבסיס testing/architecture; מקור DevOps ייעודי הוא unknown/unavailable |
| 7 | `lesson_nestjs` | Nest.js + DI | DONE — modules, controllers, providers/services, dependency injection, decorators, DTO, validation pipe, guards, pipes, middleware, interceptors, exception filters, repository pattern, testing module | Bridge עצמאי שנבנה על `lessons/Lesson 16.pptx.pdf` ו-`lessons/Lesson 17.pptx.pdf` כבסיס Express; מקור Nest ייעודי הוא unknown/unavailable |
| 8 | `lesson_design_systems` | shadcn/UI + design systems | DONE — accessible primitives, Radix, variants, cn/cva, asChild, form composition, theme tokens, registry, testing | `lessons/Lesson 25.pptx.pdf`, `lessons/פרוייקט 25.docx.pdf` |
| 9 | `lesson_ai_engineering` | Vercel AI/OpenAI/LangChain/RAG/Agents/Fine-tuning | DONE — SDK use, embeddings, retrieval, tool calling, agent boundaries, guardrails, evaluation, fine-tuning boundaries | `lessons/שימוש בAI בצורה נכונה בפיתוח.pdf` כבסיס AI-dev; bridge עצמאי |

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

1. להריץ All Tabs QA בדפדפן: שיעורים, מדריך, סבתא, אבני בסיס, עקרונות, מוזיאון, מפת ידע, פערים, מאמן, לימוד מותאם, כרטיסיות, מבחן מדומה, Code Trace, Bug Hunt, Mini Build, Code Blocks, Anatomy, השוואות, Capstones, Learning Evidence, Reports/PDF.
2. לשמור את Module × Tab Matrix ירוק: `npm run svcollege:tab-matrix:strict`.
3. להקשיח Mock Exam כך שכל מודול Full Stack נדגם באופן דטרמיניסטי גם אחרי הוספת שאלות חדשות.
4. להעלות עומק שאלות למושגים שעדיין מופיעים ב-`validate:strict` כזקוקים לתרגול נוסף.
5. בכל שיעור חדש עתידי מוסיפים מיד שאלות ותרגול, לא משאירים “שיעור עיוני בלבד”.
