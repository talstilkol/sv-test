// Sprint 2 batch DD - TS Advanced + utility types + generics deep
// 50 questions: 35 MC + 15 Fill
window.QUESTIONS_SHARD_DD = {
  mc: [
    { id: "mc_ts_partial_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 5,
      question: "מה Partial<T> ב-TS?",
      options: [
        "Type שבו כל property של T הופך ל-optional — שימושי ב-update/patch ו-merge",
        "מחיקת properties",
        "Read-only",
        "Required"
      ],
      correctIndex: 0,
      explanation: "Partial<{a:string;b:number}> = {a?:string;b?:number}. Pattern: function update(id:string, patch: Partial<User>).",
      optionFeedback: [
        "✅ נכון. Partial הופך הכל ל-optional.",
        "❌ Omit<T,K> מוחק properties.",
        "❌ Readonly<T> הופך ל-readonly.",
        "❌ Required<T> הפוך — מסיר ?."
      ]
    },
    { id: "mc_ts_required_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 5,
      question: "מה Required<T> ב-TS?",
      options: [
        "הופך כל property optional ל-mandatory — מסיר את ה-? מכל ה-keys של T",
        "מוסיף readonly",
        "מסיר union",
        "Partial"
      ],
      correctIndex: 0,
      explanation: "Required<{a?:string}> = {a:string}. הפוך מ-Partial.",
      optionFeedback: [
        "✅ נכון. הפוך מ-Partial.",
        "❌ Readonly<T> = readonly.",
        "❌ Exclude/NonNullable.",
        "❌ Partial הפוך."
      ]
    },
    { id: "mc_ts_readonly_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 5,
      question: "מה Readonly<T> ב-TS?",
      options: [
        "הופך כל property של T ל-readonly — אסור reassignment, אבל מוטציות עומק עדיין אפשריות",
        "Deep freeze בזמן ריצה",
        "מסיר properties",
        "Optional"
      ],
      correctIndex: 0,
      explanation: "Readonly הוא compile-time בלבד. לא Object.freeze. ל-deep readonly צריך recursive type.",
      optionFeedback: [
        "✅ נכון. compile-time, shallow.",
        "❌ Object.freeze הוא runtime.",
        "❌ Omit מוחק.",
        "❌ Partial = optional."
      ]
    },
    { id: "mc_ts_pick_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 5,
      question: "מה Pick<T, K> ב-TS?",
      options: [
        "בוחר תת-קבוצה של keys מ-T — Pick<User, 'id'|'name'> מחזיר {id;name} בלבד",
        "מסיר properties",
        "אקראי",
        "Required"
      ],
      correctIndex: 0,
      explanation: "Pick<{a:string;b:number;c:boolean}, 'a'|'b'> = {a:string;b:number}.",
      optionFeedback: [
        "✅ נכון. בחירת תת-קבוצה.",
        "❌ Omit הפוך.",
        "❌ deterministic.",
        "❌ Required הוא ענין אחר."
      ]
    },
    { id: "mc_ts_omit_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 5,
      question: "מה Omit<T, K> ב-TS?",
      options: [
        "מסיר keys מ-T — Omit<User, 'password'> מחזיר User בלי password",
        "Pick הפוך כן, אבל זה לא קיים",
        "מסיר ערכים",
        "Filter"
      ],
      correctIndex: 0,
      explanation: "Omit<{a;b;c}, 'b'> = {a;c}. נפוץ ל-DTO בלי שדות רגישים.",
      optionFeedback: [
        "✅ נכון. הפוך מ-Pick.",
        "❌ Omit כן קיים.",
        "❌ זה type-level לא runtime.",
        "❌ filter הוא array method."
      ]
    },
    { id: "mc_ts_record_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 5,
      question: "מה Record<K, V> ב-TS?",
      options: [
        "Object type עם keys מסוג K וערכים מסוג V — Record<'a'|'b', number> = {a:number;b:number}",
        "Map בלבד",
        "DB record",
        "Tuple"
      ],
      correctIndex: 0,
      explanation: "Record<string, number> = { [k:string]: number }. שימושי ל-dict types.",
      optionFeedback: [
        "✅ נכון. dict type helper.",
        "❌ Map הוא runtime.",
        "❌ אין קשר ל-DB.",
        "❌ Tuple = [a,b]."
      ]
    },
    { id: "mc_ts_exclude_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 6,
      question: "מה Exclude<T, U> ב-TS?",
      options: [
        "מסיר מ-union T את הברנצ'ים שמתאימים ל-U — Exclude<'a'|'b'|'c','a'> = 'b'|'c'",
        "Omit על object",
        "Filter array",
        "Subtraction"
      ],
      correctIndex: 0,
      explanation: "פעולת union types. Exclude<string|number|boolean, boolean> = string|number.",
      optionFeedback: [
        "✅ נכון. union filtering.",
        "❌ Omit הוא ל-object keys.",
        "❌ זה type-level.",
        "❌ אין arithmetic על types."
      ]
    },
    { id: "mc_ts_extract_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 6,
      question: "מה Extract<T, U> ב-TS?",
      options: [
        "שומר מ-union T רק את הברנצ'ים שמתאימים ל-U — הפוך מ-Exclude",
        "Pick על object",
        "ערך חוץ",
        "Promise.resolve"
      ],
      correctIndex: 0,
      explanation: "Extract<string|number, string> = string. הפוך מ-Exclude.",
      optionFeedback: [
        "✅ נכון. הפוך מ-Exclude.",
        "❌ Pick הוא ל-keys.",
        "❌ extract הוא לא ערך חוץ — type level.",
        "❌ Promise unrelated."
      ]
    },
    { id: "mc_ts_nonnull_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 6,
      question: "מה NonNullable<T> ב-TS?",
      options: [
        "מסיר null|undefined מ-union — NonNullable<string|null|undefined> = string",
        "Throws on null",
        "Required",
        "Truthy filter"
      ],
      correctIndex: 0,
      explanation: "שווה ערך ל-Exclude<T, null|undefined>. שימושי אחרי narrow.",
      optionFeedback: [
        "✅ נכון. type-level null removal.",
        "❌ runtime check נפרד.",
        "❌ Required קשור ל-keys לא ל-null.",
        "❌ truthy חולש גם על 0/'' — שונה."
      ]
    },
    { id: "mc_ts_returntype_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 6,
      question: "מה ReturnType<typeof fn> ב-TS?",
      options: [
        "מחלץ את ה-return type של פונקציה — שימושי לסנכרון types בין פונקציה לקונסיומר",
        "Calls function",
        "Parameters",
        "void"
      ],
      correctIndex: 0,
      explanation: "function f(): {a:1} → ReturnType<typeof f> = {a:1}. נמנע מכפילות types.",
      optionFeedback: [
        "✅ נכון. type extraction.",
        "❌ ReturnType לא מבצע call.",
        "❌ Parameters<T> חולץ params.",
        "❌ void = ערך החזרה ריק."
      ]
    },
    { id: "mc_ts_parameters_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 6,
      question: "מה Parameters<typeof fn> ב-TS?",
      options: [
        "מחלץ את ה-params types כ-tuple — Parameters<(a:number,b:string)=>void> = [number, string]",
        "ReturnType",
        "Args ב-function call",
        "Object"
      ],
      correctIndex: 0,
      explanation: "Tuple type מה-params. שימושי ל-wrapper functions.",
      optionFeedback: [
        "✅ נכון. params tuple.",
        "❌ ReturnType חולץ return.",
        "❌ זה type level לא runtime.",
        "❌ Tuple, לא object."
      ]
    },
    { id: "mc_ts_awaited_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 7,
      question: "מה Awaited<T> ב-TS 4.5+?",
      options: [
        "מחלץ את ה-resolved type של Promise (כולל nested) — Awaited<Promise<Promise<string>>> = string",
        "Throws if not promise",
        "Promise constructor",
        "async"
      ],
      correctIndex: 0,
      explanation: "ראקורסיבי. Awaited<Promise<T>> = T; Awaited<Promise<Promise<T>>> = T (לא Promise<T>).",
      optionFeedback: [
        "✅ נכון. recursive unwrap.",
        "❌ type level לא throws.",
        "❌ קונסטרקטור הוא runtime.",
        "❌ async הוא keyword."
      ]
    },
    { id: "mc_ts_generic_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 5,
      question: "מה generic ב-TS?",
      options: [
        "פרמטר type שמאפשר לפונקציה/class/type לעבוד עם types שונים תוך שמירת type safety",
        "any",
        "unknown",
        "void"
      ],
      correctIndex: 0,
      explanation: "function id<T>(x: T): T { return x; } id<number>(5) שומר על type. any מאבד type safety.",
      optionFeedback: [
        "✅ נכון. type parameter.",
        "❌ any מאבד types.",
        "❌ unknown הוא type-safe any אך לא generic.",
        "❌ void הוא return type."
      ]
    },
    { id: "mc_ts_generic_constraint_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 6,
      question: "מה <T extends Foo> ב-TS?",
      options: [
        "Generic constraint — דורש ש-T יהיה assignable ל-Foo (subtype). חוסם סוגי T שאינם תואמים",
        "ירושה",
        "Mixin",
        "T = Foo"
      ],
      correctIndex: 0,
      explanation: "function f<T extends {length:number}>(x:T) — T חייב להיות object עם length. חוסם type unsafe.",
      optionFeedback: [
        "✅ נכון. constraint על generic.",
        "❌ ירושה היא class extends.",
        "❌ Mixin = הרכבה.",
        "❌ extends ב-generic = subtype לא שוויון."
      ]
    },
    { id: "mc_ts_keyof_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 6,
      question: "מה keyof T ב-TS?",
      options: [
        "Union של string-literal types שהם המפתחות של T — keyof {a:1;b:2} = 'a'|'b'",
        "Object.keys בזמן ריצה",
        "מספר ה-keys",
        "Map keys"
      ],
      correctIndex: 0,
      explanation: "type-level. שימושי ל-typed access: function get<T,K extends keyof T>(o:T, k:K): T[K].",
      optionFeedback: [
        "✅ נכון. keys union.",
        "❌ Object.keys runtime.",
        "❌ keyof לא מספר.",
        "❌ Map שונה."
      ]
    },
    { id: "mc_ts_typeof_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 6,
      question: "מה typeof במקום type ב-TS?",
      options: [
        "Type query — מקבל את ה-type של ערך קיים. const x = {a:1}; type X = typeof x; → X = {a:number}",
        "JS typeof בלבד",
        "מחזיר string",
        "Reflection"
      ],
      correctIndex: 0,
      explanation: "TS overloads typeof. בעמדת type, זה מחזיר type. בעמדת value, זה JS typeof שמחזיר string.",
      optionFeedback: [
        "✅ נכון. type query.",
        "❌ TS מוסיף typeof כ-type query.",
        "❌ בעמדת type זה type לא string.",
        "❌ אין reflection runtime."
      ]
    },
    { id: "mc_ts_indexed_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 6,
      question: "מה T[K] ב-TS (indexed access type)?",
      options: [
        "מחלץ את ה-type של property K מ-type T — type Name = User['name']",
        "Array element",
        "Runtime access",
        "Generic"
      ],
      correctIndex: 0,
      explanation: "type Phone = User['phone'] גם אם phone הוא optional או union.",
      optionFeedback: [
        "✅ נכון. indexed access type.",
        "❌ זה לא runtime access.",
        "❌ runtime זה obj[k].",
        "❌ generic הוא <T> שונה."
      ]
    },
    { id: "mc_ts_mapped_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 7,
      question: "מה mapped type ב-TS?",
      options: [
        "Type שיוצר type חדש על-ידי איטרציה על keys: {[K in keyof T]: U} — בסיס ל-Partial/Readonly",
        "Map<K,V>",
        "forEach על types",
        "JSON"
      ],
      correctIndex: 0,
      explanation: "Partial<T> = { [P in keyof T]?: T[P] }. בסיס לכל ה-utility types.",
      optionFeedback: [
        "✅ נכון. mapped type pattern.",
        "❌ Map הוא runtime.",
        "❌ זה type-level לא forEach.",
        "❌ JSON unrelated."
      ]
    },
    { id: "mc_ts_conditional_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 7,
      question: "מה conditional type ב-TS?",
      options: [
        "T extends U ? X : Y — type-level if. בסיס ל-Exclude/Extract/ReturnType",
        "if בזמן ריצה",
        "switch",
        "ternary רגיל"
      ],
      correctIndex: 0,
      explanation: "type IsString<T> = T extends string ? true : false. עם distributive על unions.",
      optionFeedback: [
        "✅ נכון. type-level conditional.",
        "❌ runtime if שונה.",
        "❌ אין switch ב-types.",
        "❌ ternary רגיל הוא runtime."
      ]
    },
    { id: "mc_ts_infer_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 8,
      question: "מה infer ב-conditional type?",
      options: [
        "Type-level let — מחלץ type ממיקום ספציפי. type R<T> = T extends (...a:any)=>infer R ? R : never",
        "Implicit any",
        "Type assertion",
        "Cast"
      ],
      correctIndex: 0,
      explanation: "ReturnType מומש כך: type ReturnType<T extends (...a:any)=>any> = T extends (...a:any)=>infer R ? R : never.",
      optionFeedback: [
        "✅ נכון. infer מחלץ type.",
        "❌ implicit any שונה.",
        "❌ assertion הוא as.",
        "❌ אין cast אמיתי ב-TS."
      ]
    },
    { id: "mc_ts_template_lit_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 7,
      question: "מה template literal type ב-TS 4.1+?",
      options: [
        "Type שבונה string-literal types: `${'on'}${Capitalize<K>}` — מאפשר חוקיות ב-event names",
        "Template literal רגיל",
        "Function string",
        "Regex"
      ],
      correctIndex: 0,
      explanation: "type Greet<N extends string> = `Hello ${N}`. עם Uppercase/Capitalize/Lowercase.",
      optionFeedback: [
        "✅ נכון. type-level templates.",
        "❌ זה type level.",
        "❌ אין קשר ל-string functions.",
        "❌ regex unrelated."
      ]
    },
    { id: "mc_ts_satisfies_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 7,
      question: "מה satisfies operator ב-TS 4.9+?",
      options: [
        "מאמת ש-value מתאים ל-type בלי לאבד את ה-narrow type של הערך — שונה מ-as ומ-: type",
        "as cast",
        "instanceof",
        "is"
      ],
      correctIndex: 0,
      explanation: "const c = { a:1 } satisfies Record<string,number>. שומר ש-c.a הוא literal 1, לא number כללי.",
      optionFeedback: [
        "✅ נכון. type check בלי width loss.",
        "❌ as = assertion (לא מאמת).",
        "❌ instanceof = runtime.",
        "❌ is = type predicate."
      ]
    },
    { id: "mc_ts_as_const_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 6,
      question: "מה as const ב-TS?",
      options: [
        "Type assertion שהופך literal types לצרים: { a: 1 } as const → { readonly a: 1 } במקום { a: number }",
        "JS const",
        "ערך קבוע",
        "Final"
      ],
      correctIndex: 0,
      explanation: "['a','b'] as const → readonly ['a','b'] (tuple), אחרת string[].",
      optionFeedback: [
        "✅ נכון. literal narrowing.",
        "❌ const הוא runtime.",
        "❌ זה type-level בלבד.",
        "❌ אין final ב-TS."
      ]
    },
    { id: "mc_ts_unknown_vs_any_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 6,
      question: "מה ההבדל בין unknown ל-any?",
      options: [
        "unknown דורש narrowing לפני שימוש (type-safe). any מבטל בדיקות לחלוטין",
        "זהים",
        "any חזק יותר",
        "unknown זה null"
      ],
      correctIndex: 0,
      explanation: "let u: unknown = 'a'; u.toUpperCase() ❌. let a: any = 'a'; a.toUpperCase() ✅ (אך אין safety).",
      optionFeedback: [
        "✅ נכון. unknown מאלץ narrow.",
        "❌ unknown safer.",
        "❌ any פחות בטוח (לא חזק).",
        "❌ unknown ≠ null."
      ]
    },
    { id: "mc_ts_never_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 6,
      question: "מתי משתמשים ב-never ב-TS?",
      options: [
        "Functions שלא מחזירות (throw/infinite loop), exhaustiveness check ב-switch, branches בלתי אפשריים",
        "void synonym",
        "null",
        "undefined"
      ],
      correctIndex: 0,
      explanation: "function fail(): never { throw Error(); }. ב-switch: default: const _: never = x — מבטיח כיסוי כל union.",
      optionFeedback: [
        "✅ נכון. שני שימושים מרכזיים.",
        "❌ void = פונקציה שמחזירה אך ללא ערך.",
        "❌ null הוא type נפרד.",
        "❌ undefined הוא type נפרד."
      ]
    },
    { id: "mc_ts_void_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 5,
      question: "מה void ב-TS?",
      options: [
        "Return type של פונקציה שלא מחזירה ערך משמעותי — מאפשר return undefined ו-return; (לא צריך throw)",
        "never",
        "undefined בלבד",
        "null"
      ],
      correctIndex: 0,
      explanation: "function log(): void {}. תקין: return; ו-return undefined;. לא תקין: return 5.",
      optionFeedback: [
        "✅ נכון.",
        "❌ never = לא מחזיר בכלל (throw/לולאה אינסופית).",
        "❌ undefined שונה.",
        "❌ null שונה."
      ]
    },
    { id: "mc_ts_enum_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 5,
      question: "מה enum ב-TS?",
      options: [
        "סוג ייחודי ל-TS — מגדיר קבוצת קבועים בעלי שם. ב-runtime נוצר object דו-כיווני (אם numeric)",
        "JS native",
        "אובייקט רגיל",
        "Class"
      ],
      correctIndex: 0,
      explanation: "enum Color { R, G } → Color.R = 0, Color[0] = 'R'. const enum נמחק ב-compile time.",
      optionFeedback: [
        "✅ נכון. TS-only feature.",
        "❌ JS אין enum native.",
        "❌ enum ≠ object רגיל (יש reverse mapping).",
        "❌ class אחר לחלוטין."
      ]
    },
    { id: "mc_ts_const_enum_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 6,
      question: "מה ההבדל בין enum ל-const enum?",
      options: [
        "const enum נמחק ב-compile time והשימושים הופכים ל-literals — אין runtime object. enum רגיל יוצר object",
        "זהים",
        "const enum מהיר יותר ב-DEV",
        "const enum רק string"
      ],
      correctIndex: 0,
      explanation: "const enum E { A = 1 } → c = E.A הופך ל-c = 1 ישירות. אך לא תואם isolatedModules.",
      optionFeedback: [
        "✅ נכון. inline elimination.",
        "❌ שונים מהותית.",
        "❌ ב-runtime, לא ב-DEV.",
        "❌ יכול להיות מספרי גם."
      ]
    },
    { id: "mc_ts_interface_vs_type_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 5,
      question: "מה ההבדל בין interface ל-type?",
      options: [
        "interface תומך declaration merging ו-extends; type תומך unions/intersections/mapped/conditional. interface מומלץ ל-public APIs של object shapes",
        "זהים",
        "type ב-class בלבד",
        "interface ב-array בלבד"
      ],
      correctIndex: 0,
      explanation: "interface A {} interface A {} מתאחדים. type A = ... | ... אפשרי ל-union, interface לא.",
      optionFeedback: [
        "✅ נכון. הבדלים מעשיים.",
        "❌ דומים אך לא זהים.",
        "❌ שניהם ב-class.",
        "❌ שניהם ל-array."
      ]
    },
    { id: "mc_ts_decl_merge_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 7,
      question: "מה declaration merging ב-TS?",
      options: [
        "מספר interfaces/namespaces עם אותו שם מתאחדים אוטומטית — שימושי להרחבת types של ספריות",
        "Class extends",
        "Mixin",
        "Spread"
      ],
      correctIndex: 0,
      explanation: "interface Window { myProp: string } מרחיב את Window הגלובלי. type לא תומך merging.",
      optionFeedback: [
        "✅ נכון. interface only.",
        "❌ extends מפורש.",
        "❌ mixin שונה.",
        "❌ spread הוא runtime."
      ]
    },
    { id: "mc_ts_module_aug_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 8,
      question: "מה module augmentation ב-TS?",
      options: [
        "declare module 'lib' { interface X {} } — מרחיב types של ספרייה חיצונית בלי לערוך אותה",
        "Re-export",
        "Plugin",
        "Override"
      ],
      correctIndex: 0,
      explanation: "declare module 'express' { interface Request { user?: User } } — נפוץ ב-Express middleware.",
      optionFeedback: [
        "✅ נכון. הרחבת types חיצונית.",
        "❌ re-export הוא export רגיל.",
        "❌ אין plugin אמיתי.",
        "❌ override שונה."
      ]
    },
    { id: "mc_ts_assertion_fn_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 7,
      question: "מה assertion function ב-TS?",
      options: [
        "function fn(x): asserts x is T — אם לא מתקיים נורק, אחרת ה-narrow מתפשט אחרי הקריאה",
        "type predicate",
        "throw",
        "as"
      ],
      correctIndex: 0,
      explanation: "function assertString(x: unknown): asserts x is string { if (typeof x!=='string') throw Error(); } אחרי הקריאה x:string.",
      optionFeedback: [
        "✅ נכון. asserts narrowing.",
        "❌ predicate משתמש ב-is אך לא בא עם asserts (מחזיר boolean).",
        "❌ throw לבד לא משנה types.",
        "❌ as = assertion ידני."
      ]
    },
    { id: "mc_ts_predicate_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 7,
      question: "מה type predicate ב-TS?",
      options: [
        "function fn(x): x is T — מחזיר boolean. ב-true, TS narrow את x ל-T",
        "asserts",
        "throw",
        "instanceof רגיל"
      ],
      correctIndex: 0,
      explanation: "function isString(x: unknown): x is string { return typeof x === 'string'; }. if(isString(v)) v.toUpperCase() OK.",
      optionFeedback: [
        "✅ נכון.",
        "❌ asserts מחזיר void עם asserts.",
        "❌ throw אחר.",
        "❌ instanceof מצומצם ל-class."
      ]
    },
    { id: "mc_ts_strict_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 6,
      question: "מה strict ב-tsconfig?",
      options: [
        "מפעיל את כל הדגלים המומלצים: noImplicitAny, strictNullChecks, strictFunctionTypes, strictBindCallApply, וכו",
        "ESLint רק",
        "Babel only",
        "Runtime check"
      ],
      correctIndex: 0,
      explanation: "strict:true מפעיל ~7 דגלים. מומלץ לפרויקטים חדשים.",
      optionFeedback: [
        "✅ נכון. composite flag.",
        "❌ ESLint נפרד.",
        "❌ Babel נפרד.",
        "❌ TS לא runtime."
      ]
    },
    { id: "mc_ts_decorator_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 7,
      question: "מה decorators ב-TS (proposal stage 3)?",
      options: [
        "מטא-תיוג של class/method/property/parameter — נפוץ ב-NestJS/Angular. דורש experimentalDecorators או TS 5+ stage 3",
        "Comment",
        "annotation דקלרטיבי",
        "JSDoc"
      ],
      correctIndex: 0,
      explanation: "@Controller(), @Injectable(), @Get() — NestJS pattern.",
      optionFeedback: [
        "✅ נכון.",
        "❌ comment ignored ב-runtime.",
        "❌ annotation בלבד = משהו אחר.",
        "❌ JSDoc הוא comments."
      ]
    }
  ],
  fill: [
    { id: "fill_ts_partial_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 5,
      code: "// Partial: all properties optional\ntype A = { x: number; y: string };\ntype B = ____<A>;\n// B = { x?: number; y?: string }",
      answer: "Partial",
      explanation: "Partial<T> hopper kol property ל-optional."
    },
    { id: "fill_ts_required_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 5,
      code: "// Make all optional → mandatory\ntype A = { x?: number };\ntype B = ____<A>;\n// B = { x: number }",
      answer: "Required",
      explanation: "Required<T> hofech mi-Partial."
    },
    { id: "fill_ts_pick_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 5,
      code: "// Pick subset of keys\ntype User = { id: number; name: string; pwd: string };\ntype Public = ____<User, 'id' | 'name'>;",
      answer: "Pick",
      explanation: "Pick<T,K> behirat tat-kvotza shel keys."
    },
    { id: "fill_ts_omit_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 5,
      code: "// Remove keys\ntype User = { id: number; pwd: string };\ntype Safe = ____<User, 'pwd'>;",
      answer: "Omit",
      explanation: "Omit<T,K> hesir keys."
    },
    { id: "fill_ts_record_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 5,
      code: "// Dict type\ntype Counts = ____<string, number>;\n// keys: string, values: number",
      answer: "Record",
      explanation: "Record<K,V> dict type."
    },
    { id: "fill_ts_generic_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 5,
      code: "// Generic identity\nfunction id<____>(x: T): T {\n  return x;\n}",
      answer: "T",
      explanation: "Type parameter T."
    },
    { id: "fill_ts_keyof_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 6,
      code: "// keys union\ntype User = { id: number; name: string };\ntype K = ____ User;\n// K = 'id' | 'name'",
      answer: "keyof",
      explanation: "keyof T mahzir keys union."
    },
    { id: "fill_ts_typeof_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 6,
      code: "// type query from value\nconst user = { id: 1, name: 'Tal' };\ntype User = ____ user;\n// User inferred from value",
      answer: "typeof",
      explanation: "typeof bemiz-pat type = type query."
    },
    { id: "fill_ts_returntype_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 6,
      code: "// Extract return type\nfunction getUser() { return { id: 1, name: 'Tal' }; }\ntype User = ____<typeof getUser>;",
      answer: "ReturnType",
      explanation: "ReturnType<T> mahalets return type."
    },
    { id: "fill_ts_readonly_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 5,
      code: "// All props readonly\ntype A = { x: number; y: string };\ntype B = ____<A>;\n// B = { readonly x: number; readonly y: string }",
      answer: "Readonly",
      explanation: "Readonly<T> compile-time readonly."
    },
    { id: "fill_ts_as_const_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 6,
      code: "// Literal narrowing\nconst arr = [1, 2, 3] as ____;\n// arr type: readonly [1, 2, 3]",
      answer: "const",
      explanation: "as const literal narrowing."
    },
    { id: "fill_ts_unknown_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 6,
      code: "// Type-safe alternative to any\nlet val: ____ = JSON.parse(input);\nif (typeof val === 'string') {\n  val.toUpperCase(); // narrowed\n}",
      answer: "unknown",
      explanation: "unknown maalets narrowing kodem shimush."
    },
    { id: "fill_ts_never_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 6,
      code: "// Function that never returns\nfunction fail(msg: string): ____ {\n  throw new Error(msg);\n}",
      answer: "never",
      explanation: "never = lo mahzir lehlutin."
    },
    { id: "fill_ts_void_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 5,
      code: "// No meaningful return\nfunction log(msg: string): ____ {\n  console.log(msg);\n}",
      answer: "void",
      explanation: "void = ein erech hazara mashmaouti."
    },
    { id: "fill_ts_extends_dd_001", topicId: "topic_ts", conceptKey: "lesson_25::TypeScript", level: 6,
      code: "// Generic constraint\nfunction len<T ____ { length: number }>(x: T): number {\n  return x.length;\n}",
      answer: "extends",
      explanation: "<T extends Foo> = generic constraint."
    }
  ]
};
