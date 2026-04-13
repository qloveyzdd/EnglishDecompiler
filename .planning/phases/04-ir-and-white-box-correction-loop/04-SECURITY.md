---
phase: 04
slug: ir-and-white-box-correction-loop
status: verified
threats_open: 0
asvs_level: 1
created: 2026-04-14
---

# Phase 04 - Security

> Per-phase security contract: threat register, accepted risks, and audit trail.

---

## Trust Boundaries

| Boundary | Description | Data Crossing |
|----------|-------------|---------------|
| parser result -> correction layer | Manual correction must not fork parser semantics into a hidden second pipeline | `ParseResult`, `ParseSpan`, `ParseSummary`, override roles |
| corrected result -> visible outputs | JSON and IR must stay synchronized and derive from the same corrected state | corrected `ParseResult`, formatted JSON, IR text |
| browser storage -> correction replay | Saved corrections must remain sentence-scoped and browser-local | trimmed input string, token index, overridden role |
| token interaction -> explainability surface | UI edits must preserve provenance instead of hiding how a role was assigned | selected token text, current role, original role, rule id |
| validation scripts -> contributors | The local verification path must fail fast and not report false-green results | install/check/test/build commands, exit codes |

---

## Threat Register

| Threat ID | Category | Component | Disposition | Mitigation | Status |
|-----------|----------|-----------|-------------|------------|--------|
| T-04-01 | Integrity | summary regeneration | mitigate | Shared summary rebuilding exists in [summary.ts:37](/E:/EnglishDecompiler/src/parser/summary.ts:37); parser flow calls it in [parser.ts:36](/E:/EnglishDecompiler/src/parser/parser.ts:36); corrected spans also rebuild through it in [corrections.ts:29](/E:/EnglishDecompiler/src/lib/corrections.ts:29). | closed |
| T-04-02 | Integrity | corrected output surfaces | mitigate | Corrected output is derived from one corrected result in [App.tsx:30](/E:/EnglishDecompiler/src/App.tsx:30), with JSON and IR both reading that state in [App.tsx:40](/E:/EnglishDecompiler/src/App.tsx:40) and [App.tsx:41](/E:/EnglishDecompiler/src/App.tsx:41). The override helper preserves spans and regenerates summary in [corrections.ts:19](/E:/EnglishDecompiler/src/lib/corrections.ts:19). | closed |
| T-04-03 | Information Disclosure | local persistence | mitigate | Sentence-scoped storage prefix is fixed in [correction-storage.ts:3](/E:/EnglishDecompiler/src/lib/correction-storage.ts:3); key scope is trimmed sentence only in [correction-storage.ts:13](/E:/EnglishDecompiler/src/lib/correction-storage.ts:13) and [correction-storage.ts:15](/E:/EnglishDecompiler/src/lib/correction-storage.ts:15); replay loads only for the parsed trimmed input in [App.tsx:73](/E:/EnglishDecompiler/src/App.tsx:73). | closed |
| T-04-04 | Integrity | interactive correction UI | mitigate | Token chips are interactive buttons with pressed state in [role-chip.tsx:17](/E:/EnglishDecompiler/src/components/demo/role-chip.tsx:17); the role picker exposes explicit choices in [role-picker.tsx:25](/E:/EnglishDecompiler/src/components/demo/role-picker.tsx:25); `App` owns selection and correction flow directly in [App.tsx:92](/E:/EnglishDecompiler/src/App.tsx:92) and [App.tsx:96](/E:/EnglishDecompiler/src/App.tsx:96). | closed |
| T-04-05 | Repudiation | explainability surface | mitigate | The selected-token detail view exposes `Why this role` in [token-inspector.tsx:16](/E:/EnglishDecompiler/src/components/demo/token-inspector.tsx:16) and [token-inspector.tsx:31](/E:/EnglishDecompiler/src/components/demo/token-inspector.tsx:31), shows saved-local provenance in [token-inspector.tsx:29](/E:/EnglishDecompiler/src/components/demo/token-inspector.tsx:29), and keeps `Rule:` visible in [token-inspector.tsx:33](/E:/EnglishDecompiler/src/components/demo/token-inspector.tsx:33). | closed |
| T-04-06 | Availability | validation and persistence path | mitigate | UI regression coverage exercises correction, persistence, and stale-output reset in [white-box-correction-loop.test.tsx:30](/E:/EnglishDecompiler/tests/white-box-correction-loop.test.tsx:30), [white-box-correction-loop.test.tsx:57](/E:/EnglishDecompiler/tests/white-box-correction-loop.test.tsx:57), [white-box-correction-loop.test.tsx:76](/E:/EnglishDecompiler/tests/white-box-correction-loop.test.tsx:76), [white-box-correction-loop.test.tsx:94](/E:/EnglishDecompiler/tests/white-box-correction-loop.test.tsx:94); the validation script runs install/check/test/build and stops on non-zero exit in [validate-phase-04.ps1:4](/E:/EnglishDecompiler/scripts/validation/validate-phase-04.ps1:4), [validate-phase-04.ps1:21](/E:/EnglishDecompiler/scripts/validation/validate-phase-04.ps1:21), and [validate-phase-04.ps1:29](/E:/EnglishDecompiler/scripts/validation/validate-phase-04.ps1:29). | closed |

*Status: open or closed*
*Disposition: mitigate (implementation required), accept (documented risk), transfer (third-party)*

---

## Accepted Risks Log

No accepted risks.

---

## Security Audit Trail

| Audit Date | Threats Total | Closed | Open | Run By |
|------------|---------------|--------|------|--------|
| 2026-04-14 | 6 | 6 | 0 | Codex inline secure-phase audit |

---

## Findings

- `T-04-01` is closed: Phase 4 did not introduce a second summary algorithm. Raw parse and corrected parse both rebuild through the same helper path.
- `T-04-02` is closed: JSON and IR are synchronized because both are recomputed from the same corrected result owned by the app shell.
- `T-04-03` is closed: browser persistence is narrowly scoped to the trimmed sentence key plus token index, with no global correction sharing or cross-device sync.
- `T-04-04` is closed: token editing remains explicit and bounded to six concrete role choices, reducing hidden state transitions.
- `T-04-05` is closed: the selected-token inspector keeps provenance visible through token text, current role, reason, saved-local state, and rule id.
- `T-04-06` is closed: the phase has automated UI regression coverage plus a fail-fast PowerShell validation entrypoint, so the correction loop is reproducible and auditable.

---

## Sign-Off

- [x] All threats have a disposition (mitigate / accept / transfer)
- [x] Accepted risks documented in Accepted Risks Log
- [x] `threats_open: 0` confirmed
- [x] `status: verified` set in frontmatter

**Approval:** verified 2026-04-14
