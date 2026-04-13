import { parserCoreFixtures } from "../fixtures/parser-core-v0.js";
import { parseSentence } from "../src/index.js";

let hasFailure = false;

for (const fixture of parserCoreFixtures) {
  const actual = parseSentence(fixture.input);
  const actualJson = JSON.stringify(actual);
  const expectedJson = JSON.stringify({
    input: fixture.input,
    spans: fixture.expectedSpans,
    summary: fixture.expectedSummary
  });

  if (actualJson !== expectedJson) {
    hasFailure = true;
    console.error(`FAIL ${fixture.id}: ${fixture.input}`);
    console.error("expected:");
    console.error(JSON.stringify({ spans: fixture.expectedSpans, summary: fixture.expectedSummary }, null, 2));
    console.error("actual:");
    console.error(JSON.stringify({ spans: actual.spans, summary: actual.summary }, null, 2));
    continue;
  }

  console.log(`PASS ${fixture.id}: ${fixture.input}`);
}

if (hasFailure) {
  process.exitCode = 1;
}
