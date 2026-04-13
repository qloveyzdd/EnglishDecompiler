# Contributing to English Decompiler

Thanks for helping improve English Decompiler.

This project is still early. The highest-value contributions right now are:

- Real technical-doc sentences that break the parser
- Parser failure cases with expected structure or reasoning
- Repository wording improvements that make the project easier to understand
- Small starter fixes that help future contributors get moving

## Ways to Help

- Report a bug when parser behavior, demo behavior, or repository setup is wrong
- Share parser examples wanted by posting real sentences from READMEs, API docs, setup guides, or AI tooling docs
- Improve wording in the repo so the product positioning stays sharp and consistent
- Pick up a small issue labeled `good first issue`

Quick links:

- Bug reports: https://github.com/qloveyzdd/EnglishDecompiler/issues/new?template=bug_report.md
- Parser examples wanted: https://github.com/qloveyzdd/EnglishDecompiler/issues/new?template=parser_example.md
- Good first issue: https://github.com/qloveyzdd/EnglishDecompiler/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22

## Before You Open an Issue

- Check whether the same problem or sentence has already been reported
- Keep reports focused on one bug or one parser example at a time
- Include the exact sentence, expected interpretation, and what looked wrong
- Prefer real technical English over synthetic examples whenever possible

## Parser Examples Wanted

If you open a `parser examples wanted` issue, the best submissions include:

- The original sentence
- A source link or a short note about where it came from
- Why the sentence is hard, ambiguous, or painful in real use
- What structure or explanation you expected
- Whether it should also be added to `examples/launch-examples.json`

Early examples from GitHub READMEs, API docs, setup guides, and AI tooling docs are especially useful.

## Pull Requests

- Keep changes small and focused
- Explain the user-facing reason for the change
- If you change parser behavior, add or update the example that proves it
- If you are unsure, open an issue first so we can align on scope

## Labels and Triage

The main labels used in this repo are:

- `bug` for broken behavior or incorrect parser output
- `parser examples wanted` for real-world sentences that expose gaps
- `good first issue` for small, well-bounded starter tasks

If you are not sure where your report fits, start with an issue and include as much concrete context as you can.
