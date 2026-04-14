---
phase: 06
slug: milestone-evidence-reconciliation
status: verified
nyquist_compliant: true
wave_0_complete: true
created: 2026-04-14
---

# Phase 06 - Validation Strategy

> Per-phase validation contract for milestone evidence reconciliation.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | PowerShell wrapper + document-state assertions |
| **Config file** | `scripts/validation/validate-phase-06.ps1` |
| **Quick run command** | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-06.ps1` |
| **Full suite command** | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-06.ps1` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-06.ps1`
- **After every plan wave:** Run `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-06.ps1`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 06-01-01 | 01 | 1 | REPO-01, REPO-02 | T-06-01, T-06-02 | `01-VERIFICATION.md` proves the shipped repo surface instead of merely restating Phase 1 intent | doc+script | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-06.ps1` | yes | green |
| 06-01-02 | 01 | 1 | REPO-01, REPO-02 | T-06-01, T-06-03 | `02-VERIFICATION.md` and `03-VERIFICATION.md` backfill phase proof while preserving the known Phase 3 parser-scope debt as non-blocking | doc+script | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-06.ps1` | yes | green |
| 06-01-03 | 01 | 1 | REPO-01, REPO-02 | T-06-01, T-06-03 | `04-VERIFICATION.md` and `05-VERIFICATION.md` prove later-phase outputs against shipped files and existing closed evidence | doc+script | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-06.ps1` | yes | green |
| 06-02-01 | 02 | 2 | REPO-01, REPO-02 | T-06-02, T-06-04 | `REQUIREMENTS.md` only flips `REPO-01` and `REPO-02` after verification evidence exists | doc+script | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-06.ps1` | yes | green |
| 06-02-02 | 02 | 2 | REPO-01, REPO-02 | T-06-03, T-06-04 | Phase 6 produces `06-VERIFICATION.md` and reruns the milestone audit so the verification gap does not shift forward | doc+script | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-06.ps1` | yes | green |
| 06-02-03 | 02 | 2 | REPO-01, REPO-02 | T-06-04, T-06-05 | The validator proves the full verification chain, requirement-state reconciliation, and clean milestone-audit result in one command | script | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-06.ps1` | yes | green |

*Status: pending, green, red, flaky*

---

## Wave 0 Requirements

- [x] `scripts/validation/validate-phase-06.ps1` - one-command validation entrypoint for verification-chain and audit-state checks

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| If Phase 1 repo files were touched, the public repo surface still reads truthfully and does not broaden scope | REPO-01, REPO-02 | A human should sanity-check any fallback public-surface edit for messaging honesty | Open the touched repo-surface file, compare it against the new `01-VERIFICATION.md`, and confirm the edit only closes the proven mismatch |

---

## Validation Audit 2026-04-14

| Metric | Count |
|--------|-------|
| Gaps found | 0 |
| Resolved | 0 |
| Escalated | 0 |

Phase 6 should not rely on product tests to prove success. The phase is valid when:

- `01-VERIFICATION.md` through `06-VERIFICATION.md` all exist and report `status: passed`
- `REQUIREMENTS.md` shows `[x]` for `REPO-01` and `REPO-02`
- the Phase 6 traceability row ends in `Complete`
- `.planning/v1.0-MILESTONE-AUDIT.md` exists and reports `status: passed`

The Phase 6 validator should assert those exact states directly.

This audit re-ran:

- `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-06.ps1`

The run passed and ended with `Phase 06 validation passed.`. Phase 6 UAT is now closed at `3/3` in [06-UAT.md](/E:/EnglishDecompiler/.planning/phases/06-milestone-evidence-reconciliation/06-UAT.md), and the security audit is already closed with `threats_open: 0` in [06-SECURITY.md](/E:/EnglishDecompiler/.planning/phases/06-milestone-evidence-reconciliation/06-SECURITY.md). The clean milestone audit in [v1.0-MILESTONE-AUDIT.md](/E:/EnglishDecompiler/.planning/v1.0-MILESTONE-AUDIT.md) still reports `status: passed` and `requirements: 16/16`, so Phase 6 remains Nyquist-compliant with `Gaps found = 0`.

---

## Validation Sign-Off

- [x] All tasks have automated verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers the phase-specific verification gap
- [x] No watch-mode flags
- [x] Feedback latency < 10s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** approved 2026-04-14
