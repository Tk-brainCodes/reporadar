import React from "react";
import { Badge } from "@/components/Badge";
import type { CacheStatus } from "@/lib/github";

interface StatusIndicatorProps {
  status: CacheStatus;
  isRefreshing?: boolean;
}

export function StatusIndicator({ status, isRefreshing }: StatusIndicatorProps) {
  if (isRefreshing || status === "refreshing") {
    return (
      <Badge variant="info" size="sm" dot>
        Refreshing GitHub data...
      </Badge>
    );
  }

  if (status === "fresh") {
    return (
      <Badge variant="radar" size="sm" dot>
        Fresh API Data
      </Badge>
    );
  }

  if (status === "cached") {
    return (
      <Badge variant="default" size="sm">
        Cached (10m TTL)
      </Badge>
    );
  }

  return (
    <Badge variant="stale" size="sm">
      Stale Cache Fallback
    </Badge>
  );
}
