"use client";

import React from "react";
import styles from "./RepositoryExplorer.module.css";
import { useRepositories } from "./useRepositories";
import { StatusIndicator } from "@/components/StatusIndicator";
import { ExplorerFilters } from "@/components/ExplorerFilters";
import { RepositoryGrid } from "@/components/RepositoryGrid";
import { ExplorerErrorState } from "@/components/ExplorerErrorState";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";
import type { RepositoryExplorerProps } from "./types";

export function RepositoryExplorer({ className }: RepositoryExplorerProps) {
  const [state, actions] = useRepositories();

  const isSearchActive = Boolean(state.searchQuery.trim());
  const canLoadMore = state.perPage < 12 && state.repositories.length >= state.perPage;

  return (
    <section className={cn(styles.explorerSection, className)} id="explorer">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <div>
              <h2 className={styles.title}>Rising this week</h2>
              <p className={styles.description}>
                Explore recently created repositories attracting attention from
                the developer community.
              </p>
            </div>

            <StatusIndicator
              status={state.status}
              isRefreshing={state.isRefreshing}
            />
          </div>
        </div>

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
          <ExplorerErrorState
            error={state.error}
            onRetry={actions.refresh}
            isRetrying={state.isRefreshing}
          />
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
            <Button
              variant="secondary"
              size="md"
              onClick={actions.loadMore}
              isLoading={state.isLoading}
            >
              Load more rising repositories (up to 12)
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
