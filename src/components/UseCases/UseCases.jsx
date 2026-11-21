import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Wrench, GitPullRequest, Code2, Lightbulb } from "lucide-react";
import styles from "./UseCases.module.css";
import { Badge } from "@/components/Badge";
import { cn } from "@/lib/utils";
const USE_CASES = [
    {
        role: "Full-Stack & Systems Engineers",
        title: "Tool Hunters",
        description: "Find bleeding-edge developer tools, modern utility libraries, and alternative CLI utilities before they hit tech news aggregates.",
        icon: _jsx(Wrench, { className: "w-5 h-5 text-[#00f589]" }),
    },
    {
        role: "Open Source Developers",
        title: "Early Contributors",
        description: "Discover fresh, high-potential projects in their foundational stages where architecture decisions and first contributions carry real impact.",
        icon: _jsx(GitPullRequest, { className: "w-5 h-5 text-[#00f589]" }),
    },
    {
        role: "Engineering Teams",
        title: "Technology Evaluators",
        description: "Monitor ecosystem movement and track what peers are building in Rust, TypeScript, Go, and Python to inform architecture decisions.",
        icon: _jsx(Code2, { className: "w-5 h-5 text-[#00f589]" }),
    },
    {
        role: "Technical Founders",
        title: "Innovation Researchers",
        description: "Observe emergent patterns in developer tooling, infrastructure components, and open software stacks to identify whitespace opportunities.",
        icon: _jsx(Lightbulb, { className: "w-5 h-5 text-[#00f589]" }),
    },
];
export function UseCases({ className }) {
    return (_jsx("section", { className: cn(styles.section, className), id: "use-cases", children: _jsxs("div", { className: styles.container, children: [_jsxs("div", { className: styles.header, children: [_jsx(Badge, { variant: "outline", size: "sm", children: "APPLICATIONS" }), _jsx("h2", { className: styles.title, children: "Built for developers" }), _jsx("p", { className: styles.subtitle, children: "Whether you are hunting for innovative libraries or finding projects to contribute to, RepoRadar provides early visibility." })] }), _jsx("div", { className: styles.grid, children: USE_CASES.map((item) => (_jsxs("div", { className: styles.useCaseCard, children: [_jsx("div", { className: styles.iconBox, children: item.icon }), _jsxs("div", { className: styles.cardBody, children: [_jsx("span", { className: styles.targetAudience, children: item.role }), _jsx("h3", { className: styles.useCaseTitle, children: item.title }), _jsx("p", { className: styles.useCaseDescription, children: item.description })] })] }, item.title))) })] }) }));
}
