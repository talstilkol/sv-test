// data/svcollege_traces_nextjs.js
// SVCollege Finish Line 1 - Next.js Code Trace practice.

var SVCOLLEGE_NEXTJS_TRACES = [
  {
    id: "trace_svnext_001",
    conceptKey: "lesson_nextjs::dynamic route",
    level: 5,
    title: "מעקב אחרי dynamic product page",
    code:
      "export default async function ProductPage({ params }) {\n  const product = await products.findById(params.id);\n  if (!product) return notFound();\n  return <ProductDetails product={product} />;\n}",
    steps: [
      {
        line: 1,
        prompt: "מאיפה מגיע params.id?",
        answer: "מה-dynamic route ב-URL",
        acceptable: ["URL", "dynamic route", "[id]", "params"],
        hint: "הסתכל על נתיב כמו app/products/[id]/page.jsx.",
      },
      {
        line: 2,
        prompt: "איזו פעולה מתבצעת לפני render?",
        answer: "טעינת product לפי id",
        acceptable: ["findById", "טעינת מוצר", "products.findById"],
        hint: "הפונקציה async כי היא מביאה נתונים.",
      },
      {
        line: 3,
        prompt: "מה קורה אם אין product?",
        answer: "notFound",
        acceptable: ["notFound()", "404", "not found"],
        hint: "קרא את תנאי ה-if.",
      },
    ],
    explanation:
      "ה-route הדינמי לוקח id מה-URL, מביא את המשאב, עוצר אם הוא לא קיים, ואז מרנדר פרטים.",
    requiredConcepts: ["lesson_nextjs::dynamic route", "lesson_sql_orm::CRUD"],
    requiredTerms: ["params", "findById", "notFound"],
    sideExplanation:
      "Trace כזה בודק את שרשרת היסוד: URL -> params -> data lookup -> render או 404.",
  },
  {
    id: "trace_svnext_002",
    conceptKey: "lesson_nextjs::route handler",
    level: 5,
    title: "מעקב אחרי POST route handler",
    code:
      "export async function POST(request) {\n  const user = await requireUser();\n  const body = validateTaskInput(await request.json());\n  const saved = await tasks.create({ ...body, ownerId: user.id });\n  return Response.json(saved, { status: 201 });\n}",
    steps: [
      {
        line: 2,
        prompt: "מה הפעולה הראשונה שמגנה על ה-route?",
        answer: "requireUser",
        acceptable: ["requireUser", "auth", "אימות משתמש"],
        hint: "לפני קריאת הקלט בודקים מי המשתמש.",
      },
      {
        line: 3,
        prompt: "למה validateTaskInput חשוב?",
        answer: "כדי לבדוק קלט לפני שמירה",
        acceptable: ["validation", "בדיקת קלט", "validate"],
        hint: "קלט מהלקוח אינו אמין עד שבודקים אותו.",
      },
      {
        line: 4,
        prompt: "מאיפה מגיע ownerId?",
        answer: "user.id",
        acceptable: ["user.id", "מהמשתמש המחובר"],
        hint: "לא לוקחים ownerId מה-body של הלקוח.",
      },
    ],
    explanation:
      "ה-route מראה סדר backend תקין: auth, validation, שיוך בעלות ואז שמירה.",
    requiredConcepts: ["lesson_nextjs::API route", "lesson_auth_security::authorization", "lesson_18::validation"],
    requiredTerms: ["POST", "request.json", "ownerId", "201"],
    sideExplanation:
      "הדרך הבטוחה היא שהשרת קובע בעלות לפי המשתמש המחובר, לא לפי טקסט שנשלח מהדפדפן.",
  },
  {
    id: "trace_svnext_003",
    conceptKey: "lesson_nextjs::client component",
    level: 5,
    title: "מעקב אחרי client boundary קטן",
    code:
      "\"use client\";\n\nexport function FavoriteButton({ productId }) {\n  const [saved, setSaved] = useState(false);\n  return <button onClick={() => setSaved(!saved)}>{saved ? 'Saved' : 'Save'}</button>;\n}",
    steps: [
      {
        line: 1,
        prompt: "מה אומר \"use client\"?",
        answer: "הרכיב רץ בדפדפן",
        acceptable: ["client component", "בדפדפן", "לקוח"],
        hint: "ה-directive מסמן גבול הרצה.",
      },
      {
        line: 4,
        prompt: "איזה state משתנה בלחיצה?",
        answer: "saved",
        acceptable: ["saved", "setSaved"],
        hint: "חפש את useState.",
      },
      {
        line: 5,
        prompt: "למה הרכיב הזה לא חייב להיות כל העמוד?",
        answer: "רק הכפתור אינטראקטיבי",
        acceptable: ["רק הכפתור", "boundary קטן", "אינטראקציה קטנה"],
        hint: "אפשר להשאיר את רוב page כ-server component.",
      },
    ],
    explanation:
      "Client boundary קטן שומר על אינטראקציה בלי להפוך את כל העמוד ל-JavaScript בצד לקוח.",
    requiredConcepts: ["lesson_nextjs::client component", "lesson_nextjs::server component"],
    requiredTerms: ["use client", "useState", "onClick", "bundle"],
    sideExplanation:
      "זה הפטנט החשוב לביצועים: רק החלק שצריך אירועים חי בדפדפן.",
  },
];

function appendNextjsTraceItemsOnce(target, items) {
  var existing = {};
  for (var index = 0; index < target.length; index += 1) {
    existing[target[index].id] = true;
  }
  for (var itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
    if (!existing[items[itemIndex].id]) {
      target.push(items[itemIndex]);
      existing[items[itemIndex].id] = true;
    }
  }
}

if (typeof window !== "undefined") {
  window.SVCOLLEGE_NEXTJS_TRACES = SVCOLLEGE_NEXTJS_TRACES;
  if (!window.QUESTIONS_TRACE) window.QUESTIONS_TRACE = [];
  appendNextjsTraceItemsOnce(window.QUESTIONS_TRACE, SVCOLLEGE_NEXTJS_TRACES);
  if (window.QUESTIONS_BANK) {
    window.QUESTIONS_BANK.trace = window.QUESTIONS_TRACE;
  }
}

if (typeof module !== "undefined") {
  module.exports = { SVCOLLEGE_NEXTJS_TRACES: SVCOLLEGE_NEXTJS_TRACES };
}
