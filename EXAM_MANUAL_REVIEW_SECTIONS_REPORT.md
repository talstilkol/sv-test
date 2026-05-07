# Exam Manual Review Sections Report

- ready: true
- policy: manual_review stays locked until the original source exposes a complete technical contract; no invented code is allowed.
- sectionExercises: 73
- readySections: 69
- manualReviewSections: 4
- lockedNonAutoScorable: 4/4
- withSourceReviewTask: 4/4
- withoutInventedCodeSurface: 4/4
- promotionReady: 0/4
- requiredContractFields: 6

## Sections
| ID | Source | Question | Reason | Locked | No Invented Code | Source Review Task | Promotion Ready | Missing Fields |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| section-04 | עותק של מבחן טיסות.docx | Q1 | insufficient-source-contract | V | V | V | X | 6 |
| section-33 | עותק של מבחן מחסן לוגיסטי.docx | Q2 | insufficient-source-contract | V | V | V | X | 6 |
| section-50 | עותק של מבחן פולסטאק מועד ב 2022.pdf | Q1 | insufficient-source-contract | V | V | V | X | 6 |
| section-51 | עותק של מבחן פולסטאק מועד ב 2022.pdf | Q2 | insufficient-source-contract | V | V | V | X | 6 |

## Closure Plan
### section-04 - עותק של מבחן טיסות.docx / Q1

- blockerEvidence: Only heading-level source is available now: שאלה 1 – 50 נקודות.; refs: exam_sections_task_breakdown.jsonl::idx:4 | exam_sections_task_breakdown.md::עותק של מבחן טיסות.docx::Q1::main
- nextAction: Open the original source for עותק של מבחן טיסות.docx / Q1 and fill docs/source-review.md with the full technical contract.
- missingEvidence:
  - full_source_prompt: נוסח מלא של השאלה - טקסט מלא או צילום/OCR של סעיף המבחן, מעבר לכותרת ולניקוד.
  - target_surface: משטח יעד - קובץ או מסך יעד: route, component, function, model, schema או DB.
  - input_output_contract: קלט ופלט - מה המשתמש/השרת מקבל, מה חייב לחזור, ומה מבנה הנתונים.
  - validation_and_errors: ולידציה ושגיאות - תנאי חובה, edge cases, הודעות שגיאה או status codes.
  - scoring_rubric: ניקוד רשמי - חלוקת נקודות רשמית לתת־סעיפים, אם קיימת במקור.
  - acceptance_gate: בדיקת קבלה - איך מוכיחים שהפתרון נכון: UI state, API response, DB state או test.
- promotionGate:
  - sourceText is longer than a heading/points line
  - target file or surface is known
  - input/output contract is explicit
  - validation/errors and acceptance gate are explicit
  - score rubric can be mapped without inventing code
  - sourceRefs remain traceable

### section-33 - עותק של מבחן מחסן לוגיסטי.docx / Q2

- blockerEvidence: Only heading-level source is available now: שאלה 2 - 25 נקודות 😊 SVCOLLEGEבהצלחה; refs: exam_sections_task_breakdown.jsonl::idx:33 | exam_sections_task_breakdown.md::עותק של מבחן מחסן לוגיסטי.docx::Q2::main
- nextAction: Open the original source for עותק של מבחן מחסן לוגיסטי.docx / Q2 and fill docs/source-review.md with the full technical contract.
- missingEvidence:
  - full_source_prompt: נוסח מלא של השאלה - טקסט מלא או צילום/OCR של סעיף המבחן, מעבר לכותרת ולניקוד.
  - target_surface: משטח יעד - קובץ או מסך יעד: route, component, function, model, schema או DB.
  - input_output_contract: קלט ופלט - מה המשתמש/השרת מקבל, מה חייב לחזור, ומה מבנה הנתונים.
  - validation_and_errors: ולידציה ושגיאות - תנאי חובה, edge cases, הודעות שגיאה או status codes.
  - scoring_rubric: ניקוד רשמי - חלוקת נקודות רשמית לתת־סעיפים, אם קיימת במקור.
  - acceptance_gate: בדיקת קבלה - איך מוכיחים שהפתרון נכון: UI state, API response, DB state או test.
- promotionGate:
  - sourceText is longer than a heading/points line
  - target file or surface is known
  - input/output contract is explicit
  - validation/errors and acceptance gate are explicit
  - score rubric can be mapped without inventing code
  - sourceRefs remain traceable

### section-50 - עותק של מבחן פולסטאק מועד ב 2022.pdf / Q1

- blockerEvidence: Only heading-level source is available now: שאלה 1 – 40 נקודות.; refs: exam_sections_task_breakdown.jsonl::idx:50 | exam_sections_task_breakdown.md::עותק של מבחן פולסטאק מועד ב 2022.pdf::Q1::main
- nextAction: Open the original source for עותק של מבחן פולסטאק מועד ב 2022.pdf / Q1 and fill docs/source-review.md with the full technical contract.
- missingEvidence:
  - full_source_prompt: נוסח מלא של השאלה - טקסט מלא או צילום/OCR של סעיף המבחן, מעבר לכותרת ולניקוד.
  - target_surface: משטח יעד - קובץ או מסך יעד: route, component, function, model, schema או DB.
  - input_output_contract: קלט ופלט - מה המשתמש/השרת מקבל, מה חייב לחזור, ומה מבנה הנתונים.
  - validation_and_errors: ולידציה ושגיאות - תנאי חובה, edge cases, הודעות שגיאה או status codes.
  - scoring_rubric: ניקוד רשמי - חלוקת נקודות רשמית לתת־סעיפים, אם קיימת במקור.
  - acceptance_gate: בדיקת קבלה - איך מוכיחים שהפתרון נכון: UI state, API response, DB state או test.
- promotionGate:
  - sourceText is longer than a heading/points line
  - target file or surface is known
  - input/output contract is explicit
  - validation/errors and acceptance gate are explicit
  - score rubric can be mapped without inventing code
  - sourceRefs remain traceable

### section-51 - עותק של מבחן פולסטאק מועד ב 2022.pdf / Q2

- blockerEvidence: Only heading-level source is available now: שאלה 2 - 35 נקודות; refs: exam_sections_task_breakdown.jsonl::idx:51 | exam_sections_task_breakdown.md::עותק של מבחן פולסטאק מועד ב 2022.pdf::Q2::main
- nextAction: Open the original source for עותק של מבחן פולסטאק מועד ב 2022.pdf / Q2 and fill docs/source-review.md with the full technical contract.
- missingEvidence:
  - full_source_prompt: נוסח מלא של השאלה - טקסט מלא או צילום/OCR של סעיף המבחן, מעבר לכותרת ולניקוד.
  - target_surface: משטח יעד - קובץ או מסך יעד: route, component, function, model, schema או DB.
  - input_output_contract: קלט ופלט - מה המשתמש/השרת מקבל, מה חייב לחזור, ומה מבנה הנתונים.
  - validation_and_errors: ולידציה ושגיאות - תנאי חובה, edge cases, הודעות שגיאה או status codes.
  - scoring_rubric: ניקוד רשמי - חלוקת נקודות רשמית לתת־סעיפים, אם קיימת במקור.
  - acceptance_gate: בדיקת קבלה - איך מוכיחים שהפתרון נכון: UI state, API response, DB state או test.
- promotionGate:
  - sourceText is longer than a heading/points line
  - target file or surface is known
  - input/output contract is explicit
  - validation/errors and acceptance gate are explicit
  - score rubric can be mapped without inventing code
  - sourceRefs remain traceable


## Failures
- none

