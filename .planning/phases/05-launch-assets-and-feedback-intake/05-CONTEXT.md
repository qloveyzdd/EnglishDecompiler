# Phase 5: Launch Assets and Feedback Intake - Context

**Gathered:** 2026-04-14
**Status:** Ready for planning

<domain>
## Phase Boundary

Turn the current MVP into a launchable open-source package.
This phase covers launch-facing media, public example corpus structure, repository-native feedback intake, and the minimum repo copy needed to support release.
It does not expand parser scope, demo scope, IR behavior, or correction behavior.

</domain>

<decisions>
## Implementation Decisions

### Launch Package Scope
- **D-01:** Phase 5 should ship a minimal publishable asset pack, not an expanded media campaign.
- **D-02:** The required asset set is: one polished GIF, two to three screenshots, one social preview image, and one examples set that visitors can inspect directly in the repo.
- **D-03:** The launch assets should demonstrate the current MVP flow specifically: sentence input -> parser output -> token correction -> updated JSON/IR.

### Example Corpus
- **D-04:** Examples should live in a dedicated repo-level `examples/` directory, not only inside `README.md`.
- **D-05:** The examples corpus should be shaped for reuse by both visitors and contributors, so future parser-example submissions can point to the same structure.
- **D-06:** README examples remain important, but the canonical long-lived corpus should be the `examples/` directory.

### Feedback Intake
- **D-07:** GitHub issues remain the primary feedback path for real-world parser failures.
- **D-08:** Phase 5 should build on the existing issue-template skeleton instead of inventing a separate intake system.
- **D-09:** Public feedback flow should stay centered on `bug`, `parser examples wanted`, and `good first issue`, with parser-example submissions clearly tied to the repo examples corpus.

### Launch Copy Scope
- **D-10:** This phase should only create repository-native launch copy, such as release-facing repo copy, examples guidance, and feedback-entry instructions.
- **D-11:** Do not spend this phase producing channel-specific launch posts for X, Hacker News, Reddit, or Chinese communities as committed repo artifacts.
- **D-12:** Launch copy should keep the previously locked positioning lines and not reframe the product around general AI or translation claims.

### the agent's Discretion
- Exact file names and folder structure inside `examples/` and `assets/`, as long as they stay obvious and maintainable
- Exact sentence selection for screenshots and GIF capture
- Exact structure of repo-native launch copy, as long as it stays minimal and release-oriented
- Exact wording for feedback instructions, as long as it routes contributors into the existing GitHub issue flow

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Product positioning and scope
- `.planning/PROJECT.md` - product thesis, core value, and out-of-scope boundaries
- `.planning/REQUIREMENTS.md` - `REPO-03` and `COMM-01`, plus completed MVP requirements that launch assets must accurately represent
- `.planning/ROADMAP.md` - Phase 5 goal, dependency on Phase 4, and success criteria
- `AGENTS.md` - local execution constraints, simplicity rules, and communication requirements

### Prior launch direction
- `.planning/phases/01-repository-positioning-and-launch-skeleton/01-CONTEXT.md` - locked homepage line, About copy, topics, social preview direction, and issue-category intent
- `README.md` - public English-first repo entry that Phase 5 assets and copy must support
- `README.zh-CN.md` - Chinese companion entry that should remain compatible with launch-facing updates
- `ROADMAP.md` - public roadmap surface already visible to repository visitors

### Existing contribution and feedback surfaces
- `CONTRIBUTING.md` - current contributor guidance and label semantics
- `.github/ISSUE_TEMPLATE/bug_report.md` - current bug intake structure
- `.github/ISSUE_TEMPLATE/parser_example.md` - current parser-example intake structure
- `.github/ISSUE_TEMPLATE/config.yml` - issue entry routing and links

### Current product surface to represent honestly
- `.planning/phases/04-ir-and-white-box-correction-loop/04-02-SUMMARY.md` - current demo capabilities that launch assets should show
- `.planning/phases/04-ir-and-white-box-correction-loop/04-UAT.md` - validated user-visible Phase 4 behaviors
- `.planning/phases/04-ir-and-white-box-correction-loop/04-SECURITY.md` - security-verified Phase 4 boundary and trust surfaces
- `.planning/phases/04-ir-and-white-box-correction-loop/04-VALIDATION.md` - current automated verification coverage

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/App.tsx` and `src/components/demo/*` already provide the live demo surface that screenshots and GIFs can capture
- `assets/hero.gif` already exists as the launch-media placeholder path from Phase 1
- `.github/ISSUE_TEMPLATE/*` already gives Phase 5 a starting point for feedback intake instead of a blank slate
- `README.md`, `README.zh-CN.md`, `ROADMAP.md`, and `CONTRIBUTING.md` are already public repo surfaces that Phase 5 can refine

### Established Patterns
- Public repo surfaces are English-first, with a Chinese companion rather than a merged bilingual README
- The project already routes community interaction through GitHub-native flows, not external forms or chat intake
- The current MVP is sentence-first and demo-first; launch assets should reflect that narrow, honest scope

### Integration Points
- `assets/` for launch GIF, screenshots, and social preview
- `examples/` for the public parser sentence corpus
- `README.md` and `README.zh-CN.md` for launch-facing entry points
- `.github/ISSUE_TEMPLATE/` and `CONTRIBUTING.md` for feedback routing and contribution paths

</code_context>

<specifics>
## Specific Ideas

- Keep `Translation gives you an answer. Parsing gives you control.` as the launch memory hook
- Keep the previously locked social preview direction: project name, `Parse technical English like code`, and a sentence -> structure -> IR path
- The most valuable launch demo moment is still the white-box correction loop: paste a sentence, parse it, change a role, and watch JSON/IR update
- Examples should prioritize real technical-doc style sentences over synthetic marketing copy

</specifics>

<deferred>
## Deferred Ideas

- Channel-specific launch drafts for X, Hacker News, Reddit, V2EX, Jike, Juejin, or other communities
- A larger media kit beyond the minimal publishable pack
- Architecture diagrams or expanded release collateral
- Any parser-scope expansion such as multi-sentence support or more general technical prose coverage

</deferred>

---

*Phase: 05-launch-assets-and-feedback-intake*
*Context gathered: 2026-04-14*
