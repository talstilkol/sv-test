# LumenPortal — לוח משימות ביצוע פעיל

> מקור אמת תפעולי. פירוט ההיסטוריה והמשימות שהושלמו הועבר ל-[docs/plans/06_EXECUTION_TASKS_COMPLETED_ARCHIVE.md](docs/plans/06_EXECUTION_TASKS_COMPLETED_ARCHIVE.md).
> עודכן: 2026-04-30

## כללי ברזל

- אין להשתמש ב-`Math.random()` בשום קוד.
- אין fake data, placeholders או invented metrics.
- אין יצירת שאלות אוטומטית; שאלות נכתבות ונבדקות ידנית בלבד.
- Finish Line 1 קודם לכל הרחבת מוזיאון/חנות/קהילה.
- כל DONE חייב ראיית gate/test עדכנית או להישאר בארכיון כהיסטוריה בלבד.

## סיכום ספירה מעודכן

הספירה כאן היא לפי שורות משימה מסומנות ב-`EXECUTION_TASKS.md` בזמן הסידור, ולא לפי הערכות היסטוריות של Phases.

| מדד | כמות |
|---|---:|
| בוצעו | 745 |
| סך משימות מסומנות | 905 |
| בוצעו מתוך סך הכול | 745/905 (82%) |
| נותרו פעילות: פתוחות + חלקיות + חסומות | 145 |
| פתוחות | 138 |
| בעבודה / חלקיות | 6 |
| חסומות | 1 |
| נדחו / לאחר Finish Line 1 | 15 |
| נותרו כולל נדחות | 160 |

## מצב Finish Line 1

| שער | מצב חי |
|---|---|
| `finish-line:pre-release` | 17/18 עברו; חסום על `questions:coverage-targets:strict` |
| `QUESTION_COVERAGE_TARGETS` | `mcGapCount: 503`, `fillGapCount: 498`, `ready:false` |
| `MANUAL_QUESTION_AUTHORING_PLAN` | `1433` שאלות MC ידניות ו-`919` Fill ידניות עדיין נדרשות ליעד strict |
| התקדמות כתיבה ידנית | אצוות HTML/CSS + Lesson 25 הראשונה + תתי-batch Lesson 11 + שלושה תתי-batch Lesson 12 הושלמו ככיסוי authored: `139` MC ו-`88` Fill ידניים; עדיין דרוש reviewer ידני לפני סימון DONE מלא |
| `QUESTION_ACTIVITY_AUTHORING_PLAN` | `222` פערי activity לא-עדיפותיים; `svcollegePriorityGaps: 0` |
| `BRUTAL_MASTER_PLAN_AUDIT` | `236` פריטים: `DONE 13`, `FAKED 0`, `PARTIAL 7`, `NOT DONE 216` |

## משימות שנותרו לבצע — ראשונות

הסדר: חסומות, חלקיות, פתוחות. משימות נדחות מופיעות אחר כך בנפרד.

## חסומות (1)

### 📊 סיכום התקדמות > Forward Execution Plan — 2026-04-30 > Gate סופי לסגירת Finish Line 1

- [!] FWD-9.4 — `npm run questions:coverage-targets:strict` — חסום עד השלמת `1,433` MC ידניות ו-`919` Fill ידניות לפי [MANUAL_QUESTION_AUTHORING_PLAN.md](MANUAL_QUESTION_AUTHORING_PLAN.md).

## בעבודה / חלקיות (6)

### 🚧 Phase 1 — תשתית קריטית (5 שבועות) > W2 — Accessibility Foundation

- [~] P1.2.2 — Keyboard navigation (basic — full audit Phase 3)

### 🚧 Phase 1 — תשתית קריטית (5 שבועות) > W5 — Study UX (user-requested) + Mock Exam

- [~] P1.5.2 — Per-Distractor Feedback (Partial: UI + top 50 MCs; full-bank coverage deferred)

### 🧠 Phase 3 — אינטליגנציה + Sync (6 שבועות) > W15-16 — Vite Migration + Modularize

- [~] P3.10.3 — Split app.js → src/views/, core/, ui/, utils/ — core scoring extracted; views still pending

### 🔍 AUDIT-FIX Tasks (from AUDIT_2026-04-28.md) > Major features NOT DONE (12 Creative Methods + spec ideas)

- [~] AUDIT-FIX-27 — Cross-device Sync (export/import + Supabase progress table; auth/live sync pending)
- [~] AUDIT-FIX-28 — Vite migration (build/dev/preview working; full app.js module extraction pending)
- [~] AUDIT-FIX-29 — TypeScript migration (bootstrap + lib ports + core scoring module done; views pending)

## פתוחות (138)

### 📊 סיכום התקדמות > Kimi 2.6 Consolidated Issues Reconciliation — 2026-04-30

- [ ] KIMI-AUDIT-1 — להוסיף לדוחות ישנים banner `historical / superseded` כדי ש-AUDIT_2026 לא ייראה כמו מצב production נוכחי.
- [ ] KIMI-AUDIT-2 — לתקן scripts של דוחות generated כך שהתאריך/גרסת הדוח לא יישארו תקועים על `2026-04-28` אחרי ריצה חדשה.
- [ ] KIMI-AUDIT-3 — להוסיף `report:source-of-truth` שמסכם live gates מול historic audit ומונע סתירות כמו `FEATURE_COVERAGE 100%` מול `questions:coverage-targets red`.
- [ ] KIMI-AUDIT-4 — להוסיף SEO backlog לא חוסם: OG tags, JSON-LD, canonical/meta social only after Finish Line 1.
- [ ] KIMI-AUDIT-5 — להגדיר החלטת telemetry אמיתית: local-only Bug Agent עכשיו; Sentry/Plausible רק עם חשבון אמיתי, privacy notice ו-PII policy.
- [ ] KIMI-AUDIT-7 — אם Kimi/סוכן אחר ממשיך, עליו להריץ live gates לפני סימון בעיה כפתוחה; אין להסתמך על AUDIT ישן בלי אימות.

### 📊 סיכום התקדמות > Live System Bug Audit Addendum — 2026-04-30

- [ ] SYS-AUDIT-016 — לתקן drift במטאדאטה של דוחות generated: `FEATURE_COVERAGE_REPORT.md`, `QUESTION_REMEDIATION_QUEUE.md` ו-`METRICS_DASHBOARD_REPORT.md` צריכים run date/scope אמיתי או סימון historical.
- [ ] SYS-AUDIT-017 — לבצע allowlist מלא ל-154 מופעי `innerHTML` ול-`document.write` אחד ב-`app.js`, כולל data origin, escaping/sanitizer, owner ו-smoke.
- [ ] SYS-AUDIT-018 — להגדיר trust boundary לכל 164 מופעי `localStorage` ב-`app.js`: progress/XP/evidence מקומיים אינם ראיית ציון מאומתת בלי backend/auth אמיתי.
- [ ] SYS-AUDIT-019 — אחרי Finish Line 1 לפרק payload ו-CSS לפי feature; build עובר אבל עדיין מוציא `dist/app.js` 1.6MB, `dist/style.css` 594KB ו-`dist/assets/index-DDEpfRTZ.css` 454KB.
- [ ] SYS-AUDIT-020 — לאחד scope של דוחות שאלות: active manual bank, archive/generated, concept-density coverage ו-dashboard display, ולהוסיף gate שמזהה דוח stale.

### 📊 סיכום התקדמות > Forward Execution Plan — 2026-04-30 > P0 — כיסוי שאלות ידני מלא לכל הפורטל

- [ ] FWD-2.3 — לכל batch להוסיף רק שאלות שעברו בדיקה ידנית מול חומר השיעור וה-source lesson.
- [ ] FWD-2.4 — לכל batch להריץ `validate:strict`, `qa:questions:strict`, `quality:questions:strict`, `questions:coverage-targets`, `questions:reuse-audit:strict`.
- [ ] FWD-2.5 — לא לסמן batch כ-DONE אם אין `optionFeedback` מלא לכל MC חדש.
- [ ] FWD-2.6 — לא לסמן batch כ-DONE אם Fill כולל יותר מ-blank אחד, תשובה דולפת, או hint שמגלה את התשובה.
- [ ] FWD-2.7 — יעד סופי: `questions:coverage-targets:strict` ירוק עם `mcGapCount: 0`, `fillGapCount: 0`.
- [ ] FWD-2.8 — להקצות owner/reviewer אנושיים לכל batch ב-[MANUAL_QUESTION_AUTHORING_PLAN.md](MANUAL_QUESTION_AUTHORING_PLAN.md); עד אז להשאיר `unknown/unavailable` ולא לסמן review כבוצע.

### 📊 סיכום התקדמות > Forward Execution Plan — 2026-04-30 > P0 — פערי פעילות Trace/Build/Bug

- [ ] FWD-3.2 — לכל activity חדש להוסיף Trace/Build/Bug אמיתי שמבוסס על מושג קיים, לא תרגיל placeholder.
- [ ] FWD-3.3 — להוסיף test data-shape לכל batch פעילות חדש.
- [ ] FWD-3.4 — להוסיף browser smoke למושג מייצג אחד לפחות מכל batch חדש.
- [ ] FWD-3.5 — רק אחרי SVCollege: לטפל ב-`222` פערים לא-עדיפותיים או להעביר אותם לפורטל עתידי.

### 📊 סיכום התקדמות > Forward Execution Plan — 2026-04-30 > P1 — ניקוי overclaim ומקור אמת

- [ ] FWD-4.1 — לעבור על כל `[V]` ב-`EXECUTION_TASKS.md` שנשען על generated/seeded coverage ולהוריד ל-[~]/[ ] או לסמן historical/superseded.
- [ ] FWD-4.2 — להריץ `master-plan:brutal-audit:write` אחרי כל תיקון סטטוס.
- [ ] FWD-4.3 — יעד: `FAKED: 0` לפני release.
- [ ] FWD-4.4 — כל `PARTIAL` חייב owner, קובץ ראיה, וקריטריון סגירה מדיד.
- [ ] FWD-4.5 — לעדכן את סיכום ההתקדמות העליון רק לפי gates, לא לפי ספירה היסטורית.

### 📊 סיכום התקדמות > Forward Execution Plan — 2026-04-30 > P1 — QA וחוויית למידה אחרי החזרת הירוק

- [ ] FWD-5.1 — להריץ desktop/mobile visual smoke אחרי הוספת השאלות הידניות.
- [ ] FWD-5.2 — לבדוק ידנית שיעור אחד מכל מודול SVCollege: תוכן, מושגים, שאלות, מעבר מושגים, מעבר לשיעור הבא, collapse menus, scroll rail.
- [ ] FWD-5.3 — להוסיף keyboard-only tests ל-Escape/Enter/Arrow, מעבר טאבים, פתיחת/סגירת תוכן, submit answer ו-focus visible.
- [ ] FWD-5.4 — לעדכן `SVCOLLEGE_BROWSER_SMOKE.md` רק אחרי ראיית דפדפן אמיתית.
- [ ] FWD-5.7 — להריץ browser visual smoke לשיעור 11 בדסקטופ ובמובייל ולוודא שאין overflow/overlap אחרי תפריט העץ החדש.

### 📊 סיכום התקדמות > Forward Execution Plan — 2026-04-30 > P1 — Outcome Loop אמיתי

- [ ] FWD-6.1 — להריץ פיילוט 10 תלמידים אמיתי לפי `PILOT_READINESS_PLAN.md` / `SVCOLLEGE_LEARNER_OUTCOME_LOOP.md`.
- [ ] FWD-6.2 — לאסוף D1/D7 retention, module mastery, stuck feedback, זמן התאוששות מטעות ו-promotion outcome.
- [ ] FWD-6.3 — להשאיר כל נתון חסר כ-`unknown/unavailable`; אין backfill.
- [ ] FWD-6.4 — לעדכן את שער הקידום רק אחרי ראיות תלמידים אמיתיות.

### 📊 סיכום התקדמות > Forward Execution Plan — 2026-04-30 > P1 — Release Guardrails

- [ ] FWD-7.3 — לרכז cache version / asset expectations כך שלא יעדכנו `service-worker.js`, tests ודוחות ידנית בכמה מקומות.
- [ ] FWD-7.4 — לפני commit/release ליצור inventory של קבצים מיועדים מול generated reports.
- [ ] FWD-7.5 — להריץ security inventory על `.innerHTML`/`document.write` שמקבלים data-originated strings; לתקן Pair Match, Achievements, Reflections, feedback ו-PDF print לפי ממצא חי.
- [ ] FWD-7.6 — להוסיף gate שמוודא שכל data-originated HTML עובר `esc(...)`, DOM API או sanitizer קיים, בלי whitelist ידני רופף.
- [ ] FWD-7.7 — להוסיף CSP מדורג ולבדוק תאימות עם PWA/offline/fonts/scripts לפני enforcement.
- [ ] FWD-7.8 — להגדיר trust boundary ל-localStorage: התקדמות מקומית אינה ראיית ציון מאומתת; אימות מאסטר אמיתי דורש backend/auth אמיתי.
- [ ] FWD-7.9 — להוסיף Offline UX indicator ודוח cache effectiveness מקומי: online/offline, cache version, assets חסרים ו-last update.
- [ ] FWD-7.10 — להוסיף reconciliation gate לדוחות חיצוניים/היסטוריים: claim מ-AUDIT/Kimi לא נכנס כפתוח עד שפקודת live gate מאמתת אותו.

### 📊 סיכום התקדמות > Forward Execution Plan — 2026-04-30 > P2 — רק אחרי Finish Line 1 ירוק

- [ ] FWD-8.1 — לפרק `app.js` למודולים קטנים: lesson renderer, chrome/menu, settings, bug log, question panels.
- [ ] FWD-8.2 — לצמצם stylesheet גלובלי ו-core bundle רק אחרי שמסכי הלמידה יציבים.
- [ ] FWD-8.3 — להמשיך Sync מול Supabase אמיתי: auth, conflict handling, recovery, export/import.
- [ ] FWD-8.4 — להמשיך מוזיאון/חנות/קהילה רק אם חומר חובה למבחן לא נחסם, ורק אחרי gates ירוקים.
- [ ] FWD-8.5 — כל pricing/usage/post-exam premium נשאר `unknown/unavailable` עד שיש ראיות אמת.
- [ ] FWD-8.6 — להפוך modularization לתוכנית מדידה: dynamic import לפי view, no eager data loading למסכים לא פתוחים, ומדידת bundle size ב-`npm run build`.
- [ ] FWD-8.7 — לפצל CSS לפי feature רק אחרי visual smoke; אין purge אגרסיבי בלי בדיקת שיעור, מוזיאון, trainer, mock exam ו-settings.
- [ ] FWD-8.8 — להרחיב TypeScript בהדרגה ל-interfaces של lesson/concept/question/score לפני המרת views.
- [ ] FWD-8.9 — להוסיף Playwright E2E production-like לזרימות ליבה: פתיחת שיעור, מעבר מושג, בנק שאלות, MC/Fill, progress, חזרה לבית ו-offline reload.
- [ ] FWD-8.10 — telemetry חיצוני כמו Sentry/Plausible רק אחרי חשבון אמיתי, privacy notice, PII policy ואישור מפורש; עד אז Bug Agent נשאר local-only.

### 📊 סיכום התקדמות > Forward Execution Plan — 2026-04-30 > P2 — Museum Expansion Backlog from 2026-04-30 review

> בעלות נוכחית: Kimi 2.6. לא לבצע כאן לפני Finish Line 1 אלא אם יש חסימה ישירה להכנה למבחן.

- [ ] MUSEUM-FWD-0.1 — להגדיר source-of-truth חדש לנתוני מוזיאון מחוץ ל-`app.js`: schema לאגף, אולם, מוצג, מקור, תלות מושגים, מחיר XP/coins, דרכון, סרטון, בדיקת ידע ידנית.
- [ ] MUSEUM-FWD-0.2 — להוסיף gate שמונע פרסום מוזיאון אם יש אולם עם טענה היסטורית/טכנית ללא source או `unknown/unavailable`.
- [ ] MUSEUM-FWD-0.3 — להוסיף gate שמונע שימוש בכל שם/תיאור שמרמז על "random"; טיפים/המלצות יהיו תור דטרמיניסטי לפי מצב התקדמות ולא אקראיים.
- [ ] MUSEUM-FWD-0.4 — להגדיר כלל UI: המוזיאון לא דוחף chrome כפול למסכי שיעור ולא מקטין את שטח התוכן של SVCollege.
- [ ] MUSEUM-FWD-0.5 — להגדיר כלל מסחרי: XP/coins הם תגמול למידה מקומי בלבד, לא כסף אמיתי, לא shortcut לציון, ולא מחליפים mastery.
- [ ] MUSEUM-FWD-1.1 — שער המוזיאון: לבנות מפה אינטראקטיבית של כל האגפים עם סטטוס פתוח/נעול, חיבורים בין אגפים וזום נגיש.
- [ ] MUSEUM-FWD-1.2 — שער המוזיאון: להוסיף טאבים לכל מוזיאון/אגף עם דמי כניסה ראשוניים ב-XP/coins ודמי אגף נוספים, בלי לנעול חומר חובה למבחן.
- [ ] MUSEUM-FWD-1.3 — שער המוזיאון: להוסיף מסלולים מומלצים ידניים: מתחילים, לפני מבחן, בניית מוצר, Debug, React/Full-Stack, AI במוצר.
- [ ] MUSEUM-FWD-1.4 — שער המוזיאון: להוסיף dashboard התקדמות לאגפים, חותמות, אולמות שביקרו, סרטונים שנצפו ומשימות הבנה.
- [ ] MUSEUM-FWD-1.5 — שער המוזיאון: להוסיף חיפוש מוזיאון לפי טקסט, תג, אגף, מושג וקישור ישיר לתוצאה.
- [ ] MUSEUM-FWD-1.6 — שער המוזיאון: להחליף "טיפ אקראי" ב-`deterministicNextTip` לפי progression queue, עם היסטוריית טיפים שכבר נראו.
- [ ] MUSEUM-FWD-2.1 — אגף שכבות המחשב: סימולטור מתג חשמלי ON/OFF עם ויזואליזציה של אות, מתח/זרם וסף החלטה.
- [ ] MUSEUM-FWD-2.2 — אגף שכבות המחשב: סימולטור שערים לוגיים AND/OR/NOT עם שני קלטים, פלט וטבלת אמת.
- [ ] MUSEUM-FWD-2.3 — אגף שכבות המחשב: ממיר ביטים דטרמיניסטי ל-decimal/ASCII/Hex, overflow ו-UTF-8.
- [ ] MUSEUM-FWD-2.4 — אגף שכבות המחשב: סימולטור טיפוסים שמראה איך אותם bits מתפרשים כ-number/string/boolean.
- [ ] MUSEUM-FWD-2.5 — אגף שכבות המחשב: X-Ray לפקודת מכונה עם opcode, operand, register ו-fetch-decode-execute.
- [ ] MUSEUM-FWD-2.6 — אגף שכבות המחשב: תרשים קוד עד הרצה: Source → Compiler/Interpreter → Binary/Runtime → Loader → Memory → CPU.
- [ ] MUSEUM-FWD-2.7 — אגף שכבות המחשב: חדר מחירים/פשרות שמראה מה כל שכבה מסתירה, המחיר, מתי לצלול, ודוגמת באג.
- [ ] MUSEUM-FWD-2.8 — אגף שכבות המחשב: השוואות חזותיות Vanilla JS מול Framework, Stack מול Heap, ופעולה זהה בשכבות שונות.
- [ ] MUSEUM-FWD-3.1 — מוזיאון שפות: כרטיס שושלת ידני לכל שפה: C, C++, Java, Python, JavaScript, TypeScript, Rust, Go, Swift, Ruby, PHP, SQL, HTML/CSS, Assembly.
- [ ] MUSEUM-FWD-3.2 — לכל כרטיס שפה: בעיה שנפתרה, פתרון, מחיר/פשרה, שנת יצירה עם מקור, דוגמת קוד קצרה, וקישור לשיעור.
- [ ] MUSEUM-FWD-3.3 — להוסיף חדר פשרות: מהירות/בטיחות, שליטה/נוחות, קריאות/ביצועים, ניידות/אינטגרציה, פרודוקטיביות/גמישות, פשטות/כוח.
- [ ] MUSEUM-FWD-3.4 — להוסיף השוואות ישירות: C/Rust, JavaScript/TypeScript, React/DOM ישיר, SQL/Document DB, Monolith/Microservices.
- [ ] MUSEUM-FWD-3.5 — להוסיף מסלול "משפה למוצר": שפה → ספרייה → framework → אקו-סיסטם → מוצר, עם דוגמאות מקוריות ידניות בלבד.
- [ ] MUSEUM-FWD-4.1 — אגף Full-Stack: להשלים אולם UI/HTML/CSS: semantic HTML, layout systems, responsive, accessibility, states.
- [ ] MUSEUM-FWD-4.2 — אגף Full-Stack: להשלים Browser Runtime: DOM update, event loop, storage, rendering.
- [ ] MUSEUM-FWD-4.3 — אגף Full-Stack: להשלים Async/Network: promise lifecycle, fetch, HTTP lifecycle, loading/error states.
- [ ] MUSEUM-FWD-4.4 — אגף Full-Stack: להשלים Node/npm/modules: package.json, module systems, filesystem, environment.
- [ ] MUSEUM-FWD-4.5 — אגף Full-Stack: להשלים API/HTTP/Express: route design, middleware, status codes, validation, auth boundary.
- [ ] MUSEUM-FWD-4.6 — אגף Full-Stack: להשלים Database/Mongo/Mongoose: schema, collection/document, query operators, indexing, transactions.
- [ ] MUSEUM-FWD-4.7 — אגף Full-Stack: להשלים React Product: lifecycle, props/state, hooks, router, context.
- [ ] MUSEUM-FWD-4.8 — אגף Full-Stack: להשלים Quality/Tests/AI Review: unit, integration, smoke, regression, AI review תחת policy.
- [ ] MUSEUM-FWD-4.9 — לכל תחום Full-Stack להוסיף תרשים קלט → עיבוד → פלט → נקודות כשל → כלים.
- [ ] MUSEUM-FWD-5.1 — אגף מוצר: להוסיף תבניות לפני פיתוח: problem, persona, KPI, scope, wireframe, data model, risk list.
- [ ] MUSEUM-FWD-5.2 — אגף מוצר: להוסיף תבניות בזמן פיתוח: RACI, task breakdown, owner/deadline.
- [ ] MUSEUM-FWD-5.3 — אגף מוצר: להוסיף checklists לפני השקה: build, accessibility, performance, content, errors, security.
- [ ] MUSEUM-FWD-5.4 — אגף מוצר: להוסיף rollout, monitoring, support, analytics ו-feedback collection.
- [ ] MUSEUM-FWD-5.5 — אגף מוצר: להוסיף אחרי השקה bug triage, version planning, debt, telemetry, UX improvements.
- [ ] MUSEUM-FWD-5.6 — אגף מוצר: לבנות סימולטור מוצר דטרמיניסטי שמוביל מרעיון עד שדרוג/החלפה.
- [ ] MUSEUM-FWD-6.1 — אגף טעויות: להשלים סימני זיהוי, דוגמאות ובדיקה ראשונה ל-Syntax, Runtime, Scope/Closure, Async, React State, API, Database, Release.
- [ ] MUSEUM-FWD-6.2 — אגף טעויות: לבנות Root Cause Simulator שמוביל symptom → layer → contract → fix → test.
- [ ] MUSEUM-FWD-6.3 — לחבר כל טעות לשיעור, מושג, אולם שורש, שאלה ידנית ותרגול תיקון.
- [ ] MUSEUM-FWD-7.1 — אגף חוזים ונתונים: להגדיר Function Contract, Component Props Contract, API Contract, DB Schema Contract, Validation Contract.
- [ ] MUSEUM-FWD-7.2 — להוסיף טבלת בעלות חוזים: Frontend, Backend, Database, Product, QA.
- [ ] MUSEUM-FWD-7.3 — להוסיף מסלול נתון מלא: input → validation → state → JSON → API → DB → response → render.
- [ ] MUSEUM-FWD-7.4 — לבנות Contract Breaker שמראה חוזה שנשבר, סימפטום, בדיקה ותיקון.
- [ ] MUSEUM-FWD-8.1 — אגף AI: לבנות חדר RAG: sources, chunks, embeddings, vector DB, retrieval, answer, citations.
- [ ] MUSEUM-FWD-8.2 — אגף AI: לבנות חדר LLM Internals: tokens, context window, attention, inference, hallucination.
- [ ] MUSEUM-FWD-8.3 — אגף AI: לבנות חדר AI Feature במוצר: prompt, sources, policy, tools, logs, evals.
- [ ] MUSEUM-FWD-8.4 — אגף AI: לבנות חדר סיכונים: מידע שגוי, פרטיות, הרשאות, עלות, latency, bias.
- [ ] MUSEUM-FWD-8.5 — אגף AI: להשלים טבלת סוגי מודלים והבחנה בין local model, open weights, open source, hosted API ו-commercial product.
- [ ] MUSEUM-FWD-9.1 — אגף DevOps/Deployment: להוסיף אולמות Version Control, CI/CD, Environments, Monitoring, Containers, Cloud.
- [ ] MUSEUM-FWD-9.2 — אגף Security: להוסיף Authentication, Authorization, Input Validation, Data Protection, API Security, Common Vulnerabilities.
- [ ] MUSEUM-FWD-9.3 — אגף Performance: להוסיף Network, Rendering, Database, Memory Management, Profiling.
- [ ] MUSEUM-FWD-9.4 — אגף Design Systems: להוסיף Typography, Color, Spacing, Components, Documentation.
- [ ] MUSEUM-FWD-10.1 — Video Studio: לבדוק ידנית את כל 63 הסרטונים: חומר רקע, ידע מקדים, סקריפט, prompt, הוראות בחירה, מקור, שאלת בדיקה ידנית.
- [ ] MUSEUM-FWD-10.2 — Video Studio: להוסיף מסלולים מסכמים: לפני מבחן, Full-Stack, Debug, AI במוצר.
- [ ] MUSEUM-FWD-10.3 — Video Studio: להוסיף בדיקת ידע ידנית אחרי צפייה לכל סרטון, עם הסבר לכל תשובה וללא generator.
- [ ] MUSEUM-FWD-10.4 — Video Studio: להוסיף הערות פרטיות, סימוני זמן, ייצוא הערות וחיפוש בהערות.
- [ ] MUSEUM-FWD-10.5 — Video Studio: להוסיף המלצות דטרמיניסטיות לפי אגפים שביקרו, טעויות ידועות ושאלות שטעית בהן.
- [ ] MUSEUM-FWD-10.6 — Video Studio: להוסיף סטטיסטיקות צפייה מקומיות ללא PII וללא נתוני שימוש מומצאים.
- [ ] MUSEUM-FWD-11.1 — דרכון תלמיד: להשלים חותמות ביקור לכל אולם עם משימת הבנה, שאלה ידנית ותוצר קצר.
- [ ] MUSEUM-FWD-11.2 — דרכון תלמיד: להוסיף שמירת סטטוס, גלריית חותמות, מסלולי ביקור ותעודות מקומיות.
- [ ] MUSEUM-FWD-11.3 — דרכון תלמיד: להוסיף אתגרים יומיים דטרמיניסטיים ולא תחרות/ליגה ציבורית עד שיש מדיניות פרטיות ונתוני אמת.
- [ ] MUSEUM-FWD-11.4 — דרכון תלמיד: להוסיף מצב "לפני מבחן" שמציג רק מושגים, טעויות, שאלות בדיקה וסרטונים קצרים.
- [ ] MUSEUM-FWD-12.1 — קישורים: מכל אולם לשיעורים הרלוונטיים.
- [ ] MUSEUM-FWD-12.2 — קישורים: מכל טעות לאולם השורש שמסביר אותה.
- [ ] MUSEUM-FWD-12.3 — קישורים: מכל מושג לבלוק קוד, שאלה, סרטון ותרגול.
- [ ] MUSEUM-FWD-12.4 — קישורים: מכל תחום Full-Stack לשלב מוצר ולבעל תפקיד בצוות.
- [ ] MUSEUM-FWD-12.5 — קישורים: מכל סרטון לידע מקדים, שאלת בדיקה ידנית ותעודת דרכון.
- [ ] MUSEUM-FWD-13.1 — QA מוזיאון: RTL מלא לטבלאות, תרשימים וכרטיסים במובייל.
- [ ] MUSEUM-FWD-13.2 — QA מוזיאון: keyboard-only לכל טאבים, מודלים, כפתורי unlock ומסלולי ביקור.
- [ ] MUSEUM-FWD-13.3 — QA מוזיאון: reduced-motion לכל אנימציה, זום, מעבר כרטיסים ותרשימים.
- [ ] MUSEUM-FWD-13.4 — QA מוזיאון: visual overlap smoke לכל אגף מרכזי בדסקטופ ובמובייל.
- [ ] MUSEUM-FWD-13.5 — QA מוזיאון: data-shape tests לכל אגף: route, goal, source, video, diagram, prerequisites, xpPrice.
- [ ] MUSEUM-FWD-13.6 — QA מוזיאון: `museum:access-smoke:strict`, `svcollege:pwa-offline:strict`, `npm test -- --run`, `npm run build` לפני סימון DONE.
- [ ] MUSEUM-FWD-14.1 — רעיון נוסף: "מסלול טעות למוזיאון" — כל תשובה שגויה בשיעור יכולה לפתוח אולם מוזיאון רלוונטי שמסביר את שורש הבלבול.
- [ ] MUSEUM-FWD-14.2 — רעיון נוסף: "Museum Minimal Mode" — מצב קריאה שמציג רק breadcrumb, מושג, מקור וקישור חזרה לשיעור.
- [ ] MUSEUM-FWD-14.3 — רעיון נוסף: "Evidence Drawer" — פאנל מקורות בכל אולם עם תאריך בדיקה, סוג מקור ורמת ודאות.
- [ ] MUSEUM-FWD-14.4 — רעיון נוסף: "Dependency Unlock Graph" — גרף שמראה אילו מושגי יסוד פותחים איזה אגף מתקדם ובאיזה XP.
- [ ] MUSEUM-FWD-14.5 — רעיון נוסף: "Teacher Museum Trail" — מסלול שמורה יכול לשלוח לתלמיד לפי חולשה, ללא נתוני דמו.
- [ ] MUSEUM-FWD-14.6 — רעיון נוסף: "Offline Expedition Pack" — חבילת מוזיאון אופליין למסלול אחד עם סרטונים/תרשימים/שאלות ידניות בלבד.
- [ ] MUSEUM-FWD-14.7 — רעיון נוסף: "Before/After Debug Wall" — קיר שמראה באג לפני ואחרי תיקון, כולל contract שנשבר.
- [ ] MUSEUM-FWD-14.8 — רעיון נוסף: "Source Freshness Review" — תור סקירה תקופתי לטענות היסטוריות/טכניות שמסומנות כרגישות לשינוי.

### 🧪 Phase 6 — Learning Evidence + Productization > W24 — Curriculum Coverage + Capstone Projects

- [ ] P6.3.1 — Close question coverage: every concept has ≥3 MC, ≥2 Fill/Code, ≥1 trace/build/bug where relevant (`QUESTION_ACTIVITY_COVERAGE_REPORT`: 346/568 activity-ready, 222 Trace/Build/Bug gaps)

## נדחות / אחרי Finish Line 1 (15)

### 🚧 Phase 1 — תשתית קריטית (5 שבועות) > W2 — Accessibility Foundation

- [-] P1.2.1.2 — Pocket Card 📌 (deferred — not yet implemented)
- [-] P1.2.1.3 — TTS 🔊 (deferred — Track D scope)
- [-] P1.2.1.4 — AI Tutor 💬 (deferred — Phase 2)
- [-] P1.2.1.6 — Modal close × (deferred — when modals added)
- [-] P1.2.2.3 — Esc closes modals (deferred)
- [-] P1.2.2.4 — Enter submits MC (deferred)
- [-] P1.2.2.5 — Arrow keys (deferred)

### 🚧 Phase 1 — תשתית קריטית (5 שבועות) > W3 — PWA + Offline

- [-] P1.3.4 — Install prompt button (deferred — requires beforeinstallprompt UX)

### 🚧 Phase 1 — תשתית קריטית (5 שבועות) > W5 — Study UX (user-requested) + Mock Exam

- [-] P1.5.2.3 — LLM batch script — augment 1316 MCs (deferred — needs Claude API + review pipeline)

### 🌐 Phase 4 — קנה מידה + קהילה (8+ שבועות) > Mobile Native (Optional)

- [-] P4.5.1 — React Native setup
- [-] P4.5.2 — Shared core/ with web
- [-] P4.5.3 — iOS build
- [-] P4.5.4 — Android build
- [-] P4.5.5 — Push notifications
- [-] P4.5.6 — App Store + Google Play

## משימות שהושלמו — בסוף

בוצעו 745 מתוך 905 משימות מסומנות. הפירוט המלא עבר לארכיון: [docs/plans/06_EXECUTION_TASKS_COMPLETED_ARCHIVE.md](docs/plans/06_EXECUTION_TASKS_COMPLETED_ARCHIVE.md).

### הושלם בסבב הנוכחי

- [V] QMAN-001C — נכתבו ידנית 12 MC ו-6 Fill ל-`lesson_12::יצירת מערך חדש (new array)`, `lesson_12::יצירת מערך חדש מתוך קיים`, `lesson_12::סינון לפי תנאי`, `lesson_12::עבודה עם ערכים לפי אינדקס`; `validate:strict`, `qa:questions:strict` ו-`quality:questions:strict` ירוקים, ו-`questions:coverage-targets:strict` ירד ל-`503`/`498` פערים.
- [V] QMAN-001B — נכתבו ידנית 12 MC ו-8 Fill ל-`lesson_12::forEach`, `lesson_12::spread`, `lesson_12::uppercase`, `lesson_12::lowercase`; `validate:strict`, `qa:questions:strict` ו-`quality:questions:strict` ירוקים, ו-`questions:coverage-targets:strict` ירד ל-`507`/`502` פערים.
- [V] QMAN-001A — נכתבו ידנית 12 MC ו-8 Fill ל-`lesson_12::array`, `lesson_12::index`, `lesson_12::map`, `lesson_12::filter`; `validate:strict`, `qa:questions:strict` ו-`quality:questions:strict` ירוקים, ו-`questions:coverage-targets:strict` ירד ל-`511`/`506` פערים.
- [V] KIMI-AUDIT-6 — עודכן [SYSTEM_BUG_AUDIT_REPORT.md](SYSTEM_BUG_AUDIT_REPORT.md) עם reconciliation חי: finish-line, master-plan brutal audit, manual coverage, report drift, DOM/storage inventory, tests ו-build.
- [V] SYS-AUDIT-021 — תוקנו שני טסטים עם ספירות hardcoded אחרי באטצ' שאלות ידני; עכשיו הם בודקים invariants ו-`npm test -- --run` ירוק.

| אזור | משימות שהושלמו |
|---|---:|
| 🚨 Finish Line 1 — SVCollege Full Portal Coverage | 154 |
| 🚧 Phase 1 — תשתית קריטית (5 שבועות) | 89 |
| 🎯 Phase 2 — מוצר ליבה לימודי (5 שבועות + 3 sprints) | 76 |
| 🪙 Phase 8 — XP Economy + Experience Store | 54 |
| 🚀 Phase 7 — Learning OS + Outcome Scale | 48 |
| 🧪 Phase 10 — Exam OS v2 + Content Factory | 41 |
| 📊 סיכום התקדמות | 40 |
| 🧠 Phase 9 — Exam Intelligence + Reliability Hardening | 40 |
| 🧭 Phase 5 — Quality Governance + 90-Day Rebaseline | 40 |
| 🧠 Phase 3 — אינטליגנציה + Sync (6 שבועות) | 35 |
| 🧪 Phase 6 — Learning Evidence + Productization | 35 |
| 🔍 AUDIT-FIX Tasks (from AUDIT_2026-04-28.md) | 31 |
| ✅ Phase 0 — Status (כבר הושלם) | 25 |
| 🌐 Phase 4 — קנה מידה + קהילה (8+ שבועות) | 22 |
| 🎯 Iron Rules (כללי ברזל) — מתעדכן עם כל commit | 10 |
