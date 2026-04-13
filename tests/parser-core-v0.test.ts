import assert from "node:assert/strict";
import test from "node:test";
import { parserCoreFixtures } from "../fixtures/parser-core-v0.js";
import { parseSentence } from "../src/index.js";

for (const fixture of parserCoreFixtures) {
  test(`fixture: ${fixture.id}`, () => {
    const actual = parseSentence(fixture.input);

    assert.deepEqual(actual.spans, fixture.expectedSpans);
    assert.deepEqual(actual.summary, fixture.expectedSummary);
  });
}

test("README example keeps the expected role mapping", () => {
  const result = parseSentence("Initialize the model before training.");
  const byText = result.spans.map((span) => ({
    text: span.text,
    role: span.role
  }));

  assert.deepEqual(byText, [
    { text: "Initialize", role: "action" },
    { text: "the", role: "unknown" },
    { text: "model", role: "object" },
    { text: "before", role: "relation" },
    { text: "training.", role: "action" }
  ]);
});
