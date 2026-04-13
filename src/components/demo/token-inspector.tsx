import type { ParseRole, ParseSpan } from "@/index.js";
import { Badge } from "@/components/ui/badge";
import { describeSpanRole } from "@/lib/corrections";
import { roleMeta } from "@/lib/demo";

interface TokenInspectorProps {
  span: ParseSpan | null;
  originalRole?: ParseRole;
  isSaved: boolean;
}

export function TokenInspector({ span, originalRole, isSaved }: TokenInspectorProps) {
  if (span === null) {
    return (
      <div className="rounded-2xl border border-dashed border-border/90 bg-background/70 px-4 py-4 text-sm text-muted-foreground">
        <p className="font-semibold text-foreground">Why this role</p>
        <p className="mt-2">Click a token to inspect or correct it.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border/80 bg-background/80 px-4 py-4 text-sm text-muted-foreground">
      <div className="flex flex-wrap items-center gap-2">
        <p className="font-semibold text-foreground">{span.text}</p>
        <Badge variant="outline" className={`gap-1 ${roleMeta[span.role].chipClassName}`}>
          <span>{span.role}</span>
        </Badge>
        {isSaved ? <Badge className="gap-1 bg-primary/10 text-primary">Saved locally</Badge> : null}
      </div>
      <p className="mt-3 font-semibold text-foreground">Why this role</p>
      <p className="mt-1">{describeSpanRole(span, originalRole)}</p>
      <p className="mt-2 font-mono text-xs text-muted-foreground">Rule: {span.rule}</p>
    </div>
  );
}
