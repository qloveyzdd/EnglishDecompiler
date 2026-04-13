import { summarizeSpans } from "@/parser/summary.js";
import type { ParseResult, ParseRole, ParseSpan } from "@/index.js";

export interface SpanRoleOverride {
  tokenIndex: number;
  role: ParseRole;
}

function buildOverrideMap(overrides: SpanRoleOverride[]): Map<number, ParseRole> {
  const overrideMap = new Map<number, ParseRole>();

  for (const override of overrides) {
    overrideMap.set(override.tokenIndex, override.role);
  }

  return overrideMap;
}

export function applyRoleOverrides(result: ParseResult, overrides: SpanRoleOverride[]): ParseResult {
  const overrideMap = buildOverrideMap(overrides);
  const spans = result.spans.map((span) => {
    const nextRole = overrideMap.get(span.index);
    return nextRole === undefined ? { ...span } : { ...span, role: nextRole };
  });

  return {
    input: result.input,
    spans,
    summary: summarizeSpans(spans)
  };
}

export function describeSpanRole(span: ParseSpan, originalRole?: ParseRole): string {
  if (originalRole !== undefined && originalRole !== span.role) {
    return `Manual override from ${originalRole} to ${span.role}.`;
  }

  if (span.rule === "fallback:unknown") {
    return "No parser rule matched this token.";
  }

  return `Matched ${span.normalized} through ${span.rule}.`;
}
