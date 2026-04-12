# Phase 1: Repository Positioning and Launch Skeleton - Context

**Gathered:** 2026-04-13
**Status:** Ready for planning

<domain>
## Phase Boundary

Make the repository immediately legible as a serious white-box parser project.
This phase covers the public-facing repository identity, homepage messaging, entry flow, community health files, metadata direction, and launch skeleton.
It does not include parser implementation, demo implementation, or IR/correction behavior.

</domain>

<decisions>
## Implementation Decisions

### Positioning and Messaging
- **D-01:** Use `Decompile English technical text into actions, objects, and control flow — so developers can inspect it instead of blindly translating it.` as the primary homepage positioning line.
- **D-02:** Use `A white-box parser for English technical docs.` as the GitHub About short description.
- **D-03:** Treat `Parse technical English like code.` as secondary copy for social preview, section subtitles, or launch copy, not as the primary homepage line.
- **D-04:** Keep `Translation gives you an answer. Parsing gives you control.` as the key differentiator line in README and launch messaging.

### README Language Strategy
- **D-05:** Keep `README.md` English-first for the main public entry surface.
- **D-06:** Provide a separate Chinese companion document linked from the main README rather than making the primary README bilingual.
- **D-07:** Make the Chinese entry visible near the top of the main README so Chinese readers can find it immediately.

### Media and Entry Flow
- **D-08:** Keep the `./assets/hero.gif` path placeholder in the README for now.
- **D-09:** The placeholder is an intentional near-term asset slot, not a reason to weaken the rest of the first screen.
- **D-10:** The first screen must still stand on its own without the final asset: what it is, what it is not, why it matters, example, and quick start should all remain clear.

### Licensing and Community Skeleton
- **D-11:** Use `Apache-2.0` as the project license.
- **D-12:** `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md` should use a standard open-source level of detail suitable for real outside contributors, not placeholder-only stubs.
- **D-13:** Phase 1 should explicitly satisfy the GitHub community-profile basics with README, LICENSE, CONTRIBUTING, and CODE_OF_CONDUCT present and linked.

### Metadata and Launch Readiness
- **D-14:** Use this topic set for repository discoverability: `developer-tools`, `nlp`, `english-parser`, `technical-documentation`, `translation`, `llm`, `language-tools`, `documentation-tools`.
- **D-15:** Social preview direction should communicate exactly three things: project name, `Parse technical English like code`, and a visual path from sentence -> structure -> IR.
- **D-16:** Phase 1 should leave the repo ready for launch-oriented issue categories: `bug`, `parser examples wanted`, and `good first issue`.

### the agent's Discretion
- Exact filename and path for the Chinese companion document, as long as it is linked prominently from the main README
- Exact balance of headline, subheadline, and section transition wording inside README
- Exact template source and structure details for `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md`, as long as they remain standard and contributor-friendly
- Exact formatting of the placeholder media block around `hero.gif`

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project scope and positioning
- `.planning/PROJECT.md` - product positioning, core value, and out-of-scope boundaries
- `.planning/REQUIREMENTS.md` - `REPO-01`, `REPO-02`, `REPO-03`, and `COMM-01`
- `.planning/ROADMAP.md` - Phase 1 goal, boundary, and success criteria
- `AGENTS.md` - local execution rules, language preference, and simplicity constraints

### User-provided launch direction
- No external spec files yet - the repository-entry requirements for this phase are fully captured in the decisions above

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- No product code or frontend assets exist yet; the repo is still greenfield
- Existing `.planning` artifacts already define the product message and can anchor repository-facing copy

### Established Patterns
- Repository planning is already being committed in small, explicit steps, so Phase 1 can preserve that same intentional structure
- There is no existing implementation pattern that constrains repository-facing docs yet

### Integration Points
- `README.md`
- `LICENSE`
- `CONTRIBUTING.md`
- `CODE_OF_CONDUCT.md`
- Repository metadata/settings such as About text, topics, and social preview
- Optional placeholder media path at `assets/hero.gif`

</code_context>

<specifics>
## Specific Ideas

- Use the long positioning line on the homepage and the short line in GitHub About
- Keep the README first screen close to the user-drafted structure: what it is, why it exists, what it does, example, quick start, status
- Keep the repo publicly English-first while still giving Chinese readers a clear companion path
- Use launch messaging that emphasizes inspectability and control rather than "AI is powerful"

</specifics>

<deferred>
## Deferred Ideas

- Final GIF, screenshots, and social preview production belong to later launch work even though the direction is already decided here
- Parser heuristics, token schema, and sentence handling belong to Phase 2
- Demo layout implementation belongs to Phase 3
- IR rendering and correction mechanics belong to Phase 4

</deferred>

---

*Phase: 01-repository-positioning-and-launch-skeleton*
*Context gathered: 2026-04-13*
