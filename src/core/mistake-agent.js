export const MISTAKE_AGENT_VERSION = 2;

const MISCONCEPTION_CARDS = Object.freeze({
  zeroBasedIndex: {
    id: "zeroBasedIndex",
    label: "אינדקס מתחיל מ-0",
    rootCause: "סופרים כמו בני אדם: ראשון=1, שני=2. במערך המחשב סופר כתובות: ראשון=0, שני=1.",
    repair: "לפני כל גישה למערך שאל: האם אני רוצה מיקום אנושי או index של מחשב?",
    microDrill: "כתוב ליד כל איבר את ה-index שלו: ['a','b','c'] → 0:a, 1:b, 2:c.",
    association: "מדף עם תאים: התא הראשון הוא תא 0 כי זה המרחק מההתחלה.",
  },
  referenceVsValue: {
    id: "referenceVsValue",
    label: "Reference מול Value",
    rootCause: "מתבלבלים בין העתק של ערך קטן לבין כתובת לאובייקט/מערך בזיכרון.",
    repair: "Primitive בדרך כלל מועתק כערך; array/object מועברים ככתובת. שינוי דרך הכתובת משנה את אותו אובייקט.",
    microDrill: "סמן ליד כל משתנה: value copy או shared reference.",
    association: "Value הוא צילום. Reference הוא קישור למסמך המקורי.",
  },
  mutationVsImmutability: {
    id: "mutationVsImmutability",
    label: "Mutation מול Immutability",
    rootCause: "משנים את אותו מבנה במקום ליצור גרסה חדשה, ואז React/הלוגיקה לא מזהים שינוי נקי.",
    repair: "ב-state ובנתונים משותפים העדף map/filter/spread על push/splice ישירים.",
    microDrill: "המר `arr.push(x)` ל-`const next = [...arr, x]`.",
    association: "אל תכתוב על הדף המקורי; צלם עותק וערוך את העותק.",
  },
  truthinessEquality: {
    id: "truthinessEquality",
    label: "Truthy/Falsy ו-Equality",
    rootCause: "מתייחסים לכל תנאי כאילו הוא true/false מפורש, או משתמשים ב-== בלי להבין המרות טיפוס.",
    repair: "העדף `===`, ובדוק במפורש null/undefined/empty string/0 כשזה משנה ללוגיקה.",
    microDrill: "כתוב ליד כל ערך: Boolean(value) ומה יקרה עם `===`.",
    association: "Truthy הוא אור ירוק כללי; `===` הוא בדיקת תעודת זהות.",
  },
  arrayMethodChoice: {
    id: "arrayMethodChoice",
    label: "בחירת מתודת מערך לא נכונה",
    rootCause: "משתמשים ב-map/filter/find/forEach/reduce כאילו הן אותה פעולה.",
    repair: "בחר לפי השאלה: transform=map, keep/remove=filter, first match=find, side effect=forEach, single value=reduce.",
    microDrill: "ליד כל משימה כתוב קודם את הפועל: להפוך, לסנן, למצוא, לסכם.",
    association: "כל מתודת מערך היא כלי בארגז: מסור, מסננת, זכוכית מגדלת או מחשבון.",
  },
  reducerAccumulator: {
    id: "reducerAccumulator",
    label: "reduce: accumulator ו-return",
    rootCause: "שוכחים שה-accumulator חייב לחזור מכל סיבוב, או מערבבים current עם accumulator.",
    repair: "כתוב לפני reduce: מה הערך ההתחלתי, מה נכנס בכל סיבוב, ומה חוזר לסיבוב הבא.",
    microDrill: "עקוב בטבלה אחרי acc/current בשלושה איברים ראשונים.",
    association: "reduce הוא קופה רושמת: בכל מוצר מעדכנים את הסכום ומחזירים אותו לקופה.",
  },
  scopeClosure: {
    id: "scopeClosure",
    label: "Scope / Closure",
    rootCause: "לא ברור מאיפה משתנה נקרא ומתי פונקציה זוכרת ערך מהסביבה שלה.",
    repair: "עקוב אחרי הבלוקים מבחוץ פנימה: global → function → block → closure.",
    microDrill: "כתוב ליד כל משתנה איפה הוא נולד ואיפה מותר לקרוא אותו.",
    association: "Closure הוא תיק גב שפונקציה לוקחת איתה מהחדר שבו נוצרה.",
  },
  asyncOrder: {
    id: "asyncOrder",
    label: "סדר ריצה אסינכרוני",
    rootCause: "מצפים שקוד async יסתיים לפי סדר הכתיבה, אבל Promise/fetch חוזרים מאוחר יותר.",
    repair: "סמן מה רץ עכשיו ומה מחכה ל-await/then. אל תשתמש בתוצאה לפני שהיא חזרה.",
    microDrill: "צייר timeline: sync → await pending → continuation.",
    association: "שליחת fetch היא הזמנה במסעדה: ההמשך מחכה שהמנה תחזור.",
  },
  apiRequestResponse: {
    id: "apiRequestResponse",
    label: "HTTP / JSON / Error Handling",
    rootCause: "מערבבים בין request, response, status, body ו-json parsing, או מניחים שכל fetch הצליח.",
    repair: "בדוק `response.ok`, הפרד status מה-body, ואז קרא `await response.json()` רק כשהתשובה מתאימה.",
    microDrill: "כתוב ארבע שורות: request → status → parse body → handle error.",
    association: "HTTP הוא שליח: קודם בודקים אם הוא הגיע בשלום, ורק אז פותחים את החבילה.",
  },
  effectDependencies: {
    id: "effectDependencies",
    label: "useEffect Dependencies",
    rootCause: "לא ברור מה גורם לאפקט לרוץ שוב, או מתי צריך cleanup.",
    repair: "כל ערך מבחוץ שנקרא בתוך effect צריך החלטה: dependency, ref, או חישוב בתוך ה-effect.",
    microDrill: "סמן בקוד effect כל משתנה שמגיע מבחוץ ובדוק אם הוא במערך התלויות.",
    association: "dependency array הוא רשימת חיישנים: כשחיישן משתנה, האפקט מתעורר.",
  },
  stateSetterAsync: {
    id: "stateSetterAsync",
    label: "setState, batching ו-stale state",
    rootCause: "מצפים ש-state יתעדכן מיד באותה שורה, או קוראים ערך ישן בתוך closure.",
    repair: "כאשר הערך הבא תלוי בקודם, השתמש ב-functional update: `setCount(prev => prev + 1)`.",
    microDrill: "המר `setX(x + 1)` ל-`setX(prev => prev + 1)` כשיש רצף עדכונים.",
    association: "setState הוא בקשה לתור עדכון, לא החלפה מיידית ביד.",
  },
  propsStateOwnership: {
    id: "propsStateOwnership",
    label: "Props מול State ומקור אמת",
    rootCause: "מעתיקים props ל-state בלי צורך או לא ברור מי אחראי על הנתון.",
    repair: "שאל איפה הנתון נולד, מי משנה אותו, ואיזה קומפוננטות רק קוראות אותו.",
    microDrill: "צייר חץ: owner → props → child, וסמן מי רשאי לבצע update.",
    association: "Props הם משלוח מההורה; state הוא מחברת פרטית של הקומפוננטה.",
  },
  componentRenderCycle: {
    id: "componentRenderCycle",
    label: "Render Cycle ו-Side Effects",
    rootCause: "מריצים פעולה עם side effect בתוך render או לא מבינים מה גורם לרינדור חוזר.",
    repair: "render צריך לחשב UI בלבד. פעולות חיצוניות עוברות ל-event handler או useEffect.",
    microDrill: "סמן בכל שורה: חישוב טהור או side effect.",
    association: "render הוא ציור מסך; לא שולחים הודעות מהעיפרון בזמן הציור.",
  },
  eventHandlerInvocation: {
    id: "eventHandlerInvocation",
    label: "Event Handler: reference מול invocation",
    rootCause: "כותבים `onClick={save()}` ומפעילים בזמן render במקום להעביר פונקציה לאירוע.",
    repair: "העבר reference: `onClick={save}` או wrapper: `onClick={() => save(id)}`.",
    microDrill: "מצא בכל handler אם יש סוגריים שמריצים אותו מוקדם מדי.",
    association: "Handler הוא מספר טלפון לשעת חירום, לא שיחה שמבצעים עכשיו.",
  },
  routingParamsNavigation: {
    id: "routingParamsNavigation",
    label: "Routing, Params ו-Navigation",
    rootCause: "מתבלבלים בין path definition, URL בפועל, params וניווט בקוד.",
    repair: "כתוב את שלושת הדברים בנפרד: route pattern, example URL, ומה מחזיר useParams.",
    microDrill: "`/users/:id` עם `/users/42` → איזה key ומה value?",
    association: "Route הוא תבנית כתובת; params הם השדות שמולאו בטופס הכתובת.",
  },
  contextOveruseRerender: {
    id: "contextOveruseRerender",
    label: "Context Scope ו-Re-render",
    rootCause: "שמים ב-Context מידע שמשתנה הרבה או עוטפים אזור גדול מדי, ואז יותר מדי רכיבים מתרעננים.",
    repair: "פצל contexts לפי קצב שינוי, והשאר state מקומי כשלא צריך שיתוף רחב.",
    microDrill: "סמן לכל value ב-Context: מי קורא אותו וכמה פעמים הוא משתנה.",
    association: "Context הוא מערכת כריזה; לא מכריזים לכל הבניין על כל הקלדה.",
  },
  typeShape: {
    id: "typeShape",
    label: "סוג וצורה של ערך",
    rootCause: "מניחים שערך הוא מסוג/צורה מסוימים בלי לבדוק string/number/boolean/null/undefined/object.",
    repair: "לפני פעולה שאל: איזה type זה? האם הערך קיים? האם יש לו את ה-property שאני קורא?",
    microDrill: "כתוב `typeof` או guard קצר לפני שימוש בערך לא בטוח.",
    association: "לפני שמכניסים מפתח למנעול בודקים שהוא בכלל המפתח הנכון.",
  },
  typescriptNarrowing: {
    id: "typescriptNarrowing",
    label: "TypeScript Narrowing ו-Union Types",
    rootCause: "מתייחסים ל-union כאילו הוא כבר type אחד, או מדלגים על guard לפני גישה ל-property.",
    repair: "צמצם type עם `typeof`, `in`, discriminant או guard לפני שימוש בפרטים ספציפיים.",
    microDrill: "כתוב `if ('id' in value)` לפני גישה ל-`value.id` ב-union.",
    association: "Union הוא קופסה עם כמה אפשרויות; narrowing הוא פתיחת התווית לפני שימוש.",
  },
  functionReturn: {
    id: "functionReturn",
    label: "קלט/פלט של פונקציה",
    rootCause: "מסתכלים על מה שקורה בתוך הפונקציה אבל שוכחים מה היא מקבלת ומה היא מחזירה.",
    repair: "כתוב חתימה מילולית: הפונקציה מקבלת X ומחזירה Y.",
    microDrill: "לכל פונקציה כתוב דוגמת input אחת ודוגמת output אחת.",
    association: "פונקציה היא מכונה: חומר גלם נכנס, תוצר יוצא.",
  },
  keyValueShape: {
    id: "keyValueShape",
    label: "Key / Value / Object Shape",
    rootCause: "מתבלבלים בין שם השדה, הערך שבתוכו, והדרך לגשת אליו.",
    repair: "קרא object כטבלה קטנה: key הוא שם העמודה, value הוא מה שבתא.",
    microDrill: "כתוב ליד כל property: key → value.",
    association: "Object הוא מילון: המילה היא key, הפירוש הוא value.",
  },
  moduleBoundary: {
    id: "moduleBoundary",
    label: "Modules, import/export ו-runtime boundary",
    rootCause: "מערבבים default/named export, CommonJS/ESM, או קוד שרץ בשרת מול קוד שרץ בדפדפן.",
    repair: "בדוק איך הקובץ מייצא, איפה הוא רץ, ומה מותר לייבא בסביבה הזאת.",
    microDrill: "כתוב לכל import: named או default, browser או Node.",
    association: "Module הוא חדר עם דלתות מסומנות; צריך לדעת מאיזו דלת נכנסים ויוצאים.",
  },
  conceptGap: {
    id: "conceptGap",
    label: "פער מושגי כללי",
    rootCause: "התשובה מצביעה על פער במושג עצמו ולא על דפוס טעות ספציפי שזוהה.",
    repair: "חזור להסבר הפשוט, קרא את דרישות הקדם, ואז ענה על שאלה דומה אחת.",
    microDrill: "כתוב במשפט אחד: מה המושג עושה ולמה צריך אותו.",
    association: "לפני שמרכיבים מנוע חוזרים לזהות את החלק הבודד.",
  },
});

const MISCONCEPTION_RULES = Object.freeze([
  { id: "zeroBasedIndex", terms: ["index", "אינדקס", "arr[", "array[", "איבר השני", "מתחיל מ-0", "מיקום"] },
  { id: "referenceVsValue", terms: ["reference", "by reference", "by value", "pointer", "מצביע", "העתק", "כתובת", "reference -"] },
  { id: "stateSetterAsync", terms: ["setstate", "set state", "setcount", "setitems", "usestate", "batching", "stale state", "functional update", "prev =>", "עדכון state"] },
  { id: "mutationVsImmutability", terms: ["mutation", "mutate", "immutable", "immutability", "push", "splice", "state", "setstate", "עותק חדש"] },
  { id: "truthinessEquality", terms: ["truthy", "falsy", "==", "===", "!=", "!==", "boolean(", "המרת טיפוס", "השוואה"] },
  { id: "reducerAccumulator", terms: ["reduce", "accumulator", "acc", "current", "initialvalue", "ערך התחלתי", "צמצום"] },
  { id: "arrayMethodChoice", terms: ["map", "filter", "find", "foreach", "forEach", "מתודת מערך", "לסנן", "להחזיר מערך חדש"] },
  { id: "scopeClosure", terms: ["scope", "closure", "hoist", "var", "let", "const", "סגירה", "טווח", "בלוק"] },
  { id: "apiRequestResponse", terms: ["http", "status", "response", "request", "json", "res.json", "response.json", "express", "rest", "api"] },
  { id: "asyncOrder", terms: ["async", "await", "promise", "fetch", "then", "catch", "אסינכרוני"] },
  { id: "effectDependencies", terms: ["useeffect", "dependency", "dependencies", "cleanup", "תלויות", "מערך התלויות"] },
  { id: "propsStateOwnership", terms: ["props", "prop drilling", "source of truth", "controlled", "uncontrolled", "state ownership", "הורה", "ילד"] },
  { id: "componentRenderCycle", terms: ["render", "rerender", "re-render", "side effect", "side-effect", "component", "קומפוננטה", "רינדור"] },
  { id: "eventHandlerInvocation", terms: ["onclick", "onchange", "handler", "event", "save()", "handleclick", "=>", "אירוע"] },
  { id: "routingParamsNavigation", terms: ["router", "route", "params", "useparams", "usenavigate", "navigate", "path", "url"] },
  { id: "contextOveruseRerender", terms: ["context", "usecontext", "provider", "consumer", "rerender", "re-render", "גלובלי"] },
  { id: "typescriptNarrowing", terms: ["typescript", "union", "interface", "type guard", "narrowing", "generic", "optional", "ts"] },
  { id: "typeShape", terms: ["typeof", "type", "string", "number", "boolean", "undefined", "null", "nan", "סוג"] },
  { id: "functionReturn", terms: ["return", "function", "פונקציה", "מחזיר", "פרמטר", "argument"] },
  { id: "moduleBoundary", terms: ["import", "export", "module", "commonjs", "esm", "require", "node", "fs", "server", "browser"] },
  { id: "keyValueShape", terms: ["object", "key", "value", "property", "json", "map", "אובייקט", "מפתח"] },
]);

export function misconceptionCardIds({ includeFallback = true } = {}) {
  return Object.keys(MISCONCEPTION_CARDS)
    .filter((id) => includeFallback || id !== "conceptGap")
    .sort();
}

export function emptyMistakeAgentState() {
  return {
    version: MISTAKE_AGENT_VERSION,
    concepts: {},
    topics: {},
    misconceptions: {},
    teachBacks: [],
    retestQueue: [],
    log: [],
  };
}

function stableMistakeId(input) {
  const text = String(input || "");
  let hash = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36).padStart(7, "0");
}

function safeText(value, max = 700) {
  return String(value || "").trim().slice(0, max);
}

export function splitConceptKey(conceptKey) {
  const [lessonId, ...rest] = String(conceptKey || "").split("::");
  return {
    lessonId: lessonId || "",
    conceptName: rest.join("::") || "",
  };
}

export function topicMetaForLesson(lessonId, taxonomy = {}) {
  const meta = taxonomy[lessonId] || {};
  return {
    topic: meta.topic || "אחר",
    subtopic: meta.subtopic || "",
    emoji: meta.emoji || "📂",
  };
}

function textFromAnalogy(value) {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value.text === "string") return value.text;
  if (typeof value.body === "string") return value.body;
  return "";
}

export function conceptAssociation(concept = {}) {
  if (typeof concept.analogy === "string" && concept.analogy.trim()) {
    return concept.analogy.trim();
  }

  if (Array.isArray(concept.analogies)) {
    const first = concept.analogies.map(textFromAnalogy).find((item) => item.trim());
    if (first) return first.trim();
  } else if (concept.analogies && typeof concept.analogies === "object") {
    const preferred = [
      concept.analogies.grandma,
      concept.analogies.child,
      concept.analogies.parent,
      concept.analogies.technical,
    ];
    const first = preferred.map(textFromAnalogy).find((item) => item.trim());
    if (first) return first.trim();
  }

  if (concept.levels && typeof concept.levels.grandma === "string" && concept.levels.grandma.trim()) {
    return concept.levels.grandma.trim();
  }

  if (typeof concept.illustration === "string" && concept.illustration.trim()) {
    return concept.illustration.trim();
  }

  return "";
}

export function correctAnswerText(question = {}, kind = "mc") {
  if (kind === "fill") return String(question.answer || "");
  if (kind === "trace") {
    return (question.steps || [])
      .map((step) => step && step.answer)
      .filter(Boolean)
      .join(" → ");
  }

  const idx =
    Number.isInteger(question.correctIndex)
      ? question.correctIndex
      : Number.isInteger(question.correct)
        ? question.correct
        : null;
  if (idx == null) return "";
  return String((question.options || [])[idx] || "");
}

export function selectedAnswerText(question = {}, { kind = "mc", selectedIdx = null, answer = "" } = {}) {
  if (kind === "fill") return String(answer || "");
  if (kind === "trace" && answer && Array.isArray(answer.steps)) {
    return answer.steps.filter(Boolean).join(" → ");
  }
  if (Number.isInteger(selectedIdx)) return String((question.options || [])[selectedIdx] || "");
  return "";
}

function searchableMistakeText(record = {}) {
  return [
    record.conceptName,
    record.kind,
    record.questionId,
    record.questionText,
    record.selectedAnswer,
    record.correctAnswer,
    record.explanation,
  ]
    .map((item) => String(item || "").toLowerCase())
    .join(" ");
}

export function inferMisconception(record = {}) {
  const haystack = searchableMistakeText(record);
  const rule = MISCONCEPTION_RULES.find((candidate) =>
    candidate.terms.some((term) => haystack.includes(String(term).toLowerCase())),
  );
  const card = MISCONCEPTION_CARDS[rule ? rule.id : "conceptGap"];
  return { ...card };
}

export function teachBackPromptForRecord(state, record, { threshold = 2 } = {}) {
  if (!record || !record.conceptKey || !record.misconception) return null;
  const misconceptionId = record.misconception.id || "conceptGap";
  const conceptStats = state?.concepts?.[record.conceptKey] || {};
  const misconceptionStats = state?.misconceptions?.[misconceptionId] || {};
  const conceptRepeat = (conceptStats.misconceptions || {})[misconceptionId] || 0;
  const globalRepeat = misconceptionStats.count || 0;
  const repeatCount = Math.max(conceptRepeat, globalRepeat);
  if (repeatCount < threshold) return null;

  return {
    id: `tb-${stableMistakeId([
      record.conceptKey,
      misconceptionId,
      record.questionId,
      record.timestamp,
      repeatCount,
    ].join("|"))}`,
    conceptKey: record.conceptKey,
    lessonId: record.lessonId,
    conceptName: record.conceptName,
    topic: record.topic,
    misconceptionId,
    misconceptionLabel: record.misconception.label,
    repeatCount,
    minChars: 18,
    prompt:
      `הסבר במילים שלך למה התשובה הנכונה קשורה ל-${record.misconception.label}, ` +
      "ואיזה סימן יעזור לך לזהות את זה בפעם הבאה.",
  };
}

function retestId(record = {}, stage = "") {
  return `rt-${stableMistakeId([
    record.conceptKey,
    record.questionId,
    record.misconception?.id || "conceptGap",
    stage,
  ].join("|"))}`;
}

export function makeMistakeRecord({
  conceptKey,
  topicMeta = {},
  concept = {},
  question = {},
  kind = "mc",
  selectedIdx = null,
  answer = "",
  mode = "question",
  timestamp = Date.now(),
} = {}) {
  const parts = splitConceptKey(conceptKey);
  const normalizedTopic = {
    topic: topicMeta.topic || "אחר",
    subtopic: topicMeta.subtopic || "",
    emoji: topicMeta.emoji || "📂",
  };

  const record = {
    conceptKey: String(conceptKey || ""),
    lessonId: parts.lessonId,
    conceptName: concept.conceptName || parts.conceptName,
    topic: normalizedTopic.topic,
    subtopic: normalizedTopic.subtopic,
    topicEmoji: normalizedTopic.emoji,
    kind,
    mode,
    questionId: question.id || "",
    questionText: question.question || question.title || question.prompt || "",
    selectedAnswer: selectedAnswerText(question, { kind, selectedIdx, answer }),
    correctAnswer: correctAnswerText(question, kind),
    explanation: question.explanation || "",
    association: conceptAssociation(concept),
    timestamp,
  };
  return {
    ...record,
    misconception: inferMisconception(record),
  };
}

export function updateMistakeState(state, record, { maxLog = 80 } = {}) {
  const base = state && typeof state === "object" ? state : emptyMistakeAgentState();
  const next = {
    version: MISTAKE_AGENT_VERSION,
    concepts: { ...(base.concepts || {}) },
    topics: { ...(base.topics || {}) },
    misconceptions: { ...(base.misconceptions || {}) },
    teachBacks: Array.isArray(base.teachBacks) ? [...base.teachBacks] : [],
    retestQueue: Array.isArray(base.retestQueue) ? [...base.retestQueue] : [],
    log: Array.isArray(base.log) ? [...base.log] : [],
  };

  if (!record || !record.conceptKey) return next;

  const existingConcept = next.concepts[record.conceptKey] || {
    conceptKey: record.conceptKey,
    lessonId: record.lessonId,
    conceptName: record.conceptName,
    topic: record.topic,
    subtopic: record.subtopic,
    count: 0,
    firstSeen: record.timestamp,
  };
  next.concepts[record.conceptKey] = {
    ...existingConcept,
    conceptName: record.conceptName || existingConcept.conceptName,
    topic: record.topic || existingConcept.topic,
    subtopic: record.subtopic || existingConcept.subtopic,
    count: (existingConcept.count || 0) + 1,
    lastSeen: record.timestamp,
    lastKind: record.kind,
    lastMode: record.mode,
    misconceptions: {
      ...(existingConcept.misconceptions || {}),
      [record.misconception?.id || "conceptGap"]:
        ((existingConcept.misconceptions || {})[record.misconception?.id || "conceptGap"] || 0) + 1,
    },
  };

  const topicKey = record.topic || "אחר";
  const existingTopic = next.topics[topicKey] || {
    topic: topicKey,
    emoji: record.topicEmoji || "📂",
    count: 0,
    concepts: {},
    firstSeen: record.timestamp,
  };
  next.topics[topicKey] = {
    ...existingTopic,
    count: (existingTopic.count || 0) + 1,
    lastSeen: record.timestamp,
    concepts: {
      ...(existingTopic.concepts || {}),
      [record.conceptKey]: ((existingTopic.concepts || {})[record.conceptKey] || 0) + 1,
    },
  };

  const misconception = record.misconception || MISCONCEPTION_CARDS.conceptGap;
  const existingMisconception = next.misconceptions[misconception.id] || {
    id: misconception.id,
    label: misconception.label,
    rootCause: misconception.rootCause,
    repair: misconception.repair,
    microDrill: misconception.microDrill,
    association: misconception.association,
    count: 0,
    concepts: {},
    topics: {},
    firstSeen: record.timestamp,
  };
  next.misconceptions[misconception.id] = {
    ...existingMisconception,
    label: misconception.label,
    rootCause: misconception.rootCause,
    repair: misconception.repair,
    microDrill: misconception.microDrill,
    association: misconception.association,
    count: (existingMisconception.count || 0) + 1,
    lastSeen: record.timestamp,
    concepts: {
      ...(existingMisconception.concepts || {}),
      [record.conceptKey]: ((existingMisconception.concepts || {})[record.conceptKey] || 0) + 1,
    },
    topics: {
      ...(existingMisconception.topics || {}),
      [topicKey]: ((existingMisconception.topics || {})[topicKey] || 0) + 1,
    },
  };

  next.log.unshift({
    conceptKey: record.conceptKey,
    conceptName: record.conceptName,
    topic: record.topic,
    subtopic: record.subtopic,
    kind: record.kind,
    mode: record.mode,
    questionId: record.questionId,
    misconceptionId: misconception.id,
    misconceptionLabel: misconception.label,
    selectedAnswer: record.selectedAnswer,
    correctAnswer: record.correctAnswer,
    timestamp: record.timestamp,
  });
  next.log = next.log.slice(0, maxLog);

  return next;
}

export function appendTeachBackResponse(state, prompt, response, { timestamp = Date.now(), maxEntries = 80 } = {}) {
  const base = state && typeof state === "object" ? state : emptyMistakeAgentState();
  const cleanResponse = safeText(response);
  const cleanPrompt = prompt && typeof prompt === "object" ? prompt : {};
  const next = {
    version: MISTAKE_AGENT_VERSION,
    concepts: { ...(base.concepts || {}) },
    topics: { ...(base.topics || {}) },
    misconceptions: { ...(base.misconceptions || {}) },
    teachBacks: Array.isArray(base.teachBacks) ? [...base.teachBacks] : [],
    retestQueue: Array.isArray(base.retestQueue) ? [...base.retestQueue] : [],
    log: Array.isArray(base.log) ? [...base.log] : [],
  };
  if (!cleanPrompt.id || !cleanResponse) return next;

  const entry = {
    id: cleanPrompt.id,
    conceptKey: safeText(cleanPrompt.conceptKey, 180),
    lessonId: safeText(cleanPrompt.lessonId, 90),
    conceptName: safeText(cleanPrompt.conceptName, 120),
    topic: safeText(cleanPrompt.topic, 120),
    misconceptionId: safeText(cleanPrompt.misconceptionId, 80),
    misconceptionLabel: safeText(cleanPrompt.misconceptionLabel, 120),
    response: cleanResponse,
    responseLength: cleanResponse.length,
    timestamp,
  };

  next.teachBacks = [
    entry,
    ...next.teachBacks.filter((item) => item && item.id !== entry.id),
  ].slice(0, maxEntries);

  if (entry.misconceptionId && next.misconceptions[entry.misconceptionId]) {
    const existing = next.misconceptions[entry.misconceptionId];
    next.misconceptions[entry.misconceptionId] = {
      ...existing,
      teachBacks: (existing.teachBacks || 0) + 1,
      lastTeachBackAt: timestamp,
    };
  }

  return next;
}

export function scheduleAdaptiveRetests(
  state,
  record,
  {
    timestamp = Date.now(),
    nearTransferDelayMs = 0,
    delayedReviewDelayMs = 24 * 60 * 60 * 1000,
    maxQueue = 80,
  } = {},
) {
  const base = state && typeof state === "object" ? state : emptyMistakeAgentState();
  const next = {
    version: MISTAKE_AGENT_VERSION,
    concepts: { ...(base.concepts || {}) },
    topics: { ...(base.topics || {}) },
    misconceptions: { ...(base.misconceptions || {}) },
    teachBacks: Array.isArray(base.teachBacks) ? [...base.teachBacks] : [],
    retestQueue: Array.isArray(base.retestQueue) ? [...base.retestQueue] : [],
    log: Array.isArray(base.log) ? [...base.log] : [],
  };
  if (!record || !record.conceptKey) return next;

  const misconception = record.misconception || MISCONCEPTION_CARDS.conceptGap;
  const stages = [
    {
      stage: "near_transfer",
      dueAt: timestamp + nearTransferDelayMs,
      label: "שאלת תיקון קרובה",
      purpose: "לבדוק מיד אם ההסבר תיקן את שורש הטעות.",
    },
    {
      stage: "delayed_review",
      dueAt: timestamp + delayedReviewDelayMs,
      label: "חזרה מאוחרת",
      purpose: "לוודא שהידע נשמר אחרי מרווח זמן.",
    },
  ];

  stages.forEach((stage) => {
    const id = retestId(record, stage.stage);
    const existingIdx = next.retestQueue.findIndex((item) => item && item.id === id && item.status !== "done");
    const item = {
      id,
      stage: stage.stage,
      label: stage.label,
      purpose: stage.purpose,
      status: "pending",
      conceptKey: safeText(record.conceptKey, 180),
      lessonId: safeText(record.lessonId, 90),
      conceptName: safeText(record.conceptName, 120),
      topic: safeText(record.topic, 120),
      subtopic: safeText(record.subtopic, 120),
      questionId: safeText(record.questionId, 120),
      misconceptionId: safeText(misconception.id, 80),
      misconceptionLabel: safeText(misconception.label, 120),
      createdAt: timestamp,
      dueAt: stage.dueAt,
      attempts: existingIdx >= 0 ? next.retestQueue[existingIdx].attempts || 0 : 0,
    };
    if (existingIdx >= 0) {
      next.retestQueue[existingIdx] = {
        ...next.retestQueue[existingIdx],
        ...item,
        dueAt: Math.min(next.retestQueue[existingIdx].dueAt || item.dueAt, item.dueAt),
      };
    } else {
      next.retestQueue.push(item);
    }
  });

  next.retestQueue = next.retestQueue
    .sort((a, b) => (a.dueAt || 0) - (b.dueAt || 0) || String(a.id).localeCompare(String(b.id)))
    .slice(0, maxQueue);
  return next;
}

export function dueAdaptiveRetests(state, { now = Date.now(), limit = 3 } = {}) {
  const max = Math.max(1, Number(limit) || 1);
  const queue = Array.isArray(state && state.retestQueue) ? state.retestQueue : [];
  return queue
    .filter((item) => item && item.status === "pending" && Number(item.dueAt || 0) <= now)
    .sort((a, b) => (a.dueAt || 0) - (b.dueAt || 0) || String(a.id).localeCompare(String(b.id)))
    .slice(0, max);
}

export function recordRetestOutcome(
  state,
  itemId,
  correct,
  { timestamp = Date.now(), retryDelayMs = 10 * 60 * 1000 } = {},
) {
  const base = state && typeof state === "object" ? state : emptyMistakeAgentState();
  const next = {
    version: MISTAKE_AGENT_VERSION,
    concepts: { ...(base.concepts || {}) },
    topics: { ...(base.topics || {}) },
    misconceptions: { ...(base.misconceptions || {}) },
    teachBacks: Array.isArray(base.teachBacks) ? [...base.teachBacks] : [],
    retestQueue: Array.isArray(base.retestQueue) ? [...base.retestQueue] : [],
    log: Array.isArray(base.log) ? [...base.log] : [],
  };
  const idx = next.retestQueue.findIndex((item) => item && item.id === itemId);
  if (idx < 0) return next;
  const item = next.retestQueue[idx];
  next.retestQueue[idx] = {
    ...item,
    attempts: (item.attempts || 0) + 1,
    lastAttemptAt: timestamp,
    lastCorrect: Boolean(correct),
    status: correct ? "done" : "pending",
    completedAt: correct ? timestamp : item.completedAt,
    dueAt: correct ? item.dueAt : timestamp + retryDelayMs,
  };
  return next;
}
