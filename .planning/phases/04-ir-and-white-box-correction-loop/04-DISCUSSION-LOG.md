# Phase 4: IR and White-Box Correction Loop - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in `04-CONTEXT.md` - this log preserves the alternatives considered.

**Date:** 2026-04-13
**Phase:** 04-ir-and-white-box-correction-loop
**Areas discussed:** output surface, token role editing, explainability, local persistence

---

## Output Surface

| Option | Description | Selected |
|--------|-------------|----------|
| A | 保持三栏，右栏上下同时显示 `JSON` 和 `IR` | x |
| B | 保持三栏，右栏用 tabs 在 `JSON / IR` 之间切换 | |
| C | 改成四栏，把 `IR` 单独做一栏 | |

**User's choice:** A
**Notes:** 用户选择按推荐方案执行，保持现有三栏主结构，降低 Phase 4 的布局扰动。

---

## Token Role Editing

| Option | Description | Selected |
|--------|-------------|----------|
| A | 点击 token 后弹出小菜单选择 role | x |
| B | 点击 token 直接循环切换 role | |
| C | 右侧单独做 inspector/editor 面板来改 | |

**User's choice:** A
**Notes:** 用户选择按推荐方案执行，优先轻量、可修复、不中断主工作流的交互。

---

## Explainability

| Option | Description | Selected |
|--------|-------------|----------|
| A | 选中或 hover token 时，显示短解释 + `rule id` | x |
| B | 直接把解释常驻显示在每个 token 卡片里 | |
| C | 不在 token 区显示，只在输出区附带 debug 信息 | |

**User's choice:** A
**Notes:** 用户选择按推荐方案执行，解释要可检查但不常驻铺满整个 token 区。

---

## Local Persistence

| Option | Description | Selected |
|--------|-------------|----------|
| A | 按“原句 + token index”的修正写进 `localStorage` | x |
| B | 按整句保存完整 correction snapshot | |
| C | 按 token 的 normalized text 全局复用修正 | |

**User's choice:** A
**Notes:** 用户选择按推荐方案执行，Phase 4 只做窄范围本地持久化，不提前演化成全局学习系统。

---

## the agent's Discretion

- IR 的具体语法细节
- role 菜单的具体呈现形式
- 短解释的具体承载组件
- `localStorage` 的具体字段结构

## Deferred Ideas

- 多句/长段技术文本解析扩展
- 全局 correction 复用
- 四栏布局或独立 inspector
