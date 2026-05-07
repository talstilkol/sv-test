SYSTEM:
You are Qwen3-Coder-Next in contract-safe rewrite mode. Return Hebrew output. You may use only the SV Library contract below. Do not add routes, fields, roles, regex, or data outside the contract. If needed detail is not in contract, write unknown/unavailable.

TASK:
Rewrite the unsafe /users drill into a safe Stage 3 Backend CRUD drill using only the SV Library contract. Output: exact entity, exact fields, exact allowed endpoints, backend files to create, validation terms from contract, status codes from contract, forbidden additions, and a grading rubric. Do not include full code yet. This is a drill spec only.

CONTRACT-ONLY POLICY:
✅ ** CONTRACT-ONLY POLICY – STAGE 2.5 REMEDIATION **  
**Policy:** Strictly contract-bound. Invention → forbidden/unknown/unavailable.  

---

### 🔍 EXTRACTED PER CONTRACT (Contract-only extraction, no external assumptions)

#### **1. SV LIBRARY CONTRACT**  
- **allowedEndpoints**:  
  `"GET /"`, `"GET /api/books"`, `"GET /api/books/:id"`, `"POST /api/books"`, `"PUT /api/books/:id"`, `"DELETE /api/books/:id"`, `"POST /api/books/borrow/:id"`  
- **requiredTokens**:  
  `"express.json"`, `"cors"`, `"mongoose.connect"`, `"BrowserRouter"`, `"Routes"`, `"Route"`, `"useNavigate"`, `"useParams"`, `"useEffect"`, `"VITE_API_URL"`  
- **requiredValidationTerms** (must appear *only* as object keys, enums, or interface fields):  
  `"title"`, `"author"`, `"year"`, `"genre"`, `"isAvailable"`, `"borrowedBy"`, `"Fiction"`, `"Science"`, `"History"`, `"Biography"`  
- **requiredStatusCodes**:  
  `400`, `404`, `500`  
- **requiredJsTokens** (only these names may be used as identifiers/vars):  
  `"Array.isArray"`, `"throw new Error"`, `"availableCount"`, `"borrowedCount"`, `"oldestYear"`, `"newestYear"`, `"mostCommonGenre"`  
- **requiredTsTokens** (only these types/functions may be declared):  
  `"interface Book"`, `"Partial<Book>"`, `"filterBooks"`  

#### **2. SV TEAM MANAGER CONTRACT**  
- **allowedEndpoints**:  
  `"GET /"`, `"GET /api/members"`, `"GET /api/members/:id"`, `"GET /api/members/status/:status"`, `"POST /api/members"`, `"PUT /api/members/:id"`, `"DELETE /api/members/:id"`  
- **requiredTokens**: *(identical to above)*  
- **requiredValidationTerms**:  
  `"fullName"`, `"email"`, `"role"`, `"seniority"`, `"status"`, `"skills"`, `"Developer"`, `"QA"`, `"Designer"`, `"Manager"`, `"Active"`, `"Inactive"`  
- **requiredStatusCodes**:  
  `400`, `404`, `500`  
- **requiredJsTokens**:  
  `"Array.isArray"`, `"throw new Error"`, `"totalMembers"`, `"activeCount"`, `"inactiveCount"`, `"averageSeniority"`, `"roleBreakdown"`  
- **requiredTsTokens**:  
  `"interface Member"`, `"Partial<Member>"`, `"filterMembers"`  

#### **3. SV APPOINTMENTS CONTRACT**  
- **allowedEndpoints**:  
  `"GET /"`, `"GET /api/appointments"`, `"GET /api/appointments/:id"`, `"GET /api/appointments/status/:status"`, `"POST /api/appointments"`, `"PUT /api/appointments/:id"`, `"DELETE /api/appointments/:id"`, `"PATCH /api/appointments/toggle/:id"`  
- **requiredTokens**: *(identical to above)*  
- **requiredValidationTerms**:  
  `"patientName"`, `"doctorName"`, `"date"`, `"time"`, `"reason"`, `"status"`, `"Scheduled"`, `"Completed"`, `"Cancelled"`  
- **requiredStatusCodes**:  
  `400`, `404`, `500`  
- **requiredJsTokens**:  
  `"Array.isArray"`, `"throw new Error"`, `"totalAppointments"`, `"scheduledCount"`, `"completedCount"`, `"cancelledCount"`, `"byDoctor"`  
- **requiredTsTokens**:  
  `"interface Appointment"`, `"Partial<Appointment>"`, `"filterAppointments"`  

---

### 🚫 **20 FORBIDDEN INVENTION TRAPS**  
*(No exceptions — all are explicitly not in any contract)*  

1. **`/users` endpoint** — not in any contract  
2. **`username` field** — not in any requiredValidationTerms  
3. **`confirmPassword` field** — not in any contract  
4. **`password` field** — not in any contract (SV Appointments uses `reason`, not `password`)  
5. **`role` enum values beyond contract scope** (e.g., `"doctor"`, `"nurse"`, `"admin"`)  
6. **`email` validation via regex** — regex not defined anywhere; only `includes("@")` inferred from SV Appointments (which doesn’t specify email at all, but `email` appears only in Team Manager — validation must be per-contract, and no email regex is provided)  
7. **`_id` field access** — not declared in requiredValidationTerms or TS interfaces  
8. **`isActive`, `joinDate`, `membershipType`** — only appears in *previous bad read*; not in any contract  
9. **`car number`, `8-digit number`, `carNumber`** — invented  
10. **`createdAt`, `updatedAt` timestamps** — forbidden  
11. **`token`, `auth`, `JWT`, `session`** — not in requiredTokens or contracts  
12. **`localStorage` usage for tokens** — explicitly forbidden in prior prep  
13. **`PATCH /api/members/status/:status`** — only `GET /api/members/status/:status` allowed  
14. **`DELETE /api/books` (bulk)** — only `:id` deletion allowed  
15. **`/borrowed` or `/borrowers` endpoints** — only `POST /api/books/borrow/:id` allowed  
16. **`filterBooks`, `filterMembers`, `filterAppointments` with extra fields** — only `Partial<T>` + contract terms allowed  
17. **`status: "Pending"`** — only `"Scheduled"`, `"Completed"`, `"Cancelled"` (Appointments) or `"Active"`, `"Inactive"` (Team Manager) or no status (Library)  
18. **`genre` with non-enum values** (e.g., `"Romance"`) — only `"Fiction"`, `"Science"`, `"History"`, `"Biography"`  
19. **`skills` as object or array** — no array syntax allowed (only `"skills"` string per interface? → forbidden: no schema specified for it; safest: treat as untyped string only per contract)  
20. **`validation middleware` with non-contract terms** (e.g., `validators.password()` function) — no validation helpers defined anywhere  

> ⚠️ **Note**: If a term is *not explicitly listed* in a contract, it is forbidden. Even if it appears in another contract (e.g., `email` in Team Manager), validation rules (like regex) must be copied *exactly* — and since no validation rules for `email` are provided, **no regex may be assumed**.

---

### ⚖️ **MANDATORY RULE-SET FOR STAGE 3 BACKEND CRUD**  
*(Every drill must obey all rules below. Violation → `0%` + `forbidden/unknown/unavailable`)*  

1. **Endpoint Selection Rule**:  
   - Every CRUD drill **must select exactly one contract**.  
   - Only endpoints listed in that contract’s `allowedEndpoints` are permitted.  
   - Example: `POST /api/members` is allowed (Team Manager), but `POST /users` is *not*.  

2. **Field & Enum Rule**:  
   - Only validation terms listed in that contract’s `requiredValidationTerms` may be used.  
   - Enums (e.g., `"Active"`, `"Inactive"`, `"Fiction"`) are exhaustive — no additions.  
   - Non-listed fields (e.g., `password`, `username`, `carNumber`) → **forbidden**.  

3. **Type Rule**:  
   - Only contract-specified interfaces may be used:  
     - Library → `interface Book`, `Partial<Book>`, `filterBooks`  
     - Team Manager → `interface Member`, `Partial<Member>`, `filterMembers`  
     - Appointments → `interface Appointment`, `Partial<Appointment>`, `filterAppointments`  
   - No custom interfaces (e.g., `User`, `BookWithCounts`) — **forbidden**.  

4. **JS/TS Tokens Rule**:  
   - Only `requiredJsTokens` and `requiredTsTokens` may be used as identifiers/variables.  
   - Example: `totalMembers`, `scheduledCount`, `mostCommonGenre` ✅  
   - `isValid`, `validator`, `util`, `helpers` ❌  

5. **Status Codes Rule**:  
   - Only `400`, `404`, `500` are allowed (per contract).  
   - `201`, `204`, `200` may be used *in practice*, but must **not be listed in code as rules** — only error codes are contractually mandated.  
   - No custom codes (e.g., `422`, `409`) → **forbidden**.  

6. **Validation Rule**:  
   - All validation must use *only* `Array.isArray`, `throw new Error`, and enum checks against contract terms.  
   - Regex is **forbidden** unless explicitly listed (none are).  
   - Example:  
     ```ts
     if (!['Active', 'Inactive'].includes(status)) {
       throw new Error("Invalid status");
     }
     ```
   - No regex, no `includes("@")`, no `length > 8` — all forbidden unless contract states them.  

7. **Middleware Order Rule**:  
   ```ts
   app.use(cors());
   app.use(express.json());
   // Validation middleware must NOT be added — only *permitted tokens* exist.  
   // → Therefore: no validation middleware allowed per contracts.  
   // All validation must be inline in route handlers.
   ```
   - Since no validation middleware is mentioned in `requiredTokens`, it is forbidden.  
   - Validation must be inline in route functions, using only `Array.isArray`, `throw new Error`.  

8. **No Cross-Contract Mixing**:  
   - You cannot mix Team Manager + Library validation (e.g., `role` + `genre`).  
   - Each drill = **one contract only**.  

9. **No Inferred Rules**:  
   - If a requirement is not *explicitly stated*, do not assume it.  
   - Example: Contracts don’t specify `isAvailable`, so `Book` interface only has `title`, `author`, `year`, `genre`, `isAvailable`, `borrowedBy` — but no default values, no validation logic.  

---

✅ **READY FOR STAGE 3**:  
- Drill template:  
  ```ts
  // Example (Team Manager contract only)
  // GET /api/members/status/Active
  router.get("/status/:status", async (req, res) => {
    const { status } = req.params;
    if (!["Active", "Inactive"].includes(status)) {
      res.status(400).json({ error: "Invalid status" });
      return;
    }
    try {
      const members = await Member.find({ status });
      res.status(200).json(members);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  });
  ```
- **Compliance check**:  
  - `status` enum values ✅  
  - Only contract terms ✅  
  - No regex, no `password`, no `role` field validation ✅  
  - `Member` interface only (via Mongoose, per `mongoose.connect`) ✅  
  - Status codes `400`, `500` ✅  

🔒 **Zero tolerance enforced. All rules source-backed. No inventions.**  
**Qwen3-Coder-Next – Contract-Only Mode Active.**



VIOLATION REPORT:
**📊 violation report – Stage 2.5 Readiness Output Audit**  
**Policy enforced: Contract-only (SV LIBRARY / TEAM MANAGER / APPOINTMENTS)**  
**🔍 Strict mechanical detection only – no repair, no mitigation, no interpretation**

---

### 🚫 **VIOLATIONS DETECTED**

#### 1. **invented endpoint**  
- **quoted text**: `POST /api/users`  
- **why violation**: No contract includes `/users` endpoint. All contracts specify only endpoints like `/api/books/*`, `/api/members/*`, `/api/appointments/*`.  
- **severity**: critical  
- **safe replacement wording**: `POST /api/members` *(Team Manager contract only)* OR `POST /api/books` *(Library contract only)* OR `POST /api/appointments` *(Appointments contract only)*  

#### 2. **invented field**  
- **quoted text**: `"username"`  
- **why violation**: `"username"` is *not* in `requiredValidationTerms` of *any* contract. Team Manager uses `"fullName"` and `"email"`, Library uses `"borrowedBy"`, Appointments uses `"patientName"` — no `"username"` exists.  
- **severity**: critical  
- **safe replacement wording**: `"fullName"` *(Team Manager)* OR `"patientName"` *(Appointments)* OR `"borrowedBy"` *(Library)*  

#### 3. **invented field**  
- **quoted text**: `"confirmPassword"`  
- **why violation**: `"confirmPassword"` is *not* in `requiredValidationTerms` of *any* contract. Contracts never reference password-related fields. Password validation is *explicitly forbidden* per Trap #4.  
- **severity**: critical  
- **safe replacement wording**: *do not use* — remove entirely. If confirmation required for frontend, use only `POST /api/members` with `"fullName"`, `"email"`, `"role"` — no password fields.  

#### 4. **invented field**  
- **quoted text**: `"password"`  
- **why violation**: `"password"` is *not* in any contract. SV Appointments uses `"reason"`; no contract includes `"password"`. Per trap #4, password fields are forbidden.  
- **severity**: critical  
- **safe replacement wording**: *do not use* — remove entirely. Replace password-based auth logic with no auth (per contracts, no auth tokens are required).  

#### 5. **invented enum/role**  
- **quoted text**: `["admin", "volunteer", "member"]` (role enum in validation code)  
- **why violation**: No contract specifies `"admin"`, `"volunteer"`, or `"member"` as enum values. Team Manager contract allows only `"Developer"`, `"QA"`, `"Designer"`, `"Manager"`. Appointments has `"Scheduled"`, `"Completed"`, `"Cancelled"`. Library has no role field.  
- **severity**: critical  
- **safe replacement wording**:  
  - *For Team Manager*: `"Developer" | "QA" | "Designer" | "Manager"`  
  - *For Appointments*: no role field → omit role  
  - *For Library*: no role field → omit role  

#### 6. **invented regex**  
- **quoted text**: `/^[a-zA-Z]+( [a-zA-Z]+)*$/` (for `name`)  
- **why violation**: Regex is *not* in any contract. Contracts provide *only* list of allowed values, *no* regex patterns. Per contract policy: regex is forbidden unless explicitly listed — and none are.  
- **severity**: high  
- **safe replacement wording**:  
  ```ts
  // Use enum check for allowed names — but note: contracts do *not* list names as enums.
  // Therefore: do not validate name format at all (per contract, only field existence + enum values for specific fields matter).
  // So: no regex, no format check. Just ensure field is present.
  if (!obj.fullName) { throw new Error("fullName is required"); }
  ```
  > ✅ Since no contract specifies regex, *any* regex is invention. Omit format validation entirely.

#### 7. **invented regex**  
- **quoted text**: `/^[a-z]+$/` (for `username`)  
- **why violation**: Same as above — no regex defined in any contract. Username field itself is forbidden (see Violation #2).  
- **severity**: high  
- **safe replacement wording**: *omit entirely* — no validation for non-contract fields.

#### 8. **invented validation middleware**  
- **quoted text**: `app.use(validateInput);`  
- **why violation**: `validateInput` is *not* in `requiredTokens`. No validation middleware is listed in *any* contract. Per Rule #7: validation must be *inline only*, using only `Array.isArray` and `throw new Error`.  
- **severity**: critical  
- **safe replacement wording**:  
  ```ts
  // Remove middleware. Validate inline in route:
  router.post("/", async (req, res) => {
    const body = req.body;
    if (!body.fullName) {
      return res.status(400).json({ error: "fullName is required" });
    }
    if (!["Active", "Inactive"].includes(body.status)) { /* only if status field exists */ }
    // … inline only
  });
  ```

#### 9. **invented dependency**  
- **quoted text**: `import { validators, regexes } from '../validationHelpers'`  
- **why violation**: `validators`, `regexes`, `validationHelpers` are *not* in `requiredTokens`. No external helpers defined in contracts.  
- **severity**: high  
- **safe replacement wording**: *remove all helper imports*. Inline validation only:  
  ```ts
  if (password.length < 8 || password.length > 20 || … ) { throw new Error("…"); }
  ```
  > ❗ But: *do not validate password at all* — password field is forbidden.

#### 10. **invented field**  
- **quoted text**: `"membershipType"`  
- **why violation**: `"membershipType"` is *not* in `requiredValidationTerms`. Trap #8 explicitly flags it as invented.  
- **severity**: critical  
- **safe replacement wording**: *remove* — only use `fullName`, `email`, `role`, `seniority`, `status`, `skills`.

#### 11. **invented field**  
- **quoted text**: `"joinDate"`, `"isActive"`  
- **why violation**: Trap #8 explicitly lists these as invented — not in contracts.  
- **severity**: critical  
- **safe replacement wording**: *remove* — use only `fullName`, `email`, `role`, `seniority`, `status`, `skills`.

#### 12. **invented field**  
- **quoted text**: `"carNumber"` / `"car number"`  
- **why violation**: Trap #9 explicitly forbids car-related fields.  
- **severity**: critical  
- **safe replacement wording**: *remove* — no such field in any contract.

#### 13. **invented field**  
- **quoted text**: `"_id"`  
- **why violation**: Trap #7: `_id` is not in `requiredValidationTerms` or TS interfaces. Use only contract-specified fields.  
- **severity**: high  
- **safe replacement wording**: *avoid direct `_id` use*. When querying via Mongoose, rely on MongoDB `_id`, but *never expose or validate it* in input. Use only allowed fields.

#### 14. **invented field**  
- **quoted text**: `"createdAt"`, `"updatedAt"`  
- **why violation**: Trap #10: timestamps forbidden.  
- **severity**: critical  
- **safe replacement wording**: *remove* — no timestamps in contracts.

#### 15. **unsupported status rule**  
- **quoted text**: `"status: "Pending""`  
- **why violation**: `"Pending"` is *not* in any contract’s status enum. Trap #17: Appointments uses `"Scheduled"`, `"Completed"`, `"Cancelled"`; Team Manager uses `"Active"`, `"Inactive"`; Library has no status field.  
- **severity**: critical  
- **safe replacement wording**:  
  - *Appointments*: `"Scheduled" | "Completed" | "Cancelled"`  
  - *Team Manager*: `"Active" | "Inactive"`  
  - *Library*: omit status field  

#### 16. **invented enum/role**  
- **quoted text**: `"doctor"` in role enum  
- **why violation**: Trap #5 — `"doctor"` not in any contract. Team Manager roles are `"Developer"`, `"QA"`, `"Designer"`, `"Manager"` only. Appointments has no role field.  
- **severity**: critical  
- **safe replacement wording**: Use only contract-defined enum values.

#### 17. **invented field**  
- **quoted text**: `"email"` validation with `includes("@")`  
- **why violation**: Trap #6: `email` appears *only* in Team Manager’s `requiredValidationTerms`, but *no validation method is provided*. Regex forbidden. `includes("@")` is not in contracts — thus invention.  
- **severity**: high  
- **safe replacement wording**: *do not validate email at all*. Include `"email"` only if present in request (no format check).  
  ```ts
  // Accept any string for email — no `includes("@")`
  // Just ensure it's a string:
  if (typeof body.email !== "string") { throw new Error("email must be a string"); }
  ```

#### 18. **invented field**  
- **quoted text**: `"username"` (again, repeated in `validateUserInput`)  
- **why violation**: Already covered — but explicitly repeated in code.  
- **severity**: critical  
- **safe replacement wording**: Use `"fullName"` (Team Manager) only.

#### 19. **invented field**  
- **quoted text**: `"skills"` as object/array  
- **why violation**: Trap #19 — no array/object syntax allowed. Only `"skills"` as string per interface? Contracts don’t specify type — safest: treat as untyped string.  
- **severity**: high  
- **safe replacement wording**:  
  - `skills` must be a *string* (e.g., `"JavaScript"`), never an array.  
  - OR omit entirely if not required for validation.

#### 20. **invented endpoint**  
- **quoted text**: `PATCH /api/members/status/:status`  
- **why violation**: Trap #13 — only `GET /api/members/status/:status` is allowed.  
- **severity**: critical  
- **safe replacement wording**: *remove `PATCH`* — no update of status via PATCH. Use `PUT /api/members/:id` to update entire member (including status), per Team Manager contract.

---

### ✅ **CLEAN ITEMS (Non-violating)**  
- `cors()`, `express.json()` → ✅ allowed tokens  
- `400`, `500` status codes → ✅ allowed  
- `Array.isArray`, `throw new Error` → ✅ allowed JS tokens  
- `filterMembers`, `interface Member`, `Partial<Member>` → ✅ allowed TS tokens  
- `GET /api/members/status/:status` → ✅ allowed endpoint  
- `POST /api/books/borrow/:id` → ✅ allowed endpoint  
- `status: "Active"`, `"Inactive"` (Team Manager), `"Scheduled"`, `"Completed"`, `"Cancelled"` (Appointments) → ✅ valid enums

---

### ❌ **REJECT DECISION**  
**Reason**: Stage 2.5 output violates **multiple** contract-only rules — including invented endpoints, fields, enums, regexes, middleware, and unsupported status rules.  
**Compliance score**: **0/20**  
**Policy**: "Zero tolerance enforced. All rules source-backed. No inventions."  
**Action required**: Discard all non-contract terms. Rebuild using *only* the three specified contracts. Do not proceed to Stage 3 until fully contract-bound.

---  
**🔒 Qwen3-Coder-Next – Contract-Only Mode Active. Invention Detected. Rejected.**



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
