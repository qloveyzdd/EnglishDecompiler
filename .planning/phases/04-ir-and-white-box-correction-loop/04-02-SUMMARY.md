---
phase: 04-ir-and-white-box-correction-loop
plan: 02
subsystem: demo-correction-loop
tags: [react, ui, correction-loop, persistence, validation]
requires:
  - phase: 04-ir-and-white-box-correction-loop
    provides: shared summary, correction helpers, persistence helpers, ir renderer
provides:
  - Selectable token chips with in-place role editing
  - Visible rule explanation and local-save indicator
  - Stacked JSON + IR outputs from corrected parse state
  - Sentence-scoped correction rehydration
  - UI interaction tests and validation entrypoint
affects: [demo, ir, corrections, tests, validation]
tech-stack:
  added: []
  patterns: [base-result plus overrides state, synchronized json-and-ir output, explicit local persistence]
key-files:
  created: [src/components/demo/ir-pane.tsx, src/components/demo/role-picker.tsx, src/components/demo/token-inspector.tsx, tests/white-box-correction-loop.test.tsx, scripts/validation/validate-phase-04.ps1]
  modified: [src/App.tsx, src/components/demo/json-pane.tsx, src/components/demo/role-chip.tsx, src/components/demo/token-pane.tsx, tests/setup.ts]
key-decisions:
  - "App owns baseResult, selected token, and sentence overrides; corrected output is derived, not stored separately."
  - "Editing the input still clears stale JSON, IR, selection, and copy state before the next parse."
patterns-established:
  - "JSON copy uses the exact visible corrected JSON string."
  - "Re-parsing the same trimmed sentence rehydrates saved overrides from localStorage."
requirements-completed: [IR-01, IR-02, EDIT-01, EDIT-02, EDIT-03, EDIT-04]
duration: 5 min
completed: 2026-04-14
---

# Phase 4 Plan 02 Summary

## Accomplishments

- Wired the Phase 4 correction loop into the demo so users can select tokens, change roles, inspect the reason, and regenerate JSON plus IR immediately
- Turned the right pane into synchronized `Structured JSON + Code-like IR`
- Added UI interaction tests and a one-command Phase 4 validation script

## Files

- `src/App.tsx` - owns `baseResult`, `overrides`, and `selectedTokenIndex`
- `src/components/demo/token-pane.tsx` - combines inspector, picker, and token chips
- `src/components/demo/role-chip.tsx` - makes token chips selectable buttons
- `src/components/demo/token-inspector.tsx` - shows token, role, rule id, and reason
- `src/components/demo/role-picker.tsx` - exposes the 6 explicit role buttons
- `src/components/demo/json-pane.tsx` - leaves room for the stacked JSON and IR layout
- `src/components/demo/ir-pane.tsx` - adds the IR output surface
- `tests/white-box-correction-loop.test.tsx` - UI interaction regression coverage
- `tests/setup.ts` - clears `localStorage` between test runs
- `scripts/validation/validate-phase-04.ps1` - runs install/check/test/build in one path

## Auto-fixed Issues

- The persistence-restore test hit two visible `Saved locally` badges, so I changed the assertion to `getAllByText()` instead of treating the real UI structure as a failure
- The first version of `validate-phase-04.ps1` did not stop on command failure, so I added `$LASTEXITCODE` checks to prevent false-green validation

## Verification

- `corepack pnpm check`
- `corepack pnpm test`
- `corepack pnpm build`
- `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-04.ps1`

## Next

- Move to `/gsd-next` so Phase 4 can go through UAT, security, and Nyquist validation
