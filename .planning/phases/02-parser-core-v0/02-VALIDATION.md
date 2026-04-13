---
phase: 02
slug: parser-core-v0
status: verified
nyquist_compliant: true
wave_0_complete: true
created: 2026-04-13
---

# Phase 02 - Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Node test runner via `tsx` + PowerShell wrapper |
| **Config file** | `package.json`, `tsconfig.json` |
| **Quick run command** | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-02.ps1` |
| **Full suite command** | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-02.ps1` |
| **Estimated runtime** | ~3 seconds |

---

## Sampling Rate

- **After every task commit:** Run `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-02.ps1`
- **After every plan wave:** Run `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-02.ps1`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 1 | PARS-01 | T-02-01, T-02-03 | Workspace can build and expose the parser entrypoint without hidden runtime dependencies | script | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-02.ps1` | yes | green |
| 02-01-02 | 01 | 1 | PARS-02 | T-02-01, T-02-02 | Role vocabulary and fallback contract remain explicit and inspectable | unit+script | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-02.ps1` | yes | green |
| 02-01-03 | 01 | 1 | PARS-04 | T-02-02, T-02-03 | `parseSentence` returns stable spans and summary for single-sentence input | unit+script | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-02.ps1` | yes | green |
| 02-02-01 | 02 | 2 | PARS-03 | T-02-04, T-02-05 | Curated fixture corpus locks the supported sentence families | fixture | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-02.ps1` | yes | green |
| 02-02-02 | 02 | 2 | PARS-03, PARS-04 | T-02-04, T-02-05 | Regression tests and smoke runner catch parser drift | test+script | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-02.ps1` | yes | green |
| 02-02-03 | 02 | 2 | PARS-03, PARS-04 | T-02-06 | One-command validation path reproduces install, check, test, and fixture checks | script | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-02.ps1` | yes | green |

*Status: pending, green, red, flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements.

---

## Manual-Only Verifications

All phase behaviors have automated verification.

---

## Validation Audit 2026-04-13

| Metric | Count |
|--------|-------|
| Gaps found | 0 |
| Resolved | 0 |
| Escalated | 0 |

Phase 2 already shipped with fixtures, regression tests, and a validation wrapper, so reconstruction found no missing automated checks.

---

## Validation Sign-Off

- [x] All tasks have automated verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all missing references
- [x] No watch-mode flags
- [x] Feedback latency < 5s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** approved 2026-04-13
