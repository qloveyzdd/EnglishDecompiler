---
phase: 04-ir-and-white-box-correction-loop
plan: 01
subsystem: correction-core
tags: [summary, overrides, local-storage, ir, vitest]
requires:
  - phase: 03-local-demo-v0
    provides: local demo shell and parser workbench
provides:
  - Shared summary rebuilding for raw and corrected spans
  - Deterministic role override helpers
  - Sentence-scoped correction persistence helpers
  - Code-like IR renderer
  - Helper-level regression tests
affects: [parser-core, ir, corrections, validation]
tech-stack:
  added: []
  patterns: [single corrected-result path, sentence-scoped persistence, shared summary rebuild]
key-files:
  created: [src/parser/summary.ts, src/lib/corrections.ts, src/lib/correction-storage.ts, src/lib/ir.ts, tests/white-box-correction-core.test.ts]
  modified: [src/parser/parser.ts, src/index.ts]
key-decisions:
  - "Corrected spans reuse the same summary builder as parser-owned spans."
  - "Role overrides preserve the original token text, normalization, rule id, offsets, and relation kind."
patterns-established:
  - "IR generation reads only the corrected ParseResult and never invents a second parser path."
  - "Saved corrections stay local to one trimmed sentence key plus token index."
requirements-completed: []
duration: 2 min
completed: 2026-04-14
---

# Phase 4 Plan 01 Summary

## Accomplishments

- Extracted a shared `summarizeSpans()` helper so parser output and corrected output rebuild summary through the same path
- Added deterministic helper modules for role overrides, sentence-scoped persistence, and IR rendering
- Locked the helper layer with unit tests for correction, summary, IR, and storage behavior

## Files

- `src/parser/summary.ts` - shared summary rebuilding
- `src/lib/corrections.ts` - token role overrides and explanation strings
- `src/lib/correction-storage.ts` - sentence-scoped `localStorage` helpers
- `src/lib/ir.ts` - code-like IR generation
- `tests/white-box-correction-core.test.ts` - helper regression coverage
- `src/parser/parser.ts` - now calls the shared summary helper
- `src/index.ts` - re-exports `summarizeSpans`

## Auto-fixed Issues

- Manual overrides keep the original span `kind`, so the purpose override case still carries `kind: "sequence"`. I kept that runtime behavior and corrected the test expectation instead of dropping parser provenance.

## Verification

- `corepack pnpm check`
- `corepack pnpm test`

## Next

- Wave 2 wires the correction loop into the demo UI and adds interaction coverage plus the Phase 4 validation script
