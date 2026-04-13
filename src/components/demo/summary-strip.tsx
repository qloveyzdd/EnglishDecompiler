import type { ParseResult } from "@/index.js";
import { Badge } from "@/components/ui/badge";
import { getSummaryEntries, roleMeta } from "@/lib/demo";

interface SummaryStripProps {
  result: ParseResult;
}

export function SummaryStrip({ result }: SummaryStripProps) {
  const entries = getSummaryEntries(result.summary);

  if (entries.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {entries.map((entry) => (
        <Badge key={`${entry.label}:${entry.value}`} variant="outline" className={`gap-2 ${roleMeta[entry.role].chipClassName}`}>
          <span className="font-semibold">{entry.label}</span>
          <span>{entry.value}</span>
        </Badge>
      ))}
    </div>
  );
}
