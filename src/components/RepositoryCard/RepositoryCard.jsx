import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import Image from "next/image";
import { Star, GitFork, ExternalLink, Calendar } from "lucide-react";
import styles from "./RepositoryCard.module.css";
import { formatNumber, formatTimeAgo, formatDate } from "@/lib/date";
import { cn } from "@/lib/utils";
const LANGUAGE_COLORS = {
    TypeScript: "#fca311",
    JavaScript: "#fca311",
    Python: "#fca311",
    Rust: "#fca311",
    Go: "#fca311",
    Java: "#fca311",
    "C++": "#fca311",
    Swift: "#fca311",
    Kotlin: "#fca311",
    PHP: "#fca311",
    Ruby: "#fca311",
};
export function RepositoryCard({ repository, className }) {
    const langColor = repository.language ? LANGUAGE_COLORS[repository.language] || "#fca311" : "#e5e5e5";
    return (_jsxs("div", { className: cn(styles.repoCard, className), children: [_jsxs("div", { className: styles.cardHeader, children: [_jsxs("div", { className: styles.ownerInfo, children: [_jsx(Image, { src: repository.owner.avatar_url, alt: repository.owner.login, className: styles.ownerAvatar, width: 36, height: 36, unoptimized: true }), _jsxs("div", { className: styles.nameBlock, children: [_jsx("span", { className: styles.ownerLogin, children: repository.owner.login }), _jsx("h3", { className: styles.repoName, title: repository.name, children: repository.name })] })] }), _jsx("a", { href: repository.html_url, target: "_blank", rel: "noopener noreferrer", className: styles.externalLink, "aria-label": `Open ${repository.full_name} on GitHub`, children: _jsx(ExternalLink, { className: "w-4 h-4" }) })] }), _jsx("p", { className: styles.cardDescription, children: repository.description || "No repository description provided by the authors." }), _jsxs("div", { className: styles.cardFooter, children: [_jsxs("div", { className: styles.metaLeft, children: [_jsxs("span", { className: styles.langIndicator, children: [_jsx("span", { className: styles.langDot, style: { backgroundColor: langColor }, "aria-hidden": "true" }), _jsx("span", { children: repository.language || "Unknown" })] }), _jsxs("span", { className: styles.statMetric, title: `${repository.stargazers_count} stars`, children: [_jsx(Star, { className: "w-3.5 h-3.5 text-[#fca311]" }), _jsx("span", { children: formatNumber(repository.stargazers_count) })] }), _jsxs("span", { className: styles.statMetric, title: `${repository.forks_count} forks`, children: [_jsx(GitFork, { className: "w-3.5 h-3.5 text-[#e5e5e5]" }), _jsx("span", { children: formatNumber(repository.forks_count) })] })] }), _jsx("div", { className: styles.metaRight, children: _jsxs("span", { className: styles.createdDate, title: `Created on ${formatDate(repository.created_at)}`, children: [_jsx(Calendar, { className: "w-3 h-3 text-[#e5e5e5]" }), _jsx("span", { children: formatTimeAgo(repository.created_at) })] }) })] })] }));
}
