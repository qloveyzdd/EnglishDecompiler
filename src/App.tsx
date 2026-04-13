import { useEffect, useRef, useState } from "react";
import { Copy, Play, Sparkles } from "lucide-react";
import { parseSentence, type ParseResult, type ParseRole } from "./index.js";
import { ExampleChips } from "@/components/demo/example-chips";
import { IrPane } from "@/components/demo/ir-pane";
import { JsonPane } from "@/components/demo/json-pane";
import { PaneShell } from "@/components/demo/pane-shell";
import { TokenPane } from "@/components/demo/token-pane";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { applyRoleOverrides, type SpanRoleOverride } from "@/lib/corrections.js";
import { demoExamples } from "@/lib/demo";
import { clearSentenceCorrections, loadSentenceCorrections, saveSentenceCorrections } from "@/lib/correction-storage.js";
import { renderIr } from "@/lib/ir.js";

type CopyState = "idle" | "success" | "error";

const emptyStateHelp = "Paste one sentence from a README, API doc, or setup guide, then run the parser.";
const parseErrorMessage = "Parse failed: this sentence is outside the v0 rule set. Try a shorter technical sentence.";

export function App() {
  const [draftInput, setDraftInput] = useState("");
  const [baseResult, setBaseResult] = useState<ParseResult | null>(null);
  const [overrides, setOverrides] = useState<SpanRoleOverride[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const [needsReparse, setNeedsReparse] = useState(false);
  const [selectedTokenIndex, setSelectedTokenIndex] = useState<number | null>(null);
  const copyResetRef = useRef<number | null>(null);
  const result = baseResult === null ? null : applyRoleOverrides(baseResult, overrides);

  useEffect(() => {
    return () => {
      if (copyResetRef.current !== null) {
        window.clearTimeout(copyResetRef.current);
      }
    };
  }, []);

  const formattedJson = result === null ? "" : JSON.stringify(result, null, 2);
  const irText = result === null ? "" : renderIr(result);

  function clearCopyTimer() {
    if (copyResetRef.current !== null) {
      window.clearTimeout(copyResetRef.current);
      copyResetRef.current = null;
    }
  }

  function handleDraftChange(nextValue: string) {
    setDraftInput(nextValue);

    if (baseResult !== null || error !== null) {
      setBaseResult(null);
      setOverrides([]);
      setError(null);
      setCopyState("idle");
      setNeedsReparse(true);
      setSelectedTokenIndex(null);
      clearCopyTimer();
    }
  }

  function handleExampleSelect(value: string) {
    handleDraftChange(value);
  }

  function handleParse() {
    const trimmedInput = draftInput.trim();

    try {
      const nextBaseResult = parseSentence(trimmedInput);
      const nextOverrides = loadSentenceCorrections(trimmedInput);
      setBaseResult(nextBaseResult);
      setOverrides(nextOverrides);
      setError(null);
      setCopyState("idle");
      setNeedsReparse(false);
      setSelectedTokenIndex(null);
      clearCopyTimer();
    } catch {
      setBaseResult(null);
      setOverrides([]);
      setError(parseErrorMessage);
      setCopyState("idle");
      setNeedsReparse(false);
      setSelectedTokenIndex(null);
      clearCopyTimer();
    }
  }

  function handleSelectToken(index: number) {
    setSelectedTokenIndex((current) => (current === index ? null : index));
  }

  function handleChangeRole(role: ParseRole) {
    if (baseResult === null || selectedTokenIndex === null) {
      return;
    }

    const originalSpan = baseResult.spans.find((span) => span.index === selectedTokenIndex) ?? null;
    if (originalSpan === null) {
      return;
    }

    const nextOverrides = overrides.filter((override) => override.tokenIndex !== selectedTokenIndex);
    if (role !== originalSpan.role) {
      nextOverrides.push({ tokenIndex: selectedTokenIndex, role });
      nextOverrides.sort((left, right) => left.tokenIndex - right.tokenIndex);
      saveSentenceCorrections(baseResult.input, nextOverrides);
    } else {
      clearSentenceCorrections(baseResult.input);
      if (nextOverrides.length > 0) {
        saveSentenceCorrections(baseResult.input, nextOverrides);
      }
    }

    setOverrides(nextOverrides);
    setCopyState("idle");
    clearCopyTimer();
  }

  async function handleCopyJson() {
    if (result === null) {
      return;
    }

    try {
      await navigator.clipboard.writeText(formattedJson);
      setCopyState("success");
      clearCopyTimer();
      copyResetRef.current = window.setTimeout(() => {
        setCopyState("idle");
      }, 1500);
    } catch {
      setCopyState("error");
    }
  }

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto flex w-full max-w-[1520px] flex-col gap-6">
        <section className="rounded-[24px] border border-white/70 bg-white/78 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                <Sparkles className="size-3.5" />
                Local Demo v0
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-[2.2rem]">
                  Inspect technical English like parser output, not black-box translation.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                  This workbench stays blank on first load, keeps parsing explicit, and shows the same parser contract that powers the library.
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-background/70 px-4 py-3 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">Example coverage</p>
              <p className="mt-1">{demoExamples.length} approved demo sentences are ready as helper chips.</p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.05fr_1.1fr_1fr]">
          <PaneShell
            title="Source Sentence"
            description={emptyStateHelp}
            contentClassName="gap-5"
          >
            <div className="space-y-3">
              <label htmlFor="source-sentence" className="text-sm font-semibold text-foreground">
                Paste technical English
              </label>
              <Textarea
                id="source-sentence"
                value={draftInput}
                onChange={(event) => handleDraftChange(event.target.value)}
                placeholder="Initialize the model before training."
                className="min-h-[15rem] resize-none border-border bg-white/90 p-4 text-base leading-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]"
              />
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-foreground">Quick examples</p>
                <p className="text-sm text-muted-foreground">These only fill the textarea. Parsing still happens when you click the button.</p>
              </div>
              <ExampleChips currentInput={draftInput} onSelect={handleExampleSelect} />
            </div>

            <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/80 pt-4">
              <p className="text-sm text-muted-foreground">
                {needsReparse ? "Input changed since the last parse." : "The parser runs only on explicit action."}
              </p>
              <Button type="button" className="min-w-36" disabled={!draftInput.trim()} onClick={handleParse}>
                <Play className="size-4" />
                Parse Sentence
              </Button>
            </div>
          </PaneShell>

          <PaneShell
            title="Token Roles"
            description="Span order stays intact so you can inspect what the parser actually saw."
            className="border-primary/15"
          >
            <TokenPane
              baseResult={baseResult}
              result={result}
              error={error}
              needsReparse={needsReparse}
              selectedTokenIndex={selectedTokenIndex}
              hasSavedCorrections={overrides.length > 0}
              onSelectToken={handleSelectToken}
              onChangeRole={handleChangeRole}
            />
          </PaneShell>

          <PaneShell
            title="Structured Outputs"
            description="JSON and IR always mirror the same corrected parse result."
            action={
              <Button type="button" variant="outline" disabled={result === null} onClick={handleCopyJson}>
                <Copy className="size-4" />
                {copyState === "success" ? "Copied JSON" : "Copy JSON"}
              </Button>
            }
            contentClassName="gap-5"
          >
            <div className="space-y-2">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-foreground">Structured JSON</p>
                <p className="text-sm text-muted-foreground">Exact visible parse payload, including any local corrections.</p>
              </div>
              <JsonPane
                result={result}
                error={error}
                needsReparse={needsReparse}
                formattedJson={formattedJson}
                copyState={copyState}
              />
            </div>
            <IrPane irText={irText} error={error} needsReparse={needsReparse} hasResult={result !== null} />
          </PaneShell>
        </section>
      </div>
    </main>
  );
}
