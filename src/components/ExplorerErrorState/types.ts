import type { GitHubServiceError } from "@/lib/github-types";

export interface ExplorerErrorStateProps {
  error: GitHubServiceError;
  onRetry: () => void;
  isRetrying?: boolean;
  className?: string;
}
