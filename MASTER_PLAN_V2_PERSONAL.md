# MASTER PLAN V2 — Personal SVCollege Full-Stack Portal

> **מטרה:** פורטל לימוד אישי #1 בעולם להכנה למבחן SVCollege Full Stack.
> **לא** מוצר עסקי, **לא** רב-משתמש, **לא** SaaS — פורטל אישי לתלמיד אחד שעובד מקומית עם server.js + auto-save.
>
> **תאריך:** 2026-05-02
> **מצב כללי:** Phase 1 ✅ DONE • Phase 2 בעבודה (57% מהשלב הראשון)

---

## תוכן עניינים

1. [מה כבר נעשה (Phase 1) ✅](#phase-1-completed)
2. [מה אני עושה עכשיו (Phase 2 — 6-Level Coverage)](#phase-2-current)
3. [מה נשאר אחרי Phase 2](#phase-3-and-beyond)
4. [סדר עדיפויות מדויק לסיום מלא](#priority-order)
5. [Time estimates](#time-estimates)
6. [רשימת משימות מסומנת — בכל פעם שמסיים, אסמן V](#checklist)

---

## Phase 1 — Completed ✅ {#phase-1-completed}

| משימה | מצב | ראיה |
|-------|-----|------|
| Server.js + auto-save persistence | ✅ DONE | tests/auto-save-server.test.js — kill→restart preserves state |
| TDZ ReferenceError fix (modal manager) | ✅ DONE | commit 3bf0176 — portal boots clean |
| 96 SVCollege fill questions: prompt→code | ✅ DONE | 5 svcollege_questions_*.js fixed |
| 18 missing concise_definitions | ✅ DONE | data/concise_definitions.js |
| Concept coverage 568/568 | ✅ DONE | 210+ MC questions added across 27 lessons |
| Resume button (last-opened lesson) | ✅ DONE | snapshot.activeProfileId fixed |
| Quality blockers (3 duplicate-distractor MCs) | ✅ DONE | mc_l19/mc_l20/mc_l22 rewritten |
| Test failures: 5 of 6 fixed | ✅ DONE | service-worker, pwa-offline, exam-cram, manual-blocker, learning-os |

---

## Phase 2 — Current Work: 6-Level Concept Coverage {#phase-2-current}

**הבעיה:** 118 מושגי SVCollege ב-7 קבצי lesson_*.js היו עם `simpleExplanation` בלבד — בלי 6 הרמות (grandma → child → soldier → student → junior → professor) שהפורטל מציג בטאב "הסבר מותאם".

**ההתקדמות עד עכשיו:**

| קובץ | מושגים | מצב | %נכתבו |
|------|--------|-----|--------|
| lesson_sql_orm.js | 17 | ✅ DONE | 100% |
| lesson_nextjs.js | 18 | ✅ DONE | 100% |
| lesson_nestjs.js | 16 | ✅ DONE | 100% |
| lesson_devops_deploy.js | 17 | ✅ DONE | 100% |
| lesson_ai_engineering.js | 19 | ⏳ PENDING | 0% |
| lesson_design_systems.js | 12 | ⏳ PENDING | 0% |
| lesson_auth_security.js | 19 | ⏳ PENDING | 0% |
| **סה"כ** | **118** | **68 done** | **57.6%** |

**מה נשאר ב-Phase 2:** 50 מושגים × 6 רמות = 300 הסברים נוספים

---

## Phase 3 — Quality + UX (אחרי Phase 2) {#phase-3-and-beyond}

### 3.1 איכות תוכן (גבוהה)
- [ ] בדיקה ידנית של כל 568 המושגים ב-Knowledge Map — אין מושג "ריק"
- [ ] תיקון 222 פערי Trace/Build/Bug (לא-עדיפותיים) → תוכן ידני אמיתי
- [ ] השלמת 1,388 MC ידניות + 893 Fill ידניות לפי MANUAL_QUESTION_AUTHORING_PLAN
- [ ] בדיקת 17 quality issues (generic wording, fill ambiguity)
- [ ] Per-distractor feedback: כל MC עם 4 הסברים ידניים (לא generated)

### 3.2 UX אישי
- [ ] Resume from last lesson — verified
- [ ] "Where did I leave off?" panel ב-home — verified
- [ ] Daily streak indicator
- [ ] Progress visualization מותאם אישית (mastery heatmap)
- [ ] Weak areas auto-detection → recommend daily focus
- [ ] Spaced repetition — verified (SRS עובד)
- [ ] Exam countdown timer (כמה ימים למבחן SVCollege)
- [ ] Daily plan generator: 30-60 דקות מתוכנן לפי weakness

### 3.3 Performance + Reliability
- [ ] app.js 35,610 שורות → קוד מודולרי (אופציונלי, רק אם נדרש)
- [ ] PWA cache — verified
- [ ] Offline mode — verified
- [ ] Auto-save — verified
- [ ] Service worker version sync (כרגע audit-scan-v80)

### 3.4 Tests + Verification
- [ ] תיקון museum-access-smoke (cache version reference)
- [ ] הפעלת `npm test` — 100% green
- [ ] הפעלת `npm run validate:strict` — 18/18 gates green
- [ ] keyboard accessibility tests (WORLD1-A3)
- [ ] Playwright E2E לcritical paths (אופציונלי)

---

## Phase 4 — Polish (לאחר Phase 3) — אופציונלי

- [ ] Dark mode complete
- [ ] Sound effects toggle
- [ ] Theme customization
- [ ] Export progress as PDF
- [ ] Print study guide
- [ ] SEO + meta tags (אופציונלי לפורטל אישי)
- [ ] Mobile-only optimizations

---

## Priority Order — סדר עבודה מדויק {#priority-order}

### Sprint עכשיו (היום-מחר):
1. **השלמת Phase 2** — 50 מושגים נותרים:
   - lesson_ai_engineering.js (19) — רמת קושי גבוהה, מתאים לפרק ה-AI במבחן
   - lesson_auth_security.js (19) — קריטי לפרק האבטחה
   - lesson_design_systems.js (12) — קצר ביותר, אסיים אחרון
2. **בדיקה אוטומטית** — node script שמוודא 100% concepts have all 6 levels
3. **`npm test`** — לוודא שאין regressions
4. **commit + push**

### Sprint הבא (יום 3-4):
5. **תיקון museum-access-smoke** (cache version reference)
6. **בדיקה ידנית של Knowledge Map** — לעבור על כל ה-tabs במושגים מייצגים
7. **Quality fixes** — 17 quality issues במאגר השאלות
8. **Per-distractor feedback** — 50 שאלות הראשונות ידניות

### Sprint שלישי (יום 5-7):
9. **תוכן Trace/Build/Bug** — 50 פערים עדיפותיים ראשונים
10. **Fill ambiguity** — 4 ניסוחים לא ברורים
11. **MC generic wording** — 12 ניסוחים גנריים

### לאחר זה (אופציונלי):
12. **שאלות נוספות** — לפי MANUAL_QUESTION_AUTHORING_PLAN
13. **Daily plan generator** — UX feature חדש
14. **Streak + countdown** — gamification

---

## Time Estimates {#time-estimates}

| משימה | זמן משוער | רמת ביטחון |
|-------|----------|------------|
| Phase 2 השלמה (50 מושגים נותרים) | 90-120 דקות | גבוה |
| בדיקות אוטומטיות + verification | 15 דקות | גבוה |
| Quality fixes (17 issues) | 30-45 דקות | בינוני |
| Per-distractor feedback (50 questions) | 60-90 דקות | בינוני |
| Trace/Build/Bug content (50 priority) | 2-3 שעות | בינוני |
| Manual question authoring (1,388 MC + 893 Fill) | 40-60 שעות | נמוך (תלוי קצב) |
| **סה"כ עד פורטל אישי מושלם** | **~50 שעות** | **בינוני** |
| **רק עד שכל 568 מושגים מכוסים ב-6 רמות** | **2-3 שעות** | **גבוה** |

---

## Checklist — Master List {#checklist}

### ✅ Phase 1 (Completed)
- [V] Server.js + auto-save
- [V] TDZ fix
- [V] 96 fill questions converted
- [V] 18 concise_definitions added
- [V] 568/568 concept coverage
- [V] Resume button
- [V] Quality blockers (3 MCs)
- [V] 5 of 6 test failures

### 🟢 Phase 2 (Current — 6-Level Coverage)
- [V] lesson_sql_orm.js (17 concepts)
- [V] lesson_nextjs.js (18 concepts)
- [V] lesson_nestjs.js (16 concepts)
- [V] lesson_devops_deploy.js (17 concepts)
- [ ] lesson_ai_engineering.js (19 concepts)
- [ ] lesson_design_systems.js (12 concepts)
- [ ] lesson_auth_security.js (19 concepts)
- [ ] Verification script: 568/568 with all 6 levels

### 🟡 Phase 3 (Next — Quality)
- [ ] museum-access-smoke fix
- [ ] Knowledge Map manual review (representative concepts)
- [ ] 17 quality issues fix
- [ ] Per-distractor feedback (top 50 MCs)
- [ ] Trace/Build/Bug content (50 priority)
- [ ] Fill ambiguity (4 issues)
- [ ] MC generic wording (12 issues)

### 🔵 Phase 4 (Personal Polish — Optional)
- [ ] Daily plan generator
- [ ] Exam countdown
- [ ] Streak indicator
- [ ] Mastery heatmap
- [ ] Weak areas auto-detection
- [ ] Export progress PDF

### ⚪ Phase 5 (Test + Verify)
- [ ] `npm test` 100% green
- [ ] `npm run validate:strict` 18/18 green
- [ ] `npm run finish-line:pre-release` clean
- [ ] keyboard accessibility tests
- [ ] manual UI walkthrough — every tab works

---

## Source-of-Truth Documents

- **תוכנית זו:** [MASTER_PLAN_V2_PERSONAL.md](MASTER_PLAN_V2_PERSONAL.md) (you are here)
- **משימות חיות:** [EXECUTION_TASKS.md](EXECUTION_TASKS.md)
- **Brutal audit:** [BRUTAL_MASTER_PLAN_AUDIT.md](BRUTAL_MASTER_PLAN_AUDIT.md) (historical)
- **תוכנית מקורית:** [MASTER_PLAN.md](MASTER_PLAN.md) (legacy)
- **Manual question plan:** [MANUAL_QUESTION_AUTHORING_PLAN.md](MANUAL_QUESTION_AUTHORING_PLAN.md)

---

## Brutal Honesty Note

המסמך הזה מתעדכן בזמן אמת.

- ✅ DONE = הושלם ויש ראיה (קוד, test, או verify run)
- 🟢 IN PROGRESS = בעבודה כרגע
- 🟡 NEXT = מתוכנן לסבב הבא
- 🔵 OPTIONAL = אופציונלי לפורטל אישי
- ⏳ PENDING = ממתין

לא מסמן [V] עד שיש ראיה אמיתית. אם משהו נראה ירוק אבל לא מאומת — חוזר ל-PENDING.
