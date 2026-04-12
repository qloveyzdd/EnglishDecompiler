# Pitfalls Research: English Decompiler

## 1. Drifting Back Into Translation

**Warning signs**
- UI copy starts promising "understanding English automatically"
- Output becomes a final-language answer instead of inspectable structure
- Users cannot see how the parser made a decision

**Prevention**
- Keep JSON and IR as the primary outputs
- Keep the project message anchored on control and inspectability
- Reject features that hide the reasoning path in v0.1

**Phase to address**
- Phase 1 and Phase 4

## 2. Using Black-Box Parsing Too Early

**Warning signs**
- Role assignments cannot be explained
- Hover help becomes impossible or vague
- Bug reports turn into "the model guessed wrong"

**Prevention**
- Start with deterministic rules and explicit heuristics
- Attach reason metadata to parser decisions from the start
- Treat model-based assistance as future augmentation, not the MVP core

**Phase to address**
- Phase 2

## 3. No Golden Example Set

**Warning signs**
- Parser changes feel subjective
- Fixing one sentence breaks another silently
- Contributors do not know what "good" output means

**Prevention**
- Create a real example corpus early
- Turn sample sentences into golden tests
- Add community examples after launch

**Phase to address**
- Phase 2 and Phase 5

## 4. Role Taxonomy Growing Too Fast

**Warning signs**
- New labels appear for every awkward sentence
- The UI becomes harder to understand
- IR rules become inconsistent

**Prevention**
- Keep the core label set intentionally small in v0.1
- Add new roles only when existing roles cannot explain real failures
- Prefer relation subtypes over exploding top-level role names

**Phase to address**
- Phase 2 and Phase 3

## 5. Shipping A Demo Before The White-Box Loop Works

**Warning signs**
- The demo only shows output, not reasoning or correction
- Wrong parses feel dead-end and frustrating
- Visitors think the project is just another translator

**Prevention**
- Ship editable roles as part of the MVP, not as a later polish item
- Show both structure and IR in the main experience
- Make parser reasoning visible where possible

**Phase to address**
- Phase 3 and Phase 4

## 6. Trying To Parse Full Documents Too Early

**Warning signs**
- Scope expands into summarization, chunking, and cross-sentence reasoning
- Core single-sentence behavior stays unstable
- The team loses clarity on the main problem

**Prevention**
- Keep v0.1 sentence-first
- Treat multi-sentence parsing as a future milestone
- Measure success on painful real sentences, not document breadth

**Phase to address**
- Phase 1 and Phase 5
