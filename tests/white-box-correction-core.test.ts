import { beforeEach, describe, expect, it } from "vitest";
import { parseSentence, summarizeSpans } from "../src/index.js";
import { applyRoleOverrides, describeSpanRole, type SpanRoleOverride } from "../src/lib/corrections.js";
import { clearSentenceCorrections, loadSentenceCorrections, saveSentenceCorrections } from "../src/lib/correction-storage.js";
import { renderIr } from "../src/lib/ir.js";

describe("white-box correction core", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("rebuilds the README summary with summarizeSpans()", () => {
    const result = parseSentence("Initialize the model before training.");

    expect(summarizeSpans(result.spans)).toEqual(result.summary);
  });

  it("applies targeted role overrides and regenerates summary", () => {
    const result = parseSentence("Initialize the model before training.");
    const overrides: SpanRoleOverride[] = [{ tokenIndex: 3, role: "purpose" }];

    const corrected = applyRoleOverrides(result, overrides);

    expect(corrected.spans[3].role).toBe("purpose");
    expect(corrected.summary.relation).toBeNull();
    expect(corrected.summary.purpose).toEqual({
      marker: "before",
      text: "train",
      kind: "sequence"
    });
  });

  it("describes parser-owned spans and manual overrides differently", () => {
    const result = parseSentence("Initialize the model before training.");
    const corrected = applyRoleOverrides(result, [{ tokenIndex: 3, role: "purpose" }]);

    expect(describeSpanRole(result.spans[0])).toBe("Matched initialize through action:lexicon.");
    expect(describeSpanRole(corrected.spans[3], result.spans[3].role)).toBe("Manual override from relation to purpose.");
  });

  it("renders code-like IR for sequence and condition sentences", () => {
    const sequenceResult = parseSentence("Initialize the model before training.");
    const conditionResult = parseSentence("If the server uses the config, load the file.");

    expect(renderIr(sequenceResult)).toBe("before(train):\n  initialize(model)");
    expect(renderIr(conditionResult)).toBe("if server use config:\n  load(file)");
  });

  it("round-trips sentence-scoped corrections through localStorage", () => {
    const input = "Initialize the model before training.";
    const overrides: SpanRoleOverride[] = [{ tokenIndex: 3, role: "purpose" }];

    saveSentenceCorrections(input, overrides);

    expect(loadSentenceCorrections(input)).toEqual(overrides);
  });

  it("clears saved sentence corrections", () => {
    const input = "If the server uses the config, load the file.";
    saveSentenceCorrections(input, [{ tokenIndex: 0, role: "unknown" }]);

    clearSentenceCorrections(input);

    expect(loadSentenceCorrections(input)).toEqual([]);
  });
});
