SYSTEM:
You are Qwen3-Coder-Next in strict examiner mode. Hebrew output. Do not write project code. Do not invent data. Be harsh: if one required contract item is violated, mark fail.

TASK:
Correct the previous weakness: overconfident self-grading. Evaluate this proposed SV Library backend plan against a closed contract.

Closed contract:
- Exactly 4 files: package.json, index.js, src/models/Book.js, src/routes/book.js.
- Allowed endpoints only: GET /api/books, GET /api/books/:id, POST /api/books, PUT /api/books/:id, DELETE /api/books/:id, GET /api/books/search/:term, POST /api/books/borrow/:id.
- Allowed statuses only: 200, 201, 400, 404, 500.
- Book fields only: title, author, year, genre, isAvailable, borrowedBy. borrowedBy is String. timestamps false.
- Dependencies only: express, cors, mongoose.
- No seed/demo/sample/fake data.

Proposed plan to grade:
1. package.json adds express, cors, mongoose, dotenv.
2. index.js uses express.json and cors.
3. index.js adds GET /health.
4. src/routes/book.js imports ../controllers/book.js but controllers file is not in file list.
5. DELETE returns 204.
6. borrowedBy is an array of strings.
7. schema uses timestamps true.
8. route handlers return raw mongoose document including hidden fields.
9. startup inserts three initial books for convenience.
10. plan claims score 95/100 and ready=true.

Required output:
1. A table with each item: verdict, exact rule broken, correction.
2. Corrected score out of 100.
3. pass/fail with threshold 95.
4. A one paragraph rule Qwen must follow before claiming ready=true.
