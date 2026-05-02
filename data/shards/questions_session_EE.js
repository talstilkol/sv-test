// Sprint 2 batch EE - Performance + Browser internals + Web APIs
// 50 questions: 35 MC + 15 Fill
window.QUESTIONS_SHARD_EE = {
  mc: [
    { id: "mc_perf_debounce_ee_001", topicId: "topic_js", conceptKey: "lesson_22::Asynchronous", level: 5,
      question: "מה debounce עושה?",
      options: [
        "מאחד קריאות שמבוצעות בזמנים סמוכים — הקריאה רצה רק אחרי שיש דממה של X ms (input/resize handlers)",
        "מגביל קצב כללי",
        "Caching רגיל",
        "Lazy load"
      ],
      correctIndex: 0,
      explanation: "debounce: מאפס timer בכל call. רץ רק אחרי דממה. שימושי ל-search-as-you-type. שונה מ-throttle.",
      optionFeedback: [
        "✅ נכון. דממה→הפעלה.",
        "❌ זה throttle (max קצב).",
        "❌ caching שונה.",
        "❌ lazy load שונה."
      ]
    },
    { id: "mc_perf_throttle_ee_001", topicId: "topic_js", conceptKey: "lesson_22::Asynchronous", level: 5,
      question: "מה throttle עושה?",
      options: [
        "מבטיח שפעולה תרוץ לכל היותר X פעמים ב-Y זמן — מתאים ל-scroll/mousemove handlers",
        "Debounce",
        "Cache",
        "Promise pool"
      ],
      correctIndex: 0,
      explanation: "throttle: מגביל קצב מקסימלי. debounce: מחכה לדממה. שונים.",
      optionFeedback: [
        "✅ נכון. rate limiting.",
        "❌ debounce שונה.",
        "❌ cache שונה.",
        "❌ pool מנהל מקבילות."
      ]
    },
    { id: "mc_perf_memo_ee_001", topicId: "topic_js", conceptKey: "lesson_21::useMemo", level: 5,
      question: "מתי useMemo מועיל באמת?",
      options: [
        "חישוב יקר שתלוי בערכים שמשתנים נדירות, או יציבות שדה משוקלל ב-deps של effect/useCallback",
        "תמיד",
        "אף פעם",
        "ב-strings קטנים"
      ],
      correctIndex: 0,
      explanation: "useMemo עצמו עולה. רק שווה אם החישוב באמת יקר או נצרך לזיהות referencial לדאונסטרים.",
      optionFeedback: [
        "✅ נכון. כשהעלות גבוהה.",
        "❌ premature optimization.",
        "❌ יש שימושים לגיטימיים.",
        "❌ strings זול ממילא."
      ]
    },
    { id: "mc_perf_useCallback_ee_001", topicId: "topic_js", conceptKey: "lesson_21::useCallback", level: 5,
      question: "מתי useCallback מועיל?",
      options: [
        "כשמעבירים פונקציה ל-child שעובר memo, או כתלות ב-effect — שומר על reference equality בין renders",
        "תמיד עוטפים",
        "פונקציות קטנות",
        "אף פעם"
      ],
      correctIndex: 0,
      explanation: "ללא memo בילד, useCallback לא חוסך כלום (הילד יעשה re-render בכל מקרה).",
      optionFeedback: [
        "✅ נכון. לפי downstream.",
        "❌ premature.",
        "❌ קטנות → אין רווח.",
        "❌ יש מקרי שימוש."
      ]
    },
    { id: "mc_perf_react_memo_ee_001", topicId: "topic_react", conceptKey: "lesson_21::useMemo", level: 5,
      question: "מה React.memo עושה?",
      options: [
        "HOC שמדלג על re-render אם props (לפי shallow comparison) זהים — מונע עבודה מיותרת בעלים",
        "Memoization של חישוב",
        "Cache של hooks",
        "Lazy"
      ],
      correctIndex: 0,
      explanation: "React.memo(Comp). רק אם props זהים (===), מדלג render. עם custom compare אפשר deep.",
      optionFeedback: [
        "✅ נכון. props equality skip.",
        "❌ useMemo הוא לחישובים.",
        "❌ אין hook cache.",
        "❌ lazy שונה."
      ]
    },
    { id: "mc_perf_lazy_ee_001", topicId: "topic_react", conceptKey: "lesson_21::dynamic import", level: 6,
      question: "מה React.lazy + Suspense פותר?",
      options: [
        "Code splitting — מטעין component רק כשהוא מוצג, מקטין initial bundle ומשפר TTI",
        "SSR",
        "Hydration",
        "מהירות חישובים"
      ],
      correctIndex: 0,
      explanation: "const C = React.lazy(()=>import('./C')); + <Suspense fallback={...}><C/></Suspense>.",
      optionFeedback: [
        "✅ נכון. dynamic import + suspense.",
        "❌ SSR שונה.",
        "❌ hydration שונה.",
        "❌ אין השפעה ישירה."
      ]
    },
    { id: "mc_perf_virtualize_ee_001", topicId: "topic_react", conceptKey: "lesson_21::React", level: 7,
      question: "מה list virtualization?",
      options: [
        "מציג רק את הרכיבים הנראים בחלון (+ buffer) במקום את כל הרשימה — חיוני לאלפי שורות",
        "Pagination",
        "Lazy",
        "memo"
      ],
      correctIndex: 0,
      explanation: "react-window/react-virtualized. בלי וירטואליזציה, 10K rows = scroll lag.",
      optionFeedback: [
        "✅ נכון. windowing.",
        "❌ pagination משתמש בלחיצה.",
        "❌ lazy שונה.",
        "❌ memo שונה."
      ]
    },
    { id: "mc_perf_event_loop_ee_001", topicId: "topic_js", conceptKey: "lesson_15::Event Loop", level: 7,
      question: "למה micro-tasks (Promise.then) עוברות לפני macro-tasks (setTimeout)?",
      options: [
        "Event loop מרוקן את כל ה-microtask queue אחרי כל task ולפני render — מבטיח עקביות מצב",
        "אקראי",
        "FIFO global",
        "Priority של setTimeout"
      ],
      correctIndex: 0,
      explanation: "סדר: stack→all microtasks→render→next macrotask. Promise.then>setTimeout(0).",
      optionFeedback: [
        "✅ נכון. microtask drain.",
        "❌ דטרמיניסטי.",
        "❌ יש priorities.",
        "❌ הפוך."
      ]
    },
    { id: "mc_perf_reflow_ee_001", topicId: "topic_browser", conceptKey: "lesson_8::CSS", level: 7,
      question: "מה reflow (layout) בדפדפן?",
      options: [
        "חישוב מחדש של גיאומטריה — נדרש לאחר שינוי תכונות layout (width/height/top/...). יקר",
        "Repaint",
        "JS exec",
        "Network"
      ],
      correctIndex: 0,
      explanation: "Layout. שינוי על אלמנט אחד יכול לגרום לrelayout של עץ שלם. transform/opacity לא גורמים reflow.",
      optionFeedback: [
        "✅ נכון. layout calc.",
        "❌ repaint = חישוב צבעים בלבד.",
        "❌ זה browser internal.",
        "❌ לא קשור."
      ]
    },
    { id: "mc_perf_repaint_ee_001", topicId: "topic_browser", conceptKey: "lesson_8::CSS", level: 7,
      question: "מה repaint?",
      options: [
        "ציור מחדש של פיקסלים בלי שינוי בגיאומטריה — שינוי color/visibility מחייב repaint אך לא reflow",
        "Reflow",
        "JS",
        "Network"
      ],
      correctIndex: 0,
      explanation: "זול יותר מ-reflow. transform/opacity במקרים רבים אפילו לא repaint (composite layer).",
      optionFeedback: [
        "✅ נכון. paint stage.",
        "❌ reflow כולל גיאומטריה.",
        "❌ repaint הוא browser stage.",
        "❌ לא רשת."
      ]
    },
    { id: "mc_perf_composite_ee_001", topicId: "topic_browser", conceptKey: "lesson_8::CSS", level: 8,
      question: "למה transform/opacity מהירים יותר מ-top/left?",
      options: [
        "Transform/opacity עוברים בpipeline של GPU compositor — בלי reflow/repaint של ה-layer",
        "מקריים",
        "פחות נכתב",
        "CSS עדיף"
      ],
      correctIndex: 0,
      explanation: "Browser יוצר layer ל-transform והעבודה היא רק composite. top/left = layout + paint לכל אלמנט.",
      optionFeedback: [
        "✅ נכון. compositor offload.",
        "❌ דטרמיניסטי.",
        "❌ זה internal.",
        "❌ זה אותו CSS."
      ]
    },
    { id: "mc_perf_will_change_ee_001", topicId: "topic_browser", conceptKey: "lesson_8::CSS", level: 8,
      question: "מה will-change ב-CSS?",
      options: [
        "Hint לדפדפן ליצור composite layer מראש — שימושי לאלמנטים שיעברו אנימציה. יש להפעיל זמני",
        "Force reload",
        "Animate",
        "Watch JS"
      ],
      correctIndex: 0,
      explanation: "will-change: transform; — דפדפן מכין layer. שימוש ב-overuse יוצר memory bloat.",
      optionFeedback: [
        "✅ נכון. layer hint.",
        "❌ אין reload.",
        "❌ לא יוצר אנימציה.",
        "❌ לא JS."
      ]
    },
    { id: "mc_perf_critical_ee_001", topicId: "topic_browser", conceptKey: "lesson_24::Performance", level: 7,
      question: "מה Critical Rendering Path?",
      options: [
        "השרשרת מ-HTML/CSS/JS ל-pixels: parse HTML → CSSOM → JS → render tree → layout → paint → composite",
        "URL קצר",
        "Cache miss",
        "Service worker"
      ],
      correctIndex: 0,
      explanation: "אופטימיזציה: minify CSS/JS, inline critical, defer non-critical, preload hero assets.",
      optionFeedback: [
        "✅ נכון. CRP pipeline.",
        "❌ URL לא קשור.",
        "❌ caching שונה.",
        "❌ SW שונה."
      ]
    },
    { id: "mc_perf_lcp_ee_001", topicId: "topic_browser", conceptKey: "lesson_24::Performance", level: 7,
      question: "מה LCP ב-Web Vitals?",
      options: [
        "Largest Contentful Paint — זמן עד שהאלמנט הגדול ביותר ב-viewport מצויר. יעד ≤ 2.5 שניות",
        "TTI",
        "FCP",
        "CLS"
      ],
      correctIndex: 0,
      explanation: "Image/video/text block. Below 2.5s = good. Tied to perceived load speed.",
      optionFeedback: [
        "✅ נכון. core Web Vital.",
        "❌ TTI = interactive.",
        "❌ FCP = first content.",
        "❌ CLS = layout shift."
      ]
    },
    { id: "mc_perf_fid_ee_001", topicId: "topic_browser", conceptKey: "lesson_24::Performance", level: 7,
      question: "מה INP (החליף את FID ב-2024)?",
      options: [
        "Interaction to Next Paint — השהיה בין input לציור. יעד ≤ 200ms בכל interaction",
        "LCP",
        "TTFB",
        "FCP"
      ],
      correctIndex: 0,
      explanation: "INP החליף FID במרץ 2024. מודד את כל ה-interactions, לא רק את הראשון.",
      optionFeedback: [
        "✅ נכון. responsiveness metric.",
        "❌ LCP = paint.",
        "❌ TTFB = server.",
        "❌ FCP = first content."
      ]
    },
    { id: "mc_perf_cls_ee_001", topicId: "topic_browser", conceptKey: "lesson_24::Performance", level: 6,
      question: "מה CLS?",
      options: [
        "Cumulative Layout Shift — סך תזוזות לא צפויות של אלמנטים. יעד ≤ 0.1. תיקון: width/height על תמונות",
        "Click latency",
        "FCP",
        "Cookie"
      ],
      correctIndex: 0,
      explanation: "תמונות/ads/embeds בלי dimensions קבועים גורמים shift. שמור reserved space.",
      optionFeedback: [
        "✅ נכון. visual stability.",
        "❌ click ≠ layout.",
        "❌ FCP שונה.",
        "❌ cookie unrelated."
      ]
    },
    { id: "mc_perf_image_lazy_ee_001", topicId: "topic_html", conceptKey: "lesson_22::performance", level: 6,
      question: "מה loading=\"lazy\" ב-<img>?",
      options: [
        "Native lazy-loading — הדפדפן טוען תמונה רק כשהיא מתקרבת ל-viewport. אין צורך ב-IntersectionObserver",
        "Async only",
        "Defer",
        "Preload"
      ],
      correctIndex: 0,
      explanation: "<img loading='lazy'> נתמך בכל הדפדפנים המודרניים. ל-iframes גם.",
      optionFeedback: [
        "✅ נכון. native lazy.",
        "❌ async הוא ב-script.",
        "❌ defer הוא ב-script.",
        "❌ preload הפוך."
      ]
    },
    { id: "mc_perf_preload_ee_001", topicId: "topic_html", conceptKey: "lesson_22::performance", level: 7,
      question: "מה <link rel=\"preload\"> ?",
      options: [
        "מורה לדפדפן להטעין משאב קריטי מוקדם — שימושי ל-fonts/hero images שיידרשו בקרוב",
        "Lazy",
        "Cache",
        "DNS"
      ],
      correctIndex: 0,
      explanation: "<link rel='preload' as='font' href='...' type='font/woff2' crossorigin>. הקדמת טעינה.",
      optionFeedback: [
        "✅ נכון. resource hint.",
        "❌ הפוך מ-lazy.",
        "❌ caching שונה.",
        "❌ dns-prefetch הוא link אחר."
      ]
    },
    { id: "mc_perf_dns_prefetch_ee_001", topicId: "topic_html", conceptKey: "lesson_22::performance", level: 7,
      question: "מה <link rel=\"dns-prefetch\">?",
      options: [
        "מבצע DNS lookup לדומיין מראש — חוסך 20-120ms בקריאה הראשונה לדומיין החיצוני",
        "Preload",
        "Cache",
        "CDN"
      ],
      correctIndex: 0,
      explanation: "preconnect חזק יותר (DNS+TCP+TLS). dns-prefetch זול יותר.",
      optionFeedback: [
        "✅ נכון. DNS hint.",
        "❌ preload לוקח קובץ.",
        "❌ cache שונה.",
        "❌ CDN שונה."
      ]
    },
    { id: "mc_perf_intersect_ee_001", topicId: "topic_browser", conceptKey: "lesson_22::performance", level: 7,
      question: "מה IntersectionObserver?",
      options: [
        "API שמודיע מתי אלמנט נכנס/יוצא מ-viewport — חיוני ל-lazy load, infinite scroll, animations on view",
        "MutationObserver",
        "ResizeObserver",
        "ResizeEvent"
      ],
      correctIndex: 0,
      explanation: "new IntersectionObserver(cb, opts).observe(el). עדיף על scroll handler (גם ביצועים).",
      optionFeedback: [
        "✅ נכון. visibility detection.",
        "❌ Mutation מאזין ל-DOM changes.",
        "❌ Resize מאזין לשינוי גודל.",
        "❌ event ישן ולא מדויק."
      ]
    },
    { id: "mc_perf_requestidle_ee_001", topicId: "topic_browser", conceptKey: "lesson_22::performance", level: 8,
      question: "מה requestIdleCallback?",
      options: [
        "מבצע פונקציה כשהדפדפן בidle — מיועד לעבודות לא-קריטיות (logs/analytics) בלי לחסום main thread",
        "setTimeout(0)",
        "Microtask",
        "Worker"
      ],
      correctIndex: 0,
      explanation: "ה-callback מקבל deadline. אם אין זמן, נדחה. תמיכה לא מלאה ב-Safari.",
      optionFeedback: [
        "✅ נכון. idle scheduling.",
        "❌ setTimeout ירוץ גם אם busy.",
        "❌ microtask חוסם render.",
        "❌ Worker = thread נפרד."
      ]
    },
    { id: "mc_perf_raf_ee_001", topicId: "topic_browser", conceptKey: "lesson_22::performance", level: 7,
      question: "מתי משתמשים ב-requestAnimationFrame?",
      options: [
        "אנימציה JS-driven — הקריאה מסונכרנת ל-frame הבא של הדפדפן (~16.7ms ב-60fps). חוסך עבודה כשטאב לא פעיל",
        "תמיד במקום setTimeout",
        "Network",
        "Worker"
      ],
      correctIndex: 0,
      explanation: "rAF: pause בטאב לא-פעיל, sync ל-paint, חלק יותר מ-setTimeout.",
      optionFeedback: [
        "✅ נכון. animation timing.",
        "❌ לא תמיד מתאים.",
        "❌ אין קשר לרשת.",
        "❌ Worker שונה."
      ]
    },
    { id: "mc_perf_worker_ee_001", topicId: "topic_browser", conceptKey: "lesson_22::Asynchronous", level: 8,
      question: "מתי Web Worker מועיל?",
      options: [
        "חישוב כבד CPU שחוסם UI — Worker רץ ב-thread נפרד עם message passing",
        "I/O רשת",
        "DOM manipulation",
        "Storage"
      ],
      correctIndex: 0,
      explanation: "Worker אין לו DOM access. message passing structured-cloned. לחישובים בלבד.",
      optionFeedback: [
        "✅ נכון. CPU offload.",
        "❌ I/O עובד טוב ב-main (async).",
        "❌ Worker אין DOM.",
        "❌ storage עובד גם ב-main."
      ]
    },
    { id: "mc_perf_sw_ee_001", topicId: "topic_browser", conceptKey: "lesson_22::performance", level: 8,
      question: "מה Service Worker פותר?",
      options: [
        "Offline-first + cache control + background sync + push notifications — proxy בין page לרשת",
        "Computation",
        "DOM",
        "WebSocket"
      ],
      correctIndex: 0,
      explanation: "SW רץ ב-thread נפרד, חי גם כשהטאב סגור. בסיס PWA.",
      optionFeedback: [
        "✅ נכון. PWA backbone.",
        "❌ זה Worker רגיל.",
        "❌ SW אין DOM.",
        "❌ WebSocket יכול לעבוד גם ב-main."
      ]
    },
    { id: "mc_perf_cache_strat_ee_001", topicId: "topic_browser", conceptKey: "lesson_22::performance", level: 8,
      question: "Cache-First vs Network-First — מתי כל אחד?",
      options: [
        "Cache-First לסטטיים (CSS/JS/images). Network-First ל-API דינמי. שילובים: stale-while-revalidate",
        "Always cache",
        "Always network",
        "Random"
      ],
      correctIndex: 0,
      explanation: "Workbox מספק את כל האסטרטגיות. בחירה לפי סוג נתונים.",
      optionFeedback: [
        "✅ נכון. אסטרטגיה לפי תוכן.",
        "❌ דינמיים יתפוגגו.",
        "❌ סטטיים יבזבזו רשת.",
        "❌ דטרמיניסטי."
      ]
    },
    { id: "mc_perf_etag_ee_001", topicId: "topic_http", conceptKey: "lesson_24::HTTP", level: 7,
      question: "מה ETag header?",
      options: [
        "Versioning identifier של response — דפדפן שולח If-None-Match וה-server מחזיר 304 אם לא השתנה",
        "Encoding",
        "ETtl",
        "Auth"
      ],
      correctIndex: 0,
      explanation: "Conditional GET: ETag → If-None-Match → 304 Not Modified (בלי גוף). חוסך bandwidth.",
      optionFeedback: [
        "✅ נכון. validation header.",
        "❌ Content-Encoding שונה.",
        "❌ אין כזה header.",
        "❌ Authorization שונה."
      ]
    },
    { id: "mc_perf_compression_ee_001", topicId: "topic_http", conceptKey: "lesson_24::HTTP", level: 6,
      question: "מה Brotli vs Gzip?",
      options: [
        "Brotli משיג compression טוב יותר (~15-25%) אך יקר יותר ב-encode. נפוץ ב-static assets ב-CDN",
        "זהים",
        "Brotli ל-images",
        "Gzip ב-HTTPS בלבד"
      ],
      correctIndex: 0,
      explanation: "Accept-Encoding: br, gzip. Server מחליט. Brotli עדיף לטקסט סטטי ש-pre-compressed.",
      optionFeedback: [
        "✅ נכון. compression hierarchy.",
        "❌ שונים.",
        "❌ images בפורמט יעודי (WebP/AVIF).",
        "❌ עובד גם ב-HTTP."
      ]
    },
    { id: "mc_perf_http2_ee_001", topicId: "topic_http", conceptKey: "lesson_24::HTTP", level: 7,
      question: "מה היתרון של HTTP/2 על 1.1?",
      options: [
        "Multiplexing על חיבור TCP אחד, header compression (HPACK), server push, binary framing",
        "Faster TCP",
        "Encryption בלבד",
        "Different port"
      ],
      correctIndex: 0,
      explanation: "ב-HTTP/1.1 יש head-of-line blocking. HTTP/2 פותר ברמת stream.",
      optionFeedback: [
        "✅ נכון. multiplex.",
        "❌ TCP אותו.",
        "❌ HTTPS לא חדש.",
        "❌ port זהה (443)."
      ]
    },
    { id: "mc_perf_http3_ee_001", topicId: "topic_http", conceptKey: "lesson_24::HTTP", level: 8,
      question: "מה HTTP/3 שונה מ-HTTP/2?",
      options: [
        "HTTP/3 רץ על QUIC (UDP) במקום TCP — פותר head-of-line blocking ברמת רשת ומקצר handshake",
        "Different syntax",
        "JSON only",
        "Faster TCP"
      ],
      correctIndex: 0,
      explanation: "QUIC משלב TLS+transport. faster recovery בקצה רשת לא יציב (mobile).",
      optionFeedback: [
        "✅ נכון. UDP+QUIC.",
        "❌ syntax זהה.",
        "❌ אין הגבלה לפורמט.",
        "❌ TCP נשאר אותו."
      ]
    },
    { id: "mc_perf_cdn_ee_001", topicId: "topic_http", conceptKey: "lesson_24::HTTP", level: 7,
      question: "מה היתרון של CDN?",
      options: [
        "מטמן סטטיים בקרבת המשתמש (PoPs), מקטין latency ועומס origin, מונע DDoS, TLS בקצה",
        "Faster JS",
        "Caching בלבד",
        "DNS"
      ],
      correctIndex: 0,
      explanation: "Cloudflare/Cloudfront/Fastly. עוזר ב-cache hit rate, edge logic, DDoS protection.",
      optionFeedback: [
        "✅ נכון. edge delivery.",
        "❌ JS לא רץ מהר יותר ב-CDN.",
        "❌ הרבה יותר מ-cache.",
        "❌ CDN ≠ DNS."
      ]
    },
    { id: "mc_perf_bundle_split_ee_001", topicId: "topic_build", conceptKey: "lesson_22::performance", level: 7,
      question: "מה code splitting ב-bundlers?",
      options: [
        "פיצול bundle ליחידות קטנות שנטענות לפי דרישה — chunks per route/component, vendors נפרדים",
        "Minify בלבד",
        "Tree shaking",
        "Compression"
      ],
      correctIndex: 0,
      explanation: "import() דינמי, route-based, vendor splitting. Webpack/Vite/Rollup תומכים.",
      optionFeedback: [
        "✅ נכון. chunking.",
        "❌ minify מקטין size אך לא מפצל.",
        "❌ tree shaking מסיר dead code.",
        "❌ compression שונה."
      ]
    },
    { id: "mc_perf_tree_shake_ee_001", topicId: "topic_build", conceptKey: "lesson_22::performance", level: 7,
      question: "מה tree shaking?",
      options: [
        "מסיר exports שלא נצרכים מהbundle הסופי — דורש ES modules סטטיים (לא require דינמי)",
        "Code splitting",
        "Lazy load",
        "Compression"
      ],
      correctIndex: 0,
      explanation: "ESM static structure מאפשר lib analysis. CJS/dynamic require שובר tree shake.",
      optionFeedback: [
        "✅ נכון. dead-code elim.",
        "❌ splitting שונה.",
        "❌ lazy שונה.",
        "❌ compression שונה."
      ]
    },
    { id: "mc_perf_storage_size_ee_001", topicId: "topic_browser", conceptKey: "lesson_13::localStorage", level: 7,
      question: "כמה storage ל-localStorage?",
      options: [
        "~5-10MB per origin (תלוי בדפדפן). שימוש כבד גורם UI block כי הוא synchronous",
        "100MB",
        "Unlimited",
        "1KB"
      ],
      correctIndex: 0,
      explanation: "localStorage sync = bad. ל-large data: IndexedDB (async). הגבלה ~5-10MB.",
      optionFeedback: [
        "✅ נכון. ~5-10MB.",
        "❌ פחות מזה.",
        "❌ יש הגבלה.",
        "❌ יותר מ-1KB."
      ]
    },
    { id: "mc_perf_indexeddb_ee_001", topicId: "topic_browser", conceptKey: "lesson_13::localStorage", level: 8,
      question: "מתי IndexedDB עדיף על localStorage?",
      options: [
        "Datasets גדולים (>5MB), שאילתות מורכבות, transactions, async API שלא חוסם UI",
        "Strings קטנים",
        "Cookies",
        "Cache HTTP"
      ],
      correctIndex: 0,
      explanation: "IndexedDB: object store, indexes, async, transactions. localStorage: סינכרוני, key-value.",
      optionFeedback: [
        "✅ נכון. סקייל וביצועים.",
        "❌ קטנים → localStorage נוחה.",
        "❌ cookies שונה.",
        "❌ HTTP cache שונה."
      ]
    },
    { id: "mc_perf_layer_promotion_ee_001", topicId: "topic_browser", conceptKey: "lesson_8::CSS", level: 8,
      question: "איך לכפות יצירת compositing layer?",
      options: [
        "transform: translateZ(0) או will-change: transform — דפדפן ייצור layer GPU נפרד",
        "display: block",
        "color: red",
        "z-index"
      ],
      correctIndex: 0,
      explanation: "translateZ(0) trick (legacy) או will-change (modern hint). שימוש בזהירות.",
      optionFeedback: [
        "✅ נכון. layer promotion.",
        "❌ display לא יוצר layer.",
        "❌ color שינוי repaint רגיל.",
        "❌ z-index לבד לא מספיק."
      ]
    }
  ],
  fill: [
    { id: "fill_perf_debounce_ee_001", topicId: "topic_js", conceptKey: "lesson_22::Asynchronous", level: 5,
      code: "function debounce(fn, ms) {\n  let t;\n  return (...args) => {\n    ____(t);\n    t = setTimeout(() => fn(...args), ms);\n  };\n}",
      answer: "clearTimeout",
      explanation: "Reset timer al kol call. clearTimeout messir et ha-pending."
    },
    { id: "fill_perf_throttle_ee_001", topicId: "topic_js", conceptKey: "lesson_22::Asynchronous", level: 5,
      code: "function throttle(fn, ms) {\n  let last = 0;\n  return (...args) => {\n    const now = ____.now();\n    if (now - last >= ms) {\n      last = now; fn(...args);\n    }\n  };\n}",
      answer: "performance",
      explanation: "performance.now() returns high-res timestamp in ms (monotonic, unaffected by clock changes)."
    },
    { id: "fill_perf_lazy_img_ee_001", topicId: "topic_html", conceptKey: "lesson_22::performance", level: 5,
      code: "<!-- Native lazy loading -->\n<img src=\"hero.webp\" loading=\"____\" alt=\"hero\">",
      answer: "lazy",
      explanation: "loading=\"lazy\" native deferred load."
    },
    { id: "fill_perf_preload_ee_001", topicId: "topic_html", conceptKey: "lesson_22::performance", level: 6,
      code: "<!-- Hint browser to load early -->\n<link rel=\"____\" as=\"font\" href=\"font.woff2\" crossorigin>",
      answer: "preload",
      explanation: "preload mahekdim taanat moshava krit."
    },
    { id: "fill_perf_observer_ee_001", topicId: "topic_browser", conceptKey: "lesson_22::performance", level: 7,
      code: "// Observe element entering viewport\nconst io = new ____Observer((entries) => {\n  entries.forEach(e => {\n    if (e.isIntersecting) console.log('visible');\n  });\n});\nio.observe(el);",
      answer: "Intersection",
      explanation: "IntersectionObserver = visibility API."
    },
    { id: "fill_perf_raf_ee_001", topicId: "topic_browser", conceptKey: "lesson_22::performance", level: 6,
      code: "// Smooth animation aligned to frames\nfunction tick() {\n  // update + paint\n  ____(tick);\n}\ntick();",
      answer: "requestAnimationFrame",
      explanation: "rAF mistanchren l-frame ha-baah."
    },
    { id: "fill_perf_useMemo_ee_001", topicId: "topic_react", conceptKey: "lesson_21::useMemo", level: 5,
      code: "// Cache expensive calc\nconst result = ____(\n  () => heavy(arr),\n  [arr]\n);",
      answer: "useMemo",
      explanation: "useMemo cache lefi deps."
    },
    { id: "fill_perf_useCallback_ee_001", topicId: "topic_react", conceptKey: "lesson_21::useCallback", level: 5,
      code: "// Stable function ref\nconst handle = ____(\n  () => doSomething(id),\n  [id]\n);",
      answer: "useCallback",
      explanation: "useCallback shomer ref equality."
    },
    { id: "fill_perf_memo_ee_001", topicId: "topic_react", conceptKey: "lesson_21::useMemo", level: 5,
      code: "// Skip re-render if props equal\nconst Comp = React.____(({a, b}) => <div>{a}{b}</div>);",
      answer: "memo",
      explanation: "React.memo HOC skips re-render."
    },
    { id: "fill_perf_lazy_ee_001", topicId: "topic_react", conceptKey: "lesson_21::dynamic import", level: 6,
      code: "// Code split component\nconst Heavy = React.____(() => import('./Heavy'));\n// + <Suspense fallback={...}><Heavy/></Suspense>",
      answer: "lazy",
      explanation: "React.lazy + dynamic import."
    },
    { id: "fill_perf_will_change_ee_001", topicId: "topic_browser", conceptKey: "lesson_8::CSS", level: 8,
      code: "/* Layer hint */\n.animated {\n  ____: transform;\n  /* Browser creates GPU layer */\n}",
      answer: "will-change",
      explanation: "will-change layer promotion hint."
    },
    { id: "fill_perf_etag_ee_001", topicId: "topic_http", conceptKey: "lesson_24::HTTP", level: 7,
      code: "// Conditional GET\n// Server response:\n// ETag: \"abc123\"\n// Browser next request:\n// If-None-Match: \"abc123\"\n// Server: 304 ____ Modified",
      answer: "Not",
      explanation: "304 Not Modified responsa keshehetag tohem."
    },
    { id: "fill_perf_compression_ee_001", topicId: "topic_http", conceptKey: "lesson_24::HTTP", level: 6,
      code: "// Request header\nAccept-Encoding: br, ____",
      answer: "gzip",
      explanation: "Brotli + gzip negotiation."
    },
    { id: "fill_perf_dns_prefetch_ee_001", topicId: "topic_html", conceptKey: "lesson_22::performance", level: 7,
      code: "<!-- Pre-resolve domain -->\n<link rel=\"____-prefetch\" href=\"//api.example.com\">",
      answer: "dns",
      explanation: "dns-prefetch resolve mukdam."
    },
    { id: "fill_perf_idle_ee_001", topicId: "topic_browser", conceptKey: "lesson_22::performance", level: 8,
      code: "// Run during idle\nrequest____Callback((deadline) => {\n  while (deadline.timeRemaining() > 0) {\n    doNonCriticalWork();\n  }\n});",
      answer: "Idle",
      explanation: "requestIdleCallback non-critical scheduling."
    }
  ]
};
