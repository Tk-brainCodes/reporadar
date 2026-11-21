import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { ArrowDown } from "lucide-react";
import styles from "./Hero.module.css";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { RadarVisual } from "@/components/RadarVisual";
import { cn } from "@/lib/utils";
export function Hero({ className }) {
    return (_jsx("section", { className: cn(styles.hero, className), id: "product", children: _jsxs("div", { className: styles.container, children: [_jsxs("div", { className: styles.content, children: [_jsx("div", { className: styles.eyebrowWrapper, children: _jsx(Badge, { variant: "radar", size: "md", dot: true, children: "THE OPEN SOURCE DISCOVERY RADAR" }) }), _jsxs("h1", { className: styles.headline, children: ["Find the next big thing", " ", _jsx("span", { className: styles.headlineGradient, children: "in open source." })] }), _jsx("p", { className: styles.description, children: "Discover emerging GitHub projects, explore innovative developer tools, and find your next favorite repository before everyone else." }), _jsxs("div", { className: styles.ctaGroup, children: [_jsx(Button, { variant: "primary", size: "lg", href: "#explorer", rightIcon: _jsx(ArrowDown, { className: "w-4 h-4" }), children: "Explore rising repositories" }), _jsx(Button, { variant: "secondary", size: "lg", href: "#how-it-works", children: "How it works" })] }), _jsxs("div", { className: styles.metaNotice, children: [_jsx("span", { className: styles.metaNoticeDot, "aria-hidden": "true" }), _jsx("span", { children: "Scanning live public repositories across 12 tech ecosystems" })] })] }), _jsx("div", { className: styles.visualWrapper, children: _jsx(RadarVisual, {}) })] }) }));
}
