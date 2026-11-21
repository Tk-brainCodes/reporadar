import type { CacheStatus } from "@/lib/github-types";

export interface StatusIndicatorProps {
  status: CacheStatus;
  isRefreshing?: boolean;
  className?: string;
}
