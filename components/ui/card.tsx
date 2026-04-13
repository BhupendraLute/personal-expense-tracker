import { PropsWithChildren } from "react";
import { cn } from "@/utils/cn";

export const Card = ({ children, className }: PropsWithChildren<{ className?: string }>) => (
  <div className={cn("rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm transition-all duration-300 hover:shadow-md", className)}>
    {children}
  </div>
);
