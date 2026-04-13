---
phase: 02-parser-core-v0
plan: 01
subsystem: core
tags: [typescript, node, parser, lexicon, contract]
requires:
  - phase: 01-repository-positioning-and-launch-skeleton
    provides: repository skeleton and public parser vocabulary
provides:
  - TypeScript parser workspace
  - Stable parser result contract
  - Seed lexicon for technical-English roles
  - Deterministic parseSentence export
affects: [demo, ir, parser-core, fixtures]
tech-stack:
  added: [typescript, tsx, pnpm]
  patterns: [pure-function parser core, explicit seed lexicon, ordered role-list contract]
key-files:
  created: [.gitignore, package.json, pnpm-lock.yaml, tsconfig.json, src/parser/types.ts, src/parser/lexicon.ts, src/parser/parser.ts, src/index.ts]
  modified: []
key-decisions:
  - "Parser output stays token-first with a minimal sentence summary instead of an IR-shaped contract."
  - "Unknown words degrade to `unknown` with explicit fallback rules instead of guessed labels."
patterns-established:
  - "Source exports use NodeNext-friendly `.js` import specifiers from TypeScript source."
  - "Sentence parsing stays synchronous, deterministic, and side-effect free."
requirements-completed: [PARS-01, PARS-02, PARS-04]
duration: 4 min
completed: 2026-04-13
---

# Phase 2 Plan 01: Parser Core v0 Summary

**TypeScript parser core with explicit role contract, seed lexicon, and deterministic `parseSentence` entrypoint**

## Performance

- **Duration:** 4 min
- **Started:** 2026-04-13T09:03:30+08:00
- **Completed:** 2026-04-13T09:07:33+08:00
- **Tasks:** 3
- **Files modified:** 8

## Accomplishments

- Added a minimal `TypeScript + Node` workspace for the parser core
- Defined the public parser types, summary shape, and seed vocabulary in explicit source files
- Implemented a deterministic `parseSentence` function and exported it from the package entrypoint

## Task Commits

Each task was committed atomically:

1. **Task 1: Bootstrap the minimal Node and TypeScript workspace** - `1c914fd` (`chore`)
2. **Task 2: Define the public parser contract and seed vocabulary** - `f9d3e27` (`feat`)
3. **Task 3: Implement the deterministic parse pipeline and public export** - `cf98a43` (`feat`)

**Plan metadata:** recorded in the summary/state metadata commit that follows this file.

## Files Created/Modified

- `.gitignore` - ignores Node and build output
- `package.json` - defines the parser package and core scripts
- `pnpm-lock.yaml` - records the resolved dependency graph after install
- `tsconfig.json` - configures NodeNext TypeScript output
- `src/parser/types.ts` - defines `ParseRole`, `ParseSpan`, `ParseSummary`, and `ParseResult`
- `src/parser/lexicon.ts` - stores the seed lexicon, markers, and alias normalization
- `src/parser/parser.ts` - tokenizes one sentence, labels roles, and builds the summary object
- `src/index.ts` - re-exports the parser API and public types

## Decisions Made

- Kept the parser contract role-first so later UI and IR phases can consume one stable shape
- Used alias normalization for words like `training` and `uses` to keep the seed vocabulary small

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] `pnpm` was not on PATH, so dependency install used `corepack pnpm`**

- **Found during:** Task 1 (workspace bootstrap verification)
- **Issue:** the planned `pnpm install` path could not run directly because `pnpm` was not available as a shell command
- **Fix:** used `corepack pnpm install`, verified `corepack` was present, and committed the generated `pnpm-lock.yaml`
- **Files modified:** `pnpm-lock.yaml`
- **Verification:** `corepack pnpm check` passed
- **Committed in:** `1c914fd` (workspace commit includes the resulting lockfile)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** no scope change; only the package-manager invocation differed from the written command.

## Issues Encountered

- `pnpm` was not directly installed on the machine, but `corepack` was available and worked cleanly

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- The parser core now has a stable public surface for fixtures and tests
- Wave 2 can build exact expected outputs on top of the current contract without guessing parser behavior

---
*Phase: 02-parser-core-v0*
*Completed: 2026-04-13*
