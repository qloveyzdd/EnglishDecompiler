import { parserCoreFixtures } from "../../fixtures/parser-core-v0.js";
import type { ParseResult, ParseRole, ParseSummary, SummarySegment } from "../index.js";

interface RoleMeta {
  label: string;
  chipClassName: string;
  toneClassName: string;
}

export const roleMeta: Record<ParseRole, RoleMeta> = {
  action: {
    label: "Action",
    chipClassName: "border-[#9bd8ce] bg-[#ddf4f1] text-[#0f766e]",
    toneClassName: "bg-[#ddf4f1] text-[#0f766e]"
  },
  object: {
    label: "Object",
    chipClassName: "border-[#b7cdf9] bg-[#e7f0ff] text-[#0b57d0]",
    toneClassName: "bg-[#e7f0ff] text-[#0b57d0]"
  },
  relation: {
    label: "Relation",
    chipClassName: "border-[#f2cd8a] bg-[#fff1d6] text-[#a15c00]",
    toneClassName: "bg-[#fff1d6] text-[#a15c00]"
  },
  condition: {
    label: "Condition",
    chipClassName: "border-[#f5b2cb] bg-[#ffe3ec] text-[#b4235d]",
    toneClassName: "bg-[#ffe3ec] text-[#b4235d]"
  },
  purpose: {
    label: "Purpose",
    chipClassName: "border-[#cdc0fb] bg-[#ede9fe] text-[#6d28d9]",
    toneClassName: "bg-[#ede9fe] text-[#6d28d9]"
  },
  unknown: {
    label: "Unknown",
    chipClassName: "border-[#d6dce5] bg-[#eef1f5] text-[#4b5563]",
    toneClassName: "bg-[#eef1f5] text-[#4b5563]"
  }
};

export const roleOrder: ParseRole[] = [
  "action",
  "object",
  "relation",
  "condition",
  "purpose",
  "unknown"
];

export function formatParseResult(result: ParseResult): string {
  return JSON.stringify(result, null, 2);
}

function formatSummarySegment(segment: SummarySegment): string {
  return `${segment.marker} ${segment.text}`;
}

export function getSummaryEntries(summary: ParseSummary): Array<{ label: string; value: string; role: ParseRole }> {
  const entries: Array<{ label: string; value: string; role: ParseRole }> = [];

  if (summary.action !== null) {
    entries.push({ label: "Action", value: summary.action, role: "action" });
  }

  if (summary.object !== null) {
    entries.push({ label: "Object", value: summary.object, role: "object" });
  }

  if (summary.relation !== null) {
    entries.push({ label: "Relation", value: formatSummarySegment(summary.relation), role: "relation" });
  }

  if (summary.condition !== null) {
    entries.push({ label: "Condition", value: formatSummarySegment(summary.condition), role: "condition" });
  }

  if (summary.purpose !== null) {
    entries.push({ label: "Purpose", value: formatSummarySegment(summary.purpose), role: "purpose" });
  }

  return entries;
}

const approvedExampleInputs = [
  "Initialize the model before training.",
  "Run the server with the config.",
  "If the server uses the config, load the file."
] as const;

const approvedExampleInputSet = new Set<string>(approvedExampleInputs);

export const demoExamples = parserCoreFixtures
  .map((fixture) => fixture.input)
  .filter((input): input is (typeof approvedExampleInputs)[number] => approvedExampleInputSet.has(input));
