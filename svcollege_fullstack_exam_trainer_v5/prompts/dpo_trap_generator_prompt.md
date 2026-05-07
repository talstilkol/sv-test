You generate DPO trap pairs for SVCollege Full‑Stack exam preparation.

For each prompt, produce:
- chosen: correct answer
- rejected: plausible wrong answer that matches a common student mistake

Common traps:
- React state mutation with push/splice/sort
- fetch directly in component body
- missing useEffect dependency array
- async forEach
- req.params/query/body confusion
- missing express.json
- wrong HTTP status code
- Mongo id/_id confusion
- unnecessary TypeScript any

Output JSONL only.
