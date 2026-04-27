// data/mnemonics.js — Mnemonics Lab (Sprint 1, P2.S1.2)
// Hebrew acronyms + rhymes for hard concepts.
// Goal: memorable hooks for the 8 most-confused React state/effects concepts.

var MNEMONICS = {
  // ───────── Lesson 22 — useState / Immutability ─────────
  "lesson_22::useState": {
    acronym: "ת.ע.פ",
    expansion: "תיק → ערך → פונקציה",
    rhyme: "useState נותן תיק ועט,\nתיק עם ערך שאת רואה,\nועט שכותב את החדש —\nובכל לחיצה הקומפוננטה משתחזרה.",
    visualHook: "🎒",
    why: "תיק זוכר את מה ששמת בו. עט מחליף את הערך. כל פעם שמשנים — React מצייר מחדש.",
  },

  "lesson_22::re-render": {
    acronym: "ת.ש.ה",
    expansion: "תזכר → שינה → הצג",
    rhyme: "re-render הוא צביעת חדר —\nהדפים אותם, אבל הצבע אחר.\nstate משתנה — React מצייר,\nואת הUI החדש את רואה כבר.",
    visualHook: "🎨",
    why: "rerender = להריץ את הפונקציה שוב עם state חדש. הDOM מתעדכן רק במה ששינה.",
  },

  "lesson_22::array reference": {
    acronym: "מ.ע.ה",
    expansion: "מערך — עותק חדש — הצג",
    rhyme: "אם push, splice, או sort —\nReact עיוור, יושב על קוץ.\nspread (...) או filter, map חדש —\nאז React רואה ומקדש.",
    visualHook: "🪞",
    why: "React משווה לפי הפניה (Object.is). רק אם המערך הוא חדש לחלוטין — הוא רואה שינוי.",
  },

  "lesson_22::object reference": {
    acronym: "א.ש.ע",
    expansion: "אובייקט → spread → ערך",
    rhyme: "user.name = X לא שווה —\nReact יושב לו ולא רואה.\nעם {...user, name: X} כן יזהה,\nוה-rerender יבוא בסך הכל.",
    visualHook: "📦",
    why: "כמו במערכים — שינוי שדה לא משנה את ההפניה. spread יוצר אובייקט חדש = רענון מובטח.",
  },

  "lesson_22::passing function as prop": {
    acronym: "ק.מ.ל",
    expansion: "useCallback → memo → לא יתרענן",
    rhyme: "פונקציה inline נולדת בכל render,\nReact.memo רואה ומתבלבל.\nuseCallback שומר עליה תקועה —\nוה-child מאושר וצמא לקצה.",
    visualHook: "🔗",
    why: "כל פונקציה inline היא 'פונקציה חדשה'. useCallback שומר את אותה הפניה כל עוד deps לא השתנו.",
  },

  // ───────── Lesson 24 — useEffect ─────────
  "lesson_24::useEffect": {
    acronym: "מ.ר.ע.נ",
    expansion: "Mount → Render → Effect → cleaNup",
    rhyme: "מ — Mount הקומפוננטה נולדה,\nר — Render על המסך הוצגה,\nע — Effect רץ ולוקח אחריות,\nנ — cleaNup מנקה לפני הסתלקות.",
    visualHook: "🪜",
    why: "ה-effect לעולם לא רץ ב-render עצמו. הוא תמיד אחרי שהDOM כבר על המסך. ה-cleanup רץ לפני ה-next effect או לפני unmount.",
  },

  "lesson_24::dependency array": {
    acronym: "ב.ק.ל",
    expansion: "ב-mount בלבד | קלסיק (כל מה שמשנה) | לולאה (אסור!)",
    rhyme: "ריק [] = פעם, רק ב-mount,\n[deps] = כל פעם ששוטח חוזר ועומד.\nבלי deps — לופ אינסוף,\nReact צועק ויקרא Stop.",
    visualHook: "📋",
    why: "deps = רשימת התלות. ריק = רק ב-mount. עם משתנים = בכל שינוי שלהם. בלי deps = אחרי כל render (מסוכן).",
  },

  "lesson_24::infinite loop": {
    acronym: "ל.ע.נ",
    expansion: "לולאה → effect משנה state → ניתוק deps",
    rhyme: "אם setN בתוך ה-effect,\nואין deps שיגנו —\nrender מטריג setN, ושוב,\nוhand-shake לא ינוח.",
    visualHook: "♾️",
    why: "כשeffect משנה state ואין deps, נוצר מעגל: render → effect → setState → render → effect → ...",
  },

  "lesson_24::cleanup": {
    acronym: "פ.נ.ב",
    expansion: "פתח (open resource) → נקה (cleanup) → ביטול (unmount)",
    rhyme: "כל setInterval רוצה clearInterval,\nכל listener רוצה remove.\nאם תפתח ולא תסגור,\nmemory leak יבוא ולא יעוף.",
    visualHook: "🧹",
    why: "כל פתיחת משאב (timer, listener, subscription) דורשת סגירה ב-return של ה-effect.",
  },
};

if (typeof window !== "undefined") {
  window.MNEMONICS = MNEMONICS;
}
