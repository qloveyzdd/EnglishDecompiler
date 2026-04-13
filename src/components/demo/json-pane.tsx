import type { ParseResult } from "@/index.js";
import { ScrollArea } from "@/components/ui/scroll-area";

interface JsonPaneProps {
  result: ParseResult | null;
  error: string | null;
  needsReparse: boolean;
  formattedJson: string;
  copyState: "idle" | "success" | "error";
}

export function JsonPane({ result, error, needsReparse, formattedJson, copyState }: JsonPaneProps) {
  if (error !== null) {
    return (
      <div className="rounded-2xl border border-dashed border-destructive/30 bg-destructive/5 px-4 py-5 text-sm text-destructive">
        {error}
      </div>
    );
  }

  if (result === null) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-background/70 px-4 py-5 text-sm text-muted-foreground">
        <p className="font-semibold text-foreground">
          {needsReparse ? "Input changed. Parse again to regenerate JSON." : "Structured JSON will appear here."}
        </p>
        <p className="mt-2">
          {needsReparse
            ? "Copy stays disabled until a fresh parse succeeds."
            : "The JSON pane shows the exact ParseResult object, including spans and summary."}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-3">
      <ScrollArea className="pretty-scrollbar h-[11rem] rounded-2xl border border-border/70 bg-[#0f172a] text-slate-100">
        <pre data-testid="json-output" className="m-0 whitespace-pre-wrap p-4 text-xs leading-6 sm:text-sm">
          {formattedJson}
        </pre>
      </ScrollArea>
      {copyState === "error" ? (
        <p className="text-sm font-medium text-destructive">Copy failed. Please copy it manually.</p>
      ) : null}
    </div>
  );
}
