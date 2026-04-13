---
phase: 03-local-demo-v0
plan: 02
subsystem: interactions
tags: [examples, copy-json, vitest, validation, demo]
requires:
  - phase: 03-local-demo-v0
    provides: app shell, parser workbench, and shadcn baseline
provides:
  - Example helper chips
  - Copy JSON interaction feedback
  - UI interaction regression tests
  - One-command phase validation script
affects: [demo, tests, validation, parser-regressions]
tech-stack:
  added: []
  patterns: [example-fill without auto-parse, stale-output reset, same-string copy validation]
key-files:
  created: [src/components/demo/example-chips.tsx, src/components/demo/token-pane.tsx, src/components/demo/json-pane.tsx, tests/local-demo-v0.test.tsx, tests/setup.ts, scripts/validation/validate-phase-03.ps1]
  modified: [src/App.tsx, vite.config.ts, tests/parser-core-v0.test.ts]
key-decisions:
  - "Example chips stay secondary and only fill the textarea; they never trigger parsing themselves."
  - "Copy JSON always uses the same formatted string rendered in the JSON pane."
patterns-established:
  - "Editing input after a parse immediately clears stale token and JSON output."
  - "The repo now uses Vitest for both parser and UI regression checks."
requirements-completed: [DEMO-01, DEMO-02]
duration: 6 min
completed: 2026-04-13
---

# Phase 3 Plan 02: Local Demo v0 Summary

**Example helpers, copy feedback, UI tests, and a reusable Phase 3 validation path**

## Performance

- **Duration:** 6 min
- **Started:** 2026-04-13T15:06:00+08:00
- **Completed:** 2026-04-13T15:12:37+08:00
- **Tasks:** 3
- **Files modified:** 9

## Accomplishments

- Added the approved three example helper chips and kept the blank-first, explicit-parse interaction intact
- Added `Copy JSON` feedback tied to the exact visible JSON payload
- Added UI interaction coverage plus a single PowerShell validation entrypoint for install, check, test, and build

## Task Commits

This plan was executed inline in the current worktree and has not been split into per-task commits.

## Files Created/Modified

- `src/App.tsx` - adds example fill behavior, stale-output reset, and clipboard integration
- `src/components/demo/example-chips.tsx` - renders the approved three example inputs
- `src/components/demo/token-pane.tsx` - handles empty, success, and refresh-needed token states
- `src/components/demo/json-pane.tsx` - handles empty, success, and copy-failure JSON states
- `vite.config.ts` - adds Vitest config with `environment: "jsdom"`
- `tests/setup.ts` - installs clipboard mocks and cleanup hooks
- `tests/local-demo-v0.test.tsx` - locks the blank state, parse flow, example flow, reset flow, and copy flow
- `tests/parser-core-v0.test.ts` - ports the existing parser regression tests to Vitest
- `scripts/validation/validate-phase-03.ps1` - runs install, check, test, and build with `corepack pnpm` fallback

## Decisions Made

- Kept validation lightweight with Vitest + Testing Library rather than adding browser E2E
- Reused the same demo shell instead of branching into alternate screens or stores

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] The new `vitest run` script would have stranded the old parser regression test on `node:test`**

- **Found during:** Task 2 (`pnpm test`)
- **Issue:** the repo-level test command changed from `tsx --test` to `vitest run`, so the existing parser regression file had to move to the same runner
- **Fix:** ported `tests/parser-core-v0.test.ts` to Vitest APIs
- **Files modified:** `tests/parser-core-v0.test.ts`
- **Verification:** `corepack pnpm test` passed with both parser and UI suites

**2. [Rule 1 - Bug] The first copy-flow test version deadlocked around fake timers**

- **Found during:** Task 2 test authoring
- **Issue:** a fake-timer-heavy test shape stalled `userEvent` and timed out even though the UI behavior itself was correct
- **Fix:** simplified the assertion to the behavior that matters: exact clipboard payload plus visible success feedback
- **Files modified:** `tests/local-demo-v0.test.tsx`
- **Verification:** `corepack pnpm test` passed consistently

---

**Total deviations:** 2 auto-fixed (1 blocking, 1 bug)
**Impact on plan:** no scope change; only the test harness and runner integration changed.

## Issues Encountered

- None after the test harness adjustments

## User Setup Required

None - `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-03.ps1` is ready to use.

## Next Phase Readiness

- Phase 3 is now ready for UAT and security review
- Phase 4 can build IR and editable corrections on top of a tested local demo surface

---
*Phase: 03-local-demo-v0*
*Completed: 2026-04-13*
