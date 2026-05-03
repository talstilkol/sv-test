// Sprint 2 batch MM - OOP patterns + design patterns (Singleton/Factory/Observer/Strategy/Decorator)
// 50 questions: 35 MC + 15 Fill
window.QUESTIONS_SHARD_MM = {
  mc: [
    { id: "mc_oop_singleton_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 7,
      question: "מה Singleton pattern?",
      options: [
        "מבטיח שיש instance יחיד לקלאס + נקודת גישה גלובלית. ב-JS ניתן לממש עם module export או class instance",
        "Multiple instances",
        "Inheritance",
        "Composition"
      ],
      correctIndex: 0,
      explanation: "ב-JS modules: export const db = new DB(); — Singleton בפועל. אנטי-pattern לכניסה גלובלית.",
      optionFeedback: [
        "✅ נכון.",
        "❌ הפוך.",
        "❌ pattern אחר.",
        "❌ pattern אחר."
      ]
    },
    { id: "mc_oop_factory_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 7,
      question: "מה Factory pattern?",
      options: [
        "Function/method שמחזירה instance של class — מאפשרת לוגיקה (קביעת sub-class לפי input) במקום new ישיר",
        "Constructor",
        "Singleton",
        "Mixin"
      ],
      correctIndex: 0,
      explanation: "function createShape(type) { switch(type){...}; return new ...; }. abstraction מעל constructors.",
      optionFeedback: [
        "✅ נכון.",
        "❌ constructor פנימי.",
        "❌ Singleton שונה.",
        "❌ mixin שונה."
      ]
    },
    { id: "mc_oop_observer_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 7,
      question: "מה Observer pattern?",
      options: [
        "Subject מחזיק רשימת observers ומודיע להם על שינויים. בסיס לevents/EventEmitter/RxJS",
        "Singleton",
        "Iterator",
        "Decorator"
      ],
      correctIndex: 0,
      explanation: "subject.subscribe(observer); subject.notify() → observer.update(). Pub/sub variant.",
      optionFeedback: [
        "✅ נכון.",
        "❌ pattern אחר.",
        "❌ pattern אחר.",
        "❌ pattern אחר."
      ]
    },
    { id: "mc_oop_pubsub_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 7,
      question: "מה ההבדל בין Pub/Sub ל-Observer?",
      options: [
        "Pub/Sub: broker בין publisher ל-subscriber, decoupled. Observer: ישיר, subject מכיר observers",
        "זהים",
        "Pub/Sub sync",
        "Observer async"
      ],
      correctIndex: 0,
      explanation: "Pub/Sub: Redis pubsub, EventBridge. Observer: addEventListener.",
      optionFeedback: [
        "✅ נכון.",
        "❌ שונים בdecoupling.",
        "❌ דומה.",
        "❌ דומה."
      ]
    },
    { id: "mc_oop_strategy_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 7,
      question: "מה Strategy pattern?",
      options: [
        "Encapsulation של algorithms ב-classes ניתנים להחלפה ב-runtime: PaymentStrategy → CreditCard, PayPal, ApplePay",
        "Inheritance",
        "Mixin",
        "Singleton"
      ],
      correctIndex: 0,
      explanation: "ב-JS: object עם methods, או הרכבה: const ctx = { strategy }; ctx.strategy.execute().",
      optionFeedback: [
        "✅ נכון.",
        "❌ pattern אחר.",
        "❌ pattern אחר.",
        "❌ pattern אחר."
      ]
    },
    { id: "mc_oop_decorator_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 8,
      question: "מה Decorator pattern (לא decorator syntax)?",
      options: [
        "עוטף object ומוסיף behavior בלי לשנות את הoriginal class. נפוץ ב-NestJS, middleware patterns",
        "Inheritance",
        "Mixin",
        "Static"
      ],
      correctIndex: 0,
      explanation: "function withLogging(fn) { return (...args) => { console.log('call'); return fn(...args); } }.",
      optionFeedback: [
        "✅ נכון.",
        "❌ inheritance שונה.",
        "❌ mixin שונה.",
        "❌ static שונה."
      ]
    },
    { id: "mc_oop_adapter_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 7,
      question: "מה Adapter pattern?",
      options: [
        "ממיר interface של class לinterface אחר שלקוח מצפה לו. שימושי לintegration של legacy/3rd-party",
        "Inheritance",
        "Composition",
        "Singleton"
      ],
      correctIndex: 0,
      explanation: "Wrap LegacyAPI ב-adapter עם new API. נפוץ במעבר בין ספריות.",
      optionFeedback: [
        "✅ נכון.",
        "❌ inheritance שונה.",
        "❌ composition keler.",
        "❌ singleton שונה."
      ]
    },
    { id: "mc_oop_facade_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 7,
      question: "מה Facade pattern?",
      options: [
        "מספק unified interface לסט של sub-systems מורכבים. מסתיר complexity, מקצר API surface",
        "Inheritance",
        "Adapter",
        "Singleton"
      ],
      correctIndex: 0,
      explanation: "jQuery הוא facade על DOM API. או UserFacade שעוטף UserRepo + UserService + UserAuth.",
      optionFeedback: [
        "✅ נכון.",
        "❌ pattern אחר.",
        "❌ Adapter ממיר interface.",
        "❌ Singleton שונה."
      ]
    },
    { id: "mc_oop_proxy_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 8,
      question: "מה Proxy pattern (OOP)?",
      options: [
        "Stand-in לobject אמיתי — שולט בגישה: lazy loading, caching, access control. ב-JS עוזר ב-Proxy native",
        "Adapter",
        "Decorator",
        "Facade"
      ],
      correctIndex: 0,
      explanation: "VirtualProxy: lazy load DB query. ProtectionProxy: auth checks.",
      optionFeedback: [
        "✅ נכון.",
        "❌ Adapter ממיר interface.",
        "❌ Decorator מוסיף behavior.",
        "❌ Facade מספק interface."
      ]
    },
    { id: "mc_oop_command_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 8,
      question: "מה Command pattern?",
      options: [
        "Encapsulates request כ-object — מאפשר parametrize, queue, undo, log. בסיס ל-undo/redo",
        "Strategy",
        "Observer",
        "Iterator"
      ],
      correctIndex: 0,
      explanation: "{ execute(), undo() }. שמירת history של commands → undo/redo.",
      optionFeedback: [
        "✅ נכון.",
        "❌ pattern אחר.",
        "❌ pattern אחר.",
        "❌ pattern אחר."
      ]
    },
    { id: "mc_oop_iterator_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 7,
      question: "מה Iterator pattern?",
      options: [
        "Sequential access לcollection בלי לחשוף את ה-implementation. ב-JS: Symbol.iterator, generators, for...of",
        "Loop",
        "Observer",
        "Strategy"
      ],
      correctIndex: 0,
      explanation: "class Range { [Symbol.iterator]() { ... } } — for(const x of range) works.",
      optionFeedback: [
        "✅ נכון.",
        "❌ loop syntax.",
        "❌ pattern אחר.",
        "❌ pattern אחר."
      ]
    },
    { id: "mc_oop_state_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 8,
      question: "מה State pattern?",
      options: [
        "Object משנה behavior כתלות ב-state פנימי — נראה כאילו class שונה. שימושי ל-state machines",
        "Strategy",
        "Singleton",
        "Static"
      ],
      correctIndex: 0,
      explanation: "Order: PendingState → PaidState → ShippedState — כל אחד מטפל ב-actions אחרת.",
      optionFeedback: [
        "✅ נכון.",
        "❌ Strategy similar but external choice.",
        "❌ pattern אחר.",
        "❌ pattern אחר."
      ]
    },
    { id: "mc_oop_template_method_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 8,
      question: "מה Template Method pattern?",
      options: [
        "Class בסיס מגדיר את ה-skeleton של algorithm + override-able steps. sub-classes משלימים פרטים",
        "Concrete only",
        "Static",
        "Mixin"
      ],
      correctIndex: 0,
      explanation: "class Game { play() { setup(); turn(); end(); } } — sub-classes overrideAdAction.",
      optionFeedback: [
        "✅ נכון.",
        "❌ הפוך.",
        "❌ pattern אחר.",
        "❌ pattern אחר."
      ]
    },
    { id: "mc_oop_chain_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 8,
      question: "מה Chain of Responsibility?",
      options: [
        "Request עובר דרך chain של handlers — כל handler מחליט אם לטפל או להעביר. שימושי ב-Express middleware",
        "Pipeline",
        "Strategy",
        "Composite"
      ],
      correctIndex: 0,
      explanation: "Express: app.use((req,res,next)=>{...; next();}) — chain.",
      optionFeedback: [
        "✅ נכון.",
        "❌ pipeline סוג של זה.",
        "❌ pattern אחר.",
        "❌ pattern אחר."
      ]
    },
    { id: "mc_oop_composite_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 8,
      question: "מה Composite pattern?",
      options: [
        "Tree structure שטיפול אחיד ב-leaf ו-composite. דוגמה: file system, DOM",
        "Adapter",
        "Decorator",
        "Singleton"
      ],
      correctIndex: 0,
      explanation: "Component interface (size, render). File ו-Folder שניהם מממשים. Folder.size = sum of children.",
      optionFeedback: [
        "✅ נכון.",
        "❌ pattern אחר.",
        "❌ pattern אחר.",
        "❌ pattern אחר."
      ]
    },
    { id: "mc_oop_di_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 8,
      question: "מה Dependency Injection?",
      options: [
        "Object מקבל את ה-deps שלו מבחוץ (constructor injection) במקום ליצור בעצמו — testable, decoupled",
        "Inheritance",
        "Singleton",
        "Static"
      ],
      correctIndex: 0,
      explanation: "constructor(private db) — לא new DB() בפנים. NestJS, Angular, InversifyJS.",
      optionFeedback: [
        "✅ נכון.",
        "❌ pattern אחר.",
        "❌ pattern אחר.",
        "❌ pattern אחר."
      ]
    },
    { id: "mc_oop_solid_s_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 7,
      question: "מה SOLID — S?",
      options: [
        "Single Responsibility — class ימשיך תפקיד אחד, סיבה אחת לשינוי. UserRepo נפרד מUserAuth",
        "Singleton",
        "Static",
        "Synchronous"
      ],
      correctIndex: 0,
      explanation: "אם ה-class גדול ועוסק בכמה דברים — split. שמירה על cohesion גבוה.",
      optionFeedback: [
        "✅ נכון.",
        "❌ Singleton pattern.",
        "❌ unrelated.",
        "❌ unrelated."
      ]
    },
    { id: "mc_oop_solid_o_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 7,
      question: "מה SOLID — O?",
      options: [
        "Open/Closed — open for extension, closed for modification. Strategy/Plugin patterns מאפשרים זאת",
        "Optional",
        "Override",
        "Object"
      ],
      correctIndex: 0,
      explanation: "הוסף בלי לשנות קוד קיים. polymorphism עוזר. מונע breaking changes.",
      optionFeedback: [
        "✅ נכון.",
        "❌ unrelated.",
        "❌ context שונה.",
        "❌ generic."
      ]
    },
    { id: "mc_oop_solid_l_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 8,
      question: "מה SOLID — L?",
      options: [
        "Liskov Substitution — sub-class חייב להיות replaceable למקום parent בלי לשבור התנהגות צפויה",
        "Late binding",
        "Linker",
        "Linear"
      ],
      correctIndex: 0,
      explanation: "Square extends Rectangle הוא סיפוק קלאסי — square.setWidth משנה גם height, שובר Rectangle.",
      optionFeedback: [
        "✅ נכון.",
        "❌ unrelated.",
        "❌ unrelated.",
        "❌ unrelated."
      ]
    },
    { id: "mc_oop_solid_i_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 7,
      question: "מה SOLID — I?",
      options: [
        "Interface Segregation — interface קטן ספציפי עדיף על interface ענקי שכופה דברים מיותרים",
        "Inheritance",
        "Implementation",
        "Iteration"
      ],
      correctIndex: 0,
      explanation: "Printer + Scanner + Fax כ-interfaces נפרדים, לא MultiFunctionDevice ענק.",
      optionFeedback: [
        "✅ נכון.",
        "❌ pattern אחר.",
        "❌ generic.",
        "❌ unrelated."
      ]
    },
    { id: "mc_oop_solid_d_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 8,
      question: "מה SOLID — D?",
      options: [
        "Dependency Inversion — high-level modules תלויים בabstractions, לא בlow-level. שניהם תלויים ב-interface",
        "Direct binding",
        "Default",
        "Dispose"
      ],
      correctIndex: 0,
      explanation: "Service depends on Logger interface, not specific FileLogger. ניתן להחליף בקלות.",
      optionFeedback: [
        "✅ נכון.",
        "❌ הפוך.",
        "❌ unrelated.",
        "❌ unrelated."
      ]
    },
    { id: "mc_oop_composition_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 7,
      question: "למה composition עדיף על inheritance ברוב המקרים?",
      options: [
        "Flexible, testable, מונע tight coupling, fragile base class problem. 'has-a' בדרך כלל יותר מ-'is-a'",
        "Faster",
        "OOP",
        "TypeScript"
      ],
      correctIndex: 0,
      explanation: "Inheritance: tight at compile time. Composition: dependencies via interfaces, swappable.",
      optionFeedback: [
        "✅ נכון.",
        "❌ ביצועים דומים.",
        "❌ שניהם OOP.",
        "❌ unrelated."
      ]
    },
    { id: "mc_oop_mixin_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 8,
      question: "מה mixin ב-JS?",
      options: [
        "Object/function שמוסיף methods לclass בלי extends — Object.assign(C.prototype, mixinMethods). multiple 'inheritance' חלקי",
        "Class",
        "Inheritance",
        "Singleton"
      ],
      correctIndex: 0,
      explanation: "Pre-class JS pattern. Object.assign(target.prototype, ...mixins).",
      optionFeedback: [
        "✅ נכון.",
        "❌ class הוא syntax.",
        "❌ inheritance הוא extends.",
        "❌ pattern אחר."
      ]
    },
    { id: "mc_oop_polymorphism_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 7,
      question: "מה polymorphism?",
      options: [
        "אותו interface, אבל implementation שונה לפי class. animal.speak() מחזיר 'meow' או 'woof' לפי instance",
        "Inheritance",
        "Encapsulation",
        "Static"
      ],
      correctIndex: 0,
      explanation: "Late binding — בpolymorphism dispatch לפי runtime type. Method overriding.",
      optionFeedback: [
        "✅ נכון.",
        "❌ inheritance enables it.",
        "❌ pillar אחר.",
        "❌ unrelated."
      ]
    },
    { id: "mc_oop_encapsulation_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 6,
      question: "מה encapsulation?",
      options: [
        "מסתיר state פנימי ומציג API public — sub-classes ו-clients לא תלויים בdetails. ב-JS: # private fields",
        "Inheritance",
        "Polymorphism",
        "Static"
      ],
      correctIndex: 0,
      explanation: "Pillar of OOP. אחד הסיבות העיקריות לcleaner code.",
      optionFeedback: [
        "✅ נכון.",
        "❌ pillar אחר.",
        "❌ pillar אחר.",
        "❌ unrelated."
      ]
    },
    { id: "mc_oop_abstraction_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 7,
      question: "מה abstraction?",
      options: [
        "הצגת features רלוונטיים בלבד, הסתרת complexity. interface מגדיר 'מה' לא 'איך'",
        "Inheritance",
        "Encapsulation",
        "Composition"
      ],
      correctIndex: 0,
      explanation: "Storage interface: read(), write() — abstraction מעל File/S3/Mongo.",
      optionFeedback: [
        "✅ נכון.",
        "❌ pillar אחר.",
        "❌ pillar אחר.",
        "❌ pattern אחר."
      ]
    },
    { id: "mc_oop_dataclass_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 7,
      question: "מה Data Transfer Object (DTO)?",
      options: [
        "Plain object שמעביר data בין layers — אין logic, רק structure. נפוץ ב-NestJS עם class-validator",
        "Domain object",
        "Database",
        "Service"
      ],
      correctIndex: 0,
      explanation: "DTO ל-API requests/responses. נפרד מ-Domain Entity (יש לו logic).",
      optionFeedback: [
        "✅ נכון.",
        "❌ Domain ≠ DTO.",
        "❌ DB hello.",
        "❌ service שונה."
      ]
    },
    { id: "mc_oop_value_object_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 8,
      question: "מה Value Object (DDD)?",
      options: [
        "Immutable, שווה לפי value (לא identity). דוגמאות: Money, Address, Email. שונה מ-Entity (יש id)",
        "Entity",
        "Service",
        "DTO"
      ],
      correctIndex: 0,
      explanation: "Money(100, 'USD') === Money(100, 'USD') לפי value. כל שינוי = object חדש.",
      optionFeedback: [
        "✅ נכון.",
        "❌ Entity יש identity.",
        "❌ service שונה.",
        "❌ DTO שונה."
      ]
    },
    { id: "mc_oop_repository_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 8,
      question: "מה Repository pattern?",
      options: [
        "Abstraction על persistence — אובייקטים שמתעסקים ב-CRUD. UserRepo.findById, UserRepo.save",
        "Service",
        "Factory",
        "Singleton"
      ],
      correctIndex: 0,
      explanation: "מבדל Domain מ-DB. Mock-able ל-tests. Prisma/TypeORM משתמשים.",
      optionFeedback: [
        "✅ נכון.",
        "❌ service ב-business logic.",
        "❌ pattern אחר.",
        "❌ pattern אחר."
      ]
    },
    { id: "mc_oop_unit_of_work_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 9,
      question: "מה Unit of Work pattern?",
      options: [
        "Tracks changes ב-business transaction ו-מחויב יחד. ORMs (TypeORM/Prisma) מממשים.",
        "Repository",
        "Singleton",
        "Service"
      ],
      correctIndex: 0,
      explanation: "EntityManager.persist + flush. SaveAll או none. Transactional.",
      optionFeedback: [
        "✅ נכון.",
        "❌ pattern אחר.",
        "❌ pattern אחר.",
        "❌ pattern אחר."
      ]
    },
    { id: "mc_oop_aggregate_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 9,
      question: "מה Aggregate Root (DDD)?",
      options: [
        "Cluster של domain objects שנגישים רק דרך root. כל transaction עוסקת ב-aggregate אחד",
        "Single class",
        "Database",
        "DTO"
      ],
      correctIndex: 0,
      explanation: "Order = root, OrderItems = inside. Order.addItem(...). שומר על consistency.",
      optionFeedback: [
        "✅ נכון.",
        "❌ aggregate cluster.",
        "❌ DB unrelated.",
        "❌ DTO שונה."
      ]
    },
    { id: "mc_oop_event_sourcing_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 9,
      question: "מה Event Sourcing?",
      options: [
        "שמירת תוצאות כ-sequence של events במקום state — state = replay של events. audit trail מוכלל",
        "DB only",
        "RPC",
        "REST"
      ],
      correctIndex: 0,
      explanation: "EventStoreDB. החזרת state ע\"י replay. שימושי ב-fintech ו-systems קריטיים.",
      optionFeedback: [
        "✅ נכון.",
        "❌ DB store הוא חלק.",
        "❌ unrelated.",
        "❌ unrelated."
      ]
    },
    { id: "mc_oop_cqrs_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 9,
      question: "מה CQRS?",
      options: [
        "Command Query Responsibility Segregation — מבדל reads מ-writes. נפרד models/DBs/optimization",
        "REST",
        "Command pattern",
        "GraphQL"
      ],
      correctIndex: 0,
      explanation: "Write side: complex domain. Read side: denormalized + cached. NestJS תומך.",
      optionFeedback: [
        "✅ נכון.",
        "❌ REST שונה.",
        "❌ pattern אחר.",
        "❌ unrelated."
      ]
    },
    { id: "mc_oop_open_closed_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 8,
      question: "איך plugin system מממש Open/Closed?",
      options: [
        "Core מצהיר על interfaces. plugins מממשים. extension על-ידי הוספה, לא modification של core",
        "Inheritance",
        "Singleton",
        "Static"
      ],
      correctIndex: 0,
      explanation: "Webpack plugins, ESLint plugins. core stable, ecosystem extends.",
      optionFeedback: [
        "✅ נכון.",
        "❌ inheritance שונה.",
        "❌ pattern אחר.",
        "❌ unrelated."
      ]
    },
    { id: "mc_oop_anti_god_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 7,
      question: "מה God Object antipattern?",
      options: [
        "Class ענק שעושה הרבה דברים — שובר Single Responsibility. קשה לתחזק ולבדוק. פתרון: split",
        "Best practice",
        "Singleton",
        "Helper"
      ],
      correctIndex: 0,
      explanation: "מאות שורות ב-class יחיד עם dependencies רבים. רענון הדרגתי ע\"י extract method/class.",
      optionFeedback: [
        "✅ נכון.",
        "❌ הפוך.",
        "❌ singleton שונה.",
        "❌ helpers ספציפיים."
      ]
    }
  ],
  fill: [
    { id: "fill_oop_class_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 6,
      code: "// Define a class\n____ Animal {\n  constructor(name) {\n    this.name = name;\n  }\n  speak() { return 'sound'; }\n}",
      answer: "class",
      explanation: "class keyword introduces ES6 class."
    },
    { id: "fill_oop_extends_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 6,
      code: "// Inheritance\nclass Dog ____ Animal {\n  speak() { return 'Woof'; }\n}",
      answer: "extends",
      explanation: "extends sets prototype chain."
    },
    { id: "fill_oop_super_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 7,
      code: "// Call parent constructor\nclass Cat extends Animal {\n  constructor(name, color) {\n    ____(name);\n    this.color = color;\n  }\n}",
      answer: "super",
      explanation: "super() invokes parent constructor."
    },
    { id: "fill_oop_static_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 6,
      code: "// Class-level method\nclass MathHelper {\n  ____ square(n) {\n    return n * n;\n  }\n}\nMathHelper.square(5);  // 25",
      answer: "static",
      explanation: "static = method on class, not instance."
    },
    { id: "fill_oop_private_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 7,
      code: "// True private (ES2022)\nclass Counter {\n  ____count = 0;\n  inc() { return ++this.#count; }\n}",
      answer: "#",
      explanation: "# prefix = private field/method."
    },
    { id: "fill_oop_get_set_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 7,
      code: "// Getter\nclass Temperature {\n  constructor(c) { this._c = c; }\n  ____ celsius() { return this._c; }\n}\nconst t = new Temperature(25);\nt.celsius;  // 25 (no parens)",
      answer: "get",
      explanation: "get = computed property accessor."
    },
    { id: "fill_oop_singleton_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 7,
      code: "// Module-level singleton\nclass DB {\n  connect() { /* ... */ }\n}\nexport const ____ = new DB();",
      answer: "db",
      explanation: "Module export = singleton in JS."
    },
    { id: "fill_oop_factory_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 7,
      code: "// Factory function\nfunction ____Shape(type) {\n  switch (type) {\n    case 'circle': return new Circle();\n    case 'square': return new Square();\n  }\n}",
      answer: "create",
      explanation: "Factory creates instances based on input."
    },
    { id: "fill_oop_observer_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 7,
      code: "// Observer pattern subscribe\nsubject.____(observer);\nsubject.notify();  // calls observer.update()",
      answer: "subscribe",
      explanation: "subscribe registers listener."
    },
    { id: "fill_oop_strategy_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 7,
      code: "// Strategy pattern\nclass PaymentContext {\n  constructor(strategy) { this.____ = strategy; }\n  pay(amt) { return this.strategy.execute(amt); }\n}",
      answer: "strategy",
      explanation: "Strategy stored, swappable at runtime."
    },
    { id: "fill_oop_iterator_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 8,
      code: "// Make iterable\nclass Range {\n  constructor(end) { this.end = end; }\n  *[Symbol.____]() {\n    for (let i = 0; i < this.end; i++) yield i;\n  }\n}",
      answer: "iterator",
      explanation: "Symbol.iterator makes class iterable."
    },
    { id: "fill_oop_polymorphism_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 7,
      code: "// Override method\nclass Cat extends Animal {\n  speak() {\n    return 'Meow';   // overrides parent\n  }\n}\nconst c = new ____();\nc.speak();  // 'Meow' (polymorphism)",
      answer: "Cat",
      explanation: "Method dispatch by runtime type."
    },
    { id: "fill_oop_decorator_fn_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 8,
      code: "// Decorator function\nfunction withLogging(fn) {\n  return (...args) => {\n    console.log('call');\n    return ____(...args);\n  };\n}",
      answer: "fn",
      explanation: "Wrap original function inside decorator."
    },
    { id: "fill_oop_di_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 8,
      code: "// Constructor injection\nclass UserService {\n  constructor(____) {\n    this.repo = repo;\n  }\n}",
      answer: "repo",
      explanation: "Dependency injected via constructor."
    },
    { id: "fill_oop_immutable_mm_001", topicId: "topic_oop", conceptKey: "lesson_19::class", level: 8,
      code: "// Immutable Value Object\nclass Money {\n  constructor(amount, currency) {\n    this.amount = amount;\n    this.currency = currency;\n    Object.____(this);  // prevent mutation\n  }\n}",
      answer: "freeze",
      explanation: "Object.freeze makes instance immutable."
    }
  ]
};
