# Question Shards — Parallel Session Output

Each parallel Sonnet session writes to its **own shard file** here, eliminating
merge conflicts on `data/questions_bank.js`.

## File pattern

`questions_session_<X>.js` where `<X>` is the session letter (A-Z).

## Schema

```js
window.QUESTIONS_SHARD_<X> = {
  mc: [
    {
      id: "mc_<lesson_short>_<concept>_<NNN>",
      topicId: "topic_<x>",
      conceptKey: "<lesson_id>::<concept_name>",
      level: 1-7,
      question: "Hebrew question text",
      options: ["...", "...", "...", "..."], // exactly 4
      correctIndex: 0-3,
      explanation: "Hebrew explanation",
      optionFeedback: [
        "✅ נכון. <reason>",
        "❌ <specific reason this distractor is wrong>",
        "❌ ...",
        "❌ ..."
      ],
    },
    // ... more
  ],
  fill: [
    {
      id: "fill_<lesson_short>_<concept>_<NNN>",
      topicId: "topic_<x>",
      conceptKey: "<lesson_id>::<concept_name>",
      level: 1-7,
      code: "code with ____ placeholder",
      answer: "exact answer",
      hint: "Hebrew hint",
      explanation: "Hebrew explanation",
    },
    // ... more
  ],
};

if (typeof module !== "undefined") module.exports = window.QUESTIONS_SHARD_<X>;
```

## Merge step

After all parallel sessions complete, the **merge session** runs
`scripts/merge_question_shards.js` which:

1. Loads all `data/shards/questions_session_*.js`
2. Validates: unique IDs, required fields, no duplicates
3. Appends valid items to `data/questions_bank.js` (`mc` and `fill` arrays)
4. Runs `npm test` and `npm run validate:strict`

## Why shards?

Direct concurrent edits to `data/questions_bank.js` cause race conditions and
huge spurious diffs (we saw +14601 lines in one session due to file rewriting).
Shards isolate each session's work to its own file → zero merge conflict.
