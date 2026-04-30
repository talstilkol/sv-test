# Master Plan — בניית מאגר שאלות מלא לכל 434 המושגים

> **המטרה:** להגיע למצב שבו לכל מושג ב-19 השיעורים יש ✅ **3 שאלות אמריקניות** ו-✅ **2 שאלות השלמת קוד**, כך שהתלמיד יכול להגיע מרמה 1 (סבתא) לרמה 7 (מאסטר) באמצעות שאלות ידניות בלבד שעברו בדיקה קפדנית.

> **עדכון 2026-04-28:** מסמך זה הוא תוכנית legacy ממוקדת בנק שאלות. תוכנית האב הפעילה היא [SPEC_AND_MASTER_PLAN.md](SPEC_AND_MASTER_PLAN.md), והביצוע היומי נמצא ב-[EXECUTION_TASKS.md](EXECUTION_TASKS.md). קו הסיום הראשון גובר על המסמך הזה: כיסוי מלא של `SVCollege — קורס AI & Full Stack` בכל הפורטל לפני הרחבות אחרות.

> **עדכון Finish Line 1:** אחרי ביטול הבנק האוטומטי, שערי SVCollege עצמם חזרו לירוק (`svcollege:readiness:release`, `svcollege:tab-matrix:strict`, `svcollege:critical-flows:strict`, `svcollege:command-center:strict`, `svcollege:student-export:strict`). קו הסיום עדיין לא נסגר כי `questions:coverage-targets:strict` אדום: `491` פערי MC ו-`486` פערי Fill ידניים.

> **עדכון XP Economy 2026-04-29:** תוכנית החנות והכלכלה החדשה נמצאת ב-[XP_REWARD_STORE_MASTER_PLAN.md](XP_REWARD_STORE_MASTER_PLAN.md). היא מוסיפה 100 רמות XP לא לינאריות, Coins, חנות חוויות, כרטיסים למוזיאון ושער רמה 100 שמחייב שליטה מלאה. היא Priority 2 ואינה חוסמת חומר חובה למבחן.

> **עדכון Forward Plan 2026-04-29:** נוסף כיוון Phase 9 ב-[SPEC_AND_MASTER_PLAN.md](SPEC_AND_MASTER_PLAN.md) וב-[EXECUTION_TASKS.md](EXECUTION_TASKS.md): Exam Intelligence + Reliability Hardening. זה כולל Exam Cockpit, מניעת שאלות כפולות, escalation לשאלות קשות, recovery drills אחרי טעות, mobile/desktop smoke מלא, ושער 100 שלא מאפשר ציון מלא בלי הוכחת עומק וקוד.

> **עדכון Post-Exam Plan 2026-04-29:** נוסף Phase 10: Exam OS v2 + Content Factory. זהו שלב אחרי Exam Edition, לא לפני המבחן הקרוב. הוא מגדיר מפעל שאלות עומק, דוחות Mastery Audit, סימולציות לחץ, daily exam OS, ופיצול עתידי לפורטלים נפרדים לקורסים שאינם SVCollege AI & Full Stack.

> **עדכון Exam Week 2026-04-29:** נוסף [EXAM_WEEK_OPERATING_PLAN.md](EXAM_WEEK_OPERATING_PLAN.md). זהו מסמך הפעלה יומי עד המבחן: בדיקות בוקר, סגירת 10 מושגים חלשים ביום, סימולציית תלמיד בערב, ושער Exam Edition. הוא לא מוסיף scope חדש, אלא מונע סטייה מהיעד הראשון.

> **עדכון Exam Sprint 2026-04-29:** נוסף P-0.3 ב-[EXECUTION_TASKS.md](EXECUTION_TASKS.md): ספרינט 7 ימים לפני מבחן. הוא מתמקד ב-weakest 10, no-repeat simulation, harder-after-correct, wrong-answer repair, smoke מובייל/פוקוס, וגיבוש `Exam Edition RC`.

> **עדכון System Bug Audit 2026-04-30:** [SYSTEM_BUG_AUDIT_REPORT.md](SYSTEM_BUG_AUDIT_REPORT.md) רוענן לפי gates חיים. מצב אמת: `finish-line:pre-release` הוא `17/18`, החסם היחיד הוא `questions:coverage-targets:strict`, `QUESTION_ACTIVITY_AUTHORING_PLAN` מציג `222` פערי activity לא-עדיפותיים ו-`svcollegePriorityGaps: 0`, ו-`BRUTAL_MASTER_PLAN_AUDIT` מציג `239` פריטים: `DONE 16`, `FAKED 0`, `PARTIAL 7`, `NOT DONE 216`.

> **עדכון Manual Questions 2026-04-30:** חל איסור מוחלט על יצירת שאלות אוטומטיות. `scripts/seed_questions.js`, `scripts/audit_seeded_questions.js` ו-`tests/seeded-qa.test.js` נמחקו; `content-loader.js` לא טוען יותר `questions_bank_seeded.js`; כלי validation/coverage כבר לא קוראים את archive; והדוחות סופרים readiness רק מתוך בנק ידני. מצב אמת: `questions:coverage-targets` מדווח `ready:false`, עם `491` פערי MC ו-`486` פערי Fill ידניים; `MANUAL_QUESTION_AUTHORING_PLAN.md` דורש עדיין `1,401` MC ו-`900` Fill ידניות. הבנק הידני הפעיל עומד על `303` MC ו-`236` Fill.

> **עדכון Forward Execution 2026-04-30:** רשימת המשימות התפעולית המעודכנת נמצאת ב-[EXECUTION_TASKS.md](EXECUTION_TASKS.md) תחת `Forward Execution Plan — 2026-04-30`. סדר העבודה המחייב: קודם שני מודולי SVCollege שחסרים Trainer/Mock Exam ידניים, אחר כך כל backlog השאלות הידניות, אחר כך פערי Trace/Build/Bug, ורק בסוף מוזיאון/חנות/קהילה/Sync/פירוק frontend.

## 0. עדכון אסטרטגי לתוכנית

לפני הרחבת בנק השאלות לכל המושגים, המיקוד עובר ל-SVCollege:

1. כל שאלה קשה תקבל דרישות קדם והסבר צדדי של המונחים שחייבים לדעת.
2. כל מודול SVCollege חייב להופיע לא רק בשיעור אלא גם בטאבים: מאמן, מבחן מדומה, Gap Matrix, מפת ידע, Flashcards, Code Trace ו-Mini Build; המטריצה האוטומטית כבר מאמתת זאת ב-225/225 תאים.
3. כל חומר גלם בתיקיית `lessons/` יקושר לשיעור ולתוכן האינטראקטיבי שנוצר ממנו.
4. `covered` יוגדר רק כשיש שיעור, תרגול, ניווט, בדיקות וראיית UX בדפדפן.
5. הרחבות כמו מוזיאון, קהילה ו-AI production נשארות Priority 2 עד שדוח SVCollege ירוק.
6. XP/Coins/Store הם שכבת מוטיבציה בלבד: לא קונים ציון, לא קונים מאסטר, ולא נועלים ידע חובה.
7. השיפור הבא לפני פיצ'רי פרימיום: Exam Cockpit + Deep Question Ladder + Full Portal Reliability. מטרתם להעלות סיכוי לציון 100, לא להגדיל את מספר הטאבים.
8. אחרי Exam Edition יציב: Content Factory + Mastery Audit + Final Simulation Lab. המטרה היא להפוך את המערכת למכונה שמייצרת איכות מדידה, לא רק למסך לימוד נוסף.
9. בשבעת ימי ההכנה למבחן: לא מודדים התקדמות לפי מספר פיצ'רים, אלא לפי מספר מושגים מסוכנים שהפכו למוכחים בשאלת עומק וקוד.

---

## 0A. Current Verified System Bug Backlog — 2026-04-30

מקור עדכני: [SYSTEM_BUG_AUDIT_REPORT.md](SYSTEM_BUG_AUDIT_REPORT.md), [FINISH_LINE_PRERELEASE_REPORT.md](FINISH_LINE_PRERELEASE_REPORT.md), [BRUTAL_MASTER_PLAN_AUDIT.md](BRUTAL_MASTER_PLAN_AUDIT.md), [MANUAL_QUESTION_AUTHORING_PLAN.md](MANUAL_QUESTION_AUTHORING_PLAN.md). רק ממצאים שאומתו בפקודות חיות נכנסים לכאן כמצב פעיל.

| ID | סטטוס | עדיפות | משימה |
|---|---|---:|---|
| SYS-AUDIT-001 | [ ] | P0 | לסגור את `questions:coverage-targets:strict`: `491` פערי MC ו-`486` פערי Fill, ללא יצירה אוטומטית וללא שאלות לא-בדוקות. |
| SYS-AUDIT-002 | [ ] | P0 | להשלים את `MANUAL_QUESTION_AUTHORING_PLAN.md`: `1,401` MC ו-`900` Fill ידניות, עם owner/reviewer אמיתיים לכל batch. |
| SYS-AUDIT-003 | [ ] | P1 | להשאיר `222` פערי Trace/Build/Bug לא-עדיפותיים אחרי Finish Line 1, ואז לסגור אותם עם תוכן ידני ו-browser smoke. |
| SYS-AUDIT-004 | [ ] | P1 | לטפל ב-`BRUTAL_MASTER_PLAN_AUDIT`: מתוך `239` פריטים יש `216` NOT DONE ו-`7` PARTIAL; אין להציג phase כגמור עד שיש ראיית gate. |
| SYS-AUDIT-005 | [ ] | P1 | להשלים keyboard-only coverage ל-Escape/Enter/Arrow, focus return, מעבר טאבים, מעבר מושגים ו-submit answer. |
| SYS-AUDIT-006 | [ ] | P1 | להמשיך פירוק `app.js`/views רק אחרי Finish Line 1 ירוק, עם tests לכל slice. |
| SYS-AUDIT-007 | [ ] | P1 | להוכיח Cross-device Sync מול backend/auth אמיתי; עד אז זה alpha מקומי בלבד. |
| SYS-AUDIT-008 | [ ] | P1 | להריץ פיילוט 10 תלמידים אמיתי לפני כל claim על D1/D7, mastery movement או promotion outcome. |
| SYS-AUDIT-009 | [ ] | P1 | לבצע security inventory ל-`.innerHTML`/`document.write`, CSP מדורג ו-trust boundary ל-localStorage. |
| SYS-AUDIT-010 | [ ] | P1 | להוסיף source-of-truth report שמבדיל live gates מדוחות historical/superseded. |
| SYS-AUDIT-011 | [ ] | P1 | להוסיף export/report deterministic ללוג Bug Agent, ללא PII וללא telemetry מזויפת. |
| SYS-AUDIT-012 | [ ] | P2 | להוסיף Playwright E2E production-like לזרימות ליבה: שיעור, מושג, בנק שאלות, MC/Fill, progress, בית ו-offline reload. |
| SYS-AUDIT-013 | [ ] | P2 | לרכז cache version וציפיות assets ממקור אחד כדי למנוע drift ב-PWA. |
| SYS-AUDIT-014 | [ ] | P2 | להשאיר `data/questions_bank_seeded.js` כארכיון לא פעיל או למחוק רק אחרי שכל פריט שימושי נכתב מחדש ידנית ונבדק. |
| SYS-AUDIT-015 | [ ] | P2 | אחרי Finish Line 1 בלבד: SEO, telemetry חיצוני, payload optimization, מוזיאון/חנות/קהילה. |
| SYS-AUDIT-016 | [ ] | P1 | לתקן drift במטאדאטה של דוחות generated: `FEATURE_COVERAGE_REPORT.md` ו-`QUESTION_REMEDIATION_QUEUE.md` עדיין מתחילים ב-`2026-04-28`, ו-`METRICS_DASHBOARD_REPORT.md` ב-`2026-04-29` למרות counter עדכני; כל דוח חייב run date/scope אמיתי או סימון historical. |
| SYS-AUDIT-017 | [ ] | P1 | לבצע allowlist מלא ל-154 מופעי `innerHTML` ול-`document.write` אחד ב-`app.js`, עם data origin, escaping/sanitizer, owner ו-smoke לכל נתיב פעיל. |
| SYS-AUDIT-018 | [ ] | P1 | להגדיר trust boundary לכל 164 מופעי `localStorage` ב-`app.js`: progress/XP/evidence מקומיים הם עזר לימודי בלבד ולא ראיית ציון מאומתת בלי backend/auth אמיתי. |
| SYS-AUDIT-019 | [ ] | P2 | אחרי Finish Line 1: לפרק payload ו-CSS לפי feature. build נוכחי עובר אבל עדיין מוציא `dist/app.js` 1.6MB, `dist/style.css` 594KB ו-`dist/assets/index-DDEpfRTZ.css` 454KB. |
| SYS-AUDIT-020 | [ ] | P1 | לאחד scope של דוחות שאלות: להפריד active manual bank, archive/generated, concept-density coverage ו-dashboard display, ולהוסיף gate שמזהה קובץ דוח stale אחרי strict/write. |
| SYS-AUDIT-021 | [V] | P1 | תוקנו טסטים עם ספירות frozen אחרי באטצ' ידני: `tests/question-quality-report.test.js` ו-`tests/question-reuse-audit.test.js` עברו לבדוק invariants במקום hardcoded totals; `npm test -- --run` ירוק. |

## 0B. Historical System Bug Audit Backlog — 2026-04-30

הסעיף הבא נשמר כהיסטוריה של משימות שכבר נוספו בעבר. בחלק מהשורות יש מספרים ישנים או מצב שהשתנה אחרי gates חיים. אם יש סתירה, סעיף `0A` והדוחות החיים גוברים.

מקור: [SYSTEM_BUG_AUDIT_REPORT.md](SYSTEM_BUG_AUDIT_REPORT.md). העיקרון המחייב: לסגור קודם פערים שמחזקים הכנה אמיתית למבחן SVCollege, ורק אחר כך הרחבות מוזיאון/חנות/קהילה.

| ID | סטטוס | עדיפות | משימה |
|---|---|---:|---|
| BUG-AUDIT-001 | [ ] | P0 | לסגור `222/568` פערי פעילות Trace/Build/Bug באמצעות תוכן אמיתי בלבד, לפי [QUESTION_ACTIVITY_AUTHORING_PLAN.md](QUESTION_ACTIVITY_AUTHORING_PLAN.md). |
| BUG-AUDIT-002 | [V] | P0 | נסגרו `9` פערי SVCollege-priority ב-Design Systems באמצעות Trace ידני; [QUESTION_ACTIVITY_AUTHORING_PLAN.md](QUESTION_ACTIVITY_AUTHORING_PLAN.md) מציג עכשיו `svcollegePriorityGaps: 0`. |
| BUG-AUDIT-003 | [ ] | P1 | להשאיר `222` פערים לא-עדיפותיים ב-deferred עד סגירת SVCollege, ואז לשייך אותם לפורטל מתאים. |
| BUG-AUDIT-004 | [ ] | P1 | להשלים בדיקות keyboard-only ל-Esc/Enter/Arrow, ניווט מושגים, מעבר שיעור, פתיחת/סגירת טאבים ומצבי focus. |
| BUG-AUDIT-005 | [ ] | P1 | להמשיך פירוק `app.js` למודולי `src/` קטנים: lesson renderer, chrome/menu, settings, bug log, question panels. |
| BUG-AUDIT-006 | [ ] | P1 | לסגור Cross-device Sync מול Supabase אמיתי: auth, conflict handling, recovery, export/import. נתונים חסרים נשארים `unknown/unavailable`. |
| BUG-AUDIT-007 | [ ] | P2 | ליישב סטטוס Per-Distractor Feedback: אם `coverage:features:strict` מוכיח `1704/1704`, לסמן את המשימה הישנה כסגורה/מוחלפת. |
| BUG-AUDIT-008 | [ ] | P2 | לסמן מסמכי audit ישנים כ-historical כדי שלא ייראו כבאגים פעילים. |
| BUG-AUDIT-009 | [ ] | P1 | להוסיף export/report deterministic ללוג Bug Agent כדי שניתן יהיה לראות, לתקן ולנקות באגים בלי טלמטריה מזויפת. |
| BUG-AUDIT-010 | [ ] | P1 | לשמור `svcollege:pwa-offline:strict` כחובה בכל שינוי שמוסיף `data/` או `src/core/` scripts. |
| BUG-AUDIT-011 | [ ] | P1 | להוסיף gate חוסם ל-activity coverage רק אחרי שיש יעד ריאלי ותוכן אמיתי שמאפשר מעבר. |
| BUG-AUDIT-012 | [ ] | P2 | להריץ browser visual smoke/overlap אחרי כל שינוי UI, לא רק בדיקות יחידה. |
| BUG-AUDIT-013 | [ ] | P2 | להוסיף smoke בדפדפן לטאב Trace/Build/Bug עבור מושגים מייצגים מכל batch activity חדש. |
| BUG-AUDIT-014 | [ ] | P1 | להריץ פיילוט 10 תלמידים אמיתי ולמדוד D1/D7, stuck events, mastery movement ו-promotion outcomes. |
| BUG-AUDIT-015 | [ ] | P1 | לאחד מקור אמת תפעולי: `EXECUTION_TASKS.md` לביצוע שוטף, `MASTER_PLAN.md` ל-backlog, ולסמן סעיפים legacy/historical כדי למנוע status drift. |
| BUG-AUDIT-016 | [ ] | P2 | לרכז או לגזור אוטומטית את גרסת cache וציפיות assets מתוך `service-worker.js`/`index.html` במקום לעדכן כמה קבצים ידנית. |
| BUG-AUDIT-017 | [ ] | P1 | להוסיף browser smoke דטרמיניסטי למושג אחד לפחות מכל batch activity חדש ב-Lessons 11-17, SQL/ORM וב-foundation/tooling, כולל Trace/Build/Bug לא ריקים. |
| BUG-AUDIT-018 | [ ] | P2 | לרכז metadata של דוחות generated או לגזור תאריך מריצת release אחת, כדי שדוחות עם מספרים עדכניים לא יישארו עם תאריך ישן. |
| BUG-AUDIT-019 | [ ] | P1 | לפני release/commit ליצור inventory של קבצים מיועדים, להפריד generated artifacts, ולא לשחרר מתוך worktree מלוכלך ללא בעלות ברורה. |
| BUG-AUDIT-020 | [V] | P1 | `questions:activity-authoring-plan:strict` הוקשח ונכשל עכשיו על `ready:false`; פערי Trace/Build/Bug לא יכולים להיראות ירוקים לפני authoring ידני אמיתי. |
| BUG-AUDIT-021 | [ ] | P0 | לכתוב/לסקור ידנית MC/Fill במקום להסתמך על legacy generated bank; אחרי תת-batch שלישי של Lesson 13 `questions:coverage-targets` מציג אמת: `491` פערי MC ו-`486` פערי Fill ידניים. |
| BUG-AUDIT-022 | [ ] | P2 | אחרי סגירת Finish Line 1 לפרק payload frontend: לצמצם stylesheet גלובלי גדול ו-core chunk גדול באמצעות חלוקת styles/modules לפי feature עם smoke tests. |
| BUG-AUDIT-023 | [ ] | P0 | לתקן overclaim בסטטוס התוכנית: `BRUTAL_MASTER_PLAN_AUDIT.md` מצא עכשיו `239` פריטים, מתוכם `16` DONE, `7` PARTIAL, `216` NOT DONE ו-`0` FAKED. אין להציג Phase כ-100% עד שכל פריט PARTIAL מקבל ראיה אמיתית או מסומן מחדש. |
| BUG-AUDIT-024 | [ ] | P0 | להוריד ל-PARTIAL/NOT DONE כל `[V]` שתלוי בפיילוט, D1/D7, real usage, pricing, post-exam review או learner outcome אמיתי עד שיש נתוני אמת. |
| BUG-AUDIT-025 | [ ] | P1 | להפוך את `brutal-master-plan-audit` לשער קבוע לפני release: כל `FAKED` חייב להיות 0, וכל `PARTIAL` חייב להיות מוצדק עם owner וקריטריון סגירה. |
| BUG-AUDIT-026 | [ ] | P1 | למנוע drift בזמן batch חלקי: cache version, HTML script version, service-worker tests ודוחות smoke צריכים להיגזר ממקור אחד או להיבדק ב-gate אחד. |
| BUG-AUDIT-027 | [ ] | P0 | לנקות כל gate ישן שעדיין מציג legacy generated/seeded כשווה ערך לחומר ידני; release לא ירוק עד ש-`validate:strict` ו-`questions:coverage-targets:strict` משקפים ידני בלבד. |
| BUG-AUDIT-028 | [V] | P0 | נוספה ומתעדכנת `MANUAL_QUESTION_AUTHORING_PLAN.md/json`; אחרי תת-batch שלישי של Lesson 13 נותרו `25` באטצ'ים, `491` פערי MC ו-`486` פערי Fill; owner/reviewer נשארים `unknown/unavailable` עד הקצאה אמיתית. |
| BUG-AUDIT-029 | [ ] | P1 | להוציא את `data/questions_bank_seeded.js` מהנתיב הפעיל לגמרי: להשאיר כארכיון legacy או למחוק אחרי שהפריטים השימושיים נכתבו מחדש ידנית. |
| BUG-AUDIT-030 | [V] | P1 | נוסף `guard:no-auto-questions` שמוודא שאין פונקציות runtime מסוג `generatedMC`, `makeCodeFill`, `ensureSeededBank`, שאין סקריפטי seed פעילים, וש-`questions_bank_seeded.js` נשאר ארכיון לא פעיל בלבד. |
| BUG-AUDIT-031 | [V] | P0 | נכתבו ידנית `27` MC ו-`18` Fill ל-`lesson_25` ו-`ai_development`; `svcollege:readiness:release`, `svcollege:tab-matrix:strict`, `svcollege:critical-flows:strict`, `svcollege:command-center:strict`, `svcollege:student-export:strict` ו-`exam:mock-variants:strict` ירוקים בלי generated bank. |
| BUG-AUDIT-032 | [ ] | P1 | לבצע reconciliation קבוע לדוחות ישנים מול live gates: דוח Kimi 2.6 הראה שחלק מ-`AUDIT_2026` מיושן אחרי Vite/PWA/a11y/theme/tests, ולכן אין לסמן בעיה כפתוחה בלי פקודת אימות עדכנית. |
| BUG-AUDIT-033 | [ ] | P1 | לסמן דוחות audit ישנים כ-`historical/superseded` או להוסיף בראשם מצב עדכני, כדי שלא ימשיכו לספור `683` remediation issues או `0 tests` אחרי שהשערים החיים אומרים אחרת. |
| BUG-AUDIT-034 | [ ] | P1 | לתקן תאריכי generated reports שנתקעים על `2026-04-28`; כל דוח שנכתב מחדש חייב לשקף run date/version אמיתיים או metadata שמצהיר שהוא historical. |
| BUG-AUDIT-035 | [ ] | P1 | להוסיף source-of-truth report שמפריד בין Feature Coverage, Manual Question Coverage, SVCollege Release Readiness, Activity Coverage ו-Historical Audit כדי למנוע סתירות בין דוחות. |
| BUG-AUDIT-036 | [ ] | P2 | להוסיף SEO backlog לא חוסם אחרי Finish Line 1: OG tags, JSON-LD, canonical/social metadata ובדיקת preview, בלי לעכב את הכנת המבחן. |
| BUG-AUDIT-037 | [ ] | P2 | להחליט telemetry אמיתי: Bug Agent local-only נשאר ברירת מחדל; Sentry/Plausible/analytics רק עם חשבון אמיתי, privacy notice, PII policy ואישור מפורש. |
| BUG-AUDIT-038 | [V] | P0 | נוסף `questions:blocker-map:strict` כדי למנוע ערבוב בין מודולים דומים; אחרי authoring ידני ל-`lesson_25` ו-`ai_development`, הדוח מציג `releaseQuestionDeficit: 0`, `strictMcDeficit: 0`, `strictFillDeficit: 0`. |
| BUG-AUDIT-039 | [ ] | P0 | להשלים את הכיסוי הידני המלא שנותר לפי `MANUAL_QUESTION_AUTHORING_PLAN.md`: `1,401` MC ידניות ו-`900` Fill ידניות עדיין נדרשות כדי ש-`questions:coverage-targets:strict` יהיה ירוק לכל 568 המושגים. `FINISH_LINE_PRERELEASE_REPORT.md` מאשר שזה החסם היחיד מתוך `18` שערי pre-release. |
| BUG-AUDIT-040 | [V] | P1 | נוסף `finish-line:pre-release` / `FINISH_LINE_PRERELEASE_REPORT.md` שמריץ no-auto-questions, סריקת native-random, QA, SVCollege gates, tests ו-build ברצף ומדווח `17/18` ירוק בלי לעצור בכשל הראשון. |
| BUG-AUDIT-041 | [ ] | P1 | לבצע security inventory לכל `.innerHTML`/`document.write` שמקבל data-originated strings. להתחיל מ-Pair Match, Achievements, Reflections, feedback ו-PDF print; לתקן רק עם `esc(...)`, DOM API או sanitizer קיים, ולהוסיף gate סטטי שמונע regression. |
| BUG-AUDIT-042 | [ ] | P1 | להוסיף CSP מדורג: קודם report-only/בדיקת תאימות ל-PWA, fonts ו-inline scripts קיימים; אחר כך להקשיח בלי לשבור local/offline learning. לא לסמן DONE בלי browser smoke. |
| BUG-AUDIT-043 | [ ] | P1 | להגדיר trust boundary ל-localStorage: progress מקומי הוא עזר לימודי בלבד, לא ראיית ציון/מאסטר מאומתת. לא להשתמש ב-HMAC עם מפתח hardcoded כ"פתרון אבטחה"; אימות אמיתי רק עם backend/auth אמיתי. |
| BUG-AUDIT-044 | [ ] | P1 | להשלים a11y/keyboard hardening לפי live UI: skip-to-content, focus trap במודלים, return focus, Arrow navigation בתפריטי עץ ורשימות, ו-reduced-motion לכל transition/animation. |
| BUG-AUDIT-045 | [ ] | P1 | להוסיף mobile/visual smoke חובה אחרי שינויי chrome/menus: שיעור 11, בנק שאלות, תפריט תצוגה שמאלי, sidebar ימני, focus mode ו-scroll rail. |
| BUG-AUDIT-046 | [ ] | P2 | אחרי Finish Line 1 בלבד: להמשיך פירוק bundle לפי view/feature עם dynamic import, בלי להחזיר `questions_bank_seeded.js` או טעינת data שאינה נדרשת למסך הנוכחי. |
| BUG-AUDIT-047 | [ ] | P2 | אחרי התייצבות UI: לפצל/לצמצם CSS לפי feature, למדוד bundle size ב-build, ולהוסיף threshold מדיד במקום טענה כללית על "500KB CSS". |
| BUG-AUDIT-048 | [ ] | P1 | להוסיף Offline UX indicator ודוח cache effectiveness מקומי בלבד: מצב offline, assets חסרים, cache version, last update. אין analytics חיצוני בלי privacy policy ואישור מפורש. |
| BUG-AUDIT-049 | [ ] | P1 | להפוך את דוחות Kimi/AUDIT חיצוניים ל-input בלבד: כל claim חייב live gate עדכני. הדוח `f5798c` כולל טענות מיושנות על Vite, a11y, seeded bank ומספרי tests ולכן לא ייספר כמקור אמת ללא אימות. |
| BUG-AUDIT-050 | [ ] | P2 | להוסיף Playwright E2E production-like לזרימות ליבה: פתיחת שיעור, מעבר מושג, פתיחת בנק שאלות, מענה MC/Fill ידני, שמירת התקדמות, חזרה לבית וטעינה offline. |
| BUG-AUDIT-051 | [V] | P1 | צומצמה שכבת התכנון ל-`docs/plans/` עם אינדקס קנוני, Finish Line, מדיניות תוכן ידנית, backlog דחוי, agent handoff ומפת הגירה `05_LEGACY_DOC_MIGRATION.md`; קבצי legacy ישנים נמחקו רק אחרי שהתוכן העדכני והרלוונטי שלהם נשמר או סומן כמיושן, ובלי למחוק דוחות/gates חיים. |

---

## 1. תמונת מצב נוכחית

| מודול | מושגים | יעד MC (×3) | יעד Fill (×2) | סטטוס |
|---|---:|---:|---:|---|
| `lesson11` — Arrays/Functions/Scope | 28 | 84 | 56 | 🔄 חלקי |
| `lesson12` — Array Methods | 12 | 36 | 24 | ⏳ |
| `lesson13` — DOM/OOP/Storage | 32 | 96 | 64 | 🔄 חלקי |
| `lesson15` — Errors/Closure/Forms | 18 | 54 | 36 | ⏳ |
| `lesson16` — Async/Fetch/Promises | 27 | 81 | 54 | ⏳ |
| `lesson17` — REST/CRUD/Express בסיסי | 38 | 114 | 76 | ⏳ |
| `lesson18` — Auth/Express מתקדם | 12 | 36 | 24 | ⏳ |
| `lesson19` — Node File System | 50 | 150 | 100 | ⏳ |
| `lesson20` — MongoDB/Mongoose | 30 | 90 | 60 | ⏳ |
| `lesson21` — React Vite | 23 | 69 | 46 | ⏳ |
| `lesson22` — useState/Hooks | 18 | 54 | 36 | 🔄 חלקי |
| `lesson23` — Parent↔Child Comms | 22 | 66 | 44 | ⏳ |
| `lesson24` — useEffect/useRef/useMemo | 16 | 48 | 32 | ⏳ |
| `lesson25` — React Router | 14 | 42 | 28 | ⏳ |
| `lesson26` — Context API | 30 | 90 | 60 | ⏳ |
| `lesson27` — TypeScript & React+TS | 20 | 60 | 40 | ⏳ |
| `workbook_taskmanager` | 12 | 36 | 24 | ⏳ |
| `ai_development` | 12 | 36 | 24 | ⏳ |
| `react_blueprint` | 10 | 30 | 20 | ⏳ |
| **סה"כ** | **434** | **1,302 MC** | **868 Fill** | **2,170 שאלות** |

נקודת התחלה (מוטמעת ב-`data/questions_bank.js`): **44 MC + 17 Fill = 61 שאלות**.
**פער:** 1,258 MC + 851 Fill נוספות.

---

## 2. תבניות שאלות (Templates) — 5 דפוסים שמתאימים לכל מושג

עבור כל מושג `C` בשיעור `L` עם הסברים ברמות `grandma..professor`, ובדרך כלל גם `codeExample`:

### תבנית A — "תיאור" (describe)
> שאלה: *"איזה מהמשפטים מתאר נכון את `<C>` ברמת `<level>`?"*
> נכון: ההסבר של `C` ברמה זו · Distractors: הסברים של 3 מושגים אחרים באותה רמה.

### תבנית B — "התאמת שם" (name-match)
> שאלה: *"איזה מושג מתאים להגדרה הבאה: `<explanation>`?"*
> נכון: שם המושג · Distractors: 3 שמות של מושגים אחרים.

### תבנית C — "תוצאה / חיזוי" (predict-output)
> שאלה: *"מה יודפס?"* + בלוק קוד
> אופציות: 4 ערכים סבירים. דורש הבנת ביצוע.

### תבנית D — "Why" (rationale)
> שאלה: *"למה לא עושים את זה? / למה משתמשים ב-X?"*
> תשובה נכונה מסבירה את העיקרון. Distractors הם תפיסות שגויות שכיחות.

### תבנית E — "Code Fill" (השלמה)
> מציג את `codeExample` של המושג עם טוקן אחד מוסתר (`____`).
> שלוש שיטות לבחירת הטוקן:
> 1. שם המושג עצמו אם מופיע בקוד (`useState`, `map`, `filter`...)
> 2. מילת מפתח מרשימה לבנה (`async`, `await`, `return`, `const`...)
> 3. מזהה ייחודי (4-18 תווים) שאינו מילה שמורה כללית.

---

## 3. רמת הקושי לפי שאלה (1-6)

| רמה | פרסונה | אופי השאלה | סגנון Distractors |
|---:|---|---|---|
| 1 | 👵 סבתא | "מה זה X בכלליות?" — מטפורה יומיומית | מטפורות מוטעות אחרות |
| 2 | 🧒 ילד | "X משמש ל...?" | תפקידים אחרים מתחום קרוב |
| 3 | 🪖 חייל | זיהוי בקוד פשוט | מתודות דומות באותה משפחה |
| 4 | 🎓 סטודנט | מדוע / איך / מתי | תפיסות שגויות שכיחות |
| 5 | 💻 ג'וניור | חיזוי תוצאה / debug | שגיאות שמתכנת מתחיל עושה |
| 6 | 🔬 פרופ' | פרטים פנימיים (Event Loop, V8, immutability) | פרטים סמויים מוטעים |

לכל מושג צריך לפחות שאלת `MC` אחת בכל אחת מ-6 הרמות → **6 שאלות מינימום**, אבל נסתפק ביעד 3 (אחד לכל זוג רמות 1-2 / 3-4 / 5-6).

---

## 4. תוכנית פאזות

### פאזה 1 — Core Foundation (שבוע 1) · יעד: 100% כיסוי לשיעורים 11+13
המושגים הבסיסיים ביותר. `lesson_11` (Array, map, filter, reduce, push/pop, spread, arrow function...) ו-`lesson_13` (DOM, getElementById, querySelector, addEventListener, localStorage...).
**60 מושגים → 180 MC + 120 Fill = 300 שאלות**.

### פאזה 2 — Async & Backend (שבוע 2) · יעד: 100% ל-15, 16, 17, 18
שגיאות, Promise, fetch, async/await, Express, REST, middleware, MongoDB.
**95 מושגים → 285 MC + 190 Fill**.

### פאזה 3 — React Core (שבוע 3) · יעד: 100% ל-21, 22, 23, 24
JSX, props, useState, immutability, useEffect, useRef, useMemo.
**79 מושגים → 237 MC + 158 Fill**.

### פאזה 4 — Advanced (שבוע 4) · יעד: 100% ל-12, 19, 20, 25, 26, 27
Array methods עומק, Node fs, MongoDB, Router, Context, TypeScript.
**164 מושגים → 492 MC + 328 Fill**.

### פאזה 5 — Workbooks (שבוע 5) · יעד: 100% למודולים הרוחביים
TaskManager, AI Development, React Blueprint.
**34 מושגים → 102 MC + 68 Fill**.

---

## 5. סדר עדיפויות בתוך כל פאזה

לכל מושג יש "ערך לימודי" שמתבטא בכמה הוא:

1. **קשור לעוד מושגים** (למשל `useState` חיוני להבנת `useEffect`)
2. **שכיח בריאיונות עבודה / צה"ל / מבחנים**
3. **טעות נפוצה אצל מתחילים** (immutability, scope, async)

המושגים הבאים מקבלים עדיפות עליונה (📌 priority list):

```
lesson_11: Array, Index, map, filter, reduce, spread, arrow function, scope, By Reference, By Value
lesson_13: DOM, getElementById, querySelector, addEventListener, innerHTML, localStorage, JSON.stringify
lesson_15: try, catch, throw, Closure
lesson_16: Promise, async, await, fetch, then, catch
lesson_17: GET, POST, PUT, DELETE, Route, Middleware, Status Code, REST
lesson_20: Schema, Model, find, insertOne, Document, Collection
lesson_22: useState, Hook, immutability
lesson_24: useEffect, dependency array, useRef, useMemo
lesson_25: BrowserRouter, Routes, Route, Link, useNavigate, useParams
lesson_26: createContext, Provider, useContext
lesson_27: type, interface, enum, string, number, boolean, void
```

---

## 6. כללי עבודה (Conventions)

### מבנה רשומה ב-`data/questions_bank.js`

```js
// MC
{
  id: "mc_<topicShort>_<NNN>",      // מזהה ייחודי
  topicId: "topic_<topicShort>",     // לקישור למדריך מקוצר
  conceptKey: "lesson_X::ConceptName", // ⚠ חובה למפות לרמה
  level: 1..6,                        // קושי
  question: "...",                    // טקסט עם \n אם צריך
  options: ["...", "...", "...", "..."],  // 4 אופציות
  correctIndex: 0..3,
  explanation: "..."                  // יוצג בפידבק
}

// Fill
{
  id: "fill_<topicShort>_<NNN>",
  topicId: "topic_<topicShort>",
  conceptKey: "lesson_X::ConceptName",
  level: 1..6,
  code: "...____...",                 // השתמש ב-____ למקום שצריך להשלים
  answer: "map",                      // צריך להיות ייחודי בקוד
  hint: "מתודה ש...",
  explanation: "..."
}
```

### `conceptKey` חייב להיות תואם בדיוק
מפתח התוצאה הוא `${lesson.id}::${concept.conceptName}` כמו שמופיע בקובץ הנתונים (case-sensitive, רווחים נכללים). דוגמה: `"lesson_11::arrow function"`.

### Distractors איכותיים
- **3** distractors בכל MC (סה"כ 4 אופציות)
- כל distractor חייב להיות *סביר* — תפיסה שגויה אופיינית ולא נונסנס
- אסור distractor שזהה תוכנית לתשובה הנכונה
- אסור שני אופציות שאומרות אותו דבר במילים שונות

### Code Fill — בחירת הטוקן
- מומלץ שהטוקן יהיה השם של המושג (אם מופיע בקוד)
- אורך התשובה: **2-18 תווים**
- חייב להופיע פעם אחת בלבד בקוד (אחרת השוואה לא חד-משמעית)

---

## 7. תהליך כתיבה ידנית בלבד

סעיף האוטומציה הישן מבוטל. אסור ליצור שאלות בעזרת seed script, prompt ל-LLM, generator או הרחבת תוכן אוטומטית. כל שאלה שנכנסת לבנק הפעיל חייבת להיכתב ידנית מול חומר השיעור, לקבל `conceptKey` אמיתי, לקבל feedback לכל אפשרות MC, ולעבור validation/QA לפני commit.

### שלב A — בחירת מושג מתוך תוכנית authoring
פותחים את [MANUAL_QUESTION_AUTHORING_PLAN.md](MANUAL_QUESTION_AUTHORING_PLAN.md), בוחרים את המושגים הראשונים לפי סדר P0, וקוראים את חומר השיעור המקורי לפני כתיבה.

### שלב B — כתיבה ידנית ובדיקה קפדנית
כותבים ידנית 3 MC ו-2 Fill לכל מושג חסר, בלי placeholder ובלי תשובה שדולפת בקוד. אם אין מספיק ידע מקור, מסמנים `unknown/unavailable` ולא ממלאים תוכן מומצא.

### שלב C — סקריפט וולידציה
לפני merge — לוודא:
- כל `conceptKey` קיים בנתונים
- `correctIndex` בין 0-3
- `answer` של fill מופיע בדיוק פעם אחת ב-`code`
- אין IDs כפולים

### שלב D — Coverage Dashboard
מצב הכיסוי כבר נחשף ב-UI: במפת הידע, ליד כל מושג, יש תגי `🅰️ N` ו-`✍️ M`. **הסטטוס "0" צבוע אפור** — סימן ויזואלי שזהו מושג שעוד לא כוסה. אפשר לסנן לפי "❓ לא נבחנו" כדי לראות בדיוק את החסרים.

---

## 8. KPIs להצלחה

| KPI | יעד | מדידה |
|---|---|---|
| כיסוי MC | ≥ 3 לכל מושג | `bankCountsFor` ≥ 3 בכל 434 |
| כיסוי Fill | ≥ 2 לכל מושג שיש לו `codeExample` | `bankCountsFor` ≥ 2 |
| איכות (False positives) | ≤ 2% | המושג עולה רמה למרות שהמשתמש לא הבין |
| מגוון רמות | ≥ 1 שאלה ברמה 1, 1 ברמה 3-4, 1 ברמה 5-6 | scan ידני |
| זמן תגובה ממוצע | < 30 שניות לשאלה | metric בעתיד |

---

## 9. Definition of Done לכל פאזה

✅ כל המושגים בפאזה מקבלים ≥3 MC ו-≥2 Fill
✅ ריצת סקריפט הוולידציה ללא שגיאות
✅ סבב QA ידני: עברתי על 10% מהשאלות והן הגיוניות
✅ הוספת הפאזה ל-`questions_bank.js` ו-בדיקה שאין שבירת JSON
✅ צילום מסך ממפת הידע — אין יותר מושגים עם 🅰️ 0 ✍️ 0 בתוך הפאזה

---

## 10. Roadmap זמני (אופציונלי)

| חודש | פאזות | תוצר |
|---|---|---|
| חודש 1 | פאזה 1+2 | 600 שאלות, JS+Backend מכוסים |
| חודש 2 | פאזה 3+4 | +730 שאלות, React+TS מכוסים |
| חודש 3 | פאזה 5 + פוליש | +170 שאלות, וולידציה מלאה |

**יעד סופי:** מאגר של **2,170 שאלות איכותיות**, שמכסות 100% מהמושגים, ומאפשרות לתלמיד להגיע לרמה 7 (מאסטר) בכל מושג בלי שאלות שנוצרות אוטומטית.

---

## 11. נספח מוזיאון — חומרים חסרים להשלמה

> **סטטוס סוף יום 2026-04-28:** המוזיאון כבר קיבל שערים, אגפים, דפי שכבות, Full-Stack, מוצר, טעויות, חוזים, Video Studio, דרכון תלמיד, ואגף AI מורחב. הרשימה כאן היא backlog תוכן/חוויה להשלמה בהמשך, בלי להוסיף עובדות לא מבוססות ובלי שימוש ב-`Math.random()`.

### 11.1 חומרים חסרים ברמת תוכן ומקורות

| עדיפות | חומר חסר | מה צריך להשלים | למה זה חשוב |
|---|---|---|---|
| P0 | מקור לכל טענה היסטורית | לכל שנה/ראשון/התפתחות להוסיף מקור או ניסוח מסויג | לא לנעול במוזיאון עובדות לא מדויקות |
| P0 | הבחנה בין "ראשון" לפי הקשר | AI, מודל מסחרי, מודל מקומי, שפה, framework, runtime | למנוע בלבול בין קטגוריות שונות |
| P0 | מילון מושגים אחיד | אותו ניסוח ל-model, agent, workflow, RAG, runtime, framework, API, schema | לשמור עקביות בין אגפים |
| P1 | מפת מקורות גלויה | אזור Sources לכל אגף, לא רק אגף AI | תלמיד צריך להבין על מה החומר נשען |
| P1 | שאלות בדיקה לכל אולם | 1-3 שאלות הבנה קצרות לכל אולם ותת-אולם | להפוך צפייה ללמידה פעילה |
| P2 | גרסאות "לפני מבחן" | תקציר קצר לכל אולם: מה לזכור, מה מבלבל, טעות נפוצה | שימוש מהיר לפני בחינה |

### 11.2 אגף שכבות המחשב — חסרים לפי בלוק

| בלוק | חסר להשלים | חוויה חסרה |
|---|---|---|
| חשמל | הרחבת טרנזיסטור, שערים לוגיים, מתח/זרם/אות | סימולטור מתג שמראה 0/1 ו-flow לפעולה |
| ביט / Byte | ייצוג מספרים, תווים, encoding, overflow בסיסי | ממיר ביטים דטרמיניסטי עם מצב "מה השתנה" |
| קוד מכונה | opcode, register, memory, instruction cycle | X-Ray של פקודה אחת עד שינוי בזיכרון |
| שפה | syntax, compiler/interpreter, runtime, GC | תרשים "מה קורה ל-JS לפני שהוא רץ" |
| Framework | למה נוצר framework ומה הוא מסתיר | השוואת vanilla JS מול React/Node/Next באותה פעולה |
| אפליקציה | מסך, נתונים, פעולה, state, persistence | מסלול לחיצה אחת מה-UI עד DB וחזרה |

### 11.3 מוזיאון שפות התכנות — חומרים חסרים

1. להשלים כרטיס לכל שפה/תחנה בשושלות: מה הבעיה שפתרה, מה המחיר, לאן התפתחה, ומה נשאר ממנה היום.
2. להוסיף השוואות קצרות: `C` מול `Rust`, `JavaScript` מול `TypeScript`, `React` מול vanilla DOM, `SQL` מול document DB.
3. להוסיף "חדר פשרות": מהירות, שליטה, בטיחות, קריאות, ניידות ופרודוקטיביות.
4. להוסיף דוגמאות קוד קטנות לכל משפחת שפות, רק מתוך חומר שמאומת או חומר קורס.
5. להוסיף מסלול "איך שפה הופכת ל-framework ואז למוצר".

### 11.4 אגף Full-Stack — חומרים חסרים לפי תחום מקצועי

| תחום | חומרים חסרים | תוצר נדרש |
|---|---|---|
| UI / HTML / CSS | semantic HTML, layout, responsive, accessibility, states | אולם UI עם before/after ותרשים DOM |
| Browser Runtime | event loop, DOM update, storage, rendering | סימולטור פעולה בדפדפן |
| Async / Network | promise, fetch, HTTP lifecycle, loading/error states | תרשים request/response מלא |
| Node / npm / modules | package, module, filesystem, environment | אולם "מה קורה כשמריצים npm" |
| API / HTTP / Express | route, middleware, status code, validation, auth boundary | Contract map בין client ל-server |
| Database / MongoDB / Mongoose | schema, collection, document, query, index | תצוגת נתון מה-input עד document |
| React Product | component, props, state, hooks, router, context | מפה של product state לפי feature |
| Quality / Tests / AI Review | unit, integration, smoke, regression, review | מסלול "מה נשבר לפני release" |

### 11.5 אגף מוצר מרעיון להשקה — חומרים חסרים

1. **לפני פיתוח:** תבניות לבעיה, קהל יעד, KPI, scope, wireframe, data model, risk list.
2. **בזמן פיתוח:** פירוט חלוקת עבודה בין Product, UX, Frontend, Backend, Data, QA.
3. **לפני השקה:** checklist ל-build, נגישות, performance, תוכן, שגיאות, security בסיסי.
4. **בזמן השקה:** rollout, ניטור, support, error budget, analytics, feedback loop.
5. **אחרי השקה:** triage באגים, החלטת גרסה, debt, telemetry, שיפור UX.
6. **שדרוג/החלפה:** להפוך את הקריטריונים לכרטיסי החלטה עם דוגמאות מוצריות.

### 11.6 אגף טעויות ו-Debug — חומרים חסרים

| סוג טעות | חסר להשלים |
|---|---|
| Syntax | דוגמאות נפוצות לפי JS/React + סימן זיהוי |
| Runtime | `undefined`, null, reference, type mismatch |
| Scope / Closure | דוגמאות קצרות של משתנה שלא קיים במקום הצפוי |
| Async | race, missing await, promise rejection, loading state |
| React State | mutation, stale state, derived state, dependency array |
| API | 400/401/404/500, CORS, body חסר, endpoint לא נכון |
| Database | schema mismatch, missing field, query לא מחזיר, persistence |
| Release | build failure, env חסר, regression, performance |

### 11.7 אגף חוזים ונתונים — חומרים חסרים

1. להשלים "חוזה" לכל שכבה: function input/output, component props, API body/response, DB schema, validation rules.
2. להוסיף דוגמאות של חוזה שנשבר ומה הסימפטום.
3. להוסיף טבלת "מי הבעלים של החוזה": Frontend, Backend, Database, Product, QA.
4. להוסיף מסלול נתון אחד: input → validation → state → JSON → API → DB → response → render.
5. להוסיף בדיקות חוזה: unit, integration, schema validation, smoke.

### 11.8 אגף AI — חומרים חסרים להמשך

1. להרחיב את גרף ההתפתחות גם ל-RAG, embeddings, vector DB, multimodal, evals ו-guardrails.
2. להוסיף חדר "איך LLM עונה": tokens, context window, attention, inference, hallucination.
3. להוסיף חדר "איך בונים פיצ'ר AI במוצר": prompt, sources, policy, tools, logs, evals.
4. להוסיף הבחנה בין local model, open weights, open source, hosted API ו-commercial product.
5. להוסיף דוגמאות שימוש בקורס: סיכום שיעור, debug, שאלות, בדיקת פתרון, יצירת פרומפט.
6. להשלים טבלת סיכונים: מידע שגוי, פרטיות, הרשאות, עלות, latency, bias.

### 11.9 Video Studio ו-NotebookLM — חומרים חסרים

1. לעבור על כל 63 הסרטונים ולוודא שלכל אחד יש חומר רקע, ידע מקדים, סקריפט, פרומפט והוראות NotebookLM.
2. לוודא שכל כפתור "פתח חומר לסרטון" פותח חלון מתאים באולם הנכון.
3. להוסיף מסלולי סרטונים מסכמים: "לפני מבחן", "Full-Stack end-to-end", "Debug", "AI במוצר".
4. להוסיף שדה "מה התלמיד צריך לענות אחרי הצפייה".
5. להוסיף QA שאין במסמכי הסרטונים תאריכים או טענות שלא מופיעים בקוד/מקורות.

### 11.10 דרכון תלמיד ומסלולי ביקור — חומרים חסרים

| רכיב | חסר להשלים |
|---|---|
| חותמות ביקור | לכל אולם: משימת הבנה + שאלה + תוצר קצר |
| מסלול מתחילים | סדר ביקור פשוט: שכבות → שפה → UI → API → DB |
| מסלול לפני מבחן | רק מושגים, טעויות, שאלות בדיקה וסרטונים קצרים |
| מסלול בניית מוצר | רעיון → UI → API → DB → Tests → Launch |
| מסלול Debug | symptom → layer → contract → fix → test |
| React / Full-Stack | state → component → router → API → DB → release |

### 11.11 חיבורים חסרים בין כל חלקי הפורטל

1. מכל אולם לשיעורים הרלוונטיים.
2. מכל טעות לאולם השורש שמסביר אותה.
3. מכל מושג לבלוק קוד, שאלה, סרטון, ותרגול.
4. מכל תחום Full-Stack לשלב מוצר ולבעל תפקיד בצוות.
5. מכל סרטון לידע מקדים, שאלת בדיקה ותעודת דרכון.
6. מכל חוזה טכני לטעות שנוצרת כשהוא נשבר.

### 11.12 QA ונגישות שחסרים לפני סגירת המוזיאון

| תחום | בדיקה חסרה |
|---|---|
| RTL | כל הכותרות, הטבלאות והתרשימים במובייל |
| Mobile | אין טקסט חורג ואין כרטיסים שנמעכים |
| Keyboard | טאבים, מודלים, כפתורים ומסלולי ביקור נגישים במקלדת |
| Reduced motion | כל animation נעצרת או מצטמצמת |
| Data tests | לכל אגף route, goal, video, diagram ושדות לא ריקים |
| Visual QA | screenshot ידני לכל אגף מרכזי |
| Build/Test | `node --check app.js`, `npm run build`, בדיקת מוזיאון ממוקדת, ואחר כך `npm test` |

### 11.13 סדר עבודה מומלץ להמשך

1. **P0 — Content Safety:** מקור לכל טענה היסטורית וניסוח מסויג לכל "ראשון".
2. **P0 — Cross Links:** לחבר כל אולם לשיעור, שאלה, סרטון ודרכון.
3. **P1 — Full-Stack Depth:** להשלים אולמות עומק לכל תחום מקצועי.
4. **P1 — Debug + Contracts:** להפוך טעויות וחוזים למערכת ניווט אחת.
5. **P1 — Video QA:** לוודא שכל 63 הסרטונים שלמים ומחוברים לחלונות במוזיאון.
6. **P2 — Simulators:** להוסיף סימולטור קטן ודטרמיניסטי לכל שכבה.
7. **P2 — Polish:** בדיקות מובייל, RTL, reduced motion וצילומי מסך.
8. **P2 — Release:** לעדכן גרסה, changelog, ולסגור בדיקות.

### 11.14 עדכון מוזיאון — מסמכי 2026-04-30 ורעיונות נוספים

מקורות שהוטמעו ברשימת המשימות: `/Users/tal/Desktop/חומרים לשיעור/museum-missing-materials-detailed-fa0e5d.md`, `/Users/tal/Desktop/חומרים לשיעור/museum-expansion-recommendations-fa0e5d.md`, `/Users/tal/.windsurf/plans/museum-remaining-wings-improvements-fa0e5d.md`. הפירוט התפעולי נמצא ב-[EXECUTION_TASKS.md](EXECUTION_TASKS.md) תחת `P2 — Museum Expansion Backlog from 2026-04-30 review`.

כללי ביצוע מחייבים:

1. לא מתחילים מוזיאון לפני ש-Finish Line 1 ירוק.
2. כל שאלה, בדיקת צפייה, טענה היסטורית וחומר לימוד במוזיאון נכתבים ידנית ועוברים QA ידני.
3. אין generator, אין seeded fallback, אין נתוני דמו, אין placeholders ואין `Math.random()`.
4. טיפים/המלצות/אתגרים יומיים יהיו דטרמיניסטיים לפי התקדמות התלמיד, לא אקראיים.
5. XP/coins הם תגמול למידה מקומי בלבד; הם לא כסף אמיתי, לא קיצור לציון ולא מחליפים mastery.
6. כל אגף מתקדם חייב dependency graph: XP נדרש + מושגי יסוד שחייבים להכיר לפני פתיחה.
7. כל "ראשון", תאריך, התפתחות טכנולוגית או טענה היסטורית מקבלים מקור או `unknown/unavailable`.

Backlog שהועלה ל-`EXECUTION_TASKS.md`:

| תחום | מה נוסף |
|---|---|
| שער המוזיאון | מפה אינטראקטיבית, מסלולים מומלצים, dashboard התקדמות, חיפוש, tip queue דטרמיניסטי |
| XP וגישה | טאבים לכל מוזיאון, דמי כניסה ראשוניים, דמי אגף נוספים, פתיחה לפי XP + mastery |
| שכבות המחשב | מתג חשמלי, שערים לוגיים, ממיר ביטים, טיפוסים, X-Ray פקודה, קוד עד CPU, חדר פשרות |
| שפות תכנות | כרטיסי שושלות מלאים, חדר פשרות, השוואות ישירות, מסלול משפה למוצר |
| Full-Stack | אולמות עומק ל-UI, Browser, Async, Node, API, DB, React, Quality/Tests/AI Review |
| מוצר | תבניות לפני/בזמן/לפני השקה/אחרי השקה, rollout, telemetry וסימולטור מוצר |
| טעויות ו-Debug | סימני זיהוי לכל סוג טעות ו-Root Cause Simulator |
| חוזים ונתונים | חוזי function/component/API/DB/validation, בעלות חוזים, מסלול נתון מלא, Contract Breaker |
| AI | RAG, LLM internals, AI feature, סיכונים, סוגי מודלים ודוגמאות מהקורס |
| אגפים חדשים | DevOps, Security, Performance, Design Systems |
| Video Studio | QA ל-63 סרטונים, מסלולי צפייה, שאלות צפייה ידניות, הערות, המלצות וסטטיסטיקות מקומיות |
| דרכון תלמיד | חותמות, מסלולים, גלריה, תעודות, מצב לפני מבחן ואתגרים דטרמיניסטיים |
| קישורים | כל אולם מחובר לשיעור, שאלה, סרטון, תרגול, דרכון ושורש טעות |
| QA | RTL, מובייל, keyboard-only, reduced motion, visual smoke, data-shape tests, build/test gates |

רעיונות נוספים שנוספו לתוכנית:

1. **מסלול טעות למוזיאון:** תשובה שגויה בשיעור מפנה לאולם שמסביר את שורש הבלבול.
2. **Museum Minimal Mode:** מצב קריאה חסכוני עם breadcrumb, מושג, מקור וקישור חזרה לשיעור.
3. **Evidence Drawer:** פאנל מקורות לכל אולם עם תאריך בדיקה, סוג מקור ורמת ודאות.
4. **Dependency Unlock Graph:** גרף שמראה אילו מושגי יסוד ו-XP פותחים כל אגף מתקדם.
5. **Teacher Museum Trail:** מסלול שמורה יכול להקצות לפי חולשה אמיתית של תלמיד.
6. **Offline Expedition Pack:** חבילת מוזיאון אופליין למסלול אחד עם תרשימים, סרטונים ושאלות ידניות בלבד.
7. **Before/After Debug Wall:** קיר באגים שמראה סימפטום, contract שנשבר, תיקון ובדיקה.
8. **Source Freshness Review:** תור סקירה לטענות טכניות/היסטוריות שעלולות להתיישן.

---

## נספח — קובץ ייצוא ל-JSON נטו (לצורכי עריכה חיצונית)

הקובץ `data/questions_bank.js` הוא JS module. אם תרצה לערוך ב-VS Code עם תמיכת JSON שלמה, הפק קובץ `.json` נטו:

```bash
node -e "console.log(JSON.stringify(require('./data/questions_bank.js'), null, 2))" > questions_bank.json
```

(כרגע המודול חושף `var QUESTIONS_BANK` שטעון בדפדפן; להפיק JSON נטו תחילה יש להמיר ל-`module.exports`).
