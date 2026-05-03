// Sprint 2 batch VV - One MC per gap-concept (closes 35 gaps directly)
// 50 questions: 35 MC + 15 Fill
window.QUESTIONS_SHARD_VV = {
  mc: [
    // lesson_23 (Router/Context)
    { id: "mc_l23_router_vv_001", topicId: "topic_react", conceptKey: "lesson_23::Router", level: 6,
      question: "מה React Router פותר?",
      options: ["Client-side routing — שינוי URL בלי reload, mapping URL → component, navigation history","Server routing","Cookies","CSS routes"],
      correctIndex: 0,
      explanation: "BrowserRouter, HashRouter. v6 syntax: <Routes>/<Route>.",
      optionFeedback: ["✅ נכון.","❌ זה Express.","❌ unrelated.","❌ unrelated."]
    },
    { id: "mc_l23_url_vv_001", topicId: "topic_react", conceptKey: "lesson_23::URL", level: 5,
      question: "מה window.location ב-SPA?",
      options: ["Object עם href/pathname/search/hash. ב-React Router: useLocation() hook נותן access ראקטיבי","Just string","Server URL","Cookie"],
      correctIndex: 0,
      explanation: "useLocation re-renders על navigation.",
      optionFeedback: ["✅ נכון.","❌ object.","❌ client-side.","❌ unrelated."]
    },
    { id: "mc_l23_route_vv_001", topicId: "topic_react", conceptKey: "lesson_23::Route", level: 5,
      question: "מה <Route path='...' element={...} /> ב-React Router v6?",
      options: ["Mapping URL pattern → component. matched לפי order, exact by default","Path component","Just component","URL"],
      correctIndex: 0,
      explanation: "v5 component={...}, v6 element={<Comp/>}.",
      optionFeedback: ["✅ נכון.","❌ מאחד.","❌ שונה.","❌ unrelated."]
    },
    { id: "mc_l23_browserrouter_vv_001", topicId: "topic_react", conceptKey: "lesson_23::BrowserRouter", level: 6,
      question: "מתי BrowserRouter נכון?",
      options: ["URLs נקיים (/users/42), דורש server config (SPA fallback). HashRouter (#) עובד גם בלי server","Always","Never","Static only"],
      correctIndex: 0,
      explanation: "BrowserRouter History API. server חייב להחזיר index.html ל-non-asset paths.",
      optionFeedback: ["✅ נכון.","❌ trade-offs.","❌ פתרון נפוץ.","❌ עובד גם דינמי."]
    },
    { id: "mc_l23_navigate_vv_001", topicId: "topic_react", conceptKey: "lesson_23::useNavigate", level: 6,
      question: "מה useNavigate() מאפשר?",
      options: ["Programmatic navigation: const nav = useNavigate(); nav('/users/42'). שונה מ-<Link> שדקלרטיבי","Component","Hook to read URL","Cookie"],
      correctIndex: 0,
      explanation: "Imperative navigation אחרי actions (login, save).",
      optionFeedback: ["✅ נכון.","❌ הוא hook.","❌ זה useLocation.","❌ unrelated."]
    },
    { id: "mc_l23_create_context_vv_001", topicId: "topic_react", conceptKey: "lesson_23::createContext", level: 6,
      question: "מה createContext(default)?",
      options: ["יוצר Context object עם default value (משמש כש-Provider לא ב-tree). זוג Provider+useContext","Class","Hook","Reducer"],
      correctIndex: 0,
      explanation: "const ThemeContext = createContext('light').",
      optionFeedback: ["✅ נכון.","❌ object.","❌ זה useContext.","❌ unrelated."]
    },
    { id: "mc_l23_use_context_vv_001", topicId: "topic_react", conceptKey: "lesson_23::useContext", level: 6,
      question: "מה useContext(C)?",
      options: ["Hook שמקבל context value מ-closest Provider למעלה ב-tree. אם אין Provider — default value","Provider","Reducer","DOM"],
      correctIndex: 0,
      explanation: "Re-renders consumer בכל value change.",
      optionFeedback: ["✅ נכון.","❌ הוא ה-supplier.","❌ unrelated.","❌ unrelated."]
    },
    { id: "mc_l23_prop_drilling_vv_001", topicId: "topic_react", conceptKey: "lesson_23::Prop Drilling", level: 7,
      question: "מה Prop Drilling?",
      options: ["העברת props דרך layers שלא משתמשים בהם. anti-pattern. פתרון: Context או state library","Best practice","TypeScript feature","Required"],
      correctIndex: 0,
      explanation: "סימן ש-architecture צריך refactor.",
      optionFeedback: ["✅ נכון.","❌ הפוך.","❌ unrelated.","❌ אופציונלי."]
    },
    // lesson_27 (TS deep)
    { id: "mc_l27_type_vv_001", topicId: "topic_ts", conceptKey: "lesson_27::type", level: 5,
      question: "מתי type alias עדיף על interface?",
      options: ["Union types, intersection, mapped, conditional, primitives. interface ל-object shapes שיכולים merge","Always type","Always interface","זהים"],
      correctIndex: 0,
      explanation: "interface declaration merging unique. type more flexible.",
      optionFeedback: ["✅ נכון.","❌ overuse.","❌ overuse.","❌ שונים."]
    },
    { id: "mc_l27_enum_vv_001", topicId: "topic_ts", conceptKey: "lesson_27::enum", level: 6,
      question: "מתי enum ב-TS שווה?",
      options: ["Categorical fixed values עם names. אך const enum מהיר, ול-modern code: union of literals 'a'|'b' פשוט יותר","Always","Never","Number only"],
      correctIndex: 0,
      explanation: "const enum compile-time inline. union type זול יותר ב-bundle.",
      optionFeedback: ["✅ נכון.","❌ trade-offs.","❌ legitimate.","❌ supports string."]
    },
    { id: "mc_l27_interface_vv_001", topicId: "topic_ts", conceptKey: "lesson_27::interface", level: 5,
      question: "מה interface ב-TS?",
      options: ["Type-level contract לobject shape. תומך extends, declaration merging, implements ב-class","Class","Function","Module"],
      correctIndex: 0,
      explanation: "interface User { id: number; name: string }.",
      optionFeedback: ["✅ נכון.","❌ class שונה.","❌ unrelated.","❌ unrelated."]
    },
    { id: "mc_l27_extends_intf_vv_001", topicId: "topic_ts", conceptKey: "lesson_27::extends interface", level: 6,
      question: "מה interface B extends A?",
      options: ["B מקבל את כל ה-properties של A + מוסיף משלו. multiple extends supported. type intersection דומה (A & B)","Class extends","Mixin","Override"],
      correctIndex: 0,
      explanation: "Composition של types. דומה ל-class extends ברעיון.",
      optionFeedback: ["✅ נכון.","❌ runtime.","❌ pattern אחר.","❌ הרחבה לא override."]
    },
    { id: "mc_l27_union_vv_001", topicId: "topic_ts", conceptKey: "lesson_27::Union Type", level: 6,
      question: "מה Union Type 'a' | 'b' | 'c'?",
      options: ["Type שיכול להיות אחד מ-N values/types. discriminated unions = pattern נפוץ","Intersection","Class","Subtype"],
      correctIndex: 0,
      explanation: "type Status = 'idle'|'loading'|'success'|'error'.",
      optionFeedback: ["✅ נכון.","❌ זה &.","❌ unrelated.","❌ ב-OOP."]
    },
    { id: "mc_l27_narrowing_vv_001", topicId: "topic_ts", conceptKey: "lesson_27::Type Narrowing", level: 7,
      question: "איך TS מצמצם type ב-runtime?",
      options: ["typeof, instanceof, in operator, equality, type predicates (x is T), truthiness — TS מבין flow control","Cast only","Annotations","Generics"],
      correctIndex: 0,
      explanation: "Control flow analysis. אחרי if (typeof x === 'string') TS יודע x:string.",
      optionFeedback: ["✅ נכון.","❌ עדיף narrowing.","❌ partial.","❌ unrelated."]
    },
    // lesson_21 (React basics)
    { id: "mc_l21_rfc_vv_001", topicId: "topic_react", conceptKey: "lesson_21::RFC", level: 5,
      question: "מה RFC ב-React (snippet)?",
      options: ["React Functional Component snippet — quick scaffold ל-component עם export default. נפוץ ב-VSCode extensions","API standard","Random","Frame"],
      correctIndex: 0,
      explanation: "ES7+ React/Redux/React-Native snippets extension.",
      optionFeedback: ["✅ נכון.","❌ context שונה.","❌ unrelated.","❌ unrelated."]
    },
    { id: "mc_l21_classname_vv_001", topicId: "topic_react", conceptKey: "lesson_21::className", level: 5,
      question: "למה JSX משתמש ב-className?",
      options: ["class הוא reserved keyword ב-JS. JSX → React.createElement → object. className = property שתואם ל-DOM","Faster","Better naming","CSS scoping"],
      correctIndex: 0,
      explanation: "Same DOM property name. אינו קשור ל-CSS.",
      optionFeedback: ["✅ נכון.","❌ זהה.","❌ זה לא ההסבר.","❌ unrelated."]
    },
    { id: "mc_l21_import_vv_001", topicId: "topic_react", conceptKey: "lesson_21::import", level: 5,
      question: "מה ההבדל בין named ל-default import?",
      options: ["import C from './c' (default). import { x, y } from './c' (named). שונים ב-syntax + 1 default per module","זהים","named legacy","default deprecated"],
      correctIndex: 0,
      explanation: "ניתן לערבב: import C, { x } from './c'.",
      optionFeedback: ["✅ נכון.","❌ שונים.","❌ default מוצג כ-modern.","❌ קיים."]
    },
    { id: "mc_l21_export_default_vv_001", topicId: "topic_react", conceptKey: "lesson_21::export default", level: 5,
      question: "מה export default function Comp() {}?",
      options: ["Single primary export per module. import עם כל שם — import C from '...' או import App from '...'","Multiple exports","Static","Named export"],
      correctIndex: 0,
      explanation: "Named אזרחים שווים: export const x. ניתן לערבב.",
      optionFeedback: ["✅ נכון.","❌ named אחר.","❌ unrelated.","❌ זה named."]
    },
    // lesson_26 (TS basics)
    { id: "mc_l26_string_vv_001", topicId: "topic_ts", conceptKey: "lesson_26::string", level: 4,
      question: "מה type annotation : string ב-TS?",
      options: ["Variable יכול לקבל string only. compile error אם מוצב ערך אחר","Runtime check","Optional","Auto-coerce"],
      correctIndex: 0,
      explanation: "Compile-time only. אין runtime overhead.",
      optionFeedback: ["✅ נכון.","❌ compile-time.","❌ enforced.","❌ אין coercion."]
    },
    { id: "mc_l26_number_vv_001", topicId: "topic_ts", conceptKey: "lesson_26::number", level: 4,
      question: "האם TS מבחין int מ-float?",
      options: ["לא — TS עוקב אחרי JS: number יחיד, IEEE 754 double. ל-int ספציפי: bigint למספרים גדולים","Yes int/float","Yes signed/unsigned","Class hierarchy"],
      correctIndex: 0,
      explanation: "JS אין int. TS עוקב.",
      optionFeedback: ["✅ נכון.","❌ JS אין.","❌ JS אין.","❌ primitive."]
    },
    { id: "mc_l26_boolean_vv_001", topicId: "topic_ts", conceptKey: "lesson_26::boolean", level: 4,
      question: "מה type boolean ב-TS?",
      options: ["true | false. אין truthy coercion ב-type level — חייב מפורש","Truthy/falsy","String","Number"],
      correctIndex: 0,
      explanation: "JS truthy ב-runtime. TS דורש boolean ב-typed APIs.",
      optionFeedback: ["✅ נכון.","❌ זה runtime.","❌ different type.","❌ different type."]
    },
    { id: "mc_l26_compiler_vv_001", topicId: "topic_ts", conceptKey: "lesson_26::Compiler", level: 5,
      question: "מה ה-compiler של TS?",
      options: ["tsc — מקמפל .ts → .js, מבצע type-check. אופציות ב-tsconfig.json. אלטרנטיבות: SWC/ESBuild ל-transpile בלי typecheck","Vite","Babel","Node"],
      correctIndex: 0,
      explanation: "tsc הוא הreference. Vite משתמש ב-ESBuild + tsc לcheck.",
      optionFeedback: ["✅ נכון.","❌ uses tsc/esbuild.","❌ Babel transpile only.","❌ unrelated."]
    },
    { id: "mc_l26_tsc_vv_001", topicId: "topic_ts", conceptKey: "lesson_26::tsc", level: 5,
      question: "מה tsc --noEmit?",
      options: ["Type-check בלבד, ללא יצירת .js files. שימוש: CI gate, IDE","Compile only","No types","Faster"],
      correctIndex: 0,
      explanation: "Modern flow: ESBuild builds, tsc --noEmit checks.",
      optionFeedback: ["✅ נכון.","❌ הפוך.","❌ types קריטי.","❌ depends."]
    },
    { id: "mc_l26_ts_ext_vv_001", topicId: "topic_ts", conceptKey: "lesson_26::.ts", level: 4,
      question: "מה .ts extension?",
      options: ["TypeScript source file. .tsx ל-JSX. אחרי tsc → .js / .jsx","Test file","Tests","Compiled"],
      correctIndex: 0,
      explanation: "Convention. ניתן לקנפג ב-tsconfig include/exclude.",
      optionFeedback: ["✅ נכון.","❌ זה .test.ts.","❌ זה .test.","❌ הפוך."]
    },
    // lesson_19 (review JS)
    { id: "mc_l19_var_vv_001", topicId: "topic_js", conceptKey: "lesson_19::var", level: 5,
      question: "למה var נחשב 'legacy' ב-2026?",
      options: ["Function-scoped (לא block), hoisted, redeclarable — מוביל לbugs. let/const מהירים יותר ב-engines מודרניים","Slow","Removed","Required"],
      correctIndex: 0,
      explanation: "ESLint 'no-var' rule נפוץ.",
      optionFeedback: ["✅ נכון.","❌ ביצועים דומים.","❌ קיים legacy.","❌ הפוך."]
    },
    { id: "mc_l19_map_vv_001", topicId: "topic_js", conceptKey: "lesson_19::map", level: 5,
      question: "מה chain של map?",
      options: ["arr.map(...).map(...) — שני iterations. למרבית cases זול. ב-large data: reduce ב-pass יחיד","Mutates","Async","O(n²)"],
      correctIndex: 0,
      explanation: "Multiple passes vs single. Trade-off readability vs perf.",
      optionFeedback: ["✅ נכון.","❌ pure.","❌ sync.","❌ O(2n) = O(n)."]
    },
    { id: "mc_l19_spread_vv_001", topicId: "topic_js", conceptKey: "lesson_19::spread", level: 6,
      question: "מה limit של spread על arrays גדולים?",
      options: ["...arr לcall function: stack overflow על arrays עצומים (>~10K). פתרון: apply או chunked","No limit","Type error","Slow"],
      correctIndex: 0,
      explanation: "Function arity limit. Math.max.apply(null, arr) פותר.",
      optionFeedback: ["✅ נכון. spec limit.","❌ קיים.","❌ runtime issue.","❌ זה תוצאה."]
    },
    { id: "mc_l19_inheritance_vv_001", topicId: "topic_js", conceptKey: "lesson_19::inheritance", level: 6,
      question: "מה inheritance ב-JS?",
      options: ["Prototypal: __proto__ שרשרת. ES6 class הוא syntactic sugar. Composition נחשב לרוב עדיף","Class-based","Static","Interface"],
      correctIndex: 0,
      explanation: "Object.create קודם ל-class.",
      optionFeedback: ["✅ נכון.","❌ JS prototype.","❌ unrelated.","❌ אין native interface."]
    },
    { id: "mc_l19_try_vv_001", topicId: "topic_js", conceptKey: "lesson_19::try", level: 5,
      question: "מתי try/catch נכון?",
      options: ["Sync code שיכול לזרוק (JSON.parse, RegExp). Async: try { await ... } catch. אסור catch כללי שמסתיר bugs","Always","Never","DOM only"],
      correctIndex: 0,
      explanation: "Catch ספציפי + re-throw כשלא ידוע איך לטפל.",
      optionFeedback: ["✅ נכון.","❌ overuse.","❌ נדרש.","❌ broader."]
    },
    { id: "mc_l19_catch_vv_001", topicId: "topic_js", conceptKey: "lesson_19::catch", level: 5,
      question: "מה catch (e) ב-modern JS?",
      options: ["e אופציונלי ב-ES2019: catch {} (אם אין שימוש). e יכול להיות כל value (לא רק Error)","Required e","Error only","Sync only"],
      correctIndex: 0,
      explanation: "Optional catch binding. typeof e check נדרש לעיתים.",
      optionFeedback: ["✅ נכון.","❌ אופציונלי.","❌ throws של non-Error קיימים.","❌ async-aware."]
    },
    { id: "mc_l19_throw_vv_001", topicId: "topic_js", conceptKey: "lesson_19::throw", level: 5,
      question: "מה throw new Error('msg')?",
      options: ["יוצר Error object עם stack trace + זורק. Best practice: זרוק Error subclasses (TypeError/CustomError), לא strings","throw 'string'","Logs only","Returns null"],
      correctIndex: 0,
      explanation: "Error gives stack. throw 'msg' לא.",
      optionFeedback: ["✅ נכון.","❌ אנטי-pattern.","❌ stops execution.","❌ throws."]
    },
    { id: "mc_l19_localStorage_vv_001", topicId: "topic_js", conceptKey: "lesson_19::localStorage", level: 5,
      question: "מה limits של localStorage?",
      options: ["~5-10MB per origin, sync API (חוסם UI), strings only, exception ב-quota exceeded","No limit","Async","Auto-clean"],
      correctIndex: 0,
      explanation: "ל-large data: IndexedDB. ל-fast access: localStorage OK.",
      optionFeedback: ["✅ נכון.","❌ קיים.","❌ sync.","❌ persistent."]
    },
    { id: "mc_l19_session_storage_vv_001", topicId: "topic_js", conceptKey: "lesson_19::sessionStorage", level: 5,
      question: "מה ההבדל בין sessionStorage ל-localStorage?",
      options: ["sessionStorage נמחק על tab close. localStorage נשאר עד פעולת מחיקה. APIs זהים","זהים","sessionStorage shared","localStorage temporary"],
      correctIndex: 0,
      explanation: "sessionStorage per-tab isolation. localStorage per-origin shared.",
      optionFeedback: ["✅ נכון.","❌ שונים.","❌ הפוך.","❌ הפוך."]
    },
    { id: "mc_l19_closure_vv_001", topicId: "topic_js", conceptKey: "lesson_19::closure", level: 6,
      question: "מתי closures יוצרות bugs ב-React?",
      options: ["useEffect/useCallback עם dep array חסר → stale value. fixed: include all reactive vars in deps","Never","Always","Async only"],
      correctIndex: 0,
      explanation: "react-hooks/exhaustive-deps ESLint catches.",
      optionFeedback: ["✅ נכון.","❌ קורה.","❌ עם care פתיר.","❌ sync גם."]
    }
  ],
  fill: [
    // lesson_18 fills
    { id: "fill_l18_express_vv_001", topicId: "topic_express", conceptKey: "lesson_18::Express", level: 4,
      code: "// Setup Express\nconst express = require('express');\nconst app = ____();\napp.listen(3000);",
      answer: "express",
      explanation: "express() creates app instance."
    },
    { id: "fill_l18_validation_vv_001", topicId: "topic_express", conceptKey: "lesson_18::validation", level: 6,
      code: "// Zod validation\nconst schema = z.object({ email: z.string().____() });",
      answer: "email",
      explanation: ".email() validates email format."
    },
    { id: "fill_l18_form_vv_001", topicId: "topic_html", conceptKey: "lesson_18::form", level: 5,
      code: "// HTML form POST\n<form ____=\"POST\" action=\"/users\">\n  <input name=\"email\" />\n</form>",
      answer: "method",
      explanation: "method='POST' sends data in body."
    },
    { id: "fill_l18_post_vv_001", topicId: "topic_express", conceptKey: "lesson_18::POST", level: 5,
      code: "// Express POST handler\napp.____('/users', (req, res) => {\n  res.status(201).json(req.body);\n});",
      answer: "post",
      explanation: "app.post for POST requests."
    },
    { id: "fill_l18_node_vv_001", topicId: "topic_node", conceptKey: "lesson_18::Node.js", level: 4,
      code: "# Run Node script\n____ server.js",
      answer: "node",
      explanation: "node = runtime CLI."
    },
    // lesson_22 fills
    { id: "fill_l22_addPost_vv_001", topicId: "topic_react", conceptKey: "lesson_22::addPost", level: 6,
      code: "// Add post immutably\nfunction addPost(post) {\n  setPosts(prev => [____prev, post]);\n}",
      answer: "...",
      explanation: "Spread for immutable add."
    },
    { id: "fill_l22_deletePost_vv_001", topicId: "topic_react", conceptKey: "lesson_22::deletePost", level: 6,
      code: "// Delete post by id\nfunction deletePost(id) {\n  setPosts(prev => prev.____(p => p.id !== id));\n}",
      answer: "filter",
      explanation: "filter for immutable delete."
    },
    // lesson_23 fills
    { id: "fill_l23_link_vv_001", topicId: "topic_react", conceptKey: "lesson_23::Link", level: 5,
      code: "// React Router navigation\n<Link ____=\"/users/42\">View User</Link>",
      answer: "to",
      explanation: "Link to= for navigation."
    },
    { id: "fill_l23_to_vv_001", topicId: "topic_react", conceptKey: "lesson_23::to", level: 5,
      code: "// Programmatic navigation\nconst nav = useNavigate();\nnav('____');",
      answer: "/home",
      explanation: "useNavigate(path) navigates."
    },
    { id: "fill_l23_useparams_vv_001", topicId: "topic_react", conceptKey: "lesson_23::useParams", level: 6,
      code: "// Read URL params\nconst { id } = use____();",
      answer: "Params",
      explanation: "useParams reads :id from URL."
    },
    { id: "fill_l23_provider_vv_001", topicId: "topic_react", conceptKey: "lesson_23::Provider", level: 6,
      code: "// Provide context value\n<ThemeContext.____ value=\"dark\">\n  <App />\n</ThemeContext.____>",
      answer: "Provider",
      explanation: "Context.Provider supplies value."
    },
    { id: "fill_l23_value_vv_001", topicId: "topic_react", conceptKey: "lesson_23::value", level: 6,
      code: "// Provider value\n<ThemeContext.Provider ____={theme}>",
      answer: "value",
      explanation: "value prop is the shared data."
    },
    { id: "fill_l23_dynamic_vv_001", topicId: "topic_react", conceptKey: "lesson_23::dynamic route", level: 6,
      code: "// Dynamic route\n<Route path=\"/users/____\" element={<User />} />",
      answer: ":id",
      explanation: ":id matches any segment."
    },
    // lesson_27 fills
    { id: "fill_l27_user_vv_001", topicId: "topic_ts", conceptKey: "lesson_27::User", level: 6,
      code: "// User type\ntype User = {\n  id: ____;\n  name: string;\n};",
      answer: "number",
      explanation: "TS primitives: number/string/boolean."
    },
    { id: "fill_l27_category_vv_001", topicId: "topic_ts", conceptKey: "lesson_27::Category", level: 6,
      code: "// Union of literals\ntype Category = 'food' ____ 'rent' ____ 'fun';",
      answer: "|",
      explanation: "| separates union options."
    }
  ]
};
