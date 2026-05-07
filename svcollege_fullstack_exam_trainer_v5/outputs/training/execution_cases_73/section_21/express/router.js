const express = require("/Users/tal/Desktop/\u05d7\u05d5\u05de\u05e8\u05d9\u05dd \u05dc\u05e9\u05d9\u05e2\u05d5\u05e8/svcollege_fullstack_exam_trainer_v5/verifier/js/node_modules/.pnpm/express@5.2.1/node_modules/express");
const router = express.Router();

// Deterministic fixture data for evaluation
const items = [
  { id: 1, name: "Alice", value: 100, salary: 5000, grade: 95 },
  { id: 2, name: "Bob", value: 200, salary: 4500, grade: 88 }
];

class Student {
  constructor(id, name, value, salary, grade) {
    this.id = id;
    this.name = name;
    this.value = value;
    this.salary = salary;
    this.grade = grade;
  }
}

// Helper function to validate student data
function validateStudent(data) {
  const { id, name, value, salary, grade } = data;
  
  if (typeof id !== 'number' || !Number.isInteger(id) || id <= 0) {
    return false;
  }
  
  if (typeof name !== 'string' || name.trim() === '') {
    return false;
  }
  
  if (typeof value !== 'number' || value < 0) {
    return false;
  }
  
  if (typeof salary !== 'number' || salary < 0) {
    return false;
  }
  
  if (typeof grade !== 'number' || grade < 0 || grade > 100) {
    return false;
  }
  
  return true;
}

// POST / - Create new student
router.post('/', (req, res) => {
  try {
    const studentData = req.body;
    
    // Validate input data
    if (!validateStudent(studentData)) {
      return res.status(400).json({ error: 'Invalid student data' });
    }
    
    // Check for duplicate ID
    const existingStudent = items.find(item => item.id === studentData.id);
    if (existingStudent) {
      return res.status(409).json({ error: 'Student with this ID already exists' });
    }
    
    // Create new student
    const newStudent = new Student(
      studentData.id,
      studentData.name,
      studentData.value,
      studentData.salary,
      studentData.grade
    );
    
    // Add to items array (simulating database insert)
    items.push(newStudent);
    
    // Return success response
    res.status(201).json({ message: 'Student created successfully' });
    
  } catch (error) {
    // Log error and return error response
    console.error('Error creating student:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;