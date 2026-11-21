"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useSyncExternalStore } from "react";
import Link from "next/link";
import { Radar } from "lucide-react";
import styles from "./Footer.module.css";
import { cn } from "@/lib/utils";
function subscribe() {
    return () => { };
}
function getClientSnapshot() {
    return new Date().getFullYear();
}
function getServerSnapshot() {
    return 2026;
}
export function Footer({ className }) {
    const currentYear = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
    return (_jsx("footer", { className: cn(styles.footer, className), children: _jsxs("div", { className: styles.container, children: [_jsxs("div", { className: styles.topSection, children: [_jsxs("div", { className: styles.brandCol, children: [_jsxs(Link, { href: "/", className: styles.brand, children: [_jsx("span", { className: styles.logoIcon, "aria-hidden": "true", children: _jsx(Radar, { className: "w-4 h-4 text-[#00f589]" }) }), _jsx("span", { children: "RepoRadar" })] }), _jsx("p", { className: styles.description, children: "The developer-focused discovery radar for emerging open-source repositories. Discover what is rising across ecosystems before it becomes mainstream." })] }), _jsxs("div", { className: styles.linksGrid, children: [_jsxs("div", { className: styles.linkGroup, children: [_jsx("span", { className: styles.groupTitle, children: "Product" }), _jsx("a", { href: "#explorer", className: styles.link, children: "Repository Explorer" }), _jsx("a", { href: "#how-it-works", className: styles.link, children: "How It Works" }), _jsx("a", { href: "#features", className: styles.link, children: "Why RepoRadar" }), _jsx("a", { href: "#use-cases", className: styles.link, children: "Use Cases" })] }), _jsxs("div", { className: styles.linkGroup, children: [_jsx("span", { className: styles.groupTitle, children: "Transparency" }), _jsx("a", { href: "#methodology", className: styles.link, children: "Data Methodology" }), _jsx("a", { href: "https://docs.github.com/en/rest/search/search?apiVersion=2022-11-28#search-repositories", target: "_blank", rel: "noopener noreferrer", className: styles.link, children: "GitHub Search API" }), _jsx("a", { href: "https://github.com/topics/awesome", target: "_blank", rel: "noopener noreferrer", className: styles.link, children: "GitHub Awesome" })] })] })] }), _jsxs("div", { className: styles.bottomSection, children: [_jsxs("div", { children: ["\u00A9 ", currentYear, " RepoRadar. All rights reserved."] }), _jsxs("div", { className: styles.attribution, children: [_jsx("span", { className: styles.attributionDot, "aria-hidden": "true" }), _jsx("span", { children: "Data powered by the public GitHub REST API v3" })] })] })] }) }));
}
