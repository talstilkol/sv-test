# Day 04 Prompt - Validation Stress

Paste this after the system prompt.

```text
You are running Day 4 of the SVCollege Project Builder drill.

Timebox: 75 minutes.

Implement frontend validation helpers and backend guard functions for these rules:

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
19. immutable owner/team field unless the prompt explicitly allows updating it
20. backend returns specific error message

Required output:
- frontend validators file.
- backend guards file.
- example usage in one React form submit.
- example usage in one Express POST route.
- a table mapping each rule to frontend function, backend function, and failure message.

Hard rules:
- Every POST/PUT failure must stop execution immediately.
- No generic "Error" message when a rule is known.
- Do not use native random APIs.
- Do not invent data.
```
