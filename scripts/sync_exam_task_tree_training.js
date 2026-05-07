const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const EVAL_DIR = path.join(ROOT, "svcollege_fullstack_exam_trainer_v5", "outputs", "eval");
const TRAINING_DIR = path.join(ROOT, "svcollege_fullstack_exam_trainer_v5", "outputs", "training");
const SOURCE_JSON = path.join(EVAL_DIR, "exam_tasks_tree_detailed.json");
const SOURCE_MD = path.join(EVAL_DIR, "exam_tasks_tree_detailed.md");
const SOURCE_PROMPT = path.join(EVAL_DIR, "portal_prompt_exam_tree.md");
const SOURCE_BREAKDOWN = path.join(EVAL_DIR, "exam_sections_task_breakdown.md");
const SOURCE_BREAKDOWN_JSONL = path.join(EVAL_DIR, "exam_sections_task_breakdown.jsonl");
const DATA_OUT = path.join(ROOT, "data", "exam_tasks_tree.js");

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function writeText(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, value);
}

function readJsonl(filePath) {
  return readText(filePath)
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

const CODE_RECIPES = {
  client_form_inputs: {
    title: "טופס React נשלט עם submit בטוח",
    language: "jsx",
    code: `function ExamForm({ onSave }) {
  // שומרים את כל שדות הטופס במקום אחד כדי שהמסך וה-state יהיו מסונכרנים.
  const [form, setForm] = useState({ name: "", email: "", age: "" });

  // שומרים שגיאות לפי שם שדה כדי להציג הודעה מדויקת ליד כל input.
  const [errors, setErrors] = useState({});

  // handler אחד מספיק לכל השדות כי לכל input יש name תואם.
  function handleChange(event) {
    const { name, value } = event.target;

    // מעתיקים את הערכים הקודמים כדי לא למחוק בטעות שדות אחרים.
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    // מונעים רענון דף כדי ש-React ינהל את התהליך.
    event.preventDefault();

    const nextErrors = validateExamForm(form);
    setErrors(nextErrors);

    // אם יש שגיאות, לא שולחים את הטופס.
    if (Object.keys(nextErrors).length > 0) return;

    // שולחים רק אחרי validation כדי שהמידע יהיה נקי.
    onSave(form);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} />
      {errors.name && <p>{errors.name}</p>}

      <input name="email" value={form.email} onChange={handleChange} />
      {errors.email && <p>{errors.email}</p>}

      <input name="age" value={form.age} onChange={handleChange} />
      {errors.age && <p>{errors.age}</p>}

      <button type="submit">שמירה</button>
    </form>
  );
}`,
    explanation: "Controlled form: כל input מחובר ל-state, וכל submit עובר validation לפני פעולה.",
    commonMistake: "להשתמש ב-defaultValue או לקרוא ישירות מה-DOM ואז לאבד סנכרון עם React.",
  },
  client_validation_rules: {
    title: "פונקציית validation דטרמיניסטית",
    language: "js",
    code: `function validateExamForm(form) {
  // אובייקט השגיאות מתחיל ריק ומתמלא רק בשדות לא תקינים.
  const errors = {};

  // trim מונע מצב שבו רווחים נחשבים שם תקין.
  if (!form.name || form.name.trim().length < 2) {
    errors.name = "שם חייב לכלול לפחות 2 תווים";
  }

  // בדיקה פשוטה וברורה למבנה email בסיסי.
  if (!form.email || !/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(form.email)) {
    errors.email = "אימייל לא תקין";
  }

  // ממירים למספר לפני בדיקות טווח.
  const age = Number(form.age);
  if (!Number.isInteger(age) || age < 18 || age > 120) {
    errors.age = "גיל חייב להיות מספר שלם בין 18 ל-120";
  }

  // מחזירים אובייקט; ריק פירושו שהטופס תקין.
  return errors;
}`,
    explanation: "Validation טוב הוא פונקציה טהורה: אותה כניסה תמיד מחזירה אותן שגיאות.",
    commonMistake: "להציג alert כללי במקום errors לפי שדה, ואז קשה לתקן את הטופס.",
  },
  client_navigation: {
    title: "ניווט אחרי פעולה בעזרת useNavigate",
    language: "jsx",
    code: `function AddItemPage({ api }) {
  // useNavigate מאפשר להעביר את המשתמש למסך אחר אחרי הצלחה.
  const navigate = useNavigate();

  async function handleCreate(form) {
    // שולחים בקשה לשרת ומחכים לתשובה לפני ניווט.
    const created = await api.createItem(form);

    // אם השרת לא החזיר id, לא מנווטים למסך פרטים שבור.
    if (!created || !created.id) {
      throw new Error("Create failed: missing item id");
    }

    // אחרי יצירה מוצלחת עוברים לדף הפרטים של הפריט החדש.
    navigate("/items/" + created.id);
  }

  return <ExamForm onSave={handleCreate} />;
}`,
    explanation: "ניווט במבחן צריך לקרות רק אחרי פעולה מוצלחת, לא לפני שהמידע נשמר.",
    commonMistake: "לקרוא ל-navigate לפני await ואז להגיע למסך שאין לו נתונים.",
  },
  client_list_render: {
    title: "רינדור רשימה עם key ו-filter",
    language: "jsx",
    code: `function ItemsList({ items, searchText }) {
  // מנרמלים את החיפוש כדי שלא תהיה תלות באותיות גדולות/קטנות.
  const query = searchText.trim().toLowerCase();

  // filter מחזיר רק פריטים שמתאימים לחיפוש.
  const visibleItems = items.filter((item) =>
    item.name.toLowerCase().includes(query)
  );

  return (
    <ul>
      {visibleItems.map((item) => (
        // key יציב עוזר ל-React לזהות כל שורה.
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}`,
    explanation: "רשימה טובה במבחן כוללת map, key יציב וסינון ברור לפני הרינדור.",
    commonMistake: "להשתמש באינדקס כ-key ואז לקבל באגים אחרי מחיקה או מיון.",
  },
  alerts_error_handling: {
    title: "טיפול שגיאות ברור בשרת",
    language: "js",
    code: `app.get("/api/items/:id", async (req, res) => {
  try {
    // מחפשים לפי id שהגיע מה-route.
    const item = await Item.findById(req.params.id);

    // אם אין פריט, זו לא תקלה בשרת אלא 404.
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    // הצלחה מחזירה 200 ואת הנתון.
    return res.status(200).json(item);
  } catch (error) {
    // שגיאה לא צפויה נשארת 500 כדי לא להסתיר בעיית שרת.
    return res.status(500).json({ error: "Server error" });
  }
});`,
    explanation: "במבחן חשוב להבדיל בין 404 נתון חסר לבין 500 שגיאת שרת.",
    commonMistake: "להחזיר 200 גם כשיש שגיאה, ואז ה-client לא יודע שנכשל.",
  },
  server_html_route: {
    title: "Route שמחזיר HTML בסיסי",
    language: "js",
    code: `app.get("/", (req, res) => {
  // מגדירים status 200 כי זו טעינה תקינה של דף הבית.
  res.status(200).send(\`
    <!doctype html>
    <html lang="he" dir="rtl">
      <head><meta charset="utf-8"><title>SVCollege</title></head>
      <body><h1>המערכת פעילה</h1></body>
    </html>
  \`);
});`,
    explanation: "Route HTML פשוט בודק שהשרת פעיל ומחזיר תשובה שהדפדפן יכול להציג.",
    commonMistake: "לשכוח לשלוח response ואז הבקשה נשארת תלויה.",
  },
  api_get_filtered: {
    title: "GET עם סינון query",
    language: "js",
    code: `app.get("/api/items", async (req, res) => {
  // query מגיע מהכתובת: /api/items?category=books
  const { category } = req.query;

  // בונים filter רק משדות שקיימים כדי לא לסנן בטעות הכל.
  const filter = {};
  if (category) filter.category = category;

  // find מקבל אובייקט תנאים ומחזיר מערך.
  const items = await Item.find(filter);

  // גם מערך ריק הוא תשובה תקינה.
  return res.status(200).json(items);
});`,
    explanation: "סינון GET משתמש ב-query params ובונה filter מפורש ל-Mongo/Mongoose.",
    commonMistake: "להשתמש ב-req.params במקום req.query עבור סינון מהכתובת.",
  },
  api_post_create: {
    title: "POST יצירה עם validation",
    language: "js",
    code: `app.post("/api/items", async (req, res) => {
  // מוציאים רק את השדות שמותר ליצור.
  const { name, category } = req.body;

  // validation בצד שרת חובה גם אם יש validation ב-React.
  if (!name || !category) {
    return res.status(400).json({ error: "name and category are required" });
  }

  // יוצרים מסמך חדש במסד הנתונים.
  const created = await Item.create({ name, category });

  // 201 מסמן יצירה מוצלחת.
  return res.status(201).json(created);
});`,
    explanation: "POST תקין בודק קלט, יוצר מסמך, ומחזיר 201.",
    commonMistake: "להחזיר 200 במקום 201 או ליצור בלי לבדוק שדות חובה.",
  },
  api_get_all: {
    title: "GET כל הפריטים",
    language: "js",
    code: `app.get("/api/items/all", async (req, res) => {
  // find ללא filter מחזיר את כל המסמכים.
  const items = await Item.find({});

  // מחזירים מערך גם אם אין פריטים.
  return res.status(200).json(items);
});`,
    explanation: "GET all הוא endpoint פשוט שמחזיר מערך מלא באופן צפוי.",
    commonMistake: "להחזיר null כשאין נתונים במקום מערך ריק.",
  },
  api_delete: {
    title: "DELETE עם בדיקת קיום",
    language: "js",
    code: `app.delete("/api/items/:id", async (req, res) => {
  // findByIdAndDelete מחזיר את המסמך שנמחק או null.
  const deleted = await Item.findByIdAndDelete(req.params.id);

  // אם לא נמחק כלום, ה-id לא נמצא.
  if (!deleted) {
    return res.status(404).json({ error: "Item not found" });
  }

  // מחזירים אישור ברור ל-client.
  return res.status(200).json({ deleted: true, id: deleted.id });
});`,
    explanation: "מחיקה טובה בודקת אם באמת נמחק משהו ומחזירה סטטוס מתאים.",
    commonMistake: "להחזיר הצלחה גם כש-id לא קיים.",
  },
  api_put_update: {
    title: "PUT עדכון עם new:true",
    language: "js",
    code: `app.put("/api/items/:id", async (req, res) => {
  // מגדירים אילו שדות מותר לעדכן.
  const update = {
    name: req.body.name,
    category: req.body.category,
  };

  // new:true מחזיר את המסמך אחרי העדכון.
  const updated = await Item.findByIdAndUpdate(req.params.id, update, {
    new: true,
    runValidators: true,
  });

  if (!updated) {
    return res.status(404).json({ error: "Item not found" });
  }

  return res.status(200).json(updated);
});`,
    explanation: "PUT צריך להחזיר את הערך המעודכן ולבדוק שהמסמך קיים.",
    commonMistake: "לשכוח `new: true` ולקבל את המסמך הישן בתגובה.",
  },
  db_uniqueness: {
    title: "Unique בשכבת Schema",
    language: "js",
    code: `const userSchema = new mongoose.Schema({
  // email ייחודי מונע שני משתמשים עם אותו מזהה כניסה.
  email: { type: String, required: true, unique: true },

  // name נדרש כדי שלא ייווצר מסמך ריק.
  name: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);`,
    explanation: "ייחודיות במסד הנתונים מגנה גם אם ה-client שולח נתון כפול.",
    commonMistake: "לבדוק duplicate רק ב-React ולא ב-DB.",
  },
  db_persistence: {
    title: "חיבור Mongo ושמירה",
    language: "js",
    code: `async function connectDatabase() {
  // כתובת החיבור מגיעה מהסביבה ולא נכתבת בקוד.
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error("MONGO_URI is required");
  }

  // מחכים לחיבור לפני שמפעילים routes שתלויים במסד.
  await mongoose.connect(uri);
}`,
    explanation: "Persistence אמיתי דורש חיבור DB לפני עבודה עם models.",
    commonMistake: "להפעיל שרת בלי לוודא ש-Mongo מחובר.",
  },
  js_algorithms: {
    title: "פתרון אלגוריתם JS עם בדיקת קלט",
    language: "js",
    code: `function sumEvenNumbers(numbers) {
  // קודם בודקים שהקלט הוא מערך.
  if (!Array.isArray(numbers)) {
    throw new Error("Input must be an array");
  }

  // reduce צובר סכום בצורה דטרמיניסטית.
  return numbers.reduce((sum, value) => {
    // במבחן חשוב לזרוק שגיאה על קלט לא תקין.
    if (typeof value !== "number") {
      throw new Error("All items must be numbers");
    }

    // מוסיפים רק מספרים זוגיים.
    return value % 2 === 0 ? sum + value : sum;
  }, 0);
}`,
    explanation: "שאלת JS טובה מתחילה בבדיקת קלט, ואז פתרון קצר עם תנאי ברור.",
    commonMistake: "להחזיר 0 על קלט לא תקין במקום לזרוק Error כשהדרישה מחייבת.",
  },
  node_file_io: {
    title: "קריאה וכתיבה לקובץ ב-Node",
    language: "js",
    code: `const fs = require("fs/promises");

async function appendLine(filePath, line) {
  // בודקים שהשורה היא מחרוזת כדי לא לכתוב ערך לא צפוי.
  if (typeof line !== "string" || !line.trim()) {
    throw new Error("line must be a non-empty string");
  }

  // appendFile מוסיף לסוף הקובץ בלי למחוק תוכן קודם.
  await fs.appendFile(filePath, line + "\\n", "utf8");

  // מחזירים אישור מפורש למי שקרא לפונקציה.
  return { saved: true };
}`,
    explanation: "File I/O במבחן דורש async/await, בדיקת קלט, ושמירה בלי למחוק מידע.",
    commonMistake: "להשתמש ב-writeFile כשצריך append ואז למחוק את הקובץ הקודם.",
  },
  oop_design: {
    title: "Class עם constructor ומתודה",
    language: "js",
    code: `class Product {
  constructor(name, price) {
    // constructor שומר את הערכים הראשוניים באובייקט.
    this.name = name;
    this.price = price;
  }

  isExpensive(limit) {
    // מתודה משתמשת ב-this כדי לקרוא נתונים של אותו אובייקט.
    return this.price > limit;
  }
}

const product = new Product("Book", 80);
const expensive = product.isExpensive(50);`,
    explanation: "OOP במבחן בודק constructor, this, ומתודה שמחזירה ערך.",
    commonMistake: "לשכוח `new` או להשתמש במשתנים חיצוניים במקום `this`.",
  },
  theory_explanation: {
    title: "תבנית תשובה מילולית",
    language: "text",
    code: `מה זה:
  מסבירים במשפט אחד את המושג.

למה משתמשים בזה:
  מסבירים איזו בעיה המושג פותר בקוד.

דוגמה קצרה:
  נותנים מקרה מבחן קטן שמראה שימוש.

טעות נפוצה:
  מציינים בלבול נפוץ ואיך להימנע ממנו.`,
    explanation: "שאלות תאוריה מקבלות תשובה במבנה קבוע: מה, למה, דוגמה, טעות.",
    commonMistake: "לכתוב הגדרה ארוכה בלי להסביר מתי משתמשים בזה.",
  },
  question_scope_inherited: {
    title: "זיהוי Scope של סעיף מבחן",
    language: "text",
    code: `1. קוראים את הכותרת הראשית של המבחן.
2. מסמנים אם הסעיף שייך ל-React, Backend, DB, JS או TS.
3. מחפשים מילים מחייבות כמו route, validation, schema, function.
4. אם סעיף לא טכני מספיק, מסמנים manual_review ולא נותנים ציון אוטומטי.`,
    explanation: "Scope נכון מונע תרגול לא רלוונטי ומחבר כל סעיף לענף הנכון.",
    commonMistake: "להניח שסעיף שייך ל-Frontend רק כי הוא מופיע ליד React.",
  },
};

const PROJECT_FILE_TEMPLATES = {
  frontend: {
    root: "exam-project/",
    targetFile: "src/components/ExamForm.jsx",
    files: [
      { path: "src/App.jsx", purpose: "מחבר routes, state ראשי וקומפוננטות המסלול." },
      { path: "src/components/ExamForm.jsx", purpose: "הקובץ שבו בונים את הטופס, ה-inputs וה-submit." },
      { path: "src/utils/validation.js", purpose: "פונקציות validation טהורות שחוזרות עם errors לפי שדה." },
      { path: "src/services/api.js", purpose: "קריאות fetch לשרת אחרי validation תקין." },
    ],
  },
  frontendList: {
    root: "exam-project/",
    targetFile: "src/components/ItemsList.jsx",
    files: [
      { path: "src/App.jsx", purpose: "מחזיק את המידע ומעביר props לרשימה." },
      { path: "src/components/ItemsList.jsx", purpose: "הקובץ שבו כותבים map, filter ו-key יציב." },
      { path: "src/components/SearchBox.jsx", purpose: "שדה חיפוש נשלט שמעדכן query." },
    ],
  },
  frontendRoute: {
    root: "exam-project/",
    targetFile: "src/pages/AddItemPage.jsx",
    files: [
      { path: "src/App.jsx", purpose: "מגדיר BrowserRouter ו-Routes." },
      { path: "src/pages/AddItemPage.jsx", purpose: "הקובץ שבו מבצעים create ואז navigate." },
      { path: "src/services/api.js", purpose: "מבודד את קריאת ה-POST מהקומפוננטה." },
    ],
  },
  backendRoute: {
    root: "exam-project/",
    targetFile: "server/routes/items.routes.js",
    files: [
      { path: "server/server.js", purpose: "מפעיל express, cors, express.json וחיבור routes." },
      { path: "server/routes/items.routes.js", purpose: "הקובץ שבו מוגדרים GET/POST/PUT/DELETE." },
      { path: "server/controllers/items.controller.js", purpose: "לוגיקת הבקשה, validation ו-status codes." },
      { path: "server/models/Item.js", purpose: "Schema/model אם נדרש persistence." },
    ],
  },
  database: {
    root: "exam-project/",
    targetFile: "server/models/Item.js",
    files: [
      { path: "server/config/db.js", purpose: "חיבור Mongoose עם MONGO_URI מהסביבה." },
      { path: "server/models/Item.js", purpose: "Schema, required fields, unique indexes ו-model." },
      { path: "server/routes/items.routes.js", purpose: "Routes שמשתמשים ב-model במקום מידע זמני." },
    ],
  },
  jsAlgorithm: {
    root: "exam-project/",
    targetFile: "src/utils/algorithms.js",
    files: [
      { path: "src/utils/algorithms.js", purpose: "הקובץ שבו כותבים פונקציות JS טהורות." },
      { path: "src/utils/algorithms.test.js", purpose: "בדיקות קלט תקין, קלט לא תקין ו-edge cases." },
    ],
  },
  nodeIo: {
    root: "exam-project/",
    targetFile: "server/services/fileStore.js",
    files: [
      { path: "server/services/fileStore.js", purpose: "קריאה/כתיבה לקבצים עם fs/promises." },
      { path: "server/routes/files.routes.js", purpose: "Route שמפעיל את service ומחזיר status מתאים." },
    ],
  },
  oop: {
    root: "exam-project/",
    targetFile: "src/models/Product.js",
    files: [
      { path: "src/models/Product.js", purpose: "Class, constructor ומתודות." },
      { path: "src/models/Product.test.js", purpose: "בדיקות ל-constructor, this ומתודות." },
    ],
  },
  docs: {
    root: "exam-project/",
    targetFile: "docs/exam-answer.md",
    files: [
      { path: "docs/exam-answer.md", purpose: "תשובה מילולית במבנה מה/למה/דוגמה/טעות." },
      { path: "README.md", purpose: "סיכום החלטות ורשימת קבצים רלוונטיים לתרגיל." },
    ],
  },
};

function projectTemplateForTaskId(taskId) {
  if (taskId === "client_list_render") return PROJECT_FILE_TEMPLATES.frontendList;
  if (taskId === "client_navigation") return PROJECT_FILE_TEMPLATES.frontendRoute;
  if (String(taskId || "").startsWith("client_")) return PROJECT_FILE_TEMPLATES.frontend;
  if (String(taskId || "").startsWith("api_") || taskId === "server_html_route" || taskId === "alerts_error_handling") return PROJECT_FILE_TEMPLATES.backendRoute;
  if (String(taskId || "").startsWith("db_")) return PROJECT_FILE_TEMPLATES.database;
  if (taskId === "js_algorithms") return PROJECT_FILE_TEMPLATES.jsAlgorithm;
  if (taskId === "node_file_io") return PROJECT_FILE_TEMPLATES.nodeIo;
  if (taskId === "oop_design") return PROJECT_FILE_TEMPLATES.oop;
  return PROJECT_FILE_TEMPLATES.docs;
}

function buildTechnicalSubtasks(sub, targetFile) {
  var buildSteps = Array.isArray(sub.how_to_build_code) ? sub.how_to_build_code : [];
  var steps = buildSteps.length ? buildSteps : ["לקרוא את הדרישה", "לבנות פתרון מינימלי", "לבדוק edge case"];
  return steps.map((step, index) => ({
    id: sub.task_id + "::step-" + String(index + 1).padStart(2, "0"),
    order: index + 1,
    file: targetFile,
    title: step,
    details: "פותרים בתוך `" + targetFile + "` ואז בודקים שהדרישה מסעיפי המקור מתקיימת.",
  }));
}

function conceptChecklistForSubbranch(sub) {
  var concepts = Array.isArray(sub.what_to_know) ? sub.what_to_know : [];
  return concepts.map((item, index) => ({
    id: sub.task_id + "::concept-" + String(index + 1).padStart(2, "0"),
    title: item,
    explanation: "צריך לדעת להסביר את זה בעברית פשוטה לפני שכותבים את הקוד.",
  }));
}

function simpleTaskExplanation(branch, sub, targetFile) {
  var branchLabel = branch.branch_label || "ענף מבחן";
  var steps = Array.isArray(sub.how_to_build_code) ? sub.how_to_build_code : [];
  var firstStep = steps[0] || "לבנות את החלק המבוקש";
  return "ברמת סבתא: זה תרגיל שבו לוקחים בקשה מהמבחן, מפרקים אותה לצעדים קטנים, וכותבים את החלק המרכזי בקובץ `" + targetFile + "`. קודם עושים `" + firstStep + "`, אחר כך בודקים שלא שכחנו קלט שגוי, שגיאות או מצב ריק. הענף הוא " + branchLabel + ", כלומר זה חלק שחוזר במבחנים ולכן לא מדלגים עליו.";
}

function professionalTaskExplanation(branch, sub, targetFile) {
  var taskId = sub.task_id || "technical_task";
  var concepts = Array.isArray(sub.what_to_know) ? sub.what_to_know.slice(0, 3).join(", ") : "";
  return "ברמה מקצועית: מיישמים את `" + taskId + "` כיחידת אחריות ברורה בתוך `" + targetFile + "`, לפי סעיפי המקור בלבד. הפתרון חייב לכלול זרימת קלט->עיבוד->פלט, טיפול בשגיאות ו-edge case רלוונטי, ולהישען על המושגים: " + (concepts || "דרישת הסעיף הטכנית") + ". מעבר Gate דורש להסביר למה כל קובץ בעץ קיים ומה תפקידו בקבלת 100.";
}

function sectionSimpleExplanation(row, tasks, manualReview) {
  if (manualReview) {
    return "ברמת סבתא: הסעיף הזה עדיין כמו פתק לא מספיק ברור. קודם פותחים את המקור, מבינים בדיוק מה מבקשים, ורק אז כותבים קוד. לא מנחשים ולא ממלאים לבד.";
  }
  var taskTitles = tasks.map((task) => task.title).filter(Boolean).slice(0, 2).join(", ");
  return "ברמת סבתא: סעיף " + row.idx + " הוא משימה אחת מהמבחן. קוראים את המשפט, מוצאים מה צריך לבנות, ואז עושים את זה צעד אחרי צעד. אם יש כמה קבצים, כל קובץ הוא מגירה אחרת: טופס במקום אחד, בדיקות במקום אחר, שרת או מודל במקום אחר. המשימות המרכזיות כאן: " + (taskTitles || "פירוק טכני לפי המקור") + ".";
}

function sectionProfessionalExplanation(row, tasks, manualReview) {
  if (manualReview) {
    return "ברמה מקצועית: `manual_review` אינו מקבל auto-score. צריך לחלץ contract מלא מהמקור: קלט, פלט, קובץ יעד, validation, side effects ו-Gate בדיקה.";
  }
  var targetFiles = tasks.map((task) => task.targetFile).filter(Boolean);
  var uniqueTargets = Array.from(new Set(targetFiles)).join(", ");
  return "ברמה מקצועית: סעיף " + row.idx + " ממופה ל-" + (uniqueTargets || "קובצי יעד מתוך עץ הפרויקט") + ". יש לממש רק את הדרישות שמופיעות במקור, לשמור הפרדת אחריות בין UI/validation/API/model, ולהוכיח 100 דרך הרובריקה: דרישה, קובץ יעד, בדיקות edge, הסבר קוד וללא אקראיות או נתונים מומצאים.";
}

function technicalTaskForSubbranch(branch, sub) {
  if (sub.task_id === "manual_review") return [];
  var projectTemplate = projectTemplateForTaskId(sub.task_id);
  var recipe = CODE_RECIPES[sub.task_id] || {
    title: "משימה טכנית לפי עץ סעיפי המבחן",
    language: "text",
    code: (sub.how_to_build_code || []).map((item, index) => (index + 1) + ". " + item).join("\n"),
    explanation: "משימה זו מבוססת על פירוק סעיפי המבחן ועל ההוראות הטכניות בעץ.",
    commonMistake: "לעבור הלאה בלי להסביר מה עושים ולמה.",
  };
  return [{
    id: sub.task_id + "::core-implementation",
    title: recipe.title,
    probability: Number(sub.probability || 0),
    sectionIds: sub.section_ids || [],
    whatToKnow: sub.what_to_know || [],
    howToBuildCode: sub.how_to_build_code || [],
    targetFile: projectTemplate.targetFile,
    projectFileTree: {
      root: projectTemplate.root,
      targetFile: projectTemplate.targetFile,
      files: projectTemplate.files,
    },
    conceptsToKnow: conceptChecklistForSubbranch(sub),
    technicalSubtasks: buildTechnicalSubtasks(sub, projectTemplate.targetFile),
    codeRecipe: {
      language: recipe.language,
      code: recipe.code,
      explanation: recipe.explanation,
      grandmaExplanation: simpleTaskExplanation(branch, sub, projectTemplate.targetFile),
      professionalExplanation: professionalTaskExplanation(branch, sub, projectTemplate.targetFile),
      commonMistake: recipe.commonMistake,
      gate: "להסביר בעברית את הקוד, לכתוב אותו מחדש בלי להסתכל, ולהראות edge case אחד.",
    },
    explanationLevels: {
      grandma: simpleTaskExplanation(branch, sub, projectTemplate.targetFile),
      professional: professionalTaskExplanation(branch, sub, projectTemplate.targetFile),
    },
    sourceRefs: [
      "exam_tasks_tree_detailed.json::" + branch.branch_id + "::" + sub.task_id,
      "exam_tasks_tree_detailed.md::" + branch.branch_label,
      "exam_sections_task_breakdown.md::sections:" + (sub.section_ids || []).join(","),
    ],
  }];
}

function normalizeTree(raw) {
  return {
    id: "svcollege_exam_tasks_tree_73",
    version: "exam-tasks-tree-v1",
    updated: "2026-05-06",
    sourceFiles: [
      "svcollege_fullstack_exam_trainer_v5/outputs/eval/exam_tasks_tree_detailed.json",
      "svcollege_fullstack_exam_trainer_v5/outputs/eval/exam_tasks_tree_detailed.md",
      "svcollege_fullstack_exam_trainer_v5/outputs/eval/exam_sections_task_breakdown.md",
    ],
    totalSections: Number(raw.total_sections || 0),
    assumptions: [
      "מקור האמת הוא פירוק 73 סעיפי המבחן שכבר חולצו.",
      "סעיפים עם manual_review לא מקבלים ציון אוטומטי עד פירוק טכני מלא מהמקור.",
      "לא מוסיפים fake data ולא מסיקים תוכן מתוך וידאו ללא תמלול.",
      "המסלול נשאר Exam Only: Frontend, Backend, DB, JS, Scope, Theory, Node/OOP לפי הסתברות.",
    ],
    promotionPolicy: {
      explainTest: "הסבר עברי פשוט: מה עושים, למה עושים, ומה המלכודת במבחן.",
      executeTest: "קוד עובד לפי rubric: validations, status codes, error handling, בלי any מיותר, בלי אקראיות.",
      passScore: 100,
      manualReviewRule: "manual_review = blocked-auto-score עד השלמת דרישה טכנית מהמקור.",
    },
    branches: (raw.branches || []).map((branch) => ({
      id: branch.branch_id,
      label: branch.branch_label,
      probability: Number(branch.probability || 0),
      sectionsCount: Number(branch.sections_count || 0),
      sectionIds: branch.section_ids || [],
      subbranches: (branch.subbranches || []).map((sub) => ({
        id: sub.task_id,
        probability: Number(sub.probability || 0),
        appearances: Number(sub.appearances || 0),
        sectionIds: sub.section_ids || [],
        whatToKnow: sub.what_to_know || [],
        howToBuildCode: sub.how_to_build_code || [],
        technicalTasks: technicalTaskForSubbranch(branch, sub),
        gate: sub.task_id === "manual_review"
          ? "חסום לציון אוטומטי עד עיון ידני במקור."
          : "הסבר בעברית + קוד תואם דרישה + בדיקת edge cases.",
      })),
    })),
  };
}

function buildTechnicalTaskLookup(tree) {
  var lookup = new Map();
  tree.branches.forEach((branch) => {
    (branch.subbranches || []).forEach((sub) => {
      (sub.technicalTasks || []).forEach((task) => {
        lookup.set(sub.id, { branch, subbranch: sub, task });
      });
    });
  });
  return lookup;
}

function uniqueByPath(files) {
  var seen = new Set();
  return files.filter((file) => {
    var key = String(file.path || "");
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function mergeProjectFileTrees(tasks, manualReview) {
  if (manualReview || !tasks.length) {
    return {
      root: "exam-project/",
      targetFile: "docs/source-review.md",
      files: [
        { path: "docs/source-review.md", purpose: "סעיף שמחייב עיון ידני במקור לפני ציון אוטומטי." },
        { path: "README.md", purpose: "תיעוד החלטת עיון ידני, מקור הסעיף ומה חסר לפירוק טכני." },
      ],
    };
  }
  var files = [];
  tasks.forEach((task) => {
    var tree = task.projectFileTree || {};
    files = files.concat(tree.files || []);
  });
  var targetFile = tasks[0].targetFile || "docs/exam-answer.md";
  return {
    root: "exam-project/",
    targetFile,
    files: uniqueByPath(files),
  };
}

function scoreRubricForSection(row, manualReview) {
  if (manualReview) {
    return [
      { label: "עיון ידני במקור לפני ציון", points: 100, evidence: "הסעיף סומן manual_review ולכן אין ציון אוטומטי עד פירוק טכני מלא." },
    ];
  }
  var taskIds = (row.task_ids || []).join(" ");
  if (/^js_| js_/.test(taskIds) || taskIds.includes("js_algorithms")) {
    return [
      { label: "בדיקת קלט ו-Error לפי דרישה", points: 25, evidence: "הפונקציה דוחה קלט לא תקין בצורה מפורשת." },
      { label: "אלגוריתם נכון לכל מקרי הבסיס", points: 35, evidence: "הלוגיקה מחזירה את הערך הנכון בלי mutation לא נדרש." },
      { label: "Edge cases", points: 20, evidence: "נבדקים מערך ריק, טיפוסים לא נכונים וערכים גבוליים." },
      { label: "פלט נקי והסבר קצר", points: 20, evidence: "הקוד קריא והסטודנט יודע להסביר כל שורה מרכזית." },
    ];
  }
  if (taskIds.includes("api_") || taskIds.includes("db_") || taskIds.includes("server_") || taskIds.includes("alerts_")) {
    return [
      { label: "Route/method/status code נכונים", points: 25, evidence: "ה-endpoint מתאים לדרישה ומחזיר 200/201/400/404/500 לפי מצב." },
      { label: "Validation של body/query/params", points: 20, evidence: "אין כניסה לא תקינה שממשיכה לפעולת DB או response שגוי." },
      { label: "פעולת data/DB נכונה", points: 25, evidence: "find/create/update/delete או persistence מתבצעים במקום הנכון." },
      { label: "Error handling", points: 15, evidence: "try/catch או טיפול כשל ברור בלי להסתיר שגיאות." },
      { label: "חיבור ל-client והודעה מובנת", points: 15, evidence: "התגובה חוזרת JSON ברור שהממשק יודע להציג." },
    ];
  }
  if (taskIds.includes("client_")) {
    return [
      { label: "מבנה React נכון", points: 25, evidence: "state/props/components מחולקים לקבצים הנכונים." },
      { label: "Inputs/actions/submit", points: 25, evidence: "כל פעולה שהסעיף דורש קיימת במסך." },
      { label: "Validation והודעות שגיאה", points: 20, evidence: "המשתמש מקבל הודעה ברורה לפני שליחה לא תקינה." },
      { label: "Integration מול API/route", points: 15, evidence: "fetch/navigate/render מתבצעים רק אחרי פעולה תקינה." },
      { label: "UI יציב ונגיש", points: 15, evidence: "אין overflow, יש labels, והזרימה מובנת." },
    ];
  }
  return [
    { label: "הבנת הדרישה המדויקת", points: 25, evidence: "מזהים מה הסעיף דורש ולא מוסיפים scope לא קיים." },
    { label: "יישום כל תתי-המשימות", points: 25, evidence: "כל micro_task מסומן ומופיע בקובץ יעד." },
    { label: "בדיקות ו-edge cases", points: 20, evidence: "נבדקים מקרה תקין, מקרה חסר ומקרה שגוי." },
    { label: "עץ קבצים נכון", points: 15, evidence: "הקוד נמצא בקובץ שבו הוא אמור להיות במבחן." },
    { label: "הסבר עברי נקי", points: 15, evidence: "אפשר להסביר מה כל חלק עושה ולמה." },
  ];
}

function buildBranchIdsForSection(tree, idx) {
  return tree.branches
    .filter((branch) => (branch.sectionIds || []).includes(idx))
    .map((branch) => branch.id);
}

function buildSectionTechnicalSubtasks(row, tasks, manualReview) {
  if (manualReview) {
    return [{
      id: "section-" + String(row.idx).padStart(2, "0") + "::manual-review",
      order: 1,
      title: "עיון ידני במקור",
      file: "docs/source-review.md",
      details: "הסעיף לא מפורט מספיק לציון אוטומטי; יש לפתוח את המקור ולחלץ דרישה טכנית לפני כתיבת קוד.",
    }];
  }
  var targetFile = (tasks[0] || {}).targetFile || "docs/exam-answer.md";
  var microTasks = Array.isArray(row.micro_tasks) ? row.micro_tasks : [];
  return microTasks.map((item, index) => ({
    id: "section-" + String(row.idx).padStart(2, "0") + "::micro-" + String(index + 1).padStart(2, "0"),
    order: index + 1,
    title: item,
    file: targetFile,
    details: "תת־משימה מקורית מתוך סעיף " + row.idx + "; יש לממש אותה בקובץ `" + targetFile + "` או בקובץ העזר שמופיע בעץ.",
  }));
}

function buildSectionExercises(tree, rows) {
  var lookup = buildTechnicalTaskLookup(tree);
  var exercises = rows.map((row) => {
    var manualReview = (row.task_ids || []).includes("manual_review");
    var matched = (row.task_ids || [])
      .map((taskId) => lookup.get(taskId))
      .filter(Boolean);
    var tasks = matched.map((item) => item.task);
    var fileTree = mergeProjectFileTrees(tasks, manualReview);
    var concepts = [];
    tasks.forEach((task) => {
      concepts = concepts.concat(task.conceptsToKnow || []);
    });
    var seenConcepts = new Set();
    concepts = concepts.filter((concept) => {
      var key = concept.id || concept.title;
      if (!key || seenConcepts.has(key)) return false;
      seenConcepts.add(key);
      return true;
    });
    return {
      id: "section-" + String(row.idx).padStart(2, "0"),
      idx: row.idx,
      sourceFile: row.file,
      question: row.question,
      section: row.section,
      sectionText: row.section_text,
      taskIds: row.task_ids || [],
      microTasks: row.micro_tasks || [],
      status: manualReview ? "manual_review" : "ready",
      autoScorable: !manualReview,
      rubricScale: "internal-100-checklist-not-official-points",
      branchIds: buildBranchIdsForSection(tree, row.idx),
      technicalTaskRefs: matched.map((item) => ({
        subbranchId: item.subbranch.id,
        technicalTaskId: item.task.id,
        title: item.task.title,
        targetFile: item.task.targetFile,
      })),
      projectFileTree: fileTree,
      explanationLevels: {
        grandma: sectionSimpleExplanation(row, tasks, manualReview),
        professional: sectionProfessionalExplanation(row, tasks, manualReview),
      },
      conceptsToKnow: concepts,
      technicalSubtasks: buildSectionTechnicalSubtasks(row, tasks, manualReview),
      scoreRubric: scoreRubricForSection(row, manualReview),
      howToGet100: manualReview ? [
        "לפתוח את המקור המדויק ולחלץ דרישה טכנית מלאה.",
        "לא לתת ציון אוטומטי עד שיש קלט, פלט, קובץ יעד ו-Gate מעבר.",
      ] : [
        "לקרוא את נוסח הסעיף ולא להוסיף דרישות שלא מופיעות בו.",
        "ליישם כל micro_task לפי הסדר, בקבצי היעד של עץ הפרויקט.",
        "להוסיף validation, error handling ו-edge case כאשר הם רלוונטיים לסעיף.",
        "להסביר בעברית מה כל חלק מרכזי בקוד עושה ולמה הוא שם.",
        "לוודא שאין אקראיות, אין fake data ואין תלות בווידאו ללא תמלול.",
      ],
      beyond100: manualReview ? [
        "להוסיף evidence מהמקור אחרי עיון ידני.",
      ] : [
        "להפריד פונקציות עזר טהורות כדי שהקוד יהיה קל לבדיקה.",
        "להציג הודעות שגיאה מדויקות למשתמש או ל-client.",
        "לבדוק גם מצב ריק, קלט לא תקין וכשל שרת/DB.",
        "לשמור שמות קבצים ונתיבים ברורים כדי שהבודק יבין את מבנה הפרויקט.",
      ],
      sourceRefs: [
        "exam_sections_task_breakdown.jsonl::idx:" + row.idx,
        "exam_sections_task_breakdown.md::" + row.file + "::" + row.question + "::" + row.section,
      ],
    };
  });
  var ready = exercises.filter((item) => item.status === "ready").length;
  tree.sectionExerciseSummary = {
    total: exercises.length,
    ready,
    manualReview: exercises.length - ready,
    autoScorable: ready,
    withFileTree: exercises.filter((item) => item.projectFileTree && item.projectFileTree.files && item.projectFileTree.files.length).length,
    withRubric: exercises.filter((item) => (item.scoreRubric || []).reduce((sum, row) => sum + Number(row.points || 0), 0) === 100).length,
  };
  return exercises;
}

function minutesForBranch(probability) {
  if (probability >= 55) return 80;
  if (probability >= 25) return 45;
  if (probability >= 20) return 35;
  return 25;
}

function buildStudyTasks(tree) {
  var day = 1;
  return tree.branches.map((branch, index) => {
    var minutes = minutesForBranch(branch.probability);
    var topSubbranches = branch.subbranches
      .slice()
      .sort((a, b) => b.probability - a.probability || a.id.localeCompare(b.id))
      .slice(0, 3)
      .map((sub) => sub.id)
      .join(", ");
    var task = {
      id: "exam-tree-day" + day + "-" + branch.id,
      day: "יום " + day,
      title: "עץ 73 סעיפי מבחן: " + branch.label + " (" + branch.probability + "%)",
      minutes,
      gate: "להסביר ולכתוב קוד ל-" + (topSubbranches || branch.label) + " לפי עץ המשימות.",
      branchId: branch.id,
      source: "exam_tasks_tree_detailed.json",
    };
    day = day === 7 ? 7 : day + 1;
    if (index >= 6) task.day = "יום 7";
    return task;
  });
}

function renderPersonalMarkdown(tree, sourceMarkdown) {
  var lines = [
    "# SVCollege Model Training Tree - אישי בעברית",
    "",
    "מקור אמת: `exam_tasks_tree_detailed.json` ו-`exam_tasks_tree_detailed.md` מתוך 73 סעיפי המבחן.",
    "",
    "## איך להשתמש",
    "1. עוברים לפי ההסתברות: הענפים הגבוהים קודם.",
    "2. בכל תת-ענף אומרים בקול מה צריך לדעת.",
    "3. כותבים קוד לפי `איך לבנות את הקוד`.",
    "4. מסמנים מעבר רק אם ההסבר והקוד ברמת 100.",
    "",
    "## סדר אימון משוקלל",
  ];
  tree.branches
    .slice()
    .sort((a, b) => b.probability - a.probability || a.label.localeCompare(b.label))
    .forEach((branch, index) => {
      lines.push(
        "",
        "### " + (index + 1) + ". " + branch.label + " - " + branch.probability + "%",
        "",
        "- סעיפים מכוסים: " + branch.sectionsCount,
        "- מזהי סעיפים: " + branch.sectionIds.join(", "),
      );
      branch.subbranches
        .slice()
        .sort((a, b) => b.probability - a.probability || a.id.localeCompare(b.id))
        .forEach((sub) => {
          lines.push(
            "",
            "#### " + sub.id + " - " + sub.probability + "%",
            "",
            "**מה צריך לדעת:**",
            ...sub.whatToKnow.map((item) => "- " + item),
            "",
            "**איך לבנות את הקוד:**",
            ...sub.howToBuildCode.map((item) => "- " + item),
            "",
            "**Gate 100:** " + sub.gate,
          );
          (sub.technicalTasks || []).forEach((task) => {
            lines.push(
              "",
              "**קובץ יעד:** `" + task.targetFile + "`",
              "",
              "**עץ קבצים לתרגיל:**",
              "- `" + task.projectFileTree.root + "`",
              ...task.projectFileTree.files.map((file) => "  - `" + file.path + "` - " + file.purpose),
              "",
              "**פירוק למשימות טכניות:**",
              ...task.technicalSubtasks.map((step) => "- " + step.order + ". `" + step.file + "` - " + step.title),
              "",
              "**מושגים שחייבים לדעת:**",
              ...task.conceptsToKnow.map((concept) => "- " + concept.title),
            );
          });
        });
    });
  lines.push(
    "",
    "## פירוק סעיף-סעיף ל-100",
    "",
    "הניקוד כאן הוא רובריקה פנימית של 100 נקודות לכל סעיף כדי לדעת איך להתכונן. זה לא טוען לניקוד הרשמי של המרצה.",
  );
  (tree.sectionExercises || []).forEach((exercise) => {
    lines.push(
      "",
      "### סעיף " + exercise.idx + " - " + exercise.sourceFile + " / " + exercise.question + "." + exercise.section,
      "",
      "> " + exercise.sectionText,
      "",
      "- סטטוס: " + exercise.status,
      "- ענפים: " + (exercise.branchIds || []).join(", "),
      "- משימות מקור: " + (exercise.taskIds || []).join(", "),
      "",
      "**עץ קבצים של התרגיל:**",
      "- `" + exercise.projectFileTree.root + "`",
      ...exercise.projectFileTree.files.map((file) => "  - `" + file.path + "` - " + file.purpose),
      "",
      "**תתי־משימות טכניות:**",
      ...exercise.technicalSubtasks.map((step) => "- " + step.order + ". `" + step.file + "` - " + step.title),
      "",
      "**רובריקת 100 פנימית:**",
      ...exercise.scoreRubric.map((item) => "- " + item.points + " נק׳ - " + item.label + ": " + item.evidence),
      "",
      "**איך לקבל 100:**",
      ...exercise.howToGet100.map((item) => "- " + item),
      "",
      "**מעבר ל-100:**",
      ...exercise.beyond100.map((item) => "- " + item),
    );
  });
  lines.push("", "## העץ המקורי", "", sourceMarkdown.trim(), "");
  return lines.join("\n");
}

function renderCapabilityReport(tree) {
  var rows = [];
  tree.branches.forEach((branch) => {
    branch.subbranches.forEach((sub) => {
      var autoStatus = sub.id === "manual_review" ? "blocked_manual_review" : "ready_for_model_eval";
      rows.push("| `" + branch.id + "` | `" + sub.id + "` | " + sub.probability + "% | " + autoStatus + " | " + sub.gate + " |");
    });
  });
  return [
    "# SVCollege Model Capability 100 Report",
    "",
    "דוח זה אינו טוען שהמודל כבר עבר את כל תתי-הענפים. הוא מגדיר שער אימות קשיח מתוך עץ 73 הסעיפים ומסמן מה מוכן להרצת eval ומה חסום לעיון ידני.",
    "",
    "## מדיניות מעבר",
    "- Explain Test: הסבר בעברית פשוטה.",
    "- Execute Test: קוד עובד לפי הדרישה.",
    "- ציון מעבר: 100 בלבד.",
    "- `manual_review` לא מקבל Pass אוטומטי.",
    "",
    "| Branch | Subbranch | Probability | Status | Gate |",
    "|---|---|---:|---|---|",
    ...rows,
    "",
  ].join("\n");
}

function renderPortalPrompt(tree, sourcePrompt) {
  return [
    "# SVCOLLEGE Portal Import Prompt",
    "",
    sourcePrompt.trim(),
    "",
    "## התאמה לפורטל הנוכחי",
    "- לטעון את `SVCOLLEGE_EXAM_TASKS_TREE` לפני `data/homework_exam_mode.js`.",
    "- להציג את העץ בתוך Exam100 Path, לא כתפריט בחירה חופשי.",
    "- להוסיף ללוח הימים משימות אימון weighted לפי הסתברות הענפים.",
    "- לשמור `manual_review` כחסום עד עיון ידני במקור.",
    "- לא להשתמש באקראיות, לא להוסיף fake data, ולא להסיק חומר מווידאו ללא תמלול.",
    "",
    "## סיכום אוטומטי",
    "- סעיפים: " + tree.totalSections,
    "- ענפים: " + tree.branches.length,
    "- תתי-ענפים: " + tree.branches.reduce((sum, branch) => sum + branch.subbranches.length, 0),
    "",
  ].join("\n");
}

function main() {
  var raw = JSON.parse(readText(SOURCE_JSON));
  var sourceMarkdown = readText(SOURCE_MD);
  var sourcePrompt = readText(SOURCE_PROMPT);
  var sourceBreakdown = readText(SOURCE_BREAKDOWN);
  var sourceBreakdownRows = readJsonl(SOURCE_BREAKDOWN_JSONL);
  var tree = normalizeTree(raw);
  tree.sectionExercises = buildSectionExercises(tree, sourceBreakdownRows);
  tree.studyTasks = buildStudyTasks(tree);
  tree.studyMinutes = tree.studyTasks.reduce((sum, task) => sum + Number(task.minutes || 0), 0);
  tree.studyLabel = Math.floor(tree.studyMinutes / 60) + " שעות";
  tree.breakdownSourceExcerpt = sourceBreakdown.split("\n").slice(0, 20).join("\n");

  writeText(DATA_OUT, [
    "// data/exam_tasks_tree.js",
    "// Auto-generated from svcollege_fullstack_exam_trainer_v5/outputs/eval/exam_tasks_tree_detailed.json.",
    "// Do not edit manually; run: node scripts/sync_exam_task_tree_training.js",
    "var SVCOLLEGE_EXAM_TASKS_TREE = " + JSON.stringify(tree, null, 2) + ";",
    "",
  ].join("\n"));

  writeText(
    path.join(TRAINING_DIR, "SVCOLLEGE_MODEL_TRAINING_TREE_PERSONAL_HE.md"),
    renderPersonalMarkdown(tree, sourceMarkdown),
  );
  writeText(
    path.join(TRAINING_DIR, "SVCOLLEGE_MODEL_TRAINING_TREE_MACHINE.json"),
    JSON.stringify(tree, null, 2) + "\n",
  );
  writeText(
    path.join(TRAINING_DIR, "SVCOLLEGE_MODEL_CAPABILITY_100_REPORT.md"),
    renderCapabilityReport(tree),
  );
  writeText(
    path.join(TRAINING_DIR, "SVCOLLEGE_PORTAL_IMPORT_PROMPT.md"),
    renderPortalPrompt(tree, sourcePrompt),
  );

  console.log(JSON.stringify({
    ready: true,
    totalSections: tree.totalSections,
    sectionExercises: (tree.sectionExercises || []).length,
    sectionExerciseSummary: tree.sectionExerciseSummary,
    branches: tree.branches.length,
    subbranches: tree.branches.reduce((sum, branch) => sum + branch.subbranches.length, 0),
    studyMinutes: tree.studyMinutes,
    outputs: [
      path.relative(ROOT, DATA_OUT),
      "svcollege_fullstack_exam_trainer_v5/outputs/training/SVCOLLEGE_MODEL_TRAINING_TREE_PERSONAL_HE.md",
      "svcollege_fullstack_exam_trainer_v5/outputs/training/SVCOLLEGE_MODEL_TRAINING_TREE_MACHINE.json",
      "svcollege_fullstack_exam_trainer_v5/outputs/training/SVCOLLEGE_MODEL_CAPABILITY_100_REPORT.md",
      "svcollege_fullstack_exam_trainer_v5/outputs/training/SVCOLLEGE_PORTAL_IMPORT_PROMPT.md",
    ],
  }, null, 2));
}

main();
