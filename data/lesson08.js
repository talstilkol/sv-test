// data/lesson08.js — שיעור 08: PostgreSQL + Drizzle/Prisma
// בסיסי נתונים יחסיים. מבחן: 6-8 שאלות צפויות.
var LESSON_08 = {
  id: "lesson_08",
  title: "שיעור 08 — PostgreSQL + Drizzle/Prisma",
  description:
    "SQL basics, PostgreSQL כבסיס נתונים יחסי, Drizzle ו-Prisma כ-ORMs מודרניים.",
  concepts: [
    {
      conceptName: "SQL",
      difficulty: 4,
      levels: {
        grandma: "SQL = שפה לדבר עם בסיסי נתונים. אומרת 'תן לי את כל הלקוחות' או 'הוסף הזמנה'.",
        child: "כמו לבקש מהספרן 'תן לי את כל הספרים שכתב המחבר X'.",
        soldier: "Structured Query Language. CRUD: SELECT (קריאה), INSERT (יצירה), UPDATE (עדכון), DELETE (מחיקה).",
        student: "SQL declarative — אתה אומר 'מה' ולא 'איך'. ה-DB engine מחליט אופטימלית. JOIN לחבר טבלאות, WHERE לסינון, GROUP BY לקבצן.",
        junior: "פעם אהבתי MongoDB כי 'JS-friendly'. אחרי שצריך relations מורכבים — חזרתי ל-PostgreSQL. SQL JOIN פותר ב-1 שאילתה מה ש-Mongo דורש 5 שאילתות.",
        professor: "SQL standard (ISO/IEC 9075). Relational algebra basis: selection, projection, join, union. PostgreSQL is SQL-92/99/2003+ compliant. Modern extensions: window functions, CTEs, JSON support.",
      },
      illustration:
        "📊 SQL CRUD:\n  SELECT * FROM users WHERE age > 18;\n  INSERT INTO users (name, age) VALUES ('Tal', 30);\n  UPDATE users SET age = 31 WHERE id = 1;\n  DELETE FROM users WHERE id = 2;",
      codeExample:
        "-- SELECT עם JOIN + WHERE + ORDER BY\nSELECT u.name, p.title, p.created_at\nFROM users u\nJOIN posts p ON p.user_id = u.id\nWHERE p.published = true\n  AND u.country = 'IL'\nORDER BY p.created_at DESC\nLIMIT 10;\n\n-- INSERT\nINSERT INTO users (name, email, age)\nVALUES ('Tal', 'tal@example.com', 30)\nRETURNING id;\n\n-- UPDATE\nUPDATE users\nSET last_login = NOW()\nWHERE id = $1;\n\n-- DELETE\nDELETE FROM posts WHERE created_at < NOW() - INTERVAL '1 year';",
      codeExplanation: "SELECT עם JOIN לחבר טבלאות, WHERE לסינון, ORDER+LIMIT לתוצאות. RETURNING ב-INSERT מחזיר ערכים. NOW() ו-INTERVAL לעבודה עם זמן.",
    },
    {
      conceptName: "PostgreSQL",
      difficulty: 5,
      levels: {
        grandma: "PostgreSQL = בסיס נתונים בקוד פתוח, מהאמינים בעולם. בנקים משתמשים בו.",
        child: "המקרר הכי טוב לאחסן את כל הסידור שלך — בטוח, מהיר, אוהב סדר.",
        soldier: "Open-source RDBMS. ACID compliant. תמיכה ב-JSON, full-text search, geospatial. הסטנדרט של 2026.",
        student: "PostgreSQL features: ACID, MVCC, indexes (B-tree, GIN, GiST), JSONB, arrays, full-text search, extensions (PostGIS, pgvector). Replication, partitioning, sharding.",
        junior: "התחלתי עם MySQL כברירת מחדל. עברתי ל-PostgreSQL בגלל JSONB (כמו MongoDB אבל בתוך SQL) ו-pgvector (RAG embeddings). פתר 3 צרכים ב-DB אחד.",
        professor: "PostgreSQL = object-relational DBMS. MVCC (Multi-Version Concurrency Control) eliminates read locks. WAL (Write-Ahead Log) for durability. Logical replication. PG 16+ supports parallel query, JIT compilation.",
      },
      illustration: "🐘 PostgreSQL ecosystem:\n  Core: ACID + MVCC + WAL\n  Extensions: PostGIS, pgvector, TimescaleDB\n  Hosted: Supabase, Neon, RDS, Heroku",
      codeExample:
        "-- התקנה לוקאלית (Mac)\nbrew install postgresql\nbrew services start postgresql\ncreatedb mydb\npsql mydb\n\n-- יצירת טבלה\nCREATE TABLE users (\n  id SERIAL PRIMARY KEY,\n  email VARCHAR(255) UNIQUE NOT NULL,\n  name VARCHAR(100) NOT NULL,\n  age INT CHECK (age >= 0),\n  metadata JSONB,                       -- JSON binary, אינדקס מהיר\n  created_at TIMESTAMPTZ DEFAULT NOW()\n);\n\n-- אינדקס לחיפוש מהיר\nCREATE INDEX idx_users_email ON users(email);\nCREATE INDEX idx_users_metadata ON users USING GIN (metadata);\n\n-- Foreign key\nCREATE TABLE posts (\n  id SERIAL PRIMARY KEY,\n  user_id INT REFERENCES users(id) ON DELETE CASCADE,\n  title VARCHAR(200) NOT NULL,\n  content TEXT\n);",
      codeExplanation: "SERIAL = auto-increment. UNIQUE/NOT NULL/CHECK = constraints. JSONB = JSON עם אינדקס. REFERENCES = foreign key. ON DELETE CASCADE = מחיקת פוסטים אם משתמש נמחק.",
    },
    {
      conceptName: "JOIN",
      difficulty: 6,
      levels: {
        grandma: "חיבור בין טבלאות — לקוחות + ההזמנות שלהם בטבלה אחת.",
        child: "כמו לחבר 2 רשימות — שמות וטלפונים, יוצאים שמות עם טלפונים.",
        soldier: "JOIN מחבר rows משתי טבלאות לפי תנאי. INNER JOIN (חיתוך), LEFT JOIN (שמאל + matches).",
        student: "JOIN types: INNER (intersection), LEFT/RIGHT (כל השמאל/ימין + matches), FULL OUTER (הכל), CROSS (Cartesian). ON תנאי, USING(col) קיצור אם column name זהה.",
        junior: "פעם בלבלתי INNER ו-LEFT. INNER מחזיר רק users שיש להם posts. LEFT מחזיר את כל ה-users (גם ללא posts). הצופה צריך 'all users' → LEFT.",
        professor: "JOIN algorithms: nested loop (small), hash join (medium), merge join (sorted). Query planner chooses. Indexes on JOIN columns critical for performance.",
      },
      illustration:
        "🔗 JOIN types:\n  users      posts\n   1: Tal     1→1: Hi\n   2: Roni    2→1: Hello\n   3: Maya    -\n\n  INNER: Tal-Hi, Tal-Hello, Roni-?  → Tal-Hi, Tal-Hello (Maya excluded)\n  LEFT:  Tal-Hi, Tal-Hello, Roni-Hello, Maya-NULL",
      codeExample:
        "-- INNER: רק users עם posts\nSELECT u.name, p.title\nFROM users u\nINNER JOIN posts p ON p.user_id = u.id;\n\n-- LEFT: כל ה-users, גם בלי posts\nSELECT u.name, p.title\nFROM users u\nLEFT JOIN posts p ON p.user_id = u.id;\n-- → Maya-NULL\n\n-- COUNT עם GROUP BY: כמה פוסטים לכל משתמש\nSELECT u.name, COUNT(p.id) AS post_count\nFROM users u\nLEFT JOIN posts p ON p.user_id = u.id\nGROUP BY u.id, u.name\nORDER BY post_count DESC;",
      codeExplanation: "INNER לחיתוך. LEFT לכל השמאל. GROUP BY + COUNT לאגרגציה. AS לכינוי עמודות.",
    },
    {
      conceptName: "INDEX",
      difficulty: 7,
      levels: {
        grandma: "אינדקס = ספר טלפונים מסודר. במקום לחפש שורה אחר שורה, ה-DB מוצא מיד.",
        child: "כמו א\"ב של אנשי קשר — תמצא 'דניאל' מהר במקום לקרוא את כל הספר.",
        soldier: "INDEX = מבנה נתונים שמאיץ חיפוש. CREATE INDEX על column. עלות: write איטי יותר, storage.",
        student: "B-tree index (default) = balanced tree. O(log n) lookup. שווה ל-WHERE/JOIN/ORDER BY. UNIQUE index = constraint + speed. GIN/GiST ל-JSONB/full-text. Composite indexes לעמודות מרובות.",
        junior: "פעם query לקח 5 שניות על 1M rows. הוספתי INDEX על user_id — ירד ל-5ms. אבל הוספתי 5 indexes על אותה טבלה — INSERT האיטי ב-300%. אינדקסים זה tradeoff.",
        professor: "Index types: B-tree (most), Hash (equality only), GIN (inverted, JSONB/array), GiST (geo/range), BRIN (large table summaries). EXPLAIN ANALYZE to verify usage. Selectivity matters — index on rare values most useful.",
      },
      illustration:
        "📚 With/without index (1M rows):\n  No index: Sequential scan, 5000ms\n  Index:    B-tree lookup, 5ms\n  → 1000x faster!",
      codeExample:
        "-- אינדקס בסיסי\nCREATE INDEX idx_users_email ON users(email);\n\n-- אינדקס יחיד (UNIQUE constraint + speed)\nCREATE UNIQUE INDEX idx_users_username ON users(username);\n\n-- אינדקס מרובה (composite — סדר חשוב!)\nCREATE INDEX idx_posts_user_published ON posts(user_id, published);\n-- שווה ל: WHERE user_id = X AND published = true\n\n-- אינדקס חלקי (partial — רק subset)\nCREATE INDEX idx_active_users ON users(email) WHERE active = true;\n\n-- אינדקס JSONB\nCREATE INDEX idx_metadata ON users USING GIN(metadata);\n\n-- בדוק אם אינדקס בשימוש\nEXPLAIN ANALYZE\nSELECT * FROM users WHERE email = 'tal@example.com';\n-- → Index Scan using idx_users_email",
      codeExplanation: "INDEX מאיץ קריאה. UNIQUE = constraint + index. Composite — סדר חשוב. Partial לחסוך מקום. EXPLAIN ANALYZE לבדוק ביצועים.",
    },
    {
      conceptName: "Drizzle",
      difficulty: 6,
      levels: {
        grandma: "כלי שמאפשר לכתוב SQL מ-TypeScript בצורה type-safe — אם תכתוב שגיאה, התוכנית לא תקמפל.",
        child: "כמו מקלדת חכמה שמתקנת לך טעויות לפני שאתה לוחץ Enter.",
        soldier: "Drizzle ORM = TypeScript-first SQL builder. Lightweight, type-safe, אין hidden magic.",
        student: "Drizzle: schema definition in TS, query builder mimics SQL. Strong types: change column type → all references error. Migrations via drizzle-kit. Hosted DB integration: Neon, Supabase, Vercel Postgres.",
        junior: "התחלתי עם Prisma (פופולרי). אבל לא אהבתי שזה generates code חיצוני (Prisma Client). עברתי ל-Drizzle — הכל ב-TS, kontrol מלא, ביצועים טובים.",
        professor: "Drizzle = TypeScript-native ORM. Zero-runtime overhead (compiled to SQL). Schema-as-code. Edge-compatible. Comparison: Prisma uses query engine binary; Drizzle is pure TS + driver.",
      },
      illustration:
        "🛠️ Drizzle pipeline:\n  schema.ts (TS) → drizzle-kit generate → SQL migrations\n  app code → drizzle queries → SQL → DB\n  TypeScript catches errors at compile time",
      codeExample:
        "// schema.ts — Schema as TypeScript\nimport { pgTable, serial, varchar, integer, timestamp } from 'drizzle-orm/pg-core';\n\nexport const users = pgTable('users', {\n  id: serial('id').primaryKey(),\n  email: varchar('email', { length: 255 }).unique().notNull(),\n  name: varchar('name', { length: 100 }).notNull(),\n  age: integer('age'),\n  createdAt: timestamp('created_at').defaultNow(),\n});\n\nexport const posts = pgTable('posts', {\n  id: serial('id').primaryKey(),\n  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }),\n  title: varchar('title', { length: 200 }).notNull(),\n});\n\n// queries.ts — type-safe queries\nimport { db } from './db';\nimport { users, posts } from './schema';\nimport { eq, gt, desc } from 'drizzle-orm';\n\nconst allUsers = await db.select().from(users);\n\nconst adultUsers = await db.select().from(users).where(gt(users.age, 18));\n\nconst usersWithPosts = await db\n  .select({ name: users.name, title: posts.title })\n  .from(users)\n  .innerJoin(posts, eq(posts.userId, users.id))\n  .orderBy(desc(posts.id))\n  .limit(10);",
      codeExplanation: "schema = pgTable עם columns. queries = builder pattern (select.from.where). Type-safe: שינוי schema = compile errors. eq, gt, desc = פונקציות SQL.",
    },
    {
      conceptName: "Prisma",
      difficulty: 6,
      levels: {
        grandma: "ORM פופולרי שמתרגם בין JS/TS לבסיס נתונים. הכל מבוסס על קובץ schema אחד.",
        child: "כמו מתורגמן בין השפה שלך לשפת ה-DB.",
        soldier: "Prisma ORM = schema.prisma (DSL) → generated client (TypeScript). Auto-completion + type-safety.",
        student: "Prisma 3 חלקים: Schema (DSL), Migrate (migrations), Client (generated TS API). Workflow: edit schema → migrate → use client. Powerful relations, lazy loading.",
        junior: "Prisma היה הבחירה הקלה — schema פשוט, autocomplete מצוין. אבל ב-Edge runtime (Vercel) — Prisma binary לא תאם, נאלצתי לעבור ל-Drizzle.",
        professor: "Prisma uses query engine (Rust binary) for cross-DB support. PSL (Prisma Schema Language) generates TS types. Tradeoff: developer experience vs runtime overhead. Edge limitation due to Rust binary.",
      },
      illustration:
        "🔄 Prisma workflow:\n  schema.prisma → npx prisma migrate → SQL DB\n           ↓\n     npx prisma generate\n           ↓\n     @prisma/client (TS, auto-complete)",
      codeExample:
        "// schema.prisma\nmodel User {\n  id        Int      @id @default(autoincrement())\n  email     String   @unique\n  name      String\n  age       Int?\n  posts     Post[]\n  createdAt DateTime @default(now())\n}\n\nmodel Post {\n  id      Int    @id @default(autoincrement())\n  title   String\n  user    User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n  userId  Int\n}\n\n// Migrations\n// $ npx prisma migrate dev --name init\n\n// Generate client\n// $ npx prisma generate\n\n// Use client (auto-completed!)\nimport { PrismaClient } from '@prisma/client';\nconst prisma = new PrismaClient();\n\nconst users = await prisma.user.findMany();\nconst user = await prisma.user.findUnique({ where: { email: 'tal@example.com' } });\nconst userWithPosts = await prisma.user.findUnique({\n  where: { id: 1 },\n  include: { posts: true },  // eager load\n});\n\nconst created = await prisma.user.create({\n  data: { email: 'new@x.com', name: 'New', age: 25 },\n});",
      codeExplanation: "schema.prisma DSL. migrate dev = שינויים ב-DB. generate = TS client. findMany/Unique/create — auto-complete מלא.",
    },
    {
      conceptName: "transaction",
      difficulty: 7,
      levels: {
        grandma: "פעולות שחייבות לקרות יחד או לא לקרות בכלל — כמו העברת כסף בין חשבונות.",
        child: "פעולה משולבת — או הכל או כלום. אם משהו נכשל באמצע, חוזרים אחורה.",
        soldier: "Transaction = קבוצת queries ATOMIC. BEGIN... COMMIT (הצלחה) או ROLLBACK (כישלון).",
        student: "ACID: Atomic, Consistent, Isolated, Durable. PostgreSQL: BEGIN, COMMIT, ROLLBACK. Isolation levels: READ COMMITTED (default), REPEATABLE READ, SERIALIZABLE.",
        junior: "פעם transfer money בלי transaction: account A -100. server crashed. account B never got +100. money lost! עכשיו: $tx (transaction) שעוטף → או שניהם או אף אחד.",
        professor: "ACID guarantees per ANSI SQL. Locking strategies: pessimistic (SELECT FOR UPDATE) vs optimistic (version column). Deadlocks: detected by DB, one tx aborted. SERIALIZABLE strictest, may retry.",
      },
      illustration:
        "💸 Transaction (atomic):\n  BEGIN\n    UPDATE accounts SET balance -= 100 WHERE id = 1;\n    UPDATE accounts SET balance += 100 WHERE id = 2;\n  COMMIT  ← או שניהם, או ROLLBACK",
      codeExample:
        "-- SQL ישיר\nBEGIN;\n  UPDATE accounts SET balance = balance - 100 WHERE id = 1;\n  UPDATE accounts SET balance = balance + 100 WHERE id = 2;\n  -- אם משהו נכשל:\n  -- ROLLBACK;\nCOMMIT;\n\n-- Drizzle\nimport { db } from './db';\n\nawait db.transaction(async (tx) => {\n  await tx.update(accounts).set({ balance: sql`balance - 100` }).where(eq(accounts.id, 1));\n  await tx.update(accounts).set({ balance: sql`balance + 100` }).where(eq(accounts.id, 2));\n  // אם זרק exception → אוטומטית ROLLBACK\n});\n\n-- Prisma\nawait prisma.$transaction([\n  prisma.account.update({ where: { id: 1 }, data: { balance: { decrement: 100 } } }),\n  prisma.account.update({ where: { id: 2 }, data: { balance: { increment: 100 } } }),\n]);",
      codeExplanation: "BEGIN/COMMIT/ROLLBACK בSQL. Drizzle/Prisma ב-callback או array — אם זורק exception, אוטומטית ROLLBACK. ACID מובטח.",
    },
  ],
};
