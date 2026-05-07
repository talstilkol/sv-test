**SV LIBRARY CONTRACT – STAGE 3 BACKEND CRUD DRILL SPEC (Contract-Only Mode)**  
**✅ Strictly SV Library Contract – No Inventions. No Cross-Contract Mixing.**

---

### ✅ **EXACT ENTITY**  
- `Book`

---

### ✅ **EXACT FIELDS** (per `requiredValidationTerms`)  
- `"title"` (string)  
- `"author"` (string)  
- `"year"` (number)  
- `"genre"` (string, enum: `"Fiction"`, `"Science"`, `"History"`, `"Biography"`)  
- `"isAvailable"` (boolean)  
- `"borrowedBy"` (string or `null`)  

> ⚠️ No `_id`, `createdAt`, `updatedAt`, `username`, `password`, `email`, or other fields.  
> `"skills"` is **not** in Library contract — omitted.

---

### ✅ **EXACT ALLOWED ENDPOINTS** (per `allowedEndpoints`)  
1. `GET /`  
2. `GET /api/books`  
3. `GET /api/books/:id`  
4. `POST /api/books`  
5. `PUT /api/books/:id`  
6. `DELETE /api/books/:id`  
7. `POST /api/books/borrow/:id`

> ❌ No bulk delete (`DELETE /api/books`), no `PATCH`, no `/users`, no `/borrowed`, no auth routes.

---

### ✅ **BACKEND FILES TO CREATE**  
1. `src/server.js` — Express app setup (using `cors()`, `express.json()`, `mongoose.connect`)  
2. `src/routes/books.js` — All book routes  
3. `src/models/Book.js` — Mongoose model (based on `interface Book`)  
4. `src/controllers/books.js` — Route handlers only (no middleware)  
5. `src/utils/errors.js` — Optional *if* only uses `throw new Error` and no extra helpers — but: no helpers listed → **omit**. All validation inline in route handlers.

> 🔒 No `validationHelpers`, no `middleware/`, no `config/auth.js`.

---

### ✅ **VALIDATION TERMS FROM CONTRACT**  
All validation must use only:
- `Array.isArray` (for array safety checks — e.g., if any field accidentally submitted as array)  
- `throw new Error("message")` (for validation errors)  
- Enum checks against contract terms:  
  ```ts
  if (!["Fiction", "Science", "History", "Biography"].includes(genre)) {
    throw new Error("Invalid genre");
  }
  ```

> ❌ No regex, no `includes("@")`, no length checks, no format checks — all forbidden.

---

### ✅ **STATUS CODES FROM CONTRACT**  
- `400` (Bad Request – validation failure)  
- `404` (Not Found – ID not found)  
- `500` (Internal Server Error)

> ✅ `200`, `201`, `204` may be used in practice, but *must not be declared as rules* — only error codes are mandated.

---

### ❌ **FORBIDDEN ADDITIONS**  
Per Contract + Trap List:  
1. `/users` endpoint  
2. `username`, `password`, `confirmPassword` fields  
3. `role`, `email`, `skills`, `carNumber`, `joinDate`, `isActive`, `_id`, `createdAt`, `updatedAt`  
4. Regex patterns (e.g., `/^[a-z]+$/`)  
5. `validateInput` middleware or any non-contract validation helpers  
6. `"Pending"`, `"admin"`, `"doctor"` enums  
7. Bulk operations (e.g., `DELETE /api/books`)  
8. `filterBooks` with extra fields beyond `Partial<Book>`  
9. `localStorage`, `token`, `JWT`, `session`, `auth` logic  
10. Custom TS interfaces beyond `interface Book`, `Partial<Book>`, `filterBooks`

---

### ✅ **GRADING RUBRIC**  
*(0–100%, strict mechanical check)*  

| Criteria | Weight | Pass Condition |
|---------|--------|----------------|
| **Endpoint Compliance** | 20% | Only 7 allowed endpoints used; no extra routes |
| **Field Compliance** | 25% | Only `title`, `author`, `year`, `genre`, `isAvailable`, `borrowedBy` used; no invented fields |
| **Enum Compliance** | 15% | `genre` strictly limited to `"Fiction"`, `"Science"`, `"History"`, `"Biography"` |
| **Validation Compliance** | 15% | Only `Array.isArray`, `throw new Error`, enum checks; no regex/helpers |
| **TS/JS Token Compliance** | 10% | Only `interface Book`, `Partial<Book>`, `filterBooks`, `Array.isArray`, `throw new Error`, and allowed JS tokens used |
| **Status Code Compliance** | 5% | Only `400`, `404`, `500` used for errors (non-error codes optional) |
| **No Forbidden Inventions** | 10% | Zero violations of forbidden items (e.g., no `/users`, no password, no timestamps) |

> ✅ **100% = all criteria met**  
> ❌ **0% = any violation (e.g., invented endpoint/field/token)**

---

**🔒 Qwen3-Coder-Next – Contract-Only Mode Active. SV Library Only.**

