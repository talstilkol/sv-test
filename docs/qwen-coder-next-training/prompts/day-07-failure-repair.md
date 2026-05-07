# Day 07 Prompt - Failure Repair Only

Paste this after the system prompt, together with the actual failing command output or manual checklist failures.

```text
You are running Day 7: failure repair only.

Timebox: 90 minutes.

You may only fix failures from the test/build/manual checklist below. Do not redesign the app. Do not add features. Do not rewrite working files.

For each failure:
1. quote the failing command or manual check.
2. identify the smallest file/function that explains the failure.
3. make the smallest correction.
4. rerun the check or state unknown/unavailable if rerun is impossible.

Required output format:
Failure 1:
- Evidence:
- Root cause:
- Minimal fix:
- Verification:

Failure 2:
- Evidence:
- Root cause:
- Minimal fix:
- Verification:

Final:
- commands rerun
- remaining unknown/unavailable items
- updated score

When a failure is about a missing token or route contract, include a corrected fenced code block for the full affected file or full function. Do not only describe the fix.
When a failure is from materialized runtime evaluation, use only the supplied failure logs. Return corrected fenced blocks with clear file paths for the affected files.
If a failure is a missing package/module, return the smallest needed package.json file with dependencies. Do not answer with install commands only.
If a failure is a missing frontend entry file, use the supplied materialized file list to point the script tag to the existing main file.

Hard rules:
- Do not use native random APIs.
- Do not add fake/demo/sample data to make the UI look full.
- Do not add endpoints outside the original contract.
- Do not claim the build passed unless you saw the passing output.
```
