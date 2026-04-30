// data/svcollege_traces_lesson12_activity.js
// P6.3.1 — real Trace activity coverage for SVCollege lesson 12 gaps.

var SVCOLLEGE_LESSON12_ACTIVITY_TRACES = [
  {
    id: "trace_l12_new_array_001",
    conceptKey: "lesson_12::יצירת מערך חדש (new array)",
    level: 3,
    title: "יצירת מערך חדש עם ליטרל ו-spread",
    code:
      "const base = [1, 2];\n" +
      "const created = [...base, 3];\n" +
      "console.log(base.join(','));\n" +
      "console.log(created.join(','));",
    steps: [
      {
        line: 2,
        prompt: "איזה מערך נוצר בתוך created?",
        answer: "1,2,3",
        acceptable: ["1, 2, 3", "1,2,3", "[1,2,3]"],
        hint: "spread פורש את איברי base ואז מוסיפים 3 בסוף.",
      },
      {
        line: 3,
        prompt: "מה יודפס עבור base?",
        answer: "1,2",
        acceptable: ["1, 2", "1,2", "[1,2]"],
        hint: "created הוא מערך חדש, ולכן base לא השתנה.",
      },
    ],
    explanation:
      "מערך חדש נוצר כאשר שמים איברים בתוך [] או פורשים מערך קיים עם spread לתוך []. המקור נשאר אותו מערך.",
    requiredConcepts: ["lesson_12::יצירת מערך חדש (new array)", "lesson_12::spread"],
    requiredTerms: ["array literal", "spread", "new reference"],
  },
  {
    id: "trace_l12_create_from_existing_001",
    conceptKey: "lesson_12::יצירת מערך חדש מתוך קיים",
    level: 3,
    title: "map יוצרת מערך שמות מתוך מערך משתמשים",
    code:
      "const users = [{ name: 'Dana' }, { name: 'Avi' }];\n" +
      "const names = users.map((user) => user.name);\n" +
      "console.log(names.join('|'));\n" +
      "console.log(users.length);",
    steps: [
      {
        line: 2,
        prompt: "מה נכנס למערך names?",
        answer: "Dana|Avi",
        acceptable: ["Dana, Avi", "Dana|Avi", "['Dana','Avi']"],
        hint: "map מחזירה ערך אחד לכל user: את user.name.",
      },
      {
        line: 4,
        prompt: "מה אורך users אחרי map?",
        answer: "2",
        acceptable: ["2"],
        hint: "map לא משנה את מערך המקור.",
      },
    ],
    explanation:
      "map היא הדרך הישירה ליצור מערך חדש מתוך מערך קיים תוך שינוי הצורה של כל איבר.",
    requiredConcepts: ["lesson_12::יצירת מערך חדש מתוך קיים", "lesson_12::map"],
    requiredTerms: ["map", "projection", "immutability"],
  },
  {
    id: "trace_l12_condition_filter_001",
    conceptKey: "lesson_12::סינון לפי תנאי",
    level: 3,
    title: "filter עם שני תנאים",
    code:
      "const products = [\n" +
      "  { name: 'A', price: 80, inStock: true },\n" +
      "  { name: 'B', price: 120, inStock: true },\n" +
      "  { name: 'C', price: 60, inStock: false }\n" +
      "];\n" +
      "const visible = products.filter((p) => p.inStock && p.price < 100);\n" +
      "console.log(visible.map((p) => p.name).join(','));",
    steps: [
      {
        line: 6,
        prompt: "איזה מוצר עובר גם inStock וגם price < 100?",
        answer: "A",
        acceptable: ["A"],
        hint: "B יקר מדי, C לא במלאי, ולכן רק A עובר.",
      },
      {
        line: 7,
        prompt: "מה יודפס בקונסול?",
        answer: "A",
        acceptable: ["A"],
        hint: "אחרי הסינון ממפים רק לשם המוצר.",
      },
    ],
    explanation:
      "סינון לפי תנאי משתמש ב-predicate שמחזיר true/false. כאן חייבים לעבור שני תנאים יחד עם &&.",
    requiredConcepts: ["lesson_12::סינון לפי תנאי", "lesson_12::filter"],
    requiredTerms: ["predicate", "filter", "&&"],
  },
  {
    id: "trace_l12_index_values_001",
    conceptKey: "lesson_12::עבודה עם ערכים לפי אינדקס",
    level: 3,
    title: "קריאה ועדכון לפי אינדקס",
    code:
      "const colors = ['red', 'green', 'blue'];\n" +
      "colors[1] = 'yellow';\n" +
      "console.log(colors[0]);\n" +
      "console.log(colors[1]);\n" +
      "console.log(colors.length);",
    steps: [
      {
        line: 2,
        prompt: "איזה ערך הוחלף באינדקס 1?",
        answer: "green",
        acceptable: ["green"],
        hint: "אינדקס 1 הוא האיבר השני במערך.",
      },
      {
        line: 4,
        prompt: "מה יודפס עבור colors[1] אחרי העדכון?",
        answer: "yellow",
        acceptable: ["yellow"],
        hint: "הערך באינדקס 1 עודכן ישירות.",
      },
      {
        line: 5,
        prompt: "מה אורך המערך אחרי החלפה?",
        answer: "3",
        acceptable: ["3"],
        hint: "החלפה לא מוסיפה ולא מסירה איברים.",
      },
    ],
    explanation:
      "גישה לפי אינדקס מאפשרת קריאה ועדכון של מיקום מדויק במערך. החלפה ישירה משנה את המערך הקיים.",
    requiredConcepts: ["lesson_12::עבודה עם ערכים לפי אינדקס", "lesson_12::index"],
    requiredTerms: ["index", "assignment", "length"],
  },
  {
    id: "trace_l12_array_001",
    conceptKey: "lesson_12::array",
    level: 2,
    title: "array יכול להכיל סוגים שונים",
    code:
      "const mixed = [42, 'hello', true, [1, 2]];\n" +
      "console.log(mixed.length);\n" +
      "console.log(mixed[3][0]);",
    steps: [
      {
        line: 2,
        prompt: "כמה איברים יש במערך mixed?",
        answer: "4",
        acceptable: ["4"],
        hint: "המערך הפנימי [1, 2] הוא איבר אחד בתוך mixed.",
      },
      {
        line: 3,
        prompt: "מה הערך של mixed[3][0]?",
        answer: "1",
        acceptable: ["1"],
        hint: "mixed[3] הוא המערך [1, 2], ובתוכו אינדקס 0 הוא 1.",
      },
    ],
    explanation:
      "Array ב-JavaScript שומר סדר ויכול להכיל ערכים מסוגים שונים, כולל מערך בתוך מערך.",
    requiredConcepts: ["lesson_12::array", "lesson_12::index"],
    requiredTerms: ["array", "nested array", "length"],
  },
  {
    id: "trace_l12_index_001",
    conceptKey: "lesson_12::index",
    level: 2,
    title: "האיבר האחרון הוא length - 1",
    code:
      "const fruits = ['apple', 'banana', 'orange'];\n" +
      "const lastIndex = fruits.length - 1;\n" +
      "console.log(lastIndex);\n" +
      "console.log(fruits[lastIndex]);\n" +
      "console.log(fruits[fruits.length]);",
    steps: [
      {
        line: 2,
        prompt: "מה הערך של lastIndex?",
        answer: "2",
        acceptable: ["2"],
        hint: "length הוא 3, ולכן 3 - 1 = 2.",
      },
      {
        line: 4,
        prompt: "מה האיבר האחרון במערך?",
        answer: "orange",
        acceptable: ["orange"],
        hint: "האינדקס האחרון הוא 2.",
      },
      {
        line: 5,
        prompt: "מה מחזירה גישה ל-fruits[fruits.length]?",
        answer: "undefined",
        acceptable: ["undefined"],
        hint: "fruits[3] לא קיים כי האינדקסים הם 0, 1, 2.",
      },
    ],
    explanation:
      "אינדקסים מתחילים ב-0, ולכן האיבר האחרון נמצא תמיד ב-length - 1 ולא ב-length.",
    requiredConcepts: ["lesson_12::index", "lesson_12::array"],
    requiredTerms: ["index", "length - 1", "undefined"],
  },
  {
    id: "trace_l12_lowercase_001",
    conceptKey: "lesson_12::lowercase",
    level: 3,
    title: "lowercase לנרמול חיפוש",
    code:
      "const search = 'REACT';\n" +
      "const items = ['React', 'Vue'];\n" +
      "const found = items.filter((item) => item.toLowerCase() === search.toLowerCase());\n" +
      "console.log(found.join(','));",
    steps: [
      {
        line: 3,
        prompt: "למה React עובר את ההשוואה?",
        answer: "שני הצדדים הופכים ל-react",
        acceptable: ["react", "שני הצדדים react", "both become react"],
        hint: "toLowerCase מנרמל גם את item וגם את search לאותיות קטנות.",
      },
      {
        line: 4,
        prompt: "מה יודפס בקונסול?",
        answer: "React",
        acceptable: ["React"],
        hint: "הערך המקורי מתוך items נשמר במערך found.",
      },
    ],
    explanation:
      "toLowerCase מחזירה מחרוזת חדשה באותיות קטנות. זה שימושי להשוואה שלא תלויה באותיות גדולות/קטנות.",
    requiredConcepts: ["lesson_12::lowercase", "lesson_12::filter"],
    requiredTerms: ["toLowerCase", "normalization", "case-insensitive"],
  },
  {
    id: "trace_l12_uppercase_001",
    conceptKey: "lesson_12::uppercase",
    level: 3,
    title: "uppercase יוצר מחרוזת חדשה",
    code:
      "const name = 'tal cohen';\n" +
      "const upper = name.toUpperCase();\n" +
      "console.log(upper);\n" +
      "console.log(name);",
    steps: [
      {
        line: 2,
        prompt: "מה הערך של upper?",
        answer: "TAL COHEN",
        acceptable: ["TAL COHEN"],
        hint: "toUpperCase מחזירה מחרוזת חדשה באותיות גדולות.",
      },
      {
        line: 4,
        prompt: "מה יודפס עבור name המקורי?",
        answer: "tal cohen",
        acceptable: ["tal cohen"],
        hint: "מחרוזות הן immutable, ולכן המקור לא השתנה.",
      },
    ],
    explanation:
      "toUpperCase לא משנה את המחרוזת המקורית. היא מחזירה ערך string חדש באותיות גדולות.",
    requiredConcepts: ["lesson_12::uppercase"],
    requiredTerms: ["toUpperCase", "string", "immutable"],
  },
];

(function appendLesson12ActivityTraces() {
  if (typeof window === "undefined") return;
  if (!window.QUESTIONS_TRACE) window.QUESTIONS_TRACE = [];
  const existing = new Set(window.QUESTIONS_TRACE.map((item) => item && item.id).filter(Boolean));
  SVCOLLEGE_LESSON12_ACTIVITY_TRACES.forEach((item) => {
    if (!existing.has(item.id)) window.QUESTIONS_TRACE.push(item);
  });
  if (window.QUESTIONS_BANK) {
    window.QUESTIONS_BANK.trace = window.QUESTIONS_TRACE;
  }
})();
