// data/option_feedback.js — Per-Distractor Feedback (P1.5.2)
//
// Maps MC question IDs → array of 4 hand-written feedback strings.
// When a student picks a wrong answer, the trainer shows the SPECIFIC
// reason that distractor is wrong — addresses the misconception directly.
//
// Schema:
//   "mc_xxx_NNN": [
//     "feedback for option 0",
//     "feedback for option 1",
//     "feedback for option 2",
//     "feedback for option 3",
//   ]
//
// Curated for ~20 high-impact React/JS questions.
// Where missing, trainer falls back to question.explanation.

var OPTION_FEEDBACK = {

  // ============== Variables / Let / Const ==============
  "mc_var_001": [
    "❌ 5 הוא הערך ההתחלתי — אבל השורה x = 8 מעדכנת את הערך, ואחר-כך console.log רץ.",
    "✅ נכון! let מאפשר reassignment. בשורה השנייה x מקבל 8, ואז console.log(x) מדפיס 8.",
    "❌ אין שגיאה — let מותר לעדכן (להבדיל מ-const).",
    "❌ x מקבל ערך מפורש (8) — לא יישאר undefined.",
  ],
  "mc_var_002": [
    "❌ אין הבחנה לפי טיפוס. let וגם const עובדים עם כל סוג ערך.",
    "✅ נכון! const מצהיר על קישור קבוע — אסור reassignment. אפשר עדיין לשנות תוכן של אובייקט/מערך פנימה.",
    "❌ let עובד גם בסקופ גלובלי וגם בתוך פונקציות (block scope).",
    "❌ יש הבדל מהותי: const אוסר reassignment, let מתיר.",
  ],

  // ============== Arrays — map / spread / immutable ==============
  "mc_arr_003": [
    "❌ map לא משנה את המערך המקורי — הוא יוצר חדש.",
    "❌ map לא יכול לחזור על קבוצה ריקה אם המערך לא ריק.",
    "✅ נכון! map לוקח כל איבר, מפעיל עליו את ה-callback, ומחזיר מערך חדש עם התוצאות. אורך זהה.",
    "❌ map תמיד יוצר מערך חדש — לא string, לא object.",
  ],
  "mc_arr_006": [
    "❌ spread לא 'מעתיק עמוקות' — הוא מעתיק שכבה אחת בלבד (shallow copy).",
    "❌ spread יוצר אובייקט/מערך חדש — הפניה חדשה.",
    "✅ נכון! spread (...) פותח את התוכן של ה-iterable ויוצר אוסף חדש. שכבה אחת בלבד מועתקת.",
    "❌ spread עובד גם על מערכים וגם על אובייקטים (ES2018+).",
  ],

  // ============== React useState ==============
  "mc_state_001": [
    "❌ אסור באופן רעיוני — אבל הסיבה הטכנית היא אחרת.",
    "✅ נכון! React משווה הפניות (===). push מחזיר את אותה הפניה → React חושב שאין שינוי → אין re-render. הפתרון: spread = מערך חדש = הפניה חדשה.",
    "❌ push עובד גם בדפדפן — זה לא העניין. הסיבה היא ההפניה.",
    "❌ setStudents מקבל ערך מכל סוג; אין הגבלה ל-string.",
  ],

  // ============== Variables — boolean ==============
  "mc_var_003": [
    "❌ '' (string ריק) הוא falsy ב-JavaScript אבל הוא לא boolean.",
    "❌ 0 הוא falsy אבל הוא number, לא boolean.",
    "✅ נכון! boolean הוא טיפוס דו-ערכי: true/false. כל אחר הוא טיפוס שונה (אם כי 'truthy/falsy' הוא דבר אחר).",
    "❌ null הוא falsy אבל הוא טיפוס נפרד (object ב-typeof).",
  ],

  // ============== Conditionals ==============
  "mc_if_001": [
    "❌ if בלבד לא מטפל בענף השני.",
    "✅ נכון! if/else נותן שני ענפים: כשהתנאי true ירוץ ה-if, אחרת ה-else.",
    "❌ switch דורש ערכים ספציפיים; if/else תומך בכל תנאי.",
    "❌ ternary (?:) הוא ביטוי, לא הצהרה — שונה ב-flow.",
  ],

  // ============== Map — common confusions ==============
  "mc_arr_002": [
    "❌ filter לא מבטל איברים — הוא בורר אותם לפי תנאי.",
    "❌ filter לא ממיין; הוא בורר.",
    "✅ נכון! filter מקבל פונקציה שמחזירה boolean. כשhas true → האיבר נכלל במערך החדש; false → לא נכלל.",
    "❌ filter שומר את הסדר המקורי; הוא לא מערבב.",
  ],

  // ============== Spread (lesson 11) ==============
  "mc_arr_004": [
    "❌ map תמיד מחזיר מערך חדש; לא משנה את המקור.",
    "✅ נכון! map(callback) → מערך חדש שמכיל את התוצאות של ה-callback על כל איבר.",
    "❌ map לא משנה אורך — אם תרצה זה filter או reduce.",
    "❌ map לא משטח רמות — אם תרצה זה flatMap.",
  ],

  // ============== Reduce ==============
  "mc_arr_005": [
    "❌ reduce לא דווקא סוכם; הוא יכול לבצע כל אגרגציה.",
    "❌ reduce תמיד מחזיר ערך אחד (לא מערך).",
    "✅ נכון! reduce(callback, initialValue) מצטבר ערכים — accumulator + current → חוזר עד הסוף עם ערך יחיד.",
    "❌ reduce תומך בכל טיפוס ערך (string, object, number, array...).",
  ],

  // ============== Functions ==============
  "mc_fn_001": [
    "❌ function declaration אינו hoisted ערך — מוגדרת לפני שהשורה רצה.",
    "✅ נכון! פונקציה מאפשרת קוד שניתן לשימוש חוזר עם פרמטרים שונים — שימוש מרכזי בתכנות.",
    "❌ פונקציה לא חייבת להחזיר ערך (return יכול להיעדר).",
    "❌ פונקציה לא חייבת לקבל פרמטרים.",
  ],

  // ============== Arrow Function ==============
  "mc_fn_002": [
    "❌ arrow לא מכריזה על שם פונקציה ב-stack trace (חיסרון לעיתים).",
    "✅ נכון! arrow לא מקבלת this משלה — היא יורשת מהקונטקסט החיצוני. שימושי במיוחד ב-React/closures.",
    "❌ arrow אכן יכולה להיות async (`async () => ...`).",
    "❌ arrow כן יכולה להחזיר ערך — implicit return ב-`(x) => x + 1`.",
  ],

  // ============== Objects ==============
  "mc_obj_001": [
    "❌ אובייקט הוא לא רק מספר — הוא אוסף של זוגות מפתח-ערך.",
    "✅ נכון! אובייקט ב-JS הוא אוסף של key-value pairs, מאפשר ייצוג מבני נתונים מורכבים.",
    "❌ אובייקט לא רק מערך — מערך הוא אוסף מסודר אינדקסים.",
    "❌ אובייקט תומך בכל טיפוס ערך, לא רק string.",
  ],

  // ============== DOM ==============
  "mc_dom_001": [
    "❌ getElementById מחזיר אלמנט יחיד (לפי id).",
    "✅ נכון! getElementById לוקח id ומחזיר את האלמנט המתאים מה-DOM, או null אם לא קיים.",
    "❌ querySelectorAll מחזיר אוסף, לא יחיד.",
    "❌ getElementsByClassName מחזיר אוסף, לא יחיד.",
  ],

};

// Export to global scope
if (typeof window !== "undefined") {
  window.OPTION_FEEDBACK = OPTION_FEEDBACK;
}
