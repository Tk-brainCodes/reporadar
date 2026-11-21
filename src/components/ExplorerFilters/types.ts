import type { LanguageValue, SortValue, TimeWindowValue } from "@/lib/constants";

export interface ExplorerFiltersProps {
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
  className?: string;
}
