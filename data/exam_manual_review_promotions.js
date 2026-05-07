(function () {
  "use strict";

  const root = typeof window !== "undefined" ? window : globalThis;
  const tree = root.SVCOLLEGE_EXAM_TASKS_TREE;
  if (!tree || !Array.isArray(tree.sectionExercises)) return;

  const TASK_META = Object.freeze({
    question_scope_inherited: { branchId: "scope_meta", title: "זיהוי Scope של סעיף מבחן" },
    client_navigation: { branchId: "frontend_ui_validation", title: "ניווט React ו-routes בצד לקוח" },
    client_form_inputs: { branchId: "frontend_ui_validation", title: "טפסים ו-controlled inputs" },
    client_validation_rules: { branchId: "frontend_ui_validation", title: "ולידציית צד לקוח לפי דרישות המקור" },
    alerts_error_handling: { branchId: "backend_api_routes", title: "הודעות שגיאה ו-alerts" },
    client_list_render: { branchId: "frontend_ui_validation", title: "רינדור רשימות וכרטיסים" },
    js_algorithms: { branchId: "js_problem_solving", title: "פתרון אלגוריתם JavaScript" },
  });

  const PROMOTIONS = Object.freeze({
    "section-04": {
      sectionText: "שאלה 1 - מערכת לניהול בקרות טיסה ב-React, בצד לקוח בלבד ללא שרת. יש עמוד כניסה תחת / עם סיסמה אחת בלבד 12345 והודעת שגיאה לכל קוד אחר. לאחר כניסה עוברים ל-/controlpanel. בעמוד הבקרה יש תפריט אפשרויות בצד שמאל, ובמובייל מתחת ל-500px הרשימה מוצגת בשורה בחלק העליון. ברירת מחדל כל הטיסות: הצגת כל הטיסות בריבועים עם מספר טיסה, חברת תעופה ומספר נוסעים. /controlpanel/sort כולל חיפוש לפי שם חברה לפי ערך חלקי ו-select למיון לפי מספר מושבים נמוך/גבוה. /controlpanel/add כולל שלושה inputs וכפתור: מספר טיסה מספרי עד 5 תווים וייחודי, חברת תעופה עם לפחות אות אחת, מספר נוסעים בין 1 ל-450. אם תקין מוסיפים למערך וחוזרים לכל הטיסות, אחרת מציגים alert. /controlpanel/delete כולל input מספר טיסה עד 5 תווים וכפתור מחק. אם הטיסה לא קיימת מציגים שגיאה; אם קיימת מוחקים ומציגים הודעה עם כמות כל הטיסות וכמות כל הנוסעים כרגע באוויר.",
      taskIds: ["question_scope_inherited", "client_navigation", "client_form_inputs", "client_validation_rules", "alerts_error_handling", "client_list_render", "js_algorithms"],
      targetSurface: "React client-only routes: /, /controlpanel, /controlpanel/sort, /controlpanel/add, /controlpanel/delete",
      microTasks: [
        "להגדיר routes עבור /, /controlpanel, /controlpanel/sort, /controlpanel/add, /controlpanel/delete",
        "לבנות login שמקבל רק סיסמה 12345",
        "להציג שגיאה על סיסמה לא תקינה",
        "לבנות תפריט בקרה צדדי ודפוס responsive מתחת ל-500px",
        "לרנדר את כל הטיסות בכרטיסים עם מספר טיסה, חברה ומספר נוסעים",
        "לבנות חיפוש לפי שם חברה בערך חלקי",
        "לבנות select למיון לפי מספר מושבים נמוך או גבוה",
        "לבנות טופס הוספת טיסה עם מספר טיסה, חברה, נוסעים וכפתור צור",
        "לאמת מספר טיסה מספרי עד 5 תווים וייחודי",
        "לאמת חברת תעופה עם לפחות אות אחת",
        "לאמת מספר נוסעים בין 1 ל-450",
        "להציג alert אם טופס ההוספה לא תקין",
        "להוסיף טיסה למערך ולחזור לכל הטיסות אם תקין",
        "לבנות טופס מחיקת טיסה לפי מספר טיסה",
        "להציג שגיאה אם הטיסה לא קיימת",
        "למחוק טיסה קיימת ולהציג סיכום כמות טיסות ונוסעים באוויר",
        "לסנן טיסות לפי שם חברה חלקי ללא שינוי המערך המקורי",
        "למיין טיסות לפי מספר נוסעים נמוך או גבוה",
        "לעדכן מערך טיסות לאחר הוספה או מחיקה בצורה immutable",
      ],
    },
    "section-33": {
      sectionText: "שאלה 2 - JavaScript. כתוב פונקציה שמקבלת מערך של אחדות ואפסים המייצג מספר בינארי. הפונקציה תמיר את הערך למספר דצימלי רגיל, ולאחר מכן תחזיר אמת אם הערך הדצימלי הוא פלינדרום ושקר אם הוא לא. מספר בינארי מיוצג בספרות 0 או 1, וכל ספרה במקומה מציינת ערך כפול 2 בחזקת המיקום שלה. לדוגמה 101101 מייצג 45 כי המקומות עם 1 הם 1 + 4 + 8 + 32.",
      taskIds: ["js_algorithms"],
      targetSurface: "JavaScript function; function name/file unknown/unavailable",
      microTasks: [
        "לקבל מערך שמכיל רק 0 ו-1",
        "להמיר בינארי לדצימלי לפי חזקות של 2",
        "לחשב רק מקומות שבהם הספרה היא 1",
        "להמיר את המספר הדצימלי למחרוזת",
        "לבדוק פלינדרום על הערך הדצימלי",
        "להחזיר true אם פלינדרום ו-false אם לא",
        "לטפל בקלט בצורה דטרמיניסטית ללא נתונים מומצאים",
      ],
    },
    "section-50": {
      sectionText: "שאלה 1 - WILLING APP. לבנות אתר React להתנדבויות. העמוד הראשי תחת / כולל שני כפתורים: הוספת התנדבות ומצא התנדבות. לחיצה על הוספת התנדבות מעבירה ל-/add. עמוד /add כולל כותרת להתנדבות עד 20 תווים, מיקום התנדבות שהוא שם עיר באנגלית בלבד ללא מספרים/רווחים/סימנים, תיאור עד 200 תווים, וכפתור יצירת התנדבות חדשה. יש לוודא תקינות שדות; אם הכל תקין מחזירים לעמוד הראשי, ואם ערך לא תקין מציגים alert עם התקלה. עמוד /find כולל תיבת טקסט לשם מתנדב באורך גדול מ-2, select של כל ערי ההתנדבויות ללא כפילויות, וכפתור חפש. אם השם לא תקין מציגים alert. אם תקין עוברים ל-/all ושם מציגים את כל ההתנדבויות בעיר שנבחרה, כל אחת לפי כותרת בלבד. לחיצה על התנדבות מסמנת רקע ירוק בהיר ומציגה תיאור; לחיצה נוספת מבטלת ומחזירה רקע לבן. כפתור אישור מוחק מהרשימה כל התנדבות שנבחרה ומחזיר לעמוד הראשי.",
      taskIds: ["question_scope_inherited", "client_navigation", "client_form_inputs", "client_validation_rules", "alerts_error_handling", "client_list_render"],
      targetSurface: "React client routes: /, /add, /find, /all",
      microTasks: [
        "להגדיר routes ב-React עבור /, /add, /find, /all",
        "לבנות עמוד ראשי עם שני כפתורי ניווט",
        "לבנות טופס /add עם title/location/description/button",
        "לאמת title עד 20 תווים",
        "לאמת location באנגלית בלבד ללא רווחים/מספרים/סימנים",
        "לאמת description עד 200 תווים",
        "להציג alert לכל קלט לא תקין",
        "להחזיר לעמוד הראשי אחרי יצירה תקינה",
        "לבנות /find עם input לשם מתנדב, select ערים ייחודיות וכפתור חיפוש",
        "לאמת שם מתנדב באורך גדול מ-2",
        "לנווט ל-/all לאחר חיפוש תקין",
        "לרנדר רשימת התנדבויות לפי העיר שנבחרה",
        "להציג רק כותרת כברירת מחדל",
        "להפעיל toggle לבחירה: רקע ירוק ותיאור, לחיצה נוספת ביטול",
        "למחוק מהרשימה התנדבויות שנבחרו לאחר אישור ולחזור לעמוד הראשי",
      ],
    },
    "section-51": {
      sectionText: "שאלה 2 - JavaScript. צרו פונקציה שמקבלת מערך של מספרים שלמים. הפונקציה בודקת אילו ערכים זוגיים ואי-זוגיים ואת כמות האיברים במערך. אם אחד האיברים אינו מספר יש לזרוק שגיאה. אם מספר קיים כמה פעמים במערך, בודקים אותו פעם אחת בלבד לצורך even/odd ומכניסים למאפיין המתאים באובייקט. הפונקציה מחזירה אובייקט עם even, odd, total. even הוא כמות המספרים הזוגיים הייחודיים שנמצאו, odd הוא כמות המספרים האי-זוגיים הייחודיים שנמצאו, total הוא כמות כלל האיברים במערך. לדוגמה עבור [6,3,3,4,13,6,7,18,7,11] הפונקציה מחזירה { even: 3, odd: 4, total: 10 }.",
      taskIds: ["js_algorithms", "alerts_error_handling"],
      targetSurface: "JavaScript function; function name/file unknown/unavailable",
      microTasks: [
        "לכתוב פונקציה שמקבלת מערך",
        "לוודא שכל איבר הוא מספר שלם",
        "לזרוק שגיאה אם נמצא איבר שאינו מספר",
        "לחשב total לפי אורך המערך המקורי",
        "לספור זוגיים לפי ערכים ייחודיים בלבד",
        "לספור אי-זוגיים לפי ערכים ייחודיים בלבד",
        "להחזיר אובייקט { even, odd, total }",
        "לטפל בכפילויות בלי לספור אותן שוב ב-even/odd",
      ],
    },
  });

  function unique(values) {
    const seen = new Set();
    return values.filter((value) => {
      if (seen.has(value)) return false;
      seen.add(value);
      return true;
    });
  }

  function branchIdsFor(taskIds) {
    return unique(taskIds.map((taskId) => (TASK_META[taskId] || {}).branchId || "scope_meta"));
  }

  function technicalTaskRefsFor(taskIds) {
    return taskIds.map((taskId) => ({
      subbranchId: taskId,
      technicalTaskId: `${taskId}::core-implementation`,
      title: (TASK_META[taskId] || {}).title || taskId,
      targetFile: "unknown/unavailable",
    }));
  }

  function technicalSubtasksFor(sectionId, microTasks) {
    return microTasks.map((title, index) => ({
      id: `${sectionId}::micro-${String(index + 1).padStart(2, "0")}`,
      order: index + 1,
      title,
      file: "unknown/unavailable",
      details: "תת־משימה מתוך source-review מלא; קובץ יעד לא הופיע במקור ולכן נשאר unknown/unavailable.",
    }));
  }

  function scoreRubricFor(promotion) {
    return [
      { label: "מימוש דרישות המקור", points: 35, evidence: promotion.sectionText },
      { label: "קלט/פלט ו-state", points: 25, evidence: promotion.targetSurface },
      { label: "Validation ו-error handling", points: 20, evidence: "נבדק רק לפי סעיפי validation/error שמופיעים במקור." },
      { label: "Edge cases ללא fake data", points: 20, evidence: "אין המצאת נתונים; קובץ יעד חסר נשאר unknown/unavailable." },
    ];
  }

  const applied = [];
  tree.sectionExercises.forEach((exercise) => {
    const promotion = PROMOTIONS[exercise.id];
    if (!promotion) return;
    exercise.sectionText = promotion.sectionText;
    exercise.taskIds = ["manual_review"];
    exercise.microTasks = [];
    exercise.status = "manual_review";
    exercise.autoScorable = false;
    exercise.branchIds = ["manual_review"];
    exercise.technicalTaskRefs = [];
    exercise.projectFileTree = {
      root: "exam-project/",
      targetFile: "unknown/unavailable",
      files: [{ path: "docs/source-review.md", purpose: "מקור מלא ו-contract טכני לסעיף שקודם מ-manual_review." }],
    };
    exercise.explanationLevels = {
      grandma: "ברמת סבתא: עכשיו יש נוסח מלא. עובדים רק לפי מה שכתוב במקור, בלי לנחש קבצים או דרישות שלא הופיעו.",
      professional: "ברמה מקצועית: הסעיף קודם מ-manual_review ל-ready כי source-review מכיל full prompt, target surface, I/O, validation ו-acceptance. target file: unknown/unavailable.",
    };
    exercise.conceptsToKnow = [];
    exercise.technicalSubtasks = [];
    exercise.scoreRubric = scoreRubricFor(promotion);
    exercise.howToGet100 = [
      "לממש רק את הדרישות שהופיעו במקור המלא.",
      "לא להמציא קובץ יעד אם המקור לא מספק אותו.",
      "לבדוק כל validation/error שמופיע ב-source-review.",
      "להשאיר unknown/unavailable לכל נתון חסר.",
    ];
    exercise.beyond100 = ["להפריד פונקציות טהורות כאשר זה רלוונטי.", "לתעד edge cases מתוך המקור בלבד."];
    exercise.sourceReview = {
      file: "docs/source-review.md",
      status: "promoted-with-source-evidence",
      targetFilePolicy: "unknown/unavailable when not present in source",
    };
    applied.push(exercise.id);
  });

  root.SVCOLLEGE_EXAM_MANUAL_REVIEW_PROMOTIONS = Object.freeze({
    source: "docs/source-review.md",
    applied,
  });
})();
