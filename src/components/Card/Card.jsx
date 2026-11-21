import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import styles from "./Card.module.css";
import { cn } from "@/lib/utils";
export const Card = React.forwardRef(({ children, variant = "default", className, ...props }, ref) => {
    return (_jsx("div", { ref: ref, className: cn(styles.card, styles[variant], className), ...props, children: children }));
});
Card.displayName = "Card";
