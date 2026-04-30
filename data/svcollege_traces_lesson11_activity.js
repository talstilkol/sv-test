// data/svcollege_traces_lesson11_activity.js
// P6.3.1 — real Trace activity coverage for SVCollege lesson 11 gaps.

var SVCOLLEGE_LESSON11_ACTIVITY_TRACES = [
  {
    id: "trace_l11_arrow_function_001",
    conceptKey: "lesson_11::arrow function",
    level: 3,
    title: "arrow function עם return מקוצר",
    code:
      "const addTax = (price) => price * 1.17;\n" +
      "const total = addTax(100);\n" +
      "console.log(total);",
    steps: [
      {
        line: 1,
        prompt: "איזה ערך הפונקציה מחזירה עבור 100?",
        answer: "117",
        acceptable: ["117", "117.0"],
        hint: "ב-arrow function בלי סוגריים מסולסלים, הביטוי אחרי החץ מוחזר אוטומטית.",
      },
      {
        line: 3,
        prompt: "מה יודפס בקונסול?",
        answer: "117",
        acceptable: ["117", "117.0"],
        hint: "total קיבל את הערך שהוחזר מ-addTax.",
      },
    ],
    explanation:
      "Arrow function עם ביטוי יחיד מחזירה את הביטוי ישירות. כאן price=100 ולכן 100 * 1.17 מחזיר 117.",
    requiredConcepts: ["lesson_11::function", "lesson_11::arrow function"],
    requiredTerms: ["arrow function", "return", "parameter"],
  },
  {
    id: "trace_l11_boolean_001",
    conceptKey: "lesson_11::boolean",
    level: 2,
    title: "boolean מתנאי השוואה",
    code:
      "const score = 82;\n" +
      "const passed = score >= 60;\n" +
      "console.log(passed);",
    steps: [
      {
        line: 2,
        prompt: "מה הערך של passed?",
        answer: "true",
        acceptable: ["true", "אמת"],
        hint: "82 גדול או שווה ל-60, לכן ההשוואה מחזירה true.",
      },
      {
        line: 3,
        prompt: "מה יודפס בקונסול?",
        answer: "true",
        acceptable: ["true", "אמת"],
        hint: "console.log מדפיס את הערך הבוליאני עצמו.",
      },
    ],
    explanation:
      "Boolean הוא ערך true/false. אופרטור השוואה כמו >= מחזיר ערך בוליאני שאפשר לשמור במשתנה.",
    requiredConcepts: ["lesson_11::boolean"],
    requiredTerms: ["boolean", "comparison", "true", "false"],
  },
  {
    id: "trace_l11_by_value_001",
    conceptKey: "lesson_11::By Value",
    level: 3,
    title: "העתקת primitive לפי ערך",
    code:
      "let a = 5;\n" +
      "let b = a;\n" +
      "b = b + 2;\n" +
      "console.log(a);\n" +
      "console.log(b);",
    steps: [
      {
        line: 2,
        prompt: "מה הערך של b מיד אחרי ההעתקה?",
        answer: "5",
        acceptable: ["5"],
        hint: "number הוא primitive, ולכן b מקבל עותק של הערך.",
      },
      {
        line: 4,
        prompt: "מה יודפס עבור a?",
        answer: "5",
        acceptable: ["5"],
        hint: "שינוי b לא משנה את a כי ההעתקה הייתה לפי ערך.",
      },
      {
        line: 5,
        prompt: "מה יודפס עבור b?",
        answer: "7",
        acceptable: ["7"],
        hint: "b התחיל ב-5 ואז קיבל b + 2.",
      },
    ],
    explanation:
      "Primitive כמו number מועתק by value. המשתנה החדש מחזיק עותק, לא קישור למשתנה המקורי.",
    requiredConcepts: ["lesson_11::By Value", "lesson_11::number"],
    requiredTerms: ["primitive", "copy", "by value"],
  },
  {
    id: "trace_l11_filter_001",
    conceptKey: "lesson_11::filter",
    level: 3,
    title: "filter מחזירה רק איברים שעברו תנאי",
    code:
      "const scores = [44, 91, 62, 58];\n" +
      "const passing = scores.filter((score) => score >= 60);\n" +
      "console.log(passing.join(','));",
    steps: [
      {
        line: 2,
        prompt: "אילו ערכים נשארים במערך passing?",
        answer: "91,62",
        acceptable: ["[91,62]", "91, 62"],
        hint: "filter שומרת רק ערכים שבהם התנאי מחזיר true.",
      },
      {
        line: 3,
        prompt: "מה יודפס בקונסול?",
        answer: "91,62",
        acceptable: ["91, 62"],
        hint: "join(',') מחבר את איברי המערך למחרוזת אחת.",
      },
    ],
    explanation:
      "filter לא משנה את המערך המקורי. היא מחזירה מערך חדש עם האיברים שעבורם callback החזיר true.",
    requiredConcepts: ["lesson_11::Array", "lesson_11::filter", "lesson_11::boolean"],
    requiredTerms: ["filter", "callback", "condition"],
  },
  {
    id: "trace_l11_find_001",
    conceptKey: "lesson_11::find",
    level: 3,
    title: "find מחזירה התאמה ראשונה",
    code:
      "const users = [{ name: 'Tal', role: 'student' }, { name: 'Dana', role: 'mentor' }];\n" +
      "const mentor = users.find((user) => user.role === 'mentor');\n" +
      "console.log(mentor.name);",
    steps: [
      {
        line: 2,
        prompt: "איזה אובייקט find מחזירה?",
        answer: "{ name: 'Dana', role: 'mentor' }",
        acceptable: ["Dana", "האובייקט של Dana", "{name:'Dana',role:'mentor'}"],
        hint: "find עוצרת בהתאמה הראשונה שבה role הוא mentor.",
      },
      {
        line: 3,
        prompt: "מה יודפס בקונסול?",
        answer: "Dana",
        acceptable: ["Dana"],
        hint: "mentor הוא האובייקט של Dana, ולכן mentor.name הוא Dana.",
      },
    ],
    explanation:
      "find מחזירה את האיבר הראשון שעומד בתנאי. אם אין התאמה היא תחזיר undefined.",
    requiredConcepts: ["lesson_11::Array", "lesson_11::find", "lesson_11::object"],
    requiredTerms: ["find", "first match", "undefined"],
  },
  {
    id: "trace_l11_foreach_001",
    conceptKey: "lesson_11::forEach",
    level: 3,
    title: "forEach מבצעת פעולה לכל איבר",
    code:
      "const names = ['Avi', 'Ben'];\n" +
      "let text = '';\n" +
      "names.forEach((name) => {\n" +
      "  text = text + name + '!';\n" +
      "});\n" +
      "console.log(text);",
    steps: [
      {
        line: 4,
        prompt: "מה הערך של text אחרי האיבר הראשון?",
        answer: "Avi!",
        acceptable: ["Avi!"],
        hint: "בהתחלה text ריק, ואז מצטרפים Avi ו-!.",
      },
      {
        line: 6,
        prompt: "מה יודפס בסוף?",
        answer: "Avi!Ben!",
        acceptable: ["Avi!Ben!"],
        hint: "forEach רצה פעם עבור Avi ופעם עבור Ben.",
      },
    ],
    explanation:
      "forEach לא מחזירה מערך חדש. היא מתאימה לפעולה צדדית לכל איבר, כמו עדכון משתנה או הדפסה.",
    requiredConcepts: ["lesson_11::Array", "lesson_11::forEach"],
    requiredTerms: ["forEach", "side effect", "iteration"],
  },
  {
    id: "trace_l11_index_001",
    conceptKey: "lesson_11::Index",
    level: 2,
    title: "אינדקסים מתחילים מ-0",
    code:
      "const topics = ['Array', 'Index', 'Scope'];\n" +
      "console.log(topics[0]);\n" +
      "console.log(topics[1]);",
    steps: [
      {
        line: 2,
        prompt: "מה יודפס מהאינדקס 0?",
        answer: "Array",
        acceptable: ["Array"],
        hint: "האיבר הראשון במערך נמצא באינדקס 0.",
      },
      {
        line: 3,
        prompt: "מה יודפס מהאינדקס 1?",
        answer: "Index",
        acceptable: ["Index"],
        hint: "האיבר השני במערך נמצא באינדקס 1.",
      },
    ],
    explanation:
      "ב-JavaScript אינדקסים במערך מתחילים מ-0. לכן array[1] הוא האיבר השני, לא הראשון.",
    requiredConcepts: ["lesson_11::Array", "lesson_11::Index"],
    requiredTerms: ["index", "zero-based"],
  },
  {
    id: "trace_l11_map_001",
    conceptKey: "lesson_11::map",
    level: 3,
    title: "map יוצרת מערך חדש",
    code:
      "const prices = [10, 20, 30];\n" +
      "const withVat = prices.map((price) => price * 1.17);\n" +
      "console.log(prices.length);\n" +
      "console.log(withVat[1]);",
    steps: [
      {
        line: 2,
        prompt: "כמה איברים יהיו ב-withVat?",
        answer: "3",
        acceptable: ["3"],
        hint: "map מחזירה איבר אחד חדש לכל איבר מקורי.",
      },
      {
        line: 3,
        prompt: "מה יודפס עבור prices.length?",
        answer: "3",
        acceptable: ["3"],
        hint: "map לא משנה את המערך המקורי.",
      },
      {
        line: 4,
        prompt: "מה הערך של withVat[1]?",
        answer: "23.4",
        acceptable: ["23.4"],
        hint: "האיבר השני הוא 20, ו-20 * 1.17 = 23.4.",
      },
    ],
    explanation:
      "map מחזירה מערך חדש באותו אורך. כל איבר חדש הוא תוצאת callback על האיבר המקורי.",
    requiredConcepts: ["lesson_11::Array", "lesson_11::map", "lesson_11::Index"],
    requiredTerms: ["map", "new array", "callback"],
  },
  {
    id: "trace_l11_number_001",
    conceptKey: "lesson_11::number",
    level: 2,
    title: "number וחישוב מתמטי",
    code:
      "const base = 10;\n" +
      "const bonus = 5;\n" +
      "const total = base + bonus * 2;\n" +
      "console.log(total);",
    steps: [
      {
        line: 3,
        prompt: "מה הערך של total?",
        answer: "20",
        acceptable: ["20"],
        hint: "כפל מתבצע לפני חיבור: 5 * 2 ואז + 10.",
      },
      {
        line: 4,
        prompt: "מה יודפס בקונסול?",
        answer: "20",
        acceptable: ["20"],
        hint: "total הוא number עם הערך 20.",
      },
    ],
    explanation:
      "number הוא primitive שמייצג מספרים. סדר פעולות חשבון עדיין חל: כפל לפני חיבור.",
    requiredConcepts: ["lesson_11::number"],
    requiredTerms: ["number", "operator precedence"],
  },
  {
    id: "trace_l11_object_001",
    conceptKey: "lesson_11::object",
    level: 3,
    title: "קריאת property מתוך object",
    code:
      "const learner = { name: 'Tal', level: 1 };\n" +
      "learner.level = learner.level + 1;\n" +
      "console.log(learner.name);\n" +
      "console.log(learner.level);",
    steps: [
      {
        line: 2,
        prompt: "מה הערך של learner.level אחרי העדכון?",
        answer: "2",
        acceptable: ["2"],
        hint: "הערך התחיל ב-1 ואז נוסף לו 1.",
      },
      {
        line: 3,
        prompt: "מה יודפס עבור learner.name?",
        answer: "Tal",
        acceptable: ["Tal"],
        hint: "העדכון נגע רק ב-level, לא ב-name.",
      },
      {
        line: 4,
        prompt: "מה יודפס עבור learner.level?",
        answer: "2",
        acceptable: ["2"],
        hint: "האובייקט נשאר אותו אובייקט, אבל property level השתנה.",
      },
    ],
    explanation:
      "object מחזיק properties לפי שם. אפשר לקרוא ולעדכן property עם dot notation כמו learner.level.",
    requiredConcepts: ["lesson_11::object", "lesson_11::By Reference"],
    requiredTerms: ["object", "property", "dot notation"],
  },
  {
    id: "trace_l11_pointer_001",
    conceptKey: "lesson_11::Pointer",
    level: 4,
    title: "שני משתנים מצביעים לאותו object",
    code:
      "const first = { count: 1 };\n" +
      "const second = first;\n" +
      "second.count = 5;\n" +
      "console.log(first.count);",
    steps: [
      {
        line: 2,
        prompt: "למה second שווה אחרי ההשמה?",
        answer: "לאותו אובייקט כמו first",
        acceptable: ["אותו אובייקט", "same object", "reference"],
        hint: "באובייקטים מועתקת הפניה, לא עותק עמוק של התוכן.",
      },
      {
        line: 4,
        prompt: "מה יודפס עבור first.count?",
        answer: "5",
        acceptable: ["5"],
        hint: "second ו-first מצביעים לאותו object, לכן שינוי דרך second נראה גם דרך first.",
      },
    ],
    explanation:
      "Pointer/Reference אומר שהמשתנה מחזיק הפניה לאובייקט. העתקת המשתנה מעתיקה את ההפניה לאותו אובייקט.",
    requiredConcepts: ["lesson_11::Pointer", "lesson_11::By Reference", "lesson_11::object"],
    requiredTerms: ["reference", "pointer", "object identity"],
  },
  {
    id: "trace_l11_pop_001",
    conceptKey: "lesson_11::pop",
    level: 3,
    title: "pop מסירה את האיבר האחרון",
    code:
      "const tasks = ['clean', 'wash', 'code'];\n" +
      "const last = tasks.pop();\n" +
      "console.log(last);\n" +
      "console.log(tasks.join(','));",
    steps: [
      {
        line: 2,
        prompt: "איזה ערך pop מחזירה?",
        answer: "code",
        acceptable: ["code"],
        hint: "pop מחזירה את האיבר האחרון שהוסר.",
      },
      {
        line: 4,
        prompt: "מה נשאר במערך tasks?",
        answer: "clean,wash",
        acceptable: ["clean, wash", "[clean,wash]", "clean,wash"],
        hint: "האיבר code הוסר מהסוף.",
      },
    ],
    explanation:
      "pop משנה את המערך המקורי: היא מסירה את האיבר האחרון ומחזירה אותו.",
    requiredConcepts: ["lesson_11::Array", "lesson_11::pop"],
    requiredTerms: ["pop", "mutates array", "last item"],
  },
  {
    id: "trace_l11_push_001",
    conceptKey: "lesson_11::push",
    level: 3,
    title: "push מוסיפה לסוף המערך",
    code:
      "const queue = ['Tal', 'Dana'];\n" +
      "const newLength = queue.push('Noa');\n" +
      "console.log(newLength);\n" +
      "console.log(queue.join(','));",
    steps: [
      {
        line: 2,
        prompt: "איזה ערך push מחזירה?",
        answer: "3",
        acceptable: ["3"],
        hint: "push מחזירה את האורך החדש של המערך אחרי ההוספה.",
      },
      {
        line: 4,
        prompt: "מה יודפס עבור queue?",
        answer: "Tal,Dana,Noa",
        acceptable: ["Tal, Dana, Noa", "Tal,Dana,Noa"],
        hint: "Noa נוספה לסוף המערך הקיים.",
      },
    ],
    explanation:
      "push משנה את המערך המקורי, מוסיפה איבר בסוף, ומחזירה את האורך החדש.",
    requiredConcepts: ["lesson_11::Array", "lesson_11::push"],
    requiredTerms: ["push", "mutates array", "length"],
  },
  {
    id: "trace_l11_shift_001",
    conceptKey: "lesson_11::shift",
    level: 3,
    title: "shift מסירה מהתחלת המערך",
    code:
      "const names = ['Avi', 'Ben', 'Chen'];\n" +
      "const first = names.shift();\n" +
      "console.log(first);\n" +
      "console.log(names[0]);",
    steps: [
      {
        line: 2,
        prompt: "איזה ערך shift מחזירה?",
        answer: "Avi",
        acceptable: ["Avi"],
        hint: "shift מחזירה את האיבר הראשון שהוסר.",
      },
      {
        line: 4,
        prompt: "מה נמצא עכשיו באינדקס 0?",
        answer: "Ben",
        acceptable: ["Ben"],
        hint: "אחרי הסרת Avi, Ben זז להיות האיבר הראשון.",
      },
    ],
    explanation:
      "shift משנה את המערך המקורי: היא מסירה את האיבר הראשון ומחזירה אותו.",
    requiredConcepts: ["lesson_11::Array", "lesson_11::shift", "lesson_11::Index"],
    requiredTerms: ["shift", "first item", "mutates array"],
  },
  {
    id: "trace_l11_sort_001",
    conceptKey: "lesson_11::sort",
    level: 4,
    title: "sort מספרי עם compare function",
    code:
      "const scores = [10, 2, 30];\n" +
      "scores.sort((a, b) => a - b);\n" +
      "console.log(scores.join(','));",
    steps: [
      {
        line: 2,
        prompt: "איזה סדר ייווצר אחרי sort עם a - b?",
        answer: "2,10,30",
        acceptable: ["2, 10, 30", "2,10,30"],
        hint: "compare function שמחזירה a - b ממיינת מספרים בסדר עולה.",
      },
      {
        line: 3,
        prompt: "מה יודפס בקונסול?",
        answer: "2,10,30",
        acceptable: ["2, 10, 30", "2,10,30"],
        hint: "sort משנה את המערך עצמו ואז join מציג אותו כמחרוזת.",
      },
    ],
    explanation:
      "sort משנה את המערך המקורי. במספרים משתמשים ב-compare function כדי למנוע מיון טקסטואלי.",
    requiredConcepts: ["lesson_11::Array", "lesson_11::sort", "lesson_11::function"],
    requiredTerms: ["sort", "compare function", "mutates array"],
  },
  {
    id: "trace_l11_splice_001",
    conceptKey: "lesson_11::splice",
    level: 4,
    title: "splice מסירה ומכניסה באמצע",
    code:
      "const letters = ['a', 'b', 'c', 'd'];\n" +
      "const removed = letters.splice(1, 2, 'x');\n" +
      "console.log(removed.join(','));\n" +
      "console.log(letters.join(','));",
    steps: [
      {
        line: 2,
        prompt: "אילו איברים הוסרו?",
        answer: "b,c",
        acceptable: ["b, c", "b,c"],
        hint: "מתחילים באינדקס 1 ומסירים 2 איברים: b ואז c.",
      },
      {
        line: 4,
        prompt: "מה נשאר במערך letters אחרי הכנסת x?",
        answer: "a,x,d",
        acceptable: ["a, x, d", "a,x,d"],
        hint: "במקום b ו-c נכנס x.",
      },
    ],
    explanation:
      "splice משנה את המערך המקורי, מחזירה את האיברים שהוסרו, ויכולה להכניס איברים חדשים באותו מקום.",
    requiredConcepts: ["lesson_11::Array", "lesson_11::splice", "lesson_11::Index"],
    requiredTerms: ["splice", "start index", "delete count"],
  },
  {
    id: "trace_l11_spread_001",
    conceptKey: "lesson_11::spread",
    level: 3,
    title: "spread יוצר עותק רדוד של מערך",
    code:
      "const original = ['html', 'css'];\n" +
      "const copy = [...original, 'js'];\n" +
      "console.log(original.join(','));\n" +
      "console.log(copy.join(','));",
    steps: [
      {
        line: 2,
        prompt: "מה נכנס לתוך copy?",
        answer: "html,css,js",
        acceptable: ["html, css, js", "html,css,js"],
        hint: "...original פורש את איברי original ואז js נוסף בסוף.",
      },
      {
        line: 3,
        prompt: "מה יודפס עבור original?",
        answer: "html,css",
        acceptable: ["html, css", "html,css"],
        hint: "spread לא משנה את original.",
      },
      {
        line: 4,
        prompt: "מה יודפס עבור copy?",
        answer: "html,css,js",
        acceptable: ["html, css, js", "html,css,js"],
        hint: "copy הוא מערך חדש עם האיברים שנפרשו ועוד js.",
      },
    ],
    explanation:
      "spread בתוך מערך פורש איברים קיימים לתוך מערך חדש. זה שימושי להעתקה רדודה ולהוספה בלי לשנות את המקור.",
    requiredConcepts: ["lesson_11::Array", "lesson_11::spread"],
    requiredTerms: ["spread", "copy", "shallow copy"],
  },
  {
    id: "trace_l11_string_001",
    conceptKey: "lesson_11::string",
    level: 2,
    title: "string וחיבור טקסט",
    code:
      "const firstName = 'Tal';\n" +
      "const message = 'Hello ' + firstName;\n" +
      "console.log(message.length);\n" +
      "console.log(message);",
    steps: [
      {
        line: 2,
        prompt: "מה הערך של message?",
        answer: "Hello Tal",
        acceptable: ["Hello Tal"],
        hint: "האופרטור + מחבר בין שתי מחרוזות.",
      },
      {
        line: 3,
        prompt: "מה האורך של Hello Tal?",
        answer: "9",
        acceptable: ["9"],
        hint: "Hello הוא 5 תווים, יש רווח אחד, ו-Tal הוא 3 תווים.",
      },
      {
        line: 4,
        prompt: "מה יודפס בשורה האחרונה?",
        answer: "Hello Tal",
        acceptable: ["Hello Tal"],
        hint: "console.log מדפיס את המחרוזת שנבנתה.",
      },
    ],
    explanation:
      "string הוא primitive של טקסט. אפשר לחבר מחרוזות עם + ולקרוא את האורך שלהן עם length.",
    requiredConcepts: ["lesson_11::string"],
    requiredTerms: ["string", "concatenation", "length"],
  },
  {
    id: "trace_l11_tostring_001",
    conceptKey: "lesson_11::toString",
    level: 3,
    title: "toString ממיר ערך למחרוזת",
    code:
      "const amount = 42;\n" +
      "const text = amount.toString();\n" +
      "console.log(typeof amount);\n" +
      "console.log(typeof text);\n" +
      "console.log(text + '₪');",
    steps: [
      {
        line: 2,
        prompt: "מה הערך של text אחרי toString?",
        answer: "42",
        acceptable: ["42", "'42'", "\"42\""],
        hint: "toString יוצר מחרוזת שמייצגת את המספר.",
      },
      {
        line: 3,
        prompt: "מה typeof amount?",
        answer: "number",
        acceptable: ["number"],
        hint: "amount עצמו נשאר מספר.",
      },
      {
        line: 4,
        prompt: "מה typeof text?",
        answer: "string",
        acceptable: ["string"],
        hint: "text הוא תוצאת ההמרה למחרוזת.",
      },
    ],
    explanation:
      "toString מחזיר ייצוג טקסטואלי של ערך. המשתנה המקורי לא משתנה אם שמרנו את התוצאה במשתנה חדש.",
    requiredConcepts: ["lesson_11::toString", "lesson_11::number", "lesson_11::string"],
    requiredTerms: ["toString", "conversion", "typeof"],
  },
  {
    id: "trace_l11_undefined_001",
    conceptKey: "lesson_11::undefined",
    level: 3,
    title: "undefined כשאין ערך",
    code:
      "let selected;\n" +
      "const names = ['Tal'];\n" +
      "console.log(selected);\n" +
      "console.log(names[3]);",
    steps: [
      {
        line: 3,
        prompt: "מה יודפס עבור selected?",
        answer: "undefined",
        acceptable: ["undefined"],
        hint: "המשתנה הוגדר עם let אבל לא קיבל ערך.",
      },
      {
        line: 4,
        prompt: "מה יודפס כשמבקשים names[3]?",
        answer: "undefined",
        acceptable: ["undefined"],
        hint: "אין איבר באינדקס 3 במערך שיש בו איבר אחד בלבד.",
      },
    ],
    explanation:
      "undefined מופיע כשמשתנה או גישה לאיבר אינם מחזיקים ערך בפועל.",
    requiredConcepts: ["lesson_11::undefined", "lesson_11::Array", "lesson_11::Index"],
    requiredTerms: ["undefined", "unassigned", "missing index"],
  },
  {
    id: "trace_l11_unshift_001",
    conceptKey: "lesson_11::unshift",
    level: 3,
    title: "unshift מוסיפה להתחלת המערך",
    code:
      "const steps = ['practice', 'exam'];\n" +
      "const count = steps.unshift('lesson');\n" +
      "console.log(count);\n" +
      "console.log(steps.join('>'));",
    steps: [
      {
        line: 2,
        prompt: "איזה ערך unshift מחזירה?",
        answer: "3",
        acceptable: ["3"],
        hint: "unshift מחזירה את האורך החדש אחרי ההוספה.",
      },
      {
        line: 4,
        prompt: "מה סדר האיברים אחרי unshift?",
        answer: "lesson>practice>exam",
        acceptable: ["lesson > practice > exam", "lesson>practice>exam"],
        hint: "lesson נוסף להתחלת המערך, לפני practice.",
      },
    ],
    explanation:
      "unshift משנה את המערך המקורי, מוסיפה איבר בתחילתו, ומחזירה את האורך החדש.",
    requiredConcepts: ["lesson_11::Array", "lesson_11::unshift"],
    requiredTerms: ["unshift", "first item", "length"],
  },
  {
    id: "trace_l11_var_001",
    conceptKey: "lesson_11::var",
    level: 4,
    title: "var היא function-scoped",
    code:
      "function showScore() {\n" +
      "  if (true) {\n" +
      "    var score = 90;\n" +
      "  }\n" +
      "  console.log(score);\n" +
      "}\n" +
      "showScore();",
    steps: [
      {
        line: 5,
        prompt: "האם score זמין מחוץ ל-if בתוך אותה פונקציה?",
        answer: "כן",
        acceptable: ["כן", "yes", "true"],
        hint: "var לא מוגבלת לבלוק if, אלא לפונקציה.",
      },
      {
        line: 7,
        prompt: "מה יודפס אחרי הקריאה ל-showScore?",
        answer: "90",
        acceptable: ["90"],
        hint: "score עדיין זמין בתוך הפונקציה ולכן console.log מדפיס 90.",
      },
    ],
    explanation:
      "var היא function-scoped ולא block-scoped. לכן משתנה שנוצר בתוך if עדיין נגיש בהמשך אותה פונקציה.",
    requiredConcepts: ["lesson_11::var", "lesson_11::function", "lesson_11::scope"],
    requiredTerms: ["var", "function scope", "block scope"],
  },
];

(function appendLesson11ActivityTraces() {
  if (typeof window === "undefined") return;
  if (!window.QUESTIONS_TRACE) window.QUESTIONS_TRACE = [];
  const existing = new Set(window.QUESTIONS_TRACE.map((item) => item && item.id).filter(Boolean));
  SVCOLLEGE_LESSON11_ACTIVITY_TRACES.forEach((item) => {
    if (!existing.has(item.id)) window.QUESTIONS_TRACE.push(item);
  });
  if (window.QUESTIONS_BANK) {
    window.QUESTIONS_BANK.trace = window.QUESTIONS_TRACE;
  }
})();
