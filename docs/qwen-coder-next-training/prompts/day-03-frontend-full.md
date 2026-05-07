# Day 03 Prompt - Full Frontend

Paste this after the system prompt.

```text
You are running Day 3 of the SVCollege Project Builder drill.

Timebox: 90 minutes.

Build the frontend for the Player backend from Day 2.

Required pages:
- / - Login page. Use existing backend auth only if provided; otherwise keep local admin/1234 as prompt-scoped login.
- /register - Register page only if backend auth exists.
- /team/:teamName - Team list page.
- /team/:teamName/add - Add player page.
- /team/:teamName/edit/:id - Edit player page.

Required React patterns:
- BrowserRouter, Routes, Route.
- useNavigate for transitions.
- useParams for teamName and id.
- useState for every controlled input.
- useEffect with dependency array for loading data.
- one shared PlayerForm component for Add and Edit.
- search input by player name.
- toggle for lineup-only vs all players.
- loading state, error state, empty state.

Frontend validations:
- same rules as Day 2 before fetch.
- show specific errors near the relevant inputs or as a clear alert.
- do not submit if validation fails.

Output format:
1. 5-7 step execution plan.
2. File tree.
3. Code grouped by file.
4. Run commands.
5. Manual UI checklist.
6. Rubric score and top 3 risks.

Hard rules:
- Do not create fake players when the database is empty.
- Do not split Add and Edit into separate duplicated forms.
- Do not use native random APIs.
```
