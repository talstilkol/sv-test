"use strict";

const CONTENT_SCHEMA_CONTRACT_VERSION = "content-schema-contract-v1";

const field = (type, required = true, description = "") => ({
  type,
  required,
  description,
});

const CONTENT_SCHEMA_CONTRACT = Object.freeze({
  version: CONTENT_SCHEMA_CONTRACT_VERSION,
  entities: Object.freeze({
    Lesson: Object.freeze({
      identity: "id",
      requiredFields: Object.freeze({
        id: field("string", true, "Stable lesson id used in conceptKey and routing."),
        title: field("string", true, "Learner-facing lesson title."),
        concepts: field("Concept[]", true, "Ordered concepts in the lesson."),
      }),
      optionalFields: Object.freeze({
        subtitle: field("string", false, "Short supporting text for the lesson page."),
        quiz: field("Question[]", false, "Lesson-level quiz items with explicit concept metadata."),
      }),
    }),
    Concept: Object.freeze({
      identity: "lesson.id + conceptName",
      requiredFields: Object.freeze({
        conceptName: field("string", true, "Canonical concept label shown to learners."),
        levels: field("object|string[]", true, "Adaptive explanations by learner level."),
        difficulty: field("number", true, "1..10 difficulty used by gates and routing."),
      }),
      optionalFields: Object.freeze({
        codeExample: field("string", false, "Runnable or readable code attached to the concept."),
        codeExplanation: field("string", false, "Explanation for codeExample."),
        comparisons: field("Comparison[]", false, "Side-by-side distinctions for confusing concepts."),
        bugHunts: field("BugQuestion[]", false, "Inline bug-hunt practice attached to the concept."),
        miniBuilds: field("BuildQuestion[]", false, "Inline build practice attached to the concept."),
      }),
    }),
    MCQuestion: Object.freeze({
      identity: "id",
      requiredFields: Object.freeze({
        id: field("string", true, "Stable question id."),
        conceptKey: field("string", true, "lessonId::conceptName routing key."),
        question: field("string", true, "Prompt shown to the learner."),
        options: field("string[4]", true, "Exactly four answer options."),
        correctIndex: field("number", true, "Index 0..3 for the correct option."),
        explanation: field("string", true, "Why the correct answer is correct."),
      }),
      optionalFields: Object.freeze({
        optionFeedback: field("string[4]", false, "Per-option feedback; required by coverage gates for live MC bank."),
        level: field("number", false, "1..6 challenge level."),
        requiredConcepts: field("string[]", false, "Prerequisite concepts for hard/complex questions."),
        requiredTerms: field("string[]", false, "Glossary terms required to understand the question."),
      }),
    }),
    FillQuestion: Object.freeze({
      identity: "id",
      requiredFields: Object.freeze({
        id: field("string", true, "Stable fill question id."),
        conceptKey: field("string", true, "lessonId::conceptName routing key."),
        code: field("string", true, "Code with exactly one ____ blank marker."),
        answer: field("string", true, "Single expected token or phrase."),
        explanation: field("string", true, "Why this answer fits the blank."),
      }),
      optionalFields: Object.freeze({
        acceptable: field("string[]", false, "Additional accepted answers."),
        hint: field("string", false, "Hint that narrows without revealing the answer."),
        level: field("number", false, "1..6 challenge level."),
      }),
    }),
    TraceQuestion: Object.freeze({
      identity: "id",
      requiredFields: Object.freeze({
        id: field("string", true, "Stable trace id."),
        conceptKey: field("string", true, "lessonId::conceptName routing key."),
        title: field("string", true, "Trace title shown to the learner."),
        code: field("string", true, "Code snippet to trace."),
        steps: field("TraceStep[]", true, "Ordered trace prompts and expected answers."),
        explanation: field("string", true, "Summary after all trace steps."),
      }),
      optionalFields: Object.freeze({
        level: field("number", false, "1..6 challenge level."),
        requiredTerms: field("string[]", false, "Glossary terms required for hard traces."),
      }),
    }),
    BugQuestion: Object.freeze({
      identity: "id",
      requiredFields: Object.freeze({
        id: field("string", true, "Stable bug-hunt id."),
        conceptKey: field("string", true, "lessonId::conceptName routing key."),
        title: field("string", true, "Bug prompt title."),
        brokenCode: field("string", true, "Code containing the bug."),
        options: field("string[4]", true, "Exactly four bug diagnoses."),
        correctIndex: field("number", true, "Index 0..3 for the correct diagnosis."),
        fix: field("string", true, "Corrected code or fix description."),
        explanation: field("string", true, "Why the bug happens and why the fix works."),
      }),
      optionalFields: Object.freeze({
        bugLine: field("number", false, "Line hint for the bug."),
        level: field("number", false, "1..6 challenge level."),
      }),
    }),
    BuildQuestion: Object.freeze({
      identity: "id",
      requiredFields: Object.freeze({
        id: field("string", true, "Stable mini-build id."),
        conceptKey: field("string", true, "lessonId::conceptName routing key."),
        title: field("string", true, "Build task title."),
        prompt: field("string", true, "What the learner needs to build."),
        starter: field("string", true, "Starter code shown in the editor."),
        reference: field("string", true, "Reference solution."),
        tests: field("RegexTest[]", true, "Deterministic regex checks for learner code."),
        explanation: field("string", true, "Why the reference solution works."),
      }),
      optionalFields: Object.freeze({
        hint: field("string", false, "Hint shown on request."),
        level: field("number", false, "1..6 challenge level."),
      }),
    }),
  }),
});

function entityNames() {
  return Object.keys(CONTENT_SCHEMA_CONTRACT.entities);
}

function requiredFieldNames(entityName) {
  return Object.keys(CONTENT_SCHEMA_CONTRACT.entities[entityName]?.requiredFields || {});
}

module.exports = {
  CONTENT_SCHEMA_CONTRACT,
  CONTENT_SCHEMA_CONTRACT_VERSION,
  entityNames,
  requiredFieldNames,
};
