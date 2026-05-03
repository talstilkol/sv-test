// Sprint 2 batch EEE - Final batch — close remaining MC + heavy Fill
window.QUESTIONS_SHARD_EEE = {
  mc: [
    // lesson_27 final
    { id: "mc_l27_user_eee_001", topicId: "topic_ts", conceptKey: "lesson_27::User", level: 7,
      question: "User narrowing?",
      options: ["if (u.type === 'guest') { u.sessionId } else { u.email } — TS narrows union via discriminator","Cast","No types","instanceof"],
      correctIndex: 0,
      explanation: "Discriminated union pattern + control flow.",
      optionFeedback: ["✅ נכון.","❌ unsafe.","❌ critical.","❌ class only."]
    },
    // lesson_22 remaining MC
    { id: "mc_l22_re_render_eee_001", topicId: "topic_react", conceptKey: "lesson_22::re-render", level: 7,
      question: "Stable references?",
      options: ["useMemo wraps objects/arrays. useCallback wraps functions. parent recreates inline → child re-renders","Always recreate","Never","Random"],
      correctIndex: 0,
      explanation: "Reference equality. memo blocks render if equal.",
      optionFeedback: ["✅ נכון.","❌ avoid.","❌ קיים.","❌ דטרמיניסטי."]
    },
    { id: "mc_l22_props_eee_001", topicId: "topic_react", conceptKey: "lesson_22::props", level: 6,
      question: "props validation TS?",
      options: ["interface Props { name: string; age?: number } + Comp({ name, age }: Props). PropTypes legacy","No types","Class","String"],
      correctIndex: 0,
      explanation: "TS preferred over PropTypes. compile-time + IDE.",
      optionFeedback: ["✅ נכון.","❌ unsafe.","❌ functional.","❌ wider."]
    },
    // lesson_21 final
    { id: "mc_l21_react_eee_001", topicId: "topic_react", conceptKey: "lesson_21::React", level: 5,
      question: "React 18 features?",
      options: ["Concurrent rendering, automatic batching, Suspense for data, Transitions, useId, useDeferredValue, server components (RFC)","React 16","Same","Class only"],
      correctIndex: 0,
      explanation: "Major version bringing concurrent.",
      optionFeedback: ["✅ נכון.","❌ legacy.","❌ different.","❌ functional preferred."]
    },
    { id: "mc_l21_jsx_eee_001", topicId: "topic_react", conceptKey: "lesson_21::JSX", level: 5,
      question: "JSX rules?",
      options: ["Single root (or Fragment <>), camelCase props (className/onClick), close all tags, expressions in {}","Multiple roots","HTML strict","No close"],
      correctIndex: 0,
      explanation: "<></> or React.Fragment for multiple roots.",
      optionFeedback: ["✅ נכון.","❌ Fragment required.","❌ closer to JS.","❌ self-closing."]
    },
    { id: "mc_l21_props_eee_001", topicId: "topic_react", conceptKey: "lesson_21::props", level: 5,
      question: "Children prop?",
      options: ["props.children = JSX between opening/closing tags. type ReactNode in TS","Self-only","Closed","String"],
      correctIndex: 0,
      explanation: "<Card>content</Card> → Card({children}) sees 'content'.",
      optionFeedback: ["✅ נכון.","❌ flexible.","❌ open.","❌ wider."]
    },
    { id: "mc_l21_component_eee_001", topicId: "topic_react", conceptKey: "lesson_21::Component", level: 5,
      question: "Component composition?",
      options: ["Components compose: <App><Header/><Main/><Footer/></App>. children prop nests","Inheritance","Mixin","Class only"],
      correctIndex: 0,
      explanation: "Composition > inheritance ב-React philosophy.",
      optionFeedback: ["✅ נכון.","❌ unusual ב-React.","❌ different.","❌ functional preferred."]
    },
    // lesson_design_systems final
    { id: "mc_ds_radix_eee_001", topicId: "topic_design", conceptKey: "lesson_design_systems::Radix primitives", level: 7,
      question: "Radix philosophy?",
      options: ["Unstyled, accessible, composable. you control style. they handle a11y/keyboard/focus","Styled","Closed","Just CSS"],
      correctIndex: 0,
      explanation: "Headless component pattern.",
      optionFeedback: ["✅ נכון.","❌ הפוך.","❌ extensible.","❌ deeper."]
    },
    { id: "mc_ds_tokens_eee_001", topicId: "topic_design", conceptKey: "lesson_design_systems::design tokens", level: 7,
      question: "CSS Custom Properties tokens?",
      options: [":root { --color-primary: #3b82f6; --space-4: 1rem; } — used as var(--color-primary). dynamic via JS","Hardcoded","SCSS only","Static"],
      correctIndex: 0,
      explanation: "CSS variables = runtime, theme switching enabled.",
      optionFeedback: ["✅ נכון.","❌ inflexible.","❌ legacy approach.","❌ הפוך."]
    },
    // lesson_24 final
    { id: "mc_l24_useEffect_eee_001", topicId: "topic_react", conceptKey: "lesson_24::useEffect", level: 7,
      question: "useEffect race conditions?",
      options: ["Multiple in-flight requests, last response wins (or stale). use AbortController או cancel flag","Always safe","Never","Random"],
      correctIndex: 0,
      explanation: "Common bug. modern: TanStack Query handles.",
      optionFeedback: ["✅ נכון.","❌ אין safety נטיב.","❌ subtle bug.","❌ דטרמיניסטי."]
    },
    { id: "mc_l24_useMemo_eee_001", topicId: "topic_react", conceptKey: "lesson_24::useMemo", level: 7,
      question: "useMemo dependency change?",
      options: ["Re-runs computation if any dep ref changes (Object.is). returns memoized value otherwise","Sync","Class","No deps"],
      correctIndex: 0,
      explanation: "Same shallow equality React uses everywhere.",
      optionFeedback: ["✅ נכון.","❌ async-safe.","❌ functional.","❌ deps required."]
    },
    { id: "mc_l24_useRef_eee_001", topicId: "topic_react", conceptKey: "lesson_24::useRef", level: 6,
      question: "useRef common pitfall?",
      options: ["Mutating ref doesn't trigger render. need to use state if UI should update","Always renders","Read-only","Async"],
      correctIndex: 0,
      explanation: "Ref = escape hatch from React reactivity.",
      optionFeedback: ["✅ נכון.","❌ הפוך.","❌ writable.","❌ sync."]
    },
    // lesson_19 remaining (small)
    { id: "mc_l19_class_eee_001", topicId: "topic_js", conceptKey: "lesson_19::class", level: 6,
      question: "class method shorthand?",
      options: ["{ method() { ... } } — בrole class body. שונה מ-method: function() { ... } that's prototype-based","Function expressions","Random","Static"],
      correctIndex: 0,
      explanation: "ES6 syntax ייחודי לclass body and object literals.",
      optionFeedback: ["✅ נכון.","❌ שונים.","❌ דטרמיניסטי.","❌ requires keyword."]
    },
    // workbook_taskmanager final
    { id: "mc_wb_localStorage_eee_001", topicId: "topic_browser", conceptKey: "workbook_taskmanager::localStorage", level: 5,
      question: "Workbook persistence pattern?",
      options: ["JSON.stringify לwrite, JSON.parse לread, save after each mutation, load on init","Direct array","Cookies","No save"],
      correctIndex: 0,
      explanation: "Pattern: source of truth in memory, mirror to localStorage.",
      optionFeedback: ["✅ נכון.","❌ broken.","❌ different layer.","❌ data loss."]
    },
    { id: "mc_wb_objects_eee_001", topicId: "topic_js", conceptKey: "workbook_taskmanager::objects", level: 5,
      question: "Task object schema?",
      options: ["{ id (unique), title (string), completed (boolean), createdAt (timestamp), priority? }","String only","Class","Number"],
      correctIndex: 0,
      explanation: "id stable identity. priority optional.",
      optionFeedback: ["✅ נכון.","❌ insufficient.","❌ overkill.","❌ wrong."]
    }
  ],
  fill: [
    // lesson_18 fills (12 gaps)
    { id: "fill_l18_node_eee_001", topicId: "topic_node", conceptKey: "lesson_18::Node.js", level: 4,
      code: "# Run JS server-side\n____ server.js",
      answer: "node",
      explanation: "node = runtime CLI."
    },
    { id: "fill_l18_express_eee_001", topicId: "topic_express", conceptKey: "lesson_18::Express", level: 4,
      code: "// Setup Express\nconst express = require('____');\nconst app = express();",
      answer: "express",
      explanation: "express package."
    },
    { id: "fill_l18_server_eee_001", topicId: "topic_express", conceptKey: "lesson_18::server", level: 4,
      code: "// Listen on port\nconst server = app.____(3000);",
      answer: "listen",
      explanation: "listen returns http.Server."
    },
    { id: "fill_l18_route_eee_001", topicId: "topic_express", conceptKey: "lesson_18::route", level: 5,
      code: "// Define route\napp.____('/users', listUsers);",
      answer: "get",
      explanation: "app.get registers GET route."
    },
    { id: "fill_l18_get_eee_001", topicId: "topic_express", conceptKey: "lesson_18::GET", level: 4,
      code: "// GET handler\napp.get('/users', (req, ____) => {\n  res.json(users);\n});",
      answer: "res",
      explanation: "Standard handler signature."
    },
    { id: "fill_l18_post_eee_001", topicId: "topic_express", conceptKey: "lesson_18::POST", level: 5,
      code: "// POST handler\napp.____('/users', (req, res) => {\n  res.status(201).json(create(req.body));\n});",
      answer: "post",
      explanation: "app.post = POST route."
    },
    { id: "fill_l18_form_eee_001", topicId: "topic_express", conceptKey: "lesson_18::form", level: 5,
      code: "// Parse form-encoded body\napp.use(express.____({ extended: true }));",
      answer: "urlencoded",
      explanation: "urlencoded parses form data."
    },
    { id: "fill_l18_validation_eee_001", topicId: "topic_express", conceptKey: "lesson_18::validation", level: 6,
      code: "// Zod validation\nimport { z } from 'zod';\nconst schema = z.____({ email: z.string().email() });",
      answer: "object",
      explanation: "z.object for object schema."
    },
    { id: "fill_l18_username_eee_001", topicId: "topic_security", conceptKey: "lesson_18::username", level: 5,
      code: "// Validate username pattern\nconst pattern = /^[a-zA-Z0-9_]{3,30}$/;\nif (!pattern.____(username)) throw new Error('Invalid');",
      answer: "test",
      explanation: "regex.test returns boolean."
    },
    { id: "fill_l18_email_eee_001", topicId: "topic_security", conceptKey: "lesson_18::email", level: 5,
      code: "// Email validation\nconst valid = z.string().____().safeParse(input).success;",
      answer: "email",
      explanation: "z.string().email() validates email format."
    },
    { id: "fill_l18_password_eee_001", topicId: "topic_security", conceptKey: "lesson_18::password", level: 6,
      code: "// Hash password\nimport bcrypt from 'bcrypt';\nconst hash = await bcrypt.____(plainPwd, 12);",
      answer: "hash",
      explanation: "bcrypt.hash with cost factor 12."
    },
    { id: "fill_l18_storage_eee_001", topicId: "topic_express", conceptKey: "lesson_18::server-side storage", level: 6,
      code: "// Store in DB\nawait User.____({ name: req.body.name, email: req.body.email });",
      answer: "create",
      explanation: "Mongoose Model.create."
    },
    // lesson_design_systems fills (12 gaps)
    { id: "fill_ds_shadcn_eee_001", topicId: "topic_design", conceptKey: "lesson_design_systems::shadcn/UI", level: 5,
      code: "# Add shadcn component\nnpx shadcn ____ Button",
      answer: "add",
      explanation: "npx shadcn add COMPONENT."
    },
    { id: "fill_ds_radix_eee_001", topicId: "topic_design", conceptKey: "lesson_design_systems::Radix primitives", level: 7,
      code: "// Radix Dialog\nimport * as Dialog from '@radix-____/react-dialog';",
      answer: "ui",
      explanation: "@radix-ui/react-* packages."
    },
    { id: "fill_ds_cn_eee_001", topicId: "topic_design", conceptKey: "lesson_design_systems::cn helper", level: 7,
      code: "// Combine Tailwind classes\nimport { cn } from '@/lib/utils';\n<div className={____('px-4 py-2', isPrimary && 'bg-blue-500')}/>",
      answer: "cn",
      explanation: "cn merges + dedupes."
    }
  ]
};
