import React from "react";
import styles from "./RepositoryExplorer.module.css";

export function RepositorySkeleton() {
  return (
    <div className={styles.skeletonCard} aria-hidden="true">
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
