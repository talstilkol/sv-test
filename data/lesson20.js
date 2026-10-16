// data/lesson20.js
var LESSON_20 = {
  "id": "lesson_20",
  "title": "Database, MongoDB, Mongoose",
  "description": "סקירת יסודות מסדי נתונים מודרניים, השוואת מודלי SQL/NoSQL ועבודה מעשית עם MongoDB דרך Mongoose.",
  "concepts": [
    {
      "conceptName": "Database",
      "difficulty": 4,
      "levels": {
        "grandma": "Database זה כמו ארון תיוק ענקי: בלי זה, כל הנתונים שלך נעלמים כשמכבים את המחשב. Database שומר אותם לצמיתות — שמות משתמשים, הזמנות, הודעות. כשהאפליקציה נפתחת מחדש — הכל שם.",
        "child": "Database זה כמו ספר כתובות גדול שלא נמחק לעולם. האפליקציה שואלת: 'תן לי את כל המשתמשים'. ה-database מחפש ומחזיר. בלי database, כל הנתונים שמרת יעלמו ברגע שסוגרים את האפליקציה.",
        "soldier": "Database הוא מנגנון אחסון פרסיסטנטי. מסד נתונים מנהל: אחסון (queries), integrity, transactions, ו-indexing לחיפוש מהיר. שני מודלים עיקריים: SQL (relational, טבלאות) ו-NoSQL (document, key-value, graph).",
        "student": "DB מפריד persistence מה-application state. ACID properties: Atomicity (כל הפעולה או כלום), Consistency (מצב תקין תמיד), Isolation (transactions מבודדות), Durability (שמירה גם לאחר crash). אינדקסים מאיצים חיפוש — ב-O(log n) במקום O(n). Schema מגדיר את מבנה הנתונים.",
        "junior": "בפרויקט: בחירת DB היא architectural decision. MongoDB לnested/flexible data, הרבה reads. PostgreSQL לdata עם יחסים מורכבים, ACID חיוני. Redis לcaching וsessions. אל תשתמש ב-localStorage כ-database — זה רק browser storage. חיבור ל-DB דרך connection pool, לא חיבור חדש לכל request.",
        "professor": "Database theory: CAP theorem — Consistency, Availability, Partition tolerance (בחר שניים). SQL DBs מדגישים CA. MongoDB בconfiguration מסוימת יכול להיות CP או AP. MVCC (Multi-Version Concurrency Control) ב-PostgreSQL מאפשר reads ו-writes במקביל ללא lock. Write-Ahead Logging (WAL) מבטיח durability. Query planner מחליט execution plan — EXPLAIN ANALYZE חושף bottlenecks."
      },
      "codeExample": "// SQL — מבנה קשיח, יחסים\nSELECT users.name, orders.total\nFROM users JOIN orders ON users.id = orders.user_id\nWHERE orders.total > 100;\n\n// NoSQL (MongoDB) — מסמכים גמישים\ndb.orders.find({ total: { $gt: 100 } })\n  .populate('userId', 'name');",
      "codeExplanation": "SQL מחייב schema מוגדר מראש, JOIN בין טבלאות, ו-WHERE לסינון. MongoDB מאחסן הכל כdocument — גמיש אבל דורש populate לjoin. לשניהם אינדקסים על total יאיצו את החיפוש משמעותית."
    },
    {
      "conceptName": "SQL",
      "difficulty": 4,
      "levels": {
        "grandma": "SQL זה כמו שפה ספציפית לדבר עם ספר הכתובות הגדול: 'תן לי את כל האנשים ששמם מתחיל ב-ד'. ה-DB מבין, מחפש, ומחזיר. זו שפה שנוצרה ב-1970 ועדיין בשימוש בכל מערכת גדולה.",
        "child": "SQL זה השפה שמדברים עם מסד נתונים שמסודר בטבלאות. כמו Excel — יש שורות ועמודות. SQL אומר: 'SELECT * FROM users WHERE age > 18' — תן לי את כל המשתמשים מעל גיל 18.",
        "soldier": "SQL — Structured Query Language. CRUD: SELECT (קרא), INSERT (הוסף), UPDATE (שנה), DELETE (מחק). WHERE לסינון, ORDER BY למיון, LIMIT לkopאגמ, JOIN לחיבור טבלאות. Relational DB: MySQL, PostgreSQL, SQLite.",
        "student": "SQL מבוסס על relational model (Codd 1970). JOINs: INNER (רק התואמים), LEFT (כל השמאל + תואמים), RIGHT, FULL OUTER. Subqueries, GROUP BY + HAVING, aggregate functions (COUNT, SUM, AVG). Transactions: BEGIN, COMMIT, ROLLBACK. Indexes מאיצים SELECT אבל מאטים INSERT/UPDATE.",
        "junior": "בפרויקט: אל תכתוב SQL כstrings ידניות — SQL injection. השתמש ב-ORM (Sequelize, Prisma, TypeORM) או prepared statements: db.query('SELECT * FROM users WHERE id = $1', [userId]). N+1 problem: loop שעושה query לכל item — תחליף ב-JOIN אחד. EXPLAIN ANALYZE מגלה slow queries.",
        "professor": "SQL compliant מוגדר על ידי ANSI/ISO standard אבל כל DB מוסיף extensions. PostgreSQL: JSONB columns, CTEs, Window functions (ROW_NUMBER, RANK, LAG). Query optimizer: cost-based, מנתח statistics. VACUUM ב-PostgreSQL מנקה dead tuples. B-Tree index ברירת מחדל — GiST לgeometry, GIN לfull-text search. MVCC מאפשר snapshot isolation."
      },
      "codeExample": "-- שאילתת SQL: משתמשים עם סה\"כ הזמנות\nSELECT\n  u.id,\n  u.name,\n  COUNT(o.id) AS order_count,\n  SUM(o.total) AS total_spent\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id\nWHERE u.active = true\nGROUP BY u.id, u.name\nHAVING SUM(o.total) > 500\nORDER BY total_spent DESC;",
      "codeExplanation": "JOIN מחבר users עם orders לפי FK. LEFT JOIN מחזיר גם משתמשים ללא הזמנות. GROUP BY מקבץ לפי משתמש. HAVING מסנן אחרי aggregation (לא WHERE). ORDER BY total_spent DESC — מיון יורד. u alias עבור users, o עבור orders."
    },
    {
      "conceptName": "NoSQL",
      "difficulty": 4,
      "levels": {
        "grandma": "NoSQL זה כמו ארגז גדול שבו שמים דברים כמו שהם — לא צריך לסדר כל דבר לפי טבלה קבועה. כל 'מסמך' יכול להיות שונה מהאחר. גמיש יותר, מתאים לנתונים שמשתנים הרבה.",
        "child": "NoSQL זה כשהנתונים לא מסודרים בטבלאות קבועות. MongoDB הוא NoSQL — הוא שומר 'מסמכים' שנראים כמו JSON. כל מסמך יכול להיות שונה: אחד יש לו שדה 'address', אחר לא — ובסדר גמור.",
        "soldier": "NoSQL = not only SQL. סוגים: Document (MongoDB, CouchDB), Key-Value (Redis, DynamoDB), Column (Cassandra), Graph (Neo4j). יתרונות: flexible schema, horizontal scaling, nested data. חסרונות: פחות ACID, JOIN מורכב.",
        "student": "NoSQL מתאים ל: data שמשתנה לעתים קרובות, hierarchical/nested data, high write throughput, horizontal sharding. MongoDB: BSON (Binary JSON), יכול לאחסן arrays ונested objects. Denormalization: שמירת כל הנתונים הנחוצים ב-document אחד — מהיר לread אבל מצריך update במספר מקומות.",
        "junior": "בפרויקט: NoSQL לא אומר 'ללא schema' — Mongoose מוסיף schema validation. הכשל הנפוץ: 'אין FK אז אני שומר ObjectId ידנית' — זה עובד אבל populate שוכח ב-production ויוצר orphaned references. אל תבחר NoSQL רק כי 'זה מודרני' — אם יש relationships מורכבים, PostgreSQL עדיף.",
        "professor": "BASE model (NoSQL ל-CAP): Basically Available, Soft state, Eventually consistent — בניגוד ל-ACID. MongoDB 4+ תומך ב-multi-document transactions. Sharding: data מפוזר על שרתים לפי shard key. Replica set: primary + secondaries לHA. WiredTiger storage engine: document-level locking, compression. Aggregation pipeline — transformations בtier שרת, parallel execution."
      },
      "codeExample": "// SQL — נדרש schema קבוע\nCREATE TABLE users (\n  id SERIAL PRIMARY KEY,\n  name VARCHAR(100) NOT NULL\n);\n\n// MongoDB (NoSQL) — גמיש לחלוטין\n// document 1: { name: 'Dana', role: 'admin' }\n// document 2: { name: 'Avi', age: 25, tags: ['js','node'] }\n// אין חובת schema — כל document שונה",
      "codeExplanation": "SQL מחייב CREATE TABLE לפני כל INSERT — המבנה קבוע. MongoDB מאפשר לכל document מבנה שונה: ל-Dana יש role, ל-Avi יש age ו-tags. גמישות זו שימושית כשהנתונים מגוונים אבל יכולה לייצר inconsistency בלי validation."
    },
    {
      "conceptName": "MongoDB",
      "difficulty": 5,
      "levels": {
        "grandma": "MongoDB זה שם של תוכנה ספציפית לאחסון נתונים — כמו שExcel זה שם של תוכנה לגיליונות אלקטרוניים. MongoDB שומר נתונים כ'מסמכים' שנראים כמו קבצי JSON, ומאפשר לחפש ולעדכן אותם מהר.",
        "child": "MongoDB זה database שמשמש הרבה אפליקציות node.js. הוא שומר נתונים כ-JSON — { name: 'Dana', age: 25 }. כל פריט הוא 'document' ויש לו ID אוטומטי. מאורגן ב-collections (כמו תיקיות).",
        "soldier": "MongoDB document database. מבנה: Cluster → Database → Collection → Document. כל document הוא BSON עם _id אוטומטי. CRUD: insertOne/Many, find/findOne, updateOne/Many, deleteOne/Many. Query operators: $eq, $gt, $lt, $in, $or, $and.",
        "student": "MongoDB מאחסן BSON (Binary JSON) — תומך ב-ObjectId, Date, Binary. Aggregation pipeline: [{$match}, {$group}, {$project}, {$sort}, {$limit}]. Indexes: createIndex({ field: 1 }) עבור queries נפוצות. Atlas Search לfull-text. populate() דרך Mongoose לJOIN-like behavior.",
        "junior": "בפרויקט: חיבור דרך Mongoose, לא mongoose.connect() ישירות בכל route. Connection pooling אוטומטי. index חשוב על fields שמחפשים — ב-production, find({ email }) ללא index = full collection scan. ObjectId.toString() לJSON serialization. populate() מוסיף round-trips — לפעמים עדיף denormalize.",
        "professor": "MongoDB architecture: mongod (server), mongos (router לsharded clusters). WiredTiger storage engine: document-level locking, snappy compression. Replica set elections: primary fails → secondary נבחר ב-heartbeat timeout. Oplog (operations log) לreplication. Change Streams: watch() על collection לreal-time updates. Atlas Triggers לserverless reactions לDB changes."
      },
      "codeExample": "const mongoose = require('mongoose');\n\nasync function connectDB() {\n  try {\n    await mongoose.connect(process.env.MONGO_URI);\n    console.log('MongoDB connected');\n  } catch (err) {\n    console.error('connection failed:', err.message);\n    process.exit(1); // לא ממשיכים בלי DB\n  }\n}",
      "codeExplanation": "mongoose.connect() מתחבר פעם אחת — Mongoose מנהל connection pool אוטומטית. MONGO_URI מה-.env ולא hardcoded. process.exit(1) אם חיבור נכשל — server לא אמור לרוץ בלי DB. try/catch חיוני כי connect() מחזיר Promise."
    },
    {
      "conceptName": "MongoDB Atlas",
      "difficulty": 5,
      "levels": {
        "grandma": "MongoDB Atlas זה כמו לשכור מחסן אחסון בענן במקום לבנות מחסן בבית. אתה מנהל הנתונים — אבל המחסן עצמו, המנעולים, והתחזוקה — MongoDB דואגת לכל זה בשרתים שלה.",
        "child": "Atlas זה שירות ב-cloud — MongoDB מריצה את ה-database בשבילך בשרתים שלהם. אתה מתחבר מרחוק דרך connection string. תוכנית חינמית קיימת — מתאים לפרויקטי לימוד.",
        "soldier": "Atlas = MongoDB-as-a-Service. נרשמים ב-cloud.mongodb.com, יוצרים cluster, מוסיפים IP whitelist, יוצרים DB user, מקבלים connection string. Connection string פורמט: mongodb+srv://user:pass@cluster.mongodb.net/dbname. אל תמסור את ה-URI לאחרים.",
        "student": "Atlas מספק: automatic backups, replica set (HA), monitoring, Atlas Search, Data API, Triggers. Free tier (M0): 512MB, shared cluster. M2/M5: ייעודי. Connection string מכיל credentials — חובה לשמור ב-.env ולא ל-commit. Atlas UI מאפשר לדפדף נתונים, להריץ aggregations, ולנטר performance.",
        "junior": "בפרויקט: שמור MONGO_URI ב-.env.local ו-.env.example ללא ערכים. הוסף .env.local ל-.gitignore. ב-Vercel/Railway — הוסף env variable בdashboard. IP Whitelist: 0.0.0.0/0 לdevelopment, IP ספציפי לproduction. מחק DB users ישנים שלא בשימוש. אפשר VPC Peering לsecurity מוגבר.",
        "professor": "Atlas Global Clusters: geo-distributed data לlow-latency reads. Atlas Search: Lucene-based full-text search, facets, fuzzy matching, vector search (ל-AI). Atlas App Services: serverless functions, GraphQL API, HTTPS endpoints. Atlas Data Federation: query על S3 כ-MongoDB. Change Streams על Atlas — managed Kafka-like streaming. Atlas CLI לautomation."
      },
      "codeExample": "// .env\n// MONGO_URI=mongodb+srv://myuser:mypass@cluster0.abc.mongodb.net/mydb\n\n// server.js\nrequire('dotenv').config();\nconst mongoose = require('mongoose');\n\nmongoose.connect(process.env.MONGO_URI, {\n  serverSelectionTimeoutMS: 5000\n}).then(() => console.log('Atlas connected'))\n  .catch(err => console.error('Atlas error:', err.message));",
      "codeExplanation": "MONGO_URI נקרא מ-.env — לעולם לא hardcoded. dotenv.config() טוען את ה-.env בתחילת האפליקציה. serverSelectionTimeoutMS: 5000 — לא מחכים יותר מ-5 שניות לחיבור (מונע hang). ה-URI מגיע מ-Atlas בלחיצה על 'Connect' בממשק."
    },
    {
      "conceptName": "Cluster",
      "difficulty": 5,
      "levels": {
        "grandma": "Cluster זה קבוצה של שרתים שעובדים ביחד כמו צוות. אם שרת אחד מתקלקל — האחרים ממשיכים לעבוד. Atlas יוצר Cluster אוטומטית עם מספר שרתים — כדי שה-database שלך לא ייפול.",
        "child": "Cluster זה כמו צוות עבודה: במקום עובד אחד שיכול להיחלות — יש שלושה. אם אחד חולה — שניים ממשיכים. ב-Atlas, כל Cluster הוא replica set — אחד primary ושניים secondaries.",
        "soldier": "Atlas Cluster = קבוצת שרתי MongoDB שעובדים יחד. M0 = shared cluster (חינמי, מוגבל). Dedicated clusters: M2/M5/M10+. Replica set: primary (writes + reads) + secondaries (reads בלבד + failover). Tier אוטומטי מוגדר בהתאם לגודל הנתונים.",
        "student": "Replica set מבטיח HA: primary כותב לoplog, secondaries מעתיקים אוטומטית. אם primary נופל — election בתוך ~10 שניות. Read preference: Primary (ברירת מחדל), PrimaryPreferred, Secondary, Nearest. Write concern: majority — מחכה שרוב ה-nodes אישרו לפני return.",
        "junior": "בפרויקט: שם ה-Cluster מופיע ב-connection string. Free tier M0 מגביל connections (500) ו-storage (512MB). ב-production השתמש לפחות ב-M10. backup אוטומטי מ-M2+. Cluster size קל לשנות ב-Atlas בלי downtime. Network Access — רשימת IPs שיכולים להתחבר.",
        "professor": "Sharded cluster: mongos (router) + config servers + shards. Shard key קריטי — בחירה גרועה מייצרת hotspot. Ranged vs hashed sharding. Atlas multi-region clusters: primary ב-region אחד, secondaries באחרים לlow latency reads. Global write/read distributes data לפי user location. Electable vs non-voting nodes. Priority configuration."
      },
      "codeExample": "// Connection string כולל שם ה-Cluster\n// mongodb+srv://user:pass@cluster0.abc123.mongodb.net/myapp\n//                         ^^^^^^^^^^^^^^^^^^^^^^^^\n//                         זה שם ה-Cluster ב-Atlas\n\n// ב-.env\n// MONGO_URI=mongodb+srv://tal:pass@cluster0.abc123.mongodb.net/students\n\n// ב-Atlas: Database → myapp → Collections\n// כל DB יכול להכיל הרבה collections",
      "codeExplanation": "cluster0.abc123.mongodb.net הוא hostname של ה-Cluster ב-Atlas. ה-mongodb+srv:// protocol מגדיר TLS+DNS lookup אוטומטי. /students בסוף הURL הוא שם ה-database. ניתן להחליף בשם כלשהו — Atlas ייצור אותו אוטומטית בinsert הראשון."
    },
    {
      "conceptName": "Connection String",
      "difficulty": 5,
      "levels": {
        "grandma": "Connection String זה כמו כתובת בית + מפתח + שם השכן. בשורה אחת ארוכה יש: 'תתחבר לשרת הזה, עם שם המשתמש הזה, עם הסיסמה הזו, לDB הזה'. הכל בsyntax אחד.",
        "child": "Connection String זה הכתובת השלמה של ה-DB: כולל שם משתמש, סיסמה, איפה ה-server, ואיזה database. כמו כתובת דואל אלקטרוני שמכילה הכל. אתה שם אותו בקוד כדי ש-Mongoose ידע להתחבר.",
        "soldier": "פורמט: mongodb+srv://username:password@host/dbname?options. mongodb+srv = protocol עם TLS. username:password = credentials של DB user. host = שרת MongoDB. dbname = שם הdatabase. Options אופציונלי: authSource, readPreference.",
        "student": "Connection String components: protocol (mongodb/mongodb+srv), user:password, host[:port] (default 27017), /database, ?query-params. SRV record (mongodb+srv) מחפש DNS ומקבל list של hosts אוטומטית. Character encoding: % בpassword חייב להיות %25. Options: retryWrites=true, w=majority, tls=true.",
        "junior": "בפרויקט: MONGO_URI ב-.env — לעולם לא ב-code ישיר. הוסף ל-.gitignore. ב-CI/CD (GitHub Actions/Vercel) — הגדר כ-secret/env variable. ב-test: השתמש ב-mongodb-memory-server — DB בzikaron ללא Atlas. אם ה-password מכיל @ או : — encode עם encodeURIComponent.",
        "professor": "URI specification: RFC 3986. mongodb+srv lookups SRV record ב-DNS: _mongodb._tcp.hostname — מקבל כל ה-hosts של replica set. TXT record מכיל default options. URI options: maxPoolSize, connectTimeoutMS, serverSelectionTimeoutMS, heartbeatFrequencyMS. Mongoose parseURI מנתח ל-options object. Connection events: connected, disconnected, error, reconnected."
      },
      "codeExample": "// פורמט Connection String מ-Atlas\nconst uri = 'mongodb+srv://tal:myPass123@cluster0.abc.mongodb.net/students';\n//           ^^^^^^^^^^^ ^^^ ^^^^^^^^^ ^^^^^^^^^^^^^^^^^^^^^^^^^ ^^^^^^^^\n//           protocol   user password  host (Atlas cluster)      database\n\n// שימוש ב-Mongoose\nconst mongoose = require('mongoose');\nawait mongoose.connect(process.env.MONGO_URI);",
      "codeExplanation": "mongodb+srv:// = MongoDB SRV protocol עם TLS אוטומטי. tal:myPass123 = credentials של ה-DB user שיצרת ב-Atlas. cluster0.abc.mongodb.net = שם ה-Cluster ב-Atlas. students = שם ה-database (ייווצר אוטומטית בinsert ראשון). בפועל מגיע מ-process.env.MONGO_URI."
    },
    {
      "conceptName": "Collection",
      "difficulty": 5,
      "levels": {
        "grandma": "Collection זה כמו תיקייה בארון תיוק: תיקיית 'משתמשים', תיקיית 'הזמנות', תיקיית 'מוצרים'. כל תיקייה שומרת מסמכים מאותו סוג. ב-MongoDB, ה-database מחולק לcollections כאלו.",
        "child": "Collection זה כמו טבלה ב-Excel — אבל הרבה יותר גמישה. כל Collection שומרת מסמכים מאותו סוג: 'users' — כל המשתמשים, 'products' — כל המוצרים. בMongoose: כל Model מתחבר לcollection אחת.",
        "soldier": "Collection = קבוצה של MongoDB documents. ב-Mongoose: mongoose.model('User', schema) יוצר collection בשם 'users' (אוטומטית לפלורל). db.collection('users') דרך native driver. Collections נוצרות אוטומטית בinsert ראשון — לא צריך CREATE TABLE.",
        "student": "MongoDB לא אוכף schema ברמת ה-collection — כל document יכול להיות שונה. Mongoose מוסיף validation ברמת JS. Capped collections: גודל קבוע, documents ישנים נמחקים אוטומטית (logs). TTL index: מחיקה אוטומטית לפי תאריך. getCollectionNames() לרשימה.",
        "junior": "בפרויקט: שמות collections ב-Mongoose תמיד plural lowercase (User → users). ב-native driver: db.collection('users'). Drop collection ב-test setup: await User.deleteMany({}). ב-production — אין drop! Indexes על collection: createIndex לפני שload מגיע. Atlas UI מאפשר לדפדף collection ב-browser.",
        "professor": "Collection internals: documents מאוחסנים ב-WiredTiger pages (16KB default). ב-insert, MongoDB מקצה RecordId ובonדף מתאים. Capped collections: circular buffer, sequential writes מהירים, auto-remove oldest. Clustered collections (v5.3+): documents ממוינים לפי _id — פחות page faults לrange queries. Collection-level validation: $jsonSchema validators ב-collMod."
      },
      "codeExample": "// Mongoose יוצר collection 'users' אוטומטית\nconst User = mongoose.model('User', userSchema);\n\n// Native MongoDB driver\nconst db = mongoose.connection.db;\nconst usersCol = db.collection('users');\n\n// Collection נוצרת בinsert ראשון:\nconst user = new User({ name: 'Dana' });\nawait user.save();  // 'users' collection נוצרת כאן",
      "codeExplanation": "mongoose.model('User', schema) רושם model ויוצר collection 'users' (plural, lowercase) ב-MongoDB. Collection נוצרת physically רק בinsert ראשון — לא בmodel definition. db.collection('users') נותן גישה דרך native driver לoperations מתקדמות."
    },
    {
      "conceptName": "Document",
      "difficulty": 5,
      "levels": {
        "grandma": "Document ב-MongoDB זה כמו דף אחד בתיקייה: כל מסמך הוא רישום אחד — כמו כרטיסיית לקוח אחת. יש לו שדות כמו שם, גיל, כתובת — והכל שמור יחד בצורה של JSON.",
        "child": "Document הוא פריט אחד ב-collection. כמו שורה אחת ב-Excel — אבל יכול לכלול nested objects ומערכים. כל document מקבל _id אוטומטי. אפשר לשמור: { name: 'Dana', tags: ['js','node'], address: { city: 'TLV' } }.",
        "soldier": "MongoDB Document = BSON object. מגבלה: 16MB לdocument. כל document מקבל _id — ObjectId (24 hex chars) או ערך שמגדירים. שדות: string, number, boolean, array, object, Date, null, ObjectId. findOne() מחזיר document אחד, find() מחזיר array.",
        "student": "Document design patterns: Embedded (nested objects לנתונים שתמיד נקראים ביחד — user + address), Referenced (ObjectId לnested שיש לו חיים עצמאיים — user + orders). 1:1 → embed. 1:few → embed array. 1:many → reference. many:many → reference array. 16MB limit — אל תembed arrays גדולים.",
        "junior": "בפרויקט: Mongoose document = instance של Model. doc.save() משמר. doc.toObject() ← plain JS object. doc.toJSON() ← JSON. _id הוא ObjectId — ב-JSON מופיע כstring. השוואה: user._id.equals(otherId) לא === (ObjectId לא primitives). lean() queries מחזירות plain objects — מהירות יותר לread-only.",
        "professor": "BSON (Binary JSON) types: ObjectId (12 bytes: 4 timestamp + 5 random + 3 increment), Int32/Int64, Decimal128, Binary, Date (milliseconds), Regex, Symbol. Document versioning: __v field ב-Mongoose לoptimistic locking. Atomic document operations: findOneAndUpdate עם $set/$inc — atomic לracing conditions. Document projection: { name: 1, _id: 0 } לselect fields."
      },
      "codeExample": "// Document ב-MongoDB נראה כך:\n{\n  _id: ObjectId('64a1b2c3d4e5f6a7b8c9d0e1'),\n  name: 'Dana',\n  age: 25,\n  tags: ['javascript', 'node'],\n  address: {\n    city: 'Tel Aviv',\n    country: 'IL'\n  },\n  createdAt: ISODate('2024-01-15T10:30:00Z')\n}\n\n// קריאה דרך Mongoose\nconst user = await User.findById('64a1b2c3d4e5f6a7b8c9d0e1');\nconsole.log(user.name); // 'Dana'",
      "codeExplanation": "_id נוצר אוטומטית כObjectId — 12 bytes שמקודדים timestamp + uniqueness. nested object (address) נשמר כחלק מה-document, לא בcollection נפרדת. tags הוא array פשוט. findById() מחפש לפי _id ומחזיר Mongoose document עם כל המethods."
    },
    {
      "conceptName": "Props",
      "difficulty": 4,
      "levels": {
        "grandma": "Props בcontex של Mongoose Schema הם התכונות של כל שדה — כמו לומר: 'שדה השם הוא: מחרוזת, חובה, ולפחות 2 תווים'. זה מגדיר את 'כללי המשחק' לכל שדה בmסמך.",
        "child": "ב-Mongoose Schema, Props הם ההגדרה של כל שדה. כמו: 'name הוא string ו-required'. 'age הוא number וbrירת מחדל 18'. Props אומרים ל-Mongoose מה מותר ומה לא ב-document.",
        "soldier": "Schema field props: type (String/Number/Boolean/Date/ObjectId/Array), required, default, unique, min/max, minlength/maxlength, enum, validate, ref. { type: String, required: true, trim: true } = שדה string חובה עם הסרת רווחים.",
        "student": "Schema types: String, Number, Boolean, Date, Buffer, ObjectId, Mixed, []. Props נוספים: index (יוצר DB index), sparse (index רק לlא-null), lowercase/uppercase/trim (transform), get/set (virtual transformers), immutable (לא ניתן לשינוי לאחר יצירה). ref: 'User' ל-populate.",
        "junior": "בפרויקט: תמיד הגדר required לshדות הכרחיים — Mongoose יזרוק ValidationError לפני insert. default: Date.now לtimestamps (לא Date.now() — בלי parentheses). unique יוצר index — לא validation, אז לא מחזיר שגיאה נוחה, עדיף validate ידנית. enum: ['admin', 'user'] מגביל ערכים.",
        "professor": "Schema path options ב-Mongoose internals: SchemaType הוא base class. כל type (String, Number...) extends SchemaType. validator: { validator: fn, message: 'error' } לvalidation מותאמת. cast: MongoDB מנסה לcast types — '25' לNumber. pathsIf, discriminators ל-polymorphism. Virtual properties: get/set שלא נשמרים ב-DB. toJSON/toObject transform."
      },
      "codeExample": "const userSchema = new mongoose.Schema({\n  name: {\n    type: String,\n    required: [true, 'שם הוא שדה חובה'],\n    minlength: 2,\n    trim: true\n  },\n  email: {\n    type: String,\n    required: true,\n    unique: true,\n    lowercase: true\n  },\n  age: {\n    type: Number,\n    min: 0,\n    max: 120,\n    default: 18\n  },\n  role: {\n    type: String,\n    enum: ['admin', 'user', 'guest'],\n    default: 'user'\n  }\n});",
      "codeExplanation": "Props של כל שדה מגדירים: type (חובה), required עם הודעת שגיאה, minlength לvalidation, trim להסרת רווחים. email: unique יוצר DB index. age: min/max + default. role: enum מגביל לערכים מוגדרים בלבד — Mongoose יזרוק ValidationError על ערך לא ברשימה."
    },
    {
      "conceptName": "Value",
      "difficulty": 4,
      "levels": {
        "grandma": "Value ב-Mongoose זה הערך עצמו בשדה: אם יש שדה 'name', ה-Value הוא 'דנה'. כשמגדירים Schema, מגדירים מה הValue יכול להיות — string, number, תאריך. וכשקוראים document, הValue הוא מה ששמרנו.",
        "child": "Value זה מה שנמצא בתוך שדה. { name: 'Dana', age: 25 } — ה-value של name הוא 'Dana', ה-value של age הוא 25. כשמחפשים: User.find({ age: 25 }) — 25 הוא ה-value שמחפשים.",
        "soldier": "Value ב-Schema props: ערך ה-default, ערכי enum, ערכי min/max. בDocument: doc.fieldName מחזיר את ה-value. בQuery: { field: value } מחפש documents שיש להם ה-value הזה. Nested: doc.address.city.",
        "student": "Value types ב-BSON: String, Int32/Int64, Double, Boolean, Date, Binary, ObjectId, Array, Document (nested), Null, Regex. Mongoose cast: '25' → 25 כNumber. Comparison: MongoDB השוואה לפי BSON comparison order. Mixed type: ללא validation — גמיש אבל מאבד type safety.",
        "junior": "בפרויקט: בדיקת value לפני save. undefined ב-document לא נשמר (לא שדה null, פשוט לא קיים). null נשמר כnull. לquery ל-not exists: { field: { $exists: false } }. Update value: $set: { name: 'NewName' } — לא { name: 'NewName' } ישיר (ישחדש document שלם). getValue לtransform: schema.path('name').get(v => v.trim()).",
        "professor": "BSON comparison order (לsort ו-query): MinKey < Null < Numbers < Symbol < String < Object < Array < BinData < ObjectId < Boolean < Date < Timestamp < Regular Expression < MaxKey. Value validation pipeline: Mongoose SchemaType.checkRequired → cast → validators → save. $type operator לquery לפי BSON type. Decimal128 לfinancial precision."
      },
      "codeExample": "// ערכים ב-document\nconst user = new User({\n  name: 'Dana',       // String value\n  age: 25,            // Number value\n  active: true,       // Boolean value\n  tags: ['js'],       // Array value\n  address: { city: 'TLV' }  // Nested object value\n});\n\n// קריאת value\nconsole.log(user.name);         // 'Dana'\nconsole.log(user.address.city); // 'TLV'\nconsole.log(user.tags[0]);      // 'js'",
      "codeExplanation": "כל שדה ב-document מחזיק value בtype שהוגדר ב-Schema. גישה ל-nested value דרך dot notation (user.address.city). Array value ניגש לפי index. Mongoose validates שה-value תואם ל-type לפני save — age: 'hello' יזרוק ValidationError."
    },
    {
      "conceptName": "JSON",
      "difficulty": 4,
      "levels": {
        "grandma": "JSON זה פורמט לכתיבת מידע שנראה כמו עברית מסודרת — אבל לcomputer. { name: 'Dana', age: 25 }. גם MongoDB ואפליקציות web משתמשים בזה כדי לשלוח ולקבל מידע. פשוט, קריא, אוניברסלי.",
        "child": "JSON זה שפה שכולם מבינים — gם שרת Node.js, גם MongoDB, גם React. זה בעצם JavaScript object כתוב כstring. שולחים בין שרת ללקוח ב-HTTP. MongoDB שומר נתונים בפורמט דומה (BSON).",
        "soldier": "JSON = JavaScript Object Notation. JSON.stringify(obj) → string. JSON.parse(str) → object. מגבלות: אין function, Date הופך לstring, undefined נעלם. MongoDB מקבל ושולח JSON. res.json(data) ב-Express שולח JSON response.",
        "student": "JSON spec (RFC 8259): keys חייבים להיות strings עם מרכאות כפולות. Values: string, number, boolean, null, array, object. אין comments, אין trailing commas. JSON5 הוא superset שמאפשר את אלו. Reviver function ב-JSON.parse לtransform Date strings לDate objects. Replacer ב-JSON.stringify לfilter.",
        "junior": "בפרויקט: Express express.json() middleware מפרסר body. MongoDB driver מחזיר BSON, Mongoose הופך ל-JS objects (toJSON). ObjectId serialization: ב-JSON נראה כstring '64a1...' לא ObjectId. Date serialization: ISO string '2024-01-15T10:30:00Z'. Buffer לbase64. JSON.stringify(doc) על Mongoose document — קורא toJSON() אוטומטית.",
        "professor": "JSON parsing security: JSON.parse על untrusted input — לא יריץ code אבל __proto__ pollution אפשרי: JSON.parse('{\"__proto__\":{\"admin\":true}}'). השתמש ב-JSON.parse עם reviver או ב-library כמו secure-json-parse. JSON Schema (draft-07) לvalidation. NDJSON (Newline Delimited JSON) לstreaming. JSON Patch (RFC 6902) לpartial updates."
      },
      "codeExample": "// JS object → JSON string\nconst user = { name: 'Dana', createdAt: new Date() };\nconst json = JSON.stringify(user);\n// '{\"name\":\"Dana\",\"createdAt\":\"2024-01-15T10:30:00.000Z\"}'\n\n// JSON string → JS object\nconst parsed = JSON.parse(json);\nconsole.log(parsed.name); // 'Dana'\nconsole.log(typeof parsed.createdAt); // 'string' — לא Date!\n\n// Reviver לDate restore\nconst withDates = JSON.parse(json, (key, val) =>\n  key === 'createdAt' ? new Date(val) : val\n);",
      "codeExplanation": "JSON.stringify הופך object לstring — Date הופכת ל-ISO string. JSON.parse מחזיר object, אבל createdAt נשאר string. Reviver function מאפשר להחזיר Date objects — בודק key ואם זה 'createdAt' מחזיר new Date(val) במקום הstring."
    },
    {
      "conceptName": "Mongoose",
      "difficulty": 6,
      "levels": {
        "grandma": "Mongoose זה כמו מתרגם בין Node.js ל-MongoDB. MongoDB מדבר בשפה שלו — Mongoose מתרגם לך הכל ל-JavaScript נוח. הוא גם שומר שמה שתכניס מסודר ותקין — כמו בלן בכניסה למסעדה.",
        "child": "Mongoose זה ספריה שמחברת Node.js ל-MongoDB ומוסיפה כללים. בלי Mongoose — יכולת להכניס כל זבל ל-DB. עם Mongoose — מגדיר Schema ו-Mongoose בודק שהכל תקין לפני שמירה.",
        "soldier": "Mongoose = ODM (Object Document Mapper) ל-MongoDB. npm install mongoose. require('mongoose'), connect(), Schema, Model, CRUD. מוסיף: validation, middleware (hooks), populate (virtual JOINs), virtual properties, timestamps.",
        "student": "Mongoose stack: Connection → Schema → Model → Document. Schema defines structure. Model wraps Collection. Document wraps individual record. Middleware (hooks): pre/post save, find, delete. populate(): auto-fetch referenced documents. timestamps: { createdAt, updatedAt } אוטומטי. lean() לperformance — מחזיר plain objects.",
        "junior": "בפרויקט: mongoose.connect פעם אחת בserver.js. Schema בקובץ נפרד (models/User.js). require את ה-Model בכל route שצריך. אל תexpose _id ו-__v בAPI — השתמש ב-toJSON transform. Indexing חשוב: { email: 1 } index ב-Schema. ValidationError.errors כ-object עם key=field, value=error info.",
        "professor": "Mongoose architecture: Connection לmultiple DBs דרך createConnection(). SchemaType plugin system: mongoose.plugin(fn) לglobal behavior. Population: two-round-trip — query refs, then query referenced docs. Aggregation pipeline דרך Model.aggregate([]). Discriminators ל-polymorphic schemas (inheritance). Transactions: session = await mongoose.startSession(); session.withTransaction(async () => {...})."
      },
      "codeExample": "const mongoose = require('mongoose');\n\n// 1. Schema — מבנה\nconst userSchema = new mongoose.Schema({\n  name: { type: String, required: true },\n  email: { type: String, unique: true }\n}, { timestamps: true });\n\n// 2. Model — class עבור collection\nconst User = mongoose.model('User', userSchema);\n\n// 3. שימוש\nasync function example() {\n  const user = await User.create({ name: 'Dana', email: 'dana@test.com' });\n  const found = await User.findOne({ email: 'dana@test.com' });\n  console.log(found.createdAt); // timestamps אוטומטי\n}",
      "codeExplanation": "Mongoose מחייב 3 שלבים: Schema (מגדיר מבנה), Model (מייצג collection), Usage (CRUD). timestamps: true מוסיף createdAt ו-updatedAt אוטומטית. User.create = new User(data) + save(). mongoose.model('User', schema) יוצר collection 'users' ב-MongoDB."
    },
    {
      "conceptName": "Schema",
      "difficulty": 6,
      "levels": {
        "grandma": "Schema זה כמו טופס עם שדות קבועים: 'מה שם? מה גיל? מה אימייל?'. Schema מגדיר מה צריך להיות בכל document. אם תנסה לשמור שדה שלא ב-Schema — Mongoose יזרוק שגיאה.",
        "child": "Schema זה המפה לdocument: 'כל משתמש חייב להיות עם name (string), email (string), וגיל (מספר)'. כשיוצרים User חדש — Mongoose בודק שהכל לפי הmap. אם יש שדה שלא במפה — הוא מתעלם ממנו.",
        "soldier": "mongoose.Schema({ field: type, ... }) מגדיר מבנה. Shorthand: { name: String } או verbose: { name: { type: String, required: true } }. Options: { timestamps: true, versionKey: false, strict: true }. strict: true (ברירת מחדל) = שדות לא בschema מתעלמים.",
        "student": "Schema הוא JS object שMongose משתמש בו לvalidation ולcasting. nested schemas: { address: { city: String } }. Array of embedded: [{ title: String }]. Schema.pre('save', fn) לhooks. Schema.virtual לfields שלא נשמרים. Schema.methods לinstance methods. Schema.statics לmodel-level methods.",
        "junior": "בפרויקט: הגדר Schema בקובץ נפרד models/User.js. export Model (לא Schema). השתמש ב-timestamps: true תמיד — חינם ושימושי. strict: false בcollections legacy שיש שדות לא ידועים. runValidators: true בupdates — Schema validators לא רצים על update ברירת מחדל. discriminatorKey לpolymorphism.",
        "professor": "Schema compilation: Schema object → SchemaType map → paths Map. path(field) מחזיר SchemaType. Schema.plugin(fn) לmixins. Schema event hooks: pre hook יכול לעצור עם next(error). post hook מקבל doc שנשמר. Schema.indexes() מחזיר כל ה-indexes. Discriminator schemas יורשים מbase schema ומוסיפים fields."
      },
      "codeExample": "const userSchema = new mongoose.Schema({\n  name:  { type: String, required: true, trim: true },\n  email: { type: String, required: true, lowercase: true },\n  role:  { type: String, enum: ['admin', 'user'], default: 'user' },\n  tags:  [String],  // array of strings\n  address: {        // nested object\n    city: String,\n    country: { type: String, default: 'IL' }\n  }\n}, {\n  timestamps: true,   // מוסיף createdAt, updatedAt\n  versionKey: false   // מסיר __v\n});",
      "codeExplanation": "Schema מגדיר את כל השדות, types, validations, ו-transforms. tags: [String] זו הגדרה קצרה למערך strings. address הוא nested object. timestamps: true מוסיף createdAt/updatedAt אוטומטית. versionKey: false מסיר את שדה __v המיותר."
    },
    {
      "conceptName": "Model",
      "difficulty": 6,
      "levels": {
        "grandma": "Model ב-Mongoose זה כמו קפסולה שעוטפת collection שלמה: כל הפעולות — שמור, חפש, מחק — נעשות דרכו. כשכותבים User.find() — User הוא ה-Model, ו-find() הוא שאילתה על כל הcollection.",
        "child": "Model זה ה-class שמייצג collection שלמה ב-MongoDB. User.find() — מחזיר את כל המשתמשים. User.create() — יוצר חדש. User.deleteOne() — מוחק. דרך ה-Model עושים את כל הפעולות על ה-DB.",
        "soldier": "mongoose.model('Name', schema) מחזיר Model class. Model static methods: find, findOne, findById, create, insertMany, updateOne, updateMany, deleteOne, deleteMany, findOneAndUpdate. instance: new User(data) → doc.save(). Model שם = 'User' → collection שם = 'users' (plural lowercase).",
        "student": "Model = compiled Schema = constructor. Instance methods: doc.save(), doc.remove(), doc.populate(), doc.toObject(). Static methods ניתן להגדיר דרך Schema.statics. Query chain: User.find({active:true}).sort('-createdAt').limit(10).select('name email'). Model.countDocuments() לcount. Model.exists() לפני insert.",
        "junior": "בפרויקט: export ה-Model (לא Schema): module.exports = mongoose.model('User', userSchema). לimport: const User = require('./models/User'). avoid mongoose.model calls מחוץ לmodels/ folder. Model.findById(id) = findOne({ _id: id }). Query leans: User.find().lean() מחזיר plain objects — מהיר יותר לread-only endpoints.",
        "professor": "Model compilation: Schema → Model class (extends Document). mongoose.model cache: קריאות חוזרות לאותו שם מחזירות cached Model. Discriminator models: BaseModel.discriminator('Child', childSchema). Model.hydrate(doc) לreconstitute raw BSON. bulkWrite לatomic batch operations. Model.watch() לchange stream. aggregate() מחזיר Aggregate object עם pipeline."
      },
      "codeExample": "// models/User.js\nconst mongoose = require('mongoose');\nconst userSchema = new mongoose.Schema({\n  name: { type: String, required: true },\n  email: { type: String, unique: true }\n}, { timestamps: true });\n\n// static method\nuserSchema.statics.findByEmail = function(email) {\n  return this.findOne({ email: email.toLowerCase() });\n};\n\nmodule.exports = mongoose.model('User', userSchema);\n\n// routes/users.js\nconst User = require('../models/User');\nconst users = await User.find({ active: true }).lean();",
      "codeExplanation": "Model מוגדר ב-models/User.js ומexported. static method findByEmail נוסף דרך Schema.statics — נקרא User.findByEmail(). lean() ב-route מחזיר plain JS objects במקום Mongoose documents — מהיר יותר כשלא צריך להפעיל methods על ה-docs."
    },
    {
      "conceptName": "insertOne",
      "difficulty": 4,
      "levels": {
        "grandma": "insertOne זה לשמור פריט אחד חדש ב-DB. כמו למלא טופס ולהגיש: 'תוסיף משתמש חדש בשם דנה'. MongoDB מוסיף _id אוטומטי ומחזיר אישור.",
        "child": "insertOne מוסיף document אחד לcollection. ב-Mongoose: User.create({ name: 'Dana' }) = יוצר document חדש ושומר. מחזיר את ה-document שנשמר כולל _id החדש.",
        "soldier": "MongoDB: collection.insertOne({ data }) מחזיר { insertedId }. Mongoose: Model.create(data) = new Model(data) + save() — מחזיר saved document. save() גם עובד על instance. שניהם async — חובה await.",
        "student": "insertOne vs create vs save: insertOne (native driver) — פחות validation. create (Mongoose) — validations + hooks + middleware. save (instance) — שמור specific document. Upsert: findOneAndUpdate עם { upsert: true } — מוצא או יוצר. Ordered insert — insertMany עם ordered: false ממשיך גם אחרי שגיאה.",
        "junior": "בפרויקט: תמיד try/catch על create/save — ValidationError אם שדה חסר. error.errors כ-object: { 'email': ValidationError, 'name': ValidationError }. duplicate key error: code 11000 = unique constraint נפגע. בAPI: POST /users → User.create(req.body) → return 201 + doc. אל תחזיר passwords — select('-password').",
        "professor": "insert internals: BSON serialization → write to journal (WAL) → apply to data files. writeConcern: { w: 1 } = primary אישר, { w: 'majority' } = quorum אישר. journaling: j: true = flush לdisk לפני return. insert triggers oplog write לreplication. Mongoose pre-save hook: async fn לhash passwords לפני שמירה. DocumentNotFoundError בsave אם document נמחק בinאריin."
      },
      "codeExample": "// יצירת משתמש אחד\nasync function createUser(name, email) {\n  try {\n    const user = await User.create({ name, email });\n    console.log('נוצר:', user._id, user.createdAt);\n    return user;\n  } catch (err) {\n    if (err.code === 11000) {\n      throw new Error('אימייל כבר קיים');\n    }\n    if (err.name === 'ValidationError') {\n      const fields = Object.keys(err.errors).join(', ');\n      throw new Error(`שדות שגויים: ${fields}`);\n    }\n    throw err;\n  }\n}",
      "codeExplanation": "User.create() שומר document חדש. _id ו-createdAt (מtimestamps) מוחזרים אוטומטית. error code 11000 = duplicate key (email כבר קיים — unique index). err.name === 'ValidationError' = שדה required חסר או validation נכשל. שגיאות אחרות נזרקות שוב."
    },
    {
      "conceptName": "insertMany",
      "difficulty": 5,
      "levels": {
        "grandma": "insertMany זה כמו להגיש הרבה טפסים בבת אחת במקום אחד אחד. אם יש לך 100 משתמשים להוסיף — insertMany יוסיף את כולם בפעולה אחת. הרבה יותר מהיר מ-100 insertOne בloop.",
        "child": "insertMany מוסיף הרבה documents בבת אחת. במקום לקרוא 100 פעמים לcreate — קוראים פעם אחת עם מערך. מחזיר את כל ה-documents שנשמרו. שימושי לimport נתונים או seed data.",
        "soldier": "User.insertMany([{...}, {...}]) מחזיר array של saved documents. options: { ordered: false } ממשיך גם אם document אחד נכשל. ב-native driver: collection.insertMany(docs) מחזיר { insertedCount, insertedIds }.",
        "student": "insertMany ב-Mongoose: מריץ validation על כל document. ordered: true (ברירת מחדל) = עוצר ב-error ראשון. ordered: false = מנסה הכל ומחזיר errors בסוף. rawResult: true מחזיר MongoDB response גולמי. Performance: insert בbatch הרבה יותר מהיר מloop של create().",
        "junior": "בפרויקט: insertMany לseed data, migrations, CSV import. הגבל batch size: אם יש 10,000 records, chunk ל-500 כל פעם. validation failures מצטברות ב-MongoBulkWriteError.result.writeErrors. בtest setup: await User.insertMany(fixtures). partial success עם ordered:false — בדוק insertedCount vs input.length.",
        "professor": "insertMany internals: single round-trip לDB בניגוד לloop. Bulk insert הרבה יותר מהיר: write amplification נמוכה, journal writes מאוגדים. maxBatchSize ב-MongoDB: 100,000 documents או 48MB per batch — driver מפצל אוטומטית. bulkWrite מאפשר mix של insert/update/delete בbatch אחד. ordered batch: all-or-nothing; unordered: best-effort."
      },
      "codeExample": "// seed data — הוספת משתמשים לtest\nconst seedUsers = async () => {\n  const users = [\n    { name: 'Dana', email: 'dana@test.com', role: 'admin' },\n    { name: 'Avi',  email: 'avi@test.com',  role: 'user' },\n    { name: 'Tal',  email: 'tal@test.com',  role: 'user' }\n  ];\n\n  const result = await User.insertMany(users, { ordered: false });\n  console.log(`נוספו ${result.length} משתמשים`);\n  return result;\n};",
      "codeExplanation": "insertMany מקבל array של objects ושומר הכל בפעולה אחת. ordered: false = אם email כבר קיים ב-DB, ממשיך לשאר. מחזיר array של saved documents עם _id ו-timestamps. הרבה יותר מהיר מ-forEach + create() בloop."
    },
    {
      "conceptName": "find",
      "difficulty": 4,
      "levels": {
        "grandma": "find זה לחפש ב-DB. כמו לבקש מהספריה: 'תן לי את כל הספרים של אגתה כריסטי'. MongoDB מחזיר רשימה של כל המסמכים שתואמים. find({}) — תן לי הכל.",
        "child": "find מחפש ב-collection ומחזיר array של documents שתואמים לתנאי. User.find({ role: 'admin' }) = כל המשתמשים עם role=admin. User.find({}) = כל המשתמשים ללא תנאי.",
        "soldier": "User.find(filter) מחזיר Promise<Array>. filter: {} = הכל, { role: 'admin' } = רק admins. chain: .sort(), .limit(), .select(), .populate(). User.find().lean() = plain objects לperformance. countDocuments() לcount.",
        "student": "find() מחזיר Query object — lazy: לא מריץ עד שawait/then/exec. chain: find({}).sort({ name: 1 }).limit(10).select('name email -_id'). Projection: { name: 1 } = רק name, { password: 0 } = כולם חוץ מpassword. populate('userId') = fetch referenced doc. cursor() לstreaming גדול.",
        "junior": "בפרויקט: תמיד הגבל עם limit() — find({}) ב-production על מיליון docs = timeout. pagination: skip(page*limit).limit(limit) אבל skip גדול איטי — עדיף range query עם cursor. select('-password') למניעת דליפת password. lean() לread-only endpoints. sort('-createdAt') = מהחדש לישן.",
        "professor": "find() internals: Query object מייצר BSON filter. Execution plan: query planner מחפש index מתאים. Full collection scan (COLLSCAN) = O(n). Index scan (IXSCAN) = O(log n). hint() לforce index. explain('executionStats') לanalysis. Covered query: כל ה-projected fields ב-index = אין read לdisk. Sparse indexes לfields שלא קיימים בכל document."
      },
      "codeExample": "// find עם query chain\nconst users = await User\n  .find({ role: 'user', active: true })\n  .sort({ createdAt: -1 })\n  .limit(20)\n  .select('name email createdAt')\n  .lean();\n\n// pagination\nconst page = 2, limit = 10;\nconst skip = (page - 1) * limit;\nconst result = await User.find({}).skip(skip).limit(limit);\nconsole.log(users.length); // עד 20",
      "codeExplanation": "find מקבל filter, chain של operations: sort({ createdAt: -1 }) = מהחדש לישן. limit(20) = מקסימום 20 תוצאות. select() = רק שדות ספציפיים. lean() = plain objects. pagination: skip((page-1)*limit) לדלג על עמודים קודמים — יעיל לdata קטן, לא לmillions."
    },
    {
      "conceptName": "findOne",
      "difficulty": 4,
      "levels": {
        "grandma": "findOne מחזיר document אחד — הראשון שתואם. כמו לשאול: 'מי המשתמש עם האימייל הזה?'. אם לא נמצא — מחזיר null. שימושי לlogin, חיפוש לפי email, חיפוש לפי username.",
        "child": "findOne שונה מfind: find מחזיר array, findOne מחזיר document אחד (או null). User.findOne({ email: 'dana@test.com' }) — המשתמש הראשון עם האימייל הזה. אם לא קיים — null.",
        "soldier": "User.findOne(filter) מחזיר Promise<Document|null>. findById(id) = findOne({ _id: id }). תמיד לבדוק null לפני שימוש: if (!user) { return res.status(404)... }. select() ו-populate() עובדים גם כאן.",
        "student": "findOne vs findById: findById מהיר יותר — מניח _id ו-BSON ObjectId. findOne({ email }) מצריך index על email לביצועים. orFail() בchain: throw DocumentNotFoundError אם null. populate() אחרי findOne לfetch referenced documents. lean() לperformance בread-only.",
        "junior": "בפרויקט: login flow — User.findOne({ email }).select('+password') ('+' חשוב אם password hidden בdefault). תמיד לvalid ObjectId לפני findById: mongoose.isValidObjectId(id). findOne vs exists: לפעמים צריך רק לדעת אם קיים — User.exists({ email }) מהיר יותר (רק bool, לא fetch doc).",
        "professor": "findOne() executes first matching document in natural order (insertion order) unless sort() specified. findOneAndX methods: findOneAndUpdate, findOneAndDelete, findOneAndReplace — atomic read-modify operations. new: true option ב-findOneAndUpdate מחזיר updated document. returnDocument: 'after' ב-native driver. select('-__v') לסנן Mongoose internals."
      },
      "codeExample": "async function loginUser(email, password) {\n  // +password כי הוא hidden בselect ברירת מחדל\n  const user = await User.findOne({ email }).select('+password');\n\n  if (!user) {\n    throw new Error('משתמש לא נמצא');\n  }\n\n  const isMatch = await bcrypt.compare(password, user.password);\n  if (!isMatch) {\n    throw new Error('סיסמה שגויה');\n  }\n\n  return user;\n}",
      "codeExplanation": "findOne({ email }) מחפש לפי email — חובה index על email לביצועים. select('+password') נחוץ אם password מוגדר ב-Schema עם select:false (מוסתר בdefault). בדיקת null אחרי findOne. bcrypt.compare מאמת hash לסיסמה המוצפנת ב-DB."
    },
    {
      "conceptName": "findOneAndUpdate",
      "difficulty": 6,
      "levels": {
        "grandma": "findOneAndUpdate מחפש document ומשנה אותו בפעולה אחת. כמו: 'מצא את דנה ועדכן את הגיל שלה'. חוזר עם ה-document — לפני או אחרי השינוי. עדיף מfindOne + save נפרדים כשצריך atomicity.",
        "child": "findOneAndUpdate = מצא + עדכן ביחד. User.findOneAndUpdate({ name: 'Dana' }, { $set: { age: 31 } }, { new: true }) — מחפש דנה, מעדכן ל-31, ומחזיר את ה-document המעודכן. new: true = תחזיר את החדש.",
        "soldier": "findOneAndUpdate(filter, update, options) מחזיר document. options: { new: true } = doc אחרי update (ברירת מחדל: לפני). { upsert: true } = צור אם לא קיים. { runValidators: true } = הרץ Schema validators. update operators: $set, $inc, $push, $pull.",
        "student": "findOneAndUpdate אטומי בdocument level — אין race condition בין find לupdate. Upsert: אם לא נמצא — יוצר חדש עם merged filter+update. sort: מגדיר איזה document לבחור אם יש כמה. projection: { name: 1 } לreturn fields. findByIdAndUpdate = findOneAndUpdate({ _id: id }, ...)",
        "junior": "בפרויקט: תמיד { new: true, runValidators: true }. upsert לcreate-or-update (upsert): findOneAndUpdate({ email }, data, { upsert: true, new: true }). counter increment אטומי: { $inc: { views: 1 } } — לא צריך read-increment-write. $push לhostוספה למערך. $pull להסרה ממערך. { $addToSet: { tags: 'new' } } להוספה ללא duplicate.",
        "professor": "findOneAndUpdate internals: MongoDB מבצע atomic findAndModify command בserverside. Optimistic locking: findOneAndUpdate עם { __v: currentVersion }, { $inc: { __v: 1 } } — null return = concurrent modification detected. WiredTiger document-level locking מבטיח שאף writer אחר לא ישנה בינתיים. ArrayFilters: updateOne עם { arrayFilters: [{ 'elem.id': id }] } לupdate nested array element."
      },
      "codeExample": "// עדכון פרופיל + החזרת document מעודכן\nasync function updateProfile(userId, changes) {\n  const updated = await User.findByIdAndUpdate(\n    userId,\n    { $set: changes },\n    {\n      new: true,           // החזר document אחרי update\n      runValidators: true, // הרץ Schema validations\n      select: '-password'  // אל תחזיר password\n    }\n  );\n\n  if (!updated) throw new Error('משתמש לא נמצא');\n  return updated;\n}",
      "codeExplanation": "findByIdAndUpdate = findOneAndUpdate({ _id: userId }). $set: changes מעדכן רק שדות שנשלחו (לא מחליף document שלם). new: true = מחזיר document אחרי השינוי. runValidators: true = מריץ Schema validations על ה-update. select('-password') = לא מחזיר password."
    },
    {
      "conceptName": "update",
      "difficulty": 5,
      "levels": {
        "grandma": "update זה לשנות מידע שכבר קיים ב-DB. כמו לתקן טופס שמולא בטעות: 'תמצא את דנה ותשנה את הגיל שלה ל-26'. $set = שנה רק שדות ספציפיים בלי למחוק את השאר.",
        "child": "update שולח שינוי לdocument קיים. User.updateOne({ name: 'Dana' }, { $set: { age: 26 } }) — מוצא דנה ומשנה רק age. מחזיר { modifiedCount: 1 } — כמה documents שונו. $set חשוב — בלעדיו, MongoDB יחליף document שלם!",
        "soldier": "updateOne(filter, update, options) מחזיר { modifiedCount, matchedCount }. update operators: $set (שנה), $inc (הוסף מספר), $unset (מחק שדה), $push (הוסף למערך), $pull (הסר ממערך). ללא operator = replaces whole document! options: { upsert, runValidators }.",
        "student": "update operators: $set: { f: v } = שנה. $inc: { count: 1 } = ++ (atomic counter). $unset: { field: '' } = מחק שדה. $push: { tags: 'new' } = הוסף לmassage. $addToSet: { tags: 'x' } = הוסף רק אם לא קיים. $pull: { tags: 'old' } = הסר מmassage. $rename: { old: 'new' } = שנה שם שדה. arrayFilters לupdate nested.",
        "junior": "בפרויקט: תמיד { runValidators: true } בupdate — ברירת מחדל לא מריץ validators. updateOne מחזיר { matchedCount, modifiedCount, upsertedCount } — לא ה-document. אם צריך doc אחרי update — findOneAndUpdate. $inc לcounters — אטומי, לא צריך read-modify-write. Bulk updates: bulkWrite([{ updateMany: {} }, ...]).",
        "professor": "update command ב-MongoDB: 2 parameters: filter + update. ללא $operator = replacement (כל שדה שלא ב-update נמחק). Update operators run server-side — אין round-trip. $inc אטומי לconsistency. Multi-document updates: updateMany. writeConcern לdurability. Update pipeline (v4.2+): update יכול להיות aggregation pipeline — [{ $set: ... }] לexpressions מורכבות. arrayFilters לnested array element updates."
      },
      "codeExample": "// עדכון שדות ספציפיים — SAFE\nawait User.updateOne(\n  { _id: userId },\n  { $set: { name: 'Dana New', updatedAt: new Date() } }\n);\n\n// counter אטומי\nawait Post.updateOne({ _id: postId }, { $inc: { views: 1 } });\n\n// ⚠️ DANGER: בלי $set מחליף document שלם!\nawait User.updateOne({ _id: id }, { name: 'Dana' });\n// ^ ימחק email, role, ועוד!",
      "codeExplanation": "$set: { name, updatedAt } משנה רק שדות אלה בלי לגעת בשאר. $inc: { views: 1 } מוסיף 1 אטומית — בטוח גם בconcurrent requests. ה-updateOne האחרון ללא $set מחליף document שלם — ישמרו רק name ו-_id! הDanger comment מדגים את הבאג הנפוץ."
    },
    {
      "conceptName": "updateMany",
      "difficulty": 5,
      "levels": {
        "grandma": "updateMany שונה כמה documents בבת אחת. כמו להחליף שלט 'סגור' ב'פתוח' בכל הסניפים ביחד. User.updateMany({}, { $set: { active: true } }) — עדכון כל המשתמשים בפעולה אחת.",
        "child": "updateMany עובד כמו updateOne — אבל על הרבה documents בו-זמנית. User.updateMany({ role: 'guest' }, { $set: { active: false } }) — מכבה את כל ה-guests. {} כfilter = כולם.",
        "soldier": "updateMany(filter, update) מחזיר { matchedCount, modifiedCount }. {} filter = כל הcollection. update operators זהים לupdateOne. שימושי לmigrations: עדכון שדה חדש לכל הdocuments קיימים. כמעט תמיד צריך $set — לא replace.",
        "student": "updateMany מריץ update על כל documents שתואמים לfilter. Atomicity: ברמת document — כל document מתעדכן atomically, אבל הset כולו לא atomic (אפשר שחלק יתעדכנו לפני crash). לmigration atomic מכל הcollection — transaction. modifiedCount < matchedCount = חלק כבר עם הvalue.",
        "junior": "בפרויקט: migration — הוסף שדה חדש לכל documents: updateMany({}, { $set: { newField: defaultValue } }). data fix: updateMany({ active: null }, { $set: { active: false } }). תמיד בדוק matchedCount לפני בproduction. אל תריץ updateMany({}) על collection גדולה בpeak hours — שוקל DB. backgroundTest בscript.",
        "professor": "updateMany execution: ordered internally, document-level locks. אין atomicity לcollection שלמה ללא transaction (MongoDB 4+). $expr לupdate עם expressions: updateMany({}, [{ $set: { full: { $concat: ['$first', ' ', '$last'] } } }]). aggregate pipeline update (v4.2): updateMany({}, [{ $set: {...} }]) לexpressions מורכבות. writeConcern: majority לcritical migrations."
      },
      "codeExample": "// migration: הוסף שדה 'active' לכל users ישנים\nasync function migrationAddActive() {\n  const result = await User.updateMany(\n    { active: { $exists: false } },  // רק docs ללא active\n    { $set: { active: true } }\n  );\n  console.log(`עודכנו: ${result.modifiedCount}`);\n}\n\n// data fix: תקן role ריק\nawait User.updateMany(\n  { role: null },\n  { $set: { role: 'user' } }\n);",
      "codeExplanation": "migration: filter { active: { $exists: false } } = רק documents שאין להם שדה active עדיין. $set: { active: true } מוסיף שדה. modifiedCount מראה כמה שונו. data fix: תיקון role: null לברירת מחדל — filter מדויק חשוב, לא {} כי ישנה גם records תקינים."
    },
    {
      "conceptName": "deleteOne",
      "difficulty": 4,
      "levels": {
        "grandma": "deleteOne מוחק פריט אחד מה-DB. כמו לקחת כרטיסייה מהארון ולהשמיד. לא ניתן לבטל! תמיד לבדוק שמוחקים את הנכון לפני. deleteOne מוחק רק את הראשון שתואם — לא יותר.",
        "child": "deleteOne מוחק document אחד מה-collection. User.deleteOne({ _id: id }) — מוחק המשתמש עם ה-id הזה. מחזיר { deletedCount: 1 } אם נמצא ונמחק, { deletedCount: 0 } אם לא נמצא.",
        "soldier": "User.deleteOne(filter) מחזיר { deletedCount }. findByIdAndDelete(id) = findOneAndDelete({ _id: id }) ומחזיר ה-document שנמחק. deleteOne מוחק הראשון שתואם. תמיד לFilter מדויק — העדפה ל-_id.",
        "student": "deleteOne vs findOneAndDelete: deleteOne = מוחק, מחזיר count. findOneAndDelete = מוחק, מחזיר ה-doc שנמחק. שימושי לbefore-delete validation. pre('deleteOne') hook לcascade. Soft delete פופולרי: במקום למחוק — { $set: { deletedAt: new Date() } }. timestamps + deletedAt = audit trail.",
        "junior": "בפרויקט: העדף soft delete (deletedAt field) על hard delete — ניתן לשחזר. אם hard delete: Cascade delete — מחק related documents. לפני delete: findById לוודא קיים (404 vs 500). DELETE route: await User.findByIdAndDelete(req.params.id). אם null — 404. pre hook לcleanup: userSchema.pre('deleteOne', async function() { await Post.deleteMany({ userId: this._id }) }).",
        "professor": "deleteOne ב-WiredTiger: marks document as deleted, עדכון index. space אינו מוחזר מיד — compact()/repairDatabase() לspace reclaim. findOneAndDelete: atomic findAndModify DELETE. Delete triggers: pre deleteOne hook. orphan cleanup: בMongoDB אין FK — חובה לנהל orphans בapplication layer. Change streams מסוג 'delete' לsync עם external systems. TTL index: documents נמחקים אוטומטית לאחר expiration."
      },
      "codeExample": "// DELETE route\napp.delete('/users/:id', async (req, res) => {\n  try {\n    const user = await User.findByIdAndDelete(req.params.id);\n\n    if (!user) {\n      return res.status(404).json({ error: 'משתמש לא נמצא' });\n    }\n\n    // cascade: מחק גם posts של המשתמש\n    await Post.deleteMany({ userId: req.params.id });\n\n    res.json({ message: 'נמחק', deleted: user.name });\n  } catch (err) {\n    res.status(500).json({ error: err.message });\n  }\n});",
      "codeExplanation": "findByIdAndDelete מחזיר document שנמחק — שימושי לאישור מה נמחק. null = לא נמצא → 404. cascade: deleteMany לmחיקת posts קשורים. אין FK constraint ב-MongoDB — אתה אחראי לcascade. res.json({ deleted: user.name }) לאישור למשתמש."
    },
    {
      "conceptName": "deleteMany",
      "difficulty": 5,
      "levels": {
        "grandma": "deleteMany מוחק הרבה פריטים בבת אחת לפי תנאי. כמו לנקות מחסן — 'תזרוק כל מה שיש מלפני 2020'. שימושי לניקוי נתונים ישנים, מחיקת כל הtests, או cascade delete.",
        "child": "deleteMany מוחק כמה documents בו-זמנית. User.deleteMany({ active: false }) — מוחק כל הusers לא פעילים. deleteMany({}) — מוחק הכל. זהירות! {} כfilter = כל הcollection נמחקת.",
        "soldier": "User.deleteMany(filter) מחזיר { deletedCount }. {} = מחק הכל. filters נפוצים: { active: false }, { createdAt: { $lt: oldDate } }. שימוש בtest teardown: await User.deleteMany({}). אחרי מחיקה — אין undo!",
        "student": "deleteMany זהיר: { $lt: expiryDate } לdocuments ישנים. לפני production deleteMany: count תחילה. TTL index כחלופה לauto-expire. Pre hook לcascade. Transaction ל-deleteMany + related cleanup atomically. bulkWrite לcomplex delete+update בbatch.",
        "junior": "בפרויקט: test setup/teardown: beforeEach(async () => { await User.deleteMany({}) }). cascade: כשמוחקים user — deleteMany({ userId: id }) על posts. GDPR deletion: מחק כל data של user מכל collections. דרך scheduled job: deleteMany({ deletedAt: { $lt: thirtyDaysAgo } }) לclean up soft-deleted. Dry run: countDocuments(filter) לפני deleteMany.",
        "professor": "deleteMany execution: multiple document locks. Not atomic for collection — possible partial delete on crash without transaction. For atomic multi-doc delete: session.withTransaction. TTL index: createIndex({ expireAt: 1 }, { expireAt: 0 }) — background task, runs ~60s. drop(): removes entire collection including indexes — faster than deleteMany({}) for bulk cleanup. Atlas Data API לscheduled cleanups."
      },
      "codeExample": "// ניקוי נתונים ישנים — scheduled job\nasync function cleanupOldSessions() {\n  const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);\n\n  // dry run קודם\n  const count = await Session.countDocuments({\n    expiresAt: { $lt: cutoff }\n  });\n  console.log(`יימחקו ${count} sessions ישנות`);\n\n  if (count === 0) return;\n\n  const result = await Session.deleteMany({\n    expiresAt: { $lt: cutoff }\n  });\n  console.log(`נמחקו: ${result.deletedCount}`);\n}",
      "codeExplanation": "cutoff = 30 יום אחורה. countDocuments תחילה — dry run לוודא לא מוחקים יותר מצפוי. deleteMany על expiresAt ישן. { $lt: cutoff } = פחות מ-cutoff (ישן יותר). deletedCount מאשר כמה נמחקו. Pattern: count → verify → delete."
    },
    {
      "conceptName": "$eq",
      "difficulty": 5,
      "levels": {
        "grandma": "$eq זה 'שווה ל'. כשמחפשים ב-DB: 'תביא לי רק את עם גיל 18 בדיוק'. { age: { $eq: 18 } } זה אותו דבר כמו { age: 18 } — $eq הוא ה-'=' ב-MongoDB.",
        "child": "$eq = equals = שווה. { age: { $eq: 18 } } = כל ה-users עם age=18 בדיוק. בדרך כלל כותבים { age: 18 } קצר יותר — MongoDB מניח $eq. $eq יותר שימושי בתוך $expr ואגרגציות.",
        "soldier": "$eq = equal operator. { field: { $eq: value } } = { field: value }. כפי שמוניאם: יותר explicit. שימושי ב-$expr: { $expr: { $eq: ['$field1', '$field2'] } } — השוואת שני שדות. ב-aggregation: { $match: { age: { $eq: 18 } } }.",
        "student": "Query operators בMongoDB: comparison ($eq, $ne, $lt, $gt, $lte, $gte, $in, $nin), logical ($and, $or, $not, $nor), element ($exists, $type), evaluation ($regex, $expr, $text, $where). $eq עם null: { field: null } מוצא null ו-missing. { field: { $exists: true, $eq: null } } רק null.",
        "junior": "בפרויקט: { age: 18 } פשוט יותר מ-{ age: { $eq: 18 } }. $eq נחוץ ב-$expr: User.find({ $expr: { $eq: ['$firstName', '$lastName'] } }) — users שfirst=last name. ב-aggregation $match: { $match: { status: { $eq: 'active' } } }. TypeScript mongoose.FilterQuery: type inference עובד עם $eq.",
        "professor": "$eq matches by BSON equality: type AND value. '18' !== 18. ObjectId לא match string. null matches both null ו-missing field. Regular expression $eq: field: /pattern/ = implicit $regex, לא $eq. $expr מאפשר aggregation expressions ב-query (v3.6+). Index coverage: { field: 1 } index מכסה $eq query. Collation options לcase-insensitive string comparison."
      },
      "codeExample": "// $eq בדרך כלל implicit\nawait User.find({ role: 'admin' });           // role === 'admin'\nawait User.find({ role: { $eq: 'admin' } });  // זהה לחלוטין\n\n// $eq שימושי ב-$expr — השוואת שני שדות\nawait User.find({\n  $expr: { $eq: ['$firstName', '$lastName'] }\n});\n// מוצא users שfirstName === lastName\n\n// $eq עם null\nawait User.find({ deletedAt: null }); // null או לא קיים",
      "codeExplanation": "שתי השאילתות הראשונות זהות — { role: 'admin' } = implicit $eq. $expr נדרש להשוואת שני שדות מה-document עצמו — לא ניתן בfilter רגיל. { deletedAt: null } מוצא גם documents שאין להם deletedAt כלל — שימושי לsoft delete pattern."
    },
    {
      "conceptName": "$gt",
      "difficulty": 5,
      "levels": {
        "grandma": "$gt זה 'גדול מ'. כמו לבקש: 'תן לי כל העובדים עם משכורת מעל 10,000'. { salary: { $gt: 10000 } } = כל ה-documents שsalary גדול מ-10,000 — לא כולל 10,000 עצמו.",
        "child": "$gt = greater than = גדול מ. { age: { $gt: 18 } } = כל users עם age יותר מ-18. 18 עצמו לא נכלל. אם רוצים 18 וגם מעלה — { age: { $gte: 18 } } (gte = greater than or equal).",
        "soldier": "$gt: greater than. { age: { $gt: 18 } } = age > 18. שילוב: { age: { $gt: 18, $lt: 65 } } = range query. עובד על numbers, dates, strings (alphabetic). Date range: { createdAt: { $gt: startDate } }.",
        "student": "Range query: { age: { $gt: 18, $lte: 65 } } = age > 18 AND age <= 65. Index range scan: { age: 1 } index מייעל range queries. $gt על dates: { createdAt: { $gt: new Date('2024-01-01') } } = כל documents מ-2024 ואילך. $expr עם $gt: { $expr: { $gt: ['$score', '$passingScore'] } }.",
        "junior": "בפרויקט: dashboard queries — users פעילים ב-30 יום אחרונים: { lastLogin: { $gt: thirtyDaysAgo } }. price filtering: { price: { $gt: minPrice, $lt: maxPrice } }. Pagination cursor: { _id: { $gt: lastSeenId } } — לrange-based pagination מהיר יותר מskip. אל תשכח index על ה-field שמשתמשים ב-$gt.",
        "professor": "Range queries ב-MongoDB מנוצלים ע\"י B-Tree index range scan. Compound index: { age: 1, name: 1 } — range על age, equality על name. selectivity: $gt על field עם מעט distinct values = low selectivity = MongoDB בוחר COLLSCAN. index intersection: מספר indexes לquery אחד (narative). explain() לraחיתת execution plan."
      },
      "codeExample": "// filter לusers פעילים בחודש האחרון\nconst activeUsers = await User.find({\n  lastLogin: { $gt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }\n});\n\n// range query על מחיר\nconst products = await Product.find({\n  price: { $gt: 50, $lte: 200 }\n});\n\n// pagination מהיר (cursor-based)\nconst nextPage = await Post.find({\n  _id: { $gt: lastSeenId }  // ObjectId sortable ב-insertion order\n}).limit(20);",
      "codeExplanation": "$gt על Date: new Date(Date.now() - 30 days) = תאריך 30 יום אחורה. price: { $gt: 50, $lte: 200 } = range 51-200. cursor pagination: { _id: { $gt: lastSeenId } } עובד כי ObjectId כולל timestamp — ממוין לפי סדר insertion ומהיר יותר מskip(n)."
    },
    {
      "conceptName": "$gte",
      "difficulty": 5,
      "levels": {
        "grandma": "$gte זה 'גדול מ-או-שווה ל'. כמו לחפש 'גיל 18 ומעלה' — גם 18 עצמו נכלל. ההבדל מ-$gt: { age: { $gt: 17 } } זה אותו דבר כמו { age: { $gte: 18 } } — תלוי באיזה קצה רוצים.",
        "child": "$gte = greater than or equal = גדול או שווה. { age: { $gte: 18 } } = כל users גיל 18 ומעלה — כולל 18. אם רוצים רק מעל 18 (לא כולל) — $gt. לרצפה: $gte. לתקרה: $lte.",
        "soldier": "$gte: greater than or equal. { age: { $gte: 18 } } = age >= 18. שילוב range: { age: { $gte: 18, $lte: 65 } } = בין 18 ל-65 כולל. Date range: { createdAt: { $gte: startOfDay } }.",
        "student": "Inclusive bounds: $gte/$lte כולל את הקצה. Exclusive: $gt/$lt לא כולל. דוגמה: { price: { $gte: 0, $lte: 100 } } = 0 עד 100 כולל. Date queries: startOfMonth = new Date(year, month, 1). endOfMonth = new Date(year, month+1, 0). שילוב: { createdAt: { $gte: start, $lt: end } }.",
        "junior": "בפרויקט: minimum score filter — { score: { $gte: passingScore } }. age verification: { dateOfBirth: { $lte: eighteenYearsAgo } } = נולדו לפני 18 שנה. date range לreports: { createdAt: { $gte: startDate, $lt: endDate } } — end date exclusive ($lt לא $lte) כדי לא לכלול midnight.",
        "professor": "BSON comparison order לstring: lexicographic. $gte על strings: 'B' >= 'A'. Case sensitive unless collation. $gte על Date: milliseconds since epoch comparison. Index bounds: gte מגדיר lower bound. $gte/$lte יחד = [lower, upper] bound scan. partial index: createIndex({ score: 1 }, { partialFilterExpression: { score: { $gte: 70 } } }) — index רק להigh scorers."
      },
      "codeExample": "// מוצא משתמשים שנרשמו מינואר 2024 ואילך\nconst startDate = new Date('2024-01-01');\nconst newUsers = await User.find({\n  createdAt: { $gte: startDate }\n}).sort({ createdAt: 1 });\n\n// range query: מוצרים בטווח מחיר\nconst affordable = await Product.find({\n  price: { $gte: 50, $lte: 200 },\n  inStock: true\n});",
      "codeExplanation": "$gte: startDate כולל את ינואר 1 עצמו. sort({ createdAt: 1 }) = מהישן לחדש. range $gte/$lte: כולל שני קצוות (50 ו-200). שני conditions בfilter = implicit AND. Index על price יאיץ את הrange scan."
    },
    {
      "conceptName": "$lt",
      "difficulty": 5,
      "levels": {
        "grandma": "$lt זה 'קטן מ'. כמו לחפש: 'תביא לי כל ה-documents ישנים מיותר מ-30 יום'. { expiresAt: { $lt: now } } = כל ה-documents שתאריך התפוגה כבר עבר — לניקוי sessions.",
        "child": "$lt = less than = קטן מ. { age: { $lt: 18 } } = כל users גיל פחות מ-18 — לא כולל 18. לניקוי נתונים ישנים: { createdAt: { $lt: cutoffDate } } — ישן מ-cutoff.",
        "soldier": "$lt: less than. { age: { $lt: 18 } } = age < 18. שילוב עם $gte: { age: { $gte: 13, $lt: 18 } } = teenagers. Date cleanup: { expiresAt: { $lt: new Date() } } = expired.",
        "student": "$lt לexpiry checks: { expiresAt: { $lt: Date.now() } }. TTL index alternative: manual cleanup עם deleteMany({ expiresAt: { $lt: new Date() } }). ב-aggregation: { $match: { score: { $lt: 50 } } } לfailing students. $lt על null: null < everything בBSON order (למעט MinKey).",
        "junior": "בפרויקט: cleanup job — Session.deleteMany({ expiresAt: { $lt: new Date() } }). discount: Product.find({ price: { $lt: saleThreshold } }). risk alert: User.find({ score: { $lt: 40 } }) לlow performers. תמיד date comparison: new Date() — לא string.",
        "professor": "$lt upper bound לindex scan. compound: { $gte: low, $lt: high } = half-open interval [low, high). Useful for date buckets: day range = { $gte: startOfDay, $lt: startOfNextDay }. Index bounds calculation: $lt ≡ 'open upper bound'. null is less than numbers ב-BSON order — { field: { $lt: 0 } } לא יכלול documents שfield=null."
      },
      "codeExample": "// מחיקת sessions שפגו\nasync function cleanExpiredSessions() {\n  const now = new Date();\n  const result = await Session.deleteMany({\n    expiresAt: { $lt: now }  // פגה לפני עכשיו\n  });\n  console.log(`נמחקו ${result.deletedCount} sessions פגות`);\n}\n\n// מוצרים זולים\nconst cheap = await Product.find({\n  price: { $lt: 50 }\n}).sort({ price: 1 });",
      "codeExplanation": "$lt: now = כל sessions שexpiresAt לפני עכשיו = פגות. deleteMany מנקה הכל בפעולה אחת. מוצרים: $lt: 50 = קטן מ-50 (לא כולל 50 עצמו). sort({ price: 1 }) = מהזול לביקר."
    },
    {
      "conceptName": "$lte",
      "difficulty": 5,
      "levels": {
        "grandma": "$lte זה 'קטן מ-או-שווה ל'. כמו לחפש 'גיל 65 ומטה' — גם 65 עצמו נכלל. שימושי לage limits, מחיר מקסימלי, גבול ציון. { age: { $lte: 65 } } = כולם עד גיל 65.",
        "child": "$lte = less than or equal = קטן או שווה. { age: { $lte: 17 } } = כל users גיל 17 וצעירים יותר — כולל 17. אם לא רוצים 17 — $lt: 17. לתקרה כולל: $lte. לתקרה לא כולל: $lt.",
        "soldier": "$lte: less than or equal. { age: { $lte: 17 } } = age <= 17. שילוב: { age: { $gte: 0, $lte: 17 } } = minors. { price: { $gte: min, $lte: max } } = price range כולל קצוות.",
        "student": "$lte לinclusive upper bound. age cap: { age: { $lte: 65 } }. date: { createdAt: { $lte: endDate } } כולל endDate. שימוש עם pagination: { _id: { $lte: lastId } } = מ-lastId ואחורה. $lte עם null: { field: { $lte: 0 } } לא יכלול null (null < 0 = false in inequality context).",
        "junior": "בפרויקט: price filter — { price: { $gte: 0, $lte: maxBudget } }. senior discount: { age: { $gte: 65 } }. student discount: { age: { $lte: 25 } }. date range לreports: { $gte: startOfMonth, $lte: endOfMonth }. validation: min/max בSchema משלים $gte/$lte בquery.",
        "professor": "$lte closed upper bound. [lower, upper] = { $gte: lower, $lte: upper }. B-Tree scan: both bounds defined = tighter scan range = better performance. vs [lower, upper) = { $gte: lower, $lt: upper } = half-open, typical for date buckets. $lte null ב-BSON: null equals null in $eq but not < number."
      },
      "codeExample": "// price range filter כולל קצוות\nconst inBudget = await Product.find({\n  price: { $gte: 10, $lte: 100 }\n});\n\n// גיל מינורים (כולל 17)\nconst minors = await User.find({\n  age: { $lte: 17 }\n});\n\n// report לחודש\nconst jan = await Order.find({\n  createdAt: {\n    $gte: new Date('2024-01-01'),\n    $lte: new Date('2024-01-31T23:59:59.999Z')\n  }\n});",
      "codeExplanation": "$gte/$lte יחד: range כולל שני קצוות (10 ו-100). minors: $lte: 17 כולל 17. date range: $lte: endOfJanuary (last millisecond) כולל את כל היום האחרון. לreport מלא לחודש חשוב לכלול 23:59:59.999 אחרת מחמיצים transactions מהיום האחרון."
    },
    {
      "conceptName": "$ne",
      "difficulty": 5,
      "levels": {
        "grandma": "$ne זה 'לא שווה ל'. כמו לחפש 'כל המשתמשים חוץ מ-admins'. { role: { $ne: 'admin' } } = כל ה-documents שrole לא admin. שימושי כשיותר קל להגדיר מה לא רוצים.",
        "child": "$ne = not equal = לא שווה. { status: { $ne: 'deleted' } } = כל items שלא נמחקו. כמו not-filter: מחזיר כל מה שלא מתאים לvalue שהגדרת. מחזיר גם documents שה-field לא קיים בכלל.",
        "soldier": "$ne: not equal. { status: { $ne: 'deleted' } } = status !== 'deleted'. מחזיר documents שstatus != value, כולל documents בלי שדה status. $nin: not in array: { role: { $nin: ['admin', 'superadmin'] } }.",
        "student": "$ne vs $nin: { field: { $ne: val } } = ערך אחד. { field: { $nin: [v1, v2] } } = רשימה. $ne מחזיר גם documents שה-field missing. לfilter רק קיים ולא שווה: { field: { $exists: true, $ne: val } }. $ne לא מנצל index טוב (low selectivity when most docs match).",
        "junior": "בפרויקט: soft delete filter — { deletedAt: { $ne: null } } = כל שנמחקו רכות, { deletedAt: null } = כל הפעילים. active users: { status: { $ne: 'banned' } }. $ne פחות יעיל מ-$eq ב-index — המון documents תואמים = COLLSCAN. אם יש רק 2 ערכים — עדיף { active: true } מאשר { active: { $ne: false } }.",
        "professor": "$ne inverts $eq match. ב-index: MongoDB creates inverted plan — scans everything except matching range. Low selectivity: { status: { $ne: 'deleted' } } כשרוב records active = index לא עוזר. Alternative: partial index { active: true } + query { active: true } — more efficient. $not: { $not: { $gt: 5 } } = <=5. Use $nin sparingly on indexed fields."
      },
      "codeExample": "// מציא כל users פעילים (לא banned ולא deleted)\nconst activeUsers = await User.find({\n  status: { $ne: 'banned' },\n  deletedAt: null  // null כולל גם missing field\n});\n\n// $nin: filter כמה ערכים\nconst notAdmins = await User.find({\n  role: { $nin: ['admin', 'superadmin', 'moderator'] }\n});\n\n// soft delete: הצג רק פעילים\nconst posts = await Post.find({ deletedAt: { $eq: null } });",
      "codeExplanation": "$ne: 'banned' מחזיר גם users שstatus לא קיים. deletedAt: null = לא נמחקו (soft delete pattern). $nin כשיש מספר ערכים לא-רצויים — קצר מ-$ne כפול. הדוגמה האחרונה: $eq: null יותר explicit מ-deletedAt: null (אותה תוצאה)."
    }
  ],
  "quiz": [
    {
      "question": "שיעור 20 — Database, MongoDB, Mongoose: מה נכון לגבי המושג \"Database\"?",
      "options": [
        "Database הוא מושג מרכזי בשיעור Database, MongoDB, Mongoose ולרוב מהווה חלק מהעבודה היומיומית בקוד.",
        "זה שימוש רטורי בלבד ולא קשור לפיתוח מעשי.",
        "אפשר להחליף מושג זה בכל API מבלי לשנות את הלוגיקה.",
        "רק בספריות צד שלישי קיימת משמעות לעניין."
      ],
      "correct": 0,
      "explanation": "התשובה הנכונה היא שהמושג \"Database\" מייצג מרכיב פרקטי ורלוונטי בהקשר של השיעור, ולכן הוא מופיע בפועל בקוד."
    },
    {
      "question": "שיעור 20 — Database, MongoDB, Mongoose: מה נכון לגבי המושג \"SQL\"?",
      "options": [
        "SQL הוא מושג מרכזי בשיעור Database, MongoDB, Mongoose ולרוב מהווה חלק מהעבודה היומיומית בקוד.",
        "זה שימוש רטורי בלבד ולא קשור לפיתוח מעשי.",
        "אפשר להחליף מושג זה בכל API מבלי לשנות את הלוגיקה.",
        "רק בספריות צד שלישי קיימת משמעות לעניין."
      ],
      "correct": 0,
      "explanation": "התשובה הנכונה היא שהמושג \"SQL\" מייצג מרכיב פרקטי ורלוונטי בהקשר של השיעור, ולכן הוא מופיע בפועל בקוד."
    },
    {
      "question": "שיעור 20 — Database, MongoDB, Mongoose: מה נכון לגבי המושג \"NoSQL\"?",
      "options": [
        "NoSQL הוא מושג מרכזי בשיעור Database, MongoDB, Mongoose ולרוב מהווה חלק מהעבודה היומיומית בקוד.",
        "זה שימוש רטורי בלבד ולא קשור לפיתוח מעשי.",
        "אפשר להחליף מושג זה בכל API מבלי לשנות את הלוגיקה.",
        "רק בספריות צד שלישי קיימת משמעות לעניין."
      ],
      "correct": 0,
      "explanation": "התשובה הנכונה היא שהמושג \"NoSQL\" מייצג מרכיב פרקטי ורלוונטי בהקשר של השיעור, ולכן הוא מופיע בפועל בקוד."
    },
    {
      "question": "שיעור 20 — Database, MongoDB, Mongoose: מה נכון לגבי המושג \"MongoDB\"?",
      "options": [
        "MongoDB הוא מושג מרכזי בשיעור Database, MongoDB, Mongoose ולרוב מהווה חלק מהעבודה היומיומית בקוד.",
        "זה שימוש רטורי בלבד ולא קשור לפיתוח מעשי.",
        "אפשר להחליף מושג זה בכל API מבלי לשנות את הלוגיקה.",
        "רק בספריות צד שלישי קיימת משמעות לעניין."
      ],
      "correct": 0,
      "explanation": "התשובה הנכונה היא שהמושג \"MongoDB\" מייצג מרכיב פרקטי ורלוונטי בהקשר של השיעור, ולכן הוא מופיע בפועל בקוד."
    },
    {
      "question": "שיעור 20 — Database, MongoDB, Mongoose: מה נכון לגבי המושג \"MongoDB Atlas\"?",
      "options": [
        "MongoDB Atlas הוא מושג מרכזי בשיעור Database, MongoDB, Mongoose ולרוב מהווה חלק מהעבודה היומיומית בקוד.",
        "זה שימוש רטורי בלבד ולא קשור לפיתוח מעשי.",
        "אפשר להחליף מושג זה בכל API מבלי לשנות את הלוגיקה.",
        "רק בספריות צד שלישי קיימת משמעות לעניין."
      ],
      "correct": 0,
      "explanation": "התשובה הנכונה היא שהמושג \"MongoDB Atlas\" מייצג מרכיב פרקטי ורלוונטי בהקשר של השיעור, ולכן הוא מופיע בפועל בקוד."
    },
    {
      "question": "שיעור 20 — Database, MongoDB, Mongoose: מה נכון לגבי המושג \"Cluster\"?",
      "options": [
        "Cluster הוא מושג מרכזי בשיעור Database, MongoDB, Mongoose ולרוב מהווה חלק מהעבודה היומיומית בקוד.",
        "זה שימוש רטורי בלבד ולא קשור לפיתוח מעשי.",
        "אפשר להחליף מושג זה בכל API מבלי לשנות את הלוגיקה.",
        "רק בספריות צד שלישי קיימת משמעות לעניין."
      ],
      "correct": 0,
      "explanation": "התשובה הנכונה היא שהמושג \"Cluster\" מייצג מרכיב פרקטי ורלוונטי בהקשר של השיעור, ולכן הוא מופיע בפועל בקוד."
    },
    {
      "question": "שיעור 20 — Database, MongoDB, Mongoose: מה נכון לגבי המושג \"Connection String\"?",
      "options": [
        "Connection String הוא מושג מרכזי בשיעור Database, MongoDB, Mongoose ולרוב מהווה חלק מהעבודה היומיומית בקוד.",
        "זה שימוש רטורי בלבד ולא קשור לפיתוח מעשי.",
        "אפשר להחליף מושג זה בכל API מבלי לשנות את הלוגיקה.",
        "רק בספריות צד שלישי קיימת משמעות לעניין."
      ],
      "correct": 0,
      "explanation": "התשובה הנכונה היא שהמושג \"Connection String\" מייצג מרכיב פרקטי ורלוונטי בהקשר של השיעור, ולכן הוא מופיע בפועל בקוד."
    },
    {
      "question": "שיעור 20 — Database, MongoDB, Mongoose: מה נכון לגבי המושג \"Collection\"?",
      "options": [
        "Collection הוא מושג מרכזי בשיעור Database, MongoDB, Mongoose ולרוב מהווה חלק מהעבודה היומיומית בקוד.",
        "זה שימוש רטורי בלבד ולא קשור לפיתוח מעשי.",
        "אפשר להחליף מושג זה בכל API מבלי לשנות את הלוגיקה.",
        "רק בספריות צד שלישי קיימת משמעות לעניין."
      ],
      "correct": 0,
      "explanation": "התשובה הנכונה היא שהמושג \"Collection\" מייצג מרכיב פרקטי ורלוונטי בהקשר של השיעור, ולכן הוא מופיע בפועל בקוד."
    },
    {
      "question": "שיעור 20 — Database, MongoDB, Mongoose: מה נכון לגבי המושג \"Document\"?",
      "options": [
        "Document הוא מושג מרכזי בשיעור Database, MongoDB, Mongoose ולרוב מהווה חלק מהעבודה היומיומית בקוד.",
        "זה שימוש רטורי בלבד ולא קשור לפיתוח מעשי.",
        "אפשר להחליף מושג זה בכל API מבלי לשנות את הלוגיקה.",
        "רק בספריות צד שלישי קיימת משמעות לעניין."
      ],
      "correct": 0,
      "explanation": "התשובה הנכונה היא שהמושג \"Document\" מייצג מרכיב פרקטי ורלוונטי בהקשר של השיעור, ולכן הוא מופיע בפועל בקוד."
    },
    {
      "question": "שיעור 20 — Database, MongoDB, Mongoose: מה נכון לגבי המושג \"Props\"?",
      "options": [
        "Props הוא מושג מרכזי בשיעור Database, MongoDB, Mongoose ולרוב מהווה חלק מהעבודה היומיומית בקוד.",
        "זה שימוש רטורי בלבד ולא קשור לפיתוח מעשי.",
        "אפשר להחליף מושג זה בכל API מבלי לשנות את הלוגיקה.",
        "רק בספריות צד שלישי קיימת משמעות לעניין."
      ],
      "correct": 0,
      "explanation": "התשובה הנכונה היא שהמושג \"Props\" מייצג מרכיב פרקטי ורלוונטי בהקשר של השיעור, ולכן הוא מופיע בפועל בקוד."
    }
  ]
};
