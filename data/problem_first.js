// data/problem_first.js — AUDIT-FIX-12 Problem-First Discovery
// Start from an observable product problem, then map it to the concept.

var PROBLEM_FIRST = {
  "lesson_22::useState": {
    title: "המשתמש לוחץ והמספר לא זז",
    userProblem: "במסך Counter, המשתמש לוחץ על הכפתור ורואה אותו מספר.",
    clues: ["אין שגיאת console", "ה-handler כן רץ", "המסך לא מרנדר מחדש"],
    discoveryPath: [
      "בדוק אם הערך נשמר במשתנה רגיל.",
      "בדוק אם קיימת קריאה ל-setState.",
      "אם אין setState, React לא יודע שהערך השתנה.",
    ],
    conceptLink: "useState הוא הכלי שמחבר ערך ל-render.",
    successSignal: "לחיצה אחת משנה state ומייצרת render חדש.",
  },

  "lesson_24::useEffect": {
    title: "המסך נהיה איטי אחרי פתיחה",
    userProblem: "רשימת משתמשים נטענת שוב ושוב והדפדפן מרגיש כבד.",
    clues: ["Network מציג קריאות חוזרות", "setState נמצא בתוך effect", "אין deps array או deps לא יציבים"],
    discoveryPath: [
      "פתח Network וספור קריאות אחרי render אחד.",
      "אתר useEffect שמפעיל טעינה.",
      "בדוק את dependency array ואת הערכים בתוכה.",
    ],
    conceptLink: "useEffect חייב תנאי ריצה ברור דרך deps.",
    successSignal: "טעינה ראשונית רצה פעם אחת או רק כשה-dep האמיתי משתנה.",
  },

  "lesson_22::immutable": {
    title: "פריט נוסף לנתונים אבל לא למסך",
    userProblem: "אחרי הוספת todo, בדיבאגר המערך גדל אבל UI לא מתעדכן.",
    clues: ["יש push או splice", "setState מקבל את אותו array", "אין reference חדש"],
    discoveryPath: [
      "חפש פעולות mutation על state.",
      "בדוק אם setState מקבל אובייקט/מערך חדש.",
      "החלף mutation ב-spread, map או filter.",
    ],
    conceptLink: "immutability מייצרת reference חדש ש-React מזהה.",
    successSignal: "אחרי setState, Object.is בין הישן לחדש הוא false.",
  },

  "lesson_21::JSX": {
    title: "הקומפוננטה לא מתקמפלת",
    userProblem: "הקוד נראה כמו HTML תקין, אבל React מסמן שגיאת JSX.",
    clues: ["יש class במקום className", "יש if ישיר בתוך return", "יש style כמחרוזת במקום object"],
    discoveryPath: [
      "זכור ש-JSX הוא JavaScript, לא HTML רגיל.",
      "בדוק מילים שמורות כמו class.",
      "בדוק שכל ביטוי בתוך JSX נמצא בתוך סוגריים מסולסלים.",
    ],
    conceptLink: "JSX הוא תחביר שמתורגם ל-JavaScript.",
    successSignal: "הקומפוננטה מתקמפלת וה-DOM מקבל את ה-attributes הנכונים.",
  },

  "lesson_23::Router": {
    title: "מעבר עמוד מאפס את האפליקציה",
    userProblem: "ניווט פנימי מוחק state וגורם לטעינה מלאה.",
    clues: ["משתמשים ב-a href", "אין BrowserRouter", "Routes לא עטוף נכון"],
    discoveryPath: [
      "בדוק אם הלחיצה עושה reload מלא.",
      "החלף a ב-Link לניווט פנימי.",
      "ודא שיש Route מתאים ל-path.",
    ],
    conceptLink: "Router מחליף קומפוננטות לפי URL בלי לצאת מה-SPA.",
    successSignal: "ה-URL משתנה בלי refresh וה-state המקומי נשמר.",
  },

  "lesson_11::map": {
    title: "רשימת שמות מציגה ריקים",
    userProblem: "המערך החדש באורך נכון, אבל כל הערכים undefined.",
    clues: ["callback עם { }", "אין return", "console בתוך callback כן רץ"],
    discoveryPath: [
      "בדוק אם map מחזיר ערך בכל איטרציה.",
      "אם יש בלוק, הוסף return.",
      "אם הביטוי קצר, השתמש ב-return implicit.",
    ],
    conceptLink: "map בונה מערך חדש מהערכים שה-callback מחזיר.",
    successSignal: "כל item במערך החדש הוא הערך המחושב, לא undefined.",
  },

  "lesson_15::Promise": {
    title: "שגיאת טעינה לא מוצגת",
    userProblem: "כשהפעולה async נכשלת, המשתמש נשאר מול מצב טעינה.",
    clues: ["יש then בלי catch", "אין state לשגיאה", "ה-loading לא נסגר בכשל"],
    discoveryPath: [
      "בדוק מה קורה במסלול reject.",
      "הוסף catch או try/catch.",
      "עדכן גם error וגם loading במסלול הכשל.",
    ],
    conceptLink: "Promise יכול להסתיים בהצלחה או בכישלון, ושני המסלולים צריכים טיפול.",
    successSignal: "כשל מציג הודעת שגיאה ומפסיק את מצב הטעינה.",
  },

  "lesson_17::REST API": {
    title: "הלקוח מקבל תשובה לא צפויה",
    userProblem: "הטופס נשלח, אבל הלקוח לא יודע אם נוצר פריט.",
    clues: ["השרת תמיד מחזיר 200", "אין status ליצירה", "התשובה לא כוללת את הפריט החדש"],
    discoveryPath: [
      "בדוק method ו-route.",
      "ודא שיש validation בסיסי ל-body.",
      "החזר status שמתאר את הפעולה ותוכן JSON ברור.",
    ],
    conceptLink: "REST API מתקשר דרך resource, method, status ו-body.",
    successSignal: "יצירה מחזירה 201 ו-JSON של הפריט שנוצר.",
  },
};
