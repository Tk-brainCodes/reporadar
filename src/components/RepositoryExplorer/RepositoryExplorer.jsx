"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
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
    return (_jsx("section", { className: cn(styles.explorerSection, className), id: "explorer", children: _jsxs("div", { className: styles.container, children: [_jsx("div", { className: styles.header, children: _jsxs("div", { className: styles.headerTop, children: [_jsxs("div", { children: [_jsx("h2", { className: styles.title, children: "Rising this week" }), _jsx("p", { className: styles.description, children: "Explore recently created repositories attracting attention from the developer community." })] }), _jsx(StatusIndicator, { status: state.status, isRefreshing: state.isRefreshing })] }) }), _jsx(ExplorerFilters, { language: state.language, timeWindow: state.timeWindow, sort: state.sort, searchQuery: state.searchQuery, isRefreshing: state.isRefreshing, onLanguageChange: actions.setLanguage, onTimeWindowChange: actions.setTimeWindow, onSortChange: actions.setSort, onSearchChange: actions.setSearchQuery, onRefresh: actions.refresh }), state.error && state.repositories.length === 0 ? (_jsx(ExplorerErrorState, { error: state.error, onRetry: actions.refresh, isRetrying: state.isRefreshing })) : (_jsx(RepositoryGrid, { repositories: state.filteredRepositories, isLoading: state.isLoading, isSearchActive: isSearchActive, onResetFilters: actions.resetFilters })), canLoadMore && !state.isLoading && !state.error && (_jsx("div", { className: styles.loadMoreWrapper, children: _jsx(Button, { variant: "secondary", size: "md", onClick: actions.loadMore, isLoading: state.isLoading, children: "Load more rising repositories (up to 12)" }) }))] }) }));
}
