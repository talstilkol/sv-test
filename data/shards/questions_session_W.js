// data/shards/questions_session_W.js
// Sprint 2 batch W — MongoDB / Mongoose
// 50 questions: 35 MC + 15 Fill

window.QUESTIONS_SHARD_W = {
  mc: [
    {
      id: "mc_l20_db_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::Database",
      level: 4,
      question: "Database role:",
      options: [
        "Persistent storage — שורד restart, queries, integrity",
        "Cache",
        "Random",
        "Configuration"
      ],
      correctIndex: 0,
      explanation: "Foundation of data persistence.",
      optionFeedback: [
        "✅ נכון. DB מאחסן מידע באופן מתמשך — לא מאבד ב-restart.",
        "❌ Cache הוא אחסון זמני, DB הוא persistent.",
        "❌ DB דטרמיניסטי — אותה שאילתה אותה תוצאה.",
        "❌ DB אוסף נתונים, לא קונפיג."
      ]
    },
    {
      id: "mc_l20_sql_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::SQL",
      level: 5,
      question: "SQL:",
      options: [
        "Structured Query Language — declarative for relational DBs",
        "imperative",
        "deprecated",
        "JS only"
      ],
      correctIndex: 0,
      explanation: "Standard since 1986.",
      optionFeedback: [
        "✅ נכון. SQL הוא declarative — אומרים מה רוצים, לא איך.",
        "❌ SQL הוא declarative, לא imperative.",
        "❌ SQL חי וקיים, ה-standard הראשי.",
        "❌ SQL הוא DB language, לא JS."
      ]
    },
    {
      id: "mc_l20_nosql_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::NoSQL",
      level: 5,
      question: "NoSQL:",
      options: [
        "Not Only SQL — flexible schema (document, KV, graph). Mongo is document-based",
        "no DB",
        "anti-SQL",
        "tabular"
      ],
      correctIndex: 0,
      explanation: "Family of non-relational DBs.",
      optionFeedback: [
        "✅ נכון. NoSQL הוא משפחה של DBs לא-טבלאיים.",
        "❌ NoSQL הוא DB, פשוט שונה.",
        "❌ NoSQL לא עוין ל-SQL — משלים אותו.",
        "❌ זה SQL — NoSQL הוא הגדל יותר גמיש."
      ]
    },
    {
      id: "mc_l20_mongo_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::MongoDB",
      level: 5,
      question: "MongoDB:",
      options: [
        "Document DB — JSON-like documents organized in collections",
        "SQL",
        "KV cache",
        "graph DB"
      ],
      correctIndex: 0,
      explanation: "BSON internally (binary JSON).",
      optionFeedback: [
        "✅ נכון. Mongo הוא document DB עם BSON internally.",
        "❌ Mongo הוא NoSQL document, לא SQL.",
        "❌ Redis הוא KV cache, Mongo שונה.",
        "❌ Neo4j הוא graph, Mongo הוא document."
      ]
    },
    {
      id: "mc_l20_atlas_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::MongoDB Atlas",
      level: 5,
      question: "MongoDB Atlas:",
      options: [
        "Managed cloud — free tier 512MB, easy clusters",
        "local install",
        "deprecated",
        "Postgres"
      ],
      correctIndex: 0,
      explanation: "MongoDB-as-a-service.",
      optionFeedback: [
        "✅ נכון. Atlas הוא ה-cloud-managed Mongo.",
        "❌ Atlas הוא cloud, לא local.",
        "❌ Atlas הוא הפלטפורמה הראשית של Mongo.",
        "❌ Postgres הוא DB אחר לחלוטין."
      ]
    },
    {
      id: "mc_l20_cluster_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::Cluster",
      level: 6,
      question: "Mongo Cluster:",
      options: [
        "Replica set + sharding — high availability + scale",
        "single instance",
        "deprecated",
        "JS class"
      ],
      correctIndex: 0,
      explanation: "Production setup.",
      optionFeedback: [
        "✅ נכון. cluster = replicas + sharding לזמינות וsקייל.",
        "❌ standalone לא מספיק לpro.",
        "❌ Cluster הוא standard.",
        "❌ זה JS class."
      ]
    },
    {
      id: "mc_l20_connstr_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::Connection String",
      level: 6,
      question: "Mongo connection string:",
      options: [
        "mongodb+srv://user:pass@cluster.mongodb.net/dbname — env var",
        "URL only",
        "deprecated",
        "JSON"
      ],
      correctIndex: 0,
      explanation: "+srv = SRV records for cluster discovery.",
      optionFeedback: [
        "✅ נכון. Connection string מכיל credentials, host, ו-DB.",
        "❌ הוא יותר מ-URL רגיל — כולל credentials.",
        "❌ standard.",
        "❌ זה string."
      ]
    },
    {
      id: "mc_l20_collection_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::Collection",
      level: 5,
      question: "Mongo Collection:",
      options: [
        "Container of documents — analogous to SQL table",
        "single document",
        "schema",
        "DB"
      ],
      correctIndex: 0,
      explanation: "Schemaless. Documents can vary.",
      optionFeedback: [
        "✅ נכון. Collection מקביל ל-table ב-SQL.",
        "❌ Collection מכיל מספר documents.",
        "❌ schema הוא הגדרה ב-Mongoose.",
        "❌ DB מכיל מספר collections."
      ]
    },
    {
      id: "mc_l20_doc_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::Document",
      level: 5,
      question: "Mongo Document:",
      options: [
        "JSON-like object — single record. _id auto-added",
        "table",
        "string",
        "int"
      ],
      correctIndex: 0,
      explanation: "BSON internally.",
      optionFeedback: [
        "✅ נכון. document הוא single record בstyle JSON.",
        "❌ table הוא SQL concept.",
        "❌ document הוא object.",
        "❌ document מכיל מספר fields."
      ]
    },
    {
      id: "mc_l20_mongoose_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::Mongoose",
      level: 6,
      question: "Mongoose:",
      options: [
        "ODM (Object-Document Mapper) for Node — schema, validation, hooks",
        "ORM",
        "DB",
        "language"
      ],
      correctIndex: 0,
      explanation: "Adds structure on top of MongoDB driver.",
      optionFeedback: [
        "✅ נכון. Mongoose הוא ODM — מוסיף structure ל-Mongo.",
        "❌ ORM הוא לrelational DBs (Prisma, Drizzle).",
        "❌ Mongoose הוא layer מעל DB.",
        "❌ Mongoose הוא lib."
      ]
    },
    {
      id: "mc_l20_schema_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::Schema",
      level: 6,
      question: "Mongoose Schema:",
      options: [
        "Defines document structure — fields, types, validators, defaults, hooks",
        "DB",
        "model",
        "collection"
      ],
      correctIndex: 0,
      explanation: "Compile to Model via mongoose.model().",
      optionFeedback: [
        "✅ נכון. Schema = blueprint לdocument.",
        "❌ Schema הוא code-level הגדרה.",
        "❌ Model נוצר מ-Schema.",
        "❌ Collection הוא runtime, Schema הוא קוד."
      ]
    },
    {
      id: "mc_l20_model_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::Model",
      level: 6,
      question: "Mongoose Model:",
      options: [
        "Class compiled from Schema — provides find/create/update methods",
        "DB",
        "schema",
        "instance"
      ],
      correctIndex: 0,
      explanation: "Use to query/manipulate collection.",
      optionFeedback: [
        "✅ נכון. Model הוא ה-class שעובדים איתו ב-CRUD.",
        "❌ Model אינו DB — הוא מחבר ל-DB.",
        "❌ Schema → Model.",
        "❌ instance הוא Document."
      ]
    },
    {
      id: "mc_l20_insert_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::insertOne",
      level: 5,
      question: "User.insertOne(data):",
      options: [
        "Inserts single document — raw driver method, skips Mongoose middleware",
        "Insert many",
        "Read",
        "Delete"
      ],
      correctIndex: 0,
      explanation: "Faster but no validation. Prefer Model.create() for hooks.",
      optionFeedback: [
        "✅ נכון. insertOne הוא low-level — מהיר אבל פוסט hooks.",
        "❌ זה insertMany.",
        "❌ זה find.",
        "❌ זה deleteOne."
      ]
    },
    {
      id: "mc_l20_insertmany_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::insertMany",
      level: 6,
      question: "insertMany([...]):",
      options: [
        "Bulk insert — ordered:false for parallel + partial success",
        "single",
        "deprecated",
        "delete"
      ],
      correctIndex: 0,
      explanation: "Critical for migrations + seeders.",
      optionFeedback: [
        "✅ נכון. insertMany לbulk עם ordered control.",
        "❌ זה insertOne.",
        "❌ standard API.",
        "❌ insert, לא delete."
      ]
    },
    {
      id: "mc_l20_find_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::find",
      level: 5,
      question: "Model.find(filter):",
      options: [
        "Returns cursor — multiple documents matching. Awaitable to array",
        "single",
        "delete",
        "no return"
      ],
      correctIndex: 0,
      explanation: "Empty filter = all documents (use limit!).",
      optionFeedback: [
        "✅ נכון. find מחזיר cursor שמתורגם למערך.",
        "❌ זה findOne.",
        "❌ find הוא קריאה.",
        "❌ הוא מחזיר נתונים."
      ]
    },
    {
      id: "mc_l20_findone_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::findOne",
      level: 5,
      question: "Model.findOne(filter):",
      options: [
        "Returns first match or null",
        "all",
        "delete",
        "throw if missing"
      ],
      correctIndex: 0,
      explanation: "Limit:1 underneath.",
      optionFeedback: [
        "✅ נכון. findOne מחזיר ראשון או null.",
        "❌ זה find.",
        "❌ זה findOneAndDelete.",
        "❌ אם null — לא error."
      ]
    },
    {
      id: "mc_l20_findupdate_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::findOneAndUpdate",
      level: 7,
      question: "findOneAndUpdate atomicity:",
      options: [
        "Atomic — find + update single op. Race-condition safe",
        "Two ops",
        "Deprecated",
        "Read only"
      ],
      correctIndex: 0,
      explanation: "Server-side atomic. {new: true} returns updated doc.",
      optionFeedback: [
        "✅ נכון. atomic op — בטוח מ-races.",
        "❌ זה op יחיד atomic.",
        "❌ standard.",
        "❌ updates."
      ]
    },
    {
      id: "mc_l20_update_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::update",
      level: 6,
      question: "User.updateMany(filter, update):",
      options: [
        "Updates ALL matching docs — atomic per-doc, returns counts",
        "Single",
        "Insert",
        "delete"
      ],
      correctIndex: 0,
      explanation: "Use specific filter to avoid wide updates.",
      optionFeedback: [
        "✅ נכון. updateMany מעדכן את כולם.",
        "❌ זה updateOne.",
        "❌ זה insertOne.",
        "❌ זה deleteMany."
      ]
    },
    {
      id: "mc_l20_delete_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::deleteOne",
      level: 5,
      question: "User.deleteOne(filter):",
      options: [
        "Deletes first match — returns deletedCount",
        "All",
        "Insert",
        "Update"
      ],
      correctIndex: 0,
      explanation: "Returns 1 or 0.",
      optionFeedback: [
        "✅ נכון. deleteOne מסיר ראשון מתאים.",
        "❌ זה deleteMany.",
        "❌ insert הוא הוספה.",
        "❌ update הוא שינוי."
      ]
    },
    {
      id: "mc_l20_deletemany_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::deleteMany",
      level: 6,
      question: "deleteMany({}) (empty filter):",
      options: [
        "Deletes ALL documents in collection — extreme caution!",
        "no-op",
        "TypeError",
        "deletes one"
      ],
      correctIndex: 0,
      explanation: "Always have safety check.",
      optionFeedback: [
        "✅ נכון. {} = הכל — סכנה!",
        "❌ זה הסכנה — הוא כן מוחק.",
        "❌ אין שגיאה syntactically.",
        "❌ {} = match all."
      ]
    },
    {
      id: "mc_l20_eq_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::$eq",
      level: 5,
      question: "{ age: { $eq: 30 } } vs { age: 30 }:",
      options: [
        "Equivalent — implicit $eq when shorthand",
        "Different",
        "First syntax error",
        "Second deprecated"
      ],
      correctIndex: 0,
      explanation: "Shorthand for equality.",
      optionFeedback: [
        "✅ נכון. שווי-ערך — shorthand נפוץ.",
        "❌ זהים סמנטית.",
        "❌ legitimate.",
        "❌ הוא ה-default."
      ]
    },
    {
      id: "mc_l20_ne_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::$ne",
      level: 6,
      question: "{ status: { $ne: 'deleted' } } trap:",
      options: [
        "$ne מחזיר גם documents שאין להם field! — השתמש ב-$exists לחידוד",
        "מחזיר רק עם field",
        "TypeError",
        "Match all"
      ],
      correctIndex: 0,
      explanation: "Common gotcha.",
      optionFeedback: [
        "✅ נכון. trap קלאסי — צריך $exists גם.",
        "❌ דווקא כולל את שאין להם.",
        "❌ אין שגיאה.",
        "❌ specific filter."
      ]
    },
    {
      id: "mc_l20_gt_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::$gt",
      level: 5,
      question: "{ age: { $gt: 18 } }:",
      options: [
        "Strict > 18 (excludes 18). Pair with $lt for ranges",
        "≥ 18",
        "= 18",
        "≤ 18"
      ],
      correctIndex: 0,
      explanation: "Strict greater than.",
      optionFeedback: [
        "✅ נכון. $gt strict > (לא כולל 18).",
        "❌ זה $gte.",
        "❌ זה $eq.",
        "❌ זה $lte."
      ]
    },
    {
      id: "mc_l20_gte_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::$gte",
      level: 5,
      question: "$gte:",
      options: [
        "Greater than or equal (>=, inclusive)",
        "strict >",
        "<",
        "<="
      ],
      correctIndex: 0,
      explanation: "Inclusive variant.",
      optionFeedback: [
        "✅ נכון. $gte = >= (כולל גבול).",
        "❌ זה $gt.",
        "❌ זה $lt.",
        "❌ זה $lte."
      ]
    },
    {
      id: "mc_l20_lt_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::$lt",
      level: 5,
      question: "$lt:",
      options: [
        "Less than (strict <)",
        "<=",
        ">",
        ">="
      ],
      correctIndex: 0,
      explanation: "Strict.",
      optionFeedback: [
        "✅ נכון. $lt = strict < (לא כולל).",
        "❌ זה $lte.",
        "❌ זה $gt.",
        "❌ זה $gte."
      ]
    },
    {
      id: "mc_l20_lte_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::$lte",
      level: 5,
      question: "{ price: { $gte: 10, $lte: 100 } }:",
      options: [
        "Range 10-100 inclusive",
        "Only 10",
        "Only 100",
        "Excludes both"
      ],
      correctIndex: 0,
      explanation: "Closed range filter.",
      optionFeedback: [
        "✅ נכון. interval סגור [10, 100].",
        "❌ זה point query.",
        "❌ זה point query.",
        "❌ עם e לא e."
      ]
    },
    // ─── More Mongo ───
    {
      id: "mc_l20_set_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::update",
      level: 6,
      question: "{ $set: { active: true } }:",
      options: [
        "Sets field to value — atomic, doesn't replace whole doc",
        "Replaces doc",
        "Inserts",
        "Deletes"
      ],
      correctIndex: 0,
      explanation: "Most common update operator.",
      optionFeedback: [
        "✅ נכון. $set מעדכן field ספציפי atomically.",
        "❌ זה ב-$replaceWith.",
        "❌ insertOne שונה.",
        "❌ deleteMany שונה."
      ]
    },
    {
      id: "mc_l20_push_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::update",
      level: 6,
      question: "{ $push: { tags: 'new' } }:",
      options: [
        "Adds 'new' to tags array (allows duplicates). $addToSet for unique",
        "Replaces array",
        "Removes",
        "Sorts"
      ],
      correctIndex: 0,
      explanation: "Array append.",
      optionFeedback: [
        "✅ נכון. $push מוסיף — עם duplicates אפשריים.",
        "❌ זה $set.",
        "❌ זה $pull.",
        "❌ אין $sort כ-update op."
      ]
    },
    {
      id: "mc_l20_pull_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::update",
      level: 6,
      question: "{ $pull: { tags: 'old' } }:",
      options: [
        "Removes 'old' from tags array",
        "Adds",
        "Sorts",
        "Counts"
      ],
      correctIndex: 0,
      explanation: "Inverse of $push.",
      optionFeedback: [
        "✅ נכון. $pull מסיר ערך ממערך.",
        "❌ זה $push.",
        "❌ אין $sort.",
        "❌ זה $size."
      ]
    },
    {
      id: "mc_l20_inc_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::update",
      level: 6,
      question: "{ $inc: { likes: 1 } }:",
      options: [
        "Atomic counter increment — race-safe",
        "Replaces",
        "Multiplies",
        "Decrements only"
      ],
      correctIndex: 0,
      explanation: "Critical for concurrent counters.",
      optionFeedback: [
        "✅ נכון. $inc הוא atomic counter.",
        "❌ $inc מעלה, לא מחליף.",
        "❌ זה $mul.",
        "❌ -1 גם עובד."
      ]
    },
    {
      id: "mc_l20_indexes_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::find",
      level: 7,
      question: "Mongo indexes:",
      options: [
        "B-tree על fields — חיוני ל-range queries וsort. _id auto-indexed",
        "no indexes",
        "deprecated",
        "string only"
      ],
      correctIndex: 0,
      explanation: "Add via Schema.index() or createIndex().",
      optionFeedback: [
        "✅ נכון. indexes חיוניים לביצועים.",
        "❌ קיימים ובחיים.",
        "❌ standard practice.",
        "❌ עובדים לכל סוג."
      ]
    },
    {
      id: "mc_l20_aggregate_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::find",
      level: 7,
      question: "Aggregation pipeline:",
      options: [
        "Stages: $match → $group → $sort → $project — for complex queries",
        "Single op",
        "Deprecated",
        "Sync only"
      ],
      correctIndex: 0,
      explanation: "Powerful alternative to find for analytics.",
      optionFeedback: [
        "✅ נכון. aggregation = pipeline of stages.",
        "❌ pipeline של stages.",
        "❌ recommended for analytics.",
        "❌ async."
      ]
    },
    {
      id: "mc_l20_lookup_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::find",
      level: 7,
      question: "$lookup ב-aggregation:",
      options: [
        "JOIN equivalent — מחבר collection אחר לפי key",
        "Sort",
        "Filter",
        "Project"
      ],
      correctIndex: 0,
      explanation: "Mongo's join. Better than populate for complex.",
      optionFeedback: [
        "✅ נכון. $lookup הוא Mongo's JOIN.",
        "❌ זה $sort.",
        "❌ זה $match.",
        "❌ זה $project."
      ]
    },
    {
      id: "mc_l20_populate_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::find",
      level: 7,
      question: "Mongoose populate vs aggregation $lookup:",
      options: [
        "populate = N+1 (extra queries). $lookup = single aggregation pipeline",
        "אותו דבר",
        "populate faster",
        "deprecated"
      ],
      correctIndex: 0,
      explanation: "$lookup faster for many-to-many.",
      optionFeedback: [
        "✅ נכון. trade-off: developer ergonomics vs performance.",
        "❌ הבדל ביצועי קריטי.",
        "❌ N+1 לרוב slower.",
        "❌ legitimate."
      ]
    },
    {
      id: "mc_l20_validation_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::Schema",
      level: 6,
      question: "Mongoose Schema validators:",
      options: [
        "required, min, max, enum, custom validate fn",
        "אסור",
        "JS only",
        "deprecated"
      ],
      correctIndex: 0,
      explanation: "Built-in + custom.",
      optionFeedback: [
        "✅ נכון. Schema validators הם feature מרכזי.",
        "❌ הם הציר המרכזי של Schema.",
        "❌ זה ב-JS אבל זה הtypings של Mongoose.",
        "❌ standard."
      ]
    },
    {
      id: "mc_l20_lean_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::find",
      level: 8,
      question: "Mongoose .lean():",
      options: [
        "Returns POJOs (plain objects) — faster, no .save() or virtuals",
        "Slower",
        "Deprecated",
        "Required"
      ],
      correctIndex: 0,
      explanation: "Use for read-only operations.",
      optionFeedback: [
        "✅ נכון. lean() עוקף Mongoose overhead — מהיר יותר.",
        "❌ הוא דווקא מהיר יותר.",
        "❌ standard option.",
        "❌ optional optimization."
      ]
    },
  ],
  fill: [
    {
      id: "fill_l20_find_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::find",
      level: 5,
      code: "const users = await User.____({ active: true });",
      answer: "find",
      explanation: "Model.find returns matching docs."
    },
    {
      id: "fill_l20_findone_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::findOne",
      level: 5,
      code: "const u = await User.____({ email });",
      answer: "findOne",
      explanation: "findOne returns first or null."
    },
    {
      id: "fill_l20_findbyid_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::findOne",
      level: 5,
      code: "const u = await User.findById(____);",
      answer: "id",
      explanation: "findById takes ObjectId."
    },
    {
      id: "fill_l20_create_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::insertOne",
      level: 5,
      code: "const u = new User({ email });\nawait u.____();",
      answer: "save",
      explanation: ".save persists instance."
    },
    {
      id: "fill_l20_insertone_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::insertOne",
      level: 5,
      code: "await User.____({ email, name });",
      answer: "insertOne",
      explanation: "insertOne fast insert."
    },
    {
      id: "fill_l20_updateone_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::update",
      level: 6,
      code: "await User.____({ email }, { $set: { active: true } });",
      answer: "updateOne",
      explanation: "updateOne — first match."
    },
    {
      id: "fill_l20_deleteone_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::deleteOne",
      level: 5,
      code: "await User.____({ _id });",
      answer: "deleteOne",
      explanation: "deleteOne — by filter."
    },
    {
      id: "fill_l20_set_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::update",
      level: 6,
      code: "await User.updateOne({ _id }, { ____: { active: true } });",
      answer: "$set",
      explanation: "$set sets field."
    },
    {
      id: "fill_l20_push_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::update",
      level: 6,
      code: "await User.updateOne({ _id }, { ____: { tags: 'new' } });",
      answer: "$push",
      explanation: "$push adds to array."
    },
    {
      id: "fill_l20_inc_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::update",
      level: 6,
      code: "await Post.updateOne({ _id }, { ____: { views: 1 } });",
      answer: "$inc",
      explanation: "$inc atomic increment."
    },
    {
      id: "fill_l20_gt_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::$gt",
      level: 5,
      code: "User.find({ age: { ____: 18 } });  // older than 18",
      answer: "$gt",
      explanation: "$gt strict greater."
    },
    {
      id: "fill_l20_in_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::$eq",
      level: 6,
      code: "User.find({ role: { ____: ['admin', 'mod'] } });",
      answer: "$in",
      explanation: "$in matches any in array."
    },
    {
      id: "fill_l20_schema_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::Schema",
      level: 6,
      code: "const userSchema = new mongoose.____({\n  email: { type: String, required: true }\n});",
      answer: "Schema",
      explanation: "mongoose.Schema constructor."
    },
    {
      id: "fill_l20_model_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::Model",
      level: 6,
      code: "const User = mongoose.____('User', userSchema);",
      answer: "model",
      explanation: "mongoose.model registers Model."
    },
    {
      id: "fill_l20_populate_w_001",
      topicId: "topic_mongo",
      conceptKey: "lesson_20::find",
      level: 7,
      code: "const post = await Post.findById(id).____('author');",
      answer: "populate",
      explanation: "Populate replaces ObjectId with doc."
    },
  ],
};
