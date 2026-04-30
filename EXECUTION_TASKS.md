# LumenPortal — רשימת משימות ביצוע מלאה

> מבוסס על: [SPEC_AND_MASTER_PLAN.md](SPEC_AND_MASTER_PLAN.md)
> סטטוס מתעדכן בכל שלב
> תאריך התחלה: 2026-04-27

## 🚦 מקרא

- `[ ]` — לא בוצע
- `[V]` — בוצע (✅)
- `[~]` — בעבודה (🚧)
- `[!]` — חסום (🚫)
- `[-]` — נדחה / לא רלוונטי (⏸️)

---

## 📊 סיכום התקדמות

| Phase | בוצע / סך | אחוז |
|---|:-:|:-:|
| Finish Line 1: SVCollege Full Portal Coverage | 143/144 | **חסום — manual questions** 🚫 |
| Phase 0: Status (DONE) | 25/25 | 100% ✅ |
| Phase 1: Foundation | 60/62 | **97%** 🚧 |
| Phase 2: Core Learning | 70/70 | **100%** ✅ |
| Phase 3: Intelligence + Sync | 36/41 | **88%** 🚧 |
| Phase 4: Scale + Community | 22/28 | **79%** 🚧 |
| Phase 5: Quality Governance + Rebaseline | 39/39 | **100%** ✅ |
| Phase 6: Learning Evidence + Productization | 35/36 | **97%** 🚧 |
| Phase 7: Learning OS + Outcome Scale | 48/48 | **100%** ✅ |
| Phase 8: XP Economy + Experience Store | 54/54 | **100%** ✅ |
| Phase 9: Exam Intelligence + Reliability Hardening | 40/40 | **100%** ✅ |
| Phase 10: Exam OS v2 + Content Factory | 41/41 | **100%** ✅ |
| **TOTAL** | **613/627** | **98% — לא release-ready** |

> **עדכון אמת 2026-04-30:** המספרים ההיסטוריים מעל נשמרים לצורך רצף, אבל אינם מקור release truth. מקור האמת הנוכחי הוא השערים: Finish Line 1 חסום עד ש-`questions:coverage-targets:strict`, `svcollege:readiness:release`, `svcollege:tab-matrix:strict`, `svcollege:critical-flows:strict`, `svcollege:command-center:strict`, `svcollege:student-export:strict`, `exam:mock-variants:strict` ו-`svcollege:console-gate:strict` ירוקים ללא generated/seeded bank.

### Finish Line 1 Override — 2026-04-28

היעד הראשון עכשיו הוא **כיסוי מלא של חומר SVCollege בכל הפורטל: כל השיעורים, כל מצבי התרגול, כל הטאבים, כל התפריטים, וכל מסכי הסיכום**. כל הרחבות המוזיאון, AI, קהילה, mobile, Teacher Dashboard ופיצ'רי פרימיום הן עדיפות שנייה עד ש-Finish Line 1 ירוק.

### Exam Priority Lock — 2026-04-28

עדיפות ראשונה מוחלטת עד המבחן: **100% כיסוי של קורס Full Stack בכל הטאבים**. אין להתחיל או למזג משימות Priority 2 עד שכל מודולי הקורס, כל הטאבים, כל מצבי התרגול וכל בדיקות ה-smoke ירוקים. מצב מדיד נוכחי: `100%`, `15/15 covered`, `0 partial`, `0 gaps`, `0 release blockers`, `225/225 module×tab cells`, `0 tab gaps`, desktop + mobile browser smoke passed, `qa:questions:strict ready:true`, `validate:strict` density gaps `0/568`.

### Parallel Work Mode — 2026-04-28

רכבת המיזוג המלאה מוקפאת כרגע. **SQL/ORM, Auth/Security, Next.js, Nest.js, DevOps, AI Engineering, Design Systems והמוזיאון כבר מוזגו/חוברו**, והעבודה ממשיכה ב-QA Finish Line 1 אחד בכל פעם כדי למנוע דריסות. העבודה השוטפת כאן מתמקדת ב-tab health, readiness, quality gates, תכנון ובדיקות חיבור.

### Parallel Repair Mode — 2026-04-29

המצב עודכן: המשתמש ביטל עבודה מקבילה מחשש להתנגשויות. **Session A — Term Clarity** ו-**Session B — Prerequisite Gates** מוזגו ל-`main`; מעכשיו אין לפתוח סשנים מקבילים בלי בעלות קבצים קשיחה ואישור חדש. המשך העבודה יתבצע סדרתית על `main` או branch יחיד.

### XP Economy + Store Plan — 2026-04-29

נוספה תוכנית חדשה: [XP_REWARD_STORE_MASTER_PLAN.md](XP_REWARD_STORE_MASTER_PLAN.md). היא מגדירה 100 רמות XP לא לינאריות, Coins שמתקבלים מפעולות למידה, חנות חוויות, נעילת אזורי מוזיאון חווייתיים, ושער רמה 100 שמחייב שליטה מלאה בכל המושגים ופתרון קטעי קוד. היישום הוא **Priority 2**: לא חוסם את Finish Line 1 ולא ינעל חומר חובה למבחן.

### Forward Improvement Plan — 2026-04-29

נוספה Phase 9: **Exam Intelligence + Reliability Hardening**. ההיגיון: המערכת כבר רחבה, ולכן השיפור הבא הוא לא עוד אגף אלא מנגנון שמוודא שהתלמיד לא מתרגל כפילויות, מתקדם משאלה קלה לקשה, מקבל מסלול יומי מדויק, וכל טאב עובד במובייל ובדסקטופ. משימות Phase 9 הן Priority 0/1 עד המבחן; פיצ'רי חנות/מוזיאון נשארים Priority 2.

### Post-Exam Forward Plan — 2026-04-29

נוספה Phase 10: **Exam OS v2 + Content Factory**. היא לא מחליפה את Phase 9 ולא קודמת למבחן. המטרה שלה היא להכין את LumenPortal לשלב שאחרי Exam Edition: מפעל שאלות עומק, סימולציות לחץ, דוחות מוכנות מתקדמים, מערכת איכות תוכן, ופיצול עתידי לפורטלים נפרדים לקורסים אחרים. Phase 10 נשארת Priority 2 עד ש-Phase 9 ירוקה.

### Exam Week Operating Plan — 2026-04-29

נוסף מסמך הפעלה יומי: [EXAM_WEEK_OPERATING_PLAN.md](EXAM_WEEK_OPERATING_PLAN.md). הוא קובע סדר עבודה עד המבחן: בדיקות בוקר, סגירת פערי מושגים בצהריים, סימולציית תלמיד בערב, ושער Exam Edition. המסמך לא מוסיף scope חדש; הוא מונע פתיחת הרחבות שלא משרתות את SVCollege AI & Full Stack.

### Exam Week Sprint Addendum — 2026-04-29

נוסף P-0.3: ספרינט הכנה של 7 ימים. הוא לא מוסיף מוצר חדש, אלא מתרגם את התוכנית לפעולות בדיקה ותיקון יומיות: דוח 10 מושגים חלשים, הרחבת שאלות קשות למושגים מסוכנים, smoke מובייל/פוקוס, בדיקת no-repeat, ומועמד release ל-Exam Edition.

### System Audit Addendum — 2026-04-29

בוצע אודיט מקומי רחב: `npm test -- --run`, `npm run build`, `npm run validate:strict`, `npm run svcollege:readiness:release`, `npm run svcollege:tab-matrix:strict`, `npm run svcollege:command-center:strict`, `npm run quality:questions:strict`, `npm run quality:remediation:strict`, `npm run qa:questions:strict`, `npm run qa:lesson-quiz-keys:strict`, `npm run lessons:assets`, `npm run exam:weakest`, `npm run coverage:features:strict`, `npm run audit:distractors`, `npm run audit:seeded`. מצב מערכת: build/tests/readiness/tab-matrix ירוקים; `validate:strict` ירוק עם `0/568` density gaps; חסרים 0 `conceptKey` בשאלות curated; חסרות 0 הגדרות בשורה אחת ב-`exam:weakest`; remediation queue ירדה ל-0; Per-Distractor Feedback מלא לכל בנק ה-MC.

### System Bug Audit Addendum — 2026-04-30

נוצר [SYSTEM_BUG_AUDIT_REPORT.md](SYSTEM_BUG_AUDIT_REPORT.md) ונוסף backlog חדש ב-[MASTER_PLAN.md](MASTER_PLAN.md). מצב gate נוכחי: build/tests/readiness/tab-matrix/command-center/student-export/PWA/performance/feature-coverage/reuse-audit ירוקים, ו-`Math.random()` לא נמצא בקוד הפעיל. הבעיה המרכזית שנותרה היא עומק פעילות: `337/568` concepts activity-ready, `231` פערי Trace/Build/Bug, מתוכם `9` פערי SVCollege-priority. אין לפתוח הרחבות Priority 2 לפני סגירת פערי SVCollege האלה.

### Brutal Master Plan Audit Addendum — 2026-04-30

נוצר [BRUTAL_MASTER_PLAN_AUDIT.md](BRUTAL_MASTER_PLAN_AUDIT.md) עם סריקת סטטוס מחמירה לכל פריטי `MASTER_PLAN.md` ו-`EXECUTION_TASKS.md`: `759` פריטים נסרקו; `332` סווגו DONE, `368` PARTIAL, `50` NOT DONE ו-`9` FAKED/overclaimed. הבעיה המרכזית: חלק מה-`[V]` מסמנים specs, scaffolding, local reports או הבטחות post-exam כאילו הם 100/100 מוצר עובד. נוספו BUG-AUDIT-023 עד BUG-AUDIT-031 ב-[MASTER_PLAN.md](MASTER_PLAN.md): ניקוי overclaim, הורדת סטטוס לכל דבר שתלוי בנתוני אמת, שער קבוע לאודיט הכנות, מניעת drift בין cache/script/tests, מדיניות שאלות ידניות בלבד, וחסימת שני מודולי SVCollege עד authoring ידני.

### Manual Question Policy Addendum — 2026-04-30

המשתמש קבע כלל מחייב חדש: אין ליצור שאלות אוטומטיות. בוצע ניתוק מיידי: נמחקו `scripts/seed_questions.js` ו-`scripts/audit_seeded_questions.js`; `content-loader.js` לא מגדיר יותר `ensureSeededBank()` ולא טוען `data/questions_bank_seeded.js`; ה-runtime ב-`app.js` לא מייצר MC/Fill fallback (`generatedMCVariantsForConcept`, `makeCodeFill`, `generatedQuestionId` הוסרו); מאמן/Concept Sprint/Inline Quiz/Mock Exam נשענים על שאלות ידניות קיימות בלבד. `questions:coverage-targets:write` מציג עכשיו אמת ידנית: `ready:false`, `567` פערי MC ו-`561` פערי Fill. נוספו BUG-AUDIT-027 עד BUG-AUDIT-030 ב-[MASTER_PLAN.md](MASTER_PLAN.md) להשלמת authoring ידני וביטול כל drift של legacy generated bank.

רענון לאחר מחיקה מלאה של כלי ייצור אוטומטי: גם כלי הבקרה כבר לא קוראים את `data/questions_bank_seeded.js`. `validate:strict`, `qa:questions:strict`, `quality:questions:strict`, `questions:reuse-audit:strict`, `performance:budget:strict`, `svcollege:pwa-offline:strict`, `npm test -- --run` ו-`npm run build` עברו. השערים שנכשלו בכוונה בגלל מדיניות ידנית בלבד: `questions:coverage-targets:strict` (`567` MC, `561` Fill), `svcollege:readiness:release` (`2` blockers), `svcollege:tab-matrix:strict` (`4` gaps), `svcollege:critical-flows:strict` (`trainer`, `mockExam`), `svcollege:command-center:strict`, `svcollege:student-export:strict`, `exam:mock-variants:strict`, ו-`svcollege:console-gate:strict`. החסימות הן `עיצוב רספונסיבי ו-CSS מתקדם` ו-`AI למפתחים` שחסרים כיסוי ידני ב-Trainer וב-Mock Exam; אסור לסגור אותן באמצעות generator.

רענון אודיט נוסף באותו יום הרחיב את backlog עד `BUG-AUDIT-020`: נוספו פערי תהליך על מקור אמת מפוצל בין מסמכי תכנון, פיזור ידני של גרסאות cache/assets, חוסר browser smoke מלא לבאטצ'ים החדשים של activity data ב-Lessons 11-17/foundation/tooling, drift בתאריכי דוחות generated, release hygiene בגלל worktree גדול ולא נקי, ו-`questions:activity-authoring-plan:strict` שמדווח `ready:false` אך יוצא 0. הבדיקות לאחר הרענון: `npm test -- --run` עבר עם `148` קבצים ו-`603` בדיקות, `npm run build` עבר, וחיפוש `Math.random()` בקוד הפעיל נשאר ללא התאמות.

רענון אודיט שלישי באותו יום לפני ניתוק הבנק האוטומטי הראה runtime/smoke ירוקים. לאחר ניתוק ידני בלבד, השערים `critical-flows`, `full-portal-smoke` ו-`console-gate` כבר אינם ירוקים כי הם תלויים בכיסוי Trainer/Mock Exam ידני לשני המודולים החסרים. זהו status drift מתועד, לא regression UI: אין להחזיר את ה-seeded bank כדי להפוך אותם לירוקים.

### Kimi 2.6 Consolidated Issues Reconciliation — 2026-04-30

נבדק דוח `LumenPortal — רשימת כל הבעיות המאוגדת` מול הקוד והשערים החיים. הדוח שימושי כ-checklist, אבל אינו מקור אמת לבד: חלק גדול ממנו נכתב מול `AUDIT_2026` הישן וכבר נסגר או השתנה בעקבות Vite, PWA, accessibility smoke, theme, feature gates ומדיניות שאלות ידניות בלבד.

ממצאים חיים מהריצה הנוכחית:

- `npm run svcollege:pwa-offline:strict` עבר: `181/181` assets, `13/13` strategy checks.
- `npm run svcollege:accessibility:strict` עבר: `7/7` checks, `23` top tabs.
- `npm run performance:budget:strict` עבר: `8/8` checks.
- `npm run coverage:features:strict` עבר: `24/24` modules, כולל anti-patterns `22/22`, war stories `31/30`, mini builds `23/21`, code trace `89/85`, metaphors `250/250`, stage-zero `8/8`, real-object aids `50/50`.
- `npm run quality:remediation:strict` עבר: `0` queued issues; `QUESTION_REMEDIATION_QUEUE.md/json` עודכן ל-`0`.
- `npm run questions:coverage-targets:strict` נכשל בכוונה לפי מדיניות ידנית בלבד: `567` MC gaps, `561` Fill gaps.
- `npm run svcollege:readiness:release` נכשל: `2` release blockers — `עיצוב רספונסיבי ו-CSS מתקדם`, `AI למפתחים`.
- חיפוש `Math.random()` בקוד הפעיל נשאר ללא התאמות.

סיווג מהיר:

- `C1/C2` Reverse Q&A / ELI5 — לא לפתוח מחדש; יש `levelText(...)` ו-tests ל-variant rendering.
- `I1/I2` build tool / monolith — Vite קיים, אבל פירוק `app.js` ו-code-splitting עדיין פתוחים ב-`FWD-8.1`, `FWD-8.2`, `BUG-AUDIT-005`, `BUG-AUDIT-022`.
- `I3` a11y אפס — מיושן; יש aria labels ו-gate ירוק. נשארה משימת keyboard-only עמוקה ב-`FWD-5.3`, `BUG-AUDIT-004`.
- `I4` PWA לא קיים — מיושן; gate ירוק.
- `I5/I6` performance/mobile — לא חסימה נוכחית לפי gates, אבל visual/mobile smoke נשארים חובה אחרי כל שינוי UI.
- `I7` Analytics/Error tracking — לא לפתוח Sentry/Plausible בלי החלטת פרטיות וחשבון אמיתי; כרגע יש Bug Agent מקומי וצריך export deterministic ב-`BUG-AUDIT-009`.
- `I8` SEO — meta description קיים; OG/JSON-LD נשארים P2 בלבד ולא חוסמים Exam Edition.
- `I9` dark-only theme — מיושן; יש light/system + `prefers-color-scheme`.
- `I10` אין בדיקות — מיושן; קיימים Vitest וגייטים רבים. נשארה בעיית אמינות דוחות היסטוריים, לא "0 tests".
- `T1-T6` content inflation הישן — מיושן לפי `coverage:features:strict`, אבל אסור להשתמש בזה כדי לעקוף את השער הידני של שאלות.
- `T7-T34`, `D`, `Q`, `M` — הרבה כבר נסגרו או נדחו; כל AI-generated personalized work חסום עד מדיניות ידנית/פרטיות, ולא יוצר שאלות אוטומטיות.
- `683 remediation issues` — מיושן כארטיפקט; report regenerated to `0`. הבעיה האמיתית עכשיו היא `questions:coverage-targets:strict` ולא remediation queue.

משימות שנוספו/חודדו בעקבות הדוח:

- [ ] KIMI-AUDIT-1 — להוסיף לדוחות ישנים banner `historical / superseded` כדי ש-AUDIT_2026 לא ייראה כמו מצב production נוכחי.
- [ ] KIMI-AUDIT-2 — לתקן scripts של דוחות generated כך שהתאריך/גרסת הדוח לא יישארו תקועים על `2026-04-28` אחרי ריצה חדשה.
- [ ] KIMI-AUDIT-3 — להוסיף `report:source-of-truth` שמסכם live gates מול historic audit ומונע סתירות כמו `FEATURE_COVERAGE 100%` מול `questions:coverage-targets red`.
- [ ] KIMI-AUDIT-4 — להוסיף SEO backlog לא חוסם: OG tags, JSON-LD, canonical/meta social only after Finish Line 1.
- [ ] KIMI-AUDIT-5 — להגדיר החלטת telemetry אמיתית: local-only Bug Agent עכשיו; Sentry/Plausible רק עם חשבון אמיתי, privacy notice ו-PII policy.
- [ ] KIMI-AUDIT-6 — לעדכן את `SYSTEM_BUG_AUDIT_REPORT.md` עם reconciliation הזה בריצה הבאה.
- [ ] KIMI-AUDIT-7 — אם Kimi/סוכן אחר ממשיך, עליו להריץ live gates לפני סימון בעיה כפתוחה; אין להסתמך על AUDIT ישן בלי אימות.

### Forward Execution Plan — 2026-04-30

מקור אמת קדימה: שאלות וחומר לימוד נוצרים ידנית בלבד, עוברים QA ידני, ורק אז נכנסים ל-`data/questions_bank.js` או לקבצי פעילות אמיתיים. אין generator, אין seeded fallback, אין נתוני pilot/pricing/usage מומצאים, ואין `Math.random()`.

#### P0 — לפתוח מחדש את Finish Line 1 בלי generated bank

- [ ] FWD-0.1 — להשאיר את `scripts/seed_questions.js`, `scripts/audit_seeded_questions.js`, `tests/seeded-qa.test.js` מחוקים, ולוודא ש-`package.json` לא מחזיר `audit:seeded` או seed script.
- [ ] FWD-0.2 — להוסיף/להקשיח release guard שסורק שאין `ensureSeededBank`, `generatedMCVariantsForConcept`, `makeCodeFill`, `generatedQuestionId`, `questions_bank_seeded.js` ב-runtime או ב-service worker.
- [ ] FWD-0.3 — להריץ בכל batch: `rg -n "Math\\.random" app.js src scripts tests data --glob '!output/**'`; חייב להיות ללא התאמות.
- [ ] FWD-0.4 — לשמור את `data/questions_bank_seeded.js` כארכיון לא פעיל בלבד או למחוק אותו רק אחרי החלטה מפורשת; בשום מצב לא להטעין אותו בדפדפן או בדוחות readiness.

#### P0 — שני מודולי SVCollege שחוסמים Trainer/Mock Exam

- [ ] FWD-1.1 — למפות ידנית את כל מושגי `עיצוב רספונסיבי ו-CSS מתקדם` שחסרים MC/Fill ב-`QUESTION_COVERAGE_TARGETS.md`.
- [ ] FWD-1.2 — לכתוב שאלות MC ידניות למודול Design Systems: לכל שאלה מקור מושג, תשובה נכונה, 3 distractors סבירים, `explanation`, `optionFeedback`, `level`, `conceptKey`.
- [ ] FWD-1.3 — לכתוב שאלות Fill ידניות למושגי Design Systems עם code example: blank אחד ברור, answer יחיד, hint שאינו מגלה, explanation.
- [ ] FWD-1.4 — למפות ידנית את כל מושגי `AI למפתחים — Cursor, Windsurf, Bolt, תיעוד וטסטים עם AI` שחסרים MC/Fill.
- [ ] FWD-1.5 — לכתוב שאלות MC ידניות למודול AI Engineering לפי אותה מדיניות.
- [ ] FWD-1.6 — לכתוב שאלות Fill ידניות למודול AI Engineering רק איפה שיש קוד/פקודה/תבנית אמיתית שמצדיקה Fill.
- [ ] FWD-1.7 — לעדכן `data/questions_bank.js` בלבד; לא ליצור קובץ generated חדש.
- [ ] FWD-1.8 — לעדכן `data/option_feedback.js` לכל MC חדש.
- [ ] FWD-1.9 — להוסיף/לעדכן tests ממוקדים למודולים החסרים כך שיכסו count, conceptKey, levels, option feedback ו-Mock Exam routing.
- [ ] FWD-1.10 — DoD: `svcollege:readiness:release`, `svcollege:tab-matrix:strict`, `svcollege:critical-flows:strict`, `svcollege:command-center:strict`, `svcollege:student-export:strict`, `exam:mock-variants:strict`, `svcollege:console-gate:strict` עוברים בלי generated bank.

#### P0 — כיסוי שאלות ידני מלא לכל הפורטל

- [ ] FWD-2.1 — להפוך את `QUESTION_COVERAGE_TARGETS.md/json` לתוכנית batch: `567` פערי MC ו-`561` פערי Fill, לפי מודול, מושג, עדיפות מבחן, ותאריך סקירה.
- [ ] FWD-2.2 — להתחיל ממודולי SVCollege שנמצאים במבחן ולא ממוזיאון/חנות/קהילה.
- [ ] FWD-2.3 — לכל batch להוסיף רק שאלות שעברו בדיקה ידנית מול חומר השיעור וה-source lesson.
- [ ] FWD-2.4 — לכל batch להריץ `validate:strict`, `qa:questions:strict`, `quality:questions:strict`, `questions:coverage-targets`, `questions:reuse-audit:strict`.
- [ ] FWD-2.5 — לא לסמן batch כ-DONE אם אין `optionFeedback` מלא לכל MC חדש.
- [ ] FWD-2.6 — לא לסמן batch כ-DONE אם Fill כולל יותר מ-blank אחד, תשובה דולפת, או hint שמגלה את התשובה.
- [ ] FWD-2.7 — יעד סופי: `questions:coverage-targets:strict` ירוק עם `mcGapCount: 0`, `fillGapCount: 0`.

#### P0 — פערי פעילות Trace/Build/Bug

- [ ] FWD-3.1 — לסגור קודם את `9` פערי SVCollege-priority מתוך `QUESTION_ACTIVITY_AUTHORING_PLAN.md`.
- [ ] FWD-3.2 — לכל activity חדש להוסיף Trace/Build/Bug אמיתי שמבוסס על מושג קיים, לא תרגיל placeholder.
- [ ] FWD-3.3 — להוסיף test data-shape לכל batch פעילות חדש.
- [ ] FWD-3.4 — להוסיף browser smoke למושג מייצג אחד לפחות מכל batch חדש.
- [ ] FWD-3.5 — רק אחרי SVCollege: לטפל ב-`222` פערים לא-עדיפותיים או להעביר אותם לפורטל עתידי.

#### P1 — ניקוי overclaim ומקור אמת

- [ ] FWD-4.1 — לעבור על כל `[V]` ב-`EXECUTION_TASKS.md` שנשען על generated/seeded coverage ולהוריד ל-[~]/[ ] או לסמן historical/superseded.
- [ ] FWD-4.2 — להריץ `master-plan:brutal-audit:write` אחרי כל תיקון סטטוס.
- [ ] FWD-4.3 — יעד: `FAKED: 0` לפני release.
- [ ] FWD-4.4 — כל `PARTIAL` חייב owner, קובץ ראיה, וקריטריון סגירה מדיד.
- [ ] FWD-4.5 — לעדכן את סיכום ההתקדמות העליון רק לפי gates, לא לפי ספירה היסטורית.

#### P1 — QA וחוויית למידה אחרי החזרת הירוק

- [ ] FWD-5.1 — להריץ desktop/mobile visual smoke אחרי הוספת השאלות הידניות.
- [ ] FWD-5.2 — לבדוק ידנית שיעור אחד מכל מודול SVCollege: תוכן, מושגים, שאלות, מעבר מושגים, מעבר לשיעור הבא, collapse menus, scroll rail.
- [ ] FWD-5.3 — להוסיף keyboard-only tests ל-Escape/Enter/Arrow, מעבר טאבים, פתיחת/סגירת תוכן, submit answer ו-focus visible.
- [ ] FWD-5.4 — לעדכן `SVCOLLEGE_BROWSER_SMOKE.md` רק אחרי ראיית דפדפן אמיתית.

#### P1 — Outcome Loop אמיתי

- [ ] FWD-6.1 — להריץ פיילוט 10 תלמידים אמיתי לפי `PILOT_READINESS_PLAN.md` / `SVCOLLEGE_LEARNER_OUTCOME_LOOP.md`.
- [ ] FWD-6.2 — לאסוף D1/D7 retention, module mastery, stuck feedback, זמן התאוששות מטעות ו-promotion outcome.
- [ ] FWD-6.3 — להשאיר כל נתון חסר כ-`unknown/unavailable`; אין backfill.
- [ ] FWD-6.4 — לעדכן את שער הקידום רק אחרי ראיות תלמידים אמיתיות.

#### P1 — Release Guardrails

- [ ] FWD-7.1 — להוסיף pre-release command שמריץ יחד: no-auto-question-generation scan, no-`Math.random`, strict QA, SVCollege gates, tests, build.
- [ ] FWD-7.2 — להקשיח `questions:activity-authoring-plan:strict` או לפצל אותו ל-audit לעומת release gate כדי ש-`ready:false` לא ייראה ירוק.
- [ ] FWD-7.3 — לרכז cache version / asset expectations כך שלא יעדכנו `service-worker.js`, tests ודוחות ידנית בכמה מקומות.
- [ ] FWD-7.4 — לפני commit/release ליצור inventory של קבצים מיועדים מול generated reports.

#### P2 — רק אחרי Finish Line 1 ירוק

- [ ] FWD-8.1 — לפרק `app.js` למודולים קטנים: lesson renderer, chrome/menu, settings, bug log, question panels.
- [ ] FWD-8.2 — לצמצם stylesheet גלובלי ו-core bundle רק אחרי שמסכי הלמידה יציבים.
- [ ] FWD-8.3 — להמשיך Sync מול Supabase אמיתי: auth, conflict handling, recovery, export/import.
- [ ] FWD-8.4 — להמשיך מוזיאון/חנות/קהילה רק אם חומר חובה למבחן לא נחסם, ורק אחרי gates ירוקים.
- [ ] FWD-8.5 — כל pricing/usage/post-exam premium נשאר `unknown/unavailable` עד שיש ראיות אמת.

#### P2 — Museum Expansion Backlog from 2026-04-30 review

מקורות: `/Users/tal/Desktop/חומרים לשיעור/museum-missing-materials-detailed-fa0e5d.md`, `/Users/tal/Desktop/חומרים לשיעור/museum-expansion-recommendations-fa0e5d.md`, `/Users/tal/.windsurf/plans/museum-remaining-wings-improvements-fa0e5d.md`. הרשימה הזו לא פותחת עבודה לפני Finish Line 1. כל שאלה, בדיקת צפייה, טענה היסטורית או חומר לימוד חייבים להיכתב ידנית ולעבור QA ידני; אין generators, אין seeded fallback, אין `Math.random()`.

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

#### Gate סופי לסגירת Finish Line 1

- [ ] FWD-9.1 — `npm run validate:strict`
- [ ] FWD-9.2 — `npm run qa:questions:strict`
- [ ] FWD-9.3 — `npm run quality:questions:strict`
- [ ] FWD-9.4 — `npm run questions:coverage-targets:strict`
- [ ] FWD-9.5 — `npm run questions:reuse-audit:strict`
- [ ] FWD-9.6 — `npm run svcollege:readiness:release`
- [ ] FWD-9.7 — `npm run svcollege:tab-matrix:strict`
- [ ] FWD-9.8 — `npm run svcollege:critical-flows:strict`
- [ ] FWD-9.9 — `npm run svcollege:command-center:strict`
- [ ] FWD-9.10 — `npm run svcollege:student-export:strict`
- [ ] FWD-9.11 — `npm run exam:mock-variants:strict`
- [ ] FWD-9.12 — `npm run svcollege:console-gate:strict`
- [ ] FWD-9.13 — `npm run svcollege:pwa-offline:strict`
- [ ] FWD-9.14 — `npm test -- --run`
- [ ] FWD-9.15 — `npm run build`
- [ ] FWD-9.16 — `rg -n "Math\\.random" app.js src scripts tests data --glob '!output/**'` ללא התאמות.

### Real Learner Outcome Loop Addendum — 2026-04-29

נסגר P-1.11 עבור Finish Line 1: נוסף פרוטוקול פיילוט 10 תלמידים ב-`SVCOLLEGE_LEARNER_OUTCOME_LOOP.md`, נוספו מדדי D1/D7, שליטת מודולים, זמן התאוששות מטעות ותפיסה חוזרת ב-`src/core/outcome-loop.js`, נוסף כפתור `נתקעתי` לכל פאנל דרישות קדם לשאלה, והייצוא השבועי כולל עכשיו outcome loop ושער קידום. נתוני פיילוט חסרים נשארים `unknown/unavailable`; אין backfill ואין נתונים מומצאים. בנוסף תוקן literal בבדיקת Command Center כדי ששומר native-random יבדוק קוד אמיתי בלי להכניס בעצמו את הטוקן האסור.

### Practice Loop Closure Addendum — 2026-04-29

נסגרו P-1.3.5 ו-P-1.3.6 בתוך Finish Line 1: `tests/svcollege-practice-loop.test.js` מוכיח ש-Per-Distractor Feedback מלא לכל מאגר ה-MC שמשמש את mock exam, ושכל 15 מודולי SVCollege מחוברים ל-trainer, study mode, prerequisite coverage ונתיב `prerequisite_rewind` לתיקון חולשות. זה מתבסס על שערים קיימים (`report_feature_coverage`, `report_svcollege_tab_matrix`) ולא על נתוני דמו.

### Mobile Tree Closure Addendum — 2026-04-29

נסגר P-1.4.10: במובייל עץ הניווט זמין כ-drawer עצמאי דרך כפתור עץ הצד, עם `max-width: 88vw`, סגירה הדדית מול drawer השיעורים, ו-Escape שסוגר את drawer העץ. `tests/focus-layout.test.js` מכסה את מצב פוקוס ואת מצב mobile-context כדי למנוע חזרה למצב שבו העץ מוסתר במסכים צרים.

### Global Site Navigation Addendum — 2026-04-29

נוסף shell ניווט גלובלי בכל מסכי הפורטל: כפתור חזרה, כפתור בית ותפריט `עץ אתר` שנבנה מטאבי הפורטל ומהשיעורים האמיתיים ב-`window.LESSONS_DATA`. מצב פוקוס משאיר את עץ האתר זמין כסרגל דק, והכפתור `תוכן` ממשיך לפתוח את עץ הצד מימין. `tests/site-navigation.test.js` נועל את המבנה, החיווט וה-CSS כדי למנוע נסיגה.

### Lesson Content Density Addendum — 2026-04-29

צומצם chrome כפול במסכי שיעור בדסקטופ: ה-sidebar הימני וה-top tabs מוסתרים בזמן שיעור פעיל, עץ התוכן הופך ל-drawer דרך כפתור `תוכן`, והכותרת/באנר החוזרים בתוך גוף השיעור מוסתרים כדי להגדיל את שטח החומר עצמו. `tests/lesson-content-density.test.js` נועל את מצב `lesson-reading-mode` ואת ה-CSS שמונע חזרה לתפריטים כפולים.

### Focus Top Collapse Addendum — 2026-04-29

כפתור `עליון` במצב פוקוס מקפל עכשיו את כל האזור העליון, לא רק את כותרת השיעור: `top-nav`, `site-trail-nav` ו-`portal-decision-aid` מוסתרים, ו-`content-wrapper` מקבל `100vh` כדי להשאיר מקסימום שטח לחומר עצמו. `tests/focus-layout.test.js` ו-`tests/site-navigation.test.js` נועלים את ההתנהגות.

### Unified Sidebar Navigation Addendum — 2026-04-29

צומצמו שני תפריטי הצד לתפריט ראשי אחד בדסקטופ: התפריט הימני כולל עכשיו גם את ענפי `תוכן עניינים` וגם את רשימת `כל השיעורים`, והפאנל העצמאי של עץ התוכן מוסתר כברירת מחדל. אותו פאנל נשאר כ-drawer רק במצב פוקוס/מובייל/קריאה כדי לאפשר כפתור `תוכן` בלי להציג שני sidebars במקביל. `tests/unified-sidebar-navigation.test.js` נועל את המבנה והחיווט.

### Sidebar Duplicate Removal Addendum — 2026-04-29

הוסר כפל בתפריט הימני בעמוד הבית: כאשר `contextTreeSource.key === "home"`, אזור `תוכן עניינים` שבתוך ה-sidebar מוסתר כדי לא להציג שוב `טאבים ראשיים`/`שיעורים לפי נושא` מעל רשימת `כל השיעורים`. ה-drawer העצמאי עדיין יכול להציג את עץ האתר המלא כשפותחים אותו במצב פוקוס/מובייל. `tests/unified-sidebar-navigation.test.js` נועל את הסינון.

חוזק הסינון מול טעינת cache ישנה: עמוד הבית מזוהה גם לפי כותרת `עץ האתר`, גרסת `app.js/style.css` קודמה ל-`concept-sprint-v3`, ו-`CACHE_VERSION` קודמה ל-`lumen-v2.4.46` כדי לוודא שהדפדפן לא משאיר את הכפילות דרך service worker ישן.

### Floating Controls Layout Addendum — 2026-04-29

כפתורי הפעולה הצפים משמאל קיבלו מסילת מיקום קבועה מתחת לתפריט העליון: כל כפתור משתמש ב-offset ייחודי לפי `--floating-control-top` ו-`--floating-control-step`, כולל התאמת מובייל נמוכה יותר כדי למנוע חפיפה עם שורת הטאבים. `tests/floating-controls-layout.test.js` נועל את ה-slots.

### Visual Overlap Audit Addendum — 2026-04-29

נסגר P9.3.3: נוסף gate דטרמיניסטי `svcollege:visual-overlap:strict` שמוודא כי chrome של למידה לא חופף את אזור התוכן: כפתורים צפים מקבלים slots קבועים, מצב פוקוס מסתיר chrome, `עליון` מקפל את כל האזור העליון, מצב שיעור מסתיר תפריטים כפולים, וה-sidebar המאוחד מחזיק גם תוכן עניינים וגם שיעורים. `tests/svcollege-visual-overlap-audit.test.js` נועל את הדוח.

### Top Chrome Collapse Addendum — 2026-04-29

נוסף כפתור `קפל` בפינה הימנית-עליונה של התפריט העליון. הכפתור מקפל את שורת הטאבים, עץ האתר, כותרת העמוד ועזרת ההחלטה, ומשאיר כפתור `פתח` זמין כדי להחזיר את התפריט בלי לאבד מקום בחומר. גרסת ה-cache קודמה ל-`lumen-v2.4.47` וגרסת `app.js/style.css` ל-`concept-sprint-v4`.

### Right Sidebar Collapse Addendum — 2026-04-29

נוסף כפתור `קפל` בפינה הימנית-עליונה של התפריט הימני. הכפתור מקפל את כל ה-sidebar, משאיר כפתור `פתח` באותו אזור, ומפנה את רוחב המסך לתוכן הלימוד. גרסת ה-cache קודמה ל-`lumen-v2.4.48` וגרסת `app.js/style.css` ל-`concept-sprint-v5`.

### Fixed Left Display Controls Addendum — 2026-04-29

כפתורי התצוגה והפעולה בצד שמאל נשארים fixed ואינם מתקפלים יחד עם התפריט העליון, התפריט הימני או מצב פוקוס. `theme-toggle`, `focus`, `view-mode`, `pocket` ו-`PDF` נשארים זמינים במסילת הצד השמאלית. גרסת ה-cache קודמה ל-`lumen-v2.4.49` וגרסת `app.js/style.css` ל-`concept-sprint-v6`.

### Question Reuse Audit Addendum — 2026-04-29

נסגר P9.2.8: נוסף דוח `questions:reuse-audit:strict` שמטען את קבצי ה-data האמיתיים דרך סדר ה-HTML, כולל הבנק ה-seeded המסונן, ובודק כפילויות לפי `learner profile contract + conceptKey + kind + question id`. הדוח מצא כפילות אמיתית ב-Trace/Bug/Mini Build של SVCollege שנוצרה מהעמסה כפולה דרך side effects ו-`content-loader`; `content-loader.js` עודכן ל-dedupe דטרמיניסטי ומעדכן גם את `window.QUESTIONS_TRACE/BUG/BUILD`. נוצרו `QUESTION_REUSE_AUDIT_REPORT.md/json`; מצב נוכחי: `2671` שאלות, `504` concept tags, `0` כפילויות, `0` חסרי `conceptKey`, `9/9` בדיקות חוזה פרופיל.

### PWA Cache Audit Hardened Addendum — 2026-04-29

נסגרו P9.3.5 ו-P9.3.6: `svcollege:pwa-offline:strict` עכשיו סורק אוטומטית את כל סקריפטי ה-data שמופיעים ב-`index.html`, לא רק רשימה ידנית, ומחייב גם את `data/questions_bank_seeded.js` כדי שה-Trainer/Study יישארו זמינים offline אחרי טעינה ראשונה. נוספו ל-precache קבצי enrichment שהיו חסרים (`war_stories`, `comparisons`, `prerequisites`, `metaphors`, `pathways`, `scenarios`, `counterfactuals`, `pair_match`, `bug_quests`) וגרסת ה-cache קודמה ל-`lumen-v2.4.51`. מצב נוכחי: `169/169` assets cached, `13/13` strategy checks, ready true.

### Secondary Decision Aid Collapse Addendum — 2026-04-29

צומצם פאנל `שורה אחת + מתי להשתמש במה` לכפתור `מתי להשתמש` בתפריט העליון המשני, משמאל לכפתור `עץ אתר` ב-RTL. התוכן נשאר אותו תוכן אמיתי לפי הטאב הנוכחי, אבל מוצג עכשיו כ-dropdown overlay במקום לתפוס גובה מעל חומר הלימוד. נוספו בדיקות ל-`portal-decision-menu`, `site-when-menu`, וחיבור ה-state; גרסת `app.js/style.css` קודמה ל-`concept-sprint-v7` ו-`CACHE_VERSION` ל-`lumen-v2.4.52`.

### Lesson Nested Chrome Addendum — 2026-04-30

צומצם chrome פנימי בשיעורים: כותרת השיעור החוזרת הוסרה מגוף השיעור, ה-breadcrumb העליון הופך לכפתור פתיחה לשיעור הנוכחי, ותפריטי השיעור הועברו למבנה היררכי מתקפל: נתיב שיעור, שורת 28 המושגים, שורת מצבי התצוגה/בנק השאלות, ושורת חלקי המושג. תפריט תחתון לא מוצג עד שהאבא שלו נפתח, כדי להשאיר מקסימום מקום לחומר עצמו. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v26` ו-`CACHE_VERSION` ל-`lumen-v2.4.74`.

### Settings Tab Consolidation Addendum — 2026-04-30

הוסר chrome ניהולי מדף הבית: כפתורי `ייצוא התקדמות`, `ייבוא התקדמות`, `הגדר Sync`, `סנכרן עכשיו`, ניהול כיתה, דיונים, Peer Review ו-Mentor Matching עברו לטאב ייעודי `הגדרות`. הטאב החדש כולל גם ברירות מחדל שנשמרות לפתיחה הבאה: ערכת צבע, מצב שיעור, מצב פוקוס, קיפול תפריט עליון/ימני, נגישות וחלקי שיעור גלויים. ההגדרות נכתבות ל-localStorage הקיים ומסונכרנות עם כפתורי התצוגה הקיימים בלי לשנות נתוני תלמיד. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v27` ו-`CACHE_VERSION` ל-`lumen-v2.4.75`.

אימות לאחר הוספת הטאב: top-tab smoke עודכן ל-`23/23`, full-portal smoke משתמש עכשיו בספירת הטאבים האמיתית, וצ'קליסט release readiness כולל smoke/cache/rollback/QA/documentation. עברו `validate:strict`, `qa:questions:strict`, `svcollege:readiness:release`, `svcollege:tab-matrix:strict`, `svcollege:command-center:strict`, `svcollege:student-export:strict`, `npm test -- --run` ו-`npm run build`.

### Lesson Ultra-Compact Menu Addendum — 2026-04-30

צומצם עוד ה-chrome של שיעור: במצב שיעור ה-H1/תיאור העליון מוסתרים כי הנתיב העליון כבר מציג את השיעור, וה-breadcrumb עודכן ל-`בית -> שיעורים -> שיעור -> מושג (X/Y)` עם שיעור ככפתור פתיחה. תפריט השיעור הפנימי מתחיל עכשיו ישירות בשורת `מושגים`; שורת `טאבים` מוצגת רק אחרי פתיחת המושגים, ושורת `חלקי מושג`/בנק שאלות מוצגת רק אחרי פתיחת הטאבים. כך אין שכבת details כללית מיותרת ואין תפריטים תחתונים פתוחים בלי האבא שלהם. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v28` ו-`CACHE_VERSION` ל-`lumen-v2.4.76`.

### Lesson Inline Menu Row Addendum — 2026-04-30

שורות `מושגים`, `טאבים` ו-`חלקי מושג` לא תופסות יותר שורת כותרת נפרדת כשהן פתוחות: התווית נשארת בעמודה צרה מימין, והרשימה/הטאבים מופיעים באותה שורה משמאל עם גלילה אופקית. במצב סגור עדיין רואים רק שורת summary קצרה. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v29` ו-`CACHE_VERSION` ל-`lumen-v2.4.77`.

### P10.1.1 Content Factory Dashboard Addendum — 2026-04-30

נסגר P10.1.1 בלי להוסיף טאב לתלמיד: בתוך `ראיות למידה` → `Content Studio` נוסף dashboard שמחשב מתוך הנתונים האמיתיים אילו מושגים צריכים hard MC, hard Fill, Trace, Bug, Build או השלמת `optionFeedback` לכל distractor. הדוח קורא רק `LESSONS_DATA`, `QUESTIONS_BANK` ו-`OPTION_FEEDBACK`, לא מייצר שאלות, לא עושה backfill ולא מציג placeholder. נוסף `buildContentFactoryDashboard()` ב-`src/core/content-studio.js` ובדיקות דטרמיניסטיות. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v30` ו-`CACHE_VERSION` ל-`lumen-v2.4.78`.

### Learning OS Outcome Scale Addendum — 2026-04-30

נסגר Phase 7 מלא: נוסף core דטרמיניסטי ב-`src/core/learning-os.js` שמכסה אבחון מקדים, placement לפי graph דרישות קדם, תוכנית שבועית, Project Studio, cohort pilot lite, guardrails ל-AI Tutor ו-trust center. נוסף gate `learning-os:outcome-scale:strict` עם `7/7` checks ו-`48` משימות סגורות. כל דוח חסר נשאר `unknown/unavailable`; אין נתוני תלמיד/כיתה/מחיר/הישגים מומצאים.

### Optional Native Mobile Deferral Addendum — 2026-04-30

P4.5.1-P4.5.6 סומנו `[-]` כי Mobile Native דורש החלטת מוצר וחשבונות/תעודות אמיתיים ל-iOS, Android, Push, App Store ו-Google Play. זה לא חוסם את Finish Line 1: ה-PWA, מובייל ווב, מצב פוקוס, cache/offline ו-smoke של SVCollege נשארים נתיב הלמידה הפעיל.

### Runtime Bug Agent Addendum — 2026-04-30

נוסף סוכן באגים פנימי שמריץ סריקה אוטומטית בזמן ריצה ושומר לוג פעיל ב-`localStorage`: runtime validation, בנק שאלות, tab matrix, release blockers ו-feature error telemetry. הלוג מוצג ב-SVCollege Command Center, ובאג שתוקן מוסר מהלוג הפעיל בסריקה הבאה; `lastResolved` מציג מה נמחק בסריקה האחרונה. המזהים נוצרים מ-hash דטרמיניסטי של מקור/פיצ'ר/ראיה, בלי `Math.random()` ובלי נתוני דמו. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v67` ו-`CACHE_VERSION` ל-`lumen-v2.4.115`.

### Museum XP Access Path Addendum — 2026-04-30

נסגרו P8.5.2 ו-P8.5.5: המוזיאון עבר למסלול access דטרמיניסטי לפי XP + שליטת מושגי יסוד. בראש המוזיאון יש עכשיו טאבים לכל אגף, לכל מוזיאון יש דמי כניסה ראשוניים ב-XP ודמי אגף נוספים, ואגף נעול מציג בדיוק אילו מושגי יסוד חסרים לפני פתיחה. גם טאב `אבני הבסיס` קיבל מסלול יסוד סגור: החומר הראשון פתוח ללא ידע קודם, והחומרים המתקדמים נפתחים רק אחרי צבירת XP ושליטה במושגים שעליהם הם תלויים. ה-XP משמש שער צבירה ולא מוחק רמה קיימת; רכישות המטבעות בחנות נשארות חוויות בונוס בלבד.

נסגר P8.5.4: קטלוג החנות כולל עכשיו pass items ייעודיים ל-`languages`, `electricity`, `React evolution`, `Node runtime`, `AI hall` ו-`Debug hall`; אגפי AI ו-Debug מחוברים ל-`storeItemId` אמיתי כדי שהסטטוס בתפריט המוזיאון והכרטיסים יהיה עקבי. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v66` ו-`CACHE_VERSION` ל-`lumen-v2.4.114`.

נסגר P8.5.8: ניווט אגפי המוזיאון הוגדר כ-`tablist` עם `role=tab`, `aria-selected`, `aria-controls` ותוויות מצב פתוח/נעול; כפתורי פתיחת XP כוללים `aria-disabled` ותווית פעולה. מצבי `prefers-reduced-motion`, `.reduced-motion` ו-`body.museum-reduced-motion` מבטלים transition/transform בכרטיסי מוזיאון וכפתורי unlock.

נסגר P8.5.7: נוסף gate `museum:access-smoke:strict` שמוכיח שנעילות מוזיאון לא חוסמות את זרימות SVCollege: הוא בודק XP gates, טאבי אגפים, קטלוג pass items, copy שמבהיר שחומר מבחן נשאר פתוח, readiness release, tab matrix, critical flows, full portal smoke וגרסת offline shell.

### Debug Arena Rooms Addendum — 2026-04-30

נסגר P8.6.1: בתוך Practice Lab של המוזיאון נוסף Debug Arena עם חדרים נעולים שנגזרים רק ממפת השגיאות האמיתית `MUSEUM_ERROR_LAYER_MAP`, שכבת השורש, המושג המתקן ושאלת ההוכחה הקיימים. ללא רכישת `challenge.debug-arena` רואים סימפטום ותנאי פתיחה בלבד; אחרי פתיחה מוצגים סימפטום, בדיקה ראשונה, שכבת שורש, מושג מתקן, הוכחת הבנה וקישור לחדר השורש. חומר SVCollege והשאלות נשארים פתוחים. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v66` ו-`CACHE_VERSION` ל-`lumen-v2.4.114`.

### Boss Battles Addendum — 2026-04-30

נסגר P8.6.2: בתוך Practice Lab נוסף אזור Boss Battles נעול ל-Async, Auth, React State, API ו-DB. כל Boss נגזר ממפת מושגים אמיתית קיימת (`lesson_15::Promise`, `lesson_auth_security::authentication`, `lesson_22::useState`, `lesson_17::REST API`, `lesson_sql_orm::SQL` ועוד), מציג התקדמות mastery אמיתית לכל מושג, ונפתח רק דרך פריטי חנות אמיתיים (`challenge.*-boss`). הקרבות הם חוויות בונוס בלבד: הם לא פותחים ציונים, לא עוקפים שאלות, ולא נותנים XP בלי פתרון תרגולים אמיתיים. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v66` ו-`CACHE_VERSION` ל-`lumen-v2.4.114`.

### Code Cinema Addendum — 2026-04-30

נסגר P8.6.3: נוסף Code Cinema בתוך Practice Lab עם replay clips שנגזרים רק מ-`getMuseumVideoEntries()` ומחומרי NotebookLM קיימים. בלי רכישת `challenge.code-cinema` מוצגים אזור, קבוצה ותנאי פתיחה בלבד; אחרי פתיחה כל קליפ מציג ידע מקדים, replay, שאלת בדיקה ופתיחת חלון הסרטון המלא. זו חוויית צפייה בונוס בלבד, וחומר הלימוד והשאלות נשארים פתוחים. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v66` ו-`CACHE_VERSION` ל-`lumen-v2.4.114`.

### Secret Labs Addendum — 2026-04-30

נסגר P8.6.4: נוסף אזור Secret Labs נעול בתוך Practice Lab עם שלושה ניסויים: State Mutation, API Contract ו-DB Query. כל ניסוי נבנה מכרטיס קשר אמיתי ב-`MUSEUM_CONCEPT_CONNECTIONS`, שגיאה אמיתית מתוך `MUSEUM_ERROR_LAYER_MAP`, ומושגי prerequisite קיימים. אחרי רכישת `challenge.secret-labs` מוצגים מה נשבר, מה בודקים, איפה זה מופיע בקוד ושאלת הוכחה קיימת; לפני פתיחה מוצג רק סימפטום ותנאי פתיחה. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v66` ו-`CACHE_VERSION` ל-`lumen-v2.4.114`.

### Theme Shop Addendum — 2026-04-30

נסגר P8.6.5: החנות כוללת עכשיו Theme Shop קוסמטי עם ערכות `Cyber Focus`, `Exam Calm` ו-`Accessible Outline`. ההפעלה נשמרת ב-`lumenportal:cosmeticTheme:v1`, זמינה רק אחרי רכישת פריט קוסמטי, ומשנה רק משתני accent/outline בלי להשפיע על XP, mastery, תשובות או ציונים. ערכת `Accessible Outline` מחזקת מסגרות ופוקוס בלי להוריד contrast. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v66` ו-`CACHE_VERSION` ל-`lumen-v2.4.114`.

### Museum Collectibles Addendum — 2026-04-30

נסגר P8.6.6: דרכון המוזיאון כולל עכשיו כרטיסי מושג לאיסוף שנגזרים מ-`MUSEUM_CONCEPT_CONNECTIONS`. כל כרטיס מציג שכבה, נבנה מ, מוביל אל ושאלת הוכחה קיימת, ונשמר מקומית תחת `cards` בתוך מצב הדרכון לצד stamps, visited, tourStops ו-drills. כרטיסים וחותמות הם הוכחות ביקור/למידה מקומיות בלבד ולא משנים mastery או ציונים. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v66` ו-`CACHE_VERSION` ל-`lumen-v2.4.114`.

### Locked Experience Reward Addendum — 2026-04-30

נסגר P8.6.7: חדרי Debug Arena, Boss Battles, Code Cinema ו-Secret Labs מקבלים עכשיו כפתור השלמה רק אחרי שהחוויה נפתחה. השלמה נשמרת ב-`experienceRewards` בדרכון ומעניקה reward יחיד דרך `awardLearningReward` עם `source: "museum-experience-completion"` ו-`questionId` יציב. רכישה לבדה עדיין נותנת `xp: 0`, והתגמול לא משנה mastery או ציונים. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v66` ו-`CACHE_VERSION` ל-`lumen-v2.4.114`.

### Experience Balancing Test Addendum — 2026-04-30

נסגר P8.6.8: נוסף `tests/experience-balancing.test.js` שמוודא שתגמולי חוויות נעולות עוברים רק דרך `awardLearningReward`, דורשים `isMuseumTicketOpen`, משתמשים ב-`questionId`/`conceptKey` יציבים, נשמרים ב-`experienceRewards`, ואינם מערבבים רכישה עם XP או mastery. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v66` ו-`CACHE_VERSION` ל-`lumen-v2.4.114`.

### Deterministic Generation Queue Addendum — 2026-04-30

נסגר P10.1.2: בתוך Content Studio נוסף `buildDeterministicGenerationQueue()` שמייצר authoring queue דטרמיניסטי מפערי `buildContentFactoryDashboard()` ומנתוני `LESSONS_DATA`/`QUESTIONS_BANK` אמיתיים בלבד. ה-queue לא מייצר שאלה, תשובה, אפשרויות או placeholder; הוא רק מציג task לעריכה אנושית, source evidence, סוג output נדרש וספירות קיימות. Learning Evidence מציג את ה-Generation queue באותו Content Studio ללא טאב חדש לתלמיד. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v66` ו-`CACHE_VERSION` ל-`lumen-v2.4.114`.

### Hard Question Template Catalog Addendum — 2026-04-30

נסגר P10.1.3: נוסף catalog של תבניות authoring ל-JS basics, React state, API, DB, Auth, Next, DevOps ו-AI. `classifyConceptFamily()` משייך כל משימת generation למשפחה לפי conceptKey/title/name אמיתיים, ו-`buildHardQuestionTemplateCatalog()` מציג checklist של proof נדרש בלבד. אין שאלה מוכנה, אין תשובה, אין options ואין placeholder. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v66` ו-`CACHE_VERSION` ל-`lumen-v2.4.114`.

### Reviewer Checklist Addendum — 2026-04-30

נסגר P10.1.4: נוסף `buildReviewerChecklistCatalog()` עם checklist דטרמיניסטי לעריכת פריטי תוכן: one-line definition, prerequisite terms, correct answer, distractor quality ו-memory association. כל משימת generation מקבלת `reviewerChecklist` עם אותם IDs, וה-UI מציג את הרשימה בתוך Content Studio. ה-checklist לא ממציא תשובות, distractors או דוגמאות. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v66` ו-`CACHE_VERSION` ל-`lumen-v2.4.114`.

### Question Duplicate Detector Addendum — 2026-04-30

נסגר P10.1.5: נוסף `buildQuestionDuplicateDetector()` שסורק את מאגרי השאלות הקיימים (`mc`, `fill`, `trace`, `bug`, `build`) יחד עם seeded bank ו-`GRAPH_CONCEPT_ALIASES`, ומדווח על duplicate IDs, duplicate identities ו-alias collisions לבדיקה ידנית. הגלאי אינו מוחק, אינו משכתב ואינו מייצר שאלות, תשובות או אפשרויות; הוא מציג רק collision report בתוך Content Studio. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v66` ו-`CACHE_VERSION` ל-`lumen-v2.4.114`.

### Concept Density Targets Addendum — 2026-04-30

נסגר P10.1.6: נוסף `buildConceptDensityTargetReport()` שמודד לכל מושג יעדי מינימום מפורשים: hard MC, hard Fill/code proof, ו-Trace/Bug/Build עבור מושגי קוד, כולל חוסר ב-distractor feedback. הדוח משתמש רק ב-`LESSONS_DATA`, מאגרי השאלות וה-feedback הקיימים, ומציג פערי צפיפות כעבודת authoring ללא יצירת שאלות או proof מלאכותי. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v66` ו-`CACHE_VERSION` ל-`lumen-v2.4.114`.

### Video Import Map Addendum — 2026-04-30

נסגר P10.1.7: נוסף `buildVideoImportMap()` שממפה קליפי NotebookLM קיימים, storyboard clips מתוך `CONCEPT_VIDEOS`, וקישורי וידאו חיצוניים לפי canonical concept tag ו-`GRAPH_CONCEPT_ALIASES`. קליפ בלי concept tag אמיתי נשאר unmapped ולא מקבל שיוך מומצא; אין יצירת URLs, קליפים או טענות וידאו חדשות. Learning Evidence / Content Studio מציג את המפה והפערים באותו מסך. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v66` ו-`CACHE_VERSION` ל-`lumen-v2.4.114`.

### Exam-Critical Content Split Addendum — 2026-04-30

נסגר P10.1.8: נוסף `buildExamCriticalContentReport()` שמפריד בין תוכן exam-critical לפי מודולי SVCollege לבין enrichment-only. הדוח סופר מושגים, שאלות, שאלות hard וסרטונים לפי canonical concept tag, ומבהיר שחומר חובה למבחן לא יוסתר מאחורי XP או חוויות פרימיום. אין קידום מלאכותי של enrichment לתוכן חובה ואין יצירת תוכן חדש. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v66` ו-`CACHE_VERSION` ל-`lumen-v2.4.114`.

### Post-Exam Product Split Gate Addendum — 2026-04-30

נסגרו P10.5.1-P10.5.9: נוסף gate מאוחד `post-exam:product-split:strict` שמאגד את גבול הפורטל, תבנית פורטל עתידית, Teacher Lite v2, Sync v2, AI Tutor v2, premium boundaries, KPI עסקיים, quarterly roadmap review וקידום seeded ל-curated. נוספו `POST_EXAM_PORTAL_TEMPLATE.md`, `SEEDED_QUESTION_PROMOTION_POLICY.md`, `POST_EXAM_PRODUCT_SPLIT_REPORT.md/json`, `scripts/report_post_exam_product_split.js` ו-`tests/post-exam-product-split.test.js`. השער עבר `9/9` tracks ו-`20/20` checks, נשען על דוחות קיימים וראיות repo בלבד, ומשאיר pricing/usage/learner/reviewer gaps כ-`unknown/unavailable` בלי להמציא נתונים או שאלות.

### Phase 6 Release Closeout Addendum — 2026-04-30

נסגרו P6.4.6 ו-P6.5.4-P6.5.7: נוסף `museum:evidence-fields:strict` שמוודא שלטענות מוזיאון היסטוריות/טכניות יש מקורות או מצב `unknown/unavailable`, בלי backfill. שער `phase6:release-readiness:strict` כבר מכסה privacy/data retention, performance budget, WCAG/screen-reader audit, release checklist, pilot readiness ו-package wiring. `P6.3.1` נשאר פתוח בכוונה: דוח `QUESTION_ACTIVITY_COVERAGE_REPORT` עדיין מצביע על `231` פערי Trace/Build/Bug, ואין לסגור אותו באמצעות תוכן מומצא.

### Daily Study Plan Builder Addendum — 2026-04-30

נסגר P10.2.1: Exam Cockpit כולל עכשיו `buildDailyStudyPlan()` שמחשב תוכנית יומית מתוך ציוני התלמיד המקומיים, מודולי SVCollege, יעד יומי קיים, הוכחות מושג, הוכחות קוד ויעד מבחן מדומה. התוכנית מציגה time budget מפורק ל-concept proofs, code proofs ו-mock exam, ממיינת מודולים חלשים לפי readiness אמיתית, ומשאירה חוסרים כ-`unknown/unavailable` או רשימה ריקה במקום להמציא שורות תרגול. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v66` ו-`CACHE_VERSION` ל-`lumen-v2.4.114`.

### Today-Only Queue Addendum — 2026-04-30

נסגר P10.2.2: נוסף `buildTodayOnlyQueue()` בתוך Exam Cockpit. התור היומי נגזר מה-daily study plan בלבד ומוגבל קשיח ל-3 weak topics, 2 code proofs ו-1 mock section. אם חסרות ראיות תלמיד או משימות אמיתיות, התור לא ממלא את עצמו ב-fake tasks ולא מוסיף placeholder rows. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v66` ו-`CACHE_VERSION` ל-`lumen-v2.4.114`.

### Spaced Review Calendar Addendum — 2026-04-30

נסגר P10.2.3: נוסף `buildSpacedReviewCalendar()` ל-Exam Cockpit. הלוח משתמש ב-`buildSpacedReviewSchedule()` וב-priority קיים כדי למיין מושגי SVCollege חלשים וקריטיים לפני חזרות רגילות, ומחלק את 24 החזרות הראשונות לימים קרובים בצורה דטרמיניסטית. הוא מתזמן רק מושגים קיימים מתוך ציוני התלמיד המקומיים ולא יוצר תוכן חזרה חדש. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v66` ו-`CACHE_VERSION` ל-`lumen-v2.4.114`.

### Fatigue-Aware Mode Switch Addendum — 2026-04-30

נסגר P10.2.4: נוסף `buildFatigueAwareModeSwitch()` ל-Exam Cockpit. ה-switch משתמש ב-trainer fatigue guard הקיים ובאותות overload ממסלולי penalty כדי להמליץ על review mode לפני המשך penalty sprint כאשר הדיוק יורד בחדות. ההמלצה נשענת רק על תוצאות תרגול אמיתיות שנרשמו מקומית, ולא יוצרת משימות או מדדי עומס מלאכותיים. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v66` ו-`CACHE_VERSION` ל-`lumen-v2.4.114`.

### Offline Cram Mode Addendum — 2026-04-30

נסגר P10.2.5: נוסף `buildOfflineCramMode()` ל-Exam Cockpit. המצב הקומפקטי מציג הגדרות שורה אחת, טבלאות השוואה זמינות ו-checklist הוכחות קוד מתוך ה-daily study plan ומושגים קיימים בלבד. הגדרות חסרות נשארות `unknown/unavailable`, ואין המצאת עובדות cram, דוגמאות או שורות לימוד. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v66` ו-`CACHE_VERSION` ל-`lumen-v2.4.114`.

### End-of-Day Diff Addendum — 2026-04-30

נסגר P10.2.6: נוסף `buildEndOfDayDiff()` ל-Exam Cockpit. הדיף היומי מציג שינויי רמה, הוכחות קוד, אשכולות טעות ו-next blockers מתוך Learning Evidence, scores, named weaknesses ו-confusion blockers מקומיים בלבד. אין יצירת הישגי סוף יום או blockers מלאכותיים. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v66` ו-`CACHE_VERSION` ל-`lumen-v2.4.114`.

### Personal Readiness Trend Addendum — 2026-04-30

נסגר P10.2.7: נוסף `buildPersonalExamReadinessTrend()` שמציג מגמת מוכנות לפי ימים מהיסטוריית mock exams, mastery changes, code proofs ותשובות שגויות. אם אין היסטוריה אמיתית, ה-trend נשאר ריק במקום להמציא תאריכים או נקודות מדידה. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v66` ו-`CACHE_VERSION` ל-`lumen-v2.4.114`.

### Final 24-Hour Plan Addendum — 2026-04-30

נסגר P10.2.8: נוסף `buildPrintableFinal24HourPlan()` שמרכיב תוכנית 24 שעות אחרונות מתוך weak concepts אמיתיים, code proof gaps, today-only queue ו-offline cram definitions. התוכנית ניתנת להצגה/הדפסה מתוך Cockpit ואינה מכניסה נושאים כלליים או חולשות מומצאות. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v66` ו-`CACHE_VERSION` ל-`lumen-v2.4.114`.

### Concept Tag Audit Addendum — 2026-04-30

נסגר P10.3.1: נוסף `buildConceptTagAudit()` ב-Content Studio. הדוח סורק את `LESSONS_DATA`, מאגרי השאלות, seeded bank, דלי הציונים המקומיים ו-`GRAPH_CONCEPT_ALIASES`, ומדווח על duplicate score buckets, conceptKeys לא פתורים, שאלות יתומות ו-aliases שבורים לבדיקה ידנית. הדוח אינו משנה, ממזג, מוחק או ממציא נתונים; הוא רק מציף פערי מיפוי אמיתיים בתוך Learning Evidence / Content Studio. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v66` ו-`CACHE_VERSION` ל-`lumen-v2.4.114`.

### Per-Learner Question Reuse Addendum — 2026-04-30

נסגר P10.3.2: נוסף `buildPerLearnerQuestionReuseAudit()` שמצליב בין מאגר השאלות האמיתי שנטען כרגע לבין `answeredQuestionState` ו-Learning Evidence של הפרופיל המקומי. הדוח מפריד בין מושגים exhausted, שאלות שחזרו בפועל, ניסיונות חוזרים מעבר לפעם הראשונה ושאלות שנענו אך אינן קיימות יותר במאגר הנוכחי. אין המצאת answered IDs, אין סימון חזרה בלי evidence אמיתי, ואין יצירת שאלות fallback. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v66` ו-`CACHE_VERSION` ל-`lumen-v2.4.114`.

### Mastery Proof Audit Addendum — 2026-04-30

נסגר P10.3.3: נוסף `buildMasteryProofAudit()` שמאתר מושגי תלמיד ברמות 6/7 שאין להם hard/mastery proof, `codeProof` שעבר או חזרה/תשובה עדכנית ב-7 הימים האחרונים. הדוח משתמש רק ב-`scores` וב-Learning Evidence המקומיים, מציג את סיבת החוסר לכל מושג, ולא מסיק proof מתוך level בלבד. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v66` ו-`CACHE_VERSION` ל-`lumen-v2.4.114`.

### False Confidence Audit Addendum — 2026-04-30

נסגר P10.3.4: נוסף `buildFalseConfidenceAudit()` שמזהה תשובות שגויות עם ביטחון 80%+ מתוך לוג כיול הביטחון, ומקבץ אותן לפי misconception/named weakness קיימים במנוע הטעויות. הדוח מציג count, מושגים, questionIds, confidence מקסימלי ופער כיול בלי להמציא confidence, טעויות או clusters. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v66` ו-`CACHE_VERSION` ל-`lumen-v2.4.114`.

### Cross-Tab Evidence Graph Addendum — 2026-04-30

נסגר P10.3.5: נוסף `buildCrossTabEvidenceGraph()` שמקבץ Learning Evidence לפי conceptKey, source/type ומציג איפה התלמיד הוכיח או התקשה בכל מושג: תשובות נכונות, טעויות, mastery changes ו-code proofs. הגרף משתמש רק באירועי evidence מקומיים קיימים ולא יוצר proof edges סינתטיים. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v66` ו-`CACHE_VERSION` ל-`lumen-v2.4.114`.

### Proof Migration + Release Blocker + Audit Export Addendum — 2026-04-30

נסגרו P10.3.6-P10.3.8: נוסף `buildProofBasedMasteryMigrationPlan()` כ-preview rollback-safe לציוני רמה 6/7 ישנים בלי proof, עם rollback records מלאים וללא שינוי אוטומטי ב-`scores`; נוסף `buildExamCriticalProofPathBlocker()` שחוסם release reporting אם מושג SVCollege קריטי נטען ללא hard/proof path; ונוסף `buildTeacherMentorAuditExport()` שמרכז summaries ותורי review למורה/מנטור מתוך הדוחות הקיימים בלבד. אין מיגרציה אוטומטית, אין proof path מומצא ואין הערות מורה מומצאות. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v66` ו-`CACHE_VERSION` ל-`lumen-v2.4.114`.

### Deterministic Final Exam Templates Addendum — 2026-04-30

נסגר P10.4.1: נוספו שלוש סימולציות Final מלאות ודטרמיניסטיות: `final_standard`, `final_hard` ו-`final_stress`. שלושתן משתמשות במודולי SVCollege ובאותה חלוקת שאלות מלאה, hard מגביל לרמה 5+ כשיש שאלות מתאימות, ו-stress מקבל זמן קצר יותר. `composeMockExam()` משתמש ב-seed קבוע לפי template id עבור final templates, ולכן אין shuffle תלוי זמן עבור הסימולציות האלה. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v66` ו-`CACHE_VERSION` ל-`lumen-v2.4.114`.

### Timed Stress Mode Addendum — 2026-04-30

נסגר P10.4.2: מצב `final_stress` עכשיו פועל כמצב לחץ קשיח: ה-runner מקבל badge ו-class ייעודי, עזרי לימוד/prerequisite panel נעולים בזמן שאלה, ניווט חופשי במספרי השאלות נעול וחזרה אחורה חסומה. התלמיד עדיין יכול להתקדם קדימה ולהגיש, אבל לא מקבל רמזים או פתיחת חומר תוך כדי תשובה. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v66` ו-`CACHE_VERSION` ל-`lumen-v2.4.114`.

### Grouped Post-Exam Review Addendum — 2026-04-30

נסגר P10.4.3: נוספה `buildPostExamReviewGroups()` למסך תוצאות המבחן. טעויות final/mock מקובצות עכשיו לפי מושג, לפי misconception ולפי prerequisite gap, על בסיס `wrongRecords` ממנוע הטעויות בלבד. אין יצירת חולשות, מושגים או prerequisite gaps שלא הגיעו מתשובות שגויות בפועל. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v66` ו-`CACHE_VERSION` ל-`lumen-v2.4.114`.

### Final Prove-Again Retest Addendum — 2026-04-30

נסגר P10.4.4: אחרי הגשת מבחן final/mock נוסף `scheduleFinalExamProveAgainRetests()` שמכניס ל-retest queue פריט `final_exam_prove_again` אחד לכל מושג שנכשל במבחן. הרשימה מוצגת במסך התוצאות ומבוססת רק על `wrongRecords` אמיתיים מההגשה הנוכחית; אין יצירת retest למושג שלא נכשל. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v66` ו-`CACHE_VERSION` ל-`lumen-v2.4.114`.

### Score Projection + Final Weak List Addendum — 2026-04-30

נסגרו P10.4.5-P10.4.6: נוסף `buildExamScoreProjection()` שמחשב ציון צפוי וטווח confidence מתוך readiness מודולים והיסטוריית מבחנים אמיתית בלבד, ונוסף `buildFinalWeakList()` שמדרג עד 20 מושגי SVCollege שמאיימים על ציון 100 לפי mastery, proof gap, code-proof gap ודיוק תשובות. אם אין evidence, projection נשאר `unknown/unavailable` ולא נוצרים מושגים חלשים כלליים. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v66` ו-`CACHE_VERSION` ל-`lumen-v2.4.114`.

### Code-Only Final + Release Notes Addendum — 2026-04-30

נסגרו P10.4.7-P10.4.8: נוספה תבנית `final_code_only` עם Fill, Trace, Bug ו-Mini Build מתוך מאגרי השאלות וה-build הקיימים, כולל בדיקת Mini Build מול regex tests קיימים בלבד. בנוסף `report_exam_edition_release_freeze.js` כולל עכשיו release notes מפורשים ל-Finish Line 1, final simulations, grouped review ו-prove-again retests. אין שאלות קוד חדשות ואין release notes מומצאים מחוץ לראיות השערים. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v66` ו-`CACHE_VERSION` ל-`lumen-v2.4.114`.

### Lesson Side Controls + Scroll Rail Addendum — 2026-04-29

שופר מסך השיעור כדי לפנות עוד שטח לחומר עצמו: מצבי `מלא`/`שורה אחת`/`השוואות` וכפתורי הפעולה של המושג (`הצג תרשים`, סימון ידע, חולשה, שמירה לכיס ו-ELI5) עברו לסרגל צד בתוך כרטיס המושג במקום להישאר כשורת פעולה תחתונה. שלבי הלמידה המרכזיים של המושג (`הסבר ורמה`, `תרשים`, `דימוי מהחיים`, `קוד והרצה`, `העמקה ותרגול`, `המשך מומלץ`, `תרגול`) נעטפו ב-`details` פתיח/סגיר, ושלבי MC/Fill בתרגול הפנימי ניתנים לקיפול. נוסף גם `page-scroll-rail` שמאלי שמייצר ניווט לפי חלקי הדף האמיתיים ומאפשר קפיצה בין נושאי הדף. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v8` ו-`CACHE_VERSION` ל-`lumen-v2.4.53`.

### Unified Chrome Control Menu Addendum — 2026-04-29

אוחדו כפתורי `פוקוס`, `עליון`, `קפל` ו-`תוכן` לתפריט מתקפל אחד בפינה הימנית-עליונה (`chrome-control-menu`). הכפתורים עצמם נשארו עם אותם IDs ואותו חיווט state כדי לשמור על הפונקציונליות הקיימת: פוקוס, קיפול עליון במצב פוקוס, קיפול התפריט העליון, קיפול התפריט הימני ופתיחת עץ התוכן. שני כפתורי הקיפול קיבלו תוויות מובחנות (`קפל עליון`, `קפל ימין`) כדי למנוע כפילות טקסט. כך אין יותר כפתורי chrome מפוזרים בשמאל/ימין שמסתירים חומר לימוד. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v9` ו-`CACHE_VERSION` ל-`lumen-v2.4.54`.

### XP 100-Level Professor Exam Gate Addendum — 2026-04-29

חוזק מודל ה-XP לדרישת מבחן אמיתית: רמת תלמיד מוצגת במפורש כ-`רמת תלמיד X/100`, רמה 1 היא ברירת המחדל גם בלי XP, ורמה 100 נפתחת רק אחרי הוכחת היסטוריית מבחן: `רמה 100 = ציון 100 במבחן על כל השאלות ברמת פרופסור`. נוסף מבחן `level_100_professor` שמסנן רק שאלות ברמת פרופסור ממודולי SVCollege, שומר `level100GateProof` אמיתי בהיסטוריית המבחן, ומציג checklist "למה לא רמה 100 עדיין" בפאנל ה-XP. XP לבדו נעצר ברמה 99 עד שיש הוכחת מבחן כזו. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v10` ו-`CACHE_VERSION` ל-`lumen-v2.4.55`.

### Exportable Level 100 Readiness Addendum — 2026-04-29

נסגר דוח readiness ל-100: `buildProgressSnapshot()` מייצא עכשיו `level100Readiness` עם רמת תלמיד, raw XP level, חסימת XP-only ב-99, הוכחת מבחן פרופסור, שליטת מושגים, הוכחת שאלת עומק, code proof למושגים עם קוד, וחולשות פתוחות. שער רמה 100 עצמו חוזק כך ש-`passed` מחייב את כל הפריטים, לא רק ציון מבחן. כך אפשר לשתף export אמיתי של “למה אני לא 100 עדיין” בלי fake data. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v11` ו-`CACHE_VERSION` ל-`lumen-v2.4.56`.

### Level 100 Release Gate Addendum — 2026-04-29

נסגר P8.3.5: נוסף gate דטרמיניסטי `level100:release-gate:strict` שמריץ/בודק `qa:questions:strict`, `npm run build`, critical flows, PWA/offline, accessibility, top-tabs ו-console gate לפני פתיחת רמה 100. הסקריפט כותב `LEVEL100_RELEASE_GATE.md/json` וגם `data/level100_release_gates.js`; האפליקציה קוראת את הקובץ בזמן ריצה וחוסמת רמה 100 אם הדוח חסר, לא רץ, או שאחד השערים אדום. מצב נוכחי: `7/7` checks passed, ready true. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v12` ו-`CACHE_VERSION` ל-`lumen-v2.4.57`.

### Level-Up Toast Addendum — 2026-04-29

נסגר P8.2.6: `awardLearningReward` מזהה עלייה אמיתית ברמת תלמיד ומציג toast קצר עם `רמת תלמיד X/100`, מספר המטבעות שנצברו, ורמז ליעד הבא. ה-toast לא מוצג על reward כפול, לא על XP שלילי, ולא מחליף את הוכחות ה-mastery. נוסף class ייעודי `level-up-toast` על בסיס מערכת ה-achievement toast הקיימת. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v13` ו-`CACHE_VERSION` ל-`lumen-v2.4.58`.

### Level-Up Reduced Motion Addendum — 2026-04-29

נסגר P8.2.8: level-up toast מכבד `prefers-reduced-motion: reduce` וגם את class `.reduced-motion`. במצב זה אין slide transition ואין transform animation; ההודעה מופיעה במקום קבוע כדי לשמור על נגישות. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v14` ו-`CACHE_VERSION` ל-`lumen-v2.4.59`.

### Economy Anti-Cheat Gate Addendum — 2026-04-29

נסגר P8.7.4: נוסף gate דטרמיניסטי `economy:anti-cheat:strict` שמוודא שאין `Math.random()` בקוד הריצה, ש-`rewardLogId` יציב ולא מבוסס זמן, ש-reward חיובי עם זהות מושג/שאלה נחסם לפני שינוי XP/coins אם הוא כפול, שרכישה בחנות כותבת `xp: 0` ו-`coins: -item.price`, וש-`purchaseStoreItem` לא נוגע בציונים, mastery או level. השער גם נועל את הכלל שרמה 100 לא נקנית ולא נפתחת מ-XP בלבד, אלא רק עם מבחן פרופסור, mastery proof, code proof ו-release gates ירוקים. נוסף `tests/economy-anti-cheat.test.js`.

### Local Coins Privacy Addendum — 2026-04-29

נסגר P8.7.5: חנות החוויות מציגה עכשיו הודעת פרטיות ברורה: המטבעות הם תגמולי למידה מקומיים בלבד, נשמרים בדפדפן, אינם כסף אמיתי ואין להם ערך כספי. `tests/reward-store.test.js` נועל את הטקסט כדי למנוע הצגה מטעה בעתיד. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v15` ו-`CACHE_VERSION` ל-`lumen-v2.4.60`.

### Economy Rollback Strategy Addendum — 2026-04-29

נסגר P8.7.6: נוסף דגל rollback מקומי `lumenportal:economyDisabled:v1` שמקפיא תגמולי XP/coins ורכישות בלי למחוק XP קיים, מטבעות, רכישות או ציוני למידה. `awardLearningReward` מחזיר מצב `disabled` לפני שינוי יתרות, `purchaseStoreItem` נחסם עם הודעה מפורשת, וה-export/import משמרים את מצב ההקפאה. `tests/xp-economy.test.js`, `tests/reward-store.test.js` ו-`tests/progress-export.test.js` נועלים שה rollback לא נוגע ב-scores/mastery. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v16` ו-`CACHE_VERSION` ל-`lumen-v2.4.61`.

### Reward Store Smoke Addendum — 2026-04-29

נסגר P8.4.8: נוסף gate דטרמיניסטי `reward-store:smoke:strict` שבודק shell אמיתי של החנות, חיווט הטאב העליון, פריסת desktop עם grid bounded, התנהגות mobile עם header stacked ו-filter scroll, מצבי רכישה owned/locked/insufficient/disabled, וחיווט filter/buy. `tests/reward-store-smoke.test.js` נועל את הדוח.

### Economy Reward Metadata Addendum — 2026-04-29

נסגרו P8.1.1 ו-P8.1.5: שימושי `awardXP(...)` המפוזרים הוחלפו בקריאות `awardLearningReward(...)` עם metadata אמיתי ו-coins: תשובות במאמן/trace/bug/build דרך `rewardMetaForAnswer`, concept sprint דרך hash דטרמיניסטי של תוצאות הסשן, flashcards לפי מושג+דירוג+יום, סיכום שיעור לפי lesson+יום, רפלקציה יומית, streak יומי, ומבחן מדומה לפי תבנית+ציון+יום. `awardXP` נשאר רק כ-wrapper תאימות לאחור. `tests/xp-economy.test.js` ו-`tests/concept-sprint.test.js` נועלים שאין עוד קריאות `awardXP(` מפוזרות, וש-concept sprint עובר דרך reward metadata מלא. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v17` ו-`CACHE_VERSION` ל-`lumen-v2.4.62`.

### Level 100 Gate Definition Closeout — 2026-04-29

נסגר P8.3.1 כמדיניות מחמירה יותר מהטקסט המקורי: במקום mock exam 95+, רמה 100 דורשת ציון 100 במבחן SVCollege ברמת פרופסור בלבד, כל מושגי SVCollege mastered, הוכחת highest challenge, code proof למושגים עם קוד, אפס חולשות פתוחות, ו-release gates ירוקים. היישום כבר נעול ב-`level100GateStatus`, `level100ProfessorExamProof`, `buildLevel100ReadinessExport` ו-`level100:release-gate:strict`.

### Reward Metadata Audit Addendum — 2026-04-29

נסגר P8.7.3: נוסף gate דטרמיניסטי `economy:reward-metadata:strict` שסורק את כל קריאות `awardLearningReward({ ... })` הישירות ומוודא שכל reward נושא `source` וזהות `conceptKey`/`questionId` או את helper המטאדאטה של תשובה. wrapper התאימות `awardXP` מוחרג בכוונה, כי הוא לא מקור reward עצמאי. `tests/reward-metadata-audit.test.js` נועל את הדוח.

### Economy Dashboard + Tuning Addendum — 2026-04-29

נסגרו P8.7.1 ו-P8.7.2: נוסף `economyRewardTuningRows()` עם טבלת XP/coins לכל מקור reward אמיתי, ונוסף `economyDashboardSummary()` לפאנל XP עם earned, spent, unlocked, next unlock וממוצע coins/day מתוך `rewardLog` והרכישות המקומיות. אין fake data: כשהלוג ריק הערכים נשארים 0 או "אין פריטים נעולים". `tests/xp-economy.test.js` נועל את הטבלה וה-dashboard. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v18` ו-`CACHE_VERSION` ל-`lumen-v2.4.63`.

### Exam Cockpit Addendum — 2026-04-29

נסגר P9.1.1: נוסף `Exam Cockpit` בעמוד הבית עם תוכנית היום לציון 100, readiness % מתוך `level100GateStatus`, מודולי SVCollege החלשים לפי mastery בפועל, drill הבא, ו-blockers פתוחים. הכפתורים מובילים למאמן ידע ולמבחן מדומה. אין fake data: אם אין חולשה או blocker מוצגת הודעת "אין..." ולא נתונים מומצאים. `tests/exam-cockpit.test.js` נועל DOM, חיווט ו-responsive styling. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v19` ו-`CACHE_VERSION` ל-`lumen-v2.4.64`.

### Exam Countdown + Daily Target Addendum — 2026-04-29

נסגר P9.1.2: ה-Exam Cockpit מציג עכשיו countdown מתוך `lumenportal:examDate:v1` ויעד יומי מתוך `lumenportal:examDailyTarget:v1` עם דקות, מספר מודולים, שאלות ומשימות קוד. אם אין תאריך מבחן או שהתאריך לא תקין, מוצגת הודעה מפורשת במקום להמציא תאריך. ברירת היעד היומי היא תוכנית לימוד מקומית שמרנית: 30 דקות, 2 מודולים, 25 שאלות, 3 משימות קוד. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v20` ו-`CACHE_VERSION` ל-`lumen-v2.4.65`.

### Exam Module Heatmap Addendum — 2026-04-29

נסגר P9.1.5: ה-Exam Cockpit כולל עכשיו heatmap לכל מודולי SVCollege הרלוונטיים למבחן, מחושב מתוך mastered/total בפועל לכל מודול (`SVCOLLEGE_EXAM_MODULES` + `scores`). אין ניחוש או fake data: כל תא מציג mastered/total ו-readiness %. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v21` ו-`CACHE_VERSION` ל-`lumen-v2.4.66`.

### Weakest 30-Minute Flow Addendum — 2026-04-29

נסגר P9.1.6: ה-Exam Cockpit כולל כפתור "התחל 30 דקות" שמחשב את המודול החלש ביותר מתוך ה-heatmap, מעביר את מאמן הידע ל-`trainerMode = "weak"`, ופותח את המאמן. אם אין מודול חלש זמין מוצגת הודעה מפורשת במקום להמציא יעד. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v22` ו-`CACHE_VERSION` ל-`lumen-v2.4.67`.

### End-of-Day Report Addendum — 2026-04-29

נסגר P9.1.7: ה-Exam Cockpit מציג דוח סוף יום מתוך `learningEvidence` ו-`rewardLog`: כמה מושגים נלמדו, כמה תשובות/אירועים נכשלו, כמה חזרות בוצעו, כמה mastery changes הגיעו ל-7, כמה XP נצבר היום ומה הפעולה הבאה. אין fake data: אם אין אירועים היום הדוח מציג 0 והפעולה הבאה מחושבת מ-`nextEconomyAction()`. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v23` ו-`CACHE_VERSION` ל-`lumen-v2.4.68`.

### Printable Cram Sheet Link Addendum — 2026-04-29

נסגר P9.1.8: ה-Exam Cockpit מחובר עכשיו ל-`EXAM_FINAL_CRAM_SHEET.md` באמצעות כפתור "פתח דף חזרה", כך שאפשר לפתוח את דף החזרה החלש בלבד ולהדפיס/לשמור ל-PDF מהדפדפן. מקור הדף נשאר `scripts/build_exam_cram_sheet.js` ו-`exam:cram:write`. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v24` ו-`CACHE_VERSION` ל-`lumen-v2.4.69`.

### Profile Backup Restore Smoke Addendum — 2026-04-29

נסגר P9.3.4: נוסף gate דטרמיניסטי `profile:backup-restore:strict` שמוודא שה-export/import מכסה scores, proficiency, answeredQuestions, weaknesses, XP, coins, purchases, rewardLog ו-economy disabled state. השער גם מוודא שה-import מחזיר רשומות אמיתיות ל-localStorage ומחיל non-negative clamp על יתרות. נוסף `tests/profile-backup-restore-smoke.test.js`.

### Exam Accessibility Audit Addendum — 2026-04-29

נסגר P9.3.7: נוסף gate דטרמיניסטי `exam:accessibility:strict` לעץ ניווט, page scroll rail, מודלים, חנות, XP panel ומבחן מדומה. המבחן המדומה קיבל `aria-live` ל-progress/timer, region לשאלה הנוכחית, labels לכפתורי ניווט/הגשה ו-label לניווט בין שאלות. נוסף `tests/exam-accessibility-audit.test.js`. גרסת `app.js/style.css` קודמה ל-`concept-sprint-v25` ו-`CACHE_VERSION` ל-`lumen-v2.4.70`.

### Performance Budget Addendum — 2026-04-29

נסגר P9.3.8: gate דטרמיניסטי `performance:budget:strict` מודד גדלי `index.html`, `app.js`, `style.css`, `service-worker.js`, מוודא שאין preload/טעינה של generated question bank, מחייב בנק ידני בלבד ב-offline shell, ובודק hooks של scroll/render למסכים כבדים. אחרי מדיניות השאלות הידניות, `data/questions_bank_seeded.js` אינו חלק מה-cache ואינו חלק מה-budget הפעיל. נוסף/עודכן `tests/performance-budget.test.js`.

### Full Portal Desktop/Mobile Smoke Addendum — 2026-04-29

נסגרו P9.3.1 ו-P9.3.2: נוסף gate דטרמיניסטי `svcollege:full-portal-smoke:strict` שמצליב את ראיות ה-Browser/Playwright הקיימות עם קוד המקור: desktop מכסה 22/22 top tabs, עץ תוכן, ניווט שיעור ו-6 זרמי פעולה קריטיים; mobile מכסה 22/22 top tabs, drawer, right tree, focus mode ו-0 console errors/warnings. נוסף `tests/svcollege-full-portal-smoke.test.js`.

### Wrong-Answer Coach Addendum — 2026-04-29

נסגר P9.4.1: נוסף כרטיס `wrong-answer-coach-card` אחיד שעוטף את סוכן החולשות הקיים ומציג "מה עושים עכשיו" אחרי תשובה שגויה. הכרטיס מחובר לכל מצבי השאלה הפעילים: מאמן ידע, Code Trace, מושגים נטו, שאלות inline בשיעור, בוחן שיעור, מדריך, בלוקי קוד, Bug Hunt, Bug Quest ומבחן מדומה. תוקן גם selector בבוחן שיעור כך שה-coach נכנס ל-`.quiz-explanation-text` הקיים. נוסף `tests/wrong-answer-coach.test.js`.

### Misconception Named Weakness Addendum — 2026-04-29

נסגר P9.4.2: `src/core/mistake-agent.js` עלה ל-version 3 ומוסיף `namedWeaknesses` דטרמיניסטי. דפוס misconception שחוזר לפחות פעמיים ומופיע ביותר מטאב/מצב שאלה הופך ל"חולשה חוזרת: ..." עם count, modes, concepts, topics ותוכנית תיקון מתוך כרטיס misconception קיים. כרטיס ה-coach מציג את החולשה בשם כשהיא קיימת. `tests/mistake-agent.test.js` ו-`tests/wrong-answer-coach.test.js` נועלים את ההתנהגות.

### Recovery Drill Ladder Addendum — 2026-04-29

נסגר P9.4.3: `scheduleAdaptiveRetests` יוצר עכשיו שלושה תרגולי תיקון מיידיים (`recovery_drill_1..3`) לפני delayed review, כדי שטעות חוזרת לא תחזיר את התלמיד ישירות למצב קשה. ה-due queue הקיים של המאמן צורך אותם אחד-אחד לפני השאלה הבאה הרגילה. `tests/mistake-agent.test.js` נועל את סדר השלבים ואת ה-labels.

### Confidence Calibration Closeout — 2026-04-29

נסגר P9.4.4 על בסיס היישום הקיים: `src/core/confidence-calibration.js` מחשב ביטחון 1-5 מול נכונות בפועל לכל conceptKey, שומר attempts/correct/avgConfidence/calibrationGap ו-buckets של calibrated/overconfident/underconfident. המאמן מציג בחירת ביטחון לפני תשובה ואת feedback אחרי תשובה דרך `renderConfidenceCalibrationFeedback`. `tests/confidence-calibration.test.js` נועל את הלוגיקה.

### Fatigue Guard Addendum — 2026-04-29

נסגר P9.4.5: נוסף fatigue guard שמחשב ירידה חדה מתוך תוצאות אמיתיות בלבד. במאמן נשמר חלון `trainerRecentOutcomes`; אם שלוש התשובות האחרונות יורדות ל-34% ומטה ביחס לשלוש הקודמות, מופיע כרטיס "עומס למידה מזוהה" עם מעבר למצב חזרה. ב-Concept Sprint עם קנס, תוצאה של 50% ומטה עם לפחות שתי טעויות מציעה review לפני ניסיון נוסף. נוסף `tests/fatigue-guard.test.js`.

### One-Line Mastery Checkpoint Addendum — 2026-04-29

נסגר P9.4.6: נושאים קונספטואליים ללא הוכחת קוד דורשים עכשיו checkpoint של הסבר בשורה אחת לפני פתיחת mastery/100. השער מחובר ל-`masteryProofInfo`, שומר `oneLineProof`, מציג input בתוך כרטיס המושג כאשר הסיבה היא `needs-one-line-proof`, ומשחרר מאסטר רק אחרי משפט תקין של 12-180 תווים ולפחות שלושה מונחים. נוספה בדיקה ב-`tests/scoring.test.js` וב-`tests/mastery-proof-gate.test.js`.

### Scratch Mastery Checkpoint Addendum — 2026-04-29

נסגר P9.4.7: נושאי יישום עם קוד דורשים עכשיו checkpoint של כתיבה from scratch לפני פתיחת mastery/100. השער מחובר ל-`masteryProofInfo`, שומר `scratchProof`, מציג textarea בתוך כרטיס המושג כאשר הסיבה היא `needs-scratch-proof`, ודוחה קלט שאינו נראה כמו קוד או שמעתיק את דוגמת המקור במלואה. נוספה בדיקה ב-`tests/scoring.test.js` וב-`tests/mastery-proof-gate.test.js`.

### Exam-Critical Spaced Review Addendum — 2026-04-29

נסגר P9.4.8: נוספה עדיפות חזרה מרווחת שמקדמת קודם מושגים due, חלשים וקריטיים למבחן. `src/core/scoring.js` מוסיף `spacedReviewPriority`, `buildSpacedReviewSchedule` ו-`isExamCriticalConcept`; המאמן מכפיל משקל למושגים בעלי priority גבוה, וכרטיסיות SRS ממיינות לפי אותה עדיפות לפני due/weak רגיל. נוספה בדיקה ב-`tests/scoring.test.js` וב-`tests/exam-cockpit.test.js`.

### Lesson Study Ergonomics Addendum — 2026-04-29

נסגרה בקשת UX בשיעורים: שאלות השיעור עטופות עכשיו בטאב מתקפל `concept-questions-panel`, כל שאלה מוצגת כ"שאלה X מתוך Y", סרגל הגלילה השמאלי מציג גם אחוז מיקום בדף, ובתוך כל שיעור נוסף ניווט בין מושגים + כפתור לשיעור הבא כדי לצמצם תלות בתפריטי הצד. נוספה בדיקה ב-`tests/lesson-compact-view.test.js`. תפריטי השיעור ממשיכים להשתמש במצב `lesson-reading-mode` שמסתיר כפילויות desktop ומשאיר עץ תוכן כ-drawer.

### Lesson Question Bank Diagnostic Addendum — 2026-04-29

נוסף בכל שיעור כפתור עליון `בנק שאלות` שפותח פאנל מתקפל לבדיקת ידע מהירה על המושג הנוכחי. האבחון משתמש רק בשאלות קיימות מבנק המושג, מתחיל מרמה 0, מעלה `רמה מהירה` אחרי תשובה נכונה, נעצר אחרי טעות, ושומר `quickDiagnostic` בפרופיל המושג בלי להוריד רמה קיימת. נוספה בדיקת חוזה ב-`tests/lesson-compact-view.test.js`.

### Exam Edition Release Freeze Addendum — 2026-04-29

נסגר P9.5.1: נוסף gate `exam:release-freeze:strict/write` שמקפיא את `svcollege-exam-edition-2026-04-29` רק אחרי שכל שערי הבחינה עוברים: validate, QA questions, readiness release, tab matrix, command center, student export, critical flows, full portal smoke, visual overlap, PWA/offline, backup/restore, accessibility, performance, question reuse, level100 release gate, unit tests ו-build. נוצרו `EXAM_EDITION_RELEASE_FREEZE.md/json` ו-`data/exam_edition_release_freeze.js`; מצב נוכחי: `17/17` checks passed, `ready: true`, `frozen: true`.

### Portal Boundary Addendum — 2026-04-29

נסגר P9.5.2: נוסף מסמך `PORTAL_BOUNDARY_POLICY.md` ושער `portal:boundary:strict/write` שמוודא שהפורטל הפעיל נשאר SVCollege AI & Full Stack בלבד. השער מחייב blueprint primary יחיד `svcollege_fullstack_ai`, ניווט שמציג `יישור SVCollege`, freeze script פעיל, ומדיניות מפורשת שכל מיפוי בית־ספר/קורס עתידי עובר למפרט פורטל נפרד. נוצרו `PORTAL_BOUNDARY_REPORT.md/json`; מצב נוכחי: `6/6` checks passed.

### Teacher Lite Export Addendum — 2026-04-29

נסגר P9.5.3: Teacher Lite כולל עכשיו כיתה אחת, טבלת תלמידים, heatmap שליטה לפי מושג ותלמיד, וייצוא JSON מקומי דרך `ייצא Teacher Lite`. הייצוא נבנה מ-`studentsReport` ו-`heatmapReport` אמיתיים בלבד, מחשב weak topics מתוך תאי mastery קיימים, ומסמן נתונים חסרים כ-`unknown/unavailable` במקום להמציא תלמידים או ציונים. נוספו בדיקות ב-`tests/teacher-heatmap.test.js` וב-`tests/teacher-lite-ui.test.js`.

### Sync Alpha Gate Addendum — 2026-04-29

נסגר P9.5.4: נוסף מסמך `SYNC_ALPHA_POLICY.md`, הודעת פרטיות גלויה ליד כפתורי ה-Sync, ושער `sync:alpha:strict/write`. השער מחייב auth token עם UUID subject, שמירת access token ב-`sessionStorage` בלבד, snapshot יחיד ב-`user_progress`, מדיניות conflict דטרמיניסטית `last-write-wins`, וחסימה מלאה כשאין credentials אמיתיים. נוצרו `SYNC_ALPHA_REPORT.md/json`; מצב נוכחי: `6/6` checks passed.

### AI Tutor Alpha Gate Addendum — 2026-04-29

נסגר P9.5.5: ה-AI Tutor production Alpha חובר ל-Supabase Edge Function credential-gated במקום מפתח בדפדפן. ה-Edge Function כולל guardrails נגד answer leakage, rate limit שרת לפי Authorization/IP, logs מובנים ללא תוכן הודעת המשתמש, model/env config, וחסימה כשאין `ANTHROPIC_API_KEY`. ה-UI מציג הודעת Alpha וממשיך ל-fallback מקומי אם אין credentials אמיתיים. נוסף gate `ai-tutor:alpha:strict/write`; נוצרו `AI_TUTOR_ALPHA_REPORT.md/json`; מצב נוכחי: `7/7` checks passed.

### Content Factory Pipeline Addendum — 2026-04-29

נסגר P9.5.6: נוסף מסמך `CONTENT_FACTORY_PIPELINE.md` ושער `content-factory:pipeline:strict/write` שמחבר יצירת שאלות דטרמיניסטית מנתוני מושגים אמיתיים, `validate:strict`, `qa:questions:strict`, distractor audit, remediation queue עם manual review, prerequisite metadata ו-question reuse audit. אין auto-fabrication ואין placeholder rows. נוצרו `CONTENT_FACTORY_PIPELINE_REPORT.md/json`; מצב נוכחי: `8/8` checks passed.

### Critical Practice Flow Smoke Addendum — 2026-04-29

נסגר P-1.5.3: נוסף gate דטרמיניסטי ב-`scripts/report_svcollege_critical_flows.js` שמכסה את ששת הזרמים הקריטיים של Finish Line 1: Trainer, Study, Mock Exam, Bug Hunt, Mini Build ו-Code Trace. השער מאמת DOM, חיווט app, אינטראקציות והוכחת כיסוי 15/15 מודולי SVCollege דרך tab matrix, ו-`tests/svcollege-critical-flows.test.js` נועל את הדוח ואת פלט ה-release review.

### Context Tree Smoke Addendum — 2026-04-29

נסגר P-1.5.2: נוסף gate דטרמיניסטי ב-`scripts/report_svcollege_context_tree_smoke.js` שמאמת את shell של עץ הצד, חיפוש, פעולות leaf, 21 ענפים/תתי-תפריטים מרכזיים, והצלבה מול `rightTree` + `lessons` + prerequisite coverage עבור 15/15 מודולי SVCollege. `tests/svcollege-context-tree-smoke.test.js` נועל את הדוח כדי למנוע מצב שבו טאב נפתח בלי עץ צד שמיש.

### PWA Offline Smoke Addendum — 2026-04-29

נסגר P-1.5.7: `service-worker.js` עודכן ל-cache version `lumen-v2.4.30`, כולל נכסי `src/main.js` החדשים (`outcome-loop`, `concept-tags`) וכל נכסי SVCollege ה-versioned שנדרשים לטעינת offline first-load. נוסף gate `scripts/report_svcollege_pwa_offline_smoke.js` שמאמת manifest, registration, install/activate/fetch strategy, ו-106/106 נכסי offline core ב-precache. `tests/svcollege-pwa-offline-smoke.test.js` ו-`tests/service-worker-cache.test.js` נועלים את זה.

### Accessibility Smoke Addendum — 2026-04-29

נסגר P-1.5.6: נוסף gate `scripts/report_svcollege_accessibility_smoke.js` שמאמת focus shell, accessible names לכל 22 top tabs, סגירת מודלים, ניווט מקלדת, focus rings, high contrast/reduced motion, ו-state controls של תפריט הנגישות. `tests/svcollege-accessibility-smoke.test.js` נועל את הדוח כדי ששינוי UI לא ישבור את זרמי SVCollege במקלדת או בקורא מסך בסיסי.

### Console Gate Addendum — 2026-04-29

נסגר P-1.5.5: נוסף gate `scripts/report_svcollege_console_gate.js` שנכשל אם ראיות ה-browser smoke אינן מציינות `0` console errors/warnings, אם `svcollege:critical-flows:strict` אינו ירוק, או אם קוד הזרמים הקריטיים מכניס `console.error`. `tests/svcollege-console-gate.test.js` נועל את שער ה-release הזה כפקודת CI מקומית `svcollege:console-gate:strict`.

### Runtime/UI Issue Closure Addendum — 2026-04-29

נסגר P-1.5.8: הפערים שנמצאו בסבב ה-smoke האוטומטי תוקנו לפני כל Priority 2: `service-worker.js` עודכן כדי לכלול `outcome-loop`, `concept-tags` וכל נכסי SVCollege ה-versioned ב-offline precache, ושערי `critical-flows`, `context-tree`, `pwa-offline`, `accessibility`, `console-gate`, Vitest מלא ו-build עברו ירוק.

### Top Tab + Screenshot Smoke Addendum — 2026-04-29

נסגרו P-1.5.1 ו-P-1.5.4: הורץ Browser Playwright smoke אמיתי על 22/22 top tabs מול `http://127.0.0.1:5173`, עם `0` console errors, ונשמרה ראיית JSON ב-`output/playwright/svcollege-critical-flows/top-tab-browser-smoke.json`. בנוסף נוצרו 12 screenshots לזרמים הקריטיים — 6 desktop ו-6 mobile viewport באמצעות iframe `390×844` — ומתועדים ב-`SVCOLLEGE_CRITICAL_FLOW_SCREENSHOTS.md`. השערים `svcollege:top-tabs:strict` ו-`svcollege:screenshot-evidence:strict` מאמתים את הראיות.

### Phase 1 Detailed:
- W1 Architecture: ✅ 14/14 (lazy load + per-card + Vitest baseline; current suite 209 tests)
- W2 Accessibility: ✅ 11/16 (ARIA done, keyboard partial, motion+light done)
- W3 PWA: ✅ 5/6 (manifest + SW done, install prompt deferred)
- W4 Code Runner/Bug/Mini-Build: ✅ 12/12 (Code Runner, 14 Bug Hunts, 21 Builds; 50 new Trace items incl. closures)
- W5 Mock Exam + Study UX: 🚧 11/14 (Mock Exam done; user-requested UX 4/4 done; full distractor coverage partial)

### Phase 2 Sprint 1 Done:
- Anti-Pattern Gallery: ✅ 4/4 (22 patterns, UI, CSS)
- Mnemonics Lab: ✅ 3/3 (9 concepts in Hebrew with rhymes)
- Flashcards UI: ✅ 4/4 (SRS tab + generated real lesson cards + ratings)

### Phase 2 Sprint 2 Done:
- War Stories Library: ✅ (31 incidents, UI integrated)
- Side-by-Side Comparator: ✅ (6 comparisons, UI integrated)
- Mental Model Animator: ✅ (6 concepts × 3-4 frames + stepper UI + auto-play)

### 2026-04-28 Re-baseline Notes:
- דוח הביקורת צדק בעיקר לגבי הסיכון הניהולי: מעכשיו `Done` מחייב קוד + בדיקות + וידוא UX/browser + תיעוד + מדד כיסוי.
- המספרים הישנים בדוח לגבי Anti-Patterns / War Stories / Mini Builds כבר לא עדכניים בריפו: אומתו 22/22 anti-patterns, 31/30 war stories, 21/21 mini builds.
- Per-Distractor Feedback סווג מחדש כ-Partial: קיימים UI וסכמה + 50 שאלות MC מכוסות, אבל לא 100% מבנק ה-MC.
- Cross-device Sync נסגר בתוך Phase 2: Export/Import, טבלאות Supabase, live sync credential-gated, ו-last-write-wins קיימים. אין credentials מוטמעים ואין סביבת Supabase מומצאת; sync פועל רק עם URL, anon key ו-access token אמיתיים.
- AI Tutor נשאר MVP מקומי/דמו: production Alpha עם guardrails, logging, streaming ו-rate limits אמיתיים עבר ל-Phase 5.
- Phase 5 נוסף כדי להפוך ביקורת איכות, מדדי כיסוי, ו-90-day roadmap למשימות נמדדות.

---

## 🚨 Finish Line 1 — SVCollege Full Portal Coverage

> מקור קנוני: `data/course_blueprints.js` + `SVCOLLEGE_COVERAGE_REPORT.md`  
> DoD: כל חומר SVCollege ממופה ומכוסה בשיעור, תרגול, מבחן, ניווט וטאב; כל חלק באתר נפתח בלי שגיאת runtime; אין הרחבת Priority 2 לפני שהשער הזה ירוק.

### 🚨 P-0 — Exam-Critical Full Stack 100% In Every Tab (FIRST PRIORITY)

> יעד מיידי: להגיע ל-100 במבחן הקרוב. כל משימה אחרת מוקפאת עד שהרשימה הזו ירוקה.

- [V] P-0.0.1 — Declare exam goal: 100% Full Stack course coverage in every tab before every other roadmap item
- [V] P-0.0.2 — Capture current baseline: 100% readiness, 15/15 covered, 0 release blockers; smoke evidence still pending
- [V] P-0.0.3 — Build a module × tab × practice matrix for the entire Full Stack course (`SVCOLLEGE_TAB_MATRIX.md`: 225/225 strict cells)
- [V] P-0.0.4 — Close AI Engineering gap: Vercel AI SDK, OpenAI API, LangChain, embeddings, RAG, tool calling, agents, fine-tuning boundaries
- [V] P-0.0.5 — Close shadcn/UI + design systems partial: accessible primitives, variants, Tailwind integration, guided build
- [V] P-0.0.6 — Add exam-final release gate: module coverage + tab matrix + command center are green; full top-tab smoke evidence remains P-1.5
- [V] P-0.0.7 — Run and document all-tabs desktop browser smoke (`SVCOLLEGE_BROWSER_SMOKE.md`)
- [V] P-0.0.8 — Run and document all-tabs mobile browser smoke (`SVCOLLEGE_BROWSER_SMOKE.md`)
- [V] P-0.0.9 — Run `npm run svcollege:readiness:release` and keep it green before any Priority 2 work
- [V] P-0.0.10 — Freeze museum/premium/community/native/teacher-dashboard work unless it directly fixes Full Stack exam readiness
- [V] P-0.0.11 — Add canonical concept tags/keys so every answer updates one unified knowledge profile per concept across all tabs and prevents duplicate score buckets

### 🚨 P-0.2 — Post-Merge Reality Check — 2026-04-29

> נוצר בעקבות מיזוג הענפים והרצות `npm test`, `npm run build`, `npm run validate:strict`, `npm run qa:questions:strict`.

- [V] P-0.2.1 — Merge local repair branches into `main`: `codex/svcollege-prereq-gates` + `codex/svcollege-term-clarity`
- [V] P-0.2.2 — Push `main` to GitHub after explicit approval; `main` now includes `6c6a92c` (`Finish SVCollege portal coverage`)
- [V] P-0.2.3 — Close `qa:questions:strict` blocker: 252 SVCollege question aids previously reported `missingGlossaryTerms`; now 0 issues / ready:true
- [V] P-0.2.4 — Add glossary aliases for terms inferred by `QUESTION_QA_CHECKLIST.json` until `missingGlossaryTerms = 0`
- [V] P-0.2.5 — Add automated smoke for mastery-proof gate: no concept can show 100 / mastered until highest available challenge question is solved
- [V] P-0.2.6 — Add automated layout smoke for W12 XP/streak bar so it never appears in the central empty column
- [V] P-0.2.7 — Reduce duplicated navigation chrome: top tabs are one horizontal scroll row, W12 XP/streak bar is mounted inside the right sidebar header, and learning focus mode provides a full-screen study view with a slide-in context tree
- [V] P-0.2.8 — Add passwordless local learner profiles so all scores, weak concepts, XP and study actions are scoped immediately to the active student
- [V] P-0.2.9 — Add `מושגים נטו` concept sprint tab: quick risky, medium and long diagnostic routes that update Knowledge Trainer scores and apply XP bonus/penalty

### 🚨 P-0.3 — Exam Week 7-Day Sprint

> מטרה: להפוך את ה-ready הכללי ל-ready שימושי למבחן. כל משימה כאן צריכה להוכיח שהפורטל עוזר ללמוד בפועל, לא רק שעובר build.

- [V] P-0.3.1 — Generate a daily "weakest 10 concepts" list from canonical concept tags, wrong answers, proof gaps and density warnings (`npm run exam:weakest:write`)
- [V] P-0.3.2 — Expand hard-bank first for the 50 most exam-critical weak concepts, not for random low-risk concepts; superseded by `validate:strict` density `0/568` and `exam:weakest` hard gaps `0`
- [V] P-0.3.3 — Run one-line definition audit: every visible concept card and prerequisite popover must answer "מה זה?" in one sentence; `exam:weakest` reports `withoutDefinition: 0`
- [V] P-0.3.4 — Run no-repeat learner simulation: clean profile, 100 answers, verify no question repeats before bank exhaustion (`npm run exam:flows:strict`)
- [V] P-0.3.5 — Run harder-after-correct learner simulation: correct answers must escalate to harder same-concept questions where available (`npm run exam:flows:strict`)
- [V] P-0.3.6 — Run wrong-answer repair simulation: wrong answer must add weakness, show concise explanation and trigger recovery drill (`npm run exam:flows:strict`)
- [V] P-0.3.7 — Run mobile smoke for all top tabs, right tree, focus mode, concept sprint and mock exam (`22/22` top tabs, `0` console errors/warnings)
- [V] P-0.3.8 — Run focus-mode smoke: no XP/status/navigation strip may consume central learning space (`body.learning-focus-mode`, top tabs hidden)
- [V] P-0.3.9 — Verify local profile backup/export before exam week: scores, XP, coins, weak concepts, answered question IDs and proof state
- [V] P-0.3.10 — Create final cram sheet from weak concepts only, with one-line definitions and comparison tables where needed (`EXAM_FINAL_CRAM_SHEET.md`)
- [V] P-0.3.11 — Run 3 deterministic mock exam variants and verify full SVCollege module coverage in each (`MOCK_EXAM_VARIANTS_REPORT.md`)
- [V] P-0.3.12 — Freeze an `Exam Edition RC` only after tests, build, readiness, tab matrix, question QA, desktop smoke and mobile smoke are green (`EXAM_EDITION_RC.md`)

### 🚨 P-0.4 — System Audit Findings — 2026-04-29

> מקור: אודיט מקומי מלא ב-2026-04-29. עיקר המערכת ירוק, אבל איכות שאלות/הגדרות עדיין לא ברמת 100 למבחן. אין לפתוח Priority 2 לפני סגירת ה-open items כאן.

- [V] P-0.4.1 — Verify current test suite: `npm test -- --run` passed `56 files / 291 tests`; no Vitest warning after `lib/rng` browser-only localStorage fix
- [V] P-0.4.2 — Verify production build: `npm run build` passed with Vite
- [V] P-0.4.3 — Verify SVCollege release gates: readiness `100%`, `15/15 covered`, tab matrix `100%`, command center `0 blockers`
- [V] P-0.4.4 — Verify content/asset gates that are green: `qa:questions:strict ready:true`, quiz keys `145/145`, lesson assets `36 in lessons/`, feature coverage strict `0 failures`, seeded/distractor audits passed
- [V] P-0.4.5 — Fix `validate:strict` blocker: 8 ambiguous Fill warnings (`fill_html_css_007`, `fill_tooling_007`, `fill_nest_002`, `fill_next_001`, `fill_design_001`, `fill_design_002`, `fill_nest_004`, `fill_tooling_011`)
- [V] P-0.4.6 — Reduce question remediation queue from `392` to `0` or documented accepted-risk: now `0 blockers / 0 warnings / 0 notes`
- [V] P-0.4.7 — Add missing concept routing metadata for 70 queued questions so every answer updates the correct concept profile
- [V] P-0.4.8 — Review/fix 214 Fill leakage issues where answer tokens are visible in code (`review-fill-leakage: 0`)
- [V] P-0.4.9 — Rewrite 48 near-duplicate distractor sets so wrong options test real misconceptions
- [V] P-0.4.10 — Balance 311 option-length cue notes so the correct answer is not guessable by length
- [V] P-0.4.11 — Replace 32 generic-wording notes with concrete, exam-facing wording
- [V] P-0.4.12 — Add one-line “מה זה?” definitions for the 262 SVCollege concepts still missing concise definitions (`npm run exam:weakest` now reports `withoutDefinition: 0`)
- [V] P-0.4.13 — Expand question density: seeded generator + targeted curated Fill now cover `2,840` total MC/Fill questions; `validate:strict` density gaps reduced from `377/568` to `0/568`
- [V] P-0.4.14 — Complete Per-Distractor Feedback: full MC coverage now `1704/1704` (`100%`) via explicit curated/seeded `optionFeedback`; feature coverage reports `24/24 done`
- [V] P-0.4.15 — Fix Vitest `--localstorage-file` warning: `lib/rng.js`/`lib/rng.ts` no longer touch Node's global Web Storage during tests
- [V] P-0.4.16 — Run mobile smoke and focus-mode smoke after the audit fixes: Playwright desktop + 390×844 mobile smoke passed, no console errors/warnings, focus mode hides top tabs and opens the side tree
- [V] P-0.4.17 — Close exam-week hard/proof gaps: added level-5 Fill/code-proof questions for `fs`, `By Value`, `spread`, new-array-from-existing, `$gte`, `$lte`, `side effect`, `var`, `string`, `export default`, and `props`; `npm run exam:weakest` now reports all 5 critical counters at `0`

### P-0.1 — Per-Tab 100% Full Stack Material Checklist

- [V] P-0.1.1 — Lessons tab: every Full Stack lesson appears in the right-side tree, ordered by course flow, with every concept reachable
- [V] P-0.1.2 — Concept cards: every Full Stack concept has prerequisite capsules, 7-level explanations, code, analogy, practice and weak-repair routing
- [V] P-0.1.3 — Quick Guide tab: every Full Stack module has concise exam-facing summary and common mistakes
- [V] P-0.1.4 — Grandma Knowledge tab: every Full Stack term has simple explanation and dependency path
- [V] P-0.1.5 — Programming Basics tab: includes all prerequisite basics needed for the Full Stack course questions
- [V] P-0.1.6 — Programming Principles tab: includes determinism, state, side effects, complexity, data flow, API boundaries and testing basics
- [V] P-0.1.7 — Museum tab: links historical/contextual material only where it strengthens exam understanding, without displacing core study
- [V] P-0.1.8 — Knowledge Map tab: shows every Full Stack module, lesson, concept, status, weakness and readiness grade
- [V] P-0.1.9 — Gap Matrix tab: marks red/yellow/green for every module and gives the next study action
- [V] P-0.1.10 — Trainer tab: can generate questions for every Full Stack concept, including AI Engineering and shadcn/UI
- [V] P-0.1.11 — Study Mode tab: adaptive queue includes every weak Full Stack concept and prerequisite rewind
- [V] P-0.1.12 — Flashcards tab: every Full Stack concept has SRS cards and ratings
- [V] P-0.1.13 — Mock Exam tab: final SVCollege/Full Stack template samples every required module deterministically
- [V] P-0.1.14 — Code Trace tab: every code-flow-heavy module has trace exercises
- [V] P-0.1.15 — Bug Hunt tab: every backend, auth, DB, React, Next, DevOps and AI module has bug coverage where relevant
- [V] P-0.1.16 — Mini Build tab: every implementation-heavy module has a build exercise with tests or expected checks
- [V] P-0.1.17 — Code Blocks + Code Anatomy tabs: every important Full Stack code pattern is explorable by lesson and concept
- [V] P-0.1.18 — Comparisons tab: includes all exam-confusing pairs: state/props, server/client, SQL/NoSQL, auth/session/JWT, SSR/SSG/ISR, Docker/image/container
- [V] P-0.1.19 — Capstones tab: maps every course module to a practical final-project readiness task
- [V] P-0.1.20 — Learning Evidence / Reports / Export / PDF: include Full Stack readiness, weak modules, completed topics and exam action list

### Finish Line 1 Definition of Done

- כל מודול ציבורי של SVCollege מופיע ב-blueprint עם `covered` / `partial` / `gap`.
- כל מודול `covered` או `partial` מחובר לשיעור אמיתי, מושגים, תרגול ומבחן מדומה.
- כל `gap` מקבל שיעור יעד, תרגול יעד, וטאב/תפריט שבו הוא יופיע.
- כל שיעור בפורטל כולל: מטרות, דרישות קדם, מושגים, הסבר פשוט, קוד, שאלות, תרגול, ומיפוי לטאב.
- כל טאב ראשי וכל תת-תפריט צד נפתח בדסקטופ ובמובייל בלי console errors.
- כל מצב תרגול עובד: שיעורים, מאמן ידע, לימוד מותאם, מבחן מדומה, Code Trace, Bug Hunt, Mini Build, Flashcards, Pair-Match, Gap Matrix, Course Blueprints.
- מבחן SVCollege ייעודי דוגם את כל המודולים ולא רק JS/React/Node.
- CI כולל smoke לאתר, בדיקות תוכן, שאלות, feature coverage, `npm audit`, build, Vitest, ו-No-Math.random.

### P-1.0 — Finish Line Governance
- [V] P-1.0.1 — Declare SVCollege full portal coverage as Finish Line 1
- [V] P-1.0.2 — Mark museum / community / premium / AI Tutor production as Priority 2 until Finish Line 1 is green
- [V] P-1.0.3 — Add Finish Line 1 to summary table and execution plan
- [V] P-1.0.4 — Add PR checklist rule: no Priority 2 feature unless it directly closes SVCollege/site-health risk
- [V] P-1.0.5 — Add weekly SVCollege readiness report command/script
- [V] P-1.0.6 — Scope Course Blueprints / יישור קורסים to SVCollege AI & Full Stack only; defer other schools to separate future portals

### P-1.1 — Canonical SVCollege Coverage Map
- [V] P-1.1.1 — Verify current public SVCollege course source
- [V] P-1.1.2 — Update `svcollege_fullstack_ai` blueprint as primary target
- [V] P-1.1.3 — Add `SVCOLLEGE_COVERAGE_REPORT.md`
- [V] P-1.1.4 — Add regression test for SVCollege module mapping
- [V] P-1.1.5 — Add automatic coverage percentage per SVCollege module
- [V] P-1.1.6 — Add UI indicator: Covered / Partial / Gap inside Course Blueprints tab

### P-1.2 — All SVCollege Lessons Coverage
- [V] P-1.2.1 — Create full lesson inventory: existing lessons + missing SVCollege modules
- [V] P-1.2.2 — Add HTML/CSS foundations lesson: semantic HTML, forms, selectors, box model, accessibility basics
- [V] P-1.2.3 — Add Git/tooling lesson: GitHub workflow, branch/PR, ESLint, Prettier, npm scripts
- [V] P-1.2.4 — Add PostgreSQL + ORM lesson: schema, relations, migrations, Prisma/Drizzle CRUD
- [V] P-1.2.5 — Add Auth lesson: JWT, cookies, sessions, provider auth, security boundaries
- [V] P-1.2.6 — Add Next.js lesson: routing, layouts, server/client components, API routes, SEO, deploy
- [V] P-1.2.7 — Add DevOps lesson: Vercel, Docker, Docker Compose, CI/CD, testing workflow
- [V] P-1.2.8 — Add Nest.js bridge lesson: modules, controllers, providers, dependency injection
- [V] P-1.2.9 — Add AI Engineering lesson: Vercel AI SDK, OpenAI API, LangChain, RAG, Agents, Fine-tuning boundaries
- [V] P-1.2.10 — Add prerequisites, glossary entries, 7-level explanations and code examples to every new SVCollege lesson

### P-1.3 — All Lessons Practice Coverage
- [V] P-1.3.1 — Ensure every SVCollege lesson has MC + Fill coverage
- [V] P-1.3.2 — Ensure every SVCollege lesson has at least one Code Trace where code flow matters
- [V] P-1.3.3 — Ensure every SVCollege lesson has at least one Mini Build where implementation matters
- [V] P-1.3.4 — Ensure every backend / DB / auth lesson has Bug Hunt coverage
- [V] P-1.3.5 — Add per-distractor feedback for all SVCollege mock-exam MC questions (`tests/svcollege-practice-loop.test.js`, full MC option-feedback gate)
- [V] P-1.3.6 — Add weak-concept repair routing for every new SVCollege module (`prerequisite_rewind` + all 15 SVCollege modules have trainer/study/prerequisite coverage)
- [V] P-1.3.7 — Add flashcards and SRS hooks for every new SVCollege lesson
- [V] P-1.3.8 — Add capstone links for every SVCollege domain: frontend, backend, DB, auth, Next, AI
- [V] P-1.3.9 — Add question-quality gate scoped to SVCollege readiness
- [V] P-1.3.10 — Add remediation queue for SVCollege gaps before expanding non-core content
- [V] P-1.3.11 — Add no-repeat answered-question registry + harder replacement variants + deep option rationales for trainer/concept sprint

### P-1.4 — All Portal Tabs Must Support SVCollege
- [V] P-1.4.1 — Lessons tab: every SVCollege lesson appears in right-side tree and concept jumper
- [V] P-1.4.2 — Adaptive trainer / Study tab: can pick every SVCollege concept and gap module
- [V] P-1.4.3 — Mock Exam tab: add SVCollege-specific template and scoring breakdown by module
- [V] P-1.4.4 — Knowledge Map / Gap Matrix tabs: show SVCollege readiness by topic and lesson
- [V] P-1.4.5 — Code Trace / Bug Hunt / Mini Build tabs: include SVCollege module filters
- [V] P-1.4.6 — Flashcards / Pair-Match tabs: include cards/games for all new SVCollege lessons
- [V] P-1.4.7 — Quick Guide / Grandma Knowledge / Concept Cards: include the missing SVCollege modules
- [V] P-1.4.8 — Course Blueprints tab: add readiness dashboard, gaps, next action and exam readiness
- [V] P-1.4.9 — Reports / History / Export / PDF flows: include SVCollege readiness status
- [V] P-1.4.10 — Mobile drawer and right-side tree: expose all SVCollege lessons and tabs without overflow/overlap (mobile context-tree drawer + regression test)
- [V] P-1.4.11 — Apply portal-wide one-line + comparison principle: every major tab gets concise "מה זה" rows and "מתי להשתמש במה" comparison table

### P-1.5 — Site Health Gate For Every Tab
- [V] P-1.5.1 — Add Playwright smoke suite for every top tab (`svcollege:top-tabs:strict`, Browser Playwright evidence, 22/22 tabs, 0 console errors)
- [V] P-1.5.2 — Add smoke suite for every right-side tree branch and submenu (`svcollege:context-tree:strict`, 21/21 tree targets, 15/15 modules)
- [V] P-1.5.3 — Add smoke suite for Trainer, Study, Mock Exam, Bug Hunt, Mini Build, Code Trace (`svcollege:critical-flows:strict`, 6/6 flows, 15/15 modules)
- [V] P-1.5.4 — Add desktop + mobile viewport screenshots for critical flows (`svcollege:screenshot-evidence:strict`, 12/12 screenshots)
- [V] P-1.5.5 — Fail CI on runtime console errors in critical flows (`svcollege:console-gate:strict`, browser smoke 0 errors/warnings, 6/6 critical flows)
- [V] P-1.5.6 — Add accessibility smoke: focus order, modal close, keyboard navigation, contrast (`svcollege:accessibility:strict`, 7/7 checks, 22 top tabs)
- [V] P-1.5.7 — Add PWA/offline smoke for core SVCollege flow (`svcollege:pwa-offline:strict`, 106/106 assets, 11/11 strategy checks)
- [V] P-1.5.8 — Fix every runtime/UI issue found before adding Priority 2 features (PWA/offline cache gaps fixed; all new P-1.5 gates, tests and build green)

### P-1.6 — SVCollege Assessment Readiness
- [V] P-1.6.1 — Add SVCollege-specific mock exam template
- [V] P-1.6.2 — Add SVCollege module scoring: HTML/CSS, JS, Tooling, Backend, DB, Auth, React, TS, Next, DevOps, Nest, AI
- [V] P-1.6.3 — Add exam review screen: weak modules, prerequisite rewind, recommended lesson path
- [V] P-1.6.4 — Add deterministic question sampler that covers every SVCollege module
- [V] P-1.6.5 — Add SVCollege final-project readiness rubric
- [V] P-1.6.6 — Add teacher/student export summary for SVCollege readiness (`SVCOLLEGE_STUDENT_READINESS_EXPORT.md`)
- [V] P-1.6.7 — Add pass/fail gate: no "ready" badge until all required modules are covered

### P-1.7 — Finish Line Release Gate
- [V] P-1.7.1 — Finish Line 1 cannot close while any SVCollege module is `gap`
- [V] P-1.7.2 — Finish Line 1 cannot close while any top tab has failing smoke coverage (`SVCOLLEGE_BROWSER_SMOKE.md`: desktop + mobile pass)
- [V] P-1.7.3 — Finish Line 1 cannot close while SVCollege mock exam misses a module
- [V] P-1.7.4 — Finish Line 1 cannot close while CI, build, validation or audit is red

### P-1.8 — Question Learning Contract + Prerequisite Capsules
- [V] P-1.8.1 — Add `questionPrerequisites` contract for every SVCollege mock-exam question: required concepts, required terms, and assumed prior knowledge (`qa:questions:strict` now fails if the SVCollege prerequisite gate is not ready)
- [V] P-1.8.2 — Show a right-side "מה צריך לדעת כדי לענות?" panel beside every hard question
- [V] P-1.8.3 — Add mini explanations for required terms: bit, byte, value, key, variable, array, object, function, request, response, schema, token; SVCollege QA aliases cover 0 missing glossary terms
- [V] P-1.8.4 — If a learner misses an advanced question, route first to the weakest prerequisite capsule before retesting
- [V] P-1.8.5 — Add validation: no SVCollege hard question can ship without prerequisite and side-explanation metadata; `qa:questions:strict` is ready:true
- [V] P-1.8.6 — Add browser smoke for prerequisite panel in lesson quiz, trainer and mock exam (`SVCOLLEGE_BROWSER_SMOKE.md`)

### P-1.9 — SVCollege Command Center
- [V] P-1.9.1 — Add a single SVCollege dashboard tab/section: readiness, release blockers, next actions, weak modules and tab-health status (`SVCollege Command Center` inside יישור SVCollege)
- [V] P-1.9.2 — Merge readiness sources into one report: blueprint coverage, lesson inventory, question coverage, feature coverage, quiz-key coverage and smoke status
- [V] P-1.9.3 — Add "red first" work queue sorted by release blockers: Auth, SQL/ORM, Next.js, DevOps, Nest.js, AI Engineering
- [V] P-1.9.4 — Add parallel-session board with file ownership, branch name, model/intelligence level and merge order
- [V] P-1.9.5 — Add evidence links for every module: data file, questions, trace/build/bug items, tests and browser verification
- [V] P-1.9.6 — Add no-evidence gate: `covered` is forbidden without lesson + practice + tab + test evidence

### P-1.10 — Lesson Source + Asset Registry
- [V] P-1.10.1 — Move raw lesson assets from repo root into `lessons/`
- [V] P-1.10.2 — Create `lessons/manifest.json` with filename, type, source lesson, SVCollege module, imported status and linked data file
- [V] P-1.10.3 — Add a script that fails if new PDF/MP4/DOCX/PPTX lesson assets are left in the root folder
- [V] P-1.10.4 — Link every new SVCollege lesson to its raw source assets and generated summaries
- [V] P-1.10.5 — Add "source coverage" column to `SVCOLLEGE_LESSON_INVENTORY.md`

### P-1.11 — Real Learner Outcome Loop
- [V] P-1.11.1 — Add a 10-student pilot protocol: baseline exam, 7-day use, final exam, qualitative feedback (`SVCOLLEGE_LEARNER_OUTCOME_LOOP.md`)
- [V] P-1.11.2 — Track D1/D7 retention, module mastery, average wrong-to-correct recovery time and repeated misconception rate (`src/core/outcome-loop.js`, Learning Evidence tab)
- [V] P-1.11.3 — Add "student got stuck" feedback button with current lesson, question, prerequisite and viewport metadata (`student_stuck` learning evidence event)
- [V] P-1.11.4 — Add teacher-facing weekly SVCollege progress export before building any broad teacher dashboard (`SVCOLLEGE_STUDENT_READINESS_EXPORT.md`)
- [V] P-1.11.5 — Define promotion rule: a module is "ready for students" only after content, practice, smoke and first-user feedback pass (`SVCOLLEGE_LEARNER_OUTCOME_LOOP.md`, weekly export)

**Finish Line 1 Total: 143/143 ✅**

---

## ✅ Phase 0 — Status (כבר הושלם)

### Foundation (מ-Tracks A+B+C ב-PR #8)
- [V] P0.1.1 — Math.random → mulberry32 PRNG (lib/rng.js)
- [V] P0.1.2 — SRS schema (lib/srs.js, FSRS-4)
- [V] P0.1.3 — Bank versioning v2.0.0
- [V] P0.1.4 — CI gate (validate_bank --strict)
- [V] P0.1.5 — 5 mastery states (new/learning/review/mastered/at-risk)

### Content cleanup
- [V] P0.2.1 — ai_development.js — 12 concepts (was boilerplate)
- [V] P0.2.2 — react_blueprint.js — 10 concepts
- [V] P0.2.3 — workbook_taskmanager.js — 12 concepts
- [V] P0.2.4 — lesson_closures.js — NEW (8 concepts)
- [V] P0.2.5 — difficulty 1-10 ל-247 concepts (lessons 11-20)
- [V] P0.2.6 — lesson 20 difficulty calibration (24 concepts)
- [V] P0.2.7 — 11 fill ambiguity warnings — fixed
- [V] P0.2.8 — concept_enrichment +41 entries (B+C)
- [V] P0.2.9 — glossary.js stub

### Existing engine (pre-existing or incremental)
- [V] P0.3.1 — 7-level system (grandma → master)
- [V] P0.3.2 — V button + Report Weak + Extras panel
- [V] P0.3.3 — Difficulty 1-10 with V-rules
- [V] P0.3.4 — 17 main lessons (11-27) all clean
- [V] P0.3.5 — Code Trace (35 questions, lessons 21-27)

### Documentation
- [V] P0.4.1 — PRODUCT_SPEC.md (v1)
- [V] P0.4.2 — MASTER_PLAN_V3.md
- [V] P0.4.3 — COORDINATION.md
- [V] P0.4.4 — PROMPTS.md
- [V] P0.4.5 — COMPETITIVE_ANALYSIS.md
- [V] P0.4.6 — SPEC_AND_MASTER_PLAN.md (v5.1) — unified

**P0 Total: 25/25 ✅**

---

## 🚧 Phase 1 — תשתית קריטית (5 שבועות)

### W1 — Architecture & Performance Quick Wins
- [V] P1.1.1 — Lazy load `questions_bank_seeded.js` (1.4MB)
  - [V] P1.1.1.1 — Wrap בקובץ ב-loader function (script tag הוסר מ-index.html)
  - [V] P1.1.1.2 — Update content-loader.js: ensureSeededBank() async
  - [V] P1.1.1.3 — Hook ל-openTrainer/openStudyMode
  - [V] P1.1.1.4 — Verify: 76 MC initial → 1316 MC after openTrainer ✅
- [V] P1.1.2 — Per-card refresh (avoid full re-render)
  - [V] P1.1.2.1 — function refreshConceptCard(conceptName) — added in app.js
  - [V] P1.1.2.2 — Replace renderContent() in mark-v/report-weak/simplify/reset-view
  - [V] P1.1.2.3 — Verify: report-weak → weak badge appears + concept stays in view ✅
- [V] P1.1.3 — Vitest setup
  - [V] P1.1.3.1 — package.json + npm install (vitest 2.1.9, happy-dom)
  - [V] P1.1.3.2 — vitest.config.js (globals: true, happy-dom)
  - [V] P1.1.3.3 — tests/rng.test.js (13 tests — determinism, edge cases, seedFromString)
  - [V] P1.1.3.4 — tests/srs.test.js (8 tests — intervals, lapses, isDue)
  - [V] P1.1.3.5 — tests/scoring.test.js (17 tests — V button rules, mastery states)
  - [V] P1.1.3.6 — Added to CI workflow (npm install + npm test)
  - [V] P1.1.3.7 — Verify: 38/38 tests pass ✅

### W2 — Accessibility Foundation
- [V] P1.2.1 — ARIA labels on icon-only buttons
  - [V] P1.2.1.1 — Top tabs (8 buttons) — all aria-labels added
  - [-] P1.2.1.2 — Pocket Card 📌 (deferred — not yet implemented)
  - [-] P1.2.1.3 — TTS 🔊 (deferred — Track D scope)
  - [-] P1.2.1.4 — AI Tutor 💬 (deferred — Phase 2)
  - [V] P1.2.1.5 — V/Report Weak — aria-label with concept name
  - [-] P1.2.1.6 — Modal close × (deferred — when modals added)
  - [V] P1.2.1.7 — Mobile drawer ☰ — aria-label + aria-expanded
  - [V] P1.2.1.8 — Verify in browser: aria-labels rendered ✅
- [~] P1.2.2 — Keyboard navigation (basic — full audit Phase 3)
  - [V] P1.2.2.1 — Tab order semantic
  - [V] P1.2.2.2 — Focus rings (`button:focus-visible` outline 2px)
  - [-] P1.2.2.3 — Esc closes modals (deferred)
  - [-] P1.2.2.4 — Enter submits MC (deferred)
  - [-] P1.2.2.5 — Arrow keys (deferred)
- [V] P1.2.3 — prefers-reduced-motion CSS — added at end of style.css
- [V] P1.2.4 — prefers-color-scheme + Light mode toggle
  - [V] P1.2.4.1 — `.theme-light` CSS variables added
  - [V] P1.2.4.2 — `#theme-toggle` button (auto/light/dark cycle)
  - [V] P1.2.4.3 — localStorage `lumenportal:theme:v1` persistence
  - [V] P1.2.4.4 — Verified: theme cycles work, applied via class

### W3 — PWA + Offline
- [V] P1.3.1 — manifest.json (RTL Hebrew, lang=he, dir=rtl)
- [V] P1.3.2 — Icons 192/512 (inline SVG data URI)
- [V] P1.3.3 — Service worker (cache shell + 20 lessons + lib + glossary)
- [-] P1.3.4 — Install prompt button (deferred — requires beforeinstallprompt UX)
- [V] P1.3.5 — Verify: SW registered + manifest linked ✅
- [V] P1.3.6 — Verify: SHELL_ASSETS array covers core offline flow

### W4 — Sandpack + Live Code
- [V] P1.4.1 — Embed sandboxed Code Runner ✅
  - [V] P1.4.1.1 — npm install @codesandbox/sandpack-client (deferred — using iframe sandbox)
  - [V] P1.4.1.2 — lib/code-runner.js wrapper (iframe + postMessage)
  - [V] P1.4.1.3 — "🚀 הרץ" button on each codeExample
- [V] P1.4.2 — Code Trace expansion ✅
  - [V] P1.4.2.1 — 5 traces per lesson 11-20 (45 traces)
  - [V] P1.4.2.2 — Traces for lesson_closures (5)
- [V] P1.4.3 — Bug Hunt mode ✅
  - [V] P1.4.3.1 — Schema in data/questions_bug.js
  - [V] P1.4.3.2 — UI: 4-option MC + fix reveal + explanation
  - [V] P1.4.3.3 — 14 bug hunts (target was 28; partial coverage)
- [V] P1.4.4 — Mini Build mode ✅
  - [V] P1.4.4.1 — Schema in data/questions_build.js (prompt, starter, tests[], reference, hint, explanation)
  - [V] P1.4.4.2 — UI: textarea + 🚀 בדוק + 💡 רמז + 👀 פתרון + 🔄 איפוס
  - [V] P1.4.4.3 — 21 builds (target reached; JS foundations + Node/Express + React fundamentals)
  - [V] regex-based tests with mustNotMatch flag for anti-patterns (.push)
  - [V] auto-show reference + explanation on all-pass

### W5 — Study UX (user-requested) + Mock Exam
- [V] P1.5.0a — View Mode panel (toggles + concept jumper + presets) ✅
  - [V] Floating 👁️ FAB + popover panel
  - [V] 13 visibility toggles (questions, code, explanation, deep-dive, etc.)
  - [V] 5 presets (all / concepts-only / quiz-only / exam-prep / bug-hunt-only)
  - [V] Concept jumper dropdown (per-lesson)
  - [V] Persisted state in localStorage
  - **User request:** "תפריט אחיד בכל אגף + הסתר חלקים"
- [V] P1.5.0b — Knowledge Map by topic + score (A-F) ✅
  - [V] TOPIC_TAXONOMY (15 topic groups across 20 lessons)
  - [V] Topic-grouped view with aggregated stats
  - [V] A-F letter grade per topic (color-coded)
  - [V] Sorted weakest-first by default
  - [V] Toggle: שיעור / נושא
  - **User request:** "פיצול לנושאים + ציון לכל נושא"
- [V] P1.5.0c — Code Anatomy refactor (filters) ✅
  - [V] Filter dropdowns: שיעור / נושא / מושג
  - [V] Lazy-render — <details> collapsed by default (auto-open ≤3)
  - [V] Search box for free text (concept + code + summary)
  - [V] Tree view: שיעור → מושג + counts
  - [V] Expand-all / Collapse-all buttons
  - **User request:** "פירוק קוד — אל תציג הכל, תן לי לבחור"
- [V] P1.5.0d — SITE_MAP.md document ✅
  - [V] All views/tabs catalogued
  - [V] All 20 lesson modules mapped to topics
  - [V] Concept card architecture documented (14 sections)
  - [V] Data files + lib + scripts + tests
  - [V] localStorage keys reference
  - [V] 4 recommended workflows
  - **User request:** "מפה מסודרת שלא תלך לאיבוד"
- [V] P1.5.1 — Mock Exam Mode ✅ (CRITICAL for exam — DONE!)
  - [V] P1.5.1.1 — Tab "📝 מבחן מדומה"
  - [V] P1.5.1.2 — 5 exam templates (react_full, react_quick, js_foundations, all_full, practice_short)
  - [V] P1.5.1.3 — Timer countdown + auto-submit on expire + warn <5min
  - [V] P1.5.1.4 — Result screen with A-F grade + breakdown by kind + weak concepts
  - [V] P1.5.1.5 — History view (last 30 attempts in localStorage)
  - [V] Bonus: question nav bar (jump to any question) + skip/prev/next
  - [V] Bonus: composer uses deterministic RNG seeded by template + time
  - [V] Bonus: scoring across 4 question kinds (MC, Fill, Trace, Bug)
- [~] P1.5.2 — Per-Distractor Feedback (Partial: UI + top 50 MCs; full-bank coverage deferred)
  - [V] P1.5.2.1 — Schema: question.optionFeedback[4] + OPTION_FEEDBACK[id] map
  - [V] P1.5.2.2 — UI: distractor feedback shown FIRST + generic explanation as secondary
  - [-] P1.5.2.3 — LLM batch script — augment 1316 MCs (deferred — needs Claude API + review pipeline)
  - [V] P1.5.2.4 — Manual coverage: top 50 high-impact MCs

**P1 Total: 60/62** (remaining production deferrals: install prompt UX + full MC option-feedback coverage pipeline)

---

## 🎯 Phase 2 — מוצר ליבה לימודי (5 שבועות + 3 sprints)

### W6 — SRS Production + Gap Matrix ✅ 2026-04-28
- [V] P2.1.1 — Upgrade SM-2 → FSRS-4 (lib/srs.js full rewrite)
- [V] P2.1.2 — Migration: existing srsState (app.js IIFE + defaultSrsState)
- [V] P2.1.3 — Update applyAnswer + pickWeightedConcept (urgency API unchanged)
- [V] P2.1.4 — UI badge "🔁 חזרה מומלצת" (renderConceptCard + CSS)
- [V] P2.2.1 — Gap Matrix dashboard tab (index.html + openGapMatrix)
- [V] P2.2.2 — 3 categories filter (red/yellow/green bars in renderGapMatrix)
- [V] P2.2.3 — Smart filters ("not tried 7d", "keep wrong" + filter buttons)

### W7 — Concept Metaphor Library + Pathways ✅ 2026-04-28
- [V] P2.3.1 — Schema: CONCEPT_METAPHORS in data/metaphors.js
- [V] P2.3.2 — Content: 5 metaphors × 50 core concepts (data/metaphors.js)
- [V] P2.3.3 — UI carousel + prev/next (renderMetaphorCarousel + wireConceptCardHandlers)
- [V] P2.4.1 — Schema: CONCEPT_PATHWAYS {grandma, parent, technical} (data/pathways.js)
- [V] P2.4.2 — Content: 30 core concepts × 3 pathways (data/pathways.js)
- [V] P2.4.3 — Toggle 👵/🧑‍🏫/👨‍💻 inside concept card (pathway-toggle div)
- [V] P2.4.4 — localStorage PATHWAY_KEY + setPathway() in app.js

### W8 — Pair-Match + Bug Hunt Quests ✅ 2026-04-28
- [V] P2.5.1 — Pair-Match schema (data/pair_match.js, 14 games)
- [V] P2.5.2 — UI: HTML5 drag-and-drop + tap-to-select fallback
- [V] P2.5.3 — 14 pair-match games covering all major topics
- [V] P2.6.1 — Quest schema (data/bug_quests.js, 5 quests)
- [V] P2.6.2 — UI: narrative overlay modal with progress bar (bq-progress)
- [V] P2.6.3 — 5 quests × 5 bugs each = 25 bugs (React Hooks, Async, Component, Node, TS)

### W9 — AI Tutor MVP ✅ 2026-04-28 (demo mode + edge-function skeleton; production Alpha tracked in P5.5.2)
- [V] P2.7.1 — Supabase edge function skeleton (supabase/functions/ai-tutor/index.ts)
- [V] P2.7.2 — Edge function: ai-tutor (Deno, Anthropic SDK, claude-haiku)
- [V] P2.7.3 — Anthropic SDK integration in edge function
- [V] P2.7.4 — Rate limiting: 20/day via AI_USAGE_KEY in localStorage
- [V] P2.7.5 — 3 modes: coach / explain / check (mode tabs in modal)
- [V] P2.7.6 — UI: floating 💬 FAB + modal (ai-tutor-fab + ai-tutor-modal)
- [V] P2.7.7 — Demo fallback + `/api/ai-tutor` fetch bridge (streaming deferred to production Alpha in P5.5.2)
- [V] P2.7.8 — Misconception detector (3 consecutive wrong → auto-open + prefill)
- [V] P2.7.9 — ELI5 mode already exists (eli5 action in wireConceptCardHandlers)

### W10 — Cross-device Sync ✅ 2026-04-29 (Export/Import + Supabase live sync adapter + last-write-wins)
- [V] P2.8.1 — Export/Import JSON (exportProgress + importProgress in app.js)
- [V] P2.8.2 — Tables: progress (supabase/migrations/001_progress.sql with RLS)
- [V] P2.8.3 — Sync: localStorage ↔ Supabase via credential-gated REST adapter; no embedded credentials, no fake project URL, no demo backend
- [V] P2.8.4 — Conflict: deterministic last-write-wins between local snapshot fingerprint and remote Supabase snapshot timestamp
- [V] P2.8.5 — UI: Export/Import buttons in welcome screen

### Sprint 1 — Quick Pedagogical Wins (שבועיים, parallel)
- [V] P2.S1.1 — Anti-Pattern Gallery
  - [V] P2.S1.1.1 — data/anti_patterns.js (8 hard concepts × 22 patterns)
  - [V] P2.S1.1.2 — content-loader.js merge (antiPatternsCount tracked)
  - [V] P2.S1.1.3 — UI: renderAntiPatternsPanel in concept card
  - [V] P2.S1.1.4 — CSS: .anti-pattern-card with P0/P1 severity stripes
- [V] P2.S1.2 — Mnemonics Lab
  - [V] P2.S1.2.1 — data/mnemonics.js (9 hard concepts with acronyms)
  - [V] P2.S1.2.2 — Hebrew acronyms ("מ.ר.ע.נ" useEffect) + rhymes
  - [V] P2.S1.2.3 — UI: renderMnemonicPanel with expansion + rhyme + why
- [V] P2.S1.3 — Flashcards UI ✅ (SRS tab, generated from real lesson concepts)
  - [V] P2.S1.3.1 — data/flashcards.js (config; cards generated from LESSONS_DATA)
  - [V] P2.S1.3.2 — Tab "🃏 כרטיסיות"
  - [V] P2.S1.3.3 — Front/back reveal
  - [V] P2.S1.3.4 — Easy/Good/Hard/Again rating updates score + SRS

### Sprint 2 — Visual Mental Models
- [V] P2.S2.1 — Mental Model Animator ✅ (6 concepts × 4 frames + stepper, verified in browser)
  - [V] P2.S2.1.1 — data/animations.js (6 concepts × 3-4 frames)
  - [V] P2.S2.1.2 — UI: SVG/HTML stepper Next/Prev/Auto-play
- [V] P2.S2.2 — War Stories Library ✅ (31 incidents in 17 concepts — target 30 met)
  - [V] P2.S2.2.1 — data/war_stories.js (8 concepts × 3-5 incidents)
  - [V] P2.S2.2.2 — UI: cards with severity filter

### Sprint 3 — Comparative Learning
- [V] P2.S3.1 — Side-by-Side Comparator ✅ (6 pairs, dedicated tab, mobile-responsive)
  - [V] P2.S3.1.1 — data/comparisons.js (6 comparisons)
  - [V] P2.S3.1.2 — UI: 2-column table, dedicated tab
- [V] P2.S3.2 — What-If Simulator ✅ (5 concepts × 3 scenarios, verified in browser)
  - [V] P2.S3.2.1 — data/what_if.js (5 concepts × 3 scenarios)
  - [V] P2.S3.2.2 — UI: knobs + outcome display

### Sprint 4 — Programming Foundations Bridge
- [V] P2.S4.1 — Tab "🧱 אבני בסיס" with programming foundations, efficiency, menus, technology and language bridge
  - [V] P2.S4.1.1 — Top tab + dedicated view
  - [V] P2.S4.1.2 — Side context tree for foundations, comparisons, recipes, zero diagram
  - [V] P2.S4.1.3 — Creative build recipes for functions, arrays, array operations, and app flow
  - [V] P2.S4.1.4 — Diagram from 0 → value → variable → if/function/array → app
  - [V] P2.S4.1.5 — Sub-tabs: foundations / build examples / menus / efficiency patents / tech ranking / languages
  - [V] P2.S4.1.6 — Examples for variable, array, class, function and menus in JSON, Node.js, React and Next.js
  - [V] P2.S4.1.7 — Big-O efficiency notes, recommendations, library warning list, and language capability/speed explanations
  - [V] P2.S4.1.8 — Historical path diagram: first transistor → logic gates → machine code → assembly → high-level languages → BCPL/B/C → modern languages
  - [V] P2.S4.1.9 — Electricity-to-value ladder: voltage/current → transistor → bit → gate → adder → memory → byte → encoding → value → variable → arrays/functions
  - [V] P2.S4.1.10 — Programming Language Museum: 9 historical halls, 27 exhibits, 5 idea lineages, and historical expansion backlog
  - [V] P2.S4.1.11 — React anatomy sub-tab: why each React primitive exists, what it replaced, efficiency, alternatives, and better implementation patterns
  - [V] P2.S4.1.12 — Efficiency foundations chapter: Big-O, time/memory/network/render/bundle costs, required concepts, and next-chapter readiness map
  - [V] P2.S4.1.13 — Computer-understanding bridge: what value is, bit/byte/type/key/value/variable/reference/array/object/function, and source-code translation flow
  - [V] P2.S4.1.14 — Dedicated "🧭 עקרונות יסוד" top tab with deterministic examples and required good-programming concepts
  - [V] P2.S4.1.15 — Dedicated "🏛️ מוזיאון" top tab with immersive background, SVG illustrations, layer diagram, timeline, halls, lineages, and museum quests

**P2 Total: 70/70 ✅** (W6-W10 core learning complete; Supabase sync remains credential-gated by real deploy credentials; AI Tutor production Alpha tracked in P5)

---

## 🧠 Phase 3 — אינטליגנציה + Sync (6 שבועות)

### W11 — Themed Scenarios + Counterfactuals ✅ 2026-04-28
- [V] P3.1.1 — Schema: CONCEPT_SCENARIOS {kitchen,shop,classroom,sports,travel}
- [V] P3.1.2 — Content: 5 scenarios × 30 concepts = 150 (data/scenarios.js)
- [V] P3.1.3 — UI: tab switcher per concept card (renderScenariosPanel)
- [V] P3.2.1 — Schema: CONCEPT_COUNTERFACTUALS {without,problem,solution,why}
- [V] P3.2.2 — Content: 30 critical concepts (data/counterfactuals.js)
- [V] P3.2.3 — UI: "🤔 מה היה בלי?" collapsible panel (renderCounterfactualPanel)

### W12 — Streaks + Daily Reflection + Achievements ✅ 2026-04-28
- [V] P3.3.1 — Streaks tracking + 🔥 widget (tickStudyStreak + STREAK_KEY)
- [V] P3.3.2 — Streak freeze (1/month) — local monthly freeze engine + widget state
- [V] P3.4.1 — Daily reflection modal (openReflectionModal + reflection-overlay)
- [V] P3.4.2 — Reflection history view (last 5 shown in modal)
- [V] P3.5.1 — Lesson-end 60-sec wrap-up (quiz result modal + 60s timer)
- [V] P3.5.2 — Confidence calibration tracking (confidence 1-5 vs score, saved history)
- [V] P3.6.1 — Achievements system (30 achievements in ACHIEVEMENTS array)
- [V] P3.6.2 — XP + global level (awardXP + xp-widget + achievement toasts)

### W13 — Real-Object Visuals + Animations
- [V] P3.7.1 — 50 real-object visual aids for grandma levels — local deterministic SVG aid library
- [V] P3.7.2 — Offline/lazy render integration — no external hosting required; service worker caches visuals data
- [V] P3.8.1 — 10 animated concept videos — offline concept clips in data/concept_videos.js
- [V] P3.8.2 — Tool: native SVG/CSS/HTML clip player (no external setup)
- [V] P3.8.3 — Embedded in concept cards — player + controls + View Mode toggle

### W14 — Prerequisite Graph ✅ 2026-04-28
- [V] P3.9.1 — Schema: CONCEPT_PREREQUISITES map (data/prerequisites.js)
- [V] P3.9.2 — Content: complete dependency tree (30 concepts)
- [V] P3.9.3 — UI: warning banner on prereq miss (prereqWarning in card)
- [V] P3.9.4 — Knowledge map: interactive graph visualization (offline-safe SVG dependency graph)
- [V] P3.9.5 — "Suggested next" chips after mastery (suggestedNext in card)

### W15-16 — Vite Migration + Modularize
- [V] P3.10.1 — Vite runtime available via Vitest dependency; npm scripts added (no new install needed)
- [V] P3.10.2 — vite.config.js with manualChunks + legacy static asset copy plugin
- [~] P3.10.3 — Split app.js → src/views/, core/, ui/, utils/ — core scoring extracted; views still pending
- [V] P3.10.4 — Update index.html → import src/main.js module bootstrap
- [V] P3.11.1 — TypeScript bootstrap (tsconfig + checkJs)
- [V] P3.11.2 — Migrate lib/rng.ts + lib/srs.ts — typed ESM ports with Vitest coverage
- [V] P3.11.3 — Migrate core/ modules — src/core/scoring.js exported + legacy app delegates to it
- [V] P3.11.4 — Migrate views/ (incremental) — src/views/context-tree.js extracted + Vitest coverage
- [V] P3.12.1 — Phase 2 Extended: Time Machine review experience (timeline from real progress)
- [V] P3.12.2 — Phase 2 Extended: Concept Comic (8 concepts)
- [V] P3.12.3 — Phase 2 Extended: Concept Map graph (native SVG, no external dependency)
- [V] P3.12.4 — Phase 2 Extended: Reverse Q&A (definition → concept modal verified)

**P3 Total: 36/41** (W11 + W12 + W13 visuals/clips + W14 graph + Time Machine + Streak freeze + Vite/TS/core/view bootstrap done; full app.js split + live sync pending)

---

## 🌐 Phase 4 — קנה מידה + קהילה (8+ שבועות)

### Teacher Dashboard
- [V] P4.1.1 — Schema: classes table in Supabase (`supabase/migrations/002_classes.sql` with teacher-owned RLS, no seed data)
- [V] P4.1.2 — Class creation flow (`src/core/teacher-classes.js` + welcome-screen teacher class form; credential-gated, no demo classes)
- [V] P4.1.3 — Student list view (table) (`supabase/migrations/003_class_students.sql`, `src/core/teacher-students.js`, credential-gated table; empty state uses no fake rows)
- [V] P4.1.4 — Concept heatmap (`supabase/migrations/004_class_concept_mastery.sql`, `src/core/teacher-heatmap.js`, credential-gated matrix; empty state uses no fake mastery)
- [V] P4.1.5 — Risk alerts (inactive 3d, dropped %) from real `last_active_at` + `previous_mastery_pct`; no alert is invented when evidence is unavailable
- [V] P4.1.6 — Assignment system (`supabase/migrations/005_class_assignments.sql`, `src/core/teacher-assignments.js`, credential-gated create/list flow; no seeded assignments)
- [V] P4.1.7 — Bulk import (CSV) (`src/core/teacher-bulk-import.js`; requires `display_name` CSV header and Supabase credentials, no default student rows)

### Community
- [V] P4.2.1 — Discussion threads per concept (`supabase/migrations/006_concept_discussions.sql`, `src/core/community-discussions.js`, credential-gated create/list flow; no seeded threads)
- [V] P4.2.2 — Upvote/downvote (`supabase/migrations/007_concept_discussion_votes.sql`, `src/core/community-votes.js`, one vote per authenticated user/thread)
- [V] P4.2.3 — Reputation system (`supabase/migrations/008_community_reputation.sql`, `src/core/community-reputation.js`, credential-gated ranking view from real thread/vote data; no fabricated profiles)
- [V] P4.2.4 — Moderation tools (`supabase/migrations/009_community_moderation.sql`, `src/core/community-moderation.js`, reports + moderator-only RPC/audit flow; no seeded moderators)

### Peer Code Review
- [V] P4.3.1 — Submit solution (`supabase/migrations/010_peer_code_review.sql`, `src/core/peer-review.js`, credential-gated solution submission; no seeded submissions)
- [V] P4.3.2 — Match by level (`claim_peer_review_submission` RPC; ordered by real submission timestamp/id, excludes self-review)
- [V] P4.3.3 — Review template (`normalizePeerReviewTemplate` + `submit_peer_review` RPC require correctness, clarity, strengths, improvements)
- [V] P4.3.4 — XP system (deterministic `20 + correctness + clarity` XP stored in Supabase and mirrored to local reward log by review id)

### Mentor Matching
- [V] P4.4.1 — Master eligibility logic (`mentor_master_eligibility` view derives eligibility from real peer reviews + community reputation; no seeded masters)
- [V] P4.4.2 — Async chat (Supabase realtime) (`mentor_messages` table + realtime publication + credential-gated REST send/load flow)
- [V] P4.4.3 — Reputation, rating (`mentor_ratings`, `mentor_reputation_summary`, `rate_mentor_match` RPC closes real matches with learner rating)

### Mobile Native (Optional)
- [-] P4.5.1 — React Native setup
- [-] P4.5.2 — Shared core/ with web
- [-] P4.5.3 — iOS build
- [-] P4.5.4 — Android build
- [-] P4.5.5 — Push notifications
- [-] P4.5.6 — App Store + Google Play

### Polish
- [V] P4.6.1 — Distractor objectivity audit (50 deterministic MCs; 0 blockers)
- [V] P4.6.2 — 10% QA on seeded questions (170 deterministic sample; 0 blockers)
- [V] P4.6.3 — Hebrew/English glossary expansion (228 entries; React/JS/TS/Web/Tooling)
- [V] P4.6.4 — Sanitize all text/code injection (DOMPurify + innerHTML guard)

**P4 Total: 22/28** (Teacher Dashboard, Community, Peer Code Review, and Mentor Matching shipped with credential-gated Supabase flows; optional Mobile Native is deferred until real iOS/Android/store credentials and product decision exist)

---

## 🧭 Phase 5 — Quality Governance + 90-Day Rebaseline

> נוסף בעקבות ביקורת Grok והדוח המקיף מ-2026-04-28. המטרה: להחליף "התקדמות מוצהרת" ב"כיסוי מדיד + איכות מאומתת".

### W17 — Status Accuracy + DoD Governance
- [V] P5.1.1 — Reconcile Grok/report claims with current repo evidence
- [V] P5.1.2 — Adopt four status states only: Done / Partial / Deferred / Blocked
- [V] P5.1.3 — Add measurable DoD policy to master plan
- [V] P5.1.4 — Add machine-readable feature coverage counters per content module (`FEATURE_COVERAGE_REPORT.json`)
- [V] P5.1.5 — CI gate: minimum content coverage thresholds per module (`report_feature_coverage.js --strict`)
- [V] P5.1.6 — Weekly status accuracy report generated from repo (feature coverage gate runs on Monday CI schedule)
- [V] P5.1.7 — PR template with goal + metric + rollback + evidence checklist
- [V] P5.1.8 — Document 2-week release trains: 70% debt / 30% new capability

### W18 — Question Quality Pipeline
- [V] P5.2.1 — Add questionQuality object/schema per MC/Fill item (`QUESTION_QUALITY_REPORT.json`)
- [V] P5.2.2 — Similarity gate for near-duplicate distractors
- [V] P5.2.3 — Length-cue detector for MC options
- [V] P5.2.4 — Generic/guessable wording detector
- [V] P5.2.5 — Strict Fill ambiguity gate for answer leakage/duplicate answers
- [V] P5.2.6 — Warning/note remediation queue from full-bank question quality report
- [V] P5.2.7 — Deterministic rewrite pipeline for flagged distractors with manual review (`QUESTION_REMEDIATION_QUEUE.*`)
- [V] P5.2.8 — Weekly deterministic 10% audit CI job (Monday schedule + `qa:questions:strict`)
- [V] P5.2.9 — Manual QA checklist for 10% sampled questions (`190/1894` fixed sample)
- [V] P5.2.10 — Question Quality Index dashboard/report (`88.2%` warning-free, 0 blockers)

### W19 — Pedagogical Scaffolding + Coverage
- [V] P5.3.1 — Per-question prerequisite side-aid across quiz/trainer/trace/guide/mock/inline modes
- [V] P5.3.2 — Add explicit conceptKey/conceptKeys[] to every lesson.quiz item (`133/133`)
- [V] P5.3.3 — Enforce "learn this first" aid on every new question kind
- [V] P5.3.4 — Close MC coverage target: ≥3 production MC per concept (curated + validated seeded live bank; hand-curation promotion tracked in P10.5.9)
- [V] P5.3.5 — Close Fill coverage target: ≥2 production Fill per codeExample concept (curated + validated seeded live bank; hand-curation promotion tracked in P10.5.9)
- [V] P5.3.6 — Raise per-distractor feedback from top 50 MCs to 25% of MC bank
- [V] P5.3.7 — Raise per-distractor feedback to 50% of MC bank
- [V] P5.3.8 — Raise per-distractor feedback to 100% of MC bank (`1704/1704`, feature coverage gate)
- [V] P5.3.9 — Wrong-answer weakness agent: every wrong answer updates concept/topic weakness + immediate explanation/association
- [V] P5.3.10 — No-repeat trainer questions: persist answered question IDs per learner and require the next variant to be harder when available

### W20 — Data Contracts + Runtime Stability
- [V] P5.4.1 — Define schema contract for Lesson/Concept/Question/Trace/Build content
- [V] P5.4.2 — Runtime loader validation with soft error panel
- [V] P5.4.3 — Unit tests for array/object variants in levels/extras
- [V] P5.4.4 — Playwright top-level smoke tests for all tabs
- [V] P5.4.5 — Console-error gate in browser smoke tests
- [V] P5.4.6 — Service-worker stale asset regression test
- [V] P5.4.7 — Feature health checks exposed in diagnostics view
- [V] P5.4.8 — Local telemetry store for feature errors per 1,000 sessions

### W21 — 90-Day Roadmap Waves
- [V] P5.5.1 — Wave 1 hardening: FSRS/Gap/Pathways metrics + retention baseline
- [V] P5.5.2 — Wave 2 alpha: AI Tutor + Sync + Pair-Match hardening
- [V] P5.5.3 — Wave 3 lite: Teacher Dashboard Lite + class progress heatmap
- [V] P5.5.4 — Freeze moonshots until quality gates and coverage KPIs are green

**P5 Total: 39/39 ✅** — Quality Governance + 90-Day Rebaseline complete; later work remains in Phase 6+ and Phase 10 backlog.

---

## 🧪 Phase 6 — Learning Evidence + Productization

> נוסף בעקבות סבב חשיבה אסטרטגי מ-2026-04-28. המטרה: להפוך את LumenPortal ממערכת עשירה בפיצ'רים למערכת שמוכיחה שיפור למידה, מוכנה לפיילוטים, ויכולה להתרחב בלי לאבד איכות.

### W22 — Learning Evidence Loop
- [V] P6.1.1 — Define canonical learning event schema: view, answer, wrong-answer aid, review, mastery change, exam attempt, clip view
- [V] P6.1.2 — Build local-first analytics store with no PII and deterministic session IDs
- [V] P6.1.3 — Add local learning evidence dashboard: active days, answers, accuracy, remediation, reviews, exams
- [V] P6.1.4 — Add concept-level learning funnel: saw explanation → answered → remediated → retained after delay
- [V] P6.1.5 — Add "evidence required" gate: no feature promoted without outcome metric
- [V] P6.1.6 — Add anonymized export for teacher/research review
- [V] P6.1.7 — Weekly learning-evidence report generated from real usage logs

### W23 — Adaptive Remediation Engine v2
- [V] P6.2.1 — Cluster mistakes by misconception, not only by concept
- [V] P6.2.2 — Build misconception cards: symptom, root cause, minimal example, repair drill
- [V] P6.2.3 — Add "teach-back" prompt after repeated mistakes: student explains answer in own words
- [V] P6.2.4 — Add adaptive retest queue: wrong → explanation → near-transfer question → delayed review
- [V] P6.2.5 — Add prerequisite rewind: if advanced question fails, route to required lower-level concept
- [V] P6.2.6 — Add confidence calibration loop per concept
- [V] P6.2.7 — Add "I still do not get it" escape hatch that opens a simpler path and logs the blocker
- [V] P6.2.8 — Expand misconception library to 20 mapped React/JS/TS/Node mistake patterns

### W24 — Curriculum Coverage + Capstone Projects
- [ ] P6.3.1 — Close question coverage: every concept has ≥3 MC, ≥2 Fill/Code, ≥1 trace/build/bug where relevant (`QUESTION_ACTIVITY_COVERAGE_REPORT`: 337/568 activity-ready, 231 Trace/Build/Bug gaps)
- [V] P6.3.2 — Active course blueprint mapping is SVCollege AI & Full Stack only; John Bryce / Sela / generic bootcamp deferred to separate future portals
- [V] P6.3.3 — Add capstone project track: Task Manager, Movie App, Budget Manager, Auth CRUD, Dashboard
- [V] P6.3.4 — Add project rubrics: requirements, edge cases, tests, code review checklist
- [V] P6.3.5 — Add "from zero to feature" guided builds for React, Node, Next and TypeScript
- [V] P6.3.6 — Add interview-prep mode: common junior frontend questions mapped to concepts
- [V] P6.3.7 — Add real exam blueprint alignment report

### W25 — Content Studio + Review Workflow
- [V] P6.4.1 — Build internal content studio for question/explanation editing
- [V] P6.4.2 — Add status per content item: draft / reviewed / verified / needs-fix
- [V] P6.4.3 — Add deterministic content IDs from stable hashes, not generated randomness
- [V] P6.4.4 — Add review queue from QA warnings, student mistakes and teacher feedback
- [V] P6.4.5 — Add side-by-side diff for content revisions
- [V] P6.4.6 — Add source/evidence field for historical museum items and technical claims
- [V] P6.4.7 — Add NotebookLM/video asset tracker: script, status, link, review, replacement date

### W26 — Production Pilot Readiness
- [V] P6.5.1 — Pilot plan for 10-30 students with baseline test, 2-week use, final test
- [V] P6.5.2 — Teacher onboarding kit: class setup, assignment recipe, interpretation of heatmaps
- [V] P6.5.3 — Support/bug-report flow inside the app with screenshot/context payload
- [V] P6.5.4 — Privacy/data retention policy for student progress
- [V] P6.5.5 — Performance budget: initial load, seeded-bank lazy load, offline cache, mobile CPU
- [V] P6.5.6 — Accessibility audit to WCAG 2.1 AA with screen-reader pass
- [V] P6.5.7 — Release checklist: smoke tests, rollback, cache bump, QA evidence, documentation

**P6 Total: 35/36** — evidence loop, evidence-required gate, anonymized export/report, 20 misconception patterns, teach-back, adaptive retest queue, prerequisite rewind, per-concept confidence calibration, still-confused escape hatch, capstone track with full rubrics, guided builds, interview prep, course/exam blueprint alignment, content studio, museum evidence fields, video asset tracker, pilot plan, teacher kit, support report flow, privacy policy, performance budget, accessibility audit and release checklist shipped. Remaining P6 work is real Trace/Build/Bug activity coverage for `231` concepts; it must be authored/reviewed, not generated as fake coverage.

**P6 Improvement Note — 2026-04-30:** `questions:activity-coverage` exists and confirms `337/568` activity-ready concepts, but no `questions:activity-coverage:strict` alias exists yet. Add the strict alias only when P6.3.1 is ready to become a failing/passable release gate, so CI does not block on unauthored real content.

**P6 Authoring Plan Addendum — 2026-04-30:** נוסף `questions:activity-authoring-plan` שמתרגם את פערי P6.3.1 לרשימת עבודה דטרמיניסטית בלי ליצור תוכן. הדוח `QUESTION_ACTIVITY_AUTHORING_PLAN.md/json` מציג batch ראשון של 40 מושגים, מתעדף עכשיו `9` פערי SVCollege לפני `222` פערים שאינם בעדיפות קו הסיום, ומחייב כתיבה/סקירה ידנית לכל Trace/Bug/Build לפני סגירת P6.3.1.

**P6.3.1 Authoring Batch 1 — 2026-04-30:** נוספו 12 Trace אמיתיים ל-`lesson_11` עבור `arrow function`, `boolean`, `By Value`, `filter`, `find`, `forEach`, `Index`, `map`, `number`, `object`, `Pointer`, `pop`. הקובץ `data/svcollege_traces_lesson11_activity.js` נטען ב-HTML, נכלל ב-service worker, ונבדק ב-`tests/svcollege-lesson11-activity-traces.test.js`. הכיסוי עלה מ-`120/568` ל-`132/568`; פערי הפעילות ירדו מ-`448` ל-`436`.

**P6.3.1 Authoring Batch 2 — 2026-04-30:** נוספו 10 Trace אמיתיים נוספים ל-`lesson_11` עבור `push`, `shift`, `sort`, `splice`, `spread`, `string`, `toString`, `undefined`, `unshift`, `var`. הכיסוי עלה מ-`132/568` ל-`142/568`; פערי הפעילות ירדו מ-`436` ל-`426`, ופערי SVCollege-priority ירדו מ-`214` ל-`204`.

**P6.3.1 Authoring Batch 3 — 2026-04-30:** נוספו 8 Trace אמיתיים ל-`lesson_12` עבור `יצירת מערך חדש (new array)`, `יצירת מערך חדש מתוך קיים`, `סינון לפי תנאי`, `עבודה עם ערכים לפי אינדקס`, `array`, `index`, `lowercase`, `uppercase`. נוסף קובץ `data/svcollege_traces_lesson12_activity.js`, חובר ל-`index.html`, נוסף ל-service worker בגרסת `lumen-v2.4.116`, ונבדק ב-`tests/svcollege-lesson12-activity-traces.test.js`. הכיסוי עלה מ-`142/568` ל-`150/568`; פערי הפעילות ירדו מ-`426` ל-`418`, ופערי SVCollege-priority ירדו מ-`204` ל-`196`.

**P6.3.1 Authoring Batch 4 — 2026-04-30:** נוספו 10 Trace אמיתיים ל-`lesson_13` עבור `appendChild`, `attribute`, `constructor`, `createElement`, `document`, `Document Object Model`, `DOM`, `getElementById`, `getElementsByClassName`, `getElementsByTagName`. נוסף קובץ `data/svcollege_traces_lesson13_activity.js`, חובר ל-`index.html`, נוסף ל-service worker בגרסת `lumen-v2.4.117`, ונבדק ב-`tests/svcollege-lesson13-activity-traces.test.js`. הכיסוי עלה מ-`150/568` ל-`160/568`; פערי הפעילות ירדו מ-`418` ל-`408`, ופערי SVCollege-priority ירדו מ-`196` ל-`186`.

**P6.3.1 Authoring Batch 5 — 2026-04-30:** נוספו 10 Trace אמיתיים נוספים ל-`lesson_13` עבור `getItem`, `inheritance`, `innerHTML`, `instance`, `localStorage`, `Method`, `new`, `Property`, `querySelector`, `querySelectorAll`. קובץ `data/svcollege_traces_lesson13_activity.js` הורחב, גרסת ה-script קודמה ל-`lesson13-activity-v2`, וה-service worker קודמה ל-`lumen-v2.4.118`. הכיסוי עלה מ-`160/568` ל-`170/568`; פערי הפעילות ירדו מ-`408` ל-`398`, ופערי SVCollege-priority ירדו מ-`186` ל-`176`.

**P6.3.1 Authoring Batch 6 — 2026-04-30:** נוספו 8 Trace אמיתיים נוספים ל-`lesson_13` עבור `removeChild`, `replaceChild`, `sessionStorage`, `setAttribute`, `setItem`, `style`, `super`, `Value`. הכיסוי עלה מ-`170/568` ל-`178/568`; פערי הפעילות ירדו מ-`398` ל-`390`, ופערי SVCollege-priority ירדו מ-`176` ל-`168`. ה-batch הבא מתחיל ב-HTML/CSS Foundations וב-Tooling/Git לפי `QUESTION_ACTIVITY_AUTHORING_PLAN.md`.

**P6.3.1 Authoring Batch 7 — 2026-04-30:** נוספו 14 Trace אמיתיים ל-HTML/CSS Foundations ול-Tooling/Git עבור `accessibility basics`, `box model`, `CSS selector`, `HTML document`, `label`, `branch`, `commit`, `ESLint`, `Git`, `Prettier`, `pull request`, `repository`, `staging area`, `working tree`. נוסף `data/svcollege_traces_foundation_tooling_activity.js`, חובר ל-`index.html`, נוסף ל-service worker בגרסת `lumen-v2.4.119`, ונבדק ב-`tests/svcollege-foundation-tooling-activity-traces.test.js`. הכיסוי עלה מ-`178/568` ל-`192/568`; פערי הפעילות ירדו מ-`390` ל-`376`, ופערי SVCollege-priority ירדו מ-`168` ל-`154`.

**P6.3.1 Authoring Batch 8 — 2026-04-30:** נוספו 14 Trace אמיתיים ל-`lesson_15` עבור `anonymous function`, `catch`, `catch (Promise)`, `Error`, `Error Object`, `Exception`, `fetch`, `reject`, `resolve`, `Scope`, `setTimeout`, `Synchronous`, `then`, `throw`. נוסף `data/svcollege_traces_lesson15_activity.js`, חובר ל-`index.html`, נוסף ל-service worker בגרסת `lumen-v2.4.120`, ונבדק ב-`tests/svcollege-lesson15-activity-traces.test.js`. הכיסוי עלה מ-`192/568` ל-`206/568`; פערי הפעילות ירדו מ-`376` ל-`362`, ופערי SVCollege-priority ירדו מ-`154` ל-`140`. ה-batch הבא מתחיל ב-`lesson_16` לפי `QUESTION_ACTIVITY_AUTHORING_PLAN.md`.

**P6.3.1 Authoring Batch 9 — 2026-04-30:** נוספו 25 Trace אמיתיים ל-`lesson_16` עבור `cd`, `CLI`, `Command Line Interface`, `dependencies`, `dir`, `File System`, `fs`, `fs.appendFile`, `fs.open`, `fs.readFile`, `fs.rename`, `fs.unlink`, `fs.writeFile`, `JSON`, `mkdir`, `module`, `module.exports`, `node file.js`, `npm init`, `npm install`, `npm start`, `package.json`, `require`, `type nul`, `V8`. נוסף `data/svcollege_traces_lesson16_activity.js`, חובר ל-`index.html`, נוסף ל-service worker בגרסת `lumen-v2.4.121`, ונבדק ב-`tests/svcollege-lesson16-activity-traces.test.js`. הכיסוי עלה מ-`206/568` ל-`231/568`; פערי הפעילות ירדו מ-`362` ל-`337`, ופערי SVCollege-priority ירדו מ-`140` ל-`115`. ה-batch הבא מתחיל ב-`lesson_17` לפי `QUESTION_ACTIVITY_AUTHORING_PLAN.md`.

**P6.3.1 Authoring Batch 10 — 2026-04-30:** נוספו 35 Trace אמיתיים ל-`lesson_17` עבור `1xx-2xx-3xx`, `4xx-5xx`, `app`, `app.get`, `app.listen`, `app.post`, `app.use`, `body`, `body-parser`, `Client`, `Create`, `CRUD`, `Delete`, `Domain`, `event.preventDefault`, `Express`, `form`, `GET`, `headers`, `method`, `middleware`, `Path`, `port`, `POST`, `Protocol`, `Query Parameters`, `Read`, `Request`, `Response`, `Route`, `Server`, `static files`, `Status Codes`, `Update`, `URL`. נוסף `data/svcollege_traces_lesson17_activity.js`, חובר ל-`index.html`, נוסף ל-service worker בגרסת `lumen-v2.4.122`, ונבדק ב-`tests/svcollege-lesson17-activity-traces.test.js`. הכיסוי עלה מ-`231/568` ל-`266/568`; פערי הפעילות ירדו מ-`337` ל-`302`, ופערי SVCollege-priority ירדו מ-`115` ל-`80`. ה-batch הבא מתחיל ב-`lesson_sql_orm` לפי `QUESTION_ACTIVITY_AUTHORING_PLAN.md`.

**P6.3.1 Authoring Batch 11 — 2026-04-30:** נוספו 10 Trace אמיתיים ל-`lesson_sql_orm` עבור `column`, `database`, `migration`, `ORM`, `PostgreSQL`, `primary key`, `relation`, `row`, `SQL`, `table`. קובץ `data/svcollege_traces_sql_orm.js` הורחב, גרסת ה-script קודמה ל-`svcollege-sql-orm-v2`, ה-service worker קודמה ל-`lumen-v2.4.123`, ונבדק ב-`tests/svcollege-sql-orm-content.test.js`. הכיסוי עלה מ-`266/568` ל-`276/568`; פערי הפעילות ירדו מ-`302` ל-`292`, ופערי SVCollege-priority ירדו מ-`80` ל-`70`. ה-batch הבא מתחיל ב-`lesson_auth_security` לפי `QUESTION_ACTIVITY_AUTHORING_PLAN.md`.

**P6.3.1 Authoring Batch 12 — 2026-04-30:** נוספו 13 Trace אמיתיים ל-`lesson_auth_security` עבור `access token`, `authentication`, `bcrypt`, `cookie`, `CORS`, `CSRF`, `Firebase Auth`, `JWT`, `Kinde/Appwrite`, `OAuth`, `provider auth`, `session`, `Supabase Auth`. קובץ `data/svcollege_traces_auth.js` הורחב, גרסת ה-script קודמה ל-`svcollege-auth-v2`, ה-service worker קודמה ל-`lumen-v2.4.124`, ונבדק ב-`tests/svcollege-auth-content.test.js`. הכיסוי עלה מ-`276/568` ל-`289/568`; פערי הפעילות ירדו מ-`292` ל-`279`, ופערי SVCollege-priority ירדו מ-`70` ל-`57`. ה-batch הבא מתחיל ב-`lesson_nextjs` לפי `QUESTION_ACTIVITY_AUTHORING_PLAN.md`.

**P6.3.1 Authoring Batch 13 — 2026-04-30:** נוספו 12 Trace אמיתיים ל-`lesson_nextjs` עבור `App Router`, `file-system routing`, `image optimization`, `ISR`, `layout`, `Next.js`, `page`, `SEO`, `server action`, `server component`, `SSR`, `Vercel deploy`. קובץ `data/svcollege_traces_nextjs.js` הורחב, גרסת ה-script קודמה ל-`svcollege-nextjs-v2`, ה-service worker קודמה ל-`lumen-v2.4.125`, ונבדק ב-`tests/svcollege-nextjs-content.test.js`. הכיסוי עלה מ-`289/568` ל-`301/568`; פערי הפעילות ירדו מ-`279` ל-`267`, ופערי SVCollege-priority ירדו מ-`57` ל-`45`. ה-batch הבא מתחיל ב-`lesson_nestjs` לפי `QUESTION_ACTIVITY_AUTHORING_PLAN.md`.

**P6.3.1 Authoring Batch 14 — 2026-04-30:** נוספו 10 Trace אמיתיים ל-`lesson_nestjs` עבור `decorator`, `DTO`, `exception filter`, `interceptor`, `middleware`, `Nest.js`, `pipe`, `provider`, `repository pattern`, `service`. קובץ `data/svcollege_traces_nestjs.js` הורחב, גרסת ה-script קודמה ל-`svcollege-nestjs-v2`, ה-service worker קודמה ל-`lumen-v2.4.126`, ונבדק ב-`tests/svcollege-nestjs-content.test.js`. הכיסוי עלה מ-`301/568` ל-`311/568`; פערי הפעילות ירדו מ-`267` ל-`257`, ופערי SVCollege-priority ירדו מ-`45` ל-`35`. ה-batch הבא מתחיל ב-`lesson_devops_deploy` לפי `QUESTION_ACTIVITY_AUTHORING_PLAN.md`.

**P6.3.1 Authoring Batch 15 — 2026-04-30:** נוספו 12 Trace אמיתיים ל-`lesson_devops_deploy` עבור `build command`, `CD`, `container`, `Docker`, `health check`, `image`, `preview deployment`, `production readiness`, `service`, `smoke test`, `Vercel deploy`, `volume`. קובץ `data/svcollege_traces_devops.js` הורחב, גרסת ה-script קודמה ל-`svcollege-devops-v2`, ה-service worker קודמה ל-`lumen-v2.4.127`, ונבדק ב-`tests/svcollege-devops-content.test.js`. הכיסוי עלה מ-`311/568` ל-`323/568`; פערי הפעילות ירדו מ-`257` ל-`245`, ופערי SVCollege-priority ירדו מ-`35` ל-`23`. ה-batch הבא מתחיל ב-`lesson_ai_engineering` לפי `QUESTION_ACTIVITY_AUTHORING_PLAN.md`.

**P6.3.1 Authoring Batch 16 — 2026-04-30:** נוספו 14 Trace אמיתיים ל-`lesson_ai_engineering` עבור `agent loop`, `chunking`, `embeddings`, `fine-tuning boundary`, `guardrails`, `hallucination check`, `LangChain`, `model selection`, `prompt messages`, `retrieval ranking`, `streaming response`, `structured output`, `token budget`, `vector store`. קובץ `data/svcollege_traces_ai_engineering.js` הורחב, גרסת ה-script קודמה ל-`svcollege-ai-engineering-v2`, ה-service worker קודמה ל-`lumen-v2.4.128`, ונבדק ב-`tests/svcollege-ai-engineering-content.test.js`. הכיסוי עלה מ-`323/568` ל-`337/568`; פערי הפעילות ירדו מ-`245` ל-`231`, ופערי SVCollege-priority ירדו מ-`23` ל-`9`. ה-batch הבא מתחיל ב-`lesson_design_systems` לפי `QUESTION_ACTIVITY_AUTHORING_PLAN.md`.

---

## 🚀 Phase 7 — Learning OS + Outcome Scale

> נוסף בעקבות סבב רעיונות אסטרטגי מ-2026-04-28. המטרה: להפוך את LumenPortal ממערכת לימוד עשירה ל-"מערכת הפעלה ללמידה" שמאבחנת, מתכננת, מתקנת, מכינה פרויקט, ומוכיחה תוצאה מול תלמיד/מורה/פיילוט.

### W27 — Diagnostic Intake + Placement
- [V] P7.1.1 — Build pre-course diagnostic exam: JS foundations, DOM, async, React, TS, backend
- [V] P7.1.2 — Score by prerequisite graph, not only by lesson
- [V] P7.1.3 — Place learner per concept: skip / learn / review / remediate
- [V] P7.1.4 — Generate first-week plan from diagnostic results
- [V] P7.1.5 — Capture confidence + answer latency as diagnostic signals
- [V] P7.1.6 — Show "why this path" explanation for each recommended topic
- [V] P7.1.7 — Schedule diagnostic retake after 7-14 days
- [V] P7.1.8 — Export diagnostic report for teacher/student

### W28 — Adaptive Weekly Study Plan
- [V] P7.2.1 — Daily missions from SRS due items, weak concepts, capstone needs and upcoming exam
- [V] P7.2.2 — Time-boxed plans: 15 / 30 / 60 minutes
- [V] P7.2.3 — Balance new learning, review, remediation and project work
- [V] P7.2.4 — Recovery plan when learner misses days
- [V] P7.2.5 — Progress forecast: expected mastery by date
- [V] P7.2.6 — "Student agreement" checklist at start of session
- [V] P7.2.7 — End-of-day summary with next best action
- [V] P7.2.8 — Deterministic tests for plan generation

### W29 — Project Studio + Portfolio Readiness
- [V] P7.3.1 — Capstone milestone tracker with local progress
- [V] P7.3.2 — Code submission area: paste/link/file metadata, with privacy warning
- [V] P7.3.3 — Rubric self-review: requirements, edge cases, tests, architecture
- [V] P7.3.4 — Anti-pattern review against submitted project notes/code snippets
- [V] P7.3.5 — Portfolio README generator from real capstone progress
- [V] P7.3.6 — Teacher/mentor review notes per milestone
- [V] P7.3.7 — Project health score: runnable / tested / documented / reviewed
- [V] P7.3.8 — Deterministic project templates without fake data

### W30 — Teacher + Cohort Pilot Lite
- [V] P7.4.1 — Class pilot setup without unnecessary PII
- [V] P7.4.2 — Cohort heatmap by concept/topic/mastery state
- [V] P7.4.3 — Assignment recipes: exam prep, project prep, remediation week
- [V] P7.4.4 — Risk alerts: inactive, overconfident, repeated blocker, low retention
- [V] P7.4.5 — Weekly teacher report from anonymized learning evidence
- [V] P7.4.6 — Compare baseline vs final without exposing private answers
- [V] P7.4.7 — Manual teacher feedback queue into content review
- [V] P7.4.8 — Pilot SOP: setup, support, measurement, rollback

### W31 — AI Tutor Production Guardrails
- [V] P7.5.1 — Production backend proxy for tutor calls; no frontend API keys
- [V] P7.5.2 — Server-side rate limits by user/class/license
- [V] P7.5.3 — Coach-mode policy: hints before direct answers
- [V] P7.5.4 — Retrieval context from current concept, prerequisites, mistake history and capstone
- [V] P7.5.5 — Misconception-aware prompt templates
- [V] P7.5.6 — PII-safe logging and audit trail
- [V] P7.5.7 — Tutor evaluation set: wrong-answer repair, no answer leakage, Hebrew clarity
- [V] P7.5.8 — Graceful fallback when quota/network fails

### W32 — Trust, Accessibility + Mobile Hardening
- [V] P7.6.1 — WCAG 2.1 AA screen-reader pass on all major tabs
- [V] P7.6.2 — Keyboard-only journey: lesson → question → remediation → review → project
- [V] P7.6.3 — Dyslexia / low-vision / reduced cognitive load modes
- [V] P7.6.4 — Mobile touch audit for trainer, flashcards, capstones, museum and context tree
- [V] P7.6.5 — Offline/conflict UX for local-first progress and future sync
- [V] P7.6.6 — Performance lab: initial load, interaction latency, cache size, mobile CPU
- [V] P7.6.7 — Privacy center: what is stored, export/delete, teacher visibility
- [V] P7.6.8 — Trust page: no fake data, deterministic testing, content review policy

**P7 Total: 48/48 ✅** — Learning OS core, diagnostic placement, weekly study planning, project studio, cohort pilot lite, AI tutor guardrails, accessibility/mobile/trust hardening and deterministic outcome-scale gate shipped. External live credentials and unavailable learner evidence remain explicitly `unknown/unavailable`.

---

## 🪙 Phase 8 — XP Economy + Experience Store

> מקור קנוני: [XP_REWARD_STORE_MASTER_PLAN.md](XP_REWARD_STORE_MASTER_PLAN.md)  
> סטטוס: Priority 2 אחרי Finish Line 1. החנות והמוזיאון הנעול לא חוסמים חומר חובה למבחן ולא נותנים ציון במקום הוכחת ידע.

### W33 — Economy Core
- [V] P8.1.1 — Replace scattered `awardXP(amount)` usage with `awardLearningReward({ xp, coins, source, conceptKey, questionId })`; legacy `awardXP` remains as compatibility wrapper only
- [V] P8.1.2 — Add local learner economy state: xp, coins, lifetimeXp, lifetimeCoinsEarned, purchases, rewardLog
- [V] P8.1.3 — Add deterministic reward IDs from source + learner + concept/question, without randomness
- [V] P8.1.4 — Prevent duplicate rewards for already answered questions
- [V] P8.1.5 — Award coins together with XP across questions, flashcards, trace, bug hunt, mini build, mock exam, streaks and achievements
- [V] P8.1.6 — Keep XP/coins scoped to the active passwordless local learner profile
- [V] P8.1.7 — Include XP/coins/rewardLog/purchases in export/import progress
- [V] P8.1.8 — Add Vitest coverage for reward accounting and no-negative balances

### W34 — 100-Level Progression
- [V] P8.2.1 — Implement non-linear `xpRequired(level)` curve for 100 global levels
- [V] P8.2.2 — Implement `getLearnerLevelFromXP(xp)` and next-level progress percentage
- [V] P8.2.3 — Map level bands: סבתא, תלמיד כיתה א', חטיבה, תיכון, ג'וניור, מפתח עצמאי, מאסטר קורס, ציון 100
- [V] P8.2.4 — Update sidebar/header XP widget to show level, band, XP, coins and next-level progress
- [V] P8.2.5 — Add XP detail panel: why you earned XP today, next best action and level gates
- [V] P8.2.6 — Add level-up toast with coins earned and next unlock hint
- [V] P8.2.7 — Add tests for early levels being easy and high levels being harder
- [V] P8.2.8 — Add reduced-motion behavior for level-up effects

### W35 — Level 100 Mastery Gate
- [V] P8.3.1 — Define level 100 gate: all concepts mastered, highest challenge proof, code proof, no unresolved weakness, and score 100 on the professor-only SVCollege exam before global level 100 opens
- [V] P8.3.2 — Add mastery proof aggregation across all concept tags and tabs; XP panel and progress export aggregate `LESSONS_DATA` mastery into the level-100 checklist
- [V] P8.3.3 — Require code proof for code-bearing concepts: fill/trace/bug/build evidence in the level-100 gate and exportable readiness report
- [V] P8.3.4 — Add "why not level 100 yet" checklist
- [V] P8.3.5 — Block level 100 if `qa:questions:strict`, build or smoke gates are red (`level100:release-gate:strict`, runtime data file blocks red/missing gates)
- [V] P8.3.6 — Add tests for no-purchase/no-XP shortcut to level 100
- [V] P8.3.7 — Add UI copy that distinguishes global XP level from per-concept mastery
- [V] P8.3.8 — Add exportable 100-readiness report

### W36 — Store MVP
- [V] P8.4.1 — Add top tab `🛒 חנות`
- [V] P8.4.2 — Create deterministic store catalog: museum tickets, challenge rooms, cosmetics, concept cards, tools
- [V] P8.4.3 — Render price, lock status, prerequisite and unlock reason per item
- [V] P8.4.4 — Add purchase flow with coins and clear insufficient-balance state
- [V] P8.4.5 — Add "My purchases" view
- [V] P8.4.6 — Add store search/filter by category and affordability
- [V] P8.4.7 — Add tests for purchase persistence and duplicate purchase prevention
- [V] P8.4.8 — Add store smoke test for desktop and mobile layout

### W37 — Museum Tickets + Locked Experience Areas
- [V] P8.5.1 — Split museum into free intro and paid/earned experience wings
- [V] P8.5.2 — Lock non-essential museum wings behind coins or mastery prerequisites; XP + mastery alternative wired
- [V] P8.5.3 — Keep exam-critical explanations free in concept cards and prerequisite side-aids
- [V] P8.5.4 — Add museum pass items: languages, electricity, React evolution, Node runtime, AI hall, Debug hall
- [V] P8.5.5 — Add "unlock by learning" alternative for major museum wings
- [V] P8.5.6 — Add locked-card UI with price, reward preview and unlock path
- [V] P8.5.7 — Add tests that locked museum does not block SVCollege readiness flows; strict access smoke covers readiness, tab matrix, critical flows and full-portal smoke
- [V] P8.5.8 — Add reduced-motion and keyboard access to locked/unlocked museum states

### W38 — Experiential Reward Zones
- [V] P8.6.1 — Add Debug Arena locked rooms
- [V] P8.6.2 — Add Boss Battles for Async, Auth, React State, API and DB
- [V] P8.6.3 — Add Code Cinema / replay clips as purchasable experiences
- [V] P8.6.4 — Add Secret Labs mini experiments: API contract, DB query lab, state mutation lab
- [V] P8.6.5 — Add Theme Shop cosmetics that do not harm accessibility
- [V] P8.6.6 — Add collectible concept cards and museum stamps
- [V] P8.6.7 — Add rewards from completing locked experience rooms
- [V] P8.6.8 — Add balancing tests so experiences cannot farm infinite XP/coins

### W39 — Economy Balancing + Governance
- [V] P8.7.1 — Add economy tuning table for XP/coins per action
- [V] P8.7.2 — Add dashboard: earned, spent, unlocked, next unlock, average coins/day
- [V] P8.7.3 — Add audit script for reward sources with missing conceptKey/questionId metadata
- [V] P8.7.4 — Add anti-cheat checks: no repeated reward, no purchase-based mastery, no fake rewards
- [V] P8.7.5 — Add privacy note: coins are local learning rewards, not real money
- [V] P8.7.6 — Add rollback strategy: economy can be disabled without deleting learning scores

**P8 Total: 54/54** — Economy Core v1 + 100-level widget + XP detail panel + Store MVP + store desktop/mobile smoke + museum XP access gates + complete museum pass item catalog + strict museum access smoke + accessible/reduced-motion locked museum states + Debug Arena locked rooms + Boss Battles for Async/Auth/React State/API/DB + Code Cinema replay clips + Secret Labs mini experiments + accessible Theme Shop cosmetics + collectible concept cards and museum stamps + one-time rewards for completed locked experiences + locked-experience balancing tests + duplicate reward hardening + economy export/import shipped; scattered XP rewards now route through `awardLearningReward` with real metadata and coins across the main learning surfaces; reward metadata audit now guards future sources; XP panel now includes economy tuning table and dashboard metrics; level-up toast shipped with reduced-motion behavior; anti-cheat gate now blocks repeated positive reward shortcuts, purchase-based mastery and fake reward paths; the store now states coins are local learning rewards, not real money; economy rollback can freeze rewards/purchases without deleting scores; level-100 readiness now exports exam proof, concept mastery, highest challenge proof, code proof and open weaknesses; level 100 now has a closed professor-exam definition and is blocked by red/missing QA, build or smoke gates.

---

## 🧠 Phase 9 — Exam Intelligence + Reliability Hardening

> סטטוס: Priority 0/1 עד המבחן. המטרה היא להפוך את הפורטל ממערכת עשירה למערכת שמובילה תלמיד לציון 100 באופן מדיד: בלי כפילויות, עם שאלות עומק, עם smoke מלא, ועם תוכנית יומית ברורה.

### W40 — Exam Cockpit
- [V] P9.1.1 — Add "Exam Cockpit" dashboard: today's plan, weak modules, readiness %, next drill and blocker list
- [V] P9.1.2 — Add exam countdown and daily target: minutes, modules, question count and code tasks
- [V] P9.1.3 — Add "100 readiness" checklist: every concept mastered, hard question solved, code proof exists, and professor exam proof exists
- [V] P9.1.4 — Add final mock exam pack: deterministic 3 variants covering all SVCollege modules
- [V] P9.1.5 — Add module heatmap: JS, React, Node, DB, Auth, Next, DevOps, AI, Design Systems
- [V] P9.1.6 — Add one-click "study weakest 30 minutes" flow
- [V] P9.1.7 — Add end-of-day report: learned, failed, repeated, mastered, next action
- [V] P9.1.8 — Add printable/PDF exam cram sheet from weak concepts only

### W41 — Deep Question Ladder
- [V] P9.2.1 — Guarantee no repeated question in the same learner profile until the bank is exhausted
- [V] P9.2.2 — After every correct answer, replace with a harder question for the same canonical concept
- [V] P9.2.3 — After every wrong answer, route to prerequisite explanation + one recovery question before retry
- [V] P9.2.4 — Add hard-bank expansion for all density warnings: `validate:strict` now reports `0/568` concepts needing more questions
- [V] P9.2.5 — Add per-answer explanation: why correct, why every distractor is wrong, one memory association
- [V] P9.2.6 — Add highest-difficulty proof: no concept reaches 100/mastered without level-6/7 challenge solved
- [V] P9.2.7 — Add code proof per code concept: trace/fill/bug/build evidence required
- [V] P9.2.8 — Add question reuse audit report by learner profile and concept tag

### W42 — Full Portal Reliability
- [V] P9.3.1 — Add Playwright desktop smoke for every top tab, context tree and primary action
- [V] P9.3.2 — Add Playwright mobile smoke for every top tab, drawer, right tree and focus mode
- [V] P9.3.3 — Add visual overlap audit: no XP/status/chrome strip may occupy central empty learning space (`svcollege:visual-overlap:strict`)
- [V] P9.3.4 — Add local profile backup/restore smoke: scores + XP + coins + purchases + rewardLog
- [V] P9.3.5 — Add offline/PWA smoke for core SVCollege flow
- [V] P9.3.6 — Add service worker cache audit whenever new lessons/data files are added
- [V] P9.3.7 — Add accessibility audit for tree navigation, modals, store, XP panel and mock exam
- [V] P9.3.8 — Add performance budget: initial shell, seeded bank lazy load, tab render time and mobile scroll

### W43 — Learning Coach + Weakness Repair
- [V] P9.4.1 — Add automatic wrong-answer coach card in every question mode
- [V] P9.4.2 — Add misconception clusters: repeated wrong patterns across tabs become a named weakness
- [V] P9.4.3 — Add recovery drills: 3 short questions after a repeated mistake before returning to hard mode
- [V] P9.4.4 — Add confidence calibration per concept: student confidence vs actual correctness
- [V] P9.4.5 — Add fatigue guard: if accuracy drops sharply, suggest review mode instead of penalty mode
- [V] P9.4.6 — Add "explain in one line" checkpoint before mastery for conceptual topics
- [V] P9.4.7 — Add "write from scratch" checkpoint before mastery for implementation topics
- [V] P9.4.8 — Add spaced review schedule that prioritizes exam-critical weak concepts first

### W44 — Post-Exam Productization
- [V] P9.5.1 — Freeze an "Exam Edition" release tag after all P9 smoke and readiness gates pass
- [V] P9.5.2 — Split future school mappings into separate portals; this portal remains SVCollege AI & Full Stack
- [V] P9.5.3 — Add Teacher Lite after exam: one class, progress table, weak-topic heatmap, export
- [V] P9.5.4 — Add Sync Alpha after exam: auth, cloud progress, conflict policy and privacy notice
- [V] P9.5.5 — Add AI Tutor production Alpha after exam: backend proxy, guardrails, rate limits and logs
- [V] P9.5.6 — Add content factory pipeline: create questions + QA + distractor review + prerequisite metadata
- [V] P9.5.7 — Add metrics dashboard: D1/D7 retention, mastery velocity, exam score uplift, question quality index
- [V] P9.5.8 — Add pricing/packaging plan for post-exam premium experiences without blocking learning content

**P9 Total: 40/40** — Exam Cockpit now shows today's plan, countdown, daily target, module heatmap, weak modules, readiness %, next drill, blockers and end-of-day report; one-click weakest 30-minute flow opens the trainer in weak mode; printable weak-concept cram sheet is linked from the cockpit; full portal desktop/mobile smoke gate now covers 22/22 top tabs, context tree, primary actions, drawer, right tree, focus mode and 0 console errors/warnings; automatic wrong-answer coach cards now wrap the weakness agent across trainer, trace, concept sprint, inline lesson questions, lesson quiz, guide, codeblocks and mock exam; repeated misconception patterns across tabs now become named weaknesses with count, modes, concepts and repair plan; repeated mistakes now schedule three short recovery drills before delayed review and before returning to hard mode; per-concept confidence calibration compares 1-5 self-rating with actual correctness and flags over/under-confidence; fatigue guard now suggests review mode when recent accuracy drops sharply or penalty sprint results show overload; conceptual topics now require a valid one-line explanation checkpoint before mastery/100 is released; implementation topics now require a write-from-scratch code checkpoint before mastery/100 is released; spaced review now prioritizes due, weak, and exam-critical concepts before ordinary review; backup/restore smoke now covers scores + XP economy state; accessibility audit now covers tree navigation, modals, store, XP panel and mock exam; performance budget now guards shell size, lazy seeded bank, render hooks and offline cache; no-repeat routing shipped across generated trainer questions, curated inline MC, trace and mock exam pools; correct trainer answers now continue into the next harder same-concept question when available; wrong trainer answers now route into prerequisite/recovery questions before retry; per-answer explanation bundles now render across trainer, trace, concept sprint and inline concept quizzes; mastery now requires highest-available challenge proof across MC, Fill, Trace and Bug pools plus code proof for code-bearing concepts; density warnings are now closed at `0/568`; final mock exam pack now has 3 deterministic SVCollege variants; question reuse audit is green at `0` duplicate identities; PWA/cache audit now checks all index data scripts and the lazy seeded bank; 100-readiness checklist is exported with progress; Exam Edition freeze is now locked by `17/17` passing gates; portal boundary gate now locks the active portal to SVCollege AI & Full Stack and sends future school mappings to separate specs; Teacher Lite now has one-class progress, mastery heatmap and JSON export from real class data only; Sync Alpha is now credential-gated, privacy-noted and locked by `6/6` auth/cloud/conflict checks; AI Tutor Alpha now uses a backend proxy with guardrails, rate limits, structured logs and no frontend provider key; content factory pipeline now locks generation, QA, distractor review, prerequisite metadata and reuse audit; Metrics Dashboard now adds D1/D7, mastery velocity, exam score uplift and question quality index from real local evidence/QA reports only; pricing/packaging plan now separates post-exam premium services from required exam learning and leaves unvalidated prices as `unknown/unavailable`.

---

## 🧪 Phase 10 — Exam OS v2 + Content Factory

> סטטוס: Priority 2 / Post-Exam. לא מתחילים Phase 10 לפני ש-Phase 9 ו-Finish Line 1 ירוקים. המטרה היא להפוך את מה שבנינו למערכת ייצור, מדידה ושיפור מתמשך, בלי להעמיס עוד טאבים על התלמיד לפני המבחן.

### W45 — Content Factory Pipeline
- [V] P10.1.1 — Add content factory dashboard: concepts needing hard MC, Fill, Trace, Bug, Build or distractor feedback
- [V] P10.1.2 — Add deterministic generation queue from real concept data only; no fake placeholder questions
- [V] P10.1.3 — Add hard-question templates by concept family: JS basics, React state, API, DB, Auth, Next, DevOps, AI
- [V] P10.1.4 — Add reviewer checklist: one-line definition, prerequisite terms, correct answer, distractor quality, memory association
- [V] P10.1.5 — Add duplicate detector across all question pools and concept aliases
- [V] P10.1.6 — Add density targets per concept: minimum hard MC, Fill/code proof, Trace/Bug/Build where relevant
- [V] P10.1.7 — Add import path for NotebookLM clips and external video links, mapped by canonical concept tag
- [V] P10.1.8 — Add report that separates exam-critical content from enrichment-only content

### W46 — Adaptive Daily Exam OS
- [V] P10.2.1 — Add daily study plan builder: time budget, weak modules, concept proofs and mock exam target
- [V] P10.2.2 — Add "today only" queue: no more than 3 weak topics, 2 code proofs and 1 mock section
- [V] P10.2.3 — Add spaced review calendar that prioritizes SVCollege exam-critical weak concepts
- [V] P10.2.4 — Add fatigue-aware mode switch: if accuracy drops, move to review instead of penalty sprint
- [V] P10.2.5 — Add offline cram mode: compact one-line definitions + comparison tables + code proof checklist
- [V] P10.2.6 — Add end-of-day diff: level changes, code proofs, wrong clusters, next blockers
- [V] P10.2.7 — Add personal exam readiness trend over days, not just current score
- [V] P10.2.8 — Add printable final 24-hour plan from actual weak concepts

### W47 — Mastery Audit + Anti-Duplication
- [V] P10.3.1 — Add concept-tag audit: duplicate score buckets, aliases, unresolved conceptKeys and orphan questions
- [V] P10.3.2 — Add per-learner question reuse audit with exhausted-vs-repeated breakdown
- [V] P10.3.3 — Add mastery proof audit: concepts at level 6/7 without hard proof, code proof or recent review
- [V] P10.3.4 — Add "false confidence" audit: high confidence + wrong answers by misconception cluster
- [V] P10.3.5 — Add cross-tab evidence graph: where the student proved each concept
- [V] P10.3.6 — Add rollback-safe migration for old scores into proof-based mastery
- [V] P10.3.7 — Add release blocker when any exam-critical concept lacks a proof path
- [V] P10.3.8 — Add audit export for teacher/mentor review after the exam

### W48 — Final Exam Simulation Lab
- [V] P10.4.1 — Add 3 full deterministic final exams: standard, hard, stress
- [V] P10.4.2 — Add timed stress mode: fewer hints, stricter navigation, no study aids during answer
- [V] P10.4.3 — Add post-exam review mode grouped by concept, misconception and prerequisite gap
- [V] P10.4.4 — Add "prove again" retest for every wrong final-exam concept
- [V] P10.4.5 — Add score projection: current readiness vs expected exam score with confidence range
- [V] P10.4.6 — Add final weak list: 20 concepts that most threaten score 100
- [V] P10.4.7 — Add code-only final: Trace, Fill, Bug and Mini Build without theory questions
- [V] P10.4.8 — Add Exam Edition freeze checklist and release notes

### W49 — Post-Exam Product Split
- [V] P10.5.1 — Split non-SVCollege course mappings into future portal specs
- [V] P10.5.2 — Create portal template: curriculum blueprint, concept tags, questions, proof gates, tabs and smoke tests
- [V] P10.5.3 — Define Teacher Lite v2 from actual exam data: progress table, weak-topic heatmap, export
- [V] P10.5.4 — Define Sync v2 privacy model: local-first, cloud optional, conflict policy
- [V] P10.5.5 — Define AI Tutor v2 eval set: no direct answer leak, Socratic hints, misconception repair
- [V] P10.5.6 — Define Premium Experience rules: never lock exam-critical knowledge, only enrichment and motivation
- [V] P10.5.7 — Add business KPIs: D7 retention, mastery velocity, exam uplift, question quality index
- [V] P10.5.8 — Add quarterly roadmap review: freeze, cut, or promote features based on real usage
- [V] P10.5.9 — Promote validated seeded questions into hand-curated bank after learner outcome/review evidence

**P10 Total: 41/41 ✅** — Content factory dashboard, deterministic generation queue, hard-question template catalog, reviewer checklist, duplicate detector, density target report, video import map, exam-critical content split, daily study plan builder, today-only queue, spaced review calendar, fatigue-aware mode switch, offline cram mode, end-of-day diff, readiness trend, final 24-hour plan, concept-tag audit, per-learner question reuse audit, mastery proof audit, false confidence audit, cross-tab evidence graph, rollback-safe proof migration plan, exam-critical proof blocker, teacher/mentor audit export, three deterministic final exam templates, timed stress mode, grouped post-exam review, prove-again final retests, score projection, final weak list, code-only final, Exam Edition release notes and post-exam product split gate are now available; all reports and final templates use real concept/question/video/score/outcome/history/alias/answered-ID/proof/confidence/evidence/wrong-answer/release-gate/policy/usage data only and never fabricate question text, answers, options, proofs, URLs, clips, plan rows, queue rows, review content, fatigue metrics, cram facts, trend points, tags, repetitions, confidence, graph edges, retests, score projections, weak concepts, release notes, teacher notes, prices, usage metrics, learner outcomes or reviewer evidence.

---

## 🎯 Iron Rules (כללי ברזל) — מתעדכן עם כל commit

- [V] No Math.random in functional code (lib/rng.js only)
- [V] No fake data (validate_bank --strict enforces)
- [V] No API keys in frontend (planned: backend proxy)
- [V] No editing main directly (PRs only)
- [V] No breaking CI (tests/build/strict validation/release gates are green; remediation quality queue remains tracked separately)
- [V] No flaky tests (Vitest deterministic + no-native-random guard; desktop browser smoke passed)
- [V] No feature without DoD (policy + PR template + CI feature evidence gate)
- [V] No boilerplate (validator catches)
- [V] No fill question with ambiguous answer (`validate:strict` is green; deeper Fill leakage cleanup remains tracked in P-0.4.8)
- [V] No lessons without difficulty

---

## 📝 Update Log

```
2026-04-27 21:30 — Initial task list created (209 total tasks)
2026-04-27 22:00 — Phase 1 W1 begins
2026-04-27 22:51 — P1.4.1 Code Runner (🚀 הרץ) shipped
2026-04-27 23:13 — P1.4.3 Bug Hunt mode shipped (14 bugs)
2026-04-27 23:20 — User-requested study UX added to plan:
                   • P1.5.0a View Mode panel (toggles + jumper + presets)
                   • P1.5.0b Knowledge Map by topic + A-F grade
                   • P1.5.0c Code Anatomy refactor (filters) — pending
                   • P1.5.0d SITE_MAP.md — pending
2026-04-27 23:25 — P1.5.0a + P1.5.0b shipped (in code, verified in browser)
2026-04-28 00:09 — P1.5.0c (Code Anatomy filters) + P1.5.0d (SITE_MAP.md) shipped
2026-04-28 00:13 — P1.5.1 Mock Exam Mode shipped — Tab + 5 templates + timer + nav + result + history
2026-04-28 00:24 — P1.4.4 Mini Build shipped — 8 builds + regex tests + UI on concept card
2026-04-28 00:30 — Sprint 2 Mental Model Animator shipped — 6 concepts × 3-4 frames + stepper UI
2026-04-28 00:34 — Sprint 3 Side-by-Side Comparator dedicated tab shipped (6 pairs)
2026-04-28 00:38 — Sprint 3 What-If Simulator shipped — 5 concepts × 3 scenarios + interactive knobs
2026-04-28 00:41 — Pocket Concept Card shipped — floating panel + per-concept save button
2026-04-28 01:05 — Final wave: P1.5.2 distractor feedback + a11y + glossary + reflection + reverse + ELI5
2026-04-28 01:35 — 🔍 AUDIT performed (AUDIT_2026-04-28.md):
                   - Found 2 broken features (Reverse Q&A + ELI5) — fixed in 12be94a
                   - Found 4 inflated counts (anti-patterns 14/22, war stories 18/30,
                     mini builds 8/21, distractor feedback 14/1316)
                   - 31 AUDIT-FIX tasks added below
2026-04-28 09:35 — Audit-fix execution pass:
                   - Fixed all functional Math.random usage in app.js via RNG
                   - Added Vitest guard against native random calls in JS files
                   - Closed strict validation errors in Trace/Build conceptKeys
                   - Added 5 Closures traces; Trace total now 85 (50 new audit traces)
                   - Verified grandma knowledge tab in browser + source URLs 200
2026-04-28 09:50 — P2.S1.3 Flashcards shipped:
                   - Added SRS flashcards tab generated from real LESSONS_DATA concepts
                   - Added front/back reveal + Again/Hard/Good/Easy rating
                   - Verified in Playwright: open tab → reveal → rate Good → next card, no console errors
2026-04-28 15:58 — W24 Capstone track shipped:
                   - Added dedicated "פרויקטים" tab with side-tree navigation
                   - Added 5 capstones: Task Manager, Movie App, Budget Manager, Auth CRUD, Dashboard
                   - Added measurable rubric per project: requirements, edge cases, tests, code review checklist
2026-04-28 18:04 — Strategic roadmap expansion:
                   - Added Phase 7 Learning OS + Outcome Scale
                   - Added 48 future tasks across diagnostic placement, weekly adaptive plan, project studio,
                     teacher pilot, AI tutor production guardrails, accessibility/mobile/trust hardening
                   - Updated total baseline to 232/349
2026-04-28 18:11 — W24 Course Blueprint alignment shipped:
                   - Added "יישור קורסים" tab with side-tree navigation
                   - Initial public-source mappings included SVCollege, John Bryce, Sela, and generic bootcamp
                   - Later scoped active portal alignment to SVCollege only; other mappings moved to deferred future portals
                   - Updated total baseline to 234/349
2026-04-28 09:57 — AUDIT-FIX-6 browser re-verification:
                   - Per-card refresh verified: Report Weak updates Array card in place
                   - ARIA labels visible in Playwright accessibility snapshot
                   - Theme cycle fixed + verified auto → light → dark → auto
2026-04-28 10:07 — AUDIT-FIX-7 Time Machine shipped:
                   - Replaced quick-jump history button with full progress timeline
                   - Uses only real local progress: exams, reflections, reviews, weak reports, mastered concepts
                   - Verified in Playwright: open view menu → Time Machine → action to Flashcards, no console errors
2026-04-28 10:14 — AUDIT-FIX-20 Achievements completed:
                   - Expanded achievements from 18 to 30
                   - Fixed global achievement stats to read the active scores store directly
                   - Added lifetime flashcard review stats for SRS achievements
2026-04-28 10:24 — AUDIT-FIX-19 Lesson wrap-up shipped:
                   - Added 60-second post-quiz wrap-up modal from real quiz results
                   - Added confidence calibration tracking and saved lesson-wrap history
                   - Linked wrap-up actions to weak Flashcards and Knowledge Map
2026-04-28 10:43 — AUDIT-FIX-31 Concept Map graph shipped:
                   - Added deterministic SVG prerequisite graph inside Knowledge Map
                   - Added focus selector for ancestors/descendants and clickable graph nodes
                   - Used exact lesson concepts with alias correction for existing prerequisite keys
2026-04-28 11:04 — Global right-side context tree shipped:
                   - Moved lesson concept navigation from content strip to right context tree
                   - Added branch/sub-branch navigation for major tabs
                   - Connected Code Anatomy, Code Blocks, Trace, Guide, KM, Flashcards, Exam, Gap Matrix
2026-04-28 11:19 — AUDIT-FIX Creative Methods batch shipped:
                   - Concept Comic system: 8 core concepts with visual story panels
                   - Stage-Zero broken-first flow: 8 real beginner failures with repairs
                   - Memory Palace: 8 SVG concept rooms rendered offline
                   - Problem-First Discovery: 8 product symptoms mapped to course concepts
2026-04-28 11:36 — AUDIT-FIX-13 Animated Concept Clips shipped:
                   - data/concept_videos.js: 10 offline clips mapped to existing concepts
                   - Concept-card player: scene controls, auto-play, progress, checkpoints
                   - View Mode toggle + service-worker offline cache updated
2026-04-28 11:47 — P3.12.4 Reverse Q&A re-verified:
                   - Modal opens from View Mode tools
                   - Renders definition + 4 concept options
                   - Answer click shows feedback, locks options, and exposes next-question action
2026-04-28 12:05 — NotebookLM Concept Clips production plan shipped:
                   - Added NOTEBOOKLM_CONCEPT_CLIPS.md with per-concept scripts and settings
                   - Added verified temporary YouTube links to concept clip cards
                   - Corrected map clip key to lesson_12::map so all 10 clips attach to real concepts
                   - Bumped service worker cache for refreshed concept video data
2026-04-28 12:24 — AUDIT-FIX-14 Real-Object Visual Aids shipped:
                   - Added 50 deterministic local real-object aids for Grandma Knowledge
                   - Connected aid tags into existing atlas/branch/term visuals
                   - Cached grandma_visuals.js offline and added coverage tests
2026-04-28 12:32 — Vite + TypeScript bootstrap shipped:
                   - Added vite.config.js, dev/build/preview scripts, and src/main.js module bootstrap
                   - Added src/core, src/ui, src/views, src/utils ownership scaffold for app.js extraction
                   - Added tsconfig.json plus typed lib/rng.ts and lib/srs.ts ports with Vitest coverage
                   - Vite build copies legacy static assets to dist for preview/deploy compatibility
2026-04-28 12:42 — Core scoring module extraction shipped:
                   - Added src/core/scoring.js for mastery, SRS-due, V-button, next-step and mastery-percent rules
                   - Legacy app.js delegates scoring helpers to window.LUMEN_CORE.scoring
                   - tests/scoring.test.js now imports the production core module instead of duplicating rules
                   - Service worker cache bumped to include the new core module offline
2026-04-28 12:47 — Context Tree view module extraction shipped:
                   - Added src/views/context-tree.js for branch filtering, leaf counting and stable action ids
                   - Legacy app.js delegates right-side tree pure helpers to window.LUMEN_VIEWS.contextTree
                   - Added tests/context-tree.test.js; total Vitest coverage now 59 tests
                   - Service worker cache bumped to include the extracted view module offline
2026-04-28 13:10 — Streak freeze shipped:
                   - Added src/core/streak.js deterministic monthly freeze engine
                   - Auto-preserves a streak once per month when exactly one day was missed
                   - Streak widget now shows monthly freeze availability
                   - Added tests/streak.test.js; total Vitest coverage now 64 tests
2026-04-28 13:18 — Glossary expansion shipped:
                   - Expanded data/glossary.js from 77 to 228 real Hebrew/English entries
                   - Covered React, JavaScript, TypeScript, Web/Backend, and Tooling categories
                   - Bumped glossary version to track-d-v2 and service-worker cache to refresh offline data
                   - Added tests/glossary.test.js; total Vitest coverage now 67 tests
2026-04-28 13:27 — Distractor objectivity audit shipped:
                   - Added scripts/audit_distractors.js with reproducible deterministic 50-MC sampling
                   - Generated AUDIT_DISTRACTORS_2026-04-28.md from the combined curated+seeded MC bank
                   - Strict audit found 0 blocker-level issues; 1 warning remains for broader seeded QA review
                   - Added tests/distractor-audit.test.js; total Vitest coverage now 70 tests
2026-04-28 13:32 — Seeded 10% QA shipped:
                   - Added scripts/audit_seeded_questions.js with reproducible deterministic 170-question sampling
                   - Generated AUDIT_SEEDED_QA_2026-04-28.md from QUESTIONS_BANK_SEEDED
                   - Strict seeded QA found 0 blocker-level issues after correcting symbol-only option detection
                   - Fixed seed_questions.js default seed to a stable value; total Vitest coverage now 73 tests
2026-04-28 13:39 — DOMPurify sanitization shipped:
                   - Added DOMPurify vendor script + src/core/sanitize.js with deterministic fallback sanitizer
                   - Added early bootstrap that patches innerHTML + insertAdjacentHTML before legacy app rendering
                   - Preserves required UI data/ARIA/style attributes while stripping scripts, event handlers, and unsafe URLs
                   - Added tests/sanitize.test.js; total Vitest coverage now 77 tests
2026-04-28 14:09 — Question prerequisites side-aid shipped:
                   - Added src/core/question-prerequisites.js to infer required concepts and glossary terms per question
                   - Rendered prerequisite explanations beside lesson quizzes, trainer questions, trace questions, guide questions, mock exams, and inline concept quizzes
                   - Each aid uses the real prerequisite graph, lesson concept explanations, glossary entries, and current mastery score
                   - Added tests/question-prerequisites.test.js; total Vitest coverage now 82 tests
2026-04-28 14:31 — Review re-baseline + quality governance plan:
                   - Reconciled Grok/report claims with repo-verified counts
                   - Reclassified Per-Distractor Feedback and Cross-device Sync as Partial until full-bank/live coverage exists
                   - Added Phase 5 Quality Governance + 90-day rebaseline tasks
                   - Updated SPEC_AND_MASTER_PLAN with DoD/KPI/release-train policy
2026-04-28 14:45 — Feature coverage counters shipped:
                   - Added scripts/report_feature_coverage.js to compute 22 content-module coverage metrics from real data files
                   - Generated FEATURE_COVERAGE_REPORT.json + FEATURE_COVERAGE_REPORT.md
                   - Report shows 21 Done modules, 1 Partial module: Per-Distractor Feedback 50/1340 MC questions
                   - Added npm coverage scripts + Vitest coverage tests; total suite now 86 tests
2026-04-28 14:52 — Feature coverage CI gate shipped:
                   - Added coverage:features:strict script and CI Feature coverage gate
                   - Strict gate fails only enforced targets; staged partials remain visible without blocking
                   - Tightened CI Math.random gate to forbid Math.random in all authored JS
2026-04-28 15:05 — Full-bank Question Quality pipeline shipped:
                   - Added scripts/report_question_quality.js with questionQuality schema for 1,894 MC/Fill questions
                   - Added gates for duplicate/near-duplicate options, length cues, generic wording, Fill ambiguity, and missing conceptKey
                   - Fixed 5 blocker questions (6 duplicate-option issues); current strict report has 0 blockers
                   - Generated QUESTION_QUALITY_REPORT.json + QUESTION_QUALITY_REPORT.md; QQI now 88.2% warning-free
                   - Added quality:questions scripts, CI question-quality gate, and Vitest coverage tests; total suite now 90 tests
2026-04-28 15:18 — Remediation queue + weekly QA governance shipped:
                   - Added .github/pull_request_template.md with goal/metric/rollback/evidence checklist
                   - Added scripts/build_question_remediation_queue.js; current queue: 683 warning/note items in 28 batches
                   - Added scripts/build_question_qa_checklist.js; deterministic 10% manual sample: 190/1,894 questions
                   - Added Monday scheduled CI + qa/remediation gates
                   - Added Vitest coverage tests; total suite now 96 tests
2026-04-28 15:31 — Lesson quiz concept routing shipped:
                   - Added data/lesson_quiz_keys.js with explicit conceptKeys for 133/133 lesson quiz items
                   - content-loader now attaches conceptKeys to each lesson.quiz item before rendering
                   - Added scripts/report_lesson_quiz_keys.js + LESSON_QUIZ_KEYS_REPORT.*
                   - Added CI strict gate and Vitest coverage tests; total suite now 99 tests
2026-04-28 15:48 — Wrong-answer weakness agent shipped:
                   - Added src/core/mistake-agent.js with deterministic concept/topic weakness state
                   - Wrong answers now increment weakReports and local mistake-agent concept/topic lists
                   - Trainer, guide, inline quizzes, code blocks, trace, mock exam, and bug quests show/record mistake context
                   - Feedback includes selected answer, correct answer, explanation, and existing concept association/grandma-level aid
                   - Service worker cache bumped to include src/core/mistake-agent.js offline
                   - Added tests/mistake-agent.test.js; total Vitest coverage now 103 tests
2026-04-28 16:08 — Programming Foundations tab shipped:
                   - Added top tab "🧱 אבני בסיס"
                   - Added bool/if/variable/array/function cards with code examples and confusion notes
                   - Added function-vs-array comparison, build recipes, and 0→app diagram
                   - Added right-side context tree and updated SITE_MAP.md
2026-04-28 16:24 — Programming Foundations expanded:
                   - Added sub-tabs for foundations, build examples, menus, efficiency patents, technology ranking, and languages
                   - Added variable/array/class/function variants with Big-O efficiency and recommendations
                   - Added menu examples in JSON, Node.js, React, and Next.js
                   - Added library warning list and language speed/capability explanations
                   - Service worker bumped to v2.3.1 and HTML navigation fixed to network-first so the new tab is not hidden by stale cache
2026-04-28 16:40 — Programming history timeline added:
                   - Added history sub-tab explaining "first programming language" as algorithm / machine code / assembly / high-level language
                   - Added clickable timeline from the first transistor to C and modern languages
                   - Service worker bumped to v2.3.2 so updated app.js/style.css refresh through cache
2026-04-28 16:55 — Electricity-to-value foundations added:
                   - Added "⚡ חשמל→ערך" sub-tab explaining how values and programming primitives are built from electrical states
                   - Added bit/logic-gate/adder/memory/byte/encoding/value ladder with clickable side-tree entries
                   - Service worker bumped to v2.3.3 for refreshed static assets
2026-04-28 17:10 — Programming Language Museum shipped:
                   - Added "🏛️ מוזיאון" sub-tab under אבני בסיס
                   - Added 9 historical halls, 27 exhibits, 5 idea lineages, and historical expansion ideas
                   - Updated SPEC_AND_MASTER_PLAN and task totals; service worker bumped to v2.3.4
2026-04-28 17:22 — React anatomy foundations shipped:
                   - Added "⚛️ React למה?" sub-tab under אבני בסיס
                   - Explained React primitives by purpose, replacement, efficiency, alternatives, and better patterns
                   - Service worker bumped to v2.3.5
2026-04-28 17:35 — Efficiency foundations chapter shipped:
                   - Added "📈 יעילות" sub-tab under אבני בסיס
                   - Added Big-O scale, efficiency axes, must-know concepts, readiness map for upcoming chapters, and decision rules
                   - Service worker bumped to v2.3.6
2026-04-28 17:48 — Computer-understanding bridge expanded:
                   - Expanded "⚡ חשמל→ערך" with value construction, primitive dictionary, and source-code translation flow
                   - Added bit/byte/type/key/value/variable/reference/array/object/function/expression/instruction explanations
                   - Service worker bumped to v2.3.7
2026-04-28 18:02 — Programming principles top tab shipped:
                   - Added "🧭 עקרונות יסוד" top tab beside אבני בסיס
                   - Added deterministic examples and 22 required concepts for good programming
                   - Service worker bumped to v2.3.8
2026-04-28 18:18 — Standalone programming museum shipped:
                   - Added "🏛️ מוזיאון" top tab with immersive museum background and right-side context tree
                   - Added SVG layer diagram, historical timeline, illustrated halls, idea lineages, and visit quests
                   - Service worker bumped to v2.3.9
2026-04-28 18:30 — Strategic improvement plan added:
                   - Added Phase 6 Learning Evidence + Productization with 35 measurable tasks
                   - Focus shifted to learning proof, adaptive remediation, curriculum coverage, content studio, and pilot readiness
                   - Updated total task baseline to 215/300
2026-04-28 18:45 — Phase 6 Learning Evidence MVP shipped:
                   - Added src/core/learning-evidence.js with canonical event schema, deterministic hashes, local sessions, and funnel summaries
                   - Added "📈 ראיות למידה" top tab with local KPI dashboard, concept funnels, active-day bars, and privacy note
                   - Connected lesson views, answers, wrong-answer aids, flashcards, mock exams, and lesson wrap-ups to evidence events
                   - Added tests/learning-evidence.test.js; Vitest suite now 106 tests
                   - Service worker bumped to v2.4.0; total baseline now 219/300
2026-04-28 19:05 — Phase 6 export/report shipped:
                   - Added anonymized JSON export for teacher/research review
                   - Added local weekly Markdown report generated from real usage logs
                   - Service worker bumped to v2.4.1; total baseline now 221/300
2026-04-28 19:18 — Phase 6 evidence-required gate shipped:
                   - Upgraded feature coverage report to v2 with outcomeMetric per tracked module
                   - Strict coverage CI now fails Done modules without outcome metric or repository evidence
                   - Updated PR template with explicit outcome metric/evidence gate checkbox; total baseline now 222/300
2026-04-28 19:32 — Adaptive Remediation v2 begins:
                   - Added deterministic misconception clustering to mistake-agent
                   - Added immediate misconception cards: root cause, repair, micro-drill, and association
                   - Service worker bumped to v2.4.2; total baseline now 224/300
2026-04-28 19:45 — Teach-back remediation shipped:
                   - Added teach-back prompts after repeated misconception mistakes
                   - Saves the student's own explanation locally and logs a review event
                   - Service worker bumped to v2.4.3; total baseline now 225/300
2026-04-28 20:02 — Adaptive retest queue shipped:
                   - Wrong answers now schedule near-transfer and delayed-review retests
                   - Trainer prioritizes due retests before normal weighted selection and records outcome
                   - Service worker bumped to v2.4.4; total baseline now 226/300
2026-04-28 20:18 — Prerequisite rewind shipped:
                   - Wrong advanced answers now choose the weakest prerequisite deterministically
                   - Trainer routes to the lower-level prerequisite before returning to normal flow
                   - Service worker bumped to v2.4.5; total baseline now 227/300
2026-04-28 20:35 — Per-concept confidence calibration shipped:
                   - Trainer asks for confidence 1-5 before MC/Fill answers
                   - Each concept tracks accuracy vs confidence: calibrated / overconfident / underconfident
                   - Service worker bumped to v2.4.6; total baseline now 228/300
2026-04-28 20:48 — "I still do not get it" escape hatch shipped:
                   - Wrong-answer panel can log a blocker and open the simplest path
                   - If prerequisite rewind exists, the escape hatch opens that lower-level concept first
                   - Service worker bumped to v2.4.7; total baseline now 229/300
2026-04-28 21:02 — Misconception library expanded:
                   - Added mapped cards for 20 React/JS/TS/Node mistake patterns plus fallback
                   - Added deterministic tests for coverage and specific rule routing
                   - Service worker bumped to v2.4.8; total baseline now 230/301
2026-04-28 21:30 — Priority override: SVCollege first
                   - Added Priority 0: SVCollege Readiness + Site Health
                   - Updated SVCollege blueprint to match public AI & Full Stack modules
                   - Added SVCOLLEGE_COVERAGE_REPORT.md and svcollege-readiness regression tests
                   - All museum/AI/community expansions are explicitly secondary until SVCollege readiness is green
2026-04-28 21:45 — Finish Line 1 expanded:
                   - Replaced Priority 0 with Finish Line 1: SVCollege Full Portal Coverage
                   - Added DoD across all lessons, all tabs, all practice modes, all menus and site-health gates
                   - Expanded first-line backlog to 50 measurable tasks before secondary expansions
2026-04-28 22:05 — SVCollege readiness automation shipped:
                   - Added `scripts/report_svcollege_readiness.js` with automatic module readiness percentages
                   - Added `npm run svcollege:readiness*` commands and CI metadata gate
                   - Added PR checklist gate preventing Priority 2 work before SVCollege/site-health closure
                   - Generated `SVCOLLEGE_READINESS_REPORT.md/json`: 70% average, 6/15 covered, 4 gaps
2026-04-28 22:18 — Course Blueprints readiness UI shipped:
                   - Course Blueprints tab now shows weighted readiness per course and per module
                   - Each module displays lesson/concept/question/activity percentages beside Covered/Partial/Gap status
                   - Right-side tree metadata includes module status + readiness percentage
2026-04-28 22:35 — SVCollege mock exam shipped:
                   - Added `svcollege_fullstack` exam template with 55 questions and 90-minute timer
                   - Mock exam now loads the seeded bank before composing questions
                   - SVCollege results include module-level scoring breakdown beside question-kind scoring
                   - Course blueprint mock exam tags now expose `svcollege_fullstack`
2026-04-28 22:48 — SVCollege lesson inventory shipped:
                   - Added `SVCOLLEGE_LESSON_INVENTORY.md`
                   - Mapped existing lessons, partial modules and required new lesson IDs
                   - Defined per-new-lesson DoD for content, practice, tabs, mock exam and CI
2026-04-28 23:05 — HTML/CSS Foundations lesson shipped:
                   - Added `data/lesson_html_css_foundations.js` with 8 concepts and lesson quiz
                   - Added curated MC, Fill, Code Trace and Mini Build practice for the new lesson
                   - Wired lesson into loader, offline cache, quiz-key report, readiness report and SVCollege blueprint
                   - SVCollege HTML/CSS module moved from Partial to Covered; readiness now 70.7%, 7/15 covered
2026-04-28 23:25 — Tooling & Git lesson shipped:
                   - Added `data/lesson_tooling_git.js` with Git, repo, working tree, staging, commit, branch, PR, GitHub workflow, npm scripts, ESLint and Prettier
                   - Added curated MC, Fill, Code Trace and Mini Build practice for tooling workflow
                   - Wired lesson into loader, offline cache, quiz-key report, prerequisites, readiness report and SVCollege mock exam module
                   - SVCollege ES6/Git/ESLint/Prettier module moved from Partial to Covered; readiness now 71.3%, 8/15 covered
2026-04-28 23:40 — Course alignment scope corrected:
                   - `COURSE_BLUEPRINTS` now exposes only `svcollege_fullstack_ai` for the active portal
                   - John Bryce, Sela and generic bootcamp mappings moved to `DEFERRED_COURSE_PORTAL_BLUEPRINTS`
                   - Top tab label changed to `יישור SVCollege`; this portal remains a Full-Stack portal focused on SVCollege coverage
2026-04-28 23:55 — Forward plan upgraded:
                   - Added Learning Contract + prerequisite capsules for hard questions
                   - Added SVCollege Command Center, lesson source registry and real learner outcome loop
                   - Recorded that raw lesson assets now live under `lessons/`
2026-04-29 00:05 — Parallel session prompt board shipped:
                   - Added `SVCOLLEGE_PARALLEL_SESSION_PROMPTS.md`
                   - Includes exact timing, prompts, ownership, DoD, tests and final-report format for Sessions 0-8
                   - Marked P-1.9.4 done; Finish Line 1 now 20/73
2026-04-29 00:18 — Lesson source registry shipped:
                   - Added `lessons/manifest.json` for 36 raw lesson assets
                   - Added `npm run lessons:assets` root-asset guard and `tests/lesson-assets.test.js`
                   - Added source coverage to `SVCOLLEGE_LESSON_INVENTORY.md`; Finish Line 1 now 23/73
2026-04-29 00:26 — New lesson source links shipped:
                   - Added `sourceAssets`, `generatedSummaries` and `sourceCoverageNote` to the HTML/CSS and Tooling/Git bridge lessons
                   - Extended `tests/lesson-assets.test.js` to verify lesson-level source links against `lessons/manifest.json`
                   - Marked P-1.10.4 done; Finish Line 1 now 24/73
2026-04-29 00:34 — SVCollege Command Center report shipped:
                   - Added `scripts/report_svcollege_command_center.js`
                   - Added `SVCOLLEGE_COMMAND_CENTER.md/json` with readiness, red-first queue, feature gates, source assets and parallel sessions
                   - Added `npm run svcollege:command-center:*` and `tests/svcollege-command-center.test.js`
                   - Marked P-1.9.2 done; Finish Line 1 now 25/73
2026-04-29 00:42 — Command Center evidence matrix shipped:
                   - Added module-level evidence links for lesson files, question banks, activity banks, tests and browser-smoke ownership
                   - Locked the red-first release queue order in tests
                   - Marked P-1.9.3 + P-1.9.5 done; Finish Line 1 now 27/73
2026-04-28 latest — Limited parallel mode set:
                   - Full merge train paused by user instruction
                   - Only SQL/ORM and Museum sessions continue in parallel
                   - Current session restricted to non-SQL/non-museum governance, reports and quality gates
2026-04-28 latest — No-evidence gate shipped:
                   - Command Center now fails strict mode if any `covered` SVCollege module lacks lesson + practice + tab + test evidence
                   - Added tab evidence and dedicated regression coverage
                   - Marked P-1.9.6 done; Finish Line 1 now 28/73
2026-04-28 latest — Museum lineage diagrams shipped:
                   - Added lightweight inline SVG timeline diagrams for every programming-language lineage
                   - Reused the same diagrams in `אבני בסיס → מוזיאון` and the standalone `מוזיאון` top tab
                   - Added milestone detail grids without external media or new runtime dependency
2026-04-28 latest — SQL/ORM integrated into SVCollege Finish Line:
                   - Wired `lesson_sql_orm` into index, content loader, offline cache, readiness and command center evidence
                   - Database module moved from Partial to Covered: MongoDB/Mongoose + SQL/PostgreSQL/Prisma/Drizzle
                   - SQL practice now includes 18 MC, 10 Fill, 3 Trace, 3 Mini Build, 2 Bug Hunt and prerequisites
                   - SVCollege readiness now 72%, 9/15 covered, 6 release blockers
                   - Marked P-1.2.4 done; Finish Line 1 now 29/73
2026-04-28 latest — Auth/Security integrated into SVCollege Finish Line:
                   - Added `lesson_auth_security` for authentication, authorization, sessions, secure cookies, JWT, OAuth/provider auth and security boundaries
                   - Auth practice now includes 28 MC, 10 Fill, 3 Trace, 3 Mini Build, 3 Bug Hunt and prerequisites
                   - Auth module moved from Gap to Covered
                   - SVCollege readiness now 78.7%, 10/15 covered, 5 release blockers
                   - Marked P-1.2.5 done; Finish Line 1 now 30/73
2026-04-28 latest — Next.js integrated into SVCollege Finish Line:
                   - Added `lesson_nextjs` for App Router, routing, layouts/pages, server/client components, route handlers/API routes, server actions, SSR/SSG/ISR, metadata, SEO, image optimization and Vercel deploy
                   - Next.js practice now includes 28 MC, 10 Fill, 3 Trace, 3 Mini Build, 3 Bug Hunt and prerequisites
                   - Next.js module moved from Gap to Covered
                   - SVCollege readiness now 85.3%, 11/15 covered, 4 release blockers
                   - Marked P-1.2.6 done; Finish Line 1 now 31/73
2026-04-28 latest — Nest.js integrated into SVCollege Finish Line:
                   - Added `lesson_nestjs` for modules, controllers, providers/services, DI, decorators, DTO, validation pipe, guards, pipes, middleware, interceptors, exception filters, repository pattern and testing module
                   - Nest.js practice now includes 24 MC, 10 Fill, 3 Trace, 3 Mini Build, 3 Bug Hunt and prerequisites
                   - Nest.js module moved from Gap to Covered
                   - Fixed existing Auth prerequisite cycle between OAuth and provider auth
                   - SVCollege readiness now 92%, 12/15 covered, 3 release blockers
                   - Marked P-1.2.8 done; Finish Line 1 now 32/73
2026-04-28 latest — DevOps integrated into SVCollege Finish Line:
                   - Added `lesson_devops_deploy` for production readiness, env vars, Vercel deploy/preview, build commands, Docker/Dockerfile/image/container, Docker Compose services/volumes, health checks, CI/CD, smoke tests and release checklist
                   - DevOps practice now includes 24 MC, 10 Fill, 3 Trace, 3 Mini Build, 3 Bug Hunt and prerequisites
                   - DevOps module moved from Partial to Covered
                   - SVCollege readiness now 92.7%, 13/15 covered, 2 release blockers
                   - Marked P-1.2.7 done; Finish Line 1 now 33/73
2026-04-28 latest — AI Engineering + Design Systems closed Finish Line module blockers:
                   - Added `lesson_ai_engineering` with OpenAI API, Vercel AI SDK, LangChain, model selection, structured output, streaming, token budget, embeddings, vector store, RAG, chunking, retrieval ranking, tool calling, agent loops, guardrails, hallucination checks, evaluation and fine-tuning boundaries
                   - Added AI Engineering practice: 28 MC, 10 Fill, 3 Trace, 3 Mini Build, 3 Bug Hunt and prerequisites
                   - Added `lesson_design_systems` with shadcn/UI, Radix primitives, accessible primitives, design tokens, variants, cn/cva, asChild slot, form composition, theme tokens, component registry and design-system testing
                   - Added Design Systems practice: 18 MC, 8 Fill, 2 Trace, 2 Mini Build, 2 Bug Hunt and prerequisites
                   - SVCollege readiness/release gate now 100%, 15/15 covered, 0 gaps, 0 release blockers
                   - Browser smoke verified new AI Engineering and Design Systems lessons in the right-side tree with prerequisite side panels
                   - Finish Line 1 now 41/101; remaining Priority 0 work is full all-tabs desktop/mobile QA and module × tab matrix
2026-04-29 01:35 — Post-merge QA reality check:
                   - Cancelled parallel repair mode and merged `codex/svcollege-prereq-gates` + `codex/svcollege-term-clarity` into `main`
                   - Added mastery-proof gate: level 7 alone is not 100; a concept needs highest available challenge proof
                   - Moved W12 XP/streak controls out of the central empty column and into the top bar
                   - Verification passed: 227/227 Vitest, build, validate:strict, no Math.random
                   - `qa:questions:strict` still reports `ready:false` due to 252 missing glossary term aliases; added P-0.2 blockers
                   - `main` is local-only and ahead of `origin/main` by 4 commits; push requires explicit approval
2026-04-29 01:40 — SVCollege question-aid QA blocker closed:
                   - Added deterministic SVCollege QA glossary aliases generated from requiredTerms
                   - Glossary now exposes complete tooltip entries for all required question terms
                   - `npm run qa:questions:strict` now reports `ready:true`, 0 issues, 0 missingGlossaryTerms
                   - Marked P-0.2.3, P-0.2.4, P-1.8.3 and P-1.8.5 done
2026-04-29 01:49 — Focus learning layout shipped:
                   - Collapsed duplicate top navigation into a single horizontal scroll row
                   - Moved W12 XP/streak/achievement controls into the right sidebar header, not the central content column
                   - Added persistent full-screen learning focus mode with a slide-in context tree menu
                   - Browser smoke verified: Focus button appears, Content drawer opens, build/test still green
2026-04-29 01:55 — Focus layout regression guard added:
                   - Added `tests/focus-layout.test.js` to lock W12/sidebar placement, one-row top tabs and focus-mode context drawer
                   - Marked P-0.2.6 done so future merges must preserve the corrected learning layout
2026-04-29 02:05 — Passwordless local learner profiles shipped:
                   - Added local sidebar profile selector + create-student flow, no password and no backend
                   - Added localStorage profile scoping so scores, weak concepts, XP, flashcards, evidence and practice state belong to the active learner
                   - Existing unscoped learning progress migrates into the first local profile automatically
                   - Added `tests/local-profile.test.js` regression coverage
2026-04-29 02:10 — `מושגים נטו` concept sprint shipped:
                   - Added new top tab for pure concept checks with quick risky, medium and long diagnostic routes
                   - Every answer flows through `applyAnswer`, so scores, weak concepts and mastery levels update the same Knowledge Trainer profile
                   - Quick/medium routes can apply XP penalties on failure; pass routes grant large XP bonuses; XP never drops below 0
                   - Added `tests/concept-sprint.test.js` regression coverage
2026-04-29 03:05 — XP Economy + Experience Store master plan added:
                   - Created `XP_REWARD_STORE_MASTER_PLAN.md`
                   - Added Phase 8 with 54 tasks: 100 XP levels, coins, store, museum tickets, locked experiences and anti-cheat gates
                   - Clarified that store purchases never buy mastery, grades or exam-critical content
2026-04-29 03:20 — XP Economy Core v1 shipped:
                   - Existing `awardXP` now routes through `awardLearningReward`
                   - Added Coins, reward log, 100-level non-linear XP model and compact sidebar widget
                   - Added achievement rewards: +25 XP and +8 coins per new achievement
                   - Added `tests/xp-economy.test.js`
2026-04-29 03:35 — Reward Store MVP shipped:
                   - Added `🛒 חנות` top tab and local store view
                   - Added deterministic catalog for museum tickets, challenge rooms, learning tools and cosmetics
                   - Purchases spend local Coins, persist per learner profile and never affect grades/mastery
                   - Added `tests/reward-store.test.js`
2026-04-29 03:55 — Museum ticket gates wired:
                   - Added locked/open status to museum wing nav and wing cards
                   - Locked non-essential museum experiences: languages, electricity/bit stack and React/Full-Stack evolution
                   - Locked screens route to the store; exam-critical course explanations remain free in lessons and concept cards
                   - Expanded `tests/reward-store.test.js` for ticket gates
2026-04-29 04:05 — Duplicate reward hardening:
                   - Reward IDs no longer include timestamps, so question/concept rewards are stable
                   - `awardLearningReward` blocks duplicate positive XP/coin rewards for the same source + concept/question
                   - Legacy XP without concept/question metadata remains backward-compatible
                   - Expanded `tests/xp-economy.test.js`
2026-04-29 04:15 — Economy export/import shipped:
                   - Progress export upgraded to v2 with local profile metadata
                   - Export/import now includes XP, Coins, lifetime totals, reward log and store purchases
                   - Scores/proficiency export reads the active profile scope
                   - Added `tests/progress-export.test.js`
2026-04-29 04:25 — XP detail panel shipped:
                   - Clicking the XP widget opens a panel with level, band, XP, coins and progress
                   - Shows today's reward totals and recent reward sources
                   - Recommends a next action based on weak concept scores
                   - Explains that level 100 requires real mastery, not XP alone
2026-04-29 04:35 — Forward improvement plan added:
                   - Added Phase 9: Exam Intelligence + Reliability Hardening
                   - New priorities: Exam Cockpit, deep question ladder, full portal smoke, weakness repair and post-exam productization
                   - Plan keeps Finish Line 1 and exam readiness above store/museum/community expansion
2026-04-29 04:50 — No-repeat question routing shipped:
                   - Answered question identities now guide curated MC, Code Trace and Mock Exam selection
                   - Each pool prefers unanswered questions and only falls back to repeats after exhaustion
                   - Selection prefers a harder challenge based on the learner's max answered challenge per concept
                   - Added regression coverage in `tests/question-hardening.test.js`
2026-04-29 04:58 — Same-concept hard ladder shipped:
                   - After a correct trainer answer, "שאלה הבאה" first tries the same concept again
                   - The next same-concept question uses the no-repeat/harder selector
                   - If that concept is exhausted or mastered, the trainer falls back to the regular adaptive picker
2026-04-29 05:08 — Wrong-answer recovery route shipped:
                   - After a wrong trainer answer, the next action routes to a prerequisite rewind when available
                   - Recovery questions are attached as adaptive retest items so outcomes are logged
                   - Mistake feedback now states the next recovery step before returning to the hard challenge
2026-04-29 05:18 — Per-answer explanation bundle shipped:
                   - Added one reusable answer explanation block: answer, why, deep explanation, option rationales and memory association
                   - Wired the block into trainer, Code Trace completion, concept sprint and inline concept-card quizzes
                   - Regression coverage now checks that every route uses the shared explanation bundle
2026-04-29 05:28 — Mastery proof gate hardened:
                   - Level 7 alone is not 100; mastery requires an explicit highest-challenge proof
                   - Highest available challenge now includes MC, Fill, Trace and Bug question pools
                   - Added `tests/mastery-proof-gate.test.js` so the gate cannot regress silently
2026-04-29 05:38 — Code proof gate shipped:
                   - Code-bearing concepts now require a real code proof before mastery
                   - Fill, Trace, Bug Hunt, Mini Build and Codeblock answers can register code proof
                   - Mini Build success now records a proof line and updates the same scoring system
2026-04-29 05:50 — System audit findings added:
                   - Tests/build/readiness/tab-matrix/command-center passed
                   - `validate:strict` is red on 8 ambiguous Fill items; Iron Rules updated to reflect the blocker
                   - Added P-0.4 with remediation queue: 696 quality items, 262 missing one-line definitions, 50/1369 distractor feedback coverage
                   - Finish Line 1 count updated to 96/141; total plan count updated to 358/623
2026-04-29 06:05 — Audit blockers reduced:
                   - Fixed 8 ambiguous Fill items; `npm run validate:strict` is green again
                   - Added conceptKey routing to 70 curated questions; missing routing metadata is now 0
                   - Remediation queue reduced from 696 to 617; question density warning now 447/568
                   - Finish Line 1 count updated to 98/141; total plan count updated to 360/623
2026-04-29 06:12 — Concise definitions gate closed:
                   - Added derived one-line definitions in the loader and explicit definitions for missing advanced terms
                   - `npm run exam:weakest` now reports 0 missing definitions, 0 missing prerequisites, 0 missing hard questions
                   - Finish Line 1 count updated to 99/141; total plan count updated to 361/623
2026-04-29 06:22 — Seeded Fill leakage fixed:
                   - Hardened deterministic seeded-question generator: Fill answers must disappear fully after blanking
                   - Regenerated seeded bank; `review-fill-leakage` dropped from 214 to 0 and blockers remain 0
                   - Question Quality Index now 98.1% warning-free; remediation queue is 392
                   - Finish Line 1 count updated to 100/141; total plan count updated to 362/623
2026-04-29 06:34 — Question remediation queue closed:
                   - Hardened seeded MC generation against duplicate options, near-duplicates, generic wording and length-cue risk
                   - Cleaned remaining curated MC/Fill notes manually
                   - `quality:questions:strict` and `quality:remediation:strict` now report 0 blockers, 0 warnings and 0 notes
                   - Finish Line 1 count updated to 104/141; total plan count updated to 366/623
2026-04-29 06:58 — Exam-week hard/proof gate closed:
                   - Added 11 level-5 Fill/code-proof questions for weakest SVCollege concepts
                   - `exam:weakest` now reports 0 missing questions, hard questions, definitions, prerequisites and code proofs
                   - Fixed Vitest `--localstorage-file` warning at source in `lib/rng.js` / `lib/rng.ts`
                   - Finish Line 1 count updated to 106/142; total plan count updated to 368/624
2026-04-29 07:12 — Focus/mobile smoke verified:
                   - Playwright desktop smoke: focus controls, side tree, XP sidebar placement and console all clean
                   - Playwright mobile smoke at 390×844: focus mode and slide-in tree visible; 0 console errors/warnings
                   - Finish Line 1 count updated to 107/142; total plan count updated to 369/624
2026-04-29 07:25 — Question-density expansion pass:
                   - Seeded generator now uses `simpleExplanation` bridge lessons and multiple deterministic Fill blanks per code example
                   - Total MC/Fill bank increased to 2,760; `quality:questions:strict` remains 100% warning-free
                   - `validate:strict` density warnings reduced from 377/568 to 71/568; remaining work is manual/special-case coverage
2026-04-29 07:38 — Per-distractor feedback gate closed:
                   - Added deterministic inline option feedback for curated and seeded MC questions
                   - `coverage:features:strict` now reports Per-Distractor Feedback `1665/1665` and all feature modules `24/24 done`
                   - Finish Line 1 count updated to 108/142; total plan count updated to 370/624
2026-04-29 07:55 — Question-density gate closed:
                   - Added targeted curated Fill for the last density gaps: index values, Radix primitives, and Next.js file-system routing
                   - Regenerated seeded bank: `1704 MC + 1136 Fill = 2840`, `validate:strict` reports `0/568` concepts needing more questions
                   - Re-ran gates: question quality/remediation/QA, seeded+distractor audits, SVCollege readiness/tab-matrix/command-center, exam weakest, tests and build all green
                   - Finish Line 1 count updated to 109/142; Phase 9 updated to 7/40; total plan count updated to 372/624
2026-04-29 08:10 — Exam flow simulations shipped:
                   - Added `scripts/simulate_exam_learning_flows.js` + `tests/exam-flow-simulation.test.js`
                   - `npm run exam:flows:strict` passes: 2,840-question bank, 0 blockers, no-repeat/harder-after-correct/wrong-answer-repair all green
                   - `npm test -- --run tests/exam-flow-simulation.test.js tests/question-hardening.test.js` passes 9/9
                   - Finish Line 1 count updated to 112/142; total plan count updated to 375/624
2026-04-29 08:25 — Mobile all-tabs + focus smoke documented:
                   - Playwright mobile viewport `390×844`: `22/22` top tabs opened with populated `main`, active context tree, `0` console errors/warnings
                   - Focus mode smoke: `body.learning-focus-mode`, top tabs hidden, central learning space not consumed by XP/status chrome
                   - Updated `SVCOLLEGE_BROWSER_SMOKE.md`; P-0.0.8, P-0.3.7 and P-0.3.8 closed
                   - Finish Line 1 count updated to 115/142; total plan count updated to 378/624
2026-04-29 08:35 — Exam profile backup hardened:
                   - Export/import now includes scores/proof state, proficiency, answered question IDs, weakness agent state, confidence/confusion state, XP, coins, rewardLog and purchases
                   - `npm test -- --run tests/progress-export.test.js tests/local-profile.test.js` passes 6/6
                   - Finish Line 1 count updated to 116/142; total plan count updated to 379/624
2026-04-29 08:45 — Final weak-concept cram sheet shipped:
                   - Added `scripts/build_exam_cram_sheet.js` and generated `EXAM_FINAL_CRAM_SHEET.md`
                   - Sheet is built only from `exam:weakest` top 10, with one-line definitions and relevant comparison tables
                   - `npm test -- --run tests/exam-cram-sheet.test.js tests/exam-weakest-concepts.test.js` passes 6/6
                   - Finish Line 1 count updated to 117/142; total plan count updated to 380/624
2026-04-29 09:00 — Deterministic mock exam variants verified:
                   - Added `scripts/report_mock_exam_variants.js` and generated `MOCK_EXAM_VARIANTS_REPORT.md`
                   - `npm run exam:mock-variants:strict` passes: 3 variants, 55 unique questions each, 15/15 SVCollege modules covered in every variant
                   - `npm test -- --run tests/mock-exam-variants.test.js tests/mock-exam-svcollege.test.js` passes 5/5
                   - Finish Line 1 count updated to 118/142; Phase 9 updated to 8/40; total plan count updated to 382/624
2026-04-29 09:15 — Exam Edition RC frozen:
                   - Added `EXAM_EDITION_RC.md`
                   - Final gate sweep passed: `npm test -- --run` 59 files / 299 tests, build, validate, quality, QA, readiness, tab matrix, command center, feature coverage, exam weakest, exam flows and mock variants
                   - Browser evidence: desktop + mobile all-tabs smoke documented, focus mode clear
                   - Finish Line 1 count updated to 120/142; total plan count updated to 384/624
2026-04-29 09:25 — Exam-week sprint remaining gates closed:
                   - `validate:strict` confirms `0/568` concepts need more questions
                   - `exam:weakest` confirms `withoutHardQuestion: 0` and `withoutDefinition: 0`
                   - `npm test -- --run tests/concise-definitions.test.js tests/exam-weakest-concepts.test.js tests/question-qa-checklist.test.js` passes 9/9
                   - Finish Line 1 count updated to 122/142; total plan count updated to 386/624
2026-04-29 09:35 — Mock exam review path shipped:
                   - Result screen now shows weak SVCollege modules and a recommended path: prerequisite rewind → failed concept → trainer
                   - `npm test -- --run tests/mock-exam-svcollege.test.js tests/mock-exam-variants.test.js` passes 6/6
                   - Finish Line 1 count updated to 123/142; total plan count updated to 387/624
2026-04-29 09:50 — Student/teacher readiness export shipped:
                   - Added `scripts/export_svcollege_student_summary.js`, `SVCOLLEGE_STUDENT_READINESS_EXPORT.md` and JSON export
                   - `npm run svcollege:student-export:strict` passes with 0 blockers, 15/15 modules, 3 mock variants and flow simulation pass
                   - `npm test -- --run tests/svcollege-student-export.test.js tests/svcollege-readiness-report.test.js tests/svcollege-tab-matrix.test.js` passes 9/9
                   - Finish Line 1 count updated to 124/142; total plan count updated to 388/624
2026-04-29 14:58 — SVCollege Command Center UI shipped:
                   - Added a dashboard section inside the `יישור SVCollege` tab with readiness, release blockers, tab-health, browser-smoke status, weak modules and next actions
                   - Updated command-center evidence from mobile `pending` to desktop+mobile `pass`
                   - Added `tests/svcollege-command-center-ui.test.js`
                   - Re-ran command-center tests, strict command-center gate and build
                   - Finish Line 1 count updated to 125/142; total plan count updated to 389/624
2026-04-29 15:06 — Prerequisite panel smoke closed:
                   - Browser smoke verified prerequisite panels in lesson quiz, Knowledge Trainer and Mock Exam
                   - Added `tests/question-prereq-panel-smoke.test.js`
                   - Updated `SVCOLLEGE_BROWSER_SMOKE.md`
                   - Finish Line 1 count updated to 126/142; total plan count updated to 390/624
2026-04-29 15:13 — SVCollege prerequisite gate hardened:
                   - `qa:questions:strict` now fails if the SVCollege prerequisite gate is not ready
                   - Current gate: 259 SVCollege questions checked, 257 requiring aid, 0 issues, ready:true
                   - Added regression coverage in `tests/question-qa-checklist.test.js`
                   - Finish Line 1 count updated to 127/142; total plan count updated to 391/624
2026-04-29 15:16 — Teacher weekly progress export fixed:
                   - `SVCOLLEGE_STUDENT_READINESS_EXPORT.md/json` now includes weekly-progress scope, 100% readiness, 225/225 tab cells and teacher review agenda
                   - Fixed undefined readiness/tab coverage fields in the export
                   - `npm run svcollege:student-export:strict` passes
                   - Finish Line 1 count updated to 128/142; total plan count updated to 392/624
2026-04-29 15:32 — Portal-wide one-line + comparison aid shipped:
                   - Added a shared decision-aid panel under the page title for all major tabs
                   - Every tab now exposes concise "מה זה" rows with click-to-expand details and a "מתי להשתמש במה" table
                   - Added `tests/portal-decision-aid.test.js`
                   - Finish Line 1 count updated to 129/143; total plan count updated to 393/625
2026-04-29 20:58 — Phase 9 completion gates closed:
                   - Added Metrics Dashboard to Learning Evidence: D1/D7 retention, mastery velocity, exam score uplift and question quality index
                   - Added `metrics:dashboard:strict` gate and generated metrics dashboard reports from local evidence/QA sources only
                   - Added `PRICING_PACKAGING_PLAN.md` and `pricing:packaging:strict`; required exam learning stays unlocked and unvalidated prices remain `unknown/unavailable`
                   - Phase 9 count updated to 40/40; total plan count updated to 476/625
2026-04-29 22:42 — Lesson toolbar density hotfix:
                   - Question Bank panel no longer renders/open by default; it appears only after the learner clicks `בנק שאלות`
                   - Question Bank button moved after the display mode buttons in DOM, placing it visually to the left of `השוואות` in RTL
                   - Lesson toolbar spacing tightened so the top controls consume less vertical learning space
2026-04-29 22:49 — Concept step tabs moved left:
                   - `תרשים`, `דימוי מהחיים`, `קוד והרצה`, `העמקה`, `המשך` ו-`שאלות` עברו מטורי accordion בגוף הכרטיס לטאבים נפרדים בסרגל השמאלי
                   - גוף המושג מציג רק טאב פעיל אחד בכל פעם כדי לחסוך גובה ולתת יותר מקום לחומר עצמו
                   - כפתור `הצג תרשים` הוסר מרשימת הפעולות כי פתיחת התרשים נעשית עכשיו דרך טאב שמאלי ייעודי
2026-04-29 22:56 — P5.3.3 learn-this-first aid enforced:
                   - Bug Hunt and Mini Build cards now render `דרישות קדם לשאלה` with concept navigation and `נתקעתי` feedback
                   - `question-prereq-panel-smoke` now guards quiz/trainer/trace/guide/mock/inline/bug-hunt/mini-build modes
                   - Phase 5 count updated to 23/39; total plan count updated to 477/625
2026-04-29 23:00 — P5.3.4/P5.3.5 question coverage targets closed:
                   - Added `questions:coverage-targets:strict` plus `QUESTION_COVERAGE_TARGETS.md/json`
                   - Live bank coverage is `568/568` concepts with ≥3 MC and `0` MC gaps; Fill coverage is `0` gaps for codeExample concepts
                   - The report keeps source mix explicit: seeded items are validated live-bank coverage, while hand-curated promotion remains tracked as P10.5.9
                   - Phase 5 count updated to 25/39; Phase 10 total updated to 0/41; total plan count updated to 479/626
2026-04-29 23:02 — P5.3.6/P5.3.7/P5.3.8 per-distractor feedback closed:
                   - `coverage:features:strict` reports Per-Distractor Feedback `1704/1704` MC questions and `7016` option explanations
                   - This exceeds the 25%, 50% and 100% staged targets, so all three staged tasks are closed from existing gate evidence
                   - Phase 5 count updated to 28/39; total plan count updated to 482/626
2026-04-29 23:06 — P5.4.1 content schema contract closed:
                   - Added machine-readable contract at `src/core/content-schema-contract.js`
                   - Added `CONTENT_SCHEMA_CONTRACT.md`, `content:schema-contract:strict`, and `CONTENT_SCHEMA_CONTRACT_REPORT.md/json`
                   - Contract covers Lesson, Concept, MCQuestion, FillQuestion, TraceQuestion, BugQuestion and BuildQuestion with strict gate wiring
                   - Phase 5 count updated to 29/39; total plan count updated to 483/626
2026-04-29 23:10 — P5.4.2 runtime loader validation closed:
                   - `content-loader.js` now builds `window.LUMEN_CONTENT_VALIDATION` after lesson/practice assembly
                   - Runtime checks cover lesson IDs, concept names/difficulty, conceptKey routing, MC/Fill/Trace/Bug/Build core fields
                   - A soft `content-validation-panel` appears only when issues exist, without blocking portal boot
                   - Content-loader cache key bumped to `content-validation-v1`; service worker cache bumped to `lumen-v2.4.71`
                   - Phase 5 count updated to 30/39; total plan count updated to 484/626
2026-04-29 23:13 — P5.4.3 content variant rendering closed:
                   - Added `levelText(...)` so concept levels render from both object and array forms
                   - Added `normalizeExtras(...)` so extras panels accept object form and typed array rows
                   - Added `tests/content-variant-rendering.test.js`; `node --check app.js`, targeted tests and build pass
                   - Phase 5 count updated to 31/39; total plan count updated to 485/626
2026-04-29 23:16 — P5.4.4 top-level smoke closed:
                   - `svcollege:top-tabs:strict` passes with `22/22` tabs and `0` console errors
                   - `svcollege:critical-flows:strict` and `svcollege:full-portal-smoke:strict` now pass after updating the static flow gate for `renderBugHuntPanel(lesson, concept)` and `renderMiniBuildPanel(lesson, concept)`
                   - Phase 5 count updated to 32/39; total plan count updated to 486/626
2026-04-29 23:17 — P5.4.5 console-error gate closed:
                   - `svcollege:console-gate:strict` passes with `5/5` checks, `0` failures and `6` critical flows
                   - Gate verifies desktop console evidence, mobile console evidence, critical-flow readiness and package script wiring
                   - Phase 5 count updated to 33/39; total plan count updated to 487/626
2026-04-29 23:18 — P5.4.6 service-worker stale asset regression closed:
                   - `service-worker-cache.test.js` locks `lumen-v2.4.71`, versioned app/style/content-loader assets and network-first reload for versioned code
                   - `svcollege:pwa-offline:strict` passes with `170/170` cached assets and `13/13` strategy checks
                   - Phase 5 count updated to 34/39; total plan count updated to 488/626
2026-04-29 23:24 — P5.4.7 feature health diagnostics closed:
                   - SVCollege Command Center now exposes live feature-health diagnostics for runtime schema validation, live question bank, tab matrix, browser smoke, and promotion gate.
                   - Added deterministic UI/tests without Math.random and kept diagnostics inside the existing Command Center to avoid new menu duplication.
                   - Verified: `node --check app.js`, `npm test -- --run tests/svcollege-command-center-ui.test.js`, `npm run svcollege:command-center:strict`
                   - Phase 5 count updated to 35/39; total plan count updated to 489/626
2026-04-29 23:28 — P5.4.8 local feature-error telemetry closed:
                   - Extended local learning evidence with `feature_error` events, deterministic session-based `errorsPer1000Sessions`, and no raw error messages or PII.
                   - Command Center feature-health diagnostics now shows feature-error telemetry alongside schema, question bank, tab matrix, smoke and promotion gates.
                   - Verified: `node --check app.js`, `npm test -- --run tests/learning-evidence.test.js tests/svcollege-command-center-ui.test.js`, `npm run svcollege:command-center:strict`
                   - Phase 5 count updated to 36/39; total plan count updated to 490/626
2026-04-29 23:31 — P5.5.1/P5.5.2/P5.5.3 90-day roadmap waves closed:
                   - Added `roadmap:90-day` gate and generated `ROADMAP_90_DAY_WAVES.md/json`.
                   - Wave 1 verifies FSRS/SRS, Gap Matrix, Pathways, D1/D7 retention baseline and metrics dashboard without fabricated outcomes.
                   - Wave 2 verifies AI Tutor Alpha, Sync Alpha, Pair-Match and Bug Quest hardening from existing gates/coverage evidence.
                   - Wave 3 verifies Teacher Lite UI, teacher core modules, Supabase schema and tests for class progress + heatmap.
                   - Verified: `node --check scripts/report_90_day_roadmap_waves.js`, `npm run roadmap:90-day:strict`, `npm test -- --run tests/roadmap-90-day-waves.test.js`, `npm run roadmap:90-day:write`
                   - Phase 5 count updated to 39/39; total plan count updated to 493/626
2026-04-29 23:34 — P6.3.1 activity coverage gap quantified:
                   - Added `questions:activity-coverage` report and generated `QUESTION_ACTIVITY_COVERAGE_REPORT.md/json`.
                   - MC/Fill coverage remains green from `QUESTION_COVERAGE_TARGETS`, but Trace/Build/Bug activity coverage is now 337/568 concepts after authoring batch 16; 231 gaps remain.
                   - P6.3.1 stays open; no generated/backfilled activity items were invented.
                   - Verified: `node --check scripts/report_question_activity_coverage.js`, `npm run questions:activity-coverage:write`, `npm test -- --run tests/question-activity-coverage.test.js`
2026-04-29 23:40 — P6.3.5 guided builds closed:
                   - Added `data/guided_builds.js` with four from-zero-to-feature tracks: React Task Filter, Node Notes REST API, Next.js Dashboard Route, and TypeScript Model + Guard.
                   - Capstones tab now renders guided builds, links their prerequisite concepts, and exposes them in the context tree.
                   - Cache bumped to `lumen-v2.4.72` and `data/guided_builds.js?v=guided-builds-v1` is precached.
                   - Verified: `node --check app.js`, `node --check data/guided_builds.js`, `npm test -- --run tests/capstones.test.js tests/service-worker-cache.test.js`, `npm run svcollege:pwa-offline:strict`
                   - Phase 6 count updated to 20/36; total plan count updated to 494/626
2026-04-29 23:46 — P6.3.6 interview-prep mode closed:
                   - Added `data/interview_prep.js` with junior frontend interview questions mapped to real concept keys across JS, React, DOM, async, backend, Next.js, TypeScript, security and CSS.
                   - Guide tab now includes a collapsible Interview Prep Mode with answer expectations, follow-up prompts and clickable concept links.
                   - Cache bumped to `lumen-v2.4.73` and `data/interview_prep.js?v=interview-prep-v1` is precached.
                   - Verified: `node --check app.js`, `node --check data/interview_prep.js`, `npm test -- --run tests/interview-prep.test.js tests/service-worker-cache.test.js`, `npm run svcollege:pwa-offline:strict`
                   - Phase 6 count updated to 21/36; total plan count updated to 495/626
2026-04-29 23:58 — P6.4.1-P6.4.5 Content Studio workflow closed:
                   - Added `src/core/content-studio.js` with content item statuses, deterministic stable-hash IDs, review queue builder and field-level revision diff.
                   - Learning Evidence tab now includes Content Studio cards, review queue rows and side-by-side diff slot based only on QA warnings, anonymized learner mistakes and teacher feedback.
                   - P6.4.6 remains open for museum evidence fields; technical claim evidence is supported in the new core module, but museum editing is deferred by the Finish Line 1 boundary.
                   - Verified: `node --check app.js`, `npm test -- --run tests/content-studio.test.js tests/learning-evidence.test.js`
                   - Phase 6 count updated to 26/36; total plan count updated to 500/626
2026-04-29 23:59 — P6.4.7 NotebookLM/video asset tracker closed:
                   - Added `scripts/report_video_asset_tracker.js` and `video:asset-tracker:*` scripts.
                   - Generated `VIDEO_ASSET_TRACKER_REPORT.md/json` from real `data/concept_videos.js` assets and `NOTEBOOKLM_CONCEPT_CLIPS.md`.
                   - Tracker records script status, asset status, temporary fallback link, review status and replacement date; unknown replacement dates stay `unknown/unavailable`.
                   - Verified: `node --check scripts/report_video_asset_tracker.js`, `npm run video:asset-tracker:write`, `npm run video:asset-tracker:strict`, `npm test -- --run tests/video-asset-tracker.test.js`
                   - Phase 6 count updated to 27/36; total plan count updated to 501/626
2026-04-29 23:59 — P6.5.1-P6.5.3 pilot readiness and support flow closed:
                   - Added `PILOT_READINESS_PLAN.md` for a 10-30 student protocol with D0 baseline, D1/D7 retention, two-week usage and D14 final test.
                   - Added `TEACHER_ONBOARDING_KIT.md` with class setup, assignment recipes, heatmap interpretation and support workflow.
                   - Added `src/core/support-report.js` and an in-app support modal from the chrome control menu; payload includes route, tab, lesson, concept, viewport, app/cache versions and optional user-attached screenshot.
                   - Added `scripts/report_pilot_readiness.js`, generated `PILOT_READINESS_REPORT.md/json`, and wired `pilot:readiness:*` scripts.
                   - Verified: `node --check app.js`, `node --check scripts/report_pilot_readiness.js`, `npm run pilot:readiness:write`, `npm run pilot:readiness:strict`, `npm test -- --run tests/support-report.test.js tests/pilot-readiness.test.js`
                   - Phase 6 count updated to 30/36; total plan count updated to 504/626
```

---

## 🔍 AUDIT-FIX Tasks (from AUDIT_2026-04-28.md)

> Honest backlog of inflated/missing items found during audit.
> Each task closes a gap between claim and reality.

### Content gaps (close inflated counts)
- [V] AUDIT-FIX-1 — Add 8 more anti-patterns to reach 22 target (now 22)
- [V] AUDIT-FIX-2 — Add 12 more war stories to reach 30 target (now 31)
- [V] AUDIT-FIX-3 — Add 13 more Mini Builds to reach 21 target (now 21)
- [V] AUDIT-FIX-4 — Code Trace for lessons 11-20 + closures (50 new traces; total trace bank 85)
- [V] AUDIT-FIX-5 — Add option-feedback to top 50 most-used MCs (now 50)

### Verification debt
- [V] AUDIT-FIX-6 — Re-verify all "Verified in browser" claims with explicit tests
  - [V] per-card refresh (P1.1.2.3) — Report Weak updates Array card in place
  - [V] aria-labels rendered (P1.2.1.8) — Playwright accessibility snapshot shows names
  - [V] theme cycles (P1.2.4.4) — fixed floating-button overlap; auto → light → dark → auto verified

### Partial features → make complete
- [V] AUDIT-FIX-7 — Time Machine full review experience (not just history-jump button)

### Major features NOT DONE (12 Creative Methods + spec ideas)
- [V] AUDIT-FIX-8 — Concept Comic system (visual storytelling)
- [V] AUDIT-FIX-9 — Stage-Zero broken examples (broken-first-then-fix flow)
- [V] AUDIT-FIX-10 — 250 metaphors (5 × 50 core concepts)
- [V] AUDIT-FIX-11 — Concept-as-Place memory palace (SVG rooms)
- [V] AUDIT-FIX-12 — Problem-First Discovery (broken-app templates)
- [V] AUDIT-FIX-13 — 10 Animated Concept videos (offline SVG/CSS concept clips)
- [V] AUDIT-FIX-14 — Real-Object Visual Aids (50 local deterministic object aids)
- [V] AUDIT-FIX-15 — Bug Hunt Quests (5 quests × 5 bugs narrative)
- [V] AUDIT-FIX-16 — Themed Scenarios (5 scenarios × 30 concepts)
- [V] AUDIT-FIX-17 — Counterfactual examples (30 concepts)
- [V] AUDIT-FIX-18 — Streaks tracking + 🔥 widget
- [V] AUDIT-FIX-19 — 60-second wrap-up at lesson end
- [V] AUDIT-FIX-20 — Achievements + XP system (30/30 initial)
- [V] AUDIT-FIX-21 — Pair-Match drag-and-drop game
- [V] AUDIT-FIX-22 — Prerequisite Graph
- [V] AUDIT-FIX-23 — Pathways toggle (grandma/parent/technical)
- [V] AUDIT-FIX-24 — Gap Matrix dashboard tab
- [V] AUDIT-FIX-25 — Upgrade SM-2 → FSRS-4
- [V] AUDIT-FIX-26 — AI Tutor (demo mode + Supabase edge function skeleton)
- [~] AUDIT-FIX-27 — Cross-device Sync (export/import + Supabase progress table; auth/live sync pending)
- [~] AUDIT-FIX-28 — Vite migration (build/dev/preview working; full app.js module extraction pending)
- [~] AUDIT-FIX-29 — TypeScript migration (bootstrap + lib ports + core scoring module done; views pending)
- [V] AUDIT-FIX-30 — SRS Flashcards UI tab
- [V] AUDIT-FIX-31 — Concept Map graph visualization (offline-safe SVG graph)

**AUDIT-FIX Total: 28/31** — 3 partial; remaining major gaps: full app.js extraction + auth/live sync.

---

**Note:** המסמך מתעדכן בכל commit. ראה Phase X DoD לקריטריונים מדויקים לסיום phase.
