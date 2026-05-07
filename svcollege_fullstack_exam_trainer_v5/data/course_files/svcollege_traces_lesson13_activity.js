// data/svcollege_traces_lesson13_activity.js
// P6.3.1 — real Trace activity coverage for SVCollege lesson 13 gaps.

var SVCOLLEGE_LESSON13_ACTIVITY_TRACES = [
  {
    id: "trace_l13_append_child_001",
    conceptKey: "lesson_13::appendChild",
    level: 3,
    title: "appendChild מוסיף אלמנט לסוף ההורה",
    code:
      "const list = document.createElement('ul');\n" +
      "const item = document.createElement('li');\n" +
      "item.textContent = 'Array';\n" +
      "list.appendChild(item);\n" +
      "console.log(list.children.length);\n" +
      "console.log(list.children[0].textContent);",
    steps: [
      {
        line: 4,
        prompt: "מה appendChild מוסיף לתוך list?",
        answer: "li",
        acceptable: ["li", "item", "אלמנט li"],
        hint: "item הוא אלמנט li שנוצר לפני הקריאה.",
      },
      {
        line: 5,
        prompt: "כמה ילדים יש ל-list אחרי appendChild?",
        answer: "1",
        acceptable: ["1"],
        hint: "הוספנו ילד אחד בלבד.",
      },
      {
        line: 6,
        prompt: "מה הטקסט של הילד הראשון?",
        answer: "Array",
        acceptable: ["Array"],
        hint: "לפני ההוספה קבענו item.textContent לערך Array.",
      },
    ],
    explanation:
      "appendChild מחבר node קיים לסוף רשימת הילדים של ההורה. אחרי ההוספה אפשר לגשת אליו דרך children.",
    requiredConcepts: ["lesson_13::appendChild", "lesson_13::createElement"],
    requiredTerms: ["appendChild", "child node", "parent element"],
  },
  {
    id: "trace_l13_attribute_001",
    conceptKey: "lesson_13::attribute",
    level: 3,
    title: "attribute שומר מידע על אלמנט",
    code:
      "const link = document.createElement('a');\n" +
      "link.setAttribute('href', '/lessons');\n" +
      "link.setAttribute('data-route', 'lesson');\n" +
      "console.log(link.getAttribute('href'));\n" +
      "console.log(link.getAttribute('data-route'));",
    steps: [
      {
        line: 2,
        prompt: "איזה attribute מקבל את הערך /lessons?",
        answer: "href",
        acceptable: ["href"],
        hint: "השם הראשון שנשלח ל-setAttribute הוא שם ה-attribute.",
      },
      {
        line: 4,
        prompt: "מה יודפס עבור href?",
        answer: "/lessons",
        acceptable: ["/lessons"],
        hint: "getAttribute מחזיר את הערך שנשמר ב-attribute.",
      },
      {
        line: 5,
        prompt: "מה הערך של data-route?",
        answer: "lesson",
        acceptable: ["lesson"],
        hint: "data-route הוא attribute מותאם אישית שנשמר על האלמנט.",
      },
    ],
    explanation:
      "Attribute הוא מידע שמוצמד לאלמנט HTML, כמו href, id, class או data-*.",
    requiredConcepts: ["lesson_13::attribute", "lesson_13::setAttribute"],
    requiredTerms: ["attribute", "setAttribute", "getAttribute"],
  },
  {
    id: "trace_l13_constructor_001",
    conceptKey: "lesson_13::constructor",
    level: 4,
    title: "constructor מריץ אתחול בזמן new",
    code:
      "class Student {\n" +
      "  constructor(name) {\n" +
      "    this.name = name;\n" +
      "    this.level = 1;\n" +
      "  }\n" +
      "}\n" +
      "const tal = new Student('Tal');\n" +
      "console.log(tal.name);\n" +
      "console.log(tal.level);",
    steps: [
      {
        line: 7,
        prompt: "מתי constructor רץ?",
        answer: "בזמן new Student('Tal')",
        acceptable: ["new Student", "בזמן new", "when new runs"],
        hint: "constructor נקרא אוטומטית כשנוצר instance חדש.",
      },
      {
        line: 8,
        prompt: "מה הערך של tal.name?",
        answer: "Tal",
        acceptable: ["Tal"],
        hint: "הפרמטר name נשמר לתוך this.name.",
      },
      {
        line: 9,
        prompt: "מה הערך ההתחלתי של tal.level?",
        answer: "1",
        acceptable: ["1"],
        hint: "constructor קובע level ל-1 לכל instance חדש.",
      },
    ],
    explanation:
      "constructor הוא מתודה מיוחדת במחלקה. היא מריצה קוד אתחול בכל פעם שיוצרים instance חדש עם new.",
    requiredConcepts: ["lesson_13::constructor", "lesson_13::new", "lesson_13::instance"],
    requiredTerms: ["constructor", "class", "instance"],
  },
  {
    id: "trace_l13_create_element_001",
    conceptKey: "lesson_13::createElement",
    level: 3,
    title: "createElement יוצר node חדש בזיכרון",
    code:
      "const button = document.createElement('button');\n" +
      "button.textContent = 'Start';\n" +
      "button.className = 'primary';\n" +
      "console.log(button.tagName);\n" +
      "console.log(button.textContent);",
    steps: [
      {
        line: 1,
        prompt: "איזה סוג אלמנט נוצר?",
        answer: "button",
        acceptable: ["button", "BUTTON"],
        hint: "השם שנשלח ל-createElement הוא סוג התג.",
      },
      {
        line: 4,
        prompt: "מה tagName של button בדפדפן?",
        answer: "BUTTON",
        acceptable: ["BUTTON", "button"],
        hint: "tagName מוחזר בדרך כלל באותיות גדולות.",
      },
      {
        line: 5,
        prompt: "מה הטקסט של הכפתור?",
        answer: "Start",
        acceptable: ["Start"],
        hint: "קבענו textContent לפני ההדפסה.",
      },
    ],
    explanation:
      "createElement יוצר אלמנט DOM חדש בזיכרון. הוא לא מופיע בדף עד שמחברים אותו לעץ עם appendChild או פעולה דומה.",
    requiredConcepts: ["lesson_13::createElement", "lesson_13::document"],
    requiredTerms: ["createElement", "DOM node", "textContent"],
  },
  {
    id: "trace_l13_document_001",
    conceptKey: "lesson_13::document",
    level: 3,
    title: "document הוא נקודת הכניסה לדף",
    code:
      "const title = document.createElement('h1');\n" +
      "title.id = 'main-title';\n" +
      "title.textContent = 'Portal';\n" +
      "document.body.appendChild(title);\n" +
      "const sameTitle = document.getElementById('main-title');\n" +
      "console.log(sameTitle.textContent);",
    steps: [
      {
        line: 4,
        prompt: "לאן title מחובר?",
        answer: "document.body",
        acceptable: ["body", "document.body"],
        hint: "appendChild נקרא על document.body.",
      },
      {
        line: 5,
        prompt: "איך document מוצא את הכותרת שוב?",
        answer: "getElementById",
        acceptable: ["getElementById", "לפי id"],
        hint: "ה-id נקבע ל-main-title ואז מחפשים אותו.",
      },
      {
        line: 6,
        prompt: "מה יודפס בקונסול?",
        answer: "Portal",
        acceptable: ["Portal"],
        hint: "sameTitle מצביע לאותו h1 שהטקסט שלו Portal.",
      },
    ],
    explanation:
      "document מייצג את מסמך ה-HTML ומספק API ליצירה, חיבור וחיפוש אלמנטים בדף.",
    requiredConcepts: ["lesson_13::document", "lesson_13::getElementById"],
    requiredTerms: ["document", "body", "DOM API"],
  },
  {
    id: "trace_l13_document_object_model_001",
    conceptKey: "lesson_13::Document Object Model",
    level: 3,
    title: "Document Object Model כעץ היררכי",
    code:
      "const card = document.createElement('section');\n" +
      "const heading = document.createElement('h2');\n" +
      "heading.textContent = 'DOM';\n" +
      "card.appendChild(heading);\n" +
      "document.body.appendChild(card);\n" +
      "console.log(document.body.children.length > 0);\n" +
      "console.log(card.children[0].tagName);",
    steps: [
      {
        line: 4,
        prompt: "מי הילד של card?",
        answer: "heading",
        acceptable: ["heading", "h2", "H2"],
        hint: "heading הוא האלמנט שחובר ל-card.",
      },
      {
        line: 5,
        prompt: "איפה card נמצא בעץ ה-DOM?",
        answer: "בתוך document.body",
        acceptable: ["document.body", "body"],
        hint: "card מחובר כילד של body.",
      },
      {
        line: 7,
        prompt: "מה tagName של הילד הראשון של card?",
        answer: "H2",
        acceptable: ["H2", "h2"],
        hint: "הילד הראשון הוא heading שנוצר כ-h2.",
      },
    ],
    explanation:
      "Document Object Model הוא עץ אובייקטים: body מכיל section, section מכיל h2, וכל צומת ניתן לקריאה ושינוי.",
    requiredConcepts: ["lesson_13::Document Object Model", "lesson_13::DOM"],
    requiredTerms: ["DOM tree", "parent", "child"],
  },
  {
    id: "trace_l13_dom_001",
    conceptKey: "lesson_13::DOM",
    level: 3,
    title: "DOM מאפשר לשנות את מה שמוצג",
    code:
      "const status = document.createElement('p');\n" +
      "status.textContent = 'loading';\n" +
      "status.className = 'message';\n" +
      "status.textContent = 'ready';\n" +
      "console.log(status.textContent);\n" +
      "console.log(status.className);",
    steps: [
      {
        line: 2,
        prompt: "מה הטקסט הראשון של status?",
        answer: "loading",
        acceptable: ["loading"],
        hint: "textContent נקבע תחילה ל-loading.",
      },
      {
        line: 4,
        prompt: "מה קורה לטקסט אחרי השמה נוספת?",
        answer: "ready",
        acceptable: ["ready"],
        hint: "השמה חדשה ל-textContent מחליפה את הטקסט הקודם.",
      },
      {
        line: 6,
        prompt: "מה className של האלמנט?",
        answer: "message",
        acceptable: ["message"],
        hint: "className נקבע בשורה 3 ולא השתנה אחר כך.",
      },
    ],
    explanation:
      "DOM הוא שכבת האובייקטים של הדף. שינוי property כמו textContent או className משנה את מצב האלמנט.",
    requiredConcepts: ["lesson_13::DOM", "lesson_13::Property"],
    requiredTerms: ["DOM", "textContent", "className"],
  },
  {
    id: "trace_l13_get_element_by_id_001",
    conceptKey: "lesson_13::getElementById",
    level: 3,
    title: "getElementById מחזיר אלמנט יחיד",
    code:
      "const box = document.createElement('div');\n" +
      "box.id = 'score-box';\n" +
      "box.textContent = '35';\n" +
      "document.body.appendChild(box);\n" +
      "const found = document.getElementById('score-box');\n" +
      "console.log(found.textContent);",
    steps: [
      {
        line: 2,
        prompt: "מה ה-id של box?",
        answer: "score-box",
        acceptable: ["score-box"],
        hint: "box.id מקבל את הערך score-box.",
      },
      {
        line: 5,
        prompt: "מה getElementById מחזיר?",
        answer: "האלמנט box",
        acceptable: ["box", "div", "האלמנט עם id score-box"],
        hint: "ה-id ייחודי ולכן מוחזר אלמנט אחד.",
      },
      {
        line: 6,
        prompt: "מה יודפס בקונסול?",
        answer: "35",
        acceptable: ["35"],
        hint: "found הוא אותו אלמנט שהטקסט שלו 35.",
      },
    ],
    explanation:
      "getElementById מחפש במסמך אלמנט לפי id ומחזיר reference לאותו אלמנט או null אם לא נמצא.",
    requiredConcepts: ["lesson_13::getElementById", "lesson_13::document"],
    requiredTerms: ["id", "getElementById", "single element"],
  },
  {
    id: "trace_l13_get_elements_by_class_name_001",
    conceptKey: "lesson_13::getElementsByClassName",
    level: 4,
    title: "getElementsByClassName מחזיר collection",
    code:
      "const first = document.createElement('div');\n" +
      "const second = document.createElement('span');\n" +
      "first.className = 'card';\n" +
      "second.className = 'card';\n" +
      "document.body.appendChild(first);\n" +
      "document.body.appendChild(second);\n" +
      "const cards = document.getElementsByClassName('card');\n" +
      "console.log(cards.length);\n" +
      "console.log(cards[1].tagName);",
    steps: [
      {
        line: 7,
        prompt: "כמה אלמנטים עם class card נמצאו?",
        answer: "2",
        acceptable: ["2"],
        hint: "גם div וגם span קיבלו className בשם card.",
      },
      {
        line: 8,
        prompt: "מה יודפס עבור cards.length?",
        answer: "2",
        acceptable: ["2"],
        hint: "ה-collection מכיל שני אלמנטים.",
      },
      {
        line: 9,
        prompt: "מה tagName של cards[1]?",
        answer: "SPAN",
        acceptable: ["SPAN", "span"],
        hint: "second נוצר כ-span והוא נוסף אחרי first.",
      },
    ],
    explanation:
      "getElementsByClassName מחזיר HTMLCollection של כל האלמנטים שחולקים class נתון.",
    requiredConcepts: ["lesson_13::getElementsByClassName", "lesson_13::attribute"],
    requiredTerms: ["className", "HTMLCollection", "collection"],
  },
  {
    id: "trace_l13_get_elements_by_tag_name_001",
    conceptKey: "lesson_13::getElementsByTagName",
    level: 4,
    title: "getElementsByTagName מחפש לפי סוג תג",
    code:
      "const one = document.createElement('p');\n" +
      "const two = document.createElement('p');\n" +
      "const box = document.createElement('div');\n" +
      "document.body.appendChild(one);\n" +
      "document.body.appendChild(two);\n" +
      "document.body.appendChild(box);\n" +
      "const paragraphs = document.getElementsByTagName('p');\n" +
      "console.log(paragraphs.length);\n" +
      "console.log(paragraphs[0].tagName);",
    steps: [
      {
        line: 7,
        prompt: "אילו אלמנטים נאספים ל-paragraphs?",
        answer: "שני p",
        acceptable: ["p", "שני p", "2 p elements"],
        hint: "getElementsByTagName('p') מתעלם מה-div.",
      },
      {
        line: 8,
        prompt: "מה אורך paragraphs?",
        answer: "2",
        acceptable: ["2"],
        hint: "נוצרו שני אלמנטים מסוג p.",
      },
      {
        line: 9,
        prompt: "מה tagName של paragraphs[0]?",
        answer: "P",
        acceptable: ["P", "p"],
        hint: "האלמנט הראשון שנאסף הוא p.",
      },
    ],
    explanation:
      "getElementsByTagName מחפש לפי שם תג HTML ומחזיר collection של כל האלמנטים מאותו סוג.",
    requiredConcepts: ["lesson_13::getElementsByTagName", "lesson_13::document"],
    requiredTerms: ["tagName", "HTMLCollection", "DOM query"],
  },
  {
    id: "trace_l13_get_item_001",
    conceptKey: "lesson_13::getItem",
    level: 3,
    title: "getItem קורא ערך מ-localStorage",
    code:
      "localStorage.setItem('theme', 'dark');\n" +
      "const savedTheme = localStorage.getItem('theme');\n" +
      "const missingTheme = localStorage.getItem('fontSize');\n" +
      "console.log(savedTheme);\n" +
      "console.log(missingTheme);",
    steps: [
      {
        line: 2,
        prompt: "מה getItem('theme') מחזיר?",
        answer: "dark",
        acceptable: ["dark"],
        hint: "לפני הקריאה שמרנו את theme עם הערך dark.",
      },
      {
        line: 3,
        prompt: "מה getItem מחזיר כשאין key בשם fontSize?",
        answer: "null",
        acceptable: ["null"],
        hint: "localStorage מחזיר null עבור key שלא קיים.",
      },
      {
        line: 4,
        prompt: "מה יודפס עבור savedTheme?",
        answer: "dark",
        acceptable: ["dark"],
        hint: "savedTheme קיבל את הערך שנשמר ב-localStorage.",
      },
    ],
    explanation:
      "getItem קורא ערך לפי key מתוך localStorage. אם ה-key לא קיים, התוצאה היא null.",
    requiredConcepts: ["lesson_13::getItem", "lesson_13::localStorage"],
    requiredTerms: ["getItem", "localStorage", "null"],
  },
  {
    id: "trace_l13_inheritance_001",
    conceptKey: "lesson_13::inheritance",
    level: 4,
    title: "inheritance עם extends",
    code:
      "class Animal {\n" +
      "  speak() { return 'sound'; }\n" +
      "}\n" +
      "class Dog extends Animal {\n" +
      "  bark() { return 'woof'; }\n" +
      "}\n" +
      "const rex = new Dog();\n" +
      "console.log(rex.speak());\n" +
      "console.log(rex.bark());",
    steps: [
      {
        line: 4,
        prompt: "מאיזו מחלקה Dog יורשת?",
        answer: "Animal",
        acceptable: ["Animal"],
        hint: "extends Animal מציין את מחלקת האב.",
      },
      {
        line: 8,
        prompt: "למה rex יכול לקרוא ל-speak?",
        answer: "כי Dog יורשת מ-Animal",
        acceptable: ["ירושה", "inheritance", "Dog extends Animal"],
        hint: "speak מוגדרת במחלקת האב Animal.",
      },
      {
        line: 9,
        prompt: "מה יודפס עבור rex.bark()?",
        answer: "woof",
        acceptable: ["woof"],
        hint: "bark מוגדרת ישירות במחלקת Dog.",
      },
    ],
    explanation:
      "inheritance מאפשרת למחלקה יורשת לקבל מתודות ממחלקת אב ולהוסיף התנהגות משלה.",
    requiredConcepts: ["lesson_13::inheritance", "lesson_13::super", "lesson_13::new"],
    requiredTerms: ["extends", "parent class", "subclass"],
  },
  {
    id: "trace_l13_inner_html_001",
    conceptKey: "lesson_13::innerHTML",
    level: 4,
    title: "innerHTML מפרש מחרוזת כ-HTML",
    code:
      "const card = document.createElement('div');\n" +
      "card.innerHTML = '<strong>Ready</strong>';\n" +
      "console.log(card.children.length);\n" +
      "console.log(card.children[0].tagName);\n" +
      "console.log(card.textContent);",
    steps: [
      {
        line: 2,
        prompt: "איזה אלמנט נוצר מתוך המחרוזת?",
        answer: "strong",
        acceptable: ["strong", "STRONG"],
        hint: "innerHTML מפרש את התגית <strong> כאלמנט DOM.",
      },
      {
        line: 3,
        prompt: "כמה ילדים יש ל-card?",
        answer: "1",
        acceptable: ["1"],
        hint: "נוצר ילד אחד מסוג strong.",
      },
      {
        line: 5,
        prompt: "מה textContent של card?",
        answer: "Ready",
        acceptable: ["Ready"],
        hint: "התגית עצמה לא חלק מהטקסט, רק התוכן שלה.",
      },
    ],
    explanation:
      "innerHTML מכניס מחרוזת HTML לתוך אלמנט וגורם לדפדפן לפרש אותה כצמתי DOM.",
    requiredConcepts: ["lesson_13::innerHTML", "lesson_13::DOM"],
    requiredTerms: ["innerHTML", "HTML parser", "textContent"],
  },
  {
    id: "trace_l13_instance_001",
    conceptKey: "lesson_13::instance",
    level: 3,
    title: "instance הוא אובייקט שנוצר ממחלקה",
    code:
      "class Book {\n" +
      "  constructor(title) {\n" +
      "    this.title = title;\n" +
      "  }\n" +
      "}\n" +
      "const first = new Book('JS');\n" +
      "const second = new Book('DOM');\n" +
      "console.log(first.title);\n" +
      "console.log(second instanceof Book);",
    steps: [
      {
        line: 6,
        prompt: "מה first מייצג?",
        answer: "instance של Book",
        acceptable: ["instance", "Book instance", "מופע של Book"],
        hint: "new Book יוצר מופע ממשי מהמחלקה.",
      },
      {
        line: 8,
        prompt: "מה יודפס עבור first.title?",
        answer: "JS",
        acceptable: ["JS"],
        hint: "ה-constructor שמר את title בתוך this.title.",
      },
      {
        line: 9,
        prompt: "מה הערך של second instanceof Book?",
        answer: "true",
        acceptable: ["true"],
        hint: "second נוצר באמצעות new Book.",
      },
    ],
    explanation:
      "instance הוא אובייקט ספציפי שנוצר ממחלקה. לכל instance יכול להיות state שונה.",
    requiredConcepts: ["lesson_13::instance", "lesson_13::constructor", "lesson_13::new"],
    requiredTerms: ["instance", "class", "instanceof"],
  },
  {
    id: "trace_l13_local_storage_001",
    conceptKey: "lesson_13::localStorage",
    level: 3,
    title: "localStorage שומר מחרוזות לפי key",
    code:
      "localStorage.setItem('level', '3');\n" +
      "const level = localStorage.getItem('level');\n" +
      "const next = Number(level) + 1;\n" +
      "console.log(typeof level);\n" +
      "console.log(next);",
    steps: [
      {
        line: 2,
        prompt: "מה הערך של level שנקרא מה-storage?",
        answer: "3",
        acceptable: ["3", "'3'", "\"3\""],
        hint: "localStorage שומר ומחזיר ערכים כמחרוזות.",
      },
      {
        line: 4,
        prompt: "מה typeof level?",
        answer: "string",
        acceptable: ["string"],
        hint: "גם אם שמרנו מספר, הערך חוזר כמחרוזת.",
      },
      {
        line: 5,
        prompt: "מה יודפס עבור next?",
        answer: "4",
        acceptable: ["4"],
        hint: "Number(level) ממיר את '3' למספר לפני החיבור.",
      },
    ],
    explanation:
      "localStorage הוא אחסון מקומי בדפדפן. הערכים בו נשמרים כמחרוזות ולכן לעיתים צריך המרה לפני חישוב.",
    requiredConcepts: ["lesson_13::localStorage", "lesson_13::setItem", "lesson_13::getItem"],
    requiredTerms: ["localStorage", "string storage", "Number"],
  },
  {
    id: "trace_l13_method_001",
    conceptKey: "lesson_13::Method",
    level: 3,
    title: "Method היא פונקציה בתוך object",
    code:
      "const calculator = {\n" +
      "  sum: function(a, b) {\n" +
      "    return a + b;\n" +
      "  }\n" +
      "};\n" +
      "console.log(calculator.sum(2, 5));",
    steps: [
      {
        line: 2,
        prompt: "מה שם המתודה באובייקט?",
        answer: "sum",
        acceptable: ["sum"],
        hint: "sum הוא property שהערך שלו הוא function.",
      },
      {
        line: 6,
        prompt: "מה calculator.sum(2, 5) מחזירה?",
        answer: "7",
        acceptable: ["7"],
        hint: "המתודה מחזירה a + b.",
      },
    ],
    explanation:
      "Method היא פונקציה שנשמרת כ-property בתוך object או class ומשמשת כהתנהגות של אותו מבנה.",
    requiredConcepts: ["lesson_13::Method", "lesson_13::Property", "lesson_13::Value"],
    requiredTerms: ["method", "function value", "object"],
  },
  {
    id: "trace_l13_new_001",
    conceptKey: "lesson_13::new",
    level: 4,
    title: "new יוצר instance ומפעיל constructor",
    code:
      "class Player {\n" +
      "  constructor(name) {\n" +
      "    this.name = name;\n" +
      "  }\n" +
      "}\n" +
      "const player = new Player('Tal');\n" +
      "console.log(typeof player);\n" +
      "console.log(player.name);",
    steps: [
      {
        line: 6,
        prompt: "מה new Player('Tal') יוצר?",
        answer: "instance של Player",
        acceptable: ["instance", "object", "Player instance"],
        hint: "new מפעיל constructor ומחזיר אובייקט חדש.",
      },
      {
        line: 7,
        prompt: "מה typeof player?",
        answer: "object",
        acceptable: ["object"],
        hint: "instance של class הוא object.",
      },
      {
        line: 8,
        prompt: "מה player.name?",
        answer: "Tal",
        acceptable: ["Tal"],
        hint: "constructor שמר את הפרמטר name בתוך this.name.",
      },
    ],
    explanation:
      "new הוא אופרטור שיוצר אובייקט חדש, מקשר אותו למחלקה, מפעיל constructor ומחזיר את ה-instance.",
    requiredConcepts: ["lesson_13::new", "lesson_13::constructor", "lesson_13::instance"],
    requiredTerms: ["new", "constructor", "instance"],
  },
  {
    id: "trace_l13_property_001",
    conceptKey: "lesson_13::Property",
    level: 3,
    title: "Property הוא key בתוך object",
    code:
      "const student = {\n" +
      "  name: 'Dana',\n" +
      "  score: 90\n" +
      "};\n" +
      "student.score = student.score + 5;\n" +
      "console.log(student.name);\n" +
      "console.log(student.score);",
    steps: [
      {
        line: 2,
        prompt: "מה שם ה-property שמחזיק את Dana?",
        answer: "name",
        acceptable: ["name"],
        hint: "name הוא ה-key, Dana הוא ה-value.",
      },
      {
        line: 5,
        prompt: "מה הערך החדש של score?",
        answer: "95",
        acceptable: ["95"],
        hint: "score התחיל ב-90 וקיבל תוספת של 5.",
      },
      {
        line: 7,
        prompt: "מה יודפס עבור student.score?",
        answer: "95",
        acceptable: ["95"],
        hint: "ה-property score עודכן לפני ההדפסה.",
      },
    ],
    explanation:
      "Property הוא שם השדה באובייקט. אפשר לקרוא ולעדכן אותו עם dot notation.",
    requiredConcepts: ["lesson_13::Property", "lesson_13::Value"],
    requiredTerms: ["property", "key", "dot notation"],
  },
  {
    id: "trace_l13_query_selector_001",
    conceptKey: "lesson_13::querySelector",
    level: 4,
    title: "querySelector מחזיר התאמה ראשונה",
    code:
      "const first = document.createElement('button');\n" +
      "const second = document.createElement('button');\n" +
      "first.className = 'action';\n" +
      "second.className = 'action';\n" +
      "first.textContent = 'Save';\n" +
      "second.textContent = 'Delete';\n" +
      "document.body.appendChild(first);\n" +
      "document.body.appendChild(second);\n" +
      "const action = document.querySelector('.action');\n" +
      "console.log(action.textContent);",
    steps: [
      {
        line: 9,
        prompt: "כמה אלמנטים מתאימים לסלקטור .action?",
        answer: "2",
        acceptable: ["2"],
        hint: "גם first וגם second קיבלו className action.",
      },
      {
        line: 9,
        prompt: "איזה אלמנט querySelector מחזיר?",
        answer: "הראשון",
        acceptable: ["הראשון", "first", "first match"],
        hint: "querySelector מחזיר רק את ההתאמה הראשונה.",
      },
      {
        line: 10,
        prompt: "מה יודפס בקונסול?",
        answer: "Save",
        acceptable: ["Save"],
        hint: "first נוסף ראשון וטקסט שלו הוא Save.",
      },
    ],
    explanation:
      "querySelector מקבל CSS selector ומחזיר את האלמנט הראשון שמתאים לו, או null אם אין התאמה.",
    requiredConcepts: ["lesson_13::querySelector", "lesson_13::DOM"],
    requiredTerms: ["querySelector", "CSS selector", "first match"],
  },
  {
    id: "trace_l13_query_selector_all_001",
    conceptKey: "lesson_13::querySelectorAll",
    level: 4,
    title: "querySelectorAll מחזיר את כל ההתאמות",
    code:
      "const first = document.createElement('li');\n" +
      "const second = document.createElement('li');\n" +
      "first.className = 'topic';\n" +
      "second.className = 'topic';\n" +
      "document.body.appendChild(first);\n" +
      "document.body.appendChild(second);\n" +
      "const topics = document.querySelectorAll('li.topic');\n" +
      "console.log(topics.length);\n" +
      "console.log(topics[0].tagName);",
    steps: [
      {
        line: 7,
        prompt: "מה selector 'li.topic' מחפש?",
        answer: "li עם class topic",
        acceptable: ["li.topic", "li עם topic", "li with class topic"],
        hint: "זה שילוב של tag selector ו-class selector.",
      },
      {
        line: 8,
        prompt: "מה אורך topics?",
        answer: "2",
        acceptable: ["2"],
        hint: "שני אלמנטים li קיבלו class topic.",
      },
      {
        line: 9,
        prompt: "מה tagName של topics[0]?",
        answer: "LI",
        acceptable: ["LI", "li"],
        hint: "האלמנטים שנוצרו הם li.",
      },
    ],
    explanation:
      "querySelectorAll מחזיר NodeList של כל האלמנטים שמתאימים ל-CSS selector.",
    requiredConcepts: ["lesson_13::querySelectorAll", "lesson_13::querySelector"],
    requiredTerms: ["querySelectorAll", "NodeList", "CSS selector"],
  },
  {
    id: "trace_l13_remove_child_001",
    conceptKey: "lesson_13::removeChild",
    level: 4,
    title: "removeChild מוחק ילד דרך ההורה",
    code:
      "const list = document.createElement('ul');\n" +
      "const first = document.createElement('li');\n" +
      "const second = document.createElement('li');\n" +
      "first.textContent = 'keep';\n" +
      "second.textContent = 'remove';\n" +
      "list.appendChild(first);\n" +
      "list.appendChild(second);\n" +
      "list.removeChild(second);\n" +
      "console.log(list.children.length);\n" +
      "console.log(list.children[0].textContent);",
    steps: [
      {
        line: 8,
        prompt: "מי קורא ל-removeChild בקוד?",
        answer: "list",
        acceptable: ["list", "ההורה", "parent"],
        hint: "removeChild נקרא על ההורה שמחזיק את הילד.",
      },
      {
        line: 9,
        prompt: "כמה ילדים נשארים אחרי המחיקה?",
        answer: "1",
        acceptable: ["1"],
        hint: "היו שני li, וה-li השני נמחק.",
      },
      {
        line: 10,
        prompt: "איזה טקסט נשאר בילד הראשון?",
        answer: "keep",
        acceptable: ["keep"],
        hint: "first לא נמחק ולכן הוא הילד היחיד שנשאר.",
      },
    ],
    explanation:
      "removeChild מסיר node רק דרך ההורה שלו. לכן קודם מאתרים את ההורה ואת הילד, ואז ההורה מבצע את המחיקה.",
    requiredConcepts: ["lesson_13::removeChild", "lesson_13::appendChild"],
    requiredTerms: ["removeChild", "parent element", "child node"],
  },
  {
    id: "trace_l13_replace_child_001",
    conceptKey: "lesson_13::replaceChild",
    level: 4,
    title: "replaceChild מחליף ילד קיים בילד חדש",
    code:
      "const box = document.createElement('section');\n" +
      "const oldTitle = document.createElement('h2');\n" +
      "const newTitle = document.createElement('h2');\n" +
      "oldTitle.textContent = 'Old';\n" +
      "newTitle.textContent = 'New';\n" +
      "box.appendChild(oldTitle);\n" +
      "box.replaceChild(newTitle, oldTitle);\n" +
      "console.log(box.children.length);\n" +
      "console.log(box.children[0].textContent);",
    steps: [
      {
        line: 7,
        prompt: "איזה node נכנס במקום הישן?",
        answer: "newTitle",
        acceptable: ["newTitle", "New", "החדש"],
        hint: "ב-replaceChild הפרמטר הראשון הוא הילד החדש.",
      },
      {
        line: 7,
        prompt: "איזה node מוחלף?",
        answer: "oldTitle",
        acceptable: ["oldTitle", "Old", "הישן"],
        hint: "הפרמטר השני הוא הילד הקיים שמוחלף.",
      },
      {
        line: 9,
        prompt: "מה יודפס כטקסט הילד הראשון?",
        answer: "New",
        acceptable: ["New"],
        hint: "oldTitle כבר לא נמצא בתוך box.",
      },
    ],
    explanation:
      "replaceChild(newNode, oldNode) נקרא על ההורה, מכניס את החדש בדיוק במקום של הישן, ושומר על מספר הילדים אם הייתה החלפה אחת.",
    requiredConcepts: ["lesson_13::replaceChild", "lesson_13::appendChild"],
    requiredTerms: ["replaceChild", "new node", "old node"],
  },
  {
    id: "trace_l13_session_storage_001",
    conceptKey: "lesson_13::sessionStorage",
    level: 4,
    title: "sessionStorage שומר מידע זמני לטאב הנוכחי",
    code:
      "const storage = sessionStorage;\n" +
      "storage.setItem('draft', 'unsent');\n" +
      "storage.setItem('step', '2');\n" +
      "console.log(storage.getItem('draft'));\n" +
      "storage.removeItem('draft');\n" +
      "console.log(storage.getItem('draft'));\n" +
      "console.log(storage.getItem('step'));",
    steps: [
      {
        line: 4,
        prompt: "מה יודפס לפני removeItem?",
        answer: "unsent",
        acceptable: ["unsent"],
        hint: "draft נשמר לפני ההדפסה הראשונה.",
      },
      {
        line: 6,
        prompt: "מה getItem מחזיר אחרי מחיקת draft?",
        answer: "null",
        acceptable: ["null"],
        hint: "מפתח שלא קיים ב-Web Storage מחזיר null.",
      },
      {
        line: 7,
        prompt: "האם step נמחק יחד עם draft?",
        answer: "לא",
        acceptable: ["לא", "no", "נשאר"],
        hint: "removeItem קיבל רק את המפתח draft.",
      },
    ],
    explanation:
      "sessionStorage עובד כמו localStorage מבחינת set/get/remove, אבל הנתונים שלו קשורים לטאב הנוכחי ונמחקים בסגירת הטאב.",
    requiredConcepts: ["lesson_13::sessionStorage", "lesson_13::setItem", "lesson_13::getItem"],
    requiredTerms: ["sessionStorage", "setItem", "getItem"],
  },
  {
    id: "trace_l13_set_attribute_001",
    conceptKey: "lesson_13::setAttribute",
    level: 3,
    title: "setAttribute קובע מאפיין על אלמנט",
    code:
      "const link = document.createElement('a');\n" +
      "link.textContent = 'Open portal';\n" +
      "link.setAttribute('href', '/portal');\n" +
      "link.setAttribute('target', '_blank');\n" +
      "console.log(link.getAttribute('href'));\n" +
      "console.log(link.getAttribute('target'));",
    steps: [
      {
        line: 3,
        prompt: "איזה attribute מקבל את הערך /portal?",
        answer: "href",
        acceptable: ["href"],
        hint: "השם הראשון שנשלח ל-setAttribute הוא שם המאפיין.",
      },
      {
        line: 5,
        prompt: "מה יודפס עבור href?",
        answer: "/portal",
        acceptable: ["/portal"],
        hint: "getAttribute קורא את אותו attribute שנקבע קודם.",
      },
      {
        line: 6,
        prompt: "מה הערך של target?",
        answer: "_blank",
        acceptable: ["_blank"],
        hint: "target נקבע בשורה 4.",
      },
    ],
    explanation:
      "setAttribute מאפשר לקבוע או לעדכן מאפיין HTML לפי שם וערך. זה שימושי ל-href, aria, data-* ועוד.",
    requiredConcepts: ["lesson_13::setAttribute", "lesson_13::attribute"],
    requiredTerms: ["setAttribute", "attribute", "getAttribute"],
  },
  {
    id: "trace_l13_set_item_001",
    conceptKey: "lesson_13::setItem",
    level: 4,
    title: "setItem שומר מחרוזת תחת key",
    code:
      "const profile = { name: 'Tal', level: 1 };\n" +
      "localStorage.setItem('profile', JSON.stringify(profile));\n" +
      "const saved = localStorage.getItem('profile');\n" +
      "const parsed = JSON.parse(saved);\n" +
      "console.log(typeof saved);\n" +
      "console.log(parsed.name);\n" +
      "console.log(parsed.level);",
    steps: [
      {
        line: 2,
        prompt: "למה משתמשים ב-JSON.stringify לפני setItem?",
        answer: "כי setItem שומר מחרוזת",
        acceptable: ["מחרוזת", "string", "כי storage שומר string"],
        hint: "Web Storage שומר ערכים כמחרוזות.",
      },
      {
        line: 5,
        prompt: "מה typeof saved?",
        answer: "string",
        acceptable: ["string"],
        hint: "getItem מחזיר מחרוזת או null.",
      },
      {
        line: 7,
        prompt: "מה הערך של parsed.level?",
        answer: "1",
        acceptable: ["1"],
        hint: "JSON.parse החזיר אובייקט עם level מקורי.",
      },
    ],
    explanation:
      "setItem מקבל key ו-value ושומר אותם ב-Web Storage. כדי לשמור אובייקט אמיתי צריך להמיר אותו ל-JSON string ואז לקרוא עם JSON.parse.",
    requiredConcepts: ["lesson_13::setItem", "lesson_13::localStorage"],
    requiredTerms: ["setItem", "JSON.stringify", "JSON.parse"],
  },
  {
    id: "trace_l13_style_001",
    conceptKey: "lesson_13::style",
    level: 3,
    title: "style משנה inline CSS דרך JavaScript",
    code:
      "const badge = document.createElement('span');\n" +
      "badge.textContent = 'Ready';\n" +
      "badge.style.color = 'white';\n" +
      "badge.style.backgroundColor = 'green';\n" +
      "badge.style.padding = '4px';\n" +
      "console.log(badge.style.color);\n" +
      "console.log(badge.style.backgroundColor);",
    steps: [
      {
        line: 3,
        prompt: "איזה property משנה את צבע הטקסט?",
        answer: "color",
        acceptable: ["color"],
        hint: "color מתייחס לצבע האותיות.",
      },
      {
        line: 4,
        prompt: "איך כותבים background-color בתוך JS?",
        answer: "backgroundColor",
        acceptable: ["backgroundColor"],
        hint: "ב-JS עוברים מ-kebab-case ל-camelCase.",
      },
      {
        line: 7,
        prompt: "מה יודפס עבור backgroundColor?",
        answer: "green",
        acceptable: ["green"],
        hint: "זה הערך שנקבע בשורה 4.",
      },
    ],
    explanation:
      "style הוא אובייקט inline CSS של האלמנט. שמות CSS עם מקף נכתבים ב-JavaScript ב-camelCase כמו backgroundColor.",
    requiredConcepts: ["lesson_13::style", "lesson_13::document"],
    requiredTerms: ["style", "inline CSS", "camelCase"],
  },
  {
    id: "trace_l13_super_001",
    conceptKey: "lesson_13::super",
    level: 5,
    title: "super מפעיל את constructor של מחלקת האב",
    code:
      "class User {\n" +
      "  constructor(name) {\n" +
      "    this.name = name;\n" +
      "  }\n" +
      "}\n" +
      "class Admin extends User {\n" +
      "  constructor(name, role) {\n" +
      "    super(name);\n" +
      "    this.role = role;\n" +
      "  }\n" +
      "}\n" +
      "const tal = new Admin('Tal', 'mentor');\n" +
      "console.log(tal.name);\n" +
      "console.log(tal.role);",
    steps: [
      {
        line: 8,
        prompt: "מה super(name) מפעיל?",
        answer: "את constructor של User",
        acceptable: ["constructor של User", "User constructor", "מחלקת האב"],
        hint: "Admin יורש מ-User ולכן super קורא לבנאי של User.",
      },
      {
        line: 13,
        prompt: "מאיפה tal.name הגיע?",
        answer: "מ-User דרך super",
        acceptable: ["User", "super", "constructor של האב"],
        hint: "this.name נקבע בתוך constructor של User.",
      },
      {
        line: 14,
        prompt: "מה tal.role?",
        answer: "mentor",
        acceptable: ["mentor"],
        hint: "role נקבע אחרי הקריאה ל-super.",
      },
    ],
    explanation:
      "במחלקה יורשת חייבים לקרוא ל-super לפני שימוש ב-this. הקריאה מפעילה את אתחול מחלקת האב ומאפשרת למחלקת הבן להוסיף שדות משלה.",
    requiredConcepts: ["lesson_13::super", "lesson_13::inheritance", "lesson_13::constructor"],
    requiredTerms: ["super", "extends", "constructor"],
  },
  {
    id: "trace_l13_value_001",
    conceptKey: "lesson_13::Value",
    level: 3,
    title: "Value הוא הערך שנשמר בתוך property",
    code:
      "const course = {\n" +
      "  name: 'Full Stack',\n" +
      "  level: 1,\n" +
      "  active: true\n" +
      "};\n" +
      "course.level = course.level + 1;\n" +
      "console.log(course.name);\n" +
      "console.log(course.level);\n" +
      "console.log(course.active);",
    steps: [
      {
        line: 2,
        prompt: "מה ה-Value של property בשם name?",
        answer: "Full Stack",
        acceptable: ["Full Stack"],
        hint: "name הוא ה-key, והטקסט מימין לנקודתיים הוא הערך.",
      },
      {
        line: 6,
        prompt: "מה הערך החדש של level?",
        answer: "2",
        acceptable: ["2"],
        hint: "level התחיל ב-1 והוגדל ב-1.",
      },
      {
        line: 9,
        prompt: "מה ה-Value של active?",
        answer: "true",
        acceptable: ["true"],
        hint: "active שומר boolean value.",
      },
    ],
    explanation:
      "Value הוא המידע שנמצא בצד ימין של property. באובייקט אפשר לשמור values מסוגים שונים: string, number, boolean, array או object.",
    requiredConcepts: ["lesson_13::Value", "lesson_13::Property"],
    requiredTerms: ["Value", "Property", "object literal"],
  },
];

(function appendLesson13ActivityTraces() {
  if (typeof window === "undefined") return;
  if (!window.QUESTIONS_TRACE) window.QUESTIONS_TRACE = [];
  const existing = new Set(window.QUESTIONS_TRACE.map((item) => item && item.id).filter(Boolean));
  SVCOLLEGE_LESSON13_ACTIVITY_TRACES.forEach((item) => {
    if (!existing.has(item.id)) window.QUESTIONS_TRACE.push(item);
  });
  if (window.QUESTIONS_BANK) {
    window.QUESTIONS_BANK.trace = window.QUESTIONS_TRACE;
  }
})();
