import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Radar, RotateCcw } from "lucide-react";
import styles from "./ExplorerEmptyState.module.css";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";
export function ExplorerEmptyState({ isSearchActive, onReset, className, }) {
    return (_jsxs("div", { className: cn(styles.emptyContainer, className), children: [_jsx("div", { className: styles.emptyIconWrapper, children: _jsx(Radar, { className: "w-8 h-8 text-[#fca311] opacity-80" }) }), _jsx("h3", { className: styles.emptyTitle, children: isSearchActive ? "No matching repositories found" : "No emerging repositories detected" }), _jsx("p", { className: styles.emptyDescription, children: isSearchActive
                    ? "No repositories match your active search filter. Try clearing the search term or adjusting language and time parameters."
                    : "There are currently no repositories meeting the query threshold within this discovery window. Try expanding the time filter to 30 days or selecting All Languages." }), _jsx("div", { className: "pt-2", children: _jsx(Button, { variant: "outline", size: "sm", onClick: onReset, leftIcon: _jsx(RotateCcw, { className: "w-4 h-4" }), children: "Reset all filters" }) })] }));
}
