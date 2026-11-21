import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import styles from "./RepositoryGrid.module.css";
import { RepositoryCard } from "@/components/RepositoryCard";
import { RepositorySkeleton } from "@/components/RepositorySkeleton";
import { ExplorerEmptyState } from "@/components/ExplorerEmptyState";
import { cn } from "@/lib/utils";
export function RepositoryGrid({ repositories, isLoading, isSearchActive, onResetFilters, className, }) {
    if (isLoading && repositories.length === 0) {
        return (_jsx("div", { className: cn(styles.repoGrid, className), children: Array.from({ length: 6 }).map((_, i) => (_jsx(RepositorySkeleton, {}, i))) }));
    }
    if (repositories.length === 0) {
        return (_jsx(ExplorerEmptyState, { isSearchActive: isSearchActive, onReset: onResetFilters }));
    }
    return (_jsx("div", { className: cn(styles.repoGrid, className), children: repositories.map((repo) => (_jsx(RepositoryCard, { repository: repo }, repo.id))) }));
}
