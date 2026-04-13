import type { ParseSpan } from "@/index.js";
import { roleMeta } from "@/lib/demo";
import { cn } from "@/lib/utils";

interface RoleChipProps {
  span: ParseSpan;
}

export function RoleChip({ span }: RoleChipProps) {
  const meta = roleMeta[span.role];

  return (
    <div
      className={cn(
        "inline-flex min-h-11 items-center gap-3 rounded-full border px-3 py-2 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]",
        meta.chipClassName
      )}
    >
      <span className="font-medium">{span.text}</span>
      <span className="rounded-full bg-white/70 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em]">
        {span.role}
      </span>
    </div>
  );
}
