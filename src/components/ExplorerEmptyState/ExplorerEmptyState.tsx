import React from "react";
import { Radar, RotateCcw } from "lucide-react";
import styles from "./ExplorerEmptyState.module.css";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";
import type { ExplorerEmptyStateProps } from "./types";

export function ExplorerEmptyState({
  isSearchActive,
  onReset,
  className,
}: ExplorerEmptyStateProps) {
  return (
    <div className={cn(styles.emptyContainer, className)}>
      <div className={styles.emptyIconWrapper}>
        <Radar className="w-8 h-8 text-[#00f589] opacity-80" />
      </div>
      <h3 className={styles.emptyTitle}>
        {isSearchActive ? "No matching repositories found" : "No emerging repositories detected"}
      </h3>
      <p className={styles.emptyDescription}>
        {isSearchActive
          ? "No repositories match your active search filter. Try clearing the search term or adjusting language and time parameters."
          : "There are currently no repositories meeting the query threshold within this discovery window. Try expanding the time filter to 30 days or selecting All Languages."}
      </p>
      <div className="pt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          leftIcon={<RotateCcw className="w-4 h-4" />}
        >
          Reset all filters
        </Button>
      </div>
    </div>
  );
}
