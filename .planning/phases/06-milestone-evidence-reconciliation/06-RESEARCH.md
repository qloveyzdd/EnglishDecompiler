# Phase 6: Milestone Evidence Reconciliation - Research

**Researched:** 2026-04-14
**Domain:** Retroactive verification and milestone-evidence closure for an already shipped MVP
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Phase 6 closes the `v1.0` milestone audit gaps without expanding shipped product scope.
- Retroactive `*-VERIFICATION.md` artifacts must be created for Phases 1-5 instead of accepting the missing-verification gap as permanent debt.
- `REPO-01` and `REPO-02` should be treated as already implemented unless verification proves a concrete mismatch against the shipped repository surface.
- Verification must be derived from existing evidence already present in `SUMMARY`, `UAT`, `SECURITY`, `VALIDATION`, and shipped repo/code files.
- `.planning` files are the default edit surface in this phase.
- Public repo files may be touched only if Phase 1 verification proves they still miss `REPO-01` or `REPO-02`.
- The completion target is a clean milestone audit pass without accepted debt.

### the agent's Discretion
- Exact split of the evidence-repair work across one or more plan files
- Exact wording and section layout of the retroactive verification reports
- Exact order of verification backfill, traceability reconciliation, validation scripting, and audit rerun
- Whether a minimal Phase 1 public-surface fix is actually necessary after verification review

### Deferred Ideas (OUT OF SCOPE)
- Multi-sentence parser expansion from the Phase 3 UAT issue
- New milestone or roadmap work beyond closing `v1.0`
- Packaging or launch-surface improvements unrelated to the audit gaps
- Accepted-debt milestone archival shortcuts

</user_constraints>

<research_summary>
## Summary

Phase 6 is not product work. It is evidence-repair work. The shipped MVP path is already coherent, and the milestone audit narrowed the blockers to two things:

1. `REPO-01` and `REPO-02` are still stale in `REQUIREMENTS.md`
2. no phase currently has a `*-VERIFICATION.md` artifact

The safest minimal approach is to treat the existing Phase 1-5 outputs as the source of truth and backfill the missing verification layer from those outputs. That means:
- prove each phase goal from what is already shipped
- record that proof in phase-local `*-VERIFICATION.md`
- then reconcile `REQUIREMENTS.md` and rerun the milestone audit

One extra detail matters: if Phase 6 only backfills Phases 1-5 and never creates its own `06-VERIFICATION.md`, the milestone audit logic can simply move the "missing verification" gap to the current phase. So Phase 6 should also generate `06-VERIFICATION.md` during execution after the evidence chain is repaired and the milestone audit has passed.

**Primary recommendation:** split the phase into two waves. First backfill Phase 1-5 verification reports from existing evidence. Then reconcile requirements, create Phase 6's own verification report, rerun the milestone audit, and protect the whole evidence chain with a dedicated validation script.
</research_summary>

<standard_stack>
## Standard Stack

The existing repo surfaces are enough for this phase:

### Core
| Tool / Surface | Purpose | Why It Fits |
|----------------|---------|-------------|
| Existing `SUMMARY`, `UAT`, `SECURITY`, and `VALIDATION` files | Source evidence for retroactive verification | They already describe shipped behavior and closed checks for every completed phase |
| `.planning/REQUIREMENTS.md` | Requirement-state reconciliation | This is where `REPO-01` and `REPO-02` must stop looking stale |
| `.planning/v1.0-MILESTONE-AUDIT.md` | Archive gate | This is the authoritative report that must end in `status: passed` |
| Phase-local `*-VERIFICATION.md` files | Missing evidence layer | This is the specific gap the audit complained about |
| PowerShell validation script | One-command evidence check | Consistent with earlier phases and the current Windows-first workflow |

### Supporting
| Tool / Surface | Purpose | When to Use |
|----------------|---------|-------------|
| `README.md`, `README.zh-CN.md`, `CONTRIBUTING.md`, issue templates | Live repo-surface proof for `REPO-01` and `REPO-02` | Read during Phase 1 verification and touch only if a real mismatch is proven |
| `requirements-completed` in summary frontmatter | Cross-check between execution and verification | Use to ground retroactive requirement coverage instead of rewriting history |
| `scripts/validation/validate-phase-0X.ps1` from earlier phases | Validator pattern reference | Reuse structure for the Phase 6 validation wrapper |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Retroactive per-phase verification | Milestone-level explanation only | Leaves the audit rule unsatisfied and keeps the evidence chain incomplete |
| Reopening Phase 1 repo work broadly | Evidence-first reconciliation | Risks scope creep and redoing already shipped surfaces without proof they are wrong |
| Manual eyeballing only | Validation script + audit rerun | Harder to repeat and easier to regress later |

**Key point:** this phase should repair the audit evidence chain, not invent new product scope.
</standard_stack>

<architecture_patterns>
## Architecture Patterns

### Pattern 1: Verify shipped reality, do not restate intent
**What:** Build each retroactive `*-VERIFICATION.md` from the shipped files plus the existing `SUMMARY/UAT/SECURITY/VALIDATION` evidence pack.
**When to use:** For every phase verification report in Phases 1-5.
**Why:** This keeps Phase 6 factual and prevents "verification" from becoming a paraphrase of the original plan.

### Pattern 2: Reconcile requirements only after verification exists
**What:** Update `REQUIREMENTS.md` only after Phase 1 verification proves `REPO-01` and `REPO-02` against the live repo surfaces.
**When to use:** Before checking the requirement boxes or changing traceability state.
**Why:** Otherwise the repo would simply be asserting completion without archive-grade proof.

### Pattern 3: Prevent the verification gap from moving forward
**What:** Create `06-VERIFICATION.md` in the same phase that repairs Phases 1-5.
**When to use:** After Phase 6 finishes its own requirement reconciliation and audit rerun.
**Why:** The milestone audit expects every phase in scope to have verification evidence.

### Pattern 4: Audit rerun is the last truth source
**What:** Treat the updated `v1.0-MILESTONE-AUDIT.md` as the final gate after verification files and requirements are reconciled.
**When to use:** Near the end of the phase, after all file changes are in place.
**Why:** It is the exact report that previously blocked milestone closure.

### Anti-Patterns to Avoid
- Marking `REPO-01` and `REPO-02` complete in `REQUIREMENTS.md` before Phase 1 verification exists
- Rewriting large parts of README or contribution surfaces "just to be safe"
- Treating the Phase 3 multi-sentence paragraph issue as a new blocker for `v1.0`
- Repairing only Phases 1-5 and forgetting that Phase 6 itself would still be unverified
</architecture_patterns>

<dont_hand_roll>
## Don't Hand-Roll

Problems that look simple but already have a better minimal answer:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Verification content | Fresh prose from memory | Existing summaries, UAT, security, validation, and shipped files | Keeps reports factual and auditable |
| Requirement reconciliation | Blanket checkbox flip | Verification-first update of `REPO-01` and `REPO-02` | Prevents state drift |
| Final confidence | Manual note saying "looks good" | Clean milestone audit rerun plus a validator script | Repeatable and machine-checkable |
| Scope management | New repo-polish pass | Smallest correction only if verification proves a miss | Keeps Phase 6 inside its charter |

**Key insight:** reuse the evidence already paid for instead of inventing a second documentation layer.
</dont_hand_roll>

<common_pitfalls>
## Common Pitfalls

### Pitfall 1: Verification reports become summaries of summaries
**What goes wrong:** The new `*-VERIFICATION.md` files just restate previous plan intent or summary language.
**Why it happens:** Retroactive verification feels documentation-heavy.
**How to avoid:** Force every requirement and truth to cite concrete file or artifact evidence from the shipped repo.

### Pitfall 2: Audit passes for Phases 1-5 but fails again on Phase 6
**What goes wrong:** The current phase finishes without `06-VERIFICATION.md`, so the missing-verification blocker simply moves.
**Why it happens:** The original audit only complained about Phases 1-5 because Phase 6 did not exist yet.
**How to avoid:** Make `06-VERIFICATION.md` part of the execution plan, not an afterthought.

### Pitfall 3: Phase 1 repo files get edited without evidence
**What goes wrong:** README or contribution files are rewritten even though the shipped surfaces were already fine.
**Why it happens:** The team wants to be extra safe when closing `REPO-01` and `REPO-02`.
**How to avoid:** Allow public-file edits only if `01-VERIFICATION.md` finds a concrete mismatch that blocks those requirements.

### Pitfall 4: Validation checks presence but not truth
**What goes wrong:** The validator only checks that files exist, but not that the key statuses and requirements are actually reconciled.
**Why it happens:** File-existence checks are easy to script.
**How to avoid:** Make the Phase 6 validator assert `status: passed` in the verification chain, `[x]` state for `REPO-01` and `REPO-02`, and `status: passed` in the milestone audit report.
</common_pitfalls>

<validation_architecture>
## Validation Architecture

Phase 6 should validate at three levels:

1. **Verification-chain completeness**
   - Verify that `01-VERIFICATION.md` through `06-VERIFICATION.md` all exist.
   - Verify that each report records `status: passed` once execution is complete.

2. **Requirement-state reconciliation**
   - Verify that `REPO-01` and `REPO-02` are checked in `REQUIREMENTS.md`.
   - Verify that the Phase 6 traceability row ends in `Complete`.

3. **Milestone archive readiness**
   - Verify that `.planning/v1.0-MILESTONE-AUDIT.md` exists and ends in `status: passed`.
   - Run one PowerShell entrypoint so the evidence closure is easy to repeat before milestone completion.

This phase does not need new product tests. Its strongest validation is consistent document state plus a clean milestone audit rerun.
</validation_architecture>

<open_questions>
## Open Questions

1. **Will Phase 1 verification uncover any real mismatch against the current public repo surfaces?**
   - What we know: audit evidence strongly suggests the surfaces are already correct
   - Recommendation: plan for zero repo-surface edits by default, but keep a narrow escape hatch

2. **Should Phase 6 create one or more new follow-up plans if the audit still reports a blocker after evidence repair?**
   - What we know: the target is a clean pass, not an accepted override
   - Recommendation: if a blocker remains, capture it as a concrete next plan item rather than soft process debt
</open_questions>

<sources>
## Sources

### Primary (HIGH confidence)
- `.planning/phases/06-milestone-evidence-reconciliation/06-CONTEXT.md`
- `.planning/v1.0-MILESTONE-AUDIT.md`
- `.planning/ROADMAP.md`
- `.planning/REQUIREMENTS.md`
- `.planning/STATE.md`
- `.planning/phases/01-repository-positioning-and-launch-skeleton/01-01-SUMMARY.md`
- `.planning/phases/01-repository-positioning-and-launch-skeleton/01-02-SUMMARY.md`
- `.planning/phases/01-repository-positioning-and-launch-skeleton/01-UAT.md`
- `.planning/phases/01-repository-positioning-and-launch-skeleton/01-SECURITY.md`
- `.planning/phases/01-repository-positioning-and-launch-skeleton/01-VALIDATION.md`

### Secondary (MEDIUM confidence)
- `.planning/phases/02-parser-core-v0/02-UAT.md`
- `.planning/phases/03-local-demo-v0/03-UAT.md`
- `.planning/phases/04-ir-and-white-box-correction-loop/04-UAT.md`
- `.planning/phases/05-launch-assets-and-feedback-intake/05-UAT.md`
- `README.md`
- `README.zh-CN.md`
- `CONTRIBUTING.md`

### Tertiary (LOW confidence - needs execution validation)
- Any Phase 1 public-surface fix that might be needed after `01-VERIFICATION.md`
</sources>

<metadata>
## Metadata

**Research scope:**
- Retroactive phase verification
- Requirement-state reconciliation
- Milestone audit closure
- Validation strategy for evidence repair

**Confidence breakdown:**
- Retro verification approach: HIGH
- Requirement reconciliation order: HIGH
- Need for `06-VERIFICATION.md`: HIGH
- Minimal public-file-fix escape hatch: MEDIUM

**Research date:** 2026-04-14
**Valid until:** 2026-05-14
</metadata>

---

*Phase: 06-milestone-evidence-reconciliation*
*Research completed: 2026-04-14*
*Ready for planning: yes*
