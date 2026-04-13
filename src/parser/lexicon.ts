import type { ParseRole, RelationKind } from "./types.js";

export interface LexiconMatch {
  role: ParseRole;
  rule: string;
  kind?: RelationKind;
}

const ACTION_WORDS = new Set([
  "initialize",
  "install",
  "run",
  "load",
  "create",
  "set",
  "use",
  "train"
]);

const OBJECT_WORDS = new Set([
  "model",
  "file",
  "server",
  "config",
  "request",
  "response",
  "package"
]);

const RELATION_MARKERS = new Map<string, RelationKind>([
  ["before", "sequence"],
  ["after", "sequence"],
  ["with", "dependency"]
]);

const CONDITION_MARKERS = new Set(["if", "when"]);
const PURPOSE_MARKERS = new Set(["for", "to"]);

const ALIASES = new Map<string, string>([
  ["training", "train"],
  ["running", "run"],
  ["creating", "create"],
  ["uses", "use"]
]);

export function normalizeToken(raw: string): string {
  const trimmed = raw.toLowerCase().replace(/[.,!?;:]+$/g, "");
  return ALIASES.get(trimmed) ?? trimmed;
}

export function classifyNormalized(normalized: string, raw: string): LexiconMatch | null {
  if (RELATION_MARKERS.has(normalized)) {
    return {
      role: "relation",
      rule: `relation:${RELATION_MARKERS.get(normalized)}`,
      kind: RELATION_MARKERS.get(normalized)
    };
  }

  if (CONDITION_MARKERS.has(normalized)) {
    return {
      role: "condition",
      rule: "condition:marker"
    };
  }

  if (PURPOSE_MARKERS.has(normalized)) {
    return {
      role: "purpose",
      rule: "purpose:marker"
    };
  }

  if (ACTION_WORDS.has(normalized)) {
    const original = raw.toLowerCase().replace(/[.,!?;:]+$/g, "");
    return {
      role: "action",
      rule: original === normalized ? "action:lexicon" : "action:alias"
    };
  }

  if (OBJECT_WORDS.has(normalized)) {
    return {
      role: "object",
      rule: "object:lexicon"
    };
  }

  return null;
}
