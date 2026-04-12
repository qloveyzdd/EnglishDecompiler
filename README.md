# English Decompiler

> Decompile English technical text into actions, objects, and control flow - so developers can inspect it instead of blindly translating it.

English Decompiler is a white-box parser for technical English.

It does not replace a sentence with a black-box translation.
It turns technical English into inspectable structure that developers can verify, reason about, and correct.

![Hero demo](./assets/hero.gif)

[中文说明](./README.zh-CN.md) · [Roadmap](./ROADMAP.md) · [Contributing](./CONTRIBUTING.md)

## Why this exists

Some developers do not avoid English because they are lazy.

They avoid it because raw docs feel opaque, while full translation removes the reasoning process.

English Decompiler keeps the reasoning loop visible.

## What it does

- Highlights actions, objects, conditions, sequence, and purpose
- Parses technical English into a simple inspectable JSON structure
- Renders a code-like IR for developers
- Lets users verify and correct the parser instead of trusting a black box
- Focuses on GitHub READMEs, API docs, setup guides, and AI tooling docs

## Example

Input:

```text
Initialize the model before training.
```

Parsed structure:

```yaml
action: initialize
object: model
relation:
  type: sequence
  value: before
next_action: train
```

IR view:

```python
initialize(model)
before:
    train()
```

## Why this is different from translation

Translation gives you an answer. Parsing gives you control.

## Start in 30 seconds

```bash
pnpm install
pnpm dev
```

## Status

Experimental.
Optimized for technical English, not general conversation.
Not an English-learning tool and not a general translator.
