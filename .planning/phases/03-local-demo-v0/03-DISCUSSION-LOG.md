# Phase 3: Local Demo v0 - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md - this log preserves the alternatives considered.

**Date:** 2026-04-13
**Phase:** 03-local-demo-v0
**Areas discussed:** Technical route, layout, default interaction, visual direction

---

## Technical Route

| Option | Description | Selected |
|--------|-------------|----------|
| Vite + React + TypeScript SPA | Minimal modern frontend stack aligned with the current TypeScript repo direction | x |
| Native HTML + TypeScript | Fewer dependencies, but no established UI structure for later phases | |
| User-specified route | Leave the frontend stack open | |

**User's choice:** `Vite + React + TypeScript` 单页 demo。  
**Notes:** This keeps Phase 3 aligned with the existing TypeScript toolchain while leaving a usable base for later UI work.

---

## Layout

| Option | Description | Selected |
|--------|-------------|----------|
| Desktop three-pane, mobile stacked | Input, token roles, and JSON remain visible in a stable flow | x |
| Tabbed panes | Reuse one area and switch views to save space | |
| User-specified layout | Leave the page structure open | |

**User's choice:** 桌面端三栏并排，移动端纵向堆叠。  
**Notes:** This preserves the clearest screenshot/GIF story and keeps the parser flow inspectable at a glance.

---

## Default Interaction

| Option | Description | Selected |
|--------|-------------|----------|
| Prefilled example + Parse button + quick examples | Demo opens already primed with content | |
| Blank input + Parse button only | User starts from an empty state and triggers parsing explicitly | x |
| Live parse on input | Output updates while typing | |

**User's choice:** 默认空白输入，只保留显式 `Parse` 按钮。  
**Notes:** The phase should not auto-fill a sentence or auto-parse on every keystroke. Any example exposure, if added later in implementation, must stay secondary to the blank-first interaction.

---

## Visual Direction

| Option | Description | Selected |
|--------|-------------|----------|
| Bright developer workbench | Clear, inspectable, tool-like, and easy to read | x |
| Terminal / decompiler mood | Darker hacker-tool aesthetic | |
| User-specified direction | Leave the visual mood open | |

**User's choice:** 明亮、清晰、像可调试工具的开发者工作台风格。  
**Notes:** The UI should look intentional and useful instead of leaning on terminal-style atmosphere.

---

## the agent's Discretion

- Exact Vite + React file layout
- Exact color palette and component styling
- Exact copy-feedback interaction for `Copy JSON`
- Exact way to surface any secondary example content without breaking the blank-first default

## Deferred Ideas

- IR rendering
- Editable correction loop
- Local persistence for corrections
- Launch-media packaging
