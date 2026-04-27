// data/lesson13.js
var LESSON_13 = {
  id: "lesson_13",
  title: "שיעור 13 - Objects, DOM, Classes & Storage",
  description:
    "נלמד על מבני נתונים מתקדמים באובייקטים, רתימת כוח ה-DOM לשליטה ושינוי ממשק המשתמש, יבוא פרדיגמת המחלקות (Classes), ושמירת נתונים מקומית בדפדפן.",
  concepts: [
    //  ─── A. Objects ──────────────────────────────────────────────────

    // 1. Object
    {
      conceptName: "Object",
      difficulty: 2,
      levels: {
        grandma:
          "אובייקט זה כמו הארון היפה במסדרון. יש לו מגירות, דלתות ומדפים, וכל מקום מכיל פריטים משלו הקשורים יחד לארון אחד שלם.",
        child:
          "קופסת אוצר גדולה שבתוכה יש קופסאות קטנות יותר, ולכל קופסה קטנה יש שם משלה שכתוב עליה המאפשר לגשת בדיוק אליה.",
        soldier:
          "תיק גב קרבי מסודר (צ'ימידן). הוא לא רק שק ריק, אלא יש לו תאים נפרדים וממוספרים: תא כדורים, תא תחבושות, ותא מפות. הכל קורלטיבי ליחידה אחת מוצקה.",
        student:
          "מבנה נתונים בשפת JavaScript. בבסיסו הוא אוסף של זוגות Key-Value. זהו הלב של השפה בגלל שהכל (כמעט) מושתת על עקרון הפרוטוטייפ האובייקטי.",
        junior:
          "כל מה שהיה לי מקובץ במערכים מבלבלים של אינדקסים... נפתר כשהתחלתי לזרוק משתנים לתוך 'פיגומים' אובייקטים בתוך {}. יותר קריא מאשר arr[3].",
        professor:
          "An unordered collection of related data, of primitive or reference types, strictly defined as key-value pairs stored densely in V8 Hidden Classes structure for rapid inline caching optimization.",
      },
      illustration:
        "📦 Object — יחידה המכילה תכונות מוגדרות:\n\n" +
        "   const car = {\n" +
        "      brand: 'BMW',      ← תכונה 1\n" +
        "      wheels: 4,         ← תכונה 2\n" +
        "      color: 'Black'    ← תכונה 3\n" +
        "   };",
      codeExample:
        "const player = {\n   name: 'Goku',\n   level: 9000,\n   isSuperSaiyan: true\n};\n\nconsole.log(player.name); // Prints: 'Goku'",
      codeExplanation:
        "הגדרנו אובייקט player עם שלל תכונות. האובייקט שומר על קשר לוגי ביניהן במקום שנגדיר שלושה משתנים (let) שמתפזרים.",
    },

    // 2. Property
    {
      conceptName: "Property",
      difficulty: 4,
      levels: {
        grandma:
          "תווית המדבקה על המגירה. למשל 'המשקפיים של סבא', שדרכה נדע מה נמצא בפנים מבלי לפתוח קודם.",
        child:
          "שם של הפתק הקטן בתוך תיבת האוצר. אם יש פתק שכתוב עליו 'גיל', הוא אומר לנו בן כמה הקוסם שלנו.",
        soldier:
          "הקטגוריה בפנקס. עמודת 'צבע כומתה' שמחכה למידע (Value). זה מזהה הפריט שאותו אנחנו בוחנים.",
        student:
          "המפתח (Key) בתוך זוג ה-Key-Value של אובייקט ב-JavaScript. המאפיין תמיד יהיה בעל שם מחרוזתי שיאפשר גישה עתידית בעזרת נקודה (.) או סוגריים מרובעים [].",
        junior:
          "בהתחלה התבלבלתי בין משתנה למאפיין. כשכותבים בתוך אובייקט `{ age: 20 }`, המילה age היא 'property' ואין צורך במילה const לפניה.",
        professor:
          "A discrete named attribute tied to an object instance mapping to an underlying associative array architecture. Handled exclusively as string hashes by the internal property lookups mechanism.",
      },
      illustration:
        "🏷️ Property — תווית הזיהוי של המידע:\n\n" +
        "   { \n" +
        "     [Property] : Value\n" +
        "        color   : 'Red'\n" +
        "   }",
      codeExample:
        "const animal = { type: 'Lion' };\n\n// קריאה לפרופרטי 'type':\nconsole.log(animal.type);\n\n// הוספת פרופרטי חדש לאחר מכן:\nanimal.age = 5;",
      codeExplanation:
        "Property היא הדרך שבה האובייקט מתייגם את הנתונים שלו (כמו type, age). הם מופרדים מהערכים שלהם על ידי נקודתיים.",
    },

    // 3. Value
    {
      conceptName: "Value",
      difficulty: 4,
      levels: {
        grandma:
          "מה שבאמת יושב בתוך המגירה. אם המדבקה משקפיים (property), הזוג עצמו מפלסטיק הוא הערך האמיתי (value).",
        child:
          "האוצר האמיתי עצמו מתוך המגירה: חמישה מטבעות זהב או שרשרת נוצצת.",
        soldier:
          "התוכן שעונה לשם הדיון. בסעיף 'סוג נשק', ה-Value הוא ה'Tavor' המדויק שהחייל מחזיק בפועל באותו רגע.",
        student:
          "המידע הריאלי שמאוחסן תחת המפתח. זה יכול להיות נתון פשוט (String, Number) או מבנה מורכב יותר (Array, פונקציה, או אפילו אובייקט נוסף).",
        junior:
          "היו מקרים שמרחתי מילה בלי מרכאות ואז קיבלתי שגיאת Undefined. צריך לקלוט שה-Value תמיד מציית לחוקי הטיפוסים בדיוק כמו הגדרת משתנה רגיל.",
        professor:
          "The terminal payload allocated inside memory boundaries resulting from resolving an explicit Object property descriptor lookup operation.",
      },
      illustration:
        "💎 Value — הערך התוכן הממשי:\n\n" +
        "   { \n" +
        "     Property : [  Value  ]\n" +
        "       color  : [  'Red'  ]\n" +
        "   }",
      codeExample:
        "const student = {\n  firstName: 'Dana',    // 'Dana' זה ערך מטיפוס מחרוזת\n  scores: [90, 85, 99] // הערך פה הוא מערך שלם\n};",
      codeExplanation:
        "הערך (Value) הוא התשובה לתכונה (Property). הוא יכול להיות זה שמשתנה בעזרת השמה מחדש למשתנה.",
    },

    // 4. Method
    {
      conceptName: "Method",
      difficulty: 4,
      levels: {
        grandma:
          "אם האובייקט הוא האוטו שיש לו צבע שחור, אז ה'רדיו' או ה'גז' אלה מערכות פעילות. המתודה היא פקודת ההפעלה ('לנסוע!', 'להשמיע שיר!').",
        child:
          "אישיות הרובוט! מתודה זו הפעולה המיוחדת שהרובוט האובייקטיבי שלך יודע לעשות, למשל robot.jump().",
        soldier:
          "טכניקת היחידה. טנק שוקל 50 טון (תכונה), אך הוא גם יודע לירות (מתודה). הפעולה היא הביצוע הכרוך בכלי עצמו בלבד.",
        student:
          "כאשר ערך (Value) של מאפיין באובייקט מוגדר כפונקציה, הוא הופך ל-Method. זו התנהגות שקשורה קשר הדוק לנתוני האובייקט.",
        junior:
          "פעם ניתקתי במקרה מתודה מקובץ וזה שבר את ה-this שעבד מצוין... לקח לי זמן לכבד את זה שמתודה ופונקציה רגילה מתנהגות שונה לפעמים.",
        professor:
          "A first-class function reference encapsulated as an object boundary property. Usually binds its 'this' implicit parameter directly to its caller hosting context object lexical scope.",
      },
      illustration:
        "🛠️ Method — יכולת מובנית בתוך האובייקט:\n\n" +
        "   const dog = {\n" +
        "     bark: function() {       ← מתודה\n" +
        "       return 'Woof!';\n" +
        "     }\n" +
        "   };\n" +
        "   dog.bark() 🔊",
      codeExample:
        "const calculator = {\n  brand: 'Casio',\n  sum: function(a, b) {\n    return a + b;\n  }\n};\nconsole.log( calculator.sum(2, 5) ); // 7",
      codeExplanation:
        "יצרנו מתודה בשם 'sum'. בעצם הערך שם הוא פונקציה אנונימית שלוקחת 2 פרמטרים. היא חיה ונושמת בזכות עצם המחשבון המארח שלה.",
    },

    //  ─── B. DOM ──────────────────────────────────────────────────────

    // 5. DOM
    {
      conceptName: "DOM",
      difficulty: 4,
      levels: {
        grandma:
          "בובת השלד בחנות שמעליה הלבישו את כל הבגדים. כל תזוזה במפרק בשלד תגרום לשינוי באופן שהבגד עומד ונראה על החלון.",
        child:
          "ציור הקסמים של המסך שיש לו שכבת חוטים נסתרת. אם אנחנו מושכים את חוט ה'אדום', הכובע במסך מחליף צבע חי.",
        soldier:
          'מערכת המכ"ם הטופוגרפית שפורסת את שדה הקרב לגורמים (עצים, מבנים, מטרות). כך לכל יחידת תצוגה יש קורדינטה רשמית שניתן לגעת בה.',
        student:
          "הממשק שמאפשר לתוכנת JavaScript 'לגעת' בחלון הדפדפן. כל תגית HTML עברה תרגום לאובייקט שאפשר לשנות, למחוק או להחליף לו סגנונות.",
        junior:
          "לפני ה-DOM כתבתי לוגיקה אבל שום דבר לא קרה על המסך, עד שהבנתי שה-DOM הוא העסקן, המתווך: הוא לוקח פקודות JS ומצייר אותן בדפדפן ה-HTML שלי.",
        professor:
          "The Document Object Model is an in-memory structural representation mapped dynamically by the rendering engine interpreting markup tokens via DOM Web API interfaces.",
      },
      illustration:
        "🕸️ DOM — חיווט האלמנטים בדף לאובייקטים:\n\n" +
        "   HTML File         DOM Tree (JavaScript) \n" +
        "  <h1>Hello</h1> ──> { tagName: 'h1', innerText: 'Hello' }\n" +
        "   <p>Text</p>   ──> { tagName: 'p', innerText: 'Text' }\n\n" +
        " * JS משנה את האובייקט, המסך מתעדכן בסנכרון!",
      codeExample:
        "// לא קוד טכני אחד, הקונספט הכולל הוא כזה:\n// הדפדפן מרנדר אובייקטים, ו-JS שולט עליהם מהצד:\n// [ JS ] ──(עושה שינויים ב-DOM)──> [ Browser Screen ]",
      codeExplanation:
        "DOM הוא כלליות של קונספט בו קוד שפת תכנות שולט בעצם ויזואלי של סימון שפה. הדפדפן בונה עץ של אובייקטים מאחורי הקלעים כדי לאפשר את גישת העבודה האקטיבית.",
    },

    // 6. Document Object Model
    {
      conceptName: "Document Object Model",
      difficulty: 7,
      levels: {
        grandma:
          "ראשי התיבות של שורש העץ, מילולית: 'מודל שמייצג את המסמך בעזרת אובייקטים שאפשר לזהות אחד-אחד ולגעת בהם'.",
        child:
          "כמו בניית מודל מלגו של הבית שלך בסלון. במודל אתה מזיז חלק בחדר השינה וזה משתקף במסמך המלא של התמונה.",
        soldier:
          "מיפוי מלא מתגית אחת ועד האילן העליון (שורש המסמך). כמו ששילוב הרחוב במפה ממחיש לאיפה ניתן להגיע על ידי הניווט.",
        student:
          "השם המלא והפורמלי למבנה היררכי (העץ) שיוצר יומן עבודה עבור השפה הדינמית כדי לעסוק עם מבנה הדף העומד ביחס לסימטריה.",
        junior:
          "בכל פעם ששמעתי את הראשי תיבות לא חשבתי שזה כזה קריטי, פשוט ידעתי שמדובר באמנות שליטה ב-HTML דרך JavaScript בלעדית.",
        professor:
          "A cross-platform computing API specification by the W3C defining the standard object serialization and representation hierarchy format independent of programming language binding.",
      },
      illustration:
        "🌳 Document Object Model — עץ היררכי:\n\n" +
        "           [ Window ]\n" +
        "               │\n" +
        "          [ Document ]\n" +
        "               │\n" +
        "      ┌────────┴─────────┐\n" +
        "  [ Head ]           [ Body ]\n" +
        "                         │\n" +
        "         ┌───────────────┴──────────────┐\n" +
        "     [ <h1> ]                       [ <div> ]",
      codeExample:
        "/* \n  מושג קוגניטיבי.\n  המבנה היררכי שכל דף אינטרנט לוקח כאשר הוא \n  נטען על ידי מנוע הדפדפן.\n*/",
      codeExplanation:
        "חשוב להבין את המשמעות של העץ המדורג - מסמך שלם שבנוי מאובייקטים, בדיוק מעל לזה ניגש לתיעוד האלמנטים הנמוכים ביותר.",
    },

    // 7. document
    {
      conceptName: "document",
      difficulty: 4,
      levels: {
        grandma:
          "מנהל העבודה שנמצא בכניסה לבניין. אם את רוצה שהעץ יניב משהו במרפסת — את צריכה לפנות ל'המנהל' הראשי שהוא בעל הגן (document).",
        child:
          "המפתח המיוחד לשער הקסמים של האתר. בלי להשתמש במילה 'document' הרובוט לא יורשה להיכנס לטירה ולגעת בחלק מהעוגה.",
        soldier:
          "הקודקוד שמחזיק בכל סמכויות הנתונים המבצעיים. הפקודות עוברות אך ורק דרכו: 'קודקוד שפרה (document) — השמד לי עמדה משנית בגזרה'.",
        student:
          "האובייקט הגלובאלי הראשי בדפדפן המייצג את קובץ ה-HTML שלנו הנטען במסך. הוא זה החושף אלינו פונקציות API (מתודות) לאיתור איברים, כמו getElement ועוד.",
        junior:
          "בהתקפים חדישים בעבר, חשבתי שה-Document הוא איזה Array של הכל יחד. הסריקה בו מוכיחה שהוא אובייקט ענק עם מתודות קודמות שהדפדפן מעניק מלידה.",
        professor:
          "The Document interface instantiation serving as context root object globally exposed in Browser runtime providing core selector querying implementations.",
      },
      illustration:
        "📄 document — נקודת הכניסה לעץ:\n\n" +
        "  [document] \n" +
        "      ├── querySelector() 🔍\n" +
        "      ├── createElement() 🧱\n" +
        "      └── body            🪂",
      codeExample:
        "// גישה למנהל הראשי\nconsole.log(document.title); // שימוש בו להוצאת כותרת האתר\n\ndocument.body.style.backgroundColor = 'blue'; // השפעה מוחלטת דרכו",
      codeExplanation:
        "כל ביצועינו שמוכוונים אל האלמנטים בדף שזורים בקבלת זכות השימוש ב-document שמהווה את נתיב הגישה הממלכתי הראשון.",
    },

    // 8. getElementById
    {
      conceptName: "getElementById",
      difficulty: 4,
      levels: {
        grandma:
          "זוהי תעודת זהות בחקירת משטרה: מחפשים פה פושע אחד בלבד שיש לו את מספר תעודת הזהות הספציפי שדיברנו עליו (ID).",
        child:
          "אחרי שחילקנו תגים עם שמות לכל צעצוע, getElementById זה פנס שמאיר מייד אך ורק על הצעצוע שיש לו את תג השם הספציפי ההוא.",
        soldier:
          "איכון מטרה לפי ציון קואורדינטות ייחודי מראש. מתבצע רק פעם אחת בסריקה ומיועד לדקירה של מפרט יחיד בעל אפיון בלעדי.",
        student:
          "מתודה תחת Document ששולפת מן ה-DOM אלמנט אחד ספציפי הנישא עמו Attribute בשם 'id'. מאחר ו-ID הוא יוניקי (Unique), היא מחזירה תמיד רק אובייקט בודד, או null.",
        junior:
          "מאד יעיל כשאני רוצה לתפוס כפתור הרשמה יחיד ולא לעבור חילי מחלקות. פשוט רושם את מזהה הכינוי ומקבל את האובייקט שחיכיתי לו.",
        professor:
          "Traverses the DOM internally utilizing highly-optimized Hash tables mapped by the browser layout engine. Returning immediately O(1) matching reference upon first hit.",
      },
      illustration:
        "🎯 getElementById — שליפת יחיד ייחודי:\n\n" +
        "  [HTML] <div id='mainBanner'></div>\n" +
        "                ↑\n" +
        "  [JS  ] document.getElementById('mainBanner')\n" +
        "                └─ תפס אותו! 🎣",
      codeExample:
        "const myButton = document.getElementById('login-btn');\n// כעת יש לנו כוח שליטה על הכפתור שלחץ המשתמש במשתנה JS",
      codeExplanation:
        "זוהי אולי המתודה העתיקה והמהירה ביותר להגיע לאלמנט יחיד בלי לבזבז זמן חיפוש רב מדי בתוך עץ המחשב של השפה.",
    },

    // 9. getElementsByTagName
    {
      conceptName: "getElementsByTagName",
      difficulty: 4,
      levels: {
        grandma:
          "קריאה של מורה בחצר בית הספר: 'שכל הבנות יבואו לפה'. היא אוספת קבוצה שלמה רק לפי הזהות הכללית הברורה לעין שלהם בבית הספר.",
        child:
          "לשאוב את כל המחקים בקלמר שלנו לתא אחד! אנחנו מבקשים מהקסם לא להסתכל על צבע המחק ולא על שם, אלא להביא בבת אחת את 'כל סוגי המחקים שיש פה'.",
        soldier:
          "פקודת עוקץ מבוססת תו תקן כלי: 'הבא את כל כלי הרכב המשורינים' — תפיסת משתנים לפי המבנה שמייצר משבצת תפעול מחלקתית מרוכזת (div, section).",
        student:
          "שליפת עדה של אלמנטים לפי סוג ה-HTML Tag שלהם (לדוגמה 'p', 'div' או 'a'). היא מדפיסה בתמורה HTMLCollection (שדומה למערך אך אינו מערך אמיתי ולכן מוגבל).",
        junior:
          "רציתי פעם לשנות את כל הכותרות הרשמיות לדף באותה פקודה. תפסתי אותן ב-TagName, ואז רציתי לעשות forEach אבל זה קרס. למדתי שאי אפשר בלי להמיר את אוסף ה-HTML למערך רגיל.",
        professor:
          "Generates a live HTMLCollection spanning universally on the document, iterating node depth trees querying explicit standard token tags, updating instantaneously synchronously via node mutations.",
      },
      illustration:
        "🏷️ getElementsByTagName — שליפת כל התגים מזן מסוים:\n\n" +
        "  [HTML]\n" +
        "   <p>Hello</p>       ← ✔️ מצא\n" +
        "     <div>Hi!</div>   ← ❌ שונה\n" +
        "   <p>Bye</p>         ← ✔️ מצא\n" +
        "\n" +
        "  [JS]\n" +
        "   document.getElementsByTagName('p'); // מחזיר אוסף של שניהם",
      codeExample:
        "const allParagraphs = document.getElementsByTagName('p');\n\nfor (let i = 0; i < allParagraphs.length; i++) {\n  allParagraphs[i].style.color = 'blue';\n}",
      codeExplanation:
        "מכיוון שזה תופס משפחה שלמה של אלמנטים על סמך זיהוי סוג (Tag), אנחנו מחויבים לעבור עליהם בלולאה כדי לתמרן כל אחד בנפרד (כמו לשנות צבע).",
    },

    // 10. getElementsByClassName
    {
      conceptName: "getElementsByClassName",
      difficulty: 5,
      levels: {
        grandma:
          "כמו לפנות ל'צוות המנקות'. הפנייה שואבת את כל מי שלובשת את החולצה שמייצגת את הקבוצה 'מנקות' ולא את העובר אורח הבודד.",
        child:
          "קריאה בשם הקבוצה במשחק המחניים! כל הילדים מהקבוצה 'קבוצת הכרישים' קופצים קדימה לעבוד ביחד תחת קבוצת החברים שעונים.",
        soldier:
          "פנייה ליחידת חתך מרחבית — איגוד הכוחות האזוריים שבמעילם מתנוסס דגל יחידה מסוים (Class). זה מקבף אתגר שבו מבקשים לגייס כוחות בעלי סטאטוס תפקוד זהה.",
        student:
          "מתודה האוספת HTMLCollection של מספר איברים בעץ שמקושטים ברוח Class זהה. מציינת משאב אופטימלי להחיל תצורות עיצוב (CSS Classes) גורפות דרך קו מנגנון JS.",
        junior:
          "השתמשתי בזה הרבה כשבניתי גלריית תמונות, כל תמונה קיבלה 'card' בתור קלאס ואז כשקראנו בסקריפט לפונקציה הצגתי לאסוף את כל הקלפים ולהשתיל סנכרון לכולם בלולאה.",
        professor:
          "A legacy but ubiquitous fetching routine resolving an adaptive pointer array holding node interfaces containing the matching CSS identifier token inside their normalized classList property vectors.",
      },
      illustration:
        "🎟️ getElementsByClassName — איסוף לפי קבוצה:\n\n" +
        "  [HTML]\n" +
        "   <div class='box'></div>     ← ✔️ מצא!\n" +
        "   <span class='box'></span>   ← ✔️ מצא!\n" +
        "\n" +
        "  [JS]\n" +
        "   document.getElementsByClassName('box');\n" +
        "   // קיבלנו במכה אחת אלמנטים מסוגים שונים שחולקים קלאס משותף!",
      codeExample:
        "const dangerLogs = document.getElementsByClassName('warning-msg');\n\nfor (let i = 0; i < dangerLogs.length; i++) {\n  dangerLogs[i].style.fontWeight = 'bold';\n}",
      codeExplanation:
        "רבים מתייגים אלמנטים מרובים באותו Class בעזרת CSS כדי לעצב אותם אחיד. JS רוכב על העובדה הזו ומאפשר לארוז אותם למשתנה איסופי ולהעביר עליהם מניפולציית טקסט ולוגיקה.",
    },

    // 11. innerHTML
    {
      conceptName: "innerHTML",
      difficulty: 4,
      levels: {
        grandma:
          "זו מילת הקסם של מחיקת הפתק הכתוב בשידה והפנקת דף חדש וכתוב במקומו. רק שכאן אפשר אפילו לצייר במסמך החדש והוא ייקרא כאמיתי.",
        child:
          "מחק של פלסטלינה! אנחנו יכולים לרוקן את התיבה של המסך מכל הצעצועים, ולהשתיל אל תוכה צעצועים חדשים שכתבנו כמילים מיוחדות כמו פלוסים ומדבקות.",
        soldier:
          "אזור שינוי הליבה הטקסטואלי-אורגני של הריבוע הרגיל. פקודה חזקה שמאפשרת לא רק טקסט נקי (string) אלא גם החדרת עצמים זרים פנימה כקוד בניין פתוח.",
        student:
          "תכונה שמחזיקה (Property) את התוכן הפנימי של אלמנט ב-DOM במנח HTML. ניתן לקרוא אותו או לעדכן אותו — והעדכון עובר פרסור (Parsing) ומדפיס חלקי אלמנטים חדישים למסך.",
        junior:
          "חיברתי בהתחלה טקסט באמצעות textContent ככה סתם, שהבנתי עם innerHTML שאפשר גם לזרוק פנימה תגית `<strong>` ולהדגיש דברים על הדרך נפעמתי קשות מהעוצמה.",
        professor:
          "An attribute hook directly linked to the browser's HTML parser implementation. Mutation via innerHTML effectively triggers a destruction operation resolving DOM sub-child trees generating extreme reflow pipelines.",
      },
      illustration:
        "🔄 innerHTML — הזרקת תוכן דינמי:\n\n" +
        "  <div id='container'>\n" +
        "     [ היה רייק מקודם ] \n" +
        "  </div>\n\n" +
        "       JS:\n" +
        "       div.innerHTML = '<h2>Hi!</h2>' \n" +
        "              ↓\n" +
        "  הדפדפן מעבד את הקוד לכותרת ענקית! (לא סתם טקסט רגיל)",
      codeExample:
        "const cardBox = document.getElementById('card');\n\n// השתלת מחרוזת המכילה קוד סימון אמיתי (HTML)\ncardBox.innerHTML = '<span>תוכן חדש שהזרקנו פנימה בקלות!</span>';",
      codeExplanation:
        "InnerHtml לא סתם כותב טקסט. ברגע שדפדפן מבחין בתגיות שמוזנות לו הוא יודע באופן גאוני לתרגם אותם לחיפוי DOM נוסף על גבי המסך ולא להדפיס למסך סימני סגריים סתמיים.",
    },

    // 12. attribute
    {
      conceptName: "attribute",
      difficulty: 4,
      levels: {
        grandma:
          "כל הכפתורים והכורסאות באוטו מגיעים עם מתגים מיוחדים: מתג שעושה שהכיסא יזוז, כפתור שמדליק אור. התכונות האלו הן פשוט המאפיינים הפיזיים החדים שלהם.",
        child:
          "כמו אביזרים של בובת אקשן! אם לבובה יש מדבקה על הגב שכתובה עליה 'כוח אש', המדבקה הזאת היא תכונה נוספת שמגיעה עליה מהמפעל.",
        soldier:
          "מפרט קיבוע על ציוד. לדוגמה כלי נשק עם כוונת מתכוונת — ה'כוונת' היא המאפיין הייחודי (Attribute) שבנוי מראש בתוך האובייקט.",
        student:
          "תכונות מיוחדות שרושמים בתוך תג ההתחלה של אלמנט HTML (כגון src, href, id) שמשמשות להעברת מידע נוסף אל התג ועיצוב תפקודו.",
        junior:
          "חשבתי שאי אפשר להעביר משתנים ל-HTML, עד שהבנתי שאני יכול להוציא אלמנט, ולשלוף מתוכו במכה אחת את הלינק (href) כמאפיין שהוקצה לו.",
        professor:
          "Key-value pair annotations enclosed strictly within HTML start tags establishing node-level specifications reflected natively as programmatic properties within the matching JS DOM Interface.",
      },
      illustration:
        "🏷️ Attribute — מאפייני עזר בתגית:\n\n" +
        "   <img  src='dog.jpg'  alt='Cute Dog' />\n" +
        "          ↑              ↑\n" +
        "      [Attribute]      [Attribute]\n" +
        "      מספק מקור         מספק טקסט חלופי",
      codeExample:
        "const myImg = document.getElementById('hero-img');\n\n// אנו יכולים לקרוא את המאפיין באופן ישיר:\nconsole.log(myImg.src); // ידפיס את הקישור לתמונה",
      codeExplanation:
        "מאפיין זה כל מה שנזרק למחרוזת תגית ה-HTML כדי לנפח אותה בתועלת לפני עלייתה לאוויר המסך. JS יכול לקרוא ולראות אותם כמובן כפרופרטיס רגילים.",
    },

    // 13. setAttribute
    {
      conceptName: "setAttribute",
      difficulty: 4,
      levels: {
        grandma:
          "להדביק מדבקה חדשה על קופסה קיימת. אם לקופסת סוכר לא היה שם, אנחנו לוקחים טוש וכותבים עליו כדי כולם יראו.",
        child:
          "לתת כוח חדש לגיבור על! אנחנו נותנים לו קסם חדש שאומר 'קסם אש: פועל' והוא מקבל את זה לתמיד.",
        soldier:
          "כמו הוספת פק" +
          "ל נוסף לגב החייל במהלך המסע. הקצאת מזהה חדש או עדכון ייעוד קיים לחייל הלוחם בזמן אמת.",
        student:
          "מתודה שמאפשרת יצירה או עדכון של מאפיין (Attribute) כלשהו בשורת ה-HTML של אלמנט. אם המאפיין כבר שם, היא דורסת אותו; אם לא — מצמידה אותו חדש.",
        junior:
          "השתמשתי בזה כדי לייצר מצב Dark Mode. זיהיתי את ה-body, ובזמן לחיצה הוספתי לו `setAttribute('data-theme', 'dark')` ואז קוד ה-CSS שלי כיסה את העבודה.",
        professor:
          "An interface method invoking a declarative DOM update specifying an explicit string mutation of node attributes, initiating node invalidation that triggers specific layout repaints on visual hooks.",
      },
      illustration:
        "🔧 setAttribute — קביעת מאפיין בכוח ה-JS:\n\n" +
        "   לפני: <a href='google.com'>Link</a>\n" +
        "\n" +
        "   myLink.setAttribute('href', 'yahoo.com');\n" +
        "\n" +
        "   אחרי: <a href='yahoo.com'>Link</a>",
      codeExample:
        "const link = document.getElementById('myLink');\n\n// עדכון למאפיין שמחזיק לאן הקישור לוקח אותנו\nlink.setAttribute('href', 'https://openai.com');",
      codeExplanation:
        "כשאנו באים לשנות אלמנט פיזית במקום בדף, אין צורך בידיים על קוד ה-HTML. אנו מכריח אותו לאמץ מידע משתנה בלחיצת קליד JS.",
    },

    // 14. style
    {
      conceptName: "style",
      difficulty: 4,
      levels: {
        grandma:
          "ארון הבגדים של הדף. אפשר להורות לבובה 'לבשי חולצה אדומה עכשיו' רק דרך ציור צבעים ולבישת מעילים.",
        child:
          "כפתור הצבעים! דרך style אנחנו אומרים לצעצוע איזה צבע להחליף, כמה גדול הוא יהיה, ואם הוא יזהר בחושך.",
        soldier:
          "חליפת ההסוואה. אפשר לצווות על שינוי פיגמנט ברנר על מנת לבלוט באזור או להסתתר, הכל נקבע על פי תוואי שטח דינמי.",
        student:
          "אובייקט המחזיק את ההגדרות הוויזואליות (Inline CSS) של אלמנט נבחר. כל תכונות ה-CSS קיימות שם, נכתבות ב-camelCase ולא במקפים כמו בקובץ.",
        junior:
          "תמיד ניסיתי לשנות 'background-color' בקוד JS והקוד זרק לי שגיאה שכחת מינוס. עד שהבנתי שהאובייקט style מחייב אותי לכתוב ככה 'backgroundColor'.",
        professor:
          "An interface mapping to the CSSStyleDeclaration element property. Mutating properties via JS modifies the element's inline style attribute overriding lower-specificity extrinsic stylesheet rules implicitly.",
      },
      illustration:
        "🎨 style — עריכה ויזואלית תוך כדי תנועה:\n\n" +
        "   [ 🔵 כדור רגיל ] \n" +
        "        │        ball.style.backgroundColor = 'red'\n" +
        "        │        ball.style.transform = 'scale(2)'\n" +
        "        ↓\n" +
        "   [ 🔴🔴 כדור ענק ונוצץ! ]",
      codeExample:
        "const title = document.getElementById('headline');\n\n// שינויים הנדסיים מבריקים באובייקט עיצוב פנימי:\ntitle.style.color = '#3498db';\ntitle.style.fontSize = '40px';",
      codeExplanation:
        "סגנון ה-style אחראי על הנראות הויזואלית. בניגוד ל-CSS קבוע, זו כתיבה קטלנית שניגשת בזמן אמת ונדרסת מחדש בעדפת ערך מקמפל.",
    },

    // 15. createElement
    {
      conceptName: "createElement",
      difficulty: 4,
      levels: {
        grandma:
          "להוציא כוס חדשה מהארון שמעולם לא הייתה על השולחן לפני כן! הרגע יצרת בעצמך משהו מחומר אפס כדי שיוגש בהמשך לאורחים.",
        child:
          "חימר קסום! כשרושמים את המילה הזו, מחזיקים פתאום ביד צעצוע חדש באוויר שבכלל לא היה בספר הציור קודם. רק צריך לשים אותו באיזה מקום.",
        soldier:
          "נוהל בקשת אספקה ותכנון יחידה. בתוך החדר הסגור מגדירים חיילים ווירטואליים של שריון (כלי ברמת רעיון), שהם מוכנים פיזית אבל טרם שוחררו לשטח הפעיל.",
        student:
          "פונקציה של ה-Document שמייצרת Node (אלמנט) חדש לחלוטין לתוך הזיכרון בלבד כ-JavaScript Object, טרם החדרתו לעץ המערכת ההצגתי של ה-DOM עצמו.",
        junior:
          "בכל פעם שניסיתי לייצר אלמנט ב-createElement חיפשתי אותו על המסך והוא לא היה שם! הייתי צריך להבין שהוא אשכרה מתקיים רק בסקרופ של הזיכרון כרגע וצריך להזריק אותו איכשהו.",
        professor:
          "Invokes an internal Object instantiation mechanism mapping to an HTMLElement child subclass memory descriptor block based on parameterized TagString. Execution creates orphaned detached Node instances in heap.",
      },
      illustration:
        "🪄 createElement — בריאת אלמנט יש מאין:\n\n" +
        "  1. המחשב  (DOM Tree) ── [ הדף שרואים ]\n" +
        "  \n" +
        "  2. createElement('div') \n" +
        "      └─ 🎁 קופסא חדשה צפה בזיכרון, עוד לא הגיעה לדף!",
      codeExample:
        "// אנו מזמינים איבר מסוג 'רשימה' מאפס:\nconst newListItem = document.createElement('li');\nconsole.log(newListItem); // <li></li> (עוד לא במסך)",
      codeExplanation:
        "הפונקצייה מייצרת עצם. הוא עוד לא נשתל לעץ האמיתי אבל אנו חולשים עליו בסקופ הקרוב ויכולים לעצב אותו במלא לפני זריקתו לחשיפה גורפת.",
    },

    // 16. appendChild
    {
      conceptName: "appendChild",
      difficulty: 4,
      levels: {
        grandma:
          "כדי להושיב אורח חדש לשולחן צריך למשוך כיסא ולהניח אותו בקצה. פעולה זו לוקחת את העוגה שהכנתי ומניחה אותה על השולחן כדי שכולם יאכלו.",
        child:
          "להדביק את המדבקה! אחרי שיצרת פלאסטיק בצורת כוכב בזיכרון, appendChild זה רגע ההדבקה החזק על פוסטר המפלצות כך שהוא חלק רשמי מהקיר.",
        soldier:
          "הקצאה וחיבור למערכת. לוקח את הכוח שגייסנו בחדר ישיבות (בלתי נראה לשטח) ומצניח אותו במקום מוגדר בגזרה הפיזית לתוך הפשיטה.",
        student:
          "זורק אלמנט (שכנראה יצרנו על יד createElement) כילד אחרון אל תוך אלמנט אב ב-DOM (Parent Node). באותו רגע הוא קם לתחייה בדפדפן ממש.",
        junior:
          "סוף סוף הדבר שהשלים לי את הפאזל ששברתי איתו שעות! קודם אתה יוצר צינור, מדביק לו תכונות, ובסוף דופק appendChild כדי שהכל יפרוץ למסך הפרויקט במציאות.",
        professor:
          "Integrates detached Node instances directly onto the Live DOM tree executing a recursive pointer traversal that associates parent-child bindings. Results in immediate repaint/reflow cycles.",
      },
      illustration:
        "📌 appendChild — שילוב בעץ הראשי:\n\n" +
        "   [ זיכרון ] 🎁(כדור)  \n" +
        "          │\n" +
        "         (appendChild)\n" +
        "          ↓\n" +
        "   [ מסך ] 📦 [ ארגז קיים ] ──> מציג 🎁!",
      codeExample:
        "const list = document.getElementById('myList');\nconst newItem = document.createElement('li');\nnewItem.textContent = 'Milk';\n\n// רגע השיא — זריקת פריט הזיכרון היישר למסמך החלון:\nlist.appendChild(newItem);",
      codeExplanation:
        "רגע בו משלב ה-JS אובייקטים אלימים שנרקחו בחושך ישירות להצגת ויזואליה אמיתית. האובייקט נתפר למבנה התחתון של האב שביקש אותו.",
    },

    // 17. removeChild
    {
      conceptName: "removeChild",
      difficulty: 4,
      levels: {
        grandma:
          "פינוי הכוסות מהשולחן כשהן מלוכלכות למדי. להסיר בעדינות חפץ כדי שלא יתפוס מקום מיותר.",
        child:
          "למשוך את המדבקה מהקיר עד שהיא מתקלפת. נעלמה, לא יוצרת עוד סימנים!",
        soldier:
          "הורדת תא ופינוי חוליה מלוח הבקרה כי היא איננה קיימת יותר בחזית. גזירת קו לטובת מניעת עומס.",
        student:
          "מתודה המופעלת על אלמנט 'אב', ומסירה לגמרי אחד מהילדים שלו שמסומן בבירור כארגומנט למחיקה מוגמרת.",
        junior:
          "בכל פעם שביקשתי למחוק כפתור על ידי removeChild קיבלתי שגיאות של Null... לא הבנתי שזה עובד על אב! חובה לתפוס את האב ולבקש ממנו שימחק את הבן, ולא למחוק את הבן את עצמו סתם ככה.",
        professor:
          "Executing node disconnection by unlinking child parent pointers resulting in orphaned nodes accessible strictly via cached memory variable mapping before falling into the Garbage Collector abyss.",
      },
      illustration:
        "✂️ removeChild — הסרת אלמנט יעד:\n\n" +
        "  📦(אב) \n" +
        "    ├── 🍎 (בן 1)\n" +
        "    └── 🍌 (בן 2) ← [הפרד!]\n" +
        "         ↓\n" +
        "  📦(אב) \n" +
        "    └── 🍎 (הבננה הוסרה ועפה לביליון חלקיקים זיכרון)",
      codeExample:
        "const list = document.getElementById('myList');\nconst badItem = document.getElementById('li-bad');\n\n// האבא מוחק את הילד שמצאנו\nlist.removeChild(badItem);",
      codeExplanation:
        "ההיררכיה מחייבת שרק המכיל העליון ראשי לנתק את תתי הסעיפים. הניתוק למעשה מוציא את האובייקט לגמרי למרחבים חשוכים אלא אם נקבע למשתנה אחר.",
    },

    // 18. replaceChild
    {
      conceptName: "replaceChild",
      difficulty: 4,
      levels: {
        grandma:
          "לקחת כוס קפה שהתקררה ולהניח שם אותה כוס אבל עם מים שרתחו לרווחה באותה הפינה ממש על התחתית הריחנית בדיוק תחתיה.",
        child:
          "טרייד מדבקות! מריד מהפוסטר מדבקת דינוזאור ירוק ושם מיד במקומה מדבקת דרקון אדום מדוייקת.",
        soldier:
          "חילופי משמרות מסודרים. באותה עמדת שמירה, החייל הקודם עוזב ותופס מקומו חייל חמוש נקי. ללא חורים אבטחתיים.",
        student:
          "פונקציה בהאלמנט האב מבצע החלפה נקייה של Node בן כושל בילד Node רענן (או קיים קודם) בפקודה כפולה אחת המסירה ומתקנת מיד בתחום הזיכרון.",
        junior:
          "מאוד חזק כשצריך לעדכן חתיכת כרטיסייה בלי לעשות בלגן על ידי מחיקה (unlink) ויצירה מהתחלה של אזור. הפלטפורמה מניחה על אותו מקום בדיוק את היורש החוצב.",
        professor:
          "Bypasses inefficient remove + append operations utilizing a singular kernel mutation replacing pointer siblings symmetrically without risking layout thrashing anomalies in rendering frames.",
      },
      illustration:
        "🔀 replaceChild — חילופי משמרות מיידיים:\n\n" +
        "  [ עמדה ראשי ] \n" +
        "        │     [חדש שחיכה]\n" +
        "     [ ישן ]   <──✖  \n" +
        "        │   (הכנסת חדש על הקיים)\n" +
        "     [ חדש ]",
      codeExample:
        "const parent = document.getElementById('box');\nconst oldP = document.getElementById('old-p');\nconst newP = document.createElement('p');\n\nnewP.textContent = 'אני טקסט המחליף הרשמי!';\n// מחליף: האב קורא -> מחליף לחדש, במקום של הישן!\nparent.replaceChild(newP, oldP);",
      codeExplanation:
        "פרמטר ראשון מסמל את הזוכה שייכנס למערכה, והפרמטר השני זורק את העצם הישן לחור השחור בלי שבירת זרימה נגדית במכונת המסך.",
    },

    //  ─── C. Classes ──────────────────────────────────────────────────

    // 19. class
    {
      conceptName: "class",
      difficulty: 5,
      levels: {
        grandma:
          "תבנית האפייה שחותכת עוגיות. את לא אוכלת את תבנית הברזל, היא רק התכנית שיודעת שוב ושוב לייצר עוגיות עגולות עם שוקולד-צ'יפס בדיוק באותו גודל.",
        child:
          "המפעל הקסום! ה-class הוא בלוק מכונות כחול שמקבל ברזל ובסוף שלו קופצים המון רובוטים קטנים שכולם דומים בעל אותה תכונה.",
        soldier:
          "תקן הציוד (פקל). התקן הוא רק השרטוט על ניר עמדה שמסביר איך נראה חייל: תמיד יהיה לו שם, פלוגה ומצב כוננות (לא החייל הספציפי בשטח).",
        student:
          "תבנית תכנותית מונחת עצמים שיוצקת מסגרת לייצור חוזר של אובייקטים מאותו סוג. מאגדת פרמטרים התחלתיים (Constructor) ומתודות תפקודיות משותפות תחת מכלול קוד אחד נקי.",
        junior:
          "פעם חזרתי למאות שורות וכתבתי function Object1, Object 2 עם אותן מתודות. שלבתי Class פשוט לשובר שיוויון שפלט ללא אהסס מאות משתמשים עם משתנה קבוע ותפקוד דומה בשורה בודדת.",
        professor:
          "A template mechanism introduced in ES6 for encapsulating data definition attributes with corresponding behavioral functions, functioning largely as syntactic sugar masking the prototype-based functional mixin implementation.",
      },
      illustration:
        "🏭 Class — שרטוט פס ייצור לאובייקטים:\n\n" +
        "   [ Class Player ] (תבנית רעיונית של שחקן)\n" +
        "          │\n" +
        "          ├──> 👤 Player1 (Tal, Lvl 10)\n" +
        "          ├──> 👤 Player2 (Dana, Lvl 25)\n" +
        "          └──> 👤 Player3 (Mike, Lvl 2)\n" +
        "\n" +
        "   כל השחקנים חולקים מבנה מהתבנית הראשונה!",
      codeExample:
        "class Car {\n  // ככה מתחילה תבנית\n  beep() { console.log('Beeeep!'); }\n}\n\nconst myCar = new Car();\nmyCar.beep();",
      codeExplanation:
        "המילה class מיישמת מסגרת ריקה שעוזרת לסנטז את העבודה ולהצהיר על חוקי הבית: כל מי שנוצר מכאן יגיב עם מתודת ה-beep למלחצנים.",
    },

    // 20. constructor
    {
      conceptName: "constructor",
      difficulty: 5,
      levels: {
        grandma:
          "אחראי חומרי הגלם במפעל. ברגע שלוחצים על כפתור 'קמח', הוא לוקח אותו מהצינור ומכניס בול למקום הדרוש במתכון הייסוד למשפך.",
        child:
          "הזקן החכם בקופה. כשאנחנו מזמינים רובוט, הוא שואל: 'איזה צבע הוא יהיה? איזה נשק יהיה לו?' — והוא בונה לנו אותו בדיוק ככה.",
        soldier:
          'קצין הקליטה בבקו"ם. החייל מתגייס (נוצר עצם חדש), והוא זה שמחתים אותו ומעטיר עליו מדים עם שם מתאים, משקל ומחלקה לפקודה המבצעית.',
        student:
          "פונקציה ייעודית בתוך כל Class בשם Constructor, המופעלת באופן אוטומטי בהכרח של יצירת אובייקט (instance) חדש בעזרת new. מצויינת לאתחול נתונים אישיים.",
        junior:
          "בפעמים הראשונות שמעתי שזה קוד קסם... מסתבר ש-constructor מתפקד כמעין דלת כניסה! אם ניסית להביא שם מבחוץ לאישיות ה-Class, זה עובר בו ורק הוא יכול להשליך פנימה כ- `this.name`.",
        professor:
          "The implicit class initializer invoked strictly upon execution of standard 'new' operators reserving stack scopes mapping arguments onto localized 'this' execution binding before object instantiation completes cleanly.",
      },
      illustration:
        "👷 Constructor — פועל האתחול המדויק:\n\n" +
        "  new Player('Tal', 55) \n" +
        "           ↓\n" +
        "   [Constructor] קולט את המידע!\n" +
        "        this.name = 'Tal'\n" +
        "        this.level = 55\n" +
        "           ↓\n" +
        "   🏁 אובייקט קם לחיים וממותח טרי",
      codeExample:
        "class User {\n  constructor(username, age) {\n    this.name = username;\n    this.age = age;\n  }\n}\nconst u = new User('Amit', 25);",
      codeExplanation:
        "ברגע שיצרנו עצם (u), הפונקציה constructor התחילה לרוץ בלעדית ראשונה. היא תפסה את הערך Amit והושיבה אותו במתחם 'this' שהוא נציג הבעלות של העצם המתפתח.",
    },

    // 21. instance
    {
      conceptName: "instance",
      difficulty: 4,
      levels: {
        grandma:
          "אם הפנקס הוא תבנית האפייה של הכעך, מופע הוא עוגיה ממשית וטעימה שאפשר בקלות למרוח בריבה ומתנהגת במחזור נחמד.",
        child:
          "הרובוט האמיתי שיצא מהקופסה ושאפשר לשחק איתו. לא התמונה בקופסא, אלא הצעצוע העשוי עצמו עומד קרוב.",
        soldier:
          "חייל במערכה החיה. חייל פלוני הוא מקרה פרטי מתגבש של צייר התקן העליון שעבר חיול, כסוכן נושם וחמוש על קרקע האמת.",
        student:
          "מופע. אובייקט ספציפי ופיזי בזיכרון שנוצר באופן מעשי בעזרת תבנית המקור של המחלקה (Class). כל instance יכול להיות בעל ערכים שונים לחלוטין לחברו.",
        junior:
          "לכולם קראתי אובייקט והתבלבלתי. אז אמרו לי: 'זה Class, והאחד שהפקת הוא ה-instance שלו.' ההבדל בטרמינולוגיה סגר אצלי מקום ענק למושגים מקצועיים במוחי.",
        professor:
          "A discrete concrete memory heap entity spawned from generic Class blueprints, holding completely independent state allocations but retaining identical chained prototype method references saving massive redundancies.",
      },
      illustration:
        "👤 Instance — מופע בשר ודם ממחלקה:\n\n" +
        "      [Class Dog]\n" +
        "      /         \\\n" +
        "  🐶 Rex      🐶 Max\n" +
        "(instance)  (instance) \n\n" +
        " * עצמים נפרדים בעלי אופי משלהם מהכלל",
      codeExample:
        "class Book { }\n\n// האובייקטים למטה הם instances! \nconst harryPotter = new Book(); \nconst percyJackson = new Book();",
      codeExplanation:
        "הגדרת מחלקה כללית 'ספר' מונחת כחלל אוויר. ספר א' וספר ב' הם התוצרים האמיתיים המוחזקים במשתנים ורלוונטיים עבור זיכרון של המשתמשים שישתמשו תדיר.",
    },

    // 22. new
    {
      conceptName: "new",
      difficulty: 5,
      levels: {
        grandma:
          "מילת קסם של 'הוקוס פוקוס!' ברגע שאומרת אותה ליד תבנית ריקה, בוקעת פתאום מציאות מלאה ומעשיה אל כף ידינו.",
        child:
          "המילה שמתניעה את מפעל היצירה. בלי להשתמש בה, אי אפשר לבקש מחלקת הרובוטים להפעיל את המכונה לבנייה.",
        soldier:
          "פקודת הליהוק. ברגע נתינת פקודת new מתחיל שרשור חיול מלא לתופעת החייל (מגייס דבק במפרט ה-Class המצוי בפנקסי מיד).",
        student:
          "אופרטור שמחולל אוביקט ריק חדש (instance), מקצה זיכרון, ומכוון את ה-this בתוך פונקציית ה-Constructor היישר אל התווך הריק החדש כייצור בר קיימא.",
        junior:
          "משום מה ניסיתי לכתוב 'const x = User()' והקוד קרס שהמשתנה null. ה-new מרגיש כמו המפתח של הרכב. בלי הצירוף הטקסי הפונקציה רק רצה על אוויר ולא יוצרת אובייקט מקביל חדש לשימוש.",
        professor:
          "A critical operator enforcing object instantiation executing four steps: 1. spawn a blank JS Object, 2. assign prototype links, 3. invoke Constructor mapped with local context this, 4. implicitly return initialized instance context.",
      },
      illustration:
        "✨ new — בורא מופע קסום:\n\n" +
        "   let x = Class()    ❌ (שגיאה! התבנית לא אובייקט!)\n" +
        "   let y = new Class() ✔️ (מונפק אובייקט חי ושמח!)\n" +
        "             └─ this ← הוקצה!",
      codeExample:
        "class Warrior {}\n\n// חייבים להוסיף new במיזוג תבנית:\nconst conan = new Warrior(); \nconsole.log(typeof conan); // 'object'",
      codeExplanation:
        "הסמל new מגדיר טון תכנותי חדש על ידי מתן הבטחה שעל מפרץ הזיכרון נישא מופע ולא סתם פלט פונקציה מסורתי רגיל לחלוטין ולכן המנוע מאחל הצלחה בפרוטוקולים עברי.",
    },

    // 23. method (in Classes)
    {
      conceptName: "method",
      difficulty: 4,
      levels: {
        grandma:
          "בדיוק כמו באובייקט הקודם רדיו של אוטו שמשמיע שירים. בתוך התבנית של המפעל אפשר ללמד אוטומטית שכל הרובוטים ידעו לשיר, וזה מוכנס לתבנית פעם אחת בלבד.",
        child:
          "כוח מובנה! עכשיו בתוך מפעל הרובוטים אנחנו מטמיעים את כפתור 'קפוץ'. כל צעצוע שמשתחרר יכול לקפוץ מבלי שנלמד אותו שוב.",
        soldier:
          "טכניקת היחידה בראי ה-Class. ברגע שיצרתי מחלקת שיריון, הגדרתי להם את מנגנון ה'פעל!' רק פעם אחת, והוא מושתל על כלל המוצבים באורח קבע.",
        student:
          "פונקציה שמוגדרת בגוף המחלקה ואינה זקוקה למילה function. היא תישמר בפרוטוטייפ (Prototype) של האובייקטים המיוצרים ממנה ולכן תחסוך שכפול זיכרון אדיר.",
        junior:
          "בתוך Class כשאני מכריז '()eat' פשוט ככה, זה אוטומטית משייך את המתודה לפרוטוטייפ, כך שמיליון אובייקטים שאני יוצר דרך new יכולים לקרוא לה והיא מוגדרת למעשה רק פעם אחת בזיכרון של המהדר.",
        professor:
          "Class method declarations which define properties upon the generic prototype object of the given class structure dynamically executing via classical prototype-chain delegation across countless instantiation.",
      },
      illustration:
        "🧩 Method (Class) — התנהגות אוניברסלית ליורשים:\n\n" +
        "  class Robot {\n" +
        "    [ זיכרון במפעל: שומר את laserShoot() רק פעם אחת ] \n" +
        "  }\n\n" +
        "   🤖 r1.laserShoot()\n" +
        "   🤖 r2.laserShoot()\n" +
        "  (הם חולקים את אותה מתודה!)",
      codeExample:
        "class Bird {\n  fly() {  // שימו לב: אין מילה function\n    console.log('I am flying in the sky!');\n  }\n}\nconst eagle = new Bird();\neagle.fly();",
      codeExplanation:
        "המתודה fly זמינה לכל מופע (instance) של Bird ללא בזבוז של העתקה כפולה, משום שהיא מוכתרת תחת הפרוטוטייפ האחראי של המחלקה שיצרה אותם.",
    },

    // 24. inheritance
    {
      conceptName: "inheritance",
      difficulty: 4,
      levels: {
        grandma:
          "ירושה מאבא לבנו. אם לאבא יש אופניים ולחן יש גישה אליהן, אז גם חן נהנה מהיכולת לרכוב כחלק משייכות משפחתית.",
        child:
          "לא ללמוד מחדש הכל! אם רובוט-סבא כבר יודע ללכת, הרובוט-בן שנבנה מקבל את כל הידע שלו בתוספת לדברים חדשים שמלמדים אותו.",
        soldier:
          "יחידה מיוחדת שמסתמכת על תורת לחימה קיימת. היחידה לוקחת את כל הנהלים של 'חי" +
          "ר רגיל' כגיבוי בסיס, ולזה מוסיפה 'צניחה' לנתונים הספציפיים לה.",
        student:
          "מערכת תכנותית (OOP) שבה מחלקה אחת מקבלת את כל התכונות והמתודות ממחלקה אחרת בסיסית יותר (Parent Class), חוסכת קוד כפול, ומחילה פולימורפיזם.",
        junior:
          "הבנתי שאי אפשר לייצר קלאס של Manager ועוד קלאס של Employee ולהעתיק אליו name ו-age שוב פעם. הירושה מאפשרת לי לעשות שהמנג'ר שותה קודם את היכולות של העובד כבסיס.",
        professor:
          "The fundamental abstraction protocol leveraging JavaScript’s deeply-rooted prototypal-chain mechanics disguised under Class syntaxes implementing dynamic dispatch delegation paths hierarchically.",
      },
      illustration:
        "🧬 Inheritance — מערכת ירושה גנטית:\n\n" +
        "    [ Animal ] (יודע לאכול, לישון)\n" +
        "         │\n" +
        "      הורשת ידע\n" +
        "         ↓\n" +
        "    [  Dog   ] (יורש את יכולת השינה וכעת בנוסף – גם לנבוח!)",
      codeExample:
        "// קונספט תיאורטי לפני המילים השמורות:\n// חיה ממזרחית היא בראש, כלב חולק ירושה עם תכונות החיה ובנוסף מוסיף נביחה. החתול יורש חיה ומוסיף יללה.\n// כל סוג נהנה ממכנה משותף כללי",
      codeExplanation:
        "הרעיון של ירושה הוא עץ חסכון - מידע שלא רוצים לכתוב לכל מחלקה שוב ושוב עולה למעלה לאבא אחד משותף שחולק אותו באופן זהה לשאר הילדים.",
    },

    // 25. extends
    {
      conceptName: "extends",
      difficulty: 5,
      levels: {
        grandma:
          "החוזה שמעיד שהנכד קיבל את הנדל\"ן. את אומרת ברור לפקיד בבנק: 'גיא ממשיך (extends) את חשבון ההורים'.",
        child:
          "שרביט הקסם! צירוף המילה הזה אומר שהרובוט החדש שלנו הולך לחקות בול את מה שרובוט גדול יותר יודע לעשות, ומעכשיו הוא משפחה שלו.",
        soldier:
          "צו סיפוח. צירוף צוות קטן לטייסת האם. המשמעות המבצעית שלו כעת כפופה ומתווספת למסגרת הגדולה (extends הטייסת העליונה).",
        student:
          "מילה שמורה (Keyword) המציינת שקלאס אחד עומד להיות בן (Subclass) של קלאס קיים אחר וירש ממנו כליל את שרשרת הפרוטוטייפ שלו.",
        junior:
          "כשעשיתי סתם `class Admin` הייתי צריך לבנות אותו מ-0. אבל כשדפקתי `class Admin extends User`, פתאום הוא ירש בחינם את מתודת login() ששעות בניתי. נפעמתי מהקלות.",
        professor:
          "A strict keyword initializing the ES6 linkage phase binding the child class Prototype [[Prototype]] target to reference the parent constructor seamlessly resolving superchain property queries.",
      },
      illustration:
        "🔗 extends — יישום שרשרת הירושה:\n\n" +
        "   class אבא {}\n" +
        "          ↑ \n" +
        "        extends (המילה המחברת!)\n" +
        "          ↓\n" +
        "   class ילד {}",
      codeExample:
        "class Person {\n  breathe() { console.log('Breathing...'); }\n}\n\n// האביר מרחיב את זכויות בנאדם\nclass Knight extends Person {\n  swingSword() { console.log('Swinging sword!'); }\n}",
      codeExplanation:
        "המילה extends מכינה את החיבור שדרכו ייסע המידע המשותף מ-Person ל-Knight. המנוע מזהה מיד היררכיה רשמית שבה האביר מסוגל גם לנשום (breathe).",
    },

    // 26. super
    {
      conceptName: "super",
      difficulty: 4,
      levels: {
        grandma:
          "הכפתור האדום שמתקשר ישירות לאבא. אם הבן נמצא במפעל וקורא בכפתור 'אבא, שלח את כספי הירושה לפה', הוא מבקש ישירות מבעל הסמכות.",
        child:
          "שיחת החירום למבוגר האחראי! כשרובוט נבנה, הוא קורא super() כדי לבקש מסבא הרובוט שיפעיל את עצמו לפניו.",
        soldier:
          "קריאה מרמת פיקוד שטח למפקדת האם (בקשת אישור). 'תחנת הבסיס (Super) נא לאשר כניסה לגזרה'.",
        student:
          "פונקציה הכרחית בתוך Constructor של Subclass שמזעיקה קודם כל את ה-Constructor של תבנית האב, במטרה לאתחל היטב את שדות הירושה המקדימים.",
        junior:
          "כל פעם שניסיתי לשים `this.color = 'red'` בקלאס שיורש מאחר הוא צעק עליי 'Must call super constructor'. למדתי שאי אפשר להשתמש ב-this בבן עד שלא עושים לו כבוד וקוראים ל-super() של האב.",
        professor:
          "Dispatches the internal [[Call]] hook against the Base Class Constructor dynamically passing arguments while returning the 'this' allocation proxy backwards towards executing Derived class.",
      },
      illustration:
        "📞 super — הזעקת מחלקת האם:\n\n" +
        "  [Parent Constructor]\n" +
        "       ↑\n" +
        "   < קריאת super() מתוך הילד! >\n" +
        "       ↓\n" +
        "  [Child Constructor] (כעת רשאי להשתמש ב-this)",
      codeExample:
        "class Animal {\n  constructor(name) { this.name = name; } \n}\n\nclass Dog extends Animal {\n  constructor(name, sound) {\n    super(name); // חובה לקרוא קודם את הבנאי העליון שיתחיל!\n    this.sound = sound;\n  }\n}",
      codeExplanation:
        "פונקציית super מבטיחה שהלוגיקה העליונה של האב תופעל. בסצנה למעלה, מורישים לאב את שם החיה, ולאחר אישור העיבוד שלו נוכל להתקדם לטיפול בבן האינדיבדואלי.",
    },

    //  ─── D. Storage ──────────────────────────────────────────────────

    // 27. localStorage
    {
      conceptName: "localStorage",
      difficulty: 4,
      levels: {
        grandma:
          "תיבת הדואר החכמה שלך שנמצאת מול הבית. גם אם תלכי ותחזרי, המכתבים שלך מחכים רק לך בפנים והם לא נמחקים עד שתזרקי אותם לבד.",
        child:
          "תרמיל שומר זיכרון שזוכר באיזה שלב היית במשחק מחשב, כדי שמחר כששוב תדליק אותו, הדינוזאור יחכה בדיוק באותה המערה.",
        soldier:
          "טבלת נתונים לוגיסטית השמורה בקובץ קשיח במסוף הטרמינל. גם הפסקה פתאומית של זרם החשמל לא מוחקת אותה, היא עמידה בניתוקים ארוכים.",
        student:
          "יכולת שקיימת על אובייקט ה-window, היוצרת מאגר אחסון בצד לקוח (Client Side). הנתונים אינם צמודים ל-Session כך שהם ישרדו סגירת דפדפן, כיבוי מחשב ואף קריסת מערכת.",
        junior:
          "השתמשתי לעשות דארק מוד, ואז שמרתי במשתנה עזר. אבל כשריפרשתי זה התאפס! רק כששמרתי תחת localStorage הדפדפן הצליח 'לזכור' את ההעדפה של המשתמש דרך ריפרשים ארוכים.",
        professor:
          "A persistent Web Storage API implementation acting as a synchronous SQLite-backed map isolated strictly within the bounds of a protocol-domain-port Same-Origin Policy with roughly a 5MB capacity threshold.",
      },
      illustration:
        "💾 localStorage — זיכרון בר שרידות:\n\n" +
        "   [ סגירת דפדפן ] ──> [ יום חדש ] ──> [ פתיחת הדפדפן מחדש ]\n" +
        "                             ↓ \n" +
        "                       💾 הנתונים מחכים בדיוק איפה שעזבת!",
      codeExample:
        "// גם אחרי ריפרש, תמיד נוכל לשמור קובייה של טקסט:\nlocalStorage.setItem('theme', 'dark');\nconsole.log(localStorage.getItem('theme')); // 'dark'",
      codeExplanation:
        "localStorage מחזיק מילון נתונים (Pairs של Key Value) שלמפתח אין יכולת להשמיד בעזרת סגירת חלון האפליקציה, למעט במקרים של התערבות קוד יזומה שמשמידה אותם אקטיבית.",
    },

    // 28. sessionStorage
    {
      conceptName: "sessionStorage",
      difficulty: 6,
      levels: {
        grandma:
          "פנקס זמני שמשאבי העבודה נמחקים ברגע שאת נועלת את החנות וסוגרת את הדלת שלקראת הצהריים. מחר זה היה פנקס חדש ונקי.",
        child:
          "קופסת קסמים שמתמוססת מתי שסוגרים את הספר! הזיכרון עובד כל זמן שהספר פתוח, אבל ברגע שסגרת אותו אה קסם פג הכל הולך לאיבוד.",
        soldier:
          "זיכרון מסוג RAM זמני בלשכת המבצעים. קיים ואקטיבי רק במשמרת הנוכחית של המנווט. מיד כשנלקח החשמל, הוא מתנקה מטעמי אבטחה וחיסיון צעדים.",
        student:
          "ממשק אחסון בעל דינאמיקה של אורך חיי חלון הנוכחי. שומר עסק נוכחי בלבד (Session), הנתונים מושמדים ברגע סגירת הכרטיסייה (Tab).",
        junior:
          "זה מעולה כשאני עושה טפסים ארוכים באתר ואז בטעות לוחץ אחורה. אם זה גיבוי Session, המידע חוזר. אם המשתמש סגר את האתר והלך, עדיף למחוק הכל במילא כדי לא לסתום לו מקום.",
        professor:
          "A volatile mapping instance sharing the Web Storage protocol bound transiently strictly against the lifetime boundary of the top-level browsing context (Tab Process Instance).",
      },
      illustration:
        "⏳ sessionStorage — זיכרון לחלון קיים:\n\n" +
        "   [ גלישה אקטיבית ] -> נתונים שמורים\n" +
        "          |\n" +
        "   [ ❌ סגירת טאב ] -> 🔥 כל המידע מתאדה מידית!",
      codeExample:
        "// נשמור פרטים רגישים, זמניים\nsessionStorage.setItem('tempCart', '3 Items');\n\n// יחיה רק עד שייסגר הטאב במפורש.",
      codeExplanation:
        "מתודת האחסון הזו משתייכת נזר לטאב הפתוח ספציפית כך שאפילו פתיחת טאב נוסף לאותו אתר לא תחלוק את אותו ה-Session, זה נפרד לגמרי ויחסוך משאבים חשובים.",
    },

    // 29. setItem
    {
      conceptName: "setItem",
      difficulty: 4,
      levels: {
        grandma:
          "לרשום מתכון עם תווית ברורה בשם שלו ולהניח בתיבה. לתייג: 'מתכון לעוגה' ולהכניס לתוכו את הרכיבים.",
        child:
          "להכניס קלף לתוך האלבום הענק ולרשום בעט נוצץ 'הקלף החזק ביותר' במקום שבו יהיה קל למצוא אותו בעתיד.",
        soldier:
          "הקשת הקוד ונעילתו מול עמדת השמירה הדיגיטלית (הזנת פקודה לאפסון רגולרי של רכיב מאומת תחת מזהה כרטיסיית זיהוי).",
        student:
          "מתודת ליבה של Web Storage המקבלת 2 ארגומנטים ממש מסוג מחרוזת בלבד! הפרמטר הראשון הוא ה-Key והשני הוא ה-Value שיאוחסן אקסקלוסיבי.",
        junior:
          "פעם ניסיתי לשמור אובייקט שלם ב-setItem במקום סטרינג יבש וקיבלתי במערכת `[object Object]`. אז למדתי שחייבים להעביר הכל כסטרינג בעזרת `JSON.stringify` בגלל שזה הפטנט כאן.",
        professor:
          "A synchronous storage mapping interface writing exclusively raw serialized scalar strings strictly blocking DOM main threads overriding key parameters immediately across disk instances.",
      },
      illustration:
        "📥 setItem — אחסון ערך תחת מזהה קבוע:\n\n" +
        "   localStorage.setItem('user', 'Omer')\n" +
        "                        │       │\n" +
        "                     (המפתח)   (הערך האגור)\n" +
        "                       🔑      💎",
      codeExample:
        "// חייבים להפוך אובייקטים למחרוזת כי הזיכרון לא מנוע חכם של JS:\nconst myObj = { id: 1 };\nlocalStorage.setItem('dataObj', JSON.stringify(myObj));",
      codeExplanation:
        "זו הדרך שלנו להכריח דפדפן לכתוב שורת אמתית לטבלאת מידע העצמאית של המשתמש, פעולה טקטית וברורה ללא סטיות מחרוזתיות רחבות שמסכנות את המכונה.",
    },

    // 30. getItem
    {
      conceptName: "getItem",
      difficulty: 4,
      levels: {
        grandma:
          "חיפוש לפי תווית! כשאני באה לתיבה בשבת, אני מחפשת בדיוק איפה המדבקה של 'מתכון לעוגה' ושולפת את התוכן החוצה לאור כדי להשתמש בזה.",
        child:
          "קריאה לקסם של דברים נשכחים! אומרים לתיקיית הגב שלנו: 'תן לי את צורת הדינוזאור ששמרתי אתמול' והיא שולפת את הנסתר.",
        soldier:
          "בדיקה יזומה מול מסד הפענוח! הקשת מספר לוחית רישוי במשאב החיפוש בכדי לקבל פלט את זהות הבעלים הרשמית, עבר חסר הימצאות יוחזר 'שלילי' (null).",
        student:
          "מתודה הקוראת למאגר המקומי (local או session) ומוציאה ערך על סמך המפתח שהוזן, מחזירה מחרוזת רגילה שעקרונית ניתן למשוך או לקבל null במידה והפריט נעדר.",
        junior:
          "בכל כניסה של האתר אני שם פונקציה שעושה `getItem` לראות אם הבנאדם כבר התחבר בעבר ויש לו Token בזיכרון, אם כן אני מעביר אותו דף, וככה הוא לא מרגיש שנעשתה בכלל סגירה מעולם.",
        professor:
          "Reads the synchronous local cache data-table index fetching string parameters mapped specifically via exact strict equality pointer mapping resolving potentially parsed JSON execution flows later.",
      },
      illustration:
        "📤 getItem — שליפת ערך על ידי מזהה:\n\n" +
        "     [ קופסת localStorage ]\n" +
        "              │  (מחפש מפתח בשם 'user')\n" +
        "              ↓\n" +
        "   localStorage.getItem('user') ──> פולט: 'Omer'",
      codeExample:
        "const logged = localStorage.getItem('user');\n\nif (logged) {\n   console.log('Welcome back ' + logged);\n} else {\n   console.log('Who are you?');\n}",
      codeExplanation:
        "רגע האמת שעליו מתבססת כמעט כל אפליקציית Web מודרנית: האם שמור למשתמש זיהוי בפרופיילים של הדפדפן כדי לחסוך רצפי התחברות קשים?",
    },

    // 31. querySelector
    {
      conceptName: "querySelector",
      difficulty: 4,
      levels: {
        grandma:
          "במקום לחפש בכוח בכל האלפים, אתה מגיש מגדף אחד כמו 'השאר רק את זה' — והוא מוצא בדיוק את הפריט הראשון שמתאים.",
        child:
          "כשאתה מצביע על תמונה בגן, השאלה היא 'מי מתאים לפי המחשה הזאת?' - querySelector מחזיר את הראשון שמתאים.",
        soldier:
          "פקודה מהירה לזיהוי תרחיש קריטי: למצוא יעד מדויק מתוך מפת העץ לפי סימון CSS אחד.",
        student:
          "מתודה שמקבלת selector ולוקחת אלמנט אחד בלבד לפי `CSS Selector` (כשהוא קיים, מחזיר ראשון), אחרת null.",
        junior:
          "שימושי כשיש לך רק Selector אחד, בלי לנהל ריצה של כל הרשימות רק כדי למצוא אלמנט בודד.",
        professor:
          "מתאם DOM query engine על בסיס בחירת סלקטור על document/Node scope, עם חיפוש לפי CSS selectors ומסדר עדיפות לפי הופעה קודם באינדוקציה של העץ.",
      },
      illustration:
        "🔍 querySelector — בחירת אלמנט לפי סלקטור:\n\n" +
        "  document.querySelector('.card.active')\n" +
        "  ↓\n" +
        "  מחזיר ראשון מתוך האלמנטים שמתאימים",
      codeExample:
        "const card = document.querySelector('.card.active');\nif (card) {\n  card.classList.add('highlighted');\n}",
      codeExplanation:
        "משליך על החיפוש בדף על בסיס CSS selector ומחזיר אלמנט ראשון בלבד, לכן מתאים למשימות שמכוונות למטרה אחת.",
    },

    // 32. querySelectorAll
    {
      conceptName: "querySelectorAll",
      difficulty: 4,
      levels: {
        grandma:
          "כשצריך 'כל הבובות האדומות' ולא רק אחת, querySelectorAll מחזיר לך את כל המתאימים לרצף שלם.",
        child:
          "כמו לבחור כל החבלים האדומים במשחק ולקבל רשימה של כולם במקום רק הראשון.",
        soldier:
          "בדיקה מבצעית של כל היעדים שקשורים לסימן הזה, ולא רק מטרה ראשונה.",
        student:
          "מתודה שמחזירה NodeList לכל האלמנטים שמתאימים לסלקטור. מאפשר מעבר/סינון/שינוי קבוצה שלם.",
        junior:
          "רציתי לעבור על כל הכפתורים ולעדכן להם state. עם querySelectorAll עשיתי `forEach` על כולם במקום לשכפל קוד.",
        professor:
          "מספק NodeList סטטי (ביישום העיקרי), לעיתים דורש המרה למערך לטובת map/filter לפי צרכי אלגוריתם דקלרטיבי.",
      },
      illustration:
        "🧺 querySelectorAll — איסוף כל המתאימים:\n\n" +
        "  document.querySelectorAll('li.task')\n" +
        "  ↓\n" +
        "  [li1, li2, li3]",
      codeExample:
        "const tasks = document.querySelectorAll('li.task');\nArray.from(tasks).forEach(li => {\n  li.classList.toggle('ready');\n});",
      codeExplanation:
        "כאשר יש צורך בטיפול מסועף על אלמנטים דומים, השיטה מחזירה רשימה מלאה ולא אלמנט יחיד.",
    },
  ],
  quiz: [
    {
      question: "איך ניגשים למאפיין באובייקט?",
      options: [
        "בעזרת נקודה (.) או סוגריים מרובעים [ ]",
        "רק על ידי קריאה לפונקציה",
        "בעזרת מקף הפוך וסימן דולר",
        "כל אובייקט מחייב גישה באמצעות אינדקס נומרי כמו במערך",
      ],
      correct: 0,
      explanation:
        "באובייקט הגישה לערכים מתבצעת תמיד דרך המפתחות שלו. ב-JS זה מתאפשר כך: `obj.name` או `obj['name']`.",
    },
    {
      question: "מה ההבדל בין `getElementById` ל-`getElementsByClassName`?",
      options: [
        "הראשון מחזיר אלמנט בודד, בעוד השני מחזיר אוסף של אלמנטים",
        "אין הבדל ממשי, הם עושים בדיוק אותו דבר",
        "הראשון מבצע רענון לדף, השני שולח טופס פנימי",
        "הראשון לא תומך ב-DOM לעומת השני",
      ],
      correct: 0,
      explanation:
        "תעודת הזהות (Id) היא יוניקית - לכן הוא שולף איבר נקודתי בלבד. קלאס מיועד לקבוצה לכן הוא מושך את רב אלמנטים בתצורת רשימה (HTMLCollection).",
    },
    {
      question:
        "היכן בזיכרון של המחשב מתקיים אלמנט אחרי שיצרנו אותו ב-`createElement`?",
      options: [
        "מרחף בזיכרון של JS באופן זמני עד שנכניס אותו עם appendChild",
        "הוא מופיע מיד על המסמך, במסך ה-HTML, ללא קוד נוסף",
        "הוא נשמר ישירות בשרתים מרוחקים",
        "הוא מוחלף אוטומטית בצורתו הקודמת על הקיר",
      ],
      correct: 0,
      explanation:
        "יצירת העצם לא תוקעת אותו במסך הוויזואלי. עליך לבצע במקביל הדבקה טקסטית ורשמית לעץ ה-DOM הפעיל (appendChild) למען הצגתו.",
    },
    {
      question: "מה תפקידו של ה-`constructor` בתוך שרטוט של `class`?",
      options: [
        "פונקציה המאתחלת ומקצה נתונים עבור האובייקט החדש בזמן יצירתו הראשונית",
        "החלק בקוד שמנקה זיכרון זמני מיד אחרי עבודה לוגית",
        "המנגנון שבודק אם יש שגיאות כתיד בקובץ",
        "טכניקה המייצרת סגנון עיצובי חדש לאובייקט החוצה דרך style",
      ],
      correct: 0,
      explanation:
        "הבנאי הוא האחראי הראשי שמנפק פרטים ייחודיים שצוותו לאובייקט הצעיר (instance). הוא אוטומטית פועל ברגע שקוראים למחלקה עם מילת `new`.",
    },
    {
      question: "מה ההבדל בין `localStorage` ל-`sessionStorage`?",
      options: [
        "localStorage שומר לנצח (עד שינוקה) ואילו session נמחק מיד עם סגירת כרטיסיית הדפדפן",
        "localStorage דורש חיבור אינטרנטי בניגוד ל-sessionStorage שעובד אופליין",
        "sessionStorage מאפשר כתיבה לעומת local שמאפשר קריאה בלבד",
        "ההבדל היחיד הוא בסוג הגודל המקסימלי המוגדש",
      ],
      correct: 0,
      explanation:
        "שמו מעיד עליו: Session מתמקד רק במשמרת העכשווית ומתאדה אחריה. Local שורד איתחולים וניתוקים אגרסיביים של המחשב.",
    },
    {
      question: "איך משנים טקסט המכיל תגיות למסך של אלמנט דרך ה-DOM?",
      options: [
        "על ידי עריכת מאפיין ה-innerHTML שלו",
        "על ידי כתיבה ישירה של console.dir",
        "משנים את classname ל-text",
        "לוחצים על מתודת super() בקפידה",
      ],
      correct: 0,
      explanation:
        "על מנת לגשת לתוכן של אלמנט, ניתן לעדכן את Property ה-innerHTML שיודע לפרסר את המחרוזת כתגיות חיות.",
    },
    {
      question: "מה עושה המילה `extends`?",
      options: [
        "גורמת לקלאס חדש לרשת את תכונותיו מקלאס אב קיים (ירושה)",
        "הופכת משתנה להיות Global מכל הסקרופים הפנימיים",
        "מריצה קוד CSS וירטואלי נוסף לתוך חזית דף ה-HTML",
        "מאריך את אורך חיי הערך של הזיכרון ב-LocalStorage",
      ],
      correct: 0,
      explanation:
        "פירוש מילולי 'מרחיב' - המשמעות של OOP ביצירת הקצאת ירושה (Inheritance). במילים אחרות: 'Class A יורש את Class B ומוסיף עוד'.",
    },
    {
      question: "מה תפקידה של פונקציית `super()` במחלקה היורשת?",
      options: [
        "היא מזעיקה את הבנאי (constructor) של קלאס האב לאתחל את רכיבי הירושה שבו",
        "היא מתקנת שגיאות מערכתיות בזמן ריצה לפני שהתוכנה תתרסק",
        "היא מחזירה את ה-DOM למצבו הקודם בעת רענון הכרטיסייה על המסך",
        "מדפיסה טקסט המצהיר שהאובייקט גמור ומוכן לעליית קוד אמתי",
      ],
      correct: 0,
      explanation:
        "מוכרחת להופיע ראשונה לפני שניגשים לשנות את ה- `this` בבנייה. קוראת ל-Constructor העליון כדי להגדיר את הנכסים המשותפים ורק אז משלימה את המשך עצמה.",
    },
    {
      question:
        "מה קורה שמזריקים `[{ id: 1 }]` ל-setItem מלי להמירו קודם ב-`JSON.stringify`?",
      options: [
        "הדפדפן ישמור את תבנית המילים הסתמית `[object Object]` במקום לשמור את המידע האמיתי",
        "האחסון קורס והפעולה מוחזרת כלא בוצעה לחלוטין",
        "הדפדפן תמיד ימיר את זה באופן מושלם ללא כל עזרה בגלל מנגנון ה-JavaScript המובנה",
        "הפעולה תשמור את המזהה אך תשמיד את המפתחות כדי לצמצם מקום בזיכרון של ה-LocalStorage",
      ],
      correct: 0,
      explanation:
        "ממשקי Web Storage לא רואים אובייקטים שלמים מסובכים. בעת המרה עקומה למחרוזת, JS יפלוט אזהרת `object object` שתאבד את כל המידע האמתי של המערך.",
    },
    {
      question: "מה ההבדל בין Property ל-Method?",
      options: [
        "Property הוא בעצם נתון סטטי, בעוד Method זו פונקציה תפעולית השייכת לאובייקט שמכיל אותה במשותף",
        "הראשון מטפל בלוגיקה עיצובית של משתנה אחד, השני עושה פעולת ציור על ה-DOM כולו יחד ובונה מחדש",
        "מתודה רלוונטית רק למערכים, פרופרטי שייך רק לאובייקט",
        "אין הבדל ביניהם מעבר לירושה",
      ],
      correct: 0,
      explanation:
        "כפי שלחתול יש 'צבע' (property), ולחתול יש יכולת טכנית 'לילל' (Method המיוצג כפונקציה מריצה).",
    },
  ],
};
