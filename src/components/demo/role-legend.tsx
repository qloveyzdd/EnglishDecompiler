import { Badge } from "@/components/ui/badge";
import { roleMeta, roleOrder } from "@/lib/demo";

export function RoleLegend() {
  return (
    <div className="flex flex-wrap gap-2">
      {roleOrder.map((role) => (
        <Badge key={role} variant="outline" className={roleMeta[role].chipClassName}>
          {roleMeta[role].label}
        </Badge>
      ))}
    </div>
  );
}
