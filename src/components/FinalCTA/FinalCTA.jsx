import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { ArrowUp } from "lucide-react";
import styles from "./FinalCTA.module.css";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";
export function FinalCTA({ className }) {
    return (_jsx("section", { className: cn(styles.section, className), children: _jsxs("div", { className: styles.container, children: [_jsx("h2", { className: styles.headline, children: "Your next favorite repository is out there." }), _jsx("p", { className: styles.description, children: "Stop searching blindly. Discover what developers are building." }), _jsx("div", { className: styles.ctaWrapper, children: _jsx(Button, { variant: "primary", size: "lg", href: "#explorer", rightIcon: _jsx(ArrowUp, { className: "w-4 h-4" }), children: "Explore rising repositories" }) })] }) }));
}
