# Phase 6: Milestone Evidence Reconciliation - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md - this log preserves the alternatives considered.

**Date:** 2026-04-14
**Phase:** 06-milestone-evidence-reconciliation
**Areas discussed:** Verification evidence strategy, `REPO-01/REPO-02` treatment, file-touch policy, completion standard

---

## Verification Evidence Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Retroactive phase verification for Phases 1-5 | Backfill `*-VERIFICATION.md` artifacts from existing evidence and close the audit gap directly | x |
| Milestone-level explanation only | Accept the missing phase verification layer and document the debt | |
| Phase-1-only verification | Patch only the repository phase and leave the rest unchanged | |

**User's choice:** Retroactive phase verification for Phases 1-5
**Notes:** User accepted the recommended option using the default-choice shortcut.

---

## `REPO-01` / `REPO-02` Treatment

| Option | Description | Selected |
|--------|-------------|----------|
| Already implemented, reconcile evidence | Treat the requirements as shipped and repair traceability plus verification evidence | x |
| Reopen as active repo work | Allow another public-surface implementation pass for these requirements | |
| User-specified | Another treatment chosen explicitly | |

**User's choice:** Already implemented, reconcile evidence
**Notes:** Product scope should not reopen unless verification proves a concrete miss.

---

## File-Touch Policy

| Option | Description | Selected |
|--------|-------------|----------|
| Planning files first, public files only if needed | Default to `.planning` changes and repair public files only on verified mismatch | x |
| Planning files only | Strictly forbid touching any public repo file | |
| Free-form repair scope | Allow broad edits across repo-facing files | |

**User's choice:** Planning files first, public files only if needed
**Notes:** This keeps the phase narrow while still allowing factual fixes if verification uncovers one.

---

## Completion Standard

| Option | Description | Selected |
|--------|-------------|----------|
| Audit must pass cleanly | Finish only when `/gsd-audit-milestone` no longer reports archive-blocking gaps | x |
| Reduce gaps then archive with debt | Accept some unresolved process debt to finish the milestone | |
| User-specified | Another completion rule chosen explicitly | |

**User's choice:** Audit must pass cleanly
**Notes:** Accepted-debt archival is not the target for `v1.0`.

---

## the agent's Discretion

- Exact split of Phase 6 into one or more plan files
- Exact structure and wording of retroactive `*-VERIFICATION.md` artifacts
- Exact order of requirement reconciliation, verification writing, and audit rerun
- Whether a minimal public-surface correction is truly needed after evidence review

## Deferred Ideas

- Multi-sentence parser expansion from Phase 3
- Milestone archival with accepted process debt
- Any new feature or packaging scope beyond audit closure
