import React from "react";
import { Search, RefreshCw, X } from "lucide-react";
import styles from "./RepositoryExplorer.module.css";
import { LANGUAGES, TIME_WINDOWS, SORT_OPTIONS } from "@/lib/constants";
import type { LanguageValue, SortValue, TimeWindowValue } from "@/lib/constants";
import { Button } from "@/components/Button";

interface ExplorerFiltersProps {
  language: LanguageValue;
  timeWindow: TimeWindowValue;
  sort: SortValue;
  searchQuery: string;
  isRefreshing: boolean;
  onLanguageChange: (lang: LanguageValue) => void;
  onTimeWindowChange: (window: TimeWindowValue) => void;
  onSortChange: (sort: SortValue) => void;
  onSearchChange: (query: string) => void;
  onRefresh: () => void;
}

export function ExplorerFilters({
  language,
  timeWindow,
  sort,
  searchQuery,
  isRefreshing,
  onLanguageChange,
  onTimeWindowChange,
  onSortChange,
  onSearchChange,
  onRefresh,
}: ExplorerFiltersProps) {
  return (
    <div className={styles.filterBar}>
      <div className={styles.filterTopRow}>
        <div className={styles.searchWrapper}>
          <Search className={styles.searchIcon} aria-hidden="true" />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search loaded repos by name, owner, or topic..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Filter loaded repositories"
          />
          {searchQuery && (
            <button
              type="button"
              className={styles.clearSearchButton}
              onClick={() => onSearchChange("")}
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className={styles.actionsCluster}>
          <div className={styles.segmentedControl} role="radiogroup" aria-label="Creation date window">
            {TIME_WINDOWS.map((win) => {
              const active = timeWindow === win.value;
              return (
                <button
                  key={win.value}
                  type="button"
                  className={active ? styles.segmentedActive : styles.segmentedItem}
                  onClick={() => onTimeWindowChange(win.value)}
                  role="radio"
                  aria-checked={active}
                >
                  {win.label}
                </button>
              );
            })}
          </div>

          <div className={styles.selectWrapper}>
            <select
              className={styles.selectInput}
              value={sort}
              onChange={(e) => onSortChange(e.target.value as SortValue)}
              aria-label="Sort repositories by"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            isLoading={isRefreshing}
            leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
            aria-label="Refresh repository data"
          >
            Refresh
          </Button>
        </div>
      </div>

      <div className={styles.languageScroller} role="tablist" aria-label="Programming language filters">
        {LANGUAGES.map((lang) => {
          const active = language === lang.value;
          return (
            <button
              key={lang.value}
              type="button"
              className={active ? styles.langChipActive : styles.langChip}
              onClick={() => onLanguageChange(lang.value)}
              role="tab"
              aria-selected={active}
            >
              {lang.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
