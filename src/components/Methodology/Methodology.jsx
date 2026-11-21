import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Info } from "lucide-react";
import styles from "./Methodology.module.css";
import { Badge } from "@/components/Badge";
import { cn } from "@/lib/utils";
const PIPELINE_STEPS = [
    {
        step: "STEP 01",
        title: "Dynamic Creation Window",
        description: "Calculates an exact ISO 8601 boundary date (7 or 30 days back from current execution).",
    },
    {
        step: "STEP 02",
        title: "Public Search Query",
        description: "Requests public GitHub repositories matching the creation threshold and language filter.",
    },
    {
        step: "STEP 03",
        title: "Cumulative Star Sorting",
        description: "Sorts returned repositories in descending order by cumulative star count.",
    },
    {
        step: "STEP 04",
        title: "Client-Side Caching",
        description: "Caches successful responses locally for 10 minutes to respect GitHub rate limits.",
    },
];
export function Methodology({ className }) {
    return (_jsx("section", { className: cn(styles.section, className), id: "methodology", children: _jsxs("div", { className: styles.container, children: [_jsxs("div", { className: styles.header, children: [_jsx(Badge, { variant: "outline", size: "sm", children: "TRANSPARENCY" }), _jsx("h2", { className: styles.title, children: "Data methodology" }), _jsx("p", { className: styles.subtitle, children: "GitHub does not expose an official trending repositories API. Here is precisely how RepoRadar calculates and sources its discovery feeds." })] }), _jsxs("div", { className: styles.calloutBox, children: [_jsx(Info, { className: styles.calloutIcon }), _jsxs("div", { children: [_jsx("h3", { className: styles.calloutTitle, children: "Explicit Ranking Definition" }), _jsx("p", { className: styles.calloutText, children: "Rising repositories are repositories created within the selected time window, ranked by their total GitHub stars. This is not a measurement of stars gained during that period." })] })] }), _jsx("div", { className: styles.pipelineGrid, children: PIPELINE_STEPS.map((step) => (_jsxs("div", { className: styles.pipelineCard, children: [_jsx("span", { className: styles.pipelineStepNumber, children: step.step }), _jsx("h4", { className: styles.pipelineStepTitle, children: step.title }), _jsx("p", { className: styles.pipelineStepText, children: step.description })] }, step.step))) }), _jsxs("div", { className: styles.specsList, children: [_jsxs("div", { className: styles.specItem, children: [_jsx("span", { className: styles.specLabel, children: "API Provider" }), _jsx("span", { className: styles.specVal, children: "GitHub REST API v3" })] }), _jsxs("div", { className: styles.specItem, children: [_jsx("span", { className: styles.specLabel, children: "Rate Limit Policy" }), _jsx("span", { className: styles.specVal, children: "60 req/hr per originating IP" })] }), _jsxs("div", { className: styles.specItem, children: [_jsx("span", { className: styles.specLabel, children: "Local TTL Buffer" }), _jsx("span", { className: styles.specVal, children: "10 minutes localStorage" })] })] })] }) }));
}
