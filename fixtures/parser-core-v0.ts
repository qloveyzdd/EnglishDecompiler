import type { ParseRole, ParseSpan, ParseSummary, RelationKind } from "../src/index.js";

interface FixtureTokenSpec {
  text: string;
  normalized: string;
  role: ParseRole;
  rule: string;
  kind?: RelationKind;
}

export interface ParserCoreFixture {
  id: string;
  input: string;
  expectedSpans: ParseSpan[];
  expectedSummary: ParseSummary;
}

function buildExpectedSpans(input: string, specs: FixtureTokenSpec[]): ParseSpan[] {
  let cursor = 0;

  return specs.map((spec, index) => {
    const start = input.indexOf(spec.text, cursor);
    if (start === -1) {
      throw new Error(`Could not locate token "${spec.text}" in "${input}"`);
    }

    cursor = start + spec.text.length;

    return {
      index,
      text: spec.text,
      normalized: spec.normalized,
      role: spec.role,
      rule: spec.rule,
      start,
      end: start + spec.text.length,
      kind: spec.kind
    };
  });
}

function createFixture(
  id: string,
  input: string,
  specs: FixtureTokenSpec[],
  expectedSummary: ParseSummary
): ParserCoreFixture {
  return {
    id,
    input,
    expectedSpans: buildExpectedSpans(input, specs),
    expectedSummary
  };
}

export const parserCoreFixtures: ParserCoreFixture[] = [
  createFixture(
    "readme-before-training",
    "Initialize the model before training.",
    [
      { text: "Initialize", normalized: "initialize", role: "action", rule: "action:lexicon" },
      { text: "the", normalized: "the", role: "unknown", rule: "fallback:unknown" },
      { text: "model", normalized: "model", role: "object", rule: "object:lexicon" },
      { text: "before", normalized: "before", role: "relation", rule: "relation:sequence", kind: "sequence" },
      { text: "training.", normalized: "train", role: "action", rule: "action:alias" }
    ],
    {
      action: "initialize",
      object: "model",
      relation: { marker: "before", text: "train", kind: "sequence" },
      condition: null,
      purpose: null
    }
  ),
  createFixture(
    "install-before-running",
    "Install the package before running the server.",
    [
      { text: "Install", normalized: "install", role: "action", rule: "action:lexicon" },
      { text: "the", normalized: "the", role: "unknown", rule: "fallback:unknown" },
      { text: "package", normalized: "package", role: "object", rule: "object:lexicon" },
      { text: "before", normalized: "before", role: "relation", rule: "relation:sequence", kind: "sequence" },
      { text: "running", normalized: "run", role: "action", rule: "action:alias" },
      { text: "the", normalized: "the", role: "unknown", rule: "fallback:unknown" },
      { text: "server.", normalized: "server", role: "object", rule: "object:lexicon" }
    ],
    {
      action: "install",
      object: "package",
      relation: { marker: "before", text: "run server", kind: "sequence" },
      condition: null,
      purpose: null
    }
  ),
  createFixture(
    "load-after-creating",
    "Load the config after creating the file.",
    [
      { text: "Load", normalized: "load", role: "action", rule: "action:lexicon" },
      { text: "the", normalized: "the", role: "unknown", rule: "fallback:unknown" },
      { text: "config", normalized: "config", role: "object", rule: "object:lexicon" },
      { text: "after", normalized: "after", role: "relation", rule: "relation:sequence", kind: "sequence" },
      { text: "creating", normalized: "create", role: "action", rule: "action:alias" },
      { text: "the", normalized: "the", role: "unknown", rule: "fallback:unknown" },
      { text: "file.", normalized: "file", role: "object", rule: "object:lexicon" }
    ],
    {
      action: "load",
      object: "config",
      relation: { marker: "after", text: "create file", kind: "sequence" },
      condition: null,
      purpose: null
    }
  ),
  createFixture(
    "run-with-config",
    "Run the server with the config.",
    [
      { text: "Run", normalized: "run", role: "action", rule: "action:lexicon" },
      { text: "the", normalized: "the", role: "unknown", rule: "fallback:unknown" },
      { text: "server", normalized: "server", role: "object", rule: "object:lexicon" },
      { text: "with", normalized: "with", role: "relation", rule: "relation:dependency", kind: "dependency" },
      { text: "the", normalized: "the", role: "unknown", rule: "fallback:unknown" },
      { text: "config.", normalized: "config", role: "object", rule: "object:lexicon" }
    ],
    {
      action: "run",
      object: "server",
      relation: { marker: "with", text: "config", kind: "dependency" },
      condition: null,
      purpose: null
    }
  ),
  createFixture(
    "use-for-training",
    "Use the model for training.",
    [
      { text: "Use", normalized: "use", role: "action", rule: "action:lexicon" },
      { text: "the", normalized: "the", role: "unknown", rule: "fallback:unknown" },
      { text: "model", normalized: "model", role: "object", rule: "object:lexicon" },
      { text: "for", normalized: "for", role: "purpose", rule: "purpose:marker" },
      { text: "training.", normalized: "train", role: "action", rule: "action:alias" }
    ],
    {
      action: "use",
      object: "model",
      relation: null,
      condition: null,
      purpose: { marker: "for", text: "train" }
    }
  ),
  createFixture(
    "load-to-run",
    "Load the config to run the server.",
    [
      { text: "Load", normalized: "load", role: "action", rule: "action:lexicon" },
      { text: "the", normalized: "the", role: "unknown", rule: "fallback:unknown" },
      { text: "config", normalized: "config", role: "object", rule: "object:lexicon" },
      { text: "to", normalized: "to", role: "purpose", rule: "purpose:marker" },
      { text: "run", normalized: "run", role: "action", rule: "action:lexicon" },
      { text: "the", normalized: "the", role: "unknown", rule: "fallback:unknown" },
      { text: "server.", normalized: "server", role: "object", rule: "object:lexicon" }
    ],
    {
      action: "load",
      object: "config",
      relation: null,
      condition: null,
      purpose: { marker: "to", text: "run server" }
    }
  ),
  createFixture(
    "if-server-uses-config",
    "If the server uses the config, load the file.",
    [
      { text: "If", normalized: "if", role: "condition", rule: "condition:marker" },
      { text: "the", normalized: "the", role: "unknown", rule: "fallback:unknown" },
      { text: "server", normalized: "server", role: "object", rule: "object:lexicon" },
      { text: "uses", normalized: "use", role: "action", rule: "action:alias" },
      { text: "the", normalized: "the", role: "unknown", rule: "fallback:unknown" },
      { text: "config,", normalized: "config", role: "object", rule: "object:lexicon" },
      { text: "load", normalized: "load", role: "action", rule: "action:lexicon" },
      { text: "the", normalized: "the", role: "unknown", rule: "fallback:unknown" },
      { text: "file.", normalized: "file", role: "object", rule: "object:lexicon" }
    ],
    {
      action: "use",
      object: "config",
      relation: null,
      condition: { marker: "if", text: "server use config" },
      purpose: null
    }
  ),
  createFixture(
    "when-request-uses-model",
    "When the request uses the model, create the response.",
    [
      { text: "When", normalized: "when", role: "condition", rule: "condition:marker" },
      { text: "the", normalized: "the", role: "unknown", rule: "fallback:unknown" },
      { text: "request", normalized: "request", role: "object", rule: "object:lexicon" },
      { text: "uses", normalized: "use", role: "action", rule: "action:alias" },
      { text: "the", normalized: "the", role: "unknown", rule: "fallback:unknown" },
      { text: "model,", normalized: "model", role: "object", rule: "object:lexicon" },
      { text: "create", normalized: "create", role: "action", rule: "action:lexicon" },
      { text: "the", normalized: "the", role: "unknown", rule: "fallback:unknown" },
      { text: "response.", normalized: "response", role: "object", rule: "object:lexicon" }
    ],
    {
      action: "use",
      object: "model",
      relation: null,
      condition: { marker: "when", text: "request use model" },
      purpose: null
    }
  )
];
