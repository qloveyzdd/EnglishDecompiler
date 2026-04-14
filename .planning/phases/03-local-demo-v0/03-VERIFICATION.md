---
phase: 03-local-demo-v0
verified: 2026-04-14T20:08:30.2995480+08:00
status: passed
score: 3/3 must-haves verified
---

# Phase 3: Local Demo v0 Verification Report

**Phase Goal:** Make the parser visible through a local demo that shows source text, token roles, and structured output side by side.
**Verified:** 2026-04-14T20:08:30.2995480+08:00
**Status:** passed

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | The shipped demo is blank-first and only parses on explicit user action. | VERIFIED | `src/App.tsx`, `src/components/demo/example-chips.tsx`, and `tests/local-demo-v0.test.tsx` preserve the blank-first, explicit-parse behavior; `03-UAT.md` passed the blank-first and example-fill checks. |
| 2 | After parsing a supported sentence, the workbench shows source input, token roles, and structured JSON, and lets the user copy the visible JSON. | VERIFIED | `src/components/demo/token-pane.tsx`, `src/components/demo/json-pane.tsx`, and the UI tests cover parse, stale-output clearing, and copy behavior; `03-UAT.md` passed those interactions. |
| 3 | The known long multi-sentence paragraph failure is already classified as parser-scope debt, not a broken demo-shell flow. | VERIFIED | `03-UAT.md` recorded the issue, and later phase/security/validation notes explicitly classify it as a non-blocking parser-scope gap for the v1 single-sentence contract. |

**Score:** 3/3 truths verified

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/App.tsx` | Three-pane demo shell | EXISTS + SUBSTANTIVE | Owns the blank-first parse flow and the visible workbench state. |
| `src/components/demo/token-pane.tsx` | Token-role pane | EXISTS + SUBSTANTIVE | Renders token-role chips in source order. |
| `src/components/demo/json-pane.tsx` | Structured JSON pane | EXISTS + SUBSTANTIVE | Shows the parse output that the copy flow uses. |
| `tests/local-demo-v0.test.tsx` | UI regression suite | EXISTS + SUBSTANTIVE | Covers blank-first behavior, explicit parse, example fill, stale-output clearing, and copy flow. |
| `scripts/validation/validate-phase-03.ps1` | One-command validator | EXISTS + SUBSTANTIVE | Replays check, test, and build for the demo shell. |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `src/App.tsx` | `src/index.ts` | `parseSentence` usage | WIRED | The demo shell consumes the shipped parser entrypoint directly. |
| `tests/local-demo-v0.test.tsx` | `src/App.tsx` | interaction assertions | WIRED | The tests exercise the real demo shell instead of a parallel harness. |
| `scripts/validation/validate-phase-03.ps1` | demo/test/build path | validator entrypoint | WIRED | The validation wrapper covers the repo checks needed for the local demo. |

## Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|----------|
| `DEMO-01` | `03-01-PLAN.md`, `03-02-PLAN.md` | User can use a local web demo with source input, token-role highlighting, and structured output panes | SATISFIED | `src/App.tsx` and the demo components ship the three-pane workbench; `03-UAT.md` passed the blank-first, explicit-parse, and stale-reset flows. |
| `DEMO-02` | `03-02-PLAN.md` | User can copy the current JSON output from the demo | SATISFIED | `tests/local-demo-v0.test.tsx`, `03-UAT.md`, and `03-VALIDATION.md` all cover the copy flow successfully. |

**Coverage:** 2/2 requirements satisfied

## Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `.planning/phases/03-local-demo-v0/03-UAT.md` | - | Long multi-sentence explanatory paragraph degrades to many `unknown` tokens | INFO | Kept as future parser-scope debt; does not block the shipped single-sentence demo contract. |

## Human Verification Required

None - the demo shell contract is already covered by UI tests, UAT, security review, and the phase validator.

## Gaps Summary

**No blocking gaps found.** Phase 3 goal achieved for the locked single-sentence v1 scope.

## Verification Metadata

- **Verification approach:** Goal-backward using shipped demo files plus the closed Phase 3 evidence pack
- **Must-haves source:** `06-01-PLAN.md`
- **Automated checks reused:** `03-VALIDATION.md`
- **Human checks reused:** `03-UAT.md`

---
*Verified: 2026-04-14T20:08:30.2995480+08:00*
*Verifier: the agent*
