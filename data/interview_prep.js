// data/interview_prep.js
// Junior frontend interview prompts mapped to real SVCollege concepts.

var INTERVIEW_PREP = [
  {
    id: "interview_array_map_filter",
    category: "JavaScript",
    question: "מה ההבדל בין map, filter ו-forEach?",
    expectedAnswer: "map מחזיר מערך חדש באותו אורך, filter מחזיר רק פריטים שעוברים תנאי, forEach מריץ פעולה בלי להחזיר מערך שימושי.",
    conceptKeys: ["lesson_11::map", "lesson_11::filter", "lesson_11::forEach"],
    followUps: ["מתי לא להשתמש ב-forEach?", "למה mutation בתוך map עלולה להיות בעייתית?"],
  },
  {
    id: "interview_value_reference",
    category: "JavaScript",
    question: "מה ההבדל בין primitive לבין object מבחינת העתקה והשוואה?",
    expectedAnswer: "primitive מושווה לפי ערך; object/array מושווים לפי reference ולכן שני אובייקטים עם אותו תוכן אינם בהכרח שווים.",
    conceptKeys: ["lesson_11::By Value", "lesson_11::By Reference", "lesson_11::object"],
    followUps: ["איך spread עוזר בעדכון immutable?", "למה זה חשוב ב-React state?"],
  },
  {
    id: "interview_props_state",
    category: "React",
    question: "מה ההבדל בין props ל-state?",
    expectedAnswer: "props מגיעים מבחוץ מהורה לילד והם read-only; state נשמר בתוך קומפוננטה ומשתנה דרך setter כדי לגרום ל-render.",
    conceptKeys: ["lesson_21::props", "lesson_22::useState", "lesson_21::Component"],
    followUps: ["מתי מעלים state להורה?", "למה לא משנים props ישירות?"],
  },
  {
    id: "interview_use_effect",
    category: "React",
    question: "מתי משתמשים ב-useEffect ומה הסיכון ב-dependency array לא נכון?",
    expectedAnswer: "useEffect מסנכרן את הקומפוננטה עם משהו חיצוני כמו fetch או timer; dependency חסר יוצר stale value ועודף dependency יכול לגרום להרצות חוזרות.",
    conceptKeys: ["lesson_22::Hook", "lesson_22::state", "lesson_22::re-render"],
    followUps: ["מתי צריך cleanup?", "למה לא כל חישוב צריך useEffect?"],
  },
  {
    id: "interview_keys_rendering",
    category: "React",
    question: "למה צריך key ברשימות React?",
    expectedAnswer: "key יציב עוזר ל-React לזהות איזה item השתנה, נוסף או נמחק; index יכול לגרום לבאגים כשסדר הרשימה משתנה.",
    conceptKeys: ["lesson_21::map", "lesson_21::JSX", "lesson_21::Component"],
    followUps: ["מתי index כ-key עדיין נסבל?", "מה קורה למחיקת item בלי key יציב?"],
  },
  {
    id: "interview_event_prevent_default",
    category: "DOM",
    question: "מה עושה event.preventDefault בטופס?",
    expectedAnswer: "הוא מבטל את פעולת ברירת המחדל של הדפדפן, למשל refresh/submit רגיל, כדי שהקוד יטפל בשליחה בעצמו.",
    conceptKeys: ["lesson_17::event.preventDefault", "lesson_17::POST", "lesson_17::form"],
    followUps: ["מה ההבדל בין preventDefault ל-stopPropagation?", "איפה שמים אותו ב-submit handler?"],
  },
  {
    id: "interview_async_await",
    category: "Async",
    question: "מה ההבדל בין Promise לבין async/await?",
    expectedAnswer: "Promise הוא אובייקט שמייצג תוצאה עתידית; async/await הוא תחביר נוח שמחכה ל-Promise בתוך פונקציה async.",
    conceptKeys: ["lesson_15::Promise", "lesson_15::Asynchronous", "lesson_15::fetch"],
    followUps: ["איך מטפלים בשגיאה עם try/catch?", "מה קורה אם שוכחים await?"],
  },
  {
    id: "interview_rest_status",
    category: "Backend",
    question: "מה המשמעות של status codes 200, 201, 400 ו-500 ב-REST API?",
    expectedAnswer: "200 הצלחה כללית, 201 יצירה, 400 בקשה לא תקינה מהלקוח, 500 שגיאה בשרת.",
    conceptKeys: ["lesson_17::REST API", "lesson_17::Status Codes", "lesson_17::Response"],
    followUps: ["מתי תחזיר 404?", "למה POST מוצלח ליצירה עדיף שיחזיר 201?"],
  },
  {
    id: "interview_next_server_client",
    category: "Next.js",
    question: "מה ההבדל בין server component ל-client component ב-Next.js?",
    expectedAnswer: "Server component רץ בשרת ומתאים לנתונים וסודות; client component רץ בדפדפן ונדרש לאינטראקציה, state ואירועים.",
    conceptKeys: ["lesson_nextjs::server component", "lesson_nextjs::client component", "lesson_nextjs::App Router"],
    followUps: ["מתי צריך 'use client'?", "איפה אסור לחשוף secret?"],
  },
  {
    id: "interview_ts_union_interface",
    category: "TypeScript",
    question: "למה משתמשים ב-union type ומתי interface מתאים?",
    expectedAnswer: "union מגביל ערך לאחת מכמה אפשרויות; interface מתאים לתיאור צורת אובייקט וחוזה בין חלקי קוד.",
    conceptKeys: ["lesson_26::union", "lesson_26::interface", "lesson_26::type alias"],
    followUps: ["איך exhaustive switch משתמש ב-never?", "מתי תעדיף type alias?"],
  },
  {
    id: "interview_auth_jwt_cookie",
    category: "Security",
    question: "מה ההבדל בין cookie, session ו-JWT?",
    expectedAnswer: "cookie הוא מנגנון אחסון/שליחה בדפדפן; session הוא מצב התחברות שנשמר לרוב בשרת; JWT הוא token חתום עם claims וזמן תפוגה.",
    conceptKeys: ["lesson_auth_security::cookie", "lesson_auth_security::session", "lesson_auth_security::JWT"],
    followUps: ["למה HttpOnly חשוב?", "מה הסיכון ב-localStorage לאסימוני גישה?"],
  },
  {
    id: "interview_css_box_model",
    category: "HTML/CSS",
    question: "מה כולל box model ולמה box-sizing: border-box עוזר?",
    expectedAnswer: "box model כולל content, padding, border ו-margin; border-box מכניס padding/border לתוך width וכך מצמצם overflow מפתיע.",
    conceptKeys: ["lesson_html_css_foundations::box model", "lesson_html_css_foundations::CSS selector", "lesson_html_css_foundations::cascade and specificity"],
    followUps: ["מה ההבדל בין margin ל-padding?", "איך תבדוק overflow בדף?"],
  },
];

if (typeof window !== "undefined") {
  window.INTERVIEW_PREP = INTERVIEW_PREP;
}
