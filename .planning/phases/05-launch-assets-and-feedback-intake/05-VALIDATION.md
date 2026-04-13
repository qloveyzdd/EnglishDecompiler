---
phase: 05
slug: launch-assets-and-feedback-intake
status: draft
nyquist_compliant: false
wave_0_complete: false
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
| 05-01-01 | 01 | 1 | REPO-03 | T-05-01, T-05-03 | Canonical examples stay inside current parser scope and remain inspectable in-repo | script | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-05.ps1` | no | pending |
| 05-01-02 | 01 | 1 | REPO-03 | T-05-01, T-05-02 | Launch assets exist at stable filenames and represent validated demo states | script+manual | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-05.ps1` | no | pending |
| 05-01-03 | 01 | 1 | REPO-03 | T-05-02 | Hero path and asset manifest stay in sync with the public repo entry | script | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-05.ps1` | no | pending |
| 05-02-01 | 02 | 2 | REPO-03 | T-05-04 | README surfaces link to the exact launch assets and examples that now exist | script | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-05.ps1` | no | pending |
| 05-02-02 | 02 | 2 | COMM-01 | T-05-05 | Feedback routes clearly expose bug, parser-example, and good-first-issue paths through GitHub-native links | script | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-05.ps1` | no | pending |
| 05-02-03 | 02 | 2 | REPO-03, COMM-01 | T-05-04, T-05-05, T-05-06 | Validation script proves the launch package and the existing app/build path remain healthy together | script | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-05.ps1` | no | pending |

*Status: pending, green, red, flaky*

---

## Wave 0 Requirements

- [ ] `scripts/validation/validate-phase-05.ps1` - one-command validation entrypoint for asset, link, and repo-health checks

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Hero GIF communicates parse -> correction -> updated output without implying unsupported parser scope | REPO-03 | Visual honesty and clarity are best judged by a human | Open `README.md`, watch the hero GIF, and confirm it shows a real single-sentence workflow already supported by the demo |
| Social preview is legible at a glance and reflects the same product message as README | REPO-03 | Preview readability depends on human judgment | Open the final social preview image and confirm the title, tagline, and sentence -> structure -> IR visual are readable without zooming |

---

## Validation Sign-Off

- [ ] All tasks have automated verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all missing references
- [ ] No watch-mode flags
- [ ] Feedback latency < 120s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
