import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import styles from "./RepositorySkeleton.module.css";
import { cn } from "@/lib/utils";
export function RepositorySkeleton({ className }) {
    return (_jsxs("div", { className: cn(styles.skeletonCard, className), "aria-hidden": "true", children: [_jsxs("div", { className: styles.skeletonHeader, children: [_jsx("div", { className: styles.skeletonAvatar }), _jsxs("div", { className: styles.skeletonTitleGroup, children: [_jsx("div", { className: styles.skeletonLineShort }), _jsx("div", { className: styles.skeletonLineMedium })] })] }), _jsxs("div", { className: styles.skeletonBody, children: [_jsx("div", { className: styles.skeletonLineFull }), _jsx("div", { className: styles.skeletonLineFull })] }), _jsxs("div", { className: styles.skeletonFooter, children: [_jsx("div", { className: styles.skeletonLineTiny }), _jsx("div", { className: styles.skeletonLineTiny })] })] }));
}
