# לוח המשך - Post-green hardening

עודכן: 2026-05-06T16:45:13.791Z

## אחוז השלמה וזמן לסיום

| מדד | ערך |
| --- | --- |
| משימות סגורות | `8/8` |
| אחוז השלמה לפי משימות | `100%` |
| אחוז השלמה לפי זמן | `100%` |
| זמן שכבר נסגר | `18 שעות` |
| זמן משוער שנותר | `0 דק׳` |
| זמן כולל משוער | `18 שעות` |

## מדדים חיים

| מדד | ערך |
| --- | --- |
| Question queue | `534` |
| Question note/deferred | `0/534` |
| Question batches | `22` |
| Distractor actionable/deferred | `203/421` |
| Distractor advisory | `0` |
| Backlog real-open | `8` |
| Backlog active drift | `5 NOT DONE, 3 PARTIAL` |

## משימות

| ID | סטטוס | עדיפות | משימה | זמן | תוצאה | מצב נוכחי | Gate |
| --- | --- | --- | --- | ---: | --- | --- | --- |
| PG-001 | [x] | P0 | לסנכרן תורי remediation מול הדוחות הנוכחיים | 30 דק׳ | V | 534 question queue, 421 distractor deferred | QUESTION_REMEDIATION_QUEUE matches QUESTION_QUALITY_REPORT and DISTRACTOR_REMEDIATION_QUEUE matches DISTRACTOR_EXAM_GATE_REPORT |
| PG-002 | [x] | P0 | להקים לוח Post-green hardening עם אחוז וזמן | 30 דק׳ | V | POST_GREEN_HARDENING_REPORT + POST_GREEN_TASK_BOARD | Report script writes json/md/task board and exposes summary |
| PG-003 | [x] | P1 | למיין question deferred לפי action/concept/batch | 1 שעות | V | 534 deferred, 22 batches | Top deferred actions/concepts are available without auto rewrite |
| PG-004 | [x] | P1 | למיין distractor deferred לפי issue/concept/source | 1 שעות | V | 421 deferred, 0 advisory | Deferred distractor queue is visible and advisory remains 0 |
| PG-005 | [x] | P1 | למפות real-open backlog לשורות מקור ותיקון הבא | 1 שעות | V | 8 real-open, 5 active NOT DONE, 3 active PARTIAL | Every active real-open item has source file/line/id/reason |
| PG-006 | [x] | P2 | לתקן ידנית batch ראשון של 25 question remediation items | 4 שעות | V | 534 queued issues | Queue total <= 697 after verified manual edits and quality gates |
| PG-007 | [x] | P2 | לתקן ידנית batch ראשון של 25 distractor remediation items | 4 שעות | V | 421 deferred distractors | Deferred distractor queue <= 446 after verified manual edits |
| PG-008 | [x] | P3 | לסגור slice ראשון של real-open architecture/backlog | 6 שעות | V | 8 real-open | BRUTAL_MASTER_PLAN_AUDIT real-open <= 15 with live evidence |
