import React from "react";
import { Info } from "lucide-react";
import styles from "./Methodology.module.css";
import { Badge } from "@/components/Badge";
import { cn } from "@/lib/utils";
import type { MethodologyProps } from "./types";

const PIPELINE_STEPS = [
  {
    step: "STEP 01",
    title: "Dynamic Creation Window",
    description: "Calculates an exact ISO 8601 boundary date (7 or 30 days back from current execution).",
  },
  {
    step: "STEP 02",
    title: "Public Search Query",
    description: "Requests public GitHub repositories matching the creation threshold and language filter.",
  },
  {
    step: "STEP 03",
    title: "Cumulative Star Sorting",
    description: "Sorts returned repositories in descending order by cumulative star count.",
  },
  {
    step: "STEP 04",
    title: "Client-Side Caching",
    description: "Caches successful responses locally for 10 minutes to respect GitHub rate limits.",
  },
];

export function Methodology({ className }: MethodologyProps) {
  return (
    <section className={cn(styles.section, className)} id="methodology">
      <div className={styles.container}>
        <div className={styles.header}>
          <Badge variant="outline" size="sm">
            TRANSPARENCY
          </Badge>
          <h2 className={styles.title}>Data methodology</h2>
          <p className={styles.subtitle}>
            GitHub does not expose an official trending repositories API. Here is
            precisely how RepoRadar calculates and sources its discovery feeds.
          </p>
        </div>

        <div className={styles.calloutBox}>
          <Info className={styles.calloutIcon} />
          <div>
            <h3 className={styles.calloutTitle}>Explicit Ranking Definition</h3>
            <p className={styles.calloutText}>
              Rising repositories are repositories created within the selected
              time window, ranked by their total GitHub stars. This is not a
              measurement of stars gained during that period.
            </p>
          </div>
        </div>

        <div className={styles.pipelineGrid}>
          {PIPELINE_STEPS.map((step) => (
            <div key={step.step} className={styles.pipelineCard}>
              <span className={styles.pipelineStepNumber}>{step.step}</span>
              <h4 className={styles.pipelineStepTitle}>{step.title}</h4>
              <p className={styles.pipelineStepText}>{step.description}</p>
            </div>
          ))}
        </div>

        <div className={styles.specsList}>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>API Provider</span>
            <span className={styles.specVal}>GitHub REST API v3</span>
          </div>

          <div className={styles.specItem}>
            <span className={styles.specLabel}>Rate Limit Policy</span>
            <span className={styles.specVal}>60 req/hr per originating IP</span>
          </div>

          <div className={styles.specItem}>
            <span className={styles.specLabel}>Local TTL Buffer</span>
            <span className={styles.specVal}>10 minutes localStorage</span>
          </div>
        </div>
      </div>
    </section>
  );
}
