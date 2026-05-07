# Day 06 Prompt - SV Library Full Simulation

Paste this after the system prompt.

```text
You are running Day 6: full SV Library simulation.

Timebox: 3.5 hours.

Use the exact requirements below. Do not add features.

Part 1 - Project, 70 points:
Build a React + Express + MongoDB app.

Book {
  title: string,
  author: string,
  year: number,
  genre: "Fiction" | "Science" | "History" | "Biography",
  isAvailable: boolean,
  borrowedBy: string
}

Pages:
- / - Login. Only admin / 1234 succeeds. Otherwise show a specific alert.
- /books - list, search, toggle available-only.
- /books/add - add form.
- /books/edit/:id - edit form using the same component as Add.

Backend routes:
- GET /api/books
- GET /api/books/:id
- POST /api/books
- PUT /api/books/:id
- DELETE /api/books/:id
- POST /api/books/borrow/:id

Do not add any other backend route. No /health route.

Validations:
- title: 2-50 chars, English only, unique.
- author: at least two words, every word starts with capital letter.
- year: 1900-2025.
- genre: one of Fiction, Science, History, Biography.
- borrow: allowed only when isAvailable is true.
- all POST/PUT validations must exist in frontend and backend.
- duplicate title must be checked in code before create/update.

Part 2 - JavaScript, 20 points:
Write a function that receives an array of books and returns:
{
  totalBooks,
  availableCount,
  borrowedCount,
  oldestYear,
  newestYear,
  mostCommonGenre
}

The JavaScript answer must contain an explicit Array.isArray check.

Part 3 - TypeScript, 10 points:
Write:
interface Book
function filterBooks(books: Book[], filters: Partial<Book>): Book[]

Output format:
1. 5-7 step execution plan.
2. File tree.
3. Backend code.
4. Frontend code.
5. JS answer.
6. TS answer.
7. Run commands.
8. Manual verification checklist.
9. Self-score using the rubric.

Hard rules:
- Every code file must be in a fenced block with a clear file path.
- Do not use native random APIs.
- Do not create seed books.
- Do not invent endpoints.
- Frontend must use BrowserRouter explicitly.
- Frontend API calls must use VITE_API_URL explicitly.
- Do not mark checks as passed unless the command/check is actually run.
```
