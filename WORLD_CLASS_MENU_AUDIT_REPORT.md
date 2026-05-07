# World-Class User Menu Audit

Date: 2026-05-07
Score: **100/100**
Ready: **yes**
Grade: world-class-ready

## Checks

| Check | Status | Severity | Detail |
|---|---:|---:|---|
| Exam100 is the first default surface | pass | P0 | A new student should land in the closed exam flow without choosing from the legacy portal. |
| Closed mode renders only Exam100 rows | pass | P0 | The primary path must not render the advanced library when exam focus is active. |
| Closed route exposes only previous and next arrows | pass | P0 | The route should move through backward/forward only, not a menu of choices. |
| Progress percent and graphical step map are visible | pass | P0 | The student sees percent complete, a linear map and rewards. |
| Day board, overdue status and lag CTA are present | pass | P0 | A delayed student gets a red lag message and one next-task CTA. |
| Local progress is clearly marked as recovery only | pass | P1 | The UI must not present localStorage as an official score proof. |
| Legacy and advanced surfaces are hidden by default | pass | P0 | Legacy remains available but not as the primary decision surface. |
| Solution guide is available only as extracted reference | pass | P1 | The solution guide should support practice without becoming a shortcut menu. |
| Start-here area keeps next action prominent | pass | P1 | The beginner surface should tell the student what to do now. |
| Closed route adapts to mobile width | pass | P1 | The map, day board and arrows must not overflow on mobile. |
| Menu and route are protected by release gates | pass | P1 | Critical menu expectations must be in tests and pre-release checks. |

## Remaining Tasks

- **P0 להפוך את כרטיס המשימה הבאה לגדול יותר מכל שאר האלמנטים** — 90 דק׳. במסך ראשון יש CTA אחד בולט יותר מכל פעולה אחרת.
- **P0 להוסיף הוכחת Gate קצרה בתוך כרטיס השלב הנוכחי** — 120 דק׳. אי אפשר ללחוץ קדימה בלי ראיה/ציון עצמי כששלב מוגדר כחובה.
- **P1 להוסיף friction לפתיחת ספרייה מתקדמת** — 60 דק׳. פתיחה מציגה אזהרה: לא חלק מהמסלול הראשי למבחן.
- **P1 לחדד את מפת הפרסים הגרפית** — 120 דק׳. כל שלב מראה פרס, סטטוס, ותוצר סיום בלי טקסט צפוף.
- **P1 להוסיף smoke של משתמש חדש: פתיחה עד משימה ראשונה** — 90 דק׳. בדיקה מוכיחה שתוך 10 שניות נמצא CTA אחד ברור.
- **P2 להוסיף failsafe אם תלמיד פותח legacy tab בזמן Exam100** — 75 דק׳. מופיע באנר חזרה למסלול, בלי למחוק את בחירת המשתמש.

## Master Plan

Total: **10 שעות 15 דק׳**

- אפס החלטות במסך ראשון: 210 דק׳ — CTA אחד, Gate proof, חצים בלבד
- מפת מסלול מעוררת רצון לסיים: 180 דק׳ — פרסים, סטטוס שלב, אחוז יומי
- Legacy בשליטה: 135 דק׳ — Advanced friction, return banner, no accidental tabs
- בדיקות UX חוזרות: 90 דק׳ — new-user smoke, mobile route smoke, regression gate

