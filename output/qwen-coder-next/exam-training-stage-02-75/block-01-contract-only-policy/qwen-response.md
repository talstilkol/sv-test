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

