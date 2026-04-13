import type { ReactNode } from "react";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PaneShellProps {
  title: string;
  description: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

export function PaneShell({ title, description, action, children, className, contentClassName }: PaneShellProps) {
  return (
    <Card
      className={cn(
        "min-h-[30rem] rounded-[16px] border border-border bg-card/96 shadow-[0_8px_24px_rgba(15,23,42,0.06)] backdrop-blur",
        className
      )}
    >
      <CardHeader className="gap-2 border-b border-border/80 bg-card/96">
        <div className="space-y-1">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        {action ? <CardAction>{action}</CardAction> : null}
      </CardHeader>
      <CardContent className={cn("flex flex-1 flex-col gap-4 pb-4", contentClassName)}>{children}</CardContent>
    </Card>
  );
}
