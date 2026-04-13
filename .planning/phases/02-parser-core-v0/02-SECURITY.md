---
phase: 02
slug: parser-core-v0
status: verified
threats_open: 0
asvs_level: 1
created: 2026-04-13
---

# Phase 02 - Security

> Per-phase security contract: threat register, accepted risks, and audit trail.

---

## Trust Boundaries

| Boundary | Description | Data Crossing |
|----------|-------------|---------------|
| Raw user sentence -> parser core | 单句技术英文会直接进入 parser 逻辑，需要确保解析路径可预测且不会因输入内容触发额外副作用。 | 原始句子文本、token 边界、归一化结果 |
| Parser output -> downstream demo and IR layers | 后续 Phase 3/4 会直接消费当前 JSON 契约，因此类型和字段必须稳定且可验证。 | spans、summary、fallback role、relation kind |
| Curated fixture corpus -> parser regression checks | fixture 既是承诺范围，也是回归基线，必须避免无声漂移。 | 预期 spans、预期 summary、覆盖句型 |
| Local validation entrypoint -> maintainers and contributors | 验证脚本负责复跑本 phase 的质量门，需要保持步骤固定且失败即停。 | install/check/test/fixtures 输出、退出码 |

---

## Threat Register

| Threat ID | Category | Component | Disposition | Mitigation | Status |
|-----------|----------|-----------|-------------|------------|--------|
| T-02-01 | Tampering | Parser output contract | mitigate | 稳定契约已固化在 [types.ts:1](/E:/EnglishDecompiler/src/parser/types.ts:1) 和 [types.ts:30](/E:/EnglishDecompiler/src/parser/types.ts:30)，并通过 [index.ts:1](/E:/EnglishDecompiler/src/index.ts:1) 统一导出，后续层不会绕过类型边界直接读取内部实现。 | closed |
| T-02-02 | Integrity | Token role labeling | mitigate | 角色判定全部走显式词典和规则：动作/对象/关系/条件/目的词都写死在 [lexicon.ts:9](/E:/EnglishDecompiler/src/parser/lexicon.ts:9)、[lexicon.ts:20](/E:/EnglishDecompiler/src/parser/lexicon.ts:20)、[lexicon.ts:30](/E:/EnglishDecompiler/src/parser/lexicon.ts:30)、[lexicon.ts:36](/E:/EnglishDecompiler/src/parser/lexicon.ts:36)、[lexicon.ts:37](/E:/EnglishDecompiler/src/parser/lexicon.ts:37)，未知词统一回落到 [parser.ts:21](/E:/EnglishDecompiler/src/parser/parser.ts:21) 的 `fallback:unknown`。 | closed |
| T-02-03 | Denial of Service | Parser implementation | mitigate | 解析路径只做单句 whitespace tokenization 和线性遍历，见 [parser.ts:7](/E:/EnglishDecompiler/src/parser/parser.ts:7)、[parser.ts:11](/E:/EnglishDecompiler/src/parser/parser.ts:11)、[parser.ts:36](/E:/EnglishDecompiler/src/parser/parser.ts:36)、[parser.ts:85](/E:/EnglishDecompiler/src/parser/parser.ts:85)；实现里没有网络、文件系统、子进程或递归调用。 | closed |
| T-02-04 | Repudiation | Parser regression detection | mitigate | fixture 和测试把承诺结果固化为可执行基线：语料定义在 [parser-core-v0.ts:56](/E:/EnglishDecompiler/fixtures/parser-core-v0.ts:56)，逐条 deep-equal 断言在 [parser-core-v0.test.ts:6](/E:/EnglishDecompiler/tests/parser-core-v0.test.ts:6)，README 例句还有单独回归断言 [parser-core-v0.test.ts:15](/E:/EnglishDecompiler/tests/parser-core-v0.test.ts:15)。 | closed |
| T-02-05 | Tampering | Phase scope coverage | mitigate | 固定 8 条句子覆盖 sequence / dependency / condition / purpose 范围，分别可见于 [parser-core-v0.ts:58](/E:/EnglishDecompiler/fixtures/parser-core-v0.ts:58)、[parser-core-v0.ts:76](/E:/EnglishDecompiler/fixtures/parser-core-v0.ts:76)、[parser-core-v0.ts:116](/E:/EnglishDecompiler/fixtures/parser-core-v0.ts:116)、[parser-core-v0.ts:135](/E:/EnglishDecompiler/fixtures/parser-core-v0.ts:135)、[parser-core-v0.ts:173](/E:/EnglishDecompiler/fixtures/parser-core-v0.ts:173)、[parser-core-v0.ts:195](/E:/EnglishDecompiler/fixtures/parser-core-v0.ts:195)，后续收窄范围会直接打破 fixture。 | closed |
| T-02-06 | Availability | Local verification path | mitigate | 统一验证入口在 [validate-phase-02.ps1:3](/E:/EnglishDecompiler/scripts/validation/validate-phase-02.ps1:3) 固定了四步命令，[validate-phase-02.ps1:16](/E:/EnglishDecompiler/scripts/validation/validate-phase-02.ps1:16) 会逐步打印执行项，[validate-phase-02.ps1:32](/E:/EnglishDecompiler/scripts/validation/validate-phase-02.ps1:32) 只在全部通过后输出成功行；同时 [package.json:6](/E:/EnglishDecompiler/package.json:6) 定义了对应脚本。 | closed |

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

- `T-02-01` 已闭合：parser 的对外契约和导出面是明确且单一的，没有发现 summary 或 span 结构漂移的第二入口。
- `T-02-02` 已闭合：角色分类没有黑盒猜测，未知 token 明确回落到 `unknown`，降低了错误高置信标注风险。
- `T-02-03` 已闭合：当前 parser 是纯同步、单句、线性实现，没有发现会把输入升级成资源消耗型操作的路径。
- `T-02-04`、`T-02-05` 已闭合：fixture + test 组合把承诺支持的句型和精确输出都固化下来了。
- `T-02-06` 已闭合：本地验证脚本能直接重放 install/check/test/fixtures 四步，并且已在当前环境跑通。

---

## Sign-Off

- [x] All threats have a disposition (mitigate / accept / transfer)
- [x] Accepted risks documented in Accepted Risks Log
- [x] `threats_open: 0` confirmed
- [x] `status: verified` set in frontmatter

**Approval:** verified 2026-04-13
