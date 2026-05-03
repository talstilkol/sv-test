// Sprint 2 batch CCC - More gap closing — Fill heavy + remaining MC
window.QUESTIONS_SHARD_CCC = {
  mc: [
    // lesson_closures (7 gaps)
    { id: "mc_lcl_closure_ccc_001", topicId: "topic_js", conceptKey: "lesson_closures::Closure", level: 7,
      question: "Closure mechanism?",
      options: ["Function captures variables from enclosing lexical scope. survives after outer function returns","Object","Class","Async"],
      correctIndex: 0,
      explanation: "Lexical scoping + first-class functions = closures.",
      optionFeedback: ["✅ נכון.","❌ different.","❌ legacy.","❌ unrelated."]
    },
    { id: "mc_lcl_lexical_ccc_001", topicId: "topic_js", conceptKey: "lesson_closures::Lexical Environment", level: 8,
      question: "Lexical Environment?",
      options: ["Internal data structure: variables + reference to outer environment. forms scope chain","DOM tree","Network","RAM"],
      correctIndex: 0,
      explanation: "JS engine creates LE for each function invocation.",
      optionFeedback: ["✅ נכון.","❌ unrelated.","❌ unrelated.","❌ implementation detail."]
    },
    { id: "mc_lcl_inner_outer_ccc_001", topicId: "topic_js", conceptKey: "lesson_closures::Inner Function", level: 7,
      question: "Inner function in closures?",
      options: ["Returned/passed function שזוכר scope של outer. accesses outer variables גם אחרי outer return","Standalone","Class method","No effect"],
      correctIndex: 0,
      explanation: "Hallmark of closures.",
      optionFeedback: ["✅ נכון.","❌ depends.","❌ scope אחר.","❌ effect קיים."]
    },
    { id: "mc_lcl_factory_ccc_001", topicId: "topic_js", conceptKey: "lesson_closures::Closure Factory", level: 7,
      question: "Closure factory pattern?",
      options: ["function makeCounter() { let n = 0; return () => ++n; } — encapsulates private state","Class","Object","Singleton"],
      correctIndex: 0,
      explanation: "Each invocation = new isolated state. pre-class JS pattern for encapsulation.",
      optionFeedback: ["✅ נכון.","❌ alternative.","❌ no encapsulation.","❌ different."]
    },
    { id: "mc_lcl_private_ccc_001", topicId: "topic_js", conceptKey: "lesson_closures::Private Variable", level: 7,
      question: "Closures + privacy?",
      options: ["Outer scope variable not exposed. inner functions only access. ES6 # privacy alternative","Public","Class only","No privacy"],
      correctIndex: 0,
      explanation: "Closure-based privacy predates class fields.",
      optionFeedback: ["✅ נכון.","❌ הפוך.","❌ alternative.","❌ קיים."]
    },
    { id: "mc_lcl_loop_var_ccc_001", topicId: "topic_js", conceptKey: "lesson_closures::Loop Variable Capture", level: 8,
      question: "for(var) + closure issue?",
      options: ["var function-scoped, single binding. all callbacks see final value. let creates new binding per iteration","Same","let issue","No issue"],
      correctIndex: 0,
      explanation: "Classic interview question.",
      optionFeedback: ["✅ נכון.","❌ שונים.","❌ הפוך.","❌ קיים."]
    },
    { id: "mc_lcl_react_ccc_001", topicId: "topic_js", conceptKey: "lesson_closures::Stale Closure in React", level: 8,
      question: "Stale closure ב-React?",
      options: ["useEffect/useCallback with missing deps capture old values. exhaustive-deps ESLint catches","No issue","Class","Random"],
      correctIndex: 0,
      explanation: "Common bug. fix: include all reactive vars in deps.",
      optionFeedback: ["✅ נכון.","❌ קיים.","❌ different layer.","❌ דטרמיניסטי."]
    },
    // lesson_design_systems remaining
    { id: "mc_ds_shadcn_ccc_001", topicId: "topic_design", conceptKey: "lesson_design_systems::shadcn/UI", level: 8,
      question: "shadcn/UI workflow?",
      options: ["npx shadcn add Button → copies Button.tsx, button-variants.ts, deps. אתה מתחזק. customize freely","npm install only","Server","Build"],
      correctIndex: 0,
      explanation: "Copy-paste model. components/ui/* yours.",
      optionFeedback: ["✅ נכון.","❌ הפוך.","❌ frontend.","❌ ב-build."]
    },
    { id: "mc_ds_radix_ccc_001", topicId: "topic_design", conceptKey: "lesson_design_systems::Radix primitives", level: 8,
      question: "Radix DialogContent props?",
      options: ["onEscapeKeyDown, onPointerDownOutside, onInteractOutside. allow custom behavior","Locked","Built-in only","No control"],
      correctIndex: 0,
      explanation: "Composable primitives. expose internal events.",
      optionFeedback: ["✅ נכון.","❌ flexible.","❌ extensible.","❌ control."]
    },
    { id: "mc_ds_a11y_ccc_001", topicId: "topic_design", conceptKey: "lesson_design_systems::accessible primitive", level: 8,
      question: "What 'accessible primitive' guarantees?",
      options: ["Keyboard nav, focus management, ARIA roles, screen-reader announcements. tested in real assistive tech","Just looks","Random","No guarantees"],
      correctIndex: 0,
      explanation: "Radix tests with axe-core, real screen readers.",
      optionFeedback: ["✅ נכון.","❌ deeper.","❌ דטרמיניסטי.","❌ promised."]
    },
    { id: "mc_ds_tokens_ccc_001", topicId: "topic_design", conceptKey: "lesson_design_systems::design tokens", level: 8,
      question: "Token categories?",
      options: ["Colors, spacing, typography, shadow, radii, motion (timing/easing), z-index, breakpoints","Color only","Random","Per-component"],
      correctIndex: 0,
      explanation: "Tokens = primitives of design system.",
      optionFeedback: ["✅ נכון.","❌ partial.","❌ דטרמיניסטי.","❌ shared."]
    },
    { id: "mc_ds_variants_ccc_001", topicId: "topic_design", conceptKey: "lesson_design_systems::component variants", level: 8,
      question: "Variant naming?",
      options: ["Semantic: intent (primary/destructive), size (sm/md/lg), state (default/disabled). avoid coupling to specific colors","Color names","Random","Class names"],
      correctIndex: 0,
      explanation: "Decouples styles from intent. theme switch easier.",
      optionFeedback: ["✅ נכון.","❌ couples to design.","❌ דטרמיניסטי.","❌ implementation."]
    },
    { id: "mc_ds_cn_ccc_001", topicId: "topic_design", conceptKey: "lesson_design_systems::cn helper", level: 7,
      question: "cn vs clsx?",
      options: ["clsx merges conditional. cn = clsx + twMerge (resolves Tailwind conflicts: 'px-2' + 'px-4' → 'px-4')","Same","cn slower","clsx for Tailwind"],
      correctIndex: 0,
      explanation: "twMerge crucial in Tailwind workflows.",
      optionFeedback: ["✅ נכון.","❌ שונים.","❌ דומה.","❌ הפוך."]
    },
    // lesson_19 remaining
    { id: "mc_l19_async_ccc_001", topicId: "topic_js", conceptKey: "lesson_19::async", level: 6,
      question: "async function returns?",
      options: ["Always Promise. ערך non-Promise → wrapped ב-Promise.resolve. throws → rejected","Direct value","Sync","Stream"],
      correctIndex: 0,
      explanation: "async sugar over .then.",
      optionFeedback: ["✅ נכון.","❌ wrapped.","❌ async.","❌ unrelated."]
    },
    { id: "mc_l19_await_ccc_001", topicId: "topic_js", conceptKey: "lesson_19::await", level: 6,
      question: "await behavior?",
      options: ["Pauses async function until Promise resolves. sequential by default. await on non-Promise = identity","Sync wait","Always parallel","Throws"],
      correctIndex: 0,
      explanation: "await Promise.all([...]) for parallel.",
      optionFeedback: ["✅ נכון.","❌ async pause.","❌ depends.","❌ rejected only."]
    },
    { id: "mc_l19_class_ccc_001", topicId: "topic_js", conceptKey: "lesson_19::class", level: 6,
      question: "class fields ES2022?",
      options: ["public x = 1; private #y = 2; static z = 3; — declared on class body","Constructor only","No fields","Method only"],
      correctIndex: 0,
      explanation: "Modern syntax. cleaner than constructor assignments.",
      optionFeedback: ["✅ נכון.","❌ legacy.","❌ supported.","❌ both."]
    },
    { id: "mc_l19_arrow_ccc_001", topicId: "topic_js", conceptKey: "lesson_19::arrow function", level: 6,
      question: "arrow function differences?",
      options: ["No own this/arguments/super, no hoisting (expression), can't be constructor (no [[Construct]]),implicit return","Same as function","Hoisted","Class only"],
      correctIndex: 0,
      explanation: "Lexical this חיוני ב-callbacks.",
      optionFeedback: ["✅ נכון.","❌ שונים.","❌ legacy.","❌ broader."]
    },
    { id: "mc_l19_destruct_ccc_001", topicId: "topic_js", conceptKey: "lesson_19::destructuring", level: 6,
      question: "destructuring uses?",
      options: ["Object/array unpack, function parameters, swap variables, defaults, nested, rest","Object only","Array only","Function args"],
      correctIndex: 0,
      explanation: "Wide applicability across JS.",
      optionFeedback: ["✅ נכון.","❌ wider.","❌ wider.","❌ wider."]
    },
    // lesson_22 remaining
    { id: "mc_l22_state_ccc_001", topicId: "topic_react", conceptKey: "lesson_22::state", level: 7,
      question: "Multiple useState vs single object?",
      options: ["Multiple = simpler updates (independent). Single object = update logic complex (must merge). מומלץ multiple","Always single","Always multi","No diff"],
      correctIndex: 0,
      explanation: "useReducer when state complex + transitions.",
      optionFeedback: ["✅ נכון.","❌ painful merges.","❌ overuse.","❌ practical diff."]
    },
    { id: "mc_l22_setstate_ccc_001", topicId: "topic_react", conceptKey: "lesson_22::setState", level: 6,
      question: "setState with object?",
      options: ["Replaces entirely (לא merges). אם stateי object → setX({ ...prev, key: val })","Merges auto","Throws","Random"],
      correctIndex: 0,
      explanation: "ב-class setState merged. בfunctional useState replaces.",
      optionFeedback: ["✅ נכון.","❌ functional.","❌ valid.","❌ דטרמיניסטי."]
    },
    { id: "mc_l22_useState_ccc_001", topicId: "topic_react", conceptKey: "lesson_22::useState", level: 6,
      question: "useState type inference?",
      options: ["TS infers מ-initial: useState(0) → number. עבור union/null: useState<User|null>(null)","No types","Always any","Manual only"],
      correctIndex: 0,
      explanation: "Generic explicit למקרים מורכבים.",
      optionFeedback: ["✅ נכון.","❌ TS לא partial.","❌ unsafe.","❌ inference works."]
    },
    { id: "mc_l22_immutable_ccc_001", topicId: "topic_react", conceptKey: "lesson_22::immutable", level: 7,
      question: "Deep immutable update?",
      options: ["Spread כל levels או Immer/structuredClone לdeep. shallow spread overrides only top-level","Single spread","Mutation","Just copy"],
      correctIndex: 0,
      explanation: "Immer simplifies deep updates significantly.",
      optionFeedback: ["✅ נכון.","❌ partial.","❌ wrong.","❌ shallow."]
    },
    { id: "mc_l22_re_render_ccc_001", topicId: "topic_react", conceptKey: "lesson_22::re-render", level: 7,
      question: "Avoid unnecessary re-renders?",
      options: ["React.memo (compare props), useMemo (cache), useCallback (stable fn), splitting context, state co-location","Always memo","Never","Random"],
      correctIndex: 0,
      explanation: "Profile first. memo is overhead also.",
      optionFeedback: ["✅ נכון.","❌ overuse hurts.","❌ קיים.","❌ דטרמיניסטי."]
    },
    // lesson_auth_security
    { id: "mc_auth_jwt_ccc_001", topicId: "topic_auth", conceptKey: "lesson_auth_security::JWT", level: 7,
      question: "JWT structure?",
      options: ["header.payload.signature — Base64URL encoded. signature verifies integrity. payload visible (don't put secrets)","Encrypted","Single string","Cookie format"],
      correctIndex: 0,
      explanation: "header: { alg, typ }. payload: claims. signature: HMAC.",
      optionFeedback: ["✅ נכון.","❌ signed not encrypted.","❌ 3 parts.","❌ different."]
    },
    { id: "mc_auth_oauth_ccc_001", topicId: "topic_auth", conceptKey: "lesson_auth_security::OAuth", level: 8,
      question: "OAuth 2.0 flow common?",
      options: ["Authorization Code Flow (PKCE for SPAs): redirect → consent → code → exchange for tokens. most secure","Implicit only","No tokens","Password directly"],
      correctIndex: 0,
      explanation: "Implicit deprecated. PKCE adds protection.",
      optionFeedback: ["✅ נכון.","❌ deprecated.","❌ tokens issued.","❌ insecure."]
    },
    { id: "mc_auth_csrf_ccc_001", topicId: "topic_auth", conceptKey: "lesson_auth_security::CSRF", level: 7,
      question: "CSRF protection?",
      options: ["SameSite cookie (Strict/Lax), CSRF tokens (synchronizer), check Origin/Referer headers","JWT only","CORS","HTTPS"],
      correctIndex: 0,
      explanation: "SameSite=Strict modern default. tokens for legacy.",
      optionFeedback: ["✅ נכון.","❌ partial.","❌ different vector.","❌ orthogonal."]
    },
    { id: "mc_auth_xss_ccc_001", topicId: "topic_auth", conceptKey: "lesson_auth_security::XSS boundary", level: 7,
      question: "XSS prevention?",
      options: ["Escape on output (textContent), sanitize HTML (DOMPurify), CSP headers, no eval(), HttpOnly cookies","One technique","Trust input","Manual"],
      correctIndex: 0,
      explanation: "Defense in depth. CSP catches what escapes other layers.",
      optionFeedback: ["✅ נכון.","❌ critical.","❌ never.","❌ scales badly."]
    },
    { id: "mc_auth_cors_ccc_001", topicId: "topic_auth", conceptKey: "lesson_auth_security::CORS", level: 7,
      question: "CORS configuration?",
      options: ["Specific origin (not *) when credentials, methods whitelist, headers whitelist, max-age for preflight cache","Wildcard always","No CORS","Trust all"],
      correctIndex: 0,
      explanation: "* + credentials prohibited by spec.",
      optionFeedback: ["✅ נכון.","❌ insecure.","❌ critical.","❌ insecure."]
    },
    { id: "mc_auth_password_ccc_001", topicId: "topic_auth", conceptKey: "lesson_auth_security::password hashing", level: 7,
      question: "Password hashing algorithm?",
      options: ["bcrypt (slow + salt + cost factor) or argon2 (modern, memory-hard). NEVER MD5/SHA-1/SHA-256","SHA-256","MD5","Plain"],
      correctIndex: 0,
      explanation: "Slow on purpose. memory-hard resists ASIC.",
      optionFeedback: ["✅ נכון.","❌ fast = broken.","❌ broken.","❌ catastrophe."]
    }
  ],
  fill: [
    // lesson_21 fills
    { id: "fill_l21_react_ccc_001", topicId: "topic_react", conceptKey: "lesson_21::React", level: 4,
      code: "// Import React (modern)\nimport React from '____';",
      answer: "react",
      explanation: "React from 'react' package."
    },
    { id: "fill_l21_create_ccc_001", topicId: "topic_react", conceptKey: "lesson_21::npm create vite@latest", level: 5,
      code: "# Create Vite project\n____ create vite@latest my-app",
      answer: "npm",
      explanation: "npm create runs scaffold script."
    },
    { id: "fill_l21_index_html_ccc_001", topicId: "topic_react", conceptKey: "lesson_21::index.html", level: 5,
      code: "<!-- Vite entry -->\n<div id=\"____\"></div>\n<script type=\"module\" src=\"/src/main.jsx\"></script>",
      answer: "root",
      explanation: "#root = React mount point."
    },
    { id: "fill_l21_jsx_ccc_001", topicId: "topic_react", conceptKey: "lesson_21::JSX", level: 5,
      code: "// JSX expression\nfunction Greet() {\n  return <h1>____</h1>;\n}",
      answer: "Hello",
      explanation: "JSX = HTML-like in JS."
    },
    { id: "fill_l21_curly_ccc_001", topicId: "topic_react", conceptKey: "lesson_21::{}", level: 5,
      code: "// Embed JS in JSX\n<div>{user.____}</div>",
      answer: "name",
      explanation: "{} for JS expressions in JSX."
    },
    { id: "fill_l21_props_ccc_001", topicId: "topic_react", conceptKey: "lesson_21::props", level: 5,
      code: "// Functional component with props\nfunction Greet(____) {\n  return <h1>Hello {props.name}</h1>;\n}",
      answer: "props",
      explanation: "First arg of functional component."
    },
    { id: "fill_l21_import_ccc_001", topicId: "topic_react", conceptKey: "lesson_21::import", level: 5,
      code: "// Named import\n____ { useState } from 'react';",
      answer: "import",
      explanation: "import keyword."
    },
    { id: "fill_l21_export_default_ccc_001", topicId: "topic_react", conceptKey: "lesson_21::export default", level: 5,
      code: "// Default export\nfunction App() { ... }\nexport ____ App;",
      answer: "default",
      explanation: "export default = primary export."
    },
    { id: "fill_l21_rfc_ccc_001", topicId: "topic_react", conceptKey: "lesson_21::RFC", level: 5,
      code: "// Functional component scaffold\nimport React from 'react';\nfunction MyComponent() {\n  return <div>Hi</div>;\n}\n____ default MyComponent;",
      answer: "export",
      explanation: "RFC snippet = scaffold."
    },
    { id: "fill_l21_component_ccc_001", topicId: "topic_react", conceptKey: "lesson_21::Component", level: 5,
      code: "// Define a Component\n____ Greet() {\n  return <h1>Hello</h1>;\n}",
      answer: "function",
      explanation: "Functional Component."
    },
    { id: "fill_l21_inline_style_ccc_001", topicId: "topic_react", conceptKey: "lesson_21::inline style", level: 5,
      code: "// Inline style with object\n<div style={{ color: '____' }}>Tal</div>",
      answer: "red",
      explanation: "Object with camelCase keys."
    },
    { id: "fill_l21_css_import_ccc_001", topicId: "topic_react", conceptKey: "lesson_21::CSS import", level: 5,
      code: "// Import CSS file\nimport './____css';",
      answer: "App.",
      explanation: "Vite handles CSS imports."
    },
    { id: "fill_l21_map_ccc_001", topicId: "topic_react", conceptKey: "lesson_21::map", level: 5,
      code: "// Render list\n{items.____(item => <li key={item.id}>{item.name}</li>)}",
      answer: "map",
      explanation: "Array.map for list rendering."
    },
    { id: "fill_l21_rendering_ccc_001", topicId: "topic_react", conceptKey: "lesson_21::rendering", level: 5,
      code: "// Conditional rendering\n{isLoading ____ <Spinner /> : <Content />}",
      answer: "?",
      explanation: "Ternary in JSX."
    },
    { id: "fill_l21_classname_ccc_001", topicId: "topic_react", conceptKey: "lesson_21::className", level: 5,
      code: "// JSX class attribute\n<div ____={'btn primary'}>Click</div>",
      answer: "className",
      explanation: "JSX uses className."
    }
  ]
};
