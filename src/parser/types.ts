export type ParseRole = "action" | "object" | "relation" | "condition" | "purpose" | "unknown";

export type RelationKind = "sequence" | "dependency";

export interface ParseSpan {
  index: number;
  text: string;
  normalized: string;
  role: ParseRole;
  rule: string;
  start: number;
  end: number;
  kind?: RelationKind;
}

export interface SummarySegment {
  marker: string;
  text: string;
  kind?: RelationKind;
}

export interface ParseSummary {
  action: string | null;
  object: string | null;
  relation: SummarySegment | null;
  condition: SummarySegment | null;
  purpose: SummarySegment | null;
}

export interface ParseResult {
  input: string;
  spans: ParseSpan[];
  summary: ParseSummary;
}
