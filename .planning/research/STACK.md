# Stack Research: English Decompiler

## Recommendation

For v0.1, use a local-first TypeScript stack:

- **Runtime**: Node.js + pnpm
- **Language**: TypeScript
- **Frontend**: React + Vite
- **Styling**: Plain CSS with CSS variables
- **Parser core**: Deterministic rule-based pipeline
- **Validation**: Zod for parser output schemas
- **Testing**: Vitest with golden example sentences
- **Persistence**: `localStorage` for user corrections in the demo

## Why This Stack Fits

### Node.js + pnpm

- Matches the intended `pnpm install` / `pnpm dev` onboarding flow
- Keeps the repo easy for frontend-heavy contributors to run
- Good fit for a parser plus demo workflow in one workspace

**Confidence:** High

### TypeScript

- Parser output is structural data, so strong typing helps immediately
- Makes IR generation and editable token roles safer to evolve
- Helps keep the "white-box" model explicit in code

**Confidence:** High

### React + Vite

- Fastest path to a local demo with three synchronized panes
- Minimal framework overhead for an experimental OSS MVP
- Easy to add interaction such as role editing and hover explanations

**Confidence:** High

### Plain CSS with CSS variables

- Enough for a parser demo without adding design-system complexity
- Keeps styling transparent and easy to tweak during launch polish
- Supports a distinctive visual identity later without framework lock-in

**Confidence:** Medium

### Deterministic rule-based parser

- The product promise is inspectability, so rules should be visible
- Easier to explain why a token got a role
- Faster to debug with real example sentences than a black-box model

**Confidence:** High

### Zod + Vitest

- Zod keeps parser output stable across UI and IR rendering
- Vitest is lightweight and fits the Vite/TypeScript toolchain
- Golden tests make parser regressions obvious

**Confidence:** High

## Suggested Package Boundaries

- `src/parser/normalize.ts`
- `src/parser/tokenize.ts`
- `src/parser/tag.ts`
- `src/parser/reduce.ts`
- `src/ir/render.ts`
- `src/store/corrections.ts`
- `src/examples/`
- `src/app/`

## What Not To Use In v0.1

- **Next.js**: unnecessary app/runtime complexity for a local-first parser demo
- **Database-backed corrections**: local persistence is enough to prove the loop
- **Heavy NLP frameworks**: too much overhead before the role taxonomy is stable
- **LLM-first parsing**: conflicts with the white-box product thesis

## Stack Decision

Build the first version as a deterministic TypeScript parser with a small React demo, then add heavier infrastructure only after the parser taxonomy and correction loop are validated.
