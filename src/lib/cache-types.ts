export interface CachedResponse<T> {
  data: T;
  timestamp: number;
}

export interface CacheLookupResult<T> {
  data: T | null;
  isStale: boolean;
  exists: boolean;
}
