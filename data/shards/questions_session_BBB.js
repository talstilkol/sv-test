// Sprint 2 batch BBB - Continue gap closing
window.QUESTIONS_SHARD_BBB = {
  mc: [
    // lesson_27 remaining
    { id: "mc_l27_type_bbb_001", topicId: "topic_ts", conceptKey: "lesson_27::type", level: 6,
      question: "type alias unique features?",
      options: ["Union/intersection/conditional/mapped — interface אינו תומך. type לprimitives, tuples, complex compositions","Same as interface","Mutates","Class only"],
      correctIndex: 0,
      explanation: "type Score = number; type Pair = [number, string]; — לא קיים ב-interface.",
      optionFeedback: ["✅ נכון.","❌ שונים.","❌ static.","❌ wider."]
    },
    { id: "mc_l27_enum_bbb_001", topicId: "topic_ts", conceptKey: "lesson_27::enum", level: 7,
      question: "enum runtime?",
      options: ["Numeric enum: object דו-כיווני (key→value, value→key). String enum: one-way. const enum: inlined בbuild","Always inline","No runtime","Class"],
      correctIndex: 0,
      explanation: "enum Color { R } → Color.R = 0, Color[0] = 'R'.",
      optionFeedback: ["✅ נכון.","❌ runtime ל-non-const.","❌ runtime נפרד.","❌ object."]
    },
    { id: "mc_l27_interface_bbb_001", topicId: "topic_ts", conceptKey: "lesson_27::interface", level: 6,
      question: "interface declaration merging?",
      options: ["Multiple interface X { ... } מתאחדים אוטומטית. שימושי לhרחיב types חיצוניים (Express Request, Window)","Errors","One only","Type only"],
      correctIndex: 0,
      explanation: "Module augmentation pattern. extending Express.Request עם user.",
      optionFeedback: ["✅ נכון.","❌ feature.","❌ multi.","❌ interface שונה."]
    },
    { id: "mc_l27_extends_bbb_001", topicId: "topic_ts", conceptKey: "lesson_27::extends interface", level: 7,
      question: "Multiple inheritance?",
      options: ["interface C extends A, B { ... } — multi extends. תכונות מ-A ו-B (חייב לא להיות conflicts)","Single only","Class only","Error"],
      correctIndex: 0,
      explanation: "TS תומך multi-extends ב-interface (לא ב-class).",
      optionFeedback: ["✅ נכון.","❌ multi.","❌ גם interface.","❌ valid."]
    },
    { id: "mc_l27_union_bbb_001", topicId: "topic_ts", conceptKey: "lesson_27::Union Type", level: 7,
      question: "Discriminated union pattern?",
      options: ["Each variant has unique 'type' property → switch narrow. type Result = { ok: true, val } | { ok: false, err }","Class only","No discriminator","Single type"],
      correctIndex: 0,
      explanation: "Type-safe error handling pattern.",
      optionFeedback: ["✅ נכון.","❌ pattern functional.","❌ critical for narrowing.","❌ wider."]
    },
    { id: "mc_l27_narrowing_bbb_001", topicId: "topic_ts", conceptKey: "lesson_27::Type Narrowing", level: 7,
      question: "Narrowing tools?",
      options: ["typeof, instanceof, in, ===, custom predicates (x is T), assertion functions (asserts x is T)","typeof only","Cast only","Generics"],
      correctIndex: 0,
      explanation: "Multiple narrowing strategies. assertion functions modern.",
      optionFeedback: ["✅ נכון.","❌ multiple.","❌ unsafe.","❌ different."]
    },
    { id: "mc_l27_book_bbb_001", topicId: "topic_ts", conceptKey: "lesson_27::Book", level: 6,
      question: "Book repository pattern?",
      options: ["interface Book + class BookRepo { findById, save, delete } + storage. כל פונקציה typed","Mixed types","No repo","String"],
      correctIndex: 0,
      explanation: "Repository pattern. abstraction על persistence.",
      optionFeedback: ["✅ נכון.","❌ unsafe.","❌ harder testing.","❌ unclear."]
    },
    { id: "mc_l27_genre_bbb_001", topicId: "topic_ts", conceptKey: "lesson_27::Genre", level: 6,
      question: "Genre בBookRepo?",
      options: ["filter books by genre: books.filter(b => b.genre === selectedGenre). type-safe selection","Random","String search","Manual"],
      correctIndex: 0,
      explanation: "Union type narrowing helps autocomplete.",
      optionFeedback: ["✅ נכון.","❌ דטרמיניסטי.","❌ unsafe.","❌ repetitive."]
    },
    { id: "mc_l27_baseuser_bbb_001", topicId: "topic_ts", conceptKey: "lesson_27::BaseUser", level: 7,
      question: "BaseUser shared methods?",
      options: ["interface אינו תומך methods (רק shapes). class abstract — yes. או utility functions עם type guards","Methods always","Static","Inheritance"],
      correctIndex: 0,
      explanation: "interface = data shape. behaviors = functions or class methods.",
      optionFeedback: ["✅ נכון.","❌ interface limit.","❌ different.","❌ syntax."]
    },
    { id: "mc_l27_guestuser_bbb_001", topicId: "topic_ts", conceptKey: "lesson_27::GuestUser", level: 6,
      question: "GuestUser limited?",
      options: ["No persistent profile. sessionStorage only. limited features (no save/share). type guard isGuest narrows","Same as registered","Cannot exist","Backend only"],
      correctIndex: 0,
      explanation: "UX: prompt to register for full features.",
      optionFeedback: ["✅ נכון.","❌ different.","❌ valid.","❌ frontend גם."]
    },
    { id: "mc_l27_reguser_bbb_001", topicId: "topic_ts", conceptKey: "lesson_27::RegisteredUser", level: 6,
      question: "RegisteredUser persistence?",
      options: ["DB record (Mongo/Postgres). password hashed. profile fields. session cookie/JWT","Memory only","No storage","Cookies plain"],
      correctIndex: 0,
      explanation: "Standard auth pattern. server-side truth.",
      optionFeedback: ["✅ נכון.","❌ lost.","❌ critical.","❌ insecure."]
    },
    { id: "mc_l27_user_bbb_001", topicId: "topic_ts", conceptKey: "lesson_27::User", level: 6,
      question: "User type guards?",
      options: ["function isRegistered(u: User): u is RegisteredUser { return u.type === 'registered' }","Cast","No guards","try/catch"],
      correctIndex: 0,
      explanation: "Type predicate enables narrowing in if-blocks.",
      optionFeedback: ["✅ נכון.","❌ unsafe.","❌ critical.","❌ not for type."]
    },
    // lesson_26 remaining
    { id: "mc_l26_typesctipt_bbb_001", topicId: "topic_ts", conceptKey: "lesson_26::TypeScript", level: 5,
      question: "TS strict mode?",
      options: ["strict: true ב-tsconfig מפעיל את כל ה-flags: strictNullChecks, noImplicitAny, strictFunctionTypes, etc","Optional","Slow","Off default"],
      correctIndex: 0,
      explanation: "Recommended for new projects. catches more bugs.",
      optionFeedback: ["✅ נכון.","❌ should default.","❌ minimal.","❌ should be on."]
    },
    { id: "mc_l26_strongly_typed_bbb_001", topicId: "topic_ts", conceptKey: "lesson_26::Strongly Typed", level: 6,
      question: "Strongly typed advantages?",
      options: ["Compile-time bug catching, better autocomplete, refactoring safety, self-documenting code, fewer runtime errors","Slower runtime","Verbose","No benefit"],
      correctIndex: 0,
      explanation: "Trade-off: more typing, fewer bugs.",
      optionFeedback: ["✅ נכון.","❌ אין runtime overhead.","❌ subjective.","❌ enormous benefit."]
    },
    { id: "mc_l26_compiler_bbb_001", topicId: "topic_ts", conceptKey: "lesson_26::Compiler", level: 6,
      question: "tsc options?",
      options: ["--target, --module, --strict, --noEmit, --outDir, --jsx, --watch — config via CLI או tsconfig","No options","One only","Random"],
      correctIndex: 0,
      explanation: "tsc --init יוצר tsconfig.json עם defaults.",
      optionFeedback: ["✅ נכון.","❌ rich config.","❌ multiple.","❌ דטרמיניסטי."]
    },
    { id: "mc_l26_tsc_bbb_001", topicId: "topic_ts", conceptKey: "lesson_26::tsc", level: 5,
      question: "tsc vs babel ל-TS?",
      options: ["tsc: type-check + transpile. babel @babel/preset-typescript: transpile only (faster). modern: tsc --noEmit + esbuild","Same","Babel slower","No tsc"],
      correctIndex: 0,
      explanation: "Production: split type-check from build pipeline.",
      optionFeedback: ["✅ נכון.","❌ שונים.","❌ הפוך.","❌ קיים."]
    },
    { id: "mc_l26_ts_ext_bbb_001", topicId: "topic_ts", conceptKey: "lesson_26::.ts", level: 5,
      question: "ESM with .ts?",
      options: ["import './x.ts' (or no ext) — Node ESM resolution. browsers don't run .ts directly (compile required)","Always .js","No ext","Both"],
      correctIndex: 0,
      explanation: "Vite handles transparently. raw browser cannot.",
      optionFeedback: ["✅ נכון.","❌ TS files allowed.","❌ ext varies.","❌ confusing."]
    },
    { id: "mc_l26_js_ext_bbb_001", topicId: "topic_ts", conceptKey: "lesson_26::.js", level: 4,
      question: "JS file extension?",
      options: [".js (CJS or ESM). .mjs (force ESM). .cjs (force CJS). package.json type: 'module' switches default","Single","Random","No diff"],
      correctIndex: 0,
      explanation: "Node uses extension + package.json type to determine module system.",
      optionFeedback: ["✅ נכון.","❌ multiple.","❌ דטרמיניסטי.","❌ matters."]
    },
    { id: "mc_l26_type_anno_bbb_001", topicId: "topic_ts", conceptKey: "lesson_26::type annotation", level: 5,
      question: "When TS infers?",
      options: ["From initial value (let x = 5 → number). function returns. context (callback in array methods)","Never","Random","Cast required"],
      correctIndex: 0,
      explanation: "Best practice: annotate function signatures, let TS infer body.",
      optionFeedback: ["✅ נכון.","❌ heavy lifting.","❌ דטרמיניסטי.","❌ no need."]
    },
    { id: "mc_l26_array_bbb_001", topicId: "topic_ts", conceptKey: "lesson_26::array type", level: 5,
      question: "Mixed-type arrays?",
      options: ["(string | number)[] — union. או tuple [string, number] לfixed positions","string[]","any[]","No way"],
      correctIndex: 0,
      explanation: "Union > any. type-safe.",
      optionFeedback: ["✅ נכון.","❌ rejects mix.","❌ unsafe.","❌ supported."]
    },
    // lesson_20 remaining
    { id: "mc_l20_mongoose_bbb_001", topicId: "topic_db", conceptKey: "lesson_20::Mongoose", level: 6,
      question: "Mongoose advantages over native driver?",
      options: ["Schema validation, middleware (pre/post hooks), virtuals, populate (joins), promises native","Slower only","No schema","No queries"],
      correctIndex: 0,
      explanation: "Trade-off: abstraction overhead. native driver leaner.",
      optionFeedback: ["✅ נכון.","❌ minor.","❌ הפוך.","❌ both."]
    },
    { id: "mc_l20_schema_bbb_001", topicId: "topic_db", conceptKey: "lesson_20::Schema", level: 6,
      question: "Mongoose schema validation?",
      options: ["{ type, required, min/max, match (regex), enum, validate (function) }. runs on save","Server only","Client only","No validation"],
      correctIndex: 0,
      explanation: "Mongoose validates before write. errors throw ValidationError.",
      optionFeedback: ["✅ נכון.","❌ both.","❌ shouldn't trust client.","❌ critical."]
    },
    { id: "mc_l20_model_bbb_001", topicId: "topic_db", conceptKey: "lesson_20::Model", level: 6,
      question: "Mongoose model?",
      options: ["Compiled from schema. provides CRUD methods (find, findOne, create, updateOne, deleteOne)","Plain object","Function","String"],
      correctIndex: 0,
      explanation: "const User = mongoose.model('User', userSchema). Pluralizes לcollection name.",
      optionFeedback: ["✅ נכון.","❌ wrapped.","❌ class.","❌ unrelated."]
    },
    { id: "mc_l20_create_bbb_001", topicId: "topic_db", conceptKey: "lesson_20::Create", level: 5,
      question: "Mongoose create?",
      options: ["await User.create({ name, email }) — instantiates + validates + saves. או new User({...}).save()","Sync","Just instantiate","Auto-save"],
      correctIndex: 0,
      explanation: "create returns saved doc(s).",
      optionFeedback: ["✅ נכון.","❌ async.","❌ skips save.","❌ explicit save."]
    },
    { id: "mc_l20_property_bbb_001", topicId: "topic_db", conceptKey: "lesson_20::Property", level: 5,
      question: "Schema property options?",
      options: ["type, required, default, unique (creates index), index, validate, lowercase, trim, ref (for population)","Just type","No options","Boolean only"],
      correctIndex: 0,
      explanation: "Rich options: { name: { type: String, required: true, trim: true } }.",
      optionFeedback: ["✅ נכון.","❌ multiple.","❌ multiple.","❌ wider types."]
    },
    { id: "mc_l20_method_bbb_001", topicId: "topic_db", conceptKey: "lesson_20::Method", level: 6,
      question: "Schema instance methods?",
      options: ["schema.methods.fullName = function() { return ... } — added to instances. document.fullName()","static","Plain function","Not allowed"],
      correctIndex: 0,
      explanation: "Schema.statics for class-level. methods for instance.",
      optionFeedback: ["✅ נכון.","❌ schema.statics שונה.","❌ scope אחר.","❌ supported."]
    },
    { id: "mc_l20_object_bbb_001", topicId: "topic_db", conceptKey: "lesson_20::Object", level: 5,
      question: "Mongoose document.toObject()?",
      options: ["Plain JS object — no Mongoose internals. שימושי ל-serialize/log. אובדן methods/virtuals (אופציונלי לכלול)","Same","Adds methods","Throws"],
      correctIndex: 0,
      explanation: "{ getters: true } כולל virtuals.",
      optionFeedback: ["✅ נכון.","❌ שונה.","❌ הפוך.","❌ valid."]
    }
  ],
  fill: [
    // lesson_20 fills (most gaps)
    { id: "fill_l20_connect_bbb_001", topicId: "topic_db", conceptKey: "lesson_20::Mongoose", level: 5,
      code: "// Connect Mongo\nawait mongoose.____(process.env.MONGO_URI);",
      answer: "connect",
      explanation: "mongoose.connect connects to DB."
    },
    { id: "fill_l20_schema_bbb_001", topicId: "topic_db", conceptKey: "lesson_20::Schema", level: 5,
      code: "// Define schema\nconst userSchema = new mongoose.____({\n  name: String,\n  email: { type: String, required: true }\n});",
      answer: "Schema",
      explanation: "new Schema constructs schema."
    },
    { id: "fill_l20_model_bbb_001", topicId: "topic_db", conceptKey: "lesson_20::Model", level: 5,
      code: "// Compile model\nconst User = mongoose.____('User', userSchema);",
      answer: "model",
      explanation: "mongoose.model returns Model class."
    },
    { id: "fill_l20_create_bbb_001", topicId: "topic_db", conceptKey: "lesson_20::Create", level: 5,
      code: "// Create document\nconst user = await User.____({ name: 'Tal' });",
      answer: "create",
      explanation: "Model.create instantiates + saves."
    },
    { id: "fill_l20_findOne_bbb_001", topicId: "topic_db", conceptKey: "lesson_20::findOne", level: 5,
      code: "// Find single\nconst user = await User.____({ email });",
      answer: "findOne",
      explanation: "findOne returns first match."
    },
    { id: "fill_l20_property_bbb_001", topicId: "topic_db", conceptKey: "lesson_20::Property", level: 5,
      code: "// Required + unique\nemail: {\n  type: String,\n  ____: true,\n  unique: true\n}",
      answer: "required",
      explanation: "required: true for mandatory field."
    },
    { id: "fill_l20_method_bbb_001", topicId: "topic_db", conceptKey: "lesson_20::Method", level: 6,
      code: "// Instance method\nuserSchema.____.fullName = function() {\n  return this.first + ' ' + this.last;\n};",
      answer: "methods",
      explanation: "schema.methods for instance methods."
    },
    { id: "fill_l20_object_bbb_001", topicId: "topic_db", conceptKey: "lesson_20::Object", level: 5,
      code: "// Plain JS object\nconst plain = doc.____();",
      answer: "toObject",
      explanation: "toObject strips Mongoose internals."
    },
    { id: "fill_l20_value_bbb_001", topicId: "topic_db", conceptKey: "lesson_20::Value", level: 4,
      code: "// Get field value\nconst name = user.____;",
      answer: "name",
      explanation: "Field access like plain object."
    },
    { id: "fill_l20_atlas_bbb_001", topicId: "topic_db", conceptKey: "lesson_20::MongoDB Atlas", level: 5,
      code: "# Connection string\nMONGO_URI=mongodb+____://user:pass@cluster.mongodb.net/dbname",
      answer: "srv",
      explanation: "+srv = SRV DNS lookup."
    },
    { id: "fill_l20_mongo_bbb_001", topicId: "topic_db", conceptKey: "lesson_20::MongoDB", level: 5,
      code: "// Native driver\nconst { ____Client } = require('mongodb');\nconst client = new MongoClient(uri);",
      answer: "Mongo",
      explanation: "MongoClient class."
    },
    { id: "fill_l20_props_bbb_001", topicId: "topic_db", conceptKey: "lesson_20::Props", level: 5,
      code: "// Many schema options\n{\n  type: String,\n  default: '',\n  ____: true,  // index\n  unique: true\n}",
      answer: "index",
      explanation: "index: true creates index."
    },
    { id: "fill_l20_json_bbb_001", topicId: "topic_db", conceptKey: "lesson_20::JSON", level: 5,
      code: "// Doc to JSON\nres.json(doc.____());",
      answer: "toJSON",
      explanation: "toJSON for Express response."
    },
    // lesson_21 fills (15 gaps)
    { id: "fill_l21_main_jsx_bbb_001", topicId: "topic_react", conceptKey: "lesson_21::main.jsx", level: 5,
      code: "// React 18 entry\nimport ReactDOM from 'react-dom/____';\nReactDOM.createRoot(...).render(<App/>);",
      answer: "client",
      explanation: "react-dom/client for createRoot."
    },
    { id: "fill_l21_app_css_bbb_001", topicId: "topic_react", conceptKey: "lesson_21::App.css", level: 4,
      code: "// Import CSS\n____ './App.css';",
      answer: "import",
      explanation: "ESM import for CSS."
    }
  ]
};
