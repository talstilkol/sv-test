// data/lesson_sql_orm.js
// SVCollege Finish Line 1 - SQL, PostgreSQL and ORM bridge lesson.

var LESSON_SQL_ORM = {
  id: "lesson_sql_orm",
  title: "SQL/PostgreSQL/ORM - בסיסי נתונים רלציוניים",
  description:
    "שכבת הנתונים של אפליקציית Full Stack: SQL, PostgreSQL, טבלאות, קשרים, JOIN, migrations, CRUD, transaction, וכלי ORM כמו Prisma ו-Drizzle מעל SQL.",
  svcollegeModule:
    "בסיסי נתונים ומידול מידע - MongoDB/Mongoose + PostgreSQL/Prisma/Drizzle",
  sourceAssets: [],
  sourceCoverageNote:
    "המודול הציבורי של SVCollege דורש כיסוי SQL/PostgreSQL/Prisma/Drizzle. מקור שיעור SQL מקומי ייעודי הוא unknown/unavailable, לכן זהו bridge עצמאי שמסביר את הפער שלא נסגר על ידי MongoDB בלבד.",
  concepts: [
    {
      conceptName: "SQL",
      difficulty: 3,
      simpleExplanation:
        "SQL היא שפה לשאול ולשנות מידע בבסיס נתונים רלציוני: SELECT לקריאה, INSERT להוספה, UPDATE לעדכון ו-DELETE למחיקה.",
      levels: {
        grandma:
          "SQL זה כמו לבקש מהספרנית: 'תני לי את כל הספרים של רובין הוד'. אומרים בדיוק מה רוצים — והיא מביאה.",
        child:
          "כמו לבקש מאמא: 'תביאי את כל החטיפים מהמזווה'. SQL זה ה'בקשה' לבסיס הנתונים: 'תביא לי את כל הקורסים הפעילים'.",
        soldier:
          "SQL = Structured Query Language. ארבע פעולות יסוד: SELECT (קריאה), INSERT (יצירה), UPDATE (עדכון), DELETE (מחיקה). תכתוב משפט באנגלית-סטייל, ה-DB יבצע.",
        student:
          "SQL היא declarative language: אתה מתאר מה אתה רוצה (התוצאה), לא איך להשיג. ה-query planner של ה-DB מחליט על ה-execution plan: scan, index, JOIN order, filter pushdown.",
        junior:
          "טעות נפוצה: לכתוב SELECT * FROM users WHERE name = 'דני' ולגלות שאין index — שאילתה איטית. לעטוף שדה ב-LOWER(email) שמבטל את ה-index. תמיד EXPLAIN לפני ש-deploying שאילתה לכבדת.",
        professor:
          "SQL is grounded in relational algebra (Codd, 1970). SELECT/projection (π), WHERE/selection (σ), JOIN (⋈), UNION (∪). The query optimizer transforms the logical plan via algebraic equivalences (predicate pushdown, join reordering) into a physical plan with cost-based selection.",
      },
      whyFullStack:
        "מפתח Full Stack צריך להבין מה השרת באמת מבקש מה-DB, גם אם הקוד עובר דרך Prisma או Drizzle.",
      codeExample:
        "SELECT id, title\nFROM courses\nWHERE active = true\nORDER BY title;",
      codeExplanation:
        "השאילתה קוראת עמודות מוגדרות מטבלה, מסננת רק רשומות פעילות, ומחזירה סדר צפוי.",
      commonMistake:
        "להניח ש-ORM מבטל את הצורך להבין SQL. בפועל ORM מייצר SQL, ובעיות ביצועים נפתרות דרך הבנת השאילתה.",
      prerequisite: "lesson_17::CRUD",
    },
    {
      conceptName: "PostgreSQL",
      difficulty: 4,
      simpleExplanation:
        "PostgreSQL הוא מנוע בסיס נתונים רלציוני שמריץ SQL, שומר constraints, מנהל transactions ותומך בסוגי נתונים עשירים.",
      levels: {
        grandma:
          "PostgreSQL זה ארון תיוק חכם — שיודע לסדר, לשמור, לוודא שלא תכניס פיל לתיקייה של חתולים, ולא תאבד שום דף גם אם החשמל יקפוץ.",
        child:
          "כמו ספרייה ענקית עם ספרן שמשגיח: לא תכניס ספר בלי כותרת, לא תיקח ספר שכבר מושאל. כל פעולה רשומה ביומן.",
        soldier:
          "PostgreSQL = open-source relational DB. רץ כ-server, מקבל connections, מבצע queries, מחזיר תוצאות. תומך ב-ACID transactions, JSON, full-text search, indexes, replication.",
        student:
          "Postgres הוא ORDBMS (Object-Relational): טבלאות + custom types + inheritance. MVCC לconcurrent reads ללא locks. WAL (Write-Ahead Log) לעמידות. תומך JSON/JSONB, arrays, hstore, PostGIS.",
        junior:
          "ההבדל מ-MySQL שתופס: Postgres מקפיד על standards, יש לו CTEs רקורסיביים, window functions, JSONB עם indexes. בעבודה אמיתית — שמור pool of connections, אל תפתח חיבור חדש לכל request.",
        professor:
          "PostgreSQL implements MVCC: each tuple has xmin/xmax versions; readers never block writers. The planner uses cost-based optimization with statistics from ANALYZE. Storage uses heap tables + B-tree/GiST/GIN indexes. WAL provides crash recovery and streaming replication.",
      },
      whyFullStack:
        "במערכת production השרת צריך אחסון אמין, queries צפויות, indexes, וגבולות עקביות ש-MongoDB בלבד לא תמיד מלמד.",
      codeExample:
        "CREATE TABLE courses (\n  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  title text NOT NULL,\n  active boolean NOT NULL DEFAULT true\n);",
      codeExplanation:
        "PostgreSQL מייצר מזהה identity, מחייב title, ומגדיר ברירת מחדל ל-active.",
      commonMistake:
        "להתייחס ל-PostgreSQL כקובץ JSON גדול. החוזק שלו הוא schema, קשרים, constraints ו-query planner.",
      prerequisite: "lesson_sql_orm::SQL",
    },
    {
      conceptName: "database",
      difficulty: 2,
      simpleExplanation:
        "database הוא מקום אחסון מסודר לנתונים של האפליקציה, עם כללים איך לשמור, לקרוא ולשנות אותם.",
      levels: {
        grandma:
          "database זה מחברת מאוד מסודרת של העסק: כל לקוח, כל הזמנה, כל פריט — בעמוד שלו. גם אם תפתחי אותה מחר, הכול ימצא במקום שלו.",
        child:
          "כמו ארגז המשחקים שלך: יש מדור ללגו, מדור לבובות, מדור למכוניות. הכול מסודר כדי שתמצא מהר. database זה הארגז של האפליקציה.",
        soldier:
          "database = container רשמי לטבלאות, indexes, views, functions. אפליקציה מתחברת אליו דרך connection string ומריצה queries. כל שינוי persistent — שורד restart.",
        student:
          "database = logical namespace. מכיל schemas, tables, sequences, types. ב-Postgres כל database עצמאי לחלוטין (אין cross-DB queries בלי FDW). connection מצביע על database אחד בלבד.",
        junior:
          "טעויות בעבודה: 1) להחזיק dev/prod באותו database — אסון. 2) לשכוח backups. 3) להגדיר 'postgres' כמשתמש האפליקציה — תמיד צור user ייעודי עם הרשאות מינימליות. 4) connection string בקוד במקום בenv.",
        professor:
          "A database constitutes a coordinated set of files (datafiles, control files, WAL segments) governed by an instance that enforces ACID properties. Logical separation via databases provides isolation; physical resources (buffers, locks) are shared at the cluster level.",
      },
      whyFullStack:
        "בלי database השרת מאבד מידע אחרי restart או שומר מידע בצורה שקשה לאמת, לחפש ולתחזק.",
      codeExample:
        "CREATE DATABASE learning_portal;",
      codeExplanation:
        "פקודה זו יוצרת בסיס נתונים נפרד לפרויקט. בתוך ה-database יוגדרו schemas וטבלאות.",
      commonMistake:
        "לקרוא לכל קובץ או אובייקט JS בשם database. database אמיתי מספק persistence, concurrency וכללי תקינות.",
      prerequisite: "lesson_16::Node.js",
    },
    {
      conceptName: "table",
      difficulty: 2,
      simpleExplanation:
        "table היא מבנה עם עמודות ושורות. כל שורה היא רשומה, וכל עמודה מגדירה סוג מידע.",
      levels: {
        grandma:
          "table זה כמו טבלת מתכונים בפנקס: כותרת בראש (שם המתכון, מספר מנות, זמן הכנה), ובכל שורה — מתכון אחר.",
        child:
          "כמו דף ציוני בית-ספר: בעמודות יש 'שם', 'מתמטיקה', 'אנגלית'. בכל שורה — תלמיד אחר. כל תלמיד תופס שורה אחת.",
        soldier:
          "table = collection of rows with the same column structure. עמודות מגדירות שמות + types. כל row חייבת לכבד את ה-schema. CREATE TABLE מגדיר את החוזה.",
        student:
          "Table = relation (relational algebra term). Tuples (rows) ⊆ Cartesian product of column domains. Constraints (PK, FK, CHECK, UNIQUE) צמודים לטבלה. Order של rows אינו משמעותי (set semantics) אלא אם ORDER BY.",
        junior:
          "כללים מהשטח: 1) טבלה אחת = entity אחד, לא ערבוב. 2) שם בלשון רבים (users, courses) או יחיד — בחר convention ושמור. 3) timestamp עמודות created_at/updated_at כמעט תמיד שווה. 4) avoid storing arrays as comma-separated strings.",
        professor:
          "In relational algebra a relation R(A₁, A₂, ..., Aₙ) is a subset of D₁ × D₂ × ... × Dₙ where Dᵢ is the domain of attribute Aᵢ. In Postgres physical storage is heap-organized: tuples stored in pages (8KB), addressed by ctid (block, offset). MVCC keeps multiple versions until vacuum.",
      },
      whyFullStack:
        "טבלאות הן החוזה בין backend, validation, UI ו-reports. שינוי בטבלה משפיע על כל ה-flow.",
      codeExample:
        "CREATE TABLE lessons (\n  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  title text NOT NULL,\n  published boolean NOT NULL DEFAULT false\n);",
      codeExplanation:
        "הטבלה lessons שומרת שיעורים עם מזהה, כותרת, ומצב פרסום.",
      commonMistake:
        "לשים בטבלה אחת מידע לא קשור. טבלה טובה מייצגת entity ברור ולא ערבוב של UI, user ו-log.",
      prerequisite: "lesson_sql_orm::database",
    },
    {
      conceptName: "row",
      difficulty: 2,
      simpleExplanation:
        "row היא רשומה אחת בטבלה, למשל משתמש אחד, שיעור אחד או הזמנה אחת.",
      levels: {
        grandma:
          "row זה שורה אחת בפנקס המתכונים — מתכון יחיד מההתחלה ועד הסוף, עם כל הפרטים שלו.",
        child:
          "כמו שורה אחת בדף הציונים: 'דנה כהן, 95, 87, 100'. השורה הזאת היא דנה — כל הציונים שלה ביחד.",
        soldier:
          "row = רשומה אחת = tuple אחד. INSERT יוצר row, UPDATE משנה אותו, DELETE מוחק. בכל row יש ערך (או NULL) לכל column.",
        student:
          "Row = ordered tuple מוגדר לפי schema הטבלה. ב-Postgres יש ל-row זהות פיזית (ctid) וזהות לוגית (PK). MVCC version: כל row יש xmin/xmax. row מחיקה לא נמחקת מיד אלא marked deleted עד vacuum.",
        junior:
          "באמת קורה: 1) UPDATE בלי WHERE — כל row משתנה. תמיד BEGIN; UPDATE; SELECT; ROLLBACK; ל-test. 2) INSERT עם NULL לעמודה NOT NULL — error. 3) הוספת row עם FK שלא קיים — error. תכנן את ה-order של inserts.",
        professor:
          "A row is a tuple instance ⟨a₁, a₂, ..., aₙ⟩ where aᵢ ∈ Dᵢ ∪ {NULL}. Physically rows are stored in heap pages with TOAST for oversized attributes. Update creates a new tuple version (HOT update if no indexed columns changed); old version becomes invisible after the modifying transaction commits and no concurrent reader needs it.",
      },
      whyFullStack:
        "כל מסך רשימה או עמוד פרטים ב-UI מציג בדרך כלל rows שהגיעו מה-DB דרך API.",
      codeExample:
        "INSERT INTO lessons (title, published)\nVALUES ('SQL basics', true);",
      codeExplanation:
        "INSERT יוצר row חדשה בטבלה lessons וממלא ערכים בעמודות שהוגדרו.",
      commonMistake:
        "לשכוח ש-row חייבת לכבד constraints. אם title הוא NOT NULL, אי אפשר להכניס row בלי title.",
      prerequisite: "lesson_sql_orm::table",
    },
    {
      conceptName: "column",
      difficulty: 2,
      simpleExplanation:
        "column היא שדה בטבלה. היא מגדירה שם, סוג נתונים וכללי תקינות כמו NOT NULL או UNIQUE.",
      levels: {
        grandma:
          "column זה כותרת בטבלה: 'שם', 'גיל', 'טלפון'. היא קובעת איזה סוג מידע הולך באותו עמוד — לא מערבבים בין מספר טלפון לשם פרטי.",
        child:
          "כמו טור בדף הציונים שכותרתו 'מתמטיקה'. כל הציונים בטור הזה הם של מתמטיקה. אי אפשר לכתוב שם בטור של ציון.",
        soldier:
          "column = שדה אחד בטבלה. יש לו שם, type (integer/text/boolean/date), constraints (NOT NULL/UNIQUE/CHECK), ואולי DEFAULT. אפשר להוסיף/להסיר עם ALTER TABLE.",
        student:
          "Column = attribute of a relation. ה-domain שלו נקבע ע\"י ה-data type. Constraints מגבילים legal values. ALTER TABLE ADD COLUMN במערכת חיה: אם NOT NULL בלי DEFAULT — נכשל; פתרון: ADD COLUMN nullable, backfill, ALTER SET NOT NULL.",
        junior:
          "מהקווים: 1) text לא varchar(255) — ב-Postgres אין הבדל ביצועים, ו-text גמיש. 2) numeric לכסף, לא float. 3) timestamp WITH TIME ZONE כמעט תמיד. 4) הוספת column ל-table של 100M rows — תכנן downtime או use online migration.",
        professor:
          "Columns are the attributes (Aᵢ) of relation R. Each Aᵢ has a domain Dᵢ defined by its data type. Constraints partition the domain into valid/invalid subsets. In Postgres column metadata lives in pg_attribute; physical layout follows column order with alignment padding determined by typalign.",
      },
      whyFullStack:
        "column לא נכון גורם לבאגים בין frontend, validation ו-DB: מחרוזת במקום מספר, null במקום ערך חובה, או תאריך לא עקבי.",
      codeExample:
        "ALTER TABLE lessons\nADD COLUMN estimated_minutes integer NOT NULL DEFAULT 45;",
      codeExplanation:
        "migration כזו מוסיפה עמודה קיימת בצורה שמכבדת rows שכבר נמצאות בטבלה.",
      commonMistake:
        "להוסיף column חובה בלי DEFAULT במערכת עם נתונים קיימים. migration כזה עלול להיכשל.",
      prerequisite: "lesson_sql_orm::table",
    },
    {
      conceptName: "primary key",
      difficulty: 3,
      simpleExplanation:
        "primary key הוא מזהה ייחודי ויציב לכל row בטבלה.",
      levels: {
        grandma:
          "primary key זה מספר תעודת זהות: גם אם תשני שם, כתובת, צבע שיער — המספר הזה תמיד שלך. אין שניים עם אותו ת.ז.",
        child:
          "כמו מספר בכיתה: לא משנה אם יש שני 'דניאל' — כל אחד עם מספר אחר. המורה אומרת 'מספר 7' ויודעת בדיוק מי זה.",
        soldier:
          "primary key = עמודה (או צירוף עמודות) שמזהה כל row באופן ייחודי. NOT NULL + UNIQUE + index. כל טבלה חייבת אחד. בדרך כלל id integer GENERATED ALWAYS AS IDENTITY.",
        student:
          "PK = מינימלי superkey. אופציות: 1) surrogate (auto-incrementing id, UUID) — recommended. 2) natural (email, slug) — שביר אם יכול להשתנות. ב-Postgres PK יוצר index unique אוטומטית; אפשר composite PK (PRIMARY KEY (a, b)).",
        junior:
          "המלצות אמת: 1) UUID v7 או bigint identity — לא serial הישן. 2) אל תשתמש ב-email כ-PK; משתמשים משנים email. 3) clustered index בעצם בנוי על ה-PK ב-Postgres (heap-only) — סדר insert משפיע על locality. 4) להוסיף PK לטבלה קיימת: בנה index קודם, אז ALTER ADD CONSTRAINT.",
        professor:
          "A primary key is a designated minimal superkey K ⊆ R such that ∀t₁,t₂ ∈ R: t₁[K] = t₂[K] ⟹ t₁ = t₂. Functional dependencies K → R hold trivially. Postgres enforces PK via a unique B-tree index; physical storage is independent (heap-organized), distinct from clustered-PK systems like SQL Server or InnoDB.",
      },
      whyFullStack:
        "API routes, React keys, relation queries ו-update/delete צריכים מזהה יציב כדי לעבוד על הרשומה הנכונה.",
      codeExample:
        "CREATE TABLE students (\n  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  email text NOT NULL UNIQUE\n);",
      codeExplanation:
        "id מזהה כל student. email גם ייחודי, אבל primary key נשאר המפתח הטכני לקשרים.",
      commonMistake:
        "להשתמש בשדה משתנה כמפתח ראשי. אם הערך יכול להשתנות, קשרים וטבלאות אחרות יישברו.",
      prerequisite: "lesson_sql_orm::column",
    },
    {
      conceptName: "foreign key",
      difficulty: 4,
      simpleExplanation:
        "foreign key הוא עמודה שמצביעה ל-primary key בטבלה אחרת ומונעת קשרים לא קיימים.",
      levels: {
        grandma:
          "foreign key זה כמו לרשום על מעטפה את הכתובת של הנמען — אבל המערכת בודקת שהבית באמת קיים לפני שהיא מוכנה לשלוח.",
        child:
          "כמו להזמין פיצה: יש מספר לקוח. אסור לכתוב מספר לקוח שלא קיים — המערכת תגיד 'לא מכירה את הלקוח הזה'. FK שומר ש-IDs באמת מתאימים.",
        soldier:
          "FK = pointer מטבלה אחת ל-PK של אחרת. ON DELETE CASCADE/SET NULL/RESTRICT קובע מה קורה כשהאב נמחק. ה-DB דוחה INSERT עם FK שלא קיים.",
        student:
          "Foreign key מבטיח referential integrity: אסור FK שמצביע ל-PK שלא קיים. אופציות מחיקה: CASCADE (מחק ילדים), SET NULL, RESTRICT/NO ACTION (block). בעת INSERT ל-child, ה-DB בודק שיש parent.",
        junior:
          "במציאות: 1) תמיד ADD INDEX על FK columns — Postgres לא יוצר אוטומטית, ובלי index DELETE על parent הופך לאיטי. 2) CASCADE מסוכן — שגיאה בodel יכולה למחוק טבלה שלמה. 3) deferred constraints (SET CONSTRAINTS DEFERRED) שימושיים כשיש cycle בין טבלאות.",
        professor:
          "A foreign key constraint enforces inclusion dependency: πK(R) ⊆ πK(S). Implemented via referential triggers (RI_*). Postgres deferable constraints checked at COMMIT vs immediately. CASCADE creates implicit triggers; locking semantics include FOR KEY SHARE on referenced tuples to prevent concurrent deletion.",
      },
      whyFullStack:
        "הוא מגן על הנתונים כשה-API מקבל userId או courseId. אי אפשר ליצור רשומה שמצביעה למשהו שלא קיים.",
      codeExample:
        "CREATE TABLE enrollments (\n  student_id integer NOT NULL REFERENCES students(id),\n  course_id integer NOT NULL REFERENCES courses(id),\n  PRIMARY KEY (student_id, course_id)\n);",
      codeExplanation:
        "טבלת enrollments מחברת students ל-courses ומונעת הרשמה לקורס או סטודנט שלא קיימים.",
      commonMistake:
        "לשמור ids בלי FOREIGN KEY ואז לגלות orphan records שה-UI לא יודע להסביר.",
      prerequisite: "lesson_sql_orm::primary key",
    },
    {
      conceptName: "relation",
      difficulty: 4,
      simpleExplanation:
        "relation היא קשר בין טבלאות: one-to-many, one-to-one או many-to-many.",
      levels: {
        grandma:
          "relation זה הקשרים בעולם: לאמא יש כמה ילדים (one-to-many), לכל ילד יש תעודה אחת (one-to-one), כיתה כוללת הרבה ילדים והרבה כיתות לכל בית-ספר (many-to-many).",
        child:
          "מורה אחת — הרבה תלמידים (1:N). תלמיד — הרבה חברים, וכל חבר — הרבה חברים אחרים (N:M). זה הקשרים בין הטבלאות.",
        soldier:
          "3 סוגי קשרים: 1:1 (user ↔ profile), 1:N (user → posts), N:M (students ↔ courses דרך enrollments). מיוצגים ב-FK; N:M דורש junction table.",
        student:
          "1:1 — FK + UNIQUE על FK. 1:N — FK בילד מצביע על parent. N:M — junction table עם composite PK של שני FKs. ב-ORMs יש include/relation API שמייצר LEFT JOIN אוטומטית.",
        junior:
          "N+1 problem — הסיוט הקלאסי: לולאה שטוענת כל row ואז עושה query להקשרים. הפתרון: eager loading (Prisma include, Drizzle with). 1:1 לעיתים מוגזם — אם תמיד מצרפים, אולי בכלל אותה טבלה. junction table בלי PK = רשומות כפולות.",
        professor:
          "Relationships in the relational model are not first-class but emerge through foreign keys and join queries. Cardinality (1:1, 1:N, N:M) is enforced by combining FK with UNIQUE constraints. ER modeling captures these explicitly; the relational realization decomposes M:N into a relationship entity (junction). Identifying vs non-identifying relationships affect PK composition.",
      },
      whyFullStack:
        "מסכים אמיתיים מציגים נתונים מחוברים: משתמש והזמנות, קורס ושיעורים, פוסט ותגובות.",
      codeExample:
        "students 1--many enrollments many--1 courses",
      codeExplanation:
        "סטודנט יכול להירשם להרבה קורסים, וקורס יכול לכלול הרבה סטודנטים דרך טבלת חיבור.",
      commonMistake:
        "לשכפל מידע במקום לקשור. שכפול גורם לעדכונים כפולים ולנתונים שסותרים אחד את השני.",
      prerequisite: "lesson_sql_orm::foreign key",
    },
    {
      conceptName: "JOIN",
      difficulty: 5,
      simpleExplanation:
        "JOIN מחבר rows מטבלאות שונות לפי תנאי קשר, בדרך כלל foreign key מול primary key.",
      levels: {
        grandma:
          "JOIN זה לחבר את 'רשימת הזמנות' עם 'רשימת לקוחות' לפי מספר לקוח, כדי לדעת בכל הזמנה מי הזמין ואיפה הוא גר.",
        child:
          "כמו לחבר רשימת ציונים עם רשימת תלמידים לפי מספר תלמיד. בלי JOIN יש לך רק 'תלמיד 5 קיבל 90' — עם JOIN, 'דנה כהן קיבלה 90'.",
        soldier:
          "JOIN מחבר rows משתי טבלאות. INNER JOIN — רק התאמות. LEFT JOIN — כל השמאל + התאמות מהימין (NULL אם אין). RIGHT/FULL — דומה. CROSS — Cartesian product (כפולה).",
        student:
          "JOIN types: INNER (∩), LEFT OUTER (left ∪ matches), RIGHT OUTER, FULL OUTER, CROSS, NATURAL (לפי שמות), USING (column משותפת), SELF (טבלה עם עצמה). תמיד עם תנאי ON ברור. Joins מתבצעים ב-execution: nested loop, hash join, merge join — בחירת optimizer.",
        junior:
          "Performance: 1) JOIN בלי index על FK = איטי. 2) LEFT JOIN + WHERE על הימין הופך אפקטיבית ל-INNER — עדיף לכתוב ON עם תנאי. 3) JOIN של 5+ טבלאות — יש סיכוי שהפלאן גרוע, שקול CTE או סדר join מפורש. 4) Cartesian בטעות מקפיץ rows ל-millions — בדוק EXPLAIN.",
        professor:
          "Join is the relational operator R ⋈θ S = σθ(R × S). Algorithms: nested-loop (O(|R|·|S|)), hash-join (O(|R| + |S|) build+probe), sort-merge (O(|R|log|R| + |S|log|S|)). Optimizer chooses based on selectivity, available indexes, memory (work_mem). Join order is NP-hard; Postgres uses dynamic programming up to geqo_threshold relations, then genetic optimization.",
      },
      whyFullStack:
        "בלי JOIN השרת מחזיר מידע חלקי או מבצע הרבה queries מיותרות. JOIN נכון מחזיר מסך שלם בשאילתה אחת.",
      codeExample:
        "SELECT students.email, courses.title\nFROM enrollments\nJOIN students ON students.id = enrollments.student_id\nJOIN courses ON courses.id = enrollments.course_id;",
      codeExplanation:
        "השאילתה עוברת דרך טבלת החיבור ומחזירה לכל הרשמה את אימייל הסטודנט וכותרת הקורס.",
      commonMistake:
        "לכתוב JOIN בלי ON מדויק ולקבל כפל rows. כל JOIN חייב תנאי קשר ברור.",
      prerequisite: "lesson_sql_orm::relation",
    },
    {
      conceptName: "schema",
      difficulty: 4,
      simpleExplanation:
        "schema הוא החוזה של מבנה הנתונים: טבלאות, עמודות, סוגים, קשרים ו-constraints.",
      levels: {
        grandma:
          "schema זה התוכנית של הבית: איפה החדרים, מה הגודל שלהם, איפה החלונות. בלי תוכנית — בולגן; עם תוכנית — כולם יודעים מה שייך לאן.",
        child:
          "כמו תבנית עוגה: היא קובעת את הצורה. אתה יכול למלא בשוקולד או וניל, אבל הצורה תמיד אותה צורה. schema זה התבנית של המידע.",
        soldier:
          "schema = התיאור הפורמלי של ה-DB: tables, columns, types, constraints, indexes, FKs, views, functions. Postgres גם משתמש בschema כ-namespace: schema.table.",
        student:
          "Two meanings: 1) Database schema — כל המבנה הלוגי. 2) Postgres schema — namespace בתוך database (public, app, audit). תמיד יש search_path. רוב הפרויקטים נשארים ב-public; multi-tenant משתמש ב-schema-per-tenant.",
        junior:
          "Schema design rules: 1) Normalize to 3NF, denormalize רק אחרי benchmarks. 2) audit columns (created_at, updated_at, created_by) כמעט תמיד. 3) soft delete (deleted_at) שמרני יותר ממחיקה קשה. 4) שמות באנגלית, snake_case. 5) public schema ב-Postgres נגיש לכולם — לפעמים יוצרים schema אפליקציה ייעודי.",
        professor:
          "Schema captures intension (structure) vs instance (extension/data). Formal definition: R(A₁:D₁, ..., Aₙ:Dₙ, Σ) where Σ is set of constraints. Database schema evolution requires migration formalisms (relational view-update problem). Postgres pg_namespace stores schemas; ACL controls access. Information schema (SQL standard) and pg_catalog provide introspection.",
      },
      whyFullStack:
        "schema טוב מונע מצב שבו ה-frontend חושב ששדה קיים אבל ה-DB לא מכיר אותו, או להפך.",
      codeExample:
        "CREATE SCHEMA learning;\nCREATE TABLE learning.lessons (\n  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  title text NOT NULL\n);",
      codeExplanation:
        "PostgreSQL schema יכול לארגן טבלאות תחת namespace, מעבר למשמעות הכללית של מבנה הנתונים.",
      commonMistake:
        "לשנות schema ישירות ב-production בלי migration מסודרת ובלי להבין השפעה על קוד קיים.",
      prerequisite: "lesson_sql_orm::table",
    },
    {
      conceptName: "migration",
      difficulty: 5,
      simpleExplanation:
        "migration היא שינוי גרסתי ומבוקר ב-schema: יצירת טבלה, הוספת עמודה, שינוי constraint או יצירת index.",
      levels: {
        grandma:
          "migration זה כמו לשפץ דירה לפי תוכנית מסודרת ובסדר נכון: אי אפשר להוריד את הקיר לפני שווידאנו שאין שם צינור. כל שלב מתועד.",
        child:
          "כמו להחליף חיתולים: יש סדר. קודם להוריד הישן, לנקות, לשים חדש. migration זה הסדר של שינויים ב-DB — אחד אחר השני, מתועד.",
        soldier:
          "migration = file עם SQL (או DSL) שמתאר שינוי schema. כלים: Prisma migrate, Drizzle Kit, Knex, Flyway, Liquibase. כל migration רץ בדיוק פעם אחת, מתועד בטבלה (_prisma_migrations).",
        student:
          "Migration framework: up() מבצע, down() reverts. Version table שומר what ran. Order חשוב: 1) ADD column nullable. 2) deploy code שכותב את העמודה. 3) backfill. 4) ALTER NOT NULL. כל שלב נפרד, deploy בנפרד. ב-CI: מריץ migrations כחלק מ-deploy automation.",
        junior:
          "Production rules brutalות: 1) אסור DROP COLUMN ב-deploy אחד — קוד ישן עוד רץ במקביל. 2) ALTER TABLE לעיתים לוקח LOCK שעוצר queries — ב-Postgres CREATE INDEX CONCURRENTLY. 3) data migration גדול — chunk it, אל תרוץ כ-single transaction. 4) זמן downtime: blue-green עם backwards-compatible migrations.",
        professor:
          "Schema migration is the operational realization of schema evolution. Backwards-compatible (expand-contract) pattern: expand (add nullable column) → migrate code → contract (drop old column). Online schema change (pt-osc, gh-ost) creates shadow table, dual-writes, swaps. Postgres improvements: ALTER TABLE ADD COLUMN with DEFAULT now non-rewriting (since v11) via pg_attribute.atthasmissing.",
      },
      whyFullStack:
        "כל deploy שמשנה backend או ORM עשוי לדרוש שינוי DB. migration הופכת את השינוי לשחזור ובר-בדיקה.",
      codeExample:
        "ALTER TABLE courses\nADD COLUMN slug text UNIQUE;\n\nUPDATE courses\nSET slug = lower(replace(title, ' ', '-'))\nWHERE slug IS NULL;",
      codeExplanation:
        "שינוי schema יכול לכלול גם backfill לנתונים קיימים לפני שמחייבים constraint קשיח.",
      commonMistake:
        "למחוק column לפני שהקוד החדש כבר לא משתמש בו. migration בטוחה מתחשבת בסדר deploy.",
      prerequisite: "lesson_sql_orm::schema",
    },
    {
      conceptName: "ORM",
      difficulty: 4,
      simpleExplanation:
        "ORM הוא כלי שמאפשר לעבוד עם DB דרך קוד ואובייקטים במקום לכתוב כל SQL ידנית.",
      levels: {
        grandma:
          "ORM זה מתורגמן: את אומרת לו 'תני לי את כל הקורסים הפעילים' בעברית פשוטה, והוא מתרגם לשפה שה-DB מבין (SQL).",
        child:
          "כמו פקיד בבנק שמדבר איתך באנגלית פשוטה, ובפנים ממלא טפסים בשפה משפטית. ORM לוקח את הקוד שלך וכותב SQL מאחורי הקלעים.",
        soldier:
          "ORM = Object-Relational Mapper. ממפה rows לאובייקטים, מאפשר CRUD בקוד (user.findMany, user.create), מטפל בקשרים, generate types, מנהל connection pool. דוגמאות: Prisma, Drizzle, TypeORM, Sequelize, SQLAlchemy.",
        student:
          "ORM benefits: type safety, פחות boilerplate, migrations integration, query builder ב-IDE. Costs: abstraction leak (חייב להבין SQL בעיות), N+1 risk, complex queries לפעמים יותר קלים ב-raw. הבחירה: Prisma (DSL נפרד), Drizzle (TS-first, SQL-like), raw SQL לcomplex.",
        junior:
          "מציאות העבודה: 1) Active Record vs Data Mapper — Prisma is data mapper, Sequelize is active record. 2) prepared statements — ORMs כותבים SQL parametrized, מגן מפני SQL injection. 3) include depth — אל תטעין 4 רמות עם 100 records בכל אחת. 4) raw escape hatch — תמיד יש; לא מתביישים להשתמש לcomplex queries.",
        professor:
          "The Object-Relational Impedance Mismatch (Ireland 2009) emerges from differences: classes vs relations, inheritance vs joins, identity (PK vs reference). Strategies: Active Record (Fowler PoEAA), Data Mapper, Repository, Unit of Work. ORMs trade SQL precision for productivity; abstraction-leak occurs at performance boundaries (N+1, eager-loading) requiring transparency.",
      },
      whyFullStack:
        "ORM מאיץ CRUD, מקטין boilerplate, ונותן type safety או schema tooling, אבל עדיין נשען על SQL ועל constraints.",
      codeExample:
        "const courses = await orm.course.findMany({\n  where: { active: true },\n  orderBy: { title: 'asc' }\n});",
      codeExplanation:
        "הקוד נראה כמו JavaScript, אבל מתורגם לשאילתת SQL מול ה-DB.",
      commonMistake:
        "לחשוב ש-ORM תמיד מהיר יותר מ-raw SQL. לפעמים צריך לקרוא את ה-SQL שנוצר ולשפר query או index.",
      prerequisite: "lesson_sql_orm::SQL",
    },
    {
      conceptName: "Prisma",
      difficulty: 5,
      simpleExplanation:
        "Prisma הוא ORM פופולרי ל-Node.js/TypeScript עם schema file, generated client ו-API נוח ל-CRUD וקשרים.",
      levels: {
        grandma:
          "Prisma זה כמו ארגון מסודר: כותבים בקובץ אחד 'יש לי אנשים, יש להם הזמנות', והוא מייצר את כל הניירת — טפסים, חתימות, יומן — אוטומטית.",
        child:
          "כמו לכתוב מתכון פעם אחת — וקבל תפריט שלם, כפתור 'הזמן', וקופה. Prisma קורא את ה-schema פעם אחת ובונה את כל הקוד שצריך כדי לעבוד עם ה-DB.",
        soldier:
          "Prisma flow: כותבים schema.prisma → npx prisma migrate dev (יוצר SQL migration + מריץ) → npx prisma generate (יוצר TS client) → import { PrismaClient } → prisma.user.findMany(). Type-safe מקצה לקצה.",
        student:
          "Prisma DSL נפרד מ-SQL — תיאור deklaratīvi של models, fields, relations. Engine binary (Rust) מתרגם queries ל-SQL. Migrations: prisma migrate dev (dev), migrate deploy (prod). יכול: nested writes, relation queries, raw queries ($queryRaw), middleware (logging, soft delete).",
        junior:
          "Trade-offs: 1) Prisma Engine extra process — יותר memory, יותר latency. 2) Migrations מבוססות על drift detection — עובד טוב אם רק Prisma נוגע ב-DB. 3) Complex queries (window functions, CTEs) דורשים $queryRaw. 4) Edge runtimes (Cloudflare, Vercel Edge) — Prisma Accelerate או Driver Adapters.",
        professor:
          "Prisma Schema is a domain-specific language compiled to a query engine. The engine implements a query language with relational completeness via translation to SQL. Type generation uses TypeScript's structural typing for compile-time safety. Architectural decision: separate engine process trades memory for language-agnosticism but adds RPC latency vs in-process ORMs.",
      },
      whyFullStack:
        "Prisma מחבר בין מודל נתונים ל-TypeScript ומקטין טעויות ב-API routes, אבל דורש הבנה של migrations ו-query cost.",
      codeExample:
        "const course = await prisma.course.create({\n  data: { title: input.title, active: true }\n});",
      codeExplanation:
        "Prisma יוצר row בטבלת Course לפי מודל ה-schema. ה-DB עדיין אחראי ל-constraints.",
      commonMistake:
        "ללמד Prisma כאילו הוא חובה. הוא כלי מעל SQL; פרויקט יכול לבחור Prisma, Drizzle או raw SQL לפי צרכים.",
      prerequisite: "lesson_sql_orm::ORM",
    },
    {
      conceptName: "Drizzle",
      difficulty: 5,
      simpleExplanation:
        "Drizzle הוא ORM/query builder ל-TypeScript שמדגיש SQL-like API, types קרובים ל-schema ושליטה טובה בשאילתות.",
      levels: {
        grandma:
          "Drizzle זה כמו לכתוב הוראות בעצמך, אבל המחשב משלים את המילים שאת לא בטוחה איך כותבים — בלי לתרגם הכול מאחורי הקלעים.",
        child:
          "כמו דיבור באנגלית פשוטה במקום לבקש ממתורגמן. אתה כותב משהו שדומה ל-SQL, רק עם עזרים שמוודאים שאין שגיאות.",
        soldier:
          "Drizzle = TypeScript-first SQL toolkit. מגדירים schema ב-TS (לא DSL), בונים queries דרך chain API שמדמה SQL: db.select().from(users).where(eq(users.id, 1)). אין engine נפרד — הכול בקוד.",
        student:
          "Drizzle filosofija: SQL-like, type-safe, lightweight. אין runtime overhead כמו Prisma engine. drizzle-kit לmigrations (generate + push). תומך Postgres, MySQL, SQLite, edge runtimes (Cloudflare, Vercel) ללא bridge.",
        junior:
          "כשבוחרים Drizzle: 1) צוות שיודע SQL ורוצה types בלי שכבת abstraction עבה. 2) Edge deployments — Drizzle עובד מ-coffee. 3) Complex queries — קל יותר מ-Prisma raw. Trade-offs: 1) פחות 'magic' — צריך לכתוב יותר. 2) Ecosystem חדש יחסית, פחות docs/SO. 3) Migrations פחות בוגרות.",
        professor:
          "Drizzle exemplifies the lightweight ORM/query-builder design philosophy: prefer transparent compilation over abstraction, embed query construction in the host language's type system. TypeScript's mapped types and conditional types enable SQL schema reflection at compile time. Compared to Prisma's external engine, in-process JIT compilation eliminates serialization overhead at the cost of language coupling.",
      },
      whyFullStack:
        "Drizzle מתאים כשצריך type safety אבל רוצים לראות מבנה SQL ברור יותר ולשלוט ב-JOIN וב-select fields.",
      codeExample:
        "const rows = await db\n  .select({ title: courses.title })\n  .from(courses)\n  .where(eq(courses.active, true));",
      codeExplanation:
        "הקוד בונה SELECT typed. הוא לא מחליף את הצורך להבין indexes, JOIN ו-transaction.",
      commonMistake:
        "להציג Drizzle כקסם. הוא כלי מעל SQL; אם ה-schema או ה-query לא נכונים, הטעות נשארת.",
      prerequisite: "lesson_sql_orm::ORM",
    },
    {
      conceptName: "CRUD",
      difficulty: 3,
      simpleExplanation:
        "CRUD הוא ארבע פעולות בסיסיות על מידע: Create, Read, Update, Delete.",
      levels: {
        grandma:
          "CRUD זה מה שאת עושה כל יום עם הפנקס: רושמת חדש (Create), קוראת מה כתבת (Read), משנה כשטעית (Update), מוחקת מה שכבר לא רלוונטי (Delete).",
        child:
          "כמו לעדכן פרופיל באינסטגרם: להוסיף תמונה (Create), לראות תמונות (Read), לשנות bio (Update), למחוק post (Delete). זה מה שכל אפליקציה עושה.",
        soldier:
          "CRUD = Create / Read / Update / Delete. ב-SQL: INSERT / SELECT / UPDATE / DELETE. ב-REST: POST / GET / PATCH או PUT / DELETE. כל API בסיסי הוא CRUD על entity.",
        student:
          "CRUD operations מתאימים ל-HTTP methods בעקבות REST. Idempotency: GET, PUT, DELETE — yes. POST, PATCH — no. כל פעולה בודדת ברמת DB; transaction יוצר atomic group. Audit/event sourcing מוסיף שכבה: לא overwrite, אלא append events.",
        junior:
          "אזהרות אמיתיות: 1) UPDATE/DELETE בלי WHERE — אסון. תמיד SELECT first, אז UPDATE. 2) soft delete (deleted_at) במקום hard delete לרוב המקרים. 3) bulk insert — INSERT ... VALUES (...), (...), (...) או COPY ל-N>1000 rows. 4) Read אחרי Write עם read replicas — eventual consistency.",
        professor:
          "CRUD operations correspond to the basic relational algebra modifications and selection. In transactional terms each maps to commit-bound modifications of the relation extension. Event Sourcing inverts this: state is a fold over an immutable log; CRUD becomes derived. CQRS separates command (write) and query (read) models, often eventually consistent.",
      },
      whyFullStack:
        "כמעט כל API בסיסי ממפה routes ל-CRUD: POST יוצר, GET קורא, PATCH/PUT מעדכן, DELETE מוחק.",
      codeExample:
        "INSERT INTO courses (title) VALUES ('SQL basics');\nSELECT * FROM courses;\nUPDATE courses SET active = false WHERE id = 1;\nDELETE FROM courses WHERE id = 1;",
      codeExplanation:
        "אותו רעיון מופיע ב-SQL, REST API ו-ORM client.",
      commonMistake:
        "לבצע UPDATE או DELETE בלי WHERE. פעולה כזו עלולה להשפיע על כל הטבלה.",
      prerequisite: "lesson_17::REST API",
    },
    {
      conceptName: "transaction",
      difficulty: 6,
      simpleExplanation:
        "transaction היא קבוצה של פעולות DB שמצליחות יחד או נכשלות יחד.",
      levels: {
        grandma:
          "transaction זה כמו העברת כסף בבנק: או שגם זיכוי החשבון השני וגם חיוב שלך קורים — או ששום דבר לא קורה. אסור שיורידו לך 100 ש\"ח בלי שיגיעו לחבר.",
        child:
          "כמו החלפת תיק עם חבר: או שאתה נותן לו את שלך והוא נותן לך את שלו, או ששניכם נשארים עם התיק שלכם. אסור 'חצי החלפה' — אז שניכם בלי תיקים.",
        soldier:
          "transaction = יחידת עבודה אטומית. BEGIN → פעולות → COMMIT (אישור) או ROLLBACK (ביטול). אם משהו נכשל באמצע — חוזר לכל המצב הקודם. Postgres עוטף כל פעולה בודדת ב-implicit transaction.",
        student:
          "ACID: Atomicity (all-or-nothing), Consistency (constraints מתקיימים), Isolation (transactions לא רואים אחד את השני באמצע), Durability (אחרי COMMIT שורד crash). Isolation levels: READ UNCOMMITTED, READ COMMITTED (default ב-Postgres), REPEATABLE READ, SERIALIZABLE.",
        junior:
          "Production realities: 1) long transactions = locks ארוכים = bottleneck. 2) deadlock — שני transactions מחזיקים lock ומחכים זה לזה. Postgres מזהה ומחזיר error. 3) SELECT FOR UPDATE לlock pessimistic. 4) optimistic locking עם version column. 5) SAVEPOINT לnested rollback. 6) idempotency: id ייחודי במקום retry על POST.",
        professor:
          "Transactions implement the ACID properties (Härder & Reuter 1983). Concurrency control: 2PL (two-phase locking), MVCC (Postgres snapshot isolation), OCC (optimistic). Isolation anomalies: dirty read, non-repeatable read, phantom read, write skew, serialization anomaly. SSI (Serializable Snapshot Isolation, Cahill 2008) provides serializability over MVCC. Distributed transactions: 2PC, 3PC, Paxos commit; impossibility (FLP), CAP trade-offs.",
      },
      whyFullStack:
        "כשמשלמים, נרשמים לקורס, או מעדכנים כמה טבלאות, אסור שחצי מהשינוי יישמר וחצי ייכשל.",
      codeExample:
        "BEGIN;\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\nCOMMIT;",
      codeExplanation:
        "שתי פעולות העדכון הן יחידה אחת. אם יש כשל לפני COMMIT, עושים ROLLBACK ולא משאירים מצב חלקי.",
      commonMistake:
        "לעדכן כמה טבלאות בלי transaction ואז לקבל נתונים לא עקביים אחרי שגיאה באמצע.",
      prerequisite: "lesson_sql_orm::CRUD",
    },
  ],
  quiz: [
    {
      question: "למה MongoDB קיים בפורטל לא סוגר לבד את דרישת SVCollege ל-SQL?",
      options: [
        "כי MongoDB אינו בסיס נתונים",
        "כי SQL/PostgreSQL מלמדים טבלאות, JOIN, schema רלציוני ו-migrations מסוג אחר",
        "כי SQL עובד רק ב-frontend",
        "כי Prisma עובד רק עם MongoDB",
      ],
      correct: 1,
      explanation:
        "MongoDB חשוב, אבל הדרישה כוללת גם חשיבה רלציונית: טבלאות, constraints, foreign keys, JOIN ו-migrations.",
    },
    {
      question: "מה תפקיד primary key?",
      options: [
        "לזהות כל row בצורה ייחודית",
        "לצבוע טבלה",
        "להריץ שרת Node",
        "להחליף migration",
      ],
      correct: 0,
      explanation:
        "primary key הוא מזהה יציב וייחודי לכל row, והוא בסיס לקשרים ולפעולות update/delete מדויקות.",
    },
    {
      question: "מתי צריך JOIN?",
      options: [
        "כשמחברים מידע מטבלאות שונות לפי קשר",
        "רק כשכותבים CSS",
        "כשרוצים למחוק database",
        "כשאין foreign key",
      ],
      correct: 0,
      explanation:
        "JOIN מחבר rows מטבלאות שונות לפי תנאי ON, בדרך כלל דרך foreign key.",
    },
    {
      question: "מה migration אמורה לתת לצוות?",
      options: [
        "שינוי schema גרסתי ובר-שחזור",
        "עיצוב אוטומטי לכפתורים",
        "ביטול הצורך בבדיקות",
        "החלפה של HTTP",
      ],
      correct: 0,
      explanation:
        "migration מתעדת ומריצה שינויי schema בצורה מבוקרת בין סביבות.",
    },
    {
      question: "איזה משפט נכון על Prisma ו-Drizzle?",
      options: [
        "הם כלים מעל SQL ולא חובה בכל פרויקט",
        "הם מבטלים constraints ב-DB",
        "הם עובדים רק בדפדפן",
        "הם מחליפים את הצורך ב-schema",
      ],
      correct: 0,
      explanation:
        "Prisma ו-Drizzle עוזרים לעבוד מול DB, אבל הם עדיין נשענים על SQL, schema וגבולות ביצועים.",
    },
    {
      question: "למה transaction חשובה?",
      options: [
        "כדי שכל הפעולות הקריטיות יצליחו יחד או יבוטלו יחד",
        "כדי שהשרת יעלה מהר יותר",
        "כדי למחוק foreign keys",
        "כדי להציג CSS",
      ],
      correct: 0,
      explanation:
        "transaction מונעת מצב חלקי, למשל חיוב שנשמר בלי עדכון הרשמה או העברה כספית שנעצרה באמצע.",
    },
  ],
};

if (typeof window !== "undefined") {
  window.LESSON_SQL_ORM = LESSON_SQL_ORM;
}

if (typeof module !== "undefined") {
  module.exports = { LESSON_SQL_ORM };
}
