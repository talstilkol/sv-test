# MODEL REMEDIATION PLAN LEAF LEVEL

- weak_or_blocked_leaf_tasks: `0`

## Weak Task Families

| task_id | count | action |
|---|---:|---|

## Repair Prompt Template

```text
Create SVCollege exam-only remediation examples for the failed leaf task.
The answer must include meaning, decomposition, exact implementation, common trap, and a validity check.
Rejected answers must miss exactly the observed failure: missing validation, wrong status, incomplete code, or failed execution.
Use deterministic fixtures only and do not use forbidden random APIs.
```
