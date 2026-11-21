import type { GitHubRepository, CacheStatus, GitHubServiceError } from "@/lib/github";
import type { LanguageValue, SortValue, TimeWindowValue } from "@/lib/constants";

export interface ExplorerState {
  repositories: GitHubRepository[];
  filteredRepositories: GitHubRepository[];
  isLoading: boolean;
  isRefreshing: boolean;
  error: GitHubServiceError | null;
  status: CacheStatus;
  language: LanguageValue;
  timeWindow: TimeWindowValue;
  sort: SortValue;
  perPage: number;
  searchQuery: string;
}

export interface ExplorerActions {
  setLanguage: (lang: LanguageValue) => void;
  setTimeWindow: (window: TimeWindowValue) => void;
  setSort: (sort: SortValue) => void;
  setSearchQuery: (query: string) => void;
  refresh: () => Promise<void>;
  loadMore: () => void;
  resetFilters: () => void;
}

export interface RepositoryExplorerProps {
  className?: string;
}
