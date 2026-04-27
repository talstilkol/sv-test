// data/lesson11.js
var LESSON_11 = {
  id: "lesson_11",
  title: "שיעור 11 - Arrays, Functions, and Scope",
  description:
    "מערכים, פונקציות חץ, ההבדל בין משתנים לפי ערך והפניה (Value vs Reference), ומתודות מערך מתקדמות ב-JavaScript להפעלה על אוספי נתונים.",
  concepts: [
    // 1. Array
    {
      conceptName: "Array",
      levels: {
        grandma:
          "במקום לכתוב פתק נפרד לכל מוצר בסופר, מערך זה בעצם קבלה אחת ארוכה שיש בה שורה אחרי שורה של כל הדברים שאת צריכה לקנות.",
        child:
          "תור של ילדים לקיוסק! הם עומדים אחד אחרי השני בסדר קבוע. הראשון מקבל מסטיק ואז זה שאחריו מתקדם, ככה הכל נשמר מסודר.",
        soldier:
          "שורת חיילים במסדר המפקד. כל חייל עומד בדיוק במקום מסוים וצריך לחכות שיקריאו בשמו לרוחב הטופס באופן גורף ועוקב.",
        student:
          "מבנה נתונים שמכיל רצף של ערכים תחת משתנה יחיד. בא לפתור בעיה של הגדרה פרטנית של מאה משתנים נפרדים. גישה אליהם מתבצעת בעזרת ציון מפתח עוקב.",
        junior:
          "פעם ניסיתי לשמור עשרה טמפרטורות עם temp1, temp2... עד שגיליתי שמערך מאפשר לי לדחוף הכל לאותו קברניט `const temps = [10, 20, 30]` וזה סידר אצלי את כל הקוד הנקי.",
        professor:
          "An indexed collection of data items stored sequentially in memory mappings. JS V8 engine optimizes 'Arrays' heavily depending on internal element kinds (SMI, DOUBLE, PACKED).",
      },
      illustration:
        "📦 Array — קופסת איחסון רציפה:\n\n" +
        "   let fruits = ['Apple', 'Banana', 'Cherry'];\n" +
        "                   ↓         ↓         ↓\n" +
        "    [ Index ]      0         1         2\n\n" +
        " * כל פריט נשמר כאיבר במערך (Element).",
      codeExample:
        "const scores = [100, 95, 80];\nconsole.log(scores); // [100, 95, 80]",
      codeExplanation:
        "הסוגריים המרובעים מאפיינים מערך - הוא יכול לאכלס טקסטים, מספרים, ואף תערובת של שניהם.",
    },

    // 2. Index
    {
      conceptName: "Index",
      levels: {
        grandma:
          "מספר הבית ברחוב הארוך. כשהדוור מחפש אותך הוא בודק 'איפה תיבה 0? איפה תיבה 1?', ומוצא אותך בקלות פנימה.",
        child:
          "המרוץ התחיל וכל הילדים מקבלים מספר על החולצה. יש טוויסט רציני: המספר של הילד הראשון הוא לגמרי 0 ואז הילד אחריו מקבל 1!",
        soldier:
          "מספר אישי בשרשרת החיול. מי שגוייס ראשון אצלינו מקבל אפס, וישמע את קוד הזיהוי שלו כשיצטרך למשוך ציוד.",
        student:
          "מציין למיקום הרשמי של איבר מסוים. המפתח לגישה בבסיס 0 (Zero-based indexing), שמתחילה מהאיבר הראשוני המסומן כ-`arr[0]`.",
        junior:
          "נפלתי מלא פעמים שניסיתי לשלוף את האחרון בעזרת `arr[arr.length]` ויצא undefined. בסוף קיבעתי בראש ש-'אורך הוא תמיד אחד יותר מאינדקס אחרון בגלל האפס'.",
        professor:
          "The numerical offset multiplier used internally to compute memory addresses when fetching array contiguous values, operating strictly under 0-indexed arithmetic notation.",
      },
      illustration:
        "🔢 Index — ספרור הפריטים מתחיל מ-0:\n\n" +
        "   [ '🚗', '🚕', '🚙' ]\n" +
        "      0     1     2    \n" +
        "\n" +
        "  arr[0] -> מביא '🚗'\n" +
        "  arr[2] -> מביא '🚙'",
      codeExample:
        "const colors = ['Red', 'Blue', 'Green'];\n\nconsole.log(colors[1]); // מדפיס 'Blue'\nconsole.log(colors[0]); // מדפיס 'Red'",
      codeExplanation:
        "קריאה עם סוגריים מרובעים מושכת פריט מהמאגר לפי הכתובת המספרית שלו בלבד.",
    },

    // 3. By Value
    {
      conceptName: "By Value",
      levels: {
        grandma:
          "כמו מתכון שאת מעתיקה לחברה על דף נפרד. אם היא בבית שופכת שמן בטעות על הפתק שלה, הפתק שלך אצלך נשאר נקי ויפה לגמרי.",
        child:
          "אם אני מצייר לך ציור מדויק של הבית שלי, ואתה בגן קורע את הציור שלך, הבית האמיתי שלי עדיין עומד ולא קרה לו כלום.",
        soldier:
          'שכפ"צ חייל אישי. לכל חייל יש פריט עצמאי בעל ערך נפרד. קרע באחד, לא פוצע את אפודו של השני.',
        student:
          "העתקת משתנים מסוגי Primitive (מחרוזות, מספרים, בוליאנים). JS מעתיק נטו את ה'ערך' עצמו במלואו כמתחם חדש לחלוטין ל-Stack.",
        junior:
          "בעבר עשיתי `let a = 5; let b = a; b = 10;`. ציפיתי ש-a ישתנה אבל הוא לא. למה? כי בעבודה פრიמיטיבית אני פשוט לוקח אקסמפלר והולך לעבר שלי בלי לפגוע בהיסטוריה.",
        professor:
          "Assignment of primitive values generates entirely discrete memory stack allocation slots causing complete decoupling of runtime variables.",
      },
      illustration:
        "📄 By Value — העתקה צילומית בלתי תלויה:\n\n" +
        "   var X = במבה\n" +
        "   var Y = X       (מעתיקים ומייצרים קופסה חדשה)\n" +
        "   Y = ביסלי      (שינינו רק את Y)\n\n" +
        "   האם X הושפע? ❌! X עדיין במבה! זה By Value.",
      codeExample:
        "let num1 = 50;\nlet num2 = num1; // שכפול לפי ערך\n\nnum2 = 100;\n\nconsole.log(num1); // עדיין 50\nconsole.log(num2); // כעת 100",
      codeExplanation:
        "כשמדובר במספרים אין קשר חי. המחשב מצלם את התוכן של הראשון, והופך למיושן ובלתי תלוי לגבי עתידו של השני.",
    },

    // 4. By Reference
    {
      conceptName: "By Reference",
      levels: {
        grandma:
          "חשבון בנק משותף. אם הסבא מושך את כל הכסף בכספומט באילת, במקביל בכספומט של סבתא בתל אביב - גם היא מיד נשארת בלי שקל.",
        child:
          "כלבים שמחוברים באותה רצועה! אם תצביע שמאלה - שניהם ילכו לשם יחד. אם תשים כובע על אחד מהם - הכלב שלך אישית ירגיש את זה גם.",
        soldier:
          "רכב סיור שניתן לשימוש גם לסיור בוקר וגם לערב. אם סיור הבוקר שובר פנס, כנראה שסיור הערב יקבל ג'יפ בלי פנס באותו מצב בדיוק - כי זה אותו הרכב פיזית.",
        student:
          "העתקת אוביקטים (כולל מערכים). הם אינם משוכפלים במלואם, אלא נוצר מצביע (Pointer) לאותו מיקום משותף ב-Heap. שינוי דרך משתנה אחד ישפיע גלובלית על המקור.",
        junior:
          "הבאג הגדול הראשון שלי. שמרתי אובייקט של לקוח במשתנה חדש נקי, מחקתי לו שדה 'סיסמא' כדי שלא תיחשף, ופתאום ראיתי שבכל מסד הנתונים שלי הוא נמחק! 'העתקתי' רק לינק עחיד.",
        professor:
          "Variables referring to complex Objects persist primarily as pointer memory boundaries. Reassignment copies only referencing memory-addresses, leading to unintentional object mutation side-effects exclusively.",
      },
      illustration:
        "🔗 By Reference — שיתוף מבוסס הפניה:\n\n" +
        "   let arr1 = [1, 2, 3]\n" +
        "   let arr2 = arr1      (נוצר צינור שקוף למערך המקורי!)\n" +
        "   \n" +
        "   arr2.push(4)        (מוסיפים דרך arr2)\n\n" +
        "   האם arr1 הושפע? 🚨 כן! arr1 עתה שווה [1, 2, 3, 4]!",
      codeExample:
        "const basket1 = ['Milk'];\nconst basket2 = basket1; // חלילה: רק חוט מושך\n\nbasket2.push('Apple');\n\nconsole.log(basket1); // ['Milk', 'Apple'] -> נפגע!",
      codeExplanation:
        "ההקצאה יצרה הפנייה (Reference / Pointer) בלבד. לא נוצר מערך חדש בזיכרון, אלא רחוב חדש שמוביל לאותו מערך בדיוק.",
    },

    // 5. Pointer
    {
      conceptName: "Pointer",
      levels: {
        grandma:
          "במקום לתת לך את הדירה כמתנה פיזית שאקרא איתך ויביא לך הביתה - אני נותנת לך מפתח. כך את מקבלת גישה מלאה אל הדירה מאחורה.",
        child:
          "שלט הכוונה שמצביע לגן המשחקים. אם מציירים שלט חדש - הוא לא עושה עוד גן, הוא רק עוד אצבע שמראה לאותו מעגל קסם.",
        soldier:
          "ציון נציג כליאה. המפקድ לא סוחב שיירת אספקה פיזית בגבו, יש אצלו קשר שמכוון את הציוד לאן שהוא יאמר.",
        student:
          "הכתובת בזיכרון (Memory Address) שמשתנה 'אובייקטי' שומר. המשתנה מכיל בתוכו נטו את 'הכתובת' ולא הנתון המסיבי, וכשהוא נקרא הוא מתחקה אחריה אוטומטית.",
        junior:
          "שמעתי 'פוינטר' ונבהלתי כי זה היה נשמע מ-C. אבל ב-JS זה אותו הדבר: כשאני אומר `a = []` הוא רק נועץ נעץ במסך אל מיקום הזיכרון בענן של ה-App.",
        professor:
          "Abstraction hiding raw pointer geometry mapping to Heap V8 allocations dynamically managing object lifetimes and garbage collections transparently.",
      },
      illustration:
        "👉 Pointer — הפנייה (מצביע):\n\n" +
        "   [משתנה P] ─────(כתובת 0x12)──────>  📦 { דאטה אמיתי }\n\n" +
        " * המשתנה P עצמו הוא רק שלט חיצים. הקופסה רחוקה.",
      codeExample:
        "const pointerA = { power: 100 };\nconst pointerB = pointerA; \n// B הוא לא עצם אלא פוינטר נוסף לאותו רכיב זיכרון",
      codeExplanation:
        "אנו לא יכולים לראות את הכתובת המספרית ממש ב-JS, אבל המנוע חי סביבה, לכן קל לו להעביר עצמים ענקיים בין פונקציות (הוא רק שולח פתק קל עם 'מצביע').",
    },

    // 6. undefined
    {
      conceptName: "undefined",
      levels: {
        grandma:
          "כשקונים קופסת מתנה ופותחים אותה למצוא ש—כלום לא בפנים עדיין. הקופסה עצמה קיימת, עטופה למשעי, אבל אין לה אף ערך פנימי כרגע.",
        child:
          "תיבת הצעצועים שיש לה שם שלך עליה אבל אבא עדיין לא הכניס כל צעצוע מעולם. מישהו שכח לשים בפנים מתנה אז המילה שם היא 'לא-ידוע'.",
        soldier:
          "כלי שנמצא על התקן רישמי בטופס הציוד שלכם אבל שורתו ריקה כי הוא לא נופק מעולם מבחינה לוגיסטית.",
        student:
          "טיפוס יסוד ב-JavaScript המציין שמשתנה הוצהר בהצלחה אל הזיכרון, אך לא קיבל אף ערך (Initialization). זה שונה מ-null (שמציין במכוון 'כלום מוצהר').",
        junior:
          "תמיד קיבלתי undefined כששכחתי לתת ערך למשתנה, או שניסיתי לגשת לאינדקס 5 במערך שיש בו רק 2 איברים. זה מנגנון מובנה להעיד על חוסר פתאומי ולא שגיאת מערכת חמורה.",
        professor:
          "The default primitive output of executing global uninitialized variable bindings, explicitly generated when calling non-return functions or accessing unbound Object fields natively.",
      },
      illustration:
        "🤷‍♂️ undefined — הוכרז, טרם התמלא:\n\n" +
        "   let box;\n" +
        "   console.log(box);\n" +
        "         ↓\n" +
        "     [ קופסה ריקה לגמרי ] (undefined מחכה לערך)",
      codeExample:
        "let player;\nconsole.log(player); // 'undefined'\n\nplayer = 'Mario';\nconsole.log(player); // עכשיו יש 'Mario'",
      codeExplanation:
        "undefined בא לומר לנו שההגדרה רשונה הצליחה אך המתכנת מעולם לא אמר מה היא באמת מחזיקה. זה מונע קריסה מוחלטת.",
    },

    // 7. boolean
    {
      conceptName: "boolean",
      levels: {
        grandma:
          "זה פשוט מתג של אור בסלון: הוא יכול להיות אך ורק או דלוק או כבוי. אין מצב של 'חצי דלוק'.",
        child:
          "תשובה לשאלה של כן או לא. 'האם יש פיל מחוץ לחדר עכשיו?' מספיק להגיד 'נכון' או 'שקר'.",
        soldier:
          "קריאת 'רשאי/לא רשאי'. מצב בינארי טקטי. או שיש לך אישור פתיחה באש (True) או שאתה חדל מבצעית (False).",
        student:
          "סוג משתנה מהיר מאוד (טיפוס Primitive) המכיל רק אחת משתי אופציות סופיות: `true` או `false`. שימושי ביותר כבסיס לחסימת לוגיקה בשאילתות תנאי (If statement).",
        junior:
          "בעבר שמרתי `isLoggedIn = 'yes'` כמשפט... אחרי זה הסתבכתי עם תנאי בדיקה ארוכים. כשגיליתי שאתה יכול נטו לכתוב בוליאן הבנתי כמה זה פשוט לרשום `if(isLoggedIn)`.",
        professor:
          "A logical data type strictly representing truth values originating from Boolean algebra fundamentals determining structural execution flow inside branching mechanisms.",
      },
      illustration:
        "🔘 Boolean — אמת או שקר בלבד:\n\n" +
        "  isRaining = true   ✅ \n" +
        "  hasMoney  = false  ❌",
      codeExample:
        "const isMarried = false;\n\nif (isMarried) {\n   console.log('Got a ring!');\n} else {\n   console.log('Single forever!'); \n}",
      codeExplanation:
        "טיפוס המידע היעיל ביותר למכונה - נשמר קצר מאד ויודע לנווט זרימה לוגית במבנים קריטיים של המערות קוד.",
    },

    // 8. number
    {
      conceptName: "number",
      levels: {
        grandma:
          "מספרים רגילים שאת משתמשת בהם לפריטת כסף במכולת למשל, מאה, חמישים או שבר שלקח 2.5 מצרכים.",
        child:
          "המכנה המושלם להכריע מי ניצח בנקודות תחרות גולים. 5 גולים זה חמש, לא 'חמש' כמו שמילה מדברת.",
        soldier:
          "כמות תחמושת או חישוב קואורדינטות. גששים צריכים מדדי אורך מספריים טהורים שניתן להפעיל עליהם פעולות חשבון מתמטיות של השלמה.",
        student:
          "טיפוס נתונים המשמש לכלל חישובים אריתמטיים ב-JavaScript. החל מיוני 0 ועד עשרוניים כפולים (Float), ללא הבדלה בתת-הסוגים כמו שפות אחרות.",
        junior:
          "בפעמים הראשונות שניסיתי לחבר מחרוזת קלט מספר עם '5' יצא לי '105' במקום 15. היה קשה עד שהתחלתי לחייב מתודות כמו `Number(value)` שיכניסו את הערך לנישה האמורה.",
        professor:
          "IEEE 754 double-precision 64-bit floating-point format values used uniformly within JS context natively bypassing distinctions between integers/decimals barring bigint exceptions.",
      },
      illustration:
        "🔢 Number — ספרה במנוע:\n\n" +
        "   let age = 30;           (עובד)\n" +
        "   let pi  = 3.14;         (עובד מסוג שבר)\n" +
        "   let fail= '20' + 5;     ('205' - בעיה כי 20 היא מחרוזת מילים!)",
      codeExample:
        "const items = 5;\nconst price = 20.5;\n\nconst total = items * price; \n// נטו חשבון. התשובה היא מספרית (102.5)",
      codeExplanation:
        "ספרות אינן צריכות מרכאות כמו טקסט, ה-JS יודע לתקוף אותן מיידית בפעולות מכפיל, מחלק ועוד מבלי דאגות.",
    },

    // 9. string
    {
      conceptName: "string",
      levels: {
        grandma:
          "חוט שזור של אותיות, זו פשוט מילה או משפט רגיל בספר שקריא לבני אדם כמו 'שלום'.",
        child:
          "מחרוזת של חרוזי אותיות קטנות - אחת משתבצת לשנייה עד שהן בונות כתיב מלא וארוך להקריא במיטה.",
        soldier:
          "קריאת דיווח בקשר. מחרוזת אותיות מושמעת, המועברת כמו פקודת מילים ולא כמדד כומת שמגיעה אחוזית מהשטח. 'קודקוד פה סייר'.",
        student:
          "טקסט ממומש בסיבי מחשב בעזרת טיפוס Primitive String. מוכרח להיות ממוסגר במרכאות ('' או \"\") על מנת לדרוש מנוע העריכה ולהצריכו לעבד אותן כמילולי.",
        junior:
          "כל מה שהולך למודל שנקרא לדוגמה Document חייב להיות String וכשחיפשתי ID ללא מרכאות הוא חיפש משתנה מופקע ולא מחרוזת שם וזרק לי אזהרה קשה.",
        professor:
          "An immutable sequence of 16-bit unsigned integer values treated as UTF-16 encoded char blocks forming continuous textual string primitives structurally.",
      },
      illustration:
        "📝 String — מחרוזת קלאסית:\n\n" +
        "   'Hello World!'  \n" +
        '   "I am a text" \n' +
        "   `Template String`",
      codeExample:
        "const firstName = 'Tal';\nconst lastName = 'Levi';\n\nconst fullName = firstName + ' ' + lastName;\nconsole.log(fullName); // 'Tal Levi'",
      codeExplanation:
        "רצף תווים חייב לבוא בלווית תגי ציטוט, כיוון שבלעדיהם השפה תחפש בהחלט קריאת משתנה קיים או פקודת ריצה.",
    },

    // 10. function
    {
      conceptName: "function",
      levels: {
        grandma:
          "מכונת הכביסה של הקוד. במקום לכבס דברים נפרדים בידיים כל פעם, בנית מכונה. עכשיו פשוט לוחצים 'הפעל' והיא עושה את העבודה הקבועה מחדש.",
        child:
          "רובוט ששומר קסם מועדף בבטן! בכל פעם שאתה קורא בשם שלו, הוא מבצע את אותו הטריק השלם, כמו לקפוץ פעמיים ולצעוק ווהו.",
        soldier:
          "נוהל תרגולת קבוע מראש. במקום לפקד על כל חייל לחוד כל בוקר, הרס\"ר צועק 'מסדר!' (מחולל פונקציה) וכל הטקס רץ אוטומטית כי זה נוהל כתוב.",
        student:
          "בלוק קוד ניתן לשימוש חוזר (Reusable) המקבל פרמטרים ומחזיר ערך (או לא מחזיר כלום). עמוד השדרה של הפעלת שגרות בקרת זרימה.",
        junior:
          "בהתחלה חזרתי על אותן 5 שורות בכל פעם לשמור נתון שונה... ואז דחפתי אותן לתוך 'קליפה' של function עם משתנים דינמים, והפעלתי בכל המסכים בשורה קטנה אחת.",
        professor:
          "First-class citizen objects in JavaScript representing executable code blocks. Endowed with closures and lexical environments, they can be passed as arguments deeply within execution stacks.",
      },
      illustration:
        "⚙️ Function — מכונת פעולות שחוזרת על עצמה:\n\n" +
        "  [ קמח + מים ]\n" +
        "        ↓\n" +
        "  [ פונקציית function bakeCake() ]\n" +
        "        ↓\n" +
        "     🍰 (עוגה!)\n\n" +
        " * מופעלת רק כשאנחנו קוראים בשמה bakeCake()",
      codeExample:
        "function sayHello(name) {\n   console.log('Hello ' + name);\n}\n\nsayHello('Tal'); // מפעיל את מכונת הברכה",
      codeExplanation:
        "פונקציה איננה מופעלת לבד, אלא שומרת את החוקיות במאגר סגור. רק קריאה אמיתית לפונקציה תריץ את הדם הקר שבה.",
    },

    // 11. object
    {
      conceptName: "object",
      levels: {
        grandma:
          "תיבת תכשיטים מסודרת. יש לה מגירות עם שמות ברורים: 'טבעות', 'שרשראות', 'שעונים'. זה הכל אוגדן של רכוש רלוונטי.",
        child:
          "שידת החדר שתויגה במדבקות! במגירה שנקראת 'נשק' נשים חרב, ובמגירה שנקראת 'חיים' נשים לב אדום למשחק.",
        soldier:
          "תיק לוחם. התיק הוא אובייקט שלם, אך בתוכו ישנם תאים מוגדרים: תא עזרה ראשונה, תא מפות ותא קשר. משויך לישות אחת.",
        student:
          "מבנה נתונים בשפת JavaScript. בבסיסו אוסף מורכב של זוגות Key-Value שמאפשר ייצוג עצמים מהעולם האמיתי כמו רכב (צבע, מנוע, שם דגם).",
        junior:
          "השתמשתי במלא משתנים player1Name, player1Age... עד שהבנתי שמבחינה לוגית הרבה יותר הגיוני לזרוק אותם תחת '{קרובה}' ולהשתמש ב- player.name.",
        professor:
          "An unordered collection of attributes mapped heavily back to hash tables managed by runtime optimizing compilers assigning hidden shape classes caching identical object forms.",
      },
      illustration:
        "🏷️ Object — נראות וארגון במפתח-ערך:\n\n" +
        "  const Car = {\n" +
        "      key  :  Value \n" +
        "    color  : 'Red',\n" +
        "    speed  :  200\n" +
        "  }",
      codeExample:
        "const hero = {\n  name: 'Batman',\n  city: 'Gotham'\n};\n\nconsole.log(hero.city); // Prints: Gotham",
      codeExplanation:
        "הסוגריים המסולסלים מאגדים מספר פרטים לישות בלעדית, ומאפשרים עבודה בעלת משמעות של שליפות ערכים יעודיים.",
    },

    // 12. let
    {
      conceptName: "let",
      levels: {
        grandma:
          "קופסת אוכל של נכד אחד שיכולה בכל יום להתמלא במשהו אחר. היום שמתי בה תפוח, מחר אוציא אותו ואשים שם כריך ריבה.",
        child:
          "מדבקה עם שם שמותר להעביר ממשחק למשחק! פעם היא מודבקת על רובוט, פעם היא מוקדשת כגיבורה על הטלוויזיה.",
        soldier:
          "מחסנית פנויה שמיועדת בדיוק לסבב הנוכחי. היא קבועה בהסדקה עצמה, אבל כמות הכדורים בה יכולה להתמלא ולהתרוקן לאורך הקרב בשטח.",
        student:
          "הצהרת משתנה דינמי (Mutable) בעל Block Scope מופרק (ES6). ניתן להקצות לו ערכים חדשים כמה שרוצים, אך לא ניתן להגדירו פעמיים באותו אזור.",
        junior:
          "תמיד כתבתי var עד שחברים עשו לי צחוק. אז התחלתי עם const כמלכודת עד שהייתי בטוח שאני אשכרה צריך לשנות משהו כמו בלולאת for (let i) שם אני חיב להשתמש בו לטובת עדכון המספר.",
        professor:
          "ES6 block-scoped variable binding storing a valid reference inside the Lexical Environment, avoiding Variable Hoisting initialization pitfalls through the Temporal Dead Zone (TDZ).",
      },
      illustration:
        "🔄 let — משתנה שניתן לשנות (Mutable):\n\n" +
        "   let box = 🎁\n" +
        "   box = ⚽   (אממ... עכשיו יש שם כדור!)\n" +
        "   \n" +
        " * מותר לרוקן ולהחליף תכולה כמה שרוצים.",
      codeExample:
        "let score = 0;\nscore = 10; // מעודכן בהצלחה\nscore = score + 5;\nconsole.log(score); // 15",
      codeExplanation:
        "הצהרת ה-Let נותנת הסמכה גמישה למשתנה להשתנות באופן חוקי בכל עת בתוך תחום הריצה שלו (Scope).",
    },

    // 13. var
    {
      conceptName: "var",
      levels: {
        grandma:
          "קופסה ישנה ושבירה בארון. פעם כולם היו משתמשים רק בה והיא הייתה עושה הרבה טעויות כשזרקו עליה דברים חדשים בלי לשים לב.",
        child:
          "רוח רפאים שבורחת מהחדר! כשאתה קורא לשם שלה היא פתאום יכולה להופיע בכל המקומות בבית בלי שרצית ולהפחיד.",
        soldier:
          "קשר אלחוטי פרוץ שיכול להילכד בכל הערוצים גם אם כיוונת לתדר אישי במחלקה. מידע זולג החוצה ומשנה דברים לרוחב הגזרה.",
        student:
          "ההצהרה ההיסטורית (Global / Function Scope). היא מתועדת ב-Hoisting ולוקה בחסר בשמירה על Block Scope - מה שעלול ליצור דריסת משתנים בלי כוונה בכל רחבי הקוד.",
        junior:
          "בתור מתחיל תפסתי קוד ישן להעתקה וכל הבאגים שלי נבעו מזה שהגדרתי `var i` בלולאה, ואז פונקציה אחרת קראה את אותו i פתאום! ברחתי ממנה ישר ל-let ול-const.",
        professor:
          "Legacy variable declaration instantiating property inside the Global Execution Context causing scope leaking globally or function-wide, notoriously bound by JS's hoisting execution initializations.",
      },
      illustration:
        "👻 var — הדרך הישנה והמסוכנת לדלף משתנה:\n\n" +
        "  if (true) {\n" +
        "     var monster = 'Rawr';\n" +
        "  }\n" +
        "  console.log(monster) -> מודפס! פרץ את הסוגריים!",
      codeExample:
        "var oldWay = 1;\nvar oldWay = 2; // אין שום אזהרה! הוא פשוט דורס מסוכנות.",
      codeExplanation:
        "Var כבר אינו בשימוש בעולם החדש. הוא קל מדי לחיקוי פנימי ולדריסה על ידי מהנדסים רשלנים שמשתמשים שוב ושוב באותו שם ללא אזהרת שגיאה כלל.",
    },

    // 14. scope
    {
      conceptName: "scope",
      levels: {
        grandma:
          "גדרות של בתים. מה שנמצא בחצר שלנו הוא שלנו (בני הבית יכולים לגעת). מה שטמון בבית של השכן לא רלוונטי אליי.",
        child:
          "קירות שקופים במשחק! אם צעצוע נמצא בתוך קיר הזכוכית, הילד שבחוץ לא יכול לקחת אותו, רק הילד שבפנים הקיר יכול להשתמש בו.",
        soldier:
          "סיווג ביטחוני לחשיפה. חייל רגיל חשוף למידע הרמה החיצוני (Global) אבל לא יכול להיכנס לאוהל דיונים סגור (Block) להאזין לאלוף.",
        student:
          "תחום המחיה/גישה של משתנים ופונקציות: יכול להיות עולמי (Global), תחומי של פונקציה ולוקאלי ספציפי של Block. השולט במה שכרגע נמצא במרחב הנגישות.",
        junior:
          "היו מקרים שקראתי למשתנה שיצרתי בתוך If מסכן ורציתי להדפיס אותו מחוץ לסוגר, והמהדר השתגע שאין דבר כזה. לקח לי זמן לעכל שמשתנים (Let ו-Const) נחסמים בטווח בו נולדו (Scope).",
        professor:
          "The static lexical environment defining binding accessibility at runtime dictating resolution boundaries for identifiers through Scope Chains ascending contexts.",
      },
      illustration:
        "🧱 Scope — חומות הנגישות למידע:\n\n" +
        "  🌐 בחוץ (Global)\n" +
        "    let a = 1; \n\n" +
        "  🔒 בפנים (Block Scope)\n" +
        "    { let b = 2; }\n\n" +
        "   console.log(b) -> ❌ שגיאה! לא מורשה לגעת מבחוץ!",
      codeExample:
        "const globalHero = 'Batman';\n\nfunction doSecret() {\n  const secretBase = 'Batcave'; \n}\n// console.log(secretBase) יחזיר שגיאה צורמת כאן בחוץ!",
      codeExplanation:
        "טווח שומר על המערכת מפני התנגשויות. אם יש 5 פונקציות שמכילות בתוכן משה בשם Result, הן לא דורסות אחת את השנייה משום שכל אחת נעולה בעולמה!",
    },

    // 15. arrow function
    {
      conceptName: "arrow function",
      levels: {
        grandma:
          "פתיחת דלת בלי כל שלבי המפתח הארוכים. קיבצנו עשר פעולות שצריך לכתוב ארוך למראה קצר יותר. חץ שמקצר את עוגמת הכתיבה.",
        child:
          "רובוט ספורטיבי קטן יותר! רובוט 'חץ' עושה בול מה שעושה הרובוט הרגיל אבל תופס הרבה פחות מקום במסך ורץ ישר עם חץ מאויר '=>'.",
        soldier:
          "קוד שטח מקוצר - נוהל מידי שלא דורש הרחבה והקדמות טקסיות על מי הוא בדיוק. מחליף פקודה ארוכה לסימן חץ מבצעי.",
        student:
          "תחביר תחליפי מקוצר ומודרני (ES6) שמייצר משתנה פונקציונאלי. אין לו הקצאת This עצמאית משלו ולכן הוא מוכן מעולה לקולבקים.",
        junior:
          "בתור התחלה סירבתי להתרגל... אבל כשראיתי שאתה כותב `() => 5` וזה אוטומטית מקצר את הצורך גם בסוגריים וגם במילה return – לא חזרתי ל-Function הישנה לעולם.",
        professor:
          "An anonymous function expression with concise syntax lacking an implicit [[ThisBinding]] logic allowing it to flawlessly lexically capture context from ascending static enclosures.",
      },
      illustration:
        "🏹 Arrow Function — קיצור הדרך לביצוע (ES6):\n\n" +
        "   הדרך הישנה:  function() { ... }\n" +
        "   הנשק החדש:   () => { ... }\n\n" +
        " * ללא המילה המסורבלת העתיקה.",
      codeExample:
        "const add = (a, b) => a + b;\n\nconsole.log(add(5, 5)); // 10, וזה כולל Return משתמע בחינם!",
      codeExplanation:
        "פונקציות חץ אינן רק תחביר נוח יותר, אלא כלי מודרני המונע תקלות במערכת קריאות ה-Context של מערך כבד.",
    },

    // 16. forEach
    {
      conceptName: "forEach",
      levels: {
        grandma:
          "לשטוף כלים - את לוקחת את הערימה, מרימה תבנית אחת, שוטפת. מרימה תבנית שניה, שוטפת. וככה לכל (for each) תבנית בערימה במעבר אחד.",
        child:
          "המורה בכיתה שעוברת תלמיד תלמיד ונותנת לכולם באופן אישי מדבקה! פעולה טובה שמתבצעת למען כל חלק בקבוצה ברצף.",
        soldier:
          "בדיקת מסדר יציאה כלי אחרי כלי. המפקד עובר על כולם באותו מבנה ארוך ונותן הערה (פעולה) עבור כל לוחם בשורה עד הסוף.",
        student:
          "לולאת High Order על מערך, המקבלת Callback ומריצה אותו בדיוק פעם אחת צמודה לכל איבר. לא ניתן לעצור (לשבור break) אותה, והיא תמיד מחזירה undefined.",
        junior:
          "לפני כן עשיתי תמיד for (let i =0) שבר אותי עם טעויות. עם forEach זה פשוט – 'קח חיל במערך ותעשה כל הדפסה'. לא אכפת לי האורך שלו.",
        professor:
          "An iterator prototype method executing a synchronus loop invoking the parameter callback identically mimicking map without materializing an allocated return array saving memory heap space dynamically.",
      },
      illustration:
        "🔄 forEach — לעבור אחד אחד ולפעול:\n\n" +
        "  [ '🍎', '🍌', '🍇' ].forEach( פרי => תאכל! )\n" +
        "        ↓      ↓      ↓\n" +
        "      נאכל   נאכל   נאכל!",
      codeExample:
        "const kids = ['Dan', 'Ron', 'Yael'];\n// לכולם תחולק סוכריה\nkids.forEach(kid => console.log(kid + ' got candy!'));",
      codeExplanation:
        "פונקציה חכמה המריצה בלולאה התערבות חיצונית (callback) עבור כל פרט בשרשרת ללא צורך בחישוב האורך המסורבל.",
    },

    // 17. filter
    {
      conceptName: "filter",
      levels: {
        grandma:
          "ניפוי קמח במסננת רשת. כל מה שטוב עובר ויורד למטה לקערה הנקייה, וכל פירור גס פשוט נתקע ונזרק לפח של ההיסטוריה.",
        child:
          "להוציא את הממתקים המגעילים. יש לך שקית, אתה עובר על כולם למצוא את האדומים (True) שאתה רוצה לצד שלך, ומשליך את הירוקים (False).",
        soldier:
          "סינון מועמדי חתך לימי סיירות דרך פרמטר סף. עוברים על כל רשימת הטירונים, ומי שלא רץ מספיק מהר מקבל 'False' מודח מן הרשימה הזכאית החדישה לגמרי.",
        student:
          "מתודת מערך המקימה מערך חדש מאפס. עוברת איבר איבר, והייתה שפונקציית התנאי (callback) מחזירה true - הוא מוזרק לגוף המערך המסונן הטרי. השאר ננטשים.",
        junior:
          "בכל פעם שביקשו 'תביא רק יוזרים מחוברים' עשיתי for-לופ ריק והוספתי ב-push עם IF... כשלמדתי FILTER הבנתי כמה הכל הופך לקריא ועובר בשורה אחת מרשימה.",
        professor:
          "A non-mutating functional array iteration accumulating verified elements inside a newly allocated memory block explicitly when the dispatched predicate evaluates to true conceptually preserving immutability.",
      },
      illustration:
        "🧃 filter — מסננת נתונים מחמירה:\n\n" +
        "  [ 10, 5, 20, 2 ].filter( num => num > 8 )\n" +
        "     ↓  ✖   ↓   ✖\n" +
        "  [ 10, 20 ] (רק אלה שעברו ציון 'אמת' הוזמנו לעיר החדשה!)",
      codeExample:
        "const ages = [15, 21, 12, 40, 18];\nconst adultsOnly = ages.filter(age => age >= 18);\nconsole.log(adultsOnly); // Prints [21, 40, 18]",
      codeExplanation:
        "פונקציית filter לא הורסת את המערך הקיים, היא מייצרת רשימה (Array) אחות שמאכלסת רק קולטים שהשיבו TRUE בבוחן הפנימי שסיפקנו.",
    },

    // 18. map
    {
      conceptName: "map",
      levels: {
        grandma:
          "להפוך מרכיב למרכיב שעבר דרג. למשל, את מעבירה כל חתיכת לחם למצנם ומקבלת בכל עמדה בדיוק חתיכת צנים מקבילה חדשה מוכנה בצלחת אחרת.",
        child:
          "מכונת שינוי הצורות! אתה מכניס שורה של חמישה כדורים למכונה, ובצד השני יוצאים בדיוק חמישה כוכבים חדשים באותו סדר במדויק.",
        soldier:
          'שדרוג נשקים פס ייצור. כל חייל בטופס שעובר במפעל מקבל חתיכת קודקוד לייזר (שינוי אובייקט). שום טירון לא נשמט ע"י המכונה, כולם חוזרים משודרגים בתור כוח מחודש.',
        student:
          "מתודת ליבה המחזירה מערך חדש (Copy) שאורכו זהה במדויק למערך המקור. ההבדל הוא שכל התאים עברו את מטריצת שינוי התצורה שסיפקת בפונקציית ה-Callback.",
        junior:
          "תמיד התלבטתי בין forEach ל-map, עד שהבנתי סוד: forEach בכלל לא פולט כלום למכונה (undefined), אבל map 'מתחייב' להכין לך מערך מהשקוף המגודר ירש הלאה למשתנה.",
        professor:
          "An immutable projection pipeline taking N elements running callback transform execution logic to identically produce N element copies efficiently mapped without risking raw original pointer corruption.",
      },
      illustration:
        "✨ map — מפעל של שינוי מראה מוחלט (העתקות):\n\n" +
        "  [ 1, 2, 3 ].map( num => num * 2 )\n" +
        "    ↓  ↓  ↓\n" +
        "  [ 2, 4, 6 ]  (קיבלת מערך מקביל, זהה באורכו אך שהונדס חישובית מראש)",
      codeExample:
        "const rawPrices = [10, 20];\n// אנחנו מכינים עותק שלהם בתוספת מיסים קשוחה\nconst withTax = rawPrices.map(price => price + 5);\nconsole.log(withTax); // [15, 25]",
      codeExplanation:
        "חשוב לציין: הפונקציה מחוייבת לבצע RETURN תעשייתי בתוכה כדי להסביר למערכת איך יש להלביש את הצורה אל הכתובת החדשה היורשת.",
    },

    // 19. find
    {
      conceptName: "find",
      conceptTopic: "מתודות מערך",
      levels: {
        grandma: "לחפש את המשקפיים שלך בסלון. ברגע שהיד מסיירת על השולחן ונוגעת במסגרת - את מיד מפסיקה לחפש ולוקחת אותם. לא תמשיכי לסייר מתחת לספה. מצאת - לקחת.",
        child: "משחק מחבואים קצר. כשאנחנו מחפשים מישהו, ברגע שמצאנו את החבר הראשון שהתחבא הפינה - אנחנו רצים אליו ועוזבים את השאר, קיבלנו מה שרצינו.",
        soldier: "בדיקת חשודים לאיתור מבוקש בכיר. הבלש עובר אחד אחד עם תמונה, ברגע שהראשון תואם למבוקש - אנחנו עוצרים אותו מיד ועפים משם, החיפוש נעצר אקטיבית.",
        student: "מתודת מערך המחזירה את האיבר הראשון (בלבד!) שעבורו ה-Callback מחזיר true. מיד ברגע המציאה, המנוע יוצא (short-circuit) מהלולאה ולא בודק את שאר האיברים.",
        junior: "פעם עשיתי filter ואפילו שזה מצא את המשתמש זה החזיר לי מערך `[{name: 'yoav'}]` ואז הייתי צריך לעשות `arr[0]` כדי לדלות אותו. כשלימדו אותי find, נדהמתי שזה במכה משיג לי את האובייקט נקי לגמרי.",
        professor: "An iterative matching algorithm that predictably short-circuits evaluation on the very first truthy Boolean evaluation emitted by the user callback, returning that specific referential sequence efficiently."
      },
      illustration:
        "🔍 find — עוצר במציאה הראשונה:\n\n" +
        "  [ '🐶', '🐱', '🐶' ].find( חיה => חיה היא כלב )\n" +
        "        ↑  ( מצא את הכלב הראשון! לא ימשיך לבא! )\n" +
        "       '🐶'",
      codeExample: "const people = [{id: 1, name: 'Dan'}, {id: 2, name: 'Lee'}];\nconst user = people.find(p => p.id === 2);\nconsole.log(user.name); // 'Lee'",
      codeExplanation: "פונקציית מתודה קלה מאוד שפועלת תחת חסכון בביצועים: ברגע של פליטת הצלחה, היא נפלטת מהלולאה ותחזיר את האובייקט הבודד."
    },

    // 20. reduce
    {
      conceptName: "reduce",
      conceptTopic: "מתודות מערך",
      levels: {
        grandma: "להכין קציצה מכל המצרכים. יש לך קערה גדולה עם מלח, בשר וביצה, ואת פשוט לשם הכל, לשה ולשה עד שנשארת ביד אחת עם קציצה אחת ענקית ומרוכזת משכולם.",
        child: "כדור שלג אימתני בפיסגה! הוא מתחיל קטן, והוא מתגלגל למטה, אוסף עוד שלג ועוד ילדים, עד שלמטה הוא הופך לכדור ענק אחד שמחיץ את כולם בתוכו.",
        soldier: "טריקת חפ\"ק מבצעים. אוספים את כל הנתונים הבודדים מהשטח (רוגים, פצועים, תחמושת), ולקראת בוקר מצמדים הכל למספר מסוכם אחד במחברת הסיכום של המח\"ט.",
        student: "מתודת האגרגציה המורכבת מכולם. מפעילה פונקציה מצטברת מול כל פריט (Accumulator), כשכל צעד משלב את הפריט הנוכחי לתוך התוצאה הצבורה, עד שנותר ערך סופי מוצק ויחיד.",
        junior: "זה תמיד הפחיד אותי! ראיתי שזה לוקח (acc, curr) ולא הבנתי מי זה מי. ציירתי לי ש-acc הוא בעצם 'הקופה' שזוכרת מקודם, ו-curr הוא השטר החדש שזורקים אליה, והחיים נהיו פשוטים.",
        professor: "The ultimate algebraic catamorphism folding an array structure safely across its elements from left to right maintaining persistent state inside an accumulator till resolving a holistic scalar."
      },
      illustration:
        "🗜️ reduce — צמצום של הכל לתמצית יחידה:\n\n" +
        "  [ 10, 20, 30 ].reduce( (קופה, מספר) => קופה + מספר )\n" +
        "    10 + 20 = 30 \n" +
        "           + \n" +
        "          30  =(מתמזג)=\n" +
        "               [ 60! ]",
      codeExample: "const bills = [100, 50, 20];\n// ה-0 בסוף זה 'סכום התחלתי' לקופה\nconst total = bills.reduce((acc, current) => acc + current, 0);\nconsole.log(total); // 170",
      codeExplanation: "Reduce היא הבוס הגדול. מכתירה את הפריטים לפעולה מדויקת שמאגדת כל ערך אל זכרון פנימי מתגלגל (Accumulator) לקבלת דוח סופי אחיד."
    },

    // 21. spread
    {
      conceptName: "spread",
      conceptTopic: "מתודות מערך",
      levels: {
        grandma: "להוציא את כל הפירות מהשקית ולפזר אותם על שולחן השבת. במקום להביא שקית סגורה לשולחן, את פורטת אותם להיות גלויים למה שמרכיב אותם.",
        child: "כשאתה הופך את קופסת הלגו על הרצפה! הלגו כבר לא 'בקופסה' סגורה, עכשיו כל חתיכה שוכבת ברצפה בנפרד ואפשר לשים אותה בקופסה אחרת חדשה.",
        soldier: "פריסת נוהל שיירה. במקום שהחיילים יישארו ארוזים בתוך הנגמ\"ש (המערך השלם), הם נשפכים ממנו ומתפזרים עצמאית כפרטים בשדה.",
        student: "אופרטור פיזור מסומן כ-`...`. תפקידו לקחת Iterable (כמו מערך) ולהרחיב אותו לאינדוודואלים, מה שמאפשר במכה ליצור העתקה עמוקה או מיזוג אובייקטים ללא התערבות by Reference מטרידה.",
        junior: "היו לי 2 מערכים שרציתי לחבר ולא ידעתי איך. כשלמדתי `[...arr1, ...arr2]` חייכתי כאילו גיליתי קסם על-טבעי שפותח שקיות בתוך שקית ענקית חדשה בקלות של שלוש נקודות.",
        professor: "Syntactic iteration expansion syntax consuming the internal Symbol.iterator implicitly unraveling structural bounds inline into standalone arguments dynamically copying allocations."
      },
      illustration:
        "🌠 Spread (...) — פתיחה ושפיכת התכולה:\n\n" +
        "  השקית המקועה:\n" +
        "    arr1 = [ 'A', 'B' ]\n\n" +
        "  שופכים לשקית חדשה מאפס:\n" +
        "    arr2 = [ ...arr1, 'C' ] \n" +
        "    [ 'A', 'B', 'C' ]",
      codeExample: "const oldNumbers = [1, 2];\nconst newNumbers = [...oldNumbers, 3]; \n\nconsole.log(newNumbers); // [1, 2, 3]",
      codeExplanation: "שלוש הנקודות הן תורת 'השקית הקרועה'—הדבר פורק בעצם את המערך ליחידות קטנות ולמעשה זה הכלי הכי נוח לייצור מערך Copy בלי להשתעבד שוב ל-Pointer עריכת המקור."
    },

    // 22. push
    {
      conceptName: "push",
      conceptTopic: "מתודות מערך",
      levels: {
        grandma: "לרשום עוד מוצר ששכחת בתחתית רשימת החנויות הישנה. הרשימה המקורית פשוט מקבלת עכשיו שורה נוספת בקצהה.",
        child: "ילד שנדחף מאחורה בסוף התור של פנינת הקיוסק! התור קיבל מישהו חדש שמחכה לעמוד בסוף השורה ארוכה.",
        soldier: "דחיפת מחסנית נוספת לאפוד בקצה. הלוגיסטיקה קולטת כרגע ציוד והוא מאפסן אותו במקום הפנוי האחרון כהרף עין.",
        student: "פונקציה מובנית שמשנה מערך (Mutates) בכך שהיא מחדירה איבר (או יותר) ישירות לקצה האינדקס המסיים ומחזירה את אורכו החדש של המערך.",
        junior: "בכל פעם שקיבלתי נתון ממשתמש חדש התלבטתי לאן להכניס אותו ב-array. בעזרת push הוא אוטומטית פשוט זרוק לסוף וזה מדהים, אבל אסור לשכוח שהוא פוגע במערך עצמו.",
        professor: "An elementary mutating array method executing a rapid O(1) allocation insertion towards the uppermost bounding length index natively shifting memory offset lengths automatically."
      },
      illustration:
        "➡️ push — הוספה לסוף המסלול:\n\n" +
        "   [ 🚗, 🚕  ] \n" +
        "         + \n" +
        "       push(🚙)\n" +
        "   [ 🚗, 🚕, 🚙 ]",
      codeExample: "const cart = ['Bread'];\ncart.push('Milk'); // נוסיף לסוף\n\nconsole.log(cart); // ['Bread', 'Milk']",
      codeExplanation: "פעולה פשוטה למדי: לקחת כל דבר – בין אם אובייקט ענק ובין אם מספר מינימלי ולהדביק אותו בקצה המערך."
    },

    // 23. pop
    {
      conceptName: "pop",
      conceptTopic: "מתודות מערך",
      levels: {
        grandma: "להוציא את הספר האחרון בערמה כי החלטת בסוף לא לקנות אותו שניה לפני שהגעת לקופה. הספר התחתון עף.",
        child: "מגדל קוביות סופר גבוה! פתאום את לוקחת את הקוביה הכי עליונה כדי שהוא לא יתכרסק. רק האחרונה עפה.",
        soldier: "ירי הכדור העליון ביותר החוצה מתוך המחסנית. זה שהכנסנו אחרון, הוא כמובן זה שקופץ עכשיו החוצה כשהמחסנית יורקת אותו.",
        student: "מוציאה פיזית את האיבר האחרון (האינדקס הגבוה ביותר) מתוך המערך המקורי ומשמידה אותו מהשרשרת, תוך כדי החזרתו למתכנת לצורך שמוש פוטנציאלי במשתנה הנוכחי.",
        junior: "כשעשיתי מערכת הודעות רציתי למחוק את ההודעה הישנה ביותר שיש, וכתבתי pop. זה היה מעולה כי 'פופ' עשה שני דברים: גם קרע אותה מהמערך וגם זרק אותה לי לידיים ככה שהצלחתי להדפיס אותה כפקודת 'בוטל!'.",
        professor: "Mutating deletion targeting explicitly the tail index length minus one, strictly reducing array boundary limits by allocating offset subtraction effectively in constant time."
      },
      illustration:
        "⬅️ pop — משמיד מהקצה האחורי:\n\n" +
        "   [ 🚗, 🚕, 🚙 ]\n" +
        "             ↓\n" +
        "           pop()  < מופעל עליו!\n" +
        "   [ 🚗, 🚕 ]",
      codeExample: "const tasks = ['Clean', 'Wash'];\nconst doneTask = tasks.pop();\n\nconsole.log(doneTask); // 'Wash' - חזר אלינו ביד\nconsole.log(tasks); // ['Clean'] - נשאר מסכן",
      codeExplanation: "פופ לא דורשת הכוונה: היא חופרת תמיד לאיבר האחרון (אורך מינוס אחד), מחריבה אותו מקיומו במכלול המערך, ושולפת אותו לנוחות טעינה מיידית."
    },

    // 24. shift
    {
      conceptName: "shift",
      conceptTopic: "מתודות מערך",
      levels: {
        grandma: "הלוקח הראשון בתור אצל הרופא נכנס פנימה ומסיים. כל התור הארוך מאחוריו נאלץ לזוז (Shift) כיסא אחד קדימה כעת.",
        child: "לשלוף מהמדף את הספר הכי דחוק שקרוב לקיר ככה שכל הספרים שאחריו נופלים להדקו ושומרים על הסדר של הרצף.",
        soldier: "פינוי פצוע ראשון! האלונקה הקדמית נלקחת ממסדר הפינוי, ובכך האלונקה השנייה קופצת להיות זו שתושמד בסט הבא - יש תזוזה בטור כולם צועדים צעד.",
        student: "מחיקת האיבר הראשון במערך (אינדקס 0). היא גורמת לשינוי עצום בלוגיקה הפנימית כיוון שכל אלפי האיברים הנותרים יאלצו להקטין את האינדקס הנוכחי שלהם באחד לצורך סגירת החור.",
        junior: "בפעמים הראשונות שחקתי עם Pop. כשביקשו שאמחק מהתחלה ניסיתי לשבור כלים - Shift עזר לי לשלוף את הראשון בעלות שאני מבין שלקחה מהחומרה פלישת חפיפה אלימה טיפה לרוחב המערך.",
        professor: "Heavy O(N) array mutation resolving extraction of the zero-index item exclusively, structurally enforcing memory compaction necessitating offset decrements against all proceeding packed sequences."
      },
      illustration:
        "👈 shift — שליפה מההתחלה (אינדקס 0):\n\n" +
        "         (shift 🔥) \n" +
        "           ↓\n" +
        "      [ 📦 A, 📦 B, 📦 C ] \n" +
        "           [ 📦 B, 📦 C ]",
      codeExample: "const train = ['Locomotive', 'Car1', 'Car2'];\nconst head = train.shift();\n\nconsole.log(head); // 'Locomotive'\nconsole.log(train); // ['Car1', 'Car2']",
      codeExplanation: "בניגוד למירוץ לזנב, Shift מעיפה את האיבר שמאינדקס האפס. זה נח לביצוע פקודות פינוי שבהן זה שהיה הכי וותיק מתפנה עתה לתפקיד."
    },

    // 25. unshift
    {
      conceptName: "unshift",
      conceptTopic: "מתודות מערך",
      levels: {
        grandma: "להכניס מישהו חשוב מאוד לתחילת התור כי הוא פנסיונר מיוחד. כולם זזים אחורה בצעצוע כי הוא נידחף לראשונה בכבוד.",
        child: "ראש המסיבה! ילד חדש מגיע ואומר 'אני ראשון!' אז כולם בטור שזעופים אבל צריכים לזוז אחד אחורה כדי לפנות לו מקום בדיוק בקדמת הכיתה.",
        soldier: "קצין נדחף לארוחת צהריים! משתבץ בכוח בעמדה אפס, וכל פלוגת החיילים הרעבה נהדפת מקום וירטואלי למטה במורד ההמתנה.",
        student: "הזנה מוטנטית אל הראש: דחיקת פריט חדש לאינדקס ה-0 שדרוגה הקפצה של כל האיברים הקיימים במיקום אחד ימינה (+1) כדי לפנות חלל.",
        junior: "התבלבלתי המון בין Shift ל-Unshift כי השם הפוך להיגיון. אז חרטתי במוח ש'Unshift' זה מילה ארוכה יותר - לכן היא 'מוסיפה' תוכן. ולחתוך דברים זה כואב כי זה בא משורש 'Push' הפוך.",
        professor: "An inverse push executing high-friction O(N) mutation pre-pending explicit targets into the 0th referential position requiring extensive memory recalculations ascending forward."
      },
      illustration:
        "👉 unshift — הוספה וי.איי.פי מההתחלה:\n\n" +
        "              (unshift 'VIP' 🌟) \n" +
        "                 ↓\n" +
        "              [ 👤 A, 👤 B ] \n" +
        "         [ 🌟 VIP, 👤 A, 👤 B ]",
      codeExample: "const list = ['Two', 'Three'];\nlist.unshift('One'); \n\nconsole.log(list); // ['One', 'Two', 'Three']",
      codeExplanation: "פקודה קלה שמכריחה מערך לשנות את מבנה כל אינדיבידואל בה אקוטית כדי לספק דרך המלך (אינדקס אפס) לישות החדשה עתה."
    },

    // 26. sort
    {
      conceptName: "sort",
      conceptTopic: "מתודות מערך",
      levels: {
        grandma: "לספק מילון ארוך. למיין את הספרים בארון בסדר הא'-ב'. ככה כשיבקשו ממצת את הספר 'גנן', את יודעת בדיוק לפנות למדף השלישי שם נמצאים הגימלים.",
        child: "משחק גובה של המפקדת! לכולם למדים שהאחד הכי קטן ראשון בסדרה, והילד הכי גבוה עומד אחרון! צריך פשוט לדחוף אחד את השני עד שכולם מסתדרים נכון.",
        soldier: "מסדר הקומבו הרשמי. עריכת דירוג של המחלקה מטוראי ועד קצינים בכדי לאפטם הליכונים לטקס סיום הקורס.",
        student: "השתמשות בהמרת String Lexicographical מיולדת על ידי קריאת sort() שרירותית של המערך שמשנה אותו בלוע ומוחקת את סדרו הקודם לאלתר. ניתנת לשינוי בעזרת Callback נבון כגורם למיון חישובי.",
        junior: "עשיתי `[1, 10, 2].sort()` וראיתי את '10' יורד לפני ה-'2'! מירטתי את השיער. הסתבר שהמערכת זורקת את זה 'מילולית' באותיות. הייתי חייב להדריך אותה מתמטית עם פונקציית `(a, b) => a - b` וזה ישב בול פתאום.",
        professor: "An unstable V8 iteration defaulting into converting array fragments temporarily into binary UTF-16 character structures causing numeric anomaly, overcome cleanly bypassing parsing overriding logic comparator natively."
      },
      illustration:
        "📊 sort — סידור רצפים עוקבים:\n\n" +
        "   [ 20, 100, 3 ].sort()  -> ❌ ככה [100, 20, 3]\n\n" +
        "   אבל בעזרת עזר לוגי אמתי:\n" +
        "   [ 20, 100, 3 ].sort((a,b)=> a-b)\n" +
        "     [ 3, 20, 100 ] ✅",
      codeExample: "const scores = [40, 1, 5, 200];\n// אנו עוקפים מיון טקסט מסוכן בעזרת הפרשת נתון החיסוי\nscores.sort((a, b) => a - b);\nconsole.log(scores); // [1, 5, 40, 200]",
      codeExplanation: "פונקציית מובנית ה'מסדרת' מערכים אך דורשת קוד פנימי מודרך (Callback) אם אין אנו למיין אותיות גרידא אלא תצורות על תמצית מספרית אמיתית של משקל."
    },

    // 27. splice
    {
      conceptName: "splice",
      conceptTopic: "מתודות מערך",
      levels: {
        grandma: "להוציא כפתור ספציפי מהמעיל בדיוק מהאמצע ולתפור חדש באותו מקום במקום החור שנשאר.",
        child: "מחכה לתור. נינג'ה קופץ מהתקרה בדיוק למרכז השורה, מרחיק את הילד שהיה שם מרוב פחד ונכנס קשוח במקומו!",
        soldier: "ניתוח כירורגי. הוצאת רכיב חבלה ממכונית בלי לפרק לה את החזית, פשוט מוציאים שן סוררת בדיוק מהאזור הספציפי שמהווה סכנה בטופס הציוד.",
        student: "סכין המנתחים (Mutating) של עולם המערכים. יכולה להסיר רכיבים בטבע וליבתו, או להזריק מהנדסים מבלי לפתוח חדש. משתמשים באינדקס התחלה, וכמות איברים לקיצוץ מנחה.",
        junior: "בכל פעם שרצינו למחוק פריט מהאמצע - הייתי נואש. כשלמדתי `splice(index, 1)` הבנתי שיש לי תחת היד חרב שיודעת 'לחתוך ולעיף לאוויר' בדיוק בחלקים המסובכים באמצע השטח הצר בלי בעיה.",
        professor: "The ultimate mutable array extraction procedure enabling explicit arbitrary modification points triggering shifting and reallocation natively directly via the memory address pointers."
      },
      illustration:
        "✂️ splice — סכין ניתוח למחיקה / הזרקה במקום ספציפי:\n\n" +
        "   arr = [ 'A', 'B', 'C' ]\n\n" +
        "       מחק רק את B!\n" +
        "   arr.splice(1, 1)\n" +
        "     (מתחיל מאינדקס 1, מוחק בדיוק איבר 1)\n" +
        "   \n" +
        "   נותרנו עם: [ 'A', 'C' ]",
      codeExample: "const fruits = ['Apple', 'Banana', 'Cherry'];\n// להתחיל באינדקס 1, למחוק 1 עותק, ולשים במקומו Kiwi!\nfruits.splice(1, 1, 'Kiwi');\nconsole.log(fruits); // ['Apple', 'Kiwi', 'Cherry']",
      codeExplanation: "מתודת העל הסכינאית. היא מעבדת קריאות מסובכות לחסרים ולשתילת שתלים מלאכותיים לחלק הנסער שנוצר ללא בנייה תחילית של Copy."
    },

    // 28. toString
    {
      conceptName: "toString",
      conceptTopic: "מתודות מערך",
      levels: {
        grandma: "להקריא רשימה שלמה מתוך פתק אבל כולו ברצף אחד כמו תפילה ארוכה, ללא עצירות וללא מחיצות בין הדפים או ההפרדות.",
        child: "קח את כל הצבעים מקופסת הטושים שיש לה קו ישר מופרד וצייר ארוך כקו אחד המחובר בצבעים בלתי שבורים בנשימה אחת לקיר הלבן.",
        soldier: "מעבר מדיווחי מודיעין יחידניים לקול אחד שמשדר משפט סנטטי ומלא. מסד הנתונים מושקר להיות ציטוט מגשר שלם שלא זקוק כל איבזור נפרד בקשר.",
        student: "המרה של מערך (Array Array Object) למחרוזת שטוחה ורציפה (String). היא לוקחת איברים, מדביקה אותם אחד לשני כשסימן פסיק (`,`) מפריל בניהם ומחזירה בינארי אחד.",
        junior: "רציתי להציג מערך בתוך הודעת Alert ולא הבנתי למה אני מקבל במקרים מסויימים Object Object מלוכלך בטקסט... רק הכנסתי לפקודת `.toString()` וקיבלתי את 'Milk,Bread,Eggs' מבוסמות בלי טרחות למשתמש בסיום.",
        professor: "Overrides the raw implicit object inheritance mapping triggering flattening array prototypes inherently appending commas producing valid single DOM-printable lexical texts rapidly."
      },
      illustration:
        "🖨️ toString() — המרה פשוטה מתבנית קשוחה למלל:\n\n" +
        "   מה שמחשב רואה : [ 'Red', 'Blue', 'Green' ]\n" +
        "          ↓    (הפעלה!)    ↓\n" +
        "   מה שאנחנו נראה: 'Red,Blue,Green'",
      codeExample: "const arrayColors = ['Pink', 'White'];\nconst str = arrayColors.toString();\n\nconsole.log(str); // הפך למשפט דבוק: 'Pink,White'\nconsole.log(typeof str); // 'string'",
      codeExplanation: "מועיל ביותר כשנרצה למוסס הקשות מבנית ולעשות שילב קל לצורך תצוגות גרפיות נחמדות ללא הבעת עציץ מחרוזות מערכתי של אובייקטאליה."
    }
  ],
  quiz: [
    {
      question: "איך ניגשים לאיבר השני במערך ב-JavaScript?",
      options: [
        "על ידי arr[1] כי האינדקס מתחיל תמיד מאפס",
        "על ידי arr[2] באופן ישיר לפי הלוגיקה והספירה הרגילה",
        "רק על ידי שימוש בפונקציית find שחותכת את הספירה",
        "אי אפשר, זה חסום על ידי scope"
      ],
      correct: 0,
      explanation:
        "הספירה (Index) מתחילה ב-0. לכן, הפריט הראשון נח ב-0, והשני שוכן באינדקס 1."
    },
    {
      question: "מה קורה כאשר מעתיקים מערך (Array) למשתנה חדש על ידי פעולת הקצאה פשוטה (Assignment) רגילה?",
      options: [
        "דריסה אפשרית. נוצר באמת מצביע (Pointer - Reference) לאותו מערך פיזי קיים בזיכרון, זה לא יוצר שום שכפול עמוק.",
        "המכונה סוגרת מנוע, זה יוצר העתק אטום (By Value) ואין חשש לשום קשר ביניהם לעולם מעתה ולהמשך",
        "קריסה במערכת משום שאי אפשר להעתיק עצמים או מערכים בשפה",
        "המערך הופך לסוג Data מוצפן מאובטח בגלל שהוא נוצר לא רחוק מ-Global Scope עתיק"
      ],
      correct: 0,
      explanation:
        "ב-JavaScript סוגי נתונים מורכבים תמיד פועלים By Reference. כלומר, לא יצרנו העתק, רק הפנינו את החץ לאותו מרכז מושגי בזיכרון."
    },
    {
      question: "מי מתוך הרשימה היא טיפוס בסיסי המועתק לחלוטין (By Value)?",
      options: [
        "String, Number, Boolean",
        "רק Functions",
        "Objects, Arrays",
        "כל הרשימה מועתקת עמוקות תמיד בראש המגרש ללא הבחנה"
      ],
      correct: 0,
      explanation:
        "טיפוסי Primitive (כמו מספר משמיע, מחרוזת מזהה וכן ערכי יסוד נוספים) הם פשוטים ולכן מועתקים בבטחה לחלוטין למימד זיכרון חדש בלי לחולל סיבוכי ירושה."
    },
    {
      question: "מהי פעולת filter ומה הייחוד שלה?",
      options: [
        "מוציאה רק איברים ממאגר קיים שמצאו תחת עילת האמת שבתוכה True, ומייצרת מערך חדש במלואו כדלהלן",
        "עושה סינון מקומי שמוחק אקוטית תאים במערך הקיים כדי לחסוך קשר קבוע של המחשב",
        "מחזירה רק משתנה יחיד אחד ומשמידה את המשך הריצה בעת גילוי פרימיטיבי",
        "לוכדת את האובייקט והופכת אותו ל-String דבוק ללא יכולת חזרה אחורנית אל מבנה הנתונים"
      ],
      correct: 0,
      explanation:
        "היא טובה בלסנן על פי דרישה (תנאי ה-Callback) ולהחזיר Array טרי לחלוטין עוקב כוח שמכיל אך ורק את התוצרים שצלחו קוד."
    },
    {
      question: "מהו התחליף המודרני, הקצר ונטול ה-This לפונקציות מסורתיות ב-ES6?",
      options: [
        "Arrow Function ( () => {} )",
        "הפונקציה המאובטחת Safe Function (()!)",
        "forEach",
        "המילה var שחזרה לשימוש קדמוני קצר יותר מאשר Let"
      ],
      correct: 0,
      explanation:
        "פונקציית החץ מקצרת במאות אחוזים תוכן עתיק, ויש לה תכונת על המאפשרת לא לשכתב את בעל הסביבה המקרבת אותה (Context)."
    },
    {
      question: "מה הסכנה העיקרית בהגדרת המשתנה עם המילה הישנה, var?",
      options: [
        "חוסר שימור Scope בתוך בלוקים - ה-var מאפשר זליגות, דריסה בטעות, ושגיאות המון (Hoisting) מאכזבות",
        "תופס טון נפח עמום על חריצים תאורטים מהזיכרון השוטף שמכבים עליו באזז הדיסק הקשיח בקריסה",
        "זורק אזהרות צורמות ובלתי ניתנות לעקיפה באדום לתוך הקונסול הלבן בכל קובץ שרץ",
        "הוא מוחלף לבד ל--Null אחרי שעתיים של ריצת קוד שבור ושוקל יותר במנוע"
      ],
      correct: 0,
      explanation:
        "var איבד את זוהרו כי אינו נשמר בחומות של Block Scope ({ }). לכן, במכרמים עמוקים, אם שינית var בתוך לולאה בודדת הוא בקלות דורס אליו את מה שהיה למעלה בלי להרגיש."
    },
    {
      question: "מה ההבדל בין שימושים במתודת pop לעומת shift?",
      options: [
        "Pop שולף מהקצה האחרון במערך, בעוד המילה shift גורסת סופית דווקא מהאיבר האפס מוקדם בתחילתו ההיסטורית",
        "הם פעולות זהות ושונות מגיעות ממחסור בשמות בתולדות השפה התיקנית",
        "Shift מיועד למספרים נטו ו-pop אחראי בממשק מילים בלבד",
        "Pop זה השמדה ואילו shift מצביע לכך שיש לייצר איבר פנימי מחדש לחלוטין בהכרזה שלו"
      ],
      correct: 0,
      explanation:
        "שתיהן פועלות למיגור משלחתי והשמדת תאים קצוות: pop לעומק הזנב הפורט בעוד Shift נכנס לבסיס הראש (אינדקס 0)."
    },
    {
      question: "אם הייתי רוצה להדפיס שם לכל אלמנט בלולאה – ללא החזרת רשומות חדש – במה כדאי לבחור ביעילות?",
      options: [
        "forEach",
        "map",
        "find",
        "reduce"
      ],
      correct: 0,
      explanation:
        "forEach מבצעת רצף פעולות לרוחב המכלול אך בטוחה כי תחזיר undefined מוחלט בסיום. map למשל, תחזיר מערך חישובי ואין בו סיבה אם רצינו אך ורק לערוך 'הצגה' יבשה."
    },
    {
      question: "מה עושה אופרטור ה-Spread (...) ואיזה כינוי יש לו?",
      options: [
        "הוא פורש/שופך אובייקטים ומערכים מרוכבים חזרה לצורת יום הולדת כדי שנוכל לאטוף אותם בסוגר חדש עמוק שחסר פוינטר (Deep copy מתחכם).",
        "מגן על השורות שמכילות סכנה בכך שהוא מגדר את הקוד על פי זמן",
        "מוחק את האיבר האקראי מהמקום הנוכחי בעת ריצה מודרנית",
        "גורם לפעולת צמצום הפוכה בה אנחנו אורזים נתונים אבודים פנימה ברגרסיה (כמו reduce)"
      ],
      correct: 0,
      explanation:
        "תפקידו לפזר את הוכלי הפריטים למלל רחב. מצוין להזרקו למערך חדש נקי, ובכך להשיג אפקט של העתק בלי סיכון של מצבים הקשורים ל-By Reference דורסנית."
    },
    {
      question: "כאשר קוראים לפונקציה שלא התבקשה או התעמתו שאין לה Return ממשי, מה היא תחזיר כפלט אחרון אוטומטי במשאבים שלה?",
      options: [
        "undefined",
        "קריסת רשת באזור שמציג למשתמש על כישלון קוד מריץ עשיר",
        "אפס לוגי מתמטי (0) בסיסי ללא שינוי",
        "את מה ששלחנו כמובן פרמטר אחרון בחזרה כמו מראה הפוכה"
      ],
      correct: 0,
      explanation:
        "השפה דוגלת בלא להקריס הכל - אם מתכנת 'שכח' לכתוב return במכונה החישובית שלו, היא עדיין מנווטת חזרה, אבל פותחת שחר נקי דרך הטיפוס undefined."
    }
  ]
};
