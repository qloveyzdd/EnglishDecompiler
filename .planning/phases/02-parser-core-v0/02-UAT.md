---
status: complete
phase: 02-parser-core-v0
source:
  - 02-01-SUMMARY.md
  - 02-02-SUMMARY.md
started: 2026-04-13T09:15:30+08:00
updated: 2026-04-13T09:17:20+08:00
---

## Current Test

[testing complete]

## Tests

### 1. README Example Parse
expected: 从仓库根目录运行 `corepack pnpm exec tsx -e "import { parseSentence } from './src/index.ts'; console.log(JSON.stringify(parseSentence('Initialize the model before training.'), null, 2))"` 后，输出应包含 5 个 spans，role 顺序分别为 `action`、`unknown`、`object`、`relation`、`action`，并且 `summary.action=initialize`、`summary.object=model`、`summary.relation.marker=before`、`summary.relation.text=train`。
result: pass

### 2. Fixture Corpus Smoke
expected: 运行 `corepack pnpm fixtures:parse` 后，应输出 8 条 `PASS`，分别覆盖 README 例句、before/after、with、for/to、if/when 这些已承诺句型，且过程中不应出现 `FAIL`。
result: pass

### 3. Phase 02 Validation Entrypoint
expected: 运行 `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validation\validate-phase-02.ps1` 后，应依次执行 install、check、test、fixtures:parse 四步，并以 `Phase 02 validation passed.` 结束。
result: pass

## Summary

total: 3
passed: 3
issues: 0
pending: 0
skipped: 0
blocked: 0

## Gaps

none yet
