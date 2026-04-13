# Phase 6: Milestone Evidence Reconciliation - Context

**Gathered:** 2026-04-14
**Status:** Ready for planning

<domain>
## Phase Boundary

Close the `v1.0` milestone audit gaps without expanding shipped product scope.
This phase covers requirement traceability reconciliation for `REPO-01` and `REPO-02`, retroactive phase-level verification evidence for Phases 1-5, and only the smallest correctness fixes if Phase 1 verification proves the shipped repo surface does not actually satisfy those requirements.
It does not add parser capability, demo capability, IR behavior, or new launch assets.

</domain>

<decisions>
## Implementation Decisions

### Verification Evidence Strategy
- **D-01:** Phase 6 should generate retroactive `*-VERIFICATION.md` artifacts for Phases 1-5 instead of accepting the missing-verification gap as permanent process debt.
- **D-02:** Retroactive verification must be derived from existing evidence already present in `SUMMARY`, `UAT`, `SECURITY`, `VALIDATION`, and shipped repo/code files, not from speculative restatement.
- **D-03:** The milestone should only be considered evidence-complete when re-running the milestone audit no longer reports missing phase verification artifacts.

### Requirement Reconciliation
- **D-04:** Treat `REPO-01` and `REPO-02` as already implemented by Phase 1 unless verification uncovers a concrete mismatch against the shipped repository surface.
- **D-05:** Reconcile `REQUIREMENTS.md` and milestone audit evidence to reflect shipped reality; do not reopen repository-positioning scope unless verification shows an actual failure.
- **D-06:** The preferred outcome is a clean audit pass without accepted debt or "proceed anyway" milestone archival.

### File-Touch Policy
- **D-07:** Default to changing only `.planning` evidence-chain files in this phase.
- **D-08:** Public repo files such as `README.md`, `README.zh-CN.md`, `CONTRIBUTING.md`, or issue-template files may be edited only if Phase 6 verification proves they still miss `REPO-01` or `REPO-02`.
- **D-09:** Phase 6 should not become a second packaging pass for Phase 1 or Phase 5.

### Completion Standard
- **D-10:** The success target for this phase is a passing re-run of `/gsd-audit-milestone`, not just a smaller gap list.
- **D-11:** Phase 6 should leave `/gsd-complete-milestone v1.0` as the immediate next step.
- **D-12:** If any unresolved discrepancy remains after retroactive verification, it should be framed as a concrete fix item with evidence, not as a vague process note.

### the agent's Discretion
- Exact split of the work into one or more plan files, as long as the scope stays tightly focused on evidence reconciliation
- Exact wording and section shape of the retroactive `*-VERIFICATION.md` files, as long as they match existing GSD evidence style
- Exact order of reconciling traceability, writing verification artifacts, and re-running milestone audit
- Whether a minimal Phase 1 public-surface fix is needed after verification review

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Audit and milestone state
- `.planning/v1.0-MILESTONE-AUDIT.md` - authoritative list of archive-blocking gaps and the current audit verdict
- `.planning/ROADMAP.md` - Phase 6 goal, dependency chain, and success criteria
- `.planning/REQUIREMENTS.md` - current traceability state for `REPO-01` and `REPO-02`
- `.planning/STATE.md` - current blocker summary and workflow position
- `.planning/PROJECT.md` - core value and scope guardrails
- `AGENTS.md` - local execution rules, KISS constraints, and communication requirements

### Phase 1 shipped evidence
- `.planning/phases/01-repository-positioning-and-launch-skeleton/01-CONTEXT.md` - original Phase 1 decisions and positioning constraints
- `.planning/phases/01-repository-positioning-and-launch-skeleton/01-01-SUMMARY.md` - shipped repo-entry work and claimed `requirements-completed`
- `.planning/phases/01-repository-positioning-and-launch-skeleton/01-02-SUMMARY.md` - shipped community-surface work and claimed `requirements-completed`
- `.planning/phases/01-repository-positioning-and-launch-skeleton/01-UAT.md` - user-visible validation of Phase 1 outcomes
- `.planning/phases/01-repository-positioning-and-launch-skeleton/01-SECURITY.md` - closed threat evidence for repository surfaces
- `.planning/phases/01-repository-positioning-and-launch-skeleton/01-VALIDATION.md` - Nyquist validation state and script coverage
- `README.md` - current public English entry surface relevant to `REPO-01` and `REPO-02`
- `README.zh-CN.md` - current Chinese companion entry surface
- `CONTRIBUTING.md` - current public contribution route
- `CODE_OF_CONDUCT.md` - current repo health file
- `LICENSE` - current repo health file
- `.github/ISSUE_TEMPLATE/bug_report.md` - structured issue intake
- `.github/ISSUE_TEMPLATE/parser_example.md` - structured issue intake
- `.github/ISSUE_TEMPLATE/config.yml` - GitHub issue routing

### Later phase evidence packs
- `.planning/phases/02-parser-core-v0/02-UAT.md` - parser-core acceptance evidence
- `.planning/phases/02-parser-core-v0/02-SECURITY.md` - parser-core threat verification
- `.planning/phases/02-parser-core-v0/02-VALIDATION.md` - parser-core Nyquist state
- `.planning/phases/03-local-demo-v0/03-UAT.md` - demo-shell UAT, including the documented multi-sentence scope gap
- `.planning/phases/03-local-demo-v0/03-SECURITY.md` - demo-shell threat verification
- `.planning/phases/03-local-demo-v0/03-VALIDATION.md` - demo-shell Nyquist state
- `.planning/phases/04-ir-and-white-box-correction-loop/04-UAT.md` - correction-loop acceptance evidence
- `.planning/phases/04-ir-and-white-box-correction-loop/04-SECURITY.md` - correction-loop threat verification
- `.planning/phases/04-ir-and-white-box-correction-loop/04-VALIDATION.md` - correction-loop Nyquist state
- `.planning/phases/05-launch-assets-and-feedback-intake/05-CONTEXT.md` - launch-phase decisions relevant to repo-surface truthfulness
- `.planning/phases/05-launch-assets-and-feedback-intake/05-UAT.md` - launch-surface acceptance evidence
- `.planning/phases/05-launch-assets-and-feedback-intake/05-SECURITY.md` - launch-surface threat verification
- `.planning/phases/05-launch-assets-and-feedback-intake/05-VALIDATION.md` - launch-surface Nyquist state

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- Every completed phase already has a stable quartet of evidence files: `*-SUMMARY.md`, `*-UAT.md`, `*-SECURITY.md`, and `*-VALIDATION.md`.
- Phase 1 already has the shipped repository surfaces needed to prove `REPO-01` and `REPO-02`: `README.md`, `README.zh-CN.md`, `LICENSE`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, and issue templates.
- The audit report in `.planning/v1.0-MILESTONE-AUDIT.md` already narrows the gap to requirement reconciliation plus missing verification artifacts.

### Established Patterns
- Security files use frontmatter plus a threat register with file-and-line evidence.
- Validation files use frontmatter plus a per-task verification map and a validation audit summary.
- UAT files capture user-visible results clearly enough to support retroactive verification without re-running the original implementation work.
- Summary frontmatter already records `requirements-completed`, which is a strong bridge between execution and retroactive verification.

### Integration Points
- `.planning/phases/*/*-VERIFICATION.md` is the missing evidence layer that Phase 6 needs to add.
- `.planning/REQUIREMENTS.md` must end in a traceability state consistent with verification evidence.
- `.planning/v1.0-MILESTONE-AUDIT.md` is the primary re-check target once verification artifacts and traceability are reconciled.

</code_context>

<specifics>
## Specific Ideas

- Prefer proving shipped behavior over reopening scope.
- Treat this phase as an evidence-repair pass, not another feature pass.
- If a real mismatch is found in Phase 1, fix only that mismatch and keep the repair as small as possible.
- Phase 3's multi-sentence paragraph issue remains a future parser-scope topic, not a Phase 6 blocker unless the audit path mistakenly treats it as one.

</specifics>

<deferred>
## Deferred Ideas

- Multi-sentence parser expansion from the Phase 3 UAT gap
- Any new milestone or versioned roadmap work beyond getting `v1.0` audit-clean
- A milestone archive shortcut that skips verification evidence and proceeds with accepted debt

</deferred>

---

*Phase: 06-milestone-evidence-reconciliation*
*Context gathered: 2026-04-14*
