import React from "react";
import styles from "./RepositorySkeleton.module.css";
import { cn } from "@/lib/utils";
import type { RepositorySkeletonProps } from "./types";

export function RepositorySkeleton({ className }: RepositorySkeletonProps) {
  return (
    <div className={cn(styles.skeletonCard, className)} aria-hidden="true">
      <div className={styles.skeletonHeader}>
        <div className={styles.skeletonAvatar} />
        <div className={styles.skeletonTitleGroup}>
          <div className={styles.skeletonLineShort} />
          <div className={styles.skeletonLineMedium} />
        </div>
      </div>
      <div className={styles.skeletonBody}>
        <div className={styles.skeletonLineFull} />
        <div className={styles.skeletonLineFull} />
      </div>
      <div className={styles.skeletonFooter}>
        <div className={styles.skeletonLineTiny} />
        <div className={styles.skeletonLineTiny} />
      </div>
    </div>
  );
}
