import { describe, expect, it } from "vitest";
import { parserCoreFixtures } from "../fixtures/parser-core-v0.js";
import { parseSentence } from "../src/index.js";

describe("parser core fixtures", () => {
  for (const fixture of parserCoreFixtures) {
    it(`fixture: ${fixture.id}`, () => {
      const actual = parseSentence(fixture.input);

      expect(actual.spans).toEqual(fixture.expectedSpans);
      expect(actual.summary).toEqual(fixture.expectedSummary);
    });
  }
});

it("README example keeps the expected role mapping", () => {
  const result = parseSentence("Initialize the model before training.");
  const byText = result.spans.map((span) => ({
    text: span.text,
    role: span.role
  }));

  expect(byText).toEqual([
    { text: "Initialize", role: "action" },
    { text: "the", role: "unknown" },
    { text: "model", role: "object" },
    { text: "before", role: "relation" },
    { text: "training.", role: "action" }
  ]);
});
