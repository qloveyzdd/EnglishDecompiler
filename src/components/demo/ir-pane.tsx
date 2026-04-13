import { ScrollArea } from "@/components/ui/scroll-area";

interface IrPaneProps {
  irText: string;
  error: string | null;
  needsReparse: boolean;
  hasResult: boolean;
}

export function IrPane({ irText, error, needsReparse, hasResult }: IrPaneProps) {
  if (error !== null) {
    return (
      <div className="space-y-2">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-foreground">Code-like IR</p>
          <p className="text-sm text-muted-foreground">A compact view built from the same corrected parse state.</p>
        </div>
        <div className="rounded-2xl border border-dashed border-destructive/30 bg-destructive/5 px-4 py-5 text-sm text-destructive">
          {error}
        </div>
      </div>
    );
  }

  if (!hasResult) {
    return (
      <div className="space-y-2">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-foreground">Code-like IR</p>
          <p className="text-sm text-muted-foreground">A compact view built from the same corrected parse state.</p>
        </div>
        <div className="rounded-2xl border border-dashed border-border bg-background/70 px-4 py-5 text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">
            {needsReparse ? "Input changed. Parse again to regenerate IR." : "Parse a sentence to generate IR."}
          </p>
          <p className="mt-2">
            {needsReparse
              ? "The IR view clears with the JSON view so the outputs stay honest."
              : "This pane turns the current parse into a compact code-like representation."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <p className="text-sm font-semibold text-foreground">Code-like IR</p>
        <p className="text-sm text-muted-foreground">A compact view built from the same corrected parse state.</p>
      </div>
      <ScrollArea className="pretty-scrollbar h-[11rem] rounded-2xl border border-border/70 bg-[#0f172a] text-slate-100">
        <pre data-testid="ir-output" className="m-0 whitespace-pre-wrap p-4 text-xs leading-6 sm:text-sm">
          {irText}
        </pre>
      </ScrollArea>
    </div>
  );
}
