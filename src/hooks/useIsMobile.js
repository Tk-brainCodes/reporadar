import { useSyncExternalStore } from "react";
function subscribe(callback) {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    mediaQuery.addEventListener("change", callback);
    return () => {
        mediaQuery.removeEventListener("change", callback);
    };
}
function getSnapshot() {
    return window.matchMedia("(max-width: 768px)").matches;
}
function getServerSnapshot() {
    return false;
}
export function useIsMobile() {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
