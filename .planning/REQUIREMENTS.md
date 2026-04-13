# Requirements: English Decompiler

**Defined:** 2026-04-13
**Core Value:** Developers can inspect and correct how a technical English sentence maps to structure, instead of blindly trusting translation output.

## v1 Requirements

### Repository

- [ ] **REPO-01**: Visitor can understand the project value from the repository homepage within 30 seconds
- [ ] **REPO-02**: Visitor can find README, LICENSE, CONTRIBUTING, CODE_OF_CONDUCT, and roadmap entry points from the repository
- [ ] **REPO-03**: Visitor can view examples or launch assets that show the white-box parsing workflow quickly

### Community

- [ ] **COMM-01**: Contributor can find clear issue paths for bugs, parser examples, and beginner-friendly contributions

### Parsing

- [x] **PARS-01**: User can paste a technical English sentence and split it into inspectable tokens
- [x] **PARS-02**: User can see token roles for action, object, relation, condition, and purpose
- [x] **PARS-03**: User can parse common setup-guide and API-doc style sentences with a small deterministic ruleset
- [x] **PARS-04**: User can receive stable structured JSON output for each parsed sentence

### IR View

- [ ] **IR-01**: User can view a code-like IR generated from parsed structure
- [ ] **IR-02**: User can see sequence, condition, purpose, and dependency reflected in the IR output

### Demo

- [x] **DEMO-01**: User can use a local web demo with source input, token-role highlighting, and structured output panes
- [x] **DEMO-02**: User can copy the current JSON output from the demo

### Corrections

- [ ] **EDIT-01**: User can change a token role from the demo UI
- [ ] **EDIT-02**: User can regenerate JSON and IR immediately after a role change
- [ ] **EDIT-03**: User can see a short reason for why a token received its current role
- [ ] **EDIT-04**: User corrections persist locally across browser refresh

## v2 Requirements

### Parsing Scope

- **NEXT-01**: User can parse short multi-sentence technical passages instead of single sentences only
- **NEXT-02**: User can export parsed structure and IR in reusable formats

### Product Expansion

- **NEXT-03**: User can contribute community examples and failure cases through the product workflow
- **NEXT-04**: User can reuse parser corrections across more than one local session or machine
- **NEXT-05**: User can use the parser from environments outside the demo page, such as editor tools or browser extensions

## Out of Scope

| Feature | Reason |
|---------|--------|
| General-purpose translation | Conflicts with the white-box parser positioning |
| English learning curriculum | Not the product problem being solved |
| Casual conversation parsing | Outside the target document domain for v0.1 |
| Full-document summarization | Too broad before sentence-level quality is stable |
| Mobile-first app | Repo launch and local web demo matter more for the first release |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| REPO-01 | Phase 1 | Pending |
| REPO-02 | Phase 1 | Pending |
| PARS-01 | Phase 2 | Complete |
| PARS-02 | Phase 2 | Complete |
| PARS-03 | Phase 2 | Complete |
| PARS-04 | Phase 2 | Complete |
| DEMO-01 | Phase 3 | Complete |
| DEMO-02 | Phase 3 | Complete |
| IR-01 | Phase 4 | Pending |
| IR-02 | Phase 4 | Pending |
| EDIT-01 | Phase 4 | Pending |
| EDIT-02 | Phase 4 | Pending |
| EDIT-03 | Phase 4 | Pending |
| EDIT-04 | Phase 4 | Pending |
| REPO-03 | Phase 5 | Pending |
| COMM-01 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 16 total
- Mapped to phases: 16
- Unmapped: 0

---
*Requirements defined: 2026-04-13*
*Last updated: 2026-04-13 after Phase 03 execution*
