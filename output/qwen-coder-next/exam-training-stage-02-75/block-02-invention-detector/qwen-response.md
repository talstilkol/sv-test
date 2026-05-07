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

