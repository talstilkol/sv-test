// data/shards/questions_session_T.js
// Sprint 2 batch T — TypeScript coverage
// 50 questions: 35 MC + 15 Fill

window.QUESTIONS_SHARD_T = {
  mc: [
    {
      id: "mc_l26_ts_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::TypeScript",
      level: 5,
      question: "TypeScript הוא:",
      options: [
        "Superset של JavaScript עם static types — מתפלג ל-JS",
        "Replacement של JS",
        "Runtime check library",
        "Bundler"
      ],
      correctIndex: 0,
      explanation: "TS adds types at compile-time. Erased at runtime.",
      optionFeedback: [
        "✅ נכון.",
        "❌ TS עומד על JS, לא מחליף.",
        "❌ Compile-time בלבד.",
        "❌ זה לא bundler (Vite/Webpack)."
      ]
    },
    {
      id: "mc_l26_strongly_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::Strongly Typed",
      level: 5,
      question: "Strongly Typed:",
      options: [
        "סוגים נבדקים ולא מעורבים אוטומטית — מונע bugs נסתרים",
        "סוגים אוטומטיים",
        "אסור types",
        "פחות אבטחה"
      ],
      correctIndex: 0,
      explanation: "JS = weakly typed (coercion). TS = strongly typed.",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה weak typing.",
        "❌ הפוך, חיוני.",
        "❌ דווקא יותר אבטחה."
      ]
    },
    {
      id: "mc_l26_tsc_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::tsc",
      level: 5,
      question: "tsc:",
      options: [
        "TypeScript Compiler — מתפלג .ts ל-.js",
        "test runner",
        "linter",
        "bundler"
      ],
      correctIndex: 0,
      explanation: "Standalone compiler. רוב הפרויקטים משתמשים ב-Vite/SWC במקום.",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה Vitest.",
        "❌ זה ESLint.",
        "❌ זה Vite."
      ]
    },
    {
      id: "mc_l26_compiler_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::Compiler",
      level: 6,
      question: "TypeScript Compiler לא בודק במצב default:",
      options: [
        "implicit any (without strict). חובה strict: true בtsconfig",
        "כל סוגים",
        "syntax",
        "imports"
      ],
      correctIndex: 0,
      explanation: "Strict mode catches more bugs. תמיד strict: true.",
      optionFeedback: [
        "✅ נכון.",
        "❌ ב-strict כן.",
        "❌ syntax תמיד.",
        "❌ imports תמיד."
      ]
    },
    {
      id: "mc_l26_tsconfig_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::tsconfig.json",
      level: 6,
      question: "Important tsconfig flag:",
      options: [
        "strict: true — מפעיל את כל ה-strict checks (noImplicitAny, etc.)",
        "noTypes: true",
        "fast: true",
        "compile: false"
      ],
      correctIndex: 0,
      explanation: "Single switch for many checks.",
      optionFeedback: [
        "✅ נכון.",
        "❌ אין כזה.",
        "❌ זה לא speed.",
        "❌ disable compilation."
      ]
    },
    {
      id: "mc_l26_string_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::string",
      level: 4,
      question: "let s: string = 5:",
      options: [
        "TS Error — type mismatch",
        "OK — coerces",
        "Runtime warning",
        "Silent ignore"
      ],
      correctIndex: 0,
      explanation: "compile-time error.",
      optionFeedback: [
        "✅ נכון.",
        "❌ אין coerce ב-TS.",
        "❌ compile-time.",
        "❌ TS חוסם."
      ]
    },
    {
      id: "mc_l26_array_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::array type",
      level: 5,
      question: "let arr: number[]:",
      options: [
        "Array של numbers — שווה ערך ל-Array<number>",
        "1 number",
        "any[]",
        "object"
      ],
      correctIndex: 0,
      explanation: "Two equivalent syntaxes.",
      optionFeedback: [
        "✅ נכון.",
        "❌ array.",
        "❌ specific type.",
        "❌ array."
      ]
    },
    {
      id: "mc_l26_tuple_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::tuple",
      level: 5,
      question: "Tuple [string, number]:",
      options: [
        "Array עם length קבוע + types per position",
        "object",
        "any[]",
        "string only"
      ],
      correctIndex: 0,
      explanation: "Position-typed array.",
      optionFeedback: [
        "✅ נכון.",
        "❌ array.",
        "❌ typed.",
        "❌ second position."
      ]
    },
    {
      id: "mc_l26_enum_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::enum",
      level: 6,
      question: "enum vs literal union:",
      options: [
        "enum runtime object. literal union compile-only. Modern: prefer literal union.",
        "אותו דבר",
        "enum מהיר",
        "literal deprecated"
      ],
      correctIndex: 0,
      explanation: "as const + literal union = zero runtime cost.",
      optionFeedback: [
        "✅ נכון.",
        "❌ הבדל מהותי.",
        "❌ runtime overhead.",
        "❌ recommended."
      ]
    },
    {
      id: "mc_l26_void_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::void",
      level: 6,
      question: "void:",
      options: [
        "function returns nothing useful (undefined)",
        "never returns",
        "any",
        "null"
      ],
      correctIndex: 0,
      explanation: "void = ignore return value. never = doesn't return.",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה never.",
        "❌ specific.",
        "❌ different.",
      ]
    },
    {
      id: "mc_l26_readonly_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::readonly",
      level: 6,
      question: "readonly modifier:",
      options: [
        "compile-time freeze — לא ניתן rebind",
        "deep immutable",
        "runtime check",
        "private"
      ],
      correctIndex: 0,
      explanation: "Different from Object.freeze (runtime).",
      optionFeedback: [
        "✅ נכון.",
        "❌ shallow.",
        "❌ compile-time.",
        "❌ private different."
      ]
    },
    {
      id: "mc_l26_optional_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::optional field",
      level: 5,
      question: "name?: string:",
      options: [
        "Property optional — string | undefined",
        "always undefined",
        "required",
        "syntax error"
      ],
      correctIndex: 0,
      explanation: "Adds undefined to type union.",
      optionFeedback: [
        "✅ נכון.",
        "❌ אופציונלי.",
        "❌ אופציונלי.",
        "❌ legitimate."
      ]
    },
    {
      id: "mc_l26_type_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::type alias",
      level: 6,
      question: "type vs interface:",
      options: [
        "interface for object shapes (extensible). type for unions/computed",
        "אותו דבר",
        "type deprecated",
        "interface deprecated"
      ],
      correctIndex: 0,
      explanation: "interface supports declaration-merging.",
      optionFeedback: [
        "✅ נכון.",
        "❌ הבדלים.",
        "❌ legitimate.",
        "❌ legitimate."
      ]
    },
    {
      id: "mc_l26_interface_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::interface",
      level: 6,
      question: "interface declaration merging:",
      options: [
        "Multiple interface X declarations → merged. ל-augmenting libs.",
        "אסור",
        "type also supports",
        "compile error"
      ],
      correctIndex: 0,
      explanation: "Type aliases אינם תומכים. interface כן.",
      optionFeedback: [
        "✅ נכון.",
        "❌ legitimate.",
        "❌ type לא.",
        "❌ legal."
      ]
    },
    {
      id: "mc_l26_unknown_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::never",
      level: 7,
      question: "unknown type:",
      options: [
        "Top type. Any value but cannot use without narrow",
        "any synonym",
        "never",
        "primitive"
      ],
      correctIndex: 0,
      explanation: "Safer alternative to any.",
      optionFeedback: [
        "✅ נכון.",
        "❌ הבדל בטיחות.",
        "❌ זה ההפך.",
        "❌ type system."
      ]
    },
    {
      id: "mc_l26_never_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::never",
      level: 7,
      question: "never:",
      options: [
        "Bottom type — function never returns. throw או infinite loop",
        "Any value",
        "void synonym",
        "primitive"
      ],
      correctIndex: 0,
      explanation: "Useful for exhaustive checks.",
      optionFeedback: [
        "✅ נכון.",
        "❌ never doesn't return.",
        "❌ void returns undefined.",
        "❌ system type."
      ]
    },
    {
      id: "mc_l26_any_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::never",
      level: 7,
      question: "any vs unknown:",
      options: [
        "any — מבטל בדיקות (escape hatch). unknown — טיפוס בטוח שדורש narrow",
        "אותו דבר",
        "any deprecated",
        "unknown deprecated"
      ],
      correctIndex: 0,
      explanation: "Always prefer unknown.",
      optionFeedback: [
        "✅ נכון.",
        "❌ הבדל קריטי.",
        "❌ legitimate (with care).",
        "❌ recommended."
      ]
    },
    {
      id: "mc_l26_partial_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::interface",
      level: 7,
      question: "Partial<T>:",
      options: [
        "T with all properties optional — useful for PATCH endpoints",
        "T strict",
        "T frozen",
        "T omit all"
      ],
      correctIndex: 0,
      explanation: "Built-in utility type.",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה Required.",
        "❌ זה Readonly.",
        "❌ זה Pick<T, never>."
      ]
    },
    {
      id: "mc_l26_pick_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::interface",
      level: 7,
      question: "Pick<User, 'id' | 'name'>:",
      options: [
        "Type חדש עם רק id ו-name",
        "Omit",
        "All keys",
        "Boolean"
      ],
      correctIndex: 0,
      explanation: "Pick<T, K> selects K keys.",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה ההפך.",
        "❌ זה T עצמו.",
        "❌ type-level."
      ]
    },
    {
      id: "mc_l26_omit_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::interface",
      level: 7,
      question: "Omit<User, 'password'>:",
      options: [
        "User בלי password — useful לpublic API",
        "Pick",
        "Partial",
        "TypeError"
      ],
      correctIndex: 0,
      explanation: "Omit<T, K> excludes K keys.",
      optionFeedback: [
        "✅ נכון.",
        "❌ ההפך.",
        "❌ different.",
        "❌ legitimate."
      ]
    },
    {
      id: "mc_l26_record_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::interface",
      level: 6,
      question: "Record<string, number>:",
      options: [
        "Object עם string keys ו-number values — { [k: string]: number }",
        "1 entry",
        "boolean",
        "Map"
      ],
      correctIndex: 0,
      explanation: "Record<K, V> for typed dictionaries.",
      optionFeedback: [
        "✅ נכון.",
        "❌ many.",
        "❌ different.",
        "❌ Map separate."
      ]
    },
    {
      id: "mc_l26_generic_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::TypeScript",
      level: 7,
      question: "function f<T>(x: T): T:",
      options: [
        "Generic — T נקבע בקריאה. f<string>('hi') או f('hi') with inference",
        "any",
        "string only",
        "syntax error"
      ],
      correctIndex: 0,
      explanation: "Type parameter <T>.",
      optionFeedback: [
        "✅ נכון.",
        "❌ generic.",
        "❌ flexible.",
        "❌ legitimate."
      ]
    },
    {
      id: "mc_l26_typeguard_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::TypeScript",
      level: 7,
      question: "Type guard:",
      options: [
        "Runtime check that narrows type — `if (typeof x === 'string')` או `isUser(x)`",
        "compile-only",
        "no narrowing",
        "specific keyword"
      ],
      correctIndex: 0,
      explanation: "Narrows TS type after check.",
      optionFeedback: [
        "✅ נכון.",
        "❌ runtime + compile.",
        "❌ זה ה-purpose.",
        "❌ pattern."
      ]
    },
    {
      id: "mc_l26_assert_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::TypeScript",
      level: 8,
      question: "as cast:",
      options: [
        "Type assertion — promise compiler. RUNTIME בודק כלום (escape hatch)",
        "runtime check",
        "free conversion",
        "syntax error"
      ],
      correctIndex: 0,
      explanation: "Use sparingly. unknown→specific via narrowing better.",
      optionFeedback: [
        "✅ נכון.",
        "❌ aspect קומפיילר.",
        "❌ אסיר ולא אבל.",
        "❌ legitimate."
      ]
    },
    {
      id: "mc_l26_props_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::Typing Props",
      level: 6,
      question: "React component props typing:",
      options: [
        "interface Props { ... }; function C(props: Props) או ({ x }: Props)",
        "אסור",
        "always any",
        "TS לא תומך React"
      ],
      correctIndex: 0,
      explanation: "Standard pattern.",
      optionFeedback: [
        "✅ נכון.",
        "❌ legitimate.",
        "❌ explicit.",
        "❌ excellent."
      ]
    },
    {
      id: "mc_l26_state_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::Typing State",
      level: 7,
      question: "useState<User | null>(null):",
      options: [
        "Generic לhook — useState יכול להחזיק User או null",
        "any",
        "syntax error",
        "deprecated"
      ],
      correctIndex: 0,
      explanation: "Type assertion for initial null.",
      optionFeedback: [
        "✅ נכון.",
        "❌ specific.",
        "❌ legitimate.",
        "❌ standard."
      ]
    },
    {
      id: "mc_l26_funprop_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::Function Prop Type",
      level: 7,
      question: "Function prop type:",
      options: [
        "(args) => returnType או specific React event handler types",
        "Function only",
        "any",
        "void only"
      ],
      correctIndex: 0,
      explanation: "Specific signature better than any.",
      optionFeedback: [
        "✅ נכון.",
        "❌ generic too loose.",
        "❌ specific better.",
        "❌ many."
      ]
    },
    {
      id: "mc_l26_typesafety_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::Type Safety",
      level: 6,
      question: "Type Safety means:",
      options: [
        "compile-time guarantees that operations are valid for the type",
        "runtime monitor",
        "memory safety",
        "performance"
      ],
      correctIndex: 0,
      explanation: "Catches bugs before runtime.",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה עצמ-רטרוייי.",
        "❌ זה Rust.",
        "❌ unrelated."
      ]
    },
    {
      id: "mc_l26_assertion_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::TypeScript",
      level: 7,
      question: "user as User vs <User>user:",
      options: [
        "Same — both type assertions. as preferred (works in JSX)",
        "different",
        "old syntax illegal",
        "JSX only"
      ],
      correctIndex: 0,
      explanation: "<> conflicts with JSX. as resolves.",
      optionFeedback: [
        "✅ נכון.",
        "❌ אותו דבר.",
        "❌ legitimate.",
        "❌ as ב-JSX."
      ]
    },
    {
      id: "mc_l26_unionnarrow_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::TypeScript",
      level: 8,
      question: "Discriminated union:",
      options: [
        "Union with shared 'kind' property: {kind:'A',a:1} | {kind:'B',b:2}",
        "single type",
        "any",
        "primitive"
      ],
      correctIndex: 0,
      explanation: "Switch on kind narrows type.",
      optionFeedback: [
        "✅ נכון.",
        "❌ union of multi.",
        "❌ specific.",
        "❌ object."
      ]
    },
    {
      id: "mc_l26_keyof_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::TypeScript",
      level: 8,
      question: "keyof T:",
      options: [
        "Union של keys של T. keyof {a:1,b:2} = 'a'|'b'",
        "Object",
        "Array",
        "any"
      ],
      correctIndex: 0,
      explanation: "Type-level operation.",
      optionFeedback: [
        "✅ נכון.",
        "❌ string union.",
        "❌ unrelated.",
        "❌ specific."
      ]
    },
    {
      id: "mc_l26_typeof_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::TypeScript",
      level: 7,
      question: "typeof in TS type position:",
      options: [
        "type X = typeof someValue — שולף type של ערך",
        "runtime check",
        "JS only",
        "deprecated"
      ],
      correctIndex: 0,
      explanation: "Different from JS typeof operator.",
      optionFeedback: [
        "✅ נכון.",
        "❌ compile-time.",
        "❌ TS feature.",
        "❌ legitimate."
      ]
    },
    {
      id: "mc_l26_classtype_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::TypeScript",
      level: 7,
      question: "Class as type:",
      options: [
        "Classes serve as both value and type. const u: User = new User()",
        "type only",
        "value only",
        "syntax error"
      ],
      correctIndex: 0,
      explanation: "Convenient but interface for shape preferred sometimes.",
      optionFeedback: [
        "✅ נכון.",
        "❌ both.",
        "❌ both.",
        "❌ legitimate."
      ]
    },
    // ─── More TS ───
    {
      id: "mc_l26_strict_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::tsconfig.json",
      level: 7,
      question: "noImplicitAny:",
      options: [
        "TS error if cannot infer type — מאלץ explicit annotations",
        "all any",
        "ignore types",
        "deprecated"
      ],
      correctIndex: 0,
      explanation: "Part of strict mode.",
      optionFeedback: [
        "✅ נכון.",
        "❌ ההפך.",
        "❌ זה ההפך.",
        "❌ standard."
      ]
    },
    {
      id: "mc_l26_optprop_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::optional field",
      level: 6,
      question: "optional ב-destructuring עם default:",
      options: [
        "function f({ x = 5 }: { x?: number }) — default if undefined",
        "always 5",
        "syntax error",
        "no default"
      ],
      correctIndex: 0,
      explanation: "Default kicks in for undefined only.",
      optionFeedback: [
        "✅ נכון.",
        "❌ default conditional.",
        "❌ legitimate.",
        "❌ allowed."
      ]
    },
  ],
  fill: [
    {
      id: "fill_l26_str_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::string",
      level: 4,
      code: "let name: ____ = 'Tal';",
      answer: "string",
      explanation: "Primitive string type."
    },
    {
      id: "fill_l26_num_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::number",
      level: 4,
      code: "let age: ____ = 30;",
      answer: "number",
      explanation: "Primitive number type."
    },
    {
      id: "fill_l26_arr_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::array type",
      level: 5,
      code: "let nums: number____ = [1, 2, 3];",
      answer: "[]",
      explanation: "Array of numbers."
    },
    {
      id: "fill_l26_iface_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::interface",
      level: 5,
      code: "____ User {\n  id: number;\n  name: string;\n}",
      answer: "interface",
      explanation: "Interface for object shape."
    },
    {
      id: "fill_l26_optional_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::optional field",
      level: 5,
      code: "interface User {\n  id: number;\n  email____: string;  // אופציונלי\n}",
      answer: "?",
      explanation: "? for optional property."
    },
    {
      id: "fill_l26_union_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::TypeScript",
      level: 6,
      code: "type Status = 'loading' ____ 'ok' | 'error';",
      answer: "|",
      explanation: "| for union types."
    },
    {
      id: "fill_l26_partial_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::interface",
      level: 7,
      code: "function update(id: number, patch: ____<User>) { ... }",
      answer: "Partial",
      explanation: "Partial<T> for PATCH-style."
    },
    {
      id: "fill_l26_generic_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::TypeScript",
      level: 7,
      code: "function first<____>(arr: T[]): T | undefined {\n  return arr[0];\n}",
      answer: "T",
      explanation: "Type parameter T."
    },
    {
      id: "fill_l26_unknown_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::never",
      level: 7,
      code: "function parseSafe(input: string): ____ {\n  return JSON.parse(input);\n}",
      answer: "unknown",
      explanation: "JSON.parse returns unknown for safety."
    },
    {
      id: "fill_l26_never_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::never",
      level: 7,
      code: "function fail(msg: string): ____ {\n  throw new Error(msg);\n}",
      answer: "never",
      explanation: "never for non-returning functions."
    },
    {
      id: "fill_l26_state_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::Typing State",
      level: 7,
      code: "const [user, setUser] = useState<User ____>(null);",
      answer: "| null",
      explanation: "Union with null for nullable state."
    },
    {
      id: "fill_l26_handler_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::Function Prop Type",
      level: 7,
      code: "interface Props {\n  onClick: (e: MouseEvent) ____ void;\n}",
      answer: "=>",
      explanation: "Function type signature with =>."
    },
    {
      id: "fill_l26_record_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::interface",
      level: 7,
      code: "type RolePerms = ____<'admin' | 'user', string[]>;",
      answer: "Record",
      explanation: "Record<K, V> for typed dictionaries."
    },
    {
      id: "fill_l26_omit_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::interface",
      level: 7,
      code: "type PublicUser = ____<User, 'password'>;",
      answer: "Omit",
      explanation: "Omit<T, K> excludes keys."
    },
    {
      id: "fill_l26_readonly_t_001",
      topicId: "topic_ts",
      conceptKey: "lesson_26::readonly",
      level: 6,
      code: "interface Config {\n  ____ apiUrl: string;\n}",
      answer: "readonly",
      explanation: "readonly modifier."
    },
  ],
};
