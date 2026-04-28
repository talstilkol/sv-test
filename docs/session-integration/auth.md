# Auth/Security Integration Note

Owner: current Codex integration session

## Files Added

- `data/lesson_auth_security.js`
- `data/svcollege_questions_auth.js`
- `data/svcollege_traces_auth.js`
- `data/svcollege_builds_auth.js`
- `data/svcollege_prerequisites_auth.js`
- `tests/svcollege-auth-content.test.js`

## Globals

- `LESSON_AUTH_SECURITY`
- `SVCOLLEGE_AUTH_QUESTIONS`
- `SVCOLLEGE_AUTH_TRACES`
- `SVCOLLEGE_AUTH_BUILDS`
- `SVCOLLEGE_AUTH_PREREQUISITES`

## Lesson ID

`lesson_auth_security`

## SVCollege Module Covered

`אימות ואבטחה - JWT, Cookies, Supabase/Appwrite/Firebase/Kinde`

## Counts

- Concepts: 19
- MC: 28
- Fill: 10
- Code Trace: 3
- Mini Build: 3
- Bug Hunt: 3

## Quality Notes

- No API keys, OAuth secrets or real provider endpoints are included.
- Provider examples are conceptual and keep secrets on the server side.
- Authentication and authorization are taught separately.
- JWT is described as signed, not encrypted.
- Cookies are taught with `httpOnly`, `secure`, `sameSite` and expiry tradeoffs.

## Validation Commands

```bash
node --check data/lesson_auth_security.js
node --check data/svcollege_questions_auth.js
node --check data/svcollege_traces_auth.js
node --check data/svcollege_builds_auth.js
node --check data/svcollege_prerequisites_auth.js
node --check tests/svcollege-auth-content.test.js
npm test -- --run tests/svcollege-auth-content.test.js tests/no-native-random.test.js
npm run svcollege:readiness:write
npm run svcollege:command-center:write
npm run build
```
