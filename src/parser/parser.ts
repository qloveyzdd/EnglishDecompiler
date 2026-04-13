import { classifyNormalized, normalizeToken } from "./lexicon.js";
import { summarizeSpans } from "./summary.js";
import type { ParseResult, ParseSpan } from "./types.js";

function tokenize(input: string): ParseSpan[] {
  const matches = input.matchAll(/\S+/g);
  const spans: ParseSpan[] = [];

  for (const match of matches) {
    const text = match[0];
    const start = match.index ?? 0;
    const normalized = normalizeToken(text);
    const classified = classifyNormalized(normalized, text);

    spans.push({
      index: spans.length,
      text,
      normalized,
      role: classified?.role ?? "unknown",
      rule: classified?.rule ?? "fallback:unknown",
      start,
      end: start + text.length,
      kind: classified?.kind
    });
  }

  return spans;
}

export function parseSentence(input: string): ParseResult {
  const spans = tokenize(input);

  return {
    input,
    spans,
    summary: summarizeSpans(spans)
  };
}
