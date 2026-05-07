# MODEL REMEDIATION PLAN FROM 73 SECTIONS

- Failed or manual sections: `0`
- Average final score: `98.0`

## Weak Task Families

| task_id | affected_sections | remediation_type |
|---|---|---|

## Failed Sections

- None

## Prompt Template For Repair

```text
Train the SVCollege exam model on the failed task_id only.
Use the original section text, require both explanation and runnable code,
reject answers that miss validation/status/error handling or fail execution.
Never use Math.random and never fabricate data outside deterministic fixtures.
```

## Added Targeted Trap: Mongoose Update Options

- task_family: `api_put_update`
- advanced_leaf: `mongoose_update_options`
- issue: model may identify generic backend validation but miss the built-in Mongoose bypass in `findByIdAndUpdate`
- required_answer: `Book.findByIdAndUpdate(id, body, { new: true, runValidators: true })`
- rejected_pattern: "add route validation" without explaining that `findByIdAndUpdate` does not run schema validators by default
- locked_eval_candidate: React state mutation + missing JSON headers + Mongoose update options
