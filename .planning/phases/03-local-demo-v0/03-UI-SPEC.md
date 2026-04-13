---
phase: 03
slug: local-demo-v0
status: draft
shadcn_initialized: false
preset: base-nova
created: 2026-04-13
---

# Phase 03 - UI Design Contract

> Visual and interaction contract for the local demo surface. This phase must make the parser inspectable, not decorative.

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
- `shadcn + base-nova` comes from direct user instruction for this phase.
- `shadcn_initialized: false` comes from codebase scan: no `components.json`, no React/Vite app, no existing UI system.

---

## Spacing Scale

Declared values (must be multiples of 4):

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Inline chip gaps, tiny badge spacing |
| sm | 8px | Compact chip padding, icon gap |
| md | 16px | Default control spacing, mobile section gap |
| lg | 24px | Desktop pane gap, section padding |
| xl | 32px | Page padding, major card padding |
| 2xl | 48px | Large section break, hero breathing room |
| 3xl | 64px | Desktop page top/bottom spacing |

Exceptions: 44px minimum hit area for icon-only controls and the copy button on touch layouts.

Source:
- No upstream spacing tokens exist in the repo.
- Scale and exception are agent defaults chosen for a bright tool UI.

---

## Typography

| Role | Size | Weight | Line Height |
|------|------|--------|-------------|
| Body | 16px | 400 | 1.5 |
| Label | 14px | 600 | 1.4 |
| Heading | 20px | 600 | 1.2 |
| Display | 28px | 600 | 1.1 |

Source:
- Readability and fast inspection come from `03-CONTEXT.md` decisions `D-10`, `D-11`, `D-12`.
- Exact sizes and weights are agent defaults.

---

## Color

| Role | Value | Usage |
|------|-------|-------|
| Dominant (60%) | `#F4F7FB` | Page background, app canvas, empty-state backdrop |
| Secondary (30%) | `#FFFFFF` | Pane cards, sticky pane headers, example strip |
| Accent (10%) | `#0F6CBD` | Primary parse button, active focus ring, selected example chip, copy-success state |
| Destructive | `#C94A3A` | Destructive actions only |

Accent reserved for: primary `解析句子` button fill, active textarea/pane focus ring, selected example chip outline, copy-success icon/text. Do not use accent as the default color for every token role or secondary button.

Source:
- Bright workbench direction comes from `03-CONTEXT.md` decisions `D-10`, `D-11`, `D-12`.
- Exact palette is an agent default.

---

## Copywriting Contract

| Element | Copy |
|---------|------|
| Primary CTA | 解析句子 |
| Empty state heading | 贴入一句技术英文 |
| Empty state body | 输入一句来自 README、API 文档或安装指南的英文，然后点击「解析句子」。 |
| Error state | 解析失败：这句话暂时超出 v0 规则范围。请改用更短、更直接的技术英文句子后重试。 |
| Copy button default | 复制 JSON |
| Copy success | 已复制 JSON |
| Copy failure | 复制失败，请手动复制 |
| Destructive confirmation | 无：本阶段不提供删除、重置或覆盖确认流程。 |

Source:
- Explicit parse action comes from `03-CONTEXT.md` decisions `D-07`, `D-08`, `D-09`.
- All exact Chinese strings are agent defaults for this phase.

---

## Layout and Focal Point

| Area | Contract |
|------|----------|
| Page width | Max content width `1520px`; center aligned |
| Page padding | Desktop `32px`, mobile `16px` |
| Desktop layout | At `>= 1200px`, use a 3-pane row with columns `1.05fr 1.1fr 1fr` and `24px` gap |
| Narrow layout | Below `1200px`, stack the same 3 sections vertically in this exact order: input -> token view -> JSON |
| Focal point | The center token pane is the visual focal point: strongest border contrast, persistent role legend, and the most visible pane title |
| Pane shell | 16px radius, `1px` border in `#D7DFEA`, soft shadow `0 8px 24px rgba(15, 23, 42, 0.06)` |
| Pane height | Desktop panes target the same visual height; inner content scrolls when needed instead of growing unevenly |

Source:
- Pane count, order, and responsive behavior come from `03-CONTEXT.md` decisions `D-04`, `D-05`, `D-06`.
- Exact measurements are agent defaults.

---

## Pane Contract

| Pane | Required Elements | Behavior |
|------|-------------------|----------|
| 源句输入 | Pane title, one short helper sentence, textarea, example strip, primary parse button | Opens blank by default. Textarea placeholder should be `粘贴一句技术英文，例如：Initialize the model before training.` Parse button stays disabled until trimmed input is non-empty. |
| Token / 角色 | Pane title, role legend, parsed token chips, empty/error state region | Show parsed spans in original order. Each span renders as a color chip with token text first and role label second. Unknown spans stay neutral and visible. |
| 结构化 JSON | Pane title, copy button, monospace JSON viewer, empty/error state region | Render the full `ParseResult` object with 2-space indentation and stable key order: `input`, `spans`, `summary`. Copy action always copies exactly what is visible. |

Additional behavior:
- Pane headers stay visible while pane bodies scroll.
- The copy button lives in the JSON pane header and is disabled until a successful parse exists.
- Example chips fill the textarea but do not auto-run parsing.

Source:
- Phase scope comes from `DEMO-01`, `DEMO-02`, plus `03-CONTEXT.md` decisions `D-03`, `D-08`.
- Exact pane mechanics are agent defaults.

---

## Role Highlight Contract

| Role | Fill | Text / Border | Usage |
|------|------|---------------|-------|
| action | `#DDF4F1` | `#0F766E` | Primary verb-like spans |
| object | `#E7F0FF` | `#0B57D0` | Nouns or targets being acted on |
| relation | `#FFF1D6` | `#A15C00` | `before`, `after`, `with` and similar relation markers |
| condition | `#FFE3EC` | `#B4235D` | `if`, `when` conditional markers and their clause context |
| purpose | `#EDE9FE` | `#6D28D9` | `for`, `to` purpose phrases |
| unknown | `#EEF1F5` | `#4B5563` | Tokens not confidently assigned yet |

Contract:
- Token chips use tinted fills, not solid accent fills.
- Role colors are reserved for parser meaning, not generic button states.
- Chips use `8px` vertical and `12px` horizontal padding with `999px` pill radius.

Source:
- Exact role palette was delegated to the agent in `03-CONTEXT.md`.

---

## Example Content Contract

The page must include secondary example helpers for screenshotability, but the initial input stays blank.

Example set:
1. `Initialize the model before training.`
2. `Run the server with the config.`
3. `If the server uses the config, load the file.`

Contract:
- Example helpers render as secondary outline chips below the textarea.
- Clicking an example writes that sentence into the textarea.
- Clicking an example never bypasses the explicit `解析句子` action.

Source:
- Blank-first rule comes from `03-CONTEXT.md` decisions `D-07`, `D-08`, `D-09`.
- Example sentences come from `fixtures/parser-core-v0.ts`.

---

## Interaction States

| State | Contract |
|-------|----------|
| Initial | Input pane is active and blank. Token and JSON panes show the global empty state. |
| Parse success | Token pane updates first, JSON pane updates at the same user action, and copy button becomes enabled. |
| Input edited after success | Clear token and JSON panes immediately and show `输入已更新，请重新点击「解析句子」。` This avoids stale output beside new text. |
| Parse error | Replace both output panes with the error state. Do not keep stale token or JSON content visible. |
| Copy success | Change button label to `已复制 JSON` for `1500ms`, then revert to `复制 JSON`. |
| Copy failure | Keep the JSON visible and show inline feedback `复制失败，请手动复制`. |

Deliberate non-features for this phase:
- No live parsing on every keystroke.
- No tabs in narrow layouts.
- No destructive reset flow.
- No IR panel and no editable role controls.

Source:
- Explicit parse and no real-time parsing come from `03-CONTEXT.md` decision `D-08`.
- No IR/edit behavior comes from deferred scope in `03-CONTEXT.md`.
- Exact stale-state and copy-feedback behavior are agent defaults.

---

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| shadcn official | planned only: `button`, `card`, `textarea`, `badge`, `scroll-area`, `separator` | official-only baseline selected on 2026-04-13; project not initialized yet |
| third-party | none | no third-party registry declared on 2026-04-13 |

---

## Source Notes

| Source | Decisions Used |
|--------|----------------|
| `.planning/ROADMAP.md` | Phase 3 goal, three-pane flow, copy-JSON success criteria |
| `.planning/REQUIREMENTS.md` | `DEMO-01`, `DEMO-02`, and explicit out-of-scope boundaries |
| `.planning/phases/03-local-demo-v0/03-CONTEXT.md` | Layout order, blank-first interaction, explicit parse trigger, bright workbench visual direction |
| `src/parser/types.ts` | JSON pane contract and role vocabulary |
| `fixtures/parser-core-v0.ts` | Example helper sentence set |
| Agent defaults | Spacing, typography, exact palette, focal point, copy feedback, and pane micro-interactions |

---

## Checker Sign-Off

- [ ] Dimension 1 Copywriting: PASS
- [ ] Dimension 2 Visuals: PASS
- [ ] Dimension 3 Color: PASS
- [ ] Dimension 4 Typography: PASS
- [ ] Dimension 5 Spacing: PASS
- [ ] Dimension 6 Registry Safety: PASS

**Approval:** pending
