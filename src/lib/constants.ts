export const LANGUAGES = [
  { label: "All Languages", value: "all" },
  { label: "TypeScript", value: "typescript" },
  { label: "JavaScript", value: "javascript" },
  { label: "Python", value: "python" },
  { label: "Rust", value: "rust" },
  { label: "Go", value: "go" },
  { label: "Java", value: "java" },
  { label: "C++", value: "cpp" },
  { label: "Swift", value: "swift" },
  { label: "Kotlin", value: "kotlin" },
  { label: "PHP", value: "php" },
  { label: "Ruby", value: "ruby" },
] as const;

export type LanguageValue = (typeof LANGUAGES)[number]["value"];

export const TIME_WINDOWS = [
  { label: "Last 7 days", value: "7d", days: 7 },
  { label: "Last 30 days", value: "30d", days: 30 },
] as const;

export type TimeWindowValue = (typeof TIME_WINDOWS)[number]["value"];

export const SORT_OPTIONS = [
  { label: "Most stars", value: "stars" },
  { label: "Most forks", value: "forks" },
  { label: "Recently created", value: "created" },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]["value"];

export const DEFAULT_QUERY_CONFIG = {
  timeWindow: "7d" as TimeWindowValue,
  language: "all" as LanguageValue,
  sort: "stars" as SortValue,
  perPage: 6,
  maxResults: 12,
} as const;

export const CACHE_TTL_MS = 10 * 60 * 1000;
export const CACHE_PREFIX = "reporadar_cache_";

export const GITHUB_SEARCH_API = "https://api.github.com/search/repositories";
export const GITHUB_REPO_URL = "https://github.com/topics/awesome";
