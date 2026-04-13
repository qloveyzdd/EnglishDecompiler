import type { ParseResult, ParseSpan } from "@/index.js";

interface StatementParts {
  action: string | null;
  object: string | null;
}

function findFirstObjectAfter(spans: ParseSpan[], startIndex: number): string | null {
  const objectSpan = spans.find((span) => span.role === "object" && span.index > startIndex) ?? null;
  return objectSpan?.normalized ?? null;
}

function findPrimaryStatement(result: ParseResult): StatementParts {
  const conditionIndex = result.spans.findIndex((span) => span.role === "condition");
  if (conditionIndex >= 0) {
    const conditionClauseEnd =
      result.spans.find((span) => span.index > conditionIndex && span.text.endsWith(","))?.index ?? conditionIndex;
    const actionSpan = result.spans.find((span) => span.role === "action" && span.index > conditionClauseEnd) ?? null;

    if (actionSpan !== null) {
      return {
        action: actionSpan.normalized,
        object: findFirstObjectAfter(result.spans, actionSpan.index)
      };
    }
  }

  const sequenceIndex = result.spans.findIndex((span) => span.role === "relation" && span.kind === "sequence");
  if (sequenceIndex >= 0) {
    const actionSpan = result.spans.find((span) => span.role === "action" && span.index < sequenceIndex) ?? null;
    if (actionSpan !== null) {
      const objectSpan =
        result.spans.find((span) => span.role === "object" && span.index > actionSpan.index && span.index < sequenceIndex) ??
        null;

      return {
        action: actionSpan.normalized,
        object: objectSpan?.normalized ?? null
      };
    }
  }

  return {
    action: result.summary.action,
    object: result.summary.object
  };
}

function indentBlock(lines: string[]): string[] {
  return lines.map((line) => `  ${line}`);
}

function buildStatement(result: ParseResult): string {
  const primary = findPrimaryStatement(result);
  const relation = result.summary.relation;
  const argumentsList: string[] = [];

  if (primary.object !== null) {
    argumentsList.push(primary.object);
  }

  if (relation?.kind === "dependency" && relation.text !== "") {
    argumentsList.push(`with=${relation.text}`);
  }

  if (primary.action === null) {
    return "inspect()";
  }

  return `${primary.action}(${argumentsList.join(", ")})`;
}

export function renderIr(result: ParseResult): string {
  const lines = [buildStatement(result)];
  const { condition, purpose, relation } = result.summary;

  if (condition !== null && condition.text !== "") {
    const conditionHeader = `if ${condition.text}:`;
    lines.splice(0, lines.length, conditionHeader, ...indentBlock(lines));
  }

  if (relation?.kind === "sequence" && relation.text !== "") {
    const sequenceHeader = `${relation.marker}(${relation.text}):`;
    lines.splice(0, lines.length, sequenceHeader, ...indentBlock(lines));
  }

  if (purpose !== null && purpose.text !== "") {
    lines.push(`# purpose: ${purpose.marker} ${purpose.text}`);
  }

  return lines.join("\n");
}
