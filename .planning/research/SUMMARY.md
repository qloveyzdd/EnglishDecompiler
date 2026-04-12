# Research Summary: English Decompiler

## Stack

Use a deterministic TypeScript parser with a small React + Vite demo.
Keep the system local-first and sentence-first.

## Table Stakes

- Token role parsing for technical sentences
- Inspectable JSON output
- Code-like IR rendering
- A demo with visible structure
- A small example corpus

## Differentiator

The product becomes memorable only when users can inspect and correct parser decisions instead of accepting a black-box answer.

## Watch Out For

- Do not drift into translation
- Do not hide reasoning behind black-box models
- Do not expand to full-document parsing before sentence-level quality is stable
- Do not ship a pretty demo without the correction loop

## Implementation Direction

Build the parser core first, then the demo, then the correction loop, and finally the launch assets and community feedback flow.
