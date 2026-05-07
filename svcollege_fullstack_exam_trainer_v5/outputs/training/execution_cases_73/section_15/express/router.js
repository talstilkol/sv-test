const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

// Deterministic fixture data for evaluation
const items = [
  { id: 1, name: 'Flight A', value: 100, salary: 5000, grade: 'A' },
  { id: 2, name: 'Flight B', value: 200, salary: 6000, grade: 'B' },
  { id: 3, name: 'Flight C', value: 150, salary: 5500, grade: 'C' }
];

// GET /controlpanel/delete - serve HTML form
router.get('/controlpanel/delete', (req, res) => {
  const options = items.map(item => 
    `<option value="${item.id}">${item.name} (ID: ${item.id})</option>`
  ).join('');

  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Delete Flight</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    .sidebar { float: left; width: 200px; }
    .content { margin-left: 220px; }
    form { margin-top: 20px; }
    select, button { padding: 8px; margin: 5px 0; }
  </style>
</head>
<body>
  <div class="sidebar">
    <a href="/controlpanel">Control Panel</a><br>
    <a href="/controlpanel/delete">Delete Flight</a><br>
    <a href="/controlpanel/add">Add Flight</a>
  </div>
  <div class="content">
    <h2>Delete Flight</h2>
    <form id="deleteForm" method="POST" action="/controlpanel/delete">
      <label for="id">Select Flight to Delete:</label><br>
      <select name="id" id="id" required>
        <option value="">-- Select Flight --</option>
        ${options}
      </select><br>
      <button type="submit">Delete Flight</button>
    </form>
    <div id="message"></div>
  </div>
  <script>
    document.getElementById('deleteForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const response = await fetch('/controlpanel/delete/' + formData.get('id'), {
        method: 'DELETE'
      });
      const result = await response.json();
      const messageDiv = document.getElementById('message');
      if (response.ok) {
        messageDiv.innerHTML = '<span style="color: green;">' + result.message + '</span>';
        // Refresh options after successful deletion
        setTimeout(() => location.reload(), 1500);
      } else {
        messageDiv.innerHTML = '<span style="color: red;">' + result.message + '</span>';
      }
    });
  </script>
</body>
</html>`;

  res.send(html);
});

// DELETE /controlpanel/delete/:id - delete item by ID
router.delete('/controlpanel/delete/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = items.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Flight not found' });
  }

  items.splice(index, 1);
  res.status(200).json({ message: 'Flight deleted successfully' });
});

module.exports = router;