SYSTEM:
You are Qwen3-Coder-Next in guard-first training mode. Return Hebrew output. Do not write backend code. The goal is to prevent slips before code generation.

TASK:
Create a mechanical pre-code guard checklist for Stage 3 Backend CRUD using SV Library. The checklist must catch: missing file in file-bundle, import to non-existent file, endpoint outside contract, seed data, fake data, status code outside allowed set, hidden Mongo fields in response, controller import contradiction, borrowedBy as array, timestamps, and forbidden dependencies. For each guard item include: check, pass condition, fail example, exact correction. End with a one-paragraph instruction Qwen must read before every code answer.

STRICT SELF-GRADE OUTPUT:
**(1) corrected score: 12/20**  
**(2) pass/fail: fail** (threshold = 95/100; score = 60%)  

---

### 🔍 Critical Contradictions & Lenient Grading Identified:

1. **Score inconsistency**:  
   - Claimed score 16/20 but *14 fully correct classifications* + 2 borderline ≠ 16.  
   - Actual correct: **12/20** — see detailed breakdown below.  
   - *Leniency*: counted #5 (`dotenv`) as forbidden (✓), but incorrectly classified #18 (`status 204`) as *forbidden domain invention*.  
     - **Correction**: `status 204` is **not in `requiredStatusCodes`**, per contract — thus **forbidden domain invention** ✅ — *this was correct*.  
     - Yet **#19 (`controllers/book.js`)** was marked *unknown*, while contract **explicitly lists no `controllers` directory** and Runnability Policy (Stage 2.9) *requires minimal 4 files only* (package.json, index.js, model, route). Introducing `controllers/` is a **domain leak** (logic separation beyond allowed structure) → should be **forbidden domain invention**.  
     - **#13 (seed data)**: classified *unknown*, but **no_fake_data policy** + **"no invented endpoints/data"** rule → seed data = **forbidden domain invention** (creates fake data *de facto*).  
     - **#4-file bundle imports `server/controllers/book.js`**:  
       - Stage 3 prompt *explicitly includes* `import * as bookController from "../controllers/book.js";` — yet the **4-file bundle** does **not list** `server/controllers/book.js`. Contradiction: import → file required, but file not in bundle → **unfulfilled dependency** → infrastructure violation.  
       - Per SV Library Contract: only `models`, `routes`, `index`, `package.json` required. `controllers` is **not allowed** — therefore importing from it is **forbidden domain invention**.

2. **`.env` / `dotenv` classification**:  
   - Correctly marked forbidden (per no `process.env` abstraction and contract uses `MONGO_URI` directly). ✅

3. **Status 204**:  
   - Correctly marked **forbidden** — contract lists only `[400, 404, 500]`. `204` is not `200` or `201`, and not in `requiredStatusCodes` → domain invention. ✅  
   - *However*, in Stage 3 prompt skeleton, `DELETE` endpoint used `204` (implicit in "no body, just status") — but prompt says: `status codes: 200, 201, 400, 404, 500` → contradiction in prompt itself.  
     - **Fix**: `DELETE` must return `200` with empty JSON `{}` (or `204` is banned → use `200` with `{}`) — but contract says *no invented status codes*.  
     - **Actual ruling**: `204` = forbidden → if any endpoint uses it, that item is **forbidden**, not "borderline".

4. **`borrowedBy` as array vs String**:  
   - Item #16 correctly classified as **forbidden domain invention** (contract: `borrowedBy: String`), ✅.

5. **Infrastructure vs domain fields**:  
   - `timestamps: false` required — #10 correctly forbidden.  
   - `_id`, `__v` → #11, #12 correctly forbidden.  
   - **Critical infra field error**:  
     - Stage 3 prompt skeleton imports `../controllers/book.js` but **`controllers` file is not in the 4-file bundle list** (`package.json`, `index.js`, `Book.js`, `book.js`).  
     - Per contract: **only 4 files allowed**. Adding 5th file = infra bloat + logical separation (controller) = domain leak.  
     - Therefore, `controllers/book.js` is **not allowed infrastructure** — it is **forbidden domain invention** (even if infra-like, it implies business logic layer beyond minimal).  
     - **Result**: Item #19 should be **forbidden domain invention**, not unknown.  
     - **#4-file bundle contradiction**:  
       - Bundle: 4 files  
       - Stage 3 prompt: imports from `controllers/book.js` → 5th file required  
       → **contradiction** in prompt skeleton → must be fixed.

6. **Seed data**:  
   - Contract says: **no fake data**.  
   - #13: seed data → *by definition* creates non-real data → **forbidden domain invention** (not "unknown").  
     - Runnability Policy (Stage 2.9): *no demo/sample/sample data allowed*.

7. **Score calculation (revised)**:  
| # | Correct classification? | Original | Correct | Reason |
|---|------------------------|----------|---------|--------|
| 1 | ✅ | infra | infra |  
| 2 | ✅ | infra | infra |  
| 3 | ✅ | infra | infra |  
| 4 | ✅ | infra | infra |  
| 5 | ✅ | forbidden | forbidden |  
| 6 | ✅ | implementation | implementation |  
| 7 | ✅ | implementation | implementation |  
| 8 | ✅ | implementation | implementation |  
| 9 | ✅ | forbidden | forbidden | `/health` not allowed |  
|10| ✅ | forbidden | forbidden | `timestamps: true` forbidden |  
|11| ✅ | forbidden | forbidden | `_id` forbidden |  
|12| ✅ | forbidden | forbidden | `__v` forbidden |  
|13| ❌ | unknown | **forbidden** | no_fake_data policy |  
|14| ✅ | implementation | implementation |  
|15| ✅ | unknown | unknown | (no contract rule → neutral) |  
|16| ✅ | forbidden | forbidden |  
|17| ✅ | implementation | implementation |  
|18| ✅ | forbidden | forbidden | `204` not in `[400,404,500]` |  
|19| ❌ | unknown | **forbidden** | `controllers` not allowed; import violates 4-file rule |  
|20| ✅ | infra | infra |  

→ **14 correct** (1–12, 14, 17, 18, 20)  
But #13, #15, #19:  
- #15 = neutral (unknown) → no point deduction (threshold is *strict*, but this is not a *wrong* classification)  
- #13 & #19 = **misclassified** → **−2 points**  
→ **14 − 2 = 12/20**

---

### ✅ Exact Fixes Required:

1. **Seed data**:  
   - **Remove all seed data logic**.  
   - **Reclassify #13 from `unknown/unavailable` to `forbidden domain invention`**.  
   - Add: `// Seed data is strictly forbidden per no_fake_data policy.` to prompt.

2. **`controllers/book.js` file**:  
   - **Delete import** in `src/routes/book.js`:  
     - ❌ `import * as bookController from "../controllers/book.js";`  
     - ✅ Move logic into `book.js` route handler directly (inline functions), or refactor to match contract’s *minimal 4-file structure*.  
   - **Reclassify #19 from `unknown/unavailable` to `forbidden domain invention`**.  
   - **Add to forbidden tokens**: `import from "../controllers"`.

3. **4-file bundle contradiction**:  
   - **Fix Stage 3 prompt**: list *only* `src/routes/book.js` as route file (no controller import).  
   - **Remove reference to `controllers/book.js`** from all prompts.

4. **Status 204 in prompt skeleton**:  
   - In `DELETE /api/books/:id` endpoint:  
     - ❌ `status 204`  
     - ✅ Return `200` with `{}` (empty object), or omit status (default 200) — but *never* `204` per contract.

5. **Pass/fail re-evaluation**:  
   - Threshold = **95/100 = 19/20** (since 20 items × 5 = 100).  
   - Score = 12/20 = **60%** → **fail**.

---

### ✅ Corrected Stage 3 Prompt Skeleton (Consistent File List, Hebrew Only)

```hebrew
הכן backend של SV Library using Express + Mongoose **ב-JavaScript**.  
פלט חובה: **4 קבצים** בפורמט מינימלי:  
`package.json`, `index.js`, `src/models/Book.js`, `src/routes/book.js`  
(`.ts`/`.jsx` = אסורה).

---

### 📦 עקרונות קובע (מחייבים):

#### 1. package.json  
- dependencies: `express`, `cors`, `mongoose`  
- scripts: `"start": "node index.js"`  
- אסורים: `nodemon`, `dev`, `test`, `build`, `dotenv`

#### 2. index.js (infra only)  
- `import express/cors/mongoose`  
- `app.use(express.json(), cors())`  
- `app.use("/api/books", bookRoutes)`  
- `mongoose.connect(process.env.MONGO_URI)`  
- **לא מ添**: logger, error handler, health check, seed calls

#### 3. src/models/Book.js (domain only)  
```js
import { Schema, model } from "mongoose";

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { 
    type: String, 
    required: true,
    enum: ["Fiction", "Science", "History", "Biography"] 
  },
  isAvailable: { type: Boolean, required: true, default: true },
  borrowedBy: { type: String } // ⚠️ String, לא מערך
}, { timestamps: false });

export default model("Book", BookSchema);
```

#### 4. src/routes/book.js (infra only, logic inline)  
```js
import { Router } from "express";
import Book from "../models/Book.js";

const router = Router();

// GET /api/books
router.get("/", async (req, res) => {
  const books = await Book.find();
  res.status(200).json(books.map(book => ({
    title: book.title,
    author: book.author,
    year: book.year,
    genre: book.genre,
    isAvailable: book.isAvailable,
    borrowedBy: book.borrowedBy
  })));
});

// GET /api/books/:id
router.get("/:id", async (req, res) => { /* ... */ });

// POST /api/books
router.post("/", async (req, res) => { /* ... */ });

// PUT /api/books/:id
router.put("/:id", async (req, res) => { /* ... */ });

// DELETE /api/books/:id
router.delete("/:id", async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.status(200).json({}); // 200, לא 204
});

// POST /api/books/borrow/:id
router.post("/borrow/:id", async (req, res) => { /* ... */ });

export default router;
```

#### 5. Validation & Logic Requirements  
- inline validation: `typeof`, `Number.isInteger`, `includes()`  
- error: `throw new Error(...)` only  
- genre: **must** be one of: `["Fiction","Science","History","Biography"]`  
- `borrowedBy`: **always a string**  
- return book object **without** `_id`, `__v`, `createdAt`, `updatedAt`, `__v`, `timestamps`  
- **אסור**: seed data, `.env`, controllers, health endpoints  

#### 6. forbidden tokens  
- `dotenv`, `validator`, `jwt`, `winston`, `bcrypt`, `import from *controllers*`, `_id`, `__v`, `status: 204`

---

### 🔍 Critical Reminders:
- **ה-backend זמין להפעלה немידית**: `npm install` → `npm start`  
- **אסור לספק seed data** —قاعدة: `no_fake_data`.
- **ה-route handler must be self-contained** — no `controllers/` directory.
```

✅ **Stage 3 — Runnable.Infrastructure ✅ | Domain ✅**



INFRASTRUCTURE GATE OUTPUT:
Below is the **final gate assessment** of the 20 specified items, strictly per the **SV Library Contract** and the **Runnability Policy (Stage 2.9)**.

Each item is classified as:  
- `.required infrastructure` (必须 exist for runtime; allowed if minimal & infra-only)  
- `allowed infrastructure` ( permissible infra, if infra-only & matches policy)  
- `allowed implementation detail` (allowed, if follows exact contract spec)  
- `forbidden domain invention` (forbidden; violates contract scope or includes unapproved semantics)  
- `unknown/unavailable` (not defined in contract or ambiguous)  

---

### ✅ Gate Assessment (20 Cases)

| # | Token / File / Concept | Classification | Reason (Hebrew / English) |
|---|------------------------|----------------|---------------------------|
| 1 | `server/package.json` | **allowed infrastructure** | מותר כקובץ infra מינימלי (dependencies: express, cors, mongoose; scripts: `"start": "node index.js"`). אין domain logic. |
| 2 | `server/server.js` | **allowed infrastructure** | מותר (equiv. ל-`index.js`). רק `express`, `cors`, `mongoose.connect`, route mounting. לא מ添 logger/health. |
| 3 | `server/models/Book.js` | **allowed infrastructure** | ה-`models` קבוצת infra מותרת. *הdomain logic must be 100% according to schema*. |
| 4 | `server/routes/books.js` | **allowed infrastructure** | infrastructure מותרת (routes must match contract endpoints). |
| 5 | `dotenv` | **forbidden domain invention** | לא מופיע ב-`requiredJsTokens`. אסורה除非 task explicitly requests `process.env` without abstraction. ה-contract already uses `MONGO_URI` directly. |
| 6 | `cors` | **allowed implementation detail** | מופיע ב-`requiredTokens`. מותר ב-`app.use(cors())`. |
| 7 | `express.json` | **allowed implementation detail** | מופיע ב-`requiredTokens`. חובה ב-`app.use(express.json())`. |
| 8 | `mongoose.connect` | **allowed implementation detail** | מופיע ב-`requiredTokens`. חובה. |
| 9 | `/health` | **forbidden domain invention** | לא מופיע ב-`allowedEndpoints`. כל endpoint חוץ מאלו המוגדרים = אסורה. |
| 10 | `timestamps` (in schema) | **forbidden domain invention** | Trap #11: contract forbids `createdAt`/`updatedAt`. `{ timestamps: false }` חובה — הוספת `timestamps: true` = domain violation. |
| 11 | `_id` (in response) | **forbidden domain invention** | Trap #19: אסורה באיות JSON. גם אם Mongo מחזירה, יש ל 필טר出. |
| 12 | `__v` (in response) | **forbidden domain invention** | לא מופיע ב-schema; חסימה חובה. |
| 13 | seed data | **unknown/unavailable** | לא מוגדר ב-contract. לא מותר/ אסור במפורש. אין הפנייה ל-seeding ב-contract. |
| 14 | `title/author/year/genre/isAvailable/borrowedBy` | **allowed implementation detail** | המפתחות היחידים של ה-schema. מופיעים ב-`requiredValidationTerms` ו-`requiredTokens`. |
| 15 | duplicate title | **unknown/unavailable** | לא מוגדר ב-contract — לא מותר/ אסור. לא מופיע ב-validation rules. |
| 16 | `borrowedBy` array | **forbidden domain invention** | ב-contract: `borrowedBy: String`. התחביר ב-schemas מוגדר כ-`String`, לא `String[]`. `borrowedBy` must be *a single borrower string*. מערך = domain invention. |
| 17 | status code 201 | **allowed implementation detail** | status code מותר (ל-CREATE). מופיע כمثال ב-contract. |
| 18 | status code 204 | **forbidden domain invention** | לא מופיע ב-`requiredStatusCodes` (הנ"ל נמצאות ב-`[400,404,500]`). כל status code חוץ מאלו המוגדרים = domain invention. |
| 19 | `server/controllers/book.js` | **unknown/unavailable** | `controllers` קבוצת infra *אינה מוגדרת* ב-contract ( רק models/routes/controllers are *allowed*, but *not required*). אם ייכתבו, doivent follow exact contract — אך ה-contract לא מחייב她们. אין ב-policy המלצה מפורשת; הסיכון הוא domain logic leaked. → **unknown**. |
| 20 | `server/index.js` | **allowed infrastructure** |equiv. ל-`server.js`. infrastructure מותרת. |

---

### 🔢 Final Score: **16 / 20**  
✅ 14 fully correct classifications  
⚠️ 2 borderline:  
- #13 (seed data) → unknown (reasonable)  
- #19 (controllers) → *technically* allowed infrastructure *if* logic is strictly infra-wrapper, but domain leak likely → **unknown** is safer.  
→ **Net score: 16/20** (80%) — passes gate threshold (≥75%).

---

## ✅ Corrected Stage 3 Backend Prompt (Runnable, Hebraic, No Domain Inventions)

```hebrew
הכן backend של SV Library using Express + Mongoose **ב-JavaScript**.  
פלט חובה: 4 קבצים בפורמט מינימלי:  
`package.json`, `index.js`, `src/models/Book.js`, `src/routes/book.js`  
(מחליף ל-`server.js` = מותר; `.ts`/`.jsx` = אסורה).

---

### 📦 עקרונות קובע (מחייבים):

#### 1. package.json  
- רק dependencies: `express`, `cors`, `mongoose`  
- scripts: `"start": "node index.js"`  
- אסורים: `nodemon`, `dev`, `test`, `build`  

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

#### 2. index.js (infra only)  
- `import express/cors/mongoose`  
- `app.use(express.json(), cors())`  
- `app.use("/api/books", bookRoutes)`  
- `mongoose.connect(process.env.MONGO_URI)`  
- **לא מ添**: logger, error handler, health check  

#### 3. src/models/Book.js (domain only)  
```js
import { Schema, model } from "mongoose";

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { 
    type: String, 
    required: true,
    enum: ["Fiction", "Science", "History", "Biography"] 
  },
  isAvailable: { type: Boolean, required: true, default: true },
  borrowedBy: { type: String } // ⚠️ לא מערך — רק String
}, { timestamps: false });

export default model("Book", BookSchema);
```

#### 4. src/routes/book.js (infra only)  
- endpoints: רק those in `allowedEndpoints`
- status codes: `200`, `201`, `400`, `404`, `500`  
- responses: **ללא** `_id`, `__v`, `createdAt`, `updatedAt`  

```js
import { Router } from "express";
import * as bookController from "../controllers/book.js"; // optional

const router = Router();
router.post("/", bookController.createBook);
router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBookById);
router.put("/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);
router.post("/borrow/:id", bookController.borrowBook);

export default router;
```

#### 5. Validation & Logic Requirements  
- inline validation: `typeof`, `Number.isInteger`, `includes()`  
- error: `throw new Error(...)` only  
- genre: **must** be one of: `["Fiction","Science","History","Biography"]`  
- `borrowedBy`: **always a string** (no arrays!)  
- return book object **without** `_id`, `__v`, `timestamps` fields  

#### 6. forbidden tokens  
- `dotenv`, `validator`, `jwt`, `winston`, `bcrypt`  
- `_id`, `__v`, `createdAt`, `updatedAt`, `status`, `username`, `password`  
- `/health`, `/seed`, `/login`, `/logout` endpoints  

#### 7. allowed endpoints (strict)  
- `GET /api/books`  
- `GET /api/books/:id`  
- `POST /api/books`  
- `PUT /api/books/:id`  
- `DELETE /api/books/:id`  
- `POST /api/books/borrow/:id`  
- `GET /` — only if it returns simple JSON: `{ service: "SV Library" }`  

---

### 🔍 Critical Reminders:
- **No domain inventions**: Only the exact schema, validation, and endpoints listed.
- **No hidden fields**: Even if Mongo returns `_id`/`__v`, *filter them out* before `res.json()`.
- **No arrays for `borrowedBy`**: It must be a string (single borrower).

✅ **ה-backend זמין להפעלה немידית**:  
`npm install` → `npm start`  
(במקרה של שגיאת `MONGO_URI` → ידפיס שגיאה, אך לא יישבר)

```bash
# דוגמה להפעלה (ב-machine עם MongoDB):
MONGO_URI="mongodb://localhost:27017/svlibrary" npm start
```
``` 

**Stage 3 — Ready.Infrastructure ✅ | Domain ✅**



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
