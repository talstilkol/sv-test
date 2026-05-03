# טעויות נפוצות במבחן SVCollege Full Stack

רשימה ממוקדת של טעויות שמופיעות במבחן. מחולק לפי שיעור. קרא לפני המבחן ובחזרה.

---

## AI Engineering - OpenAI, Vercel AI SDK, RAG ו-Agents

1. **OpenAI API** — לקרוא ל-API ישירות מהדפדפן ולחשוף את OPENAI_API_KEY למשתמשים.
2. **Vercel AI SDK** — להשתמש ב-SDK בצד לקוח במקום בצד שרת, או לשכוח לטפל בשגיאות ובמגבלות קצב.
3. **LangChain** — להוסיף orchestration כבדה בשביל פעולה פשוטה שאפשר לבצע בקריאה אחת ברורה.
4. **model selection** — להשתמש תמיד במודל החזק ביותר גם למשימות פשוטות, ואז לשלם ב-latency ועלות.
5. **prompt messages** — לשים את כל הכללים בתוך הודעת user ולא להפריד בין הוראות מערכת לקלט משתמש.
6. **structured output** — לבקש 'תחזיר JSON' אבל לא לאמת את התוצאה לפני שמשתמשים בה.
7. **streaming response** — לערבב streaming עם פעולות שחייבות JSON מלא וסופי בלי parser מתאים.
8. **token budget** — להדביק את כל הידע לפרומפט במקום לבצע retrieval וסינון.
9. **embeddings** — לחשוב ש-embedding הוא תשובה. הוא רק ייצוג לחיפוש והשוואה.
10. **vector store** — לשמור vector בלי metadata ואז לא לדעת להסביר למשתמש מאיפה התשובה הגיעה.
11. **RAG** — להניח ש-RAG תמיד נכון. אם retrieval גרוע, התשובה עדיין תהיה גרועה.
12. **chunking** — לחתוך כל 500 תווים בלי להתחשב בכותרות, קוד או הקשר.
13. **retrieval ranking** — לשלוח את כל matches למודל בלי threshold ובלי סדר עדיפויות.
14. **tool calling** — לתת לכלי לבצע פעולה מסוכנת בלי validation, permissions ו-audit log.
15. **agent loop** — לקרוא לכל רצף tool calls בשם agent בלי לעצור, למדוד ולבדוק הרשאות.
16. **guardrails** — לסמוך על prompt בלבד במקום לאכוף גבולות גם בקוד.
17. **hallucination check** — להציג כל פלט של מודל כאמת בלי מקור, confidence או בדיקת סתירות.
18. **evaluation** — לבדוק רק ידנית שאלה אחת ואז לשנות prompt לכל המשתמשים.
19. **fine-tuning boundary** — לנסות fine-tuning כדי להוסיף ידע שמתעדכן כל שבוע, במקום לבנות retrieval נכון.

## Auth & Security - אימות, הרשאות וגבולות אבטחה

1. **authentication** — לבלבל authentication עם authorization. קודם מזהים מי המשתמש, ורק אחר כך מחליטים מה מותר לו לעשות.
2. **authorization** — להסתפק בכך שיש token תקין. token מוכיח זהות, לא בהכרח בעלות על המשאב.
3. **session** — לשמור יותר מדי מידע רגיש בתוך session או לא להגדיר לה תפוגה.
4. **cookie** — לחשוב שכל cookie בטוחה. בלי flags נכונים היא עלולה להיחשף או להישלח בהקשר לא רצוי.
5. **secure cookie** — לשמור token רגיש ב-cookie בלי httpOnly או בלי תאריך תפוגה ברור.
6. **JWT** — לשים ב-JWT מידע סודי או להאמין ל-payload בלי verify.
7. **access token** — לתת access token ארוך מדי או לשמור אותו במקום נגיש ל-XSS.
8. **refresh token** — לשמור refresh token באותו מקום כמו access token או לא לבטל אותו ביציאה.
9. **OAuth** — לדלג על בדיקת state או לבצע token exchange בצד הלקוח עם secret.
10. **provider auth** — לחשוב שה-provider פוטר מבדיקת authorization באפליקציה.
11. **password hashing** — לשמור סיסמה כטקסט רגיל או להצפין אותה בצורה שאפשר לפענח חזרה.
12. **bcrypt** — להשתמש ב-hash מהיר מדי לסיסמאות או לקבוע cost גבוה שמפיל את השרת.
13. **CSRF** — להגן רק על login ולשכוח פעולות update/delete.
14. **XSS boundary** — לפתור auth ואז לחשוף אותו דרך XSS שמאפשר לגנוב session או לבצע פעולות.
15. **CORS** — לשים origin: '*' יחד עם credentials או לפתוח לכל העולם בלי צורך.
16. **middleware guard** — לשכוח לשים guard על route רגיש כי הבדיקה מפוזרת בקבצים שונים.
17. **Supabase Auth** — להסתמך רק על UI שמסתיר כפתור במקום לאכוף הרשאות בשרת או ב-RLS.
18. **Firebase Auth** — לסמוך על userId שנשלח מהלקוח בלי verify provider token.
19. **Kinde/Appwrite** — לבנות authorization סביב שם provider במקום סביב rules עסקיים של האפליקציה.

## Design Systems - Tailwind, shadcn/UI ו-Accessible Primitives

1. **shadcn/UI** — לחשוב ש-shadcn/UI היא ספריית npm רגילה. בפועל מעתיקים קומפוננטות לקוד הפרויקט.
2. **Radix primitives** — לבנות modal מ-div פשוט בלי focus trap, Esc close או ARIA.
3. **accessible primitive** — להחליף button ב-div clickable ולאבד semantic behavior.
4. **design tokens** — לפזר hex/px ידניים בכל קומפוננטה ואז לאבד עקביות.
5. **component variants** — להוסיף className אד-הוק לכל שימוש במקום להגדיר variant שחוזר במערכת.
6. **cn helper** — לבנות strings ארוכים עם + ואז ליצור classes לא קריאים או שבורים.
7. **cva** — להגדיר variant בלי default ואז לקבל קומפוננטה לא צפויה בכל שימוש.
8. **asChild slot** — לעשות nested interactive elements כמו button בתוך a, דבר שפוגע בנגישות.
9. **form field composition** — להציג placeholder במקום label ואז לפגוע בנגישות ובהבנת הטופס.
10. **theme tokens** — להגדיר dark mode ידנית בכל קומפוננטה במקום להחליף tokens.
11. **component registry** — ליצור Button חדש בכל feature במקום להשתמש ברכיב shared.
12. **design system testing** — לבדוק רק className ולא לבדוק שהרכיב שמיש למשתמש.

## DevOps Foundations - Vercel, Docker, CI/CD ו-Testing

1. **production readiness** — לחשוב ש-dev server עובד שווה production עובד. production מפעיל build, env ו-cache בצורה אחרת.
2. **environment variables** — לשמור secret בתוך קובץ JS או לדחוף .env פרטי ל-Git.
3. **Vercel deploy** — להניח ש-env vars קיימים ב-Vercel כי הם קיימים אצלך ב-local.
4. **preview deployment** — לדלג על preview ולמזג שינוי שלא נבדק בדפדפן אמיתי.
5. **build command** — להסתפק ב-npm run dev, שלא בודק production bundle.
6. **Docker** — לחשוב ש-Docker הוא virtual machine מלא. Container משתף kernel אבל מבודד process/files/network.
7. **Dockerfile** — להעתיק את כל הפרויקט לפני npm ci ואז לשבור cache בכל שינוי קטן.
8. **image** — לבלבל בין image לבין container. image הוא התבנית; container הוא תהליך שרץ ממנה.
9. **container** — לשמור מידע חשוב בתוך container בלי volume או database חיצוני.
10. **Docker Compose** — לחשוב ש-compose הוא production orchestrator מלא. הוא בעיקר נוח ל-dev וסביבות קטנות.
11. **service** — להשתמש ב-localhost מתוך container כדי להגיע ל-db שנמצא ב-container אחר.
12. **volume** — להריץ database בלי volume ואז לאבד נתונים כשה-container נמחק.
13. **health check** — להחזיר ok תמיד גם כשה-database נפל, ואז להסתיר תקלה אמיתית.
14. **CI** — להריץ CI רק אחרי merge במקום לפני merge.
15. **CD** — לפרוס ידנית בלי קשר לתוצאות CI.
16. **smoke test** — לקרוא ל-smoke test בדיקה מלאה. הוא שער מהיר, לא תחליף ל-E2E עמוק.
17. **release checklist** — לסמוך על זיכרון במקום checklist כתוב.

## Nest.js Bridge - Modules, Controllers, Providers ו-DI

1. **Nest.js** — לחשוב ש-Nest מחליף Node. הוא רץ על Node ומוסיף שכבת ארגון מעל HTTP framework.
2. **module** — לזרוק את כל ה-providers ב-AppModule במקום לבנות modules לפי domain.
3. **controller** — לכתוב business logic כבדה בתוך controller במקום להעביר אותה ל-service.
4. **provider** — ליצור provider ידנית עם new במקום לתת ל-Nest להזריק אותו.
5. **service** — לשים validation, הרשאות ושמירה ישירות ב-controller במקום לחלק אחריות.
6. **dependency injection** — להסתיר תלות בתוך קובץ בעזרת import ו-new, ואז לגלות שקשה לבדוק או להחליף אותה.
7. **decorator** — לזכור decorators כמו קסם במקום להבין שהם metadata שמחבר HTTP לקוד.
8. **DTO** — לקבל כל body מהלקוח בלי להגביל fields ובלי חוזה קלט ברור.
9. **validation pipe** — להגדיר DTO בלי להפעיל ValidationPipe, ואז לצפות שהבדיקות יקרו לבד.
10. **guard** — לבדוק הרשאות ידנית בכל method במקום ליצור guard עקבי.
11. **pipe** — להניח ש-id מה-URL הוא מספר רק כי כתבת TypeScript annotation.
12. **middleware** — להשתמש ב-middleware כדי לקבל החלטות הרשאה מורכבות; לזה guard מתאים יותר.
13. **interceptor** — לערבב interceptor עם guard. guard מחליט אם להמשיך; interceptor עוטף פעולה שממשיכה.
14. **exception filter** — להחזיר errors ידנית בכל route במקום להשתמש במנגנון exceptions עקבי.
15. **repository pattern** — לתת לכל service לדבר ישירות עם כל טבלת DB ואז ליצור coupling גבוה.
16. **testing module** — לבדוק Nest רק דרך server מלא, ואז לקבל בדיקות איטיות ושבירות.

## Next.js Full-Stack - Routing, SSR, API ו-SEO

1. **Next.js** — לחשוב ש-Next.js מחליף את React. הוא משתמש ב-React ומוסיף שכבות שרת, routing ו-build.
2. **App Router** — לערבב בין Pages Router הישן לבין App Router בלי להבין איזה conventions הפרויקט משתמש בהם.
3. **file-system routing** — ליצור קובץ component רגיל ולצפות שהוא יהפוך ל-route בלי page/layout/route במקום הנכון.
4. **dynamic route** — לקחת id מה-URL בלי validation או בלי לבדוק שהמשאב באמת קיים.
5. **layout** — להעתיק header/sidebar לכל page במקום לשים אותם ב-layout משותף.
6. **page** — לשים state אינטראקטיבי בתוך server component בלי להוסיף גבול client component.
7. **server component** — להשתמש ב-useState או onClick בתוך server component. אינטראקציה דורשת client component.
8. **client component** — להפוך עץ שלם ל-client component בלי צורך, וכך להגדיל bundle ולהפסיד יתרון של server components.
9. **route handler** — לשים route handler בתוך page או להחזיר JSX במקום Response.
10. **API route** — לחשוב ש-API route בטוח רק כי הוא בתוך Next. עדיין צריך validation ו-authorization.
11. **server action** — להניח ש-server action מבטלת צורך בבדיקות קלט והרשאות.
12. **SSR** — להשתמש ב-SSR לכל דבר גם כשנתונים כמעט לא משתנים, ולשלם עלות שרת מיותרת.
13. **SSG** — לבנות סטטית מידע שמשתנה לכל משתמש או דורש הרשאות.
14. **ISR** — להשתמש ב-ISR עבור מידע פרטי או מידע שחייב להיות עקבי בזמן אמת.
15. **metadata API** — להשאיר את כל העמודים עם אותו title או בלי description ברור.
16. **SEO** — לחשוב ש-SEO הוא רק keywords. בפועל זה גם ביצועים, מבנה, קישורים ונגישות.
17. **image optimization** — להעלות תמונות ענקיות בלי width/height או alt, ואז לקבל layout shift וטעינה איטית.
18. **Vercel deploy** — לשמור secrets בקוד או להניח שמה שעבד ב-dev יעבוד ב-production בלי env vars תקינים.

## SQL/PostgreSQL/ORM - בסיסי נתונים רלציוניים

1. **SQL** — להניח ש-ORM מבטל את הצורך להבין SQL. בפועל ORM מייצר SQL, ובעיות ביצועים נפתרות דרך הבנת השאילתה.
2. **PostgreSQL** — להתייחס ל-PostgreSQL כקובץ JSON גדול. החוזק שלו הוא schema, קשרים, constraints ו-query planner.
3. **database** — לקרוא לכל קובץ או אובייקט JS בשם database. database אמיתי מספק persistence, concurrency וכללי תקינות.
4. **table** — לשים בטבלה אחת מידע לא קשור. טבלה טובה מייצגת entity ברור ולא ערבוב של UI, user ו-log.
5. **row** — לשכוח ש-row חייבת לכבד constraints. אם title הוא NOT NULL, אי אפשר להכניס row בלי title.
6. **column** — להוסיף column חובה בלי DEFAULT במערכת עם נתונים קיימים. migration כזה עלול להיכשל.
7. **primary key** — להשתמש בשדה משתנה כמפתח ראשי. אם הערך יכול להשתנות, קשרים וטבלאות אחרות יישברו.
8. **foreign key** — לשמור ids בלי FOREIGN KEY ואז לגלות orphan records שה-UI לא יודע להסביר.
9. **relation** — לשכפל מידע במקום לקשור. שכפול גורם לעדכונים כפולים ולנתונים שסותרים אחד את השני.
10. **JOIN** — לכתוב JOIN בלי ON מדויק ולקבל כפל rows. כל JOIN חייב תנאי קשר ברור.
11. **schema** — לשנות schema ישירות ב-production בלי migration מסודרת ובלי להבין השפעה על קוד קיים.
12. **migration** — למחוק column לפני שהקוד החדש כבר לא משתמש בו. migration בטוחה מתחשבת בסדר deploy.
13. **ORM** — לחשוב ש-ORM תמיד מהיר יותר מ-raw SQL. לפעמים צריך לקרוא את ה-SQL שנוצר ולשפר query או index.
14. **Prisma** — ללמד Prisma כאילו הוא חובה. הוא כלי מעל SQL; פרויקט יכול לבחור Prisma, Drizzle או raw SQL לפי צרכים.
15. **Drizzle** — להציג Drizzle כקסם. הוא כלי מעל SQL; אם ה-schema או ה-query לא נכונים, הטעות נשארת.
16. **CRUD** — לבצע UPDATE או DELETE בלי WHERE. פעולה כזו עלולה להשפיע על כל הטבלה.
17. **transaction** — לעדכן כמה טבלאות בלי transaction ואז לקבל נתונים לא עקביים אחרי שגיאה באמצע.

---

**סה"כ:** 118 טעויות נפוצות בכל הקורס · 10 שיעורים

**עודכן אוטומטית:** 2026-05-02T13:01:45.182Z