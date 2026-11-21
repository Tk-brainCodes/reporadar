import React from "react";
import styles from "./Badge.module.css";
import { cn } from "@/lib/utils";
import type { BadgeProps } from "./types";

export function Badge({
  children,
  variant = "default",
  size = "sm",
  className,
  dot = false,
}: BadgeProps) {
  return (
    <span
      className={cn(
        styles.badge,
        styles[variant],
        styles[size],
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            styles.dot,
            variant === "radar" && styles.pulse
          )}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
