SYSTEM:
You are Qwen3-Coder-Next in runnable-infrastructure remediation mode. Return Hebrew output. Fix over-rejection. Domain inventions are forbidden; runnable infrastructure is allowed when necessary to run/build/evaluate.

TASK:
The previous gate wrongly forbade server.js/index.js/package.json, making backend non-runnable. Create a corrected policy that separates DOMAIN CONTRACT from RUNNABLE INFRASTRUCTURE. For SV Library, classify these files/tokens: package.json, server.js/index.js, .env.example, express, cors, mongoose, dotenv, nodemon, routes, models, controllers, _id in Mongo responses, timestamps, createdAt, /health. Say allowed/forbidden and why. End with a corrected Stage 3 start prompt that requires runnable backend files and still forbids domain inventions.

BAD GATE OUTPUT:
הנה התשובה בimeline:

---

### 🧾 **Stage 2.9 Gate Assessment — SV Library Contract**

#### ✅ **4 שאלות契约-מגבות (Contract-Backed)**  
| # | Request | Decision | Reason |
|---|---------|----------|--------|
| 1 | `genre` must be one of `["Fiction", "Science", "History", "Biography"]` | **contract-backed** | `requiredValidationTerms` per contract |
| 2 | `POST /api/books/borrow/:id` endpoint allowed | **contract-backed** | Explicit in `allowedEndpoints` |
| 3 | `status` codes: `400`, `404`, `500` | **contract-backed** | `requiredStatusCodes` listed |
| 4 | `mongoose.connect(process.env.MONGO_URI)` required | **contract-backed** | In `requiredTokens` |

✅ ✅ ✅ ✅

---

#### ✅ **4 שאלות הוספה מפורשת במשימה (Explicit Task Additions)**  
| # | Request | Decision | Reason |
|---|---------|----------|--------|
| 1 | `borrowedBy` must be string (scalar) | **explicit task addition** | Task: *"`borrowedBy: string` (scalar)"* — explicit override of ambiguity |
| 2 | No timestamps in schema | **explicit task addition** | Task: *"`timestamps: false` — mandatory"* |
| 3 | `res.status(201).json(...)` for `POST /api/books` | **explicit task addition** | Task: *"`201` for creation"* |
| 4 | `borrowBook` must check `isAvailable === true` | **explicit task addition** | Task: *"`POST /api/books/borrow/:id` — only if available"* |

✅ ✅ ✅ ✅

---

#### ✅ **4 שאלות פרטIMPLEMENTATION details (Implementation Details)**  
| # | Request | Decision | Reason |
|---|---------|----------|--------|
| 1 | `try/catch` in controller (DB calls only) | **implementation detail** | Minimal error handling — no logic beyond `throw new Error` |
| 2 | `res.status(code).json(...)` in *all* responses | **implementation detail** | Only way to comply with status code + JSON requirements |
| 3 | Safe destructuring: `const { title } = req.body` | **implementation detail** | No logic added, only reads provided fields |
| 4 | `app.use(express.json())` in `index.js` | **implementation detail** | Required to parse `req.body`; `express.json` in `requiredTokens` |

✅ ✅ ✅ ✅

---

#### ✅ **4 שאלות הימנעות מ الاختراع (Forbidden Inventions)**  
| # | Request | Decision | Reason |
|---|---------|----------|--------|
| 1 | Return `_id` in response JSON | **forbidden invention** | Trap #19 — `_id` forbidden per Stage 2.75 |
| 2 | Add `createdAt` in schema (even if unused) | **forbidden invention** | Trap #11 — `timestamps: false` mandatory |
| 3 | Use `Array.isArray()` to validate `borrowedBy` (if scalar) | **forbidden invention** | Task says `borrowedBy: string`, so `typeof` only — `Array.isArray` is wrong tool |
| 4 | Add `POST /api/books/available` endpoint | **forbidden invention** | Not in `allowedEndpoints` — only `/borrow/:id` is special |

✅ ✅ ✅ ✅

---

### 📊 **Score Calculation**

| Component | Score | Notes |
|---------|--------|-------|
| Contract-backed | **25/25** | All 4 correct |
| Task additions | **25/25** | All 4 correct |
| Implementation details | **25/25** | All 4 correct |
| Forbidden inventions | **25/25** | All 4 correctly rejected |
| Hebrew output only | **+0/-0** | Full Hebrew compliance |
| Template compliance | **+0/-0** | Ready for Stage 3 |

➡️ **Total: 100/100**  
✅ **PASS — Ready for Stage 3 Backend CRUD**

---

### ✅ **Stage 3 Prompt (Exact, File-Bundle, SV Library Only)**

```hebrew
הכן את ה-backend של SV Library using Express + Mongoose **בתחביר TypeScript/JavaScript**, לפי האמת הרגילה הבאה:

### 📦 פקודה: Generate完整 file-bundle backend CRUD
- צורת פלט: *תשתית רצה* — יש לספק 3 קבצים:  
  `src/models/Book.js`  
  `src/controllers/book.js`  
  `src/routes/book.js`  
- לא מותר: שמות קבצים אחרים, קבצי `server.js`, `index.js`, או `app.js`, או `.ts`.

### 🎯 כללים מחייבים (לפי SV LIBRARY CONTRACT + משימה)

#### ✅ שדה-סכמה (Schema) — רק:  
`title`, `author`, `year`, `genre`, `isAvailable`, `borrowedBy`  
- **אסור**: `_id`, `createdAt`, `updatedAt`, `__v`, `status`, `username`, `password`  
- `{ timestamps: false }` — חובה.

#### ✅ אימות (Validation) — רק ב-inline, עם:  
`typeof`, `Number.isInteger`, `includes()`, `throw new Error`  
- אסורים: regex, validators חיצוניים, middleware  
- לדוגמה:  
  ```js
  if (typeof genre !== "string" || !["Fiction","Science","History","Biography"].includes(genre)) {
    return res.status(400).json({ error: "Invalid genre" });
  }
  ```

#### ✅ endpoint-Endpoints — **רק**:
- `POST /api/books`  
- `GET /api/books`  
- `GET /api/books/:id`  
- `PUT /api/books/:id`  
- `DELETE /api/books/:id`  
- `POST /api/books/borrow/:id`

#### ✅ status codes — רק:
`200`, `201`, `400`, `404`, `500`

#### ✅ responses — רק:  
- `res.status(code).json({ ... })`  
- Error: `{ error: "..." }`  
- Success: **שכיח רק** השדות המוגדרים — בלי `_id`, `__v`, `createdAt`, `updatedAt`

#### ✅ borrowBook logic — רק:  
- בדוק `isAvailable === true`  
- עדכן `isAvailable: false`, `borrowedBy: <string>`  
- חזר: book without hidden fields

#### ✅ tokens — רק:
`express.json`, `cors`, `mongoose.connect`  
- אסורים: `jwt`, `bcrypt`, `validator`, `winston`, `dotenv`

### 🧱 תבנית חובה (לא ניתן לשינוי):

```ts
// src/models/Book.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true, enum: ["Fiction", "Science", "History", "Biography"] },
  isAvailable: { type: Boolean, required: true, default: true },
  borrowedBy: { type: String }
}, { timestamps: false });

module.exports = mongoose.model("Book", BookSchema);
```

```ts
// src/controllers/book.js — inline validation + try/catch only
const Book = require("../models/Book");

const createBook = async (req, res) => {
  const { title, author, year, genre, isAvailable, borrowedBy } = req.body;

  if (typeof title !== "string" || !title.trim()) {
    return res.status(400).json({ error: "title must be a non-empty string" });
  }
  if (typeof author !== "string" || !author.trim()) {
    return res.status(400).json({ error: "author must be a non-empty string" });
  }
  if (typeof year !== "number" || !Number.isInteger(year)) {
    return res.status(400).json({ error: "year must be an integer" });
  }
  if (typeof genre !== "string" || !["Fiction","Science","History","Biography"].includes(genre)) {
    return res.status(400).json({ error: "Invalid genre" });
  }
  if (typeof isAvailable !== "boolean") {
    return res.status(400).json({ error: "isAvailable must be a boolean" });
  }
  if (typeof borrowedBy !== "string") {
    return res.status(400).json({ error: "borrowedBy must be a string" });
  }

  try {
    const newBook = new Book({ title, author, year, genre, isAvailable, borrowedBy });
    await newBook.save();
    res.status(201).json({
      title: newBook.title,
      author: newBook.author,
      year: newBook.year,
      genre: newBook.genre,
      isAvailable: newBook.isAvailable,
      borrowedBy: newBook.borrowedBy
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books.map(book => ({
      title: book.title,
      author: book.author,
      year: book.year,
      genre: book.genre,
      isAvailable: book.isAvailable,
      borrowedBy: book.borrowedBy
    })));
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json({
      title: book.title,
      author: book.author,
      year: book.year,
      genre: book.genre,
      isAvailable: book.isAvailable,
      borrowedBy: book.borrowedBy
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, year, genre, isAvailable, borrowedBy } = req.body;

  // inline validation (same as createBook)
  if (typeof title !== "string" || !title.trim()) {
    return res.status(400).json({ error: "title must be a non-empty string" });
  }
  if (typeof author !== "string" || !author.trim()) {
    return res.status(400).json({ error: "author must be a non-empty string" });
  }
  if (typeof year !== "number" || !Number.isInteger(year)) {
    return res.status(400).json({ error: "year must be an integer" });
  }
  if (typeof genre !== "string" || !["Fiction","Science","History","Biography"].includes(genre)) {
    return res.status(400).json({ error: "Invalid genre" });
  }
  if (typeof isAvailable !== "boolean") {
    return res.status(400).json({ error: "isAvailable must be a boolean" });
  }
  if (typeof borrowedBy !== "string") {
    return res.status(400).json({ error: "borrowedBy must be a string" });
  }

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, year, genre, isAvailable, borrowedBy },
      { new: true }
    );
    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json({
      title: updatedBook.title,
      author: updatedBook.author,
      year: updatedBook.year,
      genre: updatedBook.genre,
      isAvailable: updatedBook.isAvailable,
      borrowedBy: updatedBook.borrowedBy
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const borrowBook = async (req, res) => {
  const { id } = req.params;
  const { borrowedBy } = req.body;

  if (typeof borrowedBy !== "string") {
    return res.status(400).json({ error: "borrowedBy must be a string" });
  }

  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    if (!book.isAvailable) {
      return res.status(400).json({ error: "Book is not available" });
    }

    book.isAvailable = false;
    book.borrowedBy = borrowedBy;
    await book.save();

    res.json({
      title: book.title,
      author: book.author,
      year: book.year,
      genre: book.genre,
      isAvailable: book.isAvailable,
      borrowedBy: book.borrowedBy
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createBook, getAllBooks, getBookById, updateBook, deleteBook, borrowBook };
```

```ts
// src/routes/book.js
const express = require("express");
const router = express.Router();
const { createBook, getAllBooks, getBookById, updateBook, deleteBook, borrowBook } = require("../controllers/book");

router.post("/", createBook);
router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);
router.post("/borrow/:id", borrowBook);

module.exports = router;
```

**הערה אחרונה**: כל קובץ חייב להיות **בשנות קובץ `.js`** — לא `.ts`. אין הוספה של שמות משתנים חסרי קשר (למשל `ctx`, `user`, `session`).  
**ההנחיות מחייבות — שגיאה אחת = נדחה.**  
**מוכן להפעלת Stage 3.**
```



PREVIOUS GUARDRAILS:
```hebrew
# 📜 סיפקוד_stage 3: מסגרת הגנת CRUD ל-backend (SV Library)

## ✅ ועדה מקדימה – Before-code checklist ( Obligatory )
 قبل ש-Qwen3-Coder-Next יכתוב קוד, עליו למלא את ה Checklist הבא — **אי-מלאו =拒绝 (拒绝)**.

| # | Checkpoint | Critical? | Action if ❌ |
|---|-----------|---------|-------------|
| 1 | האם נבחרה *רק* ה contracting: `SV Library`? | ✅ | חזרה לאחרונה: לא מותר לשכתב את ה-contract |
| 2 | האם כל ה-`allowedEndpoints` שומצו *במדויק* (ללא הוספות/שנויות)? | ✅ | בדיקה ידנית של כל ה-endpoints ב-contract |
| 3 | האם כל השדות במופע של Book (schema/response) הם *רק*: `title`, `author`, `year`, `genre`, `isAvailable`, `borrowedBy`? | ✅ | סילוק: `_id`, `createdAt`, `__v`, `status`, `username`, `password` |
| 4 | האם *אין* `timestamps: true` (מוגדר `timestamps: false`)? | ✅ | עقدת schema מחייבת `timestamps: false` |
| 5 | האם כל האימות הוא *ב-inline* — רק עם `typeof`, `Number.isInteger`, `includes()`, `throw new Error`? | ✅ | נילוח: regex, validators חיצוניים, middleware |
| 6 | האם לא נעשה שימוש ב-`_id` בתשובה JSON? | ✅ | איסור מוחלט (trap #19) |
| 7 | האם כל ה-status codes נרשמים *רק*: `400`, `404`, `500`, `200`, `201`? | ✅ | אין `204`, `302`, `206`, וכו' |
| 8 | האם כל ה-responses משלבים `res.status(code).json({...})`? | ✅ | לא מותר `send()`, `end()`, או `res.json()` ללא status |
| 9 | האם לא נוספו tokens חיצוניים (למשל `jwt`, `bcrypt`, `validator`, `winston`, `dotenv`)? | ✅ | רק: `express.json`, `cors`, `mongoose.connect` |
| 10 | האם ה-endpoint `POST /api/books/borrow/:id` נבנה *במינהו* — רק אם `isAvailable === true`, ומעדכן `isAvailable: false`, `borrowedBy: <user>`? | ✅ | לא מותר לוגיקה חיצונית (历史, concurrency, etc.) |

> ⚠️ אם *כל* הסעיפים ✓ → אפשר להתחיל ב-CRUD.  
> אם *אף אחד* ❌ → חזרה ל-stage 2.75, בקשת הסבר מפורט.

---

## 📐 שיטת סיווג קולות (Classification Rubric)

| Score | Threshold | Description |
|-------|----------|-------------|
| **100** | All checklist items ✅ + Zero tier-D violations | מושלמת — ניסיון מדויק, לא מוחלט |
| **90–99** | All ✅, אך יש אופציה לتحسين (למשל: קוראים `req.body` יותר מידי) | מمتاز – לא מפוקפק |
| **70–89** | 1–2 checklist items ❌, *אך* לא מפרים tier-D | סביר – יש לתקן细节 |
| **50–69** | 3 checklist items ❌ או tier-D *بسيط* (למשל `createdAt` ב-schema) | חמור – צריך למחוק ולהתפנות |
| **<50** | ≥1 forbidden traps ( `_id`, `regex`, `jwt`, `POST /login`) | נדחה — violates Stage 2.75 policy |
| **0** | violates *multiple* tier-D traps *או* מ添 תבנית ה-contract | לא מותר |

> 🔑 **הנחיות דירוג**:  
> - כל *trap* מפורט ב-contract (למשל `_id`, `createdAt`, `regex`) = **-20 נק'**.  
> - כל *invention* שמותאמת ל-tier (D) = **-20 נק'**.  
> - כל שגיאה ב-checklist = **-10 נק'** (אם לא קשורה ל-tier-D).  
> - שפה must be **Hebrew** — English = **-5 נק'**.

---

## ✅ תבנית מינימלית (Obligatory Template)

```ts
// src/models/Book.js — מחייבת `timestamps: false`
const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true, enum: ["Fiction", "Science", "History", "Biography"] },
  isAvailable: { type: Boolean, required: true, default: true },
  borrowedBy: { type: String }
}, { timestamps: false });

module.exports = mongoose.model("Book", BookSchema);
```

```ts
// src/controllers/book.js — inline validation *רק* עם allowed JS tokens
const Book = require("../models/Book");

const createBook = async (req, res) => {
  const { title, author, year, genre, isAvailable, borrowedBy } = req.body;

  // שורה אחת ל-validation — מדויק, לא מובנה
  if (typeof title !== "string" || !title.trim()) {
    return res.status(400).json({ error: "title must be a non-empty string" });
  }
  // (השארת validation שמותאמת ל-8 שורות — מוגדרת ב-contract)

  try {
    const newBook = new Book({ title, author, year, genre, isAvailable, borrowedBy });
    await newBook.save();
    res.status(201).json({
      title: newBook.title,
      author: newBook.author,
      year: newBook.year,
      genre: newBook.genre,
      isAvailable: newBook.isAvailable,
      borrowedBy: newBook.borrowedBy
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createBook, getAllBooks, getBookById, updateBook, deleteBook, borrowBook };
```

```ts
// src/routes/book.js — endpoints *רק* מ-contract
const express = require("express");
const router = express.Router();
const { createBook, getAllBooks, getBookById, updateBook, deleteBook, borrowBook } = require("../controllers/book");

router.post("/", createBook);
router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);
router.post("/borrow/:id", borrowBook); // *מחייב* בדיקת זמינות

module.exports = router;
```

---

## 🧩 סיכום מ_policy

| Tier |_allowed?| Example from SV Library |
|------|--------|--------------------------|
| (A) Contract-backed | ✅ | `genre === "Fiction"` |
| (B) Task-explicit | ✅ | `borrowedBy: <string>` (from task) |
| (C) Implementation detail | ✅ | `res.status(201).json(...)` |
| (D) Forbidden invention | ❌ | `res.json({ ...book, _id })` |

> ✅ **הנחיות אחרונות**:  
> - `availableCount`, `borrowedCount`, `oldestYear`, `newestYear`, `mostCommonGenre` — **.allowedJsTokens**, אך **אסור לשumoת** אלא אם *מבקש במשימה*.  
> - כל `requiredJsTokens` **אסור לשumoת עם לוגיקה** — רק אם task מבקש explicitly.  
> - אין חוסר ידיעה = דרישה. אם לא מובן — לבקש הסבר.  

**בכל מקרה: חוסר ודאות = "unknown/unavailable" (לא נדחה — ממתין להבהרה).**  
**הנחיות מדויקות = הצלחה ב-100%**.

---  
**Qwen3-Coder-Next ready** — חכות להגשה.  
```



SV LIBRARY CONTRACT:
{
  "contractVersion": "qwen-output-contract-v1",
  "name": "SV Library Simulation",
  "allowedEndpoints": [
    "GET /",
    "GET /api/books",
    "GET /api/books/:id",
    "POST /api/books",
    "PUT /api/books/:id",
    "DELETE /api/books/:id",
    "POST /api/books/borrow/:id"
  ],
  "requiredTokens": [
    "express.json",
    "cors",
    "mongoose.connect",
    "BrowserRouter",
    "Routes",
    "Route",
    "useNavigate",
    "useParams",
    "useEffect",
    "VITE_API_URL"
  ],
  "requiredValidationTerms": [
    "title",
    "author",
    "year",
    "genre",
    "isAvailable",
    "borrowedBy",
    "Fiction",
    "Science",
    "History",
    "Biography"
  ],
  "requiredStatusCodes": [400, 404, 500],
  "requiredJsTokens": [
    "Array.isArray",
    "throw new Error",
    "availableCount",
    "borrowedCount",
    "oldestYear",
    "newestYear",
    "mostCommonGenre"
  ],
  "requiredTsTokens": [
    "interface Book",
    "Partial<Book>",
    "filterBooks"
  ]
}
