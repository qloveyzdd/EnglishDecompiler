# Phase 1: Repository Positioning and Launch Skeleton - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in `01-CONTEXT.md` - this log preserves the alternatives considered.

**Date:** 2026-04-13
**Phase:** 01-Repository Positioning and Launch Skeleton
**Areas discussed:** License, README language strategy, hero media strategy, community file style

---

## License

| Option | Description | Selected |
|--------|-------------|----------|
| MIT | Most permissive and lowest adoption friction | |
| Apache-2.0 | Permissive license with explicit patent grant | Yes |
| Other | Use a different license chosen by the user | |

**User's choice:** Apache-2.0
**Notes:** The user explicitly selected Apache-2.0 for the project license.

---

## README Language Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| English only | Best fit for GitHub-first global launch | |
| English main + Chinese supplement | Keep the public landing surface in English while supporting Chinese readers | Yes |
| Split bilingual docs equally | Maintain parallel entry docs with equal weight | |

**User's choice:** English main + Chinese supplement
**Notes:** The main README should stay English-first, with Chinese support linked separately.

---

## Hero Media Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| No media yet | Remove media until assets exist | |
| Static image first | Replace GIF with a simpler preview image | |
| Keep GIF placeholder path | Preserve the asset slot and fill it later | Yes |

**User's choice:** Keep GIF placeholder path
**Notes:** The README can keep the media slot even before the final asset is produced.

---

## Community File Style

| Option | Description | Selected |
|--------|-------------|----------|
| Minimal | Only enough content to satisfy repository health basics | |
| Standard open-source | Detailed enough for real contributors and public launch | Yes |
| Agent decides | Leave the exact level of detail to implementation | |

**User's choice:** Standard open-source
**Notes:** The user wants real contributor-facing community files rather than placeholder-only stubs.

## Prior Decisions Carried Forward

- Main homepage positioning line: `Decompile English technical text into actions, objects, and control flow — so developers can inspect it instead of blindly translating it.`
- GitHub About: `A white-box parser for English technical docs.`
- Supporting tagline: `Parse technical English like code.`
- Core differentiator line: `Translation gives you an answer. Parsing gives you control.`
- Topic set: `developer-tools`, `nlp`, `english-parser`, `technical-documentation`, `translation`, `llm`, `language-tools`, `documentation-tools`
- Social preview direction: project name + tagline + sentence -> structure -> IR visual

## the agent's Discretion

- Exact filename/path for the Chinese companion document
- Exact README section wording and transition phrasing
- Exact formatting for the placeholder hero media block

## Deferred Ideas

- Final launch assets production
- Parser and demo implementation work in later phases
