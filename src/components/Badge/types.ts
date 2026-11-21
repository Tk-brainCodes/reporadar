import type { ReactNode } from "react";

export type BadgeVariant = "default" | "radar" | "outline" | "warning" | "info" | "stale";
export type BadgeSize = "sm" | "md";

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  dot?: boolean;
}
