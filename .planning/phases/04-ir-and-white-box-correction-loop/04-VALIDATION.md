---
phase: 04
slug: ir-and-white-box-correction-loop
status: planned
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-13
---

# Phase 04 - Validation Strategy

> Per-phase validation contract for the IR and white-box correction loop.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest + Testing Library + PowerShell wrapper |
| **Config file** | `vite.config.ts`, `tests/setup.ts`, `scripts/validation/validate-phase-04.ps1` |
| **Quick run command** | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-04.ps1` |
| **Full suite command** | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-04.ps1` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-04.ps1`
- **After every plan wave:** Run `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-04.ps1`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 04-01-01 | 01 | 1 | EDIT-02, EDIT-03 | T-04-01, T-04-02 | Summary rebuilding and override application stay deterministic and keep parser provenance visible | unit+script | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-04.ps1` | no | pending |
| 04-01-02 | 01 | 1 | IR-01, IR-02, EDIT-04 | T-04-02, T-04-03 | IR and storage helpers derive from the same corrected state and keep persistence sentence-scoped | unit+script | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-04.ps1` | no | pending |
| 04-01-03 | 01 | 1 | IR-01, IR-02, EDIT-02, EDIT-03, EDIT-04 | T-04-01, T-04-02, T-04-03 | Helper-level tests cover correction, IR, and storage primitives before UI wiring | test+script | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-04.ps1` | no | pending |
| 04-02-01 | 02 | 2 | IR-01, IR-02, EDIT-01, EDIT-02, EDIT-03 | T-04-04, T-04-05 | Token selection, role editing, and explanation UI all point to the same corrected result | ui+script | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-04.ps1` | no | pending |
| 04-02-02 | 02 | 2 | EDIT-02, EDIT-04 | T-04-04, T-04-06 | Local persistence restores only sentence-scoped overrides and never keeps stale visible output after input edits | ui+script | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-04.ps1` | no | pending |
| 04-02-03 | 02 | 2 | IR-01, IR-02, EDIT-01, EDIT-02, EDIT-03, EDIT-04 | T-04-04, T-04-05, T-04-06 | The validation script, interaction tests, and build path prove the full correction loop works locally | test+script | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-04.ps1` | no | pending |

*Status: pending, green, red, flaky*

---

## Wave 0 Requirements

- [ ] `tests/white-box-correction-core.test.ts` - correction-layer, summary, IR, and storage helper tests
- [ ] `tests/white-box-correction-loop.test.tsx` - token editing, explanation, JSON/IR regeneration, and persistence interaction tests
- [ ] `scripts/validation/validate-phase-04.ps1` - one-command validation entrypoint for the full phase

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| IR readability stays code-like instead of over-claiming parser certainty | IR-01, IR-02 | Human judgment is still best for readability and honesty | Parse one sequence sentence and one condition sentence, then confirm the IR still looks like a lightweight code view rather than a fake compiler output |

---

## Validation Sign-Off

- [ ] All planned tasks have automated verification or a declared Wave 0 dependency
- [ ] Sampling continuity: no 3 consecutive tasks without automated verification
- [ ] Validation script covers install, check, test, and build
- [ ] Nyquist compliance will be re-evaluated after execution and validate-phase

**Approval:** ready for execution planning
