(function () {
  "use strict";

  window.SVCOLLEGE_SITE_TREE = [
    {
      label: "1. התחל כאן",
      meta: "פעולה ראשונה, אבחון והמשך מסלול",
      open: true,
      tabs: [
        ["mock-exam", "Exam 100 / מבחן מדומה", "ראשון"],
        ["trainer", "מאמן ידע", "אבחון"],
        ["study", "לימוד מותאם", "חולשות"],
        ["concept-sprint", "מושגים נטו", "בדיקה מהירה"],
      ],
    },
    {
      label: "2. Project 70",
      meta: "בנייה, routing, forms, validations ו-API",
      open: true,
      tabs: [
        ["blueprints", "יישור SVCollege", "דרישות"],
        ["capstones", "פרויקטים", "בנייה"],
        ["codeblocks", "בלוקי קוד", "תבניות"],
        ["trace", "Code Trace", "בדיקת קוד"],
      ],
    },
    {
      label: "3. JavaScript 20 / TypeScript 10",
      meta: "שאלות קצרות, טיפוסים והשוואות",
      tabs: [
        ["comparator", "השוואות", "TS/React"],
        ["flashcards", "כרטיסיות", "חזרה"],
      ],
    },
    {
      label: "4. בדיקה ומעקב",
      meta: "פערים, הוכחות למידה ומפת ידע",
      tabs: [
        ["gap-matrix", "פערים", "מה חסר"],
        ["learning-evidence", "ראיות למידה", "הוכחה"],
        ["km", "מפת ידע", "תמונה מלאה"],
      ],
    },
    {
      label: "5. ספרייה מתקדמת - לא להתחיל כאן השבוע",
      meta: "רקע וכלים שלא מחליפים את מסלול המבחן",
      lowPriority: true,
      tabs: [
        ["guide", "מדריך מקוצר", "עזר"],
        ["grandma-knowledge", "ידע מורחב", "רק אם תקוע"],
        ["programming-basics", "אבני בסיס", "רקע"],
        ["programming-principles", "עקרונות יסוד", "רקע"],
        ["programming-museum", "מוזיאון", "אדום"],
        ["language-tools", "שפות וכלים", "אדום"],
        ["reward-store", "חנות", "לא עכשיו"],
        ["anatomy", "פירוק קוד", "מתקדם"],
        ["settings", "הגדרות", "מערכת"],
        ["home", "שיעורים", "כללי"],
      ],
    },
  ];
})();
