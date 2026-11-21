import { RefreshCw, Search, X } from "lucide-react";
import styles from "./ExplorerFilters.module.css";
import { LANGUAGES, TIME_WINDOWS, SORT_OPTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

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
  className,
}) {
  return (
    <div className={cn(styles.filterBar, className)}>
      <div className={styles.filterTopRow}>
        <label className={styles.searchWrapper}>
          <Search aria-hidden="true" className={styles.searchIcon} />
          <span className={styles.srOnly}>Filter repositories</span>
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Filter by repository, owner, or topic"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
          />
          {searchQuery && (
            <button type="button" className={styles.clearSearchButton} onClick={() => onSearchChange("")} aria-label="Clear search">
              <X aria-hidden="true" />
            </button>
          )}
        </label>

        <div className={styles.actionsCluster}>
          <div className={styles.segmentedControl} role="group" aria-label="Repository creation window">
            {TIME_WINDOWS.map((window) => (
              <button
                type="button"
                className={timeWindow === window.value ? styles.segmentedActive : styles.segmentedItem}
                onClick={() => onTimeWindowChange(window.value)}
                aria-pressed={timeWindow === window.value}
                key={window.value}
              >
                {window.label}
              </button>
            ))}
          </div>
          <label className={styles.selectWrapper}>
            <span className={styles.srOnly}>Sort repositories</span>
            <select className={styles.selectInput} value={sort} onChange={(event) => onSortChange(event.target.value)}>
              {SORT_OPTIONS.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}
            </select>
          </label>
          <button className={styles.refreshButton} type="button" onClick={onRefresh} disabled={isRefreshing}>
            <RefreshCw aria-hidden="true" className={isRefreshing ? styles.refreshing : undefined} />
            <span>{isRefreshing ? "Refreshing" : "Refresh"}</span>
          </button>
        </div>
      </div>

      <div className={styles.languageScroller} role="group" aria-label="Filter by programming language">
        {LANGUAGES.map((item) => (
          <button
            type="button"
            className={language === item.value ? styles.langChipActive : styles.langChip}
            onClick={() => onLanguageChange(item.value)}
            aria-pressed={language === item.value}
            key={item.value}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
