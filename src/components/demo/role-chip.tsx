import type { ParseSpan } from "@/index.js";
import { roleMeta } from "@/lib/demo";
import { cn } from "@/lib/utils";

interface RoleChipProps {
  span: ParseSpan;
  selected: boolean;
  onSelect: () => void;
}

export function RoleChip({ span, selected, onSelect }: RoleChipProps) {
  const meta = roleMeta[span.role];

  return (
    <button
      type="button"
      aria-pressed={selected}
      data-testid={`role-chip-${span.index}`}
      onClick={onSelect}
      className={cn(
        "inline-flex min-h-11 items-center gap-3 rounded-full border px-3 py-2 text-left text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] transition focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        selected ? "ring-2 ring-primary shadow-[0_0_0_1px_rgba(15,108,189,0.18)]" : "",
        meta.chipClassName
      )}
    >
      <span className="font-medium">{span.text}</span>
      <span className="rounded-full bg-white/70 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em]">
        {span.role}
      </span>
    </button>
  );
}
