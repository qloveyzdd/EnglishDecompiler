---
phase: 02-parser-core-v0
plan: 02
subsystem: testing
tags: [fixtures, tests, validation, parser, smoke-runner]
requires:
  - phase: 02-parser-core-v0
    provides: parser core contract and deterministic parseSentence implementation
provides:
  - Curated fixture corpus
  - Parser regression tests
  - Fixture smoke runner
  - One-command phase validation script
affects: [demo, validation, parser-regressions, launch-assets]
tech-stack:
  added: []
  patterns: [fixture-driven parser verification, readme example as regression guard, PowerShell validation entrypoint]
key-files:
  created: [fixtures/parser-core-v0.ts, tests/parser-core-v0.test.ts, scripts/parse-fixtures.ts, scripts/validation/validate-phase-02.ps1]
  modified: [package.json, src/parser/parser.ts]
key-decisions:
  - "The README sentence is locked into the fixture corpus as a permanent regression case."
  - "Validation stays code-first with fixture expectations instead of screenshot-style checks."
patterns-established:
  - "Curated parser fixtures store exact spans and exact summaries beside each sentence."
  - "Validation scripts can fall back to `corepack pnpm` when `pnpm` is not directly on PATH."
requirements-completed: [PARS-03, PARS-04]
duration: 3 min
completed: 2026-04-13
---

# Phase 2 Plan 02: Parser Core v0 Summary

**Fixture-driven parser verification with regression tests, smoke runner, and a reusable Phase 2 validation script**

## Performance

- **Duration:** 3 min
- **Started:** 2026-04-13T09:08:10+08:00
- **Completed:** 2026-04-13T09:11:31+08:00
- **Tasks:** 3
- **Files modified:** 6

## Accomplishments

- Added eight curated technical-English fixtures that cover sequence, dependency, condition, and purpose patterns
- Added automated tests plus a smoke runner to compare real parser output against exact expected spans and summaries
- Added a PowerShell validation entrypoint and verified it end-to-end on the current machine

## Task Commits

Each task was committed atomically:

1. **Task 1: Add a fixture corpus with exact expected parser outputs** - `b303d9b` (`test`)
2. **Task 2: Add automated tests and a fixture smoke runner** - `7c2d7eb` (`test`)
3. **Task 3: Add a one-command local validation entrypoint for Phase 2** - `182a3b6` (`test`)

**Plan metadata:** recorded in the summary/state metadata commit that follows this file.

## Files Created/Modified

- `package.json` - adds `test` and `fixtures:parse` scripts
- `fixtures/parser-core-v0.ts` - stores the fixed sentence corpus and exact expected parser outputs
- `tests/parser-core-v0.test.ts` - asserts every fixture plus the README example regression
- `scripts/parse-fixtures.ts` - compares actual parser output against fixture expectations and exits non-zero on mismatch
- `scripts/validation/validate-phase-02.ps1` - runs install, typecheck, tests, and fixture smoke checks in one path
- `src/parser/parser.ts` - removes empty `kind` noise from non-relation summary segments

## Decisions Made

- Kept the fixture corpus small and explicit instead of pulling in a larger ad-hoc sentence set
- Used exact deep-equality checks so parser drift shows up immediately in both tests and the smoke runner

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Non-relation summaries emitted `kind: undefined`**

- **Found during:** Task 2 (regression test execution)
- **Issue:** `condition` and `purpose` summaries carried an unnecessary `kind` field with `undefined`, which broke exact deep-equality checks
- **Fix:** updated `collectSegment()` so `kind` is only added when the marker actually has a concrete relation kind
- **Files modified:** `src/parser/parser.ts`
- **Verification:** `corepack pnpm check`, `corepack pnpm test`, and `corepack pnpm fixtures:parse` all passed
- **Committed in:** `7c2d7eb`

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** no scope change; the fix only removed summary noise so the contract stayed stable.

## Issues Encountered

- None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Phase 2 now has a stable parser core plus executable regression coverage
- Phase 3 can consume the parser through `src/index.ts` and reuse the existing fixtures for demo examples

---
*Phase: 02-parser-core-v0*
*Completed: 2026-04-13*
