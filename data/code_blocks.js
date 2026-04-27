// data/code_blocks.js
// בלוקי קוד עם הסבר עברי לכל שורה + שאלות רב-ברירה.
// כל בלוק מקושר למושג קיים ב-LESSONS_DATA דרך {lessonId, conceptName}.
// תשובות נכונות מתעדכנות בניקוד דרך applyAnswer() עם kind="mc".

// ==== מפת חשיבות מושגים (1-4) ====
// 4 = קריטי / יסוד יסודות (מוצג גדול וזוהר)
// 3 = חשוב מאוד
// 2 = רגיל (ברירת מחדל)
// 1 = שולי / טכני
var CB_IMPORTANCE = {
  // lesson 11
  "Array": 4,
  "let": 4,
  "arrow function": 3,
  "map": 3,
  "filter": 3,
  "forEach": 2,
  "spread": 3,
  "By Reference": 4,
  // lesson 15
  "Error": 3,
  "try": 4,
  "throw": 3,
  "setTimeout": 3,
  "Promise": 4,
  // lesson 22
  "useState": 4,
  "props": 4,
};

// הערה מיוחדת לכל מושג חשוב
var CB_IMPORTANT_NOTES = {
  "Array": "Array הוא יסוד יסודות JS — בלעדיו אי אפשר לעבוד עם רשימות, נתונים מ-API, או כל אוסף. כמעט כל פיצ'ר במערכות אמיתיות עובר דרכו.",
  "let": "let מגדיר את גבולות ההיקף (Block Scope) ב-JS המודרני. ההבחנה בין let ל-const ל-var היא הבסיס להבנת זיכרון, סקופ ומוטביליות.",
  "arrow function": "פונקציות חץ הן התחביר הדומיננטי ב-JS המודרני, במיוחד עם React ו-Array methods. חיוני להכיר את הניואנסים של this ו-implicit return.",
  "map": "map הוא הכלי המרכזי לטרנספורמציה אימוטבילית של מערכים — בסיס לעבודה עם נתונים ב-React, fetch ועוד.",
  "filter": "filter בורר מערכים לפי תנאי בלי לשנות את המקור. אבן יסוד ב-Functional Programming.",
  "forEach": "forEach לאיטרציה פשוטה עם Side Effects. חשוב להבין מתי הוא הנכון לשימוש (ולא map/filter).",
  "spread": "spread (...) הוא הדרך המקובלת לעבודה אימוטבילית עם מערכים ואובייקטים — חיוני ל-React ו-Redux.",
  "By Reference": "אחת התקלות הכי שכיחות בקוד JS — שכפול אובייקט מצביע לאותו זיכרון. הבנה של ההבדל מ-By Value מצילה שעות דיבוג.",
  "Error": "כל מערכת חייבת לטפל בשגיאות. הבנת אובייקט ה-Error ושרשרת שלה (TypeError, SyntaxError...) חיונית לדיבוג.",
  "try": "try/catch הוא המנגנון הבסיסי למניעת קריסות. בלעדיו קוד אסינכרוני קורס ברגע הראשון של בעיה.",
  "throw": "throw מאפשר לזרוק שגיאות מותאמות, מה שהופך פונקציות שלך ל'מודעות לעצמן'. בסיס ל-Validation ו-API design.",
  "setTimeout": "setTimeout פותח את הדלת לעולם האסינכרוני של JS. הבנת Event Loop מתחילה כאן.",
  "Promise": "Promise הוא מבנה היסוד של אסינכרוניות מודרנית. כל fetch/async-await מבוסס עליו. חיוני 100%.",
  "useState": "ה-Hook הראשון והחשוב ביותר של React. בלעדיו אין state, אין אינטראקטיביות, אין UI דינמי.",
  "props": "props הם הצינור היחיד של מידע מאב לבן ב-React. הבנה נכונה של read-only ו-flow מאב לבן זה הליבה של ארכיטקטורת React.",
};

var CODE_BLOCKS = {
  intro: {
    title: "💻 למד בלוקי קוד",
    subtitle:
      "בלוקי קוד אמיתיים עם הסבר עברי לכל שורה. ענה על השאלות והעלה את הניקוד שלך לכל מושג.",
  },
  blocks: [
    // ============ 1. Array — בסיסי ============
    {
      id: "cb_l11_array_basic",
      lessonId: "lesson_11",
      conceptName: "Array",
      title: "מערך בסיסי וגישה לפי אינדקס",
      icon: "📦",
      difficulty: 1,
      intro: "יצירת מערך, גישה לאיברים לפי אינדקס, וההבדל בין length לאינדקס האחרון.",
      code:
        "const fruits = ['Apple', 'Banana', 'Cherry'];\n" +
        "console.log(fruits[0]);\n" +
        "console.log(fruits.length);\n" +
        "console.log(fruits[fruits.length - 1]);",
      lineComments: {
        1: "מצהירים מערך עם 3 מחרוזות. סוגריים מרובעים [] = מערך.",
        2: "גישה לאיבר הראשון — אינדקס מתחיל מ-0, לא מ-1.",
        3: "length מחזיר את גודל המערך (3), לא את האינדקס האחרון.",
        4: "הטריק לאיבר האחרון: length-1.",
      },
      questions: [
        {
          id: "cb_l11_array_q1",
          kind: "mc",
          targetLine: 2,
          question: "מה יודפס בשורה 2?",
          options: ["'Apple'", "'Banana'", "0", "undefined"],
          correctIndex: 0,
          explanation: "אינדקס 0 מצביע על האיבר הראשון — 'Apple'.",
        },
        {
          id: "cb_l11_array_q2",
          kind: "mc",
          targetLine: 3,
          question: "מה יודפס בשורה 3?",
          options: ["2", "3", "4", "'Cherry'"],
          correctIndex: 1,
          explanation: "length מחזיר את מספר האיברים — 3.",
        },
        {
          id: "cb_l11_array_q3",
          kind: "mc",
          targetLine: 4,
          question: "למה כתבנו length-1 ולא length?",
          options: [
            "זה רק עיצוב, אין הבדל",
            "כי האינדקס מתחיל מ-0 ולכן האיבר האחרון נמצא באינדקס length-1",
            "כדי לחסוך זיכרון",
            "כי ככה כותבים בכל השפות",
          ],
          correctIndex: 1,
          explanation:
            "האינדקס מתחיל מ-0, אז ב-3 איברים האינדקסים הם 0,1,2 והאחרון הוא length-1=2.",
        },
      ],
    },

    // ============ 2. let — משתנה שניתן לשנות ============
    {
      id: "cb_l11_let_basic",
      lessonId: "lesson_11",
      conceptName: "let",
      title: "let — משתנה שניתן לשנות",
      icon: "🔄",
      difficulty: 1,
      code:
        "let score = 0;\n" +
        "score = 10;\n" +
        "score = score + 5;\n" +
        "console.log(score);",
      lineComments: {
        1: "מצהירים משתנה score עם let ומאתחלים ל-0.",
        2: "let מאפשר הצבה מחדש — מציבים 10.",
        3: "ביטוי: ערך נוכחי (10) + 5 = 15.",
        4: "מדפיס את הערך הסופי.",
      },
      questions: [
        {
          id: "cb_l11_let_q1",
          kind: "mc",
          targetLine: 4,
          question: "מה יודפס בשורה 4?",
          options: ["0", "10", "15", "שגיאה"],
          correctIndex: 2,
          explanation: "0 → 10 (שורה 2) → 10+5=15 (שורה 3).",
        },
        {
          id: "cb_l11_let_q2",
          kind: "mc",
          targetLine: 1,
          question: "מה היה קורה אם היינו מחליפים let ב-const בשורה 1?",
          options: [
            "כלום, זה היה עובד אותו דבר",
            "שורה 2 הייתה זורקת TypeError כי const אסור להציב מחדש",
            "המשתנה היה הופך גלובלי",
            "התוכנה הייתה רצה מהר יותר",
          ],
          correctIndex: 1,
          explanation:
            "const אוסר על הצבה מחדש. שורה 2 (score = 10) הייתה זורקת TypeError.",
        },
      ],
    },

    // ============ 3. arrow function ============
    {
      id: "cb_l11_arrow_basic",
      lessonId: "lesson_11",
      conceptName: "arrow function",
      title: "פונקציית חץ — תחביר מקוצר",
      icon: "🏹",
      difficulty: 1,
      intro: "פונקציות חץ הן תחביר קצר לפונקציות, פופולריות במיוחד עם מתודות מערך.",
      code:
        "const add = (a, b) => a + b;\n" +
        "const square = n => n * n;\n" +
        "const greet = () => 'Shalom!';\n" +
        "console.log(add(2, 3));\n" +
        "console.log(square(5));\n" +
        "console.log(greet());",
      lineComments: {
        1: "פונקציית חץ עם 2 פרמטרים. בלי {} ובלי return — מחזיר אוטומטית.",
        2: "פרמטר אחד — אפשר בלי סוגריים.",
        3: "אין פרמטרים — חובה () ריקות.",
        4: "קריאה רגילה. מדפיס 5.",
        5: "מדפיס 25.",
        6: "מדפיס 'Shalom!'.",
      },
      questions: [
        {
          id: "cb_l11_arrow_q1",
          kind: "mc",
          targetLine: 1,
          question: "למה אין return בשורה 1?",
          options: [
            "זו טעות — זה לא יעבוד",
            "פונקציית חץ עם ביטוי יחיד (ללא {}) מחזירה אותו אוטומטית",
            "JavaScript מוסיף return לבד תמיד",
            "זה return מוסתר במנוע",
          ],
          correctIndex: 1,
          explanation:
            "כשפונקציית חץ נכתבת בלי {} (Implicit return), הביטוי מוחזר אוטומטית.",
        },
        {
          id: "cb_l11_arrow_q2",
          kind: "mc",
          targetLine: 3,
          question: "למה צריך () ריקות בשורה 3?",
          options: [
            "סתם, זו דרישה תיעודית",
            "כי כשאין פרמטרים — תחביר פונקציית חץ דורש () ריקות",
            "כדי להריץ את הפונקציה מיד",
            "כדי לחבר אותה לאובייקט",
          ],
          correctIndex: 1,
          explanation:
            "פרמטר יחיד אפשר בלי סוגריים, אבל 0 פרמטרים או 2+ — חובה ().",
        },
      ],
    },

    // ============ 4. map ============
    {
      id: "cb_l11_map_basic",
      lessonId: "lesson_11",
      conceptName: "map",
      title: "map — שינוי כל איבר במערך",
      icon: "🔁",
      difficulty: 2,
      intro: "map מחזיר מערך חדש שבו כל איבר עבר טרנספורמציה. המערך המקורי לא משתנה!",
      code:
        "const nums = [1, 2, 3, 4];\n" +
        "const doubled = nums.map(n => n * 2);\n" +
        "console.log(doubled);\n" +
        "console.log(nums);",
      lineComments: {
        1: "מערך מקור עם 4 מספרים.",
        2: "map עובר על כל איבר ומחזיר חדש (n*2). לא משנה את nums!",
        3: "מדפיס [2, 4, 6, 8] — המערך החדש.",
        4: "מדפיס [1, 2, 3, 4] — המקור לא השתנה.",
      },
      questions: [
        {
          id: "cb_l11_map_q1",
          kind: "mc",
          targetLine: 4,
          question: "מה יודפס בשורה 4?",
          options: [
            "[2, 4, 6, 8] — כי map שינה את nums",
            "[1, 2, 3, 4] — map תמיד מחזיר מערך חדש, לא משנה את המקור",
            "undefined",
            "שגיאה — nums כבר לא קיים",
          ],
          correctIndex: 1,
          explanation:
            "map הוא לא-מוטטיבי (immutable) — תמיד מחזיר מערך חדש, המקור נשאר כמו שהוא.",
        },
        {
          id: "cb_l11_map_q2",
          kind: "mc",
          targetLine: 2,
          question: "מה היה קורה אם היינו כותבים nums.map(n => { n * 2; })?",
          options: [
            "אותו דבר — [2,4,6,8]",
            "doubled היה [undefined, undefined, undefined, undefined] כי {} דורש return",
            "שגיאה",
            "[1,2,3,4]",
          ],
          correctIndex: 1,
          explanation:
            "כשמשתמשים ב-{} בפונקציית חץ חייבים return מפורש. בלעדיו — הפונקציה מחזירה undefined.",
        },
      ],
    },

    // ============ 5. filter ============
    {
      id: "cb_l11_filter_basic",
      lessonId: "lesson_11",
      conceptName: "filter",
      title: "filter — סינון איברים לפי תנאי",
      icon: "🧹",
      difficulty: 2,
      code:
        "const ages = [12, 17, 22, 30, 8];\n" +
        "const adults = ages.filter(age => age >= 18);\n" +
        "console.log(adults);\n" +
        "console.log(adults.length);",
      lineComments: {
        1: "מערך גילאים מעורב.",
        2: "filter שומר רק איברים שהפונקציה מחזירה עליהם true.",
        3: "מדפיס [22, 30] — רק הגילאים מעל 18.",
        4: "מדפיס 2 — מספר האיברים שעברו את הסינון.",
      },
      questions: [
        {
          id: "cb_l11_filter_q1",
          kind: "mc",
          targetLine: 3,
          question: "מה יודפס בשורה 3?",
          options: ["[12, 17, 8]", "[22, 30]", "[18]", "[12, 17, 22, 30, 8]"],
          correctIndex: 1,
          explanation:
            "filter שומר רק איברים שעבורם age >= 18 הוא true. רק 22 ו-30 עוברים.",
        },
        {
          id: "cb_l11_filter_q2",
          kind: "mc",
          targetLine: 2,
          question: "מה ההבדל המרכזי בין map ל-filter?",
          options: [
            "אין הבדל",
            "map משנה את כל האיברים, filter בורר אותם — אבל שניהם מחזירים מערך חדש",
            "filter משנה את המקור, map לא",
            "map עובד רק עם מספרים",
          ],
          correctIndex: 1,
          explanation:
            "map מחזיר מערך באותו אורך עם איברים מעובדים. filter מחזיר מערך קצר יותר עם תת-קבוצה. שניהם לא-מוטטיביים.",
        },
      ],
    },

    // ============ 6. forEach ============
    {
      id: "cb_l11_foreach_basic",
      lessonId: "lesson_11",
      conceptName: "forEach",
      title: "forEach — איטרציה ללא החזרה",
      icon: "🚶",
      difficulty: 1,
      intro:
        "forEach עובר על כל איבר ומבצע פעולה. בניגוד ל-map/filter — הוא לא מחזיר מערך חדש!",
      code:
        "const names = ['Tal', 'Roni', 'Maya'];\n" +
        "names.forEach(name => {\n" +
        "  console.log('Hi ' + name);\n" +
        "});\n" +
        "const result = names.forEach(n => n);\n" +
        "console.log(result);",
      lineComments: {
        1: "מערך עם 3 שמות.",
        2: "forEach עובר איבר-אחר-איבר. הפרמטר name משתנה בכל איטרציה.",
        3: "פעולה — כאן: הדפסה. אין return רלוונטי.",
        4: "סוגרים את הבלוק.",
        5: "ניסיון לקבל ערך מ-forEach... אבל הוא תמיד מחזיר undefined.",
        6: "מדפיס undefined — forEach לא מחזיר כלום.",
      },
      questions: [
        {
          id: "cb_l11_foreach_q1",
          kind: "mc",
          targetLine: 6,
          question: "למה result הוא undefined?",
          options: [
            "כי המערך ריק",
            "כי forEach לא מחזיר מערך — הוא רק מבצע פעולה לכל איבר",
            "כי שכחנו return",
            "כי names אינו array",
          ],
          correctIndex: 1,
          explanation:
            "forEach מחזיר תמיד undefined. אם רוצים מערך חדש — להשתמש ב-map. אם סינון — filter.",
        },
        {
          id: "cb_l11_foreach_q2",
          kind: "mc",
          targetLine: 2,
          question: "מתי נכון להשתמש ב-forEach במקום map?",
          options: [
            "תמיד forEach טוב יותר",
            "כשאנחנו רוצים רק לבצע פעולה (Side Effect) ולא צריכים לקבל מערך חדש",
            "כשהמערך גדול",
            "כשאי אפשר להשתמש ב-map",
          ],
          correctIndex: 1,
          explanation:
            "forEach לפעולות בלבד (הדפסה, שליחה לשרת...). map לטרנספורמציה שמחזירה מערך חדש.",
        },
      ],
    },

    // ============ 7. spread ============
    {
      id: "cb_l11_spread_basic",
      lessonId: "lesson_11",
      conceptName: "spread",
      title: "spread (...) — פיזור איברים",
      icon: "✨",
      difficulty: 2,
      intro: "אופרטור ה-spread (...) פותח מערך/אובייקט לאיברים בודדים. שימושי לשכפול ושילוב.",
      code:
        "const arr1 = [1, 2, 3];\n" +
        "const arr2 = [4, 5];\n" +
        "const combined = [...arr1, ...arr2];\n" +
        "const copy = [...arr1];\n" +
        "copy.push(99);\n" +
        "console.log(arr1);\n" +
        "console.log(combined);",
      lineComments: {
        1: "מערך ראשון.",
        2: "מערך שני.",
        3: "...arr1 פותח ל-1,2,3 ו-...arr2 ל-4,5. התוצאה: [1,2,3,4,5].",
        4: "שכפול שטחי — copy מערך חדש עם אותם ערכים.",
        5: "מוסיף 99 ל-copy.",
        6: "מדפיס [1, 2, 3] — המקור לא הושפע.",
        7: "מדפיס [1, 2, 3, 4, 5].",
      },
      questions: [
        {
          id: "cb_l11_spread_q1",
          kind: "mc",
          targetLine: 6,
          question: "האם push בשורה 5 שינתה את arr1?",
          options: [
            "כן, כי copy = arr1",
            "לא, כי spread יוצר מערך חדש — copy ו-arr1 נפרדים",
            "כן, אבל רק האיבר האחרון",
            "תלוי בדפדפן",
          ],
          correctIndex: 1,
          explanation:
            "spread (...arr1) יוצר מערך חדש עם אותם איברים. copy ו-arr1 הם שני מערכים שונים בזיכרון.",
        },
        {
          id: "cb_l11_spread_q2",
          kind: "mc",
          targetLine: 3,
          question: "מה יודפס מ-combined?",
          options: ["[[1,2,3],[4,5]]", "[1, 2, 3, 4, 5]", "[1, 2, 3]", "שגיאה"],
          correctIndex: 1,
          explanation:
            "ה-spread פותח כל מערך לאיבריו, אז התוצאה היא מערך שטוח: [1,2,3,4,5].",
        },
      ],
    },

    // ============ 8. By Reference ============
    {
      id: "cb_l11_byref_basic",
      lessonId: "lesson_11",
      conceptName: "By Reference",
      title: "By Reference — אובייקטים מצביעים לאותו זיכרון",
      icon: "🔗",
      difficulty: 3,
      intro: "מספרים/מחרוזות מועתקים לפי ערך. אובייקטים ומערכים — לפי הפניה!",
      code:
        "const original = { name: 'Tal', age: 30 };\n" +
        "const ref = original;\n" +
        "ref.age = 99;\n" +
        "console.log(original.age);\n" +
        "console.log(ref === original);",
      lineComments: {
        1: "אובייקט עם 2 שדות.",
        2: "ref מקבל את אותה הפניה — לא העתק! שני המשתנים = אותו אובייקט בזיכרון.",
        3: "משנים את age דרך ref.",
        4: "מדפיס 99 — כי original ו-ref מצביעים לאותו אובייקט.",
        5: "מדפיס true — שניהם אותה הפניה בדיוק.",
      },
      questions: [
        {
          id: "cb_l11_byref_q1",
          kind: "mc",
          targetLine: 4,
          question: "מה יודפס בשורה 4?",
          options: [
            "30 — original לא הושפע",
            "99 — original ו-ref מצביעים לאותו אובייקט בזיכרון",
            "undefined",
            "שגיאה",
          ],
          correctIndex: 1,
          explanation:
            "אובייקטים מועתקים By Reference. ref ו-original הם שני שמות לאותו אובייקט.",
        },
        {
          id: "cb_l11_byref_q2",
          kind: "mc",
          targetLine: 2,
          question: "איך באמת מעתיקים אובייקט בלי הפניה משותפת (Shallow Copy)?",
          options: [
            "const copy = original",
            "const copy = { ...original } — spread יוצר אובייקט חדש",
            "const copy = original.copy()",
            "אי אפשר",
          ],
          correctIndex: 1,
          explanation:
            "{ ...original } או Object.assign({}, original) יוצרים אובייקט חדש עם אותם שדות.",
        },
      ],
    },

    // ============ 9. Error ============
    {
      id: "cb_l15_error_basic",
      lessonId: "lesson_15",
      conceptName: "Error",
      title: "Error — מתי התוכנית קורסת",
      icon: "💥",
      difficulty: 1,
      intro: "כששגיאה לא נתפסת — התוכנית עוצרת. כל השורות אחריה לא מבוצעות.",
      code:
        "console.log('שלב 1');\n" +
        "const PI = 3.14;\n" +
        "PI = 3.15;\n" +
        "console.log('שלב 2');",
      lineComments: {
        1: "מדפיס 'שלב 1' תקין.",
        2: "PI הוא קבוע (const).",
        3: "ניסיון להציב מחדש לקבוע — TypeError!",
        4: "השורה הזו לא תרוץ — התוכנית קרסה.",
      },
      questions: [
        {
          id: "cb_l15_error_q1",
          kind: "mc",
          targetLine: 4,
          question: "האם 'שלב 2' יודפס?",
          options: [
            "כן — JavaScript ממשיך אחרי שגיאה",
            "לא — שורה 3 זרקה TypeError, התוכנית עוצרת",
            "תלוי בדפדפן",
            "רק אם אין catch",
          ],
          correctIndex: 1,
          explanation:
            "שגיאה לא-נתפסת קורסת את ה-Script. 'שלב 1' מודפס, השורה השלישית זורקת, 'שלב 2' לעולם לא ידפיס.",
        },
        {
          id: "cb_l15_error_q2",
          kind: "mc",
          targetLine: 3,
          question: "איזה סוג של Error נזרק בשורה 3?",
          options: ["SyntaxError", "TypeError", "ReferenceError", "RangeError"],
          correctIndex: 1,
          explanation:
            "הצבה מחדש לקבוע (Assignment to constant variable) זורקת TypeError ב-Strict mode.",
        },
      ],
    },

    // ============ 10. try/catch ============
    {
      id: "cb_l15_try_basic",
      lessonId: "lesson_15",
      conceptName: "try",
      title: "try/catch — תפיסת שגיאות",
      icon: "🛡️",
      difficulty: 2,
      intro: "try מנסה להריץ. אם נזרקת שגיאה — קופצים מיד ל-catch ולא קורסים.",
      code:
        "try {\n" +
        "  const data = JSON.parse('not json');\n" +
        "  console.log('Parsed:', data);\n" +
        "} catch (err) {\n" +
        "  console.log('Caught:', err.message);\n" +
        "}\n" +
        "console.log('Done.');",
      lineComments: {
        1: "פותחים בלוק try — האזור ש'מנסים' להריץ.",
        2: "JSON.parse יזרוק SyntaxError כי הטקסט לא JSON תקין.",
        3: "השורה הזו לא תרוץ — קופצים ל-catch.",
        4: "catch תופס את השגיאה. err הוא אובייקט Error.",
        5: "מדפיסים הודעה ידידותית במקום לקרוס.",
        6: "סוגרים את catch.",
        7: "התוכנית ממשיכה כרגיל — לא קרסה!",
      },
      questions: [
        {
          id: "cb_l15_try_q1",
          kind: "mc",
          targetLine: 3,
          question: "האם שורה 3 תתבצע?",
          options: [
            "כן, תמיד",
            "לא — הריצה קופצת ל-catch מיד אחרי השגיאה בשורה 2",
            "תלוי בדפדפן",
            "כן, אחרי catch",
          ],
          correctIndex: 1,
          explanation:
            "ברגע ש-JSON.parse זורק שגיאה, הריצה עוברת מיד ל-catch. שורה 3 מדולגת.",
        },
        {
          id: "cb_l15_try_q2",
          kind: "mc",
          targetLine: 7,
          question: "האם שורה 7 ('Done.') תודפס?",
          options: [
            "לא — הייתה שגיאה",
            "כן — catch תפס את השגיאה והתוכנית המשיכה",
            "רק אם אין שגיאה",
            "תלוי בגרסת ה-Node",
          ],
          correctIndex: 1,
          explanation:
            "זה הקסם של try/catch — השגיאה לא קורסת את התוכנית, רק עוקפת את הבלוק try.",
        },
        {
          id: "cb_l15_try_q3",
          kind: "mc",
          targetLine: 5,
          question: "מה חשוב באובייקט err?",
          options: [
            "err.code — מספר השגיאה",
            "err.message מכיל הסבר ו-err.stack מכיל את ה-Stack Trace",
            "err.line — מספר השורה",
            "err.fix — תיקון אוטומטי",
          ],
          correctIndex: 1,
          explanation:
            "אובייקט Error חושף בעיקר .message (הסבר) ו-.stack (לדיבוג).",
        },
      ],
    },

    // ============ 11. throw ============
    {
      id: "cb_l15_throw_basic",
      lessonId: "lesson_15",
      conceptName: "throw",
      title: "throw — זריקת שגיאה ידנית",
      icon: "🎯",
      difficulty: 2,
      intro: "throw מאפשר ליצור שגיאות מותאמות אישית כשמזהים מצב לא חוקי.",
      code:
        "function divide(a, b) {\n" +
        "  if (b === 0) {\n" +
        "    throw new Error('Cannot divide by zero!');\n" +
        "  }\n" +
        "  return a / b;\n" +
        "}\n" +
        "try {\n" +
        "  console.log(divide(10, 0));\n" +
        "} catch (err) {\n" +
        "  console.log(err.message);\n" +
        "}",
      lineComments: {
        1: "פונקציה שמקבלת 2 מספרים.",
        2: "בדיקת מצב לא חוקי — חלוקה ב-0.",
        3: "throw מפסיק את הפונקציה ויוצר Exception עם הודעה ברורה.",
        4: "סוגרים את ה-if.",
        5: "אם b!=0 — מחזירים את התוצאה.",
        6: "סוגרים את הפונקציה.",
        7: "מנסים להריץ.",
        8: "divide(10, 0) זורק שגיאה — לא יודפס כלום מ-console.log.",
        9: "catch תופס.",
        10: "מדפיס 'Cannot divide by zero!'.",
        11: "סוגרים catch.",
      },
      questions: [
        {
          id: "cb_l15_throw_q1",
          kind: "mc",
          targetLine: 8,
          question: "מה יודפס בשורה 8?",
          options: [
            "Infinity",
            "כלום מהשורה הזו — divide זרק לפני שהגיע ל-console.log",
            "10",
            "0",
          ],
          correctIndex: 1,
          explanation:
            "throw מפסיק את הפונקציה מיד. console.log לא מקבל ערך — הריצה קופצת ל-catch.",
        },
        {
          id: "cb_l15_throw_q2",
          kind: "mc",
          targetLine: 3,
          question: "למה לזרוק Error ולא להחזיר null/undefined?",
          options: [
            "אין הבדל",
            "throw מאלץ את הקורא להתמודד עם המצב — null אפשר לפספס בקלות",
            "throw מהיר יותר",
            "throw לא דורש זיכרון",
          ],
          correctIndex: 1,
          explanation:
            "Error/Exception 'מתפוצצת' עד שמטופלת — קשה להתעלם. null מחזירים בשקט וקל לטעות.",
        },
      ],
    },

    // ============ 12. setTimeout ============
    {
      id: "cb_l15_settimeout_basic",
      lessonId: "lesson_15",
      conceptName: "setTimeout",
      title: "setTimeout — תזמון לעתיד (אסינכרוני!)",
      icon: "⏱️",
      difficulty: 3,
      intro:
        "setTimeout הוא אסינכרוני. סדר ההדפסות לא חייב להיות סדר השורות בקוד!",
      code:
        "console.log('1');\n" +
        "setTimeout(() => {\n" +
        "  console.log('2');\n" +
        "}, 0);\n" +
        "console.log('3');",
      lineComments: {
        1: "מדפיס '1' מיד.",
        2: "רושם callback לתור — לא מבצע אותו עכשיו!",
        3: "תוכן ה-callback — ידפיס '2' אחר כך.",
        4: "אפילו עם 0ms, ה-callback מחכה לסוף ה-Call Stack.",
        5: "מדפיס '3' מיד אחרי '1'.",
      },
      questions: [
        {
          id: "cb_l15_st_q1",
          kind: "mc",
          targetLine: 5,
          question: "מה הסדר של ההדפסות בפועל?",
          options: ["1, 2, 3", "1, 3, 2", "3, 2, 1", "2, 1, 3"],
          correctIndex: 1,
          explanation:
            "1 מיד, 3 מיד, רק כשה-Call Stack מתרוקן ה-callback רץ ומדפיס 2. הסדר: 1, 3, 2.",
        },
        {
          id: "cb_l15_st_q2",
          kind: "mc",
          targetLine: 2,
          question: "אפילו עם delay=0, למה ה-callback לא רץ מיד?",
          options: [
            "כי 0 בעצם 4ms במנוע",
            "כי setTimeout תמיד שולח את ה-callback ל-Macrotask Queue, שמחכה לסיום ה-Stack הנוכחי",
            "כי JavaScript איטי",
            "כי console.log חוסם",
          ],
          correctIndex: 1,
          explanation:
            "Event Loop קודם מסיים את כל הקוד הסינכרוני, ורק אז שולף callbacks מהתור — גם אם delay=0.",
        },
      ],
    },

    // ============ 14. useState (React) ============
    {
      id: "cb_l22_usestate_basic",
      lessonId: "lesson_22",
      conceptName: "useState",
      title: "useState — Hook לזיכרון פנימי בקומפוננטה",
      icon: "📊",
      difficulty: 2,
      intro:
        "useState מאפשר לקומפוננטה פונקציונלית לזכור ערך בין רינדורים. setCount קורא ל-React לרנדר מחדש.",
      code:
        "function Counter() {\n" +
        "  const [count, setCount] = useState(0);\n" +
        "  return (\n" +
        "    <button onClick={() => setCount(count + 1)}>\n" +
        "      Clicked {count} times\n" +
        "    </button>\n" +
        "  );\n" +
        "}",
      lineComments: {
        1: "מצהירים על קומפוננטה פונקציונלית בשם Counter.",
        2: "useState(0) מחזיר מערך: [ערך_נוכחי, פונקציית_עדכון]. פירוק עם destructuring.",
        3: "מתחילים להחזיר JSX (התג שייוצג).",
        4: "כפתור עם onClick — בכל לחיצה קוראים ל-setCount עם count+1.",
        5: "מציגים את הערך הנוכחי בתוך הטקסט עם {count}.",
        6: "סוגרים את תג ה-button.",
        7: "סוגרים את ה-return.",
        8: "סוגרים את הפונקציה.",
      },
      questions: [
        {
          id: "cb_l22_us_q1",
          kind: "mc",
          targetLine: 4,
          question: "מה היה קורה אם היינו כותבים count = count + 1 במקום setCount?",
          options: [
            "המסך היה מתעדכן ל-1, 2, 3...",
            "כלום לא היה משתנה במסך — React לא יודע שהערך השתנה בלי הקריאה ל-setter",
            "שגיאת קומפילציה",
            "React היה מקפיא",
          ],
          correctIndex: 1,
          explanation:
            "React מזהה שינוי רק כשקוראים ל-setter. הצבה ישירה לא מטריגרת re-render והערך גם לא נשמר בין רינדורים.",
        },
        {
          id: "cb_l22_us_q2",
          kind: "mc",
          targetLine: 2,
          question: "למה משתמשים ב-destructuring [count, setCount]?",
          options: [
            "כי useState מחזיר מערך עם 2 איברים: ערך + setter",
            "זו דרישה תחבירית של React",
            "כי React משתמש ב-array בכל הקצאה",
            "אין משמעות, אפשר גם ככה: useState(0).count",
          ],
          correctIndex: 0,
          explanation:
            "useState מחזיר מערך [value, setter]. ה-destructuring מאפשר שמות נוחים. אסור לעבוד דרך .count כי זה לא אובייקט.",
        },
        {
          id: "cb_l22_us_q3",
          kind: "mc",
          targetLine: 2,
          question: "מתי הערך 0 שב-useState(0) באמת מאותחל?",
          options: [
            "בכל רינדור",
            "רק בפעם הראשונה שהקומפוננטה עולה (Mount). מאז React מתעלם מהארגומנט הזה",
            "כשמשתמשים ב-setCount(0)",
            "בכל לחיצה",
          ],
          correctIndex: 1,
          explanation:
            "הארגומנט ל-useState משמש רק בעת ה-Mount הראשוני. ברינדורים הבאים React מחזיר את הערך הנוכחי.",
        },
      ],
    },

    // ============ 15. props (React) ============
    {
      id: "cb_l22_props_basic",
      lessonId: "lesson_22",
      conceptName: "props",
      title: "props — העברת נתונים מאב לבן",
      icon: "📨",
      difficulty: 2,
      intro:
        "props הם נתונים שעוברים מקומפוננטת אב לקומפוננטת בן. הם read-only — הבן לא יכול לשנות אותם!",
      code:
        "function Greeting(props) {\n" +
        "  return <h1>Hello, {props.name}!</h1>;\n" +
        "}\n" +
        "function App() {\n" +
        "  return <Greeting name='Tal' />;\n" +
        "}",
      lineComments: {
        1: "Greeting מקבלת אובייקט props כפרמטר.",
        2: "מציגה את props.name בתוך כותרת. ערך מגיע מהאב.",
        3: "סוגרים את הפונקציה Greeting.",
        4: "App היא קומפוננטת האב.",
        5: "מעבירים name='Tal' כ-prop. בתוך Greeting זה יהיה props.name.",
        6: "סוגרים את App.",
      },
      questions: [
        {
          id: "cb_l22_props_q1",
          kind: "mc",
          targetLine: 5,
          question: "מה היה קורה אם בתוך Greeting היינו כותבים props.name = 'Other'?",
          options: [
            "name היה משתנה ל-Other",
            "React היה זורק שגיאה — props הם read-only ואסור לשנות אותם בילד",
            "הוא היה מתעדכן באב",
            "כלום, השינוי היה מקומי בלבד",
          ],
          correctIndex: 1,
          explanation:
            "props הם read-only מבחינת ה-Child. שינוי שלהם נחשב anti-pattern ב-React ולפעמים גם זורק שגיאה ב-Strict mode.",
        },
        {
          id: "cb_l22_props_q2",
          kind: "mc",
          targetLine: 1,
          question: "מה אם היינו רוצים לקבל את ה-name ישירות בלי props.name?",
          options: [
            "אי אפשר",
            "destructuring: function Greeting({ name }) — שולפים את name ישירות מהאובייקט",
            "להגדיר משתנה גלובלי",
            "להשתמש ב-useState",
          ],
          correctIndex: 1,
          explanation:
            "Destructuring על props מאוד נפוץ ב-React: function Greeting({ name }) שווה-ערך ל-function Greeting(props) + props.name.",
        },
      ],
    },

    // ============ 13. Promise ============
    {
      id: "cb_l15_promise_basic",
      lessonId: "lesson_15",
      conceptName: "Promise",
      title: "Promise — הבטחה אסינכרונית",
      icon: "🤝",
      difficulty: 3,
      intro:
        "Promise מייצג ערך עתידי — או מילוי (resolve) או דחייה (reject). then() מטפל בהצלחה.",
      code:
        "const p = new Promise((resolve, reject) => {\n" +
        "  setTimeout(() => resolve('Done!'), 100);\n" +
        "});\n" +
        "p.then(value => {\n" +
        "  console.log('Got:', value);\n" +
        "});\n" +
        "console.log('Waiting...');",
      lineComments: {
        1: "יוצרים Promise חדש. הקונסטרקטור מקבל פונקציה עם resolve+reject.",
        2: "אחרי 100ms — קוראים ל-resolve('Done!'). זה ישחרר את ה-Promise.",
        3: "סוגרים את ה-callback.",
        4: "then() נרשם להאזין למילוי. value יקבל מה ש-resolve העביר.",
        5: "מדפיס Got: Done! — אבל רק אחרי 100ms!",
        6: "סוגרים את ה-then.",
        7: "מודפס מיד — הקוד הסינכרוני ממשיך תוך כדי שה-Promise ממתין.",
      },
      questions: [
        {
          id: "cb_l15_promise_q1",
          kind: "mc",
          targetLine: 7,
          question: "מה יודפס קודם — 'Waiting...' או 'Got: Done!'?",
          options: [
            "Got: Done! קודם",
            "Waiting... קודם — קוד סינכרוני רץ לפני שהבטחות נפתרות",
            "באותו זמן",
            "תלוי במחשב",
          ],
          correctIndex: 1,
          explanation:
            "console.log('Waiting...') רץ מיד. then() מחכה למילוי + ל-Microtask Queue, אז Got מדפיס אחרי.",
        },
        {
          id: "cb_l15_promise_q2",
          kind: "mc",
          targetLine: 2,
          question: "מה היה קורה אם היינו קוראים ל-reject('Bad') במקום resolve?",
          options: [
            "then() עדיין היה רץ עם 'Bad'",
            "ה-Promise היה דוחה (rejected). then() לא ירוץ — צריך .catch() כדי לתפוס",
            "שגיאה מיד",
            "כלום, reject לא קיים",
          ],
          correctIndex: 1,
          explanation:
            "resolve משחרר במסלול ההצלחה (then), reject במסלול הכישלון (catch). אם אין catch — Unhandled rejection.",
        },
      ],
    },
  ],
};
