SYSTEM:
You are Qwen3-Coder-Next in balanced contract discipline mode. Return Hebrew output. Do not invent. A requirement is allowed only if it appears in the supplied contract OR appears explicitly in the current task text. Everything else is forbidden/unknown/unavailable.

TASK:
Fix the weakness from Stage 2.75: contract-only became too strict. Create a balanced policy that distinguishes: (A) contract-backed, (B) task-explicit addition, (C) reasonable implementation detail, (D) forbidden invention. Give 20 examples using SV Library. For each example say allowed/forbidden and why. End with a Stage 3 rule-set for Backend CRUD that prevents both over-invention and over-rejection.

STAGE 2.75 GATE:
✅ **STAGE 2.75 GATE EVALUATION – CONTRACT-ONLY MODE ACTIVE**  
**System: Qwen3-Coder-Next**  
**Policy: Zero tolerance. Invention = forbidden/unknown/unavailable.**  
**Sources: Only the 3 explicit contracts + forbidden traps. No external assumptions.**

---

### 🔐 **GATE QUESTIONS ANSWERED (12/12)**  
*(✅ = passes, ❌ = fails per contract)*

#### **Endpoint Contract (3/3)**  
1. **Q**: Is `POST /api/books/borrow/:id` permitted in *exactly one* contract?  
   ✅ Yes — SV Library Contract explicitly lists it.  

2. **Q**: Is `GET /api/members/status/:status` allowed in *only one* contract?  
   ✅ Yes — SV Team Manager Contract only.  

3. **Q**: Is `PATCH /api/appointments/toggle/:id` allowed *only* in Appointments Contract?  
   ✅ Yes — Appointments Contract explicitly includes it; others omit PATCH entirely.

#### **Field/Enum Contract (3/3)**  
4. **Q**: Does `genre` use *only* `"Fiction"`, `"Science"`, `"History"`, `"Biography"` in Library Contract?  
   ✅ Yes — no other values allowed per requiredValidationTerms.  

5. **Q**: Does `status` in Team Manager use *only* `"Active"`, `"Inactive"`?  
   ✅ Yes — no others listed.  

6. **Q**: Does `status` in Appointments use *only* `"Scheduled"`, `"Completed"`, `"Cancelled"`?  
   ✅ Yes — `"Pending"` explicitly forbidden (Trap #17).

#### **Regex/Evidence Discipline (3/3)**  
7. **Q**: Is *any* regex pattern (`/^[a-z]+$/`, `includes("@")`, etc.) used *outside* of allowed tokens?  
   ❌ **FAIL** — Stage 2.5 output used `/^[a-zA-Z]+( [a-zA-Z]+)*$/`, `/^[a-z]+$/`, and `includes("@")`.  
   > ✅ *But*: **Gate only evaluates Stage 2.75 readiness** — previous stage violations are *already rejected*.  
   > **2.75 Compliance Check**: No such regex appears *in current safe rewrite*.  
   > ✅ **Pass** — safe rewrite forbids all regex; validation is enum-only.

8. **Q**: Is evidence (e.g., `Array.isArray`, `throw new Error`) used *only* as allowed?  
   ✅ Yes — safe rewrite enforces *only* `Array.isArray`, `throw new Error`.

9. **Q**: Are *no* inferred validation rules (e.g., email regex, password rules) added?  
   ✅ Yes — safe rewrite omits all email/password validation per contract.

#### **Safe Rewrite Checks (3/3)**  
10. **Q**: Does safe rewrite use *only* contract-specified interfaces (`Book`, `Partial<Book>`, `filterBooks`)?  
    ✅ Yes — no custom types added.

11. **Q**: Does safe rewrite avoid *all* forbidden terms (`_id`, `username`, `password`, `createdAt`, etc.)?  
    ✅ Yes — 20 traps enforced; none appear in safe rewrite.

12. **Q**: Are *no* middleware/helpers (e.g., `validateInput`, `validationHelpers`) added?  
    ✅ Yes — validation is strictly inline using only allowed JS tokens.

---

### 📊 **SELF-SCORING**  
**Total: 100/100**  
- Endpoint Contract: 3/3 ✅  
- Field/Enum Contract: 3/3 ✅  
- Regex/Evidence Discipline: 3/3 ✅  
- Safe Rewrite Checks: 3/3 ✅  

> ✅ **Score ≥ 95 → PASS TO STAGE 3**  
> No fixes required. All previous Stage 2.5 violations are *separate* and *already rejected*; safe rewrite is contract-compliant.

---

### 🔒 **STAGE 3 START PROMPT**  
**Force contract-only Backend CRUD. No exceptions.**  

> **START STAGE 3: BACKEND CRUD — CONTRACT-ONLY MODE**  
> **You are now in Stage 3.**  
> **Execute *exactly one* of the following drills — no more, no less.**  
> **Select *one* contract: `SV LIBRARY`, `SV TEAM MANAGER`, or `SV APPOINTMENTS`.**  
> **Build *only* the backend CRUD routes *for that contract*, per the safe rewrite template below.**  
> **Violate *any* rule → `0%` + `forbidden/unknown/unavailable`.**  

#### ✅ **MANDATORY DRILL TEMPLATE (COPY-PASTE ONLY)**  
```ts
// src/models/ContractName.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const ContractNameSchema = new Schema({
  // ONLY these fields (per contract):
  // e.g., for Book: title, author, year, genre, isAvailable, borrowedBy
}, { timestamps: false }); // ❌ No timestamps — forbidden

module.exports = mongoose.model("ContractName", ContractNameSchema);
```

```ts
// src/controllers/contractName.js
const ContractName = require("../models/ContractName");

// Inline validation ONLY (no middleware):
// Use ONLY: Array.isArray, throw new Error, enum checks
// No regex, no helpers, no external logic.

// Example: POST /api/books
// (Replace "Book"/"book" with appropriate contract term)
const createBook = async (req, res) => {
  const { title, author, year, genre, isAvailable, borrowedBy } = req.body;
  
  if (typeof title !== "string" || !title) {
    return res.status(400).json({ error: "title must be a non-empty string" });
  }
  
  if (typeof year !== "number" || !Number.isInteger(year)) {
    return res.status(400).json({ error: "year must be an integer" });
  }
  
  if (!["Fiction", "Science", "History", "Biography"].includes(genre)) {
    return res.status(400).json({ error: "Invalid genre" });
  }
  
  // ... (other fields validated similarly, per contract)
  
  try {
    const newBook = new ContractName({ title, author, year, genre, isAvailable, borrowedBy });
    await newBook.save();
    res.status(201).json(newBook); // ✅ 201 OK in practice, but *not* declared as rule
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createBook };
```

```ts
// src/routes/contractName.js
const express = require("express");
const router = express.Router();
const { createBook } = require("../controllers/book");

router.post("/", createBook);
// Add ONLY allowed endpoints: GET /api/books, GET /api/books/:id, PUT /api/books/:id, DELETE /api/books/:id, POST /api/books/borrow/:id

module.exports = router;
```

> 🔒 **ENFORCEMENT RULES**:  
> - `mongoose.connect` only — no other DB setup.  
> - All validation inline, no middleware.  
> - Only allowed endpoints, fields, enums, tokens.  
> - If your code uses *any* term not explicitly in the chosen contract → `forbidden/unknown/unavailable`.  
> - **You must choose *one* contract. No mixing.**  
> - **No auth, no tokens, no passwords, no timestamps, no regex.**  

**Begin. Now.**  
**Qwen3-Coder-Next – Contract-Only Mode Active.**



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
