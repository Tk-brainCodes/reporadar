import { GITHUB_SEARCH_API } from "@/lib/constants";
import { getSinceDate } from "@/lib/date";
import { getCachedData, setCachedData } from "@/lib/cache";

const activeRequests = new Map();

function createAbortError() {
  const error = new Error("The request was aborted.");
  error.name = "AbortError";
  return error;
}

function subscribeToRequest(request, signal) {
  if (signal?.aborted) return Promise.reject(createAbortError());

  request.subscribers += 1;

  return new Promise((resolve, reject) => {
    let isSettled = false;

    const release = () => {
      if (isSettled) return;
      isSettled = true;
      signal?.removeEventListener("abort", handleAbort);
      request.subscribers -= 1;
      if (request.subscribers === 0 && !request.isSettled) {
        request.controller.abort();
      }
    };

    const handleAbort = () => {
      release();
      reject(createAbortError());
    };

    signal?.addEventListener("abort", handleAbort, { once: true });
    request.promise.then(
      (result) => {
        if (isSettled) return;
        release();
        resolve(result);
      },
      (error) => {
        if (isSettled) return;
        release();
        reject(error);
      },
    );
  });
}

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
    sort: params.sort === "forks" ? "forks" : params.sort === "updated" ? "updated" : "stars",
    order: "desc",
    per_page: String(params.perPage),
  });

  return `${GITHUB_SEARCH_API}?${searchParams.toString()}`;
}

export async function fetchRepositories(params, options = {}) {
  const cacheKey = buildCacheKey(params);
  if (options.signal?.aborted) throw createAbortError();

  if (!options.bypassCache) {
    const cached = getCachedData(cacheKey);
    if (cached.exists && cached.data && !cached.isStale) {
      return { data: cached.data, status: "cached" };
    }
  }

  const activeRequest = activeRequests.get(cacheKey);
  if (activeRequest && !options.bypassCache) {
    if (!activeRequest.controller.signal.aborted) {
      return subscribeToRequest(activeRequest, options.signal);
    }
    if (activeRequests.get(cacheKey) === activeRequest) {
      activeRequests.delete(cacheKey);
    }
  }

  const request = {
    controller: new AbortController(),
    subscribers: 0,
    isSettled: false,
    promise: null,
  };

  request.promise = (async () => {
    const url = buildGitHubQuery(params);
    try {
      const response = await fetch(url, {
        headers: { Accept: "application/vnd.github.v3+json" },
        signal: request.controller.signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const isRateLimit = response.status === 403 || response.status === 429 ||
          (typeof errorData.message === "string" && errorData.message.toLowerCase().includes("rate limit"));
        const cached = getCachedData(cacheKey);
        throw {
          message: isRateLimit
            ? "GitHub API rate limit exceeded. Unauthenticated requests are limited to 60 per hour."
            : errorData.message || `GitHub API error: ${response.status} ${response.statusText}`,
          isRateLimit,
          status: response.status,
          fallbackData: cached.data,
        };
      }

      const json = await response.json();
      if (!json || !Array.isArray(json.items)) {
        throw new Error("Invalid GitHub API response structure");
      }

      setCachedData(cacheKey, json);
      return { data: json, status: "fresh" };
    }
    catch (error) {
      if (error?.name === "AbortError") throw error;

      const cached = getCachedData(cacheKey);
      if (cached.data) return { data: cached.data, status: "stale" };
      throw error;
    }
    finally {
      request.isSettled = true;
      if (activeRequests.get(cacheKey) === request) {
        activeRequests.delete(cacheKey);
      }
    }
  })();

  if (!options.bypassCache) activeRequests.set(cacheKey, request);
  return subscribeToRequest(request, options.signal);
}
