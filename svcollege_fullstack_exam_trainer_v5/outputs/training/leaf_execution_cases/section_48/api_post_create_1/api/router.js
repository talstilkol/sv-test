const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

// Data store for testing only (immutable in real use, but mutable here for demo)
let items = [
  { id: 1, name: 'Red Box', code: '12345', salary: 5000, grade: 'A', inStock: false },
  { id: 2, name: 'Blue Folder', code: '67890', salary: 4200, grade: 'B', inStock: true }
];

// Middleware to parse JSON bodies
router.use(express.json());

// POST / - create new item
router.post('/', (req, res) => {
  const { code, name, inStock } = req.body;

  // Validate code: exactly 5 digits
  if (!code || !/^\d{5}$/.test(String(code))) {
    return res.status(400).json({ error: 'code must be exactly 5 digits' });
  }

  // Validate name: letters and spaces only, at least 4 non-space characters
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'name is required' });
  }
  const cleanName = name.trim();
  if (!/^[a-zA-Z ]+$/.test(cleanName)) {
    return res.status(400).json({ error: 'the name must contain only letters and spaces' });
  }
  const nameWithoutSpaces = cleanName.replace(/\s/g, '');
  if (nameWithoutSpaces.length < 4) {
    return res.status(400).json({ error: 'the name must contain minimum 4 characters' });
  }

  // Validate inStock: must be boolean
  if (typeof inStock !== 'boolean') {
    return res.status(400).json({ error: 'inStock must be a boolean' });
  }

  // Check for duplicate code
  const existing = items.find(item => String(item.code) === String(code));
  if (existing) {
    return res.status(400).json({ error: 'item with this code already exists' });
  }

  // Create new item
  const newItem = {
    id: items.length + 1,
    name: cleanName,
    code: code,
    salary: 0, // default as per instructions (no salary in item creation context)
    grade: 'C', // default grade
    inStock: inStock
  };

  items.push(newItem);

  res.status(201).json(newItem);
});

module.exports = router;