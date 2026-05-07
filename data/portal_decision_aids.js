(function () {
  "use strict";

  window.PORTAL_DECISION_AIDS = {
    home: {
      title: "עמוד הבית",
      subtitle: "בחר שיעור אם אתה לומד חומר חדש; בחר מאמן או מושגים נטו אם אתה רוצה להוכיח שליטה.",
      rows: [
        { term: "שיעור", oneLine: "מסלול לימוד מלא לפי סדר הקורס.", detail: "פותחים שיעור כשצריך ללמוד מושג מהתחלה, לראות קוד, שאלות והסברים מדורגים." },
        { term: "מושגים נטו", oneLine: "אבחון מהיר על מושגים בלי עטיפות.", detail: "מתאים לפני מבחן, אבל תשובה לא נכונה יכולה להוריד ניקוד במסלול המסוכן." },
        { term: "מאמן ידע", oneLine: "תרגול אדפטיבי לפי החולשות שלך.", detail: "המאמן בוחר שאלות לפי רמת הידע והטעויות שכבר עשית." },
      ],
      comparisons: [{
        title: "מתי להתחיל מאיפה",
        rows: [
          { term: "לימוד חדש", what: "שיעורים", when: "כשמושג לא ברור בכלל." },
          { term: "תרגול ממוקד", what: "מאמן ידע", when: "כשכבר למדת ורוצה לחזק חולשות." },
          { term: "בדיקת רמה", what: "מושגים נטו", when: "כשצריך לדעת מהר איפה אתה עומד." },
        ],
      }],
    },
    lesson: {
      title: "שיעור",
      subtitle: "קודם קוראים שורה אחת לכל מושג, אחר כך פותחים רק את מה שלא חד.",
      rows: [
        { term: "שורה אחת", oneLine: "הגדרה קצרה בלי רעש.", detail: "אם השורה לא מספיקה, פתח את כרטיס המושג המלא." },
        { term: "השוואות", oneLine: "טבלה שמראה מתי להשתמש במה.", detail: "משמשת למושגים דומים כמו map/filter/find או props/state." },
        { term: "תרגול", oneLine: "שאלה מוכיחה הבנה, לא רק זיכרון.", detail: "הציון למושג עולה רק כששאלה ברמה מתאימה נענית נכון." },
      ],
      comparisons: [{
        title: "איך ללמוד שיעור",
        rows: [
          { term: "לא מכיר", what: "כרטיס מלא", when: "צריך הסבר, קוד ודוגמאות." },
          { term: "מכיר חלקית", what: "השוואה", when: "מתבלבל בין מושגים דומים." },
          { term: "לפני מבחן", what: "שורה אחת + שאלות", when: "צריך חזרה מהירה ומדידה." },
        ],
      }],
    },
    guide: {
      title: "מדריך מקוצר",
      subtitle: "מפת דרכים מהירה: מה הנושא, מה צריך לדעת, ומה לתרגל.",
      rows: [
        { term: "נושא", oneLine: "פרק קצר שמרכז רעיון אחד.", detail: "השתמש בו כדי לזהות במה להתמקד לפני כניסה לשיעור מלא." },
        { term: "שאלת MC", oneLine: "בדיקת הבנה מהירה.", detail: "טובה לזיהוי בלבול בין מושגים קרובים." },
        { term: "Fill", oneLine: "השלמת קוד שמכריחה דיוק.", detail: "טובה למבחן כי היא בודקת syntax ותפקיד בקוד." },
      ],
      comparisons: [{
        title: "סוגי בדיקה במדריך",
        rows: [
          { term: "MC", what: "בחירה בין תשובות", when: "לבדיקת מושג והבדלים." },
          { term: "Fill", what: "השלמת טוקן", when: "לבדיקת syntax וקוד." },
          { term: "שיעור מלא", what: "הסבר עמוק", when: "כשהמדריך קצר מדי." },
        ],
      }],
    },
    grandma: {
      title: "ידע ברמת סבתא",
      subtitle: "מסביר מושגים כלליים בשפה פשוטה לפני שנכנסים לקוד מקצועי.",
      rows: [
        { term: "משל", oneLine: "תמונה פשוטה שמחברת מושג לחיים.", detail: "משתמשים בו כשמונח טכני עדיין לא נתפס." },
        { term: "מונח", oneLine: "שם טכני שחייב לדעת.", detail: "אחרי המשל, לומדים את המילה המדויקת שתופיע במבחן." },
        { term: "דוגמה", oneLine: "מקרה קטן שמראה את המושג בפועל.", detail: "דוגמה טובה סוגרת את הפער בין הסבר לזיהוי בקוד." },
      ],
      comparisons: [{
        title: "מעבר מסבתא למקצועי",
        rows: [
          { term: "משל", what: "הבנה ראשונה", when: "המושג חדש." },
          { term: "מונח טכני", what: "דיוק", when: "צריך לענות במבחן." },
          { term: "קוד", what: "יישום", when: "צריך להוכיח הבנה." },
        ],
      }],
    },
    "concept-sprint": {
      title: "מושגים נטו",
      subtitle: "רשימת מושגים קצרה, אבחון מהיר, והשוואות חובה כשיש כמה אפשרויות דומות.",
      rows: [
        { term: "מושג", oneLine: "שם + משפט אחד שמגדיר אותו.", detail: "המטרה היא לדעת להגיד מה זה לפני שנכנסים לקוד." },
        { term: "מסלול מהיר", oneLine: "מעט שאלות, סיכון גבוה.", detail: "מתאים רק כשאתה בטוח. כישלון מוריד נקודות." },
        { term: "מסלול ארוך", oneLine: "יותר שאלות, אבחון יציב.", detail: "עדיף כשצריך תמונת ידע אמינה לפני מבחן." },
      ],
      comparisons: [{
        title: "קצב אבחון",
        rows: [
          { term: "מהיר", what: "5 שאלות", when: "רוצה בדיקה זריזה ומוכן לקנס." },
          { term: "בינוני", what: "12 שאלות", when: "רוצה איזון בין זמן ואמינות." },
          { term: "ארוך", what: "30 שאלות", when: "רוצה מפת רמה התחלתית רחבה." },
        ],
      }],
    },
    trainer: {
      title: "מאמן ידע",
      subtitle: "כל תשובה מעדכנת את רמת הידע במושג, בנושא ובמסלול הלמידה.",
      rows: [
        { term: "שאלה אדפטיבית", oneLine: "שאלה שנבחרת לפי הרמה שלך.", detail: "אחרי טעות המושג נכנס לחולשות ומקבל הסבר תיקון." },
        { term: "חולשה", oneLine: "מושג שחזרת לטעות בו או שלא תרגלת מספיק.", detail: "חולשות מקבלות עדיפות בשאלות הבאות." },
        { term: "שליטה", oneLine: "נכונות יציבה גם בשאלה קשה.", detail: "לא מספיק לענות על שאלה קלה כדי לקבל ציון גבוה." },
      ],
      comparisons: [{
        title: "מה המאמן בודק",
        rows: [
          { term: "זיכרון", what: "שאלות קלות", when: "בודק אם שמעת את המושג." },
          { term: "הבנה", what: "שאלות בינוניות", when: "בודק שימוש נכון." },
          { term: "שליטה", what: "שאלות קשות", when: "בודק פתרון בעיה וקוד." },
        ],
      }],
    },
    study: {
      title: "לימוד מותאם",
      subtitle: "מסלול שמתחיל מהחולשות ומחזיר אותך לחומר בקצב בטוח.",
      rows: [
        { term: "חזרה מומלצת", oneLine: "מושג שכדאי לפתוח עכשיו.", detail: "נקבע לפי טעויות, זמן מאז תרגול ורמת שליטה." },
        { term: "הסבר", oneLine: "תיקון קצר לפני שאלה.", detail: "ההסבר מצמצם את הפער לפני שאתה מנסה שוב." },
        { term: "תרגול", oneLine: "שאלה שמוכיחה שההסבר נקלט.", detail: "רק תשובה נכונה מקדמת את המושג." },
      ],
      comparisons: [{
        title: "מתי להשתמש בלימוד מותאם",
        rows: [
          { term: "הרבה טעויות", what: "לימוד מותאם", when: "צריך בנייה מחדש." },
          { term: "מעט טעויות", what: "מאמן ידע", when: "צריך חיזוק ממוקד." },
          { term: "לפני מבחן", what: "מבחן מדומה", when: "צריך סימולציה." },
        ],
      }],
    },
    flashcards: {
      title: "כרטיסיות",
      subtitle: "חשיפה עצמית: אתה אומר לעצמך אם ידעת, ואז המערכת מתזמנת חזרה.",
      rows: [
        { term: "Again", oneLine: "לא ידעתי.", detail: "הכרטיס יחזור מהר יותר." },
        { term: "Hard", oneLine: "ידעתי בקושי.", detail: "הכרטיס יחזור בקרוב." },
        { term: "Good", oneLine: "ידעתי סביר.", detail: "הכרטיס נדחה לזמן ארוך יותר." },
        { term: "Easy", oneLine: "ידעתי מיד.", detail: "הכרטיס נדחה הכי רחוק." },
      ],
      comparisons: [{
        title: "דירוג כרטיס",
        rows: [
          { term: "Again", what: "כישלון", when: "לא מצליח להסביר." },
          { term: "Hard", what: "ידע חלש", when: "צריך לחשוב הרבה." },
          { term: "Good", what: "ידע עובד", when: "הסבר נכון בלי מאמץ גדול." },
          { term: "Easy", what: "שליטה", when: "תשובה מיידית וברורה." },
        ],
      }],
    },
    "mock-exam": {
      title: "מבחן מדומה",
      subtitle: "סימולציה עם זמן, ציון, פירוק חולשות, ושאלות מכמה סוגים.",
      rows: [
        { term: "תבנית", oneLine: "קובעת אורך, זמן ותמהיל שאלות.", detail: "בחר קצר לחימום, מלא לסימולציה אמיתית." },
        { term: "Timer", oneLine: "מדמה לחץ מבחן.", detail: "אם נגמר הזמן המבחן מוגש אוטומטית." },
        { term: "Breakdown", oneLine: "מראה איפה נפלת.", detail: "אחרי המבחן עוברים לחולשות ולא לציון הכללי בלבד." },
      ],
      comparisons: [{
        title: "בחירת תבנית",
        rows: [
          { term: "קצר", what: "מעט שאלות", when: "בדיקה מהירה." },
          { term: "ממוקד", what: "נושא אחד", when: "חולשה ידועה." },
          { term: "מלא", what: "כל הקורס", when: "חזרה לפני מבחן." },
        ],
      }],
    },
    codeblocks: {
      title: "בלוקי קוד",
      subtitle: "לומדים קוד לפי שורות, ואז עונים על שאלות שמחוברות למושגים.",
      rows: [
        { term: "בלוק", oneLine: "קטע קוד עם רעיון אחד.", detail: "פותחים בלוק כדי לראות רצף פעולות ולא רק מושג בודד." },
        { term: "שורה", oneLine: "פעולה אחת בתוך הבלוק.", detail: "הבנת שורה מסבירה איך הקוד מתקדם." },
        { term: "שאלה", oneLine: "בדיקה על תפקיד השורה.", detail: "התשובה מעדכנת את רמת המושג המקושר." },
      ],
      comparisons: [{
        title: "איך לקרוא קוד",
        rows: [
          { term: "שורה", what: "מה קורה עכשיו", when: "debug מקומי." },
          { term: "בלוק", what: "מה המטרה", when: "הבנת flow." },
          { term: "פלט", what: "מה יוצא", when: "תרגול trace." },
        ],
      }],
    },
    trace: {
      title: "Code Trace",
      subtitle: "חיזוי מצב ופלט צעד אחר צעד.",
      rows: [
        { term: "State", oneLine: "הערכים בזיכרון כרגע.", detail: "צריך לדעת מה השתנה אחרי כל שורה." },
        { term: "Output", oneLine: "מה יודפס או יוחזר.", detail: "לא מנחשים; עוקבים אחרי state." },
        { term: "Step", oneLine: "שורה אחת בזמן.", detail: "כל צעד מקרב לפלט הסופי." },
      ],
      comparisons: [{
        title: "Trace מול קריאת קוד רגילה",
        rows: [
          { term: "Trace", what: "מעקב לפי זמן", when: "שואלים מה יודפס." },
          { term: "Anatomy", what: "תפקיד חלקי הקוד", when: "שואלים מה כל token עושה." },
          { term: "Codeblocks", what: "הבנת בלוק", when: "שואלים למה הקוד נכתב כך." },
        ],
      }],
    },
    anatomy: {
      title: "פירוק קוד",
      subtitle: "כל סימן בקוד מקבל תפקיד קצר.",
      rows: [
        { term: "Token", oneLine: "חתיכה קטנה בקוד.", detail: "למשל const, שם משתנה, סוגריים או נקודה." },
        { term: "Role", oneLine: "מה החתיכה עושה.", detail: "הבדל בין שם, פעולה, תנאי, פרמטר או ערך." },
        { term: "Pattern", oneLine: "מבנה שחוזר על עצמו.", detail: "כשלומדים pattern אפשר לזהות קוד חדש מהר." },
      ],
      comparisons: [{
        title: "רמות פירוק קוד",
        rows: [
          { term: "Token", what: "סימן בודד", when: "syntax לא ברור." },
          { term: "Expression", what: "ביטוי שמחזיר ערך", when: "רוצים לדעת מה מתקבל." },
          { term: "Statement", what: "פקודה", when: "רוצים לדעת מה מתבצע." },
        ],
      }],
    },
    comparator: {
      title: "השוואות",
      subtitle: "טבלאות קצרות למושגים שמתבלבלים ביניהם.",
      rows: [
        { term: "מה זה", oneLine: "הגדרה של כל צד.", detail: "קוראים קודם את ההבדל המהותי." },
        { term: "מתי להשתמש", oneLine: "כלל בחירה מעשי.", detail: "המטרה היא לבחור נכון בזמן כתיבת קוד." },
        { term: "טעות נפוצה", oneLine: "איפה תלמידים מתבלבלים.", detail: "לומדים את הגבול בין שתי אפשרויות." },
      ],
      comparisons: [{
        title: "איך להשתמש בהשוואות",
        rows: [
          { term: "דומים בשם", what: "טבלה", when: "GET/POST, map/filter." },
          { term: "דומים בתפקיד", what: "דוגמאות", when: "props/state, ref/state." },
          { term: "דומים בקוד", what: "פירוק קוד", when: "syntax נראה אותו דבר." },
        ],
      }],
    },
    "knowledge-map": {
      title: "מפת ידע",
      subtitle: "תמונה של רמת שליטה לפי מושגים ונושאים.",
      rows: [
        { term: "מושג", oneLine: "יחידת ידע שנמדדת בכל הפורטל.", detail: "כל שאלה על המושג מעדכנת את אותה רמת ידע." },
        { term: "נושא", oneLine: "קבוצת מושגים קשורים.", detail: "עוזר לראות חולשה אזורית, לא רק פריט אחד." },
        { term: "ציון", oneLine: "הערכה יחסית של שליטה.", detail: "ציון גבוה דורש הצלחה גם בשאלות קשות." },
      ],
      comparisons: [{
        title: "רמות במפה",
        rows: [
          { term: "אדום", what: "חלש", when: "פותחים לימוד מותאם." },
          { term: "צהוב", what: "בדרך", when: "מתרגלים במאמן." },
          { term: "ירוק", what: "חזק", when: "בודקים במבחן קשה." },
        ],
      }],
    },
    gap: {
      title: "מטריצת פערים",
      subtitle: "איפה חסר ידע, איפה חסר תרגול, ואיפה צריך רק חזרה.",
      rows: [
        { term: "פער אדום", oneLine: "חולשה שצריך לטפל בה עכשיו.", detail: "טעות חוזרת או רמה נמוכה בנושא חשוב." },
        { term: "פער צהוב", oneLine: "ידע ביניים לא יציב.", detail: "נכון לפעמים, אבל לא מספיק למבחן קשה." },
        { term: "פער ירוק", oneLine: "כמעט סגור.", detail: "צריך רק לוודא בשאלה קשה." },
      ],
      comparisons: [{
        title: "סוגי פערים",
        rows: [
          { term: "לא נלמד", what: "אין ניסיונות", when: "פותחים שיעור." },
          { term: "נלמד ונשכח", what: "עבר זמן", when: "כרטיסיות או SRS." },
          { term: "נלמד לא נכון", what: "טעויות", when: "הסבר תיקון ומאמן." },
        ],
      }],
    },
    "learning-evidence": {
      title: "ראיות למידה",
      subtitle: "לא מסתפקים בתחושה; בודקים פעולות, טעויות, וחזרות לאורך זמן.",
      rows: [
        { term: "Evidence", oneLine: "פעולה שמוכיחה למידה.", detail: "תשובה, תיקון טעות, חזרה או פתרון קוד." },
        { term: "Remediation", oneLine: "תיקון אחרי טעות.", detail: "המערכת צריכה להסביר מה נשבר ואיך לזכור." },
        { term: "Retention", oneLine: "האם הידע נשאר.", detail: "נמדד כשחוזרים למושג אחרי זמן." },
      ],
      comparisons: [{
        title: "מדדי למידה",
        rows: [
          { term: "Accuracy", what: "אחוז נכונות", when: "בדיקת תוצאה." },
          { term: "Coverage", what: "כמה מושגים כוסו", when: "בדיקת חומר." },
          { term: "Retention", what: "ידע לאורך זמן", when: "בדיקת זכירה." },
        ],
      }],
    },
    capstones: {
      title: "פרויקטי גמר",
      subtitle: "מחברים מושגים למשימה אמיתית עם דרישות, בדיקות ו-review.",
      rows: [
        { term: "Requirement", oneLine: "מה חייב לעבוד.", detail: "דרישה שלא עובדת פוסלת את הפתרון." },
        { term: "Edge case", oneLine: "מקרה שעלול לשבור קוד.", detail: "בודק אם הפתרון יציב מעבר לדוגמה הרגילה." },
        { term: "Review", oneLine: "בדיקת איכות הפתרון.", detail: "כוללת קריאות, בדיקות, אבטחה ותחזוקה." },
      ],
      comparisons: [{
        title: "חלקי פרויקט",
        rows: [
          { term: "MVP", what: "מינימום עובד", when: "להוכיח בסיס." },
          { term: "Hardening", what: "חיזוק", when: "לטפל בקצה ושגיאות." },
          { term: "Polish", what: "שיפור UX", when: "אחרי שהלוגיקה נכונה." },
        ],
      }],
    },
    blueprints: {
      title: "יישור SVCollege",
      subtitle: "בודק האם כל חומר הקורס מכוסה בכל שכבות הפורטל.",
      rows: [
        { term: "Covered", oneLine: "יש שיעור, שאלות ותרגול.", detail: "אפשר ללמוד ולמדוד את המושג בפועל." },
        { term: "Partial", oneLine: "קיים חלק מהכיסוי.", detail: "צריך להשלים שאלות, build, trace או prerequisites." },
        { term: "Gap", oneLine: "חסר חומר קריטי.", detail: "נכנס לעדיפות ראשונה לפני הרחבות." },
      ],
      comparisons: [{
        title: "סטטוס כיסוי",
        rows: [
          { term: "Covered", what: "מוכן למבחן", when: "יש תוכן ותרגול." },
          { term: "Partial", what: "לא מספיק", when: "יש רק הסבר או רק שאלות." },
          { term: "Gap", what: "חסר", when: "אין כיסוי אמיתי." },
        ],
      }],
    },
    "programming-basics": {
      title: "אבני הבסיס",
      subtitle: "מבינים מהו ערך, משתנה, תנאי, מערך ופונקציה לפני framework.",
      rows: [
        { term: "Value", oneLine: "מידע שהמחשב יכול לשמור או לחשב.", detail: "מספר, טקסט, אמת/שקר, רשימה או אובייקט." },
        { term: "Variable", oneLine: "שם שמצביע לערך.", detail: "משתמשים בו כדי לקרוא ולשנות מידע בקוד." },
        { term: "Function", oneLine: "פעולה שמקבלת קלט ומחזירה או עושה משהו.", detail: "הדרך להפוך רצף פעולות לכלי חוזר." },
      ],
      comparisons: [{
        title: "אבנים בסיסיות",
        rows: [
          { term: "Value", what: "המידע עצמו", when: "צריך לשמור נתון." },
          { term: "Variable", what: "שם לנתון", when: "צריך להשתמש בו שוב." },
          { term: "Array", what: "רשימת ערכים", when: "כמה פריטים מאותו סוג." },
          { term: "Function", what: "פעולה", when: "אותו תהליך חוזר." },
        ],
      }],
    },
    "programming-principles": {
      title: "עקרונות יסוד",
      subtitle: "הכללים שהופכים קוד ממקרי לאמין.",
      rows: [
        { term: "Determinism", oneLine: "אותו קלט נותן אותה תוצאה.", detail: "חיוני לבדיקות, debugging ואמון במערכת." },
        { term: "Input/Output", oneLine: "מה נכנס ומה יוצא.", detail: "כל פונקציה טובה מבהירה את הגבולות שלה." },
        { term: "Contract", oneLine: "הבטחה בין חלקי קוד.", detail: "אם הקלט או הפלט משתנים, הכל נשבר." },
      ],
      comparisons: [{
        title: "עקרונות שחובה לזהות",
        rows: [
          { term: "Pure", what: "בלי side effects", when: "לוגיקה ובדיקות." },
          { term: "Stateful", what: "שומר מצב", when: "UI, session, DB." },
          { term: "Async", what: "לא מסתיים מיד", when: "fetch, DB, timers." },
        ],
      }],
    },
    "programming-museum": {
      title: "מוזיאון שפות",
      subtitle: "היסטוריה חזותית: מה כל שכבה פתרה ומה המחיר שהיא הוסיפה.",
      rows: [
        { term: "חומרה", oneLine: "חשמל שמייצג 0/1.", detail: "הבסיס שעליו נבנים ביטים, זיכרון ופקודות." },
        { term: "שפה", oneLine: "דרך לבני אדם לכתוב הוראות.", detail: "השפה מתורגמת למכונה דרך compiler או interpreter." },
        { term: "Framework", oneLine: "מבנה מוכן לבניית אפליקציה.", detail: "חוסך עבודה, אבל מוסיף כללים ועלות למידה." },
      ],
      comparisons: [{
        title: "שכבות היסטוריות",
        rows: [
          { term: "Machine code", what: "פקודות למעבד", when: "קרוב לחומרה." },
          { term: "C", what: "שליטה וזיכרון", when: "מערכות וביצועים." },
          { term: "JS", what: "ווב ואינטראקציה", when: "דפדפן ושרת Node." },
          { term: "React", what: "UI כקומפוננטות", when: "ממשקים דינמיים." },
        ],
      }],
    },
    "language-tools": {
      title: "שפות וכלי פיתוח",
      subtitle: "מי שכבה, מי שפה, מי runtime, ומתי לבחור כל אחד.",
      rows: [
        { term: "React", oneLine: "ספרייה לבניית UI מקומפוננטות.", detail: "לא מחליפה שרת או מסד נתונים." },
        { term: "Next.js", oneLine: "Framework שמוסיף ל-React routing, rendering ושרת.", detail: "מתאים לאפליקציות web מלאות." },
        { term: "Node.js", oneLine: "runtime שמריץ JavaScript מחוץ לדפדפן.", detail: "משמש לשרתים, API, scripts וכלי פיתוח." },
      ],
      comparisons: [{
        title: "שכבות Web",
        rows: [
          { term: "React", what: "UI", when: "מסכים, כפתורים, קומפוננטות." },
          { term: "Next.js", what: "Full-stack framework", when: "עמודים, SSR, API, routing." },
          { term: "Node.js", what: "Backend runtime", when: "שרת, DB, scripts." },
        ],
      }],
    },
    "reward-store": {
      title: "חנות וחוויות",
      subtitle: "XP ומטבעות פותחים חוויות רק אחרי למידה אמיתית.",
      rows: [
        { term: "XP", oneLine: "ניקוד התקדמות.", detail: "עולה מתשובות, הישגים ופתרון קוד." },
        { term: "מטבעות", oneLine: "משאב לקניית חוויות.", detail: "נשמר מקומית לפרופיל התלמיד." },
        { term: "נעילה", oneLine: "חלק חוויתי שדורש מחיר.", detail: "המטרה היא לתגמל למידה, לא לחסום חומר חובה." },
      ],
      comparisons: [{
        title: "פרסים",
        rows: [
          { term: "חומר חובה", what: "פתוח", when: "תמיד זמין ללמידה." },
          { term: "חוויה", what: "נעולה", when: "נפתחת עם מטבעות." },
          { term: "הישג", what: "מדליה", when: "מוכיח מאמץ או שליטה." },
        ],
      }],
    },
    settings: {
      title: "הגדרות",
      subtitle: "כאן מגדירים תצוגה, נגישות, שמירה וייצוא בלי לגעת בתוכן הלמידה.",
      rows: [
        { term: "תצוגה", oneLine: "ערכת צבע ומצבי צפייה.", detail: "משתמשים כשצריך לפשט מסך ולהתרכז במסלול." },
        { term: "נגישות", oneLine: "טקסט, ניגודיות ותנועה.", detail: "מגדירים פעם אחת כדי שהלימוד יהיה קריא ונוח." },
        { term: "שמירה/ייצוא", oneLine: "בקרת התקדמות ו-backup.", detail: "בודקים לפני מבחן שהמצב נשמר כמו שצריך." },
      ],
      comparisons: [{
        title: "מה לשנות ומתי",
        rows: [
          { term: "פוקוס", what: "פחות עומס מסך", when: "כשלומדים למסלול סגור." },
          { term: "נגישות", what: "קריאות", when: "כשיש עייפות/עומס." },
          { term: "ייצוא", what: "גיבוי ידני", when: "לפני סיום יום או לפני מבחן." },
        ],
      }],
    },
  };

  // Canonical tab aliases (single source for navigation ids)
  window.PORTAL_DECISION_AIDS["grandma-knowledge"] = window.PORTAL_DECISION_AIDS.grandma;
  window.PORTAL_DECISION_AIDS.km = window.PORTAL_DECISION_AIDS["knowledge-map"];
  window.PORTAL_DECISION_AIDS["gap-matrix"] = window.PORTAL_DECISION_AIDS.gap;
})();
