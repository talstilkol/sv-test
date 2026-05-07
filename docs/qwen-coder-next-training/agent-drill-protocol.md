# Agent Drill Protocol - 7 Days

הפרוטוקול מיועד להפעלה מול Qwen3-Coder-Next, לא מול תלמיד. בכל יום יש למדוד זמן, לשמור את פלט המודל בתיקייה נפרדת, להריץ בדיקות, ולדרג לפי [rubric.md](/Users/tal/Desktop/חומרים%20לשיעור/docs/qwen-coder-next-training/rubric.md).

## Day 1 - Setup + Login/Register

יעד זמן: 45 דקות.

משימה למודל:

```text
Build a legal SVCollege exam starter:
- frontend: Vite React + Tailwind, only basic App title before exam mode.
- backend: Express + Mongoose, cors, express.json, dotenv, GET / only.
- then implement Login/Register drill with username/password/confirmPassword.

Validation requirements:
- username: 3-15 chars, lowercase English only.
- password: 8-20 chars, uppercase, number, special char.
- confirmPassword must match password.
- duplicate username must be checked in code before create.
- validation must exist in frontend and backend.
```

Pass criteria:

- Backend starts and responds.
- Frontend connects through `VITE_API_URL`.
- Register and login routes are implemented only for the drill output, not for a pre-exam illegal starter.
- No forbidden native random API.
- No fabricated user records.

## Day 2 - Full CRUD Backend

יעד זמן: 60 דקות.

משימה למודל:

```text
Build a backend-only CRUD project for one entity chosen by the prompt: Player, Book, Appointment, or Trip.
Required:
- Express server with cors, express.json, dotenv, mongoose.connect.
- Mongoose model with required fields and schema validation.
- GET all, GET by id, POST, PUT, DELETE.
- POST /filter route when filters are required.
- try/catch and correct 200/201/400/404/500 status codes.
- duplicate checks in code when uniqueness is required.
- business rule checks such as max lineup or borrow only if available.
```

Pass criteria:

- Every route can be called with curl.
- Bad input returns 400, missing id returns 404.
- No route exists outside the prompt requirements.

## Day 3 - Full Frontend

יעד זמן: 90 דקות.

משימה למודל:

```text
Build the frontend for the backend from Day 2.
Required pages:
- Login
- Register when required
- Home/List
- Add
- Edit

Required React patterns:
- BrowserRouter, Routes, Route, Link/useNavigate.
- useParams for dynamic id/team/entity pages.
- useState for controlled inputs.
- useEffect with dependency array for loading.
- shared Add/Edit form component.
- search input, toggle filter, loading state, error state, empty state.
- frontend validations before fetch.
```

Pass criteria:

- Add and Edit use the same form component.
- All navigation works.
- Failed fetch shows a specific message.
- UI does not invent records when the database is empty.

## Day 4 - Validation Stress Drill

יעד זמן: 75 דקות.

משימה למודל:

```text
Implement validation helpers and backend guards for:
1. lowercase username
2. English-only name
3. capitalized full name
4. password strength
5. confirm password
6. age 18-60
7. numeric-only field
8. exact 8-digit car number
9. year range
10. enum genre/department/status
11. unique title/name
12. max 11 lineup
13. borrow only if available
14. non-empty required fields
15. min/max string length
16. array input
17. number input
18. id exists before update/delete
19. cannot update immutable owner/team field unless required
20. backend returns specific error message
```

Pass criteria:

- Each rule has frontend helper and backend guard.
- Each failed rule has a specific error.
- POST/PUT stop immediately after validation failure.

## Day 5 - JS + TS

יעד זמן: 2 שעות.

JS tasks:

1. Unique even/odd counter.
2. Sequence type: arithmetic/geometric/fibonacci/other.
3. Ordered subset.
4. Sum sequence counter.
5. Sort digits without built-in sort.
6. Player stats object.
7. Matrix occurrences.
8. Binary palindrome.
9. Custom fibonacci position.
10. Array to cumulative object.

TS tasks:

1. `Player` interface + `getTopScorer`.
2. `Book` interface + `filterBooks`.
3. Generic `filterByField<T>`.
4. Type guard `isValidPlayer`.
5. `Partial<T>` update helper.
6. `keyof` field filter.
7. React props interface.
8. React input event handler type.

Pass criteria:

- JS checks `Array.isArray`, item type, edge cases and throws `Error`.
- TS has explicit parameter and return types.
- No unjustified `any`.

## Day 6 - Full Simulation

Use [simulation-sv-library.md](/Users/tal/Desktop/חומרים%20לשיעור/docs/qwen-coder-next-training/simulation-sv-library.md).

Required command after generation:

```bash
npm run qwen:guard -- output/qwen-coder-next/day-06 --contract docs/qwen-coder-next-training/contracts/sv-library-contract.json --strict --summary
```

Pass criteria:

- Static guard passes.
- Backend and frontend run locally.
- Manual checklist passes.
- Score is 90/100 or higher.

## Day 7 - Failure Repair Only

יעד זמן: 90 דקות.

משימה למודל:

```text
You may only fix failures from the test/build/manual checklist. Do not redesign the app. Do not add features. For each fix:
1. quote the failing command or manual check,
2. identify the file,
3. make the smallest correction,
4. rerun the check.
```

Pass criteria:

- No unrelated rewrites.
- All previous failures are either fixed or marked unknown/unavailable with reason.
- Final score is 90/100 or higher across three runs.
