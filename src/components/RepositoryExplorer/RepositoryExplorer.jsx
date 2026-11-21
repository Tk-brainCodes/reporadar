"use client";

import styles from "./RepositoryExplorer.module.css";
import { useRepositories } from "./useRepositories";
import { StatusIndicator } from "@/components/StatusIndicator";
import { ExplorerFilters } from "@/components/ExplorerFilters";
import { RepositoryGrid } from "@/components/RepositoryGrid";
import { ExplorerErrorState } from "@/components/ExplorerErrorState";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";

export function RepositoryExplorer({ className }) {
  const [state, actions] = useRepositories();
  const isSearchActive = Boolean(state.searchQuery.trim());
  const canLoadMore = state.perPage < 12 && state.repositories.length >= state.perPage;

  return (
    <section className={cn(styles.explorerSection, className)} id="explorer">
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <h2 className={styles.title}>Browse recent GitHub projects</h2>
            <p className={styles.description}>
              Choose a creation window and language. Results are sorted by total stars unless you change the sort.
            </p>
          </div>
          <StatusIndicator status={state.status} isRefreshing={state.isRefreshing} />
        </header>

        <ExplorerFilters
          language={state.language}
          timeWindow={state.timeWindow}
          sort={state.sort}
          searchQuery={state.searchQuery}
          isRefreshing={state.isRefreshing}
          onLanguageChange={actions.setLanguage}
          onTimeWindowChange={actions.setTimeWindow}
          onSortChange={actions.setSort}
          onSearchChange={actions.setSearchQuery}
          onRefresh={actions.refresh}
        />

        {state.error && state.repositories.length === 0 ? (
          <ExplorerErrorState error={state.error} onRetry={actions.refresh} isRetrying={state.isRefreshing} />
        ) : (
          <RepositoryGrid
            repositories={state.filteredRepositories}
            isLoading={state.isLoading}
            isSearchActive={isSearchActive}
            onResetFilters={actions.resetFilters}
          />
        )}

        {canLoadMore && !state.isLoading && !state.error && (
          <div className={styles.loadMoreWrapper}>
            <Button variant="secondary" size="md" onClick={actions.loadMore} isLoading={state.isLoading}>
              Load more repositories
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
