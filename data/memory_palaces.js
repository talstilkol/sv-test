// data/memory_palaces.js — AUDIT-FIX-11 Concept-as-Place memory palace
// Coordinates render as an offline SVG room in the concept card.

var MEMORY_PALACES = {
  "lesson_22::useState": {
    title: "חדר זיכרון של useState",
    room: "חדר בקרה קטן עם כפתור, תא זיכרון ומסך",
    route: ["כפתור", "setCount", "תא state", "render חדש"],
    spots: [
      { label: "כפתור", x: 18, y: 68, note: "אירוע משתמש מתחיל שינוי." },
      { label: "setCount", x: 42, y: 42, note: "בקשה רשמית ל-React לעדכן ערך." },
      { label: "תא state", x: 66, y: 34, note: "React שומר את הערך בין renders." },
      { label: "מסך", x: 82, y: 68, note: "render חדש מציג את הערך." },
    ],
  },

  "lesson_24::useEffect": {
    title: "מעבדת אפקטים",
    room: "מעבדה שבה העבודה החיצונית מתחילה רק אחרי שהמסך מוכן",
    route: ["DOM מוכן", "אפקט", "עבודה חיצונית", "cleanup"],
    spots: [
      { label: "DOM מוכן", x: 20, y: 30, note: "commit הסתיים לפני האפקט." },
      { label: "אפקט", x: 45, y: 48, note: "הפונקציה של useEffect מתחילה." },
      { label: "עבודה חיצונית", x: 70, y: 32, note: "fetch, listener, timer או subscription." },
      { label: "cleanup", x: 74, y: 72, note: "סגירה לפני deps חדשים או unmount." },
    ],
  },

  "lesson_22::immutable": {
    title: "סדנת העתקה במקום מוטציה",
    room: "שולחן עם מקור, מכונת העתקה וקבלה חדשה",
    route: ["מקור", "copy", "שינוי", "הפניה חדשה"],
    spots: [
      { label: "מקור", x: 18, y: 50, note: "ה-state הישן לא נוגעים בו." },
      { label: "copy", x: 42, y: 34, note: "spread יוצר collection חדש." },
      { label: "שינוי", x: 62, y: 52, note: "מוסיפים/מעדכנים על העותק." },
      { label: "הפניה חדשה", x: 82, y: 36, note: "React מזהה reference אחר." },
    ],
  },

  "lesson_21::JSX": {
    title: "תחנת תרגום JSX",
    room: "מסוע שמתחיל ב-markup ומסתיים בעץ React",
    route: ["תגית", "ביטוי JS", "טרנספורמציה", "React element"],
    spots: [
      { label: "תגית", x: 16, y: 35, note: "נראה כמו HTML." },
      { label: "ביטוי JS", x: 38, y: 68, note: "סוגריים מסולסלים מכניסים JavaScript." },
      { label: "טרנספורמציה", x: 62, y: 42, note: "ה-build tool מתרגם." },
      { label: "React element", x: 84, y: 60, note: "React מקבל object לתיאור UI." },
    ],
  },

  "lesson_23::Router": {
    title: "תחנת רכבת של Router",
    room: "לוח תחנות שמחליף קומפוננטה לפי URL",
    route: ["URL", "Routes", "Route", "element"],
    spots: [
      { label: "URL", x: 18, y: 32, note: "ה-path הנוכחי." },
      { label: "Routes", x: 44, y: 48, note: "מנוע ההתאמות." },
      { label: "Route", x: 64, y: 30, note: "כלל אחד: path מול element." },
      { label: "element", x: 82, y: 66, note: "הקומפוננטה שמוצגת." },
    ],
  },

  "lesson_11::map": {
    title: "פס ייצור של map",
    room: "מכונה שמכניסה item אחד ומוציאה item חדש",
    route: ["מערך מקור", "callback", "ערך מוחזר", "מערך חדש"],
    spots: [
      { label: "מערך מקור", x: 14, y: 55, note: "המקור נשאר כפי שהיה." },
      { label: "callback", x: 40, y: 38, note: "פונקציה שרצה על כל item." },
      { label: "ערך מוחזר", x: 64, y: 55, note: "חובה להחזיר ערך." },
      { label: "מערך חדש", x: 84, y: 38, note: "אותו אורך, ערכים חדשים." },
    ],
  },

  "lesson_15::Promise": {
    title: "דלפק הזמנות של Promise",
    room: "דלפק עם קבלה pending ושתי יציאות: resolve או reject",
    route: ["pending", "resolve", "then", "catch"],
    spots: [
      { label: "pending", x: 18, y: 52, note: "עוד אין תוצאה." },
      { label: "resolve", x: 44, y: 32, note: "העבודה הצליחה." },
      { label: "then", x: 68, y: 34, note: "מקבל את הערך." },
      { label: "catch", x: 68, y: 72, note: "מטפל בכישלון." },
    ],
  },

  "lesson_17::REST API": {
    title: "מסעדת REST",
    room: "מלצר, תפריט פעולות, מטבח שרת וקבלה ללקוח",
    route: ["URL", "method", "server", "status + JSON"],
    spots: [
      { label: "URL", x: 18, y: 36, note: "איזה resource מבקשים." },
      { label: "method", x: 42, y: 66, note: "מה הפעולה: GET/POST/PUT/DELETE." },
      { label: "server", x: 66, y: 38, note: "ה-route מטפל בבקשה." },
      { label: "status + JSON", x: 84, y: 66, note: "התגובה חוזרת ללקוח." },
    ],
  },
};
