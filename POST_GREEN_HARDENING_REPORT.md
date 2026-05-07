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

## Question Deferred - Top Actions

| Action | Count |
| --- | ---: |
| balance-option-lengths | 414 |
| add-fill-hint | 120 |

## Question Deferred - Top Concepts

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
| lesson_auth_security::CSRF | 7 |
| lesson_auth_security::secure cookie | 7 |

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
