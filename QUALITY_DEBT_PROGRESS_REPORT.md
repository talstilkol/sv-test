# לוח המשך - חוב איכות Exam100

עודכן: 2026-05-06T16:45:13.767Z

## אחוז השלמה וזמן לסיום

| מדד | ערך |
| --- | --- |
| משימות סגורות | `9/9` |
| אחוז השלמה לפי משימות | `100%` |
| אחוז השלמה לפי זמן | `100%` |
| זמן שכבר נסגר | `23 שעות` |
| זמן משוער שנותר | `0 דק׳` |
| זמן כולל משוער | `23 שעות` |

## מדדים חיים

| מדד | ערך |
| --- | --- |
| Portal gates | `31/31` |
| Weekly regressions | `0` |
| Question notes | `0` |
| Question advisory | `0` |
| Question deferred | `534` |
| Distractor actionable | `3.5%` |
| Distractor raw | `3.5%` |
| Distractor deferred | `421` |
| Manual review locked | `4` |
| Backlog real-open | `8` |
| Backlog active status drift | `5 NOT DONE, 3 PARTIAL` |

## משימות

| ID | סטטוס | עדיפות | משימה | זמן | תוצאה | מצב נוכחי | Gate |
| --- | --- | --- | --- | ---: | --- | --- | --- |
| QD-001 | [x] | P0 | להקים מדד חוב איכות אוטומטי ולוח המשך | 30 דק׳ | V | נוצר בדוח הנוכחי | QUALITY_DEBT_PROGRESS_REPORT.md/json + QUALITY_DEBT_TASK_BOARD.md |
| QD-002 | [x] | P0 | לשמור regressions על 0 ו־portal gates ירוקים | 30 דק׳ | V | 31/31, regressions 0 | PORTAL_FULL_AUDIT_REPORT 31/31 + WEEKLY_PORTAL_STATUS regressions 0 |
| QD-003 | [x] | P1 | להוריד question notes מתחת 150 בלי שינוי exam-core | 4 שעות | V | 0 notes, exam-core 0 | QUESTION_QUALITY_REPORT noteIssues < 150, examCoreNoteIssues 0 |
| QD-004 | [x] | P1 | להוריד advisory question debt מתחת 250 | 3 שעות | V | 0 advisory, 534 deferred | QUESTION_QUALITY_REPORT advisoryIssues < 250 |
| QD-005 | [x] | P1 | להוריד distractor actionable מתחת 5% | 3 שעות | V | 104 actionable, 3.5% | DISTRACTOR_EXAM_GATE_REPORT flaggedPercent < 5 |
| QD-006 | [x] | P2 | לסווג raw/advisory distractor debt ולהשאיר רק פריטים עם פעולה אמיתית | 3 שעות | V | 3.5% raw, 0 advisory, 421 deferred | rawFlaggedPercent < 12 and advisoryFlaggedQuestions < 250 |
| QD-007 | [x] | P2 | לטפל ב־4 סעיפי manual_review עם מקור או נעילה מנומקת | 2 שעות | V | 4 locked, manualReviewReady true | manualReviewLocked 0 OR EXAM_MANUAL_REVIEW_SECTIONS_REPORT ready with locked/no-invented-code/source-review |
| QD-008 | [x] | P2 | להוריד backlog real-open מתחת 80 באמצעות owner/evidence/defer | 4 שעות | V | 8 real-open | BRUTAL_MASTER_PLAN_AUDIT real-open < 80 |
| QD-009 | [x] | P3 | לנקות status drift במסמכי legacy | 3 שעות | V | 5 active NOT DONE, 3 active PARTIAL; raw 263/10 | active NOT DONE < 150 and active PARTIAL < 5 |
