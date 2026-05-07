SYSTEM:
You are Qwen3-Coder-Next designing Stage 3 Backend CRUD guardrails. Return Hebrew output. Do not write full code yet.

TASK:
Create a strict Stage 3 Backend CRUD guardrail spec for SV Library. It must allow runnable infrastructure files when needed, but forbid domain inventions. Separate: domain contract, runnable infrastructure, validation rules, endpoint rules, status code rules, forbidden additions, and output format. Include a pre-code checklist Qwen must fill before generating backend code. End with a scoring rubric out of 100.

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



CLASSIFIER:
### Classification Cases (30 Cases)  
**Decision per case: `contract-backed`, `explicit task addition`, `implementation detail`, `forbidden invention`, or `unknown/unavailable`**

| # | Case | Decision | Reason |
|---|------|----------|--------|
| 1 | `GET /health` route added to check server liveness | `forbidden invention` | Not in any contract’s `allowedEndpoints`; `/health` is inference beyond scope |
| 2 | Server `/package.json` includes `"type": "module"` | `implementation detail` | ES module declaration is minimal, safe, no logic added; enables execution without altering semantics |
| 3 | `client/index.html` includes `<meta charset="UTF-8">` | `implementation detail` | Minimal HTML safety for encoding; no logic, required for correctness in many contexts |
| 4 | Schema includes `createdAt` field (even if unused in responses) | `forbidden invention` | Explicitly forbidden in Stage 3 rule 2; contract adds no timestamps |
| 5 | `createdAt` returned in JSON response for book/member/appointment | `forbidden invention` | Violates Stage 3 rule 5: only contract fields may be exposed |
| 6 | Regex used in validation (e.g., `email.match(...)`) | `forbidden invention` | Contract only allows `typeof`, `includes`, `Number.isInteger`, etc.; regex is prohibited |
| 7 | Duplicate `title` check: `Book.findOne({ title })` before create | `forbidden invention` | Not required; uniqueness not in contract, implies extra DB query/logic |
| 8 | `borrowedBy` field validated as `string | null` (e.g., optional) | `unknown/unavailable` | Contract lists `borrowedBy` as requiredValidationTerm, but *no nullability hint*; context implies scalar *string* only (e.g., borrowing requires value); without explicit task text saying "optional", ambiguous |
| 9 | `POST /api/books/borrow/:id` includes conflict check: if `isAvailable === false`, return 400 | `contract-backed` | Borrow endpoint implies availability check; contract requires status 400 and `isAvailable` field; no invention beyond required validation |
| 10 | `GET /api/books/status/:status` route added | `forbidden invention` | Not in `sv-library-contract.allowedEndpoints`; only `/borrow` is special-purpose |
| 11 | `role` enum in team manager includes `"Intern"` | `forbidden invention` | Contract restricts `role` to `["Developer","QA","Designer","Manager"]`; adding `"Intern"` violates requiredValidationTerms |
| 12 | `password` field in schema for auth in SV Library | `forbidden invention` | No auth in contract; password is not a field or token |
| 13 | `login` endpoint: `POST /api/auth/login` added | `forbidden invention` | Not in *any* contract’s `allowedEndpoints`; auth endpoints are outside scope |
| 14 | Seed data includes `"createdAt": new Date()` in DB | `forbidden invention` | `createdAt` not allowed in schema; seeding with extra field is implementation of hidden logic |
| 15 | Auth tokens (e.g., JWT) sent in `Authorization` header forborrow request | `forbidden invention` | No auth tokens in contracts; `requiredTokens` lists no JWT/bearer tools |
| 16 | `GET /api/members/status/:status` in team manager contract → allowed | `contract-backed` | Explicitly in `sv-team-manager-contract.allowedEndpoints` |
| 17 | `PATCH /api/appointments/toggle/:id` used to switch `status` between "Scheduled"/"Completed" | `contract-backed` | PATCH endpoint for toggle explicitly allowed in `sv-appointments-contract` |
| 18 | `status` field includes `"Cancelled"` for appointments | `contract-backed` | RequiredValidationTerms includes `"Scheduled", "Completed", "Cancelled"` |
| 19 | `status` field includes `"Pending"` for appointments | `forbidden invention` | Not in `sv-appointments-contract.requiredValidationTerms` |
| 20 | `res.status(201)` used for `POST /api/books/borrow/:id` | `implementation detail` | While 201 not in `requiredStatusCodes`, returning created resource is standard REST; no semantics added (same as `POST /api/books`) |
| 21 | `try/catch` in controller wraps *only* DB calls | `implementation detail` | Minimal error handling for DB failures — no logic beyond `throw new Error` (allowed) |
| 22 | `res.status(204).send()` for successful delete | `forbidden invention` | 204 not in `requiredStatusCodes` [400,404,500]; violates Stage 3 rule 4 |
| 23 | `app.use(cors({ origin: process.env.CORS_ORIGIN }))` | `implementation detail` | `cors` is required token; configuring origin is minimal setup, not logic change |
| 24 | `VITE_API_URL` used in client-side config instead of hardcoded URL | `implementation detail` | Required token per contract; standard practice, no semantic change |
| 25 | `useNavigate()` imported in client route but never used | `implementation detail` | Import without usage is safe (no runtime effect), and token is required |
| 26 | `availableCount`, `borrowedCount` logic added in `GET /api/books` | `forbidden invention` | JS tokens listed, but *no endpoint or task* requires aggregation logic; implies extra computation |
| 27 | `oldestYear`, `newestYear` computed and returned in `GET /api/books` | `forbidden invention` | Not in contract’s response schema; inference beyond data |
| 28 | `mostCommonGenre` computed and returned in `/api/books` | `forbidden invention` | Same as above — JS token implies capability, but *no task says to compute or return it* |
| 29 | `role` enum in team manager allows lowercase values (e.g., `"developer"`) | `forbidden invention` | Contract lists enum as `"Developer"` etc. (capitalized); changing casing is deviation |
| 30 | Appointment `date` stored as `Date` object in DB, but returned as ISO string | `implementation detail` | DB uses `Date`, serialization to ISO string is standard `Date.prototype.toISOString()` — no logic added beyond format |

---

### 🔁 Reusable Decision Tree for Stage 3  
*(Designed for rapid mechanical classification)*

```
1. Is the item explicitly listed in the active contract's:
   - `allowedEndpoints`? → ✅ contract-backed  
   - `requiredValidationTerms` (e.g., enum, field)? → ✅ contract-backed  
   - `requiredTokens` or `requiredJsTokens`? → ✅ contract-backed  
   - Else → go to 2.

2. Is the item *explicitly required* in current task text (e.g., "add X", "support Y")?  
   → ✅ explicit task addition  
   → Else → go to 3.

3. Is it minimally required to execute contract *without semantic change*?  
   Examples: `res.json()`, `try/catch` (DB), `typeof`, destructuring, safe defaults, encoding meta  
   → ✅ implementation detail  
   → Else → go to 4.

4. Is it a known trap? (e.g., `_id`, `createdAt`, regex, auth, extra endpoints, inferred logic)  
   → ❌ forbidden invention  

5. Is it missing/unclear in contract + task, and inference needed?  
   (e.g., optional `borrowedBy`, enum extensions)  
   → ⚠️ unknown/unavailable  

→ End.
```

✅ **Use the tree strictly — no interpretation beyond tiers.**



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
