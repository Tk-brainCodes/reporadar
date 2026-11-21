import type { LanguageValue, SortValue, TimeWindowValue } from "@/lib/constants";

export interface GitHubOwner {
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  created_at: string;
  updated_at: string;
  owner: GitHubOwner;
  topics?: string[];
}

export interface GitHubSearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubRepository[];
}

export interface RepositoryQueryParams {
  timeWindow: TimeWindowValue;
  language: LanguageValue;
  sort: SortValue;
  perPage: number;
}

export type CacheStatus = "fresh" | "cached" | "stale" | "refreshing";

export interface FetchResult {
  data: GitHubSearchResponse;
  status: CacheStatus;
}

export interface GitHubServiceError {
  message: string;
  isRateLimit: boolean;
  status?: number;
  fallbackData?: GitHubSearchResponse | null;
}
