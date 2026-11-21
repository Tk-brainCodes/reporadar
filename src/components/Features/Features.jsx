import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Sparkles, Terminal, Globe, Zap } from "lucide-react";
import styles from "./Features.module.css";
import { Badge } from "@/components/Badge";
import { cn } from "@/lib/utils";
const FEATURES = [
    {
        title: "Early Discovery",
        description: "Explore newly created repositories before they become widely known.",
        icon: _jsx(Sparkles, { className: "w-5 h-5 text-[#fca311]" }),
    },
    {
        title: "Language-Specific Discovery",
        description: "Focus on the programming languages and ecosystems you care about.",
        icon: _jsx(Terminal, { className: "w-5 h-5 text-[#fca311]" }),
    },
    {
        title: "Live GitHub Data",
        description: "Discover projects using information retrieved directly from GitHub.",
        icon: _jsx(Globe, { className: "w-5 h-5 text-[#fca311]" }),
    },
    {
        title: "Zero Friction",
        description: "No account, subscription, or GitHub authentication required.",
        icon: _jsx(Zap, { className: "w-5 h-5 text-[#fca311]" }),
    },
];
export function Features({ className }) {
    return (_jsx("section", { className: cn(styles.section, className), id: "features", children: _jsxs("div", { className: styles.container, children: [_jsxs("div", { className: styles.header, children: [_jsx(Badge, { variant: "outline", size: "sm", children: "ADVANTAGES" }), _jsx("h2", { className: styles.title, children: "Why RepoRadar" }), _jsx("p", { className: styles.subtitle, children: "Purpose-built intelligence designed for developers who value staying ahead of open-source innovation." })] }), _jsx("div", { className: styles.grid, children: FEATURES.map((item) => (_jsxs("div", { className: styles.featureCard, children: [_jsx("div", { className: styles.iconWrapper, children: item.icon }), _jsx("h3", { className: styles.featureTitle, children: item.title }), _jsx("p", { className: styles.featureDescription, children: item.description })] }, item.title))) })] }) }));
}
