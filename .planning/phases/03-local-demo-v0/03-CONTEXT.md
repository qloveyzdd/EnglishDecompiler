# Phase 3: Local Demo v0 - Context

**Gathered:** 2026-04-13
**Status:** Ready for planning

<domain>
## Phase Boundary

Build a local web demo that exposes the existing parser through a clear three-pane interface.
This phase covers pasted sentence input, token-role visualization, structured JSON output, and a one-click JSON copy action.
It does not include IR rendering, editable role correction, persistence, backend services, or public deployment.

</domain>

<decisions>
## Implementation Decisions

### Demo Runtime and App Shape
- **D-01:** Build the demo as a `Vite + React + TypeScript` single-page app.
- **D-02:** Keep the demo local-first and browser-only; do not introduce a backend or API layer in this phase.
- **D-03:** Reuse the Phase 2 parser directly from `src/index.ts` so the demo is a thin presentation layer over the existing parser contract.

### Layout and Responsive Structure
- **D-04:** Use a three-pane desktop layout with source input, token/role view, and JSON output visible side by side.
- **D-05:** On mobile, stack the same three sections vertically instead of switching to tabs.
- **D-06:** Keep the information flow stable and tool-like: input first, parser visualization second, structured output third.

### Input and Parse Trigger
- **D-07:** The initial demo state should open with a blank input area rather than a prefilled example sentence.
- **D-08:** Parsing should be triggered by an explicit `Parse` button, not by real-time parsing on every keystroke.
- **D-09:** The blank-first interaction is more important than auto-demo behavior; any example exposure in this phase should stay secondary and must not replace the blank default state.

### Visual Direction
- **D-10:** The demo should feel like a bright, clear developer workbench rather than a terminal or hacker-style dark tool.
- **D-11:** Visual hierarchy should favor fast inspection: readable typography, clear pane separation, and obvious role highlighting.
- **D-12:** The page should look intentional enough that a screenshot or short GIF communicates the product without extra explanation.

### the agent's Discretion
- Exact component/file layout for the Vite + React app
- Exact role-color palette and pane styling, as long as the overall feel stays bright, clear, and tool-like
- Exact copy interaction details, such as button feedback text after copying JSON
- Whether example sentences appear as secondary helper content, as long as the page still opens blank and parsing remains explicit

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase scope and constraints
- `.planning/PROJECT.md` - product thesis, white-box principle, and scope guardrails
- `.planning/REQUIREMENTS.md` - `DEMO-01` and `DEMO-02`, plus neighboring IR/edit requirements that remain out of scope here
- `.planning/ROADMAP.md` - Phase 3 goal, dependency on Phase 2, and success criteria
- `AGENTS.md` - local execution rules, simplicity constraints, and response-language requirements

### Prior phase contracts
- `.planning/phases/02-parser-core-v0/02-CONTEXT.md` - locked parser-core decisions that the demo must preserve
- `src/index.ts` - public parser entrypoint the demo should consume
- `src/parser/types.ts` - stable parse result contract for the UI panes
- `fixtures/parser-core-v0.ts` - canonical example corpus available for demo content and smoke validation

### Public product framing
- `README.md` - public-facing demo promise, example sentence, and screenshot/GIF expectations from the repo surface
- `README.zh-CN.md` - companion framing that reinforces the same white-box parser positioning

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/index.ts`: already exports the parser entrypoint the demo can call directly
- `src/parser/types.ts`: defines the exact shape of spans and summary data the UI can render
- `fixtures/parser-core-v0.ts`: provides a small curated corpus of technical-English examples that can inform demo content

### Established Patterns
- The repo already uses `TypeScript + pnpm`, so a lightweight Vite front end fits the current toolchain
- Existing implementation favors small, explicit files over heavy abstractions
- There is no existing frontend framework, component library, or styling system yet, so Phase 3 sets the initial UI conventions

### Integration Points
- `package.json` will need demo-oriented scripts and frontend dependencies
- The demo should import and render output from `parseSentence` without duplicating parser logic
- Phase 3 output will become the base surface that Phase 4 extends with IR and correction behavior

</code_context>

<specifics>
## Specific Ideas

- Keep the page feeling like an inspectable parsing console, not a marketing landing page
- Preserve the three-pane screenshotability from the original product direction
- Use the existing parser contract as-is instead of inventing a Phase 3-only view model too early
- Favor a bright tool UI with obvious affordances over a dark "decompiler terminal" aesthetic

</specifics>

<deferred>
## Deferred Ideas

- IR rendering belongs to Phase 4
- Editable token-role correction belongs to Phase 4
- Persisted local corrections belong to Phase 4
- Launch assets and broader public-facing demo packaging belong to Phase 5

</deferred>

---

*Phase: 03-local-demo-v0*
*Context gathered: 2026-04-13*
