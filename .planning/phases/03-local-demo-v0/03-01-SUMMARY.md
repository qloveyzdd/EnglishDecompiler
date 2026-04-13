---
phase: 03-local-demo-v0
plan: 01
subsystem: app-shell
tags: [vite, react, shadcn, tailwind, demo]
requires:
  - phase: 02-parser-core-v0
    provides: parser contract, fixtures, and validation baseline
provides:
  - Vite + React + TypeScript demo workspace
  - shadcn component baseline
  - Blank-first three-pane parser workbench
  - Read-only role and summary visualization helpers
affects: [demo, parser-contract, launch-assets, validation]
tech-stack:
  added: [react, react-dom, vite, tailwindcss, shadcn]
  patterns: [blank-first explicit parse, parser-as-source-of-truth ui, split tsconfig targets]
key-files:
  created: [index.html, components.json, tsconfig.app.json, tsconfig.node.json, vite.config.ts, src/main.tsx, src/app.css, src/lib/utils.ts, src/lib/demo.ts, src/App.tsx, src/components/demo/pane-shell.tsx, src/components/demo/role-legend.tsx, src/components/demo/role-chip.tsx, src/components/demo/summary-strip.tsx, src/components/ui/button.tsx, src/components/ui/card.tsx, src/components/ui/textarea.tsx, src/components/ui/badge.tsx, src/components/ui/scroll-area.tsx, src/components/ui/separator.tsx]
  modified: [package.json, pnpm-lock.yaml, tsconfig.json]
key-decisions:
  - "The demo imports `parseSentence` from `src/index.ts` and does not fork parser logic inside the UI."
  - "The parser build stays limited to `src/index.ts` plus the concrete parser source directory so demo helpers do not leak into the Phase 2 library output."
patterns-established:
  - "Three-pane workbench layout uses desktop ratio `1.05fr 1.1fr 1fr` and stacks vertically on narrow screens."
  - "Role styling and summary rendering stay read-only and preserve unknown spans."
requirements-completed: [DEMO-01]
duration: 12 min
completed: 2026-04-13
---

# Phase 3 Plan 01: Local Demo v0 Summary

**Vite + React + shadcn app shell with a blank-first parser workbench**

## Performance

- **Duration:** 12 min
- **Started:** 2026-04-13T15:00:00+08:00
- **Completed:** 2026-04-13T15:12:37+08:00
- **Tasks:** 3
- **Files modified:** 23

## Accomplishments

- Bootstrapped a runnable `Vite + React + TypeScript` app in the existing repo without breaking the parser library build
- Generated the `shadcn` baseline plus the exact primitives needed for this phase
- Built a blank-first three-pane demo that renders source input, token roles, and structured JSON from the existing parser contract

## Task Commits

This plan was executed inline in the current worktree and has not been split into per-task commits.

## Files Created/Modified

- `package.json` - adds Vite, React, Tailwind, shadcn, and Vitest scripts/dependencies
- `pnpm-lock.yaml` - records the resolved frontend and test dependency graph
- `tsconfig.json` - keeps parser build scope narrow while adding alias support
- `tsconfig.app.json` - types the React app entrypoints
- `tsconfig.node.json` - types the Vite config
- `vite.config.ts` - wires React, Tailwind, alias resolution, and later Vitest
- `index.html` - adds the browser root mount
- `components.json` - stores the shadcn project configuration
- `src/main.tsx` - mounts the React app
- `src/app.css` - defines the bright workbench theme and font stack
- `src/lib/utils.ts` - exports the shared `cn` helper
- `src/lib/demo.ts` - centralizes role metadata and summary helpers
- `src/App.tsx` - renders the three-pane parser workbench
- `src/components/demo/*` - implements pane shell, legend, role chips, and summary strip
- `src/components/ui/*` - provides the shadcn primitives used by the demo

## Decisions Made

- Kept the parser as the single source of truth and only layered presentation state on top
- Used a bright workbench visual direction so the page reads like an inspection tool instead of a landing page

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] The literal `shadcn init -p base-nova` command failed in the current CLI**

- **Found during:** Task 1 (`shadcn init`)
- **Issue:** the installed `shadcn` CLI rejected `base-nova` as a direct preset argument even though the generated `components.json` still uses `style: "base-nova"`
- **Fix:** initialized with `-b base -p nova` and kept the generated `components.json` as the repo truth
- **Files modified:** `components.json`
- **Verification:** `components.json` exists and `corepack pnpm build` passes with the generated components

**2. [Rule 1 - Bug] Demo helper `.ts` files would have leaked into the parser library build**

- **Found during:** Task 1 type/build review
- **Issue:** `src/lib/demo.ts` sits under `src/`, so the old broad TypeScript include pattern would have compiled demo-only helpers into the parser dist and broken `rootDir` assumptions
- **Fix:** narrowed `tsconfig.json` includes to `src/index.ts` plus the `src/parser` source files
- **Files modified:** `tsconfig.json`
- **Verification:** `corepack pnpm check` and `corepack pnpm build` both passed

---

**Total deviations:** 2 auto-fixed (1 blocking, 1 bug)
**Impact on plan:** no scope change; only execution details and build hygiene were corrected.

## Issues Encountered

- The machine still has no global `pnpm`, so all package-manager commands continue to rely on `corepack pnpm`

## User Setup Required

None - the demo runs locally with the repo scripts.

## Next Phase Readiness

- The app shell is ready for example helpers, copy feedback, and UI interaction tests
- Phase 4 can extend the same surface instead of replacing it

---
*Phase: 03-local-demo-v0*
*Completed: 2026-04-13*
