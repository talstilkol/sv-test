// data/svcollege_traces_lesson15_activity.js
// P6.3.1 — real Trace activity coverage for SVCollege lesson 15 gaps.

var SVCOLLEGE_LESSON15_ACTIVITY_TRACES = [
  {
    id: "trace_l15_anonymous_function_001",
    conceptKey: "lesson_15::anonymous function",
    level: 4,
    title: "anonymous function נשמרת בתוך משתנה",
    code:
      "const double = function(value) {\n" +
      "  return value * 2;\n" +
      "};\n" +
      "const result = double(4);\n" +
      "console.log(result);\n" +
      "console.log(double.name);",
    steps: [
      {
        line: 4,
        prompt: "איזה ערך נשלח לפונקציה האנונימית?",
        answer: "4",
        acceptable: ["4"],
        hint: "הקריאה היא double(4).",
      },
      {
        line: 5,
        prompt: "מה יודפס עבור result?",
        answer: "8",
        acceptable: ["8"],
        hint: "הפונקציה מחזירה value * 2.",
      },
      {
        line: 6,
        prompt: "איפה נשמרת הפונקציה?",
        answer: "double",
        acceptable: ["double", "במשתנה double"],
        hint: "הפונקציה עצמה לא קיבלה שם אחרי המילה function.",
      },
    ],
    explanation:
      "anonymous function היא פונקציה ללא שם ישיר. בדרך כלל שומרים אותה במשתנה או מעבירים אותה כ-callback.",
    requiredConcepts: ["lesson_15::anonymous function", "lesson_11::function"],
    requiredTerms: ["anonymous function", "function expression", "callback"],
  },
  {
    id: "trace_l15_catch_001",
    conceptKey: "lesson_15::catch",
    level: 4,
    title: "catch תופס שגיאה מתוך try",
    code:
      "let message = 'start';\n" +
      "try {\n" +
      "  JSON.parse('not valid json');\n" +
      "  message = 'success';\n" +
      "} catch (error) {\n" +
      "  message = 'caught: ' + error.name;\n" +
      "}\n" +
      "console.log(message);",
    steps: [
      {
        line: 3,
        prompt: "איזו שורה גורמת לשגיאה?",
        answer: "JSON.parse",
        acceptable: ["JSON.parse", "שורה 3"],
        hint: "המחרוזת אינה JSON תקין.",
      },
      {
        line: 4,
        prompt: "האם message הופך ל-success?",
        answer: "לא",
        acceptable: ["לא", "false", "no"],
        hint: "אחרי שגיאה קופצים מיד ל-catch.",
      },
      {
        line: 8,
        prompt: "מה מתחילת ההודעה שתודפס?",
        answer: "caught:",
        acceptable: ["caught:", "caught"],
        hint: "catch מעדכן את message.",
      },
    ],
    explanation:
      "catch הוא ה-handler של שגיאה שנזרקה בתוך try. הוא מקבל את אובייקט השגיאה ומאפשר התאוששות במקום קריסה.",
    requiredConcepts: ["lesson_15::catch", "lesson_15::Error Object"],
    requiredTerms: ["catch", "try", "error"],
  },
  {
    id: "trace_l15_catch_promise_001",
    conceptKey: "lesson_15::catch (Promise)",
    level: 5,
    title: "catch של Promise מטפל ב-reject",
    code:
      "const request = Promise.reject(new Error('offline'));\n" +
      "request\n" +
      "  .then(() => 'success')\n" +
      "  .catch((error) => 'failed: ' + error.message)\n" +
      "  .then((status) => console.log(status));",
    steps: [
      {
        line: 1,
        prompt: "באיזה מצב מתחיל ה-Promise?",
        answer: "rejected",
        acceptable: ["rejected", "reject", "נדחה"],
        hint: "Promise.reject יוצר Promise דחוי.",
      },
      {
        line: 3,
        prompt: "האם ה-then הראשון ירוץ?",
        answer: "לא",
        acceptable: ["לא", "false", "no"],
        hint: "then של הצלחה לא רץ כאשר ה-Promise כבר rejected.",
      },
      {
        line: 5,
        prompt: "מה יודפס בסוף?",
        answer: "failed: offline",
        acceptable: ["failed: offline"],
        hint: "catch מחזיר string שה-then הבא מקבל כ-status.",
      },
    ],
    explanation:
      "catch בשרשרת Promise תופס reject או שגיאה שנזרקה לפניו, ומחזיר ערך שממשיך ל-then הבא כפתרון חדש.",
    requiredConcepts: ["lesson_15::catch (Promise)", "lesson_15::reject", "lesson_15::then"],
    requiredTerms: ["Promise.catch", "reject", "then"],
  },
  {
    id: "trace_l15_error_001",
    conceptKey: "lesson_15::Error",
    level: 4,
    title: "Error מייצג תקלה בזמן ריצה",
    code:
      "const error = new Error('Missing email');\n" +
      "console.log(error instanceof Error);\n" +
      "console.log(error.message);\n" +
      "console.log(error.name);",
    steps: [
      {
        line: 2,
        prompt: "האם error הוא מופע של Error?",
        answer: "true",
        acceptable: ["true"],
        hint: "נוצר עם new Error.",
      },
      {
        line: 3,
        prompt: "מה הודעת השגיאה?",
        answer: "Missing email",
        acceptable: ["Missing email"],
        hint: "זו המחרוזת שנשלחה ל-constructor.",
      },
      {
        line: 4,
        prompt: "מה שם ברירת המחדל של Error?",
        answer: "Error",
        acceptable: ["Error"],
        hint: "new Error יוצר אובייקט בשם Error.",
      },
    ],
    explanation:
      "Error הוא אובייקט מובנה שמתאר תקלה. הוא מחזיק message, name ובדרך כלל stack trace לדיבוג.",
    requiredConcepts: ["lesson_15::Error", "lesson_15::Error Object"],
    requiredTerms: ["Error", "message", "name"],
  },
  {
    id: "trace_l15_error_object_001",
    conceptKey: "lesson_15::Error Object",
    level: 5,
    title: "Error Object מחזיק name ו-message",
    code:
      "function readUser(user) {\n" +
      "  if (!user) throw new TypeError('user is required');\n" +
      "  return user.name;\n" +
      "}\n" +
      "try {\n" +
      "  readUser(null);\n" +
      "} catch (error) {\n" +
      "  console.log(error.name);\n" +
      "  console.log(error.message);\n" +
      "}",
    steps: [
      {
        line: 2,
        prompt: "איזה סוג Error נזרק?",
        answer: "TypeError",
        acceptable: ["TypeError"],
        hint: "הקוד משתמש ב-new TypeError.",
      },
      {
        line: 8,
        prompt: "מה יודפס עבור error.name?",
        answer: "TypeError",
        acceptable: ["TypeError"],
        hint: "name מגיע מסוג האובייקט שנזרק.",
      },
      {
        line: 9,
        prompt: "מה error.message?",
        answer: "user is required",
        acceptable: ["user is required"],
        hint: "זו הודעת ה-TypeError.",
      },
    ],
    explanation:
      "Error Object הוא אובייקט שגיאה עם שדות אבחון כמו name, message ו-stack. catch מקבל את האובייקט הזה.",
    requiredConcepts: ["lesson_15::Error Object", "lesson_15::throw", "lesson_15::catch"],
    requiredTerms: ["Error Object", "TypeError", "message"],
  },
  {
    id: "trace_l15_exception_001",
    conceptKey: "lesson_15::Exception",
    level: 5,
    title: "Exception משנה את זרימת הקוד",
    code:
      "function parseCount(value) {\n" +
      "  const count = Number(value);\n" +
      "  if (Number.isNaN(count)) {\n" +
      "    throw new Error('count must be a number');\n" +
      "  }\n" +
      "  return count;\n" +
      "}\n" +
      "try {\n" +
      "  console.log(parseCount('abc'));\n" +
      "} catch (error) {\n" +
      "  console.log('fallback');\n" +
      "}",
    steps: [
      {
        line: 3,
        prompt: "האם Number('abc') הוא מספר תקין?",
        answer: "לא",
        acceptable: ["לא", "false", "NaN"],
        hint: "Number.isNaN(count) יחזיר true.",
      },
      {
        line: 4,
        prompt: "מה קורה כשהקוד מגיע ל-throw?",
        answer: "קופץ ל-catch",
        acceptable: ["catch", "קופץ ל-catch", "נזרקת חריגה"],
        hint: "Exception שוברת את הזרימה הרגילה.",
      },
      {
        line: 11,
        prompt: "מה יודפס בסוף?",
        answer: "fallback",
        acceptable: ["fallback"],
        hint: "ה-catch מטפל בחריגה.",
      },
    ],
    explanation:
      "Exception היא שגיאה שנזרקת בזמן ריצה ומשנה control flow. אם יש catch מתאים, אפשר לטפל בה ולהמשיך.",
    requiredConcepts: ["lesson_15::Exception", "lesson_15::throw", "lesson_15::catch"],
    requiredTerms: ["Exception", "control flow", "catch"],
  },
  {
    id: "trace_l15_fetch_001",
    conceptKey: "lesson_15::fetch",
    level: 5,
    title: "fetch מחזיר Promise של Response",
    code:
      "const response = { ok: true, status: 200 };\n" +
      "const fetchUser = () => Promise.resolve(response);\n" +
      "fetchUser()\n" +
      "  .then((res) => res.status)\n" +
      "  .then((status) => console.log(status));",
    steps: [
      {
        line: 2,
        prompt: "מה fetchUser מחזירה?",
        answer: "Promise",
        acceptable: ["Promise", "Promise.resolve"],
        hint: "הפונקציה מחזירה Promise.resolve(response).",
      },
      {
        line: 4,
        prompt: "איזה ערך ה-then הראשון מחזיר?",
        answer: "200",
        acceptable: ["200"],
        hint: "res.status הוא 200.",
      },
      {
        line: 5,
        prompt: "מה יודפס?",
        answer: "200",
        acceptable: ["200"],
        hint: "ה-then השני מקבל את status.",
      },
    ],
    explanation:
      "fetch אמיתי מחזיר Promise של Response. בתרגיל משתמשים ב-Promise.resolve כדי לתרגל את אותה שרשרת בלי לבצע בקשת רשת.",
    requiredConcepts: ["lesson_15::fetch", "lesson_15::then"],
    requiredTerms: ["fetch", "Promise", "Response"],
  },
  {
    id: "trace_l15_reject_001",
    conceptKey: "lesson_15::reject",
    level: 4,
    title: "reject מסמן Promise שנכשל",
    code:
      "const task = new Promise((resolve, reject) => {\n" +
      "  const hasNetwork = false;\n" +
      "  if (hasNetwork) resolve('loaded');\n" +
      "  reject(new Error('network down'));\n" +
      "});\n" +
      "task.catch((error) => console.log(error.message));",
    steps: [
      {
        line: 2,
        prompt: "מה הערך של hasNetwork?",
        answer: "false",
        acceptable: ["false"],
        hint: "המשתנה נקבע במפורש ל-false.",
      },
      {
        line: 4,
        prompt: "איזו פעולה תרוץ: resolve או reject?",
        answer: "reject",
        acceptable: ["reject"],
        hint: "התנאי של resolve לא מתקיים.",
      },
      {
        line: 6,
        prompt: "מה הודעת השגיאה שתודפס?",
        answer: "network down",
        acceptable: ["network down"],
        hint: "catch מקבל את ה-Error שנשלח ל-reject.",
      },
    ],
    explanation:
      "reject מעביר Promise למצב כישלון. catch או then עם handler של שגיאה יכולים לטפל בערך שנדחה.",
    requiredConcepts: ["lesson_15::reject", "lesson_15::catch (Promise)"],
    requiredTerms: ["reject", "Promise", "catch"],
  },
  {
    id: "trace_l15_resolve_001",
    conceptKey: "lesson_15::resolve",
    level: 4,
    title: "resolve מסמן Promise שהצליח",
    code:
      "const task = new Promise((resolve) => {\n" +
      "  const payload = { count: 3 };\n" +
      "  resolve(payload);\n" +
      "});\n" +
      "task.then((data) => console.log(data.count));",
    steps: [
      {
        line: 3,
        prompt: "איזה ערך נשלח ל-resolve?",
        answer: "payload",
        acceptable: ["payload", "{ count: 3 }"],
        hint: "resolve מקבל את האובייקט payload.",
      },
      {
        line: 5,
        prompt: "איזה callback מקבל את data?",
        answer: "then",
        acceptable: ["then", ".then"],
        hint: "then מטפל במצב fulfilled.",
      },
      {
        line: 5,
        prompt: "מה יודפס?",
        answer: "3",
        acceptable: ["3"],
        hint: "data.count הוא 3.",
      },
    ],
    explanation:
      "resolve מעביר Promise למצב הצלחה ומוסר את הערך ל-handler הבא ב-then.",
    requiredConcepts: ["lesson_15::resolve", "lesson_15::then"],
    requiredTerms: ["resolve", "fulfilled", "then"],
  },
  {
    id: "trace_l15_scope_001",
    conceptKey: "lesson_15::Scope",
    level: 4,
    title: "Scope קובע איפה משתנה זמין",
    code:
      "const outer = 'global';\n" +
      "function readScope() {\n" +
      "  const inner = 'local';\n" +
      "  return outer + '-' + inner;\n" +
      "}\n" +
      "console.log(readScope());\n" +
      "console.log(typeof inner);",
    steps: [
      {
        line: 4,
        prompt: "איזה משתנה מגיע מה-scope החיצוני?",
        answer: "outer",
        acceptable: ["outer"],
        hint: "outer הוגדר מחוץ לפונקציה.",
      },
      {
        line: 6,
        prompt: "מה readScope מחזירה?",
        answer: "global-local",
        acceptable: ["global-local"],
        hint: "הפונקציה מחברת outer ו-inner.",
      },
      {
        line: 7,
        prompt: "מה typeof inner מחוץ לפונקציה?",
        answer: "undefined",
        acceptable: ["undefined"],
        hint: "inner הוא משתנה מקומי לפונקציה.",
      },
    ],
    explanation:
      "Scope מגדיר את גבולות הגישה למשתנים. משתנה פנימי לפונקציה אינו זמין מבחוץ, אבל הפונקציה יכולה לקרוא משתנה חיצוני.",
    requiredConcepts: ["lesson_15::Scope", "lesson_11::scope"],
    requiredTerms: ["Scope", "global", "local"],
  },
  {
    id: "trace_l15_set_timeout_001",
    conceptKey: "lesson_15::setTimeout",
    level: 4,
    title: "setTimeout דוחה callback לאחר הסינכרוני",
    code:
      "const order = [];\n" +
      "order.push('A');\n" +
      "setTimeout(() => {\n" +
      "  console.log('B');\n" +
      "}, 0);\n" +
      "order.push('C');\n" +
      "console.log(order.join(''));\n",
    steps: [
      {
        line: 2,
        prompt: "איזה ערך נכנס ראשון ל-order?",
        answer: "A",
        acceptable: ["A"],
        hint: "push הראשון רץ סינכרונית.",
      },
      {
        line: 6,
        prompt: "מה נוסף לפני callback של setTimeout?",
        answer: "C",
        acceptable: ["C"],
        hint: "גם delay 0 לא עוצר את הקוד הסינכרוני.",
      },
      {
        line: 4,
        prompt: "מה יודפס אחרון?",
        answer: "B",
        acceptable: ["B"],
        hint: "callback של setTimeout נכנס לתור.",
      },
    ],
    explanation:
      "setTimeout מקבל callback ומריץ אותו מאוחר יותר דרך event loop. הקוד הסינכרוני ממשיך לרוץ קודם.",
    requiredConcepts: ["lesson_15::setTimeout", "lesson_15::Synchronous"],
    requiredTerms: ["setTimeout", "callback", "event loop"],
  },
  {
    id: "trace_l15_synchronous_001",
    conceptKey: "lesson_15::Synchronous",
    level: 3,
    title: "Synchronous רץ שורה אחרי שורה",
    code:
      "const steps = [];\n" +
      "steps.push('first');\n" +
      "steps.push('second');\n" +
      "steps.push('third');\n" +
      "console.log(steps.join(' -> '));",
    steps: [
      {
        line: 2,
        prompt: "איזה ערך נכנס ראשון?",
        answer: "first",
        acceptable: ["first"],
        hint: "הקוד רץ לפי סדר השורות.",
      },
      {
        line: 4,
        prompt: "איזה ערך נכנס אחרון?",
        answer: "third",
        acceptable: ["third"],
        hint: "זו פעולת push האחרונה.",
      },
      {
        line: 5,
        prompt: "מה סדר ההדפסה?",
        answer: "first -> second -> third",
        acceptable: ["first -> second -> third"],
        hint: "אין כאן callback או Promise שמשנים סדר.",
      },
    ],
    explanation:
      "קוד סינכרוני רץ לפי סדר השורות וחוסם את ההמשך עד שהפעולה הנוכחית מסתיימת.",
    requiredConcepts: ["lesson_15::Synchronous", "lesson_11::Array"],
    requiredTerms: ["Synchronous", "execution order", "call stack"],
  },
  {
    id: "trace_l15_then_001",
    conceptKey: "lesson_15::then",
    level: 4,
    title: "then מקבל ערך מ-Promise fulfilled",
    code:
      "Promise.resolve(5)\n" +
      "  .then((value) => value + 1)\n" +
      "  .then((value) => value * 2)\n" +
      "  .then((value) => console.log(value));",
    steps: [
      {
        line: 1,
        prompt: "מה הערך ההתחלתי של ה-Promise?",
        answer: "5",
        acceptable: ["5"],
        hint: "Promise.resolve(5).",
      },
      {
        line: 2,
        prompt: "מה הערך אחרי ה-then הראשון?",
        answer: "6",
        acceptable: ["6"],
        hint: "value + 1.",
      },
      {
        line: 4,
        prompt: "מה יודפס בסוף?",
        answer: "12",
        acceptable: ["12"],
        hint: "6 כפול 2.",
      },
    ],
    explanation:
      "then מקבל ערך מ-Promise שהצליח. הערך שחוזר מכל then עובר ל-then הבא בשרשרת.",
    requiredConcepts: ["lesson_15::then", "lesson_15::resolve"],
    requiredTerms: ["then", "Promise", "fulfilled"],
  },
  {
    id: "trace_l15_throw_001",
    conceptKey: "lesson_15::throw",
    level: 4,
    title: "throw עוצר פונקציה ומעביר ל-catch",
    code:
      "function requireName(name) {\n" +
      "  if (!name) {\n" +
      "    throw new Error('name required');\n" +
      "  }\n" +
      "  return name.toUpperCase();\n" +
      "}\n" +
      "try {\n" +
      "  console.log(requireName(''));\n" +
      "} catch (error) {\n" +
      "  console.log(error.message);\n" +
      "}",
    steps: [
      {
        line: 2,
        prompt: "האם התנאי !name מתקיים עבור מחרוזת ריקה?",
        answer: "כן",
        acceptable: ["כן", "true", "yes"],
        hint: "מחרוזת ריקה היא falsy.",
      },
      {
        line: 5,
        prompt: "האם return name.toUpperCase רץ?",
        answer: "לא",
        acceptable: ["לא", "false", "no"],
        hint: "throw עוצר את המשך הפונקציה.",
      },
      {
        line: 10,
        prompt: "מה יודפס ב-catch?",
        answer: "name required",
        acceptable: ["name required"],
        hint: "זו הודעת ה-Error שנזרק.",
      },
    ],
    explanation:
      "throw יוזם חריגה ועוצר את הזרימה הרגילה. אם הקריאה עטופה ב-try/catch, ה-catch מקבל את אובייקט השגיאה.",
    requiredConcepts: ["lesson_15::throw", "lesson_15::catch", "lesson_15::Error"],
    requiredTerms: ["throw", "Error", "catch"],
  },
];

(function appendLesson15ActivityTraces() {
  if (typeof window === "undefined") return;
  if (!window.QUESTIONS_TRACE) window.QUESTIONS_TRACE = [];
  const existing = new Set(window.QUESTIONS_TRACE.map((item) => item && item.id).filter(Boolean));
  SVCOLLEGE_LESSON15_ACTIVITY_TRACES.forEach((item) => {
    if (!existing.has(item.id)) window.QUESTIONS_TRACE.push(item);
  });
  if (window.QUESTIONS_BANK) {
    window.QUESTIONS_BANK.trace = window.QUESTIONS_TRACE;
  }
})();
