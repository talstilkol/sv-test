// data/flashcards.js
// Configuration for SRS flashcards.
// Cards are generated from real lesson concepts in window.LESSONS_DATA.
var FLASHCARD_CONFIG = {
  version: "1.0.0",
  source: "LESSONS_DATA",
  levelFallbacks: [
    "student",
    "junior",
    "soldier",
    "child",
    "grandma",
    "professor",
  ],
  ratingScale: [
    { id: "again", label: "Again", srsCorrect: false },
    { id: "hard", label: "Hard", srsCorrect: true },
    { id: "good", label: "Good", srsCorrect: true },
    { id: "easy", label: "Easy", srsCorrect: true },
  ],
};

if (typeof window !== "undefined") {
  window.FLASHCARD_CONFIG = FLASHCARD_CONFIG;
}
