---
status: complete
phase: 04-ir-and-white-box-correction-loop
source:
  - 04-01-SUMMARY.md
  - 04-02-SUMMARY.md
started: 2026-04-13T17:58:58.8903989Z
updated: 2026-04-13T18:15:16.0155600Z
---

## Current Test

[testing complete]

## Tests

### 1. IR Appears After Parse
expected: Open the local demo, enter a supported technical sentence such as "Initialize the model before training.", and click Parse Sentence. The right pane should show both Structured JSON and Code-like IR at the same time. The IR should read like a small code view instead of plain prose.
result: pass

### 2. Token Explanation Surface
expected: After parsing, clicking a token should select it and reveal a detail area with the token text, its current role, a visible rule id, and a short "Why this role" explanation.
result: pass

### 3. Manual Role Change Regenerates Output
expected: After selecting a token and changing its role, the selected chip should update immediately, and both the visible JSON and IR should regenerate from that corrected result without needing another parse.
result: pass

### 4. Local Corrections Restore for the Same Sentence
expected: After saving a manual role correction, refreshing or reopening the demo and parsing the same trimmed sentence again should restore the corrected role and show that the change is saved locally. The correction must not appear for a different sentence.
result: pass

### 5. Editing Clears Stale Corrected Output
expected: After a successful parse or correction, changing the textarea content should immediately clear the current JSON, IR, and token detail surface until Parse Sentence is clicked again.
result: pass

### 6. Copy JSON Uses the Corrected Visible Output
expected: After applying a manual correction, clicking Copy JSON should copy the exact JSON currently shown on screen, not the original uncorrected parse payload.
result: pass

## Summary

total: 6
passed: 6
issues: 0
pending: 0
skipped: 0
blocked: 0

## Gaps
