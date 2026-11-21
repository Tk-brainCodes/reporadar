import styles from "./RepositoryGrid.module.css";
import { RepositoryCard } from "@/components/RepositoryCard";
import { RepositorySkeleton } from "@/components/RepositorySkeleton";
import { ExplorerEmptyState } from "@/components/ExplorerEmptyState";
import { cn } from "@/lib/utils";

export function RepositoryGrid({
  repositories,
  isLoading,
  isSearchActive,
  onResetFilters,
  className,
}) {
  if (isLoading && repositories.length === 0) {
    return (
      <div className={cn(styles.repoGrid, className)} role="status" aria-live="polite" aria-busy="true" aria-label="Loading repositories">
        {Array.from({ length: 6 }, (_, index) => (
          <RepositorySkeleton key={index} />
        ))}
      </div>
    );
  }

  if (repositories.length === 0) {
    return (
      <ExplorerEmptyState
        isSearchActive={isSearchActive}
        onReset={onResetFilters}
        className={className}
      />
    );
  }

  return (
    <div className={cn(styles.repoGrid, className)}>
      {repositories.map((repository) => (
        <RepositoryCard key={repository.id} repository={repository} />
      ))}
    </div>
  );
}
