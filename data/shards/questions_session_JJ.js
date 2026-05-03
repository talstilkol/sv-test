// Sprint 2 batch JJ - Testing (Vitest/Jest/RTL/Playwright/Cypress)
// 50 questions: 35 MC + 15 Fill
window.QUESTIONS_SHARD_JJ = {
  mc: [
    { id: "mc_test_unit_jj_001", topicId: "topic_test", conceptKey: "lesson_25::TypeScript", level: 5,
      question: "מה unit test בודק?",
      options: [
        "יחידת קוד מבודדת (function/class) — קלט ידוע → output צפוי. ללא DB, רשת, או DOM אמיתי",
        "All app",
        "End-to-end flow",
        "Database integration"
      ],
      correctIndex: 0,
      explanation: "Unit = הקטנה ביותר. integration = שילוב בין units. e2e = המערכת השלמה.",
      optionFeedback: [
        "✅ נכון. isolated unit.",
        "❌ system test.",
        "❌ E2E.",
        "❌ integration."
      ]
    },
    { id: "mc_test_integration_jj_001", topicId: "topic_test", conceptKey: "lesson_25::TypeScript", level: 6,
      question: "מה integration test?",
      options: [
        "בדיקה של אינטגרציה בין מספר רכיבים — controller + service + DB. עדיין לא דרך UI ולא מערך production",
        "Single function",
        "Browser-based",
        "Performance"
      ],
      correctIndex: 0,
      explanation: "supertest על Express + test DB = integration test טיפוסי.",
      optionFeedback: [
        "✅ נכון.",
        "❌ unit שונה.",
        "❌ E2E שונה.",
        "❌ load test שונה."
      ]
    },
    { id: "mc_test_e2e_jj_001", topicId: "topic_test", conceptKey: "lesson_25::TypeScript", level: 6,
      question: "מה E2E test בודק?",
      options: [
        "Flow מלא דרך UI אמיתי — דפדפן, קליקים, פילים, רשת אמיתית/mocked. Playwright/Cypress/Selenium",
        "Single unit",
        "API only",
        "Mock everything"
      ],
      correctIndex: 0,
      explanation: "E2E איטי ושביר — שמור ל-critical paths. unit/integration לכיסוי רחב.",
      optionFeedback: [
        "✅ נכון. UI-driven full flow.",
        "❌ unit שונה.",
        "❌ E2E גם UI.",
        "❌ mock = unit."
      ]
    },
    { id: "mc_test_aaa_jj_001", topicId: "topic_test", conceptKey: "lesson_25::TypeScript", level: 5,
      question: "מה ה-pattern AAA ב-tests?",
      options: [
        "Arrange (setup) → Act (run subject) → Assert (verify). מבנה קריא לכל test",
        "Async-Await-Assert",
        "Add-Anything-Always",
        "Aggregate"
      ],
      correctIndex: 0,
      explanation: "Arrange: הכן data + mocks. Act: קרא לפונקציה. Assert: בדוק תוצאה.",
      optionFeedback: [
        "✅ נכון. test pattern.",
        "❌ אין סטנדרט.",
        "❌ לא ברור.",
        "❌ aggregate שונה."
      ]
    },
    { id: "mc_test_describe_jj_001", topicId: "topic_test", conceptKey: "lesson_25::TypeScript", level: 5,
      question: "מה describe ו-it ב-Vitest/Jest?",
      options: [
        "describe = group רלוונטי. it/test = test יחיד. nested describes לקיבוץ. shared setup דרך beforeAll/beforeEach",
        "Variables",
        "Classes",
        "Functions"
      ],
      correctIndex: 0,
      explanation: "describe('User', () => { it('logs in', () => {...}) }). nesting לארגון לוגי.",
      optionFeedback: [
        "✅ נכון. BDD-ish structure.",
        "❌ לא variables.",
        "❌ describe לא class.",
        "❌ לא רגילות."
      ]
    },
    { id: "mc_test_assertions_jj_001", topicId: "topic_test", conceptKey: "lesson_25::TypeScript", level: 5,
      question: "מה ההבדל בין toBe ל-toEqual ב-Vitest?",
      options: [
        "toBe = Object.is (reference equality). toEqual = deep structural equality. ל-objects/arrays חייב toEqual",
        "זהים",
        "toBe ל-strings",
        "toEqual ל-numbers"
      ],
      correctIndex: 0,
      explanation: "expect({a:1}).toBe({a:1}) → fails (אובייקטים שונים). expect({a:1}).toEqual({a:1}) → passes.",
      optionFeedback: [
        "✅ נכון. value vs reference.",
        "❌ שונים.",
        "❌ עובד ל-primitives שניהם.",
        "❌ עובד ל-numbers שניהם."
      ]
    },
    { id: "mc_test_mock_jj_001", topicId: "topic_test", conceptKey: "lesson_25::TypeScript", level: 6,
      question: "למה משתמשים ב-mock?",
      options: [
        "להחליף dep אמיתי (DB/HTTP/timer) ב-fake לpredictability + מהירות. control over inputs/outputs",
        "Faster code",
        "Required by JS",
        "Production"
      ],
      correctIndex: 0,
      explanation: "vi.mock('axios'), jest.mock('./db'). מאפשר לבדוק יחידה בלי תלויות.",
      optionFeedback: [
        "✅ נכון. isolation.",
        "❌ קוד לא משתנה.",
        "❌ לא חובה.",
        "❌ רק ב-tests."
      ]
    },
    { id: "mc_test_spy_jj_001", topicId: "topic_test", conceptKey: "lesson_25::TypeScript", level: 7,
      question: "מה ההבדל בין mock ל-spy?",
      options: [
        "Mock מחליף לחלוטין. Spy מתעד קריאות אך משאיר את הפונקציה המקורית. שימושי לוודא שprפונקציה נקראה",
        "זהים",
        "Spy רק לnetworking",
        "Mock async"
      ],
      correctIndex: 0,
      explanation: "vi.spyOn(obj, 'method') = wrap. vi.fn() / vi.mock = replace. אפשר vi.spyOn(...).mockReturnValue().",
      optionFeedback: [
        "✅ נכון. wrap vs replace.",
        "❌ שונים.",
        "❌ universal.",
        "❌ דומה."
      ]
    },
    { id: "mc_test_stub_jj_001", topicId: "topic_test", conceptKey: "lesson_25::TypeScript", level: 7,
      question: "מה stub?",
      options: [
        "Replacement פשוט עם תגובה קבועה — אין assertion על קריאות. שונה מ-mock שיש לו logic + assertions",
        "Same as mock",
        "Fake DB",
        "Spy"
      ],
      correctIndex: 0,
      explanation: "טכנית בJS השמות מתערבבים. Sinon מבחין בין spy/stub/mock במפורש.",
      optionFeedback: [
        "✅ נכון. simple replacement.",
        "❌ הבחנה דקה.",
        "❌ זה שימוש.",
        "❌ spy מתעד."
      ]
    },
    { id: "mc_test_fake_jj_001", topicId: "topic_test", conceptKey: "lesson_25::TypeScript", level: 7,
      question: "מה fake (Test Double)?",
      options: [
        "מימוש פונקציונלי-קל של dep — in-memory DB במקום SQL, FakeUserRepo. שימושי לintegration tests",
        "Mock",
        "Spy",
        "Production"
      ],
      correctIndex: 0,
      explanation: "FakeRepo עובד באמת אבל ב-RAM. real-ish behavior.",
      optionFeedback: [
        "✅ נכון. functional substitute.",
        "❌ mock פסיבי.",
        "❌ spy מתעד.",
        "❌ אין קשר."
      ]
    },
    { id: "mc_test_setup_jj_001", topicId: "topic_test", conceptKey: "lesson_25::TypeScript", level: 5,
      question: "מה ההבדל בין beforeAll ל-beforeEach?",
      options: [
        "beforeAll רץ פעם אחת לפני כל ה-tests ב-describe. beforeEach רץ לפני כל test בנפרד. trade-off perf vs isolation",
        "זהים",
        "beforeAll async",
        "beforeEach sync"
      ],
      correctIndex: 0,
      explanation: "beforeAll: יקר (DB connect). beforeEach: reset state בין tests. שניהם async-able.",
      optionFeedback: [
        "✅ נכון. once vs each.",
        "❌ שונים.",
        "❌ שניהם async.",
        "❌ שניהם async."
      ]
    },
    { id: "mc_test_async_jj_001", topicId: "topic_test", conceptKey: "lesson_25::TypeScript", level: 6,
      question: "איך לכתוב async test ב-Vitest?",
      options: [
        "it('...', async () => { const r = await fn(); expect(r).toBe(...); }) — async function + await",
        "Promise.then",
        "done callback",
        "setTimeout"
      ],
      correctIndex: 0,
      explanation: "async/await מודרני. done callback (legacy Jest) — זוכר להזעיק.",
      optionFeedback: [
        "✅ נכון. async/await.",
        "❌ legacy.",
        "❌ legacy.",
        "❌ שונה."
      ]
    },
    { id: "mc_test_rtl_query_jj_001", topicId: "topic_test", conceptKey: "lesson_22::Hook", level: 6,
      question: "איזה queries מומלצים ב-React Testing Library?",
      options: [
        "Accessibility queries: getByRole, getByLabelText, getByText. שלב הבא: getByPlaceholderText. אחרון: getByTestId",
        "ID always",
        "Class always",
        "DOM order"
      ],
      correctIndex: 0,
      explanation: "RTL מעודד queries שמדמות איך משתמש מוצא את ה-element. accessible-first.",
      optionFeedback: [
        "✅ נכון. priority order.",
        "❌ ID חלש.",
        "❌ class הוא implementation.",
        "❌ אין סדר."
      ]
    },
    { id: "mc_test_rtl_user_jj_001", topicId: "topic_test", conceptKey: "lesson_22::Hook", level: 7,
      question: "מה ההבדל בין fireEvent ל-userEvent ב-RTL?",
      options: [
        "userEvent מדמה user real — sequence of events (focus → keydown → input). fireEvent dispatches single event ישיר",
        "זהים",
        "fireEvent עדיף",
        "userEvent רק לkeyboard"
      ],
      correctIndex: 0,
      explanation: "userEvent.click(button) → mousedown, mouseup, click. fireEvent.click → click בלבד.",
      optionFeedback: [
        "✅ נכון. realism level.",
        "❌ שונים מהותית.",
        "❌ userEvent עדיף בדרך כלל.",
        "❌ עובד על כל interaction."
      ]
    },
    { id: "mc_test_rtl_act_jj_001", topicId: "topic_test", conceptKey: "lesson_22::Hook", level: 8,
      question: "מתי act() נדרש ב-React tests?",
      options: [
        "Updates שדורשים flush של React internals (state changes, effects). RTL queries כבר wraps in act. מנוצל בשינויים ידניים",
        "Always",
        "Never",
        "DOM only"
      ],
      correctIndex: 0,
      explanation: "act חל על setState ו-useEffect. waitFor + queries מטפלים אוטומטית.",
      optionFeedback: [
        "✅ נכון. flush updates.",
        "❌ לא תמיד.",
        "❌ לפעמים נדרש.",
        "❌ React state גם."
      ]
    },
    { id: "mc_test_waitfor_jj_001", topicId: "topic_test", conceptKey: "lesson_22::Hook", level: 7,
      question: "מתי משתמשים ב-waitFor?",
      options: [
        "ל-async assertions שלא ידוע מתי יקרו: fetch לעדכן UI, animation. Polls עד שמוצלח או timeout",
        "Sync only",
        "Random",
        "Replacement for sleep"
      ],
      correctIndex: 0,
      explanation: "await waitFor(() => expect(getByText('Done')).toBeInTheDocument()).",
      optionFeedback: [
        "✅ נכון. async wait.",
        "❌ async לא sync.",
        "❌ דטרמיניסטי.",
        "❌ עדיף — לא sleep."
      ]
    },
    { id: "mc_test_msw_jj_001", topicId: "topic_test", conceptKey: "lesson_22::Hook", level: 8,
      question: "מה MSW (Mock Service Worker)?",
      options: [
        "Library לmocking של HTTP API ב-tests/dev — interception ברמת Service Worker, אינסטרומנטציה דמוית-אמת",
        "DB mock",
        "WebSocket only",
        "TypeScript"
      ],
      correctIndex: 0,
      explanation: "rest.get('/api/...', (req,res,ctx)=>res(ctx.json({...}))). שימוש גם ב-Storybook ו-dev.",
      optionFeedback: [
        "✅ נכון. SW-level mocking.",
        "❌ לא DB.",
        "❌ עובד על HTTP.",
        "❌ JS general."
      ]
    },
    { id: "mc_test_snapshot_jj_001", topicId: "topic_test", conceptKey: "lesson_25::TypeScript", level: 7,
      question: "מה snapshot test?",
      options: [
        "שמירת serialized output בקובץ — בדיקה שלא השתנה. שימושי ל-UI/data structures. סיכון: snapshots ענקיים שלא נקראים",
        "Performance",
        "Time travel",
        "Backup"
      ],
      correctIndex: 0,
      explanation: "expect(component).toMatchSnapshot(). __snapshots__/ . CI fail אם השתנה.",
      optionFeedback: [
        "✅ נכון. structural diff.",
        "❌ לא perf.",
        "❌ debug term.",
        "❌ לא backup."
      ]
    },
    { id: "mc_test_inline_snapshot_jj_001", topicId: "topic_test", conceptKey: "lesson_25::TypeScript", level: 8,
      question: "מה toMatchInlineSnapshot מציע?",
      options: [
        "Snapshot inline בקוד הtest — נקרא יותר מ-קובץ נפרד. Vitest/Jest מעדכנים אוטומטית עם --update-snapshot",
        "Faster",
        "Cloud sync",
        "TypeScript"
      ],
      correctIndex: 0,
      explanation: "ב-Diff בPR אפשר לראות את השינוי. שונה מ-toMatchSnapshot שהשינויים בקובץ נפרד.",
      optionFeedback: [
        "✅ נכון. visible in diff.",
        "❌ דומה ביצועים.",
        "❌ לא cloud.",
        "❌ עובד גם JS."
      ]
    },
    { id: "mc_test_coverage_jj_001", topicId: "topic_test", conceptKey: "lesson_25::TypeScript", level: 6,
      question: "מה הסוגים השונים של coverage?",
      options: [
        "Statements, Branches (if/else), Functions, Lines. 100% line ≠ 100% branch (לא כל ה-cases)",
        "Just lines",
        "DB queries",
        "Network"
      ],
      correctIndex: 0,
      explanation: "Branch coverage חזק יותר. function coverage רחב.",
      optionFeedback: [
        "✅ נכון. 4 metrics.",
        "❌ יש 4.",
        "❌ זה integration test.",
        "❌ זה E2E."
      ]
    },
    { id: "mc_test_v8_coverage_jj_001", topicId: "topic_test", conceptKey: "lesson_25::TypeScript", level: 7,
      question: "מה היתרון של V8 coverage על Istanbul?",
      options: [
        "Native instrumentation — אין transformation של קוד לפני run. מהיר, מדויק, תומך source maps",
        "Older",
        "Mocking",
        "Browsers only"
      ],
      correctIndex: 0,
      explanation: "Vitest תומך ב-V8 coverage. נפוץ ב-Node 14+. יורש מ-Chrome DevTools.",
      optionFeedback: [
        "✅ נכון. native coverage.",
        "❌ דווקא חדש יותר.",
        "❌ unrelated.",
        "❌ עובד גם node."
      ]
    },
    { id: "mc_test_table_jj_001", topicId: "topic_test", conceptKey: "lesson_25::TypeScript", level: 6,
      question: "מה it.each (table tests)?",
      options: [
        "מריץ אותו test על מספר rows של נתונים: it.each([[1,2,3],[4,5,9]])('add', (a,b,r)=>...)",
        "Random",
        "Loop",
        "Promise.all"
      ],
      correctIndex: 0,
      explanation: "Reduces duplication. כל row = test נפרד עם report ייחודי.",
      optionFeedback: [
        "✅ נכון. parameterized tests.",
        "❌ דטרמיניסטי.",
        "❌ זה syntax לא loop.",
        "❌ async unrelated."
      ]
    },
    { id: "mc_test_cypress_jj_001", topicId: "topic_test", conceptKey: "lesson_25::TypeScript", level: 7,
      question: "מה Cypress עיקרי?",
      options: [
        "E2E framework שרץ באותו תהליך עם הapp — DOM access ישיר, time travel, automatic retries. רק Chromium-based",
        "Headless only",
        "Selenium-based",
        "Multi-browser"
      ],
      correctIndex: 0,
      explanation: "Cypress 10+ תומך גם ב-component testing. limitation: same-origin בלבד.",
      optionFeedback: [
        "✅ נכון. in-process.",
        "❌ headed/headless.",
        "❌ Cypress עצמאי.",
        "❌ Firefox/Edge מוגבל."
      ]
    },
    { id: "mc_test_playwright_jj_001", topicId: "topic_test", conceptKey: "lesson_25::TypeScript", level: 8,
      question: "מה Playwright עדיף על Cypress?",
      options: [
        "Multi-browser native (Chromium + Firefox + WebKit), parallelization built-in, multi-tab/window, faster",
        "Same",
        "Cypress better",
        "Older"
      ],
      correctIndex: 0,
      explanation: "Microsoft. עוטף ה-DevTools Protocol של כל דפדפן. נסיגה: API חדש להתרגל.",
      optionFeedback: [
        "✅ נכון. browser coverage.",
        "❌ שונים.",
        "❌ תלוי use case.",
        "❌ Playwright חדש יותר."
      ]
    },
    { id: "mc_test_visual_jj_001", topicId: "topic_test", conceptKey: "lesson_25::TypeScript", level: 8,
      question: "מה visual regression test?",
      options: [
        "Screenshot של UI בכל test → diff מול baseline. תופס regressions של CSS שלא ניתן לאלגוריתם רגיל",
        "Performance",
        "Audio",
        "Animation"
      ],
      correctIndex: 0,
      explanation: "Percy/Chromatic/Playwright snapshot. שביר ל-fonts/anti-aliasing.",
      optionFeedback: [
        "✅ נכון. pixel diff.",
        "❌ לא perf.",
        "❌ לא audio.",
        "❌ animation שונה."
      ]
    },
    { id: "mc_test_storybook_jj_001", topicId: "topic_test", conceptKey: "lesson_22::Hook", level: 7,
      question: "מה Storybook עוזר ב-testing?",
      options: [
        "ייחוד component עם states שונים. play function = interaction test. visual regression integration",
        "DB",
        "Backend",
        "API"
      ],
      correctIndex: 0,
      explanation: "Stories מתעדים variations. תמיכה ב-RTL/Vitest/Chromatic.",
      optionFeedback: [
        "✅ נכון. component dev/test.",
        "❌ DB unrelated.",
        "❌ frontend tool.",
        "❌ אין mocking ישיר."
      ]
    },
    { id: "mc_test_supertest_jj_001", topicId: "topic_test", conceptKey: "lesson_17::Express", level: 7,
      question: "מה supertest ב-Node?",
      options: [
        "HTTP testing library — wraps app instance, מאפשר request().post('/api').send({...}).expect(200) בלי server אמיתי",
        "Faster",
        "Performance",
        "Mock DB"
      ],
      correctIndex: 0,
      explanation: "import request from 'supertest'; const res = await request(app).get('/users'). integration tests.",
      optionFeedback: [
        "✅ נכון. HTTP integration.",
        "❌ זה לא ה-purpose.",
        "❌ לא perf.",
        "❌ מודה DB דרושה."
      ]
    },
    { id: "mc_test_http_jj_001", topicId: "topic_test", conceptKey: "lesson_17::Express", level: 7,
      question: "איך לבדוק Express endpoint?",
      options: [
        "supertest על app instance, ללא listen. נוח: לא צריך ports, פטור מ-cleanup, רץ במקבילי",
        "curl in test",
        "Real server",
        "Mock everything"
      ],
      correctIndex: 0,
      explanation: "supertest(app).get('/'). אם app.listen קוראים, מומלץ לשמור reference ולcloseב-afterAll.",
      optionFeedback: [
        "✅ נכון.",
        "❌ slow + flaky.",
        "❌ לא נדרש.",
        "❌ אין integration."
      ]
    },
    { id: "mc_test_db_test_jj_001", topicId: "topic_test", conceptKey: "lesson_17::Express", level: 8,
      question: "אסטרטגיית DB ב-tests?",
      options: [
        "Test DB נפרד, transaction rollback בין tests, או fresh DB per test (slower). Mongo: in-memory MongoDB",
        "Production DB",
        "No DB",
        "Mock all"
      ],
      correctIndex: 0,
      explanation: "mongodb-memory-server לMongo. testcontainers ל-Postgres/MySQL. Prisma seeds.",
      optionFeedback: [
        "✅ נכון. several strategies.",
        "❌ אסור!",
        "❌ אז זה לא integration.",
        "❌ פחות מציאותי."
      ]
    },
    { id: "mc_test_tdd_jj_001", topicId: "topic_test", conceptKey: "lesson_25::TypeScript", level: 7,
      question: "מה Test-Driven Development?",
      options: [
        "Red-Green-Refactor: כתוב test שכושל → קוד שעובר → refactor. הtest מנחה את ה-API design",
        "Test after code",
        "No tests",
        "Coverage 100%"
      ],
      correctIndex: 0,
      explanation: "TDD מבטיח שכל קוד נבדק. design emerges. learning curve. לא תמיד מתאים (UI exploration).",
      optionFeedback: [
        "✅ נכון. RGR cycle.",
        "❌ הפוך.",
        "❌ הפוך.",
        "❌ זה לא TDD.",
      ]
    },
    { id: "mc_test_bdd_jj_001", topicId: "topic_test", conceptKey: "lesson_25::TypeScript", level: 7,
      question: "מה BDD?",
      options: [
        "Behavior-Driven Development — describes user-facing behavior. Given/When/Then. Cucumber/Gherkin/Jest BDD",
        "TDD",
        "DDD",
        "Microservices"
      ],
      correctIndex: 0,
      explanation: "BDD focuses על business value. describe('Login', () => { it('redirects after success', ...) }).",
      optionFeedback: [
        "✅ נכון. behavior-focused.",
        "❌ TDD שונה.",
        "❌ DDD שונה.",
        "❌ unrelated."
      ]
    },
    { id: "mc_test_pyramid_jj_001", topicId: "topic_test", conceptKey: "lesson_25::TypeScript", level: 7,
      question: "מה test pyramid?",
      options: [
        "המון unit (זול+מהיר), פחות integration, מעט E2E (יקר+שביר). הופכי שכיח: Trophy / Diamond",
        "Equal at all levels",
        "More E2E",
        "Bug pyramid"
      ],
      correctIndex: 0,
      explanation: "Mike Cohn's pyramid. Kent Dodds Trophy: more integration. שניהם תקפים בהקשר.",
      optionFeedback: [
        "✅ נכון. classic pyramid.",
        "❌ לא יעיל.",
        "❌ הפוך מהפיר.",
        "❌ unrelated."
      ]
    },
    { id: "mc_test_arrange_jj_001", topicId: "topic_test", conceptKey: "lesson_25::TypeScript", level: 6,
      question: "למה assertion יחיד per test רצוי?",
      options: [
        "Failure ברור — יודעים מה נשבר. Multiple assertions: לא רואים את כל ה-fails (early exit). תיעוד טוב",
        "Faster",
        "Required",
        "Same"
      ],
      correctIndex: 0,
      explanation: "soft-assertions ב-Jest expect.softFail מקלות על זה. ב-Vitest expect.soft.",
      optionFeedback: [
        "✅ נכון. clarity.",
        "❌ הבדל זניח.",
        "❌ לא חובה.",
        "❌ הבדל יש."
      ]
    },
    { id: "mc_test_flaky_jj_001", topicId: "topic_test", conceptKey: "lesson_25::TypeScript", level: 8,
      question: "מה גורם flaky tests?",
      options: [
        "Race conditions, time deps, external network, shared state, randomness. שכיח ב-E2E, פוגע בthroughput",
        "Solid code",
        "Good architecture",
        "Strict TS"
      ],
      correctIndex: 0,
      explanation: "fix: stabilize selectors, mock time/network, isolate. avoid retries מסכמים בעיה.",
      optionFeedback: [
        "✅ נכון. main causes.",
        "❌ הפוך.",
        "❌ הפוך.",
        "❌ TS לא מונע."
      ]
    },
    { id: "mc_test_arrange_setup_jj_001", topicId: "topic_test", conceptKey: "lesson_25::TypeScript", level: 7,
      question: "מה factory function ב-tests?",
      options: [
        "Helper שיוצר test data: makeUser(overrides) → { id:'u1', name:'X', ...overrides }. מונע duplication וקפיצות",
        "Class instance",
        "Async",
        "Mock"
      ],
      correctIndex: 0,
      explanation: "מאפשר לעקוף defaults: makeUser({ role: 'admin' }). שימוש: const u = makeUser().",
      optionFeedback: [
        "✅ נכון. test data factory.",
        "❌ class שונה.",
        "❌ sync.",
        "❌ mock שונה."
      ]
    }
  ],
  fill: [
    { id: "fill_test_describe_jj_001", topicId: "topic_test", conceptKey: "lesson_25::TypeScript", level: 5,
      code: "// Group tests\n____('User', () => {\n  it('logs in', () => { /* ... */ });\n});",
      answer: "describe",
      explanation: "describe groups related tests."
    },
    { id: "fill_test_async_jj_001", topicId: "topic_test", conceptKey: "lesson_25::TypeScript", level: 5,
      code: "// Async test\nit('fetches', ____ () => {\n  const data = await fetchUser();\n  expect(data.id).toBe(1);\n});",
      answer: "async",
      explanation: "async function in test."
    },
    { id: "fill_test_tobe_jj_001", topicId: "topic_test", conceptKey: "lesson_25::TypeScript", level: 5,
      code: "// Primitive equality\nexpect(2 + 2).____(4);",
      answer: "toBe",
      explanation: "toBe = Object.is comparison."
    },
    { id: "fill_test_toequal_jj_001", topicId: "topic_test", conceptKey: "lesson_25::TypeScript", level: 5,
      code: "// Deep equality\nexpect({ a: 1, b: 2 }).____({ a: 1, b: 2 });",
      answer: "toEqual",
      explanation: "toEqual = deep structural equality."
    },
    { id: "fill_test_throws_jj_001", topicId: "topic_test", conceptKey: "lesson_25::TypeScript", level: 6,
      code: "// Expect error\nexpect(() => parseConfig(invalid)).____('Invalid config');",
      answer: "toThrow",
      explanation: "toThrow with message check."
    },
    { id: "fill_test_mock_fn_jj_001", topicId: "topic_test", conceptKey: "lesson_25::TypeScript", level: 6,
      code: "// Create mock function\nconst handler = vi.____();\nbutton.click();\nexpect(handler).toHaveBeenCalledTimes(1);",
      answer: "fn",
      explanation: "vi.fn() / jest.fn() = mock function."
    },
    { id: "fill_test_spy_jj_001", topicId: "topic_test", conceptKey: "lesson_25::TypeScript", level: 7,
      code: "// Spy without replacing\nconst spy = vi.____(api, 'fetch');\nawait load();\nexpect(spy).toHaveBeenCalled();",
      answer: "spyOn",
      explanation: "spyOn wraps existing method."
    },
    { id: "fill_test_beforeeach_jj_001", topicId: "topic_test", conceptKey: "lesson_25::TypeScript", level: 5,
      code: "// Setup before each test\n____Each(() => {\n  user = createUser();\n});",
      answer: "before",
      explanation: "beforeEach resets state per test."
    },
    { id: "fill_test_aftereach_jj_001", topicId: "topic_test", conceptKey: "lesson_25::TypeScript", level: 5,
      code: "// Cleanup after each\n____(() => {\n  vi.restoreAllMocks();\n});",
      answer: "afterEach",
      explanation: "afterEach restores mocks."
    },
    { id: "fill_test_render_jj_001", topicId: "topic_test", conceptKey: "lesson_22::Hook", level: 6,
      code: "// React Testing Library\nimport { ____ } from '@testing-library/react';\n\nconst { getByText } = render(<Comp />);\nexpect(getByText('Hello')).toBeInTheDocument();",
      answer: "render",
      explanation: "render mounts component for testing."
    },
    { id: "fill_test_user_event_jj_001", topicId: "topic_test", conceptKey: "lesson_22::Hook", level: 7,
      code: "// Simulate real user click\nconst user = userEvent.setup();\nawait user.____(button);",
      answer: "click",
      explanation: "userEvent.click realistic interaction."
    },
    { id: "fill_test_waitfor_jj_001", topicId: "topic_test", conceptKey: "lesson_22::Hook", level: 7,
      code: "// Wait for async update\nawait ____(() => {\n  expect(getByText('Loaded')).toBeInTheDocument();\n});",
      answer: "waitFor",
      explanation: "waitFor polls until passes or timeout."
    },
    { id: "fill_test_supertest_jj_001", topicId: "topic_test", conceptKey: "lesson_17::Express", level: 7,
      code: "// HTTP integration test\nconst res = await ____(app)\n  .post('/users')\n  .send({ name: 'Tal' })\n  .expect(201);",
      answer: "request",
      explanation: "supertest request(app) wraps Express."
    },
    { id: "fill_test_table_jj_001", topicId: "topic_test", conceptKey: "lesson_25::TypeScript", level: 6,
      code: "// Parameterized tests\nit.____([\n  [1, 2, 3],\n  [4, 5, 9],\n])('add(%i, %i) = %i', (a, b, r) => {\n  expect(add(a, b)).toBe(r);\n});",
      answer: "each",
      explanation: "it.each runs same test with different data."
    },
    { id: "fill_test_skip_jj_001", topicId: "topic_test", conceptKey: "lesson_25::TypeScript", level: 6,
      code: "// Skip test temporarily\nit.____('flaky test', () => {\n  // ...\n});",
      answer: "skip",
      explanation: "it.skip / describe.skip excludes tests."
    }
  ]
};
