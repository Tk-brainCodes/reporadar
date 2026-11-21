import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Search, RefreshCw, X } from "lucide-react";
import styles from "./ExplorerFilters.module.css";
import { LANGUAGES, TIME_WINDOWS, SORT_OPTIONS } from "@/lib/constants";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";
export function ExplorerFilters({ language, timeWindow, sort, searchQuery, isRefreshing, onLanguageChange, onTimeWindowChange, onSortChange, onSearchChange, onRefresh, className, }) {
    return (_jsxs("div", { className: cn(styles.filterBar, className), children: [_jsxs("div", { className: styles.filterTopRow, children: [_jsxs("div", { className: styles.searchWrapper, children: [_jsx(Search, { className: styles.searchIcon, "aria-hidden": "true" }), _jsx("input", { type: "text", className: styles.searchInput, placeholder: "Search loaded repos by name, owner, or topic...", value: searchQuery, onChange: (e) => onSearchChange(e.target.value), "aria-label": "Filter loaded repositories" }), searchQuery && (_jsx("button", { type: "button", className: styles.clearSearchButton, onClick: () => onSearchChange(""), "aria-label": "Clear search", children: _jsx(X, { className: "w-4 h-4" }) }))] }), _jsxs("div", { className: styles.actionsCluster, children: [_jsx("div", { className: styles.segmentedControl, role: "radiogroup", "aria-label": "Creation date window", children: TIME_WINDOWS.map((win) => {
                                    const active = timeWindow === win.value;
                                    return (_jsx("button", { type: "button", className: active ? styles.segmentedActive : styles.segmentedItem, onClick: () => onTimeWindowChange(win.value), role: "radio", "aria-checked": active, children: win.label }, win.value));
                                }) }), _jsx("div", { className: styles.selectWrapper, children: _jsx("select", { className: styles.selectInput, value: sort, onChange: (e) => onSortChange(e.target.value), "aria-label": "Sort repositories by", children: SORT_OPTIONS.map((opt) => (_jsx("option", { value: opt.value, children: opt.label }, opt.value))) }) }), _jsx(Button, { variant: "outline", size: "sm", onClick: onRefresh, isLoading: isRefreshing, leftIcon: _jsx(RefreshCw, { className: "w-3.5 h-3.5" }), "aria-label": "Refresh repository data", children: "Refresh" })] })] }), _jsx("div", { className: styles.languageScroller, role: "tablist", "aria-label": "Programming language filters", children: LANGUAGES.map((lang) => {
                    const active = language === lang.value;
                    return (_jsx("button", { type: "button", className: active ? styles.langChipActive : styles.langChip, onClick: () => onLanguageChange(lang.value), role: "tab", "aria-selected": active, children: lang.label }, lang.value));
                }) })] }));
}
