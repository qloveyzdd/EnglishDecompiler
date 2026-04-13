import type { ParseResult } from "@/index.js";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { RoleChip } from "@/components/demo/role-chip";
import { RoleLegend } from "@/components/demo/role-legend";
import { SummaryStrip } from "@/components/demo/summary-strip";

interface TokenPaneProps {
  result: ParseResult | null;
  error: string | null;
  needsReparse: boolean;
}

export function TokenPane({ result, error, needsReparse }: TokenPaneProps) {
  if (error !== null) {
    return (
      <div className="rounded-2xl border border-dashed border-destructive/30 bg-destructive/5 px-4 py-5 text-sm text-destructive">
        {error}
      </div>
    );
  }

  if (result === null) {
    return (
      <div className="space-y-4 rounded-2xl border border-dashed border-border bg-background/70 px-4 py-5 text-sm text-muted-foreground">
        <RoleLegend />
        <Separator />
        <div className="space-y-2">
          <p className="font-semibold text-foreground">
            {needsReparse ? "Input changed. Parse again to refresh token roles." : "Parse a sentence to inspect token roles."}
          </p>
          <p>
            {needsReparse
              ? "The previous result was cleared so the panes stay honest about the current input."
              : "The middle pane keeps the parser visible: original spans stay in order, including unknown tokens."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <RoleLegend />
      <SummaryStrip result={result} />
      <Separator />
      <ScrollArea className="pretty-scrollbar h-[24rem] rounded-2xl border border-border/70 bg-background/70">
        <div className="flex flex-wrap gap-3 p-4">
          {result.spans.map((span) => (
            <RoleChip key={`${span.index}-${span.start}-${span.text}`} span={span} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
