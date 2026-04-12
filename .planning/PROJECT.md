# English Decompiler

## What This Is

English Decompiler is a white-box parser for English technical text.
It is designed for developers who find raw documentation opaque but do not want a black-box translation that hides the reasoning process.
The product turns technical sentences into inspectable actions, objects, conditions, and control flow that users can verify and correct.

## Core Value

Developers can inspect and correct how a technical English sentence maps to structure, instead of blindly trusting translation output.

## Requirements

### Validated

(None yet - ship to validate)

### Active

- [ ] Parse technical English into inspectable roles such as action, object, relation, condition, and purpose
- [ ] Render a code-like IR that helps developers reason about sentence behavior
- [ ] Provide a minimal web demo that shows source sentence, token roles, and structured output side by side
- [ ] Let users correct parser judgments instead of treating output as final
- [ ] Package the repository so first-time visitors immediately understand the project and how to contribute

### Out of Scope

- General-purpose translation - the product is about inspectable structure, not final-language replacement
- English learning workflows - this is not a vocabulary trainer, course, or exam-prep tool
- Casual conversation parsing - the initial target is technical documentation, not everyday language
- Full-document semantic understanding - v0.1 focuses on sentence-level parsing and white-box interaction

## Context

- The target material is technical English: GitHub READMEs, API docs, setup guides, and AI tooling docs
- The motivating problem is not only vocabulary; the bigger pain is that technical English often feels like a black box, while full translation removes the intermediate reasoning loop
- The product thesis is that developers want control and inspectability, not just a polished answer
- The first public version should feel like a real open-source project from day one, with a clear repo identity, examples, assets, and contribution paths
- The initial parser should favor simple, explainable heuristics over heavy black-box behavior

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
*Last updated: 2026-04-13 after initialization*
