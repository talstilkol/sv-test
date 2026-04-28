// data/svcollege_builds_nextjs.js
// SVCollege Finish Line 1 - Next.js Mini Build practice.

var SVCOLLEGE_NEXTJS_BUILDS = [
  {
    id: "build_svnext_001",
    conceptKey: "lesson_nextjs::dynamic route",
    level: 5,
    title: "Dynamic product page",
    prompt:
      "כתוב page function שמקבלת params, טוענת product לפי params.id, מחזירה notFound אם אין מוצר, ומרנדרת ProductDetails.",
    starter:
      "export default async function ProductPage({ params }) {\n  // load product\n  // handle missing\n  // render details\n}",
    tests: [
      { regex: "export\\s+default\\s+async\\s+function\\s+ProductPage", description: "מגדיר page async", flags: "" },
      { regex: "params\\.id", description: "משתמש ב-id מה-route", flags: "" },
      { regex: "findById\\s*\\(", description: "טוען resource לפי id", flags: "" },
      { regex: "notFound\\s*\\(", description: "מטפל במשאב חסר", flags: "" },
      { regex: "ProductDetails", description: "מרנדר קומפוננטת פרטים", flags: "" },
    ],
    reference:
      "export default async function ProductPage({ params }) {\n  const product = await products.findById(params.id);\n  if (!product) return notFound();\n  return <ProductDetails product={product} />;\n}",
    hint:
      "הסדר חשוב: params -> load -> missing guard -> render.",
    explanation:
      "dynamic page מחבר URL ל-data lookup ואז למסך.",
    requiredConcepts: ["lesson_nextjs::dynamic route", "lesson_sql_orm::CRUD"],
    requiredTerms: ["params.id", "findById", "notFound"],
    sideExplanation:
      "אל תרנדר מוצר לפני שבדקת שהוא קיים; אחרת תקבל מסך שבור או נתונים לא עקביים.",
  },
  {
    id: "build_svnext_002",
    conceptKey: "lesson_nextjs::route handler",
    level: 6,
    title: "POST route handler בטוח",
    prompt:
      "כתוב POST route handler שיוצר task. הוא חייב לקרוא requireUser, לבצע validateTaskInput, לשמור ownerId מהמשתמש המחובר ולהחזיר Response.json עם status 201.",
    starter:
      "export async function POST(request) {\n  // auth\n  // validate\n  // create\n  // return JSON\n}",
    tests: [
      { regex: "export\\s+async\\s+function\\s+POST\\s*\\(", description: "מגדיר POST route handler", flags: "" },
      { regex: "requireUser\\s*\\(", description: "בודק משתמש מחובר", flags: "" },
      { regex: "validateTaskInput\\s*\\(", description: "מבצע validation", flags: "" },
      { regex: "request\\.json\\s*\\(", description: "קורא JSON מהבקשה", flags: "" },
      { regex: "ownerId\\s*:\\s*user\\.id", description: "משייך בעלות לפי user.id", flags: "" },
      { regex: "status\\s*:\\s*201", description: "מחזיר status 201", flags: "" },
    ],
    reference:
      "export async function POST(request) {\n  const user = await requireUser();\n  const body = validateTaskInput(await request.json());\n  const saved = await tasks.create({ ...body, ownerId: user.id });\n  return Response.json(saved, { status: 201 });\n}",
    hint:
      "אל תיקח ownerId מהלקוח. בעלות נקבעת מה-session או token המאומת.",
    explanation:
      "זה route handler שמכבד את כללי backend: auth, validation, ownership, response.",
    requiredConcepts: ["lesson_nextjs::API route", "lesson_auth_security::authorization", "lesson_18::validation"],
    requiredTerms: ["POST", "request.json", "ownerId", "201"],
    sideExplanation:
      "Next מקצר את ה-API wiring, אבל האחריות לאבטחת הפעולה נשארת שלך.",
  },
  {
    id: "build_svnext_003",
    conceptKey: "lesson_nextjs::metadata API",
    level: 4,
    title: "SEO metadata לעמוד מוצרים",
    prompt:
      "הגדר metadata לעמוד products עם title ו-description, ואז כתוב ProductsPage שמחזיר main עם h1 ורשימת מוצרים.",
    starter:
      "export const metadata = {\n  // title\n  // description\n};\n\nexport default function ProductsPage() {\n  // semantic page\n}",
    tests: [
      { regex: "export\\s+const\\s+metadata\\s*=", description: "מגדיר metadata", flags: "" },
      { regex: "title\\s*:", description: "כולל title", flags: "" },
      { regex: "description\\s*:", description: "כולל description", flags: "" },
      { regex: "<main", description: "משתמש ב-main סמנטי", flags: "" },
      { regex: "<h1", description: "כולל heading ראשי", flags: "" },
      { regex: "ProductList", description: "מרנדר רשימת מוצרים", flags: "" },
    ],
    reference:
      "export const metadata = {\n  title: 'Products',\n  description: 'Browse the product catalog',\n};\n\nexport default function ProductsPage() {\n  return <main><h1>Products</h1><ProductList /></main>;\n}",
    hint:
      "SEO בסיסי מתחיל ב-head נכון ובמבנה HTML סמנטי.",
    explanation:
      "metadata ו-HTML סמנטי נותנים למשתמשים ולמנועי חיפוש להבין את העמוד.",
    requiredConcepts: ["lesson_nextjs::metadata API", "lesson_nextjs::SEO"],
    requiredTerms: ["metadata", "title", "description", "main", "h1"],
    sideExplanation:
      "זה לא קישוט. title, description ו-heading טובים הם חלק מהתפקוד של העמוד.",
  },
];

function appendNextjsBuildsOnce(target, items) {
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
  window.SVCOLLEGE_NEXTJS_BUILDS = SVCOLLEGE_NEXTJS_BUILDS;
  if (!window.QUESTIONS_BUILD) window.QUESTIONS_BUILD = [];
  appendNextjsBuildsOnce(window.QUESTIONS_BUILD, SVCOLLEGE_NEXTJS_BUILDS);
}

if (typeof module !== "undefined") {
  module.exports = { SVCOLLEGE_NEXTJS_BUILDS: SVCOLLEGE_NEXTJS_BUILDS };
}
