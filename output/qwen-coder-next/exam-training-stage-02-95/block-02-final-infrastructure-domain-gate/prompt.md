SYSTEM:
You are Qwen3-Coder-Next acting as a final infrastructure/domain gate. Return Hebrew output. Penalize both over-invention and over-rejection.

TASK:
Answer 20 final gate cases before Stage 3. Classify each as required, allowed infrastructure, allowed implementation detail, forbidden domain invention, or unknown/unavailable. Include: server/package.json, server/server.js, server/models/Book.js, server/routes/books.js, dotenv, cors, express.json, mongoose.connect, /health, timestamps, _id, __v, seed data, title/author/year/genre/isAvailable/borrowedBy, duplicate title, borrowedBy array, status code 201, status code 204. Then score out of 100 and produce one corrected Stage 3 Backend CRUD prompt. The prompt must require runnable backend file-bundle and forbid domain inventions.

RUNNABLE INFRASTRUCTURE POLICY:
### 🔍 **补正：Stage 2.9 Gate Assessment — SV Library Infrastructure Classification**

> **הערה מרכזית**:  
> ב-Stage 2.75 והקודם ל-stage 3, **הטילו איסור מופרז** על קבצי תשתית הרצה (server.js, index.js, package.json).  
> **הטיה תקנית** — יש להפריד בין **عقد רישום (DOMAIN CONTRACT)** לבין **תשתית ריצה (RUNNABLE INFRASTRUCTURE)**.  
>  
> ✅ **תשתית ריצה מותרת** — רק אם מוצגת *בפורמט מינימלי ומותאם* לפי ה-contract, אך *אינה חלק מה-verifiable contract logic*.  
> ❌ **/domain inventions** — כל שדה, שדה-סכמה, endpoint, או אינטראקציה עם DB ש*אינו* נרשום במפורש ב-contract.  

---

## 📋 **Classification of Files / Tokens (SV Library Context)**  
*(Based on runnable infrastructure vs. domain contract)*

| Token/File | Classification | Reason |
|------------|----------------|--------|
| `package.json` | **Allowed (Infrastructure)** | חובה להפעלת Express + Mongoose. *אסור לפרט תوابעים חיצוניים* (למשל `nodemon`, `cors` יש להגדיר כ-`dependencies` אך לא להדגיש). מותר *רק* כקובץ גלוי ל-`npm install`. **אסור להפריע ל-contract** — לא מ添 שדות مثل `scripts` מובנים (למשל `start`, `dev`). |
| `server.js` / `index.js` | **Allowed (Infrastructure)** | *תשתית קצה* שמדביקה את ה-routes ל-`app`. דרישה מינימלית להפעלת ה-server. **אסור להוסיפו ל-contract logic** — רק `app.use(...)`, `app.listen()`, `require("./routes/book")`. **אין הוספת login/health checks חיצוניים**. |
| `.env.example` | **Allowed (Infrastructure)** | תבנית להגדרות בסיסיות (`MONGO_URI`). **אסור להדביק `.env` ב-runtime** או לנקוט ב-`dotenv` אם לא מבקש במפורש. |
| `express` | **Allowed (Required Token)** | מופיע ב-`requiredTokens` של ה-contract. |
| `cors` | **Allowed (Required Token)** | מופיע ב-`requiredTokens`. |
| `mongoose` | **Allowed (Required Token)** | מופיע ב-`requiredTokens`. |
| `dotenv` | **Forbidden (Infrastructure)** | *לא* מופיע ב-`requiredJsTokens`. **אסור**除非 task מבקש *במפורש* `process.env.MONGO_URI` *בלי* dotenv (הcontract כבר מתייחס ל-MONGO_URI ישירות). |
| `nodemon` | **Forbidden (Infrastructure)** | כלים לפיתוח (dev tools) *אסור* ב-contract. לא מ添 `scripts` שמציגים `nodemon`. |
| `routes`, `models`, `controllers` | **Allowed (Infrastructure)** | *המפריד בין infrastructure ו-contract* — כל logica属于 `controllers` must be *exactly* according to contract, but folder/file structure *is allowed*. |
| `_id` in Mongo responses | **Forbidden (Domain)** | Trap #19 — אסורה בתשובה JSON. אסורה גם באrefix ב-`controllers` או `routes`. |
| `timestamps` (in schema) | **Forbidden (Domain)** | Schema must declare `{ timestamps: false }`. כל תוספת של `createdAt`/`updatedAt` = domain invention. |
| `createdAt` | **Forbidden (Domain)** | Trap #11 — אסורה לפי contract. |
| `/health` | **Forbidden (Domain)** | לא מופיע ב-`allowedEndpoints`. כל endpoint חוץ מאלה המוגדרים = domain invention. |

> ✅ **הנחיות שימור של שילוב ריצה+contract**:  
> - `server.js` או `index.js` מותרות, *אך רק עם* `app.use(express.json())`, `app.use(cors())`, `app.use("/api/books", bookRoutes)` — *ללא* הוספת logger, auth, error-handling חיצוני.  
> - `package.json` מותר, *אך רק עם* `dependencies` של `express`, `cors`, `mongoose`, ו-`scripts` *רק* של `start: "node index.js"` — *ללא* `nodemon`, `dev:`, או `build:`.  
> - **אין התחייבות על שמות קבצים** — מותר `app.js` במקום `server.js` או `index.js`, אבל *ה(contract logic must stay in models/controllers/routes)*.

---

## ✅ **Stage 3 Prompt (Corrected — Runnable Backend Allowed)**  
*(Hebrew-only, no domain inventions, infrastructure enabled)*

```hebrew
הכן את ה-backend של SV Library using Express + Mongoose **בתחביר JavaScript**, לפי האמת הרגילה הבאה:

### 📦 פקודה: Generate完整 runnable backend (3+1 files)
- צורת פלט: *תשתית רצה* — יש לספק 4 קבצים:  
  `package.json`  
  `index.js`  
  `src/models/Book.js`  
  `src/controllers/book.js`  
  `src/routes/book.js`  
- מותר גם `server.js` במקום `index.js`, אך *אסור* `.ts`, `.jsx`, או שמות קבצים אחרים.

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

#### ✅ endpoints — **רק**:
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

#### ✅ package.json — רק:
```json
{
  "type": "module",
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "mongoose": "^7.6.0"
  },
  "scripts": {
    "start": "node index.js"
  }
}
```

### 🧱 תבנית חובה (לא ניתן לשינוי):

```js
// package.json — Infrastructure only
{
  "type": "module",
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "mongoose": "^7.6.0"
  },
  "scripts": {
    "start": "node index.js"
  }
}
```

```js
// index.js — infrastructure only (no domain logic)
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bookRoutes from "./src/routes/book.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/books", bookRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("MongoDB connected");
  app.listen(3000, () => console.log("Server running on port 3000"));
});
```

```js
// src/models/Book.js — domain logic only
import { Schema, model } from "mongoose";

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true, enum: ["Fiction", "Science", "History", "Biography"] },
  isAvailable: { type: Boolean, required: true, default: true },
  borrowedBy: { type: String }
}, { timestamps: false });

export default model("Book", BookSchema);
```

```js
// src/controllers/book.js — inline validation + try/catch only
import Book from "../models/Book.js";

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

// (השארת functions — מוגדרות ב-template_stage 3)

export default {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  borrowBook
};
```

```js
// src/routes/book.js — infrastructure only
import { Router } from "express";
import * as bookController from "../controllers/book.js";

const router = Router();
router.post("/", bookController.createBook);
router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBookById);
router.put("/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);
router.post("/borrow/:id", bookController.borrowBook);

export default router;
```

**הערה אחרונה**:  
- כל קובץ חייב להיות **בשנות קובץ `.js`** — לא `.ts`.  
- אין הוספה של endpoints, שדות, או tokens *שלא* מופיעים במפורש ב-contract.  
- אין domain inventions — כל לוגיקה必须 to match exactly the schema, endpoints, validation, and responses.  
**מוכן להפעלת Stage 3.**
```

✅ **Stage 3 ready** —Runnable infrastructure now allowed *without* over-rejection.



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
