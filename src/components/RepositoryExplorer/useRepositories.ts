"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { fetchRepositories } from "@/lib/github";
import { DEFAULT_QUERY_CONFIG } from "@/lib/constants";
import type { GitHubRepository, CacheStatus, GitHubServiceError } from "@/lib/github-types";
import type { LanguageValue, SortValue, TimeWindowValue } from "@/lib/constants";
import type { ExplorerState, ExplorerActions } from "./types";

export function useRepositories(): [ExplorerState, ExplorerActions] {
  const [language, setLanguage] = useState<LanguageValue>(DEFAULT_QUERY_CONFIG.language);
  const [timeWindow, setTimeWindow] = useState<TimeWindowValue>(DEFAULT_QUERY_CONFIG.timeWindow);
  const [sort, setSort] = useState<SortValue>(DEFAULT_QUERY_CONFIG.sort);
  const [perPage, setPerPage] = useState<number>(DEFAULT_QUERY_CONFIG.perPage);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<GitHubServiceError | null>(null);
  const [status, setStatus] = useState<CacheStatus>("fresh");

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    let isSubscribed = true;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    fetchRepositories(
      {
        language,
        timeWindow,
        sort,
        perPage,
      },
      {
        bypassCache: false,
        signal: controller.signal,
      }
    )
      .then((result) => {
        if (!isSubscribed) return;
        setRepositories(result.data.items);
        setStatus(result.status);
        setError(null);
        setIsLoading(false);
      })
      .catch((err) => {
        if (!isSubscribed || (err as Error)?.name === "AbortError") return;

        const serviceError = err as GitHubServiceError;
        setError(serviceError);

        if (serviceError.fallbackData && serviceError.fallbackData.items) {
          setRepositories(serviceError.fallbackData.items);
          setStatus("stale");
        }
        setIsLoading(false);
      });

    return () => {
      isSubscribed = false;
      controller.abort();
    };
  }, [language, timeWindow, sort, perPage]);

  const handleLanguageChange = useCallback((newLang: LanguageValue) => {
    setIsLoading(true);
    setError(null);
    setLanguage(newLang);
  }, []);

  const handleTimeWindowChange = useCallback((newWindow: TimeWindowValue) => {
    setIsLoading(true);
    setError(null);
    setTimeWindow(newWindow);
  }, []);

  const handleSortChange = useCallback((newSort: SortValue) => {
    setIsLoading(true);
    setError(null);
    setSort(newSort);
  }, []);

  const handleLoadMore = useCallback(() => {
    setIsLoading(true);
    setPerPage((prev) =>
      prev < DEFAULT_QUERY_CONFIG.maxResults ? DEFAULT_QUERY_CONFIG.maxResults : prev
    );
  }, []);

  const refresh = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsRefreshing(true);
    setStatus("refreshing");
    setError(null);

    try {
      const result = await fetchRepositories(
        {
          language,
          timeWindow,
          sort,
          perPage,
        },
        {
          bypassCache: true,
          signal: controller.signal,
        }
      );

      setRepositories(result.data.items);
      setStatus(result.status);
    } catch (err) {
      if ((err as Error)?.name === "AbortError") return;

      const serviceError = err as GitHubServiceError;
      setError(serviceError);

      if (serviceError.fallbackData && serviceError.fallbackData.items) {
        setRepositories(serviceError.fallbackData.items);
        setStatus("stale");
      }
    } finally {
      setIsRefreshing(false);
    }
  }, [language, timeWindow, sort, perPage]);

  const resetFilters = useCallback(() => {
    setIsLoading(true);
    setError(null);
    setLanguage(DEFAULT_QUERY_CONFIG.language);
    setTimeWindow(DEFAULT_QUERY_CONFIG.timeWindow);
    setSort(DEFAULT_QUERY_CONFIG.sort);
    setPerPage(DEFAULT_QUERY_CONFIG.perPage);
    setSearchQuery("");
  }, []);

  const filteredRepositories = useMemo(() => {
    if (!searchQuery.trim()) {
      return repositories;
    }

    const query = searchQuery.toLowerCase().trim();
    return repositories.filter((repo) => {
      const matchName = repo.name.toLowerCase().includes(query);
      const matchFullName = repo.full_name.toLowerCase().includes(query);
      const matchOwner = repo.owner.login.toLowerCase().includes(query);
      const matchDesc = repo.description ? repo.description.toLowerCase().includes(query) : false;
      const matchLang = repo.language ? repo.language.toLowerCase().includes(query) : false;

      return matchName || matchFullName || matchOwner || matchDesc || matchLang;
    });
  }, [repositories, searchQuery]);

  const state: ExplorerState = {
    repositories,
    filteredRepositories,
    isLoading,
    isRefreshing,
    error,
    status,
    language,
    timeWindow,
    sort,
    perPage,
    searchQuery,
  };

  const actions: ExplorerActions = {
    setLanguage: handleLanguageChange,
    setTimeWindow: handleTimeWindowChange,
    setSort: handleSortChange,
    setSearchQuery,
    refresh,
    loadMore: handleLoadMore,
    resetFilters,
  };

  return [state, actions];
}
