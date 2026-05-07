# Qwen Project Builder Rubric

Total score: 100.

## Project - 70 points

| Area | Points | Required evidence |
|---|---:|---|
| Backend base | 15 | `cors`, `express.json`, `dotenv`, `mongoose.connect`, server starts, env documented |
| CRUD completeness | 15 | GET all, GET by id, POST, PUT, DELETE, filter/extra route only when required |
| Double validation | 20 | Every POST/PUT rule exists in frontend and backend, with specific messages |
| React pages/navigation | 10 | Login/Register when required, List/Home, Add, Edit, `useNavigate`, `useParams`, `useEffect` |
| UI requirement match | 5 | Layout/order matches the prompt image or written instruction; empty/loading/error states exist |
| Error handling | 5 | try/catch, 400/404/500, no silent failures, no success message before success |

Automatic fail conditions:

- Native random API appears in any generated code.
- Qwen invents records, users, headlines, endpoints, services, credentials or dates.
- Backend cannot start.
- POST requests cannot parse JSON.
- Frontend cannot reach backend because CORS/env wiring is missing.

## JavaScript - 20 points

| Area | Points | Required evidence |
|---|---:|---|
| Input validation | 5 | `Array.isArray`, primitive type checks, invalid input throws `Error` |
| Edge cases | 5 | empty array, one item, missing fields, non-number fields where relevant |
| Algorithm correctness | 7 | returns correct result without built-in shortcut if prompt forbids it |
| Return type | 3 | exact requested object/array/boolean/number shape |

## TypeScript - 10 points

| Area | Points | Required evidence |
|---|---:|---|
| Explicit typing | 4 | parameters, returns, arrays, optional fields |
| Interface/type shape | 3 | matches prompt exactly |
| Generics/guards | 2 | uses `keyof`, `Partial`, type guard or generic when relevant |
| `any` discipline | 1 | no `any` unless the prompt explicitly asks for it and it is justified |

## Review ritual

After every run, write exactly:

```text
Score: __/100
Blocking failures:
1.
2.
3.
Next run focus:
1.
2.
3.
```

Do not list more than three focus items. The goal is speed and correction, not a lecture.
