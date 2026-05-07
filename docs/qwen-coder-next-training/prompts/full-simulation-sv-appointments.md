# Full Simulation Prompt - SV Appointments

Paste this after the system prompt.

```text
You are running a full SV Appointments simulation.

Timebox: 3.5 hours.

Use the exact requirements below. Do not add features.

Part 1 - Project, 70 points:
Build a React + Express + MongoDB app.

Appointment {
  patientName: string,
  doctorName: string,
  date: string,
  time: string,
  reason: string,
  status: "Scheduled" | "Completed" | "Cancelled"
}

Pages:
- / - Login. Only admin / 1234 succeeds. Otherwise show a specific alert.
- /appointments - list, search, status filter, scheduled-only toggle.
- /appointments/add - add form.
- /appointments/edit/:id - edit form using the same component as Add.

Backend routes:
- GET /api/appointments
- GET /api/appointments/:id
- GET /api/appointments/status/:status
- POST /api/appointments
- PUT /api/appointments/:id
- DELETE /api/appointments/:id
- PATCH /api/appointments/toggle/:id

Do not add any other backend route. No health/status/meta route outside the list.

Validations:
- patientName: 2-40 chars, at least two words, every word starts with capital letter.
- doctorName: 2-40 chars, at least two words, every word starts with capital letter.
- date: ISO date string, not before 2026-01-01.
- time: HH:mm format, 08:00-18:00.
- reason: 5-80 chars, English only.
- status: one of Scheduled, Completed, Cancelled.
- all POST/PUT validations must exist in frontend and backend.
- same doctorName + date + time must be rejected in code before create/update.
- toggle route changes Scheduled to Completed and Completed to Scheduled; Cancelled cannot be toggled.

Part 2 - JavaScript, 20 points:
Write a function that receives an array of appointments and returns:
{
  totalAppointments,
  scheduledCount,
  completedCount,
  cancelledCount,
  byDoctor
}

The JavaScript answer must contain an explicit Array.isArray check.

Part 3 - TypeScript, 10 points:
Write:
interface Appointment
function filterAppointments(appointments: Appointment[], filters: Partial<Appointment>): Appointment[]

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
- Do not create seed appointments.
- Do not invent endpoints.
- Frontend must use BrowserRouter explicitly.
- Frontend API calls must use VITE_API_URL explicitly.
- Do not mark checks as passed unless the command/check is actually run.
```
