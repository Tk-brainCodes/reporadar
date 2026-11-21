import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Layers, Calendar, Database, ShieldCheck } from "lucide-react";
import styles from "./Stats.module.css";
import { cn } from "@/lib/utils";
import { LANGUAGES } from "@/lib/constants";
export function Stats({ className }) {
    const languageCount = LANGUAGES.length;
    return (_jsx("section", { className: cn(styles.statsSection, className), "aria-label": "System configuration statistics", children: _jsxs("div", { className: styles.container, children: [_jsxs("div", { className: styles.statItem, children: [_jsxs("span", { className: styles.label, children: [_jsx(Database, { className: "w-4 h-4 text-[#00f589]" }), "Data Source"] }), _jsx("span", { className: styles.value, children: "GitHub API" }), _jsx("span", { className: styles.caption, children: "Public REST API v3" })] }), _jsxs("div", { className: styles.statItem, children: [_jsxs("span", { className: styles.label, children: [_jsx(Layers, { className: "w-4 h-4 text-[#00f589]" }), "Languages"] }), _jsx("span", { className: styles.value, children: languageCount }), _jsx("span", { className: styles.caption, children: "Curated top ecosystems" })] }), _jsxs("div", { className: styles.statItem, children: [_jsxs("span", { className: styles.label, children: [_jsx(Calendar, { className: "w-4 h-4 text-[#00f589]" }), "Time Windows"] }), _jsx("span", { className: styles.value, children: "7d & 30d" }), _jsx("span", { className: styles.caption, children: "Recent creation scan" })] }), _jsxs("div", { className: styles.statItem, children: [_jsxs("span", { className: styles.label, children: [_jsx(ShieldCheck, { className: "w-4 h-4 text-[#00f589]" }), "Live Buffer"] }), _jsx("span", { className: styles.value, children: "10 min" }), _jsx("span", { className: styles.caption, children: "Local cache duration" })] })] }) }));
}
