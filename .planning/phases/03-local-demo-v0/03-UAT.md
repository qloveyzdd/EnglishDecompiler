---
status: diagnosed
phase: 03-local-demo-v0
source:
  - 03-01-SUMMARY.md
  - 03-02-SUMMARY.md
started: 2026-04-13T07:31:00Z
updated: 2026-04-13T07:43:00Z
---

## Current Test

[testing complete]

## Tests

### 1. Blank-first Workbench
expected: 打开本地 demo 后，页面应显示三个主要 pane：Source Sentence、Token Roles、Structured JSON。输入框默认是空白的，Parse Sentence 和 Copy JSON 在没有输入、没有解析结果前不可用。
result: pass

### 2. Explicit Parse Result
expected: 在输入框里粘贴一句技术英文并点击 Parse Sentence 后，Token Roles pane 应显示按原顺序排列的 token/role，Structured JSON pane 应显示对应的 ParseResult JSON。
result: issue
reported: "issue"
severity: major

### 3. Example Chips Do Not Auto-Parse
expected: 点击任一 example chip 时，只会把句子填入输入框，不会自动触发解析；Token Roles 和 Structured JSON 仍保持空态，直到再次点击 Parse Sentence。
result: pass

### 4. Editing Clears Stale Output
expected: 成功解析后，如果继续修改输入框，旧的 token 和 JSON 输出会立刻清空，并提示需要重新点击 Parse Sentence，避免旧结果和新输入并存。
result: pass

### 5. Copy JSON
expected: 成功解析后，Copy JSON 按钮可用。点击后会复制当前屏幕上可见的 JSON，并短暂显示成功反馈。
result: pass

## Summary

total: 5
passed: 4
issues: 1
pending: 0
skipped: 0
blocked: 0

## Gaps

- truth: "在输入框里粘贴一句技术英文并点击 Parse Sentence 后，Token Roles pane 应显示按原顺序排列的 token/role，Structured JSON pane 应显示对应的 ParseResult JSON。"
  status: failed
  reason: "User reported: issue"
  severity: major
  test: 2
  root_cause: "这不是 Phase 3 demo 壳子的交互故障，而是 Phase 2 parser 的能力边界：`parseSentence()` 会把整段多句文本当成一个输入流处理，缺少句子切分；同时词典只覆盖少量技术指令词，所以这类长段落解释性文本大多会退化为 `unknown`，summary 也只会抓到第一个 `to` 触发的 purpose 片段。"
  artifacts:
    - path: "src/parser/parser.ts"
      issue: "tokenize 和 buildSummary 直接对整段输入运行，没有句子级切分或段落级保护"
    - path: "src/parser/lexicon.ts"
      issue: "seed lexicon 仅覆盖少量 imperative/setup-guide 词汇，不覆盖这类解释性产品文本"
  missing:
    - "在 parser 入口增加句子切分，或对超出 v0 范围的多句长文本给出更明确的限制提示"
    - "扩展词典和规则，使其不只适配 setup-guide imperative 句，也能覆盖更一般的技术说明句"
  debug_session: ""
