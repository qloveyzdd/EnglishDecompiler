# Phase 3: Local Demo v0 - Research

**Researched:** 2026-04-13
**Domain:** Local React/Vite parser demo
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Build the demo as a `Vite + React + TypeScript` single-page app.
- Keep the demo local-first and browser-only; do not introduce a backend or API layer in this phase.
- Reuse the Phase 2 parser directly from `src/index.ts` so the demo is a thin presentation layer over the existing parser contract.
- Use a three-pane desktop layout with source input, token/role view, and JSON output visible side by side.
- On mobile, stack the same three sections vertically instead of switching to tabs.
- Keep the information flow stable and tool-like: input first, parser visualization second, structured output third.
- The initial demo state should open with a blank input area rather than a prefilled example sentence.
- Parsing should be triggered by an explicit action, not by real-time parsing on every keystroke.
- The demo should feel like a bright, clear developer workbench rather than a terminal or hacker-style dark tool.
- The page should look intentional enough that a screenshot or short GIF communicates the product without extra explanation.

### the agent's Discretion
- Exact file layout for the Vite + React app
- Exact role-color palette and pane styling, as long as the overall feel stays bright, clear, and tool-like
- Exact copy interaction details, such as button feedback after copying JSON
- Whether example sentences appear as secondary helper content, as long as the page still opens blank and parsing remains explicit

### Deferred Ideas (OUT OF SCOPE)
- IR rendering
- Editable token-role correction
- Persisted local corrections
- Backend services or public deployment
- Launch packaging and final media production

</user_constraints>

<research_summary>
## Summary

Phase 3 should convert the existing parser library into a browser-only inspection surface, not a second parser implementation. The current repo already has a stable `parseSentence` contract, parser fixtures, and Windows-friendly validation scripts. The standard modern path for this kind of local demo is a Vite + React + TypeScript app, with Tailwind 4 and shadcn layered on top when you want a fast but structured UI baseline.

Official documentation aligns cleanly with the current repo shape. Vite 8's guide still recommends scaffolding or manually wiring a React + TypeScript app and explicitly notes the current Node requirement range. The shadcn Vite guide documents the exact alias, Tailwind plugin, and `shadcn init` flow for an existing Vite project. That means we do not need to invent a custom component system or a bespoke build setup for the demo.

The key implementation recommendation is to keep the parser as the single source of truth and let the React app only manage UI state: textarea value, last successful parse result, example-chip fill behavior, and copy-feedback state. That keeps Phase 3 small, preserves the white-box product story, and leaves Phase 4 room to add IR and editable corrections without rewriting the demo shell.

**Primary recommendation:** Bootstrap a Vite + React + TypeScript app in-place, initialize shadcn against that Vite setup, and build one parser-backed workbench page that uses explicit parse/copy actions plus light interaction tests.
</research_summary>

<standard_stack>
## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `vite` | `8.0.8` | Dev server and production build | Official Vite docs show it as the default modern frontend build tool, with fast HMR and static build output |
| `react` | `19.2.5` | UI rendering and local interaction state | Stable component model for a single interactive page |
| `react-dom` | `19.2.5` | Browser render target | Standard React browser runtime |
| `@vitejs/plugin-react` | `6.0.1` | React transform and Fast Refresh support in Vite | Official Vite React path |
| `shadcn` | `4.2.0` | CLI and component scaffolding | Official Vite install path exists; good fit for a structured but lightweight UI baseline |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `tailwindcss` | `4.2.2` | Utility styling and design tokens | Use for app shell, pane layout, and role-chip styling |
| `@tailwindcss/vite` | `4.2.2` | Tailwind 4 integration for Vite | Use with the current Vite setup instead of older PostCSS-first wiring |
| `lucide-react` | `1.8.0` | Small icon set | Use for parse/copy affordances only if a labeled icon helps |
| `vitest` | `4.1.4` | Unit/component test runner | Use for blank-first, explicit-parse, and copy-flow tests |
| `@testing-library/react` | `16.3.2` | UI rendering assertions | Use for browser-like interaction tests without a full E2E harness |
| `@testing-library/user-event` | `14.6.1` | Simulated user input | Use for typing, clicking parse, clicking examples, and clicking copy |
| `jsdom` | `29.0.2` | DOM environment for Vitest | Needed for component tests in Node |
| `@types/node` | `25.6.0` | Node type support for Vite config and scripts | Required by the shadcn Vite guide for alias-aware `vite.config.ts` |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `Vite + React + TypeScript` | Native HTML + TypeScript | Fewer packages, but worse foundation for Phase 4 UI work and more hand-rolled state/rendering |
| `shadcn` official components | Fully custom CSS + handmade components | Lower dependency count, but higher design drift and slower execution |
| `Vitest + Testing Library` | No UI tests, only manual checks | Faster short-term, but weaker protection for blank-first and explicit-parse contracts |

**Installation:**
```bash
pnpm add react react-dom lucide-react class-variance-authority clsx tailwind-merge tw-animate-css
pnpm add -D vite @vitejs/plugin-react tailwindcss @tailwindcss/vite shadcn vitest @testing-library/react @testing-library/user-event jsdom @types/react @types/react-dom @types/node
pnpm dlx shadcn@latest init -p base-nova -y
```
</standard_stack>

<architecture_patterns>
## Architecture Patterns

### Recommended Project Structure
```text
src/
├─ components/
│  ├─ demo/              # Demo-only panes and helper components
│  └─ ui/                # shadcn generated primitives
├─ lib/
│  ├─ utils.ts           # shadcn cn helper
│  └─ demo.ts            # role maps, JSON formatting, example list
├─ parser/               # Existing parser core (unchanged contract)
├─ App.tsx               # One local demo workbench page
├─ app.css               # Tailwind entry and app-level styles
├─ index.ts              # Existing parser exports
└─ main.tsx              # React entrypoint

tests/
├─ local-demo-v0.test.tsx
└─ setup.ts
```

### Pattern 1: Parser-as-source-of-truth UI
**What:** Import `parseSentence` and parser types from the existing library entrypoint instead of rebuilding parse logic in the app.
**When to use:** Always in this phase. The UI should consume `ParseResult`, not create a separate view model that can drift.
**Example:**
```tsx
// Source: existing repo contract + React/Vite app shell
import { useState } from "react"
import { parseSentence, type ParseResult } from "./index.js"

function App() {
  const [draftInput, setDraftInput] = useState("")
  const [result, setResult] = useState<ParseResult | null>(null)

  function handleParse() {
    const value = draftInput.trim()
    if (!value) return
    setResult(parseSentence(value))
  }
}
```

### Pattern 2: Explicit action, derived output
**What:** Keep the textarea state separate from the last successful parse result, and only update output after an explicit parse action.
**When to use:** For the blank-first, white-box demo contract chosen in `03-CONTEXT.md`.
**Example:**
```tsx
// Source: Phase 3 context + local interaction contract
const [draftInput, setDraftInput] = useState("")
const [result, setResult] = useState<ParseResult | null>(null)

function handleInputChange(nextValue: string) {
  setDraftInput(nextValue)
  if (result !== null) {
    setResult(null)
  }
}
```

### Pattern 3: Vite alias + Tailwind 4 + shadcn official path
**What:** Follow the official Vite + shadcn integration path: add Tailwind through `@tailwindcss/vite`, configure the `@` alias in TypeScript and Vite, then run `shadcn init`.
**When to use:** During Phase 3 bootstrap before adding demo primitives such as `button`, `card`, `textarea`, `badge`, `scroll-area`, and `separator`.
**Example:**
```ts
// Source: https://ui.shadcn.com/docs/installation/vite
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

### Anti-Patterns to Avoid
- **Live-parse on every keystroke:** Conflicts with the explicit parse decision and makes later correction states harder to reason about
- **Duplicating parser role strings in multiple files:** Use imported `ParseRole` and central role metadata helpers instead
- **Rendering fake sample output on first load:** Violates the blank-first contract and weakens the white-box story
- **Turning the page into a marketing hero:** The screen should feel like an inspection tool, not a landing page
</architecture_patterns>

<dont_hand_roll>
## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Component primitives | Custom button/card/textarea primitives | `shadcn` official components | Faster delivery and less styling drift in Phase 3/4 |
| Frontend build pipeline | Manual esbuild script or ad-hoc HTML loader | `Vite` | HMR, static builds, and plugin ecosystem are already solved |
| App-wide store | Global custom store for one screen | Local React state | Phase 3 only needs a handful of local UI states |
| Clipboard abstraction | Large custom clipboard service | `navigator.clipboard.writeText` + small fallback state | Simpler and enough for a single copy action |
| JSON renderer | Fancy tree viewer | `JSON.stringify(result, null, 2)` in a code surface | The product value is the parse result, not a complex inspector widget |

**Key insight:** Phase 3 is a local demo, not a platform. The fastest good result comes from reusing the parser contract and standard UI tooling, not from inventing extra infrastructure.
</dont_hand_roll>

<common_pitfalls>
## Common Pitfalls

### Pitfall 1: tsconfig drift between parser and app
**What goes wrong:** The parser library still type-checks, but the Vite app or config breaks because the alias, JSX, or Node config is incomplete.
**Why it happens:** The repo started as a parser-only TypeScript package, so Phase 3 adds a second TypeScript target.
**How to avoid:** Keep `tsconfig.json` as the parser contract source, add `tsconfig.app.json` and `tsconfig.node.json`, and make `check` run all three.
**Warning signs:** `vite.config.ts` cannot resolve `@`, TSX files type-check in the editor but fail in CI, or parser build starts including app-only files.

### Pitfall 2: stale output beside new input
**What goes wrong:** A user edits the sentence after a successful parse, but the token and JSON panes still show the old result.
**Why it happens:** The UI stores the last parse result but never clears it when the input changes.
**How to avoid:** Clear the stored result and copy state on every post-parse input edit. Require the explicit parse action again.
**Warning signs:** Input text no longer matches the visible token chips or JSON object.

### Pitfall 3: example helpers breaking the blank-first contract
**What goes wrong:** Example chips auto-run parse or the page loads with a fake default result.
**Why it happens:** The demo tries too hard to self-demonstrate.
**How to avoid:** Keep example content secondary. Clicking an example may fill the textarea only; parsing still requires the explicit button.
**Warning signs:** The screen shows tokens or JSON before the user ever triggers parsing.
</common_pitfalls>

<code_examples>
## Code Examples

Verified patterns from official sources:

### Vite project creation
```bash
# Source: https://vite.dev/guide/
pnpm create vite
```

### Vite + shadcn existing-project wiring
```ts
// Source: https://ui.shadcn.com/docs/installation/vite
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

### TypeScript alias for shadcn/Vite
```json
// Source: https://ui.shadcn.com/docs/installation/vite
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```
</code_examples>

<sota_updates>
## State of the Art (2024-2025)

What's changed recently:

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Vite 5/6-era setup | Vite `8.0.8` guide | 2025 | Current docs explicitly require newer Node versions and keep `create vite` as the standard starting path |
| Tailwind via older PostCSS-first Vite setup | `@tailwindcss/vite` plugin | Tailwind 4 era | Cleaner Vite integration and aligns with the current shadcn Vite guide |
| Handwritten component library assumptions | `shadcn` preset-driven setup | Current shadcn docs | Faster path to a consistent UI baseline for greenfield React apps |

**New tools/patterns to consider:**
- `shadcn` preset flow (`base-nova` here): makes the design baseline concrete before implementation starts
- React 19 + Vite 8: stable enough for a small local tool, with no need for heavier app frameworks

**Deprecated/outdated:**
- Treating a Vite app as a single `tsconfig.json` without app/node separation in mixed toolchains
- Building this phase with ad-hoc HTML/CSS only, then retrofitting React in Phase 4
</sota_updates>

<validation_architecture>
## Validation Architecture

Phase 3 should validate the local demo at three levels:

1. **Type/build contract**
   - `pnpm check`
   - `pnpm build`
   - Confirms the parser package and the Vite app both type-check and bundle together

2. **UI interaction contract**
   - `pnpm test`
   - Covers blank initial state, explicit parse action, example fill-only behavior, stale-output reset, and copy-JSON flow

3. **One-command Windows entrypoint**
   - `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-03.ps1`
   - Runs install/check/test/build in one predictable path, matching prior phases

This phase does not need browser automation. Component tests plus a full production build are enough to protect `DEMO-01` and `DEMO-02`.
</validation_architecture>

<open_questions>
## Open Questions

1. **Should `tsconfig.json` remain the parser build config or become a references-only root file?**
   - What we know: the current parser build depends on `tsconfig.json` directly
   - What's unclear: whether execution should preserve that contract or refactor to a references root
   - Recommendation: preserve `tsconfig.json` as the parser config in Phase 3 and add `tsconfig.app.json` / `tsconfig.node.json` alongside it

2. **How much shadcn should be generated in Phase 3?**
   - What we know: the approved UI-SPEC only needs a small set of primitives
   - What's unclear: whether execution should generate extra components “just in case”
   - Recommendation: add only the primitives already named in `03-UI-SPEC.md` and avoid speculative component generation
</open_questions>

<sources>
## Sources

### Primary (HIGH confidence)
- [Vite Getting Started](https://vite.dev/guide/) - checked current Vite version, Node compatibility note, and standard `create vite` flow
- [shadcn Vite installation](https://ui.shadcn.com/docs/installation/vite) - checked Tailwind 4 plugin wiring, TypeScript alias setup, and CLI initialization flow
- `npm view vite version` - confirmed `8.0.8`
- `npm view react version` / `npm view react-dom version` - confirmed `19.2.5`
- `npm view @vitejs/plugin-react version` - confirmed `6.0.1`
- `npm view tailwindcss version` / `npm view @tailwindcss/vite version` - confirmed `4.2.2`
- `npm view vitest version` - confirmed `4.1.4`

### Secondary (MEDIUM confidence)
- `npm view shadcn version` - confirmed current published CLI package version `4.2.0`
- `npm view @testing-library/react version` / `npm view @testing-library/user-event version` / `npm view jsdom version` - confirmed current test stack versions

### Tertiary (LOW confidence - needs validation)
- None
</sources>

<metadata>
## Metadata

**Research scope:**
- Core technology: Vite + React + TypeScript local demo
- Ecosystem: shadcn, Tailwind 4, Testing Library, Vitest
- Patterns: parser-backed workbench layout, explicit parse flow, blank-first interaction
- Pitfalls: config drift, stale output, demo-state confusion

**Confidence breakdown:**
- Standard stack: HIGH - based on official docs and current npm registry checks
- Architecture: HIGH - driven by current repo constraints plus official Vite/shadcn integration path
- Pitfalls: HIGH - directly inferred from the locked UX decisions for this phase
- Code examples: HIGH - sourced from official docs and the repo’s existing parser contract

**Research date:** 2026-04-13
**Valid until:** 2026-05-13
</metadata>

---

*Phase: 03-local-demo-v0*
*Research completed: 2026-04-13*
*Ready for planning: yes*
