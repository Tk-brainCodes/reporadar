import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import styles from "./Button.module.css";
import { cn } from "@/lib/utils";
export const Button = React.forwardRef(({ variant = "primary", size = "md", className, children, href, leftIcon, rightIcon, isLoading, disabled, ...props }, ref) => {
    const classNames = cn(styles.button, styles[variant], styles[size], className);
    const content = (_jsxs(_Fragment, { children: [isLoading && _jsx("span", { className: styles.spinner, "aria-hidden": "true" }), !isLoading && leftIcon && _jsx("span", { className: "inline-flex shrink-0", children: leftIcon }), _jsx("span", { children: children }), !isLoading && rightIcon && _jsx("span", { className: "inline-flex shrink-0", children: rightIcon })] }));
    if (href) {
        return (_jsx("a", { ref: ref, href: href, className: classNames, ...props, children: content }));
    }
    return (_jsx("button", { ref: ref, type: props.type || "button", disabled: disabled || isLoading, className: classNames, ...props, children: content }));
});
Button.displayName = "Button";
