# English Decompiler

## What This Is

English Decompiler v1.0 is a shipped white-box parser for English technical text.
It is designed for developers who find raw documentation opaque but do not want a black-box translation that hides the reasoning process.
The product now ships a deterministic parser, a local demo, a code-like IR view, and a correction loop that keeps the reasoning process inspectable and editable.

## Core Value

Developers can inspect and correct how a technical English sentence maps to structure, instead of blindly trusting translation output.

## Current State

- Shipped `v1.0 MVP` on `2026-04-14`
- Public surface includes repo positioning, launch assets, examples corpus, and GitHub-native contribution paths
- Product surface includes deterministic sentence parsing, local demo panes, code-like IR, and sentence-scoped correction persistence
- Known debt: long multi-sentence explanatory text still sits outside the v1 single-sentence parser contract

## Requirements

### Validated

- [x] Visitors can understand the project value quickly and find the key repo entry files - `v1.0`
- [x] Developers can parse single technical sentences into inspectable token roles and stable JSON - `v1.0`
- [x] Developers can use a local demo to inspect source text, token roles, JSON, and IR - `v1.0`
- [x] Developers can correct parser judgments and see JSON/IR regenerate immediately with local persistence - `v1.0`
- [x] The repository ships launch assets, examples, and GitHub-native feedback intake - `v1.0`

### Active

- [ ] Parse short multi-sentence technical passages without degrading into mostly `unknown`
- [ ] Export parsed structure and IR in reusable formats
- [ ] Reuse corrections beyond one local browser session or machine
- [ ] Expose the parser outside the demo surface, such as editor tools or browser extensions

### Out of Scope

- General-purpose translation - the product is about inspectable structure, not final-language replacement
- English learning workflows - this is not a vocabulary trainer, course, or exam-prep tool
- Casual conversation parsing - the initial target is technical documentation, not everyday language
- Full-document semantic understanding - v0.1 focuses on sentence-level parsing and white-box interaction

## Context

- The target material is technical English: GitHub READMEs, API docs, setup guides, and AI tooling docs
- The motivating problem is not only vocabulary; the bigger pain is that technical English often feels like a black box, while full translation removes the intermediate reasoning loop
- The shipped v1 stack is TypeScript, Vite, React, shadcn/ui, Vitest, and PowerShell validation scripts
- The first public version now exists as a real open-source project with launch media, examples, and issue intake
- The next milestone should start from real parser failure cases and broader reuse surfaces, not from repo packaging work

## Constraints

- **Scope**: Focus on technical English sentence parsing first - this keeps v0.1 small and explainable
- **Product Principle**: White-box before black-box - users must be able to inspect and correct decisions
- **Delivery**: Ship an MVP shaped for open-source launch - the repo experience is part of the product
- **Maintainability**: Keep the implementation simple and easy to evolve - no premature over-design
- **Audience**: Optimize for developers reading technical docs - not general consumers

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Position the product as an English decompiler, not a translator | This creates a sharper problem definition and stronger project memory | Good |
| Start with technical docs instead of general English | Technical text has clearer structure and a more focused user need | Good |
| Build around inspectable structure and editable roles | User intervention is the core differentiator | Good |
| Use a sentence-first MVP | Sentence-level parsing is enough to prove the product idea without overextending | Good |
| Center the project message around "Translation gives you an answer. Parsing gives you control." | It captures the product difference in one memorable line | Good |
| Use a deterministic rule-based parser for v1 | Keeps parser behavior explainable, testable, and easy to correct | Good |
| Regenerate JSON and IR from one corrected-result path | Prevents the correction UI from drifting from parser truth | Good |
| Keep launch assets and examples repo-native | Makes the open-source surface self-contained and auditable | Good |

## Next Milestone Goals

- Expand beyond the current single-sentence parser contract
- Add export and integration surfaces
- Reuse corrections across more than one local environment

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition:**
1. Requirements invalidated? -> Move to Out of Scope with reason
2. Requirements validated? -> Move to Validated with phase reference
3. New requirements emerged? -> Add to Active
4. Decisions to log? -> Add to Key Decisions
5. "What This Is" still accurate? -> Update if drifted

**After each milestone:**
1. Full review of all sections
2. Core Value check -> still the right priority?
3. Audit Out of Scope -> reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-14 after v1.0 milestone completion*
