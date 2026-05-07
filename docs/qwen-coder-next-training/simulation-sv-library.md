# Day 6 Simulation - SV Library

Timebox: 3.5 hours.

## Part 1 - Project, 70 points

Build a FullStack app: React + Express + MongoDB.

Entity:

```text
Book {
  title: string,
  author: string,
  year: number,
  genre: "Fiction" | "Science" | "History" | "Biography",
  isAvailable: boolean,
  borrowedBy: string
}
```

Pages:

- `/` - Login. Only `admin` / `1234` succeeds. Otherwise show a specific alert.
- `/books` - list, search, toggle available-only.
- `/books/add` - add form.
- `/books/edit/:id` - edit form using the same component as Add.

Backend routes:

- `GET /api/books`
- `GET /api/books/:id`
- `POST /api/books`
- `PUT /api/books/:id`
- `DELETE /api/books/:id`
- `POST /api/books/borrow/:id`

Validations:

- `title`: 2-50 chars, English only, unique.
- `author`: at least two words, every word starts with capital letter.
- `year`: 1900-2025.
- `genre`: one of `Fiction`, `Science`, `History`, `Biography`.
- `borrow`: allowed only when `isAvailable` is true.
- All POST/PUT validations must exist in frontend and backend.
- Duplicate title must be checked in code before create/update.

## Part 2 - JavaScript, 20 points

Write a function that receives an array of books and returns:

```text
{
  totalBooks,
  availableCount,
  borrowedCount,
  oldestYear,
  newestYear,
  mostCommonGenre
}
```

Requirements:

- Validate input is an array.
- Validate every item has title, author, year, genre, isAvailable.
- Throw `Error` for invalid input.
- Handle empty array without inventing values.

## Part 3 - TypeScript, 10 points

Write:

```text
interface Book
function filterBooks(books: Book[], filters: Partial<Book>): Book[]
```

Requirements:

- Explicit return type.
- No unjustified `any`.
- `filters` may contain any subset of `Book`.
- String filters should match case-insensitively.

## Manual verification checklist

- Backend starts.
- `GET /api/books` returns an array.
- Invalid `POST /api/books` returns 400 and specific message.
- Duplicate title returns 400.
- `PUT /api/books/:id` validates the same rules.
- Borrowing an unavailable book returns 400.
- Frontend login blocks wrong credentials.
- List page handles empty database without invented rows.
- Add/Edit shared form works.
- Search and available toggle work.
- Build passes.
