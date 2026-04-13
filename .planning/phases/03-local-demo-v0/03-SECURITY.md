---
phase: 03
slug: local-demo-v0
status: verified
threats_open: 0
asvs_level: 1
created: 2026-04-13
---

# Phase 03 - Security

> Per-phase security contract: threat register, accepted risks, and audit trail.

---

## Trust Boundaries

| Boundary | Description | Data Crossing |
|----------|-------------|---------------|
| Parser library -> browser demo shell | Demo 直接消费 parser 输出，必须避免 UI 侧重新定义解析契约或篡改含义 | `ParseResult`、`ParseRole`、`summary` |
| Local runtime scripts -> contributors | 本地开发、构建、测试和验证链需要在当前 Windows-first 环境里可重复运行 | dev/build/check/test 命令、别名配置、验证脚本输出 |
| Blank input state -> user trust | 首屏空态和显式解析是产品真实性的一部分，不能在未解析前展示伪结果 | textarea 内容、parse 按钮状态、空态提示 |
| Visible JSON pane -> clipboard | 复制动作必须对应当前屏幕正在显示的 JSON，而不是另一个序列化分支 | `formattedJson`、clipboard payload |
| UI behavior -> regression suite | Demo 的交互约束需要被测试固定，防止后续悄悄漂移 | blank state、example chips、stale reset、copy feedback |

---

## Threat Register

| Threat ID | Category | Component | Disposition | Mitigation | Status |
|-----------|----------|-----------|-------------|------------|--------|
| T-03-01 | Tampering | parser contract usage | mitigate | Demo 直接从 [App.tsx:3](/E:/EnglishDecompiler/src/App.tsx:3) 导入 `parseSentence`，角色元数据集中在 [demo.ts:10](/E:/EnglishDecompiler/src/lib/demo.ts:10)，UI 没有再定义第二套 parser schema。 | closed |
| T-03-02 | Availability | local demo runtime | mitigate | 运行时和类型配置已经固化在 [package.json:7](/E:/EnglishDecompiler/package.json:7)、[package.json:10](/E:/EnglishDecompiler/package.json:10)、[tsconfig.app.json:6](/E:/EnglishDecompiler/tsconfig.app.json:6)、[vite.config.ts:1](/E:/EnglishDecompiler/vite.config.ts:1)；Phase 级验证脚本在 [validate-phase-03.ps1:4](/E:/EnglishDecompiler/scripts/validation/validate-phase-03.ps1:4) 到 [validate-phase-03.ps1:32](/E:/EnglishDecompiler/scripts/validation/validate-phase-03.ps1:32) 固定了 install/check/test/build 顺序。 | closed |
| T-03-03 | Integrity | blank-first interaction contract | mitigate | 初始输入为空，解析按钮仅在 [App.tsx:149](/E:/EnglishDecompiler/src/App.tsx:149) 的 `!draftInput.trim()` 下启用；复制按钮仅在 [App.tsx:168](/E:/EnglishDecompiler/src/App.tsx:168) 有解析结果后启用；对应 blank state 回归测试见 [local-demo-v0.test.tsx:11](/E:/EnglishDecompiler/tests/local-demo-v0.test.tsx:11)。 | closed |
| T-03-04 | Integrity | copy JSON action | mitigate | JSON 文本只由 [App.tsx:33](/E:/EnglishDecompiler/src/App.tsx:33) 的 `formattedJson` 生成，复制调用见 [App.tsx:81](/E:/EnglishDecompiler/src/App.tsx:81)，JSON helper 仍使用同一序列化形式见 [demo.ts:53](/E:/EnglishDecompiler/src/lib/demo.ts:53)，测试在 [local-demo-v0.test.tsx:63](/E:/EnglishDecompiler/tests/local-demo-v0.test.tsx:63) 和 [local-demo-v0.test.tsx:75](/E:/EnglishDecompiler/tests/local-demo-v0.test.tsx:75) 断言复制的是可见字符串。 | closed |
| T-03-05 | Repudiation | interaction contract | mitigate | Demo 的 blank state、example fill-only、stale-output reset、copy flow 都被 Vitest 固化在 [local-demo-v0.test.tsx:11](/E:/EnglishDecompiler/tests/local-demo-v0.test.tsx:11)、[local-demo-v0.test.tsx:34](/E:/EnglishDecompiler/tests/local-demo-v0.test.tsx:34)、[local-demo-v0.test.tsx:46](/E:/EnglishDecompiler/tests/local-demo-v0.test.tsx:46)、[local-demo-v0.test.tsx:63](/E:/EnglishDecompiler/tests/local-demo-v0.test.tsx:63)；测试环境配置在 [vite.config.ts:14](/E:/EnglishDecompiler/vite.config.ts:14) 和 [vite.config.ts:15](/E:/EnglishDecompiler/vite.config.ts:15)。 | closed |
| T-03-06 | Availability | local validation path | mitigate | Phase 级验证入口 [validate-phase-03.ps1:4](/E:/EnglishDecompiler/scripts/validation/validate-phase-03.ps1:4) 到 [validate-phase-03.ps1:7](/E:/EnglishDecompiler/scripts/validation/validate-phase-03.ps1:7) 串起四步命令，并在 [validate-phase-03.ps1:24](/E:/EnglishDecompiler/scripts/validation/validate-phase-03.ps1:24) 提供 `corepack pnpm` fallback，最终成功信号在 [validate-phase-03.ps1:32](/E:/EnglishDecompiler/scripts/validation/validate-phase-03.ps1:32)。 | closed |

*Status: open or closed*  
*Disposition: mitigate (implementation required), accept (documented risk), transfer (third-party)*

---

## Accepted Risks Log

No accepted risks.

---

## Security Audit Trail

| Audit Date | Threats Total | Closed | Open | Run By |
|------------|---------------|--------|------|--------|
| 2026-04-13 | 6 | 6 | 0 | Codex inline secure-phase audit |

---

## Findings

- `T-03-01` 已闭合：UI 层消费 parser 契约，但没有重写 parser 的语义判定逻辑。
- `T-03-02`、`T-03-06` 已闭合：当前 phase 的运行链和验证链都可重复，且验证脚本已经覆盖当前环境下 `pnpm` 缺失时的 fallback。
- `T-03-03`、`T-03-05` 已闭合：空白首屏、显式解析、example chip 不自动解析、输入修改后清空旧结果，这些交互都同时有实现证据和自动化测试证据。
- `T-03-04` 已闭合：复制动作和 JSON 面板共用同一份序列化字符串，没有发现“屏幕显示一份、复制另一份”的分叉路径。
- Phase 3 的 UAT 中发现的“长段多句文本解析退化”为 parser scope gap，不属于本 phase 已声明 threat register 中的安全未闭合项，因此不计入 `threats_open`。

---

## Sign-Off

- [x] All threats have a disposition (mitigate / accept / transfer)
- [x] Accepted risks documented in Accepted Risks Log
- [x] `threats_open: 0` confirmed
- [x] `status: verified` set in frontmatter

**Approval:** verified 2026-04-13
