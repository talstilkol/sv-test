// Sprint 2 batch FF - Build tools (Webpack/Vite/Rollup/Babel/ESBuild)
// 50 questions: 35 MC + 15 Fill
window.QUESTIONS_SHARD_FF = {
  mc: [
    { id: "mc_build_vite_ff_001", topicId: "topic_build", conceptKey: "lesson_21::Vite", level: 4,
      question: "מה Vite מציע על Webpack ב-DEV?",
      options: [
        "ESBuild ל-pre-bundle של dependencies + native ESM ב-browser → אין bundle ב-DEV → cold start מיידי",
        "Faster TS compile",
        "Better minify",
        "More plugins"
      ],
      correctIndex: 0,
      explanation: "Vite משדר files ישירות לדפדפן ב-DEV. בנייה רק לפרודקשן עם Rollup. שונה מ-Webpack שמבנדל גם ב-DEV.",
      optionFeedback: [
        "✅ נכון. native ESM dev server.",
        "❌ TS דורש compile בכל מקרה.",
        "❌ minify ב-prod.",
        "❌ Webpack עם יותר plugins."
      ]
    },
    { id: "mc_build_hmr_ff_001", topicId: "topic_build", conceptKey: "lesson_21::Vite", level: 5,
      question: "מה Hot Module Replacement (HMR)?",
      options: [
        "החלפת מודולים מבלי לטעון מחדש את הדף — שמירה על state של ה-app בזמן שינוי קוד",
        "Live reload",
        "Cache reset",
        "Service worker"
      ],
      correctIndex: 0,
      explanation: "HMR שומר state. live reload סתם רענון. עובד טוב ב-React/Vue עם framework integration.",
      optionFeedback: [
        "✅ נכון. state-preserving update.",
        "❌ live reload מאבד state.",
        "❌ אין קשר ל-cache.",
        "❌ SW לא קשור."
      ]
    },
    { id: "mc_build_webpack_ff_001", topicId: "topic_build", conceptKey: "lesson_21::Vite", level: 5,
      question: "מה הtarget של webpack.config.js?",
      options: [
        "ה-environment לpipline: web (default), node, electron-renderer — קובע איך browser globals/Node modules נטענים",
        "URL",
        "ES version",
        "Plugins"
      ],
      correctIndex: 0,
      explanation: "target:'node' לא מבנדל fs/path (externals). target:'web' לדפדפן.",
      optionFeedback: [
        "✅ נכון. environment.",
        "❌ URL לא קשור.",
        "❌ ES version זה שדה אחר.",
        "❌ plugins אחרים."
      ]
    },
    { id: "mc_build_loader_ff_001", topicId: "topic_build", conceptKey: "lesson_21::Vite", level: 5,
      question: "מה loader ב-Webpack?",
      options: [
        "מבצע transform על קבצים בעת ה-bundle: babel-loader, css-loader, file-loader — שרשרת שמופעלת מימין לשמאל",
        "Plugin",
        "Entry",
        "Output"
      ],
      correctIndex: 0,
      explanation: "use:['style','css','sass'] רץ sass→css→style. plugins פועלים על bundle כולו.",
      optionFeedback: [
        "✅ נכון. file transform.",
        "❌ plugin שונה.",
        "❌ entry = starting point.",
        "❌ output = result."
      ]
    },
    { id: "mc_build_plugin_ff_001", topicId: "topic_build", conceptKey: "lesson_21::Vite", level: 6,
      question: "מה ההבדל בין loader ל-plugin ב-Webpack?",
      options: [
        "Loader עובד על קובץ בודד; plugin פועל על כל ה-bundle/build process — visualizer, html generation, env injection",
        "זהים",
        "Loader רק TS",
        "Plugin רק CSS"
      ],
      correctIndex: 0,
      explanation: "HtmlWebpackPlugin מייצר index.html. DefinePlugin מזריק env vars. רחבי-טווח.",
      optionFeedback: [
        "✅ נכון. file vs build-wide.",
        "❌ שונים.",
        "❌ loader גם ל-CSS/JS/...",
        "❌ plugin רחב."
      ]
    },
    { id: "mc_build_babel_ff_001", topicId: "topic_build", conceptKey: "lesson_21::Vite", level: 5,
      question: "מה Babel עושה?",
      options: [
        "Transpiler — ממיר JS מודרני ל-ES5/ES6 ישן לתאימות בדפדפנים. מטפל גם ב-JSX/TS",
        "Bundler",
        "Minifier",
        "Linter"
      ],
      correctIndex: 0,
      explanation: "babel-preset-env לפי browserslist. presets: react, typescript, env.",
      optionFeedback: [
        "✅ נכון. transpiler.",
        "❌ Webpack/Rollup הם bundlers.",
        "❌ Terser/UglifyJS minifier.",
        "❌ ESLint linter."
      ]
    },
    { id: "mc_build_esbuild_ff_001", topicId: "topic_build", conceptKey: "lesson_21::Vite", level: 6,
      question: "למה ESBuild מהיר משמעותית מ-Babel/Webpack?",
      options: [
        "כתוב ב-Go עם concurrency עמוקה, parsing עצמאי, אין AST overhead. מהיר פי 10-100",
        "Cache",
        "Smaller features",
        "C++ code"
      ],
      correctIndex: 0,
      explanation: "ESBuild parser מהיר במיוחד. Vite משתמש ב-ESBuild ל-pre-bundle, ב-Rollup לproduction.",
      optionFeedback: [
        "✅ נכון. Go-based.",
        "❌ caching לא ההסבר.",
        "❌ שלמות פיצ'רים דומה.",
        "❌ Go לא C++."
      ]
    },
    { id: "mc_build_rollup_ff_001", topicId: "topic_build", conceptKey: "lesson_21::Vite", level: 6,
      question: "מתי Rollup עדיף על Webpack?",
      options: [
        "ספריות (libraries) עם ESM פלט נקי, tree shaking יעיל, multi-format output (cjs/esm/umd)",
        "Apps גדולים",
        "Dev server",
        "HMR"
      ],
      correctIndex: 0,
      explanation: "Rollup ל-libraries (Vue, Svelte, React build). Webpack ל-apps עם code splitting מורכב.",
      optionFeedback: [
        "✅ נכון. library-friendly.",
        "❌ Webpack/Vite לאפליקציות.",
        "❌ Rollup חסר ב-DX.",
        "❌ HMR ב-Vite טוב יותר."
      ]
    },
    { id: "mc_build_tsc_ff_001", topicId: "topic_build", conceptKey: "lesson_25::TypeScript", level: 5,
      question: "מה tsc עושה?",
      options: [
        "TypeScript compiler — מבצע type-check + emits JS. tsconfig.json קובע target/module/strict",
        "Bundler",
        "Linter",
        "Formatter"
      ],
      correctIndex: 0,
      explanation: "tsc --noEmit ל-typecheck בלבד. typecheck באופן נפרד מ-bundling היום.",
      optionFeedback: [
        "✅ נכון. compiler+typecheck.",
        "❌ tsc לא מבנדל.",
        "❌ ESLint לbgeבר.",
        "❌ Prettier formatter."
      ]
    },
    { id: "mc_build_typecheck_only_ff_001", topicId: "topic_build", conceptKey: "lesson_25::TypeScript", level: 6,
      question: "למה ב-Vite יש 'tsc --noEmit' לצד build?",
      options: [
        "Vite משתמש ב-ESBuild שלא עושה typecheck — רק transpile. tsc --noEmit מבצע typecheck נפרד ב-CI",
        "מהירות",
        "Source maps",
        "ESM output"
      ],
      correctIndex: 0,
      explanation: "ESBuild מסיר types בלבד. errors של TS עוברים בלי אזהרה. tsc --noEmit אכוף ב-CI.",
      optionFeedback: [
        "✅ נכון. ESBuild ≠ typechecker.",
        "❌ זה הסיבה אבל לא תשובה ישירה.",
        "❌ source maps נפרדים.",
        "❌ ESM שונה."
      ]
    },
    { id: "mc_build_sourcemap_ff_001", topicId: "topic_build", conceptKey: "lesson_21::Vite", level: 6,
      question: "מה source map?",
      options: [
        "מיפוי בין minified bundle ל-source מקורי — DevTools/Sentry יכולים להציג stack מקורי בקריאה לbug",
        "Backup",
        "Cache",
        "Comments"
      ],
      correctIndex: 0,
      explanation: ".map files עם VLQ encoding. inline או חיצוניים. eval-source-map ל-DEV.",
      optionFeedback: [
        "✅ נכון. min ↔ source.",
        "❌ אין קשר ל-backup.",
        "❌ cache שונה.",
        "❌ זה structured data."
      ]
    },
    { id: "mc_build_minify_ff_001", topicId: "topic_build", conceptKey: "lesson_21::Vite", level: 5,
      question: "מה minification עושה?",
      options: [
        "מסיר whitespace/comments + מקצר variables (a→a) + dead-code elim — חוסך bytes ב-bundle",
        "Compression",
        "Encryption",
        "Obfuscation בלבד"
      ],
      correctIndex: 0,
      explanation: "Terser/SWC. compression נפרד (gzip/brotli). minify לפני compression.",
      optionFeedback: [
        "✅ נכון. multi-step shrink.",
        "❌ compression ברמת byte stream.",
        "❌ אין קשר.",
        "❌ obfuscation שונה (security)."
      ]
    },
    { id: "mc_build_polyfill_ff_001", topicId: "topic_build", conceptKey: "lesson_21::Vite", level: 6,
      question: "מה polyfill?",
      options: [
        "JS שמחקה API חדש בדפדפנים ישנים — fetch polyfill, Promise polyfill, Object.assign וכו",
        "Type definition",
        "Import",
        "CSS reset"
      ],
      correctIndex: 0,
      explanation: "core-js מספק polyfills. babel-preset-env מחליף לפי browserslist.",
      optionFeedback: [
        "✅ נכון. backward-compat.",
        "❌ types שונים.",
        "❌ import שונה.",
        "❌ CSS reset שונה."
      ]
    },
    { id: "mc_build_browserslist_ff_001", topicId: "topic_build", conceptKey: "lesson_21::Vite", level: 6,
      question: "מה browserslist?",
      options: [
        "קונפיג שרשום באוסף כלים (Babel/PostCSS/ESLint) — קובע אילו דפדפנים נתמכים, משפיע על polyfills/transforms",
        "Browser DB",
        "User agents",
        "List of URLs"
      ],
      correctIndex: 0,
      explanation: "package.json:browserslist [\"> 1%\", \"last 2 versions\"]. כל הכלים קוראים אותו.",
      optionFeedback: [
        "✅ נכון. shared config.",
        "❌ זה config על caniuse data.",
        "❌ UA strings שונה.",
        "❌ לא URL."
      ]
    },
    { id: "mc_build_postcss_ff_001", topicId: "topic_build", conceptKey: "lesson_21::Vite", level: 6,
      question: "מה PostCSS?",
      options: [
        "כלי שמעבד CSS עם plugins: autoprefixer, nesting, custom properties — דומה ל-Babel ל-CSS",
        "CSS framework",
        "Preprocessor (sass)",
        "Minifier בלבד"
      ],
      correctIndex: 0,
      explanation: "PostCSS לא preprocessor — זה pipeline. Tailwind, autoprefixer, postcss-nested.",
      optionFeedback: [
        "✅ נכון. plugin ecosystem.",
        "❌ Tailwind framework.",
        "❌ Sass/Less = preprocessors.",
        "❌ minify הוא רק plugin אחד."
      ]
    },
    { id: "mc_build_autoprefixer_ff_001", topicId: "topic_build", conceptKey: "lesson_21::Vite", level: 5,
      question: "מה autoprefixer?",
      options: [
        "Plugin של PostCSS שמוסיף vendor prefixes (-webkit, -moz) אוטומטית לפי browserslist",
        "Minify",
        "Compile",
        "Lint"
      ],
      correctIndex: 0,
      explanation: "transform: scale → -webkit-transform: scale; transform: scale. נפוץ בכל build setup.",
      optionFeedback: [
        "✅ נכון. vendor prefix automation.",
        "❌ minify שונה.",
        "❌ compile שונה.",
        "❌ stylelint = linter."
      ]
    },
    { id: "mc_build_alias_ff_001", topicId: "topic_build", conceptKey: "lesson_21::Vite", level: 6,
      question: "מה path alias ב-Vite/Webpack?",
      options: [
        "מיפוי תחילית import לתיקייה: '@/components' = './src/components' — שיפור readability ומניעת ../../",
        "ESM only",
        "Symlink",
        "Webpack only"
      ],
      correctIndex: 0,
      explanation: "vite.config: resolve.alias. Webpack: resolve.alias. tsconfig.paths נפרד ל-TS resolution.",
      optionFeedback: [
        "✅ נכון. import path mapping.",
        "❌ עובד גם CJS.",
        "❌ symlink ברמת fs.",
        "❌ Vite גם תומך."
      ]
    },
    { id: "mc_build_define_ff_001", topicId: "topic_build", conceptKey: "lesson_21::Vite", level: 7,
      question: "מה define ב-Vite/DefinePlugin?",
      options: [
        "החלפת text-level של globals בזמן build: define:{VERSION:'1.0'} מזריק string לbundle",
        "Runtime const",
        "Type alias",
        "Macro"
      ],
      correctIndex: 0,
      explanation: "process.env.NODE_ENV → 'production' לפני tree-shake → if(process.env...) נמחק.",
      optionFeedback: [
        "✅ נכון. compile-time replacement.",
        "❌ זה compile-time.",
        "❌ types שונים.",
        "❌ אין macros ב-JS."
      ]
    },
    { id: "mc_build_publicdir_ff_001", topicId: "topic_build", conceptKey: "lesson_21::Vite", level: 5,
      question: "מה התיקייה public ב-Vite?",
      options: [
        "קבצים שמוגשים as-is מהשורש בלי processing (favicon, robots.txt, og-image) — נכנסים ל-dist בלי שינוי",
        "Source code",
        "Build output",
        "node_modules"
      ],
      correctIndex: 0,
      explanation: "/public/favicon.ico → /favicon.ico ב-runtime. עוקף את ה-bundler.",
      optionFeedback: [
        "✅ נכון. static assets.",
        "❌ /src לקוד.",
        "❌ build output ב-dist.",
        "❌ deps נפרד."
      ]
    },
    { id: "mc_build_chunks_ff_001", topicId: "topic_build", conceptKey: "lesson_21::Vite", level: 7,
      question: "מה manualChunks ב-Rollup/Vite?",
      options: [
        "אסטרטגיית פיצול ידנית של vendor code לcache ארוך — react-libs נפרד מ-app code",
        "Auto split",
        "Random",
        "Encryption"
      ],
      correctIndex: 0,
      explanation: "rollupOptions.output.manualChunks: {vendor:['react','react-dom']} — react.js יציב, app משתנה.",
      optionFeedback: [
        "✅ נכון. cache strategy.",
        "❌ ידני.",
        "❌ דטרמיניסטי.",
        "❌ אין קשר."
      ]
    },
    { id: "mc_build_lighthouse_ff_001", topicId: "topic_build", conceptKey: "lesson_21::Vite", level: 7,
      question: "מה Lighthouse בודק?",
      options: [
        "Performance, Accessibility, Best Practices, SEO, PWA — score 0-100 לכל קטגוריה. בסיס ל-Web Vitals tracking",
        "Type errors",
        "Test coverage",
        "Bundle size"
      ],
      correctIndex: 0,
      explanation: "Chrome DevTools → Lighthouse. CI: lighthouse-ci. תיעוד מקיף אך לא הכל מציאותי.",
      optionFeedback: [
        "✅ נכון. multi-axis audit.",
        "❌ TS שונה.",
        "❌ נפרד.",
        "❌ size רק חלק."
      ]
    },
    { id: "mc_build_test_runner_ff_001", topicId: "topic_build", conceptKey: "lesson_25::TypeScript", level: 5,
      question: "מה ההבדל בין Vitest ל-Jest?",
      options: [
        "Vitest משתמש ב-Vite tools — TS/ESM out-of-the-box, מהיר יותר. Jest דורש ts-jest/babel ויותר config",
        "זהים",
        "Jest מהיר",
        "Vitest רק לnode"
      ],
      correctIndex: 0,
      explanation: "Vitest API דומה ל-Jest (describe/it/expect) אך מהיר עם native ESM. הגירה קלה.",
      optionFeedback: [
        "✅ נכון. modern stack.",
        "❌ הבדלי DX.",
        "❌ Vitest מהיר יותר.",
        "❌ עובד גם בdoubdom."
      ]
    },
    { id: "mc_build_eslint_ff_001", topicId: "topic_build", conceptKey: "lesson_21::Vite", level: 6,
      question: "מה ESLint עושה?",
      options: [
        "Static analysis של JS/TS — מזהה buggy patterns, code smells, style violations. plugins לreact/ts/import",
        "Format",
        "Compile",
        "Test"
      ],
      correctIndex: 0,
      explanation: "Prettier formats. ESLint catches bugs (unused vars, no-undef, react-hooks/exhaustive-deps).",
      optionFeedback: [
        "✅ נכון. linter.",
        "❌ Prettier format.",
        "❌ tsc compile.",
        "❌ Jest/Vitest test."
      ]
    },
    { id: "mc_build_prettier_ff_001", topicId: "topic_build", conceptKey: "lesson_21::Vite", level: 5,
      question: "מה ההבדל בין ESLint ל-Prettier?",
      options: [
        "ESLint = code quality (bugs/anti-patterns). Prettier = formatting (whitespace/quotes/semis). שונים",
        "זהים",
        "Prettier מחליף ESLint",
        "ESLint רק TS"
      ],
      correctIndex: 0,
      explanation: "eslint-config-prettier מסיר rules של פורמט מ-ESLint כדי לא להתנגש.",
      optionFeedback: [
        "✅ נכון. complementary tools.",
        "❌ שונים.",
        "❌ לא תחליף.",
        "❌ ESLint הכל."
      ]
    },
    { id: "mc_build_husky_ff_001", topicId: "topic_build", conceptKey: "lesson_21::Vite", level: 7,
      question: "מה Husky ו-pre-commit hook?",
      options: [
        "מתקין git hooks אוטומטית — pre-commit מריץ lint/format/test לפני commit, חוסם commit לא תקין",
        "Linter",
        "Bundler",
        "CI"
      ],
      correctIndex: 0,
      explanation: "Husky + lint-staged: רק קבצים שעוברים staging מבעבים lint. ב-monorepo: ימנע commits 'broken'.",
      optionFeedback: [
        "✅ נכון. local enforcement.",
        "❌ ESLint linter עצמו.",
        "❌ אין קשר.",
        "❌ CI שונה."
      ]
    },
    { id: "mc_build_lint_staged_ff_001", topicId: "topic_build", conceptKey: "lesson_21::Vite", level: 7,
      question: "מה lint-staged עושה?",
      options: [
        "מריץ lint/test/format רק על קבצים שב-staging — לא על כל הפרויקט. שילוב עם Husky",
        "Stages files",
        "Lints all",
        "Reverts"
      ],
      correctIndex: 0,
      explanation: "package.json: lint-staged: { '*.ts': 'eslint --fix' }. רץ רק על staged.",
      optionFeedback: [
        "✅ נכון. partial linting.",
        "❌ git stage שונה.",
        "❌ זה החיסכון.",
        "❌ revert שונה."
      ]
    },
    { id: "mc_build_monorepo_ff_001", topicId: "topic_build", conceptKey: "lesson_21::Vite", level: 8,
      question: "מה monorepo?",
      options: [
        "מספר חבילות (apps/libs) ב-repo אחד עם shared deps. Tools: pnpm workspaces, Turborepo, Nx, Lerna",
        "Single app",
        "Microservices",
        "Mono-app"
      ],
      correctIndex: 0,
      explanation: "Turborepo: cache build, parallel tasks, dependency graph. Used by Vercel/Next.js.",
      optionFeedback: [
        "✅ נכון. multi-package single repo.",
        "❌ זה הפוך.",
        "❌ microservices ב-deploy.",
        "❌ מונח לא קיים."
      ]
    },
    { id: "mc_build_pnpm_ff_001", topicId: "topic_build", conceptKey: "lesson_21::Vite", level: 7,
      question: "למה pnpm נחשב מהיר יותר מ-npm?",
      options: [
        "Content-addressable storage — חבילות נשמרות פעם אחת ב-disk עם hard links לכל פרויקט. חוסך זמן+מקום",
        "C++ binary",
        "Caching בלבד",
        "Less features"
      ],
      correctIndex: 0,
      explanation: "pnpm install: hard link ל-store. node_modules nested אך לא duplicated. install מהיר משמעותית.",
      optionFeedback: [
        "✅ נכון. CAS storage.",
        "❌ Node.js code.",
        "❌ caching זה רק חלק.",
        "❌ פיצ'רים דומים."
      ]
    },
    { id: "mc_build_yarn_ff_001", topicId: "topic_build", conceptKey: "lesson_21::Vite", level: 6,
      question: "מה Yarn berry (v2+) שונה?",
      options: [
        "Plug'n'Play (PnP) — אין node_modules; resolution מ-.pnp.cjs. מהיר אך לא תאים לכל ספריה",
        "Same as v1",
        "Copy of npm",
        "TypeScript only"
      ],
      correctIndex: 0,
      explanation: "PnP מבצע resolution ב-runtime. תאימות לקויה עם packages שמשתמשות ב-fs.readdirSync('node_modules').",
      optionFeedback: [
        "✅ נכון. PnP innovation.",
        "❌ שינוי דרמטי.",
        "❌ Yarn קודם.",
        "❌ לא מוגבל."
      ]
    },
    { id: "mc_build_npx_ff_001", topicId: "topic_build", conceptKey: "lesson_21::Vite", level: 4,
      question: "מה npx?",
      options: [
        "מריץ פקודות של חבילה בלי להתקין גלובלית: npx create-react-app — מוריד ל-cache ומריץ",
        "Editor",
        "Cron",
        "Same as npm"
      ],
      correctIndex: 0,
      explanation: "npx vite, npx eslint . — מריץ ללא install. נוח ל-scaffolding וכלי one-off.",
      optionFeedback: [
        "✅ נכון. one-off runner.",
        "❌ שונה.",
        "❌ אין scheduling.",
        "❌ npm = package manager."
      ]
    },
    { id: "mc_build_engines_ff_001", topicId: "topic_build", conceptKey: "lesson_21::Vite", level: 6,
      question: "מה השדה engines ב-package.json?",
      options: [
        "מצהיר על Node/npm version נדרש: \"engines\": {\"node\": \">=20\"} — npm יזהיר אם לא תואם",
        "Build engine",
        "Test engine",
        "DB"
      ],
      correctIndex: 0,
      explanation: "ב-yarn/pnpm יש engineStrict לאכוף. שימושי לתאימות.",
      optionFeedback: [
        "✅ נכון. version requirement.",
        "❌ Webpack/Vite.",
        "❌ Vitest/Jest.",
        "❌ DB unrelated."
      ]
    },
    { id: "mc_build_lockfile_ff_001", topicId: "topic_build", conceptKey: "lesson_21::Vite", level: 5,
      question: "מה הסיבה לcommit ל-lockfile?",
      options: [
        "מבטיח reproducible installs — npm install יחזיר אותן גרסאות מדויקות בכל machine, גם אם semver מאפשר newer",
        "Larger size",
        "Speed",
        "TypeScript"
      ],
      correctIndex: 0,
      explanation: "package.json says ^1.2.3 (אפשר 1.5.0). lockfile מצמיד ל-1.2.3 בכל מקום.",
      optionFeedback: [
        "✅ נכון. install determinism.",
        "❌ סיבה לדאוג, לא לעשות.",
        "❌ npm ci מהיר עם lock.",
        "❌ TS unrelated."
      ]
    },
    { id: "mc_build_npm_audit_ff_001", topicId: "topic_build", conceptKey: "lesson_21::Vite", level: 6,
      question: "מה npm audit עושה?",
      options: [
        "סורק tree של deps כנגד CVE database — מציין vulnerabilities לפי severity (low/moderate/high/critical)",
        "Code review",
        "Performance",
        "Linter"
      ],
      correctIndex: 0,
      explanation: "npm audit fix מנסה auto-update. נפוץ ב-CI עם --audit-level=high.",
      optionFeedback: [
        "✅ נכון. CVE scanner.",
        "❌ אין code review.",
        "❌ אין perf.",
        "❌ ESLint שונה."
      ]
    },
    { id: "mc_build_treeshake_ff_001", topicId: "topic_build", conceptKey: "lesson_21::Vite", level: 7,
      question: "למה lodash-es עדיף על lodash ל-tree shaking?",
      options: [
        "lodash-es הוא ESM עם named exports — bundler יכול להסיר exports שלא בשימוש. lodash CJS לא ניתן ל-shake",
        "מהיר יותר",
        "פחות bugs",
        "TypeScript only"
      ],
      correctIndex: 0,
      explanation: "import { debounce } from 'lodash-es' — רק debounce ב-bundle. import _ from 'lodash' — הכל.",
      optionFeedback: [
        "✅ נכון. ESM enables shake.",
        "❌ דומה ב-runtime.",
        "❌ דומה.",
        "❌ TS unrelated."
      ]
    },
    { id: "mc_build_sideeffects_ff_001", topicId: "topic_build", conceptKey: "lesson_21::Vite", level: 8,
      question: "מה sideEffects ב-package.json?",
      options: [
        "מציין אילו modules יש להם side effects (CSS imports, polyfills) — bundler לא ימחק אותם גם אם 'unused'",
        "Prevents bugs",
        "Test runner",
        "TypeScript flag"
      ],
      correctIndex: 0,
      explanation: "sideEffects: false → tree shake הכל. sideEffects: ['*.css'] → לא תמחוק css imports.",
      optionFeedback: [
        "✅ נכון. tree-shake hint.",
        "❌ זה לא לbugs.",
        "❌ test לא קשור.",
        "❌ זה npm field."
      ]
    }
  ],
  fill: [
    { id: "fill_build_npm_init_ff_001", topicId: "topic_build", conceptKey: "lesson_21::Vite", level: 4,
      code: "# Initialize new Vite project\nnpm create ____@latest my-app",
      answer: "vite",
      explanation: "npm create vite@latest = scaffold Vite project."
    },
    { id: "fill_build_run_dev_ff_001", topicId: "topic_build", conceptKey: "lesson_21::Vite", level: 4,
      code: "# Start dev server with HMR\nnpm run ____",
      answer: "dev",
      explanation: "npm run dev = vite dev server."
    },
    { id: "fill_build_build_ff_001", topicId: "topic_build", conceptKey: "lesson_21::Vite", level: 4,
      code: "# Production build\nnpm run ____\n# outputs dist/",
      answer: "build",
      explanation: "npm run build = production bundle."
    },
    { id: "fill_build_install_ff_001", topicId: "topic_build", conceptKey: "lesson_21::Vite", level: 4,
      code: "# Install dependencies (deterministic)\nnpm ____",
      answer: "ci",
      explanation: "npm ci = use lockfile, mahir CI build."
    },
    { id: "fill_build_npx_ff_001", topicId: "topic_build", conceptKey: "lesson_21::Vite", level: 5,
      code: "# Run package without install\n____ eslint . --fix",
      answer: "npx",
      explanation: "npx maritz package mi-cache."
    },
    { id: "fill_build_alias_ff_001", topicId: "topic_build", conceptKey: "lesson_21::Vite", level: 6,
      code: "// vite.config.js\nresolve: {\n  ____: {\n    '@': '/src'\n  }\n}",
      answer: "alias",
      explanation: "resolve.alias = path mapping."
    },
    { id: "fill_build_tsc_noemit_ff_001", topicId: "topic_build", conceptKey: "lesson_25::TypeScript", level: 6,
      code: "# Type check without emitting JS\ntsc --____",
      answer: "noEmit",
      explanation: "--noEmit = check only, no .js output."
    },
    { id: "fill_build_lockfile_ff_001", topicId: "topic_build", conceptKey: "lesson_21::Vite", level: 5,
      code: "# npm lockfile name\n____.lock.json   /* npm */\nyarn.____           /* Yarn */\npnpm-____.yaml    /* pnpm */",
      answer: "package",
      explanation: "package-lock.json = npm lockfile."
    },
    { id: "fill_build_define_ff_001", topicId: "topic_build", conceptKey: "lesson_21::Vite", level: 7,
      code: "// vite.config.js — inject build-time const\n____: {\n  __VERSION__: JSON.stringify('1.0')\n}",
      answer: "define",
      explanation: "define = compile-time replacement."
    },
    { id: "fill_build_chunks_ff_001", topicId: "topic_build", conceptKey: "lesson_21::Vite", level: 7,
      code: "// Manual vendor splitting\nrollupOptions: {\n  output: {\n    ____Chunks: {\n      vendor: ['react', 'react-dom']\n    }\n  }\n}",
      answer: "manual",
      explanation: "manualChunks = vendor split."
    },
    { id: "fill_build_engines_ff_001", topicId: "topic_build", conceptKey: "lesson_21::Vite", level: 6,
      code: "// package.json — Node version requirement\n\"____\": {\n  \"node\": \">=20\"\n}",
      answer: "engines",
      explanation: "engines = supported runtimes."
    },
    { id: "fill_build_audit_ff_001", topicId: "topic_build", conceptKey: "lesson_21::Vite", level: 6,
      code: "# Scan for vulnerabilities\nnpm ____ --audit-level=high",
      answer: "audit",
      explanation: "npm audit = CVE scanner."
    },
    { id: "fill_build_lint_ff_001", topicId: "topic_build", conceptKey: "lesson_21::Vite", level: 5,
      code: "# Auto-fix code style issues\nnpx eslint . --____",
      answer: "fix",
      explanation: "eslint --fix = auto-fix violations."
    },
    { id: "fill_build_polyfill_ff_001", topicId: "topic_build", conceptKey: "lesson_21::Vite", level: 6,
      code: "// Polyfill old browsers\nimport 'core-js/stable';\nimport 'regenerator-____/runtime';",
      answer: "runtime",
      explanation: "regenerator-runtime polyfills async/generators."
    },
    { id: "fill_build_browserslist_ff_001", topicId: "topic_build", conceptKey: "lesson_21::Vite", level: 6,
      code: "// package.json\n\"____\": [\n  \"> 1%\",\n  \"last 2 versions\",\n  \"not dead\"\n]",
      answer: "browserslist",
      explanation: "browserslist = target environments."
    }
  ]
};
