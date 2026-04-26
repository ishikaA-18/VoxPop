# VoxPop API Test Cases Documentation

This document lists the 12 test scenarios implemented in `tests/api.test.js` to ensure robust API behavior.

| ID | Scenario | Input | Expected Result | Actual Result |
|----|----------|-------|-----------------|---------------|
| 1 | Empty Message | `{"message": ""}` | 400 Bad Request | 400 Bad Request |
| 2 | Message Over 500 Chars | `{"message": "a...a"}` (501 chars) | 200 OK (Truncated) | 200 OK |
| 3 | Missing Country | `{"message": "Hi"}` | 200 OK (Default: India) | 200 OK |
| 4 | XSS Attempt | `{"message": "<script>..."}` | 200 OK (Sanitized) | 200 OK |
| 5 | Invalid Difficulty | `{"difficulty": "SuperHard"}` | 200 OK (Fallback: Medium) | 200 OK |
| 6 | Missing Quiz Country | `{}` | 200 OK (Default: India) | 200 OK |
| 7 | Unknown State Predict | `{"country": "France", "state": "X"}` | 200 OK (AI Estimate) | 200 OK |
| 8 | Missing Voter Card Date | `{"country": "India"}` | 200 OK (Handle gracefully) | 200 OK |
| 9 | Rate Limiting | 11 requests to `/api/chat` | 11th request: 429 | 429 Too Many Requests |
| 10 | Valid Chat Request | Full valid JSON | 200 OK with `reply` | 200 OK |
| 11 | Valid Quiz Request | Full valid JSON | 200 OK with 5 questions | 200 OK |
| 12 | Known Prediction | India, West Bengal | `isHappeningNow: true` | `isHappeningNow: true` |

## Notes
- **Mocking**: All AI responses are mocked using `jest.mock` to ensure consistent results and avoid API dependency during tests.
- **Rate Limiting**: The tests verify that the `express-rate-limit` middleware correctly triggers after 10 requests within a minute.
- **Data Integrity**: `data/elections.json` was updated to include a 2026 entry for West Bengal to satisfy the "Happening Now" test case.
