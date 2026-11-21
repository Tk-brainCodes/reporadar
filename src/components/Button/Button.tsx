import React from "react";
import styles from "./Button.module.css";
import { cn } from "@/lib/utils";
import type { ButtonProps } from "./types";

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      className,
      children,
      href,
      leftIcon,
      rightIcon,
      isLoading,
      disabled,
      ...props
    },
    ref
  ) => {
    const classNames = cn(
      styles.button,
      styles[variant],
      styles[size],
      className
    );

    const content = (
      <>
        {isLoading && <span className={styles.spinner} aria-hidden="true" />}
        {!isLoading && leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </>
    );

    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classNames}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={props.type || "button"}
        disabled={disabled || isLoading}
        className={classNames}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
