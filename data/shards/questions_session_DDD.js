// Sprint 2 batch DDD - Final gap closing batch
window.QUESTIONS_SHARD_DDD = {
  mc: [
    // lesson_design_systems remaining
    { id: "mc_ds_cn_ddd_001", topicId: "topic_design", conceptKey: "lesson_design_systems::cn helper", level: 7,
      question: "cn implementation?",
      options: ["import { clsx } from 'clsx'; import { twMerge } from 'tailwind-merge'; export function cn(...inputs) { return twMerge(clsx(inputs)); }","Just join with spaces","String concatenation only","Random helper"],
      correctIndex: 0,
      explanation: "Standard shadcn/ui implementation.",
      optionFeedback: ["✅ נכון.","❌ לא מטפל ב-Tailwind.","❌ unrelated.","❌ דטרמיניסטי."]
    },
    { id: "mc_ds_cva_ddd_001", topicId: "topic_design", conceptKey: "lesson_design_systems::cva", level: 8,
      question: "cva variants definition?",
      options: ["cva('base-class', { variants: { size: { sm: '...', lg: '...' } }, defaultVariants: { size: 'sm' } })","Inline ternary","CSS only","Random"],
      correctIndex: 0,
      explanation: "Type-safe variant API. compoundVariants for combinations.",
      optionFeedback: ["✅ נכון.","❌ less type-safe.","❌ harder maintain.","❌ דטרמיניסטי."]
    },
    { id: "mc_ds_aschild_ddd_001", topicId: "topic_design", conceptKey: "lesson_design_systems::asChild slot", level: 8,
      question: "asChild use cases?",
      options: ["Button-as-Link, DropdownMenuItem-as-NavigationLink, semantic flexibility — composes elements","Style only","No use","Forms"],
      correctIndex: 0,
      explanation: "Avoids wrapper bloat, preserves semantics.",
      optionFeedback: ["✅ נכון.","❌ deeper.","❌ valuable.","❌ wider."]
    },
    { id: "mc_ds_form_field_ddd_001", topicId: "topic_design", conceptKey: "lesson_design_systems::form field composition", level: 8,
      question: "FormField purpose?",
      options: ["Connects react-hook-form's controller לrender props. provides field state to children. error handling integrated","Manual","No integration","Class"],
      correctIndex: 0,
      explanation: "Layered: FormField > FormItem > FormLabel + FormControl + FormMessage.",
      optionFeedback: ["✅ נכון.","❌ heavy boilerplate.","❌ critical.","❌ functional."]
    },
    { id: "mc_ds_theme_ddd_001", topicId: "topic_design", conceptKey: "lesson_design_systems::theme tokens", level: 8,
      question: "Dark mode token swap?",
      options: [":root { --bg: white } .dark { --bg: black }. add 'dark' class to <html>. CSS var(--bg) automatically updates","JS rerender","Inline style","Manual"],
      correctIndex: 0,
      explanation: "next-themes manages class. zero-flash hydration.",
      optionFeedback: ["✅ נכון.","❌ inefficient.","❌ doesn't scale.","❌ painful."]
    },
    { id: "mc_ds_registry_ddd_001", topicId: "topic_design", conceptKey: "lesson_design_systems::component registry", level: 8,
      question: "Custom registry?",
      options: ["Self-host registry.json + components. CLI: npx shadcn add @custom/Button. enterprise teams use","Public only","Built-in","Forbidden"],
      correctIndex: 0,
      explanation: "shadcn supports custom registries. v2.0 introduced.",
      optionFeedback: ["✅ נכון.","❌ self-hosted.","❌ external.","❌ supported."]
    },
    { id: "mc_ds_testing_ddd_001", topicId: "topic_design", conceptKey: "lesson_design_systems::design system testing", level: 8,
      question: "Visual regression testing?",
      options: ["Snapshot images of Storybook stories. compare to baseline. detect unintended visual changes","Manual","Code review","Tests"],
      correctIndex: 0,
      explanation: "Chromatic, Percy, Playwright snapshot.",
      optionFeedback: ["✅ נכון.","❌ scales badly.","❌ misses visual.","❌ complementary."]
    },
    // lesson_19 remaining
    { id: "mc_l19_promise_ddd_001", topicId: "topic_js", conceptKey: "lesson_19::promise", level: 6,
      question: "Promise states?",
      options: ["pending → fulfilled or rejected. once settled, immutable. .then chains create new Promises","Mutable","Sync","Boolean"],
      correctIndex: 0,
      explanation: "Promise immutability is foundation.",
      optionFeedback: ["✅ נכון.","❌ אסור change.","❌ async by definition.","❌ wider."]
    },
    { id: "mc_l19_fetch_ddd_001", topicId: "topic_js", conceptKey: "lesson_19::fetch", level: 6,
      question: "fetch quirks?",
      options: ["Doesn't reject on 4xx/5xx (only network errors). check r.ok or r.status. cookies need credentials option","Auto-rejects 4xx","Auto-cookies","XMLHttpRequest"],
      correctIndex: 0,
      explanation: "Common surprise. axios behaves differently.",
      optionFeedback: ["✅ נכון.","❌ הפוך.","❌ explicit.","❌ different API."]
    },
    { id: "mc_l19_event_loop_ddd_001", topicId: "topic_js", conceptKey: "lesson_19::event loop", level: 8,
      question: "Event loop layers?",
      options: ["Call stack → microtasks (Promise.then, queueMicrotask) → render → macrotasks (setTimeout, I/O). per tick","Single queue","Random","FIFO global"],
      correctIndex: 0,
      explanation: "Browser-specific. Node has slight differences (immediate, nextTick).",
      optionFeedback: ["✅ נכון.","❌ multiple.","❌ דטרמיניסטי.","❌ priorities matter."]
    },
    // lesson_22 remaining
    { id: "mc_l22_state_ddd_001", topicId: "topic_react", conceptKey: "lesson_22::state", level: 7,
      question: "Derived state anti-pattern?",
      options: ["Storing computed values ב-state — duplicates source of truth. compute in render or useMemo","Common","Required","Performance"],
      correctIndex: 0,
      explanation: "Single source of truth. derived = computed.",
      optionFeedback: ["✅ נכון.","❌ avoid.","❌ never.","❌ usually slower."]
    },
    // lesson_auth_security
    { id: "mc_auth_session_ddd_001", topicId: "topic_auth", conceptKey: "lesson_auth_security::session", level: 7,
      question: "Session vs JWT?",
      options: ["Session: server stores state, cookie holds session ID. JWT: stateless, all info ב-token. trade-offs: revoke vs scale","JWT always","Session always","זהים"],
      correctIndex: 0,
      explanation: "Session = easy revoke, server state. JWT = scaling, but revocation hard.",
      optionFeedback: ["✅ נכון.","❌ overgeneralized.","❌ overgeneralized.","❌ שונים."]
    },
    { id: "mc_auth_cookie_ddd_001", topicId: "topic_auth", conceptKey: "lesson_auth_security::cookie", level: 7,
      question: "Cookie security flags?",
      options: ["Secure (HTTPS only), HttpOnly (no JS access), SameSite (strict/lax/none), Domain, Path, Max-Age","No flags","Default","Plaintext"],
      correctIndex: 0,
      explanation: "All recommended for auth cookies.",
      optionFeedback: ["✅ נכון.","❌ multiple.","❌ insecure default.","❌ by default."]
    },
    { id: "mc_auth_secure_ddd_001", topicId: "topic_auth", conceptKey: "lesson_auth_security::secure cookie", level: 7,
      question: "Secure cookie example?",
      options: ["Set-Cookie: token=abc; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600","Plain","Just name","No flags"],
      correctIndex: 0,
      explanation: "Auth cookies need all 4 flags.",
      optionFeedback: ["✅ נכון.","❌ insecure.","❌ insecure.","❌ insecure."]
    },
    { id: "mc_auth_access_token_ddd_001", topicId: "topic_auth", conceptKey: "lesson_auth_security::access token", level: 7,
      question: "Access token lifetime?",
      options: ["Short (15-60 min). short → refresh token rotates. limits damage if leaked","Forever","Random","One-time"],
      correctIndex: 0,
      explanation: "Defense in depth. refresh token longer.",
      optionFeedback: ["✅ נכון.","❌ insecure.","❌ דטרמיניסטי.","❌ inflexible."]
    },
    { id: "mc_auth_refresh_token_ddd_001", topicId: "topic_auth", conceptKey: "lesson_auth_security::refresh token", level: 8,
      question: "Refresh token rotation?",
      options: ["Each refresh → new refresh token, invalidate old. detects token theft (reuse triggers logout)","Single forever","No rotation","Plain"],
      correctIndex: 0,
      explanation: "Auth0/Okta default. better than long-lived RT.",
      optionFeedback: ["✅ נכון.","❌ less secure.","❌ less secure.","❌ unsafe."]
    },
    { id: "mc_auth_provider_auth_ddd_001", topicId: "topic_auth", conceptKey: "lesson_auth_security::provider auth", level: 6,
      question: "Provider auth use case?",
      options: ["OAuth login dargim Google/GitHub/etc. user already has account. better UX, less password fatigue","Manual","Custom","No third-party"],
      correctIndex: 0,
      explanation: "NextAuth.js handles. Supabase Auth too.",
      optionFeedback: ["✅ נכון.","❌ painful.","❌ optional.","❌ common pattern."]
    },
    { id: "mc_auth_xss_boundary_ddd_001", topicId: "topic_auth", conceptKey: "lesson_auth_security::XSS boundary", level: 8,
      question: "XSS prevention layers?",
      options: ["Input validation, output escaping, CSP, framework defaults (React escapes), HttpOnly cookies, Subresource Integrity","One layer","Trust input","Manual"],
      correctIndex: 0,
      explanation: "Defense in depth. each layer catches what others miss.",
      optionFeedback: ["✅ נכון.","❌ critical.","❌ never.","❌ scales badly."]
    },
    // lesson_24 remaining
    { id: "mc_l24_useEffect_ddd_001", topicId: "topic_react", conceptKey: "lesson_24::useEffect", level: 8,
      question: "useEffect with async?",
      options: ["Wrap async inside: useEffect(() => { (async () => { ... })(); }, []). useEffect itself non-async","async useEffect","Throws","Sync only"],
      correctIndex: 0,
      explanation: "useEffect must return cleanup or undefined, not Promise.",
      optionFeedback: ["✅ נכון.","❌ React doesn't support.","❌ subtle.","❌ async needed."]
    },
    { id: "mc_l24_dep_array_ddd_001", topicId: "topic_react", conceptKey: "lesson_24::dependency array", level: 8,
      question: "Reference type deps?",
      options: ["Object/array/function deps cause re-run if reference changes — use useMemo/useCallback for stability","Stable always","Never recreate","Random"],
      correctIndex: 0,
      explanation: "{a:1} === {a:1} → false. memo solves.",
      optionFeedback: ["✅ נכון.","❌ recreate by default.","❌ depends.","❌ דטרמיניסטי."]
    },
    { id: "mc_l24_state_update_ddd_001", topicId: "topic_react", conceptKey: "lesson_24::state update", level: 7,
      question: "State updates async?",
      options: ["Updates queued, applied at next render. consecutive setStates batched (R18 auto-batch). functional updater safe","Sync","Throws","Random"],
      correctIndex: 0,
      explanation: "Auto-batching ב-React 18 in async too.",
      optionFeedback: ["✅ נכון.","❌ async.","❌ valid.","❌ דטרמיניסטי."]
    },
    { id: "mc_l24_memoization_ddd_001", topicId: "topic_react", conceptKey: "lesson_24::memoization", level: 7,
      question: "Memoization in React?",
      options: ["React.memo (component), useMemo (value), useCallback (function). all bypass work if deps stable","Class only","Always","Never"],
      correctIndex: 0,
      explanation: "Trade-off: cache memory + comparison cost.",
      optionFeedback: ["✅ נכון.","❌ functional.","❌ overuse.","❌ קיים שימוש."]
    },
    { id: "mc_l24_expensive_ddd_001", topicId: "topic_react", conceptKey: "lesson_24::expensive calculation", level: 7,
      question: "When useMemo overhead?",
      options: ["Cheap calc + small deps = useMemo overhead > benefit. profile to verify","Always benefit","Never","Random"],
      correctIndex: 0,
      explanation: "React docs warn against premature useMemo.",
      optionFeedback: ["✅ נכון.","❌ overuse fact.","❌ קיים שימוש.","❌ דטרמיניסטי."]
    },
    // lesson_25 - Tailwind
    { id: "mc_l25_tailwind_ddd_001", topicId: "topic_design", conceptKey: "lesson_25::Tailwind CSS", level: 6,
      question: "Tailwind CSS approach?",
      options: ["Utility-first: tiny single-purpose classes. compose ב-className. JIT compiler scans usage","Components","Inline","BEM"],
      correctIndex: 0,
      explanation: "<div class='flex items-center gap-2 px-4 py-2 bg-blue-500'>.",
      optionFeedback: ["✅ נכון.","❌ different layer.","❌ different.","❌ legacy methodology."]
    },
    { id: "mc_l25_responsive_ddd_001", topicId: "topic_design", conceptKey: "lesson_25::responsive design", level: 7,
      question: "Tailwind responsive?",
      options: ["Mobile-first: 'md:flex' applies from md breakpoint up. sm/md/lg/xl/2xl. customize ב-tailwind.config","Manual media","Class","Random"],
      correctIndex: 0,
      explanation: "Mobile-first reduces overrides.",
      optionFeedback: ["✅ נכון.","❌ Tailwind handles.","❌ specific syntax.","❌ דטרמיניסטי."]
    }
  ],
  fill: [
    // lesson_23 fills
    { id: "fill_l23_link_ddd_001", topicId: "topic_react", conceptKey: "lesson_23::Link", level: 5,
      code: "// React Router Link\nimport { ____ } from 'react-router-dom';\n<Link to=\"/about\">About</Link>",
      answer: "Link",
      explanation: "Link from react-router-dom."
    },
    { id: "fill_l23_routes_ddd_001", topicId: "topic_react", conceptKey: "lesson_23::Routes", level: 5,
      code: "// v6 Routes container\nimport { ____ } from 'react-router-dom';\n<Routes>\n  <Route path=\"/\" element={<Home/>} />\n</Routes>",
      answer: "Routes",
      explanation: "Routes + Route v6."
    },
    { id: "fill_l23_route_ddd_001", topicId: "topic_react", conceptKey: "lesson_23::Route", level: 5,
      code: "// Route element\n<____ path=\"/about\" element={<About />} />",
      answer: "Route",
      explanation: "Route maps URL → element."
    },
    { id: "fill_l23_path_ddd_001", topicId: "topic_react", conceptKey: "lesson_23::Path", level: 5,
      code: "// Match URL\n<Route ____=\"/users/:id\" element={<User/>} />",
      answer: "path",
      explanation: "path prop matches URL pattern."
    },
    { id: "fill_l23_browserrouter_ddd_001", topicId: "topic_react", conceptKey: "lesson_23::BrowserRouter", level: 6,
      code: "// Wrap app with router\nimport { ____ } from 'react-router-dom';\n<BrowserRouter>\n  <App/>\n</BrowserRouter>",
      answer: "BrowserRouter",
      explanation: "BrowserRouter uses History API."
    },
    { id: "fill_l23_navigate_ddd_001", topicId: "topic_react", conceptKey: "lesson_23::useNavigate", level: 6,
      code: "// Programmatic nav\nconst nav = ____();\nnav('/home');",
      answer: "useNavigate",
      explanation: "useNavigate hook for routing."
    },
    { id: "fill_l23_router_ddd_001", topicId: "topic_react", conceptKey: "lesson_23::Router", level: 5,
      code: "// Top-level router\nimport { BrowserRouter as Router } from 'react-router-____';",
      answer: "dom",
      explanation: "react-router-dom = web."
    },
    { id: "fill_l23_url_ddd_001", topicId: "topic_react", conceptKey: "lesson_23::URL", level: 6,
      code: "// Read current URL\nconst location = ____();\nconsole.log(location.pathname);",
      answer: "useLocation",
      explanation: "useLocation = current URL info."
    },
    { id: "fill_l23_element_ddd_001", topicId: "topic_react", conceptKey: "lesson_23::element", level: 5,
      code: "// v6: element prop with JSX\n<Route path=\"/\" ____={<Home />} />",
      answer: "element",
      explanation: "v6 element=, v5 component="
    },
    { id: "fill_l23_to_ddd_001", topicId: "topic_react", conceptKey: "lesson_23::to", level: 5,
      code: "// Link target\n<Link ____=\"/about\">About</Link>",
      answer: "to",
      explanation: "to prop for Link target."
    },
    { id: "fill_l23_dynamic_ddd_001", topicId: "topic_react", conceptKey: "lesson_23::dynamic route", level: 6,
      code: "// Dynamic param\n<Route path=\"/users/:____\" element={<User/>} />",
      answer: "id",
      explanation: ":id matches URL segment."
    },
    { id: "fill_l23_useparams_ddd_001", topicId: "topic_react", conceptKey: "lesson_23::useParams", level: 6,
      code: "// Read URL params\nconst { id } = use____();",
      answer: "Params",
      explanation: "useParams for dynamic segments."
    },
    { id: "fill_l23_context_ddd_001", topicId: "topic_react", conceptKey: "lesson_23::Context API", level: 6,
      code: "// Create context\nconst ThemeContext = ____.createContext('light');",
      answer: "React",
      explanation: "React.createContext."
    },
    { id: "fill_l23_create_context_ddd_001", topicId: "topic_react", conceptKey: "lesson_23::createContext", level: 6,
      code: "// Default value\nconst Ctx = createContext({ theme: '____' });",
      answer: "light",
      explanation: "Default value if no Provider."
    },
    { id: "fill_l23_use_context_ddd_001", topicId: "topic_react", conceptKey: "lesson_23::useContext", level: 6,
      code: "// Consume context\nconst theme = ____(ThemeContext);",
      answer: "useContext",
      explanation: "useContext reads provider value."
    }
  ]
};
