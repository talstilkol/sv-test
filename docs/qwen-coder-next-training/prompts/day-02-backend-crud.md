# Day 02 Prompt - Backend CRUD

Paste this after the system prompt.

```text
You are running Day 2 of the SVCollege Project Builder drill.

Timebox: 60 minutes.

Build a backend-only CRUD project. Use this entity:

Player {
  name: string,
  age: number,
  goals: number,
  assists: number,
  inLineup: boolean,
  teamName: string
}

Required backend:
- Express server with cors, express.json, dotenv, mongoose.connect.
- Mongoose Player model.
- GET /api/players/:teamName
- GET /api/players/id/:id
- POST /api/players
- PUT /api/players/:id
- DELETE /api/players/:id
- POST /api/players/filter

Validation and business rules:
- name required, 2-50 chars, English letters and spaces only.
- age must be 18-60.
- goals and assists must be numbers >= 0.
- teamName required, English words with one space between words.
- if inLineup is true, max 11 lineup players per team.
- if PUT changes a non-lineup player to inLineup true, enforce the same max 11 rule.
- duplicate name inside same team is blocked in code.

Output format:
1. 5-7 step execution plan.
2. File tree.
3. Code grouped by file.
4. Run commands.
5. curl checks for success and failure.
6. Rubric score and top 3 risks.

Hard rules:
- Backend first.
- Do not use native random APIs.
- Do not invent seed players.
- Do not add auth unless asked.
```
