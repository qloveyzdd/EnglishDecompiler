---
phase: 03
slug: local-demo-v0
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-13
---

# Phase 03 - Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest + Testing Library + PowerShell wrapper |
| **Config file** | `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` |
| **Quick run command** | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-03.ps1` |
| **Full suite command** | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-03.ps1` |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After every task commit:** Run `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-03.ps1`
- **After every plan wave:** Run `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-03.ps1`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 03-01-01 | 01 | 1 | DEMO-01 | T-03-01, T-03-02 | Vite app bootstrap preserves parser buildability and alias-aware app wiring | script | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-03.ps1` | no | pending |
| 03-01-02 | 01 | 1 | DEMO-01 | T-03-01, T-03-03 | Demo shell consumes `parseSentence` directly and stays blank until explicit parse | ui+script | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-03.ps1` | no | pending |
| 03-01-03 | 01 | 1 | DEMO-01 | T-03-01, T-03-03 | Role highlighting and JSON pane render the parser contract without hidden transforms | ui+script | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-03.ps1` | no | pending |
| 03-02-01 | 02 | 2 | DEMO-01 | T-03-05, T-03-06 | Example helpers and edit-reset behavior keep the blank-first contract honest | test+ui | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-03.ps1` | no | pending |
| 03-02-02 | 02 | 2 | DEMO-02 | T-03-04, T-03-05 | Copy action mirrors the visible JSON exactly and exposes deterministic feedback states | test+ui | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-03.ps1` | no | pending |
| 03-02-03 | 02 | 2 | DEMO-01, DEMO-02 | T-03-02, T-03-04, T-03-06 | One-command validation reproduces install, check, test, and build for the full local demo | script | `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-03.ps1` | no | pending |

*Status: pending, green, red, flaky*

---

## Wave 0 Requirements

- [ ] `tests/local-demo-v0.test.tsx` - blank state, parse flow, example fill, stale-reset, and copy-flow contract tests
- [ ] `scripts/validation/validate-phase-03.ps1` - one-command validation entrypoint for Windows-first local verification
- [ ] `vite.config.ts` - Vitest environment configuration with alias support

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Screenshot readability of the three-pane layout | DEMO-01 | Visual polish is best judged by human review after implementation | Open the demo at desktop width, parse a known sentence, and confirm the screenshot clearly communicates input -> tokens -> JSON without extra explanation |

---

## Validation Sign-Off

- [ ] All tasks have automated verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all missing references
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
