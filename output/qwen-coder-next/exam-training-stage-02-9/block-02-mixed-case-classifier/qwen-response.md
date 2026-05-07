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

