import React from "react";
import { ArrowUpRight } from "lucide-react";
import styles from "./Button.module.css";
import { cn } from "@/lib/utils";

export const Button = React.forwardRef(function Button(
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
  ref,
) {
  const classNames = cn(styles.button, styles[variant], styles[size], className);
  const content = (
    <>
      {isLoading && <span className={styles.spinner} aria-hidden="true" />}
      {!isLoading && leftIcon && <span className={styles.iconSlot} aria-hidden="true">{leftIcon}</span>}
      <span>{children}</span>
      {!isLoading && (
        <span className={cn(styles.iconSlot, styles.arrowBubble)} aria-hidden="true">
          {rightIcon || <ArrowUpRight />}
        </span>
      )}
    </>
  );

  if (href) {
    return <a ref={ref} href={href} className={classNames} {...props}>{content}</a>;
  }

  return (
    <button ref={ref} type={props.type || "button"} disabled={disabled || isLoading} className={classNames} {...props}>
      {content}
    </button>
  );
});

Button.displayName = "Button";
