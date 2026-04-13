# Phase 2: Parser Core v0 - Context

**Gathered:** 2026-04-13
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the first deterministic parser core for single-sentence technical English.
This phase covers token/phrase analysis, role tagging, and stable structured JSON output for a small curated sentence set.
It does not include web demo UI, IR rendering, editable correction flow, or broad general-English coverage.

</domain>

<decisions>
## Implementation Decisions

### Runtime and Module Shape
- **D-01:** Implement the parser core as a `TypeScript + Node` pure-function module.
- **D-02:** Keep the Phase 2 surface library-like first: parse functions and fixtures before any UI or server wrapper.
- **D-03:** Favor simple, inspectable functions over framework-heavy structure because the repo is still greenfield.

### Sentence Scope
- **D-04:** v0 only needs the most common technical sentence shapes: imperative setup-guide sentences, simple conditionals, simple sequence relations, and simple purpose phrases.
- **D-05:** The parser should explicitly cover relations such as `before`, `after`, `if`, `when`, `with`, `for`, and `to` when they appear in straightforward technical sentences.
- **D-06:** Defer passive voice, deeply nested clauses, multi-sentence context, and richer dependency semantics to later phases.

### Output Contract
- **D-07:** The primary JSON contract should be an ordered token-or-phrase role list, because that is the most inspectable surface for downstream UI work.
- **D-08:** Add a minimal sentence-level summary object alongside the role list so later phases can derive IR and UI state without reparsing.
- **D-09:** Do not over-design the contract yet; IR-specific structure belongs to Phase 4, not Phase 2.

### Lexicon and Unknown Strategy
- **D-10:** Start with a hand-written seed lexicon and simple deterministic rules.
- **D-11:** Unknown words should fall back cleanly instead of forcing overconfident labels.
- **D-12:** Keep normalization lightweight in v0; avoid broader stemming or synonym expansion in this phase.

### Derived Acceptance Direction
- **D-13:** The README sentence `Initialize the model before training.` should be part of the initial fixture set.
- **D-14:** The initial lexicon should include the verbs, relations, and objects already named in the project materials, such as `install`, `run`, `load`, `create`, `set`, `use`, and `model`, `file`, `server`, `config`, `request`, `response`.

### the agent's Discretion
- Exact file layout for the parser module, fixtures, and helper functions
- Whether phrase grouping is implemented as span objects, grouped tokens, or a similarly simple internal representation, as long as the external JSON contract stays inspectable
- Exact naming of exported parser functions and test fixture files

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Scope and Constraints
- `.planning/PROJECT.md` - product thesis, scope guardrails, and white-box principle
- `.planning/REQUIREMENTS.md` - `PARS-01`, `PARS-02`, `PARS-03`, and `PARS-04`
- `.planning/ROADMAP.md` - Phase 2 goal, dependency on Phase 1, and success criteria
- `AGENTS.md` - local execution rules, Chinese communication rule, and simplicity constraints

### Prior Phase Decisions
- `.planning/phases/01-repository-positioning-and-launch-skeleton/01-CONTEXT.md` - locked product positioning and the Phase 1 deferral of parser heuristics, token schema, and sentence handling into Phase 2

### Public Product Surface
- `README.md` - public example sentence, role vocabulary, and JSON/IR framing to stay consistent with
- `README.zh-CN.md` - Chinese companion wording that reinforces the same white-box parser framing

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- No parser implementation exists yet; Phase 2 will define the first product-code conventions
- `README.md` already provides one canonical example sentence and the intended role vocabulary
- `scripts/validation/validate-phase-01.ps1` shows the repo is already comfortable with simple explicit verification scripts

### Established Patterns
- The repo currently favors small, explicit artifacts over large abstractions
- Planning artifacts are committed in narrow, readable steps, so parser work can follow the same pattern
- The public docs already imply a `pnpm`-based JavaScript toolchain, so `TypeScript + Node` fits the visible repo direction

### Integration Points
- Future parser exports need to feed Phase 3 demo panes and Phase 4 IR generation
- The JSON output of this phase becomes the contract that later UI and correction work will consume
- Fixture sentences created here will likely be reused in demo assets and launch examples later

</code_context>

<specifics>
## Specific Ideas

- Keep the parser visibly deterministic: a developer should be able to inspect why a sentence became a set of labeled roles
- Use the README example sentence as the first golden fixture
- Seed the first lexicon from project language already committed in README and roadmap instead of inventing a broader corpus immediately
- Prefer sentence fixtures that look like GitHub setup instructions, API usage steps, and AI tooling docs

</specifics>

<deferred>
## Deferred Ideas

- Passive voice handling
- Broader negation semantics beyond the simplest cases
- Rich dependency modeling beyond straightforward relation tags
- Synonym expansion and stemming-heavy normalization
- Multi-sentence parsing
- IR rendering and user-editable correction flow

</deferred>

---

*Phase: 02-parser-core-v0*
*Context gathered: 2026-04-13*
