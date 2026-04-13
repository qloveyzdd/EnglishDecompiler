import type { ParseResult, ParseRole } from "@/index.js";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { RoleChip } from "@/components/demo/role-chip";
import { RoleLegend } from "@/components/demo/role-legend";
import { RolePicker } from "@/components/demo/role-picker";
import { SummaryStrip } from "@/components/demo/summary-strip";
import { TokenInspector } from "@/components/demo/token-inspector";

interface TokenPaneProps {
  baseResult: ParseResult | null;
  result: ParseResult | null;
  error: string | null;
  needsReparse: boolean;
  selectedTokenIndex: number | null;
  hasSavedCorrections: boolean;
  onSelectToken: (index: number) => void;
  onChangeRole: (role: ParseRole) => void;
}

export function TokenPane({
  baseResult,
  result,
  error,
  needsReparse,
  selectedTokenIndex,
  hasSavedCorrections,
  onSelectToken,
  onChangeRole
}: TokenPaneProps) {
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

  const selectedSpan = selectedTokenIndex === null ? null : (result.spans.find((span) => span.index === selectedTokenIndex) ?? null);
  const originalSpan =
    selectedTokenIndex === null || baseResult === null
      ? null
      : (baseResult.spans.find((span) => span.index === selectedTokenIndex) ?? null);
  const selectedIsSaved = selectedSpan !== null && originalSpan !== null && selectedSpan.role !== originalSpan.role;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <RoleLegend />
      {hasSavedCorrections ? (
        <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-primary/15 bg-primary/6 px-4 py-3 text-sm text-muted-foreground">
          <Badge className="bg-primary/10 text-primary">Saved locally</Badge>
          <p>Corrections for this sentence stay in this browser only.</p>
        </div>
      ) : null}
      <SummaryStrip result={result} />
      <TokenInspector span={selectedSpan} originalRole={originalSpan?.role} isSaved={selectedIsSaved} />
      {selectedSpan !== null ? <RolePicker currentRole={selectedSpan.role} onChange={onChangeRole} /> : null}
      <Separator />
      <ScrollArea className="pretty-scrollbar h-[24rem] rounded-2xl border border-border/70 bg-background/70">
        <div className="flex flex-wrap gap-3 p-4">
          {result.spans.map((span) => (
            <RoleChip
              key={`${span.index}-${span.start}-${span.text}`}
              span={span}
              selected={span.index === selectedTokenIndex}
              onSelect={() => onSelectToken(span.index)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
