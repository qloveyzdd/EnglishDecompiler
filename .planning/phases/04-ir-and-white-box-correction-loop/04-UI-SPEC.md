---
phase: 04
slug: ir-and-white-box-correction-loop
status: approved
shadcn_initialized: true
preset: base-nova
created: 2026-04-13
reviewed_at: 2026-04-13
---

# Phase 04 - UI Design Contract

> Visual and interaction contract for the IR and white-box correction loop. This phase must make mistakes fixable without breaking the existing workbench rhythm.

---

## Design System

| Property | Value |
|----------|-------|
| Tool | shadcn |
| Preset | base-nova |
| Component library | base-ui |
| Icon library | lucide-react |
| Font | IBM Plex Sans + IBM Plex Mono |

Source:
- `shadcn + base-nova` remains the approved baseline from Phase 3.
- `shadcn_initialized: true` comes from the existing `components.json` and generated `src/components/ui/*` files.

---

## Spacing Scale

Declared values (must be multiples of 4):

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Small inline badges, token status dots |
| sm | 8px | Tight chip and menu padding |
| md | 16px | Default control spacing, stacked output gap |
| lg | 24px | Pane gap, section padding |
| xl | 32px | Page padding, major card padding |
| 2xl | 48px | Large section separation |

Exceptions: 44px minimum hit area for interactive token chips and role-picker actions.

Source:
- Phase 4 keeps the same workbench family as Phase 3, so spacing stays compatible with the existing shell.

---

## Typography

| Role | Size | Weight | Line Height |
|------|------|--------|-------------|
| Body | 16px | 400 | 1.5 |
| Label | 14px | 600 | 1.4 |
| Heading | 20px | 600 | 1.2 |
| Display | 28px | 600 | 1.1 |
| Code Caption | 12px | 600 | 1.3 |

Source:
- Existing demo readability remains the baseline.
- Code-like IR adds `Code Caption` as a dedicated small heading style for stacked output sections.

---

## Color

| Role | Value | Usage |
|------|-------|-------|
| Dominant (60%) | `#F4F7FB` | Page background and canvas |
| Secondary (30%) | `#FFFFFF` | Pane shells, menus, detail trays |
| Accent (10%) | `#0F6CBD` | Selection ring, active token, saved-state badge |
| IR Surface | `#0F172A` | JSON and IR code surfaces |
| Destructive | `#C94A3A` | Errors only |

Additional rules:
- Keep role colors from Phase 3 for semantic spans.
- Selected tokens add an accent ring and subtle shadow, but do not lose their role tint.
- Manual override state may use an accent badge, not a new semantic role color.

Source:
- Phase 4 keeps the Phase 3 bright workbench palette and adds one dedicated code-surface color for stacked outputs.

---

## Copywriting Contract

| Element | Copy |
|---------|------|
| Left pane title | Source Sentence |
| Center pane title | Token Roles |
| Right pane title | Structured Outputs |
| Top output heading | Structured JSON |
| Bottom output heading | Code-like IR |
| Token helper | Click a token to inspect or correct it. |
| Role menu heading | Change role |
| Reason heading | Why this role |
| Persistence badge | Saved locally |
| Persistence helper | Corrections for this sentence stay in this browser only. |
| Empty IR state | Parse a sentence to generate IR. |
| Manual override reason prefix | Manual override |

Source:
- Titles and workbench framing inherit from Phase 3.
- New strings come directly from Phase 4 decisions around inspectability, correction, and local persistence.

---

## Layout and Focal Point

| Area | Contract |
|------|----------|
| Page width | Max content width `1520px`; center aligned |
| Desktop layout | Keep the existing 3-pane row with columns `1.05fr 1.1fr 1fr` and `24px` gap |
| Narrow layout | Stack in this exact order: input -> token roles -> structured outputs |
| Focal point | The token pane remains the focal point because correction happens there |
| Right pane structure | One pane shell containing two stacked code sections: JSON first, IR second |
| Output split | Desktop uses a balanced vertical split; each code section gets its own scrollable surface |
| Detail tray | The selected-token explanation area sits inside the token pane, above the token scroll region |

Source:
- Phase 4 explicitly keeps the Phase 3 three-pane contract and adds stacked outputs instead of a fourth column.

---

## Pane Contract

| Pane | Required Elements | Behavior |
|------|-------------------|----------|
| Source Sentence | Existing textarea, helper text, example chips, parse action | Keeps the blank-first, explicit-parse contract from Phase 3. |
| Token Roles | Role legend, summary strip, token chip grid, selected-token detail tray, compact role menu | Clicking a token selects it. Hover may preview reason, but selection is the durable state for correction. |
| Structured Outputs | Copy JSON button, `Structured JSON` section, `Code-like IR` section | JSON and IR always regenerate from the same corrected parse state. |

Additional behavior:
- The copy button still copies only the JSON section, not IR.
- The token pane shows a subtle persistence badge when any saved override is active for the current sentence.
- The selected-token detail tray must expose the token text, current role, `rule id`, and short reason.

---

## Token Editing Contract

| Element | Contract |
|---------|----------|
| Interactive chip | Every parsed token is clickable and keeps its original order |
| Selected state | Selected token uses accent ring + role tint, with `aria-pressed=true` |
| Role menu | Compact menu with exactly six role choices: `action`, `object`, `relation`, `condition`, `purpose`, `unknown` |
| Edit latency | Choosing a new role updates visible token state, JSON, and IR immediately |
| Manual provenance | If a token is manually changed, the detail tray must say it is a manual override |

Non-goals:
- No drag-and-drop token editing
- No multi-token batch editing
- No hidden keyboard-only command palette in this phase

Source:
- Directly locked by Phase 4 decisions `D-04`, `D-05`, and `D-06`.

---

## Explanation Contract

| State | Contract |
|-------|----------|
| No token selected | Show a compact helper telling the user to click a token |
| Token selected | Show token text, current role, `rule id`, and one short reason sentence |
| Manual override | Reason starts with `Manual override` and names the previous role |
| Parser-owned role | Reason refers to the matched marker, lexicon rule, or fallback |

Rules:
- Explanations are contextual, not always-on.
- Keep them factual and short; no tutorial paragraphs.
- `rule id` must always remain visible when a token is selected.

Source:
- Directly locked by Phase 4 decisions `D-07`, `D-08`, and `D-09`.

---

## IR Rendering Contract

IR should feel code-like, readable, and narrow in scope.

Rules:
- Base action renders as a call-like statement such as `initialize(model)`.
- Condition renders as a block-like prefix such as `if server uses config:`.
- Sequence renders as a wrapper such as `before(training):`.
- Dependency may render inline, for example `run(server, with=config)`.
- Purpose may render as a trailing intent line or inline annotation, as long as it remains code-like and deterministic.

Constraints:
- Do not invent a general programming language.
- Do not hide missing semantics; if the parser lacks detail, the IR should stay simple rather than pretend certainty.

Source:
- Phase 4 keeps the README's Python-like IR direction and the Phase 2 parser's explicit scope limits.

---

## Persistence Contract

| Behavior | Contract |
|----------|----------|
| Save scope | Corrections are stored by sentence plus token index only |
| Storage medium | Browser `localStorage` only |
| Restore point | Corrections are restored when the same sentence is parsed again after refresh |
| Cross-sentence reuse | Not allowed in this phase |
| Clear on new draft | Editing the textarea still clears visible outputs until a new parse succeeds |

Source:
- Directly locked by Phase 4 decisions `D-10`, `D-11`, and `D-12`.

---

## Interaction States

| State | Contract |
|-------|----------|
| Initial | Same blank-first state as Phase 3; no token selected, no JSON, no IR |
| Parse success (no saved overrides) | Token pane becomes interactive; JSON and IR appear together |
| Parse success (saved overrides found) | Corrected token roles, JSON, and IR render immediately, plus a `Saved locally` badge |
| Token selected | Detail tray opens and role menu becomes available |
| Manual correction applied | Selected token updates immediately; JSON and IR re-render from corrected state |
| Input edited after success | Clear token detail, JSON, and IR immediately; require a new explicit parse |
| Refresh then reparse same sentence | Saved overrides reappear without user needing to reapply them |

---

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| shadcn official | existing `button`, `badge`, `card`, `scroll-area`, `separator`, `textarea`; optional `popover` only if needed | official-only baseline |
| third-party | none | no third-party registry allowed in this phase |

---

## Source Notes

| Source | Decisions Used |
|--------|----------------|
| `.planning/ROADMAP.md` | Phase 4 goal and success criteria |
| `.planning/REQUIREMENTS.md` | `IR-01`, `IR-02`, `EDIT-01` to `EDIT-04` |
| `.planning/phases/04-ir-and-white-box-correction-loop/04-CONTEXT.md` | stacked outputs, token menu, contextual reason, sentence-scoped persistence |
| `.planning/phases/03-local-demo-v0/03-UI-SPEC.md` | inherited workbench layout, palette, and shell rhythm |
| `src/App.tsx` | current three-pane structure and explicit parse flow |
| `src/components/demo/token-pane.tsx` | token-pane focal-point integration path |
| `src/components/demo/json-pane.tsx` | existing code-surface treatment for JSON |

---

## Checker Sign-Off

- [x] Dimension 1 Copywriting: PASS
- [x] Dimension 2 Visuals: PASS
- [x] Dimension 3 Color: PASS
- [x] Dimension 4 Typography: PASS
- [x] Dimension 5 Spacing: PASS
- [x] Dimension 6 Registry Safety: PASS

**Approval:** approved 2026-04-13
