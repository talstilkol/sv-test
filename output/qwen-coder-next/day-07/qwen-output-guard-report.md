# Qwen Output Guard Report

- Target: `output/qwen-coder-next/day-07`
- Contract: `docs/qwen-coder-next-training/contracts/sv-library-contract.json`
- Ready: no
- Checks: 5/11 passed

## Checks

| Status | Check | Detail |
|---|---|---|
| pass | Qwen output target exists | Scanning output/qwen-coder-next/day-07. |
| pass | Qwen output has scannable files | 1 files scanned. |
| pass | Generated output does not use native random API | No native random API token found. |
| pass | Generated output does not contain placeholder or fabricated data markers | No placeholder/fabricated data markers found. |
| fail | All contract endpoints are implemented | Missing: GET /, GET /api/books, GET /api/books/:id, POST /api/books, PUT /api/books/:id, DELETE /api/books/:id, POST /api/books/borrow/:id |
| pass | No generated API endpoint exists outside the contract | No unexpected API endpoints found. |
| fail | Required stack tokens are present | Missing: express.json, cors, mongoose.connect, Routes, useNavigate, useParams, useEffect, VITE_API_URL |
| fail | Required validation terms are present | Missing: title, author, year, genre, isAvailable, borrowedBy, Fiction, Science, History, Biography |
| fail | Required status codes are present | Missing: 400, 404, 500 |
| fail | Required JavaScript assessment tokens are present | Missing: Array.isArray, throw new Error, availableCount, borrowedCount, oldestYear, newestYear, mostCommonGenre |
| fail | Required TypeScript assessment tokens are present | Missing: interface Book, Partial<Book>, filterBooks |

## Blockers

- contract-required-endpoints: Missing: GET /, GET /api/books, GET /api/books/:id, POST /api/books, PUT /api/books/:id, DELETE /api/books/:id, POST /api/books/borrow/:id
- contract-required-stack-tokens: Missing: express.json, cors, mongoose.connect, Routes, useNavigate, useParams, useEffect, VITE_API_URL
- contract-required-validation-terms: Missing: title, author, year, genre, isAvailable, borrowedBy, Fiction, Science, History, Biography
- contract-required-status-codes: Missing: 400, 404, 500
- contract-required-js-tokens: Missing: Array.isArray, throw new Error, availableCount, borrowedCount, oldestYear, newestYear, mostCommonGenre
- contract-required-ts-tokens: Missing: interface Book, Partial<Book>, filterBooks
