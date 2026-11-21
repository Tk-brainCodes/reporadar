import { CACHE_PREFIX, CACHE_TTL_MS } from "@/lib/constants";
function isLocalStorageAvailable() {
    if (typeof window === "undefined") {
        return false;
    }
    try {
        const testKey = "__reporadar_test__";
        window.localStorage.setItem(testKey, testKey);
        window.localStorage.removeItem(testKey);
        return true;
    }
    catch {
        return false;
    }
}
export function getCachedData(key) {
    if (!isLocalStorageAvailable()) {
        return { data: null, isStale: false, exists: false };
    }
    try {
        const raw = window.localStorage.getItem(`${CACHE_PREFIX}${key}`);
        if (!raw) {
            return { data: null, isStale: false, exists: false };
        }
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed.timestamp !== "number" || !("data" in parsed)) {
            window.localStorage.removeItem(`${CACHE_PREFIX}${key}`);
            return { data: null, isStale: false, exists: false };
        }
        const age = Date.now() - parsed.timestamp;
        const isStale = age > CACHE_TTL_MS;
        return {
            data: parsed.data,
            isStale,
            exists: true,
        };
    }
    catch {
        return { data: null, isStale: false, exists: false };
    }
}
export function setCachedData(key, data) {
    if (!isLocalStorageAvailable()) {
        return;
    }
    try {
        const payload = {
            data,
            timestamp: Date.now(),
        };
        window.localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(payload));
    }
    catch {
        try {
            for (let i = 0; i < window.localStorage.length; i++) {
                const existingKey = window.localStorage.key(i);
                if (existingKey && existingKey.startsWith(CACHE_PREFIX)) {
                    window.localStorage.removeItem(existingKey);
                }
            }
            const payload = {
                data,
                timestamp: Date.now(),
            };
            window.localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(payload));
        }
        catch {
            return;
        }
    }
}
export function removeCachedData(key) {
    if (!isLocalStorageAvailable()) {
        return;
    }
    try {
        window.localStorage.removeItem(`${CACHE_PREFIX}${key}`);
    }
    catch {
        return;
    }
}
