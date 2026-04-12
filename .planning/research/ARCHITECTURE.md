# Architecture Research: English Decompiler

## Major Components

### 1. Input Normalization

Responsibility:
- Trim input
- Normalize punctuation and spacing
- Preserve enough surface form for display

### 2. Tokenization

Responsibility:
- Split sentence into inspectable tokens
- Preserve original token text for UI editing
- Attach token positions for highlighting

### 3. Role Tagging

Responsibility:
- Assign candidate roles such as action, object, relation, condition, and purpose
- Use rule tables, lexicons, and positional heuristics
- Emit reasoning metadata for each decision

### 4. Structure Reduction

Responsibility:
- Convert tagged tokens into a higher-level structure
- Group relations like `before`, `if`, `with`, `for`, and `to`
- Produce a stable JSON schema consumed by the UI and IR renderer

### 5. IR Renderer

Responsibility:
- Map structured output into a code-like representation
- Keep the rendered IR obvious rather than overly clever
- Recompute from structure after any user correction

### 6. Correction Layer

Responsibility:
- Let the user override token roles
- Merge overrides with parser output
- Persist local corrections for reuse in the demo

### 7. Demo UI

Responsibility:
- Left pane: source sentence
- Middle pane: token roles and edits
- Right pane: JSON / IR views

### 8. Example Corpus

Responsibility:
- Hold real or realistic technical-doc sentences
- Back parser tests and demo presets
- Surface failure cases for future iterations

## Data Flow

`input sentence`
-> normalization
-> tokenization
-> role tagging
-> structure reduction
-> JSON output
-> IR rendering
-> user correction
-> merged structure
-> refreshed JSON and IR

## Suggested Build Order

1. Example corpus and golden test cases
2. Tokenization and role tagging
3. Structured JSON schema
4. IR renderer
5. Demo UI
6. Role editing and local persistence
7. Launch assets and release loop

## Boundary Rules

- Parser core should not depend on the UI
- UI should consume parser output through a stable schema
- Correction storage should override labels, not mutate parsing logic directly
- IR rendering should be a pure transformation from structure
