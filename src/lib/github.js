import { GITHUB_SEARCH_API } from "@/lib/constants";
import { getSinceDate } from "@/lib/date";
import { getCachedData, setCachedData } from "@/lib/cache";
const activeRequests = new Map();
export function buildCacheKey(params) {
    return `${params.timeWindow}_${params.language}_${params.sort}_${params.perPage}`;
}
export function buildGitHubQuery(params) {
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
export async function fetchRepositories(params, options = {}) {
    const cacheKey = buildCacheKey(params);
    if (!options.bypassCache) {
        const cached = getCachedData(cacheKey);
        if (cached.exists && cached.data && !cached.isStale) {
            return {
                data: cached.data,
                status: "cached",
            };
        }
    }
    if (activeRequests.has(cacheKey) && !options.bypassCache) {
        return activeRequests.get(cacheKey);
    }
    const requestPromise = (async () => {
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
                const isRateLimit = response.status === 403 ||
                    response.status === 429 ||
                    (typeof errorData.message === "string" &&
                        errorData.message.toLowerCase().includes("rate limit"));
                const cached = getCachedData(cacheKey);
                const error = {
                    message: isRateLimit
                        ? "GitHub API rate limit exceeded. Unauthenticated requests are limited to 60 per hour."
                        : errorData.message || `GitHub API error: ${response.status} ${response.statusText}`,
                    isRateLimit,
                    status: response.status,
                    fallbackData: cached.data,
                };
                throw error;
            }
            const json = (await response.json());
            if (!json || !Array.isArray(json.items)) {
                throw new Error("Invalid GitHub API response structure");
            }
            setCachedData(cacheKey, json);
            return {
                data: json,
                status: "fresh",
            };
        }
        catch (err) {
            if (err?.name === "AbortError") {
                throw err;
            }
            const cached = getCachedData(cacheKey);
            if (cached.data) {
                return {
                    data: cached.data,
                    status: "stale",
                };
            }
            throw err;
        }
        finally {
            activeRequests.delete(cacheKey);
        }
    })();
    activeRequests.set(cacheKey, requestPromise);
    return requestPromise;
}
