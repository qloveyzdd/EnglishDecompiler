import type { ParseRole } from "@/index.js";
import { Button } from "@/components/ui/button";
import { roleMeta, roleOrder } from "@/lib/demo";

interface RolePickerProps {
  currentRole: ParseRole;
  onChange: (role: ParseRole) => void;
}

export function RolePicker({ currentRole, onChange }: RolePickerProps) {
  return (
    <div className="space-y-2 rounded-2xl border border-border/80 bg-background/80 p-4">
      <p className="text-sm font-semibold text-foreground">Change role</p>
      <div className="flex flex-wrap gap-2">
        {roleOrder.map((role) => (
          <Button
            key={role}
            type="button"
            size="sm"
            variant={role === currentRole ? "default" : "outline"}
            aria-pressed={role === currentRole}
            onClick={() => onChange(role)}
            className={role === currentRole ? "" : roleMeta[role].chipClassName}
          >
            {`Set role: ${role}`}
          </Button>
        ))}
      </div>
    </div>
  );
}
