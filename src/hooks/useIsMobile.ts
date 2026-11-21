import { useSyncExternalStore } from "react";

function subscribe(callback: () => void): () => void {
  const mediaQuery = window.matchMedia("(max-width: 768px)");
  mediaQuery.addEventListener("change", callback);
  return () => {
    mediaQuery.removeEventListener("change", callback);
  };
}

function getSnapshot(): boolean {
  return window.matchMedia("(max-width: 768px)").matches;
}

function getServerSnapshot(): boolean {
  return false;
}

export function useIsMobile(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
