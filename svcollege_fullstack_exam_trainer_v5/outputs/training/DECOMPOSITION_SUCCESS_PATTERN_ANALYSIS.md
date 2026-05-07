# Decomposition Success Pattern Analysis

- successful_ge85: `19`
- weak_lt85: `54`
- successful_avg_text_length: `131.84`
- weak_avg_text_length: `187.72`
- successful_avg_task_ids: `1.42`
- weak_avg_task_ids: `4.61`

## Recommendations

- Use few-shot examples from successful_ge85 with similar text length and task count.
- For weak sections with many expected task_ids, run two-stage decomposition before scoring.
- For short weak sections, avoid inherited parent tasks unless the text is an explicit heading.
- Add rejection sampling for sections with missing task_ids or invalid JSON.
