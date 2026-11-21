import React from "react";
import { Layers, Calendar, Database, ShieldCheck } from "lucide-react";
import styles from "./Stats.module.css";
import { cn } from "@/lib/utils";
import { LANGUAGES } from "@/lib/constants";
import type { StatsProps } from "./types";

export function Stats({ className }: StatsProps) {
  const languageCount = LANGUAGES.length;

  return (
    <section className={cn(styles.statsSection, className)} aria-label="System configuration statistics">
      <div className={styles.container}>
        <div className={styles.statItem}>
          <span className={styles.label}>
            <Database className="w-4 h-4 text-[#00f589]" />
            Data Source
          </span>
          <span className={styles.value}>GitHub API</span>
          <span className={styles.caption}>Public REST API v3</span>
        </div>

        <div className={styles.statItem}>
          <span className={styles.label}>
            <Layers className="w-4 h-4 text-[#00f589]" />
            Languages
          </span>
          <span className={styles.value}>{languageCount}</span>
          <span className={styles.caption}>Curated top ecosystems</span>
        </div>

        <div className={styles.statItem}>
          <span className={styles.label}>
            <Calendar className="w-4 h-4 text-[#00f589]" />
            Time Windows
          </span>
          <span className={styles.value}>7d &amp; 30d</span>
          <span className={styles.caption}>Recent creation scan</span>
        </div>

        <div className={styles.statItem}>
          <span className={styles.label}>
            <ShieldCheck className="w-4 h-4 text-[#00f589]" />
            Live Buffer
          </span>
          <span className={styles.value}>10 min</span>
          <span className={styles.caption}>Local cache duration</span>
        </div>
      </div>
    </section>
  );
}
