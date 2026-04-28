// data/concept_enrichment.js
//
// העשרת מושגים: deepDive ("למה זה קיים?") + analogies (אנלוגיות מהחיים).
// המבנה הזה ממוזג ב-runtime לתוך כל מושג שמופיע במפתח התואם.
//
// מבנה כל ערך:
//   "lesson_X::ConceptName": {
//     deepDive: {
//       purpose:   "למה זה נוצר — המטרה הראשונית",
//       problem:   "איזו בעיה זה פותר — מה היה קשה/בלתי-אפשרי קודם",
//       withoutIt: "מה היה קורה בלי זה — איך מתבטא הקושי",
//       useWhen:   "מתי משתמשים בזה בפועל בקוד אמיתי"
//     },
//     analogies: {
//       grandma:   "ברמת סבתא — אסוציאציה מהחיים הכי פשוטה",
//       child:     "ברמת ילד — דוגמה מבית-ספר/משחקים",
//       soldier:   "ברמת חייל — דוגמה מהצבא/חיי בית/מטבח",
//       student:   "ברמת סטודנט — דוגמה אקדמית/טכנית",
//       junior:    "ברמת ג'וניור — דוגמה ממקום עבודה/פרויקט",
//       professor: "ברמת פרופ׳ — אנלוגיה מתמטית/מדעית מדויקת"
//     },
//     analogy: "ברירת מחדל — אנלוגיה כללית למושג (אם אין per-level)"
//   }

var CONCEPT_ENRICHMENT = {
  "lesson_11::Array": {
    "deepDive": {
      "purpose": "מערך הוא מבנה נתונים מסודר שמחזיק רצף של ערכים תחת שם אחד, עם גישה מיידית לכל מקום באמצעות אינדקס.",
      "problem": "בלי מערכים, היינו צריכים משתנה נפרד לכל ערך (item1, item2, item3...) — בלתי אפשרי לטפל ב-100 ערכים, אי אפשר לעבור עליהם בלולאה, לא ניתן להוסיף ערך בקלות.",
      "withoutIt": "כל פעולה על אוסף ערכים הייתה דורשת קוד-בידה ידני: הצהרת המון משתנים, ולא ניתן היה להעביר אוסף לפונקציה כפרמטר אחד.",
      "useWhen": "כל פעם שיש אוסף של דברים מאותו 'סוג' — רשימת משתמשים, מערך תוצאות, רשימת קניות, היסטוריית פעולות. אם יש לך יותר מ-2-3 ערכים דומים — תשתמש במערך."
    },
    "analogies": {
      "grandma": "כמו עגלת קניות בסופר — שמה הכל מסודר אחד אחרי השני, ויש לך מספר לכל פריט (1, 2, 3).",
      "child": "כמו מגירה עם תאים ממוספרים — כל תא מחזיק חפץ אחד, ואת יכולה לקחת את התא #5 ישירות בלי לעבור על הראשונים.",
      "soldier": "כמו רשימת חיילים בפלוגה: כל אחד עם מספר אישי, אפשר לקרוא בשם או לקפוץ ישר ל'מספר 7'.",
      "student": "כמו וקטור במתמטיקה — אוסף מסודר של איברים, גישה O(1) לכל אינדקס.",
      "junior": "כמו שורה ב-Excel: עמודה 1 = שם, עמודה 2 = גיל, וכו'. רק שכאן כל איבר יכול להיות גם אובייקט שלם.",
      "professor": "Heterogeneous dynamic array עם אינדקס מספרי, מקצה זיכרון רציף; ב-V8 ממומש כ-PackedSmiArray כשהאיברים מספרים קטנים."
    }
  },
  "lesson_11::Index": {
    "deepDive": {
      "purpose": "האינדקס הוא ה'כתובת' של כל איבר במערך — מספר שמתחיל מ-0 ומאפשר גישה ישירה.",
      "problem": "בלי אינדקס היינו צריכים לעבור על כל המערך כדי למצוא איבר. אינדקס מאפשר גישה O(1).",
      "withoutIt": "כדי למצוא את האיבר השלישי, היינו עוברים על שני הראשונים. עם אינדקס: arr[2] — מיידי.",
      "useWhen": "כשצריך להגיע לאיבר ספציפי, להחליף ערך, או להסיר/להוסיף במיקום מדויק."
    },
    "analogies": {
      "grandma": "כמו מספר הדירה בבניין — דירה 5 זה דירה 5, לא צריך לעבור על כולן.",
      "child": "כמו לוקר בבית-ספר — כל לוקר עם מספר. את יודעת מיד איפה הלוקר שלך.",
      "soldier": "כמו מספר מיטה במגורים — מספר 7 זה מספר 7, לא חשוב כמה חיילים יש לפניו.",
      "student": "כמו שורה במטריצה — A[2][3] גישה ישירה לאיבר הספציפי.",
      "junior": "כמו ID במסד נתונים — מזהה ייחודי שמאפשר lookup מיידי.",
      "professor": "Offset מ-base address: arr[i] = *(arr + i * sizeof(T)) — בלי חיפוש לינארי."
    }
  },
  "lesson_11::By Value": {
    "deepDive": {
      "purpose": "העתקה לפי ערך — כשמציבים פרימיטיב למשתנה אחר, מועתק הערך עצמו ולא הפניה.",
      "problem": "אם הכל היה לפי הפניה, שינוי משתנה היה משפיע על המקור — קשה לחזות מה משתנה ומה לא.",
      "withoutIt": "כל הצבת מספר/מחרוזת הייתה יוצרת תלות בין המשתנים — let b=a + שינוי a היה גם משנה את b.",
      "useWhen": "תמיד עם מספרים, מחרוזות, בוליאנים. הבטיחות: הערך 'נצמד' למשתנה ולא משתנה משום מקום אחר."
    },
    "analogies": {
      "grandma": "כמו לכתוב מספר על דף נייר — אם תעתיקי ל-2 דפים שונים, כל אחד נשאר עם המספר שלו.",
      "child": "כמו להעתיק תשובה במחברת — אם חבר שינה את התשובה אצלו, אצלך לא משתנה.",
      "soldier": "כמו צילום של פקודה: אם יחידה אחרת קיבלה צילום — כל אחת תפעל לפי שלה, גם אם הפקודה המקורית שונתה.",
      "student": "Deep copy של scalar — שני slot נפרדים בזיכרון, כל אחד מחזיק עותק עצמאי.",
      "junior": "Stack-allocated values — כל הצבה מקצה bytes חדשים. אין pointer, אין aliasing.",
      "professor": "Immutable primitives ב-stack frame; אופטימיזציה של V8 ל-SMI tagging."
    }
  },
  "lesson_11::By Reference": {
    "deepDive": {
      "purpose": "העתקה לפי הפניה — אובייקטים ומערכים מועתקים כ'מצביע' למקום אחד בזיכרון, לא כעותק.",
      "problem": "ללא הפניות, העברת אובייקט לפונקציה הייתה דורשת העתקה מלאה (יקר!) — וגם אובייקטים מקושרים לא היו אפשריים.",
      "withoutIt": "כל העברת אובייקט לפונקציה הייתה יוצרת deep copy. שתי קומפוננטות לא יכולות לחלוק state.",
      "useWhen": "תמיד עם {} ו-[]. לזכור: שינוי בתוך הפונקציה ישפיע על המקור! לכן חשוב spread / structuredClone כשרוצים immutability."
    },
    "analogies": {
      "grandma": "כמו מפתח לדירה — את ובן/בת זוגך מחזיקים מפתח לאותה דירה. שינוי בדירה — שניכם רואים אותו.",
      "child": "כמו קישור לדף בטיקטוק — שיתפת את הקישור עם חברה, היא רואה את אותם תגובות שעודכנו.",
      "soldier": "כמו פלוגה אחת ששני מפקדים אחראים עליה — שינוי באנשי הפלוגה משפיע על שניהם.",
      "student": "Pointer aliasing: שני משתנים מצביעים לאותה כתובת ב-heap.",
      "junior": "Shared mutable state — חיוני להבין כדי למנוע bugs כשמעבירים objects לפונקציות.",
      "professor": "Reference semantics: עותק של pointer (8 bytes) במקום deep clone של מבנה שיכול להיות MB."
    }
  },
  "lesson_11::map": {
    "deepDive": {
      "purpose": "map מייצר מערך חדש שכל איבר הוא תוצאת פונקציה שהפעלת על האיבר המקורי. הוא 'מתרגם' מערך אחד לאחר.",
      "problem": "ללא map, היינו צריכים לולאה ידנית: יצירת מערך ריק, לולאה, push לכל איבר. הרבה boilerplate, פתח לבאגים (off-by-one, שכחה לאתחל).",
      "withoutIt": "כל פעולה של 'תרגם כל איבר' הייתה לולאה של 5-6 שורות — קוד מוצף בעבודות-תחזוקה.",
      "useWhen": "לרינדור רשימת קומפוננטות ב-React, להמרת סוגים (numbers→strings), חישובים על איברים (כפל, פורמט)."
    },
    "analogies": {
      "grandma": "כמו לקלף תפוחי-אדמה: כל תפוח נכנס לסיר עם קליפה, יוצא בלי. הסיר החדש = המערך החדש.",
      "child": "כמו פס ייצור של ממתקים: כל סוכריה נכנסת רגילה, יוצאת מצופה שוקולד. כמות זהה, צורה שונה.",
      "soldier": "כמו תור הסתפרות בצבא: כולם נכנסים עם שיער ארוך, יוצאים עם תספורת זהה. אותו מספר חיילים, מצב שונה.",
      "student": "Functor: map: (a → b) → [a] → [b]. שמירה על מבנה, טרנספורמציה של תוכן.",
      "junior": "Pure transformation: לא מוטציה של המערך המקורי, מקלל testing ומונע bugs.",
      "professor": "Functor laws: map id = id, map (g ∘ f) = map g ∘ map f. בסיס לפרוגרמינג פונקציונלי."
    }
  },
  "lesson_11::filter": {
    "deepDive": {
      "purpose": "filter מחזיר מערך חדש שמכיל רק את האיברים שעברו תנאי. שואלים על כל איבר: 'נכנס או לא?'",
      "problem": "ללא filter, הסינון היה דורש לולאה + תנאי + push — קוד תחזוקתי מוצף.",
      "withoutIt": "כל סינון של מערך הופך לשורות-קוד הרבה יותר ארוכות, פתוחות לבאגים.",
      "useWhen": "להציג רק tasks שלא הושלמו, רק messages לא נקראו, רק הזמנות מעל מחיר מסוים."
    },
    "analogies": {
      "grandma": "כמו מסננת לאורז — מים זורמים החוצה, אורז נשאר. רק מה שגדול מהחורים נשאר.",
      "child": "כמו מאכלים שאמא מבקשת לבחור: 'הבאת לי רק את הירקות הירוקים?' — מסננת לפי תנאי.",
      "soldier": "כמו בדיקת תעודות בשער: מי שיש לו תעודת חוגר נכנס, השאר נשארים בחוץ.",
      "student": "Sub-set selection by predicate — תת-קבוצה לפי כלל לוגי.",
      "junior": "Side-effect free filtering — קל ל-test ולקריאה.",
      "professor": "Comprehension over predicate function {x ∈ A | p(x)}."
    }
  },
  "lesson_11::reduce": {
    "deepDive": {
      "purpose": "reduce 'מצמצם' מערך לערך בודד באמצעות accumulator — סכום, מינימום, אובייקט מקובץ, או כל ערך מורכב.",
      "problem": "חישוב מצטבר על מערך דרש לולאה + משתנה accumulator — קוד שאפשר היה לכתוב פעם אחת בעזרת reduce.",
      "withoutIt": "סכום מערך = 4 שורות. עם reduce = שורה אחת. וזה רק להתחיל; קיבוץ נתונים = הרבה יותר ארוך בלי reduce.",
      "useWhen": "סכום, ממוצע, מקסימום, יצירת map מאובייקטים, flat של מערך מקונן, ספירת תדירויות."
    },
    "analogies": {
      "grandma": "כמו לרכז את השופינג של כולם בבית לסכום אחד — כל אחד מביא קבלה, את מחברת הכל.",
      "child": "כמו לאסוף נקודות בכל שיעור: בסוף השנה — נקודה אחת גדולה (סכום).",
      "soldier": "כמו ספירה בבוקר: כל חוליה דווחה כמה אנשים, המ\"מ סוכם — מספר אחד למשרד הפיקוד.",
      "student": "Fold operation — מצמצם מבנה רקורסיבי לערך אחד באמצעות פונקציה בינארית.",
      "junior": "Universal aggregator — כל שאר מתודות המערך אפשר לבטא דרכו (אבל קריא פחות).",
      "professor": "Catamorphism על מערך כ-ADT (List). foldr/foldl מהפרוגרמינג הפונקציונלי."
    }
  },
  "lesson_11::scope": {
    "deepDive": {
      "purpose": "סקופ קובע 'מהיכן אפשר לראות' משתנה. הוא יוצר 'תיבות' של נראות — משתנה בתוך פונקציה לא נגיש מבחוץ.",
      "problem": "ללא סקופ, כל המשתנים גלובליים = התנגשויות שמות, מערכת לא מסתמכת, התקפת עומק (משתנה x משתנה משום מקום).",
      "withoutIt": "תוכניות בנות יותר מ-50 שורות הופכות בלתי ניתנות לתחזוקה — שינוי משתנה במקום אחד שובר משהו במקום אחר.",
      "useWhen": "תמיד. let/const ב-block-scope, function ב-function-scope, var ב-function-scope (להימנע)."
    },
    "analogies": {
      "grandma": "כמו חדרים בבית — מה שיש בחדר השינה לא רואים מהמטבח. כל חדר סגור.",
      "child": "כמו מחברת אישית — מה שכותב בה רק את רואה. לא חברה ולא ילד אחר.",
      "soldier": "כמו סודות יחידה — בתוך הפלוגה כולם יודעים, מחוץ לפלוגה אסור לדבר.",
      "student": "Lexical scope — ההיררכיה של הסקופ נקבעת לפי המיקום בקוד, לא בזמן ריצה.",
      "junior": "Variable visibility hierarchy — חיוני למניעת naming collisions ולcleanup automatically.",
      "professor": "Static lexical scoping עם closure capture; scope chain מטפס מ-inner ל-outer ל-global."
    }
  },
  "lesson_13::class": {
    "deepDive": {
      "purpose": "class זה תבנית ליצירת אובייקטים עם מבנה זהה — כמו 'תכנית בנייה' שאפשר להפיק ממנה הרבה מופעים.",
      "problem": "ללא class, יצירת אובייקטים עם אותם methods דרשה copy-paste של פונקציות. שינוי תכונה משותפת = עדכון ב-100 מקומות.",
      "withoutIt": "אובייקטים עם אותו 'סוג' היו צריכים boilerplate ידני. ירושה הייתה כמעט בלתי אפשרית.",
      "useWhen": "כשיש מספר אובייקטים עם אותו מבנה ופעולות (User, Product, Animal). או לבניית לוגיקה state-ful."
    },
    "analogies": {
      "grandma": "כמו תבנית עוגה — תבנית אחת, יוצרים 50 עוגות זהות. כל עוגה היא אובייקט.",
      "child": "כמו תבנית של בובה: כל הבובות נראות אותו דבר, אבל כל אחת נפרדת ויכולה ללבוש בגדים שונים.",
      "soldier": "כמו מדים: כולם זהים בצורה, אבל כל חייל הוא יחיד עם דרגה ושם משלו.",
      "student": "Blueprint לאובייקטים. הקלאס = blueprint, instance = הבנייה הספציפית.",
      "junior": "Encapsulation של state + behavior. constructor מאתחל, methods מתפעלים.",
      "professor": "Syntactic sugar מעל prototype-based inheritance של JS — לא class-based 'אמיתי' כמו Java."
    }
  },
  "lesson_13::extends": {
    "deepDive": {
      "purpose": "extends מאפשר ירושה — מחלקה אחת מקבלת את כל היכולות של מחלקת-על, ויכולה להוסיף עליהן.",
      "problem": "ללא ירושה, היינו כותבים מחדש את אותו קוד. Animal, Dog, Cat, Fish — כל אחד עם אותם מאפיינים בסיסיים.",
      "withoutIt": "DRY violation — Don't Repeat Yourself. שינוי תכונה בסיסית של 'בעל חיים' היה חייב לקרות ב-10 מקומות.",
      "useWhen": "כשיש קשר 'is-a' — Dog is an Animal, Admin is a User. עדיף הרכבה (composition) על ירושה במקרים רבים."
    },
    "analogies": {
      "grandma": "כמו ילד שמקבל מאמא ואבא תכונות — צבע עיניים, גובה. ועליהן הוא מוסיף את התכונות שלו.",
      "child": "כמו קוסם בסיסי שכולם יודעים, ומכשפה היא קוסם + יודעת קסם פלא.",
      "soldier": "כמו טוראי שיש לו את כל היכולות של חייל בסיסי + יודע להפעיל ציוד מיוחד.",
      "student": "Inheritance hierarchy — Specialization של מחלקה כללית למחלקה ספציפית.",
      "junior": "extends יוצרת prototype chain — הצאצא ניגש אוטומטית למתודות של ההורה.",
      "professor": "Liskov Substitution Principle — Subtype חייב להיות תחליף מלא ל-Supertype."
    }
  },
  "lesson_15::try": {
    "deepDive": {
      "purpose": "try/catch יוצר 'אזור מוגן' — אם זריקת שגיאה קורית בתוך try, היא נתפסת ב-catch במקום שתפיל את התוכנית.",
      "problem": "ללא try/catch, שגיאה אחת ב-API קוטעת את כל האפליקציה. למשתמש מופיע מסך לבן.",
      "withoutIt": "fetch שנכשל = crash. parse של JSON שגוי = crash. כל פעולה מסוכנת = רוסית.",
      "useWhen": "סביב fetch, JSON.parse, פעולות I/O, כל קוד שמסתמך על input חיצוני."
    },
    "analogies": {
      "grandma": "כמו רשת ביטחון של אקרובט — אם נופל, לא נשבר. ממשיך לחיות, פשוט מנסה שוב.",
      "child": "כמו לעלות על אופניים עם גלגלי עזר — אם נופלים, הגלגלים תופסים. לא יוצא חבול.",
      "soldier": "כמו דיווח פינוי לפני יציאה למשימה: אם משהו ישתבש, יודעים לנהל את המצב.",
      "student": "Exception handling — מנגנון לטיפול תקלות בלי שתעצור את ה-flow.",
      "junior": "Try-catch boundary — בידוד שגיאה לזמן/מקום ספציפי, מאפשר recovery או logging.",
      "professor": "Effect system לטיפול במצבי-קצה (failure mode) במודל computational."
    }
  },
  "lesson_21::React": {
    "deepDive": {
      "purpose": "ספרייה לבניית UI מבוססת קומפוננטות. מאפשרת לבנות אפליקציות אינטראקטיביות בצורה דקלרטיבית.",
      "problem": "DOM ישיר → קוד אימפרטיבי, מורכב, קשה לתחזוקה. בעיות סינכרון בין נתונים ל-UI.",
      "withoutIt": "צריכים לכתוב הכל ב-vanilla JS — מאות שורות לעדכון UI פשוט.",
      "useWhen": "כל אפליקציית web אינטראקטיבית. אפילו אתר תוכן בינוני נהנה מ-React."
    },
    "analogies": {
      "grandma": "ערכת לבנים — חתיכות מוכנות שמרכיבים בכל פעם בצורה אחרת.",
      "child": "כמו במשחק לגו — לוקחים חלקים, בונים בית, מפרקים, בונים מחדש.",
      "soldier": "מודולים תת-טקטיים שמשלבים יחד למבצע.",
      "student": "Declarative UI library with virtual DOM and reconciliation.",
      "junior": "ה-de-facto standard ב-frontend. Eco-system עשיר: Router, Redux, Tailwind, Next.js.",
      "professor": "Component-based architecture with unidirectional data flow and immutable VDOM diffing."
    }
  },
  "lesson_21::Component": {
    "deepDive": {
      "purpose": "יחידת UI עצמאית — פונקציה שמחזירה JSX. מאפשרת re-use ועיצוב מודולרי.",
      "problem": "בלי קומפוננטות, כל ה-UI הוא מקובץ אחד גדול — קשה לתחזק, אין re-use.",
      "withoutIt": "קוד spaghetti, duplications, baגים בכל מקום.",
      "useWhen": "תמיד. כל פיסת UI שיכולה להיות עצמאית — קומפוננטה."
    },
    "analogies": {
      "grandma": "לבנה ב-LEGO — חתיכה אחת שאפשר לחבר עם אחרות.",
      "child": "כל פיסה במסך (כפתור, תמונה) היא קומפוננטה נפרדת.",
      "soldier": "יחידה טקטית — פועלת עצמאית, משתלבת במבצע גדול.",
      "student": "Function returning JSX. Closes over state via hooks. Single responsibility principle.",
      "junior": "כללים: שם באות גדולה, פונקציה pure, קטן ומרוכז. <Comp /> ולא Comp().",
      "professor": "Encapsulated UI primitive. Function components leverage hooks for state and effects."
    }
  },
  "lesson_21::JSX": {
    "deepDive": {
      "purpose": "תחביר שמערבב HTML עם JS — לכתוב UI דקלרטיבי בצורה קריאה.",
      "problem": "React.createElement('div', { className: 'x' }, child1, child2) — מסורבל. JSX הופך את זה ל-<div className='x'>...</div>.",
      "withoutIt": "צריך לכתוב createElement בכל מקום. קוד פחות קריא, קשה לעקוב אחרי מבנה ה-UI.",
      "useWhen": "תמיד ב-React. JSX הוא הסטנדרט של ימינו."
    },
    "analogies": {
      "grandma": "כותבים HTML בתוך JS. הקוד נראה כמו דף, אבל יכול להיות דינמי.",
      "child": "כמו לצייר עם מילים — כותבים <h1> ומקבלים כותרת.",
      "soldier": "פקודה הירארכית מתועדת — מבנה ברור, גמיש, ניתן לקריאה.",
      "student": "Syntactic sugar over React.createElement. Babel/swc transpile to function calls.",
      "junior": "המלכודות: className לא class, root יחיד (Fragment <>), {} לביטויי JS.",
      "professor": "Domain-specific syntax extension; modern JSX runtime in React 17+ avoids React import."
    }
  },
  "lesson_21::props": {
    "deepDive": {
      "purpose": "הקלט של קומפוננטה — נתונים שעוברים מאב לבן. read-only, חד-כיווני.",
      "problem": "בלי props אין דרך להעביר נתונים בין קומפוננטות.",
      "withoutIt": "כל קומפוננטה מנוהלת לבד. אין reusability.",
      "useWhen": "תמיד. כל קומפוננטה חוץ מהשורש מקבלת props."
    },
    "analogies": {
      "grandma": "מתנות מאמא — הילד מקבל ומשתמש, לא משנה.",
      "child": "פתק מהמורה — תלמיד קורא, לא כותב מחדש.",
      "soldier": "פקודה מהמפקד — חייל מבצע, לא משנה.",
      "student": "Function parameters in declarative form. Read-only by convention.",
      "junior": "Destructuring: function Foo({ name, age }). default values: { name = 'אורח' }. children prop ל-composition.",
      "professor": "Unidirectional flow input; immutability enables predictable reactivity."
    }
  },
  "lesson_21::map": {
    "deepDive": {
      "purpose": "מתודת מערך שמייצרת מערך חדש — בכל איבר מבצעים טרנספורמציה. ב-React: מ-data ל-elements.",
      "problem": "אין דרך אחרת אלגנטית להציג רשימה דינמית.",
      "withoutIt": "צריך for loops, jsx.push, spaghetti.",
      "useWhen": "כל רשימה: todos, posts, users, columns בטבלה."
    },
    "analogies": {
      "grandma": "לכל ילד ברשימה — תיצרי כרטיס. map עושה את זה.",
      "child": "כמו לתת לכל חבר במחנה תיק זהה. map = הוראה לכל אחד.",
      "soldier": "לכל חייל ביחידה — משימה מותאמת. map = הקצאה אוטומטית.",
      "student": "Functor pattern. arr.map(f) = [f(arr[0]), f(arr[1]), ...].",
      "junior": "key prop חובה ל-reconciliation. id יציב מועדף על אינדקס.",
      "professor": "Higher-order array transformation; key prop enables React's keyed reconciliation."
    }
  },
  "lesson_21::rendering": {
    "deepDive": {
      "purpose": "התהליך של הרצת הקומפוננטה והצגת התוצאה ב-DOM. הליבה של React.",
      "problem": "סינכרון בין state ל-UI מסובך לעשות ידנית.",
      "withoutIt": "צריך לעדכן DOM ידנית בכל שינוי. קוד אימפרטיבי, רגיש לבאגים.",
      "useWhen": "כל הזמן — אבל מבינים את זה כשרוצים למטב או לאתר באגים."
    },
    "analogies": {
      "grandma": "לצייר את התמונה מחדש כשמשהו השתנה.",
      "child": "לעדכן את הציור על הלוח — מוחקים, ומציירים שוב את החלקים שהשתנו.",
      "soldier": "רענון תרשים מצב — חדש מתואם עם המציאות העדכנית.",
      "student": "Function execution → VDOM → diff → DOM commit. Reconciliation algorithm O(n).",
      "junior": "טריגרים: setState, props, parent re-render, context. כלי: React DevTools Profiler.",
      "professor": "Render phase (pure VDOM) + commit phase (effectful DOM). Concurrent mode allows interruption."
    }
  },
  "lesson_21::RFC": {
    "deepDive": {
      "purpose": "קומפוננטה כפונקציה. מ-React 16.8+ עם hooks, החליפה את class components.",
      "problem": "class components: this binding, constructor, render method — מסורבל.",
      "withoutIt": "צריכים לכתוב class לכל קומפוננטה. boilerplate משמעותי.",
      "useWhen": "כל הקומפוננטות החדשות. class רק ל-legacy."
    },
    "analogies": {
      "grandma": "פונקציה רגילה שמחזירה תצוגה. פשוט.",
      "child": "כמו פונקציית מחשבון — קלט→פלט. ב-React: props→JSX.",
      "soldier": "פעולה אטומית עם קלט מוגדר — פלט מוגדר.",
      "student": "Function component with hooks; replaces class.lifecycle.",
      "junior": "function declaration או arrow — זה אותו דבר. כל הצוות בוחר סגנון.",
      "professor": "Pure function (or with hooks for stateful behavior). No this binding pitfalls."
    }
  },
  "lesson_21::{}": {
    "deepDive": {
      "purpose": "סוגריים מסולסלים ב-JSX מאפשרים להכניס ביטויי JavaScript לתוך התצוגה.",
      "problem": "בלי {}, אי אפשר לערבב משתנים, חישובים, או לוגיקה דינמית עם ה-HTML.",
      "withoutIt": "JSX יהיה סטטי בלבד — חסר תועלת.",
      "useWhen": "תמיד שיש ערך דינמי: משתנה, חישוב, ternary, map."
    },
    "analogies": {
      "grandma": "חלון ב-HTML שדרכו רואים את ה-JS.",
      "child": "כמו סוגריים בתרגיל מתמטי — מה שבפנים מתבצע קודם.",
      "soldier": "פקודה משובצת בתוך פקודה — ערך דינמי מתורגם בזמן ביצוע.",
      "student": "JSX expression slot. Accepts any JS expression (not statements).",
      "junior": "טריקים: {x && <Y />} ל-conditional, {arr.map(...)} לרשימה, {x ?? 'default'}.",
      "professor": "Embedded JS expression in JSX; results coerced to renderable types (string/number/JSX/array)."
    }
  },
  "lesson_21::className": {
    "deepDive": {
      "purpose": "תכונה ב-JSX להחלת CSS classes על element.",
      "problem": "class היא מילה שמורה ב-JS — אסור להשתמש בה כתכונה.",
      "withoutIt": "אין דרך להחיל עיצוב באופן structured.",
      "useWhen": "תמיד שמחילים CSS class. דינמי או סטטי."
    },
    "analogies": {
      "grandma": "תווית עם שם של עיצוב — את שמה תווית, ה-CSS מחיל את העיצוב.",
      "child": "כמו צבע על דבש — מסמנים את הפרי, וכולם רואים אותו.",
      "soldier": "סימן יחידתי על מדים — מזהה לאיזה CSS scope שייך.",
      "student": "Maps to DOM class attribute. React renames to avoid 'class' keyword conflict.",
      "junior": "Tailwind: className='px-4 py-2'. dynamic: className={isOn ? 'on' : 'off'}. clsx ל-conditions.",
      "professor": "Aliased attribute mapping the JS-reserved 'class' to React's prop."
    }
  },
  "lesson_21::inline style": {
    "deepDive": {
      "purpose": "החלת CSS ישירות על element דרך style prop. שימושי לערכים דינמיים.",
      "problem": "לפעמים העיצוב תלוי ב-state ולא ידוע מראש. אי אפשר לחזות ב-CSS.",
      "withoutIt": "צריך לייצר classes דינמיים או להשתמש ב-CSS-in-JS.",
      "useWhen": "ערכים דינמיים: progress bar width, color מ-state, position. סטטי = className."
    },
    "analogies": {
      "grandma": "צובעים את הדף ישירות במקום להשתמש בעט עם צבע מוגדר.",
      "child": "סטיקר על הציור — ספציפי לציור הזה, לא לכלל.",
      "soldier": "שינוי ספציפי ליחידה אחת, לא לפלוגה כולה.",
      "student": "Direct style attribute as object; bypasses CSS cascade.",
      "junior": "אובייקט (לא string!), camelCase, מספרים = px.",
      "professor": "Inline styles bypass cascade; ideal for runtime-derived values, otherwise prefer stylesheets."
    }
  },
  "lesson_22::useState": {
    "deepDive": {
      "purpose": "useState נותן לקומפוננטה 'זיכרון' — מקום לשמור ערך שמשתנה בזמן ריצה ולגרום לרינדור מחדש בכל שינוי.",
      "problem": "ללא state, כל לחיצה על כפתור הייתה 'נמחקת'. אין דרך לזכור אם המשתמש הקליק, מה הוא הקליד, או מה במידע שהורד.",
      "withoutIt": "פורם, ספירה, רשימת tasks — הכל בלתי אפשרי. הקומפוננטה תמיד תיראה כמו ברגע הראשון.",
      "useWhen": "כל מצב פנימי של קומפוננטה: ערך input, סטטוס loading, רשימת items, modal open/close."
    },
    "analogies": {
      "grandma": "כמו פתק על המקרר — את כותבת מה לקנות, ובכל פעם שאת מסתכלת זה שם. אם תשני — את רואה את הגרסה החדשה.",
      "child": "כמו לוח קטן בכיתה — המורה כותבת מספר, את רואה. היא משנה — את רואה מספר חדש מיד.",
      "soldier": "כמו לוח חיילי-תורנות — מי בתורנות עכשיו. מתחלף — הלוח מתעדכן, וכולם רואים.",
      "student": "useState מחזירה [value, setter]. setter מעדכן את הערך וגורם לעדכון UI.",
      "junior": "Triggers re-render אוטומטית. עם batching ב-React 18 לעדכונים מרובים.",
      "professor": "Closure-based state hook עם internal pointer ל-Fiber tree node."
    }
  },
  "lesson_22::Hook": {
    "deepDive": {
      "purpose": "Hook הוא מנגנון שדרכו קומפוננטה פונקציונלית מתחברת ל-React ומקבלת יכולות שמורות לקומפוננטות-מחלקה (state, effects, refs).",
      "problem": "לפני 2019, רק class-components יכלו להחזיק state ולהגיב ל-lifecycle. הפונקציות היו 'מטופשות' — רק קלט→פלט.",
      "withoutIt": "כדי להחזיק ספירה במחלקה צריך constructor, this, bind. ב-Hooks: שורה אחת. בלי Hooks — חוזרים לכל התקורה הזו.",
      "useWhen": "כל קומפוננטה שצריכה זיכרון, אפקטים, refs, או context — קוראת ל-Hook מתחילתה."
    },
    "analogies": {
      "grandma": "כמו תקע חשמל — מחברים את המכשיר לחשמל ומקבלים כוח. בלי תקע — המכשיר לא עובד.",
      "child": "כמו לבחור 'יכולת מיוחדת' בתחילת המשחק. כל יכולת זה Hook אחר.",
      "soldier": "כמו לחבר מכשיר קשר — הקומפוננטה מתחברת ל-React ומקבלת ערוץ נתונים.",
      "student": "Hook = פונקציה ש-React מנהלת. תמיד ברמה העליונה, באותו סדר. נרשמת אצל React לפי אינדקס.",
      "junior": "use* prefix מאפשר ל-React identify-hooks. Rules of Hooks (no conditional/loop) קריטיים לתקינות הסדר.",
      "professor": "Stateful primitive on top of React's fiber linked-list. Identity preserved by call-order indexing within fiber's hooks chain."
    }
  },
  "lesson_22::state": {
    "deepDive": {
      "purpose": "state הוא הזיכרון הפנימי של קומפוננטה — נתונים שמשתנים בזמן ריצה ומחליפים את התצוגה כשהם משתנים.",
      "problem": "משתנה JavaScript רגיל מתאפס בכל קריאה לפונקציית הקומפוננטה. בלי state — אין דרך לזכור כלום בין רינדורים.",
      "withoutIt": "טופס לא יזכור מה הקלדת. כפתור לייק לא ידע אם לחצו עליו. מודאל לא יישאר פתוח.",
      "useWhen": "כל פעם שהקומפוננטה צריכה לזכור משהו: input value, count, isOpen, list items."
    },
    "analogies": {
      "grandma": "כמו שעון — תמיד מציג את הזמן הנוכחי. כשהזמן מתקדם, השעון מתעדכן והתצוגה משתנה.",
      "child": "כמו ציור על לוח שינויים — את צובעת בצבע אדום, אז שחור, ובכל שינוי הלוח מראה את הצבע העדכני.",
      "soldier": "כמו לוח כוננות — מצב היחידה הנוכחי. כשהמצב משתנה, כולם רואים מיד.",
      "student": "Component-local persistent data managed by React. Triggers reconciliation on update.",
      "junior": "ההבדל מ-props: state בבעלות הקומפוננטה, props מגיעים מבחוץ. שינוי state → re-render.",
      "professor": "Encapsulated reactive variable bound to fiber instance, persisted across renders via React's hook chain."
    }
  },
  "lesson_22::setState": {
    "deepDive": {
      "purpose": "setState (ה-setter שחוזר מ-useState) הוא הדרך היחידה לעדכן state ב-React ולגרום לרינדור מחדש.",
      "problem": "ב-JavaScript אפשר לכתוב x = 5 ולשנות משתנה. ב-React, שינוי כזה לא יגרום ל-UI להתעדכן — חייבים לעבור דרך ה-setter.",
      "withoutIt": "אין דרך לעדכן state ולקבל UI מעודכן. כל שינוי ישיר ל-state — נעלם.",
      "useWhen": "כל פעם שצריכים לשנות state. בייחוד: בעדכונים מרובים ברצף — חובה functional form."
    },
    "analogies": {
      "grandma": "כמו לשלוח מסר ל-React: 'תשנה את המספר ל-5'. רק כשהמסר מתקבל, המספר מתעדכן.",
      "child": "כמו לקרוא לאמא דרך מקרופון — המסר מגיע, ואמא דואגת לעדכן את הלוח.",
      "soldier": "כמו פקודה: 'שינוי במצב!' — רק אחרי שהמפקד מאשר, השינוי מתבצע ומופץ.",
      "student": "Setter schedules state update + re-render. Functional form (prev => next) sees latest queued state.",
      "junior": "המלכודת: setCount(count+1) ×3 = +1 בלבד (כל הקריאות על אותו snapshot). c=>c+1 ×3 = +3.",
      "professor": "Update queue with batching; functional updaters compose with prior queued state, ensuring correctness under concurrent rendering."
    }
  },
  "lesson_22::re-render": {
    "deepDive": {
      "purpose": "re-render הוא ההרצה מחדש של הקומפוננטה אחרי שינוי state/props/context — כדי להפיק VDOM חדש שמשקף את המצב החדש.",
      "problem": "אם React לא היה מריץ קומפוננטה מחדש על שינוי, ה-UI היה תקוע. אבל אם היה מריץ הכל בכל שינוי — ביצועים נורא.",
      "withoutIt": "UI לא יתעדכן בעקבות state, וכל הפילוסופיה של React קורסת.",
      "useWhen": "אוטומטי — קורה כש-setState נקרא, או האב התרענן, או context שצורכים השתנה."
    },
    "analogies": {
      "grandma": "כמו לצבוע מחדש את החדר אחרי הזיזת רהיטים — תמונה חדשה למשתמש.",
      "child": "כמו במשחק שאם השחקן זז, המסך מתעדכן ומראה את המקום החדש.",
      "soldier": "כמו רענון מצב במלחמה — המצב משתנה, ונדרש דיווח חדש למפקדה.",
      "student": "Function re-execution → new VDOM → diff against previous → minimal DOM update.",
      "junior": "המלכודת: ילד מתרענן בכל פעם שאב מתרענן. React.memo + useCallback פותרים.",
      "professor": "Reconciliation algorithm with O(n) heuristic diffing; key-stability essential for list reconciliation."
    }
  },
  "lesson_22::mutable": {
    "deepDive": {
      "purpose": "מושג JS בסיסי: ערכים שניתנים לשינוי במקום (objects, arrays). הבנה קריטית כדי להימנע מבאגים ב-state.",
      "problem": "ב-React, mutation שומר את אותה הפניה. setState לא יזהה שינוי, אין re-render.",
      "withoutIt": "אין הבנה של למה React 'מתעלם' מהשינויים שלי — באג קלאסי שלוקח שעות לפתור.",
      "useWhen": "תמיד יש להיות מודעים: arr.push, obj.x=1, arr.sort — mutable. עדיף שיטות immutable."
    },
    "analogies": {
      "grandma": "כמו לוח מחיק — אפשר לכתוב, למחוק, לשנות שוב. ההפך: לוח אבן חקוק.",
      "child": "ב-LEGO: דגם רגיל ניתן לשינוי (mutable). דגם מודבק עם דבק — לא ניתן לשינוי (immutable).",
      "soldier": "כמו פקודה בכתב יד שאפשר למחוק ולכתוב מחדש. או פקודה מודפסת — קבועה.",
      "student": "Reference types (objects/arrays) are mutable; primitives (number, string, bool) are not.",
      "junior": "מתודות שמשנות מקום: push, pop, shift, unshift, splice, sort, reverse, fill.",
      "professor": "Mutability vs. value semantics; mutation breaks referential transparency — anti-pattern in functional UI."
    },
    "commonMistakes": [
      {
        "mistake": "items.push(x); setItems(items)",
        "why": "push משנה במקום, אותה הפניה — React מדלג.",
        "fix": "setItems([...items, x])"
      }
    ]
  },
  "lesson_22::immutable": {
    "deepDive": {
      "purpose": "immutable update = יצירת עותק חדש עם השינוי, במקום שינוי הערך הקיים. הבסיס של ניהול state ב-React.",
      "problem": "ללא immutability, React לא יודע מתי state השתנה (משווה הפניות). בלי זה, אין reactivity.",
      "withoutIt": "כל הספריות שתלויות ב-state-immutable (Redux, Zustand, React) פשוט לא יעבדו.",
      "useWhen": "תמיד בעת עדכון state. שיטות: spread (...), map, filter, slice, concat, Object.assign({})."
    },
    "analogies": {
      "grandma": "במקום למחוק ולכתוב על הלוח — את כותבת על דף חדש. הלוח הישן נשאר.",
      "child": "כמו לצלם תמונה לפני שינוי, אז לעשות את השינוי בתמונה החדשה. הישנה שמורה.",
      "soldier": "פקודה חדשה במקום לתקן ידנית את הקיימת — אין מחלוקת על מה הגרסה האמיתית.",
      "student": "Immutable update → predictable diffing, time-travel debugging, easy memoization.",
      "junior": "כלים: Immer (mutation סינטקסטית, immutable מאחורי הקלעים); spread רדוד מספיק לרוב המקרים.",
      "professor": "Persistent data structures via structural sharing; enables O(1) shallow equality for reconciliation."
    }
  },
  "lesson_22::reference": {
    "deepDive": {
      "purpose": "reference הוא הכתובת של אובייקט ב-heap. הבנה זו מסבירה למה b = a לא מעתיק את הערך, ולמה React רואה 'אין שינוי'.",
      "problem": "מתחילי JS חושבים שהצבה מעתיקה. אבל לאובייקטים, היא מעתיקה את ההפניה — שני המשתנים מצביעים על אותו דבר.",
      "withoutIt": "באגים מסוג 'שיניתי משתנה אחד והשני השתנה' — הסבר מתמשך לבלגן.",
      "useWhen": "תמיד מודעים: בכל פעם שמעבירים אובייקט/מערך, מוודאים אם רוצים העתק או שיתוף הפניה."
    },
    "analogies": {
      "grandma": "כמו ששני אנשים מסתכלים על אותה ציור על הלוח. אם אחד יקלקל — שניהם רואים את הקלקול.",
      "child": "ילד שמראה לחבר את הצעצוע שלו: שניהם רואים את אותו צעצוע. אם הוא נשבר — שניהם רואים שבר.",
      "soldier": "כמו ששני חיילים מקבלים מפה זהה. אם אחד יציץ עליה ערך — השני יראה את הערך החדש.",
      "student": "JS objects on heap; variables hold references. Strict equality compares pointer identity.",
      "junior": "{...a} = שכפול רדוד (כתובת חדשה, אבל שדות פנימיים עדיין משותפים). structuredClone לעומק.",
      "professor": "Heap-allocated reference types vs stack-allocated value types; mutation visible across all bindings."
    }
  },
  "lesson_22::array reference": {
    "deepDive": {
      "purpose": "ההפניה למערך ב-state. כדי ש-React יזהה שינוי — חייבים מערך חדש בכל עדכון.",
      "problem": "מתודות שמשנות במקום (push, pop, shift, unshift, sort, splice, reverse) — שומרות את אותה הפניה. React מדלג.",
      "withoutIt": "TodoLists, רשימות צ'אט, פיד פוסטים — כולם נשברים. UI נראה כאילו 'תקוע'.",
      "useWhen": "כל עדכון של מערך ב-state. כלל אצבע: שיטות שמחזירות מערך חדש (map, filter, slice, concat, spread) — בטוחות. שמשנות במקום — אסורות."
    },
    "analogies": {
      "grandma": "כמו תיק מצרכים — אם תוסיפי משהו לתיק (push), זה אותו תיק. אם תיקני תיק חדש עם הדברים הישנים + החדש — זה תיק חדש.",
      "child": "כמו אוסף קלפים: להוסיף לקופסה הישנה (push) זה אותה קופסה. ליצור קופסה חדשה זה משהו אחר.",
      "soldier": "מערך כתיק תחמושת — שינוי בתיק הקיים = אותו תיק. תיק חדש = הפניה חדשה.",
      "student": "Array methods: mutating (push/pop/sort) vs non-mutating (map/filter/concat/slice).",
      "junior": "ES2023 הוסיפה toSorted, toReversed, with, toSpliced — מחזירות חדש בלי mutation.",
      "professor": "Reference identity is React's bail-out heuristic. Mutating an array preserves identity, defeating reconciliation."
    }
  },
  "lesson_22::object reference": {
    "deepDive": {
      "purpose": "ההפניה לאובייקט ב-state. כל שינוי שדה (obj.x = 1) שומר את אותה הפניה. React לא יזהה.",
      "problem": "מתחילי React מנסים לעדכן user.name ישירות — שום עדכון. הבעיה היא ההפניה הזהה.",
      "withoutIt": "טפסים, שדות אובייקטיים ב-state — לא עובדים. באגים סבוכים.",
      "useWhen": "כל עדכון של state-object. Spread (...obj), Object.assign({}, ...) ליצירת חדש."
    },
    "analogies": {
      "grandma": "תיבת צעצועים — להחליף צעצוע בתיבה לא משנה את התיבה (אותה תיבה). תיבה חדשה = שינוי.",
      "child": "תרמיל בית-ספר: להוציא ספר ולהחזיר אחר זה אותו תרמיל. ליצור תרמיל חדש = משהו אחר.",
      "soldier": "ארגז ציוד — מילוי שונה, אותו ארגז. ארגז חדש = הפניה חדשה.",
      "student": "Object identity vs structural equality. React uses identity (Object.is) for state diffing.",
      "junior": "Spread רדוד טוב לרמה אחת. למקונן, צריך spread לכל רמה: { ...a, b: { ...a.b, c: ... } }.",
      "professor": "Shallow vs deep equality; structural sharing libraries (Immer, Immutable.js) optimize deep nested updates."
    }
  },
  "lesson_22::onChange": {
    "deepDive": {
      "purpose": "onChange הוא event handler שב-React רץ בכל הקלדה (לא רק בסיום) — מאפשר עדכון state real-time.",
      "problem": "ב-DOM הסטנדרטי, change רץ רק ב-blur. ב-React הוא מתנהג כמו 'input' event — בכל הקשה.",
      "withoutIt": "אי אפשר לעשות validation real-time, masking, או controlled input.",
      "useWhen": "כל input/textarea/select שצריך לעדכן state בכל שינוי."
    },
    "analogies": {
      "grandma": "כמו אוזן שמקשיבה לכל לחישה — לא מחכה שתסיימי משפט.",
      "child": "כמו חבר שעוקב אחרי כל קליק שלך במקלדת — בכל פעם, מיד.",
      "soldier": "כמו מכשיר קשר פתוח — כל הזמן מקבל מסרים, מגיב מיד.",
      "student": "SyntheticEvent wraps DOM event for cross-browser uniformity. event.target.value מכיל ערך חדש.",
      "junior": "המלכודת: onChange={setVal(e.target.value)} → קורא מיד. צריך: onChange={e => setVal(e.target.value)}.",
      "professor": "React's synthetic event pooling normalized cross-browser semantics; wraps DOM input event despite the 'change' name."
    }
  },
  "lesson_22::controlled input": {
    "deepDive": {
      "purpose": "controlled input הוא דפוס שבו React שולט בערך השדה דרך value+onChange. מאפשר ולידציה, transformation, ושליטה מלאה.",
      "problem": "uncontrolled input מנהל את הערך לבד; קשה לוולד או לשנות real-time.",
      "withoutIt": "אין דרך לסנן הקלדה (לדוגמה רק ספרות), להפוך לאותיות גדולות בזמן הקלדה, או להגביל אורך.",
      "useWhen": "כל טופס שצריך validation, masking, או logic בזמן הקלדה. הסטנדרט המומלץ."
    },
    "analogies": {
      "grandma": "שדה שאת שולטת בו לגמרי — את אומרת מה להציג, ובודקת כל שינוי לפני אישור.",
      "child": "כמו לוח שמורה כותבת עליו, וכל פעם שילד רוצה לשנות — היא מחליטה אם לאשר.",
      "soldier": "פקודה שכל אות עוברת דרך מפקד — הוא מאשר או דוחה.",
      "student": "Single source of truth — state is the canonical value, DOM mirrors it.",
      "junior": "value + onChange חייבים להיות יחד. בלי onChange, השדה הופך de-facto read-only.",
      "professor": "Reactive bidirectional binding via React's reconciliation; DOM value overwritten on every render."
    }
  },
  "lesson_22::props": {
    "deepDive": {
      "purpose": "props הם הקלט של הקומפוננטה — נתונים מאב לבן. read-only, זורמים בכיוון אחד.",
      "problem": "בלי props, אין דרך להעביר נתונים מקומפוננטה לקומפוננטה. כל אחת חיה לבד.",
      "withoutIt": "כל קומפוננטה היא אי בודד. אין reusability.",
      "useWhen": "תמיד. קומפוננטה היא פונקציה — props הם הפרמטרים שלה."
    },
    "analogies": {
      "grandma": "מתנות שאמא נותנת לילד — הילד מקבל ומשתמש, אבל לא משנה.",
      "child": "פתק מהמורה: 'קרא את עמוד 5'. התלמיד מקבל הוראה ומבצע. לא משנה את הפתק.",
      "soldier": "פקודה ממפקד — חייל מבצע, לא משנה.",
      "student": "Function parameters in declarative form. Read-only by convention; mutating them violates React's contract.",
      "junior": "destructuring בפרמטר נוח: function Card({ title, body }). מעביר ערך חדש = re-render.",
      "professor": "Unidirectional data flow; immutability of props enables reasoning about reactivity locally."
    }
  },
  "lesson_22::parent component": {
    "deepDive": {
      "purpose": "parent component יוצר ושולט בילדיו — מעביר להם props, מטפל בעדכונים שמגיעים מהם דרך callbacks.",
      "problem": "בלי הירארכיה, אין דרך לבנות UI מורכב מקומפוננטות פשוטות.",
      "withoutIt": "קומפוננטות גדולות, לא reusable, קשה להבין.",
      "useWhen": "כל קומפוננטה שמכילה קומפוננטות אחרות. אב מנהל state ומחלק אותו לילדים."
    },
    "analogies": {
      "grandma": "אבא במשפחה — מקבל החלטות, מחלק משימות לילדים, מקבל מהם דיווחים.",
      "child": "מורה בכיתה: מסביר ומחלק תרגילים לתלמידים, ומקבל את התשובות שלהם.",
      "soldier": "מפקד פלוגה — נותן פקודות לחיילים, מקבל דיווחים.",
      "student": "Tree node with state ownership; passes derived data downward via props.",
      "junior": "Parent owns state — child receives + signals back via callback. 'data flows down, callbacks up'.",
      "professor": "Component composition with hierarchical state ownership; lifting state to common ancestor."
    }
  },
  "lesson_22::child component": {
    "deepDive": {
      "purpose": "child component מקבל props מההורה ומחזיר UI. יכול 'לדבר' בחזרה רק דרך callbacks שההורה שלח.",
      "problem": "בלי ילדים, אין composition. כל UI גדול היה מאוחד בקומפוננטה ענקית.",
      "withoutIt": "אין שימוש חוזר, אין הפרדה ברורה של אחריות.",
      "useWhen": "כל פיסת UI שצריכה לחזור או להיות עצמאית."
    },
    "analogies": {
      "grandma": "ילד במשפחה — מקבל הוראות מההורים, מבצע, מבקש כשצריך.",
      "child": "תלמיד בכיתה — מבצע משימות, מרים יד כשרוצה משהו.",
      "soldier": "חייל ביחידה — מבצע פקודות, מדווח חזרה.",
      "student": "Pure render of props + local state. Communicates upward via callback props only.",
      "junior": "אסור לשנות props ישירות. אם רוצים local state נגזר מ-prop, useState עם initial value.",
      "professor": "Subtree of the React tree; receives props as immutable input, may hold local state, communicates via callbacks."
    }
  },
  "lesson_22::passing function as prop": {
    "deepDive": {
      "purpose": "מאפשר לילד 'לדבר' עם האב — האב נותן פונקציה, הילד קורא לה. הזרימה: data למטה, callbacks למעלה.",
      "problem": "ילד לא יכול לראות state של אב. בלי callbacks, אין דרך לבן להודיע שמשהו קרה.",
      "withoutIt": "אין אינטראקציה מ-Children חזרה ל-Parent. UI סטטי.",
      "useWhen": "כל אירוע מהילד שצריך להתבצע אצל האב: lצמירת form, מחיקה, לחיצה על כפתור עם לוגיקה ב-parent."
    },
    "analogies": {
      "grandma": "מספר טלפון של אמא — הילד מתקשר כשצריך עזרה.",
      "child": "כפתור 'לקרוא לאמא' — לוחצים, אמא יודעת מתי לבוא.",
      "soldier": "אות קשר — חייל שולח הודעה למפקד, מפקד מגיב.",
      "student": "Callback prop — closure-bound function, called by child with arguments to communicate upward.",
      "junior": "useCallback ליציבות הפניה כשהילד עטוף ב-React.memo. inline arrow יוצרת חדשה בכל render.",
      "professor": "Inversion of control via continuation-passing; closure captures parent state at definition time."
    }
  },
  "lesson_22::addPost": {
    "deepDive": {
      "purpose": "addPost הוא דפוס סטנדרטי להוספת פריט למערך state — עם immutable update.",
      "problem": "post.push(newPost) לא יעבוד (אותה הפניה).",
      "withoutIt": "TodoList, פיד פוסטים, רשימת מסרים — כולם נשברים.",
      "useWhen": "כל פעם שצריכים להוסיף למערך ב-state. הסינטקס הסטנדרטי: setItems(prev => [...prev, newItem])."
    },
    "analogies": {
      "grandma": "להוסיף ילד חדש לטור — בונים טור חדש שכולל את הילדים הישנים + החדש.",
      "child": "להוסיף קלף לערימה — יוצרים ערימה חדשה במקום לדחוף לישנה.",
      "soldier": "להוסיף חייל לפלוגה — מסדרים פלוגה חדשה עם הקיימים + החדש.",
      "student": "Immutable list-append: setItems(prev => [...prev, newItem]).",
      "junior": "אם רוצים להוסיף בראש: [newItem, ...prev]. בעמדה ספציפית: prev.slice(0,i).concat(newItem, prev.slice(i)).",
      "professor": "Functional update for batching correctness; structural sharing preserved via spread."
    }
  },
  "lesson_22::deletePost": {
    "deepDive": {
      "purpose": "deletePost הוא דפוס למחיקת פריט ממערך state — בלי mutation.",
      "problem": "splice משנה את המערך, ולא יעבוד.",
      "withoutIt": "אי אפשר למחוק מרשימת todos, מצ'אט, מפיד.",
      "useWhen": "כל מחיקה ממערך state. הסינטקס הסטנדרטי: setItems(prev => prev.filter(item => item.id !== id))."
    },
    "analogies": {
      "grandma": "למחוק שם מרשימה — כותבים רשימה חדשה בלי השם הזה.",
      "child": "להסיר קלף מערימה — יוצרים ערימה חדשה בלי הקלף הזה.",
      "soldier": "להוציא חייל מפלוגה — מסדרים פלוגה חדשה בלי החייל.",
      "student": "Immutable filter: setItems(prev => prev.filter(p => p.id !== id)). Stable id over index.",
      "junior": "אם אין id יציב: filter((_, i) => i !== idx). אבל id יציב תמיד עדיף.",
      "professor": "Filtering preserves structural sharing for unaffected elements; new array reference triggers reconciliation."
    }
  },
  "lesson_24::useEffect": {
    "deepDive": {
      "purpose": "useEffect מריץ קוד שצריך 'לקרות בעולם החיצוני' — fetch, listener, timer — אחרי שהקומפוננטה רונדרה למסך.",
      "problem": "אי אפשר לעשות fetch בתוך גוף הקומפוננטה (זה ירוץ בכל רינדור = לופ אינסופי). צריך מקום מבוקר.",
      "withoutIt": "אין דרך נקייה לחבר את הקומפוננטה לעולם — לא ל-API, לא ל-localStorage, לא לאירועי דפדפן.",
      "useWhen": "fetch בעת mount, subscribing ל-events, timers, integration עם libraries חיצוניות."
    },
    "analogies": {
      "grandma": "כמו רשימת משימות שאת עושה אחרי שהילדים נרדמו — לא יכולה לעשות אותן כשהם ערים.",
      "child": "כמו שיעורי בית: לא עושים אותם בכיתה, עושים בבית אחרי בית-ספר.",
      "soldier": "כמו פקודה שמתבצעת רק אחרי תידרוך — קודם מקשיבים, אחר כך פועלים.",
      "student": "Side effects מוקצים ל-lifecycle phase ספציפי — אחרי commit phase של React.",
      "junior": "[deps] קובעת מתי הפונקציה רצה. cleanup רץ לפני הריצה הבאה או ב-unmount.",
      "professor": "Effect system עם subscription model; שומר על referential transparency של הקומפוננטה."
    }
  },
  "lesson_24::side effect": {
    "deepDive": {
      "purpose": "פעולה שיש לה השפעה מחוץ לפונקציה (HTTP, DOM, localStorage). ב-React הן חייבות להיות מבודדות ב-useEffect.",
      "problem": "ב-render phase של React אסור side effects — הן יקרסו את ה-concurrent rendering.",
      "withoutIt": "אין דרך לתקשר עם השרת, לעדכן title, או לשמור localStorage.",
      "useWhen": "כל פעולה שמשפיעה על משהו מחוץ לקומפוננטה — בתוך useEffect."
    },
    "analogies": {
      "grandma": "תופעת לוואי של תרופה — מעבר לאפקט הרצוי, יש משהו נוסף שקורה.",
      "child": "במשחק: צבירת ניקוד היא האפקט. צליל שנשמע = side effect.",
      "soldier": "פעולה צבאית עם השפעות מעבר ליעד — צריך לתכנן ולנהל.",
      "student": "Pure function: input → output. Impure: גם משנה משהו חיצוני.",
      "junior": "side effects ב-component body = רץ בכל render. תמיד דרך useEffect.",
      "professor": "Effects break referential transparency; React isolates them via the effect system."
    }
  },
  "lesson_24::dependency array": {
    "deepDive": {
      "purpose": "השני פרמטר של useEffect — מערך משתנים שקובעים מתי האפקט יחזור. כלי החיצי לשליטה במחזור החיים של אפקט.",
      "problem": "בלי deps, האפקט רץ אחרי כל רינדור — לופ אינסופי כשהוא משנה state.",
      "withoutIt": "fetch בכל רינדור, מאות בקשות לשרת בשניה.",
      "useWhen": "תמיד עם useEffect. [] לpermount, [x] לתלות ב-x, [] לעולם בלי deps."
    },
    "analogies": {
      "grandma": "רשימת תנאים שלפיהם פועלים — 'אם הילד חוזר רטוב, תייבשי אותו'.",
      "child": "כללי המשחק: מתי לפעול. בלי כללים — אנדרלמוסיה.",
      "soldier": "תנאי הפתיחה באש: רק כש-X. Deps array הוא ה-rules of engagement של האפקט.",
      "student": "Object.is comparison לכל איבר. שינוי באחד → אפקט רץ. כולם זהים → דילוג.",
      "junior": "המלכודת: אובייקט/מערך/פונקציה ב-deps יוצרים loop. useMemo/useCallback פותרים.",
      "professor": "Stable identity is required for deps; missing deps cause stale closures, fresh refs cause superfluous reruns."
    }
  },
  "lesson_24::fetching data": {
    "deepDive": {
      "purpose": "הורדת נתונים מהשרת והצגתם — דפוס ליבה בכל אפליקציית React שעובדת מול backend.",
      "problem": "הקומפוננטה מתחילה ריקה — צריך לבקש נתונים, לחכות, ולעדכן state.",
      "withoutIt": "אין נתונים דינמיים — האפליקציה סטטית.",
      "useWhen": "useEffect + fetch + state. או library כמו React Query / SWR לטיפול אוטומטי בcaching/loading/error."
    },
    "analogies": {
      "grandma": "להזמין מנה במסעדה — מבקשים, מחכים, מקבלים.",
      "child": "לבקש משחק מהמורה — מבקשים, היא חוזרת עם המשחק.",
      "soldier": "בקשת ציוד מהאפסנאי — מבקשים, ממלאים טופס, מקבלים.",
      "student": "Network I/O — async pattern. loading/success/error states.",
      "junior": "המלכודת: race conditions בעת שינוי deps. cancelled flag או AbortController.",
      "professor": "Data fetching combines effects + async + state. Modern stack: React Query for caching/dedup; Server Components for server-side fetch."
    }
  },
  "lesson_24::fetch": {
    "deepDive": {
      "purpose": "Web API להחלפת XMLHttpRequest. שולח HTTP request, מחזיר Promise של Response.",
      "problem": "ללא fetch (או alternative) אין דרך לתקשר עם backend מ-JavaScript.",
      "withoutIt": "צריך XMLHttpRequest מורכב או axios — fetch הוא הסטנדרט המודרני.",
      "useWhen": "כל בקשה ל-API/server. בתוך useEffect ב-React."
    },
    "analogies": {
      "grandma": "שליח שאת שולחת — הולך ומביא.",
      "child": "בקשה מהחבר 'תביא לי את הספר'. הוא הולך ומביא.",
      "soldier": "מסר ברדיו — שולחים, ממתינים לתגובה.",
      "student": "HTTP client בנוי על Promises. response.json() לקבלת body.",
      "junior": "fetch לא נופל על 4xx/5xx — חובה לבדוק res.ok ידנית.",
      "professor": "Modern Promise-based HTTP API; supports streams, AbortController, fetch credentials, CORS."
    }
  },
  "lesson_24::state update": {
    "deepDive": {
      "purpose": "קריאה ל-setter שמטריגה re-render. הדרך היחידה לעדכן UI ב-React.",
      "problem": "שינוי משתנה רגיל לא מעדכן UI — חייבים setter.",
      "withoutIt": "UI לא יתעדכן. כל החוויה האדפטיבית של React מתפרקת.",
      "useWhen": "תמיד כשרוצים לשנות state. functional form (prev => next) לעדכונים מרובים."
    },
    "analogies": {
      "grandma": "להחליף את המספר על הלוח — והלוח רואה ומשנה תצוגה.",
      "child": "לקרוא לאמא 'תשני!' — היא מבצעת.",
      "soldier": "פקודת שינוי כוננות — מועברת, מעודכנת, כולם רואים.",
      "student": "Async update + batching ב-React 18. Functional form לעדכונים מבוססי-קודם.",
      "junior": "המלכודת: setX(x+1) ×3 = +1 (snapshot). setX(c=>c+1) ×3 = +3.",
      "professor": "Batched updates within concurrent rendering; functional updaters compose with prior queued state."
    }
  },
  "lesson_24::infinite loop": {
    "deepDive": {
      "purpose": "הבאג השכיח ביותר ב-useEffect — אפקט שמשנה state בלי תנאי עצירה. הבנתו חיונית.",
      "problem": "useEffect → setState → re-render → useEffect → ... ללא סוף. דפדפן מקפיא.",
      "withoutIt": "אם אתה לא מבין את התופעה — אתה תיתקל בה ולא תדע מה לעשות.",
      "useWhen": "אבחון: ראית 'Maximum update depth exceeded'? יש לך infinite loop. בדוק deps וחפש מי משנה state ולמה."
    },
    "analogies": {
      "grandma": "ילד שלוחץ על דלת אוטומטית, היא נפתחת, וכי היא נפתחת — הוא לוחץ שוב. לעולם לא נגמר.",
      "child": "במחשבון: 1+1, אז התוצאה +1, אז התוצאה +1... עד אינסוף.",
      "soldier": "לולאת פקודה שמטריגה את עצמה — חייבת התערבות לעצירה.",
      "student": "Re-render cascade caused by side effect dependent on state mutated by the same effect.",
      "junior": "סיבות נפוצות: missing deps, object/function ב-deps, state שהאפקט עצמו משנה.",
      "professor": "Render-phase fixed-point divergence. React DevMode warns at depth ~25 to break the cycle."
    }
  },
  "lesson_24::useMemo": {
    "deepDive": {
      "purpose": "Hook לזיכרון תוצאה של חישוב. מחזיר את התוצאה השמורה כל עוד deps לא השתנו.",
      "problem": "חישובים יקרים שרצים בכל רינדור מאטים את האפליקציה.",
      "withoutIt": "סינון/מיון/חישוב על רשימה גדולה רץ בכל רינדור גם אם המקור לא השתנה.",
      "useWhen": "1) חישובים יקרים מדידים. 2) יציבות הפניה ל-prop של ילד עטוף ב-React.memo."
    },
    "analogies": {
      "grandma": "לאפות עוגה גדולה ולשמור במקפיא. כל פעם שרוצים פרוסה — לא צריך לאפות מחדש.",
      "child": "לכתוב תשובה במחברת ולחזור אליה. לא לפתור אותה תרגיל שוב.",
      "soldier": "תיק חיצוני ארוז מראש — לא בונים מחדש כשצריך.",
      "student": "Memoization: trade memory for time. Object.is השוואת deps.",
      "junior": "המלכודת: useMemo עצמו עולה. השתמש כשיש בעיית ביצועים מוכחת.",
      "professor": "Memoizes referentially based on deps; aids in maintaining stable references for downstream memoized components."
    }
  },
  "lesson_24::expensive calculation": {
    "deepDive": {
      "purpose": "חישוב שלוקח זמן או משאבים — לולאות גדולות, מיון, סינון, אגרגציה.",
      "problem": "חישוב יקר ברינדור = UI איטי. חוויית משתמש פגומה.",
      "withoutIt": "אין מודעות לאיפה הביצועים נשרפים.",
      "useWhen": "פרופיל עם React DevTools Flamegraph. אם רואים render שלוקח >16ms — זה החשוד."
    },
    "analogies": {
      "grandma": "לאפות עוגה — שעה. לרסק לימון — שניה.",
      "child": "לפתור תרגיל קשה — חצי שעה. לזכור תשובה — שניה.",
      "soldier": "מבצע מורכב מול פעולה רוטינית — שונים בעלות.",
      "student": "Time complexity matters; O(n²) על 1000 פריטים = 1M פעולות.",
      "junior": "כלים: useMemo, virtualization (react-window), web workers, lazy loading.",
      "professor": "Compute-intensive operations should be memoized, deferred (useDeferredValue), or offloaded."
    }
  },
  "lesson_24::memoization": {
    "deepDive": {
      "purpose": "טכניקה כללית של שמירת תוצאות חישוב לפי קלט. ב-React מתבטא ב-useMemo/useCallback/React.memo.",
      "problem": "חישוב/render חוזר על אותם קלטים מבזבז זמן וזיכרון.",
      "withoutIt": "אופטימיזציות פופולריות לא זמינות. ביצועים בינוניים בלבד.",
      "useWhen": "אחרי שאיתרת בעיית ביצועים. לא לפני."
    },
    "analogies": {
      "grandma": "לזכור מחיר במכולת. בפעם הבאה — לא צריך לשאול שוב.",
      "child": "טבלת כפל בעל פה: 7×8 = 56, לא צריך לחשב.",
      "soldier": "פרוטוקול שכבר תורגל — לא בונים מחדש.",
      "student": "Cache lookup with key-based invalidation. Trade space for time.",
      "junior": "טריילוגיה: useMemo (ערכים), useCallback (פונקציות), React.memo (קומפוננטות).",
      "professor": "Premature memoization is anti-pattern. Profile, then optimize."
    }
  },
  "lesson_24::useRef": {
    "deepDive": {
      "purpose": "Hook ליצירת אובייקט {current: x} יציב בין רינדורים. שינוי לא מטריג re-render.",
      "problem": "useState מטריג re-render בכל שינוי. לא תמיד רוצים את זה (לדוגמה ID של timer).",
      "withoutIt": "אין דרך נקייה לגשת ל-DOM או לשמור ערכים מחזורים בלי overhead.",
      "useWhen": "1) DOM access (focus, scroll). 2) Timer/interval IDs. 3) Previous value tracking. 4) First-render flag."
    },
    "analogies": {
      "grandma": "תיק שמחזיקים ביד — תוכן יכול להשתנות, את לא צועקת על כולם.",
      "child": "מחיק שאת לוקחת לכיתה — נשאר אותו מחיק, לא מודיעה לכולם בכל שינוי.",
      "soldier": "ארגז אישי — תוכן משתנה, הארגז קבוע, אין דיווח.",
      "student": "Stable mutable container. Bypasses React's reactivity.",
      "junior": "המלכודת: ref לא מתריע על שינוי. אם UI צריך להגיב — useState.",
      "professor": "Escape hatch for imperative DOM access and non-reactive mutable values; persistent across renders."
    }
  },
  "lesson_24::ref": {
    "deepDive": {
      "purpose": "Prop מיוחד שמצמיד הפניה ל-DOM element או component instance. מאפשר גישה אימפרטיבית.",
      "problem": "ב-React הצהרי אין דרך 'טבעית' לקרוא ל-focus/scroll/measure על element.",
      "withoutIt": "צריכים document.querySelector — לא נקי, לא מסונכרן עם React.",
      "useWhen": "focus, scroll, measurement, integrating non-React libraries."
    },
    "analogies": {
      "grandma": "להחזיק את ידית הדלת — את יודעת איפה היא, יכולה לפתוח.",
      "child": "כתובת בית של חבר — את יכולה ללכת ישר.",
      "soldier": "הקצאת זימון של חייל ספציפי — לא צריך לחפש בכל היחידה.",
      "student": "Reference to a managed entity. ForwardRef + useImperativeHandle for controlled APIs.",
      "junior": "ref={inputRef} → React מציב את ה-element ב-inputRef.current אחרי mount.",
      "professor": "React's escape hatch from declarative paradigm; required for imperative DOM manipulation."
    }
  },
  "lesson_24::ref.current": {
    "deepDive": {
      "purpose": ".current הוא ה-property שמכיל את הערך הנוכחי. שינוי לא מטריג re-render.",
      "problem": "מתחילים מצפים ש-ref.current = X יעדכן UI — לא יקרה.",
      "withoutIt": "אין מודל מנטלי נכון של איך ref עובד.",
      "useWhen": "קריאה לערך אחרי mount, או לאחסון ערך בלי לגרום ל-render."
    },
    "analogies": {
      "grandma": "תוכן הקופסה — משתנה, אבל הקופסה אותה קופסה.",
      "child": "תוך התרמיל — שונה בכל יום, התרמיל אותו תרמיל.",
      "soldier": "תוכן ארגז ציוד — מתחלף, הארגז יציב.",
      "student": "Mutable holder pattern; reference stable, content mutable.",
      "junior": "ref.current לפני mount = null (DOM ref) או הערך של useRef(initial).",
      "professor": "Mutable cell containing the latest value; assignment is non-reactive."
    }
  },
  "lesson_24::DOM element": {
    "deepDive": {
      "purpose": "ייצוג ב-JS של תג HTML. אובייקט עם תכונות (innerHTML, value) ושיטות (focus, click).",
      "problem": "ב-React מנוהל אוטומטית — לרוב לא מתעסקים ישירות. אבל לפעמים צריכים (focus, animation).",
      "withoutIt": "אין יכולת לפעולות אימפרטיביות — animation, focus, scroll.",
      "useWhen": "כל פעם שצריך פעולה שלא מתבטאת ב-state. דרך useRef + ref."
    },
    "analogies": {
      "grandma": "כל פיסה שאת רואה בדף — אלמנט: כפתור, תמונה, טקסט.",
      "child": "כל לבנה ב-LEGO — אלמנט נפרד, אפשר לתפוס.",
      "soldier": "כל חייל ביחידה — אלמנט עם תכונות (תפקיד, מספר).",
      "student": "DOM tree node with properties (style, className, children) and methods.",
      "junior": "ב-React 99% מהזמן — לא נוגעים ישירות. רק עם ref למקרים מיוחדים.",
      "professor": "DOM elements are host objects exposed to JS. React abstracts via VDOM and reconciliation."
    }
  },
  "lesson_24::focus": {
    "deepDive": {
      "purpose": "מציב את הסמן/cursor ב-element. מאפשר הקלדה מיידית בלי לחיצה.",
      "problem": "בלי focus management — UX לקוי. משתמשים נדרשים ללחוץ פעמיים.",
      "withoutIt": "אין נגישות (keyboard navigation), חוויית טופס פגומה.",
      "useWhen": "אחרי modal פותח. אחרי שגיאת validation (focus לשדה). aut-focus ל-input ראשי."
    },
    "analogies": {
      "grandma": "להפנות זרקור על מישהו במופע. עכשיו הוא הבולט.",
      "child": "להצביע על ילד 'אתה הבא' — הוא יודע שתורו.",
      "soldier": "לכוון תשומת לב לחייל ספציפי — מקבל פקודה.",
      "student": "DOM focus method; tabbing order via tabindex; ARIA + a11y considerations.",
      "junior": "ref.current?.focus() ב-useEffect לאחר mount.",
      "professor": "Focus is a11y-critical; trap focus in modals (focus-trap-react), restore focus on close."
    }
  },
  "lesson_24::cleanup": {
    "deepDive": {
      "purpose": "ה-return מ-useEffect — פונקציה שרצה לפני האפקט הבא ובעת unmount. מונעת memory leaks.",
      "problem": "listeners, timers, subscriptions שלא נסגרים = memory leak + שגיאות 'state update on unmounted'.",
      "withoutIt": "אפליקציה איטית עם הזמן (memory leaks), שגיאות אקראיות.",
      "useWhen": "תמיד שיוצרים משהו 'חי': addEventListener → removeEventListener. setInterval → clearInterval. fetch → AbortController."
    },
    "analogies": {
      "grandma": "ניקוי אחרי בישול. כל משחק — סידור.",
      "child": "תורנות בכיתה — מי משתמש, מנקה אחריו.",
      "soldier": "פירוק עמדה אחרי תרגיל — להחזיר מצב ראשוני.",
      "student": "Lifecycle hook for resource disposal. Runs before next effect or on unmount.",
      "junior": "המלכודת: stale closure ב-cleanup. וודא שה-deps מכילים את כל המשתנים הרלוונטיים.",
      "professor": "Cleanup is symmetrical to setup — every subscription/timer/listener requires symmetrical disposal to prevent leaks."
    }
  },
  "lesson_23::Router": {
    "deepDive": {
      "purpose": "ניווט פנימי באפליקציה — מסך אחר לכל URL בלי לטעון מחדש את האתר.",
      "problem": "ב-vanilla, לחיצה על קישור = רענון מלא. SPA דורש שינוי מסך בלי לאבד state ובלי הקפצה.",
      "withoutIt": "כל מסך = HTML שלם, לוגין-state נמחק, חוויה איטית.",
      "useWhen": "כל אפליקציית React מעל מסך אחד."
    },
    "analogies": {
      "grandma": "ספר עם דפים — מחליפים דף בלי לסגור ולפתוח את הספר.",
      "child": "אפליקציית תמונות — את גוללת בין תמונות בלי לחזור הביתה.",
      "soldier": "תפקיד שמתחלף ביחידה אחת — אותו צוות, פעולה אחרת.",
      "student": "Client-side routing maps URLs to components without server roundtrips.",
      "junior": "react-router-dom v6: Routes (לא Switch), element prop (לא component).",
      "professor": "History API-based routing; declarative JSX route configuration."
    }
  },
  "lesson_23::Context API": {
    "deepDive": {
      "purpose": "שיתוף state בין קומפוננטות בעץ בלי להעביר props דרך כל רמה.",
      "problem": "Prop drilling — לעבור theme/user דרך 5 רמות מסורבל.",
      "withoutIt": "props דרך קומפוננטות שלא משתמשות, קוד מסורבל.",
      "useWhen": "data גלובלי (theme, user, language). לא לכל state — overhead של re-renders."
    },
    "analogies": {
      "grandma": "רדיו — שדר אחד, כל מי שמכוון לתדר מקבל.",
      "child": "המורה אומרת לכל הכיתה — כולם שומעים בלי שכל אחד יקבל פתק.",
      "soldier": "תקשורת קולקטיבית — מסר אחד מגיע לכל היחידות.",
      "student": "Dependency injection through React's component tree.",
      "junior": "Provider עוטף, useContext צורך. value יציב עם useMemo.",
      "professor": "Context provides DI through tree; consumers re-render on value change."
    }
  },
  "lesson_23::useNavigate": {
    "deepDive": {
      "purpose": "ניווט פרוגרמטי מקוד — לא מקליק על Link.",
      "problem": "אחרי form submit/login — צריכים לעבור לדף אחר. Link לא מתאים.",
      "withoutIt": "המשתמש נשאר בדף אחרי שליחה. UX רע.",
      "useWhen": "אחרי action הצליחה: login, save, delete. וגם 'back' ו-redirect."
    },
    "analogies": {
      "grandma": "כפתור 'הביתה' — לוחצים, האפליקציה מעבירה.",
      "child": "אחרי שזכית במשחק — אוטומטית עובר למסך הבא.",
      "soldier": "פקודת תזוזה אוטומטית אחרי השלמת משימה.",
      "student": "Imperative navigation API. Programmatic counterpart to declarative Link.",
      "junior": "navigate('/x') — go. navigate(-1) — back. {replace:true} למניעת back-button.",
      "professor": "Imperative history manipulation hook bridging declarative Link."
    }
  },
  "lesson_23::dynamic route": {
    "deepDive": {
      "purpose": "Route אחד שמתאים למספר URLs דומים — /movies/1, /movies/2, /movies/abc.",
      "problem": "בלי dynamic route, צריך להגדיר Route לכל id — לא ניתן.",
      "withoutIt": "URLs קבועים בלבד. אין דפי פרט דינמיים.",
      "useWhen": "כל user/post/product/movie detail page."
    },
    "analogies": {
      "grandma": "תבנית פתק עם 'שם' — אותה תבנית, שם שונה.",
      "child": "כרטיס שחור עם המספר שלך — אותו כרטיס, מספר שונה.",
      "soldier": "תפקיד בשם 'מ\"מ פלוגה' — תפקיד אחד, אדם משתנה.",
      "student": "Parameterized URL pattern. :id placeholder captured via useParams.",
      "junior": "Link to={`/movies/${id}`}. ב-detail: const { id } = useParams(); useEffect deps [id].",
      "professor": "Pattern-matching route definition; parameters extracted as URL-encoded strings."
    }
  },
  "lesson_23::useContext": {
    "deepDive": {
      "purpose": "Hook לקבלת ערך מה-Context הקרוב ביותר. מחליף props בעץ עמוק.",
      "problem": "props drilling דרך 5 רמות.",
      "withoutIt": "כל קומפוננטה צריכה לקבל ולהעביר props.",
      "useWhen": "כל שימוש ב-data שב-Context — תמיד דרך useContext."
    },
    "analogies": {
      "grandma": "להאזין ברדיו — מקבלים את השדר.",
      "child": "מצמידים אוזניות לתדר — שומעים את המורה.",
      "soldier": "מקלט ברדיו — שומעים את התקשורת.",
      "student": "Hook to subscribe to context value; re-renders on change.",
      "junior": "המלכודת: מחוץ ל-Provider — מחזיר defaultValue.",
      "professor": "Hook with implicit dependency on Context Provider; reactive subscription."
    }
  },
  "lesson_23::Provider": {
    "deepDive": {
      "purpose": "עוטף עץ ומספק ערך ל-Context. כל הצאצאים יכולים לצרוך.",
      "problem": "בלי Provider, useContext מחזיר default. אין shared state.",
      "withoutIt": "Context לא עובד.",
      "useWhen": "תמיד עם Context. ב-root או רכיב גבוה בעץ."
    },
    "analogies": {
      "grandma": "תחנת רדיו — משדרת לכל המקלטים.",
      "child": "מורה — כל הילדים בכיתה שומעים.",
      "soldier": "מפקדה — שולחת מסרים ליחידות.",
      "student": "React Context Provider — broadcast value through subtree.",
      "junior": "value object literal = re-renders. useMemo on value.",
      "professor": "Context Provider injects value via React's tree-walk; reference equality on value."
    }
  },
  "lesson_23::Prop Drilling": {
    "deepDive": {
      "purpose": "הבעיה: props עוברים דרך הרבה רמות. הפתרון: Context או composition.",
      "problem": "user → Layout → Sidebar → Nav → UserMenu. Layout/Sidebar/Nav לא משתמשים אבל מעבירים.",
      "withoutIt": "אין הבנה של הבעיה — ימשיך הקוד להיות מסורבל.",
      "useWhen": "מזהים את התופעה: 3+ רמות מעבירות props ללא שימוש. אז מעבירים ל-Context או composition."
    },
    "analogies": {
      "grandma": "להעביר פתק דרך 5 ידיים. מי שצריך מקבל בסוף.",
      "child": "טלפון שבור — כל אחד מעביר, רק האחרון משתמש.",
      "soldier": "מסר דרך 5 קציני קישור — מסורבל וטעון.",
      "student": "Anti-pattern of indirect data passing through intermediate components.",
      "junior": "Solution: Lift state up, Context, or composition (children prop).",
      "professor": "Architectural smell suggesting state lifting or context-based DI."
    }
  },
  "lesson_25::Tailwind CSS": {
    "deepDive": {
      "purpose": "Utility-first CSS framework — utility classes לכל property. עיצוב מהיר ב-className.",
      "problem": "CSS גלובלי = conflicts. CSS-in-JS = runtime cost. Modules = boilerplate.",
      "withoutIt": "כותבים CSS ידני, מנהלים BEM, מחליטים על שמות classes.",
      "useWhen": "כל פרויקט React חדש שלא דורש design system גדול. מהיר מאוד לאב-טיפוסים."
    },
    "analogies": {
      "grandma": "ערכת לבני LEGO לעיצוב — חתיכות מוכנות, מרכיבים מהן.",
      "child": "במקום לערבב צבעים, יש לך פלטה עם צבעים מוכנים.",
      "soldier": "ציוד אישי מטיפוס סטנדרטי — מהיר לארגן.",
      "student": "Atomic CSS approach with single-purpose classes. JIT compilation.",
      "junior": "Mobile-first responsive (sm:, md:, lg:). State variants (hover:, focus:).",
      "professor": "Utility-first methodology; trade-off favoring composition over abstraction."
    }
  },
  "lesson_25::responsive design": {
    "deepDive": {
      "purpose": "האתר מתאים את עצמו לגודל המסך — mobile, tablet, desktop.",
      "problem": "מסכים שונים — אם לא מטפלים, האתר לא נקרא בטלפון.",
      "withoutIt": "טלפונים רואים אתר תקוע, גלילה אופקית, פונטים זעירים.",
      "useWhen": "תמיד. mobile-first מומלץ."
    },
    "analogies": {
      "grandma": "בגד שמתאים את עצמו לגוף — לא משנה הגודל.",
      "child": "כיסא שאת מתאימה לגיל — תינוק או מבוגר.",
      "soldier": "ציוד מודולרי — מתאים לכל סוג משימה.",
      "student": "Mobile-first responsive design via screen-size variants.",
      "junior": "Tailwind breakpoints: sm 640, md 768, lg 1024, xl 1280, 2xl 1536.",
      "professor": "Responsive design via min-width media queries; cumulative breakpoints."
    }
  },
  "lesson_25::flex": {
    "deepDive": {
      "purpose": "Layout חד-מימדי — סידור elements בשורה או עמודה.",
      "problem": "ב-CSS ישן: floats, position absolute. מסורבל לכל פריסה.",
      "withoutIt": "navbar, button row, centering — כל אחד הוא מבצע.",
      "useWhen": "navbar, button row, sidebar+main. ציר אחד."
    },
    "analogies": {
      "grandma": "סידור חיילים בשורה.",
      "child": "מסדרים אגוזים בקופסה ארוכה.",
      "soldier": "פריסה לפי ציר אחד — שורה או עמודה.",
      "student": "CSS Flexible Box; one-dimensional axis-based layout.",
      "junior": "המתכון: flex items-center justify-between gap-4. 90% מהמקרים.",
      "professor": "Single-axis distribution with flex-grow/shrink/basis primitives."
    }
  },
  "lesson_25::grid": {
    "deepDive": {
      "purpose": "Layout דו-מימדי — שורות + עמודות. עוצמתי לטבלאות וגלריות.",
      "problem": "flex לא מספיק לדו-מימדי. nested flex = מסורבל.",
      "withoutIt": "גלריות וטבלאות מורכבות = הרבה קוד.",
      "useWhen": "גלריה, dashboard, table layout, מבנים מסובכים."
    },
    "analogies": {
      "grandma": "שולחן עם שורות ועמודות. כל תא במקום שלו.",
      "child": "לוח שח-מט — קוביות מסודרות.",
      "soldier": "מערך טקטי מסודר — שורות ועמודות.",
      "student": "CSS Grid Layout; two-dimensional with line-based positioning.",
      "junior": "grid-cols-3 gap-4 + grid-cols-1 md:grid-cols-3 ל-responsive.",
      "professor": "2D layout system with explicit/implicit tracks and spanning."
    }
  },
  "lesson_25::add/delete movie": {
    "deepDive": {
      "purpose": "CRUD בסיסי — Create + Delete על list state. דפוס נפוץ ב-React.",
      "problem": "תמיד immutable. push/splice לא יעבדו.",
      "withoutIt": "כל פעם שצריך CRUD — סבל.",
      "useWhen": "כל list state. todos, posts, items, etc."
    },
    "analogies": {
      "grandma": "להוסיף/למחוק שם מרשימה — כותבים רשימה חדשה.",
      "child": "להוסיף קלף לערימה — יוצרים ערימה חדשה.",
      "soldier": "לעדכן רשימת חיילים — תמיד עותק חדש.",
      "student": "Immutable list operations via spread, filter, map.",
      "junior": "addMovie: setMovies(prev => [...prev, x]). deleteMovie: setMovies(prev => prev.filter(...)).",
      "professor": "CRUD on state arrays via immutable transformations."
    }
  },
  "lesson_23::BrowserRouter": {
    "deepDive": {
      "purpose": "BrowserRouter מאפשר ניווט בתוך אפליקציית SPA בלי לרענן את העמוד — המסכים מתחלפים, ה-URL משתנה, אבל הדפדפן לא טוען מחדש.",
      "problem": "באתר רגיל, כל לחיצה על קישור = רענון מלא + מחיקת state. ב-SPA רוצים מהירות + שמירת state.",
      "withoutIt": "כל ניווט מאפס את הקומפוננטות, ה-API נקרא מחדש, חוויית משתמש איטית.",
      "useWhen": "תמיד באפליקציות React SPA. עוטף את כל הקומפוננטות שעושות שימוש ב-Routes/Link."
    },
    "analogies": {
      "grandma": "כמו ספר עם דפים שמתחלפים — הספר אותו ספר, אבל עכשיו את רואה דף אחר.",
      "child": "כמו אפליקציית טיקטוק — מחליפים מסכים אבל האפליקציה לא נסגרת.",
      "soldier": "כמו תפקידים שונים באותה יחידה — אותו צבא, אותם אנשים, אבל פתאום אתה במשרד במקום בשטח.",
      "student": "Client-side routing — ניהול תצוגה ב-JS על בסיס URL בלי בקשת HTML חדש.",
      "junior": "History API + popstate listener. שמירת scroll position אוטומטית.",
      "professor": "URL state synchronization עם component tree; pushState/replaceState manipulation."
    }
  },
  "lesson_26::createContext": {
    "deepDive": {
      "purpose": "createContext יוצר 'תחנת שידור' לערך שיכול להיות זמין בכל קומפוננטה בעץ — בלי להעביר props דרך 10 רמות.",
      "problem": "Prop drilling — להעביר props דרך 5 רמות של קומפוננטות שלא משתמשות בהן רק כדי להגיע לעלה.",
      "withoutIt": "קומפוננטות אמצעיות מתמלאות ב-props שאין להן עניין בהם, עם הזמן הקוד הופך לבלתי-קריא.",
      "useWhen": "Theme, user authentication, language, dark/light mode — דברים שצריכים להיות זמינים בכל מקום."
    },
    "analogies": {
      "grandma": "כמו רדיו שמשדר לכל הבית — כל אחד שיש לו מקלט יכול להאזין, בלי להעביר את החוט פיזית.",
      "child": "כמו וייפי בבית — כל מכשיר מתחבר ויש לו אינטרנט. אין צורך לחבר כבל לכל אחד.",
      "soldier": "כמו רשת קשר — מפקד מודיע פעם אחת, כל היחידות שמוגדרות לתדר הזה שומעות.",
      "student": "Dependency injection ברמת ה-component tree.",
      "junior": "Provider עוטף את העץ. consumer (useContext) שולף ערך. עדכון = re-render לכל הצרכנים.",
      "professor": "Inverse prop drilling דרך React fiber tree עם implicit dependency tracking."
    }
  },
  "lesson_27::interface": {
    "deepDive": {
      "purpose": "interface מגדיר 'חוזה' — אומר איך אובייקט חייב להיראות. ה-compiler מאמת בזמן כתיבה.",
      "problem": "JS דינמי — אפשר לעשות `user.nmae` (typo) ולא לקבל שגיאה עד runtime. בעיה בכל פרויקט גדול.",
      "withoutIt": "באגים מסוג 'undefined is not a function' מתגלים רק אחרי deploy. עלות תיקון x100.",
      "useWhen": "כל אובייקט שעובר בין פונקציות, props של קומפוננטה, response של API."
    },
    "analogies": {
      "grandma": "כמו טופס בבנק — שדות חייבים להיות מלאים ובסדר מסוים. פקיד לא מקבל אם חסר שם.",
      "child": "כמו הוראות הרכבה של LEGO — חייבים את כל החתיכות בסדר נכון.",
      "soldier": "כמו פקודת מבצע: כל הפרטים חייבים להיות, אחרת הפעולה לא יוצאת לפועל.",
      "student": "Structural typing — שני טיפוסים זהים אם יש להם אותם שדות, גם בלי declared inheritance.",
      "junior": "Compile-time safety + autocomplete + refactoring — שלושה ערכים גדולים ל-DX.",
      "professor": "Subtype polymorphism עם variance rules. Duck typing בזמן compile."
    }
  },
  "lesson_ai_development::AI": {
    "deepDive": {
      "purpose": "AI (LLM) מאפשר לתרגם כוונה במילים לקוד/טקסט. הוא מאיץ משימות שיש בהן patterns ומסיר חיכוך משימות שגרתיות.",
      "problem": "כתיבת boilerplate, חיפוש בתיעוד, הסבר קוד זר — צריכת זמן עצומה. AI מצמצם זאת ל-30%-50%.",
      "withoutIt": "שעה של חיפוש ב-Stack Overflow לכל פיצ'ר חדש. עומס קוגניטיבי על משימות לא-יצירתיות.",
      "useWhen": "boilerplate, refactor, הסברי קוד, ניסוח docs/PRs, ובכל מקום שיש pattern שחוזר על עצמו ב-corpus."
    },
    "analogies": {
      "grandma": "כמו רדיו שלמד לדבר — אומר לך מילים בסבירות, אבל לא מבדיל בין נכון לשגוי.",
      "child": "כמו תוכי שלמד 1000 ספרים. הוא יכול לחקות משפטים יפים, אבל לא יודע לבדוק אם זה אמת.",
      "soldier": "כלי כמו GPS — נותן הוראות, אבל אתה האחראי הסופי. אם תיקח אותך לתעלה — באחריותך.",
      "student": "Statistical pattern completion על learned representation. תוצאה: סבירות גבוהה אך לא ערובה.",
      "junior": "מאיץ workflow: boilerplate -> AI, עיון בתיעוד -> AI. הזמן שלי הולך ל-architecture ו-tests.",
      "professor": "Foundational generalist model that performs few-shot tasks via in-context learning over a learned distribution."
    }
  },
  "lesson_ai_development::Cursor": {
    "deepDive": {
      "purpose": "Cursor משלב AI ב-IDE — refactor רב-קבצי, autocomplete חכם, וצ'אט עם הקוד. מאיץ פיתוח ב-30-50%.",
      "problem": "ChatGPT/Copilot לא מבינים את הריפו שלך כיחידה. כל edit דורש copy-paste בין IDE לדפדפן.",
      "withoutIt": "מתכנת מחזיק 10 tabs פתוחים, מעתיק בין IDE ל-LLM. context loss בכל refactor.",
      "useWhen": "refactor רב-קבצי, יישום ספציפי לסטנדרטים של הצוות (.cursorrules), ועזרה תוך כדי כתיבה."
    },
    "analogies": {
      "grandma": "כמו עוזר אישי שיושב לידך עם כל הספרים פתוחים. שואלת — הוא עונה במקום.",
      "child": "כמו מורה פרטי שכבר קרא את כל המחברת שלך. שאלה -> תשובה במשפט אחד.",
      "soldier": "כלי שדה שכבר 'מכיר' את היחידה — הוראות עם context מלא בלי לחזור על הכל.",
      "student": "RAG-augmented IDE: indexing local repo + ranking by similarity for context window.",
      "junior": "Cmd+K מהיר עריכה. Cmd+I לעבודה מורכבת. שלוש שעות חוסכות 30 דקות בכל פיצ'ר.",
      "professor": "Semantic retrieval over an embedded codebase combined with agentic edit loops; HITL approval at write boundaries."
    }
  },
  "lesson_ai_development::Windsurf": {
    "deepDive": {
      "purpose": "Windsurf מציע agent autonomy — לא רק עוזר, אלא מבצע sequence של פעולות (edit + run + retry).",
      "problem": "Cursor/Copilot עוצרים אחרי edit. אבל ב-real workflow צריך לבדוק שזה עובד, לתקן בעיות, ו-iterate.",
      "withoutIt": "כל סיבוב של 'תקן' דורש manual edit + run + paste error + ask again. 5-10 cycles.",
      "useWhen": "משימות מורכבות שדורשות 5+ צעדים: refactor רב-קבצי, מיגרציה, debug עומק, deployment."
    },
    "analogies": {
      "grandma": "כמו עוזרת בית שלא רק מנקה — היא גם הולכת לקנות, מחזירה, וסוגרת הכל בעצמה. אתה מאשר בסוף.",
      "child": "כמו רובוט שהולך, מנסה, חוזר אם נשבר, מנסה שוב. אתה רק מסתכל ומאשר.",
      "soldier": "מפקד צוות אוטונומי — מקבל משימה, מבצע צעדים בעצמו, מדווח ב-checkpoints.",
      "student": "ReAct loop (reason + act): plan -> tool invocation -> observation -> re-plan, עד success/failure.",
      "junior": "אצלי: 'הוסף i18n לכל הקומפוננטות' -> Cascade עובר 30 קבצים, מריץ tests, ואני סוקר בסוף.",
      "professor": "Agentic planning with tool-augmented execution; persistent memory and explicit checkpointing for long-horizon tasks."
    }
  },
  "lesson_ai_development::Claude Code": {
    "deepDive": {
      "purpose": "Claude Code מביא AI agent ל-terminal — מתאים לאוטומציות, CI, ועבודה ללא GUI.",
      "problem": "IDE עוזר אישי. אבל למשימות אוטומציה (build, deploy, mass refactor) צריך headless agent.",
      "withoutIt": "כל משימה דורשת לפתוח IDE. אין דרך טובה לשלב AI ב-cron/CI/scripts.",
      "useWhen": "CI runners, scripts ארוכי-טווח, batch processing, ופתרונות שדורשים composability עם shell."
    },
    "analogies": {
      "grandma": "כמו עוזר שמדבר רק ברדיו — בלי תמונה, רק טקסט, אבל מבצע את כל הפקודות.",
      "child": "כמו צ'אט עם רובוט במשחק. רק הקלדה — אבל הרובוט באמת עושה דברים.",
      "soldier": "כלי field-ready — בלי GUI, פועל ב-bash, אינטגרציה מלאה עם kit הקיים.",
      "student": "Headless LLM agent עם tool-use API; ניתן לקרוא לו מ-script או pipeline.",
      "junior": "claude -p '...' --allowedTools 'Read,Bash' = AI step ב-pipeline שלי. CI בודק וגם מתקן.",
      "professor": "Composable Unix-philosophy AI agent; integrates with shells, tmux, and CI through stdin/stdout streams."
    }
  },
  "lesson_ai_development::ChatGPT": {
    "deepDive": {
      "purpose": "ChatGPT הוא הממשק הנגיש ביותר ל-LLM — צ'אט גנרי, ללא צורך ב-IDE או setup.",
      "problem": "לא תמיד יש את ה-codebase פתוח, לא תמיד יש זמן ל-context full. צריך כלי 'fast question'.",
      "withoutIt": "הסברי קוד דורשים חיפושים ארוכים. ניסוחי docs/PRs לוקחים שעה במקום 5 דקות.",
      "useWhen": "שאלות one-off, brainstorming, debugging של קוד קצר, הסבר error messages, ניסוח טקסטים."
    },
    "analogies": {
      "grandma": "כמו whatsapp עם מורה — שולחים שאלה מתי שצריך, מקבלים תשובה.",
      "child": "כמו לשאול חבר חכם בכיתה — בלי לזוז ממקום.",
      "soldier": "כלי radio: מרים, שואל, מקבל תשובה. בלי תיקיות ובלי setup.",
      "student": "Stateless conversational LLM via web; context לא נשמר בין sessions אלא דרך Memory feature.",
      "junior": "אצלי: בודק error, מבקש 3 חשדות אפשריים. תהליך debug שמהיר ב-3 פעם מ-google.",
      "professor": "Reference UX for foundational LLMs; demonstrates few-shot prompting and the Memory primitive."
    }
  },
  "lesson_ai_development::Copilot": {
    "deepDive": {
      "purpose": "Copilot מספק inline completion מהיר ב-IDE — ידע 'מה השורה הבאה', בלי להפסיק לשאול.",
      "problem": "סגירת חלון הצ'אט בכל שאלה שובר ריכוז. רוב הפעמים אנחנו צריכים השלמה קצרה, לא דיון.",
      "withoutIt": "כל פונקציה דורשת חיפוש דוגמה. boilerplate נכתב ידנית.",
      "useWhen": "כל פיתוח פעיל ב-IDE. במיוחד boilerplate, tests, ושמות משתנים."
    },
    "analogies": {
      "grandma": "כמו תזכורות אוטומטיות בנייד — לפני שסיימת לכתוב, הוא מציע איך להמשיך.",
      "child": "כמו מורה שלוחש לך את הסוף של המשפט בזמן שאתה כותב.",
      "soldier": "Co-pilot באמת — לא מטיס במקום הטייס, רק לוחש קוד הבא.",
      "student": "Low-latency token-completion model integrated via LSP-like extension.",
      "junior": "בעיקר ל-tests ושמות. Cmd+K עדיף ל-edits מורכבים.",
      "professor": "Optimized for inline acceptance metrics; balances completion latency against suggestion quality."
    }
  },
  "lesson_ai_development::Prompt Engineering": {
    "deepDive": {
      "purpose": "Prompt Engineering = מיומנות לכתוב הוראות שמובילות LLM לפלט הרצוי.",
      "problem": "בלי prompt טוב, גם המודל הטוב ביותר נותן פלט גנרי או שגוי.",
      "withoutIt": "10 iterations של 'לא, אחרת' עד שמקבלים מה שרצינו. בזבוז tokens, זמן, ו-tokens.",
      "useWhen": "כל אינטראקציה עם LLM שלא טריוויאלית. pipelines אוטומטיים — חובה."
    },
    "analogies": {
      "grandma": "כמו לבקש ילד לעשות שיעורי בית: 'תכין' לא יעבוד. 'תפתור 5 תרגילים בעמ 12' יעבוד.",
      "child": "כמו במשחק 'שמע פקודה' — ככל שההוראה ברורה, הביצוע מדויק.",
      "soldier": "פקודת מבצע: 5W (who, what, where, when, why). אם חסר אחד מהם — סיכוי לכישלון.",
      "student": "Information-theoretic optimization — להעביר maximal signal ב-minimal tokens.",
      "junior": "אצלי: prompt לא עובד? לא מוסיף סתם — חושב מה חסר במבנה (ROLE? FORMAT? EXAMPLES?).",
      "professor": "Eliciting model behavior through explicit constraints, exemplars, and output schemas."
    }
  },
  "lesson_ai_development::AI Pair Programming": {
    "deepDive": {
      "purpose": "AI Pair Programming = workflow מוגדר של שיתוף עבודה עם AI כ-pair מקצועי.",
      "problem": "סתם שימוש ב-AI מוביל ל-'ship without read'. צריך structure ל-review וביקורת.",
      "withoutIt": "באגים שמגיעים ל-prod כי 'AI כתב, נראה תקין, merge'. חוב טכני שמצטבר.",
      "useWhen": "כל workflow פיתוח. במיוחד למשימות שאתה עוטף בלי ידע מלא."
    },
    "analogies": {
      "grandma": "כמו לבשל עם חבר: אחד פותר, השני בודק. מתחלפים בתפקידים.",
      "child": "כמו עבודה בצמדים בכיתה — אחד כותב, השני קורא ומתקן.",
      "soldier": "Buddy system — אף פעם לא לבד. תמיד יש מבקר.",
      "student": "Distributed cognition — חלוקת עומס מנטלי בין שני 'מוחות'.",
      "junior": "Driver ↔ Navigator. אני נווט (architecture) — AI הוא driver (typing).",
      "professor": "Cognitive load distribution with tight feedback loops; humans retain authority on architecture and merge decisions."
    }
  },
  "lesson_ai_development::AI Code Review": {
    "deepDive": {
      "purpose": "AI Code Review = first-pass linter סמנטי לכל PR — מזהה bugs, security, code smells.",
      "problem": "Reviews ידניים איטיים, ובד\"כ מוגבלים ב-3-4 reviewers. ה-AI מספק review ב-30 שניות.",
      "withoutIt": "PRs מצטברים, reviews שטחיים, באגים שעוברים merge.",
      "useWhen": "כל PR בייחוד נסיוני, large diffs, או PRs של מפתחים juniors."
    },
    "analogies": {
      "grandma": "כמו מורה שעוברת על שיעור הבית עם עט אדום — מהר וצמוד.",
      "child": "כמו לקבל ציון ראשון לפני להגיש למורה. סיכוי לתקן לפני.",
      "soldier": "Pre-mission inspection — לפני שיוצאים לשטח, מנהלים סיקור.",
      "student": "Pattern-matching reviewer — חזק ב-syntax/security, חלש ב-domain logic.",
      "junior": "30% רעיונות טובים, 60% noise. אני סינון אנושי. תמיד יחד עם review אנושי.",
      "professor": "Augments human review by surfacing pattern-level defects; ineffective on architectural and domain-specific concerns."
    }
  },
  "lesson_ai_development::AI Limitations": {
    "deepDive": {
      "purpose": "להכיר מגבלות AI = למנוע disappointments ו-bugs. כלי חזק רק כשמשתמשים בו נכון.",
      "problem": "מפתחים מאמינים ל-AI יותר מדי. תוצאה: imports שלא קיימים, גרסאות מומצאות, חישובים שגויים.",
      "withoutIt": "באגים ב-prod, חוסר אמון בצוות, חזרות מיותרות.",
      "useWhen": "תמיד. רשימת 'הכוחות' ו'החולשות' ליד המסך."
    },
    "analogies": {
      "grandma": "כמו חבר שלמד הרבה אבל לא יצא מהחדר. יודע ספרים, לא יודע מה השעה עכשיו.",
      "child": "כמו ילד שמשלים סיפור בנחושה — יוצא יפה, אבל לא בהכרח אמיתי.",
      "soldier": "כלי שדה: יש מצבים שעובד מצוין, ויש שלא. תכיר את שניהם.",
      "student": "Strengths: pattern completion. Weaknesses: novel reasoning, fresh data, complex math.",
      "junior": "Verify-before-trust — תמיד לבדוק imports, גרסאות, ו-API calls ש-AI מציע.",
      "professor": "Distribution shift, knowledge cutoff, lack of grounding, and miscalibration of confidence."
    }
  },
  "lesson_ai_development::Hallucinations": {
    "deepDive": {
      "purpose": "להבין hallucinations = להבין שLLM 'בטוח' לא שווה 'נכון'. עיקרון מפתח לכל מי שמשתמש ב-AI.",
      "problem": "LLMs לא מסמנים אי-וודאות. כשאינם יודעים, הם ממציאים בנחושה — וזה עובר ל-prod.",
      "withoutIt": "import { magicalHelper } from 'lodash' (לא קיים) -> 30 דקות debug. במצטבר: שעות בכל שבוע.",
      "useWhen": "כל interaction עם AI שמייצר facts: imports, גרסאות, ציטוטים, links."
    },
    "analogies": {
      "grandma": "כמו ילד שמשלים סיפור גם כשלא ראה את ההמשך. לא משקר — פשוט ממלא חללים.",
      "child": "כמו לנחש תשובה בבחינה כי לא ידעת — וכותב אותה בביטחון.",
      "soldier": "מודיעין ש'משלים' פערים ללא מקור — מסוכן.",
      "student": "Autoregressive generation prefers fluency over uncertainty signals.",
      "junior": "אצלי: כל import חדש -> npm view. כל URL -> open. כל גרסה -> ratify.",
      "professor": "Calibration failure: model assigns high probability to plausible-but-false continuations."
    }
  },
  "lesson_ai_development::Context Window": {
    "deepDive": {
      "purpose": "Context Window = ה'זיכרון העובד' של ה-LLM. הבנתו = שליטה ב-limits של מה שאפשר להעביר.",
      "problem": "Context גדול מדי -> truncation או 'lost in the middle'. קטן מדי -> חוסר מידע.",
      "withoutIt": "תשובות נחתכות באמצע, מודל מתעלם מ-instructions, ו-API calls נכשלים.",
      "useWhen": "כל פעם ששולחים prompt גדול, או workflow רב-tokens (chats ארוכים, multi-doc tasks)."
    },
    "analogies": {
      "grandma": "כמו לוח כיתה: יש לו גודל מוגבל. כותבים יותר -> מוחקים מההתחלה.",
      "child": "כמו זיכרון של דייג: זוכר את 5 הדגים האחרונים, את ה-1000 שלפני שכח.",
      "soldier": "תקציב סוללה: הכל עולה — היסטוריה, עזרים, פלט. תכין budget.",
      "student": "Fixed-length attention buffer; quality degrades at >90% utilization.",
      "junior": "תמיד משאיר 20% חופשי ל-output. למשימות ארוכות -> hierarchical summarization.",
      "professor": "Limited working memory with attention bottlenecks; lost-in-the-middle and degraded fidelity at high utilization."
    }
  },
  "lesson_react_blueprint::Component Architecture": {
    "deepDive": {
      "purpose": "ארכיטקטורת קומפוננטות = החלוקה ההגיונית של UI ל-units. בסיס לכל maintainability.",
      "problem": "App של קומפוננטה אחת ענקית = unmaintainable. אבל יותר מדי קומפוננטות קטנות = boilerplate.",
      "withoutIt": "1000 שורות במקום אחד; tests בלתי-אפשריים; כל שינוי קטן שובר 5 מקומות.",
      "useWhen": "מהקומפוננטה הראשונה. שאלה תמיד: 'מה ה-responsibility של זה'?"
    },
    "analogies": {
      "grandma": "כמו לבנות עם LEGO — חלקים קטנים שמתחברים יחד.",
      "child": "כמו מערכת חוגים בבית — כל חדר עם תפקיד, ומסדרון מחבר ביניהם.",
      "soldier": "פלוגות עם תפקידים ברורים — כל אחת מומחית ל-domain שלה.",
      "student": "Atomic Design (atoms/molecules/organisms) + Conway's Law (architecture mirrors team).",
      "junior": "אצלי: feature folders, 50-150 שורות לקומפוננטה, ועומק עץ עד 5 רמות.",
      "professor": "Hierarchical decomposition with explicit interface contracts (props) and bounded ownership."
    }
  },
  "lesson_react_blueprint::State Management": {
    "deepDive": {
      "purpose": "ניהול state = החלטה היכן וכיצד לאחסן 'מה משתנה'. בסיס לביצועים, לוגיקה, ו-UX.",
      "problem": "State במקום הלא נכון = re-renders מיותרים, prop drilling, או נתונים out-of-sync.",
      "withoutIt": "האפליקציה אטית, באגים סינכרון, וקושי ב-debugging.",
      "useWhen": "כל state חדש שאתה מוסיף — שאל: מי קורא? מי כותב? כמה רחוק?"
    },
    "analogies": {
      "grandma": "כמו לבחור איפה לשים מפתחות בבית. כל בחירה משפיעה על נגישות.",
      "child": "במשחק לוח: יש לוח (גלובלי), יש קלפים בידיים (פנימי). ההבחנה קריטית.",
      "soldier": "ניהול ציוד: רובה (אישי), טאקטית (כיתה), אסטרטגי (פלוגה). היררכיה לפי scope.",
      "student": "State locality principle — co-locate state with its readers.",
      "junior": "Local first. Lift only when shared. Context for tree-wide. Store for global.",
      "professor": "Hierarchical state ownership with clear separation between client UI state and server-cached data."
    }
  },
  "lesson_react_blueprint::Data Flow": {
    "deepDive": {
      "purpose": "Data Flow ב-React = unidirectional. מקור אמת אחד, props down, callbacks up.",
      "problem": "Two-way binding = loops סבוכים, debugging קשה, וקוד שקשה לעקוב אחריו.",
      "withoutIt": "באגים שאי-אפשר לאתר — איפה הערך השתנה? מה שינה אותו?",
      "useWhen": "כל component, תמיד. עיקרון של React."
    },
    "analogies": {
      "grandma": "כמו מים בנהר — זורמים בכיוון אחד. לא יכולים למעלה בלי משאבה.",
      "child": "כמו לזרוק כדור: ההורה זורק לילד. הילד מבקש בעזרת קריאה (callback), לא זורק חזרה.",
      "soldier": "שרשרת פיקוד: פקודות מלמעלה למטה, דיווח מלמטה למעלה. סדר ברור.",
      "student": "Unidirectional data flow with referential integrity at the owner.",
      "junior": "Props read-only. הילד לא משנה — קורא ל-callback של ההורה.",
      "professor": "One-way data binding ensures predictable rendering and a single source of truth."
    }
  },
  "lesson_react_blueprint::Composition vs Inheritance": {
    "deepDive": {
      "purpose": "Composition over Inheritance = להעדיף 'has-a' על 'is-a'. עיקרון יסוד ב-OOD ו-React.",
      "problem": "Inheritance מדולל reusability — Tight coupling ושינוי בבסיס משפיע על כל היורשים.",
      "withoutIt": "10 קומפוננטות שיורשות מ-Modal -> שינוי קטן ב-Modal -> 10 רגרסיות.",
      "useWhen": "תמיד ב-React. לחלוקת UI -> children + props. לחלוקת logic -> custom hooks."
    },
    "analogies": {
      "grandma": "כמו פיצה: composition זה לבחור topping. inheritance זה 'ירשת פיצה גבינה'.",
      "child": "כמו LEGO: composition = מרכיבים. inheritance = חייבים את הבסיס.",
      "soldier": "Modular kit > fixed configuration. כל יחידה מורכבת מציוד שעובד יחד.",
      "student": "Has-a > is-a. Composition reduces coupling and increases flexibility.",
      "junior": "Modal עם children, לא class FormModal extends Modal. Custom hooks > HOCs.",
      "professor": "Favor composition (Gang of Four). React enforces functional composition by design."
    }
  },
  "lesson_react_blueprint::Container vs Presentational": {
    "deepDive": {
      "purpose": "הפרדה בין 'מי' מביא נתונים (container) ל'איך נראה' (presentational). מקלה testing ו-storybook.",
      "problem": "כל קומפוננטה עם useEffect+fetch -> mock-hell ב-tests, ו-Storybook עם 5 providers.",
      "withoutIt": "Tests דורשים QueryClient, Router, AuthProvider — boilerplate בכל test.",
      "useWhen": "כל page -> container. כל card/list/widget -> presentational."
    },
    "analogies": {
      "grandma": "מנהל (container) מחליט. שחקן (presentational) מציג. הפרדת תפקידים.",
      "child": "במשרד: מנכ\"ל מחליט, דובר מציג. שניים, לא אחד שעושה הכל.",
      "soldier": "מפקד (container) מחזיק תוכנית. חיילים (presentational) מבצעים.",
      "student": "Separation of impure (data acquisition) from pure (data rendering).",
      "junior": "ProductsPage = useQuery + Spinner + ProductsList. ProductsList = pure props -> JSX.",
      "professor": "Functional core, imperative shell — render layer is pure, side-effects isolated."
    }
  },
  "lesson_react_blueprint::Lifting State Up": {
    "deepDive": {
      "purpose": "Lifting State Up = להזיז state להורה משותף ל-2+ צרכנים. מקור אמת יחיד.",
      "problem": "שני components מנסים לתחזק 'אותו' ערך עצמאית -> out-of-sync.",
      "withoutIt": "Search לא מוצא ב-Results, או Filter לא מתעדכן ב-List.",
      "useWhen": "מיד כש-2+ components צריכים לחלוק ערך. זיהוי: 'המידע צריך להיות משותף'."
    },
    "analogies": {
      "grandma": "כמו לשים שלט TV על שולחן משותף — כולם מגיעים, אחד לוקח בכל פעם.",
      "child": "אחים רבים על השלט -> אבא לוקח. כל אחד מבקש דרכו.",
      "soldier": "מפת מצב במפקדה — כל יחידה רואה את אותו מידע.",
      "student": "Lift state to lowest common ancestor (LCA).",
      "junior": "Search bar + Results -> state ב-App. שניהם מקבלים ב-props.",
      "professor": "Single source of truth at the LCA prevents synchronization drift."
    }
  },
  "lesson_react_blueprint::Code Splitting": {
    "deepDive": {
      "purpose": "Code Splitting = פיצול הbundle ל-chunks שנטענים on-demand. מקטין First Paint דרמטית.",
      "problem": "Bundle ענק (2MB) = First Paint 4 שניות. רוב הקוד לא נצרך בעמוד הראשון.",
      "withoutIt": "משתמשים על mobile/3G נוטשים. SEO נפגע, conversion יורדת.",
      "useWhen": "Routes שלא כולם רואים, ספריות כבדות (charts, editors), features behind feature-flag."
    },
    "analogies": {
      "grandma": "כמו ספר עם פרקים — לא קוראים את כולו לפני שמתחילים.",
      "child": "במשחק: שלב 1 בלבד נטען בהתחלה. שלב 2 כשמגיעים אליו.",
      "soldier": "ציוד שיוצא לשטח רק כשנדרש — פלוגת חבישה לא יוצאת לכל מבצע.",
      "student": "Dynamic imports + bundler chunking + lazy + Suspense.",
      "junior": "אצלי: 4 routes lazy -> 55% שיפור ב-First Paint. בלי לשנות לוגיקה.",
      "professor": "Defers non-critical code via dynamic imports; modern bundlers leverage HTTP/2 multiplexing."
    }
  },
  "lesson_react_blueprint::Performance Optimization": {
    "deepDive": {
      "purpose": "Performance Optimization = לזהות ולתקן bottlenecks. אבל אסור 'אופטימיזציה מוקדמת'.",
      "problem": "אופט' בלי profile = קוד מסובך בלי שיפור, ולפעמים יותר גרוע.",
      "withoutIt": "Apps איטיים, FID גבוה, משתמשים נוטשים.",
      "useWhen": "אחרי profile שמראה bottleneck. לא לפני."
    },
    "analogies": {
      "grandma": "כמו לבדוק ברז דולף לפני שקונים מים מינרליים. תמיד diagnose first.",
      "child": "כמו לבדוק למה אופניים לא נוסעים — אחרי בדיקה, לא לפני.",
      "soldier": "מבצע: מודיעין לפני, לא ירייה עיוורת.",
      "student": "Profile -> identify -> targeted fix. Avoid premature optimization (Knuth).",
      "junior": "אצלי: React DevTools Profiler -> bottleneck = re-render של 1000 cards -> React.memo + useCallback.",
      "professor": "Performance is contextual; optimizations must be guided by measurements within the target environment."
    }
  },
  "lesson_react_blueprint::Error Boundaries": {
    "deepDive": {
      "purpose": "Error Boundaries = רשת ביטחון ל-render errors. מונעים crash מלא של האפליקציה.",
      "problem": "שגיאה ב-component אחד -> white screen לכל המשתמשים. UX איום.",
      "withoutIt": "באג ב-widget של ספק שלישי -> כל ה-app נופל. אובדן conversions.",
      "useWhen": "EB top-level (לאסון), per route (להפסד מקומי), סביב widgets שלישיים (להגנה)."
    },
    "analogies": {
      "grandma": "כמו פיוז בחשמל — מקצר רק חלק מהבית, לא הכל.",
      "child": "כמו דלת אש בבית — שריפה בחדר 1 לא עוברת לכל הבית.",
      "soldier": "Containment — אם יחידה נפגעה, השאר ממשיכים.",
      "student": "Fail-soft semantics — partial degradation > catastrophic crash.",
      "junior": "אצלי: 3 רמות EB. גלובלי -> route -> widget. כל אחד עם logging.",
      "professor": "Localized fault isolation in component trees; preserves global liveness under partial failures."
    }
  },
  "lesson_react_blueprint::Testing Strategies": {
    "deepDive": {
      "purpose": "Testing Strategies = איזון בין coverage, מהירות, ועלות תחזוקה.",
      "problem": "100% E2E -> איטי ושביר. 100% unit -> מפספס integration bugs.",
      "withoutIt": "באגים ב-prod, regressions בכל deploy, ופחד לעשות refactor.",
      "useWhen": "כל קוד שמגיע ל-prod. לפי הפירמידה: הרבה unit, פחות integration, מעט E2E."
    },
    "analogies": {
      "grandma": "כמו לטעום מרק במהלך הבישול — קצת בכל שלב, לא רק בסוף.",
      "child": "כמו לבדוק שיעורי בית: שאלה אחת מהר (unit), כמה יחד (integration), כל הדף (E2E).",
      "soldier": "Field test pyramid — בדיקות יחידה, פלוגה, גדוד. רוב הזמן ביחידות.",
      "student": "Test pyramid (Cohn): cost-feedback tradeoffs at each layer.",
      "junior": "אצלי: 200 unit (3s), 30 integration (15s), 5 E2E (2min). E2E ב-CI על PR.",
      "professor": "Optimal coverage strategy minimizes total cost (writing+maintenance+latency) per defect prevented."
    }
  },
  "lesson_closures::scope chain": {
    "deepDive": {
      "purpose": "scope chain מאפשר לקוד לחפש משתנים בשרשרת של scopes מקוננים — מהפנימי החוצה עד ה-global.",
      "problem": "בלי שרשרת מסודרת לא היה ברור 'איזה x' אנחנו מתכוונים אליו כשיש כמה scopes עם משתנים בעלי אותו שם.",
      "withoutIt": "כל פונקציה הייתה צריכה לקבל את כל המשתנים שלה כפרמטרים — אי אפשר היה לכתוב closures או higher-order functions.",
      "useWhen": "תמיד — בכל פעם שכותבים פונקציה בתוך פונקציה, או משתמשים במשתנה שהוצהר חוץ לפונקציה. הבנה של ה-chain חיונית לחקירת ReferenceError."
    },
    "analogies": {
      "grandma": "כמו לחפש משקפיים: קודם בכיס, אז בתיק, אז בבית, אם אין — בכלל אין. שכבה אחרי שכבה.",
      "child": "לשאול את אמא איפה החטיף; אם אין לה — אבא; אם גם לו אין — סבא. ככה הקוד מחפש משתנה.",
      "soldier": "סדר פיקוד: שואלים תחילה את המ\"מ, אם לא יודע — מ\"פ, אם לא — מח\"ט. הולכים מעלה עד שמקבלים תשובה.",
      "student": "Linked list של LexicalEnvironments. resolution traversal דרך outer pointers.",
      "junior": "כש-eslint זורק 'no-undef' — זה אומר שהמשתנה לא נמצא בכל ה-chain. לבדוק typos ולוודא import.",
      "professor": "ECMAScript [[Environment]] internal slot — chain of EnvironmentRecords; GetBindingValue traverses until found or throws ReferenceError."
    }
  },
  "lesson_closures::lexical scope": {
    "deepDive": {
      "purpose": "Lexical scope = ה-scope של הפונקציה נקבע במיקום הכתיבה בקוד, לא במיקום הקריאה. דטרמיניסטי וניתן לחיזוי.",
      "problem": "Dynamic scope (כפי שיש ב-Bash, Lisp ישן) שינה את ה-scope לפי ה-call site — קוד היה בלתי-צפוי.",
      "withoutIt": "פונקציה הייתה רואה משתנים שונים בכל קריאה, לפי המקום שממנו נקראה. סיוט debugging.",
      "useWhen": "תמיד — JavaScript הוא lexical-scoped. הבנה של זה חיונית לחישוב 'איזה משתנה הפונקציה רואה'."
    },
    "analogies": {
      "grandma": "תמונת מחזור — מי היו הילדים בכיתה ביום הצילום. גם 5 שנים אחר כך, התמונה לא משתנה.",
      "child": "כמו שתופסים תמונה במצלמה: הרגע הזה נשמר. גם אם החדר ישונה — בתמונה הוא נשאר ישן.",
      "soldier": "כמו תיק תיאום פעילות שנכתב בבסיס: גם אם משימה מתבצעת באילת — הוא מתבסס על מה שתואם בבסיס.",
      "student": "Static binding בזמן parse. ה-engine קושר את הפונקציה ל-LexicalEnvironment שלה לעד.",
      "junior": "אם מעבירים פונקציה כ-callback — היא לוקחת איתה את ה-scope המקורי. זה מה שמאפשר closures.",
      "professor": "Lexical scoping creates a fixed binding at parse time, prerequisite for closures, currying, modules, and most functional patterns."
    }
  },
  "lesson_closures::closure": {
    "deepDive": {
      "purpose": "Closure = פונקציה שזוכרת את ה-scope שבו היא נוצרה, גם אחרי שה-scope הזה הסתיים. מאפשר private state, currying, ועוד.",
      "problem": "בלי closures לא היה דרך 'לזכור' מצב פנימי בין קריאות לפונקציה — חייבים היו global variables (מסוכן).",
      "withoutIt": "כל state היה חשוף globally; לא היה אפשר לכתוב Object.factory עם פרטיות, ולא היה event handler שמכיר את ההקשר שלו.",
      "useWhen": "בכל פעם שכותבים function שמחזירה function (factory), event handler עם הקשר, useState/useEffect ב-React, או memoization."
    },
    "analogies": {
      "grandma": "תרמיל גב שלקחת מהבית: גם בבית-הספר יש בו סנדוויץ' מאמא. הפונקציה לוקחת את 'הסנדוויץ'' (המשתנים) שכשעוזבת.",
      "child": "כמו תיבת אוצרות שלקחת מהחדר: גם בטיול היא איתך עם כל הצעצועים שבחרת בבית.",
      "soldier": "כמו תיק עם פקודות אישיות שכל חייל מקבל לפני יציאה למבצע: גם רחוק מהבסיס — הפקודות איתו.",
      "student": "Function + LexicalEnvironment. Captured free variables stored on heap (escape analysis).",
      "junior": "כל hook ב-React, כל callback של event, כל IIFE = closure. הבנת closure = הבנת JS.",
      "professor": "Closure binds function to [[Environment]] internal slot at creation; captured variables are heap-allocated (escape analysis) to outlive the enclosing scope."
    }
  },
  "lesson_closures::closure variables": {
    "deepDive": {
      "purpose": "Variables ש-closure 'תופסת' חיים בזיכרון כל עוד ה-closure חיה. זה מנגנון ה-private state של JS לפני class fields.",
      "problem": "בלי השמירה הזו, שיתוף state בין פונקציות היה דורש global או prototype hacks.",
      "withoutIt": "factory pattern לא היה עובד — אם המשתנה הפנימי היה נעלם בסיום ה-factory, הפונקציה המוחזרת הייתה רואה undefined.",
      "useWhen": "כשצריך private state ב-instance (counter, cache, debounce), event handlers שזוכרים את ההקשר, modules pattern."
    },
    "analogies": {
      "grandma": "יומן סודי בקלמר — רק את יכולה לפתוח. אנשים אחרים לא יכולים לראות מה כתוב.",
      "child": "כספת קטנה במגירה — את יודעת את הקוד, אבא לא. רק את ניגשת לתכולה.",
      "soldier": "מסמכים סודיים שרק קצין מסוים יכול לקרוא. אחרים לא יודעים שהם בכלל קיימים.",
      "student": "Closure-captured variables — bound by reference (shared), heap-allocated, accessible only via the closure.",
      "junior": "התווסף ל-V8 escape analysis: רק משתנים שבאמת נתפסים נשמרים. בעבר — כל ה-scope, מה שגרם memory leaks.",
      "professor": "Free variables bound by reference; mutations are visible across all closures sharing the binding (potential race in async)."
    }
  },
  "lesson_closures::stale closure": {
    "deepDive": {
      "purpose": "Stale closure = closure שתופסת ערך של state ב-snapshot ישן ולא מתעדכנת. המקור #1 לבאגים ב-React.",
      "problem": "כל רינדור ב-React יוצר closures חדשות. אם useEffect/useCallback רושם callback פעם אחת — הוא נשאר עם ה-state ההתחלתי.",
      "withoutIt": "אם לא מבינים את הבעיה — הקוד 'עובד' בפעם הראשונה אבל מפסיק לעדכן אחר כך, ללא שגיאה ברורה.",
      "useWhen": "תמיד לחשוד ב-stale closure כש-setInterval/setTimeout/event listener בתוך useEffect לא רואה את ה-state העדכני."
    },
    "analogies": {
      "grandma": "צילום של החדר מלפני שנה — הצעצועים הישנים נראים, אבל היום יש אחרים.",
      "child": "מכתב שכתבת לעצמך לפני שבוע: 'יש לי 50 שקל'. אם הוצאת בינתיים — המכתב עדיין אומר 50.",
      "soldier": "פקודה ישנה שלא עודכנה: החייל ממשיך לפעול לפי המידע הראשוני, גם אחרי שהמצב השתנה בשטח.",
      "student": "Closure-captured value at definition; if state evolves later, the captured snapshot diverges. Fix: functional update (prev => next) or useRef.",
      "junior": "כש-eslint-plugin-react-hooks אומר 'missing dependency' — תקשיב! זה מצביע על stale closure פוטנציאלית.",
      "professor": "Long-lived callbacks closing over render-scoped variables suffer staleness. Mitigations: functional state updates, refs holding mutable current values, refreshing the closure via correct dependency arrays."
    }
  },
  "lesson_closures::closure in event handlers": {
    "deepDive": {
      "purpose": "כל event handler הוא closure על ה-scope שבו הוצהר. ב-React: handler חדש בכל רינדור, רואה state עדכני (אלא אם useCallback עם deps לא נכונים).",
      "problem": "ב-vanilla JS handler נרשם פעם אחת — closures מקפיאות את הערכים. שינוי משתנה אחר-כך לא מתעדכן ב-handler.",
      "withoutIt": "אם לא מבינים את ההתנהגות הזו — נראה לעצמך 'למה הכפתור עדיין מציג ערך ישן?'.",
      "useWhen": "כשרושמים event handler ב-vanilla JS, להעדיף לתפוס ערכים בפרמטרים. ב-React — להשתמש ב-functional updates."
    },
    "analogies": {
      "grandma": "ילד שהבטיח 'אם יצלצל הטלפון, אגיד לאמא'. גם 5 שעות אחר כך — הוא זוכר את ההבטחה.",
      "child": "חבר שהבטחת לו 'אם יבוא הגלידה, תקנה לי'. זה תקף גם בעוד שבוע.",
      "soldier": "ערנות מבצעית: אם פקודת ירי תגיע — תפעל לפי ההוראות שניתנו לך בבוקר.",
      "student": "Handler captures the lexical environment at registration. React re-renders generate fresh handlers; vanilla JS handlers persist their original closure.",
      "junior": "Pattern לקרוא לפעולה עם props נכונים: setupHandler(props) → returns handler עם closure על props אלה.",
      "professor": "DOM event registration creates a closure-bound function reference; updates require either re-registration or indirection via mutable refs."
    }
  },
  "lesson_closures::closure in useEffect": {
    "deepDive": {
      "purpose": "useEffect's callback הוא closure על ה-state/props של הרינדור שבו הוא רץ. deps array קובעים מתי לקרוא לו מחדש (=ליצור closure חדשה).",
      "problem": "deps לא נכונים → closure ישנה → state גלוי כ-stale. ה-bug #1 שכל מתחיל ב-React נתקל בו.",
      "withoutIt": "בלי הבנה של closures, אי אפשר לתחזק קוד React מורכב. כל באג של 'ה-state לא מתעדכן' מקורו פה.",
      "useWhen": "בכל useEffect/useCallback/useMemo. תמיד לכלול ב-deps את כל המשתנים שה-callback משתמש בהם, או להשתמש ב-functional update."
    },
    "analogies": {
      "grandma": "ההוראה שכתבת על דף — היא נשארת אותה, גם אם המצב סביב משתנה. רק אם תכתוב מחדש — תקבל הוראה עדכנית.",
      "child": "ההוראה של אמא מהבוקר — נשארת אותה. רק אם אמא תגיד עוד הפעם, יהיה עדכון.",
      "soldier": "פקודה שניתנה ב-08:00. כל זמן שלא עודכנה — פועלים לפיה. עדכון = פקודה חדשה (deps שמשתנים).",
      "student": "useEffect captures render's lexical environment. The deps array is React's signal to re-execute (new closure) or skip (reuse stale closure).",
      "junior": "כשעובדים עם setInterval ב-useEffect — לא לסמוך על state בלי functional update. תמיד setX(prev => ...).",
      "professor": "Empty deps freeze the effect to mount; non-empty deps create dependency-driven re-execution. Functional updates and refs decouple captured values from update mechanics."
    }
  },
  "lesson_closures::closure in setTimeout": {
    "deepDive": {
      "purpose": "ה-callback של setTimeout נוצר עם closure על המשתנים ברגע ההגדרה. כשhe יורה — JS משתמש בה.",
      "problem": "לולאה עם var + setTimeout = הבעיה הקלאסית: כל ה-callbacks חולקים את אותו var (function-scoped).",
      "withoutIt": "אם לא מבינים את ה-snapshot: 'למה כל setTimeout מדפיס 3?' לא יתקבל תיקון נכון.",
      "useWhen": "בכל פעם שמשתמשים ב-setTimeout/setInterval בתוך לולאה. בכל קומפוננטת React שצריכה timer."
    },
    "analogies": {
      "grandma": "מכתב שתקבעי לעצמך לעוד שבוע: 'יש לי 50 שקל'. אם הוצאת בינתיים — המכתב לא ישתנה.",
      "child": "מתנה שהבטחת לחבר ליום הולדת: 'אביא לך מהמתנות שלי כעת'. אם אבא יקנה לך עוד — לא בהבטחה.",
      "soldier": "פקודה שתוכננה ל-לילה: 'תפנה לקונסול A'. מה שמשתנה ביום — לא משפיע על ההוראה.",
      "student": "Callback captures variables by reference at definition; var loop binding is shared, let creates per-iteration binding.",
      "junior": "זוהי הבעיה הראשונה ב-debugging: הפרש בין 'המשתנה כשהקוד נכתב' ל'המשתנה כשהוא רץ'. let מתקן את זה ברוב המקרים.",
      "professor": "setTimeout's callback closure captures variables by reference; loop var sharing causes the canonical 3-3-3 bug. Use let or IIFE for per-iteration capture."
    }
  },
  "workbook_taskmanager::Task Manager": {
    "deepDive": {
      "purpose": "Task Manager הוא ה-Hello World של אפליקציות אינטראקטיביות — בנייתו מציגה את לולאת state→render→event→state.",
      "problem": "מתחיל ב-vanilla JS צריך פרויקט פשוט אך שלם שמדגיש את כל יסודות הקוד הצדדי בלקוח.",
      "withoutIt": "בלי פרויקט מאחד, התלמיד לומד מושגים בנפרד אבל לא יודע איך הם משתלבים לאפליקציה אחת.",
      "useWhen": "כל פעם שמלמדים JS חדש — Task Manager הוא ה-baseline שכולם מכירים: ב-jQuery, ב-React, ב-Vue, ב-Svelte."
    },
    "analogies": {
      "grandma": "רשימה על המקרר עם פתקים — מה לקנות, מה כבר עשיתי. אפליקציה דיגיטלית של אותו רעיון.",
      "child": "לוח מטלות לבית-ספר — שיעורי בית, פרויקטים. סימון V כשמסיימים.",
      "soldier": "תיק משימות יומי של מ\"כ — מה צריך לבצע, מה הסתיים. סדר מלא.",
      "student": "פרויקט CRUD מינימלי שמדגים state, rendering, event handling, ו-persistence.",
      "junior": "ראיון frontend טיפוסי: 'בנה לי Task Manager ב-15 דקות'. אם שולטים — בונים גם אפליקציה גדולה.",
      "professor": "Exemplifies unidirectional data flow: state as single source of truth, view as derivation, events as dispatch — the architecture template behind every modern UI framework."
    }
  },
  "workbook_taskmanager::variables": {
    "deepDive": {
      "purpose": "משתנה הוא 'תיוג' של ערך בזיכרון. ב-Task Manager: tasks, nextId, ו-STORAGE_KEY הם המשתנים המרכזיים.",
      "problem": "בלי משתנים אי אפשר היה לזכור ערכים בין שורות קוד — הקוד היה stateless ולא שימושי.",
      "withoutIt": "כל פעולה הייתה צריכה לקבל את כל המידע כארגומנטים. בלתי אפשרי לבנות משהו מורכב.",
      "useWhen": "תמיד. const כברירת מחדל; let רק כשהערך משתנה. var כמעט בלתי-נחוץ בקוד מודרני."
    },
    "analogies": {
      "grandma": "תווית על קופסה: 'מתכונים'. כשמחפשים מתכון — יודעים איזו קופסה לפתוח.",
      "child": "תיוג של חבר במשחק — 'אתה אדום, אני כחול'. כל אחד יודע מי הוא.",
      "soldier": "מספר אישי של חייל — הזיהוי הקבוע שלו במערכת.",
      "student": "Block-scoped binding (let/const) ב-Temporal Dead Zone עד הצהרה.",
      "junior": "ההבדל בין const ו-let בפרויקט = ניקיון. כש-const שולט — קל לראות מה משתנה ומה לא.",
      "professor": "let/const introduce TDZ bindings; const enforces binding-immutability (not transitive value-immutability)."
    }
  },
  "workbook_taskmanager::conditions": {
    "deepDive": {
      "purpose": "תנאים שולטים בזרימה: 'אם X — תעשה Y'. ב-Task Manager: validation של קלט, רינדור מותנה של checkbox, וכו'.",
      "problem": "בלי תנאים, כל הקוד היה רץ באותה צורה תמיד — אי אפשר היה להגיב למצבים שונים.",
      "withoutIt": "Task Manager היה מתרסק ברגע שמשתמש מכניס קלט ריק. אי אפשר היה להציג הודעות שגיאה.",
      "useWhen": "תמיד — בכל validation, בכל UI מותנה, בכל decision logic."
    },
    "analogies": {
      "grandma": "אם יורד גשם — לקחת מטרייה, אחרת — בלי. החלטה פשוטה לפי תנאי.",
      "child": "במשחק לוח: 'אם נפלת על אדום — חזור 3 צעדים'. כללים מותנים.",
      "soldier": "אם מטרה זוהתה — דווח. אם לא — המשך סיור. החלטה מבצעית.",
      "student": "Boolean coercion (ToBoolean) → branching logic. ternary, switch, && / || / ?? short-circuit.",
      "junior": "Validation עם 'truthy' פוסל גם רווחים בודדים: if (!str.trim()). זה מונע באגים נסתרים.",
      "professor": "Branching is the substrate of computation; lack of conditionals reduces to constant function — utterly trivial."
    }
  },
  "workbook_taskmanager::arrays": {
    "deepDive": {
      "purpose": "מערך מאחסן רצף ערכים תחת שם אחד. ה-Task Manager שלם נשען על מערך אחד: tasks[].",
      "problem": "בלי מערכים — צריך משתנה נפרד לכל איבר (item1, item2...). בלתי אפשרי לטפל ב-100+ items.",
      "withoutIt": "אי אפשר היה ליצור רשימות, היסטוריות, או אוספים — הבסיס לכל אפליקציה.",
      "useWhen": "כל פעם שיש אוסף של 'דברים מאותו סוג' — משתמשים, הזמנות, משימות, היסטוריה."
    },
    "analogies": {
      "grandma": "עגלת קניות: שורה של מוצרים, אפשר לקפוץ לכל שורה לפי המספר שלה.",
      "child": "ארון בגדים עם מגירות ממוספרות — מגירה 0, 1, 2... כל אחת עם פריט.",
      "soldier": "פלוגה: כל חייל עם מספר אישי. אפשר לקרוא בשם או 'מספר 7'.",
      "student": "Heterogeneous indexed collection; O(1) random access; methods divide mutating vs non-mutating.",
      "junior": "filter/map יוצרים מערך חדש (immutable) — דפוס שעובר חלק ל-React. push/splice מסוכנים אם משתפים reference.",
      "professor": "JS arrays implement int-keyed properties on Object with auto-managed length; V8 specializes packed-SMI/double/object arrays for performance."
    }
  },
  "workbook_taskmanager::objects": {
    "deepDive": {
      "purpose": "אובייקט הוא mapping של key→value. ב-Task Manager: כל משימה היא { id, title, done, createdAt }.",
      "problem": "בלי אובייקטים אי אפשר היה לקבץ נתונים שייכים תחת מבנה אחד — היינו צריכים מערכים מקבילים מסובכים.",
      "withoutIt": "task.title ו-task.done היו במערכים נפרדים שצריך לסנכרן ידנית. סיוט תחזוקה.",
      "useWhen": "תמיד שיש 'ישות' עם תכונות — משתמש, הזמנה, משימה, מוצר. כשממדלים שם דברים מהעולם הפיזי."
    },
    "analogies": {
      "grandma": "תיק עם מגירות עם שמות: 'תרופות', 'מסמכים'. גישה ישירה לפי השם.",
      "child": "כרטיס משחק: 'שם: דרקון, חיים: 100, התקפה: 50'. כל שדה יש לו שם.",
      "soldier": "תיק אישי של חייל — שם, מספר, יחידה, דרגה. מסודר ומאוחד.",
      "student": "Hash maps with prototype chain. Property access via dot or bracket notation.",
      "junior": "spread (...) ו-destructuring הם הכי שימושיים: { ...task, done: true } יוצר עותק עם שינוי.",
      "professor": "Objects are heap-allocated property bags with prototype-based inheritance; V8 uses hidden classes for monomorphic shape-based optimization."
    }
  },
  "workbook_taskmanager::functions": {
    "deepDive": {
      "purpose": "פונקציות הן יחידות לוגיקה שאפשר לקרוא להן שוב ושוב. ב-Task Manager: addTask, removeTask, render, save, load.",
      "problem": "בלי פונקציות, כל פעולה הייתה דורשת copy-paste של אותו קוד — תחזוקה הייתה גיהינום.",
      "withoutIt": "שינוי קטן בלוגיקה היה דורש עדכון בעשרות מקומות. באגים לא מתואמים בין copy-paste.",
      "useWhen": "תמיד שיש לוגיקה שחוזרת על עצמה, או שיש לוגיקה שלוקחת מקום משמעותי בקוד והופכת אותו לקשה לקריאה."
    },
    "analogies": {
      "grandma": "מתכון: רשימת הוראות. הוצאת מהמדף, אכלת — אפשר להכין שוב מחר.",
      "child": "כפתור 'פתח' באוטומט — שמים מטבע, יוצא ממתק. אותה פעולה בכל פעם.",
      "soldier": "פרוצדורה מבצעית — סדר פעולות מוגדר, מבוצע בכל פעם שצריך.",
      "student": "First-class objects: assignable, passable, returnable. Closures + lexical scoping enable powerful patterns.",
      "junior": "פונקציה קטנה וברורה אפשר לבדוק יחידה־יחידה. שיפור הקריאות = שיפור התחזוקה.",
      "professor": "Lambda calculus foundation; arrow functions lexically bind this, enabling clean callbacks while preserving outer context."
    }
  },
  "workbook_taskmanager::DOM": {
    "deepDive": {
      "purpose": "DOM הוא ה-API של הדפדפן ל-HTML — עץ של nodes שאפשר לשנות ב-JS. ב-Task Manager: render() מצייר את ה-tasks ל-DOM.",
      "problem": "בלי גישה ל-DOM אי אפשר לבנות UI דינמי — ה-HTML היה סטטי לחלוטין.",
      "withoutIt": "כל שינוי בתצוגה היה דורש refresh של העמוד. לא הייתה אינטראקטיביות.",
      "useWhen": "בכל אפליקציית web. ב-React/Vue זה קורה תחת כיסוי של Virtual DOM, אבל הבסיס זהה."
    },
    "analogies": {
      "grandma": "עץ של תיבות בתוך תיבות — בכל קומה יש דברים. אפשר להוסיף, להסיר, להחליף.",
      "child": "ארגז Lego ענק — כל חתיכה מתחברת לאחרת בסדר מסוים.",
      "soldier": "עץ פיקוד: יחידות בתוך יחידות. אפשר לשנות הקצאה של חייל מיחידה ליחידה.",
      "student": "Tree of Node objects with parent/children pointers. Mutations trigger reflow + repaint.",
      "junior": "innerHTML מוחק listeners — לכן ב-render rebuild אסור לסמוך על ש-handlers ישנים יישארו.",
      "professor": "DOM is a language-agnostic tree API; modern frameworks abstract it via virtual DOMs to batch and minimize layout thrash."
    }
  },
  "workbook_taskmanager::events": {
    "deepDive": {
      "purpose": "events הם ה-API להגיב לפעולות משתמש: click, keydown, scroll, submit. ב-Task Manager: handler על addBtn, על input, על list.",
      "problem": "בלי events לא הייתה אינטראקטיביות — האפליקציה הייתה רק תצוגה סטטית.",
      "withoutIt": "אי אפשר היה לקבל קלט ממשתמש, לשמור הזמנות, או לבנות שום אפליקציית web אמיתית.",
      "useWhen": "בכל UI אינטראקטיבי. ב-React: onClick, onChange, onSubmit הם wrappers על אותו מנגנון."
    },
    "analogies": {
      "grandma": "פעמון בכניסה: כשצולצל — הולכים לפתוח. תגובה לאירוע.",
      "child": "סנסור של 'מחיאת כפיים' שמדליק נורה — אירוע (כפיים) → תגובה (אור).",
      "soldier": "נורת אזעקה: פעולה מסוימת מפעילה דווח דרך הקו. תגובה אוטומטית לאירוע.",
      "student": "Three-phase propagation: capture → target → bubble. Delegation exploits bubbling for efficient list management.",
      "junior": "Event delegation עם listener על parent + e.target — חוסך listeners פר item, עובד גם על items חדשים.",
      "professor": "DOM event model with capture/bubble propagation enables both narrow and broad event handling strategies; passive listeners and AbortController augment modern usage."
    }
  },
  "workbook_taskmanager::localStorage": {
    "deepDive": {
      "purpose": "localStorage שומר string key-value בדפדפן, נשאר אחרי refresh ו-close. ב-Task Manager: שמירת הרשימה לעד.",
      "problem": "בלי persistence — כל refresh מוחק את העבודה. אפליקציות צריכות זיכרון.",
      "withoutIt": "Task Manager היה ריק בכל כניסה. חוויית משתמש בלתי-נסבלת.",
      "useWhen": "ל-state קל בצד הלקוח: preferences, draft, theme. לא ל-state רגיש (לא מוצפן) או מסיבי."
    },
    "analogies": {
      "grandma": "תיבת אוצרות בארון — סוגרים את הבית, חוזרים אחרי שבוע, האוצרות עדיין שם.",
      "child": "תיקיית תוכן במחשב — נשמר עד שמוחקים. רענון לא משפיע.",
      "soldier": "מחסן בסיס שמור — חוזרים מחיל שאר וכולם מצפים שהציוד יישאר במקום.",
      "student": "Synchronous string KV store, ~5MB quota per origin, persists until explicit clear.",
      "junior": "תמיד JSON.stringify לכתיבה ו-JSON.parse לקריאה. עוטף ב-try/catch כי הפורמט עלול להיות שבור.",
      "professor": "Synchronous Web Storage API blocks the main thread; for large/async needs prefer IndexedDB. Quota errors throw QuotaExceededError."
    }
  },
  "workbook_taskmanager::try/catch": {
    "deepDive": {
      "purpose": "try/catch לוכד שגיאות runtime במקום לתת להן להפיל את האפליקציה. ב-Task Manager: עוטף load() כי JSON.parse עלול להיכשל.",
      "problem": "בלי try/catch — כל שגיאה ב-runtime עוצרת את הקוד. סוג של 'מסך לבן של המוות'.",
      "withoutIt": "JSON.parse(שבור) → כל ה-app לא נטען. localStorage מלא → addTask משבית הכל.",
      "useWhen": "סביב כל פעולה שעלולה להיכשל ב-runtime: parse, network, storage, file I/O."
    },
    "analogies": {
      "grandma": "רשת ביטחון מתחת לחבל הלוליין — אם נופלים, נחים בבטחה ולא נשברים.",
      "child": "כריות-אוויר בעוטף תיק האוכל — אם נופל, הכל נשמר.",
      "soldier": "ESL — Emergency Standard Procedure: כשמשהו משתבש, יודעים מה לעשות.",
      "student": "Synchronous error propagation up the call stack until caught; finally guarantees cleanup.",
      "junior": "catch ריק = פשע. תמיד לפחות log. ועדיף — fallback של חוויית משתמש.",
      "professor": "Exceptions as control flow primitives; async/await transforms async errors into synchronous-looking try/catch flows."
    }
  },
  "workbook_taskmanager::fetch": {
    "deepDive": {
      "purpose": "fetch הוא ה-API לבקשות HTTP מ-JS. ב-Task Manager המתקדם: fetch לטעינה ושמירה לשרת.",
      "problem": "XMLHttpRequest הקודם היה מסורבל ולא Promise-based. קוד אסיני היה גיהינום של callbacks.",
      "withoutIt": "לא הייתה תקשורת עם שרת — הקוד היה limited ללוקאל לחלוטין.",
      "useWhen": "בכל אפליקציית web שמתקשרת עם שרת/API. הבסיס לכל library גדולה (axios, ky)."
    },
    "analogies": {
      "grandma": "שליחת שליח לחנות עם רשימה — הוא חוזר עם המוצרים. רק שעשרות שליחים יכולים לרוץ במקביל.",
      "child": "יונת דואר עם פתק — שולחים שאלה, היא חוזרת עם התשובה.",
      "soldier": "קשר רדיו עם מטה — שואלים, מקבלים תשובה. מהיר ומבוסס פרוטוקול.",
      "student": "Promise-based, low-level. Doesn't reject on HTTP errors — must check res.ok manually. Body is read-once stream.",
      "junior": "תמיד if(!res.ok) throw. תמיד try/catch סביב await fetch. AbortController למנוע race conditions.",
      "professor": "fetch is a low-level Promise-based primitive; HTTP error semantics are decoupled from network errors. Streams enable backpressure-aware body consumption."
    }
  },
  "workbook_taskmanager::async/await": {
    "deepDive": {
      "purpose": "async/await הוא syntactic sugar ל-Promises שהופך קוד אסינכרוני לקריא כמו סינכרוני. ב-Task Manager: כל פעולה עם השרת.",
      "problem": "Promise chains עם .then() מקוננים = 'callback hell בגרסה חדשה'. קשה לעקוב, קשה לטפל בשגיאות.",
      "withoutIt": "כל קוד עם then() מסבך את הזרימה. error handling ב-catch של Promise חולש על הרבה.",
      "useWhen": "כל פעם שעובדים עם Promises — fetch, file I/O, IndexedDB. דפוס הסטנדרט מ-ES2017."
    },
    "analogies": {
      "grandma": "להגיד 'תחכה לי לפני שתאכל' — מובן וברור. במקום הבטחה מסובכת של 'אכין ואז אגיד ואז'.",
      "child": "תור הפעולות במשחק: 'await תפנה למקרר; await קח חטיף; await חזור'.",
      "soldier": "פרוצדורה ברורה: 'await לקבל פקודה, await לאשר, אז לבצע'. סדר ברור.",
      "student": "Built on Promises; await suspends the function and yields to the event loop. Errors via try/catch.",
      "junior": "forEach + async לא מחכה! צריך for...of או Promise.all. מלכודת קלאסית של הסבה מ-then ל-await.",
      "professor": "async/await is generator-driven sugar over Promises; await unwraps PromiseValue or throws PromiseRejection, integrating asynchronous control flow into structured synchronous-style syntax."
    }
  }
};

// Export for browser
if (typeof window !== "undefined") {
  window.CONCEPT_ENRICHMENT = CONCEPT_ENRICHMENT;
}
