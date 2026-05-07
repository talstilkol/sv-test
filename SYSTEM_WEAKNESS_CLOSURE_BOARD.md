# לוח המשך - System Weakness Closure

עודכן: 2026-05-06T16:45:13.838Z

## אחוז השלמה וזמן לסיום

| מדד | ערך |
| --- | --- |
| משימות סגורות | `8/8` |
| אחוז השלמה לפי משימות | `100%` |
| אחוז השלמה לפי זמן | `100%` |
| זמן שכבר נסגר | `18 שעות 30 דק׳` |
| זמן משוער שנותר | `0 דק׳` |
| זמן כולל משוער | `18 שעות 30 דק׳` |

## מדדים חיים

| מדד | ערך |
| --- | --- |
| Question queue | `534` |
| Question note/deferred | `0/534` |
| Distractor actionable/deferred | `203/421` |
| Distractor exam-critical | `0` |
| Backlog real-open | `8` |
| Release inventory | `245 paths, 0 unknown, releaseAllowed=false` |

## משימות

| ID | סטטוס | עדיפות | משימה | זמן | תוצאה | מצב נוכחי | Gate |
| --- | --- | --- | --- | ---: | --- | --- | --- |
| SW-001 | [x] | P0 | להקים לוח המשך לסגירת חולשות מערכת | 30 דק׳ | V | SYSTEM_WEAKNESS_CLOSURE_REPORT + SYSTEM_WEAKNESS_CLOSURE_BOARD | Report script writes json/md/board and calculates percent/time |
| SW-002 | [x] | P0 | לסגור release inventory בלי owner מזויף | 2 שעות | V | 245 paths, 0 unknown, releaseAllowed=false | RELEASE_INVENTORY_REPORT ready=true, unknownPaths=0, releaseAllowed=false while worktree is dirty |
| SW-003 | [x] | P1 | לייצב מפת real-open אחרי inventory | 1 שעות | V | 8 real-open | BRUTAL_MASTER_PLAN_AUDIT real-open <= 10 and active drift reconciles |
| SW-004 | [x] | P1 | לתקן batch שני של 25 question remediation items | 4 שעות | V | 534 queued, 0/534 note/deferred | QUESTION_REMEDIATION_QUEUE total <= 650 with quality:questions:strict green |
| SW-005 | [x] | P1 | לתקן batch שני של 25 distractor deferred items | 4 שעות | V | 421 deferred, 203 actionable | DISTRACTOR_REMEDIATION_QUEUE deferred <= 421 with distractor:exam-gate:strict green |
| SW-006 | [x] | P2 | להוריד Fill review notes מתחת 50 | 2 שעות | V | 0 notes | Question note queue <= 50 without hiding answer-visible or one-character review debt |
| SW-007 | [x] | P2 | להוריד backlog real-open ל-8 ומטה | 4 שעות | V | 8 real-open | Only close with live evidence; architecture work remains open unless implemented |
| SW-008 | [x] | P0 | לוודא full gates אחרי ה-slice | 1 שעות | V | 31/31 portal, examCoreIssues=0, examCriticalDistractors=0 | portal:full-audit:strict, post-green:hardening:strict, quality-debt:progress:strict, release:inventory:strict are green |
