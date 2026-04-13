import type { ParseResult, ParseRole, ParseSpan, ParseSummary, SummarySegment } from "./types.js";

const MARKER_ROLES = new Set<ParseRole>(["relation", "condition", "purpose"]);
const SUMMARY_STOP_WORDS = new Set(["the", "a", "an"]);

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

  const segment: SummarySegment = {
    marker: marker.normalized,
    text: parts.join(" ")
  };

  if (marker.kind !== undefined) {
    segment.kind = marker.kind;
  }

  return segment;
}

export function summarizeSpans(spans: ParseSpan[]): ParseSummary {
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

export function cloneParseResult(result: ParseResult): ParseResult {
  return {
    input: result.input,
    spans: result.spans.map((span) => ({ ...span })),
    summary: { ...result.summary }
  };
}
