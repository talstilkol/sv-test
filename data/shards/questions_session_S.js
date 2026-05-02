// data/shards/questions_session_S.js
// Sprint 2 batch S — DOM coverage
// 50 questions: 35 MC + 15 Fill

window.QUESTIONS_SHARD_S = {
  mc: [
    {
      id: "mc_l13_dom_s_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::DOM",
      level: 5,
      question: "מה DOM?",
      options: [
        "Document Object Model — ייצוג עץ של HTML שניתן לטיפול עם JS",
        "library JS",
        "language preprocessor",
        "אסור לגעת"
      ],
      correctIndex: 0,
      explanation: "DOM הוא ה-tree representation, API מסטנדרט W3C.",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה native browser API.",
        "❌ זה לא compiler.",
        "❌ זה הAPI הבסיסי."
      ]
    },
    {
      id: "mc_l13_doc_s_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::document",
      level: 4,
      question: "document — מה זה?",
      options: [
        "global object שמייצג את ה-HTML page הנוכחית",
        "JSON file",
        "template",
        "DOM tree עצמו"
      ],
      correctIndex: 0,
      explanation: "Entry point ל-DOM API.",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה Object DOM.",
        "❌ זה לא template.",
        "❌ root element ולא הtree עצמו."
      ]
    },
    {
      id: "mc_l13_qsel_s_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::querySelector",
      level: 5,
      question: "querySelector vs getElementById:",
      options: [
        "querySelector מקבל CSS selector (גמיש). getElementById רק ID (מהיר)",
        "אותו דבר",
        "querySelector deprecated",
        "getElementById TypeScript only"
      ],
      correctIndex: 0,
      explanation: "Modern: querySelector. Hot path: getElementById.",
      optionFeedback: [
        "✅ נכון.",
        "❌ הבדל מהותי.",
        "❌ querySelector recommended.",
        "❌ legitimate JS API."
      ]
    },
    {
      id: "mc_l13_getbyid_s_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::getElementById",
      level: 4,
      question: "getElementById('foo'):",
      options: [
        "Element או null אם לא מצא",
        "Array of elements",
        "throws if missing",
        "Promise"
      ],
      correctIndex: 0,
      explanation: "id צריך להיות unique בdocument.",
      optionFeedback: [
        "✅ נכון.",
        "❌ getElementsBy* מחזיר collection.",
        "❌ legitimate.",
        "❌ sync API."
      ]
    },
    {
      id: "mc_l13_qsa_s_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::querySelector",
      level: 6,
      question: "querySelectorAll:",
      options: [
        "מחזיר NodeList (static) של כל המתאימים",
        "HTMLCollection (live)",
        "Array<Element>",
        "Promise"
      ],
      correctIndex: 0,
      explanation: "Static = doesn't update on DOM changes. Use Array.from for forEach.",
      optionFeedback: [
        "✅ נכון.",
        "❌ static, לא live.",
        "❌ NodeList דומה אבל לא array.",
        "❌ sync."
      ]
    },
    {
      id: "mc_l13_innerhtml_s_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::innerHTML",
      level: 6,
      question: "innerHTML עם user input:",
      options: [
        "סכנת XSS — input יכול להזריק <script>",
        "בטוח כי טקסט בלבד",
        "מהיר",
        "אסור"
      ],
      correctIndex: 0,
      explanation: "Use textContent or DOMPurify for user-supplied HTML.",
      optionFeedback: [
        "✅ נכון.",
        "❌ הוא parse HTML ויכול לזרוע.",
        "❌ זו לא ההצדקה.",
        "❌ legitimate בקונטקסט הנכון."
      ]
    },
    {
      id: "mc_l13_innerhtml_s_002",
      topicId: "topic_dom",
      conceptKey: "lesson_13::innerHTML",
      level: 5,
      question: "innerHTML vs textContent:",
      options: [
        "innerHTML parses HTML. textContent מתייחס לטקסט בלבד (בטוח)",
        "אותו דבר",
        "textContent יוצר elements",
        "innerHTML deprecated"
      ],
      correctIndex: 0,
      explanation: "textContent זול ובטוח. innerHTML יקר ומסוכן.",
      optionFeedback: [
        "✅ נכון.",
        "❌ הבדל קריטי.",
        "❌ הפוך — textContent רק טקסט.",
        "❌ legitimate (just risky)."
      ]
    },
    {
      id: "mc_l13_attr_s_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::attribute",
      level: 5,
      question: "attribute vs property:",
      options: [
        "attribute מ-HTML (initial). property = JS state (current). שונים ב-input.value",
        "אותו דבר",
        "property HTML, attribute JS",
        "attribute deprecated"
      ],
      correctIndex: 0,
      explanation: "input.getAttribute('value') = initial. input.value = current.",
      optionFeedback: [
        "✅ נכון.",
        "❌ הבדל מהותי לinput.",
        "❌ הפוך.",
        "❌ legitimate."
      ]
    },
    {
      id: "mc_l13_setattr_s_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::setAttribute",
      level: 5,
      question: "setAttribute('disabled', false):",
      options: [
        "Element disabled — כי setAttribute string conversion → 'false' truthy",
        "Element enabled",
        "throws",
        "ignored"
      ],
      correctIndex: 0,
      explanation: "Boolean attributes באים כ-presence, not value. השתמש בproperty.",
      optionFeedback: [
        "✅ נכון. trap נפוץ.",
        "❌ string truthy.",
        "❌ legitimate.",
        "❌ הוא סט."
      ]
    },
    {
      id: "mc_l13_style_s_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::style",
      level: 5,
      question: "el.style.fontSize:",
      options: [
        "inline style. שונה מ-getComputedStyle (final).",
        "computed final",
        "external CSS",
        "object"
      ],
      correctIndex: 0,
      explanation: "el.style רק inline. getComputedStyle = full cascade result.",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה מ-window.getComputedStyle.",
        "❌ inline בלבד.",
        "❌ זה CSSStyleDeclaration object."
      ]
    },
    {
      id: "mc_l13_create_s_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::createElement",
      level: 5,
      question: "createElement('div'):",
      options: [
        "Element חדש detached — צריך appendChild לחבר",
        "Element appended automatically",
        "string",
        "object literal"
      ],
      correctIndex: 0,
      explanation: "Detached הוא ה-default. צריך לחבר ל-DOM.",
      optionFeedback: [
        "✅ נכון.",
        "❌ ידני נדרש.",
        "❌ זה Element.",
        "❌ Element instance."
      ]
    },
    {
      id: "mc_l13_appendchild_s_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::appendChild",
      level: 4,
      question: "appendChild(node):",
      options: [
        "מוסיף לסוף parent. אם node קיים ב-DOM — מועבר",
        "מעתיק",
        "throws",
        "מחזיר string"
      ],
      correctIndex: 0,
      explanation: "Move semantics. node מוצא ממיקום קודם.",
      optionFeedback: [
        "✅ נכון.",
        "❌ לא מעתיק — מעביר.",
        "❌ legitimate.",
        "❌ מחזיר את הnode."
      ]
    },
    {
      id: "mc_l13_remove_s_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::removeChild",
      level: 4,
      question: "node.remove() vs parent.removeChild(node):",
      options: [
        "remove() מודרני. removeChild legacy. שניהם detach.",
        "אותו דבר",
        "remove() מעתיק",
        "removeChild deprecated"
      ],
      correctIndex: 0,
      explanation: "remove() = ChildNode mixin. modern.",
      optionFeedback: [
        "✅ נכון.",
        "❌ remove() ב-modern API.",
        "❌ זה לא copy.",
        "❌ עדיין נתמך."
      ]
    },
    {
      id: "mc_l13_replace_s_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::replaceChild",
      level: 5,
      question: "replaceChild(newNode, oldNode):",
      options: [
        "מחליף oldNode ב-newNode במקום אותו parent",
        "מחק שני",
        "מעתיק",
        "throws"
      ],
      correctIndex: 0,
      explanation: "Atomic swap.",
      optionFeedback: [
        "✅ נכון.",
        "❌ replace, לא delete-both.",
        "❌ in-place swap.",
        "❌ legitimate."
      ]
    },
    // ─── More DOM ───
    {
      id: "mc_l13_classlist_s_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::DOM",
      level: 5,
      question: "el.classList.add('x'):",
      options: [
        "מוסיף class ל-element. duplicate-safe.",
        "מחליף את כל ה-classes",
        "תמיד מוחק קודם",
        "אסור"
      ],
      correctIndex: 0,
      explanation: "DOMTokenList API. יש add/remove/toggle/contains.",
      optionFeedback: [
        "✅ נכון.",
        "❌ adds without replace.",
        "❌ idempotent.",
        "❌ legitimate."
      ]
    },
    {
      id: "mc_l13_dataset_s_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::attribute",
      level: 6,
      question: "data-* attributes ב-JS:",
      options: [
        "el.dataset.userId = '5' ↔ data-user-id='5' (camelCase ↔ kebab)",
        "אסור data-",
        "DOM not support",
        "ב-property בלבד"
      ],
      correctIndex: 0,
      explanation: "DOMStringMap typed.",
      optionFeedback: [
        "✅ נכון. convention.",
        "❌ legitimate HTML5.",
        "❌ supported.",
        "❌ עובד שני אופנים."
      ]
    },
    {
      id: "mc_l13_event_listener_s_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::DOM",
      level: 5,
      question: "addEventListener('click', fn) vs onclick=fn:",
      options: [
        "addEventListener תומך ב-multiple listeners. onclick רק אחד (overwrites)",
        "אותו דבר",
        "onclick מהיר",
        "addEventListener deprecated"
      ],
      correctIndex: 0,
      explanation: "Modern: addEventListener. Legacy: onclick.",
      optionFeedback: [
        "✅ נכון.",
        "❌ הבדל קריטי.",
        "❌ דומה.",
        "❌ recommended."
      ]
    },
    {
      id: "mc_l13_event_target_s_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::DOM",
      level: 6,
      question: "event.target vs event.currentTarget:",
      options: [
        "target = איפה הclick קרה (יכול להיות child). currentTarget = איפה ה-listener",
        "אותו דבר",
        "target = listener, currentTarget = origin",
        "currentTarget deprecated"
      ],
      correctIndex: 0,
      explanation: "Useful for delegation.",
      optionFeedback: [
        "✅ נכון.",
        "❌ הבדל מהותי.",
        "❌ הפוך.",
        "❌ legitimate."
      ]
    },
    {
      id: "mc_l13_bubble_s_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::DOM",
      level: 7,
      question: "Event bubbling:",
      options: [
        "event עובר מ-target למעלה דרך ההורים — מאפשר delegation",
        "event ב-target בלבד",
        "אסור",
        "רק עם capture"
      ],
      correctIndex: 0,
      explanation: "3 phases: capture, target, bubble (default in addEventListener).",
      optionFeedback: [
        "✅ נכון.",
        "❌ עולה דרך ה-tree.",
        "❌ זה ה-default.",
        "❌ bubble = ברירת המחדל."
      ]
    },
    {
      id: "mc_l13_preventdef_s_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::DOM",
      level: 6,
      question: "event.preventDefault():",
      options: [
        "מבטל ברירת המחדל של ה-browser (form submit, link follow)",
        "עוצר bubbling",
        "מסיר listener",
        "throws"
      ],
      correctIndex: 0,
      explanation: "stopPropagation עוצר bubble. preventDefault מבטל default action.",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה stopPropagation.",
        "❌ זה removeEventListener.",
        "❌ legitimate."
      ]
    },
    {
      id: "mc_l13_stop_s_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::DOM",
      level: 6,
      question: "event.stopPropagation():",
      options: [
        "עוצר את ה-event מלעלות להורים — לא משפיע על default",
        "מבטל default",
        "מסיר listener",
        "אסור"
      ],
      correctIndex: 0,
      explanation: "stopImmediatePropagation גם עוצר handlers נוספים על אותו element.",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה preventDefault.",
        "❌ זה removeEventListener.",
        "❌ legitimate."
      ]
    },
    // ─── More creation/insertion ───
    {
      id: "mc_l13_insertbefore_s_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::appendChild",
      level: 6,
      question: "insertBefore(new, ref):",
      options: [
        "מכניס new לפני ref ב-parent. ref=null → באמצע סוף",
        "מחליף ref",
        "appendChild equivalent",
        "throws if not parent"
      ],
      correctIndex: 0,
      explanation: "Specific position insertion.",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה replaceChild.",
        "❌ דומה אבל position-controlled.",
        "❌ זה אם ref לא ילד של this."
      ]
    },
    {
      id: "mc_l13_fragment_s_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::createElement",
      level: 7,
      question: "DocumentFragment ל-batch:",
      options: [
        "container זמני שלא ב-DOM. append רב + 1 reflow כשמחברים ל-DOM",
        "subtree קבוע",
        "deprecated",
        "אסור children"
      ],
      correctIndex: 0,
      explanation: "Performance pattern: minimize reflows.",
      optionFeedback: [
        "✅ נכון.",
        "❌ זמני.",
        "❌ legitimate API.",
        "❌ מותר children."
      ]
    },
    // ─── Collections ───
    {
      id: "mc_l13_getbytag_s_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::getElementsByTagName",
      level: 5,
      question: "getElementsByTagName('div') החזיר:",
      options: [
        "HTMLCollection live — מתעדכן עם DOM changes (trap בloops!)",
        "NodeList static",
        "Array<Element>",
        "Element אחד"
      ],
      correctIndex: 0,
      explanation: "Live collection. Length משתנה תוך-loop.",
      optionFeedback: [
        "✅ נכון. trap קלאסי.",
        "❌ זה querySelectorAll.",
        "❌ HTMLCollection לא array.",
        "❌ collection."
      ]
    },
    {
      id: "mc_l13_getbyclass_s_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::getElementsByClassName",
      level: 5,
      question: "getElementsByClassName('btn'):",
      options: [
        "live HTMLCollection. Use Array.from לforEach.",
        "static",
        "מחזיר Promise",
        "deprecated"
      ],
      correctIndex: 0,
      explanation: "כמו getElementsByTagName.",
      optionFeedback: [
        "✅ נכון.",
        "❌ live.",
        "❌ sync.",
        "❌ legitimate."
      ]
    },
    // ─── Style ───
    {
      id: "mc_l13_compstyle_s_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::style",
      level: 7,
      question: "getComputedStyle(el):",
      options: [
        "מחזיר את הvalues הסופיים אחרי כל הcascade — כולל external CSS",
        "רק inline",
        "string",
        "object literal"
      ],
      correctIndex: 0,
      explanation: "Read-only. CSSStyleDeclaration computed.",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה el.style.",
        "❌ object.",
        "❌ זה CSSStyleDeclaration."
      ]
    },
    // ─── Forms / value ───
    {
      id: "mc_l13_value_s_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::Value",
      level: 4,
      question: "input.value:",
      options: [
        "ערך נוכחי שהמשתמש הקליד (גם אחרי שינוי)",
        "value attribute הראשוני",
        "default",
        "always empty"
      ],
      correctIndex: 0,
      explanation: "Property follows user input. Attribute = initial.",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה getAttribute('value').",
        "❌ default = defaultValue.",
        "❌ אם הוקלד יש ערך."
      ]
    },
    // ─── Object/Property/Method (lesson 13) ───
    {
      id: "mc_l13_object_s_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::Object",
      level: 4,
      question: "Object ב-JS:",
      options: [
        "אוסף key-value pairs. base type של רוב המבנים",
        "primitive",
        "function",
        "boolean"
      ],
      correctIndex: 0,
      explanation: "Foundation of JS.",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה reference type.",
        "❌ subset.",
        "❌ זה primitive."
      ]
    },
    {
      id: "mc_l13_property_s_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::Property",
      level: 4,
      question: "Property ב-Object:",
      options: [
        "key-value pair. גישה דרך obj.key או obj['key']",
        "function only",
        "private field",
        "constant"
      ],
      correctIndex: 0,
      explanation: "Two access syntaxes.",
      optionFeedback: [
        "✅ נכון.",
        "❌ method הוא property שערכו fn.",
        "❌ public ב-JS.",
        "❌ ניתן לשינוי."
      ]
    },
    {
      id: "mc_l13_method_s_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::Method",
      level: 4,
      question: "Method:",
      options: [
        "function שמיועדת להיות property של object",
        "constructor",
        "primitive",
        "reserved word"
      ],
      correctIndex: 0,
      explanation: "Object literal: { greet() {} } או name: function() {}.",
      optionFeedback: [
        "✅ נכון.",
        "❌ constructor הוא special method.",
        "❌ זה type.",
        "❌ זה JS feature."
      ]
    },
    // ─── More DOM events ───
    {
      id: "mc_l13_delegate_s_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::DOM",
      level: 7,
      question: "Event delegation pattern:",
      options: [
        "listener על parent + e.target.matches(selector) — חוסך listeners + עובד עם dynamic children",
        "listener על כל child",
        "no events",
        "אסור"
      ],
      correctIndex: 0,
      explanation: "Memory + performance optimization.",
      optionFeedback: [
        "✅ נכון.",
        "❌ זה ה-anti-pattern.",
        "❌ events חיוניים.",
        "❌ זה ה-best practice."
      ]
    },
    {
      id: "mc_l13_passive_s_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::DOM",
      level: 8,
      question: "passive event listener:",
      options: [
        "addEventListener('scroll', fn, {passive: true}) — לא יכול ל-preventDefault, scroll smoother",
        "passive = doesn't run",
        "אסור",
        "TypeScript only"
      ],
      correctIndex: 0,
      explanation: "Browser scroll optimization.",
      optionFeedback: [
        "✅ נכון.",
        "❌ הוא רץ — רק לא יכול לעצור.",
        "❌ standard option.",
        "❌ JS native."
      ]
    },
    {
      id: "mc_l13_innerhtml_perf_s_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::innerHTML",
      level: 7,
      question: "innerHTML += בלולאה:",
      options: [
        "anti-pattern — N reflows. עדיף לבנות string + 1 assignment, או DocumentFragment",
        "מהיר",
        "deprecated",
        "browser optimizes"
      ],
      correctIndex: 0,
      explanation: "Each += parses entire HTML again.",
      optionFeedback: [
        "✅ נכון.",
        "❌ N times slower.",
        "❌ legitimate.",
        "❌ אין auto-batching."
      ]
    },
  ],
  fill: [
    {
      id: "fill_l13_qsel_s_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::querySelector",
      level: 5,
      code: "const btn = document.____('#submit');",
      answer: "querySelector",
      explanation: "querySelector accepts CSS selector."
    },
    {
      id: "fill_l13_byid_s_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::getElementById",
      level: 4,
      code: "const el = document.____('header');",
      answer: "getElementById",
      explanation: "getElementById accepts ID without #."
    },
    {
      id: "fill_l13_qsa_s_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::querySelector",
      level: 6,
      code: "const items = document.____('.item');\nitems.forEach(i => i.classList.add('active'));",
      answer: "querySelectorAll",
      explanation: "querySelectorAll returns NodeList with forEach."
    },
    {
      id: "fill_l13_inner_s_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::innerHTML",
      level: 5,
      code: "el.____ = userInput;  // safer than innerHTML",
      answer: "textContent",
      explanation: "textContent prevents XSS."
    },
    {
      id: "fill_l13_attr_s_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::setAttribute",
      level: 5,
      code: "el.____('data-id', '5');",
      answer: "setAttribute",
      explanation: "setAttribute(name, value)."
    },
    {
      id: "fill_l13_classlist_s_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::DOM",
      level: 5,
      code: "el.classList.____('active');  // toggles on/off",
      answer: "toggle",
      explanation: "classList.toggle flips class."
    },
    {
      id: "fill_l13_create_s_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::createElement",
      level: 5,
      code: "const div = document.____('div');\ndiv.textContent = 'hi';\ndocument.body.appendChild(div);",
      answer: "createElement",
      explanation: "createElement detached node."
    },
    {
      id: "fill_l13_append_s_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::appendChild",
      level: 4,
      code: "parent.____(child);",
      answer: "appendChild",
      explanation: "appendChild adds to end."
    },
    {
      id: "fill_l13_remove_s_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::removeChild",
      level: 4,
      code: "el.____();  // self-removal modern",
      answer: "remove",
      explanation: "Element.remove() modern method."
    },
    {
      id: "fill_l13_addev_s_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::DOM",
      level: 5,
      code: "btn.____('click', e => {\n  e.preventDefault();\n});",
      answer: "addEventListener",
      explanation: "addEventListener supports many handlers."
    },
    {
      id: "fill_l13_prevdef_s_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::DOM",
      level: 5,
      code: "form.addEventListener('submit', e => {\n  e.____();\n  // AJAX submit\n});",
      answer: "preventDefault",
      explanation: "preventDefault stops form."
    },
    {
      id: "fill_l13_stop_s_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::DOM",
      level: 6,
      code: "modal.addEventListener('click', e => {\n  e.____();\n  // stops bubble to overlay\n});",
      answer: "stopPropagation",
      explanation: "stopPropagation halts bubbling."
    },
    {
      id: "fill_l13_dataset_s_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::attribute",
      level: 6,
      code: "el.____.userId = '5';\n// equivalent to data-user-id='5'",
      answer: "dataset",
      explanation: "dataset for data-* attrs."
    },
    {
      id: "fill_l13_style_s_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::style",
      level: 5,
      code: "el.____.color = 'red';\nel.style.fontSize = '16px';",
      answer: "style",
      explanation: "el.style sets inline style."
    },
    {
      id: "fill_l13_replacewith_s_001",
      topicId: "topic_dom",
      conceptKey: "lesson_13::replaceChild",
      level: 6,
      code: "old.____(newElement);  // modern replacement",
      answer: "replaceWith",
      explanation: "Element.replaceWith modern API."
    },
  ],
};
