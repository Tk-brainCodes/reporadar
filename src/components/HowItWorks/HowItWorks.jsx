import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Search, TrendingUp, Compass } from "lucide-react";
import styles from "./HowItWorks.module.css";
import { Badge } from "@/components/Badge";
import { cn } from "@/lib/utils";
const STEPS = [
    {
        number: "01",
        title: "Scan GitHub",
        description: "We retrieve recently created public repositories directly from GitHub.",
        icon: _jsx(Search, { className: "w-5 h-5 text-[#fca311]" }),
    },
    {
        number: "02",
        title: "Find rising projects",
        description: "Repositories are ranked by their accumulated stars to highlight projects attracting attention.",
        icon: _jsx(TrendingUp, { className: "w-5 h-5 text-[#fca311]" }),
    },
    {
        number: "03",
        title: "Explore and discover",
        description: "Browse projects by programming language, inspect their details, and visit the original repository.",
        icon: _jsx(Compass, { className: "w-5 h-5 text-[#fca311]" }),
    },
];
export function HowItWorks({ className }) {
    return (_jsx("section", { className: cn(styles.section, className), id: "how-it-works", children: _jsxs("div", { className: styles.container, children: [_jsxs("div", { className: styles.header, children: [_jsx(Badge, { variant: "outline", size: "sm", children: "WORKFLOW" }), _jsx("h2", { className: styles.title, children: "How it works" }), _jsx("p", { className: styles.subtitle, children: "A streamlined discovery engine that continuously queries GitHub public data to uncover emerging developer tools." })] }), _jsx("div", { className: styles.stepsGrid, children: STEPS.map((step) => (_jsxs("div", { className: styles.stepCard, children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { className: styles.iconWrapper, children: step.icon }), _jsx("span", { className: styles.stepNumber, children: step.number })] }), _jsx("h3", { className: styles.stepTitle, children: step.title }), _jsx("p", { className: styles.stepDescription, children: step.description })] }, step.number))) })] }) }));
}
