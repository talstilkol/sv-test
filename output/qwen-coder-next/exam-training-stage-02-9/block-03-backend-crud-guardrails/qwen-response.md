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

