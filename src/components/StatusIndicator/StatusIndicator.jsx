import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import styles from "./StatusIndicator.module.css";
import { Badge } from "@/components/Badge";
import { cn } from "@/lib/utils";
export function StatusIndicator({ status, isRefreshing, className, }) {
    if (isRefreshing || status === "refreshing") {
        return (_jsx("div", { className: cn(styles.indicatorWrapper, className), children: _jsx(Badge, { variant: "info", size: "sm", dot: true, children: "Refreshing GitHub data..." }) }));
    }
    if (status === "fresh") {
        return (_jsx("div", { className: cn(styles.indicatorWrapper, className), children: _jsx(Badge, { variant: "radar", size: "sm", dot: true, children: "Fresh API Data" }) }));
    }
    if (status === "cached") {
        return (_jsx("div", { className: cn(styles.indicatorWrapper, className), children: _jsx(Badge, { variant: "default", size: "sm", children: "Cached (10m TTL)" }) }));
    }
    return (_jsx("div", { className: cn(styles.indicatorWrapper, className), children: _jsx(Badge, { variant: "stale", size: "sm", children: "Stale Cache Fallback" }) }));
}
