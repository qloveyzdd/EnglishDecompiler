# Project Retrospective

*A living document updated after each milestone. Lessons feed forward into future planning.*

## Milestone: v1.0 - MVP

**Shipped:** 2026-04-14
**Phases:** 6 | **Plans:** 12 | **Sessions:** 1

### What Was Built

- An English-first repository surface with launch assets, examples, and contribution routes
- A deterministic TypeScript parser for single technical sentences with stable JSON output
- A local demo with token roles, code-like IR, and a white-box correction loop
- A complete milestone evidence chain with per-phase verification and a clean final audit

### What Worked

- Splitting work into small phases kept parser, demo, launch, and audit concerns from bleeding into each other
- Per-phase validators made it easy to re-check shipped truth without rerunning the whole project manually

### What Was Inefficient

- Verification artifacts were not kept current from the start, so Phase 6 had to repair the evidence chain retroactively
- One parallel git commit attempt hit `index.lock`, which cost time even though the output itself stayed correct

### Patterns Established

- White-box parser behavior should stay deterministic and explainable before any broader capability work
- JSON and IR should always regenerate from one corrected-result path
- Launch assets and examples should stay repo-native so the public story matches shipped behavior

### Key Lessons

1. Every phase should close its own verification layer before milestone end, otherwise the project pays that cost later.
2. Known parser-scope debt should be recorded explicitly and carried forward, not blurred into the current milestone scope.

### Cost Observations

- Model mix: balanced profile was used, but exact percentages were not tracked in repo metadata
- Sessions: 1
- Notable: the main avoidable cost was late evidence reconciliation, not product implementation

---

## Cross-Milestone Trends

### Process Evolution

| Milestone | Sessions | Phases | Key Change |
|-----------|----------|--------|------------|
| v1.0 | 1 | 6 | Established the full GSD loop with UAT, security, validation, verification, and milestone archiving |

### Cumulative Quality

| Milestone | Tests | Coverage | Zero-Dep Additions |
|-----------|-------|----------|-------------------|
| v1.0 | Vitest suites plus six PowerShell validators | Phase-level coverage; no percentage tracked | Deterministic parser core and repo-native launch assets |

### Top Lessons (Verified Across Milestones)

1. White-box scope stays stronger when parser, demo, and launch surfaces all share one source of truth.
2. Per-phase evidence closure is cheaper than retroactive milestone repair.
