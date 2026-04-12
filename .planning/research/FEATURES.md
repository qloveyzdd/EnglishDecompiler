# Feature Research: English Decompiler

## Table Stakes

### Core Parsing

- Parse a single technical sentence into token roles
- Recognize `action`, `object`, `relation`, `condition`, and `purpose`
- Return stable structured JSON for inspection
- Handle common technical-doc verbs such as install, run, load, create, set, and use

### Developer-Facing Output

- Show token highlighting by role
- Render a code-like IR from parsed structure
- Support simple relation types such as sequence, condition, purpose, and dependency

### Demo Usability

- Accept pasted input from a text area
- Show parser output in side-by-side panes
- Offer copyable structured output
- Ship with example sentences that explain the product quickly

## Differentiators

- Let users correct token roles directly in the UI
- Re-render JSON and IR immediately after correction
- Explain why a token received a role instead of hiding the logic
- Treat the parser as inspectable infrastructure rather than an answer engine

## Anti-Features

- Full-sentence translation as the main output
- English-learning gamification
- General conversation support
- Long-document summarization
- "AI does everything automatically" positioning

## Complexity Notes

| Feature | Complexity | Notes |
|---------|------------|-------|
| Role tagging for simple technical sentences | Low | Rule-based heuristics are enough for v0 |
| JSON structure generation | Low | Schema-first design keeps it stable |
| Code-like IR rendering | Medium | Needs a small but consistent mapping model |
| Role editing with live regeneration | Medium | Core product differentiator, worth building early |
| Hover explanations for role decisions | Medium | Requires explicit reasoning metadata from parser |
| Local correction persistence | Low | `localStorage` is enough for MVP |

## Dependency Hints

- IR rendering depends on stable structured parser output
- Role editing is most valuable after the base parser and IR view exist
- Hover explanations depend on explicit parser reasoning, not just labels
- Launch assets depend on the demo being visually understandable
