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

## Question Queue - Top Actions

| Action | Count |
| --- | ---: |
| balance-option-lengths | 414 |
| add-fill-hint | 120 |

## Question Queue - Top Concepts

| Concept | Count |
| --- | ---: |
| lesson_13::DOM | 14 |
| lesson_html_css_foundations::box model | 14 |
| lesson_auth_security::password hashing | 12 |
| lesson_sql_orm::SQL | 12 |
| lesson_auth_security::JWT | 11 |
| lesson_15::Asynchronous | 10 |
| lesson_closures::closure | 10 |
| lesson_ai_engineering::streaming response | 8 |
| lesson_auth_security::CORS | 8 |
| lesson_auth_security::XSS boundary | 8 |

## Distractor Deferred - Top Issues

| Issue | Count |
| --- | ---: |
| correct-much-longer | 421 |

## Backlog Real-open Items

| # | Source | Line | ID | Status | Item |
| ---: | --- | ---: | --- | --- | --- |
| 1 | MASTER_PLAN.md | 86 | BUG-AUDIT-005 | NOT DONE | להמשיך פירוק `app.js` למודולי `src/` קטנים: lesson renderer, chrome/menu, settings, bug log, question panels. |
| 2 | EXECUTION_TASKS.md | 153 | P3.10.3 | PARTIAL | [~] P3.10.3 — Split app.js → src/views/, core/, ui/, utils/ — core scoring extracted; views still pending |
| 3 | EXECUTION_TASKS.md | 158 | AUDIT-FIX-28 | PARTIAL | [~] AUDIT-FIX-28 — Vite migration (build/dev/preview working; full app.js module extraction pending) |
| 4 | EXECUTION_TASKS.md | 159 | AUDIT-FIX-29 | PARTIAL | [~] AUDIT-FIX-29 — TypeScript migration (bootstrap + lib ports + core scoring module done; views pending) |
| 5 | EXECUTION_TASKS.md | 185 | EXECUTION_TASKS.md:185 | NOT DONE | [ ] FWD-2.3 — לכל batch להוסיף רק שאלות שעברו בדיקה ידנית מול חומר השיעור וה-source lesson. |
| 6 | EXECUTION_TASKS.md | 188 | EXECUTION_TASKS.md:188 | NOT DONE | [ ] FWD-2.6 — לא לסמן batch כ-DONE אם Fill כולל יותר מ-blank אחד, תשובה דולפת, או hint שמגלה את התשובה. |
| 7 | EXECUTION_TASKS.md | 210 | EXECUTION_TASKS.md:210 | NOT DONE | [ ] FWD-5.2 — לבדוק ידנית שיעור אחד מכל מודול SVCollege: תוכן, מושגים, שאלות, מעבר מושגים, מעבר לשיעור הבא, collapse menus, scroll rail. |
| 8 | EXECUTION_TASKS.md | 235 | EXECUTION_TASKS.md:235 | NOT DONE | [ ] FWD-8.1 — לפרק `app.js` למודולים קטנים: lesson renderer, chrome/menu, settings, bug log, question panels. |
