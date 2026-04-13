# Phase 2: Parser Core v0 - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md - this log preserves the alternatives considered.

**Date:** 2026-04-13
**Phase:** 02-parser-core-v0
**Areas discussed:** Runtime and module shape, sentence scope, JSON contract, lexicon strategy

---

## Runtime and Module Shape

| Option | Description | Selected |
|--------|-------------|----------|
| TypeScript + Node pure function module | Small library-style parser core with explicit functions and types | x |
| JavaScript first | Skip types and optimize for fastest throwaway implementation | |
| Agent decides | Leave runtime choice open for planning | |

**User's choice:** 采用推荐方案：TypeScript + Node 纯函数模块。
**Notes:** User accepted the recommended default to keep Phase 2 inspectable, simple, and aligned with the repo's visible `pnpm` direction.

---

## Sentence Scope

| Option | Description | Selected |
|--------|-------------|----------|
| Common technical sentences only | Imperative, simple conditionals, sequence, and purpose patterns only | x |
| Add broader dependency / negation / passive voice coverage | Pull more sentence complexity into v0 | |
| Agent decides | Leave parser boundary open for planning | |

**User's choice:** 采用推荐方案：先做最常见技术句型。
**Notes:** This keeps v0 small and explainable. More complex sentence families are intentionally deferred.

---

## JSON Contract

| Option | Description | Selected |
|--------|-------------|----------|
| Role list + minimal sentence summary | Ordered token-or-phrase list plus a small normalized sentence object | x |
| Role list only | Minimal contract, no sentence summary helper | |
| Sentence-level normalized object first | Higher-level abstraction instead of role-first output | |

**User's choice:** 采用推荐方案：token/phrase role list 为主，附最小 sentence summary。
**Notes:** This gives later phases an inspectable surface now without prematurely designing the IR contract.

---

## Lexicon Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Seed lexicon + simple rules + unknown fallback | Hand-written starter vocabulary and deterministic fallback behavior | x |
| Lexicon + stemming / synonym expansion | Broader matching in v0 at the cost of more complexity | |
| Agent decides | Leave lexical strategy open for planning | |

**User's choice:** 采用推荐方案：seed lexicon + simple rules + unknown fallback。
**Notes:** User accepted the recommendation to keep normalization lightweight and avoid overconfident labels for unknown words.

---

## the agent's Discretion

- Final parser file layout
- Internal grouping representation for token-or-phrase spans
- Exact export names and fixture filenames

## Deferred Ideas

- Passive voice and broader dependency semantics
- Heavier normalization such as stemming and synonym expansion
- Multi-sentence parsing
- IR-specific contract design
