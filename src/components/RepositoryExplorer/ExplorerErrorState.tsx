import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import styles from "./RepositoryExplorer.module.css";
import { Button } from "@/components/Button";
import type { GitHubServiceError } from "@/lib/github";

interface ExplorerErrorStateProps {
  error: GitHubServiceError;
  onRetry: () => void;
  isRetrying?: boolean;
}

export function ExplorerErrorState({ error, onRetry, isRetrying }: ExplorerErrorStateProps) {
  return (
    <div className={styles.errorContainer} role="alert">
      <div className={styles.errorIconWrapper}>
        <AlertTriangle className="w-8 h-8 text-[#ef4444]" />
      </div>
      <h3 className={styles.errorTitle}>
        {error.isRateLimit ? "GitHub Rate Limit Reached" : "Unable to Fetch Repositories"}
      </h3>
      <p className={styles.errorDescription}>
        {error.isRateLimit
          ? "GitHub has temporarily limited requests for unauthenticated clients (60 requests per hour). Cached results will continue to be displayed if available. Please wait a short while and try again."
          : error.message}
      </p>
      <div className="pt-3">
        <Button
          variant="secondary"
          size="sm"
          onClick={onRetry}
          isLoading={isRetrying}
          leftIcon={<RefreshCw className="w-4 h-4" />}
        >
          Try again
        </Button>
      </div>
    </div>
  );
}
