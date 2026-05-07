const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

// קובץ יעד – נשתמש בנתיב יחסי לשרת
const DATA_FILE = path.join(__dirname, 'data.txt');

// middleware ל-parse req.body
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// POST / - recibir טקסט מ-form, להוסיף לקובץ
router.post('/', async (req, res) => {
  const { text } = req.body;

  // validation: חייב להיות טקסט, לא ריק, לא רק רווחים
  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return res.status(400).json({ error: 'Text is required and must not be empty' });
  }

  try {
    // append to file (non-destructive)
    await fs.appendFile(DATA_FILE, text.trim() + '\n', 'utf8');
    res.status(201).json({ message: 'Text saved successfully', savedText: text.trim() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save text' });
  }
});

module.exports = router;