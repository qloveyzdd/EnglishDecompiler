import { classifyNormalized, normalizeToken } from "./lexicon.js";
import type { ParseResult, ParseSpan, ParseSummary, SummarySegment } from "./types.js";

const MARKER_ROLES = new Set(["relation", "condition", "purpose"]);
const SUMMARY_STOP_WORDS = new Set(["the", "a", "an"]);

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

function collectSegment(spans: ParseSpan[], markerIndex: number): SummarySegment {
  const marker = spans[markerIndex];
  const parts: string[] = [];

  for (let index = markerIndex + 1; index < spans.length; index += 1) {
    const current = spans[index];
    if (MARKER_ROLES.has(current.role)) {
      break;
    }

    if (!SUMMARY_STOP_WORDS.has(current.normalized)) {
      parts.push(current.normalized);
    }

    if (current.text.endsWith(",")) {
      break;
    }
  }

  return {
    marker: marker.normalized,
    text: parts.join(" "),
    kind: marker.kind
  };
}

function buildSummary(spans: ParseSpan[]): ParseSummary {
  const firstAction = spans.find((span) => span.role === "action") ?? null;
  const firstObjectAfterAction =
    firstAction === null
      ? spans.find((span) => span.role === "object") ?? null
      : spans.find((span) => span.role === "object" && span.index > firstAction.index) ??
        spans.find((span) => span.role === "object") ??
        null;

  const relationIndex = spans.findIndex((span) => span.role === "relation");
  const conditionIndex = spans.findIndex((span) => span.role === "condition");
  const purposeIndex = spans.findIndex((span) => span.role === "purpose");

  return {
    action: firstAction?.normalized ?? null,
    object: firstObjectAfterAction?.normalized ?? null,
    relation: relationIndex >= 0 ? collectSegment(spans, relationIndex) : null,
    condition: conditionIndex >= 0 ? collectSegment(spans, conditionIndex) : null,
    purpose: purposeIndex >= 0 ? collectSegment(spans, purposeIndex) : null
  };
}

export function parseSentence(input: string): ParseResult {
  const spans = tokenize(input);

  return {
    input,
    spans,
    summary: buildSummary(spans)
  };
}
