# Roadmap: English Decompiler

**Created:** 2026-04-13
**Mode:** interactive
**Granularity:** standard
**Execution:** parallel where phases allow

## Summary

**6 phases** | **16 requirements mapped** | Gap closure phase added for milestone audit findings

| # | Phase | Goal | Requirements | Success Criteria |
|---|-------|------|--------------|------------------|
| 1 | Repository Positioning and Launch Skeleton | Make the repo immediately legible as a serious white-box parser project | REPO-01, REPO-02 | 4 |
| 2 | Parser Core v0 | Parse single technical sentences into stable roles and structured JSON | PARS-01, PARS-02, PARS-03, PARS-04 | 4 |
| 3 | Local Demo v0 | Expose the parser through a minimal local web demo | DEMO-01, DEMO-02 | 4 |
| 4 | IR and White-Box Correction Loop | Turn parser output into an editable reasoning surface instead of static output | IR-01, IR-02, EDIT-01, EDIT-02, EDIT-03, EDIT-04 | 5 |
| 5 | Launch Assets and Feedback Intake | Turn the MVP into a launchable open-source release and open a channel for real-world parser failures. | REPO-03, COMM-01 | 4 |
| 6 | Milestone Evidence Reconciliation | Close milestone audit gaps by reconciling requirement traceability and restoring archive-grade verification evidence. | REPO-01, REPO-02 | 3 |

## Phase Details

### Phase 1: Repository Positioning and Launch Skeleton

**Goal:** Make the repository understandable at a glance and establish the open-source launch skeleton.

**Requirements:** REPO-01, REPO-02

**Depends on:** None

**UI hint**: no

**Success criteria:**
1. The repository positioning clearly states that the project is a white-box parser for technical English, not a translation or language-learning tool.
2. The main repository entry flow points visitors to the files and sections they need to understand value, contribution, and project direction.
3. The first-screen messaging captures what the product does, why it matters, and how it differs from translation.
4. The repo metadata plan includes short description, topics, and social preview direction for public launch.

### Phase 2: Parser Core v0

**Goal:** Build a deterministic parser that can decompose simple technical English sentences into inspectable structure.

**Requirements:** PARS-01, PARS-02, PARS-03, PARS-04

**Depends on:** Phase 1

**UI hint**: no

**Success criteria:**
1. A user can submit a single technical sentence and receive tokenized output.
2. The parser assigns action, object, relation, condition, and purpose roles with explicit rule-based logic.
3. The parser handles a curated example set of common setup-guide and API-doc sentences with stable output.
4. Structured JSON output is consistent enough to serve as the contract for the UI and IR layers.

### Phase 3: Local Demo v0

**Goal:** Make the parser visible through a local demo that shows source text, token roles, and structured output side by side.

**Requirements:** DEMO-01, DEMO-02

**Depends on:** Phase 2

**UI hint**: yes

**Success criteria:**
1. The demo accepts pasted technical English input and runs the parser locally.
2. The demo renders source text, highlighted token roles, and structured JSON in a clear three-pane flow.
3. A user can copy the current JSON output with one obvious action.
4. The demo includes enough example content for someone else to understand the product from a screenshot or GIF.

### Phase 4: IR and White-Box Correction Loop

**Goal:** Make parser behavior inspectable and editable so users can reason about mistakes instead of abandoning the tool.

**Requirements:** IR-01, IR-02, EDIT-01, EDIT-02, EDIT-03, EDIT-04

**Depends on:** Phase 3

**UI hint**: yes

**Success criteria:**
1. The parser output can be rendered as a code-like IR that reflects sequence, condition, purpose, and dependency.
2. A user can edit token roles directly in the UI without leaving the main workflow.
3. JSON and IR regenerate immediately after user corrections.
4. The interface explains why a token received its current role in short, inspectable language.
5. User corrections persist locally so wrong parses feel fixable instead of disposable.

### Phase 5: Launch Assets and Feedback Intake

**Goal:** Turn the MVP into a launchable open-source release and open a channel for real-world parser failures.

**Requirements:** REPO-03, COMM-01

**Depends on:** Phase 4

**UI hint**: no

**Success criteria:**
1. The project ships with demo assets such as GIFs, screenshots, or examples that quickly communicate the workflow.
2. The repository exposes clear issue paths for bugs, parser examples wanted, and good first issues.
3. The launch package is ready for GitHub, X, Hacker News, Reddit, and at least one Chinese developer community.
4. The first feedback loop prioritizes collecting painful real-world technical sentences over polished marketing claims.

### Phase 6: Milestone Evidence Reconciliation

**Goal:** Close the v1.0 milestone audit gaps without changing shipped product scope.

**Requirements:** REPO-01, REPO-02

**Depends on:** Phases 1-5

**UI hint**: no

**Success criteria:**
1. `REPO-01` and `REPO-02` are reconciled against the actually shipped Phase 1 surfaces instead of remaining stale in milestone audit.
2. The planning evidence chain includes the missing per-phase verification artifacts or an explicit replacement accepted by the audit path.
3. Re-running the milestone audit no longer reports archive-blocking gaps for requirement traceability or missing verification evidence.

## Coverage Check

- Phase 1: REPO-01, REPO-02
- Phase 2: PARS-01, PARS-02, PARS-03, PARS-04
- Phase 3: DEMO-01, DEMO-02
- Phase 4: IR-01, IR-02, EDIT-01, EDIT-02, EDIT-03, EDIT-04
- Phase 5: REPO-03, COMM-01
- Phase 6: REPO-01, REPO-02

Phase 6 reopens `REPO-01` and `REPO-02` only for milestone audit reconciliation; it does not add new product scope.

---
*Roadmap created: 2026-04-13*
