import { GITHUB_SEARCH_API } from "@/lib/constants";
import { getSinceDate } from "@/lib/date";
import { getCachedData, setCachedData } from "@/lib/cache";
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

const activeRequests = new Map<string, Promise<FetchResult>>();

export function buildCacheKey(params: RepositoryQueryParams): string {
  return `${params.timeWindow}_${params.language}_${params.sort}_${params.perPage}`;
}

export function buildGitHubQuery(params: RepositoryQueryParams): string {
  const days = params.timeWindow === "30d" ? 30 : 7;
  const sinceDate = getSinceDate(days);

  const queryParts = [`created:>=${sinceDate}`];

  if (params.language !== "all") {
    queryParts.push(`language:${params.language}`);
  }

  const searchParams = new URLSearchParams({
    q: queryParts.join(" "),
    sort: params.sort === "forks" ? "forks" : params.sort === "created" ? "updated" : "stars",
    order: "desc",
    per_page: String(params.perPage),
  });

  return `${GITHUB_SEARCH_API}?${searchParams.toString()}`;
}

export async function fetchRepositories(
  params: RepositoryQueryParams,
  options: { bypassCache?: boolean; signal?: AbortSignal } = {}
): Promise<FetchResult> {
  const cacheKey = buildCacheKey(params);

  if (!options.bypassCache) {
    const cached = getCachedData<GitHubSearchResponse>(cacheKey);
    if (cached.exists && cached.data && !cached.isStale) {
      return {
        data: cached.data,
        status: "cached",
      };
    }
  }

  if (activeRequests.has(cacheKey) && !options.bypassCache) {
    return activeRequests.get(cacheKey)!;
  }

  const requestPromise = (async (): Promise<FetchResult> => {
    const url = buildGitHubQuery(params);

    try {
      const response = await fetch(url, {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        signal: options.signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const isRateLimit =
          response.status === 403 ||
          response.status === 429 ||
          (typeof errorData.message === "string" &&
            errorData.message.toLowerCase().includes("rate limit"));

        const cached = getCachedData<GitHubSearchResponse>(cacheKey);

        const error: GitHubServiceError = {
          message: isRateLimit
            ? "GitHub API rate limit exceeded. Unauthenticated requests are limited to 60 per hour."
            : errorData.message || `GitHub API error: ${response.status} ${response.statusText}`,
          isRateLimit,
          status: response.status,
          fallbackData: cached.data,
        };

        throw error;
      }

      const json = (await response.json()) as GitHubSearchResponse;

      if (!json || !Array.isArray(json.items)) {
        throw new Error("Invalid GitHub API response structure");
      }

      setCachedData(cacheKey, json);

      return {
        data: json,
        status: "fresh",
      };
    } catch (err) {
      if ((err as Error)?.name === "AbortError") {
        throw err;
      }

      const cached = getCachedData<GitHubSearchResponse>(cacheKey);
      if (cached.data) {
        return {
          data: cached.data,
          status: "stale",
        };
      }

      throw err;
    } finally {
      activeRequests.delete(cacheKey);
    }
  })();

  activeRequests.set(cacheKey, requestPromise);
  return requestPromise;
}
