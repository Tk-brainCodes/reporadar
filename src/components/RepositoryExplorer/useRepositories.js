"use client";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { fetchRepositories } from "@/lib/github";
import { DEFAULT_QUERY_CONFIG } from "@/lib/constants";
export function useRepositories() {
    const [language, setLanguage] = useState(DEFAULT_QUERY_CONFIG.language);
    const [timeWindow, setTimeWindow] = useState(DEFAULT_QUERY_CONFIG.timeWindow);
    const [sort, setSort] = useState(DEFAULT_QUERY_CONFIG.sort);
    const [perPage, setPerPage] = useState(DEFAULT_QUERY_CONFIG.perPage);
    const [searchQuery, setSearchQuery] = useState("");
    const [repositories, setRepositories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState("fresh");
    const abortControllerRef = useRef(null);
    useEffect(() => {
        let isSubscribed = true;
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        const controller = new AbortController();
        abortControllerRef.current = controller;
        fetchRepositories({
            language,
            timeWindow,
            sort,
            perPage,
        }, {
            bypassCache: false,
            signal: controller.signal,
        })
            .then((result) => {
            if (!isSubscribed)
                return;
            setRepositories(result.data.items);
            setStatus(result.status);
            setError(null);
            setIsLoading(false);
        })
            .catch((err) => {
            if (!isSubscribed || err?.name === "AbortError")
                return;
            const serviceError = err;
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
    const handleLanguageChange = useCallback((newLang) => {
        setIsLoading(true);
        setError(null);
        setLanguage(newLang);
    }, []);
    const handleTimeWindowChange = useCallback((newWindow) => {
        setIsLoading(true);
        setError(null);
        setTimeWindow(newWindow);
    }, []);
    const handleSortChange = useCallback((newSort) => {
        setIsLoading(true);
        setError(null);
        setSort(newSort);
    }, []);
    const handleLoadMore = useCallback(() => {
        setIsLoading(true);
        setPerPage((prev) => prev < DEFAULT_QUERY_CONFIG.maxResults ? DEFAULT_QUERY_CONFIG.maxResults : prev);
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
            const result = await fetchRepositories({
                language,
                timeWindow,
                sort,
                perPage,
            }, {
                bypassCache: true,
                signal: controller.signal,
            });
            setRepositories(result.data.items);
            setStatus(result.status);
        }
        catch (err) {
            if (err?.name === "AbortError")
                return;
            const serviceError = err;
            setError(serviceError);
            if (serviceError.fallbackData && serviceError.fallbackData.items) {
                setRepositories(serviceError.fallbackData.items);
                setStatus("stale");
            }
        }
        finally {
            setIsRefreshing(false);
            if (abortControllerRef.current === controller) {
                setIsLoading(false);
            }
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
    const state = {
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
    const actions = {
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
