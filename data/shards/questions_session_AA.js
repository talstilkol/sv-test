// data/shards/questions_session_AA.js
// Sprint 2 batch AA — SQL/PostgreSQL/ORM
// 50 questions: 35 MC + 15 Fill

window.QUESTIONS_SHARD_AA = {
  mc: [
    {
      id: "mc_sql_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::SQL",
      level: 5,
      question: "SQL — מה?",
      options: [
        "Structured Query Language — declarative for relational DBs (since 1986)",
        "Imperative",
        "JS framework",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Standard query language.",
      optionFeedback: [
        "✅ נכון. SQL הוא declarative — describe what, not how.",
        "❌ הפוך — declarative.",
        "❌ DB language.",
        "❌ עדיין הסטנדרט הראשי."
      ]
    },
    {
      id: "mc_pg_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::PostgreSQL",
      level: 5,
      question: "PostgreSQL:",
      options: [
        "Open-source relational DB — ACID, JSONB, extensions, full-featured",
        "NoSQL",
        "Microsoft",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Most powerful open-source RDBMS.",
      optionFeedback: [
        "✅ נכון. Postgres = full-featured RDBMS.",
        "❌ Postgres הוא relational.",
        "❌ open-source community-driven.",
        "❌ active."
      ]
    },
    {
      id: "mc_db_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::database",
      level: 4,
      question: "Database (DB):",
      options: [
        "Persistent organized data — tables (SQL) or collections (NoSQL)",
        "RAM",
        "File",
        "Cache"
      ],
      correctIndex: 0,
      explanation: "Persistent storage.",
      optionFeedback: [
        "✅ נכון. DB = persistent.",
        "❌ RAM volatile.",
        "❌ file-based DBs קיימים אבל לא הגדרה.",
        "❌ cache הוא ephemeral."
      ]
    },
    {
      id: "mc_table_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::table",
      level: 4,
      question: "SQL Table:",
      options: [
        "2D structure — rows × columns. Schema-defined types per column",
        "Single value",
        "Document",
        "List"
      ],
      correctIndex: 0,
      explanation: "Foundation of relational model.",
      optionFeedback: [
        "✅ נכון. table = grid עם schema קבועה.",
        "❌ DB מכיל הרבה.",
        "❌ document = NoSQL.",
        "❌ table הוא 2D."
      ]
    },
    {
      id: "mc_row_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::row",
      level: 4,
      question: "Row:",
      options: [
        "Single record — one entity. PK identifies uniquely",
        "Column",
        "Schema",
        "Table"
      ],
      correctIndex: 0,
      explanation: "Atomic data unit.",
      optionFeedback: [
        "✅ נכון. row = single record.",
        "❌ column הוא field name.",
        "❌ schema = structure definition.",
        "❌ table = collection of rows."
      ]
    },
    {
      id: "mc_column_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::column",
      level: 4,
      question: "Column:",
      options: [
        "Field/attribute with type — applies to all rows in table",
        "Row",
        "Schema",
        "Index"
      ],
      correctIndex: 0,
      explanation: "Schema-defined.",
      optionFeedback: [
        "✅ נכון. column = field across rows.",
        "❌ row = record.",
        "❌ schema = full structure.",
        "❌ index = lookup acceleration."
      ]
    },
    {
      id: "mc_pk_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::primary key",
      level: 5,
      question: "Primary Key:",
      options: [
        "Unique row identifier — NOT NULL, UNIQUE, indexed automatically",
        "Foreign key",
        "Index",
        "Optional"
      ],
      correctIndex: 0,
      explanation: "Surrogate (auto-increment) preferred.",
      optionFeedback: [
        "✅ נכון. PK = unique + NOT NULL.",
        "❌ FK references PK.",
        "❌ index הוא acceleration.",
        "❌ חובה."
      ]
    },
    {
      id: "mc_fk_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::foreign key",
      level: 6,
      question: "Foreign Key:",
      options: [
        "Column referencing PK in another table — enforces referential integrity",
        "PK",
        "Random",
        "Optional"
      ],
      correctIndex: 0,
      explanation: "ON DELETE CASCADE/RESTRICT/SET NULL options.",
      optionFeedback: [
        "✅ נכון. FK = reference to PK.",
        "❌ different role.",
        "❌ deterministic.",
        "❌ recommended for integrity."
      ]
    },
    {
      id: "mc_relation_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::relation",
      level: 5,
      question: "Relation cardinality:",
      options: [
        "1-1, 1-N, N-N (many-to-many via junction table)",
        "1-1 only",
        "Random",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Standard relationship types.",
      optionFeedback: [
        "✅ נכון. 3 sandnessas of cardinality.",
        "❌ רוב הם 1-N.",
        "❌ deterministic.",
        "❌ standard."
      ]
    },
    {
      id: "mc_join_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::JOIN",
      level: 6,
      question: "JOIN:",
      options: [
        "Combine rows from multiple tables — INNER/LEFT/RIGHT/FULL by ON condition",
        "Single table",
        "Random",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Foundation of relational queries.",
      optionFeedback: [
        "✅ נכון. JOIN = combine tables.",
        "❌ JOIN דרוש 2+ tables.",
        "❌ deterministic.",
        "❌ active."
      ]
    },
    {
      id: "mc_left_join_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::JOIN",
      level: 7,
      question: "LEFT JOIN vs INNER JOIN:",
      options: [
        "LEFT JOIN: all left rows + matching right (NULL if no match). INNER: only matching",
        "אותו דבר",
        "INNER more rows",
        "LEFT deprecated"
      ],
      correctIndex: 0,
      explanation: "Different result sets.",
      optionFeedback: [
        "✅ נכון. הבדל קריטי.",
        "❌ הבדל מהותי.",
        "❌ LEFT same or more.",
        "❌ active."
      ]
    },
    {
      id: "mc_schema_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::schema",
      level: 6,
      question: "DB Schema:",
      options: [
        "Structure definition — tables, columns, types, constraints, indexes",
        "Single table",
        "Backup",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Defines DB layout.",
      optionFeedback: [
        "✅ נכון. schema = structure.",
        "❌ schema covers DB.",
        "❌ different concept.",
        "❌ active."
      ]
    },
    {
      id: "mc_migration_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::migration",
      level: 7,
      question: "DB Migration:",
      options: [
        "Versioned schema change script — forward + rollback. Track in migrations table",
        "Manual SQL",
        "Backup",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Reproducible schema evolution.",
      optionFeedback: [
        "✅ נכון. migration = versioned change.",
        "❌ ad-hoc = bad.",
        "❌ different.",
        "❌ standard."
      ]
    },
    {
      id: "mc_orm_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::ORM",
      level: 6,
      question: "ORM:",
      options: [
        "Object-Relational Mapper — abstracts SQL via code (TypeScript/JS classes/functions)",
        "DB itself",
        "GUI",
        "Cache"
      ],
      correctIndex: 0,
      explanation: "Productivity + type-safety.",
      optionFeedback: [
        "✅ נכון. ORM = code interface to DB.",
        "❌ layer above.",
        "❌ pgAdmin הוא GUI.",
        "❌ different."
      ]
    },
    {
      id: "mc_prisma_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::Prisma",
      level: 6,
      question: "Prisma:",
      options: [
        "Modern ORM — schema.prisma → typed client. Migrations + Studio GUI",
        "DB",
        "Linter",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "TypeScript-first ORM.",
      optionFeedback: [
        "✅ נכון. Prisma = TS-first ORM.",
        "❌ ORM, not DB.",
        "❌ different.",
        "❌ active."
      ]
    },
    {
      id: "mc_drizzle_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::Drizzle",
      level: 6,
      question: "Drizzle ORM:",
      options: [
        "Lightweight TS ORM — SQL-like syntax, zero runtime cost, edge-friendly",
        "Heavy",
        "Deprecated",
        "JavaScript only"
      ],
      correctIndex: 0,
      explanation: "Alternative to Prisma — closer to raw SQL.",
      optionFeedback: [
        "✅ נכון. Drizzle = lightweight ORM.",
        "❌ small footprint.",
        "❌ active.",
        "❌ TypeScript-first."
      ]
    },
    {
      id: "mc_crud_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::CRUD",
      level: 4,
      question: "CRUD operations:",
      options: [
        "Create / Read / Update / Delete — basic data ops, map to INSERT/SELECT/UPDATE/DELETE",
        "Cookie/Random/User/Data",
        "Class/Resource/Update/Database",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Foundation.",
      optionFeedback: [
        "✅ נכון. 4 הפעולות הבסיסיות.",
        "❌ זה לא ה-acronym.",
        "❌ זה לא ה-acronym.",
        "❌ active."
      ]
    },
    {
      id: "mc_transaction_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::transaction",
      level: 7,
      question: "Transaction:",
      options: [
        "Atomic unit — BEGIN/COMMIT/ROLLBACK. ACID guarantees",
        "Single query",
        "Deprecated",
        "Cache"
      ],
      correctIndex: 0,
      explanation: "All-or-nothing.",
      optionFeedback: [
        "✅ נכון. transaction = atomic group.",
        "❌ multi-query.",
        "❌ active.",
        "❌ different."
      ]
    },
    {
      id: "mc_acid_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::transaction",
      level: 7,
      question: "ACID:",
      options: [
        "Atomicity, Consistency, Isolation, Durability — transaction guarantees",
        "BASE",
        "CAP",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Standard guarantees of relational DBs.",
      optionFeedback: [
        "✅ נכון. ACID guarantees.",
        "❌ זה NoSQL.",
        "❌ זה theorem אחר.",
        "❌ standard."
      ]
    },
    {
      id: "mc_select_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::SQL",
      level: 5,
      question: "SELECT statement:",
      options: [
        "SELECT cols FROM table WHERE filter ORDER BY col LIMIT N",
        "SELECT * always",
        "Random",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Read query.",
      optionFeedback: [
        "✅ נכון. SELECT structure.",
        "❌ SELECT * is anti-pattern (returns extra cols).",
        "❌ deterministic.",
        "❌ standard."
      ]
    },
    {
      id: "mc_where_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::SQL",
      level: 5,
      question: "WHERE clause:",
      options: [
        "Filter rows by condition — col = value, col > N, etc.",
        "Sort",
        "Limit",
        "Group"
      ],
      correctIndex: 0,
      explanation: "Pre-aggregation filter.",
      optionFeedback: [
        "✅ נכון. WHERE filters.",
        "❌ זה ORDER BY.",
        "❌ זה LIMIT.",
        "❌ זה GROUP BY."
      ]
    },
    {
      id: "mc_groupby_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::SQL",
      level: 7,
      question: "GROUP BY:",
      options: [
        "Aggregates rows — typically with COUNT/SUM/AVG. Pair with HAVING for post-filter",
        "Sort",
        "Filter",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Aggregation operation.",
      optionFeedback: [
        "✅ נכון. GROUP BY + aggregates.",
        "❌ זה ORDER BY.",
        "❌ זה WHERE.",
        "❌ standard."
      ]
    },
    {
      id: "mc_index_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::SQL",
      level: 7,
      question: "DB Index:",
      options: [
        "B-tree on columns — speeds up SELECT WHERE/JOIN/ORDER BY at cost of INSERT/UPDATE",
        "Backup",
        "View",
        "Cache"
      ],
      correctIndex: 0,
      explanation: "Trade-off: read speed vs write cost.",
      optionFeedback: [
        "✅ נכון. index = lookup acceleration.",
        "❌ different.",
        "❌ different.",
        "❌ different."
      ]
    },
    {
      id: "mc_explain_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::SQL",
      level: 8,
      question: "EXPLAIN:",
      options: [
        "Shows query plan — Seq Scan vs Index Scan, joins, costs",
        "Run faster",
        "Generate query",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Performance debugging.",
      optionFeedback: [
        "✅ נכון. EXPLAIN = query plan.",
        "❌ זה analysis.",
        "❌ different.",
        "❌ active."
      ]
    },
    {
      id: "mc_n_plus_one_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::ORM",
      level: 8,
      question: "N+1 query problem:",
      options: [
        "Loop fetches related — 1 + N queries instead of 1. Use eager loading or JOINs",
        "Random",
        "Bug ב-ORM",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Common ORM anti-pattern.",
      optionFeedback: [
        "✅ נכון. N+1 = anti-pattern קלאסי.",
        "❌ pattern ידוע.",
        "❌ זה anti-pattern של המתכנת.",
        "❌ active."
      ]
    },
    {
      id: "mc_normalization_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::schema",
      level: 7,
      question: "Normalization (3NF):",
      options: [
        "Avoid redundancy — split tables to remove duplicate data, link via FKs",
        "Add redundancy",
        "Single table",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Database design principle.",
      optionFeedback: [
        "✅ נכון. normalization = remove redundancy.",
        "❌ זה denormalization.",
        "❌ הוא הפתרון.",
        "❌ standard."
      ]
    },
    {
      id: "mc_denormalization_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::schema",
      level: 8,
      question: "Denormalization:",
      options: [
        "Intentional redundancy for read performance — when JOINs are too slow",
        "Anti-pattern",
        "Default",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Trade-off for analytics workloads.",
      optionFeedback: [
        "✅ נכון. denormalization = trade-off מכוון.",
        "❌ legitimate when justified.",
        "❌ normalize first.",
        "❌ active."
      ]
    },
    {
      id: "mc_acid_isolation_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::transaction",
      level: 8,
      question: "Isolation levels:",
      options: [
        "READ UNCOMMITTED → READ COMMITTED → REPEATABLE READ → SERIALIZABLE — increasing isolation",
        "Single level",
        "Random",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Trade-off concurrency vs consistency.",
      optionFeedback: [
        "✅ נכון. 4 levels.",
        "❌ multiple levels.",
        "❌ deterministic.",
        "❌ standard."
      ]
    },
    {
      id: "mc_constraint_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::schema",
      level: 6,
      question: "Constraints:",
      options: [
        "NOT NULL, UNIQUE, CHECK, FOREIGN KEY — DB-level integrity",
        "Optional",
        "Index",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Critical for data integrity.",
      optionFeedback: [
        "✅ נכון. constraints = integrity rules.",
        "❌ enforce data quality.",
        "❌ different role.",
        "❌ standard."
      ]
    },
    {
      id: "mc_view_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::SQL",
      level: 7,
      question: "SQL View:",
      options: [
        "Saved query — accessed like table. Materialized views cache results",
        "Real table",
        "Index",
        "Deprecated"
      ],
      correctIndex: 0,
      explanation: "Abstraction layer.",
      optionFeedback: [
        "✅ נכון. view = saved query.",
        "❌ different.",
        "❌ different.",
        "❌ active."
      ]
    },
    {
      id: "mc_jsonb_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::PostgreSQL",
      level: 8,
      question: "PostgreSQL JSONB:",
      options: [
        "Binary JSON column — indexed, queryable. Hybrid relational+document model",
        "Plain JSON",
        "Deprecated",
        "Mongo only"
      ],
      correctIndex: 0,
      explanation: "Pg's NoSQL feature.",
      optionFeedback: [
        "✅ נכון. JSONB = indexed JSON.",
        "❌ JSONB יותר טוב מ-JSON ב-Pg.",
        "❌ active.",
        "❌ feature של Pg."
      ]
    },
    {
      id: "mc_seq_scan_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::SQL",
      level: 8,
      question: "Sequential Scan vs Index Scan:",
      options: [
        "Seq = full table read (slow on large). Index = direct lookup (fast)",
        "Same",
        "Seq faster always",
        "Index deprecated"
      ],
      correctIndex: 0,
      explanation: "Seq scan slow on large tables.",
      optionFeedback: [
        "✅ נכון. הבדל ביצועי קריטי.",
        "❌ הבדל גדול.",
        "❌ ההפך.",
        "❌ active."
      ]
    },
    {
      id: "mc_pgvector_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::PostgreSQL",
      level: 8,
      question: "pgvector:",
      options: [
        "Postgres extension for embeddings — vector(N) column, similarity search",
        "Deprecated",
        "Mongo only",
        "Frontend"
      ],
      correctIndex: 0,
      explanation: "AI/RAG applications.",
      optionFeedback: [
        "✅ נכון. pgvector = vectors ב-Pg.",
        "❌ active.",
        "❌ Pg-specific.",
        "❌ backend."
      ]
    },
    {
      id: "mc_serial_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::primary key",
      level: 6,
      question: "SERIAL/AUTO_INCREMENT:",
      options: [
        "Auto-incrementing integer column — typical PK",
        "Random",
        "GUID",
        "Manual"
      ],
      correctIndex: 0,
      explanation: "PG: SERIAL or IDENTITY. MySQL: AUTO_INCREMENT.",
      optionFeedback: [
        "✅ נכון. auto-incrementing PK.",
        "❌ deterministic.",
        "❌ זה UUID/UUIDv4.",
        "❌ אוטומטי."
      ]
    },
    {
      id: "mc_uuid_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::primary key",
      level: 7,
      question: "UUID vs Serial:",
      options: [
        "UUID: randomized, no info leak, distributed-friendly. Serial: sequential, smaller",
        "Same",
        "UUID deprecated",
        "Serial deprecated"
      ],
      correctIndex: 0,
      explanation: "Trade-off: privacy vs size.",
      optionFeedback: [
        "✅ נכון. trade-off ידוע.",
        "❌ הבדל מהותי.",
        "❌ active.",
        "❌ active."
      ]
    },
  ],
  fill: [
    {
      id: "fill_select_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::SQL",
      level: 5,
      code: "____ name FROM users WHERE active = true;",
      answer: "SELECT",
      explanation: "SELECT clause specifies columns to return."
    },
    {
      id: "fill_where_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::SQL",
      level: 5,
      code: "SELECT * FROM users ____ age > 18;",
      answer: "WHERE",
      explanation: "WHERE filters rows."
    },
    {
      id: "fill_join_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::JOIN",
      level: 6,
      code: "SELECT u.name, p.title\nFROM users u\nLEFT ____ posts p ON p.user_id = u.id;",
      answer: "JOIN",
      explanation: "LEFT JOIN keeps all left rows."
    },
    {
      id: "fill_pk_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::primary key",
      level: 5,
      code: "CREATE TABLE users (\n  id SERIAL ____ KEY,\n  name TEXT\n);",
      answer: "PRIMARY",
      explanation: "PRIMARY KEY constraint."
    },
    {
      id: "fill_fk_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::foreign key",
      level: 6,
      code: "CREATE TABLE posts (\n  id SERIAL PRIMARY KEY,\n  user_id INT ____ users(id)\n);",
      answer: "REFERENCES",
      explanation: "REFERENCES creates FK relationship."
    },
    {
      id: "fill_insert_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::CRUD",
      level: 5,
      code: "____ INTO users (name, email) VALUES ('Tal', 't@b.com');",
      answer: "INSERT",
      explanation: "INSERT INTO adds rows."
    },
    {
      id: "fill_update_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::CRUD",
      level: 5,
      code: "____ users SET active = true WHERE id = 5;",
      answer: "UPDATE",
      explanation: "UPDATE modifies rows."
    },
    {
      id: "fill_delete_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::CRUD",
      level: 5,
      code: "____ FROM users WHERE id = 5;",
      answer: "DELETE",
      explanation: "DELETE removes rows."
    },
    {
      id: "fill_orderby_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::SQL",
      level: 5,
      code: "SELECT * FROM users ____ BY created_at DESC;",
      answer: "ORDER",
      explanation: "ORDER BY sorts results."
    },
    {
      id: "fill_limit_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::SQL",
      level: 5,
      code: "SELECT * FROM users ORDER BY id ____ 10;",
      answer: "LIMIT",
      explanation: "LIMIT restricts row count."
    },
    {
      id: "fill_groupby_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::SQL",
      level: 6,
      code: "SELECT user_id, COUNT(*) FROM posts ____ BY user_id;",
      answer: "GROUP",
      explanation: "GROUP BY aggregates rows."
    },
    {
      id: "fill_count_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::SQL",
      level: 6,
      code: "SELECT ____(*) FROM users WHERE active = true;",
      answer: "COUNT",
      explanation: "COUNT aggregates row count."
    },
    {
      id: "fill_transaction_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::transaction",
      level: 7,
      code: "____;\nINSERT INTO accounts ...;\nUPDATE balances ...;\nCOMMIT;",
      answer: "BEGIN",
      explanation: "BEGIN starts transaction."
    },
    {
      id: "fill_index_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::SQL",
      level: 7,
      code: "CREATE ____ idx_users_email ON users(email);",
      answer: "INDEX",
      explanation: "CREATE INDEX speeds up queries."
    },
    {
      id: "fill_alter_aa_001",
      topicId: "topic_sql",
      conceptKey: "lesson_sql_orm::migration",
      level: 7,
      code: "____ TABLE users ADD COLUMN email TEXT;",
      answer: "ALTER",
      explanation: "ALTER TABLE for schema changes."
    },
  ],
};
