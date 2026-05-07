# Day 01 Prompt - Setup + Login/Register

Paste this after the system prompt.

```text
You are running Day 1 of the SVCollege Project Builder drill.

Timebox: 45 minutes.

Build a legal SVCollege exam starter, then a Login/Register drill.

Part A - legal starter:
- frontend: Vite React + Tailwind.
- before the exam-work section, App may contain only a basic title.
- backend: Express + Mongoose with cors, express.json, dotenv.
- backend has GET / only.
- env wiring: MONGO_URI, PORT, CLIENT_URL, VITE_API_URL.

Part B - drill implementation:
- Login page.
- Register page.
- backend auth routes for the drill.
- username/password/confirmPassword inputs.

Validation requirements:
- username: 3-15 chars, lowercase English only.
- password: 8-20 chars, uppercase, number, special char.
- confirmPassword must match password.
- duplicate username checked in code before create.
- validation exists in frontend and backend.
- every failed validation has a specific message.

Output format:
1. 5-7 step execution plan.
2. File tree.
3. Code grouped by file.
4. Run commands.
5. curl/manual checks.
6. Score yourself using the 70/20/10 rubric, even if JS/TS are not part of today.

Hard rules:
- Do not use native random APIs.
- Do not invent users or seed records.
- Do not add endpoints beyond this prompt.
```
