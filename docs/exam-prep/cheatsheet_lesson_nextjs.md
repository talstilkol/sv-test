# Next.js Full-Stack - Routing, SSR, API ו-SEO — דף סיכום למבחן

**מודול SVCollege:** פיתוח Full-Stack עם Next.js - SSR, API Routes, SEO

**תיאור:** איך Next.js מחבר React, routing, שרת, data fetching, SEO ו-deploy לאפליקציית Full Stack אחת.

**מספר מושגים:** 18

---

## מושגים בסיכום

### 1. Next.js

**רמת קושי:** 4/10

**מה זה:** Next.js הוא framework מעל React שמוסיף routing, רינדור בצד שרת, API routes, build ו-deploy מסודר.

**למה Full Stack:** במקום לחבר React app ושרת בנפרד לכל דבר, Next.js נותן מבנה אחד שבו עמודים, נתונים ו-API יכולים לחיות יחד.

**דוגמה:**
```
export default function HomePage() {
  return <main>ברוכים הבאים</main>;
}
```

**הסבר:** קומפוננטת React בתוך קובץ page הופכת לעמוד שנפתח לפי מיקום הקובץ בתיקיית app.

⚠️ **טעות נפוצה:** לחשוב ש-Next.js מחליף את React. הוא משתמש ב-React ומוסיף שכבות שרת, routing ו-build.

**תלוי ב:** `lesson_21::React`

---

### 2. App Router

**רמת קושי:** 4/10

**מה זה:** App Router הוא מודל routing שבו תיקיית app מגדירה עמודים, layouts ו-route handlers לפי מבנה קבצים.

**למה Full Stack:** הוא נותן מבנה צפוי למסכים, אזורי layout משותפים וגבולות בין server/client code.

**דוגמה:**
```
app/
  layout.jsx
  page.jsx
  dashboard/page.jsx
```

**הסבר:** כל תיקייה מייצגת segment ב-URL, וקובץ page מייצג את המסך באותו segment.

⚠️ **טעות נפוצה:** לערבב בין Pages Router הישן לבין App Router בלי להבין איזה conventions הפרויקט משתמש בהם.

**תלוי ב:** `lesson_nextjs::Next.js`

---

### 3. file-system routing

**רמת קושי:** 3/10

**מה זה:** file-system routing אומר שה-URL נוצר ממבנה התיקיות והקבצים, לא מרשימת routes ידנית.

**למה Full Stack:** זה מקטין boilerplate ונותן קשר ברור בין כתובת בדפדפן לבין הקובץ שאחראי עליה.

**דוגמה:**
```
app/about/page.jsx -> /about
app/products/page.jsx -> /products
```

**הסבר:** התיקייה about יוצרת segment בשם about, וקובץ page הוא מה שמרונדר בנתיב הזה.

⚠️ **טעות נפוצה:** ליצור קובץ component רגיל ולצפות שהוא יהפוך ל-route בלי page/layout/route במקום הנכון.

**תלוי ב:** `lesson_nextjs::App Router`

---

### 4. dynamic route

**רמת קושי:** 4/10

**מה זה:** dynamic route הוא נתיב עם חלק משתנה, למשל product id, שמוגדר באמצעות סוגריים מרובעים בשם התיקייה.

**למה Full Stack:** כמעט כל אפליקציה צריכה עמודי פריט: מוצר, פוסט, משתמש או הזמנה לפי id.

**דוגמה:**
```
app/products/[id]/page.jsx

export default function ProductPage({ params }) {
  return <h1>Product {params.id}</h1>;
}
```

**הסבר:** החלק [id] ב-URL נכנס ל-params.id, ולכן אותו קובץ יכול לשרת הרבה מוצרים.

⚠️ **טעות נפוצה:** לקחת id מה-URL בלי validation או בלי לבדוק שהמשאב באמת קיים.

**תלוי ב:** `lesson_17::Request`

---

### 5. layout

**רמת קושי:** 4/10

**מה זה:** layout הוא wrapper קבוע שמקיף page ויכול להחזיק header, sidebar, provider או מבנה משותף.

**למה Full Stack:** layout מונע שכפול של UI ונותן מקום טבעי למבנה שחוזר בכל אזור באפליקציה.

**דוגמה:**
```
export default function DashboardLayout({ children }) {
  return <section><nav>Menu</nav>{children}</section>;
}
```

**הסבר:** children הוא העמוד הפנימי. ה-layout נשאר סביבו באזור הרלוונטי.

⚠️ **טעות נפוצה:** להעתיק header/sidebar לכל page במקום לשים אותם ב-layout משותף.

**תלוי ב:** `lesson_21::props`

---

### 6. page

**רמת קושי:** 3/10

**מה זה:** page הוא הקובץ שמגדיר מה מוצג בנתיב מסוים.

**למה Full Stack:** הוא נקודת הכניסה למסך: שם מחברים UI, קריאת נתונים ופעולות שהמשתמש רואה.

**דוגמה:**
```
export default async function ProductsPage() {
  const products = await getProducts();
  return <ProductList items={products} />;
}
```

**הסבר:** page יכול להיות async בצד שרת, להביא נתונים ואז להחזיר JSX.

⚠️ **טעות נפוצה:** לשים state אינטראקטיבי בתוך server component בלי להוסיף גבול client component.

**תלוי ב:** `lesson_nextjs::file-system routing`

---

### 7. server component

**רמת קושי:** 5/10

**מה זה:** server component רץ בצד שרת ויכול לקרוא database או קבצי שרת בלי לשלוח את הקוד הזה לדפדפן.

**למה Full Stack:** זה מצמצם JavaScript בצד לקוח ומאפשר להביא נתונים קרוב לשרת בלי לחשוף secrets.

**דוגמה:**
```
export default async function OrdersPage() {
  const orders = await db.orders.findMany();
  return <OrdersTable orders={orders} />;
}
```

**הסבר:** הקריאה ל-db נשארת בצד שרת, והדפדפן מקבל תוצאה מרונדרת ולא את קוד הגישה ל-db.

⚠️ **טעות נפוצה:** להשתמש ב-useState או onClick בתוך server component. אינטראקציה דורשת client component.

**תלוי ב:** `lesson_sql_orm::database`

---

### 8. client component

**רמת קושי:** 5/10

**מה זה:** client component הוא רכיב React שרץ בדפדפן ומותר לו להשתמש ב-state, effects ואירועי click.

**למה Full Stack:** הוא הגבול שבו מוסיפים אינטראקציה אמיתית למסך שרובו יכול להישאר server-rendered.

**דוגמה:**
```
"use client";

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

**הסבר:** ה-directive "use client" אומר ל-Next לשלוח את הרכיב וה-JavaScript שלו לדפדפן.

⚠️ **טעות נפוצה:** להפוך עץ שלם ל-client component בלי צורך, וכך להגדיל bundle ולהפסיד יתרון של server components.

**תלוי ב:** `lesson_22::useState`

---

### 9. route handler

**רמת קושי:** 5/10

**מה זה:** route handler הוא endpoint בתוך app שמחזיר Response ל-HTTP request, למשל GET או POST.

**למה Full Stack:** הוא מאפשר לבנות API קטן בתוך אותו פרויקט Next בלי להקים Express app נפרד לכל פעולה.

**דוגמה:**
```
export async function GET() {
  return Response.json({ ok: true });
}
```

**הסבר:** קובץ route.js מייצא פונקציות לפי HTTP method ומחזיר Response.

⚠️ **טעות נפוצה:** לשים route handler בתוך page או להחזיר JSX במקום Response.

**תלוי ב:** `lesson_17::REST API`

---

### 10. API route

**רמת קושי:** 4/10

**מה זה:** API route הוא endpoint שה-frontend יכול לקרוא כדי לקבל או לשנות נתונים.

**למה Full Stack:** באפליקציית Full Stack צריך גבול ברור בין UI לבין פעולות שרת כמו שמירה, אימות ושליחת נתונים.

**דוגמה:**
```
await fetch('/api/tasks', { method: 'POST', body: JSON.stringify(task) });
```

**הסבר:** הלקוח שולח בקשה ל-endpoint, והשרת מחליט מה מותר, מה נשמר ומה חוזר.

⚠️ **טעות נפוצה:** לחשוב ש-API route בטוח רק כי הוא בתוך Next. עדיין צריך validation ו-authorization.

**תלוי ב:** `lesson_auth_security::authorization`

---

### 11. server action

**רמת קושי:** 6/10

**מה זה:** server action היא פונקציית שרת שאפשר להפעיל מתוך form או client boundary בלי לבנות endpoint ידני לכל פעולה.

**למה Full Stack:** היא מקצרת פעולות CRUD, אבל עדיין חייבים validation, auth וגבולות ברורים.

**דוגמה:**
```
"use server";

export async function createTask(formData) {
  await requireUser();
  return tasks.create({ title: formData.get('title') });
}
```

**הסבר:** הפונקציה רצה בצד שרת, ולכן היא יכולה לקרוא auth ו-database בלי לחשוף secret לדפדפן.

⚠️ **טעות נפוצה:** להניח ש-server action מבטלת צורך בבדיקות קלט והרשאות.

**תלוי ב:** `lesson_auth_security::middleware guard`

---

### 12. SSR

**רמת קושי:** 5/10

**מה זה:** SSR הוא Server-Side Rendering: השרת מרנדר HTML בזמן בקשה.

**למה Full Stack:** SSR טוב לעמודים שצריכים נתונים עדכניים, SEO ראשוני וחוויית טעינה מהירה יותר מתוכן ריק.

**דוגמה:**
```
export const dynamic = 'force-dynamic';
```

**הסבר:** הגדרה כזו אומרת ל-Next לא להשתמש בתוצאה סטטית עבור המסך הזה.

⚠️ **טעות נפוצה:** להשתמש ב-SSR לכל דבר גם כשנתונים כמעט לא משתנים, ולשלם עלות שרת מיותרת.

**תלוי ב:** `lesson_17::HTTP`

---

### 13. SSG

**רמת קושי:** 5/10

**מה זה:** SSG הוא Static Site Generation: HTML נבנה בזמן build ונשלח מהר מאוד למשתמשים.

**למה Full Stack:** עמודים שיווקיים, docs או תוכן יציב נהנים ממהירות גבוהה ועלות שרת נמוכה.

**דוגמה:**
```
export async function generateStaticParams() {
  return [{ slug: 'intro' }, { slug: 'pricing' }];
}
```

**הסבר:** Next יודע מראש אילו עמודים סטטיים לבנות עבור dynamic route.

⚠️ **טעות נפוצה:** לבנות סטטית מידע שמשתנה לכל משתמש או דורש הרשאות.

**תלוי ב:** `lesson_nextjs::dynamic route`

---

### 14. ISR

**רמת קושי:** 6/10

**מה זה:** ISR הוא Incremental Static Regeneration: דף סטטי מתרענן אחרי זמן מוגדר בלי build מלא לכל האתר.

**למה Full Stack:** הוא שימושי לתוכן שמתעדכן מדי פעם ורוצה ליהנות ממהירות סטטית עם רענון מבוקר.

**דוגמה:**
```
export const revalidate = 300;
```

**הסבר:** העמוד יכול להישאר סטטי, אבל Next ירענן אותו אחרי פרק זמן מוגדר.

⚠️ **טעות נפוצה:** להשתמש ב-ISR עבור מידע פרטי או מידע שחייב להיות עקבי בזמן אמת.

**תלוי ב:** `lesson_nextjs::SSG`

---

### 15. metadata API

**רמת קושי:** 4/10

**מה זה:** metadata API מגדיר title, description ותגיות חברתיות בצורה מובנית לעמודים.

**למה Full Stack:** SEO ושיתוף ברשתות תלויים במטא-דאטה נכון, ולא רק במה שהמשתמש רואה בעמוד.

**דוגמה:**
```
export const metadata = {
  title: 'Products',
  description: 'Catalog page'
};
```

**הסבר:** Next מתרגם את האובייקט לתגיות head מתאימות.

⚠️ **טעות נפוצה:** להשאיר את כל העמודים עם אותו title או בלי description ברור.

**תלוי ב:** `lesson_html_css_foundations::HTML document`

---

### 16. SEO

**רמת קושי:** 4/10

**מה זה:** SEO הוא סט החלטות שעוזרות למנועי חיפוש להבין את העמוד: HTML סמנטי, title, description, links ותוכן נגיש.

**למה Full Stack:** אפליקציה יפה שלא ניתנת להבנה או סריקה מפסידה משתמשים לפני שהם מגיעים אליה.

**דוגמה:**
```
<main>
  <h1>Products</h1>
  <p>Browse current products.</p>
</main>
```

**הסבר:** מבנה סמנטי ו-heading ברור עוזרים גם לנגישות וגם לסריקה.

⚠️ **טעות נפוצה:** לחשוב ש-SEO הוא רק keywords. בפועל זה גם ביצועים, מבנה, קישורים ונגישות.

**תלוי ב:** `lesson_nextjs::metadata API`

---

### 17. image optimization

**רמת קושי:** 4/10

**מה זה:** image optimization הוא טיפול בגודל, פורמט וטעינה של תמונות כדי לא להכביד על הדף.

**למה Full Stack:** תמונה כבדה יכולה להרוס ביצועים גם אם הקוד כתוב טוב.

**דוגמה:**
```
<Image src="/hero.png" alt="Product dashboard" width={1200} height={600} priority />
```

**הסבר:** קומפוננטת Image עוזרת להגדיר מידות, alt וטעינה יעילה יותר.

⚠️ **טעות נפוצה:** להעלות תמונות ענקיות בלי width/height או alt, ואז לקבל layout shift וטעינה איטית.

**תלוי ב:** `lesson_html_css_foundations::accessibility basics`

---

### 18. Vercel deploy

**רמת קושי:** 4/10

**מה זה:** Vercel deploy הוא תהליך פרסום שבו פרויקט Next נבנה ומועלה לסביבת hosting שמבינה את Next.js.

**למה Full Stack:** SVCollege דורש לא רק קוד עובד מקומית, אלא גם הבנה איך להריץ build, env vars ו-preview/production.

**דוגמה:**
```
npm run build
# deploy דרך Git integration או CLI מאושר בפרויקט
```

**הסבר:** build בודק שהאפליקציה יכולה להיבנות לפני שמעלים אותה לסביבה חיצונית.

⚠️ **טעות נפוצה:** לשמור secrets בקוד או להניח שמה שעבד ב-dev יעבוד ב-production בלי env vars תקינים.

**תלוי ב:** `lesson_tooling_git::GitHub workflow`

---
