import React from "react";
import styles from "./StatusIndicator.module.css";
import { Badge } from "@/components/Badge";
import { cn } from "@/lib/utils";
import type { StatusIndicatorProps } from "./types";

export function StatusIndicator({
  status,
  isRefreshing,
  className,
}: StatusIndicatorProps) {
  if (isRefreshing || status === "refreshing") {
    return (
      <div className={cn(styles.indicatorWrapper, className)}>
        <Badge variant="info" size="sm" dot>
          Refreshing GitHub data...
        </Badge>
      </div>
    );
  }

  if (status === "fresh") {
    return (
      <div className={cn(styles.indicatorWrapper, className)}>
        <Badge variant="radar" size="sm" dot>
          Fresh API Data
        </Badge>
      </div>
    );
  }

  if (status === "cached") {
    return (
      <div className={cn(styles.indicatorWrapper, className)}>
        <Badge variant="default" size="sm">
          Cached (10m TTL)
        </Badge>
      </div>
    );
  }

  return (
    <div className={cn(styles.indicatorWrapper, className)}>
      <Badge variant="stale" size="sm">
        Stale Cache Fallback
      </Badge>
    </div>
  );
}
