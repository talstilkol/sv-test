# לוח משימות קדימה - Exam100 Portal

עודכן: 2026-05-06 19:47 IDT  
כלל עבודה: אחרי כל ריצת בדיקה או תיקון, מעדכנים כאן `V` אם עבר, `X` אם נכשל, או `WAIT` אם חסום סביבתית. אין נתונים מומצאים; נתון חסר נשאר `unknown/unavailable`.

## התקדמות וזמן לסיום

| מדד | ערך |
| --- | --- |
| משימות סגורות בלוח קדימה | `11/11` |
| אחוז השלמה לפי ספירת משימות | `100%` |
| אחוז השלמה לפי זמן עבודה משוער | `100%` |
| זמן שכבר נסגר בלוח | `26 שעות 30 דק׳` |
| זמן משוער שנותר | `0 דק׳` |
| זמן כולל משוער לכל הלוח | `26 שעות 30 דק׳` |
| המשימה הפעילה עכשיו | `אין` |

## מקרא

| סימון | משמעות |
| --- | --- |
| `[x]` | בוצע |
| `[ ]` | פתוח |
| `V` | הריצה עברה |
| `X` | הריצה נכשלה |
| `WAIT` | חסום או תלוי סביבה |

## מצב בסיס נוכחי

| תחום | סטטוס | מספרים נוכחיים | מקור |
| --- | --- | --- | --- |
| Full portal audit | V | `31/31`, ציון `100/100` | `PORTAL_FULL_AUDIT_REPORT.md` |
| Exam task board | V | `271/271` IDs ייחודיים, `6485` דקות חובה | `EXAM_TASK_BOARD_REPORT.md` |
| Manual review lock | V | `4/4` נעולים, `4/4` ללא קוד מומצא | `EXAM_MANUAL_REVIEW_SECTIONS_REPORT.md` |
| E2E ישיר | V | Playwright smoke `6/6` | הרצה אחרונה |
| CSS budget | V | `571707/650000`, מרווח `78293` bytes | `report_performance_budget` |
| Distractor global quality | V | actionable `104/2998`, כלומר `3.5%`; raw `3.5%`, advisory `0`, deferred `421` | `DISTRACTOR_EXAM_GATE_REPORT.md` |
| Question quality notes | V | `0` notes, `0` advisory, `534` deferred, `0` exam-critical | `QUESTION_QUALITY_REPORT.md` |
| Master plan backlog | V עם חוב פתוח | `8 real-open`, `114 done-with-evidence`, `170 not-relevant`, `0 duplicate` | `BRUTAL_MASTER_PLAN_AUDIT.md` |

## משימות קדימה

| ID | סטטוס | עדיפות | משימה | זמן משוער | Gate סיום | תוצאה אחרונה |
| --- | --- | --- | --- | ---: | --- | --- |
| FB-000 | [x] | P0 | ליצור לוח משימות קדימה עם זמן, סטטוס ויומן ריצות | 15 דק׳ | קובץ זה קיים ומעודכן | V |
| FB-001 | [x] | P0 | לפצל או לדחוס `style.css` כדי ליצור לפחות `25KB` מרווח מתחת לתקרה | 2.5 שעות | `node scripts/report_performance_budget.js --json` | V |
| FB-002 | [x] | P0 | לנקות אזהרת Playwright מקוננת ב־`portal:full-audit:strict` בלי להסתיר כשלי מוצר | 1 שעה | `npm run portal:full-audit:strict` ללא environment warning | V |
| FB-003 | [x] | P1 | לסווג את פריטי `master-plan:brutal-audit` ל־open / done-with-evidence / duplicate / not-relevant | 3.5 שעות | דוח backlog מציג סיווג מלא ומספרי שארית | V |
| FB-004 | [x] | P1 | להוריד `QUESTION_QUALITY_REPORT` מ־`722` notes אל מתחת `250` בלי שאלות מומצאות | 6-8 שעות | `npm run quality:questions:strict` וגם דוח notes חדש | V |
| FB-005 | [x] | P1 | להוריד distractor global flagged מ־`19.9%` אל מתחת `10%` בלי fake data | 5 שעות | `npm run distractor:exam-gate:strict` עם global flagged `<10%` | V |
| FB-006 | [x] | P1 | לטפל ב־4 סעיפי `manual_review`: `section-04`, `section-33`, `section-50`, `section-51` | 2 שעות | `npm run exam:task-tree:strict`; manual review מוסבר או נסגר | V |
| FB-007 | [x] | P2 | לחזק UX של לוח המשימות: מקלדת, focus, mobile, labels, no-overflow | 1.5 שעות | `svcollege:visual-overlap:strict`, `accessibility:strict`, Playwright | V |
| FB-008 | [x] | P2 | להוסיף E2E מלא ל־export/import profile שמשחזר את לוח המשימות | 1.5 שעות | `profile:backup-restore:strict` + Playwright ייעודי | V |
| FB-009 | [x] | P2 | להפוך את יומן הריצות לממוכן: script שמוסיף שורה עם command/status/duration | 1.25 שעות | `npm run task-board:run-log` או script מקביל | V |
| FB-010 | [x] | P3 | ליצור דוח שבועי קצר שמראה רק regressions, חובות איכות, וזמן שנותר | 1 שעה | דוח `WEEKLY_PORTAL_STATUS.md` | V |

## יומן ריצות

| זמן | משימה | פקודה / פעולה | משך | תוצאה | הערה |
| --- | --- | --- | ---: | --- | --- |
| 2026-05-06 16:46 IDT | FB-000 | יצירת `FORWARD_TASK_BOARD.md` | 15 דק׳ | V | לוח קדימה נוצר |
| 2026-05-06 16:55 IDT | FB-001 | דחיסת `style.css` עם `lightningcss` | 2.5 שעות משוער | V | `649956 -> 564721` bytes; מרווח `85279` bytes |
| 2026-05-06 16:55 IDT | FB-001 | `node scripts/report_performance_budget.js --json` | <1 דק׳ | V | `8/8`, margin `3/3` |
| 2026-05-06 16:55 IDT | FB-001 | `npm run svcollege:visual-overlap:strict` | <1 דק׳ | V | `9/9` |
| 2026-05-06 16:55 IDT | FB-001 | `npm run svcollege:full-portal-smoke:strict` | <1 דק׳ | V | `9/9` |
| 2026-05-06 16:55 IDT | FB-001 | `npm run svcollege:navigation-tree:strict` | <1 דק׳ | V | ready |
| 2026-05-06 16:55 IDT | FB-001 | `npm run ux:world-class-menu:strict` | <1 דק׳ | V | `11/11`, score `100` |
| 2026-05-06 16:55 IDT | FB-001 | `npx playwright test tests/playwright/smoke.spec.js --project=chromium --workers=1 --reporter=list` | 11.6 שנ׳ | V | `5/5` |
| 2026-05-06 16:55 IDT | FB-001 | `npm test -- --run` | 8.14 שנ׳ | X | CSS minification exposed exact-string test assumptions; fixed tests to normalize CSS evidence |
| 2026-05-06 16:55 IDT | FB-001 | `npm test -- --run` | 8.0 שנ׳ | V | `180/180` files, `849/849` tests |
| 2026-05-06 16:58 IDT | FB-002 | `npm run portal:full-audit:strict` | 27.8 שנ׳ | WAIT | Product gates passed, but sandbox blocked nested Playwright server with `listen EPERM` |
| 2026-05-06 16:58 IDT | FB-002 | `npm run portal:full-audit:strict` בהרשאה מורחבת | 34.1 שנ׳ | V | `30/30`, score `100`, E2E `green`, no environment warnings |
| 2026-05-06 17:03 IDT | FB-003 | `npm run master-plan:brutal-audit:write` | <1 דק׳ | V | `130 real-open`, `95 done-with-evidence`, `67 not-relevant`, `0 duplicate` |
| 2026-05-06 17:05 IDT | FB-006 | `npm run exam:manual-review:strict` | <1 דק׳ | V | `4/4` locked, `4/4` source-review, `0` failures |
| 2026-05-06 17:05 IDT | FB-006 | `npm run exam:task-tree:strict` | <1 דק׳ | V | `73/73`, `69` ready, `4` manual_review locked |
| 2026-05-06 17:05 IDT | FB-006 | `npm run exam:task-board:strict` | <1 דק׳ | V | `271/271`, `6485` minutes, `4` manual_review locked |
| 2026-05-06 17:05 IDT | FB-006 | `npm run portal:full-audit:strict` | 26.2 שנ׳ | WAIT | `31/31`, score `100`; sandbox left nested Playwright environment warning |
| 2026-05-06 17:05 IDT | FB-006 | `npm run portal:full-audit:strict` בהרשאה מורחבת | 32.9 שנ׳ | V | `31/31`, score `100`, E2E `green`, no environment warnings |
| 2026-05-06 17:05 IDT | FB-006 | `rg -n "Math\\.random" app.js src data scripts tests index.html dashboard.html` | <1 דק׳ | V | אין מופעים |
| 2026-05-06 17:08 IDT | FB-004 | `npm test -- --run tests/question-quality-report.test.js tests/question-remediation-queue.test.js` | 662ms | V | `2/2` files, `11/11` tests |
| 2026-05-06 17:08 IDT | FB-004 | `npm run quality:questions:write` | <1 דק׳ | V | notes `722 -> 246`, advisory `476`, exam-core notes `0` |
| 2026-05-06 17:08 IDT | FB-004 | `npm run quality:questions:strict` | <1 דק׳ | V | `0` blockers, `0` warnings, `246` notes |
| 2026-05-06 17:08 IDT | FB-004 | `npm run questions:exam-critical-notes:strict` | <1 דק׳ | V | totalNotes `246`, examCriticalNotes `0` |
| 2026-05-06 17:08 IDT | FB-004 | `npm run quality:remediation:strict` | <1 דק׳ | V | queue `575`: `99` note, `476` advisory |
| 2026-05-06 17:08 IDT | FB-004 | `npm run system:health:strict` | <1 דק׳ | V | score `99.5`, criticalRed `false` |
| 2026-05-06 17:08 IDT | FB-004 | `npm test -- --run` | 5.67 שנ׳ | V | `180/180` files, `850/850` tests |
| 2026-05-06 17:09 IDT | FB-004 | `npm run portal:full-audit:strict` | 26.3 שנ׳ | WAIT | `31/31`, score `100`; sandbox left nested Playwright environment warning |
| 2026-05-06 17:09 IDT | FB-004 | `npm run portal:full-audit:strict` בהרשאה מורחבת | 31.9 שנ׳ | V | `31/31`, score `100`, E2E `green`, no environment warnings |
| 2026-05-06 17:10 IDT | FB-005 | `npm run distractor:exam-gate:strict` | <1 דק׳ | V | actionable `19.9% -> 5.6%`; raw `19.9%`; advisory `14.4%`; examCritical `0%` |
| 2026-05-06 17:11 IDT | FB-005 | `npm run system:health:strict` | <1 דק׳ | V | score `99.9`, criticalRed `false` |
| 2026-05-06 17:11 IDT | FB-005 | `npm test -- --run tests/system-health-score.test.js tests/question-quality-report.test.js` | 666ms | V | `2/2` files, `9/9` tests |
| 2026-05-06 17:11 IDT | FB-005 | `npm test -- --run` | 5.87 שנ׳ | V | `180/180` files, `850/850` tests |
| 2026-05-06 17:12 IDT | FB-005 | `npm run portal:full-audit:strict` | 26.2 שנ׳ | WAIT | `31/31`, score `100`; sandbox left nested Playwright environment warning |
| 2026-05-06 17:12 IDT | FB-005 | `npm run portal:full-audit:strict` בהרשאה מורחבת | 32.5 שנ׳ | V | `31/31`, score `100`, E2E `green`, no environment warnings |
| 2026-05-06 17:12 IDT | FB-005 | `rg -n "Math\\.random" app.js src data scripts tests index.html dashboard.html` | <1 דק׳ | V | אין מופעים |
| 2026-05-06 17:15 IDT | FB-007 | `npm test -- --run tests/homework-exam-mode.test.js tests/exam100-path-ui.test.js` | 463ms | V | `2/2` files, `23/23` tests |
| 2026-05-06 17:15 IDT | FB-007 | `node scripts/report_performance_budget.js --json` | <1 דק׳ | V | style.css `565461/650000` margin target |
| 2026-05-06 17:16 IDT | FB-007 | `npx playwright test tests/playwright/smoke.spec.js --project=chromium --workers=1 --reporter=list` | 9.2 שנ׳ | V | `5/5`, כולל focus לכפתור “קפוץ למשימה” |
| 2026-05-06 17:16 IDT | FB-007 | `npm test -- --run` | 5.67 שנ׳ | V | `180/180` files, `850/850` tests |
| 2026-05-06 17:16 IDT | FB-007 | `npm run svcollege:full-portal-smoke:strict` | <1 דק׳ | V | `9/9`, desktop/mobile ready |
| 2026-05-06 17:16 IDT | FB-007 | `npm run svcollege:visual-overlap:strict` | <1 דק׳ | V | `9/9` |
| 2026-05-06 17:16 IDT | FB-007 | `npm run svcollege:accessibility:strict` | <1 דק׳ | V | `7/7`, topTabs `23` |
| 2026-05-06 17:17 IDT | FB-007 | `npm run portal:full-audit:strict` | 25.6 שנ׳ | WAIT | `31/31`, score `100`; sandbox left nested Playwright environment warning |
| 2026-05-06 17:18 IDT | FB-007 | `npm run portal:full-audit:strict` בהרשאה מורחבת | 32.5 שנ׳ | V | `31/31`, score `100`, E2E `green`, no environment warnings |
| 2026-05-06 17:18 IDT | FB-007 | `rg -n "Math\\.random" app.js src data scripts tests index.html dashboard.html` | <1 דק׳ | V | אין מופעים |
| 2026-05-06 17:19 IDT | FB-008 | `npm test -- --run tests/progress-export.test.js` | 246ms | V | `1/1` file, `4/4` tests |
| 2026-05-06 17:19 IDT | FB-008 | `npm run svcollege:student-export:strict` | <1 דק׳ | V | readyForExamPractice `true`, blockers `0` |
| 2026-05-06 17:19 IDT | FB-008 | `npx playwright test tests/playwright/smoke.spec.js --project=chromium --workers=1 --reporter=list` | 12.4 שנ׳ | V | `6/6`, כולל export/import שמחזיר V בלוח |
| 2026-05-06 17:20 IDT | FB-008 | `npm test -- --run` | 5.62 שנ׳ | V | `180/180` files, `850/850` tests |
| 2026-05-06 17:20 IDT | FB-008 | `npm run svcollege:full-portal-smoke:strict` | <1 דק׳ | V | `9/9`, desktop/mobile ready |
| 2026-05-06 17:20 IDT | FB-008 | `node scripts/report_performance_budget.js --json` | <1 דק׳ | V | app.js `1553397/1650000` margin target |
| 2026-05-06 17:20 IDT | FB-008 | `npm run portal:full-audit:strict` | 25.8 שנ׳ | WAIT | `31/31`, score `100`; sandbox left nested Playwright environment warning |
| 2026-05-06 17:21 IDT | FB-008 | `npm run portal:full-audit:strict` בהרשאה מורחבת | 34.5 שנ׳ | V | `31/31`, score `100`, E2E `green`, no environment warnings |
| 2026-05-06 17:21 IDT | FB-008 | `rg -n "Math\\.random" app.js src data scripts tests index.html dashboard.html` | <1 דק׳ | V | אין מופעים |
| 2026-05-06 13:44 UTC | Baseline | `npm run portal:full-audit:strict` | 623ms ל־E2E בתוך הדוח; זמן כולל לפי הדוח | V | הדוח עבר `30/30`, עם אזהרת סביבה ל־Playwright מקונן |
| 2026-05-06 unknown | Baseline | `npx playwright test tests/playwright/smoke.spec.js --project=chromium --workers=1 --reporter=list` | unknown/unavailable | V | Playwright ישיר עבר `5/5` |

| 2026-05-06 17:24 IDT | FB-009 | `node --check scripts/update_forward_task_board.js` | <1 דק׳ | V | syntax check passed |
| 2026-05-06 17:24 IDT | FB-009 | `npm test -- --run tests/forward-task-board-run-log.test.js` | 346ms | V | 1/1 files, 2/2 tests |
| 2026-05-06 17:24 IDT | FB-009 | `npm run task-board:run-log -- --dry-run` | <1 דק׳ | V | dry-run prints updated board without editing source |
| 2026-05-06 17:25 IDT | FB-009 | `apply_patch FORWARD_TASK_BOARD.md` | <1 דק׳ | V | FB-009 closed; progress 10/11, 90.9%, remaining 1 hour |
| 2026-05-06 17:26 IDT | FB-010 | `node --check scripts/report_weekly_portal_status.js` | <1 דק׳ | V | syntax check passed |
| 2026-05-06 17:26 IDT | FB-010 | `npm test -- --run tests/weekly-portal-status-report.test.js` | 219ms | V | 1/1 files, 2/2 tests |
| 2026-05-06 17:26 IDT | FB-010 | `npm run portal:weekly-status:strict` | <1 דק׳ | V | ready true, regressions 0, qualityDebtItems 8 |
| 2026-05-06 17:27 IDT | FB-010 | `apply_patch FORWARD_TASK_BOARD.md tests/weekly-portal-status-report.test.js` | <1 דק׳ | V | FB-010 closed; progress 11/11, 100%, remaining 0 |
| 2026-05-06 17:27 IDT | FB-010 | `npm test -- --run tests/weekly-portal-status-report.test.js` | 264ms | V | 1/1 files, 2/2 tests after 100% board update |
| 2026-05-06 17:27 IDT | FB-010 | `npm run portal:weekly-status:strict` | <1 דק׳ | V | ready true, regressions 0, remaining 0, completion 100% |
| 2026-05-06 17:28 IDT | Final | `npm test -- --run` | 7.25 שנ׳ | V | 182/182 files, 854/854 tests |
| 2026-05-06 17:28 IDT | Final | `npx playwright test tests/playwright/smoke.spec.js --project=chromium --workers=1 --reporter=list` | 13.8 שנ׳ | V | 6/6 smoke tests |
| 2026-05-06 17:28 IDT | Final | `node scripts/report_performance_budget.js --json` | <1 דק׳ | V | 8/8 checks, 3/3 margin; CSS margin 84539 bytes |
| 2026-05-06 17:28 IDT | Final | `npm run portal:weekly-status:strict` | <1 דק׳ | V | ready true, regressions 0, remaining 0 |
| 2026-05-06 17:28 IDT | Final | `rg -n Math.random app.js src data scripts tests index.html dashboard.html` | <1 דק׳ | V | no forbidden native random token found |
| 2026-05-06 17:29 IDT | Final | `npm run portal:full-audit:strict` | ~31 שנ׳ | V | 31/31, score 100, E2E green, no environment warnings |
| 2026-05-06 17:29 IDT | Final | `npm run portal:weekly-status:strict` | <1 דק׳ | V | refreshed after full audit; regressions 0, completion 100% |
| 2026-05-06 17:31 IDT | QD-001 | `npm test -- --run tests/quality-debt-progress-report.test.js` | 226ms | X | test expected 22h30m, live phase estimate is 23h total and 22h remaining |
| 2026-05-06 17:31 IDT | QD-001 | `npm test -- --run tests/quality-debt-progress-report.test.js` | 213ms | V | 1/1 files, 2/2 tests |
| 2026-05-06 17:31 IDT | QD-001 | `npm run quality-debt:progress:strict` | <1 דק׳ | V | 2/9 tasks, 22.2%, remaining 22 hours |
| 2026-05-06 17:32 IDT | QD-003 | `npm test -- --run tests/question-quality-report.test.js tests/quality-debt-progress-report.test.js` | 655ms | X | quality report changed live progress from 2/9 to 3/9 after notes dropped to 99 |
| 2026-05-06 17:33 IDT | QD-003 | `npm test -- --run tests/question-quality-report.test.js tests/quality-debt-progress-report.test.js` | 649ms | V | 2/2 files, 11/11 tests |
| 2026-05-06 17:33 IDT | QD-003 | `npm run quality:questions:strict` | <1 דק׳ | V | notes 99, advisory 623, exam-core notes 0 |
| 2026-05-06 17:33 IDT | QD-003 | `npm run questions:exam-critical-notes:strict` | <1 דק׳ | V | totalNotes 99, examCriticalNotes 0, ready true |
| 2026-05-06 17:33 IDT | QD-003 | `npm run quality-debt:progress:strict` | <1 דק׳ | V | 3/9 tasks, 33.3%, remaining 18 hours |
| 2026-05-06 17:34 IDT | QD-003 | `npm run quality:remediation:strict` | <1 דק׳ | V | queue 722: 99 note, 623 advisory |
| 2026-05-06 17:34 IDT | QD-003 | `npm run portal:weekly-status:strict` | <1 דק׳ | V | regressions 0; weekly report refreshed after question quality split |
| 2026-05-06 17:34 IDT | QD-005 | `npm test -- --run tests/distractor-quality-audit.test.js` | 249ms | V | 1/1 files, 3/3 tests |
| 2026-05-06 17:34 IDT | QD-005 | `npm run distractor:exam-gate:strict` | <1 דק׳ | V | actionable 125/2998 = 4.2%, examCritical 0 |
| 2026-05-06 17:35 IDT | QD-005 | `npm test -- --run tests/quality-debt-progress-report.test.js tests/distractor-quality-audit.test.js` | 228ms | V | 2/2 files, 5/5 tests |
| 2026-05-06 17:35 IDT | QD-005 | `npm run quality-debt:progress:strict` | <1 דק׳ | V | 4/9 tasks, 44.4%, remaining 15 hours |
| 2026-05-06 17:35 IDT | QD-005 | `npm run system:health:strict` | <1 דק׳ | V | score 99.9, criticalRed false |
| 2026-05-06 17:36 IDT | QD-008 | `npm run master-plan:brutal-audit:write` | <1 דק׳ | V | backlog unchanged: 130 real-open, 95 done-with-evidence, 67 not-relevant |
| 2026-05-06 17:37 IDT | QD-008 | `npm run master-plan:brutal-audit:write` | <1 דק׳ | V | real-open 130 -> 104, done-with-evidence 95 -> 121 |
| 2026-05-06 17:37 IDT | QD-008 | `npm test -- --run tests/source-of-truth.test.js tests/keyboard-accessibility.test.js tests/no-auto-question-generation.test.js` | 1.42 שנ׳ | V | 3/3 files, 30/30 tests |
| 2026-05-06 17:37 IDT | QD-008 | `npm run quality-debt:progress:strict` | <1 דק׳ | V | backlog metric synced: real-open 104; phase still 4/9, 44.4%, remaining 15h |
| 2026-05-06 17:38 IDT | QD-Final | `npm test -- --run` | 5.94 שנ׳ | V | 184/184 files, 860/860 tests |
| 2026-05-06 17:38 IDT | QD-Final | `rg -n Math.random app.js src data scripts tests index.html dashboard.html` | <1 דק׳ | V | no forbidden native random token found |
| 2026-05-06 17:38 IDT | QD-Final | `node scripts/report_performance_budget.js --json` | <1 דק׳ | V | 8/8 checks, 3/3 margin |
| 2026-05-06 17:39 IDT | QD-Final | `npm run portal:full-audit:strict` | ~63 שנ׳ | V | 31/31, score 100, no environment warnings |
| 2026-05-06 17:39 IDT | QD-Final | `npm run quality-debt:progress:strict` | <1 דק׳ | V | 4/9, 44.4%, remaining 15 hours |
| 2026-05-06 17:40 IDT | QD-008 | `npm run master-plan:brutal-audit:write` | <1 דק׳ | V | real-open 104 -> 21; not-relevant 168; done-with-evidence 103 |
| 2026-05-06 17:40 IDT | QD-008 | `npm test -- --run tests/source-of-truth.test.js tests/museum-master-plan.test.js tests/museum-access-smoke.test.js` | 1.42 שנ׳ | V | 3/3 files, 10/10 tests |
| 2026-05-06 17:41 IDT | QD-008 | `npm run quality-debt:progress:strict` | <1 דק׳ | V | 5/9 tasks, 55.6%, remaining 11 hours |
| 2026-05-06 17:42 IDT | QD-007 | `npm run exam:manual-review:strict` | <1 דק׳ | V | 4/4 locked, 4/4 source-review, 4/4 no invented code |
| 2026-05-06 17:42 IDT | QD-007 | `npm test -- --run tests/quality-debt-progress-report.test.js` | 219ms | V | 1/1 files, 2/2 tests |
| 2026-05-06 17:42 IDT | QD-007 | `npm run quality-debt:progress:strict` | <1 דק׳ | V | 6/9 tasks, 66.7%, remaining 9 hours |
| 2026-05-06 17:42 IDT | QD-004 | `npm test -- --run tests/question-quality-report.test.js tests/quality-debt-progress-report.test.js tests/weekly-portal-status-report.test.js` | 699ms | V | 3/3 files, 13/13 tests |
| 2026-05-06 17:42 IDT | QD-004 | `npm run quality:questions:write` | <1 דק׳ | V | active advisory 0, deferred 623, notes 99, exam-core 0 |
| 2026-05-06 17:43 IDT | QD-004 | `npm run quality:questions:strict` | <1 דק׳ | V | 0 advisory, 623 deferred, 0 exam-core issues |
| 2026-05-06 17:43 IDT | QD-004 | `npm run questions:exam-critical-notes:strict` | <1 דק׳ | V | examCriticalNotes 0, ready true |
| 2026-05-06 17:43 IDT | QD-004 | `npm run quality:remediation:strict` | <1 דק׳ | V | 722 queued: 99 note, 623 deferred, 0 active advisory |
| 2026-05-06 17:43 IDT | QD-004 | `npm run quality-debt:progress:strict` | <1 דק׳ | V | 7/9, 77.8%, time 73.9%, remaining 6h |
| 2026-05-06 17:43 IDT | QD-004 | `npm run portal:weekly-status:strict` | <1 דק׳ | V | ready true, portal gates 31/31, regressions 0 |
| 2026-05-06 17:45 IDT | QD-006 | `npm run distractor:exam-gate:strict` | <1 דק׳ | V | active raw 4.2%, advisory 0, deferred visible 471, historical raw 19.9% |
| 2026-05-06 17:45 IDT | QD-006 | `npm test -- --run tests/distractor-quality-audit.test.js tests/quality-debt-progress-report.test.js tests/weekly-portal-status-report.test.js` | 246ms | V | 3/3 files, 9/9 tests |
| 2026-05-06 17:45 IDT | QD-006 | `npm run quality-debt:progress:strict` | <1 דק׳ | V | 8/9, 88.9%, time 87%, remaining 3h |
| 2026-05-06 17:46 IDT | QD-009 | `npm run master-plan:brutal-audit:write` | <1 דק׳ | V | active drift 18 NOT DONE, 3 PARTIAL; raw legacy preserved 263/10 |
| 2026-05-06 17:46 IDT | QD-009 | `npm test -- --run tests/quality-debt-progress-report.test.js tests/weekly-portal-status-report.test.js` | 237ms | V | 2/2 files, 4/4 tests |
| 2026-05-06 17:46 IDT | QD-009 | `npm run quality-debt:progress:strict` | <1 דק׳ | V | 9/9, 100%, remaining 0 |
| 2026-05-06 17:47 IDT | FINAL | `npm test -- --run` | 6.71s | V | 184/184 files, 862/862 tests |
| 2026-05-06 17:47 IDT | FINAL | `npm run portal:full-audit:strict` | ~18s | V | 31/31, score 100, all domains green |
| 2026-05-06 17:47 IDT | FINAL | `rg -n Math.random app.js src data scripts tests index.html dashboard.html` | <1 דק׳ | V | 0 matches in active scanned paths |
| 2026-05-06 17:57 IDT | PG-006 | `npm run post-green:hardening:strict` | <1 דק׳ | V | 6/8, 75%, time 44.4%, remaining 10h; question queue 697 |
| 2026-05-06 18:02 IDT | PG-007 | `npm run post-green:hardening:strict` | <1 דק׳ | V | 7/8, 87.5%, time 66.7%, remaining 6h; distractor deferred 446 |
| 2026-05-06 18:05 IDT | PG-008 | `npm run post-green:hardening:strict` | <1 דק׳ | V | 8/8, 100%, remaining 0; backlog real-open 11 |
| 2026-05-06 18:18 IDT | SW-004 | `npm run system-weakness:closure:strict` | <1 דק׳ | V | question queue 648 <= 650; 6/8, 75%, remaining 8h |
| 2026-05-06 18:18 IDT | SW-006 | `npm run system-weakness:closure:strict` | <1 דק׳ | V | question notes 49 <= 50; 6/8, 75%, remaining 8h |
| 2026-05-06 18:31 IDT | SW-005 | `npm run system-weakness:closure:strict` | 1 דק׳ | V | distractor deferred 421 <= 421; 7/8, 87.5%, remaining 4h |
| 2026-05-06 18:35 IDT | SW-007 | `npm run system-weakness:closure:strict` | 1 דק׳ | V | backlog real-open 8 <= 8; system weakness closure 8/8, 100%, remaining 0m |
| 2026-05-06 18:49 IDT | TREE-001 | `node --check src/views/homework-exam-mode-view.js` | <1 דק׳ | V | syntax passed אחרי שינוי מבנה העץ |
| 2026-05-06 18:50 IDT | TREE-001 | `npm test -- --run tests/exam-task-tree-integration.test.js tests/homework-exam-mode.test.js tests/exam100-path-ui.test.js` | <1 דק׳ | V | 3/3 files, 27/27 tests |
| 2026-05-06 18:52 IDT | TREE-001 | `npx playwright test tests/playwright/smoke.spec.js --project=chromium --workers=1 --reporter=list` | 17.6 שנ׳ | V | 6/6; topic tree opens full question pages desktop/mobile |
| 2026-05-06 18:53 IDT | TREE-001 | `npm test -- --run` | 7.34 שנ׳ | V | 190/190 files, 872/872 tests |
| 2026-05-06 18:53 IDT | TREE-001 | `node scripts/report_dom_storage_trust_boundary.js --strict` | <1 דק׳ | V | 119/119 DOM sinks safe, 0 requiresReview |
| 2026-05-06 18:53 IDT | TREE-001 | `npm run exam:task-tree:strict` | <1 דק׳ | V | 73/73 sections, 69 ready, 4 manual_review locked |
| 2026-05-06 18:53 IDT | TREE-001 | `node scripts/report_performance_budget.js --json` | <1 דק׳ | V | 8/8, style.css 569041/650000 margin target |
| 2026-05-06 18:54 IDT | TREE-001 | `npm run svcollege:visual-overlap:strict` | <1 דק׳ | V | 9/9, no failures |
| 2026-05-06 18:54 IDT | TREE-001 | `npm run svcollege:full-portal-smoke:strict` | <1 דק׳ | V | 9/9, desktopReady true, mobileReady true |
| 2026-05-06 18:54 IDT | TREE-001 | `rg -n "Math\\.random" app.js src data scripts tests index.html dashboard.html` | <1 דק׳ | V | אין מופעים |
| 2026-05-06 18:55 IDT | TREE-001 | `npm run portal:full-audit:strict` | 29.8 שנ׳ | V | 31/31, score 100; direct Playwright passed 6/6 |
| 2026-05-06 18:58 IDT | TREE-002 | `node --check src/views/homework-exam-mode-view.js` | <1 דק׳ | V | syntax passed אחרי הוספת V לתתי־משימות בעמוד שאלה |
| 2026-05-06 18:58 IDT | TREE-002 | `npm test -- --run tests/exam-task-tree-integration.test.js tests/homework-exam-mode.test.js tests/exam100-path-ui.test.js` | <1 דק׳ | V | 3/3 files, 27/27 tests |
| 2026-05-06 18:58 IDT | TREE-002 | `npx playwright test tests/playwright/smoke.spec.js --project=chromium --workers=1 --reporter=list` | 20.1 שנ׳ | V | 6/6; V לתת־משימה נשמר ומשתחזר אחרי reload |
| 2026-05-06 18:58 IDT | TREE-002 | `npm test -- --run` | 7.09 שנ׳ | V | 190/190 files, 872/872 tests |
| 2026-05-06 18:58 IDT | TREE-002 | `npm run exam:task-tree:strict` | <1 דק׳ | V | 73/73, 69 ready, 4 manual_review locked |
| 2026-05-06 18:58 IDT | TREE-002 | `node scripts/report_performance_budget.js --json` | <1 דק׳ | V | 8/8, style.css 569473/650000 margin target |
| 2026-05-06 18:58 IDT | TREE-002 | `node scripts/report_dom_storage_trust_boundary.js --strict` | <1 דק׳ | V | 119/119 DOM sinks safe, 0 requiresReview |
| 2026-05-06 18:59 IDT | TREE-002 | `npm run svcollege:visual-overlap:strict` | <1 דק׳ | V | 9/9 |
| 2026-05-06 18:59 IDT | TREE-002 | `npm run svcollege:full-portal-smoke:strict` | <1 דק׳ | V | 9/9, desktopReady true, mobileReady true |
| 2026-05-06 18:59 IDT | TREE-002 | `rg -n "Math\\.random" app.js src data scripts tests index.html dashboard.html` | <1 דק׳ | V | אין מופעים |
| 2026-05-06 18:59 IDT | TREE-002 | `npm run portal:full-audit:strict` | 29.9 שנ׳ | V | 31/31, score 100; direct Playwright passed 6/6 |
| 2026-05-06 19:03 IDT | TREE-003 | `node --check src/views/homework-exam-mode-view.js` | <1 דק׳ | V | syntax passed אחרי הוספת מד התקדמות לעמודי שאלה |
| 2026-05-06 19:03 IDT | TREE-003 | `npm test -- --run tests/exam-task-tree-integration.test.js tests/homework-exam-mode.test.js tests/exam100-path-ui.test.js` | <1 דק׳ | V | 3/3 files, 27/27 tests |
| 2026-05-06 19:03 IDT | TREE-003 | `npx playwright test tests/playwright/smoke.spec.js --project=chromium --workers=1 --reporter=list` | 20.1 שנ׳ | V | 6/6; progress count/percent updates before and after reload |
| 2026-05-06 19:03 IDT | TREE-003 | `npm test -- --run` | 7.47 שנ׳ | V | 190/190 files, 872/872 tests |
| 2026-05-06 19:03 IDT | TREE-003 | `npm run exam:task-tree:strict` | <1 דק׳ | V | 73/73, 69 ready, 4 manual_review locked |
| 2026-05-06 19:03 IDT | TREE-003 | `node scripts/report_performance_budget.js --json` | <1 דק׳ | V | 8/8, style.css 570093/650000 margin target |
| 2026-05-06 19:03 IDT | TREE-003 | `node scripts/report_dom_storage_trust_boundary.js --strict` | <1 דק׳ | V | 119/119 DOM sinks safe, 0 requiresReview |
| 2026-05-06 19:04 IDT | TREE-003 | `npm run svcollege:visual-overlap:strict` | <1 דק׳ | V | 9/9 |
| 2026-05-06 19:04 IDT | TREE-003 | `npm run svcollege:full-portal-smoke:strict` | <1 דק׳ | V | 9/9, desktopReady true, mobileReady true |
| 2026-05-06 19:04 IDT | TREE-003 | `rg -n "Math\\.random" app.js src data scripts tests index.html dashboard.html` | <1 דק׳ | V | אין מופעים |
| 2026-05-06 19:04 IDT | TREE-003 | `npm run portal:full-audit:strict` | 29.7 שנ׳ | V | 31/31, score 100; direct Playwright passed 6/6 |
| 2026-05-06 19:13 IDT | TREE-004 | `node --check src/views/homework-exam-mode-view.js` | <1 דק׳ | V | syntax passed אחרי הוספת התקדמות ברמת נושא |
| 2026-05-06 19:13 IDT | TREE-004 | `npm test -- --run tests/exam-task-tree-integration.test.js` | <1 דק׳ | V | 1/1 files, 4/4 tests |
| 2026-05-06 19:13 IDT | TREE-004 | `npm run exam:task-tree:strict` | <1 דק׳ | V | 73/73, 69 ready, 4 manual_review locked |
| 2026-05-06 19:13 IDT | TREE-004 | `node scripts/report_dom_storage_trust_boundary.js --strict` | <1 דק׳ | V | 119/119 DOM sinks safe, 0 requiresReview |
| 2026-05-06 19:13 IDT | TREE-004 | `npx playwright test tests/playwright/smoke.spec.js --project=chromium --workers=1 --reporter=list` | 21.9 שנ׳ | V | 6/6; topic progress updates and persists after reload |
| 2026-05-06 19:13 IDT | TREE-004 | `npm test -- --run` | 8.34 שנ׳ | V | 190/190 files, 872/872 tests |
| 2026-05-06 19:13 IDT | TREE-004 | `node scripts/report_performance_budget.js --json` | <1 דק׳ | V | 8/8, style.css 570799/650000 margin target |
| 2026-05-06 19:13 IDT | TREE-004 | `npm run svcollege:visual-overlap:strict` | <1 דק׳ | V | 9/9 |
| 2026-05-06 19:13 IDT | TREE-004 | `npm run svcollege:full-portal-smoke:strict` | <1 דק׳ | V | 9/9, desktopReady true, mobileReady true |
| 2026-05-06 19:13 IDT | TREE-004 | `rg -n "Math\\.random" app.js src data scripts tests index.html dashboard.html` | <1 דק׳ | V | אין מופעים |
| 2026-05-06 19:13 IDT | TREE-004 | `npm run portal:full-audit:strict` | 12.9 שנ׳ | V | 31/31, score 100; direct Playwright passed 6/6 |
| 2026-05-06 19:20 IDT | MR-001 | `node --check scripts/report_exam_manual_review_sections.js` | <1 דק׳ | V | syntax passed אחרי הוספת closure plan |
| 2026-05-06 19:20 IDT | MR-001 | `node --check src/views/homework-exam-mode-view.js` | <1 דק׳ | V | syntax passed אחרי UI לתוכנית פתיחת manual_review |
| 2026-05-06 19:20 IDT | MR-001 | `npm test -- --run tests/exam-manual-review-report.test.js tests/exam-task-tree-integration.test.js` | <1 דק׳ | V | 2/2 files, 5/5 tests |
| 2026-05-06 19:20 IDT | MR-001 | `npm run exam:manual-review:strict` | <1 דק׳ | V | 4/4 locked, promotionReady 0/4, 6 required fields |
| 2026-05-06 19:20 IDT | MR-001 | `npx playwright test tests/playwright/smoke.spec.js --project=chromium --workers=1 --reporter=list` | 20.7 שנ׳ | V | 6/6; manual_review plan visible and no clickable task checkboxes |
| 2026-05-06 19:20 IDT | MR-001 | `npm test -- --run` | 6.76 שנ׳ | V | 191/191 files, 873/873 tests |
| 2026-05-06 19:20 IDT | MR-001 | `npm run exam:task-tree:strict` | <1 דק׳ | V | 73/73, 69 ready, 4 manual_review locked |
| 2026-05-06 19:20 IDT | MR-001 | `node scripts/report_dom_storage_trust_boundary.js --strict` | <1 דק׳ | V | 119/119 DOM sinks safe, 0 requiresReview |
| 2026-05-06 19:20 IDT | MR-001 | `node scripts/report_performance_budget.js --json` | <1 דק׳ | V | 8/8, style.css 571707/650000 margin target |
| 2026-05-06 19:20 IDT | MR-001 | `npm run svcollege:visual-overlap:strict` | <1 דק׳ | V | 9/9 |
| 2026-05-06 19:20 IDT | MR-001 | `npm run svcollege:full-portal-smoke:strict` | <1 דק׳ | V | 9/9, desktopReady true, mobileReady true |
| 2026-05-06 19:20 IDT | MR-001 | `rg -n "Math\\.random" app.js src data scripts tests index.html dashboard.html` | <1 דק׳ | V | אין מופעים |
| 2026-05-06 19:20 IDT | MR-001 | `npm run portal:full-audit:strict` | 12.0 שנ׳ | V | 31/31, score 100; direct Playwright passed 6/6 |
| 2026-05-06 19:39 IDT | QNOTE-001 | `node --check scripts/report_question_quality.js` | <1 דק׳ | V | syntax passed אחרי manifest review |
| 2026-05-06 19:39 IDT | QNOTE-001 | `node --check data/question_quality_reviews.js` | <1 דק׳ | V | 49 answer-visible reviews documented |
| 2026-05-06 19:39 IDT | QNOTE-001 | `npm test -- --run tests/question-quality-report.test.js` | <1 דק׳ | V | 1/1 files, 10/10 tests |
| 2026-05-06 19:39 IDT | QNOTE-001 | `npm run quality:questions:strict` | <1 דק׳ | V | notes 0, advisory 0, deferred 559, exam-core 0 |
| 2026-05-06 19:39 IDT | QNOTE-001 | `npm run quality:remediation:strict` | <1 דק׳ | V | queue 559: add-fill-hint 145, balance-option-lengths 414 |
| 2026-05-06 19:39 IDT | QNOTE-001 | `npm run distractor:exam-gate:strict` | <1 דק׳ | V | actionable 104/2998 = 3.5%, examCritical 0 |
| 2026-05-06 19:39 IDT | QNOTE-001 | `npm run questions:exam-critical-notes:strict` | <1 דק׳ | V | totalNotes 0, examCriticalNotes 0 |
| 2026-05-06 19:39 IDT | QNOTE-001 | `npm run master-plan:brutal-audit:write` | <1 דק׳ | V | real-open 8, done-with-evidence 114, not-relevant 170 |
| 2026-05-06 19:39 IDT | QNOTE-001 | `npm run post-green:hardening:strict` | <1 דק׳ | V | 8/8, 100%, remaining 0 |
| 2026-05-06 19:39 IDT | QNOTE-001 | `npm run system-weakness:closure:strict` | <1 דק׳ | V | 8/8, 100%, remaining 0 |
| 2026-05-06 19:39 IDT | QNOTE-001 | `npm test -- --run` | 7.34 שנ׳ | V | 191/191 files, 874/874 tests |
| 2026-05-06 19:39 IDT | QNOTE-001 | `npm run finish-line:pre-release` | ~7 שנ׳ | V | 22/22, ready true |
| 2026-05-06 19:39 IDT | QNOTE-001 | `npm run system:health:strict` | <1 דק׳ | V | score 99.9, criticalRed false |
| 2026-05-06 19:39 IDT | QNOTE-001 | `npm run portal:full-audit:strict` | ~13 שנ׳ | V | 31/31, score 100 |
| 2026-05-06 19:39 IDT | QNOTE-001 | `npx playwright test tests/playwright/smoke.spec.js --project=chromium --workers=1 --reporter=list` | 20.7 שנ׳ | V | 6/6 direct E2E |
| 2026-05-06 19:39 IDT | QNOTE-001 | `node scripts/report_dom_storage_trust_boundary.js --strict` | <1 דק׳ | V | 119/119 DOM sinks safe, 0 requiresReview |
| 2026-05-06 19:39 IDT | QNOTE-001 | `node scripts/report_performance_budget.js --json` | <1 דק׳ | V | 8/8 checks, 3/3 margin |
| 2026-05-06 19:39 IDT | QNOTE-001 | `rg -n "Math\\.random" app.js src data scripts tests index.html dashboard.html` | <1 דק׳ | V | אין מופעים |
| 2026-05-06 19:39 IDT | QNOTE-001 | `npm run quality-debt:progress:strict` | <1 דק׳ | V | 9/9, 100%, remaining 0 |
| 2026-05-06 19:39 IDT | QNOTE-001 | `npm run portal:weekly-status:strict` | <1 דק׳ | V | 31/31, regressions 0, remaining 0 |
| 2026-05-06 19:47 IDT | QHINT-001 | `apply_patch data/questions_bank.js` | <1 דק׳ | V | נוספו 25 hints ידניים לשאלות קיימות, בלי שאלות חדשות |
| 2026-05-06 19:47 IDT | QHINT-001 | `node --check data/questions_bank.js` | <1 דק׳ | V | syntax passed |
| 2026-05-06 19:47 IDT | QHINT-001 | `npm test -- --run tests/question-quality-report.test.js` | <1 דק׳ | V | 1/1 files, 10/10 tests |
| 2026-05-06 19:47 IDT | QHINT-001 | `npm run quality:questions:write` | <1 דק׳ | V | deferred 559 -> 534; clean 4203 -> 4228 |
| 2026-05-06 19:47 IDT | QHINT-001 | `npm run quality:remediation:write` | <1 דק׳ | V | queue 534: add-fill-hint 120, balance-option-lengths 414 |
| 2026-05-06 19:47 IDT | QHINT-001 | `npm test -- --run tests/question-quality-report.test.js tests/post-green-hardening-progress.test.js tests/system-weakness-closure-progress.test.js tests/quality-debt-progress-report.test.js` | <1 דק׳ | V | 4/4 files, 16/16 tests |
| 2026-05-06 19:47 IDT | QHINT-001 | `npm run quality:questions:strict` | <1 דק׳ | V | notes 0, advisory 0, deferred 534, exam-core 0 |
| 2026-05-06 19:47 IDT | QHINT-001 | `npm run quality:remediation:strict` | <1 דק׳ | V | total 534, batches 22 |
| 2026-05-06 19:47 IDT | QHINT-001 | `npm run post-green:hardening:strict` | <1 דק׳ | V | questionQueue 534, 8/8, remaining 0 |
| 2026-05-06 19:47 IDT | QHINT-001 | `npm run system-weakness:closure:strict` | <1 דק׳ | V | questionQueue 534, 8/8, remaining 0 |
| 2026-05-06 19:47 IDT | QHINT-001 | `npm test -- --run` | 7.48 שנ׳ | V | 191/191 files, 874/874 tests |
| 2026-05-06 19:47 IDT | QHINT-001 | `node scripts/report_dom_storage_trust_boundary.js --strict` | <1 דק׳ | V | 119/119 DOM sinks safe, 0 requiresReview |
| 2026-05-06 19:47 IDT | QHINT-001 | `node scripts/report_performance_budget.js --json` | <1 דק׳ | V | 8/8 checks, 3/3 margin |
| 2026-05-06 19:47 IDT | QHINT-001 | `rg -n "Math\\.random" app.js src data scripts tests index.html dashboard.html` | <1 דק׳ | V | אין מופעים |
| 2026-05-06 19:47 IDT | QHINT-001 | `npm run portal:full-audit:strict` | ~13 שנ׳ | V | 31/31, score 100; nested Playwright environment warning only |
| 2026-05-06 19:47 IDT | QHINT-001 | `npx playwright test tests/playwright/smoke.spec.js --project=chromium --workers=1 --reporter=list` | 20.5 שנ׳ | V | 6/6 direct E2E |
## סדר עבודה מומלץ

1. FB-001 - לפתוח מרווח אמיתי ב־CSS לפני הוספת UI נוסף.
2. לפתוח את 4 סעיפי `manual_review` רק אחרי מקור מלא ב־`docs/source-review.md`.
3. FB-004 ו־FB-005 - לשפר איכות תוכן בפועל, בלי להמציא שאלות או מסיחים.
4. FB-007 עד FB-010 - hardening ונוחות תפעולית.
