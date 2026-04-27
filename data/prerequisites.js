// data/prerequisites.js — W14 Prerequisite dependency tree
// Keys: "lessonId::conceptName" → array of prerequisite keys
// Used by: warning modal on missed prereq, "Suggested next" after mastery

var CONCEPT_PREREQUISITES = {
  // Lesson 11 — JavaScript Foundations (no prereqs for basics)
  "lesson_11::Variable":   [],
  "lesson_11::Array":      ["lesson_11::Variable"],
  "lesson_11::Function":   ["lesson_11::Variable"],
  "lesson_11::Scope":      ["lesson_11::Variable", "lesson_11::Function"],

  // Lesson 12 — Array Methods (need Array + Function)
  "lesson_12::forEach":    ["lesson_11::Array", "lesson_11::Function"],
  "lesson_12::map":        ["lesson_12::forEach"],
  "lesson_12::filter":     ["lesson_12::forEach"],
  "lesson_12::reduce":     ["lesson_12::map", "lesson_12::filter"],

  // Lesson 13 — Objects, Classes, DOM
  "lesson_13::Object":     ["lesson_11::Variable"],
  "lesson_13::Class":      ["lesson_13::Object", "lesson_11::Function"],

  // Lesson 15 — Advanced JS
  "lesson_15::Closure":    ["lesson_11::Scope", "lesson_11::Function"],
  "lesson_15::Promise":    ["lesson_11::Function"],
  "lesson_15::async/await": ["lesson_15::Promise"],
  "lesson_15::try/catch":  ["lesson_15::async/await"],

  // Lesson 16 — Node.js
  "lesson_16::Node.js":    ["lesson_11::Function", "lesson_15::async/await"],
  "lesson_16::npm":        ["lesson_16::Node.js"],

  // Lesson 17 — HTTP/REST
  "lesson_17::HTTP":       ["lesson_16::Node.js"],
  "lesson_17::REST API":   ["lesson_17::HTTP"],

  // Lesson 20 — MongoDB
  "lesson_20::MongoDB":    ["lesson_17::REST API", "lesson_15::async/await"],

  // Lesson 21 — React Basics
  "lesson_21::JSX":        ["lesson_11::Function", "lesson_13::Object"],
  "lesson_21::Component":  ["lesson_21::JSX"],
  "lesson_21::Props":      ["lesson_21::Component"],

  // Lesson 22 — React State
  "lesson_22::useState":           ["lesson_21::Component"],
  "lesson_22::Immutable State":    ["lesson_22::useState"],

  // Lesson 24 — React Hooks
  "lesson_24::useEffect":  ["lesson_22::useState", "lesson_15::async/await"],
  "lesson_24::useMemo":    ["lesson_22::useState", "lesson_15::Closure"],
  "lesson_24::useRef":     ["lesson_22::useState"],

  // Lesson 23 — Routing + Context
  "lesson_23::React Router": ["lesson_21::Component"],
  "lesson_23::Context API":  ["lesson_21::Props", "lesson_22::useState"],

  // Lesson 26 — TypeScript
  "lesson_26::TypeScript": ["lesson_11::Variable", "lesson_13::Object", "lesson_21::Component"],
};

// Suggested next concept after mastering each concept
var CONCEPT_SUGGESTED_NEXT = {
  "lesson_11::Variable":   ["lesson_11::Array", "lesson_11::Function"],
  "lesson_11::Array":      ["lesson_12::forEach", "lesson_12::map"],
  "lesson_11::Function":   ["lesson_11::Scope", "lesson_15::Closure", "lesson_12::map"],
  "lesson_11::Scope":      ["lesson_15::Closure"],
  "lesson_12::forEach":    ["lesson_12::map", "lesson_12::filter"],
  "lesson_12::map":        ["lesson_12::filter", "lesson_12::reduce"],
  "lesson_12::filter":     ["lesson_12::reduce"],
  "lesson_12::reduce":     ["lesson_15::Promise"],
  "lesson_13::Object":     ["lesson_13::Class", "lesson_21::JSX"],
  "lesson_13::Class":      ["lesson_21::Component"],
  "lesson_15::Closure":    ["lesson_15::Promise", "lesson_24::useMemo"],
  "lesson_15::Promise":    ["lesson_15::async/await"],
  "lesson_15::async/await": ["lesson_15::try/catch", "lesson_24::useEffect"],
  "lesson_15::try/catch":  ["lesson_16::Node.js"],
  "lesson_16::Node.js":    ["lesson_16::npm", "lesson_17::HTTP"],
  "lesson_16::npm":        ["lesson_17::REST API"],
  "lesson_17::HTTP":       ["lesson_17::REST API"],
  "lesson_17::REST API":   ["lesson_20::MongoDB"],
  "lesson_20::MongoDB":    ["lesson_23::React Router"],
  "lesson_21::JSX":        ["lesson_21::Component"],
  "lesson_21::Component":  ["lesson_21::Props", "lesson_22::useState"],
  "lesson_21::Props":      ["lesson_22::useState", "lesson_23::Context API"],
  "lesson_22::useState":   ["lesson_22::Immutable State", "lesson_24::useEffect"],
  "lesson_22::Immutable State": ["lesson_24::useMemo"],
  "lesson_24::useEffect":  ["lesson_24::useMemo", "lesson_24::useRef"],
  "lesson_24::useMemo":    ["lesson_24::useRef"],
  "lesson_24::useRef":     ["lesson_23::Context API"],
  "lesson_23::React Router": ["lesson_23::Context API"],
  "lesson_23::Context API": ["lesson_26::TypeScript"],
  "lesson_26::TypeScript": [],
};
