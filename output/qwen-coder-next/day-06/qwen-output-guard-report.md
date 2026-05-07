# Qwen Output Guard Report

- Target: `output/qwen-coder-next/day-06`
- Contract: `docs/qwen-coder-next-training/contracts/sv-library-contract.json`
- Ready: no
- Checks: 9/11 passed

## Checks

| Status | Check | Detail |
|---|---|---|
| pass | Qwen output target exists | Scanning output/qwen-coder-next/day-06. |
| pass | Qwen output has scannable files | 1 files scanned. |
| pass | Generated output does not use native random API | No native random API token found. |
| pass | Generated output does not contain placeholder or fabricated data markers | No placeholder/fabricated data markers found. |
| pass | All contract endpoints are implemented | All contract endpoints found. |
| fail | No generated API endpoint exists outside the contract | Unexpected: GET /health |
| fail | Required stack tokens are present | Missing: BrowserRouter, VITE_API_URL |
| pass | Required validation terms are present | Required validation terms found. |
| pass | Required status codes are present | Required status codes found. |
| pass | Required JavaScript assessment tokens are present | Required JavaScript assessment tokens found. |
| pass | Required TypeScript assessment tokens are present | Required TypeScript assessment tokens found. |

## Blockers

- contract-no-invented-endpoints: Unexpected: GET /health
- contract-required-stack-tokens: Missing: BrowserRouter, VITE_API_URL
