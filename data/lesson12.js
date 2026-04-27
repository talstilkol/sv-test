// data/lesson12.js — שיעור 12: תרגול מתודות מערך
var LESSON_12 = {
  id: "lesson_12",
  title: "שיעור 12 - תרגול מתודות מערך",
  description:
    "צלילה לעומק מתודות המערך החזקות ביותר ב-JavaScript: map, forEach, filter ו-spread. נלמד לשנות, לסנן וליצור מערכים חדשים בצורה אלגנטית תוך שליטה מלאה באינדקסים, ערכים ותנאים.",
  concepts: [
    //  ─── 1. map ───────────────────────────────────────────────
    {
      conceptName: "map",
      difficulty: 4,
      levels: {
        grandma:
          "map זה כמו לקחת מגש ביצים ולהפוך כל ביצה לביצת עין. המגש המקורי לא נפגע — מקבלים מגש חדש עם התוצאות. כל ביצה עוברת את אותו הטיפול בדיוק.",
        child:
          "דמיינו מכונת צביעה: מכניסים שקית כדורים לבנים, והמכונה צובעת כל כדור באדום ויורקת אותם לשקית חדשה. השקית הישנה נשארת עם כדורים לבנים.",
        soldier:
          "map זה כמו להעביר כל חייל בשורה דרך תחנת ציוד — כל אחד נכנס ללא קסדה ויוצא עם קסדה. השורה המקורית לא נפגעת, מתקבלת שורה חדשה מצוידת.",
        student:
          "map היא Higher-Order Function המקבלת callback ומחזירה מערך חדש באותו אורך, כאשר כל איבר הוא תוצאת הפעלת ה-callback על האיבר המקורי. אין mutation למערך המקור.",
        junior:
          "השתמשתי ב-map כדי להוסיף שדה fullName לכל אובייקט משתמש, ושכחתי לעשות return בתוך ה-callback — קיבלתי מערך של undefined ושברתי את הראש לחצי שעה.",
        professor:
          "map מממשת Functor — מיפוי שמשמר מבנה. X → Y על כל a ∈ Array. הקצאת זיכרון חדשה ב-Heap בגודל n, ללא side effects. מורכבות O(n) עם קריאה אחת של callback לכל איבר.",
      },
      illustration:
        "🔄 map — טרנספורמציה על כל איבר:\n" +
        "\n" +
        "  מערך מקורי:   [ 🥚  🥚  🥚 ]\n" +
        "                  │   │   │\n" +
        "       map(🍳)   ▼   ▼   ▼\n" +
        "                  │   │   │\n" +
        "  מערך חדש:      [ 🍳  🍳  🍳 ]\n" +
        "\n" +
        "  ✅ מקורי נשאר שלם    ✅ מערך חדש באותו אורך",
      codeExample:
        "const prices = [10, 20, 30];\nconst withTax = prices.map(price => price * 1.17);\nconsole.log(withTax); // [11.7, 23.4, 35.1]\nconsole.log(prices);  // [10, 20, 30] — לא השתנה",
      codeExplanation:
        "map רצה על כל איבר במערך prices, מכפילה אותו ב-1.17, ומחזירה מערך חדש withTax. המערך המקורי לא נפגע — זו הנקודה החשובה ביותר.",
    },

    //  ─── 2. forEach ──────────────────────────────────────────
    {
      conceptName: "forEach",
      difficulty: 4,
      levels: {
        grandma:
          "forEach זה כמו לעבור על כל ילד בכיתה ולתת לו ממתק. אני לא בונה רשימה חדשה — אני פשוט עושה פעולה על כל אחד ויוצרנית מפה ריקה.",
        child:
          "forEach זה כמו לומר שלום לכל חבר בתור: 'שלום דני!', 'שלום מיכל!', 'שלום יוסי!'. לא בונים שום דבר חדש, רק עוברים ואומרים שלום.",
        soldier:
          "forEach זו סריקת שטח: עוברים על כל עמדה בגזרה ומדווחים עליה. אין מטרה ליצור רשימה — המטרה היא לבצע פעולה (דיווח, סריקה) על כל נקודה.",
        student:
          "forEach מקבלת callback ומריצה אותו על כל איבר, אך בניגוד ל-map לא מחזירה ערך (undefined). משמשת לביצוע side effects כמו הדפסה, עדכון DOM או שליחת לוגים.",
        junior:
          "ניסיתי לעשות const result = arr.forEach(...) וציפיתי למערך חדש. קיבלתי undefined. למדתי בדרך הקשה שכש-forEach לא מנסה להחזיר כלום, צריך map.",
        professor:
          "forEach היא אבסטרקציה אימפרטיבית — מילולית 'לכל אחד'. תעודכן ב-O(n) ללא אובליגציית Return Value. שימוש מובנה ל-side effects מסודרים (logging, DOM mutation) כ-void function.",
      },
      illustration:
        "👋 forEach — פעולה על כל אחד, בלי להחזיר:\n" +
        "\n" +
        "  [ 🧒  👧  👦 ]\n" +
        "    │    │    │\n" +
        "    ▼    ▼    ▼\n" +
        "   🍬   🍬   🍬   ← כל אחד מקבל ממתק\n" +
        "\n" +
        "  📦 מערך חדש? ❌ אין!\n" +
        "  📋 return?    ❌ undefined\n" +
        "  ✅ רק פעולה (side effect) על כל איבר",
      codeExample:
        'const names = ["Dana", "Avi", "Tal"];\nnames.forEach((name, index) => {\n  console.log(`${index + 1}. ${name}`);\n});\n// 1. Dana\n// 2. Avi\n// 3. Tal',
      codeExplanation:
        "forEach עוברת על כל איבר במערך names ומדפיסה את האינדקס והשם. שימו לב שהיא לא מחזירה כלום — היא רק מבצעת פעולה (console.log) על כל איבר.",
    },

    //  ─── 3. filter ───────────────────────────────────────────
    {
      conceptName: "filter",
      difficulty: 4,
      levels: {
        grandma:
          "filter זה כמו מסננת מטבח — שופכים את הפסטה עם המים, והמסננת עוצרת את הפסטה ומשחררת את המים. נשאר לנו רק מה שעובר את המבחן.",
        child:
          "דמיינו קופסת לגו צבעונית. filter זה כמו לשלוף החוצה רק את החלקים האדומים ולשים אותם בקופסה חדשה. הקופסה המקורית נשארת עם כל הצבעים.",
        soldier:
          "filter זה סינון מועמדים למיונים: כל מי שלא עובר את מבחן הכושר הגופני נפסל. רק מי שעבר את התנאי ממשיך הלאה לרשימה חדשה.",
        student:
          "filter מחזירה מערך חדש שמכיל רק איברים שעבורם ה-callback החזיר true. לא משנה את המערך המקורי. מורכבות O(n), מערך מוחזר בגודל ≤ n.",
        junior:
          "שכחתי ש-filter מחזיר מערך חדש ולא משנה את המקורי. כתבתי users.filter(u => u.active) בלי לשמור לתוך משתנה, ותהיתי למה המשתמשים המחוקים עדיין מופיעים במסך.",
        professor:
          "filter מממשת predicate-based subset extraction. ה-callback משמש כ-Boolean predicate — רק איברים שעבורם P(x)=true נכללים. מערך חדש מוקצה בהתאם למספר ההתאמות בפועל.",
      },
      illustration:
        "🔍 filter — משאיר רק מה שעובר את המבחן:\n" +
        "\n" +
        "  מקורי:  [ 🍎  🍌  🍎  🍇  🍎  🍌 ]\n" +
        "             ✅  ❌  ✅  ❌  ✅  ❌\n" +
        "                                      \n" +
        "  filter(🍎?)                          \n" +
        "             │       │       │         \n" +
        "             ▼       ▼       ▼         \n" +
        "  חדש:    [ 🍎      🍎      🍎 ]       \n" +
        "\n" +
        "  ✅ מערך חדש קצר יותר (או שווה)",
      codeExample:
        "const scores = [45, 82, 91, 33, 76, 58];\nconst passed = scores.filter(score => score >= 60);\nconsole.log(passed); // [82, 91, 76]",
      codeExplanation:
        "filter עוברת על כל ציון ובודקת אם הוא גדול או שווה ל-60. רק ציונים שעוברים את התנאי נכנסים למערך החדש passed. המערך המקורי scores לא השתנה.",
    },

    //  ─── 4. spread ───────────────────────────────────────────
    {
      conceptName: "spread",
      difficulty: 4,
      levels: {
        grandma:
          "spread (...) זה כמו לפתוח ארנק ולשפוך את כל המטבעות על השולחן. במקום לתת את הארנק כולו, שופכים את התוכן החוצה כדי לסדר מחדש.",
        child:
          "spread זה כמו לקחת ערימת קלפים ולפרוש אותם אחד ליד השני על הרצפה. עכשיו אפשר לבחור קלפים מכאן ומשם וליצור ערימה חדשה.",
        soldier:
          "spread זו פריסת כוחות — לוקחים את כל הלוחמים מהפלוגה ופורשים אותם חוצה. אפשר לצרף לוחמים מפלוגה אחרת, לשנות סדר — הפלוגה המקורית נשארת שלמה.",
        student:
          "אופרטור Spread (...) פורש iterable לרכיביו הבודדים. שימושים עיקריים: שכפול מערכים/אובייקטים (shallow copy), מיזוג מערכים, והעברת ארגומנטים לפונקציה.",
        junior:
          "חשבתי שעשיתי שכפול עמוק עם spread ואז שיניתי אובייקט מקונן בתוך העותק — והוא השתנה גם במקור. למדתי בדרך הכואבת ש-spread עושה רק shallow copy.",
        professor:
          "Spread syntax מבצע iteration protocol על האיטרבל ומקצה shallow copy ברמה הראשונה בלבד. עבור nested references, ה-pointer לאובייקט הפנימי משוכפל (aliasing). לשכפול עמוק יש צורך ב-structuredClone או JSON round-trip.",
      },
      illustration:
        "💥 spread (...) — פורש ומאחד:\n" +
        "\n" +
        "  arr1 = [🐱, 🐶]    arr2 = [🐸, 🐰]\n" +
        "           ...              ...\n" +
        "           │ │              │ │\n" +
        "           ▼ ▼              ▼ ▼\n" +
        "  merged = [🐱, 🐶,        🐸, 🐰]\n" +
        "\n" +
        "  📋 שכפול:  copy = [...arr1]\n" +
        "  arr1 ──┐\n" +
        "         ├→ [🐱, 🐶]  (מקור)\n" +
        "  copy ──┘→ [🐱, 🐶]  (עותק נפרד בזיכרון)",
      codeExample:
        "const arr1 = [1, 2, 3];\nconst arr2 = [4, 5, 6];\nconst merged = [...arr1, ...arr2];\nconsole.log(merged); // [1, 2, 3, 4, 5, 6]\n\nconst copy = [...arr1];\ncopy.push(99);\nconsole.log(arr1); // [1, 2, 3] — לא נפגע",
      codeExplanation:
        "spread פורש את שני המערכים לתוך מערך חדש merged. בנוסף, יצרנו עותק מנותק copy — שינויים ב-copy לא משפיעים על arr1 כי הם מערכים נפרדים בזיכרון.",
    },

    //  ─── 5. uppercase ────────────────────────────────────────
    {
      conceptName: "uppercase",
      difficulty: 3,
      levels: {
        grandma:
          "uppercase זה כמו לכתוב מכתב רשמי — במקום 'שלום', כותבים 'שלום' באותיות גדולות וחזקות. באנגלית: 'hello' הופך ל-'HELLO'.",
        child:
          "uppercase זה כמו לצעוק! כשכותבים באותיות רגילות זה 'hello', אבל כשמפעילים uppercase זה כמו לצעוק 'HELLO!!!' — הכל גדול וחזק.",
        soldier:
          "uppercase כמו לכתוב פקודה במכשיר הקשר — הכל חייב להיות באותיות גדולות כדי שהמסר יהיה ברור וחד-משמעי בשטח: 'MOVE TO ALPHA POINT'.",
        student:
          "String.prototype.toUpperCase() מחזירה מחרוזת חדשה שבה כל התווים מומרים ל-uppercase לפי Unicode mapping. המחרוזת המקורית אינה משתנה (strings are immutable).",
        junior:
          "השוויתי קלט משתמש לערך קבוע בלי לנרמל קודם — 'Hello' !== 'hello'. הפתרון: להמיר את שניהם ל-toUpperCase() לפני ההשוואה.",
        professor:
          "toUpperCase() פועלת לפי Unicode Case Mapping. שים לב ש-locale-specific transformations (כגון טורקית 'i' → 'İ') דורשות toLocaleUpperCase(). הפעולה O(n) על אורך המחרוזת.",
      },
      illustration:
        "🔠 toUpperCase() — הגדלת אותיות:\n" +
        "\n" +
        '  "hello"                        \n' +
        "    │                            \n" +
        "    ▼  .toUpperCase()            \n" +
        "    │                            \n" +
        '  "HELLO"   ← מחרוזת חדשה!      \n' +
        "                                 \n" +
        "  🔡 h ──→ H                     \n" +
        "  🔡 e ──→ E                     \n" +
        "  🔡 l ──→ L                     \n" +
        "  🔡 l ──→ L                     \n" +
        "  🔡 o ──→ O                     \n" +
        "\n" +
        "  ⚠️ המקור לא משתנה! (immutable)",
      codeExample:
        'const name = "tal cohen";\nconst upper = name.toUpperCase();\nconsole.log(upper); // "TAL COHEN"\nconsole.log(name);  // "tal cohen" — מחרוזת מקורית לא השתנתה',
      codeExplanation:
        "toUpperCase() לא משנה את המחרוזת המקורית — היא מחזירה מחרוזת חדשה לגמרי. מחרוזות ב-JavaScript הן immutable, לכן כל שינוי יוצר ערך חדש.",
    },

    //  ─── 6. lowercase ────────────────────────────────────────
    {
      conceptName: "lowercase",
      difficulty: 3,
      levels: {
        grandma:
          "lowercase זה כמו להנמיך קול — במקום לצעוק, מדברים בשקט ורגוע. 'HELLO' הופך ל-'hello'. אותו תוכן, רק שקט יותר.",
        child:
          "lowercase זה כמו ללחוש. במקום אותיות ענקיות שצועקות, כל האותיות קטנות ושקטות: 'HELLO' הופך ל-'hello'. הלחישה של המחשב.",
        soldier:
          "lowercase זה כמו לרשום בפנקס אישי — לא צריך פקודות רשמיות, רושמים הכל באותיות קטנות ופשוטות לשימוש יומיומי.",
        student:
          "String.prototype.toLowerCase() מחזירה מחרוזת חדשה עם כל התווים מומרים ל-lowercase. שימוש נפוץ: נרמול קלט משתמש להשוואות case-insensitive.",
        junior:
          "חיפוש באתר לא עבד כי המשתמש הקליד 'JavaScript' והמערך שלי הכיל 'javascript'. הפתרון: toLowerCase() על שני הצדדים לפני ההשוואה.",
        professor:
          "toLowerCase() מבצעת Unicode Case Folding. חלק מהתווים (כמו ß הגרמנית) אינם reversible — toLowerCase().toUpperCase() לא תמיד === toUpperCase(). שקול שימוש ב-localeCompare לצורך Collation.",
      },
      illustration:
        "🔡 toLowerCase() — הקטנת אותיות:\n" +
        "\n" +
        '  "HELLO"                        \n' +
        "    │                            \n" +
        "    ▼  .toLowerCase()            \n" +
        "    │                            \n" +
        '  "hello"   ← מחרוזת חדשה!      \n' +
        "                                 \n" +
        "  🔎 השוואה case-insensitive:    \n" +
        '  "React"  →  "react"            \n' +
        '  "REACT"  →  "react"  ← שווים! ✅\n' +
        '  "react"  →  "react"            ',
      codeExample:
        'const input = "JavaScript";\nconst normalized = input.toLowerCase();\nconsole.log(normalized); // "javascript"\n\n// שימוש נפוץ: השוואה case-insensitive\nconst search = "REACT";\nconst items = ["React", "Vue", "Angular"];\nconst found = items.filter(item => item.toLowerCase().includes(search.toLowerCase()));\nconsole.log(found); // ["React"]',
      codeExplanation:
        "נרמול ל-lowercase מאפשר השוואה אחידה — לא משנה אם המשתמש הקליד באותיות גדולות או קטנות, הסינון יעבוד תמיד.",
    },

    //  ─── 7. index ────────────────────────────────────────────
    {
      conceptName: "index",
      difficulty: 2,
      levels: {
        grandma:
          "index זה מספר המקום בתור. הראשון בתור הוא מספר 0, השני הוא 1, השלישי הוא 2. כמו מספרי תור בדואר — רק שמתחילים מאפס.",
        child:
          "index זה כמו מספרי הבתים ברחוב. הבית הראשון הוא מספר 0 (כן, אפס!), השני הוא 1, השלישי הוא 2. ככה המחשב יודע לאיזה בית ללכת.",
        soldier:
          "index זה מספר עמדה בשורת לוחמים. עמדה 0 — הלוחם הראשון בקצה שמאל. כשהמפקד אומר 'עמדה 3' — כולם יודעים בדיוק למי הכוונה.",
        student:
          "אינדקס הוא zero-based integer המייצג מיקום של איבר בתוך מבנה נתונים סדרתי. ב-JavaScript, ניגשים לאיבר דרך arr[index]. ערך האינדקס האחרון הוא arr.length - 1.",
        junior:
          "קיבלתי 'undefined' כשניסיתי לגשת ל-arr[arr.length] — שכחתי שהאינדקס מתחיל מ-0 ולכן האיבר האחרון הוא arr[arr.length - 1]. שגיאת Off-by-one קלאסית.",
        professor:
          "באופן פנימי, אינדקסים במערכי JS הם property keys מסוג string (המומרים מ-integer). V8 מקצה dense arrays כ-contiguous memory blocks עם O(1) random access, אך sparse arrays נופלים ל-hash-map lookup.",
      },
      illustration:
        "📍 index — מספר המקום (מתחיל מ-0!):\n" +
        "\n" +
        "  אינדקס:   0       1       2       3\n" +
        "          ┌─────┬─────┬─────┬─────┐\n" +
        "          │ 🍎  │ 🍌  │ 🍊  │ 🍇  │\n" +
        "          └─────┴─────┴─────┴─────┘\n" +
        "\n" +
        "  arr[0]  → 🍎  (ראשון)\n" +
        "  arr[3]  → 🍇  (אחרון)\n" +
        "  arr[4]  → ❓ undefined!\n" +
        "\n" +
        "  ⚠️ האיבר האחרון = arr[length - 1]",
      codeExample:
        'const fruits = ["תפוח", "בננה", "תפוז"];\nconsole.log(fruits[0]); // "תפוח"\nconsole.log(fruits[2]); // "תפוז"\nconsole.log(fruits[fruits.length - 1]); // "תפוז" — האיבר האחרון\nconsole.log(fruits[5]); // undefined — אינדקס לא קיים',
      codeExplanation:
        'אינדקס 0 מחזיר את האיבר הראשון ("תפוח"). כדי לגשת לאיבר האחרון משתמשים ב-length - 1. גישה לאינדקס שלא קיים מחזירה undefined — בלי שגיאה.',
    },

    //  ─── 8. array ────────────────────────────────────────────
    {
      conceptName: "array",
      difficulty: 2,
      levels: {
        grandma:
          "מערך זה כמו מדף בארון עם תאים ממוספרים. בכל תא אפשר לשים דבר אחר — מספר, מילה, אפילו רשימה נוספת. והכי חשוב: הסדר נשמר!",
        child:
          "מערך זה כמו רכבת עם קרונות. כל קרון מחזיק משהו אחר — בובה, כדור, חללית. אנחנו יודעים בדיוק מה בכל קרון לפי המספר שלו.",
        soldier:
          "מערך זה כמו שורת ארגזי תחמושת ממוספרים. כל ארגז מסומן, והיתרון הוא שאפשר לגשת ישר לארגז מספר 5 בלי לפתוח את כל הקודמים.",
        student:
          'Array הוא מבנה נתונים סדרתי ב-JavaScript. מכיל אוסף של ערכים בסדר מוגדר, ניתן לגישה ע"י אינדקס. מערכים הם אובייקטים עם Array.prototype ו-length property אוטומטי.',
        junior:
          "שכחתי שמערכים ב-JS מועברים by reference — העברתי מערך לפונקציה, היא עשתה push, ופתאום המערך המקורי גם קיבל את הערך החדש. תמיד spread לפני העברה!",
        professor:
          "מערכים ב-V8 מיוצגים כ-JSArray — אובייקט עם ElementsKind שמזהה את הטיפוס הפנימי (PACKED_SMI, PACKED_DOUBLE, PACKED_ELEMENTS). מעבר בין סוגים הוא one-way degradation שמשפיע על ביצועים.",
      },
      illustration:
        "📦 Array — מבנה נתונים סדרתי:\n" +
        "\n" +
        "  🚂═══🚃═══🚃═══🚃═══🚃\n" +
        "   0    1    2    3    4\n" +
        "  ┌────┬────┬────┬────┬────┐\n" +
        "  │ 42 │'hi'│true│ [] │null│\n" +
        "  └────┴────┴────┴────┴────┘\n" +
        "\n" +
        "  ✅ סדר נשמר\n" +
        "  ✅ כל סוג ערך\n" +
        "  ✅ length אוטומטי\n" +
        "  ⚠️ מועבר by reference!",
      codeExample:
        'const mixed = [42, "hello", true, [1, 2]];\nconsole.log(mixed.length); // 4\nconsole.log(mixed[3]);     // [1, 2]\nconsole.log(mixed[3][0]);  // 1 — גישה למערך מקונן',
      codeExplanation:
        "מערכים ב-JavaScript יכולים להכיל ערכים מכל סוג — מספרים, מחרוזות, בוליאנים, ואפילו מערכים אחרים. length נותן את מספר האיברים, וגישה למערך מקונן מתבצעת בשרשור סוגריים.",
    },

    //  ─── 9. new array (יצירת מערך חדש) ──────────────────────
    {
      conceptName: "יצירת מערך חדש (new array)",
      difficulty: 5,
      levels: {
        grandma:
          "ליצור מערך חדש זה כמו לקחת מגש חדש ונקי מהארון. אפשר להתחיל ריק ולמלא אותו, או לקחת דברים ממגשים אחרים ולסדר אותם על המגש החדש.",
        child:
          "יצירת מערך חדש זה כמו לפתוח קופסא חדשה ולהחליט מה לשים בה — אפשר להתחיל ריק, אפשר להעתיק מקופסאות אחרות, או ליצור תוכן חדש לגמרי.",
        soldier:
          "יצירת מערך חדש כמו להקים יחידה חדשה — אפשר להתחיל ריק ולגייס, אפשר להעביר לוחמים מיחידות קיימות (spread/concat), או לסנן מתוך גדוד (filter).",
        student:
          'מערך חדש נוצר ע"י ליטרל [], ע"י new Array(n), ע"י Array.from(), או כתוצאה של מתודות כמו map, filter, concat, slice. כל דרך מחזירה reference חדש בזיכרון.',
        junior:
          "השתמשתי ב-new Array(5) וחשבתי שקיבלתי מערך עם הערך 5. בפועל קיבלתי מערך ריק באורך 5. עדיף תמיד להשתמש בליטרל [] במקום new Array.",
        professor:
          "Array.from({ length: n }, (_, i) => i) הוא idiom נפוץ ליצירת sequence. ה-constructor Array(n) יוצר holey array עם length=n אך ללא איברים ממשיים — ElementsKind = HOLEY, שמוריד ביצועים.",
      },
      illustration:
        "🆕 דרכים ליצור מערך חדש:\n" +
        "\n" +
        "  1️⃣  []           → 📦 קופסה ריקה\n" +
        "  2️⃣  [1, 2, 3]    → 📦 קופסה מוכנה\n" +
        "  3️⃣  .map(fn)     → 📦 מקור → טרנספורמציה\n" +
        "  4️⃣  .filter(fn)  → 📦 מקור → סינון\n" +
        "  5️⃣  [...arr]     → 📦 שכפול\n" +
        "  6️⃣  .concat(b)   → 📦 מיזוג\n" +
        "\n" +
        "  ✅ כולן מחזירות reference חדש בזיכרון!",
      codeExample:
        "// דרכים ליצור מערך חדש:\nconst empty = [];                         // ליטרל ריק\nconst nums = [1, 2, 3];                   // ליטרל עם ערכים\nconst fromMap = nums.map(n => n * 10);    // [10, 20, 30]\nconst fromFilter = nums.filter(n => n > 1); // [2, 3]\nconst merged = [...nums, 4, 5];           // [1, 2, 3, 4, 5]",
      codeExplanation:
        "יש הרבה דרכים ליצור מערך חדש. הדרך הנפוצה ביותר היא ליטרל []. מתודות כמו map ו-filter תמיד מחזירות מערך חדש, וגם spread יוצר עותק חדש.",
    },

    //  ─── 10. סינון לפי תנאי ────────────────────────────────
    {
      conceptName: "סינון לפי תנאי",
      difficulty: 3,
      levels: {
        grandma:
          "סינון לפי תנאי זה כמו לעבור על ערימת בגדים ולהוציא רק את מה שמתאים לחורף. כל בגד נבדק — אם הוא חם, הוא נכנס לערימה החדשה; אם לא, הוא נשאר.",
        child:
          "דמיינו שיש קופסת סוכריות ואתם רוצים רק את האדומות. עוברים סוכריה סוכריה — אדומה? לקופסה חדשה! לא אדומה? נשארת בקופסה הישנה.",
        soldier:
          "סינון לפי תנאי כמו מחסום כניסה לבסיס — רק מי שיש לו תג תקף עובר. כל אחד נבדק, מי שעומד בתנאי ממשיך, מי שלא — נשאר בחוץ.",
        student:
          "סינון לפי תנאי הוא הבסיס של filter: מעבר על כל איבר, הפעלת predicate (ביטוי בוליאני), ושמירת האיברים שעבורם התנאי מחזיר true. ניתן לשרשר תנאים מורכבים עם && ו-||.",
        junior:
          "שרשרתי שלושה filter ברצף במקום לשלב את כל התנאים ל-callback אחד — שלוש אלוקציות מערך מיותרות ו-O(3n) במקום O(n). ביצועים הרבה יותר גרועים על data גדול.",
        professor:
          "Predicate composition באמצעות conjunction (&&) ו-disjunction (||) מאפשרת ביטוי של תנאי סינון מורכבים כ-first-class functions. ב-Functional Programming, compose(filter(p1), filter(p2)) שקולה ל-filter(x => p1(x) && p2(x)) — transducer fusion.",
      },
      illustration:
        "🚧 סינון לפי תנאי — מחסום:\n" +
        "\n" +
        "          תנאי: price < 100?\n" +
        "               🚧\n" +
        "  💰50  ──→ ✅ עובר!\n" +
        "  💰200 ──→ ❌ נחסם!\n" +
        "  💰30  ──→ ✅ עובר!\n" +
        "  💰150 ──→ ❌ נחסם!\n" +
        "               │\n" +
        "               ▼\n" +
        "         [ 💰50, 💰30 ]\n" +
        "\n" +
        "  🔗 שילוב תנאים: && (וגם) || (או)",
      codeExample:
        'const products = [\n  { name: "מחשב", price: 3500, inStock: true },\n  { name: "טלפון", price: 2800, inStock: false },\n  { name: "אוזניות", price: 150, inStock: true },\n  { name: "מסך", price: 1200, inStock: true }\n];\n\n// סינון: במלאי וגם מחיר מתחת ל-2000\nconst affordable = products.filter(p => p.inStock && p.price < 2000);\nconsole.log(affordable);\n// [{ name: "אוזניות", ... }, { name: "מסך", ... }]',
      codeExplanation:
        "filter עוברת על כל מוצר ובודקת שני תנאים במקביל: המוצר במלאי (inStock) וגם המחיר נמוך מ-2000. רק מוצרים שעוברים את שני התנאים נכנסים למערך החדש.",
    },

    //  ─── 11. יצירת מערך חדש (עם map) ───────────────────────
    {
      conceptName: "יצירת מערך חדש מתוך קיים",
      difficulty: 3,
      levels: {
        grandma:
          "זה כמו לקחת תמונות משפחתיות ולהכין מכל תמונה גרסה מוקטנת לאלבום. התמונות המקוריות נשארות — יצרנו סט חדש ששונה מהמקור.",
        child:
          "יש לכם ציורים של חיות. עכשיו לוקחים כל ציור ומוסיפים לו כובע — מקבלים אוסף חדש של חיות עם כובעים! האוסף המקורי בלי כובעים.",
        soldier:
          "לקחת רשימת חיילים ולייצר מכל אחד כרטיס זיהוי דיגיטלי — שם, דרגה, יחידה. רשימת החיילים נשארת, מתקבלת רשימת כרטיסים חדשה.",
        student:
          "map היא הדרך הקנונית ליצור מערך חדש מתוך קיים עם טרנספורמציה. כל איבר עובר דרך callback וערך ההחזרה נכנס לאותו אינדקס במערך החדש. שמירה על immutability.",
        junior:
          "הייתי צריך להוציא מכל אובייקט user רק את ה-name. במקום forEach + push, השתמשתי ב-map(u => u.name) — שורה אחת במקום ארבע, וקוד הרבה יותר נקי.",
        professor:
          "Projection operation — מיפוי מורפיזם f: A → B על כל רכיב. שקול ל-SELECT ב-SQL או fmap ב-Haskell. ייחודי בשמירת Cardinality (|output| = |input|) בניגוד ל-filter ש-|output| ≤ |input|.",
      },
      illustration:
        "🎨 יצירת מערך חדש מתוך קיים (map):\n" +
        "\n" +
        "  מקורי:     [{👤 Dana, 25},  {👤 Avi, 30}]\n" +
        "                  │                │\n" +
        "     map(u => u.name)              │\n" +
        "                  │                │\n" +
        "                  ▼                ▼\n" +
        '  חדש:      [   "Dana",        "Avi"   ]\n' +
        "\n" +
        "  📐 אותו אורך   ✅ מבנה שונה   ✅ מקור שלם",
      codeExample:
        'const users = [\n  { name: "דנה", age: 25 },\n  { name: "אבי", age: 30 },\n  { name: "מיכל", age: 22 }\n];\n\n// יצירת מערך חדש של שמות בלבד\nconst names = users.map(user => user.name);\nconsole.log(names); // ["דנה", "אבי", "מיכל"]\n\n// יצירת מערך חדש עם תבנית מחרוזת\nconst labels = users.map(u => `${u.name} (${u.age})`);\nconsole.log(labels); // ["דנה (25)", "אבי (30)", "מיכל (22)"]',
      codeExplanation:
        "map יוצרת מערך חדש: בפעם הראשונה שולפים רק את שדה name, ובפעם השנייה יוצרים מחרוזת מעוצבת מכל אובייקט. בשני המקרים — המערך המקורי users לא השתנה.",
    },

    //  ─── 12. עבודה עם ערכים לפי אינדקס ─────────────────────
    {
      conceptName: "עבודה עם ערכים לפי אינדקס",
      difficulty: 3,
      levels: {
        grandma:
          "לפעמים צריך להחליף את הכוס השבורה במדף — אנחנו יודעים שהיא במקום מספר 3, אז ניגשים ישר לשם, מוציאים את השבורה ושמים חדשה. בדיוק ככה עובדים עם אינדקס.",
        child:
          "דמיינו שיש לכם מגירות ממוספרות. רוצים להחליף את הצעצוע במגירה 2? פותחים מגירה 2, מוציאים את הישן, ומכניסים חדש. לא צריך לפתוח את כל המגירות.",
        soldier:
          "כמו להחליף לוחם פצוע בעמדה ספציפית — עמדה 4 נפגעה, מכניסים מחליף בדיוק לעמדה 4. שאר העמדות לא זזות.",
        student:
          "גישה ישירה לאיבר דרך arr[i] מאפשרת קריאה ועדכון. ניתן גם להשתמש ב-splice(i, 1, newValue) להחלפה, או findIndex למציאת אינדקס לפי תנאי. גישה ב-O(1).",
        junior:
          "רציתי לעדכן פריט ב-React state ושיניתי ישירות את arr[i] — הקומפוננטה לא רונדרה מחדש כי React לא זיהה שינוי ב-reference. הפתרון: map עם תנאי על האינדקס.",
        professor:
          "Random access ב-O(1) הוא היתרון המרכזי של מערכים על פני linked lists. ב-JS, עדכון ישיר arr[i]=v הוא mutation. immutable update pattern: arr.map((el, idx) => idx === i ? newVal : el) — O(n) אך מייצר reference חדש.",
      },
      illustration:
        "🎯 עבודה עם ערכים לפי אינדקס:\n" +
        "\n" +
        "  קריאה:    arr[2] → שולף את מה שבמקום 2\n" +
        "  ┌────┬────┬────┬────┐\n" +
        "  │ 🔴 │ 🟢 │ 🔵 │ 🟡 │\n" +
        "  └────┴────┴─▲──┴────┘\n" +
        "              │\n" +
        "           arr[2] = 🔵\n" +
        "\n" +
        "  עדכון:    arr[2] = 🟣\n" +
        "  ┌────┬────┬────┬────┐\n" +
        "  │ 🔴 │ 🟢 │ 🟣 │ 🟡 │  ← 🔵 הוחלף!\n" +
        "  └────┴────┴────┴────┘",
      codeExample:
        '// קריאה לפי אינדקס\nconst colors = ["אדום", "ירוק", "כחול"];\nconsole.log(colors[1]); // "ירוק"\n\n// עדכון לפי אינדקס\ncolors[1] = "צהוב";\nconsole.log(colors); // ["אדום", "צהוב", "כחול"]\n\n// מציאת אינדקס לפי תנאי\nconst nums = [10, 20, 30, 40];\nconst idx = nums.findIndex(n => n > 25);\nconsole.log(idx); // 2 (האיבר 30)',
      codeExplanation:
        "ניתן לקרוא ערך לפי אינדקס (colors[1]) ולעדכן אותו ישירות. findIndex מחפשת את האינדקס הראשון שעבורו התנאי מתקיים — שימושי כשלא יודעים את המיקום מראש.",
    },
  ],

  //  ═══════════════════════════════════════════════════════════════
  //  שאלון — 6 שאלות
  //  ═══════════════════════════════════════════════════════════════
  quiz: [
    {
      question: "מה ההבדל בין map ל-forEach?",
      options: [
        "map משנה את המערך המקורי, forEach לא",
        "map מחזירה מערך חדש, forEach מחזירה undefined",
        "forEach מהירה יותר מ-map",
        "אין הבדל — שתיהן זהות",
      ],
      correct: 1,
      explanation:
        "map תמיד מחזירה מערך חדש עם התוצאות, בעוד forEach רק מבצעת פעולה על כל איבר ומחזירה undefined. שתיהן לא משנות את המערך המקורי.",
    },
    {
      question:
        "מה תהיה התוצאה של הקוד הבא?\nconst arr = [1, 2, 3];\nconst result = arr.filter(n => n > 1).map(n => n * 10);",
      options: ["[10, 20, 30]", "[20, 30]", "[2, 3]", "[1, 20, 30]"],
      correct: 1,
      explanation:
        "filter מסנן ומשאיר רק את 2 ו-3 (גדולים מ-1). לאחר מכן map מכפיל כל ערך ב-10, ומתקבל [20, 30].",
    },
    {
      question: "מה עושה אופרטור ה-spread (...) כשהוא מופעל על מערך?",
      options: [
        "מוחק את המערך המקורי",
        "פורש את איברי המערך לרכיבים בודדים",
        "הופך את המערך למחרוזת",
        "ממיין את המערך",
      ],
      correct: 1,
      explanation:
        "spread (...) פורש את איברי המערך לרכיבים בודדים. זה שימושי ליצירת עותקים, מיזוג מערכים, והעברת ארגומנטים לפונקציות.",
    },
    {
      question: 'מה יחזיר הביטוי "Hello World".toLowerCase()?',
      options: [
        '"HELLO WORLD"',
        '"hello world"',
        '"Hello World"',
        '"hELLO wORLD"',
      ],
      correct: 1,
      explanation:
        'toLowerCase() ממירה את כל התווים במחרוזת לאותיות קטנות. "Hello World" הופך ל-"hello world".',
    },
    {
      question:
        'מה יודפס?\nconst arr = ["a", "b", "c"];\nconsole.log(arr[arr.length]);',
      options: ['"c"', '"a"', "undefined", "Error"],
      correct: 2,
      explanation:
        "arr.length הוא 3, אבל האינדקס האחרון הוא 2 (כי אינדקסים מתחילים מ-0). arr[3] לא קיים ולכן מחזיר undefined. כדי לגשת לאיבר האחרון צריך arr[arr.length - 1].",
    },
    {
      question: "איזו מתודה תיצור מערך חדש המכיל רק איברים שעומדים בתנאי?",
      options: ["forEach", "map", "filter", "push"],
      correct: 2,
      explanation:
        "filter היא המתודה שמסננת איברים לפי תנאי (predicate) ומחזירה מערך חדש עם האיברים שעברו. map יוצרת מערך חדש אך בגודל זהה למקור, ו-forEach לא מחזירה כלום.",
    },
  ],
};
