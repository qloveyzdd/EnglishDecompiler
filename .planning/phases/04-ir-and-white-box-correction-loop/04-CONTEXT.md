# Phase 4: IR and White-Box Correction Loop - Context

**Gathered:** 2026-04-13
**Status:** Ready for planning

<domain>
## Phase Boundary

Extend the existing local demo into an editable reasoning surface.
This phase adds a code-like IR view, in-place token role correction, short inspectable explanations for role assignment, and local persistence for corrections.
It stays inside the current browser-only single-sentence demo and does not expand parser scope to long passages, multi-sentence parsing, or backend sync.

</domain>

<decisions>
## Implementation Decisions

### Output Surface
- **D-01:** Keep the existing three-pane workbench instead of introducing a fourth pane.
- **D-02:** The right output pane should show both `JSON` and `IR` stacked vertically at the same time.
- **D-03:** The main workflow remains `Source Sentence -> Token Roles -> Outputs`, with `IR` treated as a sibling output to `JSON`, not a replacement.

### Token Role Editing
- **D-04:** Users should edit a token role by clicking the token and choosing from a compact role menu.
- **D-05:** Editing stays in the token pane itself; do not add a separate inspector/editor panel in this phase.
- **D-06:** The interaction should feel lightweight and repair-oriented, so fixing a wrong role is only one click away from the visible parse output.

### Explainability
- **D-07:** When a token is selected or hovered, the interface should show a short explanation plus the current `rule id`.
- **D-08:** Explanations should stay terse and inspectable, closer to a parser/debug surface than a tutorial.
- **D-09:** Do not render always-on verbose explanations on every token chip; reveal them contextually.

### Local Persistence
- **D-10:** Persist corrections in `localStorage` using the original sentence plus token index as the key scope.
- **D-11:** Persistence is browser-local only in this phase; no sync, export, or cross-device reuse.
- **D-12:** Do not promote a single correction into a global lexicon override yet; the saved correction applies only to the same sentence/token position.

### Scope Guardrails
- **D-13:** Phase 4 should improve inspectability and fixability for the existing single-sentence parser, not broaden parser coverage.
- **D-14:** The Phase 3 UAT issue around long, multi-sentence explanatory text remains deferred parser work, not something to solve through the correction UI alone.
- **D-15:** Keep the README's Python-like IR direction unless implementation research finds a clearly better code-like notation that preserves the same readability.

### the agent's Discretion
- Exact IR syntax details, as long as sequence, condition, purpose, and dependency stay easy to read as code-like structure
- Exact menu mechanics for role selection, such as popover, dropdown, or inline floating menu, as long as editing remains compact and in-place
- Exact presentation of contextual explanations, such as hover card vs selected-token detail row, as long as the explanation includes a short reason and `rule id`
- Exact `localStorage` schema and hydration timing, as long as persistence remains sentence-plus-token scoped

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase scope and locked decisions
- `.planning/PROJECT.md` - product thesis, white-box principle, and current scope guardrails
- `.planning/REQUIREMENTS.md` - `IR-01`, `IR-02`, `EDIT-01`, `EDIT-02`, `EDIT-03`, and `EDIT-04`
- `.planning/ROADMAP.md` - Phase 4 goal, dependency on Phase 3, and success criteria
- `AGENTS.md` - local execution rules, simplicity constraints, and Chinese communication rule

### Prior phase contracts
- `.planning/phases/02-parser-core-v0/02-CONTEXT.md` - parser scope limits and stable parse contract decisions
- `.planning/phases/03-local-demo-v0/03-CONTEXT.md` - locked three-pane workbench, explicit parse trigger, and visual direction
- `.planning/phases/03-local-demo-v0/03-UI-SPEC.md` - current layout, role-color system, pane behavior, and shadcn baseline
- `.planning/phases/03-local-demo-v0/03-UAT.md` - confirmed demo behavior plus the parser scope gap that must stay out of Phase 4 scope

### Existing code surface
- `src/App.tsx` - current three-pane workbench structure and parse/copy interaction flow
- `src/parser/types.ts` - stable `ParseResult`, `ParseSpan`, and summary contract that IR/edit behavior builds on
- `src/parser/parser.ts` - current deterministic parse flow and summary-building logic
- `src/lib/demo.ts` - shared role metadata, example set, and JSON formatting helpers already used by the demo
- `components.json` - approved `shadcn / base-nova` design-system baseline

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/App.tsx`: already provides the page shell, parse trigger, input lifecycle, and copy state handling that Phase 4 should extend rather than replace
- `src/components/demo/pane-shell.tsx`: reusable pane container for keeping the existing workbench rhythm consistent
- `src/components/demo/token-pane.tsx`: current token rendering surface that can become the editing and explanation surface
- `src/components/demo/json-pane.tsx`: existing output pane logic that can stay as the JSON half of the stacked output area
- `src/lib/demo.ts`: central role metadata and formatter helpers that should remain the source of truth for role labels and tones

### Established Patterns
- The app is browser-only and local-first, so persistence should stay in browser storage rather than introducing services
- The current demo is explicit-action driven: parse on button click, clear stale output on edit, copy exactly what is visible
- The UI already uses bright card-like panes with `shadcn / base-nova`, so Phase 4 should add capability without changing the visual language
- Parser output currently flows from `parseSentence()` into a plain `ParseResult`, so edit and IR layers should build on top of that contract instead of replacing it

### Integration Points
- `src/App.tsx` will likely own the corrected parse state and persistence hydration
- `src/components/demo/token-pane.tsx` is the natural place for token selection, role editing, and rule explanation UI
- The current JSON output area can expand into a stacked `JSON + IR` output surface with minimal layout churn
- `src/parser/types.ts` may need lightweight extension to support editable spans and IR-friendly metadata without breaking the existing parse contract

</code_context>

<specifics>
## Specific Ideas

- Keep the correction loop feeling like a debugger for language, not a form-heavy data editor
- Prefer Python-like IR readability because it matches the public examples already shown in the repo
- Show the parser's reasoning in short, factual language such as matched marker or lexicon rule, not fuzzy prose
- Make the persistence behavior intentionally narrow so Phase 4 feels fixable without pretending to be a learned personalization system

</specifics>

<deferred>
## Deferred Ideas

- Multi-sentence or paragraph parsing improvements
- Global correction reuse across different sentences or projects
- Cross-device or exportable correction state
- Separate inspector panel or four-pane layout experiments

</deferred>

---

*Phase: 04-ir-and-white-box-correction-loop*
*Context gathered: 2026-04-13*
