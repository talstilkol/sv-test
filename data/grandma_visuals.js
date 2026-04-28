// data/grandma_visuals.js
// Local deterministic illustrations for the "ידע מורחב ברמת סבתא" atlas.
// The selector is keyword-based and never uses randomness.
var GRANDMA_VISUALS = (function () {
  const KIND_META = {
    code: {
      label: "קוד",
      title: "הוראות מסודרות",
      caption: "המחשה של רעיון תוכנה כצעדים, קלט ופלט.",
    },
    web: {
      label: "ווב",
      title: "בקשה, דפדפן ושרת",
      caption: "המחשה של מסע מידע בין משתמש, דפדפן ושירות.",
    },
    data: {
      label: "דאטה",
      title: "מידע שמסודר לשימוש",
      caption: "המחשה של נתונים שנאספים, מסודרים ונשלפים.",
    },
    security: {
      label: "אבטחה",
      title: "גבולות, מפתחות והרשאות",
      caption: "המחשה של שמירה על גישה נכונה למידע ולמערכת.",
    },
    ai: {
      label: "AI",
      title: "מודל שמחבר סימנים",
      caption: "המחשה של קלט, הקשר ופלט במערכת חכמה.",
    },
    cloud: {
      label: "ענן",
      title: "שירותים שרצים בתשתית",
      caption: "המחשה של פריסה, תורים, שירותים ואזורים.",
    },
    payments: {
      label: "כסף",
      title: "רישום ותנועה כספית",
      caption: "המחשה של תשלום, חשבונית וספר חשבונות.",
    },
    mobile: {
      label: "מובייל",
      title: "מכשיר, רשת וסנכרון",
      caption: "המחשה של אפליקציה שפועלת גם בתנאי עולם אמיתי.",
    },
    team: {
      label: "צוות",
      title: "אנשים, החלטות ותהליך",
      caption: "המחשה של עבודה משותפת, אחריות ותיעוד.",
    },
    quality: {
      label: "איכות",
      title: "בדיקה, מדידה ושיפור",
      caption: "המחשה של שערי איכות, תקלות ובקרה.",
    },
  };

  const KIND_RULES = [
    {
      kind: "ai",
      words: [" ai", "בינה", "מודל", "model", "llm", "prompt", "rag", "embedding", "agent", "copilot"],
    },
    {
      kind: "payments",
      words: ["payment", "תשלום", "billing", "invoice", "ledger", "כסף", "מנוי", "subscription", "fintech", "refund"],
    },
    {
      kind: "security",
      words: ["אבטחה", "security", "auth", "token", "סיסמה", "הרשאה", "זהות", "encryption", "tls", "secret", "privacy"],
    },
    {
      kind: "data",
      words: ["data", "דאטה", "נתונ", "database", "מסד", "sql", "nosql", "redis", "cache", "bi", "index", "query"],
    },
    {
      kind: "web",
      words: ["web", "ווב", "frontend", "backend", "http", "api", "browser", "dom", "css", "render", "url", "server"],
    },
    {
      kind: "cloud",
      words: ["cloud", "ענן", "devops", "kubernetes", "serverless", "region", "queue", "container", "deployment"],
    },
    {
      kind: "mobile",
      words: ["mobile", "מובייל", "app store", "android", "ios", "push", "offline", "device", "טלפון"],
    },
    {
      kind: "team",
      words: ["team", "צוות", "career", "קריירה", "review", "stakeholder", "roadmap", "decision", "documentation"],
    },
    {
      kind: "quality",
      words: ["test", "בדיק", "quality", "איכות", "observability", "monitoring", "alert", "incident", "debug", "bug"],
    },
  ];

  const OBJECT_AIDS = [
    { id: "code-recipe", kind: "code", title: "כרטיס מתכון", caption: "כמו מתכון במטבח: צעדים קצרים, סדר קבוע, ותוצאה צפויה בסוף.", objects: ["מתכון", "שלבים", "תוצאה"], words: ["function", "פונקציה", "algorithm", "אלגוריתם", "step", "צעד"] },
    { id: "code-toolbox", kind: "code", title: "ארגז כלים", caption: "כל פקודה היא כלי קטן; בוחרים את הכלי המתאים ולא משתמשים בפטיש לכל בעיה.", objects: ["כלי", "בחירה", "שימוש"], words: ["method", "מתודה", "utility", "helper", "כלי"] },
    { id: "code-assembly", kind: "code", title: "פס הרכבה", caption: "קלט עובר תחנות עיבוד, וכל תחנה מוסיפה שינוי אחד ברור.", objects: ["קלט", "תחנה", "פלט"], words: ["map", "filter", "reduce", "pipeline", "שרשור"] },
    { id: "code-calculator", kind: "code", title: "מחשבון", caption: "אותו קלט ואותה פעולה צריכים לתת תמיד אותה תוצאה.", objects: ["קלט", "פעולה", "תוצאה"], words: ["pure", "return", "חישוב", "expression"] },
    { id: "code-manual", kind: "code", title: "חוברת הוראות", caption: "קוד טוב מסביר למכונה מה לעשות בסדר שאדם יכול לעקוב אחריו.", objects: ["הוראה", "סדר", "ביצוע"], words: ["syntax", "תחביר", "statement", "block", "scope"] },

    { id: "web-post-office", kind: "web", title: "סניף דואר", caption: "בקשה יוצאת עם כתובת, מגיעה ליעד, וחוזרת עם תשובה.", objects: ["כתובת", "בקשה", "תשובה"], words: ["request", "response", "http", "fetch", "api"] },
    { id: "web-junction", kind: "web", title: "צומת תנועה", caption: "Router מחליט לאן להפנות כל כתובת בלי לעצור את כל הדרך.", objects: ["נתיב", "פנייה", "יעד"], words: ["router", "route", "routes", "url", "path"] },
    { id: "web-counter", kind: "web", title: "דלפק שירות", caption: "הלקוח מבקש פעולה, השרת בודק ומחזיר תשובה מסודרת.", objects: ["לקוח", "דלפק", "שרת"], words: ["client", "server", "backend", "frontend"] },
    { id: "web-window", kind: "web", title: "חלון תצוגה", caption: "המסך מציג מצב נוכחי; שינוי נתונים מרענן רק את החלק שצריך.", objects: ["מסך", "מצב", "רענון"], words: ["render", "dom", "jsx", "component"] },
    { id: "web-delivery", kind: "web", title: "משלוח עם סטטוס", caption: "סטטוס התגובה אומר אם המשלוח הצליח, נכשל או צריך טיפול נוסף.", objects: ["משלוח", "סטטוס", "מעקב"], words: ["status", "status code", "404", "500", "200"] },

    { id: "data-library", kind: "data", title: "מדף ספרייה", caption: "מידע מסודר במדפים כדי שאפשר למצוא אותו בלי לחפש בכל החדר.", objects: ["מדף", "סדר", "איתור"], words: ["index", "query", "search", "lookup"] },
    { id: "data-cabinet", kind: "data", title: "ארון תיקיות", caption: "כל רשומה יושבת במקום עם תווית ברורה ומפתח שמוביל אליה.", objects: ["תיקייה", "תווית", "מפתח"], words: ["record", "document", "field", "key"] },
    { id: "data-warehouse", kind: "data", title: "מחסן תאים", caption: "אוספים הרבה פריטים, מסמנים אותם, ושולפים לפי צורך.", objects: ["תא", "מלאי", "שליפה"], words: ["database", "mongo", "collection", "table"] },
    { id: "data-sheet", kind: "data", title: "לוח גיליון", caption: "שורות ועמודות עוזרות לראות קשרים במקום ערימה של פתקים.", objects: ["שורה", "עמודה", "קשר"], words: ["array", "object", "json", "csv"] },
    { id: "data-cards", kind: "data", title: "כרטיסיות אינדקס", caption: "כל כרטיס מכיל יחידה קטנה של מידע שאפשר למיין ולחבר לאחרות.", objects: ["כרטיס", "מיון", "קישור"], words: ["cache", "state", "storage", "localStorage"] },

    { id: "security-keys", kind: "security", title: "צרור מפתחות", caption: "מפתח נכון פותח דלת אחת; מפתח לא נכון נשאר בחוץ.", objects: ["מפתח", "דלת", "גישה"], words: ["token", "password", "secret", "key"] },
    { id: "security-vault", kind: "security", title: "כספת", caption: "מידע רגיש צריך שכבת הגנה ולא רק שלט שאומר לא לגעת.", objects: ["כספת", "קוד", "שמירה"], words: ["encryption", "hash", "privacy", "secure"] },
    { id: "security-gate", kind: "security", title: "שער כניסה", caption: "לפני שנכנסים בודקים מי אתה ומה מותר לך לעשות.", objects: ["זהות", "בדיקה", "הרשאה"], words: ["auth", "authentication", "authorization", "login"] },
    { id: "security-envelope", kind: "security", title: "מעטפה חתומה", caption: "אם פתחו את המעטפה בדרך, צריך לזהות שהמידע כבר לא אמין.", objects: ["חתימה", "שלמות", "אמון"], words: ["signature", "csrf", "integrity", "tamper"] },
    { id: "security-badge", kind: "security", title: "תג עובד", caption: "לא כל מי שנמצא בבניין רשאי לפתוח כל חדר.", objects: ["תג", "תפקיד", "גבול"], words: ["role", "permission", "rls", "access"] },

    { id: "ai-notebook", kind: "ai", title: "מחברת לימוד", caption: "המודל עובד טוב יותר כשהקשר מסודר לפני השאלה.", objects: ["מקור", "הקשר", "תשובה"], words: ["notebook", "context", "source", "rag"] },
    { id: "ai-pattern-board", kind: "ai", title: "לוח דפוסים", caption: "המערכת מזהה דפוסים בין סימנים ומציעה חיבור סביר.", objects: ["סימן", "דפוס", "חיבור"], words: ["embedding", "vector", "pattern", "classification"] },
    { id: "ai-assistant-desk", kind: "ai", title: "עמדת עוזר", caption: "Prompt טוב הוא משימה ברורה עם גבולות, לא בקשה מעורפלת.", objects: ["משימה", "גבול", "פלט"], words: ["prompt", "assistant", "agent", "instruction"] },
    { id: "ai-lens", kind: "ai", title: "זכוכית מגדלת", caption: "AI עוזר לראות קשרים, אבל עדיין צריך לבדוק את המקור.", objects: ["בדיקה", "מקור", "אמינות"], words: ["fact", "verify", "hallucination", "credibility"] },
    { id: "ai-prompt-card", kind: "ai", title: "כרטיס משימה", caption: "כשכותבים מה התפקיד, הקלט והפורמט, מקבלים תשובה שימושית יותר.", objects: ["תפקיד", "קלט", "פורמט"], words: ["format", "system", "user", "output"] },

    { id: "cloud-tower", kind: "cloud", title: "מגדל פיקוח", caption: "תשתית טובה יודעת לאן לשלוח עומס ומתי להתריע.", objects: ["פיקוח", "עומס", "ניתוב"], words: ["load", "balancer", "region", "scale"] },
    { id: "cloud-containers", kind: "cloud", title: "מכולות שירות", caption: "כל שירות נארז עם מה שהוא צריך כדי לרוץ במקום אחר.", objects: ["מכולה", "שירות", "הרצה"], words: ["container", "docker", "kubernetes", "deploy"] },
    { id: "cloud-grid", kind: "cloud", title: "רשת חשמל", caption: "כמה שירותים קטנים מתחברים למערכת אחת שמספקת כוח קבוע.", objects: ["צומת", "חיבור", "אספקה"], words: ["serverless", "worker", "edge", "function"] },
    { id: "cloud-kitchen", kind: "cloud", title: "מטבח שירות", caption: "תור מסודר מונע עומס ומאפשר לכל בקשה לקבל טיפול.", objects: ["תור", "עובד", "מנה"], words: ["queue", "job", "worker", "async"] },
    { id: "cloud-relay", kind: "cloud", title: "תחנת ממסר", caption: "מידע עובר בין תחנות קרובות כדי להגיע מהר יותר למשתמש.", objects: ["תחנה", "מרחק", "מהירות"], words: ["cdn", "edge", "latency", "cache"] },

    { id: "payments-register", kind: "payments", title: "קופה רושמת", caption: "כל תשלום צריך סכום, אישור, ורישום שאפשר לבדוק אחר כך.", objects: ["סכום", "אישור", "רישום"], words: ["payment", "checkout", "charge", "transaction"] },
    { id: "payments-receipt", kind: "payments", title: "גליל קבלות", caption: "הקבלה היא עקבה מסודרת של מה קרה ומתי.", objects: ["קבלה", "תאריך", "סכום"], words: ["invoice", "receipt", "billing", "tax"] },
    { id: "payments-wallet", kind: "payments", title: "ארנק", caption: "אמצעי תשלום נשמר בזהירות ומועבר רק למסלול מורשה.", objects: ["ארנק", "כרטיס", "אישור"], words: ["card", "wallet", "tokenization", "refund"] },
    { id: "payments-lane", kind: "payments", title: "מסלול קופה", caption: "הלקוח עובר שלבים: עגלה, תשלום, אישור, סיום.", objects: ["עגלה", "תשלום", "סיום"], words: ["subscription", "plan", "cart", "order"] },
    { id: "payments-ledger", kind: "payments", title: "ספר חשבונות", caption: "מערכת אמינה שומרת לא רק את התוצאה אלא גם את הדרך אליה.", objects: ["חובה", "זכות", "יתרה"], words: ["ledger", "balance", "accounting", "audit"] },

    { id: "mobile-map", kind: "mobile", title: "מפת כיס", caption: "אפליקציה טובה יודעת איפה המשתמש נמצא בתהליך גם במסך קטן.", objects: ["מסך", "מיקום", "זרימה"], words: ["navigation", "screen", "mobile", "app"] },
    { id: "mobile-battery", kind: "mobile", title: "סוללה ניידת", caption: "במובייל צריך לחשוב על משאבים: סוללה, רשת וזיכרון.", objects: ["סוללה", "רשת", "זיכרון"], words: ["battery", "performance", "device", "memory"] },
    { id: "mobile-tower", kind: "mobile", title: "אנטנת קליטה", caption: "החיבור לא תמיד יציב, ולכן צריך מצב טעינה וסנכרון חכם.", objects: ["קליטה", "ניתוק", "סנכרון"], words: ["offline", "sync", "network", "connectivity"] },
    { id: "mobile-bell", kind: "mobile", title: "פעמון התראה", caption: "התראה טובה מגיעה בזמן הנכון ולא מציפה את המשתמש.", objects: ["התראה", "זמן", "פעולה"], words: ["push", "notification", "badge", "alert"] },
    { id: "mobile-suitcase", kind: "mobile", title: "מזוודת סנכרון", caption: "מידע שנאסף במכשיר צריך להגיע לשרת בלי לאבד מצב.", objects: ["מכשיר", "אריזה", "שרת"], words: ["local", "remote", "handoff", "persist"] },

    { id: "team-whiteboard", kind: "team", title: "לוח מחיק", caption: "רעיון מורכב נהיה ברור כשמציירים אותו לפני שמקודדים.", objects: ["רעיון", "שרטוט", "החלטה"], words: ["roadmap", "architecture", "design", "planning"] },
    { id: "team-kanban", kind: "team", title: "לוח קנבן", caption: "משימה עוברת ממה שצריך לעשות אל מה שנבדק ונגמר.", objects: ["לבצע", "בעבודה", "סגור"], words: ["task", "sprint", "kanban", "workflow"] },
    { id: "team-folder", kind: "team", title: "תיק מסירה", caption: "מי שמקבל עבודה צריך הקשר, קבצים, והחלטות קודמות.", objects: ["הקשר", "מסירה", "אחריות"], words: ["handoff", "documentation", "ownership", "review"] },
    { id: "team-log", kind: "team", title: "יומן החלטות", caption: "תיעוד קצר חוסך ויכוחים כשחוזרים להחלטה אחרי חודש.", objects: ["שאלה", "החלטה", "סיבה"], words: ["decision", "adr", "stakeholder", "meeting"] },
    { id: "team-table", kind: "team", title: "שולחן עבודה משותף", caption: "כל אחד רואה את החלק שלו ואת החיבור לשאר המערכת.", objects: ["תפקיד", "חיבור", "תיאום"], words: ["team", "collaboration", "owner", "communication"] },

    { id: "quality-checklist", kind: "quality", title: "רשימת בדיקה", caption: "לפני שמסמנים סיום, עוברים על מה שעלול להישבר.", objects: ["בדיקה", "סיכון", "סיום"], words: ["test", "qa", "check", "coverage"] },
    { id: "quality-magnifier", kind: "quality", title: "זכוכית מגדלת", caption: "Debug טוב מצמצם את הבעיה עד שמוצאים את המקור.", objects: ["תסמין", "חיפוש", "מקור"], words: ["debug", "bug", "trace", "inspect"] },
    { id: "quality-alarm", kind: "quality", title: "גלאי תקלה", caption: "מערכת טובה מתריעה מוקדם לפני שמשתמשים מרגישים את הבעיה.", objects: ["מדד", "חריגה", "התראה"], words: ["monitoring", "alert", "incident", "observability"] },
    { id: "quality-gauge", kind: "quality", title: "לוח מחוונים", caption: "מדדים נותנים תמונה מהירה: מה עובד, מה איטי, ומה נפל.", objects: ["מדד", "מגמה", "תגובה"], words: ["metric", "dashboard", "latency", "error"] },
    { id: "quality-lab", kind: "quality", title: "שולחן מעבדה", caption: "ניסוי קטן ומבודד מאפשר להוכיח תיקון בלי לשבור אזורים אחרים.", objects: ["ניסוי", "בידוד", "הוכחה"], words: ["experiment", "repro", "unit", "integration"] },
  ];

  function esc(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function normalize(value) {
    return String(value || "").toLowerCase();
  }

  function textFor(subject) {
    return [
      subject && subject.kind,
      subject && subject.title,
      subject && subject.term,
      subject && subject.sectionTitle,
      subject && subject.description,
      subject && subject.text,
    ]
      .filter(Boolean)
      .join(" ");
  }

  function selectKind(subject) {
    const hay = ` ${normalize(textFor(subject))}`;
    const rule = KIND_RULES.find((entry) => entry.words.some((word) => hay.includes(normalize(word))));
    return rule ? rule.kind : "code";
  }

  function stableIndex(value, size) {
    if (!size) return 0;
    const text = normalize(value);
    let hash = 2166136261;
    for (let i = 0; i < text.length; i++) {
      hash ^= text.charCodeAt(i);
      hash = (hash * 16777619) >>> 0;
    }
    return hash % size;
  }

  function selectAid(subject) {
    const kind = selectKind(subject);
    const hay = ` ${normalize(textFor(subject))}`;
    const kindAids = OBJECT_AIDS.filter((aid) => aid.kind === kind);
    const scored = kindAids
      .map((aid, idx) => ({
        aid,
        idx,
        score: (aid.words || []).reduce((sum, word) => sum + (hay.includes(normalize(word)) ? 1 : 0), 0),
      }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => (b.score - a.score) || (a.idx - b.idx));
    if (scored.length) return scored[0].aid;
    const candidates = kindAids.length ? kindAids : OBJECT_AIDS;
    return candidates[stableIndex(textFor(subject), candidates.length)];
  }

  function statLine(subject) {
    const count = Number(subject && subject.count);
    if (Number.isFinite(count) && count > 0) return `<span>${count} מושגים בענף</span>`;
    if (subject && subject.number) return `<span>מושג ${esc(subject.number)}</span>`;
    return "";
  }

  function renderObjectTags(aid) {
    if (!aid || !Array.isArray(aid.objects) || aid.objects.length === 0) return "";
    return `<div class="grandma-object-tags">${aid.objects.map((item) => `<span>${esc(item)}</span>`).join("")}</div>`;
  }

  function wrap(kind, subject, art, aid) {
    const meta = KIND_META[kind] || KIND_META.code;
    const label = esc(subject && (subject.title || subject.term) ? subject.title || subject.term : meta.title);
    const title = aid && aid.title ? aid.title : meta.title;
    const caption = aid && aid.caption ? aid.caption : meta.caption;
    return `
      <figure class="grandma-visual grandma-visual--${esc(kind)}" aria-label="המחשה חזותית: ${label}">
        <div class="grandma-visual-art" aria-hidden="true">${art}</div>
        <figcaption>
          <strong>${esc(meta.label)} · ${esc(title)}</strong>
          <span>${esc(caption)}</span>
          ${renderObjectTags(aid)}
          ${statLine(subject)}
        </figcaption>
      </figure>`;
  }

  const templates = {
    code(subject, aid) {
      return wrap("code", subject, `
        <svg viewBox="0 0 260 150" class="grandma-visual-svg">
          <rect x="18" y="20" width="224" height="110" rx="18" class="gv-panel" />
          <rect x="42" y="44" width="66" height="18" rx="9" class="gv-code-a gv-drift" />
          <rect x="42" y="72" width="118" height="18" rx="9" class="gv-code-b gv-drift gv-delay-1" />
          <rect x="42" y="100" width="84" height="18" rx="9" class="gv-code-c gv-drift gv-delay-2" />
          <path d="M168 54 L205 75 L168 96" class="gv-arrow gv-flow" />
          <circle cx="210" cy="75" r="13" class="gv-node gv-pulse" />
        </svg>`, aid);
    },
    web(subject, aid) {
      return wrap("web", subject, `
        <svg viewBox="0 0 260 150" class="grandma-visual-svg">
          <rect x="22" y="24" width="132" height="92" rx="14" class="gv-panel" />
          <circle cx="43" cy="43" r="5" class="gv-dot" />
          <circle cx="60" cy="43" r="5" class="gv-dot muted" />
          <rect x="42" y="62" width="88" height="14" rx="7" class="gv-code-a gv-drift" />
          <rect x="42" y="86" width="68" height="14" rx="7" class="gv-code-b gv-drift gv-delay-1" />
          <path d="M156 76 C178 44 204 44 224 76 C204 108 178 108 156 76" class="gv-link gv-flow" />
          <circle cx="190" cy="76" r="20" class="gv-node gv-pulse" />
          <rect x="182" y="68" width="16" height="16" rx="4" class="gv-node-core" />
        </svg>`, aid);
    },
    data(subject, aid) {
      return wrap("data", subject, `
        <svg viewBox="0 0 260 150" class="grandma-visual-svg">
          <ellipse cx="78" cy="42" rx="48" ry="18" class="gv-database-top" />
          <path d="M30 42 V102 C30 112 52 122 78 122 C104 122 126 112 126 102 V42" class="gv-database-body" />
          <ellipse cx="78" cy="102" rx="48" ry="20" class="gv-database-bottom gv-pulse" />
          <rect x="152" y="82" width="16" height="36" rx="5" class="gv-code-a gv-grow" />
          <rect x="180" y="62" width="16" height="56" rx="5" class="gv-code-b gv-grow gv-delay-1" />
          <rect x="208" y="42" width="16" height="76" rx="5" class="gv-code-c gv-grow gv-delay-2" />
          <path d="M128 75 H148" class="gv-arrow gv-flow" />
        </svg>`, aid);
    },
    security(subject, aid) {
      return wrap("security", subject, `
        <svg viewBox="0 0 260 150" class="grandma-visual-svg">
          <path d="M130 22 L206 50 V84 C206 112 174 130 130 138 C86 130 54 112 54 84 V50 Z" class="gv-shield gv-pulse-soft" />
          <rect x="103" y="72" width="54" height="42" rx="10" class="gv-lock" />
          <path d="M112 72 V58 C112 46 121 38 130 38 C139 38 148 46 148 58 V72" class="gv-lock-arc" />
          <circle cx="130" cy="92" r="5" class="gv-node-core" />
          <path d="M130 97 V106" class="gv-lock-line" />
        </svg>`, aid);
    },
    ai(subject, aid) {
      return wrap("ai", subject, `
        <svg viewBox="0 0 260 150" class="grandma-visual-svg">
          <circle cx="62" cy="48" r="13" class="gv-node gv-pulse" />
          <circle cx="62" cy="102" r="13" class="gv-node gv-pulse gv-delay-1" />
          <circle cx="128" cy="38" r="13" class="gv-node-alt gv-pulse gv-delay-2" />
          <circle cx="128" cy="76" r="13" class="gv-node-alt gv-pulse" />
          <circle cx="128" cy="114" r="13" class="gv-node-alt gv-pulse gv-delay-1" />
          <circle cx="198" cy="76" r="17" class="gv-node-core gv-pulse-soft" />
          <path d="M75 48 L115 38 M75 48 L115 76 M75 102 L115 76 M75 102 L115 114 M141 38 L181 76 M141 76 L181 76 M141 114 L181 76" class="gv-link gv-flow" />
        </svg>`, aid);
    },
    cloud(subject, aid) {
      return wrap("cloud", subject, `
        <svg viewBox="0 0 260 150" class="grandma-visual-svg">
          <path d="M75 92 C50 92 40 72 52 56 C60 45 72 43 82 47 C91 31 111 24 130 31 C145 36 154 48 157 62 C174 58 195 67 198 87 C201 106 184 118 164 118 H77 C61 118 49 108 49 96 C49 94 50 93 50 92 Z" class="gv-cloud gv-pulse-soft" />
          <rect x="72" y="82" width="36" height="22" rx="7" class="gv-code-a gv-drift" />
          <rect x="118" y="72" width="36" height="22" rx="7" class="gv-code-b gv-drift gv-delay-1" />
          <rect x="164" y="82" width="36" height="22" rx="7" class="gv-code-c gv-drift gv-delay-2" />
          <path d="M108 92 H118 M154 84 H164" class="gv-arrow gv-flow" />
        </svg>`, aid);
    },
    payments(subject, aid) {
      return wrap("payments", subject, `
        <svg viewBox="0 0 260 150" class="grandma-visual-svg">
          <rect x="44" y="30" width="86" height="96" rx="12" class="gv-panel" />
          <path d="M62 56 H112 M62 76 H112 M62 96 H96" class="gv-ledger-lines" />
          <circle cx="176" cy="55" r="18" class="gv-coin gv-pulse" />
          <circle cx="198" cy="92" r="18" class="gv-coin gv-pulse gv-delay-1" />
          <path d="M132 74 C150 74 153 55 166 55 M132 98 C158 98 170 92 188 92" class="gv-arrow gv-flow" />
        </svg>`, aid);
    },
    mobile(subject, aid) {
      return wrap("mobile", subject, `
        <svg viewBox="0 0 260 150" class="grandma-visual-svg">
          <rect x="82" y="18" width="86" height="118" rx="18" class="gv-phone" />
          <rect x="98" y="42" width="54" height="62" rx="10" class="gv-panel" />
          <circle cx="126" cy="119" r="5" class="gv-dot" />
          <path d="M46 70 C62 54 79 54 94 70 M164 70 C181 54 198 54 214 70" class="gv-link gv-flow" />
          <circle cx="46" cy="70" r="8" class="gv-node gv-pulse" />
          <circle cx="214" cy="70" r="8" class="gv-node gv-pulse gv-delay-1" />
        </svg>`, aid);
    },
    team(subject, aid) {
      return wrap("team", subject, `
        <svg viewBox="0 0 260 150" class="grandma-visual-svg">
          <rect x="44" y="34" width="52" height="52" rx="12" class="gv-note gv-drift" />
          <rect x="104" y="56" width="52" height="52" rx="12" class="gv-note alt gv-drift gv-delay-1" />
          <rect x="164" y="34" width="52" height="52" rx="12" class="gv-note gv-drift gv-delay-2" />
          <path d="M70 96 V116 H190 V96 M96 62 H104 M156 82 H164" class="gv-link gv-flow" />
          <circle cx="70" cy="118" r="8" class="gv-node-core" />
          <circle cx="190" cy="118" r="8" class="gv-node-core" />
        </svg>`, aid);
    },
    quality(subject, aid) {
      return wrap("quality", subject, `
        <svg viewBox="0 0 260 150" class="grandma-visual-svg">
          <rect x="44" y="28" width="94" height="96" rx="14" class="gv-panel" />
          <path d="M62 56 L72 66 L92 44 M62 82 L72 92 L92 70 M62 108 L72 118 L92 96" class="gv-checks gv-flow" />
          <path d="M160 108 A38 38 0 1 1 220 108" class="gv-gauge" />
          <path d="M190 108 L214 76" class="gv-needle gv-pulse-soft" />
          <circle cx="190" cy="108" r="8" class="gv-node-core" />
        </svg>`, aid);
    },
  };

  function render(subject) {
    const aid = selectAid(subject || {});
    const kind = aid ? aid.kind : selectKind(subject || {});
    const renderer = templates[kind] || templates.code;
    return renderer(subject || {}, aid);
  }

  return {
    selectKind,
    selectAid,
    render,
    kinds: Object.keys(KIND_META),
    aids: OBJECT_AIDS.map((aid) => ({ id: aid.id, kind: aid.kind, title: aid.title })),
  };
})();
