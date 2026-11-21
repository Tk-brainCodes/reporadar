import React from "react";
import styles from "./RepositoryGrid.module.css";
import { RepositoryCard } from "@/components/RepositoryCard";
import { RepositorySkeleton } from "@/components/RepositorySkeleton";
import { ExplorerEmptyState } from "@/components/ExplorerEmptyState";
import { cn } from "@/lib/utils";
import type { RepositoryGridProps } from "./types";

export function RepositoryGrid({
  repositories,
  isLoading,
  isSearchActive,
  onResetFilters,
  className,
}: RepositoryGridProps) {
  if (isLoading && repositories.length === 0) {
    return (
      <div className={cn(styles.repoGrid, className)}>
        {Array.from({ length: 6 }).map((_, i) => (
          <RepositorySkeleton key={i} />
        ))}
      </div>
    );
  }

  if (repositories.length === 0) {
    return (
      <ExplorerEmptyState
        isSearchActive={isSearchActive}
        onReset={onResetFilters}
      />
    );
  }

  return (
    <div className={cn(styles.repoGrid, className)}>
      {repositories.map((repo) => (
        <RepositoryCard key={repo.id} repository={repo} />
      ))}
    </div>
  );
}
