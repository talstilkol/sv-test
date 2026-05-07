# Full Simulation Prompt - SV Team Manager

Paste this after the system prompt.

```text
You are running a full SV Team Manager simulation.

Timebox: 3.5 hours.

Use the exact requirements below. Do not add features.

Part 1 - Project, 70 points:
Build a React + Express + MongoDB app.

Member {
  fullName: string,
  email: string,
  role: "Developer" | "QA" | "Designer" | "Manager",
  seniority: number,
  status: "Active" | "Inactive",
  skills: string[]
}

Pages:
- / - Login. Only admin / 1234 succeeds. Otherwise show a specific alert.
- /members - list, search, status filter, active-only toggle.
- /members/add - add form.
- /members/edit/:id - edit form using the same component as Add.

Backend routes:
- GET /api/members
- GET /api/members/:id
- GET /api/members/status/:status
- POST /api/members
- PUT /api/members/:id
- DELETE /api/members/:id

Do not add any other backend route. No health/status/meta route outside the list.

Validations:
- fullName: 2-40 chars, at least two words, every word starts with capital letter.
- email: lowercase email format, unique.
- role: one of Developer, QA, Designer, Manager.
- seniority: number from 0 to 30.
- status: one of Active, Inactive.
- skills: array, 1-8 items, English letters only.
- all POST/PUT validations must exist in frontend and backend.
- duplicate email must be checked in code before create/update.

Part 2 - JavaScript, 20 points:
Write a function that receives an array of members and returns:
{
  totalMembers,
  activeCount,
  inactiveCount,
  averageSeniority,
  roleBreakdown
}

The JavaScript answer must contain an explicit Array.isArray check.

Part 3 - TypeScript, 10 points:
Write:
interface Member
function filterMembers(members: Member[], filters: Partial<Member>): Member[]

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
- Do not create seed members.
- Do not invent endpoints.
- Frontend must use BrowserRouter explicitly.
- Frontend API calls must use VITE_API_URL explicitly.
- Do not mark checks as passed unless the command/check is actually run.
```
