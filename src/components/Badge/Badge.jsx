import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import styles from "./Badge.module.css";
import { cn } from "@/lib/utils";
export function Badge({ children, variant = "default", size = "sm", className, dot = false, }) {
    return (_jsxs("span", { className: cn(styles.badge, styles[variant], styles[size], className), children: [dot && (_jsx("span", { className: cn(styles.dot, variant === "radar" && styles.pulse), "aria-hidden": "true" })), children] }));
}
