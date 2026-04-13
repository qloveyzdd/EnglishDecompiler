---
phase: 05
slug: launch-assets-and-feedback-intake
status: verified
nyquist_compliant: true
wave_0_complete: true
created: 2026-04-14
---

# Phase 05 - Validation Strategy

> Per-phase validation contract for launch assets and feedback intake.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | PowerShell wrapper + file/link checks + existing pnpm repo checks |
| **Config file** | `scripts/validation/validate-phase-05.ps1` |
| **Quick run command** | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-05.ps1` |
| **Full suite command** | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-05.ps1` |
| **Estimated runtime** | ~90 seconds |

---

## Sampling Rate

- **After every task commit:** Run `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-05.ps1`
- **After every plan wave:** Run `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-05.ps1`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 120 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 05-01-01 | 01 | 1 | REPO-03 | T-05-01, T-05-03 | Canonical examples stay inside current parser scope and remain inspectable in-repo | script | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-05.ps1` | yes | green |
| 05-01-02 | 01 | 1 | REPO-03 | T-05-01, T-05-02 | Launch assets exist at stable filenames and represent validated demo states | script+manual | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-05.ps1` | yes | green |
| 05-01-03 | 01 | 1 | REPO-03 | T-05-02 | Hero path and asset manifest stay in sync with the public repo entry | script | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-05.ps1` | yes | green |
| 05-02-01 | 02 | 2 | REPO-03 | T-05-04 | README surfaces link to the exact launch assets and examples that now exist | script | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-05.ps1` | yes | green |
| 05-02-02 | 02 | 2 | COMM-01 | T-05-05 | Feedback routes clearly expose bug, parser-example, and good-first-issue paths through GitHub-native links | script | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-05.ps1` | yes | green |
| 05-02-03 | 02 | 2 | REPO-03, COMM-01 | T-05-04, T-05-05, T-05-06 | Validation script proves the launch package and the existing app/build path remain healthy together | script | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-05.ps1` | yes | green |

*Status: pending, green, red, flaky*

---

## Wave 0 Requirements

- [x] `scripts/validation/validate-phase-05.ps1` - one-command validation entrypoint for asset, link, and repo-health checks

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Hero GIF communicates parse -> correction -> updated output without implying unsupported parser scope | REPO-03 | Visual honesty and clarity are best judged by a human | Open `README.md`, watch the hero GIF, and confirm it shows a real single-sentence workflow already supported by the demo |
| Social preview is legible at a glance and reflects the same product message as README | REPO-03 | Preview readability depends on human judgment | Open the final social preview image and confirm the title, tagline, and sentence -> structure -> IR visual are readable without zooming |

---

## Validation Audit 2026-04-14

| Metric | Count |
|--------|-------|
| Gaps found | 0 |
| Resolved | 0 |
| Escalated | 0 |

Phase 5 already has automated coverage for launch-asset presence, README and contribution-link integrity, the canonical examples corpus entrypoint, and the repo-level `check / test / build` path through [validate-phase-05.ps1](/E:/EnglishDecompiler/scripts/validation/validate-phase-05.ps1).

This audit re-ran:

- `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-05.ps1`

The run passed and ended with `Phase 05 validation passed.`. Phase 5 manual UAT is already closed at `5/5` in [05-UAT.md](/E:/EnglishDecompiler/.planning/phases/05-launch-assets-and-feedback-intake/05-UAT.md), and the security audit is already closed with `threats_open: 0` in [05-SECURITY.md](/E:/EnglishDecompiler/.planning/phases/05-launch-assets-and-feedback-intake/05-SECURITY.md).

---

## Validation Sign-Off

- [x] All tasks have automated verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all missing references
- [x] No watch-mode flags
- [x] Feedback latency < 120s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** approved 2026-04-14
