import React from "react";
import styles from "./Card.module.css";
import { cn } from "@/lib/utils";
import type { CardProps } from "./types";

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = "default", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(styles.card, styles[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
