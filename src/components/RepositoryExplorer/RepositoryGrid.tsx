import React from "react";
import styles from "./RepositoryExplorer.module.css";
import { RepositoryCard } from "./RepositoryCard";
import { RepositorySkeleton } from "./RepositorySkeleton";
import { ExplorerEmptyState } from "./ExplorerEmptyState";
import type { GitHubRepository } from "@/lib/github";

interface RepositoryGridProps {
  repositories: GitHubRepository[];
  isLoading: boolean;
  isSearchActive: boolean;
  onResetFilters: () => void;
}

export function RepositoryGrid({
  repositories,
  isLoading,
  isSearchActive,
  onResetFilters,
}: RepositoryGridProps) {
  if (isLoading && repositories.length === 0) {
    return (
      <div className={styles.repoGrid}>
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
    <div className={styles.repoGrid}>
      {repositories.map((repo) => (
        <RepositoryCard key={repo.id} repository={repo} />
      ))}
    </div>
  );
}
