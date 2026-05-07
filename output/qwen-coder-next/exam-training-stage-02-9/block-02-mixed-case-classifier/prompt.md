SYSTEM:
You are Qwen3-Coder-Next acting as a mixed-case requirement classifier. Return Hebrew output. Classify mechanically. Do not solve code.

TASK:
Create and answer 30 classification cases. Each case must be one of: contract-backed, explicit task addition, implementation detail, forbidden invention, or unknown/unavailable. Include tricky cases: extra /health route, server/package.json, client/index.html, timestamps, createdAt, regex not supplied, duplicate title, borrowedBy, appointment conflict, status route, role enum, password/login, seed data, auth tokens. For each case include the decision and one-line reason. End with a reusable decision tree for Stage 3.

BALANCED POLICY:
### 🧩 **Fixing Stage 2.75 Weakness: Over-Strictness**
The previous "contract-only → zero tolerance" policy blocked *reasonable implementation details* and *task-explicit additions*, leading to false rejections. We now define a **balanced 4-tier policy** to distinguish:

| Tier | Description | Allowed? | Why? |
|------|-------------|--------|------|
| **(A) Contract-Backed** | Directly specified in contract (fields, endpoints, enums, required tokens) | ✅ Yes | Explicitly permitted by contract |
| **(B) Task-Explicit Addition** | Not in contract, but *explicitly required in current task text* | ✅ Yes | Task overrides silence; no inference assumed |
| **(C) Reasonable Implementation Detail** | Not specified, but *minimal, safe, and necessary for contract execution* (e.g., `res.json()`, `try/catch`, inline validation helper *without logic*) | ✅ Yes | No semantic added; enables contract execution |
| **(D) Forbidden Invention** | Implied, assumed, or invented beyond contract + task | ❌ Forbidden | Violates Stage 2.75 intent: no external knowledge |

> 🔑 **Key Principle**:  
> If something is *not* in contract **and not** in task text, ask:  
> *"Is this minimally required to execute the contract (e.g., send JSON response, catch DB errors)? If yes → (C). Else → (D)."*

---

### ✅ 20 Examples Using SV Library Contract  
*(All examples derive from `SV LIBRARY CONTRACT` + current task.)*

| # | Code / Request | Allowed? | Reason |
|---|----------------|----------|--------|
| 1 | `genre` field: validate `["Fiction", "Science", "History", "Biography"]` | ✅ (A) | Contract explicitly requires these values (requiredValidationTerms) |
| 2 | `POST /api/books/borrow/:id` endpoint exists | ✅ (A) | Explicit in `allowedEndpoints` |
| 3 | `res.status(201).json(book)` after creation | ✅ (C) | Required to return created resource (REST standard), but *201 not in contract* → still allowed as minimal implementation detail. No semantics added. |
| 4 | Adding `try/catch` in controller | ✅ (C) | Minimal error handling for DB failures — no logic beyond `throw new Error` (already allowed) |
| 5 | Using `mongoose.connect(process.env.MONGO_URI)` | ✅ (A) | Required token: `mongoose.connect` — explicit |
| 6 | Returning `{ error: "Invalid genre" }` | ✅ (A) | Contract mandates `requiredStatusCodes` [400,404,500]; 400 error with message is only way to signal enum violation |
| 7 | Adding `required: true` in Mongoose schema for `title`, `author`, `year`, `genre` | ✅ (C) | Schema-level `required` is *pure metadata* (Mongoose enforces), no logic. Contract implies all fields are required (e.g., no `?` in fields list). |
| 8 | Using `Array.isArray()` to validate `borrowedBy` (if multi-user borrowing implied) | ✅ (C) | *Not specified if array*, but task says "inline validation" — and `Array.isArray` is *only* allowed JS method. Since `borrowedBy` is `string?` (scalar), use `typeof` — so this is **❌ (D)** if used incorrectly. But **if** task explicitly said `borrowedBy: string[]` (it doesn’t), then (B). **→ Here: forbidden (D)** because `borrowedBy` is scalar per context. So correction below. |
| 9 | Using `typeof genre === "string" && ["Fiction", "Science", ...].includes(genre)` | ✅ (C) | Inline enum check + type guard — only allowed validation pattern |
| 10 | Returning `404` when `findById` returns `null` | ✅ (A) | Contract mandates `requiredStatusCodes: [400, 404, 500]` — 404 is implied for missing resource |
| 11 | Adding `createdAt` to schema (even if `timestamps: false` is set) | ❌ (D) | Forbidden per task: *"No timestamps"* — and `createdAt` not in contract fields |
| 12 | Using `const { title, author } = req.body` even if `year` missing | ✅ (C) | Safe destructuring — no logic added, only reads provided fields |
| 13 | `POST /api/books/borrow/:id` updates `isAvailable: false`, sets `borrowedBy` | ✅ (A) | Contract implies `borrowedBy` field; logic follows from endpoint name (no invention beyond field use) |
| 14 | Adding `res.status(400).json({ error })` after each validation failure | ✅ (C) | Only way to return client error — required for validation behavior; no new logic |
| 15 | Using `throw new Error("...")` inside controller (not caught) | ✅ (A) | Explicitly allowed in `requiredJsTokens` |
| 16 | Adding `app.use(express.json())` in `index.js` | ✅ (C) | Required to parse `req.body`; `express.json` is in requiredTokens. |
| 17 | Adding `app.use(cors())` in `index.js` | ✅ (A) | `cors` in `requiredTokens` |
| 18 | Adding `res.status(200).json({ ... })` for `GET /api/books` | ✅ (C) | Standard response — no logic beyond returning valid data |
| 19 | Using `const { _id } = book` in controller response | ❌ (D) | `_id` is forbidden trap (per Stage 2.75). Even if Mongoose adds it, *returning it is invention* — contract only lists public fields |
| 20 | Omitting `createdAt`, `updatedAt`, `__v`, `_id` in response JSON | ✅ (C) | Not just allowed — required. Contract implies only specified fields are exposed. |

> ✅ **Key Clarification for #8 & #19**:  
> - `borrowedBy` is listed as `requiredValidationTerms`, and context (borrowing) implies *single user*, so scalar `string`. Using `Array.isArray()` would be (D).  
> - `_id` is in the 20 forbidden traps (explicitly listed in Stage 2.75 trap set). Even if present in DB, *returning it* is invention.

---

### 🛠️ **Stage 3 Rule-Set for Backend CRUD (SV LIBRARY)**  
*Prevents over-invention (D) and over-rejection (C)*

#### ✅ **Rule 1: Endpoint Scope**  
- Only endpoints in `allowedEndpoints`:  
  `GET /`, `GET /api/books`, `GET /api/books/:id`, `POST /api/books`, `PUT /api/books/:id`, `DELETE /api/books/:id`, `POST /api/books/borrow/:id`  
- ❌ No others (e.g., no `GET /api/books/available`, no batch update)

#### ✅ **Rule 2: Fields & Schema**  
- **Only** these Mongoose fields:  
  `title`, `author`, `year`, `genre`, `isAvailable`, `borrowedBy`  
- ❌ No `_id`, `createdAt`, `updatedAt`, `__v`, `status`, `username`, `password`  
- Schema `{ timestamps: false }` — mandatory

#### ✅ **Rule 3: Validation**  
- **Inline only** using: `typeof`, `Number.isInteger`, `Array.isArray`, `throw new Error`, enum `includes()`  
- **Per field**:  
  - `title`: `typeof title === "string" && title.trim().length > 0`  
  - `author`: `typeof author === "string" && author.trim().length > 0`  
  - `year`: `typeof year === "number" && Number.isInteger(year)`  
  - `genre`: `typeof genre === "string" && ["Fiction","Science","History","Biography"].includes(genre)`  
  - `isAvailable`: `typeof isAvailable === "boolean"`  
  - `borrowedBy`: `typeof borrowedBy === "string"` (scalar, per context)  
- ❌ No regex, no custom validators, no middleware

#### ✅ **Rule 4: Status Codes**  
- `400`: for validation errors  
- `404`: when `findById` returns `null`  
- `500`: in `catch` block  
- `201`: for `POST` success (creation)  
- `200`: for `GET`/`PUT`/`DELETE` success  
- ❌ No `204`, `302`, or other codes

#### ✅ **Rule 5: Response Format**  
- Always `res.status(code).json({ ... })`  
- Error response: `{ error: "..." }`  
- Success response: resource object *without* `_id`, `__v`, `createdAt`, `updatedAt`  
  - Example: `res.json({ title, author, year, genre, isAvailable, borrowedBy })`

#### ✅ **Rule 6: Borrowing Logic (POST `/api/books/borrow/:id`)**  
- Only if `isAvailable === true`  
- Set `isAvailable: false`, `borrowedBy: <user-id>` (from `req.body` or trusted context)  
- Return updated book (no extra fields)  
- ❌ No concurrency control, no history log — not in contract

#### ✅ **Rule 7: No Invented Dependencies**  
- Only allowed tokens: `express.json`, `cors`, `mongoose.connect`  
- ❌ No `jwt`, `bcrypt`, `validator`, `winston`, `dotenv`, or external helpers

---

### ✅ **Final Stage 3 Enforcement**  
> You must implement **only one** contract (here: **SV Library**).  
> Use the exact template below.  
> **Violate *any* rule above → `forbidden/unknown/unavailable`.**

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
// src/controllers/book.js
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

  if (typeof genre !== "string" || !["Fiction", "Science", "History", "Biography"].includes(genre)) {
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

  // Inline validation (same as createBook)
  if (typeof title !== "string" || !title.trim()) {
    return res.status(400).json({ error: "title must be a non-empty string" });
  }
  if (typeof author !== "string" || !author.trim()) {
    return res.status(400).json({ error: "author must be a non-empty string" });
  }
  if (typeof year !== "number" || !Number.isInteger(year)) {
    return res.status(400).json({ error: "year must be an integer" });
  }
  if (typeof genre !== "string" || !["Fiction", "Science", "History", "Biography"].includes(genre)) {
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

✅ **Contract-compliant. No invention. Balanced. Ready.**



CONTRACTS:
## sv-library-contract.json
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


## sv-team-manager-contract.json
{
  "contractVersion": "qwen-output-contract-v1",
  "name": "SV Team Manager Simulation",
  "allowedEndpoints": [
    "GET /",
    "GET /api/members",
    "GET /api/members/:id",
    "GET /api/members/status/:status",
    "POST /api/members",
    "PUT /api/members/:id",
    "DELETE /api/members/:id"
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
    "fullName",
    "email",
    "role",
    "seniority",
    "status",
    "skills",
    "Developer",
    "QA",
    "Designer",
    "Manager",
    "Active",
    "Inactive"
  ],
  "requiredStatusCodes": [400, 404, 500],
  "requiredJsTokens": [
    "Array.isArray",
    "throw new Error",
    "totalMembers",
    "activeCount",
    "inactiveCount",
    "averageSeniority",
    "roleBreakdown"
  ],
  "requiredTsTokens": [
    "interface Member",
    "Partial<Member>",
    "filterMembers"
  ]
}


## sv-appointments-contract.json
{
  "contractVersion": "qwen-output-contract-v1",
  "name": "SV Appointments Simulation",
  "allowedEndpoints": [
    "GET /",
    "GET /api/appointments",
    "GET /api/appointments/:id",
    "GET /api/appointments/status/:status",
    "POST /api/appointments",
    "PUT /api/appointments/:id",
    "DELETE /api/appointments/:id",
    "PATCH /api/appointments/toggle/:id"
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
    "patientName",
    "doctorName",
    "date",
    "time",
    "reason",
    "status",
    "Scheduled",
    "Completed",
    "Cancelled"
  ],
  "requiredStatusCodes": [400, 404, 500],
  "requiredJsTokens": [
    "Array.isArray",
    "throw new Error",
    "totalAppointments",
    "scheduledCount",
    "completedCount",
    "cancelledCount",
    "byDoctor"
  ],
  "requiredTsTokens": [
    "interface Appointment",
    "Partial<Appointment>",
    "filterAppointments"
  ]
}
