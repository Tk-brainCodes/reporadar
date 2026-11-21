import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import styles from "./ExplorerErrorState.module.css";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";
export function ExplorerErrorState({ error, onRetry, isRetrying, className, }) {
    return (_jsxs("div", { className: cn(styles.errorContainer, className), role: "alert", children: [_jsx("div", { className: styles.errorIconWrapper, children: _jsx(AlertTriangle, { className: "w-8 h-8 text-[#ef4444]" }) }), _jsx("h3", { className: styles.errorTitle, children: error.isRateLimit ? "GitHub Rate Limit Reached" : "Unable to Fetch Repositories" }), _jsx("p", { className: styles.errorDescription, children: error.isRateLimit
                    ? "GitHub has temporarily limited requests for unauthenticated clients (60 requests per hour). Cached results will continue to be displayed if available. Please wait a short while and try again."
                    : error.message }), _jsx("div", { className: "pt-3", children: _jsx(Button, { variant: "secondary", size: "sm", onClick: onRetry, isLoading: isRetrying, leftIcon: _jsx(RefreshCw, { className: "w-4 h-4" }), children: "Try again" }) })] }));
}
