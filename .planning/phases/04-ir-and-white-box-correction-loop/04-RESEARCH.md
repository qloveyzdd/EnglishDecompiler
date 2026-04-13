# Phase 4: IR and White-Box Correction Loop - Research

**Researched:** 2026-04-13
**Domain:** Editable parser workbench on top of the existing local demo
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Keep the existing three-pane workbench instead of introducing a fourth pane.
- Show `JSON` and `IR` stacked in the right output pane at the same time.
- Let users edit token roles by clicking a token and choosing from a compact role menu.
- Show a short explanation plus `rule id` when a token is selected or hovered.
- Persist corrections in `localStorage` by sentence plus token index only.
- Keep Phase 4 inside the existing browser-only single-sentence demo.
- Do not broaden parser scope to long passages or multi-sentence parsing in this phase.
- Keep the README's Python-like IR direction unless research finds a clearly better code-like notation.

### the agent's Discretion
- Exact IR syntax details
- Exact role-menu presentation mechanics
- Exact explanation surface
- Exact `localStorage` schema and hydration timing

### Deferred Ideas (OUT OF SCOPE)
- Multi-sentence parsing
- Global correction reuse across different sentences
- Cross-device sync or export
- Four-pane layouts or a separate inspector screen

</user_constraints>

<research_summary>
## Summary

Phase 4 should not rewrite the parser or invent a second parsing pipeline. The repo already has the right raw ingredients: `ParseSpan` carries `role`, `rule`, and `kind`; the browser workbench is already stable; and Phase 3 proved that blank-first, explicit parse, and JSON copy behavior are working. The safest next step is to add a thin correction layer above `parseSentence()`, then generate both corrected JSON and IR from that same derived state.

The main architectural recommendation is to separate three concerns cleanly:

1. **Parser output stays read-only** - `parseSentence()` still returns the original deterministic result.
2. **Correction state stays local and narrow** - manual overrides are stored separately and keyed by sentence plus token index.
3. **All visible outputs derive from one corrected result** - token chips, summary, JSON, and IR must all read from the same corrected spans so the UI never tells two different stories.

That gives the product what Phase 4 actually promises: not "better parsing", but "inspectable and fixable parsing". It also avoids scope creep into parser expansion, online sync, or a complicated learned preference system.

**Primary recommendation:** extract summary rebuilding into a reusable helper, add a correction overlay plus sentence-scoped storage helpers, then wire the React UI so token edits immediately regenerate both JSON and IR from the same corrected result.
</research_summary>

<current_codebase>
## Current Codebase Findings

### What Already Exists
- `src/App.tsx` already owns the local demo state machine: draft input, last parse result, stale-output clearing, and copy feedback.
- `src/parser/types.ts` already exposes `ParseSpan.role`, `ParseSpan.rule`, and `ParseSpan.kind`, which are enough to power explanation and IR rendering without new backend data.
- `src/parser/parser.ts` already builds `summary` from spans, but that logic is private to the parser file right now.
- `src/components/demo/token-pane.tsx` is already the natural focal point for token selection and correction.
- `src/components/demo/json-pane.tsx` already renders the exact visible JSON string inside a code surface.
- `tests/local-demo-v0.test.tsx` already covers blank-first, explicit parse, example fill-only, stale-output clearing, and copy behavior.

### What Is Missing
- No reusable summary builder for corrected spans
- No IR renderer
- No correction overlay model
- No sentence-scoped persistence helper
- No token selection or role editing UI
- No tests for correction or persistence behavior

</current_codebase>

<standard_stack>
## Standard Stack

The repo already contains the right stack for this phase:

### Core
| Tool | Role | Why it still fits |
|------|------|-------------------|
| React | UI state and interaction flow | The app already uses local React state and does not need a global store |
| shadcn / base-nova | Visual primitives | Keeps Phase 4 visually aligned with Phase 3 |
| Browser `localStorage` | Local persistence | Exactly matches the sentence-scoped persistence requirement |
| Vitest + Testing Library | Interaction coverage | Already used for the current demo shell |

### Recommended Additions
| Addition | Purpose | Recommendation |
|----------|---------|----------------|
| Reusable summary helper | Rebuild `summary` from corrected spans | Recommended |
| Correction overlay helper | Apply manual role overrides without mutating raw parser output | Recommended |
| IR renderer helper | Generate code-like IR from corrected parse state | Recommended |
| Small token detail component | Keep explanation and editing close to the token pane | Recommended |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Local correction overlay | Mutating parser internals directly | Simpler short-term, but harder to preserve parser truth vs manual override truth |
| Sentence-scoped `localStorage` | Global token-level memory | Feels smarter, but violates the locked persistence boundary |
| Derived IR helper | Rendering IR inline inside `App.tsx` | Faster to start, but harder to test and easier to let drift from JSON |

</standard_stack>

<architecture_patterns>
## Architecture Patterns

### Pattern 1: Read-only parser + override layer
**What:** Keep `parseSentence()` unchanged as the base truth, then apply user-selected role overrides in a dedicated helper.
**When to use:** Always in this phase.
**Why:** This preserves the original parser rule while still letting the UI expose a corrected result.
**Example shape:**
```ts
type SpanRoleOverride = {
  tokenIndex: number
  role: ParseRole
}

function applyRoleOverrides(result: ParseResult, overrides: SpanRoleOverride[]): ParseResult
```

### Pattern 2: One corrected result feeds all surfaces
**What:** Recompute `summary`, JSON, and IR from the same corrected spans.
**When to use:** After every manual role change and after hydrating saved overrides.
**Why:** Prevents the UI from showing corrected chips while JSON or IR still reflect stale parser output.

### Pattern 3: Summary logic extracted, not duplicated
**What:** Move or extract the existing summary-building logic into a reusable helper such as `summarizeSpans(spans)`.
**When to use:** Before wiring manual overrides into the demo.
**Why:** Manual role changes need the same summary semantics as raw parser output. Copying the logic into demo helpers would drift quickly.

### Pattern 4: Contextual explanation surface
**What:** Keep explanation tied to the selected token, not scattered across every chip.
**When to use:** In the token pane, near the summary strip and token grid.
**Why:** This matches the locked requirement for short, inspectable explanations without flooding the surface.

### Pattern 5: Sentence-scoped persistence boundary
**What:** Save overrides under a key derived from the trimmed parsed sentence, storing token-index-to-role mappings only for that sentence.
**When to use:** On successful manual role changes and on parse hydration.
**Why:** This preserves Phase 4's narrow persistence contract and avoids accidental "learning" across unrelated inputs.

</architecture_patterns>

<dont_hand_roll>
## Don't Hand-Roll

Problems that look simple but already have a clean path:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Global state system | Zustand or custom event bus | Local React state in `App.tsx` | This demo still has one screen and one central workflow |
| Learned correction engine | Global lexicon adaptation | Sentence-scoped override records | Phase 4 promises fixability, not personalization |
| Fancy AST IR | Multi-node compiler pipeline | Small deterministic IR string renderer | The parser data is still shallow; keep the IR honest |
| Always-visible debug text | Per-chip paragraphs | Selected-token detail tray | Keeps the surface inspectable instead of noisy |
| Persistence abstraction library | IndexedDB layer or sync client | `localStorage` helper with one prefix | KISS and matches the current scope |

</dont_hand_roll>

<common_pitfalls>
## Common Pitfalls

### Pitfall 1: corrected chips but stale JSON/IR
**What goes wrong:** The user changes a token role, but only the chip updates while JSON or IR still reflect the old role.
**How to avoid:** Rebuild corrected `ParseResult`, JSON string, and IR string from the same post-override state in one place.

### Pitfall 2: manual override erases parser provenance
**What goes wrong:** After a correction, the UI can no longer show what the parser originally thought or why.
**How to avoid:** Keep the original `rule` visible and annotate manual overrides explicitly instead of replacing parser provenance.

### Pitfall 3: persistence too broad
**What goes wrong:** A correction for one sentence unexpectedly affects another sentence with the same word.
**How to avoid:** Use the sentence plus token index key boundary exactly as locked in context.

### Pitfall 4: IR claims certainty the parser does not have
**What goes wrong:** The IR looks richer than the underlying parse actually supports.
**How to avoid:** Keep IR generation rule-based and minimal. If only a simple call or wrapper can be inferred, emit only that.

### Pitfall 5: explanation surface turns into a wall of text
**What goes wrong:** The UI becomes more about prose than about inspectable structure.
**How to avoid:** Show one short reason sentence plus `rule id`, and only for the selected token.

</common_pitfalls>

<implementation_recommendations>
## Implementation Recommendations

1. Extract the current summary builder out of `src/parser/parser.ts` into a reusable helper module and have `parseSentence()` call it.
2. Add a correction helper that applies role overrides by token index and returns a corrected `ParseResult`.
3. Add a sentence-scoped storage helper with a single prefix, for example `english-decompiler:sentence-corrections`.
4. Add a deterministic IR renderer that prefers simple Python-like wrappers over invented language features.
5. Keep token selection, role menu, and explanation UI in the token pane; keep JSON and IR stacked in the right pane.
6. Extend the current interaction tests rather than replacing them with browser automation.

</implementation_recommendations>

<validation_architecture>
## Validation Architecture

Phase 4 should validate at three layers:

1. **Pure helper correctness**
   - Unit tests for summary rebuilding, override application, IR rendering, and storage serialization.

2. **UI interaction correctness**
   - Component tests for token selection, role reassignment, JSON/IR regeneration, and persistence across rerender.

3. **One-command local verification**
   - `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-04.ps1`
   - Runs `pnpm install`, `pnpm check`, `pnpm test`, and `pnpm build`

This phase still does not need full browser automation. The interaction surface is contained enough for Vitest + Testing Library.
</validation_architecture>

<open_questions>
## Open Questions

1. **Should summary rebuilding stay inside parser modules or move to demo helpers?**
   - Recommendation: keep it alongside parser code and export it, so corrected UI state uses the exact same summary semantics as raw parser output.

2. **Should the role menu use a generated shadcn popover or a small local anchored menu?**
   - Recommendation: leave that to execution-time discretion as long as the result stays compact, in-place, and accessible.

</open_questions>

<sources>
## Sources

### Primary (HIGH confidence)
- `.planning/phases/04-ir-and-white-box-correction-loop/04-CONTEXT.md`
- `.planning/phases/03-local-demo-v0/03-UI-SPEC.md`
- `src/App.tsx`
- `src/parser/parser.ts`
- `src/parser/types.ts`
- `src/components/demo/token-pane.tsx`
- `src/components/demo/json-pane.tsx`
- `tests/local-demo-v0.test.tsx`

### Secondary (MEDIUM confidence)
- `src/lib/demo.ts`
- `scripts/validation/validate-phase-03.ps1`
- `components.json`

### Tertiary (LOW confidence - needs validation)
- None

</sources>

<metadata>
## Metadata

**Research scope:**
- Editable parse overlays
- Code-like IR generation from existing parser data
- Sentence-scoped local persistence
- UI integration into the existing three-pane workbench
- Test strategy for correction and persistence flows

**Confidence breakdown:**
- Codebase reuse: HIGH
- Architecture direction: HIGH
- Persistence boundary: HIGH
- IR syntax details: MEDIUM

**Research date:** 2026-04-13
**Valid until:** 2026-05-13
</metadata>

---

*Phase: 04-ir-and-white-box-correction-loop*
*Research completed: 2026-04-13*
*Ready for planning: yes*
